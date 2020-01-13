Terrasoft.configuration.Structures["BaseMessageHistoryUtility"] = {innerHierarchyStack: ["BaseMessageHistoryUtility"]};
define("BaseMessageHistoryUtility", ["LocalMessageConstants", "EmailMessageConstants", "ConfigurationConstants"],
	function(LocalMessageConstants) {
		/**
		 * @class Terrasoft.configuration.mixins.BaseMessageHistoryUtility
		 * Mixin, that implements base logic of message history.
		 */
		Ext.define("Terrasoft.configuration.mixins.BaseMessageHistoryUtility", {
			alternateClassName: "Terrasoft.BaseMessageHistoryUtility",

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.checkMessageHistoryExists();
				this.callParent(arguments);
			},

			/**
			 * Returns module ID of message history.
			 * @protected
			 * @return {String} Sandbox identifier for message history.
			 */
			getMessageHistorySandboxId: function() {
				return this.sandbox.id + "_MessageHistoryModule";
			},

			/**
			 * Rerenders module of history message.
			 * @protected
			 * @virtual
			 */
			loadMessage: function() {
				var moduleId = this.getMessageHistorySandboxId();
				var rendered = this.sandbox.publish("RerenderModule", {
					renderTo: "MessageHistory"
				}, [moduleId]);
				if (!rendered) {
					var messageHistoryModuleConfig = {
						renderTo: "MessageHistory",
						id: moduleId
					};
					this.sandbox.loadModule("MessageHistoryModule", messageHistoryModuleConfig);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#updateDetails
			 * @overridden
			 */
			updateDetails: function() {
				this.callParent(arguments);
				this.sandbox.publish("InitModuleViewModel", null, [this.getMessageHistorySandboxId()]);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				var id = this.get("PrimaryColumnValue");
				var tags = id ? [id] : null;
				this.sandbox.subscribe("ReloadCard", this.onReloadCard, this, tags);
				this.sandbox.subscribe("GetRecordInfo", this.onGetRecordInfoForHistory,
					this, [this.getMessageHistorySandboxId()]);
			},

			/**
			 * Returns information about record for message modules.
			 * @protected
			 * @virtual
			 * @return {Object} Record information.
			 */
			getSectionId: function() {
				var moduleConfig = this.Terrasoft.configuration.ModuleStructure[this.entitySchemaName];
				return {
					sectionId: moduleConfig ? moduleConfig.moduleId : null
				};
			},

			/**
			 * Returns information about message history record.
			 * @protected
			 * @virtual
			 * @return {Object} Record information.
			 */
			onGetRecordInfoForHistory: function() {
				var entitySchemaName = this.entitySchema.name;
				var historySchemaName = entitySchemaName + "MessageHistory";
				var primaryColumnValue = this.get("PrimaryColumnValue") || this.get(this.entitySchema.primaryColumnName);
				if (this.isCopyMode()) {
					primaryColumnValue = null;
				}
				var moduleConfig = this.Terrasoft.configuration.ModuleStructure[this.entitySchemaName];
				return {
					relationEntityId: primaryColumnValue,
					historySchemaName: historySchemaName,
					historyRelationColumn: entitySchemaName,
					sectionId: moduleConfig.moduleId
				};
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getEntityInitializedSubscribers
			 * @overridden
			 */
			getEntityInitializedSubscribers: function() {
				var subscribers = this.callParent(arguments);
				subscribers.push(this.getMessageHistorySandboxId());
				return subscribers;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @overridden
			 */
			onSaved: function() {
				if (this.get("CallParentOnSaved")) {
					this.set("CallParentOnSaved", false);
					this.callParent(arguments);
					return;
				}
				var config = arguments[1];
				if (this.isNewMode() && !(config && config.isSilent)) {
					this.saveUnsavedMessages();
				}
				this.set("ParentOnSavedArguments", arguments);
				this.checkMessageHistoryExists(true);
			},

			/**
			 * Checks the number of MessageHistory records.
			 * @param {Boolean} needCallParent Need callParent.
			 * @protected
			 */
			checkMessageHistoryExists: function(needCallParent) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName + "MessageHistory"
				});
				esq.addColumn("Id");
				this.addFiltersToMessageHistoryExistsEsq(esq);
				esq.rowCount = 1;
				esq.getEntityCollection(function(response) {
					if (response.success) {
						var rowsCount = response.collection.getCount();
						this.set("IsMessageHistoryExists", rowsCount > 0);
					}
					if (needCallParent) {
						this.set("CallParentOnSaved", true);
						this.onSaved.apply(this, this.get("ParentOnSavedArguments"));
					}
				}, this);
			},

			/**
			 * Add filters to CaseMessageHistory query.
			 * @param {Terrasoft.EntitySchemaQuery} esq query to CaseMessageHistory.
			 * @protected
			 */
			addFiltersToMessageHistoryExistsEsq: function(esq) {
				esq.filters.add("EntitySchemaFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, this.entitySchemaName, this.get("Id")));
				var filterGroup = esq.createFilterGroup();
				filterGroup.name = "LocalMessages";
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				filterGroup.add("EmailExists", esq.createExistsFilter("[LocalMessage:Id:RecordId].Id"));
				filterGroup.add("CommunicationFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL, "MessageNotifier", LocalMessageConstants.MessageNotifier.Local));
				esq.filters.addItem(filterGroup);
			},

			/**
			 * Handle collapsed of message history group.
			 * @protected
			 * @param {Boolean} isCollapsed Collapsed of message history group.
			 */
			onMessageHistoryGroupCollapsedChanged: function(isCollapsed) {
				this.set("IsMessageHistoryGroupCollapsed", isCollapsed);
			}
		});
	});


