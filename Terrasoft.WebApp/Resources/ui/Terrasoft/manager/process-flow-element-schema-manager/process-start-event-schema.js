/**
 */
Ext.define("Terrasoft.manager.ProcessStartEventSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessStartEventSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "53818048-7868-48f6-ada0-0ebaa65af628",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaStartEvent",

	/**
	 * Is interrupting.
	 * @protected
	 * @type {Boolean}
	 */
	isInterrupting: true,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @override
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.StartEventCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	group: Terrasoft.FlowElementGroup.StartEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 * @override
	 */
	name: "StartEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @override
	 */
	smallImageName: "startEvent_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @override
	 */
	largeImageName: "startEvent_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "startEvent_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#8ECB60",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#incomingConnectionsLimit
	 * @override
	 */
	incomingConnectionsLimit: 0,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "ProcessStartEventPropertiesPage",

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint:  Terrasoft.Resources.ProcessSchemaDesigner.Elements.StartEventHint,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["isInterrupting"]);
	}

	//endregion

});
