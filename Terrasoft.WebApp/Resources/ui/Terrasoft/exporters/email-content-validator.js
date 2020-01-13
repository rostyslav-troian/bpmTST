/**
 * Provides methods to validate html-content of email template.
 */
Ext.define("Terrasoft.exporters.EmailContentValidator", {
	alternateClassName: "Terrasoft.EmailContentValidator",

	/**
	 * HTML5 deprecated tags
	 */
	deprecatedTags: ["acronym","applet", "basefont", "big", "center", "dir", "font", "frame", "frameset",
		"isindex", "noframes", "s", "strike", "tt", "u"],

	/**
	 * Validates document on deprecated tags existence - if contains so callback function will be called.
	 * @param {Object} emailHtmlDocument Document object.
	 * @param {Terrasoft.Collection} validationResult Collection of failed validation messages.
	 * @private
	 */
	_validateDeprecatedTags: function(emailHtmlDocument, validationResult) {
		var foundTags = [];
		Terrasoft.each(this.deprecatedTags, function(tag) {
			var tags = emailHtmlDocument.getElementsByTagName(tag);
			if (tags.length > 0) {
				foundTags.push(tag);
			}
		}, this);
		if (foundTags.length > 0) {
			var tagString = foundTags.join("\", \"");
			var message = Ext.String.format(Terrasoft.Resources.EmailContentValidator.DeprecatedHtmlTags, tagString);
			validationResult.add(message);
		}
	},

	/**
	 * Validates html
	 * @param {String} html Email HTML template.
	 * @param {Object} callback Callback function.
	 * @param {Object} scope Callback scope.
	 * @protected
	 */
	validate: function(html, callback, scope) {
		var validationResult = Ext.create("Terrasoft.Collection");
		var parser = new DOMParser();
		var emailHtmlDocument = parser.parseFromString(html, "text/html");
		this._validateDeprecatedTags(emailHtmlDocument, validationResult);
		callback.call(scope, validationResult, emailHtmlDocument);
	}
});
