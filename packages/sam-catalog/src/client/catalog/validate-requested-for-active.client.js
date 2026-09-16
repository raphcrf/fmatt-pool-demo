function onChange(control, oldValue, newValue, isLoading) {
    // NAO retorna em isLoading de proposito, ao contrario dos outros scripts
    // deste catalogo. O bug do centro de custo e exatamente esse: o formulario
    // abre com `request_for` ja preenchido, o dependent question nunca muda, e
    // o dynamic default do `cost_center` nunca dispara. Rodar na carga e o que
    // faz o valor existir.
    g_form.hideFieldMsg('request_for', true)

    if (!newValue) {
        g_form.setValue('cost_center', '')
        return
    }

    g_form.getReference('request_for', function (user) {
        // Sem referencia confiavel nao acusa nada e nao apaga nada.
        if (!user) return

        // Centro de custo do solicitante. O campo e hidden, nao removido: a ata
        // de 31/07 pediu para esconder, nao para deixar de registrar quem paga.
        g_form.setValue('cost_center', user.cost_center || '')

        var active = user.active
        if (active === false || active === 'false' || active === '0') {
            g_form.showFieldMsg(
                'request_for',
                (user.name || 'That person') +
                    ' is not an active user and cannot receive a license. Pick an active employee.',
                'error'
            )
            g_form.clearValue('request_for')
        }
    })
}
