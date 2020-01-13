Terrasoft.configuration.Structures["ServiceResponseParameterGrid"] = {innerHierarchyStack: ["ServiceResponseParameterGrid"], structureParent: "ServiceParameterGrid"};
define('ServiceResponseParameterGridStructure', ['ServiceResponseParameterGridResources'], function(resources) {return {schemaUId:'a5d5b4fa-556b-4050-acbc-da8901c6ebcc',schemaCaption: "ServiceResponseParameterGrid", parentSchemaName: "ServiceParameterGrid", schemaName:'ServiceResponseParameterGrid',parentSchemaUId:'1a7d8f84-863d-4ed3-9aeb-51a3e67068a2',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceResponseParameterGrid", [], function() {
	return {
		modules: {
			ResponseServiceParameterPage: {
				moduleId: "ResponseServiceParameterPage",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "ServiceResponseParameterPage",
					parameters: {
						viewModelConfig: {
							ServiceSchemaUId: {
								attributeValue: "ServiceSchemaUId"
							},
							MethodUId: {
								attributeValue: "MethodUId"
							},
							ParameterUId: {
								attributeValue: "ParameterUId"
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

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#getMethodParameters
			 * @override
			 */
			getMethodParameters: function(method) {
				return method.response.parameters;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterGrid#createParameter
			 * @override
			 */
			createParameter: function() {
				return this.callParent([{
					type: Terrasoft.services.enums.ServiceParameterType.BODY
				}]);
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterGrid#getParameterEditPageTag
			 * @override
			 */
			getParameterEditPageTag: function() {
				return "ResponseParameterEditPage";
			},

			/**
			 * @inheritdoc Terrasoft.ServiceParameterGrid#getParameterGridTag
			 * @override
			 */
			getParameterGridTag: function() {
				return "ServiceResponseParameterGrid";
			},

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#getServiceBuilderTags
			 * @override
			 */
			getServiceBuilderTags: function() {
				return ["ServiceResponseMethodBuilder"];
			}

			//endregion

		},
		diff: [
			{
				operation: "remove",
				name: "ServiceParameterPage"
			},
			{
				operation: "insert",
				parentName: "MainContainer",
				name: "ResponseServiceParameterPage",
				propertyName: "items",
				values: {
					itemType: Terrasoft.ViewItemType.MODULE,
					visible: {
						bindTo: "ActiveRow",
						bindConfig: {converter: "activeRowIsNotEmpty"}
					},
					classes: {wrapClassName: ["service-parameter-grid-page"]}
				}
			}
		]
	};
});


