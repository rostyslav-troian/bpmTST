Terrasoft.configuration.Structures["ConfigurationCompletenessIndicatorGenerator"] = {innerHierarchyStack: ["ConfigurationCompletenessIndicatorGenerator"]};
define("ConfigurationCompletenessIndicatorGenerator", ["CompletenessIndicator",
		"ConfigurationRoundProgressBarGenerator"
	],
	function() {

		/**
		 * @class Terrasoft.configuration.ConfigurationCompletenessIndicatorGenerator
		 * Generator class for round completeness indicator.
		 * @deprecated Use {@link #Terrasoft.ConfigurationRoundProgressBarGenerator}.
		 */
		Ext.define("Terrasoft.configuration.ConfigurationCompletenessIndicatorGenerator", {
			alternateClassName: "Terrasoft.ConfigurationCompletenessIndicatorGenerator",
			extend: "Terrasoft.ConfigurationRoundProgressBarGenerator",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ########## ############ ########## CompletenessIndicator.
			 * @protected
			 * @param {Object} config ############, ####### ######## ######## ### ######### CompletenessIndicator.
			 * @return {Object} ############ ########## CompletenessIndicator.
			 */
			generateCompletenessIndicator: function(config) {
				config = Ext.apply(config, {
					className: "Terrasoft.CompletenessIndicator"
				});
				var serviceProperties = this.getConfigWithoutServiceProperties(config, ["menu", "generator"]);
				var baseConfig = this.generateProgressBar(config);
				Ext.apply(baseConfig, serviceProperties);
				return baseConfig;
			}
		});

		return Ext.create("Terrasoft.ConfigurationCompletenessIndicatorGenerator");
	}
);


