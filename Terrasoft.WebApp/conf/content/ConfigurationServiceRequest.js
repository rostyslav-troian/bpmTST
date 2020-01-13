Terrasoft.configuration.Structures["ConfigurationServiceRequest"] = {innerHierarchyStack: ["ConfigurationServiceRequest"]};
define("ConfigurationServiceRequest", ["ConfigurationServiceProvider"], function() {
	Ext.define("Terrasoft.configuration.ConfigurationServiceRequest", {
		extend: "Terrasoft.BaseRequest",
		alternateClassName: "Terrasoft.ConfigurationServiceRequest",

		/**
		 * #### # #######.
		 * @protected
		 * @type {String}
		 */
		serviceUrl: "../rest",

		/**
		 * ######## #######.
		 * @protected
		 * @type {String}
		 */
		serviceName: "",

		/**
		 * ######## ######## ####### ######, ####### ###### ######### ########## #######.
		 * @protected
		 * @type {String}
		 */
		resultPropertyName: "",

		/**
		 * ####### ######## ######## ####### ######, ####### ###### ######### ########## #######.
		 * @private
		 * @type {String}
		 */
		resultPropertyNameSuffix: "Result",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.serviceProvider = Terrasoft.ConfigurationServiceProvider;
		},

		/**
		 * ######## URL ### ####### # ###-#######.
		 * @protected
		 * @return {String} URL ### ####### # ###-#######.
		 */
		getRequestUrl: function() {
			return Terrasoft.combinePath(this.serviceUrl, this.serviceName, this.contractName);
		},

		/**
		 * ########## ######## ######## ####### ######, ####### ###### ######### ########## #######.
		 * @param {Object} config ############ #######.
		 * @return {String} ######## ######## ####### ######, ####### ###### ######### ########## #######.
		 */
		getResultPropertyName: function(config) {
			var resultPropertyName = this.resultPropertyName;
			if (resultPropertyName) {
				return resultPropertyName;
			}
			var contractName = config.contractName || this.contractName;
			return (contractName + this.resultPropertyNameSuffix);
		},

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getRequestConfig
		 * @overridden
		 */
		getRequestConfig: function() {
			var config = this.callParent(arguments);
			return Ext.apply({}, config, {
				url: this.getRequestUrl(),
				resultPropertyName: this.getResultPropertyName(config)
			});
		},

		/**
		 * @inheritdoc Terrasoft.BaseRequest#validate
		 * @overridden
		 */
		validate: function() {
			this.callParent(arguments);
			if (!this.serviceName) {
				throw new Terrasoft.NullOrEmptyException({
					message: "serviceName"
				});
			}
		}
	});
});


