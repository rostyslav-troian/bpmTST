Terrasoft.configuration.Structures["CampaignConnectorManager"] = {innerHierarchyStack: ["CampaignConnectorManager"]};
define("CampaignConnectorManager", [], function() {
	/**
	 * class Terrasoft.CampaignConnectorManager to manage connector items.
	 */
	Ext.define("Terrasoft.CampaignConnectorManager", {
		/**
		 * Property to create only one instance of class.
		 * @type {Boolean}
		 */
		singleton: false,

		/**
		 * Collection to map elements' types and transitions' types.
		 */
		connectorTypesMappingCollection: null,

		/**
		 * Constructor for campaign connector manager class.
		 */
		constructor: function() {
			this.initMappingCollection();
		},

		/**
		 * Initializes default transition types' mapping.
		 * @protected
		 * @return {void}
		 */
		initMappingCollection: function() {
			var collection = Ext.create("Terrasoft.Collection");
			collection.add("MarketingEmailSchema", "Terrasoft.ProcessEmailConditionalTransitionSchema");
			collection.add("CampaignEventSchema", "Terrasoft.ProcessEventConditionalTransitionSchema");
			collection.add("CampaignLandingSchema", "Terrasoft.ProcessLandingConditionalTransitionSchema");
			this.connectorTypesMappingCollection = collection;
		},

		/**
		 * Creates new conditional transition of type we needed.
		 * @public
		 * @param {Terrasoft.TransitionSchema} transition Current transition.
		 * @param {Terrasoft.CampaignBaseElementSchema} sourceItem Source element for transition.
		 * @param {Terrasoft.CampaignBaseElementSchema} targetItem Target element for transition.
		 * @return {Terrasoft.TransitionSchema} Actual transition.
		 */
		createTransition: function(transition, sourceItem, targetItem) {
			var connectorType = this.getConnectorType(sourceItem.getTypeInfo().typeName);
			var newElement = this.createElement(connectorType, sourceItem, targetItem);
			this.beforeChange(transition, connectorType, sourceItem, targetItem);
			this.fillProperties(transition, newElement);
			return newElement;
		},

		/**
		 * Method that contains processing logic before transition is changing.
		 * @protected
		 * @param {Terrasoft.TransitionSchema} transition Current transition.
		 * @param {String} connectorType Full type name of connector to create.
		 * @param {Terrasoft.CampaignBaseElementSchema} sourceItem Source element for transition.
		 * @param {Terrasoft.CampaignBaseElementSchema} targetItem Target element for transition.
		 * @return {void}
		 */
		beforeChange: function(transition, connectorType, sourceItem, targetItem) {
			var connectorTypeName = connectorType.split(".")[1];
			if (transition.getTypeInfo().typeName === connectorTypeName &&
					sourceItem.getTypeInfo().typeName === "MarketingEmailSchema") {
				transition.hyperlinkId = null;
			}
			this.additionalBeforeChange(transition, sourceItem, targetItem);
		},

		/**
		 * Method that contains additional processing logic before transition is changing.
		 * @protected
		 */
		additionalBeforeChange: Terrasoft.emptyFn,

		/**
		 * Creates new transition of type we needed.
		 * @param {string} connectorType - type of transition.
		 * @param {CampaignBaseElementSchema} sourceItem - source element for transition.
		 * @param {CampaignBaseElementSchema} targetItem - target element for transition.
		 * @return {TransitionSchema} transition of specific type.
		 */
		createElement: function(connectorType, sourceItem, targetItem) {
			var sourceItemName = sourceItem.name;
			var sequenceFlow = Ext.create(connectorType, {
				name: connectorType,
				sourceNode: sourceItemName,
				sourceRefUId: sourceItem.uId,
				targetRefUId: targetItem.uId,
				sourceSequenceFlowPointLocalPosition: "1;0",
				targetPoint: targetItem.position,
				showPropertiesWindowOnAdding: true,
				isValidateExecuted: false
			});
			if (sequenceFlow.flowType === Terrasoft.ProcessSchemaEditSequenceFlowType.CONDITIONAL) {
				sequenceFlow.isValid = false;
				sequenceFlow.hasFilter = true;
			}
			sequenceFlow.uId = Terrasoft.generateGUID();
			return sequenceFlow;
		},

		/**
		 * Returns correct connector type.
		 * @param {string} sourceType Type of source element for transition.
		 * @return {string} name of connector's type we needed.
		 */
		getConnectorType: function(sourceType) {
			if (this.connectorTypesMappingCollection.contains(sourceType)) {
				return this.connectorTypesMappingCollection.get(sourceType);
			}
			return "Terrasoft.ProcessCampaignConditionalSequenceFlowSchema";
		},

		/**
		 * Fills base properties for ConditionalTransitionElements and its children.
		 * @protected
		 * @param {Terrasoft.CampaignBaseElementSchema} prevElement Previous transition element.
		 * @param {Terrasoft.CampaignBaseElementSchema} newElement New transition element.
		 * @return {void}
		 */
		fillProperties: function(prevElement, newElement) {
			newElement.caption.cultureValues = prevElement.caption.cultureValues;
			newElement.delayInDays =
				this._setValue(prevElement.isDelayedStart && prevElement.delayInDays, 0);
			newElement.delayUnit =
				this._setValue(prevElement.isDelayedStart && prevElement.delayUnit, 0);
			newElement.filterId = this._setValue(prevElement.filterId, null);
			newElement.filter = this._setValue(prevElement.filter, null);
			newElement.isDelayedStart = this._setValue(prevElement.isDelayedStart, false);
			newElement.startTime = this._setValue(prevElement.startTime, "");
			newElement.isSynchronous = this._setValue(prevElement.isSynchronous, false);
			if (newElement.getTypeInfo().typeName === "ProcessEmailConditionalTransitionSchema") {
				newElement.emailResponseId = this._setValue(prevElement.emailResponseId, null);
				newElement.isResponseBasedStart = this._setValue(prevElement.isResponseBasedStart, false);
				newElement.hyperlinkId = this._setValue(prevElement.hyperlinkId, null);
			}
			if (newElement.getTypeInfo().typeName === "ProcessEventConditionalTransitionSchema") {
				newElement.hasResponseCondition = this._setValue(prevElement.hasResponseCondition, false);
				newElement.eventResponseCollection = this._setValue(prevElement.eventResponseCollection, null);
			}
			if (newElement.getTypeInfo().typeName === "ProcessLandingConditionalTransitionSchema") {
				newElement.stepCompletedCondition = this._setValue(prevElement.stepCompletedCondition, 0);
			}
			this.fillAdditionalProperties(prevElement, newElement);
		},

		/**
		 * Method that contains additional logic to fill specific properties of new transition.
		 * @protected
		 */
		fillAdditionalProperties: Terrasoft.emptyFn,

		/**
		 * Returns value of property
		 * If value does not exist returns default value.
		 * @private
		 * @return {Boolean} Property value.
		 */
		_setValue: function(value, defaultValue) {
			return value ? value : defaultValue;
		}
	});
	return Ext.create("Terrasoft.CampaignConnectorManager");
});


