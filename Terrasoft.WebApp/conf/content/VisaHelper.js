Terrasoft.configuration.Structures["VisaHelper"] = {innerHierarchyStack: ["VisaHelper"]};
define("VisaHelper", ["VisaProviderFactory", "css!VisaHelper"], function() {
	var visaProviderFactory = Ext.create("Terrasoft.VisaProviderFactory");
	return visaProviderFactory.create();
});


