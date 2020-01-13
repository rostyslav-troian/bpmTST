/**
  * Tool for removing elements in the diagram chart.
  */
Ext.define("Terrasoft.diagram.userHandles.NodeRemoveTool", {

	alternateClassName: "Terrasoft.NodeRemoveTool",

	/**
  * Returns the handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	getNodeRemoveTool: function() {
		if (this.nodeRemoveHandle) {
			return this.nodeRemoveHandle;
		}
		var nodeRemoveHandle = this.nodeRemoveHandle = ej.Diagram.UserHandle({
			XLINK_NAMESPACE: "http://www.w3.org/1999/xlink",
			XLINK_ATTRIBUTE: "xlink:href",
			TOOL_SIZE: 21,
			NODE_BORDER_WIDTH: 7,
			name: "NodeRemoveHandle",
			constraint: Terrasoft.diagram.ToolsConstraint.NodeRemoveTool,
			position: {x: 0, y: 0},
			enableMultiSelection: false,
			renderUserHandle: this.nodeRemoveRenderUserHandle,
			renderToolFilter: this.renderToolFilter,
			upateHandle: this.nodeRemoveUpateHandle,
			getImageUrl: this.getImageUrl
		});
		var RemoveTool = this.nodeRemoveTool(ej.Diagram.PhaseTool);
		nodeRemoveHandle.tool = new RemoveTool(null);
		return nodeRemoveHandle;
	},

	/**
  * The handler for displaying the selected nodes.
  * @return {Object} Instance of the handler.
  */
	nodeRemoveTool: function(base) {
		function tool(diagram) {
			base.call(this, diagram);
		}
		ej.Diagram.extend(tool, base);
		var self = this;
		tool.prototype.mouseup = function() {
			var diagram = self.diagram;
			var selectedItem = diagram.selectionList[0];
			self.items.removeByKey(selectedItem.name);
		};
		return tool;
	},

	nodeRemoveRenderUserHandle: function(handle, node, svg, scale, parent) {
		var g = svg.g({"id": svg.document.id + "userHandle_g", "class": "userHandle"});
		parent.appendChild(g);
		var nodeBounds = ej.Diagram.Util.bounds(node);
		if (!this.filter) {
			this.filter = handle.renderToolFilter({
				name: "NodeRemoveTool",
				constraints: ej.Diagram.NodeConstraints.Shadow,
				width: handle.TOOL_SIZE,
				height: handle.TOOL_SIZE
			}, svg);
		}
		var imageConf = {
			id: handle.name + "_shape",
			width: handle.TOOL_SIZE,
			height: handle.TOOL_SIZE,
			x: nodeBounds.x - handle.NODE_BORDER_WIDTH / 2 - (handle.TOOL_SIZE / 2),
			y: nodeBounds.y - handle.NODE_BORDER_WIDTH / 2 - (handle.TOOL_SIZE / 2),
			"class": "userHandle nodeRemoveHandle",
			preserveAspectRatio: "none",
			"data-item-marker": handle.name,
			filter: this.filter
		};
		if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
			imageConf.x = imageConf.x + (nodeBounds.width / 4);
			imageConf.y = imageConf.y + (nodeBounds.height / 4);
		}
		var image = svg.image(imageConf);
		var imageUrl = handle.getImageUrl("removeTool.svg");
		image.setAttributeNS(handle.XLINK_NAMESPACE, handle.XLINK_ATTRIBUTE, imageUrl);
		g.appendChild(image);
	},

	nodeRemoveUpateHandle: function(handle, node, svg, isDragging) {
		if (!isDragging && handle.visible) {
			if (svg.getElementById(handle.name + "_shape") && handle.visible) {
				svg.getElementById(handle.name + "_shape").style.display = "block";
			}
			var nodeBounds = ej.Diagram.Util.bounds(node);
			var imageConf = {
				id: handle.name + "_shape",
				x: nodeBounds.x - handle.NODE_BORDER_WIDTH / 2 - (handle.TOOL_SIZE / 2),
				y: nodeBounds.y - handle.NODE_BORDER_WIDTH / 2 - (handle.TOOL_SIZE / 2)
			};
			if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Gateway) {
				imageConf.x = imageConf.x + (nodeBounds.width / 4);
				imageConf.y = imageConf.y + (nodeBounds.height / 4);
			}
			svg.image(imageConf);
		}
		else {
			if (svg.getElementById(handle.name + "_shape")) {
				svg.getElementById(handle.name + "_shape").style.display = "none";
			}
		}
	}

});
