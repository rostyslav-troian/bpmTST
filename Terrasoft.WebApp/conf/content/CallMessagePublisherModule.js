Terrasoft.configuration.Structures["CallMessagePublisherModule"] = {innerHierarchyStack: ["CallMessagePublisherModule"]};
define("CallMessagePublisherModule", ["BaseMessagePublisherModule"],
	function() {
		Ext.define("Terrasoft.configuration.CallMessagePublisherModule", {
			extend: "Terrasoft.BaseMessagePublisherModule",
			alternateClassName: "Terrasoft.CallMessagePublisherModule",

			/**
			 * @inheritdoc Terrasoft.CallMessagePublisherModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "CallMessagePublisherPage";
			}
		});
		return Terrasoft.CallMessagePublisherModule;
	});


