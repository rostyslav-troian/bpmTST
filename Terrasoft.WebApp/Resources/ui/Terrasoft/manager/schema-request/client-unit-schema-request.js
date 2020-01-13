/**
 * The client schema request class.
 */
Ext.define("Terrasoft.data.queries.ClientUnitSchemaRequest", {
    extend: "Terrasoft.BaseSchemaRequest",
    alternateClassName: "Terrasoft.ClientUnitSchemaRequest",

    // region Properties: Protected

    /**
     * The name of the contract object on the server.
     * @type {String}
     */
    contractName: "ClientUnitSchemaRequest",

    /**
     * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName.
     * @protected
     * @override
     */
    responseClassName: "Terrasoft.ClientUnitSchemaResponse"

    //endregion

});