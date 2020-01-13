Terrasoft.configuration.Structures["TriggerEmailPageV2"] = {innerHierarchyStack: ["TriggerEmailPageV2"], structureParent: "BaseBulkEmailPageV2"};
define('TriggerEmailPageV2Structure', ['TriggerEmailPageV2Resources'], function(resources) {return {schemaUId:'81fc7d0c-9410-4ded-8156-4ca929fe49a8',schemaCaption: "Edit page schema - Trigger bulk emails in the email section", parentSchemaName: "BaseBulkEmailPageV2", schemaName:'TriggerEmailPageV2',parentSchemaUId:'8c2de852-9f1c-49c8-b6a8-67177791d6b7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TriggerEmailPageV2", ["TriggerEmailPageV2Resources", "MarketingEnums", "BulkEmailHelper", "BusinessRuleModule",
		"MarketingCommonUtilities", "css!InfoButtonStyles", "css!InfoButtonCSS"],
	function(resources, MarketingEnums, BulkEmailHelper, BusinessRuleModule, MarketingCommonUtilities) {
		return {
			entitySchemaName: "BulkEmail",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				"IsActiveTriggerEmail": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					dependencies: [
						{
							columns: ["Status"],
							methodName: "processStatusColumn"
						}
					]
				},
				"CampaignStatus": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					columnPath: "Campaign.CampaignStatus",
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},
				"CampaignType": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					columnPath: "Campaign.Type.Id",
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				"OldDesignerTypeId": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.STRING,
					value: "389eb587-52d4-4ab6-b4ad-e7e2f0d62eac"
				},
				"SendDueDateCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["LaunchOption"],
							methodName: "processLaunchOptionColumn"
						}
					]
				},
				"SendStartDateCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [
						{
							columns: ["LaunchOption"],
							methodName: "processLaunchOptionColumn"
						}
					]
				},
				"IsHeaderCampaignGridLayoutVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				}
			},
			methods: {
				/**
				 * Gets the date and time of sending the following letter.
				 * @private
				 * @return {Object} Date and time next sending letter.
				 */
				getNextTriggerDateTime: function() {
					var startDate = this.get("StartDate");
					if (!startDate) {
						return startDate;
					}
					var date = Ext.Date.clearTime(startDate, new Date());
					var millisecondsCount = Ext.Date.getElapsed(date, startDate);
					var nowDate = Ext.Date.clearTime(new Date());
					var nextTriggerDateTime = Ext.Date.add(nowDate, Ext.Date.MILLI, millisecondsCount);
					if (nextTriggerDateTime < new Date()) {
						nextTriggerDateTime = Ext.Date.add(nextTriggerDateTime, Ext.Date.DAY, 1);
					}
					return nextTriggerDateTime;
				},

				/**
				 * Gets the date and time, rounded to the specified number of minutes.
				 * @param {Object} dateTime Object Date/Time.
				 * @param {Number} minuteInterval Multiplicity of rounding in minutes.
				 * @private
				 * @return {Object} Date and time rounded.
				 */
				getRoundDateTime: function(dateTime, minuteInterval) {
					if (!dateTime) {
						dateTime = new Date();
					}
					var roundMinuteCount = Math.round(dateTime.getMinutes() / minuteInterval + 0.5) * minuteInterval;
					var minutCount = roundMinuteCount - dateTime.getMinutes();
					return Ext.Date.add(dateTime, Ext.Date.MINUTE, minutCount);
				},

				/**
				 * Method handler pressing context-sensitive help for the field time (StartDate).
				 * @private
				 */
				showInfoToolTip: function() {
					var status = this.get("Status");
					var isActive = BulkEmailHelper.GetIsActiveStatus.call(this, status.value);
					var launchOption = this.get("LaunchOption").value;
					var message = "";
					if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) {
						message = this.getScheduledTriggerEmailToolTipMessage(isActive);
					} else if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE) {
						message = this.getImmediateTriggerEmailToolTipMessage(isActive);
					} else if (launchOption === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY) {
						message = this.getHourlyTriggerEmailToolTipMessage(isActive);
					}
					this.showInformationDialog(message);
				},

				/**
				 * Gets the help text for the scheduled trigger emails.
				 * @param {Boolean} isActive Attribute an active trigger.
				 * @returns {String} Message text.
				 */
				getScheduledTriggerEmailToolTipMessage: function(isActive) {
					var message;
					var dateFormat = "d.m.Y H:i";
					var nextTriggerDateTime = this.getNextTriggerDateTime();
					if (nextTriggerDateTime) {
						var nextDate = Ext.Date.format(nextTriggerDateTime, dateFormat);
						message = (isActive)
							? this.get("Resources.Strings.StartDateForActiveEmailTooltip")
							: this.get("Resources.Strings.StartDateForDeactivateEmailTooltip");
						message = Ext.String.format(message, nextDate);
					} else {
						message = (isActive)
							? this.get("Resources.Strings.StartDateTooltipWithUnknownDateActivate")
							: this.get("Resources.Strings.StartDateTooltipWithUnknownDateDeactivate");
					}
					return message;
				},

				/**
				 * Gets the help text for instant trigger emails.
				 * @param {Boolean} isActive Attribute an active trigger.
				 * @returns {String} Message text.
				 */
				getImmediateTriggerEmailToolTipMessage: function(isActive) {
					return (isActive)
						? this.get("Resources.Strings.ImmediateStartDateForActiveEmailTooltip")
						: this.get("Resources.Strings.ImmediateStartDateForDeactivateEmailTooltip");
				},

				/**
				 * Gets the help text for the trigger letter with the launch of the company.
				 * @param {Boolean} isActive Attribute an active trigger.
				 * @returns {String} Message text.
				 */
				getHourlyTriggerEmailToolTipMessage: function(isActive) {
					return (isActive)
						? this.get("Resources.Strings.ImmediateStartDateForActivateEmailFromCampaignTooltip")
						: this.get("Resources.Strings.ImmediateStartDateForDeactivateEmailFromCampaignTooltip");
				},

				/**
				 * Executing bulk email.
				 * @inheritDoc BaseBulkEmailPageV2#runMandrillMassMailing
				 * @overridden
				 */
				runMandrillMassMailing: function() {
					this.runActionAfterSave(function() {
						if (this.get("IsPublicDemoBuild")) {
							MarketingCommonUtilities.ShowConfirmationDialogWithGoButton(
								this.get("Resources.Strings.DemoDataMessage"),
								this.get("TrialUrl"),
								this.get("Resources.Strings.TryTrialButtonCaption"),
								this
							);
							return;
						}
						var maskId = Terrasoft.Mask.show();
						Terrasoft.chain(
							function(next) {
								if (this.isAssignedWithCampaign() && this.isLaunchedCampaign()) {
									next();
								} else {
									Terrasoft.Mask.hide(maskId);
									this.showInformationDialog(this.get("Resources.Strings.CannotStartMailingForNotLaunchedCampaign"));
								}
							},
							function(next) {
								BulkEmailHelper.ValidateBulkEmail.call(this, this.get("Id"), next, function() {
									Terrasoft.Mask.hide(maskId);
								});
							},
							function(next) {
								this.setBulkEmailStatus(MarketingEnums.BulkEmailStatus.ACTIVE, function() {
									next();
								}, this);
							},
							function() {
								BulkEmailHelper.ReloadCard.call(this, this.get("Id"));
								Terrasoft.Mask.hide(maskId);
								this.showLaunchMessage();
							},
							this);
					});
				},

				/**
				 * Gets message about start of trigger email.
				 * @private
				 * @returns {String}  Message about start of trigger email.
				 */
				getLaunchMessage: function() {
					var message;
					var launchOption = this.get("LaunchOption");
					switch (launchOption.value) {
						case MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED:
							message = this.get("Resources.Strings.TriggeredEmailScheduledCaption");
							var datePattern = "H:i d.m.Y";
							var startDate = this.get("StartDate");
							var displayedStartDate = Ext.Date.format(startDate, datePattern);
							message = Ext.String.format(
								this.get("Resources.Strings.TriggeredEmailScheduledCaption"),
								displayedStartDate);
							break;
						default:
							message = this.get("Resources.Strings.TriggeredEmailLaunchedCaption");
							break;
					}
					return message;
				},

				/**
				 * Shows message about the successful inclusion of the trigger message.
				 * @private
				 */
				showLaunchMessage: function() {
					var message = this.getLaunchMessage();
					this.showInformationDialog(message);
				},

				/**
				 * @inheritDoc BaseBulkEmailPageV2#breakMailingAction
				 * @overridden
				 */
				breakMailingAction: function() {
					var maskId = Terrasoft.Mask.show();
					Terrasoft.chain(
						function(next) {
							this.setBulkEmailStatus(MarketingEnums.BulkEmailStatus.STOPPED, function() {
								next();
							}, this);
						},
						function() {
							BulkEmailHelper.ReloadCard.call(this, this.get("Id"));
							Terrasoft.Mask.hide(maskId);
							this.showInformationDialog(this.get("Resources.Strings.TriggeredEmailStoppedCaption"));
						},
						this);
				},

				/**
				 * Set status bulk email.
				 * @protected
				 * @param {Object} status Status bulk email.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope v.
				 */
				setBulkEmailStatus: function(status, callback, scope) {
					var update = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "BulkEmail"
					});
					var filters = update.filters;
					var idFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Id", this.get("Id"));
					filters.add("IdFilter", idFilter);
					update.setParameterValue("Status", status, Terrasoft.DataValueType.GUID);
					update.execute(callback, scope);
				},

				/**
				 * @inheritDoc BaseBulkEmailPageV2#processStatusColumn
				 * @overriden
				 */
				processStatusColumn: function() {
					this.callParent(arguments);
					var status = this.get("Status");
					var isUseUtm = this.get("UseUtm");
					var isBlankSlatesAudienceVisible = (status.value === MarketingEnums.BulkEmailStatus.PLANNED);
					var isActiveEnabled = !BulkEmailHelper.GetIsActiveStatus(status.value);
					var isOilCampaignRelated = this.get("CampaignType") === this.get("OldDesignerTypeId");
					var isTemplateEditable = BulkEmailHelper.IsEmailTemplateEditable(status.value,
						MarketingEnums.BulkEmailCategory.TRIGGERED_EMAIL);
					this.set("IsUtmCheckBoxEnabled", isTemplateEditable);
					this.set("IsUtmEnabled", isUseUtm && isTemplateEditable);
					this.set("IsRunEnabled", isActiveEnabled);
					this.set("IsTemplateEditable", isTemplateEditable);
					this.set("IsAudienceEditable", false);
					this.set("IsBlankSlatesAudienceVisible", isBlankSlatesAudienceVisible);
					this.set("IsHistoryAudienceVisible", false);
					this.set("IsOppAudienceVisible", !isBlankSlatesAudienceVisible);
					this.set("IsRunDisplayed", isOilCampaignRelated && isActiveEnabled);
					this.set("IsBreakEnabled", isOilCampaignRelated && !isActiveEnabled);
					this.set("IsAnalysisVisible", !isTemplateEditable);
				},

				/**
				 * @inheritDoc BasePageV2#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.processLaunchOptionColumn();
					this.set("SendMailingActionCaption",
						this.get("Resources.Strings.RunMandrillMassMailingActionCaption"));
					this.on("change:LaunchOption", function() {
						this.processLaunchOptionColumn();
					}, this);
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc BaseBulkEmailPageV2#setDefaultEmailValues
				 * @overriden
				 */
				setDefaultEmailValues: function() {
					this.callParent(arguments);
					this.loadLookupDisplayValue("LaunchOption",
						MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED);
					var offsetSheduleTime = 15;
					var roundDateTime = this.getRoundDateTime(new Date(), offsetSheduleTime);
					var nextTriggerDateTime = this.getNextTriggerDateTime() || roundDateTime;
					this.set("StartDate", nextTriggerDateTime);
				},

				/**
				 * Handler of email laucnh option test.
				 * @private
				 */
				processLaunchOptionColumn: function() {
					var launchOption = this.get("LaunchOption");
					if (!launchOption) {
						return;
					}
					var startDate = this.get("StartDate");
					var value;
					if (launchOption &&
						(launchOption.value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_IMMEDIATE ||
							launchOption.value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_HOURLY)) {
						value = false;
						this.set("SendDueDateCaption", this.get("Resources.Strings.ImmediateSendDueDateCaption"));
						if (!Ext.isEmpty(startDate)) {
							this.set("StartDate", null);
						}
					} else {
						value = true;
						this.set("SendDueDateCaption", this.get("Resources.Strings.ScheduledDueDateCaption"));
						this.set("SendStartDateCaption", this.get("Resources.Strings.ScheduledSendStartDateCaption"));
					}
					if (this.get("IsSendScheduled") !== value) {
						this.set("IsSendScheduled", value);
					}
				},

				/**
				 * Saves card.
				 * @overridden
				 */
				save: function() {
					var launchOption = this.get("LaunchOption");
					if (launchOption && launchOption.value ===
							MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) {
						var nextTriggerDateTime = this.getNextTriggerDateTime();
						if (nextTriggerDateTime) {
							this.set("StartDate", nextTriggerDateTime);
						}
					}
					this.callParent(arguments);
				},

				/**
				 * Checks wether email is planned.
				 * @param {Boolean} value
				 * @returns {Boolean}
				 */
				isSendNotScheduled: function(value) {
					return (value !== true);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "StartDate"
				},
				{
					"operation": "remove",
					"name": "LaunchOption"
				},
				{
					"operation": "merge",
					"name": "SendDueDate",
					"values": {
						"caption": {
							"bindTo": "SendDueDateCaption"
						}
					},
					"parentName": "CommonSettingsGridLayout",
					"propertyName": "items"
				},
				{
					"operation": "merge",
					"name": "SendStartDate",
					"values": {
						"caption": {
							"bindTo": "SendStartDateCaption"
						}
					},
					"parentName": "CommonSettingsGridLayout",
					"propertyName": "items"
				},
				{
					"operation": "remove",
					"name": "SendProcessDiagramContainer"
				}
			], /**SCHEMA_DIFF*/
			rules: {
				"DurationBulkEmail": {
					DurationBulkEmailVisible: {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.VISIBLE,
						logical: Terrasoft.LogicalOperatorType.AND,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "IsSendScheduled"
								},
								comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: false
								}
							}
						]
					}
				},
				"SendStartDate": {
					SendStartDateVisible: {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.VISIBLE,
						logical: Terrasoft.LogicalOperatorType.AND,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "IsSendScheduled"
								},
								comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: false
								}
							}
						]
					}
				},
				"LaunchOption": {
					StartDateEnabled: {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						logical: Terrasoft.LogicalOperatorType.AND,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "Status"
								},
								comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: MarketingEnums.BulkEmailStatus.PLANNED
								}
							}
						]
					}
				}
			}
		};
	});


