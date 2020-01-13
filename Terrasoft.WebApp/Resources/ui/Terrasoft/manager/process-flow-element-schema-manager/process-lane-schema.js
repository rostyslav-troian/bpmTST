/**
 */
Ext.define("Terrasoft.manager.ProcessLaneSchema", {
	extend: "Terrasoft.ProcessBaseElementSchema",
	alternateClassName: "Terrasoft.ProcessLaneSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "abcd74b9-5912-414b-82ac-f1aa4dcd554e",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaLane",

	/**
	 * Parent element.
	 * @type {String}
	 */
	parent: null,

	/**
	 * Artifacts.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	artifacts: null,

	/**
	 * UserContexts/
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	userContexts: null,

	/**
	 * Track dimensions.
	 * Not used, because the track automatically calculates its size.
	 * Needed for compatibility with the old designer.
	 * @protected
	 * @type {Object}
	 */
	size: null,

	/**
	 * Technical property for compatibility with the old designer.
	 * @protected
	 * @type {Object[]}
	 */
	flowElementRefs: null,

	/**
	 * The ID of the pool of tracks in which the track is located.
	 * @protected
	 * @type {String}
	 */
	laneSetUId: null,

	/**
	 * Element type in the diagram
	 * @protected
	 * @type {Terrasoft.ProcessSchemaDiagram.UserHandlesConstraint}
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Lane,

	/**
	 * Flag, of the status of the track display.
	 * @protected
	 * @type {Boolean}
	 */
	isExpanded: true,

	/**
	 * The name of the image resource manager.
	 * @protected
	 * @type {String}
	 */
	resourceManagerName: "Terrasoft.Nui",

	/**
	 * A flag that the process item is a container
	 * @type {Boolean}
	 */
	isContainer: true,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getDiagramConfig
	 * @override
	 */
	getDiagramConfig: function(config) {
		var nodeConfig = this.callParent(arguments);
		var laneLineName = nodeConfig.name + "_line";
		Ext.apply(nodeConfig, config, {
			type: "group",
			lineName: laneLineName,
			nodeType: Terrasoft.diagram.UserHandlesConstraint.Lane,
			constraints: ej.Diagram.NodeConstraints.None,
			offsetX: 0,
			offsetY: this.position ? this.position.Y : 0,
			children: [
				{
					name: laneLineName
				}
			]
		});
		return nodeConfig;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["artifacts", "laneSetUId", "isExpanded", "userContext"]);
	}

	//endregion

});
