/**
 * Request to delete data
 */
Ext.define('Terrasoft.data.queries.DeleteQuery', {
    extend: 'Terrasoft.BaseFilterableQuery',
    alternateClassName: 'Terrasoft.DeleteQuery',

    /**
     * Type of operation with data
     * @type {Terrasoft.QueryOperationType}
     */
    operationType: Terrasoft.QueryOperationType.DELETE

});