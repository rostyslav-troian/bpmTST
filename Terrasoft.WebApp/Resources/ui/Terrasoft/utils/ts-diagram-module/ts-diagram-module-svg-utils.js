/**
 * A utility class for working with Svg TsDiagramModule.
 */
Ext.define("Terrasoft.utils.TsDiagramModule.SvgUtils", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.TsDiagramModule.SvgUtils",

	/**
	 * Returns the feGlood SVG element.
	 * @param {ej.Diagram.Svg} svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @param {Object} attributes Attributes of the element.
	 * @return {SVGElement}
	 */
	createFeFlood: function(svg, attributes) {
		return svg.element(attributes, "feFlood");
	},

	/**
	 * Returns the feComposite SVG element.
	 * @param {ej.Diagram.Svg} svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @param {Object} attributes Attributes of the element.
	 * @return {SVGElement}
	 */
	createFeComposite: function(svg, attributes) {
		return svg.element(attributes, "feComposite");
	},

	/**
	 * A utility method for creating a shadow filter for the SVG element.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException} Throws an exception if the filterName property is not specified.
	 * @throws {Terrasoft.ItemNotFoundException} Throws an exception if the SVG element in the document does not exist defs.
	 * @param {ej.Diagram.Svg} svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @param {Object} filterConfig
	 * @param {String} filterConfig.name The name of the filter.
	 * @param {String} filterConfig.color The shadow color specified in the HEX format.
	 * @param {Number} filterConfig.opacity The transparency of the shadow in the range 0-1.
	 * @param {Number} filterConfig.offsetX Offset on the X axis.
	 * @param {Number} filterConfig.offsetY Offset on the Y axis.
	 * @param {Number} filterConfig.blur Blur.
	 * @return {String} The URL of the filter.
	 */
	createShadowFilter: function(svg, filterConfig) {
		var config = filterConfig || {};
		var filterName = config.name;
		if (Ext.isEmpty(filterName)) {
			throw Ext.create("Terrasoft.ArgumentNullOrEmptyException");
		}
		var existingFilter = svg.getElementById(filterName);
		if (existingFilter) {
			return "url(#" + filterName + ")";
		}
		var defs = svg.getElementsByTagName("defs")[0];
		if (defs == null) {
			throw Ext.create("Terrasoft.ItemNotFoundException");
		}
		var filter = svg.filter({
			id: filterName,
			width: "200%",
			height: "200%"
		});
		var offset = svg.feOffset({
			result: "offsetResult",
			"in": "SourceAlpha",
			dx: config.offsetX || 0,
			dy: config.offsetY || 0
		});
		filter.appendChild(offset);
		var blur = svg.feGaussianBlur({
			result: "blurResult",
			"in": "offsetResult",
			stdDeviation: config.blur || 0
		});
		filter.appendChild(blur);
		var feFlood = this.createFeFlood(svg, {
			"flood-color": config.color || "#000",
			"flood-opacity": config.opacity || 0,
			result: "colorResult"
		});
		filter.appendChild(feFlood);
		var feComposite = this.createFeComposite(svg, {
			operator: "in",
			"in": "colorResult",
			in2: "blurResult",
			result: "shadowResult"
		});
		filter.appendChild(feComposite);
		var blend = svg.feBlend({
			"in": "SourceGraphic",
			in2: "shadowResult",
			mode: "normal"
		});
		filter.appendChild(blend);
		defs.appendChild(filter);
		return "url(#" + filterName + ")";
	},

	/**
	 * Returns the matrix values of the element's transformation for the offset
	 * (See [translate] (http://www.w3.org/TR/SVG/coords.html#InterfaceSVGTransform)).
	 * @param {SVGElement} el Svg-element.
	 * @param {String []} attributeNames The names of the matrix properties to return. For attribute names,
	 * [here] (http://www.w3.org/TR/SVG/coords.html#InterfaceSVGMatrix).
	 * @return {Object} Returns an object that contains properties whose names were passed in the parameter
	 * attributeNames and the values of the corresponding properties of the transformation matrix.
	 */
	getSvgElTranslateValues: function(el, attributeNames) {
		var transformList = el.transform.baseVal;
		var result = {};
		attributeNames.forEach(function(name) {
			result[name] = 0;
		}, this);
		for (var i = 0, length = transformList.numberOfItems; i < length; i++) {
			var transformItem = transformList.getItem(i);
			if (transformItem.type === SVGTransform.SVG_TRANSFORM_TRANSLATE) {
				for (var j = 0, attrlength = attributeNames.length; j < attrlength; j++) {
					var name = attributeNames[j];
					result[name] = transformItem.matrix[name] || 0;
				}
				break;
			}
		}
		return result;
	}

});
