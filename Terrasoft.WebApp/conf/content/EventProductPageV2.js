Terrasoft.configuration.Structures["EventProductPageV2"] = {innerHierarchyStack: ["EventProductPageV2"], structureParent: "BasePageV2"};
define('EventProductPageV2Structure', ['EventProductPageV2Resources'], function(resources) {return {schemaUId:'0e7a0549-f1b0-4038-a478-0ca460428bc6',schemaCaption: "EventProductPageV2", parentSchemaName: "BasePageV2", schemaName:'EventProductPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventProductPageV2",
		function() {
			return {
				entitySchemaName: "EventProduct",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				methods: {
					/**
					 * ######## ########
					 * @overridden
					 */
					save: function() {
						var initialArgs = arguments;
						this.asyncValidate(function(resultObject) {
							if (!resultObject.success) {
								this.showInformationDialog(resultObject.message);
							} else {
								var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
									rootSchemaName: "EventProduct"
								});
								select.addColumn("Id");
								select.filters.add("EventIdFilter", select.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL, "Event", this.get("Event").value));
								select.filters.add("ProductIdFilter", select.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL, "Product", this.get("Product").value));
								select.getEntityCollection(function(result) {
									var collection = result.collection;
									if (collection && collection.collection.length > 0 && this.isNew) {
										//TODO: add localizable string
										this.showInformationDialog(this.get("Resources.Strings.WarningWrongProduct"));
									} else {
										this.superclass.save.apply(this, initialArgs);
									}
								}, this);
							}
						}, this);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "Tabs",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.TAB_PANEL,
							"activeTabChange": {"bindTo": "activeTabChange"},
							"activeTabName": {"bindTo": "ActiveTabName"},
							"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
							"tabs": [],
							"visible": false
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
							"controlConfig": {
								"enabled": false
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Product",
						"values": {
							"bindTo": "Product",
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12
							}
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
					}
				]/**SCHEMA_DIFF*/
			};
		});


