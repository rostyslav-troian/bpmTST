Terrasoft.configuration.Structures["EmailMessagePublisherModule"] = {innerHierarchyStack: ["EmailMessagePublisherModule"]};
define("EmailMessagePublisherModule", ["BaseMessagePublisherModule"],
		function() {
			Ext.define("Terrasoft.configuration.EmailMessagePublisherModule", {
				extend: "Terrasoft.BaseMessagePublisherModule",
				alternateClassName: "Terrasoft.EmailMessagePublisherModule",

				/**
				 * @inheritdoc Terrasoft.BaseMessagePublisherModule#initSchemaName
				 * @overridden
				 */
				initSchemaName: function() {
					this.schemaName = "EmailMessagePublisherPage";
				}

			});
			return this.Terrasoft.EmailMessagePublisherModule;
		});


