Terrasoft.configuration.Structures["CampaignSchemaDesignerViewModel"] = {innerHierarchyStack: ["CampaignSchemaDesignerViewModel"]};
define("CampaignSchemaDesignerViewModel", ["CampaignSchemaDesignerViewModelResources", "CampaignConnectorManager",
		"CampaignFlowSchemaValidator", "MarketingEnums", "CampaignEnums", "CampaignElementMixin",
		"CampaignSchemaManager", "CampaignElementSchemaManager", "AcademyUtilities"],
	function(resources, campaignConnectorManager, campaignFlowSchemaValidator, MarketingEnums, CampaignEnums) {
	/**
	 * @class Terrasoft.Designers.CampaignSchemaDesignerViewModel
	 */
	Ext.define("Terrasoft.Designers.CampaignSchemaDesignerViewModel", {
		extend: "Terrasoft.Designers.ProcessSchemaDesignerViewModel",
		alternateClassName: "Terrasoft.CampaignSchemaDesignerViewModel",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#schemaManager
		 * @overridden
		 */
		schemaManager: Terrasoft.CampaignSchemaManager,

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#contextHelpCode
		 * @overridden
		 */
		contextHelpCode: "CampaignDesigner",

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#urlHashPrefix
		 * @overridden
		 */
		urlHashPrefix: "campaign",

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesignerViewModel#elementSchemaManager
		 * @overridden
		 */
		elementSchemaManager: Terrasoft.CampaignElementSchemaManager,

		/**
		 * Instance of CampaignConnectorManager
		 * @type {Terrasoft.CampaignConnectorManager}
		 */
		connectorManager: campaignConnectorManager,

		/**
		 * Instance of CampaignFlowSchemaValidator
		 * @type {Terrasoft.CampaignFlowSchemaValidator}
		 */
		flowSchemaValidator: campaignFlowSchemaValidator,

		/**
		 * Campaign time zone migration key for SysProfileData.
		 * @type {String}
		 */
		timeZoneMigrationSysProfileKey: "CampaignTimeZoneMigrationTo7120",

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onSchemaLoaded
		 * @overridden
		 */
		onSchemaLoaded: function(schema) {
			var args = arguments;
			var entitySchemaUId = this.get("EntitySchemaUId");
			schema.entitySchemaUId = entitySchemaUId || schema.entitySchemaUId;
			var entityId = this.get("EntityId");
			schema.entityId = entityId || schema.entityId;
			this.getSchemaEntity(schema, function(entity) {
				if (entity) {
					schema.caption.setValue(entity.get("Name"));
					this._showTimeZoneMigrationInfoMessage();
				}
				this.superclass.onSchemaLoaded.apply(this, args);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onItemDrop
		 * @override
		 */
		onItemDrop: function(event) {
			var item = event.element.tag.element;
			var itemInstance = this.elementSchemaManager.createInstance(item.managerItemUId);
			if (!itemInstance.emptyDiagramCaption) {
				var caption = itemInstance.caption.getValue();
				if (!caption) {
					caption = item.caption.getValue();
				}
				itemInstance.caption = Ext.create("Terrasoft.LocalizableString", {cultureValues: caption});
			}
			var itemContainer = this.$Schema.findItemByName(event.containerName);
			itemInstance.containerUId = itemContainer.uId;
			itemInstance.parent = itemContainer.name;
			itemInstance.uId = Terrasoft.generateGUID();
			itemInstance.position = itemInstance.getCenterPosition(event.localX, event.localY);
			itemInstance.isValidateExecuted = false;
			this.onGenerateItemNameAndCaption(itemInstance);
			var items = this.get("Items");
			items.add(itemInstance.name, itemInstance);
			this.loadPropertiesPage(itemInstance.name);
			return false;
		},

		/**
		 * @inheritdoc Terrasoft.core.mixins.ProcessSchemaDesignerCopyMixin#createItemCopy
		 * @overriden
		 */
		createItemCopy: function() {
			var item = this.callParent(arguments);
			return item.prepareCopy();
		},

		/**
		 * Gets linked entity of the current schema.
		 * @private
		 * @param {Terrasoft.CampaignSchema} schema Schema instance.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The callback execution context.
		 */
		getSchemaEntity: function(schema, callback, scope) {
			var columns = ["Id", "Name"];
			Terrasoft.EntitySchemaManager.getItemByUId(schema.entitySchemaUId,
				function(entitySchemaManagerItem) {
					this.mixins.campaignElementMixin.loadLinkedEntity(schema.entityId,
						entitySchemaManagerItem.name, columns, callback, scope);
				},
			this);
		},

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#onConnectorsNodesChange
		 * @overridden
		 * Change transition connections. If targetNode is empty (targetRefUId is empty guid), shows sequence flow element
		 * properties page, if panel is visible.
		 * else creates new connector with specific type we needed
		 * @private
		 * @param {Object[]} connectors Sequence flow diagram config array.
		 */
		onConnectorsNodesChange: function(connectors) {
			Terrasoft.each(connectors, function(connector) {
				var transition = this.getItemByName(connector.name);
				var targetItem = this.getItemByName(connector.targetNode);
				var sourceItem = this.getItemByName(connector.sourceNode);
				var isNewTransition = Terrasoft.isEmptyGUID(transition.targetRefUId);
				if (!isNewTransition &&
						transition.flowType === Terrasoft.ProcessSchemaEditSequenceFlowType.CONDITIONAL &&
						transition.sourceRefUId !== sourceItem.uId) {
					this.updateConnector(transition, sourceItem, targetItem);
				}
				this.updateSourceAndTarget(transition, connector, sourceItem, targetItem);
				this.loadPropertiesPage(connector.name);
			}, this);
			this.clearSearchResult();
		},

		/**
		 * Updates transition type if needed.
		 * @param  {Terrasoft.SequenceFlowelement} transition current transition.
		 * @param  {CampaignSchemaElement} sourceItem source element.
		 * @param  {CampaignSchemaElement} targetItem target element.
		 * @return {void}
		 */
		updateConnector: function(transition, sourceItem, targetItem) {
			var diagramElements = this.get("Items");
			var oldName = transition.name;
			diagramElements.remove(transition);
			transition = this.connectorManager.createTransition(transition,
					sourceItem, targetItem);
			transition.name = oldName;
			diagramElements.add(oldName, transition);
		},

		/**
		 * Sets new source and target data parameters
		 * @param  {Terrasoft.SequenceFlowelement} transition current transition
		 * @param  {object} connector Connector object
		 * @param  {CampaignSchemaElement} sourceItem source element
		 * @param  {CampaignSchemaElement} targetItem target element
		 * @return {void}
		 */
		updateSourceAndTarget: function(transition, connector, sourceItem, targetItem) {
			transition.setSource({
				sourcePort: connector.sourcePort,
				sourceRefUId: sourceItem.uId
			});
			transition.setTarget({
				targetPort: connector.targetPort,
				targetRefUId: targetItem.uId
			});
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaDesigner#onSandboxInitialized
		 * @overridden
		 */
		onSandboxInitialized: function() {
			this.callParent();
			var sandbox = this.sandbox;
			sandbox.registerMessages({
				"SetDefaultValuesApproved": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			});
		},

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesignerViewModel5X#onGenerateItemNameAndCaption
		 * @overriden
		 * @private
		 */
		onGenerateItemNameAndCaption: function(item) {
			var items = this.get("Items");
			var index = 1;
			var defName = item.name;
			var defType = item.elementType;
			var key = defName + index;
			var inheritedElements = this.get("Schema").inheritedElements;
			while (this.containsCaseInsensitive(items, index, defType) ||
					this.containsCaseInsensitive(inheritedElements, index, defType)) {
				index++;
				key = defName + index;
			}
			item.name = key;
			var cultureValues = item.caption.cultureValues;
			Terrasoft.each(cultureValues, function(value, culture) {
				if (value) {
					cultureValues[culture] = value + " " + index;
				}
			});
			return false;
		},

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesignerViewModel5X#containsCaseInsensitive
		 * @overriden
		 * @private
		 */
		containsCaseInsensitive: function(list, index, defType) {
			return list.collection.items.some(function(el) {
				var elementNumberStr = el.name.match(/\d/g).join("");
				var elementNumber = parseInt(elementNumberStr, 10);
				var elementType = el.elementType || "";
				return elementType.toUpperCase() === defType.toUpperCase() &&
					elementNumber === index;
			});
		},

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesignerViewModel#validateViewModel
		 * @override
		 */
		validateViewModel: function(callback, scope) {
			this.validateSubProcessSchema(function() {
				var isValid = this.validate();
				var validationMessage = this.getValidationMessage();
				if (Ext.isEmpty(validationMessage)) {
					validationMessage = this.validateCampaignSchema() || "";
					this.validateCampaign(function(response) {
						if (isValid && response.isValid) {
							callback.call(scope, isValid, true);
						} else {
							this.showSchemaValidationMessageBox(validationMessage, response, function(doSave) {
								callback.call(scope, isValid, doSave);
							}, scope);
						}
					}, this);
				} else {
					this.showInformationDialog(validationMessage, function() {
						callback.call(scope, isValid, false);
					});
				}
			}, this);
		},

		/**
		 * Returns text of campaign schema validation message.
		 * @protected
		 * @returns {String} Validation message.
		 */
		validateCampaignSchema: function() {
			var schema = this.get("Schema");
			var validationResults = schema.getValidationResults();
			Terrasoft.each(validationResults, function(validationInfo) {
				var element = schema.findItemByUId(validationInfo.uId);
				if (element) {
					this.fireEvent("itemIsValidChanged", element);
				}
			}, this);
			return this.getProcessSchemaValidationMessage(validationResults);
		},

		/**
		 * Makes validation request for designed campaign schema.
		 * @protected
		 * @param {Function} callback Callback function to call when response will be received.
		 * @param {Object} scope Context.
		 */
		validateCampaign: function(callback, scope) {
			var item = this.get("SchemaManagerItem");
			item.validate(function(response) {
				callback.call(scope, response);
			}, this);
		},

		/**
		 * Returns text of message to be displayed in messagebox error description section.
		 * @protected
		 * @param {String} message Validation message.
		 * @param {Object} validationInfo Campaign validation result.
		 * @returns {String} Validation message.
		 */
		getCampaignValidationMessage: function(message, validationInfo) {
			var warningTitle = resources.localizableStrings.CampaignWarningMessageCaption;
			var errorTitle = resources.localizableStrings.CampaignErrorMessageCaption;
			var hasErrors = validationInfo.errorInfo && !Ext.isEmpty(validationInfo.errorInfo.message);
			var hasWarnings = validationInfo.warningInfo && !Ext.isEmpty(validationInfo.warningInfo.message);
			if (!Ext.isEmpty(message)) {
				message += "\r\n\r\n";
			}
			if (hasErrors) {
				message += !Ext.isEmpty(message) || hasWarnings ? errorTitle + "\r\n" : "";
				message += validationInfo.errorInfo.message + "\r\n\r\n";
			}
			if (hasWarnings) {
				message += !Ext.isEmpty(message) || hasErrors ? warningTitle + "\r\n" : "";
				message += validationInfo.warningInfo.message;
			}
			return this._clearLineBreak(message);
		},

		/**
		 * Returns list of buttons for validation message box.
		 * @protected
		 * @param {Object} baseResources Process resource messages object.
		 * @param {Terrasoft.CampaignSchema} schema Campaign schema of current viewmodel.
		 * @param {String} status Current campaign status.
		 * @param {Boolean} isValid True when campaign schema is valid.
		 * @param {Boolean} hasErrors True when campaign validation result has errors.
		 * @returns {Array} Validation box buttons.
		 */
		getValidationMessageButtons: function(baseResources, schema, status, isValid, hasErrors) {
			var buttons = [Terrasoft.MessageBoxButtons.CANCEL];
			if (status === MarketingEnums.CampaignStatus.PLANNED
					|| status === MarketingEnums.CampaignStatus.STOPPED
					|| (isValid && !hasErrors)) {
				var buttonSaveProcess = this.getSaveButton(baseResources, schema);
				buttons.unshift(buttonSaveProcess);
			}
			return buttons;
		},

		/**
		 * Gets campaign entity by id.
		 * @private
		 * @param {String} entityId Unique identifier of campaign entity.
		 * @param {Function} callback Callback function to call when response will be received.
		 * @param {Object} scope Context.
		 */
		_getCampaignEntity: function(entityId, callback, scope) {
			var columns = ["Id", "CampaignStatus"];
			this.mixins.campaignElementMixin.loadLinkedEntity(entityId, "Campaign", columns, function(entity) {
				callback.call(scope, entity);
			}, this);
		},

		/**
		* Shows schema validation message box.
		* @protected
		* @virtual
		* @param {String} validationMessage Validation message.
		* @param {Object} validationInfo Validation info from server.
		* @param {Function} callback Callback function, called after user close message box.
		* @param {Object} scope Callback function execution context.
		*/
		showSchemaValidationMessageBox: function(validationMessage, validationInfo, callback, scope) {
			var self = this;
			var schema = this.get("Schema");
			var baseResources = Terrasoft.Resources.ProcessSchemaDesigner.Messages;
			var caption = this._getMessageBoxCaption(baseResources, schema);
			var message = this.getCampaignValidationMessage(validationMessage, validationInfo);
			this._getCampaignEntity(schema.entityId, function(entity) {
				if (entity) {
					var status = entity.get("CampaignStatus").value;
					var isValid = Ext.isEmpty(validationMessage);
					var hasErrors = validationInfo.errorInfo && !Ext.isEmpty(validationInfo.errorInfo.message);
					var buttons = self.getValidationMessageButtons(baseResources, schema, status, isValid, hasErrors);
					self._showMessageBox(caption, message, buttons, function(doSave) {
						if (doSave) {
							self.sandbox.publish("SetDefaultValuesApproved");
						}
						callback.call(scope, doSave);
					}, scope);
				}
			}, this);
		},

		/**
		 * Shows info message box for first user intry.
		 * In otherwise shows nothing.
		 * @private
		 */
		_showTimeZoneMigrationInfoMessage: function() {
			var config = {
				schemaName: "CampaignSchemaDesignerViewModel",
				profileKey: this.timeZoneMigrationSysProfileKey
			};
			if (Terrasoft.ProfileUtilities) {
				Terrasoft.ProfileUtilities.getProfile(config, function(profile) {
					if (!Terrasoft.isEmptyObject(profile)) {
						this._showInfoMigrationMessageBox(resources.localizableStrings.TimeZoneMigrationInfoMessage, this);
					}
				}, this);
			}
		},

		/**
		 * Shows message box with migration information in campaign designer.
		 * @private
		 * @param {String} message Message which will shown in migration message box.
		 */
		_showInfoMigrationMessageBox: function(message) {
			var currentButtons = [Terrasoft.MessageBoxButtons.OK];
			this._showMessageBox(resources.localizableStrings.TimeZoneMigrationInfoMessageBoxCaption,
				message, currentButtons, this._deleteTimeZoneMigrationUserProfile, this);
		},

		/**
		 * Callback for "Ok" button in migration message box.
		 * Deletes record for this user in SysProfileData by key timeZoneMigrationSysProfileKey.
		 * @private
		 */
		_deleteTimeZoneMigrationUserProfile: function() {
			var query = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName	: "SysProfileData"
			});
			var filters = Terrasoft.createFilterGroup();
			filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			filters.addItem(Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Contact", Terrasoft.SysValue.CURRENT_USER_CONTACT.value)
			);
			filters.addItem(Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Key", this.timeZoneMigrationSysProfileKey)
			);
			query.filters.add("currentUserSysProfileFilter", filters);
			query.execute();
		},

		/**
		 * Displays default messageBox with specific validation result content.
		 * @private
		 * @param {String} caption Caption of MeaasgeBox.
		 * @param {String} validationMessage Message that displays inside message block.
		 * @param {Array} currentButtons Collection of MessageBox buttons to display.
		 * @param {Function} callback Callback function to call when messageBox will be closed.
		 * @param {Object} scope Context.
		 */
		_showMessageBox: function(caption, validationMessage, currentButtons, callback, scope) {
			Terrasoft.ProcessSchemaDesignerUtilities.showProcessMessageBox({
				caption: caption,
				message: validationMessage,
				buttons: currentButtons,
				defaultButton: 0,
				handler: function(returnCode) {
					var doSave = returnCode === "SaveProcess";
					callback.call(scope, doSave);
				},
				scope: scope
			});
		},

		/**
		 * Returns caption of MessageBox, which displays main information about validation error.
		 * @private
		 * @param {Object} baseResources Process resource messages object.
		 * @param {Terrasoft.CampaignSchema} schema Campaign schema of current viewmodel.
		 * @return {String} Caption text.
		 */
		_getMessageBoxCaption: function(baseResources, schema) {
			if (this._getSchemaElementsValidationResult()
					&& !this._getCampaignFlowSchemaValidationResult()) {
				return resources.localizableStrings.CampaignFlowSchemaIsNotValidCaption;
			}
			var typeCaption = schema.typeCaption.toLowerCase();
			return Ext.String.format(baseResources.SchemaValidationMessageCaption, typeCaption);
		},

		/**
		 * Returns result message of campaign flow schema validation.
		 * @private
		 * @return {String} Validation message.
		 */
		_getCampaignFlowSchemaValidationResult: function() {
			var result = true;
			Terrasoft.each(this.validationInfo.attributes, function(attribute) {
				result = attribute.isValid || !attribute.isFlowSchemaValidationMessage;
				return result;
			}, this);
			return result;
		},

		/**
		 * Returns caption of campaign schema or campaign schema element by name.
		 * @private
		 * @param {String} name Element's name.
		 * @return {String} Element's caption.
		 */
		_getElementCaptionByName: function(name) {
			var element = this.$Schema.flowElements.collection.getByKey(name);
			if (element) {
				return element.caption;
			}
			return this.$Schema.caption;
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#validate
		 * @overriden
		 */
		validate: function() {
			var baseResult = this.callParent(arguments);
			this.validationInfo.customValidationResults = [];
			var flowSchemaValidationResult = this.validateCampaignFlowSchema();
			var extendedValidationResult = this.extendedValidate();
			return baseResult && flowSchemaValidationResult && extendedValidationResult;
		},

		/**
		 * Validates campaign flow schema to be correct.
		 * @protected
		 * @return {Boolean} Validation result.
		 */
		validateCampaignFlowSchema: function() {
			this.clearFlowSchemaValidationInfo();
			var schema = this.get("Schema");
			var result = this.flowSchemaValidator.validate(schema);
			var validationResult = this._groupValidationResultByRules(result);
			this._createValidationMessage(validationResult);
			return validationResult.isEmpty();
		},

		/**
		 * Validates campaign schema including custom validation.
		 * @protected
		 * @return {Boolean} Validation result.
		 */
		extendedValidate: function() {
			var result = true;
			var schemaValidationInfo = this.$Schema.validationInfo;
			Terrasoft.each(schemaValidationInfo.itemsValidationInfo, function(el) {
				result = this._validateItem(el) && result;
			}, this);
			return result;
		},


		/**
		 * Adds extended messages to items' custom validation result.
		 * @private
		 * @param {Object} itemValidationInfo Validation info of campaign schema item.
		 * @return {Boolean} Validation result.
		 */
		_validateItem: function(itemValidationInfo) {
			var result = true;
			Terrasoft.each(itemValidationInfo.validationResults, function(el) {
				if (!el.isValid) {
					this.validationInfo.customValidationResults.push({
						validationType: el.validationType,
						propertyName: el.propertyName,
						invalidMessage: el.message,
						isValid: el.isValid,
						isCustomMessage: el.isCustomMessage
					});
					result = false;
				}
			}, this);
			return result;
		},

		/**
		 * Grouped validation result of each flow element by rules.
		 * @private
		 * @param {Terrasoft.Collection} result Campaign flow schema validation result.
		 * @return {Terrasoft.Collection} Grouped validation result.
		 */
		_groupValidationResultByRules: function(result) {
			var groupedResult = Ext.create("Terrasoft.Collection");
			result.eachKey(function(elementName, rules) {
				var elementCaption = this._getElementCaptionByName(elementName);
				rules.eachKey(function(code, message) {
					var existingRule = groupedResult.collection.getByKey(code);
					if (!existingRule) {
						groupedResult.add(code, {
							message: message,
							elements: [elementCaption]
						});
					} else {
						groupedResult.collection.getByKey(code).elements.push(elementCaption);
					}
				});
			}, this);
			return groupedResult;
		},

		/**
		 * Clears all previous campaign flow schema validation results for default rules.
		 * @protected
		 */
		clearFlowSchemaValidationInfo: function() {
			Terrasoft.each(CampaignEnums.CampaignFlowSchemaValidationRules, function(rule) {
				this.validationInfo.set(rule, {
					isValid: true,
					isCustomMessage: true,
					isFlowSchemaValidationMessage: true,
					invalidMessage: ""
				});
			}, this);
		},

		/**
		 * Creates validation result message and extends validation info of current viewModel.
		 * @private
		 * @param {Terrasoft.Collection} validateResult Current campaign flow schema validation result.
		 */
		_createValidationMessage: function(validateResult) {
			validateResult.eachKey(function(rule, item) {
				var message = "";
				var isValid = item.elements.length === 0;
				if (!isValid) {
					message = item.message;
					item.elements.forEach(function(el) {
						message += "\r\n - " + el;
					});
				}
				this.validationInfo.set(rule, {
					isValid: isValid,
					isCustomMessage: true,
					isFlowSchemaValidationMessage: true,
					invalidMessage: message
				});
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#getProcessSchemaValidationMessage
		 * @overriden
		 */
		getProcessSchemaValidationMessage: function() {
			var validationMessage = "";
			if (!this._getSchemaElementsValidationResult(Terrasoft.ValidationType.ERROR)) {
				var baseMessage = this.callParent(arguments);
				validationMessage = this._addNewMessageLine(validationMessage, baseMessage);
			}
			validationMessage += this._getExtendedValidationMessage(Terrasoft.ValidationType.ERROR);
			validationMessage += this._getFlowSchemaValidationMessage();
			validationMessage += this._getExtendedValidationMessage(Terrasoft.ValidationType.WARNING);
			return this._clearLineBreak(validationMessage);
		},

		/**
		 * Returns result message of campaign flow schema validation.
		 * @private
		 * @return {String} Validation message.
		 */
		_getFlowSchemaValidationMessage: function() {
			var message = "";
			Terrasoft.each(this.validationInfo.attributes, function(attribute) {
				if (!attribute.isValid && attribute.isFlowSchemaValidationMessage) {
					message = this._addNewMessageLine(message, attribute.invalidMessage);
				}
			}, this);
			return message;
		},

		/**
		 * Returns result message of campaign validation for items with specific validation type.
		 * @private
		 * @param {String} validationType Validation type - error/warning/info
		 * (Terrasoft.ValidationType).
		 * @return {String} Validation message.
		 */
		_getExtendedValidationMessage: function(validationType) {
			var message = "";
			Terrasoft.each(this.validationInfo.customValidationResults, function(attribute) {
				if (!attribute.isValid && attribute.isCustomMessage
						&& attribute.validationType === validationType) {
					message = this._addNewMessageLine(message, attribute.invalidMessage);
				}
			}, this);
			return message;
		},

		/**
		 * Appends new message to base message text with line breaks.
		 * @private
		 * @param {String} message Base message.
		 * @param {String} line New message to append.
		 * @return {String} Extended with new line message.
		 */
		_addNewMessageLine: function(message, line) {
			if (line) {
				message += line + "\r\n\r\n";
			}
			return message;
		},

		/**
		 * Removes line break at the end of validation message.
		 * @private
		 * @param {String} validationMessage Validation message to process.
		 * @returns {String} Correct validation message.
		 */
		_clearLineBreak: function(validationMessage) {
			var regexp = /(\r\n)+$/;
			var matchResult = validationMessage.match(regexp);
			if (matchResult) {
				return validationMessage.substring(0, matchResult.index);
			}
			return validationMessage;
		},

		/**
		 * Returns schema validation result.
		 * @private
		 * @param {String} Terrasoft.ValidationType validationType (error, warning, info etc).
		 * @return {Boolean} Validation result.
		 */
		_getSchemaElementsValidationResult: function(validationType) {
			var schema = this.get("Schema");
			var validationResults = schema.getValidationResults(validationType);
			return validationResults.length === 0;
		},

		/**
		* Returns save button object.
		* @protected
		* @param {Object} baseResources Resources of parent process view model.
		* @param {Terrasoft.CampaignSchema} schema Campaign schema of current viewmodel.
		* @returns {Object} Save button object.
		*/
		getSaveButton: function(baseResources, schema) {
			var saveButtonCaption = Ext.String.format(baseResources.SaveInvalidProcessButtonCaption,
				schema.typeCaption);
			return {
				className: "Terrasoft.Button",
				returnCode: "SaveProcess",
				markerValue: saveButtonCaption,
				style: Terrasoft.controls.ButtonEnums.style.BLUE,
				caption: saveButtonCaption
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#getSchemaInstance
		 * @overriden
		 */
		getSchemaInstance: function(schemaUId, callback, scope) {
			var callbackFn = function(schema) {
				var args = arguments;
				schema.setDefaultValues();
				Ext.callback(callback, scope, args);
			};
			this.callParent([schemaUId, callbackFn, scope]);
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onAfterSchemaSaved
		 * @overriden
		 */
		onAfterSchemaSaved: function() {
			this.callParent(arguments);
			this.$Schema.setDefaultValues();
			Terrasoft.each(this.$Schema.flowElements, function(el) {
				el.onAfterSave();
			});
		}
	});
	return Terrasoft.CampaignSchemaDesignerViewModel;
});


