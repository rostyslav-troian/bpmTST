/**
 * Represents a BaseProcessRequest's response.
 */
Ext.define("Terrasoft.process.BaseProcessResponse", {
	alternateClassName: "Terrasoft.BaseProcessResponse",
	extend: "Terrasoft.BaseResponse",

	//region Properties: Private

	/**
	 * Execution data for the next page to open.
	 * @private
	 */
	executionData: null,

	//endregion

	//region Methods: Public

	/**
	 * Called by Terrasoft.BaseServiceProvider after creation.
	 * @param {Object} requestConfig Config object used to create AJAX request.
	 */
	setRequestConfig: function(requestConfig) {
		if (requestConfig.publishExecutionData) {
			this.publishExecutionData();
		}
	},

	/**
	 * Publishes process execution data to the {@link Terrasoft.ProcessExecutionDataCollector}.
	 */
	publishExecutionData: function() {
		if (this.executionData) {
			Terrasoft.ProcessExecutionDataCollector.add(this.executionData);
		}
	}

	//endregion

});
