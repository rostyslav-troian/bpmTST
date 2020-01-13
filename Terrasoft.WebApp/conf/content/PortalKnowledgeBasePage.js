Terrasoft.configuration.Structures["PortalKnowledgeBasePage"] = {innerHierarchyStack: ["PortalKnowledgeBasePage"], structureParent: "KnowledgeBasePageV2"};
define('PortalKnowledgeBasePageStructure', ['PortalKnowledgeBasePageResources'], function(resources) {return {schemaUId:'3f56aaf7-7d44-4648-806a-6e2df10f0c75',schemaCaption: "Edit page schema - \"Knowledge base\" section on Portal", parentSchemaName: "KnowledgeBasePageV2", schemaName:'PortalKnowledgeBasePage',parentSchemaUId:'9dbd0611-fa52-4a90-9542-e5fd997b4afd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalKnowledgeBasePage", [],
		function() {
			return {
				entitySchemaName: "KnowledgeBase",
				details: /**SCHEMA_DETAILS*/{
					"FileDetailReadOnly": {
						"schemaName": "FileDetailReadOnly",
						"entitySchemaName": "KnowledgeBaseFile",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "KnowledgeBase"
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "RelationsTab"
					},
					{
						"operation": "merge",
						"name": "Name",
						"values": {
							"enabled": false
						}
					},
					{
						"operation": "merge",
						"name": "Type",
						"values": {
							"enabled": false
						}
					},
					{
						"operation": "merge",
						"name": "Notes",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 1
							},
							"enabled": false
						}
					},
					{
						"operation": "remove",
						"name": "KnowledgeBasePageGeneralTegContainer"
					},
					{
						"operation": "merge",
						"name": "LikeContainer",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24,
								"rowSpan": 1
							}
						}
					},
					{
						"operation": "remove",
						"name": "Files"
					},
					{
						"operation": "insert",
						"name": "FileDetailReadOnly",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL
						},
						"parentName": "FilesTab",
						"propertyName": "items",
						"index": 0
					}
				]/**SCHEMA_DIFF*/,
				methods: {
					/**
					 * @overriden
					 * ############## ######## ########
					 */
					initActionButtonMenu: function() {
						this.set("ActionsButtonVisible", false);
					}
				}
			};
		});


