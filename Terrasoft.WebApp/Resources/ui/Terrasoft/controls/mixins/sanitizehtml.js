/**
 * Mixin is used by controls that must support work with drop-down content.
 */
Ext.define("Terrasoft.controls.mixins.SanitizeHtml", {
	alternateClassName: "Terrasoft.SanitizeHtml",

	//region Fields: Private

	/**
	 * Call html sanitize library before editor value set.
	 * @private
	 * @type {Boolean}
	 */
	_sanitizeHtml: false,

	//endregion

	//region Methods: Protected

	/**
	 * Returns the binding configuration to the model for the mixin interface {@link Terrasoft.Bindable}.
	 * @protected
	 */
	getSanitizeHtmlBindConfig: function() {
		return {
			sanitizeHtml: {
				changeMethod: "setSanitizeHtml"
			}
		};
	},

	/**
	 * Sets _sanitizeHtml field value.
	 * @protected
	 * @param {Boolean} value New field value.
	 */
	setSanitizeHtml: function(value) {
		this._sanitizeHtml = value;
	},

	/**
	 * Returns sanitized value if needed.
	 * @protected
	 * @param {String} value Raw string value.
	 * @return {String} Sanitized value.
	 */
	getSanitizedValue: function(value) {
		return this._sanitizeHtml ? Terrasoft.sanitizeHTML(value) : value;
	}

	//endregion

});
