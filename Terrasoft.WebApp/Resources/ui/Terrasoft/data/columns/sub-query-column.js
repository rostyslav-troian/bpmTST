/**
 * The class defining the function column
 */
Ext.define('Terrasoft.data.columns.SubQueryColumn', {
	extend: 'Terrasoft.BaseQueryColumn',
	alternateClassName: 'Terrasoft.SubQueryColumn',

	/**
	 * The path to the column is relative to {@link #rootSchema}. Elements of the path are separated by a dot.
	 * @type {String}
	 */
	columnPath: '',

	/**
	 * Column aggregation type columnPath
	 * @type {Terrasoft.AggregationType}
	 */
	aggregationType: Terrasoft.AggregationType.NONE,

	/**
	 * Sub-query filters. Can not contain filters with other sub-queries.
	 * @type {Terrasoft.FilterGroup}
	 */
	subFilters: null,

	/**
	 * Initialize the internal representation of the column, create {@link #expression} from the configuration
	 * object.
	 * @protected
	 * @override
	 */
	initExpression: function() {
		this.callParent(arguments);
		this.expression = Ext.create('Terrasoft.SubQueryExpression', {
			aggregationType: this.aggregationType,
			columnPath: this.columnPath,
			subFilters: this.subFilters
		});
	}

});