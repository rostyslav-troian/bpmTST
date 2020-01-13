Terrasoft.configuration.Structures["MobileFileAndLinksEmbeddedDetailGenerator"] = {innerHierarchyStack: ["MobileFileAndLinksEmbeddedDetailGenerator"]};
Ext.define("Terrasoft.configuration.FileAndLinksEmbeddedDetailGenerator", {
	extend: "Terrasoft.EmbeddedDetailGenerator",
	alternateClassName: "Terrasoft.FileAndLinksEmbeddedDetailGenerator",

	inheritableStatics: {

		addDefaultBusinessRules: function(fileModel) {
			Terrasoft.sdk.Model.addBusinessRule(fileModel, {
				name: fileModel + "FileAndLinksEditPageVisibilityRule",
				ruleType: "Terrasoft.FileAndLinksBusinessRule"
			});
		}

	},

	/**
	 * @private
	 */
	fileTypePicker: null,

	/**
	 * @private
	 */
	currentFileParameters: null,

	/**
	 * @private
	 */
	cameraQuality: null,

	/**
	 * @private
	 */
	addItemListenerConfig: null,

	/**
	 * @private
	 */
	editItemAppliedListenerConfig: null,

	/**
	 * @private
	 */
	showFileTypePicker: function(embeddedDetail) {
		var picker = this.getFileTypePicker();
		if (!picker.getParent()) {
			Ext.Viewport.add(picker);
			embeddedDetail.on("destroy", function() {
				Ext.destroy(picker);
			});
		}
		picker.show();
	},

	/**
	 * @private
	 */
	getFileTypePickerStore: function() {
		return Ext.create("Terrasoft.store.BaseStore", {
			model: "Terrasoft.MobileFileAndLinksEditControllerPickerModel",
			data: [
				{
					Caption: Terrasoft.LocalizableStrings.FileAndLinksEditPageFileSourceCamera,
					Source: Terrasoft.Configuration.FilesAndLinksDetailFileSources.Camera
				},
				{
					Caption: Terrasoft.LocalizableStrings.FileAndLinksEditPageFileSourceGallery,
					Source: Terrasoft.Configuration.FilesAndLinksDetailFileSources.Gallery
				},
				{
					Caption: Terrasoft.LocalizableStrings.FileAndLinksEditPageFileSourceLink,
					Source: Terrasoft.Configuration.FilesAndLinksDetailFileSources.Link
				}
			]
		});
	},

	/**
	 * @private
	 */
	getFileTypePicker: function() {
		if (!this.fileTypePicker) {
			this.fileTypePicker = Ext.create("Ext.Terrasoft.ComboBoxPicker", {
				component: {
					primaryColumn: "Caption",
					store: this.getFileTypePickerStore(),
					disableSelection: true
				},
				toolbar: {
					clearButton: false
				},
				title: Terrasoft.LocalizableStrings.EditPageFileTypePickerTitleV2,
				popup: true,
				listeners: {
					itemtap: this.onFileTypePickerItemTap,
					scope: this
				}
			});
		}
		return this.fileTypePicker;
	},

	/**
	 * @private
	 */
	processEmbeddedDetailItemApplied: function(config) {
		var record = config.record;
		record.set("Type", config.fileTypeRecord);
		this.callEditItemAppliedListener();
		if (this.currentFileParameters) {
			var fileName = this.currentFileParameters.fileName;
			record.set("Data", this.currentFileParameters.url, true);
			record.set("Name", fileName, true);
			var field = this.getDetailItemField(config.detailItem, "Data");
			field.setDisplayValue(fileName);
			if (record.phantom && config.isNew) {
				var cardGenerator = this.getCardGenerator();
				var viewId = cardGenerator.getViewId();
				var id = Terrasoft.util.getFieldId(viewId, "Data", Terrasoft.CardViewModes.Edit, record.getId());
				var editField = Ext.getCmp(id);
				editField.setDisplayValue(fileName);
			}
		} else {
			this.processLink(record);
		}
	},

	/**
	 * @private
	 */
	getDetailItemField: function(detailItem, name) {
		var items = detailItem.getItems();
		return items.findBy(function(item) {
			return item.getName() === name;
		});
	},

	/**
	 * @private
	 */
	processLink: function(record) {
		var typeId = record.get("Type.Id");
		if (Terrasoft.Configuration.FileTypeGUID.Link === typeId && !Ext.isEmpty(record.get("Data"))) {
			record.data.Data = null;
		}
	},

	/**
	 * @private
	 */
	extendOriginalListeners: function(config) {
		var originalAddItem = config.listeners.additem;
		config.listeners.additem =  function() {
			this.addItemListenerConfig = {
				listener: originalAddItem,
				scope: config.listeners.scope,
				args: arguments
			};
			this.handleAddItem.apply(this, arguments);
		}.bind(this);
		var originalItemApplied = config.listeners.itemapplied;
		config.listeners.itemapplied = function() {
			this.editItemAppliedListenerConfig = {
				listener: originalItemApplied,
				scope: config.listeners.scope,
				args: arguments
			};
			this.handleEditItemApplied.apply(this, arguments);
		}.bind(this);
	},

	/**
	 * @private
	 */
	openFileByPath: function(path, record, packageName, className) {
		Terrasoft.FileIntent.open({
			path: path,
			packageName: packageName,
			className: className,
			success: function() {
				this.onFilePreviewStarted(record);
			},
			close: function(data) {
				this.onFilePreviewFinished(record, data);
			},
			failure: function(exception) {
				Terrasoft.MessageBox.showException(exception);
			},
			scope: this
		});
	},

	/**
	 * Calls original "addbuttontap" listener.
	 * @protected
	 */
	callAddItemListener: function() {
		Ext.callback(this.addItemListenerConfig.listener, this.addItemListenerConfig.scope,
			this.addItemListenerConfig.args);
	},

	/**
	 * Calls original "itemapplied" listener.
	 * @protected
	 */
	callEditItemAppliedListener: function() {
		Ext.callback(this.editItemAppliedListenerConfig.listener, this.editItemAppliedListenerConfig.scope,
			this.editItemAppliedListenerConfig.args);
	},

	/**
	 * Called when camera capture failed
	 * @protected
	 * @virtual
	 * @param {Terrasoft.Exception} exception Instance of exception.
	 */
	onCameraFailure: function(exception) {
		Terrasoft.Mask.hide();
		var innerException = exception.getInnerException();
		if (innerException instanceof Terrasoft.UnsupportedFileSourceException) {
			Terrasoft.MessageBox.showMessage(innerException.getMessage());
		} else {
			Terrasoft.MessageBox.showException(exception);
		}
	},

	/**
	 * Called when camera captured
	 * @protected
	 * @virtual
	 * @param {String} fileName Name of filet.
	 * @param {String} url File url.
	 */
	onCameraCapture: function(fileName, url) {
		if (fileName && url) {
			this.currentFileParameters = {
				fileName: fileName,
				url: url
			};
			this.callAddItemListener();
		}
		Terrasoft.Mask.hide();
	},

	/**
	 * Called when file type picker item has been tapped.
	 * @protected
	 * @virtual
	 */
	onFileTypePickerItemTap: function(el, index, target, record) {
		var source = record.get("Source");
		this.currentFileParameters = null;
		switch (source) {
			case Terrasoft.Configuration.FilesAndLinksDetailFileSources.Gallery:
				this.currentFileTypeGUID = Terrasoft.Configuration.FileTypeGUID.File;
				Terrasoft.Mask.show();
				Terrasoft.Camera.captureFromGallery({
					success: this.onCameraCapture,
					failure: this.onCameraFailure,
					scope: this
				});
				break;
			case Terrasoft.Configuration.FilesAndLinksDetailFileSources.Camera:
				this.currentFileTypeGUID = Terrasoft.Configuration.FileTypeGUID.File;
				Terrasoft.Camera.captureFromCamera({
					quality: this.cameraQuality,
					success: this.onCameraCapture,
					failure: this.onCameraFailure,
					scope: this
				});
				break;
			case Terrasoft.Configuration.FilesAndLinksDetailFileSources.Link:
				this.currentFileTypeGUID = Terrasoft.Configuration.FileTypeGUID.Link;
				this.callAddItemListener();
				break;
			default:
				this.currentFileTypeGUID = null;
				break;
		}
	},

	/**
	 * Called when preview file field has been tapped.
	 * @protected
	 * @virtual
	 * @param {Ext.Component} field Instance of component.
	 */
	onPreviewFileFieldTap: function(field) {
		var record = field.getRecord();
		Terrasoft.util.downloadRecordFile({
			record: record,
			dataColumnName: field.getName(),
			fileName: field.getDisplayValue(),
			success: function(path, fileRecord) {
				if (Ext.isEmpty(path)) {
					Terrasoft.MessageBox.showMessage(Terrasoft.LS["Sys.Exception.FileTransfer.FileNotFound"]);
					return;
				}
				var typeId = fileRecord.get("Type").getId();
				if (typeId === Terrasoft.Configuration.FileTypeGUID.EntityLink) {
					Terrasoft.Configuration.openFileByEntityLink({
						fileUrl: path,
						failure: function(config) {
							if (config && config.fileNotFound) {
								Terrasoft.MessageBox.showMessage(Terrasoft.LocalizableStrings.FileByEntityLinkNotFound);
							}
						},
						scope: this
					});
				} else {
					this.openFileByPath(path, fileRecord);
				}
			},
			failure: function(exception) {
				Terrasoft.MessageBox.showException(exception);
			},
			scope: this
		});
	},

	/**
	 * Handles start of file preview.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.BaseModel} record Instance of model.
	 */
	onFilePreviewStarted: function() {
	},

	/**
	 * Handles finish of file preview.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.BaseModel} record Instance of model.
	 */
	onFilePreviewFinished: function() {
	},

	/**
	 * Called when add button has been tapped.
	 * @protected
	 * @virtual
	 * @param {Ext.Component} embeddedDetail Instance of component.
	 */
	handleAddItem: function(embeddedDetail) {
		var columnSetConfig = this.getColumnSetConfig();
		this.cameraQuality = columnSetConfig.columns.get("Data").columnConfig.quality;
		this.showFileTypePicker(embeddedDetail);
	},

	/**
	 * Called when embedded detail item has been applied.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.BaseModel} record Instance of model.
	 * @param {Ext.Component} detailItem Instance of component.
	 */
	handleEditItemApplied: function(record, detailItem, isNew) {
		if (record.phantom && isNew) {
			var fileTypeModel = Ext.ModelManager.getModel("FileType");
			var isSimple = fileTypeModel.isSimple();
			if (isSimple) {
				var fileTypeRecord = Terrasoft.model.BaseModel.getSimpleLookupRecord(this.currentFileTypeGUID, "FileType");
				this.processEmbeddedDetailItemApplied({
					record: record,
					fileTypeRecord: fileTypeRecord,
					detailItem: detailItem,
					isNew: isNew
				});
			} else {
				fileTypeModel.load(this.currentFileTypeGUID, {
					success: function(loadedRecord) {
						this.processEmbeddedDetailItemApplied({
							record: record,
							fileTypeRecord: loadedRecord,
							detailItem: detailItem,
							isNew: isNew
						});
					}.bind(this),
					failure: function() {
						this.callEditItemAppliedListener();
					}.bind(this)
				});
			}
		} else {
			this.processLink(record);
			this.callEditItemAppliedListener();
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	generateItem: function() {
		var config = this.callParent(arguments);
		var cardGenerator = this.getCardGenerator();
		var isEdit = cardGenerator.isEdit();
		if (!isEdit) {
			Terrasoft.each(config.items, function(item) {
				if (item.listeners && item.listeners.filepreview) {
					item.listeners.filepreview = this.onPreviewFileFieldTap.bind(this);
				}
			}, this);
		}
		return config;
	},

	/**
	 * @inheritdoc
	 */
	generate: function() {
		var config = this.callParent(arguments);
		var cardGenerator = this.getCardGenerator();
		var isEdit = cardGenerator.isEdit();
		if (isEdit) {
			config.cls = config.cls ? [config.cls] : [];
			config.cls.push("x-file-detail");
		}
		this.extendOriginalListeners(config);
		return config;
	}

});

Ext.define("Terrasoft.MobileFileAndLinksEditControllerPickerModel", {
	extend: "Terrasoft.model.BaseModel",
	config: {
		fields: [
			{name: "Caption", type: "string"},
			{name: "Source", type: "number"}
		]
	}
});


