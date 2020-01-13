Terrasoft.configuration.Structures["BasicServiceAuthInfoValuesPage"] = {innerHierarchyStack: ["BasicServiceAuthInfoValuesPage"]};
define('BasicServiceAuthInfoValuesPageStructure', ['BasicServiceAuthInfoValuesPageResources'], function(resources) {return {schemaUId:'7ed57aec-7412-45e6-98e2-4b4b0508c670',schemaCaption: "", parentSchemaName: "", schemaName:'BasicServiceAuthInfoValuesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BasicServiceAuthInfoValuesPage", [], function() {
	return {
		attributes: {

			/**
			 * UId of service schema.
			 */
			ServiceSchemaUId: {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Is allow edit schema.
			 */
			CanEditSchema: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},
		modules: {
			AuthInfoUsernameParameter: {
				moduleId: "AuthInfoUsernameParameterValuePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "AuthInfoUsernameValuePage",
					parameters: {
						viewModelConfig: {
							ServiceSchemaUid: {
								attributeValue: "ServiceSchemaUId"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					},
					useHistoryState: false
				}
			},
			AuthInfoPasswordParameter: {
				moduleId: "AuthInfoPasswordParameterValuePage",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "AuthInfoPasswordValuePage",
					parameters: {
						viewModelConfig: {
							ServiceSchemaUid: {
								attributeValue: "ServiceSchemaUId"
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
		diff: [
			{
				"operation": "insert",
				"name": "BasicAuthInfoContainer",
				"parentName": "ParameterEdit",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "AuthInfoUsernameParameter",
				"parentName": "BasicAuthInfoContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}

			},
			{
				"operation": "insert",
				"name": "AuthInfoPasswordParameter",
				"parentName": "BasicAuthInfoContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			}
		]
	};
});


