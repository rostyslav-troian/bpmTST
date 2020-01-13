Terrasoft.configuration.Structures["CampaignDiagramItem"] = {innerHierarchyStack: ["CampaignDiagramItem"]};
define("CampaignDiagramItem", ["terrasoft", "ext-base"], function(Terrasoft, Ext) {
	Ext.define("Terrasoft.configuration.CampaignDiagramItem", {
		extend: "Terrasoft.BaseModel",
		alternateClassName: "Terrasoft.CampaignDiagramItem",

		/**
		 * ### ########.
		 */
		name: "",

		/**
		 * ############ ########.
		 */
		config: null,

		attributes: {
			"AddInfo": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			"Text": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.TEXT
			}
		}
	});
});


