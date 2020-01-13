Terrasoft.configuration.Structures["FolderManagerModule"] = {innerHierarchyStack: ["FolderManagerModule"]};
define("FolderManagerModule", ["ext-base", "terrasoft", "sandbox", "BaseFolderManager"],
	function (Ext, Terrasoft, sandbox) {
		var folderManager = Ext.create("Terrasoft.BaseFolderManager", {
			sandbox: sandbox
		});

		return {
			render: folderManager.render.bind(folderManager),
			init: folderManager.init.bind(folderManager)
		};
	});


