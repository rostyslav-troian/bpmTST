/**
 */
Ext.define("Terrasoft.manager.ProcessLaneSetSchema", {
	extend: "Terrasoft.ProcessBaseElementSchema",
	alternateClassName: "Terrasoft.ProcessLaneSetSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "11a47caf-a0d5-41fa-a274-a0b11f77447a",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @protected
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaLaneSet",

	/**
  * A flag of the status of the pool display.
  * @protected
  * @type {Boolean}
  */
	isExpanded: true,

	/**
  * Element type in the diagram
  * @protected
  * @type {Terrasoft.ProcessSchemaDiagram.UserHandlesConstraint}
  */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.LaneSet,

	/**
  * The direction of the tracks in the pool.
  * @protected
  * @type {Terrasoft.process.enums.ProcessSchemaPoolDirection}
  */
	direction: Terrasoft.process.enums.ProcessSchemaPoolDirection.HORIZONTAL,

	/**
  * Pool size. Not used, because the track automatically calculates its size.
  * Needed for compatibility with the old designer.
  * @protected
  * @type {Object}
  */
	size: null,

	/**
  * The name of the image resource manager.
  * @protected
  * @type {String}
  */
	resourceManagerName: "Terrasoft.Nui",

	/**
  * Pool tracks.
  * @protected
  * @type {Terrasoft.Collection}
  */
	lanes: null,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.initLanes(this.lanes || []);
	},

	//endregion

	//region Methods: Private

	/**
  * Initializes the pool tracks.
  * @param {Object[]} lanesMetaData Configurable track object
  */
	initLanes: function(lanesMetaData) {
		var lanes = this.lanes =  Ext.create("Terrasoft.Collection");
		lanesMetaData.forEach(function(laneMetaData) {
			var lane = Terrasoft.ProcessFlowElementSchemaManager.createInstance(laneMetaData.managerItemUId,
				laneMetaData);
			lanes.add(lane.name, lane);
		}, this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#loadLocalizableValues
	 * @protected
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		if (!localizableValues) {
			return;
		}
		var lanesLocalizableValues = localizableValues.Lanes || {};
		this.lanes.each(function(lane) {
			var laneLocalizableValues = lanesLocalizableValues[lane.name];
			lane.loadLocalizableValues(laneLocalizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#loadLocalizableValuesByUIds
	 * @override
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		this.callParent(arguments);
		if (!localizableValues) {
			return;
		}
		this.lanes.each(function(lane) {
			lane.loadLocalizableValuesByUIds(localizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#getLocalizableValues
	 * @protected
	 * @override
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.lanes.each(function(lane) {
			lane.getLocalizableValues(localizableValues);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		var lanes = serializableObject.lanes = [];
		this.lanes.each(function(lane) {
			var laneMetaData = this.getSerializableProperty(lane);
			lanes.push(laneMetaData);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["direction", "isExpanded"]);
	}

	//endregion

});
