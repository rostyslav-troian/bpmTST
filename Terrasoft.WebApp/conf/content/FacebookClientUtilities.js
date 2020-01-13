Terrasoft.configuration.Structures["FacebookClientUtilities"] = {innerHierarchyStack: ["FacebookClientUtilities"]};
define("FacebookClientUtilities", ["FacebookClientUtilitiesResources", "ConfigurationConstants"],
		function(resources, ConfigurationConstants) {
	Ext.define("Terrasoft.configuration.social.mixins.FacebookClientUtilities", {
		alternateClassName: "Terrasoft.FacebookClientUtilities",

		/**
		 * True, if Facebook connection is initialized.
		 * @private
		 * @type {Boolean}
		 */
		facebookConnectorInitialized: false,

		/**
		 * ######## ######## ###### ############# ######## ######### ######,
		 * ####### ############# ########### # Facebook.
		 * @private
		 * @type {String}
		 */
		facebookConnectorPropertyName: "FacebookConnector",

		/**
		 * ######## ######, ####### ############# ########### # Facebook.
		 * @private
		 * @type {String}
		 */
		facebookConnectorClassName: "Terrasoft.FacebookClientConnector",

		/**
		 * ######## ##### ############ #####, ####### ############# ########### # Facebook.
		 * @private
		 * @type {String}
		 */
		facebookConnectorSchemaName: "FacebookClientConnector",

		/**
		 * ########## ######### ######, ####### ############# ########### # Facebook.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		getFacebookConnector: function(callback, scope) {
			if (this.facebookConnectorInitialized) {
				callback.call(scope, this.get(this.facebookConnectorPropertyName));
				return;
			}
			this.initFacebookConnector(function() {
				callback.call(scope, this.get(this.facebookConnectorPropertyName));
			}, this);
		},

		/**
		 * ########## ######## ######, ####### ############# ########### # Facebook.
		 * @protected
		 * @virtual
		 * @return {String} ######## ######, ####### ############# ########### # Facebook.
		 */
		getFacebookConnectorClassName: function() {
			return this.facebookConnectorClassName;
		},

		/**
		 * ############# ########### # Facebook.
		 * @private
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		initFacebookConnector: function(callback, scope) {
			this.Terrasoft.require([this.facebookConnectorSchemaName], function() {
				var connectorClassName = this.getFacebookConnectorClassName();
				var connector = this.Ext.create(connectorClassName, {
					type: ConfigurationConstants.CommunicationTypes.Facebook,
					user: this.Terrasoft.SysValue.CURRENT_USER.value
				});
				connector.init(function(response) {
					if (response && !response.success) {
						return this.handleConnectorError(response.errorInfo, function() {
							callback.call(scope);
						}, this);
					}
					this.set(this.facebookConnectorPropertyName, connector);
					this.facebookConnectorInitialized = true;
					callback.call(scope);
				}, scope);
			}, this);
		},

		/**
		 * ############ ###### ### ###### # ####### ########.
		 * @param {Object} errorInfo ########## ## ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		handleConnectorError: function(errorInfo, callback, scope) {
			var errorCode = errorInfo.errorCode;
			if (errorCode === "MissingConsumerKeyException") {
				return this.handleMissingConsumerKeyException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "MissingConsumerSecretException") {
				return this.handleMissingConsumerSecretException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "MissingSocialAccountException") {
				return this.handleMissingSocialAccountException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "InvalidAccessTokenException") {
				return this.handleInvalidAccessTokenException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "MissingConsumerInfoServiceUriException") {
				return this.handleMissingConsumerInfoServiceUriException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "DublicateDataException") {
				return this.handleDublicateDataExceptionException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			if (errorCode === "FacebookOAuthException") {
				return this.handleFacebookOAuthException(errorInfo, function() {
					callback.call(scope);
				}, this);
			}
			this.throwConnectorError(errorInfo);
		},

		/**
		 * ########## ######### ## ######.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 */
		throwConnectorError: function(errorInfo) {
			throw new this.Terrasoft.UnknownException({
				message: this.getConnectorErrorMessage(errorInfo)
			});
		},

		/**
		 * ######### # ### ######### ## ######.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 * @param {Terrasoft.LogMessageType} type ### #########, #### ## ####### - ############ ##### console.error.
		 */
		logConnectorError: function(errorInfo, type) {
			var message = this.getConnectorErrorMessage(errorInfo);
			var messageType = (this.Ext.isEmpty(type)) ? this.Terrasoft.LogMessageType.ERROR : type;
			this.log(message, messageType);
		},

		/**
		 * ########## ######### ## ######.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 * @return ######### ## ######.
		 */
		getConnectorErrorMessage: function(errorInfo) {
			var template = "{0}: {1}\n{2}";
			return this.Ext.String.format(template, errorInfo.errorCode, errorInfo.message, errorInfo.stackTrace);
		},

		/**
		 * ############ ########, ##### # ############ ########### ####### ###### # ########## ####.
		 * ########## ####### ################# ############ # ####### ####### ######.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		handleMissingSocialAccountException: function(errorInfo, callback, scope) {
			this.logConnectorError(errorInfo, this.Terrasoft.LogMessageType.INFORMATION);
			this.createFacebookSocialAccount(callback, scope);
		},

		/**
		 * ############ ########, ##### # ####### ## ######### ######### #########
		 * "#### Facebook ### ####### # ###. ####".
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 */
		handleMissingConsumerKeyException: function(errorInfo) {
			this.logConnectorError(errorInfo);
			this.showInformationDialog(resources.localizableStrings.FacebookConnectorErrorMessage);
		},

		/**
		 * ############ ########, ##### # ####### ## ######### ######### #########
		 * "######### #### Facebook ### ####### # ###. ####".
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 */
		handleMissingConsumerSecretException: function(errorInfo) {
			this.logConnectorError(errorInfo);
			this.showInformationDialog(resources.localizableStrings.FacebookConnectorErrorMessage);
		},

		/**
		 * ############ ########, ##### # ####### ## ######## ##### ####### ######### ######## ########## ## #######
		 * #######.
		 * @private
		 */
		handleMissingConsumerInfoServiceUriException: function() {
			this.showInformationDialog(resources.localizableStrings.FacebookConnectorErrorMessage);
		},

		/**
		 * ############ ########, ##### # ####### ### ########## ####### ###### ## ####### #######.
		 * @private
		 */
		handleDublicateDataExceptionException: function() {
			this.showInformationDialog(resources.localizableStrings.DublicateDataErrorMessage);
		},

		/**
		 * ############ ########, ##### ######### ########## ###### Facebook SDK.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 */
		handleFacebookOAuthException: function(errorInfo) {
			this.logConnectorError(errorInfo);
			this.showInformationDialog(resources.localizableStrings.FacebookConnectorErrorMessage);
		},

		/**
		 * ############ ########, ##### ##### ####### ############ # ########## #### ## #########.
		 * ########## ####### ################# ############ # ######## ##### #######.
		 * @private
		 * @param {Object} errorInfo ########## ## ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		handleInvalidAccessTokenException: function(errorInfo, callback, scope) {
			this.logConnectorError(errorInfo);
			this.getFacebookConnector(function(connector) {
				var currentSocialAccount = connector.socialAccount;
				var isPublic = currentSocialAccount.isPublic;
				var isOwner = (currentSocialAccount.userId === this.Terrasoft.SysValue.CURRENT_USER.value);
				if (isPublic && !isOwner) {
					this.createFacebookSocialAccount(function() {
						callback.call(scope);
					}, this);
				} else {
					var config = {};
					connector.updateAccessToken(config, function() {
						callback.call(scope);
					}, this);
				}
			}, this);
		},

		/**
		 * ####### ####### ###### ## ####### #######.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		createFacebookSocialAccount: function(callback, scope) {
			this.getFacebookConnector(function(connector) {
				connector.tryLoginUser(function(authResponse) {
					var config = connector.prepareCreateSocialAccountConfig(authResponse);
					connector.createSocialAccount(config, function(response) {
						if (!response.success) {
							return this.handleConnectorError(response.errorInfo, function() {
								callback.call(scope);
							}, this);
						}
						callback.call(scope, response);
					}, this);
				}, this);
			}, this);
		},

		/**
		 * #########, ######## ## ########## # ####### ########.
		 * @protected
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} scope ######## ###### ####### ######### ######.
		 */
		checkCanFacebookConnectorOperate: function(callback, scope) {
			this.getFacebookConnector(function(connector) {
				connector.checkCanOperate({}, function(response) {
					var success = response.success;
					if (!success) {
						return this.handleConnectorError(response.errorInfo, function() {
							callback.call(scope);
						}, this);
					}
					callback.call(scope);
				}, this);
			}, this);
		}
	});
});


