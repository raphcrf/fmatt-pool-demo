;(function removeFromEntraOnAllocationDelete(current) {
    // Uma alocacao apagada e a mesma intencao da oferta de devolucao, por outro
    // caminho: a Gestao de Licencas tira o direito direto na tabela, sem chamado.
    var userId = String(current.getValue('assigned_to') || '')
    var licenseId = String(current.getValue('licensed_by') || '')
    if (!userId || !licenseId) {
        return
    }

    var license = new GlideRecord('alm_license')
    if (!license.get(licenseId)) {
        return
    }
    var modelId = String(license.getValue('software_model') || '')
    if (!modelId) {
        return
    }

    // A regra NAO chama o Entra e NAO espera. Ela dispara o subflow em background
    // e devolve a transacao: a conferencia de uma hora precisa de timer, e timer
    // so existe em flow. Segurar o delete por uma hora nao e opcao.
    try {
        sn_fd.FlowAPI.getRunner()
            .subflow('global.entra_removal_after_allocation_delete')
            .inBackground()
            .withInputs({
                software_model: modelId,
                requested_for: userId,
                entitlement: licenseId,
                deleted_by: gs.getUserDisplayName(),
            })
            .run()
    } catch (e) {
        gs.error(
            'Entra removal after allocation delete could not be started for allocation ' +
                current.getUniqueValue() +
                ': ' +
                (e.message || e)
        )
    }
})(current)
