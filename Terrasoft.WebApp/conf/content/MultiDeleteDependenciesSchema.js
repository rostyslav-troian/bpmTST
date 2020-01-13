Terrasoft.configuration.Structures["MultiDeleteDependenciesSchema"] = {innerHierarchyStack: ["MultiDeleteDependenciesSchema"]};
define('MultiDeleteDependenciesSchemaStructure', ['MultiDeleteDependenciesSchemaResources'], function(resources) {return {schemaUId:'bf473e44-f867-43bd-8b37-d4bbc965d6bb',schemaCaption: "MultiDeleteDependenciesSchema", parentSchemaName: "", schemaName:'MultiDeleteDependenciesSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MultiDeleteDependenciesSchema", ["ServiceHelper", "ContainerListGenerator",
			"MultiDeleteDependenciesSchemaResources"],
		function(ServiceHelper) {
			return {
				messages: {
					/**
					 * @message GetConfig
					 * Returns config of item.
					 */
					"GetConfig": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				attributes: {
					/**
					 * Collection of the constrain errors.
					 */
					"DependentEntities": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Count of the start processes where current entity is used.
					 */
					"RunProcessCount": {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						value: 0
					}
				},
				methods: {
					/**
					 * @inheritDoc Terrasoft.configuration.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function() {
						var dependentEntities = this.Ext.create("Terrasoft.Collection");
						this.set("DependentEntities", dependentEntities);
						this.callParent(arguments);
						this.loadDependencies();
					},

					/**
					 * Create view model item by config.
					 * @param {Object} config Config.
					 * return {Terrasoft.BaseViewModel} Item with view model.
					 * @private
					 */
					createItemViewModel: function(config) {
						var itemWithModel = Ext.create("Terrasoft.BaseViewModel", {
							values: {
								DeletedEntitySchemaName: this.get("DeletedEntitySchemaName"),
								DeletedRecordId: this.get("DeletedRecordId"),
								ItemId: this.get("ItemId"),
								Name: config.EntitySchemaName,
								Caption: config.EntitySchemaCaption,
								Columns: config.ColumnsName,
								CanRead: config.CanRead,
								RecordsCount: config.RecordsCount
							}
						});
						itemWithModel.sandbox = this.sandbox;
						itemWithModel.Terrasoft = this.Terrasoft;
						itemWithModel.Ext = this.Ext;
						itemWithModel.renderDetail = this.renderDetail;
						itemWithModel.getModuleId = this.getModuleId;
						itemWithModel.getPageSchemaName = this.getPageSchemaName;
						itemWithModel.getDetailSchemaName = this.getDetailSchemaName;
						itemWithModel.getDetailProfileKey = this.getDetailProfileKey;
						itemWithModel.getRenderToContainer = this.getRenderToContainer;
						itemWithModel.getItemConfig = this.getItemConfig;
						itemWithModel.getCaptionWithCount = this.getCaptionWithCount;
						return itemWithModel;
					},

					/**
					 * Load dependencies for record.
					 * @private
					 */
					loadDependencies: function() {
						this.Terrasoft.chain(
								this.setProcessDependenciesCount,
								this.callDependentEntitiesService,
								this
						);
					},

					/**
					 * Calls service that returns entity dependents.
					 * @private
					 */
					callDependentEntitiesService: function() {
						var config = this.getDependentEntitiesServiceConfig();
						ServiceHelper.callService(config);
					},

					/**
					 * Sets count of the process where is used current entity.
					 * @param {Function} callback Callback.
					 * @param {Object} scope Callback execution scope.
					 * @private
					 */
					setProcessDependenciesCount: function(callback, scope) {
						var esq = this.getProcessDependenciesEsq();
						esq.getEntityCollection(function(response) {
							if (response && response.collection) {
								var result = response.collection.getByIndex(0);
								var count = result.get("Count");
								this.set("RunProcessCount", count);
							}
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Returns entity schema query for getting count of the processes where current entity is use.
					 * @return {Terrasoft.EntitySchemaQuery} Entity schema query or the count of the processes.
					 * @private
					 */
					getProcessDependenciesEsq: function() {
						var esq =  this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "VwEntityInProcess"
						});
						esq.addAggregationSchemaColumn("RecordId", this.Terrasoft.AggregationType.COUNT, "Count");
						var filter = this.Ext.create("Terrasoft.FilterGroup");
						filter.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"EntitySchemaName", this.get("DeletedEntitySchemaName")));
						filter.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"RecordId", this.get("DeletedRecordId")));
						esq.filters.add(filter);
						return esq;
					},

					/**
					 * Returns configuration object for GetDependentEntities service.
					 * @return {Object} Configuration object for GetDependentEntities service.
					 * @private
					 */
					getDependentEntitiesServiceConfig: function() {
						var entitySchemaName = this.get("DeletedEntitySchemaName");
						var recordId = this.get("DeletedRecordId");
						return {
							serviceName: "EntityDependenciesService",
							methodName: "GetDependentEntities",
							data: {
								entitySchemaName: entitySchemaName,
								recordId: recordId
							},
							callback: this.fillDependencies,
							scope: this
						};
					},

					/**
					 * Fill dependencies collection by server response.
					 * @param {Object} response Server response.
					 * @private
					 */
					fillDependencies: function(response) {
						var dependentEntities = this.get("DependentEntities");
						var tmpItemsCollection = this.Ext.create("Terrasoft.Collection");
						if (response && response.GetDependentEntitiesResult) {
							var itemsCollection = response.GetDependentEntitiesResult;
							this.addProcessDependencies(itemsCollection);
							this.Terrasoft.each(itemsCollection, function(item) {
								var itemWithModel = this.createItemViewModel(item);
								tmpItemsCollection.add(item.EntitySchemaName, itemWithModel);
							}, this);
						}
						dependentEntities.loadAll(tmpItemsCollection);
						this.hideBodyMask();
					},

					/**
					 * Adds process dependencies into the dependencies collection.
					 * @param {Array} itemsCollection Dependencies collection.
					 */
					addProcessDependencies: function(itemsCollection) {
						var runProcessCount = this.get("RunProcessCount");
						if (runProcessCount > 0) {
							itemsCollection.push({
								CanRead: true,
								ColumnsName: ["RecordId"],
								EntitySchemaName: "VwEntityInProcess",
								RecordsCount: runProcessCount,
								EntitySchemaCaption: this.get("Resources.Strings.ProcessDetailCaption")
							});
						}
					},

					/**
					 * Render detail into container.
					 * @private
					 */
					renderDetail: function() {
						var id = this.getModuleId();
						var container = this.getRenderToContainer();
						this.sandbox.loadModule("MultiDeleteDetailModuleV2", {
							id: id,
							renderTo: container,
							instanceConfig: {
								entitySchemaName: this.get("Name")
							}
						});
						this.sandbox.subscribe("GetConfig", this.getItemConfig, this, [id]);
					},

					/**
					 * Returns item config.
					 * @return {Object} Item config.
					 * @private
					 */
					getItemConfig: function() {
						var profileKey = this.getDetailProfileKey();
						var schemaCaption = this.getCaptionWithCount();
						return {
							caption: schemaCaption,
							groupId: this.get("DeletedRecordId"),
							canRead: this.get("CanRead"),
							entitySchemaName: this.get("Name"),
							referenceRecordId: this.get("DeletedRecordId"),
							referenceColumns: this.get("Columns"),
							recordsCount: this.get("RecordsCount"),
							profileKey: profileKey
						};
					},

					/**
					 * Returns caption with count rows.
					 * @return {String} Caption.
					 */
					getCaptionWithCount: function() {
						return this.get("Caption") + " (" + this.get("RecordsCount") + ")";
					},

					/**
					 * Returns id for module.
					 * @return {String} Module identifier.
					 * @private
					 */
					getModuleId: function() {
						var id = "MultiDeleteDetailModule" + this.getDetailSchemaName() + this.getDetailSchemaName() +
								this.get("DeletedRecordId");
						return id;
					},

					/**
					 * Returns name of page.
					 * @return {String} Name of page.
					 * @private
					 */
					getPageSchemaName: function() {
						return this.get("DeletedEntitySchemaName") + "PageV2";
					},

					/**
					 * Returns name of detail.
					 * @return {String} Name of detail.
					 * @private
					 */
					getDetailSchemaName: function() {
						return this.get("Name") + "DetailV2";
					},

					/**
					 * Returns profile key.
					 * @return {String} Profile key.
					 * @private
					 */
					getDetailProfileKey: function() {
						var cardPageName = this.getPageSchemaName();
						var detailName = this.getDetailSchemaName();
						return cardPageName + detailName;
					},

					/**
					 * Returns name of container to render.
					 * @return {String} Name of container.
					 * @private
					 */
					getRenderToContainer: function() {
						var itemId = this.get("ItemId");
						var name = this.get("Name");
						return name + "-" + name + "-" + itemId;
					},

					/**
					 * Returns item view config.
					 * @param {Object} itemConfig Item config.
					 * @param {Terrasoft.BaseViewModel} item View model of item.
					 * @return {Object} Item view config.
					 * @private
					 */
					getItemViewConfig: function(itemConfig, item) {
						var containerId = item.get("Name");
						itemConfig.config = {
							id: containerId,
							className: "Terrasoft.Container",
							items: [],
							classes: {
								wrapClassName: ["constraints-item-container"]
							},
							afterrender: {bindTo: "renderDetail"}
						};
						return itemConfig;
					}
				},
				diff: [
					{
						"operation": "insert",
						"name": "ByConstraintDetailsContainer",
						"values": {
							"generateId": true,
							"idProperty": "Name",
							"dataItemIdPrefix": "multi-delete-detail",
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"collection": "DependentEntities",
							"onGetItemConfig": "getItemViewConfig",
							"selectedItemCssClass": "by-constraints-selected-item-class",
							"rowCssSelector": "by-constraints-selected-item-class"
						}
					}
				]
			};
		});


