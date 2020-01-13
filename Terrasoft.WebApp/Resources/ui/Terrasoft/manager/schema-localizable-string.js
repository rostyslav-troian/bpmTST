/**
 *
 */
Ext.define("Terrasoft.manager.SchemaLocalizableString", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SchemaLocalizableString",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
	 * Name of server class.
	 * @protected
	 */
	typeName: "Terrasoft.Core.SchemaLocalizableString",

	/**
	 * Using identifier.
	 * @protected
	 * @type {String}
	 */
	uId: null,

	/**
	 * Using name.
	 * @protected
	 * @type {String}
	 */
	name: null,

	/**
	 * Scheme identifier, in which the element was created.
	 * @protected
	 * @type {String}
	 */
	createdInSchemaUId: null,

	/**
	 * Created in package identifier.
	 * @protected
	 * @type {String}
	 */
	createdInPackageId: null,

	/**
	 * Modified in schema identifier.
	 * @protected
	 * @type {String}
	 */
	modifiedInSchemaUId: null,

	/**
	 * Caption.
	 * @type {Terrasoft.LocalizableString}
	 */
	caption: null,

	/**
	 * Value.
	 * @type {Terrasoft.LocalizableString}
	 */
	value: null,

	/**
	 * The list of serializable properties.
	 * @private
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "name", "createdInSchemaUId", "modifiedInSchemaUId",
		"createdInPackageId", "typeName"],

	//endregion

	//region Methods: Protected

	/**
	 * Copies the properties to serialize an object to be serialized. Implements interface of mixin.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @param {Object} serializableObject Serialized object.
	 */
	getSerializableObject: function(serializableObject) {
		this.serializableProperties.forEach(function(propertyName) {
			this.setSerializableProperty(serializableObject, propertyName);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getLocalizableValues
	 * @protected
	 */
	getLocalizableValues: function(localizableValues) {
		const uid = this.uId;
		localizableValues[uid + '.Value'] = this.value.cultureValues;
		localizableValues[uid + '.Caption'] = this.caption.cultureValues;
	},

	/**
	 * Sets value of 'SchemaLocalizableString'.
	 * @param {Object} value Value.
	 * @param {String} value.name SchemaLocalizableString name.
	 * @param {Terrasoft.LocalizableString} value.Caption SchemaLocalizableString caption.
	 * @param {Terrasoft.LocalizableString} value.Value SchemaLocalizableString value.
	 * @param {String} value.modifiedInSchemaUId Scheme identifier, in which the element was modified.
	 */
	setValue: function(value) {
		this.caption = value.caption;
		this.value = value.value;
		this.modifiedInSchemaUId = value.modifiedInSchemaUId;
		this.fireEvent("changed", value, this);
	}

	//endregion

});
