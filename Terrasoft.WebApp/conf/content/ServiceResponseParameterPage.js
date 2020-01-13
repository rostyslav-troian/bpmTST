Terrasoft.configuration.Structures["ServiceResponseParameterPage"] = {innerHierarchyStack: ["ServiceResponseParameterPage"], structureParent: "ServiceParameterPage"};
define('ServiceResponseParameterPageStructure', ['ServiceResponseParameterPageResources'], function(resources) {return {schemaUId:'1d9d7a82-c300-4416-aa19-2e18e4662edc',schemaCaption: "ServiceResponseParameterPage", parentSchemaName: "ServiceParameterPage", schemaName:'ServiceResponseParameterPage',parentSchemaUId:'3c5bc346-0b9a-41ba-a554-a2b8f3166538',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceResponseParameterPage", ["ServiceEnums"], function() {
	return {
		modules: {
			ServiceResponseParameterDefValue: {
				moduleId: "ServiceResponseParameterDefValue",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "ServiceResponseParameterValuePage",
					parameters: {
						viewModelConfig: {
							serviceUId: {
								attributeValue: "ServiceSchemaUId"
							},
							methodUId: {
								attributeValue: "MethodUId"
							},
							findParameterMethodName: {
								getValueMethod: "getFindParameterMethodName"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					},
					useHistoryState: false
				}
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Validates if DataType is valid for ParameterType.
			 * @param {Number} [parameterTypeId].
			 * @return {Boolean} Is parameter allowed.
			 * @private
			 */
			_isParameterTypeAllowedForResponsePage: function(parameterTypeId) {
				return parameterTypeId === Terrasoft.services.enums.ServiceParameterType.BODY ||
					parameterTypeId === Terrasoft.services.enums.ServiceParameterType.HTTP_HEADER ||
					parameterTypeId === Terrasoft.services.enums.ServiceParameterType.COOKIE;
			},

			/**
			 * Validates if DataType is valid for ParameterType.
			 * @param {String} dataValueTypeName.
			 * @return {Boolean} Is parameter allowed.
			 * @private
			 */
			_isDataValueTypeNameAllowed: function(dataValueTypeName) {
				return dataValueTypeName !== Terrasoft.services.enums.DataValueTypeName.Object ||
						this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY;
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#getMethodParameters
			 * @override
			 */
			getMethodParameters: function(method) {
				return method.response.parameters;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#prepareParameterTypeList
			 * @override
			 */
			prepareParameterTypeList: function(filter, list) {
				var result = {};
				Terrasoft.each(Terrasoft.services.enums.ServiceParameterType, function(key) {
					if (Terrasoft.services.enums.ServiceParameterTypeCaption[key] &&
					this._isParameterTypeAllowedForResponsePage(key)) {
						result[key] = {
							value: key,
							displayValue: Terrasoft.services.enums.ServiceParameterTypeCaption[key]
						};
					}
				}, this);
				list.reloadAll(result);
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#setDataTypeVisible
			 * @override
			 */
			setDataTypeVisible: function() {
				if (this.getIsFeatureEnabled("VariableResponseCookieDataType") || Terrasoft.isDebug) {
					this.$IsDataTypeVisible = true;
				} else {
					if (this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY) {
						this.$IsDataTypeVisible = true;
					} else {
						this.$IsDataTypeVisible = false;
						this.$DataValueTypeName = Terrasoft.services.enums.DataValueTypeName.Text;
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#parameterTypeValidator
			 * @override
			 */
			parameterTypeValidator: function() {
				var message = "";
				return {invalidMessage: message};
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#getParameterEditPageTag
			 * @override
			 */
			getParameterEditPageTag: function() {
				return "ResponseParameterEditPage";
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#getParameterGridTag
			 * @override
			 */
			getParameterGridTag: function() {
				return "ServiceResponseParameterGrid";
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#getFindParameterMethodName
			 * @override
			 */
			getFindParameterMethodName: function() {
				return "findResponseParameterByUId";
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#getFindParameterMethodName
			 * @override
			 */
			getParameterValuePageTag: function() {
				return "ServiceResponseParameterDefValue";
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#setDataTypeEnabled
			 * @override
			 */
			setDataTypeEnabled: function() {
				var hasNestedParameters = this._hasNestedParameters();
				this.$IsDataTypeEnabled = !hasNestedParameters && this.$CanEditSchema;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#setDefaultDataType
			 * @override
			 */
			setDefaultDataType: function(model) {
				if (this.getPrevious("ParameterType") === Terrasoft.services.enums.ServiceParameterType.BODY &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Object) {
					this._onDataTypeChange(model, Terrasoft.services.enums.DataValueTypeName.Text);
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.ServiceParameterPage#prepareDataValueTypeNameList
			 * @override
			 */
			prepareDataValueTypeNameList: function(filter, list) {
				var result = {};
				Terrasoft.each(Terrasoft.services.enums.DataValueTypeCaption, function(displayValue, value) {
					if (this._isDataValueTypeNameAllowed(value)) {
						result[value] = {value: value, displayValue: displayValue};
					}
				}, this);
				list.reloadAll(result);
			}

			//endregion

		},
		diff: [
			{
				"operation": "remove",
				"name": "ServiceRequestParameterDefValue"
			},
			{
				"operation": "insert",
				"index": 7,
				"parentName": "ParameterEditContainer",
				"name": "ServiceResponseParameterDefValue",
				"propertyName": "items",
				"values": {
					"classes": {"wrapClassName": ["control-width-15", "control-left", "grid-layout-row",
						"module-container"]},
					"itemType": Terrasoft.ViewItemType.MODULE,
					"visible": "$isDefaultValueVisible"
				}
			},
			{
				"operation": "remove",
				"name": "IsRequired"
			}
		]
	};
});


