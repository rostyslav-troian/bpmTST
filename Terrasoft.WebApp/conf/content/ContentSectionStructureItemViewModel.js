Terrasoft.configuration.Structures["ContentSectionStructureItemViewModel"] = {innerHierarchyStack: ["ContentSectionStructureItemViewModel"]};
/**
 * View model for content structure item in container list. E.g. column, group.
 */
define("ContentSectionStructureItemViewModel", ["ContentSectionStructureItemViewModelResources",
		"BaseContentStructureItemViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.ContentSectionStructureItemViewModel
		 */
		Ext.define("Terrasoft.configuration.ContentSectionStructureItemViewModel", {
			extend: "Terrasoft.BaseContentStructureItemViewModel",
			alternateClassName: "Terrasoft.ContentSectionStructureItemViewModel",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePrefix
			 * @override
			 */
			markerValuePrefix: "column-item",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#markerValuePostfix
			 * @override
			 */
			markerValuePostfix: "column-item-container",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#itemType
			 * @override
			 */
			itemType: "column",
			/**
			 * @inheritdoc BaseContentStructureItemViewModel#wrapClassNames
			 * @override
			 */
			wrapClassNames: {
				container: "section-column-item-container",
				item: "section-column-item",
				caption: "section-column-caption",
				width: "section-column-width",
				widthContainer: "section-column-width-container"
			},
			columns: {
				"MinWidth": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 5
				},
				"Width": {
					dataValueType: Terrasoft.DataValueType.FLOAT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				"CanChangeWidth": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},

			/**
			 * Returns marker value for the input control of the column width.
			 * @private
			 */
			_getWidthInputMarkerValue: function() {
				return "width-" + this.getLabelMarkerValue();
			},

			/**
			 * @private
			 */
			_getWidthControlConfig: function() {
				return {
					id: "column-width-container",
					className: "Terrasoft.Container",
					classes: { wrapClassName: [this.wrapClassNames.widthContainer] },
					items: [
						{
							className: "Terrasoft.IntegerEdit",
							value: "$Width",
							enabled: "$CanChangeWidth",
							blur: "$onColumnWidthChanged",
							enterkeypressed: "$onColumnWidthChanged",
							markerValue: "$_getWidthInputMarkerValue"
						},
						{
							className: "Terrasoft.Label",
							caption: "%",
							enabled: "$CanChangeWidth"
						}
					]
				};
			},

			/**
			 * Handles width changed event triggered by user.
			 * @protected
			 */
			onColumnWidthChanged: function() {
				if (this.parentViewModel.$IsInUpdateMode) {
					return;
				}
				this.parentViewModel.fireEvent("columnwidthchanged", this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc BaseContentStructureItemViewModel#setCaption
			 * @override
			 */
			setCaption: function(index) {
				var title = resources.localizableStrings.BaseStructureItemTitle;
				this.callParent([index, title]);
			},

			/**
			 * @inheritDoc BaseContentStructureItemViewModel#getBaseStructureItemViewConfig
			 * @override
			 */
			getBaseStructureItemViewConfig: function() {
				var itemViewConfig = this.callParent(arguments);
				var widthControlConfig = this._getWidthControlConfig();
				itemViewConfig.items.push(widthControlConfig);
				return itemViewConfig;
			},

			/**
			 * @inheritDoc BaseContentStructureItemViewModel#getStructureItemConfig
			 * @override
			 */
			getStructureItemConfig: function () {
				var config = this.callParent(arguments);
				config.Width = this.$Width;
				config.RelativeWidth = this.$RelativeWidth;
				return config;
			}

			// #endregion

		});
	}
);


