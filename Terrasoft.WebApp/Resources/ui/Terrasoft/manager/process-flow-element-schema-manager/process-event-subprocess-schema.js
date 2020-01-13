/**
 */
Ext.define("Terrasoft.manager.ProcessEventSubprocessSchema", {
	extend: "Terrasoft.manager.ProcessSubprocessSchema",
	alternateClassName: "Terrasoft.ProcessEventSubprocessSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 * @override
	 */
	managerItemUId: "0824af03-1340-47a3-8787-ef542f566992",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaEventSubProcess",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "EventSubProcessPropertiesPage",

	/**
	 * @protected
	 * @type {Boolean}
	 */
	triggeredByEvent: false,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 * @override
	 */
	name: "EventSubProcess",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @override
	 */
	smallImageName: "event_subprocess_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @override
	 */
	largeImageName: "event_subprocess_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "event_subprocess_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @override
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.EventSubprocessCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#incomingConnectionsLimit
	 * @override
	 */
	incomingConnectionsLimit: 0,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#outgoingConnectionsLimit
	 * @override
	 */
	outgoingConnectionsLimit: 0,

	/**
	 * Default expanded width.
	 * @type {Number}
	 */
	defaultExpandedWidth: 300,

	/**
	 * Default expanded height.
	 * @type {Number}
	 */
	defaultExpandedHeight: 300,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#toolsConstraint
	 * @override
	 */
	toolsConstraint: Terrasoft.diagram.ToolsConstraint.NodeRemoveTool,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#isExpanded
	 * @override
	 */
	isExpanded: true,

	/**
	 * Border width.
	 * @type {Number}
	 * @private
	 */
	borderWidth: 1,

	/**
	 * Border color.
	 * @type {String}
	 * @private
	 */
	borderColor: "#E6C600",

	/**
	 * Background fill color.
	 * @type {String}
	 * @private
	 */
	fillColor: "rgba(255, 255, 255, 0.5)",

	/**
	 * Border dash array mask.
	 * @type {String}
	 * @private
	 */
	borderDashArray: "4 4",

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint: Terrasoft.Resources.ProcessSchemaDesigner.Elements.EventSubprocessHint,

	//endregion

	//region Constructors: Public

	constructor: function() {
		this.callParent(arguments);
		this.isExpanded = true;
		var size = this.size;
		this.width = size.width;
		this.height = size.height;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#initSize
	 * @override
	 */
	initSize: function() {
		var size = this.callParent(arguments);
		this.isExpanded = true;
		size.width = this.defaultExpandedWidth;
		size.height = this.defaultExpandedHeight;
		return size;
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getLargeImage
	 * @override
	 */
	getLargeImage: function() {
		return null;
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getDragImage
	 * @override
	 */
	getDragImage: function() {
		return this.getImageConfig(this.largeImageName);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getShape
	 * @override
	 */
	getShape: function() {
		var shape = this.callParent(arguments);
		Ext.apply(shape, {
			cornerRadius: 10
		});
		return shape;
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getDiagramConfig
	 * @override
	 */
	/* jshint bitwise:false */
	getDiagramConfig: function() {
		var diagramConfig = this.callParent(arguments);
		var eventSubProcessDiagramConfig = {
			borderWidth: this.borderWidth,
			borderColor: this.borderColor,
			borderDashArray: this.borderDashArray,
			fillColor: this.fillColor,
			constraints: ej.Diagram.NodeConstraints.Select |
				ej.Diagram.NodeConstraints.Drag |
				ej.Diagram.NodeConstraints.Delete |
				ej.Diagram.NodeConstraints.Resize |
				ej.Diagram.NodeConstraints.ResizeNorthEast |
				ej.Diagram.NodeConstraints.ResizeEast |
				ej.Diagram.NodeConstraints.ResizeSouthEast |
				ej.Diagram.NodeConstraints.ResizeSouth |
				ej.Diagram.NodeConstraints.ResizeSouthWest |
				ej.Diagram.NodeConstraints.ResizeWest |
				ej.Diagram.NodeConstraints.ResizeNorthWest |
				ej.Diagram.NodeConstraints.ResizeNorth
		};
		Ext.apply(diagramConfig, eventSubProcessDiagramConfig);
		return diagramConfig;
	},
	/* jshint bitwise:true */

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["isExpanded"]);
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
			Size: serializableObject.size,
			IsExpanded: serializableObject.isExpanded
		});
	}

	//endregion

});
