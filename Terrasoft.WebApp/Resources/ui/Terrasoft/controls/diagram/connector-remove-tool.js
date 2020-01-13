/**
  * Tool for removing the flow in the control chart diagram.
  */
Ext.define("Terrasoft.diagram.userHandles.ConnectorRemoveTool", {

	alternateClassName: "Terrasoft.ConnectorRemoveTool",

	/**
  * Returns the handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	getConnectorRemoveTool: function() {
		if (this.connectorRemoveHandle) {
			return this.connectorRemoveHandle;
		}
		var connectorRemoveHandle = this.connectorRemoveHandle = ej.Diagram.UserHandle({
			name: "ConnectorRemoveHandle",
			constraint: Terrasoft.diagram.ToolsConstraint.ConnectorRemoveTool,
			position: {
				x: 0,
				y: 0
			},
			enableMultiSelection: false,
			singleAction: true,
			XLINK_NAMESPACE: "http://www.w3.org/1999/xlink",
			XLINK_ATTRIBUTE: "xlink:href",
			TOOL_SIZE: 21,
			renderToolFilter: this.renderToolFilter,
			renderUserHandle: this.connectorRemoveRenderUserHandle,
			upateHandle: Ext.emptyFn,
			getImageUrl: this.getImageUrl
		});
		var ConnectorRemoveTool = this.connectorRemoveTool(ej.Diagram.PhaseTool);
		connectorRemoveHandle.tool = new ConnectorRemoveTool(connectorRemoveHandle.name);
		return connectorRemoveHandle;
	},

	/**
  * The handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	connectorRemoveTool: function(base) {
		function tool(name) {
			base.call(this, name);
		}
		ej.Diagram.extend(tool, base);
		tool.prototype.mouseup = function() {
			var diagram = this.diagram;
			diagram.remove(diagram.selectionList[0]);
		};
		return tool;
	},

	connectorRemoveRenderUserHandle: function(handle, node, svg, scale, parent) {
		var g = svg.g({"id": svg.document.id + "userHandle_g", "class": "userHandle"});
		parent.appendChild(g);
		var offset = 5;
		var zeroPoint = ej.Diagram.Point(0, 0);
		var currentPoint = Terrasoft.isEqual(handle.tool.currentPoint, zeroPoint)
			? node.segments[0].points[0]
			: handle.tool.currentPoint;
		var imageConf = {
			id: handle.name + "_shape",
			width: handle.TOOL_SIZE,
			height: handle.TOOL_SIZE,
			x: currentPoint.x - handle.TOOL_SIZE - offset,
			y: currentPoint.y - handle.TOOL_SIZE - offset,
			"class": "userHandle connectorRemoveHandle",
			preserveAspectRatio: "none"
		};
		imageConf.filter = handle.renderToolFilter({
			name: "ConnectorRemoveHandle",
			constraints: ej.Diagram.NodeConstraints.Shadow,
			width: handle.TOOL_SIZE,
			height: handle.TOOL_SIZE
		}, svg);
		var image = svg.image(imageConf);
		var imageUrl = handle.getImageUrl("removeTool.svg");
		image.setAttributeNS(handle.XLINK_NAMESPACE, handle.XLINK_ATTRIBUTE, imageUrl);
		g.appendChild(image);
		handle.tool.currentPoint = zeroPoint;
	}

});
