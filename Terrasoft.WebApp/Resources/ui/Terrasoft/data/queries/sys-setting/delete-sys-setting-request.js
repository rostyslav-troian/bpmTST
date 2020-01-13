/**
 * The class for removing the system settings.
 */
Ext.define("Terrasoft.core.DeleteSysSettingRequest", {
	alternateClassName: "Terrasoft.DeleteSysSettingRequest",
	extend: "Terrasoft.BaseRequest",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName.
	 * @protected
	 * @override
	 */
	contractName: "DeleteSysSettingRequest",

	/**
  * An array of system configuration identifiers.
  * @type {Array}
  */
	primaryColumnValues: null,

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate.
	 * @protected
	 * @override
	 */
	validate: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.primaryColumnValues)) {
			throw new Terrasoft.NullOrEmptyException({
				message: "primaryColumnValues"
			});
		}
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.primaryColumnValues = this.primaryColumnValues;
	}

});
