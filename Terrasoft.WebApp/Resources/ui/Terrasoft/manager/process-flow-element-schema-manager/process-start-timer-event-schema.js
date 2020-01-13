/**
 */
Ext.define("Terrasoft.manager.ProcessStartTimerEventSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessStartTimerEventSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "c735ed92-e545-4699-b3c6-f8f57dd8c529",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#emptyDiagramCaption
	 * @override
	 */
	emptyDiagramCaption: false,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.StartTimerEventCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.StartEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "StartTimerEvent",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaStartTimerEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "startTimerEvent_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "startTimerEvent_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "startTimerEvent_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "ProcessTimerStartEventPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#incomingConnectionsLimit
	 * @override
	 */
	incomingConnectionsLimit: 0,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#8ECB60",

	/**
	 * @protected
	 * @type {String}
	 */
	cronExpression: null,

	/**
	 * @protected
	 * @type {Terrasoft.TimerExpressionTypes}
	 */
	expressionType: Terrasoft.TimerExpressionTypes.Empty,

	/**
	 * @protected
	 * @type {Terrasoft.TimerMisfireInstructionTypes}
	 */
	misfireInstruction: Terrasoft.TimerMisfireInstructionTypes.IgnoreMisfires,

	/**
	 * Is interrupting.
	 * @protected
	 * @type {Boolean}
	 */
	isInterrupting: true,

	/**
	 * @protected
	 * @type {Terrasoft.DateTime}
	 */
	startDateTime: null,

	/**
	 * @protected
	 * @type {Terrasoft.DateTime}
	 */
	endDateTime: null,

	/**
	 * @protected
	 * @type {String}
	 */
	timeZoneOffset: null,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["cronExpression", "expressionType", "misfireInstruction",
			"startDateTime", "endDateTime", "timeZoneOffset"]);
	}
});
