Terrasoft.configuration.Structures["NavigateToSysSectionPanelSettingsTile"] = {innerHierarchyStack: ["NavigateToSysSectionPanelSettingsTile"]};
define("NavigateToSysSectionPanelSettingsTile", ["NavigateToSysSectionPanelSettingsTileResources", "MaskHelper",
		"RightUtilities"],
	function(resources, MaskHelper, RightUtilities) {
		/**
		 * @class Terrasoft.configuration.NavigateToSysSectionPanelSettingsTileViewModel
		 * ##### ###### ############# ######.
		 */
		Ext.define("Terrasoft.configuration.NavigateToSysSectionPanelSettingsTileViewModel", {
			extend: "Terrasoft.SystemDesignerTileViewModel",
			alternateClassName: "Terrasoft.NavigateToSysSectionPanelSettingsTileViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * @inheritDoc Terrasoft.configuration.SystemDesignerTileViewModel@constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.SystemDesignerTileViewModel#onClick
			 * @overridden
			 */
			onClick: function() {
				MaskHelper.ShowBodyMask();
				this.checkRights({
					operationName: "CanManageSectionPanelColorSettings",
					callback: this.navigateToSectionPanelSettingsSection
				});
			},

			/**
			 * ######### ####### #### ## ######## ######### ########.
			 * @private
			 * @param {Object} options ######### ######## #####.
			 * @param {String} options.operationName ### ######## ### ##### ## #########.
			 * @param {Function} options.callback ####### ######### ###### ##### ######### ######## #####.
			 */
			checkRights: function(options) {
				var operationName = options.operationName;
				var callback = options.callback;
				var currentRights = this.get(operationName);
				if (currentRights != null) {
					callback.call(this, currentRights);
				}
				RightUtilities.checkCanExecuteOperation({
					operation: operationName
				}, function(result) {
					this.set(operationName, result);
					callback.call(this, result);
				}, this);
			},

			/**
			 * ######### ###### #########.
			 * @private
			 * @param {Boolean} rights ######## ##### ########.
			 */
			navigateToSectionPanelSettingsSection: function(rights) {
				if (rights === true) {
					this.sandbox.requireModuleDescriptors(["SysSectionPanelSettingsModule"], function() {
						this.sandbox.publish("PushHistoryState", {
							hash: "SysSectionPanelSettingsModule"
						});
					}, this);
				} else {
					var message = this.get("Resources.Strings.RightsErrorMessage");
					this.Terrasoft.utils.showInformation(message);
				}
			}
		});
	});


