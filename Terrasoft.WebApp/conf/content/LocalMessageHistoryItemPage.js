Terrasoft.configuration.Structures["LocalMessageHistoryItemPage"] = {innerHierarchyStack: ["LocalMessageHistoryItemPage"], structureParent: "BaseMessageHistoryItemPage"};
define('LocalMessageHistoryItemPageStructure', ['LocalMessageHistoryItemPageResources'], function(resources) {return {schemaUId:'20811eae-3f2c-4a3f-b2ce-77f5c009f61d',schemaCaption: "LocalMessageHistoryItemPage", parentSchemaName: "BaseMessageHistoryItemPage", schemaName:'LocalMessageHistoryItemPage',parentSchemaUId:'0ef50616-3207-40b1-a55e-03efde67d8d1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LocalMessageHistoryItemPage", ["css!LocalMessageHistoryItemStyle"],
	function() {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * Returns local message image.
				 * @private
				 * @return {String} Local message image.
				 */
				getLocalMessageImage: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.LocalMessageImage"));
				},

				/**
				 * Returns local message text.
				 * @private
				 * @return {String} Local message text.
				 */
				getLocalMessageText: function() {
					var formatedDate = this.getCreatedOn();
					var message = this.get("Message");
					return message + " " + formatedDate;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "HistoryMessageWrapContainer",
					"values": {
						"wrapClass": ["historyMessageWrap", "historyLocalMessageWrap"],
						"markerValue": "LocalHistoryMessageWrapContainer"
					}
				},
				{
					"operation": "merge",
					"name": "CreatedByImage",
					"values": {
						"getSrcMethod": "getLocalMessageImage"
					}
				},
				{
					"operation": "merge",
					"name": "MessageText",
					"parentName": "MessageBodyContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "MessageText",
								"markerValue": "MessageText",
								"className": "Terrasoft.MultilineLabel",
								"classes": {
									"multilineLabelClass": ["messageText"]
								},
								"caption": {
									"bindTo": "getLocalMessageText"
								},
								"showLinks": true
							};
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


