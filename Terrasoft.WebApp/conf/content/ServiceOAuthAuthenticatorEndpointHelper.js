Terrasoft.configuration.Structures["ServiceOAuthAuthenticatorEndpointHelper"] = {innerHierarchyStack: ["ServiceOAuthAuthenticatorEndpointHelper"]};
define("ServiceOAuthAuthenticatorEndpointHelper", ["ServiceOAuthAuthenticatorEndpointHelperResources"],
	function(resources) {
		Ext.define("Terrasoft.ServiceOAuthAuthenticatorEndpointHelper", {
			singleton: true,

			// region Methods: Private

			/**
			 * Executes Ajax request.
			 * @private
			 * @param {Object} requestConfig config for Ajax request.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			_executeRequest: function(requestConfig, callback, scope) {
				requestConfig.headers = requestConfig.headers || {};
				Terrasoft.AjaxProvider.request(Ext.apply(requestConfig, {
					callback: function(request, success, response) {
						Ext.callback(callback, scope, [
							success, Ext.isEmpty(response.responseText) ? "" : JSON.parse(response.responseText)
						]);
					}
				}));
			},

			/**
			 * @private
			 */
			_getOAuthServiceClientSecretUrl: function(OAuthAppId) {
				return Terrasoft.workspaceBaseUrl +
						"/ServiceModel/ServiceOAuthAuthenticatorEndpoint.svc/GetOAuthClientSecret/" + OAuthAppId;
			},

			/**
			 * @private
			 */
			_getOAuthServiceLoginUrl: function(appId) {
				return Terrasoft.workspaceBaseUrl +
						"/ServiceModel/ServiceOAuthAuthenticatorEndpoint.svc/GetAuthorizationGrantUrl/" + appId;
			},

			/**
			 * @private
			 */
			_getOAuthServiceRemoveUserUrl: function() {
				return Terrasoft.workspaceBaseUrl +
						"/ServiceModel/ServiceOAuthAuthenticatorEndpoint.svc/RemoveOAuthUser";
			},

			/**
			 * @private
			 */
			_getOAuthServiceClientSecretRequestConfig: function(appId) {
				const requestUrl = this._getOAuthServiceClientSecretUrl(appId);
				return {
					url: requestUrl,
					method: "GET"
				};
			},

			/**
			 * @private
			 */
			_getOAuthServiceLoginRequestConfig: function(appId) {
				const requestUrl = this._getOAuthServiceLoginUrl(appId);
				return {
					url: requestUrl,
					method: "GET"
				};
			},

			/**
			 * @private
			 */
			_getOAuthServiceUserRemoveConfig: function(userId, appId) {
				const requestUrl = this._getOAuthServiceRemoveUserUrl();
				return {
					url: requestUrl,
					method: "POST",
					jsonData: {"SysUserId": userId, "OAuthAppId": appId}
				};
			},

			/**
			 * @private
			 */
			_isApplicationValid: function(application) {
				return application.$ClientIdLen > 0 && application.$NameLen > 0 &&
					application.$AuthorizeUrlLen > 0 && application.$TokenUrlLen > 0;
			},

			/**
			 * @private
			 */
			_isSharedUserValid: function(application) {
				return !application.$UseSharedUser || !Ext.isEmpty(application.$SharedUser);
			},

			// endregion

			// region Methods: Public

			/**
			 * Removes user from oauth application.
			 * @public
			 * @param {Guid} userId User id.
			 * @param {Guid} appId Application id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			removeOAuthUser: function(userId, appId, callback, scope) {
				const oauthServiceRemoveUserConfig = this._getOAuthServiceUserRemoveConfig(userId, appId);
				this._executeRequest(oauthServiceRemoveUserConfig, callback, scope);
			},

			/**
			 * Fetch Authorization Grant Url for application from service.
			 * @public
			 * @param {Guid} appId Application id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			getAuthorizationGrantUrl: function(appId, callback, scope) {
				const oauthServiceLoginRequestConfig = this._getOAuthServiceLoginRequestConfig(appId);
				this._executeRequest(oauthServiceLoginRequestConfig, callback, scope);
			},

			/**
			 * Fetch Client Secret Key for application from service.
			 * @public
			 * @param {Guid} appId Application id.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Context.
			 */
			getOAuthServiceClientSecretKey: function(appId, callback, scope) {
				const oauthServiceClientSecretConfig = this._getOAuthServiceClientSecretRequestConfig(appId);
				this._executeRequest(oauthServiceClientSecretConfig, callback, scope);
			},

			/**
			 * Returns authorization code redirect url.
			 * @public
			 * @return {String} Authorization code redirect url.
			 */
			getOAuthServiceAuthorizationCodeRedirectUrl: function() {
				return Terrasoft.workspaceBaseUrl +
						"/ServiceModel/ServiceOAuthAuthenticatorEndpoint.svc/AuthorizationCodeRedirectHandler";
			},

			/**
			 * Handles web socket login message.
			 * @param {Object} config Handler config.
			 */
			onLoggedIn: function(config) {
				const handler = function(scope, message) {
					const isEndpointMessage = message && message.Header &&
						message.Header.Sender === "ServiceOAuthAuthenticatorEndpoint";
					let response = {};
					if (isEndpointMessage) {
						response = JSON.parse(message.Body);
						if (!response.success) {
							console.warn("ProcessAuthorizationCode " + response.message);
							const errorTpl = resources.localizableStrings.UnableToProcessAuthorizationCode;
							const msg = Ext.String.format(errorTpl, config.academyUrl);
							Terrasoft.utils.showInformation(msg, null, this, { useHtmlContent: true });
							Ext.callback(config.onError, config.scope, [response]);
						} else {
							if (!Ext.isEmpty(response.message)) {
								const errorTpl = resources.localizableStrings.RefreshTokenNotFound;
								const msg = Ext.String.format(errorTpl, config.academyUrl);
								Terrasoft.utils.showInformation(msg, null, this, { useHtmlContent: true });
							}
							Ext.callback(config.onSuccess, config.scope, [response]);
						}
					}
				};
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, handler, config.scope);
			},

			/**
			 * Checks is application valid.
			 * @param {String} appId Application id.
			 * @param {Function} callback Callback.
			 * @param {Object} scope Scope.
			 */
			validateApplication: function(appId, callback, scope) {
				const select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OAuthApplications"
				});
				select.addColumn("UseSharedUser");
				select.addColumn("SharedUser");
				select.addFunctionColumn("ClientId", Terrasoft.FunctionType.LENGTH, "ClientIdLen");
				select.addFunctionColumn("Name", Terrasoft.FunctionType.LENGTH, "NameLen");
				select.addFunctionColumn("AuthorizeUrl", Terrasoft.FunctionType.LENGTH, "AuthorizeUrlLen");
				select.addFunctionColumn("TokenUrl", Terrasoft.FunctionType.LENGTH, "TokenUrlLen");
				select.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				select.getEntity(appId, function(response) {
					if (response.success) {
						const app = response.entity;
						const isValid = this._isApplicationValid(app) && this._isSharedUserValid(app);
						if (isValid) {
							this.getOAuthServiceClientSecretKey(appId, function(result, key) {
								Ext.callback(callback, scope, [!Ext.isEmpty(key)]);
							}, scope);
						} else {
							Ext.callback(callback, scope, [isValid]);
						}
					}
				}, this);
			}

			// endregion

		});

		return Terrasoft.ServiceOAuthAuthenticatorEndpointHelper;
	});


