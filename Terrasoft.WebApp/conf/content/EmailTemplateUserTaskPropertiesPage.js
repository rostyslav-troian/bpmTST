Terrasoft.configuration.Structures["EmailTemplateUserTaskPropertiesPage"] = {innerHierarchyStack: ["EmailTemplateUserTaskPropertiesPage"], structureParent: "BaseActivityUserTaskPropertiesPage"};
define('EmailTemplateUserTaskPropertiesPageStructure', ['EmailTemplateUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'562c3d08-766b-4c9c-8112-177d266d63e7',schemaCaption: "Properties page of email template user task", parentSchemaName: "BaseActivityUserTaskPropertiesPage", schemaName:'EmailTemplateUserTaskPropertiesPage',parentSchemaUId:'29d2ae27-fd0e-4847-acbc-58d964011393',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseActivityUserTaskPropertiesPage
 */
define("EmailTemplateUserTaskPropertiesPage", ["terrasoft", "ProcessUserTaskConstants", "BusinessRuleModule",
		"AcademyUtilities", "ProcessSchemaUserTaskUtilities", "MailboxSyncSettings",
		"EmailTemplateMLangContentBuilderEnumsModule", "NetworkUtilities", "EmailPropertiesPageMixin",
		"ProcessEmailContentBuilder"],
function(Terrasoft, ProcessUserTaskConstants, BusinessRuleModule, AcademyUtilities, ProcessSchemaUserTaskUtilities,
		MailboxSyncSettings, EmailTemplateMLangContentBuilderEnumsModule, NetworkUtilities) {
	return {

		messages: {
			"CloseEmailTemplateBuilder": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"SetEmailTemplateData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"GetEmailTemplateData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		mixins: {
			EmailPropertiesPageMixin: "Terrasoft.EmailPropertiesPageMixin"
		},

		attributes: {
			/**
			 * Sender.
			 * @protected
			 * @type {Terrasoft.DataValueType.MAPPING}
			 */
			"Sender": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initPropertySilent",
				isRequired: true,
				doAutoSave: true
			},

			/**
			 * Email template.
			 * @protected
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"EmailTemplateId": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				doAutoSave: true
			},

			/**
			 * Email template preview body.
			 * @protected
			 * @type {Terrasoft.DataValueType.TEXT}
			 */
			"PreviewBody": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Email user template preview body.
			 * @protected
			 * @type {Terrasoft.DataValueType.TEXT}
			 */
			"TemplateBody": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "setPreviewBody"
			},

			/**
			 * Body template type.
			 * @protected
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"BodyTemplateType": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				onChange: "onBodyTemplateTypeChange",
				initMethod: "initBodyTemplateType",
				doAutoSave: true
			},

			/**
			 * Email template entity.
			 * @protected
			 * @type {Terrasoft.DataValueType.MAPPING}
			 */
			"EmailTemplateEntityId": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initEmailTemplateEntityId",
				doAutoSave: true
			},

			/**
			 * Subject.
			 * @protected
			 * @type {Terrasoft.DataValueType.MAPPING}
			 */
			"Subject": {
				dataValueType: this.Terrasoft.DataValueType.MAPPING,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initPropertySilent",
				doAutoSave: true,
				onChange: "onSubjectChange"
			},

			/**
			 * Send email type.
			 * @protected
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"SendEmailType": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				initMethod: "initSendEmailType",
				doAutoSave: true
			},

			/**
			 * Importance.
			 * @protected
			 * @type {Terrasoft.DataValueType.LOOKUP}
			 */
			"Importance": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initImportance",
				doAutoSave: true
			},

			/**
			 * Flag that indicates if is ignore errors.
			 * @protected
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			"IgnoreErrors": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initProperty",
				doAutoSave: true
			},

			/**
			 * Collection viewModel's controls for list of recipient.
			 */
			"Recipient": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true,
				"value": this.Ext.create("Terrasoft.ObjectCollection")
			},

			/**
			 * Collection viewModel's controls for list of copy recipient.
			 */
			"CopyRecipient": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true,
				"value": this.Ext.create("Terrasoft.ObjectCollection")
			},

			/**
			 * Collection viewModel's controls for list of blind copy recipient.
			 */
			"BlindCopyRecipient": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isCollection": true,
				"value": this.Ext.create("Terrasoft.ObjectCollection")
			},

			/**
			 * Parameter, which indicates the copy recipient label is visible or hidden.
			 */
			"IsCopyRecipientVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},

			/**
			 * Sign if email template academy link is visible.
			 */
			"IsEmailTemplateAcademyLinkVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},

			/**
			 * Sign if open email template button is visible.
			 */
			"IsOpenEmailTemplateButtonVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},

			/**
			 * Parameter, which indicates the blind copy recipient label is visible or hidden.
			 */
			"IsBlindCopyRecipientVisible": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},

			/**
			 * Parameter, which indicates the content builder visible or hidden.
			 */
			"IsContentBuilderVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},

			/**
			 * Email template  body.
			 * @protected
			 * @type {Terrasoft.DataValueType.TEXT}
			 */
			"Body": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initPropertySilent",
				doAutoSave: true,
				onChange: "setPreviewBody",
				skipValidation: true
			},

			/**
			 * Email template body config.
			 * @protected
			 * @type {Terrasoft.DataValueType.TEXT}
			 */
			"BodyConfig": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				initMethod: "initPropertySilent",
				doAutoSave: true,
				skipValidation: true,
				forceRemove: true
			},

			/**
			 * Parameter, which indicates is email template entity visible or hidden.
			 * @private
			 * @type {Boolean}
			 */
			"IsEmailTemplateEntityIdVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Email template academy page url.
			 */
			"EmailTemplateAcademyUrl": {
				dataValueType: this.Terrasoft.DataValueType.TEXT
			}
		},

		rules: {
			"EmailTemplateId": {
				"RequiredEmailTemplateIdByBodyTemplateType": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "BodyTemplateType"
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": ProcessUserTaskConstants.BODY_TEMPLATE_TYPE.EmailTemplate
						}
					}]
				}
			},
			"Subject": {
				"RequiredSubjectByBodyTemplateType": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [{
						"leftExpression": {
							"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
							"attribute": "BodyTemplateType"
						},
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"rightExpression": {
							"type": BusinessRuleModule.enums.ValueType.CONSTANT,
							"value": ProcessUserTaskConstants.BODY_TEMPLATE_TYPE.ProcessTemplate
						}
					}]
				}
			}
		},

		modules: {
			"ContentBuilderBody": {
				"config": {
					"schemaName": "ProcessEmailContentBuilder",
					"isSchemaConfigInitialized": true,
					"useHistoryState": false,
					"showMask": true,
					"autoGeneratedContainerSuffix": "-content-builder-body",
					"parameters": {
						"viewModelConfig": {}
					}
				}
			}
		},

		methods: {

			//region Methods: Protected

			/**
			 * Subject change handler.
			 * @protected
			 * @param model View model.
			 * @param subject Subject attribute.
			 */
			onSubjectChange: function(model, subject) {
				var previousSubject = model.previous("Subject");
				var isTemplateSubject = previousSubject && subject
					&& previousSubject.displayValue === subject.displayValue
					&& previousSubject.value !== subject.value
					&& previousSubject.value === null;
				if (isTemplateSubject) {
					subject.value = null;
				}
			},

			/**
			 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
			 * @override
			 */
			getParameterReferenceSchemaUId: function(elementParameter) {
				var referenceSchemaUId;
				if (elementParameter.name === "EmailTemplateEntityId") {
					var entityId = this.get("EmailTemplateEntityId");
					referenceSchemaUId = entityId ? entityId.referenceSchemaUId : null;
				} else {
					referenceSchemaUId = MailboxSyncSettings.uId;
				}
				return referenceSchemaUId;
			},

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @overridden
			 */
			onElementDataLoad: function(element, callback, scope) {
				this.callParent([element, function() {
					this.initEmailTemplate(element, callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#initParameters
			 * @protected
			 * @overridden
			 */
			initParameters: function(element) {
				this.callParent(arguments);
				var emailRecipientType = ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE;
				this.initRecipients(element, emailRecipientType.To);
				this.initRecipients(element, emailRecipientType.Cc);
				this.initRecipients(element, emailRecipientType.Bcc);
				this.addDefaultRecipient();
				this.setPreviewBody();
				this.initEmailTemplateAcademyUrl();
			},

			/**
			 * Sets academy page url for email panel.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			initEmailTemplateAcademyUrl: function() {
				var config = {
					contextHelpCode: "EmailTemplateUserTaskPropertiesPage"
				};
				config.callback = function(url) {
					this.setEmailTemplateAcademyUrl(url);
				}.bind(this);
				AcademyUtilities.getUrl(config);
			},

			/**
			 * Sets email template academy page url to EmailTemplateAcademyUrl attribute.
			 * @protected
			 * @param {String} url Academy page url.
			 */
			setEmailTemplateAcademyUrl: function(url) {
				this.set("EmailTemplateAcademyUrl", url);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#saveParameters
			 * @overridden
			 */
			saveParameters: function(element) {
				this.setDefaultValuesUnusedAttributes();
				var emailRecipientType = ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE;
				this.saveRecipients(element, emailRecipientType.To);
				this.saveRecipients(element, emailRecipientType.Cc);
				this.saveRecipients(element, emailRecipientType.Bcc);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#getParameterSourceValue
			 * @overridden
			 */
			getParameterSourceValue: function(parameter) {
				var sourceValue = this.callParent(arguments);
				if (this.getShouldActualizeSource(sourceValue, parameter.dataValueType)) {
					sourceValue.source = Terrasoft.ProcessSchemaParameterValueSource.None;
				}
				return sourceValue;
			},

			/**
			 * Returns the value indicating whether parameter value should be set to 'None'.
			 * @private
			 * @param {Object} sourceValue Source of the parameter value.
			 * @param {Terrasoft.DataValueType} dataValueType Parameter data value type.
			 * @return {Boolean}
			 */
			getShouldActualizeSource: function(sourceValue, dataValueType) {
				return Terrasoft.isLookupDataValueType(dataValueType)
					&& sourceValue.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue
					&& Ext.isEmpty(sourceValue.value);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Sender", this.senderValidator);
				this.addColumnValidator("Recipient", this.recipientValidator);
				this.addColumnValidator("Subject", this._subjectValidator);
				this.addColumnValidator("EmailTemplateEntityId", this.emailTemplateEntityValidator);
			},

			/**
			 * @inheritdoc Terrasoft.BaseActivityUserTaskPropertiesPage#getVisibleActivityCategory
			 * @overridden
			 */
			getIsActivityTaskVisible: function() {
				return this.getIsManualTypeSendEmailSelected();
			},

			/**
			 * Returns email template columns
			 * @protected
			 * @return {string[]}
			 */
			getEmailTemplateColumns: function() {
				return ["Name", "Body", "Object", "Subject"];
			},

			/**
			 * Sets email template attribute.
			 * @protected
			 * @param {String} emailTemplateId The unique identifier of the email template entity.
			 * @param {Function} [callback] Callback function.
			 * @param {Terrasoft.model.BaseViewModel} callback.item Item.
			 * @param {Object} [scope] Callback function context.
			 */
			setEmailTemplateAttribute: function(emailTemplateId, callback, scope) {
				this._getEmailTemplateEntity(emailTemplateId, function(emailTemplateEntity) {
					if (emailTemplateEntity) {
						this.updateEmailTemplateMapping(emailTemplateEntity);
					}
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Open email template page.
			 * @protected
			 */
			openEmailTemplate: function() {
				var recordId = this.get("EmailTemplateId").value;
				if(Terrasoft.Features.getIsEnabled("MultiLanguageContentBuilderEnabled")) {
					this.openMultilingualContentBuilder(recordId);
				} else {
					NetworkUtilities.openEntityWindow({
						entitySchemaName: "EmailTemplate",
						operation: "edit",
						primaryColumnValue: recordId
					});
				}
			},

			/**
			 * Updates email template mapping.
			 * @protected
			 * @param {Terrasoft.model.BaseViewModel} emailTemplate Email template entity.
			 */
			updateEmailTemplateMapping: function(emailTemplate) {
				var referenceSchemaUId = emailTemplate.getLookupValue("Object", true);
				this._initEmailTemplateEntityIdMapping(referenceSchemaUId);
				this._initEmailTemplateIdMapping(emailTemplate);
				this._initSubjectMapping(emailTemplate.get("Subject"));
				this.set("TemplateBody", emailTemplate.get("Body"));
				this.set("IsEmailTemplateEntityIdVisible", !Ext.isEmpty(referenceSchemaUId));
			},

			/**
			 * Init body email type.
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Process parameter.
			 * @protected
			 */
			initBodyTemplateType: function(parameter) {
				var bodyTemplateTypeConfig = this.getBodyTemplateTypeConfig();
				this.initLookupAttribute(parameter, bodyTemplateTypeConfig, null);
			},

			/**
			 * Init send email type.
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Process parameter.
			 * @protected
			 */
			initSendEmailType: function(parameter) {
				var sendEmailTypeConfig = this.getSendEmailTypeConfig();
				this.initLookupAttribute(parameter, sendEmailTypeConfig, null);
			},

			/**
			 * Init email template entity.
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Process parameter.
			 * @protected
			 */
			initEmailTemplateEntityId: function(parameter) {
				this.initProperty(parameter);
				this.setMappingEditValue("EmailTemplateEntityId", {
					isLookupEnabled: false
				});
			},

			/**
			 * Init recipients.
			 * @protected
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element User task element.
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 */
			initRecipients: function(element, emailRecipientType) {
				var recipientList = this.get(emailRecipientType);
				recipientList.clear();
				var parameters = this.findRecipientParameters(element, emailRecipientType);
				parameters.each(function(parameter) {
					this.addRecipient(emailRecipientType, parameter);
				}, this);
			},

			/**
			 * Adds default recipient.
			 * @protected
			 */
			addDefaultRecipient: function() {
				var recipientType = ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.To;
				var recipientList = this.get(recipientType);
				if (recipientList.isEmpty()) {
					this.addRecipient(recipientType);
				}
			},

			/**
			 * Saves recipients parameters.
			 * @protected
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element User task element.
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 */
			saveRecipients: function(element, emailRecipientType) {
				var viewModelList = this.get(emailRecipientType);
				viewModelList.each(function(viewModel) {
					var name = viewModel.get("Name");
					var parameter = element.findParameterByName(name);
					var mappingValue = viewModel.get("Value");
					parameter.setMappingValue(mappingValue);
					if (this.Ext.isEmpty(mappingValue.value)) {
						this.removeRecipient(parameter, emailRecipientType);
					}
				}, this);
				this.setVisibleRecipientTitle(emailRecipientType);
			},

			/**
			 * Creates recipient parameter.
			 * @protected
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 * @return {Terrasoft.ProcessSchemaParameter}
			 */
			createRecipientParameter: function(emailRecipientType) {
				var processElement = this.get("ProcessElement");
				var parameterMetaData = this.getRecipientParameterConfig(emailRecipientType);
				var elementParameter = Ext.create("Terrasoft.ProcessSchemaParameter", parameterMetaData);
				elementParameter.processFlowElementSchema = processElement;
				processElement.parameters.add(elementParameter.uId, elementParameter);
				return elementParameter;
			},

			/**
			 * Returns config for create recipient parameter.
			 * @protected
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 * @return {Object}
			 */
			getRecipientParameterConfig: function(emailRecipientType) {
				var processElement = this.get("ProcessElement");
				var parentSchema = processElement.parentSchema;
				var processSchemaUId = parentSchema.uId;
				var parameters = processElement.parameters;
				var name = this.generateRecipientName(parameters, emailRecipientType);
				var caption = this.generateRecipientCaption(parameters, emailRecipientType);
				return {
					uId: Terrasoft.generateGUID(),
					caption: Ext.create("Terrasoft.LocalizableString", {
						cultureValues: caption
					}),
					createdInSchemaUId: processSchemaUId,
					modifiedInSchemaUId: processSchemaUId,
					name: name,
					dataValueType: Terrasoft.DataValueType.MAXSIZE_TEXT,
					sourceValue: {
						source: Terrasoft.ProcessSchemaParameterValueSource.None
					}
				};
			},

			/**
			 * Sets default values for unused attributes.
			 * @protected
			 */
			setDefaultValuesUnusedAttributes: function() {
				var bodyTemplateType = this.get("BodyTemplateType") || {};
				if (bodyTemplateType.value === ProcessUserTaskConstants.BODY_TEMPLATE_TYPE.ProcessTemplate) {
					this.clearEmailTemplateAttribute();
				}
				var sendEmailType = this.get("SendEmailType") || {};
				if (sendEmailType.value === ProcessUserTaskConstants.SEND_EMAIL_TYPE.Auto) {
					this.set("InformationOnStep", null);
					this.clearActivityConnection();
				} else {
					var importanceConfig = this.getImportanceConfig();
					var importance = Terrasoft.findWhere(importanceConfig, {
						value: ProcessUserTaskConstants.EMAIL_IMPORTANCE.Normal
					});
					this.setMappingEditValue("Importance", importance);
				}
			},

			/**
			 * Returns scale of preview email template.
			 * @protected
			 * @return {Number}
			 */
			getPreviewScale: function() {
				var contentSheetWidth = 750;
				var schemaDesignerPropertiesWidth = 356;
				var schemaDesignerPropertiesPadding = 56;
				return (schemaDesignerPropertiesWidth  - schemaDesignerPropertiesPadding) / contentSheetWidth;
			},

			/**
			 * Returns EntitySchemaQuery for schema EmailTemplate.
			 * @protected
			 */
			setOpenEmailTemplateButtonVisibility: function() {
				var emailTemplateId = this.get("EmailTemplateId");
				if (emailTemplateId) {
					this.set("IsOpenEmailTemplateButtonVisible", true);
					return;
				}
				var processElement = this.get("ProcessElement");
				var emailTemplateParameter = processElement.getParameterByName("EmailTemplateId");
				emailTemplateId = emailTemplateParameter.sourceValue;
				this.set("IsOpenEmailTemplateButtonVisible",
					!Ext.isEmpty(emailTemplateId) && !Ext.isEmpty(emailTemplateId.value));
			},

			/**
			 * Returns EntitySchemaQuery for schema EmailTemplate.
			 * @protected
			 */
			setEmailTemplateAcademyLinkVisibility: function() {
				var emailTemplateId = this.get("EmailTemplateId");
				if (!emailTemplateId) {
					var processElement = this.get("ProcessElement");
					var emailTemplateParameter = processElement.getParameterByName("EmailTemplateId");
					emailTemplateId = emailTemplateParameter.sourceValue;
				}
				if (!emailTemplateId || !emailTemplateId.value || !Terrasoft.isGUID(emailTemplateId.value)) {
					return;
				}
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "EmailTemplateLang"
				});
				esq.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "Count");
				esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "EmailTemplate", emailTemplateId.value));
				esq.getEntityCollection(function(response) {
					if (response.success) {
						this.set("IsEmailTemplateAcademyLinkVisible",
							response.collection.getByIndex(0).get("Count") > 0);
					}
				}, this);
			},

			/**
			 * Open multilingual content builder for template.
			 * @param recordId {String} Id of template.
			 * @protected
			 */
			openMultilingualContentBuilder: function(recordId) {
				var mode = EmailTemplateMLangContentBuilderEnumsModule.ContentBuilderMode.EMAILTEMPLATE;
				var url = EmailTemplateMLangContentBuilderEnumsModule.getContentBuilderUrl(mode, recordId);
				window.open(url);
			},

			//endregion

			//region Methods: Private

			/**
			 * Email template entity validator.
			 * @private
			 * @param {Object} mappingValue Mapping.
			 * @param {String} mappingValue.value Mapping value
			 * @param {String} mappingValue.displayValue Mapping display value.
			 * @return {Object} Validation info.
			 */
			emailTemplateEntityValidator: function(mappingValue) {
				var validationInfo = {
					invalidMessage: ""
				};
				if (this.get("IsEmailTemplateEntityIdVisible")) {
					validationInfo = ProcessSchemaUserTaskUtilities.validateMappingValue(mappingValue);
				}
				return validationInfo;
			},

			/**
			 * Sender validator.
			 * @private
			 * @param {Object} mappingValue Mapping.
			 * @param {String} mappingValue.value Mapping value
			 * @param {String} mappingValue.displayValue Mapping display value.
			 * @return {Object} Validation info.
			 */
			senderValidator: function(mappingValue) {
				var validationInfo = {
					invalidMessage: ""
				};
				if (this.getIsAutoTypeSendEmailSelected()) {
					validationInfo = ProcessSchemaUserTaskUtilities.validateMappingValue(mappingValue);
				}
				return validationInfo;
			},

			/**
			 * Recipient validator
			 * @private
			 * @param {Terrasoft.ObjectCollection} collection Collection of recipients.
			 * @return {Object} Validation info.
			 */
			recipientValidator: function(collection) {
				var isValid = !collection.isEmpty();
				if (isValid) {
					collection.each(function(item) {
						isValid = item.validate();
						return !isValid;
					}, this);
				}
				var message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
				return {
					isValid: isValid,
					invalidMessage: isValid ? "" : message
				};
			},

			/**
			 * Clears activity connection.
			 * @private
			 */
			clearActivityConnection: function() {
				var viewModels = this.get("ActivityConnectionViewModels");
				viewModels.each(function(viewModel) {
					viewModel.setMappingEditValue("Value", {
						value: null,
						displayValue: null,
						source: Terrasoft.ProcessSchemaParameterValueSource.None
					});
				}, this);
			},

			/**
			 * Returns type template config.
			 * @private
			 * @return {Object}
			 */
			getBodyTemplateTypeConfig: function() {
				var bodyTemplateType = ProcessUserTaskConstants.BODY_TEMPLATE_TYPE;
				var config = {};
				config[bodyTemplateType.EmailTemplate] = {
					value: bodyTemplateType.EmailTemplate,
					displayValue: this.get("Resources.Strings.TemplateMessageCaption")
				};
				config[bodyTemplateType.ProcessTemplate] = {
					value: bodyTemplateType.ProcessTemplate,
					displayValue: this.get("Resources.Strings.UserMessageCaption")
				};
				return config;
			},

			/**
			 * Returns send type config.
			 * @private
			 * @return {Object}
			 */
			getSendEmailTypeConfig: function() {
				var sendEmailType = ProcessUserTaskConstants.SEND_EMAIL_TYPE;
				var config = {};
				config[sendEmailType.Auto] = {
					value: sendEmailType.Auto,
					displayValue: this.get("Resources.Strings.SendEmailAutoCaption")
				};
				config[sendEmailType.Manual] = {
					value: sendEmailType.Manual,
					displayValue: this.get("Resources.Strings.SendEmailManualCaption")
				};
				return config;
			},

			/**
			 * The event handler for preparing of the data drop-down period.
			 * @private
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			onPrepareEmailTypeList: function(filter, list) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				list.loadAll(this.getBodyTemplateTypeConfig());
			},

			/**
			 * The event handler for preparing of the data drop-down period.
			 * @private
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			onPrepareSendEmailTypeList: function(filter, list) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				list.loadAll(this.getSendEmailTypeConfig());
			},

			/**
			 * Init email template attributes.
			 * @private
			 * @param {Terrasoft.ProcessBaseElementSchema} element Process element.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initEmailTemplate: function(element, callback, scope) {
				var parameter = element.findParameterByName("EmailTemplateId");
				var value = parameter.getValue();
				if (value) {
					this.setEmailTemplateAttribute(value, function() {
						this.initEmailTemplateChangedHandler(callback, scope);
					}, this);
				} else {
					this.initEmailTemplateChangedHandler(callback, scope);
				}
				if (this.getIsFeatureEnabled("EmailTemplateUserTaskMultiLanguageV2")) {
					this.setOpenEmailTemplateButtonVisibility();
					this.setEmailTemplateAcademyLinkVisibility();
				}
			},

			/**
			 * Init email template event changed handler.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initEmailTemplateChangedHandler: function(callback, scope) {
				this.on("change:EmailTemplateId", this.onEmailTemplateChanged, this);
				callback.call(scope);
			},

			/**
			 * Returns EntitySchemaQuery for schema EmailTemplate.
			 * @private
			 * @param {Array} columns Column name list.
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getEmailTemplateESQ: function(columns) {
				var element = this.get("ProcessElement");
				var emailTemplateId = element.getParameterByName("EmailTemplateId");
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: emailTemplateId.referenceSchemaName
				});
				columns.forEach(function(columnName) {
					esq.addColumn(columnName);
				}, this);
				return esq;
			},

			/**
			 * Returns email template item.
			 * @private
			 * @param {String} emailTemplateId The unique identifier of the email template entity.
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.model.BaseViewModel} callback.entity Entity.
			 * @param {Object} scope Callback function context.
			 */
			_getEmailTemplateEntity: function(emailTemplateId, callback, scope) {
				var columns = this.getEmailTemplateColumns();
				var esq = this.getEmailTemplateESQ(columns);
				esq.getEntity(emailTemplateId, function(response) {
					callback.call(scope, response.entity);
				}, this);
			},

			/**
			 * Returns list of email templates.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getEntityEmailTemplateList: function(callback, scope) {
				var columns = ["Name"];
				var esq = this.getEmailTemplateESQ(columns);
				esq.getEntityCollection(function(response) {
					var entityTemplates = this.Ext.create("Terrasoft.Collection");
					if (response.success) {
						var collection = response.collection;
						collection.each(function(item) {
							var id = item.get("Id");
							var name = item.get("Name");
							entityTemplates.add(id, {
								value: id,
								displayValue: name
							});
						}, this);
					}
					callback.call(scope, entityTemplates);
				}, this);
			},

			/**
			 * The event handler for preparing of the data drop-down of email templates.
			 * @private
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			onPrepareEmailTemplateList: function(filter, list) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				this.getEntityEmailTemplateList(function(entityTemplates) {
					list.loadAll(entityTemplates);
				}, this);
			},

			/**
			 * The event handler for changed email template.
			 * @private
			 * @param {Backbone.Model} model Model.
			 * @param {Object} emailTemplate Current email template.
			 */
			onEmailTemplateChanged: function(model, emailTemplate) {
				var emailTemplateId = emailTemplate && emailTemplate.value;
				if (!emailTemplateId) {
					return;
				}
				this._clearSubject();
				this.setEmailTemplateAttribute(emailTemplateId);
				if (this.getIsFeatureEnabled("EmailTemplateUserTaskMultiLanguageV2")) {
					this.setOpenEmailTemplateButtonVisibility();
					this.setEmailTemplateAcademyLinkVisibility();
				}
			},

			/**
			 * Clears email template attribute.
			 * @private
			 */
			clearEmailTemplateAttribute: function() {
				this.setMappingEditValue("EmailTemplateEntityId", {
					referenceSchemaUId: null,
					displayValue: null,
					value: null,
					source: Terrasoft.ProcessSchemaParameterValueSource.None
				});
				this.clearEmailTemplateId();
			},

			/**
			 * Returns flag that indicates if was selected email template.
			 * @private
			 * @return {Boolean}
			 */
			getIsEmailTemplateSelected: function() {
				var value = this.getLookupValue("BodyTemplateType", true);
				return value === ProcessUserTaskConstants.BODY_TEMPLATE_TYPE.EmailTemplate;
			},

			/**
			 * Opens academy email template page.
			 * @return {Boolean} False value returns to prevent click event propagation.
			 */
			openEmailTemplateAcademyLink: function() {
				var url = this.get("EmailTemplateAcademyUrl");
				var openedWindow = window.open(url, "_blank");
				openedWindow.focus();
				return false;
			},

			/**
			 * Returns flag that indicates if was selected process template.
			 * @private
			 * @return {Boolean}
			 */
			getIsProcessTemplateSelected: function() {
				var value = this.getLookupValue("BodyTemplateType", true);
				return value === ProcessUserTaskConstants.BODY_TEMPLATE_TYPE.ProcessTemplate;
			},

			/**
			 * Returns flag that indicates if Body attribute has value.
			 * @private
			 * @return {Boolean}
			 */
			getHasBody: function() {
				var body = this.get("Body");
				return !Ext.isEmpty(body);
			},

			/**
			 * Returns flag that indicates if Body attribute is Empty.
			 * @private
			 * @return {Boolean}
			 */
			getBodyIsEmpty: function() {
				return !this.getHasBody();
			},

			/**
			 * Returns flag that indicates if was selected body template type.
			 * @private
			 * @return {Boolean}
			 */
			getIsBodyTemplateTypeSelected: function() {
				var value = this.getLookupValue("BodyTemplateType", true);
				return !Ext.isEmpty(value);
			},

			/**
			 * Returns flag that indicates if was selected manual type.
			 * @private
			 * @return {Boolean}
			 */
			getIsManualTypeSendEmailSelected: function() {
				var sendEmailType = this.getLookupValue("SendEmailType", true);
				return sendEmailType === ProcessUserTaskConstants.SEND_EMAIL_TYPE.Manual;
			},

			/**
			 * Returns flag that indicates if was selected auto type.
			 * @private
			 * @return {Boolean}
			 */
			getIsAutoTypeSendEmailSelected: function() {
				var sendEmailType = this.getLookupValue("SendEmailType", true);
				return sendEmailType === ProcessUserTaskConstants.SEND_EMAIL_TYPE.Auto;
			},

			/**
			 * Loads preview module.
			 * @private
			 */
			openPreviewModule: function() {
				var subject = this.get("Subject");
				var html = this.get("PreviewBody");
				var previewWindow = window.open("", "printwin");
				var document = previewWindow.document;
				var title = Ext.String.format("<title>{0}</title>", subject.displayValue);
				/*jshint evil: true */
				document.write(title);
				document.write(html);
				document.close();
				/*jshint evil: false */
			},

			/**
			 * Returns flag that indicates if preview body is visible.
			 * @private
			 * @return {Boolean}
			 */
			getIsPreviewVisible: function() {
				var body = this.get("PreviewBody");
				return this.getIsBodyTemplateTypeSelected() && !Ext.isEmpty(body);
			},

			/**
			 * Returns flag that indicates whether message (Email body is empty) is visible.
			 * @private
			 * @return {Boolean} True if message is visible, else false.
			 */
			getIsBodyMessageVisible: function() {
				return this.getIsProcessTemplateSelected() && this.getBodyIsEmpty();
			},

			/**
			 * Sets preview body.
			 * @private
			 */
			setPreviewBody: function() {
				var isProcessTemplate = this.getIsProcessTemplateSelected();
				var body = isProcessTemplate ? this.get("Body") : this.get("TemplateBody");
				this.set("PreviewBody", body);
			},

			/**
			 * Adds view model to collection of recipient. It creates a parameter if it does not exist.
			 * @private
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 * @param {Terrasoft.ProcessSchemaParameter} [parameter] Parameter.
			 */
			addRecipient: function(emailRecipientType, parameter) {
				var recipientList = this.get(emailRecipientType);
				if (!parameter) {
					parameter = this.createRecipientParameter(emailRecipientType);
				}
				var viewModel = this.createParameterViewModel(parameter);
				viewModel.validate();
				this.prepareRecipientViewModel(viewModel);
				this.addRecipientValidator(viewModel);
				recipientList.add(parameter.name, viewModel);
				this.setVisibleRecipientTitle(emailRecipientType);
			},

			/**
			 * Prepares recipient parameter view model.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.BaseViewModel} viewModel Parameter view model.
			 */
			prepareRecipientViewModel: function(viewModel) {
				this._prepareRecipientDataItemMarker(viewModel);
				viewModel.on("change:Value", this.onRecipientValueChange, this);
				viewModel.getMainRecordMappingConfig = this.getMainRecordMappingConfig;
			},

			/**
			 * Prepares right data item markers for recipient item.
			 * @private
			 * @param {Terrasoft.BaseViewModel} viewModel Parameter view model.
			 */
			_prepareRecipientDataItemMarker: function(viewModel) {
				var parameterName = viewModel.get("Name");
				var dataItemMarker = Ext.String.format("{0}-{1}", parameterName, Terrasoft.generateGUID());
				viewModel.set("DataItemMarker", dataItemMarker);
			},

			/**
			 * On recipient item value cahnge handler.
			 * @private
			 * @param {Object} model Backbone model.
			 * @param {Object} recipientValue Changed value.
			 */
			onRecipientValueChange: function(model, recipientValue) {
				var parameterName = model.get("Name");
				var element = this.get("ProcessElement");
				var parameter = element.findParameterByName(parameterName);
				parameter.dataValueType = recipientValue.dataValueType;
				parameter.source = recipientValue.source;
			},

			/**
			 * Add recipient validator.
			 * @private
			 * @param {Terrasoft.ProcessSchemaParameterViewModel} viewModel View model.
			 */
			addRecipientValidator: function(viewModel) {
				var columnValidationConfig;
				var columnName = "Value";
				var viewModelColumnValidationConfig = viewModel.validationConfig[columnName];
				if (viewModelColumnValidationConfig) {
					columnValidationConfig = viewModelColumnValidationConfig;
				} else {
					columnValidationConfig = [];
					viewModel.validationConfig[columnName] = columnValidationConfig;
				}
				columnValidationConfig.push(ProcessSchemaUserTaskUtilities.validateMappingValue);
			},

			/**
			 * Shows or hides recipient title.
			 * @private
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 */
			setVisibleRecipientTitle: function(emailRecipientType) {
				var recipientList = this.get(emailRecipientType);
				var isRecipientVisible = !recipientList.isEmpty();
				switch (emailRecipientType) {
					case  ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Cc:
						this.set("IsCopyRecipientVisible", isRecipientVisible);
						break;
					case  ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Bcc:
						this.set("IsBlindCopyRecipientVisible", isRecipientVisible);
						break;
					default:
						break;
				}
			},

			/**
			 * Finds recipient parameters.
			 * @private
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element User task element.
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 * @return {*|Terrasoft.Collection}
			 */
			findRecipientParameters: function(element, emailRecipientType) {
				var template = Terrasoft.process.constants.EMAIL_RECIPIENT_PARAMETER_TEMPLATE;
				var pattern = Ext.String.format(template, emailRecipientType);
				var regExp = new RegExp(pattern);
				return element.parameters.filterByFn(function(parameter) {
					return parameter.getIsDynamic() && regExp.test(parameter.name);
				}, this);
			},

			/**
			 * Generates parameter caption for new adds item.
			 * @private
			 * @param {Terrasoft.Collection} collection Collection of parameters.
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 * @return {String} Name of new parameter.
			 */
			generateRecipientCaption: function(collection, emailRecipientType) {
				var prefix;
				switch (emailRecipientType) {
					case ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.To:
						prefix = this.get("Resources.Strings.RecipientCaption");
						break;
					case ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Cc:
						prefix = this.get("Resources.Strings.CopyRecipientCaption");
						break;
					case ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Bcc:
						prefix = this.get("Resources.Strings.BlindCopyRecipientCaption");
						break;
					default:
						prefix = null;
						break;
				}
				prefix += " ";
				return ProcessSchemaUserTaskUtilities.generateItemUniqueName(prefix, collection,
					function(item, caption) {
						var itemCaption = item.caption;
						return itemCaption && itemCaption.getValue() === caption;
					}
				);
			},

			/**
			 * Generates recipient name for new adds item.
			 * @private
			 * @param {Terrasoft.Collection} collection Collection of parameters.
			 * @param {String} prefix Prefix of new item name.
			 * @return {String} Name of new parameter.
			 */
			generateRecipientName: function(collection, prefix) {
				var filterFn = function(item, name) {
					return item.name === name;
				};
				return ProcessSchemaUserTaskUtilities.generateItemUniqueName(prefix, collection, filterFn);
			},

			/**
			 * Removes parameter if it is possible.
			 * @private
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Process parameter.
			 * @return {Boolean}
			 */
			removeParameter: function(parameter) {
				var element = this.get("ProcessElement");
				var process = element.parentSchema;
				var canRemove = false;
				if (process.getAllLazyPropertiesAreLoaded()) {
					var result = process.canRemoveParameter(parameter);
					if (result.canRemove) {
						element.parameters.remove(parameter);
						canRemove = true;
					}
				}
				return canRemove;
			},

			/**
			 * Removes empty recipient.
			 * @private
			 * @param {Terrasoft.manager.ProcessSchemaParameter} parameter Parameter.
			 * @param {ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE} emailRecipientType Email recipient type.
			 */
			removeRecipient: function(parameter, emailRecipientType) {
				var viewModelList = this.get(emailRecipientType);
				var viewModel = viewModelList.get(parameter.name);
				var Type = ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.To;
				if (viewModelList.getCount() > 1 || emailRecipientType !== Type) {
					this.removeParameter(parameter);
					viewModelList.remove(viewModel);
				}
			},

			/**
			 * Shows Content builder (Preview button handler).
			 * @private
			 */
			showContentBuilder: function() {
				this.set("IsContentBuilderVisible", true);
				this.subscribeOnContentBuilderMessages();
			},

			/**
			 * Subscribe on content builder message.
			 * @private
			 */
			subscribeOnContentBuilderMessages: function() {
				this.sandbox.subscribe("CloseEmailTemplateBuilder", this.closeContentBuilder, this);
				this.sandbox.subscribe("GetEmailTemplateData", this.getTemplateConfig, this);
				this.sandbox.subscribe("SetEmailTemplateData", this.onChangeTemplateData, this);
			},

			/**
			 * Returns configuration object for content builder.
			 * @private
			 * @return {Object} config.
			 */
			getTemplateConfig: function() {
				var templateConfig = {};
				if (this.getHasBody()) {
					var bodyConfig = this.get("BodyConfig");
					var body = this.get("Body");
					templateConfig = {
						bodyConfig: bodyConfig,
						body: body
					};
				}
				templateConfig.invokerUId = this.get("uId");
				return templateConfig;
			},

			/**
			 * Closes content builder.
			 * @private
			 */
			closeContentBuilder: function() {
				this.set("IsContentBuilderVisible", false);
			},

			/**
			 * Handler for change template data.
			 * @param {Object} emailTemplateData template data.
			 * @param {String} emailTemplateData.bodyConfig Content builder configuration.
			 * @param {String} emailTemplateData.body Html body.
			 * @private
			 */
			onChangeTemplateData: function(emailTemplateData) {
				this.set("BodyConfig", emailTemplateData.bodyConfig);
				this.set("Body", emailTemplateData.body);
			},

			/**
			 * Handler for change body template type.
			 * @private
			 */
			onBodyTemplateTypeChange: function() {
				this.setPreviewBody();
				this._clearSubject();
			},

			/**
			 * Clears Subject field.
			 * @private
			 */
			_clearSubject: function() {
				if (this.getIsProcessTemplateSelected() && this.get("Subject")) {
					this.clearEmailTemplateId();
				}
				this.setMappingEditValue("Subject", {
					value: null,
					displayValue: null
				});
			},

			/**
			 * Sets email template id to empty value.
			 * @private
			 */
			clearEmailTemplateId: function() {
				this.set("EmailTemplateId", {
					value: null,
					displayValue: null
				});
			},

			/**
			 * @private
			 */
			_subjectValidator: function(value) {
				var validateMappingValue = ProcessSchemaUserTaskUtilities.validateMappingValue;
				var validationInfo = {isValid: true};
				return this.getIsProcessTemplateSelected() ? validateMappingValue(value) : validationInfo;
			},

			/**
			 * @param emailTemplateEntity
			 * @private
			 */
			_initEmailTemplateIdMapping: function(emailTemplateEntity) {
				this.setMappingEditValue("EmailTemplateId", {
					value: emailTemplateEntity.get("Id"),
					displayValue: emailTemplateEntity.get("Name")
				});
			},

			/**
			 * @param referenceSchemaUId
			 * @private
			 */
			_initEmailTemplateEntityIdMapping: function(referenceSchemaUId) {
				var emailTemplateEntityId = this.get("EmailTemplateEntityId");
				if (emailTemplateEntityId.referenceSchemaUId !== referenceSchemaUId) {
					var applyConfig = {
						displayValue: null,
						value: null,
						referenceSchemaUId: referenceSchemaUId
					};
					this.applyParameterMappingEditValue("EmailTemplateEntityId", applyConfig, {skipValidation: true});
				}
			},

			/**
			 * @param emailTemplate
			 * @private
			 */
			_initSubjectMapping: function(templateSubject) {
				if (!this.getLookupValue("Subject", true)) {
					this.setMappingEditValue("Subject", {
						value: null,
						displayValue: templateSubject
					});
				}
			}

			//endregion

		},

		diff: [
			{
				"operation": "remove",
				"name": "Recommendation"
			},
			{
				"operation": "remove",
				"name": "BaseActivityTaskContainer"
			},
			{
				"operation": "remove",
				"name": "RecommendationLabel"
			},
			{
				"operation": "remove",
				"name": "TitleTaskContainer"
			},
			{
				"operation": "insert",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"name": "Sender",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"wrapClass": ["top-caption-control-label"],
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"caption": {
						"bindTo": "Resources.Strings.SenderCaption"
					},
					"isRequired": {
						"bindTo": "getIsAutoTypeSendEmailSelected"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"name": "RecipientItemsContainer",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "AddRecipientContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["container-list-header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "AddRecipientContainer",
				"propertyName": "items",
				"name": "RecipientItemsLabel",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["t-title-label-proc"]
					},
					"caption": {
						"bindTo": "Resources.Strings.RecipientCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AddRecipientContainer",
				"propertyName": "items",
				"name": "RecipientItemsToolsButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"menuClass": ["detail-tools-button-menu"]
					},
					"menu": {
						"items": [{
							"tag": ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.To,
							"caption": {
								"bindTo": "Resources.Strings.RecipientCaption"
							},
							"click": {
								"bindTo": "addRecipient"
							}
						}, {
							"tag": ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Cc,
							"caption": {
								"bindTo": "Resources.Strings.CopyRecipientCaption"
							},
							"click": {
								"bindTo": "addRecipient"
							}
						}, {
							"tag": ProcessUserTaskConstants.EMAIL_RECIPIENT_TYPE.Bcc,
							"caption": {
								"bindTo": "Resources.Strings.BlindCopyRecipientCaption"
							},
							"click": {
								"bindTo": "addRecipient"
							}
						}]
					},
					"imageConfig": {
						"bindTo": "Resources.Images.AddButtonImage"
					},
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "RecipientContainer",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "DataItemMarker",
					"collection": "Recipient",
					"defaultItemConfig": {},
					"rowCssSelector": ".paramContainer",
					"classes": {
						"wrapClassName": ["top-recipient-container-list"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientContainer",
				"propertyName": "defaultItemConfig",
				"name": "RecipientItem",
				"values": {
					"id": "item",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItem",
				"propertyName": "items",
				"name": "RecipientItemView",
				"values": {
					"id": "item-view",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemView",
				"propertyName": "items",
				"name": "RecipientValueContainer",
				"values": {
					"id": "ParameterValueContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["placeholderOpacity"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientValueContainer",
				"propertyName": "items",
				"name": "Value",
				"values": {
					"id": "Value",
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.MappingEdit",
					"allowInlineEditing": true,
					"tag": {
						"attributeName": "EmailRecipientItem",
						"typeMappingMenu": Terrasoft.process.constants.TypeMappingMenu.EmailRecipientType
					},
					"value": {
						"bindTo": "Value"
					},
					"openEditWindow": {
						"bindTo": "openExtendedMappingEditWindow"
					},
					"prepareMenu": {
						"bindTo": "onPrepareMenu"
					},
					"change": {
						"bindTo": "onRecipientValueChanged"
					},
					"menu": {
						"items": {
							"bindTo": "MenuItems"
						}
					},
					"placeholder": {
						"bindTo": "Resources.Strings.MappingPlaceholderCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "CopyRecipientItemsLabel",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.CopyRecipientCaption"
					},
					"visible": {
						"bindTo": "IsCopyRecipientVisible"
					},
					"classes": {
						"labelClass": ["t-label-proc t-label-proc-param"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "CopyRecipientContainer",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "DataItemMarker",
					"collection": "CopyRecipient",
					"defaultItemConfig": {},
					"rowCssSelector": ".paramContainer"
				}
			},
			{
				"operation": "insert",
				"parentName": "CopyRecipientContainer",
				"propertyName": "defaultItemConfig",
				"name": "CopyRecipientItem",
				"values": {
					"id": "item",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CopyRecipientItem",
				"propertyName": "items",
				"name": "CopyRecipientItemView",
				"values": {
					"id": "item-view",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CopyRecipientItemView",
				"propertyName": "items",
				"name": "CopyRecipientValueContainer",
				"values": {
					"id": "ParameterValueContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["placeholderOpacity"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CopyRecipientValueContainer",
				"propertyName": "items",
				"name": "Value",
				"values": {
					"id": "Value",
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.MappingEdit",
					"tag": {
						"attributeName": "EmailRecipientItem",
						"typeMappingMenu": Terrasoft.process.constants.TypeMappingMenu.EmailRecipientType
					},
					"allowInlineEditing": true,
					"value": {
						"bindTo": "Value"
					},
					"openEditWindow": {
						"bindTo": "openExtendedMappingEditWindow"
					},
					"prepareMenu": {
						"bindTo": "onPrepareMenu"
					},
					"change": {
						"bindTo": "onRecipientValueChanged"
					},
					"menu": {
						"items": {
							"bindTo": "MenuItems"
						}
					},
					"placeholder": {
						"bindTo": "Resources.Strings.MappingPlaceholderCaption"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "BlindCopyRecipientItemsLabel",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.BlindCopyRecipientCaption"
					},
					"visible": {
						"bindTo": "IsBlindCopyRecipientVisible"
					},
					"classes": {
						"labelClass": ["t-label-proc t-label-proc-param"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "RecipientItemsContainer",
				"propertyName": "items",
				"name": "BlindCopyRecipientContainer",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "DataItemMarker",
					"collection": "BlindCopyRecipient",
					"defaultItemConfig": {},
					"rowCssSelector": ".paramContainer"
				}
			},
			{
				"operation": "insert",
				"parentName": "BlindCopyRecipientContainer",
				"propertyName": "defaultItemConfig",
				"name": "BlindCopyRecipientItem",
				"values": {
					"id": "item",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlindCopyRecipientItem",
				"propertyName": "items",
				"name": "BlindCopyRecipientItemView",
				"values": {
					"id": "item-view",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlindCopyRecipientItemView",
				"propertyName": "items",
				"name": "BlindCopyRecipientValueContainer",
				"values": {
					"id": "ParameterValueContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["placeholderOpacity"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlindCopyRecipientValueContainer",
				"propertyName": "items",
				"name": "Value",
				"values": {
					"id": "Value",
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.MappingEdit",
					"tag": {
						"attributeName": "EmailRecipientItem",
						"typeMappingMenu": Terrasoft.process.constants.TypeMappingMenu.EmailRecipientType
					},
					"allowInlineEditing": true,
					"value": {
						"bindTo": "Value"
					},
					"openEditWindow": {
						"bindTo": "openExtendedMappingEditWindow"
					},
					"prepareMenu": {
						"bindTo": "onPrepareMenu"
					},
					"change": {
						"bindTo": "onRecipientValueChanged"
					},
					"menu": {
						"items": {
							"bindTo": "MenuItems"
						}
					},
					"placeholder": {
						"bindTo": "Resources.Strings.MappingPlaceholderCaption"
					}
				}
			},
			{
				"operation": "insert",
				"name": "WhatMessageSendRegionLabel",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.WhatMessageSendRegionCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BodyTemplateType",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareEmailTypeList"
						}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"name": "TemplateMessageContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 0, "row": 4, "colSpan": 24},
					"items": [],
					"visible": {
						"bindTo": "getIsEmailTemplateSelected"
					}
				}
			},
			{
			"operation": "insert",
				"parentName": "TemplateMessageContainer",
				"propertyName": "items",
				"name": "EmailTemplateMessageContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 0, "row": 4, "colSpan": 24},
					"items": [],
					"visible": {
						"bindTo": "getIsEmailTemplateSelected"
					}
				}
			},
			{
				"operation": "insert",
				"name": "EmailTemplateId",
				"parentName": "EmailTemplateMessageContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM,
					"caption": {
						"bindTo": "Resources.Strings.EmailTemplateCaption"
					},
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareEmailTemplateList"
						}
					},
					"labelConfig": {},
					"visible": {
						"bindTo": "getIsEmailTemplateSelected"
					},
					"wrapClass": ["top-caption-control", "email-template-edit"]
				}
			},
			{
				"operation": "insert",
				"name": "EmailTemplateButton",
				"parentName": "EmailTemplateMessageContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 23, "row": 0, "colSpan": 1},
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"hint": {"bindTo": "Resources.Strings.OpenTemplateButtonHint"},
					"imageConfig": {"bindTo": "Resources.Images.OpenTemplateButtonImage"},
					"classes": {
						"wrapperClass": ["open-email-template-tool-button"]
					},
					"click": {
						"bindTo": "openEmailTemplate"
					},
					"visible": {
						"bindTo": "IsOpenEmailTemplateButtonVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "TemplateMessageContainer",
				"propertyName": "items",
				"name": "EmailTemplateAcademyLink",
				"values": {
					"itemType": Terrasoft.ViewItemType.HYPERLINK,
					"caption": {"bindTo": "Resources.Strings.EmailTemplateAcademyMessageCaption"},
					"classes": {
						"hyperlinkClass": ["email-template-academy-link"]
					},
					"click": {bindTo: "openEmailTemplateAcademyLink"},
					"markerValue": "EmailTemplateAcademyLink",
					"visible": {
						"bindTo": "IsEmailTemplateAcademyLinkVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "EmailTemplateEntityId",
				"parentName": "TemplateMessageContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"caption": {
						"bindTo": "Resources.Strings.EmailTemplateEntityCaption"
					},
					"wrapClass": ["top-caption-control"],
					"visible": {
						"bindTo": "IsEmailTemplateEntityIdVisible"
					},
					"isRequired": {
						"bindTo": "IsEmailTemplateEntityIdVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Subject",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 5, "colSpan": 24},
					"caption": {
						"bindTo": "Resources.Strings.SubjectCaption"
					},
					"visible": {
						"bindTo": "getIsBodyTemplateTypeSelected"
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "PreviewBodyContainer",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {"column": 0, "row": 6, "colSpan": 24},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PreviewContainer",
				"parentName": "PreviewBodyContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["preview-container"]
					},
					"items": [],
					"visible": {
						"bindTo": "getIsPreviewVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreviewBodyMaskContainer",
				"parentName": "PreviewContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["previw-body-mask-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PreviewButton",
				"parentName": "PreviewContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.PreviewButtonImage"
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": {
						"bindTo": "openPreviewModule"
					},
					"visible": {
						"bindTo": "getIsEmailTemplateSelected"
					},
					"classes": {
						"wrapperClass": ["preview-button"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "EditButton",
				"parentName": "PreviewContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.EditButtonImage"
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": {
						"bindTo": "showContentBuilder"
					},
					"visible": {
						"bindTo": "getIsProcessTemplateSelected"
					},
					"classes": {
						"wrapperClass": ["preview-button"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "PreviewContainer",
				"propertyName": "items",
				"name": "Body",
				"values": {
					"generator": function() {
						return {
							"className": "Terrasoft.IframeControl",
							"id": "PreviewContentIframe",
							"iframeContent": {"bindTo": "PreviewBody"},
							"wrapClass": ["preview-content-iframe"]
						};
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreviewUserMessageContainer",
				"parentName": "PreviewBodyContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["message-container"]
					},
					"items": [],
					"visible": {
						"bindTo": "getIsBodyMessageVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreviewTemplateUserMessageLabel",
				"parentName": "PreviewUserMessageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.EmailBodyEmptyCaption"
					},
					"classes": {
						"labelClass": ["edit-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "PreviewTemplateUserMessageBodyMaskContainer",
				"parentName": "PreviewUserMessageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["previw-body-mask-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PreviewUserMessageButton",
				"parentName": "PreviewUserMessageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"imageConfig": {
						"bindTo": "Resources.Images.EditButtonImage"
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": {
						"bindTo": "showContentBuilder"
					},
					"classes": {
						"wrapperClass": ["preview-button"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "HowSendEmailLabel",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 7, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.HowSendEmailCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SendEmailType",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 8, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareSendEmailTypeList"
						}
					},
					"labelConfig": {
						"visible": false
					},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "ManualSendContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"layout": {"column": 0, "row": 9, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": {
						"bindTo": "getIsManualTypeSendEmailSelected"
					}
				}
			},
			{
				"operation": "insert",
				"name": "WhoMessageSendRegionLabel",
				"parentName": "ManualSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.OwnerRegionCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "OwnerId",
				"parentName": "ManualSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 24},
					"labelConfig": {"visible": false},
					"wrapClass": ["no-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "InformationOnStep",
				"parentName": "ManualSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 24},
					"caption": {
						"bindTo": "Resources.Strings.InformationOnStepCaption"
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "ShowExecutionPage",
				"parentName": "ManualSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"caption": {
						"bindTo": "Resources.Strings.ShowExecutionPageCaption"
					},
					"wrapClass": ["t-checkbox-control"]
				}
			},
			{
				"operation": "insert",
				"name": "AutoSendContainer",
				"propertyName": "items",
				"parentName": "UserTaskContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"layout": {"column": 0, "row": 10, "colSpan": 24},
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": {
						"bindTo": "getIsAutoTypeSendEmailSelected"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Importance",
				"parentName": "AutoSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"contentType": Terrasoft.ContentType.ENUM,
					"visible": {
						"bindTo": "getIsAutoTypeSendEmailSelected"
					},
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareImportanceList"
						}
					},
					"caption": {
						"bindTo": "Resources.Strings.ImportanceCaption"
					},
					"wrapClass": ["top-caption-control"]
				}
			},
			{
				"operation": "insert",
				"name": "IgnoreErrors",
				"parentName": "AutoSendContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"caption": {
						"bindTo": "Resources.Strings.IgnoreErrorsCaption"
					},
					"wrapClass": ["t-checkbox-control"]
				}
			},
			{
				"operation": "insert",
				"name": "ContentBuilderMaskContainer",
				"parentName": "RecepientRegionContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["content-builder-mask-container"]
					},
					"visible": {"bindTo": "IsContentBuilderVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ContentBuilderBody",
				"parentName": "RecepientRegionContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"classes": {
						"wrapClassName": "content-builder-body-container"
					},
					"visible": {"bindTo": "IsContentBuilderVisible"},
					"items": []
				}
			},
			{
				"operation": "merge",
				"name": "ActivityConnectionLabel",
				"values": {
					"caption": {"bindTo": "Resources.Strings.EmailLinksCaption"}
				}
			},
			{
				"operation": "insert",
				"parentName": "UserTaskContainer",
				"propertyName": "items",
				"name": "useBackgroundMode",
				"values": {
					"wrapClass": ["t-checkbox-control"],
					"visible": {
						"bindTo": "canUseBackgroundProcessMode"
					},
					"layout": {"column": 0,"row": 11,"colSpan": 24}
				}
			}
		]

	};
});


