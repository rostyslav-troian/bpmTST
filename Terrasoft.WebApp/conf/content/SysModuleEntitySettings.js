Terrasoft.configuration.Structures["SysModuleEntitySettings"] = {innerHierarchyStack: ["SysModuleEntitySettings"]};
define('SysModuleEntitySettingsStructure', ['SysModuleEntitySettingsResources'], function(resources) {return {schemaUId:'2ee9cdb3-09c7-43bd-be77-7692922b6d2b',schemaCaption: "SysModuleEntitySettings", parentSchemaName: "", schemaName:'SysModuleEntitySettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysModuleEntitySettings", ["SysModuleEntitySettingsResources", "ConfigurationGridUtilities",
	"ConfigurationGrid", "GridUtilitiesV2", "ConfigurationGridGenerator", "SysModuleEntityManager",
	"SysModuleEditManager", "LookupQuickAddMixin", "SysModuleEntitySettingsItemModel", "DesignTimeEnums",
	"ModalBoxSchemaModule", "BaseModalBoxPage", "SysModuleEntitySelectSinglePageModalBox",
	"ApplicationStructureWizardUtils", "SectionSettingsMixin", "DetailManager"
], function(resources) {
	return {
		mixins: {
			"ConfigurationGridUtilities": "Terrasoft.ConfigurationGridUtilities",
			"GridUtilities": "Terrasoft.GridUtilities",
			"SectionSettingsMixin": "Terrasoft.SectionSettingsMixin"
		},
		messages: {
			"GetModuleInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"PushModuleResponse": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ValidateMultiPageSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"PageSettingsChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"EntitySchemaDataCollectionInitialized": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"ActualizeSysModuleEntitySettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * Use multi page flag.
			 */
			"UseMultiPage": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Data collection for grid
			 */
			"GridData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Active row in grid
			 */
			"ActiveRow": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Empty page flag
			 */
			"IsGridEmpty": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Load grid flag
			 */
			"IsGridLoading": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Grid item entity schema.
			 */
			"GridEntitySchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * IsEditable flag
			 */
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * IsInitialized flag
			 */
			"IsInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Type column
			 */
			"TypeColumn": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "onTypeColumnChange",
				isRequired: true,
				value: null
			},

			/**
			 * List for type column
			 */
			"TypeColumnList": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Module entity schema UId
			 */
			"SysModuleEntityUId": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Module entity manager item
			 */
			"SysModuleEntityManagerItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Module manager item
			 */
			"SectionManagerItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Module entity schema
			 */
			"ModuleEntitySchema": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Package UId
			 */
			"PackageUId": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Entity schema UId
			 */
			"EntitySchemaUId": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Need create new lookup schema.
			 */
			"TypeListMap": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Default type column name.
			 */
			"DefaultTypeColumnName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "Type"
			}
		},
		methods: {

			/**
			 * @inheritdoc BaseSchemaViewModel#initLookupQuickAddMixin
			 * @override
			 */
			initLookupQuickAddMixin: function(next, scope) {
				Ext.callback(next, scope);
			},

			/**
			 * Handler for event TypeColumnValue change.
			 * @protected
			 * @param {Object} model Model.
			 */
			onTypeColumnValueChange: function(model) {
				var typeValue = model.get("Type");
				var managerItem = model.get("SysModuleEditManagerItem");
				if (managerItem) {
					this.changeTypeColumnValue(managerItem, typeValue);
				}
			},

			/**
			 * Change SysModuleEditManagerItem type column value.
			 * @protected
			 * @param {Terrasoft.SysModuleEditManagerItem} managerItem SysModuleEditManagerItem.
			 * @param {Object} typeValue Type.
			 */
			changeTypeColumnValue: function(managerItem, typeValue) {
				var typeId = typeValue ? typeValue.value : null;
				var caption = this.generateSysModuleEditManagerItemCaption(typeValue);
				managerItem.setTypeColumnValue(typeId);
				managerItem.setPageCaption(caption);
				managerItem.setActionKindCaption(caption);
				this.pageSettingsChanged();
			},

			/**
			 * Generate caption for SysModuleEditManagerItem.
			 * @protected
			 * @param {Object} typeValue Type.
			 * @return {String} Caption.
			 */
			generateSysModuleEditManagerItemCaption: function(typeValue) {
				var caption;
				if (typeValue && typeValue.displayValue) {
					caption = typeValue.displayValue;
				} else {
					caption = this.get("Resources.Strings.SingleSysModuleEditCaptionTemplate");
				}
				return caption;
			},

			/**
			 * Generate caption for SysModuleEditManagerItem.
			 * @protected
			 * @param {Terrasoft.BaseEntitySchema} entitySchema Model.
			 * @param {Object} [typeValue] Type.
			 * @return {String} Caption.
			 */
			generateEntitySchemaCaption: function(entitySchema, typeValue) {
				var caption;
				var template = this.get("Resources.Strings.SingleEditPageCaptionTemplate");
				var entitySchemaCaption = this.getLczValue(entitySchema.caption);
				if (typeValue && typeValue.displayValue) {
					template = this.get("Resources.Strings.MultyEditPageCaptionTemplate");
					caption = Ext.String.format(template, entitySchemaCaption, typeValue.displayValue);
				} else {
					caption = Ext.String.format(template, entitySchemaCaption);
				}
				return caption;
			},

			/**
			 * Page settings change.
			 * @protected
			 */
			pageSettingsChanged: function() {
				var validateInfo = this.validateModel();
				if (validateInfo.isValid) {
					this.actualizeSysModuleEditCaption();
					var sandbox = this.sandbox;
					sandbox.publish("PageSettingsChanged", null, [sandbox.id]);
				}
			},

			/**
			 * Method actualized caption SysModuleEdit.
			 * @protected
			 */
			actualizeSysModuleEditCaption: function() {
				var gridData = this.getGridData();
				Terrasoft.each(gridData.getItems(), function(item) {
					var id = item.get("Id");
					var typeValue = item.get("Type");
					var managerItem = Terrasoft.SysModuleEditManager.getItem(id);
					var caption = this.generateSysModuleEditManagerItemCaption(typeValue);
					managerItem.setPageCaption(caption);
					managerItem.setActionKindCaption(caption);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#requireProfile
			 * @override
			 */
			requireProfile: function(callback, scope) {
				var listedConfig = {
					"items": this.generateGridRowColumnConfig(this.entitySchema.columns)
				};
				var profileKey = "MultiPageDataGridProfileKey";
				var profile = {
					"key": profileKey,
					"DataGrid": {
						"tiledConfig": "{}",
						"listedConfig": Terrasoft.encode(listedConfig),
						"key": profileKey,
						"isTiled": false,
						"type": Terrasoft.GridType.LISTED
					}
				};
				Ext.callback(callback, scope, [profile]);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getCellControlsConfig
			 * @override
			 */
			getCellControlsConfig: function(entitySchemaColumn) {
				var config = this.mixins.ConfigurationGridUtilities.getCellControlsConfig.call(this, entitySchemaColumn);
				if (entitySchemaColumn.controlConfig) {
					config.controlConfig = Terrasoft.deepClone(entitySchemaColumn.controlConfig);
				}
				return config;
			},

			/**
			 * Generate column config for grid.
			 * @protected
			 * @param {Object} columns Columns.
			 * @return {Object} Column config.
			 */
			generateGridRowColumnConfig: function(columns) {
				var items = [];
				var columnsCount = Ext.Object.getSize(columns);
				var colSpan = Math.floor(24 / columnsCount);
				var col = 0;
				Terrasoft.each(columns, function(column) {
					var columnConfig = {
						"bindTo": column.name,
						"caption": column.caption,
						"position": {
							"column": col,
							"colSpan": colSpan,
							"row": 1
						},
						"captionConfig": {"visible": false},
						"dataValueType": column.dataValueType,
						"contentType": Terrasoft.ContentType.ENUM,
						"metaPath": column.columnPath,
						"path": column.columnPath
					};
					col += colSpan;
					items.push(columnConfig);
				}, this);
				return items;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.set("IsInitialized", false);
				this.generateGridEntitySchema();
				this.subscribeSandboxEvents();
				this.set("GridData", Ext.create("Terrasoft.BaseViewModelCollection"));
				this.set("TypeColumnList", Ext.create("Terrasoft.Collection"));
				this.on("change:UseMultiPage", this.onUseMultiPageChange, this);
				this.addEvents("ConversionToMultiPageComplete");
				this.addEvents("ConversionToSinglePageComplete");
				this.callParent([function() {
					this.mixins.SectionSettingsMixin.init.call(this);
					this.mixins.GridUtilities.init.call(this);
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Handler for UseMultiPage property change.
			 * @protected
			 */
			onUseMultiPageChange: function() {
				if (this.isSettingsChangeEventsSuspended()) {
					return;
				}
				var useMultiPage = this.get("UseMultiPage");
				if (useMultiPage) {
					this.convertPageSettingsToMultiPage();
				} else {
					this.convertPageSettingsToSinglePage();
				}
			},

			/**
			 * Convert page settings to multi page.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			convertPageSettingsToMultiPage: function(callback, scope) {
				this.getEntitySchemaLookupColumnCollection(null, function(columnCollection) {
					var chain = [];
					var hasBaseLookupColumns = columnCollection.any(function(columnItem) {
						return this.isBaseLookupSchema(columnItem.column.referenceSchemaUId);
					}, this);
					if (!hasBaseLookupColumns) {
						chain.push(this.getReferenceEntitySchemaConfigChain);
						chain.push(this.createReferenceEntitySchemaChain);
						chain.push(this.defineReferenceEntitySchemaChain);
						chain.push(this.createReferenceEntityColumnChain);
						chain.push(this.addColumnToModuleEntitySchemaChain);
					}
					chain.push(this.setTypeColumnByDefaultColumnName);
					chain.push(function() {
						this.fireEvent("ConversionToMultiPageComplete", this);
						Ext.callback(callback, scope);
					});
					chain.push(this);
					Terrasoft.chain.apply(this, chain);
				}, this);
			},

			/**
			 * Returns reference entity schema config.
			 * @protected
			 * @param {Function} next Callback function.
			 */
			getReferenceEntitySchemaConfigChain: function(next) {
				var entitySchema = this.getModuleEntitySchema();
				var entitySchemaCaption = this.getLczValue(entitySchema.caption);
				var captionMask = this.get("Resources.Strings.TypeReferenceEntitySchemaCaptionMask");
				var referenceEntitySchemaNameMask = Ext.String.format("{0}Type", entitySchema.name) + "{0}";
				var name = Terrasoft.EntitySchemaManager.getUniqueNameByTemplate(referenceEntitySchemaNameMask);
				var config = {
					"name": name,
					"caption": Ext.String.format(captionMask, entitySchemaCaption),
					"packageUId": this.get("PackageUId")
				};
				next(config);
			},

			/**
			 * Sets type column by default column name.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			setTypeColumnByDefaultColumnName: function(callback, scope) {
				this.getEntitySchemaLookupColumnCollection(null, function(columnCollection) {
					var defaultTypeColumnName = this.get("DefaultTypeColumnName");
					var prefixedColumnName = this.addPrefixIfNeed(defaultTypeColumnName);
					if (columnCollection.contains(prefixedColumnName)) {
						var prefixedDefaultColumn = columnCollection.get(prefixedColumnName);
						this.setTypeColumnValue(prefixedDefaultColumn);
					} else if (columnCollection.contains(defaultTypeColumnName)) {
						var defaultColumn = columnCollection.get(defaultTypeColumnName);
						this.setTypeColumnValue(defaultColumn);
					}
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Method create new lookup schema.
			 * @protected
			 * @param {Function} next Callback function.
			 * @param {Object} config New lookup config.
			 * @param {String} config.name New lookup name.
			 * @param {String} config.caption New lookup caption.
			 * @param {String} config.packageUId New lookup package UId.
			 */
			createReferenceEntitySchemaChain: function(next, config) {
				var name = Ext.String.format("{0}{1}",
					Terrasoft.EntitySchemaManager.getSchemaNamePrefix(), config.name);
				var caption = config.caption;
				var packageUId = config.packageUId;
				var newEntityUId = Terrasoft.generateGUID();
				var newSchema = Terrasoft.EntitySchemaManager.createSchema({
					"uId": newEntityUId,
					"name": name,
					"packageUId": packageUId,
					"caption": {}
				});
				newSchema.setLocalizableStringPropertyValue("caption", caption);
				var baseLookupUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_LOOKUP;
				newSchema.setParent(baseLookupUId, function() {
					var entitySchema = Terrasoft.EntitySchemaManager.addSchema(newSchema);
					Terrasoft.DataManager.initEntitySchemaDataCollection(name);
					this.sandbox.publish("EntitySchemaDataCollectionInitialized", name);
					Terrasoft.ApplicationStructureWizardUtils.createLookupManagerItem(entitySchema, function() {
						next(entitySchema);
					}, this);
				}, this);
			},

			/**
			 * Method define new lookup schema.
			 * @protected
			 * @param {Function} next Callback function.
			 * @param {Terrasoft.EntitySchemaManagerItem} referenceEntitySchemaManagerItem New lookup managerItem.
			 */
			defineReferenceEntitySchemaChain: function(next, referenceEntitySchemaManagerItem) {
				referenceEntitySchemaManagerItem.getInstance(function(instance) {
					var schemaName = instance.name;
					var primaryColumn = instance.primaryColumn;
					var primaryDisplayColumn = instance.primaryDisplayColumn;
					var schemaCaption = this.getLczValue(instance.caption);
					var columns = this.getReferenceEntitySchemaColumnList(instance);
					var className = Ext.String.format("Terrasoft.data.models.{0}", schemaName);
					var alternateClassName = Ext.String.format("Terrasoft.{0}", schemaName);
					Ext.define(className, {
						"extend": "Terrasoft.BaseEntitySchema",
						"alternateClassName": alternateClassName,
						"singleton": true,
						"uId": instance.uId,
						"name": schemaName,
						"caption": schemaCaption,
						"administratedByRecords": instance.administratedByRecords,
						"administratedByOperations": instance.administratedByOperations,
						"primaryColumnName": primaryColumn.name,
						"primaryDisplayColumnName": primaryDisplayColumn.name,
						"columns": columns
					});
					define(schemaName, ["terrasoft"], function(Terrasoft) {
						return Terrasoft[schemaName];
					});
					next(referenceEntitySchemaManagerItem);
				}, this);
			},

			/**
			 * Returns entitySchema column list from instance of EntitySchemaManagerItem.
			 * @protected
			 * @param {Terrasoft.EntitySchema} instance Instance of EntitySchemaManagerItem.
			 * @return {Object} Column list.
			 */
			getReferenceEntitySchemaColumnList: function(instance) {
				var response = {};
				if (instance && instance.columns) {
					instance.columns.each(function(column) {
						var name = column.name;
						var dataValueType = column.dataValueType;
						var caption = this.getLczValue(column.caption);
						var columnReferenceSchemaUId = column.referenceSchemaUId;
						var isLookup = Terrasoft.isLookupDataValueType(dataValueType);
						var entitySchemaColumn = response[name] = {
							"uId": column.uId,
							"name": name,
							"caption": caption,
							"dataValueType": dataValueType,
							"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
							"usageType": column.usageType,
							"isInherited": column.isInherited,
							"columnPath": column.name,
							"isLookup": isLookup
						};
						if (isLookup && columnReferenceSchemaUId) {
							entitySchemaColumn.referenceSchemaUId = columnReferenceSchemaUId;
							var managerItem = Terrasoft.EntitySchemaManager.getItem(columnReferenceSchemaUId);
							entitySchemaColumn.referenceSchema = {
								"name": managerItem.name
							};
						}
					}, this);
				}
				return response;
			},

			/**
			 * Method create new reference lookup column.
			 * @protected
			 * @param {Function} next Callback function.
			 * @param {Terrasoft.EntitySchemaManagerItem} referenceEntitySchemaManagerItem New lookup managerItem.
			 */
			createReferenceEntityColumnChain: function(next, referenceEntitySchemaManagerItem) {
				var newColumn = Ext.create("Terrasoft.EntitySchemaColumn");
				var newColumnCaption = newColumn.caption;
				var caption = this.get("Resources.Strings.TypeColumnCaption");
				newColumn.name = Ext.String.format("{0}{1}",
					Terrasoft.EntitySchemaManager.getSchemaNamePrefix(), this.get("DefaultTypeColumnName"));
				newColumnCaption.setValue(caption);
				newColumn.dataValueType = Terrasoft.DataValueType.LOOKUP;
				newColumn.isRequired = true;
				newColumn.isSimpleLookup = true;
				newColumn.referenceSchemaUId = referenceEntitySchemaManagerItem.uId;
				newColumn.setNew();
				next(newColumn);
			},

			/**
			 * Method add new reference lookup column to instance of EntitySchemaManagerItem.
			 * @protected
			 * @param {Function} next Callback function.
			 * @param {Object} column New lookup column.
			 */
			addColumnToModuleEntitySchemaChain: function(next, column) {
				var moduleEntitySchema = this.getModuleEntitySchema();
				moduleEntitySchema.addColumn(column);
				this.setEntitySchemaManagerItemModificateStatis();
				this.set("CreatedTypeColumn", column);
				next();
			},

			/**
			 * Method set UPDATE status to entitySchemaManagerItem.
			 * @protected
			 */
			setEntitySchemaManagerItemModificateStatis: function() {
				var moduleEntitySchema = this.getModuleEntitySchema();
				var entitySchemaManagerItem = Terrasoft.EntitySchemaManager.getItem(moduleEntitySchema.uId);
				if (!entitySchemaManagerItem.isModified()) {
					entitySchemaManagerItem.setStatus(Terrasoft.ModificationStatus.UPDATED);
				}
			},

			/**
			 * Returns is new type column reference schema flag.
			 * @protected
			 * @return {Boolean} True - is new schema, false - is not new schema.
			 */
			getIsNewTypeEntitySchema: function() {
				var typeColumn = this.get("TypeColumn");
				var isNew = false;
				if (typeColumn && typeColumn.column) {
					var referenceSchemaUId = typeColumn.column.referenceSchemaUId;
					if (Terrasoft.EntitySchemaManager.contains(referenceSchemaUId)) {
						var referenceSchema = Terrasoft.EntitySchemaManager.getItem(referenceSchemaUId);
						isNew = referenceSchema.getStatus() === Terrasoft.ModificationStatus.NEW;
					}
				}
				return isNew;
			},

			/**
			 * Add new type value record to DataManager.
			 * @protected
			 * @param {String} displayValue Display value.
			 * @return {Object} Type value.
			 */
			addTypeRecordInDataManager: function(displayValue) {
				var response = null;
				var recordData = {
					"value": Terrasoft.generateGUID(),
					"displayValue": displayValue
				};
				var rowViewModel = this.generateReferenceViewModel(recordData);
				if (rowViewModel) {
					var dataManagerItem = Ext.create("Terrasoft.DataManagerItem", {"viewModel": rowViewModel});
					Terrasoft.DataManager.addItem(dataManagerItem);
					response = recordData;
				}
				return response;
			},

			/**
			 * Returns records from DataManager by new reference schema.
			 * @protected
			 * @param {String} filterValue Filter value.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getTypeRecordsFromDataManager: function(filterValue, callback, scope) {
				var config = {entitySchemaName: this.getReferenceEntitySchemaName()};
				Terrasoft.DataManager.select(config, function(dataCollection) {
					var collection = Ext.create("Terrasoft.BaseViewModelCollection");
					dataCollection.each(function(dataItem) {
						var rowViewModel = dataItem.viewModel;
						var recordId = rowViewModel.get("Id");
						var gridDataItem = this.findGridDataItemByTypeId(recordId);
						var isActiveRow = gridDataItem && this.get("ActiveRow") === gridDataItem.get("Id");
						var itemVisibility = !gridDataItem || isActiveRow;
						var displayValue = rowViewModel.get("Name") || "";
						if (itemVisibility &&
							(!filterValue || (filterValue && displayValue.indexOf(filterValue) > -1))) {
							collection.add(recordId, rowViewModel);
						}
					}, this);
					Ext.callback(callback, scope, [collection]);
				}, this);
			},

			/**
			 * Finds element in Grid data collection by type attribute id.
			 * @protected
			 * @param {String} recordId comparison record id.
			 * @return {Object} Grid data collection item.
			 */
			findGridDataItemByTypeId: function(recordId) {
				var gridData = this.get("GridData");
				var filteredGridDataItems = gridData.filterByFn(function(item) {
					return item.get("Type") && recordId === item.get("Type").value;
				}, this);
				var gridDataItem = filteredGridDataItems.getByIndex(0);
				return gridDataItem;
			},

			/**
			 * Generate reference view model.
			 * @protected
			 * @param {Object} config Filter value.
			 * @param {String} config.value Type value.
			 * @param {String} config.displayValue Type display value.
			 * @return {Object} Reference view model.
			 */
			generateReferenceViewModel: function(config) {
				var viewModel = null;
				var referenceEntitySchema = this.get("ReferenceEntitySchema");
				if (config && referenceEntitySchema) {
					var value = config.value;
					var displayValue = config.displayValue;
					viewModel = Ext.create("Terrasoft.BaseViewModel", {
						"entitySchema": referenceEntitySchema,
						"columns": referenceEntitySchema.columns
					});
					viewModel.set("Id", value);
					viewModel.set("Name", displayValue);
					viewModel.set("value", value);
					viewModel.set("displayValue", displayValue);
				}
				return viewModel;
			},

			/**
			 * Generate reference entitySchemaManagerItem.
			 * @protected
			 * @return {Terrasoft.EntitySchemaManagerItem} Reference entitySchemaManagerItem.
			 */
			getReferenceEntitySchemaManagerItem: function() {
				var typeColumn = this.get("TypeColumn");
				var referenceSchema = null;
				if (typeColumn && typeColumn.column) {
					var column = typeColumn.column;
					var referenceSchemaUId = column.referenceSchemaUId;
					referenceSchema = Terrasoft.EntitySchemaManager.getItem(referenceSchemaUId);
				}
				return referenceSchema;
			},

			/**
			 * Generate reference entitySchema instance.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getReferenceEntitySchemaInstance: function(callback, scope) {
				var managerItem = this.getReferenceEntitySchemaManagerItem();
				if (managerItem) {
					managerItem.getInstance(function(entitySchema) {
						Ext.callback(callback, scope, [entitySchema]);
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * Returns reference entitySchema name.
			 * @protected
			 * @return {String} Schema name.
			 */
			getReferenceEntitySchemaName: function() {
				var schemaName = null;
				var referenceSchema = this.getReferenceEntitySchemaManagerItem();
				if (referenceSchema) {
					schemaName = referenceSchema.name;
				}
				return schemaName;
			},

			/**
			 * Convert page settings to single page.
			 * @protected
			 */
			convertPageSettingsToSinglePage: function() {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					this.actualizeGridDataByActivePagesChain,
					function(next, pageCollection) {
						var pageCount = pageCollection.getCount();
						if (pageCount > 1) {
							this.showSelectSinglePageModalBox(
								this.getSelectSinglePageModalBoxConfig,
								this.onSelectSinglePageModalBoxResponse
							);
						} else if (pageCount === 1) {
							var pageItems = pageCollection.getItems();
							var singlePage = pageItems[0];
							if (singlePage) {
								this.onSelectOnePage(singlePage.id);
							}
						}
					},
					this
				);
			},

			/**
			 * Method actualize grid data by active edit pages.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {Terrasoft.Collection} pageCollection Collection of active edit pages.
			 */
			actualizeGridDataByActivePagesChain: function(callback, pageCollection) {
				var gridData = this.getGridData();
				if (pageCollection.getCount() === gridData.getCount()) {
					callback(pageCollection);
				} else {
					this.loadEditPageList(function() {
						callback(pageCollection);
					}, this);
				}
			},

			/**
			 * Method showed ModalBox for select single page.
			 * @protected
			 * @param {Function} getInfoHandler Function to get modal box configuration object.
			 * @param {Function} pushResponseHandler Callback function.
			 */
			showSelectSinglePageModalBox: function(getInfoHandler, pushResponseHandler) {
				var modalBoxId = this.getSelectSinglePageModalBoxId(Terrasoft.generateGUID());
				this.sandbox.subscribe("PushModuleResponse", pushResponseHandler, this, [modalBoxId]);
				this.sandbox.subscribe("GetModuleInfo", getInfoHandler, this, [modalBoxId]);
				this.showBodyMask();
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					"id": modalBoxId
				});
			},

			/**
			 * Returns config for ModalBox for convert to single page.
			 * @protected
			 * @return {Object} ModalBox config.
			 */
			getSelectSinglePageModalBoxConfig: function() {
				var config = this.getBaseModalBoxConfig();
				Ext.apply(config, {
					"actionCode": "SelectSinglePage",
					"headerCaption": this.get("Resources.Strings.ConvertToSinglePageModalBoxHeader"),
					"warningMessage": this.get("Resources.Strings.ConvertToSinglePageModalBoxWarning"),
					"controlLabelCaption": this.get("Resources.Strings.ConvertToSinglePageModalBoxControlLabel")
				});
				return config;
			},

			/**
			 * Returns config for ModalBox for convert to single page.
			 * @protected
			 * @return {Object} ModalBox config.
			 */
			getChangeTypeColumnModalBoxConfig: function() {
				var config = this.getBaseModalBoxConfig();
				Ext.apply(config, {
					"actionCode": "ChangeTypeColumn",
					"headerCaption": this.get("Resources.Strings.ChangeTypeColumnModalBoxHeader"),
					"warningMessage": this.get("Resources.Strings.ChangeTypeColumnModalBoxWarning"),
					"controlLabelCaption": this.get("Resources.Strings.ChangeTypeColumnModalBoxControlLabel")
				});
				return config;
			},

			/**
			 * Returns base config for ModalBox for select single page.
			 * @protected
			 * @return {Object} ModalBox config.
			 */
			getBaseModalBoxConfig: function() {
				var gridData = this.getGridData();
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				collection.loadAll(gridData);
				return {
					"schemaName": "SysModuleEntitySelectSinglePageModalBox",
					"collection": collection,
					"modalBoxSize": {
						"width": "485px",
						"height": "245px"
					}
				};
			},

			/**
			 * Handler for convert to single page modal box response.
			 * @protected
			 * @param {Object} response Select single page response.
			 */
			onSelectSinglePageModalBoxResponse: function(response) {
				if (response && response.recordId) {
					this.onSelectOnePage(response.recordId);
				} else {
					this.updateUseMultiPagePropertyWithoutProcessed(true);
					this.reloadGridData();
				}
			},

			/**
			 * Handler for convert to single page modal box response.
			 * @protected
			 * @param {Object} response Select single page response.
			 */
			onChangeTypeColumnModalBoxResponse: function(response) {
				if (response && response.recordId) {
					var typeColumn = this.get("TypeColumn");
					this.afterTypeColumnChange(typeColumn, response.recordId);
				} else {
					var previousTypeColumn = this.get("PreviousTypeColumn");
					this.set("TypeColumn", previousTypeColumn);
				}
			},

			/**
			 * Method for reload data to grid.
			 * @protected
			 */
			reloadGridData: function() {
				var collection = new Terrasoft.Collection();
				var gridData = this.getGridData();
				collection.loadAll(gridData);
				gridData.clear();
				gridData.loadAll(collection);
				this.activateFirstEmptyRow();
			},

			/**
			 * Method for create single edit page.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {Object} scope Callback method context.
			 */
			createSinglePage: function(callback, scope) {
				Terrasoft.chain(
					this.createEditPageChain,
					function(next, editSchema) {
						this.onSelectOnePage(editSchema.id, callback, scope);
					},
					this);
			},

			/**
			 * Method for select single page.
			 * @protected
			 * @param {String} singlePageId Page Id.
			 * @param {Function} callback Callback method.
			 * @param {Object} scope Callback method context.
			 */
			onSelectOnePage: function(singlePageId, callback, scope) {
				Terrasoft.chain(
					function(next) {
						next(singlePageId);
					},
					this.removeUnnecessaryPagesChain,
					this.convertSysModuleEntityManagerItemToSinglePageChain,
					this.convertSysModuleEditManagerItemToSinglePageChain,
					this.afterSelectOnePageChain,
					function() {
						this.fireEvent("ConversionToSinglePageComplete", this);
						Ext.callback(callback, scope);
					},
					this);
			},

			/**
			 * Method called after select single page.
			 * @protected
			 * @param {Function} callback Page Id.
			 */
			afterSelectOnePageChain: function(callback) {
				this.setTypeColumnValue(null);
				this.pageSettingsChanged();
				Ext.callback(callback);
			},

			/**
			 * Remove excess pages.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {String} singlePageId Single page Id.
			 */
			removeUnnecessaryPagesChain: function(callback, singlePageId) {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					function(next, pageCollection) {
						var removePageList = [];
						pageCollection.each(function(item) {
							var pageId = item.getId();
							if (pageId !== singlePageId) {
								removePageList.push(pageId);
							}
						}, this);
						this.removePage(removePageList);
						Ext.callback(callback, this, [singlePageId]);
					}, this
				);
			},

			/**
			 * Convert SysModuleEntityManagerItem to single page state.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {String} singlePageId Single page Id.
			 */
			convertSysModuleEntityManagerItemToSinglePageChain: function(callback, singlePageId) {
				this.setTypeColumnToManagers(null, null);
				callback(singlePageId);
			},

			/**
			 * Convert SysModuleEditManagerItem to single page state.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {String} singlePageId Single page Id.
			 */
			convertSysModuleEditManagerItemToSinglePageChain: function(callback, singlePageId) {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					function(next, pageCollection) {
						var gridData = this.getGridData();
						pageCollection.each(function(item) {
							var pageId = item.getId();
							item.setTypeColumnValue(null);
							if (gridData.contains(pageId)) {
								var itemViewModel = gridData.get(pageId);
								itemViewModel.set("Type", null);
							}
						}, this);
						callback(singlePageId);
					}, this
				);
			},

			/**
			 * Method return id for ModalBox.
			 * @param {String} hash Hash.
			 * @protected
			 */
			getSelectSinglePageModalBoxId: function(hash) {
				return Ext.String.format("{0}_{1}_{2}", this.sandbox.id, "SelectSinglePageModalBoxId", hash);
			},

			/**
			 * Silly update multi page property.
			 * @protected
			 * @param {Boolean} value Value.
			 */
			updateUseMultiPagePropertyWithoutProcessed: function(value) {
				this.moduleSettingsChangeEventsSuspend();
				this.set("UseMultiPage", value);
				this.moduleSettingsChangeEventsResume();
			},

			/**
			 * Subscribe sandbox events.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("ValidateMultiPageSettings", this.onValidate, this, [this.sandbox.id]);
				this.sandbox.subscribe("ActualizeSysModuleEntitySettings", this.onActualizeSysModuleEntitySettings, this,
					[this.sandbox.id]);
				this.mixins.SectionSettingsMixin.subscribeSandboxEvents.call(this);
			},

			/**
			 * @inheritdoc Terrasoft.SectionSettingsMixin#getInitializedMessageName
			 * @override
			 */
			getInitializedMessageName: function() {
				return "SysModuleSettingsInitialized";
			},

			/**
			 * @inheritdoc Terrasoft.SectionSettingsMixin#initModuleSettings
			 * @override
			 */
			initModuleSettings: function(callback, scope) {
				Terrasoft.chain(
					this.createFirstPageIfNeed,
					this.initDataChain,
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Create single page if need.
			 * @protected
			 * @param {Function} callback Callback method.
			 */
			createFirstPageIfNeed: function(callback) {
				if (!this.canEdit()) {
					return callback();
				}
				Terrasoft.chain(
					function(next) {
						this.getActiveSysModuleEditManagerItemsChain(next, this);
					},
					function(next, pages) {
						if (pages.isEmpty()) {
							this.createSinglePage(function() {
								this.hideBodyMask();
								callback();
							}, this);
						} else {
							callback();
						}
					}, this
				);
			},

			/**
			 * Initialize data.
			 * @protected
			 * @param {Function} next Callback method.
			 */
			initDataChain: function(next) {
				var managerItem = this.get("SysModuleEntityManagerItem");
				if (!managerItem) {
					return Ext.callback(next);
				}
				var typeColumnUId = managerItem.getTypeColumnUId();
				var useMultiPage = !Ext.isEmpty(typeColumnUId);
				this.set("UseMultiPage", useMultiPage);
				this.setTypeColumnValue(null);
				if (useMultiPage) {
					this.setTypeColumnByUId(typeColumnUId, next);
				} else {
					Ext.callback(next);
				}
			},

			/**
			 * Method for set value in TypeColumn property.
			 * @protected
			 * @param {Object} value Value.
			 */
			setTypeColumnValue: function(value) {
				var currentValue = this.get("TypeColumn");
				if (currentValue !== value) {
					this.set("TypeColumn", value);
				}
			},

			/**
			 * @inheritdoc Terrasoft.configuration.mixins.SectionSettingsMixin#clearModel
			 * @override
			 */
			clearModel: function() {
				this.mixins.SectionSettingsMixin.clearModel.call(this);
				this.set("UseMultiPage", false);
				this.setTypeColumnValue(null);
				var gridData = this.getGridData();
				gridData.clear();
			},

			/**
			 * Set type column.
			 * @protected
			 * @param {String} typeColumnUId Type column UId.
			 * @param {Function} callback Callback method.
			 */
			setTypeColumnByUId: function(typeColumnUId, callback) {
				var moduleEntitySchema = this.getModuleEntitySchema();
				if (moduleEntitySchema) {
					var column = moduleEntitySchema.columns.get(typeColumnUId);
					if (column) {
						var columnItem = this.getColumnItemByColumn(column);
						this.setTypeColumnValue(columnItem);
					}
				}
				Ext.callback(callback);
			},

			/**
			 * Load active edit page to grid.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {Object} scope Callback method context.
			 */
			loadEditPageList: function(callback, scope) {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					function(next, pageCollection) {
						this.getTypeList(pageCollection, function(typeCollection) {
							next(pageCollection, typeCollection);
						}, this);
					},
					function(next, pageCollection, typeCollection) {
						var collection = this.generatePageViewModelCollection(pageCollection, typeCollection);
						var gridData = this.getGridData();
						gridData.clear();
						gridData.loadAll(collection);
						this.activateFirstEmptyRow();
						next();
					},
					function() {
						Ext.callback(callback, scope || this);
					}, this
				);
			},

			/**
			 * Activate first empty row.
			 * @protected
			 */
			activateFirstEmptyRow: function() {
				var gridData = this.getGridData();
				var activatedPageId = null;
				gridData.each(function(viewModel) {
					if (!activatedPageId && !viewModel.get("Type")) {
						activatedPageId = viewModel.get("Id");
					}
				}, this);
				if (activatedPageId) {
					this.set("ActiveRow", activatedPageId);
				}
			},

			/**
			 * Generate collection of edit page view model.
			 * @protected
			 * @param {Terrasoft.Collection} pageCollection Collection of edit page manager items.
			 * @param {Terrasoft.Collection} typeCollection Collection of type values.
			 * @return {Terrasoft.BaseViewModelCollection} Collection of edit page view model.
			 */
			generatePageViewModelCollection: function(pageCollection, typeCollection) {
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				var typeMap = {};
				Terrasoft.each(typeCollection.getItems(), function(item) {
					typeMap[item.get("value")] = item.get("displayValue");
				}, this);
				this.set("TypeListMap", typeMap);
				Terrasoft.each(pageCollection.getItems(), function(sysModuleEditManagerItem) {
					var itemViewModel = this.generatePageItemViewModel(sysModuleEditManagerItem);
					collection.add(itemViewModel.get("Id"), itemViewModel);
				}, this);
				return collection;
			},

			/**
			 * Generate page item view model.
			 * @protected
			 * @param {Terrasoft.SysModuleEditManagerItem} sysModuleEditManagerItem Manager item.
			 * @return {Terrasoft.BaseViewModel} Collection of edit page view model.
			 */
			generatePageItemViewModel: function(sysModuleEditManagerItem) {
				var id = sysModuleEditManagerItem.id;
				var typeColumnValue = sysModuleEditManagerItem.typeColumnValue;
				var typeMap = this.get("TypeListMap") || {};
				var displayValue = typeMap[typeColumnValue];
				var type = null;
				var previousTypeLinkCaption = this.getPreviousTypeValue(sysModuleEditManagerItem, displayValue);
				if (displayValue) {
					type = {
						"value": typeColumnValue,
						"displayValue": displayValue
					};
				}
				var viewModelConfig = {
					rawData: {
						"Id": id,
						"PreviousTypeLink": previousTypeLinkCaption,
						"SysModuleEditManagerItem": sysModuleEditManagerItem,
						"SettingsModel": this,
						"EmptyAcceptedType": Ext.isEmpty(type)
					},
					"rowConfig": this.entitySchema.columns,
					"viewModel": null
				};
				this.mixins.GridUtilities.createViewModel.call(this, viewModelConfig);
				var itemViewModel = viewModelConfig.viewModel;
				itemViewModel.set("Type", type);
				itemViewModel.isNew = sysModuleEditManagerItem.getIsNew();
				this.subscribePageItemViewModel(itemViewModel);
				return itemViewModel;
			},

			/**
			 * Subscribe events of page view model.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} viewModel Page view model.
			 */
			subscribePageItemViewModel: function(viewModel) {
				viewModel.on("change:Type", this.onTypeColumnValueChange, this);
			},

			/**
			 * Generate prevent value.
			 * @protected
			 * @param {Terrasoft.SysModuleEditManagerItem} sysModuleEditManagerItem Manager item.
			 * @param {String} displayValue Display value.
			 * @return {Terrasoft.BaseViewModel} Collection of edit page view model.
			 */
			getPreviousTypeValue: function(sysModuleEditManagerItem, displayValue) {
				var pageId = sysModuleEditManagerItem.id;
				var typeColumnValue = sysModuleEditManagerItem.typeColumnValue;
				var backupPageTypeValue = this.backupPageTypeValue = (this.backupPageTypeValue || {});
				var typeColumn = this.get("TypeColumn");
				var previousTypeLinkCaption = "";
				if (!typeColumn && typeColumnValue) {
					return previousTypeLinkCaption;
				}
				if (backupPageTypeValue[pageId]) {
					previousTypeLinkCaption = backupPageTypeValue[pageId].previousTypeLinkCaption;
				} else {
					var isNew = sysModuleEditManagerItem.getIsNew();
					previousTypeLinkCaption = this.getPrevTypeValueCaption(typeColumn, displayValue, isNew);
					backupPageTypeValue[pageId] = {
						"value": typeColumnValue,
						"previousTypeLinkCaption": previousTypeLinkCaption,
						"displayValue": displayValue || ""
					};
				}
				return previousTypeLinkCaption;
			},

			/**
			 * Generate prevent value caption.
			 * @protected
			 * @param {Object} typeColumn Type column.
			 * @param {String} typeDisplayValue Type display value.
			 * @param {Boolean} isNewPage True - if new page, false - if not new page.
			 * @return {Terrasoft.BaseViewModel} Collection of edit page view model.
			 */
			getPrevTypeValueCaption: function(typeColumn, typeDisplayValue, isNewPage) {
				var newPageCaption = this.get("Resources.Strings.NewPageTypeCaption");
				var withoutTypeCaption = this.get("Resources.Strings.WithoutTypeCaption");
				var singlePageCaption = this.get("Resources.Strings.SinglePageTypeCaption");
				var tag;
				if (typeColumn && typeColumn.column) {
					tag = this.getLczValue(typeColumn.column.caption);
				} else {
					tag = withoutTypeCaption;
					if (!isNewPage) {
						typeDisplayValue = singlePageCaption;
					}
				}
				return Ext.String.format("{0}: {1}", tag, typeDisplayValue || newPageCaption);
			},

			/**
			 * Get list of type.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} pageCollection pageCollection parameter.
			 * @param {Function} callback Callback method.
			 * @param {Object} scope Callback method context.
			 */
			getTypeList: function(pageCollection, callback, scope) {
				var typeColumn = this.get("TypeColumn");
				if (typeColumn && typeColumn.column) {
					if (this.getIsNewTypeEntitySchema()) {
						this.getTypeRecordsFromDataManager(null, callback, scope);
					} else {
						var esq = this.getLookupQuery(null, "Type");
						if (pageCollection) {
							var items = pageCollection.select(function(x) {
								return x.typeColumnValue;
							});
							if (!items.isEmpty()) {
								var itemIds = items.getItems();
								var filterById = Terrasoft.createColumnInFilterWithParameters("Id", itemIds);
								esq.filters.addItem(filterById);
								esq.rowCount = itemIds.length;
							}
						}
						esq.getEntityCollection(function(response) {
							var collection = (response && response.success) ? response.collection : null;
							callback.call(scope, collection);
						}, this);
					}
				} else {
					var emptyCollection = Ext.create("Terrasoft.BaseViewModelCollection");
					callback.call(scope, emptyCollection);
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getGridRowViewModelClassName
			 * @override
			 * @protected
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.configuration.SysModuleEntitySettingsItemModel";
			},

			/**
			 * Generate entity schema for grid.
			 * @protected
			 */
			generateGridEntitySchema: function() {
				var typeColumn = this.getGridEntitySchemaTypeColumn();
				this.set("Type", typeColumn);
				var columns = {
					"Type": typeColumn
				};
				this.entitySchema = Ext.create("Terrasoft.BaseEntitySchema", {
					"columns": columns
				});
				Ext.apply(this.columns, columns);
			},

			/**
			 * Generate type column for entity schema for grid.
			 * @protected
			 */
			getGridEntitySchemaTypeColumn: function() {
				var caption = this.get("Resources.Strings.GridTypeColumnCaption");
				return {
					"name": "Type",
					"columnPath": "Type",
					"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"caption": caption,
					"uId": "7f3b869f-34f3-4f20-ab4d-7480a5fdf647",
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"isSimpleLookup": true,
					"isRequired": true,
					"defaultValue": {},
					"controlConfig": {
						"enableLocalFilter": false,
						"tag": "Type",
						"change": {"bindTo": "onLookupChange"},
						"enabled": {"bindTo": "EmptyAcceptedType"}
					}
				};
			},

			/**
			 * Generate prevent type column for entity schema for grid.
			 * @protected
			 */
			getGridEntitySchemaPreviousTypeLinkColumn: function() {
				var caption = this.get("Resources.Strings.GridDescriptionColumnCaption");
				return {
					"name": "PreviousTypeLink",
					"type": Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"caption": caption,
					"uId": Terrasoft.generateGUID(),
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"controlConfig": {
						"enabled": false
					}
				};
			},

			/**
			 * Update type column.
			 * @protected
			 * @param {Object} sourceColumn Column.
			 */
			updateGridEntitySchemaTypeColumn: function(sourceColumn) {
				var typeColumn = this.get("Type");
				var referenceItem = sourceColumn.referenceItem;
				if (referenceItem) {
					typeColumn.referenceSchemaUId = sourceColumn.referenceSchemaUId;
					typeColumn.referenceSchemaName = referenceItem.getName();
					typeColumn.uId = sourceColumn.uId;
					typeColumn.caption = this.getLczValue(sourceColumn.caption);
				}
			},

			/**
			 * Handler for message ValidateMultiPageSettings.
			 * @protected
			 * @return {Boolean} True - if valid, False - if not valid.
			 */
			onValidate: function() {
				var validateInfo = this.validateModel();
				var isValid = validateInfo.isValid;
				if (!isValid) {
					this.showInformationDialog(validateInfo.message);
				}
				return isValid;
			},

			/**
			 * Method for validate module.
			 * @protected
			 * @return {Object} Validate info.
			 */
			validateModel: function() {
				var isValid = true;
				var message = "";
				var validateList = this.getValidators();
				Terrasoft.each(validateList, function(validateFn) {
					if (isValid && Ext.isFunction(validateFn)) {
						var validInfo = validateFn.call(this);
						if (validInfo && !validInfo.isValid) {
							isValid = false;
							message = validInfo.message;
						}
					}
				}, this);
				return {
					"isValid": isValid,
					"message": message
				};
			},

			/**
			 * Returns module validators.
			 * @protected
			 * @return {Array} Validators.
			 */
			getValidators: function() {
				return [
					this.validateMultiPageProperty,
					this.validateMultiTypePages
				];
			},

			/**
			 * Method for validate TypeColumn property.
			 * @protected
			 * @return {Object} Validate info.
			 */
			validateMultiPageProperty: function() {
				var isValid = true;
				var useMultiPage = this.get("UseMultiPage");
				var typeColumn = this.get("TypeColumn");
				if (useMultiPage && !typeColumn) {
					isValid = false;
				}
				return {
					"isValid": isValid,
					"message": ""
				};
			},

			/**
			 * Method for validate edit pages.
			 * @protected
			 * @param {Boolean} currentMultiPage currentMultiPage parameter.
			 * @return {Object} Validate info.
			 */
			validateMultiTypePages: function(currentMultiPage) {
				var isValid = true;
				var message = "";
				var useMultiPage = currentMultiPage || this.get("UseMultiPage");
				if (useMultiPage) {
					this.getActiveSysModuleEditManagerItemsChain(function(collection) {
						collection.each(function(item) {
							var typeColumnValue = item.getTypeColumnValue();
							if (isValid && Ext.isEmpty(typeColumnValue)) {
								isValid = false;
							}
						}, this);
					}, this);
					if (!isValid) {
						var typeColumn = this.get("TypeColumn") || {};
						var mask = this.get("Resources.Strings.AllTypedPageValidateMessageMask");
						message = Ext.String.format(mask, typeColumn.displayValue);
					}
				}
				return {
					"isValid": isValid,
					"message": message
				};
			},

			/**
			 * Removes created type column if it needed.
			 * @protected
			 */
			onActualizeSysModuleEntitySettings: function(callback) {
				var typeColumn = this._getTypeColumnToRemove();
				if (!typeColumn) {
					return Ext.callback(callback);
				}
				var referenceSchemaUId = typeColumn.referenceSchemaUId;
				var managerItem = Terrasoft.EntitySchemaManager.getItem(referenceSchemaUId);
				Terrasoft.LookupManager.initialize(null, function() {
					this._removeLookupManagerItem(managerItem);
					this._removeEntitySchemaDataCollection(managerItem);
					managerItem.remove();
					this._removeCreatedTypeColumn(typeColumn);
					Ext.callback(callback);
				}, this);
			},

			/**
			 * Returns type column to remove from section entity schema. If column was created, but section
			 * converted to single page mode or user select other column for edit pages,
			 * returns created type column.
			 * @private
			 * @return {Terrasoft.manager.EntitySchemaColumn}
			 */
			_getTypeColumnToRemove: function() {
				var createdTypeColumn = this.get("CreatedTypeColumn");
				var useMultiPage = this.get("UseMultiPage");
				if (!useMultiPage && createdTypeColumn) {
					return createdTypeColumn;
				}
				var typeColumn = this.get("TypeColumn");
				var typeEntitySchemaColumn = typeColumn && typeColumn.column;
				if (createdTypeColumn && createdTypeColumn.uId !== typeEntitySchemaColumn.uId) {
					return createdTypeColumn;
				}
				return null;
			},

			/**
			 * Removes all data from DataManager stored for entity schema.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaManagerItem} managerItem EntitySchema manager item.
			 */
			_removeEntitySchemaDataCollection: function(managerItem) {
				var entitySchemaDataCollection = Terrasoft.DataManager.getEntitySchemaData(managerItem.name);
				entitySchemaDataCollection.each(function(item) {
					item.destroy();
				}, this);
				entitySchemaDataCollection.clear();
			},

			/**
			 * Removes data from LookupManager for entity schema.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaManagerItem} managerItem EntitySchema manager item.
			 */
			_removeLookupManagerItem: function(managerItem) {
				var lookupManagerItem = Terrasoft.LookupManager.findItemBySysEntitySchemaUId(managerItem.uId);
				lookupManagerItem.remove();
			},

			/**
			 * Removes column from section entity schema.
			 * @private
			 * @param {Terrasoft.manager.EntitySchemaColumn} column EntitySchemaColumn to remove.
			 */
			_removeCreatedTypeColumn: function(column) {
				var moduleEntitySchema = this.getModuleEntitySchema();
				var columnUId = column.getPropertyValue("uId");
				moduleEntitySchema.removeColumnByUId(columnUId);
				this.set("CreatedTypeColumn", null);
			},

			/**
			 * Returns grid data.
			 * @protected
			 * @return {Object} Grid data.
			 */
			getGridData: function() {
				return this.get("GridData");
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onRender
			 * @override
			 */
			onRender: function() {
				this.callParent(arguments);
				this.reloadGridColumnsConfig(true);
			},

			/**
			 * Returns active row.
			 * @protected
			 * @return {Object}
			 */
			getActiveRow: function() {
				var activeRow = null;
				var primaryColumnValue = this.get("ActiveRow");
				if (primaryColumnValue) {
					activeRow = this.getGridDataRow(primaryColumnValue);
				}
				return activeRow;
			},

			/**
			 * Returns grid data row.
			 * @protected
			 * @param {String} primaryColumnValue Primary column value.
			 * @return {Object} Grid data row.
			 */
			getGridDataRow: function(primaryColumnValue) {
				var gridData = this.getGridData();
				return gridData.find(primaryColumnValue);
			},

			/**
			 * Returns has type column flag.
			 * @protected
			 * @return {Boolean} True - if exist, False - if not exist.
			 */
			hasTypeColumn: function() {
				return !Ext.isEmpty(this.get("TypeColumn"));
			},

			/**
			 * Method fill TypeColumnList property.
			 * @protected
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.core.collections.Collection} list Lookup list.
			 */
			prepareTypeColumnList: function(filter, list) {
				this.getEntitySchemaLookupColumnCollection(filter, function(columnList) {
					list.clear();
					list.loadAll(columnList);
				}, this);
			},

			/**
			 * Method prepared entitySchema column list.
			 * @protected
			 * @param {String} filter Filter value.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getEntitySchemaLookupColumnCollection: function(filter, callback, scope) {
				var moduleEntitySchema = this.getModuleEntitySchema();
				var columns = moduleEntitySchema.columns.getItems();
				var collection = new Terrasoft.Collection();
				var generalUsageType = Terrasoft.EntitySchemaColumnUsageType.General;
				Terrasoft.eachAsync(columns, function(column, next) {
					if (Terrasoft.isLookupDataValueType(column.dataValueType) &&
						column.usageType === generalUsageType &&
						column.getStatus() !== Terrasoft.ModificationStatus.REMOVED) {
						this.isLookupSchema(column.referenceSchemaUId, function(isLookupSchema) {
							if (!isLookupSchema) {
								next();
							}
							var columnItem = this.getColumnItemByColumn(column);
							var displayValueLowerCase = columnItem.displayValue.toLowerCase();
							if (Ext.isEmpty(filter) || displayValueLowerCase.indexOf(filter.toLowerCase()) >= 0) {
								collection.add(columnItem.key, columnItem);
							}
							next();
						}, this);
					} else {
						next();
					}
				}, function() {
					callback.call(scope, collection);
				}, this);
			},

			/**
			 * Method check base lookup schema in entity schema hierarchy.
			 * @protected
			 * @param {String} referenceSchemaUId Schema UId.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			isLookupSchema: function(referenceSchemaUId, callback, scope) {
				var item = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
				item.getInstance(function(referenceSchema) {
					callback.call(scope, referenceSchema.primaryDisplayColumn != null);
				}, this);
			},

			/**
			 * Method check base lookup schema in entity schema hierarchy.
			 * @protected
			 * @param {String} referenceSchemaUId Schema UId.
			 * @return {Boolean} True - if is lookup schema, False - if is not lookup schema.
			 */
			isBaseLookupSchema: function(referenceSchemaUId) {
				var managerItem = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
				var response = false;
				if (managerItem) {
					var hierarchyInfo = managerItem.getHierarchyInfo() || [];
					Terrasoft.each(hierarchyInfo, function(item) {
						if (item && item.uId === Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_LOOKUP) {
							response = true;
							return false;
						}
					}, this);
				}
				return response;
			},

			/**
			 * Method return localizable value.
			 * @protected
			 * @param {Object} caption Caption.
			 * @return {String}
			 */
			getLczValue: function(caption) {
				return (caption || "").toString();
			},

			/**
			 * Method generate column item by column.
			 * @protected
			 * @param {Object} column Column.
			 * @return {Object}
			 */
			getColumnItemByColumn: function(column) {
				var caption = this.getLczValue(column.caption);
				return {
					"value": column.uId,
					"displayValue": caption,
					"dataValueType": column.dataValueType,
					"column": column,
					"key": column.name
				};
			},

			/**
			 * Handler for TypeColumn property change event.
			 * @protected
			 */
			onTypeColumnChange: function() {
				var typeColumn = this.get("TypeColumn");
				var previousTypeColumn = this.get("PreviousTypeColumn");
				var isInitialized = this.get("IsInitialized");
				if (typeColumn !== previousTypeColumn) {
					if (typeColumn && (previousTypeColumn || isInitialized)) {
						this.onResetTypeColumn();
					} else {
						this.afterTypeColumnChange(typeColumn);
					}
				}
			},

			/**
			 * Method processed pages by type column reset event.
			 * @protected
			 */
			onResetTypeColumn: function() {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					this.onAfterResetTypeColumnCheckPages,
					this
				);
			},

			/**
			 * Method processed active pages by type column reset event.
			 * @protected
			 * @param {Function} next Callback method.
			 * @param {Object} pageCollection Collection of pages.
			 */
			onAfterResetTypeColumnCheckPages: function(next, pageCollection) {
				if (pageCollection.getCount() === 1) {
					var item = pageCollection.getByIndex(0);
					var typeColumn = this.get("TypeColumn");
					this.afterTypeColumnChange(typeColumn, item.getId());
				} else {
					this.showSelectSinglePageModalBox(
						this.getChangeTypeColumnModalBoxConfig,
						this.onChangeTypeColumnModalBoxResponse
					);
				}
			},

			/**
			 * Method processed change column events.
			 * @protected
			 * @param {Object} typeColumn Type column.
			 * @param {String} [singlePageId] Page identifier.
			 */
			afterTypeColumnChange: function(typeColumn, singlePageId) {
				if (typeColumn && typeColumn.column) {
					this.set("PreviousTypeColumn", typeColumn);
					var chain = [];
					var gridData = this.getGridData();
					var column = typeColumn.column;
					var referenceSchemaUId = column.referenceSchemaUId;
					gridData.clear();
					column.referenceItem = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
					this.updateGridEntitySchemaTypeColumn(column);
					this.updateSysModuleEntityTypeColumnUId(column);
					chain.push(this.requireReferenceEntitySchema);
					if (singlePageId) {
						chain.push(
							function(next) {
								this.showBodyMask();
								next(singlePageId);
							},
							this.removeUnnecessaryPagesChain,
							this.convertSysModuleEditManagerItemToSinglePageChain
						);
					}
					chain.push(
						this.loadEditPageList,
						function() {
							this.hideBodyMask();
						},
						this
					);
					Terrasoft.chain.apply(this, chain);
				}
			},

			/**
			 * Method require reference entity schema.
			 * @protected
			 * @param {Function} callback Callback method.
			 * @param {Object} scope Callback method context.
			 */
			requireReferenceEntitySchema: function(callback, scope) {
				let entitySchemaName;
				Terrasoft.chain(
					function(next) {
						this.set("ReferenceEntitySchema", null);
						var referenceEntitySchemaManagerItem = this.getReferenceEntitySchemaManagerItem();
						if (referenceEntitySchemaManagerItem) {
							next(referenceEntitySchemaManagerItem.name);
						} else {
							Ext.callback(callback, scope);
						}
					},
					function(next, referenceEntitySchemaName) {
						entitySchemaName = referenceEntitySchemaName;
						if (this.getIsNewTypeEntitySchema()) {
							next();
						} else {
							this.sandbox.requireModuleDescriptors(["force!" + entitySchemaName], next);
						}
					},
					function(next) {
						Terrasoft.require([entitySchemaName], next);
					},
					function(next, referenceEntitySchema) {
						this.set("ReferenceEntitySchema", referenceEntitySchema);
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Method updated SysModuleEntityManagerItem typeColumnUId property.
			 * @protected
			 * @param {Terrasoft.EntitySchemaColumn} column Column.
			 */
			updateSysModuleEntityTypeColumnUId: function(column) {
				var columnUId = column.uId;
				var sysModuleEntityManagerItem = this.get("SysModuleEntityManagerItem");
				if (sysModuleEntityManagerItem) {
					var oldColumnUId = sysModuleEntityManagerItem.getTypeColumnUId();
					this.setTypeColumnToManagers(columnUId, column.name);
					if (oldColumnUId && oldColumnUId !== columnUId) {
						this.clearTypeColumnValueInEditPages();
					}
				}
			},

			/**
			 * @private
			 */
			setTypeColumnToManagers: function(uId, name) {
				var sysModuleEntityManagerItem = this.get("SysModuleEntityManagerItem");
				if (sysModuleEntityManagerItem) {
					sysModuleEntityManagerItem.setTypeColumnUId(uId);
				}
				var sectionManagerItem = this.get("SectionManagerItem");
				if (sectionManagerItem && sectionManagerItem.setAttribute) {
					sectionManagerItem.setAttribute(name);
				}
			},

			/**
			 * Clear typeColumnValue property in SysModuleEditManagerItems.
			 * @protected
			 */
			clearTypeColumnValueInEditPages: function() {
				Terrasoft.chain(
					this.getActiveSysModuleEditManagerItemsChain,
					function(next, collection) {
						collection.each(function(item) {
							item.setTypeColumnValue(null);
						}, this);
					},
					this);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#deleteRecords
			 * @override
			 */
			deleteRecords: function() {
				var gridData = this.getGridData();
				if (gridData.getCount() > 1) {
					this.checkCanDeleteCallback(false);
				} else {
					this.showInformationDialog(this.get("Resources.Strings.OnDeleteLastPageMessage"));
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onDeleteAccept
			 * @override
			 */
			onDeleteAccept: function() {
				var activeRowId = this.get("ActiveRow");
				if (activeRowId) {
					this.removePage([activeRowId]);
				}
			},

			/**
			 * Method remove page from grid and SysModuleEditManager.
			 * @protected
			 * @param {Terrasoft.Collection} removePageList Collection of removed pages.
			 */
			removePage: function(removePageList) {
				Terrasoft.each(removePageList, function(pageId) {
					if (Terrasoft.SysModuleEditManager.contains(pageId)) {
						var managerItem = Terrasoft.SysModuleEditManager.getItem(pageId);
						managerItem.remove();
					}
				}, this);
				if (removePageList.length) {
					this.removeGridRecords(removePageList);
					this.set("IsGridEmpty", false);
				}
				this.pageSettingsChanged();
			},

			/**
			 * Method added new page.
			 * @protected
			 */
			addNewRow: function() {
				var validateInfo = this.validateModel();
				if (validateInfo && validateInfo.isValid) {
					this.showBodyMask();
					this.set("ActiveRow", null);
					Terrasoft.chain(
						this.createEditPageChain,
						function(next, editSchema) {
							var gridData = this.getGridData();
							this.hideBodyMask();
							var itemViewModel = this.generatePageItemViewModel(editSchema);
							var recordId = itemViewModel.get("Id");
							gridData.add(recordId, itemViewModel);
							this.set("ActiveRow", recordId);
							this.pageSettingsChanged();
						},
						this
					);
				}
			},

			/**
			 * Method added new page.
			 * @protected
			 * @param {Function} callback Callback function.
			 */
			createEditPageChain: function(callback) {
				this.showBodyMask();
				Terrasoft.chain(
					function(next) {
						var moduleEntitySchema = this.getModuleEntitySchema();
						this.createPageSchema({entitySchema: moduleEntitySchema}, next, this);
					},
					function(next, pageSchema) {
						var sysModuleEntityUId = this.get("SysModuleEntityUId");
						Terrasoft.SysModuleEditManager.createItem(null, function(item) {
							this.initSysModuleEditManagerItem(item, sysModuleEntityUId, pageSchema);
							next(item);
						}, this);
					},
					function(next, item) {
						Ext.callback(callback, this, [item]);
					}, this
				);
			},

			/**
			 * Initializes sysModuleEditManageItem.
			 * @protected
			 * @param {Object} item SysModuleEditManagerItem.
			 * @param {String} sysModuleEntityId sysModuleEntity identifier.
			 * @param {Object} pageSchema Page schema.
			 */
			initSysModuleEditManagerItem: function(item, sysModuleEntityId, pageSchema) {
				if (Ext.isEmpty(item)) {
					return;
				}
				var caption = this.getLczValue(pageSchema.caption);
				var actionKindCaption = this.generateSysModuleEditManagerItemCaption();
				item.setSysModuleEntityId(sysModuleEntityId);
				item.setCardSchemaUId(pageSchema.getPropertyValue("uId"));
				item.setPageCaption(caption);
				item.setActionKindCaption(actionKindCaption);
				item.setActionKindName(pageSchema.name);
				Terrasoft.SysModuleEditManager.addItem(item);
			},

			/**
			 * @private
			 */
			_getFileDetailDefine: function(fileSchemaName, entitySchemaName) {
				return {
					"schemaName": "FileDetailV2",
					"entitySchemaName": fileSchemaName,
					"filter": {
						"masterColumn": "Id",
						"detailColumn": entitySchemaName
					}
				};
			},

			/**
			 * @private
			 */
			_getNotesAndFilesDiff: function() {
				const notesFieldName = this.addPrefixIfNeed("Notes");
				return [
					{
						"operation": "insert",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0,
						"name": "NotesAndFilesTab",
						"values": {
							"caption": {"bindTo": "Resources.Strings.NotesAndFilesTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"name": "Files",
						"values": {
							"itemType": "#Terrasoft.ViewItemType.DETAIL#"
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"name": "NotesControlGroup",
						"values": {
							"itemType": "#Terrasoft.ViewItemType.CONTROL_GROUP#",
							"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesControlGroup",
						"propertyName": "items",
						"name": "Notes",
						"values": {
							"bindTo": notesFieldName,
							"dataValueType": "#Terrasoft.DataValueType.TEXT#",
							"contentType": "#Terrasoft.ContentType.RICH_TEXT#",
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {"visible": false},
							"controlConfig": {
								"imageLoaded": {"bindTo": "insertImagesToNotes"},
								"images": {"bindTo": "NotesImagesCollection"}
							}
						}
					}
				];
			},

			/**
			 * @private
			 */
			_registerFileDetail: function(fileSchemaName, callback, scope) {
				const detailSchemaUId = Terrasoft.DesignTimeEnums.BaseSchemaUId.FILE_DETAIL;
				const detailSchema = Terrasoft.ClientUnitSchemaManager.findItem(detailSchemaUId);
				const entitySchemaItems = Terrasoft.EntitySchemaManager.getItems();
				const fileSchema = entitySchemaItems.findByPath("name", fileSchemaName);
				const fileSchemaUId = fileSchema.getUId();
				const fileSchemaCaption = fileSchema.getCaption();
				const detailSchemaName = detailSchema.getName();
				const detailConfig = {
					propertyValues: {
						detailSchemaUId: detailSchemaUId,
						entitySchemaUId: fileSchemaUId,
						caption: fileSchemaCaption,
						detailSchemaName: detailSchemaName,
						entitySchemaName: fileSchemaName
					}
				};
				var detail = Terrasoft.DetailManager.getItems().findByPath("entitySchemaUId", fileSchemaUId);
				if (detail) {
					callback.call(scope);
				} else {
					Terrasoft.DetailManager.createItem(detailConfig, function(item) {
						Terrasoft.DetailManager.addItem(item);
						callback.call(scope);
					}, this);
				}
			},

			/**
			 * @private
			 */
			_addPageFileDetail: function(page, fileSchemaName, entitySchemaName) {
				var detailsStr = page.getSchemaDetails();
				var details = JSON.parse(detailsStr);
				details.Files = this._getFileDetailDefine(fileSchemaName, entitySchemaName);
				page.setSchemaDetails(details);
				var diffStr = page.getSchemaDiff();
				var diff = JSON.parse(diffStr);
				var notesAndFilesDiff = this._getNotesAndFilesDiff();
				diff = diff.concat(notesAndFilesDiff);
				page.setSchemaDiff(diff);
			},

			/**
			 * @private
			 */
			_createFilesDetail: function(page, config, callback, scope) {
				var entitySchemaName = config.entitySchemaName;
				var fileSchemaName = entitySchemaName + "File";
				var entitySchemaItems = Terrasoft.EntitySchemaManager.getItems();
				if (!entitySchemaItems.findByPath("name", fileSchemaName)) {
					fileSchemaName = "File" + entitySchemaName;
					if (!entitySchemaItems.findByPath("name", fileSchemaName)) {
						return Ext.callback(callback, scope);
					}
				}
				this._addPageFileDetail(page, fileSchemaName, entitySchemaName);
				this._registerFileDetail(fileSchemaName, callback, scope);
			},

			/**
			 * Creates client unit edit page schema.
			 * @protected
			 * @param {Object} schemaConfig Schema configuration.
			 * @param {Function} callback Callback.
			 * @param {Scope} scope Context.
			 */
			createPageSchema: function(schemaConfig, callback, scope) {
				let editPageSchema;
				Terrasoft.chain(
					function(next) {
						const config = this.getClientUnitSchemaBaseConfig(schemaConfig);
						const entitySchemaName = this.addPrefixIfNeed(config.entitySchemaName);
						const pageSchemaNameTemplate = entitySchemaName + "{0}Page";
						config.schemaName = Terrasoft.ClientUnitSchemaManager
							.getUniqueNameByTemplate(pageSchemaNameTemplate);
						config.schemaCaption = this.generateEntitySchemaCaption(config.entitySchema);
						editPageSchema = this.createClientUnitSchema(config, true);
						this._createFilesDetail(editPageSchema, config, next, this);
					},
					function(next) {
						Terrasoft.ClientUnitSchemaManager.addSchema(editPageSchema);
						editPageSchema.define(next, this);
					},
					function() {
						callback.call(scope, editPageSchema);
					}, this
				);
			},

			/**
			 * Add prefix in begin of a string if need.
			 * @protected
			 * @param {String} schemaName Name of schema.
			 * @return {String} Fixed name of schema.
			 */
			addPrefixIfNeed: function(schemaName) {
				return Terrasoft.ApplicationStructureWizardUtils.getEntityFullName(schemaName);
			},

			/**
			 * Gets base configuration for creating client unit schema.
			 * @protected
			 * @param {Object} schemaConfig Schema configuration.
			 * @return {Object} Base configuration.
			 */
			getClientUnitSchemaBaseConfig: function(schemaConfig) {
				var mvmSchema = Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA;
				var entitySchema = schemaConfig.entitySchema;
				return {
					"bodyTemplate": Terrasoft.ClientUnitSchemaBodyTemplate[mvmSchema],
					"entitySchema": entitySchema,
					"entitySchemaName": entitySchema.getPropertyValue("name"),
					"packageUId": this.get("PackageUId")
				};
			},

			/**
			 * @deprecated
			 */
			getSchemaName: function(manager, schemaNameTemplate) {
				var managerItems = manager.getItems();
				var schemaName;
				for (var i = 1, iterations = managerItems.getCount(); i < iterations; i++) {
					schemaName = Ext.String.format(schemaNameTemplate, i);
					var foundItems = this.findSchemaManagerItemsByName(manager, schemaName);
					if (foundItems.isEmpty()) {
						break;
					}
				}
				return schemaName;
			},

			/**
			 * @deprecated
			 */
			findSchemaManagerItemsByName: function(manager, schemaName) {
				var managerItems = manager.getItems();
				return managerItems.filterByFn(function(item) {
					return item.getName() === schemaName;
				}, this);
			},

			/**
			 * Creates client unit schema.
			 * @protected
			 * @param {Object} config Client unit schema configuration.
			 * @param {Boolean} isExtendedParent IsExtendedParent indicator.
			 * @return {Object} Client unit schema.
			 */
			createClientUnitSchema: function(config, isExtendedParent) {
				var schemaName = config.schemaName;
				var caption = {};
				caption[Terrasoft.SysValue.CURRENT_USER_CULTURE.displayValue] = config.schemaCaption;
				var clientUnitSchema = Terrasoft.ClientUnitSchemaManager.createSchema({
					"uId": Terrasoft.generateGUID(),
					"name": schemaName,
					"packageUId": config.packageUId,
					"caption": caption,
					"body": Ext.String.format(config.bodyTemplate, schemaName, config.entitySchemaName),
					"schemaType": Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,
					"parentSchemaUId": Terrasoft.DesignTimeEnums.BaseSchemaUId.BASE_MODULE_PAGE
				});
				if (!isExtendedParent) {
					clientUnitSchema.extendParent = false;
				}
				var diff = this.getInitializationDiff(config.entitySchema);
				clientUnitSchema.setSchemaDiff(diff);
				return clientUnitSchema;
			},

			/**
			 * Returns client unit schema diff.
			 * @param {Terrasoft.EntitySchema} entitySchema Entity schema.
			 * @return {Object[]} Client unit schema diff.
			 */
			getInitializationDiff: function(entitySchema) {
				var primaryDisplayColumnName = entitySchema.primaryDisplayColumn.name;
				return [
					{
						"operation": "insert",
						"name": primaryDisplayColumnName + Terrasoft.generateGUID(),
						"values": {
							"layout": {
								"colSpan": 24,
								"rowSpan": 1,
								"column": 0,
								"row": 0,
								"layoutName": "ProfileContainer"
							},
							"bindTo": primaryDisplayColumnName
						},
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"index": 0
					}
				];
			}

		},
		diff: [
			{
				"operation": "insert",
				"name": "MultiPageSettingsContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["multi-page-settings-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "MultiPageSettingsContainer",
				"name": "MultiPageMainContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["multi-page-main-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageMainContainer",
				"propertyName": "items",
				"name": "MultiPageMainRadioGroupLabel",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.ModuleSettingsGroupCaption"},
					"labelClass": ["multi-page-main-radio-group-label"]
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageMainContainer",
				"propertyName": "items",
				"name": "UseMultiPage",
				"values": {
					"value": {"bindTo": "UseMultiPage"},
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"classes": {"wrapClassName": ["use-new-lookup"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "UseMultiPage",
				"propertyName": "items",
				"name": "UseMultiPageFalse",
				"values": {
					"caption": {"bindTo": "Resources.Strings.SinglePageCaption"},
					"markerValue": "UseMultiPageFalse",
					"value": false,
					"enabled": {"bindTo": "canEdit"}
				}
			},
			{
				"operation": "insert",
				"parentName": "UseMultiPage",
				"propertyName": "items",
				"name": "UseMultiPageTrue",
				"values": {
					"caption": {"bindTo": "Resources.Strings.MultiPageCaption"},
					"markerValue": "UseMultiPageTrue",
					"value": true,
					"enabled": {"bindTo": "canEdit"}
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageSettingsContainer",
				"propertyName": "items",
				"name": "MultiPageContainer",
				"values": {
					"visible": {"bindTo": "UseMultiPage"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["multi-page-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageContainer",
				"propertyName": "items",
				"name": "TypeColumnContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["type-column-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "TypeColumnContainer",
				"propertyName": "items",
				"name": "TypeColumn",
				"values": {
					"bindTo": "TypeColumn",
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"labelConfig": {"caption": {"bindTo": "Resources.Strings.MultiPageGridCaption"}},
					"controlConfig": {
						"list": {"bindTo": "TypeColumnList"},
						"prepareList": {"bindTo": "prepareTypeColumnList"},
						"tag": "TypeColumn"
					},
					"isRequired": {"bindTo": "UseMultiPage"}
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageContainer",
				"propertyName": "items",
				"name": "DataGrid",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID,
					"type": "listed",
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"listedZebra": true,
					"activeRow": {"bindTo": "ActiveRow"},
					"collection": {"bindTo": "GridData"},
					"isEmpty": {"bindTo": "IsGridEmpty"},
					"primaryColumnName": "Id",
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"activeRowActions": [],
					"visible": {"bindTo": "hasTypeColumn"},
					"rowDataItemMarkerColumnName": "Type"
				}
			},
			{
				"operation": "insert",
				"parentName": "MultiPageContainer",
				"propertyName": "items",
				"name": "AddNewPageButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.AddPageButton"},
					"visible": {"bindTo": "hasTypeColumn"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
					"imageConfig": resources.localizableImages.AddButtonImage,
					"click": {"bindTo": "addNewRow"},
					"classes": {"wrapperClass": ["add-new-page-button"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"name": "activeRowActionSave",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tag": "save",
					"markerValue": "save",
					"imageConfig": resources.localizableImages.SaveIcon
				}
			},
			{
				"operation": "insert",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"name": "activeRowActionRemove",
				"values": {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"tag": "remove",
					"markerValue": "remove",
					"imageConfig": resources.localizableImages.RemoveIcon
				}
			}
		]
	};
});


