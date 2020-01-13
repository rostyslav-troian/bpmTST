Terrasoft.configuration.Structures["CampaignDiagramTools"] = {innerHierarchyStack: ["CampaignDiagramTools"]};
/* global ej: false */
/**
 * ########### ### ###### # ########## ########.
 */
define("CampaignDiagramTools", ["terrasoft", "ext-base", "CampaignEnums", "CampaignDiagramEnums", "ej-diagram"],
		function(Terrasoft, Ext, campaignEnums, campaignDiagramEnums) {

			/**
			 * ########## ########## ############## ########## ## ##### #########.
			 * @returns {Object}
			 */
			var getConnectionEditTool = function() {
				return (function(base) {
					function tool(diagram) {
						base.call(this, diagram);
					}

					ej.datavisualization.Diagram.extend(tool, base);
					tool.prototype._checkIsNewConnectionPossible = function(node, endPoint) {
						var propertyName;
						var connectionsLimit;
						var sourceNode;
						var targetNode;
						var currentConnector = this.selectedObject;
						if (!currentConnector) {
							return true;
						}
						var nodeName = node.name;
						switch (endPoint) {
							case campaignDiagramEnums.ConnectorEndpoint.Target.name:
								propertyName = campaignDiagramEnums.ConnectorEndpoint.Target.propertyName;
								connectionsLimit = this._getConnectionsLimit(node,
									campaignDiagramEnums.ConnectionsLimit.INCOMING);
								targetNode = nodeName;
								sourceNode = currentConnector.sourceNode;
								break;
							case campaignDiagramEnums.ConnectorEndpoint.Source.name:
								propertyName = campaignDiagramEnums.ConnectorEndpoint.Source.propertyName;
								connectionsLimit = this._getConnectionsLimit(node,
									campaignDiagramEnums.ConnectionsLimit.OUTGOING);
								targetNode = currentConnector.targetNode;
								sourceNode = nodeName;
								break;
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
								//deny loop
								if (connector.targetNode === sourceNode && connector.sourceNode === targetNode) {
									return false;
								}
							}
						}
						var sourceNodeElement = {};
						var targetNodeElement = {};
						var nodes = (this.diagram && this.diagram.model.nodes) || [];
						for (var y = 0; y < nodes.length; y++) {
							var elementNode = nodes[y];
							if (elementNode.name === sourceNode) {
								sourceNodeElement = elementNode;
							} else if (elementNode.name === targetNode) {
								targetNodeElement = elementNode;
							}
						}
						var isStepTypeConnectorAllow = campaignEnums.IsStepTypeConnectionAllow(
										sourceNodeElement.stepType || "", targetNodeElement.stepType || "");
						if (isStepTypeConnectorAllow === false) {
							return isStepTypeConnectorAllow;
						}
						if (Ext.isEmpty(connectionsLimit)) {
							return true;
						}
						return (counter < connectionsLimit);
					};

					tool.prototype._setPortsVisibility = function(node, visibility) {
						var ports = node.ports;
						if (ports) {
							var diagramPortConstraints = ej.datavisualization.Diagram.PortConstraints.Connect;
							var portConstraints = visibility ? diagramPortConstraints.Connect : diagramPortConstraints.None;
							for (var potIndex = 0; potIndex < ports.length; potIndex++) {
								var port = ports[potIndex];
								port.constraints = portConstraints;
							}
						}
					};

					tool.prototype.mousemove = function(evt) {
						var node = this.diagram._findNodeUnderMouse(evt);
						if (node) {
							var connectionPosible = this._checkIsNewConnectionPossible(node, this._endPoint);
							this._setPortsVisibility(node, connectionPosible);
							if (!connectionPosible) {
								var constraints = node.constraints;
								node.constraints = ej.datavisualization.Diagram.NodeConstraints.None;
								base.prototype.mousemove.call(this, evt);
								node.constraints = constraints;
								return;
							}
						}
						base.prototype.mousemove.call(this, evt);
					};

					tool.prototype._getCanConnect = function(evt) {
						var canConnect = false;
						if (this._currentPossibleConnection) {
							canConnect = (this._possibleConnectionPort &&
									ej.datavisualization.Diagram.Util.canConnect(this._possibleConnectionPort, true));
							canConnect = (canConnect ||
									ej.datavisualization.Diagram.Util.canConnect(this._currentPossibleConnection));
							if (canConnect) {
								var node = this.diagram._findNodeUnderMouse(evt);
								if (node) {
									canConnect = this._checkIsNewConnectionPossible(node, this._endPoint);
								}
							}
						} else if (this._endPoint !== campaignDiagramEnums.ConnectorEndpoint.Target.name &&
								this._endPoint !== campaignDiagramEnums.ConnectorEndpoint.Source.name) {
							canConnect = true;
						}
						return canConnect;
					};

					tool.prototype.mouseup = function(evt) {
						var canConnect = this._getCanConnect(evt);
						var diagram = this.diagram;
						if (canConnect) {
							var connector = diagram.selectionList[0];
							if (connector) {
								var event = {
									element: connector,
									connectorName: this.selectedObject.name,
									changePoint: this._endPoint,
									changePointName: this._currentPossibleConnection ?
										this._currentPossibleConnection.name : null
								};
								diagram.model.connectionChange(event);
							}

						}
						base.prototype.mouseup.call(this, evt);
						if (!canConnect) {
							diagram.undo();
						}
					};

					tool.prototype._getConnectionsLimit = function(node, connectionType) {
						var positions = node.positions;
						var connectionLimit;
						if (!positions) {
							connectionLimit = node[connectionType];
						} else {
							for (var positionName in positions) {
								if (positions.hasOwnProperty(positionName)) {
									var position = positions[positionName];
									if (position.isInPosition(node)) {
										connectionLimit = position[connectionType];
										break;
									}
								}
							}
						}
						return connectionLimit;
					};

					return tool;
				})(ej.datavisualization.Diagram.ConnectionEditTool);
			};

			/**
			 * ########## ########## ######## ##### ########## ##### ######.
			 * @returns {Object}
			 */
			var getCreateConnectionTool = function(scope) {
				if (scope.createConnectionHandle) {
					return scope.createConnectionHandle;
				}
				var handleDefaults = campaignDiagramEnums.DefaultCreateConnnectionHandleConfig;
				//Coordinates 0,0 is the middle of node element
				var toolPositionBottomRight = {x: scope.nodeWidth / 2, y: scope.nodeHeight / 2};
				var offset = handleDefaults.offset;
				var createConnectionHandle = scope.createConnectionHandle = ej.datavisualization.Diagram.UserHandle({
					name: "CreateConnectionHandle",
					size: handleDefaults.size,
					constraint: Terrasoft.diagram.ToolsConstraint.ConnectionEditTool,
					position: {x: toolPositionBottomRight.x + offset.x, y: toolPositionBottomRight.y + offset.y},
					enableMultiSelection: false,
					backgroundColor: handleDefaults.backgroundColor,
					pathData: "M32.699,22.408L25.213,25.65L27.035,27.472L22.5,31.793L23.207,32.5L27.742,28.18L29.455,29.893"
				});
				var CreateConnectionTool = (function(base, scope) {
					function tool(context) {
						base.call(this);
						this._connector = null;
						if (!Ext.isEmpty(context)) {
							this.scope = context;
						} else {
							this.scope = scope;
						}
					}

					ej.datavisualization.Diagram.extend(tool, base);

					tool.prototype.test = function(node) {
						if (!this.scope.enabled) {
							return false;
						}
						var connectionsLimit = this._getConnectionsLimit(node,
							campaignDiagramEnums.ConnectionsLimit.OUTGOING);
						if (Ext.isEmpty(connectionsLimit)) {
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
						var connectorConfig = {
							targetPoint: {
								x: evt.offsetX,
								y: evt.offsetY
							},
							sourceNode: this.diagram.selectionList[0].name
						};
						var connector = this._connector = this.scope.createConnector(connectorConfig);
						this.scope.items.add(connector.name, connector);
						this.selectedObject = this.diagram._findConnector(connector.name);
						this.diagram.addSelection(this.selectedObject);
						this.undoObject = this._getClonedObject(this.selectedObject);
						this.targetid = this._endPoint = campaignDiagramEnums.ConnectorEndpoint.Target.name;
						this._selectedSegment = "";
					};

					tool.prototype.mouseup = function(evt) {
						var canConnect = base.prototype._getCanConnect.call(this, evt);
						base.prototype.mouseup.call(this, evt);
						if (!canConnect) {
							var connector = this.diagram.nameTable[this._connector.name];
							var node = this.diagram._findNodeUnderMouse(evt);
							if (node) {
								var targetNode = {name: connector.name, targetNode: node.name};
								this.diagram._removeEdges(targetNode);
							}
							this.diagram.remove(connector);
						}
					};

					return tool;
				})(Terrasoft.CampaignDiagramTools.ConnectionEditTool, scope);
				createConnectionHandle.tool = new CreateConnectionTool(scope);
				return createConnectionHandle;
			};

			/**
			 * ########## ########## ########### ########## #####.
			 * @returns {Object}
			 */
			var getNodeSelectionTool = function() {
				if (this.nodeSelectionHandle) {
					return this.nodeSelectionHandle;
				}
				var handleDefaults = campaignDiagramEnums.DefaultNodeSelectionHandleConfig;
				var nodeSelectionHandle = this.nodeSelectionHandle = ej.Diagram.UserHandle({
					name: "NodeSelectionHandle",
					size: handleDefaults.size,
					constraint: Terrasoft.diagram.ToolsConstraint.NodeSelectionTool,
					position: {x: 0, y: 0},
					enableMultiSelection: false,
					backgroundColor: handleDefaults.backgroundColor,
					pathColor: handleDefaults.pathColor,
					pathData: "M60,0h-3v1h3V0L60,0z M55,0h-3v1h3V0L55,0z M50,0h-3v1h3V0L50,0z M45,0h-3v1h3V0L45,0z " +
							"M40,0h-3v1h3V0L40,0z M35,0h-3v1h3V0L35,0z M30,0h-3v1h3V0L30,0z M25,0h-3v1h3V0L25,0z " +
							"M20,0h-3v1h3V0L20,0z M15,0h-3v1h3V0L15,0z M10,0H7v1h3V0L10,0z M5,0H2v1h3V0L5,0z " +
							"M1,0H0v3h1V0L1,0z M1,5H0v3h1V5L1,5z M1,10H0v3h1V10L1,10z M1,15H0v3h1V15L1,15z " +
							"M1,20H0v3h1V20L1,20z M1,25H0v3 h1V25L1,25z M1,30H0v3h1V30L1,30z M1,35H0v3h1V35L1,35z " +
							"M1,40H0v3h1V40L1,40z M1,45H0v3h1V45L1,45z M1,50H0v3h1V50L1,50z M1,55H0v3 h1V55L1,55z " +
							"M3,59H0v1h3V59L3,59z M8,59H5v1h3V59L8,59z M13,59h-3v1h3V59L13,59z M18,59h-3v1h3V59L18,59z " +
							"M23,59h-3v1h3V59L23,59z M28,59h-3v1h3V59L28,59z M33,59h-3v1h3V59L33,59z M38,59h-3v1h3V59L38," +
							"59z M43,59h-3v1h3V59L43,59z M48,59h-3v1h3V59L48,59z M53,59 h-3v1h3V59L53,59z " +
							"M58,59h-3v1h3V59L58,59z M60,57h-1v3h1V57L60,57z M60,52h-1v3h1V52L60,52z M60,47h-1v3h1V47L60," +
							"47z M60,42h-1v3h1 V42L60,42z M60,37h-1v3h1V37L60,37z M60,32h-1v3h1V32L60,32z " +
							"M60,27h-1v3h1V27L60,27z M60,22h-1v3h1V22L60,22z M60,17h-1v3h1V17 L60,17z " +
							"M60,12h-1v3h1V12L60,12z M60,7h-1v3h1V7L60,7z M60,2h-1v3h1V2L60,2z"
				});
				var CustomMoveTool = (function(base) {
					function tool(diagram) {
						base.call(this, diagram);
					}

					ej.datavisualization.Diagram.extend(tool, base);
					tool.prototype._findNodeUnderMouse = function(evt, skip) {
						var obj = base.prototype._findNodeUnderMouse.call(this, evt, skip);
						if (!obj && !Ext.isEmpty(this.diagram.selectionList)) {
							obj = this.diagram.selectionList[0];
						}
						return obj;
					};
					return tool;
				})(ej.Diagram.MoveTool);
				nodeSelectionHandle.tool = new CustomMoveTool(null);
				return nodeSelectionHandle;
			};

			Ext.define("Terrasoft.diagram.userHandles.CampaignDiagramTools", {
				alternateClassName: "Terrasoft.CampaignDiagramTools",
				createConnectionHandle: null,
				nodeSelectionHandle: null,

				statics: {
					/**
					 * ########## ### ############## ########## ## ##### #########.
					 */
					ConnectionEditTool: getConnectionEditTool(),

					/**
					 * ########## ### ######## ##### ########## ##### ######.
					 */
					CreateConnectionTool: getCreateConnectionTool,

					/**
					 * ########## ### ########### ########## #####.
					 */
					NodeSelectionTool: getNodeSelectionTool
				}
			});
		}
);


