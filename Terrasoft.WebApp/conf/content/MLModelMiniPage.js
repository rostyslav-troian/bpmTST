Terrasoft.configuration.Structures["MLModelMiniPage"] = {innerHierarchyStack: ["MLModelMiniPage"], structureParent: "BaseMiniPage"};
define('MLModelMiniPageStructure', ['MLModelMiniPageResources'], function(resources) {return {schemaUId:'2742e982-30df-4cda-b07b-31ba9967525f',schemaCaption: "ML model", parentSchemaName: "BaseMiniPage", schemaName:'MLModelMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MLModelMiniPage", ["RootSchemaLookupMixin"], function() {
	return {
		entitySchemaName: "MLModel",
		mixins: {
			RootSchemaLookupMixin: "Terrasoft.RootSchemaLookupMixin"
		},
		attributes: {
			"MiniPageModes": {
				"value": [this.Terrasoft.ConfigurationEnums.CardOperation.ADD]
			},
			/**
			 * Root schema lookup value.
			 */
			"RootSchema": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"isLookup": true,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"caption": {"bindTo": "getRootSchemaCaption"}
			},
			/**
			 * Uid of the root schema.
			 */
			"RootSchemaUId": {
				"dependencies": [
					{
						"columns": ["RootSchema"],
						"methodName": "onRootSchemaChanged"
					}
				]
			}
		},
		methods: {
			/**
			 * @inheritdoc BaseMiniPage#onEntityInitialized
			 * @protected
			 * @override
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.initializeRootSchema();
			},
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"name": "Name",
				"parentName": "MiniPage",
				"operation": "insert",
				"propertyName": "items",
				"index": 0,
				"values": {
					"labelConfig": {
						"visible": true
					},
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					}
				}
			},
			{
				"name": "MLProblemType",
				"parentName": "MiniPage",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			},
			{
				"name": "RootSchema",
				"parentName": "MiniPage",
				"operation": "insert",
				"propertyName": "items",
				"values": {
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareRootSchemaList"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "SaveEditButton",
				"values": {
					"click": {"bindTo": "openCurrentEntityPage"},
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


