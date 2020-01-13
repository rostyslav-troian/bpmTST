Terrasoft.configuration.Structures["AddCampaignParticipantPage"] = {innerHierarchyStack: ["AddCampaignParticipantPage"], structureParent: "CampaignBaseAudiencePropertiesPage"};
define('AddCampaignParticipantPageStructure', ['AddCampaignParticipantPageResources'], function(resources) {return {schemaUId:'5b1a8199-c6df-4ed4-a021-b6ee9aedac21',schemaCaption: "AddCampaignParticipantPage", parentSchemaName: "CampaignBaseAudiencePropertiesPage", schemaName:'AddCampaignParticipantPage',parentSchemaUId:'17fd5389-0014-4c8d-942a-b1b2315915f7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AddCampaignParticipantPage", ["BusinessRuleModule",], function(BusinessRuleModule) {
	Terrasoft.AddCampaignAudience = {
		DefaultRecurringFrequencyInDays: 30
	};
	return {
		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},
		messages: {
			"ReRenderElement": {
				"direction": this.Terrasoft.MessageDirectionType.PUBLISH,
				"mode": this.Terrasoft.MessageMode.PTP
			}
		},
		attributes: {
			/**
			 * Number of days before participant will be added next time.
			 */
			"DaysNumber": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": Terrasoft.AddCampaignAudience.DefaultRecurringFrequencyInDays
			},

			/**
			 * Flag to indicate that element can do recurring participants add.
			 */
			"IsRecurring": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		rules: {
			"DaysNumber": {
				"BindExactTimeRequiredToDateMacro": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "IsRecurring"
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": true
						}
					}]
				}
			}
		},
		methods: {

			// #region Methods: Private

			_isRecurringAllowed: function() {
				return Terrasoft.Features.getIsEnabled("RecurringCampaigns");
			},

			_getRecurringFrequencyInDays: function() {
				var validationInfo = this.validationInfo.get("DaysNumber") || { isValid: true };
				if (this.$IsRecurring && validationInfo.isValid) {
					return this.$DaysNumber;
				}
				return Terrasoft.AddCampaignAudience.DefaultRecurringFrequencyInDays;
			},

			/**
			 * Validates Folder column.
			 * If folder is not selected returns result with invalid validation message.
			 * @private
			 * @param {Object} folder Folder lookup object.
			 * @return {Object} Validation info.
			 */
			_folderValidator: function(folder) {
				var result = {
					invalidMessage: ""
				};
				if (Ext.isEmpty(folder)) {
					var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					result.invalidMessage = message;
				}
				return result;
			},

			_validateDaysNumber: function(value) {
				var result = {
					isValid: true,
					invalidMessage: ""
				};
				if (this.$IsRecurring && value < 1) {
					result.isValid = false;
					result.invalidMessage = this.get("Resources.Strings.NegativeNumberErrorText");
				}
				return result;
			},

			// #endregion

			// #region Methods: Public

			/**
			 * @inheritdoc CampaignBaseAudiencePropertiesPage#getContextHelpCode
			 * @overridden
			 */
			getContextHelpCode: function() {
				return "CampaignAddCampaignParticipantElement";
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
			 * @override
			 */
			initParameters: function(element) {
				this.callParent(arguments);
				this.$IsRecurring = element.isRecurring;
				if (element.isRecurring && element.recurringFrequencyInDays) {
					this.$DaysNumber = element.recurringFrequencyInDays;
				}
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
			 * @overridden
			 */
			saveValues: function() {
				this.callParent(arguments);
				var element = this.get("ProcessElement");
				element.isRecurring = this.$IsRecurring;
				element.recurringFrequencyInDays = this._getRecurringFrequencyInDays();
				element.initLargeImage();
				this.sandbox.publish("ReRenderElement", element);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Folder", this._folderValidator);
				this.addColumnValidator("DaysNumber", this._validateDaysNumber);
			}

			// #endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "RecurringAddContainer",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					},
					"visible": "$_isRecurringAllowed",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RecurringAddLayout",
				"propertyName": "items",
				"parentName": "RecurringAddContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "IsRecurringLabel",
				"parentName": "RecurringAddLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.IsRecurringLabel",
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsRecurring",
				"parentName": "RecurringAddLayout",
				"propertyName": "items",
				"values": {
					"wrapClass": ["t-checkbox-control"],
					"caption": "$Resources.Strings.IsRecurringCaption",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecurringAddLayout",
				"propertyName": "items",
				"name": "RecurringAddHint",
				"values": {
					"layout": {"column": 22, "row": 1, "colSpan": 1},
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.RecurringAddHint",
					"controlConfig": {
						"classes": {
							"wrapperClass": "t-checkbox-information-button"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "DaysNumberLabel",
				"parentName": "RecurringAddLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.DaysNumberCaption",
					"visible": "$IsRecurring",
					"classes": {
						"labelClass": ["label-small"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DaysNumber",
				"parentName": "RecurringAddLayout",
				"propertyName": "items",
				"values": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"visible": "$IsRecurring"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


