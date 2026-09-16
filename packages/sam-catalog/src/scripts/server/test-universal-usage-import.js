describe('Universal software usage import', function () {
    var created = { models: [], users: [], ritms: [], subs: [] }
    var MODEL_A = 'ZZ ATF Universal Model A'
    var MODEL_B = 'ZZ ATF Universal Model B'
    var MODEL_C = 'ZZ ATF Universal Model C'
    var EMAIL_A = 'zz.atf.universal.a@example.invalid'
    var EMAIL_B = 'zz.atf.universal.b@example.invalid'
    var EMAIL_C = 'zz.atf.universal.c@example.invalid'

    function insert(table, values) {
        var gr = new GlideRecord(table)
        gr.initialize()
        for (var f in values) {
            gr.setValue(f, values[f])
        }
        var id = gr.insert()
        return id
    }

    function makeRitm(csv, useCatalogTableName) {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF universal usage import' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        var attachmentId = new GlideSysAttachment().write(ritm, 'usage.csv', 'text/csv', csv)

        if (useCatalogTableName !== false) {
            var att = new GlideRecord('sys_attachment')
            att.get(attachmentId)
            att.setValue('table_name', 'ZZ_YYsc_req_item')
            att.update()
        }
        return ritmId
    }

    function runImport(csv, useCatalogTableName) {
        return new UniversalUsageImporter().importFromRequestItem(makeRitm(csv, useCatalogTableName))
    }

    function subscriptionFor(email, modelId) {
        var gr = new GlideRecord('samp_sw_subscription')
        gr.addQuery('user_principal_name', email)
        gr.addQuery('software_model', modelId)
        gr.query()
        return gr.next() ? gr : null
    }

    beforeAll(function () {
        created.models.push(
            insert('cmdb_software_product_model', { name: MODEL_A, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_B, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_C, status: 'In Production' })
        )
        created.users.push(
            insert('sys_user', { user_name: 'zz.atf.universal.a', first_name: 'ZZ', last_name: 'AtfA', email: EMAIL_A, active: true }),
            insert('sys_user', { user_name: 'zz.atf.universal.b', first_name: 'ZZ', last_name: 'AtfB', email: EMAIL_B, active: true }),
            insert('sys_user', { user_name: 'zz.atf.universal.c', first_name: 'ZZ', last_name: 'AtfC', email: EMAIL_C, active: true })
        )
    })

    it('imports a valid row and writes the subscription', function () {
        var csv =
            'Software Model,User Email,Last Activity\n' + MODEL_A + ',' + EMAIL_A + ',2026-07-31\n'
        var result = runImport(csv)

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(1)
        expect(result.rows_imported).toBe(1)
        expect(result.rows_rejected).toBe(0)

        var sub = subscriptionFor(EMAIL_A, created.models[0])
        expect(sub).not.toBeNull()
        expect(sub.getValue('last_activity')).toBe('2026-07-31')
        expect(sub.getValue('user')).toBe(created.users[0])
        expect(sub.getValue('sourced_from_integration')).toBe('no')
        expect(sub.getValue('subscription_identifier')).toBe('UNIVERSAL|' + EMAIL_A + '|' + MODEL_A.toLowerCase())
        created.subs.push(sub.getUniqueValue())
    })

    it('accepts an empty last activity as never used', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_B + ',' + EMAIL_B + ',\n'
        var result = runImport(csv)

        expect(result.rows_imported).toBe(1)
        expect(result.rows_rejected).toBe(0)

        var sub = subscriptionFor(EMAIL_B, created.models[1])
        expect(sub).not.toBeNull()
        expect(sub.getValue('last_activity')).toBe('')
        created.subs.push(sub.getUniqueValue())
    })

    it('rejects an unknown software model', function () {
        var csv = 'Software Model,User Email,Last Activity\nZZ Model That Does Not Exist,' + EMAIL_A + ',2026-07-31\n'
        var result = runImport(csv)

        expect(result.rows_read).toBe(1)
        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('rejects an unknown user email', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_A + ',nobody.zz@example.invalid,2026-07-31\n'
        var result = runImport(csv)

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('rejects a date that is not yyyy-MM-dd', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_A + ',' + EMAIL_A + ',31/07/2026\n'
        var result = runImport(csv)

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('rejects a date that matches the format but is not a real day', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_A + ',' + EMAIL_A + ',2026-02-30\n'
        var result = runImport(csv)

        expect(result.rows_imported).toBe(0)
        expect(result.rows_rejected).toBe(1)
    })

    it('processes a mixed file row by row instead of failing whole', function () {
        var csv =
            'Software Model,User Email,Last Activity\n' +
            MODEL_A + ',' + EMAIL_A + ',2026-05-01\n' +
            'ZZ Missing Model,' + EMAIL_B + ',2026-05-01\n' +
            MODEL_B + ',' + EMAIL_B + ',2026-05-02\n'
        var result = runImport(csv)

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(3)
        expect(result.rows_imported).toBe(2)
        expect(result.rows_rejected).toBe(1)
    })

    it('updates instead of duplicating when the same file is uploaded again', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_A + ',' + EMAIL_A + ',2026-09-09\n'
        runImport(csv)

        var count = new GlideAggregate('samp_sw_subscription')
        count.addQuery('subscription_identifier', 'UNIVERSAL|' + EMAIL_A + '|' + MODEL_A.toLowerCase())
        count.addAggregate('COUNT')
        count.query()
        count.next()

        expect(parseInt(count.getAggregate('COUNT'), 10)).toBe(1)

        var sub = subscriptionFor(EMAIL_A, created.models[0])
        expect(sub.getValue('last_activity')).toBe('2026-09-09')
    })

    it('separates rows written from rows that changed nothing', function () {
        var csv =
            'Software Model,User Email,Last Activity\n' +
            MODEL_C + ',' + EMAIL_C + ',2026-06-01\n' +
            MODEL_C + ',' + EMAIL_C + ',2026-06-01\n'
        var result = runImport(csv)

        expect(result.ok).toBe(true)
        expect(result.rows_read).toBe(2)
        expect(result.rows_imported).toBe(2)
        expect(result.rows_created).toBe(1)
        expect(result.rows_unchanged).toBe(1)
        expect(result.rows_rejected).toBe(0)
        expect(result.message).toContain('1 subscription(s) created')
        expect(result.message).toContain('1 unchanged')

        var count = new GlideAggregate('samp_sw_subscription')
        count.addQuery('subscription_identifier', 'UNIVERSAL|' + EMAIL_C + '|' + MODEL_C.toLowerCase())
        count.addAggregate('COUNT')
        count.query()
        count.next()

        expect(parseInt(count.getAggregate('COUNT'), 10)).toBe(1)
    })

    it('counts a row that changed an existing subscription as updated', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_C + ',' + EMAIL_C + ',2026-06-02\n'
        var result = runImport(csv)

        expect(result.rows_created).toBe(0)
        expect(result.rows_updated).toBe(1)
        expect(result.rows_unchanged).toBe(0)

        var sub = subscriptionFor(EMAIL_C, created.models[2])
        expect(sub.getValue('last_activity')).toBe('2026-06-02')
    })

    it('finds an attachment stored with the plain sc_req_item table name too', function () {
        var csv = 'Software Model,User Email,Last Activity\n' + MODEL_B + ',' + EMAIL_B + ',2026-03-03\n'
        var result = runImport(csv, false)

        expect(result.ok).toBe(true)
        expect(result.rows_imported).toBe(1)
    })

    it('reports a clear failure when there is no attachment at all', function () {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF universal usage - no file' })
        created.ritms.push(ritmId)

        var result = new UniversalUsageImporter().importFromRequestItem(ritmId)

        expect(result.ok).toBe(false)
        expect(result.message).toContain('No .csv or .xlsx attachment')
    })

    it('refuses an invalid request item sys_id', function () {
        var result = new UniversalUsageImporter().importFromRequestItem('not-a-sys-id')
        expect(result.ok).toBe(false)
    })

    it('accepts a GlideRecord instead of a sys_id string, as Flow Designer hands it over', function () {
        var ritmId = insert('sc_req_item', { short_description: 'ZZ ATF universal glide record input' })
        created.ritms.push(ritmId)

        var ritm = new GlideRecord('sc_req_item')
        ritm.get(ritmId)
        new GlideSysAttachment().write(
            ritm,
            'usage.csv',
            'text/csv',
            'Software Model,User Email,Last Activity\n' + MODEL_A + ',' + EMAIL_A + ',2026-04-04\n'
        )

        var result = new UniversalUsageImporter().importFromRequestItem(ritm, 'universal')

        expect(result.ok).toBe(true)
        expect(result.rows_imported).toBe(1)
    })

    afterAll(function () {
        function purge(table, ids) {
            for (var i = 0; i < ids.length; i++) {
                var gr = new GlideRecord(table)
                if (gr.get(ids[i])) {
                    gr.deleteRecord()
                }
            }
        }
        var subs = new GlideRecord('samp_sw_subscription')
        subs.addQuery('subscription_identifier', 'STARTSWITH', 'UNIVERSAL|zz.atf.universal')
        subs.query()
        subs.deleteMultiple()

        purge('sc_req_item', created.ritms)
        purge('sys_user', created.users)
        purge('cmdb_software_product_model', created.models)
    })
})
