/**
 * @class Terrasoft.services.ServiceSchema
 */
Ext.define("Terrasoft.services.ServiceParameterValue", {
	extend: "Terrasoft.ServiceMetaItem",
	alternateClassName: "Terrasoft.ServiceParameterValue",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	// region Properties: Public

	/**
	 * Mixed
	 */
	value: null,

	/**
	 * Terrasoft.services.enums.ParameterSource
	 */
	source: Terrasoft.services.enums.ServiceParameterValueSource.UNDEFINED,

	//endregion

	//region Methods: Protected

	getSerializableObject: function(serializableObject) {
		serializableObject.value = this.value;
		serializableObject.source = this.source;
	}

	//endregion

});
