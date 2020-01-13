Terrasoft.configuration.Structures["ProcessLandingConditionalTransitionSchema"] = {innerHierarchyStack: ["ProcessLandingConditionalTransitionSchema"]};
define("ProcessLandingConditionalTransitionSchema", ["CampaignEnums",
		"ProcessLandingConditionalTransitionSchemaResources", "ProcessCampaignConditionalSequenceFlowSchema"],
	function(CampaignEnums) {
	Ext.define("Terrasoft.manager.ProcessLandingConditionalTransitionSchema", {
		extend: "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema",
		alternateClassName: "Terrasoft.ProcessLandingConditionalTransitionSchema",

		managerItemUId: "1F41D061-F3AB-4BE3-9AF7-84BF59D05BD8",

		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.LandingConditionalTransitionElement, Terrasoft.Configuration",

		/**
		 * Sequence flow name.
		 * @type {String}
		 */
		connectionUserHandleName: "LandingConditionalTransition",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "LandingConditionalTransitionPropertiesPage",

		/**
		 * Type of element
		 * @type {String}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.CONDITIONAL_TRANSITION,

		/**
		 * Transition can transfer participants with any status condition
		 * @type {Integer}
		 */
		stepCompletedCondition: 0,

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			Ext.Array.push(baseSerializableProperties, ["stepCompletedCondition"]);
			return baseSerializableProperties;
		}
	});
	return Terrasoft.ProcessLandingConditionalTransitionSchema;
});


