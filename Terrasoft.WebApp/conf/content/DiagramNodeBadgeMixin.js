Terrasoft.configuration.Structures["DiagramNodeBadgeMixin"] = {innerHierarchyStack: ["DiagramNodeBadgeMixin"]};
Ext.define("Terrasoft.diagram.DiagramNodeBadgeMixin", {
	alternateClassName: "Terrasoft.DiagramNodeBadgeMixin",

	/**
	 * Removes badges from diagram.
	 * @private
	 * @param {Object} svg Diagram SVG.
	 * @param {Object} parent Parent element.
	 */
	_clearBadges: function (svg, parent) {
		var badges = svg.getElementById(svg.document.id + "Badges_g");
		if (badges) {
			parent.removeChild(badges);
		}
	},

	/**
	 * Renders node badge background.
	 * @private
	 * @param {Object} badge Node badge.
	 * @param {Object} node The diagram node.
	 * @param {Number} width Text width.
	 * @param {Number} height Text height.
	 * @param {Object} svg Diagram SVG.
	 * @return {Object} Badge background.
	 */
	_renderBadgeBackground: function(badge, node, width, height, svg) {
		var radius = badge.size / 2;
		var x = badge.point.x - badge.size / 3;
		var y = badge.point.y + height;
		var attr = {
			"id": node.name + "_" + badge.name + "_bdgbg",
			"width": width + badge.size * 2/3,
			"height": badge.size,
			"fill": badge.fillColor,
			"stroke": badge.borderColor,
			"stroke-width": badge.borderWidth,
			"rx": radius,
			"ry": radius,
			"transform": "translate(" + x + "," + y + ")"
		};
		return svg.rect(attr);
	},

	/**
	 * Renders node badge text.
	 * @private
	 * @param {Object} badge Node badge.
	 * @param {Object} node The diagram node.
	 * @param {Object} svg Diagram SVG.
	 * @return {Object} Badge text.
	 */
	_renderBadgeText: function(badge, node, svg) {
		var attr = {
			"id": node.name + "_" + badge.name,
			"class": "ej-d-badge",
			"font-family": badge.fontFamily,
			"font-size": badge.fontSize,
			"fill": badge.fontColor,
			"text-decoration": badge.textDecoration,
			"dominant-baseline": "middle",
			"pointer-events": "none",
			"transform": "translate(" + badge.point.x + "," + badge.point.y + ")"
		};
		var text = svg.text(attr);
		text.textContent = badge.content;
		return text;
	},

	/**
	 * Renders node badge.
	 * @param {Object} badge Node badge.
	 * @param {Object} node The diagram node.
	 * @param {Object} svg Diagram SVG.
	 * @param {Object} parent Parent element.
	 */
	renderBadge: function(badge, node, svg, parent) {
		var g = svg.g({ "id": svg.document.id + "Badges_g", "class": "badges" });
		parent.appendChild(g);
		var text = this._renderBadgeText(badge, node, svg);
		g.appendChild(text);
		var x = badge.point.x;
		var bounds = text.getBBox();
		var width = Math.round(bounds.width);
		var height = Math.trunc(bounds.y) - 0.5;
		if (badge.side === "left") {
			badge.point.x -= 2 * badge.size + width;
		}
		var bg = this._renderBadgeBackground(badge, node, width, height, svg);
		g.insertBefore(bg, text);
		if (Terrasoft.getIsRtlMode() && !Ext.isIE) {
			badge.point.x += width;
		}
		if (x !== badge.point.x) {
			text.setAttribute("transform", "translate(" + badge.point.x + "," + badge.point.y + ")");
		}
	},

	/**
	 * Rerenders badges for all the nodes.
	 * @param {Object} svg Diagram SVG.
	 * @param {Object} parent Parent element.
	 */
	renderBadges: function(svg, parent) {
		this._clearBadges(svg, parent);
		var badges = this.getBadges();
		if (badges.length) {
			var nodes = this.diagram.nodes();
			Terrasoft.each(nodes, function(node){
				Terrasoft.each(badges, function(badge){
					badge.renderBadge.call(this, badge, node, svg, parent);
				});
			});
		}
	},

	/**
	 * Gets side for badges.
	 * @param {Boolean} isDefaultSide Sign for current default side for badges.
	 * @return {String} Badge side name.
	 */
	getBadgeSide: function(isDefaultSide) {
		if (!Terrasoft.getIsRtlMode() === isDefaultSide) {
			return "right";
		}
		return "left";
	},

	/**
	 * Gets node badge config.
	 * @return {Object} The badge config.
	 */
	getBadgeConfig: function() {
		return {
			name: "",
			content: "",
			fontSize: 13,
			fontFamily: "'Bpmonline Open Sans', serif",
			fontColor: "#fff",
			textDecoration: "none",
			fillColor: "#000",
			borderColor: "#fff",
			borderWidth: 1,
			size: 18,
			scale: 1,
			position: "topcenter",
			side: this.getBadgeSide(true),
			point: { "x": 0, "y": 0 },
			renderBadge: this.renderBadge
		};
	}
});


