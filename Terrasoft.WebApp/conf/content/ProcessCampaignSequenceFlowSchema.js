Terrasoft.configuration.Structures["ProcessCampaignSequenceFlowSchema"] = {innerHierarchyStack: ["ProcessCampaignSequenceFlowSchema"]};
define("ProcessCampaignSequenceFlowSchema", ["ProcessCampaignSequenceFlowSchemaResources",
	"CampaignEnums"], function(resources, CampaignEnums) {
	Ext.define("Terrasoft.manager.ProcessCampaignSequenceFlowSchema", {
		extend: "Terrasoft.ProcessSequenceFlowSchema",
		alternateClassName: "Terrasoft.ProcessCampaignSequenceFlowSchema",

		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.SequenceFlowElement, Terrasoft.Configuration",

		/**
		 * Sequence flow name.
		 * @type {String}
		 */
		connectionUserHandleName: "CampaignSequenceFlow",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "CampaignSequenceFlowPropertiesPage",

		/**
		 * Type of element
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.TRANSITION,

		/**
		 * Hint of element.
		 * @protected
		 * @type {String}
		 */
		hint: null,

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * Is synchronous.
		 * @protected
		 * @type {Boolean}
		 */
		isSynchronous: false,

		/**
		 * Priority of transition.
		 * @protected
		 * @type {number}
		 */
		priority: -1,

		constructor: function() {
			this.callParent(arguments);
			this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			Ext.Array.push(baseSerializableProperties, ["isSynchronous", "priority"]);
			return baseSerializableProperties;
		},

		/**
		 * @inheritdoc Terrasoft.ProcessSequenceFlowSchema#insertFlowElement
		 * @overridden
		 */
		insertFlowElement: function(flowElement) {
			var parentSchema = this.parentSchema;
			var targetFlowElement = this.findItemByUId(this.targetRefUId);
			var flowElementPoint = parentSchema.getItemPosition(flowElement);
			var targetFlowElementPoint = parentSchema.getItemPosition(targetFlowElement);
			var sourcePort = this.getDefSequenceFlowPortName(flowElementPoint, targetFlowElementPoint);
			var newSequenceFlow = Ext.create(this.$className, {
				uId: Terrasoft.generateGUID(),
				name: this.connectionUserHandleName,
				managerItemUId: this.managerItemUId,
				sourceRefUId: flowElement.uId,
				targetRefUId: targetFlowElement.uId,
				showPropertiesWindowOnAdding: false
			});
			newSequenceFlow.sourceSequenceFlowPointLocalPosition = sourcePort;
			newSequenceFlow.targetSequenceFlowPointLocalPosition = this.targetSequenceFlowPointLocalPosition;
			var sourceFlowElement = this.findItemByUId(this.sourceRefUId);
			var sourceFlowElementPoint = parentSchema.getItemPosition(sourceFlowElement);
			var targetPort = this.getDefSequenceFlowPortName(flowElementPoint, sourceFlowElementPoint);
			this.targetRefUId = flowElement.uId;
			this.targetSequenceFlowPointLocalPosition = targetPort;
			return newSequenceFlow;
		},

		/**
		 * Applies specific logic when server saving process is successfully finished.
		 * @protected
		 */
		onAfterSave: function() {
			return;
		},

		/**
		 * Validates campaign schema sequence flow element as a part of campaign flow schema.
		 * @protected
		 */
		validate: Terrasoft.emptyFn
	});
	return Terrasoft.ProcessCampaignSequenceFlowSchema;
});


