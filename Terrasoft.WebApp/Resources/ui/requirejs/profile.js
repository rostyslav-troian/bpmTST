// jscs:disable
/* jshint ignore:start */
define("profile", ["text", "ext-base"], function() {
	var extension = ".profile";
	var keys;

	var profileApi = {};

	var setCookies = function(requestObject) {
		var csrfToken = Ext.util.Cookies.get("BPMCSRF");
		if (csrfToken !== null) {
			requestObject.setRequestHeader("BPMCSRF", csrfToken);
		}
	};

	/**
	 * Check if it is need to use PortalDataService.
	 * @return {Boolean} true if need to use PortalDataService, otherwise - false.
	 */
	var getIsNeedToUseSspServiceUrl = function() {
		return this.Terrasoft && Terrasoft.CurrentUser && Terrasoft.isCurrentUserSsp() &&
			Terrasoft.Features.getIsEnabled("UsePortalDataService");
	};

	var getRequestUrl = function(serverMethod) {
		var serviceUrl = getIsNeedToUseSspServiceUrl() ?
			"../DataService/Ssp/json/SyncReply/" : "../DataService/json/SyncReply/";
		return serviceUrl + serverMethod;
	};

	var initializeKeys = function() {
		var requestObject = new XMLHttpRequest();
		if (requestObject) {
			var url = getRequestUrl("QueryProfileKeys");
			requestObject.open("POST", url, true);
			requestObject.setRequestHeader("Content-type", "application/json");
			setCookies(requestObject);
			requestObject.onload = function() {
				if (this.status == 200) {
					var response = JSON.parse(this.responseText);
					if (response && response.keys && response.keys.length) {
						keys = response.keys;
					}
				}
			};
			requestObject.send();
		}
	};

	var profileRequest = function(config) {
		var requestObject = new XMLHttpRequest();
		if (requestObject) {
			var url = getRequestUrl("QueryProfile");
			requestObject.open("POST", url);
			requestObject.setRequestHeader("Content-type", "application/json");
			setCookies(requestObject);
			requestObject.onreadystatechange = function() {
				if (this.readyState === 4) {
					var statusCode = requestObject.status;
					if (statusCode < 200 || statusCode > 299) {
						config.errback({
							requireType: "scripterror",
							requireModules: [config.key]
						});
					} else {
						var response = JSON.parse(this.responseText);
						var profileCultureId = this.getResponseHeader("ProfileCultureId");
						if (Ext.isObject(response) && profileCultureId) {
							response.profileCultureId = profileCultureId;
						}
						config.callback(response);
					}
				}
			};
			var params = Ext.String.format("{\"key\":\"{0}\"}", config.key);
			requestObject.send(params);
		}
	};

	profileApi.load = function(name, req, onload) {
		if (!name || (keys && keys.indexOf(name) === -1)) {
			onload({});
			return;
		} else {
			profileRequest({
				key: name + extension,
				callback: onload,
				errback: onload.error
			});
		}
	}

	profileApi.addKey = function(key) {
		if (key && keys && keys.indexOf(key) === -1) {
			keys.push(key);
		}
	},

	initializeKeys();

	return profileApi;
});
/* jshint ignore:end */
// jscs:enable
