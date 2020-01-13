/**
 * A class that describes an element of an object collection {@link Terrasoft.ObjectCollection}.
 */
Ext.define("Terrasoft.core.collections.ObjectCollectionItem", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.ObjectCollectionItem",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
  * Link to the parent collection
  * @type {Terrasoft.ObjectCollection}
  */
	parentCollection: null,

	/**
  * Set the parent collection for an item
  * @protected
  * @param {Terrasoft.ObjectCollection} collection Parent collection
  */
	setParentCollection: function(collection) {
		this.parentCollection = collection;
	},

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface
  * {@link Terrasoft.Serializable}
  * @protected
  * @param {Object} serializableObject Serialized object
  * @param {Object} serializationInfo Serialization Options
  */
	getSerializableObject: function(serializableObject, serializationInfo) {
		if (serializationInfo.serializeFilterManagerInfo) {
			serializableObject.className = this.alternateClassName;
		}
	}

});
