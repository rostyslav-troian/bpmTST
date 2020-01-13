Terrasoft.configuration.Structures["EmailWithSubjectMLangContentBuilderEnumsModule"] = {innerHierarchyStack: ["EmailWithSubjectMLangContentBuilderEnumsModule"]};
define("EmailWithSubjectMLangContentBuilderEnumsModule", ["ContentBuilderEnumsModule"], function() {
	Ext.define("Terrasoft.configuration.EmailWithSubjectMLangContentBuilderEnumsModule", {
		extend: "Terrasoft.ContentBuilderEnumsModule",
		alternateClassName: "Terrasoft.EmailWithSubjectMLangContentBuilderEnumsModule",

		//region Properties: Protected

		ContentBuilderMode: {
			EMAILTEMPLATE: "EmailTemplate"
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
			emailMLangContentBuilderConfig[this.ContentBuilderMode.EMAILTEMPLATE] = {
				"ViewModelName": "EmailWithSubjectContentBuilder"
			};
			return Ext.merge(parentConfig, emailMLangContentBuilderConfig);
		},

		/**
		 * @inheritDoc Terrasoft.ContentBuilderEnumsModule#getContentBuilderUrl
		 * @override
		 */
		getContentBuilderUrl: function() {
			var tag = arguments[2];
			var parentUrl = this.callParent(arguments);
			return Ext.String.format("{0}/{1}",
				parentUrl, tag);
		}

		//endregion

	});

	return Ext.create(Terrasoft.EmailWithSubjectMLangContentBuilderEnumsModule);
});


