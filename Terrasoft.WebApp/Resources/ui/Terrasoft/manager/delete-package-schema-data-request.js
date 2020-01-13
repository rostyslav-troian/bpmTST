/**
 * DeletePackageSchemaDataRequest class.
 */
Ext.define("Terrasoft.data.queries.DeletePackageSchemaDataRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.DeletePackageSchemaDataRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName.
	 * @override
	 */
	contractName: "DeletePackageSchemaDataRequest",

	/**
	 * Package schema data name.
	 * @protected
	 * @type {String}
	 */
	packageSchemaDataName: null,

	/**
	 * Package UId.
	 * @protected
	 * @type {String}
	 */
	packageUId: null,

	// endregion

	// region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate
	 * @override
	 */
	validate: function() {
		Terrasoft.each(["packageSchemaDataName", "packageUId"], function(property) {
			if (Ext.isEmpty(this[property])) {
				throw new Terrasoft.NullOrEmptyException({message: property});
			}
		}, this);
		return this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		serializableObject.packageSchemaDataName = this.packageSchemaDataName;
		serializableObject.packageUId = this.packageUId;
	}

	// endregion

});
