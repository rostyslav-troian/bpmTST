/* jshint bitwise:false */
/**
 * The class implements the display of the process elements on the diagram.
 */
Ext.define("Terrasoft.ProcessDesigner.ProcessSchemaDiagram5X", {
	alternateClassName: "Terrasoft.ProcessSchemaDiagram5X",
	extend: "Terrasoft.ProcessSchemaDiagram",

	constructor: function() {
		this.callParent(arguments);
		this.mixins.nodeRemoveTool.nodeRemoveTool = this.nodeRemoveTool;
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#customizeDisConnect
	 * @override
	 */
	customizeDisConnect: function() {
		//Method overrides Diagram logic for version 5x.
		//DisConnect logic is not comparable with 5x.
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#customizeRemoveConnector
	 * @override
	 */
	customizeRemoveConnector: function() {
		//Method overrides Diagram logic for version 5x.
		//RemoveConnector logic is not comparable with 5x.
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDiagram#customizeDiagram
	 * @override
	 */
	customizeDiagram: function() {
		this.disabledKeys.push(Ext.EventObject.F2);
		this.callParent(arguments);
		ej.Diagram.prototype._removeConnector = Ext.emptyFn;
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#onRemoveItem
	 * @override
	 */
	onRemoveItem: function(item) {
		if (this.isDiagramLoaded()) {
			var element = this.getElementById(item.name);
			var diagram = this.getInstance();
			diagram.remove(element);
		}
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDiagram#removeSelectedItem
	 * @override
	 */
	removeSelectedItems: function() {
		var selectedItem = this.diagram.selectionList[0];
		if (selectedItem && selectedItem.type !== "pseudoGroup") {
			this.fireEvent("itemsRemoving", {
				itemNameList: [selectedItem.name]
			});
		}
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDiagram#startEditCaption
	 * @override
	 */
	startEditCaption: function(node) {
		this.model.postElementDoubleClick(node);
	},

	/**
	 * @inheritdoc Terrasoft.Diagram#getSelectedItem
	 * @override
	 */
	getSelectedItem: function() {
		var diagram = this.getInstance();
		var newElement = this.model.newElement;
		var node = (newElement) ? diagram.findNode(newElement.name) : diagram.selectionList[0];
		return node;
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDiagram#setSelection
	 * @override
	 */
	setSelection: function(node) {
		if (node.nodeType === Terrasoft.diagram.UserHandlesConstraint.Connector) {
			var diagram = this.getInstance();
			diagram.tools.ConnectorRemoveHandle.currentPoint =
				this.utils.labelUtils.getSequenceFlowCaptionPosition(node);
		}
		this.callParent(arguments);
	}
});
