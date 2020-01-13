/**
 * Class represents request that runs process.
 */
Ext.define("Terrasoft.process.RunProcessRequest", {
	extend: "Terrasoft.BaseRunProcessRequest",
	alternateClassName: "Terrasoft.RunProcessRequest",

	//region Properties: Protected

	/**
	 * Schema identifier.
	 * @protected
	 * @type {String}
	 */
	schemaUId: null,

	/**
	 * Schema name.
	 * @protected
	 * @type {String}
	 */
	schemaName: null,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function() {
		var config = this.callParent(arguments);
		config.schemaUId = this.schemaUId;
		config.schemaName = this.schemaName;
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
		if (Ext.isEmpty(this.schemaUId) && Ext.isEmpty(this.schemaName)) {
			throw new Terrasoft.NullOrEmptyException({
				argumentName: "schemaName and schemaUId"
			});
		}
		if (Terrasoft.isEmptyGUID(this.schemaUId)) {
			throw new Terrasoft.NullOrEmptyException({
				argumentName: "schemaUId"
			});
		}
		return true;
	}

	//endregion

});
