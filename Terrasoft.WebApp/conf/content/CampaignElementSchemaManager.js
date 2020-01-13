Terrasoft.configuration.Structures["CampaignElementSchemaManager"] = {innerHierarchyStack: ["CampaignElementSchemaManager"]};
define("CampaignElementSchemaManager", ["CampaignBaseAudienceSchema", "ProcessCampaignSequenceFlowSchema",
		"ProcessCampaignConditionalSequenceFlowSchema", "ProcessEmailConditionalTransitionSchema",
		"ProcessLandingConditionalTransitionSchema", "ProcessEventConditionalTransitionSchema", "MarketingEmailSchema",
		"AddCampaignParticipantSchema", "ExitFromCampaignSchema", "CampaignLandingSchema", "CampaignEventSchema",
		"CampaignTimerSchema", "CampaignStartSignalSchema", "CampaignAddObjectSchema", "CampaignUpdateObjectSchema"],
	function() {
		Ext.define("Terrasoft.manager.CampaignElementSchemaManager", {
			extend: "Terrasoft.BaseProcessFlowElementSchemaManager",
			alternateClassName: "Terrasoft.CampaignElementSchemaManager",
			singleton: true,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
			 * @protected
			 * @overridden
			 */
			managerName: "CampaignElementSchemaManager",

			/**
			 * Returns if element can be copied.
			 * @param {Terrasoft.ProcessBaseElementSchema} element Element to be copied.
			 * @return {Boolean} Returns true if element can be copied.
			 */
			allowElementCopy: function(element) {
				return !!(element && element.managerItemUId);
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#initialize
			 * @protected
			 * @overridden
			 */
			initialize: function() {
				this._initCoreElementClassNames();
				this.callParent(arguments);
			},

			/**
			 * Fills coreElementClassNames property
			 * with default Campaign designer element class names.
			 * @private
			 */
			_initCoreElementClassNames: function() {
				this.coreElementClassNames = _.union(this.coreElementClassNames, [
					{
						itemType: "Terrasoft.ProcessLaneSetSchema"
					},
					{
						itemType: "Terrasoft.ProcessCampaignSequenceFlowSchema"
					},
					{
						itemType: "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema"
					},
					{
						itemType: "Terrasoft.ProcessEmailConditionalTransitionSchema"
					},
					{
						itemType: "Terrasoft.ProcessEventConditionalTransitionSchema"
					},
					{
						itemType: "Terrasoft.ProcessLandingConditionalTransitionSchema"
					},
					{
						itemType: "Terrasoft.MarketingEmailSchema"
					},
					{
						itemType: "Terrasoft.AddCampaignParticipantSchema"
					},
					{
						itemType: "Terrasoft.CampaignLandingSchema"
					},
					{
						itemType: "Terrasoft.CampaignEventSchema"
					},
					{
						itemType: "Terrasoft.ExitFromCampaignSchema"
					},
					{
						itemType: "Terrasoft.CampaignStartSignalSchema"
					}
				]);
				if (Terrasoft.Features.getIsEnabled("CampaignAddModifyElements")) {
					this.coreElementClassNames.push({
						itemType: "Terrasoft.CampaignAddObjectSchema"
					});
					this.coreElementClassNames.push({
						itemType: "Terrasoft.CampaignUpdateObjectSchema"
					});
				}
				this.coreElementClassNames.push({
					itemType: "Terrasoft.CampaignTimerSchema"
				});
			}
		});
	}
);


