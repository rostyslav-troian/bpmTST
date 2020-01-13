/**
 * Base class represents request that runs process.
 */
Ext.define("Terrasoft.process.BaseRunProcessRequest", {
	extend: "Terrasoft.ParameterizedProcessRequest",
	alternateClassName: "Terrasoft.BaseRunProcessRequest",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @protected
	 * @override
	 */
	contractName: "RunProcess"

	//endregion

});
