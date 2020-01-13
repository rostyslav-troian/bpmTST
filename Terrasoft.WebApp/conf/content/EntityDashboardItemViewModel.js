Terrasoft.configuration.Structures["EntityDashboardItemViewModel"] = {innerHierarchyStack: ["EntityDashboardItemViewModel"]};
define("EntityDashboardItemViewModel", ["BaseDashboardItemViewModel", "PageUtilities"],
	function() {
		Ext.define("Terrasoft.configuration.EntityDashboardItemViewModel", {
			extend: "Terrasoft.BaseDashboardItemViewModel",
			alternateClassName: "Terrasoft.EntityDashboardItemViewModel",

			"mixins": {
				/**
				 * @class PageUtilities
				 */
				"PageUtilities": "Terrasoft.PageUtilities"
			},

			columns: {
				"EntitySchemaName": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				"Id": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.GUID
				},
				"EntityInitialized": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				}
			},

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * @inheritdoc Terrasoft.BaseDashboardItemViewModel#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initEntity();
			},

			/**
			 * Initialize entity values.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			initEntity: function(callback, scope) {
				if (this.get("EntityInitialized")) {
					if (callback) {
						callback.call(scope || this);
					}
					return;
				}
				var esq = this.createEntityQuery();
				this.addQueryColumns(esq);
				var recordId = this.get("Id");
				esq.getEntity(recordId, function(response) {
					this.onEntityLoaded(response);
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Creates query to EntitySchema.
			 * @return {Terrasoft.EntitySchemaQuery} The Query to EntitySchema.
			 */
			createEntityQuery: function() {
				return this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.get("EntitySchemaName")
				});
			},

			/**
			 * Adds columns to the query.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq The Query to EntitySchema.
			 */
			addQueryColumns: Ext.emptyFn,

			/**
			 * Callback function of request to the EntitySchema.
			 * @param {Object} response Server response.
			 */
			onEntityLoaded: function(response) {
				if (!response.success) {
					return;
				}
				var entity = response.entity;
				this.initFromValues(entity.values);
				this.set("EntityInitialized", true);
			},

			/**
			 * Initialize attributes of ViewModel from values.
			 * @param {Object} values Values collection.
			 */
			initFromValues: function(values) {
				Terrasoft.each(values, function(value, key) {
					this.set(key, value);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseDashboardItemViewModel#execute
			 * @overridden
			 */
			execute: function() {
				var entitySchemaName = this.get("EntitySchemaName");
				var recordId = this.get("Id");
				var config = this.getCardConfig(entitySchemaName, recordId);
				this.openCardInChain(config);
			},

			/**
			 * Returns config for opens card.
			 * @param {String} entitySchemaName Name of the EntitySchema.
			 * @param {Guid} recordId Unique identifier of the EntitySchema record.
			 * @return {Object} Config.
			 */
			getCardConfig: function(entitySchemaName, recordId) {
				var cardSchema = this.getCardSchemaName(entitySchemaName);
				return {
					schemaName: cardSchema,
					id: recordId,
					operation: Terrasoft.ConfigurationEnums.CardOperation.EDIT,
					renderTo: "centerPanel",
					isLinkClick: true
				};
			},

			/**
			 * @inheritdoc Terrasoft.PageUtilities#findLookupColumnAttributeValue
			 * @overridden
			 */
			findLookupColumnAttributeValue: function(columnName, attribute) {
				return this.get(attribute);
			},

			/**
			 * Opens page in chain.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration.
			 */
			openCardInChain: function(config) {
				this.showBodyMask();
				var historyState = this.sandbox.publish("GetHistoryState");
				var stateObj = config.stateObj || {
						isSeparateMode: config.isSeparateMode || true,
						schemaName: config.schemaName,
						entitySchemaName: config.entitySchemaName,
						operation: config.action || config.operation,
						primaryColumnValue: config.id,
						valuePairs: config.defaultValues,
						isInChain: true
					};
				this.sandbox.publish("PushHistoryState", {
					hash: historyState.hash.historyState,
					silent: config.silent,
					stateObj: stateObj
				});
				var moduleName = config.moduleName || "CardModuleV2";
				var moduleParams = {
					renderTo: config.renderTo || this.renderTo,
					id: config.moduleId,
					keepAlive: (config.keepAlive !== false)
				};
				var instanceConfig = config.instanceConfig;
				if (instanceConfig) {
					this.Ext.apply(moduleParams, {
						instanceConfig: instanceConfig
					});
				}
				this.sandbox.loadModule(moduleName, moduleParams);
			}
		});
	});


