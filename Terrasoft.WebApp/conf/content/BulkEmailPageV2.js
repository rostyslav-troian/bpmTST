Terrasoft.configuration.Structures["BulkEmailPageV2"] = {innerHierarchyStack: ["BulkEmailPageV2"], structureParent: "BaseBulkEmailPageV2"};
define('BulkEmailPageV2Structure', ['BulkEmailPageV2Resources'], function(resources) {return {schemaUId:'b7c6aa93-529f-48c5-80e9-011de85a732d',schemaCaption: "Edit page schema - Bulk emails in the email section", parentSchemaName: "BaseBulkEmailPageV2", schemaName:'BulkEmailPageV2',parentSchemaUId:'8c2de852-9f1c-49c8-b6a8-67177791d6b7',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailPageV2", ["BusinessRuleModule", "MarketingEnums", "BulkEmailHelper", "MarketingCommonUtilities"],
		function(BusinessRuleModule, MarketingEnums, BulkEmailHelper, MarketingCommonUtilities) {
			return {
				entitySchemaName: "BulkEmail",
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				attributes: {
					"IsSystemEmailEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["IsSystemEmail"],
								methodName: "showDisclaimerSystemEmail"
							}
						]
					}
				},
				methods: {

					/**
					 * @inheritDoc BasePageV2#onEntityInitialized
					 * @overridden
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.processLaunchOptionColumn();
						this.on("change:LaunchOption", function() {
							this.processLaunchOptionColumn();
						}, this);
						this.checkIgnoreUnsubscribe();
						this.initShowHistoryAudience();
					},

					/**
					 * Sets the availability of SystemEmail checkbox.
					 * @protected
					 */
					checkIgnoreUnsubscribe: function() {
						Terrasoft.SysSettings.querySysSettings(["SystemEmailIgnoreUnsubscribeFromAllMailings"],
							function(settings) {
									var isIgnoreUnsubscribe = settings.SystemEmailIgnoreUnsubscribeFromAllMailings;
									this.set("IsSystemEmailEnabled", isIgnoreUnsubscribe);
								}, this);
					},

					/**
					 * Verification of enabling of system email.
					 * @protected
					 */
					showDisclaimerSystemEmail: function() {
						var isSysEmailValue = this.get("IsSystemEmail");
						if (isSysEmailValue === false) {
							return;
						}
						this.showConfirmationDialog(this.get("Resources.Strings.DisclaimerSystemEmail"),
							function(returnCode) {
								if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									return;
								}
								this.set("IsSystemEmail", false);
							},
							[ this.Terrasoft.MessageBoxButtons.YES,
								this.Terrasoft.MessageBoxButtons.NO]
						);
					},

					/**
					 * Initializes the attributes of the display details of audience.
					 * @protected
					 */
					initShowHistoryAudience: function() {
						var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "BulkEmailTarget"
						});
						select.addColumn("Id");
						select.filters.addItem(select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"BulkEmail", this.get("Id")));
						select.rowCount = 1;
						select.getEntityCollection(function(response) {
							if (response.success) {
								var showHitoryAudience = (response.collection.getCount() > 0);
								this.set("IsHistoryAudienceVisible", showHitoryAudience);
								this.set("IsOppAudienceVisible", !showHitoryAudience);
							}
						}, this);
					},

					/**
					 * Sets default settings.
					 * @overriden
					 */
					setDefaultEmailValues: function() {
						this.callParent(arguments);
						if (!this.isCopyMode()) {
							this.loadLookupDisplayValue("LaunchOption",
								MarketingEnums.BulkEmailLaunchOption.MASS_MAILING_MANUALY);
						}
					},

					/**
					 * Performs mailing start with the status checking.
					 * @overriden
					 */
					runMandrillMassMailing: function() {
						if (this.isNew) {
							this.runMailingAction();
							return;
						}
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: this.entitySchemaName
						});
						esq.addColumn("SegmentsStatus");
						esq.getEntity(this.get("Id"), function(result) {
							var entity = result.entity;
							if (!entity) {
								return;
							}
							var segmentsStatus = entity.get("SegmentsStatus").value;
							if (segmentsStatus === MarketingEnums.SegmentsStatus.UPDATING ||
									segmentsStatus === MarketingEnums.SegmentsStatus.REQUIERESUPDATING) {
								this.showInformationDialog(
										this.get("Resources.Strings.BulkEmailCantBeExecutedWhenSegmentsAreUpdating"));
							} else {
								this.runMailingAction();
							}
						}, this);
					},

					/**
					 * Performs mailing start.
					 * @protected
					 */
					runMailingAction: function() {
						var bulkEmailId = this.get("Id");
						if (this.isAssignedWithCampaign()) {
							if (this.isLaunchedCampaign()) {
								this.showInformationDialog(
									this.get("Resources.Strings.CannotStartMailingForLaunchedCampaign"));
							} else {
								this.showInformationDialog(
									this.get("Resources.Strings.CannotStartMailingForNotLaunchedCampaign"));
							}
							return;
						}
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
							this.set("ShowSaveButton", false);
							var startDate = this.get("StartDate");
							var status = this.get("Status");
							var email = {
								id: bulkEmailId,
								status: status.value,
								startDate: startDate
							};
							BulkEmailHelper.RunMailing(email, this);
							Terrasoft.Mask.hide(maskId);
						});
					},

					/**
					 * Performs mailing stop.
					 * @overriden
					 */
					breakMailingAction: function() {
						var bulkEmailId = this.get("Id");
						BulkEmailHelper.BreakMailing(bulkEmailId, this);
					},

					/**
					 * Processing changes of start of mailing options.
					 * @overriden
					 */
					processLaunchOptionColumn: function() {
						var launchOption = this.get("LaunchOption");
						if (!launchOption) {
							return;
						}
						var startDate = this.get("StartDate");
						var status = this.get("Status");
						if (launchOption.value ===
								MarketingEnums.BulkEmailLaunchOption.MASS_MAILING_MANUALY) {
							this.set("SendMailingActionCaption",
									this.get("Resources.Strings.RunMandrillMassMailingActionCaption"));
							this.set("IsSendScheduled", false);
							if (!Ext.isEmpty(startDate) && status.value !== MarketingEnums.BulkEmailStatus.COMPLETED) {
								this.set("StartDate", null);
							}
						} else {
							if (status.value !== MarketingEnums.BulkEmailStatus.START_SCHEDULED) {
								this.set("SendMailingActionCaption",
									this.get("Resources.Strings.RunScheduledMailingActionCaption"));
							}
							this.set("IsSendScheduled", true);
						}
					},

					/**
					 * @inheritDoc BaseBulkEmailPageV2#processStatusColumn
					 * @protected
					 * @overriden
					 */
					processStatusColumn: function() {
						this.callParent(arguments);
						var status = this.get("Status");
						if (status.value === MarketingEnums.BulkEmailStatus.START_SCHEDULED) {
							this.set("SendMailingActionCaption",
								this.get("Resources.Strings.RunMandrillMassMailingActionCaption"));
						}
						var isUseUtm = this.get("UseUtm");
						var isBreakEnabled = BulkEmailHelper.GetIsBreakable(status.value);
						var isRunEnabled = BulkEmailHelper.GetIsRunnable(status.value);
						var isTemplateEditable = BulkEmailHelper.IsEmailTemplateEditable(status.value,
							MarketingEnums.BulkEmailCategory.MASS_MAILING);
						var isAssignedWithCampaign = this.isAssignedWithCampaign();
						var config = {
							status: status.value,
							isConnectWithCampaign: isAssignedWithCampaign
						};
						var isAudienceEditable = BulkEmailHelper.GetIsAudienceEditable(config);
						var isActiveStatus = BulkEmailHelper.GetIsActiveStatus(status.value);
						this.set("IsUtmCheckBoxEnabled", isTemplateEditable);
						this.set("IsUtmEnabled", isUseUtm && isTemplateEditable);
						this.set("IsRunEnabled", isRunEnabled);
						this.set("IsRunDisplayed", isRunEnabled);
						this.set("IsTemplateEditable", isTemplateEditable);
						this.set("IsLaunchOptionEnabled", isRunEnabled && !isActiveStatus && !isAssignedWithCampaign);
						this.set("IsBreakEnabled", isBreakEnabled);
						this.set("IsAudienceEditable", isAudienceEditable);
						this.set("IsBlankSlatesAudienceVisible", false);
						this.set("IsAnalysisVisible", !isTemplateEditable);
					}
				},
				diff: /**SCHEMA_DIFF*/[{
					"operation": "insert",
					"name": "IsSystemEmail",
					"values": {
						"layout": {
							"colSpan": 12,
							"rowSpan": 1,
							"column": 12,
							"row": 0,
							"layoutName": "UtmSettingPageGridLayout"
						},
						"labelConfig": {},
						"enabled": {bindTo: "IsSystemEmailEnabled"},
						"visible": {bindTo: "IsSystemEmailEnabled"},
						"bindTo": "IsSystemEmail"
					},
					"parentName": "UtmSettingPageGridLayout",
					"propertyName": "items",
					"index": 7
				}
				], /**SCHEMA_DIFF*/
				rules: {
					"StartDate": {
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
									comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: MarketingEnums.BulkEmailStatus.COMPLETED
									}
								},
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "Status"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: MarketingEnums.BulkEmailStatus.STARTED
									}
								},
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "Status"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: MarketingEnums.BulkEmailStatus.STARTING
									}
								},
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "Status"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: MarketingEnums.BulkEmailStatus.BREAKING
									}
								},
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "LaunchOption"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: MarketingEnums.BulkEmailLaunchOption.MASS_MAILING_SCHEDULED
									}
								},
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "SplitTest"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.IS_NULL
								}
							]
						}
					}
				}
			};
		});


