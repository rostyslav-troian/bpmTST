/**
 * A utility class for working with the TsDiagramModule diagram signatures.
 */
Ext.define("Terrasoft.utils.TsDiagramModule.LabelUtils", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.TsDiagramModule.LabelUtils",

	/**
	 * Utility class for working with Svg.
	 * @type {Terrasoft.TsDiagramModule.SvgUtils}
	 * @protected
	 */
	svgUtils: null,

	/**
	 * Returns the points on the diagram where you want to display the thread's signature.
	 * @param {ej.Diagram.Connector} connector The workflow element. The method does not check the passed chart node.
	 * @private
	 * @return {ej.Diagram.Point}
	 * @return {Number} return.x The x coordinate.
	 * @return {Number} return.y The y-axis coordinate.
	 */
	getSequenceFlowCaptionPosition: function(connector) {
		var points = this.getSequenceFlowPoints(connector);
		var index = Math.floor(points.length / 2);
		var labelPositionX;
		var labelPositionY;
		var point = points[index];
		if (points.length % 2 === 0) {
			labelPositionX = (points[index - 1].x + point.x) / 2;
			labelPositionY = (points[index - 1].y + point.y) / 2;
		} else {
			labelPositionX = point.x;
			labelPositionY = point.y;
		}
		return ej.datavisualization.Diagram.Point(labelPositionX, labelPositionY);
	},

	/**
	 * Returns an array of breakpoints of the stream. The result also includes the start and end points of the stream.
	 * @param {ej.Diagram.Connector} connector The workflow element. The method does not perform a validation of the node of the diagram.
	 * @private
	 * @return {ej.Diagram.Point []}
	 */
	getSequenceFlowPoints: function(connector) {
		var connectorSegments = connector.segments;
		var points = [];
		var lastAddedPoint;
		connectorSegments.forEach(function(segment) {
			segment.points.forEach(function(point) {
				if (lastAddedPoint && ej.datavisualization.Diagram.Geometry.isEqualPoint(point, lastAddedPoint)) {
					return;
				}
				lastAddedPoint = point;
				points.push(point);
			});
		});
		return points;
	},

	/**
	 * Returns the SVG element for the label background of the chart element.
	 * @param {Object} config
	 * @param {ej.Diagram.Label} config.label The signature object.
	 * @param {ej.Diagram.Node} config.node Chart element.
	 * @param {SVGTextElement} config.text A reference to a text SVG element.
	 * @param {ej.Diagram.Svg} config.svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @return {SVGElement} Created SVG element.
	 */
	getLabelBackgroundEl: function(config) {
		var label = config.label;
		var textNode = config.textNode;
		var svg = config.svg;
		var node = config.node;
		var bounds = label.bBox || textNode.getBBox();
		var attr = {
			id: node.name + "_" + label.name + "_lblbg",
			width: bounds.width,
			height: bounds.height,
			fill: label.text ? label.fillColor : "transparent",
			stroke: label.borderColor,
			"stroke-width": label.borderWidth,
			transform: "translate(0, 0)"
		};
		var el;
		switch (label.tag) {
			case Terrasoft.diagram.labelBackgroundTag.CIRCLE:
				attr.r = Math.max(bounds.width, bounds.height) / 2;
				attr.cx = 0;
				attr.cy = 0;
				el = svg.circle(attr);
				break;
			case Terrasoft.diagram.labelBackgroundTag.ELLIPSE:
				attr.rx = bounds.width / 2;
				attr.ry = bounds.height / 2;
				attr.cx = 0;
				attr.cy = 0;
				el = svg.ellipse(attr);
				break;
			default:
				el = svg.rect(attr);
		}
		return el;
	},

	/**
	 * Updates the SVG element of the signature substrate of the chart element.
	 * @param {Object} config
	 * @param {SVGTextElement} config.textNode A reference to a text SVG element.
	 * @param {ej.Diagram.Label} config.label The signature object.
	 * @param {ej.Diagram.Svg} config.svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @param {Number} config.backgroundPadding Indent.
	 * @param {SVGElement} config.labelBackgroundEl The SVG element of the signature substrate.
	 */
	updateLabelBackground: function(config) {
		var textNode = config.textNode;
		var label = config.label;
		var backgroundPadding = config.backgroundPadding;
		var labelBackgroundEl = config.labelBackgroundEl;
		var attributesConfig;
		switch (labelBackgroundEl.tagName) {
			case Terrasoft.diagram.labelBackgroundTag.CIRCLE:
				attributesConfig = this.getLabelCircleBackgroundConfig({
					label: label,
					textNode: textNode,
					padding: backgroundPadding
				});
				break;
			case Terrasoft.diagram.labelBackgroundTag.ELLIPSE:
				attributesConfig = this.getLabelEllipseBackgroundConfig({
					label: label,
					textNode: textNode,
					padding: backgroundPadding
				});
				break;
			default:
				attributesConfig = this.getLabelRecatangleBackgroundConfig({
					label: label,
					textNode: textNode,
					labelBackgroundEl: labelBackgroundEl,
					padding: backgroundPadding
				});
		}
		if (label.labelType === "statisticInfo") {
			attributesConfig.filter = this.getStatisticInfoLabelShadowFilter(config.svg);
		}
		ej.datavisualization.Diagram.Util.attr(labelBackgroundEl, attributesConfig);
	},

	/**
	 * Returns a set of attributes for the circular SVG element of the signature substrate.
	 * @param {Object} config
	 * @param {ej.Diagram.Label} config.label The signature object.
	 * @param {SVGTextElement} config.textNode A reference to a text SVG element.
	 * @param {Number} config.padding Indent.
	 * @return {Object}
	 * @return {Number} return.r Radius.
	 * @return {String} return.transform Offset.
	 */
	getLabelCircleBackgroundConfig: function(config) {
		var label = config.label;
		var textBBox = label.bBox;
		var textCenter = this.getTextCenter(config.textNode, textBBox);
		var padding = label.padding || config.padding;
		return {
			r: (Math.max(textBBox.width, textBBox.height) / 2) + padding,
			transform: "translate(" + textCenter.x + "," + textCenter.y + ")"
		};
	},

	/**
	 * Returns a set of attributes for the ellipsoid SVG element of the signature substrate.
	 * @param {Object} config
	 * @param {ej.Diagram.Label} config.label The signature object.
	 * @param {SVGTextElement} config.textNode A reference to a text SVG element.
	 * @param {Number} config.padding Indent.
	 * @return {Object}
	 * @return {Number} return.rx Radius by Osm X.
	 * @return {Number} return.ry The radius along the Y axis.
	 * @return {String} return.transform Offset.
	 */
	getLabelEllipseBackgroundConfig: function(config) {
		var label = config.label;
		var textBBox = label.bBox;
		var textCenter = this.getTextCenter(config.textNode, textBBox);
		var padding = label.padding || config.padding;
		return {
			rx: (Math.max(textBBox.width, textBBox.height) / 2) + padding,
			ry: textBBox.height / 2 + padding,
			transform: "translate(" + textCenter.x + "," + textCenter.y + ")"
		};
	},

	/**
	 * Returns a set of attributes for the rectangular SVG element of the signature substrate.
	 * @param {Object} config
	 * @param {ej.Diagram.Label} config.label The signature object.
	 * @param {SVGTextElement} config.textNode A reference to a text SVG element.
	 * @param {SVGElement} config.labelBackgroundEl The SVG element of the signature substrate.
	 * @param {Number} config.padding Indent.
	 * @return {Object}
	 * @return {Number} return.width Width.
	 * @return {Number} return.height Height.
	 * @return {String} return.transform Offset.
	 */
	getLabelRecatangleBackgroundConfig: function(config) {
		var labelBackgroundEl = config.labelBackgroundEl;
		var textTransformValues = this.svgUtils.getSvgElTranslateValues(config.textNode, ["e", "f"]);
		var textBBox = config.label.bBox;
		var translateX = textBBox.x + textTransformValues.e - config.padding;
		var translateY = textBBox.y + textTransformValues.f - config.padding;
		return {
			width: labelBackgroundEl.width.baseVal.value + config.padding * 2,
			height: labelBackgroundEl.height.baseVal.value + config.padding * 2,
			transform: "translate(" + translateX + "," + translateY + ")"
		};
	},

	/**
	 * Shifts the signature of the diagram connector based on the {@link #getSequenceFlowCaptionPosition} method.
	 * @param {Object} config
	 * @param {ej.Diagram.Connector} config.connector Connector.
	 * @param {SVGTextElement} config.textNode A reference to a text SVG element.
	 * @param {Object} config.offset
	 * @param {Number} config.offset.x Additional X-axis offset.
	 * @param {Number} config.offset.y Additional offset along the Y axis.
	 */
	offsetConnectorLabel: function(config) {
		var captionPosition = this.getSequenceFlowCaptionPosition(config.connector);
		var offset = config.offset;
		captionPosition.x += offset.x;
		captionPosition.y += offset.y;
		ej.datavisualization.Diagram.Util.attr(config.textNode, {
			transform: "translate(" + captionPosition.x + "," + captionPosition.y + ")"
		});
	},

	/**
	 * Align wrap text elevent.
	 * @param {SVGTextElement} text SVG text element.
	 * @param {Object[]} childNodes SVG text child nodes.
	 * @param {Number} height Text height.
	 * @param {String} textAlign Text align.
	 */
	wrapTextAlign: function(text, childNodes, height, textAlign) {
		for (var i = 0; i < childNodes.length; i++) {
			var x = childNodes[i].getComputedTextLength();
			switch (textAlign) {
				case "left":
					x = 0;
					break;
				case "center":
					x = Terrasoft.getIsRtlMode() && !Ext.isIEOrEdge ? x / 2 : -x / 2;
					break;
				case "right":
					x = -x;
					break;
				default:
					break;
			}
			var attr = {"x": Number(x), "dy": height};
			var tspan = childNodes[i];
			ej.datavisualization.Diagram.Util.attr(tspan, attr);
		}
	},

	/**
	 * Setting diagram element position.
	 * @param {Object} config
	 * @param {ej.Diagram.Node} config.node Diagram element.
	 * @param {Object} config.nodeBounds Element size and position.
	 * @param {SVGTextElement} config.text SVG text element reference.
	 * @param {ej.Diagram.Label} config.label Label object.
	 * @param {ej.Diagram.Svg} config.svg Utility Synfusion object.
	 * @param {Object} config.connectorCaptionOffset Connector caption offset.
	 * @param {Number} config.connectorCaptionOffset.x X offset.
	 * @param {Number} config.connectorCaptionOffset.y Y offset.
	 * @param {Number} config.labelBackgroundPadding Element background padding.
	 */
	alignTextOnLabel: function(config) {
		var node = config.node;
		var nodeBounds = config.nodeBounds;
		var text = config.text;
		var label = config.label;
		var svg = config.svg;
		var bounds = label.bBox;
		if (!bounds) {
			bounds = label.bBox = text.getBBox();
		}
		var offset = ej.datavisualization.Diagram.Util._getLabelPosition(label, nodeBounds);
		var point = {
			x: 0,
			y: 0
		};
		var y = 0;
		if (label.verticalAlignment === ej.datavisualization.Diagram.VerticalAlignment.Top) {
			y = offset.y;
		} else if (label.verticalAlignment === ej.datavisualization.Diagram.VerticalAlignment.Center) {
			y = offset.y - bounds.height / 2;
		} else {
			y = offset.y - bounds.height;
		}
		point.y = y;
		switch (label.horizontalAlignment) {
			case ej.datavisualization.Diagram.HorizontalAlignment.Left:
				switch (label.textAlign) {
					case ej.datavisualization.Diagram.TextAlign.Left:
						point.x = offset.x;
						break;
					case ej.datavisualization.Diagram.TextAlign.Center:
						point.x = offset.x + bounds.width / 2;
						break;
					case ej.datavisualization.Diagram.TextAlign.Right:
						point.x = offset.x + bounds.width;
						break;
				}
				break;
			case ej.datavisualization.Diagram.HorizontalAlignment.Center:
				switch (label.textAlign) {
					case ej.datavisualization.Diagram.TextAlign.Left:
						point.x = offset.x - bounds.width / 2;
						break;
					case ej.datavisualization.Diagram.TextAlign.Center:
						point.x = offset.x;
						break;
					case ej.datavisualization.Diagram.TextAlign.Right:
						point.x = offset.x + bounds.width / 2;
						break;
				}
				break;
			case ej.datavisualization.Diagram.HorizontalAlignment.Right:
				switch (label.textAlign) {
					case ej.datavisualization.Diagram.TextAlign.Left:
						point.x = offset.x - bounds.width;
						break;
					case ej.datavisualization.Diagram.TextAlign.Center:
						point.x = offset.x - bounds.width / 2;
						break;
					case ej.datavisualization.Diagram.TextAlign.Right:
						point.x = offset.x;
						break;
				}
				break;
		}
		if (node.segments || node.type === "group") {
			point.x = point.x + nodeBounds.x;
			point.y = point.y + nodeBounds.y;
			offset.x += nodeBounds.x;
			offset.y += nodeBounds.y;
		}
		text.setAttribute("transform", "translate(" + point.x + "," + point.y + "), rotate(" +
			label.rotateAngle + "," + (offset.x - point.x) + "," + (offset.y - point.y) + ")");
		var background = svg.getElementById(node.name + "_" + label.name + "_lblbg");
		if (background) {
			var x = point.x + bounds.x;
			y = point.y;
			var attr = {
				width: bounds.width,
				height: bounds.height,
				transform: "translate(" + x + "," + y + "), rotate(" + label.rotateAngle + "," +
				(offset.x - x) + "," + (offset.y - y) + ")",
				fill: label.text ? label.fillColor : "transparent",
				stroke: label.borderColor,
				"stroke-width": label.borderWidth
			};
			ej.datavisualization.Diagram.Util.attr(background, attr);
		}
		text.setAttribute("data-item-marker", label.text);
		if (label.defaultRendering === true) {
			return;
		}
		if (!background) {
			return;
		}
		var isConnector = (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector);
		if (isConnector) {
			var captionOffset = config.connectorCaptionOffset;
			this.offsetConnectorLabel({
				connector: node,
				textNode: text,
				offset: {
					x: captionOffset.x || 0,
					y: captionOffset.y || 0
				}
			});
		}
		this.updateLabelBackground({
			textNode: text,
			label: label,
			backgroundPadding: config.labelBackgroundPadding || 0,
			labelBackgroundEl: background,
			svg: svg
		});
	},

	/**
	 * Returns labels center coordinates.
	 * @param {SVGTextElement} textNode Text svg element reference
	 * @param {Object} textBBox Element size and pozition.
	 * @return {Object}
	 * @return {Number} return.x X coordinate.
	 * @return {Number} return.y Y coordinate.
	 */
	getTextCenter: function(textNode, textBBox) {
		var textTransformValues = this.svgUtils.getSvgElTranslateValues(textNode, ["e", "f"]);
		return {
			x: textBBox.x + textTransformValues.e + textBBox.width / 2,
			y: textBBox.y + textTransformValues.f + textBBox.height / 2
		};
	},

	/**
	 * Creates a shadow filter to sign the progress statistics for the item. Filter parameters: offset (1; 1), color # 000, transparency 0.4, blur 2.
	 * @param {ej.Diagram.Svg} svg A utility object for working with the SVG library of the TsDiagramModule library.
	 * @return {String} The URL of the filter.
	 */
	getStatisticInfoLabelShadowFilter: function(svg) {
		return this.svgUtils.createShadowFilter(svg, {
			name: "StatisticInfoShadow_filter",
			color: "#000",
			opacity: 0.4,
			offsetX: 1,
			offsetY: 2,
			blur: 2
		});
	}

});
