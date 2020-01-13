Terrasoft.configuration.Structures["FileDownloader"] = {innerHierarchyStack: ["FileDownloader"]};
define("FileDownloader", [], function() {
	/**
	 * @class Terrasoft.configuration.FileDownloader
	 * Manages downloading and creating a file path.
	 */
	Ext.define("Terrasoft.configuration.FileDownloader", {
		alternateClassName: "Terrasoft.FileDownloader",

		statics: {
			/**
			 * Gets download file link.
			 * @protected
			 * @param {String} entitySchemaUid Uid of the entity schema the download file.
			 * @param {String} fileId Id of the need download file.
			 * @return {String} Full download file link url.
			 */
			getFileLink: function(entitySchemaUid, fileId) {
				var urlPattern = "{0}/rest/FileService/GetFile/{1}/{2}";
				var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
				var url = Ext.String.format(urlPattern, workspaceBaseUrl, entitySchemaUid, fileId);
				return url;
			},

			/**
			 * Downloads file from server by file url.
			 * @param {Object} config Config object.
			 * @param {String} config.fileUrl Url of the need download file.
			 * @param {Function} config.success Success callback function.
			 * @param {Uint8Array} config.success.fileContent File content.
			 * @param {Function} config.failure Error callback function.
			 * @param {Object} config.scope Scope of the callback function.
			 */
			downloadFile: function(config) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", config.fileUrl);
				xhr.responseType = "arraybuffer";
				xhr.onload = function() {
					if (this.status === 200) {
						var uint8array = new Uint8Array(this.response);
						Ext.callback(config.success, config.scope, [uint8array]);
						return;
					}
					Ext.callback(config.failure, config.scope, [this.response]);
				};
				xhr.send();
			}
		}
	});
	return {};
});


