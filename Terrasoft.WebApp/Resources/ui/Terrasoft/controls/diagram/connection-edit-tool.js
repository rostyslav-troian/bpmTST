/**
 */
Ext.define("Terrasoft.diagram.userHandles.ConnectionEditTool", {

	alternateClassName: "Terrasoft.ConnectionEditTool",

	minPortDistance: 20,

	connectionEditTool: function() {
		var base = ej.Diagram.ConnectionEditTool;

		function tool(diagram) {
			base.call(this, diagram);
		}

		var scope = this;
		var baseCheckConnectionPossible = base.prototype._checkConnectionPossible;
		base.prototype._checkConnectionPossible = function(evt) {
			var node = this.diagram._findNodeUnderMouse(evt);
			if (node) {
				var connectionPosible = this.checkIsNewConnectionPossible(node, this._endPoint);
				if (connectionPosible) {
					baseCheckConnectionPossible.apply(this, arguments);
				}
			}
		};

		var baseMousemove = base.prototype.mousemove;
		base.prototype.mousemove = function(evt) {
			var diagram = this.diagram;
			var connector = this.selectedObject;
			if (this.segments == null && connector && this._endPoint !== "segmentEnd") {
				this.segments = Terrasoft.deepClone(connector.segments);
				diagram.updateConnector(connector.name, {
					segments: [{
						type: "orthogonal"
					}]
				});
			}
			var node = diagram._findNodeUnderMouse(evt);
			if (node) {
				var connectionPosible = this.checkIsNewConnectionPossible(node, this._endPoint);
				this._setPortsVisibility(node, connectionPosible);
				if (!connectionPosible) {
					var constraints = node.constraints;
					node.constraints = ej.Diagram.NodeConstraints.None;
					var possibleConnection = this._currentPossibleConnection;
					if (possibleConnection && possibleConnection.ports) {
						this._showPort(possibleConnection, true);
					}
					ej.Diagram.SvgContext._removePortHighlighter(this.diagram._svg, this.diagram._adornerLayer);
					this._currentPossibleConnection = null;
					baseMousemove.call(this, evt);
					node.constraints = constraints;
					return;
				}
			}
			baseMousemove.call(this, evt);
		};

		base.prototype.checkIsNewConnectionPossible = function(node, endPoint) {
			var propertyName;
			var connectionsLimit;
			var sourceNode;
			var targetNode;
			var currentConnector = this.selectedObject;
			if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane ||
				node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
				return false;
			}
			if (!currentConnector) {
				return true;
			}
			var nodeName = node.name;
			if (endPoint === "targetEndPoint") {
				propertyName = "targetNode";
				connectionsLimit = node.incomingConnectionsLimit;
				targetNode = nodeName;
				sourceNode = currentConnector.sourceNode;
			} else if (endPoint === "sourceEndPoint") {
				propertyName = "sourceNode";
				connectionsLimit = node.outgoingConnectionsLimit;
				targetNode = currentConnector.targetNode;
				sourceNode = nodeName;
			}
			//deny self connections
			if (targetNode === sourceNode) {
				return false;
			}
			if (Ext.isEmpty(propertyName)) {
				return true;
			}
			var counter = 0;
			var connectors = (this.diagram && this.diagram.model.connectors) || [];
			for (var i = 0; i < connectors.length; i++) {
				var connector = connectors[i];
				if (connector.name !== currentConnector.name) {
					var propertyValue = connector[propertyName];
					if (propertyValue === nodeName) {
						counter++;
					}
					//deny duplicate connections
					if (connector.targetNode === targetNode && connector.sourceNode === sourceNode) {
						return false;
					}
				}
			}
			if (Ext.isEmpty(connectionsLimit) || (connectionsLimit === -1)) {
				return true;
			}
			return (counter < connectionsLimit);
		};

		base.prototype._setPortsVisibility = function(node, visibility) {
			var ports = node.ports;
			if (ports) {
				var diagramPortConstraints = ej.Diagram.PortConstraints;
				var portConstraints = visibility ? diagramPortConstraints.Connect : diagramPortConstraints.None;
				for (var potIndex = 0; potIndex < ports.length; potIndex++) {
					var port = ports[potIndex];
					port.constraints = portConstraints;
				}
			}
		};

		var baseFindPortAtPoint = ej.Diagram.prototype._findPortAtPoint;
		ej.Diagram.prototype._findPortAtPoint = function(point, node) {
			var port = baseFindPortAtPoint.apply(this, arguments);
			if (port == null) {
				var nodeBounds = ej.Diagram.Util.bounds(node);
				var minPortDistance = scope.minPortDistance;
				if (ej.Diagram.Geometry.containsPoint(nodeBounds, point)) {
					minPortDistance = Math.max(nodeBounds.width / 2, nodeBounds.height / 2);
				}
				node.ports.forEach(function(nodePort) {
					var portPosition = ej.Diagram.Util._getPortPosition(nodePort, nodeBounds);
					var portDistance = ej.Diagram.Geometry.distance(point, portPosition);
					if (portDistance < minPortDistance) {
						minPortDistance = portDistance;
						port = nodePort;
					}
				}, this);
			}
			return port;
		};

		ej.Diagram.extend(tool, base);

		tool.prototype._getCanConnect = function() {
			var canConnect = false;
			if (this._currentPossibleConnection) {
				canConnect = (this._possibleConnectionPort != null &&
					ej.Diagram.Util.canConnect(this._possibleConnectionPort, true));
				canConnect = (canConnect &&
					ej.Diagram.Util.canConnect(this._currentPossibleConnection));
				if (canConnect) {
					var node = this._currentPossibleConnection;
					if (node) {
						canConnect = this.checkIsNewConnectionPossible(node, this._endPoint);
					}
				}
			} else if (this._endPoint !== "targetEndPoint" && this._endPoint !== "sourceEndPoint") {
				canConnect = true;
			}
			return canConnect;
		};

		var baseMouseUp = base.prototype.mouseup;
		base.prototype.mouseup = function() {
			var endPoint = this._endPoint;
			var isEndPointEditing = (endPoint === "targetEndPoint" || endPoint === "sourceEndPoint");
			baseMouseUp.apply(this, arguments);
			var diagram = this.diagram;
			var connector = diagram.selectionList[0];
			if (connector && connector.segments) {
				if (!connector.targetNode || !connector.sourceNode) {
					diagram.undo();
					diagram.updateConnector(connector.name, {
						segments: this.segments
					});
				} else {
					diagram.tools.ConnectorRemoveHandle.currentPoint =
						scope.utils.labelUtils.getSequenceFlowCaptionPosition(connector);
					diagram._clearSelection();
					diagram.addSelection(connector);
					if (isEndPointEditing) {
						scope.fireEvent("connectorsNodesChange", [connector]);
					}
					scope.updateSequenceFlowPolylinePointPositions([connector.name]);
				}
			}
			this.segments = null;
		};
		return tool;
	},

	/**
	 * The handler to create new connections between nodes.
	 * @return {Object} Handler instance.
	 */
	createConnectionTool: function(base, scope) {
		function tool() {
			base.call(this);
			this._connector = null;
		}
		ej.Diagram.extend(tool, base);
		tool.prototype.test = function(node) {
			var connectionsLimit = node.outgoingConnectionsLimit;
			if (Ext.isEmpty(connectionsLimit) || (connectionsLimit === -1)) {
				return true;
			}
			var counter = 0;
			var connectors = (this.diagram && this.diagram.model.connectors) || [];
			for (var i = 0; i < connectors.length; i++) {
				if (connectors[i].sourceNode === node.name) {
					counter++;
				}
			}
			return (counter < connectionsLimit);
		};

		tool.prototype.mousedown = function(evt) {
			var flowType = evt.target.attributes.flowType;
			if (!flowType) {
				return;
			}
			var connectorType = flowType.value;
			var sourceItemName = this.diagram.selectionList[0].name;
			var items = scope.items;
			var sourceFlowElement = items.get(sourceItemName);
			var sequenceFlow = Ext.create("Terrasoft.Process" + connectorType + "Schema", {
				name: connectorType,
				sourceNode: sourceItemName,
				sourceRefUId: sourceFlowElement.uId,
				targetRefUId: Terrasoft.GUID_EMPTY,
				sourceSequenceFlowPointLocalPosition: "1;0",
				targetPoint: scope.getOffsetMousePosition(evt),
				showPropertiesWindowOnAdding: true,
				isValidateExecuted: false
			});
			if (sequenceFlow.flowType === Terrasoft.ProcessSchemaEditSequenceFlowType.CONDITIONAL) {
				sequenceFlow.isValid = false;
			}
			var name;
			sequenceFlow.uId = Terrasoft.generateGUID();
			if (scope.fireEvent("generateItemNameAndCaption", sequenceFlow) === false) {
				name = sequenceFlow.name;
			} else {
				var index = 1;
				var defName = sequenceFlow.name;
				name = defName + index;
				while (items.contains(name)) {
					index++;
					name = defName + index;
				}
				sequenceFlow.name = name;
			}
			items.add(name, sequenceFlow);
			this.selectedObject = this._connector = this.diagram._findConnector(name);
			this.undoObject = this._getClonedObject(this.selectedObject);
			this._endPoint = "targetEndPoint";
			this.targetid = "targetEndPoint";
			this._selectedSegment = "";
		};

		tool.prototype.mouseup = function(evt) {
			var canConnect = base.prototype._getCanConnect.call(this, evt);
			base.prototype.mouseup.call(this, evt);
			if (!canConnect) {
				scope.items.removeByKey(this._connector.name);
			}
		};
		tool.connectionChange = this.onConnectionChange.bind(this);
		return tool;
	},

	/**
	 * Returns the handler to create new connections between nodes.
	 * @return {Object} Handler instance.
	 */
	getConnectionEditTool: function() {
		if (this.createConnectionHandle) {
			return this.createConnectionHandle;
		}
		var createConnectionHandle = this.createConnectionHandle = ej.Diagram.UserHandle({
			XLINK_NAMESPACE: "http://www.w3.org/1999/xlink",
			XLINK_ATTRIBUTE: "xlink:href",
			TOOL_SIZE: 21,
			NODE_BORDER_WIDTH: 7,
			TOOL_MARGIN: 6,
			name: "CreateConnectionHandle",
			size: 21,
			constraint: Terrasoft.diagram.ToolsConstraint.ConnectionEditTool,
			position: {
				x: 0,
				y: 0
			},
			enableMultiSelection: false,
			renderUserHandle: this.connectionRenderUserHandle,
			upateHandle: this.connectionUpateHandle,
			renderToolFilter: this.renderToolFilter,
			getImageUrl: this.getImageUrl,
			renderTool: this.renderTool,
			getPosition: this.getPosition,
			renderTools: this.renderTools
		});
		var CreateConnectionTool = this.createConnectionTool(this.connectionEditTool(), this);
		createConnectionHandle.tool = new CreateConnectionTool();
		return createConnectionHandle;
	},

	connectionRenderUserHandle: function(handle, node, svg, scale, parent, diagram) {
		var flowElement = diagram.items.get(node.name);
		var handles = flowElement.getConnectionUserHandles();
		var g = svg.g({
			id: svg.document.id + "userHandle_g",
			"class": "userHandle"
		});
		parent.appendChild(g);
		handle.renderTools(handles, node, g, svg, diagram);
	},

	renderTools: function(handles, node, g, svg, diagram) {
		var isDefaultSequenceFlowExist = false;
		if (handles.length > 1) {
			isDefaultSequenceFlowExist = node.outEdges.some(function(item) {
				var sequenceFlow = diagram.items.get(item);
				return (sequenceFlow instanceof Terrasoft.ProcessDefaultSequenceFlowSchema);
			});
		}
		if (handles.length === 1) {
			this.renderTool(handles[0], g, svg, node, "center", diagram);
		}
		if (handles.length === 2) {
			this.renderTool(handles[0], g, svg, node, "top", diagram);
			if (!isDefaultSequenceFlowExist) {
				this.renderTool(handles[1], g, svg, node, "bottom", diagram);
			}
		}
		if (handles.length === 3) {
			this.renderTool(handles[0], g, svg, node, "top", diagram);
			if (!isDefaultSequenceFlowExist) {
				this.renderTool(handles[1], g, svg, node, "center", diagram);
			}
			this.renderTool(handles[2], g, svg, node, "bottom", diagram);
		}
	},

	getPosition: function(node, location) {
		var nodeBounds = ej.Diagram.Util.bounds(node);
		var middleRightPosition = nodeBounds.middleRight;
		var position = {
			x: middleRightPosition.x - (this.TOOL_SIZE / 2) + this.NODE_BORDER_WIDTH,
			y: middleRightPosition.y
		};
		switch (location) {
			case "top":
				position.y = position.y - (this.TOOL_SIZE / 2) - this.TOOL_SIZE - this.TOOL_MARGIN;
				if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
					position.x = position.x - this.NODE_BORDER_WIDTH;
					position.y = middleRightPosition.y - this.TOOL_SIZE - (this.TOOL_MARGIN / 2);
				}
				break;
			case "center":
				position.y = position.y - (this.TOOL_SIZE / 2);
				break;
			case "bottom":
				position.y = position.y + (this.TOOL_SIZE / 2) + this.TOOL_MARGIN;
				if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
					position.x = position.x - this.NODE_BORDER_WIDTH;
					position.y = middleRightPosition.y + (this.TOOL_MARGIN / 2);
				}
				break;
		}
		return position;
	},

	renderTool: function(name, g, svg, node, location, diagram) {
		var position = this.getPosition(node, location, diagram);
		var toolId = this.name + "_" + name + "_shape";
		var toolRendered = svg.getElementById(toolId);
		if (toolRendered) {
			svg.image({
				id: toolId,
				x: position.x,
				y: position.y
			});
			return;
		}
		if (!this.filter) {
			this.filter = this.renderToolFilter({
				name: "CreateConnectionHandle",
				constraints: ej.Diagram.NodeConstraints.Shadow,
				width: this.TOOL_SIZE,
				height: this.TOOL_SIZE
			}, svg);
		}
		var imageConf = {
			id: toolId,
			flowType: name,
			width: this.TOOL_SIZE,
			height: this.TOOL_SIZE,
			x: position.x,
			y: position.y,
			// TODO class - keyword in quotation marks to wrap not pricked all-combine.js
			"class": "userHandle " + name + "Handle",
			preserveAspectRatio: "none",
			filter: this.filter
		};
		var image = svg.image(imageConf);
		var imageUrl = this.getImageUrl(name + ".svg");
		image.setAttributeNS(this.XLINK_NAMESPACE, this.XLINK_ATTRIBUTE, imageUrl);
		g.appendChild(image);
	},

	connectionUpateHandle: function(handle, node, svg, isDragging, scale, diagram) {
		var flowElement = diagram.items.get(node.name);
		var handles = flowElement.getConnectionUserHandles();
		for (var i = 0; i < handles.length; ++i) {
			var tool = svg.getElementById(handle.name + "_" + handles[i] + "_shape");
			if (!tool) {
				continue;
			}
			if (!isDragging && handle.visible) {
				tool.style.display = "block";
			} else {
				tool.style.display = "none";
			}
		}
		handle.renderTools(handles, node, null, svg, diagram);
	}

});
