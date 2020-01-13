Terrasoft.configuration.Structures["EmailContentBuilder"] = {innerHierarchyStack: ["EmailContentBuilder"], structureParent: "ContentBuilder"};
define('EmailContentBuilderStructure', ['EmailContentBuilderResources'], function(resources) {return {schemaUId:'ab75212f-7de6-4f93-a268-429bfab61422',schemaCaption: "EmailContentBuilder", parentSchemaName: "ContentBuilder", schemaName:'EmailContentBuilder',parentSchemaUId:'ac58e9b9-1a9b-43d2-afae-16317c8c0adb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: ContentBuilder
 */
define("EmailContentBuilder", ["ContentBuilderHelper", "ContentBuilderEnumsModule",
		"ConfigurationConstants", "FileHelper", "css!ContentBuilderCSS"],
	function(ContentBuilderHelper, ContentBuilderEnumsModule, ConfigurationConstants, FileHelper) {
	return {
		attributes: {
			/**
			 * The unique identifier of the edited record.
			 */
			RecordId: {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Content builder parameters.
			 */
			ContentBuilderConfig: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Content builder mode.
			 */
			ContentBuilderMode: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},

			/**
			 * Name of email tmplate.
			 * @type {String}
			 */
			"TemplateName": {
				dataValueType: Terrasoft.core.enums.DataValueType.TEXT,
				type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			}
		},
		properties: {
			/**
			 * List of element class names to ignore on preview image generation.
			 * @type {Array}
			 */
			classesToIgnoreOnPreviewImage: [
				"content-block-tools-wrap",
				"content-element-tools-wrap",
				"placeholder-image",
				"content-mjhero-placeholder",
				"content-column-placeholder-wrap"
			]
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_isImageEmbedded: function(imageSrc) {
				return imageSrc && imageSrc.startsWith("data:");
			},

			/**
			 * @private
			 */
			_getImagePath: function(fileId) {
				return Ext.String.format("../rest/FileService/GetFile/{0}/{1}",
					ConfigurationConstants.SysSchema.EmailTemplateFile, fileId);
			},

			/**
			 * @private
			 */
			_baseSaveImageResponse: function(imagePropertyName, config, images, next, response) {
				if (response.imageUrl) {
					config[imagePropertyName] = response.imageUrl;
				} else {
					const imagePath = this._getImagePath(response.id);
					this._saveImagePath(images, config[imagePropertyName],
						imagePath);
					config[imagePropertyName] = imagePath;
				}
				next();
			},

			/**
			 * @private
			 */
			_saveBackgroundImageResponse: function(item, images, next, response) {
				let imagePath;
				if (response.imageUrl) {
					imagePath = response.imageUrl;
				} else {
					const backgroundImageStyle = item.Styles["background-image"];
					imagePath = this._getImagePath(response.id);
					const url = backgroundImageStyle.substring(4, backgroundImageStyle.length - 1);
					this._saveImagePath(images, url, imagePath);
				}
				item.Styles["background-image"] = Ext.String.format("url({0})", imagePath);
				next();
			},

			/**
			 * @private
			 */
			_saveMobileBackgroundImageResponse: function(item, images, next, response) {
				if (response.imageUrl) {
					item.BackgroundImage.mobile = response.imageUrl;
				} else {
					const imagePath = this._getImagePath(response.id);
					this._saveImagePath(images, item.BackgroundImage.mobile, imagePath);
					item.BackgroundImage.mobile = imagePath;
				}
				next();
			},

			/**
			 * @private
			 */
			_baseImageHandler: function(config, saveCallback, next) {
				const name = config.name || Terrasoft.generateGUID() + ".png";
				const url = config.url;
				const imageConfig = config.imageConfig;
				const imagePath = this._findImagePath(config.images, url);
				if (imagePath) {
					saveCallback.call(this, imageConfig, next, {
						imageUrl: imagePath
					});
				} else {
					const file = Terrasoft.getImageFile(url, name);
					this.saveImage(file, saveCallback.bind(this, imageConfig, next));
				}
			},

			/**
			 * @private
			 */
			_findImagePath: function(images, base64) {
				return images[base64];
			},

			/**
			 * @private
			 */
			_saveImagePath: function(images, base64, imagePath) {
				const image = {};
				image[base64] = imagePath;
				Ext.apply(images, image);
			},

			/**
			 * @private
			 */
			_addBackgroundImageActions: function(item, asyncActions, images) {
				const backgroundImageConfig = item.BackgroundImage;
				if (backgroundImageConfig) {
					const backgroundImageStyle = item.Styles["background-image"];
					if (backgroundImageStyle) {
						const backgroundImage = backgroundImageStyle.substring(4, backgroundImageStyle.length - 1);
						if (backgroundImage && this._isImageEmbedded(backgroundImage)) {
							asyncActions.push(this._baseImageHandler.bind(this, {
								name: backgroundImageConfig.name,
								url: backgroundImage,
								imageConfig: backgroundImageConfig,
								images: images
							}, function(itemConfig, next, response) {
								this._saveBackgroundImageResponse(item, images, next, response);
							}));
						}
					}
					if (backgroundImageConfig.mobile && this._isImageEmbedded(backgroundImageConfig.mobile)) {
						asyncActions.push(this._baseImageHandler.bind(this, {
							name: backgroundImageConfig.mobileName,
							url: backgroundImageConfig.mobile,
							imageConfig: backgroundImageConfig,
							images: images
						}, function(itemConfig, next, response) {
							this._saveMobileBackgroundImageResponse(item, images, next, response);
						}));
					}
				}
			},

			/**
			 * @private
			 */
			_addActionForItem: function(item, asyncActions, images) {
				this._addBackgroundImageActions(item, asyncActions, images);
				if (Ext.Array.contains(["image", "mjimage", "button", "mjbutton"], item.ItemType)) {
					const imageConfig = item.ImageConfig;
					const imagePropertyName = "imageSrc";
					if (imageConfig && this._isImageEmbedded(imageConfig.url)) {
						asyncActions.push(this._baseImageHandler.bind(this, {
							name: imageConfig.name,
							url: imageConfig.url,
							imageConfig: item,
							images: images
						}, function(config, next, response)  {
							this._baseSaveImageResponse(imagePropertyName, config.ImageConfig, images, next, response);
						}));
					}
					const mobileImageConfig = item.MobileImageConfig;
					if (mobileImageConfig && this._isImageEmbedded(mobileImageConfig.url)) {
						asyncActions.push(this._baseImageHandler.bind(this, {
							name: mobileImageConfig.name,
							url: mobileImageConfig.url,
							imageConfig: mobileImageConfig,
							images: images
						}, function(itemConfig, next, response) {
							this._baseSaveImageResponse(imagePropertyName, itemConfig, images, next, response);
						}));
					}
				} else {
					const handlers = this.getHandlersForAllImages(item ,images);
					asyncActions.push.apply(asyncActions, handlers);
				}
			},

			/**
			 * @private
			 */
			_isElementToIgnore: function(element) {
				var result = false;
				Terrasoft.each(this.classesToIgnoreOnPreviewImage, function(className) {
					result = element.classList.contains(className);
					return !result;
				}, this);
				return result;
			},

			// endregion

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#init
			 * @override
			 */
			init: function() {
				this.initParameters();
				this.callParent(arguments);
			},

			/**
			 * Returns entity schema query for content sheet.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query for content sheet.
			 */
			getContentSheetESQ: function() {
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: contentBuilderConfig.EntitySchemaName
				});
				esq.addColumn(contentBuilderConfig.TemplateConfigColumnName);
				esq.addColumn(contentBuilderConfig.TemplateBodyColumnName);
				if (!Ext.isEmpty(contentBuilderConfig.ObjectColumnName)) {
					esq.addColumn(contentBuilderConfig.ObjectColumnName, "ObjectName");
				}
				if (!Ext.isEmpty(contentBuilderConfig.TemplateName)) {
					esq.addColumn(contentBuilderConfig.TemplateName);
				}
				return esq;
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#getContentSheetConfig
			 * @override
			 */
			getContentSheetConfig: function(callback, scope) {
				var recordId = this.get("RecordId");
				if (Ext.isEmpty(recordId)) {
					Ext.callback(callback, scope || this);
					return;
				}
				var esq = this.getContentSheetESQ();
				esq.getEntity(recordId, function(result) {
					if (result.success) {
						this.setContentSheetConfig(result.entity, callback, scope);
					}
				}, this);
			},

			/**
			 * Sets configuration of the content sheet.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} entity entity-object.
			 * @param {Object} callback callback-function.
			 * @param {Object} scope context of the callback-function.
			 */
			setContentSheetConfig: function(entity, callback, scope) {
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var configJson = entity.get(contentBuilderConfig.TemplateConfigColumnName);
				var html = entity.get(contentBuilderConfig.TemplateBodyColumnName);
				var config = this.prepareConfig(configJson, html);
				var macrosEntity = entity.get("ObjectName");
				this.setMacrosEntity(macrosEntity);
				var templateName = entity.get("Name");
				this.set("TemplateName", templateName);
				Ext.callback(callback, scope || this, [config]);
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#getEditConfig
			 * @override
			 */
			getEditConfig: function() {
				var config = this.callParent(arguments);
				return Ext.apply(config, {
					TemplateName: this.$TemplateName
				});
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#save
			 * @override
			 */
			save: function() {
				var config = this.getContentBuilderConfig();
				if (Ext.isEmpty(config.Items)) {
					var emptyTemplateMessage = this.get("Resources.Strings.EmptyTemplateMessage");
					Terrasoft.utils.showInformation(emptyTemplateMessage);
					return;
				}
				Terrasoft.showMessage({
					caption: this.get("Resources.Strings.SaveMessage"),
					buttons: ["yes", "no"],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					scope: this,
					handler: function(buttonCode) {
						if (buttonCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							this.onSave();
						}
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#cancel
			 * @override
			 */
			cancel: function() {
				Terrasoft.showMessage({
					caption: this.get("Resources.Strings.ExitMessage"),
					buttons: [Terrasoft.MessageBoxButtons.YES, Terrasoft.MessageBoxButtons.NO],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					handler: function(buttonCode) {
						if (buttonCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							window.close();
						}
					}
				});
			},

			/**
			 * Returns configuration of the content item for html-markup.
			 * @param {String} html Html-markup.
			 * @return {Object} configuration of the content item.
			 * @protected
			 */
			getHtmlBlockConfig: function(html) {
				var item = {
					"ItemType": "html",
					"Column": 0,
					"Row": 0,
					"ColSpan": 24,
					"RowSpan": 0,
					"Content": html
				};
				var block = {
					"ItemType": "block",
					"Items": [item]
				};
				return block;
			},

			/**
			 * Update the template parameters of the html-layout in the database.
			 * @protected
			 */
			onSave: function() {
				this.showBodyMask();
				this.prepareContentBuilderConfig(function(config) {
					Terrasoft.chain(
						function(next) {
							this.trySavePreviewImage(next, this);
						},
						function(next, imageId) {
							var update = this.getSaveQuery(config, imageId);
							update.execute(this.onUpdateResponse, this);
						},
						this
					);
				}, this);
			},

			/**
			 * Returns selector for template body DOM element.
			 * @protected
			 * @returns {String} Template body DOM element id selector.
			 */
			getEmailTemplateBodyIdSelector: function() {
				var viewModelName = this.$ContentBuilderConfig.ViewModelName;
				var containerName = "SheetContainer";
				return Ext.String.format("{0}{1}Container-content-sheet-items", viewModelName, containerName);
			},

			/**
			 * Returns email template body DOM element.
			 * @protected
			 * @returns {Object} Template body DOM element.
			 */
			getTemplateBodyElement: function() {
				var templateBodySelector = this.getEmailTemplateBodyIdSelector();
				return Ext.get(templateBodySelector);
			},

			/**
			 * Handler for preview image canvas ready event.
			 * @protected
			 * @param {Object} canvas Preview image canvas.
			 * @param {Function} callback Callback function to call.
			 * @param {Object} scope Context.
			 */
			onPreviewImageCanvasReady: function(canvas, callback, scope) {
				var image = canvas.toDataURL();
				if (image) {
					Terrasoft.ImageApi.uploadUsingDataUrl({
						fileName: "EmailTemplate" + this.$RecordId + ".png",
						dataUrl: image,
						onComplete: function(imageId) {
							callback.call(scope, imageId);
						},
						scope: this
					});
				}
			},

			/**
			 * Processes save preview image actions.
			 * @protected
			 * @param {Object} domElement DOM element that converts to image.
			 * @param {Function} callback Callback function to call.
			 * @param {Object} scope Context.
			 */
			savePreviewImage: function(domElement, callback, scope) {
				Terrasoft.convertElementToCanvas(domElement.id, {
					scale: 0.75,
					allowTaint: true,
					useCORS: true,
					ignoreElements: this._isElementToIgnore.bind(scope)
				},
				function(canvas) {
					this.onPreviewImageCanvasReady(canvas, callback, scope);
				},
				this);
			},

			/**
			 * Checks save preview conditions and processes save preview actions.
			 * @protected
			 * @param {Function} callback Callback function to call.
			 * @param {Object} scope Context.
			 */
			trySavePreviewImage: function(callback, scope) {
				if (!Ext.isIE && this.$ContentBuilderConfig.ImageIdColumn) {
					var templateBody = this.getTemplateBodyElement();
					if (templateBody) {
						return this.savePreviewImage(templateBody, callback, scope);
					}
				}
				callback.call(scope);
			},

			/**
			 * Applies preview image id parameter to update query.
			 * @protected
			 * @param {String} imageId Unique identifier of preview image.
			 * @param {Terrasoft.EntitySchemaQuery} query Update query to save email template data.
			 */
			addImageIdParameter: function(imageId, query) {
				var imageColumnName = this.$ContentBuilderConfig.ImageIdColumn;
				if (imageId && imageColumnName) {
					query.setParameterValue(imageColumnName, imageId, Terrasoft.DataValueType.GUID);
				}
			},

			/**
			 * Changes url for images in config of content builder.
			 * @protected
			 * @param {Function} callback Function which should be called after all images was handled.
			 * @param {Object} scope Context for callback.
			 */
			prepareContentBuilderConfig: function(callback, scope) {
				var config = this.getContentBuilderConfig();
				const images = {};
				var asyncActions = this.getHandlersForAllImages(config, images);
				asyncActions.push(callback.bind(scope, config));
				Terrasoft.chain.apply(this, asyncActions);
			},

			/**
			 * Finds all images in content and generate function call for changing source of that image.
			 * @protected
			 * @param {Object} config Config of content builder.
			 * @param {Object} images Images store object.
			 * @return {Array} Array of functions, which will change source of images.
			 */
			getHandlersForAllImages: function(config, images) {
				const asyncActions = [];
				if (!Ext.isEmpty(config.Items)) {
					Terrasoft.each(config.Items, function(item) {
						this._addActionForItem(item, asyncActions, images);
					}, this);
				}
				return asyncActions;
			},

			/**
			 * Gets file by url and saves it to server.
			 * @protected
			 * @param {String} url Url to image.
			 * @param {Object} config Config of current item.
			 * @param {Function} next Callback to call next function in Terrasoft.chain.
			 * @deprecated
			 */
			imageHandler: function(url, config, next) {
				this._baseImageHandler(null, url, config, {}, this.onSaveImageResponse, next);
			},

			/**
			 * Changes image url in item config.
			 * @protected
			 * @param {Object} config Config of current item.
			 * @param {Function} next Callback to call next function in Terrasoft.chain.
			 * @param {Object} response Response from server after saving image.
			 */
			onSaveImageResponse: function(config, next, response) {
				this._baseSaveImageResponse("imageSrc", config.ImageConfig, {}, next, response);
			},

			/**
			 * Saves image on server.
			 * @protected
			 * @param {Object} file File of image.
			 * @param {Function} callback Callback which will be called after saving image.
			 */
			saveImage: function(file, callback) {
				const parameters = this.getParametersForEmailTemplateFile(file);
				const data = {
					entityName: "EmailTemplateFile",
					fileFieldName: "Data",
					file: file,
					parameters: parameters
				};
				Terrasoft.FileHelper.uploadFile(Terrasoft.QueryOperationType.INSERT, data, callback, this);
			},

			/**
			 * Returns parameters for target image.
			 * @protected
			 * @param {Object} file File of image.
			 * @return {Object} Object with parameters for image.
			 */
			getParametersForEmailTemplateFile: function(file) {
				const parameters = FileHelper.getBasicFileParameters(file);
				parameters.EmailTemplate = {
					value: this.$RecordId,
					type: Terrasoft.DataValueType.GUID
				};
				return parameters;
			},

			/**
			 * Returns query for updating email template.
			 * @protected
			 * @param {Object} config Config of content builder.
			 * @param {String} imageId Image unique identifier.
			 * @return {Terrasoft.UpdateQuery} UpdateQuery for updating config and html of target email
			 * template.
			 */
			getSaveQuery: function(config, imageId) {
				var recordId = this.get("RecordId");
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var emailContentExporter = this.getContentExporter();
				var configText = Terrasoft.encode(config);
				var displayHtml = emailContentExporter.exportData(config);
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: contentBuilderConfig.EntitySchemaName
				});
				update.enablePrimaryColumnFilter(recordId);
				update.setParameterValue(contentBuilderConfig.TemplateConfigColumnName, configText,
					Terrasoft.DataValueType.TEXT);
				update.setParameterValue(contentBuilderConfig.ConfigType, this.getConfigType(),
					Terrasoft.DataValueType.INTEGER);
				update.setParameterValue(contentBuilderConfig.TemplateBodyColumnName, displayHtml,
					Terrasoft.DataValueType.TEXT);
				this.addImageIdParameter(imageId, update);
				return update;
			},

			/**
			 * Handles response from server after updating email template.
			 * @protected
			 * @param {Object} response Response from server.
			 */
			onUpdateResponse: function(response) {
				this.hideBodyMask();
				if (response.success) {
					this.reloadContent(function() {
						window.close();
					}, this);
				}
			},

			/**
			 * Sets MacrosEntity in ContentBuilder configuration.
			 * @param {String} macrosEntity Entity name.
			 * @protected
			 */
			setMacrosEntity: function(macrosEntity) {
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				if (!Ext.isEmpty(macrosEntity)) {
					contentBuilderConfig.MacrosEntity = macrosEntity;
					this.set("ContentBuilderConfig", contentBuilderConfig);
				}
			},

			/**
			 *Initializes parameters.
			 * @protected
			 */
			initParameters: function() {
				var parameters = this.getParameters();
				var recordId = Terrasoft.isGUID(parameters[2]) ? parameters[2] : null;
				var contentBuilderMode = parameters[3];
				var contentBuilderConfig = this.getContentBuilderEnumsConfig(contentBuilderMode);
				this.set("RecordId", recordId);
				this.set("ContentBuilderConfig", contentBuilderConfig);
				this.set("ContentBuilderMode", contentBuilderMode);
			},

			/**
			 * Gets parameters from url-addresses.
			 * @protected
			 */
			getParameters: function() {
				var anchor = window.location.href.split("#")[1];
				return anchor.split("/");
			},

			/**
			 * Method returns configuration for content builder.
			 * @protected
			 * @param {Object} contentBuilderMode Set mode work with content builder.
			 */
			getContentBuilderEnumsConfig: function(contentBuilderMode) {
				var config = ContentBuilderEnumsModule.getContentBuilderConfig(contentBuilderMode);
				return config;
			},

			/**
			 * Validates object template parameters, html-layout configuration and prepares the content item.
			 * @protected
			 * @param {String} configText Template configuration.
			 * @param {String} html Html-layout template.
			 * @return {Object} Configuration of the content item.
			 */
			prepareConfig: function(configText, html) {
				if (!Ext.isEmpty(configText)) {
					return Terrasoft.decode(configText);
				}
				var config = {
					"ItemType": "sheet",
					"Items": []
				};
				if (!Ext.isEmpty(html)) {
					var block = this.getHtmlBlockConfig(html);
					config.Items.push(block);
				}
				return config;
			},

			/**
			 * Sends a template change message to the channel using websocket.
			 * @param {Object} callback callback-function.
			 * @param {Object} scope context of the callback-function.
			 * @protected
			 */
			reloadContent: function(callback, scope) {
				var dataSend = {
					recordId: this.get("RecordId"),
					senderName: this.get("ContentBuilderMode")
				};
				var config = {
					serviceName: "ContentBuilderService",
					methodName: "ReloadContent",
					data: dataSend
				};
				this.callService(config, function() {
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Returns the canvas content configuration.
			 * @protected
			 * @return {Object} Configuration of the content item.
			 */
			getContentBuilderConfig: function() {
				var contentBuilderHelper = this.createContentBuilderHelper();
				return contentBuilderHelper.toJSON(this);
			}
		}
	};
});


