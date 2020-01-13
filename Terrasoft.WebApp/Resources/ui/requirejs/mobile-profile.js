define("profile", ["terrasoft"], function(Terrasoft) {
		var extension = ".profile";
		var timeout = (2 * 60 * 1000);
		var profileRequest = function(config) {
			var data = {
				key: config.key
			};
			var requestUrl = Terrasoft.workspaceBaseUrl + "DataService/json/SyncReply/QueryProfile";
			var requestConfig = {
				url: requestUrl,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				jsonData: Ext.encode(data),
				callback: function(request, success, response) {
					var result = null;
					if (success) {
						result = Terrasoft.decode(response.responseText);
						Ext.callback(config.callback, config.scope, [result]);
					} else {
						var error = {
							requireType: "scripterror",
							requireModules: [config.key]
						};
						Ext.callback(config.errback, config.scope, [error]);
					}
				},
				timeout: config.timeout || timeout
			};
			return Terrasoft.AjaxProvider.request(requestConfig);
		};

		return {
			load: function(name, req, onload) {
				profileRequest({key: name + extension, callback: onload, errback: onload.error});
			}
		};
	}
);