Terrasoft.configuration.Structures["SearchInInternetUtilities"] = {innerHierarchyStack: ["SearchInInternetUtilities"]};
define("SearchInInternetUtilities", ["SearchInInternetUtilitiesResources"], function(resources) {
	var SearchInInternetUtilitiesClass = Ext.define("Terrasoft.configuration.mixins.SearchInInternetUtilities", {
		alternateClassName: "Terrasoft.SearchInInternetUtilities",

		/**
		 * Collection of URLs for search in internet.
		 * @type {Object}
		 */
		"SearchEnginesUrlCollection": {
			dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
		},

		/**
		 * Initialize current instance.
		 * @protected
		 */
		initSearchInInternet: function() {
			this.loadUrlFromSysSettings();
		},

		/**
		 * Sets SearchEnginesUrlCollection collection.
		 * @protected
		 * @param {Object} sysSettingValues Collection of sysSettingValues.
		 */
		setSearchEnginesUrlCollection: function(sysSettingValues) {
			var collection = {};
			this.Terrasoft.each(sysSettingValues, function(settingValue, settingName) {
				collection[settingName] = settingValue;
			}, this);
			this.set("SearchEnginesUrlCollection", collection);
		},

		/**
		 * Returns codes for system settings which values are need to be initialized.
		 * @protected
		 * @return {Array} Returns array of SysSettings codes.
		 */
		getSysSettingsCodes: function() {
			return ["SearchInLinkedInURL", "SearchInFacebookURL", "SearchInGoogleURL"];
		},

		/**
		 * Loads URLs for search from SysSettings.
		 * @protected
		 */
		loadUrlFromSysSettings: function() {
			var sysSettingsCodes = this.getSysSettingsCodes();
			this.Terrasoft.SysSettings.querySysSettings(sysSettingsCodes, this.setSearchEnginesUrlCollection, this);
		},

		/**
		 * Returns URL for search.
		 * @param {String} sysSettingsCode Code of sysSetting for web address.
		 * @protected
		 * @return {String} Web address.
		 */
		getUrlForSearch: function(sysSettingsCode) {
			var result = "";
			var collection = this.get("SearchEnginesUrlCollection");
			if (collection) {
				result = collection[sysSettingsCode];
			}
			return result;
		},

		/**
		 * Tries to open a URL in a new page.
		 * @param {String} url Web address.
		 * @protected
		 */
		tryOpenURL: function(url) {
			if (url) {
				window.open(url, "_blank");
			}
		},

		/**
		 * Search in Internet by keywords.
		 * @param {String} keywords Keywords for search.
		 * @param {String} sysSettingURL SysSetting name with URL.
		 * @protected
		 */
		searchInInternet: function(keywords, sysSettingURL) {
			if (keywords) {
				var searchURL = this.getUrlForSearch(sysSettingURL);
				if (!this.Ext.isEmpty(searchURL)) {
					searchURL += keywords;
					this.tryOpenURL(searchURL);
				} else {
					this.showInformationDialog(resources.localizableStrings.SearchInInternetUrlNotFoundMessage);
				}
			}
		},

		/**
		 * Returns concatenated keywords for search.
		 * @param {Array} keywordsArray Array of keywords.
		 * @protected
		 * @return {String} Concatenated keywords.
		 */
		concatKeywordsForSearch: function(keywordsArray) {
			var keywordsString = "";
			if (!this.Ext.isEmpty(keywordsArray)) {
				for (var i = 0; i < keywordsArray.length; i++) {
					keywordsString += this.Ext.isEmpty(keywordsString) ? keywordsArray[i] : "+" + keywordsArray[i];
				}
			}
			return keywordsString;
		},

		/**
		 * Search in LinkedIn by keywords.
		 * @param {Array} keywordsArray Array of keywords for search.
		 * @public
		 */
		searchInLinkedIn: function(keywordsArray) {
			var keywords = this.concatKeywordsForSearch(keywordsArray);
			this.searchInInternet(keywords, "SearchInLinkedInURL");
		},

		/**
		 * Search in Facebook by keywords.
		 * @param {Array} keywordsArray Array of keywords for search.
		 * @public
		 */
		searchInFacebook: function(keywordsArray) {
			var keywords = this.concatKeywordsForSearch(keywordsArray);
			this.searchInInternet(keywords, "SearchInFacebookURL");
		},

		/**
		 * Search in Google by keywords.
		 * @param {Array} keywordsArray Array of keywords for search.
		 * @public
		 */
		searchInGoogle: function(keywordsArray) {
			var keywords = this.concatKeywordsForSearch(keywordsArray);
			this.searchInInternet(keywords, "SearchInGoogleURL");
		}
	});
	return Ext.create(SearchInInternetUtilitiesClass);
});


