/**
 * Error class.
 */
Ext.define("Terrasoft.core.ErrorInfo", {
	alternateClassName: "Terrasoft.ErrorInfo",
	extend: "Terrasoft.BaseObject",

	//region Properties: Protected

	/**
  * Template for converting an object to a string.
  * @protected
  * @type {String}
  */
	toStringTemplate: "{0}. {1}",

	//endregion

	//region Properties: Public

	/**
  * Error code.
  * @protected
  * @type {String}
  */
	errorCode: null,

	/**
  * Service message.
  * @protected
  * @type {String}
  */
	message: null,

	/**
  * Stack information.
  * @protected
  * @type {String}
  */
	stackTrace: null,

	// endregion

	//region Methods: Protected

	/**
  * Converts an object to a string.
  * @return {String} Error string.
  */
	toString: function() {
		return this.errorCode
			? Ext.String.format(this.toStringTemplate, this.errorCode, this.message)
			: this.message;
	}

	//endregion

});