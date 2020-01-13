Terrasoft.configuration.Structures["ScoringModelSectionV2"] = {innerHierarchyStack: ["ScoringModelSectionV2"], structureParent: "BaseSectionV2"};
define('ScoringModelSectionV2Structure', ['ScoringModelSectionV2Resources'], function(resources) {return {schemaUId:'096add7c-e244-48e8-a30b-a99a3c9faee8',schemaCaption: "ScoringModelSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'ScoringModelSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ScoringModelSectionV2", [],
	function() {
		return {
			entitySchemaName: "ScoringModel",
			attributes: {
				"CanManageBpmonlineCloudIntegrationSettings": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			messages: {},
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filterGroup = this.callParent(arguments);
					filterGroup.add("ScoringObjectIsInCurrentWorkspace",
						Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "ScoringObject.SysWorkspace.Id",
							Terrasoft.SysValue.CURRENT_WORKSPACE.value, Terrasoft.DataValueType.TEXT));
					return filterGroup;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getCanDesignSection
				 * @overridden
				 */
				getCanDesignSection: function() {
					return false;
				},

				loadGridDataRecord: function(primaryColumnValue, callback, scope) {
					var performanceManagerLabel = "loadGridDataRecord";
					if (scope && scope.hasOwnProperty("sandbox")) {
						performanceManagerLabel = scope.sandbox.id + "_" + performanceManagerLabel;
					} else if (this && this.hasOwnProperty("sandbox")) {
						performanceManagerLabel = this.sandbox.id + "_" + performanceManagerLabel;
					}
					performanceManager.start(performanceManagerLabel);
					var esq = this.getGridDataESQ();
					this.initQueryColumns(esq);
					esq.filters.addItem(this.getFilters());
					this.initQueryEvents(esq);
					var gridData = this.getGridData();
					if (gridData.contains(primaryColumnValue)) {
						var activeRow = gridData.get(primaryColumnValue);
						esq.getEntity(primaryColumnValue, function(response) {
							this.destroyQueryEvents(esq);
							if (!response.success) {
								performanceManager.stop(performanceManagerLabel);
								return;
							}
							var entity = response.entity;
							var activeRowColumns = activeRow.columns;
							this.Terrasoft.each(entity.columns, function(column, columnName) {
								if (activeRowColumns.hasOwnProperty(columnName)) {
									activeRow.set(columnName, entity.get(columnName));
								}
							}, this);
							if (this.Ext.isFunction(callback)) {
								performanceManager.stop(performanceManagerLabel);
								callback.call(scope || this);
							}
							this.onDataChanged();
						}, this);
						performanceManager.stop(performanceManagerLabel);
					} else {
						this.beforeLoadGridDataRecord();
						esq.getEntityCollection(function(response) {
							this.destroyQueryEvents(esq);
							this.afterLoadGridDataRecord();
							if (!response.success) {
								performanceManager.stop(performanceManagerLabel);
								return;
							}
							var responseCollection = response.collection;
							this.prepareResponseCollection(responseCollection);
							this.initIsGridEmpty(responseCollection);
							this.addItemsToGridData(responseCollection, this.getAddRowsOptions());
							if (this.get("IsGridDataLoaded") !== true || this.get("IsGridLoading") === true) {
								this.set("PreloadedGridDataRecords", responseCollection.getKeys());
							}
							this.afterLoadGridDataUserFunction(primaryColumnValue);
							this.onDataChanged();
							if (this.Ext.isFunction(callback)) {
								performanceManager.stop(performanceManagerLabel);
								callback.call(scope || this);
							}
							performanceManager.stop(performanceManagerLabel);
						}, this);
						performanceManager.stop(performanceManagerLabel);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#copyEntity
				 * @overridden
				 */
				copyRecord: function(primaryColumnValue) {
					this.showBodyMask();
					var scoringModel = this.createSectionEntity();
					scoringModel.set("SourceModel", {value: primaryColumnValue});
					var onEntityCopied = scoringModel.saveEntity.bind(scoringModel, this.onCopyRecordSaved, this);
					scoringModel.copyEntity(primaryColumnValue, onEntityCopied, scoringModel);
				},

				/**
				 * Handles saving of the copied record.
				 * @param {Object} result Result of the save operation.
				 */
				onCopyRecordSaved: function(result) {
					if (result.success) {
						this.set("ActiveRow", null);
						var recordId = result.id;
						this.editRecord(recordId);
					} else {
						this.hideBodyMask();
					}
				},

				/**
				 * Creates instance of the EntitySchema of section.
				 * @returns {Terrasoft.BaseViewModel} Instance of the EntitySchema of section.
				 */
				createSectionEntity: function() {
					var entitySchema = this.entitySchema;
					var columns = Terrasoft.DataManager.getViewModelColumns(entitySchema.columns);
					return this.Ext.create("Terrasoft.BaseViewModel", {
							entitySchema: entitySchema,
							columns: columns}
					);
				},

				/**
				 * Opens Bpm'online Cloud Integration settings page.
				 */
				openBpmonlineCloudIntegrationPage: function() {
					this.sandbox.publish("PushHistoryState", {hash: "CardModuleV2/BpmonlineCloudIntegrationPageV2"});
				},

				/**
				 * Creates "OpenBpmonlineCloudIntegrationPage" menu item.
				 * @return {Terrasoft.BaseViewModel} Menu item.
				 */
				createOpenBpmonlineCloudIntegrationPageMenuItem: function() {
					return this.getButtonMenuItem({
						Click: {bindTo: "openBpmonlineCloudIntegrationPage"},
						Caption: {bindTo: "Resources.Strings.GoToBpmonlineCloudIntegrationCaption"},
						Visible: {bindTo: "CanManageBpmonlineCloudIntegrationSettings"}
					});
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getSectionActions
				 * @overridden
				 */
				getSectionActions: function() {
					var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var parentActionMenuItems = this.callParent(arguments);
					parentActionMenuItems.get("Item7").values.Visible = false;
					parentActionMenuItems.each(function(item) {
						actionMenuItems.addItem(item);
					}, this);
					actionMenuItems.addItem(this.createOpenBpmonlineCloudIntegrationPageMenuItem());
					return actionMenuItems;
				},

				/**
				 * Initializes "initCanManageBpmonlineCloudIntegrationSettings" property.
				 * @private
				 */
				initCanManageBpmonlineCloudIntegrationSettings: function() {
					this.checkCanExecuteOperation("CanManageBpmonlineCloudIntegrationSettings",
						this.setCanManageBpmonlineCloudIntegrationSettings, this);
				},

				/**
				 * Sets value of the "CanManageBpmonlineCloudIntegrationSettings" property.
				 * @private
				 * @param {Boolean} value.
				 */
				setCanManageBpmonlineCloudIntegrationSettings: function(value) {
					this.set("CanManageBpmonlineCloudIntegrationSettings", value);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initCanManageBpmonlineCloudIntegrationSettings();
				}
			}
		};
	});


