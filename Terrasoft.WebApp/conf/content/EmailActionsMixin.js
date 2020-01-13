Terrasoft.configuration.Structures["EmailActionsMixin"] = {innerHierarchyStack: ["EmailActionsMixin"]};
define("EmailActionsMixin", [],
	function() {
		/**
		 * @class Terrasoft.configuration.mixins.EmailActionsMixin
		 * The mixin can add signature to body.
		 */
		Ext.define("Terrasoft.configuration.mixins.EmailActionsMixin", {
			alternateClassName: "Terrasoft.EmailActionsMixin",

			//region Properties: Private

			/**
			 * Custom signature meta teg.
			 * @private
			 */
			_signatureMetateg: "<signature>",

			//endregion

			//region Methods: Private

			/**
			 * Adds filters to select mailbox sync settings query.
			 * @private
			 * @param {Object} selectMailboxSyncSettings Select mailbox sync settings query.
			 */
			addSelectMailboxQueryFilters: function(selectMailboxSyncSettings) {
				selectMailboxSyncSettings.filters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
				var filterName = "FilterEmailSettings";
				var filterIsEmailForSendName = "FilterIsEmailForSendName";
				var filterIsSharedName = "FilterIsSharedName";
				var filtersGroup = selectMailboxSyncSettings.createFilterGroup();
				filtersGroup.name = "FilterGroup";
				filtersGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				var filterSettings = selectMailboxSyncSettings.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
							this.Terrasoft.core.enums.SysValue.CURRENT_USER.value);
				var filterIsEmailForSend = selectMailboxSyncSettings.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SendEmailsViaThisAccount", true);
				var filterIsShared = selectMailboxSyncSettings.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "IsShared", true);
				filtersGroup.add(filterName, filterSettings);
				filtersGroup.add(filterIsSharedName, filterIsShared);
				selectMailboxSyncSettings.filters.add(filtersGroup.name, filtersGroup);
				selectMailboxSyncSettings.filters.add(filterIsEmailForSendName, filterIsEmailForSend);
			},

			/**
			 * Puts indentation before html text.
			 * @private
			 * @param {String} html Html to be putted indentation.
			 */
			_addIndentation: function(html) {
				var indentation = "<br><br>";
				return indentation.concat(html);
			},

			/**
			 * Formating signature turning it into custom meta tags.
			 * @private
			 * @param {String} signature Html signature.
			 * @returns {String} Formated signature.
			 */
			_formatedSignature: function(signature) {
				if (this.isEmpty(signature) || signature.indexOf(this._signatureMetateg) === -1) {
					signature = this.Ext.String.format("<signature>{0}</signature>", signature || "");
				}
				return signature;
			},

			/**
			 * Replace signature in the mail body.
			 * @private
			 * @param {String} body Html body text.
			 * @param {String} newSignature New signature html text.
			 */
			_replaceSignatureInBody: function(body, newSignature) {
				if (body.indexOf(this._signatureMetateg) > -1) {
					body = body.replace(/(<br ?\/?>(\r?\n)?){0,2}<signature>[\s\S]*?<\/signature>/, newSignature);
				} else {
					body = body.concat(newSignature);
				}
				return body;
			},

			/**
			 * Combine html body text, with forward or reply action considers.
			 * @private
			 * @param {String} textTemplate Html body text.
			 * @param {Boolean} isForwardOrReplyAction Sign that body set on forward or reply action.
			 * @return {String} Combined html body text.
			 */
			_getBody: function(textTemplate, isForwardOrReplyAction) {
				var body = this.get("Body");
				if (isForwardOrReplyAction) {
					if(!this.get("UseSignature")) {
						var emptySignature = this._formatedSignature(Terrasoft.emptyString);
						emptySignature = this._addIndentation(emptySignature);
						body = emptySignature.concat(textTemplate);
					}
					else {
						body = textTemplate;
					}
				} else {
					var signature = this._formatedSignature(textTemplate);
					this.set("Signature", signature);
					if(!this.get("UseSignature")) {
						var templateIndentation = "<br>";
						signature = templateIndentation.concat(signature);
					} else {
						signature = this._addIndentation(signature);
					}
					body = this.isEmpty(body) ? signature : this._replaceSignatureInBody(body, signature);
				}
				return body;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Sets body signature.
			 * @protected
			 * @param {String} sender Email sender.
			 */
			setBodySignature: function(sender) {
				var signature = "";
				if (this.get("UseSignature") || (sender && sender.useSignature)) {
					signature = (sender && sender.signature) || signature;
					this.set("UseSignature", true);
				}
				if (this.getIsFeatureEnabled("MailboxSyncSettingsMacrosesEnabled")) {
					this.executeSignatureMacrosServiceRequest(signature, this.processSignature, this, false);
				} else {
					var response = {
						textTemplate: signature,
						success: true
					};
					this.processSignature(response, false);
				}
			},

			/**
			 * Processes signature.
			 * @protected
			 * @virtual
			 * @param {Object} response Response with text template.
			 * @param {Boolean} isForwardOrReplyAction Sign that body set on forward or reply action.
			 */
			processSignature: function(response, isForwardOrReplyAction) {
				this.hideBodyMask();
				if (response.success) {
					this.set("Body", this._getBody(response.textTemplate, isForwardOrReplyAction));
				}
			},

			/**
			 * Calls service for getting signature with replaced macroses.
			 * @param {String} textTemplate Template config for service.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 * @param {Boolean} isForwardOrReplyAction Sign that body set on forward or reply action.
			 * @protected
			 */
			executeSignatureMacrosServiceRequest: function(textTemplate, callback, scope, isForwardOrReplyAction) {
				this.showBodyMask();
				var serviceRequest = this.Ext.create("Terrasoft.MacrosHelperServiceRequest", {
					contractName: "GetTemplate",
					entityId: Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
					entityName: "Contact",
					textTemplate: textTemplate
				});
				serviceRequest.execute(function(response) {
					this.Ext.callback(callback, scope || this, [response, isForwardOrReplyAction]);
				});
			},

			/**
			 * Checks if page has process data.
			 * @virtual
			 * @return {Boolean} Reply actions visibility.
			 */
			hasProcessData: function() {
				return false;
			},

			/**
			 * Adds signature to item.
			 * @protected
			 * @param {Object} item without signature.
			 * @param {Object|String} mailboxSyncSettingsItem with signature and UseSignature flags.
			 * @return {Object|String} item with signature.
			 */
			getItemWithSignature: function(item, mailboxSyncSettingsItem) {
				var signature = mailboxSyncSettingsItem.get("Signature");
				var useSignature = mailboxSyncSettingsItem.get("UseSignature");
				if (this.isSignatureExist(useSignature, signature)) {
					var isStringItem = this.Ext.isString(item);
					if (isStringItem) {
						var movedSignature = this._addIndentation(signature);
						item = movedSignature.concat(item);
					} else {
						item.signature = signature;
					}
					item.useSignature = mailboxSyncSettingsItem.get("UseSignature");
				}
				return item;
			},

			/**
			 * Checks if signature exists.
			 * @protected
			 * @param {Boolean} useSignature Flag use signature.
			 * @param {String} signature Mailbox signature.
			 */
			isSignatureExist: function(useSignature, signature) {
				return useSignature && this.isNotEmpty(signature);
			},

			/**
			 * Sets sender selected by user.
			 * @protected
			 */
			setSenderFromSenderEnum: function() {
				var senderEnum = this.get("SenderEnum");
				if (this.isNotEmpty(senderEnum && senderEnum.displayValue) &&
					senderEnum.value !== "oldKey") {
					this.set("Sender", senderEnum.displayValue);
				} else if (this.isEmpty(senderEnum)) {
					this.set("Sender", "");
				}
				if (this.canAddSignature()) {
					this.setBodySignature(senderEnum);
				}
			},

			/**
			 * Checks if we can insert a signature.
			 * @returns {boolean} Default true value.
			 * @protected
			 * @virtual
			 */
			canAddSignature: function() {
				return true;
			},
			/**
			 * Returns senders select query.
			 * @protected
			 * @return {Object} Select query.
			 */
			getSenderQuery: function() {
				var selectMailboxSyncSettings = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MailboxSyncSettings"
				});
				selectMailboxSyncSettings.addColumn("Id");
				selectMailboxSyncSettings.addColumn("SysAdminUnit.Contact.Name");
				selectMailboxSyncSettings.addColumn("SenderEmailAddress");
				selectMailboxSyncSettings.addColumn("MailServer.Type.Id");
				selectMailboxSyncSettings.addColumn("SenderDisplayValue");
				selectMailboxSyncSettings.addColumn("IsDefault");
				selectMailboxSyncSettings.addColumn("SendEmailsViaThisAccount");
				selectMailboxSyncSettings.addColumn("Signature");
				selectMailboxSyncSettings.addColumn("UseSignature");
				this.addSelectMailboxQueryFilters(selectMailboxSyncSettings);
				return selectMailboxSyncSettings;
			}

			//endregion

		});
	});

