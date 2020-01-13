Terrasoft.configuration.Structures["EmailMLangContentEditSchema"] = {innerHierarchyStack: ["EmailMLangContentEditSchema"], structureParent: "BaseMLangContentEditSchema"};
define('EmailMLangContentEditSchemaStructure', ['EmailMLangContentEditSchemaResources'], function(resources) {return {schemaUId:'fca4094d-2d6d-422d-8f29-623e7edf0dde',schemaCaption: "EmailMLangContentEditSchema", parentSchemaName: "BaseMLangContentEditSchema", schemaName:'EmailMLangContentEditSchema',parentSchemaUId:'5ae8a513-f36d-4e7c-999b-ff22893b1277',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmailMLangContentEditSchema", ["EmailMLangContentEditSchemaResources",
	"EmailTemplateMLangContentBuilderEnumsModule", "css!EmailTemplatePageV2V2Styles",
	"css!EmailMLangContentEditSchemaStyles", "css!DetailModule"
], function(resources, EmailTemplateMLangContentBuilderEnumsModule) {
	return {
		attributes: {
			/**
			 * Template subject.
			 */
			"Subject": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			},
			/**
			 * Template body.
			 */
			"Body": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "MainContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["mlang-content-main-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ContentGridGroup",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
					"caption": {
						"bindTo": "Resources.Strings.ModuleEditCaption"
					},
					"items": [],
					"tools": [],
					"controlConfig": {
						"collapsed": false,
						"classes": ["detail"]
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"parentName": "ContentGridGroup",
				"propertyName": "tools",
				"name": "EditButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.EditButtonCaption"},
					"click": {"bindTo": "onEditButtonClick"},
					"tag": "Body"
				}
			},
			{
				"operation": "insert",
				"name": "ContentGridLayout",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				},
				"parentName": "ContentGridGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Subject",
				"parentName": "ContentGridLayout",
				"propertyName": "items",
				"values": {
					"tag": "Subject",
					"layout": {
						"column": 0,
						"row": 0,
						"rowSpan": 1
					},
					"value": {
						"bindTo": "Subject"
					},
					"classes": {
						"labelClass": ["mlang-subject-label-class"]
					},
					"wrapClass": ["mlang-subject-label-wrap"],
					"caption": {"bindTo": "Resources.Strings.SubjectCaption"},
					"change": {"bindTo": "onControlValueChanged"}
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ContentGridLayout",
				"propertyName": "items",
				"name": "Body",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"generator": function() {
						return {
							"className": "Terrasoft.IframeControl",
							"id": "preview-content-iframe",
							"iframeContent": {"bindTo": "Body"}
						};
					}
				}
			}
		],
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseMLangContentEditSchema#getContentBuilderUrl
			 * @override
			 */
			getContentBuilderUrl: function(contentBuilderMode, recordId, tag) {
				return EmailTemplateMLangContentBuilderEnumsModule.getContentBuilderUrl(
					contentBuilderMode, recordId, tag);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMLangContentEditSchema#getContentBuilderMode
			 * @override
			 */
			getContentBuilderMode: function(isMultilingual) {
				return isMultilingual
					? EmailTemplateMLangContentBuilderEnumsModule.ContentBuilderMode.EMAILTEMPLATELANG
					: EmailTemplateMLangContentBuilderEnumsModule.ContentBuilderMode.EMAILTEMPLATE;
			}
		}
	};
});


