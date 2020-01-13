Terrasoft.configuration.Structures["SocialMessageHistoryItemPage"] = {innerHierarchyStack: ["SocialMessageHistoryItemPage"], structureParent: "BaseMessageHistoryItemPage"};
define('SocialMessageHistoryItemPageStructure', ['SocialMessageHistoryItemPageResources'], function(resources) {return {schemaUId:'28ade5ba-21a6-42b2-a77c-d0d10b4b199c',schemaCaption: "SocialMessageHistoryItemPage", parentSchemaName: "BaseMessageHistoryItemPage", schemaName:'SocialMessageHistoryItemPage',parentSchemaUId:'0ef50616-3207-40b1-a55e-03efde67d8d1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SocialMessageHistoryItemPage", ["SocialMessageConstants", "css!SocialMessageHistoryItemStyle"],
	function(socialMessageConstants) {
		return {
			entitySchemaName: "BaseMessageHistory",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseMessageHistoryPage#historyMessageEsqApply
				 * @overridden
				 */
				historyMessageEsqApply: function(esq) {
					var filterGroup = esq.createFilterGroup();
					filterGroup.name = "SocialNotifierFilter";
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filterGroup.add("SocialMessageExists", esq.createExistsFilter("[SocialMessage:Id:RecordId].Id"));
					filterGroup.add("NotSocialNotifier", esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier",
						socialMessageConstants.MessageNotifier.Social));
					esq.filters.addItem(filterGroup);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "HistoryMessageWrapContainer",
					"values": {
						"wrapClass": ["historyMessageWrap", "historySocialMessageWrap"],
						"markerValue": "SocialHistoryMessageWrapContainer"
					}
				},
				{
					"operation": "merge",
					"name": "MessageContentContainer",
					"values": {
						"wrapClass": ["messageContent", "speech-bubble"]
					}
				},
				{
					"operation": "insert",
					"name": "CreatedByLink",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.HYPERLINK,
						"classes": {
							"hyperlinkClass": ["link", "createdByLink", "label-url", "label-link"]
						},
						"caption": {
							"bindTo": "getCreatedByName"
						},
						"href": {
							"bindTo": "getCreatedByUrl"
						},
						"markerValue": "CreatedByLink",
						"target": this.Terrasoft.controls.HyperlinkEnums.target.SELF
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "CreationInfo",
					"parentName": "MessageHeaderContainer",
					"propertyName": "items",
					"values": {
						"id": "CreationInfo",
						"labelClass": ["creationInfoLabel"],
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getCreationInfo"
						}
					},
					"index": 2
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


