define(["ext-base", "terrasoft", "login-view-utils"], function(Ext, Terrasoft, loginUtils) {
	var _viewModuleAddress = "/Nui/ViewModule.aspx";
	var _returnUrlCode = "?ReturnUrl=";
	var _simpleLogin = "simpleLogin";
	var _module = {};

	var init = function() {
	};

	var createImportantLinks = function(items) {
		return Ext.create("Terrasoft.HtmlControl", {
			tpl: [
				/*jshint quotmark: false */
				//jscs:disable
				"<ul id=\"{id}\">",
				"<tpl for=\"items\">",
				"<li class=\"login-links-list\">",
				"<a target=\"_blank\" class=\"login-important-link\" href=\"{href}\">",
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
			selectors: {
				wrapEl: "#importantLinks"
			}
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

	var getWidgetView = function() {
		var loginPageWidgetInfo = window.loginPageWidgetInfo;
		if (!loginPageWidgetInfo || !loginPageWidgetInfo.visible 
			|| !loginPageWidgetInfo.src) {
			return null;
		}
		var widgetIframe = Ext.create("Terrasoft.ExternalWidget", {
			"iframeSrc": window.loginPageWidgetInfo.src,
			"classes": {
				"wrapClassName": ["login-widget-container"]
			}
		});
		var widgetLoginCell = Ext.create("Terrasoft.Container", {
			id: "widgetLoginCell",
			classes: {
				wrapClassName: ["widget-wrap-class"]
			}
		});
		widgetLoginCell.items.add(widgetIframe);
		return widgetLoginCell;
	};

	var getBorderContainer = function (name, wrapClassName) {
		var cellLine = loginUtils.createCellContainer(name);
		cellLine.classes.wrapClassName.push(wrapClassName);
		return cellLine;
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
		var userManagementClass = "user-management-container";
		var versionClass = "login-label-version";
		var loginRememberClass = "login-label-remember";
		var checkboxClass = "login-checkbox-remember";
		var helperClass = "login-label-helper";
		var containerRememberClass = "login-container-remember";
		var containerFooterClass = "login-container-footer";
		var containerRememberClassInside = "login-container-remember-inside";
		var loginBorderLeftClass = "login-border-left";
		var loginBorderRightClass = "login-border-right";
		var loginEmptyCellClass = "login-empty-cell";
		var loginInsideContainerClass = "login-inside-container";
		var loginOutsideContainerClass = "login-outside-container";
		var logoImageUrl = Terrasoft.appFramework === "NETFRAMEWORK"
			? window.loginImageUrl
			: "/Login/logo.png";
		logoImageUrl = Ext.String.format("{0}{1}",
			Terrasoft.workspaceBaseUrl, logoImageUrl);
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
		var ntlmLoginHelp = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.LoginPage.NtlmLogin,
			classes: {
				labelClass: [smallCaptionClass, blueColorClass, loginHelpClass]
			},
			click: {
				bindTo: "onNtlmLoginClick"
			},
			tips: [{
				tip: {
					content: Terrasoft.Resources.LoginPage.NtlmLoginLabelHint,
					displayMode: "narrow",
					restrictAlignType: Terrasoft.AlignType.BOTTOM,
					showDelay: 2000
				}
			}]
		});
		var userManagement = Ext.create("Terrasoft.Container", {
			id: "userManagementContainer",
			selectors: {
				wrapEl: "#userManagementContainer"
			},
			classes: {
				wrapClassName: [userManagementClass]
			},
			items: [ntlmLoginHelp]
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
			markerValue: "btnLogin",
			tips: [{
				tip: {
					content: Terrasoft.Resources.LoginPage.LoginButtonHint,
					displayMode: "narrow",
					restrictAlignType: Terrasoft.AlignType.BOTTOM,
					showDelay: 2000
				}
			}],
			loading: {
				bindTo: "Loading"
			}
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
		var contLogin = _module.view = Ext.create("Terrasoft.Container", {
			id: "loginContainer",
			selectors: {
				wrapEl: "#loginContainer"
			},
			items: [loginCaption, loginEdit, passwordCaption, passwordEdit,
				newPasswordCaption, newPasswordEdit, confirmPasswordCaption, confirmPasswordEdit,
				workspaceCaption, workspaceEdit, contRemember, userManagement, contFooter
			]
		});
		var contCellLogo = loginUtils.createCellContainer("cellLogoContainer");
		contCellLogo.items.add(logo);
		var infoContainer = renderInfoView(renderTo);
		var contRowLogo = loginUtils.createRowContainer("rowLogoContainer");
		if (infoContainer) {
			var paddingContainer = loginUtils.createCellContainer("rowPaddingContainer");
			contRowLogo.items.add(paddingContainer);
			contRowLogo.items.add(getBorderContainer("cellLineRightLogo", loginEmptyCellClass));
			contRowLogo.items.add(getBorderContainer("cellLineLeftLogo", loginEmptyCellClass));
		}
		contRowLogo.items.add(contCellLogo);
		var contCellLogin = loginUtils.createCellContainer("cellLoginContainer");
		contCellLogin.items.add(contLogin);
		var contRowMain = loginUtils.createRowContainer("rowMainContainer");
		if (infoContainer) {
			contRowMain.items.add(infoContainer);
			contRowMain.items.add(getBorderContainer("cellLineRight-info", loginBorderRightClass));
			contRowMain.items.add(getBorderContainer("cellLineLeft-info", loginBorderLeftClass));
		}
		contRowMain.items.add(contCellLogin);
		var widgetInfo = getWidgetView();
		if (widgetInfo) {
			contRowMain.items.add(widgetInfo);
		}
		var contTable = loginUtils.createTableContainer("tableContainer");
		contTable.items.add(contRowLogo);
		contTable.items.add(contRowMain);
		var contInside = _module.view = Ext.create("Terrasoft.Container", {
			id: "insideContainer",
			selectors: {
				wrapEl: "#insideContainer"
			},
			classes: {
				wrapClassName: [loginInsideContainerClass]
			},
			items: [contTable]
		});
		var view = _module.view = Ext.create("Terrasoft.Container", {
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
		var isNtlmLoginVisible = window.isNtlmLoginVisible;
		ntlmLoginHelp.setVisible(isNtlmLoginVisible);
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
		_module.model = Ext.create("Terrasoft.BaseViewModel", {
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
					isRequired: (window.workspaceCount > 1) && (!window.hideWorkspace)
				},
				Loading: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {

				//region Fields: Private

				_loginResponseCode: {
					/** Authentication successful. */
					SUCCESS: 0,
					/** Authentication failed. */
					ERROR: 1,
					/** Authentication successful, password change recommended. */
					CHANGEPASSWORDINFO: 2
				},

				_loginErrorCode: {
					GENERAL: "0",
					NOT_ALLOWED_IP_ADDRESS: "4",
					PASSWORD_EXPIRED: "5",
					CHANGE_PASSWORD: "8",
					INVALID_USER_TIMEZONE: "10"
				},

				//endregion

				//region Methods: Private

				_containsIgnoreCase: function(str, searchStr) {
					return str.toUpperCase().indexOf(searchStr.toUpperCase()) !== -1;
				},

				_redirectToReturnUrl: function(responseData, response, windowLocation) {
					var redirectUrl = this._getRedirectUrl(responseData, response, windowLocation);
					windowLocation.replace(redirectUrl);
				},

				_getRedirectUrl: function(responseData, response, windowLocation) {
					if (responseData && responseData.RedirectUrl) {
						return responseData.RedirectUrl;
					}
					var responseHeaderLocation = this._getLocationFromHeaders(response);
					var windowUrlHasRedirectUrl = this._containsIgnoreCase(windowLocation.href, _returnUrlCode);
					if (!windowLocation.hash && windowUrlHasRedirectUrl) {
						var queryString = this._getWindowQueryString(windowLocation);
						var hasQuerystring = this._containsIgnoreCase(windowLocation.pathname, queryString);
						var hasSimpleLogin = this._containsIgnoreCase(queryString, _simpleLogin);
						return hasQuerystring || hasSimpleLogin
							? responseHeaderLocation + _viewModuleAddress
							: queryString;
					} else {
						return responseHeaderLocation + _viewModuleAddress + windowLocation.hash;
					}
				},

				_redirectWithPasswordChangePrompt: function(responseData) {
					Terrasoft.utils.showMessage({
						caption: responseData.Message,
						buttons: ["yes", "no"],
						defaultButton: 0,
						style: Terrasoft.MessageBoxStyles.BLUE,
						handler: function(buttonCode) {
							if (buttonCode === "no") {
								this._redirectToRequestedLocation(responseData);
							} else {
								this._redirectToPasswordChangeUrl(responseData);
							}
						}.bind(this)
					});
				},

				_redirectToRequestedLocation: function(responseData) {
					var hash = window.location.hash;
					window.location.replace(responseData.RedirectUrl + _viewModuleAddress + hash);
				},

				_redirectToPasswordChangeUrl: function(responseData) {
					window.location.replace(responseData.PasswordChangeUrl);
				},

				_getWindowQueryString: function(windowLocation) {
					var encodedQueryString = windowLocation.search.replace(_returnUrlCode, "");
					var decodedQueryString = decodeURIComponent(encodedQueryString);
					var queryString = this.deleteDuplicateQueryStrings(decodedQueryString);
					return queryString;
				},

				_getLocationFromHeaders: function(response) {
					var responseHeaders = response.getAllResponseHeaders();
					return responseHeaders.location || "";
				},

				_processLoginError: function(response) {
					this.hideLoginMask();
					if (response.status === 401) {
						this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongLoginPassword);
					} else if (response.status === 403) {
						this._clearPasswordsInModel();
						this.showInfoMessage(Terrasoft.Resources.LoginPage.ChangePasswordAccessDenied);
					} else {
						throw new Terrasoft.UnauthorizedException({
							message: response.responseText
						});
					}
				},

				_clearPasswordsInModel: function() {
					var model = _module.model;
					model.set("Password", "");
					model.set("NewPassword", "");
					model.set("ConfirmPassword", "");
				},

				_initParametersFromQueryString: function() {
					var location = this._getWindowQueryString(window.location);
					var properies = Ext.Object.fromQueryString(location);
					var errorCode = properies && properies.ErrorCode;
					this._setErrorProperties(errorCode);
				},

				_setErrorProperties: function(errorCode) {
					this._setAuthenticationException(errorCode);
					var changePasswordMode = this._getIsChangePasswordError(errorCode);
					window.changePasswordMode = changePasswordMode || window.changePasswordMode;
				},

				_getIsChangePasswordError: function(errorCode) {
					const loginErrorCode = this._loginErrorCode;
					return errorCode === loginErrorCode.PASSWORD_EXPIRED || 
						errorCode === loginErrorCode.CHANGE_PASSWORD;
				},

				_setAuthenticationException: function(errorCode) {
					var authenticationException = Terrasoft.authenticationException;
					if (authenticationException) {
						return;
					}
					let authErrorExceptions = Terrasoft.AuthErrorExceptions || {};
					let message = authErrorExceptions[errorCode];
					if (message) {
						Terrasoft.authenticationException = {
							"message": message
						}
					}
				},

				_tryShowAuthenticationErrorMsg: function() {
					let authenticationException = Terrasoft.authenticationException;
					if (authenticationException) {
						Terrasoft.showMessage({
							caption: authenticationException.message,
							style: Terrasoft.MessageBoxStyles.BLUE,
							buttons: ["ok"],
							defaultButton: 0
						});
					}
				},
				//endregion

				getWorkspaceList: function(filter, list) {
					list.clear();
					list.loadAll(window.workspaceList);
				},

				doLogin: function(urlValue, jsonDataValue) {
					this.showLoginMask();
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

				showLoginMask: function() {
					this.set("Loading", true);
				},

				hideLoginMask: function() {
					this.set("Loading", false);
				},

				getWorkspaceName: function() {
					var workspace = _module.model.get("Workspace");
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

				onLoginButtonClick: function(skipValidation) {
					this.actualizeLoginData();
					if (!skipValidation && !this.validate()) {
						return;
					}
					this.doLogin(Terrasoft.loginUrl, {
						UserName: _module.model.get("Login"),
						UserPassword: _module.model.get("Password"),
						WorkspaceName: this.getWorkspaceName(),
						TimeZoneOffset: new Date().getTimezoneOffset()
					});
				},

				onChangePasswordLoginButtonClick: function() {
					if (!this.validate()) {
						return;
					}
					var model = _module.model;
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

				deleteDuplicateQueryStrings: function(url) {
					var resultUrl = "";
					url.split("&").forEach(function(element, index) {
						if (resultUrl.indexOf(element.split("=")[0]) !== -1) {
							return false;
						}
						if (index === 0) {
							resultUrl = resultUrl + element;
							return;
						}
						resultUrl = resultUrl + "&" + element;
					});
					return resultUrl;
				},

				loginRequestCallback: function(request, success, response) {
					if (success && response.status === 200) {
						var responseData = Ext.decode(response.responseText);
						switch (responseData.Code) {
							case this._loginResponseCode.SUCCESS:
								return this._redirectToReturnUrl(responseData, response, window.location);
							case this._loginResponseCode.CHANGEPASSWORDINFO:
								return this._redirectWithPasswordChangePrompt(responseData);
							case this._loginResponseCode.ERROR:
							default:
								this.showInfoMessage(responseData.Message || Terrasoft.Resources.LoginPage.AuthFailed);
						}
					}
					this._processLoginError(response);
				},

				init: function() {
					this._initParametersFromQueryString();
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
					this._tryShowAuthenticationErrorMsg();
				},

				redirectToLicManager: function(result) {
					if (result === "redirect") {
						window.location.replace(Terrasoft.licManagerException.licManagerUrl);
					}
				},

				onNtlmLoginClick: function() {
					this.showLoginMask();
					var url = Terrasoft.ntlmLoginUrl;
					if (window.location.hash) {
						url = url + window.location.hash;
					}
					window.location = url;
				},

				actualizeLoginData: function() {
					var reloadModelValue = function(componentId) {
						var el = Ext.getCmp(componentId).getEl();
						el.focus();
						el.blur();
					};
					reloadModelValue("loginEdit");
					reloadModelValue("passwordEdit");
				},

				onDocumentKeyDown: function(e) {
					if (e && e.keyCode === e.ENTER) {
						if (e.ctrlKey) {
							this.actualizeLoginData();
							var model = _module.model;
							var skipValidation = model && !model.get("Login") && !model.get("Password");
							this.onLoginButtonClick(skipValidation);
						} else if (e.altKey && window.isNtlmLoginVisible) {
							this.onNtlmLoginClick();
						}
					}
				}
			}
		});
	};

	return {
		renderTo: Ext.getBody(),
		init: init,
		render: function(renderTo) {
			if (Terrasoft.SsoUtils.getNeedShowSsoLogin()) {
				Terrasoft.SsoUtils.initiateSsoLogin();
				return;
			}
			prepareModel();
			_module.model.init();
			renderView(renderTo);
			_module.view.bind(_module.model);
			var userName = Ext.String.htmlDecode(window.userName);
			if (userName) {
				_module.model.set("Login", userName);
				if (window.isDebug === true) {
					_module.model.set("Password", userName);
				}
			}
			if (window.workspaceCount <= 1 || window.hideWorkspace) {
				_module.view.hideWorkspaceEdit();
			} else {
				var workspace = window.workspace;
				if (workspace) {
					var modelValue = {
						value: workspace,
						displayValue: workspace
					};
					_module.model.set("Workspace", modelValue);
				}
			}
			if (window.changePasswordMode === true) {
				_module.view.showChangePasswordMode();
			} else {
				_module.view.showLoginMode();
			}
			var doc = Ext.getDoc();
			doc.on("keydown", _module.model.onDocumentKeyDown, _module.model);
		}
	};
});
