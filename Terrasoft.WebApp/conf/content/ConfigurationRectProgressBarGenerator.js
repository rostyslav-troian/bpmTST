Terrasoft.configuration.Structures["ConfigurationRectProgressBarGenerator"] = {innerHierarchyStack: ["ConfigurationRectProgressBarGenerator"]};
define("ConfigurationRectProgressBarGenerator", ["ConfigurationBaseProgressBarGenerator", "RectProgressBar"],
		function() {

			/**
			 * @class Terrasoft.configuration.ConfigurationRectProgressBarGenerator
			 * Generator class for rectangle progress bar.
			 */
			Ext.define("Terrasoft.configuration.ConfigurationRectProgressBarGenerator", {
				alternateClassName: "Terrasoft.ConfigurationRectProgressBarGenerator",
				extend: "Terrasoft.ConfigurationBaseProgressBarGenerator",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarName
				 * @overridden
				 */
				progressBarName: "RectProgressBar",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarClassName
				 * @overridden
				 */
				progressBarClassName: "Terrasoft.RectProgressBar",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#serviceProperties
				 * @overridden
				 */
				serviceProperties: [
					"horizontal",
					"menu",
					"value",
					"sectorsBounds",
					"progressColor",
					"sectorsColors",
					"generator"
				]
			});

			return Ext.create("Terrasoft.ConfigurationRectProgressBarGenerator");
		});


