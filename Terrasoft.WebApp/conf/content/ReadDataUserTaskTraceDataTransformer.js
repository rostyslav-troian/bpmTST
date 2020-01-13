Terrasoft.configuration.Structures["ReadDataUserTaskTraceDataTransformer"] = {innerHierarchyStack: ["ReadDataUserTaskTraceDataTransformer"]};
define("ReadDataUserTaskTraceDataTransformer", ["terrasoft", "ext-base", "ProcessUserTaskConstants"],
	function(Terrasoft, Ext, ProcessUserTaskConstants) {
	/**
	 * Class ReadDataUserTaskTraceDataTransformer.
	 */
	Ext.define("Terrasoft.configuration.ReadDataUserTaskTraceDataTransformer", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ReadDataUserTaskTraceDataTransformer",

		/**
		 * @private
		 */
		_defaultDateResult: "0001-01-01T00:00:00",

		/**
		 * @private
		 */
		_functionResultParameterNames: [
			"ResultIntegerFunction",
			"ResultFloatFunction",
			"ResultDateTimeFunction",
			"ResultCount"
		],

		/**
		 * @private
		 */
		_functionAggregateParameterNames: [
			"FunctionType",
			"AggregationColumnName"
		],

		/**
		 * @private
		 */
		_readDataExcludeParameterNames: [
			"ResultType",
			"NumberOfRecords",
			"ResultEntityCollection",
			"EntityColumnMetaPathes",
			"IgnoreDisplayValues"
		],

		/**
		 * @private
		 */
		_columnsParameterNames: [
			"ResultCompositeObjectList",
			"ResultEntity",
			"ReadSomeTopRecords"
		],

		/**
		 * @private
		 */
		_isAfterExecutionData: null,

		/**
		 * @private
		 */
		_parameters: null,

		/**
		 * @private
		 */
		_removeParameterByName: function(parameterName) {
			this._parameters =	_.reject(this._parameters, function(item) {
				return parameterName === item.Parameter.Name;
			});
		},

		/**
		 * @private
		 */
		_removeParametersByNames: function(removeParameterNames) {
			_.each(removeParameterNames, function(parameterName) {
				this._removeParameterByName(parameterName);
			}, this);
		},

		/**
		 * @private
		 */
		_findParameterValueByName: function(name) {
			var value = null;
			this._parameters.forEach(function(item) {
				if (item.Parameter.Name === name) {
					value = item.Value;
				}
			});
			return value;
		},

		_removeEmptyResultParameters: function() {
			var removeParametersNames = [];
			if (this._findParameterValueByName("ResultDateTimeFunction") === this._defaultDateResult) {
				removeParametersNames.push("ResultDateTimeFunction");
			}
			if (this._findParameterValueByName("ResultFloatFunction") === 0) {
				removeParametersNames.push("ResultFloatFunction");
			}
			if (removeParametersNames.length !== 2 && this._findParameterValueByName("ResultIntegerFunction") === 0) {
				removeParametersNames.push("ResultIntegerFunction");
			}
			this._removeParametersByNames(removeParametersNames);
		},

		/**
		 * @private
		 */
		_getAggregationType: function() {
			return this._findParameterValueByName("FunctionType") + 1;
		},

		/**
		 * @private
		 */
		_replaceAggregationType: function() {
			var aggregationTypeInvertEnum = _.invert(Terrasoft.AggregationType);
			_.each(this._parameters, function(item) {
				if (item.Parameter.Name === "FunctionType") {
					item.Value = aggregationTypeInvertEnum[this._getAggregationType()];
				}
			}, this);
		},

		/**
		 * @private
		 */
		_removeParametersForFunctionResultType: function() {
			switch (this._getAggregationType()) {
				case Terrasoft.AggregationType.SUM:
				case Terrasoft.AggregationType.MIN:
				case Terrasoft.AggregationType.MAX:
				case Terrasoft.AggregationType.AVG:
					this._removeParameterByName("ResultCount");
					this._removeEmptyResultParameters();
					break;
				default:
					this._removeParametersByNames(["ResultIntegerFunction", "ResultFloatFunction",
						"ResultDateTimeFunction", "AggregationColumnName"]);
					break;
			}
		},

		/**
		 * @private
		 */
		_removeRedundantParameters: function() {
			var resultType = this._findParameterValueByName("ResultType");
			this._removeParametersByNames(this._readDataExcludeParameterNames);
			switch (String(resultType)) {
				case ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY:
					this._removeParametersByNames(this._functionResultParameterNames);
					this._removeParametersByNames(this._functionAggregateParameterNames);
					this._removeParametersByNames(["ResultCompositeObjectList", "ResultRowsCount"]);
					break;
				case ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.ENTITY_COLLECTION:
					this._removeParametersByNames(this._functionResultParameterNames);
					this._removeParametersByNames(this._functionAggregateParameterNames);
					this._removeParametersByNames(["ResultEntity", "ReadSomeTopRecords"]);
					break;
				case ProcessUserTaskConstants.READ_DATA_RESULT_TYPE.FUNCTION:
					this._removeParametersByNames(this._columnsParameterNames);
					this._removeParametersByNames(["ResultRowsCount", "OrderInfo"]);
					this._removeParametersForFunctionResultType();
					this._replaceAggregationType();
					break;
				default:
					break;
			}
		},

		/**
		 * Transformed data to more comfortable view.
		 * @param {String} input data.
		 * @return {String} transformed data.
		 */
		transform: function(data) {
			this._parameters = JSON.parse(data);
			this._removeRedundantParameters();
			return JSON.stringify(this._parameters);
		}
	});
	return Terrasoft.ReadDataUserTaskTraceDataTransformer;
});


