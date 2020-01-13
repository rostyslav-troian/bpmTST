Terrasoft.configuration.Structures["ContentBuilderEnumsModule"] = {innerHierarchyStack: ["ContentBuilderEnumsModule"]};
define("ContentBuilderEnumsModule", ["BaseSchemaModuleV2"], function() {
	Ext.define("Terrasoft.configuration.ContentBuilderEnumsModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ContentBuilderEnumsModule",

		/**
		 * @enum
		 * Content designer mode.
		 */
		ContentBuilderMode: {
			EMAILTEMPLATE: "EmailTemplate"
		},

		/**
		 * @string
		 * Url-prefix address content designer.
		 */
		BasePath: "/Nui/ViewModule.aspx?vm=BaseViewModule#ConfigurationModuleV2/",

		/**
		 * Returns content designer parameters.
		 * @param {Object} mode Content designer mode.
		 * @returns {Object}
		 */
		getContentBuilderConfigs: function() {
			var contentBuilderModeConfig = {};
			contentBuilderModeConfig[this.ContentBuilderMode.EMAILTEMPLATE] = {
				"EntitySchemaName": "EmailTemplate",
				"TemplateConfigColumnName": "TemplateConfig",
				"TemplateBodyColumnName": "Body",
				"ObjectColumnName": "Object.Name",
				"ViewModelName": "EmailContentBuilder",
				"TemplateName": "Name",
				"ConfigType": "ConfigType",
				"ImageIdColumn": "PreviewImage"
			};
			return contentBuilderModeConfig;
		},

		/**
		 * Returns content designer parameters.
		 * @param {Object} mode Content designer mode.
		 * @returns {Object}
		 */
		getContentBuilderConfig: function(mode) {
			var contentBuilderModeConfig = this.getContentBuilderConfigs();
			return contentBuilderModeConfig[mode];
		},

		/**
		 * Returns content designer url-address with parameters.
		 * @param {Object} mode Content designer mode.
		 * @param {String} recordId The unique identifier of a record.
		 * @returns {String} Content designer url-address.
		 */
		getContentBuilderUrl: function(mode, recordId) {
			var contentBuilderConfig = this.getContentBuilderConfig(mode);
			return Ext.String.format("{0}{1}{2}/{3}/{4}",
				Terrasoft.workspaceBaseUrl,
				this.BasePath,
				contentBuilderConfig.ViewModelName,
				recordId,
				mode);
		}
	});
	return Ext.create(Terrasoft.ContentBuilderEnumsModule);
});


