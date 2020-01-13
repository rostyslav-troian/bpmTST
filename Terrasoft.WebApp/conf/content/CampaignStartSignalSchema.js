Terrasoft.configuration.Structures["CampaignStartSignalSchema"] = {innerHierarchyStack: ["CampaignStartSignalSchema"]};
define("CampaignStartSignalSchema", ["CampaignStartSignalSchemaResources",
	"CampaignEnums", "CampaignBaseAudienceSchema", "CampaignElementMixin"],
		function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.CampaignStartSignalSchema
	 * Schema of start signal element.
	 */
	Ext.define("Terrasoft.manager.CampaignStartSignalSchema", {
		extend: "Terrasoft.CampaignBaseAudienceSchema",
		alternateClassName: "Terrasoft.CampaignStartSignalSchema",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "8172280b-a96e-4f57-8091-0f673c040128",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "CampaignStartSignal",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#TitleImage
		 */
		titleImage: resources.localizableImages.TitleImage,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#LargeImage
		 */
		largeImage: resources.localizableImages.LargeImage,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#SmallImage
		 */
		smallImage: resources.localizableImages.SmallImage,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "CampaignStartSignalPage",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.CampaignStartSignalElement, Terrasoft.Configuration",

		/**
		 * Type of element
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.ADD_AUDIENCE,

		/**
		 * Background fill color.
		 * @protected
		 * @type {String}
		 */
		color: "rgba(74, 214, 147, 1)",

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#width
		 * @overridden
		 */
		width: 55,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#height
		 * @overridden
		 */
		height: 55,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#incomingConnectionsLimit
		 * @overridden
		 */
		incomingConnectionsLimit: 0,

		/**
		 * @protected
		 * @type {enum}
		 */
		entitySignal: Terrasoft.EntityChangeType.None,

		/**
		 * Signal object unique Id.
		 * @protected
		 * @type {String}
		 */
		signalEntityId: null,

		/**
		 * @protected
		 * @type {String}
		 */
		signal: null,

		/**
		 * @protected
		 * @type {Boolean}
		 */
		waitingRandomSignal: false,

		/**
		 * @protected
		 * @type {Boolean}
		 */
		waitingEntitySignal: true,

		/**
		 * @protected
		 * @type {Boolean}
		 */
		hasEntityColumnChange: false,

		/**
		 * @protected
		 * @type {Boolean}
		 */
		hasEntityFilters: false,

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
		 * Object unique Id.
		 * @protected
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * @inheritdoc Terrasoft.CampaignBaseAudienceSchema#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.newEntityChangedColumns =
				this._decodeNewEntityChangedColumns(this.newEntityChangedColumns);
		},

		/**
		 * Decode entity columns.
		 * @private
		 * @param {String} stringValue Encoded string value.
		 * @return {Array} Entity columns array.
		 */
		_decodeNewEntityChangedColumns: function(stringValue) {
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
		 * @inheritdoc Terrasoft.ProcessFlowElementSchema#validate
		 * @override
		 */
		validate: function() {
			var results = Ext.create("Terrasoft.Collection");
			if (this.getOutgoingsSequenceFlows().length === 0) {
				results.add(CampaignEnums.CampaignFlowSchemaValidationRules.ADD_AUDIENCE_WITHOUT_OUTGOINGS,
					resources.localizableStrings.AddAudienceWithoutOutgoingsMessage);
			}
			return results;
		},

		/**
		 * @inheritdoc Terrasoft.ProcessFlowElementSchema#getSerializableObject
		 * @override
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			serializableObject.newEntityChangedColumns = JSON.stringify(this.newEntityChangedColumns);
		},

		/**
		 * @inheritdoc Terrasoft.ProcessFlowElementSchema#getSerializableProperties
		 * @override
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["signal", "signalEntityId", "entitySignal", "waitingRandomSignal",
			"waitingEntitySignal", "hasEntityColumnChange", "hasEntityFilters", "entityFilters", "entitySchemaUId"]);
		}
	});
	return Terrasoft.CampaignStartSignalSchema;
});


