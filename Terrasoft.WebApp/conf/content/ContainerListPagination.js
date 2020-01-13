Terrasoft.configuration.Structures["ContainerListPagination"] = {innerHierarchyStack: ["ContainerListPagination"]};
/**
 * @class Terrasoft.controls.ContainerListPagination
 * @extends Terrasoft.controls.ContainerList
 * Class capable of hiding elements of its collection.
 */
define("ContainerListPagination", ["ContainerList"], function() {
	Ext.define("Terrasoft.controls.ContainerListPagination", {
		extend: "Terrasoft.ContainerList",
		alternateClassName: "Terrasoft.ContainerListPagination",

		/**
		 * The maximum number of items visible on the page.
		 * @type {Number}
		 */
		maxVisibleItems: null,

		/**
		 * Current active page.
		 * @type {Number}
		 */
		visiblePage: 1,

		/**
		 * Whether to show all records.
		 * @type {Boolean}
		 */
		showAll: false,

		/**
		 * @inheritdoc  Terrasoft.controls.ContainerList#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var gridBindConfig = {
				maxVisibleItems: {
					changeMethod: "setMaxVisibleItems"
				},
				showAll: {
					changeMethod: "setShowAll"
				}
			};
			return Ext.apply(gridBindConfig, bindConfig);
		},

		/**
		 * @inheritdoc Terrasoft.controls.ContainerList#getItemView
		 * @overridden
		 */
		getItemView: function(item) {
			var view = this.callParent(arguments);
			if (!this.collection) {
				return view;
			}
			var index = this.collection.indexOf(item);
			if (!this.getElementIsVisibleByIndex(index)) {
				view.visible = false;
			}
			return view;
		},

		/**
		 * @inheritdoc  Terrasoft.controls.ContainerList#getItemView
		 * @overridden
		 */
		onDeleteItem: function() {
			this.callParent(arguments);
			this.updateItemsVisible();
		},

		/**
		 * Sets the number of visible items.
		 * @param {Number} count The number of visible items.
		 */
		setMaxVisibleItems: function(count) {
			this.maxVisibleItems = count;
			this.updateItemsVisible();
		},

		/**
		 * Sets showAll property and update items visibility.
		 * @param {Boolean} isShowAll Show all items or reduced to a certain amount.
		 */
		setShowAll: function(isShowAll) {
			this.showAll = isShowAll;
			this.updateItemsVisible();
		},

		/**
		 * Updates the visibility of all elements of the collection.
		 * @protected
		 */
		updateItemsVisible: function() {
			this.items.each(this.setElementVisible, this);
		},

		/**
		 * Sets the visibility of the element.
		 * @protected
		 * @param {Object} item Element of the collection (this.collection).
		 */
		setElementVisible: function(item) {
			var index = this.items.indexOf(item);
			var isVisible = this.getElementIsVisibleByIndex(index);
			item.setVisible(isVisible);
		},

		/**
		 * Returns true if element is must be hidden.
		 * @protected
		 * @param {Number} elementIndex Index of the element collection.
		 * @return {Boolean} Return true if element is must be hidden.
		 */
		getElementIsVisibleByIndex: function(elementIndex) {
			var isHidden = (elementIndex >= this.visiblePage * this.maxVisibleItems) && !this.showAll;
			return this.maxVisibleItems && isHidden ? false : true;
		}
	});
	return Terrasoft.ContainerListPagination;
});


