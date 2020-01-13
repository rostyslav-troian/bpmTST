/**
 */
Ext.define("Terrasoft.core.mixins.ProcessSchemaDesignerSearchMixin", {

	alternateClassName: "Terrasoft.ProcessSchemaDesignerSearchMixin",

	//region Methods: Private

	/**
	 * Search items by SearchValue attribute.
	 * @private
	 */
	searchItem: function() {
		var searchValue = this.get("SearchTextEditValue");
		if (searchValue) {
			if (searchValue === this.get("SearchValue")) {
				if (this.get("IsItemsFound")) {
					this.searchNextItem();
				}
			} else {
				this.set("SearchValue", searchValue);
				var foundItems = this.findItems(searchValue);
				this.set("FoundItems", foundItems);
			}
		} else {
			this.clearSearchResult(true);
		}
	},

	/**
	 * Returns collection of items that satisfies filter in their name or caption. Lane elements will be ignored.
	 * @private
	 * @param {String} filter String that will filter a collection.
	 * @return {Terrasoft.Collection} Collection of filtered items.
	 */
	findItems: function(filter) {
		if (Ext.isEmpty(filter)) {
			return new Terrasoft.Collection();
		}
		var customFilter = filter.replace(Terrasoft.process.constants.PARAMETER_ESCAPE_REGEX, "\\$&");
		var regexp = new RegExp(customFilter, "i");
		var items = this.get("Items");
		var resultCollection = items.filterByFn(function(item) {
			return this.filterItems(item, regexp);
		}, this);
		resultCollection.sortByFn(this.sortByPosition.bind(this));
		return resultCollection;
	},

	/**
	 * Comparison function, returns one of two items that are the closest to (0;0) coordinate.
	 * Preference is given to y coordinate over x coordinate.
	 * @private
	 * @param {Terrasoft.ProcessBaseElementSchema} first First item in comparison.
	 * @param {Terrasoft.ProcessBaseElementSchema} second Second item in comparison.
	 * @return {number} Comparison result number. 1 if first > second, -1 if first < second, 0 if first == second.
	 */
	sortByPosition: function(first, second) {
		var yMergeThreshold = 20;
		var firstPosition = this.getItemAveragePosition(first);
		var secondPosition = this.getItemAveragePosition(second);
		var yComparison = firstPosition.y - secondPosition.y;
		var xComparison = firstPosition.x - secondPosition.x;
		if (Math.abs(yComparison) < yMergeThreshold) {
			yComparison = 0;
		}
		var resultComparison = yComparison !== 0 ? yComparison : xComparison;
		return resultComparison;
	},

	/**
	 * Filter function that returns only items that satisfies regexp in their name or caption.
	 * LaneSets and lanes will be ignored.
	 * @private
	 * @param {Terrasoft.ProcessBaseElementSchema} item Item that will be filtered.
	 * @param {RegExp} regexp Regexp filter for item name or caption.
	 * @return {boolean} Returns true if item satisfies the regexp or false otherwise.
	 */
	filterItems: function(item, regexp) {
		if ((item instanceof Terrasoft.ProcessLaneSchema) || (item instanceof Terrasoft.ProcessLaneSetSchema)) {
			return false;
		}
		if (item.name.search(regexp) !== -1) {
			return true;
		}
		var caption = item.caption && item.caption.getValue();
		return caption && (caption.search(regexp) !== -1);
	},

	/**
	 * Return average position of the item.
	 * @private
	 * @param {Terrasoft.ProcessBaseElementSchema} item Item from which position is taken.
	 * @return {Object} Average position of the item. If no position was found, returns (0;0) coordinate.
	 */
	getItemAveragePosition: function(item) {
		var resultPosition = {x: 0, y: 0};
		if (item.position) {
			resultPosition.x =  item.position.X;
			resultPosition.y = item.position.Y;
			return resultPosition;
		}
		if (item.typeCaption === "Sequence flow") {
			var sourceNode = item.findSourceElement();
			var targetNode = item.findTargetElement();
			resultPosition = this.getAveragePointBetween(sourceNode.position, targetNode.position);
		}
		return resultPosition;
	},

	/**
	 * Clears search results.
	 * @private
	 * @param {Boolean} [doNotStopSearch] Prevent stop searching.
	 */
	clearSearchResult: function(doNotStopSearch) {
		this.set("FoundItems", null);
		this.set("SearchValue", "");
		if (!doNotStopSearch) {
			this.set("IsSearchStarted", false);
		}
	},

	/**
	 * Updates search information.
	 * @private
	 */
	updateSearchInfo: function() {
		var searchInfo = "";
		var searchErrorInfo = "";
		var foundItems = this.get("FoundItems");
		if (this.get("IsSearchStarted") && this.get("SearchValue") && foundItems) {
			var count = foundItems.getCount();
			var index = this.get("SearchItemIndex");
			var info = Ext.String.format(Terrasoft.Resources.SchemaDesigner.SearchInfoTemplate, index + 1, count);
			if (this.get("IsItemsFound")) {
				searchInfo = info;
			} else {
				searchErrorInfo = info;
			}
		}
		this.set("SearchInfo", searchInfo);
		this.set("SearchErrorInfo", searchErrorInfo);
		this.updateFoundItemsHighlighter();
	},

	/**
	 * Updates found items highlighter.
	 * @private
	 */
	updateFoundItemsHighlighter: function() {
		var foundItems = this.get("FoundItems");
		var selectedItemName;
		if (foundItems && !foundItems.isEmpty()) {
			var index = this.get("SearchItemIndex");
			var searchItem = foundItems.getByIndex(index);
			selectedItemName = searchItem.name;
		}
		this.fireEvent("updateItemsHighlighter", foundItems, selectedItemName, this);
	},

	/**
	 * Go to next searching item.
	 * @private
	 */
	searchNextItem: function() {
		var index = this.get("SearchItemIndex") + 1;
		var items = this.get("FoundItems");
		var count = items.getCount();
		if (index >= count) {
			index = 0;
		}
		this.set("SearchItemIndex", index);
		this.selectSearchingItem();
	},

	/**
	 * Go to previous searching item.
	 * @private
	 */
	searchPreviousItem: function() {
		var index = this.get("SearchItemIndex") - 1;
		if (index < 0) {
			var items = this.get("FoundItems");
			var count = items.getCount();
			index = count - 1;
		}
		this.set("SearchItemIndex", index);
		this.selectSearchingItem();
	},

	/**
	 * Selects found item by index.
	 * @private
	 */
	selectSearchingItem: function() {
		this.updateSearchInfo();
		if (this.get("IsItemsFound")) {
			var foundItems = this.get("FoundItems");
			var index = this.get("SearchItemIndex");
			var item = foundItems.getByIndex(index);
			var itemName = item.name;
			var items = this.get("Items");
			if (items.find(itemName)) {
				this.set("LastSelectedItemName", itemName);
				this.fireEvent("itemSelected", itemName);
				this.loadPropertiesPage(itemName);
			} else {
				this.set("SearchValue", "");
				this.searchItem();
			}
		}
	},

	/**
	 * Handler of change attribute SearchTextEditValue.
	 * @private
	 */
	onSearchTextEditValueChange: function() {
		if (this.get("IsSearchStarted")) {
			this.set("SearchValue", "");
			this.searchItem();
		}
	},

	/**
	 * Handler of change attribute FoundItems.
	 * @private
	 * @param {Object} model View model.
	 * @param {Terrasoft.core.collections.Collection} foundItems Value of attribute.
	 */
	onFoundItemsChange: function(model, foundItems) {
		var isItemsFound = foundItems != null && !foundItems.isEmpty();
		this.set("IsItemsFound", isItemsFound);
		if (isItemsFound) {
			var lastSelectedItemName = this.get("LastSelectedItemName");
			var item = foundItems.find(lastSelectedItemName);
			var index = item ? foundItems.indexOf(item) : 0;
			this.set("SearchItemIndex", index);
			this.selectSearchingItem();
		} else {
			this.set("SearchItemIndex", -1);
			this.updateSearchInfo();
		}
	},

	/**
	 * Returns point between two given points.
	 * @private
	 * @param {Object} sourcePoint Source point.
	 * @param {Object} targetPoint Target point.
	 * @returns {Object} Point between source and targets points.
	 */
	getAveragePointBetween: function(sourcePoint, targetPoint) {
		return {
			x: Math.abs(targetPoint.X - sourcePoint.X) / 2 + sourcePoint.X,
			y: Math.abs(targetPoint.Y - sourcePoint.Y) / 2 + sourcePoint.Y
		};
	},

	//endregion

	//region Methods: Public

	/**
	 * Handler button click for search item.
	 */
	onSearchButtonClick: function() {
		this.set("IsSearchStarted", true);
		this.searchItem();
	},

	/**
	 * Handler button click for search next item.
	 */
	onSearchNextButtonClick: function() {
		this.searchNextItem();
	},

	/**
	 * Handler button click for search previous item.
	 */
	onSearchPreviousButtonClick: function() {
		this.searchPreviousItem();
	}

	//endregion

});
