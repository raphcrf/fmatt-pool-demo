describe('Autodesk usage report import', function () {
    var created = { models: [], users: [], ritms: [], maps: [] }

    var MODEL_AEC = 'ZZ ATF Autodesk AEC Collection'
    var MODEL_ME = 'ZZ ATF Autodesk M&E Collection'
    var MODEL_FORMA = 'ZZ ATF Autodesk Forma Build'

    var OFFERING_AEC = 'Architecture Engineering & Construction Collection'
    var OFFERING_ME = 'Media & Entertainment Collection'
    var OFFERING_FORMA = 'Forma Build 5000'
    var OFFERING_UNMAPPED = 'Civil 3D'

    var EMAIL_ACTIVE = 'zz.atf.autodesk.active@example.invalid'
    var EMAIL_TWO = 'zz.atf.autodesk.two@example.invalid'
    var EMAIL_GONE = 'zz.atf.autodesk.departed@example.invalid'
    var EMAIL_REVOKED = 'zz.atf.autodesk.revoked@example.invalid'

    var HEADER =
        'hashed_autodesk_id,first_name,last_name,email,autodesk_id,team_alias,group,offering_name,version,' +
        'seat_assignment,assigned_date,unassigned_date,user_activity,days_inactive,access_option,days_used,' +
        'monthly_average,tokens_used,last_accessed'

    function insert(table, values) {
        var gr = new GlideRecord(table)
        gr.initialize()
        for (var f in values) {
            gr.setValue(f, values[f])
        }
        return gr.insert()
    }

    function row(values) {
        return [
            values.hash || '0000000000000000000000000000000000000000',
            values.first || 'ZZ',
            values.last || 'Autodesk',
            values.email,
            values.autodeskId || 'zz.atf.autodesk',
            values.team || 'ZZ ATF Team',
            values.group || '',
            values.offering,
            values.version || '2026',
            values.seat || 'assigned',
            values.assigned === undefined ? '2024-05-10T21:20:32Z' : values.assigned,
            values.unassigned || '',
            values.activity || 'active',
            values.daysInactive === undefined ? '' : values.daysInactive,
            'Subscription',
            values.daysUsed === undefined ? '20' : values.daysUsed,
            values.monthlyAverage === undefined ? '6.6' : values.monthlyAverage,
            '',
            values.lastAccessed === undefined ? '2026-07-29' : values.lastAccessed,
        ].join(',')
    }

    function csv(dataRows) {
        return HEADER + '\n' + dataRows.join('\n') + '\n'
    }

    function runImport(content) {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF autodesk usage import' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        var attachmentId = new GlideSysAttachment().write(ritm, 'usage_report.csv', 'text/csv', content)

        var att = new GlideRecord('sys_attachment')
        att.get(attachmentId)
        att.setValue('table_name', 'ZZ_YYsc_req_item')
        att.update()

        return new UniversalUsageImporter().importFromRequestItem(ritmId, 'autodesk')
    }

    function subscriptionFor(email, modelId) {
        var gr = new GlideRecord('samp_sw_subscription')
        gr.addQuery('user_principal_name', email.toLowerCase())
        gr.addQuery('software_model', modelId)
        gr.query()
        return gr.next() ? gr : null
    }

    function countFor(email, modelId) {
        var count = new GlideAggregate('samp_sw_subscription')
        count.addQuery('user_principal_name', email.toLowerCase())
        count.addQuery('software_model', modelId ? '=' : 'IN', modelId || created.models.join(','))
        count.addAggregate('COUNT')
        count.query()
        return count.next() ? parseInt(count.getAggregate('COUNT'), 10) : 0
    }

    beforeAll(function () {
        created.models.push(
            insert('cmdb_software_product_model', { name: MODEL_AEC, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_ME, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_FORMA, status: 'In Production' })
        )

        created.maps.push(
            insert('u_software_usage_offering_map', {
                u_vendor: 'autodesk',
                u_offering_name: OFFERING_AEC,
                u_software_model: created.models[0],
                u_active: true,
            }),
            insert('u_software_usage_offering_map', {
                u_vendor: 'autodesk',
                u_offering_name: OFFERING_ME,
                u_software_model: created.models[1],
                u_active: true,
            }),
            insert('u_software_usage_offering_map', {
                u_vendor: 'autodesk',
                u_offering_name: OFFERING_FORMA,
                u_software_model: created.models[2],
                u_active: true,
            })
        )

        created.users.push(
            insert('sys_user', {
                user_name: 'zz.atf.autodesk.active',
                first_name: 'ZZ',
                last_name: 'AutodeskActive',
                email: EMAIL_ACTIVE,
                active: true,
            })
        )
    })

    it('imports a plain assigned row with both usage and seat data', function () {
        var result = runImport(
            csv([
                row({
                    email: EMAIL_ACTIVE,
                    offering: OFFERING_AEC,
                    assigned: '2024-05-10T21:20:32Z',
                    daysUsed: '49',
                    monthlyAverage: '16.2',
                    lastAccessed: '2026-07-29',
                }),
            ])
        )

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(1)
        expect(result.rows_imported).toBe(1)

        var sub = subscriptionFor(EMAIL_ACTIVE, created.models[0])
        expect(sub).not.toBeNull()

        expect(sub.getValue('last_activity')).toBe('2026-07-29')
        expect(parseInt(sub.getValue('u_days_used'), 10)).toBe(49)
        expect(parseFloat(sub.getValue('u_monthly_average'))).toBe(16.2)

        expect(sub.getValue('active')).toBe('true')
        expect(sub.getValue('u_seat_assignment')).toBe('assigned')
        expect(sub.getValue('u_access_option')).toBe('Subscription')
        expect(sub.getValue('user')).toBe(created.users[0])
    })

    it('stores the ISO 8601 assignment timestamp as a real date time', function () {
        runImport(
            csv([row({ email: EMAIL_ACTIVE, offering: OFFERING_AEC, assigned: '2024-04-22T17:52:56Z' })])
        )

        var sub = subscriptionFor(EMAIL_ACTIVE, created.models[0])
        expect(sub.getValue('external_created')).toBe('2024-04-22 17:52:56')
    })

    it('gives a user with two offerings two subscriptions, not one', function () {
        var result = runImport(
            csv([
                row({ email: EMAIL_TWO, offering: OFFERING_AEC, lastAccessed: '2026-07-17' }),
                row({ email: EMAIL_TWO, offering: OFFERING_FORMA, lastAccessed: '', daysUsed: '0' }),
            ])
        )

        expect(result.rows_imported).toBe(2)
        expect(countFor(EMAIL_TWO)).toBe(2)
        expect(subscriptionFor(EMAIL_TWO, created.models[0]).getValue('last_activity')).toBe('2026-07-17')
        expect(subscriptionFor(EMAIL_TWO, created.models[2]).getValue('last_activity')).toBe('')
    })

    it('keeps a revoked seat as inactive while preserving the usage it had', function () {
        var result = runImport(
            csv([
                row({
                    email: EMAIL_REVOKED,
                    offering: OFFERING_ME,
                    seat: 'unassigned',
                    assigned: '',
                    unassigned: '2026-06-23T00:01:26Z',
                    activity: 'active',
                    lastAccessed: '2026-05-21',
                }),
            ])
        )

        expect(result.rows_imported).toBe(1)
        expect(result.rows_rejected).toBe(0)

        var sub = subscriptionFor(EMAIL_REVOKED, created.models[1])
        expect(sub).not.toBeNull()
        expect(sub.getValue('active')).toBe('false')
        expect(sub.getValue('u_seat_assignment')).toBe('unassigned')
        expect(sub.getValue('u_unassigned_date')).toBe('2026-06-23 00:01:26')
        expect(sub.getValue('unlicensed_subscription')).toBe('true')

        expect(sub.getValue('last_activity')).toBe('2026-05-21')
    })

    it('stores days_used of zero instead of treating it as blank', function () {
        runImport(
            csv([
                row({
                    email: EMAIL_ACTIVE,
                    offering: OFFERING_ME,
                    daysUsed: '0',
                    monthlyAverage: '0',
                    lastAccessed: '',
                }),
            ])
        )

        var sub = subscriptionFor(EMAIL_ACTIVE, created.models[1])
        expect(sub.getValue('u_days_used')).toBe('0')
    })

    it('imports a user who no longer exists in ServiceNow', function () {
        var result = runImport(
            csv([row({ email: EMAIL_GONE, offering: OFFERING_AEC, daysInactive: '239', activity: 'inactive' })])
        )

        expect(result.rows_imported).toBe(1)
        expect(result.rows_rejected).toBe(0)

        var sub = subscriptionFor(EMAIL_GONE, created.models[0])
        expect(sub).not.toBeNull()
        expect(sub.getValue('user')).toBe('')
        expect(parseInt(sub.getValue('inactive_days'), 10)).toBe(239)
    })

    it('rejects an unmapped offering and names it in the message', function () {
        var result = runImport(csv([row({ email: EMAIL_ACTIVE, offering: OFFERING_UNMAPPED })]))

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)

        var staging = new GlideRecord('u_autodesk_usage_import')
        staging.addQuery('u_offering_name', OFFERING_UNMAPPED)
        staging.orderByDesc('sys_created_on')
        staging.setLimit(1)
        staging.query()
        expect(staging.next()).toBe(true)
        expect(staging.getValue('u_import_message')).toContain(OFFERING_UNMAPPED)
    })

    it('rejects an offering whose map row has no software model yet', function () {
        var unmappedRow = insert('u_software_usage_offering_map', {
            u_vendor: 'autodesk',
            u_offering_name: 'ZZ ATF Unfilled Offering',
            u_active: true,
        })
        created.maps.push(unmappedRow)

        var result = runImport(csv([row({ email: EMAIL_ACTIVE, offering: 'ZZ ATF Unfilled Offering' })]))

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('normalises an upper case email instead of creating a second record', function () {
        runImport(
            csv([
                row({
                    email: 'ZZ.ATF.Autodesk.Active@example.invalid',
                    offering: OFFERING_AEC,
                    lastAccessed: '2026-06-02',
                }),
            ])
        )

        expect(countFor(EMAIL_ACTIVE, created.models[0])).toBe(1)
        expect(subscriptionFor(EMAIL_ACTIVE, created.models[0]).getValue('last_activity')).toBe('2026-06-02')
    })

    it('is idempotent: the same file twice creates nothing new', function () {
        var file = csv([
            row({ email: EMAIL_ACTIVE, offering: OFFERING_AEC, lastAccessed: '2026-07-01' }),
            row({ email: EMAIL_REVOKED, offering: OFFERING_ME, seat: 'unassigned', unassigned: '2026-06-23T00:01:26Z' }),
        ])

        runImport(file)
        var before = countFor(EMAIL_ACTIVE) + countFor(EMAIL_REVOKED)

        var second = runImport(file)
        expect(second.rows_created).toBe(0)
        expect(countFor(EMAIL_ACTIVE) + countFor(EMAIL_REVOKED)).toBe(before)
    })

    it('runs the Autodesk map and not another one', function () {
        var before = new GlideAggregate('sys_import_set_row_error')
        before.addAggregate('COUNT')
        before.query()
        before.next()
        var errorsBefore = parseInt(before.getAggregate('COUNT'), 10)

        var result = runImport(csv([row({ email: EMAIL_ACTIVE, offering: OFFERING_AEC })]))
        expect(result.rows_imported).toBe(1)

        var after = new GlideAggregate('sys_import_set_row_error')
        after.addAggregate('COUNT')
        after.query()
        after.next()
        expect(parseInt(after.getAggregate('COUNT'), 10)).toBe(errorsBefore)
    })

    it('points the Excel data source at the second sheet, where the users are', function () {
        var ds = new GlideRecord('sys_data_source')
        ds.addQuery('name', 'Autodesk Usage Report - Excel')
        ds.setLimit(1)
        ds.query()
        expect(ds.next()).toBe(true)

        expect(parseInt(ds.getValue('sheet_number'), 10)).toBe(2)
    })

    afterAll(function () {
        var subs = new GlideRecord('samp_sw_subscription')
        subs.addQuery('software_model', 'IN', created.models.join(','))
        subs.query()
        subs.deleteMultiple()

        function purge(table, ids) {
            for (var i = 0; i < ids.length; i++) {
                var gr = new GlideRecord(table)
                if (gr.get(ids[i])) {
                    gr.deleteRecord()
                }
            }
        }
        purge('sc_req_item', created.ritms)
        purge('u_software_usage_offering_map', created.maps)
        purge('sys_user', created.users)
        purge('cmdb_software_product_model', created.models)
    })
})
