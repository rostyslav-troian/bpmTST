Terrasoft.configuration.Structures["SysAdminOperationPageV2"] = {innerHierarchyStack: ["SysAdminOperationPageV2"], structureParent: "BasePageV2"};
define('SysAdminOperationPageV2Structure', ['SysAdminOperationPageV2Resources'], function(resources) {return {schemaUId:'39123da8-ba19-42a8-a406-a767d0caded2',schemaCaption: "Section card schema - \"Operations permissions\"", parentSchemaName: "BasePageV2", schemaName:'SysAdminOperationPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminOperationPageV2",
	["SysAdminOperationPageV2Resources"],
	function() {
		return {
			entitySchemaName: "SysAdminOperation",
			details: /**SCHEMA_DETAILS*/{
				DetailOperation: {
					"schemaName": "SysAdminOperationGranteeDetailV2",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "SysAdminOperation"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"name": "Code",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"enabled": {"bindTo": "isAddMode"}
					}
				},
				{
					"operation": "insert",
					"name": "Description",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"contentType": this.Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"name": "DetailOperation",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {"itemType": this.Terrasoft.ViewItemType.DETAIL}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				addSectionDesignerViewOptions: this.Terrasoft.emptyFn,

				initActionButtonMenu: this.Terrasoft.emptyFn,

				initRunProcessButtonMenu: this.Terrasoft.emptyFn,

				saveEntity: function(callback, scope) {
					var config = {
						"serviceName": "RightsService",
						"methodName": "UpsertAdminOperation",
						"data": {
							"recordId": this.get("Id"),
							"name": this.get("Name"),
							"code": this.get("Code"),
							"description": this.get("Description")
						}
					};
					this.callService(config, this.onGetResponse.bind(undefined, callback, scope), this);
				},

				onGetResponse: function(callback, scope, response) {
					if (response && response.UpsertAdminOperationResult) {
						var result = this.Ext.decode(response.UpsertAdminOperationResult);
						if (result && !this.Ext.isEmpty(result)) {
							response.success = result.Success;
							response.message = result.ExMessage;
							response.rowsAffected = 1;
							response.nextPrcElReady = false;
							scope.isNew = false;
							scope.changedValues = null;
							callback.call(scope || this, response);
						}
					}
				}
			}
		};
	});


