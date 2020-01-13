Terrasoft.configuration.Structures["IntroPage"] = {innerHierarchyStack: ["IntroPage"]};
define("IntroPage", ["performancecountermanager", "BaseSchemaModuleV2", "ContextHelpMixin"],
	function(performanceManager) {
		/**
		 * @class Terrasoft.configuration.IntroPage
		 * ##### ###### ####### ########.
		 */
		Ext.define("Terrasoft.configuration.IntroPage", {
			alternateClassName: "Terrasoft.IntroPage",
			extend: "Terrasoft.BaseSchemaModule",
			mixins: {
				ContextHelpMixin: "Terrasoft.ContextHelpMixin"
			},

			/**
			 * ############# ## ######### ### ######### ########## ##### ##########.
			 * @overridden
			 */
			init: function() {
				performanceManager.start(this.sandbox.id + "_Init");
				var headerConfig = {
					isMainMenu: true,
					isCaptionVisible: false,
					isContextHelpVisible: true
				};
				this.initContextHelp();
				this.sandbox.publish("InitDataViews", headerConfig);
				this.sandbox.subscribe("NeedHeaderCaption", function() {
					this.sandbox.publish("InitDataViews", headerConfig);
				}, this);
				this.callParent(arguments);
				performanceManager.stop(this.sandbox.id + "_Init");
			},

			render: function() {
				performanceManager.start(this.sandbox.id + "_Render");
				this.callParent(arguments);
				this.sandbox.publish("InitContextHelp", {
					contextHelpCode: this.schemaName
				});
				performanceManager.stop(this.sandbox.id + "_Render");
			}
		});
		return Terrasoft.IntroPage;
	});


