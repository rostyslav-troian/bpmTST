Terrasoft.configuration.Structures["MessageConstants"] = {innerHierarchyStack: ["MessageConstants"]};
define("MessageConstants", [], function() {
	var fileDisplayTemplate = "<span>{0}</span>";
	var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
	var urlTemplate = {
		FileUrlTemplate: "<a href='" + workspaceBaseUrl + "/rest/FileService/GetFile/{0}/{1}'>{2}</a>"
	};
	return {
		UrlTemplate: urlTemplate,
		FileDisplayTemplate: fileDisplayTemplate
	};
});


