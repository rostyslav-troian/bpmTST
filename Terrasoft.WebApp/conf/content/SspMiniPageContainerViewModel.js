Terrasoft.configuration.Structures["SspMiniPageContainerViewModel"] = {innerHierarchyStack: ["SspMiniPageContainerViewModel"]};
define("SspMiniPageContainerViewModel", ["MiniPageContainerViewModel", "SspMiniPageUtilities"], function() {

	/**
	 * MiniPage container module view model class.
	 * Provides methods for SSP users minipage load logic.
	 * @class Terrasoft.configuration.SspMiniPageContainerViewModel
	 */
	Ext.define("Terrasoft.configuration.SspMiniPageContainerViewModel", {
		extend: "Terrasoft.MiniPageContainerViewModel",
		alternateClassName: "Terrasoft.SspMiniPageContainerViewModel",

		mixins: {
			/**
			 * @class SspMiniPageUtilitiesMixin Provides methods for SSP users minipage usage.
			 */
			SspMiniPageUtilitiesMixin: "Terrasoft.SspMiniPageUtilities"
		},

		//region Methods: Public
		
		/**
		 * @inheritdoc Terrasoft.MiniPageContainerViewModel#getSchemaName
		 * @override
		 */
		getSchemaName: function(entityName, typeId) {
			var miniPageSchema = this.callParent(arguments);
			if (Ext.isEmpty(miniPageSchema)) {
				miniPageSchema = this.getSspMiniPageSchemaName(entityName);
			}
			return miniPageSchema;
		}

		//endregion
	});
});
 

