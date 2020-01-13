/**
 */
Ext.define("Terrasoft.manager.ProcessParallelGatewaySchema", {
	extend: "Terrasoft.ProcessBaseGatewaySchema",
	alternateClassName: "Terrasoft.ProcessParallelGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "e9e1e6de-7066-4eb1-bbb4-5b75b13d4f56",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "ParallelGateway",

	/**
	 * Incoming branch names.
	 * @protected
	 * @type {String}
	 */
	incomingBranchNames: null,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaParallelGateway",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.ParallelGatewayCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "parallelGateway_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "parallelGateway_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "parallelGateway_title.svg",

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint:  Terrasoft.Resources.ProcessSchemaDesigner.Elements.ParallelGatewayHint,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["SequenceFlow"];
	}

	//endregion

});
