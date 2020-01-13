/**
 */
Ext.define("Terrasoft.manager.ProcessInclusiveGatewaySchema", {
	extend: "Terrasoft.ProcessBaseGatewaySchema",
	alternateClassName: "Terrasoft.ProcessInclusiveGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "ffa4a06a-5747-49d4-96c2-c32a727a3b14",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "InclusiveGateway",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaInclusiveGateway",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.InclusiveGatewayCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "inclusiveGateway_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "inclusiveGateway_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "inclusiveGateway_title.svg",

	/**
	 * Branching decisions.
	 * @protected
	 * @type {Object}
	 */
	branchingDecisions: null,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint: Terrasoft.Resources.ProcessSchemaDesigner.Elements.InclusiveGatewayHint,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["ConditionalSequenceFlow", "DefaultSequenceFlow"];
	}

	//endregion

});
