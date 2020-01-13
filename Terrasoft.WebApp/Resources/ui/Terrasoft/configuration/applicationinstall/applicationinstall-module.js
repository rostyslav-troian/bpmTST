define(["ext-base", "base-module", "ApplicationInstallRequest", "ApplicationInstallViewGenerator", "ApplicationInstallViewModel"],
	function(Ext) {
		return Ext.create("Terrasoft.BaseModule", {
			viewGeneratorClassName: "Terrasoft.ApplicationInstallViewGenerator",
			viewModelClassName: "Terrasoft.ApplicationInstallViewModel"
		});
	}
);