Terrasoft.configuration.Structures["OpportunitySearchRowSchema"] = {innerHierarchyStack: ["OpportunitySearchRowSchema"], structureParent: "BaseSearchRowSchema"};
define('OpportunitySearchRowSchemaStructure', ['OpportunitySearchRowSchemaResources'], function(resources) {return {schemaUId:'78f736c8-74dd-4cc7-b72d-7167fee4c250',schemaCaption: "OpportunitySearchRowSchema", parentSchemaName: "BaseSearchRowSchema", schemaName:'OpportunitySearchRowSchema',parentSchemaUId:'254c5d91-bad1-44be-a75e-1d511f816dc0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OpportunitySearchRowSchema", ["MultiLookupUtilitiesMixin", "ImageListGenerator"], function() {
	return {
		attributes: {
			"Client": {
				"caption": {"bindTo": "Resources.Strings.ClientColumnCaption"},
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"multiLookupColumns": ["Contact", "Account"]
			}
		},
		methods: {
			/**
			 * Returns mood image url.
			 * @return {String} Mood image url.
			 */
			getMoodImage: function() {
				var mood = this.get("Mood");
				var primaryImageValue = mood && mood.primaryImageValue;
				if (primaryImageValue) {
					return Terrasoft.ImageUrlBuilder.getUrl({
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {primaryColumnValue: primaryImageValue}
					});
				}
				return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultMood"));
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "EntitySchemaCaption"
			},
			{
				"operation": "merge",
				"name": "FoundColumnsContainerList",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"name": "MoodContainer",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["mood-container", "control-width-15"]
					},
					"items": [],
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "insert",
				"name": "Mood",
				"parentName": "MoodContainer",
				"propertyName": "items",
				"values": {
					"getSrcMethod": "getMoodImage",
					"readonly": true,
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
				}
			},
			{
				"operation": "insert",
				"parentName": "MoodContainer",
				"propertyName": "items",
				"name": "Mood"
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "Owner",
				"values": {
					"layout": {
						"column": 18,
						"row": 0,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "Client",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "Stage",
				"values": {
					"layout": {
						"column": 12,
						"row": 1,
						"colSpan": 6
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataContainer",
				"propertyName": "items",
				"name": "Budget",
				"values": {
					"layout": {
						"column": 18,
						"row": 1,
						"colSpan": 6
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


