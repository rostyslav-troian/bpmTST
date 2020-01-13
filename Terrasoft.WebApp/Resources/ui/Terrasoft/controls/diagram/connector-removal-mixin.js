/**
 * Mixin class for diagram.js, that contains connector removal logic.
 */
Ext.define("Terrasoft.mixins.ConnectorRemovalMixin", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.ConnectorRemovalMixin",

	/**
	 * Diagram where node will be deleted.
	 * @type {Object}
	 * @private
	 */
	diagram: null,

	/**
	 * Diagram name table that contains all diagram elements.
	 * @type {Array}
	 * @private
	 */
	nameTable: null,

	/**
	 * Initialize util class arguments.
	 * @param {Object} diagram Diagram where node will be deleted.
	 */
	init: function(diagram) {
		this.diagram = diagram;
		this.nameTable = diagram.nameTable;
	},

	/**
	 * Removes connectors with null references.
	 * @param {Object} node Node that will be removed.
	 * @param {Object} args Arguments object.
	 * @param {ej.Diagram} diagram Diagram where node will be deleted.
	 */
	removeConnector: function(node, args) {
		var inEdges = node.inEdges;
		var outEdges = node.outEdges;
		if (!node.segments && args.deleteDependent) {
			if (inEdges && inEdges.length > 0) {
				this.removeNullConnectorsReferences(inEdges);
			}
			if (outEdges && outEdges.length > 0) {
				this.removeNullConnectorsReferences(outEdges);
			}
		}
	},

	/**
	 * Reconnects connectors to first non-recursive connector.
	 * @param {Object} node Node that will be removed.
	 * @param {Object} args Arguments object.
	 * @param {Boolean} isChild Is node a child object.
	 * @param {Object} diagram Diagram where node will be deleted.
	 */
	disconnect: function(node, args, isChild) {
		if (!this.getByName(node.name)) {
			return;
		}
		var haveInConnectors = this.getEdgesAreNotEmpty(node.inEdges);
		var haveOutConnectors = this.getEdgesAreNotEmpty(node.outEdges);

		this.removeObviousRecursion(node);
		this.removeHiddenRecursion(node);
		this.removeTransitivity(node);
		if (args.deleteDependent && args.adjustDependent && !isChild) {
			if (haveInConnectors && haveOutConnectors) {
				this.reconnectInConnectorsToFirstOutConnector(node);
			} else if (haveInConnectors) {
				this.removeInConnectorsReferences(node);
			} else if (haveOutConnectors) {
				this.removeOutConnectorsReferences(node);
			}
		} else {
			this.deleteAllConnectors(node);
		}
	},

	/**
	 * Returns true if edges are not empty.
	 * @param {Array} edges Array of connector names.
	 * @private
	 * @return {Boolean} Are edges not empty?
	 */
	getEdgesAreNotEmpty: function(edges) {
		return edges && edges.length > 0;
	},

	/**
	 * Returns element from diagram nameTable.
	 * @param {String} name Name of the object.
	 * @private
	 * @return {Object} Element from diagram nameTable.
	 */
	getByName: function(name) {
		return this.nameTable[name];
	},

	/**
	 * Removes all connectors references in array, that have null references in both target or source nodes.
	 * @param {Array} edges Array of node edges where connectors will be removed.
	 * @private
	 */
	removeNullConnectorsReferences: function(edges) {
		for (var i = edges.length - 1; i >= 0; i--) {
			var connector = this.getByName(edges[i]);
			if (connector && (!connector.sourceNode || !connector.targetNode)) {
				this.diagram._remove(connector, true);
			}
		}
	},

	/**
	 * Removes all obvious recursions, where connector target and source nodes are the same.
	 * @param {Object} node Affected node.
	 * @private
	 */
	removeObviousRecursion: function(node) {
		var outs = this.getNodeOuts(node);
		for (var i = outs.length - 1; i >= 0 ; i--) {
			var out = outs[i];
			if (out.targetNode.name === node.name) {
				this.deleteConnector(out.connector);
			}
		}
	},

	/**
	 * Removes all hidden recursions, where 'A' node (that will be deleted) is connected to node,
	 * that is connected back to node 'A'.
	 * @param {Object} node Affected node.
	 * @private
	 */
	removeHiddenRecursion: function(node) {
		var originalOuts = this.getNodeOuts(node);
		originalOuts.forEach(function(originalOut) {
			var possibleRecursiveOuts = this.getNodeOuts(originalOut.targetNode);
			for (var i = possibleRecursiveOuts.length - 1; i >= 0; i--) {
				var possibleRecursiveOut = possibleRecursiveOuts[i];
				if (possibleRecursiveOut.targetNode.name === node.name) {
					this.deleteConnector(possibleRecursiveOut.connector);
				}
			}
		}, this);
	},

	/**
	 * Removes all transitive connectors. If 'B' node is connected to 'A' node (that will be deleted),
	 * 'A' is connected to 'C', 'B' is connected to 'C' too => for the sake of avoiding double connection situation,
	 * this method remove 'A' to 'C' connection.
	 * @param {Object} node Affected node.
	 * @private
	 */
	removeTransitivity: function(node) {
		var nodes = this.getConnectedNodes(node);
		for (var i = nodes.incomingNodes.length - 1; i >= 0; i--) {
			for (var j = nodes.outgoingNodes.length - 1; j >= 0; j--) {
				var inNode = nodes.incomingNodes[i];
				var outNode = nodes.outgoingNodes[j];
				if (this.getAreNodesConnected(inNode, outNode)) {
					var connectorToRemove = this.getConnectorBetween(node, outNode);
					if (connectorToRemove) {
						this.deleteConnector(connectorToRemove);
					}
				}
			}
		}
	},

	/**
	 * Reconnects all inConnectors to first found outConnector.
	 * @param {Object} node Affected node.
	 * @private
	 */
	reconnectInConnectorsToFirstOutConnector: function(node) {
		var inConnectors = this.getInConnectors(node);
		var outEdge = node.outEdges[0];
		var destinationConnector = outEdge ? this.getByName(outEdge) : null;
		if (destinationConnector) {
			var destinationNode = this.getByName(destinationConnector.targetNode);
			for (var i = inConnectors.length - 1; i >= 0 ; i--) {
				var inConnector = inConnectors[i];
				inConnector.targetNode = destinationConnector.targetNode;
				inConnector.targetPort = destinationConnector.targetPort;
				destinationNode.inEdges.push(inConnector.name);
				ej.datavisualization.Diagram.Util.dock(inConnector, this.nameTable);
				ej.datavisualization.Diagram.DiagramContext.update(inConnector, this.diagram);
			}
		} else {
			this.removeInConnectorsReferences(node);
		}
		this.removeOutConnectorsReferences(node);
	},

	/**
	 * Clears all inConnectors references to connected source node, that`s why they will be removed
	 * after ts-diagram _removeConnector() method will be called.
	 * @param {Object} node Affected node.
	 * @private
	 */
	removeInConnectorsReferences: function(node) {
		var scope = this;
		this.removeConnectorsReferences(node.inEdges, function(connector) {
			return scope.getByName(connector.sourceNode).outEdges;
		});
	},

	/**
	 * Clears all outConnectors references to connected target node, that`s why they will be removed
	 * after ts-diagram _removeConnector() method will be called.
	 * @param {Object} node Affected node.
	 * @private
	 */
	removeOutConnectorsReferences: function(node) {
		var scope = this;
		this.removeConnectorsReferences(node.outEdges, function(connector) {
			return scope.getByName(connector.targetNode).inEdges;
		});
	},

	/**
	 * Clears all connectors references to connected node, that`s why they will be removed
	 * after ts-diagram _removeConnector() method will be called.
	 * @param {Array} connectorsNames Names of the connectors which references will be removed.
	 * @param {Function} getEdgesWhereToRemove Function that selects edges where connectors names will be removed.
	 * @private
	 */
	removeConnectorsReferences: function(connectorsNames, getEdgesWhereToRemove) {
		if (connectorsNames.length === 0) {
			return;
		}
		for (var i = connectorsNames.length - 1; i >= 0; i--) {
			var connector = this.getByName(connectorsNames[i]);
			Ext.Array.remove(getEdgesWhereToRemove(connector), connector.name);
			this.clearConnector(connector);
		}
	},

	/**
	 * Clears all out and inConnectors references to connected nodes, that`s why they will be removed
	 * after ts-diagram _removeConnector() method will be called.
	 * @param {Object} node Affected node.
	 * @private
	 */
	deleteAllConnectors: function(node) {
		this.removeInConnectorsReferences(node);
		this.removeOutConnectorsReferences(node);
	},

	/**
	 * Clears connector target and source references.
	 * @private
	 * @param {Object} connector Connector that will be cleared.
	*/
	clearConnector: function(connector) {
		connector.sourceNode = null;
		connector.sourcePort = null;
		connector.targetNode = null;
		connector.targetPort = null;
	},

	/**
	 * Instantly removes connector and its references from diagram.
	 * @private
	 * @param {Object} connector Connector that will be deleted.
	 */
	deleteConnector: function(connector) {
		Ext.Array.remove(this.getByName(connector.targetNode).inEdges, connector.name);
		Ext.Array.remove(this.getByName(connector.sourceNode).outEdges, connector.name);
		this.clearConnector(connector);
		this.diagram._remove(connector, true);
	},

	/**
	 * Returns first found connector between two nodes.
	 * @private
	 * @param {Object} fromNode Source node of the connector.
	 * @param {Object} toNode Target node of the connector.
	 * @return {Object} Connector between two nodes.
	 */
	getConnectorBetween: function(fromNode, toNode) {
		var connector = null;
		var outEdges = fromNode.outEdges;
		var inEdges = toNode.inEdges;
		for (var i = outEdges.length - 1; i >= 0; i--) {
			for (var j = inEdges.length - 1; j >= 0; j--) {
				var outEdge = outEdges[i];
				var inEdge = inEdges[j];
				if (outEdge === inEdge) {
					connector = this.getByName(outEdge);
					break;
				}
			}
		}
		return connector;
	},

	/**
	 * Checks if two nodes are connected.
	 * @private
	 * @param {Object} sourceNode SourceNode of the connector.
	 * @param {Object} targetNode TargetNode of the connector.
	 * @return {Boolean} Are nodes connected.
	 */
	getAreNodesConnected: function(sourceNode, targetNode) {
		return sourceNode.outEdges.some(function(edge) {
			var connector = this.getByName(edge);
			return connector.targetNode === targetNode.name;
		}, this);
	},

	/**
	 * Returns array of node outs. Out - is a pair of connector and it`s targetNode objects.
	 * @private
	 * @param {Object} node Node from which outs will be taken.
	 * @return {Array} Array contains consists of outConnector and it`s targetNode pair.
	 */
	getNodeOuts: function(node) {
		var outs = [];
		var outEdges = node.outEdges;
		for (var i = outEdges.length - 1; i >= 0; i--) {
			var destinationConnector = this.getByName(outEdges[i]);
			var destinationNode = this.getByName(destinationConnector.targetNode);
			outs.push({
				connector: destinationConnector,
				targetNode: destinationNode
			});
		}
		return outs;
	},

	/**
	 * Returns object that consist of array of all incoming nodes and array of all outgoing nodes.
	 * @private
	 * @param {Object} node Node from which connected nodes will be taken.
	 * @return {Object} Objects consist of array of all incoming nodes and array of all outgoing nodes.
	 */
	getConnectedNodes: function(node) {
		var nodes = {
			incomingNodes: [],
			outgoingNodes: []
		};
		var outEdges = node.outEdges;
		var inEdges = node.inEdges;
		var i;
		for (i = outEdges.length - 1; i >= 0; i--) {
			var outConnector = this.getByName(outEdges[i]);
			nodes.outgoingNodes.push(this.getByName(outConnector.targetNode));
		}
		for (i = inEdges.length - 1; i >= 0; i--) {
			var inConnector = this.getByName(inEdges[i]);
			nodes.incomingNodes.push(this.getByName(inConnector.sourceNode));
		}
		return nodes;
	},

	/**
	 * Returns array of all inConnector objects.
	 * @private
	 * @param {Object} node Node from which in will be taken.
	 * @return {Object} Objects consist of array of all incoming nodes and array of all outgoing nodes.
	 */
	getInConnectors: function(node) {
		var inConnectors = [];
		for (var i = node.inEdges.length - 1; i >= 0; i--) {
			inConnectors.push(this.getByName(node.inEdges[i]));
		}
		return inConnectors;
	}
});
