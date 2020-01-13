/**
 */
Ext.define("Terrasoft.manager.ProcessExclusiveGatewaySchema", {
	extend: "Terrasoft.ProcessBaseGatewaySchema",
	alternateClassName: "Terrasoft.ProcessExclusiveGatewaySchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "bd9f7570-6c97-4f16-90e5-663a190c6c7c",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "ExclusiveGateway",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaExclusiveGateway",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.ExclusiveGatewayCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "exclusiveGateway_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "exclusiveGateway_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "exclusiveGateway_title.svg",

	/**
	 * Branching Decisions.
	 * @protected
	 * @type {Object}
	 */
	branchingDecisions: null,

	/**
	 * Branching mode.
	 * @protected
	 * @type {enum}
	 */
	branchingMode: null,

	/**
	 * Decision mode.
	 * @protected
	 * @type {enum}
	 */
	decisionMode: null,

	/**
	 * Feature obligation to select one of the options.
	 * @protected
	 * @type {Boolean}
	 */
	isDecisionRequired: null,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint:  Terrasoft.Resources.ProcessSchemaDesigner.Elements.ExclusiveGatewayHint,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["ConditionalSequenceFlow", "DefaultSequenceFlow"];
	}

	//endregion

});
