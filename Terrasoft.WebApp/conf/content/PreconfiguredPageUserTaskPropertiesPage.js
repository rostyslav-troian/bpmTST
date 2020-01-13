Terrasoft.configuration.Structures["PreconfiguredPageUserTaskPropertiesPage"] = {innerHierarchyStack: ["PreconfiguredPageUserTaskPropertiesPage"], structureParent: "RootUserTaskPropertiesPage"};
define('PreconfiguredPageUserTaskPropertiesPageStructure', ['PreconfiguredPageUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'2352c272-080e-4cc9-828c-f6689a45e95a',schemaCaption: "Edit page - User task parameters - \"Pre-configured page\"", parentSchemaName: "RootUserTaskPropertiesPage", schemaName:'PreconfiguredPageUserTaskPropertiesPage',parentSchemaUId:'9ba919f3-0101-4b63-93c5-1a453985b538',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: RootUserTaskPropertiesPage
 */
define("PreconfiguredPageUserTaskPropertiesPage", ["terrasoft", "PreconfiguredPageUserTaskPropertiesPageResources",
	"ProcessModuleUtilities", "ProcessEntryPointPropertiesPageMixin", "DesignTimeEnums"
], function(Terrasoft, resources, ProcessModuleUtilities) {
	return {
		mixins: {
			processEntryPointPropertiesPageMixin: "Terrasoft.ProcessEntryPointPropertiesPageMixin"
		},
		properties: {
			/**
			 * @inheritdoc RootUserTaskPropertiesPage.properties#schemaManagerName
			 * @override
			 */
			schemaManagerName: "ClientUnitSchemaManager",

			/**
			 * @inheritdoc RootUserTaskPropertiesPage.properties#useNotification
			 * @override
			 */
			useNotification: true
		},
		messages: {},
		attributes: {
			/**
			 * Page schema to open.
			 */
			"ClientUnitSchemaUId": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysSchema",
				doAutoSave: true,
				isRequired: true
			},
			/**
			 * Previous selected page schema.
			 */
			"PreviousClientUnitSchemaUId": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysSchema"
			},
			/**
			 * Recommendations for filling out the page.
			 */
			"Recommendation": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.RecommendationCaption,
				initMethod: "initProperty",
				isRequired: false,
				doAutoSave: true
			},
			/**
			 * User hints.
			 */
			"InformationOnStep": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.InformationOnStepCaption,
				doAutoSave: true,
				initMethod: "initProperty"
			},
			/**
			 * To whom open a page.
			 */
			"OwnerId": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.OwnerCaption,
				referenceSchemaName: "Contact",
				isRequired: false,
				doAutoSave: true,
				initMethod: "initOwner"
			},
			/**
			 * Connection object.
			 */
			"EntitySchemaUId": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.EntitySchemaCaption,
				referenceSchemaName: "SysSchema",
				doAutoSave: true
			},
			/**
			 * Instance of connection object.
			 */
			"EntityId": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.EntityCaption,
				doAutoSave: true,
				initMethod: "initProperty"
			},
			/**
			 * Flag that indicates page parameters visibility.
			 */
			"IsPageParametersVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Flag that indicates element PageHasNoParametersLabel visible.
			 */
			"PageHasNoParametersLabelVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			/**
			 * Page parameters.
			 */
			"PageParameters": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isCollection: true,
				value: this.Ext.create("Terrasoft.ObjectCollection")
			},
			/**
			 * Template(Parent) page.
			 */
			"Template": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initProperty",
				referenceSchemaName: "VwSysSchemaInfo"
			},
			/**
			 * Cached page parameter view config.
			 */
			"PageParameterViewConfig": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Reverts attribute ClientUnitSchemaUId if empty.
			 * @private
			 */
			revertClientUnitSchema: function() {
				var schema = this.$ClientUnitSchemaUId;
				var oldSchema = this.$PreviousClientUnitSchemaUId;
				if (!schema && oldSchema) {
					this.$ClientUnitSchemaUId = oldSchema;
				}
			},

			/**
			 * Saves page parameters values.
			 * @private
			 */
			savePageParameters: function() {
				var element = this.get("ProcessElement");
				var parameters = this.get("PageParameters");
				parameters.each(function(model) {
					this.saveExtendedValue(model, element);
				}, this);
			},

			/**
			 * Initializes selected preconfigured page parameters.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 */
			initPageParameters: function(element) {
				this.clearPageParameters();
				var parameters = element.getDynamicParameters().filterByFn(function(parameter) {
					return !ProcessModuleUtilities.isSystemParameter(parameter.name);
				}, this);
				parameters.each(function(parameter) {
					var viewModel = this.createParameterViewModel(parameter);
					var elementId = "preconfigured-" + viewModel.get("Id");
					viewModel.set("ElementId", elementId);
					viewModel.validate();
					this.$PageParameters.add(parameter.uId, viewModel);
				}, this);
				var hasParameters = !parameters.isEmpty();
				this.$PageHasNoParametersLabelVisible = !hasParameters;
				this.$IsPageParametersVisible = hasParameters;
			},

			/**
			 * Sets attribute "ClientUnitSchemaUId".
			 * @private
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initClientUnitSchema: function(callback, scope) {
				var parameter = this.get("ProcessElement").getParameterByName("ClientUnitSchemaUId");
				var schemaUId = parameter.getValue();
				if (Terrasoft.isEmpty(schemaUId)) {
					callback.call(scope);
					return;
				}
				ProcessModuleUtilities.loadSchemaDisplayValue(schemaUId, function(displayValue, name) {
					if (name && displayValue) {
						const lookupdisplayValue = this._appendSchemaName(displayValue, name);
						this._initClientUnitSchemaUId({
							value: schemaUId,
							displayValue: lookupdisplayValue
						});
						this.initSchemaParameters(callback, scope);
					} else {
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * The event handler for preparing page schemas drop-down list.
			 * @private
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			onPrepareClientUnitSchemaList: function(filter, list) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				var selectedSchema = this.$ClientUnitSchemaUId;
				var pageSchemas = this.get("PageSchemas");
				if (selectedSchema) {
					pageSchemas = pageSchemas.filterByFn(function(schema) {
						return schema.value !== selectedSchema.value;
					});
				}
				list.loadAll(pageSchemas);
			},

			/**
			 * Clears page parameter collection and sets empty parameters group caption.
			 * @private
			 */
			clearPageParameters: function() {
				this.$PageParameterViewConfig = null;
				this.$IsPageParametersVisible = false;
				this.$PageHasNoParametersLabelVisible = false;
				this.$PageParameters.clear();
			},

			/**
			 * Returns label configuration for page parameter.
			 * @private
			 */
			getPageParameterLabelConfig: function() {
				return {
					id: "Caption",
					className: "Terrasoft.Label",
					caption: {bindTo: "Caption"},
					classes: {labelClass: ["t-label-proc", "t-label-proc-param"]}
				};
			},

			/**
			 * @private
			 */
			_showParametersLoadMask: function() {
				var config = {
					selector: ".activity-connection",
					timeout: 0
				};
				return Terrasoft.Mask.show(config);
			},

			/**
			 * @inheritdoc Terrasoft.RootUserTaskPropertiesPage#onAfterSchemaCnahged
			 * @override
			 */
			onAfterSchemaChanged: function() {
				this.$PreviousClientUnitSchemaUId = this.$ClientUnitSchemaUId;
				var element = this.get("ProcessElement");
				element.clearDynamicParameters();
				this.synchronizeSchemaParameters();
			},

			/**
			 * @inheritdoc Terrasoft.RootUserTaskPropertiesPage#synchronizeSchemaParameters
			 * @override
			 */
			synchronizeSchemaParameters: function(callback, scope) {
				var maskId = this._showParametersLoadMask();
				Terrasoft.chain(
					function(next) {
						Terrasoft.ClientUnitSchemaManager.initialize(next, this);
					},
					function(next) {
						this.initSchemaParameters(next, this);
					},
					function() {
						Terrasoft.Mask.hide(maskId);
						Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * Generates a page parameter view.
			 * @private
			 * @param {Object} parameterConfig Page parameter data model in the Container List.
			 */
			getPageParameterViewConfig: function(parameterConfig) {
				if (this.$PageParameterViewConfig) {
					parameterConfig.config = this.$PageParameterViewConfig;
					return;
				}
				var config = this.getContainerConfig("item", [], [
					this.getContainerConfig("item-view", ["parameter-ct"], [
						this.getContainerConfig("ParameterValueContainer", ["parameter-value-ct"], [
							this.getContainerConfig("ToolsContainer", ["tools-container-wrapClass"], [
								this.getContainerConfig("LabelWrap", ["label-container-wrapClass"], [
									this.getPageParameterLabelConfig()
								])
							]),
							this.getParameterMappingEditConfig()
						])
					]),
					this.getContainerConfig("item-edit", ["parameter-edit-ct"], [], {
						"bindTo": "Visible",
						"bindConfig": {"converter": this.invertBooleanValue}
					})
				]);
				parameterConfig.config = this.$PageParameterViewConfig = config;
			},

			/**
			 * @private
			 */
			_updateTitleParameter: function(caption) {
				var element = this.get("ProcessElement");
				var parameter = element.getParameterByName("Title");
				var mappingValue = parameter.getMappingValue();
				mappingValue.value = caption;
				mappingValue.displayValue = caption;
				mappingValue.source = Terrasoft.ProcessSchemaParameterValueSource.ConstValue;
				parameter.setMappingValue(mappingValue);
			},

			/**
			 * @private
			 */
			_appendSchemaName: function(displayValue, name) {
				if (displayValue !== name) {
					return displayValue + " | " + name;
				} else {
					return displayValue;
				}
			},

			/**
			 * @private
			 */
			_subscribeClientUnitSchemaChanges: function() {
				this.on("change:ClientUnitSchemaUId", this.onBeforeSchemaChanged, this);
			},

			/**
			 * @private
			 */
			_findEqualParameter: function(parameters, sourceParameter) {
				return parameters.findByFn(function(parameter) {
					if (parameter.name !== sourceParameter.name && parameter.uId !== sourceParameter.uId) {
						return false;
					}
					if (ProcessModuleUtilities.isSystemParameter(parameter.name)) {
						return parameter.sourceValue.value === sourceParameter.sourceValue.value;
					}
					return true;
				}, this);
			},

			/**
			 * @private
			 */
			_checkParameterChanged: function(oldParameters) {
				var element = this.get("ProcessElement");
				var parameters = element.parameters;
				var parentSchema = element.parentSchema;
				if (parameters.getCount() === oldParameters.getCount()) {
					var changedParameters = [];
					parameters.each(function(parameter) {
						var equalOldParameter = this._findEqualParameter(oldParameters, parameter);
						if (!equalOldParameter) {
							changedParameters.push(parameter);
						}
					}, this);
					if (changedParameters.length) {
						parentSchema.fireEvent("changed", {parameters: changedParameters}, this);
					}
				} else {
					parentSchema.fireEvent("changed", {item: "parameters"}, this);
				}
			},

			/**
			 * @private
			 */
			_initClientUnitSchemaUId: function(lookupValue) {
				this.$ClientUnitSchemaUId = lookupValue;
				this.$PreviousClientUnitSchemaUId = lookupValue;
			},

			/**
			 * @private
			 */
			_getClientUnitSchemaInstance: function(callback, scope) {
				var config = {
					schemaUId: this.$ClientUnitSchemaUId.value,
					packageUId: this.get("packageUId"),
					useCache: false
				};
				Terrasoft.ClientUnitSchemaManager.findBundleSchemaInstance(config, function(schema) {
					if (!schema) {
						this._initClientUnitSchemaUId(null);
					}
					callback.call(scope, schema);
				}, this);
			},

			/**
			 * @private
			 */
			_subscribeOnParametersChanged: function() {
				var element = this.$ProcessElement;
				element.parameters.each(function(parameter) {
					parameter.on("changed", this._onParameterChanged, this);
				}, this);
			},

			/**
			 * @private
			 */
			_onParameterChanged: function(changes, parameter) {
				var parentSchema = parameter.getParentSchema();
				parentSchema.fireEvent("changed", changes);
			},

			/**
			 * @private
			 */
			_updateElementParametersBySchemaParameters: function(schema) {
				const schemaParameters = schema.parameters;
				const element = this.$ProcessElement;
				schemaParameters.each(function(schemaParameter) {
					var processParameter = schemaParameter.convertToProcessParameter();
					const uId = processParameter.uId;
					const elementParameters = element.parameters;
					const oldParameter = element.findParameterByName(processParameter.name) ||
						element.findParameterBySourceUId(uId) || element.findParameterByUId(uId);
					if (oldParameter) {
						elementParameters.removeByKey(oldParameter.uId);
						processParameter.uId = oldParameter.uId;
					} else {
						processParameter.uId = Terrasoft.generateGUID();
					}
					processParameter.sourceParameterUId = uId;
					elementParameters.add(processParameter.uId, processParameter);
					this.initPageParameter(processParameter, element);
				}, this);
			},

			/**
			 * @private
			 */
			_clearDynamicParameters: function(schema) {
				const basePageTemplateUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_PAGE_PROCESS_TEMPLATE;
				if (Terrasoft.ClientUnitSchemaManager.isInheritedFrom(schema.uId, basePageTemplateUId)) {
					const element = this.$ProcessElement;
					const dynamicParameters = element.getDynamicParameters();
					const schemaParameters = schema.parameters;
					dynamicParameters.each(function(parameter) {
						const sourceParameterUId = parameter.sourceParameterUId;
						const schemaParameter = sourceParameterUId && schemaParameters.find(sourceParameterUId);
						if (!schemaParameter) {
							element.clearDynamicParameter(parameter.uId);
						}
					}, this);
				}
			},

			//endregion

			/**
			 * Re-initializes page parameters.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initSchemaParameters: function(callback, scope) {
				this._getClientUnitSchemaInstance(function(clientUnitSchema) {
					if (!clientUnitSchema) {
						callback.call(scope);
						return;
					}
					var element = this.$ProcessElement;
					var links = element.parentSchema.findLinksToElements([element.name]);
					var oldParameters = element.parameters.clone();
					this.clearPageParameters();
					this._updateElementParametersBySchemaParameters(clientUnitSchema);
					this._clearDynamicParameters(clientUnitSchema);
					oldParameters.each(function(oldParameter) {
						if (ProcessModuleUtilities.isSystemParameter(oldParameter.name)) {
							return;
						}
						var newParameter = element.findParameterByName(oldParameter.name) ||
							element.findParameterByUId(oldParameter.uId);
						this.synchronizeSchemaParameter(element, newParameter, oldParameter);
					}, this);
					this._subscribeOnParametersChanged();
					this.initPageParameters(element);
					this._checkParameterChanged(oldParameters);
					this._updateTitleParameter(clientUnitSchema.caption);
					this.invalidateDependentElements(links);
					this.validateDependedConditonalFlows(callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
			 * @override
			 */
			getParameterReferenceSchemaUId: function(elementParameter) {
				return this.mixins.processEntryPointPropertiesPageMixin
					.getParameterReferenceSchemaUId.call(this, elementParameter);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#onElementDataLoad.
			 * @overridden
			 */
			onElementDataLoad: function(element, callback, scope) {
				this.callParent([element, function() {
					Terrasoft.chain(
						this.initClientUnitSchema,
						this.initPageSchemas,
						this.initEntitySchemas,
						function(next) {
							this.initEntitySchema(element, next, this);
						},
						function() {
							this._subscribeClientUnitSchemaChanges();
							Ext.callback(callback, scope);
						}, this);
				}, this]);
			},

			/**
			 * Initializes PageSchemas attribute.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			initPageSchemas: function(callback, scope) {
				var packageUId = this.get("packageUId");
				Terrasoft.SchemaDesignerUtilities.buildPackageHierarchy(packageUId, function(hierarchy) {
					var pageSchemas = new Terrasoft.Collection();
					var packageItems = Terrasoft.ClientUnitSchemaManager.filterByFn(function(item) {
						return _.contains(hierarchy, item.packageUId);
					}, this);
					var items = _.uniq(packageItems.mapArrayByPath("name"));
					items.forEach(function(name) {
						var item = Terrasoft.ClientUnitSchemaManager.findRootSchemaItemByName(name);
						var displayValue = this._appendSchemaName(item.getDisplayValue(), item.name);
						var orderValue = displayValue.toLowerCase().replace(/["\-|]/g, "");
						pageSchemas.add(item.uId, {
							value: item.uId,
							packageUId: item.packageUId,
							name: item.name,
							displayValue: displayValue,
							orderValue: orderValue
						});
					}, this);
					pageSchemas.sort("orderValue");
					this.set("PageSchemas", pageSchemas);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues.
			 * @overridden
			 */
			saveValues: function() {
				this.revertClientUnitSchema();
				this.callParent(arguments);
				this.savePageParameters();
			},

			/**
			 * Initializes page parameter.
			 * @param {Terrasoft.ProcessSchemaParameter} parameter Parameter.
			 * @param {Terrasoft.ProcessUserTaskSchema} element Process user task schema.
			 */
			initPageParameter: function(parameter, element) {
				parameter.processFlowElementSchema = element;
				const processSchema = element.parentSchema;
				parameter.createdInSchemaUId = processSchema.uId;
			},

			/**
			 * @protected
			 * @param {Terrasoft.ClientUnitSchema} pageSchema Page schema
			 */
			getPageDesignerButtonHint: function(pageSchema) {
				var stringName = pageSchema ? "OpenSchemaButtonHintCaption" : "AddSchemaButtonHintCaption";
				return this.get("Resources.Strings." + stringName);
			},

			/**
			 * @protected
			 * @param {Terrasoft.ClientUnitSchema} pageSchema Page schema
			 */
			getPageDesignerButtonImage: function(pageSchema) {
				var imageName = pageSchema ? "OpenButtonImage" : "AddButtonImage32";
				return this.get("Resources.Images." + imageName);
			},

			/**
			 * Opens page designer, if schema is not inherited from template it opens 5.x client unit designer.
			 * @protected
			 */
			openPageDesigner: function() {
				var maskId = Terrasoft.Mask.show({
					selector: ".properties-container",
					timeout: 0
				});
				var manager = Terrasoft.ClientUnitSchemaManager;
				manager.reInitialize(function() {
					Terrasoft.Mask.hide(maskId);
					var templatePageUId = Terrasoft.FormulaParserUtils.getLookupValue(this.$Template);
					var pageUId = this.$ClientUnitSchemaUId && this.$ClientUnitSchemaUId.value;
					this.$IsAddSchemaButtonClicked = Ext.isEmpty(pageUId);
					if (pageUId && !manager.isInheritedFrom(pageUId, templatePageUId)) {
						manager.findInstanceByUId(pageUId, function(schema) {
							ProcessModuleUtilities.showClientUnitSchemaDesigner(schema);
						}, this);
					} else if (pageUId) {
						ProcessModuleUtilities.showPageSchemaDesigner(pageUId, templatePageUId);
					} else {
						ProcessModuleUtilities.showPageTemplateLookup();
					}
				}, this);
			},

			/**
			 * Handles before page schema change, shows confirmation message.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} model Page view model.
			 * @param {Object} newSchema New schemas value.
			 */
			onBeforeSchemaChanged: function(model, newSchema) {
				var oldSchema = this.$PreviousClientUnitSchemaUId;
				var newSchemaUId = newSchema ? newSchema.value : "";
				var oldSchemaUId = oldSchema && oldSchema.value;
				if (!newSchemaUId || newSchemaUId === oldSchemaUId) {
					return;
				}
				if (Ext.isEmpty(oldSchema)) {
					Terrasoft.defer(this.onAfterSchemaChanged, this);
				} else {
					this.canChangeSchema(function(canChange) {
						if (canChange) {
							this.confirmSchemaChange(oldSchema);
						} else {
							this.$ClientUnitSchemaUId = oldSchema;
						}
					}, this);
				}
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema.
			 * @overridden
			 */
			getSchema: function() {
				return this.$ClientUnitSchemaUId;
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema
			 * @overridden
			 */
			setSchema: function(schema, options) {
				this.set("ClientUnitSchemaUId", schema, options);
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema
			 * @overridden
			 */
			getOutdatedSchema: function(event) {
				var result = this.callParent(arguments);
				result.displayValue += " | " + event.name;
				return result;
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#getResultParameterAllValues
			 * @overridden
			 */
			getResultParameterAllValues: function(callback, scope) {
				var resultParameterValues = {};
				var element = this.get("ProcessElement");
				var parameter = element.findParameterByName("Buttons");
				if (parameter) {
					var parameterValue = parameter.getValue();
					if (parameterValue) {
						var buttonsArray = Terrasoft.decode(parameterValue).$values;
						Terrasoft.each(buttonsArray, function(item) {
							if (item.PerformClosePage.value === "True") {
								var id = item.Id.value;
								var caption = item.Caption.value;
								resultParameterValues[id] = caption;
							}
						}, this);
					}
				}
				callback.call(scope, resultParameterValues);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UserTaskContainer",
				"propertyName": "items",
				"parentName": "EditorsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TitleTaskContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WhatPageToOpenLabel",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.WhatPageToOpenLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"name": "ClientUnitSchemaUId",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22
					},
					"labelConfig": {"visible": false},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {"bindTo": "onPrepareClientUnitSchemaList"},
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "OpenSchemaDesignerButton",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"hint": {
						"bindTo": "ClientUnitSchemaUId",
						"bindConfig": {
							"converter": "getPageDesignerButtonHint"
						}
					},
					"imageConfig": {
						"bindTo": "ClientUnitSchemaUId",
						"bindConfig": {
							"converter": "getPageDesignerButtonImage"
						}
					},
					"classes": {
						"wrapperClass": ["open-schema-designer-tool-button"]
					},
					"click": {"bindTo": "openPageDesigner"},
					"layout": {
						"column": 22,
						"row": 1,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "insert",
				"name": "TaskPropertiesContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.Container",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {
						"bindTo": "ClientUnitSchemaUId",
						"bindConfig": {"converter": "toBoolean"}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ToWhomOpenPageLabel",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ToWhomOpenPageLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"name": "OwnerId",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"name": "Recommendation",
				"values": {
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"name": "InformationOnStep",
				"values": {
					"contentType": Terrasoft.ContentType.LONG_TEXT,
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "WhichRecordToConnectThePageToLabel",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.WhichRecordToConnectThePageToLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"name": "EntitySchemaUId",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"layout": {
						"column": 0,
						"row": 7,
						"colSpan": 24
					},
					"controlConfig": {
						"prepareList": {"bindTo": "onPrepareEntitySchemaList"},
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"name": "EntityId",
				"values": {
					"layout": {
						"column": 0,
						"row": 8,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"],
					"enabled": {"bindTo": "EntitySchemaUId"}
				}
			},
			{
				"operation": "insert",
				"name": "PageParametersLabel",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 9,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.PageParametersLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]},
					"visible": {"bindTo": "IsPageParametersVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "PageHasNoParametersLabel",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 9,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.PageHasNoParametersLabelCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]},
					"visible": {"bindTo": "PageHasNoParametersLabelVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "PageParameters",
				"parentName": "TaskPropertiesContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 10,
						"colSpan": 24
					},
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "ElementId",
					"onItemClick": {"bindTo": "onItemClick"},
					"collection": "PageParameters",
					"onGetItemConfig": "getPageParameterViewConfig",
					"rowCssSelector": ".paramContainer",
					"classes": {"wrapClassName": ["activity-connection"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"name": "useBackgroundMode",
				"values": {
					"wrapClass": ["t-checkbox-control"],
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			}
		]
	};
});


