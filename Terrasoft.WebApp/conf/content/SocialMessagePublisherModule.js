Terrasoft.configuration.Structures["SocialMessagePublisherModule"] = {innerHierarchyStack: ["SocialMessagePublisherModule"]};
define("SocialMessagePublisherModule", ["BaseMessagePublisherModule"],
	function() {
		Ext.define("Terrasoft.configuration.SocialMessagePublisherModule", {
			extend: "Terrasoft.BaseMessagePublisherModule",
			alternateClassName: "Terrasoft.SocialMessagePublisherModule",

			/**
			 * @inheritdoc Terrasoft.SocialMessagePublisherModule#initSchemaName
			 * @overridden
			 */
			initSchemaName: function() {
				this.schemaName = "SocialMessagePublisherPage";
			}
		});
		return Terrasoft.SocialMessagePublisherModule;
	});


