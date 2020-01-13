Ext.ns("Terrasoft.core");
/**
 * System settings.
 * @alias Terrasoft.SysSettings
 * @singleton
 */
Ext.define("Terrasoft.core.SysSettings", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SysSettings",
	singleton: true,

	/**
	 * Collection of loaded settings.
	 * @private
	 * @type {Object}
	 */
	cachedSettings: null,

	/**
	 * @private
	 * @type {Array}
	 */
	_invalidSettingsCacheItems: null,

	/**
	 * Method name for saving multiple system settings.
	 * @private
	 * @type {String}
	 */
	postValuesMethodName: "PostSysSettingsValues",

	/**
	 * Method name for loading system settings values.
	 * @type {String}
	 */
	querySettingsMethodName: "QuerySysSettings",

	/**
	 * Method name for loading system settings rights.
	 * @type {String}
	 */
	querySettingsRightsMethodName: "GetSysSettingsRightsRequest",

	/**
	 * Method name for sets system settings rights.
	 * @type {String}
	 */
	setSettingsRightsMethodName: "SetSysSettingsRightsRequest",

	/**
	 * The number of default strings that are loaded for the lookup column.
	 * @type {Number}
	 */
	lookupRowCount: 15,

	/**
	 * The type of filter used for the DisplayColumnValue, when loading data for a column lookup.
	 * @type {Terrasoft.ComparisonType}
	 */
	lookupFilterType: Terrasoft.ComparisonType.START_WITH,

	/**
	 * @param {String} settingsCode
	 * @returns {Boolean}
	 * @private
	 */
	_isInvalidCacheItem: function(settingsCode) {
		if (!this._invalidSettingsCacheItems) {
			return false;
		}
		return this._invalidSettingsCacheItems.indexOf(settingsCode) >= 0;
	},

	/**
	 * @param {String} settingsCode
	 * @private
	 */
	_addInvalidCacheItem: function(settingsCode) {
		if (!this._invalidSettingsCacheItems) {
			this._invalidSettingsCacheItems = [];
		}
		if (this._invalidSettingsCacheItems.indexOf(settingsCode) < 0) {
			this._invalidSettingsCacheItems.push(settingsCode);
		}
	},

	/**
	 * @param {String} settingsCode
	 * @private
	 */
	_removeInvalidCacheItem: function(settingsCode) {
		if (this._invalidSettingsCacheItems) {
			const itemIndex = this._invalidSettingsCacheItems.indexOf(settingsCode);
			if (itemIndex >= 0) {
				this._invalidSettingsCacheItems.splice(itemIndex, 1);
			}
		}
	},

	/**
	 * Handles the message of system settings changes.
	 * @param {Terrasoft.ServerChannel} channel Channel messaging server.
	 * @param {Object} message Channel message.
	 * @param {Object} message.Header Header of the message.
	 * @param {Object} message.Body Body of the message.
	 * @private
	 */
	_onSysSettingsChanged: function(channel, {Header: header, Body: settingsCode} = {}) {
		if (header && header.Sender === "SysSettingsChanged") {
			this._addInvalidCacheItem(settingsCode);
		}
	},

	/**
	 * Creates an object for storing and retrieving settings.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.cachedSettings = {};
		const preLoadedSysSettings = Terrasoft.preLoadedSysSettings;
		if (preLoadedSysSettings) {
			for (var itemName in preLoadedSysSettings) {
				const item = preLoadedSysSettings[itemName];
				const itemDataValueTypeName = item.dataValueTypeName;
				if (itemDataValueTypeName) {
					item.dataValueType = Terrasoft.DataValueType[itemDataValueTypeName];
				}
				if (item.isCacheable) {
					this.cachedSettings[itemName] = this.getValue(item);
				}
			}
		}
		Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this._onSysSettingsChanged, this);
	},

	/**
	 * Updates the system's cache. The values of only those settings that are already contained in the cache
	 * are updated.
	 * @param {Object} updateCacheConfig A value object for system settings, where the property name is
	 * the system setting code, and the property value is the new value.
	 * @private
	 */
	updateCachedValues: function(updateCacheConfig) {
		const cachedSettings = this.cachedSettings;
		Terrasoft.each(updateCacheConfig, function(value, code) {
			const item = cachedSettings[code];
			if (item !== undefined) {
				cachedSettings[code] = Terrasoft.deepClone(value);
			}
		}, this);
	},

	/**
	 * Returns the value of the system setting.
	 * @param {Object} sysSettingConfig System configuration object returned by the server
	 * @param {Terrasoft.core.enums.DataValueType} sysSettingConfig.dataValueType The type of system setting.
	 * @param {Object} sysSettingConfig.value The value of the system setting.
	 * @param {String} sysSettingConfig.displayValue The displayed value of the system setting is a directory type.
	 * @return {Object} The value of the system setting.
	 * @private
	 */
	getValue: function(sysSettingConfig) {
		const itemDataValueType = sysSettingConfig.dataValueType;
		let itemValue = sysSettingConfig.value;
		if (Terrasoft.isDateDataValueType(itemDataValueType)) {
			itemValue = Ext.isEmpty(itemValue) ? null : Terrasoft.parseDate(itemValue);
		} else if (Terrasoft.isLookupDataValueType(itemDataValueType)) {
			itemValue = Ext.isEmpty(itemValue)
				? null
				: {value: itemValue, displayValue: sysSettingConfig.displayValue};
		}
		return itemValue;
	},

	/**
	 * Asynchronously save the system setting value.
	 * @private
	 * @param {Object} data The configuration object with the system settings parameters.
	 * @param {Object} data.sysSettingsValues The value for setting system settings, where the property name is
	 * the system setting code, and the property value is the new value.
	 * @param {Boolean} data.isPersonal Indicates that the values should be stored as personal values.
	 * @param {Function} callback function that will be called when the installation request completes.
	 * @param {Object} scope Context in which the callback function will be called.
	 */
	updateSysSettingsValue: function(data, callback, scope) {
		const postData = {
			isPersonal: (data.isPersonal === true)
		};
		const sysSettingsValues = data.sysSettingsValues;
		const postSysSettingsValues = postData.sysSettingsValues = {};
		Terrasoft.each(sysSettingsValues, function(sysSettingValue, sysSettingCode) {
			let value;
			if (Ext.isDate(sysSettingValue)) {
				value = Terrasoft.encodeDate(sysSettingValue);
			} else if (Ext.isObject(sysSettingValue)) {
				value = sysSettingValue.value;
			} else {
				value = sysSettingValue;
			}
			postSysSettingsValues[sysSettingCode] = value;
		}, this);
		Terrasoft.ServiceProvider.executeRequest(this.postValuesMethodName, postData, function(result) {
			if (result.success) {
				this.updateCachedValues(sysSettingsValues);
			}
			Ext.callback(callback, scope || this, [result]);
		}, this);
	},

	/**
	 * Sends a request to the server to receive system configuration data.
	 * @private
	 * @param {Array} sysSettingsNameArray An array of configuration names to retrieve
	 * @param {Function} callback function that will be called when a response from the server is received
	 * @param {Object} scope The context in which the callback function is called
	 * @param {Object} foundItems Cached items that will be added to the result
	 * @param {Boolean} isSingleItem if true - the value of the first element will be passed to parameter of the callback
	 * function
	 */
	querySysSetting: function(sysSettingsNameArray, callback, scope, foundItems, isSingleItem) {
		const data = {
			sysSettingsNameCollection: Ext.Array.from(sysSettingsNameArray)
		};
		const internalCallback = function(result) {
			const values = result.values;
			const returnValues = foundItems || {};
			Terrasoft.each(values, function(item, itemName) {
				const value = this.getValue(item);
				if (item.isCacheable) {
					this.cachedSettings[itemName] = value;
				} else {
					delete this.cachedSettings[itemName];
				}
				if (this._isInvalidCacheItem(itemName)) {
					this._removeInvalidCacheItem(itemName);
				}
				returnValues[itemName] = value;
			}, this);
			if (Ext.isFunction(callback)) {
				if (isSingleItem) {
					callback.call(scope || this, returnValues[sysSettingsNameArray[0]]);
				} else {
					callback.call(scope || this, returnValues);
				}
			}
		};
		Terrasoft.ServiceProvider.executeRequest(this.querySettingsMethodName, data, internalCallback, this);
	},

	/**
	 * Queries system settings raw data without client cache.
	 * @param {Array} names An array of configuration names to retrieve.
	 * @param {Function} callback The function to be called when a response is received from the server.
	 * @param {Object} callback.value System setting value.
	 * @param {Object} scope The context in which the callback function is called.
	 */
	querySysSettingsRaw: function(names, callback, scope) {
		Terrasoft.ServiceProvider.executeRequest(this.querySettingsMethodName, {
			sysSettingsNameCollection: names
		}, callback, scope);
	},

	/**
	 * Asynchronously receive a system setting element.
	 * @param {String} sysSettingsItemName System setting name.
	 * @param {Function} callback function that will be called to return the configuration object.
	 * @param {Object} [scope] The context in which the callback function will be called.
	 */
	querySysSettingsItem: function(sysSettingsItemName, callback, scope) {
		if (this.cachedSettings.hasOwnProperty(sysSettingsItemName) && !this._isInvalidCacheItem(sysSettingsItemName)) {
			callback.call(scope || this, this.cachedSettings[sysSettingsItemName]);
			return;
		}
		this.querySysSetting([sysSettingsItemName], callback, scope, null, true);
	},

	/**
	 * Get cached system setting synchronously.
	 * @param {String} sysSettingsName System setting name.
	 * @deprecated
	 * @return {Object} Cached system setting.
	 */
	getCachedSysSetting: function(sysSettingsName) {
		return this.cachedSettings[sysSettingsName];
	},

	/**
	 * Asynchronously get the system setup item.
	 * @param {Array} sysSettingsNameArray An array of configuration names to retrieve.
	 * @param {Function} callback The function that will be called to return the configuration object.
	 * @param {Object} [scope] The context in which the callback function will be called.
	 */
	querySysSettings: function(sysSettingsNameArray, callback, scope) {
		const arrayToQuery = Terrasoft.deepClone(sysSettingsNameArray);
		const foundItems = {};
		Terrasoft.each(sysSettingsNameArray, function(itemName) {
			const item = this.cachedSettings[itemName];
			if (item !== undefined && !this._isInvalidCacheItem(itemName)) {
				foundItems[itemName] = item;
				arrayToQuery.splice(arrayToQuery.indexOf(itemName), 1);
			}
		}, this);
		if (arrayToQuery.length === 0) {
			callback.call(scope || this, foundItems);
			return;
		}
		this.querySysSetting(arrayToQuery, callback, scope, foundItems, false);
	},

	/**
	 * Asynchronously save a system setting value.
	 * @param {String} code System setting code.
	 * @param {Object} value System setting value.
	 * @param {Function} callback function that will be called when the installation request completes.
	 * @param {Object} scope The context in which the callback function will be called.
	 * @deprecated Version 7.6.0 Use the {@link #postSysSettingsValues} method to set value.
	 */
	postSysSettingsValue: function(code, value, callback, scope) {
		const data = {
			sysSettingsValues: {},
			isPersonal: false
		};
		data.sysSettingsValues[code] = value;
		this.updateSysSettingsValue(data, callback, scope);
	},

	/**
	 * Asynchronously store the personal value of the system setting.
	 * @param {String} code System setting code.
	 * @param {Object} value The value to set.
	 * @param {Function} callback The function that will be called when the installation request completes.
	 * @param {Object} scope The context in which the callback function will be called.
	 * @deprecated Version 7.6.0 Use the {@link #postSysSettingsValues} method to set the value.
	 */
	postPersonalSysSettingsValue: function(code, value, callback, scope) {
		const data = {
			sysSettingsValues: {},
			isPersonal: true
		};
		data.sysSettingsValues[code] = value;
		this.updateSysSettingsValue(data, callback, scope);
	},

	/**
	 * Asynchronously saves the values of several system settings.
	 * @param {Object} data Configuration object.
	 * @param {Object} data.sysSettingsValues The value for setting system settings, where the property name is
	 * the system setting code, and the property value is the new value.
	 * @param {Boolean} data.isPersonal Indicates that the values should be stored as personal values.
	 * @param {Function} callback function that will be called when the installation request completes.
	 * @param {Object} scope The context in which the callback function will be called.
	 */
	postSysSettingsValues: function(data, callback, scope) {
		this.updateSysSettingsValue(data, callback, scope);
	},

	/**
	 * Returns settings rights operation names.
	 * @param {String} sysSettingsCode Settings code.
	 * @return {Promise<Object>} result Settings rights operation names.
	 * @return {String} result.readOperationCode Code of the read operation.
	 * @return {String} result.readWriteOperationCode Code of the read-write operation.
	 */
	getSysSettingsRightsAsync: async function({sysSettingsCode}) {
		const request = Ext.create("Terrasoft.ParametrizedRequest", {
			contractName: this.querySettingsRightsMethodName,
			config: {sysSettingsCode}
		});
		const {success, readOperationCode, readWriteOperationCode} = await request.executeAsync();
		if (!success) {
			return {readOperationCode: null, readWriteOperationCode: null};
		}
		return {readOperationCode, readWriteOperationCode};
	},

	/**
	 * Sets settings rights operation names.
	 * @param {Object} config Settings config.
	 * @param {String} config.sysSettingsCode Settings code.
	 * @param {String} config.readOperationCode Read operation name.
	 * @param {String} config.readWriteOperationCode ReadWrite operation name.
	 * @return {Promise} Resolves promise if system settings rights was successfully set.
	 */
	setSysSettingsRightsAsync: async function({sysSettingsCode, readOperationCode, readWriteOperationCode}) {
		const request = Ext.create("Terrasoft.ParametrizedRequest", {
			contractName: this.setSettingsRightsMethodName,
			config: {sysSettingsCode, readOperationCode, readWriteOperationCode}
		});
		const {success} = await request.executeAsync();
		if (!success) {
			throw new Error(new Terrasoft.ItemNotFoundException());
		}
	},

	/**
	 * Returns an object of system setting types.
	 * @return {Object} Returns an object of sort types.
	 */
	getTypes: function() {
		return {
			"Binary": {
				value: "Binary",
				displayValue: Terrasoft.Resources.DataValueType.BLOB
			},
			"Boolean": {
				value: "Boolean",
				displayValue: Terrasoft.Resources.DataValueType.BOOLEAN
			},
			"DateTime": {
				value: "DateTime",
				displayValue: Terrasoft.Resources.DataValueType.DATE_TIME
			},
			"Date": {
				value: "Date",
				displayValue: Terrasoft.Resources.DataValueType.DATE
			},
			"Time": {
				value: "Time",
				displayValue: Terrasoft.Resources.DataValueType.TIME
			},
			"Integer": {
				value: "Integer",
				displayValue: Terrasoft.Resources.DataValueType.INTEGER
			},
			"Money": {
				value: "Money",
				displayValue: Terrasoft.Resources.DataValueType.MONEY
			},
			"Float": {
				value: "Float",
				displayValue: Terrasoft.Resources.DataValueType.FLOAT
			},
			"Lookup": {
				value: "Lookup",
				displayValue: Terrasoft.Resources.DataValueType.LOOKUP
			},
			"ShortText": {
				value: "ShortText",
				displayValue: Terrasoft.Resources.DataValueType.SHORT_TEXT
			},
			"MediumText": {
				value: "MediumText",
				displayValue: Terrasoft.Resources.DataValueType.MEDIUM_TEXT
			},
			"LongText": {
				value: "LongText",
				displayValue: Terrasoft.Resources.DataValueType.LONG_TEXT
			},
			"Text": {
				value: "Text",
				displayValue: Terrasoft.Resources.DataValueType.TEXT
			},
			"MaxSizeText": {
				value: "MaxSizeText",
				displayValue: Terrasoft.Resources.DataValueType.MAXSIZE_TEXT
			},
			"SecureText": {
				value: "SecureText",
				displayValue: Terrasoft.Resources.DataValueType.SECURE_TEXT
			}
		};
	}

});
