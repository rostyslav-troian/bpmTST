Terrasoft.configuration.Structures["EventConditionalTransitionPropertiesPage"] = {innerHierarchyStack: ["EventConditionalTransitionPropertiesPage"], structureParent: "CampaignConditionalSequenceFlowPropertiesPage"};
define('EventConditionalTransitionPropertiesPageStructure', ['EventConditionalTransitionPropertiesPageResources'], function(resources) {return {schemaUId:'fc7b27ef-88d9-4215-a2b6-f0c57d8e54b9',schemaCaption: "Event conditional transition properties page", parentSchemaName: "CampaignConditionalSequenceFlowPropertiesPage", schemaName:'EventConditionalTransitionPropertiesPage',parentSchemaUId:'c1d6650d-5a31-454c-9949-f6f3ab801b57',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * EventConditionalTransitionPropertiesPage edit page schema.
 * Parent: CampaignConditionalSequenceFlowPropertiesPage.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("EventConditionalTransitionPropertiesPage", ["BusinessRuleModule", "SelectableItemListMixin"],
		function(BusinessRuleModule) {
			return {
				messages: {},
				mixins: {
					SelectableItemListMixin: "Terrasoft.SelectableItemListMixin"
				},
				attributes: {

					/**
					 * Values of lookup for ResponseMode
					 */
					"ResponseModeEnum": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: {
							Default: {
								value: "0",
								captionName: "Resources.Strings.ResponseModeDefault"
							},
							WithCondition: {
								value: "1",
								captionName: "Resources.Strings.ResponseModeWithCondition"
							}
						}
					},

					/**
					 * Condition when response options exist
					 */
					"HasResponseCondition": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Collection of responses
					 */
					"ResponsesCollection": {
						"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Lookup for ResponseMode
					 */
					"ResponseMode": {
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"isRequired": true
					}
				},
				rules: {

					/**
					 * Rule for ResponseConditionDecision
					 */
					"ResponseConditionDecision": {
						"BindResponseConditionDecisionRequiredToReactionMode": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.REQUIRED,
							"conditions": [{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "ResponseMode"
								},
								"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": "1"
								}
							}]
						}
					}
				},
				methods: {

					/**
					 * @inheritdoc CampaignConditionalSequenceFlowPropertiesPage#subscribeEvents
					 * @overridden
					 */
					subscribeEvents: function() {
						this.callParent(arguments);
						this.on("change:ResponseMode", this._onResponseModeLookupChanged, this);
					},

					/**
					 * Handles change of the "ResponseMode" property.
					 * @private
					 * @return { void }
					 */
					_onResponseModeLookupChanged: function() {
						var responseModeEnum = this.get("ResponseModeEnum");
						var responseMode = this.get("ResponseMode");
						var decisionModeEnabled = (responseMode &&
							responseMode.value === responseModeEnum.WithCondition.value);
						if (!decisionModeEnabled) {
							this.set("ResponseConditionDecision", null);
						}
					},

					/**
					 * Loads values into user response mode combobox.
					 * @protected
					 * @param {Object} filter ComboboxEdit value.
					 * @param {Terrasoft.Collection} list List of comboboxEdit values.
					 */
					onPrepareResponseModeList: function(filter, list) {
						this.prepareList("ResponseModeEnum", list, this);
					},

					/**
					 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
					 * @overridden
					 */
					initParameters: function(element) {
						this.callParent(arguments);
						this._initResponseMode(element.hasResponseCondition);
						this._getEventResponses(this._initResponses.bind(this, element.eventResponseCollection));
					},

					/**
					 * Initializes value of the "ResponseMode" property.
					 * @private
					 * @param {String} value Initial value.
					 */
					_initResponseMode: function(value) {
						var isDefault = !value;
						this.setLookupValue(isDefault, "ResponseMode",
								"WithCondition", this);
					},

					/**
					 * Get collection of responses from the database.
					 * @param {function} callback Callback function
					 * @private
					 * @return {void}
					 */
					_getEventResponses: function(callback) {
						var schemaName = "EventResponse";
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: schemaName});
						esq.serverESQCacheParameters = {
							cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
							cacheGroup: this.name,
							cacheItemName: Ext.String.format("{0}", schemaName)
						};
						esq.addColumn("Id");
						esq.addColumn("Name");
						esq.getEntityCollection(callback, this);
					},

					/**
					 * Sets attributes for selected responses
					 * @param {string} responsesCollection json string with selected responses
					 * @param {Object} response query response for collection of event responses
					 * @private
					 * @return {void}
					 */
					_initResponses: function(responsesCollection, response) {
						var responses = responsesCollection ? JSON.parse(responsesCollection) : [];
						if (!Ext.isEmpty(response.collection)) {
							var items = response.collection.getItems()
								.map(function(item) {
									return {
										value: item.values.Id,
										name: item.values.Name
									};
								})
								.sort(function(a, b) {
									return b.name.length - a.name.length;
								});
							this.initItemsCollection("ResponsesCollection", items, responses, true);
						}
					},

					/**
					 * @inheritdoc BaseCampaignSchemaElementPage#saveValues
					 * @overridden
					 */
					saveValues: function() {
						this.callParent(arguments);
						var element = this.get("ProcessElement");
						var hasResponseCondition = this._getIsResponseModeWithConditions();
						element.hasResponseCondition = hasResponseCondition;
						element.eventResponseCollection = this._getResponsesCollection(hasResponseCondition);
					},

					/**
					 * Determines whether the value of the "ReactionMode" is not default value.
					 * @private
					 * @param {String} reactionMode Value of the ResponseMode lookup.
					 * @return {Boolean}
					 */
					_getIsResponseModeWithConditions: function() {
						return this.isLookupValueEqual("ResponseMode", "1", this);
					},

					/**
					 * Returns string representation of selected event responses
					 * @param { Boolean } hasResponseCondition visibility of responses' checkboxes
					 * @private
					 * @return {string} json of selected email response ids
					 */
					_getResponsesCollection: function(hasResponseCondition) {
						var responses = [];
						if (hasResponseCondition) {
							responses = this.getSelectedOptions("ResponsesCollection");
						}
						return JSON.stringify(responses);
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
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24
							},
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
						"name": "ResponseMode",
						"parentName": "ResponseContainer",
						"propertyName": "items",
						"values": {
							"contentType": this.Terrasoft.ContentType.ENUM,
							"controlConfig": {
								"prepareList": {
									"bindTo": "onPrepareResponseModeList"
								}
							},
							"isRequired": true,
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24
							},
							"labelConfig": {
								"visible": false
							},
							"wrapClass": ["no-caption-control"]
						}
					},
					{
						"operation": "insert",
						"name": "Responses",
						"parentName": "ResponseContainer",
						"propertyName": "items",
						"values": {
							"layout": {"column": 0, "row": 2, "colSpan": 24},
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"idProperty": "Id",
							"collection": "ResponsesCollection",
							"onGetItemConfig": "getMultiselectItemViewConfig",
							"classes": {
								"wrapClassName": ["responses-list"]
							},
							"visible": {
								"bindTo": "ResponseMode",
								"bindConfig": {
									converter: "_getIsResponseModeWithConditions"
								}
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


