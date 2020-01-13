Terrasoft.configuration.Structures["ConfigurationFileApi"] = {innerHierarchyStack: ["ConfigurationFileApi"]};
/**
 * @class Terrasoft.configuration.ConfigurationFileApi
 * ##### ConfigurationFileApi ############ ### ######## ###### ## ###### # ######## #### ######### ##### upload.
 * ### ######## ####### ###### ## ###### #### ########### ## ##### ###### ##### ####### ############### ###########
 * ## ######
*/
define("ConfigurationFileApi", ["ext-base", "terrasoft", "ConfigurationFileApiResources", "MaskHelper"],
	function(Ext, Terrasoft, resources) {
		Ext.define("Terrasoft.configuration.ConfigurationFileApi", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.ConfigurationFileApi",
			singleton: true,

			/**
			 * The size of the transferred file in bytes. When loaded, the file is divided into several parts, which
			 * are loaded sequentially.
			 * @type {Number}
			 * @private
			 */
			defaultChunkSize: 0.5 * FileAPI.MB,

			/**
			 * The number of attempts at loading of the file.
			 * @type {Number}
			 * @private
			 */
			defaultChunkUploadRetry: 3,

			/**
			 * #### # ###### web-####### ### ######## #####.
			 * @private
			 */
			defaultWebServicePath: "FileApiService/Upload",

			// jshint unused:false
			/**
			 * ############## ######### ######## #####.
			 * @private
			 * @param {Object} file ####.
			 * @param {Object} options ############ #########.
			 */
			onPrepare: function(file, options) {
				const data = options.data = options.data || {};
				const config = this.uploadConfig;
				Ext.apply(data, {
					totalFileLength: file.size,
					fileId: data.fileId || Terrasoft.generateGUID(),
					mimeType: file.type,
					columnName: config.columnName,
					fileName: file.name,
					parentColumnName: config.parentColumnName,
					parentColumnValue: config.parentColumnValue
				});
				const entitySchemaName = config.entitySchemaName;
				if (entitySchemaName) {
					data.entitySchemaName = entitySchemaName;
				}
			},

			/**
			 * The event handler start downloading files.
			 * @private
			 * @param {Object} xhr Request.
			 * @param {Object} options File download options.
			 */
			onUpload: function(xhr, options) {
				this.processResult("onUpload", arguments);
			},

			/**
			 * ########## ####### ###### ######## #####.
			 * @private
			 * @param {Object} file ####.
			 * @param {Object} xhr ######.
			 * @param {Object} options ######### ######## #####.
			 */
			onFileUpload: function(file, xhr, options) {
				this.processResult("onFileUpload", arguments);
			},

			/**
			 * ########## ####### ######### ######## ######.
			 * @private
			 * @param {Object} event XMLHttpRequestProgressEvent.
			 * @param {Object} file ####.
			 * @param {Object} xhr ######.
			 * @param {Object} options ######### ######## ######.
			 * ########, ######### ########### ########### ########### ######: evt.loaded / evt.total * 100.
			 */
			onProgress: function(event, file, xhr, options) {
				this.processResult("onProgress", arguments);
			},

			/**
			 * ########## ####### ######### ######## #####.
			 * @private
			 * @param {Object} event XMLHttpRequestProgressEvent.
			 * @param {Object} file ####.
			 * @param {Object} xhr ######.
			 * @param {Object} options ######### ######## #####.
			 * ########, ######### ########### ########### ############ #####: evt.loaded / evt.total * 100.
			 */
			onFileProgress: function(event, file, xhr, options) {
				this.processResult("onFileProgress", arguments);
			},

			/**
			 * ########## ####### ########## ######## ######.
			 * @private
			 * @param {Boolean|String} error False, ### ########## ######, ##### ##### ######.
			 * @param {Object} xhr ######.
			 * @param {Object} options ######### ######## ######.
			 */
			onComplete: function(error, xhr, options) {
				this.processResult("onComplete", arguments);
				const uploadConfig = this.uploadConfig;
				const callback = uploadConfig.callback;
				if (callback) {
					callback.call(uploadConfig.scope);
				}
			},

			/**
			 * ########## ####### ########## ######## #####.
			 * @private
			 * @param {Boolean|String} error False, ### ########## ######, ##### ##### ######.
			 * @param {Object} xhr ######.
			 * @param {Object} file ####.
			 * @param {Object} options ######### ######## ######.
			 */
			onFileComplete: function(error, xhr, file, options) {
				this.processResult("onFileComplete", arguments);
			},
			// jshint unused:true

			/**
			 * ############ ####### ######## ######. #### # ########## ######## #### ############### ##########, ##
			 * ##### ######.
			 * @private
			 * @param {String} eventName ######## #######.
			 * @param {Arguments} args ######### #######.
			 */
			processResult: function(eventName, args) {
				const uploadConfig = this.uploadConfig;
				const handler = uploadConfig[eventName];
				if (handler) {
					handler.apply(uploadConfig.scope, args);
				}
			},

			/**
			 * ############## ####### "drag" # "drop" ##########.
			 * @param {Object} dropzone #########.
			 * @param {Function} hoverHandler ########## ####### "dragenter" # "dragleave".
			 * @param {Function} dropHandler ########## ####### "drop".
			 */
			initDropzoneEvents: function(dropzone, hoverHandler, dropHandler) {
				FileAPI.event.dnd(dropzone, hoverHandler, dropHandler);
			},

			/**
			 * ######### ######## ###### ## ######.
			 * @param {Object} config ######### ######## ######.
			 * @param {Object} config.scope ######## ###### #######-############ ####### ########.
			 * @param {Function} config.onUpload ########## ####### ###### ######## ######.
			 * @param {Function} config.onFileUpload ########## ####### ###### ######## #####.
			 * @param {Function} config.onProgress ########## ####### ######### ######## ######.
			 * @param {Function} config.onFileProgress ########## ####### ######### ######## #####.
			 * @param {Function} config.onComplete ########## ####### ########## ######## ######.
			 * @param {Function} config.onFileComplete ########## ####### ########## ######## #####.
			 * @param {String} config.entitySchemaName ######## ######## ########### ######.
			 * @param {String} config.columnName ######## ####### ######.
			 * @param {String} config.parentColumnName ######## ####### ##### # ############ #########.
			 * @param {String} config.parentColumnValue ######## ####### ##### # ############ #########.
			 * @param {Array} config.files #####.
			 * @param {Boolean} config.isChunkedUpload True, #### ########## ######### ######## ## ######.
			 * @param {Function} [callback] (optional) #######, ####### ##### ####### ##### ########## ########.
			 */
			upload: function(config, callback) {
				if (config.file) {
					this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoletePropertyMessage, "file",
						"files"));
					config.files = [config.file];
				}
				if (!callback) {
					callback = Terrasoft.emptyFn;
				}
				config.callback = callback;
				this.uploadConfig = config;
				this.validateFilesSize(config.files, function(files) {
					const servicePath = config.uploadWebServicePath || this.defaultWebServicePath;
					const baseUrl = Terrasoft.getConfigurationWebServiceBaseUrl();
					const url = Terrasoft.combinePath(baseUrl, "rest", servicePath);
					const isChunkedUpload = config.isChunkedUpload;
					const csrfToken = Ext.util.Cookies.get("BPMCSRF");
					const fileApiUploadConfig = {
						url: url,
						data: config.data || {},
						headers: {"BPMCSRF": csrfToken || ""},
						files: {files: files},
						chunkSize: isChunkedUpload ? config.chunkSize || this.defaultChunkSize : 0,
						chunkUploadRetry: isChunkedUpload ? config.chunkUploadRetry || this.defaultChunkUploadRetry : 0,
						prepare: this.onPrepare.bind(this),
						upload: this.onUpload.bind(this),
						fileupload: this.onFileUpload.bind(this),
						progress: this.onProgress.bind(this),
						fileprogress: this.onFileProgress.bind(this),
						complete: this.onComplete.bind(this),
						filecomplete: this.onFileComplete.bind(this)
					};
					FileAPI.upload(fileApiUploadConfig);
				}, this);
			},

			 /**
			 * Validate files to upload size.
			 * @private
			 * @param {Array} files Array of files to validate size.
			 * @param {Function} callback Function will be called after the download is complete.
			 * @param {Object} scope Call context.
			 */
			validateFilesSize: function(files, callback, scope) {
				 const sysSettingName = "MaxFileSize";
				 Terrasoft.SysSettings.querySysSettingsItem(sysSettingName, function(value) {
					if(value) {
						const maxSizeInBytes = value * 1024 * 1024;
						const filesOversize = this.getIncorrectFiles(files, maxSizeInBytes);
						if (filesOversize.length > 0) {
							const oversizeErrorHandler = this.uploadConfig.oversizeErrorHandler;
							if (oversizeErrorHandler && Ext.isFunction(oversizeErrorHandler)) {
								oversizeErrorHandler.call(this.uploadConfig.scope || this, value, filesOversize);
							} else {
								this.defaultOversizeErrorHandler(value, filesOversize);
							}
						}
					}
					Ext.callback(callback, scope || this, [files]);
				}, this);
			},

			/**
			 * Remove oversize files from upload files and return oversize files.
			 * @private
			 * @param {Array} files Array of files to validate size.
			 * @param {Number} size Maximum upload file size in Mb from SysSetting.
			 * @return {Array} Array of not valid files.
			 */
			getIncorrectFiles: function(files, maxSizeInBytes) {
				const filesOversize = [];
				const length = files.length;
				for (let i = length - 1; i >= 0; i--) {
					if (files[i].size > maxSizeInBytes) {
						filesOversize.push(files[i]);
						files.splice(i, 1);
					}
				}
				return filesOversize;
			},

			/**
			 * Error handler of uploading oversize files.
			 * @private
			 * @param {Number} size Maximum upload file size in Mb from SysSetting.
			 * @param {Array} excludedFiles Array of files that wasn't uploaded.
			 */
			defaultOversizeErrorHandler: function(maxFileSize, excludedFiles) {
				Terrasoft.utils.showInformation(
					Ext.String.format(resources.localizableStrings.OversizedFilesErrorMessage,
						maxFileSize,
						this.generateDefaultErrorMessage(excludedFiles)
					)
				);
			},

			/**
			 * Create string with name of not valid files.
			 * @private
			 * @param {Array} Array of not valid files.
			 * @return {string} String with not valid file names.
			 */
			generateDefaultErrorMessage: function(excludedFiles) {
				let errorMessage = "";
				const length = excludedFiles.length;
				for (let i = 0; i < length; i++) {
					errorMessage += (errorMessage === "") ? excludedFiles[i].name
						: (", " + excludedFiles[i].name);
				}

				return errorMessage;
			},

			/**
			 * ######### ######## ########### # ###### Blob.
			 * @param {Object} url ##### ########### ####### ##### #########.
			 * @param {Function} callback #######, ####### ##### ######## ########### # Blob #######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			getImageFile: function(url, callback, scope) {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", url);
				xhr.responseType = "blob";
				xhr.onload = function() {
					const blob = xhr.response;
					const newDate = new Date();
					Ext.apply(blob, {
						lastModified: newDate.valueOf(),
						lastModifiedDate: newDate.toString(),
						name: Terrasoft.generateGUID().toString(),
						webkitRelativePath: ""
					});
					callback.call(scope, blob);
				};
				xhr.send();
			}
		});
	});


