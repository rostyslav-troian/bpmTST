/**
 * @class Terrasoft.services.ServiceMethodRequest
 */
Ext.define("Terrasoft.services.ServiceMethodRequest", {
	extend: "Terrasoft.ServiceMethodResponse",
	alternateClassName: "Terrasoft.ServiceMethodRequest",

	//region Properties: Public

	/**
	 * Uri
	 * @type {String}
	 */
	uri: null,

	/**
	 * Service Content Type.
	 * @type {Terrasoft.services.enums.ServiceContentType}
	 */
	contentType: Terrasoft.services.enums.ServiceContentType.JSON,

	/**
	 * Http Method Type.
	 * @type {Terrasoft.services.enums.HttpMethodType}
	 */
	httpMethodType: Terrasoft.services.enums.HttpMethodType.GET,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableProperties.
	 * @overridden
	 */
	getSerializableProperties: function() {
		return ["uri", "contentType", "httpMethodType", "parameters"];
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @overridden
	 */

	/**
	 * @public
	 * Returns HTTP method name.
	 * @return {String} Http type name.
	 */
	findHttpMethodTypeName: function() {
		var httpMethodTypeName = null;
		Terrasoft.each(Terrasoft.services.enums.HttpMethodType, function(typeValue, typeName) {
			if (this.httpMethodType === typeValue) {
				httpMethodTypeName = typeName;
			}
		}, this);
		return httpMethodTypeName;
	}

	//endregion

});
