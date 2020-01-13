Terrasoft.configuration.Structures["ConfigurationRoundProgressBarGenerator"] = {innerHierarchyStack: ["ConfigurationRoundProgressBarGenerator"]};
define("ConfigurationRoundProgressBarGenerator", ["ConfigurationBaseProgressBarGenerator", "RoundProgressBar"],
		function() {

			/**
			 * @class Terrasoft.configuration.ConfigurationRoundProgressBarGenerator
			 * Generator class for round progress bar.
			 */
			Ext.define("Terrasoft.configuration.ConfigurationRoundProgressBarGenerator", {
				alternateClassName: "Terrasoft.ConfigurationRoundProgressBarGenerator",
				extend: "Terrasoft.ConfigurationBaseProgressBarGenerator",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarName
				 * @overridden
				 */
				progressBarName: "RoundProgressBar",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#progressBarClassName
				 * @overridden
				 */
				progressBarClassName: "Terrasoft.RoundProgressBar",

				/**
				 * @inheritdoc Terrasoft.ConfigurationBaseProgressBarGenerator#serviceProperties
				 * @overridden
				 */
				serviceProperties: [
					"menu",
					"value",
					"sectorsBounds",
					"progressColor",
					"sectorsColors",
					"size",
					"clockwise",
					"borderWidth",
					"generator"
				]
			});

			return Ext.create("Terrasoft.ConfigurationRoundProgressBarGenerator");
		});


