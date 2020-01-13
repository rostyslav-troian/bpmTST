/**
 */
Ext.define("Terrasoft.manager.ProcessStartSignalSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessStartSignalSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "1129e72f-0e8c-445a-b2ea-463517e86395",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.StartSignalCaption,

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaStartSignalEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.StartEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "StartSignal",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "startSignal_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	largeImageName: "startSignal_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "startSignal_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#8ECB60",

	/**
	 * @protected
	 * @type {Boolean}
	 */
	isInterrupting: true,

	/**
	 * @protected
	 * @type {String}
	 */
	signal: null,

	/**
	 * @protected
	 * @type {Boolean}
	 */
	waitingRandomSignal: true,

	/**
	 * @protected
	 * @type {Boolean}
	 */
	waitingEntitySignal: false,

	/**
	 * @protected
	 * @type {enum}
	 */
	entitySignal: Terrasoft.EntityChangeType.None,

	/**
	 * @protected
	 * @type {String}
	 */
	entity: null,

	/**
	 * @protected
	 * @type {Boolean}
	 */
	hasEntityColumnChange: false,

	/**
	 * @protected
	 * @type {Object}
	 */
	newEntityChangedColumns: null,

	/**
	 * @protected
	 * @type {Boolean}
	 */
	hasEntityFilters: false,

	/**
	 * @protected
	 * @type {String}
	 */
	entityFilters: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "StartSignalPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#emptyDiagramCaption
	 * @override
	 */
	emptyDiagramCaption: false,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		var resources = Terrasoft.Resources.ProcessSchemaDesigner.Parameters;
		this.parameters = [{
			uId: Terrasoft.generateGUID(),
			name: "RecordId",
			caption: new Terrasoft.LocalizableString(resources.RecordIdCaption),
			dataValueType: Terrasoft.DataValueType.GUID,
			sourceValue: {
				value: "",
				source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
				displayValue: new Terrasoft.LocalizableString("")
			}
		}];
		this.callParent(arguments);
		this.newEntityChangedColumns = this.decodeNewEntityChangedColumns(this.newEntityChangedColumns);
	},

	//endregion

	//region Methods: Private

	/**
	 * Decode entity columns.
	 * @private
	 * @param {String} stringValue Encoded string value.
	 * @return {Array} Entity columns array.
	 */
	decodeNewEntityChangedColumns: function(stringValue) {
		var newEntityChangedColumns = [];
		if (Ext.isEmpty(stringValue)) {
			return newEntityChangedColumns;
		}
		var newEntityChangedColumnsRawValue = Terrasoft.decode(stringValue);
		if (Ext.isArray(newEntityChangedColumnsRawValue)) {
			return newEntityChangedColumnsRawValue;
		}
		Terrasoft.each(newEntityChangedColumnsRawValue, function(propertyValue, propertyName) {
			if (propertyName === "$values" && Ext.isArray(propertyValue)) {
				newEntityChangedColumns = propertyValue;
				return true;
			}
		});
		return newEntityChangedColumns;
	},

	/**
	 * JSON encode entity columns for serializable object.
	 * @private
	 * @param {Object} serializableObject Serializable object.
	 */
	stringifyNewEntityChangedColumns: function(serializableObject) {
		serializableObject.newEntityChangedColumns = JSON.stringify(this.newEntityChangedColumns);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		this.stringifyNewEntityChangedColumns(serializableObject);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["signal", "entity", "entitySignal", "waitingRandomSignal",
			"waitingEntitySignal", "hasEntityColumnChange", "hasEntityFilters", "entityFilters"]);
	}

	//endregion

});
