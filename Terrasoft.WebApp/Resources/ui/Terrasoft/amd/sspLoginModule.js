define(["ext-base", "terrasoft", "login-view-utils"], function(Ext, Terrasoft, loginUtils) {

	var viewModuleAddress = "/Nui/ViewModule.aspx";
	var module = {};

	var init = function() {
	};

	var createImportantLinks = function(items) {
		return Ext.create("Terrasoft.HtmlControl", {
			tpl: [
				/*jshint quotmark: false */
				//jscs:disable
				'<ul id="{id}">',
				'<tpl for="items">',
				'<li class="login-links-list">',
				'<a target="_blank" class="login-important-link" href="{href}">',
				/*jshint quotmark: true */
				//jscs:enable
				"{caption}",
				"</a>",
				"</li>",
				"</tpl>",
				"</ul>"
			],
			id: "importantLinks",
			tplData: {
				items: items
			},
			selectors: {wrapEl: "#importantLinks"}
		});
	};

	var renderInfoView = function() {
		if (window.changePasswordMode === true) {
			return null;
		}
		var loginEmptyRowClass = "login-empty-row";
		var loginInfoLabelHeaderClass = "login-info-label-header";
		var loginSubcellSupportInfoLabelClass = "login-subcell-support-info-label";
		var loginSubcellSupportInfoTelClass = "login-subcell-support-tel-label";
		var loginSubcellSupportClass = "login-subcell-support";
		var contSupportData = null;
		var contImportantBaseLinks = null;
		if (window.supportInfo.length > 0) {
			var contInfoTable = loginUtils.createTableContainer("supportInfoTable");
			var index = 0;
			Terrasoft.each(window.supportInfo, function(elem) {
				var rowInfo = loginUtils.createRowContainer("infoRow_" + index);
				contInfoTable.items.add(rowInfo);
				var label = loginUtils.createLabel(elem.name);
				label.classes.labelClass.push(loginSubcellSupportInfoLabelClass);
				var supportInfoCell = loginUtils.createCellContainer("supportNameCell_" + index);
				supportInfoCell.classes.wrapClassName.push(loginSubcellSupportClass);
				supportInfoCell.items.add(label);
				rowInfo.items.add(supportInfoCell);

				label = loginUtils.createLabel(elem.tel);
				label.classes.labelClass.push(loginSubcellSupportInfoTelClass);
				supportInfoCell = loginUtils.createCellContainer("supportTelCell_" + index);
				supportInfoCell.classes.wrapClassName.push(loginSubcellSupportClass);
				supportInfoCell.items.add(label);
				rowInfo.items.add(supportInfoCell);
				index++;
			}, this);
			var labelSupport = Ext.create("Terrasoft.Label", {
				caption: window.supportInfoCaption,
				classes: {
					labelClass: [loginInfoLabelHeaderClass]
				}
			});
			contSupportData = loginUtils.createTableContainer("supportTable");
			var supportRow = loginUtils.createRowContainer("supportLogoRow");
			contSupportData.items.add(supportRow);
			var supportCell = loginUtils.createCellContainer("supportLogoCell");
			supportRow.items.add(supportCell);
			supportCell.items.add(labelSupport);
			supportRow = loginUtils.createRowContainer("supportDataRow");
			contSupportData.items.add(supportRow);
			supportCell = loginUtils.createCellContainer("supportNameCell");
			supportRow.items.add(supportCell);
			supportCell.items.add(contInfoTable);
		}
		if (window.importantLinks.length > 0) {
			contImportantBaseLinks = loginUtils.createTableContainer("linksBaseTable");
			var linksRow = loginUtils.createRowContainer("linksLogoRow");
			contImportantBaseLinks.items.add(linksRow);
			var linksCell = loginUtils.createCellContainer("linksLogoCell");
			linksRow.items.add(linksCell);
			var labelLinks = Ext.create("Terrasoft.Label", {
				caption: window.importantLinksCaption,
				classes: {
					labelClass: [loginInfoLabelHeaderClass]
				}
			});
			linksCell.items.add(labelLinks);
			linksRow = loginUtils.createRowContainer("linksDataRow");
			contImportantBaseLinks.items.add(linksRow);
			var itemsConfig = [];
			Terrasoft.each(window.importantLinks, function(elem) {
				itemsConfig.push({
					caption: elem.name,
					href: elem.link
				});
			}, this);
			var links = createImportantLinks(itemsConfig);
			linksCell = loginUtils.createCellContainer("supportLogoCell");
			linksCell.items.add(links);
			linksRow.items.add(linksCell);
		}
		if (contSupportData != null || contImportantBaseLinks != null) {
			var contExtendInfo = loginUtils.createCellContainer("extendInfoContainer");
			if (contSupportData != null) {
				var suppRowInfo = loginUtils.createRowContainer("supportRowInfo");
				suppRowInfo.items.add(contSupportData);
				contExtendInfo.items.add(suppRowInfo);
				var suppRowInfoEmpty = loginUtils.createRowContainer("supportRowInfoEmpty");
				suppRowInfoEmpty.classes.wrapClassName.push(loginEmptyRowClass);
				contExtendInfo.items.add(suppRowInfoEmpty);
			}
			if (contImportantBaseLinks != null) {
				contExtendInfo.items.add(contImportantBaseLinks);
			}
			return contExtendInfo;
		}
		return null;
	};

	var renderView = function(renderTo) {
		// Classnames for elements
		var headClass = "login-label-logo";
		var smallCaptionClass = "login-label-smallCaption";
		var loginPasswordEditClass = "login-textedit-login-password";
		var loginBtnClass = "login-button-login";
		var blueColorClass = "login-label-blue";
		var smallMarginClass = "login-label-smallMargin";
		var loginHelpClass = "login-label-help";
		var passwordHelpClass = "password-label-help";
		var userManagementClass = "user-management-container";
		var versionClass = "login-label-version";
		var loginRememberClass = "login-label-remember";
		var checkboxClass = "login-checkbox-remember";
		var helperClass = "login-label-helper";
		var passwordHelpContainerClass = "password-help-container";
		var containerRememberClass = "login-container-remember";
		var loginRememberContainerWithRememberLink = "login-container-with-remember-link";
		var containerFooterClass = "login-container-footer";
		var containerRememberClassInside = "login-container-remember-inside";
		var loginBorderRightClass = "login-border-right";
		var loginBorderLeftClass = "login-border-left";
		var loginInsideContainerClass = "login-inside-container";
		var loginOutsideContainerClass = "login-outside-container";
		var logoImageUrl = Ext.String.format("{0}{1}",
				Terrasoft.workspaceBaseUrl, window.loginImageUrl);
		// elements
		var logo = Ext.create("Terrasoft.ImageEdit", {
			readonly: true,
			classes: {
				wrapClass: [headClass]
			},
			imageSrc: logoImageUrl
		});
		var loginCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.LoginEditCaption,
			classes: {
				labelClass: [smallCaptionClass]
			}
		});
		var passwordCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.PasswordEditCaption,
			classes: {
				labelClass: [smallCaptionClass, smallMarginClass]
			}
		});
		var newPasswordCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.NewPasswordEditCaption,
			classes: {
				labelClass: [smallCaptionClass, smallMarginClass]
			}
		});
		var confirmPasswordCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.ConfirmPasswordEditCaption,
			classes: {
				labelClass: [smallCaptionClass, smallMarginClass]
			}
		});
		var workspaceCaption = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.WorkspaceEditCaption,
			classes: {
				labelClass: [smallCaptionClass, smallMarginClass]
			}
		});
		var selfRegistrationLinkVisible = Terrasoft.showSelfRegistrationLink;
		var loginHelp = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.Register,
			classes: {
				labelClass: [smallCaptionClass, blueColorClass, loginHelpClass]
			},
			click: {bindTo: "onRegisterClick"},
			visible: selfRegistrationLinkVisible
		});
		var passwordHelp = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.ForgetPassword,
			classes: {
				labelClass: [smallCaptionClass, blueColorClass, passwordHelpClass]
			},
			click: {bindTo: "onRemindPasswordClick"}
		});
		var userManagement = Ext.create("Terrasoft.Container", {
			id: "userManagementContainer",
			selectors: {
				wrapEl: "#userManagementContainer"
			},
			classes: {
				wrapClassName: [userManagementClass]
			},
			items: [loginHelp]
		});
		var loginEdit = Ext.create("Terrasoft.TextEdit", {
			id: "loginEdit",
			classes: {
				wrapClass: [loginPasswordEditClass]
			},
			keyup: {
				bindTo: "onKeyUp"
			},
			value: {
				bindTo: "Login"
			},
			markerValue: "loginEdit"
		});
		var passwordEdit = Ext.create("Terrasoft.TextEdit", {
			id: "passwordEdit",
			protect: true,
			classes: {
				wrapClass: [loginPasswordEditClass]
			},
			keyup: {
				bindTo: "onKeyUp"
			},
			value: {
				bindTo: "Password"
			},
			markerValue: "passwordEdit"
		});
		var newPasswordEdit = Ext.create("Terrasoft.TextEdit", {
			protect: true,
			classes: {
				wrapClass: [loginPasswordEditClass]
			},
			keyup: {
				bindTo: "onKeyUp"
			},
			value: {
				bindTo: "NewPassword"
			}
		});
		var confirmPasswordEdit = Ext.create("Terrasoft.TextEdit", {
			protect: true,
			classes: {
				wrapClass: [loginPasswordEditClass]
			},
			keyup: {
				bindTo: "onKeyUp"
			},
			value: {
				bindTo: "ConfirmPassword"
			}
		});

		var workspaceEdit = Ext.create("Terrasoft.ComboBoxEdit", {
			classes: {
				wrapClass: [loginPasswordEditClass]
			},
			keyup: {
				bindTo: "onKeyUp"
			},
			list: {
				bindTo: "workspaceList"
			},
			value: {
				bindTo: "Workspace"
			},
			markerValue: "workspaceEdit",
			prepareList: {
				bindTo: "getWorkspaceList"
			}
		});
		var btnLogin = Ext.create("Terrasoft.Button", {
			caption: Terrasoft.Resources.LoginPage.LoginButtonCaption,
			pressed: true,
			style: Terrasoft.controls.ButtonEnums.style.GREEN,
			classes: {
				textClass: [loginBtnClass]
			},
			click: {
				bindTo: "onLoginButtonClick"
			},
			markerValue: "btnLogin"
		});
		var btnChangePasswordLogin = Ext.create("Terrasoft.Button", {
			caption: Terrasoft.Resources.LoginPage.LoginButtonCaption,
			pressed: true,
			style: Terrasoft.controls.ButtonEnums.style.GREEN,
			classes: {
				textClass: [loginBtnClass]
			},
			click: {
				bindTo: "onChangePasswordLoginButtonClick"
			}
		});
		var checkBox = Ext.create("Terrasoft.CheckBoxEdit", {
			id: "rememberMeCheckbox",
			classes: {
				wrapClass: [checkboxClass]
			}
		});
		var checkBoxLabel = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.RememberMeCaption,
			inputId: "rememberMeCheckbox-el",
			classes: {
				labelClass: [loginRememberClass, smallCaptionClass]
			}
		});
		var version = Ext.create("Terrasoft.Label", {
			caption: {
				bindTo: "productVersion"
			},
			classes: {
				labelClass: [smallCaptionClass, versionClass]
			}
		});
		var help = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.Help,
			classes: {
				labelClass: [smallCaptionClass, blueColorClass, helperClass]
			},
			inputId: checkBox
		});
		var contRememberInside = Ext.create("Terrasoft.Container", {
			id: "loginRememberInsideContainer",
			selectors: {
				wrapEl: "#loginRememberInsideContainer"
			},
			classes: {
				wrapClassName: [containerRememberClassInside]
			},
			items: [checkBox, checkBoxLabel]
		});
		var contRemember = Ext.create("Terrasoft.Container", {
			id: "loginRememberContainer",
			selectors: {
				wrapEl: "#loginRememberContainer"
			},
			classes: {
				wrapClassName: [containerRememberClass]
			},
			items: [btnLogin, btnChangePasswordLogin, contRememberInside]
		});
		if (selfRegistrationLinkVisible) {
			userManagement.items.add(passwordHelp);
		} else {
			var passwordHelpContainer = Ext.create("Terrasoft.Container", {
				id: "passwordHelpContainer",
				selectors: {
					wrapEl: "#passwordHelpContainer"
				},
				classes: {
					wrapClassName: [passwordHelpContainerClass]
				},
				items: [passwordHelp]
			});
			contRemember.classes.wrapClassName.push(loginRememberContainerWithRememberLink);
			contRemember.items.add(passwordHelpContainer);
		}
		var contFooter = Ext.create("Terrasoft.Container", {
			id: "loginFooterContainer",
			selectors: {
				wrapEl: "#loginFooterContainer"
			},
			classes: {
				wrapClassName: [containerFooterClass]
			},
			items: [version, help]
		});
		var contLogin = module.view = Ext.create("Terrasoft.Container", {
			id: "loginContainer",
			selectors: {
				wrapEl: "#loginContainer"
			},
			items: [loginCaption, loginEdit, passwordCaption, passwordEdit,
				newPasswordCaption, newPasswordEdit, confirmPasswordCaption, confirmPasswordEdit,
				workspaceCaption, workspaceEdit, contRemember, userManagement, contFooter]
		});
		var contCellLogo = loginUtils.createCellContainer("cellLogoContainer");
		contCellLogo.items.add(logo);
		var contRowLogo = loginUtils.createRowContainer("rowLogoContainer");
		contRowLogo.items.add(contCellLogo);
		var contCellLogin = loginUtils.createCellContainer("cellLoginContainer");
		contCellLogin.items.add(contLogin);
		var contRowMain = loginUtils.createRowContainer("rowMainContainer");
		contRowMain.items.add(contCellLogin);
		var infoContainer = renderInfoView(renderTo);
		if (infoContainer != null) {
			var cellLine = loginUtils.createCellContainer("cellLineRight");
			cellLine.classes.wrapClassName.push(loginBorderRightClass);
			contRowMain.items.add(cellLine);
			cellLine = loginUtils.createCellContainer("cellLineLeft");
			cellLine.classes.wrapClassName.push(loginBorderLeftClass);
			contRowMain.items.add(cellLine);
			var contCellInfo = loginUtils.createCellContainer("cellInfoContainer");
			contCellInfo.items.add(infoContainer);
			contRowMain.items.add(contCellInfo);
		}
		var contTable = loginUtils.createTableContainer("tableContainer");
		contTable.items.add(contRowLogo);
		contTable.items.add(contRowMain);
		var contInside = module.view = Ext.create("Terrasoft.Container", {
			id: "insideContainer",
			selectors: {
				wrapEl: "#insideContainer"
			},
			classes: {
				wrapClassName: [loginInsideContainerClass]
			},
			items: [contTable]
		});
		var view = module.view = Ext.create("Terrasoft.Container", {
			id: "viewContainer",
			selectors: {
				wrapEl: "#viewContainer"
			},
			classes: {
				wrapClassName: [loginOutsideContainerClass]
			},
			items: [contInside],
			renderTo: renderTo
		});
		help.setVisible(false);
		userManagement.setVisible(true);
		contRememberInside.setVisible(false);
		view.hideWorkspaceEdit = function() {
			workspaceEdit.setVisible(false);
			workspaceCaption.setVisible(false);
		};
		view.showLoginMode = function() {
			newPasswordCaption.setVisible(false);
			newPasswordEdit.setVisible(false);
			confirmPasswordCaption.setVisible(false);
			confirmPasswordEdit.setVisible(false);
			btnChangePasswordLogin.setVisible(false);
			btnLogin.setVisible(true);
		};
		view.showChangePasswordMode = function() {
			newPasswordCaption.setVisible(true);
			newPasswordEdit.setVisible(true);
			confirmPasswordCaption.setVisible(true);
			confirmPasswordEdit.setVisible(true);
			btnChangePasswordLogin.setVisible(true);
			btnLogin.setVisible(false);
		};
	};

	var prepareModel = function() {
		module.model = Ext.create("Terrasoft.BaseViewModel", {
			values: {
				productVersion: Terrasoft.Resources.LoginPage.Version + " " + window.productVersion,
				workspaceList: Ext.create("Terrasoft.Collection")
			},
			columns: {
				Login: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				Password: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: true
				},
				NewPassword: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: window.changePasswordMode === true
				},
				ConfirmPassword: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					isRequired: window.changePasswordMode === true
				},
				Workspace: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					isRequired: (window.workspaceCount > 1) && (!window.useDefaultWorkspace)
				}
			},
			methods: {

				getWorkspaceList: function(filter, list) {
					list.clear();
					list.loadAll(window.workspaceList);
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
					if (window.loginTimeout) {
						options.timeout = window.loginTimeout;
					}
					Terrasoft.AjaxProvider.request(options);
				},

				getWorkspaceName: function() {
					var workspace = module.model.get("Workspace");
					if (workspace) {
						workspace = workspace.value;
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
					this.actualizeLoginData();
					if (!this.validate()) {
						return;
					}
					this.doLogin(Terrasoft.loginUrl, {
						UserName: module.model.get("Login"),
						UserPassword: module.model.get("Password"),
						WorkspaceName: this.getWorkspaceName(),
						TimeZoneOffset: new Date().getTimezoneOffset()
					});
				},

				onChangePasswordLoginButtonClick: function() {
					if (!this.validate()) {
						return;
					}
					var model = module.model;
					var password = model.get("Password");
					var newPassword = model.get("NewPassword");
					var confirmPassword = model.get("ConfirmPassword");
					if (password === newPassword) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongNewPassword);
						return;
					}
					if (newPassword !== confirmPassword) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongConfirmPassword);
						return;
					}
					this.doLogin(Terrasoft.changePasswordUrl, {
						UserName: model.get("Login"),
						UserPassword: password,
						WorkspaceName: this.getWorkspaceName(),
						TimeZoneOffset: new Date().getTimezoneOffset(),
						NewUserPassword: newPassword,
						ConfirmUserPassword: confirmPassword
					});
				},

				onKeyUp: function(e) {
					if (e && e.keyCode === e.ENTER) {
						if (window.changePasswordMode === true) {
							this.onChangePasswordLoginButtonClick();
						} else {
							this.onLoginButtonClick();
						}
					}
				},

				loginRequestCallback: function(request, success, response) {
					if (success && response.status === 200) {
						var responseData = Ext.decode(response.responseText);
						if (responseData.Code != null) {
							switch (responseData.Code) {
								case 0:
									var location = response.getAllResponseHeaders().location;
									var hash = window.location.hash;
									window.location.replace(location + viewModuleAddress + hash);
									break;
								case 2:
									Terrasoft.utils.showMessage({
										caption: responseData.Message,
										buttons: ["yes", "no"],
										defaultButton: 0,
										style: Terrasoft.MessageBoxStyles.BLUE,
										handler: function(buttonCode) {
											if (buttonCode === "no") {
												var hash = window.location.hash;
												window.location.replace(responseData.RedirectUrl + viewModuleAddress + hash);
											} else {
												window.location.replace(responseData.PasswordChangeUrl);
											}
										}
									});
									break;
								default:
									this.showInfoMessage(responseData.Message);
							}
						} else {
							this.showInfoMessage(Terrasoft.Resources.LoginPage.AuthFailed);
							return;
						}
					} else if (response.status === 401) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongLoginPassword);
					} else if (response.status === 403) {
						var model = module.model;
						model.set("Password", "");
						model.set("NewPassword", "");
						model.set("ConfirmPassword", "");
						this.showInfoMessage(Terrasoft.Resources.LoginPage.ChangePasswordAccessDenied);
					} else {
						throw new Terrasoft.UnauthorizedException({
							message: response.responseText
						});
					}
				},

				init: function() {
					var licManagerException = Terrasoft.licManagerException;
					var loginResources;
					if (licManagerException) {
						loginResources = Terrasoft.Resources.LoginPage;
						var buttons = [];
						if (!Ext.isEmpty(licManagerException.licManagerUrl)) {
							buttons.push({
								className: "Terrasoft.Button",
								returnCode: "redirect",
								caption: loginResources.LicenseManagerLinkCaption
							});
						}
						buttons.push({
							className: "Terrasoft.Button",
							returnCode: "close",
							caption: loginResources.CloseLicMessage
						});
						Terrasoft.showMessage({
							caption: licManagerException.message,
							scope: this,
							handler: this.redirectToLicManager,
							style: Terrasoft.MessageBoxStyles.BLUE,
							buttons: buttons,
							defaultButton: 0
						});
					}

					var authenticationException = Terrasoft.authenticationException;
					if (authenticationException) {
						loginResources = Terrasoft.Resources.LoginPage;
						Terrasoft.showMessage({
							caption: authenticationException.message,
							style: Terrasoft.MessageBoxStyles.BLUE,
							buttons: ["ok"],
							defaultButton: 0
						});
					}
				},

				redirectToLicManager: function(result) {
					if (result === "redirect") {
						window.location.replace(Terrasoft.licManagerException.licManagerUrl);
					}
				},

				onRegisterClick: function() {
					var url = Terrasoft.loaderBaseUrl;
					window.location = url + "/0/Nui/UserManagement.aspx?action=register";
				},

				onRemindPasswordClick: function() {
					var url = Terrasoft.loaderBaseUrl;
					window.location = url + "/0/Nui/UserManagement.aspx?action=remindPassword";
				},

				actualizeLoginData: function() {
					var reloadModelValue = function(componentId) {
						var el = Ext.getCmp(componentId).getEl();
						el.focus();
						el.blur();
					};
					reloadModelValue("loginEdit");
					reloadModelValue("passwordEdit");
				}

			}
		});
	};

	return {
		renderTo: Ext.getBody(),
		init: init,
		render: function(renderTo) {
			if(Terrasoft.SsoUtils.getNeedShowSsoLogin()) {
				Terrasoft.SsoUtils.initiateSsoLogin();
				return;
			}
			prepareModel();
			module.model.init();
			renderView(renderTo);
			module.view.bind(module.model);
			var userName = window.userName;
			if (userName) {
				module.model.set("Login", userName);
				module.model.set("Password", userName);
			}
			if (window.workspaceCount <= 1 || window.useDefaultWorkspace) {
				module.view.hideWorkspaceEdit();
			}
			if (window.changePasswordMode === true) {
				module.view.showChangePasswordMode();
			} else {
				module.view.showLoginMode();
			}
		}
	};
});
