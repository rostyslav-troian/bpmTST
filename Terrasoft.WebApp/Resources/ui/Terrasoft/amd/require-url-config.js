define(["ext-base"], function() {

	/**
	 * Provides methods for RequireJS urlArgs configuration.
	 */
	Ext.define("Terrasoft.RequireUrlConfig", {
		singleton: true,

		/**
		 * Returns extra query string arguments appended to URL that RequireJS uses to fetch resources.
		 * @param {String} id Module ID.
		 * @param {String} url URL.
		 * @return {String} Query string arguments.
		 */
		getUrlArgs: function(id, url) {
			if (url.indexOf("hash=") !== -1) {
				return "";
			}
			if (!Terrasoft.configurationContentHash) {
				return "";
			}
			return (url.indexOf("?") !== -1 ? "&" : "?") + "hash=" + Terrasoft.configurationContentHash;
		}
	});
	return Terrasoft.RequireUrlConfig;
});
