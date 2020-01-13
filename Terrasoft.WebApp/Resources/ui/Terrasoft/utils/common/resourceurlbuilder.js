/**
 */
Ext.define("Terrasoft.ResourceUrlBuilder", {

	// region Properties: Private

	_mainUrl: null,

	// endregion

	// region Properties: Public

	singleton: true,

	// endregion

	// region Methods: Public

	/**
	 * Returns main url for javascript resource schemas. Url depends on user culture name.
	 * @return {String} Main url for javascript resource schemas.
	 */
	getMainUrl: function() {
		if (!this._mainUrl) {
			this._mainUrl = [
				Terrasoft.workspaceBaseUrl,
				Terrasoft.app.config.staticFileContent.resourcesRuntimePath,
				Terrasoft.currentUserCultureName
			].join("/");
		}
		return this._mainUrl;
	},

	/**
	 * Returns url of Javascript resource schema. Url depends on user culture name.
	 * @param {String} resourceName Resource name.
	 * @return {String} Url of Javascript resource schema.
	 */
	getUrl: function(resourceName) {
		var resourceUrl = [
			this.getMainUrl(),
			resourceName
		].join("/");
		return resourceUrl;
	}

	// endregion

});
