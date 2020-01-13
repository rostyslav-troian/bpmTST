/**
 * The query response class is schema.
 */
Ext.define("Terrasoft.core.GetAvailablePackagesResponse", {
	alternateClassName: "Terrasoft.GetAvailablePackagesResponse",
	extend: "Terrasoft.BaseResponse",

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
	 * @protected
	 * @override
	 */
	getResponsePropertyNames: function() {
		var parentResponsePropertyName = this.callParent(arguments);
		parentResponsePropertyName.push("availablePackages");
		return parentResponsePropertyName;
	}

	//endregion

});