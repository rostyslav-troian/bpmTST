/**
 * Base response.
 */
Ext.define("Terrasoft.core.BaseResponse", {
	alternateClassName: "Terrasoft.BaseResponse",
	extend: "Terrasoft.BaseObject",

	// region Properties: Protected

	/**
	 * The name of the error class.
	 * @type {String}
	 */
	errorInfoClassName: "Terrasoft.ErrorInfo",

	// endregion

	// region Methods: Protected

	/**
	 * Determines the success of the query result.
	 * @return {Boolean} The success of the query result.
	 */
	isSuccess: function() {
		return Ext.Object.isEmpty(this.errorInfo);
	},

	/**
	 * Initializes the response property.
	 * @param {String} propertyName Property name.
	 * @param {Mixed} propertyValue Property value.
	 * @return {Mixed} Initialized response property.
	 */
	initPropertyValue: function(propertyName, propertyValue) {
		if ((propertyName === "errorInfo") && propertyValue &&
			!Terrasoft.isInstanceOfClass(propertyValue, this.errorInfoClassName)) {
			var errorInfoConfig = {
				errorCode: propertyValue.errorCode,
				message: propertyValue.message,
				stackTrace: propertyValue.stackTrace
			};
			propertyValue = Ext.create(this.errorInfoClassName, errorInfoConfig);
		}
		return propertyValue;
	},

	/**
	 * Returns the response properties that need to be processed.
	 * @return {Array} The response properties that need to be processed.
	 */
	getResponsePropertyNames: function() {
		return ["success", "errorInfo"];
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor.
	 * @override
	 */
	constructor: function(config) {
		var constructorConfig = {};
		Terrasoft.each(config, function(objectPropertyValue, objectPropertyName) {
			this[objectPropertyName] = null;
			constructorConfig[objectPropertyName] = this.initPropertyValue(objectPropertyName,
				objectPropertyValue);
		}, this);
		this.callParent([constructorConfig]);
		this.success = this.isSuccess();
	},

	/**
	 * Destroys the response properties.
	 * @param {String} propertyName The name of the property.
	 */
	destroyPropertyValue: function(propertyName) {
		if (propertyName === "errorInfo" &&
			Terrasoft.isInstanceOfClass(this.errorInfo, this.errorInfoClassName)) {
			this.errorInfo.destroy();
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy.
	 * @override
	 */
	onDestroy: function() {
		var responsePropertyNames = this.getResponsePropertyNames();
		Terrasoft.each(responsePropertyNames, function(objectPropertyName) {
			this.destroyPropertyValue(objectPropertyName);
		}, this);
		this.callParent(arguments);
	}

	// endregion

});
