/**
 * Class of query to save system settings.
 */
Ext.define("Terrasoft.core.SysSettingSaveRequest", {
	alternateClassName: "Terrasoft.SysSettingSaveRequest",
	extend: "Terrasoft.BaseRequest",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName.
	 * @protected
	 * @override
	 */
	contractName: null,

	/**
  * The object of property matches the columns of the object schema.
  * @type {Object}
  */
	propertyColumnName: {
		id: "Id",
		name: "Name",
		code: "Code",
		description: "Description",
		valueTypeName: "ValueTypeName",
		referenceSchemaUId: "ReferenceSchemaUId",
		isPersonal: "IsPersonal",
		isCacheable: "IsCacheable",
		isSSPAvailable: "IsSSPAvailable"
	},

	/**
  * System setting Id.
  * @type {String}
  */
	id: null,

	/**
  * System setting name.
  * @type {String}
  */
	name: null,

	/**
  * System setting code.
  * @type {String}
  */
	code: null,

	/**
  * System setting description.
  * @type {String}
  */
	description: null,

	/**
  * System setting data type name.
  * @type {String}
  */
	valueTypeName: null,

	/**
  * Lookup schema Id.
  * @type {String}
  */
	referenceSchemaUId: null,

	/**
  * Indicates a personal system setting.
  * @type {Boolean}
  */
	isPersonal: null,

	/**
  * Indicates a caches system setting.
  * @type {Boolean}
  */
	isCacheable: null,

	/**
  * A sign of the availability of system settings for portal users.
  * @type {Boolean}
  */
	isSSPAvailable: null,

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate.
	 * @protected
	 * @override
	 */
	validate: function() {
		this.callParent(arguments);
		var requireProperties = ["id", "name", "code"];
		Terrasoft.each(requireProperties, function(requirePropertyName) {
			if (Ext.isEmpty(this[requirePropertyName])) {
				throw new Terrasoft.NullOrEmptyException({
					message: requirePropertyName
				});
			}
		}, this);
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		for (var propertyName in this.propertyColumnName) {
			serializableObject[propertyName] = this[propertyName];
		}
	}

});
