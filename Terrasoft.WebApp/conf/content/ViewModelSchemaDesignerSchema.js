Terrasoft.configuration.Structures["ViewModelSchemaDesignerSchema"] = {innerHierarchyStack: ["ViewModelSchemaDesignerSchemaDesignerTools", "ViewModelSchemaDesignerSchema"]};
define('ViewModelSchemaDesignerSchemaDesignerToolsStructure', ['ViewModelSchemaDesignerSchemaDesignerToolsResources'], function(resources) {return {schemaUId:'f6a3d8d0-3407-4b93-9b69-24bb7d4998c1',schemaCaption: "ViewModelSchemaDesignerSchema", parentSchemaName: "", schemaName:'ViewModelSchemaDesignerSchemaDesignerTools',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ViewModelSchemaDesignerSchemaStructure', ['ViewModelSchemaDesignerSchemaResources'], function(resources) {return {schemaUId:'40a4627d-4374-4928-b27a-5626b1a12a71',schemaCaption: "ViewModelSchemaDesignerSchema", parentSchemaName: "ViewModelSchemaDesignerSchemaDesignerTools", schemaName:'ViewModelSchemaDesignerSchema',parentSchemaUId:'f6a3d8d0-3407-4b93-9b69-24bb7d4998c1',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ViewModelSchemaDesignerSchemaDesignerTools",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ViewModelSchemaDesignerSchemaDesignerToolsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ViewModelSchemaDesignerSchemaDesignerTools", [
	"ColumnHelper",
	"ModalBox",
	"ViewModelSchemaDesignerUtils",
	"ContainerListGenerator",
	"ContainerList",
	"ViewModelSchemaDesignerItem",
	"css!ViewModelSchemaDesignerItem",
	"ImageCustomGeneratorV2",
	"DetailManager",
	"ImageCustomGeneratorV2",
	"ViewModelSchemaDesignerTabModalBox",
	"DesignTimeReorderableItemModel",
	"NewColumnGridLayoutEditItemModel",
	"ExistingColumnGridLayoutEditItemModel",
	"ControlGridLayoutEditItemModel",
	"WidgetGridLayoutEditItemModel",
	"SchemaDesignToolItem",
	"SchemaColumnDesignToolItem",
	"SchemaParameterDesignToolItem",
	"SchemaButtonDesignToolItem",
	"SchemaWidgetDesignToolItem",
	"EntityDataSourceViewModel",
	"ParameterDataSourceViewModel",
	"ElementDataSourceViewModel"
], function(ColumnHelper) {
	return {
		messages: {
			"GetModuleInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"OnDesignerSaved": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"GetColumnConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"GetModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetModuleConfigResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"Validate": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"ValidationResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetNewLookupPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"GetPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"Save": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"SavingResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			"GetSchemaColumnsNames": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"GetDesignerDisplayConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"SaveTabConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"SaveControlGroupConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"SaveDetailConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * Fires when card widget design mode was canceled.
			 */
			"WidgetDesignerCancel": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * Returns card widget parameters which was designed.
			 */
			"PostModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"SaveDataModel": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			"OnAfterSave": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {

			/**
			 * Collection of existing columns for drag and drop.
			 */
			ExistingModelDraggableItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Collection of existing parameters for drag and drop.
			 */
			ExistingParameterDraggableItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Collection of types new columns for drag and drop.
			 */
			NewModelDraggableItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Collection of types new parameters for drag and drop.
			 */
			NewParametersDraggableItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Collection of types new widgets for drag and drop.
			 */
			NewWidgetsModelDraggableItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Related profiles collection.
			 */
			RelatedProfileItems: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			/**
			 * Related profiles reorder index.
			 */
			RelatedProfileReorderableIndex: {dataValueType: Terrasoft.DataValueType.INTEGER},

			/**
			 * Novelty tab sign.
			 */
			IsNewTab: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

			/**
			 * Changing control group caption.
			 */
			ChangingControlGroupName: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: null
			},

			/**
			 * Editable detail entity schema object.
			 */
			editableDetailEntitySchema: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT},

			/**
			 * Default widget module name.
			 */
			DefaultWidgetModuleName: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "CardWidgetModule"
			},

			/**
			 * Writable widget dashboard manager item.
			 */
			WritableWidgetDashboardManagerItem: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Readable widget dashboard manager items.
			 */
			ReadableWidgetDashboardManagerItemCollection: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Card designer container visible.
			 */
			CardWidgetDesignerContainerVisible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			MessageMap: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				value: null
			},

			/**
			 * Current editing client unit schema.
			 */
			PageSchema: {dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT},

			/**
			 * Primary entity schema name.
			 */
			EntitySchemaName: {dataValueType: Terrasoft.DataValueType.TEXT},

			/**
			 * Application structure item id.
			 */
			ApplicationStructureItemId: {dataValueType: Terrasoft.DataValueType.GUID},

			/**
			 * Design data models.
			 */
			DataModels: {dataValueType: Terrasoft.DataValueType.COLLECTION},

			EditDataModelName: {dataValueType: Terrasoft.DataValueType.TEXT},

			/**
			 * Flag that indicates init process.
			 */
			Initializing: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Flag that indicates whether designer supports parameters data model.
			 */
			SupportParametersDataModel: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is current page registered as SSP section page.
			 */
			IsSspSection: {dataValueType: Terrasoft.DataValueType.BOOLEAN},

			/**
			 * Collection of used lookup columns.
			 */
			UsedLookupColumns: {dataValueType: Terrasoft.DataValueType.COLLECTION}
		},
		methods: {

			//region Methods: Private

			/**
			 * Removes data model from design schema by the specified name.
			 * @private
			 */
			_removeDataModelFromSchema: function(name) {
				const dataModels = this.$Schema.dataModels || {};
				delete dataModels[name];
			},

			/**
			 * @private
			 */
			onGetDataSourcePageData: function() {
				return {
					schemaName: "DataSourcePropertiesPage",
					DataModelName: this.$EditDataModelName,
					Designer: this
				};
			},

			/**
			 * @private
			 */
			_parseItemBindTo: function(bindTo) {
				const path = bindTo.split(".");
				let dataModel;
				let schemaColumn;
				if (path.length === 2) {
					dataModel = this.$DataModels.find(path[0]);
					if (dataModel) {
						schemaColumn = dataModel.get("Schema").columns.findByPath("name", path[1]);
					}
				}
				this.$DataModels.each(function(item) {
					if (item.get("Name") === "Elements") {
						return;
					}
					if (!schemaColumn) {
						schemaColumn = item.get("Schema").columns.findByPath("name", bindTo);
						dataModel = schemaColumn ? item : null;
					}
				}, this);
				return {
					dataModel: dataModel,
					schemaColumn: schemaColumn
				};
			},

			/**
			 * @private
			 */
			_safeCallMethod: function(methodName) {
				const method = this[methodName];
				if (method) {
					method.call(this);
				}
			},

			/**
			 * @private
			 */
			_initEvents: function() {
				this.addEvents(
					/**
					 * @event schemaChanged
					 * It works when need to refresh the view.
					 * @param {Array} diff Array of diffs.
					 */
					"schemaChanged"
				);
			},

			/**
			 * @private
			 */
			_getSchemaProperty: function(propertyName, defaultValue) {
				const designSchemaPropertyValue = this.get("Schema")[propertyName] || defaultValue;
				const schemaPropertyValue = this[propertyName] || defaultValue;
				return Ext.apply(Terrasoft.deepClone(schemaPropertyValue), designSchemaPropertyValue);
			},

			/**
			 * @private
			 */
			_getSchemaDetails: function() {
				return this._getSchemaProperty("details", {});
			},

			/**
			 * @private
			 */
			_getSchemaDetail: function(detailName) {
				return this._getSchemaDetails()[detailName];
			},

			/**
			 * @private
			 */
			_getSchemaModules: function() {
				return this._getSchemaProperty("modules", {});
			},

			/**
			 * @private
			 */
			_getSchemaModule: function(moduleName) {
				return this._getSchemaModules()[moduleName];
			},

			/**
			 * @private
			 */
			_initEmptyInfoImageSrc: function() {
				const emptyInfoImage = this.get("Resources.Images.EmptyInfoImage");
				this.set("EmptyInfoImageSrc", Terrasoft.ImageUrlBuilder.getUrl(emptyInfoImage));
			},

			/**
			 * @private
			 */
			_loadPageSchemaConfig: function(next, scope) {
				this.sandbox.subscribe("GetModuleConfigResult", function(config) {
					this.onGetModuleConfigResult(config, next, scope);
				}, this, [this.sandbox.id]);
				this.sandbox.publish("GetModuleConfig", null, [this.sandbox.id]);
			},

			/**
			 * @private
			 */
			_initWritableWidgetDashboardManagerItem: function() {
				return new Promise(
					function(resolve) {
						const managerItemId = this._getWidgetDashboardManagerItemIds(this.$Schema.modules || {})[0];
						if (managerItemId) {
							const item = Terrasoft.WidgetDashboardManager.getItem(managerItemId);
							item.loadLazyPropertiesData(function() {
								resolve(item);
							}, this);
						} else {
							Terrasoft.WidgetDashboardManager.createItem(null, function(createdItem) {
								Terrasoft.WidgetDashboardManager.addItem(createdItem);
								resolve(createdItem);
							}, this);
						}
					}.bind(this)
				).then(
					function(item) {
						this.$WritableWidgetDashboardManagerItem = item;
					}.bind(this)
				);
			},

			/**
			 * @private
			 */
			_initReadableWidgetDashboardItemCollection: function() {
				const managerItemIds = this._getWidgetDashboardManagerItemIds(this._getSchemaModules());
				const promise = Terrasoft.WidgetDashboardManager.loadLazyPropertiesDataForItems(managerItemIds);
				return promise.then(
					function(items) {
						const collection = Ext.create("Terrasoft.Collection");
						items.forEach(function(item) {
							collection.add(item.getId(), item);
						}, this);
						const writableItem = this.$WritableWidgetDashboardManagerItem;
						if (writableItem.getIsNew()) {
							collection.addIfNotExists(writableItem.getId(), writableItem);
						}
						this.$ReadableWidgetDashboardManagerItemCollection = collection;
					}.bind(this)
				);
			},

			/**
			 * @private
			 */
			_getWidgetDashboardManagerItemIds: function(schemaModules) {
				const itemIds = [];
				Terrasoft.each(schemaModules, function(module) {
					const itemId = Terrasoft.findValueByPath(module, "config.parameters.viewModelConfig.recordId");
					if (itemId && Terrasoft.WidgetDashboardManager.contains(itemId) && !_.contains(itemIds, itemId)) {
						itemIds.push(itemId);
					}
				}, this);
				return itemIds.sort();
			},

			/**
			 * @private
			 */
			_initDetailsCaptionsAsync: function(callback, scope) {
				const notFilledDetailKeys = this._fillDetailCaptionsFromPageResources();
				if (notFilledDetailKeys.length > 0) {
					this._fillDetailCaptionsFromDetailResources(notFilledDetailKeys, callback, scope);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * @private
			 */
			_fillDetailCaptionsFromPageResources: function() {
				const schemaDetails = this._getSchemaDetails();
				const keys = [];
				Terrasoft.each(schemaDetails, function(detail, key) {
					const isRegisteredDetail = this._isRegisteredDetail(detail);
					const caption = this._generateDetailCaptionFromPageResource(key, isRegisteredDetail);
					if (caption) {
						this.set(this.getDetailCaptionResourcesName(key), caption);
					} else {
						keys.push(key);
					}
				}, this);
				Terrasoft.each(keys, function(key) {
					const format = this.get(this._getDetailCaptionTemplateResourceName(true));
					const caption = Ext.String.format(format, key);
					this.set(this.getDetailCaptionResourcesName(key), caption);
				}, this);
				return keys;
			},

			/**
			 * @private
			 */
			_getNotFilledDetailManagerItems: function(notFilledDetailKeys, schemaDetails) {
				const managerItems = Terrasoft.ClientUnitSchemaManager.getItems();
				const notFilledDetailManagerItems = [];
				Terrasoft.each(notFilledDetailKeys, function(detailKey) {
					const schemaName = schemaDetails[detailKey].schemaName;
					const hasSchema = notFilledDetailManagerItems.some(function(item) {
						return item.getName() === schemaName;
					});
					if (!hasSchema) {
						const managerItem = managerItems.firstOrDefault(function(item) {
							return item.getName() === schemaName && !item.getExtendParent();
						}, this);
						if (managerItem) {
							notFilledDetailManagerItems.push(managerItem);
						}
					}
				}, this);
				return notFilledDetailManagerItems;
			},

			/**
			 * @private
			 */
			_fillDetailCaptionsFromDetailResources: function(notFilledDetailKeys, callback, scope) {
				const schemaDetails = this._getSchemaDetails();
				const notFilledDetailManagerItems =
					this._getNotFilledDetailManagerItems(notFilledDetailKeys, schemaDetails);
				const currentPackageUId = this.getPackageUId();
				const promiseChain = notFilledDetailManagerItems.map(function(item) {
					const config = {schemaUId: item.uId, packageUId: currentPackageUId};
					return new Promise(function(resolve) {
						Terrasoft.ClientUnitSchemaManager.findBundleSchemaInstance(config, function(instance) {
							resolve(instance);
						}, this);
					}.bind(this));
				}, this);
				Promise.all(promiseChain).then(function(instances) {
					Terrasoft.each(notFilledDetailKeys, function(detailKey) {
						const detail = schemaDetails[detailKey];
						const designSchema = instances.filter(function(instance) {
							return instance.name === detail.schemaName;
						})[0];
						let caption = "";
						if (designSchema && designSchema.localizableStrings.contains("Caption")) {
							caption = this._generateDetailCaptionFromDetailResource(
								designSchema,
								this._isRegisteredDetail(detail));
						} else {
							caption = Ext.String.format(this.get(
								this._getDetailCaptionTemplateResourceName(false)),
								detailKey);
						}
						this.set(this.getDetailCaptionResourcesName(detailKey), caption);
					}, this);
					Ext.callback(callback, scope);
				}.bind(this));
			},

			/**
			 * @private
			 */
			_isRegisteredDetail: function(detail) {
				const managerItems = Terrasoft.DetailManager.getItems();
				const detailManagerItem = managerItems.firstOrDefault(function(item) {
					return item.getDetailSchemaName() === detail.schemaName &&
						(!detail.entitySchemaName || item.getEntitySchemaName() === detail.entitySchemaName);
				}, this);
				return !Ext.isEmpty(detailManagerItem);
			},

			/**
			 * @private
			 */
			_getDetailCaptionTemplateResourceName: function(isRegisteredDetail) {
				return isRegisteredDetail
					? "Resources.Strings.DesignerDetailCaption"
					: "Resources.Strings.DesignerUnregisteredDetailCaption";
			},

			/**
			 * @private
			 */
			_generateDetailCaptionFromPageResource: function(detailKey, isRegisteredDetail) {
				const resourceName = Terrasoft.ViewModelSchemaDesignerUtils.generateDetailCaptionResourcesName(detailKey);
				const caption = this.get("Resources.Strings." + resourceName);
				const captionTemplateResourceName = this._getDetailCaptionTemplateResourceName(isRegisteredDetail);
				return caption ? Ext.String.format(this.get(captionTemplateResourceName), caption) : null;
			},

			/**
			 * @private
			 */
			_generateDetailCaptionFromDetailResource: function(designSchema, isRegisteredDetail) {
				const captionTemplateResourceName = this._getDetailCaptionTemplateResourceName(isRegisteredDetail);
				return Ext.String.format(this.get(captionTemplateResourceName), designSchema.localizableStrings.get("Caption"));
			},

			/**
			 * @private
			 */
			_getExistingModelDraggableItems: function(designSchema, dataModel) {
				const items = Ext.create("Terrasoft.BaseViewModelCollection");
				this.loadColumnsCollection(items, designSchema.columns,
					"Terrasoft.ExistingColumnGridLayoutEditItemModel", dataModel);
				items.on("itemChanged", this.draggableItemChanged, this);
				return items;
			},

			/**
			 * @private
			 */
			_getNewModelDraggableItems: function(model, columnClassName) {
				const columns = Ext.create("Terrasoft.Collection");
				const result = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(ColumnHelper.Type, function(type, typeName) {
					const column = Ext.create(columnClassName, {
						uId: Terrasoft.generateGUID(),
						name: typeName,
						dataValueType: type.dataValueType,
						status: Terrasoft.ModificationStatus.NEW
					});
					column.caption.setValue(type.caption);
					columns.add(column.uId, column);
				}, this);
				this.loadColumnsCollection(result, columns, "Terrasoft.NewColumnGridLayoutEditItemModel", model);
				result.on("itemChanged", this.draggableItemChanged, this);
				return result;
			},

			/**
			 * @private
			 */
			_onDraggableItemsCollapsedChanged: function(model, value) {
				if (!value) {
					this.set("ElementsCollapsed", true);
					this.$DataModels.each(function(dataViewModel) {
						if (model.get("Name") !== dataViewModel.get("Name")) {
							dataViewModel.set("Collapsed", true);
						}
					}, this);
				}
			},

			/**
			 * @private
			 */
			_initDataModelsDesignSchema: function(callback, scope) {
				const packageUId = this.getPackageUId();
				const items = this.dataModelCollection.getItems();
				Terrasoft.eachAsync(items, function(dataModel, next) {
						Terrasoft.EntitySchemaManager.forceGetPackageSchema({
							schemaUId: dataModel.schema.uId,
							packageUId: packageUId
						}, function(entitySchema) {
							this._prepareDesignEntitySchema(entitySchema);
							dataModel.designSchema = entitySchema;
							next();
						}, this);
					},
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * @private
			 */
			_prepareDesignEntitySchema: function(entitySchema) {
				if (!Terrasoft.EntitySchemaManager.contains(entitySchema.uId)) {
					if (entitySchema.extendParent) {
						entitySchema.on("changed", this._onEntitySchemaChange, this);
					} else {
						Terrasoft.EntitySchemaManager.addSchema(entitySchema);
					}
				}
			},

			/*
			 * @private
			 */
			_onEntitySchemaChange: function(changes, entitySchema) {
				if (!Terrasoft.EntitySchemaManager.findItem(entitySchema.uId)) {
					Terrasoft.EntitySchemaManager.addSchema(entitySchema);
				}
			},

			/**
			 * @private
			 */
			_createElementsDataModel: function() {
				this.$DataModels.add("Elements", Ext.create("Terrasoft.ElementDataSourceViewModel", {
					values: {
						Schema: this.$PageSchema
					}
				}));
			},

			/**
			 * @private
			 */
			_createParametersDataModel: function() {
				if (!this.get("SupportParametersDataModel")) {
					return;
				}
				this.$DataModels.add("Parameters", Ext.create("Terrasoft.ParameterDataSourceViewModel", {
					values: {
						Schema: this.$PageSchema,
						NewModelDraggableItems: this.get("NewParametersDraggableItems")
					}
				}));
			},

			/**
			 * @private
			 */
			_createEntityDataModels: function() {
				Terrasoft.each(this.dataModelCollection, function(dataModel) {
					this.createEntityDataModel(dataModel);
				}, this);
			},

			/**
			 * @protected
			 */
			createEntityDataModel: function(dataModel) {
				const designSchema = dataModel.designSchema;
				this._prepareDesignEntitySchema(designSchema);
				const resourceName = dataModel.name + "DataModelCaption";
				const resourceString = this.$PageSchema.localizableStrings.find(resourceName);
				const caption = (resourceString || designSchema.caption).toString();
				const canAddNewColumn = designSchema.canDesignSchema();
				this.set(dataModel.name + "Collapsed", true);
				const viewModel = Ext.create("Terrasoft.EntityDataSourceViewModel", {
					values: {
						EntitySchemaUId: dataModel.schema.uId,
						Name: dataModel.name,
						Caption: caption,
						Schema: designSchema,
						CanAddNewColumn: canAddNewColumn,
						IsPrimary: dataModel.isPrimary,
						DataModelMenu: this._createEntityDataModelMenu(),
						IsDataModelMenuVisible: false,
						Designer: this
					}
				});
				this.$DataModels.add(dataModel.name, viewModel);
				return viewModel;
			},

			/**
			 * @private
			 */
			_createEntityDataModelMenu: function() {
				const menuItems = Ext.create("Terrasoft.BaseViewModelCollection");
				const editMenuItem = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: this.get("Resources.Strings.DataModelEditMenuItem"),
						Click: {"bindTo": "onEditDataSourceClick"},
						MarkerValue: "Edit"
					}
				});
				const removeMenuItem = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: this.get("Resources.Strings.DataModelRemoveMenuItem"),
						Click: {"bindTo": "onRemoveDataSourceClick"},
						MarkerValue: "Remove"
					}
				});
				menuItems.addItem(editMenuItem);
				menuItems.addItem(removeMenuItem);
				return menuItems;
			},

			/**
			 * @private
			 */
			_initParametersDraggableItems: function() {
				if (!this.get("SupportParametersDataModel")) {
					return;
				}
				const dataModel = this.$DataModels.get("Parameters");
				const newItems = this._getNewModelDraggableItems(dataModel, "Terrasoft.ClientUnitSchemaParameter");
				const existingItems = this._getExistingModelDraggableItems(this.$PageSchema, dataModel);
				dataModel.set("NewModelDraggableItems", newItems);
				dataModel.set("ExistingModelDraggableItems", existingItems);
			},

			/**
			 * @private
			 */
			_initEntityDataModelsDraggableItems: function() {
				Terrasoft.each(this.dataModelCollection, function(dataModel) {
					this._initDataModelDraggableItem(dataModel);
				}, this);
			},

			/*
			 * @private
			 */
			_initDataModelDraggableItem: function(dataModel) {
				const entitySchema = dataModel.designSchema;
				const entityDataModel = this.$DataModels.get(dataModel.name);
				const newItems = this._getNewModelDraggableItems(entityDataModel, "Terrasoft.EntitySchemaColumn");
				const existingItems = this._getExistingModelDraggableItems(entitySchema, entityDataModel);
				entityDataModel.set("NewModelDraggableItems", newItems);
				entityDataModel.set("ExistingModelDraggableItems", existingItems);
			},

			/**
			 * @private
			 */
			_initDataModels: function(callback, scope) {
				this.$DataModels = Ext.create("Terrasoft.BaseViewModelCollection");
				this._createElementsDataModel();
				this._createParametersDataModel();
				this._createEntityDataModels();
				this.initGridLayoutItemsCollection();
				this._initParametersDraggableItems();
				this._initEntityDataModelsDraggableItems();
				Terrasoft.defer(function() {
					this.initNewWidgetsModelDraggableItems();
				}, this);
				this._initDataModelsCollapsed();
				Ext.callback(callback, scope);
			},

			/**
			 * @private
			 */
			_saveModelsCollapsed: function() {
				const profile = {};
				this.$DataModels.each(function(model) {
					const modelName = model.get("Name");
					profile[modelName] = model.get("Collapsed");
				}, this);
				const profileKey = this.getProfileKey();
				Terrasoft.DomainCache.setItem(profileKey, {modelsCollapsed: profile});
			},

			/**
			 * @private
			 */
			_initDataModelsCollapsed: function() {
				const profile = Terrasoft.DomainCache.getItem(this.getProfileKey()) || {};
				const modelsCollapsed = profile.modelsCollapsed || {};
				let expandedCount = 0;
				this.$DataModels.each(function(model) {
					const modelName = model.get("Name");
					const collapsed = modelsCollapsed.hasOwnProperty(modelName) ? modelsCollapsed[modelName] : true;
					if (!collapsed) {
						expandedCount++;
					}
					this._setCollapsedDataModel(modelName, collapsed);
				}, this);
				if (expandedCount === 0) {
					this._initDefaultExpandedDataModel();
				}
			},

			/**
			 * @private
			 */
			_initDefaultExpandedDataModel: function() {
				const defaultDataModel = this.dataModelCollection.first();
				const modelName = (defaultDataModel && defaultDataModel.name) || "Parameters";
				this._setCollapsedDataModel(modelName, false);
			},

			/**
			 * @private
			 */
			_setCollapsedDataModel: function(name, collapsed) {
				const model = this.$DataModels.find(name);
				if (model) {
					model.set("Collapsed", collapsed);
				}
			},

			/**
			 * @private
			 */
			_isWidgetItem: function(moduleKey) {
				const widgetModule = this._getSchemaModule(moduleKey);
				if (!widgetModule) {
					return false;
				}
				const config = Terrasoft.findValueByPath(widgetModule, "config.parameters.viewModelConfig");
				if (!config || !this.$ReadableWidgetDashboardManagerItemCollection.contains(config.recordId)) {
					return false;
				}
				const managerItem = this.$ReadableWidgetDashboardManagerItemCollection.get(config.recordId);
				return Ext.isObject(managerItem.getWidgetItem(config.widgetKey));
			},

			/**
			 * @private
			 */
			_addWidgetItemToCollection: function(collection, item) {
				const widgetModule = this._getSchemaModule(item.name);
				const config = Terrasoft.findValueByPath(widgetModule, "config.parameters.viewModelConfig");
				const managerItem = this.$ReadableWidgetDashboardManagerItemCollection.get(config.recordId);
				const widget = managerItem.getWidgetItem(config.widgetKey);
				collection.add(item.name, Ext.create("Terrasoft.WidgetGridLayoutEditItemModel", {
					designSchema: this,
					itemConfig: item,
					widgetType: widget.widgetType,
					widgetCaption: widget.parameters && widget.parameters.caption
				}));
			},

			/**
			 * @private
			 */
			_getColumnItemDesignerName: function(viewModel) {
				return viewModel && viewModel.$Name === "Parameters"
					? "ClientUnitSchemaModelItemDesigner"
					: "SchemaModelItemDesigner";
			},

			/**
			 * @protected
			 */
			addColumnItemToCollection: function(collection, item) {
				this.initItemLabelCaption(item);
				const bindToConfig = this._parseItemBindTo(item.bindTo || item.name);
				const viewModel = bindToConfig.dataModel;
				const designerName = this._getColumnItemDesignerName(viewModel);
				const itemColumn = this.getItemColumn(item);
				collection.add(item.name, Ext.create("Terrasoft.ExistingColumnGridLayoutEditItemModel", {
					designSchema: this,
					itemConfig: item,
					column: bindToConfig.schemaColumn,
					itemColumnType: itemColumn && itemColumn.type,
					schemaModelItemDesignerName: designerName,
					parentViewModel: viewModel,
					isUsed: true
				}));
			},

			/**
			 * @protected
			 */
			addControlItemToCollection: function(collection, item, config) {
				const itemModelConfig = Ext.apply({itemConfig: item}, config);
				const itemModel = Ext.create("Terrasoft.ControlGridLayoutEditItemModel", itemModelConfig);
				collection.add(item.name, itemModel);
			},

			/**
			 * @protected
			 */
			addGridLayoutItemToCollection: function(collection, item) {
				if (this._isWidgetItem(item.name)) {
					this._addWidgetItemToCollection(collection, item);
				} else {
					const bindToConfig = this._parseItemBindTo(item.bindTo || item.name);
					if (bindToConfig.schemaColumn) {
						this.addColumnItemToCollection(collection, item);
					} else {
						this.addControlItemToCollection(collection, item, {designSchema: this});
					}
				}
			},

			/**
			 * @protected
			 */
			initGridLayoutItemsCollection: function() {
				const schemaView = this.get("SchemaView");
				this.set("GridLayouts", []);
				Terrasoft.iterateChildItems(schemaView, function(iterationConfig) {
					const item = iterationConfig.item;
					if (item.itemType === Terrasoft.ViewItemType.GRID_LAYOUT) {
						const itemsCollectionName = this.getGridLayoutEditCollectionName(item);
						const collection = this.createGridLayoutEditCollection(item);
						this.set(itemsCollectionName, collection);
						this.get("GridLayouts").push(item.name);
					}
				}, this);
				this.updateUsedColumns();
				this.updateUsedLookupColumns();
			},

			/**
			 * @private
			 */
			_sameSelection: function(selection, config) {
				return selection.row === config.row &&
					selection.rowSpan === config.rowSpan &&
					selection.column === config.column &&
					selection.colSpan === config.colSpan;
			},

			/**
			 * @private
			 */
			_saveNewDetail: function(config) {
				const utils = Terrasoft.ViewModelSchemaDesignerUtils;
				const detailKey = utils.getUniqueItemName(config.detailSchemaName);
				this._addDetailToSchemaDetails(detailKey, {
					schemaName: config.detailSchemaName,
					entitySchemaName: config.detailEntitySchemaName,
					filter: {
						detailColumn: config.detailEntitySchemaColumn,
						masterColumn: config.masterEntitySchemaColumn
					}
				});
				if (config.isDetailCaptionChanged) {
					const resourceName = utils.generateDetailCaptionResourcesName(detailKey);
					this._saveCaptionToDesignSchema(resourceName, config.localizableDetailCaption);
				}
				this._saveDetailCaptionToSchema(detailKey, config.localizableDetailCaption.getValue());
				this.addDetail(detailKey);
			},

			/**
			 * @private
			 */
			_onSaveDataModel: function(dataModel) {
				this._applyDataModelToSchema(dataModel.name, {
					entitySchemaName: dataModel.entitySchemaName,
					primaryColumnValue: {
						bindTo: dataModel.bindTo
					}
				});
				const utils = Terrasoft.ViewModelSchemaDesignerUtils;
				const resourceName = utils.generateDataModelCaptionResourcesName(dataModel.name);
				const resource = Ext.create("Terrasoft.LocalizableString", dataModel.caption);
				this._saveCaptionToDesignSchema(resourceName, resource);
				if (this.$DataModels.contains(dataModel.name)) {
					const viewModel = this.$DataModels.get(dataModel.name);
					viewModel.$Caption = dataModel.caption.toString();
					this.updateGridLayoutEditCollection();
				} else {
					this.createEntityDataModel(dataModel);
					this._initDataModelDraggableItem(dataModel);
					this._setCollapsedDataModel(dataModel.name, false);
					const dataModelViewModel = this.$DataModels.get(dataModel.name);
					this._onDraggableItemsCollapsedChanged(dataModelViewModel, false);
				}
			},

			/**
			 * @private
			 */
			_saveExistingDetail: function(detailKey, config) {
				if (!Ext.isEmpty(this.get("Schema").details[detailKey])) {
					this._addDetailToSchemaDetails(detailKey, {
						schemaName: config.detailSchemaName,
						entitySchemaName: config.detailEntitySchemaName,
						filter: {
							detailColumn: config.detailEntitySchemaColumn,
							masterColumn: config.masterEntitySchemaColumn
						}
					});
				}
				if (config.isDetailCaptionChanged) {
					const utils = Terrasoft.ViewModelSchemaDesignerUtils;
					const resourceName = utils.generateDetailCaptionResourcesName(detailKey);
					this._saveCaptionToDesignSchema(resourceName, config.localizableDetailCaption);
					this._saveDetailCaptionToSchema(detailKey, config.localizableDetailCaption.getValue());
				}
			},

			/**
			 * Add new detail into current detail collection.
			 * @private
			 * @param {String} detailKey Unique detail name.
			 * @param {Object} detail Detail configuration object.
			 */
			_addDetailToSchemaDetails: function(detailKey, detail) {
				const schemaDetails = this.get("Schema").details;
				if (schemaDetails[detailKey]) {
					Ext.apply(schemaDetails[detailKey], detail);
				} else {
					schemaDetails[detailKey] = detail;
				}
			},

			/**
			 * @private
			 */
			_applyDataModelToSchema: function(name, dataModel) {
				const dataModels = this.$Schema.dataModels || {};
				if (dataModels[name]) {
					Ext.apply(dataModels[name], dataModel);
				} else {
					dataModels[name] = dataModel;
				}
				this.$Schema.dataModels = dataModels;
			},

			/**
			 * Saves caption localizable string to design client unit schema.
			 * @private
			 * @param {String} resourceName Resource name.
			 * @param {Terrasoft.core.LocalizableString} caption Localizable string.
			 */
			_saveCaptionToDesignSchema: function(resourceName, caption) {
				const instance = this.get("PageSchema");
				let localizableString;
				if (instance.localizableStrings.contains(resourceName)) {
					localizableString = instance.localizableStrings.get(resourceName);
					localizableString.setValue(caption.getValue());
				} else {
					localizableString = Ext.create("Terrasoft.LocalizableString");
					localizableString.merge(caption);
					instance.localizableStrings.add(resourceName, localizableString);
				}
			},

			/**
			 * @private
			 */
			_saveDetailCaptionToSchema: function(detailKey, detailCaption) {
				const captionTemplateResourceName = this._getDetailCaptionTemplateResourceName(true);
				const caption = Ext.String.format(this.get(captionTemplateResourceName), detailCaption);
				this.set(this.getDetailCaptionResourcesName(detailKey), caption);
			},

			/**
			 * @private
			 */
			_confirmRemoveBusinessRules: function(config, callback, scope) {
				const dot = String.fromCharCode(8226);
				const rulesCaptions = config.rules.map(function(rule) {
					return dot + " " + rule.instance.caption.toString();
				}, this);
				const message = [config.messageHeader].concat(rulesCaptions).join("\n");
				const removeButtonCaption = this.get("Resources.Strings.RemoveBusinessRulesButtonCaption");
				const removeButton = {
					className: "Terrasoft.Button",
					returnCode: "remove",
					caption: removeButtonCaption,
					markerValue: removeButtonCaption
				};
				this.showConfirmationDialog(message, function(returnCode) {
					callback.call(scope, returnCode === "remove");
				}, [removeButton, "cancel"], {defaultButton: 0});
			},

			/**
			 * @private
			 */
			_checkBusinessRuleColumnDependencies: function(columnName, dataModelSchema, callback, scope) {
				const config = {
					columnName: columnName,
					pageSchemaUId: dataModelSchema.uId
				};
				Terrasoft.BusinessRuleSchemaManager.getRulesDependsOnColumn(config, function(rules) {
					if (!rules.length) {
						Ext.callback(callback, scope);
						return;
					}
					this._confirmRemoveBusinessRules({
						messageHeader: this.get("Resources.Strings.FieldUsedInRulesMessage"),
						rules: rules
					}, function(isConfirmed) {
						if (isConfirmed) {
							this._removeBusinessRules(rules, callback, scope);
						}
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			_checkBusinessRuleDataSourceDependencies: function(dataModel, callback, scope) {
				const config = {
					dataModel: dataModel,
					pageSchemaUId: this.$PageSchema.uId,
					entitySchemaId: dataModel.get("Schema").uId
				};
				Terrasoft.BusinessRuleSchemaManager.getRulesDependsOnDataModel(config, function(rules) {
					if (!rules.length) {
						Ext.callback(callback, scope);
						return;
					}
					this._confirmRemoveBusinessRules({
						messageHeader: this.get("Resources.Strings.DataSourceUsedInRules"),
						rules: rules
					}, function(isConfirmed) {
						if (isConfirmed) {
							this._removeBusinessRules(rules, callback, scope);
						}
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			_removeBusinessRules: function(rules, callback, scope) {
				this.showBodyMask();
				Terrasoft.BusinessRuleSchemaManager.removeRules(rules, function() {
					this.hideBodyMask();
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			_checkDataModelDependencies: function(columnName) {
				const dataModels = this.$Schema.dataModels || {};
				let isValid = true;
				Terrasoft.each(dataModels, function(dataModel) {
					const bindTo = Ext.isObject(dataModel.primaryColumnValue)
						? dataModel.primaryColumnValue.bindTo
						: dataModel.primaryColumnValue;
					isValid = isValid && bindTo !== columnName;
				}, this);
				return isValid;
			},

			/**
			 * @private
			 */
			_removeExistingModelDraggableItem: function(columnUId, dataModel) {
				const collectionsNames = this.getGridLayoutEditCollections();
				Terrasoft.each(collectionsNames, function(gridLayoutName) {
					const collectionName = this.getGridLayoutEditCollectionName(gridLayoutName);
					const layoutCollection = this.get(collectionName);
					if (layoutCollection) {
						layoutCollection.each(function(item) {
							if (item.column.uId === columnUId) {
								layoutCollection.remove(item);
							}
						}, this);
					}
				}, this);
				const collection = dataModel.get("ExistingModelDraggableItems");
				if (collection.contains(columnUId)) {
					collection.removeByKey(columnUId);
				}
			},

			/**
			 * @private
			 */
			_getAddDataSourceWindowId: function() {
				return this.sandbox.id + "_DataSourcePropertiesPage";
			},

			/**
			 * @private
			 */
			_updateNewDraggableItemsVisibility: function() {
				this.$DataModels.get("Elements").set("IsNewPageSchema", this.$PageSchema.isNew());
			},

			/**
			 * Adds new tab to tabs collection.
			 * @protected
			 * @param {String} name Tab name.
			 * @param {String} caption Tab caption.
			 * @param {Number} index Tab index.
			 */
			_addTabToCollection: function(name, caption, index) {
				const tabsCollection = this.$TabsCollection;
				const tabContentCollection = Ext.create("Terrasoft.BaseViewModelCollection", {
					entitySchema: Ext.create("Terrasoft.BaseEntitySchema", {
						columns: {},
						primaryColumnName: "Name"
					})
				});
				const newTab = Ext.create("Terrasoft.BaseViewModel", {
					values: {
						Caption: caption,
						Name: name,
						Content: tabContentCollection
					}
				});
				tabsCollection.insert(index, name, newTab);
			},

			/**
			 * Creates localizable string for tab caption.
			 * @private
			 * @param {String} resourceName Name of the localizable string.
			 * @param {String} value Tab caption.
			 */
			_addNewTabLocalizableString: function(resourceName, value) {
				const clientUnitSchema = this.get("PageSchema");
				clientUnitSchema.localizableStrings.add(resourceName, Ext.create("Terrasoft.LocalizableString", value));
			},

			/**
			 * @private
			 */
			_isExistsLocalizableString: function(bindTo) {
				const clientUnitSchema = this.get("PageSchema");
				const resourceName = this.getSchemaResourceNameFromModelResourceName(bindTo);
				return clientUnitSchema.localizableStrings.contains(resourceName);
			},

			/**
			 * Returns current page entity schema.
			 * @private
			 * @return {Object} Current page entity schema.
			 */
			_getEntitySchemaInstance: function() {
				var dataModels = this.$DataModels; 
				var dataModel = dataModels.get(this.entitySchemaName);
				return dataModel.get("Schema");
			},

			/**
			 * Updates SSP section modified on property.
			 * Need for rights change actualization on edit.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope. 
			 */
			_updateSspSectionModifiedOn: function(callback, scope) {
				var sectionItem = Terrasoft.SectionManager.findByFn(function(item) {
					return item.getId() === this.$ApplicationStructureItemId;
				}, this);
				if (Terrasoft.Features.getIsDisabled("SspSectionWizard") || !this.$IsSspSection || !sectionItem) {
					return Ext.callback(callback, scope || this);
				}
				sectionItem.setPropertyValue("modifiedOn", new Date());
				Ext.callback(callback, scope || this);
			},
			
			/**
			 * Returns current page unique identifier.
			 * @private
			 * @return {String} Current page unique identifier.
			 */
			_getCardSchemaUId: function() {
				var pageSchema = this.$PageSchema;
				return pageSchema.extendParent ? pageSchema.parentSchemaUId : pageSchema.uId;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Generates diff for inserting new tab.
			 * @protected
			 * @param {String} name Tab name.
			 * @param {String} resourceName Name of the localizable string of the tab's caption.
			 * @param {Number} index Tab index.
			 * @return {Array} insertDiff Generated diff.
			 */
			generateTabInsertDiff: function(name, resourceName, index) {
				const insertDiff = [{
					"operation": "insert",
					"propertyName": "tabs",
					"parentName": "Tabs",
					"name": name,
					"index": index,
					"values": {
						"caption": {"bindTo": resourceName},
						"items": []
					}
				}];
				return insertDiff;
			},

			/**
			 * Generates diff for moving tab.
			 * @protected
			 * @param {String} name Tab name.
			 * @param {Number} index Tab index.
			 * @return {Array} moveDiff Generated diff.
			 */
			generateTabMoveDiff: function(name, index) {
				const moveDiff = [{
					"operation": "move",
					"name": name,
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": index
				}];
				return moveDiff;
			},

			/**
			 * Generates diff for removing tab.
			 * @protected
			 * @param {String} name Tab name.
			 * @return {Array} removeDiff Generated diff.
			 */
			generateTabRemoveDiff: function(name) {
				const removeDiff = [{
					"operation": "remove",
					"name": name
				}];
				return removeDiff;
			},

			/**
			 * Schema changed handler.
			 * @protected
			 * @param {Array} diff Array of diffs.
			 */
			onSchemaChanged: function(diff) {
				this.fireEvent("schemaChanged", diff);
			},

			/**
			 * Initialization parameters, which has bindings to the base card.
			 * @protected
			 */
			initSchemaBindings: function() {
				this.set("ReportGridData", Ext.create("Terrasoft.Collection"));
				this.set("IsSeparateMode", false);
				this._safeCallMethod("initTabs");
				this._safeCallMethod("initContainersVisibility");
				this._safeCallMethod("initHasAnyDcm");
			},

			/**
			 * @protected
			 */
			onGetModuleConfigResult: function(config, callback, scope) {
				this.set("PageSchema", config.clientUnitSchema);
				this.set("ApplicationStructureItemId", config.applicationStructureItemId);
				this.set("IsSspSection", config.isSspSection);
				this.set("CanAddNewColumn", this.$PageSchema.canDesignSchema());
				this.set("WizardType", config.wizardType);
				this.set("WizardManagerName", config.wizardManagerName);
				Ext.callback(callback, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				this.subscribeSandboxEvents();
				this._initEvents();
				this._initEmptyInfoImageSrc();
				if (!this.canDesignSchema()) {
					this.log(this.get("GenerationInfoMessage"));
					Ext.callback(callback, scope);
					return;
				}
				this.initSchemaBindings();
				Terrasoft.eachAsyncAll([
					this._loadPageSchemaConfig,
					this._initDataModelsDesignSchema,
					this.initWidgetDashboardManagerItems,
					this.initRelatedProfileItems,
					this.subscribeTabCollectionEvents
				], function() {
					Terrasoft.chain(
						this._initDataModels,
						function() {
							this._fillDetailCaptionsFromPageResources();
							this.set("Initializing", false);
							setTimeout(this._initDetailsCaptionsAsync.bind(this), 1000);
							this.showWizardWarning();
							Ext.callback(callback, scope);
						}, this);
				}, this);
			},

			/**
			 * Shows warning with collapsible container.
			 * @protected
			 */
			showWizardWarning: function() {
				const warnings = this.$ValidationWarnings;
				if (Ext.isEmpty(warnings)) {
					return;
				}
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					instanceConfig: {
						moduleInfo: {
							schemaName: "WizardWarningModalBoxPage",
							messageText: warnings[0].mainMessage,
							additionalInfo: warnings[0].additionalMessage
						}
					}
				});
			},

			/**
			 * Handler for before page unload event.
			 * @protected
			 */
			onBeforeUnload: function() {
				Terrasoft.Mask.show({timeout: 0});
				this._saveModelsCollapsed();
			},

			/**
			 * Returns a flag that indicates whether a schema can be designed.
			 */
			canDesignSchema: function() {
				return this.get("GenerationValid");
			},

			/**
			 * Initializes new type collection of new widgets for drag and drop.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initNewWidgetsModelDraggableItems: function(callback, scope) {
				const widgetsType = this.getWidgetTypes();
				const collection = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(widgetsType, function(item) {
					const itemKey = Terrasoft.generateGUID();
					const widgetItem = this.getWidgetGridLayoutItem(item);
					collection.add(itemKey, widgetItem);
				}, this);
				collection.on("itemChanged", this.draggableItemChanged, this);
				this.$DataModels.get("Elements").set("NewWidgetsModelDraggableItems", collection);
				Ext.callback(callback, scope);
			},

			/**
			 * Returns widget grid layout item.
			 * @param {Object} item Item configuration.
			 * @return {Terrasoft.SchemaWidgetDesignToolItem} Widget grid layout item.
			 */
			getWidgetGridLayoutItem: function(item) {
				const draggableGroupNames = this.getGridLayoutEditCollections();
				return Ext.create("Terrasoft.SchemaWidgetDesignToolItem", {
					designItemClassName: "Terrasoft.WidgetGridLayoutEditItemModel",
					item: item,
					values: {
						Name: item.type,
						draggableGroupNames: draggableGroupNames
					},
					sandbox: {id: this.sandbox.id}
				});
			},

			/**
			 * Returns widget types.
			 * @protected
			 * @return {Object} Widget types.
			 */
			getWidgetTypes: function() {
				return {
					"Chart": {
						"type": "Chart",
						"caption": this.get("Resources.Strings.NewWidgetChartCaption")
					},
					"Metric": {
						"type": "Indicator",
						"caption": this.get("Resources.Strings.NewWidgetMetricCaption")
					},
					"Gauge": {
						"type": "Gauge",
						"caption": this.get("Resources.Strings.NewWidgetGaugeCaption")
					},
					"WebPage": {
						"type": "WebPage",
						"caption": this.get("Resources.Strings.NewWidgetWebPageCaption")
					}
				};
			},

			/**
			 * Initializes Related Profile Items.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initRelatedProfileItems: function(callback, scope) {
				let relatedProfileItems = this.get("RelatedProfileItems");
				if (!relatedProfileItems) {
					relatedProfileItems = Ext.create("Terrasoft.BaseViewModelCollection");
					this.set("RelatedProfileItems", relatedProfileItems);
				}
				const profileContainer = this.getSchemaViewItem("LeftModulesContainer");
				if (profileContainer && profileContainer.items) {
					Terrasoft.each(profileContainer.items, function(item) {
						if (item.itemType === Terrasoft.ViewItemType.MODULE) {
							const viewModelItem = this.generateRelatedProfileViewModel(item.name);
							relatedProfileItems.add(viewModelItem.get("Id"), viewModelItem);
						}
					}, this);
				}
				relatedProfileItems.on("move", this.onRelatedProfileItemMove, this);
				Ext.callback(callback, scope);
			},

			/**
			 * Related Profile Item move event handler.
			 * @protected
			 * @override
			 * @param {Number} positionFrom Position move from.
			 * @param {Number} positionTo Position move to.
			 * @param {String} key Item key.
			 */
			onRelatedProfileItemMove: function(positionFrom, positionTo, key) {
				if (positionFrom !== positionTo) {
					const collection = this.get("RelatedProfileItems");
					const item = collection.get(key);
					const name = item.get("ItemName");
					const diff = [{
						"operation": "move",
						"name": name,
						"parentName": "LeftModulesContainer",
						"propertyName": "items",
						"index": positionTo + 1
					}];
					this.onSchemaChanged(diff);
				}
			},

			/**
			 * Returns related ApplicationStructureItem caption.
			 * @protected
			 * @return {Object|null}
			 */
			getApplicationStructureItemConfig: function() {
				const itemId = this.get("ApplicationStructureItemId");
				if (itemId) {
					const wizardManagerName = this.get("WizardManagerName");
					const item = Terrasoft[wizardManagerName].findItem(itemId);
					return {
						itemCaption: item ? item.caption : "",
						itemType: this.get("WizardType")
					};
				}
				return null;
			},

			/**
			 * Generate related profile ViewModel.
			 * @protected
			 * @param {String} name Profile module name.
			 */
			generateRelatedProfileViewModel: function(name) {
				const id = Ext.String.format("Related{0}Item", name);
				return Ext.create("Terrasoft.DesignTimeReorderableItemModel", {
					values: {
						"ReorderableModel": this,
						"ReorderableIndexColumnName": "RelatedProfileReorderableIndex",
						"Id": id,
						"ItemName": name,
						"entitySchemaName": name,
						"canEdit": false,
						"canRemove": true
					},
					methods: {
						edit: Terrasoft.emptyFn,
						remove: Terrasoft.emptyFn
					}
				});
			},

			/**
			 * Registers application component messages.
			 * @param {Object} messageConfig Message config.
			 */
			registerApplictionComponentItemMessage: function(messageConfig) {
				if (Ext.isEmpty(this.get("MessageMap"))) {
					this.set("MessageMap", []);
				}
				if (!Ext.isEmpty(messageConfig)) {
					const messageMap = this.get("MessageMap");
					const needRegister = !(messageMap.some(function(item) {
						return item.messageName === messageConfig.messageName && item.moduleId === messageConfig.moduleId;
					}));
					if (needRegister) {
						this.sandbox.subscribe(messageConfig.messageName, function() {
							return this.callApplictionComponentItemMessageHandler({
								applicationComponentItem: this.get("ActionLayoutItem"),
								messageName: messageConfig.messageName,
								moduleId: messageConfig.moduleId
							}, arguments);
						}, this, [messageConfig.moduleId]);
					}
					messageMap.push(messageConfig);
				}
			},

			/**
			 * Calls application component message handler.
			 * @protected
			 * @param {Object} filterConfig Item filter config.
			 * @param {IArguments | Array} args Handler function arguments.
			 * @return {Object} Message result.
			 */
			callApplictionComponentItemMessageHandler: function(filterConfig, args) {
				const messageMap = this.get("MessageMap");
				const messageConfig = messageMap.filter(function(item) {
					return item.ownerId === filterConfig.applicationComponentItem.instanceId &&
						item.messageName === filterConfig.messageName &&
						item.moduleId === filterConfig.moduleId;
				})[0];
				if (messageConfig && Ext.isFunction(messageConfig.handler)) {
					return messageConfig.handler.apply(filterConfig.applicationComponentItem, args);
				}
			},

			/**
			 * Subscribes sandbox events, which needs this page.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("Validate", this.onValidate, this, [this.sandbox.id]);
				this.sandbox.subscribe("Save", this.onSave, this, [this.sandbox.id]);
				this.sandbox.subscribe("OnAfterSave", this.onAfterSave, this, [this.sandbox.id]);
				this.sandbox.subscribe("GetModuleInfo", this.onGetDataSourcePageData, this,
					[this._getAddDataSourceWindowId()]);
				this.sandbox.subscribe("SaveDataModel", this._onSaveDataModel, this,
					[this._getAddDataSourceWindowId()]);
				this.sandbox.subscribe("GetModuleInfo", this.getTabModalBoxConfig, this,
					[this.getTabModalBoxWindowId()]);
				this.sandbox.subscribe("SaveTabConfig", this.onSaveTabConfig, this,
					[this.getTabModalBoxWindowId()]);
				this.sandbox.subscribe("GetModuleInfo", this.getControlGroupModalBoxConfig, this,
					[this.getControlGroupModalBoxWindowId()]);
				this.sandbox.subscribe("SaveControlGroupConfig", this.onSaveControlGroupConfig, this,
					[this.getControlGroupModalBoxWindowId()]);
				this.sandbox.subscribe("GetModuleInfo", this.getDetailModalBoxConfig, this,
					[this.getDetailModalBoxWindowId()]);
				this.sandbox.subscribe("SaveDetailConfig", this.onSaveDetailConfig, this,
					[this.getDetailModalBoxWindowId()]);
				Ext.EventManager.on(window, "beforeunload", this.onBeforeUnload.bind(this), this);
			},

			/**
			 * Returns identifier of current package.
			 * @protected
			 * @return {String} Identifier of current package.
			 */
			getPackageUId: function() {
				if (!this.destroyed) {
					return this.sandbox.publish("GetPackageUId", null, [this.sandbox.id]);
				}
			},

			/**
			 * Handler of save event.
			 * @protected
			 */
			onSave: function() {
				if (!this.get("GenerationValid")) {
					this.publishSavingResult(null);
					return;
				}
				this.saveDesignData(this.publishSavingResult, this);
			},

			/**
			 * Handler of after save event.
			 * @protected
			 */
			onAfterSave: function() {
				this._updateNewDraggableItemsVisibility();
			},

			/**
			 * Publishes the results of saving.
			 * @protected
			 * @param {Object} saveResult Result of saving.
			 */
			publishSavingResult: function(saveResult) {
				this.hideBodyMask();
				this.sandbox.publish("SavingResult", saveResult, [this.sandbox.id]);
			},

			/**
			 * Handler of validate event.
			 * @protected
			 */
			onValidate: function() {
				if (!this.get("GenerationValid")) {
					this.publishValidationResult(true);
					return;
				}
				this.asyncValidate(this.publishValidationResult, this);
			},

			/**
			 * Publishes the results of validation.
			 * @protected
			 * @param {Object} result Result of validation.
			 */
			publishValidationResult: function(result) {
				this.hideBodyMask();
				this.sandbox.publish("ValidationResult", result, [this.sandbox.id]);
			},

			/**
			 * Adds new group into the drag and drop elements.
			 * @protected
			 * @param {String} groupName New group of drag and drop elements.
			 */
			addDraggableGroupName: function(groupName) {
				const addGroupName = function(item) {
					item.addDraggableGroupName(groupName);
				};
				this.$DataModels.each(function(dataViewModel) {
					const existingItems = dataViewModel.get("ExistingModelDraggableItems");
					const newModelItems = dataViewModel.get("NewModelDraggableItems");
					const newElementItems = dataViewModel.get("NewElementDraggableItems");
					const newWidgetsItems = dataViewModel.get("NewWidgetsModelDraggableItems");
					if (existingItems) {
						existingItems.each(addGroupName, this);
					}
					if (newModelItems) {
						newModelItems.each(addGroupName, this);
					}
					if (newElementItems) {
						newElementItems.each(addGroupName, this);
					}
					if (newWidgetsItems) {
						newWidgetsItems.each(addGroupName, this);
					}
				}, this);
			},

			/**
			 * Updates used columns.
			 * @protected
			 * @return {Object} Object which contains information about used columns.
			 */
			updateUsedColumns: function() {
				const usedColumns = {};
				const gridLayout = this.getGridLayoutEditCollections();
				Terrasoft.each(gridLayout, function(gridLayoutName) {
					const collectionName = this.getGridLayoutEditCollectionName(gridLayoutName);
					const itemsCollection = this.get(collectionName);
					itemsCollection.each(function(modelItem) {
						const itemConfig = modelItem.itemConfig;
						const bindTo = itemConfig.bindTo || itemConfig.name;
						usedColumns[bindTo] = usedColumns[bindTo] || 0;
						usedColumns[bindTo]++;
					}, this);
				}, this);
				this.set("UsedColumns", usedColumns);
				return usedColumns;
			},

			/**
			 * Updates used lookup columns.
			 * @protected
			 * @return {Object} Object which contains information about used lookup columns.
			 */
			updateUsedLookupColumns: function() {
				var columns = this.columns;
				var usedLookupColumns = Ext.create("Terrasoft.Collection");
				Terrasoft.each(columns, function(column) {
					if (column.referenceSchemaName && !usedLookupColumns.contains(column.uId)) {
						usedLookupColumns.add(column.uId, column.referenceSchemaName);
					}
				}, this);
				this.$UsedLookupColumns = usedLookupColumns;
			},

			/**
			 * Sorts the collection of columns, exposing the first place to show the primary column,
			 * then required, then all the other.
			 * @protected
			 * @param {Terrasoft.core.collections.Collection} collection Collection of columns for sort.
			 * @param {Terrasoft.model.BaseViewModel} dataModel Data source view model.
			 */
			sortColumnsCollection: function(collection, dataModel) {
				const instance = dataModel.get("Schema");
				const primaryDisplayColumnUId = instance.getPropertyValue("primaryDisplayColumnUId");
				collection.sortByFn(function(column1, column2) {
					const uId1 = column1.getPropertyValue("uId");
					if (uId1 === primaryDisplayColumnUId) {
						return -1;
					}
					const uId2 = column2.getPropertyValue("uId");
					if (uId2 === primaryDisplayColumnUId) {
						return 1;
					}
					const isRequired1 = column1.getPropertyValue("isRequired");
					const isRequired2 = column2.getPropertyValue("isRequired");
					if (isRequired1 !== isRequired2) {
						return (isRequired2 - isRequired1);
					}
					let property1 = column1.getPropertyValue("caption");
					let property2 = column2.getPropertyValue("caption");
					property1 = property1 && property1.getValue();
					property2 = property2 && property2.getValue();
					if (property1 === property2) {
						return 0;
					}
					return (property1 < property2) ? -1 : 1;
				}, this);
			},

			/**
			 * Checks the column, if its can be added to the grid.
			 * @protected
			 * @param {Terrasoft.manager.EntitySchemaColumn} column Object of column.
			 * @return {Boolean} true if column can be added to the grid, false - otherwise.
			 */
			columnsFilterFn: function(column) {
				if (column.getStatus() === Terrasoft.ModificationStatus.REMOVED) {
					return false;
				}
				const allowedDataValeTypes = [
					Terrasoft.DataValueType.TEXT, Terrasoft.DataValueType.INTEGER,
					Terrasoft.DataValueType.FLOAT, Terrasoft.DataValueType.MONEY,
					Terrasoft.DataValueType.DATE_TIME, Terrasoft.DataValueType.DATE,
					Terrasoft.DataValueType.TIME, Terrasoft.DataValueType.LOOKUP,
					Terrasoft.DataValueType.ENUM, Terrasoft.DataValueType.BOOLEAN
				];
				return column.usageType !== Terrasoft.EntitySchemaColumnUsageType.None &&
					Ext.Array.contains(allowedDataValeTypes, column.dataValueType);
			},

			/**
			 * @protected
			 */
			loadColumnsCollection: function(collection, columns, designItemClassName, viewModel) {
				const draggableGroupNames = this.getGridLayoutEditCollections();
				const filteredColumns = columns.filterByFn(this.columnsFilterFn, this);
				this.sortColumnsCollection(filteredColumns, viewModel);
				const usedColumns = this.get("UsedColumns");
				Terrasoft.each(filteredColumns, function(column) {
					collection.add(column.uId, Ext.create(column.designToolClassName, {
						designItemClassName: designItemClassName,
						parentViewModel: viewModel,
						column: column,
						sandbox: {id: this.sandbox.id},
						values: {
							UId: column.uId,
							Name: column.name,
							draggableGroupNames: draggableGroupNames,
							IsUsed: Boolean(usedColumns[column.name]),
							IsRequired: column.isRequired
						}
					}));
				}, this);
			},

			/**
			 * Initialize item label caption.
			 * @protected
			 * @param {Object} itemConfig Item config.
			 */
			initItemLabelCaption: function(itemConfig) {
				const bindTo = Terrasoft.get(itemConfig, "labelConfig.caption.bindTo");
				if (bindTo) {
					const resourceName = this.getSchemaResourceNameFromModelResourceName(bindTo);
					if (resourceName) {
						let value;
						if (this.get("Initializing")) {
							value = this.get(bindTo);
						} else {
							const localizableString = this.get("PageSchema").localizableStrings.find(resourceName);
							value = (localizableString || "").toString();
						}
						itemConfig.labelConfig = Ext.apply(itemConfig.labelConfig || {}, {captionValue: value});
					}
				}
			},

			/**
			 * Creates elements collection on a page.
			 * @protected
			 * @param {Object} config Grid configuration.
			 */
			createGridLayoutEditCollection: function(config) {
				config.items = Terrasoft.GridLayoutUtils.fixItemsIntersections(config.items);
				const collection = Ext.create("Terrasoft.BaseViewModelCollection");
				Terrasoft.each(config.items, function(item) {
					this.addGridLayoutItemToCollection(collection, item);
				}, this);
				return collection;
			},

			/**
			 * Returns item column object.
			 * @protected
			 * @param {Object} item Item object.
			 * @return {Object} Item column object.
			 */
			getItemColumn: function(item) {
				let itemColumn = this.columns[item.name];
				if (!itemColumn && item.bindTo) {
					itemColumn = this.columns[item.bindTo] || {};
				}
				return itemColumn;
			},

			/**
			 * Generates the name of the collection grid elements.
			 * @protected
			 * @param {Object|String} config Configuration or name of the presentation element.
			 * @return {string} Collection name of grid elements.
			 */
			getGridLayoutEditCollectionName: function(config) {
				return (config.name || config) + "Collection";
			},

			getGridLayoutEditCollection: function(config) {
				return this.get(this.getGridLayoutEditCollectionName(config));
			},

			/**
			 * Draggable item change event handler.
			 * @protected
			 * @param {Terrasoft.configuration.SchemaDesignToolItem} item Draggable item.
			 * @param {Object} config Event options.
			 */
			draggableItemChanged: function(item, config) {
				this.modifyDraggableConfigByLayoult(config);
				if (config.operation) {
					switch (config.operation) {
						case "InvalidDrop":
							this.onDraggableItemInvalidDrop(item, config);
							break;
						case "DragOver":
							this.onDraggableItemDragOver(item, config);
							break;
						case "DragDrop":
							this.onDraggableItemDragDrop(item, config);
							break;
						case "Remove":
							this.onDraggableItemRemove(item, config);
							break;
						default:
					}
				}
			},

			/**
			 * Modifies draggable item change event options.
			 * @protected
			 * @param {Object} config Event options.
			 */
			modifyDraggableConfigByLayoult: function(config) {
				if (config && config.layoutName === "ProfileContainer") {
					Ext.apply(config, {
						colSpan: 1,
						column: 0
					});
				}
			},

			/**
			 * Event handler of invalid drop, clears selection.
			 * @protected
			 */
			onDraggableItemInvalidDrop: function() {
				const collections = this.getGridLayoutEditCollections();
				Terrasoft.each(collections, function(gridLayoutEditName) {
					this.set(gridLayoutEditName + "Selection", null);
				}, this);
			},

			/**
			 * Creates design schema design item.
			 * @protected
			 * @param {Terrasoft.SchemaDesignToolItem} schemaDesignToolItem Schema design tool item.
			 * @param {Object} config Events params.
			 * @return {Object}
			 */
			createDesignSchemaItem: function(schemaDesignToolItem, config) {
				return schemaDesignToolItem.createDesignItem(this, config);
			},

			/**
			 * Event handler of drag element to the grid.
			 * @protected
			 * @param {Terrasoft.SchemaDesignToolItem} schemaDesignToolItem Schema design tool item.
			 * @param {Object} config Events params.
			 */
			onDraggableItemDragDrop: function(schemaDesignToolItem, config) {
				const currentSelection = this.get(config.layoutName + "Selection");
				if (!currentSelection) {
					return;
				}
				const designItem = this.createDesignSchemaItem(schemaDesignToolItem, config);
				designItem.addToDesignSchema(config);
			},

			/**
			 * Event handler of drag element above the grid, updates the selected area in the grid.
			 * @protected
			 * @param {Terrasoft.configuration.SchemaDesignToolItem} item Schema design tool item.
			 * @param {Object} config Params of events.
			 */
			onDraggableItemDragOver: function(item, config) {
				const selectionName = config.layoutName + "Selection";
				const selection = this.get(selectionName);
				if (!selection || !this._sameSelection(selection, config)) {
					this.set(selectionName, null);
					delete config.operation;
					this.set(selectionName, config);
				}
			},

			/**
			 * Returns list of grids on the page.
			 * @protected
			 * @return {Object} Object of grids on the page and their collection.
			 */
			getGridLayoutEditCollections: function() {
				const gridLayoutEditCollections = this.get("GridLayouts") || [];
				return Terrasoft.deepClone(gridLayoutEditCollections);
			},

			/**
			 * @inheritdoc BasePageV2#getCardPrintButtonVisible
			 * @override
			 */
			getCardPrintButtonVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc BasePageV2#getSectionPrintButtonVisible
			 * @override
			 */
			getSectionPrintButtonVisible: function() {
				return false;
			},

			/**
			 * Returns control group configuration button visibility.
			 * @protected
			 * @param {String} groupName Control group name.
			 * @return {Boolean} True - if control group can be configured, false - in other case.
			 */
			getGroupConfigurationButtonVisible: function(groupName) {
				return !Ext.isEmpty(groupName);
			},

			/**
			 * Returns control group remove button visibility.
			 * @protected
			 * @param {String} groupName Control group name.
			 * @return {Boolean} True - if control group can be removed, false - in other case.
			 */
			getGroupRemoveButtonVisible: function(groupName) {
				return !Ext.isEmpty(groupName);
			},

			/**
			 * Returns non existent of all required columns on the page.
			 * @protected
			 * @return {Array}
			 */
			getNotUsedRequiredColumns: function() {
				const notUsedRequiredColumns = [];
				const usedColumns = this.get("UsedColumns");
				this.$DataModels.each(function(dataModel) {
					if (dataModel.get("Name") === "Elements") {
						return;
					}
					let columns = dataModel.get("Schema").columns;
					columns = columns.filterByFn(this.columnsFilterFn, this);
					columns.each(function(column) {
						const columnPath = dataModel.getColumnPath(column.name);
						if (column.isRequired && !usedColumns[columnPath]) {
							let columnCaption = column.getPropertyValue("caption").toString();
							if (!dataModel.get("IsPrimary")) {
								const dataModelCaption = dataModel.get("Caption");
								columnCaption = dataModelCaption + "." + columnCaption;
							}
							notUsedRequiredColumns.push(columnCaption);
						}
					}, this);
				}, this);
				return notUsedRequiredColumns;
			},

			/**
			 * Checks existence of all required columns on the page.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			validateRequiredFields: function(callback, scope) {
				const notUsedRequiredColumns = this.getNotUsedRequiredColumns();
				if (notUsedRequiredColumns.length) {
					const template = this.get("Resources.Strings.NotUsedRequiredFieldsMessage");
					const caption = Ext.String.format(template, notUsedRequiredColumns.join("\n"));
					const cancelButton = Terrasoft.getButtonConfig("no",
						Terrasoft.Resources.Controls.Button.ButtonCaptionCancel, "cancel");
					this.showConfirmationDialog(caption, function(returnCode) {
						const result = returnCode !== "no";
						callback.call(scope, result);
					}, ["ok", cancelButton], {defaultButton: 0});
				} else {
					callback.call(scope, true);
				}
			},

			/**
			 * Validating a model representation into asynchronous mode.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			asyncValidate: function(callback, scope) {
				let validationResult = true;
				const applyValidationResult = function(next, result) {
					validationResult = validationResult && result;
					if (validationResult) {
						next(validationResult);
					} else {
						callback.call(scope, validationResult);
					}
				};
				Terrasoft.chain(
					this.validateRequiredFields,
					applyValidationResult,
					function() {
						callback.call(scope, validationResult);
					},
					this);
			},

			/**
			 * Save schema changes.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			saveDesignData: function(callback, scope) {
				const maskId = Terrasoft.Mask.show();
				const schemaView = this.get("SchemaView");
				this.applyGridLayoutEditItems(schemaView);
				this.updateProfileContainerItems();
				this.applyTabOrders(schemaView);
				const pageSchema = this.$PageSchema;
				const parentSchemaView = this.get("ParentSchemaView");
				const diff = Terrasoft.JsonDiffer.getJsonDiff(parentSchemaView, schemaView,
					{identifyItemByPath: true});
				pageSchema.setSchemaDiff(diff);
				pageSchema.setSchemaDetails(this.$Schema.details);
				pageSchema.setSchemaModules(this.$Schema.modules);
				pageSchema.setSchemaDataModels(this.$Schema.dataModels);
				const dashboardItem = this.$WritableWidgetDashboardManagerItem;
				if (dashboardItem && Terrasoft.isEmptyObject(dashboardItem.getItems())) {
					Terrasoft.WidgetDashboardManager.removeIfExists(dashboardItem.getId());
					this.$WritableWidgetDashboardManagerItem = null;
				}
				this.undefViewModelClass(pageSchema);
				Terrasoft.chain(
					this.updatePageDetailsRegistration,
					this.updateSspPageColumns,
					function() {
						pageSchema.define(function() {
							Terrasoft.Mask.hide(maskId);
							callback.call(scope);
						}, this);
					}, this
				);
			},

			/**
			 * Updates page details registration.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			updatePageDetailsRegistration: function(callback, scope) {
				if (Terrasoft.Features.getIsDisabled("SspSectionWizard") || !this.$IsSspSection) {
					return Ext.callback(callback, scope || this);
				}
				var cardUId = this._getCardSchemaUId();
				var registeredDetails = Terrasoft.SspPageDetailsManager.filterByFn(function(item) {
					return item.cardSchemaUId === cardUId;
				});
				var actualDetails = this.getDesignedDetails();
				this.processRemovedDetails(actualDetails, registeredDetails);
				this.processAddedDetails(actualDetails, registeredDetails, callback, scope);
			},

			/**
			 * Retruns {@link Terrasoft.DetailManagerItem} collection for current schema details.
			 * @protected
			 * @return {Terrasoft.Collection} Current schema details items.
			 */
			getDesignedDetails: function() {
				var schema = this.get("Schema") || {};
				var designedDetailsConfig = schema.details;
				var detailItems = Terrasoft.mapObject(designedDetailsConfig, function(config) {
					return this.getDetailManagerItem(config.schemaName);
				}, this);
				var result = Ext.create("Terrasoft.Collection");
				Terrasoft.each(detailItems, function(item) {
					if (item) {
						result.add(item);
					}
				});
				return result;
			},

			/**
			 * Creates new details registration for added details.
			 * @protected
			 * @param {Terrasoft.Collection} actualDetails Current schema details {@link Terrasoft.DetailManagerItem} collection.
			 * @param {Terrasoft.Collection} registeredDetails Current schema {@link Terrasoft.SspPageDetailsManagerItem} collection.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			processAddedDetails: function(actualDetails, registeredDetails, callback, scope) {
				var pageSchema = this.$PageSchema;
				if (Ext.isEmpty(pageSchema)) {
					return Ext.callback(callback, scope || this);
				}
				var cardUId = this._getCardSchemaUId();
				var newItems = [];
				actualDetails.each(function(actualItem) {
					if (!registeredDetails.any(function(item) {
						return actualItem.getId() === item.getSysDetailId();
					})) {
							newItems.push(actualItem);
					}
				}, this);
				if (Ext.isEmpty(newItems)) {
					return Ext.callback(callback, scope || this);
				}
				var generatorFn = function(newItem) {
					return function(next) {
						this.registerDetailOnPage(newItem, cardUId, next, this);
					}.bind(this);
				}.bind(this);
				Terrasoft.chainForArray(newItems, generatorFn, function() {
					this._updateSspSectionModifiedOn(callback, scope);
				}, this);
			},

			/**
			 * Removes details registration for removed details.
			 * @protected
			 * @param {Terrasoft.Collection} actualDetails Current schema details {@link Terrasoft.DetailManagerItem} collection. 
			 * @param {Terrasoft.Collection} registeredDetails Current schema {@link Terrasoft.SspPageDetailsManagerItem} collection.
			 */
			processRemovedDetails: function(actualDetails, registeredDetails) {
				registeredDetails.each(function(registeredItem) {
					if (!actualDetails.any(function(item) {
							return item.getId() === registeredItem.getSysDetailId();
						})) {
							registeredItem.remove();
					}
				}, this);
			},

			/**
			 * Creates new {@link Terrasoft.SspPageDetailsManagerItem} for added detail.
			 * @protected
			 * @param {Terrasoft.DetailManagerItem} detail {@link Terrasoft.DetailManagerItem} instance.
			 * @param {String} cardUId Current schema uid.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			registerDetailOnPage: function(detail, cardUId, callback, scope) {
				var manager = Terrasoft.SspPageDetailsManager;
				var config = {
					propertyValues: {
						cardSchemaUId: cardUId,
						entitySchemaUId: detail.getEntitySchemaUId()
					}
				};
				manager.createItem(config, function(item) {
					item.setSysDetailId(detail.getId());
					item.detail = detail;
					manager.addItem(item);
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Updates used on SSP page columns list.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			updateSspPageColumns: function(callback, scope) {
				if (Terrasoft.Features.getIsDisabled("SspSectionWizard") || !this.$IsSspSection) {
					return Ext.callback(callback, scope || this);
				}
				Terrasoft.chain(
					this.getPortalSchemaAccessList,
					function(next, portalSchemaItem) {
						this.getSspUsedColumns(function(columns) {
							Ext.callback(next, scope || this, [columns, portalSchemaItem]);	
						}, this);
					},
					function(next, columns, portalSchemaItem) {
						var portalSchemaItemId = portalSchemaItem.getId();
						this.getNewPortalColumnAccessListItemsConfig(portalSchemaItemId, columns, function(newSspColumns) {
							Ext.callback(next, scope || this, [newSspColumns]);
						}, this);
					},
					function(next, newSspColumns) {
						this.createPortalColumnAccessListItems(newSspColumns, callback, scope || this);
					}, this);
			},

			/**
			 * Returns current section {@link Terrasoft.PortalSchemaAccessListManagerItem} instance.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getPortalSchemaAccessList: function(callback, scope) {
				var manager = Terrasoft.PortalSchemaAccessListManager;
				var entitySchema = this.entitySchema;
				var entitySchemaName = entitySchema.name;
				var portalSchemaItem = manager.findByFn(function(item) {
					return item.entitySchemaName === entitySchemaName;
				});
				if (portalSchemaItem) {
					return Ext.callback(callback, scope || this, [portalSchemaItem]);
				}
				var config = {
					propertyValues: {
						entitySchemaName: entitySchemaName,
						entitySchemaUId: entitySchema.uId
					}
				};
				manager.createItem(config, function(item) {
					Ext.callback(callback, scope || this, [manager.addItem(item)]);
				}, this);
			},

			/**
			 * Returns used on current page columns collection.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getSspUsedColumns: function(callback, scope) {
				var usedColumns = this.$UsedColumns;
				var entitySchema = this._getEntitySchemaInstance();
				var columnNames = Terrasoft.keys(usedColumns);
				var detailFilterColumns = this.getDetailsFilterColumns();
				columnNames = Ext.Array.merge(columnNames, detailFilterColumns);
				var columns = entitySchema.columns.filterByFn(function(item) {
						return Ext.Array.contains(columnNames, item.name); 
					});
				Ext.callback(callback, scope || this, [columns]);
			},

			/**
			 * Returns used as detail filters columns names array.
			 * @protected
			 * @return {Array} Used as detail filters columns names array.
			 */
			getDetailsFilterColumns: function() {
				var schema = this.get("Schema") || {};
				var designedDetailsConfig = schema.details;
				var columnNames = [];
				Terrasoft.each(designedDetailsConfig, function(config) {
					var filters = config.filter || {};
					var masterColumn = filters.masterColumn;
					if(!Ext.isEmpty(masterColumn)) {
						columnNames.push(masterColumn);
					}
				}, this);
				return columnNames;
			},

			/**
			 * Returns an array of configs for the {@link Terrasoft.PortalColumnAccessListManagerItem} to be created.
			 * @protected
			 * @param {String} portalSchemaItemId Current section {@link Terrasoft.PortalSchemaAccessListManagerItem}
			 * identifier.
			 * @param {Terrasoft.Collection} columns Used columns collection.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope. 
			 */
			getNewPortalColumnAccessListItemsConfig: function(portalSchemaItemId, columns, callback, scope) {
				var manager = Terrasoft.PortalColumnAccessListManager;
				var newSspColumns = [];
				columns.each(function(column) {
					var uId = column.uId;
					var columnItem = manager.findByFn(function(item) {
						return item.columnUId === uId && item.getPortalSchemaListId() === portalSchemaItemId
							&& !this.isColumnReferenceSchemaChanged(column);
					}, this);
					if(Ext.isEmpty(columnItem)) {
						newSspColumns.push({
							"columnUId": uId,
							"portalSchemaItemId": portalSchemaItemId
						});
					}
				}, this);
				Ext.callback(callback, scope || this, [newSspColumns]);
			},

			/**
			 * Returns sign that lookup column reference schema was changed.
			 * @protected
			 * @param {Object} column Lookup column.
			 */
			isColumnReferenceSchemaChanged: function(column) {
				var usedLookupColumns = this.$UsedLookupColumns;
				var referenceSchemaUId = column.referenceSchemaUId;
				var referenceSchema = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
				var uId = column.uId;
				return usedLookupColumns.find(uId) && referenceSchemaUId && referenceSchema &&
					referenceSchema.name !== usedLookupColumns.find(uId);
			},

			/**
			 * Creates and adds to manager new {@link Terrasoft.PortalColumnAccessListManagerItem}.
			 * @protected
			 * @param {Array} newSspColumns new {@link Terrasoft.PortalColumnAccessListManagerItem} config arrays.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope. 
			 */
			createPortalColumnAccessListItems: function(newSspColumns, callback, scope) {
				if (Ext.isEmpty(newSspColumns)) {
					return Ext.callback(callback, scope || this);
				}
				var generatorFn = function(newItem) {
					return function(next) {
						this.registerColumnOnPage(newItem, next, this);
					}.bind(this);
				}.bind(this);
				Terrasoft.chainForArray(newSspColumns, generatorFn, function() {
					this._updateSspSectionModifiedOn(callback, scope);
				}, this);
			},

			/**
			 * Creates and adds to manager new {@link Terrasoft.PortalColumnAccessListManagerItem}.
			 * @protected
			 * @param {Object} newItemConfig new {@link Terrasoft.PortalColumnAccessListManagerItem} config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope. 
			 */
			registerColumnOnPage: function(newItemConfig, callback, scope) {
				var manager = Terrasoft.PortalColumnAccessListManager;
				var config = {
					propertyValues: {
						columnUId: newItemConfig.columnUId
					}
				};
				manager.createItem(config, function(item) {
					item.setPortalSchemaListId(newItemConfig.portalSchemaItemId);
					item.entitySchema = this._getEntitySchemaInstance();
					manager.addItem(item);
					Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * Finds {@link Terrasoft.DetailManagerItem} by name.
			 * @protected
			 * @param {String} detailName Detail schema name.
			 * @return {Terrasoft.DetailManagerItem|null}  {@link Terrasoft.DetailManagerItem} instance.
			 */
			getDetailManagerItem: function(detailSchemaName) {
				return Terrasoft.DetailManager.findByFn(function(item) {
					return item.detailSchemaName === detailSchemaName;
				});
			},

			/**
			 * Update profile container items.
			 * @protected
			 */
			updateProfileContainerItems: function() {
				const profileContainer = this.getSchemaViewItem("ProfileContainer");
				if (profileContainer && profileContainer.items) {
					Terrasoft.each(profileContainer.items, function(item) {
						Ext.apply(item.layout, {
							"colSpan": 24,
							"column": 0
						});
					}, this);
				}
			},

			/**
			 * Removes information about the created class of view model schema.
			 * @protected
			 * @param {Terrasoft.manager.ClientUnitSchema} instance Instance of scheme.
			 */
			undefViewModelClass: function(instance) {
				const entitySchemaName = this.get("EntitySchemaName");
				instance.undefViewModelClass(entitySchemaName);
			},

			/**
			 * Returns prepared grid layouts by collections.
			 * @protected
			 * @param {Object[]} collections Collections.
			 * @return {Object}
			 */
			getGridLayoutsByCollections: function(collections) {
				const gridLayouts = {};
				Terrasoft.each(collections, function(gridLayoutName) {
					const collectionName = this.getGridLayoutEditCollectionName(gridLayoutName);
					gridLayouts[gridLayoutName] = gridLayouts[gridLayoutName] || [];
					const gridLayoutCollection = this.get(collectionName);
					if (!Ext.isEmpty(gridLayoutCollection)) {
						gridLayoutCollection.each(function(item) {
							const itemConfig = item.getConfigObject();
							this._updateItemLabelCaption(itemConfig);
							gridLayouts[gridLayoutName].push(itemConfig);
						}, this);
					}
				}, this);
				return gridLayouts;
			},

			/**
			 * Updates order property for tabs from schema view.
			 * @protected
			 * @param {Object} schemaView Scheme view.
			 */
			applyTabOrders: function(schemaView) {
				if (!this.getIsFeatureEnabled("UseTabOrderProperty")) {
					return;
				}
				let tabs;
				Terrasoft.iterateChildItems(schemaView, function(iterationConfig) {
					const item = iterationConfig.item;
					if (item.name === "Tabs" && item.tabs) {
						tabs = item.tabs;
					}
				}, this);
				if (!tabs) {
					return;
				}
				tabs.forEach(function(item) {
					const itemOrder = this.$TabsCollection.indexOfKey(item.name);
					if (itemOrder >= 0) {
						item.order = itemOrder;
					}
				}, this);
			},

			/**
			 * Updates the given scheme of new grid elements.
			 * @protected
			 * @param {Object} schemaView Scheme view.
			 */
			applyGridLayoutEditItems: function(schemaView) {
				const collections = this.getGridLayoutEditCollections();
				const gridLayouts = this.getGridLayoutsByCollections(collections);
				Terrasoft.iterateChildItems(schemaView, function(iterationConfig) {
					const schemaItem = iterationConfig.item;
					const schemaItemConfigItems = gridLayouts[schemaItem.name];
					if (!Ext.isEmpty(schemaItemConfigItems) || Ext.isArray(schemaItemConfigItems)) {
						schemaItem.items = schemaItemConfigItems;
					}
				}, this);
			},

			/**
			 * @inheritdoc BasePageV2#loadDetail
			 * @override
			 */
			loadDetail: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BasePageV2#onRender
			 * @override
			 */
			onRender: Terrasoft.emptyFn,

			/**
			 * @inheritdoc BasePageV2#getTabsContainerVisible
			 * @override
			 */
			getTabsContainerVisible: function() {
				return true;
			},

			/**
			 * @inheritdoc BasePageV2#getDefaultTabName
			 * @override
			 */
			getDefaultTabName: function() {
				let tabName = this.callParent(arguments);
				if (!this.hasTab(tabName)) {
					tabName = null;
				}
				return tabName;
			},

			/**
			 * Has active tab.
			 * @protected
			 * @return {Boolean} True - if tab collection contains active tab, false - otherwise.
			 */
			hasActiveTab: function() {
				const activeTabName = this.get("ActiveTabName");
				return this.hasTab(activeTabName);
			},

			/**
			 * Has tab.
			 * @protected
			 * @return {Boolean} True - if tab collection contains tab with input tab name, false - otherwise.
			 */
			hasTab: function(tabName) {
				const tabsCollection = this.get("TabsCollection");
				return tabsCollection.contains(tabName);
			},

			/**
			 * Tab items ordered.
			 * @protected
			 */
			onTabOrderedChange: function(tabName, position) {
				const moveDiff = this.generateTabMoveDiff(tabName, position);
				this.onSchemaChanged(moveDiff);
			},

			/**
			 * Open the window of detail settings.
			 * @protected
			 */
			openDetailSettingWindow: function(eventName, modelMethod, model, tag) {
				this.set("EditableDetailName", tag || null);
				this.sandbox.loadModule("ModalBoxSchemaModule", {id: this.getDetailModalBoxWindowId()});
			},

			/**
			 * Save tab configuration.
			 * @protected
			 * @param {Object} tabConfig Tab configuration.
			 */
			onSaveTabConfig: function(tabConfig) {
				const caption = tabConfig.caption;
				const isNewTab = this.get("IsNewTab");
				if (isNewTab) {
					this.saveNewTab(caption);
				} else {
					const activeTabName = this.get("ActiveTabName");
					const tabsCollection = this.get("TabsCollection");
					const activeTab = tabsCollection.get(activeTabName);
					const updateConfig = {
						tab: activeTab,
						name: activeTab.get("Name"),
						value: caption
					};
					this.updateTabCaption(updateConfig);
				}
			},

			/**
			 * Adds new tab.
			 * @protected
			 */
			addTab: function() {
				this.showTabModalBox(true);
			},

			/**
			 * Saves new tab.
			 * @protected
			 * @param {String} tabCaption Caption of the created tab.
			 */
			saveNewTab: function(tabCaption) {
				const tabName = Terrasoft.ViewModelSchemaDesignerUtils.getUniqueItemName("Tab") + "TabLabel";
				const resourceName = Terrasoft.ViewModelSchemaDesignerUtils.generateTabCaptionResourcesName(tabName);
				this._addNewTabLocalizableString(resourceName, tabCaption);
				const viewModelResourceName =
					Terrasoft.ViewModelSchemaDesignerUtils.getModelStringResourceName(resourceName);
				this.set(viewModelResourceName, tabCaption);
				const tabsCollection = this.$TabsCollection;
				const newTabIndex = this.getTabIndex(tabsCollection, this.$ActiveTabName) + 1;
				this._addTabToCollection(tabName, tabCaption, newTabIndex);
				const insertDiff = this.generateTabInsertDiff(tabName, viewModelResourceName, newTabIndex);
				this.onSchemaChanged(insertDiff);
				this.setNextActiveTabByIndex(tabsCollection, newTabIndex);
			},

			/**
			 * Returns whether tab with name tabName can be removed or not.
			 * @param {String} tabName Tab name.
			 * @return {Boolean}
			 */
			canRemoveTab: function(tabName) {
				const tabsCollection = this.get("TabsCollection");
				return Boolean(tabName) && tabsCollection.getCount() > 1;
			},

			/**
			 * Removes tab.
			 * @protected
			 */
			removeTab: function() {
				const activeTabName = this.get("ActiveTabName");
				if (this.canRemoveTab(activeTabName)) {
					const tabsCollection = this.get("TabsCollection");
					const index = this.getTabIndex(tabsCollection, activeTabName);
					tabsCollection.removeByKey(activeTabName);
					const removeDiff = this.generateTabRemoveDiff(activeTabName);
					this.onSchemaChanged(removeDiff);
					this.setNextActiveTabByIndex(tabsCollection, index);
				}
			},

			/**
			 * Returns tab remove button visibility.
			 * @protected
			 * @return {boolean} true - if tab can be removed, false - in other case.
			 */
			getTabRemoveButtonVisible: function() {
				if (this.getIsFeatureEnabled("UseTabOrderProperty")) {
					return true;
				}
				return this.get("ActiveTabName") !== "ESNTab";
			},

			/**
			 * Returns tab index.
			 * @protected
			 * @param {Object} collection Tabs collection.
			 * @param {String} name Tab name.
			 * @return {Number} Tab index.
			 */
			getTabIndex: function(collection, name) {
				return collection.getKeys().indexOf(name);
			},

			/**
			 * Sets next active tab.
			 * @protected
			 * @param {Object} collection Tabs collection.
			 * @param {Number} index Tab index.
			 */
			setNextActiveTabByIndex: function(collection, index) {
				const keys = collection.getKeys();
				const length = keys.length;
				index = (index >= length) ? length - 1 : index;
				if (length > 0) {
					this.set("ActiveTabName", keys[index]);
				}
			},

			/**
			 * Returns Tab modal box config.
			 * @return {Object}
			 */
			getTabModalBoxConfig: function() {
				const tabCaption = this.getTabCaption();
				return {
					schemaName: "ViewModelSchemaDesignerTabModalBox",
					tabCaption: tabCaption,
					modalBoxSize: {
						"width": "500px",
						"height": "185px"
					}
				};
			},

			/**
			 * Returns tab caption for tab modal box.
			 * @return {String}
			 */
			getTabCaption: function() {
				const tabsCollection = this.get("TabsCollection");
				const isNewTab = this.get("IsNewTab");
				let tabCaption = this.get("Resources.Strings.NewTabNameModalBox") || "";
				if (this.hasActiveTab() && !isNewTab) {
					const activeTabName = this.get("ActiveTabName");
					const activeTab = tabsCollection.get(activeTabName);
					tabCaption = activeTab.get("Caption");
				}
				return tabCaption;
			},

			/**
			 * Returns tab modal box window id.
			 * @return {String}
			 */
			getTabModalBoxWindowId: function() {
				return this.sandbox.id + "_TabModalBox";
			},

			/**
			 * Show tab modal box window.
			 * @protected
			 * @param {Boolean} newTab Whether new tab.
			 */
			showTabModalBox: function(newTab) {
				this.set("IsNewTab", newTab);
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this.getTabModalBoxWindowId()
				});
			},

			/**
			 * Edits tab caption.
			 * @protected
			 */
			editTab: function() {
				if (this.hasActiveTab()) {
					this.showTabModalBox(false);
				}
			},

			/**
			 * Update tab caption.
			 * @param {Object} config Configuration.
			 * @param {Object} config.tab Tab.
			 * @param {String} config.name Tab name.
			 * @param {Object} config.value Control value.
			 */
			updateTabCaption: function(config) {
				config.tab.set("Caption", config.value);
				const tabCaptionResourceName =
					Terrasoft.ViewModelSchemaDesignerUtils.generateTabCaptionResourcesName(config.name);
				this.updateItemCaption(config.name, config.value, tabCaptionResourceName);
			},

			/**
			 * Removes the detail.
			 * @protected
			 */
			removeDetail: function(eventName, modelMethod, model, tag) {
				const removableDetailName = tag;
				const currentSchema = this.get("Schema");
				const currentSchemaDetails = currentSchema.details;
				this.removeTabContentItem(removableDetailName);
				delete currentSchemaDetails[removableDetailName];
			},

			/**
			 * Returns detail edit availability.
			 * @param {String} detailKey Unique detail key.
			 * @return {Boolean} Detail edit availability.
			 */
			canEditDetail: function(detailKey) {
				const detail = this._getSchemaDetail(detailKey);
				if (!detail) {
					return false;
				}
				return this._isRegisteredDetail(detail);
			},

			/**
			 * Generates the name for the group caption of the resource.
			 * @protected
			 * @param {String} groupName Name of the group.
			 * @return {String} Name of resource of group caption.
			 */
			generateGroupCaptionResourcesName: function(groupName) {
				return groupName + "GroupCaption";
			},

			/**
			 * Generates the name for the item label caption of the resource.
			 * @protected
			 * @param {String} itemName Name of the item.
			 * @return {String} Name of resource of group caption.
			 */
			generateLabelCaptionResourcesName: function(itemName) {
				return itemName.replace(/-/g, "") + "LabelCaption";
			},

			/**
			 * Gets the name for the detail caption of the resource.
			 * @protected
			 * @param {String} detailKey Unique detail key.
			 * @return {String} Name of resource of detail caption.
			 */
			getDetailCaptionResourcesName: function(detailKey) {
				return detailKey + "DetailCaption";
			},

			/**
			 * Returns full name of the resource which bind to the item caption.
			 * @protected
			 * @param {String} itemName Name of element.
			 * @return {String|null} Full name of the resource item caption.
			 */
			getCaptionResourcesName: function(itemName) {
				let groupCaptionResourcesCache = this.get("CaptionResourcesCache");
				if (!groupCaptionResourcesCache) {
					groupCaptionResourcesCache = {};
					this.set("CaptionResourcesCache", groupCaptionResourcesCache);
				}
				if (groupCaptionResourcesCache[itemName]) {
					return groupCaptionResourcesCache[itemName];
				}
				const group = this.getSchemaViewItem(itemName);
				if (group && group.caption && group.caption.bindTo) {
					groupCaptionResourcesCache[itemName] = group.caption.bindTo;
					return group.caption.bindTo;
				}
				return null;
			},

			/**
			 * @deprecated
			 */
			getLabelCaptionResourceName: function(itemName) {
				const item = this.getSchemaViewItem(itemName);
				const labelConfig = item && item.labelConfig;
				const caption = labelConfig && labelConfig.caption;
				return caption && caption.bindTo;
			},

			/**
			 * Finds the element into the scheme of the page.
			 * @protected
			 * @param {String} itemName Name of item.
			 * @return {Object} Configuration of item.
			 */
			getSchemaViewItem: function(itemName) {
				const schemaView = this.get("SchemaView");
				let result = null;
				Terrasoft.iterateChildItems(schemaView, function(iterationConfig) {
					const item = iterationConfig.item;
					const isItemFound = (item.name === itemName);
					if (isItemFound) {
						result = item;
					}
					return !isItemFound;
				}, this);
				return result;
			},

			/**
			 * Opens control group settings window.
			 * @protected
			 */
			openGroupSettingWindow: function(eventName, modelMethod, model, tag) {
				this.set("ChangingControlGroupName", tag);
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this.getControlGroupModalBoxWindowId()
				});
			},

			/**
			 * Updates control group caption.
			 * @protected
			 * @param {String} itemName Control group name.
			 * @param {String} captionCaption Control group caption.
			 * @param {String} defaultResourceItemCaption Control group caption resource.
			 */
			updateItemCaption: function(itemName, captionCaption, defaultResourceItemCaption) {
				defaultResourceItemCaption = defaultResourceItemCaption || itemName;
				let modelStringResourceName = this.getCaptionResourcesName(itemName);
				const instance = this.get("PageSchema");
				let localizableString = Ext.create("Terrasoft.LocalizableString");
				const diff = [];
				if (Ext.isEmpty(modelStringResourceName)) {
					const utils = Terrasoft.ViewModelSchemaDesignerUtils;
					modelStringResourceName = utils.getModelStringResourceName(defaultResourceItemCaption);
					instance.localizableStrings.add(defaultResourceItemCaption, localizableString);
					diff.push({
						"operation": "merge",
						"name": itemName,
						"values": {
							"caption": {"bindTo": modelStringResourceName}
						}
					});
				} else {
					const bindTo = this.getSchemaResourceNameFromModelResourceName(modelStringResourceName);
					if (instance.localizableStrings.contains(bindTo)) {
						localizableString = instance.localizableStrings.get(bindTo);
					} else {
						instance.localizableStrings.add(bindTo, localizableString);
					}
				}
				this.set(modelStringResourceName, captionCaption || " ");
				localizableString.setValue(captionCaption);
				this.onSchemaChanged(diff);
			},

			/**
			 * Removes control group.
			 * @protected
			 */
			removeGroup: function(eventName, modelMethod, model, tag) {
				this.removeTabContentItem(tag);
			},

			/**
			 * Generates the name of resource of string from the name parameter of model.
			 * @protected
			 * @param {String} resourceName Parameter of model.
			 * @return {String} Name of resource.
			 */
			getSchemaResourceNameFromModelResourceName: function(resourceName) {
				const resourceRegex = /^Resources\.Strings\.(.*?)$/;
				const result = resourceRegex.exec(resourceName);
				return result && result.length > 1 ? result[1] : null;
			},

			/**
			 * Adds control group to the active tab.
			 * @protected
			 * @return {String} New group name.
			 */
			addGroup: function() {
				const tabName = this.get("ActiveTabName");
				const groupName = Terrasoft.ViewModelSchemaDesignerUtils.getUniqueItemName(tabName + "Group");
				const activeTabItems = this.getActiveTabItems();
				const controlGroupViewModel = activeTabItems.createItem({
					Name: groupName,
					ItemType: Terrasoft.ViewItemType.CONTROL_GROUP
				});
				const index = activeTabItems.getCount();
				activeTabItems.add(groupName, controlGroupViewModel, index);
				return groupName;
			},

			/**
			 * Adds detail to the active tab.
			 * @protected
			 * @param {String} detailKey Unique detail name.
			 * @return {String} Unique detail name.
			 */
			addDetail: function(detailKey) {
				const activeTabItems = this.getActiveTabItems();
				const detailViewModel = activeTabItems.createItem({
					Name: detailKey,
					ItemType: Terrasoft.ViewItemType.DETAIL
				});
				const index = activeTabItems.getCount();
				activeTabItems.add(detailKey, detailViewModel, index);
				return detailKey;
			},

			/**
			 * Handler of the click on the action element of the grid.
			 * @protected
			 * @param {String} actionName Name of action.
			 * @param {String} modelItemId Unique id of grid element.
			 * @param {String} layoutName Name of grid.
			 */
			onItemActionClick: function(actionName, modelItemId, layoutName) {
				switch (actionName) {
					case "removeModelItem":
						this.removeModelItem(layoutName, modelItemId);
						break;
					case "openModelItemSettingWindow":
						this.openModelItemSettingWindow(layoutName, modelItemId);
						break;
					default:
				}
			},

			/**
			 * Open the window of grid element settings.
			 * @protected
			 * @param {String} layoutName Collection of grid elements.
			 * @param {String} modelItemId Unique id of grid element.
			 */
			openModelItemSettingWindow: function(layoutName, modelItemId) {
				const collectionName = this.getGridLayoutEditCollectionName(layoutName);
				const collection = this.get(collectionName);
				const item = collection.get(modelItemId);
				item.edit({layoutName: layoutName});
			},

			/**
			 * Remove the grid element.
			 * @protected
			 * @param {String} layoutName Collection of grid elements.
			 * @param {String} modelItemId Unique id of grid element.
			 */
			removeModelItem: function(layoutName, modelItemId) {
				const collectionName = this.getGridLayoutEditCollectionName(layoutName);
				const collection = this.get(collectionName);
				const modelItem = collection.get(modelItemId);
				modelItem.removeFromDesignSchema({layoutName: layoutName});
			},

			/**
			 * Removes tab content item by name.
			 * @private
			 * @param {String} itemName Tab content item name.
			 */
			removeTabContentItem: function(itemName) {
				const activeTabItems = this.getActiveTabItems();
				activeTabItems.removeByKey(itemName);
			},

			/**
			 * Generates adding control group diff.
			 * @protected
			 * @param {Object} item Control group view model.
			 * @param {Number} index Control group index.
			 * @param {String} key Control group name.
			 * @return {Array} Adding control group diff.
			 */
			onAddControlGroup: function(item, index, key) {
				const itemsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				const activeTabName = this.get("ActiveTabName");
				const utils = Terrasoft.ViewModelSchemaDesignerUtils;
				const gridLayoutName = utils.getUniqueItemName(activeTabName + "GridLayout");
				const gridLayout = this.get("GridLayouts");
				gridLayout.push(gridLayoutName);
				const itemsCollectionName = this.getGridLayoutEditCollectionName(gridLayoutName);
				this.set(itemsCollectionName, itemsCollection);
				this.addDraggableGroupName(gridLayoutName);
				const groupCaptionResourceName = this.generateGroupCaptionResourcesName(key);
				const instance = this.get("PageSchema");
				instance.localizableStrings.add(groupCaptionResourceName, Ext.create("Terrasoft.LocalizableString"));
				this.set(groupCaptionResourceName, " ");
				const groupNameCaption = utils.getModelStringResourceName(groupCaptionResourceName);
				return [{
					"operation": "insert",
					"parentName": activeTabName,
					"name": key,
					"propertyName": "items",
					"index": index,
					"values": {
						"caption": {"bindTo": groupNameCaption},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"markerValue": "added-group",
						"items": []
					}
				}, {
					"operation": "insert",
					"parentName": key,
					"propertyName": "items",
					"name": gridLayoutName,
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				}];
			},

			/**
			 * Generates adding detail diff.
			 * @protected
			 * @return {Array} Adding detail diff.
			 */
			onAddDetail: function(item, index, key) {
				const activeTabName = this.get("ActiveTabName");
				return [{
					"operation": "insert",
					"parentName": activeTabName,
					"name": key,
					"propertyName": "items",
					"index": index,
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL,
						"markerValue": "added-detail"
					}
				}];
			},

			/**
			 * Adds element to tab item content and rerenders view.
			 * @protected
			 * @param {Object} item Element view model.
			 * @param {Number} index Element index.
			 * @param {String} key Element name.
			 */
			onAddTabContentItem: function(item, index, key) {
				let diff;
				const itemType = item.get("ItemType");
				if (itemType === Terrasoft.ViewItemType.CONTROL_GROUP) {
					diff = this.onAddControlGroup(item, index, key);
				}
				if (itemType === Terrasoft.ViewItemType.DETAIL) {
					diff = this.onAddDetail(item, index, key);
				}
				if (diff !== null) {
					this.onSchemaChanged(diff);
				}
			},

			/**
			 * Removes element from tab item content and rerenders view.
			 * @protected
			 * @param {Object} item Element view model.
			 * @param {String} key Element name.
			 */
			onRemoveTabContentItem: function(item, key) {
				const diff = [{
					"operation": "remove",
					"name": key
				}];
				this.onSchemaChanged(diff);
			},

			/**
			 * Moves element in tab item content and rerenders view.
			 * @protected
			 * @param {Number} fromIndex Moving element index.
			 * @param {Number} toIndex Destination index.
			 * @param {String} fromKey Moving element name.
			 */
			onMoveTabContentItem: function(fromIndex, toIndex, fromKey) {
				const diff = [{
					"operation": "move",
					"name": fromKey,
					"parentName": this.get("ActiveTabName"),
					"propertyName": "items",
					"index": toIndex
				}];
				this.onSchemaChanged(diff);
			},

			/**
			 * Subscribes tab collection item events.
			 * @param {Object} tabItem Tab item.
			 */
			subscribeTabCollectionItemEvents: function(tabItem) {
				const tabItemCollection = tabItem.get("Content");
				if (!Ext.isEmpty(tabItemCollection)) {
					tabItemCollection.on("add", this.onAddTabContentItem, this);
					tabItemCollection.on("remove", this.onRemoveTabContentItem, this);
					tabItemCollection.on("move", this.onMoveTabContentItem, this);
				}
			},

			/**
			 * Unsubscribes tab collection item events.
			 * @param {Object} tabItem Tab item.
			 */
			unsubscribeTabCollectionItemEvents: function(tabItem) {
				const tabItemCollection = tabItem.get("Content");
				if (!Ext.isEmpty(tabItemCollection)) {
					tabItemCollection.un("add", this.onAddTabContentItem, this);
					tabItemCollection.un("remove", this.onRemoveTabContentItem, this);
					tabItemCollection.un("move", this.onMoveTabContentItem, this);
				}
			},

			/**
			 * Subscribes on tab collection events.
			 * @protected
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			subscribeTabCollectionEvents: function(callback, scope) {
				const tabCollection = this.get("TabsCollection");
				if (tabCollection) {
					tabCollection.on("add", this.subscribeTabCollectionItemEvents, this);
					tabCollection.each(function(tabItem) {
						this.subscribeTabCollectionItemEvents(tabItem);
					}, this);
				}
				callback.call(scope);
			},

			/**
			 * Unsubscribes from tab collection events.
			 * @protected
			 */
			unsubscribeTabCollectionEvents: function() {
				const tabCollection = this.get("TabsCollection");
				if (tabCollection) {
					tabCollection.un("add", this.subscribeTabCollectionItemEvents, this);
					tabCollection.each(function(tabItem) {
						this.unsubscribeTabCollectionItemEvents(tabItem);
					}, this);
				}
			},

			/**
			 * @inheritdoc BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				const relatedProfileItems = this.get("RelatedProfileItems");
				if (relatedProfileItems) {
					relatedProfileItems.un("move", this.onRelatedProfileItemMove, this);
				}
				this.unsubscribeTabCollectionEvents();
				Ext.EventManager.un(window, "beforeunload", this.onBeforeUnload, this);
				this.callParent(arguments);
			},

			/**
			 * Returns tab item id.
			 * @protected
			 * @param {String} tabItemContentItemId Tab item container id.
			 * @return {String} Tab item id.
			 */
			getTabItemContentIdFromContainer: function(tabItemContentItemId) {
				const containerSuffix = "DraggableContainer";
				return tabItemContentItemId.substring(0, tabItemContentItemId.length - containerSuffix.length);
			},

			/**
			 * Returns active tab items.
			 * @protected
			 * @return {Terrasoft.Collection} Active tab items.
			 */
			getActiveTabItems: function() {
				const activeTabName = this.get("ActiveTabName");
				const tabCollection = this.get("TabsCollection");
				const activeTab = tabCollection.get(activeTabName);
				return activeTab.get("Content");
			},

			/**
			 * Returns current tab item reorderable index name.
			 * @protected
			 * @return {String} Current tab item reorderable index name.
			 */
			getCurrentTabItemContentReorderableIndexName: function() {
				return this.get("ActiveTabName") + "ReorderableIndex";
			},

			/**
			 * Updates reorderable index after dragenter event fire.
			 * @protected
			 * @param {String} crossedItemId crossed element id.
			 */
			onTabContainerItemDragEnter: function(crossedItemId) {
				const reorderableIndexName = this.getCurrentTabItemContentReorderableIndexName();
				this.set(reorderableIndexName, null);
				const activeTabItems = this.getActiveTabItems();
				const crossedContentItemId = this.getTabItemContentIdFromContainer(crossedItemId);
				const activeTabKeys = activeTabItems.getKeys();
				let index = activeTabKeys.indexOf(crossedContentItemId);
				if (index === -1) {
					index = crossedItemId ? -1 : null;
				}
				this.set(reorderableIndexName, index);
			},

			/**
			 * Clears reorderable index value.
			 * @protected
			 */
			onTabContainerItemDragOut: function() {
				this.set(this.getCurrentTabItemContentReorderableIndexName(), null);
			},

			/**
			 * Reorders tab item content collection.
			 * @protected
			 * @param {String} droppableItemId Dropping element identifier.
			 */
			onTabContainerItemDragDrop: function(droppableItemId) {
				const reorderableIndexName = this.getCurrentTabItemContentReorderableIndexName();
				let reorderableIndex = this.get(reorderableIndexName);
				this.set(reorderableIndexName, null);
				const activeTabItems = this.getActiveTabItems();
				const droppableContentItemId = this.getTabItemContentIdFromContainer(droppableItemId);
				const activeTabKeys = activeTabItems.getKeys();
				const droppableContentItemIndex = activeTabKeys.indexOf(droppableContentItemId);
				if (!Ext.isEmpty(reorderableIndex)) {
					if (droppableContentItemIndex === -1 || reorderableIndex <= droppableContentItemIndex) {
						reorderableIndex++;
					}
					activeTabItems.move(droppableContentItemIndex, reorderableIndex);
					return true;
				}
				return false;
			},

			/**
			 * Returns control group modal box window id.
			 * @protected
			 * @return {String} Control group modal box window id.
			 */
			getControlGroupModalBoxWindowId: function() {
				return this.sandbox.id + "_ControlGroupModalBox";
			},

			/**
			 * Returns detail modal box window id.
			 * @protected
			 * @return {String} Control group modal box window id.
			 */
			getDetailModalBoxWindowId: function() {
				return this.sandbox.id + "_DetailModalBox";
			},

			/**
			 * Returns control group caption.
			 * @protected
			 * @param {String} controlGroupName Control group name.
			 * @return {String} Control group caption.
			 */
			getControlGroupCaption: function(controlGroupName) {
				const captionResourcesName = this.getCaptionResourcesName(controlGroupName);
				return Ext.isEmpty(captionResourcesName) ? "" : this.get(captionResourcesName);
			},

			/**
			 * Returns control group modal box configuration.
			 * @protected
			 * @return {Object} Control group modal box configuration.
			 */
			getControlGroupModalBoxConfig: function() {
				const controlGroupName = this.get("ChangingControlGroupName");
				const caption = Ext.isEmpty(controlGroupName) ? "" : this.getControlGroupCaption(controlGroupName);
				return {
					"schemaName": "ViewModelSchemaDesignerControlGroupModalBox",
					"controlGroupCaption": caption,
					"modalBoxSize": {
						"width": "500px",
						"height": "185px"
					}
				};
			},

			/**
			 * Returns detail modal box configuration.
			 * @protected
			 * @return {Object} Detail modal box configuration.
			 */
			getDetailModalBoxConfig: function() {
				const detailKey = this.get("EditableDetailName");
				const entitySchema = this.getDetailEntitySchema();
				let detailConfig = null;
				const canEditDetailColumn = Ext.isEmpty(detailKey);
				if (!canEditDetailColumn) {
					const detail = this._getSchemaDetail(detailKey);
					const resourceName = Terrasoft.ViewModelSchemaDesignerUtils.generateDetailCaptionResourcesName(detailKey);
					const designClientUnitSchema = this.get("PageSchema");
					const localizableDetailCaption = designClientUnitSchema.localizableStrings.contains(resourceName)
						? designClientUnitSchema.localizableStrings.get(resourceName)
						: null;
					detailConfig = {
						detailSchemaName: detail.schemaName,
						detailEntitySchemaName: detail.entitySchemaName,
						masterEntitySchemaColumn: detail.filter && detail.filter.masterColumn,
						detailEntitySchemaColumn: detail.filter && detail.filter.detailColumn,
						localizableDetailCaption: localizableDetailCaption
					};
				}
				return {
					schemaName: "ViewModelSchemaDesignerDetailModalBox",
					modalBoxSize: {
						width: "500px",
						height: "280px"
					},
					detailConfig: detailConfig,
					masterEntitySchema: entitySchema,
					packageUId: this.getPackageUId(),
					canEditDetailColumn: canEditDetailColumn,
					canEditConnectionColumns: canEditDetailColumn || !Ext.isEmpty(this.get("Schema").details[detailKey])
				};
			},

			/**
			 * Returns detail schema.
			 * @protected
			 * @return {Object}.
			 */
			getDetailEntitySchema: function() {
				const firstDataModel = this.dataModelCollection.first();
				return firstDataModel && firstDataModel.designSchema;
			},

			/**
			 * Saves new control group caption.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {String} config.caption Control group caption.
			 */
			onSaveControlGroupConfig: function(config) {
				let controlGroupName = this.get("ChangingControlGroupName");
				const controlGroupCaption = config.caption;
				if (Ext.isEmpty(controlGroupName)) {
					controlGroupName = this.addGroup(controlGroupCaption);
				}
				const resourceName = this.generateGroupCaptionResourcesName(controlGroupName);
				this.updateItemCaption(controlGroupName, controlGroupCaption, resourceName);
			},

			/**
			 * Saves detail.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {String} config.detailSchemaName Detail schema name.
			 * @param {String} config.detailEntitySchemaName Detail entity schema name.
			 * @param {String} config.detailEntitySchemaColumn Detail entity schema connection column name.
			 * @param {String} config.masterEntitySchemaColumn Master entity schema connection column name.
			 * @param {String} config.localizableDetailCaption Localizable detail caption.
			 * @param {String} config.isDetailCaptionChanged Detail caption changed mark.
			 */
			onSaveDetailConfig: function(config) {
				const detailKey = this.get("EditableDetailName");
				if (detailKey) {
					this._saveExistingDetail(detailKey, config);
				} else {
					this._saveNewDetail(config);
				}
			},

			/**
			 * Updates item label caption resource.
			 * @private
			 * @param {String} resourceName Resource name.
			 * @param {String} caption Caption.
			 */
			updateItemLabelCaptionResource: function(resourceName, caption) {
				const instance = this.get("PageSchema");
				let localizableString = Ext.create("Terrasoft.LocalizableString");
				if (instance.localizableStrings.contains(resourceName)) {
					localizableString = instance.localizableStrings.get(resourceName);
				} else {
					instance.localizableStrings.add(resourceName, localizableString);
				}
				localizableString.setValue(caption);
			},

			/**
			 * Updates item label caption.
			 * @private
			 * @param {Object} itemConfig Item config.
			 */
			_updateItemLabelCaption: function(itemConfig) {
				const labelConfig = itemConfig.labelConfig;
				const caption = labelConfig && labelConfig.caption;
				const bindTo = caption && caption.bindTo;
				const captionValue = labelConfig && Ext.clone(labelConfig.captionValue);
				if (labelConfig) {
					delete itemConfig.labelConfig.captionValue;
				}
				const isBindToLocalizableString = bindTo && this._isExistsLocalizableString(bindTo);
				if (Ext.isEmpty(captionValue)) {
					if (Terrasoft.isEmptyObject(labelConfig) || isBindToLocalizableString) {
						delete itemConfig.labelConfig;
					}
					return;
				}
				let resourceName;
				if (isBindToLocalizableString) {
					resourceName = this.getSchemaResourceNameFromModelResourceName(bindTo);
				} else {
					resourceName = this.generateLabelCaptionResourcesName(itemConfig.name);
					const utils = Terrasoft.ViewModelSchemaDesignerUtils;
					labelConfig.caption = {
						bindTo: utils.getModelStringResourceName(resourceName)
					};
				}
				this.updateItemLabelCaptionResource(resourceName, captionValue);
			},

			/**
			 * Handler of the double click on the action element of the grid.
			 * @protected
			 * @param {String} modelItemId Unique id of grid element.
			 * @param {String} layoutName Name of grid.
			 */
			onItemDblClick: function(modelItemId, layoutName) {
				this.openModelItemSettingWindow(layoutName, modelItemId);
			},

			/**
			 * Event handler of remove item.
			 * @protected
			 * @param {Terrasoft.SchemaDesignToolItem} item Schema design tool item.
			 */
			onDraggableItemRemove: function(item) {
				const uId = item.get("UId");
				const dataModelSchema = item.parentViewModel.get("Schema");
				const column = dataModelSchema.columns.get(uId);
				let message;
				if (column.isInherited) {
					message = this.get("Resources.Strings.ColumnIsInheritedMessage");
					this.showInformationDialog(message);
					return;
				}
				const columnName = item.get("itemId");
				if (!this._checkDataModelDependencies(columnName, dataModelSchema)) {
					message = this.get("Resources.Strings.DataModelBindsToColumnMessage");
					this.showInformationDialog(message);
					return;
				}
				this._checkBusinessRuleColumnDependencies(columnName, dataModelSchema, function() {
					this._removeExistingModelDraggableItem(uId, item.parentViewModel);
					dataModelSchema.columns.remove(column);
				}, this);
			},

			/**
			 * @protected
			 */
			onAddDataModelButtonClick: function() {
				this.$EditDataModelName = null;
				this.openDataSourcePropertiesPage();
			},

			/**
			 * @protected
			 */
			onEditDataSource: function(name) {
				this.$EditDataModelName = name;
				this.openDataSourcePropertiesPage();
			},

			/**
			 * @protected
			 */
			onRemoveDataSource: function(name, next, scope) {
				const dataModel = this.$DataModels.get(name);
				this.showBodyMask();
				this._checkBusinessRuleDataSourceDependencies(dataModel, function() {
					this.$DataModels.removeByKey(name);
					this._removeDataModelFromSchema(name);
					this.updateGridLayoutEditCollection();
					this.hideBodyMask();
					Ext.callback(next, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initHasAnyDcm
			 * @override
			 */
			initHasAnyDcm: function(callback, scope) {
				Ext.callback(callback, scope);
			},

			//endregion

			//region Public

			/**
			 * Opens data source properties page.
			 */
			openDataSourcePropertiesPage: function() {
				this.showBodyMask();
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this._getAddDataSourceWindowId(),
					instanceConfig: {
						initialSize: {
							width: 356,
							height: 328
						}
					}
				});
			},

			/**
			 * Updates grid layout items. Removes removed data model columns.
			 */
			updateGridLayoutEditCollection: function() {
				const grid = this.get("GridLayouts");
				const usedColumns = this.get("UsedColumns") || {};
				Terrasoft.each(grid, function(config) {
					const collectionName = this.getGridLayoutEditCollectionName(config);
					const collection = this.get(collectionName);
					collection.each(function(item) {
						const itemConfig = item.itemConfig;
						const bindTo = itemConfig.bindTo || itemConfig.name;
						const bindToConfig = this._parseItemBindTo(bindTo);
						if (bindToConfig.schemaColumn) {
							item.onContentChange();
						} else {
							collection.removeByKey(itemConfig.name);
							delete usedColumns[bindTo];
						}
					}, this);
				}, this);
				this.set("UsedColumns", usedColumns);
			},

			/**
			 * Init WidgetDashboardManager items when WritableWidgetDashboardManagerItem is empty.
			 * Creates new items if needed.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			initWidgetDashboardManagerItems: function(callback, scope) {
				Terrasoft.WidgetDashboardManager.initialize(null, function() {
					if (this.$WritableWidgetDashboardManagerItem) {
						return Ext.callback(callback, scope);
					}
					this._initWritableWidgetDashboardManagerItem()
						.then(this._initReadableWidgetDashboardItemCollection.bind(this))
						.then(function() {
							Ext.callback(callback, scope);
						});
				}, this);
			}

			//endregion

		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "DesignContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["design-container-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DraggableItemsContainer",
				"parentName": "DesignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["draggable-items-list", "fixed"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FixedBottomItemsContainer",
				"parentName": "DesignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["fixed-bottom-items-container"]},
					"visible": {"bindTo": "SupportParametersDataModel"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DataModels",
				"parentName": "DraggableItemsContainer",
				"propertyName": "items",
				"index": 4,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DataModelItem",
				"parentName": "DataModels",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"classes": {"wrapClassName": ["data-model-item"]},
					"className": "Terrasoft.ContainerList",
					"idProperty": "Name",
					"itemPrefix": "data-model",
					"dataItemIdPrefix": "data-model",
					"collection": {"bindTo": "DataModels"},
					"defaultItemConfig": {
						"id": "data-model",
						"className": "Terrasoft.ControlGroup",
						"classes": {"wrapClassName": ["data-model-item"]},
						"caption": {"bindTo": "Caption"},
						"collapsed": {"bindTo": "Collapsed"},
						"tag": "DataModel",
						"tools": [
							{
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"imageConfig": {"bindTo": "Resources.Images.DataModelImage"}
							},
							{
								"className": "Terrasoft.Button",
								"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
								"classes": {"wrapperClass": ["data-model-menu"]},
								"imageConfig": {"bindTo": "Resources.Images.DataModelMenuImage"},
								"visible": {"bindTo": "IsDataModelMenuVisible"},
								"markerValue": "DataModelMenu",
								"menu": {
									"items": {"bindTo": "DataModelMenu"}
								}
							}
						],
						"items": [
							{
								"className": "Terrasoft.Label",
								"caption": {"bindTo": "Resources.Strings.ElementsCaption"},
								"classes": {"labelClass": ["items-label"]},
								"visible": {
									"bindTo": "NewElementDraggableItems",
									"bindConfig": {"converter": "isNotEmptyValue"}
								},
								"markerValue": "ElementsLabel"
							},
							{
								"className": "Terrasoft.ContainerList",
								"idProperty": "Name",
								"itemPrefix": "new-column",
								"dataItemIdPrefix": "new-column",
								"collection": {"bindTo": "NewElementDraggableItems"},
								"visible": {"bindTo": "IsPageElementsVisible"},
								"markerValue": "NewElementsContainer",
								"defaultItemConfig": {
									"className": "Terrasoft.Container",
									"items": [
										{
											"classes": {"wrapClassName": ["draggable-item"]},
											"className": "Terrasoft.ViewModelSchemaDesignerItem",
											"draggableGroupNames": {"bindTo": "draggableGroupNames"},
											"invalidDrop": {"bindTo": "onInvalidDrop"},
											"dragOver": {"bindTo": "onDragOver"},
											"dragDrop": {"bindTo": "onDragDrop"},
											"imageConfig": {"bindTo": "getImageConfig"},
											"content": {"bindTo": "getContent"}
										}
									]
								}
							},
							{
								"className": "Terrasoft.Label",
								"caption": {"bindTo": "Resources.Strings.WidgetsCaption"},
								"classes": {"labelClass": ["items-label"]},
								"visible": {"bindTo": "IsPageElementsVisible"},
								"markerValue": "WidgetsLabel"
							},
							{
								"className": "Terrasoft.Container",
								"visible": {"bindTo": "IsNewPageSchema"},
								"classes": {"wrapClassName": "new-column-info-button-container"},
								"markerValue": "NewWidgetInfoButtonContainer",
								"items": [
									{
										"className": "Terrasoft.Label",
										"markerValue": "NewWidgetInfoLabel",
										"labelClass": ["new-fields-info-label"],
										"caption": {"bindTo": "Resources.Strings.NewFieldsDisabledMessage"}
									},
									{
										"className": "Terrasoft.InformationButton",
										"markerValue": "NewWidgetInfoButton",
										"tips": [{"tip": {"content": {"bindTo": "Resources.Strings.WidgetInNewSectionWarning"}}}]
									}
								]
							},
							{
								"className": "Terrasoft.ContainerList",
								"idProperty": "Name",
								"itemPrefix": "new-column",
								"dataItemIdPrefix": "new-column",
								"collection": {"bindTo": "NewWidgetsModelDraggableItems"},
								"visible": {
									"bindTo": "IsNewPageSchema",
									"bindConfig": {
										"converter": function() {
											return this.get("IsPageElementsVisible") && !this.get("IsNewPageSchema");
										}
									}
								},
								"markerValue": "NewWidgetsContainer",
								"defaultItemConfig": {
									"className": "Terrasoft.Container",
									"items": [
										{
											"classes": {"wrapClassName": ["draggable-item"]},
											"className": "Terrasoft.ViewModelSchemaDesignerItem",
											"draggableGroupNames": {"bindTo": "draggableGroupNames"},
											"invalidDrop": {"bindTo": "onInvalidDrop"},
											"dragOver": {"bindTo": "onDragOver"},
											"dragDrop": {"bindTo": "onDragDrop"},
											"imageConfig": {"bindTo": "getImageConfig"},
											"content": {"bindTo": "getContent"}
										}
									]
								}
							},
							{
								"className": "Terrasoft.Label",
								"caption": {"bindTo": "Resources.Strings.NewColumnCaption"},
								"classes": {"labelClass": ["items-label"]},
								"visible": {"bindTo": "NewColumnCaptionVisible"},
								"markerValue": "NewColumnLabel"
							},
							{
								"className": "Terrasoft.Container",
								"visible": {
									"bindTo": "CanAddNewColumn",
									"bindConfig": {
										"converter": function() {
											return !this.get("CanAddNewColumn") && this.get("NewColumnCaptionVisible");
										}
									}
								},
								"classes": {"wrapClassName": "new-column-info-button-container"},
								"markerValue": "NewFieldsDisabledContainer",
								"items": [
									{
										"className": "Terrasoft.Button",
										"id": "NewColumnsInfoButton",
										"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
										"imageConfig": {"bindTo": "Resources.Images.InfoSpriteImage"},
										"classes": {
											"wrapperClass": "info-button",
											"imageClass": "info-button-image"
										},
										"showTooltip": true,
										"tooltipText": {"bindTo": "Resources.Strings.NewFieldsDisabledToolTipMessage"}
									},
									{
										"className": "Terrasoft.Label",
										"markerValue": "NewColumnsInfoLabel",
										"labelClass": ["new-fields-info-label"],
										"caption": {"bindTo": "Resources.Strings.NewFieldsDisabledMessage"}
									}
								]
							},
							{
								"className": "Terrasoft.ContainerList",
								"idProperty": "Name",
								"itemPrefix": "new-column",
								"dataItemIdPrefix": "new-column",
								"visible": {"bindTo": "CanAddNewColumn"},
								"collection": {"bindTo": "NewModelDraggableItems"},
								"markerValue": "NewColumnsContainer",
								"defaultItemConfig": {
									"className": "Terrasoft.Container",
									"items": [
										{
											"classes": {"wrapClassName": ["draggable-item"]},
											"className": "Terrasoft.ViewModelSchemaDesignerItem",
											"draggableGroupNames": {"bindTo": "draggableGroupNames"},
											"invalidDrop": {"bindTo": "onInvalidDrop"},
											"dragOver": {"bindTo": "onDragOver"},
											"dragDrop": {"bindTo": "onDragDrop"},
											"imageConfig": {"bindTo": "getImageConfig"},
											"content": {"bindTo": "getContent"}
										}
									]
								}
							},
							{
								"className": "Terrasoft.Label",
								"caption": {"bindTo": "Resources.Strings.ExistingColumnsCaption"},
								"classes": {"labelClass": ["items-label"]},
								"visible": {
									"bindTo": "ExistingModelDraggableItems",
									"bindConfig": {"converter": "isNotEmptyValue"}
								},
								"markerValue": "ExistingColumnLabel"
							},
							{
								"className": "Terrasoft.ContainerList",
								"idProperty": "Name",
								"dataItemIdPrefix": "existed-column",
								"collection": {"bindTo": "ExistingModelDraggableItems"},
								"visible": {
									"bindTo": "ExistingModelDraggableItems",
									"bindConfig": {"converter": "isNotEmptyValue"}
								},
								"markerValue": "ExistingColumnsContainer",
								"defaultItemConfig": {
									"id": "existed-column",
									"className": "Terrasoft.Container",
									"items": [
										{
											"className": "Terrasoft.ViewModelSchemaDesignerItem",
											"draggableGroupNames": {"bindTo": "draggableGroupNames"},
											"invalidDrop": {"bindTo": "onInvalidDrop"},
											"dragOver": {"bindTo": "onDragOver"},
											"dragDrop": {"bindTo": "onDragDrop"},
											"content": {"bindTo": "content"},
											"imageConfig": {"bindTo": "getImageConfig"},
											"isUsed": {"bindTo": "IsUsed"},
											"isRequired": {"bindTo": "IsRequired"},
											"menu": {"items": {"bindTo": "ToolsMenuItems"}},
											"enableRightIcon": {"bindTo": "EnableRightIcon"},
											"classes": {"wrapClassName": ["draggable-item"]}
										}
									]
								}
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AddDataModelButton",
				"parentName": "FixedBottomItemsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"caption": {"bindTo": "Resources.Strings.AddDataModelButton"},
					"imageConfig": {"bindTo": "Resources.Images.AddDataModelButtonImage"},
					"click": {"bindTo": "onAddDataModelButtonClick"},
					"classes": {
						"imageClass": ["add-data-model-btn-image"],
						"wrapperClass": ["add-data-model-btn-wrapper"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CardWidgetDesigner",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "CardWidgetWrapDesignerContainer",
					"wrapClass": ["card-widget-designer-container-wrapClass"],
					"visible": {"bindTo": "CardWidgetDesignerContainerVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CardWidgetDesignerMainContainer",
				"propertyName": "items",
				"parentName": "CardWidgetDesigner",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"id": "CardWidgetDesignerMainContainer",
					"wrapClass": ["card-widget-designer-main-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DesignedView",
				"parentName": "DesignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.DESIGN_VIEW,
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "CardContentWrapper",
				"parentName": "DesignedView",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,
		infoDiff: [
			{
				"operation": "insert",
				"name": "errorInfoContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["designer-info-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "errorInfoImage",
				"parentName": "errorInfoContainer",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.ImageEdit",
					"readonly": true,
					"classes": {"wrapClass": ["image-control"]},
					"onPhotoChange": "emptyFn",
					"getSrcMethod": "EmptyInfoImageSrc",
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
				}
			},
			{
				"operation": "insert",
				"name": "titleInfoLabel",
				"parentName": "errorInfoContainer",
				"propertyName": "items",
				"values": {
					"classes": {"labelClass": ["title"]},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.DesignerErrorInfoTitleMessage"}
				}
			},
			{
				"operation": "insert",
				"name": "descriptionInfoLabel",
				"parentName": "errorInfoContainer",
				"propertyName": "items",
				"values": {
					"classes": {"labelClass": ["description"]},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.DesignerErrorInfoDescriptionMessage"}
				}
			}
		]
	};
});
define("ViewModelSchemaDesignerSchema", ["TimelineManager"], function() {
	return {
		attributes: {},
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				var parentInitMethod = this.getParentMethod();
				this.Terrasoft.TimelineManager.initialize(function() {
					parentInitMethod.call(this, callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseModulePageV2#hasTimelineConfig
			 * @override
			 */
			hasTimelineConfig: function() {
				var designedPageSchema = this.get("Schema");
				var timelinePageConfig =
					this.Terrasoft.TimelineManager.getTimelinePageConfig(designedPageSchema.schemaName);
				return !this.isEmpty(timelinePageConfig);
			}

			// endregion

		}
	};
});


