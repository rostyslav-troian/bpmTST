Terrasoft.configuration.Structures["ContextHelpMixin"] = {innerHierarchyStack: ["ContextHelpMixin"]};
define("ContextHelpMixin", [], function() {
	Ext.define("Terrasoft.configuration.mixins.ContextHelpMixin", {
		alternateClassName: "Terrasoft.ContextHelpMixin",

		/**
		 * ############## ########### #######.
		 * @protected
		 * @virtual
		 */
		initContextHelp: function() {
			var contextHelpConfig = this.getContextHelpConfig();
			this.sandbox.publish("InitContextHelp", contextHelpConfig);
		},

		/**
		 * Subscribes to context helper message.
		 */
		subscribeContextHelpMessage: function() {
			this.sandbox.subscribe("ContextHelpModuleLoaded", function() {
				this.initContextHelp();
			}, this);
		},

		/**
		 * ########## ###### ############ ########### #######.
		 * @protected
		 * @virtual
		 * @return {Object} ###### ############ ########### #######.
		 */
		getContextHelpConfig: function() {
			return {
				contextHelpId: this.getContextHelpId(),
				contextHelpCode: this.getContextHelpCode()
			};
		},

		/**
		 * ########## ### ########### #######.
		 * @protected
		 * @virtual
		 * @return {String} ############# ######## ########### #######.
		 */
		getContextHelpId: Terrasoft.emptyFn,

		/**
		 * ########## ### ########### #######.
		 * @protected
		 * @virtual
		 * @return {String} ### ########### #######.
		 */
		getContextHelpCode: function() {
			return this.Terrasoft.moduleName;
		}
	});

	return Terrasoft.ContextHelpMixin;
});


