Terrasoft.configuration.Structures["HtmlControlGeneratorV2"] = {innerHierarchyStack: ["HtmlControlGeneratorV2"]};
define("HtmlControlGeneratorV2", ["ext-base", "terrasoft", "ViewGeneratorV2"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.HtmlControlGenerator", {
		extend: "Terrasoft.ViewGenerator",
		alternateClassName: "Terrasoft.HtmlControlGenerator",

		/**
		 * Generates options for creating controls.
		 * @param {Object} config Options for generator.
		 * @return {Object} Options for creating controls.
		 */
		generateCustomHtmlControl: function(config) {
			var id = this.getControlId(config, "Terrasoft.HtmlControl");
			var controlConfig = {
				className: "Terrasoft.HtmlControl",
				htmlContent: config.htmlContent
			};
			this.applyControlId(controlConfig, config, id);
			Ext.apply(controlConfig, this.getConfigWithoutServiceProperties(config, ["generator", "htmlContent"]));
			return controlConfig;
		},

		/**
		 * @inheritdoc Terrasoft.ViewGenerator#getControlId
		 * @overridden
		 */
		getControlId: function(config) {
			return config.name + Terrasoft.generateGUID() + "HtmlControl";
		},

		/**
		 * Forms creation options to control the display of html control.
		 * @param {Object} config Options for generator.
		 * @return {Object} Options to control the display of html control.
		 */
		generateHtmlControl: function(config) {
			var initialConfig = this.generateCustomHtmlControl(config);
			initialConfig.tpl = [
				/*jshint quotmark:true */
				'<div id="{id}" class="{wrapClass}">',
				'{htmlContent}',
				'</div>'
				/*jshint quotmark:false */
			];
			return initialConfig;
		}
	});
	return Ext.create(Terrasoft.HtmlControlGenerator);
});


