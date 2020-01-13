Terrasoft.configuration.Structures["CampaignDiagram"] = {innerHierarchyStack: ["CampaignDiagram"]};
/* global ej: false */
/* jshint bitwise: false */
define("CampaignDiagram", ["terrasoft", "ext-base", "CampaignDiagramEnums", "CampaignDiagramTools", "ej-diagram",
		"CampaignDiagramItem", "css!CampaignDiagramModuleCSS"],
	function(Terrasoft, Ext, CampaignDiagramEnums) {
		/**
		 * @class Terrasoft.configuration.CampaignDiagram
		 * ##### ######### ############.
		 */
		Ext.define("Terrasoft.configuration.CampaignDiagram", {
			extend: "Terrasoft.Diagram",
			alternateClassName: "Terrasoft.CampaignDiagram",

			captionMaxLength: 51,
			captionWidth: 70,
			captionFillColor: "rgba(255,255,255,0.3)",
			fontColor: "#444444",
			fontFamily: "Segoe UI",
			elementFontSize: 12,
			connectorLineColor: "#a4a4a4",
			connectorLineWidth: 1,
			selectionColor: "#FF943B",
			arrowHeight: 5,
			arrowWidth: 8,
			captionSpace: 7,
			nodeHeight: 56,
			nodeWidth: 56,
			nodeLabelOffset: {
				x: 0.5,
				y: 1
			},
			connectorLabelOffset: {
				x: 0.5,
				y: 0.5
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#minHeight
			 */
			minHeight: 362,

			/**
			 * @inheritdoc Terrasoft.Diagram#portRadius
			 */
			portRadius: 2.5,

			/**
			 * @inheritdoc Terrasoft.Diagram#connectorPortColor
			 */
			connectorPortColor: "#FFA357",

			/**
			 * @inheritdoc Terrasoft.Diagram#disabledKeys
			 */
			disabledKeys: {
				/* Key X */
				"88": true,
				/* Key C */
				"67": true,
				/* Key V */
				"86": true,
				/* Key Y */
				"89": true,
				/* Key Z */
				"90": true
			},

			/**
			 * DeterminesDetermines when initializing of diagram items fully completed.
			 */
			isItemsInitialized: false,

			/**
			 * @inheritdoc Terrasoft.Diagram#getBindConfig
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var diagramBindConfig = {
					isItemsInitialized: {
						changeMethod: "onIsItemsInitializedChanged"
					}
				};
				return Ext.apply(diagramBindConfig, bindConfig);
			},

			/**
			 * Handles changing the isItemsInitialized property.
			 * @param {Boolean} value.
			 */
			onIsItemsInitializedChanged: function(value) {
				this.isItemsInitialized = value;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#onAddItem
			 * @overridden
			 */
			onAddItem: function(item) {
				this.callParent.call(this, [item.config]);
				if (this.isDiagramLoaded() && !this.isItemsInitialized) {
					var diagram = this.getInstance();
					diagram._clearSelection();
				}
				item.on("change", this.onItemChange, this);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#onRemoveItem
			 * @overridden
			 */
			onRemoveItem: function(item) {
				item.un("change", this.onItemChange, this);
				this.callParent.call(this, [item.config]);
			},

			/**
			 * ########## ######### ####### ######## #########.
			 * @param {Terrasoft.CampaignDiagramItem} item ####### #########.
			 */
			onItemChange: function(item) {
				if (this.isDiagramLoaded()) {
					var diagram = this.getInstance();
					var node = diagram.findNode(item.name);
					node.addInfo = item.get("AddInfo");
					//##### ########## ######, #### ##### ######, ##### ##### updateLabel ## ##########.
					var labelConfig = {"text": item.get("Text") || " "};
					diagram.updateLabel(node.name, node.labels[0], labelConfig);
					this.onDiagramChanged({});
				}
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents("changed", "diagramInitialized");
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#onDiagramMouseUp
			 * @overridden
			 */
			onDiagramMouseUp: function(event) {
				this.callParent(arguments);
				this.onDiagramChanged(event);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#onConnectorsCollectionChange
			 * @overridden
			 */
			onConnectorsCollectionChange: function(event) {
				this.callParent(arguments);
				this.onDiagramChanged(event);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#onNodesCollectionChange
			 * @overridden
			 */
			onNodesCollectionChange: function(event) {
				this.callParent(arguments);
				this.onDiagramChanged(event);
			},

			/**
			 * ########## ####### ######### #########.
			 * @param {Object} event #######.
			 */
			onDiagramChanged: function(event) {
				var diagram = this.getInstance();
				event.diagramState = diagram.save();
				this.fireEvent("changed", event);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#initDiagram
			 * @overridden
			 */
			initDiagram: function() {
				this.callParent(arguments);
				var diagram = this.diagram;
				diagram.tools.endPoint = new Terrasoft.CampaignDiagramTools.ConnectionEditTool(diagram);
				diagram._clearSelection();
				this.fireEvent("diagramInitialized", this.getInstance());
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#getNodes
			 * @overridden
			 */
			getNodes: function() {
				var nodes = this.callParent(arguments);
				var result = [];
				for (var index in nodes) {
					result.push(nodes[index].config);
				}
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#getConnectors
			 * @overridden
			 */
			getConnectors: function() {
				var connectors = this.callParent(arguments);
				var result = [];
				for (var index in connectors) {
					result.push(connectors[index].config);
				}
				return result;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#isItemConnector
			 * @overridden
			 */
			isItemConnector: function(item) {
				return this.callParent.call(this, [item.config || item]);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#getDiagramConfig
			 * @overridden
			 */
			getDiagramConfig: function() {
				var config = this.callParent(arguments);
				var diagramConfig = config.diagram;
				diagramConfig.constraints =
					ej.Diagram.DiagramConstraints.Default ^ ej.Diagram.DiagramConstraints.Zoomable;
				diagramConfig.snapSettings = {
					enableSnapToObject: false,
					snapConstraints: ej.Diagram.SnapConstraints.None
				};
				diagramConfig.selectorConstraints = ej.Diagram.SelectorConstraints.UserHandles;
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#getUserHandles
			 * @overridden
			 */
			getUserHandles: function() {
				var userHandles = this.callParent(arguments);
				userHandles.push(Terrasoft.CampaignDiagramTools.NodeSelectionTool.call(this));
				userHandles.push(Terrasoft.CampaignDiagramTools.CreateConnectionTool(this));
				return userHandles;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#nodeTemplate
			 */
			nodeTemplate: function(config) {
				config.borderWidth = 0;
				var sysImage = config.sysImage;
				config.width = config.width || this.nodeWidth;
				config.height = config.height || this.nodeHeight;
				if (sysImage) {
					config.shape = {
						"type": ej.Diagram.Shapes.Image
					};
					config.shape.src = Terrasoft.ImageUrlBuilder.getUrl(sysImage);
				} else {
					config.shape = {
						"type": ej.Diagram.Shapes.Rectangle
					};
				}
				if (config.constraints) {
					config.constraints = this.getNodeConstraints(config.constraints);
				} else {
					config.constraints = this.nodeConstraints;
				}
				this.applyNodeLabelConfig(config);
				if (this.getIsNodeConnectionsAllowed(config)) {
					var portsSet = config.portsSet ? config.portsSet : Terrasoft.diagram.PortsSet.All;
					config.ports = this.createPorts(portsSet);
				}
				config.fillColor = "rgba(0,0,0,0)";
				config.toolsConstraint = Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
					Terrasoft.diagram.ToolsConstraint.ConnectionEditTool;
				return config;
			},

			/**
			 * ########## ########### ######## ########## # #####.
			 * @param {Object} nodeConfig ############ #### #########.
			 * @returns {Boolean}
			 */
			getIsNodeConnectionsAllowed: function(nodeConfig) {
				if (nodeConfig.constraints & ej.Diagram.NodeConstraints.Connect) {
					return true;
				}
				return false;
			},

			/**
			 * ########## ########## #### #########.
			 * @param {Array} constraints ##### ######## ############.
			 * @returns {Number} ########## #### #########.
			 */
			getNodeConstraints: function(constraints) {
				if (Ext.isNumber(constraints)) {
					return constraints;
				}
				var constraint = 0;
				for (var index = 0; index < constraints.length; index++) {
					constraint = constraint | ej.Diagram.NodeConstraints[constraints[index]];
				}
				return constraint;
			},

			/**
			 * ######### ####### # ############ #### #########.
			 * @param {Object} config ############ #### #########.
			 */
			applyNodeLabelConfig: function(config) {
				this.addLabelConfig(config);
				var label = config.labels[0];
				var nodeLabelOffset = this.nodeLabelOffset;
				var marginTop = this.captionSpace / this.nodeHeight;
				label.offset = ej.datavisualization.Diagram.Point(nodeLabelOffset.x, nodeLabelOffset.y + marginTop);
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#connectorTemplate
			 */
			connectorTemplate: function(config) {
				config.segments = config.segments || [{type: ej.Diagram.Segments.Orthogonal}];
				config.lineColor = this.connectorLineColor;
				config.lineWidth = this.connectorLineWidth;
				config.targetDecorator = {
					"shape": ej.datavisualization.Diagram.DecoratorShapes.Arrow,
					"width": this.arrowWidth,
					"height": this.arrowHeight,
					"borderColor": this.connectorLineColor,
					"fillColor": this.connectorLineColor
				};
				this.applyConnectorLabelConfig(config);
				return config;
			},

			/**
			 * ######### ####### # ############ ######## #########.
			 * @param {Object} config ############ ######## #########.
			 */
			addLabelConfig: function(config) {
				if (Ext.isEmpty(config.labels)) {
					config.labels = [{text: ""}];
				}
				var text = config.labels[0].text;
				text = text || "";
				var label = ej.Diagram.Label();
				Ext.apply(label, config.labels[0]);
				label.name = "label0";
				label.text = this.convertToMaxLength(text);
				label.wrapText = false;
				label.textAlign = ej.datavisualization.Diagram.TextAlign.Center;
				label.fontSize = this.elementFontSize;
				label.fontFamily = this.fontFamily;
				label.fontColor = this.fontColor;
				label.fillColor = this.captionFillColor;
				label.verticalAlignment = ej.datavisualization.Diagram.VerticalAlignment.Top;
				label.width = this.captionWidth;
				config.labels[0] = label;
			},

			/**
			 * ########## ######### ########## #########.
			 * @private
			 * @param {Object} config ############ ### ######## ########## ## #########.
			 * @returns {Object} ######### ########## #########.
			 */
			createConnector: function(config) {
				config.name = config.name || Terrasoft.generateGUID();
				var connector = this.connectorTemplate(config);
				var item = Ext.create("Terrasoft.CampaignDiagramItem", {
					name: connector.name,
					config: connector
				});
				Ext.merge(item, connector);
				return item;
			},

			/**
			 * ######### ####### # ############ ########## #########.
			 * @param {Object} config ############ ########## #########.
			 */
			applyConnectorLabelConfig: function(config) {
				this.addLabelConfig(config);
				var label = config.labels[0];
				var labelOffset = this.connectorLabelOffset;
				label.offset = ej.datavisualization.Diagram.Point(labelOffset.x, labelOffset.y);
			},

			/**
			 * ######## ##### ## ########### ########## #####.
			 * @param {String} caption ######.
			 * @returns {String} ######.
			 */
			convertToMaxLength: function(caption) {
				if (caption.length > this.captionMaxLength) {
					var oversizeStr = "...";
					return caption.substr(0, this.captionMaxLength - oversizeStr.length) + oversizeStr;
				}
				return caption;
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#updateConnectorSelection
			 */
			updateConnectorSelection: function(svg, connector, selected) {
				var connectorName = connector.name;
				var color = selected ? this.selectionColor : this.connectorLineColor;
				svg.path({"id": connectorName + "_segments", "stroke": color});
				svg.path({"id": connectorName + "_targetDecorator", "fill": color, "stroke": color});
			},

			/**
			 * @inheritdoc Terrasoft.Diagram#customizeContainerMouseMove
			 */
			customizeContainerMouseMove: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.Diagram#onConnectionChange
			 */
			onConnectionChange: function(event) {
				if (event.changePoint === CampaignDiagramEnums.ConnectorEndpoint.Source.name ||
						event.changePoint === CampaignDiagramEnums.ConnectorEndpoint.Target.name) {
					this.fireEvent("connectorsNodesChange", event);
				}
			}
		});
	}
);


