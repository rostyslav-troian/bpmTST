/**
 */
Ext.define("Terrasoft.data.queries.EmbeddedProcessSchemaUpdateRequest", {
	extend: "Terrasoft.BaseSchemaUpdateRequest",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaUpdateRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @override
	 */
	contractName: "ContractEmbeddedProcessSchema",

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
		var data = {
			metaData: schema.serialize(),
			resources: resources,
			uId: schema.uId,
			realUId: schema.realUId,
			name: schema.name,
			packageUId: schema.packageUId,
			requestTimeout: this.requestTimeout,
			changedItems: schema.changedItems,
			loadedLazyProperties: schema.getLoadedLazyProperties(),
			lazyProperties: schema.getLazyProperties()
		};
		if (schema.userDefinedCode !== schema.getInitialUserDefinedCode()){
			data.userDefinedCode = schema.userDefinedCode;
		}
		return data;
	}

	//endregion

});
