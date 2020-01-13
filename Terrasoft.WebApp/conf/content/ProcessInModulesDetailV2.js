Terrasoft.configuration.Structures["ProcessInModulesDetailV2"] = {innerHierarchyStack: ["ProcessInModulesDetailV2"], structureParent: "BaseProcessSettingDetailV2"};
define('ProcessInModulesDetailV2Structure', ['ProcessInModulesDetailV2Resources'], function(resources) {return {schemaUId:'da661054-8282-4f64-a8e2-62e700dc70ad',schemaCaption: "ProcessInModulesDetailV2", parentSchemaName: "BaseProcessSettingDetailV2", schemaName:'ProcessInModulesDetailV2',parentSchemaUId:'550e7a82-2e5e-442a-90d2-0008616e822e',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessInModulesDetailV2", ["ConfigurationConstants", "ConfigurationEnums"],
	function(ConfigurationConstants, configurationEnums) {
		return {
			/**
			 * Entity schema name.
			 * @type {String}
			 */
			entitySchemaName: "ProcessInModules",

			messages: {
			},
			attributes: {
			},
			methods: {
				/**
				 * Opens module lookup.
				 * @private
				 */
				openModuleLookup: function() {
					var config = this.getOpenLookupConfig();
					this.openLookup(config, this.addCallBack, this);
				},

				/**
				 * Returns config for open lookup.
				 * @private
				 * @return {Object}
				 */
				getOpenLookupConfig: function() {
					var sysSchemaUId = this.get("MasterRecordId");
					var filterGroup = this.Terrasoft.createFilterGroup();
					var subFilters = this.Terrasoft.createFilterGroup();
					subFilters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysSchemaUId", sysSchemaUId));
					filterGroup.addItem(this.Terrasoft.createNotExistsFilter("[ProcessInModules:SysModule].Id",
						subFilters));
					filterGroup.addItem(this.Terrasoft.createExistsFilter("[SysModuleInWorkplace:SysModule].Id"));
					filterGroup.addItem(this.Terrasoft.createIsNotNullFilter(
						Ext.create("Terrasoft.ColumnExpression", {
							columnPath: "SectionSchemaUId"
						})
					));
					filterGroup.addItem(this.Terrasoft.createExistsFilter(
						"[SysModuleEdit:SysModuleEntity:SysModuleEntity].Id"));
					var config = {
						entitySchemaName: "SysModule",
						multiSelect: true,
						columns: ["Caption"],
						hideActions: true,
						filters: filterGroup
					};
					return config;
				},

				/**
				 * @inheritdoc BaseGridDetailV2#addRecord
				 * @overridden
				 */
				addRecord: function() {
					var masterCardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNewRecord = (masterCardState.state === configurationEnums.CardStateV2.ADD ||
					masterCardState.state === configurationEnums.CardStateV2.COPY);
					if (isNewRecord === true) {
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
						return;
					}
					this.openModuleLookup();
				},

				/**
				 * @inheritdoc BaseGridDetailV2#onCardSaved
				 * @overridden
				 */
				onCardSaved: function() {
					this.openModuleLookup();
				},

				/**
				 * Adds selected sections.
				 * @private
				 * @param {Object} args Selected result.
				 */
				addCallBack: function(args) {
					var schemaUId = this.get("MasterRecordId");
					if (Terrasoft.ProcessEntryPointUtilities.getCanRunProcessFromSection()) {
						Terrasoft.ProcessModuleUtilities.getProcessSchemaParentUIdByUId(schemaUId, function(parentUId) {
							this.addSelectedSections(args.selectedRows, parentUId);
						}, this);
					} else {
						this.addSelectedSections(args.selectedRows, schemaUId);
					}
				},

				/**
				 * Executes selected sections insert query.
				 * @param {Terrasoft.Collection} selectedRows Selected rows collection.
				 * @param {String} parentUId Parent schema identifier.
				 */
				addSelectedSections: function(selectedRows, parentUId) {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					this.selectedRows = selectedRows.getItems();
					this.selectedItems = [];
					this.selectedRows.forEach(function(item) {
						item.SysSchemaUId = parentUId;
						bq.add(this.getProcessInModulesInsertQuery(item));
						this.selectedItems.push(item.value);
					}, this);
					if (bq.queries.length) {
						this.showBodyMask.call(this);
						bq.execute(this.onProcessInModulesInsert, this);
					}
				},

				/**
				 * Returns insert query.
				 * @param {Object} config Configuration object.
				 * @param {String} config.SysSchemaUId Unique identifier of process.
				 * @param {String} config.value Unique identifier of section.
				 * @private
				 */
				getProcessInModulesInsertQuery: function(config) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: this.entitySchemaName
					});
					insert.setParameterValue("SysSchemaUId", config.SysSchemaUId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("SysModule", config.value, this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * Loads the list of sections.
				 * @param {Object} response Server response.
				 * @private
				 */
				onProcessInModulesInsert: function(response) {
					this.hideBodyMask.call(this);
					this.beforeLoadGridData();
					var filterCollection = [];
					response.queryResults.forEach(function(item) {
						filterCollection.push(item.id);
					});
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					this.initQueryColumns(esq);
					esq.filters.add("recordId", Terrasoft.createColumnInFilterWithParameters("Id", filterCollection));
					esq.getEntityCollection(function(response) {
						this.afterLoadGridData();
						if (response.success) {
							var responseCollection = response.collection;
							this.prepareResponseCollection(responseCollection);
							this.getGridData().loadAll(responseCollection);
						}
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: Terrasoft.emptyFn
			},

			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"rowDataItemMarkerColumnName": "SysModule",
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "CaptionListedGridColumn",
									"bindTo": "Caption",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"column": 1,
										"colSpan": 24
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 3
							},
							"items": [
								{
									"name": "CaptionTiledGridColumn",
									"bindTo": "Caption",
									"type": Terrasoft.GridCellType.TEXT,
									"position": {
										"row": 1,
										"column": 1,
										"colSpan": 24
									},
									"captionConfig": {
										"visible": true
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


