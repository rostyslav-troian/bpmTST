Terrasoft.configuration.Structures["FilterModuleMixin"] = {innerHierarchyStack: ["FilterModuleMixin"]};
define('FilterModuleMixinStructure', ['FilterModuleMixinResources'], function(resources) {return {schemaUId:'4f71b2ad-fbc8-4f0b-ab3f-8b32b8a133c6',schemaCaption: "FilterModuleMixin", parentSchemaName: "", schemaName:'FilterModuleMixin',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FilterModuleMixin", [
	"FilterConverter",
	"FilterModuleMixinResources",
	"FilterEditModule",
	"MappingEditMixin",
	"ProcessParameterSelectionModule",
	"ProcessDesignerFilterEditFilter",
	"DcmDesignerFilterEditFilter"
], function(FilterConverter, Resources) {
	var resources = Resources.localizableStrings;
	Ext.define("Terrasoft.configuration.mixins.FilterModuleMixin", {
		alternateClassName: "Terrasoft.FilterModuleMixin",
		mixins: {
			mappingEditMixin: "Terrasoft.MappingEditMixin"
		},
		filterModuleMixinMessages: {
			/**
			 * @message SetFilterModuleConfig
			 * Applies settings for the filter unit.
			 */
			"SetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetFilterModuleConfig
			 * Returns settings for the filter unit.
			 */
			"GetFilterModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message OnFiltersChanged
			 * Subscription for the filter unit modification event.
			 */
			"OnFiltersChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message OpenMappingEditWindow
			 * Subscription for the opening parameter mapping window event.
			 */
			"OpenMappingEditWindow": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message OpenMacrosPage
			 * Subscription for the opening main record mapping window event.
			 */
			"OpenMacrosPage": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetElementData
			 * Publishes message for retrieving current process element data.
			 */
			"GetElementData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		//region Fields: Private

		/**
		 * Flag that indicates whether filter module loaded.
		 * @private
		 * @type {Boolean}
		 */
		filterModuleLoaded: false,

		/**
		 * Boolean "true" formula macros.
		 * @private
		 * @type {String}
		 */
		booleanTrueMacros: Terrasoft.FormulaMacros.prepareBooleanValue("True").toString().toLowerCase(),

		//endregion

		//region Methods: Private

		/**
		 * @private
		 */
		_addFilterEditDataColumn: function() {
			this.columns.FilterEditData = {
				name: "FilterEditData",
				dataValueType: Terrasoft.DataValueType.VIRTUAL_COLUMN
			};
		},

		/**
		 * @private
		 */
		_filterEditDataValidator: function(value) {
			var result = {invalidMessage: ""};
			if (value && Ext.isDefined(value.isValid) && !value.isValid) {
				var resource = this.get("Resources.Strings.InavalidMappingColumn");
				result.invalidMessage = resource || "Invalid formula";
			}
			return result;
		},

		/**
		 * Actualizes displayed value of parameters.
		 * @private
		 * @param {Terrasoft.ProcessSchema} parentSchema Process schema.
		 * @param {Array} parameterExpressionList Array of parameters expression.
		 * @param {Function} callback Callback function.
		 * @param {Boolean} isValid Filter validation state.
		 */
		actualizeDisplayedValueOfParameters: function(parentSchema, parameterExpressionList, callback, isValid) {
			isValid = Ext.isDefined(isValid) ? isValid : true;
			var expression = parameterExpressionList.pop();
			if (!expression) {
				Ext.callback(callback, this, [isValid]);
				return;
			}
			var utils = Terrasoft.FormulaParserUtils;
			var sourceValue = expression.value;
			var macrosBody = sourceValue.value;
			utils.getMacrosDisplayValue(macrosBody, parentSchema, function(displayValue, unrecognizedMacroses) {
				var isItemValid = Ext.isEmpty(unrecognizedMacroses);
				if (isItemValid) {
					sourceValue.displayValue = displayValue;
				} else {
					var invalidFormula = resources.InvalidFormula;
					if (sourceValue.displayValue.indexOf(invalidFormula) === -1) {
						var solidFlagSymbol = "\u2691";
						sourceValue.displayValue = solidFlagSymbol + " " + invalidFormula + " - " +
							sourceValue.displayValue;
					}
				}
				this.actualizeDisplayedValueOfParameters(parentSchema, parameterExpressionList, callback,
					isValid && isItemValid);
			}, this);
		},

		/**
		 * Returns array of expressions of parameters.
		 * @private
		 * @param {Terrasoft.FilterGroup} filterEditData The filter unit settings.
		 * @return {Array}
		 */
		findRightExpressionParameterList: function(filterEditData) {
			if (!filterEditData) {
				return [];
			}
			var expression = [];
			filterEditData.each(function(item) {
				if (item instanceof Terrasoft.FilterGroup) {
					var findExpression = this.findRightExpressionParameterList(item);
					expression = expression.concat(findExpression);
					return true;
				}
				var parameterExpression = this.findRightExpressionParameter(item);
				if (!this.getIsProcessParameter(parameterExpression)) {
					return true;
				}
				expression.push(parameterExpression);
			}, this);
			return expression;
		},

		/**
		 * Deletes displayed value of parameters.
		 * @private
		 * @param {Terrasoft.FilterGroup} filterEditData The filter unit settings.
		 */
		deleteParameterDisplayValues: function(filterEditData) {
			if (!filterEditData) {
				return;
			}
			filterEditData.each(function(item) {
				if (item instanceof Terrasoft.FilterGroup) {
					this.deleteParameterDisplayValues(item);
					return true;
				}
				var parameter = this.findRightExpressionParameter(item);
				if (!this.getIsProcessParameter(parameter)) {
					return true;
				}
				var sourceValue = parameter.value;
				delete sourceValue.displayValue;
			}, this);
		},

		/**
		 * Indicates whether it is a process parameter.
		 * @private
		 * @param {Terrasoft.ParameterExpression} parameter Parameter expression.
		 * return {Boolean}
		 */
		getIsProcessParameter: function(parameter) {
			return Boolean(parameter && parameter.dataValueType === Terrasoft.DataValueType.MAPPING);
		},

		/**
		 * Returns a right expression parameter of the filter item if it were found, otherwise null.
		 * @private
		 * @param {Terrasoft.BaseFilter} filterItem The filter item of the filter group.
		 * return {Terrasoft.ParameterExpression}
		 */
		findRightExpressionParameter: function(filterItem) {
			var parameter = null;
			var rightExpression = filterItem.rightExpression;
			if (rightExpression) {
				parameter = rightExpression.parameter;
			} else if (!Ext.isEmpty(filterItem.rightExpressions)) {
				var rightExpressions = filterItem.rightExpressions;
				if (rightExpressions.length === 1) {
					var firstRightExpressions = 0;
					rightExpression = rightExpressions[firstRightExpressions];
					parameter = rightExpression.parameter;
				}
			}
			return parameter;
		},

		/**
		 * Loads the filter unit module.
		 * @private
		 * @param {String} entitySchemaName Filter root entity schema name.
		 */
		loadFilterUnitModule: function(entitySchemaName) {
			var moduleId = this.getFilterUnitModuleId();
			this.sandbox.subscribe("OnFiltersChanged", this.onFiltersChanged, this, [moduleId]);
			this.sandbox.subscribe("GetFilterModuleConfig", function() {
				return this.getFilterModuleConfig(entitySchemaName);
			}, this, [moduleId]);
			this.sandbox.subscribe("OpenMappingEditWindow", this.onOpenProcessMappingEditWindow, this, [moduleId]);
			this.sandbox.subscribe("OpenMacrosPage", this._onOpenMacrosPage, this, [moduleId]);
			this.sandbox.loadModule("FilterEditModule", {
				renderTo: this.getFilterContainerId(),
				id: moduleId
			});
			this.filterModuleLoaded = true;
		},

		/**
		 * The event handler on filters changed.
		 * @private
		 */
		onFiltersChanged: function(args) {
			if (!this.emptyFilterEditData) {
				var filterGroup = Ext.create("Terrasoft.FilterGroup");
				this.emptyFilterEditData = filterGroup.serialize();
			}
			if (this.emptyFilterEditData === args.serializedFilter) {
				return;
			}
			var filter = args.filter;
			this.set("FilterEditData", filter);
		},

		/**
		 * Deserializes filter edit data for server filter data in server format.
		 * @private
		 * @param {String} filterData Filter data in server format.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		deserializeServerFilterEditData: function(filterData, callback, scope) {
			FilterConverter.deserializeFilterEditData(filterData, function(result) {
				if (result.error) {
					this.error(result.error);
					callback.call(scope || this);
					return;
				}
				callback.call(scope || this, result.filterEditData);
			}.bind(this));
		},

		/**
		 * Open mapping edit window handler.
		 * @private
		 * @param {Object} config Settings.
		 * @param {Object} config.filter Parameter value.
		 */
		onOpenProcessMappingEditWindow: function(config) {
			if (this.getHasReferenceSchemaName(config.filter)) {
				var parameterValue = config.filter;
				this.getReferenceSchemaUId(parameterValue, function(referenceSchemaUId) {
					this.openProcessMappingEditWindow(config, referenceSchemaUId);
				}, this);
			} else {
				this.openProcessMappingEditWindow(config, null);
			}
		},

		/**
		 * Open main record macros edit window handler.
		 * @private
		 * @param {Object} callback Callback function.
		 */
		_onOpenMacrosPage: function(callback) {
			var entitySchema = this.get("EntitySchema");
			Terrasoft.StructureExplorerUtilities.open({
				scope: this,
				moduleConfig: {
					useBackwards: false,
					schemaName: entitySchema.name,
					displayId: true
				},
				callback: callback,
				handlerMethod: this._prepareResult
			});
		},

		/**
		 * Handles selection of column for macros.
		 * @private
		 * @param {Object} selectedColumns Selected column information.
		 * @param {callback} callback Callback function.
		 */
		_prepareResult: function(selectedColumns, callback) {
			var selectedValues = selectedColumns.metaPath;
			var entitySchema = this.get("EntitySchema");
			selectedValues.unshift(entitySchema.uId);
			var valueMacros = Terrasoft.FormulaMacros.prepareMainRecordValueFromUIdArray(selectedValues);
			var displayValueMacros = Terrasoft.FormulaMacros.prepareMainRecordDisplayValue(
				selectedColumns.leftExpressionCaption);
			var mappingValue = {
				value: valueMacros.toString(),
				displayValue: displayValueMacros.toString(),
				source: Terrasoft.ProcessSchemaParameterValueSource.Script,
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				referenceSchemaUId: entitySchema.uId
			};
			callback(mappingValue);
		},

		/**
		 * Returns reference schema uId in callback.
		 * @param {Object} parameterValue Parameter value.
		 * @param {String} parameterValue.referenceSchemaName Parameter reference schema name.
		 * @param {Function} callback Callback with result.
		 * @param {String} callback.referenceSchemaUId Reference schema uId of the parameter.
		 * @param {Object} scope Scope of the callback.
		 */
		getReferenceSchemaUId: function(parameterValue, callback, scope) {
			Terrasoft.chain(
				function(next) {
					var packageUId = this.get("packageUId");
					Terrasoft.EntitySchemaManager.findPackageItems(packageUId, next, this);
				},
				function(next, items) {
					var filteredSchemas = items.filterByFn(function(item) {
						return item.name === parameterValue.referenceSchemaName;
					}, this);
					var referenceSchema = filteredSchemas.first();
					var referenceSchemaUId = referenceSchema && referenceSchema.uId;
					callback.call(scope, referenceSchemaUId);
				},
				this
			);
		},

		/**
		 * Opens the mapping window of the process parameter values.
		 * @private
		 * @param {Object} config Settings.
		 * @param {String} referenceSchemaUId Reference schema uId.
		 */
		openProcessMappingEditWindow: function(config, referenceSchemaUId) {
			var parameterMappingInfo = {};
			var rightExpressionParameter = this.findRightExpressionParameter(config.filter);
			if (rightExpressionParameter) {
				var sourceValue = rightExpressionParameter.value;
				if (sourceValue && sourceValue.value) {
					parameterMappingInfo = Terrasoft.FormulaParserUtils.getParameterMappingInfo(sourceValue.value);
				}
			}
			var pageId = this.getProcessMappingPageModuleId();
			this.sandbox.subscribe("SetParametersInfo", function(sourceValue) {
				if (sourceValue) {
					delete sourceValue.source;
					config.callback(sourceValue);
				}
				this.closeModalBox();
			}, this, [pageId]);

			var moduleName = this.getParameterMappingModuleName();
			var modalBoxConfig = this.getMappingPageModalBoxConfig(moduleName);
			var mappingWindowRenderTo = this.showModuleModalBox(pageId, modalBoxConfig);
			var invokerUId = this.get("uId");
			var mappingType = this.getParameterMappingType();
			var parameterValue = config.filter;
			var pageConfig = {
				DataValueType: parameterValue.dataValueType,
				InvokerUId: invokerUId
			};
			if (referenceSchemaUId) {
				pageConfig.referenceSchemaUId = referenceSchemaUId;
			}
			this.sandbox.loadModule(moduleName, {
				renderTo: mappingWindowRenderTo,
				id: pageId,
				instanceConfig: {
					parameters: {
						viewModelConfig: {
							SchemaElementUId: parameterMappingInfo.schemaElementUId,
							ParameterUId: parameterMappingInfo.parameterUId,
							EntityColumnUId: parameterMappingInfo.entityColumnUId,
							ConvertToDisplayValue: false,
							MappingType: mappingType,
							PageConfig: pageConfig
						}
					}
				}
			});
		},

		/**
		 * Returns true if dataValue type is Lookup and parameterValue has referenceSchemaName.
		 * @private
		 * @param {Object} parameterValue Edited parameter value.
		 * @return {Boolean}
		 */
		getHasReferenceSchemaName: function(parameterValue) {
			return Terrasoft.isLookupValidator(parameterValue.dataValueType) && parameterValue.referenceSchemaName;
		},

		/**
		 * Returns the identifier of the process mapping page module.
		 * @private
		 * @return {String}
		 */
		getProcessMappingPageModuleId: function() {
			return this.sandbox.id + "ProcessParameterSelectionPage";
		},

		/**
		 * Returns the identifier of the filter unit module.
		 * @private
		 * @return {String}
		 */
		getFilterUnitModuleId: function() {
			return this.sandbox.id + "_ExtendedFilterEditModule";
		},

		/**
		 * Registers event subscriptions.
		 * @private
		 */
		registerFilterModuleMessages: function() {
			this.sandbox.registerMessages(this.filterModuleMixinMessages);
		},

		/**
		 * Destroys event subscriptions.
		 * @private
		 */
		unRegisterFilterModuleMessages: function() {
			var messages = this.Terrasoft.keys(this.filterModuleMixinMessages);
			this.sandbox.unRegisterMessages(messages);
		},

		/**
		 * Unloads the filter unit module.
		 * @private
		 */
		unloadFilterUnitModule: function() {
			if (this.filterModuleLoaded) {
				var moduleId = this.getFilterUnitModuleId();
				this.sandbox.unloadModule(moduleId);
				this.filterModuleLoaded = false;
			}
		},

		/**
		 * Gets parameter's const boolean value.
		 * @private
		 * @param {Terrasoft.FilterGroup} filterGroup The filter group object.
		 * @param {Boolean} isConsiderTimeInFilter Flag indicating to consider time in the compare filters.
		 */
		_considerTimeInFilter: function(filterGroup, isConsiderTimeInFilter) {
			if (filterGroup.filterType !== Terrasoft.FilterType.FILTER_GROUP) {
				return;
			}
			filterGroup.each(function(filter) {
				if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
					this._considerTimeInFilter(filter, isConsiderTimeInFilter);
				} else if (filter.filterType === Terrasoft.FilterType.COMPARE &&
						filter.dataValueType === Terrasoft.DataValueType.DATE_TIME) {
					filter.trimDateTimeParameterToDate = !isConsiderTimeInFilter;
				}
			}, this);
		},

		/**
		 * Returns parameter's const boolean value.
		 * @private
		 * @param {Terrasoft.ProcessSchemaParameter} processSchemaParameter The process schema parameter.
		 * @return {Boolean}
		 */
		_getParameterBooleanValue: function(processSchemaParameter) {
			var result = processSchemaParameter && processSchemaParameter.getValue().toString().toLowerCase();
			result = result === "true" || result === this.booleanTrueMacros;
			return result;
		},

		//endregion

		//region Methods: Protected

		/**
		 * Returns settings for the filter unit.
		 * @protected
		 * @param {String} entitySchemaName The entity schema name.
		 * return {Object}
		 */
		getFilterModuleConfig: function(entitySchemaName) {
			return {
				rootSchemaName: entitySchemaName,
				filters: this.get("FilterEditData"),
				filterEditConfig: this.getFilterEditConfigName(),
				rightExpressionMenuAligned: true,
				entitySchemaFilterProviderConfig: {
					canDisplayId: true,
					shouldHideLookupActions: true,
					isColumnSettingsHidden: true
				}
			};
		},

		/**
		 * Returns filters value from element parameter.
		 * @protected
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} parameterName Source parameter name.
		 * @return {String}
		 */
		getDataSourceFiltersValue: function(element, parameterName) {
			var parameter = element.findParameterByName(parameterName);
			var value = parameter.getValue();
			if (value instanceof Terrasoft.LocalizableString) {
				value = value.getValue();
			}
			return value;
		},

		/**
		 * Sets filters value to element parameter.
		 * @protected
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} parameterName Source parameter name.
		 * @param {String} value Value.
		 */
		setDataSourceFiltersValue: function(element, parameterName, value) {
			var parameter = element.findParameterByName(parameterName);
			var sources = this.Terrasoft.ProcessSchemaParameterValueSource;
			var parameterValue = {
				source: (value) ? sources.ConstValue : sources.None,
				value: value
			};
			parameter.setMappingValue(parameterValue);
		},

		/**
		 * Returns default data source filters property name.
		 * @protected
		 * @return {String} Property name.
		 */
		getDefaultDataSourceFiltersParameterName: function() {
			return "DataSourceFilters";
		},

		/**
		 * Deserializes filter edit data.
		 * @protected
		 * @param {String} filters [description]
		 * @return {Terrasoft.FilterGroup} Deserialized filter.
		 */
		deserializeFilterEditData: function(filters) {
			var deserializedFilters = this.Terrasoft.decode(filters);
			deserializedFilters = deserializedFilters.serializedFilterEditData;
			return this.Terrasoft.deserialize(deserializedFilters);
		},

		/**
		 * Returns reference schema UId attribute name.
		 * @protected
		 * @return {string}
		 */
		getFilterReferenceSchemaAttributeName: function() {
			return "ReferenceSchemaUId";
		},

		/**
		 * Returns filter container id.
		 * @protected
		 * @return {string}
		 */
		getFilterContainerId: function() {
			return "ExtendedFiltersContainer";
		},

		//endregion

		//region Methods: Public

		/**
		 * Returns filter edit config name.
		 * @return {Object}
		 */
		getFilterEditConfigName: function() {
			return {
				filterClassName: this.getIsProcessDesigner()
					? "Terrasoft.ProcessDesignerFilterEditFilter"
					: "Terrasoft.DcmDesignerFilterEditFilter"
			};
		},

		/**
		 * Initializes filter module mixin.
		 * @param {Object} filterConfig Filter config.
		 * @param {String} filterConfig.referenceSchemaParameterName Filter reference schema name.
		 * @param {String} [filterConfig.dataSourceFiltersParameterName="DataSourceFilters"] Source parameter name.
		 * @param {Terrasoft.ProcessBaseElementSchema} [filterConfig.element] Process element.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		initFilterModuleMixin: function(filterConfig, callback, scope) {
			this.registerFilterModuleMessages();
			var processElement = Ext.isEmpty(filterConfig.element)
				? this.sandbox.publish("GetElementData", this.tag)
				: filterConfig.element;
			if (processElement) {
				this.addColumnValidator("FilterEditData", this._filterEditDataValidator);
				this.initReferenceSchemaUId(processElement, filterConfig.referenceSchemaParameterName);
				this.initFilterEditData(processElement, filterConfig.dataSourceFiltersParameterName, callback, scope);
			} else {
				callback.call(scope);
			}
		},

		/**
		 * Initializes reference schema uid attribute.
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} parameterName Source parameter name.
		 * @param {String} [attributeName] Reference schema UId attribute name. Used only for external calls of this
		 * method.
		 */
		initReferenceSchemaUId: function(element, parameterName, attributeName) {
			var parameter = element.findParameterByName(parameterName);
			var value = parameter.getValue();
			var referenceSchemaAttributeName = attributeName || this.getFilterReferenceSchemaAttributeName();
			this.set(referenceSchemaAttributeName, value);
		},

		/**
		 * Processes deserialized filter edit data.
		 * @param {Terrasoft.FilterGroup} filterEditData Filter edit data.
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback context.
		 */
		onFilterDataDeserialized: function(filterEditData, element, callback, scope) {
			if (!filterEditData) {
				this.set("FilterEditData", filterEditData);
				callback.call(scope);
				return;
			}
			var parametersExpression = this.findRightExpressionParameterList(filterEditData);
			var parentSchema = element.parentSchema;
			this.actualizeDisplayedValueOfParameters(parentSchema, parametersExpression, function(isValid) {
				filterEditData.isValid = isValid;
				this.set("FilterEditData", filterEditData);
				callback.call(scope);
			});
		},

		/**
		 * Indicates whether the filter serialized data has server format.
		 * @param {String} filterData Filter serialized data.
		 * @return {Boolean}
		 */
		getIsServerFilterFormat: function(filterData) {
			return (filterData && filterData.indexOf("_isFilter:") !== -1);
		},

		/**
		 * Initializes "FilterEditData" attribute.
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} [parameterName="DataSourceFilters"] Source parameter name.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		initFilterEditData: function(element, parameterName, callback, scope) {
			callback = callback || this.Ext.emptyFn;
			scope = scope || this;
			if (!parameterName) {
				parameterName = this.getDefaultDataSourceFiltersParameterName();
			}
			this._addFilterEditDataColumn();
			var value = this.getDataSourceFiltersValue(element, parameterName);
			if (!value || value === "null") {
				callback.call(scope);
				return;
			}
			if (this.getIsServerFilterFormat(value)) {
				this.deserializeServerFilterEditData(value, function(filterEditData) {
					if (!filterEditData) {
						callback.call(scope);
						return;
					}
					this.onFilterDataDeserialized(filterEditData, element, callback, scope);
				}, this);
				return;
			}
			value = this.deserializeFilterEditData(value);
			this.onFilterDataDeserialized(value, element, callback, scope);
		},

		/**
		 * Updates the filter unit module.
		 */
		updateFilterModule: function() {
			var referenceSchemaAttributeName = this.getFilterReferenceSchemaAttributeName();
			var referenceSchemaUId = this.get(referenceSchemaAttributeName);
			if (!referenceSchemaUId) {
				return;
			}
			Terrasoft.EntitySchemaManager.findItemByUId(referenceSchemaUId, function(entitySchema) {
				var entitySchemaName = entitySchema && entitySchema.name;
				if (!this.filterModuleLoaded) {
					this.loadFilterUnitModule(entitySchemaName);
					return;
				}
				var moduleId = this.getFilterUnitModuleId();
				var filterModuleConfig = this.getFilterModuleConfig(entitySchemaName);
				this.sandbox.publish("SetFilterModuleConfig", filterModuleConfig, [moduleId]);
			}, this);
		},

		/**
		 * Saves the ID of the entity schema.
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} parameterName Source parameter name.
		 * @param {String} [attributeName] Reference schema UId attribute name. Used only for external calls of this
		 * method.
		 */
		saveReferenceSchemaUId: function(element, parameterName, attributeName) {
			var referenceSchemaAttributeName = attributeName || this.getFilterReferenceSchemaAttributeName();
			if (this.changedValues && this.Ext.isDefined(this.changedValues[referenceSchemaAttributeName])) {
				var referenceSchemaUId = this.get(referenceSchemaAttributeName);
				var parameter = element.findParameterByName(parameterName);
				var sources = this.Terrasoft.ProcessSchemaParameterValueSource;
				var isEmptyReferenceSchemaUId =
					this.Ext.isEmpty(referenceSchemaUId) || this.Terrasoft.isEmptyGUID(referenceSchemaUId);
				var parameterValue = {
					source: (!isEmptyReferenceSchemaUId) ? sources.ConstValue : sources.None,
					value: referenceSchemaUId
				};
				parameter.setMappingValue(parameterValue);
			}
		},

		/**
		 * Saves the filter unit settings.
		 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
		 * @param {String} [parameterName="DataSourceFilters"] Source parameter name.
		 */
		saveDataSourceFilters: function(element, parameterName) {
			if (this.changedValues && this.changedValues.FilterEditData) {
				var filterEditData = this.get("FilterEditData");
				if (Ext.isString(filterEditData)) {
					filterEditData = Terrasoft.deserialize(filterEditData);
				}
				if (element && element.findParameterByName) {
					var considerTimeInFilterParameter = element.findParameterByName("ConsiderTimeInFilter");
					if (considerTimeInFilterParameter) {
						var isConsiderTimeInFilter = this._getParameterBooleanValue(considerTimeInFilterParameter);
						this._considerTimeInFilter(filterEditData, isConsiderTimeInFilter);
					}
				}
				var serializationInfo = filterEditData.getDefSerializationInfo();
				serializationInfo.serializeFilterManagerInfo = true;
				var serializedFilterEditData = filterEditData.serialize(serializationInfo);
				var deserializedFilters = Terrasoft.deserialize(serializedFilterEditData);
				this.deleteParameterDisplayValues(deserializedFilters);
				var serializedFilterData = {
					className: "Terrasoft.FilterGroup",
					serializedFilterEditData: serializedFilterEditData,
					dataSourceFilters: deserializedFilters.serialize()
				};
				serializedFilterData = Terrasoft.encode(serializedFilterData);
				if (!parameterName) {
					parameterName = this.getDefaultDataSourceFiltersParameterName();
				}
				this.setDataSourceFiltersValue(element, parameterName, serializedFilterData);
			}
		},

		/**
		 * Destroys event subscriptions and unloads filter unit module.
		 */
		destroyFilterModuleMixin: function() {
			this.unRegisterFilterModuleMessages();
			this.unloadFilterUnitModule();
		}

		//endregion

	});
});


