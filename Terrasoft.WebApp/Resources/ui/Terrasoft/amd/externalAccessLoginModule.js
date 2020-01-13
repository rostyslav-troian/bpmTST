define(["ext-base", "terrasoft", "login-view-utils"], function(Ext, Terrasoft, loginUtils) {
	const _viewModuleAddress = "/0/Nui/ViewModule.aspx";
	const _module = {};

	const renderView = function(renderTo) {
		// Class names for elements
		const headClass = "login-label-logo";
		const smallCaptionClass = "login-label-smallCaption";
		const errorMessageClass = "login-label-error";
		const versionClass = "login-label-version";
		const containerFooterClass = "login-container-footer";
		const loginInsideContainerClass = "login-inside-container";
		const loginOutsideContainerClass = "login-outside-container";
		let logoImageUrl = Terrasoft.appFramework === "NETFRAMEWORK"
			? "/terrasoft.axd?s=nui-binary-syssetting&r=Logoimage"
			: "/Login/logo.png";
		logoImageUrl = Ext.String.format("{0}{1}",
			Terrasoft.workspaceBaseUrl, logoImageUrl);
		// elements

		const logo = Ext.create("Terrasoft.ImageEdit", {
			readonly: true,
			classes: {
				wrapClass: [headClass]
			},
			imageSrc: logoImageUrl
		});
		const infoLabel = Ext.create("Terrasoft.Label", {
			caption: Terrasoft.Resources.ExternalAccessLoginPage.InfoCaption,
			visible: {
				bindTo: "infoLabelVisible"
			}
		});
		const version = Ext.create("Terrasoft.Label", {
			caption: {
				bindTo: "productVersion"
			},
			classes: {
				labelClass: [smallCaptionClass, versionClass]
			}
		});
		const errorLabel = Ext.create("Terrasoft.Label", {
			caption: {
				bindTo: "errorMessage"
			},
			classes: {
				labelClass: [errorMessageClass]
			}
		});
		const contFooter = Ext.create("Terrasoft.Container", {
			id: "loginFooterContainer",
			selectors: {
				wrapEl: "#loginFooterContainer"
			},
			classes: {
				wrapClassName: [containerFooterClass]
			},
			items: [version]
		});
		const contLogin = _module.view = Ext.create("Terrasoft.Container", {
			id: "loginContainer",
			selectors: {
				wrapEl: "#loginContainer"
			},
			items: [infoLabel, errorLabel, contFooter]
		});
		const spinnerChildCont1 = Ext.create("Terrasoft.Container");
		const spinnerChildCont2 = Ext.create("Terrasoft.Container");
		const spinnerContainer = Ext.create("Terrasoft.Container", {
			id: "spinnerContainer",
			visible: {
				bindTo: "infoLabelVisible"
			},
			selectors: {
				wrapEl: "#spinnerContainer"
			},
			classes : {
				wrapClassName: ["lds-ripple"]
			},
			items: [spinnerChildCont1, spinnerChildCont2]
		});
		const contCellLogo = loginUtils.createCellContainer("cellLogoContainer");
		contCellLogo.items.add(logo);
		const contRowLogo = loginUtils.createRowContainer("rowLogoContainer");
		contRowLogo.items.add(contCellLogo);
		const contCellLogin = loginUtils.createCellContainer("cellLoginContainer");
		contCellLogin.items.add(contLogin);
		const contRowMain = loginUtils.createRowContainer("rowMainContainer");
		contRowMain.items.add(contCellLogin);
		const contTable = loginUtils.createTableContainer("tableContainer");
		contTable.items.add(contRowLogo);
		contTable.items.add(spinnerContainer);
		contTable.items.add(contRowMain);
		const contInside = _module.view = Ext.create("Terrasoft.Container", {
			id: "insideContainer",
			selectors: {
				wrapEl: "#insideContainer"
			},
			classes: {
				wrapClassName: [loginInsideContainerClass]
			},
			items: [contTable]
		});
		_module.view = Ext.create("Terrasoft.Container", {
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
	};

	const prepareModel = function() {
		_module.model = Ext.create("Terrasoft.BaseViewModel", {
			values: {
				productVersion: Terrasoft.Resources.LoginPage.Version + " " + window.productVersion,
				infoLabelVisible: true
			},
			columns: {},
			methods: {

				_getHashValue:  function(key) {
					const matches = location.hash.match(new RegExp(key+'=([^&]*)'));
					return matches ? matches[1] : null;
				},

				_showInfoMessage: function(captionValue, handler) {
					Terrasoft.utils.showMessage({
						caption: captionValue,
						buttons: ["ok"],
						defaultButton: 0,
						style: Terrasoft.MessageBoxStyles.BLUE,
						handler: handler,
						scope: this
					});
				},

				init: function() {
					const token = this._getHashValue("access_token");
					if (!token) {
						this._showInfoMessage("Access token was not set", function() {
							window.history.back();
						});
						return;
					}
					const options = {
						url: Terrasoft.workspaceBaseUrl+ "/ServiceModel/AuthService.svc/OAuthTokenLogin",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization" : "Bearer " + token
						},
						scope: this,
						callback: function(options, success, response) {
							const result = Terrasoft.decode(response.responseText);
							if (!success || result.Code !== 0) {
								const message = success ? result.Message : response.statusText;
								this.error(message);
								this.set("infoLabelVisible", false);
								this.set("errorMessage", message);
								return;
							}
							window.location.replace(_viewModuleAddress);
						},
						jsonData: new Date().getTimezoneOffset()
					};
					if (window.loginTimeout) {
						options.timeout = window.loginTimeout;
					}
					Terrasoft.AjaxProvider.request(options);
				}
			}
		});
	};

	return {
		renderTo: Ext.getBody(),
		render: function(renderTo) {
			prepareModel();
			_module.model.init();
			renderView(renderTo);
			_module.view.bind(_module.model);
		}
	};
});
