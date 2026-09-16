describe('Entra group provisioner - mapping', function () {
    var created = { models: [], users: [], maps: [] }
    var MAPPING_TABLE = 'u_software_entra_group'
    var MODEL_ONE = 'ZZ ATF Entra Model One'
    var MODEL_TWO = 'ZZ ATF Entra Model Two'
    var MODEL_NONE = 'ZZ ATF Entra Model Without Group'
    var GROUP_A = '00000000-0000-4000-8000-000000000001'
    var GROUP_B = '00000000-0000-4000-8000-000000000002'

    function insert(table, values) {
        var gr = new GlideRecord(table)
        gr.initialize()
        for (var f in values) {
            gr.setValue(f, values[f])
        }
        return gr.insert()
    }

    function mapGroup(modelId, groupId, groupName, active) {
        var id = insert(MAPPING_TABLE, {
            u_software_model: modelId,
            u_entra_group_id: groupId,
            u_entra_group_name: groupName,
            u_active: active === false ? false : true,
        })
        created.maps.push(id)
        return id
    }

    beforeAll(function () {
        created.models.push(
            insert('cmdb_software_product_model', { name: MODEL_ONE, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_TWO, status: 'In Production' }),
            insert('cmdb_software_product_model', { name: MODEL_NONE, status: 'In Production' })
        )
        created.users.push(
            insert('sys_user', {
                user_name: 'zz.atf.entra.guid',
                first_name: 'ZZ',
                last_name: 'AtfEntraGuid',
                email: 'zz.atf.entra.guid@example.invalid',
                u_objectguid: '00000000-0000-4000-8000-000000000003',
                active: true,
            }),
            insert('sys_user', {
                user_name: 'zz.atf.entra.noguid',
                first_name: 'ZZ',
                last_name: 'AtfEntraNoGuid',
                active: true,
            })
        )
    })

    it('resolves a single active mapping', function () {
        mapGroup(created.models[0], GROUP_A, 'Lic - Test Group A')

        var result = new EntraGroupProvisioner().resolveGroup(created.models[0])

        expect(result.status).toBe('ok')
        expect(result.group_id).toBe(GROUP_A)
        expect(result.group_name).toBe('Lic - Test Group A')
    })

    it('reports no automation when the model has no mapping', function () {
        var result = new EntraGroupProvisioner().resolveGroup(created.models[2])

        expect(result.status).toBe('none')
        expect(result.group_id).toBe('')
    })

    it('refuses to choose when a model maps to more than one active group', function () {
        mapGroup(created.models[1], GROUP_A, 'Lic - Teams Domestic Calling')
        mapGroup(created.models[1], GROUP_B, 'Lic - Teams International Calling')

        var result = new EntraGroupProvisioner().resolveGroup(created.models[1])

        expect(result.status).toBe('ambiguous')
        expect(result.group_id).toBe('')
        expect(result.message).toContain('2 active Entra groups')
    })

    it('ignores an inactive mapping', function () {

        mapGroup(created.models[0], GROUP_B, 'Lic - Retired Group', false)

        var result = new EntraGroupProvisioner().resolveGroup(created.models[0])

        expect(result.status).toBe('ok')
        expect(result.group_id).toBe(GROUP_A)
    })

    it('reads the Entra object id from the user record', function () {
        var result = new EntraGroupProvisioner().resolveUserId(created.users[0])

        expect(result.ok).toBe(true)
        expect(result.user_id).toBe('00000000-0000-4000-8000-000000000003')
    })

    it('refuses a user with neither an object id nor an email', function () {
        var result = new EntraGroupProvisioner().resolveUserId(created.users[1])

        expect(result.ok).toBe(false)
        expect(result.message).toContain('objectGUID')
    })

    it('refuses an empty software model instead of matching every mapping', function () {
        var result = new EntraGroupProvisioner().resolveGroup('')

        expect(result.status).toBe('none')
        expect(result.message).toContain('No software model')
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
        purge(MAPPING_TABLE, created.maps)
        purge('sys_user', created.users)
        purge('cmdb_software_product_model', created.models)
    })
})
