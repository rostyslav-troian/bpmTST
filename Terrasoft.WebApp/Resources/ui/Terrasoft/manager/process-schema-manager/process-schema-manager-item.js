/**
 */
Ext.define("Terrasoft.manager.ProcessSchemaManagerItem", {
	extend: "Terrasoft.BaseSchemaManagerItem",
	alternateClassName: "Terrasoft.ProcessSchemaManagerItem",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#instanceClassName
	 * @override
	 */
	instanceClassName: "Terrasoft.ProcessSchema",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#requestClassName
	 * @override
	 */
	requestClassName: "Terrasoft.ProcessSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#removeRequestClassName
	 * @override
	 */
	removeRequestClassName: "Terrasoft.ProcessSchemaRemoveRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#updateRequestClassName
	 * @override
	 */
	updateRequestClassName: "Terrasoft.ProcessSchemaUpdateRequest",

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
