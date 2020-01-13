/**
 * Base class that represents process request.
 */
Ext.define("Terrasoft.process.BaseProcessRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.BaseProcessRequest",

	//region Properties: Protected

	/**
	 * Base URI.
	 * @protected
	 * @type {String}
	 */
	baseUri: "../ServiceModel/ProcessEngineService.svc",

	/**
	 * Response query class name.
	 * @protected
	 * @type {String}
	 */
	responseClassName: "Terrasoft.BaseProcessResponse",

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.collectExecutionData = Terrasoft.Features.getIsEnabled("GetProcessStepsViaResponse");
		this.callParent(arguments);
	},

	//endregion

	//region Properties: Public

	/**
	 * Indicates whether to publish collected process execution data immediate after response receive.
	 */
	publishExecutionData: true,

	/**
	 * Indicates whether to collect execution data or not.
	 */
	collectExecutionData: true,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getRequestConfig.
	 * @protected
	 * @override
	 */
	getRequestConfig: function() {
		const config = this.callParent(arguments);
		config.url = this.baseUri + "/" + this.contractName;
		config.publishExecutionData = this.publishExecutionData;
		config.parseResponseErrorInfo = true;
		return config;
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.collectExecutionData = this.collectExecutionData;
	}

	//endregion

});
