/**
 */
Ext.define("Terrasoft.manager.EmbeddedProcessSchemaManager", {
	extend: "Terrasoft.manager.BaseProcessSchemaManager",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaManager",
	singleton: true,

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseManager#itemClassName
	 * @override
	 */
	itemClassName: "Terrasoft.EmbeddedProcessSchemaManagerItem",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @override
	 */
	managerName: "EmbeddedProcessSchemaManager",

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
	serviceName: "EmbeddedProcessSchemaManagerService",

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
		schema.add(laneSet);
		schema.add(lane);
	},

	/**
	 * Creates process lane set.
	 * @param {String} createdInSchemaUId Process schema identifier.
	 * @return {Terrasoft.ProcessLaneSetSchema}
	 */
	createLaneSet: function(createdInSchemaUId) {
		var laneSet = Ext.create("Terrasoft.ProcessLaneSetSchema", {
			uId: Terrasoft.generateGUID(),
			name: 'LaneSet_',
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
		laneSet.name += Terrasoft.formatGUID(laneSet.uId, "N");
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
			name: 'Lane_',
			containerUId: containerUId,
			createdInSchemaUId: createdInSchemaUId,
			modifiedInSchemaUId: createdInSchemaUId
		});
		lane.name += Terrasoft.formatGUID(lane.uId, "N");
		lane.setLocalizableStringPropertyValue("caption", "Lane 1");
		return lane;
	},

	// endregion

	// region Methods: Public

	/**
	 * Initializes schema.
	 * @param schema
	 */
	initSchema: function(schema) {
		if (!schema.hasOwnLaneSet()) {
			this.addDefSchemaElements(schema);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#createSchema
	 * @override
	 */
	createSchema: function() {
		var schema = this.callParent(arguments);
		schema.name = "";
		schema.parentSchemaUId = this.defSchemaUId;
		schema.isCreatedInSvg = true;
		schema.isInterpretable = false;
		schema.serializeToDB = false;
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
	}

	// endregion

});
