/**
 */
Ext.define("Terrasoft.SchemaUrlBuilder", {

	// region Properties: Private

	_mainUrl: null,

	// endregion

	// region Properties: Public

	singleton: true,

	// endregion

	// region Methods: Public

	getMainUrl: function() {
		if (!this._mainUrl) {
			this._mainUrl = [
				Terrasoft.workspaceBaseUrl,
				Terrasoft.app.config.staticFileContent.schemasRuntimePath
			].join("/");
		}
		return this._mainUrl;
	},

	/**
	 * Returns url of Javascript schema.
	 * @param {String} schemaName Schema name.
	 * @return {String} Javascript schema url.
	 */
	getUrl: function(schemaName) {
		var schemaUrl = [
			this.getMainUrl(),
			schemaName
		].join("/");
		return schemaUrl;
	}

	// endregion

});
