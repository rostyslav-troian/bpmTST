Terrasoft.configuration.Structures["MappingEditMixin"] = {innerHierarchyStack: ["MappingEditMixin"]};
define("MappingEditMixin", ["ext-base", "terrasoft", "ModalBox", "MappingEditMixinResources",
		"EntitySchemaSelectMixin", "MenuItemsMappingMixin"],
	function(Ext, Terrasoft, ModalBox) {
		Ext.define("Terrasoft.configuration.mixins.MappingEditMixin", {
			alternateClassName: "Terrasoft.MappingEditMixin",

			mixins: {
				entitySchemaSelectMixin: "Terrasoft.EntitySchemaSelectMixin",
				menuItemsMappingMixin: "Terrasoft.MenuItemsMappingMixin"
			},
			attributes: {
				/**
				 * Type of current designer.
				 * @type {Terrasoft.MappingEnums.DesignerType}
				 */
				DesignerType: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			/**
			 * Opens parameter edit page by parameter label click.
			 * @param {Object} config Configuration object.
			 * @param {String} [config.containerId] Container ID.
			 * @protected
			 */
			onParameterLabelClick: function(config) {
				var name = this.get("Name");
				this.hideParameterView();
				var sandbox = this.sandbox;
				var pageId = this.getParameterEditPageId();
				sandbox.unloadModule(pageId);
				sandbox.subscribe("GetParameterEditInfo", this.getParameterEditInfo, this, [pageId]);
				sandbox.subscribe("SaveParameterInfo", this.saveParameterInfo, this, [pageId]);
				sandbox.subscribe("DiscardParameterInfoChanges", this.discardParameterInfoChanges, this, [pageId]);
				var containerId = config && config.containerId || "item-edit";
				var renderTo = containerId + "-" + name + "-" + sandbox.id;
				var maskId = Terrasoft.Mask.show({
					selector: "#" + renderTo,
					timeout: 100,
					clearMasks: true
				});
				sandbox.loadModule("ProcessSchemaParameterEditModule", {
					renderTo: renderTo,
					id: pageId,
					instanceConfig: {
						maskId: maskId
					}
				});
			},

			/**
			 * Initializes designer type.
			 * @protected
			 */
			initDesignerType: function() {
				var processSchema = this.getProcessSchema();
				if (processSchema) {
					this.set("DesignerType", this.getDesignerTypeBySchemaTypeName(processSchema.typeName));
				}
			},

			/**
			 * Returns type of current designer.
			 * @private
			 * @param {String} schemaTypeName Schema type name.
			 * @return {Terrasoft.MappingEnums.DesignerType|String}
			 */
			getDesignerTypeBySchemaTypeName: function(schemaTypeName) {
				if (schemaTypeName === "Terrasoft.Core.Process.ProcessSchema" ||
						schemaTypeName === "Terrasoft.Core.Process.EmbeddedProcessSchema") {
					return Terrasoft.MappingEnums.DesignerType.PROCESS_DESIGNER;
				}
				return Terrasoft.MappingEnums.DesignerType.DCM_DESIGNER;
			},

			/**
			 * Hides parameter view.
			 * @private
			 */
			hideParameterView: function() {
				this.set("Visible", false);
			},

			/**
			 * Returns parameter info.
			 * @private
			 * @return {Object}
			 */
			getParameterEditInfo: function() {
				return {
					parameters: {
						UId: this.get("UId"),
						Name: this.get("Name"),
						Caption: this.get("Caption"),
						ParameterDataValueTypeConfig: {value: this.get("DataValueType")},
						Value: Terrasoft.deepClone(this.get("Value")),
						ReferenceSchema: {value: this.get("ReferenceSchemaUId")},
						Parameters: this.get("Parameters"),
						IsEnabled: this.get("Enabled"),
						packageUId: this.get("packageUId"),
						ProcessElement: this.$ProcessElement,
						MappingParentHierarchicalUIds: this.getMappingParentHierarchicalUIds(),
						ItemProperties: this.$ItemProperties,
						ParentUId: this.$ParentUId,
						InvokerUId: this.getInvokerUId()
					}
				};
			},

			/**
			 * Discards parameter info changes.
			 * @private
			 */
			discardParameterInfoChanges: function() {
				var pageId = this.getParameterEditPageId();
				this.set("Visible", true);
				this.sandbox.unloadModule(pageId);
			},

			/**
			 * Saves parameter info.
			 * @private
			 * @param {Object} parameterInfo Parameter info.
			 */
			saveParameterInfo: function(parameterInfo) {
				this.set("Name", parameterInfo.Name);
				this.set("Caption", parameterInfo.Caption);
				var dataValueType = parameterInfo.DataValueType.value;
				this.set("DataValueType", dataValueType);
				if (this.changedValues && !Ext.isEmpty(this.changedValues.DataValueType)) {
					var designerUtilities = Terrasoft.ProcessSchemaDesignerUtilities;
					var image = designerUtilities.getDataValueTypeImageUrl(dataValueType);
					this.set("DataValueTypeImage", image);
				}
				if (!parameterInfo.Value || !parameterInfo.Value.value) {
					this._actualizeCollectionMapping();
				}
				var referenceSchemaUId = parameterInfo.ReferenceSchema.value;
				this.set("ReferenceSchemaUId", referenceSchemaUId);
				this.setMappingEditValue("Value", parameterInfo.Value);
				this.set("Visible", true);
				var pageId = this.getParameterEditPageId();
				this.sandbox.unloadModule(pageId);
			},

			/**
			 * Returns page identifier.
			 * @return {String}
			 */
			getParameterEditPageId: function() {
				return this.sandbox.id + "parameteredit";
			},

			/**
			 * Handles prepareMenu event.
			 * @param {Object} [config] Configuration object.
			 * @param {String} [config.attributeName] Attribute name.
			 * @param {String} [config typeMappingMenu] Type mapping menu.
			 */
			onPrepareMenu: function(config) {
				var menuItems = this.getMenuItemsCollection(config);
				this.set("MenuItems", menuItems);
			},

			/**
			 * Returns true if Process Designer is opened, otherwise - false.
			 * @return {Boolean}
			 */
			getIsProcessDesigner: function() {
				this.initDesignerType();
				var designerType = this.get("DesignerType");
				return !designerType || designerType === Terrasoft.MappingEnums.DesignerType.PROCESS_DESIGNER;
			},

			/**
			 * Returns mapping type value for parameter mapping page.
			 * @return {Terrasoft.MappingEnums.MappingType
			 * | Terrasoft.MappingEnums.MappingUnion} Menu item mapping type.
			 */
			getParameterMappingType: function() {
				return this.getIsProcessDesigner()
					? Terrasoft.MappingEnums.MappingUnion.PROCESS_AND_ELEMENT_PARAMETERS
					: Terrasoft.MappingEnums.MappingType.PROCESS_ELEMENT_PARAMETERS;
			},

			/**
			 * Returns mapping module name.
			 * @return {String}
			 */
			getParameterMappingModuleName: function() {
				return this.getIsProcessDesigner() ? "ProcessParameterSelectionModule" : "DcmMappingModule";
			},

			/**
			 * Control value changed handler.
			 * @param {Object} parameterValue Parameter value.
			 * @param {String} parameterName Parameter name.
			 */
			onValueChanged: function(parameterValue, parameterName) {
				var currentValue = this.get(parameterName);
				if (!currentValue || (currentValue.value === parameterValue.value)) {
					return;
				}
				this.set(parameterName, parameterValue);
			},

			/**
			 * Opens mapping window from extended card mode.
			 * @protected
			 */
			openExtendedMappingEditWindow: function() {
				var parameterInfo = this.getParameterInfo();
				var mappingConfig = {
					mappingType: Terrasoft.MappingEnums.MappingType.ALL,
					moduleName: "ProcessMappingModule"
				};
				this.openMappingEditWindow(parameterInfo.parameterName, parameterInfo.parameterValue, mappingConfig);
			},

			/**
			 * Returns parameter name and parameter value.
			 * @return {{parameterName: (*|string), parameterValue: *}} Parameter info object.
			 */
			getParameterInfo: function() {
				var parameterValue = this.get("Value");
				if (parameterValue &&
						(parameterValue.source === Terrasoft.ProcessSchemaParameterValueSource.EntityMapping)) {
					parameterValue = null;
				}
				var parameterName = this.get("Name") || "Value";
				return {
					parameterName: parameterName,
					parameterValue: parameterValue
				};
			},

			/**
			 * Opens mapping window.
			 * @protected
			 * @param {String} parameterName Edited parameter name.
			 * @param {Object} parameterValue Edited parameter value.
			 * @param {Object} mappingConfig .The mapping type and module name in one object;
			 * @param {Terrasoft.MappingType|number} mappingConfig.mappingType Mapping type.
			 * @param {String} mappingConfig.moduleName Name off module.
			 */
			openMappingEditWindow: function(parameterName, parameterValue, mappingConfig) {
				parameterValue = parameterValue || {};
				if (this.validateMappingConfig(mappingConfig)) {
					mappingConfig = {
						mappingType: Terrasoft.MappingEnums.MappingType.ALL,
						moduleName: "ProcessMappingModule"
					};
				}
				var referenceSchemaUId = parameterValue.referenceSchemaUId;
				this.initializeLookupSchema(referenceSchemaUId, function(lookupSchema) {
					var pageId = this.sandbox.id + "ProcessMappingPage";
					this.sandbox.subscribe("SetParametersInfo", function(sourceValue) {
						this.setParametersInfoCallback(parameterName, sourceValue);
					}, this, [pageId]);
					var config = {
						parameterValue: parameterValue,
						parameterName: parameterName,
						mappingConfig: mappingConfig,
						lookupSchema: lookupSchema,
						referenceSchemaUId: referenceSchemaUId
					};
					var viewModelConfig = this.getViewModelConfig(config);
					var preparedViewModuleConfig = this.prepareViewModuleConfig(viewModelConfig);
					this.loadMappingModule(pageId, preparedViewModuleConfig, mappingConfig.moduleName);
				}, this);
			},

			/**
			 * Returns lookup filter.
			 * @private
			 * @param {String} attributeName Attribute name.
			 * @return {Terrasoft.FilterGroup|null}
			 */
			_getLookupFilter: function(attributeName) {
				var column = this.columns[attributeName];
				var mappingWindowConfig = column && column.mappingWindowConfig;
				var filterMethod = mappingWindowConfig && mappingWindowConfig.filterMethod;
				return filterMethod && this[filterMethod]();
			},

			/**
			 * Opens process parameters mapping window for email content builder.
			 * @protected
			 * @param {Function} callback Callback for modal box result handler.
			 * @param {Object} scope Scope for modal box callback.
			 */
			openEmailMappingWindow: function(callback, scope) {
				var pageId = this.sandbox.id + "ProcessMappingPage";
				var mappingType = this.getParameterMappingType();
				var allowedDataValueTypes = this.getEmailMappingWindowDataValueTypes();
				var mappingConfig = {
					mappingType: mappingType,
					moduleName: this.getParameterMappingModuleName(),
					filterConfig: {
						allowedDataValueTypes: allowedDataValueTypes
					}
				};
				var config = {
					parameterValue: {},
					mappingConfig: mappingConfig
				};
				this.sandbox.subscribe("SetParametersInfo", function(sourceValue) {
					ModalBox.close();
					callback.call(scope, sourceValue);
				}, this, [pageId]);
				var viewModelConfig = this.getViewModelConfig(config);
				var preparedViewModuleConfig = this.prepareViewModuleConfig(viewModelConfig);
				this.loadMappingModule(pageId, preparedViewModuleConfig, mappingConfig.moduleName);
			},

			/**
			 * Returns array of allowed for email content builder data value types.
			 * @protected
			 * @return {*[]} Array of allowed data value types.
			 */
			getEmailMappingWindowDataValueTypes: function() {
				return [
					Terrasoft.DataValueType.TEXT,
					Terrasoft.DataValueType.INTEGER,
					Terrasoft.DataValueType.FLOAT,
					Terrasoft.DataValueType.DATE_TIME,
					Terrasoft.DataValueType.DATE,
					Terrasoft.DataValueType.TIME,
					Terrasoft.DataValueType.BOOLEAN,
					Terrasoft.DataValueType.SHORT_TEXT,
					Terrasoft.DataValueType.MEDIUM_TEXT,
					Terrasoft.DataValueType.MAXSIZE_TEXT,
					Terrasoft.DataValueType.LONG_TEXT,
					Terrasoft.DataValueType.LOCALIZABLE_STRING,
					Terrasoft.DataValueType.FLOAT1,
					Terrasoft.DataValueType.FLOAT2,
					Terrasoft.DataValueType.FLOAT3,
					Terrasoft.DataValueType.FLOAT4
				];
			},

			/**
			 * Returns mappingConfig validation result.
			 * @private
			 * @param {Object} mappingConfig .The mapping type and module name in one object;
			 * @return {Boolean} validation result.
			 */
			validateMappingConfig: function(mappingConfig) {
				return !mappingConfig || Ext.isString(mappingConfig);
			},

			/**
			 * Returns viewModel config.
			 * @private
			 * @param {Object} config configuration object.
			 * @return {Object} viewModel config by sandbox.loadModule.
			 */
			getViewModelConfig: function(config) {
				var mappingConfig = config.mappingConfig;
				var parameterValue = config.parameterValue;
				var parameterName = config.parameterName;
				var isLookupEnabled = this.getIsLookupEnabled(config.referenceSchemaUId, parameterValue);
				var mappingType = mappingConfig.mappingType;
				var source = parameterValue.source || Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
				var filter = this._getLookupFilter(parameterName);
				var serializationInfo = {serializeFilterManagerInfo: true};
				var lookupSerializableFilter = filter && filter.serialize(serializationInfo);
				var pageConfig = this.getPageConfig(parameterValue, mappingConfig);
				return {
					packageUId: this.get("packageUId"),
					FormulaValue: parameterValue.value,
					LookupSchema: config.lookupSchema,
					LookupSerializableFilter: lookupSerializableFilter,
					Source: source,
					DataValueType: parameterValue.dataValueType,
					ParameterName: config.parameterName,
					ElementName: this.get("name"),
					ElementUId: this.get("uId"),
					IsLookupEnabled: isLookupEnabled,
					MappingType: mappingType,
					PageConfig: pageConfig,
					InvokerItemTag: mappingConfig.invokerItemTag
				};
			},

			/**
			 * Returns IsLookupEnabled value.
			 * @private
			 * @param {Object} referenceSchemaUId UId by reference schema.
			 * @param {Object} parameterValue Edited parameter value.
			 * @return {Boolean} IsLookupEnabled value.
			 */
			getIsLookupEnabled: function(referenceSchemaUId, parameterValue) {
				return referenceSchemaUId && parameterValue.hasOwnProperty("isLookupEnabled")
						? parameterValue.isLookupEnabled
						: true;
			},

			/**
			 * Returns config by children page(tabs).
			 * @private
			 * @param {Object} parameterValue Edited parameter value.
			 * @param {Object} mappingConfig Configuration object.
			 * @param {Terrasoft.MappingType|number} mappingConfig.mappingType Mapping type.
			 * @return {Object} config by children page(tabs).
			 */
			getPageConfig: function(parameterValue, mappingConfig) {
				var invokerUId = this.getInvokerUId();
				var mappingType = mappingConfig.mappingType;
				var pageConfig = {
					InvokerUId: invokerUId,
					itemDataValueType: mappingConfig.itemDataValueType,
					presentDisplayValue: mappingConfig.presentDisplayValue,
					FilterConfig: mappingConfig.filterConfig,
					FormulaConfig: mappingConfig.formulaConfig,
					MappingParentHierarchicalUIds: this.getMappingParentHierarchicalUIds(),
					HasParent: Boolean(this.$ParentUId)
				};
				if (parameterValue.dataValueType !== null && mappingType > Terrasoft.MappingEnums.MappingType.ALL) {
					pageConfig.DataValueType = parameterValue.dataValueType;
					if (Terrasoft.isLookupValidator(parameterValue.dataValueType) &&
							parameterValue.referenceSchemaUId) {
						pageConfig.referenceSchemaUId = parameterValue.referenceSchemaUId;
					}
				}
				return pageConfig;
			},

			/**
			 * Prepare config for sandbox loadModule.
			 * @private
			 * @param {Object} config any js object.
			 * @return {Object} prepared config
			 */
			prepareViewModuleConfig: function(config) {
				for (var property in config) {
					if (Ext.isEmpty(config[property])) {
						delete config[property];
					}
					if (Ext.isObject(config[property])) {
						this.prepareViewModuleConfig(config[property]);
					}
				}
				return config;
			},

			/**
			 * @private
			 */
			_getDisplayValue: function(parameter, element) {
				var displayValueMacros = Terrasoft.FormulaMacros.prepareProcessElementParameterDisplayValue(
					element.getCaption(), parameter.getFullCaption());
				return Terrasoft.ProcessSchemaDesignerUtilities.addParameterMask(
					displayValueMacros.getBody());
			},

			/**
			 * @private
			 */
			_getProcessSchemaElement: function(parameterInfo) {
				var processSchema = this.$ProcessElement.parentSchema;
				var schemaElementUId = parameterInfo && parameterInfo.schemaElementUId;
				return schemaElementUId ? processSchema.findItemByUId(schemaElementUId) : processSchema;
			},

			/**
			 * @private
			 */
			_getPreparedFormulaResult: function(displayValue, dataValueType, value) {
				var result = {
					value: value,
					isValid: true,
					displayValue: displayValue,
					source: Ext.isEmpty(value)
						? Terrasoft.ProcessSchemaParameterValueSource.None
						: Terrasoft.ProcessSchemaParameterValueSource.Script,
					dataValueType: dataValueType
				};
				return result;
			},

			/**
			 * @private
			 */
			_findParameterInHierarchicalCollection: function (collection, uId) {
				var parameter = null;
				if (Terrasoft.isInstanceOfClass(collection, "Terrasoft.Collection")) {
					collection.each(function (item) {
						if (!parameter) {
							if (item.$UId === uId) {
								parameter = item;
							} else {
								parameter = this._findParameterInHierarchicalCollection(item.$ItemProperties, uId);
							}
						}
					}, this);
				}
				return parameter;
			},

			/**
			 * @private
			 */
			_getEmptyValue: function () {
				return {
					value: null,
					displayValue: null,
					source: Terrasoft.ProcessSchemaParameterValueSource.None
				};
			},

			/**
			 * @private
			 */
			_actualizeCollectionMapping: function() {
				this.tryClearParentValue();
				this.clearNestedValues();
			},

			/**
			 * Sets parameter value from formula page.
			 * @private
			 * @param {String} parameterName Parameter name.
			 * @param {Object} sourceValue Parameter value.
			 * @param {Object} [options] Options object.
			 */
			_setMappingEditValue: function(parameterName, sourceValue, options) {
				var currentValue = this.get(parameterName);
				var newValue = Ext.isObject(currentValue) ? Ext.applyIf(sourceValue, currentValue) : sourceValue;
				newValue.dataValueType = newValue.dataValueType || this.get("DataValueType");
				if (!this.getIsFormulaUserTask()) {
					this.convertStringLiteralSourceValueToConst(newValue);
				}
				this.set(parameterName, newValue, options);
				if (parameterName !== "Value") {
					this.set("Value", newValue, options);
				}
			},

			/**
			 * Loads module for mapping.
			 * @param {String} pageId Id page for sandbox.
			 * @param {Object} viewModelConfig viewModelConfig configuration Object.
			 * @param {String} moduleName Name off module.
			 */
			loadMappingModule: function(pageId, viewModelConfig, moduleName) {
				var modalBoxConfig = this.getMappingPageModalBoxConfig(moduleName);
				var windowRenderTo = this.showModuleModalBox(pageId, modalBoxConfig);
				this.sandbox.loadModule(moduleName, {
					renderTo: windowRenderTo,
					id: pageId,
					instanceConfig: {
						parameters: {
							viewModelConfig: viewModelConfig
						}
					}
				});
			},

			/**
			 * Callback for 'SetParametersInfo' message subscription.
			 * @protected
			 * @param parameterName
			 * @param sourceValue
			 */
			setParametersInfoCallback: function(parameterName, sourceValue) {
				if (!sourceValue || !sourceValue.value) {
					this._actualizeCollectionMapping();
				}
				this.setMappingEditValue(parameterName, sourceValue);
				this.closeModalBox();
			},

			/**
			 * Returns mixin invoker uId.
			 * @returns {Terrasoft.utils.guid} UId of the invoker.
			 * @virtual
			 */
			getInvokerUId: function() {
				return "";
			},

			/**
			 * Returns process schema.
			 * @returns {Terrasoft.ProcessSchema} Process schema.
			 * @private
			 */
			getProcessSchema: function() {
				return this.sandbox.publish("GetProcessSchema");
			},

			/**
			 * Determines if the value is a single C# string literal and returns it without quotes.
			 * @private
			 * @param {String} value The value.
			 * @return {String|null} If the value is a string literal then returns it without quotes.
			 * Otherwise - returns null.
			 */
			getStringLiteral: function(value) {
				if (!value) {
					return null;
				}
				var stringLiteralRegExp = /^\s*"((?:\\.|[^\\"])*)"\s*$/;
				var matches = value.match(stringLiteralRegExp);
				if (!matches || matches.length < 2) {
					return null;
				}
				return matches[1];
			},

			/**
			 * Converts the source value to constant if the value is a single string literal (except FormulaUserTask).
			 * @private
			 * @param {Object} sourceValue The source value.
			 */
			convertStringLiteralSourceValueToConst: function(sourceValue) {
				if (!sourceValue) {
					return;
				}
				var valueSources = Terrasoft.process.enums.ProcessSchemaParameterValueSource;
				var isTextDataValueType = Terrasoft.isTextDataValueType(sourceValue.dataValueType);
				var isScript = (sourceValue.source === valueSources.Script);
				if (!isTextDataValueType || !isScript) {
					return;
				}
				var value = sourceValue.value;
				var valueWithoutQuotes = this.getStringLiteral(value);
				if (valueWithoutQuotes === null) {
					return;
				}
				sourceValue.value = valueWithoutQuotes;
				sourceValue.displayValue = valueWithoutQuotes;
				sourceValue.source = valueSources.ConstValue;
			},

			/**
			 * Determines if the current element is FormulaUserTask.
			 * @private
			 * @return {Boolean}
			 */
			getIsFormulaUserTask: function() {
				var processElement = this.get("ProcessElement");
				return processElement instanceof Terrasoft.manager.ProcessFormulaTaskSchema;
			},

			/**
			 * Returns default mapping edit config.
			 * @protected
			 * @return {Object}
			 */
			getDefaultMappingEditConfig: function(valueColumnName) {
				return {
					id: "Value",
					className: "Terrasoft.MappingEdit",
					value: {
						bindTo: valueColumnName
					},
					openEditWindow: {
						bindTo: "openExtendedMappingEditWindow"
					},
					prepareMenu: {
						bindTo: "onPrepareMenu"
					},
					menu: {
						items: {bindTo: "MenuItems"}
					},
					tag: "Value"
				};
			},

			/**
			 * On clear icon click handler.
			 * @public
			 */
			onClearIconClick: function() {
				this.tryClearParentValue();
			},

			/**
			 * Clear nested parameter value.
			 * @public
			 */
			clearNestedValues: function() {
				if (this.hasNestedParameters()) {
					this.$ItemProperties.each(function(item) {
						if (item.hasCollectionValue()) {
							item.setMappingEditValue("Value", this._getEmptyValue());
						}
						item.clearNestedValues();
					}, this);
				}
			},

			/**
			 * Clear parent parameter value.
			 * @public
			 */
			tryClearParentValue: function() {
				var excludeUIds = [];
				excludeUIds.push(this.$UId);
				var parent = this._findParameterInHierarchicalCollection(this.$Parameters, this.$ParentUId);
				var result = parent && parent.hasValue() && !parent.hasCollectionInNestedParameterValues(excludeUIds);
				if (result) {
					parent.setMappingEditValue("Value", this._getEmptyValue());
					parent.tryClearParentValue();
				}
				return result;
			},

			/**
			 * Returns all uid for all parents paremeters.
			 * @return {Array}.
			 */
			getMappingParentHierarchicalUIds: function() {
				var uIds = [];
				var parameterInfo = this.getMappingParentParameterInfo();
				if (parameterInfo && parameterInfo.parameterUId) {
					var parentMappingParameter = this.getMappingParameter(parameterInfo);
					uIds =_.union([parameterInfo.parameterUId], uIds,
						parentMappingParameter.getHierarchicalParentsUIds());
				}
				return uIds;
			},

			/**
			 * Sets mapping values.
			 * @public
			 * @param parameterName {String} Parameter name.
			 * @param sourceValue {String} Source value.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			setMappingEditValue: function(parameterName, sourceValue, options, callback, scope) {
				this._setMappingEditValue(parameterName, sourceValue, options);
				if (this.$ParentUId) {
					this.setParentMappingEditValue(sourceValue, callback, scope);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * Applies config to parameter in both class and process element parameter.
			 * @param {String} parameterName Parameter name.
			 * @param {Object} sourceValue Parameter value.
			 * @param {Object} [options] Options object.
			 */
			applyParameterMappingEditValue: function(parameterName, config, options) {
				var newValue = Ext.apply({}, config, this.get(parameterName));
				this.setMappingEditValue(parameterName, newValue, options);
				var processElement = this.get("ProcessElement");
				var parameter = processElement.findParameterByName(parameterName);
				parameter.setMappingValue(newValue);
			},

			/**
			 * Closes modal box.
			 * @protected
			 */
			closeModalBox: function() {
				ModalBox.close();
				this.onItemFocused();
			},

			/**
			 * Event of focusing editing element.
			 * @protected
			 */
			onItemFocused: Terrasoft.emptyFn,

			/**
			 * @deprecated
			 */
			getMappingWindowRenderTo: function(modalBoxConfig) {
				var innerBoxContainer = ModalBox.show(modalBoxConfig, Ext.emptyFn, this);
				return innerBoxContainer.id;
			},

			/**
			 * @private
			 */
			_processParentFormulaParamater: function(formulaParameter, callback, scope) {
				const parameterInfo = Terrasoft.FormulaParserUtils.getParameterMappingInfo(formulaParameter);
				const parameter = this.getMappingParameter(parameterInfo);
				const parentParameter = parameter && parameter.getParent();
				if (parentParameter) {
					const element = this._getProcessSchemaElement(parameterInfo);
					const displayValue = this._getDisplayValue(parentParameter, element);
					Terrasoft.FormulaParserUtils.parseFormulaValue({
						displayValue: displayValue,
						schema: this.$ProcessElement.parentSchema,
						dataValueType: parentParameter.dataValueType,
						parameterName: parentParameter.name,
						elementName: element.name
					}, function(result) {
						const parent = this._findParameterInHierarchicalCollection(this.$Parameters,
								this.$ParentUId);
						if (parent && !parent.hasValue()) {
							const formulaResult = this._getPreparedFormulaResult(displayValue,
									parentParameter.dataValueType, result.value);
							parent.setMappingEditValue("Value", formulaResult, null, callback, scope);
						} else {
							Ext.callback(callback, scope);
						}
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * Sets parent mapping values.
			 * @protected
			 * @param {String} sourceValue Source value to be set up.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			setParentMappingEditValue: function(sourceValue, callback, scope) {
				Terrasoft.FormulaParserUtils.getFormulaParameters(sourceValue.value, this.$ProcessSchema,
						function(formulaParameters) {
					Terrasoft.eachAsync(
						formulaParameters,
						function(formulaParameter, next) {
							this._processParentFormulaParamater(formulaParameter, next, this);
						},
						function() {
							Ext.callback(callback, scope);
						},
						this
					);
				}, this);
			},

			/**
			 * Shows modal box for module.
			 * @protected
			 * @param {String} moduleId Module identifier.
			 * @param {Object} modalBoxConfig  Modal box config.
			 * @return {String} Container element id for renderTo.
			 */
			showModuleModalBox: function(moduleId, modalBoxConfig) {
				var renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}, this);
				return renderTo.id;
			},

			/**
			 * Returns modal box settings.
			 * @private
			 * @param {String} moduleName Name off module.
			 * @return {Object} Modal box settings.
			*/
			getMappingPageModalBoxConfig: function(moduleName) {
				var getModalBoxConfig = moduleName === "DateTimeMappingModule"
					? Terrasoft.ProcessSchemaDesignerUtilities.getDateTimeModalBoxConfig
					: Terrasoft.ProcessSchemaDesignerUtilities.getModalBoxConfig;
				return getModalBoxConfig();
			},

			/**
			 * Returns mapping parameter by parameterInfo
			 */
			getMappingParameter: function(parameterInfo) {
				var processSchema = this.$ProcessElement.parentSchema;
				var mappingParameter = Terrasoft.FormulaParserUtils.findMappingParameter(parameterInfo, processSchema);
				return mappingParameter;
			},

			/**
			 * Initializes a reference schema parameter for the mapping window.
			 * @param {GUID} referenceSchemaUId Schema identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initializeLookupSchema: function(referenceSchemaUId, callback, scope) {
				if (!referenceSchemaUId || Terrasoft.isEmptyGUID(referenceSchemaUId)) {
					callback.call(scope);
					return;
				}
				this.getEntitySchemaInfo(referenceSchemaUId, function(info) {
					callback.call(scope, info);
				}, this);
			},

			/**
			 * Returns parameter info for first actual parent.
			 * @public
			 * @return {Object}.
			 */
			getMappingParentParameterInfo: function() {
				var parent = this._findParameterInHierarchicalCollection(this.$Parameters, this.$ParentUId);
				var parameterInfo = null;
				if (parent) {
					parameterInfo = parent.hasValue()
						? Terrasoft.FormulaParserUtils.getParameterMappingInfo(parent.$Value.value)
						: parent.getMappingParentParameterInfo();
				}
				return parameterInfo;
			},

			/**
			 * Returns has value indicator.
			 * @public
			 * @return {Boolean}.
			 */
			hasValue: function() {
				return Boolean(this.$Value && this.$Value.value);
			},

			/**
			 * Returns has nested parameters indicator.
			 * @public
			 * @return {Boolean}.
			 */
			hasNestedParameters: function() {
				var itemProperties = this.$ItemProperties;
				return Terrasoft.isInstanceOfClass(itemProperties, "Terrasoft.Collection") && !itemProperties.isEmpty();
			},

			/**
			 * Returns has collection value indicator.
			 * @public
			 * @return {Boolean}.
			 */
			hasCollectionValue: function() {
				let result = false;
				if (this.hasValue()) {
					Terrasoft.FormulaParserUtils.getFormulaParameters(this.$Value.value, this.$ProcessSchema,
							function(formulaParameters) {
						formulaParameters.some(function(formulaParameter) {
							const parameterInfo =
									Terrasoft.FormulaParserUtils.getParameterMappingInfo(formulaParameter);
							const parameter = this.getMappingParameter(parameterInfo);
							result = parameter ? parameter.hasParent() : false;
							return result;
						}, this);
					}, this);
				}
				return result;
			},

			/**
			 * Returns has nested parameter value indicator.
			 * @public
			 * @param {Array} excludeUIds UIds exclude items.
			 * @return {Boolean}.
			 */
			hasCollectionInNestedParameterValues: function(excludeUIds) {
				excludeUIds = excludeUIds || [];
				var hasNestedParameterValue = false;
				if (this.hasNestedParameters()) {
					this.$ItemProperties.each(function (item) {
						if (!Ext.Array.contains(excludeUIds, item.$UId)) {
							hasNestedParameterValue = hasNestedParameterValue || item.hasCollectionValue();
						}
					});
				}
				return hasNestedParameterValue;
			},

			/**
			 * Clears parameter value.
			 */
			clearParameterValue: function() {
				var parameterValue = this.get("Value");
				parameterValue.value = "";
				parameterValue.displayValue = "";
				parameterValue.source = Terrasoft.ProcessSchemaParameterValueSource.None;
			}
		});
	});


