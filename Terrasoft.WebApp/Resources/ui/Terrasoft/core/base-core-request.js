/**
 */
Ext.define("Terrasoft.core.BaseCoreRequest", {
	alternateClassName: "Terrasoft.BaseCoreRequest",
	extend: "Terrasoft.BaseRequest",

	/**
	 * Name of the core service.
	 * @property {String}
	 */
	serviceName: "",

	/**
	 * Name of the server service method.
	 * @property {String}
	 */
	serviceMethod: "",

	/**
	 * Data to send to server.
	 * @property Any
	 */
	data: null,

	/**
	 * @inheritdoc Terrasoft.BaseRequest#getRequestConfig
	 * @protected
	 * @override
	 * @return {Object}
	 */
	getRequestConfig: function() {
		var config = this.callParent(arguments);
		return Ext.apply(config, {
			serverMethod: Terrasoft.combinePath(this.serviceName, this.serviceMethod),
			data: this.data || this
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate
	 * @override
	 * @return {Boolean}
	 */
	validate: function() {
		if (!this.serviceName) {
			throw new Terrasoft.NullOrEmptyException({
				message: "serviceName"
			});
		}
		if (!this.serviceMethod) {
			throw new Terrasoft.NullOrEmptyException({
				message: "serviceMethod"
			});
		}
		return true;
	},

	/**
	 * @inheritdoc Terrasoft.BaseRequest#constructor.
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.serviceProvider = Terrasoft.CoreServiceProvider;
	}
});
