Terrasoft.configuration.Structures["ProcessFlowElementPropertiesPage"] = {innerHierarchyStack: ["ProcessFlowElementPropertiesPage"], structureParent: "BaseProcessSchemaElementPropertiesPage"};
define('ProcessFlowElementPropertiesPageStructure', ['ProcessFlowElementPropertiesPageResources'], function(resources) {return {schemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',schemaCaption: "ProcessFlowElementPropertiesPage", parentSchemaName: "BaseProcessSchemaElementPropertiesPage", schemaName:'ProcessFlowElementPropertiesPage',parentSchemaUId:'10a8efdc-8474-4a9a-b28f-ab96ec9bbe4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ProcessFlowElementPropertiesPage edit page schema.
 * Parent: BaseProcessSchemaElementPropertiesPage
 */
define("ProcessFlowElementPropertiesPage", ["terrasoft", "ProcessFlowElementPropertiesPageResources",
		"ConfigurationItemGenerator", "LookupUtilitiesV2", "ProcessSchemaParameterEditModule", "MappingEditMixin",
		"ProcessSchemaParameterViewModel", "ProcessSchemaParameterViewConfig", "HierarchicalContainerList"],
	function(Terrasoft, resources) {
		return {
			mixins: {
				mappingEditMixin: "Terrasoft.MappingEditMixin"
			},
			properties: {
				/**
				 * Schema manager name, used for outdated schema notifications.
				 * @protected
				 * @virtual
				 * @type {String}
				 */
				schemaManagerName: null,

				/**
				 * Use websocket notifications.
				 * @protected
				 * @type {Boolean}
				 */
				useNotification: false
			},
			messages: {
				/**
				 * @message GetParametersInfo
				 * Pass parameter values.
				 */
				"GetParametersInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetParametersInfo
				 * Specifies parameter values.
				 */
				"SetParametersInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SaveParameterInfo
				 * Save parameter info message.
				 */
				"SaveParameterInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DiscardParameterInfoChanges
				 * Close and unloads parameter edit page message.
				 */
				"DiscardParameterInfoChanges": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetParameterEditInfo
				 * Sends parameter info to parameter edit page message.
				 */
				"GetParameterEditInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetItemEditInfo
				 * Sends item info to item edit page message.
				 */
				"GetItemEditInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message DiscardItemInfoChanges
				 * Close and unloads item edit page message.
				 */
				"DiscardItemInfoChanges": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SaveItemInfo
				 * Save item info message.
				 */
				"SaveItemInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SaveParameter
				 * Message for save editing parameter.
				 */
				"SaveParameter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * Flag that indicates is element logging or not.
				 */
				"isLogging": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.IsLoggingCaption
				},

				/**
				 * Flag that indicates serialization in database.
				 */
				"serializeToDB": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.SerializeToDBCaption
				},

				/**
				 * Value that indicates whether the current element is used background mode.
				 */
				"useBackgroundMode": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.UseBackgroundModeCaption
				},

				/**
				 * Process element parameters.
				 */
				"Parameters": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},

				/**
				 * Flag that indicates the lack of parameters.
				 */
				"IsEmptyParameters": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Flag that indicates availability of editing SerializeToDB field.
				 */
				"IsSerializeToDBEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Flag that indicates visibility of SerializeToDB field.
				 */
				"IsSerializeToDBVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Flag that indicates visibility of IsLogging field.
				 */
				"IsLoggingVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Active parameter edit identifier.
				 */
				"ActiveParameterEditUId": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: null
				}

			},
			methods: {

				/**
				 * @inheritdoc BaseSchemaViewModel#constructor
				 * @overridden
				 */
				constructor: function() {
					this.callParent(arguments);
					this.$Parameters = Ext.create("Terrasoft.ObjectCollection");
				},

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(element, callback, scope) {
					var parentMethod = this.getParentMethod();
					Terrasoft.chain(
						function(next) {
							parentMethod.call(this, element, next, this);
						},
						function(next) {
							this.clearParameters();
							this.initElementProperty(element, next, this);
						},
						function(next) {
							if (this.getHasParameters()) {
								element.updateParametersDisplayValue(next, this);
							} else {
								next();
							}
						},
						function() {
							this.initDefaultTab(element);
							var isEditPageDefault = this.getIsEditPageDefault(element.editPageSchemaName);
							if (isEditPageDefault) {
								this.initBaseParameters(element);
							} else {
								this.initParameters(element);
							}
							callback.call(scope);
						}, this);
				},

				/**
				 * Initializes element property.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				initElementProperty: function(element, callback, scope) {
					var isLoggingVisible = this.getIsLoggingVisible();
					this.set("IsLoggingVisible", isLoggingVisible);
					if (isLoggingVisible) {
						this.set("isLogging", element.isLogging);
					}
					this.set("useBackgroundMode", element.useBackgroundMode);
					var isSerializeToDBVisible = this.getIsSerializeToDBVisible();
					this.set("IsSerializeToDBVisible", isSerializeToDBVisible);
					if (isSerializeToDBVisible) {
						this.initIsSerializeToDB(element);
						this.initIsSerializeToDBEnabled(element, callback, scope);
					} else {
						callback.call(scope);
					}
				},

				/**
				 * Initializes SerializeToDB property.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initIsSerializeToDB: function(element) {
					this.set("serializeToDB", element.serializeToDB);
				},

				/**
				 * Returns flag that indicates visibility of SerializeToDB field.
				 * @return {Boolean} Visibility of SerializeToDB field.
				 */
				getIsSerializeToDBVisible: function() {
					const element = this.get("ProcessElement");
					return !element.parentSchema || !element.parentSchema.isEmbedded;
				},

				/**
				 * Returns flag that indicates visibility of IsLogging field.
				 * @return {Boolean} Visibility of IsLogging field.
				 */
				getIsLoggingVisible: function() {
					const element = this.get("ProcessElement");
					return !element.parentSchema || !element.parentSchema.isEmbedded;
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getDefaultTabName
				 * @overridden
				 */
				getDefaultTabName: function() {
					var defaultTabName = this.callParent(arguments);
					var element = this.get("ProcessElement");
					var parameters = element.parameters;
					if (parameters && !parameters.isEmpty()) {
						var tabsCollection = this.get("TabsCollection");
						var firstTab = tabsCollection.getByIndex(0);
						defaultTabName = firstTab.get("Name");
					}
					return defaultTabName;
				},

				/**
				 * The event handler clicking on the Advanced mode menu.
				 * @private
				 */
				onPageModeClick: function() {
					this.callParent(arguments);
					var isExtendedMode = this.get("IsExtendedMode");
					var element = this.get("ProcessElement");
					if (isExtendedMode) {
						this.initBaseParameters(element);
					} else {
						this.saveExtendedValues();
						this.initParameters(element);
					}
				},

				/**
				 * Initializes "IsSerializeToDBEnabled" by user task schema.
				 * @private
				 * @param {String} managerName The manager name.
				 * @param {String} itemUId Manager item identifier.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The callback scope.
				 */
				_setIsSerializeToDbEnabled: function(managerName, itemUId, callback, scope) {
					var manager = Terrasoft[managerName];
					manager.initialize(function() {
						var item = manager.getItem(itemUId);
						var serializeToDB = item.instance.serializeToDB;
						this.set("IsSerializeToDBEnabled", !serializeToDB);
						callback.call(scope);
					}, this);
				},

				/**
				 * Determines whether the schema element can be used in background processes.
				 * @return {Boolean} True, if functionality is enabled; otherwise - False.
				 */
				canUseBackgroundProcessMode: function() {
					const element = this.get("ProcessElement");
					return this.Terrasoft.Features.getIsEnabled("UseBackgroundProcessMode") &&
						!element.parentSchema.isEmbedded;
				},

				/**
				 * Initializes the value of an attribute IsSerializeToDBEnabled.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				initIsSerializeToDBEnabled: function(element, callback, scope) {
					if (element instanceof Terrasoft.ProcessUserTaskSchema) {
						this._setIsSerializeToDbEnabled(element.taskSchemaManagerName,
							element.managerItemUId, callback, scope);
					} else {
						this.set("IsSerializeToDBEnabled", true);
						callback.call(scope);
					}
				},

				/**
				 * Initializes the attributes of the element parameters.
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 */
				initParameters: function(element) {
					this.initDesignerType();
					Terrasoft.each(this.columns, function(columnConfig, columnName) {
						var parameter = element.findParameterByName(columnName);
						var initMethod = this._getColumnInitMethod(columnConfig);
						if (!Ext.isEmpty(initMethod)) {
							this[initMethod](parameter);
						}
						if (parameter) {
							this.initParameterFromColumnConfig(columnConfig, parameter);
						}
					}, this);
				},

				/**
				 * Returns column init method name from column config.
				 * @param {Object} columnConfig Column config.
				 * @return {String} Column init method name.
				 */
				_getColumnInitMethod: function(columnConfig) {
					var bindConfig = columnConfig.parameterBindConfig;
					return columnConfig.initMethod || bindConfig && bindConfig.onInit;
				},

				/**
				 * Returns column save method name from column config.
				 * @param {Object} columnConfig Column config.
				 * @return {String} Column save method name.
				 */
				_getColumnSaveMethod: function(columnConfig) {
					var bindConfig = columnConfig.parameterBindConfig;
					return columnConfig.doAutoSave ? "saveParameter" : bindConfig && bindConfig.onSave;
				},

				/**
				 * @private
				 */
				_findParameter: function(uId) {
					var parameters = this.get("Parameters");
					var parameter = this._findInNestedParameters(parameters, uId);
					if (!parameter) {
						for (var i = 0; i < parameters.getCount(); i++) {
							parameter = this._findInNestedParameters(parameters.getByIndex(i).$ItemProperties, uId) || parameter;
						}
					}
					return parameter;
				},

				/**
				 * @private
				 */
				_findInNestedParameters: function(parameterCollection, uId) {
					if (!parameterCollection) {
						return false;
					}
					var serviceParameter = parameterCollection.findByPath("$UId", uId);
					if (serviceParameter) {
						return serviceParameter;
					}
					parameterCollection.each(function(item) {
						var serviceParameterInner = this._findInNestedParameters(item.$itemProperties, uId);
						if (serviceParameterInner) {
							serviceParameter = serviceParameterInner;
						}
					}, this);
					return serviceParameter;
				},

				/**
				 * Saves nested parameter view models.
				 * @private
				 */
				_saveNestedCollection: function(models) {
					models.each(function(model) {
						var element = this.get("ProcessElement");
						this.saveExtendedValue(model, element);
						if (model.hasItemProperties()) {
							this._saveNestedCollection(model.$ItemProperties);
						}
					}, this);
				},

				/**
				 * @private
				 */
				_sortParameterCollection: function(collection) {
					var required = collection.filterByFn(function(parameter) {
						return parameter.$IsRequired;
					});
					var optional = collection.filterByFn(function(parameter) {
						return !parameter.$IsRequired;
					});
					required.sortByFn(function(item1, item2) {
						return item1.$Caption.localeCompare(item2.$Caption);
					});
					optional.sortByFn(function(item1, item2) {
						return item1.$Caption.localeCompare(item2.$Caption);
					});
					collection.clear();
					collection.loadAll(required);
					collection.loadAll(optional);
					return collection;
				},

				/**
				 * Initializes additional properties in parameter from column config.
				 * @private
				 * @param {Object} columnConfig Columns config.
				 * @param {Object} parameter Process schema parameter.
				 */
				initParameterFromColumnConfig: function(columnConfig, parameter) {
					parameter.skipValidation = columnConfig.skipValidation || false;
					parameter.forceRemove = columnConfig.forceRemove || false;
					parameter.parameterBindConfig = columnConfig.parameterBindConfig;
				},

				/**
				 * Save parameter.
				 * @protected
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				saveParameter: function(parameter) {
					var sourceValue = this.getParameterSourceValue(parameter);
					parameter.setMappingValue(sourceValue);
				},

				/**
				 * Returns parameter mapping source value.
				 * @protected
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 * @return {Object}
				 */
				getParameterSourceValue: function(parameter) {
					var parameterName = parameter.name;
					var sourceValue = {};
					var attributeValue = this.get(parameterName);
					if (attributeValue != null) {
						var column = this.columns[parameterName];
						if (column.dataValueType === Terrasoft.DataValueType.MAPPING) {
							sourceValue = attributeValue;
						} else {
							if (column.dataValueType === Terrasoft.DataValueType.LOOKUP) {
								sourceValue.value = attributeValue.value;
								sourceValue.displayValue = attributeValue.displayValue;
							} else {
								sourceValue.value = attributeValue;
								sourceValue.displayValue = Ext.isEmpty(attributeValue)
									? attributeValue
									: attributeValue.toString();
							}
							sourceValue.source = Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
						}
					}
					return sourceValue;
				},

				/**
				 * Sets the value of the property.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				initProperty: function(parameter) {
					var parameterName = parameter.name;
					this.set(parameterName, this.getParameterValue(parameter));
				},

				/**
				 * Sets the property value without triggering model events.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				initPropertySilent: function(parameter) {
					var parameterName = parameter.name;
					var parameterValue = this.getParameterValue(parameter);
					var silent = !parameterValue || !parameterValue.value;
					this.set(parameterName, parameterValue, {
						silent: silent
					});
				},

				/**
				 * Returns the value of parameter.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				getParameterValue: function(parameter) {
					var column = this.columns[parameter.name];
					if (column.dataValueType === Terrasoft.DataValueType.MAPPING) {
						return parameter.getMappingValue();
					} else {
						return parameter.getValue();
					}
				},

				/**
				 * Initializes OwnerId parameter.
				 * @private
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Task parameter.
				 */
				initOwner: function(parameter) {
					var mappingValue = parameter.getMappingValue();
					if (!mappingValue.value) {
						mappingValue.value = this.getCurrentUserContactMappingValue();
						mappingValue.source = Terrasoft.ProcessSchemaParameterValueSource.Script;
						var value = mappingValue.value;
						var element = this.get("ProcessElement");
						var schema = element.parentSchema;
						Terrasoft.FormulaParserUtils.getFormulaDisplayValue(value, schema, function(displayValue) {
							mappingValue.displayValue = displayValue;
							this.set("OwnerId", mappingValue);
						}, this);
					} else {
						this.set("OwnerId", mappingValue);
					}
				},

				/**
				 * Returns current suer contact macros string.
				 * @private
				 * @return {String} Current contact macros string.
				 */
				getCurrentUserContactMappingValue: function() {
					var macros = Terrasoft.FormulaMacros.prepareSysVariableValue(
						Terrasoft.SystemValueType.CURRENT_USER_CONTACT);
					return macros.toString();
				},

				/**
				 * Clears view model parameters.
				 * @private
				 */
				clearParameters: function() {
					var parameters = this.get("Parameters");
					if (parameters) {
						parameters.clear();
					}
				},

				/**
				 * Returns flag that indicates empty Parameters or not.
				 * @private
				 * @return {Boolean} Returns flag that indicates empty Parameters or not.
				 */
				getHasParameters: function() {
					var element = this.get("ProcessElement");
					var elementParameters = element.parameters;
					return elementParameters ? !elementParameters.isEmpty() : false;
				},

				/**
				 * Initializes element parameters ViewModel.
				 * @protected
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @param {Boolean} skipValidation Flag that indicates when to skip parameter validation.
				 */
				initBaseParameters: function(element, skipValidation) {
					this.clearParameters();
					var parameters = this.get("Parameters");
					var elementParameters = Terrasoft.Features.getIsEnabled("ProcessParameterCollections") || Terrasoft.isDebug
							? element.parameters.getRoots()
							: element.parameters;
					var isEmptyParameters = !this.getHasParameters();
					this.set("IsEmptyParameters", isEmptyParameters);
					if (isEmptyParameters) {
						return true;
					}
					var collection = Ext.create("Terrasoft.BaseViewModelCollection");
					elementParameters.each(function(parameter) {
						var viewModel = this.createParameterViewModel(parameter);
						if (skipValidation === true) {
							collection.add(parameter.uId, viewModel);
						} else {
							viewModel.validate();
							collection.add(parameter.uId, viewModel);
						}
					}, this);
					this.sortParameterViewModelCollectionByCaption(collection);
					collection.each(function(parameter) {
						parameters.add(parameter.get("UId"), parameter);
					}, this);
				},

				/**
				 * Sorts view model collection by caption.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} parameters Parameters collection.
				 */
				sortParameterViewModelCollectionByCaption: function(parameters) {
					this.sortCollectionByColumn(parameters, "UId", "Caption");
				},

				/**
				 * Returns tools button edit menu item viewModel.
				 * @protected
				 * @param {String} parameterName Parameter name.
				 * @return {Terrasoft.BaseViewModel} Menu item ViewModel.
				 */
				getParameterEditToolsButtonEditMenuItem: function(parameterName) {
					return this.getButtonMenuItem({
						caption: this.get("Resources.Strings.EditMenuItemCaption"),
						tag: parameterName,
						click: {"bindTo": "onParameterLabelClick"}
					});
				},

				/**
				 * Returns parameter view model values config.
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process schema parameter.
				 * @protected
				 * @virtual
				 * @return {Object} Parameter view model values config.
				 */
				getParameterViewModelConfig: function(parameter) {
					var initialReferenceSchemaUId;
					var name = parameter.name;
					var dataValueType = parameter.dataValueType;
					var parameterInvokerUId = this.getIsInvokedByProcessSchema() ? parameter.uId : this.getInvokerUId();
					var typeImageUrl = Terrasoft.ProcessSchemaDesignerUtilities.getDataValueTypeImageUrl(dataValueType);
					var value = parameter.value || parameter.getMappingValue();
					var editMenuItem = this.getParameterEditToolsButtonEditMenuItem(name);
					var toolsButtonMenu = Ext.create("Terrasoft.BaseViewModelCollection", {
						items: {
							"editButton": editMenuItem
						}
					});
					var element = this.get("ProcessElement");
					var parentSchema = element && element.parentSchema;
					var entitySchema = parentSchema && parentSchema.entitySchema;
					var initialConfig = parameter.initialConfig;
					if (initialConfig) {
						var sourceValue = initialConfig.sourceValue;
						var sourceReferenceSchemaUId = sourceValue ? sourceValue.referenceSchemaUId : null;
						initialReferenceSchemaUId = initialConfig.referenceSchemaUId || sourceReferenceSchemaUId;
					}
					var parent = parameter.getParent();
					var parentUid = parent && parent.uId;
					var itemProperties = parameter.itemProperties && parameter.itemProperties.map(function(nested) {
						return this.createParameterViewModel(nested);
					}, this);
					if (itemProperties) {
						itemProperties = this._sortParameterCollection(itemProperties);
					}
					return {
						Id: name,
						UId: parameter.uId,
						Name: name,
						Caption: parameter.getDisplayValue(),
						DataValueTypeImage: typeImageUrl,
						DataValueType: dataValueType,
						IsRequired: parameter.isRequired,
						ReferenceSchemaUId: parameter.referenceSchemaUId,
						InitialReferenceSchemaUId: initialReferenceSchemaUId,
						Value: value,
						ParameterEditToolsButtonMenu: toolsButtonMenu,
						Enabled: false,
						packageUId: this.get("packageUId"),
						InvokerUId: parameterInvokerUId,
						Parameters: this.get("Parameters"),
						ProcessElement: element,
						EntitySchema: entitySchema,
						Direction: parameter.direction,
						ParentUId: parentUid,
						ItemProperties: itemProperties
					};
				},

				/**
				 * Returns true if properties page invoked for process schema and false if for user task.
				 * @private
				 * @return {Boolean} True if invoked for process schema, false if for user task.
				 */
				getIsInvokedByProcessSchema: function() {
					return this.get("ProcessElement") instanceof Terrasoft.ProcessSchema;
				},

				/**
				 * Creates parameter viewModel.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process schema parameter.
				 * @return {Terrasoft.ProcessSchemaParameterViewModel} Parameter view model.
				 */
				createParameterViewModel: function(parameter) {
					var parameterViewModelConfig = this.getParameterViewModelConfig(parameter);
					var viewModel = Ext.create("Terrasoft.ProcessSchemaParameterViewModel", {
						values: parameterViewModelConfig,
						sandbox: this.sandbox,
						methods: {
							onItemFocused: this.onItemFocused
						}
					});
					viewModel.on("change", this.onChildViewModelChange, this);
					viewModel.on("change:Visible", this.closeParameterEditPage, this);
					return viewModel;
				},

				/**
				 * Closes parameter edit page if opened.
				 * @protected
				 */
				closeParameterEditPage: function(sender, value) {
					var currentParameterUId = sender.get("UId");
					var currentParameter = this._findParameter(currentParameterUId);
					if (!currentParameter) {
						return;
					}
					if (value) {
						this.set("ActiveParameterEditUId", null);
					} else {
						var previousParameterUId = this.get("ActiveParameterEditUId");
						if (previousParameterUId) {
							var parameter = this._findParameter(previousParameterUId);
							if (!parameter) {
								this.saveActiveParameterEdit();
							} else {
								parameter.set("Visible", true);
							}
						}
						this.set("ActiveParameterEditUId", currentParameterUId);
						this.set("AddParameterButtonEnabled", true);
					}
				},

				/**
				 * Child view model changes event handler.
				 * @protected
				 * @param {Object} config
				 */
				onChildViewModelChange: function(config) {
					if (config) {
						this.set(config.propertyName, config.propertyValue);
					}
				},

				/**
				 * Returns tools button configuration for parameter.
				 * @protected
				 * @param {String} [id] Control identifier.
				 */
				getParameterToolsButtonConfig: function(id) {
					var config = {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						imageConfig: resources.localizableImages.ParameterEditToolsButtonImage,
						menu: {
							items: {
								bindTo: "ParameterEditToolsButtonMenu"
							}
						},
						classes: {
							imageClass: ["button-background-no-repeat"],
							wrapperClass: ["detail-tools-button-wrapper"],
							menuClass: ["detail-tools-button-menu"]
						}
					};
					if (id) {
						config.id = id;
					}
					return config;
				},

				/**
				 * Returns mapping edit configuration for parameter.
				 * @protected
				 */
				getParameterMappingEditConfig: function() {
					var config = {
						isRequired: {
							bindTo: "IsRequired"
						},
						placeholder: resources.localizableStrings.MappingPlaceholderCaption
					};
					Ext.apply(config, this.getDefaultMappingEditConfig("Value"));
					return config;
				},

				/**
				 * Returns page ID.
				 * @return {String} Page ID.
				 */
				getParameterEditPageId: function() {
					return this.sandbox.id + "parameteredit";
				},

				/**
				 * Saves settings.
				 * @protected
				 * @virtual
				 */
				saveValues: function() {
					this.callParent(arguments);
					this.saveActiveParameterEdit();
					this.saveExtendedValues();
					var element = this.get("ProcessElement");
					if (this.get("IsLoggingVisible")) {
						element.setPropertyValue("isLogging", this.get("isLogging"));
					}
					if (this.get("IsSerializeToDBVisible")) {
						element.setPropertyValue("serializeToDB", this.get("serializeToDB"));
					}
					if (!this.get("IsExtendedMode")) {
						this.saveParameters(element);
					}
					var useBackgroundMode = this.get("useBackgroundMode");
					element.setPropertyValue("useBackgroundMode", useBackgroundMode);
				},

				/**
				 * Saves process parameters.
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @protected
				 * @virtual
				 */
				saveParameters: function(element) {
					Terrasoft.each(this.columns, function(columnConfig, columnName) {
						var saveMethod = this._getColumnSaveMethod(columnConfig);
						if (!Ext.isEmpty(saveMethod)) {
							var parameter = element.findParameterByName(columnName);
							this[saveMethod](parameter);
						}
					}, this);
				},

				/**
				 * Saves extended parameters values.
				 * @protected
				 * @virtual
				 */
				saveExtendedValues: function() {
					var element = this.get("ProcessElement");
					var parameters = this.get("Parameters");
					parameters.each(function(model) {
						this.saveExtendedValue(model, element);
						if (model.hasItemProperties()) {
							this._saveNestedCollection(model.$ItemProperties);
						}
					}, this);
				},

				/**
				 * Saves extended parameter value.
				 * @protected
				 * @param {Terrasoft.ProcessSchemaParameterViewModel} model Parameter data model.
				 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
				 * @throws {Terrasoft.ItemNotFoundException} Throws an exception
				 * if the property is not found in the element.
				 */
				saveExtendedValue: function(model, element) {
					var name = model.get("Name");
					if (!model.changedValues) {
						return;
					}
					var uId = model.get("UId");
					var value = model.get("Value");
					var caption = model.get("Caption");
					var dataValueType = model.get("DataValueType");
					var parameter = element.parameters.find(uId);
					if (parameter) {
						parameter.setPropertyValue("name", name);
						parameter.setPropertyValue("dataValueType", dataValueType);
						parameter.setLocalizableStringPropertyValue("caption", caption);
						parameter.setMappingValue(value);
					} else {
						var template = Terrasoft.Resources.ProcessSchemaDesigner.Messages.ParameterNotFoundMessage;
						var message = Ext.String.format(template, uId);
						this.error(message);
					}
				},

				/**
				 * Saves active editing parameter.
				 * @protected
				 */
				saveActiveParameterEdit: function() {
					if (this.get("ActiveParameterEditUId")) {
						var pageId = this.getParameterEditPageId();
						this.sandbox.publish("SaveParameter", this, [pageId]);
					}
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#getTabs
				 * @overridden
				 */
				getTabs: function() {
					var tabs = this.callParent(arguments);
					tabs.push({
						Name: "ParametersTab",
						Caption: resources.localizableStrings.ParametersTabCaption,
						MarkerValue: "ParametersTab"
					});
					return tabs;
				},

				/**
				 * Returns tools button delete menu item ViewModel.
				 * @private
				 * @param {String} parameterName Parameter name.
				 * @return {Terrasoft.BaseViewModel} Delete menu item ViewModel
				 */
				getParameterEditToolsButtonDeleteMenuItem: function(parameterName) {
					return this.getButtonMenuItem({
						caption: this.get("Resources.Strings.DeleteMenuItemCaption"),
						tag: parameterName,
						click: {"bindTo": "onParameterDeleteClick"}
					});
				},

				/**
				 * Processes tab change event.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} activeTab Selected tab.
				 */
				onActiveTabChange: function(activeTab) {
					this.callParent(arguments);
					var activeTabName = activeTab.get("Name");
					if (activeTabName !== "ParametersTab") {
						this.saveActiveParameterEdit();
					}
				},

				/**
				 * Returns all values for result parameter.
				 * @param {Function} callback Callback function.
				 * @param {Object} callback.resultParameterValues Key-value pair of result parameter values.
				 * @param {Object} scope Execution context of callback function.
				 */
				getResultParameterAllValues: function(callback, scope) {
					callback.call(scope, {});
				},

				/**
				 * @private
				 */
				_getDependedConditionalFlows: function() {
					var element = this.$ProcessElement;
					if (!element.parentSchema) {
						return null;
					}
					var conditionalFlows = element.parentSchema.flowElements.filterByFn(function(item) {
						return item instanceof Terrasoft.ProcessConditionalSequenceFlowSchema;
					}, this);
					var dependedFlows = conditionalFlows.filterByFn(function(item) {
						var sourceElement = item.findSourceElement();
						return sourceElement && sourceElement.uId === element.uId;
					}, this);
					return dependedFlows;
				},

				/**
				 * @private
				 */
				_validateConditonalFlow: function(elementResults, flow) {
					var flowResults = flow.processActivitiesSelectedResults;
					var hasMissingResults = _.some(flowResults, function(results) {
						return _.difference(results, elementResults).length > 0;
					}, this);
					if (hasMissingResults) {
						flow.setPropertyValue("isValid", false);
					}
				},

				/**
				 * Invalidates conditional flows connected to element.
				 * @protected
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The scope of callback function.
				 */
				validateDependedConditonalFlows: function(callback, scope) {
					var flows = this._getDependedConditionalFlows();
					if (!flows || flows.isEmpty()) {
						Ext.callback(callback, scope);
						return;
					}
					this.getResultParameterAllValues(function(elementResults) {
						elementResults = _.sortBy(_.keys(elementResults));
						flows.each(this._validateConditonalFlow.bind(this, elementResults), this);
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Returns true if process schema must be compiled.
				 * @public
				 */
				isProcessSchemaCompiled: function() {
					var element = this.get("ProcessElement");
					var parentSchema = element && element.parentSchema;
					return this.isNoCompilationFeatureEnableConverter(
						Terrasoft.isInstanceOfClass(parentSchema, "Terrasoft.ProcessSchema")
							? parentSchema.shouldBeCompiled()
							: false, false);
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "ParametersTab",
					"values": {
						"wrapClass": ["tabs"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ParametersTab",
					"propertyName": "items",
					"name": "ParameterEdit",
					"values": {
						"id": "ParameterEdit",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["parameter-edit-container-wrapClass"],
						"visible": false
					}
				},
				{
					"operation": "insert",
					"parentName": "ParametersTab",
					"propertyName": "items",
					"name": "EmptyParametersMessage",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.EmptyParametersMessage"
						},
						"visible": {
							"bindTo": "IsEmptyParameters"
						},
						"classes": {
							"labelClass": ["empty-parameters"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEdit",
					"propertyName": "items",
					"name": "AddParameterButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {
							"bindTo": "Resources.Strings.AddParameterButtonCaption"
						},
						"enabled": {
							"bindTo": "AddParameterButtonEnabled"
						},
						"menu": {
							"items": {
								"bindTo": "AddButtonMenu"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEdit",
					"propertyName": "items",
					"name": "AddParameterContainer",
					"values": {
						"id": "AddParameterContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "AddParameterButtonEnabled",
							"bindConfig": {"converter": "invertBooleanValue"}
						},
						"wrapClass": ["parameter-edit-ct"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ParametersTab",
					"propertyName": "items",
					"name": "ParametersContainer",
					"values": {
						"generator": "ConfigurationItemGenerator.generateHierarchicalContainerList",
						"idProperty": "Id",
						"onItemClick": {
							"bindTo": "onItemClick"
						},
						"nestedItemsAttributeName": "ItemProperties",
						"nestedItemsContainerId": "nested-parameters",
						"collection": "Parameters",
						"defaultItemConfig": Terrasoft.ProcessSchemaParameterViewConfig.generate(),
						"rowCssSelector": ".paramContainer"
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "isLogging",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "IsLoggingVisible"
						},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ControlGroup",
					"propertyName": "items",
					"name": "serializeToDB",
					"values": {
						"enabled": {
							"bindTo": "IsSerializeToDBEnabled"
						},
						"visible": {
							"bindTo": "IsSerializeToDBVisible"
						},
						"wrapClass": ["t-checkbox-control"],
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 1
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


