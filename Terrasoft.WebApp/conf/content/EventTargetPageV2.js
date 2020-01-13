Terrasoft.configuration.Structures["EventTargetPageV2"] = {innerHierarchyStack: ["EventTargetPageV2"], structureParent: "BasePageV2"};
define('EventTargetPageV2Structure', ['EventTargetPageV2Resources'], function(resources) {return {schemaUId:'ff0920d5-4299-4a78-aef3-ff2348300cdd',schemaCaption: "Event target audience - Page", parentSchemaName: "BasePageV2", schemaName:'EventTargetPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventTargetPageV2", ["terrasoft", "ext-base"],
		function(Terrasoft, Ext) {
			return {
				entitySchemaName: "EventTarget",
				details: /**SCHEMA_DETAILS*/{
				}/**SCHEMA_DETAILS*/,
				methods: {
					/**
					 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
					 * @overridden
					 */
					asyncValidate: function(callback, scope) {
						this.callParent([function() {
							var select = Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "EventTarget"
							});
							select.addColumn("Id");
							select.filters.add("EventIdFilter",
									select.createColumnFilterWithParameter(
											Terrasoft.ComparisonType.EQUAL, "Event", this.get("Event").value));
							if (this.get("Contact")) {
								select.filters.add("ContactFilter",
										select.createColumnFilterWithParameter(
												Terrasoft.ComparisonType.EQUAL, "Contact", this.get("Contact").value));
							}
							select.getEntityCollection(function(result) {
								var collection = result.collection;
								var validationResult = {
									success: true
								};
								if (collection && collection.getCount() > 0 && this.isNew && this.get("Contact")) {
									validationResult.message = this.get("Resources.Strings.WarningWrongContact");
									validationResult.success = false;
								}
								callback.call(scope || this, validationResult);
							}, this);
						}, this]);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "Tabs",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							itemType: Terrasoft.ViewItemType.TAB_PANEL,
							activeTabChange: {bindTo: "activeTabChange"},
							activeTabName: {bindTo: "ActiveTabName"},
							classes: {wrapClass: ["tab-panel-margin-bottom"]},
							tabs: [],
							visible: false
						}
					},
					{
						"operation": "insert",
						"name": "TargetContainer",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12
							},
							itemType: Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Event",
						"values": {
							"bindTo": "Event",
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24
							},
							controlConfig: {
								enabled: false
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "EventResponse",
						"values": {
							"layout": {
								"column": 12,
								"row": 1,
								"colSpan": 12
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Note",
						"values": {
							"contentType": Terrasoft.ContentType.LONG_TEXT,
							"bindTo": "Note",
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24,
								"rowSpan": 2
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "TargetContainer",
						"propertyName": "items",
						"name": "Contact",
						"values": {
							"labelConfig": {
								isRequired: true
							}
						}
					},
					{
						"operation": "remove",
						"name": "actions"
					}
				]/**SCHEMA_DIFF*/,
				rules: {},
				userCode: {}
			};
		});


