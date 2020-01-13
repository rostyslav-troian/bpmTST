/**
 */
Ext.define("Terrasoft.manager.ProcessExclusiveEventBasedGatewaySchema", {
	extend: "Terrasoft.ProcessBaseGatewaySchema",
	alternateClassName: "Terrasoft.ProcessExclusiveEventBasedGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "7a3d548c-e994-4d07-b1c0-f471e2ce5687",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "ExclusiveEventBasedGateway",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessExclusiveEventBasedGateway",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @override
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.ExclusiveEventBasedGatewayCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 * @override
	 */
	smallImageName: "exclusiveEventBasedGateway_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 * @override
	 */
	largeImageName: "exclusiveEventBasedGateway_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "exclusiveEventBasedGateway_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["SequenceFlow"];
	},

	/**
	 * Flag that indicates whether deprecated element, is found only in old process schemas.
	 */
	isDeprecated: true

	//endregion

});
