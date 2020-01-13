Terrasoft.configuration.Structures["CampaignAnalyticsDiagram"] = {innerHierarchyStack: ["CampaignAnalyticsDiagram"]};
define("CampaignAnalyticsDiagram", ["process-schema-diagram", "DiagramNodeBadgeMixin"], function() {
	Ext.define("Terrasoft.configuration.CampaignAnalyticsDiagram", {
		alternateClassName: "Terrasoft.CampaignAnalyticsDiagram",
		extend: "Terrasoft.ProcessSchemaDiagram",

		showCompletedCount: false,
		showNonCompletedCount: false,
		showProcessingCount: false,
		showErrorCount: false,
		showSuspendedCount: false,

		mixins: {
			nodeBadge: "Terrasoft.DiagramNodeBadgeMixin"
		},

		/**
		 * Converts number to formatted string.
		 * @param {Number} num The number value.
		 * @return {String} The formatted number.
		 */
		_formatNumber: function(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		},

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDiagram#init
		 * @override
		 */
		init: function() {
			this.readOnly = true;
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Diagram#getUserHandles
		 * @override
		 */
		getUserHandles: function() {
			return [];
		},

		/**
		 * Gets noncompleted participants count badge.
		 * @return {Object} The noncompleted participants badge.
		 */
		getNonCompletedParticipantsBadge: function() {
			var self = this;
			var config = this.getBadgeConfig();
			var badgeInst = Ext.apply(config, {
				name: "nonCompletedBadge",
				fillColor: "#00aeef",
				side: self.getBadgeSide(false),
			});
			badgeInst.renderBadge = function(badge, node, svg, parent) {
				if (!node.nonCompletedCount) {
					return;
				}
				var svgContext = ej.Diagram.SvgContext;
				var badgePosition = svgContext._getHandlePosition(badge, node, badge.scale);
				badgePosition.x += badge.size;
				badgePosition.y += badge.size;
				badge.point = badgePosition;
				badge.content = self._formatNumber(node.nonCompletedCount);
				self.mixins.nodeBadge.renderBadge(badge, node, svg, parent);
			};
			return badgeInst;
		},

		/**
		 * Gets completed participants count badge.
		 * @return {Object} The completed participants badge.
		 */
		getCompletedParticipantsBadge: function() {
			var self = this;
			var config = this.getBadgeConfig();
			var badgeInst = Ext.apply(config, {
				name: "completedBadge",
				fillColor: "#8ecb60"
			});
			badgeInst.renderBadge = function(badge, node, svg, parent) {
				if (!node.completedCount) {
					return;
				}
				var svgContext = ej.Diagram.SvgContext;
				var badgePosition = svgContext._getHandlePosition(badge, node, badge.scale);
				badgePosition.x += badge.size;
				badgePosition.y += badge.size;
				badge.point = badgePosition;
				badge.content = self._formatNumber(node.completedCount);
				self.mixins.nodeBadge.renderBadge(badge, node, svg, parent);
			};
			return badgeInst;
		},

		getErrorParticipantsBadge: function() {
			var self = this;
			var config = this.getBadgeConfig();
			var badgeInst = Ext.apply(config, {
				name: "errorBadge",
				fillColor: "#ec757b",
				margin: 1
			});
			badgeInst.renderBadge = function(badge, node, svg, parent) {
				if (!node.errorCount) {
					return;
				}
				var svgContext = ej.Diagram.SvgContext;
				var badgePosition = svgContext._getHandlePosition(badge, node, badge.scale);
				badgePosition.x += badge.size;
				if (!node.completedCount || !self.showCompletedCount) {
					badgePosition.y += badge.size;
				} else {
					badgePosition.y -= badge.margin;
				}
				badge.point = badgePosition;
				badge.content = self._formatNumber(node.errorCount);
				self.mixins.nodeBadge.renderBadge(badge, node, svg, parent);
			};
			return badgeInst;
		},

		getProcessingParticipantsBadge: function() {
			var self = this;
			var config = this.getBadgeConfig();
			var badgeInst = Ext.apply(config, {
				name: "processingBadge",
				fillColor: "#f2c933",
				side: self.getBadgeSide(false),
				margin: 1
			});
			badgeInst.renderBadge = function(badge, node, svg, parent) {
				if (!node.processingCount) {
					return;
				}
				var svgContext = ej.Diagram.SvgContext;
				var badgePosition = svgContext._getHandlePosition(badge, node, badge.scale);
				badgePosition.x += badge.size;
				badgePosition.y += badge.size;
				if (node.nonCompletedCount && self.showNonCompletedCount) {
					badgePosition.y -= badge.size + badge.margin;
				}
				badge.point = badgePosition;
				badge.content = self._formatNumber(node.processingCount);
				self.mixins.nodeBadge.renderBadge(badge, node, svg, parent);
			};
			return badgeInst;
		},

		getSuspendedParticipantsBadge: function() {
			var self = this;
			var config = this.getBadgeConfig();
			var badgeInst = Ext.apply(config, {
				name: "suspendedBadge",
				fillColor: "#9575cd",
				margin: 1
			});
			badgeInst.renderBadge = function(badge, node, svg, parent) {
				if (!node.suspendedCount) {
					return;
				}
				var svgContext = ej.Diagram.SvgContext;
				var badgePosition = svgContext._getHandlePosition(badge, node, badge.scale);
				badgePosition.x += badge.size;
				badgePosition.y += badge.size;
				if (node.completedCount && self.showCompletedCount) {
					badgePosition.y -= badge.size + badge.margin;
				}
				if (node.errorCount && self.showErrorCount) {
					badgePosition.y -= badge.size + badge.margin;
				}
				badge.point = badgePosition;
				badge.content = self._formatNumber(node.suspendedCount);
				self.mixins.nodeBadge.renderBadge(badge, node, svg, parent);
			};
			return badgeInst;
		},

		/**
		 * Gets badges for diagram node.
		 * @return {Array} The array of badges.
		 */
		getBadges: function() {
			var badges = [];
			if (this.showNonCompletedCount) {
				badges.push(this.getNonCompletedParticipantsBadge());
			}
			if (this.showCompletedCount) {
				badges.push(this.getCompletedParticipantsBadge());
			}
			if (this.showErrorCount) {
				badges.push(this.getErrorParticipantsBadge());
			}
			if (this.showProcessingCount) {
				badges.push(this.getProcessingParticipantsBadge());
			}
			if (this.showSuspendedCount) {
				badges.push(this.getSuspendedParticipantsBadge());
			}
			return badges;
		},

		/**
		 * Updates analytics badges on the diagram.
		 * @param {Array} analyticsData The array of analytics items.
		 */
		updateBadges: function(analyticsData) {
			var diagram = this.getInstance();
			var nodes = diagram.nodes();
			nodes.map(function(node) {
				var found = analyticsData.find(function(data) {
					return data.itemId === node.tag;
				});
				if (found) {
					node.nonCompletedCount = found.nonCompletedParticipantsCount;
					node.completedCount = found.completedParticipantsCount;
					node.errorCount = found.errorParticipantsCount;
					node.processingCount = found.processingParticipantsCount;
					node.suspendedCount = found.suspendedParticipantsCount;
				} else {
					node.nonCompletedCount = 0;
					node.completedCount = 0;
					node.errorCount = 0;
					node.processingCount = 0;
					node.suspendedCount = 0;
				}
			});
			this.renderBadges(diagram._svg, diagram._adornerLayer);
		},

		/**
		 * @inheritdoc Terrasoft.Diagram#customizeRenderNode
		 * @override
		 */
		customizeRenderNode: function() {
			var self = this;
			var svgContext = ej.Diagram.SvgContext;
			var baseRenderNode = svgContext.renderNode;
			svgContext.renderNode = function(node, svg) {
				baseRenderNode.apply(this, arguments);
				var dataItemMarker = self.getNodeDataItemMarker(node);
				svg.g({
					"id": node.name + "_shape",
					"data-item-marker": dataItemMarker
				});
			};
			svgContext._renderImage = function(node, svg, g) {
				var attr = {
					id: node.name + "_shape",
					width: node.width,
					height: node.height,
					opacity: node.opacity,
					preserveAspectRatio: "none",
					filter: this._renderFilter(node, svg)
				};
				var shape = svg.image(attr);
				shape.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", node.shape.src);
				g.appendChild(shape);
			};
		},

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDiagram#disableDiagramFeatures
		 * @override
		 */
		disableDiagramFeatures: function() {
			this.callParent(arguments);
			var svgContext = ej.Diagram.SvgContext;
			svgContext._renderEndPointHandle = Ext.emptyFn;
			svgContext._renderResizeHandle = Ext.emptyFn;
			svgContext._renderPorts = Ext.emptyFn;
		},

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDiagram#changeNodeConnectorsSelection
		 * @override
		 */
		changeNodeConnectorsSelection: Ext.emptyFn

	});
	return Terrasoft.CampaignSchemaDiagram;
});


