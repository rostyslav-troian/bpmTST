Terrasoft.configuration.Structures["AddCampaignParticipantSchema"] = {innerHierarchyStack: ["AddCampaignParticipantSchema"]};
define("AddCampaignParticipantSchema", ["AddCampaignParticipantSchemaResources",
	"CampaignEnums", "CampaignBaseAudienceSchema", "CampaignElementMixin"],
		function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.AddCampaignParticipantSchema
	 * Schema of base audience element.
	 */
	Ext.define("Terrasoft.manager.AddCampaignParticipantSchema", {
		extend: "Terrasoft.CampaignBaseAudienceSchema",
		alternateClassName: "Terrasoft.AddCampaignParticipantSchema",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "bbd2372a-66c0-4e4c-9f38-3aeae2e78c66",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "AddAudience",

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
		editPageSchemaName: "AddCampaignParticipantPage",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.AddCampaignParticipantElement, Terrasoft.Configuration",

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
		 * FolderId from which participants should be added into campaign.
		 */
		folderId: null,

		/**
		 * Flag to indicate that element can do recurring participants add.
		 */
		isRecurring: false,

		/**
		 * Number of days before participant will be added next time.
		 */
		recurringFrequencyInDays: null,

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["folderId", "recurringFrequencyInDays", "isRecurring"]);
		},

		/**
		 * @inheritDoc Terrasoft.CampaignBaseElementSchema#initTitleImage
		 * @override
		 */
		initTitleImage: function() {
			this.titleImage = this.isRecurring
				? resources.localizableImages.TitleIsRecurringImage
				: resources.localizableImages.TitleImage;
		},

		/**
		 * @inheritDoc Terrasoft.CampaignBaseElementSchema#initLargeImage
		 * @override
		 */
		initLargeImage: function() {
			this.largeImage = this.isRecurring
				? resources.localizableImages.LargeIsRecurringImage
				: resources.localizableImages.LargeImage;
		},

		/**
		 * @inheritdoc CampaignBaseElementSchema#validate
		 * @overridden
		 */
		validate: function() {
			var results = Ext.create("Terrasoft.Collection");
			if (this.getOutgoingsSequenceFlows().length === 0) {
				results.add(CampaignEnums.CampaignFlowSchemaValidationRules.ADD_AUDIENCE_WITHOUT_OUTGOINGS,
					resources.localizableStrings.AddAudienceWithoutOutgoingsMessage);
			}
			return results;
		}
	});
	return Terrasoft.AddCampaignAudienceSchema;
});


