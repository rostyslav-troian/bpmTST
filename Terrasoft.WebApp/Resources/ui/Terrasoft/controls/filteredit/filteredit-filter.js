/**
 * Class for item of filter edit control.
 */
Ext.define("Terrasoft.controls.FilterEdit.Filter", {
	extend: "Terrasoft.FilterEdit.Item",
	alternateClassName: "Terrasoft.FilterEdit.Filter",

	comparisonTranslate: Terrasoft.Resources.ComparisonType,

	aggregationTranslate: Terrasoft.Resources.AggregationOperation,

	generateTo: null,

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#idPrefix
	 * @override
	 */
	idPrefix: {
		rule: "-filteredit-rule-",
		macros: "-macros-",
		macrosParameter: "-macros-parameter-",
		cancelMacros: "cancel-macros"
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#cssClass
	 * @override
	 */
	cssClass: {
		rule: "filteredit-rule",
		aggregativeRule: "filteredit-aggregative-rule",
		del: "filteredit-rule-delete",
		welcomeInput: "filteredit-rule-right-welcomeinput",
		enableWrapper: "t-checkboxedit-wrap",
		enable: "t-checkboxedit",
		checked: "t-checkboxedit-checked",
		disable: "filteredit-disabled",
		left: "filteredit-rule-left",
		leftDisabled: "filteredit-rule-left-disabled",
		aggregation: "filteredit-rule-aggregation",
		comparison: "filteredit-rule-comparison",
		comparisonDisabled: "filteredit-rule-comparison-disabled",
		rightWrapper: "filteredit-rule-right-wrapper",
		right: "filteredit-rule-right",
		rightDisabled: "filteredit-rule-right-disabled",
		macros: "filteredit-rule-macros",
		macrosParameter: "filteredit-rule-macros-parameter",
		macrosSelection: "filteredit-rule-macros-selection",
		selected: "filteredit-selected"
	},

	leftEl: null,

	aggregationEl: null,

	comparisonEl: null,

	rightEl: null,

	rightWrapperEl: null,

	allowedMacrosTypes: null,

	macrosEl: null,

	macrosParameterEl: null,

	macrosSelectionEl: null,

	macrosParameterPlaceholder: "<?>",

	aggregationList: null,

	/**
	 * Menu for right expression.
	 * @private
	 * @type {Terrasoft.Menu}
	 */
	rightExpressionMenu: null,

	macrosParameterList: null,

	comparisonList: null,

	muteRightExpressionEvent: false,

	muteMacrosEvent: false,

	muteMacrosParameterEvent: false,

	beforeOpenInput: null,

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.id = this.filterEdit.id + this.idPrefix.rule + this.instance.key;
		this.generateHtmlConfig();
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#init
	 * @protected
	 * @override
	 */
	init: function(config) {
		this.instance = config.filter;
		this.enabled = config.filter.isEnabled;
		this.generateTo = config.generateTo;
		this._setFilterDefaultComparisonType();
		this.allowedMacrosTypes = this.filterManager.provider.getAllowedMacrosTypes(this.instance);
	},

	/**
	 * Returns query macros type if it is used in the right side of the filter.
	 * @private
	 * @return {Terrasoft.QueryMacrosType} Macros type used in the right expression of the filter. Otherwise undefined.
	 */
	_getMacrosType: function() {
		var filter = this.instance;
		var rightExpression = filter && filter.rightExpression;
		var macrosType = rightExpression && rightExpression.macrosType;
		return macrosType;
	},

	/**
	 * Returns comparison type configuration object for the given query macros type.
	 * @private
	 * @param {Terrasoft.QueryMacrosType} macrosType Query macros type.
	 * @return {Object} An object containing configuration settings for the comparison type for the given macros type.
	 */
	_getComparisonTypeSettings: function(queryMacrosType) {
		var comparisonTypeSettings = {};
		if (queryMacrosType) {
			var filterMacrosTypeConfig = this._getMacrosConfig(queryMacrosType);
			if (filterMacrosTypeConfig && filterMacrosTypeConfig.comparisonType) {
				comparisonTypeSettings = filterMacrosTypeConfig.comparisonType;
			}
		}
		return comparisonTypeSettings;
	},

	/**
	 * Sets filter comparison type to the configured default value.
	 * @private
	 */
	_setFilterDefaultComparisonType: function() {
		var filter = this.instance;
		var macrosType = this._getMacrosType();
		if (macrosType) {
			var comparisonMacrosSettings = this._getComparisonTypeSettings(macrosType);
			var defaultComparisonType = comparisonMacrosSettings && comparisonMacrosSettings.defaultValue;
			if (defaultComparisonType) {
				filter.comparisonType = defaultComparisonType;
			}
		}
	},

	/**
	 * Determines whether to enable comparison types.
	 * @private
	 * @return {Boolean} True if comparison types should be enabled; otherwise, false.
	 */
	_isEnableComparisonType: function() {
		var macrosType = this._getMacrosType();
		if (macrosType) {
			var comparisonTypeSettings = this._getComparisonTypeSettings(macrosType);
			var isEnabledComparisonType = comparisonTypeSettings && comparisonTypeSettings.isEnabled;
			return isEnabledComparisonType;
		}
	},

	/**
	 * Returns a configuration object for the filter macros type associated wit the given query macros type.
	 * @private
	 * @param {Terrasoft.QueryMacrosType} queryMacrosType Type of the query macros.
	 * @return {Object} Filter macros type settings object.
	 */
	_getMacrosConfig: function(queryMacrosType) {
		var filterMacrosTypeConfig = {};
		var filterMacrosType = Terrasoft.GetQueryMacrosTypeFilterMacrosType(queryMacrosType);
		if (filterMacrosType) {
			filterMacrosTypeConfig = Terrasoft.getMacrosTypeConfig(filterMacrosType) || filterMacrosTypeConfig;
		}
		return filterMacrosTypeConfig;
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#getAllowedManageOperations
	 * @protected
	 * @override
	 */
	getAllowedManageOperations: function() {
		var filterManager = this.filterManager;
		if (!filterManager) {
			return {
				canViewEnabled: true,
				canEditEnabled: true,
				canEditLeftExpression: true,
				canEditRightExpression: true,
				canEditComparisonType: true,
				canRemove: true,
				canSelect: true
			};
		}
		var filterManageOperations = filterManager.getAllowedFilterManageOperations(this.instance);
		var isEnableComparisonType = this._isEnableComparisonType();
		if (isEnableComparisonType !== undefined) {
			filterManageOperations.canEditComparisonType = isEnableComparisonType;
		}
		return filterManageOperations;
	},

	/**
	 * Generates left expression html configuration.
	 * @private
	 * @param {Object[]} filterViewItems Filter view configs.
	 */
	generateLeftExpressionConfig: function(filterViewItems) {
		var filter = this.instance;
		var leftExpression = Terrasoft.encodeHtml(filter.leftExpressionCaption);
		var allowedManageOperations = this.allowedManageOperations;
		var leftCls = [this.cssClass.left];
		if (!allowedManageOperations.canEditLeftExpression) {
			leftCls.push(this.cssClass.leftDisabled);
		}
		var htmlConfig = {
			tag: "span",
			cls: leftCls.join(" "),
			html: leftExpression,
			"data-item-marker": leftExpression
		};
		filterViewItems.push(htmlConfig);
	},

	/**
	 * Generates comparison html configuration.
	 * @private
	 * @param {Object[]} filterViewItems Filter view configs.
	 */
	generateComparisonConfig: function(filterViewItems) {
		var filter = this.instance;
		var comparisonType = this.filterEdit.ComparisonTypeFlipped[filter.comparisonType];
		var comparisonName = Terrasoft.Resources.ComparisonType[comparisonType];
		var canEditComparisonType = this.allowedManageOperations.canEditComparisonType;
		var comparisonCls = [this.cssClass.comparison];
		if (!canEditComparisonType) {
			comparisonCls.push(this.cssClass.comparisonDisabled);
		}
		var htmlConfig = {
			tag: "span",
			cls: comparisonCls.join(" "),
			html: comparisonName,
			"data-item-marker": comparisonName,
			children: []
		};
		var span = {tag: "span"};
		if (filter.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			span.cls = "unselectable";
		}
		htmlConfig.children.push(span);
		filterViewItems.push(htmlConfig);
	},

	/**
	 * Generates right expression html configuration.
	 * @private
	 * @param {Object[]} filterViewItems Filter view configs.
	 */
	generateRightExpressionConfig: function(filterViewItems) {
		var filter = this.instance;
		var rightExpression = this.filterEdit.filterManager.getRightExpressionDisplayValue(filter);
		var encodedRightExpression = Terrasoft.encodeHtml(rightExpression);
		var rightCls = [this.cssClass.right];
		if (!this.allowedManageOperations.canEditRightExpression) {
			rightCls.push(this.cssClass.rightDisabled);
		}
		if (!rightExpression) {
			rightCls.push(this.cssClass.welcomeInput);
		}
		var rightExpressionViewItems = [{
			tag: "span",
			cls: rightCls.join(" "),
			html: rightExpression ? encodedRightExpression : this.translate.WELCOME_INPUT,
			"data-item-marker": encodedRightExpression
		}];
		if (this.getIsRightExpressionMenuAllowed()) {
			var macrosCaption = this.filterManager.provider.getRightExpressionMacrosDisplayValues(filter);
			if (macrosCaption.hasOwnProperty("macrosCaption")) {
				rightExpressionViewItems = this.generateRightExpressionMacrosHtmlConfig(macrosCaption);
			}
		}
		var htmlConfig = {
			tag: "span",
			cls: this.cssClass.rightWrapper,
			children: rightExpressionViewItems
		};
		filterViewItems.push(htmlConfig);
	},

	/**
	 * Generates html config for filter rightExpression macros.
	 * @private
	 * @param {Object} macrosInfo Macros information.
	 * @return {Object[]} Array with macros html config.
	 */
	generateRightExpressionMacrosHtmlConfig: function(macrosInfo) {
		var viewItems = [];
		viewItems.push({
			tag: "a",
			href: "#",
			cls: this.cssClass.macros,
			html: Terrasoft.encodeHtml(macrosInfo.macrosCaption),
			"data-item-marker": Terrasoft.encodeHtml(macrosInfo.macrosCaption)
		});
		if (macrosInfo.hasOwnProperty("macrosParameterCaption")) {
			var macrosParameterCaption = macrosInfo.macrosParameterCaption;
			var macrosParameter = Ext.isEmpty(macrosParameterCaption)
				? this.macrosParameterPlaceholder
				: macrosParameterCaption;
			var encodeHtmlParameter = Terrasoft.encodeHtml(macrosParameter);
			if (Ext.isNumber(encodeHtmlParameter)) {
				encodeHtmlParameter = encodeHtmlParameter.toString();
			}
			viewItems.push({
				tag: "a",
				href: "#",
				cls: this.cssClass.macrosParameter,
				html: encodeHtmlParameter
			});
		}
		return viewItems;
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#getCheckboxItemMarker
	 * @override
	 */
	getCheckboxItemMarker: function() {
		var filter = this.instance;
		var marker = Terrasoft.encodeHtml(filter.leftExpressionCaption);
		return marker;
	},

	/**
	 * Generates html configuration.
	 */
	generateHtmlConfig: function() {
		var filter = this.instance;
		var isAggregateFilter = filter.isAggregative;
		var cssClass = this.cssClass;
		var allowedManageOperations = this.allowedManageOperations;
		var filterViewItems = [];
		if (allowedManageOperations.canViewEnabled) {
			this.generateCheckboxConfig(filterViewItems);
		}
		if (isAggregateFilter) {
			this.generateAggregateFilterHtmlConfig(filterViewItems);
		} else {
			this.generateSimpleFilterHtmlConfig(filterViewItems);
		}
		var htmlConfig = {
			tag: "div",
			id: this.id,
			cls: (isAggregateFilter) ? cssClass.aggregativeRule : cssClass.rule,
			children: filterViewItems
		};
		if (this.filterEdit.selectedFilters.hasOwnProperty(this.id)) {
			htmlConfig.cls += " " + this.cssClass.selected;
		}
		if (!this.enabled) {
			htmlConfig.cls += " " + this.cssClass.disable;
		}
		this.generateTo.push(htmlConfig);
	},

	/**
	 * Generates html config for simple filter.
	 * @private
	 * @param {Object[]} filterViewItems Array with filter items html configs.
	 */
	generateSimpleFilterHtmlConfig: function(filterViewItems) {
		var filter = this.instance;
		var isIsNullFilter = filter.filterType === Terrasoft.FilterType.IS_NULL;
		var isExistsFilter = filter.filterType === Terrasoft.FilterType.EXISTS;
		var allowedManageOperations = this.allowedManageOperations;
		this.generateLeftExpressionConfig(filterViewItems);
		this.generateComparisonConfig(filterViewItems);
		if (!isIsNullFilter && !isExistsFilter) {
			this.generateRightExpressionConfig(filterViewItems);
		}
		if (allowedManageOperations.canRemove) {
			this.generateDeleteConfig(filterViewItems);
		}
	},

	/**
	 * Generate html config for aggregate filter.
	 * @private
	 * @param {Object[]} filterViewItems Array with filter items html configs.
	 */
	generateAggregateFilterHtmlConfig: function(filterViewItems) {
		var filter = this.instance;
		var cssClass = this.cssClass;
		this.generateLeftExpressionConfig(filterViewItems);
		var aggregationCaption = this.filterManager.getAggregationOperation(filter);
		var aggregateCls = [cssClass.aggregation];
		if (!this.allowedManageOperations.canEditComparisonType) {
			aggregateCls.push(cssClass.comparisonDisabled);
		}
		filterViewItems.push({
			tag: "a",
			href: "#",
			cls: aggregateCls.join(" "),
			children: [{
				tag: "span"
			}],
			html: aggregationCaption,
			"data-item-marker": aggregationCaption
		});
		if (filter.filterType !== Terrasoft.FilterType.IS_NULL && filter.filterType !== Terrasoft.FilterType.EXISTS) {
			this.generateComparisonConfig(filterViewItems);
			this.generateRightExpressionConfig(filterViewItems);
		}
		if (this.allowedManageOperations.canRemove) {
			this.generateDeleteConfig(filterViewItems);
		}
		var subFilters = this.getAggregateFilterSubFilters();
		var options = {
			filterEdit: this.filterEdit,
			filterManager: this.filterManager,
			groupType: subFilters.logicalOperation,
			groupFilters: subFilters,
			groupAggregative: true,
			deletable: false,
			generateTo: filterViewItems
		};
		var group = Ext.create("Terrasoft.FilterEdit.Group", options);
		this.filterEdit.renderedGroups[group.id] = group;
	},

	/**
	 * Returns aggregate filter subFilters.
	 * @private
	 * @return {Terrasoft.FilterGroup}
	 */
	getAggregateFilterSubFilters: function() {
		var filter = this.instance;
		var isExistsFilter = filter.filterType === Terrasoft.FilterType.EXISTS;
		if (isExistsFilter && filter.subFilters) {
			return filter.subFilters;
		} else if (filter.leftExpression.subFilters) {
			return filter.leftExpression.subFilters;
		} else {
			return this.filterEdit.createEmptyFilterGroup();
		}
	},

	/**
	 * Returns element for filter left expression item.
	 * @return {Ext.Element|null}
	 */
	getLeftEl: function() {
		if (!this.leftEl) {
			var wrapEl = this.getWrapEl();
			this.leftEl = wrapEl.child("." + this.cssClass.left);
		}
		return this.leftEl;
	},

	/**
	 * Returns element for filter aggregation item.
	 * @return {Ext.Element|null}
	 */
	getAggregationEl: function() {
		if (!this.aggregationEl) {
			var wrapEl = this.getWrapEl();
			this.aggregationEl = wrapEl.child("." + this.cssClass.aggregation);
		}
		return this.aggregationEl;
	},

	/**
	 * Returns element for filter comparison item.
	 * @return {Ext.Element|null}
	 */
	getComparisonEl: function() {
		if (!this.comparisonEl) {
			var wrapEl = this.getWrapEl();
			this.comparisonEl = wrapEl.child("." + this.cssClass.comparison);
		}
		return this.comparisonEl;
	},

	/**
	 * Returns element for filter right expression item.
	 * @return {Ext.Element|null}
	 */
	getRightEl: function() {
		if (!this.rightEl) {
			var wrapEl = this.getWrapEl();
			this.rightEl = wrapEl.child("." + this.cssClass.rightWrapper + " > ." + this.cssClass.right);
		}
		return this.rightEl;
	},

	/**
	 * Returns element for filter macros item.
	 * @return {Ext.Element|null}
	 */
	getMacrosEl: function() {
		if (!this.macrosEl) {
			var wrapEl = this.getWrapEl();
			this.macrosEl = wrapEl.child("." + this.cssClass.rightWrapper + " > ." + this.cssClass.macros);
		}
		return this.macrosEl;
	},

	/**
	 * Returns element for filter macros parameter item.
	 * @return {Ext.Element|null}
	 */
	getMacrosParameterEl: function() {
		if (!this.macrosParameterEl) {
			var wrapEl = this.getWrapEl();
			this.macrosParameterEl = wrapEl.child("." + this.cssClass.rightWrapper + " > ." +
				this.cssClass.macrosParameter);
		}
		return this.macrosParameterEl;
	},

	/**
	 * Returns remove filter element.
	 * @return {Ext.Element|null}
	 */
	getDeleteEl: function() {
		if (!this.deleteEl) {
			var wrapEl = this.getWrapEl();
			this.deleteEl = wrapEl.child("." + this.cssClass.del);
		}
		return this.deleteEl;
	},

	/**
	 * Initializes events for current control.
	 */
	initDomEvents: function() {
		this.initSelectDomEvent();
		this.initEditLeftExpressionDomEvent();
		this.initEditComparisonTypeDomEvent();
		this.initEditRightExpressionDomEvent();
		this.initEditEnabledDomEvent();
		this.initRemoveFilterDomEvent();
		if (this.id === this.filterEdit.openMacrosParameter) {
			this.openMacrosParameter();
		}
	},

	/**
	 * Initializes DOM-events for filter selection.
	 * @private
	 */
	initSelectDomEvent: function() {
		if (this.allowedManageOperations.canSelect) {
			var wrapEl = this.getWrapEl();
			wrapEl.on("click", this.onWrapElClick, this);
		}
	},

	/**
	 * Initializes DOM-events for filter left expression editing.
	 * @private
	 */
	initEditLeftExpressionDomEvent: function() {
		if (this.allowedManageOperations.canEditLeftExpression) {
			var leftEl = this.getLeftEl();
			leftEl.on("click", this.onLeftElClick, this);
			var aggregationEl = this.getAggregationEl();
			if (aggregationEl) {
				aggregationEl.on("click", this.onAggregationElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-events for editing filter comparison type.
	 * @private
	 */
	initEditComparisonTypeDomEvent: function() {
		if (this.allowedManageOperations.canEditComparisonType) {
			var comparisonEl = this.getComparisonEl();
			if (comparisonEl) {
				comparisonEl.on("click", this.onComparisonElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-events for filter right expression editing.
	 * @private
	 */
	initEditRightExpressionDomEvent: function() {
		if (this.allowedManageOperations.canEditRightExpression) {
			var rightEl = this.getRightEl();
			if (rightEl) {
				rightEl.on("click", this.onRightElClick, this);
			}
			var macrosEl = this.getMacrosEl();
			if (macrosEl) {
				macrosEl.on("click", this.onMacrosElClick, this);
			}
			var macrosParameterEl = this.getMacrosParameterEl();
			if (macrosParameterEl) {
				macrosParameterEl.on("click", this.onMacrosParameterElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-events for filter enabling.
	 * @private
	 */
	initEditEnabledDomEvent: function() {
		if (this.allowedManageOperations.canEditEnabled) {
			var enableWrapEl = this.getEnableWrapEl();
			if (enableWrapEl) {
				enableWrapEl.on("click", this.onEnableElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-events for filter removing.
	 * @private
	 */
	initRemoveFilterDomEvent: function() {
		if (this.allowedManageOperations.canRemove) {
			var deleteEl = this.getDeleteEl();
			deleteEl.on("click", this.onDeleteElClick, this);
		}
	},

	/**
	 * Sets filter to selected filters and closing opened input.
	 * @param event Event object.
	 */
	onWrapElClick: function(event) {
		event.stopEvent();
		var selectedFilters = event.ctrlKey ? [this] : this;
		this.filterEdit.setSelectedFilters(selectedFilters);
		this.filterEdit.fireEvent("selectedFiltersChange", this, this.filterEdit.selectedFilters);
		this.closeOpenedInput();
	},

	onLeftElClick: function(event) {
		event.stopEvent();
		this.filterManager.addFilter(this.instance.parentCollection, this.instance);
	},

	onAggregationElClick: function(event) {
		event.stopEvent();
		this.showAggregationList();
		this.closeOpenedInput();
	},

	onComparisonElClick: function(event) {
		event.stopEvent();
		if (this.instance.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			return;
		}
		this.showComparisonList();
		this.closeOpenedInput();
	},

	onRightElClick: function(event) {
		event.stopEvent();
		if (this.muteRightExpressionEvent) {
			return;
		}
		this.closeOpenedInput();
		if (this.getIsRightExpressionMenuAllowed()) {
			this.muteRightExpressionEvent = true;
			this.showRightExpressionMenu();
			return;
		}
		if (this.instance.dataValueType === Terrasoft.DataValueType.LOOKUP) {
			this.filterManager.getLookupFilterValue(this.instance);
		} else if (this.instance.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			this.filterManager.toggleFilterBooleanValue(this.instance);
		} else {
			this.muteRightExpressionEvent = true;
			this.filterEdit.openedInput = Ext.create("Terrasoft.FilterEdit.Filter.Input", {
				filter: this,
				value: this.filterManager.getRightExpressionValue(this.instance)
			});
		}
	},

	onMacrosElClick: function(event) {
		event.stopEvent();
		if (this.muteMacrosEvent) {
			return;
		}
		this.closeOpenedInput();
		this.showRightExpressionMenu();
	},

	onMacrosParameterElClick: function(event) {
		if (event) {
			event.stopEvent();
		}
		if (this.muteMacrosParameterEvent) {
			return;
		}
		this.closeOpenedInput();
		this.openMacrosParameter();
	},

	onDeleteElClick: function(event) {
		event.stopEvent();
		this.filterEdit.clearSelected();
		this.filterManager.deleteItem(this.instance);
	},

	onAggregationSelect: function(aggregation) {
		this.filterManager.setAggregationOperation(this.instance, aggregation);
	},

	onMacrosSelect: function(menu, menuItem) {
		var filter = this.instance;
		var filterManager = this.filterManager;
		var filterEdit = this.filterEdit;
		var macrosId = menuItem.id.replace(this.id + this.idPrefix.macros, "");
		if (macrosId !== this.idPrefix.cancelMacros) {
			filterEdit.openMacrosParameter = this.id;
			filterManager.provider.setRightExpressionValue(filter, null, parseInt(macrosId, 10));
			return;
		}
		if (this.muteMacrosEvent) {
			return;
		}
		var lookupMacrosTypes = [Terrasoft.QueryMacrosType.CURRENT_USER,
			Terrasoft.QueryMacrosType.CURRENT_USER_CONTACT];
		if ((filter.dataValueType === Terrasoft.DataValueType.LOOKUP) || (filter.rightExpression &&
				Terrasoft.contains(lookupMacrosTypes, filter.rightExpression.macrosType))) {
			filterManager.getLookupFilterValue(filter);
		} else if (filter.dataValueType === Terrasoft.DataValueType.BOOLEAN) {
			filterManager.toggleFilterBooleanValue(filter);
		} else {
			this.closeOpenedInput();
			this.macrosParameterDisplay(false);
			this.muteRightExpressionEvent = true;
			this.muteMacrosEvent = true;
			var filterInputValue = this.filterManager.getRightExpressionValue(this.instance);
			if (Ext.isObject(filterInputValue)) {
				filterInputValue = null;
			}
			filterEdit.openedInput = Ext.create("Terrasoft.FilterEdit.Filter.Input", {
				renderTo: this.getMacrosEl(),
				filter: this,
				value: filterInputValue
			});
		}
	},

	onMacrosParameterSelect: function(menu, menuItem) {
		var macrosConfig = this.filterManager.provider.getFilterMacrosConfig(this.instance);
		var macrosParameter = menuItem.id.replace(this.id + this.idPrefix.macrosParameter, "");
		var splitedMacrosParameter = macrosParameter.split("-", 2);
		var macrosId;
		var macrosParameterId;
		if (macrosConfig) {
			macrosId = macrosConfig.filterMacrosType;
			macrosParameterId = macrosParameter;
		}
		if (splitedMacrosParameter.length > 1) {
			macrosId = splitedMacrosParameter[0];
			macrosParameterId = splitedMacrosParameter[1];
		}
		this.filterManager.provider.setRightExpressionValue(
			this.instance,
			parseInt(macrosParameterId, 10),
			parseInt(macrosId, 10));
	},

	onComparisonSelect: function(comparison) {
		var comparisonTypeConstant = this.filterEdit.ComparisonTypeTranslateFlipped[comparison];
		var comparisonValue = Terrasoft.ComparisonType[comparisonTypeConstant];
		this.filterManager.setComparisonType(this.instance, comparisonValue);
	},

	openMacrosParameter: function() {
		this.filterEdit.openMacrosParameter = null;
		var macrosConfig = this.filterManager.provider.getFilterMacrosConfig(this.instance);
		if (Ext.isEmpty(macrosConfig) || !macrosConfig.hasOwnProperty("value")) {
			return;
		}
		if (macrosConfig.value.hasOwnProperty("displayValueRange")) {
			this.showMacrosParameterList();
			return;
		}
		this.muteMacrosParameterEvent = true;
		this.filterEdit.openedInput = Ext.create("Terrasoft.FilterEdit.Filter.Input", {
			renderTo: this.getMacrosParameterEl(),
			dataValueType: macrosConfig.value.dataValueType,
			filter: this,
			value: this.filterManager.getRightExpressionValue(this.instance),
			setValue: this.setMacrosParameterValue
		});
	},

	closeOpenedInput: function() {
		if (this.filterEdit.openedInput) {
			this.filterEdit.openedInput.close();
			this.filterEdit.openedInput = null;
		}
	},

	showSelected: function(status) {
		var wrapEl = this.getWrapEl();
		if (status) {
			wrapEl.addCls(this.cssClass.selected);
		} else {
			wrapEl.removeCls(this.cssClass.selected);
		}
	},

	showAggregationList: function() {
		if (!this.aggregationList) {
			this.createAggregationList();
		}
		var aggregationsEl = this.getAggregationEl();
		var aggregationElBox = aggregationsEl.getBox();
		this.aggregationList.show(aggregationElBox);
	},

	showComparisonList: function() {
		if (!this.comparisonList) {
			this.createComparisonList();
		}
		var comparisonEl = this.getComparisonEl();
		var comparisonElBox = comparisonEl.getBox();
		this.comparisonList.show(comparisonElBox);
	},

	applyMenuItems: Terrasoft.emptyFn,

	/**
	 * Shows menu for choosing filter right expression.
	 */
	////TODO CRM-34044 Refactoring and create FilterRightExpressionMenuBuilder
	showRightExpressionMenu: function() {
		if (!this.rightExpressionMenu) {
			var menuItems = this.getMacrosMenuItems();
			this.applyMenuItems(menuItems);
			this.rightExpressionMenu = Ext.create("Terrasoft.Menu", {items: menuItems});
			this.rightExpressionMenu.on("hide", function() {
				this.muteRightExpressionEvent = false;
			}, this);
		}
		var rightExpressionEl = this.getRightEl();
		var macrosEl = this.getMacrosEl();
		var menuRelativeEl = (macrosEl) ? macrosEl : rightExpressionEl;
		if (menuRelativeEl) {
			var menuRelativeElBox = menuRelativeEl.getBox();
			var parentEl = this.filterEdit.rightExpressionMenuAligned ? this.getWrapEl() : null;
			this.rightExpressionMenu.show(menuRelativeElBox, false, parentEl);
		}
	},

	/**
	 * Handles callback after process parameter selected for right expression.
	 * @private
	 * @param {Terrasoft.data.filters.BaseFilter} filter Current filter.
	 * @param {Object} sourceValue Process schema parameter source value for filter right expression.
	 * @param {String} sourceValue.value Parameter source value.
	 * @param {String} sourceValue.displayValue Parameter source display value.
	 */
	onProcessParameterSelected: function(filter, sourceValue) {
		if (filter.filterType === Terrasoft.FilterType.IN) {
			sourceValue.Id = sourceValue.id || Terrasoft.generateGUID();
			this.filterManager.setRightExpressionsValues(filter, [sourceValue], Terrasoft.DataValueType.MAPPING);
			return;
		}
		this.filterManager.setRightExpressionValue(filter, sourceValue, null, Terrasoft.DataValueType.MAPPING);
	},

	/**
	 * Handles callback after main record column selected for right expression.
	 * @private
	 * @param {Terrasoft.data.filters.BaseFilter} filter Current filter.
	 * @param {Object} sourceValue Process schema parameter source value for filter right expression.
	 * @param {String} sourceValue.value Parameter source value.
	 * @param {String} sourceValue.displayValue Parameter source display value.
	 */
	_onMainRecordColumnSelected: function(filter, sourceValue) {
		if (filter.filterType === Terrasoft.FilterType.IN) {
			sourceValue.Id = sourceValue.id || Terrasoft.generateGUID();
			this.filterManager.setRightExpressionsValues(filter, [sourceValue], Terrasoft.DataValueType.LOOKUP);
		} else {
			this.filterManager.setRightExpressionValue(filter, sourceValue, null, Terrasoft.DataValueType.LOOKUP);
		}
	},

	showMacrosParameterList: function() {
		if (!this.macrosParameterList) {
			this.createMacrosParameterList();
		}
		var macrosParameterEl = this.getMacrosParameterEl();
		var macrosParameterElBox = macrosParameterEl.getBox();
		this.macrosParameterList.show(macrosParameterElBox);
	},

	createAggregationList: function() {
		var aggregationTypesArray = this.filterManager.getAllowedAggregationOperations(this.instance);
		var result = [];
		var self = this;
		var handler = function(menu, menuItem) {
			self.onAggregationSelect(menuItem.caption);
		};
		for (var i = 0, c = aggregationTypesArray.length; i < c; i += 1) {
			result.push({
				caption: aggregationTypesArray[i],
				handler: handler
			});
		}
		this.aggregationList = Ext.create("Terrasoft.Menu", {
			items: result
		});
		return this.aggregationList;
	},

	createComparisonList: function() {
		var comparisonTypesArray = this.filterManager.getAllowedComparisonTypes(this.instance);
		var result = [];
		var self = this;
		var handler = function(menu, menuItem) {
			self.onComparisonSelect(menuItem.caption);
		};
		for (var i = 0, c = comparisonTypesArray.length; i < c; i += 1) {
			var comparisonConstant = this.filterEdit.ComparisonTypeFlipped[comparisonTypesArray[i]];
			result.push({
				caption: this.comparisonTranslate[comparisonConstant],
				handler: handler
			});
		}
		this.comparisonList = Ext.create("Terrasoft.Menu", {
			items: result
		});
		return this.comparisonList;
	},

	/**
	 * Returns macro menu items for current filter right expression.
	 * @private
	 * @return {Object[]} Menu item configs.
	 */
	getMacrosMenuItems: function() {
		var allowedMacrosTypes = this.allowedMacrosTypes;
		if (!allowedMacrosTypes) {
			allowedMacrosTypes = [];
		}
		var menuGroups = {};
		var menuItems = [];
		var itemsWithoutGroup = [];
		var parametrisedMacrosSeparatorPlaced = false;
		var self = this;
		var macrosHandler = function(menu, menuItem) {
			self.onMacrosSelect(menu, menuItem);
		};
		var macrosParameterHandler = function(menu, menuItem) {
			self.onMacrosParameterSelect(menu, menuItem);
		};
		var cancelMacrosCaption = this.getCancelMacrosCaption();
		menuItems = menuItems.concat({
			id: this.id + this.idPrefix.macros + this.idPrefix.cancelMacros,
			caption: cancelMacrosCaption,
			handler: macrosHandler
		}, {className: "Terrasoft.MenuSeparator"});
		Terrasoft.each(allowedMacrosTypes, function(macrosType) {
			var macrosConfig = this.filterManager.provider.getMacrosTypeConfig(macrosType);
			var macrosElId = this.id + this.idPrefix.macros + macrosType;
			var macrosCaption = macrosConfig.caption;
			var macrosParameterValues = [];
			if (!macrosConfig.hasOwnProperty("groupCaption")) {
				itemsWithoutGroup.push({
					id: macrosElId,
					caption: macrosCaption,
					handler: macrosHandler
				});
				return;
			}
			if (!menuGroups.hasOwnProperty(macrosConfig.groupCaption)) {
				parametrisedMacrosSeparatorPlaced = false;
				var GroupItemObject = {
					caption: macrosConfig.groupCaption,
					menu: {
						items: []
					}
				};
				menuItems.push(GroupItemObject);
				menuGroups[macrosConfig.groupCaption] = GroupItemObject.menu.items;
			}
			if (macrosConfig.hasOwnProperty("value")) {
				macrosCaption = macrosConfig.caption + " " + this.macrosParameterPlaceholder;
				if (!parametrisedMacrosSeparatorPlaced) {
					menuGroups[macrosConfig.groupCaption].push({
						className: "Terrasoft.MenuSeparator"
					});
					parametrisedMacrosSeparatorPlaced = true;
				}
				if (macrosConfig.value.hasOwnProperty("displayValueRange")) {
					var displayValueRange = macrosConfig.value.displayValueRange;
					for (var i = 0, c = displayValueRange.length; i < c; i += 1) {
						var macrosParameterElId = this.id + this.idPrefix.macrosParameter + macrosType + "-" + i;
						macrosParameterValues.push({
							id: macrosParameterElId,
							caption: displayValueRange[i],
							handler: macrosParameterHandler
						});
					}
				}
			}
			var itemObject = {
				id: macrosElId,
				caption: macrosCaption,
				handler: macrosHandler
			};
			if (macrosParameterValues.length) {
				itemObject.menu = {
					items: macrosParameterValues
				};
			}
			menuGroups[macrosConfig.groupCaption].push(itemObject);
		}, this);
		menuItems = menuItems.concat({className: "Terrasoft.MenuSeparator"}, itemsWithoutGroup);
		return menuItems;
	},

	getCancelMacrosCaption: function() {
		var filterDataValueType = this.instance.dataValueType;
		var referenceSchemaName = this.instance.referenceSchemaName;
		var caption = this.translate.CANCEL_MACROS_DEFAULT;
		if (Terrasoft.isDateDataValueType(filterDataValueType)) {
			caption = this.translate.CANCEL_MACROS_DATE;
		}
		if (referenceSchemaName === "Contact") {
			caption = this.translate.CANCEL_MACROS_CONTACT;
		}
		return caption;
	},

	createMacrosParameterList: function() {
		var macrosConfig = this.filterManager.provider.getFilterMacrosConfig(this.instance);
		var result = [];
		var self = this;
		var handler = function(menu, menuItem) {
			self.onMacrosParameterSelect(menu, menuItem);
		};
		var displayValueRange = macrosConfig.value.displayValueRange;
		for (var i = 0, c = displayValueRange.length; i < c; i += 1) {
			var macrosParameterElId = this.id + this.idPrefix.macrosParameter + i;
			result.push({
				id: macrosParameterElId,
				caption: displayValueRange[i],
				handler: handler
			});
		}
		this.macrosParameterList = Ext.create("Terrasoft.Menu", {
			items: result
		});
		return this.macrosParameterList;
	},

	setValue: function(value) {
		this.filterManager.setRightExpressionValue(this.instance, value);
	},

	setMacrosParameterValue: function(value) {
		this.filterEdit.openMacrosParameter = null;
		var macrosConfig = this.filterManager.provider.getFilterMacrosConfig(this.instance);
		this.filterManager.provider.setRightExpressionValue(this.instance, value, macrosConfig.filterMacrosType);
	},

	macrosParameterDisplay: function(status) {
		var macrosParameterEl = this.getMacrosParameterEl();
		if (Ext.isEmpty(macrosParameterEl)) {
			return;
		}
		if (status === false) {
			macrosParameterEl.addCls("filteredit-hidden");
		} else {
			macrosParameterEl.removeCls("filteredit-hidden");
		}
	},

	/**
	 * Indicates menu for right expression can be shown.
	 * @return {Boolean} True, if menu can be shown.
	 */
	getIsRightExpressionMenuAllowed: function() {
		return (this.allowedMacrosTypes && this.allowedMacrosTypes.length > 0);
	},

	/**
	 * Destroy filterEdit filter.
	 */
	destroy: function() {
		this.destroyDeleteElement();
		this.destroyMacrosElements();
		this.destroyFilterElements();
		var wrapEl = this.getWrapEl();
		wrapEl.removeAllListeners();
	},

	/**
	 * Destroy filter aggregation list.
	 * @protected
	 */
	destroyAggregationList: function() {
		if (this.aggregationList) {
			this.aggregationList.destroy();
		}
	},

	/**
	 * Destroy filter comparistion list.
	 * @protected
	 */
	destroyComparisonList: function() {
		if (this.comparisonList) {
			this.comparisonList.destroy();
		}
	},

	/**
	 * Destroy filter right expression menu.
	 * @protected
	 */
	destroyRightExpressionMenu: function() {
		if (this.rightExpressionMenu) {
			this.rightExpressionMenu.destroy();
		}
	},

	/**
	 * Destroy filter macros parameters list.
	 * @protected
	 */
	destroyMacrosParameterList: function() {
		if (this.macrosParameterList) {
			this.macrosParameterList.destroy();
		}
	},

	/**
	 * Destroy filter remove element.
	 * @protected
	 */
	destroyDeleteElement: function() {
		var deleteEl = this.getDeleteEl();
		if (deleteEl) {
			Ext.removeNode(deleteEl.dom);
		}
	},

	/**
	 * Destroy filter macros elements;
	 * @protected
	 */
	destroyMacrosElements: function() {
		this.destroyMacrosParameterList();
		this.destroyMacrosParameterElement();
		this.destroyMacrosElement();
	},

	/**
	 * Destroy filter macros parameter element.
	 * @protected
	 */
	destroyMacrosParameterElement: function() {
		var macrosParameterEl = this.getMacrosParameterEl();
		if (macrosParameterEl) {
			Ext.removeNode(macrosParameterEl);
		}
	},

	/**
	 * Destroy filter macros element.
	 * @protected
	 */
	destroyMacrosElement: function() {
		var macrosEl = this.getMacrosEl();
		if (macrosEl) {
			Ext.removeNode(macrosEl);
		}
	},

	/**
	 * Destroy filter elements.
	 * @protected
	 */
	destroyFilterElements: function() {
		this.destroyFilterLeftExpressionElement();
		this.destroyFilterComparisionTypeElement();
		this.destroyFilterRightExpressionElement();
		this.destroyFilterAggregationElement();
	},

	/**
	 * Destroy filter left expression element.
	 * @protected
	 */
	destroyFilterLeftExpressionElement: function() {
		var leftEl = this.getLeftEl();
		Ext.removeNode(leftEl.dom);
	},

	/**
	 * Destroy filter comparison element.
	 * @protected
	 */
	destroyFilterComparisionTypeElement: function() {
		this.destroyComparisonList();
		var comparisonEl = this.getComparisonEl();
		if (comparisonEl) {
			Ext.removeNode(comparisonEl.dom);
		}
	},

	/**
	 * Destroy filter right expression element.
	 * @protected
	 */
	destroyFilterRightExpressionElement: function() {
		this.destroyRightExpressionMenu();
		var rightEl = this.getRightEl();
		if (rightEl) {
			Ext.removeNode(rightEl.dom);
		}
	},

	/**
	 * Destroy filter aggreagte element.
	 * @protected
	 */
	destroyFilterAggregationElement: function() {
		this.destroyAggregationList();
		var aggregationEl = this.getAggregationEl();
		if (aggregationEl) {
			Ext.removeNode(aggregationEl.dom);
		}
	}

});
