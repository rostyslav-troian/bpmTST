Terrasoft.configuration.Structures["ProcessSchemaParameterEditPage"] = {innerHierarchyStack: ["ProcessSchemaParameterEditPage"]};
define('ProcessSchemaParameterEditPageStructure', ['ProcessSchemaParameterEditPageResources'], function(resources) {return {schemaUId:'a10be437-7ae6-4b84-9301-70631cb58f6f',schemaCaption: "ProcessSchemaParameterEditPage", parentSchemaName: "", schemaName:'ProcessSchemaParameterEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page schema for edit process parameter properties.
 */
define("ProcessSchemaParameterEditPage", ["terrasoft", "ProcessSchemaParameterEditPageResources",
		"css!ProcessSchemaParameterEditModule", "MappingEditMixin"],
	function(Terrasoft, resources) {
		return {
			mixins: {
				mappingEdit: "Terrasoft.MappingEditMixin"
			},
			attributes: {
				/**
				 * Parameter identifier.
				 */
				"UId": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Parameter name.
				 */
				"Name": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.CodeCaption,
					isRequired: true
				},
				/**
				 * Parameter caption.
				 */
				"Caption": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.TitleCaption,
					isRequired: true
				},
				/**
				 * Reference schema.
				 */
				"ReferenceSchema": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isLookup: true,
					referenceSchemaName: "VwSysEntitySchemaInWorkspace",
					dependencies: [{
						columns: ["ParameterDataValueTypeConfig"],
						methodName: "onParameterDataValueTypeConfigChange"
					}],
					caption: resources.localizableStrings.LookupCaption
				},
				/**
				 * Flag that indicates visibility of ReferenceSchema.
				 */
				"ReferenceSchemaVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Flag that indicates enabled for page editors.
				 */
				"IsEnabled": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Flag that indicates is ViewModel changed.
				 */
				"IsChanged": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Parameter dataValueType.
				 */
				"ParameterDataValueTypeConfig": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.DataValueTypeCaption,
					isRequired: true
				},
				/**
				 * Parameter value.
				 */
				"Value": {
					dataValueType: this.Terrasoft.DataValueType.MAPPING,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: resources.localizableStrings.ValueCaption
				},
				/**
				 * DataValueType list.
				 */
				"DataValueTypeList": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Process element.
				 */
				"ProcessElement": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * The unique identifier of the package.
				 */
				"packageUId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				/**
				 * Flag that indicates whether SaveButton is enabled or not.
				 */
				"ShowSaveButton": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * Parent parameter uId.
				 */
				ParentUId: {dataValueType: Terrasoft.DataValueType.GUID},

				/**
				 * Invoker uId.
				 */
				InvokerUId: {dataValueType: Terrasoft.DataValueType.GUID}

			},
			messages: {
				/**
				 * @message GetParametersInfo
				 * Send process parameter value to mapping window.
				 */
				"GetParametersInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SetParametersInfo
				 * Save process parameter mapping value.
				 */
				"SetParametersInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SaveParameterInfo
				 * Save process parameter properties.
				 */
				"SaveParameterInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message DiscardParameterInfoChanges
				 * Discard parameter properties.
				 */
				"DiscardParameterInfoChanges": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message LookupInfo
				 * Send lookup info into Lookup page.
				 */
				"LookupInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SaveParameter
				 * Message for save parameter from parent module.
				 */
				"SaveParameter": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
				 * @override
				 */
				getParameterReferenceSchemaUId: function() {
					var referenceSchema = this.get("ReferenceSchema");
					return referenceSchema ? referenceSchema.value : null;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					this.setValidationConfig();
					this.initParameters();
					this.initReferenceSchema(function() {
						this.isParameterEditInitialized = true;
						this.subscribeMessages();
						this.onPageInitialized(callback, scope);
					}, this);
					this.on("change:Value", this.onMappingValueChanged, this);
				},

				/**
				 * @inheritdoc MappingEditMixin#getInvokerUId
				 * @override
				 */
				getInvokerUId: function() {
					return this.get("InvokerUId") || this.get("UId");
				},

				/**
				 * @inheritdoc MappingEditMixin#clearNestedValues
				 * @override
				 */
				clearNestedValues: Terrasoft.emptyFn,

				/**
				 * @inheritdoc MappingEditMixin#tryClearParentValue
				 * @override
				 */
				tryClearParentValue: Terrasoft.emptyFn,

				/**
				 * @inheritdoc MappingEditMixin#setParentMappingEditValue
				 * @override
				 */
				setParentMappingEditValue: function(sourceValue, callback, scope) {
					Ext.callback(callback, scope);
				},

				/**
				 * On mapping value change event handler. Activates save button.
				 * @private
				 */
				onMappingValueChanged: function() {
					this.set("ShowSaveButton", true);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("Name", this.nameValidator);
					this.addColumnValidator("Name", this.duplicateValueValidator);
					this.addColumnValidator("Caption", this.duplicateValueValidator);
					this.addColumnValidator("ReferenceSchema", this.referenceSchemaRequiredValidator);
				},

				/**
				 * Initializes parameter lookup schema name.
				 */
				initReferenceSchema: function(callback, scope) {
					var dataValueType = this.get("ParameterDataValueTypeConfig") || {};
					dataValueType = dataValueType.value;
					var isReferenceSchemaVisible = dataValueType === Terrasoft.DataValueType.LOOKUP;
					this.set("ReferenceSchemaVisible", isReferenceSchemaVisible);
					this.columns.ReferenceSchema.isRequired = isReferenceSchemaVisible;
					var referenceSchema = this.get("ReferenceSchema");
					if (isReferenceSchemaVisible && referenceSchema && referenceSchema.value) {
						this.initializeLookupSchema(referenceSchema.value, function(referenceSchema) {
							this.set("ReferenceSchema", referenceSchema);
							callback.call(scope);
						}, this);
						return;
					}
					callback.call(scope);
				},

				/**
				 * Handles change the data model.
				 * @override
				 */
				onDataChange: function() {
					this.callParent(arguments);
					if (this.isParameterEditInitialized) {
						this.set("IsChanged", true);
					}
				},

				/**
				 * Called after the initialization scheme.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				onPageInitialized: function(callback, scope) {
					callback.call(scope || this);
				},

				//endregion

				//region Methods: Private

				/**
				 * Executes system name validation info.
				 * @private
				 * @param {String} value Parameter name.
				 * @return {Object} Validation info.
				 */
				nameValidator: function(value) {
					var message = "";
					var reqExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]*$/;
					if (!reqExp.test(value)) {
						message = this.get("Resources.Strings.WrongParameterNameMessage");
					}
					return {invalidMessage: message};
				},

				/**
				 * Executes duplicate value validation info.
				 * @private
				 * @param {String} value Changed value.
				 * @param {Object} attribute Attribute.
				 * @param {String} attribute.name Attribute name.
				 * @return {Object} Validation info.
				 */
				duplicateValueValidator: function(value, attribute) {
					var message = "";
					var attributeName = attribute.name;
					var isEditEnabled = this.get("IsEnabled");
					if (isEditEnabled) {
						var parameters = this.get("Parameters");
						var filteredParameters = parameters.filterByFn(function(parameter) {
							return parameter.get(attributeName) === value;
						}, this);
						var parameter = filteredParameters.first();
						if (parameter) {
							if (parameter.get("UId") !== this.get("UId")) {
								message = this.get("Resources.Strings.DuplicateParameter" + attributeName + "Message");
							}
						} else if (attributeName === "Name") {
							var processElement = this.getProcessElement();
							var processSchema = processElement.parentSchema || processElement;
							var flowElement = processSchema.flowElements.findByFn(function(element) {
								return element.getName() === value;
							}, this);
							if (flowElement) {
								message = this.get("Resources.Strings.DuplicateElementNameMessage");
							}
						}
					}
					return {invalidMessage: message};
				},

				/**
				 * Executes reference schema validation info.
				 * @private
				 * @param {Object} referenceSchema Changed value.
				 * @param {Object} attribute Attribute.
				 * @param {String} attribute.name Attribute name.
				 * @return {Object} Validation info.
				 */
				referenceSchemaRequiredValidator: function(referenceSchema, attribute) {
					var value = referenceSchema && referenceSchema.value;
					return this.requiredValidator(value, attribute);
				},

				/**
				 * Initializes parameters.
				 * @private
				 */
				initParameters: function() {
					this.initDesignerType();
					this.set("DataValueTypeList", Ext.create("Terrasoft.Collection"));
					this.initDataValueTypeDisplayValue();
				},

				/**
				 * Initializes Data type display value.
				 * @private
				 */
				initDataValueTypeDisplayValue: function() {
					var dataValueType = this.get("ParameterDataValueTypeConfig");
					if (dataValueType && Ext.isNumber(dataValueType.value)) {
						var value = dataValueType.value;
						var dataValueTypeConfig = Terrasoft.data.constants.DataValueTypeConfig;
						Terrasoft.each(dataValueTypeConfig, function(typeConfig) {
							if (typeConfig.value === value) {
								this.set("ParameterDataValueTypeConfig", Terrasoft.deepClone(typeConfig));
								this.set("DataValueType", typeConfig.value);
							}
						}, this);
					}
				},

				/**
				 * Subscribes messages.
				 * @private
				 */
				subscribeMessages: function() {
					this.sandbox.subscribe("SaveParameter", this.saveParameter, this, [this.sandbox.id]);
				},

				/**
				 * Handles a click on the "Save" button.
				 * @private
				 */
				onSaveClick: function() {
					this.saveParameter();
				},

				/**
				 * Saves parameter.
				 * @private
				 * @return {Boolean} Parameter is saved.
				 */
				saveParameter: function() {
					var isValid = this.validate();
					if (!isValid) {
						return false;
					}
					var sandbox = this.sandbox;
					var data = {
						UId: this.get("UId"),
						Name: this.get("Name"),
						Caption: this.get("Caption"),
						DataValueType: this.get("ParameterDataValueTypeConfig"),
						ReferenceSchema: this.get("ReferenceSchema") || {},
						Value: this.get("Value")
					};
					this.sandbox.publish("SaveParameterInfo", data, [sandbox.id]);
					return true;
				},

				/**
				 * Fires message "DiscardParameterInfoChanges" into base page.
				 * @private
				 */
				discardChanges: function() {
					var sandbox = this.sandbox;
					sandbox.publish("DiscardParameterInfoChanges", this.get("Name"), [sandbox.id]);
				},

				/**
				 * Handles DiscardChanges button click.
				 * @private
				 */
				onDiscardChangesClick: function() {
					this.discardChanges();
				},

				/**
				 * Initializes Data type list.
				 * @private
				 * @param {String} filter Filter string.
				 * @param {Terrasoft.core.collections.Collection} list Data type list.
				 */
				prepareDataValueTypeList: function(filter, list) {
					if (!list) {
						return;
					}
					list.clear();
					var sortedList = Ext.create("Terrasoft.Collection");
					sortedList.loadAll(Terrasoft.data.constants.DataValueTypeConfig);
					sortedList.removeByKey("LOCALIZABLE_STRING");
					sortedList.sort("displayValue", Terrasoft.OrderDirection.ASC);
					list.loadAll(sortedList);
				},

				/**
				 * Handler of parameter data value type config changes.
				 * @param {Terrasoft.DataValueType} dataValueType Data type.
				 */
				onParameterDataValueTypeConfigChange: function(dataValueType) {
					var oldDataValueType = this.get("ParameterDataValueTypeConfig");
					var oldDataValueTypeValue = oldDataValueType ? oldDataValueType.value : null;
					var dataValueTypeValue = dataValueType ? dataValueType.value : null;
					if (oldDataValueTypeValue === dataValueTypeValue) {
						return;
					}
					this.set("DataValueType", dataValueType);
					var isLookup = dataValueTypeValue === Terrasoft.DataValueType.LOOKUP;
					this.set("ReferenceSchemaVisible", isLookup);
					this.set("ReferenceSchema", null);
					this.columns.ReferenceSchema.isRequired = isLookup;
					var oldValue = this.get("Value") || {};
					this.set("Value", {
						value: null,
						displayValue: null,
						source: Terrasoft.ProcessSchemaParameterValueSource.None,
						referenceSchemaUId: oldValue.referenceSchemaUId,
						dataValueType: dataValueTypeValue
					});
				},

				/**
				 * Reference schema change handler.
				 * @private
				 * @param {Object} referenceSchema Reference schema object.
				 */
				onReferenceSchemaChange: function(referenceSchema) {
					var currentValue = this.get("Value");
					var currentReferenceSchemaUId = currentValue ? currentValue.referenceSchemaUId : null;
					currentValue = {
						source: Terrasoft.ProcessSchemaParameterValueSource.None,
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						value: null,
						displayValue: null,
						referenceSchemaUId: null
					};
					if (referenceSchema) {
						var newReferenceSchemaUId = referenceSchema.value;
						if (currentReferenceSchemaUId === newReferenceSchemaUId) {
							return;
						}
						currentValue.referenceSchemaUId = newReferenceSchemaUId;
					}
					this.set("Value", currentValue);
				},

				/**
				 * @inheritdoc MappingEditMixin#setMappingEditValue
				 * @override
				 */
				setMappingEditValue: function(parameterName, sourceValue, options) {
					this.mixins.mappingEdit.setMappingEditValue.call(this, parameterName, sourceValue, options);
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ParameterEdit",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ParameterEditContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["parameter-edit-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"name": "Caption",
					"values": {
						"itemType": Terrasoft.ViewItemType.TEXT,
						"value": {"bindTo": "Caption"},
						"isRequired": true,
						"enabled": {"bindTo": "IsEnabled"},
						"classes": {
							"labelClass": ["t-label-proc"]
						},
						"wrapClass": ["parameter-edit-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"itemType": Terrasoft.ViewItemType.TEXT,
						"value": {"bindTo": "Name"},
						"isRequired": true,
						"enabled": {"bindTo": "IsEnabled"},
						"classes": {
							"labelClass": ["t-label-proc"]
						},
						"wrapClass": ["parameter-edit-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"name": "ParameterDataValueTypeConfig",
					"values": {
						"itemType": Terrasoft.ContentType.ENUM,
						"isRequired": true,
						"enabled": {"bindTo": "IsEnabled"},
						"classes": {
							"labelClass": ["t-label-proc"]
						},
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": {
								"bindTo": "prepareDataValueTypeList"
							},
							"list": {"bindTo": "DataValueTypeList"},
							"change": {"bindTo": "onParameterDataValueTypeConfigChange"}
						},
						"wrapClass": ["parameter-edit-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"name": "ReferenceSchema",
					"values": {
						"contentType": Terrasoft.ContentType.ENUM,
						"value": {"bindTo": "ReferenceSchema"},
						"enabled": {"bindTo": "IsEnabled"},
						"visible": {"bindTo": "ReferenceSchemaVisible"},
						"classes": {
							"labelClass": ["t-label-proc"]
						},
						"isRequired": true,
						"controlConfig": {
							"prepareList": {
								"bindTo": "prepareEntityList"
							},
							"change": {"bindTo": "onReferenceSchemaChange"},
							"filterComparisonType": Terrasoft.StringFilterType.CONTAIN
						},
						"wrapClass": ["parameter-edit-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"name": "Value",
					"values": {
						"itemType": Terrasoft.ViewItemType.MAPPING,
						"value": {"bindTo": "Value"},
						"classes": {
							"labelClass": ["t-label-proc"]
						},
						"controlConfig": {
							"placeholder": {"bindTo": "Resources.Strings.ValuePlaceHolderCaption"},
							"cleariconclick": {"bindTo": "onClearIconClick"}
						},
						"wrapClass": ["parameter-edit-control", "placeholderOpacity"]
					}
				},
				{
					"operation": "insert",
					"name": "Actions",
					"parentName": "ParameterEditContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["actions-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Actions",
					"propertyName": "items",
					"name": "DiscardChangesButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"click": {"bindTo": "onDiscardChangesClick"},
						"styles": {
							"textStyle": {
								"margin-left": "10px"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Actions",
					"propertyName": "items",
					"name": "SaveButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"click": {"bindTo": "onSaveClick"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"enabled": {"bindTo": "ShowSaveButton"},
						"tag": "save",
						"markerValue": "SaveButton"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


