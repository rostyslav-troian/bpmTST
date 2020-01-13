/**
 * Class for filter edit control.
 */
Ext.define("Terrasoft.controls.FilterEdit", {

	alternateClassName: "Terrasoft.FilterEdit",

	extend: "Terrasoft.Component",

	uses: ["Terrasoft.Collection", "Terrasoft.ListView"],

	translate: Terrasoft.Resources.FilterEdit,

	LogicalOperatorTypeFlipped: Terrasoft.invert(Terrasoft.LogicalOperatorType),

	ComparisonTypeFlipped: Terrasoft.invert(Terrasoft.ComparisonType),

	ComparisonTypeTranslateFlipped: Terrasoft.invert(Terrasoft.Resources.ComparisonType),

	filterManager: null,

	filters: null,

	renderedGroups: null,

	renderedFilters: null,

	selectedFilters: null,

	selectedItems: null,

	openedInput: null,

	openMacrosParameter: null,

	/**
	 * Indicates filters can use process parameters for right expression.
	 * @type {Boolean}
	 */
	useProcessParameters: false,

	/**
	 * Indicates filters can use dcm main record for right expression.
	 * @type {Boolean}
	 */
	useDcmMainRecord: false,

	filterEditConfig: null,

	_scrollPosition: 0,

	/**
	 * Returns default filter config.
	 * @private
	 * @return {Object} Default filter configuration, filterClassName: "Terrasoft.FilterEdit.Filter".
	 */
	_getDefaultConfig: function() {
		return {
			filterClassName: "Terrasoft.FilterEdit.Filter"
		};
	},

	/**
	 * Indicates right expression menu should be aligned to filter element.
	 * @type {Boolean}
	 */
	rightExpressionMenuAligned: false,

	constructor: function() {
		this.callParent(arguments);
		Ext.get(window).on("click", this.onClickOutside, this);
	},

	/**
	 * Returns filter edit config, or default config.
	 * @type {String}
	 */
	getFilterEditConfig: function() {
		return this.filterEditConfig || this._getDefaultConfig();
	},

	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event selectedFiltersChange
			 * Triggers after 'Selecting filter condition' for executing custom action,
			 * such as group/ungroup/move up/move down.
			 * @param {Object|Array} selectedFilters Current filter or filters that selected.
			 */
			"selectedFiltersChange",

			/**
			 * @event prepareMappingParametersList
			 * Triggers after 'Compare with Parameter' action for filter right expression executed.
			 * @param {Object} config Current filter item config.
			 * @param {Terrasoft.data.filters.BaseFilter} config.filter Current filter.
			 * @param {Function} callback Callback function.
			 * @param {Object} callback.sourceValue Process schema parameter source value for filter right expression.
			 * @param {String} callback.sourceValue.value Parameter source value.
			 * @param {String} callback.sourceValue.displayValue Parameter source display value.
			 * expression.
			 */
			"prepareMappingParametersList",

			/**
			 * @event prepareMainRecordModalBox
			 * Triggers after 'Compare with main recor' action for filter right expression executed.
			 * @param {Object} config Current filter item config.
			 * @param {Terrasoft.data.filters.BaseFilter} config.filter Current filter.
			 * @param {Function} callback Callback function.
			 * @param {Object} callback.sourceValue Main record macros source value for filter right expression.
			 * @param {String} callback.sourceValue.value Main record macros source value.
			 * @param {String} callback.sourceValue.displayValue Main record macros display value.
			 * expression.
			 */
			"prepareMainRecordModalBox"
		);
		this.selectors = {
			wrapEl: ""
		};
		this.classes = {
			wrapEl: ["filteredit"]
		};
		this.selectedFilters = {};
		this.selectedItems = {};
		this.renderedGroups = {};
		this.renderedFilters = {};
		this._scrollPosition = 0;
	},

	createEmptyFilterGroup: function() {
		return Ext.create("Terrasoft.FilterGroup");
	},

	onFilterAdd: function(filter) {
		this.update();
		this.processUpdatedFilter(filter);
	},

	onFilterRemove: function(filter, parentFilterGroup, filterKey) {
		var findKey = function(item, key) {
			if (key.indexOf(filterKey) !== -1) {
				this.setSelectedFilters(item);
				return false;
			}
			return true;
		};
		Terrasoft.each(this.selectedFilters, findKey, this);
		this.fireEvent("selectedFiltersChange");
		this.update();
	},

	onFilterChange: function(filter) {
		this.update();
		this.processUpdatedFilter(filter);
	},

	processUpdatedFilter: function(filter) {
		var renderedFilter = this.renderedFilters[filter.key];
		var hasRightExpressionDisplayValue = this.filterManager.getRightExpressionDisplayValue(filter);
		if (renderedFilter && renderedFilter.getIsRightExpressionMenuAllowed() && !hasRightExpressionDisplayValue) {
			renderedFilter.showRightExpressionMenu();
		}
	},

	/**
	 * Returns model binding configuration. Implements mixin interface {@link Terrasoft.Bindable}.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent();
		var filterEditBindConfig = {
			filterManager: {
				changeMethod: "setFilterManager"
			},
			useProcessParameters: {
				changeMethod: "setUseProcessParameters"
			},
			useDcmMainRecord: {
				changeMethod: "_setUseDcmMainRecord"
			},
			rightExpressionMenuAligned: {
				changeMethod: "setRightExpressionMenuAligned"
			},
			selectedItems: {
				changeEvent: "selectedFiltersChange"
			},
			prepareMappingParametersList: {
				changeEvent: "prepareMappingParametersList"
			},
			prepareMainRecordModalBox: {
				changeEvent: "prepareMainRecordModalBox"
			},
			filterEditConfig: {
				changeMethod: "setFilterEditConfig"
			}
		};
		Ext.apply(filterEditBindConfig, bindConfig);
		return filterEditBindConfig;
	},

	initDomEvents: function() {
		this.callParent(arguments);
		this.initGroupsDomEvents();
		this.initFiltersDomEvents();
	},

	onClickOutside: function() {
		this.fireEvent("clickOutside", this);
		this.clearSelected();
	},

	initGroupsDomEvents: function() {
		var groups = this.renderedGroups;
		for (var i in groups) {
			groups[i].initDomEvents();
		}
	},

	initFiltersDomEvents: function() {
		var filters = this.renderedFilters;
		for (var i in filters) {
			filters[i].initDomEvents();
		}
	},

	/**
	 * @private
	 */
	_getFilterEditId: function() {
		return "filteredit-" + this.id + "-wrap";
	},

	generateHtml: function() {
		var id = this._getFilterEditId();
		this.selectors.wrapEl = "#" + id;
		var htmlConfig = {
			tag: "div",
			id: id,
			cls: this.classes.wrapEl.join(" "),
			children: []
		};
		var filters = this.filters || this.createEmptyFilterGroup();
		var options = {
			filterManager: this.filterManager,
			filterEdit: this,
			groupType: filters.logicalOperation,
			groupFilters: filters,
			generateTo: htmlConfig.children
		};
		var group = Ext.create("Terrasoft.FilterEdit.Group", options);
		this.renderedGroups[group.id] = group;
		this.tpl = Ext.DomHelper.markup(htmlConfig);
		return this.callParent(arguments);
	},

	/**
	 * @private
	 */
	_saveScrollPosition: function() {
		var element = this.wrapEl;
		if (!Ext.isEmpty(element)) {
			this._scrollPosition = element.getScrollTop();
		}
	},

	/**
	 * @private
	 */
	_restoreScrollPosition: function() {
		var element = this.wrapEl;
		if (!Ext.isEmpty(element)) {
			element.setScrollTop(this._scrollPosition);
		}
	},

	update: function() {
		if (!this.rendered || !this.visible) {
			return;
		}
		this._saveScrollPosition();
		this.clear();
		this.reRender();
		this._restoreScrollPosition();
	},

	setSelectedFilters: function(filters) {
		if (Ext.isArray(filters)) {
			for (var i in filters) {
				this.selectFilter(filters[i], true);
			}
			return;
		}
		this.selectFilter(filters, false);
	},

	selectFilter: function(filter, multiSelect) {
		for (var key in this.selectedFilters) {
			var selectedFilter = this.selectedFilters[key];
			var currentGroup = (selectedFilter.instance.parentCollection) ?
				selectedFilter.instance.parentCollection.key : "";
			var filterGroup = (filter.instance.parentCollection) ? filter.instance.parentCollection.key : "";
			if (currentGroup !== filterGroup) {
				for (var i in this.selectedFilters) {
					this.selectedFilters[i].showSelected(false);
				}
				this.selectedFilters = {};
				this.selectedItems = {};
			}
			break;
		}
		if (this.selectedFilters.hasOwnProperty(filter.id)) {
			filter.showSelected(false);
			delete this.selectedFilters[filter.id];
			delete this.selectedItems[filter.id];
			return;
		}
		if (!multiSelect) {
			this.clearSelected();
		}
		filter.showSelected(true);
		this.selectedFilters[filter.id] = filter;
		this.selectedItems[filter.id] = filter.instance;
	},

	clearSelected: function() {
		for (var i in this.selectedFilters) {
			this.selectedFilters[i].showSelected(false);
			delete this.selectedFilters[i];
			delete this.selectedItems[i];
		}
	},

	clear: function() {
		if (this.openedInput) {
			this.openedInput.close();
			this.openedInput = null;
		}
		var filters = this.renderedFilters;
		for (var i in filters) {
			filters[i].destroy();
			delete filters[i];
		}
		var groups = this.renderedGroups;
		for (var j in groups) {
			groups[j].destroy();
			delete groups[j];
		}
	},

	setFilterManager: function(filterManager) {
		if (this.filterManager === filterManager) {
			return;
		}
		this.unSubscribeForFilterManagerEvents();
		this.filterManager = filterManager;
		this.subscribeForFilterManagerEvents();
		var filters = (filterManager) ? filterManager.filters : null;
		this.updateFilters(filters);
	},

	/**
	 * Sets #useProcessParameters property value.
	 * @private
	 * @param {Boolean} useProcessParameters If true, filters can use process parameters in their right expressions.
	 */
	setUseProcessParameters: function(useProcessParameters) {
		this.useProcessParameters = useProcessParameters;
	},

	/**
	 * Sets #useProcessParameters property value.
	 * @private
	 * @param {Boolean} useDcmMainRecord If true, filters can use process parameters in their right expressions.
	 */
	_setUseDcmMainRecord: function(useDcmMainRecord) {
		this.useDcmMainRecord = useDcmMainRecord;
	},

	/**
	 * Sets #rightExpressionMenuAligned property value.
	 * @private
	 * @param {Boolean} isAligned If true, right expression menu will be aligned to filter elelement.
	 */
	setRightExpressionMenuAligned: function(isAligned) {
		this.rightExpressionMenuAligned = isAligned;
	},

	/**
	 * Sets #filterEditConfig property value.
	 * @param {Object} value New value for filterEditConfig.
	 */
	setFilterEditConfig: function(value) {
		this.filterEditConfig = value;
	},

	updateFilters: function(filters) {
		this.filters = filters;
		this.update();
	},

	subscribeForFilterManagerEvents: function() {
		var filterManager = this.filterManager;
		if (!filterManager) {
			return;
		}
		filterManager.on("addFilter", this.onFilterAdd, this);
		filterManager.on("removeFilter", this.onFilterRemove, this);
		filterManager.on("changeFilter", this.onFilterChange, this);
		filterManager.on("rootFiltersChanged", this.updateFilters, this);
	},

	unSubscribeForFilterManagerEvents: function() {
		var filterManager = this.filterManager;
		if (!filterManager) {
			return;
		}
		filterManager.un("addFilter", this.onFilterAdd, this);
		filterManager.un("removeFilter", this.onFilterRemove, this);
		filterManager.un("changeFilter", this.onFilterChange, this);
		filterManager.un("rootFiltersChanged", this.updateFilters, this);
	},

	onDestroy: function() {
		this.clear();
		this.unSubscribeForFilterManagerEvents();
		Ext.get(window).un("click", this.onClickOutside, this);
		this.callParent(arguments);
	}

});
