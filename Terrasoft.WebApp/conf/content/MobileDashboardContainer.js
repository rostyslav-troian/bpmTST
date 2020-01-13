Terrasoft.configuration.Structures["MobileDashboardContainer"] = {innerHierarchyStack: ["MobileDashboardContainer"]};
/**
 * @class Terrasoft.configuration.controls.DashboardContainer
 * Container of dashboard.
 */
Ext.define("Terrasoft.configuration.controls.DashboardContainer", {
	alternateClassName: "Terrasoft.DashboardContainer",
	extend: "Terrasoft.GridLayout",

	config: {

		/**
		 * @cfg {Terrasoft.configuration.enums.DashboardContainerItemsStatus} itemsStatus Status of items.
		 */
		itemsStatus: Terrasoft.DashboardContainerItemsStatus.NotLoaded,

		/**
		 * @cfg {Boolean} enablePullRefresh If false, does not render pull to refresh..
		 */
		enablePullRefresh: true

	},

	/**
	 * @property
	 * @private
	 */
	pullRefresh: null,

	/**
	 * @private
	 */
	getItemsStatusClassName: function(itemsStatus) {
		return "cf-dashboard-container-items-" + itemsStatus;
	},

	/**
	 * @private
	 */
	createPullRefresh: function() {
		var scrollable = this.getScrollable();
		if (!scrollable) {
			return;
		}
		this.pullRefresh = Ext.create("Terrasoft.PullRefresh", {
			listeners: {
				startrefresh: this.onStartRefresh,
				scope: this
			}
		});
		this.element.appendChild(this.pullRefresh.element);
		this.pullRefresh.setScrollable(scrollable);
	},

	/**
	 * @private
	 */
	destroyPullRefresh: function() {
		Ext.destroy(this.pullRefresh);
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initialize: function() {
		this.callParent(arguments);
		this.addCls("cf-dashboard-container");
	},

	/**
	 * @cfg-updater
	 * @protected
	 * @virtual
	 */
	updateEnablePullRefresh: function(enable) {
		if (enable) {
			this.createPullRefresh();
		} else {
			this.destroyPullRefresh();
		}
	},

	/**
	 * Called when pullrefresh was started.
	 * @protected
	 * @virtual
	 */
	onStartRefresh: function() {
		this.fireEvent("startrefresh", this);
	},

	/**
	 * @cfg-updater
	 * @protected
	 * @virtual
	 */
	updateItemsStatus: function(newValue, oldValue) {
		if (oldValue) {
			var oldClassName = this.getItemsStatusClassName(oldValue);
			this.element.removeCls(oldClassName);
		}
		if (newValue) {
			var newClassName = this.getItemsStatusClassName(newValue);
			this.element.addCls(newClassName);
			if (newValue !== Terrasoft.DashboardContainerItemsStatus.Loading) {
				this.stopPullRefresh();
			}
		}
	},

	/**
	 * Hides pull refresh indicator.
	 */
	stopPullRefresh: function() {
		if (this.pullRefresh) {
			this.pullRefresh.stop();
		}
	},

	/**
	 * Adds item to layout item.
	 * @param {String} name Name of layout item.
	 * @param {Object} item Configuration of item.
	 * @return {Ext.Component} Instance of component. 
	 */
	addByName: function(name, item) {
		item = Ext.factory(item);
		var layoutItems = this.getItems();
		var layoutItem = layoutItems.get(name);
		if (layoutItem) {
			layoutItem.element.replaceWith(item.element);
			layoutItems.replace(name, item);
		}
		return item;
	}

});

Terrasoft.configuration.DashboardContainer = Terrasoft.configuration.controls.DashboardContainer;


