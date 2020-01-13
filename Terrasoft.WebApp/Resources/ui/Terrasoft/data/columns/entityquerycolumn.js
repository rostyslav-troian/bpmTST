/**
 * The class that defines the column to select a value from EntitySchema
 */
Ext.define("Terrasoft.data.columns.EntityQueryColumn", {
	extend: "Terrasoft.BaseQueryColumn",
	alternateClassName: "Terrasoft.EntityQueryColumn",

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
		this.expression = Ext.create("Terrasoft.ColumnExpression", {
			columnPath: this.columnPath
		});
	}

});
