Terrasoft.configuration.Structures["ProcessEventConditionalTransitionSchema"] = {innerHierarchyStack: ["ProcessEventConditionalTransitionSchema"]};
define("ProcessEventConditionalTransitionSchema", ["CampaignEnums", "ProcessEventConditionalTransitionSchemaResources",
			"ProcessCampaignConditionalSequenceFlowSchema"],
		function(CampaignEnums) {
			Ext.define("Terrasoft.manager.ProcessEventConditionalTransitionSchema", {
				extend: "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema",
				alternateClassName: "Terrasoft.ProcessEventConditionalTransitionSchema",

				managerItemUId: "5E725C37-9C37-4072-93CC-F8E0939F6130",

				mixins: {
					parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
				},

				/**
				 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
				 * @protected
				 * @overridden
				 */
				typeName: "Terrasoft.Configuration.EventConditionalTransitionElement, Terrasoft.Configuration",

				/**
				 * Sequence flow name.
				 * @type {String}
				 */
				connectionUserHandleName: "EventConditionalTransition",

				/**
				 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
				 */
				editPageSchemaName: "EventConditionalTransitionPropertiesPage",

				/**
				 * Type of element
				 * @type {string}
				 */
				elementType: CampaignEnums.CampaignSchemaElementTypes.CONDITIONAL_TRANSITION,

				/**
				 * Array of recipient email responses
				 * @type {Array[]}
				 */
				eventResponseCollection: null,

				/**
				 * Transition has response condition
				 * @type {Boolean}
				 */
				hasResponseCondition: false,

				/**
				 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
				 * @overridden
				 */
				getSerializableProperties: function() {
					var baseSerializableProperties = this.callParent(arguments);
					Ext.Array.push(baseSerializableProperties, ["eventResponseCollection"]);
					Ext.Array.push(baseSerializableProperties, ["hasResponseCondition"]);
					return baseSerializableProperties;
				}
			});
			return Terrasoft.ProcessEventConditionalTransitionSchema;
		});


