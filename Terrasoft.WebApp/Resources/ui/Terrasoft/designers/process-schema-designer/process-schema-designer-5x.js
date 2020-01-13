/**
 */
Ext.define("Terrasoft.Designers.ProcessSchemaDesigner5X", {
	extend: "Terrasoft.BaseSchemaDesigner",
	alternateClassName: "Terrasoft.ProcessSchemaDesigner5X",

	/**
	 * Process diagram.
	 * @type {Terrasoft.ProcessSchemaDiagram}
	 * @private
	 */
	diagram: null,

	/**
	 * Designer ViewModel.
	 * @type {Terrasoft.BaseViewModel}
	 * @private
	 */
	designerViewModel: null,

	init: function() {
		Terrasoft.ClientUnitSchemaManager.initialize = function(callback, scope) {
			callback.call(scope);
		};
		this.callParent(arguments);
	},

	/**
	 * Returns element image config.
	 * @param {String} imageName Image name.
	 * @private
	 * @return {Object} Element image config.
	 */
	getImageConfig: function(imageName) {
		return {
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: "Terrasoft.Nui",
				resourceItemName: imageName
			}
		};
	},

	/**
	 * Render design container.
	 * @private
	 */
	renderDesignContainer: function() {
		var designContainer = this.designContainer = this.createDesignContainer();
		var designerViewModel = this.designerViewModel = this.createDesignerViewModel();
		designContainer.render(this.renderTo);
		designContainer.bind(designerViewModel);
		designerViewModel.on("initialized", function() {
			this.fireEvent("loadcomplete", this);
		}, this);
		designerViewModel.on("itemschanged", this.onProcessSchemaItemAdd, this);
		designerViewModel.on("itemChanged", this.onItemChanged, this);
		designerViewModel.on("itemSelected", this.onProcessSchemaItemSelected, this);
		designerViewModel.init();
	},

	createDesignerViewModel: function() {
		return Ext.create("Terrasoft.ProcessSchemaDesignerViewModel5X", {
			sandbox: this.sandbox,
			id: this.id,
			values: {
				SchemaUId: this.schemaUId
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#render
	 */
	render: function(config) {
		this.renderTo = config.renderTo;
		Terrasoft.ProcessFlowElementSchemaManager.initialize(this.renderDesignContainer, this);
		var body = Ext.getBody();
		body.set({"maskState": "none"});
	},

	/**
	 * Creates the left panel with design elements, as well as a container for the properties of the item editor.
	 */
	createDesignContainer: function() {
		var designMainContainer = this.callParent(arguments);
		var diagram = this.diagram = Ext.create("Terrasoft.ProcessSchemaDiagram5X", {
			id: this.id,
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
			itemsRemoving: {
				bindTo: "onItemsRemoving"
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
			}
		});
		diagram.on("doubleClick", this.onElementDoubleClick, this);
		diagram.on("mouseMove", this.onDiagramMouseMove, this);
		diagram.on("mouseUp", this.onDiagramMouseUp, this);
		var diagramContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-diagram-ct",
			classes: {
				wrapClassName: ["diagram", "ts-box-sizing"]
			},
			items: [
				diagram
			]
		});
		var contentContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-content",
			classes: {
				wrapClassName: ["content", "ts-box-sizing"]
			},
			items: [
				diagramContainer
			]
		});
		designMainContainer.add(contentContainer);
		return designMainContainer;
	},

	/**
	 * Handler add event element to the diagram.
	 */
	onProcessSchemaItemAdd: function() {
		Ext.get("diagram-" + this.id).focus();
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#onGetElementData
	 * @override
	 */
	onGetElementData: function(name) {
		return this.designerViewModel.getItemByName(name);
	},

	/**
	 * Click event handler on an element in the design process.
	 * @private
	 */
	onElementClick: function() {
	},

	/**
	 * The event handler by double-clicking an element in the design process.
	 * @private
	 */
	onElementDoubleClick: function() {
		this.diagram.updatePageSize();
	},

	/**
	 * The event handler changes the process element.
	 * @param {Object} item The element, which property has changed.
	 * @param {Object} changes The object changes.
	 * @private
	 */
	onItemChanged: function(item, changes) {
		var diagram = this.diagram;
		var diagramInstance = diagram.getInstance();
		var element = diagram.getElementById(item.name);
		if (!element) {
			return;
		}
		if (changes.hasOwnProperty("caption")) {
			var localizableCaption = item.caption;
			var caption = (localizableCaption == null) ? "" : localizableCaption.getValue();
			diagram.setNodeCaption(item.name, caption);
		}
		if (changes.hasOwnProperty("targetRefUId")) {
			var model = this.designerViewModel;
			var schema = model.get("Schema");
			var target = schema.findItemByUId(item.targetRefUId);
			if (target) {
				element.targetNode = target.name;
				ej.Diagram.Util.dock(element, diagramInstance.nameTable);
				diagramInstance.updateConnector(element.name, {});
				var targetElement = diagram.getElementById(target.name);
				targetElement.inEdges.push(element.name);
				diagramInstance.updateNode(target.name, {});
			}
		}
	},

	/**
	 * The event handler edit the selected item.
	 * @private
	 */
	onProcessSchemaItemSelected: function(itemName) {
		var diagram = this.diagram;
		var element = diagram.getElementById(itemName);
		if (element) {
			var selectedItem = diagram.getSelectedItem();
			if (selectedItem && (selectedItem.type === "pseudoGroup" || selectedItem.name === element.name)) {
				return;
			}
			diagram.setSelection(element);
		}
	},

	/**
	 * Handler move the mouse.
	 */
	onDiagramMouseMove: function(e) {
		var model = this.designerViewModel;
		if (model.appendMode) {
			if (!model.newElement) {
				model.newElement = this.addNewElement(e);
			}
			this.moveNewElement(e);
		}
	},

	/**
	 * The handler release the mouse button.
	 */
	onDiagramMouseUp: function(e) {
		var model = this.designerViewModel;
		if (model.appendMode) {
			model.appendMode = false;
			if (!model.newElement) {
				this.addNewElement(e);
			} else {
				model.newElement = null;
			}
		}
		var selectedItem = this.diagram.getSelectedItem();
		if (selectedItem && selectedItem.type !== "pseudoGroup") {
			var item = model.get("Items").find(selectedItem.name);
			if (item && item.showPropertiesWindowOnAdding) {
				item.showPropertiesWindowOnAdding = false;
				model.postElementDoubleClick(item);
			}
		}
	},

	/**
	 * Adding a new element on the chart by moving the cursor after clicking in the toolbar.
	 */
	addNewElement: function(e) {
		var model = this.designerViewModel;
		var diagram = this.diagram;
		var schema = model.get("Schema");
		var newElement = schema.createItemInstance({
			managerItemUId: model.newElementManagerItemUId
		});
		newElement.uId = Terrasoft.generateGUID();
		model.onGenerateItemNameAndCaption(newElement);
		var offSet = diagram.getOffsetMousePosition(e);
		newElement.position = {
			X: offSet.x,
			Y: offSet.y
		};
		var dropContainer = diagram.findTargetLane(offSet);
		var container = schema.findItemByName(dropContainer.name);
		newElement.containerUId = container.uId;
		newElement.parent = container.name;
		if (!newElement.preventShowPropertiesWindowOnAdding) {
			newElement.showPropertiesWindowOnAdding = true;
		}
		model.get("Items").add(newElement.name, newElement);
		var diagramInstance = diagram.getInstance();
		diagramInstance._clearSelection();
		diagramInstance.activateTool("move");
		diagramInstance.activeTool.inAction = true;
		var element = diagram.getElementById(newElement.name);
		diagramInstance.activeTool.newObject = element;
		return newElement;
	},

	/**
	 * Move the cursor over the item that is added.
	 */
	moveNewElement: function(e) {
		var model = this.designerViewModel;
		var diagram = this.diagram;
		var element = diagram.getElementById(model.newElement.name);
		var offSet = diagram.getOffsetMousePosition(e);
		element.offsetX = offSet.x;
		element.offsetY = offSet.y;
		var diagramInstance = diagram.getInstance();
		ej.Diagram.DiagramContext.update(element, diagramInstance);
		var tool = diagramInstance.activeTool;
		if (tool && tool.name === "move" && !tool.inAction) {
			diagramInstance._clearSelection();
			tool.inAction = true;
			tool.newObject = element;
		}
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
	}

});
