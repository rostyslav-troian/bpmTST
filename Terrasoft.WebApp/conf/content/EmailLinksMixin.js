Terrasoft.configuration.Structures["EmailLinksMixin"] = {innerHierarchyStack: ["EmailLinksMixin"]};
define("EmailLinksMixin", ["EmailConstants", "ConfigurationEnums", "ConfigurationConstants", "NetworkUtilities",
		"EmailHelper"],
	function(EmailConstants, ConfigurationEnums, ConfigurationConstants, NetworkUtilities, EmailHelper) {
		/**
		 * @class Terrasoft.configuration.mixins.EmailLinksMixin
		 * Provides methods for email sending.
		 */
		Ext.define("Terrasoft.configuration.mixins.EmailLinksMixin", {
			alternateClassName: "Terrasoft.EmailLinksMixin",

			//region Methods: private

			/**
			 * Adds filters to entity schema query for getting email synchronization settings.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery}[esq] Entity schema query.
			 */
			_addSelectMailboxQueryFilters: function(esq) {
				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var filtersGroup = esq.createFilterGroup();
				filtersGroup.name = "FilterGroup";
				filtersGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				var filterSettings = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
					Terrasoft.core.enums.SysValue.CURRENT_USER.value);
				var filterIsEmailForSend = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SendEmailsViaThisAccount", true);
				var filterIsShared = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IsShared", true);
				filtersGroup.add("FilterEmailSettings", filterSettings);
				filtersGroup.add("FilterIsSharedName", filterIsShared);
				esq.filters.add(filtersGroup.name, filtersGroup);
				esq.filters.add("FilterIsEmailForSendName", filterIsEmailForSend);
			},

			/**
			 * Create entity schema query for getting email synchronization settings.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
			 */
			_getSenderQuery: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MailboxSyncSettings",
					clientESQCacheParameters: {
						cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: "MailboxSyncSettings" + Terrasoft.SysValue.CURRENT_USER.value,
						cacheItemName: "RightMailboxCount"
					}
				});
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				this._addSelectMailboxQueryFilters(esq);
				return esq;
			},

			/**
			 * Prepare card configuration to open email page.
			 * @private
			 * @return {Object} Card configuration.
			 */
			_getCardConfig: function() {
				var historyState = this.sandbox.publish("GetHistoryState");
				var cardConfig = {
					sandbox: this.sandbox,
					entitySchemaName: EmailConstants.entitySchemaName,
					primaryColumnValue: Terrasoft.GUID_EMPTY,
					operation: ConfigurationEnums.CardStateV2.ADD,
					historyState: historyState,
					typeId: ConfigurationConstants.Activity.Type.Email
				};
				return cardConfig;
			},

			/**
			 * Prepare card default values to open email page.
			 * @private
			 * @param {object} [emailConfig] Email config.
			 * @param {object} [params] Additional params to add return array.
			 * @return {Array} Card variables.
			 */
			_getPrepareCardDefaultValues: function(emailConfig, params) {
				var valuePairs = [{
					name: "Recepient",
					value: emailConfig.emailWithName || emailConfig.email
				}, {
					name: "Type",
					value: ConfigurationConstants.Activity.Type.Email
				}, {
					name: emailConfig.schemaName,
					value: emailConfig.recordId
				}];
				if (params) {
					params.forEach(function(param) {
						valuePairs.add(param);
					}, this);
				}
				return valuePairs;
			},

			/**
			 * Open email activity page with filled default values.
			 * @private
			 * @param {Object} {emailConfig} Email information.
			 * @param {Function} [callback] Callback function.
			 */
			_openEmailCard: function(emailConfig, callback) {
				var historyState = this.sandbox.publish("GetHistoryState");
				var cardConfig = this._getCardConfig();
				var entitySchemaConfig = NetworkUtilities.getEntityConfigUrl({
					entitySchema: cardConfig.entitySchemaName,
					primaryColumnValue: Terrasoft.GUID_EMPTY,
					typeColumnValue: cardConfig.typeId,
					operation: ConfigurationEnums.CardStateV2.ADD
				});
				var entitySchemaName = entitySchemaConfig.entitySchemaName;
				var moduleId = this.sandbox.id + "_" + entitySchemaName;
				var valuePairs = this._getPrepareCardDefaultValues(emailConfig);
				var config = {
					entitySchemaName: cardConfig.entitySchemaName,
					primaryColumnValue: Terrasoft.GUID_EMPTY,
					typeId: cardConfig.typeId,
					operation: ConfigurationEnums.CardStateV2.ADD,
					moduleName: entitySchemaConfig.cardModule,
					moduleId: moduleId,
					historyState: historyState,
					sandbox: this.sandbox,
					valuePairs: valuePairs
				};
				NetworkUtilities.openCard(config);
				Ext.callback(callback, this);
			},

			/**
			 * Opens email activity page with filled default values or default Windows event handler.
			 * @private
			 * @param {Object} [emailConfig] Email information.
			 * @param {Function} [callback] Callback function.
			 * @return {Boolean} True.
			 */
			_openEmailPageWithValues: function(emailConfig, callback) {
				var isEmailLinkHandler = this._isEmailLinkHandlerEnabled();
				if (this.$SyncMailboxCount > 0 && isEmailLinkHandler) {
					this._openEmailCard(emailConfig, callback);
				} else {
					var path = EmailHelper.getEmailUrl(emailConfig.email);
					var tab = this.getWindow().open(path);
					setTimeout(function() {
						if (tab && tab.close) {
							tab.close();
						}
					}, 50);
					Ext.callback(callback, this);
				}
				return true;
			},
			/**
			 * Show is feature EmailLinkHandler enabled.
			 * @private
			 * @return {Boolen} True if feature EmailLinkHandler enabled, otherwise false.
			 */
			_isEmailLinkHandlerEnabled: function() {
				return Terrasoft.Features.getIsEnabled("EmailLinkHandler");
			},

			//endregion

			//region Methods: protected

			/**
			 * Get synchronization mailbox count and forwarding to callback.
			 * @protected
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback-function execution context.
			 */
			initSyncMailboxCount: function(callback, scope) {
				var isEmailLinkHandler = this._isEmailLinkHandlerEnabled();
				if (isEmailLinkHandler) {
					var sendersEsq = this._getSenderQuery();
					sendersEsq.getEntityCollection(function(result) {
						this.$SyncMailboxCount = result.collection.collection.length || 0;
						Ext.callback(callback, scope, [this.$SyncMailboxCount]);
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * Email link clicked handler.
			 * @protected
			 * @param {Object} [emailConfig] Email information.
			 * @param {Function} [callback] Callback function.
			 * @return {Boolean} True if correct email and feature is enabled.
			 */
			emailLinkClicked: function(emailConfig, callback) {
				if (!EmailHelper.isEmailAddress(emailConfig.email)) {
					return false;
				}
				return this._openEmailPageWithValues(emailConfig, callback);

			},

			/**
			 * Get required  email information.
			 * @protected
			 * @param {String} recordId Record identifier.
			 * @param {String} email Email.
			 * @param {String} [name] Name of email.
			 * @return {Object} Email information.
			 */
			getEmailConfig: function(recordId, email, name) {
				var emailConfig = {
					schemaName: this.entitySchemaName,
					recordId: recordId,
					email: email,
					emailWithName: EmailHelper.getEmailWithName(email, name)
				};
				return emailConfig;
			},

			/**
			 * Return current window instance.
			 * @protected
			 */
			getWindow: function() {
				return window;
			}

			//endregion

		});
	});


