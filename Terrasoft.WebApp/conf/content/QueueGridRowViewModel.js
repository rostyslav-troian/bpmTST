Terrasoft.configuration.Structures["QueueGridRowViewModel"] = {innerHierarchyStack: ["QueueGridRowViewModel"]};
define("QueueGridRowViewModel", ["ext-base", "BaseGridRowViewModel"],
	function(Ext) {

	/**
	 * @class Terrasoft.configuration.QueueGridRowViewModel
	 * ##### ###### ############# ###### #######
	 */
	Ext.define("Terrasoft.configuration.QueueGridRowViewModel", {
		extend: "Terrasoft.BaseGridRowViewModel",
		alternateClassName: "Terrasoft.QueueGridRowViewModel",

		/**
		 * ########## ####### ######### ###### "##### # ######".
		 * @private
		 * @returns {boolean} ####### #########.
		 */
		getIsProcessRunButtonVisible: function() {
			return !this.get("IsSupervisorMode");
		}
	});

	return Terrasoft.QueueGridRowViewModel;
});


