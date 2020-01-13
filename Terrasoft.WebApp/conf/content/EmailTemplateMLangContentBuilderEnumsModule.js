Terrasoft.configuration.Structures["EmailTemplateMLangContentBuilderEnumsModule"] = {innerHierarchyStack: ["EmailTemplateMLangContentBuilderEnumsModule"]};
define("EmailTemplateMLangContentBuilderEnumsModule", ["ContentBuilderEnumsModule"], function() {
	Ext.define("Terrasoft.configuration.EmailTemplateMLangContentBuilderEnumsModule", {
		extend: "Terrasoft.ContentBuilderEnumsModule",
		alternateClassName: "Terrasoft.EmailTemplateMLangContentBuilderEnumsModule",

		//region Properties: Protected

		ContentBuilderMode: {
			EMAILTEMPLATE: "EmailTemplate",
			EMAILTEMPLATELANG: "EmailTemplateLang"
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritDoc Terrasoft.ContentBuilderEnumsModule#getContentBuilderConfigs
		 * @override
		 */
		getContentBuilderConfigs: function() {
			var parentConfig = this.callParent(arguments);
			var emailMLangContentBuilderConfig = {};
			if(Terrasoft.Features.getIsEnabled("MultiLanguageContentBuilderEnabled")) {
				parentConfig.EmailTemplate.ViewModelName = "MultiLanguageEmailContentBuilder";
			}
			emailMLangContentBuilderConfig[this.ContentBuilderMode.EMAILTEMPLATELANG] = {
				"EntitySchemaName": "EmailTemplateLang",
				"TemplateConfigColumnName": "TemplateConfig",
				"ObjectColumnName": "EmailTemplate.Object.Name",
				"ViewModelName": "EmailMLangContentBuilder",
				"ParentEntityColumnName": "EmailTemplate",
				"ConfigType": "ConfigType"
			};
			return Ext.apply(parentConfig, emailMLangContentBuilderConfig);
		},

		/**
		 * @inheritDoc Terrasoft.ContentBuilderEnumsModule#getContentBuilderUrl
		 * @override
		 */
		getContentBuilderUrl: function() {
			var tag = arguments[2];
			var parentUrl = this.callParent(arguments);
			if (!tag) {
				return parentUrl;
			}
			return Ext.String.format("{0}/{1}",
				parentUrl, tag);
		}

		//endregion

	});

	return Ext.create(Terrasoft.EmailTemplateMLangContentBuilderEnumsModule);
});


