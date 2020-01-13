Terrasoft.configuration.Structures["BaseBulkEmailPageV2"] = {innerHierarchyStack: ["BaseBulkEmailPageV2"], structureParent: "BaseModulePageV2"};
define('BaseBulkEmailPageV2Structure', ['BaseBulkEmailPageV2Resources'], function(resources) {return {schemaUId:'8c2de852-9f1c-49c8-b6a8-67177791d6b7',schemaCaption: "Base edit schema - Email section page", parentSchemaName: "BaseModulePageV2", schemaName:'BaseBulkEmailPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseBulkEmailPageV2", ["BaseBulkEmailPageV2Resources", "ConfigurationEnums", "BusinessRuleModule",
			"MarketingEnums", "CampaignEnums", "BulkEmailHelper", "EmailHelperModule", "LookupUtilities",
			"AcademyUtilities", "BulkEmailContentBuilderEnumsModule", "BaseFiltersGenerateModule",
			"BulkEmailTemplateHelper", "InformationButtonResources", "BulkEmailHyperlinkCorrector",
			"MacroUtils", "MacrosModule", "MacrosUtilities", "BpmonlineCloudServiceApi",
			"MultilineLabel", "BulkEmailAnalytics", "EntityHelper", "DCTemplateReplicaRepository",
			"css!BaseBulkEmailPageV2Styles", "css!DetailModuleV2", "BulkEmailTemplateEntriesMixin",
			"BulkEmailTemplateValidator", "ContentExporterFactory"],
		/*jshint maxparams: 16 */
		function(resources, Enums, BusinessRuleModule, MarketingEnums, CampaignEnums, BulkEmailHelper,
				EmailHelperModule, LookupUtilities, AcademyUtilities, BulkEmailContentBuilderEnumsModule,
				BaseFiltersGenerateModule, BulkEmailTemplateHelper, informationButtonResources,
				BulkEmailHyperlinkCorrector, MacroUtils) {
			return {
				entitySchemaName: "BulkEmail",
				mixins: {
					Analytics: "Terrasoft.BulkEmailAnalytics",
					EntityHelper: "Terrasoft.EntityHelper",
					MacrosUtilities: "Terrasoft.MacrosUtilities",
					BulkEmailTemplateEntriesMixin: "Terrasoft.BulkEmailTemplateEntriesMixin"
				},
				modules: /**SCHEMA_MODULES*/{
					"DCClickHeatmap": {
						"config": {
							"schemaName": "DCClickHeatmapSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false
						}
					},
					"DCTemplateViewer": {
						"config": {
							"schemaName": "DCTemplateViewerSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false
						}
					}
				}/**SCHEMA_MODULES*/,
				details: /**SCHEMA_DETAILS*/{
					VwMandrillRecipient: {
						schemaName: "VwMandrillRecipientDetailV2",
						entitySchemaName: "VwMandrillRecipient",
						filter: {
							masterColumn: "Id",
							detailColumn: "BulkEmail"
						},
						defaultValues: {
							BulkEmail: {
								masterColumn: "Id"
							}
						}
					},
					BulkEmailTarget: {
						schemaName: "BulkEmailTargetDetailV2",
						entitySchemaName: "BulkEmailTarget",
						filter: {
							masterColumn: "Id",
							detailColumn: "BulkEmail"
						},
						defaultValues: {
							BulkEmail: {
								masterColumn: "Id"
							}
						}
					},
					Files: {
						schemaName: "FileDetailV2",
						entitySchemaName: "BulkEmailFile",
						filter: {
							masterColumn: "Id",
							detailColumn: "BulkEmail"
						}
					},
					BulkEmailHyperlink: {
						schemaName: "BulkEmailHyperlinkDetailV2",
						entitySchemaName: "BulkEmailHyperlink",
						filter: {
							masterColumn: "Id",
							detailColumn: "BulkEmail"
						}
					}
				}/**SCHEMA_DETAILS*/,
				attributes: {
					"TemplateSubjectInsertBuffer": {
						dataValueType: Terrasoft.DataValueType.TEXT
					},
					"MacrosInsertEventSource": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: null
					},
					"SubjectSelectedMacros": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},
					"IsUtmCheckBoxEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["UseUtm"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsUtmEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["UseUtm"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsRunEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsLaunchOptionEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},
					"IsBreakEnabled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsAudienceEditable": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsAnalysisVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsHistoryAudienceVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsOppAudienceVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"IsBlankSlatesAudienceVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "processStatusColumn"
							}
						]
					},
					"Status": {
						dependencies: [
							{
								columns: ["StartDate"],
								methodName: "processStartDateColumn"
							}
						]
					},
					"IsTemplateDataCollapsed": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					"IsBulkEmailTypeEnabled": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: true
					},
					"IsSendScheduled": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["LaunchOption"],
								methodName: "processLaunchOptionColumn"
							}
						]
					},
					"SendMailingActionCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						dependencies: [
							{
								columns: ["LaunchOption"],
								methodName: "processLaunchOptionColumn"
							}
						]
					},
					"EditTemplateActionCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						dependencies: [
							{
								columns: ["LaunchOption"],
								methodName: "processLaunchOptionColumn"
							}
						]
					},
					"SendTestEmailActionCaption": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						dependencies: [
							{
								columns: ["LaunchOption"],
								methodName: "processLaunchOptionColumn"
							}
						]
					},
					"LaunchOption": {
						lookupListConfig: {
							filter: function() {
								return Terrasoft.createColumnInFilterWithParameters("Category", [
									this.get("Category").value
								]);
							}
						},
						"isRequired": true
					},
					"CampaignStatus": {
						type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						columnPath: "Campaign.CampaignStatus",
						dataValueType: Terrasoft.DataValueType.LOOKUP
					},
					/**
					 * Url #######.
					 */
					"HelpUrl": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Responsible.
					 */
					"Owner": {
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter},
						isRequired: true
					},
					/**
					 * Indicates that this build is public demo version.
					 */
					"IsPublicDemoBuild": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * Trial version registration url.
					 */
					"TrialUrl": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: ""
					},
					/**
					 * Determines that value of the SenderEmail field are valid.
					 */
					"IsSenderEmailValid": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: true
					},
					/**
					 * Determines that SenderEmailInfoButton message are visible.
					 */
					"IsSenderEmailInfoMessageVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * Image config for the SenderEmailInfoButton.
					 */
					"SenderEmailInfoButtonImageConfig": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						value: null
					},
					/**
					 * Content of the SenderEmailInfoButton.
					 */
					"SenderEmailInfoButtonContent": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT
					},
					/**
					 * Style of the SenderEmailInfoButton.
					 */
					"SenderEmailInfoButtonStyle": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: Terrasoft.TipStyle.GREEN
					},
					/**
					 * Repository for loading and storing email template replicas.
					 */
					"ReplicaRepository": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						value: null
					},
					/**
					 * Determines that DCTemplateViewer is visible.
					 */
					"isDCTemplateViewerVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * State of dynamic content functionality.
					 */
					"DynamicContentEnabled": {
						"dataValueType": Terrasoft.core.enums.DataValueType.BOOLEAN,
						"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},

					/**
					 * Indicates MarketingContentBuilderWizard feature state.
					 */
					"IsMarketingContentBuilderWizardEnabled": {
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					/**
					 * Indicates FromEmailFromNameMacros feature state.
					 */
					"IsFromEmailFromNameMacroFeatureEnabled": {
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * Indicates SendTestEmail visibility state.
					 */
					"IsSendTestEmailVisible": {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						dependencies: [
							{
								columns: ["Status"],
								methodName: "_setSendTestEmailVisible"
							}
						]
					},

					/**
					 * Current content exporter factory.
					 */
					"ContentExporterFactory": {
						dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						value: Ext.create("Terrasoft.ContentExporterFactory")
					}
				},
				messages: {
					/**
					 * @message MacroSelected.
					 * Transfers selected macros.
					 */
					"MacroSelected": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetBulkEmail
					 * Gets current bulk email.
					 * @return (Object) bulk email.
					 */
					"GetBulkEmail": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetIndicatorConfig
					 * Transfers current user configuration to indicator`s module.
					 */
					"GetIndicatorConfig": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GenerateIndicator
					 * ########## ######### # ########### ########## ####### ###########
					 */
					"GenerateIndicator": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetIsRunnable
					 * ######## ######### ######## ## ######### ########.
					 * @return (Boolean) ########## true, #### ######## ######### ########, ##### false.
					 */
					"GetIsRunnable": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetIsAudienceEditable
					 * ######## ######### ######## ## ############# #########.
					 * @return (Boolean) ########## true, #### ######## #############, ##### false.
					 */
					"GetIsAudienceEditable": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message RunMailing
					 * ############## ###### ########.
					 */
					"RunMailing": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message breakMailing
					 * ########## ######### ########.
					 */
					"BreakMailing": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetClicksMapConfig
					 * ############## ######### ###### ##### ######.
					 */
					"GetClicksMapConfig": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GridCountItemsChanged
					 * ######## # ######## ### ######## ####### ## ###### BulkEmailTarget.
					 */
					"VwMandrillRecipientDetailChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetEmailCategory
					 * ########## ######### Email.
					 */
					"GetEmailCategory": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetEmailStatus
					 * ########## ###### Email.
					 */
					"GetEmailStatus": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetEmailCreatedOn
					 * ########## #### ######## Email.
					 */
					"GetEmailCreatedOn": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetReplicaRepository
					 * Returns the instance of replica repository.
					 */
					"GetReplicaRepository": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message ChooseTemplateFromLookup
					 * Opens lookup window to select template.
					 */
					"ChooseTemplateFromLookup": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message EditTemplate
					 * Opens content builder to edit template.
					 */
					"EditTemplate": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message BulkEmailTemplateSaved
					 * Notify about bulk email template saved.
					 */
					"BulkEmailTemplateSaved": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message SendTestEmail
					 * Opens modal view for sending test message.
					 */
					"SendTestEmail": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {

					// region: Methods: Private

					/**
					 * Set selected macro to page attribute.
					 * @private
					 * @param {Object} scope scope.
					 * @param {Object} macro selected macro.
					 */
					_setSeletedMacroToAtribute: function(config, macro) {
						var macroValue = this.formatMacrosColumn(macro.leftExpressionColumnPath);
						this.set(config.attributeName, null);
						this.set(config.attributeName, macroValue);
					},

					/**
					 * Subject macro button click handler.
					 * @private
					 */
					_onTemplateSubjectSelectMacroButtonClick: function() {
						var config = {
							attributeName: "TemplateSubjectInsertBuffer"
						};
						this.openMacrosColumnsPageWithCustomConfig(this, this._setSeletedMacroToAtribute, config);
					},

					/**
					 * Sender name macro button click handler.
					 * @private
					 */
					_onTemplateSenderNameSelectMacroButtonClick: function() {
						var config = {
							attributeName: "SenderName"
						};
						this.openMacrosColumnsPageWithCustomConfig(this, this._setSeletedMacroToAtribute, config);
					},

					/**
					 * Sender email macro button click handler.
					 * @private
					 */
					_onTemplateSenderEmailSelectMacroButtonClick: function() {
						var config = {
							attributeName: "SenderEmail"
						};
						this.openMacrosColumnsPageWithCustomConfig(this, this._setSeletedMacroToAtribute, config);
					},

					/**
					 * Subject macro button click handler.
					 * @private
					 */
					_onSubjectMacroClicked: function(macrosType) {
						this.set("MacrosInsertEventSource", "Subject");
						this.onMacroButtonClicked(macrosType);
					},

					/**
					 * Sender name macro button click handler.
					 * @private
					 */
					_onSenderNameMacroClicked: function(macrosType) {
						this.set("MacrosInsertEventSource", "SenderName");
						this.onMacroButtonClicked(macrosType);
					},

					/**
					 * Sender email macro button click handler.
					 * @private
					 */
					_onSenderEmailMacroClicked: function(macrosType) {
						this.set("MacrosInsertEventSource", "SenderEmail");
						this.onMacroButtonClicked(macrosType);
					},

					_getStatusButtonInfoVisible: function() {
						return Boolean(this.$IsMarketingContentBuilderWizardEnabled
							&& this.$Status
							&& this.$Status.value === MarketingEnums.BulkEmailStatus.DRAFT);
					},

					/**
					 * Returns True when DCTemplateViewer module can be visualized.
					 * @private
					 * @returns {Boolean} Visibility state.
					 */
					_getDCTemplateViewerVisibility: function() {
						return Boolean(this.$isDCTemplateViewerVisible && this.getPrimaryColumnValue());
					},

					_setSendTestEmailVisible: function() {
						this.$IsSendTestEmailVisible = this.$IsMarketingContentBuilderWizardEnabled
							&& this.$Status.value !== MarketingEnums.BulkEmailStatus.DRAFT;
					},

					_updateStatusByFeatureMarketingContentBuilderWizard: function() {
						const isDraftStatus = this.$Status.value === MarketingEnums.BulkEmailStatus.DRAFT;
						if (isDraftStatus && !this.$IsMarketingContentBuilderWizardEnabled) {
							this.loadLookupDisplayValue("Status", MarketingEnums.BulkEmailStatus.PLANNED);
						}
					},

					/**
					 * ######### ####### ## ######## # #########.
					 * @private
					 * @returns {Boolean} ########## true, #### ######## ####### # #########, ##### false.
					 */
					isAssignedWithCampaign: function() {
						var campaign = this.get("Campaign");
						return !Ext.isEmpty(campaign);
					},

					/**
					 * ######### #### ############## #########.
					 * @private
					 */
					_editTemplateAction: function() {
						Terrasoft.chain(
							function (next) {
								this.asyncValidate(function(validationResult) {
									if (validationResult) {
										next();
									}
								}, this);
							},
							function () {
								var contentBuilderMode = BulkEmailContentBuilderEnumsModule.BulkEmailContentBuilderMode.BULKEMAIL;
								var recordId = this.getPrimaryColumnValue();
								var contentBuilderUrl = BulkEmailContentBuilderEnumsModule.getContentBuilderUrl(contentBuilderMode,
									recordId);
								if (this.isNewMode()) {
									var config = {
										callback: function () {
											window.open(contentBuilderUrl);
										},
										isSilent: true
									};
									this.save(config);
								} else {
									window.open(contentBuilderUrl);
								}
							},
							this);
					},

					/**
					 * ######### #### ###### ## ########### ######## #########.
					 * @private
					 */
					_chooseTemplateFromLookupAction: function() {
						Terrasoft.chain(this.asyncValidate,
							function(next, validationResult) {
								if (validationResult) {
									next();
								}
							},
							function(next) {
								if (this.isNewMode()) {
									var config = {
										callback: function () {
											next();
										},
										isSilent: true
									};
									this.save(config);
								} else {
									next();
								}
							},
							function() {
								var config = {
									entitySchemaName: "EmailTemplate",
									enableMultiSelect: false
								};
								LookupUtilities.Open(this.sandbox, config, this.insertTemplateFromLookup, this,
									null, false, false);
							},
							this);
					},

					/**
					 * Shows cpnfirmation window for action.
					 * @private
					 */
					_executeWithConfirmation: function(message, action) {
						var config = {
							style: Terrasoft.MessageBoxStyles.BLUE
						};
						this.showConfirmationDialog(message,
							function(returnCode) {
								if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
									action.call(this);
								}
							}, ["yes", "cancel"], config);
					},

					/**
					 * ######### ######## ## ########.
					 * @private
					 * @returns {Boolean} ########## true, #### ######## ########, ##### false.
					 */
					isLaunchedCampaign: function() {
						var campaignStatus = this.get("CampaignStatus");
						return (campaignStatus &&
							(campaignStatus.value === MarketingEnums.CampaignStatus.STARTED ||
								campaignStatus.value === MarketingEnums.CampaignStatus.SCHEDULED));
					},

					/**
					 * ######### ######### ##### ####### ########.
					 * @private
					 */
					processLaunchOptionColumn: Terrasoft.emptyFn,

					/**
					 * ####### ######### ######### #####.
					 * @private
					 * @param {String} name ######## ####.
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmValidator: function(name) {
						var invalidMessage = "";
						var patternUtmLabel = /^[A-Za-z0-9_]+$/;
						var utmLabel = this.get(name);
						var useUtm = this.get("UseUtm");
						if (!this.Ext.isEmpty(utmLabel) && !patternUtmLabel.test(utmLabel) && useUtm) {
							invalidMessage = this.get("Resources.Strings.UtmIncorrectMessage");
						}
						return this._getValidationResult(invalidMessage);
					},

					/**
					 * Function to validate email by field name.
					 * @private
					 * @return {Object} Returns validation result.
					 */
					_checkSenderEmail: function(email) {
						var validationMessage = "";
						if (!EmailHelperModule.isEmailValid(email)) {
							validationMessage = this.get("Resources.Strings.IncorrectEmailMessage");
							this.updateSenderEmailInfoButton(false, validationMessage, false);
						} else {
							this.asyncValidateSenderDomain();
						}
						return this._getValidationResult(validationMessage);

					},

					/**
					 * Returns true if feature BulkEmailUXEnabled is enabled.
					 * @private
					 * @return {Boolean}.
					 */
					getIsBulkEmailUXEnabled: function() {
						return this.Terrasoft.Features.getIsEnabled("BulkEmailUX");
					},

					/**
					 * Function to validate sender name.
					 * @private
					 * @return {Object} Returns validation result.
					 */
					_senderNameValidator: function() {
						var validationMessage = "";
						var senderName = this.$SenderName;
						if (Ext.isEmpty(senderName)) {
							validationMessage = this.get("Resources.Strings.FieldEmptyValidationMessage");
							return this._getValidationResult(validationMessage);
						}
						if (this.$IsFromEmailFromNameMacroFeatureEnabled) {
							if (MacroUtils.isStringContainsMacro(senderName) && !MacroUtils.isValueMacro(senderName)) {
								validationMessage = this.get("Resources.Strings.SenderMacroValidationMessage");
								return this._getValidationResult(validationMessage);
							}
						}
						return this._getValidationResult(validationMessage);
					},

					/**
					 * Validates sender email.
					 * @private
					 * @return {Object} Returns validation result.
					 */
					_senderEmailValidator: function() {
						var validationMessage = "";
						var senderEmail = this.$SenderEmail;
						if (Ext.isEmpty(senderEmail)) {
							validationMessage = this.get("Resources.Strings.FieldEmptyValidationMessage");
							return this._getValidationResult(validationMessage);
						}
						if (this.$IsFromEmailFromNameMacroFeatureEnabled) {
							if (MacroUtils.isStringContainsMacro(senderEmail)) {
								if (MacroUtils.isValueMacro(senderEmail)) {
									validationMessage = this.get("Resources.Strings.SenderMacroInfoMessage");
									this.updateSenderEmailInfoButton(true, validationMessage, true);
									return this._getValidationResult("");
								} else {
									validationMessage = this.get("Resources.Strings.SenderMacroValidationMessage");
									return this._getValidationResult(validationMessage);
								}
							}
						}
						return this._checkSenderEmail(senderEmail);
					},

					/**
					 * Function to validate template subject.
					 * @private
					 * @return {Object} Returns validation result.
					 */
					_templateSubjectValidator: function() {
						var validationMessage = "";
						var templateSubject = this.$TemplateSubject;
						if (Ext.isEmpty(templateSubject)) {
							validationMessage = this.get("Resources.Strings.FieldEmptyValidationMessage");
						}
						return this._getValidationResult(validationMessage);
					},

					_getValidationResult: function(shortMessage, fullMessage) {
						return {
							fullInvalidMessage: shortMessage,
							invalidMessage: fullMessage ? fullMessage : shortMessage
						};
					},

					_checkIfBrowserSupported: function() {
						if (this.$IsMarketingContentBuilderWizardEnabled) {
							if (Ext.isIE) {
								var ieNotSuppoertedMessage = this.get("Resources.Strings.IENotSupportedMessage");
								this.showInformationDialog(ieNotSuppoertedMessage);
								return false;
							}
						}
						return true;
					},

					/**
					 * ####### ######### ######### ##### UtmCampaign.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmCampaignValidator: function() {
						return this.checkUtmValidator("UtmCampaign");
					},

					/**
					 * ####### ######### ######### ##### UtmMedium.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmMediumValidator: function() {
						return this.checkUtmValidator("UtmMedium");
					},

					/**
					 * ####### ######### ######### ##### UtmSource.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmSourceValidator: function() {
						return this.checkUtmValidator("UtmSource");
					},

					/**
					 * ####### ######### ######### ##### UtmTerm.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmTermValidator: function() {
						return this.checkUtmValidator("UtmTerm");
					},

					/**
					 * ####### ######### ######### ##### UtmContent.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkUtmContentValidator: function() {
						return this.checkUtmValidator("UtmContent");
					},

					/**
					 * ####### ######### #### "######".
					 * #### ###### ## ###### #### ###### ####### ####.
					 * @private
					 * @return {Object} ########## ######### #########.
					 */
					checkMinStartDateValidator: function() {
						var invalidMessage = "";
						var startDate = this.get("StartDate");
						var currentDate = new Date();
						if (startDate && startDate < currentDate) {
							invalidMessage = this.get("Resources.Strings.IncorrectStartDateMessage");
						}
						return this._getValidationResult(invalidMessage);
					},

					/**
					 * Returns config for the SaveBulkEmailTemplate method of BulkEmailTemplateService.
					 * @private
					 * @return {Object} Config.
					 */
					getSaveBulkEmailTemplateConfigData: function() {
						var requiredColumnValues = {
							Name: this.get("Name"),
							SenderName: this.get("SenderName"),
							SenderEmail: this.get("SenderEmail")
						};
						return {
							bulkEmailId: this.getPrimaryColumnValue(),
							emailTemplateId: null,
							requiredColumnValues: this.Ext.encode(requiredColumnValues),
							body: null
						};
					},

					/**
					 * ######### ### ######## ######### ######## ######## isNotHtmlView. ######### ### ########.
					 * @private
					 */
					getIsNoHtmlView: function(isHtmlView) {
						return !isHtmlView;
					},

					/**
					 * ############# ######## ######### IsBulkEmailTypeEnabled # ########### ## ####### ########
					 * # ####### ###########.
					 * @private
					 * @param {Boolean} value ######## ######### IsBulkEmailTypeEnabled.
					 */
					setBulkEmailTargetEnabled: function(value) {
						if (this.isNewMode() || this.isCopyMode()) {
							return;
						}
						var statusId = this.get("Status").value;
						if (statusId === MarketingEnums.BulkEmailStatus.STARTED ||
								statusId === MarketingEnums.BulkEmailStatus.STARTING ||
								statusId === MarketingEnums.BulkEmailStatus.BREAKING ||
								statusId === MarketingEnums.BulkEmailStatus.COMPLETED) {
							this.set("IsBulkEmailTypeEnabled", false);
							return;
						}
						if (!Ext.isEmpty(value)) {
							this.set("IsBulkEmailTypeEnabled", value);
							return;
						}
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "VwMandrillRecipient"});
						esq.rowCount = 1;
						esq.addColumn("Id");
						esq.filters.add("filterMassMailing", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "BulkEmail", this.get("Id")));
						esq.getEntityCollection(function(result) {
							var isEmpty = result.success && result.collection.isEmpty();
							this.set("IsBulkEmailTypeEnabled", isEmpty);
						}, this);
					},

					/**
					 * ########## URL ########### ### ######### ######## ####### # ############## #######.
					 * @private
					 * @return {String} URL ###########.
					 */
					getEmptyChartDataImage: function() {
						var iconId = this.get("Resources.Strings.ChartEmptyDataImageId");
						return this.getSysImageUrl(iconId);
					},

					/**
					 * Initializes content by default for the SenderEmailInfoButton.
					 * @private
					 */
					initSenderEmailInfoButton: function() {
						var lczValue = this.get("Resources.Strings.DefaultSenderDomainMessage");
						this.set("SenderEmailInfoButtonContent", lczValue);
						this.set("SenderEmailInfoButtonStyle", this.Terrasoft.TipStyle.GREEN);
						this.set("IsSenderEmailValid", true);
						this.initSenderEmailInfoButtonDefaultImage();
					},

					/**
					 * Initializes default image for the SenderEmailInfoButton.
					 * @private
					 */
					initSenderEmailInfoButtonDefaultImage: function() {
						var imageConfig = this.getSenderEmailInfoButtonImageConfig(true);
						this.set("SenderEmailInfoButtonImageConfig", imageConfig);
					},

					/**
					 * Initializes Academy link.
					 * @private
					 */
					initHelpUrl: function() {
						var config = {
							contextHelpCode: "BulkEmailPageV2",
							contextHelpId: "1008",
							scope: this
						};
						config.callback = function(url) {
							this.set("HelpUrl", url);
						};
						AcademyUtilities.getUrl(config);
					},

					/**
					 * ########## ##### ###### # ######## ###### # ######
					 * ## ###### # ########.
					 * @param {String} text ##### ###### # ########.
					 * @returns {String} ##### ######.
					 * @private
					 */
					getGuideText: function(text) {
						var url = this.get("HelpUrl");
						var startTag = "";
						var finishTag = "";
						if (!Ext.isEmpty(url)) {
							startTag = "<a target=\"_blank\" href=\"" + url + "\">";
							finishTag = "</a>";
						}
						text = Ext.String.format(text, startTag, finishTag);
						return text;
					},

					/**
					 * Gets caption for not delivered responses chart replacing image.
					 * @private
					 */
					getNotDeliveredBlankSlatesCaption: function() {
						var caption = this.get("Resources.Strings.NotDeliveredChartEmptyImageCaption");
						return caption;
					},

					/**
					 * Gets caption for canceled responses chart replacing image.
					 * @private
					 */
					getCanceledBlankSlatesCaption: function() {
						var caption = this.get("Resources.Strings.CanceledChartEmptyImageCaption");
						return caption;
					},

					/**
					 * Sets state of features functionality.
					 * @private
					 */
					_setWizardFeature: function() {
						this.$IsMarketingContentBuilderWizardEnabled = this.getIsFeatureEnabled("MarketingContentBuilderWizard");
					},

					/**
					 * Sets state of FromEmailFromName features functionality.
					 * @private
					 */
					_setFromNameFromEmailFeature: function() {
						this.$IsFromEmailFromNameMacroFeatureEnabled = this.getIsFeatureEnabled("FromEmailFromNameMacros");
					},

					/**
					 * Disables IE9+ feature which wraps email and text links into html tags.
					 * @private
					 */
					disableAutoUrlDetection: function() {
						try {
							document.execCommand("AutoUrlDetect", false, false);
						} catch(err) {}
					},

					// endregion

					// region: Methods: Protected

					/**
					 * Subscribes to events.
					 * @protected
					 * @virtual
					 */
					subscribeMessages: function() {
						var macrosModuleId = this.getMacrosModuleId();
						this.sandbox.subscribe("MacroSelected", this.onGetMacros, this,
							[macrosModuleId]);
					},

					/**
					 * Handles macros receiving.
					 * @protected
					 * @virtual
					 * @param {String} macros Macros.
					 */
					onGetMacros: function(macros) {
						var macrosInsertEventSource = this.get("MacrosInsertEventSource");
						switch(macrosInsertEventSource) {
							case "Subject":
								this.set("SubjectSelectedMacros", macros);
								break;
							case "SenderName":
								this.set("SenderName", macros);
								break;
							case "SenderEmail":
								this.set("SenderEmail", macros);
								var message = this.get("Resources.Strings.SenderMacroInfoMessage");
								this.updateSenderEmailInfoButton(true, message, true);
								break;
							default:
								break;
						}
					},

					/**
					 * ##### ########## ###### "#######".
					 * @protected
					 * @overridden
					 */
					onCloseClick: function() {
						var bulkEmailId = this.get("Id");
						this.sandbox.publish("CardModuleResponse", {primaryColumnValue: bulkEmailId}, [this.sandbox.id]);
						this.callParent(arguments);
					},

					/**
					 * ############## ######## ## ######### ####### ########.
					 * @protected
					 * @overridden
					 */
					initCardActionHandler: function() {
						this.callParent(arguments);
						var propertyNames = [
							"IsRunEnabled",
							"IsRunDisplayed",
							"IsBreakEnabled",
							"SendMailingActionCaption",
							"EditTemplateActionCaption",
							"SendTestEmailActionCaption",
							"IsTemplateEditable",
							"IsSendTestEmailVisible",
							"IsMarketingContentBuilderWizardEnabled"
						];
						Terrasoft.each(propertyNames, function(propertyName) {
							this.on("change:" + propertyName, function(model, value) {
								this.sandbox.publish("CardChanged", {
									key: propertyName,
									value: value
								}, [this.sandbox.id]);
							}, this);
						}, this);
					},

					/**
					 * ###### ######### ####### (## ### ####### ########## ###### "######### ########").
					 * @protected
					 * @virtual
					 */
					processStatusColumn: function() {
						var status = this.get("Status");
						var isAnalysisVisible = status.value !== MarketingEnums.BulkEmailStatus.PLANNED
							&& status.value !== MarketingEnums.BulkEmailStatus.DRAFT
							&& status.value !== MarketingEnums.BulkEmailStatus.START_SCHEDULED;
						this.set("IsAnalysisVisible", isAnalysisVisible);
					},

					/**
					 * Sets template viewer visibility.
					 * @protected
					 */
					setDCTemplateViewerVisible: function() {
						this.$isDCTemplateViewerVisible = this.getIsFeatureEnabled("DynamicContentClickHeatmap");
					},

					/**
					 * Sets state of dynamic content functionality.
					 * @protected
					 */
					setDynamicContentEnabled: function() {
						this.$DynamicContentEnabled = this.getIsFeatureEnabled("BulkEmailDynamicContentBuilder");
					},

					/**
					 * ########## ######### ######## ######## ### ######## "###########/##########".
					 * @protected
					 * @virtual
					 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########.
					 */
					getActions: function() {
						var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
						if (!this.$isDCTemplateViewerVisible) {
							actionMenuItems.addItem(this.getButtonMenuItem({
								"Tag": "sendTestEmail",
								"Click": {"bindTo": "sendTestEmail"},
								"Caption": {"bindTo": "Resources.Strings.SendTestEmailActionCaption"}
							}));
							actionMenuItems.addItem(this.getButtonMenuItem({
								"Tag": "sendTestEmail",
								"Type": "Terrasoft.MenuSeparator"
							}));
						}
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Tag": "goToSplitTestsCaption",
							"Click": {"bindTo": "goToSplitTestsCaption"},
							"Caption": {"bindTo": "Resources.Strings.GoToSplitTestsCaption"}
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Type": "Terrasoft.MenuSeparator"
						}));
						var parentActionMenuItems = this.callParent(arguments);
						parentActionMenuItems.each(function(item) {
							actionMenuItems.addItem(item);
						}, this);
						return actionMenuItems;
					},

					/**
					 * Sets default template.
					 * @protected
					 * @virtual
					 */
					setDefaultTemplate: function() {
						var defaultTextTemplate = this.get("Resources.Strings.DefaultTemplate");
						var defaultConfigTemplate = Terrasoft.decode(defaultTextTemplate);
						var emailContentExporter = this.$ContentExporterFactory.getExporter(defaultConfigTemplate);
						var displayHtml = emailContentExporter.exportData(defaultConfigTemplate);
						this.set("TemplateConfig", defaultTextTemplate);
						this.set("TemplateBody", displayHtml);
					},

					/**
					 * Sets default settings.
					 * @protected
					 * @virtual
					 */
					setDefaultEmailValues: function() {
						this.set("UseUtm", false);
						var sysSettings = ["UtmSourceDefault", "UtmMediumDefault", "UtmCampaignDefault",
							"UtmTermDefault", "UtmContentDefault", "GoogleAnalyticsTrackingDomains"];
						Terrasoft.SysSettings.querySysSettings(sysSettings, function(settings) {
							this.set("UtmSource", settings.UtmSourceDefault);
							this.set("UtmMedium", settings.UtmMediumDefault);
							this.set("UtmCampaign", settings.UtmCampaignDefault);
							this.set("UtmTerm", settings.UtmTermDefault);
							this.set("UtmContent", settings.UtmContentDefault);
							this.set("Domains", settings.GoogleAnalyticsTrackingDomains);
						}, this);
						if (this.isAddMode() && !this.$isDCTemplateViewerVisible) {
							this.setDefaultTemplate();
						}
					},

					/**
					 * @inheritdoc BasePageV2#onEntityInitialized
					 * @override
					 */
					onEntityInitialized: function() {
						this._setSendTestEmailVisible();
						this._updateStatusByFeatureMarketingContentBuilderWizard();
						this.clearReplicaRepository();
						this.callParent(arguments);
						this._senderEmailValidator();
						if (this.isAddMode() || this.isCopyMode()) {
							this.setDefaultEmailValues();
							this.set("SendMailingActionCaption",
								this.get("Resources.Strings.RunMandrillMassMailingActionCaption"));
							if (this.isCopyMode()) {
								var defaultStatus = this.$Status.value === MarketingEnums.BulkEmailStatus.DRAFT
									&& this.$IsMarketingContentBuilderWizardEnabled
									? MarketingEnums.BulkEmailStatus.DRAFT
									: MarketingEnums.BulkEmailStatus.PLANNED;
								this.$Status.value = defaultStatus;
								this.loadLookupDisplayValue("Status", this.$Status.value);
							}
						}
						this.set("SendTestEmailActionCaption",
							this.get("Resources.Strings.SendTestEmailCaption"));
						this.set("EditTemplateActionCaption",
							this.get("Resources.Strings.EditTemplateCaption"));
						this.processStatusColumn();
						this.loadAnalyticsTabContent();
						this.loadClicksAnalysisTabContent();
						this.loadSendProcessDiagram();
						this.setBulkEmailTargetEnabled();
						BulkEmailHelper.UpdateStatistic(this);
					},

					/**
					 * ########## ######## # ##### # ####### ##### ##### ####### # ######### ########.
					 * @protected
					 */
					calculateDurationBulkEmail: function() {
						var sendStartDate = this.get("SendStartDate");
						var sendDueDate = this.get("SendDueDate");
						if ((!Ext.isDate(sendStartDate) || !Ext.isDate(sendDueDate)) || (sendDueDate < sendStartDate)) {
							return "";
						}
						var millisecondsInMinute = 1000 * 60;
						var durationInMinute = Ext.Date.getElapsed(sendDueDate, sendStartDate) / millisecondsInMinute;
						var hours = Math.floor(durationInMinute / 60);
						var minutes = Math.floor(durationInMinute - (hours * 60));
						var result;
						if (hours === 0 && minutes === 0) {
							result = this.get("Resources.Strings.DurationBulkEmailLessMinute");
						} else {
							result = Ext.String.format(this.get("Resources.Strings.DurationBulkEmailValueFormat"), hours,
								Ext.String.leftPad(minutes.toString(), 2, "0"));
						}
						return result;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
					 * @override
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						var sandbox = this.sandbox;
						var subscribersIds = this.getSaveRecordMessagePublishers();
						sandbox.subscribe("GetIsRunnable", function() {
							return this.get("IsRunEnabled");
						}, this, subscribersIds);
						sandbox.subscribe("GetIsAudienceEditable", function() {
							return this.get("IsAudienceEditable");
						}, this, subscribersIds);
						sandbox.subscribe("GetEmailCategory", function() {
							return this.get("Category");
						}, this, subscribersIds);
						sandbox.subscribe("GetEmailStatus", function() {
							return this.get("Status");
						}, this, subscribersIds);
						sandbox.subscribe("GetEmailCreatedOn", function() {
							return this.get("CreatedOn");
						}, this, subscribersIds);
						sandbox.subscribe("RunMailing", function() {
							this.runMandrillMassMailing();
						}, this, [sandbox.id]);
						sandbox.subscribe("BreakMailing", function() {
							this.breakMailingAction();
						}, this, [this.sandbox.id]);
						var detailId = this.getDetailId("VwMandrillRecipient");
						sandbox.subscribe("VwMandrillRecipientDetailChanged", function(config) {
							var value = Ext.isEmpty(config.value) ? null : config.value;
							this.setBulkEmailTargetEnabled(value);
						}, this, [detailId]);
						this.subscribeGetReplicaRepository();
						this.subscribeDcTemplateViewer();
					},

					/**
					 * ######### #### ###### ## ########### ######## #########.
					 * @protected
					 */
					chooseTemplateFromLookup: function() {
						var status = this.get("Status");
						if (status.value === MarketingEnums.BulkEmailStatus.ACTIVE) {
							var message = this.get("Resources.Strings.EditTemplateConfirmation");
							this._executeWithConfirmation(message,
								this._chooseTemplateFromLookupAction);
						} else if (!this.Ext.isEmpty(this.$TemplateBody)) {
							this._executeWithConfirmation(this.get("Resources.Strings.ReplaceTemplateConfirmation"),
								this._chooseTemplateFromLookupAction);
						} else {
							this._chooseTemplateFromLookupAction();
						}
					},

					/**
					 * Handles the EditTemplate button click.
					 * @protected
					 */
					editTemplate: function() {
						if(!this._checkIfBrowserSupported()) {
							return;
						}
						var status = this.get("Status");
						if (status.value === MarketingEnums.BulkEmailStatus.ACTIVE) {
							var message = this.get("Resources.Strings.EditTemplateConfirmation");
							this._executeWithConfirmation(message,
								this._editTemplateAction);
						} else {
							this._editTemplateAction();
						}
					},

					/**
					 * ########## ###### ####### ## ########### ######## #########.
					 * @protected
					 * @param {Object} config ############ ######### ######.
					 */
					insertTemplateFromLookup: function(config) {
						var selectedRows = config.selectedRows;
						if (selectedRows.getCount() <= 0) {
							return;
						}
						var template = selectedRows.getByIndex(0);
						this.prepareBulkEmailTemplate(template.Id);
						this.set("IsTemplateDataCollapsed", false);
					},

					/**
					 * Creates content builder helper.
					 * @protected
					 * @deprecated
					 * @return {Terrasoft.DynamicContentBuilderHelper} Content builder helper instance.
					 */
					createContentBuilderHelper: function() {
						var contentBuilderHelper = Ext.create("Terrasoft.DynamicContentBuilderHelper", {
							sandbox: {
								subscribe: Terrasoft.emptyFn
							}});
						contentBuilderHelper.sheetElementProperties.push("PreHeaderText");
						return contentBuilderHelper;
					},

					/**
					 * Returns JSON object by view model instance.
					 * @protected
					 * @param {Terrasoft.BaseViewModel} viewModel View model instance.
					 * @return {Object} JSON object.
					 */
					getContentBuilderConfig: function(viewModel) {
						var contentBuilderHelper = this.createContentBuilderHelper();
						return contentBuilderHelper.toJSON(viewModel);
					},

					/**
					 * Returns view model instance by template configuration.
					 * @protected
					 * @param {Object} templateConfig Template configuration.
					 * @return {Terrasoft.BaseModel} Content builder view model.
					 */
					getContentBuilderViewModel: function(templateConfig) {
						var contentBuilderHelper = this.createContentBuilderHelper();
						var viewModelConfig = contentBuilderHelper.toViewModel(templateConfig);
						return Ext.create("Terrasoft.BaseModel", {
							values: viewModelConfig
						});
					},

					/**
					 * Returns instance of BulkEmailTemplateValidator.
					 * @protected
					 * @return {Terrasoft.BulkEmailTemplateValidator} Instance of BulkEmailTemplateValidator.
					 */
					createTemplateValidator: function() {
						return Ext.create("Terrasoft.BulkEmailTemplateValidator");
					},

					/**
					 * Validates template configuration.
					 * @param {Object} templateConfig Template configuration.
					 * @param {Function} successCallbackFn Callback function for success validation.
					 * @param {Function} rejectCallbackFn Callback function for reject validation.
					 * @param {Object} scope Callback execution context.
					 */
					validateTemplateConfig: function(templateConfig, successCallbackFn, rejectCallbackFn, scope) {
						if (this.$DynamicContentEnabled) {
							var validator = this.createTemplateValidator();
							var validatorConfig = {
								bulkEmailId: this.get("Id"),
								templateConfig: templateConfig
							};
							validator.validate(validatorConfig, successCallbackFn, rejectCallbackFn, scope);
						} else {
							Ext.callback(successCallbackFn, scope);
						}
					},

					/**
					 * Applies BpmTrackId to Hyperlinks.
					 * @param {Object} templateConfig Template configuration.
					 */
					applyBpmTrackIdToHyperlinks: function(templateConfig) {
						if (this.$DynamicContentEnabled) {
							var viewModel = this.getContentBuilderViewModel(templateConfig);
							BulkEmailHyperlinkCorrector.applyBpmTrackIdToHyperlinks(viewModel);
							templateConfig = this.getContentBuilderConfig(viewModel);
						}
						return templateConfig;
					},

					/**
					 * Prepare template for service method.
					 * @protected
					 * @param {Guid} templateId EmailTemplate record uniqueidentifier.
					 */
					prepareBulkEmailTemplate: function(templateId) {
						var dataSend = {
							emailTemplateId: templateId
						};
						var config = {
							serviceName: "BulkEmailTemplateService",
							methodName: "GetEmailTemplateConfig",
							data: dataSend
						};
						this.showBodyMask();
						this.callService(config, function(response) {
							var result = response.GetEmailTemplateConfigResult;
							var templateConfigText = result.TemplateConfig;
							var templateConfigJson = Ext.isEmpty(templateConfigText)
								? BulkEmailTemplateHelper.htmlToSheetConfig(result.TemplateBody)
								: Terrasoft.decode(templateConfigText);
							templateConfigJson = this.applyBpmTrackIdToHyperlinks(templateConfigJson);
							BulkEmailTemplateHelper.applyUnsubscribeLink(templateConfigJson,
								function(templateConfig, html, applied) {
									this.validateTemplateConfig(templateConfigJson, function() {
										this.saveBulkEmailTemplate(templateId, html,
											JSON.stringify(templateConfig), applied);
									}, this.Terrasoft.emptyFn, this);
								}, this);
						});
					},

					/**
					 * Save template by service method.
					 * @protected
					 * @param {Guid} templateId EmailTemplate record uniqueidentifier.
					 * @param {String} body Body of template.
					 * @param {String} templateConfig Template config.
					 * @param {Boolean} isUnsubscribeApplied Unsubscribe link applied flag.
					 */
					saveBulkEmailTemplate: function(templateId, body, templateConfig, isUnsubscribeApplied) {
						if (!BulkEmailTemplateHelper.validateTemplateSize(body.length)) {
							this.hideBodyMask();
							return;
						}
						var configData = this.getSaveBulkEmailTemplateConfigData();
						var config = {
							serviceName: "BulkEmailTemplateService",
							methodName: "SaveBulkEmailTemplate",
							data: configData
						};
						configData.body = body;
						configData.emailTemplateId = templateId;
						configData.config = templateConfig || null;
						this.callService(config, function(response) {
							this.onBulkEmailTemplateSaved(response, isUnsubscribeApplied);
						});
					},

					/**
					 * ######## URL ########### ## ########### ##############.
					 * @param {Object} sysImageId ########## ############# ###########.
					 * @protected
					 * @return {String} URL ###########.
					 */
					getSysImageUrl: function(sysImageId) {
						var imageConfig = {
							source: Terrasoft.ImageSources.SYS_IMAGE,
							params: {
								primaryColumnValue: sysImageId
							}
						};
						return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
					},

					/**
					 * ######### ####### # ###### #####-######.
					 * @protected
					 */
					goToSplitTestsCaption: function() {
						this.sandbox.publish("PushHistoryState", {
							hash: Ext.String.format("{0}/{1}",
								"SectionModuleV2", "BulkEmailSplitSectionV2")
						});
					},

					/**
					 * Notify about bulk email template saved.
					 * @protected
					 */
					reloadTemplateViewer: function() {
						this.sandbox.publish("BulkEmailTemplateSaved", null, [this.getModuleId("DCTemplateViewer")]);
					},

					/**
					 * Handles event when macros button has been clicked.
					 * @protected
					 */
					onMacroButtonClicked: function(macrosType) {
						switch (macrosType) {
							case "macros":
								this.openMacrosPage();
								break;
							case "column":
								this.openMacrosColumnsPage();
								break;
							default:
								throw Ext.create("Terrasoft.UnsupportedTypeException " + macrosType);
						}
					},

					/**
					 * Opens macros columns dialog with callback function and custom parameters.
					 * @protected
					 * @param {Object} scope scope.
					 * @param {Function} handler callback function.
					 * @param {Object} config config with custom parameters.
					 */
					openMacrosColumnsPageWithCustomConfig: function(scope, handler, config) {
						var macrosEntity = "VwMandrillRecipientV2";
						Terrasoft.StructureExplorerUtilities.open({
							scope: scope,
							handlerMethod: function(macros) {
								handler.call(scope, config, macros);
							},
							moduleConfig: {
								useBackwards: false,
								schemaName: macrosEntity
							}
						});
					},

					/**
					 * Open entity structure explorer module for select column macros.
					 * @protected
					 * @virtual
					 */
					openMacrosColumnsPage: function() {
						var macrosEntity = "VwMandrillRecipientV2";
						Terrasoft.StructureExplorerUtilities.open({
							scope: this,
							handlerMethod: this.onMacrosColumnSelected,
							moduleConfig: {
								useBackwards: false,
								schemaName: macrosEntity
							}
						});
					},

					/**
					 * Loads system settings.
					 * @protected
					 */
					loadSysSettings: function() {
						var sysSettings = ["BuildType"];
						Terrasoft.SysSettings.querySysSettings(sysSettings, function(settings) {
							var isPublicDemo = (settings.BuildType.value === MarketingEnums.BuildType.DEMO_PUBLIC);
							this.set("IsPublicDemoBuild", isPublicDemo);
							this.set("TrialUrl", "");
						}, this);
					},

					/**
					 * Handles the message server communications channel.
					 * @protected
					 * @param {Terrasoft.ServerChannel} channel BPMonline server communication channel.
					 * @param {Object} message Message object.
					 */
					onChannelMessage: function(channel, message) {
						if (!this.Ext.isObject(message)) {
							return;
						}
						var header = message.Header;
						if (header.Sender !== BulkEmailContentBuilderEnumsModule.BulkEmailContentBuilderMode.BULKEMAIL) {
							return;
						}
						var messageObject = this.Terrasoft.decode(message.Body || "{}");
						var primaryColumnValue = this.getPrimaryColumnValue();
						if (messageObject.recordId !== primaryColumnValue) {
							return;
						}
						this.clearReplicaRepository();
						this.refreshColumns(["TemplateBody", "TemplateConfig", "Status"],
							this.reloadTemplateViewer, this, {silent: false});
					},

					/**
					 * Returns visibility value for DCClickHeatmap container.
					 * @protected
					 */
					isDCClickHeatmapVisible: function() {
						return this.get("IsAnalysisVisible") &&
							this.getIsFeatureEnabled("DynamicContentClickHeatmap");
					},

					/**
					 * Initializes the instance of replica repository if it is not initialized yet and
					 * returns this instance. If page is not in edit mode, returns null.
					 * @protected
					 * @return {Terrasoft.DCTemplateReplicaRepository | null} Instance of replica repository.
					 */
					getReplicaRepository: function() {
						if (this.destroyed ||
							this.$Operation !== this.Terrasoft.ConfigurationEnums.CardOperation.EDIT) {
							return null;
						}
						var repository = this.$ReplicaRepository;
						if (!repository) {
							repository = this.Ext.create("Terrasoft.DCTemplateReplicaRepository");
							repository.init(this.getPrimaryColumnValue());
							this.$ReplicaRepository = repository;
						}
						return repository;
					},

					/**
					 * Clears replica repository.
					 * @protected
					 */
					clearReplicaRepository: function() {
						if (this.$ReplicaRepository) {
							this.$ReplicaRepository.destroy();
							this.$ReplicaRepository = null;
						}
					},

					/**
					 * Subscribes on message that requests the instance of replica repository.
					 * @protected
					 */
					subscribeGetReplicaRepository: function() {
						var sandboxIdsToSubscribe = [
							this.getModuleId("DCClickHeatmap"),
							this.getModuleId("DCTemplateViewer"),
							this.getDetailId("BulkEmailHyperlink")
						];
						this.sandbox.subscribe("GetReplicaRepository", this.getReplicaRepository,
							this, sandboxIdsToSubscribe);
					},

					/**
					 * Subscribes on messages from template viewer.
					 * @protected
					 */
					subscribeDcTemplateViewer: function() {
						var moduleId = this.getModuleId("DCTemplateViewer");
						this.sandbox.subscribe("ChooseTemplateFromLookup", this.chooseTemplateFromLookup,
							this, [moduleId]);
						this.sandbox.subscribe("EditTemplate", this.editTemplate,
							this, [this.sandbox.id, moduleId]);
					},

					// endregion

					// region Methods: Public

					/**
					 * ########## ####### ## ########### #######.
					 * @param {Boolean} value
					 * @returns {Boolean}
					 */
					isAnalysisUnvisible: function(value) {
						return (value !== true);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getHeader
					 * @overridden
					 */
					getHeader: function() {
						return this.get("Category").displayValue;
					},

					/**
					 * ####### ########## #### ####### ########.
					 * @returns {Boolean}
					 */
					isTemplateBodyFilled: function() {
						var template = this.get("TemplateBody") || "";
						return (template.trim().length > 0);
					},

					/**
					 * ######### ##### action ##### ########## ########.
					 * @param {Function} action #####.
					 */
					runActionAfterSave: function(action) {
						Terrasoft.chain(
							this.saveCheckCanEditRight,
							this.saveAsyncValidate,
							function(next) {
								this.saveEntity(function(response) {
									if (this.validateResponse(response)) {
										this.cardSaveResponse = response;
										next();
									}
								}, this);
							},
							function(next) {
								this.saveDetails(function(response) {
									if (this.validateResponse(response)) {
										next();
									}
								}, this);
							},
							function(next) {
								if (this.$DynamicContentEnabled
									|| BulkEmailHelper.ValidateTemplateBody(this)) {
									next();
								} else {
									Terrasoft.showInformation(resources.localizableStrings.EmptyTemplateBodyMessage);
								}
							},
							function() {
								action.call(this);
								this.cardSaveResponse = null;
								delete this.cardSaveResponse;
							},
						this);
					},

					/**
					 * ######### ########.
					 * @override
					 */
					save: function() {
						var templateBody = this.get("TemplateBody");
						if (templateBody && !BulkEmailTemplateHelper.validateTemplateSize(templateBody.length)) {
							return;
						}
						var minStartDateValidationResult = this.checkMinStartDateValidator();
						var minValidationMessage = minStartDateValidationResult.fullInvalidMessage;
						if (minValidationMessage) {
							this.showInformationDialog(minValidationMessage);
						} else {
							this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseEntityPage#saveEntityInChain
					 * @override
					 */
					saveEntityInChain: function(callback, scope) {
						var callbackFn = function() {
							var templateConfig = Terrasoft.decode(this.$TemplateConfig || "{}");
							if (this.isCopyMode() && this.$DynamicContentEnabled &&
									!this.Ext.Object.isEmpty(templateConfig)) {
								var saveConfig = {
									sourceBulkEmailId: this.$SourceEntityPrimaryColumnValue,
									bulkEmailId: this.getPrimaryColumnValue(),
									templateConfig: templateConfig
								};
								this.saveTemplateParts(saveConfig, callback, scope);
							} else {
								callback.call(scope);
							}
						};
						this.callParent([callbackFn, this]);
					},

					/**
					 * ######### ###### ######## c ########## #########.
					 * @abstract
					 */
					runMandrillMassMailing: Terrasoft.emptyFn,

					/**
					 * ######### ######### ########.
					 * @abstract
					 */
					breakMailingAction: Terrasoft.emptyFn,

					/**
					 * ########## ######## ###### TestBulkEmailModule.
					 */
					sendTestEmail: function() {
						this.runActionAfterSave(function() {
							var bulkEmailId = this.get("Id");
							var bulkEmailName = this.get("Name");
							BulkEmailHelper.OpenSendTestBulkEmail(bulkEmailId, bulkEmailName, this);
						});
					},

					/**
					 * ###### ######### #### "######" (## #### ####### ######## #### "######").
					 */
					processStartDateColumn: function() {
						var startDate = this.get("StartDate");
						var status = this.get("Status");
						if (status.value === MarketingEnums.BulkEmailStatus.START_SCHEDULED && startDate == null) {
							this.loadLookupDisplayValue("Status", MarketingEnums.BulkEmailStatus.PLANNED);
						}
					},

					/**
					 * Validates domain from the "SenderEmail" field and updates validationInfo of the filed when
					 * domain is not valid.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					asyncValidateSenderDomain: function(callback, scope) {
						if (this.getIsBulkEmailUXEnabled()) {
							var domain = this.getSenderDomain();
							Terrasoft.BpmonlineCloudServiceApi.validateSenderDomain(domain, function(isValid) {
								this.updateSenderEmailInfoButton(isValid, null, true);
								this.Ext.callback(callback, (scope || this), [isValid]);
							}, this);
						}
					},

					/**
					 * Returns domain of the sender email.
					 * @return {String} domain.
					 */
					getSenderDomain: function() {
						var email = this.get("SenderEmail") || "";
						return email.replace(/^.*@/, "");
					},

					/**
					 * Adds view model columns validators.
					 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig.
					 * @override
					 */
					setValidationConfig: function() {
						this.callParent(arguments);
						if (!this.getIsFeatureEnabled("MarketingContentBuilderWizard")) {
							this.addColumnValidator("SenderName", this._senderNameValidator);
							this.addColumnValidator("SenderEmail", this._senderEmailValidator);
							this.addColumnValidator("TemplateSubject", this._templateSubjectValidator);
						}
						this.addColumnValidator("UtmCampaign", this.checkUtmCampaignValidator);
						this.addColumnValidator("UtmMedium", this.checkUtmMediumValidator);
						this.addColumnValidator("UtmSource", this.checkUtmSourceValidator);
						this.addColumnValidator("UtmTerm", this.checkUtmTermValidator);
						this.addColumnValidator("UtmContent", this.checkUtmContentValidator);
					},

					/**
					 * ######### ######### ## #### "#### ######".
					 * @param {Object} callback ####### ######### ######.
					 * @param {Object} scope ######## ######### ####### ######### ######.
					 */
					validateStartDate: function(callback, scope) {
						var result = {
							success: true
						};
						var startDate = this.get("StartDate");
						var launchOption = this.get("LaunchOption");
						if (launchOption &&
								(launchOption.value === MarketingEnums.BulkEmailLaunchOption.MASS_MAILING_SCHEDULED ||
								launchOption.value === MarketingEnums.BulkEmailLaunchOption.TRIGGERED_EMAIL_SHEDULED) &&
								Ext.isEmpty(startDate)) {
							result.message = this.get("Resources.Strings.EmptyStartDateMessage");
							result.success = false;
						}
						callback.call(scope || this, result);
					},

					/**
					 * @inheritdoc BaseBulkEmailPageV2#asyncValidate
					 * @override
					 */
					asyncValidate: function(callback, scope) {
						this.callParent([
							function(response) {
								if (!this.validateResponse(response)) {
									return;
								}
								Terrasoft.chain(
									function(next) {
										this.validateStartDate(function(resultResponse) {
											if (this.validateResponse(resultResponse)) {
												next();
											}
										}, this);
									},
									function(next) {
										callback.call(scope, response);
										next();
									}, this);
							}, this
						]);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#activeTabChange
					 * @override
					 */
					activeTabChange: function(activeTab) {
						this.callParent(arguments);
						var activeTabName = activeTab.get("Name");
						this.set("ActiveTabName", activeTabName);
						this.loadClicksAnalysisTabContent();
						this.loadAnalyticsTabContent();
					},

					/**
					 * Executes methods after saving dynamic content entries.
					 * @protected
					 */
					afterSaveDynamicContentEntries: function() {
						this.clearReplicaRepository();
						this.reloadTemplateViewer();
					},

					/**
					 * Handles response of the BulkEmailTemplateSaved method of BulkEmailTemplateService.
					 * @param {Object} response The service response.
					 * @param {Boolean} isUnsubscribeApplied Indicates if unsubscribe link was applied.
					 */
					onBulkEmailTemplateSaved: function(response, isUnsubscribeApplied) {
						this.hideBodyMask();
						var result = this.Ext.isObject(response) && response.SaveBulkEmailTemplateResult;
						if (result) {
							if (result.Success === true) {
								this.set("TemplateSubject", result.TemplateSubject);
								this.set("TemplateBody", result.TemplateBody);
								this.set("TemplateConfig", result.TemplateConfig);
								this.set("Operation", Enums.CardStateV2.EDIT);
								this.isNew = false;
								if (isUnsubscribeApplied) {
									Terrasoft.utils.showMessage({
										caption: resources.localizableStrings.UnsubscribeLinkAppliedMessage,
										buttons: ["Ok"]
									});
								}
								var templateJson = Terrasoft.decode(result.TemplateConfig, templateJson);
								if (this.$DynamicContentEnabled) {
									this.saveTemplateEntries(this.getPrimaryColumnValue(), templateJson,
										this.afterSaveDynamicContentEntries, this);
								} else {
									this.Ext.callback(this.afterSaveDynamicContentEntries, this);
								}
							} else {
								this.showInformationDialog(result.Message);
							}
						} else {
							this.showInformationDialog(resources.localizableStrings.OnSaveTemplateServiceErrorMessage);
						}
					},

					/**
					 * Cheks whether start sending tooltip is enabled.
					 * @return {boolean} True if start sending tooltip is enabled, otherwise false.
					 */
					isTooltipEnabled: function() {
						var returnValue = false;
						var category = this.get("Category");
						var status = this.get("Status");
						if (category && status) {
							returnValue = BulkEmailHelper.GetIsPlannedTriggeredEmail.call(this, category.value,
								status.value);
						}
						return returnValue;
					},

					getBlankSlatesImage: function() {
						var iconId = this.get("Resources.Strings.CatIconId");
						return this.getSysImageUrl(iconId);
					},

					/**
					 * @inheritdoc BasePageV2#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.setDCTemplateViewerVisible();
						this.callParent([function() {
							this.disableAutoUrlDetection();
							this.setDynamicContentEnabled();
							this._setFromNameFromEmailFeature();
							this.initHelpUrl();
							Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onChannelMessage, this);
							this.loadSysSettings();
							this.subscribeMessages();
							this._setWizardFeature();
							if (callback) {
								callback.call(scope);
							}
						}, this]);
					},

					getClicksAnalysisBlankSlatesCaption: function() {
						var caption = this.get("Resources.Strings.ClicksAnalysisBlankSlatesCaption");
						return this.getGuideText(caption);
					},

					getAnalyticsBlankSlatesCaption: function() {
						var caption = this.get("Resources.Strings.AnalyticsBlankSlatesCaption");
						return this.getGuideText(caption);
					},

					getAudienceBlankSlatesCaption: function() {
						var caption = this.get("Resources.Strings.AudienceBlankSlatesCaption");
						return this.getGuideText(caption);
					},

					/**
					 * Returns image config for the SenderEmailInfoButton depending on the enabled state.
					 * @param {Boolean} isValid Determines state of the button and what image has to be returned.
					 * @return {Object} Image config.
					 */
					getSenderEmailInfoButtonImageConfig: function(isValid) {
						var imageName = isValid ? "DefaultIcon" : "WarningIcon";
						return informationButtonResources.localizableImages[imageName];
					},

					updateSenderEmailInfoButton: function(isValid, message, forceShowToolTip) {
						if (this.get("IsSenderEmailValid") !== isValid || forceShowToolTip) {
							this.set("IsSenderEmailInfoMessageVisible", true);
						}
						this.set("IsSenderEmailValid", isValid);
						var imageConfig = this.getSenderEmailInfoButtonImageConfig(isValid);
						this.set("SenderEmailInfoButtonImageConfig", imageConfig);
						var content;
						var style;
						if (isValid) {
							content = message ? message : this.get("Resources.Strings.ValidSenderDomainMessage");
							style = this.Terrasoft.TipStyle.GREEN;
						} else {
							content = message ? message : this.get("Resources.Strings.InvalidSenderDomainMessage");
							style = this.Terrasoft.TipStyle.RED;
						}
						this.set("SenderEmailInfoButtonContent", content);
						this.set("SenderEmailInfoButtonStyle", style);
					},

					/**
					 * Opens Bpm'online Cloud Integration settings page.
					 */
					openBpmonlineCloudIntegrationPage: function() {
						var pageName = "BpmonlineCloudIntegrationPageV2";
						this.openCardInChain({
							moduleId: this.sandbox.id + "_" + pageName,
							schemaName: pageName
						});
					},

					/**
					 * Handles click on the SenderEmailInfoButton.
					 * @return {Boolean}.
					 */

					onSenderEmailInfoButtonClick: function() {
						this.openBpmonlineCloudIntegrationPage();
						return false;
					},

					/**
					 * Returns visibility value for BulkEmailClicksMap control group.
					 */
					isBulkEmailClicksMapVisible: function() {
						return this.get("IsAnalysisVisible") && !this.isDCClickHeatmapVisible();
					},

					/**
					 * Returns visibility value for BulkEmailHyperlinksClicksChart control group.
					 */
					isBulkEmailHyperlinksClicksChartVisible: function() {
						return this.get("IsAnalysisVisible") &&
							this.getIsFeatureEnabled("BulkEmailHyperlinksClicksChart");
					},

					/**
					 * Returns visibility value for SenderFieldsMacroGridLayout.
					 */
					isSenderFieldsMacroVisible: function() {
						return !this.$IsMarketingContentBuilderWizardEnabled &&
							this.$IsFromEmailFromNameMacroFeatureEnabled;
					},

					/**
					 * Returns visibility value for MandrillPageGeneralInfoGridLayout.
					 */
					isSenderFieldsWithoutMacroVisible: function() {
						return !(this.$IsMarketingContentBuilderWizardEnabled ||
							this.$IsFromEmailFromNameMacroFeatureEnabled);
					},

					/**
					 * Handles the SendTestEmail button click.
					 * @protected
					 */
					onSendTestEmailAction: function() {
						this.sandbox.publish("SendTestEmail", this);
					}

					// endregion

				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "SaveButton",
						"values": {
							"style": Terrasoft.controls.ButtonEnums.style.BLUE
						}
					},
					{
						"operation": "insert",
						"name": "Name",
						"values": {
							"layout": {"column": 0, "row": 0, "colSpan": 13, "rowSpan": 1}
						},
						"parentName": "Header",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "LaunchOption",
						"values": {
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 1, "colSpan": 7, "rowSpan": 1},
							"caption": {bindTo: "Resources.Strings.SendPeriodCaption"},
							"markerValue": {bindTo: "Resources.Strings.SendPeriodCaption"},
							"controlConfig": {"enabled": {bindTo: "IsLaunchOptionEnabled"}},
							"labelConfig": {"isRequired": false}
						},
						"parentName": "Header",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "Status",
						"values": {
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 13, "row": 0, "colSpan": 6, "rowSpan": 1},
							"labelConfig": {"isRequired": false},
							"controlConfig": {"enabled": false}
						},
						"parentName": "Header",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "StatusButtonInfo",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"content":  {bindTo: "Resources.Strings.StatusButtonInfoToolTip"},
							"style": Terrasoft.TipStyle.YELLOW,
							"behaviour": {
								"displayEvent": this.Terrasoft.TipDisplayEvent.CLICK
							},
							"layout": {"column": 18, "row": 0, "colSpan": 1, "rowSpan": 1},
							"controlConfig": {
								"visible":  {bindTo: "_getStatusButtonInfoVisible"},
								"imageConfig": informationButtonResources.localizableImages.AttentionIcon
							}
						},
						"parentName": "Header",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "RecipientCount",
						"values": {
							"layout": {
								"colSpan": 5,
								"rowSpan": 1,
								"column": 19,
								"row": 0,
								"layoutName": "Header"
							},
							"bindTo": "RecipientCount",
							"enabled": false
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 5
					},
					{
						"operation": "insert",
						"name": "StartDate",
						"values": {
							"layout": {"column": 8, "row": 1, "colSpan": 5, "rowSpan": 1},
							"labelConfig": {"visible": false},
							"controlConfig": {
								"setValidationInfo": Terrasoft.emptyFn,
								"visible": {"bindTo": "IsSendScheduled"}
							}
						},
						"parentName": "Header",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SendProcessDiagramContainer",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"id": "SendProcessDiagramContainer",
							"selectors": {
								"el": "#SendProcessDiagramContainer",
								"wrapEl": "#SendProcessDiagramContainer"
							},
							layout: {
								"column": 13,
								"row": 1,
								"colSpan": 11,
								"rowSpan": 1
							},
							"items": [],
							"afterrerender": {"bindTo": "loadSendProcessDiagram"},
							"afterrender": {"bindTo": "loadSendProcessDiagram"}
						}
					},
					{
						"operation": "insert",
						"name": "GeneralInfoTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.GeneralInfoTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "SendingTabContainer",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"values": {
							"caption": {bindTo: "Resources.Strings.SendingTabCaption"},
							"items": []
						},
						"index": 1
					},
					{
						"operation": "insert",
						"parentName": "SendingTabContainer",
						"propertyName": "items",
						"name": "VwMandrillRecipient",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL,
							"visible": {
								"bindTo": "IsOppAudienceVisible"
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "SendingTabContainer",
						"propertyName": "items",
						"name": "BulkEmailTarget",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL,
							"visible": {
								"bindTo": "IsHistoryAudienceVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "MandrillPageGeneralInfoGridLayout",
						"parentName": "GeneralInfoTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": [],
							"visible": {
								"bindTo": "isSenderFieldsWithoutMacroVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "SenderEmail",
						"parentName": "MandrillPageGeneralInfoGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 13,
								"row": 0,
								"colSpan": 10,
								"rowSpan": 1
							},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "SenderName",
						"parentName": "MandrillPageGeneralInfoGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 13,
								"rowSpan": 1
							},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "SenderEmailInfoButton",
						"parentName": "MandrillPageGeneralInfoGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"content": {"bindTo": "SenderEmailInfoButtonContent"},
							"visible": {"bindTo": "IsSenderEmailInfoMessageVisible"},
							"linkClicked": {"bindTo": "onSenderEmailInfoButtonClick"},
							"style": {"bindTo": "SenderEmailInfoButtonStyle"},
							"behaviour": {
								"displayEvent": this.Terrasoft.TipDisplayEvent.CLICK
							},
							"layout": {
								"column": 23,
								"row": 0,
								"colSpan": 1,
								"rowSpan": 1
							},
							"controlConfig": {
								"visible": {"bindTo": "getIsBulkEmailUXEnabled"},
								"imageConfig": {"bindTo": "SenderEmailInfoButtonImageConfig"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSubject",
						"parentName": "MandrillPageGeneralInfoGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 22,
								"rowSpan": 1
							},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"},
								"macrobuttonclicked": {bindTo: "_onSubjectMacroClicked"},
								"selectedText": {bindTo: "SubjectSelectedMacros"},
								"preventEnterPress": true,
								"ckeditorDefaultConfig": {
									"allowedContent": true,
									"removeButtons": "Underline,JustifyCenter,JustifyLeft,JustifyRight,Font,Link" +
									",FontSize,JustifyBlock,NumberedList,BulletedList,Bold,Italic,TextColor,Undo" +
									",Redo,Indent,Outdent,bpmonlinesource,lineheight,letterspacing,lineheightpanel," +
									"letterspacingpanel,bpmonlineemailtemplatelink,indentpanel",
									"forcePasteAsPlainText": true,
									"basicEntities": false
								}
							},
							"className": "Terrasoft.InlineTextEdit",
							"wrapClass": ["macro-input"]
						}
					},
					{
						"operation": "insert",
						"name": "SenderFieldsMacroGridLayout",
						"parentName": "GeneralInfoTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": [],
							"visible": {
								"bindTo": "isSenderFieldsMacroVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "SenderNameMacro",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 13,
								"rowSpan": 1
							},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"}
							},
							"bindTo": "SenderName",
							"visible": {
								"bindTo": "IsFromEmailFromNameMacroFeatureEnabled",
								"enabled": {bindTo: "IsRunEnabled"}
							},
							"wrapClass": ["macro-input"]
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSenderNameMacroSelectMacroButton",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"click": "$_onTemplateSenderNameSelectMacroButtonClick",
							"layout": {
								"column": 13,
								"row": 0,
								"colSpan": 1,
								"rowSpan": 1
							},
							"visible": {
								"bindTo": "IsRunEnabled"
							},
							"imageConfig": "$Resources.Images.BpmonlineMacrosIcon",
						}
					},
					{
						"operation": "insert",
						"name": "SenderEmailMacro",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 13,
								"row": 0,
								"colSpan": 9,
								"rowSpan": 1
							},
							"visible": {
								"bindTo": "IsFromEmailFromNameMacroFeatureEnabled"
							},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"}
							},
							"bindTo": "SenderEmail",
							"wrapClass": ["macro-input"]
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSenderEmailMacroSelectMacroButton",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"click": "$_onTemplateSenderEmailSelectMacroButtonClick",
							"layout": {
								"column": 23,
								"row": 0,
								"colSpan": 1,
								"rowSpan": 1
							},
							"visible": {
								"bindTo": "IsRunEnabled"
							},
							"imageConfig": "$Resources.Images.BpmonlineMacrosIcon",
						}
					},
					{
						"operation": "insert",
						"name": "SenderEmailInfoButtonMacroGrid",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"content": {"bindTo": "SenderEmailInfoButtonContent"},
							"visible": {"bindTo": "IsSenderEmailInfoMessageVisible"},
							"linkClicked": {"bindTo": "onSenderEmailInfoButtonClick"},
							"style": {"bindTo": "SenderEmailInfoButtonStyle"},
							"behaviour": {
								"displayEvent": this.Terrasoft.TipDisplayEvent.CLICK
							},
							"layout": {
								"column": 22,
								"row": 0,
								"colSpan": 1,
								"rowSpan": 1
							},
							"controlConfig": {
								"visible": {"bindTo": "getIsBulkEmailUXEnabled"},
								"imageConfig": {"bindTo": "SenderEmailInfoButtonImageConfig"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSubjectMacro",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 23,
								"rowSpan": 1
							},
							"controlConfig": {
								"injectionValue":  "$TemplateSubjectInsertBuffer",
								"enabled": {bindTo: "IsRunEnabled"}
							},
							"bindTo": "TemplateSubject",
							"wrapClass": ["macro-input"],
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSubjectMacroSelectMacroButton",
						"parentName": "SenderFieldsMacroGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"click": "$_onTemplateSubjectSelectMacroButtonClick",
							"layout": {
								"column": 23,
								"row": 1,
								"colSpan": 1,
								"rowSpan": 1
							},
							"visible": {
								"bindTo": "IsRunEnabled"
							},
							"imageConfig": "$Resources.Images.BpmonlineMacrosIcon",
						}
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoTab",
						"name": "TemplateControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {bindTo: "Resources.Strings.TemplateControlGroupCaption"},
							"tools": [],
							"items": [],
							"controlConfig": {
								"collapsed": {"bindTo": "IsTemplateDataCollapsed"},
								"classes": ["detail bulk-email-template-control-group"]
							},
							"visible": {
								"bindTo": "isDCTemplateViewerVisible",
								"bindConfig": {"converter": "invertBooleanValue"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "TemplateSwitchViewContaner",
						"parentName": "TemplateControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TemplateHtmlGridContainer",
						"parentName": "TemplateControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "TemplateHtmlGridContainer",
						"name": "TemplateHtmlGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TemplateHtmlContainer",
						"parentName": "TemplateHtmlGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"layout": {"column": 0, "row": 0, "rowSpan": 6, "colSpan": 24},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TemplateHtml",
						"parentName": "TemplateHtmlContainer",
						"propertyName": "items",
						"values": {
							"generator": function() {
								return {
									"className": "Terrasoft.IframeControl",
									"id": "preview-content-iframe",
									"iframeContent": {"bindTo": "TemplateBody"}
								};
							}
						}
					},
					{
						"operation": "insert",
						"name": "InsertTemplateFromLookupMenuItem",
						"parentName": "TemplateControlGroup",
						"propertyName": "tools",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.InsertTemplateFromLookupMenuItemCaption"},
							"click": {"bindTo": "chooseTemplateFromLookup"},
							"enabled": {bindTo: "IsTemplateEditable"}
						}
					},
					{
						"operation": "insert",
						"name": "EditTemplate",
						"parentName": "TemplateControlGroup",
						"propertyName": "tools",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.EditTemplateCaption"},
							"click": {"bindTo": "editTemplate"},
							"enabled": {bindTo: "IsTemplateEditable"}
						}
					},
					{
						"operation": "insert",
						"name": "NotesAndFilesTab",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 6,
						"values": {
							"caption": {"bindTo": "Resources.Strings.NotesAndFilesTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTab",
						"name": "NotesAndFilesTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": [],
							"controlConfig": {
								"collapsed": false
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTabContainer",
						"propertyName": "items",
						"name": "NotesAndFilesInformationBlock",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"name": "Files",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"name": "NotesControlGroup",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": [],
							"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
							"controlConfig": {
								"collapsed": false
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesControlGroup",
						"propertyName": "items",
						"name": "Notes",
						"values": {
							"contentType": Terrasoft.ContentType.RICH_TEXT,
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"imageLoaded": {
									"bindTo": "insertImagesToNotes"
								},
								"images": {
									"bindTo": "NotesImagesCollection"
								}
							}
						}
					},
					{
						"operation": "insert",
						"name": "ClicksAnalysisTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.ClicksAnalysisTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 3
					},
					{
						"operation": "insert",
						"name": "DCClickHeatmap",
						"parentName": "ClicksAnalysisTab",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.MODULE,
							"visible": {
								"bindTo": "isDCClickHeatmapVisible"
							}
						}
					},
					{
						"operation": "insert",
						"name": "DCTemplateViewer",
						"parentName": "GeneralInfoTab",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.MODULE,
							"visible": "$_getDCTemplateViewerVisibility"
						}
					},
					{
						"operation": "insert",
						"parentName": "ClicksAnalysisTab",
						"name": "BulkEmailClicksMapControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.ClickHeatmapCaption"},
							"items": [],
							"collapsedchanged": {"bindTo": "clicksMapControlGroupCollapsedChanged"},
							"controlConfig": {
								"collapsed": false,
								"visible": {
									"bindTo": "isBulkEmailClicksMapVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailClicksMapControlGroup",
						"propertyName": "items",
						"name": "BulkEmailClicksMapContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"id": "BulkEmailClicksMapContainer",
							"selectors": {
								"el": "#BulkEmailClicksMapContainer",
								"wrapEl": "#BulkEmailClicksMapContainer"
							},
							"afterrerender": {"bindTo": "loadClicksMap"},
							"afterrender": {"bindTo": "loadClicksMap"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailClicksMapContainer",
						"propertyName": "items",
						"name": "BulkEmailClicksMapModule",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["clicks-map-container"]
							}
						},
						"index": 0
					},
					{
						"operation": "insert",
						"name": "AnalyticsTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.AnalyticsTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 4
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsTab",
						"propertyName": "items",
						"name": "BulkEmailIndicators",
						"values": {
							"markerValue": "BulkEmailIndicators",
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"afterrerender": {"bindTo": "loadIndicatorsModules"},
							"afterrender": {"bindTo": "loadIndicatorsModules"},
							"caption": "",
							"items": [],
							"controlConfig": {
								"collapsed": false,
								"visible": {
									"bindTo": "IsAnalysisVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsTab",
						"name": "BulkEmailOpensClicksChartControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.OpensClicksChartGroupCaption"},
							"items": [],
							"collapsedchanged": {"bindTo": "openClicksGroupCollapsedChanged"},
							"controlConfig": {
								"collapsed": false,
								"visible": {
									"bindTo": "IsAnalysisVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "ClicksAnalysisTab",
						"name": "BulkEmailHyperlinksClicksChartControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.HyperlinksClicksChartControlGroupCaption"},
							"items": [],
							"collapsedchanged": {"bindTo": "hyperlinksClicksGroupCollapsedChanged"},
							"controlConfig": {
								"collapsed": false,
								"visible": {
									"bindTo": "isBulkEmailHyperlinksClicksChartVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsTab",
						"name": "BulkEmailNotDeliveredChartControlGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.NotDeliveredChartGroupCaption"},
							"items": [],
							"collapsedchanged": {"bindTo": "notDeliveredChartGroupCollapsedChanged"},
							"controlConfig": {
								"collapsed": false,
								"visible": {
									"bindTo": "IsAnalysisVisible"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailNotDeliveredChartControlGroup",
						"propertyName": "items",
						"name": "BulkEmailNotDeliveredChartGridLayout",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailNotDeliveredChartGridLayout",
						"propertyName": "items",
						"name": "BulkEmailCanceledChartContainer",
						"values": {
							"id": "BulkEmailCanceledChartContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"selectors": {
								"el": "#BulkEmailCanceledChartContainer",
								"wrapEl": "#BulkEmailCanceledChartContainer"
							},
							"afterrerender": {"bindTo": "_loadCanceledChart"},
							"afterrender": {"bindTo": "_loadCanceledChart"},
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailCanceledChartContainer",
						"propertyName": "items",
						"name": "BulkEmailCanceledChartEmptyDataGridLayout",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"classes": {
								"wrapClassName": ["no-data-image"]
							},
							"visible": {bindTo: "isCanceledChartEmpty"}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailCanceledChartEmptyDataGridLayout",
						"propertyName": "items",
						"name": "BulkEmailCanceledChartContainerImage",
						"values": {
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getEmptyChartDataImage"
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailCanceledChartEmptyDataGridLayout",
						"name": "BulkEmailCanceledChartEmptyDataImageLabel",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.MultilineLabel",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getCanceledBlankSlatesCaption"
							},
							"contentVisible": true
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailNotDeliveredChartGridLayout",
						"propertyName": "items",
						"name": "BulkEmailNotDeliveredChartContainer",
						"values": {
							"id": "BulkEmailNotDeliveredChartContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"selectors": {
								"el": "#BulkEmailNotDeliveredChartContainer",
								"wrapEl": "#BulkEmailNotDeliveredChartContainer"
							},
							"afterrerender": {"bindTo": "_loadNotDeliveredChart"},
							"afterrender": {"bindTo": "_loadNotDeliveredChart"},
							"items": [],
							"layout": {
								"column": 13,
								"row": 0,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailNotDeliveredChartContainer",
						"propertyName": "items",
						"name": "BulkEmailNotDeliveredChartEmptyDataGridLayout",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"classes": {
								"wrapClassName": ["no-data-image"]
							},
							"visible": {bindTo: "isNotDeliveredChartEmpty"}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailNotDeliveredChartEmptyDataGridLayout",
						"propertyName": "items",
						"name": "BulkEmailNotDeliveredChartContainerImage",
						"values": {
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getEmptyChartDataImage"
						}
					},
					{
						"operation": "insert",
						"name": "BulkEmailNotDeliveredChartControlGroupLabel",
						"parentName": "BulkEmailNotDeliveredChartEmptyDataGridLayout",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.MultilineLabel",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getNotDeliveredBlankSlatesCaption"
							},
							"contentVisible": true
						}
					},
					{
						"operation": "insert",
						"name": "AudienceBlankSlatesLayout",
						"parentName": "SendingTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"visible": {
								"bindTo": "IsBlankSlatesAudienceVisible"
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "AudienceBlankSlatesLayout",
						"name": "AudienceBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"markerValue": "AudienceBlankSlatesContainer",
							"id": "AudienceBlankSlatesContainer",
							"selectors": {"wrapEl": "#AudienceBlankSlatesContainer"},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["bulk-email-blank-slates-container"],
							"layout": {"column": 0, "row": 0, "rowSpan": 6, "colSpan": 24},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "AudienceBlankSlatesImage",
						"parentName": "AudienceBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getBlankSlatesImage",
							"classes": {
								"wrapClass": ["not-selected-image"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "AudienceBlankSlatesLabel",
						"parentName": "AudienceBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.MultilineLabel",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getAudienceBlankSlatesCaption"
							},
							"contentVisible": true,
							"classes": {
								"multilineLabelClass": ["description-label"],
								"wrapClass": ["description-container"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "ClicksAnalysisBlankSlatesLayout",
						"parentName": "ClicksAnalysisTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": [],
							"visible": {
								"bindTo": "IsAnalysisVisible",
								"bindConfig": {"converter": "isAnalysisUnvisible"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "ClicksAnalysisBlankSlatesLayout",
						"name": "ClicksAnalysisBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"markerValue": "ClicksAnalysisBlankSlatesContainer",
							"id": "ClicksAnalysisBlankSlatesContainer",
							"selectors": {"wrapEl": "#ClicksAnalysisBlankSlatesContainer"},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"layout": {"column": 0, "row": 0, "rowSpan": 6, "colSpan": 24},
							"wrapClass": ["bulk-email-blank-slates-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ClicksAnalysisBlankSlatesImage",
						"parentName": "ClicksAnalysisBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getBlankSlatesImage",
							"classes": {
								"wrapClass": ["not-selected-image"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "ClicksAnalysisBlankSlatesLabel",
						"parentName": "ClicksAnalysisBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.MultilineLabel",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getClicksAnalysisBlankSlatesCaption"
							},
							"contentVisible": true,
							"classes": {
								"multilineLabelClass": ["description-label"],
								"wrapClass": ["description-container"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "AnalyticsBlankSlatesLayout",
						"parentName": "AnalyticsTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": [],
							"visible": {
								"bindTo": "IsAnalysisVisible",
								"bindConfig": {"converter": "isAnalysisUnvisible"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "AnalyticsBlankSlatesLayout",
						"name": "AnalyticsBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"markerValue": "AnalyticsBlankSlatesContainer",
							"id": "AnalyticsBlankSlatesContainer",
							"selectors": {"wrapEl": "#AnalyticsBlankSlatesContainer"},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"layout": {"column": 0, "row": 0, "rowSpan": 6, "colSpan": 24},
							"wrapClass": ["bulk-email-blank-slates-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "AnalyticsBlankSlatesImage",
						"parentName": "AnalyticsBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"onPhotoChange": Terrasoft.emptyFn,
							"getSrcMethod": "getBlankSlatesImage",
							"classes": {
								"wrapClass": ["not-selected-image"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "AnalyticsBlankSlatesLabel",
						"parentName": "AnalyticsBlankSlatesContainer",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.MultilineLabel",
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "getAnalyticsBlankSlatesCaption"
							},
							"contentVisible": true,
							"classes": {
								"multilineLabelClass": ["description-label"],
								"wrapClass": ["description-container"]
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "ClicksAnalysisTab",
						"propertyName": "items",
						"name": "BulkEmailHyperlink",
						"values": {
							itemType: this.Terrasoft.ViewItemType.DETAIL,
							"visible": {
								"bindTo": "IsAnalysisVisible"
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailHyperlinksClicksChartControlGroup",
						"propertyName": "items",
						"name": "BulkEmailHyperlinkClicksChartContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"id": "BulkEmailHyperlinkClicksChartContainer",
							"selectors": {
								"el": "#BulkEmailHyperlinkClicksChartContainer",
								"wrapEl": "#BulkEmailHyperlinkClicksChartContainer"
							},
							"afterrerender": {"bindTo": "loadHyperlinksClicksChart"},
							"afterrender": {"bindTo": "loadHyperlinksClicksChart"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailOpensClicksChartControlGroup",
						"propertyName": "items",
						"name": "BulkEmailOpensClicksChartContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"id": "BulkEmailOpensClicksChartContainer",
							"selectors": {
								"el": "#BulkEmailOpensClicksChartContainer",
								"wrapEl": "#BulkEmailOpensClicksChartContainer"
							},
							"afterrerender": {"bindTo": "loadOpensClicksChart"},
							"afterrender": {"bindTo": "loadOpensClicksChart"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailIndicators",
						"propertyName": "items",
						"name": "BulkEmailIndicatorDelivered",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["indicator-container"]
							}
						},
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailIndicators",
						"propertyName": "items",
						"name": "BulkEmailIndicatorOpens",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["indicator-container"]
							}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailIndicators",
						"propertyName": "items",
						"name": "BulkEmailIndicatorClicks",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["indicator-container"]
							}
						},
						"index": 2
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailIndicators",
						"propertyName": "items",
						"name": "BulkEmailIndicatorUnsubscribe",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["indicator-container"]
							}
						},
						"index": 3
					},
					{
						"operation": "insert",
						"parentName": "BulkEmailIndicators",
						"propertyName": "items",
						"name": "BulkEmailIndicatorSpam",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {
								"wrapClassName": ["indicator-container"]
							}
						},
						"index": 4
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "EditTemplateButton",
						"values": {
							itemType: this.Terrasoft.ViewItemType.BUTTON,
							caption: {bindTo: "EditTemplateActionCaption"},
							classes: {textClass: "actions-button-margin-right"},
							click: {bindTo: "editTemplate"},
							enabled: {bindTo: "IsTemplateEditable"},
							style: Terrasoft.controls.ButtonEnums.style.BLUE,
							visible: {bindTo: "IsMarketingContentBuilderWizardEnabled"},
							markerValue: "EditTemplate"
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "SendTestEmail",
						"values": {
							itemType: Terrasoft.ViewItemType.BUTTON,
							caption: {bindTo: "SendTestEmailActionCaption"},
							classes: {textClass: "actions-button-margin-right"},
							click: {bindTo: "onSendTestEmailAction"},
							style: Terrasoft.controls.ButtonEnums.style.WHITE,
							visible: {bindTo: "IsSendTestEmailVisible"}
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "SendButton",
						"values": {
							itemType: Terrasoft.ViewItemType.BUTTON,
							caption: {bindTo: "SendMailingActionCaption"},
							classes: {textClass: "actions-button-margin-right"},
							click: {bindTo: "runMandrillMassMailing"},
							style: Terrasoft.controls.ButtonEnums.style.GREEN,
							visible: {bindTo: "IsRunDisplayed"},
							tips: []
						}
					},
					{
						"operation": "insert",
						"parentName": "SendButton",
						"propertyName": "tips",
						"name": "SendMailingActionHint",
						"values": {
							"content": {"bindTo": "Resources.Strings.SendMailingActionHint"},
							"enabled": {"bindTo": "isTooltipEnabled"},
							"tools": []
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "BreakButton",
						"values": {
							itemType: Terrasoft.ViewItemType.BUTTON,
							caption: {bindTo: "Resources.Strings.BreakMandrillMassMailingActionCaption"},
							classes: {textClass: "actions-button-margin-right"},
							click: {bindTo: "breakMailingAction"},
							style: Terrasoft.controls.ButtonEnums.style.GREEN,
							visible: {bindTo: "IsBreakEnabled"}
						}
					},
					{
						"operation": "insert",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"name": "SettingsTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.SettingsTabCaption"
							},
							"items": []
						},
						"index": 2
					},
					{
						"operation": "insert",
						"parentName": "SettingsTab",
						"name": "SettingsTabContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "SettingsTabContainer",
						"name": "CommonSettingsContainerGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "CommonSettingsContainerGroup",
						"name": "CommonSettingsGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Type",
						"values": {
							"contentType": Terrasoft.ContentType.ENUM,
							"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1},
							"enabled": {"bindTo": "IsBulkEmailTypeEnabled"}
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "Owner",
						"values": {
							"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1},
							"controlConfig": {
								"enabled": {bindTo: "IsRunEnabled"}
							}
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "Campaign",
						"values": {
							"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 1},
							"controlConfig": {
								"enabled": false
							}
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SendStartDate",
						"values": {
							"layout": {"column": 12, "row": 1, "colSpan": 12, "rowSpan": 1},
							"controlConfig": {
								"enabled": false
							}
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "SendDueDate",
						"values": {
							"layout": {"column": 12, "row": 0, "colSpan": 12, "rowSpan": 1},
							"controlConfig": {
								"enabled": false
							}
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "DurationBulkEmail",
						"values": {
							"caption": {bindTo: "Resources.Strings.DurationBulkEmailCaption"},
							"layout": {"column": 12, "row": 2, "colSpan": 12, "rowSpan": 1},
							"enabled": false,
							"value": {
								bindTo: "calculateDurationBulkEmail"
							},
							dataValueType: Terrasoft.DataValueType.TEXT
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"parentName": "SettingsTabContainer",
						"name": "UtmTabContainerGroup",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {bindTo: "Resources.Strings.UtmGroupCaption"},
							items: []
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmTabContainerGroup",
						"name": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UseUtm",
						"values": {
							"bindTo": "UseUtm",
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmCheckBoxEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "Domains",
						"values": {
							"layout": {"column": 0, "row": 1, "colSpan": 24},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							},
							"tip": {
								"content": {"bindTo": "Resources.Strings.DomainsHint"},
								"displayMode": Terrasoft.controls.TipEnums.displayMode.WIDE
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UtmSource",
						"values": {
							"layout": {"column": 0, "row": 2, "colSpan": 12},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UtmTerm",
						"values": {
							"layout": {"column": 12, "row": 2, "colSpan": 12},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UtmCampaign",
						"values": {
							"layout": {"column": 0, "row": 3, "colSpan": 12},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UtmContent",
						"values": {
							"layout": {"column": 12, "row": 3, "colSpan": 12},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "UtmSettingPageGridLayout",
						"propertyName": "items",
						"name": "UtmMedium",
						"values": {
							"layout": {"column": 0, "row": 4, "colSpan": 12},
							"controlConfig": {
								"enabled": {bindTo: "IsUtmEnabled"}
							}
						}
					},
					{
						"operation": "insert",
						"name": "SplitTest",
						"values": {
							"layout": {"column": 0, "row": 3, "colSpan": 12, "rowSpan": 1},
							"controlConfig": {
								"enabled": false
							},
							dataValueType: Terrasoft.DataValueType.LOOKUP
						},
						"parentName": "CommonSettingsGridLayout",
						"propertyName": "items"
					}
				]/**SCHEMA_DIFF*/,
				rules: {
					"Domains": {
						"BindParameterRequiredUtmDomains": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.REQUIRED,
							"conditions": [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "UseUtm"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: true
									}
								}
							]
						}
					},
					"UtmSource": {
						"BindParameterRequiredUtmSource": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.REQUIRED,
							"conditions": [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "UseUtm"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: true
									}
								}
							]
						}
					},
					"UtmMedium": {
						"BindParameterRequiredUtmMedium": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.REQUIRED,
							"conditions": [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "UseUtm"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: true
									}
								}
							]
						}
					},
					"UtmCampaign": {
						"BindParameterRequiredUtmCampaign": {
							"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
							"property": BusinessRuleModule.enums.Property.REQUIRED,
							"conditions": [
								{
									leftExpression: {
										type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
										attribute: "UseUtm"
									},
									comparisonType: Terrasoft.core.enums.ComparisonType.EQUAL,
									rightExpression: {
										type: BusinessRuleModule.enums.ValueType.CONSTANT,
										value: true
									}
								}
							]
						}
					}
				}
			};
		});


