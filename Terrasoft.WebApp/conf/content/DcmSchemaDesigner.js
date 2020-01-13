Terrasoft.configuration.Structures["DcmSchemaDesigner"] = {innerHierarchyStack: ["DcmSchemaDesigner"]};
define("DcmSchemaDesigner", ["ext-base", "DcmSchemaDesignerResources", "DcmSchemaDesignerViewModel",
		"DcmElementSchemaManager", "DcmStageContainer", "css!DcmSchemaDesigner", "SysDcmSettingsManager",
		"SysDcmSchemaInSettingsManager", "DcmSchemaManager"], function(Ext, resources) {
		/**
		 * @class Terrasoft.Designers.DcmSchemaDesigner
		 */
		Ext.define("Terrasoft.Designers.DcmSchemaDesigner", {

			extend: "Terrasoft.BaseProcessSchemaDesigner",

			alternateClassName: "Terrasoft.DcmSchemaDesigner",

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#designerViewModelClassName
			 * @overridden
			 */
			designerViewModelClassName: "Terrasoft.DcmSchemaDesignerViewModel",

			/**
			 * SysDcmSettingsId.
			 * @type {String}
			 */
			dcmSettingsId: null,

			/**
			 * Default package unique identifier.
			 * @type {String}
			 */
			packageUId: null,

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#propertiesEditModule
			 * @overridden
			 */
			propertiesEditModule: "DcmSchemaElementPropertiesEdit",

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createDesignContainer
			 * @overridden
			 */
			getDesignerViewModelConfig: function() {
				var config = this.callParent(arguments);
				config.values.DcmSettingsId = this.dcmSettingsId;
				config.values.PackageUId = this.packageUId;
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#initDesignerManagers
			 * @overridden
			 */
			initDesignerManagers: function(callback, scope) {
				this.callParent([function() {
					Terrasoft.chain(
						function(next) {
							Terrasoft.DcmElementSchemaManager.initialize(next, this);
						},
						function(next) {
							Terrasoft.SysDcmSchemaInSettingsManager.initialize({}, next, this);
						},
						function() {
							Terrasoft.SysDcmSettingsManager.initialize({}, callback, scope);
						},
						this
					);
				}, this]);
			},

			/**
			 * Returns config for toolbar save button.
			 * @protected
			 * @return {Object}
			 */
			getSaveButtonConfig: function() {
				return {
					className: "Terrasoft.Button",
					id: this.id + "-save-btn",
					caption: resources.localizableStrings.SaveButtonCaption,
					style: Terrasoft.controls.ButtonEnums.style.BLUE,
					click: {bindTo: "save"},
					hint: resources.localizableStrings.SaveButtonHint
				};
			},

			/**
			 * Returns config for toolbar close button.
			 * @protected
			 * @return {Object}
			 */
			getCloseButtonConfig: function() {
				return {
					className: "Terrasoft.Button",
					id: this.id + "-close-btn",
					caption: resources.localizableStrings.CloseButtonCaption,
					click: {bindTo: "close"}
				};
			},

			/**
			 * Returns config for toolbar Actions button.
			 * @protected
			 * @return {Object}
			 */
			getActionsButtonConfig: function() {
				var coreResources = Terrasoft.Resources.SchemaDesigner;
				return {
					className: "Terrasoft.Button",
					id: this.id + "-actions-btn",
					caption: resources.localizableStrings.ActionsButtonCaption,
					classes: {
						wrapperClass: ["t-btn-actions"]
					},
					menu: {
						items: [
							Ext.create("Terrasoft.MenuItem", {
								id: this.id + "-dcm-meta-data-mi",
								caption: coreResources.MetaDataMenuItemCaption,
								click: {bindTo: "onOpenMetaDataClick"}
							}),
							Ext.create("Terrasoft.MenuItem", {
								id: this.id + "-dcm-export-to-md",
								caption: coreResources.ExportMetaDataItemCaption,
								click: {bindTo: "onExportSchemaClick"}
							})
						]
					}
				};
			},

			/**
			 * Creates toolbar left container.
			 * @private
			 */
			createToolbarLeftContainer: function() {
				return {
					className: "Terrasoft.Container",
					id: this.id + "-toolbar-left",
					classes: {
						wrapClassName: [
							"toolbar-left",
							"load-dcm-properties-page-on-click"
						]
					},
					items: [
						this.getSaveButtonConfig(),
						this.getCloseButtonConfig(),
						this.getActionsButtonConfig()
					]
				};
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesigner#getSchemaPropertiesButtonConfig
			 * @overridden
			 */
			getSchemaPropertiesButtonConfig: function() {
				return {
					id: this.id + "-process-properties-btn",
					classes: {
						wrapperClass: "dcm-schema-properties-button"
					},
					click: {
						bindTo: "onShowPropertyPage"
					},
					markerValue: "SchemaPropertiesButton",
					hint: resources.localizableStrings.CasePropertiesButtonHint,
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					imageConfig: resources.localizableImages.DcmSchemaPropertiesPageIcon
				};
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesigner#getHelpButtonConfig
			 * @overridden
			 */
			getHelpButtonConfig: function() {
				return {
					id: this.id + "-help-btn",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					classes: {
						wrapperClass: "dcm-help-button"
					},
					click: {
						bindTo: "onHelpClick"
					},
					hint: Terrasoft.Resources.SchemaDesigner.HelpButtonHint,
					markerValue: "HelpButton",
					imageConfig: resources.localizableImages.DcmHelpIcon
				};
			},

			/**
			 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesigner#getESNFeedButtonConfig
			 * @overridden
			 */
			getESNFeedButtonConfig: function() {
				return {
					id: this.id + "-feed-btn",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					classes: {
						wrapperClass: "dcm-feed-button"
					},
					click: {
						bindTo: "onESNFeedClick"
					},
					hint: Terrasoft.Resources.SchemaDesigner.FeedButtonHint,
					markerValue: "FeedButton",
					imageConfig: resources.localizableImages.DcmFeedIcon
				};
			},

			/**
			 * Creates toolbar right container.
			 * @private
			 */
			createToolbarRightContainer: function() {
				var propertiesButton = Ext.create("Terrasoft.Button", this.getSchemaPropertiesButtonConfig());
				var helpButton = Ext.create("Terrasoft.Button", this.getHelpButtonConfig());
				var items = [
					propertiesButton,
					helpButton
				];
				if (Terrasoft.Features.getIsEnabled("ProcessESN")) {
					var feedButton = Ext.create("Terrasoft.Button", this.getESNFeedButtonConfig());
					items.splice(0, 0, feedButton);
				}
				return {
					className: "Terrasoft.Container",
					id: this.id + "-toolbar-right",
					classes: {
						wrapClassName: [
							"toolbar-right",
							"load-dcm-properties-page-on-click"
						]
					},
					items: items
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createToolbar
			 * @overridden
			 */
			createToolbarContainer: function() {
				var toolbarContainer = this.callParent(arguments);
				var leftToolbar = this.createToolbarLeftContainer();
				var rightToolbar = this.createToolbarRightContainer();
				toolbarContainer.add(leftToolbar);
				toolbarContainer.add(rightToolbar);
				return toolbarContainer;
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createDesignContainer
			 * @overridden
			 */
			createDesignContainer: function() {
				var designMainContainer = this.callParent(arguments);
				var dcmStageContainer = this.createDcmStageContainer();
				this.diagramContainer.add(dcmStageContainer);
				return designMainContainer;
			},

			/**
			 * Creates DCM stage container.
			 * @private
			 * @return {Terrasoft.DcmStageContainer}
			 */
			createDcmStageContainer: function() {
				return Ext.create("Terrasoft.DcmStageContainer", {
					id: this.id,
					viewModelItems: {bindTo: "ViewModelItems"},
					reorderableIndex: {bindTo: "ReorderableIndex"},
					classes: {
						wrapClassName: [
							"dcm-stage-container",
							"load-dcm-properties-page-on-click"
						]
					},
					dropGroupName: "dcm-stages",
					onDragEnter: {bindTo: "onDragOver"},
					onDragOver: {bindTo: "onDragOver"},
					onDragDrop: {bindTo: "onDragDrop"},
					onDragOut: {bindTo: "onDragOut"},
					onElementSelected: {bindTo: "onItemSelected"},
					onElementRemoveButtonClick: {bindTo: "onElementRemoveButtonClick"},
					onElementDblClick: {bindTo: "onElementDblClick"},
					onStageDblClick: {bindTo: "onStageDblClick"},
					onStageSelected: {bindTo: "onItemSelected"},
					elementDragDrop: {bindTo: "onItemSelected"}
				});
			}

		});
		return Terrasoft.Designers.DcmSchemaDesigner;
	}
);



