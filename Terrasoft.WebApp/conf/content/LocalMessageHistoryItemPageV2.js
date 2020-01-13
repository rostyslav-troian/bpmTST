Terrasoft.configuration.Structures["LocalMessageHistoryItemPageV2"] = {innerHierarchyStack: ["LocalMessageHistoryItemPageV2"], structureParent: "LocalMessageHistoryItemPage"};
define('LocalMessageHistoryItemPageV2Structure', ['LocalMessageHistoryItemPageV2Resources'], function(resources) {return {schemaUId:'fff3be0b-c452-491a-a76c-5b8b25a10706',schemaCaption: "LocalMessageHistoryItemPageV2", parentSchemaName: "LocalMessageHistoryItemPage", schemaName:'LocalMessageHistoryItemPageV2',parentSchemaUId:'20811eae-3f2c-4a3f-b2ce-77f5c009f61d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LocalMessageHistoryItemPageV2", ["css!LocalMessageHistoryItemStyleV2"],
	function() {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseMessageHistoryPage#getChannelIcon
				 * @override
				 */
				getChannelIcon: function () {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.LocalChannelIcon"));
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HistoryV1Container"
				},
				{
					"operation": "remove",
					"name": "HistoryV2MessageHeaderContainer"
				},
				{
					"operation": "move",
					"name": "ChannelIcon",
					"parentName": "HistoryV2MessageContentContainer",
					"propertyName": "items"
				},
				{
					"operation": "merge",
					"name": "ChannelIcon",
					"parentName": "HistoryV2MessageContentContainer",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClass": ["localMessage-channelIcon"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "HistoryV2MessageContentContainer",
					"parentName": "HistoryV2Container",
					"propertyName": "items",
					"values": {
						"wrapClass": ["localMessage-message-content-container"]
					}
				},
				{
					"operation": "move",
					"name": "MessageText",
					"parentName": "HistoryV2MessageContentContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"id": "MessageText",
								"markerValue": "MessageText",
								"className": "Terrasoft.MultilineLabel",
								"classes": {
									"multilineLabelClass": ["localMessage-text"]
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


