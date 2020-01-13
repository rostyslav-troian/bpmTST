/**
 * Mixin is used by controls that should support working with drop-down lists.
 */
Ext.define("Terrasoft.controls.mixins.ExpandableList", {
	alternateClassName: "Terrasoft.ExpandableList",

	/**
	 * Before filtration timer id.
	 * @private
	 * @type {Number}
	 */
	timerId: 0,

	/**
	 * Before mask showing timer id.
	 * @private
	 * @type {Number}
	 */
	maskTimerId: null,

	/**
	 * Indicates whether to display the drop-down list with filters or not.
	 * @protected
	 * @type {Boolean}
	 */
	isShowAllList: false,

	/**
	 * Enables local filtering.
	 * @protected
	 * @type {Boolean}
	 */
	enableLocalFilter: true,

	/**
	 * Link to the model collection
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	list: null,

	/**
	 * Link to drop-down list object {@link Terrasoft.ListView}
	 * @protected
	 * @type {Terrasoft.controls.ListView}
	 */
	listView: null,

	/**
	 * Value typed to input.
	 * @protected
	 * @type {String}
	 */
	typedValue: "",

	/**
	 * The property describes how to filter data (StartsWith, Contains, etc.).
	 * @type {Terrasoft.StringFilterType}
	 */
	filterComparisonType: null,

	/**
	 * The minimum number of characters to enter for filtering
	 * @type {Number}
	 */
	minSearchCharsCount: 0,

	/**
	 * Delay before filtering.
	 * The number of milliseconds that must elapse after the user enters the filter value into the element
	 * and the beginning of the filtering.
	 * @type {Number}
	 */
	searchDelay: 0,

	/**
	 * Number of records to be loaded to the drop-down list.
	 * @type {Number}
	 */
	maxListItemCount: 0,

	/**
	 * Parameter indicating the maximum visible number of menu items in the list
	 * @override
	 */
	maxItemsInView: 0,

	/**
	 * Delay before the mask is displayed.
	 * @type {Number}
	 */
	maskDelay: 0,

	/**
	 * The configuration object that is used when initializing the object of the drop-down list.
	 * @type {Object}
	 */
	listViewConfig: null,

	/**
	 * The configuration object that is used to initialize the model collection
	 * @type {Object}
	 */
	listConfig: null,

	/**
	 * The name of the model collection event to retrieve the column values of the directory
	 * @private
	 * @type {String}
	 */
	listPrepareEventName: "prepareList",

	/**
	 * Event name to load more items to the list.
	 * @private
	 * @type {String}
	 */
	loadNextPageEventName: "loadNextPage",

	/**
	 * The offset of the drop-down list relative to the parent control.
	 * @type {Array}
	 */
	listOffset: null,

	/**
	 * Destroys the timer by its name
	 * @private
	 * @param {String} timerName Timer name
	 */
	clearTimer: function(timerName) {
		if (this[timerName] !== null) {
			clearTimeout(this[timerName]);
			this[timerName] = null;
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @override
	 */
	init: function() {
		this.addEvents(
			/**
			 * @event listPrepareEventName
			 * Event for sending a request for data
			 * @param {String} searchText text to search for
			 * @param {String} filterComparisonType filter
			 * @param {Number} maxListItemCount The maximum number of elements in the response
			 */
			this.listPrepareEventName,

			/**
			 * @event loadNextPageEventName
			 * Event to load more data to the list.
			 * @param {Object} config List configuration.
			 */
			this.loadNextPageEventName
		);
	},

	/**
	 * Destroys the created objects
	 * @protected
	 */
	destroy: function() {
		this.list = null;
		var listView = this.listView;
		if (listView) {
			listView.destroy();
		}
	},

	/**
	 * Fire event listPrepareEventName with arguments: searchText, filterComparisonType, maxListItemCount.
	 * Set focus to control.
	 * @protected
	 * @param {String} searchText Filter text search condition.
	 * @param {String} listPrepareEventName Model event name for getting list values.
	 */
	expandList: function(searchText, listPrepareEventName) {
		if (this.listView === null) {
			this.createListView();
		}
		searchText = (searchText === undefined) ? "" : searchText;
		this.clearTimer("maskTimerId");
		var result = this.fireEvent(listPrepareEventName || this.listPrepareEventName, searchText, this.list);
		if (!result) {
			this.maskTimerId = Ext.defer(this.showLoadMask, this.maskDelay, this);
		}
		var el = this.getEl();
		if (el) {
			el.focus();
		}
	},

	/**
	 * Creates Expandable list control and sets link for it to mixin.
	 * @return {Terrasoft.controls.ListView} New instance of Expandable list control.
	 */
	createListView: function() {
		var listViewConfig = this.listViewConfig || {};
		var markerValue = this.markerValue;
		if (markerValue) {
			listViewConfig.markerValue = markerValue;
		}
		if (this.iconsVisible) {
			listViewConfig.iconsVisible = this.iconsVisible;
		}
		if (this.maxItemsInView > 0) {
			listViewConfig.maxItemsInView = this.maxItemsInView;
		}
		var listView = Ext.create("Terrasoft.ListView", listViewConfig);
		listView.on("select", this.onListElementSelected, this);
		listView.on("listViewItemRender", this.onListViewItemRender, this);
		listView.on("loadNextPage", this.onLoadNextPage, this);
		listView.on("hide", this.onHideList, this);
		this.listView = listView;
		return listView;
	},

	/**
	 * Handles list hiding.
	 * @private
	 */
	onHideList: function() {
		this.typedValue = "";
	},

	/**
	 * loadNextPage event handler that adds additional params to config and fires event to load new data to the
	 * list, passing extended config.
	 * @protected
	 */
	onLoadNextPage: function() {
		this.listView.collectionItemsCount = this.list.collection.getCount();
		var filterValue = this.typedValue;
		var listParams = {
			list: this.list,
			filterValue: filterValue,
			listView: this.listView
		};
		this.fireEvent(this.loadNextPageEventName, listParams);
	},

	/**
	 * Generates a render event for the listView item
	 * @param {Object} listViewItem collection item
	 */
	onListViewItemRender: function(listViewItem) {
		this.fireEvent("listViewItemRender", listViewItem);
	},

	/**
	 * Handles list element selected event.
	 * @protected
	 * @param {Object} item Selected element property.
	 */
	onListElementSelected: function(item) {
		if (!Ext.isEmpty(item)) {
			this.setValue(item);
			this.listView.hide();
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onFocus
	 * @protected
	 */
	onFocus: function() {
		var el = this.getEl();
		if (el && el.dom && el.dom.value) {
			el.dom.select();
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseEdit#onBlur
	 * @protected
	 */
	onBlur: function() {
		if (!this.enabled || !this.rendered) {
			return;
		}
		this.focused = false;
		this.fireEvent("blur", this);
		this.fireEvent("focusChanged", this);
	},

	/**
	 * Handles editor key down event.
	 * @protected
	 * @param  {Ext.EventObjectImpl} e Event object.
	 * @param {Boolean} changeTypedValue Flag to update typedValue property.
	 */
	onKeyDown: function(e, changeTypedValue) {
		if (!this.enabled) {
			return;
		}
		if (changeTypedValue && !e.isNavKeyPress()) {
			this.typedValue = this.getTypedValue();
		}
		var key = e.getKey();
		var listView = this.listView;
		if (listView && listView.visible) {
			switch (key) {
				case e.DOWN:
					listView.fireEvent("listPressDown");
					break;
				case e.UP:
					listView.fireEvent("listPressUp");
					break;
				default:
					break;
			}
		}
	},

	/**
	 * Displays the loading mask.
	 */
	showLoadMask: function() {
		var wrapEl = this.getWrapEl();
		var listView = this.listView;
		if (listView === null) {
			this.createListView();
		}
		listView.show({
			alignEl: wrapEl,
			showProgressSpinner: true,
			offset: this.listOffset
		});
	},

	/**
	 * Returns parameters to open the drop-down list.
	 * @return {Object} The parameters to open the drop-down list.
	 */
	getListViewConfig: function() {
		var wrapEl = this.getWrapEl();
		return {
			alignEl: wrapEl,
			showProgressSpinner: false,
			selectedValue: this.selectedItem,
			offset: this.listOffset
		};
	},

	/**
	 * Sets the reference to the model collection (binds the control to the collection).
	 * If the model is not empty or the number of characters entered is not less than minSearchCharsCount
	 * displays the list filtering by the entered value.
	 * @param  {Terrasoft.Collection} list reference to the model collection
	 */
	loadList: function(list) {
		if (this.isVisible() === false) {
			return;
		}
		var listView = this.listView;
		var isHideAllList = !this.isShowAllList;
		this.setListValue(list);
		if (listView) {
			this.processSelectedItem();
		} else {
			this.fireEvent("selectSuggestion");
			return;
		}
		this.fireEvent("selectSuggestion");
		if (isHideAllList) {
			if (this.getIfNeedFilter()) {
				list = this.filterList(list);
			} else {
				return;
			}
		}
		this.processList(list);
		this.toggleShowAllListIfTrue();
	},

	/**
	 * Sets list property.
	 * @private
	 * @param {Terrasoft.Collection} newList New value for list property.
	 */
	setListValue: function(newList) {
		this.list = newList;
	},

	/**
	 * Processes selected item.
	 * @private
	 */
	processSelectedItem: function() {
		var listView = this.listView;
		var mapValue = listView.map.value;
		var selectedItem = this.selectedItem ? listView.convertItemToInitialConfig(this.selectedItem) : null;
		if (!selectedItem || !selectedItem[mapValue]) {
			this.setSelectedItem(null);
		}
	},

	/**
	 * Processes list depending on count of list elements.
	 * @private
	 * @param {Terrasoft.Collection} list List of expandable list elements.
	 */
	processList: function(list) {
		var listView = this.listView;
		var listCount = list.getCount();
		var listConfig;
		if (listCount > 0) {
			listView.loadList(list);
			listConfig = this.getListViewConfig();
			listView.show(listConfig);
		} else {
			listView.hide();
		}
	},

	/**
	 * Checks count of entered characters and hides list if it is less then minimum search count.
	 * @private
	 * @return {Boolean} True if listView was hidden.
	 */
	getIfNeedFilter: function() {
		var listView = this.listView;
		if (this.typedValue.length < this.minSearchCharsCount) {
			if (listView.visible) {
				listView.hide();
			}
			return false;
		} else {
			return true;
		}
	},

	/**
	 * Toggles state of isShowAllList property to false if it is true.
	 * @private
	 */
	toggleShowAllListIfTrue: function() {
		var isShowAllList = this.isShowAllList;
		if (isShowAllList) {
			this.isShowAllList = false;
		}
	},

	/**
	 * Filters list by typed value.
	 * @private
	 * @param {Terrasoft.Collection} list List of expandable list elements.
	 * @return {Terrasoft.Collection} Filtered list.
	 */
	filterList: function(list) {
		var filterComparisonType = this.getFilterComparisonType();
		if (this.enableLocalFilter) {
			list = list.filter(this.listView.map.displayValue, this.typedValue, filterComparisonType);
		}
		return list;
	},

	/**
	 * Returns system setting filter comparison type.
	 * @protected
	 * @return {Terrasoft.StringFilterType} String comparison type.
	 */
	getFilterComparisonType: function() {
		if (Ext.isNumber(this.filterComparisonType)) {
			return this.filterComparisonType;
		}
		return (Terrasoft.SysSettings.getCachedSysSetting("StringColumnSearchComparisonType") === 1)
			? Terrasoft.StringFilterType.CONTAIN
			: Terrasoft.StringFilterType.START_WITH;
	},

	/**
	 * Sets value of selected element on which list will be focused.
	 * @param {Object} item Element from elements collection {@link Terrasoft.ExpandableList#list}.
	 */
	setSelectedItem: function(item) {
		this.selectedItem = item;
	},

	/**
	 * Sets flag value {@link #isShowAllList} to true.
	 */
	setShowAllList: function() {
		this.isShowAllList = true;
	},

	/**
	 * Collapses dropdown list.
	 */
	collapseList: function() {
		var listView = this.listView;
		if (listView !== null && listView.visible) {
			listView.hide();
		}
	},

	/**
	 * Returns binding configuration for model for mixin interface {@link Terrasoft.Bindable}.
	 * @protected
	 */
	getBindConfig: function() {
		var expandableBindConfig = {
			list: {
				changeMethod: "loadList"
			}
		};
		return expandableBindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#initBinding
	 * @protected
	 * @override
	 */
	initBinding: function(configItem, bindingRule) {
		var getValueBinding = {};
		if (configItem === "value" && bindingRule.getValue) {
			getValueBinding.getValue = bindingRule.getValue;
		}
		return getValueBinding;
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getModelMethod
	 * @protected
	 * @override
	 */
	getModelMethod: function(binding, model) {
		return (binding.getValue) ? model[binding.getValue] : model[binding.modelItem];
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForEvents
	 * @override
	 * Extends mixin binding mechanism {@link Terrasoft.Bindable} to work with lookups.
	 */
	subscribeForEvents: function(binding, property, model) {
		if (property !== "value") {
			return;
		}
		var bindings = this.bindings;
		if (!bindings[this.listPrepareEventName]) {
			var lookupColumnName = bindings.value.modelItem;
			var lookupColumn = model.columns[lookupColumnName] || {};
			var isLookupEdit = (this.alternateClassName === "Terrasoft.LookupEdit");
			var isLookup = lookupColumn.isLookup || (lookupColumn.dataValueType === Terrasoft.DataValueType.LOOKUP);
			if (isLookup) {
				var params = [
					lookupColumnName,
					isLookupEdit
				];
				this.subscribeForControlEvent(this.listPrepareEventName, model[model.defLoadLookupDataMethod],
					model, params);
				this.subscribeForControlEvent(this.loadNextPageEventName, model[model.loadLookupDataMethod],
					model, params);
			}
		}
		if (binding.getValue) {
			this.subscribeForPropertyChangeEvent(binding, property, model, true);
			this.subscribeForDependentPropertiesChangeEvents(binding, property, model);
		}
	},

	/**
	 * Checks whether the event target is a children of the list.
	 * @param {Event} event Event to checks.
	 * @return {Boolean} True in the case of a positive result.
	 */
	isEventWithinList: function(event) {
		return (event && this.listView)
			? this.listView.isEventWithin(event)
			: false;
	}

});
