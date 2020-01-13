Terrasoft.configuration.Structures["PortalMainPageBuilder"] = {innerHierarchyStack: ["PortalMainPageBuilder"]};
define("PortalMainPageBuilder", ["ext-base", "PortalMainPageBuilderResources",
	"DashboardManager", "DashboardManagerItem", "DashboardBuilder"],
function(Ext, resources) {

	/**
	 * @class Terrasoft.configuration.PortalMainPageViewConfig
	 * ##### ############ ############ ############# ###### ####### ######## #######.
	 */
	Ext.define("Terrasoft.configuration.PortalMainPageViewConfig", {
		extend: "Terrasoft.DashboardsViewConfig",
		alternateClassName: "Terrasoft.PortalMainPageViewConfig",

		/**
		 * ########## ############ ############# ###### ####### ######## #######.
		 * @protected
		 * @overridden
		 * @returns {Object[]} ########## ############ ############# ###### ####### ######## #######.
		 */
		generate: function() {
			var viewConfig = this.callParent(arguments);
			var viewConfigElementsNames = viewConfig.map(function(element) {
				return element.name;
			});
			var tabsElementIndex = viewConfigElementsNames.indexOf("Tabs");
			if (tabsElementIndex !== -1) {
				var tabElement = viewConfig[tabsElementIndex];
				tabElement.visible = {
					"bindTo": "isTabsHeadersVisible"
				};

				var tabElementControlConfig = tabElement.controlConfig;
				var tabElementItems = tabElementControlConfig.items;
				var tabElementItemsMarkerValues = tabElementItems.map(function(element) {
					return element.markerValue;
				});
				var settingsButtonIndex = tabElementItemsMarkerValues.indexOf("SettingsButton");
				if (settingsButtonIndex !== -1) {
					tabElementItems[settingsButtonIndex].visible = {
						"bindTo": "IsNotSSP"
					};
				}
			}
			return viewConfig;
		}
	});

	/**
	 * @class Terrasoft.configuration.BasePortalMainPageViewModel
	 * ##### ###### ############# ###### ####### ######## #######.
	 */
	Ext.define("Terrasoft.configuration.BasePortalMainPageViewModel", {
		extend: "Terrasoft.BaseDashboardsViewModel",
		alternateClassName: "Terrasoft.BasePortalMainPageViewModel",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		attributes: {
			/**
			 * ####### ####, ### ############ ######### ## ## #######.
			 * @type {Boolean}
			 */
			"IsNotSSP": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			}
		},

		/**
		 * #########, ### ######### ########## ######### #######.
		 * @protected
		 * @private
		 * @return {Boolean} ########## true #### ##### ########## # false # ######## ######.
		 */
		isTabsHeadersVisible: function() {
			var tabCollection = this.get("TabsCollection");
			return this.get("IsNotSSP") || tabCollection.getCount() > 1;
		},

		/**
		 * ############## ######### ######## ######.
		 * @protected
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.set("IsNotSSP", Terrasoft.CurrentUser.userType !== Terrasoft.UserType.SSP);
		},

		/**
		 * ############## ###### ########## ######## ## ####### ########.
		 * @protected
		 * @overridden
		 */
		initResourcesValues: function() {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resources, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * @inheritdoc BaseDashboardsViewModel#subscribeSandboxMessages
		 * @overridden
		 */
		subscribeSandboxMessages: function() {
			this.callParent(arguments);
			this.sandbox.subscribe("NeedHeaderCaption", function() {
				this.sandbox.publish("InitDataViews", {
					caption: this.get("Resources.Strings.Caption")
				});
			}, this);
		}

	});

	/**
	 * @class Terrasoft.configuration.PortalMainPageBuilder
	 * ##### ############### # #### ###### ######### #############
	 * # ###### ###### ############# ### ###### ####### ######## #######.
	 */
	var portalMainPageBuilder = Ext.define("Terrasoft.configuration.PortalMainPageBuilder", {
		extend: "Terrasoft.DashboardBuilder",
		alternateClassName: "Terrasoft.PortalMainPageBuilder",

		/**
		 * ### ####### ###### ############# ### ###### ####### ######## #######.
		 * @type {String}
		 */
		viewModelClass: "Terrasoft.BasePortalMainPageViewModel",

		/**
		 * ### ######## ##### ########## ############ ############# ####### ######## #######.
		 * @type {String}
		 */
		viewConfigClass: "Terrasoft.PortalMainPageViewConfig"

	});

	return portalMainPageBuilder;

});


