Ext.ns("Terrasoft.utils.file");

/**
 * @singleton
 */

/**
 * Upload file using FileAPI.
 */
Terrasoft.utils.file.upload = function (fileApiUploadConfig, callback, scope) {
	fileApiUploadConfig.upload = function () {
		this.showMask();
	}.bind(scope);
	fileApiUploadConfig.complete = callback;
	fileApiUploadConfig.data = { };
	fileApiUploadConfig.prepare = function (file, options) {
		var data = options.data || {};
		Ext.apply(data, {
			totalFileLength: file.size,
			fileName: file.name
		});
	};
	fileApiUploadConfig.headers = {};
	Terrasoft.AjaxProvider.addCsrfTokenToHeaders(fileApiUploadConfig.headers);
	FileAPI.upload(fileApiUploadConfig);
};

/**
 * Alias for {@link Terrasoft.utils.file#upload}
 */
Terrasoft.fileUpload = Terrasoft.utils.file.upload;

