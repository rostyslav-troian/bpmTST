Terrasoft.configuration.Structures["MobileDashboardItemPageView"] = {innerHierarchyStack: ["MobileDashboardItemPageView"]};
/**
 * @class Terrasoft.configuration.view.DashboardItemPage
 */
Ext.define("Terrasoft.configuration.view.DashboardItemPage", {
	extend: "Terrasoft.view.BasePage",
	alternateClassName: "Terrasoft.view.DashboardItemPage",

	config: {

		/**
		 * @inheritdoc
		 */
		navigationPanel: {
			backButton: true
		},

		/**
		 * @inheritdoc
		 */
		scrollable: null,

		/**
		 * @inheritdoc
		 */
		layout: "vbox",

		/**
		 * @inheritdoc
		 */
		items: [
			{
				xtype: "container",
				itemId: "dashboardItemContainer",
				cls: "cf-dashboard-item-page-item-container"
			}
		],

		/**
		 * @cfg {String} itemClassName Class name of item.
		 */
		itemClassName: null

	},

	//region Properties: Protected

	/**
	 * @property {Ext.Component} Component of dashboard item.
	 * @protected
	 */
	dashboardItem: null,

	/**
	 * @property {Terrasoft.Grid} Instance of grid.
	 * @protected
	 */
	grid: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	getDashboardItemContainer: function() {
		return this.getComponent("dashboardItemContainer");
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initialize: function() {
		this.callParent(arguments);
		this.addCls("cf-dashboard-item-page");
	},

	/**
	 * Creates instance of grid.
	 * @protected
	 * @virtual
	 * @param {Object} config Configuration to create instance of grid.
	 * @return {Terrasoft.Grid} Instance of grid.
	 */
	createGrid: function(config) {
		config = Ext.merge({
			xtype: "tsgrid",
			scrollable: true,
			height: "100%"
		}, config);
		if (this.grid) {
			this.grid.destroy();
		}
		return Ext.factory(config);
	},

	/**
	 * Creates instance of dashboard item.
	 * @protected
	 * @virtual
	 * @param {Object} config Configuration to create instance of dashboard item.
	 * @return {Ext.Component} Component of dashboard item.
	 */
	createDashboardItem: function(config) {
		return Ext.create(this.getItemClassName(), config);
	},

	//endregion

	//region Methods: Public

	/**
	 * Sets dashboard item on page.
	 * @param {Object} dashboardItemConfig Configuration of dashboard item.
	 */
	setDashboardItem: function(dashboardItemConfig) {
		var container = this.getDashboardItemContainer();
		if (this.dashboardItem) {
			this.dashboardItem.destroy();
		}
		var dashboardItem = this.dashboardItem = this.createDashboardItem(dashboardItemConfig);
		container.add(dashboardItem);
	},

	/**
	 * Creates grid.
	 * @param {Object} config Configuration of grid.
	 * @return {Terrasoft.Grid} Instance of grid.
	 */
	setGrid: function(config) {
		var grid = this.grid = this.createGrid(config);
		this.add(grid);
		return grid;
	},

	/**
	 * Returns grid.
	 * @return {Terrasoft.Grid} Instance of grid.
	 */
	getGrid: function() {
		return this.grid;
	}

	//endregion

});


