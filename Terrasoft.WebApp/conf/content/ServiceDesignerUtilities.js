Terrasoft.configuration.Structures["ServiceDesignerUtilities"] = {innerHierarchyStack: ["ServiceDesignerUtilities"]};
define("ServiceDesignerUtilities", ["RightUtilities"], function(RightUtilities) {
	Ext.define("Terrasoft.ServiceDesignerUtilities", {
		singleton: true,

		//region Properties: Private

		/**
		 * @private
		 */

		_sysSettingsInitialized: false,

		//endregion

		//region Methods: Private

		/**
		 * Provides system setting value by name.
		 * @param {String} sysSettingName to find sys settings value.
		 * @private
		 */
		_getSysSettingNameByCode: function(sysSettingName) {
			if (!this._sysSettingsInitialized) {
				throw new Terrasoft.InvalidObjectState();
			}
			var sysSetting = this._sysSettings.findByFn(function(item) {
				return item.$Code === sysSettingName;
			});
			return sysSetting && sysSetting.$Name;
		},

		/**
		 * Loads sys settings using EntitySchemaQuery.
		 * @param {Function} callback.
		 * @param {Object} scope.
		 * @private
		 */
		_getSysSettings: function(callback, scope) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "VwSysSetting"
			});
			esq.addColumn("Code");
			esq.addColumn("Name");
			esq.getEntityCollection(function(result) {
				if (result.success) {
					Ext.callback(callback, scope, [result.collection]);
				} else {
					throw new Terrasoft.QueryExecutionException();
				}
			}, this);
		},

		/**
		 * Provides DataValueType depending on DataValueTypeName.
		 * @param {String} dataValueTypeName.
		 * @returns {Number} value from DataValueType enum.
		 * @private
		 */
		_getDataValueType: function(dataValueTypeName) {
			var dataValueType = false;
			switch(dataValueTypeName.toUpperCase()) {
				case "OBJECT": {
					dataValueType = Terrasoft.DataValueType.CUSTOM_OBJECT;
					break;
				}
				case "DATETIME": {
					dataValueType = Terrasoft.DataValueType.DATE_TIME;
					break;
				}
				default: {
					dataValueType = Terrasoft.DataValueType[dataValueTypeName.toUpperCase()];
				}
			}
			return dataValueType;
		},

		/**
		 * Formats value depending on type.
		 * @param {String} value to format.
		 * @param {Number} type of value from DataValueType enum.
		 * @returns {String} formatted value.
		 * @private
		 */
		_formatValueByType: function(value, type) {
			var valueToFormat = Terrasoft.isDateDataValueType(type) ? new Date(value) : value;
			return Terrasoft.utils.string.getTypedStringValue(valueToFormat, type);
		},

		/**
		 * Provides recursive find search with filter function.
		 * @param {Terrasoft.Collection} items Collection of elements.
		 * @param {String} hierarchicalProperty of property with child items.
		 * @param {Function} filter Function which provide filter features.
		 * @param {Array} accumulator Array of result values.
		 * @returns {Array}
		 * @private
		 */
		_recursiveFind: function(items, hierarchicalProperty, filter, accumulator) {
			var result = accumulator || [];
			var array = items instanceof Terrasoft.Collection || items instanceof Terrasoft.ObjectCollection ?
						items.getItems(): items;
			var recursiveFind =  this._recursiveFind.bind(this);
			if (array && array.length) {
				Array.prototype.forEach.call(array.filter(function(element) {
					if (element && element.hasOwnProperty(hierarchicalProperty)) {
						recursiveFind(element[hierarchicalProperty], hierarchicalProperty,
							filter, result);
					}
					return filter(element);
				}), function(newItem) {
					result.push(newItem);
				});
			}
			return result;
		},

		//endregion

		/**
		 * Initializes sysSettings.
		 * @param {Function} callback.
		 * @param {Object} scope.
		 */
		initSysSettings: function(callback, scope) {
			this._getSysSettings(function(sysSettings) {
				this._sysSettingsInitialized = true;
				this._sysSettings = sysSettings;
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * Clears system settings state.
		 */
		clearSysSettings: function () {
			this._sysSettingsInitialized = false;
			this._sysSettings = null;
		},

		/**
		 * Check if user can edit current instance of service.
		 * @param {Terrasoft.ServiceSchema} schema Service schema instance.
		 * @param {Function} callback
		 * @param {Object} scope
		 */
		canEditSchema: function(schema, callback, scope) {
			RightUtilities.checkCanExecuteOperation({
				operation: "CanManageSolution"
			}, function(result) {
				if (!result) {
					Ext.callback(callback, scope, [false]);
				} else {
					Terrasoft.SchemaDesignerUtilities.getAvailablePackages(function (availablePackages) {
						Ext.callback(callback, scope, [availablePackages.hasOwnProperty(schema.packageUId)]);
					}, this);
				}
			}, this);
		},

		/**
		 * Formats DefaultValue of parameter.
		 * @public
		 * @param {Object} defaultValue.
		 * @param {String} valueTypeName name ov value type.
		 */
		getFormattedValue: function(defaultValue, valueTypeName) {
			var value = defaultValue && defaultValue.value;
			if(Ext.isEmpty(value)) {
				return Terrasoft.emptyString;
			}
			var source = defaultValue && defaultValue.source;
			var result;
			if(source === Terrasoft.services.enums.ServiceParameterValueSource.CONST) {
				var valueType = this._getDataValueType(valueTypeName);
				result = this._formatValueByType(value, valueType);
			} else {
				if (source === Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING) {
					result = this._getSysSettingNameByCode(value);
				}
			}
			return result;
		},

		/**
		 * Set the icon of corresponded to data type name.
		 * @param {String} valueTypeName name of value type.
		 * @returns {String} image url.
		 */
		getImageUrlByDataValueTypeName: function(valueTypeName) {
			if (valueTypeName) {
				var imageName = Terrasoft.getImageNameByDataValueType(this._getDataValueType(valueTypeName));
				return Terrasoft.ImageUrlBuilder.getUrl({
					source: Terrasoft.ImageSources.RESOURCE_MANAGER,
					params: {
						resourceManagerName: "Terrasoft.Nui",
						resourceItemName: Ext.String.format("{0}{1}", "ProcessSchemaDesigner.", imageName)
					}
				});
			}
		},

		/**
		 * Generates new name with schema name prefix.
		 * @param {String} propertyName  Property name of object which generates value.
		 * @param {String} itemPropertyValueTpl Pattern of new value.
		 * @param {Terrasoft.Collection} items Collection of elements.
		 * @param {Object} options Configuration data such "hierarchicalProperty".
		 * @returns {String} new name
		 * @public
		 */
		generateSequencesName: function(propertyName, prefix, items, options) {
			var allItems = this._recursiveFind(items, options.hierarchicalProperty, function(element) {
				if (!element || !element[propertyName]) {
					return -1;
				}
				return element[propertyName] instanceof Terrasoft.LocalizableString
					? element[propertyName].toString().indexOf(prefix) === 0
					: element[propertyName].indexOf(prefix) === 0;
			});
			var newIndex = allItems.length ? Math.max.apply(null, allItems.map(function(element) {
				var valueWithoutPrefix;
				if (element[propertyName] instanceof Terrasoft.LocalizableString) {
					valueWithoutPrefix = element[propertyName].getValue().replace(prefix, "");
				} else {
					valueWithoutPrefix = element[propertyName].replace(prefix, "");
				}
				var matchNumber = valueWithoutPrefix.match(/\d+/);
				return matchNumber && matchNumber[0] ? +matchNumber[0] : 0;
			}).filter(function(element) {
				return !isNaN(element);
			})) + 1 : 1;
			return prefix + newIndex;
		}
	});

	return Terrasoft.ServiceDesignerUtilities;

});


