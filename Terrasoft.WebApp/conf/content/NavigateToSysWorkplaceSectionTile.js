Terrasoft.configuration.Structures["NavigateToSysWorkplaceSectionTile"] = {innerHierarchyStack: ["NavigateToSysWorkplaceSectionTile"]};
define("NavigateToSysWorkplaceSectionTile", ["NavigateToSysWorkplaceSectionTileResources", "MaskHelper",
		"RightUtilities"],
	function(resources, MaskHelper, RightUtilities) {

		/**
		 * @class Terrasoft.configuration.NavigateToSysWorkplaceSectionTileViewModel
		 * ##### ###### ############# ######.
		 */
		Ext.define("Terrasoft.configuration.NavigateToSysWorkplaceSectionTileViewModel", {
			extend: "Terrasoft.SystemDesignerTileViewModel",
			alternateClassName: "Terrasoft.NavigateToSysWorkplaceSectionTileViewModel",
			Ext: null,
			sandbox: null,
			Terrasoft: null,

			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.SystemDesignerTileViewModel#onClick
			 * @overridden
			 */
			onClick: function() {
				if (this.get("CanManageWorkplaces") != null) {
					this.navigateToSysWorkPlaceSection();
				} else {
					RightUtilities.checkCanExecuteOperation({
						operation: "CanManageWorkplaceSettings"
					}, function(result) {
						this.set("CanManageWorkplaces", result);
						this.navigateToSysWorkPlaceSection();
					}, this);
				}
			},

			/**
			 * ######### ###### ######### ####### #### ### ########## ######### # ######.
			 * @private
			 */
			navigateToSysWorkPlaceSection: function() {
				if (this.get("CanManageWorkplaces") === true) {
					MaskHelper.ShowBodyMask();
					this.sandbox.publish("PushHistoryState", {
						hash: "SectionModuleV2/SysWorkplaceSectionV2/"
					});
				} else {
					var message = this.get("Resources.Strings.RightsErrorMessage");
					this.Terrasoft.utils.showInformation(message);
				}
			}
		});
	});


