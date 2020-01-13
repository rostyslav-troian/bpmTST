Terrasoft.configuration.Structures["SspActivityDashboardItemViewModel"] = {innerHierarchyStack: ["SspActivityDashboardItemViewModel"]};
define("SspActivityDashboardItemViewModel", ["SspActivityDashboardItemViewModelResources", "ActivityDashboardItemViewModel", 
	"SspMiniPageUtilities"], function() {

		/**
		 * Action dashboard item view model class.
		 * Provides methods for SSP users action dashboard items logic.
		 * @class Terrasoft.configuration.SspActivityDashboardItemViewModel
		 */
		Ext.define("Terrasoft.configuration.SspActivityDashboardItemViewModel", {
			extend: "Terrasoft.ActivityDashboardItemViewModel",
			alternateClassName: "Terrasoft.SspActivityDashboardItemViewModel",

			mixins: {
				/**
				 * @class SspMiniPageUtilitiesMixin Provides methods for SSP users minipage usage.
				 */
				SspMiniPageUtilitiesMixin: "Terrasoft.SspMiniPageUtilities"
			},

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.MiniPageUtilities#getMiniPages
			 * @override
			 */
			getMiniPages: function(entityName) {
				var result = this.callParent(arguments);
				if (Ext.isEmpty(result)) {
					const sspMiniPage = this.getSspMiniPageSchemaName(entityName);
					if (!Ext.isEmpty(sspMiniPage)) {
						result.push(sspMiniPage);
					}
				}
				return result;
			}

			//endregion

		});
	});


