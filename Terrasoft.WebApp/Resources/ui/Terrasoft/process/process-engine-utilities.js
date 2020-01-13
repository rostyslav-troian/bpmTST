Ext.ns("Terrasoft.process");

/**
 * Contains utility methods used during business process run time.
 */
Ext.define("Terrasoft.process.ProcessEngineUtilities", {
	alternateClassName: "Terrasoft.ProcessEngineUtilities",
	extend: "Terrasoft.BaseObject",
	singleton: true,

	/**
	 * @private
	 */
	_initCollectExecutionDataValue: function(requestOptions, options) {
		if (Ext.isDefined(options.collectExecutionData)) {
			requestOptions.collectExecutionData = options.collectExecutionData;
		}
		if (Ext.isDefined(options.publishExecutionData)) {
			requestOptions.publishExecutionData = options.publishExecutionData;
		}
	},

	/**
	 * Initializes process request parameter values.
	 * @private
	 * @param {Terrasoft.BaseRunProcessRequest} request Request to initialize.
	 * @param {Object} parameterValues Process parameter values.
	 */
	initProcessRequestParameters: function(request, parameterValues) {
		if (Terrasoft.isEmptyObject(parameterValues)) {
			return;
		}
		Terrasoft.each(parameterValues, function(parameterValue, parameterName) {
			request.addParameterValue(parameterName, parameterValue);
		}, this);
	},

	/**
	 * Runs business process regardless version is active or not.
	 * @param {String} schemaUId Process schema UId.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	runSpecifiedProcessVersion: function(schemaUId, callback, scope) {
		const request = Ext.create("Terrasoft.RunSpecifiedProcessVersionRequest", {
			schemaUId: schemaUId,
			collectExecutionData: false
		});
		request.execute(callback, scope);
	},

	/**
	 * Runs active version of business process.
	 * @param {Object} options Run options.
	 * @param {String} [options.schemaUId] Process schema UId.
	 * @param {String} [options.schemaName] Process schema name. Used in case of schemaUId is not defined.
	 * @param {Object} [options.parameterValues] Initial process parameter values.
	 * @param {Boolean} [options.collectExecutionData] Indicates whether to collect execution data or not.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	runProcess: function(options, callback, scope) {
		const requestOptions = {
			schemaUId: options.schemaUId,
			schemaName: options.schemaName
		};
		this._initCollectExecutionDataValue(requestOptions, options);
		const request = Ext.create("Terrasoft.RunProcessRequest", requestOptions);
		this.initProcessRequestParameters(request, options.parameterValues);
		request.execute(callback, scope);
	},

	/**
	 * Completes process element.
	 * @param {Object} options Complete options.
	 * @param {String} [options.processElementUId] Process element UId to complete.
	 * @param {Boolean} [options.collectExecutionData] Indicates whether to collect execution data or not.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function scope.
	 */
	completeExecuting: function (options, callback, scope) {
		const requestOptions = {
			processElementUId: options.processElementUId
		};
		this._initCollectExecutionDataValue(requestOptions, options);
		const request = Ext.create("Terrasoft.CompleteExecutingRequest", requestOptions);
		this.initProcessRequestParameters(request, options.parameterValues);
		request.execute(callback, scope);
	}

});
