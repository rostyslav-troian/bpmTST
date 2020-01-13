Terrasoft.configuration.Structures["CustomerAccessListMixin"] = {innerHierarchyStack: ["CustomerAccessListMixin"]};
define("CustomerAccessListMixin", ["CustomerAccessListMixinResources", "ModalBox", "RightUtilities",
			"SystemOperationsPermissionsMixin"], function(mixinResources, ModalBox, RightUtilities) {
		/**
		 * @class Terrasoft.configuration.mixins.CustomerAccessListMixin
		 * Mixin for receiving external access to customer's site.
		 *
		 * Messages should be registered at the host schema:
			"GetCustomerAccessLookupPageConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"HideCustomerAccessLookupPageModule": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		 */
		Ext.define("Terrasoft.configuration.mixins.CustomerAccessListMixin", {
			alternateClassName: "Terrasoft.CustomerAccessListMixin",

			mixins: {
				SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
			},
			/**
			 * Shows lookup page to select external access by customer ids.
			 * @param {string[]} customerIds Customer ids.
			 * @param {Function} callback Callback function.
			 * @param {Object} [callback.accessConfig] Selected external access record.
			 */
			showLookupPage: function(customerIds, callback) {
				const moduleId = this.sandbox.id + "CustomerAccessLookupPage";
				const modalBoxSelectorClass = "customer-access-page-modal-box";
				const modalBoxConfig = {
					heightPixels: 400,
					widthPixels: 800,
					boxClasses: [modalBoxSelectorClass]
				};
				const renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}, this);
				const maskId = Terrasoft.Mask.show({
					timeout: 10,
					selector: "." + modalBoxSelectorClass,
					clearMasks: true,
					showSpinner: true
				});
				this.sandbox.loadModule("BaseSchemaModuleV2", {
					id: moduleId,
					renderTo: renderTo.id,
					instanceConfig: {
						parameters: {
							viewModelConfig: {
								"MaskId": maskId
							}
						},
						schemaName: "CustomerAccessLookupPage",
						isSchemaConfigInitialized: true,
						useHistoryState: false
					}
				});
				this.subscribeOnLookupPageMessages(moduleId, customerIds, callback);
			},
			/**
			 * @private
			 * @param {String} moduleId Lookup page module id.
			 * @param {String[]} customerIds Customers ids.
			 * @param {Function} callback Callback function will be called when lookup page box has been closed.
			 */
			subscribeOnLookupPageMessages: function(moduleId, customerIds, callback) {
				this.sandbox.subscribe("GetCustomerAccessLookupPageConfig", function() {
					return {
						operation: "refresh",
						customerIds: customerIds
					};
				}.bind(this), this, [moduleId]);
				this.sandbox.subscribe("HideCustomerAccessLookupPageModule", function(selectedAccessConfig) {
					callback(selectedAccessConfig);
					ModalBox.close();
				}, this, [moduleId]);
			},
			/**
			 * @private
			 * @param {String} accessId External access id.
			 * @param {Function} callback Callback function.
			 */
			requestAccessToken: function(accessId, callback) {
				this.callService({
						serviceName: "TempAccessService",
						methodName: "GetAccessToken",
						data: {
							accessId: accessId
						}
					}, callback, this);
			},
			/**
			 * Logs data to ExternalAccessRequestLog.
			 * @private
			 * @param {Object} accessConfig External access config.
			 * @param {Function} callback Callback function.
			 */
			_logExternalAccessRequest: function(accessConfig, callback) {
				const insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "ExternalAccessRequestLog"
				});
				insert.setParameterValue("ExternalAccessId", accessConfig.Id, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("ExternalAccessDescription", accessConfig.Description,
					this.Terrasoft.DataValueType.TEXT);
				insert.setParameterValue("CustomerId", accessConfig.CustomerId, this.Terrasoft.DataValueType.TEXT);
				insert.setParameterValue("Url", accessConfig.Url, this.Terrasoft.DataValueType.TEXT);
				insert.execute(callback);
			},
			/**
			 * Requests access token by the given external access config and redirects to grantor's OAuth login page.
			 * @protected
			 * @param {Object} accessConfig External access config.
			 * @param {String} accessConfig.Id External access id.
			 * @param {String} accessConfig.Url External access url.
			 * @param {String} accessConfig.Description External access description.
			 * @param {String} accessConfig.CustomerId Customer identifier (CID).
			 */
			redirectToExternalAccessLogin: function(accessConfig) {
				const maskId = Terrasoft.Mask.show({
					timeout: 10
				});
				this.requestAccessToken(accessConfig.Id, function(response) {
					Terrasoft.Mask.hide(maskId);
					const accessToken = response.result;
					if (!accessToken) {
						const message = mixinResources.localizableStrings.AccessTokenRequestError;
						Terrasoft.showErrorMessage(message);
						return;
					}
					this._logExternalAccessRequest(accessConfig, function() {
						const redirectUrl = Ext.String.format("{0}/Login/ExternalAccessLogin.aspx#access_token={1}",
							accessConfig.Url, accessToken);
						const newTab = window.open(redirectUrl);
						newTab.focus();
					});
				});
			},
			/**
			 * Adds UI action to show access list.
			 * @param {Terrasoft.Collection} actionMenuItems Collection of menu items.
			 */
			addCustomersAccessListMenuItem: function(actionMenuItems) {
				if (this.getIsFeatureEnabled("DisableExternalAccess") ||
						this.Terrasoft.CurrentUser.userType !== this.Terrasoft.UserType.GENERAL) {
					return;
				}
				actionMenuItems.add("GetRelatedCustomersAccessList", this.getButtonMenuItem({
					"Caption": mixinResources.localizableStrings.GetRelatedCustomersAccessList,
					"Tag": "getRelatedCustomersAccessList",
					"MarkerValue": "GetRelatedCustomersAccessList"}
				));
			},
			/**
			 * @protected
			 */
			getRelatedCustomersAccessList: function() {
				const operationCode = "CanUseExternalAccess";
				RightUtilities.checkCanExecuteOperations([operationCode], function(result) {
					if (result && result[operationCode]) {
						this.getCustomerIds(this.requestRelatedCustomersAccessListCallback);
					} else {
						this.showPermissionsErrorMessage(operationCode);
					}
				}, this);
			},
			/**
			 * Returns customers to request access list.
			 * @param {String[]} customerIds Customer ids.
			 * @protected
			 * @virtual
			 */
			requestRelatedCustomersAccessListCallback: function(customerIds) {
				if (Terrasoft.isEmpty(customerIds)) {
					Terrasoft.showMessage(mixinResources.localizableStrings.NoCustomerIdsFound);
					return;
				}
				this.showLookupPage(customerIds, function(accessConfig) {
					if (!accessConfig) {
						return;
					}
					this.redirectToExternalAccessLogin(accessConfig);
				}.bind(this));
			},
			/**
			 * Returns customers to request access list.
			 * @param {Function} callback Function will be called to return results.
			 * @protected
			 * @virtual
			 */
			getCustomerIds: function(callback) {
				if (Ext.isFunction(callback)) {
					callback.call(this, []);
				}
			}
		});
	});


