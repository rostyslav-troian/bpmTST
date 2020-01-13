/**
 */
Ext.define("Terrasoft.manager.ProcessStartMessageNonInterruptingSchema", {
	extend: "Terrasoft.ProcessStartMessageSchema",
	alternateClassName: "Terrasoft.ProcessStartMessageNonInterruptingSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "429178f5-d44a-40d6-8b74-e72cad04ee73",

	/**
	 * A flag of an obsolete item that occurs only in old processes.
	 */
	isDeprecated: true

	//endregion

});
