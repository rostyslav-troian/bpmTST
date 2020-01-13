Terrasoft.configuration.Structures["MobileDashboardPageView"] = {innerHierarchyStack: ["MobileDashboardPageView"]};
/**
 * @class Terrasoft.configuration.view.DashboardPage
 */
Ext.define("Terrasoft.configuration.view.DashboardPage", {
	extend: "Terrasoft.view.BaseConfigurationPage",
	xtype: "dashboardpageview",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "MobileDashboardPage",

		/**
		 * @inheritdoc
		 */
		cls: "cf-dashboard-page",

		/**
		 * @inheritdoc
		 */
		height: "100%",

		/**
		 * @inheritdoc
		 */
		layout: "fit",

		/**
		 * @inheritdoc
		 */
		pageType: Terrasoft.PageTypes.Grid,

		/**
		 * @inheritdoc
		 */
		pageId: "MobileDashboardPage",

		/**
		 * @inheritdoc
		 */
		navigationPanel: {
			menuButton: true,
			showMenuOnSwipe: true
		},

		/**
		 * @cfg {Number} defaultRowHeight Default row height.
		 */
		defaultRowHeight: null,

		/**
		 * @cfg {Boolean|Config} refreshButton Refresh button.
		 */
		refreshButton: false

	},

	/**
	 * @private
	 */
	carousel: null,

	/**
	 * @private
	 */
	noDataLabel: null,

	/**
	 * @private
	 */
	activeDashboardItem: null,

	/**
	 * @private
	 */
	dashboardGenerators: null,

	/**
	 * @private
	 */
	dashboardPicker: null,

	/**
	 * @private
	 */
	cancelCarouselItemActivation: function() {
		if (this.changeActiveCarouselItemTimeoutId) {
			window.clearTimeout(this.changeActiveCarouselItemTimeoutId);
			this.changeActiveCarouselItemTimeoutId = null;
		}
	},

	/**
	 * @private
	 */
	activateDashboard: function() {
		var showRefreshButton = false;
		if (this.carousel) {
			var activeItem = this.carousel.getActiveItem();
			if (activeItem) {
				showRefreshButton = true;
				var activeIndex = this.carousel.getActiveIndex();
				this.fireEvent("dashboardactivated", activeIndex, activeItem);
				if (activeItem.getItemsStatus() === Terrasoft.DashboardContainerItemsStatus.Loaded) {
					this.reflowDashboard(activeItem);
				}
			}
		}
		this.setRefreshButton(showRefreshButton);
	},

	/**
	 * @private
	 */
	reflowDashboard: function(activeItem) {
		var items = activeItem.getItems();
		items.each(function(item) {
			this.reflowDashboardItem(item);
		}, this);
	},

	/**
	 * @private
	 */
	getCachedDashboardLayoutItem: function(dashboardId, itemName) {
		var layoutItems = this.getDashboardViewGenerator(dashboardId);
		if (layoutItems) {
			return Terrasoft.Array.find(layoutItems, function(layoutItem) {
				return layoutItem.name === itemName;
			});
		}
	},

	/**
	 * @private
	 */
	renderDashboardItem: function(sysDashboardRecord, itemName, dashboardItem) {
		var gridLayout = this.getCarouselItem(sysDashboardRecord.getId());
		return gridLayout.addByName(itemName, dashboardItem);
	},

	/**
	 * @private
	 */
	setDashboardViewGenerator: function(dashboardId, generator) {
		this.dashboardGenerators[dashboardId] = generator;
	},

	/**
	 * Returns dashboard view generator.
	 * @protected
	 * @param {String} dashboardId Id of dashboard.
	 * @return {Terrasoft.configuration.DashboardViewGenerator} Instance.
	 */
	getDashboardViewGenerator: function(dashboardId) {
		return this.dashboardGenerators[dashboardId];
	},

	/**
	 * Creates dashboard view generator.
	 * @protected
	 * @virtual
	 * @param {Object} layoutConfig Layout config.
	 * @return {Terrasoft.configuration.DashboardViewGenerator} Instance.
	 */
	createDashboardViewGenerator: function(layoutConfig) {
		var config = {
			layoutConfig: layoutConfig,
			defaultItemsStatus: Terrasoft.DashboardContainerItemsStatus.Loading,
			itemListeners: {
				tap: this.onDashboardItemTap,
				fullscreenbuttontap: this.onDashboardItemFullscreenButtonTap,
				recordlinktap: this.onDashboardItemRecordLinkTap,
				scope: this
			}
		};
		var rowHeight = this.getDefaultRowHeight();
		if (rowHeight) {
			config.defaultRowHeight = rowHeight;
		}
		return Terrasoft.DashboardUtils.getDashboardViewGeneratorInstance(config);
	},

	/**
	 * Returns instance of picker for select dashboards.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.LookupPicker} Instance of picker.
	 */
	getDashboardPicker: function() {
		var dashboardPicker = this.dashboardPicker;
		if (!dashboardPicker) {
			dashboardPicker = Ext.create("Terrasoft.LookupPicker", {
				component: {
					listPaging: false,
					grouped: true,
					store: null,
					primaryColumn: "Caption",
					listeners: {
						scope: this,
						select: this.onDashboardPickerSelect
					},
					pinHeaders: false
				},
				toolbar: {
					clearButton: false
				},
				title: Terrasoft.LS.DashboardSectionTitle,
				deselectOnHide: false,
				popup: true
			});
			var filterPanel = dashboardPicker.getFilterPanel();
			filterPanel.on("filterchange", this.onDashboardPickerFilterChange, this);
			filterPanel.addModule({
				xtype: Terrasoft.FilterModuleTypes.Search,
				filterColumnNames: ["Caption"],
				name: "LookupSearch",
				component: {
					markerValue: "captionLikeSearchFilter"
				}
			});
			this.dashboardPicker = dashboardPicker;
		}
		return this.dashboardPicker;
	},

	/**
	 * Called when dashboard item is selected in picker.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.controls.List} el Picker's list.
	 * @param {RecentDashboardsModel} pickerRecord Instance of model.
	 */
	onDashboardPickerSelect: function(el, pickerRecord) {
		this.fireEvent("dashboardpickerselect", pickerRecord);
	},

	/**
	 * Called when dashboard picker filter is changed.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.controls.SearchFilterModule} filterModule Filter module.
	 */
	onDashboardPickerFilterChange: function(filterModule) {
		var filterField = filterModule.getComponent();
		var filterValue = filterField.getValue();
		var picker = this.dashboardPicker;
		var pickerList = picker.getComponent();
		var store = pickerList.getStore();
		store.clearFilter(!Ext.isEmpty(filterValue));
		if (filterValue) {
			store.filter("Caption", filterValue, true, false);
		}
	},

	/**
	 * Removes carousel tabs from view.
	 * @private
	 */
	removeCarousel: function() {
		if (this.carousel) {
			this.remove(this.carousel);
		}
	},

	/**
	 * @private
	 */
	requestDashboardItems: function(sysDashboardRecord, layoutItems) {
		var dashboardContainer = this.getCarouselItem(sysDashboardRecord.getId());
		for (var i = 0, ln = layoutItems.length; i < ln; i++) {
			var layoutItem = layoutItems[i];
			this.fireEvent("requestitem", {
				view: this,
				dashboardContainer: dashboardContainer,
				sysDashboardRecord: sysDashboardRecord,
				itemName: layoutItem.name
			});
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initialize: function() {
		this.callParent(arguments);
		this.dashboardGenerators = {};
		var navigationPanel = this.getNavigationPanel();
		navigationPanel.setTitle(Terrasoft.LocalizableStrings.MobileDashboardPageTitle);
		Ext.Viewport.element.on("touchstart", this.onViewportTouchStart, this);
	},

	/**
	 * Returns refresh button config.
	 * @protected
	 * @virtual
	 * @returns {Object} Refresh button config.
	 */
	getRefreshButtonConfig: function() {
		return {
			cls: "cf-dashboard-refresh-button",
			iconCls: "x-refresh-white-icon",
			listeners: {
				tap: this.onRefreshButtonTap,
				scope: this
			}
		};
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-applier
	 */
	applyRefreshButton: function(value) {
		if (!value) {
			return false;
		}
		var config = this.getRefreshButtonConfig();
		return Ext.factory(config, "Ext.Button", this.getRefreshButton());
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateRefreshButton: function(newButton, oldButton) {
		if (newButton) {
			var navigationPanel = this.getNavigationPanel();
			navigationPanel.addButton(newButton);
		}
		if (oldButton) {
			Ext.destroy(oldButton);
		}
	},

	/**
	 * Creates 'no data' label.
	 * @protected
	 * @virtual
	 * @return {Ext.Label} Instance of label.
	 */
	createNoDataLabel: function() {
		return Ext.create("Ext.Label", {
			cls: "cf-no-dashboard-data-label",
			html: Terrasoft.LocalizableStrings.MobileDashboardPageNoDataLabelText
		});
	},

	/**
	 * Gets configuration of carousel item.
	 * @protected
	 * @virtual
	 * @param {String} dashboardId Id of dashboard.
	 * @return {Object} Configuration of carousel item.
	 */
	getCarouselItemConfig: function(dashboardId) {
		var viewGenerator = this.createDashboardViewGenerator();
		this.setDashboardViewGenerator(dashboardId, viewGenerator);
		return Ext.merge(viewGenerator.generateContainer(), {
			itemId: dashboardId,
			listeners: {
				startrefresh: this.onDashboardContainerStartRefresh,
				scope: this
			},
			enablePullRefresh: true
		});
	},

	/**
	 * Gets config of carousel.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.BaseModel[]} records Instances of model.
	 * @param {String} activeDashbordId Active dashbord's Id.
	 */
	getCarouselConfig: function(records, activeDashbordId) {
		var items = [];
		var titles = [];
		var activeItemIndex = 0;
		for (var i = 0, ln = records.length; i < ln; i++) {
			var record = records[i];
			var itemConfig = this.getCarouselItemConfig(record.getId());
			if (record.getPrimaryColumnValue() === activeDashbordId) {
				activeItemIndex = i;
			}
			items.push(itemConfig);
			titles.push(record.get("Caption"));
		}
		return {
			indicator: {
				titles: titles,
				noItemsTitle: Terrasoft.LocalizableStrings.MobileDashboardPageNoDashboardsText
			},
			items: items,
			activeItem: activeItemIndex
		};
	},

	/**
	 * Creates carousel.
	 * @protected
	 * @virtual
	 * @param {Object} carouselConfig Config of {@link Terrasoft.Carousel}.
	 */
	createCarousel: function(carouselConfig) {
		Ext.applyIf(carouselConfig, {
			listeners: {
				activeitemchange: this.onCarouselActiveItemChange,
				scope: this
			}
		});
		this.carousel = Ext.create("Terrasoft.Carousel", carouselConfig);
		this.add(this.carousel);
		this.activateDashboard();
	},

	/**
	 * Returns layout config with item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getLayoutItem} in custom generator.
	 * @protected
	 * @virtual
	 * @param {Object} item Configuration of dashboard item.
	 * @param {Object} viewConfigItem Configuration of layout.
	 * @returns {Object} Layout config with item.
	 */
	getDashboardLayoutItem: function(viewConfigItem, item) {
	},

	/**
	 * Updates dashboard item config depending on layout.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#generateItem} in custom generator.
	 * @protected
	 * @virtual
	 * @param {Object} item Configuration of dashboard item.
	 * @param {Object} layout Configuration of layout.
	 */
	updateDashboardItemConfig: function(item, layout) {
	},

	/**
	 * Called when carousel active item was changed.
	 * @protected
	 * @virtual
	 */
	onCarouselActiveItemChange: function() {
		var itemActivationDelay = 500;
		this.cancelCarouselItemActivation();
		this.changeActiveCarouselItemTimeoutId = window.setTimeout(function() {
			this.activateDashboard();
		}.bind(this), itemActivationDelay);
	},

	/**
	 * Called when dashboard item has been tapped.
	 * @protected
	 * @virtual
	 * @param {Ext.Component} item Instance of dashboard item.
	 */
	onDashboardItemTap: function(item) {
		this.setActiveDashboardItem(item);
	},

	/**
	 * Called when viewport touch has been started.
	 * @protected
	 * @virtual
	 * @param {Event} e Event.
	 */
	onViewportTouchStart: function(e) {
		if (this.activeDashboardItem && !this.activeDashboardItem.element.dom.contains(e.target)) {
			this.setActiveDashboardItem(null);
		}
	},

	/**
	 * Called when pullrefresh was started.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.configuration.DashboardContainer} dashboardContainer Instance of dashboard container.
	 */
	onDashboardContainerStartRefresh: function(dashboardContainer) {
		this.fireEvent("pullrefresh", this, dashboardContainer);
	},

	/**
	 * Called when refresh button has been tapped.
	 * @protected
	 * @virtual
	 * @param {Ext.Button} button Instance of button.
	 * @param {Event} e Event.
	 */
	onRefreshButtonTap: function(button, e) {
		this.fireEvent("refreshbuttontap", this, button, e);
	},

	/**
	 * Sets image when there is no data for displaying dashboards.
	 * @param {Boolean} noDashboardData Show or hide "no data" image.
	 */
	setNoData: function(noDashboardData) {
		if (noDashboardData) {
			this.removeCarousel();
			if (Terrasoft.ApplicationUtils.isOnlineMode()) {
				Terrasoft.RequestManager.fireEvent("connectionlost");
			} else {
				this.addCls("cf-no-dashboard-data");
				if (!this.noDataLabel) {
					this.noDataLabel = this.createNoDataLabel();
				}
				this.add(this.noDataLabel);
			}
		} else {
			this.removeCls("cf-no-dashboard-data");
			this.remove(this.noDataLabel);
		}
	},

	/**
	 * Returns configuration of dashboard item by widget type.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @return {Object} Configuration of dashboard item.
	 */
	getDashboardItem: function(itemConfig) {
		var viewGenerator = this.getDashboardViewGenerator();
		return viewGenerator.generateItem(itemConfig);
	},

	/**
	 * Returns configuration of indicator dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getIndicatorItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Configuration of indicator dashboard item.
	 */
	getIndicatorDashboardItem: function(itemConfig) {
		return {};
	},

	/**
	 * Returns configuration of chart dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getChartItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Configuration of chart dashboard item.
	 */
	getChartDashboardItem: function(itemConfig) {
		return {};
	},

	/**
	 * Returns configuration of gauge dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getGaugeItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Configuration of gauge dashboard item.
	 */
	getGaugeDashboardItem: function(itemConfig) {
		return {};
	},

	/**
	 * Returns configuration of grid dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getGridItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Configuration of grid dashboard item.
	 */
	getGridDashboardItem: function(itemConfig) {
		return {};
	},

	/**
	 * Returns configuration of custom dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getCustomItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @param {String} className Class name.
	 * @returns {Object} Configuration of grid dashboard item.
	 */
	getCustomDashboardItem: function(itemConfig, className) {
		return {};
	},

	/**
	 * Returns configuration of default dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getDefaultItem} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Configuration of default dashboard item.
	 */
	getDefaultDashboardItem: function(itemConfig) {
		return {};
	},

	/**
	 * Returns configuration of failed dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getDataNotAvailableItem} in custom generator.
	 * @returns {Object} Configuration of failed dashboard item.
	 */
	getFailedDashboardItem: function() {
		return {};
	},

	/**
	 * Reflows dashboard item.
	 * @protected
	 * @virtual
	 * @param {Ext.Component} item Instance of dashboard item.
	 */
	reflowDashboardItem: function(item) {
		if (item instanceof Terrasoft.ChartDashboardItem) {
			var chart = item.getChart();
			chart.reflow();
		}
	},

	/**
	 * Handles tap on fullscreen button in dashboard item.
	 * @protected
	 * @virtual
	 */
	onDashboardItemFullscreenButtonTap: function(dashboardItem, itemName) {
		this.fireEvent("dashboarditemfullscreenbuttontap", dashboardItem, itemName);
	},

	/**
	 * Called when record link of dashboard item has been tapped.
	 * @protected
	 * @virtual
	 * @param {String} modelName Name of model.
	 * @param {String} recordId Record id.
	 */
	onDashboardItemRecordLinkTap: function(modelName, recordId) {
		this.fireEvent("dashboarditemrecordlinktap", modelName, recordId);
	},

	/**
	 * Sets layout items to dashboard container.
	 * @param {Terrasoft.configuration.DashboardContainer} dashboardContainer Instance of dashboard container.
	 * @param {Terrasoft.BaseModel} sysDashboardRecord Instance of model.
	 * @param {Object[]} viewConfigItems List of view configurations.
	 */
	setDashboardConfig: function(dashboardContainer, sysDashboardRecord, viewConfigItems) {
		var dashboardGenerator = this.getDashboardViewGenerator(sysDashboardRecord.getId());
		dashboardGenerator.setLayoutConfigs(viewConfigItems);
		var layoutItems = dashboardGenerator.generateLayoutItems();
		dashboardContainer.setItems(layoutItems);
		this.requestDashboardItems(sysDashboardRecord, layoutItems);
	},

	/**
	 * Renders dashboard item by data.
	 * @param {Terrasoft.BaseModel} sysDashboardRecord Instance of model.
	 * @param {String} itemName Name of dashboard.
	 * @param {Object} data Data of dashboard item.
	 */
	setDashboardItemData: function(sysDashboardRecord, itemName, data) {
		var dashboardItemConfig;
		var generator = this.getDashboardViewGenerator(sysDashboardRecord.getId());
		if (data) {
			dashboardItemConfig = generator.generateItem(data);
		} else {
			dashboardItemConfig = generator.getDataNotAvailableItem();
		}
		this.renderDashboardItem(sysDashboardRecord, itemName, dashboardItemConfig);
	},

	/**
	 * Returns default configuration of dashboard item.
	 * @deprecated Extends method {@link Terrasoft.DashboardViewGenerator#getDefaultItemConfig} in custom generator.
	 * @param {Object} itemConfig Dashboard item data config.
	 * @returns {Object} Default configuration of dashboard item.
	 */
	getDefaultDashboardItemConfig: function(itemConfig) {
		return {};
	},

	/**
	 * Returns carousel.
	 * @returns {Terrasoft.Carousel} Instance of carousel.
	 */
	getCarousel: function() {
		return this.carousel;
	},

	/**
	 * Returns active dashboard container.
	 * @returns {Terrasoft.configuration.DashboardContainer} Instance of dashboard container.
	 */
	getActiveDashboardContainer: function() {
		if (!this.carousel) {
			return null;
		}
		return this.carousel.getActiveItem();
	},

	/**
	 * Returns active dashboard index.
	 * @returns {Number} Active dashboard index.
	 */
	getActiveDashboardIndex: function() {
		if (!this.carousel) {
			return null;
		}
		return this.carousel.getActiveIndex();
	},

	/**
	 * Sets active dashboard item in carousel.
	 * @param {Object/Number} item Active item or it's index.
	 */
	setActiveDashboard: function(item) {
		if (this.carousel) {
			this.carousel.setActiveItem(item);
		}
	},

	/**
	 * Sets dashboards.
	 * @param {Terrasoft.BaseModel[]} records Instances of model.
	 * @param {String} activeDashbordId Active dashbord's Id.
	 */
	setDashboards: function(records, activeDashbordId) {
		var carouselConfig = this.getCarouselConfig(records, activeDashbordId);
		this.createCarousel(carouselConfig);
	},

	/**
	 * Sets active dashboard item.
	 * @param {Ext.Component} item Instance of dashboard item.
	 */
	setActiveDashboardItem: function(item) {
		if (this.activeDashboardItem) {
			this.activeDashboardItem.setIsActive(false);
		}
		if (item) {
			item.setIsActive(true);
		}
		this.activeDashboardItem = item;
	},

	/**
	 * Returns carousel item by dashboardId.
	 * @returns {Terrasoft.configuration.DashboardContainer} Carousel item.
	 */
	getCarouselItem: function(dashboardId) {
		var items = this.carousel.getItems();
		return items.get(dashboardId);
	},

	/**
	 * @inheritdoc
	 */
	destroy: function() {
		this.setActiveDashboardItem(null);
		this.cancelCarouselItemActivation();
		this.carousel = null;
		this.noDataLabel = null;
		this.dashboardGenerators = null;
		Ext.destroy(this.dashboardPicker);
		this.callParent(arguments);
	}

});


