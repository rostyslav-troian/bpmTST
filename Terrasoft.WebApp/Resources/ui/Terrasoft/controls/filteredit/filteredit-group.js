/**
 */
Ext.define("Terrasoft.controls.FilterEdit.Group", {
	extend: "Terrasoft.FilterEdit.Item",
	alternateClassName: "Terrasoft.FilterEdit.Group",

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#idPrefix
	 * @override
	 */
	idPrefix: {
		group: "-filteredit-group-"
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#cssClass
	 * @override
	 */
	cssClass: {
		group: "filteredit-group",
		aggregativeGroup: "filteredit-aggregative-group",
		type: "filteredit-group-type",
		groupTypeHidden: "filteredit-group-type-hidden",
		groupTypeDisabled: "filteredit-group-type-disabled",
		enableWrapper: "t-checkboxedit-wrap",
		enable: "t-checkboxedit",
		disable: "filteredit-disabled",
		checked: "t-checkboxedit-checked",
		rules: "filteredit-group-rules",
		add: "filteredit-group-rules-add",
		del: "filteredit-group-delete",
		selected: "filteredit-selected"
	},

	deletable: true,

	groupAggregative: false,

	typeEl: null,

	typeSpaceEl: null,

	addEl: null,

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.id = this.filterEdit.id + this.idPrefix.group + this.instance.key;
		this.generateHtmlConfig();
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#init
	 * @protected
	 * @override
	 */
	init: function(config) {
		this.instance = config.groupFilters;
		this.enabled = config.groupFilters.isEnabled;
		this.deletable = (Ext.typeOf(config.deletable) !== "undefined") ? config.deletable : this.deletable;
		this.groupType = config.groupType;
		this.groupAggregative = config.groupAggregative;
		this.generateTo = config.generateTo;
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
				canRemove: true,
				canAddFilters: true,
				canViewGroupType: true,
				canEditGroupType: true,
				canSelect: true
			};
		}
		return filterManager.getAllowedFilterGroupManageOperations(this.instance);
	},

	/**
	 * Generates filter group type html configuration.
	 * @private
	 * @param {Object[]} filterGroupViewItems FilterGroup view configs.
	 */
	generateTypeConfig: function(filterGroupViewItems) {
		var allowedManageOperations = this.allowedManageOperations;
		var groupTypeCls = [this.cssClass.type];
		if (!allowedManageOperations.canViewGroupType) {
			groupTypeCls.push(this.cssClass.groupTypeHidden);
		}
		if (!allowedManageOperations.canEditGroupType) {
			groupTypeCls.push(this.cssClass.groupTypeDisabled);
		}
		var htmlConfig = {
			tag: "span",
			cls: groupTypeCls.join(" "),
			children: []
		};
		if (this.allowedManageOperations.canViewGroupType) {
			var type = this.filterEdit.LogicalOperatorTypeFlipped[this.groupType];
			var typeName = Terrasoft.Resources.LogicalOperatorType[type];
			htmlConfig.children.push({
				tag: "span",
				html: typeName
			});
		}
		filterGroupViewItems.push(htmlConfig);
	},

	/**
	 * Generates filter group rules list html configuration.
	 * @private
	 * @param {Object[]} filterGroupViewItems FilterGroup view configs.
	 */
	generateRulesListConfig: function(filterGroupViewItems) {
		var filterGroupItemsHtmlConfig = this.generateFilterGroupItemsHtmlConfig();
		var htmlConfig = {
			tag: "div",
			cls: this.cssClass.rules,
			children: [{
					tag: "div",
					cls: "filteredit-group-rules-list",
					children: filterGroupItemsHtmlConfig
			}]
		};
		if (this.allowedManageOperations.canAddFilters) {
			htmlConfig.children.push({
				tag: "span",
				cls: this.cssClass.add,
				html: this.translate.ADD_FILTER
			});
		}
		filterGroupViewItems.push(htmlConfig);
	},

	/**
	 * Generate filterGroup items html configs.
	 * @private
	 * @return {Object[]} FilterGroup items view configs.
	 */
	generateFilterGroupItemsHtmlConfig: function() {
		var groupFilters = this.instance;
		var filterGroupItemsHtmlConfig = [];
		groupFilters.each(function(filterItem) {
			if (filterItem.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				this.generateChildFilterEditGroupItem(filterItem, filterGroupItemsHtmlConfig);
			} else {
				this.generateChildFilterEditFilterItem(filterItem, filterGroupItemsHtmlConfig);
			}
		}, this);
		return filterGroupItemsHtmlConfig;
	},

	/**
	 * Generates html config for child filterGroup.
	 * @private
	 * @param {Terrasoft.FilterGroup} filterItem Child filterGroup.
	 * @param {Object[]} filterGroupItemsHtmlConfig FilterGroup items view configs.
	 */
	generateChildFilterEditGroupItem: function(filterItem, filterGroupItemsHtmlConfig) {
		var filterEditItem = Ext.create("Terrasoft.FilterEdit.Group", {
			filterEdit: this.filterEdit,
			filterManager: this.filterManager,
			groupFilters: filterItem,
			groupType: filterItem.logicalOperation,
			generateTo: filterGroupItemsHtmlConfig
		});
		this.filterEdit.renderedGroups[filterItem.key] = filterEditItem;
	},

	/**
	 * Generates html config for child filter.
	 * @private
	 * @param {Terrasoft.BaseFilter} filterItem Child filter.
	 * @param {Object[]} filterGroupItemsHtmlConfig FilterGroup items view configs.
	 */
	generateChildFilterEditFilterItem: function (filterItem, filterGroupItemsHtmlConfig) {
		var filterEditConfig = this.filterEdit.getFilterEditConfig();
		var filetEditItemClassName = filterEditConfig.filterClassName;
		var filterEditItem = Ext.create(filetEditItemClassName, {
			filterEdit: this.filterEdit,
			filterManager: this.filterManager,
			filter: filterItem,
			generateTo: filterGroupItemsHtmlConfig
		});
		this.filterEdit.renderedFilters[filterItem.key] = filterEditItem;
	},

	/**
	 * @inheritdoc Terrasoft.FilterEdit.Item#generateDeleteConfig
	 * @override
	 */
	generateDeleteConfig: function(filterGroupViewItems) {
		var htmlConfig = {
			tag: "a",
			href: "#",
			cls: this.cssClass.del
		};
		filterGroupViewItems.push(htmlConfig);
		return Terrasoft.deepClone(htmlConfig);
	},

	/**
	 * Generates html configuration.
	 */
	generateHtmlConfig: function() {
		var cssClass = this.cssClass;
		var allowedManageOperations = this.allowedManageOperations;
		var filterGroupViewItems = [];
		this.generateTypeConfig(filterGroupViewItems);
		if (this.deletable && allowedManageOperations.canRemove) {
			this.generateDeleteConfig(filterGroupViewItems);
		}
		this.generateRulesListConfig(filterGroupViewItems);
		if (allowedManageOperations.canViewEnabled) {
			this.generateCheckboxConfig(filterGroupViewItems);
		}
		var filterGroupCls = [cssClass.group];
		if (!this.enabled) {
			filterGroupCls.push(cssClass.disable);
		}
		if (this.groupAggregative) {
			filterGroupCls.push(cssClass.aggregativeGroup);
		}
		if (this.filterEdit.selectedFilters.hasOwnProperty(this.id)) {
			filterGroupCls.push(cssClass.selected);
		}
		var htmlConfig = {
			tag: "div",
			id: this.id,
			cls: filterGroupCls.join(" "),
			children: filterGroupViewItems
		};
		this.generateTo.push(htmlConfig);
	},

	getTypeEl: function() {
		if (!this.typeEl) {
			var wrapEl = this.getWrapEl();
			this.typeEl = wrapEl.child("." + this.cssClass.type + " span");
		}
		return this.typeEl;
	},

	getTypeSpaceEl: function() {
		if (!this.typeSpaceEl) {
			var wrapEl = this.getWrapEl();
			this.typeSpaceEl = wrapEl.child("." + this.cssClass.type);
		}
		return this.typeSpaceEl;
	},

	getDeleteEl: function() {
		if (!this.deleteEl) {
			var wrapEl = this.getWrapEl();
			this.deleteEl = wrapEl.child("." + this.cssClass.del);
		}
		return this.deleteEl;
	},

	getAddEl: function() {
		if (!this.addEl) {
			var wrapEl = this.getWrapEl();
			this.addEl = wrapEl.child("." + this.cssClass.rules + " > ." + this.cssClass.add);
		}
		return this.addEl;
	},

	/**
	 * Initializes events for current control.
	 */
	initDomEvents: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		wrapEl.on("click", this.onWrapElClick, this);
		this.initEditGroupTypeDomEvent();
		this.initGroupSelectionDomEvent();
		this.initEditEnabledDomEvent();
		this.initDeleteFilterGroupDomEvent();
		this.initAddFilterDomEvent();
	},

	/**
	 * Initializes DOM-event for editing filterGroup type.
	 * @private
	 */
	initEditGroupTypeDomEvent: function() {
		if (this.allowedManageOperations.canEditGroupType) {
			var typeEl = this.getTypeEl();
			if (typeEl) {
				typeEl.on("click", this.onTypeElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-event for filterGroup enabling.
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
	 * Initializes DOM-event for filterGroup selection.
	 * @private
	 */
	initGroupSelectionDomEvent: function() {
		if (this.allowedManageOperations.canSelect) {
			var typeSpaceEl = this.getTypeSpaceEl();
			if (typeSpaceEl) {
				typeSpaceEl.on("click", this.onTypeSpaceElClick, this);
			}
		}
	},

	/**
	 * Initializes DOM-event for filterGroup removing.
	 * @private
	 */
	initDeleteFilterGroupDomEvent: function() {
		if (this.deletable && this.allowedManageOperations.canRemove) {
			var deleteEl = this.getDeleteEl();
			deleteEl.on("click", this.onDeleteElClick, this);
		}
	},

	/**
	 * Initializes DOM-event for adding filterGroup filter.
	 * @private
	 */
	initAddFilterDomEvent: function() {
		if (this.allowedManageOperations.canAddFilters) {
			var addEl = this.getAddEl();
			addEl.on("click", this.onAddClick, this);
		}
	},

	onWrapElClick: function(event) {
		event.stopEvent();
	},

	onTypeElClick: function(event) {
		event.stopEvent();
		this.filterManager.toggleFilterGroupLogicalOperation(this.instance);
		this.filterEdit.update();
	},

	onTypeSpaceElClick: function(event) {
		event.stopEvent();
		var selectedFilters = (event.ctrlKey) ? [this] : this;
		this.filterEdit.setSelectedFilters(selectedFilters);
		if (event.ctrlKey) {
			this.filterEdit.fireEvent("selectedFiltersChange", this.instance);
		} else {
			this.filterEdit.fireEvent("selectedFiltersChange");
		}
	},

	onDeleteElClick: function(event) {
		event.stopEvent();
		this.filterEdit.clearSelected();
		this.filterManager.deleteItem(this.instance);
		this.filterEdit.update();
	},

	onAddClick: function(event) {
		event.stopEvent();
		this.filterManager.addFilter(this.instance);
	},

	showSelected: function(status) {
		var wrapEl = this.getWrapEl();
		if (status) {
			wrapEl.addCls(this.cssClass.selected);
		} else {
			wrapEl.removeCls(this.cssClass.selected);
		}
	},

	/**
	 * Destroy filterGroup.
	 */
	destroy: function() {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return;
		}
		this.destroyGroupTypeElement();
		this.destroyEnableGroupElement();
		this.destroyDeleteElement();
		this.destroyAddFilterElement();
		wrapEl.removeAllListeners();
	},

	/**
	 * Destroy filterGroup type element.
	 * @private
	 */
	destroyGroupTypeElement: function() {
		if (this.allowedManageOperations.canViewGroupType) {
			var typeSpaceEl = this.getTypeSpaceEl();
			Ext.removeNode(typeSpaceEl);
			var typeEl = this.getTypeEl();
			Ext.removeNode(typeEl);
		}
	},

	/**
	 * Destroy filterGroup enable element.
	 * @private
	 */
	destroyEnableGroupElement: function() {
		if (this.allowedManageOperations.canEditEnabled) {
			var enableWrapEl = this.getEnableWrapEl();
			Ext.removeNode(enableWrapEl);
		}
	},

	/**
	 * Destroy filterGroup delete element.
	 * @private
	 */
	destroyDeleteElement: function() {
		if (this.allowedManageOperations.canRemove) {
			var deleteEl = this.getDeleteEl();
			Ext.removeNode(deleteEl);
		}
	},

	/**
	 * Destroy filterGroup add child filter element.
	 * @private
	 */
	destroyAddFilterElement: function() {
		if (this.allowedManageOperations.canAddFilters) {
			var addEl = this.getAddEl();
			Ext.removeNode(addEl);
		}
	}

});
