/**
 */
Ext.define("Terrasoft.manager.ProcessIntermediateThrowSignalSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessIntermediateThrowSignalSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "1793bff9-c5fa-49e7-a32d-ca73d270e137",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.IntermediateThrowSignalCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.IntermediateEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "IntermediateThrowSignal",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaIntermediateThrowSignalEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "intermediateThrowSignal_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "intermediateThrowSignal_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "intermediateThrowSignal_title.svg",

	/**
	 * @protected
	 * @type {String}
	 */
	message: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#emptyDiagramCaption
	 * @override
	 */
	emptyDiagramCaption: false,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "IntermediateThrowSignalPropertiesPage",

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
