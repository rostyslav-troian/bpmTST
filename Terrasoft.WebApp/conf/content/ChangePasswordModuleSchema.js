Terrasoft.configuration.Structures["ChangePasswordModuleSchema"] = {innerHierarchyStack: ["ChangePasswordModuleSchema"]};
define('ChangePasswordModuleSchemaStructure', ['ChangePasswordModuleSchemaResources'], function(resources) {return {schemaUId:'489f57cb-1300-4883-9c06-2fbb27175e04',schemaCaption: "ChangePasswordModuleSchema", parentSchemaName: "", schemaName:'ChangePasswordModuleSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ChangePasswordModuleSchema", ["ServiceHelper", "ChangePasswordModuleSchemaResources"],
	function(ServiceHelper, resources) {
		return {
			attributes: {
				"currentPassword": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},
				"newPassword": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},
				"newPasswordConfirmation": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},
				"isLdap": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},

			diff: [
				{
					"operation": "insert",
					"name": "RelationshipControlGroup",
					"values": {
						"id": "top-container",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "buttonsMenu",
					"parentName": "RelationshipControlGroup",
					"values": {
						"id": "buttonsMenu",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "main-buttons-container",
					"parentName": "buttonsMenu",
					"values": {
						"id": "main-buttons-container",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "change-password-button",
					"parentName": "main-buttons-container",
					"propertyName": "items",
					"values": {
						"id": "change-password-button",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.saveButtonCaption"},
						"enabled": {
							"bindTo": "isLdap",
							"bindConfig": {
								"converter": function(value) {
									return !value;
								}
							}
						},
						"click": {"bindTo": "onChangePasswordClick"},
						"classes": {"textClass": ["change-password-save-button"]}
					}
				},
				{
					"operation": "insert",
					"name": "cancel-button",
					"parentName": "main-buttons-container",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"id": "cancel-button",
						"caption": {"bindTo" : "Resources.Strings.cancelButtonCaption"},
						"click": {
							"bindTo": "onCancelClick"
						}
					}
				},
				{
					"operation": "insert",
					"name": "leftPanelContainer",
					"parentName": "RelationshipControlGroup",
					"values": {
						"id": "leftPanelContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "leftPanelContainer",
					"propertyName": "items",
					"name": "leftPanelGridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "currentPassword",
					"parentName": "leftPanelGridLayout",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isNotRecoveryMode"},
						"value": {
							"bindTo": "currentPassword"
						},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						},
						"controlConfig": {
							"protect": true
						},
						"labelConfig": {
							"caption":  {"bindTo": "Resources.Strings.currentPasswordCaption"}
						},
						"markerValue": "current-password",
						"wrapClass": ["search-edit"]
					}
				},
				{
					"operation": "insert",
					"name": "newPassword",
					"parentName": "leftPanelGridLayout",
					"propertyName": "items",
					"values": {
						"id": "new-password",
						"value": {
							"bindTo": "newPassword"
						},
						"controlConfig": {
							"protect": true
						},
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12
						},
						"labelConfig": {
							"caption":  {"bindTo": "Resources.Strings.newPasswordCaption"}
						},
						"keyup": {
							"bindTo": "onNewPasswordKeypress"
						},
						"markerValue": "new-password",
						"wrapClass": ["search-edit"]
					}
				},
				{
					"operation": "insert",
					"name": "newPasswordConfirmation",
					"parentName": "leftPanelGridLayout",
					"propertyName": "items",
					"values": {
						"id": "new-password-confirmation",
						"value": {
							"bindTo": "newPasswordConfirmation"
						},
						"controlConfig": {
							"protect": true
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						},
						"labelConfig": {
							"caption":  {"bindTo": "Resources.Strings.newPassworConfirmationCaption"}
						},
						"keyup": {
							"bindTo": "onNewPasswordConfirmationKeypress"
						},
						"markerValue": "new-password-confirmation",
						"wrapClass": ["search-edit"]
					}
				}

			],

			methods: {

				init: function() {
					this.callParent(arguments);
					this.actualizeColumnRequired();
					this.initIsLdap();
				},

				actualizeColumnRequired: function() {
					this.columns.currentPassword.isRequired = this.isNotRecoveryMode();
				},

				isNotRecoveryMode: function() {
					var hash = this.Terrasoft.router.Router.getHash();
					return hash.indexOf("PasswordRecoveryMode") === -1;
				},

				getParameterByName: function(name) {
					name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
					var hash = Terrasoft.router.Router.getHash();
					var regex = new RegExp("[\\?&]" + name + "=([^&]*)"),
						results = regex.exec(hash);
					return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
				},

				/**
				 * Redirects to main page or previous state on success pasword change.
				 */
				successRedirect: function() {
					if (this.isNotRecoveryMode()) {
						this.sandbox.publish("BackHistoryState");
					} else {
						var location = window.location;
						var origin = location.origin || location.protocol + "//" + location.host;
						var url = Ext.String.format("{0}{1}", origin, location.pathname);
						this.changeUrl(url);
					}
				},

				/**
				 * Sets url to native window.location.url.
				 * @private
				 * @param {String} url Url to set.
				 */
				changeUrl: function(url) {
					window.location.href = url;
				},

				onChangePasswordClick: function() {
					var isValid = this.validate();
					if (!isValid) {
						return;
					}
					var password = this.get("currentPassword");
					var newPassword = this.get("newPassword");
					var newPasswordConfirmation = this.get("newPasswordConfirmation");
					var sysValues = Terrasoft.SysValue;
					var passwordRecoveryModeKey = this.getParameterByName("PasswordRecoveryMode");
					var authToken = {
						UserName: sysValues.CURRENT_USER.displayValue,
						UserPassword: password,
						WorkspaceName: sysValues.CURRENT_WORKSPACE.displayValue,
						NewUserPassword: newPassword,
						ConfirmUserPassword: newPasswordConfirmation,
						PasswordRecoveryMode: passwordRecoveryModeKey
					};
					var changePasswordServiceUrl = Terrasoft.workspaceBaseUrl +
						"/../ServiceModel/AuthService.svc/DoChangePasswordLogin";
					Terrasoft.AjaxProvider.request({
						url: changePasswordServiceUrl,
						method: "POST",
						jsonData: authToken,
						callback: function(options, result, response) {
							var localizableStrings = resources.localizableStrings;
							if (!result) {
								var errorMessage = localizableStrings.errorPasswordChangeMessage;
								this.showInformationDialog(errorMessage, Ext.emptyFn);
							}
							var responseObject = Terrasoft.decode(response.responseText);
							if (responseObject.Code !== 0) {
								this.showInformationDialog(responseObject.Message, Ext.emptyFn);
							} else {
								var successMessage = localizableStrings.successPasswordChangeMessage;
								this.showInformationDialog(successMessage, function() {
									this.successRedirect();
								});
							}
						},
						scope: this
					});
				},

				onCancelClick: function() {
					this.successRedirect();
				},

				onNewPasswordKeypress: function() {
					var newPasswordTextEdit = Ext.getCmp("new-password");
					var newPasswordInputValue = newPasswordTextEdit.getTypedValue();
					this.set("newPassword", newPasswordInputValue);
				},

				onNewPasswordConfirmationKeypress: function() {
					var newPasswordConfirmationTextEdit = Ext.getCmp("new-password-confirmation");
					var newPasswordConfirmationInputValue = newPasswordConfirmationTextEdit.getTypedValue();
					this.set("newPasswordConfirmation", newPasswordConfirmationInputValue);
				},

				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("newPassword", this.newPasswordValidator);
					this.addColumnValidator("newPasswordConfirmation", this.newPasswordConfirmationValidator);
				},

				newPasswordValidator: function(newPassword) {
					var newPasswordConfirmation = this.get("newPasswordConfirmation");
					var invalidMessage = "";
					if (!Ext.isEmpty(newPasswordConfirmation)) {
						if (newPasswordConfirmation !== newPassword) {
							invalidMessage = resources.localizableStrings.passwordMissMatchMessageCaption;
						} else {
							this.validationInfo.set("newPasswordConfirmation", {
								invalidMessage: "",
								isValid: true
							});
						}
					}
					return {
						invalidMessage: invalidMessage
					};
				},

				newPasswordConfirmationValidator: function(newPasswordConfirmation) {
					var newPassword = this.get("newPassword");
					var invalidMessage = "";
					if (newPasswordConfirmation !== newPassword) {
						invalidMessage = resources.localizableStrings.passwordMissMatchMessageCaption;
					} else {
						this.validationInfo.set("newPassword", {
							invalidMessage: "",
							isValid: true
						});
					}
					return {
						invalidMessage: invalidMessage
					};
				},

				initIsLdap: function() {
					ServiceHelper.callService({
						serviceName: "CurrentUserService",
						methodName: "GetIsCurrentUserSynchronizedWithLdap",
						callback: function(response, success) {
							if (success && response) {
								this.set("isLdap", response.isSynchronized);
							}
						},
						scope: this
					});
				}

			}
		};
	});


