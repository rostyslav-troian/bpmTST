Terrasoft.configuration.Structures["LandingConditionalTransitionPropertiesPage"] = {innerHierarchyStack: ["LandingConditionalTransitionPropertiesPage"], structureParent: "CampaignConditionalSequenceFlowPropertiesPage"};
define('LandingConditionalTransitionPropertiesPageStructure', ['LandingConditionalTransitionPropertiesPageResources'], function(resources) {return {schemaUId:'ec16a4f0-a594-4497-a444-49cff8978d76',schemaCaption: "Landing conditional transition properties page", parentSchemaName: "CampaignConditionalSequenceFlowPropertiesPage", schemaName:'LandingConditionalTransitionPropertiesPage',parentSchemaUId:'c1d6650d-5a31-454c-9949-f6f3ab801b57',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * LandingConditionalTransitionPropertiesPage edit page schema.
 * Parent: CampaignConditionalSequenceFlowPropertiesPage.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("LandingConditionalTransitionPropertiesPage", ["LandingConditionalTransitionPropertiesPageResources",
		"CampaignEnums", "SelectableItemListMixin"],
	function(resources, CampaignEnums) {
		return {
			messages: {},
			mixins: {
				SelectableItemListMixin: "Terrasoft.SelectableItemListMixin"
			},
			attributes: {

				/**
				 * Values of responses
				 */
				"ResponsesCollection": {
					"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Values of StepCompletedCondition enum for responses collection
				 */
				"ResponsesEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Submitted: {
							value: CampaignEnums.StepCompletedConditions.COMPLETED,
							name: resources.localizableStrings.SubmittedResponseCaption
						},
						NotSubmitted: {
							value: CampaignEnums.StepCompletedConditions.NOT_COMPLETED,
							name: resources.localizableStrings.NotSubmittedResponseCaption
						},
						Any: {
							value: CampaignEnums.StepCompletedConditions.ANY,
							name: resources.localizableStrings.AnyResponseCaption
						}
					}
				}
			},
			methods: {

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
				 * @overridden
				 */
				initParameters: function(element) {
					this.callParent(arguments);
					this._initResponses(element.stepCompletedCondition);
				},

				/**
				 * Initializes value of the "ResponsesCollection" property.
				 * @private
				 * @param {String} value Initial value.
				 */
				_initResponses: function(value) {
					var responses = this.get("ResponsesEnum");
					var responsesArr = Object.keys(responses)
						.map(function(key) {
							return responses[key];
						});
					this.initItemsCollection("ResponsesCollection", responsesArr, value, false);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#saveValues
				 * @overridden
				 */
				saveValues: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					var selectedResponse = this.getSelectedOptions("ResponsesCollection");
					element.stepCompletedCondition = selectedResponse.length ?
							selectedResponse[0] : this.get("ResponsesEnum").Submitted.value;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ResponseContainer",
					"propertyName": "items",
					"parentName": "ContentContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ResponseModeLabel",
					"parentName": "ResponseContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getResponseQuestionCaption"
						},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "Responses",
					"parentName": "ResponseContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "ResponsesCollection",
						"onGetItemConfig": "getItemViewConfig",
						"classes": {
							"wrapClassName": ["responses-list"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


