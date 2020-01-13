Terrasoft.configuration.Structures["CommunicationOptionsMixin"] = {innerHierarchyStack: ["CommunicationOptionsMixin"]};
define("CommunicationOptionsMixin", ["EmailHelper", "CtiLinkColumnUtility", "EmailLinksMixin"],
	function(EmailHelper) {
		
		/**
		 * @class Terrasoft.configuration.mixins.CommunicationOptionsMixin.
		 * Provides methods for communication options usage.
		 */
		Ext.define("Terrasoft.configuration.mixins.CommunicationOptionsMixin", {
			extend: "Terrasoft.CtiLinkColumnUtility",
			alternateClassName: "Terrasoft.CommunicationOptionsMixin",

			mixins: {
				EmailLinksMixin: "Terrasoft.EmailLinksMixin"
			},

			//region Methods: Private

			/**
			 * Calls action and catches all exceptions.
			 * @private
			 * @param {Function} action Action function.
			 * @param {Array[Object]} args Action arguments array.
			 */
			_safeExecute: function(action, args) {
				try {
					return action.apply(this, args);
				} catch(e) {
					this.log(e.ToString(), Terrasoft.LogMessageType.ERROR);
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * Starts phone call in CTI panel.
			 * @protected
			 * @param {String} number Phone number to call.
			 * @param {String} entitySchemaName Customer field entity schema name.
			 * @param {String} customerId Customer record unique identifier.
			 * @param {Terrasoft.Collection} relationFields Call instance crelation column values collection.
			 * @return {Boolean} False to stop click event propagation.
			 */
			makeCall: function(number, entitySchemaName, customerId, relationFields) {
				if (this.isNotEmpty(number)) {
					this.sandbox.publish("CallCustomer", {
						number: number,
						customerId: customerId,
						entitySchemaName: entitySchemaName,
						callRelationFields: relationFields
					});
				}
				return false;
			},

			/**
			 * Checki is value valid url.
			 * @protected
			 * @param {String} value Value to check.
			 * @return {Boolean} True if value is valid url. Otherwise returns false.
			 */
			isLink: function(value) {
				return Terrasoft.isUrl(value);
			},

			/**
			 * Returns link value config object.
			 * @protected
			 * @param {String} value Raw link value.
			 * @return {Object} Link value config object.
			 */
			getLinkValue: function(value) {
				if (EmailHelper.isEmailAddress(value)) {
					return {
						url: EmailHelper.getEmailUrl(value),
						caption: value
					};
				}
				var regHttp = /(https?|ftp):(\/\/|\\\\)/gim;
				if(value) {
					var nMatch = value.search(regHttp);
					if (nMatch >= 0) {
						return {
							url: value,
							caption: value
						};
					}
				}
				return {
					url: "http://" + value,
					caption: value
				};
			},

			/**
			 * Returns current window instance.
			 * @protected
			 */
			getWindow: function() {
				return window;
			},

			/**
			 * Returns related to new email record config.
			 * @protected
			 * @param {String} email Email.
			 * @return {Object} Related to new email record config.
			 */
			getRelatedRecordConfig: function(email) {
				return {
					schemaName: this.entitySchemaName,
					recordId: this.$Id,
					emailWithName: Ext.String.format("{0} <{1}>", this.$Name, email)
				};
			},

			/**
			 * Returns parent module sandbox id for passed module sandbox id.
			 * @protected
			 * @param {String} moduleSandboxId Module sandbox id.
			 * @return {String} Parent module sandbox id.
			 */
			getParentModuleSandboxId: function(moduleSandboxId) {
				return moduleSandboxId.substring(0, moduleSandboxId.lastIndexOf("module")-1);
			},

			/**
			 * Returns profile schema relation fields values collection.
			 * @protected
			 * @return {Terrasoft.Collection} Profile schema relation fields values collection.
			 */
			getProfileRelationFields: function() {
				var pageSandboxId = this.getParentModuleSandboxId(this.sandbox.id);
				var relatedPageRecordInfo = this.sandbox.publish("GetMiniPageMasterEntityInfo", null, [pageSandboxId]);
				var relationFields = this.Ext.create("Terrasoft.Collection");
				relationFields.add(this.$RelatedPageRecordColumn, {
					name: this.$RelatedPageRecordColumn,
					value: relatedPageRecordInfo && relatedPageRecordInfo.primaryColumnValue,
					type: Terrasoft.DataValueType.GUID
				});
				return relationFields;
			},

			//endregion

			//region Methods: Public

			/**
			 * Starts phone call to contact in CTI panel.
			 * @param {String} number Phone number to call.
			 * @param {String} contactId Contact record unique identifier.
			 * @return {Boolean} False to stop click event propagation.
			 */
			callContact: function(number, contactId) {
				return this.callContactWithRelations(number, contactId);
			},

			/**
			 * Starts phone call to contact in CTI panel.
			 * @param {String} number Phone number to call.
			 * @param {String} contactId Contact record unique identifier.
			 * @param {Terrasoft.Collection} relationFields Related lookup values collection.
			 * @return {Boolean} False to stop click event propagation.
			 */
			callContactWithRelations: function(number, contactId, relationFields) {
				return this._safeExecute(this.makeCall, [number, "Contact", contactId, relationFields]);
			},

			/**
			 * Starts phone call to account in CTI panel.
			 * @param {String} number Phone number to call.
			 * @param {String} accountId Account record unique identifier.
			 * @return {Boolean} False to stop click event propagation.
			 */
			callAccount: function(number, accountId) {
				return this.callAccountWithRelations(number, accountId);
			},

			/**
			 * Starts phone call to account in CTI panel.
			 * @param {String} number Phone number to call.
			 * @param {String} accountId Account record unique identifier.
			 * @param {Terrasoft.Collection} relationFields Related lookup values collection.
			 * @return {Boolean} False to stop click event propagation.
			 */
			callAccountWithRelations: function(number, accountId, relationFields) {
				return this._safeExecute(this.makeCall, [number, "Account", accountId, relationFields]);
			},

			/**
			 * Starts phone call to lead in CTI panel.
			 * @param {String} number Phone number to call.
			 * @param {String} leadId Lead record unique identifier.
			 * @param {Terrasoft.Collection} relationFields Related lookup values collection.
			 * @return {Boolean} False to stop click event propagation.
			 */
			callLeadWithRelations: function(number, leadId, relationFields) {
				return this._safeExecute(this.makeCall, [number, "Lead", leadId, relationFields]);
			},

			/**
			 * Opens new tab with path.
			 * @param {String} path New tab path string.
			 * @return {Boolean} False to stop click event propagation.
			 */
			openNewTab: function(path) {
				return this._safeExecute(function(path) {
					if (this.isLink(path)) {
						this.getWindow().open(path);
					}
					return false;
				}, [path]);
			},

			/**
			 * Sends new email.
			 * @param {String} emailLink New email recipient email.
			 * @return {Boolean} False to stop click event propagation.
			 */
			sendEmail: function(emailLink) {
				var email = emailLink.replace("mailto:", "");
				var relatedRecordConfig = this.getRelatedRecordConfig(email);
				this.emailLinkClicked(Ext.apply({
					email: email
				}, relatedRecordConfig));
				return false;
			}

			//endregion

		});

	});


