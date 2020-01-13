Terrasoft.configuration.Structures["SectionDesignerViewModule"] = {innerHierarchyStack: ["SectionDesignerViewModule"]};
define("SectionDesignerViewModule", ["ext-base", "sandbox", "terrasoft", "BaseViewModule", "ConfigurationViewModule"],
	function(Ext, sandbox, Terrasoft) {

		/**
		 * @class Terrasoft.configuration.ViewModule
		 * Visual view module class for section designer
		 */
		Ext.define("Terrasoft.configuration.SectionDesignerViewModule", {
			extend: "Terrasoft.ConfigurationViewModule",
			alternateClassName: "Terrasoft.SectionDesignerViewModule",

			diff: [{
				"operation": "remove",
				"name": "leftPanel"
			}, {
				"operation": "remove",
				"name": "communicationPanel"
			}, {
				"operation": "remove",
				"name": "rightPanel"
			}, {
				"operation": "remove",
				"name": "mainHeader"
			}],

			/**
			 * @inheritDoc Terrasoft.configuration.BaseViewModule#init
			 * @overridden
			 */
			render: function(renderTo) {
				renderTo.addCls("section-designer-shown");
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.ConfigurationViewModule#prepareDemoLinkButtons
			 * @overridden
			 */
			prepareDemoLinkButtons: Terrasoft.emptyFn,

			/**
			 * @inheritDoc Terrasoft.configuration.ConfigurationViewModule#onSideBarModuleDefInfo
			 * @overridden
			 */
			onSideBarModuleDefInfo: Terrasoft.emptyFn,

			/**
			 * @inheritDoc Terrasoft.configuration.BaseViewModule#loadModuleFromHistoryState
			 * @overridden
			 */
			loadModuleFromHistoryState: function(token) {
				var moduleName = this.getModuleName(token);
				if (!moduleName) {
					return;
				}
				this.onStateChanged();
				this.sandbox.loadModule(moduleName, { renderTo: "centerPanel" });
			}

		});

		return Terrasoft.SectionDesignerViewModule;
	});


