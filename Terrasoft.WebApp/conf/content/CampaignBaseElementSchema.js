Terrasoft.configuration.Structures["CampaignBaseElementSchema"] = {innerHierarchyStack: ["CampaignBaseElementSchema"]};
define("CampaignBaseElementSchema", ["ext-base", "terrasoft", "CampaignBaseElementSchemaResources",
	"CampaignElementMixin"], function(Ext, Terrasoft, resources) {
	/**
	 * @class Terrasoft.manager.CampaignBaseElementSchema
	 * Schema of base campaign element.
	 */
	Ext.define("Terrasoft.manager.CampaignBaseElementSchema", {
		extend: "Terrasoft.ProcessFlowElementSchema",
		alternateClassName: "Terrasoft.CampaignBaseElementSchema",

		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement",
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		//region Properties: Protected

		managerItemUId: "5880fbc6-22c0-456c-8b0f-35133afdfc8f",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "CampaignElement",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.BaseAudienceCaption,

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
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetX
		 * @overridden
		 */
		silverlightOffsetX: 0,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetY
		 * @overridden
		 */
		silverlightOffsetY: 0,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#captionWidth
		 * @overridden
		 */
		captionWidth: 80,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: null,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Core.Campaign.CampaignSchemaElement",

		/**
		 * Background fill color.
		 * @protected
		 * @type {String}
		 */
		fillColor: "",

		/**
		 * Count of campaign participants which have completed the step.
		 * @protected
		 * @type {Number}
		 */
		completedCount: 0,

		/**
		 * Count of campaign participants which have not completed the step.
		 * @protected
		 * @type {Number}
		 */
		nonCompletedCount: 0,

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
		 * @overridden
		 */
		getConnectionUserHandles: function() {
			return ["CampaignSequenceFlow", "CampaignConditionalSequenceFlow"];
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getLocalizableValues
		 * @overridden
		 */
		getLocalizableValues: function(localizableValues) {
			this.callParent(arguments);
			this.mixins.parametrizedProcessSchemaElement.getParametersLocalizableValues.call(this, localizableValues);
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getSmallImage
		 * @overridden
		 */
		getSmallImage: function() {
			return this.mixins.campaignElementMixin
				.getImage(this.smallImage);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getLargeImage
		 * @overridden
		 */
		getLargeImage: function() {
			this.initLargeImage();
			return this.mixins.campaignElementMixin
				.getImage(this.largeImage);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getTitleImage
		 * @overridden
		 */
		getTitleImage: function() {
			this.initTitleImage();
			return this.mixins.campaignElementMixin
				.getImage(this.titleImage);
		},

		/**
		 * Applies specific logic to init title image.
		 * @protected
		 */
		initTitleImage: Terrasoft.emptyFn,

		/**
		 * Applies specific logic to init large image.
		 * @protected
		 */
		initLargeImage: Terrasoft.emptyFn,

		/**
		 * Applies specific logic when copy process is running.
		 * Default behavior is to return existing schema.
		 * @returns {CampaignBaseElementSchema} Element copy.
		 * @protected
		 */
		prepareCopy: function() {
			return this;
		},

		/**
		 * Applies specific logic when server saving process is successfully finished.
		 * @protected
		 */
		onAfterSave: Terrasoft.emptyFn,

		/**
		 * Validates campaign schema element as a part of campaign flow schema.
		 * @protected
		 * @return {Terrasoft.Collection} Validation result.
		 */
		validate: Terrasoft.emptyFn

		//endregion
	});
	return Terrasoft.CampaignBaseElementSchema;
});


