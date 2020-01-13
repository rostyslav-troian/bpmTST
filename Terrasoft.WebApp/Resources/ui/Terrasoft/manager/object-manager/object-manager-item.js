/**
 * @abstract
 */
Ext.define("Terrasoft.manager.ObjectManagerItem", {
	extend: "Terrasoft.manager.BaseManagerItem",
	alternateClassName: "Terrasoft.ObjectManagerItem",

	//region Properties: Protected

	/**
	 * Manager element.
	 * @protected
	 * @property {Object} propertyColumnNames
	 */
	dataManagerItem: null,

	/**
	 * Columns to force update package data.
	 * @protected
	 * @type {Array}
	 */
	forceUpdateColumns: null,

	// endregion
	//region Properties: Private

	/**
	 * Object matching properties to columns.
	 * @private
	 * @property {Object} propertyColumnNames
	 */
	propertyColumnNames: null,

	/**
	 * Lazy loading property names.
	 * @private
	 * @property {Array} lazyLoadingProperties
	 */
	lazyLoadingProperties: null,

	/**
	 * Loaded lazy properties.
	 * @private
	 * @property {Array} loadedLazyProperties
	 */
	loadedLazyProperties: [],

	// endregion

	//region Methods: Private

	/**
	 * Set the properties of the object in accordance with the instance dataManagerItem.
	 * @private
	 * @param dataManagerItem Incoming data.
	 */
	setProperties: function(dataManagerItem) {
		var dataManagerItemValues = dataManagerItem.getValues();
		Terrasoft.each(this.propertyColumnNames, function(columnName, propertyName) {
			this[propertyName] = dataManagerItemValues[columnName];
		}, this);
	},

	/**
	 * Returns unloaded lazy loading properties.
	 * @private
	 * @return {Array} Unloaded lazy loading properties.
	 */
	getUnloadedLazyLoadingProperties: function() {
		return Ext.Array.difference(this.lazyLoadingProperties || [], this.loadedLazyProperties);
	},

	// endregion

	//region Methods: Public

	/**
	 * Initializes the properties of the manager element.
	 * @param {Object} config A configuration object.
	 * @param {Terrasoft.DataManagerItem} config.dataManagerItem The data manager element.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.setProperties(config.dataManagerItem);
	},

	/**
	 * Sets the value of the element.
	 * @param {String} propertyName Property name.
	 * @param {Object} propertyValue Value.
	 */
	setPropertyValue: function(propertyName, propertyValue) {
		this[propertyName] = propertyValue;
		var columnName = this.propertyColumnNames[propertyName];
		if (!columnName) {
			throw new Terrasoft.NullOrEmptyException();
		}
		this.dataManagerItem.setColumnValue(columnName, propertyValue);
	},

	/**
	 * Sets force update column.
	 * @param {String[]} value Value.
	 */
	setForceUpdateColumns: function(value) {
		this.forceUpdateColumns = Ext.clone(value);
	},

	/**
	 * Returns property value.
	 * @throws {Terrasoft.InvalidOperationException}
	 * Throws exception {@link Terrasoft.InvalidOperationException} if lazy columns data is not loaded.
	 * @param {String} propertyName Property name.
	 * @return {String} Property value.
	 */
	getPropertyValue: function(propertyName) {
		var unloadedLazyLoadingProperties = this.getUnloadedLazyLoadingProperties();
		if (unloadedLazyLoadingProperties.indexOf(propertyName) > -1) {
			throw new Terrasoft.InvalidOperationException();
		}
		return this[propertyName];
	},

	/**
	 * Sets indicator that the element is removed.
	 */
	remove: function() {
		this.callParent(arguments);
		this.dataManagerItem.remove();
	},

	/**
	 * Saves manager items changes.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	save: function(callback, scope) {
		this.dataManagerItem.save(callback, scope);
	},

	/**
	 * Discards changes in element.
	 */
	discard: function() {
		var resultDataItem = Terrasoft.DataManager.discardItem(this.dataManagerItem);
		this.dataManagerItem = resultDataItem;
		if (resultDataItem) {
			this.setProperties(resultDataItem);
		} else {
			this.destroy();
		}
	},

	/**
	 * Returns indication that the element is new.
	 * @return {Boolean} Indication value.
	 */
	getIsNew: function() {
		return this.dataManagerItem.getIsNew();
	},

	/**
	 * Returns indication that the element is changed.
	 * @return {Boolean}
	 */
	getIsChanged: function() {
		return this.dataManagerItem.getIsChanged();
	},

	/**
	 * Gets data manager item.
	 * @return {Terrasoft.DataManagerItem} Data manager item.
	 */
	getDataManagerItem: function() {
		return this.dataManagerItem;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseManagerItem#getSerializedPropertiesConfig
	 * @override
	 */
	getSerializedPropertiesConfig: function() {
		var config = this.callParent(arguments);
		Ext.apply(config, {
			"propertyColumnNames": {},
			"dataManagerItem": {
				isCopy: false,
				defCopyValue: this.dataManagerItem.copy()
			}
		});
		return config;
	},

	/**
	 * Loads lazy properties data.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	loadLazyPropertiesData: function(callback, scope) {
		var unloadedLazyLoadingProperties = this.getUnloadedLazyLoadingProperties();
		if (unloadedLazyLoadingProperties.length > 0) {
			this.dataManagerItem.reload(function() {
				this.setProperties(this.dataManagerItem);
				this.loadedLazyProperties = Terrasoft.deepClone(this.lazyLoadingProperties);
				Ext.callback(callback, scope);
			}, this);
		} else {
			Ext.callback(callback, scope);
		}
	}

	// endregion

});
