/**
 * The query response class is schema.
 */
Ext.define("Terrasoft.core.BuildPackageHierarchyResponse", {
	alternateClassName: "Terrasoft.BuildPackageHierarchyResponse",
	extend: "Terrasoft.BaseResponse",

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
	 * @protected
	 * @override
	 */
	getResponsePropertyNames: function() {
		var parentResponsePropertyName = this.callParent(arguments);
		parentResponsePropertyName.push("packageHierarchy");
		return parentResponsePropertyName;
	}

	//endregion

});