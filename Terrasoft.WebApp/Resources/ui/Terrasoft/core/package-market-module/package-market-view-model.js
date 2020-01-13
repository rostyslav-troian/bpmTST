/**
 */
Ext.define("Terrasoft.core.PackageMarketViewModel", {
	extend: "Terrasoft.BaseViewModel",
	alternateClassName: "Terrasoft.PackageMarketViewModel",

	packageData: null,
	maskId: null,

	/**
	 * List of columns.
	 */
	columns: {

		/**
		 * URL.
		 */
		UrlField: {
			dataValueType: Terrasoft.DataValueType.TEXT
		}
	},

	/*
	 * Validates URI.
	 * @private
	 * @param {String} url URI.
	 */
	validateUrl: function(url) {
		var uriUtilities = Terrasoft.utils.uri;
		return url && (uriUtilities.isAValidUrlIgnoreProtocol(url) || uriUtilities.isAValidNetworkPath(url));
	},

	/**
	 * Sends request to the service to installs package.
	 * @private
	 * @param {Mixed} config Request settings.
	 * @param {String} config.methodName Name of the service method.
	 * @param {Object} config.data Object data.
	 * @param {Function} config.callback The callback function.
	 * @param {Object} config.scope The scope of callback function.
	 */
	callInstallPkgService: function(config) {
		this.maskId = Terrasoft.Mask.show();
		var requestUrl = Terrasoft.workspaceBaseUrl + "/rest/" + config.serviceName + "/" + config.methodName;
		var requestConfig = {
			url: requestUrl,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			jsonData: Ext.encode(config.data),
			callback: function(request, success, response) {
				var responseObject = success ? Terrasoft.decode(response.responseText) : response;
				Ext.callback(config.callback, this, [responseObject, success]);
			},
			scope: config.scope
		};
		if (config && config.timeout) {
			requestConfig.timeout = config.timeout;
		}
		Terrasoft.AjaxProvider.request(requestConfig);
	},

	/**
	 * Installs package.
	 */
	installPackage: function() {
		var data = {};
		if (arguments.length > 3) {
			data = this.packageData[arguments[3]];
		}
		var url = data.url ? data.url : this.get("UrlField");
		if (!this.validateUrl(url)) {
			return;
		}
		var config = {
			serviceName: "InstallPackageService",
			methodName: "InstallFromStorage",
			data: {
				source: url
			},
			timeout: 1900000,
			callback: function(response) {
				Terrasoft.Mask.hide(this.maskId);
				Terrasoft.showInformation(response.InstallResult);
			},
			scope: this
		};
		this.callInstallPkgService(config);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.callParent(arguments);
	}
});
