Terrasoft.configuration.Structures["FeatureServiceRequest"] = {innerHierarchyStack: ["FeatureServiceRequest"]};
define("FeatureServiceRequest", ["ext-base", "terrasoft", "ConfigurationServiceRequest"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.configuration.FeatureServiceRequest
	 * Class used to interact with features web service.
	 */
	Ext.define("Terrasoft.configuration.FeatureServiceRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.FeatureServiceRequest",

		/**
		 * Feature code.
		 * @type {String}
		 */
		code: null,

		/**
		 * Feature state.
		 * @type {Terrasoft.core.enums.FeatureState}
		 */
		state: null,

		/**
		 * @inheritdoc Terrasoft.configuration.ConfigurationServiceRequest#serviceName
		 * @overridden
		 */
		serviceName: "FeatureService",

		/**
		 * @inheritdoc Terrasoft.core.BaseRequest#getSerializableObject
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			serializableObject.code = this.code;
			if (this.state !== null) {
				serializableObject.state = this.state;
			}
		},

		/**
		 * @inheritdoc Terrasoft.core.BaseRequest#validate
		 * @overridden
		 */
		validate: function() {
			this.callParent(arguments);
			if (Ext.isEmpty(this.code)) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentsName: "code"});
			}
		},

		/**
		 * Updates state of the feature.
		 * @param {Object} config State parameters.
		 * @param {Terrasoft.core.enums.FeatureState} config.state New feature state.
		 * @param {Boolean} [config.forAllUsers] If defined as true state will be updated for all users,
		 * otherwise only for current user.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 * @throws {Terrasoft.ArgumentNullOrEmptyException} If state is not defined in config.
		 */
		updateFeatureState: function(config, callback, scope) {
			this.contractName = (config.forAllUsers === true) ? "SetFeatureStateForAllUsers" : "SetFeatureState";
			if (Ext.isEmpty(config.state)) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentsName: "config.state"});
			}
			this.state = config.state;
			this.execute(callback, scope);
		},

		/**
		 * Returns current feature state.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getFeatureState: function(callback, scope) {
			this.contractName = "GetFeatureState";
			this.execute(function(response) {
				var result = response ? response.FeatureState : null;
				callback.call(scope, result);
			}, this);
		}

	});

	return Terrasoft.FeatureServiceRequest;

});


