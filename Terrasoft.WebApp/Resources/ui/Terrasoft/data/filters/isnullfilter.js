/**
 */
Ext.define("Terrasoft.data.filters.IsNullFilter", {
	extend: "Terrasoft.data.filters.BaseFilter",
	alternateClassName: "Terrasoft.IsNullFilter",

	/**
	 * Filter type.
	 * @type {Terrasoft.FilterType}
	 */
	filterType: Terrasoft.FilterType.IS_NULL,

	/**
	 * Comparisson type.
	 * @type {Terrasoft.ComparisonType}
	 */
	comparisonType: Terrasoft.ComparisonType.IS_NULL,

	/**
	 * Flag that indicates if expression is empty or not.
	 * @type {Boolean}
	 */
	isNull: true,

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.data.filters.BaseFilter#getSerializableObject
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.isNull = (serializableObject.comparisonType === Terrasoft.ComparisonType.IS_NULL);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.data.filters.BaseFilter#getIsEquals
	 * @override
	 */
	getIsEquals: function(filter) {
		var result = !!filter;
		result = result && filter instanceof Terrasoft.IsNullFilter;
		result = result && this.filterType === filter.filterType;
		result = result && filter.isNull;
		return result;
	}

	//endregion

});