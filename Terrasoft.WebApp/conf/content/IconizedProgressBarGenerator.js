Terrasoft.configuration.Structures["IconizedProgressBarGenerator"] = {innerHierarchyStack: ["IconizedProgressBarGenerator"]};
define("IconizedProgressBarGenerator", ["ConfigurationBaseProgressBarGenerator", "IconizedProgressBar"],
		function() {
	/**
	 * @class Terrasoft.configuration.IconizedProgressBarGenerator
	 * Generator class for customizable with icons progress bar.
	 */
	Ext.define("Terrasoft.configuration.IconizedProgressBarGenerator", {
		alternateClassName: "Terrasoft.IconizedProgressBarGenerator",
		extend: "Terrasoft.ConfigurationBaseProgressBarGenerator",

		/**
		 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarName
		 * @override
		 */
		progressBarName: "IconizedProgressBar",

		/**
		 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarClassName
		 * @override
		 */
		progressBarClassName: "Terrasoft.IconizedProgressBar",

		/**
		 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#serviceProperties
		 * @override
		 */
		serviceProperties: [
			"horizontal",
			"menu",
			"value",
			"sectorsBounds",
			"progressColor",
			"sectorsColors",
			"pointIconUrl",
			"generator"
		]
	});

	return Ext.create("Terrasoft.IconizedProgressBarGenerator");
});


