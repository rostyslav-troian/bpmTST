Terrasoft.configuration.Structures["VisaProviderFactory"] = {innerHierarchyStack: ["VisaProviderFactory"]};
define("VisaProviderFactory", ["BaseVisaProvider"], function() {
	Ext.define("Terrasoft.configuration.VisaProviderFactory", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.VisaProviderFactory",

		create: function(config) {
			return Ext.create("Terrasoft.BaseVisaProvider", config);
		}
	});
	return {};
});


