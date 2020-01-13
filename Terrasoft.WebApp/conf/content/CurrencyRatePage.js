Terrasoft.configuration.Structures["CurrencyRatePage"] = {innerHierarchyStack: ["CurrencyRatePage"], structureParent: "BasePageV2"};
define('CurrencyRatePageStructure', ['CurrencyRatePageResources'], function(resources) {return {schemaUId:'8c254a25-534f-4574-b21d-6cf1d3f54861',schemaCaption: "CurrencyRatePage", parentSchemaName: "BasePageV2", schemaName:'CurrencyRatePage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CurrencyRatePage", ["BusinessRuleModule", "MoneyUtilsMixin"],
		function(BusinessRuleModule) {
			return {
				entitySchemaName: "CurrencyRate",
				attributes: {},
				mixins: {
					MoneyUtilsMixin: "Terrasoft.MoneyUtilsMixin"
				},
				messages: {
					"GetCurrencyDivision": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				rules: {
					"EndDate": {
						"BindParameterEnabledEndDate": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.ENABLED,
							"conditions": [{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								},
								"comparisonType": this.Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							}]
						}
					}
				},
				methods: {
					/**
					 * @inheritDoc Terrasoft.BaseViewModel#setDefaultValues
					 * @overridden
					 */
					setDefaultValues: function() {
						this.callParent(arguments);
						this.set("CreatedOn", undefined);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#saveEntityInChain
					 * @overriden
					 */
					saveEntityInChain: function(next) {
						this.Terrasoft.EntitySchemaQuery.clearCache("CurrencyRateListItem");
						this.callParent([next]);
					},

					/**
					 * @inheritDoc BaseSchemaViewModel#setValidationConfig
					 * @overridden
					 */
					setValidationConfig: function() {
						this.callParent(arguments);
						this.addColumnValidator("Rate", this.rateValidator);
					},

					/**
					 * Validates Rate field.
					 * @protected
					 * @virtual
					 * @return {Object} Validation error messages config.
					 */
					rateValidator: function() {
						var invalidMessage = "";
						var rate = this.get("Rate");
						if (rate < 0) {
							invalidMessage = this.get("Resources.Strings.InvalidRateValue");
						}
						return {
							fullInvalidMessage: invalidMessage,
							invalidMessage: invalidMessage
						};
					},

					/**
					 * @inheritDoc Terrasoft.BaseViewModel#getSaveQuery
					 * @overridden
					 */
					getSaveQuery: function() {
						var query = this.callParent(arguments);
						var division = this.sandbox.publish("GetCurrencyDivision", null);
						var rateValue = this.changedValues.Rate;
						query = this.formCurrencyRateSaveQuery({
							query: query,
							division: division,
							rate: rateValue
						});
						return query;
					}
				},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		});


