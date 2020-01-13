/**
 * Class represents request that runs specified process version.
 */
Ext.define("Terrasoft.process.RunSpecifiedProcessVersionRequest", {
	extend: "Terrasoft.BaseRunProcessRequest",
	alternateClassName: "Terrasoft.RunSpecifiedProcessVersionRequest",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @protected
	 * @override
	 */
	contractName: "RunSpecifiedProcessVersion",

	/**
	 * Schema identifier.
	 * @protected
	 * @type {String}
	 */
	schemaUId: null,

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function() {
		var config = this.callParent(arguments);
		config.schemaUId = this.schemaUId;
		return config;
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate.
	 * @override
	 */
	validate: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.schemaUId) || Terrasoft.isEmptyGUID(this.schemaUId)) {
			throw new Terrasoft.NullOrEmptyException({
				argumentName: "schemaUId"
			});
		}
		return true;
	}

	//endregion

});
