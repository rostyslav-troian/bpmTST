/**
 * The class implements the display of the process elements on the diagram.
 */
Ext.define("Terrasoft.ProcessDesigner.ProcessSchemaDiagram", {
	extend: "Terrasoft.Diagram",
	alternateClassName: "Terrasoft.ProcessSchemaDiagram",

	statics: {

		/**
		 * Stores a link to the current instance of the designer.
		 * @type {Terrasoft.ProcessSchemaDiagram}
		 * @protected
		 */
		instance: null,

		/**
		 * Returns the current instance of the designer.
		 * @protected
		 * @return {Terrasoft.ProcessSchemaDiagram}
		 */
		getDiagramInstance: function() {
			return this.instance;
		},

		/**
		 * The flag is a sign that TsDiagramModule has already been customized.
		 * @type {Boolean}
		 * @private
		 */
		getNodeBoundsCustomized: false,

		/**
		 * Overlaps the logic for obtaining the position and dimensions of the element on the diagram.
		 * @private
		 */
		customizeGetNodeBounds: function() {
			if (this.getNodeBoundsCustomized === true) {
				return;
			}
			var baseBounds = ej.Diagram.Util.bounds;
			ej.Diagram.Util.bounds = function(node) {
				var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
				var nodeBounds = baseBounds(node);
				var nodeRectangle = ej.Diagram.Rectangle(nodeBounds.x, nodeBounds.y, nodeBounds.width, nodeBounds.height);
				var nodePosition = ej.Diagram.Point(nodeBounds.x, nodeBounds.y);
				var parentNode = self.getElementById(node.parent);
				if (parentNode && parentNode.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Lane) {
					var parentNodeRectangle = ej.Diagram.Util.bounds(parentNode);
					nodePosition = ej.Diagram.Geometry.translate(nodePosition,
						parentNodeRectangle.x, parentNodeRectangle.y);
					nodeRectangle.x = nodePosition.x;
					nodeRectangle.y = nodePosition.y;
					return baseBounds(nodeRectangle);
				}
				return nodeBounds;
			};
			this.getNodeBoundsCustomized = true;
		},

		/**
		 * Indicates that ResizeTool has already been customized.
		 * @type {Boolean}
		 * @private
		 */
		resizeToolCustomized: false,

		/**
		 * Overlaps the logic for drawing a frame and resizing a chart element.
		 */
		customizeResizeTool: function() {
			if (this.resizeToolCustomized === true) {
				return;
			}
			var svgContext = ej.Diagram.SvgContext;
			/*jslint bitwise: true */
			svgContext._renderResizeHandle = function(node, svg, scale) {
				if (node.constraints & ej.Diagram.SelectorConstraints.Resizer && node.type === "pseudoGroup") {
					svgContext._renderResizeBorder("resizeBorder", node, svg, scale);
				}
				if (node.constraints & ej.Diagram.NodeConstraints.Resize) {
					this._renderResizeCorner("n-resize", node, (node.width / 2) * scale, 0, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeNorth));
					this._renderResizeCorner("ne-resize", node, node.width * scale, 0, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeNorthEast));
					this._renderResizeCorner("w-resize", node, 0, (node.height / 2) * scale, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeWest));
					this._renderResizeCorner("e-resize", node, node.width * scale, (node.height / 2) * scale, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeEast));
					this._renderResizeCorner("sw-resize", node, 0, node.height * scale, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeSouthWest));
					this._renderResizeCorner("s-resize", node, (node.width / 2) * scale, node.height * scale, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeSouth));
					this._renderResizeCorner("se-resize", node, node.width * scale, node.height * scale, svg,
						!(node.constraints & ej.Diagram.NodeConstraints.ResizeSouthEast));
				}
			};
			/*jslint bitwise: false */
			svgContext._renderResizeBorder = function(id, node, svg, scale) {
				var handle = svg.getElementById(svg.document.id + "handle_g");
				var rect = svg.rect({
					"id": id,
					"width": node.width * scale,
					"height": node.height * scale,
					"stroke": node.borderColor ? node.borderColor : "#097F7F",
					"stroke-width": 1,
					"stroke-dasharray": "6,3",
					"fill": "none"
				});
				handle.appendChild(rect);
			};
			/*jslint bitwise: true */
			svgContext._updateResizeHandle = function(node, svg, scale) {
				if (node.constraints & ej.Diagram.NodeConstraints.Resize || node.type === "pseudoGroup") {
					this._updateResizeCorner("n-resize", (node.width / 2) * scale, 0, svg);
					this._updateResizeCorner("ne-resize", node.width * scale, 0, svg);
					this._updateResizeCorner("w-resize", 0, (node.height / 2) * scale, svg);
					this._updateResizeCorner("e-resize", node.width * scale, (node.height / 2) * scale, svg);
					this._updateResizeCorner("sw-resize", 0, node.height * scale, svg);
					this._updateResizeCorner("s-resize", (node.width / 2) * scale, node.height * scale, svg);
					this._updateResizeCorner("se-resize", node.width * scale, node.height * scale, svg);
					this._updateResizeBorder("resizeBorder", node, svg, scale);
				}
			};
			/*jslint bitwise: false */
			var baseResizeToolMouseUp = ej.Diagram.ResizeTool.prototype.mouseup;
			ej.Diagram.ResizeTool.prototype.mouseup = function(evt) {
				var item = this.selectedObject || this.diagram.selectionList[0];
				baseResizeToolMouseUp.apply(this, arguments);
				evt.stopPropagation();
				var bounds = ej.Diagram.Util.bounds(item);
				var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
				self.fireEvent("sizeChanged", {
					itemName: item.name,
					size: {
						width: bounds.width,
						height: bounds.height
					}
				});
			};
			var baseResizeToolMouseMove = ej.Diagram.ResizeTool.prototype.mousemove;
			ej.Diagram.ResizeTool.prototype.mousemove = function(evt) {
				var container = this.selectedObject;
				if (container && container.isContainer === true) {
					var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
					var contentBounds = self.getContainerContentRectangle(container, true);
					var containerBounds = ej.Diagram.Util.bounds(container);
					var isResizeAvailable = true;
					if (contentBounds) {
						var currentPoint = this.mousePosition(evt);
						var expectedContainerBounds = self.calculateExpectedContainerRectangle(containerBounds,
							currentPoint, this._resizeDirection);
						var contentOffsetX = contentBounds.x - containerBounds.x;
						var contentOffsetY = contentBounds.y - containerBounds.y;
						if (expectedContainerBounds.x !== containerBounds.x) {
							contentBounds.x = expectedContainerBounds.x + contentOffsetX;
						}
						if (expectedContainerBounds.y !== containerBounds.y) {
							contentBounds.y = expectedContainerBounds.y + contentOffsetY;
						}
						isResizeAvailable = ej.Diagram.Geometry.containsRect(expectedContainerBounds, contentBounds);
					}
					if (isResizeAvailable) {
						baseResizeToolMouseMove.apply(this, arguments);
					}
					self.updateNodeConnectors(container, this.diagram);
				}
			};
			svgContext._updateResizeCorner = function(corner, cx, cy, svg) {
				var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
				var attr = {
					"id": corner,
					"cx": cx,
					"cy": cy,
					"stroke": self.connectorPortColor,
					"r": 3.5
				};
				svg.circle(attr);
				var transparentAttr = {
					"id": corner + "_transparent",
					"cx": cx,
					"cy": cy
				};
				svg.circle(transparentAttr);
			};
			svgContext._renderResizeCorner = function(corner, node, cx, cy, svg, state) {
				var handle = svg.getElementById(svg.document.id + "handle_g");
				var pEvnts = "default";
				var fill = "white";
				if (!(ej.Diagram.Util.canResize(node))) {
					fill = "darkgray";
				}
				if (state) {
					fill = "darkgray";
					pEvnts = "none";
				}
				var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
				var attr = {
					"id": corner,
					"fill": fill,
					"stroke": self.connectorPortColor,
					"stroke-width": 1,
					"cx": cx,
					"cy": cy,
					"r": 3.5,
					"pointer-events": pEvnts
				};
				handle.appendChild(svg.circle(attr));
				attr = {
					"id": corner + "_transparent",
					"class": corner,
					"fill": "transparent",
					"cx": cx,
					"cy": cy,
					"r": 10,
					"pointer-events": pEvnts
				};
				handle.appendChild(svg.circle(attr));
			};
			this.resizeToolCustomized = true;
		},

		/**
		 * Overrides the logic for moving elements.
		 */
		customizeMoveTool: function() {
			if (this.moveToolCustomized === true) {
				return;
			}
			var baseMoveToolMouseDown = ej.Diagram.MoveTool.prototype.mousedown;
			ej.Diagram.MoveTool.prototype.mousedown = function(evt) {
				baseMoveToolMouseDown.apply(this, arguments);
				var node = this._findNodeUnderMouse(evt);
				if (node) {
					this.mouseDownNode = node;
				}
			};
			var setSelectedObject = function() {
				var selectedObject = this.diagram._selectedSymbol ? this.diagram.selectionList[0] : this.mouseDownNode;
				if (selectedObject) {
					if (this.diagram.selectionList[0] && this.diagram.selectionList[0].type === "pseudoGroup") {
						this.selectedObject = this.diagram.selectionList[0];
					} else {
						if (this.diagram.selectionList[0] !== selectedObject) {
							this.diagram._clearSelection();
							this.selectedObject = this.diagram.nameTable[selectedObject.name];
						} else {
							this.selectedObject = this.diagram.nameTable[this.diagram.selectionList[0].name];
						}
					}
				}
			};
			var setSelectedConnector = function() {
				var diagram = this.diagram;
				var segment;
				var element = this.newObject || this.helper;
				if (element && (element.type === "node")) {
					/*jslint bitwise: true */
					var canConnect = element.toolsConstraint & Terrasoft.diagram.ToolsConstraint.ConnectionEditTool;
					/*jslint bitwise: false */
					var hasConnection = element.inEdges.length === 0 && element.outEdges.length === 0;
					if (canConnect && hasConnection) {
						var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
						var rect = ej.Diagram.Util.bounds(element);
						segment = self.findSegmentAtRect(rect);
					}
				}
				Terrasoft.ProcessSchemaDiagram.updateSelectedConnector(segment, diagram);
			};
			var toolBase = ej.datavisualization.Diagram.ToolBase;
			ej.Diagram.MoveTool.prototype.mousemove = function(evt) {
				toolBase.prototype.mousemove.call(this, evt);
				ej.datavisualization.Diagram.SnapUtil._removeGuidelines(this.diagram);
				if (this._isMouseDown && !this.inAction && !this.selectedObject) {
					setSelectedObject.call(this);
				}
				if (this.selectedObject && ej.datavisualization.Diagram.Util.canSelect(this.selectedObject)) {
					if (!this.inAction) {
						this.inAction = true;
						this.updateCursor("move");
					}
					if (this.diagram && !this.diagram._isEditing) {
						this._containerMouseMove(evt);
						this.previousPoint = this.currentPoint;
					}
				}
				setSelectedConnector.call(this);
			};
			var baseMoveToolUpdateParent = ej.Diagram.MoveTool.prototype._updateParent;
			ej.Diagram.MoveTool.prototype._updateParent = function(object) {
				if (object.type !== "pseudoGroup") {
					baseMoveToolUpdateParent.apply(this, arguments);
				}
			};
			var baseMoveToolChangeNodeState = ej.Diagram.MoveTool.prototype._changeNodeState;
			ej.Diagram.MoveTool.prototype._changeNodeState = function() {
				if (this.selectedObject && this.selectedObject.type === "pseudoGroup" && this.hasSameParent()) {
					this.currentPoint = this.previousPoint;
					this.diffx = 0;
					this.diffy = 0;
					ej.datavisualization.Diagram.SvgContext._enableSelectedNode(this.selectedObject,
						this.diagram._svg, this.diagram);
					ej.datavisualization.Diagram.SvgContext._removeContainerHelper(this.selectedObject,
						this.diagram._svg, this.diagram._adornerLayer);
					this._removeHighLighter();
					this.seletedObject = this.diagram.nameTable[this.selectedObject.name];
					var checkDropEvent = !this._checkForDropEvent(this.hoverNode);
					if (checkDropEvent) {
						this._removeChildParent(this.selectedObject);
						this._addToDiagram();
					}
				} else {
					return baseMoveToolChangeNodeState.apply(this, arguments);
				}
			};
			ej.Diagram.MoveTool.prototype._updateHelperXY = function(shape, startPoint, endPoint) {
				var towardsLeft = endPoint.x < startPoint.x;
				var towardsTop = endPoint.y < startPoint.y;
				var difx = this.diffx + (endPoint.x - startPoint.x);
				var dify = this.diffy + (endPoint.y - startPoint.y);
				var offset;
				/*jslint bitwise: true */
				if (((this.diagram.model.snapSettings.snapConstraints &
						ej.datavisualization.Diagram.SnapConstraints.SnapToHorizontalLines) ||
						(this.diagram.model.snapSettings.snapConstraints &
							ej.datavisualization.Diagram.SnapConstraints.SnapToVerticalLines)) &&
					this.diagram._enableSnapToObject()) {
					offset = ej.datavisualization.Diagram.SnapUtil._snapPoint(this.diagram, this.helper, towardsLeft,
						towardsTop, ej.datavisualization.Diagram.Point(difx, dify), endPoint, startPoint);
				}
				/*jslint bitwise: false */
				if (!offset) {
					offset = ej.datavisualization.Diagram.Point(difx, dify);
				}
				this.diffx = difx - offset.x;
				this.diffy = dify - offset.y;
				if (!ej.datavisualization.Diagram.Geometry.isEmptyPoint(offset)) {
					var args = this._raiseEvent("drag", {
						element: this.helper,
						offset: offset,
						cancel: false
					});
					if (!args.cancel) {
						this.diagram._translate(shape, offset.x, offset.y, this.diagram.nameTable);
						//Optimization. The _updateParent method is called in _endAction

						//this._updateParent(shape);
						//if (shape.type == "group") {
						//	ej.datavisualization.Diagram.Util._updateGroupBounds(shape, this.diagram);
						//}
					}
				}
			};
			var baseMoveToolUpdateObject = ej.Diagram.MoveTool.prototype._updateObject;
			ej.Diagram.MoveTool.prototype._updateObject = function() {
				if (this.selectedObject.type !== "pseudoGroup") {
					return;
				}
				baseMoveToolUpdateObject.apply(this, arguments);
			};
			this.moveToolCustomized = true;
		},

		/**
		 * Repaint selected connector.
		 * @param {Object} segment Selected connector segment.
		 * @param {String} segment.connectorName Selected connector name.
		 * @param {Object} diagram Diagram instance.
		 */
		updateSelectedConnector: function(segment, diagram) {
			var self = Terrasoft.ProcessSchemaDiagram.getDiagramInstance();
			var selectedSegment = diagram.selectedSegment;
			var connectorName = selectedSegment ? selectedSegment.connectorName : null;
			if (segment) {
				if (connectorName === segment.connectorName) {
					return;
				}
				if (selectedSegment) {
					self.changeConnectorSelection(connectorName, false);
				}
				self.changeConnectorSelection(segment.connectorName, true);
				diagram.selectedSegment = segment;
			} else if (selectedSegment) {
				self.changeConnectorSelection(connectorName, false);
				diagram.selectedSegment = null;
			}
		}
	},

	/**
	 * Max label lines count.
	 * @protected
	 */
	maxLabelLinesCount: Terrasoft.getIsRtlMode() ? 1 : 3,

	/**
	 * Regular expression for transfer of signatures by words
	 * @protected
	 */
	wrapTextRegExp: null,

	/**
	 * Indent between tracks.
	 * @private
	 * @type {Number}
	 */
	laneMargin: 20,

	/**
	 * Internal indentation of the container.
	 * @type {Number}
	 * @protected
	 */
	containerResizePadding: 20,

	/**
	 * Lanes of the diagram. Stores a reference to the lane element (lane) and the lane title element (laneLine).
	 * @private
	 * @type {Object[]}
	 */
	lanes: null,

	/**
	 * List of disabled functional diagrams keys Ctrl + [disabledCtrlKey]
	 * @type {Object[]}
	 * @protected
	 */
	disabledCtrlKeys: [
		Ext.EventObject.Z,
		Ext.EventObject.X,
		Ext.EventObject.Y
	],

	/**
	 * List of disabled functional diagram key.
	 * @type {Object[]}
	 * @protected
	 */
	disabledKeys: [
		Ext.EventObject.LEFT,
		Ext.EventObject.UP,
		Ext.EventObject.RIGHT,
		Ext.EventObject.DOWN,
		Ext.EventObject.F2
	],

	/**
	 * The symptom of the "read-only" mode of the process designer.
	 * @type {Boolean}
	 */
	readOnly: false,

	/**
	 * Flag, feature editing element header in the diagram.
	 * @type {Boolean}
	 */
	labelEditByDblClickEnabled: false,

	/**
	 * The color of the selected control flow
	 */
	connectorSelectionColor: "#5FADEA",

	/**
	 * Offset of the connector label on the X axis.
	 * @type {Number}
	 * @protected
	 */
	connectorCaptionOffsetX: 0,

	/**
	 * Offset of the connector label on the Y axis.
	 * @type {Number}
	 * @protected
	 */
	connectorCaptionOffsetY: 5,

	/**
	 * Indentation of the element signature substrate.
	 * @type {Number}
	 * @protected
	 */
	nodeLabelBackgroundPadding: 5,

	/**
	 * Length of an extension for source and target node bounds, which is used to determine the length
	 * of the first segment of the connector near source and target nodes.
	 * @type {Number}
	 * @private
	 */
	nodeBoundsExtension: 30,

	mixins: {
		droppable: "Terrasoft.Droppable",
		nodeSelectionTool: "Terrasoft.NodeSelectionTool",
		//TODO #### ####### # ######## ####### connectionEditTool ## ########
		connectionEditTool: "Terrasoft.ConnectionEditTool",
		nodeRemoveTool: "Terrasoft.NodeRemoveTool",
		connectorRemoveTool: "Terrasoft.ConnectorRemoveTool"
	},

	constructor: function() {
		this.initScrollContentOffset();
		this.wrapTextRegExp = /(\S+)|(\s+)/g;
		this.callParent(arguments);
		this.lanes = [];
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#init
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		if (this.readOnly) {
			return;
		}
		this.addEvents(
			/**
			 * @event
			 * Event of changing the parent container of the chart elements.
			 * @param {Object} args The parameter of the event.
			 * @param {String} args.itemName The name of the chart element.
			 * @param {String} args.containerName The name of the new element container.
			 */
			"itemsContainerChanged",

			/**
			 * @event
			 * Event of changing positions in chart elements.
			 * @param {Object} args The parameter of the event.
			 * @param {String} args.items Array of the configuration of the chart element.
			 */
			"itemsPositionChanged",

			/**
			 * @event
			 * Event of changing the position of the lane.
			 * @param {Object} args The parameter of the event.
			 * @param {String} args.itemName The name of the chart element.
			 * @param {Object} args.position The new position of the element.
			 * @param {Number} args.position.x The x-axis coordinate.
			 * @param {Number} args.position.y The y-axis coordinate.
			 */
			"linePositionChanged",

			/**
			 * @event
			 * Event of resizing a chart element.
			 * @param {Object} args The parameter of the event.
			 * @param {String} args.itemName The name of the chart element.
			 * @param {Object} args.size New element sizes.
			 * @param {Number} args.size.width The width of the element.
			 * @param {Number} args.size.height The height of the element.
			 */
			"sizeChanged",

			/**
			 * @event
			 * Event for generating a unique name and title for the chart element.
			 * @param {Object} args The parameter of the event.
			 * @param {Terrasoft.ProcessBaseElementSchema} args.item The chart element.
			 */
			"generateItemNameAndCaption",

			/**
			 * @event
			 * The event of changing the break points of the connector.
			 * @param {Object} args The parameter of the event.
			 * @param {String} args.name The name of the connector.
			 * @param {ej.Diagram.Point[]} args.polylinePointPositions An array of new breakpoints.
			 */
			"polylinePointPositionsChanged",

			/**
			 * @event
			 * Event of inserting an element into the control flow.
			 * @param {Object} args The parameter of the event.
			 * @param {Object} args.node The item to insert.
			 * @param {Object} args.connector Selected sequence flow.
			 */
			"insertNodeInConnector",

			/**
			 * @event itemsRemoving
			 * Fires when an items are removed on diagram.
			 * @param {Object} args Event arguments.
			 * @param {String} args.itemNameList Array of items.
			 */
			"itemsRemoving"
		);
		this.on("mouseup", this.onMouseUp, this);
		this.on("drag", this.onDrag, this);
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#onAddItem
	 * @protected
	 * @override
	 */
	onAddItem: function(item, isDataLoaded) {
		var nodeConfig = item.getDiagramConfig();
		this.callParent([nodeConfig, isDataLoaded]);
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#getUserHandles
	 * @protected
	 * @override
	 */
	getUserHandles: function() {
		var userHandles = this.callParent(arguments);
		userHandles.push(this.mixins.nodeSelectionTool.getNodeSelectionTool.call(this));
		if (!this.readOnly) {
			userHandles.push(this.mixins.connectionEditTool.getConnectionEditTool.call(this));
			userHandles.push(this.mixins.nodeRemoveTool.getNodeRemoveTool.call(this));
			userHandles.push(this.mixins.connectorRemoveTool.getConnectorRemoveTool.call(this));
		}
		return userHandles;
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#setPortsVisibilityOnSelectionChange
	 * @protected
	 * @override
	 */
	setPortsVisibilityOnSelectionChange: Terrasoft.emptyFn,

	getImageUrl: function(imageName) {
		return Terrasoft.ImageUrlBuilder.getUrl({
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: "Terrasoft.Nui",
				resourceItemName: "ProcessSchemaDesigner." + imageName
			}
		});
	},

	/**
	 * Overlaps the behavior of double-clicking on the diagram
	 * @private
	 */
	customizeDoubleClick: function() {
		var self = this;
		ej.Diagram.prototype._doubleclick = function(evt) {
			if (self.readOnly) {
				return;
			}
			if (this.activeTool.name !== "panTool") {
				var args;
				args = {
					element: this._nodeToHit,
					cancel: false,
					actualObject: this.activeTool.actualObject,
					evt: evt
				};
				if (!this._isEditing) {
					this._raiseEvent("doubleClick", args);
				}
				if (this._nodeToHit) {
					this.activeTool._doubleClick(this._nodeToHit);
				}
				if (!this.activeTool.inAction && ((this.selectionList.length > 0) || this.activeTool.selectedObject) &&
					!args.cancel) {
					var obj = this.activeTool.selectedObject || this.selectionList[0];
					if (!this._isEditing && (obj.type !== "pseudoGroup") && !args.cancel) {
						if (!this._isEditing && obj.shape && obj.shape.type === "text" &&
							this._setLabelEditing(obj.shape.textBlock)) {
							self.startEditCaption(obj, this);
						} else if (!this._isEditing && ((obj.labels.length === 0 ||
								typeof obj.labels.length === "undefined") ||
								(obj.labels.length > 0 && this._setLabelEditing(obj.labels[0])))) {
							self.startEditCaption(obj, this);
						}
					}
				} else if (this.activeTool instanceof ej.Diagram.PolygonTool) {
					this.activeTool.doubleclick(evt);
				}
			}
			var nodeName = evt.target.attributes.nodeName;
			if (nodeName) {
				var node = this.findNode(nodeName.value);
				if (node) {
					self.startEditCaption(node, this);
				}
			}
		};
	},

	/**
	 * Puts signature chart element in the edit state.
	 * @protected
	 * @return {Boolean} True if label editing enabled. See {@link readOnly} and {@link labelEditByDblClickEnabled}
	 */
	startEditCaption: function(node, context) {
		if (this.readOnly || !this.labelEditByDblClickEnabled) {
			return false;
		}
		context.scrollToNode(node);
		context._startEdit(node);
		return true;
	},

	/**
	 * Initializes scroll content offset beetwise last element and diagram borders.
	 * @private
	 */
	initScrollContentOffset: function() {
		var labelFontSize = Terrasoft.ProcessBaseElementSchema.prototype.fontSize;
		var elementLabelsOffset = labelFontSize * this.maxLabelLinesCount;
		var emptySpaceOffset = 10;
		var scrollContentOffset = elementLabelsOffset + emptySpaceOffset;
		this.bottomScrollContentOffset = scrollContentOffset;
		this.rightScrollContentOffset = scrollContentOffset;
	},

	/**
	 * Set the tspan element to textContent. If the width of the text exceeds labelWidth, then the value
	 * is truncated and three dots are added at the end.
	 * @private
	 * @param {Object} tspan The tspan element
	 * @param {String} textContent Text value
	 * @param {Number} labelWidth Width
	 */
	trimTspanLine: function(tspan, textContent, labelWidth) {
		tspan.textContent = textContent;
		var testWidth = tspan.getComputedTextLength();
		if (testWidth <= labelWidth) {
			return;
		}
		for (var i = textContent.length - 1; i > 0; i--) {
			textContent = textContent.substr(0, i);
			if (!Ext.isIEOrEdge || !Terrasoft.getIsRtlMode()) {
				tspan.textContent = textContent + "...";
			}
			testWidth = tspan.getComputedTextLength();
			if (testWidth <= labelWidth) {
				return;
			}
		}
	},

	/**
	 * Append child tspan to text.
	 * @private
	 * @param {String} name New tspan name.
	 * @param {Object} text Parent text element.
	 * @param {Number} fontSize Font size.
	 * @param {Object} svg Svg element.
	 * @return {Object} Created tspan.
	 */
	appendTspan: function(name, text, fontSize, svg) {
		var tspan = svg.tspan({
			nodeName: name
		});
		tspan.style.fontSize = fontSize;
		text.appendChild(tspan);
		return tspan;
	},

	/**
	 * Append label's text with wrapping to text element.
	 * @private
	 * @param {Object} text Text element.
	 * @param {Object} label Label element.
	 * @param {String} tspanName Tspan's name.
	 * @param {Object} svg Svg element.
	 */
	appendWrapText: function(text, label, tspanName, svg) {
		var lineCount = 1;
		var self = this;
		var appendLine = function(newWord) {
			if (lineCount >= self.maxLabelLinesCount) {
				return;
			}
			var newTspan = self.appendTspan(tspanName, text, label.fontSize, svg);
			newTspan.textContent = newWord;
			lineCount++;
			return newTspan;
		};
		var labelText = label.text;
		var maxWidth = label.width;
		var words = labelText.match(this.wrapTextRegExp);
		var tspan = this.appendTspan(tspanName, text, label.fontSize, svg);
		var word, currentLine, testWidth;
		for (var n = 0; n < words.length; n++) {
			if (lineCount > this.maxLabelLinesCount) {
				break;
			}
			word = words[n].trim();
			if (word.match(/([\r\n])/)) {
				tspan = appendLine("");
				continue;
			}
			currentLine = tspan.textContent.trim();
			if (!currentLine && !word) {
				continue;
			}
			tspan.textContent += words[n];
			testWidth = tspan.getComputedTextLength();
			if (testWidth <= maxWidth) {
				continue;
			}
			if (!currentLine) {
				this.trimTspanLine(tspan, word, maxWidth);
				if (n < words.length - 1) {
					tspan = appendLine("");
				}
			} else {
				if (lineCount < self.maxLabelLinesCount) {
					this.trimTspanLine(tspan, currentLine, maxWidth);
					tspan = appendLine(word);
				} else {
					this.trimTspanLine(tspan, tspan.textContent, maxWidth);
					break;
				}
			}
		}
		if (tspan) {
			this.trimTspanLine(tspan, tspan.textContent, maxWidth);
		}
	},

	/**
	 * Overrides labels dividing.
	 * @private
	 */
	customizeWrapText: function() {
		var self = this;
		var base = ej.Diagram.SvgContext._wrapText;
		ej.Diagram.SvgContext._wrapText = function(node, textBBox, text, label, svg) {
			if (label.defaultRendering === true) {
				return base.apply(this, arguments);
			}
			ej.Diagram.Util.attr(text, {
				"pointer-events": "auto"
			});
			while (text.hasChildNodes()) {
				text.removeChild(text.lastChild);
			}
			var childNodes = text.childNodes;
			if (!childNodes || (label.text.length <= 0)) {
				return;
			}
			self.appendWrapText(text, label, node.name, svg);
			this._wrapTextAlign(text, childNodes, label.fontSize, label.textAlign);
		};
	},

	/**
	 * Overrides labels background painting.
	 * @private
	 */
	customizeAlignTextOnLabel: function() {
		var self = this;
		ej.Diagram.SvgContext._alignTextOnLabel = function(node, nodeBounds, text, label, svg) {
			var isConnector = (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector);
			self.utils.labelUtils.alignTextOnLabel({
				node: node,
				nodeBounds: nodeBounds,
				text: text,
				label: label,
				svg: svg,
				connectorCaptionOffset: {
					x: self.connectorCaptionOffsetX,
					y: self.connectorCaptionOffsetY
				},
				labelBackgroundPadding: isConnector ? 0 : self.nodeLabelBackgroundPadding
			});
		};
	},

	/**
	 * Overrides text redactor creation.
	 * @private
	 */
	customizeCreateEditBox: function() {
		var self = this;
		ej.Diagram.prototype._updateEditor = Ext.emptyFn;
		var base = ej.Diagram.prototype._createEditBox;
		ej.Diagram.prototype._createEditBox = function(label, x, y, width, height, shape) {
			var node = self.diagram.findNode(shape.name);
			if (node.offsetX) {
				x = node.offsetX - (label.width / 2);
			} else {
				x = x + (width / 2) - (label.width / 2);
				y = y + (height / 2);
			}
			var borderOffset = 2;
			y += borderOffset;
			width = label.width;
			height = self.maxLabelLinesCount * label.fontSize;
			base.call(this, label, x, y, width, height, shape);
		};
	},

	/**
	 * Overlaps the click on the chart.
	 * @private
	 */
	customizeMouseDown: function() {
		var self = this;
		var base = ej.Diagram.prototype._mousedown;
		ej.Diagram.prototype._mousedown = function(evt) {
			var node = this._findNodeUnderMouse(evt);
			if (self.readOnly) {
				evt.preventDefault();
				var selectedNode = this.selectionList[0];
				if (selectedNode && (!node || (node.name !== selectedNode.name))) {
					self.changeNodeConnectorsSelection(selectedNode, false);
					ej.Diagram.Util.clear(this.selectionList);
				}
				if (node && node.type === "node" && (!selectedNode || (node.name !== selectedNode.name))) {
					this.selectionList.push(node);
					self.changeNodeConnectorsSelection(node, true);
				}
				return;
			}
			var selectionList;
			if (this.selectionList.length > 0 && this.selectionList[0].type === "pseudoGroup") {
				selectionList = this.selectionList[0].children;
			}
			if (!evt.ctrlKey && node && selectionList) {
				if (!Ext.Array.contains(this.selectionList[0].children, node.name)) {
					this._clearSelection();
				}
			}
			var isSelectConnector = evt.ctrlKey && node && selectionList &&
				node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector;
			if (isSelectConnector) {
				if (Ext.Array.contains(selectionList, node.targetNode) &&
					Ext.Array.contains(selectionList, node.sourceNode)) {
					return;
				} else {
					this._clearSelection();
				}
			}
			this.tools.ConnectorRemoveHandle.currentPoint = this._mousePosition(evt);
			base.apply(this, arguments);
		};
	},

	/**
	 * Override diagram mouse up.
	 * @private
	 */
	customizeMouseUp: function() {
		ej.Diagram.prototype._mouseup = function(evt) {
			if (!this._isPinching) {
				if (this._invoke(evt)) {
					var foreignObject = this._isForeignObject(evt.originalEvent.target);
					if (!foreignObject) {
						evt.preventDefault();
					}
					if (evt.target.id === this._id + "_canvas_svg") {
						this._raiseEvent("click", {element: this});
					}
					this.activeTool.mouseup(evt);
					if (this.activeTool instanceof ej.datavisualization.Diagram.PanTool) {
						document.onmousemove = null;
						document.onmouseup = null;
					}
					if (this._selectedSymbol) {
						var args = {element: this.selectionList[0], cancel: false};
						if (args.cancel === true) {
							this._remove(args.element);
						}
						var node = this.selectionList[0];
						if (node) {
							if ((node.labels.length > 0 && node.labels[0].mode === "edit")) {
								this._isEditing = true;
								this.startLabelEdit(node, node.labels[0]);
							} else {
								this.element[0].focus();
							}
							this._raiseDropEvent(args);
							this._raiseEvent("selectionChange", args);
						}
						var childTable = {};
						if (this.selectionList && this.selectionList.length > 0) {
							childTable = this._getChildTable(this.selectionList[0], childTable);
						}
						var entry = {
							type: "collectionchanged",
							object: jQuery.extend(true, {}, node),
							childTable: jQuery.extend(true, {}, childTable),
							changeType: "insert"
						};
						this.addHistoryEntry(entry);
						this._selectedSymbol = null;
					}
					var activePolygonTool = this.activeTool instanceof ej.datavisualization.Diagram.PolygonTool;
					var activeTextTool = this.activeTool instanceof ej.datavisualization.Diagram.TextTool;
					var activeElement = document.activeElement;
					if (!activePolygonTool && !activeTextTool && !this._isEditing && !foreignObject &&
						activeElement && activeElement.id === "focusInput") {
						this.element[0].focus();
					}
					this._currentCursor = this.activeTool.cursor;
					this._updateCursor();
				}
			}
		};
	},

	/**
	 * Changes the state of the selected streams of the chart element.
	 * @param {ej.Diagram.Node} node The element of the diagram.
	 * @param {Boolean} selected The state of the element's selectivity.
	 */
	changeNodeConnectorsSelection: function(node, selected) {
		var connectors = [].concat(node.inEdges).concat(node.outEdges);
		Terrasoft.each(connectors, function(connectorName) {
			this.changeConnectorSelection(connectorName, selected, "animated");
		}, this);
	},

	/**
	 * Change connectors selection state.
	 * @param {String} connectorName Connector name.
	 * @param {Boolean} selected Selected state.
	 * @param {String} [className = selected] Selected class name.
	 */
	changeConnectorSelection: function(connectorName, selected, className) {
		var connector = document.getElementById(connectorName);
		if (!connector) {
			return;
		}
		var classList = connector.classList;
		className = className || "selected";
		if (selected) {
			classList.add(className);
		} else {
			classList.remove(className);
		}
	},

	/**
	 * Overrides the drawing of the port selection in the diagram.
	 * @private
	 */
	customizeDrawPortHighlighter: function() {
		var connectorPortColor = this.connectorPortColor;
		ej.Diagram.SvgContext._drawPortHighlighter = function(port, node, svg, parent) {
			if (!port) {
				return;
			}
			var shape, size, point, transform;
			var fill = connectorPortColor;
			var border = connectorPortColor;
			var borderWidth = 2;
			size = ej.Diagram.Size(port.size * 2, port.size * 2);
			point = ej.Diagram.Util._getPortPosition(port, ej.Diagram.Util.bounds(node, true));
			var matrix = ej.Matrix.identity();
			ej.Matrix.rotate(matrix, node.rotateAngle, node.offsetX, node.offsetY);
			point = ej.Matrix.transform(matrix, point);
			transform = "rotate(" + 0 + "," + (point.x + size.width / 2) + "," + (point.y + size.height / 2) + ")";
			shape = svg.circle({
				id: "portHighlighter",
				class: "ej-d-port",
				cx: point.x,
				cy: point.y,
				r: 3.5,
				fill: fill,
				stroke: border,
				"stroke-width": borderWidth,
				"pointer-events": "none",
				transform: transform
			});
			parent.appendChild(shape);
			return shape;
		};
	},

	/**
	 * Overrides the F2 key press handler for control flows.
	 * @private
	 */
	customizeKeyDown: function() {
		var base = ej.Diagram.prototype._keydown;
		var self = this;
		ej.Diagram.prototype._keydown = function(evt) {
			if (this._isInternalTool(this.activeTool) && this.activeTool.inAction) {
				evt.preventDefault();
				return;
			}
			var keycode = evt.keyCode ? evt.keyCode : evt.which;
			if (self.readOnly) {
				if (evt.ctrlKey && !evt.altKey && !evt.shiftKey && keycode === Ext.EventObject.A) {
					evt.preventDefault();
				}
				return;
			}
			if (!this._isEditing && ((self.disabledKeys && self.disabledKeys.indexOf(keycode) > -1) ||
					(self.disabledCtrlKeys && evt.ctrlKey && self.disabledCtrlKeys.indexOf(keycode) > -1))) {
				return;
			}
			switch (keycode) {
				case Ext.EventObject.F2:
					if (this.selectionList.length > 0) {
						var node = this.selectionList[0];
						if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
							self.startEditCaption(node, this);
							return;
						}
					}
					break;
				case Ext.EventObject.ESC:
					var editBox = document.getElementById(this.element[0].id + "_editBox");
					if (editBox) {
						this._isEditing = false;
						this._off($(editBox), "focusout", this._editboxfocusout);
						this._off($(editBox), "keyup", this._editBoxKeyUp);
						this._off($(editBox), "input", this._editBoxTextChange);
						var element = $("#" + this.element[0].id + "_editBoxDiv")[0];
						if (element) {
							element.parentNode.removeChild(element);
						}
						Ext.get(this.element[0].id).focus();
						return;
					}
					break;
				case Ext.EventObject.DELETE:
					if (!this._isEditing) {
						self.removeSelectedItems();
						return;
					}
					break;
			}
			base.apply(this, arguments);
		};
	},

	/**
	 * Overrides the handler for pressing the ESC key for all tokens.
	 * If you click on ESC, the selection from the element is not removed.
	 * @private
	 */
	customizeToolBaseKeyDown: function() {
		ej.Diagram.ToolBase.prototype.keydown = function(evt) {
			var keycode = evt.keyCode ? evt.keyCode : evt.which;
			if ((keycode === Ext.EventObject.ESC) && this.inAction) {
				this.abort();
			}
		};
	},

	/**
	 * Overlaps the selection logic of the element in the diagram. Tracks should not stand out.
	 * @private
	 */
	customizeDecideSelectedItem: function() {
		var base = ej.Diagram.ToolBase.prototype._decideSelectedItem;
		ej.Diagram.ToolBase.prototype._decideSelectedItem = function(evt, node) {
			if (node) {
				var parentNodeName = node.parent;
				if (parentNodeName) {
					var parentNode = this.diagram.nameTable[parentNodeName];
					if (parentNode.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane ||
						parentNode.nodeType === Terrasoft.diagram.UserHandlesConstraint.Subprocess) {
						return node;
					}
				}
			}
			return base.apply(this, arguments);
		};
	},

	/**
	 * Calculates the dimensions and position of the container.
	 * @param {Object} containerRect The current dimensions of the container.
	 * @param {Number} containerRect.x Container position along the X axis.
	 * @param {Number} containerRect.y Container position along the Y axis.
	 * @param {Number} containerRect.width Container width.
	 * @param {Number} containerRect.height Container height.
	 * @param {Object} point The point for which you want to calculate.
	 * @param {Number} point.x The #-axis coordinate of the point.
	 * @param {Number} point.y The y-axis coordinate of the point.
	 * @param {String} resizeDiraction The direction of resizing, the following values are possible:
	 * - n-resize - Resize top.
	 * - e-resize - Resize right.
	 * - w-resize - Resize left.
	 * - s-resize - Resize bottom.
	 * - ne-resize - Resize top right corner
	 * - nw-resize - Resize top left corner.
	 * - se-resize - Resize bottom right corner.
	 * - sw-resize - Resize bottom left corner.
	 * @return {Object} The calculated position and dimensions of the container.
	 * @return {Number} return.x The position along the x-axis.
	 * @return {Number} return.y The position along the Y axis.
	 * @return {Number} return.width Width.
	 * @return {Number} return.height Height.
	 */
	calculateExpectedContainerRectangle: function(containerRect, point, resizeDiraction) {
		var baseTopLeftPoint = ej.Diagram.Point(containerRect.x, containerRect.y);
		var baseBottomRightPoint =
			ej.Diagram.Point(containerRect.x + containerRect.width, containerRect.y + containerRect.height);
		var topLeftPoint = ej.Diagram.Point(containerRect.x, containerRect.y);
		var bottomRightPoint =
			ej.Diagram.Point(containerRect.x + containerRect.width, containerRect.y + containerRect.height);
		switch (resizeDiraction) {
			case "n-resize":
				topLeftPoint = ej.Diagram.Point(baseTopLeftPoint.x, point.y);
				break;
			case "e-resize":
				bottomRightPoint = ej.Diagram.Point(point.x, baseBottomRightPoint.y);
				break;
			case "w-resize":
				topLeftPoint = ej.Diagram.Point(point.x, baseTopLeftPoint.y);
				break;
			case "s-resize":
				bottomRightPoint = ej.Diagram.Point(baseBottomRightPoint.x, point.y);
				break;
			case "ne-resize":
				topLeftPoint = ej.Diagram.Point(baseTopLeftPoint.x, point.y);
				bottomRightPoint = ej.Diagram.Point(point.x, baseBottomRightPoint.y);
				break;
			case "nw-resize":
				topLeftPoint = ej.Diagram.Point(point.x, point.y);
				break;
			case "se-resize":
				bottomRightPoint = ej.Diagram.Point(point.x, point.y);
				break;
			case "sw-resize":
				topLeftPoint = ej.Diagram.Point(point.x, baseTopLeftPoint.y);
				bottomRightPoint = ej.Diagram.Point(baseBottomRightPoint.x, point.y);
				break;
		}
		return ej.Diagram.Rectangle(
			topLeftPoint.x,
			topLeftPoint.y,
			bottomRightPoint.x - topLeftPoint.x,
			bottomRightPoint.y - topLeftPoint.y
		);
	},

	/**
	 * Overlaps the logic of drawing the borders of the selected element in the diagram.
	 * @private
	 */
	customizeDiagramSelectors: function() {
		var transformBorderElement = function(shape, svg, scale) {
			if (!shape.segments) {
				var borderEl = svg.getElementById(svg.document.id + "handle_g");
				if (!borderEl) {
					return;
				}
				var bounds = ej.Diagram.Util.bounds(shape);
				var translateString = "translate(" + bounds.x * scale + ", " + bounds.y * scale + ")";
				var rotateString = "rotate(" + shape.rotateAngle + "," + (bounds.width / 2) * scale + "," +
					(bounds.height / 2) * scale + ")";
				var attributes = {
					id: svg.document.id + "handle_g",
					transform: translateString + ", " + rotateString
				};
				svg.g(attributes);
			}
		};
		var svgContext = ej.Diagram.SvgContext;
		var baseUpdateSelector = svgContext.updateSelector;
		svgContext.updateSelector = function(shape, svg, scale) {
			baseUpdateSelector.apply(this, arguments);
			transformBorderElement(shape, svg, scale);
		};
		var baseRenderSelector = svgContext.renderSelector;
		svgContext.renderSelector = function(shape, svg, parent, scale) {
			baseRenderSelector.apply(this, arguments);
			transformBorderElement(shape, svg, scale);
		};
	},

	/**
	 * Drop node to selected connector.
	 * @param {ej.Diagram.Node} node Dropping node.
	 * @param {Object} segment Selected connector's segment.
	 * @param {Object} segment.startPoint Start point
	 * @param {Number} segment.startPoint.x Start point horizontal coordinate
	 * @param {Number} segment.startPoint.y Start point vertical coordinate.
	 * @param {Object} segment.endPoint End point
	 * @param {Number} segment.endPoint.x End point horizontal coordinate
	 * @param {Number} segment.endPoint.y End point vertical coordinate.
	 * @param {ej.Diagram} diagram Diagram.
	 * @param {Object} mousePosition Mouse position.
	 * @param {Number} mousePosition.x Horizontal coordinate.
	 * @param {Number} mousePosition.y Vertical coordinate.
	 * @param {Boolean} ctrlKey Ctrl key button state.
	 */
	dropNodeToConnector: function(node, segment, diagram, mousePosition, ctrlKey) {
		var nodeBounds = ej.Diagram.Util.bounds(node);
		var offsetX = 0;
		var offsetY = 0;
		if (segment.startPoint.x === segment.endPoint.x) {
			offsetX = nodeBounds.center.x - segment.startPoint.x;
		} else {
			offsetY = nodeBounds.center.y - segment.startPoint.y;
		}
		node.offsetX -= offsetX;
		node.offsetY -= offsetY;
		diagram.updateNode(node.name, {});
		mousePosition.x += offsetX;
		mousePosition.y += offsetY;
		this.updateItemsLocation(node, {
			x: mousePosition.x,
			y: mousePosition.y,
			ctrlKey: ctrlKey
		});
		var diagramInstance = this.getInstance();
		var connector = diagramInstance.nameTable[segment.connectorName];
		if (this.fireEvent("insertNodeInConnector", node.name, connector) === false) {
			var oldTargetNode = diagramInstance.nameTable[connector.targetNode];
			var index = oldTargetNode.inEdges.indexOf(connector.name);
			if (index > -1) {
				oldTargetNode.inEdges.splice(index, 1);
			}
			connector.targetNode = node.name;
			node.inEdges.push(connector.name);
			ej.Diagram.Util.dock(connector, diagram.nameTable);
			this.changeConnectorSelection(connector.name, false);
			this.setSelection(node);
		}
	},

	/**
	 * Overrides the MouseUp event handler.
	 * @private
	 */
	customizeMoveToolMouseUp: function() {
		var scope = this;
		var baseMouseup = ej.Diagram.MoveTool.prototype.mouseup;
		ej.Diagram.MoveTool.prototype.mouseup = function(event) {
			var node;
			if (this.newObject) {
				node = this.newObject;
				this.newObject = null;
				this.inAction = false;
			} else {
				node = this.selectedObject;
			}
			baseMouseup.apply(this, arguments);
			if (!node) {
				return;
			}
			var diagram = this.diagram;
			var segment = diagram.selectedSegment;
			if (segment) {
				var mousePosition = diagram._mousePosition(event);
				scope.dropNodeToConnector(node, segment, diagram, mousePosition, event.ctrlKey);
			}
			scope.updateNodeConnectors(node, diagram, true);
		};
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#customizeDiagram
	 * @protected
	 * @override
	 */
	customizeDiagram: function() {
		this.callParent(arguments);
		Terrasoft.ProcessSchemaDiagram.instance = this;
		Terrasoft.ProcessSchemaDiagram.customizeResizeTool();
		Terrasoft.ProcessSchemaDiagram.customizeGetNodeBounds();
		Terrasoft.ProcessSchemaDiagram.customizeMoveTool();
		this.customizeDoubleClick();
		this.customizeWrapText();
		this.customizeAlignTextOnLabel();
		this.customizeMouseDown();
		this.customizeMouseUp();
		this.customizeDrawPortHighlighter();
		this.customizeCreateEditBox();
		this.customizeKeyDown();
		this.customizeToolBaseKeyDown();
		this.customizeDecideSelectedItem();
		this.customizeDiagramSelectors();
		this.customizeUpdateLabels();
		this.customizeHasSameParent();
		this.customizeGroup();
		this.customizeSelectMouseUp();
		this.customizeSelectAll();
		this.customizeTranslate();
		this.customizeGetProcessedObject();
		this.customizeProcessCtrlKey();
		this.customizePhaseToolMouseUp();
		this.customizeMoveToolMouseUp();
		this.customizeCheckToolToActivate();
		this.customizePaste();
		this.customizeCopy();
		this.customizeNodeBoundsExtension();
		ej.Diagram.prototype._updateLabelPosition = Ext.emptyFn;
		if (this.readOnly) {
			ej.Diagram.prototype._updateCursor = Ext.emptyFn;
		}
	},

	renderToolFilter: function(node, svg) {
		/*jslint bitwise: true */
		if (node.constraints & ej.Diagram.NodeConstraints.Shadow) {
			var filterNodeName = node.name + "_filter";
			var existingFilter = svg.getElementById(filterNodeName);
			if (existingFilter) {
				return "url(#" + filterNodeName + ")";
			}
			var defs = svg.getElementsByTagName("defs")[0];
			var width = node.width + 10;
			var height = node.height + 10;
			if (ej.browserInfo().name === "chrome") {
				width = node.width / 3;
				height = node.height / 3;
			}
			var filter = svg.filter({
				id: node.name + "_filter",
				width: width,
				height: height
			});
			var offset = svg.feOffset({
				result: "offOut",
				"in": "SourceAlpha",
				dx: "1",
				dy: "1"
			});
			filter.appendChild(offset);
			var matrix = svg.feColorMatrix({
				result: "matrixOut",
				"in": "offOut",
				type: "matrix",
				values: "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.3 0"
			});
			filter.appendChild(matrix);
			var blur = svg.feGaussianBlur({
				result: "blurOut",
				"in": "matrixOut",
				stdDeviation: "2"
			});
			filter.appendChild(blur);
			var blend = svg.feBlend({
				"in": "SourceGraphic",
				in2: "blurOut",
				mode: "normal"
			});
			filter.appendChild(blend);
			defs.appendChild(filter);
			return "url(#" + filterNodeName + ")";
		}
		/*jslint bitwise: false */
		return null;
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.droppable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.droppable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.diagram#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.droppable.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	},

	/**
	 * Updates all the connectors in the chart element.
	 * @param {ej.Diagram.Node} node The element of the diagram.
	 * @param {Object} diagram Instance of the diagram.
	 * @param {Boolean} resetSegments A symptom of resetting the break points of the connectors of an element.
	 * Auto-path is built for the connector.
	 * @param {String[]} [connectors] An array that will be filled with the names of the connectors of the
	 * processed chart elements.
	 */
	updateNodeConnectors: function(node, diagram, resetSegments, connectors) {
		var connectorsNames = connectors || [];
		if ((node.isContainer === true) && (node.isExpanded === true)) {
			this.iterateItemChildrens(node, function(child) {
				this.updateNodeConnectors(child, diagram, false, connectorsNames);
			}, this);
		} else {
			diagram._updateAssociatedConnectorEnds(node, diagram.nameTable);
			ej.Diagram.SvgContext._updateAssociatedConnector(node, diagram._svg, diagram);
			var nodeConnectors = Ext.Array.merge(node.inEdges, node.outEdges);
			nodeConnectors.forEach(function(name) {
				if (connectorsNames.indexOf(name) === -1) {
					connectorsNames.push(name);
				}
			});
		}
		if (resetSegments) {
			this.resetSegments(connectorsNames);
		}
	},

	/**
	 * Reset all breakpoints of the transferred connectors.
	 * @param {String[]} connectorsName An array of connector names.
	 */
	resetSegments: function(connectorsName) {
		connectorsName.forEach(function(connectorName) {
			var diagram = this.getInstance();
			diagram.updateConnector(connectorName, {
				segments: [{type: "orthogonal"}]
			});
		}, this);
		this.updateSequenceFlowPolylinePointPositions(connectorsName);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#updateConnectorSelection
	 * @override
	 */
	updateConnectorSelection: Terrasoft.emptyFn,

	/**
	 * Compares the break points of the connectors with diagrams with the process element
	 * {@link Terrasoft.ProcessSequenceFlowSchema}.
	 * If the breakpoints do not match, an event is generated {@link #polylinePointPositionsChanged}
	 * @param {String[]} connectorsName
	 */
	updateSequenceFlowPolylinePointPositions: function(connectorsName) {
		var changedConnectors = [];
		connectorsName.forEach(function(connectorName) {
			var connectorPoints = this.getConnectorPolylinePointsPosition(connectorName);
			var sequenceFlow = this.items.get(connectorName);
			var serializedConnectorPoints = this.serializePoints(connectorPoints);
			var serializedSequenceFlowPoints = this.serializePoints(sequenceFlow.polylinePointPositions);
			if (serializedConnectorPoints !== serializedSequenceFlowPoints) {
				changedConnectors.push({
					name: connectorName,
					polylinePointPositions: connectorPoints
				});
			}
		}, this);
		if (changedConnectors.length > 0) {
			this.fireEvent("polylinePointPositionsChanged", changedConnectors);
		}
	},

	/**
	 * Returns an array of fracture points of the transmitted connector.
	 * @param {string} connectorName The name of the connector.
	 * @return {ej.Diagram.Point[]}
	 */
	getConnectorPolylinePointsPosition: function(connectorName) {
		var connector = this.getElementById(connectorName);
		var connectorPoints = this.utils.labelUtils.getSequenceFlowPoints(connector);
		connectorPoints.shift();
		connectorPoints.pop();
		return connectorPoints;
	},

	/**
	 * Returns a serialized array of points.
	 * @param {ej.Diagram.Point[]} points Array of points.
	 * @return {String}
	 */
	serializePoints: function(points) {
		return Terrasoft.serializeObject({
			source: points || [],
			valueConverter: function(point) {
				return "{" + point.x + ";" + point.y + "}";
			}
		});
	},

	/**
	 * Highlights the transferred item in the diagram.
	 * @param {ej.Diagram.Node} node Element of the diagram.
	 */
	setSelection: function(node) {
		var diagram = this.getInstance();
		diagram._clearSelection();
		diagram.addSelection(node);
	},

	/**
	 * Returns the track of the transferred item.
	 * @param {ej.Diagram.Node} item Diagram element.
	 * @return {ej.Diagram.Node}
	 */
	findItemContainer: function(item) {
		if (item.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
			return null;
		}
		var laneName = item.parent;
		return this.getElementById(laneName);
	},

	/**
	 * Returns the lane in which the transmitted point is located.
	 * @param {ej.Diagram.Point} point The point for which the search is performed.
	 * @return {ej.Diagram.Node} Track element.
	 */
	findTargetLane: function(point) {
		var lanesData = this.lanes.map(function(laneCfg) {
			return {
				lane: laneCfg.lane,
				lineBounds: ej.Diagram.Util.bounds(laneCfg.laneLine)
			};
		});
		lanesData.sort(function(item1, item2) {
			return item1.lineBounds.bottom - item2.lineBounds.bottom;
		});
		var filteredLanesData = lanesData.filter(function(laneData) {
			return (laneData.lineBounds.bottom < point.y);
		});
		var targetLaneData = filteredLanesData.pop() || {};
		return targetLaneData.lane;
	},

	/**
	 * Returns the container within which the passed point of the diagram is located.
	 * @param {Object} point The point on the diagram.
	 * @param {Number} point.x The x-axis coordinate.
	 * @param {Number} point.y The y-axis coordinate.
	 * @param {String[]} [excludeNames] The names of the elements to exclude from the search.
	 * @return {ej.Diagram.Node} The element of the container.
	 */
	findContainerAtPosition: function(point, excludeNames) {
		var containers = this.items.filterByFn(function(item) {
			if (item.isContainer !== true || (excludeNames && excludeNames.indexOf(item.name) !== -1)) {
				return false;
			}
			if (item.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
				return false;
			}
			var node = this.getElementById(item.name);
			var bounds = ej.Diagram.Util.bounds(node);
			return (ej.Diagram.Geometry.containsPoint(bounds, point));
		}, this);
		var containersCount = containers.getCount();
		if (containersCount === 0) {
			return this.findTargetLane(point);
		}
		var self = this;
		containers.sortByFn(function(item1, item2) {
			var node1 = self.getElementById(item1.name);
			var node2 = self.getElementById(item2.name);
			return node1.zOrder - node2.zOrder;
		});
		var container = containers.getByIndex(containersCount - 1);
		return this.getElementById(container.name);
	},

	/**
	 * Find connector's segment which intersetcs with rect.
	 * @param {Object} rect Rect.
	 * @param {Number} rect.x Horizontal coordinate.
	 * @param {Number} rect.y Vertical coordinate.
	 * @param {Number} rect.width Width.
	 * @param {Number} rect.height Height.
	 * @return Object{connectorName: String, startPoint: Number, endPoint: Number}
	 */
	findSegmentAtRect: function(rect) {
		var result = null;
		var item = this.items.collection.findBy(function(item) {
			if (item.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Connector) {
				return false;
			}
			var connector = this.getElementById(item.name);
			var point1, point2, segmentRect;
			var intersectsSegment = connector.segments.some(function(segment) {
				for (var i = 1; i < segment.points.length; i++) {
					point1 = segment.points[i - 1];
					point2 = segment.points[i];
					segmentRect = {
						x: Math.min(point1.x, point2.x),
						y: Math.min(point1.y, point2.y),
						width: Math.max(Math.abs(point1.x - point2.x), 1),
						height: Math.max(Math.abs(point1.y - point2.y), 1)
					};
					if (ej.Diagram.Geometry.intersectsRect(rect, segmentRect)) {
						result = {
							startPoint: point1,
							endPoint: point2
						};
						return true;
					}
				}
			});
			return intersectsSegment;
		}, this);
		if (item) {
			result.connectorName = item.name;
		}
		return result;
	},

	/**
	 * Changes the container for the transferred item.
	 * @param {ej.Diagram.Node} item Chart element.
	 * @param {ej.Diagram.Node} currentContainer The current container in which the element is located.
	 * @param {ej.Diagram.Node} targetContainer The new container into which to place the element.
	 */
	changeItemContainer: function(item, currentContainer, targetContainer) {
		var diagram = this.getInstance();
		this.removeItemBoundsCache(item);
		ej.Diagram.Util.removeItem(currentContainer.children, item.name);
		item.parent = targetContainer.name;
		this.updateChildsOrder(item, targetContainer.zOrder + 1);
		targetContainer.children.push(item.name);
		ej.Diagram.SvgContext._removeFromContainer(item, diagram._svg);
		this.renderItem(item, targetContainer.name);
	},

	updateChildsOrder: function(item, zOrder) {
		item.zOrder = zOrder;
		var diagram = this.getInstance();
		ej.Diagram.SvgContext._updateLabels(item, diagram._svg);
		if (item.isContainer) {
			this.iterateItemChildrens(item, function(child) {
				this.updateChildsOrder(child, zOrder + 1);
			}, this);
		}
	},

	/**
	 * Updates the size of the lane by its contents.
	 * @param {ej.Diagram.Node} lane Element of the lane.
	 */
	updateLaneSize: function(lane) {
		var diagram = this.getInstance();
		var contentRectangle = this.getLaneContentRectangle(lane, true);
		var height = contentRectangle.height;
		lane.height = height;
		lane.offsetY = contentRectangle.y + height / 2;
		ej.Diagram.DiagramContext.update(lane, diagram);
	},

	/**
	 * #Returns the size of the contents of the track, taking into account the title of the lane.
	 * @param {ej.Diagram.Node} lane The lane item.
	 * @param {Boolean} [updateCache] Indicates the cache update.
	 * @return {Object} The position is returned for the upper-left corner.
	 * @return {Number} return.x Horizontal offset.
	 * @return {Number} return.y Vertical offset.
	 * @return {Number} return.width Width.
	 * @return {Number} return.height Height.
	 */
	getLaneContentRectangle: function(lane, updateCache) {
		var laneName = lane.name;
		var cachedBounds = this.itemsBounds[laneName];
		if (cachedBounds && updateCache !== true) {
			return cachedBounds;
		}
		var bounds = this.getContainerContentRectangle(lane, updateCache);
		this.itemsBounds[laneName] = bounds;
		return bounds;
	},

	/**
	 * Returns the size of the contents of the container.
	 * @param {ej.Diagram.Node} container.
	 * @param {Boolean} [updateCache] Cache Update Flag.
	 * @return {Object} The position is returned for the upper-left corner.
	 * @return {Number} return.x Horizontal offset.
	 * @return {Number} return.y Vertical offset.
	 * @return {Number} return.width Width.
	 * @return {Number} return.height Height.
	 */
	getContainerContentRectangle: function(container, updateCache) {
		var bounds;
		var excludeNodes = [];
		if (container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			var lineName = container.lineName;
			excludeNodes.push(lineName);
			var laneLine = this.getElementById(lineName);
			bounds = this.getItemBounds(laneLine, updateCache);
		}
		this.iterateItemChildrens(container, function(child) {
			if (excludeNodes.indexOf(child.name) !== -1) {
				return;
			}
			var childBounds = this.getItemBounds(child, updateCache);
			if (bounds) {
				bounds = ej.Diagram.Geometry.union(bounds, childBounds);
			} else {
				bounds = childBounds;
			}
		}, this);
		return bounds;
	},

	/**
	 * The mouseup event handler.
	 * @param {Object} e Event Arguments MouseUp.
	 */
	onMouseUp: function(e) {
		var selectedItem = this.getSelectedItem();
		if (!selectedItem || selectedItem.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane ||
			selectedItem.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
			return;
		}
		var diagram = this.getInstance();
		if (selectedItem.type === "pseudoGroup" && (diagram.activeTool.name === "select" ||
				(!selectedItem.needUpdatePosition && diagram.activeTool.name === "move"))) {
			return;
		} else {
			selectedItem.needUpdatePosition = false;
		}
		if (e.isPropagationStopped() === true) {
			this.fixItemPosition(selectedItem);
			var itemContainer = this.getElementById(selectedItem.parent);
			this.resizeContainerByContent(itemContainer);
			this.updateLanes();
			this.updateNodeConnectors(selectedItem, diagram);
			this.setSelection(selectedItem);
			this.updateItemPosition(selectedItem);
			return;
		}
		var mousePosition = diagram._mousePosition(e);
		this.updateItemsLocation(selectedItem, {
			x: mousePosition.x,
			y: mousePosition.y,
			ctrlKey: e.ctrlKey
		});
		selectedItem.needUpdatePosition = false;
	},

	/**
	 * The drag event handler
	 * @param {Object} e Arguments for the drag event.
	 */
	onDrag: function(e) {
		var selectedItem = e.element;
		if (!selectedItem || selectedItem.type !== "pseudoGroup") {
			return;
		}
		selectedItem.needUpdatePosition = true;
	},

	/**
	 * Checks whether container of an item needs to be changed.
	 * @protected
	 * @param {ej.Diagram.Node} currentContainer Current item container.
	 * @param {ej.Diagram.Node} targetContainer Target item container.
	 * @param {Object} cursorPoint Mouse location point.
	 * @returns {boolean} Returns true if item container needs to be changed.
	 */
	getItemContainerNeedsToBeChanged: function(currentContainer, targetContainer, cursorPoint) {
		var isNotMovingBetweenLanes =
			!(targetContainer.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane &&
				currentContainer.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane);
		return (currentContainer.name !== targetContainer.name &&
			(cursorPoint.ctrlKey !== true || (cursorPoint.ctrlKey === true && isNotMovingBetweenLanes)));
	},

	/**
	 * Handles the drag event of the items.
	 * @param {ej.Diagram.Node} item Chart element.
	 * @param {Object} cursorPoint The location of the mouse cursor.
	 */
	updateItemsLocation: function(item, cursorPoint) {
		var diagram = this.getInstance();
		var items = [];
		var containers = [];
		var updateItems = [];
		var isPseudoGroup = item.type === "pseudoGroup";
		if (isPseudoGroup) {
			updateItems = item.children;
		} else {
			updateItems.push(item.name);
		}
		var targetContainer = this.findContainerAtPosition(cursorPoint, updateItems);
		var containerBounds = ej.Diagram.Util.bounds(targetContainer);
		var offset = ej.Diagram.Point();
		if (isPseudoGroup) {
			offset = this.getNodeRelativePosition(item, targetContainer);
			var padding = this.getContainerPadding(item);
			offset.x = (offset.x < 0) ? offset.x - padding : 0;
			offset.y = (offset.y < 0) ? offset.y - padding : 0;
		}
		updateItems.forEach(function(itemName) {
			var childItem = this.getElementById(itemName);
			if (childItem.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Connector &&
				(!Ext.Array.contains(updateItems, childItem.parent))) {
				var currentContainer = this.findItemContainer(childItem);

				if (this.getItemContainerNeedsToBeChanged(currentContainer, targetContainer, cursorPoint)) {
					var itemBounds = ej.Diagram.Util.bounds(childItem);
					childItem.offsetX = itemBounds.x - containerBounds.x + itemBounds.width / 2;
					childItem.offsetY = itemBounds.y - containerBounds.y + itemBounds.height / 2;
					this.changeItemContainer(childItem, currentContainer, targetContainer);
					containers.push({
						itemName: childItem.name,
						containerName: targetContainer.name
					});
				}
				if (isPseudoGroup) {
					childItem.offsetX -= offset.x;
					childItem.offsetY -= offset.y;
				} else {
					this.fixItemPosition(childItem);
				}
				this.updateNodeConnectors(childItem, diagram, isPseudoGroup);
				var newPosition = {
					x: childItem.offsetX - childItem.width / 2,
					y: childItem.offsetY - childItem.height / 2
				};
				var currentPosition = this.items.get(childItem.name).position;
				if (newPosition.x !== currentPosition.X || newPosition.y !== currentPosition.Y) {
					items.push({
						itemName: childItem.name,
						position: newPosition
					});
				}
			}
		}, this);
		if (isPseudoGroup) {
			if (offset.x !== 0 || offset.y !== 0) {
				ej.Diagram.Util._updateGroupBounds(item, diagram);
				diagram.updateNode(item.name, {});
			}
		} else {
			this.setSelection(item);
		}
		this.resizeContainerByContent(targetContainer);
		this.bringToFront();
		if (containers.length > 0) {
			this.fireEvent("itemsContainerChanged", containers);
		}
		if (items.length > 0) {
			this.fireEvent("itemsPositionChanged", items);
		}
	},

	/**
	 * Updates the item's position in the process if there were any changes.
	 * @param {ej.Diagram.Node} item The element of the diagram.
	 */
	updateItemPosition: function(item) {
		var currentPosition = this.items.get(item.name).position;
		var newPosition = {
			x: item.offsetX - item.width / 2,
			y: item.offsetY - item.height / 2
		};
		if (newPosition.x !== currentPosition.X || newPosition.y !== currentPosition.Y) {
			this.bringToFront();
			this.fireEvent("itemsPositionChanged", [{
				itemName: item.name,
				position: newPosition
			}]);
		}
	},

	/**
	 * Changes the size of the container by its contents. The method recursively passes through all the parents
	 * of the transferred element.
	 * @fires sizeChanged Generates a container change event.
	 * @param {ej.Diagram.Node} container
	 */
	resizeContainerByContent: function(container) {
		if (!container || container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			return;
		}
		var diagram = this.getInstance();
		var newSize = this.recalculateContainerSize(container);
		var nodePosition = this.getNodeRelativePosition(container);
		var width = newSize.width;
		var height = newSize.height;
		diagram.updateNode(container.name, {
			offsetX: nodePosition.x + width / 2,
			offsetY: nodePosition.y + height / 2,
			width: width,
			height: height
		});
		this.fireEvent("sizeChanged", {
			itemName: container.name,
			size: {
				width: width,
				height: height
			}
		});
		var parentNode = this.getElementById(container.parent);
		this.resizeContainerByContent(parentNode);
	},

	/**
	 * Calculates the size of the container by its contents.
	 * @param {ej.Diagram.Node} container Container.
	 * @return {Object} Dimensions of the container.
	 * @return {Number} return.width Width.
	 * @return {Number} return.height Height.
	 */
	recalculateContainerSize: function(container) {
		var containerBounds = ej.Diagram.Util.bounds(container);
		var containerContentBounds = this.getContainerContentRectangle(container, true);
		var contentOffwstX = containerContentBounds.x - containerBounds.x;
		var contentOffwstY = containerContentBounds.y - containerBounds.y;
		var targetContanerExpectedWidth = containerContentBounds.width + contentOffwstX + this.containerResizePadding;
		var targetContanerExpectedHeight = containerContentBounds.height + contentOffwstY + this.containerResizePadding;
		return {
			width: Math.max(containerBounds.width, targetContanerExpectedWidth),
			height: Math.max(containerBounds.height, targetContanerExpectedHeight)
		};
	},

	/**
	 * Updates the position of the track on the chart.
	 * @param {ej.Diagram.Node} lane The track element.
	 * @param {Object} options Optional settings.
	 * @param {Number} options.offsetY Vertical offset.
	 */
	updateLanePosition: function(lane, options) {
		var offsetY = options.offsetY || 0;
		var diagram = this.getInstance();
		var laneLine = this.getElementById(lane.lineName);
		var diagramWidth = this.getWidth();
		laneLine.width = diagramWidth;
		laneLine.offsetX = diagramWidth / 2;
		var laneLineOffsetY = laneLine.height / 2 + offsetY;
		var itemsOffsetY = laneLineOffsetY - laneLine.offsetY;
		laneLine.offsetY = laneLineOffsetY;
		if (Math.floor(Math.abs(itemsOffsetY))) {
			this.updateItemsPosition(lane, {
				offsetY: itemsOffsetY
			});
		}
		ej.Diagram.DiagramContext.update(laneLine, diagram);
	},

	/**
	 * Updates the position of the elements on the chart.
	 * @param {ej.Diagram.Node} lane The track element.
	 * @param {Object} options Optional settings.
	 * @param {Number} options.offsetY Vertical offset.
	 */
	updateItemsPosition: function(lane, options) {
		var offsetY = options.offsetY || 0;
		var lineName = lane.lineName;
		var diagram = this.getInstance();
		this.iterateItemChildrens(lane, function(item) {
			if (item.name === lineName) {
				return;
			}
			diagram.updateNode(item.name, {
				offsetY: item.offsetY + offsetY
			});
			this.updateItemPosition(item);
			this.removeItemBoundsCache(item);
		}, this);
	},

	/**
	 * Updates the sizes and positions of all the tracks in the chart.
	 */
	updateLanes: function() {
		this.lanes.forEach(function(laneCfg, index, lanes) {
			var prevLaneCfg = lanes[index - 1];
			var offsetY = 0;
			if (prevLaneCfg) {
				var prevItemBounds = this.getItemBounds(prevLaneCfg.lane);
				var prevLaneHeight = prevItemBounds.y + prevItemBounds.height;
				offsetY = prevLaneHeight + this.laneMargin;
			}
			var lane = laneCfg.lane;
			this.updateLanePosition(lane, {
				offsetY: offsetY
			});
			this.updateLaneSize(lane);
			if (offsetY !== 0) {
				this.fireEvent("linePositionChanged", {
					itemName: lane.name,
					position: {
						y: lane.offsetY - lane.height / 2
					}
				});
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#updatePageSize
	 * @override
	 */
	updatePageSize: function() {
		this.callParent(arguments);
		this.updateLanes();
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#onDiagramItemsChange
	 * overridden
	 */
	onDiagramItemsChange: function(event) {
		this.callParent(arguments);
		var changeType = event.changeType;
		if (changeType === "remove") {
			var node = event.element;
			if (node.isContainer) {
				var children = [];
				this.iterateItemChildrens(node, function(child) {
					children.push(child.name);
				}, this);
				children.forEach(function(childName) {
					this.items.removeByKey(childName);
				}, this);
			}
			var parentNode = this.getElementById(node.parent);
			if (parentNode) {
				ej.Diagram.Util.removeItem(parentNode.children, node.name);
			}
			this.updateLanes();
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#onCollectionDataLoaded
	 * @override
	 */
	onCollectionDataLoaded: function() {
		this.callParent(arguments);
		var diagram = this.getInstance();
		diagram._clearSelection();
		this.updateLanes();
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#addItem
	 */
	addItem: function(item, isDataLoaded) {
		switch (item.nodeType) {
			case Terrasoft.diagram.UserHandlesConstraint.Lane:
				var laneLine = item.children[0];
				var diagramWidth = this.getWidth();
				laneLine.width = diagramWidth;
				laneLine.offsetX = diagramWidth / 2;
				laneLine.offsetY = item.offsetY;
				var lanes = this.lanes;
				this.callParent([item]);
				laneLine = this.getElementById(laneLine.name);
				lanes.push({
					lane: this.getElementById(item.name),
					laneLine: laneLine
				});
				break;
			case Terrasoft.diagram.UserHandlesConstraint.Connector:
				return this.callParent(arguments);
			default:
				this.callParent(arguments);
				var diagram = this.getInstance();
				diagram.activateTool("move");
				break;
		}
		if (isDataLoaded !== true) {
			var node = this.getElementById(item.name);
			this.fixItemPosition(node);
			var itemContainer = this.getElementById(node.parent);
			this.resizeContainerByContent(itemContainer);
			this.updateLanes();
		}
	},

	/**
	 * @inheritdoc Terrasoft.controls.Diagram#clearDiagram
	 */
	clearDiagram: function() {
		this.lanes = [];
		this.callParent(arguments);
	},

	/**
	 * Returns the item's minimum indent from the bounds of the container
	 * @param {ej.Diagram.Node} container Container, relative to which the position is calculated.
	 * @return {int}
	 */
	getContainerPadding: function(container) {
		return container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane ?
			this.laneMargin :
			this.containerResizePadding;
	},

	/**
	 * Returns the position of the element relative to the container. For the track will return an empty result.
	 * @param {ej.Diagram.Node} item Chart element.
	 * @param {ej.Diagram.Node} container Container, relative to which the position is calculated.
	 */
	getNodeRelativePosition: function(item, container) {
		var containerPosition;
		if (item.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			return null;
		}
		if (!container) {
			container = this.getElementById(item.parent);
		}
		if (container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
			var laneLine = this.getElementById(container.lineName);
			containerPosition = ej.Diagram.Util.bounds(laneLine);
		} else {
			containerPosition = ej.Diagram.Util.bounds(container);
		}
		var itemPosition = ej.Diagram.Util.bounds(item);
		return ej.Diagram.Point(itemPosition.x - containerPosition.x,
			itemPosition.y - containerPosition.y);
	},

	/**
	 * Shifts the position of an element if it is between lanes.
	 * @param {ej.Diagram.Node} item The item to add to the chart.
	 */
	fixItemPosition: function(item) {
		if (item.parent) {
			var container = this.findItemContainer(item);
			var containerPosition;
			if (container.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
				var laneLine = this.getElementById(container.lineName);
				containerPosition = ej.Diagram.Util.bounds(laneLine);
			} else {
				containerPosition = {
					x: 0,
					y: 0
				};
			}
			var padding = this.getContainerPadding(container);
			var itemPosition = this.getNodeRelativePosition(item);
			var itemOffsetX = containerPosition.x + padding - itemPosition.x;
			var itemOffsetY = containerPosition.y + padding - itemPosition.y;
			if (itemOffsetY >= 0 || itemOffsetX >= 0) {
				var offsetX = (itemOffsetX >= 0) ? itemPosition.x + itemOffsetX + item.width / 2 : item.offsetX;
				var offsetY = (itemOffsetY >= 0) ? itemPosition.y + itemOffsetY + item.height / 2 : item.offsetY;
				var diagram = this.getInstance();
				diagram.updateNode(item.name, {
					offsetX: offsetX,
					offsetY: offsetY
				});
				this.updateItemPosition(item);
				this.removeItemBoundsCache(item);
			}
		}
	},

	/**
	 * Overrides the element's caption drawing.
	 * @private
	 */
	customizeUpdateLabels: function() {
		var baseRenderLabel = ej.Diagram.SvgContext._renderLabel;
		ej.Diagram.SvgContext._renderLabel = function(node, label) {
			if (!label.text) {
				return;
			}
			baseRenderLabel.apply(this, arguments);
		};
		ej.Diagram.SvgContext._updateLabels = function(node, svg) {
			var labels = node.labels;
			for (var i = 0, len = labels.length; i < len; ++i) {
				var label = labels[i];
				var textElementId = node.name + "_" + label.name;
				var text = svg.getElementById(textElementId);
				if (label.text || (text && !label.isTextRendered)) {
					if (!text) {
						var g = svg.getElementById(node.name);
						this._renderLabel(node, label, svg, g);
						text = svg.getElementById(textElementId);
					}
					text.setAttribute("fill", label.fontColor);
					var bounds = ej.Diagram.Util.bounds(node);
					if (!label.isTextRendered) {
						this._wrapText(node, bounds, text, label, svg);
					}
					if (!label.isTextRendered || node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector ||
						(node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Subprocess && node.isExpanded)) {
						this._alignTextOnLabel(node, bounds, text, label, svg);
					}
					label.isTextRendered = true;
				}
			}
		};
	},

	/**
	 * Overlaps the verification of identical parents from descendants.
	 * @private
	 */
	customizeHasSameParent: function() {
		ej.Diagram.ToolBase.prototype.hasSameParent = function() {
			return (this.selectedObject.type === "pseudoGroup");
		};
	},

	bringToFront: function() {
		var diagram = this.getInstance();
		var item = diagram.selectionList[0];
		var isPseudoGroup = item.type === "pseudoGroup";
		var items = isPseudoGroup ? item.children : [item.name];
		items.forEach(function(nodeName) {
			var node = diagram.nameTable[nodeName];
			var nodes = this.findOverlapNodesWithChildren(node);
			if (nodes.length === 0) {
				return;
			}
			var maxOrder = 0;
			for (var n in nodes) {
				var order = nodes[n].zOrder;
				if (order > maxOrder) {
					maxOrder = order;
				}
			}
			this.updateChildsOrder(node, maxOrder + 1);
			if (isPseudoGroup) {
				return;
			}
			var parent = diagram.nameTable[node.parent];
			var children = diagram._getChildren(parent.children);
			var prevNode;
			for (var m = 0; m < children.length; m++) {
				if (children[m] !== node.name && children[m] !== parent.lineName) {
					var child = diagram.nameTable[children[m]];
					if (!prevNode || (prevNode && (prevNode.zOrder <= child.zOrder))) {
						prevNode = child;
					}
				}
			}
			if (prevNode) {
				diagram._svg.getElementById(prevNode.name).parentNode.insertBefore(
					diagram._svg.getElementById(node.name), diagram._svg.getElementById(prevNode.name).nextSibling);
				ej.Diagram.SvgContext.renderSelector(node, diagram._svg, diagram._adornerLayer, diagram._currZoom,
					diagram.model.selectedItems.constraints);
			}
		}, this);
	},

	findOverlapNodesWithChildren: function(node) {
		var nodes = [];
		if (node.parent) {
			var diagram = this.getInstance();
			var parent = diagram.nameTable[node.parent];
			if (parent) {
				nodes = this.getAllChildren(parent, nodes, node);
			}
		}
		return nodes;
	},

	/**
	 * Returns an array of children, taking into account nesting
	 * @param {ej.Diagram.Node} node Diagram element.
	 * @param {Array} nodes Element's array.
	 * @param {Array} exceptNode An element excluded from the returned array.
	 * @returns {Array} collection Array of elements
	 */
	getAllChildren: function(node, nodes, exceptNode) {
		var diagram = this.getInstance();
		var children = diagram._getChildren(node.children);
		for (var m = 0; m < children.length; m++) {
			var child = diagram.nameTable[children[m]];
			if (child) {
				if (!exceptNode || child.name !== exceptNode.name && child.name !== node.lineName) {
					nodes.push(child);
					nodes = this.getAllChildren(child, nodes, exceptNode);
				}
			}
		}
		return nodes;
	},

	/**
	 * Overrides the creation of the group.
	 * @private
	 */
	customizeGroup: function() {
		var base = ej.Diagram.Group;
		ej.Diagram.Group = function(options) {
			/*jslint bitwise: true */
			if (options.type === "pseudoGroup") {
				Ext.apply(options, {
					constraints: ej.Diagram.NodeConstraints.Delete | ej.Diagram.NodeConstraints.Select |
					ej.Diagram.NodeConstraints.Drag,
					borderColor: "gray"
				});
			}
			/*jslint bitwise: false */
			return base.call(this, options);
		};
	},

	/**
	 * Overrides the standard behavior of the _getProcessedObject handler for the TsDiagramModule library.
	 * @private
	 */
	customizeGetProcessedObject: function() {
		ej.Diagram.ToolBase.prototype._getProcessedObject = function(name) {
			var node = this.diagram.nameTable[name];
			if (!node || this._isInSelection(name)) {
				return null;
			}
			return {
				add: node,
				remove: null
			};
		};
	},

	/**
	 * Overrides the selection logic.
	 * @private
	 */
	customizeSelectMouseUp: function() {
		var base = ej.Diagram.ToolBase;
		var scope = this;
		ej.Diagram.SelectTool.prototype.mouseup = function(evt) {
			if (scope.readOnly) {
				return;
			}
			if (this.inAction) {
				this.currentPoint = this.mousePosition(evt);
				var rect = ej.datavisualization.Diagram.Geometry.rect([this.startPoint, this.currentPoint]);
				if (rect.width !== 0 || rect.height !== 0) {
					var i;
					var len;
					var bounds;
					var collection = [];
					var childCollection = [];
					var nodes = this.diagram.nodes();
					for (i = 0, len = nodes.length; i < len; i++) {
						var node = this.diagram.nameTable[nodes[i].name];
						if (node) {
							bounds = ej.datavisualization.Diagram.Util.bounds(node);
							if (ej.datavisualization.Diagram.Util.canSelect(node)) {
								if (ej.datavisualization.Diagram.Geometry.containsRect(rect, bounds)) {
									if (scope.isParentNodeLane(node)) {
										collection.push(node);
									} else {
										childCollection.push(node);
									}
								} else if (node.type === "group") {
									this._checkGroupChildren(collection, node, rect);
								}
							}
						}
					}
					if (collection.length > 1) {
						var allChildren = [];
						collection.forEach(function(node) {
							scope.getAllChildren(node, allChildren);
						}, this);
						collection = Ext.Array.merge(collection, allChildren);
					}
					collection = Ext.Array.union(collection, childCollection);
					if (this.diagram._hasSelection()) {
						collection = this.diagram._getChildren(collection);
						ej.datavisualization.Diagram.Util.removeItem(collection, "multipleSelection");
						this.diagram._clearSelection();
					}
					if (collection.length > 0) {
						var children = collection;
						var selection;
						if (children.length > 1) {
							var pseudoGroup = ej.datavisualization.Diagram.Group({
								type: "pseudoGroup",
								"name": "multipleSelection"
							});
							for (i = 0, len = children.length; i < len; i++) {
								pseudoGroup.children.push(this.diagram._getChild(children[i]));
							}
							this.diagram.nodes().push(pseudoGroup);
							this.diagram.nameTable[pseudoGroup.name] = pseudoGroup;
							selection = pseudoGroup;
						} else {
							if (ej.datavisualization.Diagram.Util.canDoSingleSelection(this.diagram)) {
								selection = collection[0];
							}
						}
						if (selection) {
							if (selection.type === "group" || selection.type === "pseudoGroup") {
								ej.datavisualization.Diagram.Util._updateGroupBounds(selection, this.diagram);
							}
							this.diagram._addSelection(selection);
						}
					}
				} else {
					if (this.diagram._hasSelection() && !this.diagram._isDropped) {
						this.diagram._clearSelection();
					}
				}
			} else {
				if (evt.which !== 3) {
					if (this.selectedObject || this.diagram._hasSelection()) {
						if (evt.ctrlKey || evt.shiftKey) {
							if (!ej.datavisualization.Diagram.Util.canDoMultipleSelection(this.diagram)) {
								this._processCtrlKey(evt);
							}
						} else if (this.diagram._hasSelection()) {
							this.diagram._clearSelection();
						}
						this.diagram._addSelection(this.selectedObject);
					} else if (this.diagram._hasSelection() && !this.diagram._isDropped) {
						this.diagram._clearSelection();
					}
				}
			}
			this.diagram._isDropped = false;
			if (this.selectedObject) {
				this._raiseEvent("click", {element: this.selectedObject});
			}
			base.prototype.mouseup.call(this, evt);
		};
	},

	/**
	 * Overrides the selection logic for all elements.
	 * @private
	 */
	customizeSelectAll: function() {
		var scope = this;
		ej.Diagram.prototype.selectAll = function() {
			var nodes, i, len, item = null;
			this._clearSelection();
			var pseudoGroup = ej.datavisualization.Diagram.Group({
				type: "pseudoGroup",
				name: "multipleSelection"
			});
			nodes = this.nodes();
			for (i = 0, len = nodes.length; i < len; i++) {
				if (ej.datavisualization.Diagram.Util.canSelect(nodes[i])) {
					item = this.nameTable[nodes[i].name];
					if (item) {
						pseudoGroup.children.push(item.name);
					}
				}
			}
			if (pseudoGroup.children.length > 1) {
				var selectedList = pseudoGroup.children;
				pseudoGroup.children = scope.getHierarchySelectedList(selectedList);
			}
			ej.datavisualization.Diagram.Util._updateGroupBounds(pseudoGroup, this);
			this.nodes().push(pseudoGroup);
			this.nameTable[pseudoGroup.name] = pseudoGroup;
			if (pseudoGroup.children.length > 1) {
				this._addSelection(pseudoGroup);
			}
		};
	},

	/**
	 * Checks whether the parent element is a track.
	 * @param {ej.Diagram.Node} node Element of the diagram.
	 * @return {boolean}
	 */
	isParentNodeLane: function(node) {
		var diagram = this.getInstance();
		var parent = diagram.nameTable[node.parent];
		return (parent && parent.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane);
	},

	/**
	 * Overrides the move logic of the element.
	 * @private
	 */
	customizeTranslate: function() {
		var scope = this;
		var base = ej.Diagram.prototype._translate;
		ej.Diagram.prototype._translate = function(node, dx, dy, nameTable, isContainer, layout) {
			var pseudoGroup = nameTable.multipleSelection;
			if (pseudoGroup) {
				var nodes = this._getChildren(pseudoGroup.children);
				if (!scope.isParentNodeLane(node) && Ext.Array.contains(nodes, node.parent)) {
					dx = dy = 0;
				}
			}
			base.call(this, node, dx, dy, nameTable, isContainer, layout);
		};
	},

	/**
	 * Overrides the selection logic with CTRL
	 * @private
	 */
	customizeProcessCtrlKey: function() {
		var scope = this;
		var base = ej.Diagram.ToolBase.prototype._processCtrlKey;
		ej.Diagram.ToolBase.prototype._processCtrlKey = function() {
			scope.removeSelectedConnectors();
			var node = base.apply(this, arguments);
			if (node && node.type === "node" && this.selectedObject && this.selectedObject.type === "pseudoGroup" &&
				Ext.Array.contains(this.selectedObject.children, node.name) && node.children) {
				var children = this.selectedObject.children;
				this.selectedObject.children = scope.getHierarchySelectedList(children);
			}
			return node;
		};
	},

	/**
	 * Removes connectors from an array of selected items.
	 */
	removeSelectedConnectors: function() {
		var diagram = this.getInstance();
		var selectionList = diagram.selectionList;
		if (selectionList.length > 0 && selectionList[0].type === "pseudoGroup") {
			selectionList[0].children = selectionList[0].children.filter(function(itemName) {
				var item = diagram.nameTable[itemName];
				return item.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Connector;
			}, this);
		} else {
			selectionList = selectionList.filter(function(item) {
				return item.nodeType !== Terrasoft.diagram.UserHandlesConstraint.Connector;
			});
		}
		diagram.selectionList = selectionList;
	},

	/**
	 * Returns an array of selected elements, taking into account the hierarchy.
	 * @param {Array} nodesName An array of element names.
	 * @returns {Array} An array of element names.
	 */
	getHierarchySelectedList: function(nodesName) {
		var sortItems = [];
		var selectedItems = [];
		var diagram = this.getInstance();
		nodesName.forEach(function(nodeName) {
			var node = diagram.nameTable[nodeName];
			var level = this.getLevelNode(node);
			sortItems.push({
				level: level,
				node: node
			});
		}, this);
		Ext.Array.sort(sortItems, function(first, second) {
			return (first.level - second.level);
		});
		sortItems.forEach(function(item) {
			var node = item.node;
			Ext.Array.include(selectedItems, node.name);
			var allChildren = [];
			this.getAllChildren(node, allChildren);
			allChildren.forEach(function(node) {
				Ext.Array.include(selectedItems, node.name);
			}, this);
		}, this);
		return selectedItems;
	},

	/**
	 * Returns the nesting level of the element.
	 * @param {ej.Diagram.Node} node The element of the diagram.
	 * @param {int} level The nesting level of the element.
	 * @return {int}
	 */
	getLevelNode: function(node, level) {
		if (!level) {
			level = 0;
		}
		if (!node.parent) {
			return level;
		}
		level++;
		var diagram = this.getInstance();
		var parentNode = diagram.nameTable[node.parent];
		return this.getLevelNode(parentNode, level);
	},

	/**
	 * Overrides the MouseUp event handler for the displayed nodes.
	 */
	customizePhaseToolMouseUp: function() {
		var base = ej.Diagram.PhaseTool.prototype.mouseup;
		ej.Diagram.PhaseTool.prototype.mouseup = function() {
			base.apply(this, arguments);
			var diagram = this.diagram;
			var shape = diagram.selectionList[0];
			var isMultipleSelection = shape && (shape.type === "pseudoGroup");
			ej.Diagram.SvgContext.renderUserHandles(diagram.model.selectedItems.userHandles, shape,
				diagram._svg, isMultipleSelection, diagram._currZoom, diagram._adornerLayer);
		};
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#onConnectionChange
	 * @override
	 */
	onConnectionChange: function() {
		// Synchronization of control flows occurs on onDiagramMouseUp
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#linkConnectors
	 * @override
	 */
	linkConnectors: function(inEdgesConnectors, outEdgesConnectors) {
		var connectors = (inEdgesConnectors || []).concat(outEdgesConnectors || []);
		var eventArgs = [];
		connectors.forEach(function(connectorName) {
			var connector = this.getElementById(connectorName);
			if (connector) {
				eventArgs.push(connector);
			}
		}, this);
		this.fireEvent("connectorsNodesChange", eventArgs);
	},

	/**
	 * Finds caption label of the Process element.
	 * @param {Object} node Process element node.
	 * @return {Terrasoft.Label}
	 */
	getNodeCaptionLabel: function(node) {
		var result;
		Terrasoft.each(node.labels, function(label) {
			if (label.labelType === Terrasoft.LabelType.CAPTION) {
				result = label;
				return false;
			}
		}, this);
		return result;
	},

	/**
	 * Sets process element title.
	 * @param {String} nodeName Process element name.
	 * @param {String} caption Process element caption.
	 * @param {String} captionPrefix Validation state caption.
	 * @return {boolean}
	 */
	setNodeCaption: function(nodeName, caption, captionPrefix) {
		var node = this.getElementById(nodeName);
		if (node) {
			var label = this.getNodeCaptionLabel(node);
			if (label) {
				if (captionPrefix && label.text && label.text.indexOf(captionPrefix) === 0 &&
					caption.indexOf(captionPrefix) < 0) {
					label.text = captionPrefix + " " + caption;
				} else {
					label.text = caption;
				}
				label.isTextRendered = false;
				var diagram = this.getInstance();
				diagram.updateNode(node.name, {});
				return true;
			}
		}
		return false;
	},

	/**
	 * Sets node font color and caption.
	 * @param {String} nodeName Process element name.
	 * @param {String} caption Process element caption.
	 * @param {String} fontColor Process element caption text color.
	 */
	setNodeCaptionWithColor: function(nodeName, caption, fontColor) {
		var node = this.getElementById(nodeName);
		if (!node) {
			return;
		}
		var label = this.getNodeCaptionLabel(node);
		if (!label) {
			return;
		}
		label.text = caption;
		label.fontColor = fontColor;
		label.isTextRendered = false;
		var diagram = this.getInstance();
		diagram.updateNode(node.name, {});
	},

	/**
	 * It overrides the standard behavior of the _checkToolToActivate handler for the TsDiagramModule library.
	 */
	customizeCheckToolToActivate: function() {
		var base = ej.Diagram.prototype._checkToolToActivate;
		ej.Diagram.prototype._checkToolToActivate = function(evt) {
			evt.altKey = false;
			return base.apply(this, arguments);
		};
	},

	/**
	 * Returns the cursor position relative to the diagram.
	 * @param {event} e
	 * @return {ej.Diagram.Point}
	 */
	getOffsetMousePosition: function(e) {
		var diagramContainer = $("#" + this.renderToSelector);
		var diagramPos = diagramContainer.position();
		var scrollLeft = diagramContainer.scrollLeft();
		var scrollTop = diagramContainer.scrollTop();
		return ej.Diagram.Point(e.clientX + scrollLeft - diagramPos.left, e.clientY + scrollTop - diagramPos.top);
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#getNodeDataItemMarker
	 * @override
	 */
	getNodeDataItemMarker: function(node) {
		return node.name;
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#onClick
	 * Prevents clicking on the diagram when move the element.
	 * @override
	 */
	onClick: function(event) {
		var element = event.element || {};
		var isDiagramClick = Ext.isEmpty(element.name);
		var diagram = this.getInstance();
		if (isDiagramClick && (diagram.activeTool.name === "move")) {
			return;
		}
		this.fireEvent("click", event);
	},

	/**
	 * Customizes paste method.
	 * @private
	 */
	customizePaste: function() {
		var self = this;
		ej.Diagram.prototype.paste = function() {
			if (this._clipboardData) {
				var data = this._clipboardData;
				var node = data.node;
				self.fireEvent("nodesCollectionChange", {
					changeType: "paste",
					element: node,
					localX: node.offsetX,
					localY: node.offsetY
				});
			}
		};
	},

	/**
	 * Customizes copy method.
	 * @private
	 */
	customizeCopy: function() {
		var originalCopy = ej.Diagram.prototype.copy;
		var self = this;
		ej.Diagram.prototype.copy = function() {
			var elements = self.items;
			var diagram = this;
			if (!Ext.isEmpty(diagram.selectionList)) {
				var elementName = diagram.selectionList[0].name;
				if (elementName === "multipleSelection") {
					return;
				}
				var element = elements.get(elementName);
				var hasLazyParameters = element.hasLazyParameters;
				var hasAllLazyParametersLoaded = element.hasLazyParameters && element.getAllLazyParametersAreLoaded();
				if (!hasLazyParameters || hasAllLazyParametersLoaded) {
					originalCopy.call(this);
				}
			}
		};
	},

	/**
	 * Customizes node bounds extension, that changes length of the first segment of the connector near source
	 * and target nodes.
	 * @protected
	 */
	customizeNodeBoundsExtension: function() {
		var extension = this.nodeBoundsExtension;
		ej.Diagram.Util.getNodeBoundsExtension = function() {
			return extension;
		};
	},

	/**
	 * Copies selected element to clipboard.
	 * @protected
	 */
	copyElement: function() {
		var diagram = this.getInstance();
		diagram.copy();
	},

	/**
	 * Pastes element from clipboard.
	 * @protected
	 */
	pasteElement: function() {
		var diagram = this.getInstance();
		diagram.paste();
	},

	/**
	 * @inheritdoc Terrasoft.NodeRemoveTool#nodeRemoveTool
	 * @override
	 */
	nodeRemoveTool: function(base) {
		function tool(diagram) {
			base.call(this, diagram);
		}

		ej.Diagram.extend(tool, base);
		var self = this;
		tool.prototype.mouseup = function() {
			self.removeSelectedItems();
			this.diagram.deactivateTool();
		};
		return tool;
	},

	/**
	 * Removes selected items.
	 */
	removeSelectedItems: function() {
		var diagram = this.getInstance();
		var selectedItem = diagram.selectionList[0];
		if (selectedItem) {
			var selectedItems = (selectedItem.type === "pseudoGroup") ? selectedItem.children : [selectedItem.name];
			this.fireEvent("itemsRemoving", {
				itemNameList: selectedItems,
				diagram: this
			});
		}
	},

	/**
	 * Clears items selection.
	 */
	clearSelection: function() {
		var diagram = this.getInstance();
		diagram._clearSelection();
	},

	/**
	 * Finds object on the diagram by name.
	 * @param {String} itemName
	 * @return {ej.Diagram.Node}
	 */
	findObjectByName: function(itemName) {
		var diagram = this.getInstance();
		var node = diagram._findObjectByName(itemName);
		return node;
	},

	/**
	 * Adds selection of node on diagram.
	 * @param {ej.Diagram.Node} node Diagram node object.
	 */
	addSelection: function(node) {
		var diagram = this.getInstance();
		diagram._addSelection(node);
	},

	/**
	 * Update scroll offset of node.
	 * @param {ej.Diagram.Node} node Diagram node object.
	 */
	scrollToItem: function(node) {
		var containerEl = Ext.get(this.renderToSelector);
		var itemBounds = this.getItemBounds(node);
		this.updateContainerScrollLeft(itemBounds, containerEl);
		this.updateContainerScrollTop(itemBounds, containerEl);
	},

	/**
	 * Updates container scroll left by item bounds.
	 * @private
	 * @param {Object} itemBounds Item bounds.
	 * @param {Object} containerEl Container element.
	 */
	updateContainerScrollLeft: function(itemBounds, containerEl) {
		var container = containerEl.dom;
		var containerRect = containerEl.getBox();
		var padding = 10;
		var left = itemBounds.x - padding;
		var right = itemBounds.x + itemBounds.width + padding;
		var offsetX = right - containerRect.width;
		if (left < container.scrollLeft || left < offsetX) {
			container.scrollLeft = left;
		} else if (offsetX - container.scrollLeft > 0) {
			container.scrollLeft = offsetX;
		}
	},

	/**
	 * Updates container scroll top by item bounds.
	 * @private
	 * @param {Object} itemBounds Item bounds.
	 * @param {Object} containerEl Container element.
	 */
	updateContainerScrollTop: function(itemBounds, containerEl) {
		var container = containerEl.dom;
		var containerRect = containerEl.getBox();
		var padding = 10;
		var top = itemBounds.y - padding;
		var bottom = itemBounds.y + itemBounds.height + padding + this.bottomScrollContentOffset;
		var offsetY = bottom - containerRect.height;
		if (top < container.scrollTop || top < offsetY) {
			container.scrollTop = top;
		} else if (offsetY - container.scrollTop > 0) {
			container.scrollTop = offsetY;
		}
	},

	/**
	 * Selects item by name.
	 * @param {String} itemName Item name.
	 */
	selectItem: function(itemName) {
		this.clearSelection();
		var node = this.findObjectByName(itemName);
		if (node) {
			this.addSelection(node);
			this.scrollToItem(node);
		}
	},

	/**
	 * Updates items highlighter.
	 * @param {Terrasoft.core.collections.Collection} highlightItems Items for highlight.
	 * @param {String} selectedItemName The name of selected item.
	 */
	updateItemsHighlighter: function(highlightItems, selectedItemName) {
		var diagram = this.getInstance();
		var svg = diagram._svg;
		var container = svg.getElementById("node-highlighter_container");
		if (container) {
			svg.removeChild(container, diagram._adornerLayer);
		}
		if (highlightItems && !highlightItems.isEmpty()) {
			container = svg.g({
				"id": "node-highlighter_container"
			});
			diagram._adornerLayer.appendChild(container);
			this.items.each(function(item) {
				if (highlightItems.contains(item.name)) {
					var node = this.findObjectByName(item.name);
					var element;
					if (item instanceof Terrasoft.ProcessSequenceFlowSchema) {
						element = this.drawSequenceFlowHighlighter(node, container);
					} else {
						element = this.drawElementHighlighter(node, container);
					}
					if (item.name === selectedItemName) {
						element.classList.add("node-selected");
					}
				}
			}, this);
		}
	},

	/**
	 * Draws highlighter for sequence flow.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawSequenceFlowHighlighter: function(node, container) {
		var pathData = [];
		for (var i = 0; i < node.segments.length; i++) {
			var points = node.segments[i].points;
			for (var j = 0; j < points.length; j++) {
				var pathCommand = j === 0 ? "M" : "L";
				pathData.push(pathCommand, points[j].x, points[j].y);
			}
		}
		var path = pathData.join(" ");
		var attr = {
			"id": "nodeHighlighter_" + node.name,
			"class": "node-highlighter flow-highlighter",
			"d": path
		};
		var diagram = this.getInstance();
		var element = diagram._svg.path(attr);
		container.appendChild(element);
		return element;
	},

	/**
	 * Draws highlighter for diagram element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawElementHighlighter: function(node, container) {
		var element;
		switch (node.nodeType) {
			case Terrasoft.diagram.UserHandlesConstraint.Event:
				element = this.drawEventHighlighter(node, container);
				break;
			case Terrasoft.diagram.UserHandlesConstraint.Gateway:
				var gatewayContainer = this.drawGatewayHighlighterContainer(node, container);
				element = this.drawGatewayHighlighter(node, gatewayContainer);
				break;
			default:
				element = this.drawFlowElementHighlighter(node, container);
		}
		return element;
	},

	/**
	 * Returns default attributes for highlighter svg element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @return {Object}
	 */
	getDrawHighlighterDefaultAttributes: function(node) {
		var attr = {
			"id": "nodeHighlighter_" + node.name,
			"class": "node-highlighter",
			"pointer-events": "none",
			"style": "pointer-events: none",
			"fill": "none"
		};
		return attr;
	},

	/**
	 * Returns diagram svg object.
	 * @private
	 * @return {ej.Diagram.Svg}
	 */
	getDiagramSvg: function() {
		var diagram = this.getInstance();
		var svg = diagram._svg;
		return svg;
	},

	/**
	 * Draws highlighter for event element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawEventHighlighter: function(node, container) {
		var bounds = ej.Diagram.Util.bounds(node);
		var attr = this.getDrawHighlighterDefaultAttributes(node);
		Ext.merge(attr, {
			"cx": bounds.center.x,
			"cy": bounds.center.y,
			"r": (bounds.width + 7) / 2
		});
		var svg = this.getDiagramSvg();
		var element = svg.circle(attr);
		container.appendChild(element);
		return element;
	},

	/**
	 * Draws highlighter container for gateway element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawGatewayHighlighterContainer: function(node, container) {
		var bounds = ej.Diagram.Util.bounds(node);
		var translate = {
			x: bounds.center.x,
			y: bounds.center.y - (node.height / 2) - 5
		};
		var attr = {
			id: "nodeHighlighter_rotate_g_" + node.name,
			transform: Ext.String.format("translate({0} {1}) rotate(45)", translate.x, translate.y)
		};
		var svg = this.getDiagramSvg();
		var element = svg.g(attr);
		container.appendChild(element);
		return element;
	},

	/**
	 * Draws highlighter for gateway element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawGatewayHighlighter: function(node, container) {
		var size = Math.sqrt(2 * Math.pow((node.height / 2), 2)) + 7;
		var attr = this.getDrawHighlighterDefaultAttributes(node);
		Ext.merge(attr, {
			"height": size,
			"width": size
		});
		var svg = this.getDiagramSvg();
		var element = svg.rect(attr);
		container.appendChild(element);
		return element;
	},

	/**
	 * Draws highlighter for flow element.
	 * @private
	 * @param {ej.Diagram.Node} node Target node.
	 * @param {Object} container Container for new svg shape.
	 * @return Created dom element.
	 */
	drawFlowElementHighlighter: function(node, container) {
		var width = node.width + 7;
		var height = node.height + 7;
		var bounds = ej.Diagram.Util.bounds(node);
		var attr = this.getDrawHighlighterDefaultAttributes(node);
		Ext.merge(attr, {
			"x": bounds.center.x - (width / 2),
			"y": bounds.center.y - (height / 2),
			"width": width,
			"height": height,
			"rx": 13,
			"ry": 13
		});
		var svg = this.getDiagramSvg();
		var element = svg.rect(attr);
		container.appendChild(element);
		return element;
	}
});
