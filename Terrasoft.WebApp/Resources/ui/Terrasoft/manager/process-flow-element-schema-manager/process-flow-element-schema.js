/**
 */
Ext.define("Terrasoft.manager.ProcessFlowElementSchema", {
	extend: "Terrasoft.manager.ProcessBaseElementSchema",
	alternateClassName: "Terrasoft.ProcessFlowElementSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#nodeType
	 * @override
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Node,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#toolsConstraint
	 * @override
	 */
	/* jshint bitwise:false */
	toolsConstraint: Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
		Terrasoft.diagram.ToolsConstraint.NodeRemoveTool |
		Terrasoft.diagram.ToolsConstraint.ConnectionEditTool,
	/* jshint bitwise:true */

	/**
	 *
	 * State of the display element.
	 * @protected
	 * @type {Boolean}
	 */
	isExpanded: false,

	/**
	 * Feature serialize to DB.
	 * @protected
	 * @type {Boolean}
	 */
	serializeToDB: false,

	/**
	 * Feature element logging.
	 * @protected
	 * @type {Boolean}
	 */
	isLogging: true,

	/**
	 * Element width.
	 * @protected
	 * @type {Number}
	 */
	width: 0,

	/**
	 * Element height.
	 * @protected
	 * @type {Number}
	 */
	height: 0,

	/**
	 * Parent element.
	 * @type {String}
	 */
	parent: null,

	/**
	 * Container identifer, which is an element of the process.
	 * @type {String}
	 */
	containerUId: null,

	/**
	 * Ports set.
	 * @protected
	 * @type {String}
	 */
	portsSet: Terrasoft.diagram.enums.PortsSet.Basic,

	/**
	 * Incoming connections limit.
	 * @protected
	 * @type {Number}
	 */
	incomingConnectionsLimit: -1,

	/**
	 * Outgoing connections limit.
	 * @protected
	 * @type {Number}
	 */
	outgoingConnectionsLimit: -1,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @override
	 */
	smallImageName: "userTask_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @override
	 */
	largeImageName: "userTask_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "userTask_title.svg",

	/**
	 * Size.
	 * @protected
	 * @type {Object}
	 */
	size: null,

	/**
	 * Feature visible whether the diagram element.
	 * @protected
	 * @type {Boolean}
	 */
	visible: true,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		if (this.size) {
			this.size = this.parseSize(this.size);
		} else {
			this.size = this.initSize();
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * Initializes the size of the process element.
	 * @protected
	 * @return {{width: Number Width, height: Number Height}}
	 */
	initSize: function() {
		return {
			width: this.width,
			height: this.height
		};
	},

	/**
	 * Performs type element size parsing line width_value;height_value to an object.
	 * @param {string} sizeString Coordinates string.
	 * @protected
	 * @return {{width: Number Width, height: Number Height}}
	 */
	parseSize: function(sizeString) {
		var result = this.parseValuePairString(sizeString);
		return {
			width: result[0],
			height: result[1]
		};
	},

	/**
	 * Returns element center position.
	 * @protected
	 * @param {Number} x Horizontal coordinate.
	 * @param {Number} y Vertical coordinate.
	 * @return {{X: Number, Y: Number}}
	 */
	getCenterPosition: function(x, y) {
		var size = this.size;
		return {
			X: x - size.width / 2,
			Y: y - size.height / 2
		};
	},

	/**
	 * Retunrs element shape config.
	 * @protected
	 * @return {Object} Element shape config.
	 */
	getShape: function() {
		return {
			type: ej.Diagram.Shapes.Rectangle
		};
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getDiagramConfig
	 * @override
	 */
	getDiagramConfig: function(config) {
		var nodeConfig = this.callParent(arguments);
		var image = this.getLargeImage();
		var shape = this.getShape();
		if (image) {
			shape.type = ej.Diagram.Shapes.Image;
			shape.src = Terrasoft.ImageUrlBuilder.getUrl(image);
		}
		nodeConfig = Ext.apply(nodeConfig, {
			visible: this.visible,
			width: this.width,
			height: this.height,
			borderWidth: 0,
			shape: shape,
			nodeType: this.nodeType,
			fillColor: "rgba(0,0,0,0)",
			portsSet: this.portsSet,
			incomingConnectionsLimit: this.incomingConnectionsLimit,
			outgoingConnectionsLimit: this.outgoingConnectionsLimit,
			parent: this.parent,
			toolsConstraint: this.toolsConstraint
		});
		nodeConfig = Ext.apply(nodeConfig, config);
		this.addUserTaskLabelConfig(nodeConfig);
		if (nodeConfig.constraints) {
			nodeConfig.constraints = this.getNodeConstraints(nodeConfig.constraints);
		}
		return nodeConfig;
	},

	/**
	 * Adds a labels the diagram node configuration.
	 * @param {Object} config Diagram node config.
	 */
	addUserTaskLabelConfig: function(config) {
		this.addLabelConfig(config);
		var labels = config.labels;
		var label = labels[labels.length - 1];
		label.offset = ej.Diagram.Point(0.5, 1);
	},

	/**
	 * Adds a label in the configuration of a diagram element.
	 * @param {Object} config Element diagram config.
	 */
	addLabelConfig: function(config) {
		var label;
		var labels = config.labels;
		var labelText = {
			text: this.getLabelText(config.caption, true)
		};
		if (Ext.isEmpty(labels)) {
			labels = config.labels = [labelText];
			label = labels[0];
		} else {
			labels.push(labelText);
			label = labels[labels.length - 1];
		}
		label.labelType = Terrasoft.LabelType.CAPTION;
		label.name = this.name;
		label.wrapText = true;
		label.textAlign = ej.Diagram.TextAlign.Center;
		label.fontSize = this.fontSize;
		label.fontFamily = this.fontFamily;
		label.fontColor = this.fontColor;
		label.fillColor = this.captionFillColor;
		label.verticalAlignment = ej.Diagram.VerticalAlignment.Top;
		label.shape = {};
		label.width = this.captionWidth;
	},

	/**
	 * Returns of constraints node diagram.
	 * @param {Array} constraints Constraints names array.
	 * @return {Number} Node contraint.
	 */
	getNodeConstraints: function(constraints) {
		/* jshint bitwise:false */
		var constraint = 0;
		for (var index = 0; index < constraints.length; index++) {
			constraint = constraint | ej.Diagram.NodeConstraints[constraints[index]];
		}
		return constraint;
		/* jshint bitwise:true */
	},

	/**
	 * Returns a set of tools for combining the elements of the diagram.
	 * @return {Array}
	 */
	getConnectionUserHandles: function() {
		return ["SequenceFlow", "DefaultSequenceFlow", "ConditionalSequenceFlow"];
	},

	/**
	 * Returns the configuration element to visualize on the toolbar of the designer.
	 * @protected
	 * @return {Object}
	 */
	getToolbarHtml: function() {
		return {
			caption: this.typeCaption,
			image: this.getSmallImage()
		};
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.size = this.getSerializableSize();
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["serializeToDB", "isLogging", "editPageSchemaName",
			"containerUId", "isExpanded", "useBackgroundMode"]);
	},

	/**
	 * Returns serialized Size property.
	 * @private
	 * @return {Object}
	 */
	getSerializableSize: function() {
		var size = this.size;
		var sizeString = "0;0";
		if (size) {
			sizeString = Terrasoft.serializeObject({
				source: size,
				properties: ["width", "height"],
				format: "{width};{height}",
				valueConverter: function(value) {
					var integerValue = parseInt(value, 10);
					return integerValue || 0;
				}
			});
		}
		return this.getSerializableProperty(sizeString);
	},

	/**
	 * Returns array of incoming sequenceFlows into element in process schema.
	 * @throws {Terrasoft.NullOrEmptyException} Throws exception if element is not added to process schema
	 * (parentSchema property is null).
	 * @return {Terrasoft.ProcessSequenceFlowSchema[]}
	 */
	getIncomingSequenceFlows: function() {
		var parentSchema = this.parentSchema;
		if (parentSchema == null) {
			throw new Terrasoft.NullOrEmptyException();
		}
		var incoumingSequenceFlows = parentSchema.flowElements.filterByFn(function(item) {
			if (item instanceof Terrasoft.ProcessSequenceFlowSchema && item.targetRefUId === this.uId) {
				return true;
			}
			return false;
		}, this);
		return incoumingSequenceFlows.getItems();
	},

	/**
	 * Returns array of outgoings sequenceFlows from element in process schema.
	 * @throws {Terrasoft.NullOrEmptyException} Throws exception if element is not added to process schema
	 * (parentSchema property is null).
	 * @return {Terrasoft.ProcessSequenceFlowSchema[]}
	 */
	getOutgoingsSequenceFlows: function() {
		var parentSchema = this.parentSchema;
		if (parentSchema == null) {
			throw new Terrasoft.NullOrEmptyException();
		}
		var outgoingsSequenceFlows = parentSchema.flowElements.filterByFn(function(item) {
			if (item instanceof Terrasoft.ProcessSequenceFlowSchema && item.sourceRefUId === this.uId) {
				return true;
			}
			return false;
		}, this);
		return outgoingsSequenceFlows.getItems();
	},

	/**
	 * Returns element image config while dragging.
	 * @protected
	 * @return {Object} Drag image config.
	 */
	getDragImage: function() {
		return this.getLargeImage();
	}

	//endregion

});
