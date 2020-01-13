Terrasoft.configuration.Structures["DashboardListedGridViewModel"] = {innerHierarchyStack: ["DashboardListedGridViewModel"]};
define("DashboardListedGridViewModel", 
	["DashboardListedGridViewModelResources", "GridUtilitiesV2", "DashboardGridViewModel",
		"MiniPageUtilities", "ContextCallUtilities", "PageUtilities"],
	function(resources) {
		Ext.define("Terrasoft.DashboardListedGridViewModel", {
			extend: "Terrasoft.DashboardGridViewModel",

			/**
			 * Max grid page row count.
			 * @protected
			 * @type {Number}
			 */
			maxPageRowCount: 30,

			/**
			 * Is full screen mode enabled tag.
			 * @protected
			 * @type {Boolean}
			 */
			fullScreenEnabled: false,

			/**
			 * List of classes to mix into this class.
			 * @type {Object}.
			 */
			mixins: {
				/**
				 * @class GridUtilities.
				 */
				GridUtilities: "Terrasoft.GridUtilities",

				/**
				 * @class MiniPageUtilities
				 */
				MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities",

				/**
				 * @class ContextCallUtilities
				 */
				ContextCallUtilities: "Terrasoft.ContextCallUtilities",

				/**
				 * @class PageUtilities
				 */
				PageUtilities: "Terrasoft.PageUtilities"
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#addColumnLink
			 */
			addColumnLink: function() {
				return this.mixins.GridUtilities.addColumnLink.apply(this, arguments);
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#onLinkClick
			 */
			onLinkClick: function(rowId, columnPath) {
				var gridData = this.getGridData();
				var row = gridData.find(rowId);
				if (!row) {
					return;
				}
				var number = row.get(columnPath);
				if (!number) {
					return;
				}
				var isCalled = this.callCustomer({
					entityColumnName: columnPath,
					entitySchemaName: this.entitySchema.name,
					entityId: rowId,
					number: number
				});
				return !isCalled;
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#init
			 */
			init: function() {
				this.callParent(arguments);
				this.sandbox.registerMessages(this.messages);
				this.initResourcesValues(resources);
				this._initGridCellViewType();
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#initGridData
			 */
			initGridData: function() {
				this.callParent(arguments);
				this.set("IsPageable", true);
				this.set("CanLoadMoreData", true);
			},

			/**
			 * Initializes grid cell view type.
			 * @private
			 */
			_initGridCellViewType: function() {
				Terrasoft.ProfileUtilities.getProfile({
					profileKey: this.getProfileKey()
				}, function(profile) {
					this.set("GridCellViewType", profile && profile.gridCellViewType ||
						Terrasoft.GridCellViewType.ONELINE);
				}, this);
			},

			/**
			 * Returns profile grid settings key.
			 * @returns {String} Profile grid settings key.
			 */
			getProfileKey: function() {
				return this.sandbox.id;
			},

			/**
			 * On full screen button event handler.
			 */
			onFullScreenBtnClick: function() {
				var moduleId =  arguments && arguments[3];
				this.setFullScreenMode(moduleId);
			},

			/**
			 * Sets dashboard full screen mode.
			 * @protected
			 * @param {String} fullScreenElId Dashboard wrap element id.
			 */
			setFullScreenMode: function(fullScreenElId) {
				this.fullScreenEnabled = Terrasoft.toggleFullScreenMode(Ext.String.format("#{0}", fullScreenElId));
				this.set("WatchRowInViewport", this.fullScreenEnabled ? 1 : 0);
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#onDestroy
			 */
			onDestroy: function() {
				this.callParent(arguments);
				Terrasoft.utils.dom.setAttributeToBody("full-screen-enabled", false);
			},

			/**
			 * Switch grid cell view type.
			 */
			switchGridCellViewType: function() {
				var oneLineType = Terrasoft.GridCellViewType.ONELINE;
				var gridCellViewType = this.get("GridCellViewType") === oneLineType ?
					Terrasoft.GridCellViewType.MULTILINE : oneLineType;
				this.set("GridCellViewType", gridCellViewType);
				var listedGridUserConfig = {
					gridCellViewType: gridCellViewType
				};
				Terrasoft.utils.saveUserProfile(this.getProfileKey(), listedGridUserConfig, false);
			},

			/**
			 * Returns switch grid cell view type menu caption.
			 * @returns {String} Switch grid cell view type menu caption.
			 */
			getSwitchGridCellViewTypeMenuCaption: function() {
				return this.get("GridCellViewType") === Terrasoft.GridCellViewType.ONELINE ?
					this.get("Resources.Strings.MultiLineCaption") :
					this.get("Resources.Strings.OneLineCaption");
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#getRowCount
			 */
			getRowCount: function() {
				if (this.fullScreenEnabled) {
					return this.maxPageRowCount;
				}
				var rowCount = this.callParent(arguments);
				return rowCount >= this.maxPageRowCount ? this.maxPageRowCount : rowCount;
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#initQueryOptions
			 */
			initQueryOptions: function(esq) {
				this.callParent(arguments);
				if (esq.rowCount === this.getRowCount()) {
					esq.rowCount++;
				}
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#initCanLoadMoreData
			 */
			initCanLoadMoreData: function(responseCollection) {
				var collectionCount = responseCollection && responseCollection.getCount();
				var canLoadMore = collectionCount === this.getRowCount() + 1;
				if (canLoadMore) {
					responseCollection.removeByIndex(collectionCount - 1);
					collectionCount--;
				}
				this.set("CanLoadMoreData", canLoadMore);
				this.set("LastRecord", collectionCount > 0 ?
					responseCollection.getByIndex(collectionCount - 1) : null);
			},

			/**
			 * On grid load more button click event handler.
			 * @param {Ext.EventObject} event Event object.
			 */
			onLoadMoreBtnClick: function(event) {
				var eventTarget = event && event.target;
				this.setFullScreenMode(this._getDashboardWrapElIdByChildEl(eventTarget));
			},

			/**
			 * Returns dashboard wrap element id.
			 * @private
			 * @param {HTMLElement} el Dashboard child element.
			 * @returns {String} Dashboard wrap element id.
			 */
			_getDashboardWrapElIdByChildEl: function(el) {
				var target = Ext.get(el);
				if (!target) {
					return "";
				}
				var dashboardWrapEl = target.findParent(".dashboard-listed-grid");
				return dashboardWrapEl && dashboardWrapEl.id || "";
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.DashboardGridViewModel#loadGridData
			 */
			loadGridData: function() {
				if (this.get("CanLoadMoreData")) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritdoc
			 * @override Terrasoft.GridUtilities#exportToExcel
			 */
			exportToExcel: function() {
				const config = {
					downloadFileName: this.getDownloadFileName(this.$caption)
				};
				this.callParent([config]);
			}

		});
		return {};
});


