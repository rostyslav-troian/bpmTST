Terrasoft.configuration.Structures["ExitFromCampaignSchema"] = {innerHierarchyStack: ["ExitFromCampaignSchema"]};
define("ExitFromCampaignSchema", ["ExitFromCampaignSchemaResources",
		"CampaignEnums", "CampaignBaseAudienceSchema"],
	function(resources, CampaignEnums) {
		/**
		 * @class Terrasoft.manager.ExitFromCampaignSchema
		 * Schema of base audience element.
		 */
		Ext.define("Terrasoft.manager.ExitFromCampaignSchema", {
			extend: "Terrasoft.CampaignBaseAudienceSchema",
			alternateClassName: "Terrasoft.ExitFromCampaignSchema",

			mixins: {
				campaignElementMixin: "Terrasoft.CampaignElementMixin"
			},

			/**
			 * UId of current manager item.
			 */
			managerItemUId: "b2700fee-9034-4bdf-88a9-fb3ddff92f4f",

			/**
			 * @inheritdoc Terrasoft.manager.BaseSchema#name
			 */
			name: "ExitFromCampaign",

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
			editPageSchemaName: "ExitFromCampaignPage",

			/**
			 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
			 * @protected
			 * @overridden
			 */
			typeName: "Terrasoft.Configuration.ExitFromCampaignElement, Terrasoft.Configuration",

			/**
			 * Type of element
			 * @type {string}
			 */
			elementType: CampaignEnums.CampaignSchemaElementTypes.EXIT_AUDIENCE,

			/**
			 * Background fill color.
			 * @protected
			 * @type {String}
			 */
			color: "rgba(236, 117, 123, 1)",

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
			 * FolderId from which participants should be added into campaign.
			 */
			folderId: null,

			/**
			 * Flag to indicate that element is campaign goal or not.
			 */
			isCampaignGoal: false,

			/**
			 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#outgoingConnectionsLimit
			 * @overridden
			 */
			outgoingConnectionsLimit: 0,

			/**
			 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
			 * @overridden
			 */
			getConnectionUserHandles: function() {
				return [];
			},

			/**
			 * @inheritDoc Terrasoft.CampaignBaseElementSchema#initTitleImage
			 * @override
			 */
			initTitleImage: function() {
				if (this.isCampaignGoal && !Ext.isEmpty(this.folderId)) {
					this.titleImage = resources.localizableImages.TitleIsGoalWithFolderImage;
				} else if (this.isCampaignGoal) {
					this.titleImage = resources.localizableImages.TitleIsGoalImage;
				} else if (!Ext.isEmpty(this.folderId)) {
					this.titleImage = resources.localizableImages.TitleWithFolderImage;
				} else {
					this.titleImage = resources.localizableImages.TitleImage;
				}
			},

			/**
			 * @inheritDoc Terrasoft.CampaignBaseElementSchema#initLargeImage
			 * @override
			 */
			initLargeImage: function() {
				if (this.isCampaignGoal && !Ext.isEmpty(this.folderId)) {
					this.largeImage = resources.localizableImages.LargeIsGoalWithFolderImage;
				} else if (this.isCampaignGoal) {
					this.largeImage = resources.localizableImages.LargeIsGoalImage;
				} else if (!Ext.isEmpty(this.folderId)) {
					this.largeImage = resources.localizableImages.LargeWithFolderImage;
				} else {
					this.largeImage = resources.localizableImages.LargeImage;
				}
			},

			/**
			 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
			 * @overridden
			 */
			getSerializableProperties: function() {
				var baseSerializableProperties = this.callParent(arguments);
				return Ext.Array.push(baseSerializableProperties, ["folderId", "isCampaignGoal"]);
			}
		});
		return Terrasoft.ExitFromCampaignSchema;
	});


