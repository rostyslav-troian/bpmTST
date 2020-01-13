Terrasoft.configuration.Structures["PortalMessagePublisherModule"] = {innerHierarchyStack: ["PortalMessagePublisherModule"]};
define("PortalMessagePublisherModule", ["BaseMessagePublisherModule"],
	function() {
		Ext.define("Terrasoft.configuration.PortalMessagePublisherModule", {
			extend: "Terrasoft.BaseMessagePublisherModule",
			alternateClassName: "Terrasoft.PortalMessagePublisherModule",

			/**
			 * @inheritdoc Terrasoft.BaseMessagePublisherModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "PortalMessagePublisherPage";
			}
		});
		return Terrasoft.PortalMessagePublisherModule;
	});


