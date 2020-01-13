coreModules = window.coreModules || {};
coreModules.ApplicationInstallViewModel = {
	"path": "Terrasoft/configuration/applicationinstall",
	"deps": ["base-view-model", "ext-base", "sysenums", "messagebox", "base-core-request", "commonutils", "domutils",
		"ApplicationInstallRequest"]
};
coreModules.ApplicationInstallViewGenerator = {
	"path": "Terrasoft/configuration/applicationinstall",
	"deps": ["baseobject", "button", "imageurlbuilder", "container", "label", "hyperlink"]
};
coreModules.ApplicationInstallRequest = {
	"path": "Terrasoft/configuration/applicationinstall",
	"deps": ["base-core-request"]
};