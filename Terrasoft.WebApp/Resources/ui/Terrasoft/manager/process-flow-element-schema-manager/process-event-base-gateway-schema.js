/**
 */
Ext.define("Terrasoft.manager.ProcessEventBasedGatewaySchema", {
	extend: "Terrasoft.ProcessBaseGatewaySchema",
	alternateClassName: "Terrasoft.ProcessEventBasedGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "0ddbda75-9cac-4e42-b94c-5cf1edb45846",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaEventBasedGateway",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "EventBasedGateway",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.EventBasedGatewayCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "eventBasedGateway_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "eventBasedGateway_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "eventBasedGateway_title.svg",

	/**
	 * @protected
	 * @type {String}
	 */
	instantiate: false,

	/**
	 * @protected
	 * @type {String}
	 */
	eventGatewayType: null,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint: Terrasoft.Resources.ProcessSchemaDesigner.Elements.EventBasedGatewayHint,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["SequenceFlow"];
	}

	//endregion

});
