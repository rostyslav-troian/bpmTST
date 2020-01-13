Terrasoft.configuration.Structures["FormulaTaskPropertiesPage"] = {innerHierarchyStack: ["FormulaTaskPropertiesPage"], structureParent: "ProcessFlowElementPropertiesPage"};
define('FormulaTaskPropertiesPageStructure', ['FormulaTaskPropertiesPageResources'], function(resources) {return {schemaUId:'2d375272-3c69-4118-932c-25a673bca666',schemaCaption: "FormulaTaskPropertiesPage", parentSchemaName: "ProcessFlowElementPropertiesPage", schemaName:'FormulaTaskPropertiesPage',parentSchemaUId:'0f347363-31e5-4222-a82e-dcfeda34cbb6',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Formula edit page schema.
 * Parent: ProcessFlowElementPropertiesPage
 */
define("FormulaTaskPropertiesPage", ["FormulaTaskPropertiesPageResources"], function() {
	return {
		attributes: {
			/**
			 * Body of formula element.
			 */
			"Body": {
				"dataValueType": Terrasoft.DataValueType.MAPPING,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Result parameter of formula element.
			 */
			"ResultParameterMetaPath": {
				"dataValueType": Terrasoft.DataValueType.MAPPING,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"needsFormulaMetaPath": true
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Returns the parameter dataValueType by its metaPath.
			 * @private
			 * @param {String} metaPath The parameter metaPath.
			 * @param {ProcessSchema} parentSchema The process schema.
			 * @return {Terrasoft.core.enums.DataValueType|null}
			 */
			getParameterDataValueType: function(metaPath, parentSchema) {
				if (!metaPath) {
					return null;
				}
				var utils = Terrasoft.FormulaParserUtils;
				var metaPathInfo = utils.getMetaPathMappingInfo(metaPath);
				var mappingParameter = utils.getMappingParameter(metaPathInfo, parentSchema);
				return mappingParameter.dataValueType;
			},

			/**
			 * Updates the existing value of the "Body" attribute.
			 * @private
			 */
			updateBody: function() {
				var body = this.get("Body");
				if (!body) {
					return;
				}
				var resultParameter = this.get("ResultParameterMetaPath");
				var processElement = this.get("ProcessElement");
				body.dataValueType = this.getParameterDataValueType(resultParameter && resultParameter.value,
					processElement.parentSchema);
			},

			/**
			 * Handles change event of the "ResultParameterMetaPath" attribute.
			 * @private
			 */
			onResultParameterMetaPathChanged: function() {
				this.updateBody();
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#init
			 * @override
			 */
			init: function() {
				this.on("change:ResultParameterMetaPath", this.onResultParameterMetaPathChanged, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("ResultParameterMetaPath", this.mappingValueIsEmptyValidator);
				this.addColumnValidator("Body", this.mappingValueIsEmptyValidator);
			},

			/**
			 * Mapping field validator. If mapping value is empty, returns false, else true.
			 * @protected
			 * @param {Object} mappingValue Mapping.
			 * @param {string} mappingValue.value Mapping value
			 * @param {string} mappingValue.displayValue Mapping display value.
			 * @return {Object} Validation info.
			 */
			mappingValueIsEmptyValidator: function(mappingValue) {
				var valueIsEmptyValidationInfo = {
					invalidMessage: Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage
				};
				if (Ext.isEmpty(mappingValue) || Ext.Object.isEmpty(mappingValue)) {
					return valueIsEmptyValidationInfo;
				}
				var value = mappingValue.value;
				if (this.Ext.isEmpty(value) || value === "null") {
					return valueIsEmptyValidationInfo;
				}
				return {
					invalidMessage: ""
				};
			},

			/**
			 * Opens the mapping window of the process parameter value.
			 * @protected
			 * @param {String} parameterName Parameter name.
			 * @param {Object} parameterValue Parameter value.
			 */
			openMetaPathMappingEditWindow: function(parameterName, parameterValue) {
				var utils = Terrasoft.FormulaParserUtils;
				var metaPathMappingInfo = utils.getMetaPathMappingInfo(parameterValue.value);
				parameterValue = parameterValue || {};
				var referenceSchemaUId = parameterValue.referenceSchemaUId;
				this.initializeLookupSchema(referenceSchemaUId, function() {
					var pageId = this.sandbox.id + "ProcessMappingPage";
					this.sandbox.subscribe("SetParametersInfo", function(sourceValue) {
						this.setParametersInfoCallback(parameterName, sourceValue);
					}, this, [pageId]);
					var moduleName = "ProcessParameterSelectionModule";
					var modalBoxConfig = this.getMappingPageModalBoxConfig(moduleName);
					var mappingWindowRenderTo = this.showModuleModalBox(pageId, modalBoxConfig);
					var mappingType = Terrasoft.MappingEnums.MappingUnion.PROCESS_AND_ELEMENT_PARAMETERS;
					this.sandbox.loadModule(moduleName, {
						renderTo: mappingWindowRenderTo,
						id: pageId,
						instanceConfig: {
							parameters: {
								viewModelConfig: {
									SchemaElementUId: metaPathMappingInfo.schemaElementUId,
									ParameterUId: metaPathMappingInfo.parameterUId,
									ConvertToDisplayValue: false,
									MappingType: mappingType
								}
							}
						}
					});
				}, this);
			},

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @override
			 */
			onElementDataLoad: function(scriptTask, callback, scope) {
				this.callParent([scriptTask, function() {
					this.initResultParameterMetaPath(scriptTask, function() {
						this.initBody(scriptTask, callback, scope);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
			 * @override
			 */
			saveValues: function() {
				this.callParent(arguments);
				var scriptTask = this.get("ProcessElement");
				var body = this.get("Body");
				scriptTask.setPropertyValue("body", body.value);
				var resultParameterMetaPath = this.get("ResultParameterMetaPath");
				scriptTask.setPropertyValue("resultParameterMetaPath", resultParameterMetaPath.value);
			},

			/**
			 * Sets "Body" attribute.
			 * @protected
			 * @param {Terrasoft.ProcessUserTaskSchema} processElement Process element.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initBody: function(processElement, callback, scope) {
				var value = processElement.body;
				var resultParameter = this.get("ResultParameterMetaPath") || {};
				var resultParameterMetaPath = resultParameter.value;
				var parentSchema = processElement.parentSchema;
				var dataValueType = this.getParameterDataValueType(resultParameterMetaPath, parentSchema);
				var mappingValue = {
					value: value,
					displayValue: "",
					source: Terrasoft.ProcessSchemaParameterValueSource.Script,
					dataValueType: dataValueType
				};
				if (value !== "null" && !Ext.isEmpty(value)) {
					var schema = processElement.parentSchema;
					Terrasoft.FormulaParserUtils.getFormulaDisplayValue(value, schema, function(displayValue) {
						mappingValue.displayValue = displayValue;
						this.set("Body", mappingValue);
						callback.call(scope);
					}, this);
				} else {
					this.set("Body", mappingValue, {
						silent: true
					});
					callback.call(scope);
				}
			},

			/**
			 * Sets "ResultParameterMetaPath" attribute.
			 * @protected
			 * @param {Terrasoft.ProcessUserTaskSchema} element Process element.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initResultParameterMetaPath: function(element, callback, scope) {
				var metaPath = element.resultParameterMetaPath;
				var parentSchema = element.parentSchema;
				this.getMetaPathMappingValue(metaPath, parentSchema, function(mappingValue) {
						this.set("ResultParameterMetaPath", mappingValue, {
							silent: true
						});
						callback.call(scope);
					}, this
				);
			},

			/**
			 * Returns mapping parameter by meta path value.
			 * @protected
			 * @param {String} metaPath Meta path value.
			 * @param {Terrasoft.ProcessSchema} parentSchema Process schema.
			 * @param {Function} callback Callback function.
			 * @param {Object} callback.mappingValue Mapping parameter.
			 * @param {Object} scope Callback scope.
			 */
			getMetaPathMappingValue: function(metaPath, parentSchema, callback, scope) {
				var innerCallback = function(caption) {
					var mappingValue = {
						value: metaPath,
						displayValue: caption
					};
					callback.call(scope, mappingValue);
				};
				if (this.Ext.isEmpty(metaPath) || metaPath === "null") {
					innerCallback("");
					return;
				}
				var utils = Terrasoft.FormulaParserUtils;
				utils.getMetaPathDisplayValue(metaPath, parentSchema, function(displayValue) {
					innerCallback(displayValue);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.MappingEditMixin#setParametersInfoCallback
			 * @override
			 */
			setParametersInfoCallback: function(parameterName, sourceValue) {
				var parameterColumns = this.columns[parameterName];
				if (!parameterColumns.needsFormulaMetaPath) {
					this.callParent(arguments);
					return;
				}
				var metaPathValue = this.getResultParameterMetaPath(sourceValue);
				var element = this.get("ProcessElement");
				this.getMetaPathMappingValue(metaPathValue, element.parentSchema, function(mappingValue) {
					this.setMappingEditValue(parameterName, mappingValue);
					this.closeModalBox();
				}, this);
			},

			/**
			 * Returns correct Result parameter meta path.
			 * @private
			 * @param {Object} sourceValue Parameter value.
			 * @return {String} Result parameter meta path.
			 */
			getResultParameterMetaPath: function(sourceValue) {
				var metaPathValue = "";
				if (sourceValue) {
					var utils = Terrasoft.FormulaParserUtils;
					var parameterMapping = utils.getParameterMappingInfo(sourceValue.value);
					if (parameterMapping.schemaElementUId) {
						metaPathValue = this.Ext.String.format("{0}.{1}", parameterMapping.schemaElementUId,
							parameterMapping.parameterUId);
					} else {
						metaPathValue = parameterMapping.parameterUId;
					}
				}
				return metaPathValue;
			},

			/**
			 * @inheritdoc Terrasoft.MappingEditMixin#getInvokerUId
			 * @override
			 */
			getInvokerUId: function() {
				return this.get("uId");
			},

			/**
			 * Clear icon click handler for Formula value field.
			 * @private
			 */
			onBodyClearIconClick: function() {
				var value = {
					value: null,
					displayValue: null,
					source: Terrasoft.ProcessSchemaParameterValueSource.None,
					dataValueType: null,
					referenceSchemaUId: null
				};
				this.setMappingEditValue("Body", value);
			}

			// endregion

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
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ParameterLabel",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ParameterCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"name": "ResultParameterMetaPath",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"openEditWindow": {"bindTo": "openMetaPathMappingEditWindow"},
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"labelConfig": {"visible": false},
					menu: null
				}
			},
			{
				"operation": "insert",
				"name": "FormulaValueLabel",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.FormulaValueCaption"},
					"classes": {"labelClass": ["t-title-label-proc"]}
				}
			},
			{
				"operation": "insert",
				"name": "Body",
				"parentName": "TitleTaskContainer",
				"propertyName": "items",
				"values": {
					"cleariconclick": {"bindTo": "onBodyClearIconClick"},
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"labelConfig": {"visible": false},
					"menu": null
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


