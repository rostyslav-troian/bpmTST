Terrasoft.configuration.Structures["TimelineSchema"] = {innerHierarchyStack: ["TimelineSchema"]};
define('TimelineSchemaStructure', ['TimelineSchemaResources'], function(resources) {return {schemaUId:'efe9426a-d6f3-474f-aeb2-36a4862515a2',schemaCaption: "Timeline schema", parentSchemaName: "", schemaName:'TimelineSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TimelineSchema", ["StorageUtilities", "TimelineManager", "TimelineItemsViewGenerator",
		"ContainerListPaginationGenerator", "BaseTimelineItemViewModel", "BaseTimelineItemView", "TimelineDataStorage",
		"TimelineFiltersSchema", "css!TimelineCSS"
	],
	function(StorageUtilities) {
		return {
			messages: {

				/**
				 * @message GetTimelineEntitiesConfig
				 * Returns timeline entities config.
				 */
				"GetTimelineEntitiesConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message EntityInitialized
				 * Master's entity initialized event.
				 */
				"EntityInitialized": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message TimelineFiltersChanged
				 * Notification about changes filter.
				 */
				"TimelineFiltersChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetTimelineConfig
				 * Returns timeline configuration.
				 */
				"GetTimelineConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message PushHistoryState
				 * Notification about changes in the chain.
				 */
				"PushHistoryState": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ActionsDashboardMessagePublished
				 * Notification about new message added in action dashboard.
				 */
				"ActionsDashboardMessagePublished": {
					"mode": this.Terrasoft.MessageMode.BROADCAST,
					"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetHistoryState
				 * Message to get current history state.
				 */
				"GetHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetTimelineFiltersIsEmpty
				 */
				"GetTimelineFiltersIsEmpty": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SaveTimelineFilters
				 */
				"SaveTimelineFilters": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetColumnsValues
				 * Requests the values of columns from target object.
				 */
				"GetColumnsValues": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetEntityInfo
				 * Returns information about an entity.
				 */
				"GetEntityInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				* @message ProcessExecDataChanged
				* Defines that process parameters must be send.
				 */
				"ProcessExecDataChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * The maximum default count of visible items.
				 */
				"MaxVisibleItemsCount": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Timeline page size.
				 */
				"TimelinePageSize": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: 10
				},

				/**
				 * Timeline items collection.
				 */
				"TimelineItems": {
					columnPath: "TimelineItems",
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					isCollection: true,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Indicates state of loading timeline items.
				 */
				"IsTimelineItemsLoading": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Indicates state of loading timeline schema and other relates schemas.
				 */
				"IsTimelineSchemasLoading": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Indicates state of empty timeline.
				 */
				"IsTimelineEmpty": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * Default item view class name.
				 */
				"DefaultItemViewClassName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "Terrasoft.BaseTimelineItemView"
				},

				/**
				 * Default timeline data storage class name.
				 */
				"DefaultTimelineDataStorageClassName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "Terrasoft.TimelineDataStorage"
				},

				/**
				 * Default order direction for timeline items.
				 */
				"DefaultOrderDirection": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: this.Terrasoft.OrderDirection.DESC
				},

				/**
				 * Current order direction icon.
				 */
				"OrderDirectionIcon": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Identifier of timeline active item.
				 */
				"ActiveItemId": {
					dataValueType: this.Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: null
				},

				/**
				 * Timeline configuration object.
				 */
				"TimelineConfig": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Timeline filters object stored in user profile.
				 */
				"TimelineFiltersProfile": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				// region Methods: Protected

				/**
				 * Saves timeline filters to profile.
				 * @protected
				 * @param {Object} config Timeline config.
				 */
				saveTimelineFiltersToProfile: function(config) {
					var timelineFilters = config.filters || {};
					timelineFilters.orderDirection = config.orderDirection;
					this.sandbox.publish("SaveTimelineFilters", timelineFilters, [this.getTimelineFilterModuleId()]);
				},

				/**
				 * Initializes timeline data storage by config.
				 * @param {Object} config Configuration for storage. If it is empty then configuration for storage
				 * will be initialized.
				 * @protected
				 */
				initDataStorage: function(config) {
					this.set("MaxVisibleItemsCount", 0);
					var storage = this.getTimelineDataStorage();
					storage.clear();
					this.$IsTimelineEmpty = true;
					storage.init(config);
					this.initMasterEntityInfo();
					this.initOrderDirectionIcon();
				},

				/**
				 * Determines order direction icon depending on current order direction of timeline items.
				 * @protected
				 */
				initOrderDirectionIcon: function() {
					var timelineConfig = this.$TimelineConfig;
					var orderDirectionIcon = timelineConfig.orderDirection === Terrasoft.OrderDirection.ASC
						? this.get("Resources.Images.OrderDirectionAscIcon")
						: this.get("Resources.Images.OrderDirectionDescIcon");
					this.set("OrderDirectionIcon", orderDirectionIcon);
				},

				/**
				 * Returns entity config key.
				 * @protected
				 * @param {Object} entityConfig Entity configuration.
				 * @return {String} Entity config key.
				 */
				getEntityConfigKey: function(entityConfig) {
					var entityConfigKey = entityConfig.entityConfigKey;
					if (this.isEmpty(entityConfigKey)) {
						entityConfigKey = !this.Ext.isEmpty(entityConfig.typeColumnValue)
							? this.Ext.String.format("{0}_{1}", entityConfig.entitySchemaName, entityConfig.typeColumnValue)
							: entityConfig.entitySchemaName;
					}
					return entityConfigKey;
				},

				/**
				 * Sets entities config.
				 * @protected
				 * @param {Array} pageEntities Entities configuration.
				 */
				applyEntitiesConfig: function(pageEntities) {
					var defaultIcon = this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultIcon"));
					var baseEntitiesConfig = this.Terrasoft.deepClone(this.Terrasoft.TimelineManager.getTileConfig());
					this.Terrasoft.each(pageEntities, function(entityConfig, index, list) {
						this.initEntityMasterColumnValue(entityConfig);
						entityConfig.entityConfigKey = this.getEntityConfigKey(entityConfig);
						var baseEntityConfig = this.Ext.Array.findBy(baseEntitiesConfig, function(item) {
							var areEntityConfigKeyEqual = item.entityConfigKey === entityConfig.entityConfigKey;
							var areMainAttributesEqual = item.entitySchemaName === entityConfig.entitySchemaName &&
								item.typeColumnValue === entityConfig.typeColumnValue;
							return areEntityConfigKeyEqual || areMainAttributesEqual;
						}, this);
						if (!this.Ext.isEmpty(baseEntityConfig)) {
							list[index] = this.Ext.apply(baseEntityConfig, entityConfig);
						} else {
							entityConfig.iconUrl = defaultIcon;
						}
					}, this);
				},

				/**
				 * Inits entity master column value.
				 * @protected
				 * @param {Object} entityConfig Entity configuration.
				 */
				initEntityMasterColumnValue: function(entityConfig) {
					var masterRecord = this.sandbox.publish("GetColumnsValues",
						[entityConfig.masterRecordColumnName], [this.sandbox.id])[entityConfig.masterRecordColumnName];
					entityConfig.masterRecordValue = this.Ext.isObject(masterRecord) ? masterRecord.value : masterRecord;
				},

				/**
				 * Initializes information about timeline master record entity.
				 * @protected
				 */
				initMasterEntityInfo: function() {
					var entityInfo = this.sandbox.publish("GetEntityInfo", null, [this.sandbox.id]);
					var timelineConfig = this.$TimelineConfig;
					timelineConfig.masterEntityInfo = entityInfo;
				},

				/**
				 * Initializes timeline configuration.
				 * @protected
				 */
				initTimelineConfig: function() {
					var timelineConfig = this.Terrasoft.deepClone(this.get("InitialConfig")) || {};
					var entities = this.Terrasoft.TimelineManager.getTimelinePageConfig(this.$CardSchemaName);
					entities = this.Ext.isArray(entities) ? entities : [];
					this.applyEntitiesConfig(entities);
					timelineConfig.entities = entities;
					var profile = this.$TimelineFiltersProfile || {};
					timelineConfig.sandbox = this.sandbox;
					timelineConfig.queryRowCount = this.get("TimelinePageSize");
					timelineConfig.orderDirection = profile.orderDirection || this.get("DefaultOrderDirection");
					this.$TimelineConfig = timelineConfig;
				},

				/**
				 * Sets group caption for timeline item.
				 * @protected
				 * @param {Terrasoft.BaseViewModel} item Timeline collection item.
				 */
				setGroupCaption: function(item) {
					var date = item.get("TimelineSortDate");
					var groupCaption = "";
					if (this.Ext.isDate(date)) {
						var cultureSettings = this.Terrasoft.Resources.CultureSettings;
						var monthNames = cultureSettings.monthNames;
						groupCaption = this.Ext.String.format("{0} {1}", monthNames[date.getMonth()],
							date.getFullYear());
					}
					item.set("GroupCaption", groupCaption);
				},

				/**
				 * Initializes group captions.
				 * @protected
				 */
				initGroupCaptions: function() {
					var storage = this.getTimelineDataStorage();
					var firstItem = storage.first();
					if (!this.isEmpty(firstItem)) {
						this.setGroupCaption(firstItem);
						var previousItem = firstItem;
						storage.each(function(currentItem, index, length) {
							if (index !== 0 && length > index) {
								var date1 = previousItem.get("TimelineSortDate");
								var date2 = currentItem.get("TimelineSortDate");
								var date1Month = this.Ext.isDate(date1) ? date1.getMonth() : -1;
								var date2Month = this.Ext.isDate(date2) ? date2.getMonth() : -1;
								var date1Year = this.Ext.isDate(date1) ? date1.getFullYear() : -1;
								var date2Year = this.Ext.isDate(date2) ? date2.getFullYear() : -1;
								if (date1Month !== date2Month || date1Year !== date2Year) {
									this.setGroupCaption(currentItem);
								}
								previousItem = currentItem;
							}
						}, this);
					}
				},

				/**
				 * Initializes expand-collapse ability of items.
				 * @protected
				 * @param {Terrasoft.Collection} collection Collection of timeline items to modify.
				 */
				initItemsExpandCollapseState: function(collection) {
					this.Terrasoft.each(collection, function(item) {
						item.subscribeOnColumnChange("IsCollapsed", this.onItemExpandCollapse, this);
					}, this);
				},

				/**
				 * Handles timeline item expand/collapse event.
				 * @protected
				 * @param {Terrasoft.BaseModel} model Item model object.
				 * @param {Boolean} value Item 'IsExpanded' property value.
				 */
				onItemExpandCollapse: function(model, value) {
					var activeItemId = value === true
						? model.get("Id")
						: null;
					this.set("ActiveItemId", activeItemId);
				},

				/**
				 * Loads timeline data.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				loadData: function(callback, scope) {
					this.$IsTimelineItemsLoading = true;
					var storage = this.getTimelineDataStorage();
					storage.loadData(function(addedItems) {
						if (!Ext.isEmpty(addedItems)) {
							this.$MaxVisibleItemsCount += addedItems.getCount();
							this.initGroupCaptions();
							this.initItemsExpandCollapseState(addedItems);
						}
						this.$IsTimelineItemsLoading = false;
						this.$IsTimelineEmpty = false;
						this.$IsTimelineEmpty = storage.isEmpty();
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Creates new instance of timeline data storage.
				 * @protected
				 * @return {Terrasoft.TimelineDataStorage} Timeline data storage.
				 */
				createTimelineDataStorage: function() {
					return this.Ext.create(this.get("DefaultTimelineDataStorageClassName"));
				},

				/**
				 * Returns timeline data storage.
				 * @protected
				 * @return {Terrasoft.TimelineDataStorage} Timeline data storage.
				 */
				getTimelineDataStorage: function() {
					var storage = this.get("TimelineItems");
					if (this.Ext.isEmpty(storage)) {
						storage = this.createTimelineDataStorage();
						this.set("TimelineItems", storage);
					}
					return storage;
				},

				/**
				 * Creates new instance of View Generator.
				 * @protected
				 * @return {Terrasoft.ViewGenerator} View Generator.
				 */
				createItemsViewGenerator: function() {
					var viewGenerator = this.Ext.create("Terrasoft.TimelineItemsViewGenerator");
					return viewGenerator;
				},

				/**
				 * Gets instance of View Generator.
				 * @protected
				 * @return {Terrasoft.ViewGenerator} View Generator.
				 */
				getItemsViewGenerator: function() {
					var viewGenerator = this.get("TimelineItemsViewGenerator");
					if (this.Ext.isEmpty(viewGenerator)) {
						viewGenerator = this.createItemsViewGenerator();
						this.set("TimelineItemsViewGenerator", viewGenerator);
					}
					return viewGenerator;
				},

				/**
				 * Returns view config by item.
				 * @protected
				 * @param {Terrasoft.BaseTimelineItemViewModel} item Container list item.
				 * @return {Object} View config by item.
				 */
				getItemViewConfig: function(item) {
					var storageGroupName = "TimelineViews";
					var viewClassName = item.get("TimelineViewClassName") || this.get("DefaultItemViewClassName");
					var itemViewConfig = StorageUtilities.getItem(storageGroupName, viewClassName);
					if (!itemViewConfig) {
						var itemViewConfigItem = this.Ext.create(viewClassName);
						itemViewConfig = itemViewConfigItem.getViewConfig();
						StorageUtilities.setItem(itemViewConfig, storageGroupName, viewClassName);
					}
					return itemViewConfig;
				},

				/**
				 * Reinitializes timeline config.
				 * @param {Object} timelineConfig Timeline config.
				 */
				reinitTimelineConfig: function(timelineConfig) {
					this.Terrasoft.each(timelineConfig.entities, function(entity) {
						this.initEntityMasterColumnValue(entity);
					}, this);
				},

				/**
				 * Handles entity initialization.
				 * @protected
				 */
				onEntityInitialized: function() {
					this.$IsTimelineItemsLoading = true;
					var timelineConfig = this.$TimelineConfig;
					this.reinitTimelineConfig(timelineConfig);
					this.initDataStorage(timelineConfig);
					this.loadData();
				},

				/**
				 * Reloads timeline data by filter config.
				 * @protected
				 * @param {Object} timelineFilters Filter config.
				 */
				onChangedFilter: function(timelineFilters) {
					this.$IsTimelineItemsLoading = true;
					var timelineConfig = this.$TimelineConfig;
					timelineConfig.filters = timelineFilters;
					if (timelineFilters.orderDirection) {
						timelineConfig.orderDirection = timelineFilters.orderDirection;
					}
					this.initDataStorage(timelineConfig);
					this.loadData();
				},

				/**
				 * Returns timeline config.
				 * @protected
				 * @return {Object} Timeline config.
				 */
				onGetTimelineConfig: function() {
					return this.$TimelineConfig;
				},

				/**
				 * Subscribes on sandbox events.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					var sandbox = this.sandbox;
					var messageTags = [sandbox.id];
					sandbox.subscribe("EntityInitialized", this.onEntityInitialized, this, messageTags);
					sandbox.subscribe("TimelineFiltersChanged", this.onChangedFilter, this,
						[this.getTimelineFilterModuleId()]);
					sandbox.subscribe("GetTimelineConfig", this.onGetTimelineConfig, this,
						[this.getTimelineFilterModuleId()]);
					sandbox.subscribe("ActionsDashboardMessagePublished", this.onActionsDashboardMessagePublished, this);
				},

				/**
				 * Reloads timeline data when actions dashboard message published.
				 * @protected
				 * @param {Object} messageInfo Message parameters.
				 */
				onActionsDashboardMessagePublished: function(messageInfo) {
					var storage = this.getTimelineDataStorage();
					storage.checkRecordCanBeVisible(messageInfo, function(needToReload) {
						if (needToReload) {
							this.$IsTimelineItemsLoading = true;
							storage.clear();
							var timelineConfig = this.$TimelineConfig;
							this.initDataStorage(timelineConfig);
							this.loadData();
						}
					}, this);
				},

				/**
				 * Returns identifier of the TimelineFiltersSchema.
				 * @protected
				 * @return {String} Identifier.
				 */
				getTimelineFilterModuleId: function() {
					return this.getModuleId("TimelineFilters");
				},

				/**
				 * Returns default empty timeline message properties.
				 * @return {Object} Default empty timeline message properties.
				 * @protected
				 */
				getDefaultEmptyTimelineMessageProperties: function() {
					return {
						title: this.get("Resources.Strings.EmptyFilterTitle"),
						description: this.get("Resources.Strings.EmptyFilterDescription"),
						image: this.get("Resources.Images.EmptyFilterImage")
					};
				},

				/**
				 * Applies empty timeline collection message properties.
				 * @param {Object} messageProperties Empty timeline collection message properties.
				 * @protected
				 */
				applyEmptyTimelineCollectionMessageProperties: function(messageProperties) {
					this.Ext.apply(messageProperties, {
						title: this.get("Resources.Strings.EmptyInfoTitle"),
						description: this.get("Resources.Strings.EmptyInfoDescription"),
						image: this.get("Resources.Images.EmptyInfoImage")
					});
				},

				/**
				 * Returns empty timeline image container view config.
				 * @protected
				 * @param {Object} messageProperties Empty message properties.
				 * @return {Object} Empty timeline image container view config.
				 */
				getEmptyTimelineImageContainerViewConfig: function(messageProperties) {
					return {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["image-container"]
						},
						items: [{
							className: "Terrasoft.ImageEdit",
							readonly: true,
							classes: {
								wrapClass: ["image-control"]
							},
							imageSrc: this.Terrasoft.ImageUrlBuilder.getUrl(messageProperties.image)
						}]
					};
				},

				/**
				 * Returns empty timeline title container view config.
				 * @protected
				 * @param {Object} messageProperties Empty message properties.
				 * @return {Object} Empty timeline title container view config.
				 */
				getEmptyTimelineTitleContainerViewConfig: function(messageProperties) {
					return {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["title"]
						},
						items: [{
							className: "Terrasoft.Label",
							caption: messageProperties.title
						}]
					};
				},

				/**
				 * Returns empty timeline description container view config.
				 * @protected
				 * @param {Object} messageProperties Empty message properties.
				 * @return {Object} Empty timeline description container view config.
				 */
				getEmptyTimelineDescriptionContainerViewConfig: function(messageProperties) {
					return {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["description"]
						},
						items: [{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["action"]
							},
							items: [{
								className: "Terrasoft.Label",
								caption: messageProperties.description
							}]
						}]
					};
				},

				/**
				 * Returns empty timeline message view config.
				 * @protected
				 * @param {Object} messageProperties Empty message properties.
				 * @return {Object} Empty timeline message view config.
				 */
				getEmptyTimelineMessageViewConfig: function(messageProperties) {
					return {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["empty-grid-message"]
						},
						items: [
							this.getEmptyTimelineImageContainerViewConfig(messageProperties),
							this.getEmptyTimelineTitleContainerViewConfig(messageProperties),
							this.getEmptyTimelineDescriptionContainerViewConfig(messageProperties)
						]
					};
				},

				/**
				 * Requires modules containing viewClass and viewModelClass of timeline tiles.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				requireTileClasses: function(callback, scope) {
					var viewModuleNames = [];
					var resourcesModuleNames = [];
					var timelineConfig = this.$TimelineConfig;
					var resourcesSuffix = "Resources";
					this.Terrasoft.each(timelineConfig.entities, function(entityConfig) {
						var viewModuleName = this.getAmdModuleName(entityConfig.viewClassName || this.Ext.emptyString);
						var viewModelModuleName =
							this.getAmdModuleName(entityConfig.viewModelClassName || this.Ext.emptyString);
						if (viewModuleName && viewModuleNames.indexOf(viewModuleName) < 0) {
							var viewResourcesModuleName = viewModuleName + resourcesSuffix;
							viewModuleNames.push(viewModuleName);
							resourcesModuleNames.push(viewResourcesModuleName);
						}
						if (viewModelModuleName && viewModuleNames.indexOf(viewModelModuleName) < 0) {
							var viewModelResourcesModuleName = viewModelModuleName + resourcesSuffix;
							viewModuleNames.push(viewModelModuleName);
							resourcesModuleNames.push(viewModelResourcesModuleName);
						}
					}, this);
					this.Terrasoft.require(viewModuleNames, function() {
						this.Terrasoft.require(resourcesModuleNames, callback, scope);
					}, this);
				},

				/**
				 * Loads modules containing data providers.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				requireDataProviders: function(callback, scope) {
					var moduleNames = [];
					var timelineConfig = this.$TimelineConfig;
					Terrasoft.each(timelineConfig.entities, function(entityConfig) {
						var dataProviderClassName = entityConfig.dataProviderClassName || this.Ext.emptyString;
						var amdModuleName = this.getAmdModuleName(dataProviderClassName);
						if (moduleNames.indexOf(amdModuleName) < 0) {
							moduleNames.push(amdModuleName);
						}
					}, this);
					Terrasoft.require(moduleNames, callback, scope);
				},

				/**
				 * Builds name of AMD module containing specified Ext class.
				 * @protected
				 * @param {String} className Name of the Ext class that should be loaded by AMD.
				 */
				getAmdModuleName: function(className) {
					var regex = /[^.]*$/;
					return className.match(regex)[0];
				},

				// endregion

				// region Methods: Public

				/**
				 * Generates configuration of the element view.
				 * @param {Object} itemConfig Link to the configuration element of ContainerList.
				 * @param {Terrasoft.BaseTimelineItemViewModel} item Container list item.
				 */
				onGetItemConfig: function(itemConfig, item) {
					var viewGenerator = this.getItemsViewGenerator();
					var itemViewConfig = this.getItemViewConfig(item);
					var view = viewGenerator.generateViewWithCustomGenerators(itemViewConfig);
					itemConfig.config = view[0];
				},

				/**
				 * Performs loading next page of data.
				 */
				onLoadNext: function() {
					this.loadData();
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @override
				 */
				init: function(callback, scope) {
					this.$IsTimelineSchemasLoading = true;
					this.subscribeSandboxEvents();
					this.callParent([function() {
						this.Terrasoft.chain(
							this.initTimelineFiltersProfile,
							function(next) {
								this.Terrasoft.TimelineManager.initialize(next, this);
							},
							function(next) {
								this.initTimelineConfig();
								next();
							},
							this.requireDataProviders,
							function(next) {
								this.initDataStorage(this.$TimelineConfig);
								next();
							},
							this.requireTileClasses,
							function() {
								this.Ext.callback(callback, scope);
								this.$IsTimelineSchemasLoading = false;
							}, this);
					}, this]);
				},

				/**
				 * Initializes timeline filters profile.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				initTimelineFiltersProfile: function(callback, scope) {
					var profileKey = this.$CardSchemaName + "TimelineFilters";
					var sessionFilters = StorageUtilities.getItem("TimelineFilters", profileKey);
					if (sessionFilters) {
						this.$TimelineFiltersProfile = sessionFilters;
						this.Ext.callback(callback, scope);
						return;
					}
					this.Terrasoft.require(["profile!" + profileKey], function(profile) {
						if (profile && profile.timelineFilters) {
							this.$TimelineFiltersProfile = profile.timelineFilters;
						}
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Changes timeline items order direction and reloads them.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 */
				reverseTimelineItems: function(callback, scope) {
					if (this.$IsTimelineItemsLoading) {
						this.Ext.callback(callback, scope);
						return;
					}
					this.$IsTimelineItemsLoading = true;
					var timelineConfig = this.$TimelineConfig;
					timelineConfig.orderDirection = timelineConfig.orderDirection === this.Terrasoft.OrderDirection.ASC
							? this.Terrasoft.OrderDirection.DESC
							: this.Terrasoft.OrderDirection.ASC;
					this.initDataStorage(timelineConfig);
					this.loadData(callback, scope);
					this.saveTimelineFiltersToProfile(timelineConfig);
				},

				/**
				 * Applies empty timeline message view config.
				 * @param {Object} config Empty ContainerList message view config.
				 */
				applyEmptyTimelineMessageConfig: function(config) {
					if (this.$IsTimelineItemsLoading || this.$IsTimelineSchemasLoading) {
						return;
					}
					var timelineFiltersIsEmpty = this.sandbox.publish("GetTimelineFiltersIsEmpty", null,
						[this.getTimelineFilterModuleId()]);
					var messageProperties = this.getDefaultEmptyTimelineMessageProperties();
					if (timelineFiltersIsEmpty === true || timelineFiltersIsEmpty === null) {
						this.applyEmptyTimelineCollectionMessageProperties(messageProperties);
					}
					var emptyMessageViewConfig = this.getEmptyTimelineMessageViewConfig(messageProperties);
					this.Ext.apply(config, emptyMessageViewConfig);
				}

				// endregion

			},
			modules: /**SCHEMA_MODULES*/ {
				"TimelineFilters": {
					"config": {
						"schemaName": "TimelineFiltersSchema",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CardSchemaName": {
									"attributeValue": "CardSchemaName"
								}
							}
						}
					}
				}
			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "TimelineContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-container"]
					},
					"items": []
				},
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "TimelineToolsContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-tools-container"]
					},
					"items": []
				},
				"parentName": "TimelineContainer",
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "LeftTimelineToolsContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-tools-left-container"]
					},
					"items": []
				},
				"parentName": "TimelineToolsContainer",
				"propertyName": "items"
			}, {
				"operation": "insert",
				"parentName": "LeftTimelineToolsContainer",
				"propertyName": "items",
				"name": "TimelineFilters",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.MODULE
				}
			}, {
				"operation": "insert",
				"name": "RightTimelineToolsContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-tools-right-container"]
					},
					"items": []
				},
				"parentName": "TimelineToolsContainer",
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "OrderDirectionButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"controlConfig": {
						"imageConfig": {
							"bindTo": "OrderDirectionIcon"
						}
					},
					"caption": {
						"bindTo": "Resources.Strings.OrderDirectionCaption"
					},
					"click": {
						"bindTo": "reverseTimelineItems"
					},
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
					"markerValue": "OrderDirectionButton",
					"classes": {
						"wrapperClass": ["timeline-order-direction-button", "timeline-right-tools-button"],
						"imageClass": ["timeline-right-tools-icon"],
						"textClass": ["timeline-right-tools-label"]
					},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				},
				"parentName": "RightTimelineToolsContainer",
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "TimelineContainerList",
				"values": {
					"idProperty": "Id",
					"itemType": this.Terrasoft.ViewItemType.GRID,
					"collection": {
						"bindTo": "TimelineItems"
					},
					"getEmptyMessageConfig": {
						"bindTo": "applyEmptyTimelineMessageConfig"
					},
					"generator": "ContainerListPaginationGenerator.generatePartial",
					"maskVisible": {
						"bindTo": "IsTimelineItemsLoading"
					},
					"maskTimeout": 100,
					"isEmpty": {
						"bindTo": "IsTimelineEmpty"
					},
					"selectableRowCss": "timeline-item-container",
					"classes": {
						"wrapClassName": ["timeline-container-list"]
					},
					"maxVisibleItems": {
						"bindTo": "MaxVisibleItemsCount"
					},
					"observableRowVisible": {
						"bindTo": "onLoadNext"
					},
					"observableRowNumber": 4,
					"onGetItemConfig": {
						"bindTo": "onGetItemConfig"
					},
					"itemPrefix": "View",
					"dataItemIdPrefix": "timeline-item-tile",
					"isAsync": false,
					"activeItem": {
						"bindTo": "ActiveItemId"
					},
					"centerItemOnScroll": true
				},
				"parentName": "TimelineContainer",
				"propertyName": "items"
			}] /**SCHEMA_DIFF*/
		};
	}
);


