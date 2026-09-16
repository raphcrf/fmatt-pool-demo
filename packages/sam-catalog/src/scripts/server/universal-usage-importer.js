var UniversalUsageImporter = Class.create()

UniversalUsageImporter.prototype = {
    initialize: function () {},

    PROFILES: {
        universal: {
            csv: 'Universal Software Usage - CSV',
            excel: 'Universal Software Usage - Excel',
            staging: 'u_software_usage_import',
            map: 'Universal Software Usage Transform',
        },
        visio: {
            csv: 'Visio Usage Report - CSV',
            excel: 'Visio Usage Report - Excel',
            staging: 'u_visio_usage_import',
            map: 'Visio Usage Report Transform',
        },
        project: {
            csv: 'Project Usage Report - CSV',
            excel: 'Project Usage Report - Excel',
            staging: 'u_project_usage_import',
            map: 'Project Usage Report Transform',
        },
        autodesk: {
            csv: 'Autodesk Usage Report - CSV',
            excel: 'Autodesk Usage Report - Excel',
            staging: 'u_autodesk_usage_import',
            map: 'Autodesk Usage Report Transform',
        },
    },

    resolveOfferingModel: function (vendor, offeringName) {
        var offering = String(offeringName || '').trim()
        if (!offering) {
            return ''
        }

        var map = new GlideRecord('u_software_usage_offering_map')
        if (!map.isValid()) {
            gs.error('UniversalUsageImporter: table u_software_usage_offering_map is not available.')
            return ''
        }

        map.addQuery('u_vendor', String(vendor || '').trim())
        map.addQuery('u_offering_name', offering)
        map.addQuery('u_active', true)
        map.setLimit(1)
        map.query()

        return map.next() ? String(map.getValue('u_software_model') || '') : ''
    },

    importFromRequestItem: function (requestItemId, profileName) {
        var result = {
            ok: false,
            message: '',
            file_name: '',
            rows_read: 0,
            rows_imported: 0,
            rows_rejected: 0,

            rows_created: 0,
            rows_updated: 0,
            rows_unchanged: 0,
        }

        var ritmId = this._toSysId(requestItemId)
        if (!/^[0-9a-f]{32}$/.test(ritmId)) {
            result.message = 'A valid request item sys_id is required, received: "' + ritmId + '".'
            gs.error('UniversalUsageImporter: invalid request item sys_id received: "' + ritmId + '"')
            return result
        }

        var name = String(profileName || '').trim()
        if (!name) {
            name = this._detectProfile(ritmId)
        }

        var profile = this.PROFILES[name]
        if (!profile) {
            result.message =
                'Could not determine which import profile to use. Report source read from the request item: "' +
                name +
                '".'
            gs.error('UniversalUsageImporter: unresolved import profile "' + name + '" for request item ' + ritmId)
            return result
        }

        var attachment = this._findTemplateAttachment(ritmId)
        if (!attachment) {
            result.message = 'No .csv or .xlsx attachment was found on the request item.'
            return result
        }
        result.file_name = attachment.name

        var dataSource = this._getDataSource(attachment.isExcel ? profile.excel : profile.csv)
        if (!dataSource) {
            result.message = 'Data source not found. The application may be partially installed.'
            return result
        }

        this._clearAttachments(dataSource)

        var copied = this._copyToDataSource(attachment, dataSource)
        if (!copied) {
            result.message =
                'Could not copy "' + attachment.name + '" to the data source. The file may be empty or unreadable.'
            return result
        }

        var loaded = this._loadAndTransform(dataSource, profile.map)
        if (!loaded.ok) {
            result.message = loaded.message
            return result
        }

        var counts = this._countRows(loaded.importSetId, profile.staging)
        result.rows_read = counts.total
        result.rows_imported = counts.processed
        result.rows_rejected = counts.rejected
        result.rows_created = counts.created
        result.rows_updated = counts.updated
        result.rows_unchanged = counts.unchanged

        // ok deixa de ser incondicional. Antes, ler 3.406 linhas e gravar zero
        // subscription era indistinguível de sucesso para quem chama, e o flow
        // fechava o RITM como Closed Complete. É o estado de fábrica de dois
        // perfis: com a property do modelo vazia, o transform rejeita toda linha.
        //
        // 'unchanged' conta como sucesso de propósito: é o resultado correto de
        // reenviar o mesmo arquivo, que é o teste de idempotência.
        result.ok = counts.created + counts.updated + counts.unchanged > 0
        result.message = this._buildMessage(counts)
        if (!result.ok) {
            result.message = ('No subscription was created or updated. ' + result.message).substring(0, 255)
        }

        return result
    },

    _buildMessage: function (counts) {
        var message =
            'Processed ' +
            counts.total +
            ' row(s): ' +
            counts.created +
            ' subscription(s) created, ' +
            counts.updated +
            ' updated, ' +
            counts.unchanged +
            ' unchanged (duplicate row or no change), ' +
            counts.rejected +
            ' rejected.'

        if (counts.warned > 0) {
            message += ' ' + counts.warned + ' row(s) imported with warnings.'
        }
        if (counts.skipped > 0) {
            message += ' ' + counts.skipped + ' blank row(s) skipped.'
        }
        if (counts.errored > 0) {
            message += ' ' + counts.errored + ' row(s) failed at the platform level, see sys_import_set_row_error.'
        }
        if (counts.unmatched > 0) {
            message += ' ' + counts.unmatched + ' row(s) had no single matching subscription to update.'
        }

        return message.length > 255 ? message.substring(0, 255) : message
    },

    _detectProfile: function (requestItemId) {
        var gr = new GlideRecord('sc_item_option_mtom')
        if (!gr.isValid()) {
            return ''
        }
        gr.addQuery('request_item', requestItemId)
        gr.addQuery('sc_item_option.item_option_new.name', 'report_source')
        gr.setLimit(1)
        gr.query()

        if (!gr.next()) {
            return ''
        }
        return String(gr.getValue('sc_item_option.value') || '').trim()
    },

    _toSysId: function (value) {
        if (!value) {
            return ''
        }
        if (typeof value === 'string') {
            return value.trim()
        }
        if (typeof value.getUniqueValue === 'function') {
            return String(value.getUniqueValue() || '').trim()
        }
        if (value.sys_id) {
            return String(value.sys_id).trim()
        }
        return String(value).trim()
    },

    _findTemplateAttachment: function (requestItemId) {
        var gr = new GlideRecord('sys_attachment')

        // Anexo de variavel de catalogo nasce como 'ZZ_YYsc_req_item'. Consultar os dois.
        gr.addQuery('table_name', 'IN', 'sc_req_item,ZZ_YYsc_req_item')
        gr.addQuery('table_sys_id', requestItemId)
        gr.orderByDesc('sys_created_on')
        gr.query()

        while (gr.next()) {
            var name = gr.getValue('file_name') || ''
            var lower = name.toLowerCase()
            var found = {
                sysId: gr.getUniqueValue(),
                name: name,
                tableName: gr.getValue('table_name'),
                contentType: gr.getValue('content_type') || 'application/octet-stream',
            }
            if (lower.indexOf('.xlsx', lower.length - 5) !== -1) {
                found.isExcel = true
                return found
            }
            if (lower.indexOf('.csv', lower.length - 4) !== -1) {
                found.isExcel = false
                return found
            }
        }
        return null
    },

    _getDataSource: function (name) {
        var gr = new GlideRecord('sys_data_source')
        if (!gr.isValid()) {
            return null
        }
        gr.addQuery('name', name)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr : null
    },

    _clearAttachments: function (dataSource) {
        var gr = new GlideRecord('sys_attachment')
        gr.addQuery('table_name', 'IN', 'sys_data_source,ZZ_YYsys_data_source')
        gr.addQuery('table_sys_id', dataSource.getUniqueValue())
        gr.query()
        gr.deleteMultiple()
    },

    _copyToDataSource: function (attachment, dataSource) {
        var api = new GlideSysAttachment()

        // getContentBase64 e API de escopo: devolve vazio em silencio em app Global.
        var stream = api.getContentStream(attachment.sysId)
        if (!stream) {
            gs.error('UniversalUsageImporter: attachment ' + attachment.sysId + ' returned no content stream.')
            return false
        }

        api.writeContentStream(dataSource, attachment.name, attachment.contentType, stream)
        this._normaliseTableName(dataSource)

        dataSource.setValue('file_path', attachment.name)
        dataSource.setValue(

            // O loader le connection_url, nao sys_attachment. Vazio aqui produz
            // "Connection URL cannot be empty" com o arquivo intacto ao lado.
            'connection_url',
            'attachment://sys_data_source:' + dataSource.getUniqueValue() + '/' + attachment.name
        )
        dataSource.update()

        var check = new GlideAggregate('sys_attachment')
        check.addQuery('table_name', 'sys_data_source')
        check.addQuery('table_sys_id', dataSource.getUniqueValue())
        check.addAggregate('COUNT')
        check.query()
        return check.next() && parseInt(check.getAggregate('COUNT'), 10) > 0
    },

    _normaliseTableName: function (dataSource) {
        var gr = new GlideRecord('sys_attachment')
        gr.addQuery('table_name', 'ZZ_YYsys_data_source')
        gr.addQuery('table_sys_id', dataSource.getUniqueValue())
        gr.query()
        while (gr.next()) {
            gr.setValue('table_name', 'sys_data_source')
            gr.update()
        }
    },

    _loadAndTransform: function (dataSource, mapName) {
        try {
            var map = new GlideRecord('sys_transform_map')
            map.addQuery('name', mapName)
            map.setLimit(1)
            map.query()
            if (!map.next()) {
                return { ok: false, importSetId: '', message: 'Transform map not found: "' + mapName + '".' }
            }

            var loader = new GlideImportSetLoader()
            var importSet = loader.getImportSetGr(dataSource)
            loader.loadImportSetTable(importSet, dataSource)

            var transformer = new GlideImportSetTransformer()

            // Sem setMapID, transformAllMaps escolhe o map errado e as linhas falham
            // no coalesce de um campo que nem existe na staging.
            transformer.setMapID(map.getUniqueValue())
            transformer.transformAllMaps(importSet)

            return { ok: true, importSetId: importSet.getUniqueValue(), message: '' }
        } catch (e) {
            gs.error('UniversalUsageImporter: load or transform failed - ' + e.message)
            return { ok: false, importSetId: '', message: 'Load failed: ' + e.message }
        }
    },

    _countRows: function (importSetId, stagingTable) {
        var counts = {
            total: 0,
            processed: 0,
            created: 0,
            updated: 0,
            unchanged: 0,
            warned: 0,
            rejected: 0,
            skipped: 0,
            errored: 0,
            unmatched: 0,
        }

        var gr = new GlideRecord(stagingTable)
        if (!gr.isValid()) {
            return counts
        }
        gr.addQuery('sys_import_set', importSetId)
        gr.query()

        while (gr.next()) {
            counts.total++
            var status = gr.getValue('u_import_status')

            if (status === 'rejected') {
                counts.rejected++
                continue
            }
            // Balde proprio, separado de 'skipped' e de 'rejected': a linha estava
            // boa, so nao havia subscription para atualizar. E o resultado normal
            // do perfil Project, que so atualiza. Chamar isso de "blank row" ou de
            // rejeicao mentiria para quem le o resumo.
            if (status === 'no_subscription' || status === 'ambiguous') {
                counts.unmatched++
                continue
            }
            if (status !== 'processed' && status !== 'processed_with_warning') {
                counts.skipped++
                continue
            }

            counts.processed++
            if (status === 'processed_with_warning') {
                counts.warned++
            }

            // 'unchanged' era o else pega-tudo, e por isso engolia sys_import_state
            // 'error': a linha que a plataforma recusou entrava na contagem de
            // sucesso. Como o ok da carga agora se apoia em created+updated+
            // unchanged, o balde pega-tudo reabriria pela outra porta exatamente
            // o defeito que ele existe para fechar. Só 'ignored' é ausência de
            // mudança; o resto é falha e fica de fora da soma.
            var importState = gr.getValue('sys_import_state')
            if (importState === 'inserted') {
                counts.created++
            } else if (importState === 'updated') {
                counts.updated++
            } else if (importState === 'ignored') {
                counts.unchanged++
            } else {
                counts.errored++
            }
        }
        return counts
    },

    VISIO_MODELS_PROPERTY: 'software_license_offerings.visio_software_model',

    /**
     * Os modelos que contam como Visio nesta instancia.
     *
     * A property aceita UM sys_id ou uma LISTA separada por virgula. Era um valor
     * so, e o ambiente tem mais de um produto Visio -- um unico modelo nao dava
     * conta. Aceitar lista mantem compatibilidade: quem tem um valor so continua
     * funcionando sem mexer em nada.
     *
     * Filtra por formato: entrada que nao e sys_id de 32 hex e descartada em vez
     * de virar uma query invalida.
     */
    visioModelsFromProperty: function () {
        var raw = String(gs.getProperty(this.VISIO_MODELS_PROPERTY, '') || '')
        var partes = raw.split(',')
        var saida = []
        for (var i = 0; i < partes.length; i++) {
            var id = partes[i].trim().toLowerCase()
            if (/^[0-9a-f]{32}$/.test(id) && saida.indexOf(id) === -1) {
                saida.push(id)
            }
        }
        return saida
    },

    /**
     * Em qual subscription de Visio o uso deste usuario deve entrar.
     *
     * A premissa do negocio e que cada pessoa tem no maximo UMA licenca de Visio
     * por vez. Entao nao e o relatorio que decide o modelo: e a subscription que a
     * pessoa ja tem. O relatorio so diz que ela usou.
     *
     * O filtro por modelo continua existindo e e proposital: relatorio de uso de
     * Visio nao pode encostar em subscription de outro software. A property define
     * o conjunto do que e Visio; dentro desse conjunto, tanto faz qual.
     *
     * Devolve status em vez de string vazia para que quem chama saiba a diferenca
     * entre "configuracao faltando" (problema de implantacao, rejeita) e "esta
     * pessoa nao tem licenca de Visio" (dado, nao erro).
     */
    visioModelForUser: function (userPrincipalName) {
        var resultado = { status: 'no_models', model_id: '', message: '' }

        var upn = String(userPrincipalName || '').trim().toLowerCase()
        if (!upn) {
            resultado.status = 'no_upn'
            resultado.message = 'The row has no user principal name.'
            return resultado
        }

        var modelos = this.visioModelsFromProperty()
        if (!modelos.length) {
            resultado.message =
                'Property ' + this.VISIO_MODELS_PROPERTY + ' has no valid software model sys_id.'
            return resultado
        }

        var sub = new GlideRecord('samp_sw_subscription')
        if (!sub.isValid()) {
            resultado.status = 'no_table'
            resultado.message = 'Table samp_sw_subscription is not available on this instance.'
            return resultado
        }
        sub.addQuery('user_principal_name', upn)
        sub.addQuery('software_model', 'IN', modelos.join(','))
        sub.setLimit(2)
        sub.query()

        if (!sub.next()) {
            resultado.status = 'no_subscription'
            resultado.message = 'No Visio subscription exists for this user, so the usage was not attributed.'
            return resultado
        }

        var achado = String(sub.getValue('software_model') || '')

        // Duas subscriptions de Visio contradizem a premissa de uma licenca por
        // pessoa. Escolher uma seria adivinhar, e escrever uso na errada e pior do
        // que nao escrever: nao atribui e reporta, para alguem olhar o cadastro.
        if (sub.next()) {
            resultado.status = 'ambiguous'
            resultado.message =
                'This user has more than one Visio subscription, so the usage was not attributed. Check the subscription records.'
            return resultado
        }

        resultado.status = 'ok'
        resultado.model_id = achado
        return resultado
    },

    type: 'UniversalUsageImporter',
}
