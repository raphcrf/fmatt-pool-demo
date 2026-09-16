;(function executeStep(inputs, outputs) {

    var result = new global.UniversalUsageImporter().importFromRequestItem(
        inputs.request_item,
        String(inputs.profile || '').trim()
    )

    outputs.ok = result.ok
    outputs.message = result.message
    outputs.file_name = result.file_name
    outputs.rows_read = result.rows_read
    outputs.rows_imported = result.rows_imported
    outputs.rows_rejected = result.rows_rejected
})(inputs, outputs)
