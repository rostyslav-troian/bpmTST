/**
 * The comparison filter class [Exists according to the specified condition]
 */
Ext.define("Terrasoft.data.filters.ExistsFilter", {
	extend: "Terrasoft.BaseFilter",
	alternateClassName: "Terrasoft.ExistsFilter",

	/**
  * Type of filter
  * @type {Terrasoft.FilterType}
  */
	filterType: Terrasoft.FilterType.EXISTS,

	/**
  * Type of comparison operation
  * @type {Terrasoft.ComparisonType}
  */
	comparisonType: Terrasoft.ComparisonType.EXISTS,

	/**
  * Subquery filters. Cannot contain filters with other subqueries
  * @type {Terrasoft.FilterGroup}
  */
	subFilters: null,

	/**
  * Indicates that the filter is aggregating
  * @type {Boolean}
  */
	isAggregative: true,

	/**
  * Creates and initializes an object {Terrasoft.SubqueryExpression}
  * @param {Object} config Configuration object
  * @return {Terrasoft.ExistsFilter} Returns the created object
  */
	constructor: function() {
		this.callParent(arguments);
		if (!this.subFilters) {
			this.subFilters = Ext.create("Terrasoft.FilterGroup");
		}
	},

	/**
  * Checks if the filter is full, valid and ready for use
  * @protected
  * @override
  * @return {Boolean} Returns true if the filter is fully populated and can be applied,
  * otherwise returns false
  */
	getIsCompleted: function() {
		return true;
	},

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object
  */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.subFilters = this.getSerializableProperty(this.subFilters);
	}

});