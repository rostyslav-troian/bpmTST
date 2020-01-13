Ext.ns("Terrasoft.utils.enums");

/**
 * @singleton
 */

/**
 * Converts client aggregation type to server aggregation type.
 * @param {Terrasoft.core.enums.AggregationType} aggregationType AggregationType.
 * @return {Terrasoft.core.enums.AggregationType} Aggregation type which is used on the server.
 */
Terrasoft.utils.enums.convertToServerAggregationType = function(aggregationType) {
	if (!aggregationType || aggregationType === Terrasoft.AggregationType.NONE) {
		return Terrasoft.AggregationType.NONE.toString();
	}
	var result = aggregationType - 1;
	return result.toString();
};

/**
 * Alias for {@link Terrasoft.utils.enums#convertToServerAggregationType}
 * @member Terrasoft
 * @method convertToServerAggregationType
 * @inheritdoc Terrasoft.utils.enums#convertToServerAggregationType
 */
Terrasoft.convertToServerAggregationType = Terrasoft.utils.enums.convertToServerAggregationType;

