/**
 * Class of localizable images.
 */
Ext.define("Terrasoft.core.LocalizableImage", {
	alternateClassName: "Terrasoft.LocalizableImage",
	extend: "Terrasoft.LocalizableValue",

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		if (config && config.cultureValues) {
			var cultureValues = config.cultureValues;
			//TODO: CRM-26579 Remove constructor after correct server image info serialization
			var isNotObject = typeof cultureValues[Object.keys(cultureValues)[0]] === "string";
			if (isNotObject) {
				config.cultureValues = {};
				Terrasoft.each(cultureValues, function(cultureValue, cultureName) {
					config.cultureValues[cultureName] = JSON.parse(cultureValue);
				});
			}
		}
		this.cultureValues = {};
		this.callParent(arguments);
	}
});
