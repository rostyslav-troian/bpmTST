Terrasoft.configuration.Structures["PreviewDefaultReplicaViewModel"] = {innerHierarchyStack: ["PreviewDefaultReplicaViewModel"]};
define("PreviewDefaultReplicaViewModel", ["PreviewReplicaViewModel"], function() {
	Ext.define("Terrasoft.configuration.PreviewDefaultReplicaViewModel", {
		alternateClassName: "Terrasoft.PreviewDefaultReplicaViewModel",
		extend: "Terrasoft.PreviewReplicaViewModel",

		/**
		 * Validate required columns.
		 * @returns {Boolean}
		 * @override
		 */
		hasError: function () {
			var hasError = Ext.isEmpty(this.$Subject) || Ext.isEmpty(this.$SenderEmail) || Ext.isEmpty(this.$SenderName);
			return hasError;
		}
	});
});


