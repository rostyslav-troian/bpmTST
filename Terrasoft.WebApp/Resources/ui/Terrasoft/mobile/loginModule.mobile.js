define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	var module = {};

	var renderView = function(renderTo) {
		var logo = Ext.create("Terrasoft.Label", {
			classes: {
				labelClass: ["login-row-container"]
			}
		});
		var loginContainerClass = "login-container";
		var btnsContainerClass = "login-buttons-container";
		var serverUrlCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.ServerUrl
		});
		var loginCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.LoginEditCaption
		});
		var passwordCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.PasswordEditCaption
		});
		var workspaceCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.WorkspaceEditCaption
		});
		var serverUrlEdit = Ext.create("Terrasoft.TextEdit", {
			value: {
				bindTo: "ServerUrl"
			}
		});
		var loginEdit = Ext.create("Terrasoft.TextEdit", {
			value: {
				bindTo: "Login"
			}
		});
		var isSecureConnectionLabel = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.IsSecureConnectionCaption,
			click: {
				bindTo: "onIsSecureConnectionLabelClick"
			}
		});
		var isSecureConnectionContainer = Ext.create("Terrasoft.Container", {
			id: "isSecureConnection-wrapper-id",
			classes: {
				wrapClassName: ["login-isSecureConnection-container"]
			},
			selectors: {
				el: "#isSecureConnection-wrapper-id",
				wrapEl: "#isSecureConnection-wrapper-id"
			},
			items: [
				{
					id: "isSecureConnectionCheckBoxId",
					className: "Terrasoft.CheckBoxEdit",
					checked: {
						bindTo: "IsSecureConnection"
					}
				},
				isSecureConnectionLabel
			]
		});
		var passwordEdit = Ext.create("Terrasoft.TextEdit", {
			protect: true,
			value: {
				bindTo: "Password"
			}
		});
		var workspaceEdit = Ext.create("Terrasoft.ComboBoxEdit", {
			list: {
				bindTo: "workspaceList"
			},
			value: {
				bindTo: "Workspace"
			},
			prepareList: {
				bindTo: "getWorkspaceList"
			}
		});
		var btnLogin = Ext.create("Terrasoft.Button", {
			caption: Terrasoft.Resources.LoginPage.LoginButtonCaption,
			pressed: true,
			style: Terrasoft.controls.ButtonEnums.style.GREEN,
			click: {
				bindTo: "onLoginButtonClick"
			}
		});
		var versionCaption = Ext.create("Terrasoft.Label", {
			caption: {
				bindTo: "Version"
			},
			classes: {
				labelClass: ["login-version"]
			}
		});
		var btnsContainer = Ext.create("Terrasoft.Container", {
			id: "buttonsContainer",
			selectors: {
				wrapEl: "#buttonsContainer"
			},
			classes: {
				wrapClassName: [btnsContainerClass]
			},
			items: [btnLogin, versionCaption]
		});

		module.view = Terrasoft.createViewport({
			id: "viewContainer",
			scrollable: true,
			selectors: {
				wrapEl: "#viewContainer"
			},
			classes: {
				wrapClassName: [loginContainerClass]
			},
			items: [logo, serverUrlCaption, serverUrlEdit, isSecureConnectionContainer, loginCaption, loginEdit,
				passwordCaption, passwordEdit, workspaceCaption, workspaceEdit, btnsContainer],
			renderTo: renderTo
		});
	};

	var prepareModel = function() {
		module.model = Ext.create("Terrasoft.BaseViewModel", {
			values: {
				workspaceList: Ext.create("Terrasoft.Collection")
			},
			columns: {
				ServerUrl: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				IsSecureConnection: {
					dataValueType: Terrasoft.DataValueType.BOOL
				},
				Login: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				Password: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				Workspace: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isRequired: true
				},
				Version: {}
			},
			methods: {

				getWorkspaceList: function() {
					var authServiceUrl = "ServiceModel/AuthService.svc/";
					var serverUrl = module.model.get("ServerUrl");
					if (Ext.isEmpty(serverUrl)) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.ServerUrlIsEmpty);
						return;
					}
					var url = serverUrl + "/" + authServiceUrl + "GetWorkspacesData";
					var options = {
						url: url,
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						scope: this,
						callback: this.workspaceListRequestCallback
					};
					module.view.setMaskVisible(true);
					Ext.Ajax.request(options);
				},

				evaluateServerUrl: function(url) {
					url = url.toLowerCase();
					if (!Ext.String.startsWith(url, "http://") && !Ext.String.startsWith(url, "https://")) {
						url = "http://" + url;
					}
					return !Ext.String.endsWith(url, "/") ? url + "/" : url;
				},

				doLogin: function(urlValue, jsonDataValue) {
					var options = {
						url: urlValue,
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json"
						},
						scope: this,
						callback: this.loginRequestCallback,
						jsonData: jsonDataValue,
						securitySensitiveFields: ["UserPassword"]
					};
					Ext.Ajax.request(options);
				},

				getWorkspaceName: function() {
					var workspace = module.model.get("Workspace");
					if (workspace) {
						workspace = workspace.displayValue;
					}
					return workspace;
				},

				showInfoMessage: function(captionValue) {
					Terrasoft.utils.showMessage({
						caption: captionValue,
						buttons: ["ok"],
						defaultButton: 0,
						style: Terrasoft.MessageBoxStyles.BLUE
					});
				},

				onLoginButtonClick: function() {
					if (!this.validate()) {
						return;
					}
					var model = module.model;
					var serverUrl = model.get("ServerUrl");
					if (!serverUrl) {
						return;
					}
					module.view.setMaskVisible(true);
					serverUrl = this.evaluateServerUrl(serverUrl) + "ServiceModel/AuthService.svc/Login";
					this.doLogin(serverUrl, {
						UserName: model.get("Login"),
						UserPassword: model.get("Password"),
						WorkspaceName: this.getWorkspaceName() || "Default",
						TimeZoneOffset: new Date().getTimezoneOffset()
					});
				},

				loginRequestCallback: function(request, success, response) {
					module.view.setMaskVisible(false);
					var responseStatus = response.status;
					if (success && responseStatus === 200) {
						var responseData = Ext.decode(response.responseText);
						var code = responseData.Code;
						if (code != null) {
							if (code === 0) {
								this.saveAuthenticationParameters({
									success: function() {
										var location = window.location.href;
										if (Ext.os.is.iOS) {
											window.location.href = location + "mobileViewModule.html";
										} else {
											window.location.href =
												location.replace("mobileLogin.html", "mobileViewModule.html");
										}
									},
									failure: function() {
										//TODO ######## ######### exception ### ########## ######### ########
									},
									scope: this
								});
							} else {
								this.showInfoMessage(responseData.Message);
							}
						} else {
							this.showInfoMessage(Terrasoft.Resources.LoginPage.AuthFailed);
						}
					} else if (responseStatus === 401) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongLoginPassword);
					} else {
						throw new Terrasoft.UnauthorizedException({
							message: response.responseText
						});
					}
				},

				workspaceListRequestCallback: function(request, success, response) {
					module.view.setMaskVisible(false);
					if (!success) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.GetWorkspaceListError);
						return;
					}
					var responseData = Ext.decode(response.responseText);
					var listCollection = {};
					for (var i = 0, ln = responseData.length; i < ln; i++) {
						var item = responseData[i];
						listCollection[i] = {
							displayValue: item.Key,
							value: item.Value
						};
					}
					var workspaceList = module.model.get("workspaceList");
					workspaceList.clear();
					workspaceList.loadAll(listCollection);
				},

				onIsSecureConnectionChanged: function(collection, columnValue) {
					var serverUrl = collection.get("ServerUrl");
					if (Ext.isEmpty(serverUrl)) {
						return;
					}
					if (columnValue) {
						collection.set("ServerUrl", serverUrl.replace("http://", "https://"));
					} else {
						collection.set("ServerUrl", serverUrl.replace("https://", "http://"));
					}
				},

				onIsSecureConnectionLabelClick: function() {
					this.set("IsSecureConnection", !this.get("IsSecureConnection"));
				},

				saveAuthenticationParameters: function(config) {
					var model = module.model;
					var data = {
						ServerUrl: model.get("ServerUrl"),
						Login: model.get("Login"),
						Password: model.get("Password"),
						Workspace: model.get("Workspace"),
						TimeZoneOffset: new Date().getTimezoneOffset()
					};
					var sql = "INSERT OR REPLACE INTO MobileProfileData (Key, Value) " +
						"VALUES ('Authentication', '" + JSON.stringify(data) + "')";
					Terrasoft.DBExecutor.executeSql({
						sql: sql,
						success: function() {
							Ext.callback(config.success, config.scope);
						},
						scope: this
					});
				},

				init: function() {
					module.model.on("change:IsSecureConnection", this.onIsSecureConnectionChanged);
					this.on("change:ServerUrl", function(model, value) {
						this.set("ServerUrl", this.evaluateServerUrl(value), {
							silent: true
						});
						this.set("IsSecureConnection", Ext.String.startsWith(value.toLowerCase(), "https://"));
					}, this);
				}
			}
		});
	};

	var getApplicationInfo = function(next) {
		Terrasoft.ApplicationInfoPlugin.getVersion({
			success: function(version) {
				module.model.set("Version", "ver. " + (version ? version : ""));
				next();
			},
			scope: this
		});
	};

	var prepareDatabase = function(next) {
		Terrasoft.DBExecutor.executeSql({
			sql: "CREATE TABLE IF NOT EXISTS MobileProfileData (Key TEXT NOT NULL PRIMARY KEY, Value TEXT)",
			success: function() {
				next();
			},
			scope: this
		});
	};

	var getAuthenticationData = function() {
		Terrasoft.DBExecutor.executeSql({
			sql: "select Value from MobileProfileData where Key = 'Authentication' limit 1",
			success: function(result) {
				if (!result) {
					return;
				}
				var rows = result.rows;
				if (rows && rows.length > 0) {
					var model = module.model;
					var data = rows.item(0);
					var authData = JSON.parse(data.Value);
					model.set("ServerUrl", authData.ServerUrl);
					model.set("Login", authData.Login);
					model.set("Password", authData.Password);
					var workspace = authData.Workspace;
					if (workspace) {
						model.set("Workspace", {
							value: workspace.value,
							displayValue: workspace.displayValue
						});
					}
				}
			},
			scope: this
		});
	};

	return {
		renderTo: Ext.getBody(),
		render: function(renderTo) {
			prepareModel();
			var model = module.model;
			model.init();
			renderView(renderTo);
			module.view.bind(model);
			Terrasoft.chain(getApplicationInfo, prepareDatabase, getAuthenticationData);
		}
	};
});