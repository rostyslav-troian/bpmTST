Terrasoft.configuration.Structures["FeedbackModule"] = {innerHierarchyStack: ["FeedbackModule"]};
define("FeedbackModule", ["ext-base", "sandbox", "terrasoft", "BaseSchemaModuleV2"],
	function(Ext, sandbox, Terrasoft) {

		Ext.define("Terrasoft.configuration.FeedbackModule", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.FeedbackModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			useHistoryState: false,

			initSchemaName: function() {
				this.schemaName = Terrasoft.feedbackConfig.schemaName;
			}
		});

		return Ext.create("Terrasoft.FeedbackModule", {
			Ext: Ext,
			sandbox: sandbox,
			Terrasoft: Terrasoft
		});

	});


