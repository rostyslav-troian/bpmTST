Terrasoft.configuration.Structures["MarketingEmailSchema"] = {innerHierarchyStack: ["MarketingEmailSchema"]};
/**
 * Schema of marketing email element.
 */
define("MarketingEmailSchema", ["MarketingEmailSchemaResources", "CampaignEnums",
	"CampaignBaseCommunicationSchema"],
		function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.MarketingEmailSchema
	 * Schema of base communication element.
	 */
	Ext.define("Terrasoft.manager.MarketingEmailSchema", {
		extend: "Terrasoft.CampaignBaseCommunicationSchema",
		alternateClassName: "Terrasoft.MarketingEmailSchema",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "5782fbc6-22c0-456c-8b0f-35133afdfc8f",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "MarketingEmail",

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
		editPageSchemaName: "MarketingEmailPage",

		/**
		 * Type of element
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.MARKETING_EMAIL,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.MarketingEmailElement, Terrasoft.Configuration",

		/**
		 * Background fill color.
		 * @protected
		 * @type {String}
		 */
		color: "rgba(148, 148 ,235, 1)",

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#width
		 * @overridden
		 */
		width: 69,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#height
		 * @overridden
		 */
		height: 55,

		/**
		 * Marketing Email as element of campaign.
		 */
		marketingEmailId: null,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
		 * @overridden
		 */
		getConnectionUserHandles: function() {
			return ["CampaignSequenceFlow", "EmailConditionalTransition"];
		},

		/**
		 * Clears linked bulkEmail when element copy is created.
		 * @inheritdoc Terrasoft.manager.CampaignBaseElementSchema#prepareCopy
		 * @overridden
		 */
		prepareCopy: function() {
			var copy = this.callParent(arguments);
			copy.marketingEmailId = null;
			return copy;
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["marketingEmailId"]);
		},

		/**
		 * @inheritdoc CampaignBaseElementSchema#validate
		 * @overridden
		 */
		validate: function() {
			var results = Ext.create("Terrasoft.Collection");
			if (this.getIncomingSequenceFlows().length === 0) {
				results.add(CampaignEnums.CampaignFlowSchemaValidationRules.ASYNC_WITHOUT_INCOMINGS,
					resources.localizableStrings.AsyncWithoutIncomingsMessage);
			}
			return results;
		}
	});
	return Terrasoft.MarketingEmailSchema;
});


