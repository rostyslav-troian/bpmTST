/**
 */
Ext.define("Terrasoft.manager.ProcessSequenceFlowSchema", {
	extend: "Terrasoft.manager.ProcessBaseElementSchema",
	alternateClassName: "Terrasoft.ProcessSequenceFlowSchema",

	//region Properties: Private

	/**
	 * Technical property for old designer compatibility.
	 * @private
	 * @type {Number}
	 */
	visualType: 1,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#toolsConstraint
	 * @override
	 */
	toolsConstraint: Terrasoft.diagram.ToolsConstraint.ConnectorRemoveTool,

	/**
	 * Technical property for old designer compatibility.
	 * @private
	 * @type {Object}
	 */
	curveCenterPosition: null,

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#nodeType
	 * @protected
	 * @override
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Connector,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "0d8351f6-c2f4-4737-bdd9-6fbfe0837fec",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaSequenceFlow",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @protected
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.FlowCaption,

	/**
	 * Condition.
	 * @protected
	 * @type {String}
	 */
	conditionExpression: null,

	/**
	 * Color.
	 * @protected
	 * @type {String}
	 */
	strokeColor: "FF939598",

	/**
	 * Caption background color.
	 * @protected
	 * @override
	 * @type {String}
	 */
	captionBackcolor: "rgba(255, 255, 255, 0.6)",

	/**
	 * Connector bridge diameter.
	 * @protected
	 * @type {Number}
	 */
	connectorBridgeSpace: 8,

	/**
	 * Connector line color.
	 * @protected
	 * @type {String}
	 */
	connectorLineColor: "#A4A4A4",

	/**
	 * Arrow width.
	 * @protected
	 * @type {Number}
	 */
	arrowWidth: 8,

	/**
	 * Arrow height.
	 * @protected
	 * @type {Number}
	 */
	arrowHeight: 5,

	/**
	 * Source element name.
	 * @protected
	 * @type {String}
	 */
	sourceRefUId: null,

	/**
	 * Source element name.
	 * @protected
	 * @type {String}
	 */
	sourceNode: null,

	/**
	 * Target element name.
	 * @protected
	 * @type {String}
	 */
	targetRefUId: null,

	/**
	 * Target element name.
	 * @protected
	 * @type {String}
	 */
	targetNode: null,

	/**
	 * Target point.
	 * @protected
	 * @type {Object}
	 */
	targetPoint: null,

	/**
	 * Source element port name.
	 * @protected
	 * @type {String}
	 */
	sourceSequenceFlowPointLocalPosition: null,

	/**
	 * Target element port position.
	 * @protected
	 * @type {String}
	 */
	targetSequenceFlowPointLocalPosition: null,

	/**
	 * Points fracture line on the diagram.
	 * @protected
	 * @type {Object[]}
	 */
	polylinePointPositions: null,

	/**
	 * Sequence flow name.
	 * @type {String}
	 */
	connectionUserHandleName: "SequenceFlow",

	/**
	 * Sequence flow type.
	 * @protected
	 * @type {Terrasoft.process.enums.ProcessSchemaEditSequenceFlowType}
	 */
	flowType: Terrasoft.ProcessSchemaEditSequenceFlowType.SEQUENCE,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "SequenceFlowPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "sequenceFlow_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	emptyDiagramCaption: true,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint: Terrasoft.Resources.ProcessSchemaDesigner.Elements.FlowHint,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.name = this.name|| this.connectionUserHandleName;
		this.sourceSequenceFlowPointLocalPosition = this.getPortName(this.sourceSequenceFlowPointLocalPosition);
		this.targetSequenceFlowPointLocalPosition = this.getPortName(this.targetSequenceFlowPointLocalPosition);
		this.initPolylinePointPositions();
	},

	//endregion

	//region Methods: Private

	/**
	 * Initializes polylinePointPositions property.
	 * @private
	 */
	initPolylinePointPositions: function() {
		var polylinePointPositionsMetaData = this.polylinePointPositions;
		if (!polylinePointPositionsMetaData) {
			return;
		}
		var polylinePointPositions = this.polylinePointPositions = [];
		Terrasoft.each(polylinePointPositionsMetaData, function(pointString) {
			var point = this.parsePoint(pointString);
			point.x = point.X;
			point.y = point.Y;
			delete point.X;
			delete point.Y;
			polylinePointPositions.push(point);
		}, this);
	},

	/**
	 * Returns the name of the port for the connector based on the position of the start and end point.
	 * @private
	 * @param {tsDiagram.Diagram.Point} point1 Point 1 coordinates.
	 * @param {tsDiagram.Diagram.Point} point2 Point 2 coordinates.
	 * @return {String} Port name.
	 */
	getDefSequenceFlowPortName: function(point1, point2) {
		if (!point1 || !point2) {
			return;
		}
		var segment = this.createOrthogonalSegment(point1, point2);
		switch (segment.direction) {
			case "left":
				return Terrasoft.diagram.PortPosition.Left.name;
			case "right":
				return Terrasoft.diagram.PortPosition.Right.name;
			case "top":
				return Terrasoft.diagram.PortPosition.Top.name;
			case "bottom":
				return Terrasoft.diagram.PortPosition.Bottom.name;
			default:
				this.warning("Sequence flow segment direction not found");
				return Terrasoft.diagram.PortPosition.Auto.name;
		}
	},

	/**
	 * Returns a segment with a direction and length.
	 * @private
	 * @param {tsDiagram.Diagram.Point} point1 Point 1 coordinates.
	 * @param {tsDiagram.Diagram.Point} point2 Point 2 coordinates.
	 * @return {Object} Segment.
	 */
	createOrthogonalSegment: function(point1, point2) {
		var offsetX = point1.x - point2.x;
		var offsetY = point1.y - point2.y;
		var absOffsetX = Math.abs(offsetX);
		var absOffsetY = Math.abs(offsetY);
		if (absOffsetX > absOffsetY) {
			if (offsetX > 0) {
				return {
					type: "orthogonal",
					direction: "left",
					length: absOffsetX,
					point: point2
				};
			} else {
				return {
					type: "orthogonal",
					direction: "right",
					length: absOffsetX,
					point: point2
				};
			}
		} else {
			if (offsetY > 0) {
				return {
					type: "orthogonal",
					direction: "top",
					length: absOffsetY,
					point: point2
				};
			} else {
				return {
					type: "orthogonal",
					direction: "bottom",
					length: absOffsetY,
					point: point2
				};
			}
		}
	},

	/**
	 * Returns the offset of the process center of the port element.
	 * @private
	 * @param {String} portName Port name.
	 * @return {Object}
	 * @return {Number} return.x Horizontal coordinate.
	 * @return {Number} return.y Vertical coordinate.
	 */
	getPortOffsetByName: function(portName) {
		var portOffset = {x: 0.5, y: 0.5};
		Terrasoft.each(Terrasoft.diagram.PortPosition, function(portPosition) {
			if (portPosition.name === portName) {
				portOffset = portPosition.offset;
			}
		});
		return portOffset;
	},

	/**
	 * Returns the connection point of the process and the flow element.
	 * @private
	 * @param {Terrasoft.ProcessFlowElementSchema} node An element of the process that is associated with the flow.
	 * @param {String} portName Port name connection flow and process element.
	 * @return {Object} Point bonding process and the flow element.
	 * @return {Number} return.x Horizontal coordinate.
	 * @return {Number} return.y Vertical coordinate.
	 */
	getConnectorPoint: function(node, portName) {
		var nodePosition = this.parentSchema.getItemPosition(node);
		var portOffset = this.getPortOffsetByName(portName);
		return {
			x: nodePosition.x + portOffset.x * node.width,
			y: nodePosition.y + portOffset.y * node.height
		};
	},

	/**
	 * Returns the name of the port for the flow. If the port name is not defined or auto-value ({X=0,Y=0}),
	 * the port name is calculated by the transmitted points.
	 * @private
	 * @param {String} portLocalPosition Port local position.
	 * @param {Object} point1 Start point for port calculation.
	 * @param {Number} point1.x Horizontal coordinate.
	 * @param {Number} point1.y Vertical coordinate.
	 * @param {Object} point2 End point for port calculation.
	 * @param {Number} point1.x Horizontal coordinate.
	 * @param {Number} point1.y Vertical coordinate.
	 * @return {String}
	 */
	getPort: function(portLocalPosition, point1, point2) {
		var port = portLocalPosition;
		if (!port || port === Terrasoft.diagram.PortPosition.Auto.name) {
			port = this.getDefSequenceFlowPortName(point1, point2);
		}
		return port;
	},

	/**
	 * Returns label config.
	 * @private
	 * @param {Object} flow Diagram flow element.
	 * @return {Object}
	 */
	getDiagramFlowLabelConfig: function(flow) {
		return {
			"labelType": Terrasoft.LabelType.CAPTION,
			"name": this.name,
			"text": flow.caption,
			"fontSize": this.fontSize,
			"fontFamily": this.fontFamily,
			"fontColor": this.fontColor,
			"wrapText": true,
			"verticalAlignment": ej.Diagram.VerticalAlignment.Top,
			"offset": {
				x: 0.5,
				y: 0
			},
			"fillColor": this.captionBackcolor,
			"width": this.captionWidth
		};
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getDiagramConfig
	 * @protected
	 * @override
	 */
	getDiagramConfig: function() {
		var parentConfig = this.callParent(arguments);
		var flow = Ext.apply(this.getFlowConfig(), parentConfig);
		var sourceNode = this.findItemByName(flow.sourceNode);
		var targetNode = this.findItemByName(flow.targetNode);
		if (sourceNode && targetNode && sourceNode.visible === false && targetNode.visible === false) {
			flow.visible = false;
		} else {
			if (sourceNode && sourceNode.visible === false) {
				sourceNode = this.findItemByUId(sourceNode.containerUId);
				flow.sourceNode = sourceNode.name;
			}
			if (targetNode && targetNode.visible === false) {
				targetNode = this.findItemByUId(targetNode.containerUId);
				flow.targetNode = targetNode.name;
			}
		}
		var parentSchema = this.parentSchema;
		var sourceNodePosition = sourceNode && parentSchema.getItemPosition(sourceNode);
		var targetNodePosition = targetNode ? parentSchema.getItemPosition(targetNode) : this.targetPoint;
		var sourcePort = flow.sourcePort = this.getPort(this.sourceSequenceFlowPointLocalPosition,
			sourceNodePosition, targetNodePosition);
		var targetPort = flow.targetPort = this.getPort(this.targetSequenceFlowPointLocalPosition,
			targetNodePosition, sourceNodePosition);
		var startPoint = sourceNode && this.getConnectorPoint(sourceNode, sourcePort);
		var endPoint = targetNode ? this.getConnectorPoint(targetNode, targetPort) : targetNodePosition;
		var points = _.toArray(this.polylinePointPositions);
		flow.sourcePoint = startPoint;
		flow.targetPoint = endPoint;
		if (points) {
			points = this.trimDuplicatePoints(points);
			if (points.length > 0) {
				flow.segments = [];
				for (var i = 0; i < points.length; i++) {
					var point = points[i];
					var point1 = (i === 0) ? startPoint : points[i - 1];
					var segment = this.createOrthogonalSegment(point1, point);
					if (segment) {
						flow.segments.push(segment);
					}
				}
			}
		}
		var flowLabelConfig = this.getDiagramFlowLabelConfig(flow);
		flow.labels = [flowLabelConfig];
		return flow;
	},

	/**
	 * Returns an array do not duplicate coordinates.
	 * @protected
	 * @param {Object[]} points Points array.
	 * @return {Object[]}
	 */
	trimDuplicatePoints: function(points) {
		var result = [];
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
			var next = i + 1;
			if (next < points.length && points[next].x === point.x && points[next].y === point.y) {
				continue;
			}
			result.push(point);
		}
		return result;
	},

	/**
	 * Returns flow config.
	 * @protected
	 * @return {Object}
	 */
	getFlowConfig: function() {
		var caption = this.caption || "";
		if (typeof caption.getValue === "function") {
			caption = caption.getValue() || "";
		}
		var sourceNode, targetNode;
		if (this.sourceNode) {
			sourceNode = this.sourceNode;
		} else {
			sourceNode = this.sourceRefUId ? this.findItemByUId(this.sourceRefUId).name : "";
		}
		if (this.targetNode) {
			targetNode = this.targetNode;
		} else {
			var targetRefUId = this.targetRefUId;
			if (targetRefUId && !Terrasoft.isEmptyGUID(targetRefUId)) {
				targetNode = this.findItemByUId(targetRefUId).name;
			} else {
				targetNode = "";
			}
		}
		return {
			name: sourceNode + "_" + targetNode + "_" + Terrasoft.generateGUID(),
			caption: caption,
			bridgeSpace: this.connectorBridgeSpace,
			segments: [{type: ej.Diagram.Segments.Orthogonal}],
			lineColor: this.connectorLineColor,
			lineWidth: 1,
			sourceNode: sourceNode,
			targetNode: targetNode,
			targetDecorator: {
				shape: ej.Diagram.DecoratorShapes.Arrow,
				width: this.arrowWidth,
				height: this.arrowHeight,
				borderColor: this.connectorLineColor,
				fillColor: this.connectorLineColor
			},
			toolsConstraint: this.toolsConstraint
		};
	},

	/**
	 * Finds item by name.
	 * @protected
	 * @param {String} name Item name.
	 * @return {Object}
	 */
	findItemByName: function(name) {
		return this.parentSchema.findItemByName(name);
	},

	/**
	 * Finds item by identifier.
	 * @param {String} uId Item identifier.
	 * @protected
	 * @return {Object}
	 */
	findItemByUId: function(uId) {
		return this.parentSchema.findItemByUId(uId);
	},

	/**
	 * Returns source process schema element of sequence flow.
	 * @throws {Terrasoft.NullOrEmptyException} Throws exception if element is not added to process schema
	 * (parentSchema property is null).
	 * @return {Terrasoft.ProcessBaseElementSchema|null}
	 */
	findSourceElement: function() {
		if (this.parentSchema == null) {
			throw new Terrasoft.NullOrEmptyException();
		}
		return this.findItemByUId(this.sourceRefUId);
	},

	/**
	 * Returns target process schema element of sequence flow.
	 * @throws {Terrasoft.NullOrEmptyException} Throws exception if element is not added to process schema
	 * (parentSchema property is null).
	 * @return {Terrasoft.ProcessBaseElementSchema|null}
	 */
	findTargetElement: function() {
		if (this.parentSchema == null) {
			throw new Terrasoft.NullOrEmptyException();
		}
		return this.findItemByUId(this.targetRefUId);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		this.setSerializablePolylinePointPositions(serializableObject);
		this.setSerializablePointPosition(serializableObject, "sourceSequenceFlowPointLocalPosition");
		this.setSerializablePointPosition(serializableObject, "targetSequenceFlowPointLocalPosition");
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["sourceRefUId", "targetRefUId", "conditionExpression",
			"strokeColor", "flowType", "curveCenterPosition"]);
	},

	/**
	 * Sets serializableObject point position property.
	 * @private
	 * @param {Object} serializableObject Serializable object.
	 * @param {String} propertyName Property name.
	 */
	setSerializablePointPosition: function(serializableObject, propertyName) {
		var pointPosition = this[propertyName];
		if (pointPosition) {
			serializableObject[propertyName] = this.getSerializablePortName(pointPosition);
		}
	},

	/**
	 * Sets PolylinePointPositions to serializableObject.
	 * @private
	 * @param {Object} serializableObject Serializable object.
	 */
	setSerializablePolylinePointPositions: function(serializableObject) {
		if (!this.polylinePointPositions) {
			return;
		}
		var index = 0;
		var serializablePointPositions = {};
		this.polylinePointPositions.forEach(function(point) {
			var x = parseInt(point.x, 10) || 0;
			var y = parseInt(point.y, 10) || 0;
			var positionString = Ext.String.format("{0};{1}", x, y);
			var propertyName = "Item" + index;
			serializablePointPositions[propertyName] = positionString;
			index++;
		});
		serializableObject.polylinePointPositions = serializablePointPositions;
	},

	/**
	 * Returns the name of the port in TsDiagramModule format.
	 * @private
	 * @param {String} value String type "0;1".
	 * @return {String}
	 */
	getPortName: function(value) {
		if (value) {
			var positionRe = /(-?\d);(-?\d)/;
			var result = positionRe.exec(value);
			return Ext.String.format("{X={0},Y={1}}", result[1], result[2]);
		}
		return null;
	},

	/**
	 * Returns the name of the port to be serialized.
	 * @private
	 * @param {String} portName Port name.
	 * @return {String}
	 */
	getSerializablePortName: function(portName) {
		var positionRe = /X=(-?\d),Y=(-?\d)/;
		var result = positionRe.exec(portName);
		return Ext.String.format("{0};{1}", result[1], result[2]);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#getUIJsonData
	 * @override
	 */
	getUIJsonData: function() {
		var serializableObject = {};
		this.getSerializableObject(serializableObject);
		var result = this.callParent(arguments);
		return Ext.apply(result, {
			SourceRefUId: serializableObject.sourceRefUId,
			TargetRefUId: serializableObject.targetRefUId,
			SourceSequenceFlowPointLocalPosition: serializableObject.sourceSequenceFlowPointLocalPosition,
			TargetSequenceFlowPointLocalPosition: serializableObject.targetSequenceFlowPointLocalPosition,
			SequenceFlowCurveCenterPosition: serializableObject.curveCenterPosition,
			SequenceFlowPolylinePointPositions: serializableObject.polylinePointPositions
		});
	},

	/**
	 * Inserts an element into the flow changes the current flow and adds a new one.
	 * @param {Terrasoft.ProcessFlowElementSchema} flowElement Element, which moved to the flow.
	 * @returns {Terrasoft.ProcessSequenceFlowSchema} New flow obtained by dividing the current.
	 */
	insertFlowElement: function(flowElement) {
		var parentSchema = this.parentSchema;
		var targetFlowElement = this.findItemByUId(this.targetRefUId);
		var flowElementPoint = parentSchema.getItemPosition(flowElement);
		var targetFlowElementPoint = parentSchema.getItemPosition(targetFlowElement);
		var sourcePort = this.getDefSequenceFlowPortName(flowElementPoint, targetFlowElementPoint);
		var newSequenceFlow = new Terrasoft.ProcessSequenceFlowSchema({
			uId: Terrasoft.generateGUID(),
			sourceRefUId: flowElement.uId,
			targetRefUId: targetFlowElement.uId,
			showPropertiesWindowOnAdding: false
		});
		newSequenceFlow.sourceSequenceFlowPointLocalPosition = sourcePort;
		newSequenceFlow.targetSequenceFlowPointLocalPosition = this.targetSequenceFlowPointLocalPosition;
		var sourceFlowElement = this.findItemByUId(this.sourceRefUId);
		var sourceFlowElementPoint = parentSchema.getItemPosition(sourceFlowElement);
		var targetPort = this.getDefSequenceFlowPortName(flowElementPoint, sourceFlowElementPoint);
		this.targetRefUId = flowElement.uId;
		this.targetSequenceFlowPointLocalPosition = targetPort;
		return newSequenceFlow;
	},

	/**
	 * Sets source.
	 * @param {Object} config Sequence flow parameters.
	 * @param {String} config.sourcePort Source element port position.
	 * @param {String} config.sourceRefUId UId of source item.
	 */
	setSource: function(config) {
		this.sourceSequenceFlowPointLocalPosition = config.sourcePort;
		var sourceRefUId = config.sourceRefUId;
		if (this.sourceRefUId !== sourceRefUId) {
			this.sourceRefUId = sourceRefUId;
			this.fireEvent("onSourceChanged", this);
		}
	},

	/**
	 * Sets target.
	 * @param {Object} config Sequence flow parameters.
	 * @param {String} config.targetPort Target element port position.
	 * @param {String} config.targetRefUId UId of target item.
	 */
	setTarget: function(config) {
		this.targetSequenceFlowPointLocalPosition = config.targetPort;
		this.targetRefUId = config.targetRefUId;
	}

	//endregion

});
