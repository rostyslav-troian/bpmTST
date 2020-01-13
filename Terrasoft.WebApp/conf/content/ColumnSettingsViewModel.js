Terrasoft.configuration.Structures["ColumnSettingsViewModel"] = {innerHierarchyStack: ["ColumnSettingsViewModel"]};
define("ColumnSettingsViewModel", [], function() {
	/**
	 * @class Terrasoft.ColumnSettingsViewModel
	 * Class that column settings presentation view model.
	 */
	Ext.define("Terrasoft.ColumnSettingsViewModel", {
		extend: "Terrasoft.BaseViewModel",

		/**
		 * @type {Object} Resources.
		 */
		resources: null,

		/**
		 * Gets sandbox instance.
		 * @private
		 * @return {Object} sandbox.
		 */
		getSandbox: function() {
			return this.get("sandbox");
		},

		/**
		 * Gets a collection of column types.
		 * @private
		 */
		getColumnTypes: function() {
			var columnTypes = this.get("columnTypes");
			columnTypes.clear();
			var types = {
				"text": {
					value: Terrasoft.GridCellType.TEXT,
					displayValue: this.resources.localizableStrings.TextCaption
				},
				"title": {
					value: Terrasoft.GridCellType.TITLE,
					displayValue: this.resources.localizableStrings.CaptionCaption
				}
			};
			var referenceSchemaName = this.get("referenceSchemaName");
			var schemaConfig = Terrasoft.configuration.ModuleStructure[referenceSchemaName];
			if (this.get("useLinkType") && schemaConfig) {
				types.link = {
					value: Terrasoft.GridCellType.LINK,
					displayValue: this.resources.localizableStrings.LinkCaption
				};
			}
			columnTypes.loadAll(types);
		},

		/**
		 * Handler of the save button.
		 * @private
		 */
		saveButtonClick: function() {
			var columnConfig = this._getColumnConfig();
			var sandbox = this.getSandbox();
			sandbox.publish("ColumnSetuped", columnConfig, [sandbox.id]);
			if (this.get("isNestedColumnSettingModule")) {
				return;
			}
			sandbox.publish("BackHistoryState");
		},

		/**
		 * Gets column config.
		 * @private
		 * @return {Object} Config of the selected column.
		 */
		_getColumnConfig: function() {
			var filterManager = this.get("filterManager");
			var columnInfo = this.get("columnInfo");
			var selectedColumnType = this.get("selectedColumnType");
			var columnConfig = {
				aggregationType: this._getColumnAggregationType(),
				column: columnInfo.column,
				dataValueType: columnInfo.dataValueType,
				isBackward: columnInfo.isBackward,
				isCaptionHidden: this.get("isCaptionHidden"),
				isTiled: columnInfo.isTiled,
				metaCaptionPath: this.get("columnCaption"),
				referenceSchemaName: columnInfo.referenceSchemaName,
				row: columnInfo.row,
				columnType: selectedColumnType && selectedColumnType.value
				|| Terrasoft.GridCellType.TEXT,
				serializedFilter: filterManager && filterManager.serializeFilters(),
				title: this.get("titleValue"),
				width: columnInfo.width,
				hideFilter: columnInfo.hideFilter,
				leftExpressionColumnPath: columnInfo.leftExpressionColumnPath
			};
			return columnConfig;
		},

		/**
		 * Gets column aggregation type.
		 * @private
		 * @return {Terrasoft.AggregationType} Type of the aggregation function.
		 */
		_getColumnAggregationType: function() {
			var columnInfo = this.get("columnInfo");
			if (columnInfo.isBackward && columnInfo.dataValueType === Terrasoft.DataValueType.GUID) {
				return Terrasoft.AggregationType.NONE;
			}
			var isAggregation = columnInfo.isBackward || columnInfo.aggregationFunction;
			var aggregationType = this.get("functionButtonsGroup");
			return isAggregation ? aggregationType : Terrasoft.AggregationType.NONE;
		},

		/**
		 * Handler of the cancel button.
		 * @private
		 */
		cancelButtonClick: function() {
			var sandbox = this.getSandbox();
			if (this.get("isNestedColumnSettingModule")) {
				sandbox.publish("ColumnSetuped", {}, [sandbox.id]);
				return;
			}
			sandbox.publish("BackHistoryState");
		},

		/**
		 * Sets the visibility of the radio button.
		 * @private
		 */
		showRadioButtons: function() {
			var columnInfo = this.get("columnInfo");
			var dataValueType = columnInfo.dataValueType;
			switch (dataValueType) {
				case Terrasoft.DataValueType.DATE:
				case Terrasoft.DataValueType.DATE_TIME:
				case Terrasoft.DataValueType.TIME:
					this.set("maxContainerRadioButton", true);
					this.set("minContainerRadioButton", true);
					if (!columnInfo.aggregationType) {
						this.set("functionButtonsGroup", Terrasoft.AggregationType.MAX);
					}
					break;
				case Terrasoft.DataValueType.INTEGER:
				case Terrasoft.DataValueType.MONEY:
				case Terrasoft.DataValueType.FLOAT:
					this.set("sumContainerRadioButton", true);
					this.set("avgContainerRadioButton", true);
					this.set("maxContainerRadioButton", true);
					this.set("minContainerRadioButton", true);
					break;
				default:
					break;
			}
		}
	});
	return {};
});


