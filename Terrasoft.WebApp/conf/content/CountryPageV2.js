Terrasoft.configuration.Structures["CountryPageV2"] = {innerHierarchyStack: ["CountryPageV2"], structureParent: "BaseLookupPage"};
define('CountryPageV2Structure', ['CountryPageV2Resources'], function(resources) {return {schemaUId:'972596f7-aaf3-404d-aa12-0d44434fa246',schemaCaption: "CountryPageV2", parentSchemaName: "BaseLookupPage", schemaName:'CountryPageV2',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CountryPageV2", [],
		function() {
			return {
				entitySchemaName: "Country",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				attributes: {},
				methods: {},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "actions"
					},
					{
						"operation": "remove",
						"name": "ViewOptionsButton"
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "BillingInfo",
						"values": {
							"bindTo": "BillingInfo",
							"layout": {"column": 0, "row": 1, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "TimeZone",
						"values": {
							"bindTo": "TimeZone",
							"layout": {"column": 0, "row": 2, "colSpan": 12}
						}
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoBlock",
						"propertyName": "items",
						"name": "Code",
						"values": {
							"bindTo": "Code",
							"layout": {"column": 0, "row": 3, "colSpan": 12}
						}
					},
					{
						"operation": "merge",
						"name": "Description",
						"values": {
							"layout": {"column": 0, "row": 4, "colSpan": 24}
						}
					}

				]/**SCHEMA_DIFF*/

			};
		});


