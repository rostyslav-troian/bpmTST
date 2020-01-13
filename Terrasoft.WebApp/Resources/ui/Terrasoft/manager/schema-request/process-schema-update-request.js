/**
 */
Ext.define("Terrasoft.data.queries.ProcessSchemaUpdateRequest", {
	extend: "Terrasoft.BaseSchemaUpdateRequest",
	alternateClassName: "Terrasoft.ProcessSchemaUpdateRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @override
	 */
	contractName: "ContractProcessSchema",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaUpdateRequest#getData
	 * @override
	 */
	getData: function() {
		var schema = this.schema;
		var resources = {};
		schema.getLocalizableValues(resources);
		return {
			metaData: schema.serialize(),
			resources: resources,
			uId: schema.uId,
			name: schema.name,
			requestTimeout: this.requestTimeout,
			changedItems: schema.changedItems,
			loadedLazyProperties: schema.getLoadedLazyProperties(),
			lazyProperties: schema.getLazyProperties()
		};
	}

	//endregion

});
