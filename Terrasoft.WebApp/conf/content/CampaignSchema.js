Terrasoft.configuration.Structures["CampaignSchema"] = {innerHierarchyStack: ["CampaignSchema"]};
define("CampaignSchema", ["CampaignSchemaResources", "MarketingEnums", "CampaignEnums", "CampaignElementSchemaManager"],
	function(resources, MarketingEnums, CampaignEnums) {
	Ext.define("Terrasoft.manager.CampaignSchema", {
		extend: "Terrasoft.ProcessSchema",
		alternateClassName: "Terrasoft.CampaignSchema",

		mixins: {
			campaignElementMixin: "Terrasoft.CampaignElementMixin"
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessSchema#elementSchemaManagerName
		 * @overridden
		 */
		elementSchemaManagerName: "CampaignElementSchemaManager",

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchema#contractName
		 * @overridden
		 */
		contractName: "ContractCampaignSchema",

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchema#typeName
		 * @overridden
		 */
		typeName: "Terrasoft.Core.Campaign.CampaignSchema",

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchema#typeCaption
		 * @overridden
		 */
		typeCaption: resources.localizableStrings.TypeCaption,

		/**
		 * Properties page caption.
		 * @protected
		 * @type {string}
		 */
		propertiesPageCaption: resources.localizableStrings.PropertiesPageCaption,

		/**
		 * Unique identifier for campaign.
		 * @protected
		 * @type {Guid}
		 */
		entityId: null,

		/**
		 * Value in minutes for campaign fire period.
		 * @type {Number}
		 */
		defaultCampaignFirePeriod: null,

		/**
		 * Flag to indicate that campaign has critical execution lateness or not.
		 * @protected
		 * @type {Boolean}
		 */
		hasCriticalExecutionLateness: false,

		/**
		 * Critical lateness of campaign execution in minutes.
		 * @protected
		 * @type {Number}
		 */
		criticalExecutionLateness: MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value,

		/**
		 * Code of selected time zone for campaign.
		 * @protected
		 * @type {String}
		 */
		timeZoneCode: null,

		/**
		 * Collection of schema validation results.
		 * @protected
		 * @type {Terrasoft.Collection}
		 */
		validationResult: null,

		/**
		 * Creates default lane set for diagram.
		 * @private
		 * @param {String} schemaUId Campaign schema identifier.
		 * @return {Terrasoft.ProcessLaneSetSchema}
		 */
		_createLaneSet: function(schemaUId) {
			var laneSet = Ext.create("Terrasoft.ProcessLaneSetSchema", {
				uId: Terrasoft.generateGUID(),
				name: "LaneSet1",
				createdInSchemaUId: schemaUId,
				modifiedInSchemaUId: schemaUId
			});
			return laneSet;
		},

		/**
		 * Creates default lane for diagram.
		 * @private
		 * @param {String} schemaUId Campaign schema identifier.
		 * @param {String} containerUId Parent element identifier.
		 * @return {Terrasoft.ProcessLaneSchema}
		 */
		_createLane: function(schemaUId, containerUId) {
			var lane = Ext.create("Terrasoft.ProcessLaneSchema", {
				uId: "bd0ac34a-1036-48d7-b196-79707e0ad01a",
				name: "Lane1",
				containerUId: containerUId,
				createdInSchemaUId: schemaUId,
				modifiedInSchemaUId: schemaUId
			});
			return lane;
		},

		/**
		 * Removes unlinked elements or flows from the incomming flowElements collection.
		 * @private
		 * @param {Terrasoft.Collection} flowElements Flow elements collection.
		 * @return {Boolean} Returns true if any items where removed.
		 */
		_removeUnlinkedItems: function(flowElements) {
			var isRemoved = false;
			Terrasoft.each(flowElements, function(el) {
				if (el instanceof Terrasoft.ProcessSequenceFlowSchema) {
					var sourceElement = flowElements.findByPath("uId", el.sourceRefUId);
					var targetElement = flowElements.findByPath("uId", el.targetRefUId);
					if (!sourceElement || !targetElement) {
						flowElements.removeByKey(el.name);
						isRemoved = true;
					}
					return true;
				}
				var outgoingSequenceFlows = flowElements.filterByFn(function(item) {
					return item instanceof Terrasoft.ProcessSequenceFlowSchema && item.sourceRefUId === el.uId;
				}, this);
				var incommingSequenceFlows = flowElements.filterByFn(function(item) {
					return item instanceof Terrasoft.ProcessSequenceFlowSchema && item.targetRefUId === el.uId;
				}, this);
				var totalFlows = outgoingSequenceFlows.getCount() * incommingSequenceFlows.getCount();
				if (totalFlows === 0) {
					flowElements.removeByKey(el.name);
					isRemoved = true;
				}
			}, this);
			return isRemoved;
		},

		/**
		 * Removes delayed transitions from flowElements collection.
		 * @param {Terrasoft.Collection} flowElements Flow elements collection.
		 * @private
		 */
		_removeTransitionsWithDelayedStart: function(flowElements) {
			var transitionWithDelayedStart = flowElements.findByPath("isDelayedStart", true);
			while (transitionWithDelayedStart) {
				flowElements.removeByKey(transitionWithDelayedStart.name);
				transitionWithDelayedStart = flowElements.findByPath("isDelayedStart", true);
			}
		},

		/**
		 * Validates flow schema. Tries to find a loop without any delayed transitions.
		 * @private
		 */
		_validateFlowSchemaLoops: function() {
			var flowElements = this.flowElements.clone();
			this._removeTransitionsWithDelayedStart(flowElements);
			var needToRemoveUnlinkedElements = true;
			while (needToRemoveUnlinkedElements) {
				needToRemoveUnlinkedElements = this._removeUnlinkedItems(flowElements);
			}
			const minNumberOfElementsForLoop = 4;
			var isSchemaContainsLoop = flowElements.getCount() >= minNumberOfElementsForLoop;
			if (!isSchemaContainsLoop) {
				return;
			}
			this.validationResult.add(CampaignEnums.CampaignFlowSchemaValidationRules.LOOP_WITHOUT_DELAYED_TRANSITIONS,
				resources.localizableStrings.LoopWithoutDelayedTransitionsMessage);
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchema#getEditPageSchemaName
		 * @overridden
		 * @param {Function} callback Callback function.
		 * @param {String} callback.editPageSchemaName Edit page schema name.
		 * @param {Object} scope Callback function scope.
		 */
		getEditPageSchemaName: function(callback, scope) {
			callback.call(scope, "CampaignSchemaPropertiesPage");
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			var baseSerializableProperties = this.callParent(arguments);
			return Ext.Array.push(baseSerializableProperties, ["entityId",
				"defaultCampaignFirePeriod", "hasCriticalExecutionLateness",
				"criticalExecutionLateness", "timeZoneCode"]);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessSchema#getLocalizableValues
		 * @override
		 */
		getLocalizableValues: function(localizableValues) {
			localizableValues[this.uId + ".caption"] = this.getSerializableProperty(this.caption);
			this.flowElements.each(function(flowElement) {
				flowElement.getLocalizableValues(localizableValues);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getTitleImage
		 * @overridden
		 */
		getTitleImage: function() {
			return this.mixins.campaignElementMixin
				.getImage(resources.localizableImages.TitleImage);
		},

		/**
		 * @inheritdoc Terrasoft.manager.ProcessSchema#initLaneSets
		 * @override
		 */
		initLaneSets: function() {
			this.callParent(arguments);
			if (!this.laneSets.collection.length) {
				var laneSet = this._createLaneSet(this.uId);
				var lane = this._createLane(this.uId, laneSet.uId);
				laneSet.lanes.add(lane.name, lane);
				this.laneSets.add(laneSet.name, laneSet);
				this.lanes.add(lane.name, lane);
			}
		},

		/**
		 * Sets default values for required fields for campaign schema instance.
		 * @protected
		 */
		setDefaultValues: function() {
			if (!this.defaultCampaignFirePeriod) {
				this.defaultCampaignFirePeriod = MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value;
			}
			if (!this.timeZoneCode) {
				this.timeZoneCode = "UTC";
			}
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchema#validate
		 * @override
		 */
		validate: function(validationErrorLevel) {
			this.validationResult = Ext.create("Terrasoft.Collection");
			this._validateFlowSchemaLoops();
			return this.callParent(arguments);
		}
	});
	return Terrasoft.CampaignSchema;
});


