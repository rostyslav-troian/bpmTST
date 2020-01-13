Terrasoft.configuration.Structures["RemindPassword"] = {innerHierarchyStack: ["RemindPassword"]};
define("RemindPassword", ["ext-base", "terrasoft", "sandbox", "RemindPasswordResources"],
		function(Ext, Terrasoft, sandbox, resources) {

			var module = {};
			var renderContainer;
			var recoveryPasswordToken;

			var callServiceMethod = function(name, callback, data, scope) {
				var workspaceBaseUrl = Terrasoft.Features.getIsEnabled("EnableCustomPrefixRouteApi")
					? Terrasoft.utils.common.combinePath(Terrasoft.workspaceBaseUrl, "ssp")
					: Terrasoft.workspaceBaseUrl;
				var requestUrl = workspaceBaseUrl + "/rest/UserManagementService/" + name;
				Terrasoft.AjaxProvider.request({
					url: requestUrl,
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					jsonData: data,
					callback: function(request, success, response) {
						var responseObject = {};
						if (success) {
							responseObject = Terrasoft.decode(response.responseText);
						}
						callback.call(this, success, responseObject);
					},
					scope: scope
				});
			};

			var prepareModel = function() {
				module.model = Ext.create("Terrasoft.BaseViewModel", {
					columns: {
						EmailOrLogin: {
							dataValueType: Terrasoft.DataValueType.TEXT,
							isRequired: true,
							caption: resources.localizableStrings.EmailOrLogin
						}
					},
					methods: {
						onRemindPasswordClick: function() {
							var emailOrLogin = this.get("EmailOrLogin");
							if (!emailOrLogin) {
								this.showInformationDialog(resources.localizableStrings.RequiredEmailOrLogin);
							}
							else {
								var remindPasswordCallback = function(success, response) {
									if (!success) {
										return;
									}
									var responseObject = Terrasoft.decode(response);
									var resultCode = responseObject.ResultCode;
									if (!resultCode) {
										return;
									}
									switch (resultCode) {
										case "ExistingSysAdminUnit":
										case "Error":
											var resultMessage = responseObject.ResultMessage.replace(/\\n/g, "\n");
											this.showInformationDialog(resultMessage);
											break;
										case "Success":
											var successMessage = resources.localizableStrings.SuccessMessage;
											this.showInformationDialog(successMessage, function() {
												callServiceMethod("Logout", function() {
													window.logout = true;
													window.location.replace(Terrasoft.loaderBaseUrl + "SspLogin.aspx");
												});
											});
											break;
									}
								};
								recoveryPasswordToken = {
									EmailOrLogin: emailOrLogin
								};
								callServiceMethod("RemindPassword", remindPasswordCallback, recoveryPasswordToken, this);
							}
						},

						onKeyUp: function(e) {
							if (e && e.keyCode === e.ENTER) {
								this.onRemindPasswordClick();
							}
						}
					}
				});
			};

			var renderView = function(renderTo) {
				var imageUrl = "terrasoft.axd?s=nui-binary-syssetting&r=Logoimage";
				var html = "<img id = \"bpmonline-logo\" src = \"" + imageUrl + "\">";
				var logo = {
					id: "bpmonline-logo",
					className: "Terrasoft.HtmlControl",
					html: html,
					selectors: {wrapEl: "#bpmonline-logo"}
				};
				var mailLabel = Ext.create("Terrasoft.Label", {
					caption: resources.localizableStrings.EmailOrLogin,
					classes: {labelClass: ["label"]}
				});
				var mailEdit = Ext.create("Terrasoft.TextEdit", {
					value: {bindTo: "EmailOrLogin"},
					classes: {wrapClass: ["edit"]},
					keyup: {bindTo: "onKeyUp"},
					markerValue: "emailEdit"
				});
				var remindPasswordButton = Ext.create("Terrasoft.Button", {
					caption: resources.localizableStrings.RecoverPassword,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {textClass: ["button"]},
					click: {bindTo: "onRemindPasswordClick"},
					markerValue: "btnRemindPassword"
				});
				var remindPasswordContainer = Ext.create("Terrasoft.Container", {
					id: "remindPasswordContainer",
					selectors: {wrapEl: "#remindPasswordContainer"},
					items: [mailLabel, mailEdit, remindPasswordButton]
				});
				var contFooter = Ext.create("Terrasoft.Container", {
					id: "remindPasswordFooterContainer",
					classes: {
						wrapClassName: ["remindPassword-container-footer"]
					}
				});
				module.view = Ext.create("Terrasoft.Container", {
					id: "container",
					selectors: {wrapEl: "#container"},
					classes: {wrapClassName: ["remindPassword-container"]},
					items: [logo, remindPasswordContainer, contFooter],
					renderTo: renderTo
				});
			};

			var init = function() {
				prepareModel();
			};

			var render = function(renderTo) {
				renderContainer = renderTo;
				renderView(renderContainer);
				module.view.bind(module.model);
			};

			return {
				init: init,
				render: render,
				renderTo: Ext.getBody()
			};
		});


