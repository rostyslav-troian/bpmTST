/**
 */
Ext.define("Terrasoft.manager.ProcessEndEventSchema", {
	extend: "Terrasoft.ProcessTerminateEventSchema",
	alternateClassName: "Terrasoft.ProcessEndEventSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "45ceaae2-4e1f-4c0c-86aa-cd4aeb4da913",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaEndEvent",

	/**
	 * A flag of an obsolete item that occurs only in old processes.
	 */
	isDeprecated: true

	//endregion

});
