Terrasoft.configuration.Structures["EmailImageMixin"] = {innerHierarchyStack: ["EmailImageMixin"]};
define("EmailImageMixin", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.EmailImageMixin
		 * Email image mixin.
		 */
		Ext.define("Terrasoft.configuration.mixins.EmailImageMixin", {
			alternateClassName: "Terrasoft.EmailImageMixin",

			/**
			 * Image type pattern.
			 */
			//jscs:disable
			/*jshint maxlen:400 */
			imageRegexPattern: /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,
			/*jshint maxlen:120 */
			//jscs:enable

			//region Methods: Protected

			/**
			 * After image inserted handler.
			 * @protected
			 */
			afterImageInserted: Terrasoft.emptyFn,

			/**
			 * Returns sign if only RTF text pasted to editor.
			 * @protected
			 * @param {Object[]} clipboardDataTypes Clipboard data types.
			 * @return Sign that only RTF text pasted to editor.
			 */
			isPasteExcelCell: function(clipboardDataTypes) {
				const checkMethodName = this._getClipboardTypeCheckMethodName(clipboardDataTypes);
				return clipboardDataTypes.length === 4
					&& this._checkClipboardType(clipboardDataTypes, checkMethodName, "text/plain")
					&& this._checkClipboardType(clipboardDataTypes, checkMethodName, "text/html")
					&& this._checkClipboardType(clipboardDataTypes, checkMethodName, "text/rtf")
					&& this._checkClipboardType(clipboardDataTypes, checkMethodName, "Files");
			},

			/**
			 * Check clipboard data type.
			 * @private
			 * @param {Object[]} clipboardDataTypes Clipboard data types.
			 * @param {String} methodName Check data type method name.
			 * @param {String} type Checked data type.
			 * @return {Boolean} True, if type exist in clipboardDataTypes array.
			 */
			_checkClipboardType: function(clipboardDataTypes, methodName, type) {
				if (Terrasoft.isEmpty(methodName)) {
					return false;
				}
				const checkMethod = clipboardDataTypes[methodName];
				return checkMethod.call(clipboardDataTypes,type);
			},

			/**
			 * Gets check data type method name.
			 * @private
			 * @param {Object[]} clipboardDataTypes Clipboard data types.
			 * @return {String} Check data type method name.
			 */
			_getClipboardTypeCheckMethodName: function(clipboardDataTypes) {
				const containsMethod = clipboardDataTypes.includes || clipboardDataTypes.contains;
				return typeof containsMethod  == 'function' ? containsMethod.name : Terrasoft.emptyString;
			},

			/**
			 * Returns new FileReader instance.
			 * @protected
			 * @virtual
			 * @return {FileReader} FileReader instance.
			 */
			getFileReader: function() {
				return new FileReader();
			},

			/**
			 * Checks current model state before images will be inserted.
			 * @protected
			 * @virtual
			 * @param {Object[]} args Arguments.
			 * @param {Function} callback Callback function.
			 */
			validateBeforeInsert: function(args, callback) {
				this.Ext.callback(callback, this, [args]);
			},

			/**
			 * Uploades single file, selected in ckeditor.
			 * @protected
			 * @param {Object} file File to upload.
			 */
			uploadSingleFile: function(file) {
				var newItemId = Terrasoft.generateGUID();
				var callback = function() {
					var imagesCollection = this.get("Images");
					if (Ext.isEmpty(imagesCollection)) {
						return;
					}
					var fileId = newItemId;
					var entityFileSchemaUId = this.getFileSchemaUId();
					var image = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							fileName: file.name,
							url: Ext.String.format(this.get("ImageUrlTpl"), entityFileSchemaUId, fileId)
						}
					});
					imagesCollection.add(imagesCollection.getUniqueKey(), image);
				}.bind(this);
				var config = {
						scope: this,
						onComplete: callback,
						entitySchemaName: this.getFileEntitySchemaName(),
						columnName: "Data",
						parentColumnName: this.getFileEntityMasterColumnName(),
						parentColumnValue: this.get("Id"),
						files: [file],
						isChunkedUpload: true,
						data: {
							fileId: newItemId
						}
					};
				this.uploadFileToBPM(config);
			},

			/**
			 * Calls {@link Terrasoft.core.FileHelper#uploadFile} method.
			 * @protected
			 * @param {Object} data File parameters.
			 */
			uploadFileToBPM: function(data) {
				this.Terrasoft.ConfigurationFileApi.upload(data);
			},

			//endregion

			//region Methods: Public

			/**
			 * Sets image entity resource url template.
			 */
			initImageUrlTpl: function() {
				this.set("ImageUrlTpl", "../rest/FileService/GetFile/{0}/{1}");
			},

			/**
			 * Image loaded event handler. Pasts to email body loaded image.
			 * @param {Object} fileNames Inserted files names.
			 */
			onImageLoaded: function(fileNames) {
				var args = [fileNames, this];
				this.validateBeforeInsert(args, this.insertImages);
			},

			/**
			 * Saves images in db.
			 * @param {Object[]} args Arguments.
			 * @param {Object[]} args[0] Files to upload.
			 * @param {Object} args[1] Upload function execution scope.
			 */
			insertImages: function(args) {
				var rawFiles = args[0];
				var files = [];
				this.Terrasoft.each(Ext.Object.getKeys(rawFiles), function(key) {
					files.push(rawFiles[key]);
				});
				var scope = args[1];
				this.Terrasoft.each(files, this.uploadSingleFile, scope);
			},

			/**
			 * Image pasted event handler.
			 * @param {Object[]} args Arguments.
			 */
			insertImageFromBuffer: function(args) {
				var file = args[0];
				var entityId = args[1];
				var entityName = this.getFileEntitySchemaName();
				var entityColumnName = this.getFileEntityMasterColumnName();
				var callback = args[2];
				var scope = args[3];
				var reader = this.getFileReader();
				reader.onload = function(evt) {
					var fileTypeParts = file.type.split("/");
					var imageExtension = (fileTypeParts.length > 1) ? fileTypeParts[1] : fileTypeParts[0];
					var name = "Image." + imageExtension;
					var data = evt.target.result.split(",")[1];
					var parameters = {
						name: name,
						data: data,
						entityId: entityId,
						entityName: entityName,
						entityColumnName: entityColumnName,
						typeId: ConfigurationConstants.FileType.File,
						size: file.size,
						version: 1
					};
					var requestConfig = {
						serviceName: "ActivityUtilService",
						methodName: "CreateFileEntity",
						data: {jsonEntityFile: parameters}
					};
					scope.callService(requestConfig, function(result) {
						var id = result.CreateFileEntityResult;
						var entityFileSchemaUId = scope.getFileSchemaUId();
						var image = scope.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								fileName: name,
								url: Ext.String.format(scope.get("ImageUrlTpl"), entityFileSchemaUId, id)
							}
						});
						var imagesCollection = scope.get("Images");
						if (imagesCollection) {
							imagesCollection.add(imagesCollection.getUniqueKey(), image);
						}
						if (callback) {
							callback();
						}
					}, this);
				};
				reader.readAsDataURL(file);
			},

			/**
			 * Returns file entity name.
			 * @virtual
			 * @return {String} File entity name.
			 */
			getFileEntitySchemaName: function() {
				return "ActivityFile";
			},

			/**
			 * Returns master record relation column name for file entity.
			 * @virtual
			 */
			getFileEntityMasterColumnName: function() {
				return "Activity";
			},

			/**
			 * Returns file entity UId.
			 * @virtual
			 * @return {Guid} File entity UId.
			 */
			getFileSchemaUId: function() {
				return ConfigurationConstants.SysSchema.ActivityFile;
			},

			/**
			 * Event handler for MemoEdit "paste" event.
			 * @param {Object} Control event.
			 */
			onPaste: function(event) {
				var editor = event.listenerData && event.listenerData.editor;
				var $event = event.data.$;
				var clipboardData = $event.clipboardData;
				var imageType = /^image/;
				if (!clipboardData) {
					return;
				}
				var types = clipboardData.types;
				if (this.isPasteExcelCell(types)) {
					return;
				}
				if (types.length === 2 && types[0] === "text/html" && types[1] === "Files") {
					$event.preventDefault();
					event.stop();
				}
				Terrasoft.each(types, function(type, i) {
					var item = clipboardData.items[i];
					if (!item) {
						return true;
					}
					if (type.match(imageType) || item.type.match(imageType)) {
						this.fireEvent("imagePasted", item, editor);
						return false;
					}
				}, this);
			},

			/**
			 * Handles event "dataLoaded" image collection.
			 * @param {Terrasoft.Collection} collection Image list.
			 */
			onImagesLoaded: function(collection) {
				this.images = collection;
				if (this.images === null) {
					return;
				}
				this.images.eachKey(function(key, item, index) {
					this.onAddImage(item, index, key, true);
				}, this);
			},

			/**
			 * Handles event "add" image collection.
			 * @param {Terrasoft.BaseViewModel} Image.
			 */
			onAddImage: function(item) {
				if (this.editor && this.editor.document) {
					var imageElement = this.editor.document.createElement("img");
					imageElement.setAttribute("alt", item.get("fileName"));
					imageElement.setAttribute("src", item.get("url"));
					this.editor.insertElement(imageElement);
					this.afterImageInserted();
				}
			},

			/**
			 * Image pasted event handler. Inserts image from buffer to rich text edit body.
			 * @param {Object} item Pasted from buffer file config object.
			 */
			onImagePasted: function(item) {
				var file = null;
				if (item && typeof item.getAsFile === "function") {
					file = item.getAsFile();
				}
				var args = [file, this.get("Id"), Terrasoft.emptyFn, this];
				this.validateBeforeInsert(args, this.insertImageFromBuffer);
			}

			//endregion

		});
	});


