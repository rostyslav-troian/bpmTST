/**
 */
Ext.define("Terrasoft.manager.ProcessSchemaManager", {
	extend: "Terrasoft.manager.BaseProcessSchemaManager",
	alternateClassName: "Terrasoft.ProcessSchemaManager",
	singleton: true,

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseManager#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.ProcessSchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @override
	 */
	managerName: "ProcessSchemaManager",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#schemaManagerServiceName
	 * @protected
	 * @override
	 */
	schemaManagerServiceName: "ServiceModel/ProcessSchemaManagerService.svc",

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaManager#ProcessSchemaManagerService
	 * @override
	 */
	serviceName: "ProcessSchemaManagerService",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#outdatedEventName
	 * @override
	 */
	outdatedEventName: "ProcessSchema_Outdated",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#useNotification
	 * @override
	 */
	useNotification: true,

	// endregion

	// region Properties: Public

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#defSchemaUId
	 * @override
	 */
	defSchemaUId: "bb4d6607-026b-4b27-b640-8f5c77c1e89d",

	//endregion

	// region Methods: Private

	/**
	 * Adds default elements into the schema.
	 * @private
	 * @param {Terrasoft.ProcessSchema} schema Process schema.
	 */
	addDefSchemaElements: function(schema) {
		var schemaUId = schema.uId;
		var laneSet = this.createLaneSet(schemaUId);
		var lane = this.createLane(schemaUId, laneSet.uId);
		var startEvent = this.createStartEvent(schemaUId, lane.uId);
		var terminateEvent = this.createTerminateEvent(schemaUId, lane.uId);
		var sequenceFlow = this.createSequenceFlow(schemaUId);
		sequenceFlow.sourceRefUId = startEvent.uId;
		sequenceFlow.targetRefUId =terminateEvent.uId;
		schema.add(laneSet);
		schema.add(lane);
		schema.add(startEvent);
		schema.add(terminateEvent);
		schema.add(sequenceFlow);
	},

	/**
	 * Creates process lane set.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 * @return {Terrasoft.ProcessLaneSetSchema}
	 */
	createLaneSet: function(createdInSchemaUId) {
		var laneSet = Ext.create("Terrasoft.ProcessLaneSetSchema", {
			uId: Terrasoft.generateGUID(),
			name: "LaneSet1",
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
		laneSet.setLocalizableStringPropertyValue("caption", "LaneSet 1");
		return laneSet;
	},

	/**
	 * Creates process lane.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 * @param {String} containerUId Parent element identifier.
	 */
	createLane: function(createdInSchemaUId, containerUId) {
		var lane = Ext.create("Terrasoft.ProcessLaneSchema", {
			uId: Terrasoft.generateGUID(),
			name: "Lane1",
			containerUId: containerUId,
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
		lane.setLocalizableStringPropertyValue("caption", "Lane 1");
		return lane;
	},

	/**
	 * Creates process start event.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 * @param {String} containerUId Parent element identifier.
	 */
	createStartEvent: function(createdInSchemaUId, containerUId) {
		return Ext.create("Terrasoft.ProcessStartEventSchema", {
			uId: Terrasoft.generateGUID(),
			name: "StartEvent1",
			position: "50;184",
			containerUId: containerUId,
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
	},

	/**
	 * Creates process terminate event.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 * @param {String} containerUId Parent element identifier.
	 */
	createTerminateEvent: function(createdInSchemaUId, containerUId) {
		return Ext.create("Terrasoft.ProcessTerminateEventSchema", {
			uId: Terrasoft.generateGUID(),
			name: "TerminateEvent1",
			position: "600;184",
			containerUId: containerUId,
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
	},

	/**
	 * Creates process sequence flow.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 */
	createSequenceFlow: function(createdInSchemaUId) {
		return Ext.create("Terrasoft.ProcessSequenceFlowSchema", {
			uId: Terrasoft.generateGUID(),
			name: "SequenceFlow1",
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#createSchema
	 * @override
	 */
	createSchema: function() {
		var schema = this.callParent(arguments);
		schema.name = "";
		schema.parentSchemaUId = this.defSchemaUId;
		schema.isCreatedInSvg = true;
		schema.isInterpretable = true;
		schema.serializeToDB = true;
		schema.tag = "Business Process";
		this.addDefSchemaElements(schema);
		return schema;
	},

	/**
	 * Queries new schema instance by UId, not need manager initialization.
	 * @override
	 * @param {String} schemaUId Schema identifier.
	 * @param {Function} callback Callback function.
	 * @param {Function} callback.itemInstance Item instance.
	 * @param {Object} scope Execution context.
	 */
	forceGetInstanceByUId: function(schemaUId, callback, scope) {
		var item = this.createManagerItem({uId: schemaUId});
		item.forceGetInstance(function(itemInstance) {
			callback.call(scope, itemInstance);
		}, this);
	},

	/**
	 * Queries new sub process schema instance by UId.
	 * @override
	 * @param {String} schemaUId Schema identifier.
	 * @param {Function} callback Callback function.
	 * @param {Terrasoft.ProcessSchema} callback.schema Schema instance.
	 * @param {Object} scope Execution context.
	 */
	getSubProcessSchemaInstanceByUId: function(schemaUId, callback, scope) {
		if (Terrasoft.isEmpty(schemaUId)) {
			Ext.callback(callback, scope, [null]);
			return;
		}
		var itemConfig = {uId: schemaUId};
		var item = this.createManagerItem(itemConfig);
		var config = {convertLocalizableStringToParameter: false};
		item.forceGetInstanceByConfig(config, callback, scope);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaManager#getCanUseProcessVersions
	 * @override
	 * @return {Boolean} True
	 */
	getCanUseProcessVersions: function() {
		return true;
	}

	// endregion

});
