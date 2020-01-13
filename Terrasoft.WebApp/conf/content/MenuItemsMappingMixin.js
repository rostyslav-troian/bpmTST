Terrasoft.configuration.Structures["MenuItemsMappingMixin"] = {innerHierarchyStack: ["MenuItemsMappingMixin"]};
define("MenuItemsMappingMixin", ["MenuItemsMappingMixinResources", "terrasoft", "ext-base", "Contact", "Account",
		"StructureExplorerUtilities", "MappingEnums", "ModuleUtils", "MacrosUtilities", "MappingMenuBuilder",
		"css!MenuItemsMappingMixin"],
	function(resources, Terrasoft, Ext, Contact, Account) {
		Ext.define("Terrasoft.configuration.mixins.MenuItemsMappingMixin", {
			alternateClassName: "Terrasoft.MenuItemsMappingMixin",

			mixins: {
				macrosUtilities: "Terrasoft.MacrosUtilities"
			},
			attributes: {
				/**
				 * Entity schema.
				 * @type {Terrasoft.EntitySchema}
				 */
				"EntitySchema": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			/**
			 * Control tag.
			 * @type {String}
			 */
			tag: null,

			/**
			 * Creates menu items view model collection.
			 * @param {Object} [config] Configuration object.
			 * @param {String} [config.attributeName] Attribute name.
			 * @param {String} [config.typeMappingMenu] Type mapping menu.
			 * @return {Terrasoft.BaseViewModelCollection} Menu items view model collection.
			 */
			getMenuItemsCollection: function(config) {
				if (!Ext.isObject(config)) {
					config = {
						attributeName: config || "Value",
						typeMappingMenu: config
					};
				}
				this.tag = config.attributeName || this.get("Name");
				var elementParameter = this.getProcessElementParameter();
				var dataValueType = this.getDataValueType(elementParameter);
				var referenceSchemaUId = Terrasoft.isLookupValidator(dataValueType)
					? this.getParameterReferenceSchemaUId(elementParameter)
					: null;
				var mappingMenuBuilder = Ext.create("Terrasoft.MappingMenuBuilder", {
					_isProcessDesigner: this.getIsProcessDesigner(),
					_dataValueType: dataValueType,
					_referenceSchemaUId: referenceSchemaUId,
					_dateTimeValueType: this.getDataValueTypeForDateTimeMenuItem(dataValueType),
					_sourceColumns: this.getSourceColumns(),
					_mainRecordMappingConfig: this.getMainRecordMappingConfig()
				});
				return mappingMenuBuilder.buildMenu(config.typeMappingMenu);
			},

			/**
			 * Returns if main record mapping is enabled.
			 * @protected
			 * @virtual
			 * return {Boolean} Is main record mapping enabled.
			 */
			getMainRecordMappingConfig: function() {
				return {
					enabled: !this.getIsProcessDesigner()
				};
			},

			/**
			 * Returns menu item view model.
			 * @param {Object} config Menu item view model config.
			 * @return {Terrasoft.BaseViewModel} View model.
			 */
			getMenuItemViewModel: function(config) {
				var viewModelId = {Id: Terrasoft.generateGUID()};
				var viewModelValues = Ext.apply({}, config, viewModelId);
				return Ext.create("Terrasoft.BaseViewModel", {
					values: viewModelValues
				});
			},

			/**
			 * Returns data value type for date time menu item.
			 * @param {Terrasof.DataValueType} dataValueType Data value type.
			 * @returns {Number} Date time data value type.
			 */
			getDataValueTypeForDateTimeMenuItem: function(dataValueType) {
				var dateTimeFormat = this.get("DateTimeFormat");
				return dateTimeFormat && dateTimeFormat.value ? parseInt(dateTimeFormat.value, 10) : dataValueType;
			},

			/**
			 * Initializes entity schema.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope Execution context.
			 * @protected
			 */
			initMappingEntitySchema: function(callback, scope) {
				var schema = this.getProcessSchema();
				if (!schema || !schema.entitySchemaUId) {
					callback.call(scope);
					return;
				}
				var config = {
					packageUId: schema.getPackageUId(),
					schemaUId: schema.entitySchemaUId
				};
				Terrasoft.EntitySchemaManager.findBundleSchemaInstance(config, function(gotSchema) {
					this.set("EntitySchema", gotSchema);
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.MacrosUtilities#openMacrosPage
			 * @overridden
			 */
			openMacrosPage: function() {
				var entitySchema = this.getMappingEntitySchema();
				Terrasoft.StructureExplorerUtilities.open({
					scope: this,
					moduleConfig: {
						useBackwards: false,
						schemaName: entitySchema.name,
						displayId: true,
						excludeDataValueTypes: this.getMacrosPageExcludingDataValueTypes()
					},
					handlerMethod: this.onMacrosColumnSelected
				});
			},

			/**
			 * Returns macros page excluding data value types array according to parameter data value type.
			 * @protected
			 * @returns {Array}
			 */
			getMacrosPageExcludingDataValueTypes: function() {
				var dataValueType = this.get("DataValueType");
				var result = [];
				if (dataValueType) {
					var allDataValueTypes = Ext.Object.getValues(Terrasoft.DataValueType);
					var dataValueTypeGroup = Terrasoft.toDataValueTypeGroup(dataValueType);
					result = Ext.Array.difference(allDataValueTypes, dataValueTypeGroup);
				}
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.MacrosUtilities#onMacrosColumnSelected
			 * @overridden
			 */
			onMacrosColumnSelected: function(selectedColumns) {
				var selectedValues = selectedColumns.metaPath;
				var entitySchema = this.getMappingEntitySchema();
				selectedValues.unshift(entitySchema.uId);
				var valueMacros = Terrasoft.FormulaMacros.prepareMainRecordValueFromUIdArray(selectedValues);
				var displayValueMacros = Terrasoft.FormulaMacros.prepareMainRecordDisplayValue(
					selectedColumns.leftExpressionCaption);
				this.onGetMacros(valueMacros.toString(), displayValueMacros.toString(), entitySchema.uId);
			},

			/**
			 * @inheritdoc Terrasoft.MacrosUtilities#onGetMacros
			 * @overridden
			 */
			onGetMacros: function(value, displayValue, entitySchemaUId) {
				var mappingEditValue = {
					value: value,
					displayValue: displayValue,
					source: Terrasoft.ProcessSchemaParameterValueSource.Script,
					dataValueType: this.get("DataValueType"),
					referenceSchemaUId: entitySchemaUId
				};
				this.setMappingEditValue(this.tag, mappingEditValue);
			},

			/**
			 * Returns Entity Schema for columns mapping window.
			 * @private
			 * @return {Object} Mapping entity schema.
			 */
			getMappingEntitySchema: function() {
				return this.get("EntitySchema");
			},

			/**
			 * Recipient regular menu item click handler.
			 * @private
			 * @param {Object} tag Menu item tag.
			 */
			onRecipientMenuItemClick: function(tag) {
				var schemaUId = this.getSchemaUIdForItemType(tag.invokerItemType);
				var config;
				switch (tag.invokerItemType) {
					case "Contact":
					case "Account":
						config = this.getRecipientLookupMenuItemConfig(schemaUId);
						break;
					case "Email":
						config = this.getRecipientEmailMenuItemConfig(schemaUId);
						break;
					default:
						config = null;
						break;
				}
				this.onMenuItemClick(tag, config);
			},

			/**
			 * Returns recipient lookup menu item config.
			 * @private
			 * @param {String} schemaUId Reference schema uid.
			 * @returns {Object} Recipient lookup menu item config.
			 */
			getRecipientLookupMenuItemConfig: function(schemaUId) {
				return {
					filterConfig: {
						filterSchemaUId: schemaUId,
						allowedDataValueTypes: [
							Terrasoft.DataValueType.GUID,
							Terrasoft.DataValueType.LOOKUP
						]
					},
					formulaConfig: {
						initialLookupSchemaUId: schemaUId,
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						source: Terrasoft.ProcessSchemaParameterValueSource.Script
					}
				};
			},

			/**
			 * Returns recipient email menu item config.
			 * @private
			 * @param {String} schemaUId Reference schema uid.
			 * @returns {Object} Recipeint email menu item config.
			 */
			getRecipientEmailMenuItemConfig: function(schemaUId) {
				return {
					filterConfig: {
						allowedDataValueTypes: [
							Terrasoft.DataValueType.TEXT,
							Terrasoft.DataValueType.SHORT_TEXT,
							Terrasoft.DataValueType.MEDIUM_TEXT,
							Terrasoft.DataValueType.MAXSIZE_TEXT,
							Terrasoft.DataValueType.LONG_TEXT
						]
					},
					formulaConfig: {
						initialLookupSchemaUId: schemaUId,
						dataValueType: Terrasoft.DataValueType.TEXT,
						source: Terrasoft.ProcessSchemaParameterValueSource.Script
					}
				};
			},

			/**
			 * On macros menu item click handler.
			 * @private
			 * @param {Object} tag Invoker tag.
			 */
			onRecipientMacrosItemClick: function(tag) {
				tag.referenceSchemaUId = this.getSchemaUIdForItemType(tag.invokerItemType);
				this.onMacrosMenuItemClick(tag);
			},

			/**
			 * Recipient formula menu item click handler.
			 * @private
			 * @param {Object} tag Menu item tag.
			 */
			onRecipientFormulaItemClick: function(tag) {
				var schemaUId = this.getSchemaUIdForItemType(tag.invokerItemType);
				var config;
				switch (tag.invokerItemType) {
					case "Contact":
					case "Account":
						config = this.getRecipientLookupFormulaMenuItemConfig(schemaUId);
						break;
					case "Email":
						config = this.getRecipientEmailFormulaMenuItemConfig();
						break;
					default:
						config = null;
						break;
				}
				this.onMenuItemClick(tag, config);
			},

			/**
			 * Returns recipient lookup menu item config.
			 * @private
			 * @returns {Object} Recipient lookup menu item config.
			 */
			getRecipientLookupFormulaMenuItemConfig: function(schemaUId) {
				return {
					formulaConfig: {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						source: Terrasoft.ProcessSchemaParameterValueSource.Script,
						referenceSchemaUId: schemaUId,
						initialLookupSchemaUId: schemaUId
					}
				};
			},

			/**
			 * Returns recipient email menu item config.
			 * @private
			 * @returns {Object} Recipient email menu item config.
			 */
			getRecipientEmailFormulaMenuItemConfig: function() {
				return {
					formulaConfig: {
						dataValueType: Terrasoft.DataValueType.MAXSIZE_TEXT,
						source: Terrasoft.ProcessSchemaParameterValueSource.Script
					}
				};
			},

			/**
			 * Returns referenceSchemaUId by menu item type.
			 * @private
			 * @param {String} itemType Menu item type.
			 * @returns {String} Reference schema uId.
			 */
			getSchemaUIdForItemType: function(itemType) {
				switch (itemType) {
					case "Contact":
						return Contact.uId;
					case "Account":
						return Account.uId;
					case "Email":
						return null;
					default:
						throw this.Ext.create("Terrasoft.UnsupportedTypeException");
				}
			},

			/**
			 * Recipient value change handler.
			 * @private
			 * @param {Object} parameterValue Parameter object.
			 * @param {Object} [config] Configuration object.
			 * @param {String} [config.attributeName] Attribute name.
			 */
			onRecipientValueChanged: function(parameterValue, config) {
				var attributeName = Ext.isObject(config) ? config.attributeName : config;
				var newInvokerItemType = this._getNewInvokerItemType(parameterValue);
				parameterValue.dataValueType = this.getNewInvokerDataValueType(newInvokerItemType);
				this.set("InvokerItemType", newInvokerItemType);
				this.set(attributeName, parameterValue);
				if (!Ext.Object.equals(this.get("Value"), parameterValue)) {
					this.set("Value", parameterValue);
				}
			},

			/**
			 * Returns new item type for recipient menu item invoker.
			 * @private
			 * @param {Object} parameter Process parameter.
			 * @returns {String} new invoker item type.
			 */
			_getNewInvokerItemType: function(parameter) {
				var newInvokerItemType;
				var parameterValuesSource = Terrasoft.ProcessSchemaParameterValueSource;
				var valueMacros = Terrasoft.FormulaMacros.from(parameter.value);
				var invokerItemTag = parameter.invokerItemTag;
				var isParameterConstant = parameter.source === parameterValuesSource.ConstValue;
				var isParameterCleared = parameter.source === parameterValuesSource.None;
				var isParameterContact = parameter.referenceSchemaUId === Contact.uId;
				var isParameterAccount = parameter.referenceSchemaUId === Account.uId;
				var isParameterText = parameter.dataValueType === Terrasoft.DataValueType.MAXSIZE_TEXT;
				if (isParameterCleared) {
					newInvokerItemType = null;
				} else if (valueMacros.isMainRecordColumn()) {
					newInvokerItemType = "MainRecord";
				} else if (invokerItemTag) {
					newInvokerItemType = invokerItemTag.invokerItemType;
				} else if (isParameterConstant || isParameterText) {
					newInvokerItemType = "Email";
				} else if (isParameterContact) {
					newInvokerItemType = "Contact";
				} else if (isParameterAccount) {
					newInvokerItemType = "Account";
				} else {
					newInvokerItemType = null;
				}
				return newInvokerItemType;
			},

			/**
			 * Returns new data value type for recipient menu item invoker.
			 * @private
			 * @param {String} itemType Item type.
			 * @returns {Terrasoft.DataValueType} New invoker data value type.
			 */
			getNewInvokerDataValueType: function(itemType) {
				var newDataValueType;
				switch (itemType) {
					case "Contact":
					case "Account":
						newDataValueType = Terrasoft.DataValueType.LOOKUP;
						break;
					case "Email":
						newDataValueType = Terrasoft.DataValueType.MAXSIZE_TEXT;
						break;
					default:
						newDataValueType = Terrasoft.DataValueType.MAXSIZE_TEXT;
						break;
				}
				return newDataValueType;
			},

			/**
			 * Return true if recipient contact menu item is enabled.
			 * @private
			 * @returns {Boolean} True if recipient contact menu item is enabled.
			 */
			getIsContactEnabled: function() {
				var invokerItemType = this.get("InvokerItemType");
				return Ext.isEmpty(invokerItemType) || invokerItemType === "Contact";
			},

			/**
			 * Return true if recipient account menu item is enabled.
			 * @private
			 * @returns {Boolean} True if recipient account menu item is enabled.
			 */
			getIsAccountEnabled: function() {
				var invokerItemType = this.get("InvokerItemType");
				return Ext.isEmpty(invokerItemType) || invokerItemType === "Account";
			},

			/**
			 * Return true if recipient email menu item is enabled.
			 * @private
			 * @returns {Boolean} True if recipient email menu item is enabled.
			 */
			getIsEmailEnabled: function() {
				var invokerItemType = this.get("InvokerItemType");
				return Ext.isEmpty(invokerItemType) || invokerItemType === "Email";
			},

			/**
			 * Return parameter values.
			 * @private
			 * @returns {Object} Current parameter.
			 */
			getParameter: function() {
				var parameterValue = this.get(this.tag);
				if (Ext.isEmpty(parameterValue)) {
					parameterValue = this.get("Value");
				}
				if (Ext.isEmpty(parameterValue)) {
					parameterValue = {};
				}
				return parameterValue;
			},

			/**
			 * Menu item click handler.
			 * @public
			 * @param {Object} tag Invoker tag object.
			 * @param {Object=} config Additional config.
			 */
			onMenuItemClick: function(tagObject, config) {
				var parameterValue = this._getParameterValue();
				var mappingConfig = {
					invokerItemTag: tagObject,
					mappingType: tagObject.mappingType,
					moduleName: this.getIsProcessDesigner() ? "ProcessMappingModule" : "DcmMappingModule"
				};
				Ext.apply(mappingConfig, config);
				this.openMappingEditWindow(this.tag, parameterValue, mappingConfig);
			},

			/**
			 * Returns Process element parameter value.
			 * @private
			 * @return {Oject} Process element parameter value.
			 */
			_getParameterValue: function() {
				var parameterValue = this.get(this.tag);
				var dataValueType = this.getDataValueType();
				var elementParameter = this.getProcessElementParameter();
				if (!Ext.isEmpty(parameterValue) && Terrasoft.isLookupValidator(dataValueType)){
					parameterValue.referenceSchemaUId = this.getParameterReferenceSchemaUId(elementParameter);
				}
				return parameterValue;
			},

			/**
			 * Date and time subMenu item click handler.
			 * @private
			 * @param {Terrasoft.core.enums.DataValueType} itemDataValueType Datatype in sub menu item.
			 */
			onDateTimeSubItemClick: function(itemDataValueType) {
				var parameterName = this.tag;
				var parameterValue = this.get(parameterName);
				if (!parameterValue) {
					var parameterInfo = this.getParameterInfo();
					parameterName = parameterName || parameterInfo.parameterName;
					parameterValue = parameterInfo.parameterValue;
				}
				var presentValue = this.get("Value");
				var presentDisplayValue = presentValue ? presentValue.displayValue : null;
				var mappingConfig = {
					itemDataValueType: itemDataValueType,
					moduleName: "DateTimeMappingModule",
					mappingType: Terrasoft.MappingEnums.MappingType.DATE_TIME,
					presentDisplayValue: presentDisplayValue
				};
				this.openMappingEditWindow(parameterName, parameterValue, mappingConfig);
			},

			/**
			 * Macros menu item click handler.
			 * @private
			 * @param {Object} config Configuration object.
			 */
			onMacrosMenuItemClick: function(config) {
				config.value = this.addMacrosBrackets(config.value);
				this.onBaseSubMenuItemClick(config);
			},

			/**
			 * Base sub menu item click handler.
			 * @private
			 * @param {Object} config Configuration object.
			 */
			onBaseSubMenuItemClick: function(config) {
				var elementParameter = this.getProcessElementParameter();
				var sourceValue = {
					invokerItemTag: config,
					value: config.value,
					displayValue: config.displayValue,
					source: Terrasoft.ProcessSchemaParameterValueSource.Script,
					referenceSchemaUId: config.referenceSchemaUId
						|| this.getParameterReferenceSchemaUId(elementParameter),
					dataValueType: this.get("DataValueType")
				};
				this.setMappingEditValue(this.tag, sourceValue);
			},

			/**
			 * Adds macros brackets to mapping edit display value.
			 * @private
			 * @param {String} displayValue Mapping edit display value with macros brackets.
			 */
			addMacrosBrackets: function(displayValue) {
				var constants = Terrasoft.process.constants;
				return constants.LEFT_MACROS_BRACKET + displayValue + constants.RIGHT_MACROS_BRACKET;
			},

			/**
			 * @inheritdoc Terrasoft.MacrosUtilities#formatMacrosColumn
			 * @overridden
			 */
			formatMacrosColumn: function(selectedValues) {
				var macrosString = "ColumnValue";
				selectedValues.map(function(item) {
					macrosString = macrosString + ".{" + item + "}";
					return item;
				});
				return this.addMacrosBrackets(macrosString);
			},

			/**
			 * Initializes referenceSchemaUId.
			 * @protected
			 * @param {Terrasoft.ProcessSchemaParameter} elementParameter Process element parameter.
			 */
			getParameterReferenceSchemaUId: function(elementParameter) {
				return elementParameter ? elementParameter.referenceSchemaUId : null;
			},

			/**
			 * Returns source columns.
			 * @private
			 * @return {Terrasoft.Collection} Source columns list.
			 */
			getSourceColumns: function() {
				return this.get("SourceColumns");
			},

			/**
			 * Gets Process Element for static or autogenerated parameters.
			 * @private
			 * @return {Terrasoft.ParametrizedProcessSchemaElement}
			 */
			getProcessElement: function() {
				return this.get("ProcessElement");
			},

			/**
			 * Returns Process element parameter.
			 * @private
			 * @return {Terrasoft.ProcessSchemaParameter} Process element parameter.
			 */
			getProcessElementParameter: function() {
				var parameter = null;
				var processElement = this.getProcessElement();
				if (processElement && processElement.findParameterByName) {
					parameter = processElement.findParameterByName(this.tag);
				}
				return parameter;
			},

			/**
			 * Initializes mapping edit's dataValueType.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameter} elementParameter Process element parameter.
			 */
			initDataValueType: function(elementParameter) {
				if (!elementParameter) {
					return;
				}
				this.set("DataValueType", elementParameter.dataValueType);
			},

			/**
			 * Returns Mapping edit's data value type.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameter} elementParameter Process element parameter.
			 * @return {*|Terrasoft.DataValueType} Mapping edit's dataValueType.
			 */
			getDataValueType: function(elementParameter) {
				this.initDataValueType(elementParameter);
				return this.getDataValueTypeNumericValue();
			},

			/**
			 * Gets numeric value of parameter data value type.
			 * @private
			 * @return {Terrasoft.DataValueType}
			 */
			getDataValueTypeNumericValue: function() {
				var dataValueType = this.get("DataValueType");
				if (!dataValueType && dataValueType !== Terrasoft.DataValueType.GUID) {
					return null;
				}
				return dataValueType.hasOwnProperty("value") ? dataValueType.value : dataValueType;
			}
		});
		return Ext.create("Terrasoft.MenuItemsMappingMixin");
	});


