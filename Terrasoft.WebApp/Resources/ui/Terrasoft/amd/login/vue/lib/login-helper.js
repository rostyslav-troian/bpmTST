import Vue from 'vue';

class LoginHelper {

	/**
	 * Do login to login service.
	 * @param {Object} loginConfig
	 * @param {String} loginConfig.userName
	 * @param {String} loginConfig.userPassword
	 * @param {String} [loginConfig.workspaceName]
	 * @param {Number} [loginConfig.timeZoneOffset]
	 */
	static doLogin(loginConfig) {
		const data = {
			UserName: loginConfig.userName,
			UserPassword: loginConfig.userPassword,
			WorkspaceName: loginConfig.workspaceName || "Default",
			TimeZoneOffset: loginConfig.timeZoneOffset || new Date().getTimezoneOffset()
		};
		return Vue.http.post(`${Terrasoft.loaderBaseUrl}/ServiceModel/AuthService.svc/Login`, data, {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		}).then(res => {
			this.loginRequestCallback(res.ok, res);
		});
	}

	static _containsIgnoreCase(str, searchStr) {
		return str.toUpperCase().includes(searchStr.toUpperCase());
	}

	static loginRequestCallback(success, response) {
		const _returnUrlCode = "?ReturnUrl=";
		const _viewModuleAddress = "/Nui/ViewModule.aspx";
		const _simpleLogin = "simpleLogin";
		if (success && response.status === 200) {
			const responseData = response.body;
			if (responseData.Message) {
				throw new Error(responseData.Message);
			}
			if (responseData.Code != null) {
				switch (responseData.Code) {
					case 0:
						const locationHeaderValue = response.headers.get("location");
						const location = window.location;
						const hasReturnUrl = this._containsIgnoreCase(location.href, _returnUrlCode);
						if (!location.hash && hasReturnUrl) {
							const encodedQuerystring = location.search.replace(_returnUrlCode, "");
							const decodedQuerystring = decodeURIComponent(encodedQuerystring);
							const querystring = this.deleteDuplicateQueryStrings(decodedQuerystring);
							const hasQuerystring = this._containsIgnoreCase(location.pathname, querystring);
							const hasSimpleLogin = this._containsIgnoreCase(querystring, _simpleLogin);
							if (hasQuerystring || hasSimpleLogin) {
								location.replace(locationHeaderValue + _viewModuleAddress);
							} else {
								location.replace(querystring);
							}
						} else {
							location.replace(locationHeaderValue + _viewModuleAddress + location.hash);
						}
						break;
					case 2:
						// Terrasoft.utils.showMessage({
						// 	caption: responseData.Message,
						// 	buttons: ["yes", "no"],
						// 	defaultButton: 0,
						// 	style: Terrasoft.MessageBoxStyles.BLUE,
						// 	handler: function(buttonCode) {
						// 		if (buttonCode === "no") {
						// 			var hash = window.location.hash;
						// 			window.location.replace(responseData.RedirectUrl + _viewModuleAddress + hash);
						// 		} else {
						// 			window.location.replace(responseData.PasswordChangeUrl);
						// 		}
						// 	}
						// });
						break;
					default:
					//this.showInfoMessage(responseData.Message);
				}
			} else {
				// this.showInfoMessage(Terrasoft.Resources.LoginPage.AuthFailed);
			}
		} else if (response.status === 401) {
			//this.showInfoMessage(Terrasoft.Resources.LoginPage.WrongLoginPassword);
		} else if (response.status === 403) {
			// var model = _module.model;
			// model.set("Password", "");
			// model.set("NewPassword", "");
			// model.set("ConfirmPassword", "");
			// this.showInfoMessage(Terrasoft.Resources.LoginPage.ChangePasswordAccessDenied);
		} else {
			// throw new Terrasoft.UnauthorizedException({
			// 	message: response.responseText
			// });
		}
	}


	static deleteDuplicateQueryStrings(url) {
		let resultUrl = "";
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
	}
}
export default LoginHelper;