Terrasoft.configuration.Structures["MobileFileAndLinksPreviewControllerV2"] = {innerHierarchyStack: ["MobileFileAndLinksPreviewControllerV2"]};
if (Terrasoft.SysSettingsValue.getBooleanValue("UseMobileUIV2") === true) {
	Ext.define("FileAndLinksPreviewPage.Controller", {
		extend: "Terrasoft.controller.BasePreviewPage",

		/**
		 * Name of the file model.
		 */
		fileModel: null,

		/**
		 * @protected
		 * @virtual
		 */
		initializeView: function(view) {
			this.callParent(arguments);
			var panel = view.getPanel();
			panel.on({
				scope: this,
				embeddeddetailitemapplied: this.onFileAndLinksEmbeddedDetailItemApplied
			});
		},

		/**
		 * @protected
		 * @virtual
		 */
		onFileAndLinksEmbeddedDetailItemApplied: function(record, detailItem) {
			if (record.modelName !== this.fileModel) {
				return;
			}
			var typeId = record.get("Type").getId();
			var isKnowledgeBaseLink = (typeId === Terrasoft.Configuration.FileTypeGUID.KnowledgeBaseLink);
			var isFile = ((typeId === Terrasoft.Configuration.FileTypeGUID.File) || isKnowledgeBaseLink);
			var showColumn = isFile ? "Data" : "Name";
			var hideColumn = isFile ? "Name" : "Data";
			detailItem.getItems().each(function(item) {
				if (item.isDecorator && !item.isField) {
					item = item.getComponent();
				}
				var columnName = item.getName && item.getName();
				if (showColumn === columnName) {
					if (isKnowledgeBaseLink) {
						item.setLabel(Terrasoft.LocalizableStrings.PreviewPageKnowledgeBaseLinkCaption);
					}
					item.show();
				} else if (hideColumn === columnName) {
					item.hide();
				}
			});
		},

		/**
		 * @inheritdoc
		 * @protected
		 * @overridden
		 */
		onFilePreview: function(field) {
			Terrasoft.util.downloadRecordFile({
				record: field.getRecord(),
				dataColumnName: field.getName(),
				fileName: field.getDisplayValue(),
				success: function(path, record) {
					var typeId = record.get("Type").getId();
					if (typeId === Terrasoft.Configuration.FileTypeGUID.EntityLink) {
						Terrasoft.Configuration.openFileByEntityLink({
							cancellationId: this.getCancellationId("openFileByEntityLink"),
							fileUrl: path,
							failure: function(config) {
								if (config && config.fileNotFound) {
									Terrasoft.MessageBox.showMessage(Terrasoft.LocalizableStrings.FileByEntityLinkNotFound);
								}
							},
							scope: this
						});
					} else {
						this.openFileByPath(path, record);
					}
				},
				failure: function(exception) {
					this.onFileOpenFailure(exception);
				},
				scope: this
			});
		}
	});
}


