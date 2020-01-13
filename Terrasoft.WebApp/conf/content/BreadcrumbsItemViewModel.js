Terrasoft.configuration.Structures["BreadcrumbsItemViewModel"] = {innerHierarchyStack: ["BreadcrumbsItemViewModel"]};
/**
 * View model for breadcrumbs item in container list.
 */
define("BreadcrumbsItemViewModel", [], function() {
	/**
	 * @class Terrasoft.configuration.BreadcrumbsItemViewModel
	 */
	 Ext.define("Terrasoft.configuration.BreadcrumbsItemViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.BreadcrumbsItemViewModel",
		attributes: {
			/**
			 * Breadcrumbs item identifier.
			 * @type {String}
			 */
			"Id": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Breadcrumbs item caption.
			 * @type {String}
			 */
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "breadcrumbs"
			},
			/**
			 * Defines if item is currently selected.
			 * @type {String}
			 */
			"IsSelected": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Defines if first breadcrumbs item has parent.
			 * @type {String}
			 */
			"IsItemHasParent": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		 /**
		  * Wrap classes.
		  * @type {Object}
		  * @virtual
		  */
		 wrapClassNames: {
			 itemContainer: "breadcrumbs-item-container",
			 itemCaption: "breadcrumbs-item-caption",
			 itemCaptionSelected: "breadcrumbs-item-caption-selected",
			 itemDivider: "breadcrumbs-item-divider",
			 itemDots: "breadcrumbs-item-dots"
		 },

		 /**
		  * Returns data item marker of the current clickable item.
		  * @private
		  */
		 _getMarkerValue: function() {
			 return "breadcrumbs-item-" + this.$Caption.toLowerCase();
		 },

		 /**
		  * Handler for breadcrumbs item selected event.
		  * @protected
		  */
		 onBreadcrumbsItemClick: function() {
			this.sandbox.publish("SetContentItemSelected", this.$Id, ["BreadcrumbsPanel"]);
		 },

		/**
		 * @protected
		 * @returns {Object} Item view config.
		 */
		getViewConfig: function(isItemSelected) {
			var viewConfig = {
				className: "Terrasoft.Container",
				classes: { wrapClassName: [this.wrapClassNames.itemContainer] },
				items: []
			};
			if (isItemSelected) {
				viewConfig.items.push({
					className: "Terrasoft.Label",
					caption: "$Caption",
					classes: { labelClass: [this.wrapClassNames.itemCaptionSelected] }
				});
			} else {
				viewConfig.items.push({
					className: "Terrasoft.Label",
					caption: "...",
					visible: "$IsItemHasParent",
					classes: { labelClass: [this.wrapClassNames.itemDots] }
				});
				viewConfig.items.push({
					className: "Terrasoft.Label",
					caption: "$Caption",
					click: "$onBreadcrumbsItemClick",
					markerValue: "$_getMarkerValue",
					classes: { labelClass: [this.wrapClassNames.itemCaption] }
				});
				viewConfig.items.push({
					className: "Terrasoft.Label",
					caption: ">",
					classes: { labelClass: [this.wrapClassNames.itemDivider] }
				});
			}
			return viewConfig;
		}
	});
});


