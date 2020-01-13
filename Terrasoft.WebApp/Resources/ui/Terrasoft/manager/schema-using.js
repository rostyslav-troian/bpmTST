/**
 */
Ext.define("Terrasoft.manager.SchemaUsing", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.SchemaUsing",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Properties: Private

	/**
	 * Name of server class.
	 * @protected
	 */
	typeName: "Terrasoft.Core.SchemaUsing",

	//endregion

	//region Properties: Protected

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
	 * Alias name.
	 * @protected
	 * @type {String}
	 */
	alias: null,

	/**
	 * The list of serializable properties.
	 * @private
	 * @type {String[]}
	 */
	serializableProperties: ["uId", "name", "alias", "createdInSchemaUId", "modifiedInSchemaUId", "createdInPackageId",
		"typeName"],

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
	 * Sets value of 'using'.
	 * @param {Object} value Value.
	 * @param {String} value.name Using name.
	 * @param {String} value.alias Alias name.
	 * @param {String} value.modifiedInSchemaUId Scheme identifier, in which the element was modified.
	 */
	setValue: function(value) {
		var alias = value.alias;
		alias = !Ext.isEmpty(alias) ? alias : null;
		if (this.name === value.name && this.alias === alias) {
			return;
		}
		this.name = value.name;
		this.alias = value.alias;
		this.modifiedInSchemaUId = value.modifiedInSchemaUId;
		this.fireEvent("changed", value, this);
	}

	//endregion
});
