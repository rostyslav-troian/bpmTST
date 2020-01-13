Terrasoft.configuration.Structures["CaseNextStatusLookupEditPage"] = {innerHierarchyStack: ["CaseNextStatusLookupEditPage"], structureParent: "BasePageV2"};
define('CaseNextStatusLookupEditPageStructure', ['CaseNextStatusLookupEditPageResources'], function(resources) {return {schemaUId:'08891e80-ab2e-482d-a7a5-3c08c2f842bf',schemaCaption: "CaseNextStatusLookupEditPage", parentSchemaName: "BasePageV2", schemaName:'CaseNextStatusLookupEditPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseNextStatusLookupEditPage", ["ConfigurationGrid", "ConfigurationGridGenerator",
		"ConfigurationGridUtilities"],
	function() {
		return {
			entitySchemaName: "CaseNextStatus",
			details: /**SCHEMA_DETAILS*/{
				"CaseRuleInStageInsert": {
					"schemaName": "CaseRuleInStageDetail",
					"entitySchemaName": "CaseRuleInStage",
					"filter": {
						"detailColumn": "CaseNextStatus",
						"masterColumn": "Id"
					}
				}
			}/**SCHEMA_DETAILS*/,
			attributes: {
				"ChangeStatusColumns": {
					dependencies: [{
						columns: ["Status", "NextStatus"],
						methodName: "onColumnsChange"
					}]
				},
				"Status": {
					lookupListConfig: {
						hideActions: true
					}
				},
				"NextStatus": {
					lookupListConfig: {
						hideActions: true
					}
				}
			},
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
			},
			methods: {
				/**
				 * Handles the change event of Default column.
				 * @private
				 */
				onColumnsChange: function() {
					var separator = this.get("Resources.Strings.Separator");
					var oldCaptionValue = this.get("Name");
					var oldStatusColumn = this.getPrevious("Status") ?
							this.getPrevious("Status").displayValue : "";
					var oldNextStatusColumnValue = this.getPrevious("NextStatus") ?
							this.getPrevious("NextStatus").displayValue : "";
					var oldColumnsValue = oldStatusColumn + separator + oldNextStatusColumnValue;
					var statusColumnValue = this.get("Status") ? this.get("Status").displayValue : "";
					var nextStatusColumnValue = this.get("NextStatus") ? this.get("NextStatus").displayValue : "";
					var captionValue = statusColumnValue + separator + nextStatusColumnValue;
					if (!oldCaptionValue || oldCaptionValue === oldColumnsValue) {
						this.set("Name", captionValue);
					}
				},
				/**
				 * @inheritdoc ConfigurationGridUtilitiesV2#validate
				 * @overriden
				 */
				validate: function() {
					var statusColumnValue = this.get("Status") ? this.get("Status").displayValue : "";
					var nextStatusColumnValue = this.get("NextStatus") ? this.get("NextStatus").displayValue : "";
					var result = statusColumnValue !== nextStatusColumnValue;
					if (!result) {
						this.Terrasoft.utils.showInformation(this.get("Resources.Strings.DuplicateMessage"));
					}
					return result;
				},

				/**
				 * Returns empty collection action cards.
				 * @override
				 * @return {Terrasoft.BaseViewModelCollection} Returns empty collection action cards.
				 */
				getActions: function() {
					var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					return actionMenuItems;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "CaseRuleInStageDetailTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.CaseRuleInStageDetailCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "CaseRuleInStageDetailTab",
					"propertyName": "items",
					"name": "CaseRuleInStageInsert",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "Name",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Name"
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Status",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Status"
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "NextStatus",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "NextStatus"
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				}
			]/**SCHEMA_DIFF*/
		};
	});




