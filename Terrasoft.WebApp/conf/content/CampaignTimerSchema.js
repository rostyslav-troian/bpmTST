Terrasoft.configuration.Structures["CampaignTimerSchema"] = {innerHierarchyStack: ["CampaignTimerSchema"]};
 /**
 * Schema of campaign timer element.
 */
define("CampaignTimerSchema", ["CampaignTimerSchemaResources", "CampaignEnums",
		"CampaignBaseElementSchema"],
	function(resources, CampaignEnums) {
	/**
	 * @class Terrasoft.manager.CampaignTimerSchema
	 * Schema of campaign timer element.
	 */
	Ext.define("Terrasoft.manager.CampaignTimerSchema", {
		extend: "Terrasoft.CampaignBaseElementSchema",
		alternateClassName: "Terrasoft.CampaignTimerSchema",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * UId of current manager item.
		 */
		managerItemUId: "9782fbc6-22c0-456c-8b0f-35133afdfc8f",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#name
		 */
		name: "CampaignTimer",

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
		 */
		group: "Intermediates",

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
		editPageSchemaName: "CampaignTimerPage",

		/**
		 * Type of element
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.CAMPAIGN_TIMER,

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.CampaignTimerElement, Terrasoft.Configuration",

		/**
		 * Background fill color.
		 * @protected
		 * @type {String}
		 */

		color: "rgba(247, 149, 82, 1)",

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
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#nodeType
		 * @overridden
		 */
		nodeType: Terrasoft.diagram.UserHandlesConstraint.Event,

		/**
		 * Timer expression type property.
		 * @protected
		 * @type {number}
		 */
		expressionType: Terrasoft.TimerExpressionTypes.Empty,

		/**
		 * Cron expression property.
		 * @protected
		 * @type {string}
		 */
		cronExpression: null,

		/**
		 * Sign for use custom time zone.
		 * @protected
		 * @type {Boolean}
		 */
		useCustomTimeZone: false,

		/**
		 * Time zone offset property.
		 * @protected
		 * @type {TimeZoneInfo}
		 */
		timeZoneOffset: null,

		/**
		 * Sign for use exact time and not period.
		 * @protected
		 * @type {Boolean}
		 */
		useExactTime: false,

		/**
		 * Exact time property.
		 * @protected
		 * @type {Time}
		 */
		exactTime: null,

		/**
		 * Period start time property.
		 * @protected
		 * @type {Time}
		 */
		periodStartTime: null,

		/**
		 * Period end time property.
		 * @protected
		 * @type {Time}
		 */
		periodEndTime: null,

		/**
		 * Validity start time property.
		 * @protected
		 * @type {DateTime}
		 */
		startDateTime: null,

		/**
		 * Sign for use start date time.
		 * @protected
		 * @type {Boolean}
		 */
		useStartDateTime: false,

		/**
		 * Validity end time property.
		 * @protected
		 * @type {DateTime}
		 */
		endDateTime: null,

		/**
		 * Sign for use end date time.
		 * @protected
		 * @type {Boolean}
		 */
		useEndDateTime: false,

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			if (!Terrasoft.CampaignElementGroups.Items.contains("Intermediates")) {
				Terrasoft.CampaignElementGroups.Items.add("Intermediates", {
					name: "Intermediates",
					caption: resources.localizableStrings.IntermediatesGroupCaption
				});
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["useExactTime", "exactTime", "periodStartTime",
				"periodEndTime", "useStartDateTime", "startDateTime", "useEndDateTime", "endDateTime",
				"timeZoneOffset", "useCustomTimeZone", "expressionType", "cronExpression"]);
		}
	});
	return Terrasoft.CampaignTimerSchema;
});


