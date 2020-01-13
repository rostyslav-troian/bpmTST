/**
 */
Ext.define("Terrasoft.manager.ProcessBaseGatewaySchema", {
	extend: "Terrasoft.ProcessFlowElementSchema",
	alternateClassName: "Terrasoft.ProcessBaseGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#nodeType
	 * @override
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Gateway,

	/**
	 * @inheritdoc Terrasoft.ProcessFlowElementSchema#width
	 */
	width: 55,//71,

	/**
	 * @inheritdoc Terrasoft.ProcessFlowElementSchema#height
	 */
	height: 55,//71,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetX
	 * @override
	 */
	silverlightOffsetX: 0,//16,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetY
	 * @override
	 */
	silverlightOffsetY: 0,//16,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.Gateway,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	emptyDiagramCaption: true,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#FECD66",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "ProcessBaseGatewayPropertiesPage"

	//endregion

});
