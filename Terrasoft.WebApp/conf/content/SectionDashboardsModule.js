Terrasoft.configuration.Structures["SectionDashboardsModule"] = {innerHierarchyStack: ["SectionDashboardsModule"]};
define("SectionDashboardsModule", ["DashboardsModule", "SectionDashboardsViewModel", "SectionDashboardBuilder",
	"HistoryStateUtilities"],
function() {
	/**
	 * @class Terrasoft.configuration.SectionDashboardsModule
	 * ##### ########### ###### ######.
	 */
	return Ext.define("Terrasoft.configuration.SectionDashboardsModule", {
		extend: "Terrasoft.DashboardsModule",
		alternateClassName: "Terrasoft.SectionDashboardsModule",
		viewModelClassName: "Terrasoft.SectionDashboardsViewModel",
		builderClassName: "Terrasoft.SectionDashboardBuilder",

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
		 * ####### ########## ######.
		 */
		render: function() {
			this.callParent(arguments);
			this.sandbox.publish("NeedHeaderCaption");
		},

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


