Terrasoft.configuration.Structures["CampaignValidationResponse"] = {innerHierarchyStack: ["CampaignValidationResponse"]};
define("CampaignValidationResponse", [], function() {
	/**
	 * @class Terrasoft.data.queries.CampaignValidationResponse
	 * Campaign validation response class.
	 */
	Ext.define("Terrasoft.data.queries.CampaignValidationResponse", {
		extend: "Terrasoft.BaseResponse",
		alternateClassName: "Terrasoft.CampaignValidationResponse",
		
		/**
		 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
		 * @protected
		 * @override
		 */
		getResponsePropertyNames: function() {
			var parentResponsePropertyName = this.callParent(arguments);
			parentResponsePropertyName.push("warningInfo");
			parentResponsePropertyName.push("isValid");
			return parentResponsePropertyName;
		}

	});
	return Terrasoft.data.queries.CampaignValidationResponse;
});


