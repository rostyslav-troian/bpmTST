Terrasoft.configuration.Structures["DelayExecutionUtilities"] = {innerHierarchyStack: ["DelayExecutionUtilities"]};
define("DelayExecutionUtilities", ["LoadProcessModules"], function(LoadProcessModules) {
	/**
	 * @class Terrasoft.configuration.mixins.DelayExecutionUtilities
	 * ######, ########### ###### # ####### DelayExecution
	 */
	Ext.define("Terrasoft.configuration.mixins.DelayExecutionUtilities", {
		alternateClassName: "Terrasoft.DelayExecutionUtilities",

		/**
		 *
		 */
		onDelayExecutionButtonClick: function() {
			var moduleId = this.sandbox.id + "_DelayExecutionModuleV2";
			if (this.get("DelayExecutionModuleContainerVisible")) {
				this.closeDelayExecutionModule(moduleId);
			} else {
				this.set("DelayExecutionModuleContainerVisible", true);
				this.sandbox.subscribe("CloseDelayExecutionModule", this.closeDelayExecutionModule, this, [moduleId]);
				this.sandbox.loadModule("DelayExecutionModuleV2", {renderTo: "DelayExecutionModuleContainer"});
			}
		},

		/**
		 * ######## ######## ######## "#########" ### ###### "######## ##########"
		 * return {Boolean} ########## ######## ######## "#########" ### ###### "######## ##########"
		 */
		getDelayExecutionButtonVisible: function() {
			return LoadProcessModules.isDelayExecutionButtonVisible(this.sandbox, this.get("IsProcessMode"));
		},

		/**
		 *
		 * @param moduleId
		 */
		closeDelayExecutionModule: function(moduleId) {
			this.set("DelayExecutionModuleContainerVisible", false);
			this.sandbox.unloadModule(moduleId);
		}
	});
	return Terrasoft.DelayExecutionUtilities;
});


