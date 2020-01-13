/**
 */
Ext.define("Terrasoft.manager.EmbeddedProcessSchemaManagerItem", {
	extend: "Terrasoft.BaseSchemaManagerItem",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaManagerItem",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#instanceClassName
	 * @override
	 */
	instanceClassName: "Terrasoft.EmbeddedProcessSchema",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#requestClassName
	 * @override
	 */
	requestClassName: "Terrasoft.EmbeddedProcessSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#removeRequestClassName
	 * @override
	 */
	removeRequestClassName: "Terrasoft.EmbeddedProcessSchemaRemoveRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#updateRequestClassName
	 * @override
	 */
	updateRequestClassName: "Terrasoft.EmbeddedProcessSchemaUpdateRequest",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#onAfterSave
	 * @override
	 */
	onAfterSave: function(response) {
		this.setPropertyValue("isInterpretable", response.isInterpretable);
		this.instance.validatorInfo = response.validatorInfo;
		this.instance.validatorMessage = response.validatorMessage;
		if (response.schemaName) {
			this.instance.name = response.schemaName;
		}
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#getInstance
	 * @override
	 */
	getInstance: function(callback, scope) {
		this.getInstanceWithResponse(callback, scope);
	}

	//endregion

});
