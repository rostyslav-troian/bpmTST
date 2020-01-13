Ext.ns("Terrasoft.diagram.enums");
Ext.ns("Terrasoft.process.enums");

/**
 * @enum
 * Diagram element ports positions.
 */
Terrasoft.diagram.enums.PortPosition = {
	Auto: {
		name: "{X=0,Y=0}",
		offset: {
			x: 0,
			y: 0
		}
	},
	Top: {
		name: "{X=0,Y=1}",
		offset: {
			x: 0.5,
			y: 0
		}
	},
	Bottom: {
		name: "{X=0,Y=-1}",
		offset: {
			x: 0.5,
			y: 1
		}
	},
	Left: {
		name: "{X=-1,Y=0}",
		offset: {
			x: 0,
			y: 0.5
		}
	},
	Right: {
		name: "{X=1,Y=0}",
		offset: {
			x: 1,
			y: 0.5
		}
	},
	TopLeft: {
		name: "{X=-1,Y=1}",
		offset: {
			x: 0,
			y: 0
		}
	},
	TopRight: {
		name: "{X=1,Y=1}",
		offset: {
			x: 1,
			y: 0
		}
	},
	BottomLeft: {
		name: "{X=-1,Y=-1}",
		offset: {
			x: 0,
			y: 1
		}
	},
	BottomRight: {
		name: "{X=1,Y=-1}",
		offset: {
			x: 1,
			y: 1
		}
	}
};

/**
 * Shortening for {@link Terrasoft.diagram.enums.PortPosition}
 * @member Terrasoft
 * @inheritdoc Terrasoft.diagram.enums.PortPosition
 */
Terrasoft.diagram.PortPosition = Terrasoft.diagram.enums.PortPosition;

/**
 * @enum
 * Diagram element ports.
 */
Terrasoft.diagram.enums.PortsSet = {
	All: [
		Terrasoft.diagram.PortPosition.Top,
		Terrasoft.diagram.PortPosition.Bottom,
		Terrasoft.diagram.PortPosition.Left,
		Terrasoft.diagram.PortPosition.Right,
		Terrasoft.diagram.PortPosition.TopLeft,
		Terrasoft.diagram.PortPosition.TopRight,
		Terrasoft.diagram.PortPosition.BottomLeft,
		Terrasoft.diagram.PortPosition.BottomRight
	],
	Basic: [
		Terrasoft.diagram.PortPosition.Top,
		Terrasoft.diagram.PortPosition.Bottom,
		Terrasoft.diagram.PortPosition.Left,
		Terrasoft.diagram.PortPosition.Right
	],
	Additional: [
		Terrasoft.diagram.PortPosition.TopLeft,
		Terrasoft.diagram.PortPosition.TopRight,
		Terrasoft.diagram.PortPosition.BottomLeft,
		Terrasoft.diagram.PortPosition.BottomRight
	],
	None: []
};

/**
 * Shortening for {@link Terrasoft.diagram.enums.PortsSet}
 * @member Terrasoft
 * @inheritdoc Terrasoft.diagram.enums.PortSet
 */
Terrasoft.diagram.PortsSet = Terrasoft.diagram.enums.PortsSet;

/**
 * @enum
 * Diagram elements type.
 */
Terrasoft.diagram.enums.UserHandlesConstraint = {
	Node: 1,
	Connector: 2,
	Event: 3,
	Gateway: 4,
	Lane: 5,
	LaneSet: 6,
	Subprocess: 7,
	All: 8
};

/**
 * Shortening for {@link Terrasoft.diagram.enums.UserHandlesConstraint}
 * @member Terrasoft
 * @inheritdoc Terrasoft.diagram.enums.UserHandlesConstraint
 */
Terrasoft.diagram.UserHandlesConstraint = Terrasoft.diagram.enums.UserHandlesConstraint;

/**
 * @enum
 * Diagram element tools type.
 */
/*jslint bitwise: true */
Terrasoft.diagram.enums.ToolsConstraint = {
	NodeAddTool: 1,
	NodeSelectionTool: 1 << 1,
	NodeRemoveTool: 1 << 2,
	ConnectionEditTool: 1 << 3,
	ConnectorRemoveTool: 1 << 4
};
/*jslint bitwise: false */

/**
 * Shortening for {@link Terrasoft.diagram.enums.ToolsConstraint}
 * @member Terrasoft
 * @inheritdoc Terrasoft.diagram.enums.ToolsConstraint
 */
Terrasoft.diagram.ToolsConstraint = Terrasoft.diagram.enums.ToolsConstraint;

/**
 * @enum
 * Type of background element for diagram element label.
 */
Terrasoft.diagram.enums.labelBackgroundTag = {
	CIRCLE: "circle",
	ELLIPSE: "ellipse",
	RECTANGLE: "rectangle"
};

/**
 * Shortening for {@link Terrasoft.diagram.enums.labelBackgroundTag}
 * @member Terrasoft
 * @inheritdoc Terrasoft.diagram.enums.labelBackgroundTag
 */
Terrasoft.diagram.labelBackgroundTag = Terrasoft.diagram.enums.labelBackgroundTag;

/**
 * @enum
 * Process schema pool direction.
 */
Terrasoft.process.enums.ProcessSchemaPoolDirection = {
	VERTICAL: 0,
	HORIZONTAL: 1
};

/**
 * Shortening for {@link Terrasoft.process.enums.ProcessSchemaPoolDirection}
 * @member Terrasoft
 * @inheritdoc Terrasoft.process.enums.ProcessSchemaPoolDirection
 */
Terrasoft.ProcessSchemaPoolDirection = Terrasoft.process.enums.ProcessSchemaPoolDirection;

/**
 * @enum
 * Process schema parameter type.
 */
Terrasoft.process.enums.ProcessSchemaParameterDirection = {
	IN: 0,
	OUT: 1,
	VARIABLE: 2
};

/**
 * Shortening for {@link Terrasoft.process.enums.ProcessSchemaParameterDirection}
 * @member Terrasoft
 * @inheritdoc Terrasoft.process.enums.ProcessSchemaParameterDirection
 */
Terrasoft.ProcessSchemaParameterDirection = Terrasoft.process.enums.ProcessSchemaParameterDirection;

/**
 * Process schema usage type.
 * @enum
 */
Terrasoft.process.enums.ProcessSchemaUsageType = {
	NONE: 0,
	GENERAL: 1,
	ADVANCED: 2
};

/**
 * Shortening for {@link Terrasoft.core.enums.ProcessSchemaUsageType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.core.enums.ProcessSchemaUsageType
 */
Terrasoft.ProcessSchemaUsageType = Terrasoft.process.enums.ProcessSchemaUsageType;

/**
 * @enum
 * Process schema parameter value source.
 */
Terrasoft.ProcessSchemaParameterValueSource = {
	None: 0,
	ConstValue: 1,
	Mapping: 2,
	Script: 3,
	SystemValue: 4,
	SystemSetting: 5,
	EntityMapping: 6,
	SamplingEntityMapping: 7
};

/**
 * Shortening for {@link Terrasoft.ProcessSchemaParameterValueSource}.
 * @member Terrasoft.process.enums
 * @inheritdoc Terrasoft.ProcessSchemaParameterValueSource
 */
Terrasoft.process.enums.ProcessSchemaParameterValueSource = Terrasoft.ProcessSchemaParameterValueSource;

/**
 * @enum
 * Process schema element label type.
 */
Terrasoft.process.enums.LabelType = {
	CAPTION: "caption",
	STATISTIC_INFO: "statisticInfo"
};

/**
 * Shortening for {@link Terrasoft.process.enums.LabelType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.process.enums.LabelType
 */
Terrasoft.LabelType = Terrasoft.process.enums.LabelType;

/**
 * @enum
 * Type of process schema sequence flow.
 */
Terrasoft.process.enums.ProcessSchemaEditSequenceFlowType = {
	SEQUENCE: 0,
	DEFAULT: 1,
	CONDITIONAL: 2,
	DATA: 3,
	MESSAGE: 4,
	ASSOCIATION: 5
};

/**
 * Shortening for {@link Terrasoft.process.enums.ProcessSchemaEditSequenceFlowType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.process.enums.ProcessSchemaEditSequenceFlowType
 */
Terrasoft.ProcessSchemaEditSequenceFlowType = Terrasoft.process.enums.ProcessSchemaEditSequenceFlowType;

/**
 * @enum
 * Type of process schema validation result.
 */
Terrasoft.process.enums.ValidationType = {
	ERROR: "error",
	WARNING: "warning",
	INFO: "information"
};

/**
 * Shortening for {@link Terrasoft.process.enums.ValidationType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.process.enums.ValidationType
 */
Terrasoft.ValidationType = Terrasoft.process.enums.ValidationType;
