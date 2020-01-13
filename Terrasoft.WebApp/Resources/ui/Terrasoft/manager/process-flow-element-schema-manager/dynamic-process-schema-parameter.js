Ext.ns("Terrasoft.Core.Process");

Ext.define("Terrasoft.manager.DynamicProcessSchemaParameter", {
	extend: "Terrasoft.ProcessSchemaParameter",
	alternateClassName: "Terrasoft.DynamicProcessSchemaParameter",

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessSchemaParameter#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		var parentSchema = this.getParentSchema();
		var parentSchemaUId = parentSchema.uId;
		serializableObject.createdInSchemaUId = parentSchemaUId;
		serializableObject.modifiedInSchemaUId = parentSchemaUId;
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaParameter#getIsDynamic
	 * @override
	 */
	getIsDynamic: function() {
		return true;
	}

	//endregion

});

Terrasoft.Core.Process.DynamicProcessSchemaParameter = Terrasoft.DynamicProcessSchemaParameter;
