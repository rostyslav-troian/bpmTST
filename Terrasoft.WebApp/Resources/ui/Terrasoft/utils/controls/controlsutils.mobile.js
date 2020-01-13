/**
 * Creates a Viewport depending on the platform
 * @param {Object} config The configuration object of the class.
 * @return {Terrasoft.BaseViewport} an instance of the Viewport class
 */
Terrasoft.utils.controls.createViewport = function(config) {
	var osName = Ext.os.name;
	var viewportName;
	switch (osName) {
		case "Android":
			viewportName = (Ext.browser.name === "ChromeMobile") ? "Base" : "Android";
			break;

		case "iOS":
			viewportName = "Ios";
			break;

		default:
			viewportName = "Base";
			break;
	}
	var viewport = Ext.create("Terrasoft." + viewportName + "Viewport", config);
	return viewport;
};

/**
 * short notation for {@link Terrasoft.utils.controls#createViewport}
 * @member Terrasoft
 * @method createViewport
 * @inheritdoc Terrasoft.utils.controls#createViewport
 */
Terrasoft.createViewport = Terrasoft.utils.controls.createViewport;