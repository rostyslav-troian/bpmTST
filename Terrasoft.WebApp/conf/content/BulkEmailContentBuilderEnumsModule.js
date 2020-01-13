Terrasoft.configuration.Structures["BulkEmailContentBuilderEnumsModule"] = {innerHierarchyStack: ["BulkEmailContentBuilderEnumsModule"]};
define("BulkEmailContentBuilderEnumsModule", ["ContentBuilderEnumsModule"], function() {
	Ext.define("Terrasoft.configuration.BulkEmailContentBuilderEnumsModule", {
		extend: "Terrasoft.ContentBuilderEnumsModule",
		alternateClassName: "Terrasoft.BulkEmailContentBuilderEnumsModule",
		BulkEmailContentBuilderMode: {
			BULKEMAIL: "BuilEmail"
		},
		/**
		 * Returns content builder config.
		 * @protected
		 */
		getContentBuilderConfigs: function() {
			var parentConfig = this.callParent(arguments);
			var bulkEmailModeConfig = {};
			var isWizardFeatureEnabled = Terrasoft.Features.getIsEnabled("MarketingContentBuilderWizard");
			var contentBuilderViewModelName = isWizardFeatureEnabled ? "BulkEmailContentWizard" : "BulkEmailContentBuilder";
			bulkEmailModeConfig[this.BulkEmailContentBuilderMode.BULKEMAIL] = {
				"EntitySchemaName": "BulkEmail",
				"TemplateConfigColumnName": "TemplateConfig",
				"TemplateBodyColumnName": "TemplateBody",
				"MacrosEntity": "VwMandrillRecipientV2",
				"ViewModelName": contentBuilderViewModelName
			};
			return Ext.apply(parentConfig, bulkEmailModeConfig);
		}
	});
	return Ext.create(Terrasoft.BulkEmailContentBuilderEnumsModule);
});


