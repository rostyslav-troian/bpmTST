Terrasoft.configuration.Structures["MjmlContentExporter"] = {innerHierarchyStack: ["MjmlContentExporter"]};
define("MjmlContentExporter", ["MjmlCore", "MjmlContentExporterResources", "ContentBuilderConfigToMjmlConverter",
		"ContentBuilderConstants"],
	function (mjml) {
		/**
		 * @class Terrasoft.configuration.MjmlContentExporter
		 */
		Ext.define("Terrasoft.configuration.MjmlContentExporter", {
			extend: "Terrasoft.BaseContentExporter",
			alternateClassName: "Terrasoft.MjmlContentExporter",

			/**
			 * Default minification config.
			 * @protected
			 * @type {Object}
			 */
			minificationConfig: {
				collapseBooleanAttributes: true,
				collapseWhitespace: false,
				collapseInlineTagWhitespace: true,
				keepClosingSlash: true,
				html5: false,
				minifyCSS: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				caseSensitive: true,
				removeAttributeQuotes: false
			},

			/** Type of exported item.
			 * @protected
			 * @type {Object}
			 */
			ExportedItemType: _.assign({}, Terrasoft.ExportedItemType, {
				HTML: Terrasoft.ContentBuilderBodyItemType.mjraw.value,
				BLOCK: Terrasoft.ContentBuilderBodyItemType.mjblock.value,
				SECTION: Terrasoft.ContentBuilderBodyItemType.section.value,
				COLUMN: Terrasoft.ContentBuilderBodyItemType.column.value
			}),

			/**
			 * Returns converter for content builder config to Mjml config.
			 * @protected
			 * @returns {Terrasoft.converters.ContentBuilderConfigToMjmlConverter}
			 * Content builder template config to MJML config converter.
			 */
			getContentBuilderToMjmlConverter: function() {
				return new Terrasoft.ContentBuilderConfigToMjmlConverter();
			},

			/**
			 * Exports content builder template config to html.
			 * @public
			 * @param config Content builder template config.
			 * @returns {String} Html text.
			 */
			exportData: function(config) {
				var converter = this.getContentBuilderToMjmlConverter();
				var mjmlConfig = converter.convert(config);
				var isMinificationEnabled = Terrasoft.Features.getIsEnabled("MinifyEmailHtml");
				var mjmlResult = isMinificationEnabled
					? mjml(mjmlConfig, { minify: this.minificationConfig })
					: mjml(mjmlConfig);
				return mjmlResult.html;
			}
		});
	}
);


