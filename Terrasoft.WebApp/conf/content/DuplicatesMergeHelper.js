Terrasoft.configuration.Structures["DuplicatesMergeHelper"] = {innerHierarchyStack: ["DuplicatesMergeHelper"]};
define("DuplicatesMergeHelper", function() {

	var duplicatesMergeHelper = Ext.define("Terrasoft.configuration.mixins.DuplicatesMergeHelper", {

		alternateClassName: "Terrasoft.DuplicatesMergeHelper",

		/**
		 * Returns rows that contains unique values.
		 * @param {Array} rows Rows.
		 * @param {Array} columns Columns to filter by.
		 * @param {Boolean} reverse.
		 * @returns {Array} Filtered rows.
		 */
		filterDuplicateRows: function(rows, columns, reverse) {
			if (Ext.isEmpty(rows)) {
				return rows;
			}
			if (reverse === true) {
				rows = rows.reverse();
			}
			var resultRows = [];
			var uniqueValues = {};
			Terrasoft.each(rows, function(row) {
				var containsUniqueValues = false;
				Terrasoft.each(columns, function(columnName) {
					var columnValue = row[columnName];
					if (Ext.isEmpty(columnValue)) {
						return;
					}
					var columnValues = uniqueValues[columnName] || [];
					if (Ext.Array.contains(columnValues, columnValue)) {
						return;
					}
					containsUniqueValues = true;
					columnValues.push(columnValue);
					uniqueValues[columnName] = columnValues;
				}, this);
				if (containsUniqueValues) {
					resultRows.push(row);
				}
			}, this);
			if (resultRows.length !== rows.length || reverse !== true) {
				resultRows = this.filterDuplicateRows(resultRows, columns, true);
			}
			if (reverse === true) {
				resultRows = resultRows.reverse();
			}
			return resultRows;
		},

		/**
		 * Generates config of columns for merge.
		 * @param {Object} conflictColumns Conflict columns.
		 * @returns {Object} Config of columns for merge.
		 */
		getColumnsConfig: function(conflictColumns) {
			var duplicatesSchema = Terrasoft[this.entitySchemaName];
			var primaryColumnName = duplicatesSchema.primaryColumnName;
			var columns = {};
			Terrasoft.each(conflictColumns, function(conflictColumn, itemIndex) {
				var columnName = conflictColumn.Key;
				var column = duplicatesSchema.getColumnByName(columnName);
				columns[columnName] = {
					caption: column.caption,
					dataValueType: column.dataValueType,
					index: itemIndex
				};
			}, this);
			delete columns.CreatedOn;
			return {
				primaryColumnName: primaryColumnName,
				columns: columns
			};
		},

		/**
		 * Normalizes value of dateTime value to YYYY-MM-dd format.
		 * @protected
		 * {string} value DateTime string.
		 * @returns {string} Normalized value.
		 */
		normalizeDateDataTypeColumn: function(value) {
			var conflictColumnDate = value.match("[0-9]{4}-[0-9]{2}-[0-9]{2}");
			if (conflictColumnDate) {
				value = conflictColumnDate[0];
			}
			return value;
		},

		/**
		 * Generates config of the merge module.
		 * @param {Array} conflicts Array of the conflict rows
		 * (Response of the MergeEntityDuplicatesAsync method of DeduplicationService).
		 * @returns {Object} Config for the merge module.
		 */
		getMergeModuleConfig: function(conflicts) {
			var config = this.getColumnsConfig(conflicts[0]);
			var columns = config.columns;
			var primaryColumnName = config.primaryColumnName;
			var resultCollection = [];
			Terrasoft.each(conflicts, function(row) {
				var resultRow = {};
				Terrasoft.each(columns, function(column, columnName) {
					var cell = row[column.index];

					var cellValue = cell.Value;
					if (column.dataValueType === Terrasoft.DataValueType.DATE) {
						cellValue = this.normalizeDateDataTypeColumn(cellValue);
					}
					if (column.dataValueType === Terrasoft.DataValueType.IMAGELOOKUP) {
						cellValue = cellValue.value || Terrasoft.emptyString;
					}
					var value = cellValue.displayValue || cellValue;
					if (!Ext.isEmpty(value)) {
						value = value.toString();
					}
					resultRow[columnName] = value;
				}, this);
				resultCollection.push(resultRow);
			}, this);
			delete columns[primaryColumnName];
			var columnNames = Object.keys(columns);
			config.mergeRecordsCount = resultCollection.length;
			config.rows = this.filterDuplicateRows(resultCollection, columnNames);
			config.columnsCount = columnNames.length;
			return config;
		},

		/**
		 * Parse JSON serialized dictionary to object.
		 * @param {Object} dictionary JSON serialized dictionary.
		 * @returns {Object} result.
		 */
		dictionaryToObject: function(dictionary) {
			var resultObject = {};
			Terrasoft.each(dictionary, function(keyValuePair) {
				resultObject[keyValuePair.Key] = keyValuePair.Value;
			}, this);
			return resultObject;
		}
	});

	return duplicatesMergeHelper;
});


