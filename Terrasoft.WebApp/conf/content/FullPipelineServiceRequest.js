Terrasoft.configuration.Structures["FullPipelineServiceRequest"] = {innerHierarchyStack: ["FullPipelineServiceRequest"]};
define("FullPipelineServiceRequest", ["ConfigurationServiceRequest"], function() {
	Ext.define("Terrasoft.configuration.FullPipelineServiceRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.FullPipelineServiceRequest",

		serviceName: "FullPipelineService",

		contractName: "GetAllSlicesFullPipelineData",

		pipelineConfig: {},

		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			serializableObject.pipelineConfig = this.pipelineConfig;
		}
	});
});


