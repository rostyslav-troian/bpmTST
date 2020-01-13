/**
 */
Ext.define("Terrasoft.manager.ProcessSubprocessSchema", {
	extend: "Terrasoft.manager.ProcessActivitySchema",
	alternateClassName: "Terrasoft.ProcessSubprocessSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "49eafdbb-a89e-4bdf-a29d-7f17b1670a45",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#width
	 * @override
	 */
	width: 69,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#height
	 * @override
	 */
	height: 55,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetX
	 * @override
	 */
	silverlightOffsetX: 0,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetY
	 * @override
	 */
	silverlightOffsetY: 0,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.SubprocessCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.Subprocess,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "SubProcess",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaSubProcess",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "subprocess_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "subprocess_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "subprocess_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#E6C600",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "SubProcessPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#portsSet
	 * @override
	 */
	portsSet: Terrasoft.diagram.enums.PortsSet.All,

	/**
	 * Process schema identifier.
	 * @type {String}
	 */
	schemaUId: Terrasoft.GUID_EMPTY,

	/**
	 * @inheritdoc Terrasoft.ParametrizedProcessSchemaElement#schemaManagerName
	 */
	schemaManagerName: "ProcessSchemaManager",

	/**
	 * Process elements.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	flowElements: null,

	/**
	 * Artifacts.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	artifacts: null,

	/**
	 * Use last schema version.
	 * @protected
	 * @type {Boolean}
	 */
	useLastSchemaVersion: false,

	/**
	 * Is container.
	 * @type {Boolean}
	 */
	isContainer: true,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#nodeType
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Subprocess,

	triggeredByEvent: false,

	//endregion

	//region Constructors: Public

	constructor: function() {
		this.callParent(arguments);
		this.initFlowElements();
	},

	//endregion

	//region Methods: Private

	/**
	 * Initialization children.
	 * @private
	 */
	initFlowElements: function() {
		var flowElementsMetaData = this.flowElements || [];
		var parentSchema = this.parentSchema;
		if (parentSchema) {
			flowElementsMetaData.forEach(function(flowElementMetaData) {
				flowElementMetaData = Terrasoft.deepClone(flowElementMetaData);
				flowElementMetaData.parentSchema = parentSchema;
				var flowElement = parentSchema.createItemInstance(flowElementMetaData);
				flowElement.containerUId = this.uId;
				flowElement.parent = this.name;
				flowElement.visible = this.isExpanded;
				parentSchema.flowElements.add(flowElement.name, flowElement);
			}, this);
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		this.setSerializableFlowElements(serializableObject);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["triggeredByEvent", "schemaUId", "useLastSchemaVersion",
			"artifacts"]);
	},

	/**
	 * Sets FlowElements to serializableObject.
	 * @private
	 * @param {Object} serializableObject Serializable object.
	 */
	setSerializableFlowElements: function(serializableObject) {
		var flowElements = this.parentSchema.flowElements;
		if (!flowElements || flowElements.isEmpty()) {
			return;
		}
		serializableObject.flowElements = [];
		flowElements.each(function(flowElement) {
			if (flowElement.containerUId === this.uId) {
				var flowElementMetaData = this.getSerializableProperty(flowElement);
				serializableObject.flowElements.push(flowElementMetaData);
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getDiagramConfig
	 * @override
	 */
	getDiagramConfig: function() {
		var config = this.callParent(arguments);
		config.isExpanded = this.isExpanded;
		config.isContainer = this.isContainer;
		return config;
	}

	//endregion

});
