/**
 * @class Terrasoft.core.mixins.RelatedEntityColumns
 * Mixin implements the loading of related (lookup) entity columns.
 */
Ext.define("Terrasoft.core.mixins.RelatedEntityColumns", {
	alternateClassName: "Terrasoft.RelatedEntityColumns",

	//region Methods: Private

	/**
	 * @private
	 * @param {Object} column
	 * @param {Object} column.lookupListConfig
	 * @param {Object} column.lookupListConfig.columns
	 * @return {String[]}
	 */
	_getLookupListColumnsByColumn: function(column) {
		const lookupListConfig = column.lookupListConfig || {};
		return lookupListConfig.columns || [];
	},

	/**
	 * @private
	 * @param {Object} column
	 * @param {Terrasoft.ViewModelColumnType} column.type
	 * @return {Boolean}
	 */
	_isEntityColumn: function(column) {
		return column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
	},

	/**
	 * Returns related column full name.
	 * @private
	 * @param {String} entityColumn Entity column.
	 * @param {String} relatedColumn Entity related column.
	 * @return {String} Related full column name.
	 */
	_getRelatedColumnName: function(entityColumn, relatedColumn) {
		return Ext.String.format("{0}.{1}", entityColumn, relatedColumn);
	},

	/**
	 * @private
	 */
	_getIsDisabled: function() {
		return Terrasoft.Features.getIsDisabled("LoadLookupColumnsInEditGrid");
	},

	// endregion

	//region Methods: Public

	/**
	 * Adds related columns to entity schema query.
	 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
	 * @param {Object} entityColumns Columns.
	 */
	addRelatedEsqColumns: function(esq, entityColumns) {
		if (this._getIsDisabled()) {
			return;
		}
		Terrasoft.each(entityColumns, function(column, columnName) {
			if (!this._isEntityColumn(column)) {
				return;
			}
			const lookupListConfig = column.lookupListConfig || {};
			const lookupColumns = lookupListConfig.columns || [];
			lookupColumns.forEach(function(lookupColumnPath) {
				const columnPath = Ext.String.format("{0}.{1}", columnName, lookupColumnPath);
				if (!esq.columns.contains(lookupColumnPath)) {
					esq.addColumn(columnPath);
				}
			});
		}, this);
	},

	/**
	 * Copy related columns from entityColumns to destinationColumns.
	 * @param {Object} sourceColumns Entity columns.
	 * @param {Object} destinationColumns Destination columns.
	 */
	copyRelatedColumns: function(sourceColumns, destinationColumns) {
		if (this._getIsDisabled()) {
			return;
		}
		Terrasoft.each(sourceColumns, function(column, columnName) {
			if (!this._isEntityColumn(column)) {
				return;
			}
			const sourceLookupColumns = this._getLookupListColumnsByColumn(column);
			if (sourceLookupColumns.length === 0) {
				return;
			}
			destinationColumns[columnName] = destinationColumns[columnName] || Terrasoft.deepClone(column);
			const destinationColumn = destinationColumns[columnName];
			const lookupListConfig = destinationColumn.lookupListConfig = destinationColumn.lookupListConfig || {};
			const destinationLookupColumns = lookupListConfig.columns = lookupListConfig.columns || [];
			lookupListConfig.columns = Ext.Array.merge(destinationLookupColumns, sourceLookupColumns);
		}, this);
	},


	/**
	 * Sets related column values to attributes.
	 * @param {Terrasoft.BaseViewModel} viewModel Entity instance.
	 * @param {Object} entityColumns Entity columns.
	 */
	setRelatedColumnsValues: function(viewModel, entityColumns) {
		if (this._getIsDisabled()) {
			return;
		}
		Terrasoft.each(entityColumns, function(column) {
			const lookupListConfig = column.lookupListConfig || {};
			const columns = lookupListConfig.columns || [];
			if (columns.length === 0 || !this._isEntityColumn(column)) {
				return;
			}
			const columnName = column.name;
			const lookupValue = viewModel.get(columnName);
			if (Ext.isEmpty(lookupValue)) {
				return;
			}
			Terrasoft.each(columns, function(lookupColumnName) {
				const relatedColumnName = this._getRelatedColumnName(columnName, lookupColumnName);
				lookupValue[lookupColumnName] = viewModel.get(relatedColumnName);
			}, this);
		}, this);
	}

	// endregion
});
