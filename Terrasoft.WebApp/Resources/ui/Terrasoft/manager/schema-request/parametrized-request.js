/**
 * Class for parametrized request.
 */
Ext.define("Terrasoft.core.ParametrizedRequest", {
	alternateClassName: "Terrasoft.ParametrizedRequest",
	extend: "Terrasoft.BaseRequest",

	// region Properties: Protected

	/**
	 * Request configuration object.
	 * @protected
	 * @type {Object}
	 */
	config: null,

	// endregion

	// region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		serializableObject.contractName = this.contractName;
		Terrasoft.each(this.config, function(value, configName) {
			serializableObject[configName] = value;
		});
	}

	// endregion

});
