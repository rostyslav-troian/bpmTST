/**
 * The ImageApi class is intended for uploading images to the server and contains one public method - {@link #upload}.
 * When you load a large image, the file is divided into smaller parts (see {@link #defaultChunkSize}), which
 * are sequentially loaded to the server. The size of the download part by default is 524288 bytes,
 * but it can be additionally specified in the parameters of the method {@link #upload}.
 *
 * Use cases:
 *
 *  var imageId = Terrasoft.ImageApi.upload({
 *   file: selectedFile,
 *   chunkSize: 1000,
 *   scope: this,
 *   onProgress: function() {},
 *   onComplete: function() {},
 *   onError: function() {},
 *  });
 */
Ext.define("Terrasoft.core.ImageApi", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ImageApi",
	singleton: true,

	/**
	 * The size of the transmitted part of the file in bytes. When loading a large image, the file is divided into several
	 * parts that are loaded sequentially.
	 * @type {Number}
	 * @private
	 */
	defaultChunkSize: 524288,

	/**
	 * The path to the web service method to load an image.
	 * @private
	 * @property {String} uploadWebServicePath
	 */
	uploadWebServicePath: "ImageAPIService/upload",

	/**
	 * Path to upload image service from url.
	 * @private
	 * @property {String} uploadFromUrlWebServicePath
	 */
	uploadFromUrlWebServicePath: "ImageAPIService/uploadFromUrl",

	/**
	 * Path to upload image service from blob.
	 * @private
	 * @property {String} uploadUsingDataUrlWebServicePath
	 */
	uploadUsingDataUrlWebServicePath: "ImageAPIService/uploadUsingDataUrl",

	/**
	 * The object stores an array of metaData about the images being uploaded. The data is deleted once the download is complete.
	 * @private
	 * @property {Object} loadImageData
	 */
	loadImageData: {},

	/**
	 * Uploads the image file to the server.
	 * @throws {Terrasoft.NullOrEmptyException}
	 * If an image file is not specified, an exception is thrown.
	 * @param {Object} config The configuration parameter for image loading:
	 * @param {File} config.file The image file to upload.
	 * @param {Number} config.chunkSize The size of the part of the file in bytes (see {@link #defaultChunkSize}).
	 * @param {Function} config.onProgress The load progress handler.
	 * @param {Object} config.onProgress.imageId The identifier of the uploaded image.
	 * @param {Object} config.onProgress.e The boot progress event parameter:
	 * @param {Number} config.onProgress.e.loaded The loaded number of bytes of the file.
	 * @param {Number} config.onProgress.e.total The size of the file in bytes.
	 * @param {Function} config.onComplete The load completion handler.
	 * @param {Object} config.onComplete.imageId The identifier of the uploaded image.
	 * @param {Object} config.onComplete.response Server response.
	 * @param {Function} config.onError The load error handler.
	 * @param {Object} config.onError.imageId The identifier of the image to be uploaded.
	 * @param {Boolean|String} config.onError.error The error flag. If an error occurred during the download,
	 * the error text will be written in the parameter.
	 * @param {Object} config.onError.xhr The wrapper object over the server's XHR response.
	 * @param {Object} config.scope The execution context for the image file load handlers.
	 * @return {String} The image identifier (Guid).
	 */
	upload: function(config) {
		if (!config || !config.file) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.ImageApi.ImageFileNullOrEmptyMessage
			});
		}
		var imageData = this.createImageData(config);
		var file = imageData.file;
		var imageId = imageData.imageId;
		var uploadUrl = [Terrasoft.workspaceBaseUrl, this.uploadWebServicePath].join("/");
		FileAPI.upload({
			url: uploadUrl,
			data: imageData.data,
			files: {
				file: file
			},
			headers: {"BPMCSRF": Ext.util.Cookies.get("BPMCSRF") || ""},
			chunkSize: imageData.chunkSize,
			progress: this.onLoadProgress.bind(this, imageId),
			complete: this.onLoadComplete.bind(this, imageId)
		});
		return imageId;
	},

	/**
	 * Uploads image from url.
	 * @param {Object} config
	 * @param {Function} config.onComplete Complete event handler.
	 * @param {String} config.dataUrl Image data url.
	 */
	uploadFromUrl: function(config) {
		if (!config || !config.dataUrl) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.ImageApi.ImageFileNullOrEmptyMessage
			});
		}
		var imageData = this.createImageData(config);
		var imageId = imageData.imageId;
		var requestUrl = Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, this.uploadFromUrlWebServicePath);
		Terrasoft.AjaxProvider.request({
			url: requestUrl,
			scope: this,
			jsonData: {
				imageId: imageId,
				dataUrl: config.dataUrl
			},
			callback: this.onLoadFromServiceComplete.bind(this, imageId)
		});
	},

	/**
	 * Uploads image using its data url (see https://tools.ietf.org/html/rfc2397).
	 * @param {Object} config
	 * @param {String} config.fileName Image file name.
	 * @param {String} config.dataUrl Image dataUrl.
	 * @param {Function} config.onComplete Complete event handler.
	 */
	uploadUsingDataUrl: function(config) {
		if (!config || !config.dataUrl) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "dataUrl"
			});
		}
		var imageData = this.createImageData(config);
		var imageId = imageData.imageId;
		var requestUrl = Terrasoft.combinePath(Terrasoft.workspaceBaseUrl, this.uploadUsingDataUrlWebServicePath);
		Terrasoft.AjaxProvider.request({
			url: requestUrl,
			scope: this,
			jsonData: {
				imageId: imageId,
				fileName: config.fileName,
				dataUrl: config.dataUrl
			},
			callback: this.onLoadFromServiceComplete.bind(this, imageId)
		});
	},

	/**
	 * Uploads image from DOM. Image should be downloaded from the current domain or support cross origin policy.
	 * @param {Object} config
	 * @param {HTMLElement} config.image Image html element.
	 * @param {Number} [config.width] Image width. If not set html element's width will be used.
	 * @param {Number} [config.height] Image height. If not set html element's height will be used.
	 * @param {Function} config.onComplete Complete event handler.
	 */
	uploadFromDom: function(config) {
		if (!config || !config.image) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "image"
			});
		}
		var image = config.image;
		var canvas = document.createElement("canvas");
		canvas.width = config.width || image.width;
		canvas.height = config.height || image.height;
		var context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		var dataUrl = canvas.toDataURL("image/png");
		this.uploadUsingDataUrl(Ext.apply({
				fileName: image.src,
				dataUrl: dataUrl
			},
			config
		));
	},

	/**
	 * Creates a metaData object about the image being uploaded and stores it in the {@link #loadImageData} object.
	 * Creates an image identifier and adds it to the metadata along with the image size in bytes
	 * and MIME-type.
	 * @param {Object} config The configuration parameter of the uploaded image (see the {@link #upload} method).
	 * @return {Object} The metadata object of the uploaded image.
	 * @private
	 */
	createImageData: function(config) {
		var imageId = Terrasoft.generateGUID();
		var file = config.file || {};
		var imageData = Ext.apply({
				chunkSize: this.defaultChunkSize
			}, {
				imageId: imageId,
				scope: config.scope || this,
				data: {
					totalFileLength: file.size,
					fileId: imageId,
					mimeType: file.type
				}
			},
			config
		);
		this.loadImageData[imageId] = imageData;
		return imageData;
	},

	/**
	 * The load progress event handler. If an upload progress handler is defined in the image metaData,
	 * it will be called.
	 * @param {String} imageId Image Id.
	 * @param {Object} e The parameter of the boot progress event.
	 * @param {Number} e.loaded The downloaded number of bytes of the file.
	 * @param {Number} e.total The size of the file in bytes.
	 * @private
	 */
	onLoadProgress: function(imageId, e) {
		var imageData = this.loadImageData[imageId];
		var onProgressHandler = imageData.onProgress;
		if (onProgressHandler) {
			onProgressHandler.call(imageData.scope, imageId, e);
		}
	},

	/**
	 * On load from url complete event handler.
	 * @private
	 * @param {String} imageId Image identifier.
	 * @param {Object} request Instance of the request.
	 * @param {Boolean} success Service call executed successfully.
	 * @param {Object} response Server response.
	 */
	onLoadFromServiceComplete: function(imageId, request, success, response) {
		var error = success ? null : response;
		this.onLoadComplete(imageId, error, {response: response});
	},

	/**
	 * The load completion event handler. If an error occurred during loading, the handler specified in
	 * the metaData object of the uploaded image is called. If there were no errors, the load completion handler is called.
	 * @param {String} imageId Image Id.
	 * @param {Boolean|String} error Error flag. If an error occurs during the download, the
	 * parameter will contain its text.
	 * @param {Object} xhr A wrapper object over the server's XHR response.
	 * @private
	 */
	onLoadComplete: function(imageId, error, xhr) {
		if (xhr.response) {
			var response = Terrasoft.decode(xhr.response);
			if (response.error) {
				console.warn(response.error);
			}
			error = error || !!response.error;
		}
		var imageData = this.loadImageData[imageId];
		if (error) {
			var onErrorHandler = imageData.onError;
			if (onErrorHandler) {
				onErrorHandler.call(imageData.scope, imageId, error, xhr);
			}
		} else {
			var onCompleteHandler = imageData.onComplete;
			if (onCompleteHandler) {
				onCompleteHandler.call(imageData.scope, imageId, Terrasoft.decode(xhr.response));
			}
		}
		delete this.loadImageData[imageId];
	}

});
