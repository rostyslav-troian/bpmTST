/**
 */
Ext.define("Terrasoft.manager.ProcessUserTaskSchemaManagerItem", {
	extend: "Terrasoft.ProcessFlowElementSchemaManagerItem",
	alternateClassName: "Terrasoft.ProcessUserTaskSchemaManagerItem",

	// region Properties: Protected

	/**
  * The class name of the schema instance.
  * @protected
  * {String}
  */
	instanceClassName: "Terrasoft.ProcessUserTaskSchema",

	/**
  * The class name for the schema selection.
  * @protected
  * {String}
  */
	requestClassName: "Terrasoft.ProcessUserTaskSchemaRequest",

	//endregion

	//region Methods: Public

	/**
  * Returns item instance.
  * @param {Object} config New element configuration..
  * @return {Terrasoft.ProcessFlowElementSchema}
  */
	createInstance: function() {
		var instance = this.callParent(arguments);
		if (this.instance && this.instance.schema) {
			instance.setSchema(this.instance.schema);
		}
		return instance;
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#forceGetInstance
	 * @override
	 */
	forceGetInstance: function(callback, scope, config) {
		var query = this.getInstanceRequest(config);
		query.execute(function(response) {
			const instance = response && response.success && response.schemas[0];
			callback.call(scope, instance);
		}, scope);
	}

	//endregion

});
