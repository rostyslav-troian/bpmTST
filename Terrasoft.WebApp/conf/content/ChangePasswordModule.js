Terrasoft.configuration.Structures["ChangePasswordModule"] = {innerHierarchyStack: ["ChangePasswordModule"]};
define("ChangePasswordModule", ["ServiceHelper", "ChangePasswordModuleResources", "ChangePasswordModuleSchema"],
	function(ServiceHelper, resources) {
	Ext.define("Terrasoft.configuration.ChangePasswordModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ChangePasswordModule",

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#generateViewContainerId
		 * @overridden
		 */
		generateViewContainerId: false,

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @overridden
		 */
		initSchemaName: function() {
			this.schemaName = "ChangePasswordModuleSchema";
		},

		render: function(renderTo) {
			this.callParent(arguments);
			var headerCaption = resources.localizableStrings.headerCaption;
			this.sandbox.publish("ChangeHeaderCaption", {
				caption: headerCaption,
				dataViews: new Terrasoft.Collection()
			});
			this.sandbox.subscribe("NeedHeaderCaption", function() {
				this.sandbox.publish("InitDataViews", {
					caption: headerCaption
				});
			}, this);
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @overridden
		 */
		initHistoryState: function() {
			var sandbox = this.sandbox;
			var state = sandbox.publish("GetHistoryState");
			var currentHash = state.hash;
			var currentState = state.state || {};
			if (currentState.moduleId === sandbox.id) {
				return;
			}
			var newState = Terrasoft.deepClone(currentState);
			newState.moduleId = sandbox.id;
			sandbox.publish("ReplaceHistoryState", {
				stateObj: newState,
				hash: currentHash.historyState,
				silent: true
			});
		}

	});
	return Terrasoft.ChangePasswordModule;
});


