Terrasoft.configuration.Structures["ChartCompatibilityValidator"] = {innerHierarchyStack: ["ChartCompatibilityValidator"]};
define("ChartCompatibilityValidator", [], function() {
	Ext.define("Terrasoft.configuration.ChartCompatibilityValidator", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.ChartCompatibilityValidator",

		statics: {

			// region Properties: Public

			compatibilityMapping: {
				areaspline: {
					compatibility: ["spline", "line", "column", "scatter"]
				},
				bar: {},
				column: {
					compatibility: ["spline", "line", "areaspline", "scatter"]
				},
				funnel: {},
				gauge: {},
				line: {
					compatibility: ["spline", "areaspline", "column", "scatter"]
				},
				pie: {},
				scatter: {
					compatibility: ["spline", "line", "areaspline", "column"]
				},
				spline: {
					compatibility: ["line", "areaspline", "column", "scatter"]
				}
			},

			// endregion

			// region Methods: Private

			/**
			 * @private
			 * @param {Array<String>} seriesTypes
			 * @param {String} type
			 * @param {Object} [compatibilityMapping]
			 * @return {Boolean} True if types is compatibility.
			 */
			_isCompatibilityType: function(seriesTypes, type, compatibilityMapping) {
				const mapping = Ext.apply(this.compatibilityMapping, compatibilityMapping);
				const compatibility = mapping[type] && mapping[type].compatibility || [];
				const compatibilityTypes = Ext.Array.merge(compatibility, [type]);
				return Ext.Array.every(seriesTypes, function(innerType) {
					return Ext.Array.contains(compatibilityTypes, innerType);
				});
			},

			// endregion

			// region Methods: Public

			/**
			 * Checks series chart types is compatibility.
			 * @param {Array<String>} seriesTypes
			 * @param {Object} [compatibilityMapping]
			 * @return {Boolean} True if seriesTypes is compatibility.
			 */
			isCompatibilityTypes: function(seriesTypes, compatibilityMapping) {
				return Ext.Array.every(seriesTypes, function(type) {
					return this._isCompatibilityType(seriesTypes, type, compatibilityMapping);
				}, this);
			}

			// endregion
		}
	});
	return {};
});


