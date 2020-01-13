Terrasoft.configuration.Structures["SendTestEmailContentMixin"] = {innerHierarchyStack: ["SendTestEmailContentMixin"]};
define("SendTestEmailContentMixin", ["ext-base", "terrasoft", "SendTestEmailContentMixinResources", "ServiceHelper"],
	function(Ext, Terrasoft, resources, ServiceHelper) {
		Ext.define("Terrasoft.configuration.mixins.SendTestEmailContentMixin", {
			alternateClassName: "Terrasoft.SendTestEmailContentMixin",

			//region Fields: Protected

			/**
			 * Mailing service name.
			 */
			mailingServiceName: "MailingService",

			/**
			 * Validate message method name.
			 */
			validateMessageMethodName: "ValidateMessage",

			/**
			 * Send test message method name.
			 */
			sendTestMessageMethodName: "SendTestMessage",

			//endregion

			//region Methods: Protected

			/**
			 * Hides body.
			 * @protected
			 */
			showModalBoxMask: function() {
				var maskId = Terrasoft.Mask.show({
					caption: resources.localizableStrings.MaskMessage,
					selector: "#testBulkEmailContainer"
				});
				this.set("maskId", maskId);
			},

			/**
			 * Hides body.
			 * @protected
			 */
			hideModalBoxMask: function() {
				var maskId = this.get("maskId");
				Terrasoft.Mask.hide(maskId);
				this.set("maskId", null);
			},

			/**
			 * Shows the success or fail information of SendTestMessage request and calls callback function.
			 * @protected
			 * @param {Object} response Response object.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope for callback function.
			 */
			validateBulkEmailCallBack: function(response, callback, scope) {
				var validationResult = response.ValidateMessageResult || {};
				if (validationResult.success) {
					Ext.callback(callback, scope);
				} else {
					this.hideModalBoxMask();
					this.showInformationDialog(validationResult.errorInfo.message);
				}
			},

			/**
			 * Returns data for ValidateMessage request.
			 * @protected
			 */
			getValidateBulkEmailConfig: function() {
				return {
					messageId: this.get("BulkEmail") ? this.get("BulkEmail").value : Terrasoft.GUID_EMPTY
				};
			},

			/**
			 * Validates bulk email.
			 * @protected
			 * @param {Function} callback Validation callback.
			 * @param {Object} scope Callback execution scope.
			 */
			validateBulkEmail: function(callback, scope) {
				var data = this.getValidateBulkEmailConfig();
				this.showModalBoxMask();
				ServiceHelper.callService(this.mailingServiceName, this.validateMessageMethodName, function(response) {
					this.validateBulkEmailCallBack(response, callback, scope);
				}, data, this);
			},

			/**
			 * Returns data for SendTestMessage request.
			 * @protected
			 * @return {Object} Data for SendTestMessage request.
			 */
			getSendTestMessageConfig: function() {
				var messageId = this.get("BulkEmail") ? this.get("BulkEmail").value : Terrasoft.GUID_EMPTY;
				var contactId = this.get("Contact") ? this.get("Contact").value : Terrasoft.GUID_EMPTY;
				return {
					messageId: messageId,
					contactId: contactId,
					emailRecipient: this.get("EmailAddress")
				};
			},

			/**
			 * Shows the success of SendTestMessage request.
			 * @protected
			 * @param {Object} response Response object.
			 */
			sendTestMessageCallBack: function(response) {
				this.hideModalBoxMask();
				if (response && response.SendTestMessageResult) {
					this.showInformationDialog(
						resources.localizableStrings.SendTestBulkMessageSuccessMessage,
						this.close);
				} else {
					this.showInformationDialog(
					resources.localizableStrings.SendTestBulkMessageFailMessage);
				}
			},

			/**
			 * Sends test message.
			 * @protected
			 */
			sendTestMessage: function() {
				var data = this.getSendTestMessageConfig();
				ServiceHelper.callService(this.mailingServiceName, this.sendTestMessageMethodName,
					this.sendTestMessageCallBack, data, this);
			},

			/**
			 * Validates test message dialog and sends test email.
			 */
			send: function() {
				if (!this.validate()) {
					var message = this.getValidationMessage();
					this.showInformationDialog(message, null, null);
					return;
				}
				this.validateBulkEmail(this.sendTestMessage, this);
			}

			//endregion

		});
		return Ext.create("Terrasoft.SendTestEmailContentMixin");
	});


