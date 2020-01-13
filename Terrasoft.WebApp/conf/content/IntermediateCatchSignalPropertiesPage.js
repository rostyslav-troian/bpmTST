Terrasoft.configuration.Structures["IntermediateCatchSignalPropertiesPage"] = {innerHierarchyStack: ["IntermediateCatchSignalPropertiesPage"], structureParent: "BaseSignalEventPropertiesPage"};
define('IntermediateCatchSignalPropertiesPageStructure', ['IntermediateCatchSignalPropertiesPageResources'], function(resources) {return {schemaUId:'1141a650-e94c-4a57-bc1d-4ea1047a6c26',schemaCaption: "IntermediateCatchSignalPropertiesPage", parentSchemaName: "BaseSignalEventPropertiesPage", schemaName:'IntermediateCatchSignalPropertiesPage',parentSchemaUId:'4a540667-df85-4512-b845-55dadd9ed1c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Edit page schema of process element "intermediate catch signal".
 * Parent: BaseSignalEventPropertiesPage
 */
define("IntermediateCatchSignalPropertiesPage", ["ProcessSchemaUserTaskUtilities",
		"IntermediateCatchSignalPropertiesPageResources"],
	function(ProcessSchemaUserTaskUtilities) {
		return {
			attributes: {
				/**
				 * Record identifier.
				 * @protected
				 * @type {Object}
				 */
				"RecordId": {
					"dataValueType": this.Terrasoft.DataValueType.MAPPING,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"doAutoSave": true,
					"initMethod": "initRecordIdProperty"
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
				 * @override
				 */
				getParameterReferenceSchemaUId: function(elementParameter) {
					return elementParameter ? elementParameter.referenceSchemaUId : null;
				},

				/**
				 * @inheritdoc BaseUserTaskPropertiesPage#onPageInitialized
				 * @overridden
				 */
				onPageInitialized: function(callback, scope) {
					callback.call(scope || this);
				},

				/**
				 * @inheritdoc BaseSignalEventPropertiesPage#getEntityChangeTypeList
				 * @overridden
				 */
				getEntityChangeTypeList: function() {
					var list = this.callParent(arguments);
					var inserted = this.Terrasoft.EntityChangeType.Inserted;
					if (list.hasOwnProperty(inserted)) {
						delete list[inserted];
					}
					return list;
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#getFilterModuleConfig
				 * @overridden
				 */
				getFilterModuleConfig: function() {
					var baseConfig = this.callParent(arguments);
					var config = {
						filterEditConfig: this.getFilterEditConfigName()
					};
					return this.Ext.apply(baseConfig, config);
				},

				/**
				 * Initializes RecordId property.
				 * @protected
				 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
				 */
				initRecordIdProperty: function(parameter) {
					if (parameter) {
						this.initPropertySilent(parameter);
					}
					this.on("change:RecordId", this.onRecordIdChanged, this);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("RecordId",  this.validateRecordId);
					this.addColumnValidator("EntitySchemaSelect",  this.validateEntitySchema);
				},

				/**
				 * Returns validation info for RecordId parameter.
				 * @private
				 * @param {Object} value Parameter value.
				 * @return {Object}
				 */
				validateRecordId: function(value) {
					var constants = Terrasoft.process.constants;
					var signalType = this.get("SignalType");
					if (signalType && signalType.value === constants.SignalType.ObjectSignal) {
						return ProcessSchemaUserTaskUtilities.validateMappingValue.call(this, value);
					} else {
						return {
							invalidMessage: "",
							isValid: true
						};
					}
				},

				/**
				 * Returns validation info for EntitySchema parameter.
				 * @private
				 * @param {Object} value Parameter value.
				 * @return {Object}
				 */
				validateEntitySchema: function(value) {
					var constants = Terrasoft.process.constants;
					var signalType = this.get("SignalType");
					if (signalType && signalType.value === constants.SignalType.ObjectSignal && !value) {
						return {
							invalidMessage: Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage,
							isValid: false
						};
					} else {
						return {
							invalidMessage: "",
							isValid: true
						};
					}
				},

				/**
				 * RecordId property change handler.
				 * @protected
				 */
				onRecordIdChanged: function() {
					var recordId = this.get("RecordId");
					var isEmpty = this.Ext.isObject(recordId) ? this.Ext.isEmpty(recordId.value) : true;
					if (!isEmpty) {
						var referenceSchemaUId = this.getMappingSchemaUId(recordId.value);
						if (!Ext.isEmpty(referenceSchemaUId)) {
							this.set("EntitySchemaSelect", referenceSchemaUId);
							this.un("change:EntitySchemaSelect", this.onEntitySchemaSelectChanged, this);
							this.initEntitySchemaSelect(function() {
								this.setValidationInfo("EntitySchemaSelect", true, null);
							}, this);
						}
					} else {
						this.set("EntitySchemaSelect", null);
						this.setValidationInfo("EntitySchemaSelect", true, null);
					}
				},

				/**
				 * Checks if is lookup mapping value.
				 * @protected
				 * @param {String} value Mapping value.
				 * @return {Boolean}
				 */
				isLookupMappingValue: function(value) {
					var result = false;
					if (value) {
						var valueMacros = Terrasoft.FormulaMacros.from(value);
						result = valueMacros.containsPrefix(Terrasoft.process.constants.LOOKUP_VALUE_PREFIX);
					}
					return result;
				},

				/**
				 * Returns entitySchema UId from lookup mapping value.
				 * @protected
				 * @param {String} value Mapping value.
				 * @return {String} EntitySchema UId.
				 */
				getLookupMappingSchemaUId: function(value) {
					var result = "";
					if (this.isLookupMappingValue(value)) {
						result = value.split(".");
						result = result[1];
					}
					return result;
				},

				/**
				 * Returns entitySchema UId from parameter mapping value.
				 * @protected
				 * @param {String} value Mapping value.
				 * @return {String} EntitySchema UId.
				 */
				getParameterMappingSchemaUId: function(value) {
					var result = "";
					var mappingInfo = this.Terrasoft.FormulaParserUtils.getParameterMappingInfo(value);
					if (!Ext.isEmpty(mappingInfo)) {
						var element = this.get("ProcessElement");
						var recordIdParameter = element.findParameterByName("RecordId");
						if (recordIdParameter.uId === mappingInfo.parameterUId) {
							return result;
						}
						var schema = element.parentSchema;
						var parameter = this.getProcessParameter(mappingInfo, schema);
						if (parameter) {
							var parameterValue = parameter.getValue();
							result = this.getLookupMappingSchemaUId(parameterValue) || parameter.referenceSchemaUId;
						}
					}
					return result;
				},

				/**
				 * Returns process parameter.
				 * @protected
				 * @param {Object} mappingInfo Mapping info.
				 * @param {Terrasoft.ProcessSchema} parentSchema Process schema instance.
				 */
				getProcessParameter: function(mappingInfo, parentSchema) {
					var parameterUId = mappingInfo.parameterUId;
					var parameter;
					if (!parameterUId) {
						return parameter;
					}
					var schemaElementUId = mappingInfo.schemaElementUId;
					if (schemaElementUId) {
						var flowElement = parentSchema.findItemByUId(schemaElementUId);
						parameter = flowElement.parameters.get(parameterUId);
					} else {
						parameter = parentSchema.parameters.get(parameterUId);
					}
					if (parameter) {
						var value = parameter.getValue();
						var parameterMappingInfo = this.Terrasoft.FormulaParserUtils.getParameterMappingInfo(value);
						if (parameterMappingInfo.parameterUId) {
							parameter = this.getProcessParameter(parameterMappingInfo, parentSchema);
						}
					}
					return parameter;
				},

				/**
				 * Returns entitySchema UId from mapping value.
				 * @protected
				 * @param {String} value Mapping value.
				 * @return {String} EntitySchema UId.
				 */
				getMappingSchemaUId: function(value) {
					var result = this.getLookupMappingSchemaUId(value) || this.getParameterMappingSchemaUId(value);
					return result;
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "merge",
				"name": "EntitySchemaSelect",
				"parentName": "ObjectSignalControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					}
				}
			}, {
				"operation": "merge",
				"name": "ObjectSignalPropertiesControlGroup",
				"parentName": "ObjectSignalControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			}, {
				"operation": "merge",
				"name": "ObjectSignalFiltersControlGroup",
				"parentName": "ObjectSignalControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				}
			}, {
				"operation": "insert",
				"name": "RecordId",
				"parentName": "ObjectSignalControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"isRequired": true,
					"wrapClass": ["top-caption-control"],
					"caption": {
						"bindTo": "Resources.Strings.RecordIdCaption"
					}
				}
			}] /**SCHEMA_DIFF*/
		};
	}
);


