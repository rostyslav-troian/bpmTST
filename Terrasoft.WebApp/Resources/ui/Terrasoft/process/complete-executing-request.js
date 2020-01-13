/**
 * Represents a base class for process requests with parameters.
 */
Ext.define("Terrasoft.process.CompleteExecutingRequest", {
	extend: "Terrasoft.ParameterizedProcessRequest",
	alternateClassName: "Terrasoft.CompleteExecutingRequest",

	//region Properties: Private

	/**
	 * Base URI.
	 * @private
	 * @type {String}
	 */
	baseUri: "../ServiceModel/ProcessEngineService.svc",

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @protected
	 * @override
	 */
	contractName: "CompleteExecuting",

	/**
	 * Response query class name.
	 * @protected
	 * @type {String}
	 */
	responseClassName: "Terrasoft.CompleteExecutingResponse",

	//endregion

	//region Properties: Public

	/**
	 * Process element UId to complete.
	 */
	processElementUId: null,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		const config = this.callParent(arguments);
		config.processElementUId = this.processElementUId;
		config.collectExecutionData = this.collectExecutionData;
		return config;
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseRequest#validate.
	 * @override
	 */
	validate: function() {
		this.callParent(arguments);
		if (!this.processElementUId || Terrasoft.isEmptyGUID(this.processElementUId)) {
			throw new Terrasoft.NullOrEmptyException({
				argumentName: "processElementUId"
			});
		}
		return true;
	}

	//endregion

});
