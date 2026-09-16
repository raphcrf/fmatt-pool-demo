import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'action-process-universal-template': {
                        table: 'sys_hub_action_type_definition'
                        id: '28f3a699a7bf41358c6f2cd79336a397'
                    }
                    'action-provision-entra-group': {
                        table: 'sys_hub_action_type_definition'
                        id: '4c425ea5e5b94820a75e0cd7efc9f862'
                    }
                    'action-release-allocation': {
                        table: 'sys_hub_action_type_definition'
                        id: '0ff2df5ef16c472691a47cd290461548'
                    }
                    'apeg-run-provision': {
                        table: 'sys_hub_step_instance'
                        id: 'c74fa4c23e69455f847861185818a091'
                    }
                    'aput-run-import': {
                        table: 'sys_hub_step_instance'
                        id: 'c90bcda1daba48b4ad1153d82f3c6002'
                    }
                    'arla-run-release': {
                        table: 'sys_hub_step_instance'
                        id: '7be9b7fa6bd44f1488650030dc2a6193'
                    }
                    'atf-ap-approve': {
                        table: 'sys_atf_step'
                        id: '2d975b3f3f354696a703b8ea6cd1841d'
                    }
                    'atf-ap-create-manager': {
                        table: 'sys_atf_step'
                        id: 'a13526df9c2748b8b87d459ab58570ee'
                    }
                    'atf-ap-create-requester': {
                        table: 'sys_atf_step'
                        id: '960f539d971c454095a16f47b3d7922a'
                    }
                    'atf-ap-find-approval': {
                        table: 'sys_atf_step'
                        id: 'd04cab1f6f614587b00b8e12c87f3688'
                    }
                    'atf-ap-find-ritm': {
                        table: 'sys_atf_step'
                        id: '19324823c8b941f89472a3bd30382d2f'
                    }
                    'atf-ap-impersonate-manager': {
                        table: 'sys_atf_step'
                        id: '78249243a70f4207992d30ce3e7f1324'
                    }
                    'atf-ap-insert-entitlement': {
                        table: 'sys_atf_step'
                        id: '2409d59a2eff42a4bad0959b7f37aa3b'
                    }
                    'atf-ap-insert-model': {
                        table: 'sys_atf_step'
                        id: '0f770f9fa5794f538e6c3cf9cd0ec11f'
                    }
                    'atf-ap-open': {
                        table: 'sys_atf_step'
                        id: '05986c03ec33448f97926e41c8675998'
                    }
                    'atf-ap-order': {
                        table: 'sys_atf_step'
                        id: 'a2c69d0aee5343f19835d8db03a9aaaf'
                    }
                    'atf-ap-set-vars': {
                        table: 'sys_atf_step'
                        id: 'e658223da5de4c75863b1a3a383e6cf0'
                    }
                    'atf-ap-verify-allocation': {
                        table: 'sys_atf_step'
                        id: 'c0048c7aa9a1492ca40c632912024420'
                    }
                    'atf-aui-run': {
                        table: 'sys_atf_step'
                        id: '4c6f538d6f334d5aaa08b2528dccd940'
                    }
                    'atf-autodesk-usage-import': {
                        table: 'sys_atf_test'
                        id: '86236a8bf8794ac0a7b07de1532af901'
                    }
                    'atf-egp-run': {
                        table: 'sys_atf_step'
                        id: '16e5a92fc83f40db93645d925c2d87d0'
                    }
                    'atf-entra-group-provisioner': {
                        table: 'sys_atf_test'
                        id: 'c68fcf2c37924a6e83d97c9878cce8bf'
                    }
                    'atf-license-request-approval-path': {
                        table: 'sys_atf_test'
                        id: 'fd9766615a524f8f970f5a721701f344'
                    }
                    'atf-license-request-submission': {
                        table: 'sys_atf_test'
                        id: '178de0a22af3416f9c53e2736975292e'
                    }
                    'atf-license-return-submission': {
                        table: 'sys_atf_test'
                        id: '01f77979f9564556838e1c9c2ee86637'
                    }
                    'atf-lr-create-user': {
                        table: 'sys_atf_step'
                        id: 'b5edf769500f4aab8e6c4163eaffa78c'
                    }
                    'atf-lr-insert-entitlement': {
                        table: 'sys_atf_step'
                        id: 'e2a904cdd6a24446baab4a70f9d760f9'
                    }
                    'atf-lr-insert-model': {
                        table: 'sys_atf_step'
                        id: 'ac556f866f2647e8bac1b754c2c383eb'
                    }
                    'atf-lr-open': {
                        table: 'sys_atf_step'
                        id: '633cd6fcfb6743ebb8a10cfa95536f81'
                    }
                    'atf-lr-order': {
                        table: 'sys_atf_step'
                        id: '52a5b92026824d44a06046d1bbec30b5'
                    }
                    'atf-lr-set-vars': {
                        table: 'sys_atf_step'
                        id: '1034d67ec4a74ad6ab6ef4fff50aad44'
                    }
                    'atf-lt-create-user': {
                        table: 'sys_atf_step'
                        id: 'a56d0471695e48d1a99e8f3b0acee1c0'
                    }
                    'atf-lt-insert-allocation': {
                        table: 'sys_atf_step'
                        id: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                    }
                    'atf-lt-insert-entitlement': {
                        table: 'sys_atf_step'
                        id: 'ddd08d9ab3354fc78ee5216369788b19'
                    }
                    'atf-lt-insert-model': {
                        table: 'sys_atf_step'
                        id: 'd4087592c2324611a2917a2e0abf91e4'
                    }
                    'atf-lt-open': {
                        table: 'sys_atf_step'
                        id: 'b6dc4499de6145c9a2a4aab3ec3dc505'
                    }
                    'atf-lt-order': {
                        table: 'sys_atf_step'
                        id: '21ed9bdc2eea46c495dfbcd79d7669f0'
                    }
                    'atf-lt-set-vars': {
                        table: 'sys_atf_step'
                        id: 'f7acd4778a02462cbac6cdb7220b2324'
                    }
                    'atf-pr-impersonate-admin': {
                        table: 'sys_atf_step'
                        id: 'f7ac6d2383b0463490b13c43617ba82d'
                    }
                    'atf-pr-insert-model': {
                        table: 'sys_atf_step'
                        id: 'c5b39846d5e04119a50bd44f33c2cb7d'
                    }
                    'atf-pr-open': {
                        table: 'sys_atf_step'
                        id: '5c077fc83909429aa5b4c3e2752c49bf'
                    }
                    'atf-pr-order': {
                        table: 'sys_atf_step'
                        id: '27c7d5030a204cd0826a08b8fbe8555b'
                    }
                    'atf-pr-set-vars': {
                        table: 'sys_atf_step'
                        id: 'cb68c666522445faa39699617923a52c'
                    }
                    'atf-purchase-request-submission': {
                        table: 'sys_atf_test'
                        id: '0bfdccc48535436ba49666f0d0fbca60'
                    }
                    'atf-sa-insert-manufacturer': {
                        table: 'sys_atf_step'
                        id: '8099d8c610a24c3594848bc0024cd993'
                    }
                    'atf-sa-open': {
                        table: 'sys_atf_step'
                        id: 'a90f1788274c40609d3011cb3a07a4cd'
                    }
                    'atf-sa-order': {
                        table: 'sys_atf_step'
                        id: '419b2f4509604137969bc95ecb368251'
                    }
                    'atf-sa-query-department': {
                        table: 'sys_atf_step'
                        id: 'ffc54fd16ae449bda512ef24443a690f'
                    }
                    'atf-sa-set-vars': {
                        table: 'sys_atf_step'
                        id: 'b46190961ffc401da41e6979bd703971'
                    }
                    'atf-software-approval-submission': {
                        table: 'sys_atf_test'
                        id: '517cd57a57c3411dbf656002a3fac4ac'
                    }
                    'atf-ui-impersonate': {
                        table: 'sys_atf_step'
                        id: 'e3e45375335d49d4af4bff49d400c9bf'
                    }
                    'atf-ui-open': {
                        table: 'sys_atf_step'
                        id: 'db11e7bc9d9b4c18be39c6c812382a9e'
                    }
                    'atf-ui-set-source': {
                        table: 'sys_atf_step'
                        id: 'ce8f02ba31cf40c69d097908f7eb46a4'
                    }
                    'atf-ui-validate-states': {
                        table: 'sys_atf_step'
                        id: 'a753525acda74cab9b3eef4044c71a23'
                    }
                    'atf-universal-usage-import': {
                        table: 'sys_atf_test'
                        id: 'ae521be1868443e3a528b7c250c9c171'
                    }
                    'atf-usage-import-submission': {
                        table: 'sys_atf_test'
                        id: '1c596ee6e9a94d23a945c5bbc1eccebc'
                    }
                    'atf-uui-run': {
                        table: 'sys_atf_step'
                        id: '862dfd62459440d6bd753910ecc45dc2'
                    }
                    'atf-version-upgrade-submission': {
                        table: 'sys_atf_test'
                        id: 'ae2603060a0845dd84f433817fdc9f43'
                    }
                    'atf-visio-usage-import': {
                        table: 'sys_atf_test'
                        id: '602c3c40a0f64380860316d01a055499'
                    }
                    'atf-vu-insert-model': {
                        table: 'sys_atf_step'
                        id: '07fcd134099147e49bfcb9839b8ec65d'
                    }
                    'atf-vu-open': {
                        table: 'sys_atf_step'
                        id: '736f4e0d07ea4eabac854bf21ea028cb'
                    }
                    'atf-vu-order': {
                        table: 'sys_atf_step'
                        id: '6d70472150f34413951f52c2b3f03efa'
                    }
                    'atf-vu-set-vars': {
                        table: 'sys_atf_step'
                        id: 'cc32c8ae97e7410fbe9b19c1aa002fbd'
                    }
                    'atf-vui-run': {
                        table: 'sys_atf_step'
                        id: 'd4dc11936d574fdf804cfb6e325f6841'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'b396f43bb70c4f27bd86f63ce371b127'
                    }
                    'br-allocation-deleted-entra': {
                        table: 'sys_script'
                        id: '6597d79cb8044edd864e93e2d118ad67'
                    }
                    'ccs-check-license-availability': {
                        table: 'catalog_script_client'
                        id: '88501da15c0e480b9d78817605a94451'
                    }
                    'ccs-enforce-justification-length': {
                        table: 'catalog_script_client'
                        id: '8130c84443be4e09a4454cff48bf79d7'
                    }
                    'ccs-validate-removal-date': {
                        table: 'catalog_script_client'
                        id: 'f81ea33e0b5743a3b08e4837cfbb3571'
                    }
                    'ccs-validate-requested-for-active': {
                        table: 'catalog_script_client'
                        id: 'bac0fad7a8fb4c5b81d0d33e42383909'
                    }
                    'ccs-validate-required-by-date': {
                        table: 'catalog_script_client'
                        id: '14d69199b6bf4394b6ac46dab3b6504c'
                    }
                    'ccs-validate-target-version': {
                        table: 'catalog_script_client'
                        id: 'dead771c6fee490fb4b602fb0b84b2d9'
                    }
                    'ccs-warn-justification-length': {
                        table: 'catalog_script_client'
                        id: '5b99f3bed3a7454fac7f8e089d73ea15'
                    }
                    'ci-license-request': {
                        table: 'sc_cat_item'
                        id: 'fa962633a7ba49899536545156b1ff9e'
                    }
                    'ci-license-return': {
                        table: 'sc_cat_item'
                        id: '00c380f88da94094a8e2ad0a2ad0e058'
                    }
                    'ci-m365-report-import': {
                        table: 'sc_cat_item'
                        id: '85dc7a9f4804440da3bdfae92b047422'
                    }
                    'ci-software-approval': {
                        table: 'sc_cat_item'
                        id: '7b79c892a36a4100bf35cd761b7383dd'
                    }
                    'ci-software-purchase-request': {
                        table: 'sc_cat_item'
                        id: '04118c5716964c24870c52ca22cd378b'
                    }
                    'ci-version-upgrade': {
                        table: 'sc_cat_item'
                        id: '834235a0db1345fe9afb954722ad546c'
                    }
                    'ds-autodesk-usage-csv': {
                        table: 'sys_data_source'
                        id: '841b3163eb5e40a6ab0af94ae0854a1d'
                    }
                    'ds-autodesk-usage-excel': {
                        table: 'sys_data_source'
                        id: 'aff63c0fe4924a32874c09dbe12075cf'
                    }
                    'ds-project-usage-csv': {
                        table: 'sys_data_source'
                        id: 'd02778f1f3814ced933e6a2e576abb64'
                    }
                    'ds-project-usage-excel': {
                        table: 'sys_data_source'
                        id: 'effcae3ec46c468384f0b7599a2effde'
                    }
                    'ds-universal-usage-csv': {
                        table: 'sys_data_source'
                        id: '11457ba7bc5746c48127e679282db66a'
                    }
                    'ds-universal-usage-excel': {
                        table: 'sys_data_source'
                        id: 'd066e865cfc3402e9bdb95e9ee122799'
                    }
                    'ds-visio-usage-csv': {
                        table: 'sys_data_source'
                        id: '2c8ee5509057407abb3c4f9df3e8aa74'
                    }
                    'ds-visio-usage-excel': {
                        table: 'sys_data_source'
                        id: 'b5f20630742e4cdbbb5e6abba4280dd9'
                    }
                    'erad-confirmation-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'cde2a8d45806439a8da918de29a4488e'
                    }
                    'erad-end-verified': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9b7a36b92f4e4ef28ab212008b8118cd'
                    }
                    'erad-heads-up-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3d2610dd89fa4b1e91a77688fe807699'
                    }
                    'erad-if-removed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '8ddf939b1d29435bb16bb48f375e3ee9'
                    }
                    'erad-out-not-removed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'c9e2c34c54664d5db4689a97de7c709b'
                    }
                    'erad-out-verified': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '59acbf6f4d54499880992c214cd2664a'
                    }
                    'erad-remove': {
                        table: 'sys_hub_action_instance_v2'
                        id: '969b05f6d486494c8dfbc89f21eae9cb'
                    }
                    'erad-result-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '62bc60cfb76b419c9c9f8b60cfe58d14'
                    }
                    'erad-verify': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b7b18a2fe2f44caa960372c8070778b1'
                    }
                    'erad-wait': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b2e511f319ed44ada7d718fccafd66a0'
                    }
                    'flow-license-request': {
                        table: 'sys_hub_flow'
                        id: 'cf8f0610aebe40e9bb0149a1d8a147f6'
                    }
                    'flow-license-return': {
                        table: 'sys_hub_flow'
                        id: '8933ad388bc24ae2914d0e2a1069a374'
                    }
                    'flow-m365-report-import': {
                        table: 'sys_hub_flow'
                        id: 'fc585a44e7fa442a8abe04d28c384c41'
                    }
                    'flow-software-approval': {
                        table: 'sys_hub_flow'
                        id: '8ee815bd1d214162bc89a25c4c843308'
                    }
                    'flow-version-upgrade': {
                        table: 'sys_hub_flow'
                        id: '8e8b3b8e92d5453290732c6e4da55a68'
                    }
                    'flr-get-variables': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6ef4f4b5aa7a45ee819273103dcc6deb'
                    }
                    'flr-log-outcome': {
                        table: 'sys_hub_action_instance_v2'
                        id: '60889b57b0334d019aa0715909ec83e5'
                    }
                    'flr-read-software-model': {
                        table: 'sys_hub_action_instance_v2'
                        id: '268a0a0cc5344aa28b65caeee362fb36'
                    }
                    'flr-run-backbone': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '5de5ea8e23f54161a3cd6dbeea8c4f22'
                    }
                    'flt-get-variables': {
                        table: 'sys_hub_action_instance_v2'
                        id: '319ad58ec5894cb6af235ca9863f88be'
                    }
                    'flt-log-outcome': {
                        table: 'sys_hub_action_instance_v2'
                        id: '8b93222197a94c3e823267f88b8b8df6'
                    }
                    'flt-read-software-model': {
                        table: 'sys_hub_action_instance_v2'
                        id: '7569bc8230864d37976ec370b0068b98'
                    }
                    'flt-run-backbone': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: 'fbf0f82175cb450fbbb63800fbde5e28'
                    }
                    'fmi-autodesk-failure-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '51801d5128c14dd1835717fe4717430b'
                    }
                    'fmi-autodesk-rejected-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd821ec0a892e4dd69af7d1f664458994'
                    }
                    'fmi-check-attachment': {
                        table: 'sys_hub_action_instance_v2'
                        id: '12a77630942c423396b36176ee39650f'
                    }
                    'fmi-check-autodesk': {
                        table: 'sys_hub_action_instance_v2'
                        id: '17215f2f1e4d480294f9ee2fb5ce68ad'
                    }
                    'fmi-check-project': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6e174f7604e74292a8fb5cb110f5e46e'
                    }
                    'fmi-check-universal': {
                        table: 'sys_hub_action_instance_v2'
                        id: '20b4b600cce84c7bae8e3ab0173a0d13'
                    }
                    'fmi-check-visio': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a1fe5bac6116466880d73ef2568cd203'
                    }
                    'fmi-correction-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd689ab878a6e466698e6667fcc91c434'
                    }
                    'fmi-end-autodesk': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f92b49951897479ead0c1449ada5e288'
                    }
                    'fmi-end-autodesk-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'af3ae9f6a74346c5bba9732323f83c03'
                    }
                    'fmi-end-import-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '48b2a0e359f44f7d8769d60c4fed0ea1'
                    }
                    'fmi-end-invalid': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b76940f9a115417684204e6aac10a4bc'
                    }
                    'fmi-end-project': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '815c1421039e4716863f04d004d9b216'
                    }
                    'fmi-end-project-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '52731b5df52b475aaf18ff990a28989f'
                    }
                    'fmi-end-universal': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '5195832e5b3b4cb1b10fbd4769cef207'
                    }
                    'fmi-end-visio': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '3d5dc8b156984d57aa07999b4d278b05'
                    }
                    'fmi-end-visio-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '6c13b0dc4faf4c2c954c4006a8c6990e'
                    }
                    'fmi-get-variables': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e11444f778d14cb8b6f6cf3c6cb7e51b'
                    }
                    'fmi-if-autodesk': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '94e2596b828c4b5085823589e9e8c648'
                    }
                    'fmi-if-autodesk-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '00effabd8063449eab79cec9b5c78a03'
                    }
                    'fmi-if-autodesk-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '15cb2c315b6d46e49f58e0c19034f007'
                    }
                    'fmi-if-import-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a7b10887240d410ba6a879a494f5b2c0'
                    }
                    'fmi-if-invalid': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'fcfde279485144c8acc55541df5e4c61'
                    }
                    'fmi-if-project': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '252a529bc3894f83833333b1c3efb4f4'
                    }
                    'fmi-if-project-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '6a0ebed414fa40219316426b92b32542'
                    }
                    'fmi-if-project-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '907f194f9acc46f4816a325ab32bf7cb'
                    }
                    'fmi-if-rows-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f42a5099f40b4ccd8b018bd936ee1167'
                    }
                    'fmi-if-universal': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ba1c477755a34bbcb669b5f577ec539f'
                    }
                    'fmi-if-visio': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '32649094f14a46269c9a1b6b9d5a94b1'
                    }
                    'fmi-if-visio-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4ead293562914ceebb0f721f455c5085'
                    }
                    'fmi-if-visio-rows-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '384ef8d60b2b446aa6cea6886b5330ea'
                    }
                    'fmi-import-failure-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f6e20658860344249c35a2310536ae96'
                    }
                    'fmi-log-autodesk': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e349ebfe8cf048d5a651ceaec3e1efe5'
                    }
                    'fmi-log-project': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6dffa3087b4a4dc0b0cde6e19240279a'
                    }
                    'fmi-log-universal': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ac2b5992180a4598b37cbdcaa16deff4'
                    }
                    'fmi-log-visio': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1fda2054d7a045708431eaeb4fe85b5e'
                    }
                    'fmi-lookup-license-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ec82cc3ad5d64c49983a0b3448618ae6'
                    }
                    'fmi-post-load-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '25ef08cee5c44422a73159e0fc4a4d7a'
                    }
                    'fmi-processing-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ab6e065468844437907987682186dfd2'
                    }
                    'fmi-project-failure-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3f8d503940bb486baea0b1f0ef0a9775'
                    }
                    'fmi-project-rejected-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ffda979c72d042aa90c54c85f132fc11'
                    }
                    'fmi-rejected-rows-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4a79fd08eb2446a0b3799f16031cea6d'
                    }
                    'fmi-run-autodesk-import': {
                        table: 'sys_hub_action_instance_v2'
                        id: '527894e117b24ea8a0e1162a3b1772ed'
                    }
                    'fmi-run-project-import': {
                        table: 'sys_hub_action_instance_v2'
                        id: '2894381e40344f26961e235cb17505d4'
                    }
                    'fmi-run-universal-import': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a78a53f7fd8043a2bab27a3f586fdcc1'
                    }
                    'fmi-run-visio-import': {
                        table: 'sys_hub_action_instance_v2'
                        id: '7024d8f9836349fb9e026ec392fe6beb'
                    }
                    'fmi-visio-failure-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '9cdbd998e85d40ac9d8d5515d4d9d185'
                    }
                    'fmi-visio-rejected-rows-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5a86e5afd1dd4a24862153fe4d213878'
                    }
                    'fmi-worknote-autodesk-done': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'bf3ffc0c1fe54fc882f51f16f4414c9e'
                    }
                    'fmi-worknote-autodesk-failed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '0d133c29d68241f9be8fdfc5fbd10f85'
                    }
                    'fmi-worknote-closed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '72166f283245453581d980c186aed6a9'
                    }
                    'fmi-worknote-import-failed': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b37def7974e94041960d26d0e5d47739'
                    }
                    'fmi-worknote-invalid': {
                        table: 'sys_hub_action_instance_v2'
                        id: '64a3d82fc8c64a0bb428d5e0aae87466'
                    }
                    'fmi-worknote-project-done': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'db0777f9602c4cbfac38b81a6a388ab7'
                    }
                    'fmi-worknote-project-failed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '8d5233d11b704289886fb83c369f266d'
                    }
                    'fmi-worknote-universal-done': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'dd141a4a693f4f0b9de5642758db341e'
                    }
                    'fmi-worknote-visio-done': {
                        table: 'sys_hub_action_instance_v2'
                        id: '93314f0625f04ff785ae088d829d362b'
                    }
                    'fmi-worknote-visio-failed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5071f7b3f4384a1899d46e83e9f42442'
                    }
                    'fsa-check-approved': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'df68278e431941c4a38a400b001b8aaf'
                    }
                    'fsa-check-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f33b3931cfb344c6a1bbf7cdc6da9e66'
                    }
                    'fsa-check-restricted': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3fd12c7510174a97b9b555a9ef3fc192'
                    }
                    'fsa-close-approved': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd86a5839a0f54ceabf30051b58f31a84'
                    }
                    'fsa-close-no-outcome': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ca44b42ed50d4d11a6392f9de9ed886e'
                    }
                    'fsa-close-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: '606211ca2a5c4c9a9a15f60579e9fd39'
                    }
                    'fsa-close-restricted': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'a81be4e2f0704539a7a05050113fd6dc'
                    }
                    'fsa-consolidation-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5d4b545c1d094c9a9545aa5cb7af62b4'
                    }
                    'fsa-else-no-outcome': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'c0556663ebec48339c9f349c011c5b9f'
                    }
                    'fsa-else-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '5cb0f4dc0d224545a4c6d1072b0d2653'
                        deleted: true
                    }
                    'fsa-elseif-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'c796546bbbea4f38ae6ecd622d3d8e6d'
                    }
                    'fsa-elseif-restricted': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f495dce8dfce4f67919f70b5056e1da4'
                    }
                    'fsa-email-approved': {
                        table: 'sys_hub_action_instance_v2'
                        id: '2f525669ae3849d7b88603faf565f9c6'
                    }
                    'fsa-email-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: '81425d0a088947539efdb799834f0a61'
                    }
                    'fsa-email-restricted': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'bd575dcaabe0435eb20d652c28dcaf23'
                    }
                    'fsa-get-variables': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c9fee73391164f7d8152537acbe6b22c'
                    }
                    'fsa-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'acfd08fd16af4f128bcfe5a7830fc8ae'
                    }
                    'fsa-no-outcome-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fc5985052f7d46e18a8adc554e7639e8'
                    }
                    'fsa-parallel-reviews': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '31c3e54e7a6a4ddbbb3df7949b00887e'
                    }
                    'fsa-parallel-reviews_block_0': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '04e5b052ed9c4221a6ce2a177842f2f9'
                    }
                    'fsa-parallel-reviews_block_1': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'fe0245aab59a434aabe68a41fa1a62ec'
                    }
                    'fsa-review-licensing': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'eebaa140fbce4d89a12ab74a0f98c8f9'
                    }
                    'fsa-review-security': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b36b89c1353f475c89928a58fe433243'
                    }
                    'fvu-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'bc8befedf81546aaa1996d838f715d30'
                    }
                    'fvu-close-done': {
                        table: 'sys_hub_action_instance_v2'
                        id: '26978cbd5b1f4719aa29ef599b66cc50'
                    }
                    'fvu-close-no-allocation': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fb77a1182ffb445ab83184745a6122d1'
                    }
                    'fvu-close-no-model': {
                        table: 'sys_hub_action_instance_v2'
                        id: '899c77ef4bbb4491adaef16912bda751'
                    }
                    'fvu-close-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: '9a689a522b924dfebe1339c29aa476e0'
                    }
                    'fvu-close-task-not-completed': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4a89709881c341c495865dff69eea3ba'
                    }
                    'fvu-else-task-not-completed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'efc576427e77459e9374cd868dc89cd3'
                    }
                    'fvu-end-no-allocation': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'fdca1d9d6fb042d991a23dadbf6f1417'
                    }
                    'fvu-end-no-model': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '36b34c7ee0ed410cb31350a492247e57'
                    }
                    'fvu-end-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '0b6f2a84b4c540e4b76435d17d84991c'
                    }
                    'fvu-get-variables': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f1912b0c787541b18982824840babf4a'
                    }
                    'fvu-if-no-allocation': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '1f8dc7ed7adb4d98b8134ba19598c6e6'
                    }
                    'fvu-if-no-model': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '99bb0ac08ba94e3586d619fa60ddb841'
                    }
                    'fvu-if-not-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '5a4410ed7fef4b2fb5924c71011cf9f5'
                    }
                    'fvu-if-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '295a32751fc043378f00fa67adac2065'
                        deleted: true
                    }
                    'fvu-if-task-completed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '255b0327f2fb47de9c3059635f606b1e'
                    }
                    'fvu-log-outcome': {
                        table: 'sys_hub_action_instance_v2'
                        id: '02cee91a0e6f4c99a4ddcd00b83d901f'
                        deleted: true
                    }
                    'fvu-lookup-allocation': {
                        table: 'sys_hub_action_instance_v2'
                        id: '067311104fd24fe1ac907826dadf8719'
                    }
                    'fvu-lookup-license-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b438125c1c3e4925b14f67a7b494e42e'
                    }
                    'fvu-no-model-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '9a68a12a7d4b4bc4aac3ff55ed5b28bf'
                    }
                    'fvu-read-current-model': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd3ef07f3c6d941f18713c16546fa004e'
                    }
                    'fvu-read-task-outcome': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6a3ab866fc5e4567b1ffdbd5ec2c65b8'
                    }
                    'fvu-run-backbone': {
                        table: 'sys_hub_sub_flow_instance_v2'
                        id: '17065c20810042229ef5b343718de464'
                        deleted: true
                    }
                    'fvu-upgrade-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e74f9a512dcd49a889f330e9322e5a74'
                    }
                    'is-autodesk-usage-onbefore': {
                        table: 'sys_transform_script'
                        id: '544b1a99f34e4beba47f86ca6360b75d'
                    }
                    'is-autodesk-usage-transform': {
                        table: 'sys_transform_map'
                        id: '77485c848428436b9a151ceb1e618dbb'
                    }
                    'is-project-usage-onbefore': {
                        table: 'sys_transform_script'
                        id: '3caf472f92854131a6278d1cbe9d92b4'
                    }
                    'is-project-usage-transform': {
                        table: 'sys_transform_map'
                        id: 'a64511f3a9c34e9f9ebb04d021f5207c'
                    }
                    'is-universal-usage-onbefore': {
                        table: 'sys_transform_script'
                        id: 'f03671e32f6e40f6b074101b2e12c036'
                    }
                    'is-universal-usage-transform': {
                        table: 'sys_transform_map'
                        id: '3bd78027f62d4f9cafdfb44e71de4252'
                    }
                    'is-visio-usage-onbefore': {
                        table: 'sys_transform_script'
                        id: 'f2f99e50560a4714b7964f1a8f641cfd'
                    }
                    'is-visio-usage-transform': {
                        table: 'sys_transform_map'
                        id: '7b4050bc4b0341729bd6a3d82f233b8d'
                    }
                    'map-autodesk-aec-collection': {
                        table: 'u_software_usage_offering_map'
                        id: 'f1a192068bdc46f89469f6b47bc49391'
                    }
                    'map-autodesk-flame': {
                        table: 'u_software_usage_offering_map'
                        id: '19598751f5a341bab421585be1b5206d'
                    }
                    'map-autodesk-flame-assist': {
                        table: 'u_software_usage_offering_map'
                        id: 'c1d95068ddb0406195db544dc264b1d1'
                    }
                    'map-autodesk-forma-build': {
                        table: 'u_software_usage_offering_map'
                        id: '2f15b84d238d4fa488e49bade4dad824'
                    }
                    'map-autodesk-fusion': {
                        table: 'u_software_usage_offering_map'
                        id: 'c2fb24e3b5da41bda84d9bbf926363e4'
                    }
                    'map-autodesk-me-collection': {
                        table: 'u_software_usage_offering_map'
                        id: '596df3e774bf43e6b43628f43ba35aef'
                    }
                    'map-autodesk-pdm-collection': {
                        table: 'u_software_usage_offering_map'
                        id: '2e990803333948be8da4d088fc8d218d'
                    }
                    'notif-license-approval-request': {
                        table: 'sysevent_email_action'
                        id: 'bfb5714bac4d4862951808044f02d7e3'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'e80a1b0196e94c4d804acaac3454ff84'
                    }
                    'prop-entra-add-verify-wait': {
                        table: 'sys_properties'
                        id: '56fd257ec05044e88ae5320fbdd4c86a'
                    }
                    'prop-entra-remove-verify-wait': {
                        table: 'sys_properties'
                        id: '78ba65287c884072bdca92fab8738644'
                    }
                    'prop-group-information-security': {
                        table: 'sys_properties'
                        id: '78817fa3316344a98b874d737f58e2de'
                    }
                    'prop-group-license-management': {
                        table: 'sys_properties'
                        id: 'dc4b515ca8994a69a912cf646d8fc8f6'
                    }
                    'prop-manager-approval-enabled': {
                        table: 'sys_properties'
                        id: 'a6742ef9843a431f99849f39d53976ed'
                    }
                    'prop-project-software-model': {
                        table: 'sys_properties'
                        id: 'c42a9cb607924157bac69f3c7fc8de8a'
                    }
                    'prop-software-model-qualifier': {
                        table: 'sys_properties'
                        id: '48f2f86dd39845938ef383bff3def211'
                    }
                    'prop-visio-software-model': {
                        table: 'sys_properties'
                        id: '36494bfafbef47f1939a2c02c5d707d0'
                    }
                    'sa-lookup-license-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e4cc4baafd7843da861ec97f8b6ad498'
                    }
                    'sa-lookup-security-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: '43479537babb42919bdeaa4ab1e8c3ee'
                    }
                    'sf-bb-already-allocated-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e3a4f4d5ee04423eb1a9f2d8c3188f8f'
                    }
                    'sf-bb-close-purchase-required': {
                        table: 'sys_hub_action_instance_v2'
                        id: '53339e7aa11c41738af39b34ad10e183'
                    }
                    'sf-bb-create-allocation-entra': {
                        table: 'sys_hub_action_instance_v2'
                        id: '55bf543fbe9e4645bc177131f3e2508c'
                    }
                    'sf-bb-create-allocation-manual': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5e71b3093bb441e093330f943bdf9691'
                    }
                    'sf-bb-else-entra-not-added': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '505a16eb3d15463ca185095dd96b259f'
                    }
                    'sf-bb-else-entra-remove-failed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '48456f2e96d64a4a9412578e93719367'
                    }
                    'sf-bb-else-no-ad-group': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9ab49ce7f5834d9b9e07948d0b76514e'
                    }
                    'sf-bb-else-no-entra-group': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4d37339535d1459d8bc56881a4fa305c'
                    }
                    'sf-bb-else-no-owner': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '143b305fc4e848c18fb9d61c016dd46d'
                    }
                    'sf-bb-else-request': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '8c3d345a14a942ab9584163a77bfd7da'
                    }
                    'sf-bb-elseif-not-member': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '6146108ae5f743879ea51e84eb1001f7'
                    }
                    'sf-bb-end-already-allocated': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'c68ccf84ff914f9fbe20a3d3cd755647'
                    }
                    'sf-bb-end-entra-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b338cd125c0b4782b3f5b66faa96a837'
                    }
                    'sf-bb-end-fallback-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'cd8e931c5c4b4ccfba2b2ef01ab0d5bf'
                    }
                    'sf-bb-end-manager-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd90b0fe7c82c4c53ad47a7da1b36a925'
                    }
                    'sf-bb-end-nothing-to-return': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '89835569b9874720ac1ebbe8659b2589'
                    }
                    'sf-bb-end-owner-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a0080c5313614b508f4f28a61c070821'
                    }
                    'sf-bb-end-purchase-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '516b5b98bf3c4f339498853550ebe834'
                    }
                    'sf-bb-end-return-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '29428973e0884427983ff2d549149d57'
                    }
                    'sf-bb-end-returned-entra': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '571ba8c1274e44468b249777fe91f010'
                    }
                    'sf-bb-end-returned-manual-entra': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a6c254874b544ebfbcc6690bc13f54eb'
                    }
                    'sf-bb-end-unavailable': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4eb01635a81d47b289682ddb9cba66e8'
                    }
                    'sf-bb-entra-add': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'fd9c8faca1d4484ba7de7677fae25537'
                    }
                    'sf-bb-entra-added-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c82f1cf4f9474482b8de34a2d8f3bb30'
                    }
                    'sf-bb-entra-check-member': {
                        table: 'sys_hub_action_instance_v2'
                        id: '86f80343477a40e58e29a9065f9afe4f'
                    }
                    'sf-bb-entra-confirmed-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '57fe66b03b254d24ba48348086ced6f5'
                    }
                    'sf-bb-entra-manual-removal-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '2f213179d3c94dd99745a04c9470fa7d'
                    }
                    'sf-bb-entra-not-added-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '299bde01069a42acbb2089aa77215757'
                    }
                    'sf-bb-entra-remove': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4a960160c2dd4f70ad4f77006d41a62b'
                    }
                    'sf-bb-entra-remove-failed-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '06c7e82b819e40ecac0d3548fa2639df'
                    }
                    'sf-bb-entra-remove-wait': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '3fdd6df4efe1421f9978e328616db576'
                    }
                    'sf-bb-entra-removed-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f210a53bc6074c37baa54245466f5fc6'
                    }
                    'sf-bb-entra-unconfirmed-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '171645d3344e4fc8835b1b078c7ebc94'
                    }
                    'sf-bb-entra-verify': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1427a8b62eb043f5893487b88ca59ccc'
                    }
                    'sf-bb-entra-verify-removal': {
                        table: 'sys_hub_action_instance_v2'
                        id: '14b41a1b3b6c4104a99fbef442fc2162'
                    }
                    'sf-bb-entra-wait': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f54b8aeb71b04d0f9775f5d364f50dd1'
                    }
                    'sf-bb-fallback-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '2f795357482249198a59f455fb87ca6f'
                    }
                    'sf-bb-if-ad-group': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '203c5fb52dbc4b2f84022290eaf8c6af'
                    }
                    'sf-bb-if-already-allocated': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '6c793573cbcf4a0fb0d5d8137ce75f09'
                    }
                    'sf-bb-if-entra-added': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '3d524df137b144fe853a32bcb5798060'
                    }
                    'sf-bb-if-entra-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '26752863d4474efd9aa72bcefd3a674c'
                    }
                    'sf-bb-if-entra-removed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '21a73cd4112646e18848fa481b1db743'
                    }
                    'sf-bb-if-fallback-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '812830f42d8d44b3acb108a22e3a83af'
                    }
                    'sf-bb-if-is-member': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '10f1140430d64d2aa9f76abfe772a373'
                    }
                    'sf-bb-if-manager-approval-on': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '847436fa7947464ab8f814ded1b78998'
                    }
                    'sf-bb-if-manager-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '8cbe2b7ac47741b98570002d12f2c1f4'
                    }
                    'sf-bb-if-no-allocation': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '15134a2e0c56452eb557dde3645262f2'
                    }
                    'sf-bb-if-owner-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd46a385235eb4fdb90fcee48ddcb31f9'
                    }
                    'sf-bb-if-owner-set': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '3fe4fa7a6e44420989a80e5e281fb81a'
                    }
                    'sf-bb-if-purchase-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '2632efa55fd846079768632f1fddd6bb'
                    }
                    'sf-bb-if-removal-confirmed': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '4d66ffb7c4f74de1a5faf360ad212561'
                    }
                    'sf-bb-if-return': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '602b1ad395224de0acd1b6a2bc5c26db'
                    }
                    'sf-bb-if-return-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'eb0917a5b0b146a5ac715760d32d3e8a'
                    }
                    'sf-bb-if-unavailable': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'b638207082694edf9a5cae20245b1be3'
                    }
                    'sf-bb-log-allocated': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1edfddc15839420c9c7a9336b63f9b08'
                    }
                    'sf-bb-log-unavailable': {
                        table: 'sys_hub_action_instance_v2'
                        id: '371b47340c9a46fcb61a0bdf0e6856ec'
                    }
                    'sf-bb-lookup-allocation': {
                        table: 'sys_hub_action_instance_v2'
                        id: '6a27e543ab76483e8390b81d32aed233'
                    }
                    'sf-bb-lookup-entitlement': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c2d98f8703d3415a86aa6e51846ab555'
                    }
                    'sf-bb-lookup-existing-allocation': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5fee0b3ee2fb475eb9a9a56686e4c842'
                    }
                    'sf-bb-lookup-license-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b9634844f0b54fe5a4191f249b42b26f'
                    }
                    'sf-bb-lookup-manager-toggle': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f327e351938f467988ddc24665016fb2'
                    }
                    'sf-bb-lookup-model': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'acce430ace64443d93743125d6086643'
                    }
                    'sf-bb-manager-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'f088c148d7a941458f5f8a3ca45ca6f8'
                    }
                    'sf-bb-manual-done-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '87128d6579aa4fc5a810bacc50ba9f54'
                    }
                    'sf-bb-no-entra-group-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '977d77fb3d5f491ab9552b1f43608261'
                    }
                    'sf-bb-not-member-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '413521bab11d491b9b3e92bc8e715463'
                    }
                    'sf-bb-out-already-allocated': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'd5021df23434414da4db6ee5f8f30e67'
                    }
                    'sf-bb-out-fallback-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '77167161e4d6431d872b02c10b03d242'
                    }
                    'sf-bb-out-fulfilled-entra': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'ae95f89ffba94508835d5336894b3072'
                    }
                    'sf-bb-out-fulfilled-with-task': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f26ba4fccd2545f7b6d1df9e3b9a1db0'
                    }
                    'sf-bb-out-manager-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '32c77178d7334ff887b8a877a7bc8f2c'
                    }
                    'sf-bb-out-nothing-to-return': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '28683de31e6a421d88cc13ba8ec9ccd2'
                    }
                    'sf-bb-out-owner-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f94feb0737384b678ef34b9579efadf4'
                    }
                    'sf-bb-out-purchase-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '7ef372c4fd80406b8e09cfb6323e723c'
                    }
                    'sf-bb-out-return-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f04160aa055f44bd94c89371dd80be36'
                    }
                    'sf-bb-out-returned': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'a3c8ecbaadb64537acc7c6beff583723'
                    }
                    'sf-bb-out-returned-entra': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f13f5d4cbc46449a9e72eb77711e06c0'
                    }
                    'sf-bb-out-returned-manual-entra': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9b7efc06f9a7443f99ac881da882e156'
                    }
                    'sf-bb-out-unavailable': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '5427b0ad79314ea891d50cd442190c6d'
                    }
                    'sf-bb-owner-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b5d06697f2d0446abd34d9165e167e1e'
                    }
                    'sf-bb-provisioning-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4081bc5092b5461eab1f9c1c03f6ba89'
                    }
                    'sf-bb-provisioning-task-fallback': {
                        table: 'sys_hub_action_instance_v2'
                        id: '50ba4023a7024118a2598501bc8332f6'
                    }
                    'sf-bb-purchase-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'ba12ffb75fee4b159b39001ce4ea3a7a'
                    }
                    'sf-bb-raise-purchase-request': {
                        table: 'sys_hub_action_instance_v2'
                        id: '94a1268e28684b07a524fbab52036e67'
                    }
                    'sf-bb-reject-note-fallback': {
                        table: 'sys_hub_action_instance_v2'
                        id: '081118fb49504fb5a4f314ce12e508f3'
                    }
                    'sf-bb-reject-note-manager': {
                        table: 'sys_hub_action_instance_v2'
                        id: '099f462ad4a34cabb2c5e9dc44e89ef8'
                    }
                    'sf-bb-reject-note-owner': {
                        table: 'sys_hub_action_instance_v2'
                        id: '815a9e0263f44888a6b7e4ce214e3feb'
                    }
                    'sf-bb-reject-note-return': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'cca8b4edbe0f408bb97c106b97bb3a50'
                    }
                    'sf-bb-release-alloc-entra': {
                        table: 'sys_hub_action_instance_v2'
                        id: '460f011d921446ca92ef351ed7c93c71'
                    }
                    'sf-bb-release-alloc-manual': {
                        table: 'sys_hub_action_instance_v2'
                        id: '879b425a4be844b9aef5344827060396'
                    }
                    'sf-bb-release-alloc-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3829b3ec4348496f9adaa06fe3b15e71'
                    }
                    'sf-bb-removal-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1e1f9593911240f9b0278e57f17c18f8'
                    }
                    'sf-bb-removal-unconfirmed-note': {
                        table: 'sys_hub_action_instance_v2'
                        id: '5e6307df74d54899b906d77cf02ca297'
                    }
                    'sf-bb-return-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '89e87f2689784466a4b356f2dea51ce5'
                    }
                    'sf-bb-returned-closed-entra': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'c9131778529f4e27b6e1348564e4e964'
                    }
                    'sf-bb-returned-closed-manual': {
                        table: 'sys_hub_action_instance_v2'
                        id: '329de8097bae4d8b9f6647ef0fea870e'
                    }
                    'sf-bb-unassign-entitlement': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'efbbbe8ca81a4e5ca38ff0c9cb2952f8'
                        deleted: true
                    }
                    'sf-bb-unassign-entitlement-entra': {
                        table: 'sys_hub_action_instance_v2'
                        id: '7a940b0ea39c4bbaad3916555039c493'
                        deleted: true
                    }
                    'sf-bb-unassign-entitlement-manual': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'bba19873e75d45e3bd477c349475f5ce'
                        deleted: true
                    }
                    'sf-bb-worknote-no-allocation': {
                        table: 'sys_hub_action_instance_v2'
                        id: '1421e7be351f4492a2f81dd7965189e3'
                    }
                    'sf-bb-worknote-purchase-rejected': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3d1d96b218a14b7c8f7a1145c03bf558'
                    }
                    'sf-bb-worknote-returned': {
                        table: 'sys_hub_action_instance_v2'
                        id: '07a22c0bb3af40179d314c68d2f45170'
                    }
                    'sf-bb-worknote-unavailable': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd7aff608067e47b1bf3c95d145f28c61'
                    }
                    'si-entra-group-provisioner': {
                        table: 'sys_script_include'
                        id: 'eab3d5a5a543412d8c127909cc7dc156'
                    }
                    'si-software-license-availability': {
                        table: 'sys_script_include'
                        id: 'e7b35a8f1ddc46339beef2f36ad15544'
                    }
                    'si-software-license-catalog-utils': {
                        table: 'sys_script_include'
                        id: '971487096a21483795aa4a1bd193428e'
                    }
                    'si-universal-usage-importer': {
                        table: 'sys_script_include'
                        id: '2e20dd852aa645f5b824ad95836140b2'
                    }
                    'subflow-entra-removal-after-delete': {
                        table: 'sys_hub_flow'
                        id: '453d5f60aff14e8e8339c173fbac304c'
                    }
                    'subflow-license-fulfillment-backbone': {
                        table: 'sys_hub_flow'
                        id: 'f4a8e85de54e45cf8a8f3978059d418a'
                    }
                    'trg-license-request': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '37e4793964f54dfbb6553f47a1661a09'
                    }
                    'trg-license-return': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '5d5696990f894db6960a179d5bc144ec'
                    }
                    'trg-m365-report-import': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '0d7805ea1a4147eaabb8529c0906b274'
                    }
                    'trg-software-approval': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '7ade42bd3aa24b8c8ccde73cf76896cb'
                    }
                    'trg-version-upgrade': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '9c8aba4afbd24c26b227c27217f0e140'
                    }
                    'uc-license-management': {
                        table: 'user_criteria'
                        id: '92c7cc349c264c2aafdcdbbd4b3aa79d'
                    }
                    'uip-cost-center': {
                        table: 'catalog_ui_policy'
                        id: '75e9f85e67954d72895ab8c65efc55f9'
                    }
                    'uip-licensing-model': {
                        table: 'catalog_ui_policy'
                        id: 'd2f70f1d5f48473d8cf8ffa190d0d290'
                    }
                    'uip-report-source-autodesk': {
                        table: 'catalog_ui_policy'
                        id: '231c6a24365c4c7b9c5146aebe30876d'
                    }
                    'uip-report-source-project': {
                        table: 'catalog_ui_policy'
                        id: 'db4f6c264fcb4c819c5bab46e5f226e5'
                    }
                    'uip-report-source-universal': {
                        table: 'catalog_ui_policy'
                        id: 'c5c74fdacf8147d8a766c8d171c20710'
                    }
                    'uip-report-source-visio': {
                        table: 'catalog_ui_policy'
                        id: '0ba03c6bcac347848885696467c5329d'
                    }
                    'uip-return-reason-other': {
                        table: 'catalog_ui_policy'
                        id: '5aea1136d7104422b2b78d3148d76d03'
                    }
                    'uip-temporary-end-date': {
                        table: 'catalog_ui_policy'
                        id: '597f8bc879534857aaa7123a2e1c621a'
                    }
                    'uip-upgrade-target': {
                        table: 'catalog_ui_policy'
                        id: 'f850d0926b944e8696865467e6241605'
                    }
                    'vs-business-justification': {
                        table: 'item_option_new_set'
                        id: 'f657c63399714396b2bea0c0b208bc40'
                    }
                    'vs-licensing-information': {
                        table: 'item_option_new_set'
                        id: 'b6c15fa49d344266b0d54ad9796ce082'
                    }
                    'vs-software-information': {
                        table: 'item_option_new_set'
                        id: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                    }
                    'vs-technical-information': {
                        table: 'item_option_new_set'
                        id: 'f63fc19f4f7b43a4b95c23b219f9d842'
                    }
                }
                composite: [
                    {
                        table: 'sys_element_mapping'
                        id: '000a25e44fb74217a03d5956542118d0'
                        key: {
                            field: 'requested_for'
                            table: 'var__m_sys_hub_step_ext_input_7be9b7fa6bd44f1488650030dc2a6193'
                            id: '7be9b7fa6bd44f1488650030dc2a6193'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '00389481461c4330b0eed954879debc5'
                        key: {
                            document_key: 'ddd08d9ab3354fc78ee5216369788b19'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '00ddf2d79f1748ba90cd453dab4dec98'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'replaced_by_other'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '01674dfdab684d2daa9347a52d00445b'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_import_status'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '01ad34d532ac4add8b0de7f5d83097e5'
                        key: {
                            document_key: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '01b77fb6b9d644a695a6f11ef2435bb0'
                        key: {
                            sc_cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '01c3a705ad9f4164a85ed5246111db33'
                        key: {
                            field: 'message'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0212a6c231aa4662981a981c1d7ff6fd'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'ritm_stage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '02350846895f423c8ed95fb72ba14f12'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_import_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '027c6f215cd84ef28ac27258427e18ed'
                        key: {
                            document_key: 'd04cab1f6f614587b00b8e12c87f3688'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '029cdf7a7ea746d087d86f6c216182b8'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0300abfebd6242bea87025c124f86232'
                        key: {
                            field: 'software_model'
                            table: 'var__m_sys_hub_step_ext_input_c74fa4c23e69455f847861185818a091'
                            id: 'c74fa4c23e69455f847861185818a091'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '03261f59b8a84d859def73dff6cf0d63'
                        key: {
                            name: 'samp_sw_subscription'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '035ce84a417c469cb96bee68e50e55c5'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '047d874aeb2d4fb8869cda15d0959fef'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: '2409d59a2eff42a4bad0959b7f37aa3b'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '04e8520e6ba64489a8b295db0550b853'
                        key: {
                            name: 'var__m_sys_hub_action_input_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'profile'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0571b45bfb0a495d82a6338087b878f9'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_user_activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '065da9f96283495d884e8cd554cde177'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_team_alias'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '070744be299d4229b01278746d6f7b04'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_autodesk_id'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '074e62dc3cc44ebfb454e6318505fb7d'
                        key: {
                            name: 'cmdb_software_product_model'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '07dc41c8f8fc446781bd5c2aa6e55b84'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'autodesk_usage_report'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07f7bd39eb534d428e109f71ddeab29b'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_unassigned_date'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '08170dfc18714cab81ecfd4cfb8272ec'
                        key: {
                            question: {
                                id: '3e23254b558a486187dcd23f3dc39c6b'
                                key: {
                                    cat_item: 'fa962633a7ba49899536545156b1ff9e'
                                    variable_set: 'NULL'
                                    name: 'usage_duration'
                                }
                            }
                            value: 'temporary'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08b8ea98eaee428290788a21cccbc083'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_tasks_created_web'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '08be8307232d44a18bb384d2b1c59b3f'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'ritm_stage'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: '0959000bbf0d48e38dd0fdf7ef194b2d'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '098b8715b0c24a4eba596f83993e51ef'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_user_principal_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a2bc6442bd0467aa2d19d2be2368d6b'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_user_principal_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a2e27c82d72440bb96c45055aba2891'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_projects_desktop'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a47395fa676493b95d8079c811d3faf'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_import_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0a9485e3179743fcaa224b4891effd50'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_d9bc5f21ff6033008d3f5d9ad53bf12d'
                            id: '960f539d971c454095a16f47b3d7922a'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0afbe2c55f0543be9816f2673b6ab021'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: 'ddd08d9ab3354fc78ee5216369788b19'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '0b7b1216db0147b8be5089ed62b7b7dd'
                        key: {
                            field: 'operation'
                            table: 'var__m_sys_hub_step_ext_input_c74fa4c23e69455f847861185818a091'
                            id: 'c74fa4c23e69455f847861185818a091'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: '0b8456945d084e3094a92c1da8907cbf'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'operation'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '0bbe4eae51994982ab300508adbc1985'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'alternate_cost_center'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '0bfed1706eb2408aa0e6cc14b1c81702'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'available_rights'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '0c5b9f41b0c546cabd88fb25d8df4109'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0cc6dc8f0f6b457b943df4776abb64f2'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0d5ecce754344a2094133dde34cb46bd'
                        key: {
                            document_key: 'ac556f866f2647e8bac1b754c2c383eb'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '0d65d4bee0e54ffe9c8172a841571097'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'operation'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0dd39b580f8b4e178c9e2db45aa9fb19'
                        key: {
                            document_key: 'b46190961ffc401da41e6979bd703971'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0e4077e2497e4ab18ae8a11915de01cc'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e8d5f71abaa4b3e99d2e9946f4138df'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_import_message'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '0ec2a6362236417b81ec1a824e0fd02d'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0ef6968ecda44f05a7b6ad9d4e3afea3'
                        key: {
                            document_key: 'ddd08d9ab3354fc78ee5216369788b19'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '1031bbf997de45ac9d92f6272c992d8f'
                        key: {
                            question: {
                                id: 'cf05136bc2ec4353be784458a6c6bc44'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'required_operating_system'
                                }
                            }
                            value: 'linux'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '10906598c76345609d0e2199926891f7'
                        key: {
                            field: 'ritm_stage'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '112a98ee697542458310a11096fd7441'
                        key: {
                            question: {
                                id: 'd92cc33364b84215bac319f92a63defe'
                                key: {
                                    cat_item: '85dc7a9f4804440da3bdfae92b047422'
                                    variable_set: 'NULL'
                                    name: 'report_source'
                                }
                            }
                            value: 'project'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '11300d0a9b484505a927c312aae688f0'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '11710cdd5f3b459685a2fde701ceb347'
                        key: {
                            logical_table_name: 'u_software_usage_offering_map'
                            col_name_string: 'u_vendor,u_offering_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '121783275125489caa3aaafd2118372f'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_team_alias'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '145ced64e76946dc921c4dadabfc48c6'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_entra_group_id'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '14777ed1c3af4cedb5d81d80c19f56fb'
                        key: {
                            cat_item: 'NULL'
                            variable_set: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                            name: 'software_manufacturer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '14ba54a012904f5eb5f55ecc23315dda'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_first_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '168448d23e194336aaa3915f96a482cd'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_entra_group_name'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '168f79ebea1246d7bbf51dfa4371f9a3'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_2d82e3c7531400109e02ddeeff7b12a7'
                            id: 'c0048c7aa9a1492ca40c632912024420'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '16a32014b9c94999bbfc1cc9671d7b3d'
                        key: {
                            field: 'ok'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '16deabaee8bb4793b95a5b45aa3f87a7'
                        key: {
                            document_key: 'b6dc4499de6145c9a2a4aab3ec3dc505'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '16fdb4df5b1f4021bf30246792c2d066'
                        key: {
                            cat_item: 'NULL'
                            variable_set: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                            name: 'software_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17560e19003a470b97118de9ec8f1f29'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_is_visio_licensed'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '178b4ae55ce3479c93ee380b4dab4c73'
                        key: {
                            name: 'sc_req_item'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '179598fd549c454b943a76a5b9440247'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_web'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '17a8e5fb7453402ba45e7d2962904673'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_days_used'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '187bab2edff94f759d68fee063f679da'
                        key: {
                            document_key: 'ac556f866f2647e8bac1b754c2c383eb'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '19822fd3c47b4a31bf0c2943f037688a'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_read'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1a6fbcf1edac456cb176ac7b2895fc12'
                        key: {
                            name: 'u_software_entra_group'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1aabb752e133401e90a0940f80d6f359'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_version'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1ae78da9cc3d4152862e2fe5ff7f638a'
                        key: {
                            document_key: '2d975b3f3f354696a703b8ea6cd1841d'
                            variable: '53fb0f535320220002c6435723dc34ec'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1affd86fc7614d19b110b251e558dd29'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b095936e5944bdabdc082e5ebbf4d46'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_unassigned_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b7fba936f7f4833a3d123f8f355efd9'
                        key: {
                            name: 'var__m_sys_hub_action_input_0ff2df5ef16c472691a47cd290461548'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '1b9ea692bc754b6b802179cc904269c4'
                        key: {
                            model: '453d5f60aff14e8e8339c173fbac304c'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1bec308c41cf41bf972fec1947603b2b'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_software_model'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '1d13db34f8d641d0a8fa1db98a146eda'
                        key: {
                            field: 'ritm_state'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1d1fa3c7c77b45e18889d3e0ea51d9b6'
                        key: {
                            document_key: 'ddd08d9ab3354fc78ee5216369788b19'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1e0776b24b1c41e0859d603d63ff04de'
                        key: {
                            document_key: 'e658223da5de4c75863b1a3a383e6cf0'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f155804eb354b9da2f6a5de118e3872'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_import_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1f2c6f5356734fc49c0f8eb67a0a20f9'
                        key: {
                            document_key: '0f770f9fa5794f538e6c3cf9cd0ec11f'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '1f69c426b9a2456fb14ecee14426b148'
                        key: {
                            document_key: 'e2a904cdd6a24446baab4a70f9d760f9'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '20212d14df7f460fa10cac4d536e88ff'
                        key: {
                            field: 'user'
                            table: 'var__m_atf_input_variable_071ee5b253331200040729cac2dc348d'
                            id: '78249243a70f4207992d30ce3e7f1324'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '204d0d70b0dc4c028b0a1a8fe3997cdb'
                        key: {
                            document_key: 'f7ac6d2383b0463490b13c43617ba82d'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '205c8bec2d9d4f699773dab0a90ff0b0'
                        key: {
                            document_key: 'ffc54fd16ae449bda512ef24443a690f'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2079c4cd9aac484392a83bd6fed91a62'
                        key: {
                            name: 'var__m_sys_hub_action_input_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '207f3b1ea65f45a5ab5d512fd040faae'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2101361dc4e04e2fba3a412deb61bd9d'
                        key: {
                            document_key: '07fcd134099147e49bfcb9839b8ec65d'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '21184a9ae06c4e29bc30453383a200b2'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2175930902d9412c8117b57374bc2e28'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'f7acd4778a02462cbac6cdb7220b2324'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '22de36143b4840948b3e7d1c560ab8ff'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2399a9081db24743b0a7e8ab86f4b98c'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: '__dont_treat_as_error__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '23b8bea3866a40e3bf16ef7a42bd1b0e'
                        key: {
                            sc_cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2445735745754e75a52e799f6f2d2958'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_import_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2464d7f51adb40b78b944ce325db5f96'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_user_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '24d711e0119e4677a822395b03be59d8'
                        key: {
                            field: 'context_note'
                            table: 'var__m_sys_hub_step_ext_input_7be9b7fa6bd44f1488650030dc2a6193'
                            id: '7be9b7fa6bd44f1488650030dc2a6193'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '25123a1762d4405395f37316dc4234f7'
                        key: {
                            document_key: 'ac556f866f2647e8bac1b754c2c383eb'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2517af41682d450b8c71c52e32c46a38'
                        key: {
                            document_key: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '254911d604ad476ca3bdf093cb08b983'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '258887e77fbc490ca4b3c4ed5ad5ea99'
                        key: {
                            document_key: 'f7acd4778a02462cbac6cdb7220b2324'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '258c1b25631c454abc33347515b34b70'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'ok'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '25946b125d474b0cbf35f6f11b008693'
                        key: {
                            document_key: '16e5a92fc83f40db93645d925c2d87d0'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '25dd18d88778417f8bb899863c858626'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_offering_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2678dd2a582f43b08cbad3d97f0b9cd4'
                        key: {
                            document_key: '16e5a92fc83f40db93645d925c2d87d0'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2799d2e8c6b44429af3323abd4a273f5'
                        key: {
                            document_key: '0f770f9fa5794f538e6c3cf9cd0ec11f'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '27c3df9a563441558b64d89750ff904f'
                        key: {
                            document_key: '2409d59a2eff42a4bad0959b7f37aa3b'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2831f21a63b94ae4a66c469a1f1ef1da'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_tasks_edited_web'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28797ad3948043c7af757d9a6613f44d'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_report_refresh_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28a4a0ac533b47c59fe2986370bbef3e'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28c938ad7a62437d935552667ba9800c'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_days_inactive'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '29ca587cf48d4035bd55a5ef6440ecf9'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ab37c6db58148669139b4c130695594'
                        key: {
                            document_key: 'ce8f02ba31cf40c69d097908f7eb46a4'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ae29dda22ae4a56859fd5ae1d4f3d89'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_first_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2b9a4e85ab1b4672bc66ebbf0b47a162'
                        key: {
                            document_key: '27c7d5030a204cd0826a08b8fbe8555b'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2bc7352decc64a43b6affce04cdee380'
                        key: {
                            document_key: 'd04cab1f6f614587b00b8e12c87f3688'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c8503e786fb45b59ee6434b54b3ac60'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_assigned_date'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2cfcf925b63e40e790a811a669a5f891'
                        key: {
                            document_key: '7be9b7fa6bd44f1488650030dc2a6193'
                            variable: '74315b04b3201300176b051a16a8dc2b'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: '2d118a03b0294511a9359f7d96921264'
                        key: {
                            map: '7b4050bc4b0341729bd6a3d82f233b8d'
                            target_field: 'software_model'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '2df8190e2a084530a040d232ce511d56'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'group_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ec31fbd6a87485dac3fecf1bdd0ef72'
                        key: {
                            document_key: 'a90f1788274c40609d3011cb3a07a4cd'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2ec70a897e07465f8e7ead58c30e9565'
                        key: {
                            document_key: '633cd6fcfb6743ebb8a10cfa95536f81'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '2ef621a1e4d24b62aec9e7e04968ea6c'
                        key: {
                            field: 'rows_imported'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '2fa9e1df6b01469c9885512a3842f363'
                        key: {
                            question: {
                                id: '32c9e03689b04cd1af5cb47bb4fce1d4'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'licensing_model'
                                }
                            }
                            value: 'licensed'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '2fd34859c21248729386676971c579b0'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: '__dont_treat_as_error__'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'return_reason'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '31645ba784294325b8e929c4ce8b0cbd'
                        key: {
                            document_key: '19324823c8b941f89472a3bd30382d2f'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '318821bac41c4079be24d8680db49dcc'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'named_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '319e93e90dbe4591b30815ea41f28a02'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_import_status'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '320595b8331b4554bee7f94a8a503c93'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'subscription'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '32c9e03689b04cd1af5cb47bb4fce1d4'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                            name: 'licensing_model'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '32f332f53cf240b49b185367f7704dc0'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '33b75022959846f4b8500b7e30d329f7'
                        key: {
                            document_key: '07fcd134099147e49bfcb9839b8ec65d'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '33f506e6ac354eb6860094681d152288'
                        key: {
                            field: 'request_item'
                            table: 'var__m_sys_hub_step_ext_input_c90bcda1daba48b4ad1153d82f3c6002'
                            id: 'c90bcda1daba48b4ad1153d82f3c6002'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: '33f7bb41ba3a4e3781ef202711a5a281'
                        key: {
                            map: 'a64511f3a9c34e9f9ebb04d021f5207c'
                            target_field: 'software_model'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3412b176327f49938c7382ac70bbfcae'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_hashed_autodesk_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3424d2cdc78a42038cac801091ded051'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_web'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34bf9bfb90b046e0b3f0cecab95d136e'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_last_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '36eedf81ec974e5bacd3724d4202e1be'
                        key: {
                            document_key: 'a2c69d0aee5343f19835d8db03a9aaaf'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '3708ea4d15a04d78beecaf053f94c938'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3732d8f8120a44df8f3d27f4ce152fa5'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '38051053c3f64018ad53e76081c7bc6f'
                        key: {
                            question: {
                                id: 'db1e9dccabde4712af99dee6ad214dcb'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'expected_impact'
                                }
                            }
                            value: 'corporate'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '387f37038b8d4b6aa66cea5b8a8193ad'
                        key: {
                            field: 'message'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '394a27dc7383488c9a7d408ec9c86bff'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '3985302508384fdf86b5a923437592f5'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                            name: 'infrastructure_requirements'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '3a59af136b4c482889fb28cbc8748ba8'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_imported'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a5aeb0f6c9a4e0dbe526f07c649b644'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3b02e5b10eaa4707bbc0867c5de3c96b'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_rejected'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '3c1993dbbeb447119e94909745891dc2'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                            name: 'installation_type'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3db113276b614f6fadaa6db5ace3f9ff'
                        key: {
                            document_key: 'cb68c666522445faa39699617923a52c'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: '3de42dc2d8f04a848bd56e5ed8120518'
                        key: {
                            ui_policy: '597f8bc879534857aaa7123a2e1c621a'
                            catalog_variable: 'IO:bfef74a2ead94d54bd8809754fd26057'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '3dfe3c286aed425aab8b71c02b3c936f'
                        key: {
                            question: {
                                id: 'cf05136bc2ec4353be784458a6c6bc44'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'required_operating_system'
                                }
                            }
                            value: 'windows'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '3e23254b558a486187dcd23f3dc39c6b'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'usage_duration'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: '3e3af2285d564b1aac9313c6a56e57c2'
                        key: {
                            ui_policy: 'c5c74fdacf8147d8a766c8d171c20710'
                            catalog_variable: 'IO:56143064532a4821a1c3b7a47cd4f830'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '3f1a42fe577a41daa22859a7477784b8'
                        key: {
                            question: {
                                id: 'cf05136bc2ec4353be784458a6c6bc44'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'required_operating_system'
                                }
                            }
                            value: 'macos'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '3f570dea3efa4482a39348972edfc9c6'
                        key: {
                            model: '453d5f60aff14e8e8339c173fbac304c'
                            element: 'entitlement'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '3f77e688e499491080b7c791c092d905'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '3f980ff0cb0445ca9557ca6b886b4386'
                        key: {
                            document_key: 'e2a904cdd6a24446baab4a70f9d760f9'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3fa3cc46a1a846eb92216075e82eb85b'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_tasks_created_web'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '3faac0f9e19f4eaa88fda8c42b69b898'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'other_reason_details'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4052cf10aa7c4ed9a720453afb9f2224'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '405a41c8c96e42a9978917f6421ed730'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_hashed_autodesk_id'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '409cbbb7fd064de5ad1572eac2559a90'
                        key: {
                            sc_cat_item: '04118c5716964c24870c52ca22cd378b'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '412f32f375d84e248887476aabf70204'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4159f07ae2074e58bb1a15f27ac7199d'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_days_used'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41e80fe93d96457e99100c181d581188'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_desktop'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '41f931c8b90e4e55be4eddf486c1ece1'
                        key: {
                            name: 'var__m_sys_hub_flow_input_453d5f60aff14e8e8339c173fbac304c'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '42597b52e7124186afd29195257f6d73'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_last_activity_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43078abbcded4fb29aaa46fb96934107'
                        key: {
                            name: 'var__m_sys_hub_flow_input_453d5f60aff14e8e8339c173fbac304c'
                            element: 'deleted_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '43da4e6c6bb341ad80d8d17c9db1f85f'
                        key: {
                            name: 'u_software_usage_offering_map'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '43e5420b5b5a41de960a5324a65e9aae'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: 'e439f32cc3ba220076173b0ac3d3ae90'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '43f3a719d83547358bf992b60ea0c62f'
                        key: {
                            question: {
                                id: 'cf05136bc2ec4353be784458a6c6bc44'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'required_operating_system'
                                }
                            }
                            value: 'not_applicable'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '440321e59cb04a4e88580cc7f56b7881'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: '__dont_treat_as_error__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '440f1e97724d4a15920c8cad6326b29a'
                        key: {
                            question: {
                                id: '3c1993dbbeb447119e94909745891dc2'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'installation_type'
                                }
                            }
                            value: 'saas'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '443bbd6279034e3e9fb35d2f148ca1ae'
                        key: {
                            question: {
                                id: 'a0af672413ff4741b4b1e471a06bc9bc'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'upgrade_type'
                                }
                            }
                            value: 'license_update'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: '44a39c634453438a9984a3b540c2a568'
                        key: {
                            table: 'sc_req_item'
                            short_description: 'Shows the homologation outcome only on Software Approval Request items'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: '4568201896f240c7a519c72e9f3832af'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'context_note'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '459ec6159c6143be87a9a0e35ed8822b'
                        key: {
                            name: 'var__m_sys_hub_flow_output_453d5f60aff14e8e8339c173fbac304c'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '45a00a3c9c1544f59020a0953455a018'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'additional_notes'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '45d7830f212142cd9b8371e8c81cbc14'
                        deleted: true
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'requested_for'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '465ac6f9eae44c69b08710c945d40f5c'
                        key: {
                            sc_cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: '46a020b0aedb467d9ee7d3380d6f9698'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '471d92d14f074d4d9067abc5a8b55f29'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f657c63399714396b2bea0c0b208bc40'
                            name: 'estimated_user_count'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '4726b201c0f04d819c5a1a64bf76fcc0'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '476cab66ca384492ad181c2dd35168b1'
                        key: {
                            sc_cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: '483a1a666acb4dd4830a7b34d9b0af40'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'request_item'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '484d68e8c3f7419894abf2aef7bb2485'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: 'a7987fe8c3ba220076173b0ac3d3ae1d'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '489849098b7a41959254dbb74964539d'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4909c3f4232245f988ab277ad2f8bc73'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: '__dont_treat_as_error__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '490ad740a4494c3baa10e1504bd2eb31'
                        key: {
                            question: {
                                id: 'a0af672413ff4741b4b1e471a06bc9bc'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'upgrade_type'
                                }
                            }
                            value: 'technology_migration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '49268ea6961e4ec39367278e8238fc93'
                        key: {
                            name: 'var__m_sys_hub_action_input_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '499633ef18274d0990dacea6fbb9ae68'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_autodesk_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4a04c07d414743dcbd053fa404976778'
                        key: {
                            name: 'u_software_usage_import'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '4aa492595bc34d65961925cc73acc8b3'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: '__action_status__'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4c585a3fe4c346dbbc0a531c13b5dd6e'
                        key: {
                            document_key: '1034d67ec4a74ad6ab6ef4fff50aad44'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e22f586b73f4b80ace709038503f7e9'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_import_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4e3f921c0f224d9f851558f6e5dfd0a0'
                        key: {
                            document_key: '1034d67ec4a74ad6ab6ef4fff50aad44'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '4e86119cbf9d44d3ae48319ba26ee13d'
                        key: {
                            document_key: 'ffc54fd16ae449bda512ef24443a690f'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '4ef793e65d1c4d41896ecad5519a4314'
                        key: {
                            field: 'rows_rejected'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4eff5e6cc1ee4124b5cb2ef09fc30d4f'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_report_refresh_date'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4f7a95c5204044138dd1f4883dc9833d'
                        key: {
                            name: 'u_software_usage_import'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '50568a19e7dd4808aeb5b1d656ef1e11'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'target_version'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5100d8d05b1942dab257acbb18eb2e0b'
                        key: {
                            document_key: 'd04cab1f6f614587b00b8e12c87f3688'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '52463f890fd4434d8038a048a49c3b0b'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '5265f434ff4640b5945fd2979f749d5f'
                        key: {
                            question: {
                                id: 'd92cc33364b84215bac319f92a63defe'
                                key: {
                                    cat_item: '85dc7a9f4804440da3bdfae92b047422'
                                    variable_set: 'NULL'
                                    name: 'report_source'
                                }
                            }
                            value: 'autodesk'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '529792e44fe442ca8ca59032d6e1ca0f'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '530426f9454446e6b12683f0972697d8'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '53bf089f205041babee3e6f531a232c9'
                        key: {
                            document_key: 'c5b39846d5e04119a50bd44f33c2cb7d'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5555793bb5e04f5f8fd2d44dca7fbfd2'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '55c3248ea6f549d09e50c698a753e6cc'
                        key: {
                            document_key: 'c90bcda1daba48b4ad1153d82f3c6002'
                            variable: '74315b04b3201300176b051a16a8dc2b'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '56143064532a4821a1c3b7a47cd4f830'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'universal_template'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '567e9e57c8144f479198d7ec1995eacd'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_import_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '56f0491694d44f3a8392869019650242'
                        key: {
                            question: {
                                id: '3e23254b558a486187dcd23f3dc39c6b'
                                key: {
                                    cat_item: 'fa962633a7ba49899536545156b1ff9e'
                                    variable_set: 'NULL'
                                    name: 'usage_duration'
                                }
                            }
                            value: 'permanent'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '58b3441ecfdb48f0b313482cf107ee90'
                        key: {
                            document_key: '07fcd134099147e49bfcb9839b8ec65d'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '5922439255f7445aa6a53b2185d6ff9e'
                        key: {
                            sc_cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5940f3e0943341799bbaf317c45816fd'
                        key: {
                            document_key: '5c077fc83909429aa5b4c3e2752c49bf'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '594cdd2fa7be44a197fc25baa95198ff'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_tokens_used'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a7be16f5ecb4da4824476c5e96b8f8a'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_display_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b7a6cf6bc334b6587607ccfd8ffea00'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_import_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b94d5aa70ce4e5bbadf2b3be4423257'
                        key: {
                            name: 'sc_req_item'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '5cf30e8adfe7444c847d5e85ce921247'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'request_item'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '5d5fd344c4b04e7cb1a4e6a92a17cad5'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'rows_imported'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5d8338d8905b4d8181b3e5badbfd92a4'
                        key: {
                            document_key: 'ac556f866f2647e8bac1b754c2c383eb'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: '5d8d1a23b33f409c8cfd60507851eb29'
                        key: {
                            sc_cat_item: '04118c5716964c24870c52ca22cd378b'
                            user_criteria: '92c7cc349c264c2aafdcdbbd4b3aa79d'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '5e0227c18014487180091e81a6bfe760'
                        key: {
                            document_key: 'e3e45375335d49d4af4bff49d400c9bf'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e77e8f90fa44a42a9662ac12f7fa237'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_display_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '5e7eff62575e4106837e90a93cbd31c2'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_2d82e3c7531400109e02ddeeff7b12a7'
                            id: 'd04cab1f6f614587b00b8e12c87f3688'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '5f2e120cc11a4e85a3a8c4bcd5beff32'
                        key: {
                            cat_item: '04118c5716964c24870c52ca22cd378b'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '5f4769c157f54cb1989d8dedde8ebdf0'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6004c1121ccd476384e07ed9843a56aa'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_last_accessed'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '60246c0091d04fc895f81c60bb38b7fb'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'outcome'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60758d99a1f64e8491562f3dac69b90d'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_seat_assignment'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '60b5ea5af4394d51bb849572ed6dc212'
                        key: {
                            name: 'u_visio_usage_import'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '615e7529fb8248008f7ff5b85c643543'
                        key: {
                            document_key: '8099d8c610a24c3594848bc0024cd993'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '61b97ad3a0cd4cc0aa5b6e7a95f497fa'
                        key: {
                            document_key: '862dfd62459440d6bd753910ecc45dc2'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61eccab9444a43a1b49a26175cb22654'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_desktop'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '62fec4abf44a423d8474c5669c551185'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'responsibility_transfer'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: '6322613e2d82492198635ac2ce752208'
                        key: {
                            sc_cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            user_criteria: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63654a0849f64910985adb417514719c'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6459aad738bb4019b319abbcf86884dd'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: '64a314a660614eb7a8a5af630343bd79'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'profile'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '64a8672adb724ba88916dd14f12bcdcd'
                        key: {
                            field: 'rows_read'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6545b84b1c314e97b46006df4d6f2f84'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_offering_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6552a6d092e34b6eb901c24d22e52c66'
                        key: {
                            name: 'var__m_sys_hub_action_input_0ff2df5ef16c472691a47cd290461548'
                            element: 'software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '66db26628c6c4b10b25c3494433282c5'
                        key: {
                            field: 'requested_for'
                            table: 'var__m_sys_hub_step_ext_input_c74fa4c23e69455f847861185818a091'
                            id: 'c74fa4c23e69455f847861185818a091'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '6790c1f1ab5046c0a1302b77798c9dc5'
                        key: {
                            question: {
                                id: 'cf05136bc2ec4353be784458a6c6bc44'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'required_operating_system'
                                }
                            }
                            value: 'multiple'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '679d2e52ea9b42f098370197bfda0af6'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_last_activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '67c1031295b640648e15c4fcf56ba13c'
                        key: {
                            name: 'u_autodesk_usage_import'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '67c346c4b4584bbd945aa390a124b8bc'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'ce8f02ba31cf40c69d097908f7eb46a4'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: '67ca59a2fc584cbca34aef87a5d54855'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'context_note'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6855c0307ad8435d953f6222bb0a711c'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'outcome'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '68a6135f76144efc95445586d4869363'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_days_inactive'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '68d54bd1438a4da49dd870352c02193d'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f657c63399714396b2bea0c0b208bc40'
                            name: 'expected_benefits'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '691209462b0949bd9379951bbf02aa6c'
                        key: {
                            field: 'allocation'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69606dc014df4d38850b28f0b26e5461'
                        key: {
                            name: 'var__m_sys_hub_action_input_0ff2df5ef16c472691a47cd290461548'
                            element: 'context_note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6a147459948842c68b1b455ab6d0d6d7'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'visio_usage_report'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a6d2066c27741c9bf615d0dfdd719cb'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'ok'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6a8fb211da0946e8b9ec8df37fa28fe8'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'software_model'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6b538c8b33964bc8996d431d6bf74cdc'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'target_edition'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6b7d026b07a341aeb6386258a8806b67'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'desired_removal_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6bed2cd5881b4eec9ad4f0d57347e9f2'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_assigned_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c08889928df47cb8ecc05dc6915220e'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_last_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6c562414c3eb4102ae83d8749c7b2256'
                        key: {
                            name: 'var__m_sys_hub_action_input_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'operation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: '6cb0d3a0a2ce4aa39ce2d1e7961e1cc9'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6d8595abd98c43ea968f21da764ba164'
                        key: {
                            document_key: 'd4087592c2324611a2917a2e0abf91e4'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '6df5ac57029d4ff9ac71c77919c0aca2'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'group_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '6e145fd12887448d87a11969d0b79013'
                        key: {
                            document_key: '2409d59a2eff42a4bad0959b7f37aa3b'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6e6dd6e6f3cf46dd807cdcecd94fd47e'
                        key: {
                            cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: 'NULL'
                            name: 'additional_notes'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6fd39c8e475c4c398cb07e3273249ad1'
                        key: {
                            name: 'sc_req_item'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '709b2a9164024b8eb0048894fac451dd'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'rows_read'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '714bc4d176fa481cb4946e928c708f18'
                        key: {
                            name: 'cmdb_software_product_model'
                            element: 'u_ad_group'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '71970cd7408d43d3a4a783c4f52668af'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71c762b094c2462fb709be165947c46a'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_seat_assignment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '71df2f37ea6443c6b34ef07115b3e177'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'project_usage_report'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '71e7ca26fd874592931694e327a06795'
                        key: {
                            field: 'software_model'
                            table: 'var__m_sys_hub_step_ext_input_7be9b7fa6bd44f1488650030dc2a6193'
                            id: '7be9b7fa6bd44f1488650030dc2a6193'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '727e7c83f77446f8bf83f8e0f5382d1e'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_import_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '73e3a2259ad04cd59fb842fc133f0b7d'
                        key: {
                            sc_cat_item: '834235a0db1345fe9afb954722ad546c'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '7433163c92ca4621b00f4acc2990cb1b'
                        key: {
                            ui_policy: {
                                id: '44a39c634453438a9984a3b540c2a568'
                                key: {
                                    table: 'sc_req_item'
                                    short_description: 'Shows the homologation outcome only on Software Approval Request items'
                                }
                            }
                            field: 'u_homologation_outcome'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7531d48a000049db9ee1225acf1f9cce'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7569eae757da412eae53d03a63803b20'
                        key: {
                            document_key: '862dfd62459440d6bd753910ecc45dc2'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75c2e4a43810472ab054a397a999750f'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_tokens_used'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '768dce2a7e2741878b50ac3e705dcb08'
                        key: {
                            document_key: 'd4dc11936d574fdf804cfb6e325f6841'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '7696ed927b2f441aa94e72e346d6329f'
                        key: {
                            sc_cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: '76a7489b54e14aff8d1e854bf10e4d7a'
                        key: {
                            model: '453d5f60aff14e8e8339c173fbac304c'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '76b2a14db24b40e5b22077755e44c33a'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_rejected'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '76fd6f871ed74a1abdb56246cb8d2132'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'file_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '77426bd1b0a94fc6a157a3b53941eedf'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'file_name'
                        }
                    },
                    {
                        table: 'io_set_item'
                        id: '77e3584a7fac4ef995f3f194a4a8a5ed'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '780e368ce08345f2ad1c9394c6d37b1a'
                        key: {
                            document_key: 'ffc54fd16ae449bda512ef24443a690f'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '788309b1d78a41eb9600f7cf6ad331c3'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7907911c59624c7f8339c1350ff93a91'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: '32e8ffe8c3ba220076173b0ac3d3ae6e'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7965250aef104a53acb184f2ec58d97f'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '7b2078f226e944f3a838b9f79d25cea6'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'verify_after'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bbd1ff63ef94eebaa0e750f00e42cc5'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_report_refresh_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bfbe010948440018bd9dbb93fd7221f'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'ritm_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ccd61f7376f4b5abf09c2efc450906b'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_import_status'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7cde767543c149de867d13209a7fef6b'
                        key: {
                            document_key: 'db11e7bc9d9b4c18be39c6c812382a9e'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d0e5fbeb9fc4d4f9a2aa6dbe43101b6'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_report_period'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '7d6be71d2f4c40b19e3b800e274b88b9'
                        key: {
                            field: 'verify_after'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7eb1ecd5e2ee45d0bb2d657a74e3c77e'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7ed9930a420545b9990ebc2c642f67ce'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7f0d2257c46d401b9d8c473093c518f8'
                        key: {
                            document_key: 'c5b39846d5e04119a50bd44f33c2cb7d'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: '7f2d3fca2dfe4c308f61e5d11e5e3b11'
                        key: {
                            ui_policy: '5aea1136d7104422b2b78d3148d76d03'
                            catalog_variable: 'IO:3faac0f9e19f4eaa88fda8c42b69b898'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '7f6449b655044a22939547906ef31596'
                        key: {
                            document_key: '7be9b7fa6bd44f1488650030dc2a6193'
                            variable: '71aa7f6647032200b4fad7527c9a719b'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '7f98ed1b761e41f89835e07a9d70bf70'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'concurrent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8045d1894ce74402baf989baf948038b'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_last_activity_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '80758108fe97443689cfe77deddda474'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                            value: 'approved_with_restrictions'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '80991512d27b40c2961eb43af1411093'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: '__action_status__'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '80a3826ca19740c2bf37ba5c49db4ab3'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_vendor'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '812867bcbb2b41f385f77d9f553aaee2'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '81b67b0a11c1417cbaf4a2cde0085e1c'
                        key: {
                            document_key: 'd4dc11936d574fdf804cfb6e325f6841'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '826d0286fb604521919e694fa7cf3cc6'
                        key: {
                            cat_item: '04118c5716964c24870c52ca22cd378b'
                            variable_set: 'NULL'
                            name: 'requested_quantity'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '82d1b71c63b6444fa024cabf32efaaa2'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'ok'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8364793be6fb4428a1d14ae031347cd2'
                        key: {
                            document_key: 'c5b39846d5e04119a50bd44f33c2cb7d'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '84676bcce9394d89ba4427e57f82fb00'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: '__dont_treat_as_error__'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '84cc93f89dd24e578955683767da5d69'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_vendor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8622a3ca0d034062a857407d248d5289'
                        key: {
                            document_key: '2409d59a2eff42a4bad0959b7f37aa3b'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: '86273e3a14974544b7d3bb128bb04554'
                        key: {
                            ui_policy: '75e9f85e67954d72895ab8c65efc55f9'
                            catalog_variable: 'IO:0bbe4eae51994982ab300508adbc1985'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86631b05d55a45e7884883402b9e6f5e'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'available_rights'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8733aaad5bc54405ab8a1e4ec8dc1e94'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_monthly_average'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '8752755655dc412dab262e86bf446632'
                        key: {
                            field: 'outcome'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87db4be39a0f4e639efd487213e2abe3'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_access_option'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '88c4c8c2a2f745e3851fc3ade60f26b0'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'consumption'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88c8c5dc42ef43d6bfeec93afd10bf27'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_application_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88fc85c6c68d4ea099a2bdc7a2c0b474'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_import_message'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '89500800e48a4773bed4e5b6e18b7c7b'
                        key: {
                            document_key: '07fcd134099147e49bfcb9839b8ec65d'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '897a59384777414aa72627663c8ed0b8'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_access_option'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '8a278a47c5e54e1cb54ed96a6fd61fdf'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'perpetual'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a2f86ba5399499d96fcab1552bce2e6'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_group'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a37e6604457405685297bf28db4817e'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '8a481adfc4ea427a8a4c842edc1f2ed4'
                        key: {
                            field: 'work_notes'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8aef27147e1647fc89d810ecb18ee3e1'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: '1778a7480f20101091d0f00c97767e03'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ba1ca1f2faa4c769d5b4119b2ab98d5'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'verify_after'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '8d083609398c42d49f0a78babb045795'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'current_software_model'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d839cb364b04e1f8743b5baffdaf949'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_software_model'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8de0fa1d7d9f48d09a97c7f0906b0c34'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: '8ea14098c81340a29295428fa3f5e0a0'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8f2064f54ec54ec9973d8175f709f951'
                        key: {
                            document_key: 'c0048c7aa9a1492ca40c632912024420'
                            variable: 'b86c0427531000109e02ddeeff7b1227'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f3fb6ec84f04f22abe79ec006d7d2da'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_application_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f5f10c041ec48b69db73f9f3743745b'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_unassigned_date'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: '8f957ebc931d461baaaeae52041a4ff8'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '8fa220a3fdc14f28879568b367f66a98'
                        key: {
                            document_key: '6d70472150f34413951f52c2b3f03efa'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '919bdff9e30d46ab822093508056a01b'
                        key: {
                            question: {
                                id: 'a0af672413ff4741b4b1e471a06bc9bc'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'upgrade_type'
                                }
                            }
                            value: 'mandatory_update'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '931729a2d2154994901280d3ea25d7a6'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'import_notes'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '93401d19b62c407da7762c2784de9db8'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'management_request'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '93585695bf984747a57d12188b377c53'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                            name: 'license_type'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '93c20305022741e89c0d5d5cb23e518b'
                        key: {
                            cat_item: '04118c5716964c24870c52ca22cd378b'
                            variable_set: 'NULL'
                            name: 'purchase_justification'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '93ef7c1e853d42e78c2d9ffc0931ba6a'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_days_used'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9404fab6fb694dbb842f36e3eb667e6f'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'request_item'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '94d5d034fe674b94bfdde3c488a4c8dc'
                        key: {
                            document_key: 'd04cab1f6f614587b00b8e12c87f3688'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '94e24186e06646558a48b6e96957a1ea'
                        key: {
                            document_key: '736f4e0d07ea4eabac854bf21ea028cb'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '95352bea7b9b45b994fe5c4b1e93937a'
                        key: {
                            question: {
                                id: '93585695bf984747a57d12188b377c53'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'license_type'
                                }
                            }
                            value: 'device'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: '96a1f7eaa35c466db8bfb4f1321bfcd6'
                        key: {
                            ui_policy: 'd2f70f1d5f48473d8cf8ffa190d0d290'
                            catalog_variable: 'IO:d35c74acc4a04abe99cbac7717ff71e8'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '96be65cae6734ba8b5755301b8b11120'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                            name: 'integration_required'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '96c895862ed24ca4a74fd022c887b8d9'
                        key: {
                            document_key: '19324823c8b941f89472a3bd30382d2f'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: '96de093628fd4b96beef6c276923d2fa'
                        key: {
                            map: '7b4050bc4b0341729bd6a3d82f233b8d'
                            target_field: 'user_principal_name'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '9751e5debba746c38f0ffc063e5b2354'
                        key: {
                            field: 'confirmed'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '97fa433138f9455eadbf6024e924511f'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_report_period'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '989f3224201f4e3eb73e5ca60f2127da'
                        key: {
                            document_key: 'cb68c666522445faa39699617923a52c'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '991b1fdacb674d0e91898324ef7bd333'
                        key: {
                            document_key: 'c0048c7aa9a1492ca40c632912024420'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: '99921de29d1d45ddaba7a04babb9cce4'
                        key: {
                            model: '453d5f60aff14e8e8339c173fbac304c'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'io_set_item'
                        id: '99b9eddb85f44ff3b19c5218e86e075a'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: 'f657c63399714396b2bea0c0b208bc40'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9a4e0e32215f49b2bfeccfeca5bc5e64'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9aa791ab6a3f4db9ba3992f19979b849'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_offering_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9acf25be7b43492381f296eba78dd73c'
                        key: {
                            name: 'var__m_sys_hub_flow_input_453d5f60aff14e8e8339c173fbac304c'
                            element: 'entitlement'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '9b03d88c4ef14bdaa49aafd887dfe2fc'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f657c63399714396b2bea0c0b208bc40'
                            name: 'business_objective'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '9b0fcdb200a346879bd0a9d9b2116033'
                        key: {
                            field: 'group_name'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b54310577ca405db268e6af99e3c715'
                        key: {
                            name: 'var__m_sys_hub_flow_input_453d5f60aff14e8e8339c173fbac304c'
                            element: 'software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '9ba429718f154c6fbaabfc3ed752dd97'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: 'ae58fbe8c3ba220076173b0ac3d3aeac'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9baf2820dc734180912fe0c3613bc7bc'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_other_activity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c0f8a51eccc4c019fdc0c8655e31d77'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_projects_desktop'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d727e2e998b4b3e812384dece4441b1'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_user_principal_name'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: '9d80f5527e654dd6a94ac5b22d2b59c7'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'license'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f07e21c192f456ba2f279f1f3f02cf6'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '9fd7464ec5ad492aa922f2d207b107aa'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            sc_catalog: 'NULL'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'a014f99257294a3c8c4accf59e821bd5'
                        key: {
                            ui_policy: 'd2f70f1d5f48473d8cf8ffa190d0d290'
                            catalog_variable: 'IO:93585695bf984747a57d12188b377c53'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a06567a0566b482e951002fb7678b5e7'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_import_status'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'a0af672413ff4741b4b1e471a06bc9bc'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'upgrade_type'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'a147bfd6ea644efaabd026bb0a51623d'
                        key: {
                            cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a1d5d64b3f28434c82b2d7d3d1e2898c'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_unassigned_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'a1eda637528047ce8bf83a4fe55ed231'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'group_id'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a2af154b4afe4fb387b6e0d78ec08c0b'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3258039197e4304bb9e956504527342'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_other_activity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3a19c069d244ce5968bcdc42756fc49'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: '__action_status__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a469493c81b146939ae64a109e2c6eac'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_projects_web'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: 'a4da46e509534fbd869d158a63ac1f08'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            user_criteria: 'NULL'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'a621c7119bbe47f7b8d2e476c9b91fe0'
                        key: {
                            question: {
                                id: 'db1e9dccabde4712af99dee6ad214dcb'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'expected_impact'
                                }
                            }
                            value: 'individual'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a6d5d6ba4290498e9fb19eedc157d4cf'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_user_activity'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: 'a858fecd10a94dd3813b5825f044bfdd'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'request_item'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a89ebfc3c7014adbac810f8fad06447c'
                        key: {
                            document_key: '419b2f4509604137969bc95ecb368251'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a8bcffaeb3bc435cb7260252f6a54b26'
                        key: {
                            document_key: '8099d8c610a24c3594848bc0024cd993'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a90083fe195e4b8d83ecf9d991f79fca'
                        key: {
                            document_key: '2d975b3f3f354696a703b8ea6cd1841d'
                            variable: '334b7bb7675003007ba405225685ef72'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a9803e8e96354d378253a72e32e57447'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: 'd829b32cc3ba220076173b0ac3d3aea1'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a9bf78f169824dcc8ecd10fe23b28efc'
                        key: {
                            document_key: '19324823c8b941f89472a3bd30382d2f'
                            variable: '02fb0027531000109e02ddeeff7b120b'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'aa00f2f46f5a4968b39e48849598dc49'
                        key: {
                            map: '77485c848428436b9a151ceb1e618dbb'
                            target_field: 'user_principal_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'aa03e89d88594dd2b3c952ea07d213c2'
                        key: {
                            document_key: '4c6f538d6f334d5aaa08b2528dccd940'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa7ced854dc947a7b7dd56829978a5ba'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_group'
                            language: 'en'
                        }
                    },
                    {
                        table: 'io_set_item'
                        id: 'aa97263f5ae24a9cac4ba93d1fe927e9'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aae7b1be2e9a49b1813638cd16f656fb'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_last_activity_date'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ab4c21a59f704aae9d8d4f5cb92c5788'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'abcd4e7b5d9c43bbac7642332e65279e'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'ac64759933594496bcd2c7ec7b127529'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'upgrade_justification'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'accb03dc20ca4730b67874dc0fa08649'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'allocation'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'acefd63806324be4bdb5d1aa0f269190'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_user_principal_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'acffa2e72120455995f3390d8d238f08'
                        key: {
                            cat_item: '04118c5716964c24870c52ca22cd378b'
                            variable_set: 'NULL'
                            name: 'software_model'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad0a43d7ab5f4ec5bd13f7233b3160ee'
                        key: {
                            name: 'cmdb_software_product_model'
                            element: 'u_ad_group'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ad56d57948b9423b8941360342af06aa'
                        key: {
                            document_key: 'd4087592c2324611a2917a2e0abf91e4'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'ad6de985a81c409c8cc76b879f034cd4'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                            name: 'estimated_cost'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'aebf8ddaf4304f3aad767cc37f2955fd'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'afa6107599da4ad99cf681a4950863dd'
                        key: {
                            field: 'license'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b00330e591f64fb1b1e8016cc78fb04c'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b04c4babd7eb400aac59796a647486f9'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_seat_assignment'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: 'b06afb6d4b4743b4a49908b990614226'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b09f1486fa274ea781a9fa99e58e8095'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_active'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'b161f0bbe34b42dfa8522af6b2f6dfe7'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b162326abf774a3bb14aaef9169b03ce'
                        key: {
                            document_key: 'ce8f02ba31cf40c69d097908f7eb46a4'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b17c515c06e6486c84ad8772e95018d6'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'b1a5f4dc19f241769623e7a05b4aa67b'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'b29a89a47c5741ab8e3812ccfa9d03b0'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'ritm_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2d329fd04c94798928c0998e889da5a'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_user_email'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b3bd3076b7574ca1980cc3dabfb3be4b'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b3fcf2ec61294b3ba33371837f1b5d99'
                        key: {
                            document_key: 'd4087592c2324611a2917a2e0abf91e4'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b44a47ba73084b2aa66342cb1e72584c'
                        key: {
                            name: 'u_project_usage_import'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b48f695cc75548b3b45b7ecff37473c8'
                        key: {
                            document_key: 'c90bcda1daba48b4ad1153d82f3c6002'
                            variable: '71aa7f6647032200b4fad7527c9a719b'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'b551cfe86ff648f18d5b23209f414ec7'
                        key: {
                            model: '453d5f60aff14e8e8339c173fbac304c'
                            element: 'deleted_by'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5b24c8ff9bd45e1af59f8d3102a83cc'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_last_accessed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5d6606810c246ebb8f223cab094c1eb'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_is_visio_licensed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'b5d9020ee4724ef29e55fc6005295018'
                        key: {
                            field: 'record_id'
                            table: 'var__m_atf_input_variable_17a72288df60220062fe6c7a4df26397'
                            id: '2d975b3f3f354696a703b8ea6cd1841d'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'b67cf3cf3ea248f3b08cd58f653a4387'
                        key: {
                            map: '3bd78027f62d4f9cafdfb44e71de4252'
                            target_field: 'subscription_identifier'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b79455166cb741158675ecc22106a1eb'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_monthly_average'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'b79f890cfb2945d3aab6d2b154b6c390'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: '__dont_treat_as_error__'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9376287cb32447c816f2f454818ef02'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_offering_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b9589b5cd0af4e4fab029aee126007c9'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_software_model'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'b990da1a61134f72be01363009da0350'
                        key: {
                            question: {
                                id: 'db1e9dccabde4712af99dee6ad214dcb'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'expected_impact'
                                }
                            }
                            value: 'team'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b9e5b1643c6848e6a3f3e2d3c4050d32'
                        key: {
                            document_key: 'c5b39846d5e04119a50bd44f33c2cb7d'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba4e2cc59ec24b3a8606ece92ad1a1cf'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_display_name'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: 'ba9bdd5a7dc3441da904fb30d6e26ff6'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bb298279b34b48ab97e712f6f0dd7bca'
                        key: {
                            document_key: '78249243a70f4207992d30ce3e7f1324'
                            variable: '586e2c4253e0220002c6435723dc3415'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb31de02282045648243cb244258f84e'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_projects_web'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'bb87723a8f6e4187874ac15da694ecbb'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bbeb93d8c29642d78b2e096cbb022e71'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bbfb25e2971449dcb65c7a68f2c3f4a8'
                        key: {
                            document_key: 'cc32c8ae97e7410fbe9b19c1aa002fbd'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'bce5c0f77cb848c3bd34a283286f6300'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'no_longer_used'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd0885d1b3eb4cc583b7d0a86884c654'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_access_option'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'bd08db2e7f41480c8045f6e1e9bb7f9a'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'rows_rejected'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd661a464aaa4b34ab9dfb3d6b26d365'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be2d7013397a429381a4749b01312280'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'operation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: 'bf5ff498c5834663b67f161d60ab93fd'
                        key: {
                            sc_cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            user_criteria: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'bf7e1e083e7d407db7692d70d5a70c9f'
                        key: {
                            name: 'u_software_entra_group'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'bf8f79a676fd442ea7145aa7abb13ef9'
                        key: {
                            cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                            variable_set: 'NULL'
                            name: 'return_justification'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'bfa1f14229094632ad5f5442109c50bd'
                        key: {
                            document_key: 'd4087592c2324611a2917a2e0abf91e4'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'bfef74a2ead94d54bd8809754fd26057'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'usage_end_date'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c0314b23a2ff4e3584897df998996c23'
                        key: {
                            document_key: 'b46190961ffc401da41e6979bd703971'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c14773aad3834cc5af565a7b04a20b5a'
                        key: {
                            name: 'samp_sw_subscription'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c1bff376c2044ab69a1841b6898d1b8f'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: '98c44875ffa033008d3f5d9ad53bf1fa'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'c1e7469945f142f7a20aca5707362bed'
                        key: {
                            cat_item: 'NULL'
                            variable_set: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                            name: 'software_version'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c2e4fd9aaa8b4ff3ab027dea344487da'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3014bf7fc0c41e192b434875c57e848'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c343810809a64609b0ffadbba8253c93'
                        key: {
                            document_key: 'e2a904cdd6a24446baab4a70f9d760f9'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c374bc010e7340cdb88e749ab73901e8'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: '__action_status__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c37cf61c41ce4a70b3ed562fea595173'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_imported'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c3ef03474bad4b05a0aa6e8caf8c3c25'
                        key: {
                            document_key: 'ffc54fd16ae449bda512ef24443a690f'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'sys_hub_flow_input'
                        id: 'c44b58616fbe4d18a9868ac473fbd541'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c46ebd1e726b4284b991ce0b0185286c'
                        key: {
                            document_key: '2d975b3f3f354696a703b8ea6cd1841d'
                            variable: '501c8f535320220002c6435723dc34da'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c47fdef3ddf942aca2cfec7b05a392b1'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'allocation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4d2bf6fe9e842458a14e5380d1848d2'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_entra_group_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'c4f96a0b198c4d699e06b5732aeea241'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c51259b538284aa0ae7bbf6fd2edf36d'
                        key: {
                            name: 'samp_sw_subscription'
                            element: 'u_days_used'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c56abd634f4c4424ab0ed24b6ce1470b'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: '1985e0ceff2433008d3f5d9ad53bf1ba'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'c5929cc0f9bd45069adbb6bc8353778c'
                        key: {
                            field: 'status'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6e45e9a57cb4ec5aaa7a9edb94afcd8'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'requested_for'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c74f174952324562b23dca6c6f67144e'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'c7e97e065e26491e9ecfd2799f021515'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'current_edition'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'c7f119b5d80b4af085135d3c887e75bb'
                        key: {
                            ui_policy: '0ba03c6bcac347848885696467c5329d'
                            catalog_variable: 'IO:6a147459948842c68b1b455ab6d0d6d7'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'c851370247e246be85bfa97322bf1de7'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c94214b5fa3044148786ff7ace8f7673'
                        key: {
                            name: 'cmdb_software_product_model'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'c96af164663d48ffb5d30fba1bef5a06'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'file_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c9874a03c4744562937d34459b53356c'
                        key: {
                            document_key: '0f770f9fa5794f538e6c3cf9cd0ec11f'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9fcb237e11943a6a81bdf5ce5542569'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_monthly_average'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca1a15008e5a4482a762d5da7a21d8f6'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'caeebfe8887e42bca18bdcc026badd62'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'cc0b4ea91c504eb2a6bc2f331e8f2517'
                        key: {
                            question: {
                                id: 'a0af672413ff4741b4b1e471a06bc9bc'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'upgrade_type'
                                }
                            }
                            value: 'version_upgrade'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'cc5a0283388e42898289faeb2dd2cb66'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: 'e2a904cdd6a24446baab4a70f9d760f9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ccc9b8c04a7f4a829d600d4dc7fd54d5'
                        key: {
                            document_key: '05986c03ec33448f97926e41c8675998'
                            variable: 'b0d64ce1c332220076173b0ac3d3ae95'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: 'ccf80ce258904d7aa7c61d610ca2917a'
                        key: {
                            sc_cat_item: '834235a0db1345fe9afb954722ad546c'
                            user_criteria: 'NULL'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'cd18f1672c6c4773b2c243d6509d2cd8'
                        key: {
                            document_key: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'cd2962cac01648d0972d64481ddd0db7'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: '__action_status__'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'cd30dadf8d3e46a8addb58486829ffae'
                        key: {
                            ui_policy: 'db4f6c264fcb4c819c5bab46e5f226e5'
                            catalog_variable: 'IO:71df2f37ea6443c6b34ef07115b3e177'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'cde43c2ed8664161bf0b07dc9a3bfb8b'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'required_by_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce1116aef2b048678e0410aa4f1eb345'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_monthly_average'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ce9a05978c824a31a622f022cc94b78f'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'cf05136bc2ec4353be784458a6c6bc44'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                            name: 'required_operating_system'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'd008b0375ad14aeda3f91384e435218d'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'different_cost_center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd02b1d7daf83462c8b7ecc9dca9a177d'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_report_period'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd04cad2ee9dd49d3a2ae8a547f52a5fd'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: '1034d67ec4a74ad6ab6ef4fff50aad44'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd080f0bfe8f7496bb49a58df9c59b9a3'
                        key: {
                            document_key: '8099d8c610a24c3594848bc0024cd993'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd0a9ccdc9c6847309111982cc1a5f77a'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_seat_assignment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'd0bf4c16347b4a3c846904ada930fb4c'
                        key: {
                            question: {
                                id: 'd92cc33364b84215bac319f92a63defe'
                                key: {
                                    cat_item: '85dc7a9f4804440da3bdfae92b047422'
                                    variable_set: 'NULL'
                                    name: 'report_source'
                                }
                            }
                            value: 'visio'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd0c02446c59b4b8f9af61688db36c6bc'
                        key: {
                            document_key: '0f770f9fa5794f538e6c3cf9cd0ec11f'
                            variable: '90144b535320220002c6435723dc3488'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'd1b079c4e97d4b61899fcad7a427b213'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd2901f0b6b194dbea4f5c1c8902b8f1c'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'e658223da5de4c75863b1a3a383e6cf0'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: 'd325a4c3cde94f459eac9b590a3e6a8d'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'software_model'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'd35c74acc4a04abe99cbac7717ff71e8'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                            name: 'estimated_license_quantity'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'd395bb593cae4070a311fc7cd6f3be14'
                        key: {
                            cat_item: 'NULL'
                            variable_set: 'f657c63399714396b2bea0c0b208bc40'
                            name: 'requesting_area'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd395c4faf5bb455981fe7efc6f0e3aa8'
                        key: {
                            document_key: 'e658223da5de4c75863b1a3a383e6cf0'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'd3b2452b6708465ba9ae9c3b7004e673'
                        key: {
                            question: {
                                id: '3c1993dbbeb447119e94909745891dc2'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'installation_type'
                                }
                            }
                            value: 'server'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd40c7412ce7b4285b1734a976e4e86d9'
                        key: {
                            name: 'u_software_usage_import'
                            element: 'u_last_activity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd414d23ac231412582ca78c7c0ac0a39'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'status_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd4c423d84b1740b3882e5ee1f1ba44b6'
                        key: {
                            document_key: '19324823c8b941f89472a3bd30382d2f'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd4d7ca80975841109cb63f9ec939892a'
                        key: {
                            document_key: 'c74fa4c23e69455f847861185818a091'
                            variable: '71aa7f6647032200b4fad7527c9a719b'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd50b81d285354606b5cd7641c10a2ef0'
                        key: {
                            document_key: 'cc32c8ae97e7410fbe9b19c1aa002fbd'
                            variable: '346eea25c3b2220076173b0ac3d3ae8b'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'd6b3705d3a5e40b2b458fa74e396ae54'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'request_for'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd737480f8a984f699e33cfdd9a54764f'
                        key: {
                            document_key: '21ed9bdc2eea46c495dfbcd79d7669f0'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7b643c6442748bca2c631701b27964f'
                        key: {
                            name: 'u_software_entra_group'
                            element: 'u_entra_group_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: 'd7bd6ac5d10540c299d9a8dbce34174d'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'operation'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'd7d625f70a964d6da73e998577ea3adb'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_2d82e3c7531400109e02ddeeff7b12a7'
                            id: '19324823c8b941f89472a3bd30382d2f'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd7efbfeebacf44b784a93fa0e58a6277'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'd87e08851dc54a20a9e8f9721015c28f'
                        key: {
                            ui_policy: 'f850d0926b944e8696865467e6241605'
                            catalog_variable: 'IO:50568a19e7dd4808aeb5b1d656ef1e11'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'd889a5a4b30e455891128873b35f5974'
                        key: {
                            question: {
                                id: '32c9e03689b04cd1af5cb47bb4fce1d4'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                                    name: 'licensing_model'
                                }
                            }
                            value: 'free'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd8915e34de454560ac83650a32db7014'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_tasks_edited_web'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'd92cc33364b84215bac319f92a63defe'
                        key: {
                            cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            variable_set: 'NULL'
                            name: 'report_source'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd93d670266b64e24a897d0d8f987acea'
                        key: {
                            document_key: 'c0048c7aa9a1492ca40c632912024420'
                            variable: '915990ab531000109e02ddeeff7b12f8'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'd99b18bf75cc4cf09bdb2e239612c30a'
                        key: {
                            question: {
                                id: 'd92cc33364b84215bac319f92a63defe'
                                key: {
                                    cat_item: '85dc7a9f4804440da3bdfae92b047422'
                                    variable_set: 'NULL'
                                    name: 'report_source'
                                }
                            }
                            value: 'universal'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd9ea432337684d128dc7d159b1a85a82'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'db1e9dccabde4712af99dee6ad214dcb'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'expected_impact'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'db5a2177f3c646fe89226b50795fa1b1'
                        key: {
                            document_key: '2d975b3f3f354696a703b8ea6cd1841d'
                            variable: 'bc4c43935320220002c6435723dc34a2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'db7acbbc684a43559888c3998981b95b'
                        key: {
                            document_key: '8099d8c610a24c3594848bc0024cd993'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dbb27f31aa9e48afa7b0d15e397898de'
                        key: {
                            document_key: 'a56d0471695e48d1a99e8f3b0acee1c0'
                            variable: '8c07aba5ff6033008d3f5d9ad53bf13b'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'dc03e5cb4bf3481988deda7162381fa9'
                        key: {
                            sc_cat_item: '834235a0db1345fe9afb954722ad546c'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc2dccf280444381bd84c86ea2304090'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_version'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'dcc2cf9b135e48c3980d3db79efee33c'
                        key: {
                            field: 'status'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'dd9ddf884fc24c45aa1c78ba56d3d733'
                        key: {
                            document_key: '52a5b92026824d44a06046d1bbec30b5'
                            variable: '17513cb2c310320076173b0ac3d3ae64'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dddff03236ce44bf905662e006924482'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'de4414c9f0cb4d2698d0e508494838b9'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'de56ef721ae1408b95539fa34179946c'
                        key: {
                            field: 'profile'
                            table: 'var__m_sys_hub_step_ext_input_c90bcda1daba48b4ad1153d82f3c6002'
                            id: 'c90bcda1daba48b4ad1153d82f3c6002'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df25e770a1584a708f3c52b4846eb7d8'
                        key: {
                            name: 'var__m_sys_hub_flow_input_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'software_model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'dff6af59422c40a19658b0edc9e32e76'
                        key: {
                            question: {
                                id: '3c1993dbbeb447119e94909745891dc2'
                                key: {
                                    cat_item: 'NULL'
                                    variable_set: 'f63fc19f4f7b43a4b95c23b219f9d842'
                                    name: 'installation_type'
                                }
                            }
                            value: 'local'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'e01ab3899e714658ace35ab0fb84f9a0'
                        key: {
                            ui_policy: 'd2f70f1d5f48473d8cf8ffa190d0d290'
                            catalog_variable: 'IO:ad6de985a81c409c8cc76b879f034cd4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e04dbd92e6054b69bec53d8f3855e68a'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'group_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e0905f9a7852473abcd646d63633046f'
                        key: {
                            name: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            element: 'license'
                            language: 'en'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e0925048e9fd4ee99a5425c7c870f7ac'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'additional_notes'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e0fcde2c41344ea8b8c2f2d6065f0fba'
                        key: {
                            document_key: '4c6f538d6f334d5aaa08b2528dccd940'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e1c5ea1f084c41e3a23f150792f2829c'
                        key: {
                            name: 'u_project_usage_import'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e1fae1c198c94c05a75bb4d5d9ef3f06'
                        key: {
                            document_key: '2d975b3f3f354696a703b8ea6cd1841d'
                            variable: '46dbcb535320220002c6435723dc3409'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e2ab24bb57ce458bb5f48108e5292677'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'acknowledge_purchase'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'e2c5c64279f846e7b5dba506a959dff9'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e34cf0af7358473b8f27dcabc12d70b4'
                        key: {
                            name: 'u_software_usage_offering_map'
                            element: 'u_active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3c42c6555e24b72b4d82cc3e1e33e55'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_display_name'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e3c6e440e2e340cd805457f5c7c62105'
                        key: {
                            document_key: 'ddd08d9ab3354fc78ee5216369788b19'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'e4bbf1a49a34409daa531d01a0642411'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'b46190961ffc401da41e6979bd703971'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_input'
                        id: 'e585ae197db3487aa048cc552af238ff'
                        key: {
                            model: 'c90bcda1daba48b4ad1153d82f3c6002'
                            element: 'profile'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'e5b363caebde42c0a0b898f4a68b5a9c'
                        key: {
                            map: 'a64511f3a9c34e9f9ebb04d021f5207c'
                            target_field: 'user_principal_name'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e6177454a352444d8411d3390360ff7a'
                        key: {
                            name: 'u_autodesk_usage_import'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'e6978fcf506d4155aa37371b20e4ad2a'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'allocation'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6af82d235844599906d44e4fdf2cdb5'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_import_message'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e6c64153b1164774962a7ad3403ea454'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'cost_center'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'e78279c5bd214923912206ee92bff8a0'
                        key: {
                            document_key: '960f539d971c454095a16f47b3d7922a'
                            variable: 'ff06ab840f20101091d0f00c97767e6d'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'e818171cf8f244589487c9337ba707fa'
                        key: {
                            model: 'c74fa4c23e69455f847861185818a091'
                            element: 'verify_after'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'e84afe92945c4432b06fb3eaf80de7a5'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'entitlement'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'e86f64d1f123407299796a61a856fc5d'
                        key: {
                            question: {
                                id: 'db1e9dccabde4712af99dee6ad214dcb'
                                key: {
                                    cat_item: '834235a0db1345fe9afb954722ad546c'
                                    variable_set: 'NULL'
                                    name: 'expected_impact'
                                }
                            }
                            value: 'department'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'e93dc270ab3342319e1d89955f95b2d0'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'ritm_stage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ea20e71fb48c4696a71b227aa88fe683'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'group_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eaae1254ae884716b35e6ccaf91f39f9'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eab4e212383e481180ab4cc91e8ec222'
                        key: {
                            name: 'var__m_sys_hub_action_input_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'request_item'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'eac9b054f40d425cbec0d95d76b57c3a'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ead77e8227eb403896d59fb54b9abb07'
                        key: {
                            name: 'u_autodesk_usage_import'
                            element: 'u_access_option'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'eadebe66fc1c4cdc871dd22e14970af5'
                        key: {
                            field: 'field_values'
                            table: 'var__m_atf_input_variable_14872288df60220062fe6c7a4df26319'
                            id: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'eb0eac210029417984a7e03c280de0c5'
                        key: {
                            cat_item: '834235a0db1345fe9afb954722ad546c'
                            variable_set: 'NULL'
                            name: 'current_version'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb454f3945f04799972b5ebe9566a9a5'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_report_refresh_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eb7eec2592294c59ad40984b99936f4d'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'outcome'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eb8244689207466c8479c7c48ab8231f'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: 'rows_read'
                            language: 'en'
                        }
                    },
                    {
                        table: 'io_set_item'
                        id: 'ebb9882959644806a440f4b8ccc67755'
                        key: {
                            sc_cat_item: '7b79c892a36a4100bf35cd761b7383dd'
                            variable_set: 'b6c15fa49d344266b0d54ad9796ce082'
                        }
                    },
                    {
                        table: 'sys_hub_flow_output'
                        id: 'ebe411bec24d49ef842a17b72e7ef1c3'
                        key: {
                            model: 'f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'status_message'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ec012728af7742bda31288cac96d8817'
                        key: {
                            document_key: 'a13526df9c2748b8b87d459ab58570ee'
                            variable: 'b27b2b29ff6033008d3f5d9ad53bf164'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ecbe18bfd1764d85b5e2ccd19f740fda'
                        key: {
                            name: 'u_visio_usage_import'
                            element: 'u_last_activity_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'ee9a395d533a4abab5ee2bd1a9b4c499'
                        key: {
                            sc_cat_item: '04118c5716964c24870c52ca22cd378b'
                            sc_category: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef40427496f44c9a81f5ef7a0039e7ed'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_report_period'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'ef8a415a30ee40c19e858e6e6b89703c'
                        key: {
                            document_key: 'f7acd4778a02462cbac6cdb7220b2324'
                            variable: '571e6a25c3b2220076173b0ac3d3ae46'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'effee85f50d340ffbd955db405bc1a4a'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'ritm_state'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'f01a545a2bba4468a15037105e5ecabe'
                        key: {
                            ui_policy: 'f850d0926b944e8696865467e6241605'
                            catalog_variable: 'IO:6b538c8b33964bc8996d431d6bf74cdc'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f03ac1a2aeb64f0e9bd63c2e57b25184'
                        key: {
                            name: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'confirmed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f076e3dafd424acf96f84ea30f72f958'
                        key: {
                            name: 'cmdb_software_product_model'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f0c42d5290c249c2bd28c1afcb9ac2b8'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'cb68c666522445faa39699617923a52c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f17bb058de1a4065a994e166d5ad25b4'
                        key: {
                            document_key: '2226d75b2ebc4cb5b8edc0f9b8ffb0df'
                            variable: 'dd54cf535320220002c6435723dc34fd'
                        }
                    },
                    {
                        table: 'sys_hub_action_input'
                        id: 'f204ed5602e6402692bde205d1134182'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_hub_step_ext_output'
                        id: 'f2644b6ca6eb42e28c207224d33e0f00'
                        key: {
                            model: '7be9b7fa6bd44f1488650030dc2a6193'
                            element: 'license'
                        }
                    },
                    {
                        table: 'sys_transform_entry'
                        id: 'f26af66cee1e4604aee1919a7322f023'
                        key: {
                            map: '77485c848428436b9a151ceb1e618dbb'
                            target_field: 'software_model'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f31a329269d647aeb530344390fe97a6'
                        key: {
                            document_key: 'c0048c7aa9a1492ca40c632912024420'
                            variable: '78b8d86b531000109e02ddeeff7b12f3'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f31f44018e78457bab5b47727f294d7c'
                        key: {
                            field: 'file_name'
                            table: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            id: '28f3a699a7bf41358c6f2cd79336a397'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f354e5d9af69445497fbb8edd481b5c8'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: '5149372cc3ba220076173b0ac3d3ae98'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f43054ca749949738455660bce8d1858'
                        key: {
                            name: 'u_project_usage_import'
                            element: 'u_import_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'f454bcd249564b0296fa8b63b45a97fc'
                        key: {
                            model: '4c425ea5e5b94820a75e0cd7efc9f862'
                            element: 'group_id'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'f4a7a9ce543d4dbb961a6614d8e1f972'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'software_model'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f4d82aba665046c3b4ceec4d224f10dc'
                        key: {
                            name: 'u_visio_usage_import'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f68dcb461970413d8d7171045cc66f51'
                        key: {
                            field: 'variable_values'
                            table: 'var__m_atf_input_variable_323ca6e1c3b2220076173b0ac3d3aec1'
                            id: 'cc32c8ae97e7410fbe9b19c1aa002fbd'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'f70d2835907a41eca2c37aabc15d4fb9'
                        key: {
                            question: {
                                id: '30b71a6fde8a4fcba0e2b87b8997bc05'
                                key: {
                                    cat_item: '00c380f88da94094a8e2ad0a2ad0e058'
                                    variable_set: 'NULL'
                                    name: 'return_reason'
                                }
                            }
                            value: 'role_change'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f7f42332a5e644168947b57f877740c6'
                        key: {
                            document_key: 'e2a904cdd6a24446baab4a70f9d760f9'
                            variable: 'e6e3c7535320220002c6435723dc3496'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'f833d3026f8b4833926b28de0f15b323'
                        key: {
                            cat_item: 'NULL'
                            variable_set: '98e89ca35bbd4610b6f1d40e8dcfc9cc'
                            name: 'vendor_website'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'f85994440aa34b75a5998bbfcbb9519e'
                        key: {
                            cat_item: 'fa962633a7ba49899536545156b1ff9e'
                            variable_set: 'NULL'
                            name: 'request_justification'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f9176f4079d041269239f886b088f783'
                        key: {
                            field: 'comments'
                            table: 'var__m_sys_hub_action_output_0ff2df5ef16c472691a47cd290461548'
                            id: '0ff2df5ef16c472691a47cd290461548'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f9b2a2704b7e40d7b6304a90ebba9875'
                        key: {
                            field: 'group_id'
                            table: 'var__m_sys_hub_action_output_4c425ea5e5b94820a75e0cd7efc9f862'
                            id: '4c425ea5e5b94820a75e0cd7efc9f862'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'f9c02ae63e124f51a19a0fddfa509a76'
                        key: {
                            document_key: 'a753525acda74cab9b3eef4044c71a23'
                            variable: 'ab59772cc3ba220076173b0ac3d3ae9c'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fa2ad63047b048b4bc3f51046cd34e10'
                        key: {
                            document_key: 'c74fa4c23e69455f847861185818a091'
                            variable: '74315b04b3201300176b051a16a8dc2b'
                        }
                    },
                    {
                        table: 'catalog_ui_policy_action'
                        id: 'fae772ced733402c90982280fe952d6c'
                        key: {
                            ui_policy: '231c6a24365c4c7b9c5146aebe30876d'
                            catalog_variable: 'IO:07dc41c8f8fc446781bd5c2aa6e55b84'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb283358843447f892700b71bba4efa5'
                        key: {
                            name: 'sc_req_item'
                            element: 'u_homologation_outcome'
                            value: 'approved'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'fc0cebfb2aa842f2b1f29435288baaad'
                        key: {
                            name: 'u_software_usage_offering_map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fcb7d0e8e5c74f6b9f4a70dd9af34c2b'
                        key: {
                            name: 'var__m_sys_hub_action_output_28f3a699a7bf41358c6f2cd79336a397'
                            element: '__action_status__'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fcfd24166c4445b9a07b9e1bb5613c4c'
                        key: {
                            document_key: '2409d59a2eff42a4bad0959b7f37aa3b'
                            variable: '9024a37f671003007ba405225685efe5'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'fd138d7885dc488b9197ae4de86eace2'
                        key: {
                            cat_item: '04118c5716964c24870c52ca22cd378b'
                            variable_set: 'NULL'
                            name: 'originating_request_item'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'fd7557b1873045ab9ebd50da83ebc63b'
                        key: {
                            document_key: 'b5edf769500f4aab8e6c4163eaffa78c'
                            variable: '6f69fc4aff6433008d3f5d9ad53bf18c'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'fdf3396a73584a4eba3c24c188f80de1'
                        key: {
                            model: '0ff2df5ef16c472691a47cd290461548'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fdf607848329435285fbde3a0ee5d9fb'
                        key: {
                            name: 'var__m_sys_hub_flow_output_f4a8e85de54e45cf8a8f3978059d418a'
                            element: 'entitlement'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_hub_action_output'
                        id: 'fe2a1768ea0044b0b7f60aa7a238bef2'
                        key: {
                            model: '28f3a699a7bf41358c6f2cd79336a397'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sc_cat_item_user_criteria_mtom'
                        id: 'fe93282ee1f54546b4172f72a68b01e1'
                        key: {
                            sc_cat_item: '85dc7a9f4804440da3bdfae92b047422'
                            user_criteria: '92c7cc349c264c2aafdcdbbd4b3aa79d'
                        }
                    },
                ]
            }
        }
    }
}
