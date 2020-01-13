Terrasoft.configuration.Structures["BulkEmailTemplateValidator"] = {innerHierarchyStack: ["BulkEmailTemplateValidator"]};
define('BulkEmailTemplateValidatorStructure', ['BulkEmailTemplateValidatorResources'], function(resources) {return {schemaUId:'83a5ead8-505e-4116-8ad8-5d048f512d4e',schemaCaption: "BulkEmailTemplateValidator", parentSchemaName: "", schemaName:'BulkEmailTemplateValidator',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Class to validate bulk email template.
 */
define("BulkEmailTemplateValidator", ["BulkEmailTemplateValidatorResources", "AcademyUtilities",
		"DynamicContentReplicaBuilder", "BulkEmailTemplateHelper", "BulkEmailHelper", "MarketingEnums",
		"MacroUtils", "DynamicContentValidator", "BulkEmailSenderValidator", "ContentExporterFactory"],
	function(resources, AcademyUtilities, ReplicaBuilder, BulkEmailTemplateHelper, BulkEmailHelper, MarketingEnums,
			 MacroUtils) {
		/**
		 * @enum
		 * Types of  validation messages.
		 */
		Terrasoft.BulkEmailValidationType = {
			READONLY_STATE: 0,
			MAX_REPLICA_SIZE: 1,
			MAX_CONTRACT_SIZE: 2,
			INVALID_CONTENT: 3,
			DC_ATTRIBUTES_WITHOUT_FILTERS: 4,
			NO_DEFAULT_CONTENT: 5,
			INACTIVE_SENDER_DOMAINS: 6,
			MISSING_UNSUB_URL: 7,
			INVALID_HEADERS: 8,
			INVALID_CONTENT_BUILDER_STATE: 9
		};

		/**
		 * @enum
		 * Levels of  validation.
		 */
		Terrasoft.BulkEmailValidationLevel = {
			ERROR: 0,
			WARNING: 1
		};

		/**
		 * @class Terrasoft.configuration.BulkEmailTemplateValidator
		 */
		Ext.define("Terrasoft.configuration.BulkEmailTemplateValidator", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.BulkEmailTemplateValidator",

			/**
			 * The mebibyte.
			 * @type {Number}
			 */
			MEBIBYTE: 1048576,

			/**
			 * Current content exporter factory.
			 * @protected
			 * @type {Object}
			 */
			contentExporterFactory: Ext.create("Terrasoft.ContentExporterFactory"),

			/**
			 * Indicating whether validation collects messages or shows messages dialogs.
			 * @type {Boolean}
			 */
			_isCollectMessageMode: false,

			/**
			 * Validation messages array
			 * @protected
			 * @type {Array}
			 */
			validationMessages: null,

			/**
			 * Dictionary of the validation configs, where key is {Terrasoft.BulkEmailValidationType}
			 * and value is object with next fields:
			 * level {Terrasoft.BulkEmailValidationLevel} validationLevel,
			 * getMessage {Function} function returning validation message,
			 * runtimeAction {Function} Function executing if validation called not in collect mode.
			 * @protected
			 * @type {Array}
			 */
			validationTypes: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initResourcesValues(resources);
				this.initValidationTypes();
			},

			/**
			 * Initialize resource values from resource object.
			 * @private
			 * @param resourcesObj View model resources object.
			 */
			_initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Recursively finds all inline images (base64 format) in replica html.
			 * @private
			 * @param {String} html Replica html.
			 * @param {Array} images List of inline image data.
			 */
			_findInlineImages: function(html, images) {
				var imgRegExp = /(data:image\/[^;]+;base64[^("|')]+)/;
				if (imgRegExp.test(html)) {
					var match = imgRegExp.exec(html);
					var image = match[0];
					if (image) {
						images.push(image);
					}
					var text = html.substr(match.index + 1, html.length);
					this._findInlineImages(text, images);
				}
			},

			/**
			 * Returns duplicated images content size.
			 * @private
			 * @param {Array} images List of all inline images.
			 * @returns {Number} Duplicated images content size.
			 */
			_getDuplicatedImagesSize: function(images) {
				var duplicatesSize = 0;
				var uniqueImages = Ext.Array.unique(images);
				Terrasoft.each(uniqueImages, function(image) {
					var duplicatesCount = this._getDuplicatedImagesCount(images, image);
					duplicatesSize += duplicatesCount * image.length;
				}, this);
				return duplicatesSize;
			},

			/**
			 * Returns count of image duplicates excluding source image.
			 * @private
			 * @param {Array} allImages List of all template images of base64 format.
			 * @param {String} imageToCheck Image to check duplicates.
			 * @returns {Number} Count of duplicates.
			 */
			_getDuplicatedImagesCount: function(allImages, imageToCheck) {
				var count = 0;
				Terrasoft.each(allImages, function(image) {
					if (image === imageToCheck) {
						count += 1;
					}
				}, this);
				return count - 1;
			},

			_showReplicaIsOversizedMessage: function(replicaSize) {
				var maxTemplateSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_SIZE;
				var messageTemplate = resources.localizableStrings.MsgMaxReplicaSizeDescription;
				this._showTemplateIsOversizedMessage(replicaSize, maxTemplateSize, messageTemplate);
			},

			_showTemplateContractIsOversizedMessage: function(contractSize) {
				var maxContractSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_CONTRACT_SIZE;
				var messageTemplate = resources.localizableStrings.MsgMaxContractSizeDescription;
				this._showTemplateIsOversizedMessage(contractSize, maxContractSize, messageTemplate);
			},

			/**
			 * Checks replica content size.
			 * @private
			 * @param {Object} replica Current template replica to validate.
			 * @param {Terrasoft.BaseContentExporter} exporter Instance of email content exporter.
			 * @returns {{isValid: Boolean, size: Number}} Validation result.
			 */
			_validateMaxReplicaSize: function(replica, exporter) {
				var result = this.getReplicaSize(replica, exporter);
				var isValid = result.optimizedSize <= MarketingEnums.MandrillParameters.MAX_TEMPLATE_SIZE;
				if (!isValid) {
					var validationType = Terrasoft.BulkEmailValidationType.MAX_REPLICA_SIZE;
					this._routeValidationMessage(validationType, result.optimizedSize);
					this.hideBodyMask();
				}
				return {
					isValid: isValid,
					size: result.fullSize
				};
			},

			/**
			 * Creates message box config for validation fails message.
			 * @param {String} message Message text.
			 * @returns {{caption: *, buttons: *[], scope: BulkEmailTemplateValidator}} Message box config.
			 * @private
			 */
			_getFailedValidationMessageConfig: function(message) {
				var helpButtonCaption = this.get("Resources.Strings.ValidationHelpButtonCaption");
				var messageBoxConfig = {
					caption: message,
					buttons: ["save", "cancel", {
						className: "Terrasoft.Button",
						returnCode: "details",
						style: "default",
						caption: helpButtonCaption
					}],
					scope: this
				};
				return messageBoxConfig;
			},

			/**
			 * Shows message box with validation fails messages.
			 * @private
			 * @param {Terrasoft.Collection} validationResult Collection of messages.
			 * @param {Object} callback Save button handler callback to update record.
			 */
			_showContentValidationMessage: function(validationResult, callback) {
				var fullMessage = "";
				Terrasoft.each(validationResult, function(message) {
					fullMessage += (fullMessage ? "\n" : "") + message;
				});
				var messageConfig = this._getFailedValidationMessageConfig(fullMessage);
				messageConfig.handler = function(code) {
					switch (code) {
						case "save":
							callback.call(this);
							break;
						case "details":
							var academyConfig = {
								contextHelpId: "1876",
								scope: this,
								callback: function(url) {
									window.open(url);
								}
							};
							AcademyUtilities.getUrl(academyConfig);
							break;
						default:
							return;
					}
				};
				Terrasoft.utils.showMessage(messageConfig);
				this.hideBodyMask();
			},

			/**
			 * Finds elements with content recursively.
			 * @private
			 * @param {Object} item Element to find content.
			 * @param {Array} elements List of elements with content.
			 */
			_findElementsWithContent: function(item, elements) {
				if (item && item.hasOwnProperty("Content")) {
					return elements.push(item);
				}
				Terrasoft.each(item.Items, function(el) {
					this._findElementsWithContent(el, elements);
				}, this);
			},

			/**
			 * Validates template element. If validation is not success adds unique error message to result collection.
			 * @private
			 * @param {String} html Element html to validate.
			 * @param {Terrasoft.Collection} result Validation result collection.
			 */
			_validateElementContent: function(html, result) {
				var emailContentValidator = this.createContentValidator();
				emailContentValidator.validate(html, function(validationResult) {
					Terrasoft.each(validationResult, function(el) {
						if (!result.any(function(item) {
								return item === el;
							})) {
							result.add(el);
						}
					}, this);
				}, this);
			},

			/**
			 * Validates template block content and adds validation result to param collection.
			 * @private
			 * @param {Terrasoft.DynamicContentBlockViewModel} block Block item to validate.
			 * @param {Terrasoft.Collection} result Validation result collection.
			 */
			_validateBlockContent: function(block, result) {
				var elementsWithContent = [];
				this._findElementsWithContent(block, elementsWithContent);
				Terrasoft.each(elementsWithContent, function(element) {
					this._validateElementContent(element.Content, result);
				}, this);
			},

			/**
			 * Validates template group content and adds validation result to param collection.
			 * @private
			 * @param {Terrasoft.DynamicContentBlockGroupViewModel} group Group item to validate.
			 * @param {Terrasoft.Collection} result Validation result collection.
			 */
			_validateGroupContent: function(group, result) {
				Terrasoft.each(group.Items, function(block) {
					this._validateBlockContent(block, result);
				}, this);
			},

			/**
			 * Validates email template to contain old tags.
			 * @private
			 * @param {Object} config Template config.
			 * @returns {Terrasoft.Collection} Collection of invalid tag elements.
			 */
			_validateTemplateContent: function(config) {
				var result = Ext.create("Terrasoft.Collection");
				Terrasoft.each(config.Items, function(item) {
					if (item.ItemType === "blockgroup") {
						this._validateGroupContent(item, result);
					} else {
						this._validateBlockContent(item, result);
					}
				}, this);
				return result;
			},

			/**
			 * Returns expected apply unsubscribe link message text.
			 * @private
			 * @param {Boolean} hasLinksInDynamicBlock Is there any unsubscribe link in blockgroup item content.
			 * @returns {String} Message text.
			 */
			_getUnsubscribeLinkMessage: function(hasLinksInDynamicBlock) {
				if (hasLinksInDynamicBlock) {
					return this.get("Resources.Strings.ApplyUnsubscribeLinkWithDynamicBlockMessage");
				}
				return this.get("Resources.Strings.ApplyUnsubscribeLinkMessage");
			},

			/**
			 * Returns email state validation message.
			 * @private
			 * @returns {String} Message text.
			 */
			_getEditNotAllowedValidationMessage: function() {
				return this.get("Resources.Strings.EmailStateValidationMessage");
			},

			/**
			 * Shows message about the need to add a unsubscribe link.
			 * @private
			 * @param {Object} config Config of content items.
			 * @param {Boolean} hasLinksInDynamicBlock Indicates weather config contains unsub url in dynamic blocks.
			 * @param {Function} applyAction Function to execute when Ok button clicked.
			 * @param {Function} cancelAction callback function after modal box canceling
			 * @param scope Executing scope.
			 */
			_showUnsubscribeLinkMessage: function(config, hasLinksInDynamicBlock, applyAction, cancelAction, scope) {
				var message = this._getUnsubscribeLinkMessage(hasLinksInDynamicBlock);
				Terrasoft.utils.showMessage({
					caption: message,
					buttons: ["Ok", "Cancel"],
					handler: function(returnCode) {
						if (returnCode === Terrasoft.controls.MessageBoxEnums.Buttons.OK.returnCode) {
							applyAction.call(scope);
						} else if (cancelAction) {
							cancelAction.call(this);
						}
					},
					scope: this
				});
				this.hideBodyMask();
			},

			/**
			 * Shows message about the need to add a unsubscribe link.
			 * @private
			 * @param {Object} config Config of content items.
			 */
			_showEmailStateValidationMessage: function() {
				var message = this._getEditNotAllowedValidationMessage();
				Terrasoft.utils.showMessage({
					caption: message,
					buttons: ["Ok"],
					handler: function() {
						return;
					},
					scope: this
				});
				this.hideBodyMask();
			},

			/**
			 * Returns email state.
			 * @private
			 * @param {Object} config Config of content items.
			 */
			_getBulkEmailEntity: function(bulkEmailId, callback) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "BulkEmail"
				});
				esq.addColumn("Status");
				esq.addColumn("Category");
				esq.getEntity(bulkEmailId, function(result) {
					var entity = result.entity;
					callback.call(this, entity);
				}, this);
			},

			_internalValidate: function(config, callback, unsubscribeFixAction, scope) {
				Terrasoft.chain(
					function(next) {
						this.validateErrors(config, next, unsubscribeFixAction, scope);
					},
					function(next) {
						this.validateWarnings(config, next);
					},
					function() {
						callback.call(scope);
					},
					this
				);
			},

			/**
			 * Routes validation result to runtime action or resulting array
			 * @param {Terrasoft.BulkEmailValidationType} type Identifier of validation
			 * @param {Object} result Result of failed validation
			 * @param {Function} callback Callback function
			 * @private
			 */
			_routeValidationMessage: function(type, result, callback) {
				var messageConfig = this.validationTypes[type];
				if (!this._isCollectMessageMode && messageConfig.runtimeAction) {
					messageConfig.runtimeAction.call(this, result, callback);
				} else if (this._isCollectMessageMode) {
					var message = messageConfig.getMessage.call(this, messageConfig.level, result);
					this.validationMessages.push(message);
					if (callback) {
						callback.call(this);
					}
				}
			},

			_checkDCAttributes: function(dcValidator, templateConfig) {
				var incorrectRules = [];
				var isValidAttributes = dcValidator.checkDCAttributesFilters(templateConfig.Attributes, incorrectRules);
				if (!isValidAttributes) {
					var validationType = Terrasoft.BulkEmailValidationType.DC_ATTRIBUTES_WITHOUT_FILTERS;
					this._routeValidationMessage(validationType, incorrectRules);
				}
			},

			_checkDCDefaultContent: function(dcValidator, templateConfig) {
				var hasDefaultBlock = dcValidator.checkDefaultBlocksInGroups(templateConfig.Items);
				if (!hasDefaultBlock) {
					var validationType = Terrasoft.BulkEmailValidationType.NO_DEFAULT_CONTENT;
					this._routeValidationMessage(validationType);
				}
			},

			_validateDCContent: function(templateConfig, callback) {
				var dcValidator = this.createDynamicContentValidator();
				if (!this._isCollectMessageMode) {
					dcValidator.validate(templateConfig, callback, this);
				} else {
					this._checkDCAttributes(dcValidator, templateConfig);
					this._checkDCDefaultContent(dcValidator, templateConfig);
					callback.call(this);
				}
			},

			_getReadOnlyStateMessage: function(validationLevel) {
				return {
					Caption: resources.localizableStrings.MsgReadOnlyStateCaption,
					Description: resources.localizableStrings.MsgReadOnlyStateDescription,
					Level: validationLevel
				};
			},

			_getMaxContractSizeMessage: function(validationLevel, contractSize) {
				var maxContractSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_CONTRACT_SIZE;
				var overHead = contractSize - maxContractSize;
				var messageTemplate = resources.localizableStrings.MsgMaxContractSizeDescription;
				var description = Ext.String.format(messageTemplate, this.getPrintableSize(overHead),
					this.getPrintableSize(maxContractSize));
				return {
					Caption: resources.localizableStrings.MsgMaxContractSizeCaption,
					Description: description,
					Level: validationLevel
				};
			},

			_getMaxReplicaSizeMessage: function(validationLevel, replicaSize) {
				var maxTemplateSize = MarketingEnums.MandrillParameters.MAX_TEMPLATE_SIZE;
				var overHead = replicaSize - maxTemplateSize;
				var messageTemplate = resources.localizableStrings.MsgMaxReplicaSizeDescription;
				var description = Ext.String.format(messageTemplate, this.getPrintableSize(overHead),
					this.getPrintableSize(maxTemplateSize));
				return {
					Caption: resources.localizableStrings.MsgMaxReplicaSizeCaption,
					Description: description,
					Level: validationLevel
				};
			},

			_getInvalidContentMessage: function(validationLevel, messages) {
				var resultMessage = messages.getItems().join("\n");
				return {
					Caption: resources.localizableStrings.MsgInvalidContentCaption,
					Description: resultMessage,
					Level: validationLevel
				};
			},

			_getNoDefaultContentMessage: function(validationLevel) {
				return {
					Caption: resources.localizableStrings.MsgNoDefaultContentCaption,
					Description: resources.localizableStrings.MsgNoDefaultContentDescription,
					Level: validationLevel
				};
			},

			_getDCAttributesWithoutFiltersMessage: function(validationLevel, invalidReplicas) {
				var names = invalidReplicas.join(", ");
				var description = Ext.String.format(resources.localizableStrings.MsgDCAttributesWithoutFiltersDescription, names);
				return {
					Caption: resources.localizableStrings.MsgDCAttributesWithoutFiltersCaption,
					Description: description,
					Level: validationLevel
				};
			},

			_getInactiveSenderDomainsMessage: function(validationLevel, inactiveDomains) {
				var domains = inactiveDomains.join(", ");
				var description = Ext.String.format(resources.localizableStrings.MsgInactiveSenderDomainsDescription, domains);
				return {
					Caption: resources.localizableStrings.MsgInactiveSenderDomainsCaption,
					Description: description,
					Level: validationLevel
				};
			},

			_getMissingUnsubUrlMessage: function(validationLevel) {
				return {
					Caption: resources.localizableStrings.MsgMissingUnsubUrlCaption,
					Description: resources.localizableStrings.MsgMissingUnsubUrlDescription,
					Level: validationLevel
				};
			},

			_getInvalidHeadersMessage: function(validationLevel, replicaCaptions) {
				return {
					Caption: resources.localizableStrings.MsgInvalidHeadersCaption,
					Description: Ext.String.format(resources.localizableStrings.MsgInvalidHeadersDescription,
						replicaCaptions),
					Level: validationLevel
				};
			},

			/**
			 * @private
			 */
			_getInvalidContentBuilderStateMessage: function(validationLevel) {
				return {
					Caption: resources.localizableStrings.MsgInvalidContentBuilderStateCaption,
					Description: resources.localizableStrings.MsgInvalidContentBuilderStateDescription,
					Level: validationLevel
				};
			},

			/**
			 * Shows max size validation error message.
			 * @private
			 * @param {Number} size Current size.
			 * @param {Number} maxSize Max size value.
			 * @param {String} messageTemplate Localizable message template.
			 */
			_showTemplateIsOversizedMessage: function(size, maxSize, messageTemplate) {
				var overHead = size - maxSize;
				var message = Ext.String.format(messageTemplate, this.getPrintableSize(overHead),
					this.getPrintableSize(maxSize));
				Terrasoft.utils.showInformation(message, null, this, null);
			},

			_parseSenderDomains: function (senderEmails) {
				var domains = [];
				Terrasoft.each(senderEmails, function(email) {
					if(!MacroUtils.isValueMacro(email)) {
						domains.push(email.replace(/^.*@/, ""));
					}
				}, this);
				return domains;
			},

			_validateSenderDomains: function(emailHeaders, callback) {
				var senderEmails = this._getSenderEmails(emailHeaders);
				if (Ext.isEmpty(senderEmails)) {
					callback.call(this);
					return;
				}
				var validator = this.createSenderValidator();
				var domains = this._parseSenderDomains(senderEmails);
				var contract = { SenderDomains: domains };
				validator.validateDomains(contract, function(result) {
					if (Ext.isEmpty(result.InactiveDomains)) {
						callback.call(this);
					} else {
						var validationType = Terrasoft.BulkEmailValidationType.INACTIVE_SENDER_DOMAINS;
						this._routeValidationMessage(validationType, result.InactiveDomains, callback);
					}
				}, this);
			},

			_addUnsubscribeLink: function(config, isAtDynamicBlock, nextCallback, nextCallbackScope, applyAction,
					applyActionScope) {
				var showMessageCancelCallback = null;
				var isCollectMode = this._isCollectMessageMode;
				if (isCollectMode) {
					showMessageCancelCallback = function () {
						var validationType = Terrasoft.BulkEmailValidationType.MISSING_UNSUB_URL;
						this._routeValidationMessage(validationType, null, nextCallback);
					};
				}
				var showMessageOkCallback = function () {
					BulkEmailTemplateHelper.applyUnsubscribeLink(config, applyAction, applyActionScope);
					if (isCollectMode) {
						nextCallback.call(nextCallbackScope);
					}
				};
				this._showUnsubscribeLinkMessage(config, isAtDynamicBlock,
					showMessageOkCallback, showMessageCancelCallback, applyActionScope);
			},

			_getSenderEmails: function(emailHeaders) {
				var senderEmails = [];
				Terrasoft.each(emailHeaders, function(item) {
					var senderEmail = item.$SenderEmail || item.SenderEmail;
					if (senderEmail) {
						senderEmails.push(senderEmail);
					}
				}, this);
				return senderEmails.filter(function(value, index, self) {
					return self.indexOf(value) === index;
				});
			},

			_validateHeaders: function(emailHeaders) {
				var result = true;
				Terrasoft.each(emailHeaders, function (item) {
					if (!item.$SenderEmail || !item.$SenderName || !item.$Subject) {
						return result = false;
					}
				}, this);
				return result && !Ext.isEmpty(emailHeaders);
			},

			/**
			 * @private
			 */
			_containsMjBlock: function(config) {
				var firstChild = config.Items && config.Items[0];
				if (!firstChild) {
					return false;
				}
				switch (firstChild.ItemType) {
					case "blockgroup":
						return this._containsMjBlock(firstChild);
					case "mjblock":
						return true;
					default:
						return false;
				}
			},

			/**
			 * @private
			 */
			_checkContentBuilderState: function(config) {
				return Terrasoft.Features.getIsEnabled("MjmlContentBuilder")
					|| !this._containsMjBlock(config.templateConfig);
			},

			/**
			 * Returns content size for current template replica.
			 * @protected
			 * @param {Object} replica Template replica object.
			 * @param {Terrasoft.BaseContentExporter} exporter Instance of email content exporter.
			 * @returns {Object} Content size object (with sizes in bytes).
			 */
			getReplicaSize: function(replica, exporter) {
				var html = exporter.exportData(replica);
				var images = [];
				this._findInlineImages(html, images);
				var duplicatedImagesSize = this._getDuplicatedImagesSize(images);
				return {
					optimizedSize: html.length - duplicatedImagesSize,
					fullSize: html.length
				};
			},

			/**
			 * Shows base body mask.
			 * @protected
			 */
			showBodyMask: function() {
				Terrasoft.MaskHelper.showBodyMask();
			},

			/**
			 * Hides base body mask.
			 * @protected
			 */
			hideBodyMask: function() {
				Terrasoft.MaskHelper.hideBodyMask();
			},

			/**
			 * Returns instance of email content validator.
			 * @protected
			 * @returns {Terrasoft.EmailContentValidator} Instance of content validator.
			 */
			createContentValidator: function() {
				return new Terrasoft.EmailContentValidator();
			},

			/**
			 * Returns instance of email content exporter.
			 * @protected
			 * @param {Object} config Content builder template config.
			 * @returns {Terrasoft.BaseContentExporter} Instance of content exporter.
			 */
			createEmailContentExporter: function(config) {
				return this.contentExporterFactory.getExporter(config);
			},

			/**
			 * Returns instance of dynamic content validator.
			 * @protected
			 * @returns {Terrasoft.DynamicContentValidator} Instance of dynamic content validator.
			 */
			createDynamicContentValidator: function() {
				return new Terrasoft.DynamicContentValidator();
			},

			/**
			 * Creates instance of sender validator.
			 * @returns {Terrasoft.BulkEmailSenderValidator}
			 */
			createSenderValidator: function() {
				return Ext.create("Terrasoft.BulkEmailSenderValidator");
			},

			/**
			 * Initialises handlers for each validation.
			 * @protected
			 */
			initValidationTypes: function() {
				var validationTypes = {};
				validationTypes[Terrasoft.BulkEmailValidationType.READONLY_STATE] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getReadOnlyStateMessage,
					runtimeAction: this._showEmailStateValidationMessage
				};
				validationTypes[Terrasoft.BulkEmailValidationType.MAX_CONTRACT_SIZE] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getMaxContractSizeMessage,
					runtimeAction: this._showTemplateContractIsOversizedMessage
				};
				validationTypes[Terrasoft.BulkEmailValidationType.MAX_REPLICA_SIZE] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getMaxReplicaSizeMessage,
					runtimeAction: this._showReplicaIsOversizedMessage
				};
				validationTypes[Terrasoft.BulkEmailValidationType.INVALID_CONTENT] = {
					level: Terrasoft.BulkEmailValidationLevel.WARNING,
					getMessage: this._getInvalidContentMessage,
					runtimeAction: this._showContentValidationMessage
				};
				validationTypes[Terrasoft.BulkEmailValidationType.NO_DEFAULT_CONTENT] = {
					level: Terrasoft.BulkEmailValidationLevel.WARNING,
					getMessage: this._getNoDefaultContentMessage,
					runtimeAction: null
				};
				validationTypes[Terrasoft.BulkEmailValidationType.DC_ATTRIBUTES_WITHOUT_FILTERS] = {
					level: Terrasoft.BulkEmailValidationLevel.WARNING,
					getMessage: this._getDCAttributesWithoutFiltersMessage,
					runtimeAction: null
				};
				validationTypes[Terrasoft.BulkEmailValidationType.INACTIVE_SENDER_DOMAINS] = {
					level: Terrasoft.BulkEmailValidationLevel.WARNING,
					getMessage: this._getInactiveSenderDomainsMessage,
					runtimeAction: null
				};
				validationTypes[Terrasoft.BulkEmailValidationType.MISSING_UNSUB_URL] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getMissingUnsubUrlMessage,
					runtimeAction: null
				};
				validationTypes[Terrasoft.BulkEmailValidationType.INVALID_HEADERS] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getInvalidHeadersMessage,
					runtimeAction: null
				};
				validationTypes[Terrasoft.BulkEmailValidationType.INVALID_CONTENT_BUILDER_STATE] = {
					level: Terrasoft.BulkEmailValidationLevel.ERROR,
					getMessage: this._getInvalidContentBuilderStateMessage,
					runtimeAction: null
				};
				this.validationTypes = validationTypes;
			},

			/**
			 * Validates content size of template and integral dynamic content contract size.
			 * @protected
			 * @param {Object} templateConfig Template config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			validateMaxContentSize: function(templateConfig, callback, scope) {
				var replicas = ReplicaBuilder.generateReplicas(templateConfig);
				var exporter = this.createEmailContentExporter(templateConfig);
				var allReplicasSize = 0;
				var isValid = true;
				Terrasoft.each(replicas, function(replica) {
					var result = this._validateMaxReplicaSize(replica, exporter);
					allReplicasSize += result.size;
					isValid = result.isValid;
					return isValid || this._isCollectMessageMode;
				}, this);
				var validContractSize = allReplicasSize < MarketingEnums.MandrillParameters.MAX_TEMPLATE_CONTRACT_SIZE;
				if (!validContractSize) {
					var validationType = Terrasoft.BulkEmailValidationType.MAX_CONTRACT_SIZE;
					this._routeValidationMessage(validationType, allReplicasSize, callback);
					this.hideBodyMask();
					return;
				}
				if (isValid && validContractSize) {
					callback.call(scope || this);
				}
			},

			/**
			 * Validates template content. If validation success calls updateCallback, otherwise shows message.
			 * @protected
			 * @param {Object} templateConfig Template config to validate.
			 * @param {Function} callback Callback function.
			 */
			validateEmailTemplateContent: function(templateConfig, callback) {
				var result = this._validateTemplateContent(templateConfig);
				if (result.isEmpty()) {
					callback.call(this);
				} else {
					var validationType = Terrasoft.BulkEmailValidationType.INVALID_CONTENT;
					this._routeValidationMessage(validationType, result, callback);
				}
			},

			/**
			 * Validates required headers fields to be filled in.
			 * @param {Terrasoft.PreviewReplicaViewModel[]} emailHeaders Array of headers view models.
			 * @param {Function} callback Callback function.
			 */
			validateHeaders: function(emailHeaders, callback) {
				if (!this._isCollectMessageMode) {
					callback.call(this);
				}
				var isValid = this._validateHeaders(emailHeaders);
				if (isValid) {
					callback.call(this);
				} else {
					var validationType = Terrasoft.BulkEmailValidationType.INVALID_HEADERS;
					this._routeValidationMessage(validationType, isValid, callback);
				}
			},

			/**
			 * Validates bulk email template with ERROR level issues.
			 * @protected
			 * @param {Object} config Template config to validate.
			 * @param {Function} callback Callback function.
			 * @param {Function} unsubscribeFixAction Function updating config to fix unsubscribe link.
			 * @param {Object} scope Context.
			 */
			validateErrors: function(config, callback, unsubscribeFixAction, scope) {
				Terrasoft.chain(
					function(next) {
						this.validateBulkEmailState(config.bulkEmailId, next);
					},
					function(next) {
						this.validateContentBuilderState(config, next, scope);
					},
					function(next) {
						this.validateUnsubscribeLink(config.templateConfig, next, this, unsubscribeFixAction, scope);
					},
					function(next) {
						this.validateMaxContentSize(config.templateConfig, next);
					},
					function(next) {
						this.validateHeaders(config.emailHeaders, next);
					},
					function() {
						callback.call(this);
					},
					this
				);
			},

			/**
			 * Validates bulk email template with WARNING level issues.
			 * @protected
			 * @param {Object} config Template config to validate.
			 * @param {Function} callback Callback function.
			 */
			validateWarnings: function(config, callback) {
				Terrasoft.chain(
					function(next) {
						this._validateDCContent(config.templateConfig, next);
					},
					function(next) {
						this.validateEmailTemplateContent(config.templateConfig, next);
					},
					function(next) {
						this._validateSenderDomains(config.emailHeaders, next);
					},
					function() {
						callback.call(this);
					},
					this
				);
			},

			/**
			 * Check bulk email state.
			 * @protected
			 * @param {String} bulkEmailId Email unique identifier.
			 * @param {Function} callback Callback function.
			 */
			validateBulkEmailState: function(bulkEmailId, callback) {
				this._getBulkEmailEntity(bulkEmailId, function(bulkEmail) {
					var isEditable = BulkEmailHelper.IsEmailTemplateEditable(bulkEmail.$Status.value,
						bulkEmail.$Category.value);
					if (isEditable) {
						callback();
					} else {
						var validationType = Terrasoft.BulkEmailValidationType.READONLY_STATE;
						this._routeValidationMessage(validationType, isEditable, callback);
					}
				});
			},

			/**
			 * Checks content builder state to be valid.
			 * @protected
			 * @param {Object} config Template config to validate.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			validateContentBuilderState: function(config, callback, scope) {
				if (this._checkContentBuilderState(config)) {
					callback.call(scope);
				} else {
					var validationType = Terrasoft.BulkEmailValidationType.INVALID_CONTENT_BUILDER_STATE;
					this._routeValidationMessage(validationType, null, callback);
				}
			},

			/**
			 * Convert size to it printable value.
			 * @param {Number} size Size in bytes.
			 * @returns {Number} Size in kilobytes.
			 */
			getPrintableSize: function(size) {
				var sizeInMegabytes = size / this.MEBIBYTE;
				return Math.round(sizeInMegabytes * 100) / 100;
			},

			/**
			 * Validates bulk email template config.
			 * @public
			 * @param {Object} config Template config to validate.
			 * @param {Function} callback Callback function.
			 * @param {Function} unsubscribeFixAction Function updating config to fix unsubscribe link.
			 * @param {Object} scope Context.
			 */
			validate: function(config, callback, unsubscribeFixAction, scope) {
				this._isCollectMessageMode = false;
				this.validationMessages = [];
				this._internalValidate(config, callback, unsubscribeFixAction, scope);
			},

			/**
			 * Validates bulk email template config with collecting all messages.
			 * @public
			 * @param {Object} config Template config to validate.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			validateInCollectMode: function(config, callback, scope) {
				this.validationMessages = [];
				this._isCollectMessageMode = true;
				var validationMessages = this.validationMessages;
				this._internalValidate(config, function() {
					callback.call(scope, validationMessages);
				}, config.applyUnsubscribeAction, scope);
			},

			/**
			 * Check unsubscribe link existing at current template with specific resolve context.
			 * @public
			 * @param {Object} config Template config to be validated.
			 * @param {Function} nextCallback Callback function.
			 * @param {Object} nextCallbackScope Resolve function context.
			 * @param {Function} applyAction Apply unsubscribe url function.
			 * @param {Object} applyActionScope Apply function context.
			 */
			validateUnsubscribeLink: function(config, nextCallback, nextCallbackScope, applyAction, applyActionScope) {
				BulkEmailTemplateHelper.checkNeedUnsubscribeLink(config, function(unsubscribeLinkCheckResult, html) {
					if (unsubscribeLinkCheckResult && !unsubscribeLinkCheckResult.hasLink) {
						var isUnsubLinkAtDynamicBlock = unsubscribeLinkCheckResult.isAtDynamicBlock;
						this._addUnsubscribeLink(config, isUnsubLinkAtDynamicBlock, nextCallback, nextCallbackScope,
							applyAction, applyActionScope);
					} else {
						nextCallback.call(nextCallbackScope, config, html);
					}
				}, this);
			}
		});
		return Terrasoft.configuration.BulkEmailTemplateValidator;
	}
);


