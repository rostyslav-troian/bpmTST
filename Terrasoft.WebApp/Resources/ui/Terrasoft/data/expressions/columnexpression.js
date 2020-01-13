/**
 * A class that defines an expression of type column EntitySchema
 */
Ext.define("Terrasoft.data.expressions.ColumnExpression", {
	extend: "Terrasoft.data.expressions.BaseExpression",
	alternateClassName: "Terrasoft.ColumnExpression",

	/**
	 * Type of expression
	 * @type {Terrasoft.ExpressionType}
	 */
	expressionType: Terrasoft.ExpressionType.SCHEMA_COLUMN,

	/**
	 * The path to the column is relative to {@link #rootSchema}. Elements of the path are separated by a dot.
	 * @type {String}
	 */
	columnPath: "",

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.columnPath = this.columnPath;
	}

});
