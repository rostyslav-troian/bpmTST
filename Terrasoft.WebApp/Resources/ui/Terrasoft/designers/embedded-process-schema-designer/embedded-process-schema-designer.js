/**
 */
Ext.define("Terrasoft.Designers.EmbeddedProcessSchemaDesigner", {
	extend: "Terrasoft.Designers.BaseProcessSchemaDesigner",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaDesigner",

	/**
	 * Process diagram.
	 * @type {Terrasoft.ProcessSchemaDiagram}
	 * @private
	 */
	diagram: null,

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#designerViewModelClassName
	 * @override
	 */
	designerViewModelClassName: "Terrasoft.EmbeddedProcessSchemaDesignerViewModel",

	/**
	 * Flag that indicates whether left panel is collapsed.
	 * @type {Boolean}
	 */
	leftPanelCollapsed: false,

	/**
	 * Left panel collapse class name.
	 * @type {String}
	 */
	leftPanelCollapseClass: "schema-designer-left-panel-collapsed",

	/**
	 * Local storage property name for process designer left panel collapsed state.
	 * @protected
	 * @type {String}
	 */
	storageLeftPanelCollapsed: "ProcessDesigner_LeftPanelCollapsed",

	/**
	 * Name of left toolbar class.
	 * @protected
	 * @type {String}
	 */
	leftToolbarClassName: "Terrasoft.EmbeddedProcessSchemaDesignerLeftToolbar",

	/**
	 * Name of schema diagram class name.
	 * @protected
	 * @type {String}
	 */
	schemaDiagramClassName: "Terrasoft.ProcessSchemaDiagram",

	/**
	 * Caption of left toolbar.
	 * @protected
	 * @type {String}
	 */
	leftToolbarHeaderButtonCaption: Terrasoft.Resources.SchemaDesigner.LeftPanelHeaderButtonCaption,

	/**
	 * Diagram config.
	 * @private
	 * @type {Object}
	 */
	diagramConfig: {
		classes: {
			wrapClassName: ["ej-diagram", "ts-box-sizing"]
		},
		items: {
			bindTo: "Items"
		},
		click: {
			bindTo: "onDiagramClick"
		},
		doubleClick: {
			bindTo: "onDiagramDoubleClick"
		},
		connectorsNodesChange: {
			bindTo: "onConnectorsNodesChange"
		},
		itemsContainerChanged: {
			bindTo: "onItemsContainerChanged"
		},
		itemsPositionChanged: {
			bindTo: "onItemsPositionChanged"
		},
		textChange: {
			bindTo: "onTextChange"
		},
		linePositionChanged: {
			bindTo: "onLinePositionChanged"
		},
		sizeChanged: {
			bindTo: "onElementSizeChanged"
		},
		generateItemNameAndCaption: {
			bindTo: "onGenerateItemNameAndCaption"
		},
		polylinePointPositionsChanged: {
			bindTo: "onPolylinePointPositionsChanged"
		},
		insertNodeInConnector: {
			bindTo: "onInsertNodeInConnector"
		},
		nodesCollectionChange: {
			bindTo: "onNodesCollectionChange"
		},
		itemsRemoving: {
			bindTo: "onItemsRemoving"
		}
	},

	/**
	 * Adds ProcessSourceCode item to a button menu of Actions.
	 * @private
	 * @param {Array} menuItems Items of the menu.
	 * @param {Object} resources Resources.
	 */
	addProcessSourceCodeMenuItem: function(menuItems, resources) {
		menuItems.push(Ext.create("Terrasoft.MenuItem", {
			id: this.id + "-process-source-code-mi",
			caption: resources.SourceCodeMenuItemCaption,
			click: {bindTo: "onOpenSourceCodeClick"}
		}));
	},

	/**
	 * Adds Open Parent Process item to a button menu of Actions.
	 * @private
	 * @param {Array} menuItems Items of the menu.
	 * @param {Object} resources Resources.
	 */
	_addOpenParentProcessMenuItem: function(menuItems, resources) {
		menuItems.push(Ext.create("Terrasoft.MenuItem", {
			id: this.id + "-open-parent-process-mi",
			caption: resources.OpenParentProcessMenuItemCaption,
			click: {bindTo: "onOpenParentProcessClick"},
			enabled: "$hasParentProcess"
		}));
	},

	/**
	 * Adds ElementCopy item to a button menu of Actions.
	 * @private
	 * @param {Array} menuItems Items of the menu.
	 * @param {Object} resources Resources.
	 */
	addElementCopyMenuItem: function(menuItems, resources) {
		menuItems.push(Ext.create("Terrasoft.MenuItem", {
			id: this.id + "-process-copy-element-mi",
			caption: resources.CopyElementMenuItemCaption,
			onItemClick: this.onCopyElementClick.bind(this)
		}));
	},

	/**
	 * Adds ElementPaste item to a button menu of Actions.
	 * @private
	 * @param {Array} menuItems Items of the menu.
	 * @param {Object} resources Resources.
	 */
	addElementPasteMenuItem: function(menuItems, resources) {
		menuItems.push(Ext.create("Terrasoft.MenuItem", {
			id: this.id + "-process-paste-element-mi",
			caption: resources.PasteElementMenuItemCaption,
			onItemClick: this.onPasteElementClick.bind(this)
		}));
	},

	/**
	 * Creates left toolbar buttons
	 * @private
	 * @param {Array} actionButtonMenuItems Action button menu items.
	 * @return {Array}
	 */
	createToolBarLefContainerItems: function(actionButtonMenuItems) {
		var resources = Terrasoft.Resources.SchemaDesigner;
		return [
			{
				className: "Terrasoft.Button",
				id: this.id + "-save-btn",
				caption: resources.SaveButtonCaption,
				style: {bindTo: "getSaveButtonStyle"},
				click: {bindTo: "save"},
				hint: {bindTo: "getSaveButtonHint"},
				markerValue: "save"
			},
			{
				className: "Terrasoft.Button",
				id: this.id + "-close-btn",
				caption: resources.CloseButtonCaption,
				style: Terrasoft.controls.ButtonEnums.style.GREY,
				click: {bindTo: "close"},
				markerValue: "close"
			},
			{
				className: "Terrasoft.Button",
				id: this.id + "-actions-btn",
				caption: resources.ActionsButtonCaption,
				classes: {wrapperClass: ["t-btn-actions"]},
				menu: {items: actionButtonMenuItems},
				markerValue: "actions"
			}
		];
	},

	/**
	 * Creates toolbar left container.
	 * @private
	 */
	createToolbarLeftContainer: function() {
		var resources = Terrasoft.Resources.SchemaDesigner;
		var menuItems = [];
		this._addOpenParentProcessMenuItem(menuItems, resources);
		this.addProcessSourceCodeMenuItem(menuItems, resources);
		menuItems.push({
			className: "Terrasoft.MenuSeparator"
		});
		this.addElementCopyMenuItem(menuItems, resources);
		this.addElementPasteMenuItem(menuItems, resources);
		return {
			className: "Terrasoft.Container",
			id: this.id + "-toolbar-left",
			classes: {
				wrapClassName: ["toolbar-left"]
			},
			items: this.createToolBarLefContainerItems(menuItems)
		};
	},

	/**
	 * Returns config for toolbar search show button.
	 * @private
	 * @return {Object}
	 */
	getSearchShowButtonConfig: function() {
		return {
			id: this.id + "-search-show-btn",
			classes: {
				wrapperClass: "t-btn-image margin-right-0px t-btn-image-left search-show-button"
			},
			click: {
				bindTo: "onSearchShowButtonClick"
			},
			visible: {
				bindTo: "IsSearchVisible",
				bindConfig: {
					converter: function(isSearchVisible) {
						return !isSearchVisible;
					}
				}
			},
			hint: Terrasoft.Resources.SchemaDesigner.SearchShowButtonHint,
			markerValue: "SearchShowButton"
		};
	},

	/**
	 * Creates toolbar right container.
	 * @private
	 */
	createToolbarRightContainer: function() {
		var searchContainer = this.createSearchContainer();
		var searchShowButton = Ext.create("Terrasoft.Button", this.getSearchShowButtonConfig());
		var schemaPropertiesButton = Ext.create("Terrasoft.Button", this.getSchemaPropertiesButtonConfig());
		var helpButton = Ext.create("Terrasoft.Button", this.getHelpButtonConfig());
		var items = [
			searchContainer,
			searchShowButton,
			schemaPropertiesButton,
			helpButton
		];
		if (Terrasoft.Features.getIsEnabled("ProcessESN")) {
			var feedButton = Ext.create("Terrasoft.Button", this.getESNFeedButtonConfig());
			items.splice(2, 0, feedButton);
		}
		return {
			className: "Terrasoft.Container",
			id: this.id + "-toolbar-right",
			classes: {
				wrapClassName: ["toolbar-right"]
			},
			items: items
		};
	},

	/**
	 * Creates search container.
	 * @private
	 */
	createSearchContainer: function() {
		var resources = Terrasoft.Resources.SchemaDesigner;
		var buttonWrapperClass = "t-btn-image t-btn-image-left ";
		var searchTextEdit = this.searchTextEdit = Ext.create("Terrasoft.TextEdit", {
			id: this.id + "-search-edit",
			classes: {
				wrapClass: ["ts-box-sizing", "search-edit"]
			},
			value: {
				bindTo: "SearchTextEditValue"
			},
			listeners: {
				enterkeypressed: this.onSearchTextEditEnterKeyPressed.bind(this),
				keydown: this.onSearchTextEditKeyDown.bind(this),
				keyup: this.onSearchTextEditKeyUp.bind(this)
			},
			placeholder: resources.SearchTextEditPlaceholder,
			markerValue: "SearchTextEdit"
		});
		var searchInfoLabel = Ext.create("Terrasoft.Label", {
			id: this.id + "-search-info-label",
			caption: {
				bindTo: "SearchInfo"
			},
			classes: {
				labelClass: ["search-info-label"]
			},
			visible: {
				bindTo: "IsItemsFound"
			},
			markerValue: "SearchInfoLabel"
		});
		var searchErrorInfoLabel = Ext.create("Terrasoft.Label", {
			id: this.id + "-search-error-info-label",
			caption: {
				bindTo: "SearchErrorInfo"
			},
			classes: {
				labelClass: ["search-info-label", "search-error-info-label"]
			},
			visible: {
				bindTo: "FoundItems",
				bindConfig: {
					converter: function(items) {
						return items && items.isEmpty();
					}
				}
			},
			markerValue: "SearchErrorInfoLabel"
		});
		var searchPreviousButton = Ext.create("Terrasoft.Button", {
			id: this.id + "-search-previous-btn",
			classes: {
				wrapperClass: buttonWrapperClass + "search-previous-button"
			},
			click: {
				bindTo: "onSearchPreviousButtonClick"
			},
			visible: {
				bindTo: "IsItemsFound"
			},
			hint: Terrasoft.Resources.SchemaDesigner.SearchPreviousButtonHint,
			markerValue: "SearchPreviousButton"
		});
		var searchNextButton = Ext.create("Terrasoft.Button", {
			id: this.id + "-search-next-btn",
			classes: {
				wrapperClass: buttonWrapperClass + "search-next-button"
			},
			click: {
				bindTo: "onSearchNextButtonClick"
			},
			visible: {
				bindTo: "IsItemsFound"
			},
			hint: Terrasoft.Resources.SchemaDesigner.SearchNextButtonHint,
			markerValue: "SearchNextButton"
		});
		var searchButton = Ext.create("Terrasoft.Button", {
			id: this.id + "-search-btn",
			classes: {
				wrapperClass: buttonWrapperClass + "search-button"
			},
			click: {
				bindTo: "onSearchButtonClick"
			},
			hint: Terrasoft.Resources.SchemaDesigner.SearchButtonHint,
			markerValue: "SearchButton"
		});
		var searchHideButton = Ext.create("Terrasoft.Button", {
			id: this.id + "-search-hide-btn",
			classes: {
				wrapperClass: buttonWrapperClass + "search-hide-button"
			},
			click: {
				bindTo: "onSearchHideButtonClick"
			},
			hint: Terrasoft.Resources.SchemaDesigner.SearchHideButtonHint,
			markerValue: "SearchHideButton"
		});
		var searchToolsContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-search-tools-container",
			classes: {
				wrapClassName: ["search-tools-container"]
			},
			items: [
				searchInfoLabel,
				searchErrorInfoLabel,
				searchPreviousButton,
				searchNextButton,
				searchButton,
				searchHideButton
			]
		});
		return Ext.create("Terrasoft.Container", {
			id: this.id + "-search-container",
			classes: {
				wrapClassName: ["search-container"]
			},
			visible: {
				bindTo: "IsSearchVisible"
			},
			items: [
				searchTextEdit,
				searchToolsContainer
			]
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createToolbarContainer
	 * @override
	 */
	createToolbarContainer: function() {
		var toolbar = this.callParent(arguments);
		var leftToolbar = this.createToolbarLeftContainer();
		var rightToolbar = this.createToolbarRightContainer();
		toolbar.add(leftToolbar);
		toolbar.add(rightToolbar);
		return toolbar;
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#renderDesignContainer
	 * @override
	 */
	renderDesignContainer: function() {
		this.callParent(arguments);
		var designerViewModel = this.designerViewModel;
		designerViewModel.on("itemschanged", this.onProcessSchemaItemAdd, this);
		designerViewModel.on("itemCaptionChanged", this.onItemCaptionChanged, this);
		designerViewModel.on("itemIsValidChanged", this.onItemIsValidChanged, this);
		designerViewModel.on("clearSelection", this.onClearSelection, this);
		designerViewModel.on("itemSelected", this.onItemSelected, this);
		designerViewModel.on("updateItemsHighlighter", this.onUpdateItemsHighlighter, this);
		designerViewModel.on("change:IsSearchVisible", this.onIsSearchVisibleChange, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#initDesignerManagers
	 * @override
	 */
	initDesignerManagers: function(callback, scope) {
		this.callParent([function() {
			Terrasoft.ProcessFlowElementSchemaManager.initialize(function() {
				callback.call(scope);
			});
		}, this]);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#onAfterDesignerRender
	 * @override
	 */
	onAfterDesignerRender: function() {
		this.callParent(arguments);
		this.preloadDragImages();
	},

	/**
	 * Preload images which used for dragging.
	 * @private
	 */
	preloadDragImages: function() {
		var managerItemsCollection = Terrasoft.ProcessFlowElementSchemaManager.getItems();
		if (managerItemsCollection.isEmpty()) {
			return;
		}
		var flowItems = managerItemsCollection.getItems();
		Terrasoft.chain.apply(this, flowItems.map(function(item) {
			return function(next) {
				item.getInstance(function(instance) {
					this.preloadDragImage(instance, next);
				}, this);
			};
		}, this));
	},

	/**
	 * Preload drag image for instance of ProcessFlowElementSchema.
	 * @private
	 * @param {Terrasoft.ProcessFlowElementSchema} instance Schema instance.
	 * @param {Function} callback Callback function.
	 */
	preloadDragImage: function(instance, callback) {
		if (instance.getDragImage) {
			var image = new Image();
			image.onload = callback;
			image.onerror = function() {
				if (Terrasoft.isDebug) {
					var template = "Drag image not found for schema '{0}'. Source url: {1}";
					var errorMessage = Ext.String.format(template, instance.$className, image.src);
					this.error(errorMessage);
				}
				callback();
			};
			var imageConfig = instance.getDragImage();
			image.src = Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
		} else {
			callback();
		}
	},

	/**
	 * Toggles left panel collapse state and only collapse when argument doCollapse is true.
	 * @private
	 * @param {Boolean} [doCollapse] Collapse left panel.
	 */
	toggleLeftPanel: function(doCollapse) {
		var collapseClass = this.leftPanelCollapseClass;
		var wrapEl = this.leftPanel.wrapEl;
		if (doCollapse !== undefined) {
			if (doCollapse) {
				wrapEl.addCls(collapseClass);
			} else {
				wrapEl.removeCls(collapseClass);
			}
		} else {
			wrapEl.toggleCls(collapseClass);
		}
		this.leftPanelCollapsed = wrapEl.hasCls(collapseClass);
		window.localStorage.setItem(this.storageLeftPanelCollapsed, this.leftPanelCollapsed);
		var leftPanelCloseAnimationDuration = 1000;
		setTimeout(function() {
			this.onDesignContentSizeChanged();
		}.bind(this), leftPanelCloseAnimationDuration);
	},

	/**
	 * Handler for LeftPanelHeaderButton click. Toggle collapsed class.
	 */
	onLeftPanelHeaderButtonClick: function() {
		this.toggleLeftPanel();
	},

	/**
	 * Returns classes for left panel container.
	 * @private
	 * @return {Object}
	 */
	getLeftPanelClasses: function() {
		var classes = ["schema-designer-left-panel"];
		var doCollapse = (window.localStorage.getItem(this.storageLeftPanelCollapsed) === "true") || false;
		if (doCollapse) {
			classes.push(this.leftPanelCollapseClass);
		}
		return {
			wrapClassName: classes
		};
	},

	/**
	 * Creates process diagram control.
	 * @private
	 * @return {Terrasoft.ProcessSchemaDiagram}
	 */
	createDiagram: function() {
		var config = Ext.apply({}, this.diagramConfig, {id: this.id});
		var diagram = this.diagram = Ext.create(this.schemaDiagramClassName, config);
		diagram.on("click", this.onElementClick, this);
		diagram.on("doubleClick", this.onElementDoubleClick, this);
		return diagram;
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createDesignContainer
	 * Creates the left panel with design elements.
	 * @override
	 */
	createDesignContainer: function() {
		var designMainContainer = this.callParent(arguments);
		var leftPanel = this.leftPanel = Ext.create("Terrasoft.Container", {
			id: this.id + "-left-panel",
			classes: this.getLeftPanelClasses()
		});
		var leftPanelHeaderButton = Ext.create("Terrasoft.Button", {
			id: this.id + "-left-panel-header-button",
			style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
			classes: "schema-designer-left-panel-header-button",
			caption: this.leftToolbarHeaderButtonCaption,
			markerValue: "CollapseToolbar",
			onClick: this.onLeftPanelHeaderButtonClick.bind(this)
		});
		var leftToolBar = this.leftToolBar = Ext.create(this.leftToolbarClassName, {
			id: this.id + "-left-toolbar",
			designer: this,
			itemDrop: {
				bindTo: "onItemDrop"
			}
		});
		leftPanel.add(leftPanelHeaderButton);
		leftPanel.add(leftToolBar);
		leftToolBar.initToolbarItems();
		this.contentContainer.insert(leftPanel, 0);
		var diagram = this.createDiagram();
		this.diagramContainer.add(diagram);
		return designMainContainer;
	},

	/**
	 * Handler add event element to the diagram.
	 */
	onProcessSchemaItemAdd: function() {
		Ext.get("diagram-" + this.id).focus();
	},

	/**
	 * Click event handler on an element in the design process.
	 * @private
	 */
	onElementClick: function() {
		this.focusDesigner();
	},

	/**
	 * The event handler by double-clicking an element in the design process.
	 * @private
	 */
	onElementDoubleClick: function() {
		this.diagram.updatePageSize();
	},

	/**
	 * Processor title change event process element.
	 * @private
	 */
	onItemCaptionChanged: function(item) {
		var nodeName = item.name;
		var caption = item.caption ? item.caption.getValue() || "" : "";
		var captionPrefix = item.notValidCaptionPrefix;
		this.diagram.setNodeCaption(nodeName, caption, captionPrefix);
	},

	/**
	 * Processor isValid change event process element.
	 * @private
	 */
	onItemIsValidChanged: function(item) {
		var nodeName = item.name;
		var itemCaption = item.caption ? item.caption.getValue() : "";
		var caption = item.getLabelText(itemCaption, item.isValid);
		var fontColor = item.getLabelFontColor(item.isValid);
		this.diagram.setNodeCaptionWithColor(nodeName, caption, fontColor);
	},

	/**
	 * Handler for CopyElement menu item click.
	 * @private
	 */
	onCopyElementClick: function(menuItem) {
		this.diagram.copyElement();
		menuItem.parentMenu.hide();
	},

	/**
	 * Handler for PasteElement menu item click.
	 * @private
	 */
	onPasteElementClick: function(menuItem) {
		this.diagram.pasteElement();
		menuItem.parentMenu.hide();
	},

	/**
	 * Handler for clearSelection event.
	 * @private
	 */
	onClearSelection: function() {
		this.diagram.clearSelection();
	},

	/**
	 * Handler for itemSelected event.
	 * @private
	 */
	onItemSelected: function(itemName) {
		this.diagram.selectItem(itemName);
	},

	/**
	 * Handler for change of attribute IsSearchVisible of designer view model.
	 * @private
	 */
	onIsSearchVisibleChange: function(model, value) {
		if (value) {
			var el = this.searchTextEdit.getEl();
			el.focus();
			if (el && el.dom) {
				el.dom.select();
			}
		}
	},

	/**
	 * Handler for press "ENTER" key in the SearchTextEdit control.
	 * @private
	 */
	onSearchTextEditEnterKeyPressed: function() {
		this.designerViewModel.onSearchButtonClick();
	},

	/**
	 * Handler for KeyDown event on SearchTextEdit control.
	 * @private
	 * @param {Object} control Control.
	 * @param {Object} event Event object.
	 */
	onSearchTextEditKeyDown: function(control, event) {
		var viewModel = this.designerViewModel;
		if (event.keyCode === event.ESC) {
			event.preventDefault();
			viewModel.onSearchHideButtonClick();
			return;
		}
		if (event.shiftKey && (event.keyCode === event.ENTER || event.keyCode === event.F3)) {
			event.preventDefault();
			viewModel.searchPreviousItem();
			return;
		}
		if (!event.shiftKey && event.keyCode === event.F3) {
			event.preventDefault();
			viewModel.onSearchButtonClick();
		}
	},

	/**
	 * Handler for KeyUp event on SearchTextEdit control.
	 * @private
	 * @param {Object} control Control.
	 */
	onSearchTextEditKeyUp: function(control) {
		var value = control.getTypedValue();
		control.changeValue(value);
	},

	/**
	 * Handler for highlight items on diagram
	 * @param {Terrasoft.Collection} selectedItems Diagram items for highlight.
	 * @param {String} selectedItemName The name of selected item.
	 */
	onUpdateItemsHighlighter: function(selectedItems, selectedItemName) {
		this.diagram.updateItemsHighlighter(selectedItems, selectedItemName);
	}

});
