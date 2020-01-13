
Ext.define("Terrasoft.manager.ProcessIntermediateCatchMessageSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessIntermediateCatchMessageSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "3cb9d737-779e-4085-ab4b-db590853e266",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.IntermediateCatchMessageCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#typeName
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaIntermediateCatchMessageEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.IntermediateEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "IntermediateCatchMessage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "intermediateCatchMessage_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "intermediateCatchMessage_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "intermediateCatchMessage_title.svg",

	/**
	 * @protected
	 * @type {Boolean}
	 */
	cancelActivity: false,

	/**
	 * @protected
	 * @type {enum}
	 */
	boundaryItemAlignment: null,

	/**
	 * @protected
	 * @type {String}
	 */
	message: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "IntermediateCatchMessagePropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#emptyDiagramCaption
	 * @override
	 */
	emptyDiagramCaption: false,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["message"]);
	}

	//endregion

});
