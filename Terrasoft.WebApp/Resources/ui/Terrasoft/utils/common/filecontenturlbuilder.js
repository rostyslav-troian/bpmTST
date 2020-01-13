/**
 */
Ext.define("Terrasoft.FileContentUrlBuilder", {
	singleton: true,
	getUrl: function(packageName, fileRelativePath) {
		var fileUrl = [
			Terrasoft.workspaceBaseUrl,
			"Terrasoft.Configuration/Pkg",
			packageName,
			"Files",
			fileRelativePath
		].join("/");
		var fileDescriptors = Terrasoft.configuration.FileContentDescriptors || {};
		var fileDescriptor = fileDescriptors[packageName + "/" + fileRelativePath] || {};
		fileUrl += "?hash=" + (fileDescriptor.Hash || Terrasoft.configurationContentHash || "empty");
		return fileUrl;
	},
	prepareUrlForRequireJs: function(url) {
		if (url.endsWith('.js') && url.indexOf('?') === -1) {
			return url + "?hash=empty";
		}
		return url;
	}
});
Terrasoft.getFileContentUrl = Terrasoft.FileContentUrlBuilder.getUrl;
Terrasoft.prepareUrlForRequireJs = Terrasoft.FileContentUrlBuilder.prepareUrlForRequireJs;