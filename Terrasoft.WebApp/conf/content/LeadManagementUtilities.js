Terrasoft.configuration.Structures["LeadManagementUtilities"] = {innerHierarchyStack: ["LeadManagementUtilities"]};
define("LeadManagementUtilities", ["LeadManagementUtilitiesResources", "LeadConfigurationConst",
			"ProcessModuleUtilities", "DesktopPopupNotification", "RightUtilities"],
		function(resources, LeadConfigurationConst, ProcessModuleUtilities, DesktopPopupNotification, RightUtilities) {
			var leadManagementUtilitiesClass = Ext.define("Terrasoft.configuration.mixins.LeadManagementUtilities", {
				alternateClassName: "Terrasoft.LeadManagementUtilities",
				defaultProcessName: "LeadManagement78",

				columns: {
					/**
					 * Collection of the Disqualification button items.
					 */
					"DisqualificationMenuItems": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					},
					/**
					 * Collection of the Disqualification reason button items.
					 */
					"DisqualificationReasonsMenuItems": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					}
				},

				/**
				 * User rights utilities.
				 * @protected
				 * @type {Terrasoft.RightUtilities}
				 */
				RightUtilities: RightUtilities,

				/**
				 * Returns entity from current execution context.
				 * @private
				 * @return {Terrasoft.BaseViewModel} Entity.
				 */
				getEntity: function() {
					var entity = this;
					if (Ext.isFunction(this.getActiveRow)) {
						entity = this.getActiveRow();
					}
					return entity;
				},

				/**
				 * Returns unique identifier of the LeadManagement process.
				 * @public
				 * @return {String} Unique identifier.
				 */
				getLeadManagementProcessId: function() {
					var entity = this.getEntity();
					return entity.get("QualificationProcessId");
				},

				/**
				 * Initiate execution of the LeadManagement process.
				 * @public
				 * @param {Object} config Config.
				 */
				executeLeadManagementProcess: function(config) {
					this.checkLeadEditRights(function() {
						this.set("LockBodyMask", false);
						var leadManagementProcessId = this.getLeadManagementProcessId();
						var continueExecuting = !(config && config.continueExecuting === false);
						if (leadManagementProcessId && continueExecuting) {
							ProcessModuleUtilities.continueExecuting(leadManagementProcessId, this);
						} else if (!leadManagementProcessId) {
							Terrasoft.SysSettings.querySysSettingsItem("LeadManagementProcess", function(sysSetting) {
								var processConfig = this.getLeadManagementProcessConfig(config);
								var extendedConfig = {};
								if (sysSetting) {
									extendedConfig.sysProcessName = "";
									extendedConfig.sysProcessId = sysSetting.value;
								}
								Ext.apply(processConfig, extendedConfig);
								ProcessModuleUtilities.executeProcess(processConfig);
							}, this);
						} else {
							this.leadManagementProcessCallback(config);
						}
					}, this);
				},

				/**
				 * Checks if user can edit selected lead.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Terrasoft.BaseViewModel} scope Callback scope.
				 */
				checkLeadEditRights: function(callback, scope) {
					var entity = this.getEntity();
					this.RightUtilities.checkCanEdit({
						schemaName: "Lead",
						primaryColumnValue: entity.get("Id")
					}, function(result) {
						if (!this.Ext.isEmpty(result)) {
							this.Terrasoft.showInformation(result);
							return;
						}
						this.Ext.callback(callback, scope, [result]);
					}, this);
				},

				/**
				 * Return config for the LeadManagement process.
				 * @param {Object} callbackConfig Config for the callback function.
				 * @return {Object} Config.
				 */
				getLeadManagementProcessConfig: function(callbackConfig) {
					return {
						"sysProcessName": this.defaultProcessName,
						"sysProcessId": "",
						"parameters": this.getLeadManagementParameters(),
						"callback": this.leadManagementProcessCallback.bind(this, callbackConfig)
					};
				},

				/**
				 * Callback function of the LeadManagement process.
				 * @public
				 * @param {Object} config Config.
				 * @param {String} config.callbackMethodName Name of the callback method.
				 * @param {Object} config.scope The callback execution context.
				 */
				leadManagementProcessCallback: function(config) {
					var qualifyStatus = this.getQualifyStatus();
					if (qualifyStatus === LeadConfigurationConst.LeadConst.QualifyStatus.Qualification) {
						this.showNotification();
					}
					var callback = this.reloadEntity;
					var scope = this;
					if (!Ext.isEmpty(config)) {
						callback = this.getMethodByName(config.callbackMethodName) || callback;
						scope = config.scope || this;
					}
					if (callback) {
						callback.call(scope);
					}
					this.set("LockBodyMask", false);
				},

				/**
				 * Returns ViewModel method by name.
				 * @param {String} name Name of the method.
				 * @return {Function} Method.
				 */
				getMethodByName: function(name) {
					var method = this[name];
					if (Ext.isFunction(method)) {
						return method;
					}
					return null;
				},

				/**
				 * Show notification.
				 */
				showNotification: function() {
					var config = this.getNotificationConfig();
					DesktopPopupNotification.showNotification(config);
				},

				/**
				 * Returns the config of the popup notification.
				 * @returns {Object} Config of the popup notification.
				 */
				getNotificationConfig: function() {
					return {
						id: Terrasoft.generateGUID(),
						title: resources.localizableStrings.QuialifiedNotificationTitle,
						body: resources.localizableStrings.QuialifiedNotificationBody,
						icon: this.getModuleIconUrl(),
						onShow: this.onShowNotification,
						onClick: this.onNotificationClick,
						scope: this,
						ignorePageVisibility: true
					};
				},

				/**
				 * Notification click handler.
				 */
				onNotificationClick: function() {
					this.sandbox.publish("PushHistoryState", {hash: "CardModuleV2/LeadPageV2/edit/" +
					this.getPrimaryColumnValue()});
				},

				/**
				 * Returns Url for the module icon.
				 * @returns {String} Url.
				 */
				getModuleIconUrl: function() {
					var module = Terrasoft.configuration.ModuleStructure.Lead;
					return Terrasoft.ImageUrlBuilder.getUrl({
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {
							primaryColumnValue: module.logoId
						}
					});
				},

				/**
				 * Handling popup notification after display.
				 * @param {Event} event Event show.
				 */
				onShowNotification: function(event) {
					setTimeout(function() {
						DesktopPopupNotification.closeNotification(event.target);
					}, DesktopPopupNotification.defaultDisplayTimeout);
				},

				/**
				 * Returns configuration for the LeadManagement process execution.
				 * @private
				 * @returns {Object} Configuration.
				 */
				getLeadManagementParameters: function() {
					return {
						"LeadId": this.getPrimaryColumnValue(),
						"ShowDistributionPage": this.isSection()
					};
				},

				/**
				 * Calls method from the CardPage.
				 * @private
				 * @param {Object} config Configuration of call.
				 */
				executeCardMethod: function(config) {
					this.sandbox.publish("OnCardAction", config, [this.getCardModuleSandboxId()]);
				},

				/**
				 * LeadManagement button click handler.
				 * @public
				 */
				onLeadManagementSectionButtonClick: function() {
					if (this.get("IsCardVisible")) {
						this.executeCardMethod("onLeadManagementButtonClick");
					} else {
						this.continueLeadManagementExecuting();
					}
				},

				/**
				 * Proceed execution of the LeadManagement process.
				 * @private
				 */
				continueLeadManagementExecuting: function() {
					var leadManagementProcessId = this.getLeadManagementProcessId();
					if (!leadManagementProcessId) {
						var entity = this.getEntity();
						this.refreshColumns(["QualificationProcessId"], this.executeLeadManagementProcess, entity);
					} else {
						this.executeLeadManagementProcess();
					}
				},

				/**
				 * LeadManagement button click handler.
				 * @public
				 */
				onLeadManagementButtonClick: function() {
					var config = {
						callback: this.continueLeadManagementExecuting,
						isSilent: true,
						lockBodyMask: true
					};
					this.save(config);
				},

				/**
				 * Determines whether the stage is active.
				 * @param {String} qualifyStatusId Unique identifier of the QualifyStatus.
				 * @public
				 * @returns {Boolean}.
				 */
				getIsQualificationOnActiveStage: function(qualifyStatusId) {
					var qualifyStatus = LeadConfigurationConst.LeadConst.QualifyStatus;
					var activeStageStatuses = [qualifyStatus.Qualification, qualifyStatus.Distribution,
						qualifyStatus.TransferForSale, qualifyStatus.WaitingForSale];
					return Terrasoft.contains(activeStageStatuses, qualifyStatusId);
				},

				/**
				 * Returns unique identifier of the QualifyStatus column.
				 * @public
				 * @returns {String} Unique identifier of the QualifyStatus.
				 */
				getQualifyStatus: function() {
					var qualifyStatus = this.get("QualifyStatus");
					return (qualifyStatus) ? qualifyStatus.value : null;
				},

				/**
				 * Initialize current instance.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @public
				 */
				initLeadManagement: function(callback, scope) {
					Terrasoft.chain(
							this.initParameters,
							this.initDisqualifyButtonItems,
							callback,
							scope || this
					);
				},

				/**
				 * Initialize parameters for current instance.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @private
				 */
				initParameters: function(callback, scope) {
					Terrasoft.SysSettings.querySysSettingsItem("UseProcessLeadManagement", function(value) {
						this.set("UseProcessLeadManagement", value);
						callback.call(scope || this);
					}, this);
				},

				/**
				 * Initialize controls of current instance.
				 * @param {Terrasoft.BaseViewModel} entity ViewModel for initialization.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 * @public
				 */
				initLeadManagementControls: function(entity, callback, scope) {
					this.initLeadManagementButtonCaption(entity);
					this.checkIsProcessNotAttachedToEntity(entity, this.initLeadManagementButtonVisibility, this);
					this.initDisqalificationButtonVisibility();
					Ext.callback(callback, scope || this);
				},

				/**
				 * Initialize caption of the LeadManagement button.
				 * @param {Terrasoft.BaseViewModel} entity ViewModel for initialization.
				 * @private
				 */
				initLeadManagementButtonCaption: function(entity) {
					entity = entity || this.getEntity();
					if (Ext.isEmpty(entity)) {
						return;
					}
					var primaryColumnValue = entity.get(entity.primaryColumnName);
					var qualifyStatusId = this.getQualifyStatus(primaryColumnValue);
					var qualifyStatus = LeadConfigurationConst.LeadConst.QualifyStatus;
					var caption = "";
					switch (qualifyStatusId) {
						case qualifyStatus.Qualification:
							caption = resources.localizableStrings.QualifyStatusQualificationCaption;
							break;
						case qualifyStatus.Distribution:
							caption = resources.localizableStrings.QualifyStatusDistributionCaption;
							break;
						case qualifyStatus.TransferForSale:
							caption = resources.localizableStrings.QualifyStatusTranslationForSaleCaption;
							break;
					}
					this.set("QualificationProcessButtonCaption", caption);
				},

				/**
				 * Adds columns into the query to SysProcessEntity.
				 * @private
				 * @param {Terrasoft.EntitySchemaQuery} esq The Query to EntitySchema.
				 */
				addProcessItemQueryColumns: function(esq) {
					esq.addColumn("Id");
				},

				/**
				 * Adds filters into the query to SysProcessEntity.
				 * @private
				 * @param {Terrasoft.EntitySchemaQuery} esq The Query to EntitySchema.
				 * @param {String} primaryColumnValue Id of primary column.
				 */
				addProcessItemQueryFilters: function(esq, primaryColumnValue) {
					var filters = esq.filters;
					filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"EntityId", primaryColumnValue));
				},

				/**
				 * Returns query which fetches records from SysProcessEntity table with given entity id.
				 * @private
				 * @param {String} primaryColumnValue Id of entity.
				 * @returns {Terrasoft.EntitySchemaQuery} Query object.
				 */
				getProcessItemQuery: function(primaryColumnValue) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysProcessEntity"
					});
					this.addProcessItemQueryColumns(esq);
					this.addProcessItemQueryFilters(esq, primaryColumnValue);
					return esq;
				},

				/**
				 * Adds columns to "QualificationProcessId" query.
				 * @private
				 * @param {Terrasoft.EntitySchemaQuery} esq The Query to EntitySchema.
				 */
				addQualificationProcessQueryColumns: function(esq) {
					esq.addColumn("QualificationProcessId");
				},

				/**
				 * Adds filters to qualification process Id query.
				 * @private
				 * @param {Terrasoft.EntitySchemaQuery} esq The Query to EntitySchema.
				 * @param {String} primaryColumnValue Value of primary column.
				 */
				addQualificationProcessQueryFilters: function(esq, primaryColumnValue) {
					esq.enablePrimaryColumnFilter(primaryColumnValue);
				},

				/**
				 * Returns query that selects identifier of qualification process for given lead.
				 * @private
				 * @param {String} primaryColumnValue Unique identifier of entity.
				 * @returns {Terrasoft.EntitySchemaQuery} Query that selects identifier of qualification process.
				 */
				getQualificationProcessQuery: function(primaryColumnValue) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Lead"
					});
					this.addQualificationProcessQueryColumns(esq);
					this.addQualificationProcessQueryFilters(esq, primaryColumnValue);
					return esq;
				},

				/**
				 * Returns identifier of qualification process from given query results.
				 * @private
				 * @param {Array} rows Array of query results.
				 * @returns {String} Idenftifier of qualification process.
				 */
				getQualificationProcessIdFromQueryResult: function(rows) {
					var qualProcessId = "";
					if (!this.Ext.isEmpty(rows)) {
						qualProcessId = rows[0].QualificationProcessId;
					}
					return qualProcessId;
				},

				/**
				 * Returns batch query to check which instance of lead management process is used.
				 * @private
				 * @param {String} primaryColumnValue Value of primary column.
				 * @returns {Terrasoft.BatchQuery} Batch query.
				 */
				getProcessNotAttachedToEntityQuery: function(primaryColumnValue) {
					var processItemEsq = this.getProcessItemQuery(primaryColumnValue);
					var qualificationProcessEsq = this.getQualificationProcessQuery(primaryColumnValue);
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					batchQuery.add(processItemEsq);
					batchQuery.add(qualificationProcessEsq);
					return batchQuery;
				},

				/**
				 * Sets IsProcessNotAttachedToEntity depending on which lead management process is used.
				 * @private
				 * @param {Terrasoft.BaseViewModel} entity ViewModel for initialization.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 */
				checkIsProcessNotAttachedToEntity: function(entity, callback, scope) {
					entity = entity || this.getEntity();
					if (Ext.isEmpty(entity)) {
						return;
					}
					var primaryColumnValue = entity.get(entity.primaryColumnName);
					this.set("IsProcessNotAttachedToEntity", true);
					var batchQuery = this.getProcessNotAttachedToEntityQuery(primaryColumnValue);
					batchQuery.execute(function(response) {
						if (response.success) {
							var queryResults = response.queryResults;
							var sysProcessEntities = queryResults[0].rows;
							var qualProcessId =
								this.getQualificationProcessIdFromQueryResult(queryResults[1] && queryResults[1].rows);
							if (!this.Ext.isEmpty(sysProcessEntities) || !qualProcessId) {
								this.set("IsProcessNotAttachedToEntity", false);
							}
						}
						this.Ext.callback(callback, scope || this, [entity]);
					}, this);
				},

				/**
				 * Initialize visibility of the LeadManagement button.
				 * @param {Terrasoft.BaseViewModel} entity ViewModel for initialization.
				 * @private
				 */
				initLeadManagementButtonVisibility: function(entity) {
					entity = entity || this.getEntity();
					if (Ext.isEmpty(entity)) {
						return;
					}
					var primaryColumnValue = entity.get(entity.primaryColumnName);
					var isNewMode = ((this.isNewMode && this.isNewMode()) === true);
					var visible = false;
					if (!isNewMode) {
						var isCardVisible = this.get("IsCardVisible");
						var qualifyStatusId = this.getQualifyStatus(primaryColumnValue);
						var qualifyStatus = LeadConfigurationConst.LeadConst.QualifyStatus;
						var isProcessNotAttachedToEntity = this.get("IsProcessNotAttachedToEntity");
						var isQualification = (qualifyStatusId === qualifyStatus.Qualification);
						visible = isQualification;
						if (isCardVisible !== false && !visible) {
							visible = (isProcessNotAttachedToEntity && (
								qualifyStatusId === qualifyStatus.Distribution ||
								qualifyStatusId === qualifyStatus.TransferForSale
							));
						}
					}
					this.set("LeadManagementButtonVisible", visible);
				},

				/**
				 * Initialize visibility of the Disqualify button.
				 * @private
				 */
				initDisqalificationButtonVisibility: function() {
					var isNewMode = ((this.isNewMode && this.isNewMode()) === true);
					var visible = false;
					if (isNewMode === false) {
						var qualifyStatusId = this.getQualifyStatus();
						visible = this.getIsQualificationOnActiveStage(qualifyStatusId);
					}
					this.set("DisqalificationButtonVisible", visible);
				},

				/**
				 * Disqualify button click handler.
				 * @param {String} reasonId Unique identifier of the LeadDisqualifyReason.
				 * @public
				 */
				onDisqualifyClick: function(reasonId) {
					if (this.isSection()) {
						this.executeCardMethod({
							methodName: "onDisqualifyClick",
							args: [reasonId]
						});
						return;
					}
					var saveCallbackConfig = {
						callback: this.leadManagementProcessCallback,
						isSilent: true,
						lockBodyMask: true
					};
					this.updateValues([
						{
							schemaName: "LeadDisqualifyReason",
							columnName: "LeadDisqualifyReason",
							recordId: reasonId
						},
						{
							schemaName: "QualifyStatus",
							columnName: "QualifyStatus",
							recordId: LeadConfigurationConst.LeadConst.QualifyStatus.Disqualified
						}
					], this.save.bind(this, saveCallbackConfig), this);
				},

				/**
				 * Updates values of current instance from database.
				 * @param {Object} config Configuration for update.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @public
				 */
				updateValues: function(config, callback, scope) {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					Terrasoft.each(config, function(item) {
						bq.add(this.getEntitySelectQuery(item.schemaName, item.recordId));
					}, this);
					bq.execute(function(response) {
						if (response.success) {
							Terrasoft.each(config, function(item, index) {
								var result = response.queryResults[index];
								if (Ext.isEmpty(result)) {
									return;
								}
								var resultItem = result.rows[0];
								if (Ext.isEmpty(resultItem)) {
									return;
								}
								var columnValue = {
									value: resultItem.Id,
									displayValue: resultItem.Name
								};
								this.set(item.columnName, columnValue);
							}, this);
						}
						callback.call(scope || this);
					}, this);
				},

				/**
				 * Returns query for receiving the entity from database.
				 * @param {String} schemaName Name of the entity schema.
				 * @param {String} recordId Unique identifier for filtering.
				 * @private
				 * @returns {Terrasoft.EntitySchemaQuery}
				 */
				getEntitySelectQuery: function(schemaName, recordId) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: schemaName
					});
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
					esq.enablePrimaryColumnFilter(recordId);
					return esq;
				},

				/**
				 * NoInterested button click handler.
				 * @public
				 */
				onNotInterestedClick: function() {
					if (this.isSection()) {
						this.executeCardMethod("onNotInterestedClick");
						return;
					}
					this.updateValues([{
						schemaName: "QualifyStatus",
						columnName: "QualifyStatus",
						recordId: LeadConfigurationConst.LeadConst.QualifyStatus.NotInterested
					}], this.save, this);
				},

				/**
				 * Determines whether the current execution context is Section.
				 * @private
				 * @returns {Boolean}.
				 */
				isSection: function() {
					var isSectionVisible = this.get("IsSectionVisible");
					return (isSectionVisible === true || isSectionVisible === false);
				},

				/**
				 * Initialize items of the Disqualify button.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @private
				 */
				initDisqualifyButtonItems: function(callback, scope) {
					var menuItems = this.get("DisqualificationMenuItems");
					if (Ext.isEmpty(menuItems)) {
						menuItems = Ext.create("Terrasoft.BaseViewModelCollection");
						this.set("DisqualificationMenuItems", menuItems);
					}
					menuItems.clear();
					menuItems.addItem(this.getButtonMenuItem({
						"Caption": resources.localizableStrings.DisqualificationReasonsButtonCaption,
						"Items": {"bindTo": "DisqualificationReasonsMenuItems"},
						"Visible": {"bindTo": "DisqalificationButtonVisible"}
					}));
					menuItems.addItem(this.getButtonMenuItem({
						"Caption": resources.localizableStrings.NotInterestedButtonCaption,
						"Click": {"bindTo": "onNotInterestedClick"},
						"Visible": {"bindTo": "DisqalificationButtonVisible"}
					}));
					this.getDisqualifyReasons(function(collection) {
						this.initDisqualifyReasonsButtonItems(collection, callback, scope);
					}, this);
				},

				/**
				 * Initialize items of the disqualification reasons.
				 * @param {Terrasoft.BaseViewModelCollection} collection Collection for initialization.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @private
				 */
				initDisqualifyReasonsButtonItems: function(collection, callback, scope) {
					var menuItems = this.getDisqualifyButtonItems(collection);
					var disqualificationMenuItems = this.get("DisqualificationReasonsMenuItems");
					if (Ext.isEmpty(disqualificationMenuItems)) {
						disqualificationMenuItems = Ext.create("Terrasoft.BaseViewModelCollection");
						this.set("DisqualificationReasonsMenuItems", disqualificationMenuItems);
					}
					disqualificationMenuItems.loadAll(menuItems);
					callback.call(scope || this);
				},

				/**
				 * Returns collection of the items of disqualification reasons.
				 * @param {Terrasoft.BaseViewModelCollection} collection Collection for initialization.
				 * @private
				 * @returns {Terrasoft.BaseViewModelCollection}.
				 */
				getDisqualifyButtonItems: function(collection) {
					var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					if (collection instanceof Terrasoft.BaseViewModelCollection) {
						collection.each(function(item) {
							menuItems.addItem(this.getButtonMenuItem({
								"Caption": item.get("Name"),
								"Click": {"bindTo": "onDisqualifyClick"},
								"Tag": item.get("Id"),
								"Visible": {"bindTo": "DisqalificationButtonVisible"}
							}));
						}, this);
					}
					return menuItems;
				},

				/**
				 * Query the disqualification reasons.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution contexxt.
				 * @private
				 */
				getDisqualifyReasons: function(callback, scope) {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						"rootSchemaName": "LeadDisqualifyReason"
					});
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
					esq.getEntityCollection(function(response) {
						callback.call(scope, response.collection);
					}, this);
				}
			});
			return Ext.create(leadManagementUtilitiesClass);
		});


