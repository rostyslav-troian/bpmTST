/**
 */
Ext.define("Terrasoft.manager.ProcessTerminateEventSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessTerminateEventSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "1bd93619-0574-454e-bb4e-cf53b9eb9470",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaTerminateEvent",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @protected
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.TerminateEventCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @protected
	 */
	group: Terrasoft.FlowElementGroup.EndEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 * @protected
	 */
	name: "TerminateEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @protected
	 */
	smallImageName: "terminateEvent_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @protected
	 */
	largeImageName: "terminateEvent_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "terminateEvent_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#FF9685",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "ProcessTerminateEventPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#outgoingConnectionsLimit
	 * @protected
	 */
	outgoingConnectionsLimit: 0,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint: Terrasoft.Resources.ProcessSchemaDesigner.Elements.TerminateEventHint,

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return [];
	}

	//endregion

});
