Terrasoft.configuration.Structures["SimpleSourceCodeEditPage"] = {innerHierarchyStack: ["SimpleSourceCodeEditPage"]};
define('SimpleSourceCodeEditPageStructure', ['SimpleSourceCodeEditPageResources'], function(resources) {return {schemaUId:'f7345fcc-4232-44a4-bcd5-ca46c7336c9c',schemaCaption: "ProcesselementErrorPage", parentSchemaName: "", schemaName:'SimpleSourceCodeEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SimpleSourceCodeEditPage",
		["SourceCodeEditEnums", "SourceCodeEditGenerator",
			"css!ProcessElementTraceDataPageCSS"], function(SourceCodeEditEnums) {
			return {
				attributes: {
					/**
					 * Error description
					 */
					"Content": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": null
					}
				},
				messages: {},
				methods: {

					/**
					 * @inheritDoc Terrasoft.ModalBoxSchemaModule#init.
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([
							function() {
								this.$Content = this.$moduleInfo && this.$moduleInfo.content;
								Ext.callback(callback, scope);
							}, this
						]);
					},

					/**
					 * Close modal window
					 */
					close: function() {
						this.destroyModule();
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "ModalWindow",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {
								"wrapClassName": ["process-element-trace-data-page-container"]
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"name": "Content",
						"parentName": "ModalWindow",
						"values": {
							"contentType": Terrasoft.ContentType.RICH_TEXT,
							"generator": "SourceCodeEditGenerator.generate",
							"showLineNumbers": false,
							"id": "Content",
							"useWorker": false,
							"markerValue": "Content",
							"printMargin": false,
							"readonly": true,
							"classes": {
								"wrapClass": ["process-element-trace-data-editor"]
							},
							"language": SourceCodeEditEnums.Language.CSHARP
						}
					},
					{
						"operation": "insert",
						"propertyName": "items",
						"name": "close-icon",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
							"classes": {"wrapperClass": ["close-btn-trace-data-page"]},
							"click": {"bindTo": "close"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


