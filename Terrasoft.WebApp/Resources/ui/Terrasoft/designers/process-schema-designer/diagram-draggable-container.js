/**
 */
Ext.define("Terrasoft.controls.DiagramDraggableContainer", {
	alternateClassName: "Terrasoft.DiagramDraggableContainer",
	extend: "Terrasoft.DraggableContainer",

	/**
	 * @inheritdoc Terrasoft.Draggable#dragActionsCode
	 */
	dragActionsCode: 1,

	/**
	 * @inheritdoc Terrasoft.Draggable#dragCopy
	 * @override
	 */
	dragCopy: true,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#showDropZoneHint
	 * @override
	 */
	showDropZoneHint: true,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#clickPixelThresh
	 * @override
	 */
	clickPixelThresh: 0,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#clickTimeThresh
	 * @override
	 */
	clickTimeThresh: 0,

	/**
	 * Draggable container template.
	 * @protected
	 * @type {String[]}
	 */
	dragItemTpl: [
		"<div style=\"width:{width}px; height:{height}px; text-align:center;\">",
		"<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" preserveAspectRatio=\"none\" " +
		"width=\"{width}px\" height=\"{height}px\" viewBox=\"0 0 {width} {height}\">",
		"<g class=\"ej-d-node\" visibility=\"visible\">",
		"<image width=\"{width}\" height=\"{height}\" opacity=\"1\" xlink:href=\"{imageUrl}\"" +
		" xmlns:xlink=\"http://www.w3.org/1999/xlink\"></image>",
		"</g>",
		"</svg>",
		"</div>"
	],

	/**
	 * @inheritdoc Terrasoft.core.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents("onDragDrop", "onInvalidDrop", "b4Drag", "onDrag", "onDragOver");
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
	 * @override
	 */
	getDraggableConfig: function() {
		var draggableConfig = {};
		draggableConfig[Terrasoft.DragAction.MOVE] = {
			handlers: {
				onDragDrop: function(event, dropZones) {
					var diagram = this.getDiagram(dropZones);
					var position = this.getMousePosition(event);
					position = this.applyDiagramWrapOffset(diagram, position);
					this.dropElement(diagram, position);
					this.reRender();
				},
				onInvalidDrop: function() {
					this.reRender();
				},
				b4Drag: function(event) {
					var dragObject = this.getCurrentDragObject();
					var element = this.tag.element;
					var position = this.getMousePosition(event);
					this.shiftStartDragObjectPosition(dragObject, element, position);
				},
				onDrag: function(event) {
					var position = this.getMousePosition(event);
					var element = this.tag.element;
					var nodeStyle = this.getNodeStyleCenterConfig(position, element);
					var dragObject = this.getCurrentDragObject();
					this.applyDragNodeStyle(dragObject, nodeStyle);
				},
				onDragOver: function(event, dropZones) {
					var diagram = this.getDiagram(dropZones);
					var element = this.tag.element;
					this.selectDragOverConnector(diagram, element);
				}
			}
		};
		return draggableConfig;
	},

	/**
	 * Returns dropped diagram.
	 * @param {Ext.Element[]} dropZones Drop zone elements array.
	 * @private
	 * @return {Terrasoft.ProcessSchemaDiagram}
	 * }}
	 */
	getDiagram: function(dropZones) {
		return dropZones[0].droppableInstance;
	},

	/**
	 * Returns event mouse position.
	 * @param {Object} event Drag event.
	 * @private
	 * @return {{x: Number, y: Number}}
	 */
	getMousePosition: function(event) {
		return {
			x: event.getPageX(),
			y: event.getPageY()
		};
	},

	/**
	 * Returns new position applying diagram wrap container offsets and container scroll position.
	 * @param {Terrasoft.ProcessSchemaDiagram} diagram Diagram.
	 * @param {Object} position Mouse position.
	 * @param {Number} position.x Horizontal coordinate.
	 * @param {Number} position.y Vertical coordinate.
	 * @private
	 * @return Object{x: Number, y: Number} Relative mouse position.
	 */
	applyDiagramWrapOffset: function(diagram, position) {
		var diagramWrapEl = diagram.getWrapEl();
		var rect = diagramWrapEl.dom.getBoundingClientRect();
		var container = $("#" + diagram.renderToSelector);
		return {
			x: position.x - rect.left + container.scrollLeft(),
			y: position.y - rect.top + container.scrollTop()
		};
	},

	/**
	 * Drop element to diagram.
	 * @param {Terrasoft.ProcessSchemaDiagram} diagram Diagram.
	 * @param {Object} position Mouse position.
	 * @param {Number} position.x Horizontal coordinate.
	 * @param {Number} position.y Vertical coordinate.
	 * @private
	 */
	dropElement: function(diagram, position) {
		var targetContainer = diagram.findContainerAtPosition(position);
		if (!targetContainer) {
			return;
		}
		var config = {
			element: this,
			containerName: targetContainer.name,
			localX: position.x,
			localY: position.y
		};
		if (targetContainer.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Lane) {
			var containerBounds = diagram.getItemBounds(targetContainer);
			config.localX -= containerBounds.x;
			config.localY -= containerBounds.y;
		}
		if (this.fireEvent("onDragDrop", config) === false) {
			var diagramInstance = diagram.getInstance();
			var node = diagramInstance.selectionList[0];
			var canConnect = node && (node.toolsConstraint & Terrasoft.diagram.ToolsConstraint.ConnectionEditTool);
			var segment = diagramInstance.selectedSegment;
			if (canConnect && segment) {
				diagram.dropNodeToConnector(node, segment, diagramInstance, position, false);
				diagram.updateNodeConnectors(node, diagramInstance, true);
				Terrasoft.ProcessSchemaDiagram.updateSelectedConnector(null, diagramInstance);
			}
		}
	},

	/**
	 * Apply shift drag object position for element center.
	 * @param {Ext.dd.DragDrop} dragObject Drag object.
	 * @param {Terrasoft.ProcessFlowElementSchema} element Process element schema.
	 * @param {Object} position Mouse position.
	 * @param {Number} position.x Horizontal coordinate.
	 * @param {Number} position.y Vertical coordinate.
	 * @private
	 */
	shiftStartDragObjectPosition: function(dragObject, element, position) {
		dragObject.deltaX = element.width / 2;
		dragObject.deltaY = element.height / 2;
		dragObject.setDragElPos(position.x, position.y);
	},

	/**
	 * Apply style for drag node.
	 * @param {Ext.dd.DragDrop} dragObject Drag object.
	 * @param {Object} nodeStyle Node style.
	 * @param {String} nodeStyle.left Left node style.
	 * @param {String} nodeStyle.top Top node style.
	 * @private
	 */
	applyDragNodeStyle: function(dragObject, nodeStyle) {
		var dragNode = dragObject.getDragEl();
		dragNode.style.left = nodeStyle.left;
		dragNode.style.top = nodeStyle.top;
	},

	/**
	 * Returns the DragDrop object that is currently being dragged.
	 * @private
	 * @return {Ext.dd.DragDrop}
	 */
	getCurrentDragObject: function() {
		return Ext.dd.DragDropManager.dragCurrent;
	},

	/**
	 * Returns new position style for element center.
	 * @param {Object} position Mouse position.
	 * @param {Number} position.x Horizontal coordinate.
	 * @param {Number} position.y Vertical coordinate.
	 * @param {Terrasoft.ProcessFlowElementSchema} element Process element schema.
	 * @private
	 * @return {{left: string, top: string}}
     */
	getNodeStyleCenterConfig: function(position, element) {
		var offsetLeft = position.x - element.width / 2;
		var offsetTop = position.y - element.height / 2;
		return {
			left: offsetLeft + "px",
			top: offsetTop + "px"
		};
	},

	/**
	 * Returns current drag element rect.
	 * @private
	 * @return {ClientRect}
	 */
	getCurrentDragElementRect: function() {
		var dragObject = this.getCurrentDragObject();
		var dragNode = dragObject.getDragEl();
		var dragImage = dragNode.querySelector("svg");
		return dragImage.getBoundingClientRect();
	},

	/**
	 * Returns new position with diagram wrap container offsets.
	 * @param {Terrasoft.ProcessSchemaDiagram} diagram Diagram.
	 * @param {Terrasoft.ProcessFlowElementSchema} element Process element schema.
	 * @private
	 */
	selectDragOverConnector: function(diagram, element) {
		var segment;
		var canConnect = element.toolsConstraint & Terrasoft.diagram.ToolsConstraint.ConnectionEditTool;
		if (canConnect) {
			var dragImageRect = this.getCurrentDragElementRect();
			var position = {
				x: dragImageRect.left,
				y: dragImageRect.top
			};
			position = this.applyDiagramWrapOffset(diagram, position);
			var dragRect = {
				x: position.x,
				y: position.y,
				height: dragImageRect.height,
				width: dragImageRect.width
			};
			segment = diagram.findSegmentAtRect(dragRect);
		}
		var diagramInstance = diagram.getInstance();
		Terrasoft.ProcessSchemaDiagram.updateSelectedConnector(segment, diagramInstance);
	},

	/**
	 * Returns elements html for draggable action.
	 * @private
	 * @return {String} Item html.
	 */
	getItemHtml: function() {
		var element = this.tag.element;
		var image = element.getDragImage();
		var iconUrl = Terrasoft.ImageUrlBuilder.getUrl(image);
		var tplData = {
			imageUrl: iconUrl,
			width: element.width,
			height: element.height
		};
		var tpl = new Ext.XTemplate(this.dragItemTpl);
		return tpl.apply(tplData);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#createDraggableClone
	 * @override
	 */
	createDraggableClone: function() {
		var clone = this.mixins.draggable.createDraggableClone.apply(this, arguments);
		clone.classList.remove("toolbar-item");
		clone.innerHTML = this.getItemHtml();
		return clone;
	}
});
