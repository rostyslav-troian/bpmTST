Terrasoft.configuration.Structures["MobileFileServiceProvider"] = {innerHierarchyStack: ["MobileFileServiceProvider"]};
/**
 * @class Terrasoft.FileServiceProvider
 */
Ext.define("Terrasoft.configuration.FileServiceProvider", {
	extend: "Terrasoft.BaseFileLoadProvider",
	alternateClassName: "Terrasoft.FileServiceProvider",

	upload: function(config) {
		Terrasoft.FileService.upload(config);
	},

	download: function(config) {
		Terrasoft.FileService.download(config);
	}

});
if (Terrasoft.Features.getIsEnabled("UseMobileFileService")) {
	Terrasoft.FileLoader.setProvider(Terrasoft.FileServiceProvider);
}


