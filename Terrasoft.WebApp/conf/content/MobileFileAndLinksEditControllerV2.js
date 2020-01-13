Terrasoft.configuration.Structures["MobileFileAndLinksEditControllerV2"] = {innerHierarchyStack: ["MobileFileAndLinksEditControllerV2"]};
if (Terrasoft.SysSettingsValue.getBooleanValue("UseMobileUIV2") === true) {

	Terrasoft.Configuration.FilesAndLinksDetailFileSources = {
		Gallery: 0,
		Camera: 1,
		Link: 2
	};

	Terrasoft.util.writeStyles(
		".x-ie .x-file-detail .x-button.x-edetail-delete-button,",
		".x-file-detail .x-edetail-delete-button {",
		"	position: absolute;",
		"	width: 40px;",
		"	height: 40px;",
		"	top: 50%;",
		"	margin-top: -20px;",
		"}",
		".x-file-detail .x-field-labeled {",
		"	padding-left: 50px;",
		"	padding-top: 0 !important;",
		"}",
		".x-file-detail .x-form-label {",
		"	margin-left: 0;",
		"	padding-left: 0;",
		"}",
		".x-file-detail .x-field.x-field-text .x-field-input {",
		"	padding-left: 0;",
		"}",
		".x-file-detail .x-field.x-item-disabled input, .x-field.x-item-disabled textarea {",
		"	color: rgba(0, 0, 0, 0.26);",
		"}"
	);

	Ext.define("FileAndLinksEditPage.Controller", {
		extend: "Terrasoft.controller.BaseEditPage",

		inheritableStatics: {

			addDefaultBusinessRules: function() {
				var fileModel = this.prototype.fileModel;
				Terrasoft.sdk.Model.addBusinessRule(fileModel, {
					name: "FileAndLinksEditPageRequirementRule",
					ruleType: Terrasoft.RuleTypes.Requirement,
					requireType: Terrasoft.RequirementTypes.OneOf,
					message: Terrasoft.LocalizableStrings["Sys.RequirementRule.message"],
					triggeredByColumns: ["Data", "Name"]
				});
				Terrasoft.sdk.Model.addBusinessRule(fileModel, {
					name: "FileAndLinksEditPageVisibilityRule",
					ruleType: "Terrasoft.FileAndLinksBusinessRule"
				});
			}

		},

		fileModel: null,

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
		showFileTypePicker: function() {
			var picker = this.getFileTypePicker();
			if (!picker.getParent()) {
				Ext.Viewport.add(picker);
			}
			picker.show();
		},

		/**
		 * @private
		 */
		getFileTypePicker: function() {
			if (!this.fileTypePicker) {
				Ext.define("Terrasoft.MobileFileAndLinksEditControllerPickerModel", {
					extend: "Terrasoft.model.BaseModel",
					config: {
						fields: [
							{name: "Caption", type: "string"},
							{name: "Source", type: "number"}
						]
					}
				});
				var pickerStore = Ext.create("Terrasoft.store.BaseStore", {
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
				this.fileTypePicker = Ext.create("Ext.Terrasoft.ComboBoxPicker", {
						component: {
							primaryColumn: "Caption",
							store: pickerStore,
							listeners: {
								scope: this,
								itemtap: this.onFileTypePickerItemTap
							},
							disableSelection: true
						},
						toolbar: {
							clearButton: false
						},
						title: Terrasoft.LocalizableStrings.EditPageFileTypePickerTitleV2,
						popup: true
					}
				);
			}
			return this.fileTypePicker;
		},

		/**
		 * @private
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
		 * @private
		 */
		onCameraCapture: function(fileName, url) {
			if (fileName && url) {
				this.currentFileParameters = {
					fileName: fileName,
					url: url
				};
				Terrasoft.controller.BaseEditPage.prototype.onEmbeddedDetailAddButtonTap.apply(this, this.currentArguments);
			}
			Terrasoft.Mask.hide();
		},

		/**
		 * @private
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
					Terrasoft.controller.BaseEditPage.prototype.onEmbeddedDetailAddButtonTap.apply(this, this.currentArguments);
					break;
			}
		},

		/**
		 * @private
		 */
		processEmbeddedDetailItemApplied: function(record, fileTypeRecord, args) {
			record.set("Type", fileTypeRecord);
			Terrasoft.controller.BaseEditPage.prototype.onEmbeddedDetailItemApplied.apply(this, args);
			if (this.currentFileParameters) {
				record.set("Data", this.currentFileParameters.url, true);
				record.set("Name", this.currentFileParameters.fileName, true);
				var field = this.getFieldByColumnName("Data", record);
				field.setDisplayValue(this.currentFileParameters.fileName);
			} else {
				this.processLink(record);
			}
		},

		/**
		 * @private
		 */
		processLink: function(record) {
			var typeId = record.get("Type").getId();
			if (Terrasoft.Configuration.FileTypeGUID.Link === typeId && !Ext.isEmpty(record.get("Data"))) {
				/*
					HACK: For binary columns (Data field) OData always returns some value, although in the case of
					link to the file it is wrong. Here we clear this value.
					And in order to column is not considered a change, do it directly.
				*/
				record.data.Data = null;
			}
		},

		/**
		 * @overridden
		 */
		onEmbeddedDetailItemApplied: function(record) {
			if (record.modelName !== this.fileModel) {
				this.callParent(arguments);
				return;
			}
			if (!record.phantom) {
				this.processLink(record);
				this.callParent(arguments);
				return;
			}
			var me = this;
			var args = arguments;
			var fileTypeModel = Ext.ModelManager.getModel("FileType");
			var isSimple = fileTypeModel.isSimple();
			if (isSimple) {
				var fileTypeRecord = Terrasoft.model.BaseModel.getSimpleLookupRecord(this.currentFileTypeGUID, "FileType");
				this.processEmbeddedDetailItemApplied(record, fileTypeRecord, args);
			} else {
				fileTypeModel.load(this.currentFileTypeGUID, {
					success: function(loadedRecord) {
						me.processEmbeddedDetailItemApplied(record, loadedRecord, args);
					},
					failure: function() {
						Terrasoft.controller.BaseEditPage.prototype.onEmbeddedDetailItemApplied.apply(me, args);
					}
				});
			}
			this.currentFileTypeGUID = null;
		},

		/**
		 * @overridden
		 */
		onEmbeddedDetailAddButtonTap: function(embeddedDetail) {
			var fileColumnSet = this.getColumnSetByColumnName("File", Ext.create(this.fileModel));
			if (fileColumnSet && fileColumnSet.getId() === embeddedDetail.getId()) {
				var detailColumns = Terrasoft.sdk.RecordPage.getColumns(this.self.Model, fileColumnSet.getName());
				this.cameraQuality = detailColumns.get("Data").columnConfig.quality;
				this.currentArguments = arguments;
				this.showFileTypePicker();
			} else {
				this.callParent(arguments);
			}
		},

		/**
		 * @overridden
		 */
		getColumnSets: function(modelName) {
			var columnSetConfigs = Terrasoft.sdk.RecordPage.getColumnSets(modelName);
			var columnSets = this.callParent(arguments);
			for (var i = 0, ln = columnSets.length; i < ln; i++) {
				var columnSet = columnSets[i];
				var columnSetName = columnSet.name;
				var columnSetConfig = columnSetConfigs.getByKey(columnSetName);
				if (columnSetConfig.modelName === this.fileModel) {
					columnSet.cls = "x-file-detail";
				}
			}
			return columnSets;
		}

	});

}


