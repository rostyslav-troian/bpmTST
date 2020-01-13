Terrasoft.configuration.Structures["SystemDesignerDashboardsModule"] = {innerHierarchyStack: ["SystemDesignerDashboardsModule"]};
define("SystemDesignerDashboardsModule", ["ext-base", "DashboardsModule", "SectionDashboardsViewModel",
		"SectionDashboardBuilder", "HistoryStateUtilities"],
	function() {

		/**
		 * @class Terrasoft.configuration.SystemDesignerDashboardsModule
		 * ##### ########### ###### ###### ### ####### ######### #######.
		 */
		return Ext.define("Terrasoft.configuration.SystemDesignerDashboardsModule", {
			extend: "Terrasoft.DashboardsModule",
			alternateClassName: "Terrasoft.SystemDesignerDashboardsModule",
			viewModelClassName: "Terrasoft.SystemDesignerDashboardsViewModel",
			viewConfigClass: "Terrasoft.SystemDesignerDashboardsViewConfig",
			builderClassName: "Terrasoft.SystemDesignerDashboardBuilder",

			/**
			 *
			 */
			mixins: {
				/**
				 * ######, ########### ###### # HistoryState
				 */
				HistoryStateUtilities: "Terrasoft.HistoryStateUtilities"
			},

			/**
			 * ########### ############# #########, ### ### # ####### ############ ### ######### ######.
			 * @overridden
			 * @protected
			 */
			initHistoryState: Terrasoft.emptyFn,

			/**
			 * @inheritDoc Terrasoft.configuration.DashboardsModule#getDashboardSectionId
			 * @override
			 */
			getDashboardSectionId: function() {
				const sectionInfo = this.getSectionInfo() || {};
				return sectionInfo.moduleId || Terrasoft.GUID_EMPTY;
			}
		});
	});


