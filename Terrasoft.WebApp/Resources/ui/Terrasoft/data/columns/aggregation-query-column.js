/**
 * The class defining the function column
 */
Ext.define("Terrasoft.data.columns.AggregationQueryColumn", {
	extend: "Terrasoft.BaseQueryColumn",
	alternateClassName: "Terrasoft.AggregationQueryColumn",

	/**
	 * @type {Terrasoft.AggregationType}
	 */
	aggregationType: Terrasoft.AggregationType.NONE,

	/**
	 * Subquery filters. Can not contain filters with other subqueries.
	 * @private
	 * @type {Terrasoft.FilterGroup}
	 */
	subFilters: null,

	/**
	 * The path to the column is relative to {@link #rootSchema}. Elements of the path are separated by a dot.
	 * @type {String}
	 */
	columnPath: "",

	/**
	 * Initialize the internal representation of the column, create {@link #expression} from the configuration
	 * object.
	 * @protected
	 * @override
	 */
	initExpression: function() {
		this.callParent(arguments);
		this.expression = Ext.create("Terrasoft.AggregationQueryExpression", {
			aggregationType: this.aggregationType,
			columnPath: this.columnPath,
			subFilters: this.subFilters
		});
	}
});
