/**
 */
Ext.define("Terrasoft.core.ClientUnitSchemaMessage", {
	alternateClassName: "Terrasoft.ClientUnitSchemaMessage",
	extend: "Terrasoft.BaseObject",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	//region Properties: Public

	/**
  * Message name.
  * @type {String}
  */
	name: null,

	/**
  * Message direction.
  * @type {Terrasoft.MessageDirectionType}
  */
	directionType: null,

	/**
  * Message mode.
  * @type {Terrasoft.MessageMode}
  */
	mode: null,

	//endregion

	//region Methods: Protected

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface.
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object.
  */
	getSerializableObject: function(serializableObject) {
		serializableObject.directionType = this.directionType;
		serializableObject.mode = this.mode;
	}

	//endregion

});
