Terrasoft.configuration.Structures["FileTimelineItemViewModel"] = {innerHierarchyStack: ["FileTimelineItemViewModel"]};
define("FileTimelineItemViewModel", ["FileTimelineItemViewModelResources",
		"BaseTimelineItemViewModel", "FileDownloader"
	],
	function() {
		/**
		 * @class Terrasoft.configuration.FileTimelineItemViewModel
		 * File timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.FileTimelineItemViewModel", {
			alternateClassName: "Terrasoft.FileTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Private

			/**
			 * Finds schema by name.
			 * @private
			 * @param {String} name Schema name.
			 * @return {Object} Schema.
			 */
			_findSchemaByName: function(name) {
				var filteredCollection = Terrasoft.EntitySchemaManager.items.filterByFn(function(item) {
					return (!item.getExtendParent() && (item.getName() === name));
				});
				return filteredCollection.isEmpty() ? null : filteredCollection.getByIndex(0);
			},

			/**
			 * Returns file extension.
			 * @private
			 * @param {String} imageName Image name.
			 * @return {String} Extension.
			 */
			_getExtensionFromName: function(imageName) {
				return imageName ? imageName.substring(imageName.lastIndexOf(".") + 1, imageName.length) : "";
			},

			/**
			 * Checks that file is image, depending on file extension.
			 * @private
			 * @param {String} fileName File name.
			 * @return {Boolean} Flag indicating that the file is image.
			 */
			_isFileImage: function(fileName) {
				return (fileName.match(/(jpg|jpeg|png|gif)$/i) !== null);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#init
			 * @override
			 */
			init: function() {
				this.set("Extensions", Ext.create("Terrasoft.Collection"));
				this.callParent();
				this.loadExtensions(this.setFileTypeIconSrc, this);
			},

			/**
			 * Returns image Url.
			 * @protected
			 * @param {String} entitySchemaName Entity schema name.
			 * @param {String} Id Image id.
			 * @return {String} Image Url.
			 */
			getImageUrl: function(entitySchemaName, Id) {
				return Terrasoft.ImageUrlBuilder.getUrl({
					source: Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: entitySchemaName,
						columnName: "Data",
						primaryColumnValue: Id
					}
				});
			},

			/**
			 * Returns image extension Url.
			 * @protected
			 * @param {String} id File id.
			 * @return {String} Image Url.
			 */
			getExtensionImageUrl: function(id) {
				return Terrasoft.ImageUrlBuilder.getUrl({
					source: Terrasoft.ImageSources.ENTITY_COLUMN,
					params: {
						schemaName: "FileExtension",
						columnName: "Data",
						primaryColumnValue: id
					}
				});
			},

			/**
			 * Fills icon collection with values.
			 * @protected
			 * @param {Terrasoft.core.collections.Collection} collection Query result from file extension table.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			fillExtensionsIcons: function(collection, callback, scope) {
				var extensions = this.get("Extensions");
				var defaultIconUrl = Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultFileIcon"));
				var defIconId = Terrasoft.generateGUID();
				extensions.add(defIconId, {
					"Extension": "default",
					"Url": defaultIconUrl
				});
				if (collection) {
					collection.each(function(item) {
						var extensionId = item.get("Id");
						var extensionName = item.get("Name").toLowerCase();
						var extensionUrl = this.getExtensionImageUrl(extensionId);
						if (extensionName !== "default") {
							extensions.add(extensionId, {
								"Extension": extensionName,
								"Url": extensionUrl
							});
						}
					}, this);
				}
				Ext.callback(callback, scope);
			},

			/**
			 * Loads extensions icons Url.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			loadExtensions: function(callback, scope) {
				var schemaName = "FileExtension";
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: schemaName,
					serverESQCacheParameters: {
						cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: this.name,
						cacheItemName: schemaName
					},
					clientESQCacheParameters: {
						cacheItemName: schemaName + "_" + this.name
					}
				});
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
				esq.getEntityCollection(function(result) {
					this.fillExtensionsIcons(result.collection, callback, scope);
				}, this);
			},

			/**
			 * Sets file type icon source.
			 * @protected
			 */
			setFileTypeIconSrc: function() {
				var itemExtension = this._getExtensionFromName(this.get("Caption"));
				if (!this._isFileImage(itemExtension)) {
					var extensionsCollection = this.get("Extensions");
					var extensions = extensionsCollection.getItems();
					var existedExtensions = extensions.filter(function(item) {
						return item.Extension === itemExtension;
					});
					if (existedExtensions.length > 0) {
						this.set("FileTypeSrc", existedExtensions[0].Url);
					} else {
						var defaultExtensions = extensions.filter(function(item) {
							return item.Extension === "default";
						});
						var defaultIconUrl = defaultExtensions[0] ? defaultExtensions[0].Url : null;
						this.set("FileTypeSrc", defaultIconUrl);
					}
				} else {
					this.set("FileTypeSrc", Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.ImageFileIcon")));
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#getRecordUrl
			 * @override
			 */
			getRecordUrl: function() {
				var foundSchema = this._findSchemaByName(this.get("EntitySchemaName"));
				if (foundSchema) {
					return Terrasoft.FileDownloader.getFileLink(foundSchema.uId, this.get("Id"));
				} else {
					return Ext.emptyString;
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * Returns preview image source.
			 * @return {String} Image source.
			 */
			getPreviewImageSrc: function() {
				return this.getImageUrl(this.get("EntitySchemaName"), this.get("Id"));
			},

			/**
			 * Checks if file preview is visible.
			 * @return {Boolean} Result (true - preview is visible, false - preview is not visible).
			 */
			isFilePreviewImageVisible: function() {
				var itemExtension = this._getExtensionFromName(this.get("Caption"));
				return this._isFileImage(itemExtension);
			}

			// endregion

		});
	});


