/**
  * Tool for editing the connections in the chart diagram.
  */
Ext.define("Terrasoft.diagram.userHandles.NodeSelectionTool", {

	alternateClassName: "Terrasoft.NodeSelectionTool",

	/**
  * Returns the handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	getNodeSelectionTool: function() {
		if (this.nodeSelectionHandle) {
			return this.nodeSelectionHandle;
		}
		var nodeSelectionHandle = this.nodeSelectionHandle = ej.Diagram.UserHandle({
			name: "NodeSelectionHandle",
			constraint: Terrasoft.diagram.ToolsConstraint.NodeSelectionTool,
			position: {x: 0, y: 0},
			enableMultiSelection: false,
			cornerRadius: 13,
			defStrokeWidth: 7,
			eventStrokeWidth: 9
		});
		var CustomMoveTool = this.customMoveTool(ej.Diagram.MoveTool);
		nodeSelectionHandle.renderUserHandle = this.nodeSelectionRenderUserHandle;
		nodeSelectionHandle.upateHandle = this.nodeSelectionUpateHandle;
		nodeSelectionHandle.tool = new CustomMoveTool(null);
		return nodeSelectionHandle;
	},

	/**
  * The handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	customMoveTool: function(base) {
		function tool(diagram) {
			base.call(this, diagram);
		}

		ej.Diagram.extend(tool, base);
		tool.prototype._findNodeUnderMouse = function(evt, skip) {
			var obj = base.prototype._findNodeUnderMouse.call(this, evt, skip);
			if (!obj && !Ext.isEmpty(this.diagram.selectionList)) {
				obj = this.diagram.selectionList[0];
			}
			return obj;
		};
		return tool;
	},

	nodeSelectionRenderUserHandle: function(handle, node, svg, scale, parent, diagram) {
		var width = node.width + 7;
		var height = node.height + 7;
		handle.fillColor = "none";
		handle.pathColor = "none";
		var g = svg.g({
			id: svg.document.id + "userHandle_g",
			"class": "userHandle"
		});
		parent.appendChild(g);
		var position = this._getHandlePosition(handle, node, scale);
		var shape = this._getHandleShape(handle, position.x * scale, position.y * scale);
		shape.fill = "none";
		shape.stroke = diagram.selectionColor;
		shape.opacity = 0.4;
		shape["stroke-width"] = handle.defStrokeWidth;
		shape["class"] += " nodeSelectionHandle";
		if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Event) {
			shape.cx = position.x * scale;
			shape.cy = position.y * scale;
			shape.r = width / 2;
			shape["stroke-width"] = handle.eventStrokeWidth;
			g.appendChild(svg.circle(shape));
		} else {
			if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
				var bounds = ej.Diagram.Util.bounds(node);
				var size = Math.sqrt(2 * Math.pow((bounds.height / 2), 2)) + handle.defStrokeWidth;
				var rotate = svg.g({
					id: handle.name + "userHandle_rotate_g",
					transform: Ext.String.format("translate({0} {1}) rotate(45)",
						bounds.center.x, bounds.center.y - (bounds.height / 2) - 5)
				});
				shape.x = 0;
				shape.y = 0;
				shape.height = size;
				shape.width = size;
				g.appendChild(rotate);
				rotate.appendChild(svg.rect(shape));
			} else {
				shape.width = width;
				shape.height = height;
				shape.x = position.x * scale - (width / 2);
				shape.y = position.y * scale - (height / 2);
				shape.rx = handle.cornerRadius;
				shape.ry = handle.cornerRadius;
				g.appendChild(svg.rect(shape));
			}
		}
	},

	nodeSelectionUpateHandle: function(handle, node, svg, isDragging, scale) {
		if (node.sourceNode || node.sourcePoint) {
			this._updateHandle(handle, node, svg, isDragging, scale);
			return;
		}
		var tool = svg.getElementById(handle.name + "_shape");
		if (!isDragging && handle.visible) {
			var width = node.width + 7;
			var height = node.height + 7;
			var position = this._getHandlePosition(handle, node, scale);
			var shape = {
				"id": handle.name + "_shape"
			};
			if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Event) {
				shape.cx = position.x * scale;
				shape.cy = position.y * scale;
				svg.circle(shape);
			} else {
				if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
					var bounds = ej.Diagram.Util.bounds(node);
					var size = Math.sqrt(2 * Math.pow((bounds.height / 2), 2)) + handle.defStrokeWidth;
					shape.x = 0;
					shape.y = 0;
					shape.height = size;
					shape.width = size;
					svg.g({
						id: handle.name + "userHandle_rotate_g",
						transform: Ext.String.format("translate({0} {1}) rotate(45)",
							bounds.center.x, bounds.center.y - (bounds.height / 2) - 5)
					});
				} else {
					shape.width = width;
					shape.height = height;
					shape.x = position.x * scale - (width / 2);
					shape.y = position.y * scale - (height / 2);
				}
				svg.rect(shape);
			}
			if (tool && handle.visible) {
				tool.style.display = "block";
			}
		} else {
			if (tool) {
				tool.style.display = "none";
			}
		}
	}

});
