Terrasoft.configuration.Structures["UserManagementModule"] = {innerHierarchyStack: ["UserManagementModule"]};
define("UserManagementModule", ["ext-base", "terrasoft", "sandbox"],
		function(Ext, Terrasoft, sandbox) {

	var render = function(renderTo) {
		switch (Terrasoft.action) {
			case "register":
				sandbox.loadModule("Registration", {
					renderTo: renderTo,
					id: sandbox.id + "-Registration",
					keepAlive: true
				});
				break;
			case "remindPassword":
				sandbox.loadModule("RemindPassword", {
					renderTo: renderTo,
					id: sandbox.id + "-RemindPassword",
					keepAlive: true
				});
				break;
		}
	};

	return {
		render: render,
		renderTo: Ext.getBody()
	};
});


