Terrasoft.configuration.Structures["MultiDeleteResultPageV2"] = {innerHierarchyStack: ["MultiDeleteResultPageV2"], structureParent: "BasePageV2"};
define('MultiDeleteResultPageV2Structure', ['MultiDeleteResultPageV2Resources'], function(resources) {return {schemaUId:'86e7bdfc-2485-46ce-a9ef-c23b3abb1d64',schemaCaption: "Page with result of Multidelete", parentSchemaName: "BasePageV2", schemaName:'MultiDeleteResultPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MultiDeleteResultPageV2", ["MultiDeleteResultPageV2Resources", "SchemaBuilderV2", "ViewGeneratorV2",
			"ConfigurationConstants", "NetworkUtilities", "ModuleUtils", "ConfigurationEnums", "ServiceHelper",
			"DefaultProfileHelper", "GridUtilitiesV2", "MultiDeleteResultHelper", "css!MultiDeleteResultHelper"],
		function(Resources, SchemaBuilder, ViewGenerator, ConfigurationConstants, NetworkUtilities, ModuleUtils,
			ConfigurationEnums, ServiceHelper, DefaultProfileHelper) {
			return {
				entitySchemaName: "MultiDeleteQueue",
				mixins: {
					GridUtilities: "Terrasoft.GridUtilities"
				},
				attributes: {

					/**
					 * Collapse state of the constraint results container.
					 */
					"ConstraintResultsCollapsed": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": false
					},

					/**
					 * Collapse state of the right results container.
					 */
					"RightResultsCollapsed": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": false
					},

					/**
					 * Css class name for hidden constraint details container.
					 */
					"ConstraintDetailsHideClass": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": "constraint-details-hide"
					},

					/**
					 * Css class name for the collapsed results container.
					 */
					"ResultsCollapsedClass": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": "resultsContainerCollapsed"
					},

					/**
					 * Collection errors by constrains.
					 */
					"ByConstraintsData": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Collection errors by rights.
					 */
					"ByRightsData": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Collection for grid.
					 */
					"RecordsData": {
						dataValueType: Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Name of deleted schema.
					 */
					"DeletedSchemaName": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Unique identificator of deleted schema.
					 */
					"DeletedSchemaUId": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.GUID,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Signs of cascade operation.
					 */
					"IsCascade": {
						"value": false,
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Key of the current delete process.
					 */
					"OperationKey": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Signs of possible load another page of data.
					 */
					"CanLoadMoreData": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},

					/**
					 * Signs of visible container by rights.
					 */
					"VisibleRightsContainer": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": true
					},

					/**
					 * Signs of visible container by constraints.
					 */
					"VisibleConstraintsContainer": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},

					/**
					 * Caption of container by constraints.
					 */
					"ConstraintsCaption": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				messages: {
					"MultiDeleteStart": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					},
					"MultiDeleteFinished": {
						"mode": this.Terrasoft.MessageMode.BROADCAST,
						"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				methods: {
					/**
					 * @inheritDoc Terrasoft.BaseViewModel#init
					 * @overridden
					 */
					init: function(callback) {
						this.callParent([function() {
							this.Terrasoft.chain(
									this.initInChain,
									this.initDeletedSchemaName,
									this.loadMultiDeleteErrorResultForRights,
									this.initializeSchema,
									this.initPageProfile,
									this.initGrid,
									this.loadMultiDeleteErrorResultForConstraints,
									callback,
									this
							);
						}, this]);
					},

					/**
					 * @inheritDoc Terrasoft.BaseViewModel#initRunProcessButtonMenu
					 * @overridden
					 */
					initRunProcessButtonMenu: function() {
						return;
					},

					/**
					 * Initialize in chain.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Scope.
					 * @private
					 */
					initInChain: function(callback, scope) {
						var key = this.getKeyForSelect();
						this.setCollapsedStatesFromHistory();
						this.set("OperationKey", key);
						this.set("ActionsButtonVisible", false);
						this.set("ByRightsData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
						this.set("ByConstraintsData", this.Ext.create("Terrasoft.Collection"));
						this.set("RecordsData", this.Ext.create("Terrasoft.Collection"));
						this.on("change:ConstraintResultsCollapsed", this.onConstraintResultsCollapsedChange, this);
						this.sandbox.subscribe("MultiDeleteFinished", this.handleAfterDeleteFinished, this);
						callback.call(scope || this);
					},

					/**
					 * Sets collapsed states from history state object.
					 * @private
					 */
					setCollapsedStatesFromHistory: function() {
						var historyState = this.sandbox.publish("GetHistoryState");
						var collapsedStates = historyState.state.CollapsedStates;
						if (collapsedStates) {
							this.set("ConstraintResultsCollapsed", collapsedStates.constraints);
							this.set("RightResultsCollapsed", collapsedStates.rights);
						}
					},

					/**
					 * Handler for the constraint results state property change.
					 * @private
					 */
					onConstraintResultsCollapsedChange: function() {
						var constraintsResultContainer = this.getConstraintResultsContainer();
						if (constraintsResultContainer) {
							this.updateResultsContainerCollapsedState(constraintsResultContainer,
									"ConstraintResultsCollapsed");
						}
					},

					/**
					 * Returns container for the constraint results.
					 * @return {Terrasoft.Container} Container for the constraint results.
					 * @private
					 */
					getConstraintResultsContainer: function() {
						return this.Ext.get("ByConstraintsContainerListContainerList");
					},

					/**
					 * Update collapsed state of the results container.
					 * @param {Terrasoft.Container} resultsContainer Results container.
					 * @param {String} stateProperty State property name.
					 * @private
					 */
					updateResultsContainerCollapsedState: function(resultsContainer, stateProperty) {
						var isCollapsed = this.get(stateProperty);
						var resultsCollapsedClass = this.get("ResultsCollapsedClass");
						if (isCollapsed) {
							resultsContainer.addCls(resultsCollapsedClass);
						} else {
							resultsContainer.removeCls(resultsCollapsedClass);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#initHeader
					 * @overridden
					 */
					initHeader: function() {
						this.sandbox.publish("InitDataViews", {
							hideMainHeader: true
						});
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getPageHeaderCaption
					 * @overridden
					 */
					getPageHeaderCaption: function() {
						return this.get("Resources.Strings.PageCaption");
					},

					/**
					 * Returns key of delete.
					 * @return {String} Key of delete.
					 * @private
					 */
					getKeyForSelect: function() {
						var historyState = this.getHistoryStateInfo();
						return historyState.primaryColumnValue || this.Terrasoft.GUID_EMPTY;
					},

					/**
					 * Load errors with constraints.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Scope.
					 * @private
					 */
					loadMultiDeleteErrorResultForConstraints: function(callback, scope) {
						var items = this.get("ByConstraintsData");
						var select = this.getEsqOfMultiDeleteErrorResult();
						select = this.decorateSelectForConstraints(select);
						select.getEntityCollection(function(response) {
							var itemsCollection;
							if (response && response.success) {
								itemsCollection = response.collection;
								itemsCollection.each(function(item) {
									this.decorateItem(item);
								}, this);
								items.clear();
								items.loadAll(itemsCollection);
							}
							if (itemsCollection && itemsCollection.getCount()) {
								this.set("VisibleConstraintsContainer", true);
								this.setConstraintsCaption();
							} else {
								this.set("VisibleConstraintsContainer", false);
							}
							if (typeof callback === "function") {
								callback.call(scope || this);
							}
						}, this);
					},

					/**
					 * Add target entity schema to select.
					 * @param {Terrasoft.EntitySchemaQuery} select Select query.
					 * @return {Terrasoft.EntitySchemaQuery} Select query.
					 * @private
					 */
					decorateSelectForConstraints: function(select) {
						var captionColumn = this.getConstraintsCaptionColumnName();
						var deletedSchemaName = this.getDeletedSchemaName();
						this.addDenyReasoneFilterForConstraints(select);
						if (deletedSchemaName) {
							select.addColumn("[" + deletedSchemaName + ":Id:RecordId]." + captionColumn, "Caption");
						}
						return select;
					},

					/**
					 * Adds deny reason filters for constraints into the select query.
					 * @param {Terrasoft.EntitySchemaQuery} select Select query.
					 * @private
					 */
					addDenyReasoneFilterForConstraints: function(select) {
						var deleteDeniedType = ConfigurationConstants.MultiDeleteDeniedType;
						var exceptionIds = [
							deleteDeniedType.DbOperationException,
							deleteDeniedType.EntityUsedByProcessException
						];
						select.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters("DenyReason",
							exceptionIds));
					},

					/**
					 * Returns main column name for constraints select.
					 * @return {String} Main column name.
					 * @private
					 */
					getConstraintsCaptionColumnName: function() {
						return this.entitySchema
							&& (this.entitySchema.primaryDisplayColumnName || this.entitySchema.primaryColumnName);
					},

					/**
					 * Select errors with denied rights.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Scope.
					 * @private
					 */
					loadMultiDeleteErrorResultForRights: function(callback, scope) {
						var esq = this.getEsqOfMultiDeleteErrorResult(ConfigurationConstants
								.MultiDeleteDeniedType.SecurityException);
						esq.getEntityCollection(function(response) {
							var collection = response ? response.collection : [];
							if (collection && collection.getCount() > 0) {
								this.fillRecordsData(collection);
							} else {
								this.set("VisibleRightsContainer", false);
							}
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Returns query for select delete errors.
					 * @param {Guid} multiDeleteDeniedTypeId Type of error.
					 * @return {Terrasoft.EntitySchemaQuery} Select query.
					 * @protected
					 */
					getEsqOfMultiDeleteErrorResult: function(multiDeleteDeniedTypeId) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "MultiDeleteQueue",
							defaultPrimaryColumnName: "RecordId",
							isDistinct: true
						});
						var createdOnColumn = esq.addColumn("CreatedOn");
						createdOnColumn.orderPosition = 0;
						createdOnColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
						esq.addColumn("Id");
						esq.addColumn("RecordId");
						esq.addColumn("EntitySchemaUId");
						esq.addColumn("DenyReason");
						esq.addColumn("[SysSchema:UId:EntitySchemaUId].Name", "SysSchemaName");
						esq.filters.add(this.getFilterToSelectMultiDeleteErrorResult(multiDeleteDeniedTypeId));
						esq.rowCount = this.getRowCountMultiDeleteQueue();
						return esq;
					},

					/**
					 * Returns number of row.
					 * @return {Number} number of row.
					 * @private
					 */
					getRowCountMultiDeleteQueue: function() {
						return this.get("isCascade") ? 1 : -1;
					},

					/**
					 * Fill collection by errors.
					 * @param {Terrasoft.Collection} collection The results of errors.
					 * @private
					 */
					fillRecordsData: function(collection) {
						var data = this.Ext.create("Terrasoft.BaseViewModelCollection");
						data.loadAll(collection);
						this.set("RecordsData", data);
					},

					/**
					 * Returns filter for select delete errors.
					 * @param {Guid} denyReasoneId Type of error.
					 * @return {Terrasoft.FilterGroup} Filter for select.
					 * @protected
					 */
					getFilterToSelectMultiDeleteErrorResult: function(denyReasoneId) {
						var filter = this.Ext.create("Terrasoft.FilterGroup");
						var isCascade = this.get("IsCascade");
						var deleteSchemaUId = this.get("DeletedSchemaUId");
						filter.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"OperationKey", this.get("OperationKey")));
						filter.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"State", ConfigurationConstants.MultiDelete.RecordState.ERROR));
						if (denyReasoneId) {
							filter.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "DenyReason", denyReasoneId));
						}
						if (isCascade) {
							filter.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "EntitySchemaUId",	deleteSchemaUId));
						}
						return filter;
					},

					/**
					 * @inheritDoc Terrasoft.GridUtilitiesV2#getFilters
					 * @overridden
					 */
					getFilters: function() {
						var resData = this.get("RecordsData");
						var filter = this.Terrasoft.createColumnInFilterWithParameters("Id", resData.getKeys());
						return filter;
					},

					/**
					 * Initialize grid.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Scope.
					 * @private
					 */
					initGrid: function(callback, scope) {
						var records = this.get("RecordsData");
						if (records && records.getCount()) {
							this.initGridData();
							this.loadGridData();
						}
						callback.call(scope || this);
					},

					/**
					 * @inheritDoc Terrasoft.BaseSectionV2#onRender
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.onConstraintResultsCollapsedChange();
						this.reloadGridColumnsConfig(true);
					},

					/**
					 * @inheritDoc Terrasoft.BaseSectionV2#initGridData
					 * @overridden
					 */
					initGridData: function() {
						this.set("RowCount", 20);
						this.set("IsPageable", true);
					},

					/**
					 * @inheritDoc Terrasoft.BaseSectionV2#getGridData
					 * @overridden
					 */
					getGridData: function() {
						return this.get("ByRightsData");
					},

					/**
					 * Initialize entity schema.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 * @private
					 */
					initializeSchema: function(callback, scope) {
						var schemaName = this.getDeletedSchemaName();
						this.Terrasoft.require([schemaName], function(response) {
							this.entitySchemaName = response.name;
							this.entitySchema = response;
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Initialize columns list.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 * @private
					 */
					initPageProfile: function(callback, scope) {
						var schemaName = this.getDeletedSchemaName();
						var profileKey = this.getProfileKeyBySchemaName(schemaName);
						SchemaBuilder.getProfile(profileKey, function(response) {
							var profile = this.Terrasoft.deepClone(response);
							if (this.Terrasoft.isEmptyObject(profile)) {
								profile = DefaultProfileHelper.getEntityProfile(profileKey, schemaName);
							}
							profile = this.getFormattedProfile(profile);
							this.set("Profile", profile);
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Formatting profile.
					 * @param {Object} profile Base profile settings.
					 * @return {Object} Formatted profile.
					 */
					getFormattedProfile: function(profile) {
						profile = profile.DataGrid || profile;
						var listedConfig = JSON.parse(profile.listedConfig);
						profile.isTiled = false;
						profile.type = ConfigurationEnums.GridType.LISTED;
						listedConfig.columnsConfig = ViewGenerator.generateGridRowConfig(profile, listedConfig.items);
						ViewGenerator.addLinks(listedConfig, false, this.entitySchema);
						profile.listedConfig = JSON.stringify(listedConfig);
						profile.DataGrid = this.Terrasoft.deepClone(profile);
						return profile;
					},

					/**
					 * Returns profile key.
					 * @param {String} schemaName Entity schema name.
					 * @return {String} Profile key.
					 * @protected
					 */
					getProfileKeyBySchemaName: function(schemaName) {
						var moduleStructure = this.Terrasoft.ModuleUtils.getModuleStructureByName(schemaName);
						if (moduleStructure) {
							return this.getSectionProfileKey(schemaName);
						} else {
							return this.getLookupProfileKey(schemaName);
						}
					},

					/**
					 * Returns section profile key.
					 * @param {String} schemaName Entity schema name.
					 * @return {String} Profile key.
					 * @protected
					 */
					getSectionProfileKey: function(schemaName) {
						return schemaName + "SectionV2GridSettingsGridDataView";
					},

					/**
					 * Returns lookup profile key.
					 * @param {String} schemaName Entity schema name.
					 * @return {String} Profile key.
					 * @protected
					 */
					getLookupProfileKey: function(schemaName) {
						return "BaseLookupConfigurationSection" + schemaName + "GridSettingsGridDataView";
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getProfileColumns
					 * @overridden
					 */
					getProfileColumns: function() {
						var profileColumns = {};
						var profile = this.get("Profile");
						this.convertProfileColumns(profileColumns, profile);
						return profileColumns;
					},

					/**
					 * Initialize name deleted schema.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Scope.
					 * @private
					 */
					initDeletedSchemaName: function(callback, scope) {
						var esq = this.getEsqOfMultiDeleteErrorResult();
						esq.getEntityCollection(function(response) {
							var collection = response && response.collection;
							if (collection) {
								var record = collection.getByIndex(0);
								if (!record) {
									this.sandbox.publish("BackHistoryState");
									return;
								}
								var schemaName = record ? record.get("SysSchemaName") : "";
								var schemaUId = record ? record.get("EntitySchemaUId") : this.Terrasoft.GUID_EMPTY;
								this.set("DeletedSchemaName", schemaName);
								this.set("DeletedSchemaUId", schemaUId);
								collection.each(function(item) {
									if (item.get("SysSchemaName") !== schemaName) {
										this.set("IsCascade", true);
									}
								}, this);
							}
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Returns the name of the schema of deleted.
					 * @return {String} Name of the schema.
					 * @protected
					 */
					getDeletedSchemaName: function() {
						return this.get("DeletedSchemaName");
					},

					/**
					 * Sets caption for block with errors by constraints.
					 * @protected
					 */
					setConstraintsCaption: function() {
						var items = this.get("ByConstraintsData").getItems();
						var count = items ? items.length : 0;
						var caption = this.Ext.String.format(this.get("Resources.Strings.ByConstraintsCaption"), count);
						this.set("ConstraintsCaption", caption);
					},

					/**
					 * Returns caption for block with errors by rights.
					 * return {String} Caption.
					 * @protected
					 */
					getRightsCaption: function() {
						var items = this.get("RecordsData").getItems();
						var count = items ? items.length : 0;
						return this.Ext.String.format(this.get("Resources.Strings.ByRightsCaption"), count);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#onDataChanged
					 * @overridden
					 */
					onDataChanged: function() {
						this.getRightsCaption();
					},

					/**
					 * Decorates model features.
					 * @param {Object} item Element collection notifications.
					 * @protected
					 */
					decorateItem: function(item) {
						var constraintDetailsHideClass = this.get("ConstraintDetailsHideClass");
						item.sandbox = this.sandbox;
						item.Terrasoft = this.Terrasoft;
						item.Ext = this.Ext;
						item.moduleContext = this;
						item.onClickToHierarchicalButton = this.onClickToHierarchicalButton;
						item.showItemConstraints = this.showItemConstraints;
						item.hideItemConstraints = this.hideItemConstraints;
						item.initItemConstraintDetails = this.initItemConstraintDetails;
						item.getItemHierarchicalCaption = this.getItemHierarchicalCaption;
						item.getConstraintsItemLabel = this.getConstraintsItemLabel;
						item.getConstraintDetailsContainer = this.getConstraintDetailsContainer;
						item.getHierarchicalButtonMarkerValue = this.getHierarchicalButtonMarkerValue;
						item.openCard = this.openCard;
						item.callDeleteService = this.callDeleteService;
						item.getPreparedData = this.getPreparedData;
						item.handlerAfterDelete = this.handlerAfterDelete;
						item.handlerBeforeDelete = this.handlerBeforeDelete;
						item.handleAfterDeleteFinished = this.handleAfterDeleteFinished;
						item.sendGoogleTagManagerData = this.sendGoogleTagManagerData;
						item.getGoogleTagManagerData = this.getGoogleTagManagerData;
						item.ignoreRecord = this.ignoreRecord;
						item.set("DeletedEntitySchemaName", this.getDeletedSchemaName());
						item.set("IsShowDetails", false);
						item.set("IsDetailsLoaded", false);
						item.set("ConstraintDetailsHideClass", constraintDetailsHideClass);
						item.set("SchemaName", this.getDeletedSchemaName());
					},

					/**
					 * Returns data-item-marker value for the item hierarchical button.
					 * @return {String} Data-item-marker value for the item hierarchical button.
					 */
					getHierarchicalButtonMarkerValue: function() {
						return "hierarchical-button-" + this.get("Id");
					},

					/**
					 * Opens item card.
					 * @private
					 */
					openCard: function() {
						var recordId = this.get("RecordId");
						var schemaName = this.get("SchemaName");
						NetworkUtilities.openEntityPage({
							entityId: recordId,
							entitySchemaName: schemaName,
							sandbox: this.sandbox
						});
					},

					/**
					 * Handler for the item hierarchical button click.
					 * @private
					 */
					onClickToHierarchicalButton: function() {
						var isShowDetails = this.get("IsShowDetails");
						if (isShowDetails) {
							this.hideItemConstraints();
						} else {
							this.showItemConstraints();
						}
					},

					/**
					 * Shows container with constraint details.
					 * @private
					 */
					showItemConstraints: function() {
						var constraintDetailsHideClass = this.get("ConstraintDetailsHideClass");
						var isDetailsLoaded = this.get("IsDetailsLoaded");
						var id = this.get("Id");
						var constraintDetailsContainer = this.getConstraintDetailsContainer(id);
						this.set("IsShowDetails", true);
						constraintDetailsContainer.removeCls(constraintDetailsHideClass);
						if (!isDetailsLoaded) {
							this.initItemConstraintDetails();
						}
					},

					/**
					 * Hides container with constraint details.
					 * @private
					 */
					hideItemConstraints: function() {
						var id = this.get("Id");
						var constraintDetailsHideClass = this.get("ConstraintDetailsHideClass");
						var constraintDetailsContainer = this.getConstraintDetailsContainer(id);
						this.set("IsShowDetails", false);
						constraintDetailsContainer.addCls(constraintDetailsHideClass);
					},

					/**
					 * Initializes constraint details.
					 * @private
					 */
					initItemConstraintDetails: function() {
						var itemId = this.get("Id");
						var recordId = this.get("RecordId");
						var container = this.getConstraintDetailsContainer(itemId);
						this.set("IsDetailsLoaded", true);
						this.moduleContext.showBodyMask({
							timeout: 0
						});
						this.sandbox.loadModule("MultiDeleteDependencies", {
							renderTo: container,
							id: itemId,
							instanceConfig: {
								deletedEntitySchemaName: this.get("DeletedEntitySchemaName"),
								deletedRecordId: recordId,
								itemId: itemId
							}
						});
					},

					/**
					 * Returns container for the details with constraints.
					 * @param {Guid} itemId Item Id.
					 * @return {Terrasoft.Container} Container for the details with constraints.
					 * @protected
					 */
					getConstraintDetailsContainer: function(itemId) {
						return this.Ext.get("MultiDeleteDependenciesItemContainer-" +
								itemId + "-CardModuleV2_MultiDeleteResultPageV2");
					},

					/**
					 * Returns configuration object for the item.
					 * @param {Object} itemConfig Empty configuration object.
					 * @return {Object} Configuration object for the item.
					 * @private
					 */
					getConstraintsItemConfig: function(itemConfig) {
						var constraintDetailsHideClass = this.get("ConstraintDetailsHideClass");
						var itemLabelConfig = this.getItemLabelConfig();
						var itemToolsConfig = this.getItemToolsConfig();
						var toggleButtonConfig = {
							className: "Terrasoft.Label",
							caption: {bindTo: "getItemHierarchicalCaption"},
							classes: {labelClass: ["constraints-icon-hierarchical"]},
							click: {bindTo: "onClickToHierarchicalButton"},
							markerValue: {bindTo: "getHierarchicalButtonMarkerValue"}
						};
						var detailsContainerConfig = {
							className: "Terrasoft.Container",
							id: "MultiDeleteDependenciesItemContainer",
							items: [],
							classes: {
								wrapClassName: ["constraints-item-details-container", constraintDetailsHideClass]
							}
						};
						var config = {
							id: "Constraint",
							className: "Terrasoft.Container",
							items: [toggleButtonConfig, itemLabelConfig, itemToolsConfig, detailsContainerConfig],
							markerValue: {bindTo: "getConstraintsItemLabel"},
							classes: {
								wrapClassName: ["constraints-item-container"]
							}
						};
						itemConfig.config = config;
						return itemConfig;
					},

					/**
					 * Returns config of item label.
					 * @return {Object} Item label view config.
					 * @private
					 */
					getItemLabelConfig: function() {
						var itemLabelConfig = {
							className: "Terrasoft.Label",
							caption: {bindTo: "getConstraintsItemLabel"},
							classes: {labelClass: ["subject-text-labelClass"]},
							markerValue: {bindTo: "getConstraintsItemLabel"}
						};
						if (this.isNeedRenderAsLink()) {
							var linkConfig = {
								classes: {labelClass: ["label-link"]},
								click: {bindTo: "openCard"}
							};
							this.Ext.apply(itemLabelConfig, linkConfig);
						}
						return itemLabelConfig;
					},

					/**
					 * Returns config of item tools.
					 * @return {Object} Item tools view config.
					 * @private
					 */
					getItemToolsConfig: function() {
						var deleteButton = {
							className: "Terrasoft.Button",
							imageConfig: this.get("Resources.Images.DeleteItemIcon"),
							classes: {wrapClass: ["constraints-icon-delete"]},
							markerValue: "tools-button",
							caption: this.get("Resources.Strings.DeleteRecordButton"),
							style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							menu: {
								items: [
									{
										caption: this.get("Resources.Strings.DeleteRecord"),
										click: {bindTo: "callDeleteService"},
										tag: "CascadeDelete"
									},
									{
										caption: this.get("Resources.Strings.UnlinkRecord"),
										click: {bindTo: "callDeleteService"},
										tag: "CascadeUnlink"
									}
								]
							}
						};
						var ignoreButton = {
							className: "Terrasoft.Button",
							imageConfig: this.get("Resources.Images.IgnoreItemIcon"),
							hint: this.get("Resources.Strings.IgnoreHint"),
							classes: {wrapClass: ["constraints-icon-ignore"]},
							markerValue: "ignore-button",
							click: {"bindTo": "ignoreRecord"}
						};
						var toolsContainer = {
							className: "Terrasoft.Container",
							items: [deleteButton, ignoreButton],
							classes: {
								wrapClassName: ["constraints-item-tools-container"]
							}
						};
						return toolsContainer;
					},

					/**
					 * Calls delete service.
					 * @param {String} operation Type of operation.
					 * @private
					 */
					callDeleteService: function(operation) {
						var operationKey = this.Terrasoft.generateGUID();
						var data = this.getPreparedData(operation, operationKey);
						this.set("Operation", operation);
						this.sendGoogleTagManagerData();
						this.handlerBeforeDelete(operationKey);
						var serviceConfig = {
							serviceName: "GridUtilitiesService",
							methodName: "DeleteRecordsAsync",
							data: data,
							callback: this.handlerAfterDelete,
							scope: this
						};
						ServiceHelper.callService(serviceConfig);
					},

					/**
					 * Prepares the data for sending to the server.
					 * @param {String} operation Type of operation.
					 * @param {Guid} operationKey Operation key.
					 * @return {Object} Prepeared data.
					 * @private
					 */
					getPreparedData: function(operation, operationKey) {
						var records = [this.get("RecordId")];
						var context = this.moduleContext;
						var params = {
							operation: operation,
							operationKey: operationKey
						};
						if (operation.indexOf("All") !== -1) {
							context = this;
							records = [];
							params.previousOperationKey = context.get("OperationKey");
						}
						var paramsJSON = this.Ext.JSON.encode(params);
						var data = {
							primaryColumnValues: records,
							rootSchema: context.get("DeletedSchemaName"),
							parameters: paramsJSON
						};
						return data;
					},

					/**
					 * Handles before multi delete.
					 * @param {Guid} operationKey  Unique operation key.
					 */
					handlerBeforeDelete: function(operationKey) {
						localStorage.setItem(ConfigurationConstants.MultiDelete.MultiDeleteLocalStorageKey,
								operationKey);
						this.sandbox.publish("MultiDeleteStart", {operationKey: operationKey});
					},

					/**
					 * Handles result of service response.
					 * @param {Object} response Response of service.
					 */
					handlerAfterDelete: function(response) {
						if (!response || !response.DeleteRecordsAsyncResult) {
							this.moduleContext.hideBodyMask();
							throw new Terrasoft.UnknownException();
						}
					},

					/**
					 * Handles result of delete.
					 * @param {Object} result Result of delete.
					 * @private
					 */
					handleAfterDeleteFinished: function(result) {
						var context = this.moduleContext || this;
						if (result.success) {
							context.loadMultiDeleteErrorResultForConstraints(function() {
								var recordsData = context.get("RecordsData");
								var constraintsData = context.get("ByConstraintsData");
								if (!recordsData.getItems().length && !constraintsData.getItems().length) {
									this.showInformationDialog(context.get("Resources.Strings.DeletedSuccessfully"));
								}
							}, this);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
					 * @protected
					 * @overridden
					 */
					getGoogleTagManagerData: function() {
						var data = this.callParent(arguments);
						var operation = this.get("Operation");
						this.Ext.apply(data, {
							action: operation
						});
						return data;
					},

					/**
					 * Checks whether to display as link.
					 * @return {Boolean} True if need to display as link.
					 * @private
					 */
					isNeedRenderAsLink: function() {
						var entityStructure = ModuleUtils.getEntityStructureByName(this.get("DeletedSchemaName"));
						var hasPages = entityStructure ? entityStructure.pages : false;
						return Boolean(hasPages);
					},

					/**
					 * Returns caption for the hierarchical button.
					 * @return {String} Caption for the hierarchical button.
					 * @private
					 */
					getItemHierarchicalCaption: function() {
						var IsShowDetails = this.get("IsShowDetails");
						return IsShowDetails
								? Resources.localizableStrings.MinusCaption
								: Resources.localizableStrings.PlusCaption;
					},

					/**
					 * Returns caption of the item.
					 * @return {String} Caption.
					 * @private
					 */
					getConstraintsItemLabel: function() {
						var caption = this.get("Caption");
						caption = caption.displayValue ? caption.displayValue : caption;
						return caption;
					},

					/**
					 * Ignore record when deleting.
					 * @private
					 */
					ignoreRecord: function() {
						var context = this.moduleContext || this;
						var deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
							rootSchemaName: "MultiDeleteQueue"
						});
						var filters = deleteQuery.filters;
						var idFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("Id"));
						filters.add("IdFilter", idFilter);
						context.showBodyMask();
						deleteQuery.execute(function(response) {
							if (response && response.success) {
								var collection = context.get("ByConstraintsData");
								collection.removeByKey(this.get("RecordId"));
								context.setConstraintsCaption();
							} else {
								this.showInformationDialog(response.ExceptionMessage);
							}
							context.hideBodyMask();
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
					 * @overridden
					 */
					destroy: function() {
						var collection = this.get("ByConstraintsData");
						if (collection) {
							collection.clear();
						}
						collection = this.get("ByRightsData");
						if (collection) {
							collection.clear();
						}
						this.mixins.GridUtilities.destroy.call(this);
						this.callParent(arguments);
					},

					/**
					 * Changes collapsed state of the container.
					 * @param {String} arguments[3] Tag of the container.
					 * @private
					 */
					changeContainerCollapsedState: function() {
						var attributeName = arguments[arguments.length - 1] + "ResultsCollapsed";
						var collapsedState = this.get(attributeName);
						this.set(attributeName, !collapsedState);
						this.updateHistoryInfo();
					},

					/**
					 * Updates currents history state object.
					 * @private
					 */
					updateHistoryInfo: function() {
						var historyState = this.sandbox.publish("GetHistoryState");
						var state = historyState.state || {};
						state.CollapsedStates = this.getCollapsedHistoryStateConfig();
						this.sandbox.publish("ReplaceHistoryState", {
							stateObj: state,
							hash: historyState.hash.historyState,
							silent: true
						});
					},

					/**
					 * Returns history state config object with collapsed states.
					 * @return {Object} Collapsed history state config.
					 * @private
					 */
					getCollapsedHistoryStateConfig: function() {
						return {
							rights: this.get("RightResultsCollapsed"),
							constraints: this.get("ConstraintResultsCollapsed")
						};
					},

					/**
					 * Returns image url for the constraints collapsed button.
					 * @return {String} Image url.
					 * @private
					 */
					getConstraintsCollapsedBtnImage: function() {
						var constraintResultsCollapsedState = this.get("ConstraintResultsCollapsed");
						return this.getCollapsedBtnImage(constraintResultsCollapsedState);
					},

					/**
					 * Returns image url for the rights collapsed button.
					 * @return {String} Image url.
					 * @private
					 */
					getRightsCollapsedBtnImage: function() {
						var rightResultsCollapsedState = this.get("RightResultsCollapsed");
						return this.getCollapsedBtnImage(rightResultsCollapsedState);
					},

					/**
					 * Returns image url for the collapsed button.
					 * @param {Boolean} state Collapsed state.
					 * @return {String} Image url.
					 * @private
					 */
					getCollapsedBtnImage: function(state) {
						return state ? this.get("Resources.Images.ExpandImageBtn")
								: this.get("Resources.Images.CollapsedImageBtn");
					}
				},
				diff: [
					{
						"operation": "insert",
						"name": "ByConstraintsContainer",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"visible": {"bindTo": "VisibleConstraintsContainer"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ByConstraintsTypeImage",
						"parentName": "ByConstraintsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"textClass": ["multi-delete-type-image-textClass"],
								"wrapperClass": ["multi-delete-type-image-wrapClass",
									"multi-delete-type-image-wrapClass-constraints"]
							},
							"imageConfig": {"bindTo": "Resources.Images.ErrorTypes"}
						}
					},
					{
						"operation": "insert",
						"name": "ByConstraintsContainerHeader",
						"parentName": "ByConstraintsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "ConstraintsCaption"},
							"classes": {
								"labelClass": ["container-multi-delete-caption-labelClass"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "ByConstraintsContainerHeaderDeleteButton",
						"parentName": "ByConstraintsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {
								"bindTo": "Resources.Strings.DeleteRecordsButton"
							},
							"imageConfig": {"bindTo": "Resources.Images.DeleteItemIcon"},
							"markerValue": "deleteAllButton",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"hint": {"bindTo": "Resources.Strings.DeleteAllHint"},
							"menu": {
								"items": [
									{
										"caption": {"bindTo": "Resources.Strings.DeleteRecord"},
										"click": {"bindTo": "callDeleteService"},
										"tag": "AllCascadeDelete"
									},
									{
										"caption": {"bindTo": "Resources.Strings.UnlinkRecord"},
										"click": {"bindTo": "callDeleteService"},
										"tag": "AllCascadeUnlink"
									}
								]
							}
						}
					},
					{
						"operation": "insert",
						"name": "ByConstraintsCollapsedBtn",
						"parentName": "ByConstraintsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"wrapperClass": ["multi-delete-collapsed-wrapClass"]
							},
							"imageConfig": {"bindTo": "getConstraintsCollapsedBtnImage"},
							"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							"markerValue": "collapsedConstraints",
							"tag": "Constraint",
							"click": {"bindTo": "changeContainerCollapsedState"}
						}
					},
					{
						"operation": "insert",
						"name": "ByConstraintsContainerList",
						"parentName": "ByConstraintsContainer",
						"propertyName": "items",
						"values": {
							"idProperty": "Id",
							"dataItemIdPrefix": "multi-delete-page",
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"collection": "ByConstraintsData",
							"onGetItemConfig": "getConstraintsItemConfig",
							"selectedItemCssClass": "by-constraints-selected-item-class",
							"rowCssSelector": "by-constraints-selected-item-class"
						}
					},
					{
						"operation": "insert",
						"name": "ByRightsContainer",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"visible": {"bindTo": "VisibleRightsContainer"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ByRightsTypeImage",
						"parentName": "ByRightsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"textClass": ["multi-delete-type-image-textClass"],
								"wrapperClass": ["multi-delete-type-image-wrapClass",
									"multi-delete-type-image-wrapClass-rights"]
							},
							"imageConfig": {"bindTo": "Resources.Images.ErrorTypes"}
						}
					},
					{
						"operation": "insert",
						"name": "ByRightsContainerHeader",
						"parentName": "ByRightsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "getRightsCaption"},
							"classes": {
								"labelClass": ["container-multi-delete-caption-labelClass"]
							}
						}
					},
					{
						"operation": "insert",
						"name": "ByRightsExpandBtn",
						"parentName": "ByRightsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"wrapperClass": ["multi-delete-expand-wrapClass"]
							},
							"imageConfig": {"bindTo": "getRightsCollapsedBtnImage"},
							"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							"markerValue": "expandRight",
							"tag": "Right",
							"click": {"bindTo": "changeContainerCollapsedState"}
						}
					},
					{
						"operation": "insert",
						"name": "DataGrid",
						"parentName": "ByRightsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.GRID,
							"type": Terrasoft.GridType.LISTED,
							"listedZebra": true,
							"activeRow": {"bindTo": "ActiveRow"},
							"collection": {"bindTo": "ByRightsData"},
							"primaryColumnName": "Id",
							"visible": {
								"bindTo": "RightResultsCollapsed",
								"bindConfig": {
									"converter": "invertBooleanValue"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "ByRightsContainer",
						"propertyName": "items",
						"name": "loadMore",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": "loadMore",
							"click": {
								"bindTo": "loadMore"
							},
							"classes": {
								"wrapperClass": ["load-more-button-class"]
							},
							"visible": {
								"bindTo": "CanLoadMoreData"
							}
						}
					}
				]
			};
		});


