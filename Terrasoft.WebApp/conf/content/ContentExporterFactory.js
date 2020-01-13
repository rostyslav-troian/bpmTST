Terrasoft.configuration.Structures["ContentExporterFactory"] = {innerHierarchyStack: ["ContentExporterFactory"]};
define("ContentExporterFactory", ["MjmlContentExporter"],
	function () {
		Ext.define("Terrasoft.configuration.ContentExporterFactory", {
			alternateClassName: "Terrasoft.ContentExporterFactory",
			defaultExporterName: "Terrasoft.EmailContentExporter",

			/**
			 * Defines an instance of applicable email content exporter by first item from template.
			 * @private
			 * @param {Array} items Array of items from template config.
			 * @returns {Terrasoft.BaseContentExporter} An instance of exporter or undefined.
			 */
			_getExporterByItems: function(items) {
				if (items && items.length > 0) {
					switch (items[0].ItemType) {
						case "mjblock":
							return Ext.create("Terrasoft.MjmlContentExporter");
						case "blockgroup":
							return this._getExporterByItems(items[0].Items);
						case "block":
							return Ext.create("Terrasoft.EmailContentExporter");
					}
				}
				return Ext.create(this.defaultExporterName);
			},

			/**
			 * Defines an instance of content exporter.
			 * @public
			 * @param {Object} config Content builder template config.
			 * @returns {Terrasoft.BaseContentExporter} Instance of exporter or undefined.
			 */
			getExporter: function(config) {
				if (config) {
					return this._getExporterByItems(config.Items);
				}
				return Ext.create(this.defaultExporterName);
			}
		});
	}
);


