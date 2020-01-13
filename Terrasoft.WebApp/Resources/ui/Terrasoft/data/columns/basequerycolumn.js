/**
 * @abstract
 * Query columns base class.
 */
Ext.define("Terrasoft.data.columns.BaseQueryColumn", {
	extend: "Terrasoft.ObjectCollectionItem",
	alternateClassName: "Terrasoft.BaseQueryColumn",
	caption: "",

	/**
	 * Order direction.
	 * @type {Terrasoft.OrderDirection}
	 */
	orderDirection: Terrasoft.OrderDirection.NONE,

	/**
	 * Column order position.
	 * @type {Number}
	 */
	orderPosition: -1,

	/**
	 * Column expression.
	 * @type {Terrasoft.BaseExpression}
	 */
	expression: null,

	/**
	 * If true then column data will be present in the result set.
	 * @type {Boolean}
	 */
	isVisible: true,

	/**
	 * Creates column instance.
	 * @param {Object} config Configuration object.
	 * @return {Terrasoft.BaseQueryColumn}
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.initExpression(config);
	},

	/**
	 * Initializes internal column view.
	 * @protected
	 */
	initExpression: Terrasoft.emptyFn,

	/**
	 * @inheritdoc Terrasoft.ObjectCollectionItem#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.caption = this.caption;
		serializableObject.orderDirection = this.orderDirection;
		serializableObject.orderPosition = this.orderPosition;
		serializableObject.isVisible = this.isVisible;
		serializableObject.expression = this.getSerializableProperty(this.expression);
	}

});
