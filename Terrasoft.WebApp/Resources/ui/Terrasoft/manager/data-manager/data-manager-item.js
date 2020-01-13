/**
 * @abstract
 */
Ext.define("Terrasoft.manager.DataManagerItem", {
	extend: "Terrasoft.BaseManagerItem",
	alternateClassName: "Terrasoft.DataManagerItem",

	//region Properties: Private

	/**
	 * View model link.
	 * @private
	 * @property {String} viewModel
	 */
	viewModel: null,

	//endregion

	//region Methods: Public

	/**
	 * Creates instance.
	 * @param {Object} config Configuration object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var viewModel = config.viewModel;
		if (!viewModel) {
			throw new Terrasoft.NullOrEmptyException();
		}
		this.viewModel = viewModel;
		this.id = config.id || viewModel.get("Id");
	},

	/**
	 * Destroy viewModel.
	 */
	onDestroy: function() {
		this.viewModel.destroy();
		this.callParent(arguments);
	},

	/**
	 * Sets column value.
	 * @param {String} columnName Column name.
	 * @param {Mixed} columnValue Value.
	 */
	setColumnValue: function(columnName, columnValue) {
		this.viewModel.set(columnName, columnValue);
	},

	/**
	 * Returns column value.
	 * @param {String} columnName Column name.
	 * @return {Mixed}
	 */
	getColumnValue: function(columnName) {
		return this.viewModel.get(columnName);
	},

	/**
	 * Returns previous column value.
	 * @param {String} columnName Column name.
	 * @return {Mixed} Previous column value.
	 */
	getPreviousColumnValue: function(columnName) {
		return this.viewModel.getPrevious(columnName);
	},

	/**
	 * Returns viewModel column by name.
	 * @param {String} columnName Column name.
	 * @return {Object} Column.
	 */
	getColumnByName: function(columnName) {
		return this.viewModel.columns[columnName];
	},

	/**
	 * Returns column values.
	 * @return {Object}
	 */
	getValues: function() {
		var values = {};
		var columns = this.viewModel.columns;
		Terrasoft.each(columns, function(column, columnName) {
			values[columnName] = this.viewModel.get(columnName);
		}, this);
		return values;
	},

	/**
	 * Returns save query.
	 * @return {Terrasoft.BaseQuery} Save query element data.
	 */
	getSaveQuery: function() {
		if (this.isDeleted) {
			if (!this.getIsNew()) {
				const query = this.viewModel.getDeleteQuery();
				const primaryColumnValue = this.viewModel.get(this.viewModel.primaryColumnName);
				query.enablePrimaryColumnFilter(primaryColumnValue);
				return query;
			}
			else {
				return null;
			}
		} else {
			return this.viewModel.getSaveQuery();
		}
	},

	/**
	 * Marks element as removed.
	 */
	remove: function() {
		this.isDeleted = true;
		this.viewModel.isDeleted = true;
	},

	/**
	 * Discards element changes.
	 */
	discard: function() {
		if (this.getIsNew()) {
			throw Terrasoft.InvalidOperationException();
		}
		this.isDeleted = false;
		this.viewModel.isDeleted = false;
		this.viewModel.changedValues = null;
		var values = this.viewModel.values;
		Terrasoft.each(values, function(columnValue, columnName) {
			this.setColumnValue(columnName, columnValue);
		}, this);
	},

	/**
	 * Save changes.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback scope.
	 * @return {Object} Server response.
	 */
	save: function(callback, scope) {
		var saveQuery = this.getSaveQuery();
		saveQuery.execute(function(response) {
			callback.call(scope, response);
		}, this);
	},

	/**
	 * Returns indication that the element is new.
	 * @return {Boolean} Indication value.
	 */
	getIsNew: function() {
		return this.viewModel.isNew;
	},

	/**
	 * Returns indication that the element is changed.
	 * @return {Boolean} Indication value.
	 */
	getIsChanged: function() {
		return this.viewModel.getIsChanged();
	},

	/**
	 * Marks element as saved.
	 */
	setIsSaved: function() {
		this.viewModel.isNew = false;
		var values = this.viewModel.changedValues;
		if (!this.viewModel.values) {
			this.viewModel.values = {};
		}
		var modelValues = this.viewModel.values;
		Terrasoft.each(values, function(columnValue, columnName) {
			modelValues[columnName] = columnValue;
		}, this);
		this.viewModel.changedValues = null;
	},

	/**
	 * Returns entity schema element name.
	 * @return {String} Entity schema element name.
	 */
	getEntitySchemaName: function() {
		return this.viewModel.entitySchema.name;
	},

	/**
	 * Returns entity schema element caption.
	 * @return {String} Entity schema element caption.
	 */
	getEntitySchemaCaption: function() {
		return this.viewModel.entitySchema.caption;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManagerItem#getSerializedPropertiesConfig
	 * @override
	 */
	getSerializedPropertiesConfig : function() {
		var config = this.callParent(arguments);
		var viewModel = this.viewModel;
		var copyViewModel = Ext.create("Terrasoft.BaseViewModel", {
			entitySchema: viewModel.entitySchema,
			columns: Terrasoft.deepClone(viewModel.columns)
		});
		Terrasoft.each(copyViewModel.columns, function(column, columnName) {
			copyViewModel.set(columnName, Terrasoft.deepClone(viewModel.get(columnName)));
		});
		copyViewModel.set(copyViewModel.entitySchema.primaryColumnName, Terrasoft.generateGUID());
		Ext.apply(config, {
			"id": {
				isCopy: false,
				defCopyValue: copyViewModel.get(copyViewModel.entitySchema.primaryColumnName)
			},
			"viewModel": {
				isCopy: false,
				defCopyValue: copyViewModel
			}
		});
		return config;
	},

	/**
	 * Reloads entity.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	reload: function(callback, scope) {
		if (this.getIsNew()) {
			callback.call(scope);
		} else {
			this.viewModel.loadEntity(this.id, function() {
				callback.call(scope);
			}, this);
		}
	}

	//endregion

});
