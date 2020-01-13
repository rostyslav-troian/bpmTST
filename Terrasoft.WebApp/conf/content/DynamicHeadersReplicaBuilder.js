Terrasoft.configuration.Structures["DynamicHeadersReplicaBuilder"] = {innerHierarchyStack: ["DynamicHeadersReplicaBuilder"]};
define("DynamicHeadersReplicaBuilder", ["DynamicContentReplicaBuilder"], function() {
	Ext.define("Terrasoft.configuration.DynamicHeadersReplicaBuilder", {
		extend: "Terrasoft.DynamicContentReplicaBuilder",
		alternateClassName: "Terrasoft.DynamicHeadersReplicaBuilder",

		getHeaderFn: Ext.emptyFn,

		/**
		 * @inheritDoc Terrasoft.DynamicContentReplicaBuilder#getReplicaConfig
		 * @override
		 */
		getReplicaConfig: function(templateJson, replicaMask, captionBuilder){
			var replicaConfig = this.callParent(arguments);
			if(replicaConfig) {
				replicaConfig.PreHeaderText = this.getHeaderFn(replicaConfig.ReplicaMask);
			}
			return replicaConfig;
		}
	});
	return Terrasoft.configuration.DynamicHeadersReplicaBuilder;
});


