/**
 */
Ext.define("Terrasoft.manager.ProcessIntermediateCatchSignalSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessIntermediateCatchSignalSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "5ccad23d-fc4b-4ec7-8051-e3a825b698fc",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.IntermediateCatchSignalCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.IntermediateEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "IntermediateCatchSignal",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaIntermediateCatchSignalEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "intermediateCatchSignal_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "intermediateCatchSignal_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "intermediateCatchSignal_title.svg",

	/**
	 * @protected
	 * @type {Boolean}
	 */
	cancelActivity: true,

	/**
	 * @protected
	 * @type {enum}
	 */
	boundaryItemAlignment: null,

	/**
	 * Signal.
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
	 * @type {Boolean}
	 */
	hasEntityFilters: false,

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
	 * @type {String}
	 */
	entityFilters: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "IntermediateCatchSignalPropertiesPage",

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
		this.parameters = [{
			uId: Terrasoft.generateGUID(),
			name: "RecordId",
			dataValueType: Terrasoft.DataValueType.GUID,
			sourceValue: {
				value: "",
				source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
				displayValue: Ext.create("Terrasoft.LocalizableString", {
					cultureValues: ""
				})
			}
		}];
		this.callParent(arguments);
		this.newEntityChangedColumns =
			this.decodeNewEntityChangedColumns(this.newEntityChangedColumns);
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
		return Ext.Array.push(baseSerializableProperties, ["signal", "entity", "entitySignal", "entitySchemaUId",
			"waitingRandomSignal", "waitingEntitySignal", "hasEntityColumnChange", "hasEntityFilters",
			"entityFilters"]);
	}

});
