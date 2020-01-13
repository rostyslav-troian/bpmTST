Terrasoft.configuration.Structures["CustomViewGeneratorUtilsV2"] = {innerHierarchyStack: ["CustomViewGeneratorUtilsV2"]};
define("CustomViewGeneratorUtilsV2", ["ext-base", "terrasoft"], function() {
	return {
		generateCustomLabeledControl: function(config) {
			return {
				id: config.name + "_label",
				className: "Terrasoft.Label",
				caption: "Label for " + config.name
			};
		}
	};
});


