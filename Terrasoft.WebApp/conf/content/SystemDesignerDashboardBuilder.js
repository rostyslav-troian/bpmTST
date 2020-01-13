Terrasoft.configuration.Structures["SystemDesignerDashboardBuilder"] = {innerHierarchyStack: ["SystemDesignerDashboardBuilder"]};
define("SystemDesignerDashboardBuilder", ["ext-base", "SystemDesignerDashboardBuilderResources", "DashboardBuilder"],
	function(Ext) {
		/**
		 * @class Terrasoft.configuration.SystemDesignerDashboardViewsConfig
		 * ##### ############ ############ ############# ###### ###### ### ####### ######### #######.
		 */
		Ext.define("Terrasoft.configuration.SystemDesignerDashboardsViewConfig", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.SystemDesignerDashboardsViewConfig",

			/**
			 * ########## ############ ############# ###### ###### ### ####### ######### #######.
			 * @return {Object[]} ########## ############ ############# ###### ######.
			 */
			generate: function() {
				return [{
					"name": "SettingsButton",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREY,
					"caption": { "bindTo": "Resources.Strings.ActionsButtonCaption" },
					"markerValue": "SettingsButton",
					"visible": { "bindTo": "EditMode" },
					"menu": {
						items: [{
							"caption": { "bindTo": "Resources.Strings.EditButtonCaption" },
							"click": { "bindTo": "editCurrentDashboard" },
							"markerValue": "SettingsButtonEdit",
							"enabled": { "bindTo": "canEdit" }
						}, {
							"caption": { "bindTo": "Resources.Strings.RightsButtonCaption" },
							"click": { "bindTo": "manageCurrentDashboardRights" },
							"markerValue": "ManageRights",
							"enabled": { "bindTo": "canManageRights" }
						}]
					}
				}, {
					"name": "DashboardModule",
					"itemType": Terrasoft.ViewItemType.CONTAINER
				}];
			}
		});

		/**
		 * @class Terrasoft.configuration.SystemDesignerDashboardBuilder
		 * ##### ###### ############# ###### ###### ### ####### ######### #######.
		 */
		return Ext.define("Terrasoft.configuration.SystemDesignerDashboardBuilder", {
			extend: "Terrasoft.DashboardBuilder",
			alternateClassName: "Terrasoft.SystemDesignerDashboardBuilder",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ### ####### ###### ############# ### ###### ###### ### ####### ######### #######.
			 * @type {String}
			 */
			viewModelClass: "Terrasoft.SystemDesignerDashboardsViewModel",

			/**
			 * ### ######## ##### ########## ############ ############# ###### ### ####### ######### #######.
			 * @type {String}
			 */
			viewConfigClass: "Terrasoft.SystemDesignerDashboardsViewConfig"
		});
	});


