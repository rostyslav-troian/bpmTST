Terrasoft.configuration.Structures["ProcessCampaignConditionalSequenceFlowSchema"] = {innerHierarchyStack: ["ProcessCampaignConditionalSequenceFlowSchema"]};
define("ProcessCampaignConditionalSequenceFlowSchema", ["CampaignConnectorManager",
	"CampaignEnums", "ProcessCampaignConditionalSequenceFlowSchemaResources"],
		function(campaignConnectorManager, CampaignEnums, resources) {
	Ext.define("Terrasoft.manager.ProcessCampaignConditionalSequenceFlowSchema", {
		extend: "Terrasoft.ProcessConditionalSequenceFlowSchema",
		alternateClassName: "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema",

		mixins: {
			parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
		},

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
		 * @protected
		 * @overridden
		 */
		typeName: "Terrasoft.Configuration.ConditionalSequenceFlowElement, Terrasoft.Configuration",

		/**
		 * Sequence flow name.
		 * @type {String}
		 */
		connectionUserHandleName: "CampaignConditionalSequenceFlow",

		/**
		 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
		 */
		editPageSchemaName: "CampaignConditionalSequenceFlowPropertiesPage",

		/**
		 * Type of element.
		 * @type {string}
		 */
		elementType: CampaignEnums.CampaignSchemaElementTypes.CONDITIONAL_TRANSITION,

		/**
		 * Hint of element.
		 * @protected
		 * @type {String}
		 */
		hint: null,

		/**
		 * Delay unit property.
		 * @protected
		 * @type {number}
		 */
		delayUnit: 0,

		/**
		 * Property for number of delayed days when DelayUnit is 0 (delay in days),
		 * or number of delayed hours when DelayUnit is 1 (delay in hours).
		 * @protected
		 * @type {number}
		 */
		delayInDays: 0,

		/**
		 * Id of filter
		 * @protected
		 * @type {Guid}
		 */
		filterId: null,

		/**
		 * Serialized json data of filter.
		 * @protected
		 * @type {string}
		 */
		filter: "",

		/**
		 * Is filter visible.
		 * @protected
		 * @type {Boolean}
		 */
		hasFilter: true,

		/**
		 * Is filter changed.
		 * @protected
		 * @type {Boolean}
		 */
		isFilterChanged: false,

		/**
		 * Is start delayed.
		 * @protected
		 * @type {Boolean}
		 */
		isDelayedStart: false,

		/**
		 * Start time property.
		 * @protected
		 * @type {Date}
		 */
		startTime: null,

		/**
		 * Flag to indicate that transition can be executed at specified time.
		 * @protected
		 * @type {Boolean}
		 */
		hasStartTime: true,

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
		priority: 0,

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#caption
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * ConnectorManager to manipulate connectors.
		 * @type {Terrasoft.CampaignConnectorManager}
		 */
		connectorManager: campaignConnectorManager,

		/**
		 * @inheritdoc Terrasoft.ProcessSequenceFlowSchema#constructor
		 */
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
			Ext.Array.push(baseSerializableProperties, ["isSynchronous", "priority", "delayUnit", "delayInDays",
				"startTime", "isDelayedStart", "filterId", "filter", "hasFilter", "isFilterChanged", "hasStartTime"]);
			return baseSerializableProperties;
		},

		/**
		 * Inserts an element into the flow changes the current flow and adds a new one.
		 * @param {Terrasoft.ProcessFlowElementSchema} flowElement Element, which moved to the flow.
		 * @returns {Terrasoft.ProcessSequenceFlowSchema} New flow obtained by dividing the current.
		 */
		insertFlowElement: function(flowElement) {
			var className = this.connectorManager.getConnectorType(flowElement.getTypeInfo().typeName);
			var parentSchema = this.parentSchema;
			var targetFlowElement = this.findItemByUId(this.targetRefUId);
			var flowElementPoint = parentSchema.getItemPosition(flowElement);
			var targetFlowElementPoint = parentSchema.getItemPosition(targetFlowElement);
			var sourcePort = this.getDefSequenceFlowPortName(flowElementPoint, targetFlowElementPoint);
			var newSequenceFlow = Ext.create(className, {
				uId: Terrasoft.generateGUID(),
				name: this.connectionUserHandleName,
				managerItemUId: this.managerItemUId,
				sourceRefUId: flowElement.uId,
				targetRefUId: targetFlowElement.uId,
				showPropertiesWindowOnAdding: false,
				hasFilter: true
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
			this.isFilterChanged = false;
		},

		/**
		 * Validates campaign schema sequence flow element as a part of campaign flow schema.
		 * @protected
		 */
		validate: Terrasoft.emptyFn
	});
	return Terrasoft.ProcessCampaignConditionalSequenceFlowSchema;
});


