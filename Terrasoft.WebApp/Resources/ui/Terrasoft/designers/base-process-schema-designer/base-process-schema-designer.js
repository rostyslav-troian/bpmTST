/**
 */
Ext.define("Terrasoft.Designers.BaseProcessSchemaDesigner", {
	extend: "Terrasoft.Designers.BaseSchemaDesigner",
	alternateClassName: "Terrasoft.BaseProcessSchemaDesigner",

	/**
	 * Designer ViewModel class name.
	 * @type {String}
	 */
	designerViewModelClassName: "Terrasoft.BaseProcessSchemaDesignerViewModel",

	/**
	 * Designer ViewModel.
	 * @type {Terrasoft.BaseViewModel}
	 */
	designerViewModel: null,

	/**
	 * Container for designer content.
	 * @type {Terrasoft.Container}
	 */
	contentContainer: null,

	/**
	 * Container for properties.
	 * @type {Terrasoft.Container}
	 */
	propertiesContainer: null,

	/**
	 * The module name is an editable properties of the item.
	 * @type {String}
	 */
	propertiesEditModule: "ProcessSchemaElementPropertiesEdit",

	/**
	 * The input field to set the focus when you select an item in the diagram.
	 * @type {Object}
	 * @private
	 */
	focusEl: null,

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#render
	 * @override
	 */
	render: function(config) {
		this.onBeforeDesignerRender();
		this.renderDesignContainer(config.renderTo);
		this.initDesignerManagers(this.onAfterDesignerRender, this);
	},

	/**
	 * Method to execute additional operations before designer rendered.
	 * @protected
	 */
	onBeforeDesignerRender: function() {
		this.maskId = Terrasoft.Mask.show({timeout: 0});
	},

	/**
	 * Init managers.
	 * @protected
	 * @param {Function} callback The callback function.
	 * @param {Object} scope The scope of callback function.
	 */
	initDesignerManagers: function(callback, scope) {
		callback.call(scope);
	},

	/**
	 * Method to execute additional operations after designer rendered.
	 * @protected
	 */
	onAfterDesignerRender: function() {
		this.designerViewModel.init();
	},

	/**
	 * Renders design container.
	 * @param {Ext.dom.Element} renderTo Render container.
	 * @protected
	 */
	renderDesignContainer: function(renderTo) {
		this.designContainer = this.createDesignContainer();
		this.propertiesContainer = this.createPropertiesContainer();
		this.designerViewModel = this.createDesignerViewModel();
		this.initFocusElement(renderTo);
		var designContainer = this.designContainer;
		var designerViewModel = this.designerViewModel;
		designContainer.render(renderTo);
		designContainer.bind(designerViewModel);
		designerViewModel.on("change:SchemaCaption", this.setTitle, this);
		designerViewModel.on("change:IsShowPropertyPage", this.onIsShowPropertyPageChange, this);
		designerViewModel.on("focusDesigner", this.onFocusDesigner, this);
		designerViewModel.on("initialized", this.onDesignerViewModelInitialized, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#createDesignContainer
	 * @override
	 */
	createDesignContainer: function() {
		var designContainer = this.callParent(arguments);
		var contentContainer = this.contentContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-content",
			classes: {wrapClassName: ["content", "ts-box-sizing"]},
			items: []
		});
		designContainer.add(contentContainer);
		var diagramHeader = this.createDiagramHeader();
		var diagramContainer = this.diagramContainer = this.createDiagramContainer();
		diagramContainer.add(diagramHeader);
		contentContainer.add(diagramContainer);
		return designContainer;
	},

	/**
	 * Creates diagram header.
	 * @private
	 * @return {Terrasoft.Container}
	 */
	createDiagramHeader: function() {
		var captionContainer = this.createCaptionContainer();
		var toolBar = this.createToolbarContainer();
		var loadStoragePanel = this.createLoadStoragePanel();
		var messagePanel = this._createMessagePanel();
		var diagramHeader = Ext.create("Terrasoft.Container", {
			id: this.id + "-diagram-header",
			classes: {
				wrapClassName: ["header", "ts-box-sizing"]
			},
			items: [
				captionContainer,
				toolBar,
				loadStoragePanel,
				messagePanel
			]
		});
		return diagramHeader;
	},

	/**
	 * Creates diagram container.
	 * @private
	 * @return {Terrasoft.Container}
	 */
	createDiagramContainer: function() {
		var diagramContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-diagram-ct",
			classes: {
				wrapClassName: ["diagram", "ts-box-sizing"]
			},
			items: []
		});
		return diagramContainer;
	},

	/**
	 * Creates container with caption edit.
	 * @private
	 * @return {Terrasoft.Container}
	 */
	createCaptionContainer: function() {
		var captionEdit = Ext.create("Terrasoft.TextEdit", {
			id: this.id + "-caption",
			value: {
				bindTo: "SchemaCaption"
			},
			listeners: {
				enterkeypressed: this.onCaptionEnterPressed
			},
			markerValue: "SchemaCaption"
		});
		var captionContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-diagram-caption-ct",
			classes: {
				wrapClassName: ["control-width-15 ts-box-sizing diagram-caption-ct"]
			},
			items: [
				captionEdit
			]
		});
		return captionContainer;
	},

	/**
	 * Creates designer toolbar container.
	 * @return {Terrasoft.Container}
	 */
	createToolbarContainer: function() {
		var toolbar = Ext.create("Terrasoft.Container", {
			id: this.id + "-toolbar",
			classes: {
				wrapClassName: ["toolbar", "ts-box-sizing"]
			},
			items: []
		});
		return toolbar;
	},

	/**
	 * Creates the panel for dialog message about loading saved process data from storage.
	 * @private
	 * @return {Terrasoft.Container} Created container with panel.
	 */
	createLoadStoragePanel: function() {
		var resources = Terrasoft.Resources.SchemaDesigner;
		var loadStorageContainer = Ext.create("Terrasoft.Container", {
			className: "Terrasoft.Container",
			id: this.id + "-load-storage-panel",
			classes: {
				wrapClassName: ["load-storage-panel"]
			},
			visible: {
				bindTo: "IsLoadStoragePanelVisible"
			},
			items: [
				{
					className: "Terrasoft.Label",
					id: this.id + "-load-storage-label",
					caption: resources.LoadStorageLabel,
					classes: {
						labelClass: ["t-label"]
					}
				},
				{
					className: "Terrasoft.Container",
					id: this.id + "-load-storage-buttons",
					classes: {
						wrapClassName: ["load-storage-buttons"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							id: this.id + "-load-btn",
							caption: resources.LoadStorageButtonCaption,
							click: {
								bindTo: "onLoadStorageClick"
							}
						},
						{
							className: "Terrasoft.Button",
							id: this.id + "-discard-btn",
							caption: resources.DiscardStorageButtonCaption,
							click: {
								bindTo: "onDiscardStorageClick"
							}
						}
					]
				}
			]
		});
		return loadStorageContainer;
	},

	/**
	 * @returns {Terrasoft.Container}
	 * @private
	 */
	_createMessagePanel: function() {
		return Ext.create("Terrasoft.Container", {
			className: "Terrasoft.Container",
			id: this.id + "-message-panel",
			classes: {
				wrapClassName: ["message-panel"]
			},
			visible: {
				bindTo: "IsMessagePanelVisible"
			},
			items: [
				{
					className: "Terrasoft.Label",
					id: this.id + "-message-panel-label",
					caption: {
						bindTo: "MessagePanelMessage"
					},
					classes: {
						labelClass: ["t-label"]
					}
				},
				{
					className: "Terrasoft.Container",
					id: this.id + "-message-panel-buttons",
					classes: {
						wrapClassName: ["message-panel-buttons"]
					},
					items: [
						{
							className: "Terrasoft.Button",
							id: this.id + "-message-panel-btn",
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							markerValue: "CloseMessagePanel",
							imageConfig: {
								source: Terrasoft.ImageSources.RESOURCE_MANAGER,
								params: {
									resourceManagerName: "Terrasoft.Nui",
									resourceItemName: "ProcessSchemaDesigner.CloseButtonImage.svg"
								}
							},
							click: {
								bindTo: "hideMessagePanel"
							}
						}
					]
				}
			]
		});
	},

	/**
	 * Creates a container for the process element property editor.
	 * @private
	 * @return {Terrasoft.Container} Properties container.
	 */
	createPropertiesContainer: function() {
		var propertiesContainer = Ext.create("Terrasoft.Container", {
			id: this.getPropertiesContainerId(),
			classes: {wrapClassName: ["properties-ct", "ts-box-sizing"]},
			resizable: !Terrasoft.getIsRtlMode(),
			resizeActionsCode: Terrasoft.ResizeAction.RESIZE_LEFT.code,
			resizerConfig: {
				minWidth: 356
			}
		});
		propertiesContainer.on("onsizechanged", this.onDesignContentSizeChanged);
		this.contentContainer.add(propertiesContainer);
		return propertiesContainer;
	},

	/**
	 * Handler for design content container size changed. Fires window resize event for update diagram scroll offset.
	 */
	onDesignContentSizeChanged: function() {
		var event = document.createEvent("Event");
		event.initEvent("resize", false, true);
		window.dispatchEvent(event);
	},

	/**
	 * Returns config for designer view model.
	 * @protected
	 * @return {Object}
	 */
	getDesignerViewModelConfig: function() {
		var propertiesContainerId = this.getPropertiesContainerId();
		return {
			sandbox: this.sandbox,
			propertiesContainerId: propertiesContainerId,
			id: this.id,
			values: {
				SchemaUId: this.schemaUId,
				PackageUId: this.packageUId,
				IsShowPropertyPage: true,
				PropertiesEditModule: this.propertiesEditModule
			}
		};
	},

	/**
	 * Creates designer view model.
	 * @protected
	 * @return {Terrasoft.ProcessSchemaDesignerViewModel} View model
	 */
	createDesignerViewModel: function() {
		var config = this.getDesignerViewModelConfig();
		return Ext.create(this.designerViewModelClassName, config);
	},

	/**
	 * Initializes element for steel focus after diagram clicking.
	 * @param {Ext.dom.Element} renderTo Render container.
	 * @private
	 */
	initFocusElement: function(renderTo) {
		this.focusEl = renderTo.appendChild({
			tag: "input",
			id: "focusInput",
			style: {
				width: 0,
				height: 0,
				padding: 0,
				border: 0,
				position: "absolute"
			}
		});
	},

	/**
	 * Returns identifier for properties container.
	 * @private
	 * @return {String}
	 */
	getPropertiesContainerId: function() {
		return this.id + "-properties-ct";
	},

	/**
	 * Handler for IsShowPropertyPage attribute change.
	 */
	onIsShowPropertyPageChange: function() {
		if (!this.propertiesContainer.rendered) {
			return;
		}
		var propertiesContainerWrapEl = this.propertiesContainer.getWrapEl();
		propertiesContainerWrapEl.toggleCls("properties-ct-collapsed");
		this.onDesignContentSizeChanged();
	},

	/**
	 * Handler for designer focus.
	 */
	onFocusDesigner: function() {
		this.focusDesigner();
	},

	/**
	 * Handler for event "initialized" of DesignerViewModel.
	 * @private
	 */
	onDesignerViewModelInitialized: function() {
		this.fireEvent("loadcomplete", this);
		Terrasoft.Mask.hide(this.maskId);
	},

	/**
	 * Move current focus to designer.
	 * @private
	 */
	focusDesigner: function() {
		this.focusEl.focus();
	},

	/**
	 * Handler for press Enter button on the title of the designer.
	 * @param {Terrasoft.Component} element Title component.
	 */
	onCaptionEnterPressed: function(element) {
		element.fireEvent("blur");
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#onSandboxInitialized
	 * Performs preloading module element editing item.
	 * @override
	 */
	onSandboxInitialized: function() {
		this.callParent(arguments);
		this.sandbox.requireModuleDescriptors([this.propertiesEditModule], function() {
			require([this.propertiesEditModule]);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#onHidePropertyPage
	 * @override
	 */
	onHidePropertyPage: function() {
		this.designerViewModel.onHidePropertyPage();
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#onGetElementData
	 * @override
	 */
	onGetElementData: function(name) {
		return this.designerViewModel.getPropertiesPageData(name);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (this.designerViewModel) {
			this.designerViewModel.destroy();
		}
		this.callParent(arguments);
	},

	/**
	 * Returns config for toolbar schema properties button.
	 * @protected
	 * @return {Object}
	 */
	getSchemaPropertiesButtonConfig: function() {
		return {
			id: this.id + "-process-properties-btn",
			classes: {
				wrapperClass: "t-btn-image margin-right-0px t-btn-image-left schema-properties-button"
			},
			click: {
				bindTo: "onShowPropertyPage"
			},
			hint: Terrasoft.Resources.SchemaDesigner.ProcessPropertiesButtonHint,
			markerValue: "SchemaPropertiesButton"
		};
	},

	/**
	 * Returns config for toolbar help button.
	 * @protected
	 * @return {Object}
	 */
	getHelpButtonConfig: function() {
		return {
			id: this.id + "-help-btn",
			classes: {
				wrapperClass: "t-btn-image margin-right-0px t-btn-image-left help-button"
			},
			click: {
				bindTo: "onHelpClick"
			},
			hint: Terrasoft.Resources.SchemaDesigner.HelpButtonHint,
			markerValue: "HelpButton"
		};
	},

	/**
	 * Returns config for toolbar social feed button.
	 * @protected
	 * @return {Object}
	 */
	getESNFeedButtonConfig: function() {
		return {
			id: this.id + "-feed-btn",
			classes: {
				wrapperClass: "t-btn-image margin-right-0px t-btn-image-left feed-button"
			},
			click: {
				bindTo: "onESNFeedClick"
			},
			hint: Terrasoft.Resources.SchemaDesigner.FeedButtonHint,
			markerValue: "FeedButton"
		};
	}

});
