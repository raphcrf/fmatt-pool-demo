describe('Visio usage report import', function () {
    var created = { models: [], users: [], ritms: [] }
    var MODEL = 'ZZ ATF Visio Model'
    var EMAIL_ACTIVE = 'zz.atf.visio.active@example.invalid'
    var EMAIL_UPPER = 'ZZ.ATF.Visio.Upper@example.invalid'
    var EMAIL_GONE = 'zz.atf.visio.departed@example.invalid'
    var HEADER =
        'Report Refresh Date,User Principal Name,Display Name,Last Activity Date,Is Visio Licensed,Report Period,Desktop,Web'
    var BOM = String.fromCharCode(0xfeff)
    var previousModelProperty = ''

    function insert(table, values) {
        var gr = new GlideRecord(table)
        gr.initialize()
        for (var f in values) {
            gr.setValue(f, values[f])
        }
        return gr.insert()
    }

    function tenantCsv(dataLines) {
        return BOM + HEADER + '\r\n' + dataLines.join('\r\n') + '\r\n'
    }

    function runImport(csv) {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF visio usage import' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        var attachmentId = new GlideSysAttachment().write(ritm, 'VisioUserDetail.csv', 'text/csv', csv)

        var att = new GlideRecord('sys_attachment')
        att.get(attachmentId)
        att.setValue('table_name', 'ZZ_YYsc_req_item')
        att.update()

        return new UniversalUsageImporter().importFromRequestItem(ritmId, 'visio')
    }

    function subscriptionFor(upn) {
        var gr = new GlideRecord('samp_sw_subscription')
        gr.addQuery('user_principal_name', upn.toLowerCase())
        gr.addQuery('software_model', created.models[0])
        gr.query()
        return gr.next() ? gr : null
    }

    beforeAll(function () {
        created.models.push(insert('cmdb_software_product_model', { name: MODEL, status: 'In Production' }))
        created.users.push(
            insert('sys_user', {
                user_name: 'zz.atf.visio.active',
                first_name: 'ZZ',
                last_name: 'VisioActive',
                email: EMAIL_ACTIVE,
                active: true,
            }),
            insert('sys_user', {
                user_name: 'zz.atf.visio.upper',
                first_name: 'ZZ',
                last_name: 'VisioUpper',
                email: EMAIL_UPPER.toLowerCase(),
                active: true,
            })
        )

        previousModelProperty = gs.getProperty('software_license_offerings.visio_software_model', '')
        gs.setProperty('software_license_offerings.visio_software_model', created.models[0])
    })

    it('imports the tenant layout with BOM and CRLF untouched', function () {
        var result = runImport(
            tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-07-10,True,30,False,True'])
        )

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(1)
        expect(result.rows_imported).toBe(1)

        var sub = subscriptionFor(EMAIL_ACTIVE)
        expect(sub).not.toBeNull()
        expect(sub.getValue('last_activity')).toBe('2026-07-10')
        expect(sub.getValue('user')).toBe(created.users[0])
        expect(sub.getValue('unlicensed_subscription')).toBe('false')
    })

    it('normalises an upper case UPN instead of creating a second record', function () {
        runImport(tenantCsv(['2026-07-21,' + EMAIL_UPPER + ',ZZ VisioUpper,2026-06-01,True,30,True,False']))
        runImport(tenantCsv(['2026-07-21,' + EMAIL_UPPER.toLowerCase() + ',ZZ VisioUpper,2026-06-02,True,30,True,False']))

        var count = new GlideAggregate('samp_sw_subscription')
        count.addQuery('user_principal_name', EMAIL_UPPER.toLowerCase())
        count.addQuery('software_model', created.models[0])
        count.addAggregate('COUNT')
        count.query()
        count.next()

        expect(parseInt(count.getAggregate('COUNT'), 10)).toBe(1)
        expect(subscriptionFor(EMAIL_UPPER).getValue('last_activity')).toBe('2026-06-02')
    })

    it('keeps a row whose user no longer exists, which is the point of the report', function () {
        var result = runImport(
            tenantCsv(['2026-07-21,' + EMAIL_GONE + ',ZZ Departed,2026-05-05,True,30,False,False'])
        )

        expect(result.rows_imported).toBe(1)
        expect(result.rows_rejected).toBe(0)

        var sub = subscriptionFor(EMAIL_GONE)
        expect(sub).not.toBeNull()
        expect(sub.getValue('user')).toBe('')
        expect(sub.getValue('last_activity')).toBe('2026-05-05')
    })

    it('accepts an empty last activity date', function () {
        var result = runImport(tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,,False,30,False,False']))

        expect(result.rows_imported).toBe(1)
        expect(subscriptionFor(EMAIL_ACTIVE).getValue('unlicensed_subscription')).toBe('true')
    })

    it('flags an unlicensed user instead of dropping the row', function () {
        runImport(tenantCsv(['2026-07-21,' + EMAIL_GONE + ',ZZ Departed,2026-05-06,False,30,False,False']))
        expect(subscriptionFor(EMAIL_GONE).getValue('unlicensed_subscription')).toBe('true')
    })

    it('processes a multi row file in one pass', function () {
        var result = runImport(
            tenantCsv([
                '2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-07-20,True,30,True,True',
                '2026-07-21,' + EMAIL_UPPER + ',ZZ VisioUpper,2026-07-19,True,30,True,False',
                '2026-07-21,' + EMAIL_GONE + ',ZZ Departed,2026-07-18,False,30,False,False',
            ])
        )

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(3)
        expect(result.rows_imported).toBe(3)
        expect(result.rows_rejected).toBe(0)
    })

    it('enriches an existing subscription instead of duplicating it', function () {

        var existing = insert('samp_sw_subscription', {
            software_model: created.models[0],
            user_principal_name: 'zz.atf.visio.preexisting@example.invalid',
            subscription_identifier: 'VISIOCLIENT',
            active: true,
        })

        runImport(
            tenantCsv([
                '2026-07-21,zz.atf.visio.preexisting@example.invalid,ZZ Pre,2026-07-11,True,30,True,False',
            ])
        )

        var gr = new GlideRecord('samp_sw_subscription')
        gr.get(existing)
        expect(gr.getValue('last_activity')).toBe('2026-07-11')

        var count = new GlideAggregate('samp_sw_subscription')
        count.addQuery('user_principal_name', 'zz.atf.visio.preexisting@example.invalid')
        count.addAggregate('COUNT')
        count.query()
        count.next()
        expect(parseInt(count.getAggregate('COUNT'), 10)).toBe(1)
    })

    it('rejects every row when the Visio model property is empty', function () {
        gs.setProperty('software_license_offerings.visio_software_model', '')
        var result = runImport(
            tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-07-10,True,30,False,True'])
        )
        gs.setProperty('software_license_offerings.visio_software_model', created.models[0])

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('detects the visio profile from the request item when none is passed', function () {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF visio profile detection' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        var attachmentId = new GlideSysAttachment().write(
            ritm,
            'VisioUserDetail.csv',
            'text/csv',
            tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-08-08,True,30,True,False'])
        )
        var att = new GlideRecord('sys_attachment')
        att.get(attachmentId)
        att.setValue('table_name', 'ZZ_YYsc_req_item')
        att.update()

        var variable = new GlideRecord('item_option_new')
        variable.addQuery('name', 'report_source')
        variable.addQuery('cat_item.name', 'Software Usage Report Import')
        variable.setLimit(1)
        variable.query()
        expect(variable.next()).toBe(true)

        var option = new GlideRecord('sc_item_option')
        option.initialize()
        option.setValue('item_option_new', variable.getUniqueValue())
        option.setValue('value', 'visio')
        var optionId = option.insert()

        var mtom = new GlideRecord('sc_item_option_mtom')
        mtom.initialize()
        mtom.setValue('request_item', ritmId)
        mtom.setValue('sc_item_option', optionId)
        mtom.insert()

        var result = new UniversalUsageImporter().importFromRequestItem(ritmId)

        expect(result.ok).toBe(true)
        expect(result.rows_imported).toBe(1)
    })

    it('refuses to guess when the request item has no report source', function () {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF visio no source' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        new GlideSysAttachment().write(ritm, 'VisioUserDetail.csv', 'text/csv', tenantCsv([]))

        var result = new UniversalUsageImporter().importFromRequestItem(ritmId)

        expect(result.ok).toBe(false)
        expect(result.message).toContain('import profile')
    })

    it('runs the Visio map and not the Universal one', function () {
        var before = new GlideAggregate('sys_import_set_row_error')
        before.addAggregate('COUNT')
        before.query()
        before.next()
        var errorsBefore = parseInt(before.getAggregate('COUNT'), 10)

        var result = runImport(
            tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-03-03,True,30,True,False'])
        )

        expect(result.rows_imported).toBe(1)

        var after = new GlideAggregate('sys_import_set_row_error')
        after.addAggregate('COUNT')
        after.query()
        after.next()
        expect(parseInt(after.getAggregate('COUNT'), 10)).toBe(errorsBefore)
    })

    it('points connection_url at the file, which is what the loader actually reads', function () {
        runImport(tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-01-01,True,30,True,False']))

        var ds = new GlideRecord('sys_data_source')
        ds.addQuery('name', 'Visio Usage Report - CSV')
        ds.setLimit(1)
        ds.query()
        expect(ds.next()).toBe(true)

        expect(ds.getValue('file_path')).toBe('VisioUserDetail.csv')
        expect(ds.getValue('connection_url')).toBe(
            'attachment://sys_data_source:' + ds.getUniqueValue() + '/VisioUserDetail.csv'
        )
    })

    it('puts exactly one loadable file on the data source', function () {
        runImport(tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-02-02,True,30,True,False']))

        var ds = new GlideRecord('sys_data_source')
        ds.addQuery('name', 'Visio Usage Report - CSV')
        ds.setLimit(1)
        ds.query()
        expect(ds.next()).toBe(true)

        var loadable = new GlideAggregate('sys_attachment')
        loadable.addQuery('table_name', 'sys_data_source')
        loadable.addQuery('table_sys_id', ds.getUniqueValue())
        loadable.addAggregate('COUNT')
        loadable.query()
        loadable.next()
        expect(parseInt(loadable.getAggregate('COUNT'), 10)).toBe(1)

        var prefixed = new GlideAggregate('sys_attachment')
        prefixed.addQuery('table_name', 'ZZ_YYsys_data_source')
        prefixed.addQuery('table_sys_id', ds.getUniqueValue())
        prefixed.addAggregate('COUNT')
        prefixed.query()
        prefixed.next()
        expect(parseInt(prefixed.getAggregate('COUNT'), 10)).toBe(0)
    })

    it('accepts a GlideRecord instead of a sys_id string, as Flow Designer hands it over', function () {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF visio glide record input' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        var attachmentId = new GlideSysAttachment().write(
            ritm,
            'VisioUserDetail.csv',
            'text/csv',
            tenantCsv(['2026-07-21,' + EMAIL_ACTIVE + ',ZZ VisioActive,2026-04-04,True,30,True,False'])
        )
        var att = new GlideRecord('sys_attachment')
        att.get(attachmentId)
        att.setValue('table_name', 'ZZ_YYsc_req_item')
        att.update()

        var result = new UniversalUsageImporter().importFromRequestItem(ritm, 'visio')

        expect(result.ok).toBe(true)
        expect(result.rows_imported).toBe(1)
    })

    afterAll(function () {
        gs.setProperty('software_license_offerings.visio_software_model', previousModelProperty)

        var subs = new GlideRecord('samp_sw_subscription')
        subs.addQuery('software_model', created.models[0])
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
        purge('sys_user', created.users)
        purge('cmdb_software_product_model', created.models)
    })
})
