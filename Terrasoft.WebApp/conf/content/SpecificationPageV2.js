Terrasoft.configuration.Structures["SpecificationPageV2"] = {innerHierarchyStack: ["SpecificationPageV2"], structureParent: "BasePageV2"};
define('SpecificationPageV2Structure', ['SpecificationPageV2Resources'], function(resources) {return {schemaUId:'11456f7f-f625-4c86-b6dc-86a02f7518b4',schemaCaption: "Feature page", parentSchemaName: "BasePageV2", schemaName:'SpecificationPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SpecificationPageV2", ["SpecificationConstants", "SpecificationListItemDetailV2"],
	function(SpecificationConstants) {
		return {
			entitySchemaName: "Specification",
			methods: {
				/**
				 * Checks if detail visible by specification type.
				 * @return {Boolean} true if must be visible.
				 */
				isValuesListVisible: function() {
					var specificationType = this.get("Type");
					return (specificationType &&
						(specificationType.value === SpecificationConstants.SpecificationTypes.ListType));
				},

				/**
				 * Returns empty collection page actions if the schema is not administered by the records.
				 * @return {Terrasoft.BaseViewModelCollection} Collection of page actions.
				 */
				getActions: function() {
					var parentActions = this.callParent(arguments);
					if (parentActions && !this.getSchemaAdministratedByRecords()) {
						parentActions.clear();
					}
					return parentActions;
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.set("CanUserEditType", this.isNewMode());
				}
			},
			details: /**SCHEMA_DETAILS*/{
				SpecificationListItemDetail: {
					schemaName: "SpecificationListItemDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Specification"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "Tabs",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Type",
					"values": {
						"bindTo": "Type",
						"enabled": {"bindTo": "CanUserEditType"},
						"layout": {"column": 0, "row": 1, "colSpan": 18},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Description",
					"values": {
						"bindTo": "Description",
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"layout": {"column": 0, "row": 2, "colSpan": 18}
					}
				},
				{
					"operation": "insert",
					"name": "DetailControlGroup",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"wrapClass": ["grid-detail"],
						"controlConfig": {
							"collapsed": false,
							"visible": {"bindTo": "isValuesListVisible"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "DetailControlGroup",
					"propertyName": "items",
					"name": "SpecificationListItemDetail",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


