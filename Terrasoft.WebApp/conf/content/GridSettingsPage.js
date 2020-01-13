Terrasoft.configuration.Structures["GridSettingsPage"] = {innerHierarchyStack: ["GridSettingsPageNUI", "GridSettingsPage"]};
define('GridSettingsPageNUIStructure', ['GridSettingsPageNUIResources'], function(resources) {return {schemaUId:'3627e186-b93e-4970-901b-a740c3e07b4a',schemaCaption: "GridSettingsPage", parentSchemaName: "", schemaName:'GridSettingsPageNUI',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('GridSettingsPageStructure', ['GridSettingsPageResources'], function(resources) {return {schemaUId:'be3a0480-2fe3-48ca-ad8d-0db5d69a3e35',schemaCaption: "GridSettingsPage", parentSchemaName: "GridSettingsPageNUI", schemaName:'GridSettingsPage',parentSchemaUId:'3627e186-b93e-4970-901b-a740c3e07b4a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"GridSettingsPageNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('GridSettingsPageNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("GridSettingsPageNUI", ["MaskHelper", "ConfigurationConstants", "StructureExplorerUtilities",
	"ColumnSettingsUtilities", "RightUtilities", "GridSettingsDesignerContainer",
	"css!GridSettingsPageCSS", "css!SectionModuleV2", "GridUtilitiesV2", "InnerListedGridHtmlGenerator"
], function(MaskHelper, ConfigurationConstants, StructureExplorerUtilities, ColumnSettingsUtilities, RightUtilities) {
	return {
		mixins: {
			/**
			 * @class GridUtilities implements basic methods for working with grid.
			 */
			GridUtilities: "Terrasoft.GridUtilities"
		},

		attributes: {
			"DataCollection": {
				value: []
			},
			"ListedDataCollection": {
				value: []
			},
			"GridData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				value: null
			},
			/**
			 * Preview data collection
			 */
			"PreviewGridData": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Is sys admin user flag.
			 */
			"IsSysAdmin": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			/**
			 * Max listed column count.
			 */
			"MaxListedColumns": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				value: 24
			},
			/**
			 * Max tiled column count.
			 */
			"MaxTiledColumns": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				value: 24
			},
			/**
			 * Is single type mode flag.
			 */
			"IsSingleTypeMode": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			},
			/**
			 * Is vertical grid settings flag.
			 */
			"IsVerticalGridSettings": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			/**
			 * Schema name.
			 */
			"SchemaName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},
			/**
			 * Column settings horizontal scroll value.
			 */
			"ColumnSettingsHorizontalScrollValue": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				value: null
			},
			/**
			 * A symptom indicating the possibility of selecting columns by the entity's feedbacks.
			 */
			"UseBackwards": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},

		properties: {

			/**
			 * Flag, is opened from dashboard designer.
			 * @type {Boolean}
			 */
			dashboardSettings: false,

			/**
			 * Current settings page.
			 * @type {Object}
			 */
			currentObject: {},

			/**
			 * Tiled preview data count.
			 * @private
			 * @type {Number}
			 */
			_tiledRowCount: 5,

			/**
			 * Listed preview data count.
			 * @private
			 * @type {Number}
			 */
			_listedRowCount: 10,

			/**
			 * ####, ####### ######### ########### ## ### #####
			 * @private
			 * @type {Boolean}
			 */
			localEntitySchemaLoaded: false,

			/**
			 * ##### ## ###### ######## ######## ######### #######
			 * @private
			 * @type {Object}
			 */
			localEntitySchema: null,

			/**
			 * ### #####
			 * @private
			 * @type {String}
			 */
			schemaName: null,

			/**
			 * ####, ####### ######### ...
			 * @private
			 * @type {Boolean}
			 */
			isSingleTypeMode: false,

			/**
			 * ### ##### ## ######### {@link Terrasoft.core.enums.GridKeyType}
			 * @private
			 * @type {String}
			 */
			baseGridType: null,

			/**
			 * ########### #######
			 * @private
			 * @type {Object}
			 */
			profile: null,

			/**
			 * #### #######
			 * @private
			 * @type {String}
			 */
			profileKey: null,

			/**
			 * ######, ############ #####
			 * @private
			 * @type {String}
			 */
			propertyName: null,

			/**
			 * ####, ########## ######## ## ######## ##########
			 * @private
			 * @type {Boolean}
			 */
			hideButtons: false,

			/**
			 * ####, ########## ######## ## ######## ##########
			 * @private
			 * @type {Boolean}
			 */
			hideGridType: false,

			/**
			 * ####, ...
			 * @private
			 * @type {Boolean}
			 */
			isNested: false,

			/**
			 * ####### ######### ###### ####### ## ######## profile.
			 * @private
			 * @type {Boolean}
			 */
			useProfileField: false,

			/**
			 * ####### ########### ###### ########## ### #### #############.
			 * @private
			 * @type {Boolean}
			 */
			hideAllUsersSaveButton: false,

			/**
			 * #######, ########### ## ######### ######## ############## ########.
			 * @private
			 * @type {Boolean}
			 */
			isCardVisible: false,

			/**
			 * #######, ########### ## ########### ###### ####### ## ######## ###### ########.
			 * @private
			 * @type {Boolean}
			 */
			useBackwards: true,

			/**
			 * #######, ########### ## ########### ############## ###### ######### ########.
			 * @private
			 * @type {Boolean}
			 */
			firstColumnsOnly: false,

			/**
			 * ######### ####### ####### (### Tiled)
			 * @private
			 * @type {Array}
			 */
			dataCollection: [],

			/**
			 * ######### ####### ####### (### Listed)
			 * @private
			 * @type {Array}
			 */
			listedDataCollection: [],

			/**
			 * ####### ###### ### ########
			 * @private
			 * @type {String}
			 */
			elementPrefix: "element",

			/**
			 * The class prefix for empty element.
			 * @private
			 * @type {String}
			 */
			emptyPrefix: "empty",

			/**
			 * The count column in the line. Default value.
			 * @private
			 * @type {Integer}
			 */
			rowSize: 24,

			/**
			 * Class for columns with type LINK.
			 * @private
			 * @type {String}
			 */
			urlCellCss: "column-url",

			/**
			 * Selected column row id.
			 * @private
			 * @type {String}
			 */
			selectedCellId: "",

			/**
			 * Array of not found column paths.
			 * @protected
			 * @type {String[]}
			 */
			notFoundColumns: null,

			/**
			 * Current editing element view model
			 * @protected
			 * @type {Terrasoft.BaseViewModel}
			 */
			currentItemViewModel: null,

			/**
			 * Column setting module config.
			 * @type {Object}
			 * @protected
			 */
			columnSettingModuleConfig: null,

			/**
			 * Default column count for tiled profile
			 * @protected
			 * @type {Integer}
			 */
			defaultColumnCount: 24,

			/** Is primary column displayed? */
			canDisplayPrimaryColumn: true
		},

		messages: {
			"GetEntitySchema": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"GetGridSettingsInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"GetProfileData": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ReplaceHistoryState": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"StructureExplorerInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ColumnSelected": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"SaveGridSettings": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"GridSettingsChanged": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"ColumnSettingsInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ColumnSetuped": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ReloadGridSettings": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},

		methods: {

			//region Methods: Private

			/**
			 * Sort columns config by column position.
			 * @private
			 * @param first First comparing value.
			 * @param second Second comparing value.
			 * @returns {number} Sorted columns config.
			 */
			_sortColumnsConfigByColumn: function(first, second) {
				if (first.position.column > second.position.column) {
					return 1;
				}
				if (first.position.column < second.position.column) {
					return -1;
				}
				return 0;
			},

			/**
			 * Returns throttle function for grid preview reRender.
			 * @private
			 * @return {Function} Throttle function.
			 */
			_getGridDataChangeThrottle: function() {
				return Terrasoft.debounce(function(reload) {
					this.reloadPreviewGridData(reload);
					this.sandbox.publish("SaveGridSettings", this.getNewProfileData(), [this.sandbox.id]);
					this.hideBodyMask();
				}.bind(this), 200);
			},

			/**
			 * Sets grid type from grid profile config.
			 * @private
			 * @param {Object} gridProfile Grid profile config.
			 */
			_setGridType: function(gridProfile) {
				if (gridProfile) {
					if (!this.Ext.isEmpty(gridProfile.isTiled)) {
						this.isTiled = gridProfile.isTiled;
					}
					this.gridType = gridProfile.type ||
						(this.isTiled ? this.Terrasoft.GridType.TILED : this.Terrasoft.GridType.LISTED);
				}
				this.set("GridType", this.gridType);
			},

			/**
			 * Sets grid setting data collections.
			 * @private
			 * @param {Object} currentGridProfile Current grid profile config.
			 * @param {Object} fullProfile Full profile.
			 */
			_setDataCollections: function(currentGridProfile, fullProfile) {
				if (currentGridProfile && currentGridProfile.listedConfig && currentGridProfile.tiledConfig) {
					this.dataCollection = this.getColumnsConfigFromProfileV2(currentGridProfile, true);
					this.listedDataCollection = this.getColumnsConfigFromProfileV2(currentGridProfile, false);
				} else {
					this.dataCollection = this.getColumnsConfigFromProfile(fullProfile, true);
					this.set("ListedDataCollection", this.getColumnsConfigFromProfile(fullProfile, false));
				}
			},

			/**
			 * Changes history state if grid settings is not nested page.
			 * @private
			 */
			_changeHistoryStateOnInit: function() {
				if (!this.isNested) {
					var state = this.sandbox.publish("GetHistoryState");
					var currentHash = state.hash;
					var currentState = state.state || {};
					if (currentState.moduleId !== this.sandbox.id) {
						var newState = this.Terrasoft.deepClone(currentState);
						newState.moduleId = this.sandbox.id;
						this.sandbox.publish("ReplaceHistoryState", {
							stateObj: newState,
							pageTitle: null,
							hash: currentHash.historyState,
							silent: true
						});
					}
				}
			},

			/**
			 * Returns columns config data collection.
			 * @private
			 * @param {Object} currentGridProfile Current grid profile config.
			 * @return {Terrasoft.BaseViewModelCollection} Columns config data collection.
			 */
			_getColumnsConfigDataCollection: function(currentGridProfile) {
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				if (currentGridProfile && currentGridProfile.listedConfig && currentGridProfile.tiledConfig) {
					var columnsConfig = this.gridType === this.Terrasoft.GridType.TILED
						? this.Ext.decode(currentGridProfile.tiledConfig)
						: this.Ext.decode(currentGridProfile.listedConfig);
					var collectionConfig = this._generateViewModelCollectionConfigs(columnsConfig);
					collectionConfig.forEach(function(item) {
						var model = this.Ext.create("Terrasoft.BaseViewModel", {
							values: item
						});
						collection.add(item.itemId, model);
					});
				}
				return collection;
			},

			/**
			 * Sets GridData attribute according to grid type.
			 * @private
			 * @param {Terrasoft.GridType} gridType GridType.
			 */
			_setGridDataByType: function(gridType) {
				var profileGridSettingsName = this.getDataGridName();
				var gridProfile = profileGridSettingsName ? this.profile[profileGridSettingsName] : this.profile;
				this.isTiled = gridType === this.Terrasoft.GridType.TILED;
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				if (gridProfile && gridProfile.listedConfig && gridProfile.tiledConfig) {
					var columnsConfig = gridType === this.Terrasoft.GridType.TILED
						? this.Ext.decode(gridProfile.tiledConfig)
						: this.Ext.decode(gridProfile.listedConfig);
					var collectionConfig = this._generateViewModelCollectionConfigs(columnsConfig);
					collectionConfig.forEach(function(item) {
						var model = this.Ext.create("Terrasoft.BaseViewModel", {
							values: item
						});
						collection.add(item.itemId, model);
					});
				}
				var currentCollection = this.get("GridData");
				currentCollection.reloadAll(collection);
			},

			/**
			 * Open column select module
			 * @private
			 * @param {Object} config
			 * @param {Function} callback
			 * @param {Object} renderTo
			 */
			_openStructureExplorer: function(config, callback, renderTo) {
				StructureExplorerUtilities.Open(this.sandbox, config, callback, renderTo, this);
			},

			/**
			 * Check personal user settings.
			 * @private
			 * @param {Object} filtersValue SysProfileData query filters values.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			_checkUserSettings: function(filtersValue, callback, scope) {
				MaskHelper.showBodyMask();
				var esq = this._getSysProfileDataSelectQuery(filtersValue);
				esq.getEntityCollection(function(response) {
					var collection = response && response.collection;
					var isNotEmptyCollection = collection && !collection.isEmpty();
					var firstItem = isNotEmptyCollection && collection.first();
					var count = firstItem && firstItem.get("Count");
					if (response && response.success && count > 0) {
						this.showConfirmationDialog(this.get("Resources.Strings.DeleteUserProfilesMessage"),
							function(returnCode) {
								this._deleteConfirmationCallback(returnCode, filtersValue, callback, scope);
							}, [Terrasoft.MessageBoxButtons.NO.returnCode,
								Terrasoft.MessageBoxButtons.YES.returnCode], null);
					} else {
						Ext.callback(callback, scope || this);
					}
				}, this);
			},

			/**
			 * Applies SysProfileData query filters.
			 * @private
			 * @param {Terrasoft.BaseFilterableQuery} query SysProfileData query.
			 * @param {Object} filtersValue SysProfileData query filters values.
			 */
			_applyFilters: function(query, filtersValue) {
				query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Key", filtersValue.profileKey));
				query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysCulture", filtersValue.profileCulture));
				query.filters.addItem(Terrasoft.createIsNotNullFilter(
					Ext.create("Terrasoft.ColumnExpression", {columnPath: "Contact"})
				));
				query.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL, "Contact",
					Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
			},

			/**
			 * Returns SysProfileData select query.
			 * @private
			 * @param {Object} filtersValue SysProfileData query filters values.
			 * @return {Terrasoft.EntitySchemaQuery} SysProfileData select query.
			 */
			_getSysProfileDataSelectQuery: function(filtersValue) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysProfileData"
				});
				esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "Count");
				this._applyFilters(esq, filtersValue);
				return esq;
			},

			/**
			 * Returns SysProfileData delete query.
			 * @private
			 * @param {Object} filtersValue SysProfileData query filters values.
			 * @return {Terrasoft.DeleteQuery} SysProfileData delete query.
			 */
			_getSysProfileDataDeleteQuery: function(filtersValue) {
				var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: "SysProfileData"
				});
				this._applyFilters(deleteQuery, filtersValue);
				return deleteQuery;
			},

			/**
			 * Delete confirmation callback.
			 * @private
			 * @param {String} returnCode Confirmation dialog return code.
			 * @param {Object} filtersValue SysProfileData query filters values.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			_deleteConfirmationCallback: function(returnCode, filtersValue, callback, scope) {
				if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
					var deleteQuery = this._getSysProfileDataDeleteQuery(filtersValue);
					deleteQuery.execute(function(result) {
						if (!result.success) {
							this.error(result);
						}
						Ext.callback(callback, scope || this);
					}, this);
				} else {
					Ext.callback(callback, scope || this);
				}
			},

			/**
			 * Returns new cell config.
			 * @private
			 * @param {Object} args Structure explorer args.
			 * @return {Object} New cell config.
			 */
			_getNewCellConfig: function(args) {
				var schema = this.entitySchema;
				var primaryDisplayColumnName = schema.primaryDisplayColumnName;
				var newCellConfig = {
					content: args.caption.join("."),
					dataValueType: args.dataValueType,
					isCaptionHidden: (primaryDisplayColumnName === args.leftExpressionColumnPath),
					isCurrent: true,
					isTitleText: (primaryDisplayColumnName === args.leftExpressionColumnPath),
					metaPath: args.leftExpressionColumnPath,
					referenceSchemaName: args.referenceSchemaName,
					itemId: this.Terrasoft.generateGUID(),
					dragActionsCode: 9,
					leftExpressionCaption: args.caption.join("."),
					bindTo: this._getCellBindTo(args),
					isBackward: args.isBackward,
					leftExpressionColumnPath: args.leftExpressionColumnPath,
					aggregationType: args.aggregationType,
					aggregationFunction: args.aggregationFunction,
					isAggregative: args.isAggregative,
					schemaName: this.schemaName,
					"lastReferenceSchemaName": args.lastReferenceSchemaName
				};
				return newCellConfig;
			},

			/**
			 * Gets cell bindTo value.
			 * @private
			 * @param {Object} args Column config.
			 * @param {Terrasoft.AggregationType|String} args.aggregationFunction Column aggregation function.
			 * @param {String[]} args.metaPath Column meta path.
			 * @param {String} args.leftExpressionColumnPath Left expression column path.
			 * @return {String} BindTo value of the cell.
			 */
			_getCellBindTo: function(args) {
				var aggFunction = args.aggregationFunction;
				var isAggregationColumn = Boolean(aggFunction) || parseInt(aggFunction, 10) > 0;
				var leftExpressionColumnPath = args.leftExpressionColumnPath;
				if (isAggregationColumn || (args && args.isBackward)) {
					return this._getColumnPathWithSuffix(leftExpressionColumnPath);
				}
				return leftExpressionColumnPath;
			},

			/**
			 * Gets column path with unique suffix.
			 * @private
			 * @param {String} columnPath Real column path.
			 * @return {String} Column path with unique suffix.
			 */
			_getColumnPathWithSuffix: function(columnPath) {
				var uniqueId = Terrasoft.randomString();
				var delimiter = ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter;
				return Ext.String.format("{0}{1}{2}", columnPath, delimiter, uniqueId);
			},

			/**
			 * Add new column config to grid data
			 * @private
			 * @param {Terrasoft.BaseViewModel} newItemViewModel New column config view model.
			 */
			_addNewColumnConfig: function(newItemViewModel) {
				var itemId = newItemViewModel.get("itemId");
				var gridData = this.get("GridData");
				if (!gridData.contains(itemId)) {
					gridData.add(itemId, newItemViewModel);
				}
			},

			/**
			 * Returns column settings config for column settings module.
			 * @private
			 * @returns {Object} Column settings config for column settings module.
			 */
			_getColumnSettingsConfig: function() {
				var item = this.currentItemViewModel;
				var columnType = item.get("columnType") || item.get("type");
				var captionConfig = item.get("captionConfig") || {};
				var isCaptionHidden = item.get("isCaptionHidden");
				isCaptionHidden = Ext.isDefined(isCaptionHidden) ? isCaptionHidden : captionConfig.visible === false;
				var config = {};
				config.title = item.get("content");
				config.itemId = item.get("itemId");
				config.aggregationType = item.get("aggregationType");
				config.dataValueType = item.get("dataValueType");
				config.isBackward = item.get("isBackward");
				config.isCaptionHidden = isCaptionHidden;
				config.isTiled = item.get("isTiled") || this.$GridType === this.Terrasoft.GridType.TILED;
				config.isTitleText = columnType === "title";
				config.leftExpressionCaption = item.get("leftExpressionCaption");
				config.metaCaptionPath = item.get("metaCaptionPath");
				config.serializedFilter = item.get("serializedFilter");
				config.columnType = columnType;
				config.referenceSchemaName = item.get("referenceSchemaName");
				config.hideFilter = item.get("hideFilter");
				config.useLinkType = item.get("useLinkType");
				config.leftExpressionColumnPath = item.get("leftExpressionColumnPath");
				config.aggregationFunction = item.get("aggregationFunction");
				config.loadModuleConfig = this.columnSettingModuleConfig;
				config.schemaName = item.get("schemaName");
				config.lastReferenceSchemaName = item.get("lastReferenceSchemaName");
				return config;
			},

			/**
			 * Sets values for columns modified in column settings module.
			 * @private
			 * @param {Object} args New object config.
			 */
			structureExplorerCallback: function(args) {
				var cellConfig = this._getNewCellConfig(args);
				if (this.addButtonClicked !== "main") {
					this.Ext.apply(cellConfig, this.internalPosition);
					this.internalPosition = null;
					var neighbourColSpan;
					if (this.neighbourItem && this.addButtonClicked === "left") {
						neighbourColSpan = this.neighbourItem.get("colSpan");
						this.neighbourItem.set("colSpan", neighbourColSpan - 1);
					}
					if (this.neighbourItem && this.addButtonClicked === "right") {
						neighbourColSpan = this.neighbourItem.get("colSpan");
						this.neighbourItem.set("colSpan", neighbourColSpan - 1);
					}
					this.neighbourItem = null;
				}
				this.addButtonClicked = null;
				var newItem = Ext.create("Terrasoft.BaseViewModel", {values: cellConfig});
				if (args.aggregationFunction || args.metaPath.length > 1) {
					this.currentItemViewModel = newItem;
					var config = this._getColumnSettingsConfig();
					ColumnSettingsUtilities.Open(this.sandbox, config, function(newConfig) {
						this._addNewColumnConfig(newItem);
						this.columnSettingsUtilitiesCallback(newConfig);
					}, this.renderTo, this);
				} else {
					this._addNewColumnConfig(newItem);
					this.onGridDataChanged(null, null, true);
				}
			},

			/**
			 * Gets listed cell metapath.
			 * @private
			 * @param {Object} listedCell Listed cell config.
			 * @return {String} Listed cell metapath.
			 */
			getListedCellMetaPath: function(listedCell) {
				return listedCell.key[0].name.bindTo || listedCell.key[1].name.bindTo;
			},

			/**
			 * Returns dom attributes for grid type buttons.
			 * @returns {Object} Dom attributes for grid type buttons.
			 * @private
			 */
			_getDomAttributes: function() {
				return {active: arguments[0] === this.get("GridType")};
			},

			/**
			 * Loads schema.
			 * @private
			 * @param {String} entityName Entity schema name.
			 * @param {Function} callback Callback function.
			 */
			getEntitySchemaWithDescriptor: function(entityName, callback) {
				if (!this.localEntitySchemaLoaded) {
					this.localEntitySchema = this.sandbox.publish("GetEntitySchema", entityName);
					this.localEntitySchemaLoaded = true;
				}
				if (this.localEntitySchema) {
					callback.call(this, this.localEntitySchema);
				} else {
					this.sandbox.requireModuleDescriptors([entityName], function() {
						require([entityName], callback);
					}, this);
				}
			},

			/**
			 * Returns column configuration
			 * @private
			 * @return {Object}
			 */
			_getBaseColumnConfigV3: function(item) {
				var result = {};
				var modelJson = item.getJSON();
				delete modelJson.content;
				delete modelJson.column;
				delete modelJson.colSpan;
				delete modelJson.row;
				delete modelJson.dragActionsCode;
				Ext.apply(result, modelJson);
				if (item.get("content")) {
					result.caption = item.get("content");
				}
				result.position = {
					column: item.get("column"),
					colSpan: item.get("colSpan"),
					row: item.get("row") + 1
				};
				return result;
			},

			/**
			 * Generates listed collection config for view models.
			 * @private
			 * @param config
			 * @returns {Array}
			 */
			_generateViewModelCollectionConfigs: function(config) {
				var cells = [];
				for (var k = 0; k < config.items.length; k++) {
					var listedCell = config.items[k];
					var cell = {};
					var listedCellCopy = this.Terrasoft.deepClone(listedCell);
					delete listedCellCopy.caption;
					delete listedCellCopy.position;
					this.Ext.apply(cell, listedCellCopy);
					cell.content = listedCell.caption;
					cell.itemId = this.Terrasoft.generateGUID();
					cell.leftExpressionCaption = listedCell.caption;
					if (listedCell.position) {
						cell.column = listedCell.position.column;
						cell.colSpan = listedCell.position.colSpan;
						cell.row = listedCell.position.row - 1;
					}
					cell.dragActionsCode = 9;
					cell.isTiled = this.get("GridType") === this.Terrasoft.GridType.TILED;
					if (this.isSingleTypeMode) {
						cell.useLinkType = this.isSingleTypeMode;
					}
					cells.push(cell);
				}
				return cells;
			},

			/**
			 * @private
			 */
			_clearProfileCache: function(profileKey) {
				var cache = Terrasoft.ClientPageSessionCache;
				if (cache) {
					var cacheKeys = Terrasoft.keys(cache.storage);
					Terrasoft.each(cacheKeys, function(key) {
						if (key.indexOf(profileKey) !== -1) {
							cache.removeItem(key);
						}
					});
				}
			},

			/**
			 * @private
			 */
			_afterSaveUserProfile: function(profile, profileKey) {
				MaskHelper.hideBodyMask();
				this.sandbox.publish("GridSettingsChanged", {
					newProfileData: profile
				}, [this.sandbox.id]);
				this._clearProfileCache(profileKey);
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * Callback for column settings utilities.
			 * @private
			 * @param {Object} newConfig View model config object.
			 */
			columnSettingsUtilitiesCallback: function(newConfig) {
				if (this.isEmpty(newConfig)) {
					return;
				}
				var currentViewModel = this.currentItemViewModel;
				var options = {reloadData: false};
				currentViewModel.set("content", newConfig.title, options);
				currentViewModel.set("aggregationType", newConfig.aggregationType, options);
				currentViewModel.set("dataValueType", newConfig.dataValueType, options);
				currentViewModel.set("isBackward", newConfig.isBackward, options);
				currentViewModel.set("isCaptionHidden", newConfig.isCaptionHidden, options);
				currentViewModel.set("isTiled", newConfig.isTiled, options);
				currentViewModel.set("metaCaptionPath", newConfig.metaCaptionPath, options);
				currentViewModel.set("referenceSchemaName", newConfig.referenceSchemaName, options);
				currentViewModel.set("columnType", newConfig.columnType, options);
				currentViewModel.set("type", newConfig.columnType, options);
				currentViewModel.set("serializedFilter", newConfig.serializedFilter, options);
				currentViewModel.set("isTitleText", newConfig.columnType === "title", options);
				currentViewModel.set("hideFilter", newConfig.hideFilter, options);
				currentViewModel.set("leftExpressionColumnPath", newConfig.leftExpressionColumnPath, options);
				currentViewModel.set("leftExpressionCaption",
					newConfig.leftExpressionCaption || newConfig.title, options);
				if (this.columnSettingModuleConfig && this.columnSettingModuleConfig.isNestedColumnSettingModule) {
					this.onGridDataChanged(null, {}, true);
					return;
				}
				this.sandbox.publish("SaveGridSettings", this.getNewProfileData(), [this.sandbox.id]);
			},
			
			/**
			 * @private
			 */
			_addRowColumns: function(rowConfig, doNotSaveProfile, columnsConfig, isTiled) {
				rowConfig.cells.sort(this._sortColumnsConfigByColumn);
				Terrasoft.each(rowConfig.cells, function(cell) {
					const column = this.transformColumn({
						column: cell,
						doNotSaveProfile: doNotSaveProfile
					});
					if (isTiled) {
						column.captionConfig = Ext.isDefined(column.isCaptionHidden)
							? { visible: !column.isCaptionHidden }
							: (column.captionConfig || { visible: true });
					}
					column.type = column.type || column.columnType;
					columnsConfig.items.push(column);
					
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * ######## ############ #######
			 * @protected
			 * @param {Object} cell
			 * @param {Object} metaPath
			 * @param {Object} row
			 * @param {Object} path
			 * @return {Object}
			 */
			getBaseColumnConfigV2: function(cell, metaPath, row, path) {
				return {
					bindTo: metaPath,
					caption: cell.caption,
					type: cell.columnType,
					position: {
						column: cell.column,
						colSpan: cell.width,
						row: row
					},
					width: cell.widthAbsolute,
					orderDirection: cell.orderDirection,
					orderPosition: cell.orderPosition,
					dataValueType: cell.dataValueType,
					aggregationType: cell.aggregationType,
					isBackward: cell.isBackward,
					metaCaptionPath: cell.metaCaptionPath,
					metaPath: metaPath,
					path: path,
					referenceSchemaName: cell.referenceSchemaName,
					serializedFilter: cell.serializedFilter,
					hideFilter: cell.hideFilter
				};
			},

			/**
			 * Loads columns config data collection.
			 * @protected
			 * @param {Object} currentGridProfile Current grid profile config.
			 */
			loadColumnsConfigDataCollection: function(currentGridProfile) {
				var collection = this._getColumnsConfigDataCollection(currentGridProfile);
				var currentCollection = this.get("GridData");
				currentCollection.reloadAll(collection);
			},

			/**
			 * Load profile.
			 * @protected
			 * @param {Object} profile
			 */
			loadProfile: function(profile) {
				var gridProfile = this.propertyName ? profile[this.propertyName] : profile;
				var isTiled = true;
				var gridType = this.Terrasoft.GridType.TILED;
				var baseGridType = this.baseGridType;
				if (this.Ext.Object.isEmpty(gridProfile) && baseGridType) {
					isTiled = (baseGridType === this.Terrasoft.GridType.TILED);
					gridType = baseGridType;
				}
				this.isTiled = isTiled;
				this.gridType = gridType;
				this.profile = this.Terrasoft.ColumnUtilities.updateProfileColumnCaptions({
					profile: profile,
					entityColumns: this.entityColumns,
					notFoundColumns: this.notFoundColumns
				});
				this.currentObject = this;
				this.on("change:GridType", this.changeGridType, this);
				this._setDataCollections(gridProfile, profile);
				this._setGridType(gridProfile);
				this.loadColumnsConfigDataCollection(gridProfile);
				this.reloadPreviewGridData();
				this.hideBodyMask();
			},

			/**
			 * Initializes PreviewGridData.
			 * @protected
			 */
			initPreviewGridData: function() {
				this.set("PreviewGridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			},

			/**
			 * Check can reload preview grid data.
			 * @protected
			 * @returns {boolean} Can reload preview grid data tag.
			 */
			canReloadGrid: function() {
				var grid = this.getCurrentGrid();
				return Boolean(grid && grid.rendered);
			},

			/**
			 * Reloads preview data.
			 * @param {Boolean} [reloadData] True when need reload data from database.
			 */
			reloadPreviewGridData: function(reloadData) {
				if (!this.canReloadGrid()) {
					return;
				}
				this.showBodyMask();
				var profile = this.getNewProfileData(true);
				this.setColumnsProfile(profile, true);
				this.reloadGridColumnsConfig(false);
				var preViewData = this.getGridData();
				if ((preViewData && preViewData.getCount() === 0) || reloadData === true) {
					this.reloadGridData();
				} else {
					preViewData.reloadAll(preViewData.map(function(item) {
						return item;
					}));
					this.onDataChanged();
				}
			},

			/**
			 * Save profile settings for all users.
			 * @protected
			 */
			saveSettingsForAllUsers: function() {
				if (this.isGridSettingsEmpty()) {
					this.showConfirmationDialog(this.get("Resources.Strings.EmptyGridSettingsMsg"));
					return;
				}
				var profileKey = this.currentObject.profileKey;
				var profile = this.getNewProfileData();
				this._checkUserSettings({
					profileKey: profileKey,
					profileCulture: Terrasoft.Resources.CultureSettings.currentCultureId
				}, function() {
					Terrasoft.utils.saveUserProfile(profileKey, profile, false);
					Terrasoft.utils.saveUserProfile(profileKey, profile, true,
						this._afterSaveUserProfile.bind(this, profile, profileKey), this);
				}, this);
			},

			/**
			 * Returns new grid profile.
			 * @protected
			 * @param {Boolean} [doNotSaveProfile] Need save current grid settings to profile flag.
			 * @return {profile|*|Function|profile|profile|profile}
			 */
			getNewProfileData: function(doNotSaveProfile) {
				var profileKey = this.currentObject.profileKey;
				var propertyName = this.currentObject.propertyName;
				var profile = propertyName ? this.currentObject.profile[propertyName] : this.currentObject.profile;
				if (!profile && propertyName) {
					this.currentObject.profile[propertyName] = {};
					profile = this.currentObject.profile[propertyName];
				}
				profile.tiledConfig = this.getTiledProfileConfigV2(doNotSaveProfile);
				profile.listedConfig = this.getListedProfileConfigV2(doNotSaveProfile);

				profile.key = profileKey;
				profile.isTiled = this.get("GridType") === this.Terrasoft.GridType.TILED;
				profile.type = profile.isTiled ? Terrasoft.GridType.TILED : Terrasoft.GridType.LISTED;
				this.currentObject.profile.key = this.currentObject.profile.key || profile.key;
				return this.currentObject.profile;
			},

			/**
			 * Allows column transformations in derived code.
			 * @protected
			 * @virtual
			 * @param {Object} config Column transformantion config.
			 * @param {Object} config.column Column config.
			 * @param {Boolean} [config.doNotSaveProfile] Need save current grid settings to profile flag.
			 * @return {Object} Transformed column config.
			 */
			transformColumn: function(config) {
				return config.column;
			},

			/**
			 * Returns new tiled grid profile.
			 * @protected
			 * @param {Boolean} [doNotSaveProfile] Need save current grid settings to profile flag.
			 * @return {encode|*}
			 */
			getTiledProfileConfigV2: function(doNotSaveProfile) {
				var collection = this.currentObject.dataCollection;
				var tiledColumnsConfig = {
					grid: {
						rows: collection.length,
						columns: this.defaultColumnCount
					},
					items: []
				};
				Terrasoft.each(collection, function(row) {
					this._addRowColumns(row, doNotSaveProfile, tiledColumnsConfig, true);
				}, this);
				return Ext.encode(tiledColumnsConfig);
			},

			/**
			 * Returns new listed grid profile.
			 * @protected
			 * @param {Boolean} [doNotSaveProfile] Need save current grid settings to profile flag.
			 * @return {encode|*}
			 */
			getListedProfileConfigV2: function(doNotSaveProfile) {
				var collection = this.listedDataCollection;
				var listedColumnsConfig = {
					items: []
				};
				if (collection.length > 0) {
					this._addRowColumns(collection[0], doNotSaveProfile, listedColumnsConfig, false);
				}
				return Ext.encode(listedColumnsConfig);
			},
			/**
			 * ######## ############ ####### #######
			 * @protected
			 * @param {Object} profileCell
			 * @return {Object}
			 */
			getBaseCellConfigV2: function(profileCell) {
				return {
					column: profileCell.position.column,
					caption: profileCell.caption,
					metaPath: profileCell.bindTo,
					isTitleText: profileCell.isTitleText,
					width: profileCell.position.colSpan,
					dataValueType: profileCell.dataValueType,
					bindTo: profileCell.bindTo,
					aggregationType: profileCell.aggregationType,
					isBackward: profileCell.isBackward,
					metaCaptionPath: profileCell.metaCaptionPath,
					serializedFilter: profileCell.serializedFilter,
					referenceSchemaName: profileCell.referenceSchemaName,
					hideFilter: profileCell.hideFilter,
					position: profileCell.position
				};
			},

			/**
			 * ########## ###### ##### ## #######
			 * @protected
			 * @param {Object} config
			 * @return {Array} ########## ###### #####
			 */
			generateTiledCollectionV2: function(config) {
				var collection = [];
				var rowsCount = config.grid.rows;
				var initialIndex = 1;
				for (var rowIndex = initialIndex; rowIndex < rowsCount + initialIndex; rowIndex++) {
					var columns = this.getGridRowColumns(config, rowIndex);
					var cells = [];
					for (var j = 0; j < columns.length; j++) {
						var cell = columns[j];
						var isTitleText = cell.type === Terrasoft.GridCellType.TITLE;
						var isURLType = cell.type === Terrasoft.GridCellType.LINK;
						var dataTiledCell = this.getBaseCellConfigV2(cell);
						Ext.apply(dataTiledCell, {
							isCaptionHidden: !cell.captionConfig.visible,
							isTitleText: isTitleText,
							isURLType: isURLType
						});
						if (!Ext.isEmpty(cell.orderDirection)) {
							dataTiledCell.orderDirection = cell.orderDirection;
							dataTiledCell.orderPosition = cell.orderPosition;
						}
						if (!Ext.isEmpty(cell.type)) {
							dataTiledCell.columnType = cell.type;
						}
						cells.push(dataTiledCell);
					}
					collection.push({
						row: rowIndex,
						cells: cells
					});
				}
				return collection;
			},

			/**
			 * ########## ###### ##### ## #######
			 * @protected
			 * @param {Object} config
			 * @return {Array} ########## ###### #####
			 */
			generateListedCollectionV2: function(config) {
				var cells = [];
				for (var k = 0; k < config.items.length; k++) {
					var listedCell = config.items[k];
					var dataListedCell = this.getBaseCellConfigV2(listedCell);
					if (!Ext.isEmpty(listedCell.orderDirection)) {
						dataListedCell.orderDirection = listedCell.orderDirection;
						dataListedCell.orderPosition = listedCell.orderPosition;
					}
					if (!Ext.isEmpty(listedCell.type)) {
						dataListedCell.columnType = listedCell.type;
						dataListedCell.isTitleText = listedCell.type === Terrasoft.GridCellType.TITLE;
						dataListedCell.isURLType = listedCell.type === Terrasoft.GridCellType.LINK;
					}
					cells.push(dataListedCell);
				}
				return [{
					row: 0,
					cells: cells
				}];
			},

			/**
			 * ########## ###### ####### ## #######
			 * @protected
			 * @param {Object} profile
			 * @param {Boolean} isTiled
			 * @return {Array} ########## ###### #####
			 */
			getColumnsConfigFromProfileV2: function(profile, isTiled) {
				var dataCollection = [];
				profile = profile || {};
				if (!profile.tiledConfig && !profile.listedConfig) {
					profile.tiledConfig = "{}";
					profile.listedConfig = "{}";
					return dataCollection;
				}
				var gridsColumnsConfig = isTiled ? profile.tiledConfig : profile.listedConfig;
				if (gridsColumnsConfig) {
					var columnsConfig = Ext.decode(gridsColumnsConfig);
					if (isTiled) {
						dataCollection = this.generateTiledCollectionV2(columnsConfig);
					} else if (columnsConfig.items.length > 0) {
						dataCollection = this.generateListedCollectionV2(columnsConfig);
					} else {
						return dataCollection;
					}
				}
				return dataCollection;
			},

			/**
			 * ######## ############ #######
			 * @protected
			 * @param {Object} profileCell
			 * @return {Object}
			 */
			getBaseCellConfig: function(profileCell) {
				return {
					column: profileCell,
					aggregationType: profileCell.aggregationType,
					dataValueType: profileCell.dataValueType,
					isBackward: profileCell.isBackward,
					isTitleText: profileCell.isTitleText,
					metaCaptionPath: profileCell.metaCaptionPath,
					serializedFilter: profileCell.serializedFilter,
					referenceSchemaName: profileCell.referenceSchemaName,
					width: profileCell.cols,
					hideFilter: profileCell.hideFilter
				};
			},

			/**
			 * ########## ###### ##### ## ####### (### ####### ####### Tiled)
			 * @protected
			 * @param {Object} config
			 * @return {Array}
			 */
			generateTiledCollection: function(config) {
				var previousCell = {};
				var keySplitter = ConfigurationConstants.EntitySchemaQuery.ColumnKeySplitter;
				var collection = [];
				for (var i = 0; i < config.length; i++) {
					var row = config[i];
					var cells = [];
					for (var j = 0; j < row.length; j++) {
						var cell = row[j];
						var key = cell.key;
						var keysCount = key.length;
						var caption = key[keysCount - 1].caption;
						var bindTo = key[keysCount - 1].name.bindTo;
						var columnKeySplittedArray = bindTo.split(keySplitter);
						var metaPath = columnKeySplittedArray[0];
						var cellType = key[key.length - 1].type;
						var isTitleText = cellType === Terrasoft.GridCellType.TITLE;
						var isURLType = cellType === Terrasoft.GridCellType.LINK;
						var column = j;
						if (j > 0) {
							previousCell = cells[j - 1];
							column = previousCell.column + previousCell.width;
						}
						var dataTiledCell = this.getBaseCellConfig(cell);
						Ext.apply(dataTiledCell, {
							caption: caption,
							column: column,
							isCaptionHidden: keysCount === 1,
							metaPath: metaPath,
							isTitleText: isTitleText,
							isURLType: isURLType
						});
						if (!Ext.isEmpty(cell.orderDirection)) {
							dataTiledCell.orderDirection = cell.orderDirection;
							dataTiledCell.orderPosition = cell.orderPosition;
						}
						cells.push(dataTiledCell);
					}
					collection.push({
						row: i,
						cells: cells
					});
				}
				return collection;
			},

			/**
			 * Generate cells for old listed grid row.
			 * @protected
			 * @param {Object[]} config Config.
			 * @param {String} captionsConfig Captions config.
			 * @return {Object[]} Cells array for old listed grid row.
			 */
			generateListedCollection: function(config, captionsConfig) {
				var previousCell = {};
				var cells = [];
				for (var k = 0; k < config.length; k++) {
					var listedCell = config[k];
					var captionCell = Ext.decode(captionsConfig)[k];
					if (Ext.isEmpty(listedCell) || Ext.isEmpty(captionCell) || Ext.isEmpty(listedCell.key)) {
						continue;
					}
					var listedColumn = k;
					if (k > 0) {
						previousCell = cells[k - 1];
						listedColumn = previousCell.column + previousCell.width;
					}
					var dataListedCell = this.getBaseCellConfig(listedCell);
					var metaPath = this.getListedCellMetaPath(listedCell);
					Ext.apply(dataListedCell, {
						caption: captionCell.name,
						metaPath: metaPath,
						column: listedColumn
					});
					if (!Ext.isEmpty(listedCell.orderDirection)) {
						dataListedCell.orderDirection = listedCell.orderDirection;
						dataListedCell.orderPosition = listedCell.orderPosition;
					}
					cells.push(dataListedCell);
				}
				return [{
					row: 0,
					cells: cells
				}];
			},

			/**
			 * ########## ###### ####### ## ####### (### ####### #######).
			 * @protected
			 * @param {Object} profile
			 * @param {Boolean} isTiled
			 * @return {Array}
			 */
			getColumnsConfigFromProfile: function(profile, isTiled) {
				var dataCollection = [];
				if (!profile.tiledColumnsConfig && !profile.listedColumnsConfig) {
					profile.tiledColumnsConfig = "{}";
					profile.listedColumnsConfig = "{}";
					return dataCollection;
				}
				var gridsColumnsConfig = isTiled ? profile.tiledColumnsConfig : profile.listedColumnsConfig;
				if (gridsColumnsConfig) {
					var columnsConfig = Ext.decode(gridsColumnsConfig);
					if (isTiled) {
						dataCollection = this.generateTiledCollection(columnsConfig);
					} else if (columnsConfig.length > 0) {
						var captionsConfig = profile.captionsConfig;
						dataCollection = this.generateListedCollection(columnsConfig, captionsConfig);
					} else {
						return dataCollection;
					}
				}
				return dataCollection;
			},

			/**
			 * Returns grid row columns from columns config.
			 * @protected
			 * @param {Object} config Columns config.
			 * @param {Object[]} config.items Columns config array.
			 * @param {Number} rowIndex Row number.
			 * @return {Object[]} Row columns config.
			 */
			getGridRowColumns: function(config, rowIndex) {
				return Terrasoft.filter(config.items, function(column) {
					var position = column.position;
					return (position.row === rowIndex);
				}, this);
			},

			/**
			 * Initializes page title on top panel.
			 * @protected
			 */
			initHeaderCaption: function() {
				this.sandbox.publish("InitDataViews", {
					caption: this.get("Resources.Strings.PageCaption"),
					dataViews: false,
					hidePageCaption: true
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				this.initHeaderCaption();
			},

			/**
			 * Initializes column settings data collection.
			 * @protected
			 */
			initColumnsConfigDataCollection: function() {
				this.set("GridData", this.Ext.create("Terrasoft.BaseViewModelCollection"));
				var gridData = this.get("GridData");
				gridData.on("remove", this.onGridDataChanged, this);
				gridData.on("itemChanged", this.onGridDataChanged, this);
			},

			/**
			 * Initializes grid settings parameters.
			 * @protected
			 */
			initGridSettingsParams: function() {
				var gridSettingsInfo = this.sandbox.publish("GetGridSettingsInfo", null, [this.sandbox.id]);
				this.columnSettingModuleConfig = gridSettingsInfo.columnSettingModuleConfig || {};
				var customGridCaptionConfig = gridSettingsInfo.customGridCaptionConfig;
				if (!Ext.isEmpty(customGridCaptionConfig)) {
					this.set("CustomGridCaption", customGridCaptionConfig.caption);
					this.set("CustomGridCaptionStyle", customGridCaptionConfig.style);
				}
				this.schemaName = gridSettingsInfo.entitySchemaName;
				this.set("SchemaName", this.schemaName);
				this.entitySchema = gridSettingsInfo.entitySchema;
				this.isSingleTypeMode = gridSettingsInfo.isSingleTypeMode;
				this.set("IsSingleTypeMode", Boolean(this.isSingleTypeMode));
				this.baseGridType = gridSettingsInfo.baseGridType;
				this.profileKey = gridSettingsInfo.profileKey;
				this.propertyName = gridSettingsInfo.propertyName;
				this.set("IsVerticalGridSettings", this.propertyName &&
					this.propertyName.indexOf("VerticalProfile") >= 0);
				this.hideButtons = (gridSettingsInfo.hideButtons === true);
				this.hideGridType = (gridSettingsInfo.hideGridType === true);
				this.profile = gridSettingsInfo.profile || {};
				this.notFoundColumns = gridSettingsInfo.notFoundColumns;
				this.entityColumns = gridSettingsInfo.entityColumns;
				this.isNested = (gridSettingsInfo.isNested === true);
				this.useProfileField = (gridSettingsInfo.useProfileField === true);
				this.hideAllUsersSaveButton = (gridSettingsInfo.hideAllUsersSaveButton === true);
				this.isCardVisible = gridSettingsInfo.isCardVisible;
				if (Ext.isBoolean(gridSettingsInfo.useBackwards)) {
					this.useBackwards = gridSettingsInfo.useBackwards;
				}
				if (Ext.isBoolean(gridSettingsInfo.firstColumnsOnly)) {
					this.firstColumnsOnly = gridSettingsInfo.firstColumnsOnly;
				}
				this.dashboardSettings = gridSettingsInfo.dashboardSettings;
				var maxListedColumns = this.dashboardSettings ? 1000 : 24;
				this.set("MaxListedColumns", maxListedColumns);
				this._changeHistoryStateOnInit();
			},

			/**
			 * Column settings scroll change event handler.
			 * @protected
			 * @param {Number} scrollPosition Scroll position.
			 */
			onColumnSettingsScrollChange: function(scrollPosition) {
				this.set("ColumnSettingsHorizontalScrollValue", scrollPosition.left);
			},

			/**
			 * StructureExplorer configuration.
			 * @protected
			 * @virtual
			 * @returns {object}
			 */
			getStructureExplorerConfig: function() {
				return {
					schemaName: this.schemaName,
					excludeDataValueTypes: [
						this.Terrasoft.DataValueType.IMAGELOOKUP,
						this.Terrasoft.DataValueType.COLOR
					],
					useBackwards: this.useBackwards,
					firstColumnsOnly: this.firstColumnsOnly,
					autoHideMask: false,
					displayId: this.canDisplayPrimaryColumn
				};
			},

			//endregion

			//region Methods: Public

			/**
			 * After colspan changed event handler.
			 * @param {Number} colSpanCount Filled columns count.
			 * @param {Number} maxColumnsCount Max columns count.
			 */
			onAfterColspanChanged: Ext.emptyFn,

			/**
			 * ############ ####### ## ###### ######.
			 */
			cancelSettings: function() {
				this.sandbox.publish("BackHistoryState");
			},

			/**
			 * Returns true when grid settings columns is empty.
			 * @protected
			 * @return {boolean} True when grid settings columns is empty.
			 */
			isGridSettingsEmpty: function() {
				var profileData = this.getNewProfileData();
				var propertyName = this.getDataGridName();
				var gridConfig = propertyName ? profileData[propertyName] : profileData;
				var currentViewConfig = this.get("GridType") === this.Terrasoft.GridType.LISTED
					? this.Ext.decode(gridConfig.listedConfig)
					: this.Ext.decode(gridConfig.tiledConfig);
				return currentViewConfig && Ext.isEmpty(currentViewConfig.items);
			},

			/**
			 * Saves profile settings.
			 */
			saveSettings: function() {
				if (this.isGridSettingsEmpty()) {
					this.showConfirmationDialog(this.get("Resources.Strings.EmptyGridSettingsMsg"));
					return;
				}
				var profile = this.getNewProfileData();
				var saveConfig = this.sandbox.publish("SaveGridSettings", profile, [this.sandbox.id]);
				if (!saveConfig || Ext.isEmpty(saveConfig.saveProfile) || saveConfig.saveProfile) {
					var profileKey = this.currentObject.profileKey;
					Terrasoft.utils.saveUserProfile(profileKey, profile, false,
						this._afterSaveUserProfile.bind(this, profile, profileKey), this);
				} else {
					this.sandbox.publish("BackHistoryState");
				}
			},

			/**
			 * Handles grid data collection changed.
			 * @param {Terrasoft.BaseViewModel} [changedViewModel] Item change view model.
			 * @param {Object} [config] Item change event config.
			 * @param {Boolean} [reloadData] True when need reload data from database.
			 */
			onGridDataChanged: function(changedViewModel, config, reloadData) {
				var collection = this.get("GridData");
				if (this.get("GridType") === this.Terrasoft.GridType.LISTED) {
					var listedCollection = [];
					collection.each(function(item) {
						listedCollection.push(this._getBaseColumnConfigV3(item));
					}, this);
					listedCollection = [{
						cells: listedCollection
					}];
					this.listedDataCollection = listedCollection;
				} else {
					var dataCollection = [];
					collection.each(function(item) {
						var itemRow = item.get("row") || 0;
						var collectionRow = dataCollection[itemRow];
						if (!collectionRow) {
							while (!collectionRow) {
								dataCollection.push({cells: []});
								collectionRow = dataCollection[itemRow];
							}
						}
						collectionRow.cells.push(this._getBaseColumnConfigV3(item));
					}, this);
					this.dataCollection = dataCollection;
				}
				if (config && config.reloadData === false) {
					return;
				}
				this.showBodyMask({timeout: 0});
				this.gridDataChangeThrottle(reloadData);
			},

			/**
			 * @private
			 */
			_onAddClicked: function() {
				var config = this.getStructureExplorerConfig();
				this._openStructureExplorer(config, this.structureExplorerCallback, this.renderTo);
			},

			/**
			 * @private
			 */
			_findLastResizableItem: function() {
				const items = this.get("GridData").clone().sort("$column");
				const resizableItems = items.filterByFn(function(item) {
					return item.get("colSpan") > 1;
				}, this);
				return resizableItems.last();
			},

			/**
			 * Handles add button click.
			 */
			addButtonClick: function() {
				var items = this.get("GridData").clone().sort("$column");
				var lastItem = items.last();
				var shouldShift = this.get("GridType") === Terrasoft.GridType.LISTED &&
					lastItem && lastItem.get("colSpan") + lastItem.get("column") === this._getMaxColumns();
				if (shouldShift) {
					var neighbourItem = this._findLastResizableItem();
					if (neighbourItem) {
						var itemId = lastItem.get("itemId");
						this.addButtonClicked = "right";
						this.onAfterRightAddButtonClicked(itemId, neighbourItem);
					} else {
						var template = this.get("Resources.Strings.ColumlLimitExceededMessage");
						var message = Ext.String.format(template, this._getMaxColumns());
						Terrasoft.showInformation(message);
					}
				} else {
					this.addButtonClicked = "main";
					this._onAddClicked();
				}
			},

			/**
			 * Handles left add action item click.
			 * @param {String} itemId Edit item view model id.
			 * @param {Terrasoft.BaseViewModel} neighbourItem Left Neighbour Item.
			 */
			onAfterLeftAddButtonClicked: function(itemId, neighbourItem) {
				if (!itemId) {
					return;
				}
				var itemViewModel = this.get("GridData").get(itemId);
				this.internalPosition = {
					row: itemViewModel.get("row")
				};
				if (neighbourItem) {
					this.internalPosition.column = itemViewModel.get("column") === 0
						? 0
						: itemViewModel.get("column") - 1;
				} else {
					this.internalPosition.column = itemViewModel.get("column");
				}
				this.addButtonClicked = "left";
				this.neighbourItem = neighbourItem;
				this._onAddClicked();
			},

			/**
			 * Returns max columns value.
			 * @private
			 * @returns {Number} Max columns value.
			 */
			_getMaxColumns: function() {
				return this.get("GridType") === Terrasoft.GridType.TILED
					? this.get("MaxTiledColumns")
					: this.get("MaxListedColumns");
			},

			/**
			 * Handles left add action item click.
			 * @param {String} itemId Edit item view model id.
			 * @param {Terrasoft.BaseViewModel} neighbourItem Right Neighbour Item.
			 */
			onAfterRightAddButtonClicked: function(itemId, neighbourItem) {
				if (!itemId) {
					return;
				}
				var itemViewModel = this.get("GridData").get(itemId);
				this.neighbourItem = neighbourItem;
				this.internalPosition = {
					row: itemViewModel.get("row")
				};
				var maxColumns = this._getMaxColumns();
				if (itemViewModel.get("column") + itemViewModel.get("colSpan") === maxColumns) {
					this.internalPosition.column = maxColumns - 1;
				} else {
					this.internalPosition.column = itemViewModel.get("column") + itemViewModel.get("colSpan");
				}
				this.addButtonClicked = "right";
				this._onAddClicked();
			},

			/**
			 * Handler for ProfileChanged event.
			 * @protected
			 * @param {Boolean} reloadPreviewData Need reload grid settings preview data tag.
			 */
			reloadGridSettings: function(reloadPreviewData) {
				if (reloadPreviewData) {
					var gridData = this.getGridData();
					if (gridData) {
						gridData.clear();
					}
				}
				this.initGridSettingsParams();
				this.loadProfile(this.profile);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback) {
				this.showBodyMask({timeout: 0});
				this.sandbox.subscribe("ReloadGridSettings", this.reloadGridSettings, this);
				this.initHeaderCaption();
				this.initColumnsConfigDataCollection();
				this.callParent(arguments);
				this.initUserRights();
				this.initPreviewGridData();
				if (this.Ext.isEmpty(this.schemaName)) {
					this.initGridSettingsParams();
				}
				this.sandbox.subscribe("GetProfileData", function() {
					return this.getNewProfileData();
				}, this);
				this.getEntitySchemaWithDescriptor(this.schemaName, function(schema) {
					if (!this.schema) {
						this.schema = schema;
					}
				});
				if (this.isNested || this.useProfileField) {
					this.loadProfile(this.profile);
				} else {
					this.Terrasoft.require(["profile!" + this.profileKey], function(profile) {
						this.loadProfile(this.Terrasoft.deepClone(profile));
					}, this);
				}
				this.gridDataChangeThrottle = this._getGridDataChangeThrottle();
				this.useBackwards = Ext.isDefined(this.$UseBackwards)
					? this.$UseBackwards
					: this.useBackwards;
				if (callback) {
					callback.call(this);
				}
			},

			/**
			 * Initializes user rights.
			 */
			initUserRights: function() {
				RightUtilities.checkCanExecuteOperation({
					operation: "CanCreateDefaultGridSettings"
				}, function(result) {
					this.isSysAdmin = result;
					this.set("IsSysAdmin", result);
				}, this);
			},

			/**
			 * @inheritdoc
			 * Terrasoft.GridUtilities#onDataChanged
			 * @overridden
			 */
			onDataChanged: function() {
				this.hideBodyMask();
			},

			/**
			 * Returns root container dom attributes.
			 * @return {Object} Root container dom attributes.
			 */
			getRootContainerAttributes: function() {
				return {
					"active-type": this.get("GridType"),
					"vertical-grid-settings": this.get("IsVerticalGridSettings"),
					"schema-name": this.get("SchemaName")
				};
			},

			/**
			 * On grid type buttons click event handler.
			 */
			gridTypeClick: function() {
				var newType = arguments[3];
				if (this.get("GridType") === newType) {
					return;
				}
				this.set("GridType", newType);
				this._setGridDataByType(newType);
				this.reloadPreviewGridData(true);
			},

			/**
			 * Handles edit action item click.
			 * @param {String} itemId Edit item view model id.
			 */
			onEditItemClicked: function(itemId) {
				if (!itemId) {
					return;
				}
				this.currentItemViewModel = this.get("GridData").get(itemId);
				var config = this._getColumnSettingsConfig();
				ColumnSettingsUtilities.Open(this.sandbox, config, this.columnSettingsUtilitiesCallback,
					this.renderTo, this);
			},

			/**
			 * Returns save button menu items collection.
			 * @return {Terrasoft.BaseViewModelCollection} Save button menu items collection.
			 */
			getSaveButtonItems: function() {
				var saveBtnItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				if (this.get("IsSysAdmin") && !this.hideAllUsersSaveButton) {
					saveBtnItems.addItem(this.getButtonMenuItem({
						"Caption": this.get("Resources.Strings.SaveForAllButtonButtonCaption"),
						"Enabled": true,
						"Click": {bindTo: "saveSettingsForAllUsers"}
					}));
				}
				return saveBtnItems;
			},

			//endregion

			//region Methods: GridUtilitiesMixin

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getGridData
			 * @overridden
			 */
			getGridData: function() {
				return this.get("PreviewGridData");
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getRowCount
			 * @overridden
			 */
			getRowCount: function() {
				return this.get("GridType") === Terrasoft.GridType.TILED ? this._tiledRowCount : this._listedRowCount;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getDataGridName
			 * @overridden
			 */
			getDataGridName: function() {
				if (this.useProfileField === true) {
					return "";
				}
				const gridName = this.propertyName || this.mixins.GridUtilities.getDataGridName.apply(this, arguments);
				return gridName;
			},

			//endregion

			/**
			 * Grid after render event handler.
			 */
			onGridAfterrender: function() {
				if (this.isNotEmpty(this.profile)) {
					this.onGridDataChanged(null, {}, true);
				}
			},

			/**
			 * Returns custom grid caption wrapper attributes.
			 * @return {Object}
			 */
			getCustomGridCaptionAttributes: function() {
				return {
					"custom-style": this.get("CustomGridCaptionStyle")
				};
			},

			/**
			 * Gets preview caption.
			 * @return {String} Caption of the preview.
			 */
			getPreviewCaption: function() {
				var caption = this.get("Resources.Strings.PreViewCaption");
				var top = this.get("Resources.Strings.PreViewTop");
				return Ext.String.format("{0} ({1} {2})", caption, top, this.getRowCount());
			}
		},

		diff: [
			{
				"operation": "insert",
				"name": "RootContentWrapper",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["card-content-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ActionButtonsContainer",
				"parentName": "RootContentWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["actions-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "LeftContainer",
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-container-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "SaveButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {
						"textClass": "actions-button-margin-right",
						"wrapperClass": ["save-btn-textClass"]
					},
					"click": {"bindTo": "saveSettings"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"tag": "save",
					"markerValue": "SaveButton",
					"menu": {
						"items": {
							"bindTo": "getSaveButtonItems"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "DiscardChangesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "cancelSettings"}
				}
			},
			{
				"operation": "insert",
				"name": "RootContentContainer",
				"parentName": "RootContentWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"domAttributes": {"bindTo": "getRootContainerAttributes"},
					"wrapClass": ["grid-settings", "center-main-container"]
				}
			},
			{
				"operation": "insert",
				"parentName": "RootContentContainer",
				"propertyName": "items",
				"name": "RootDesignContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": []
				}
			},
			{
				"operation": "insert",
				"parentName": "RootDesignContainer",
				"propertyName": "items",
				"name": "TypeSelectConfigContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {
						"bindTo": "IsSingleTypeMode",
						"bindConfig": {
							"converter": function(value) {
								return !value;
							}
						}
					},
					"wrapClass": ["ts-box-sizing", "type-select-config"]
				}
			},
			{
				"operation": "insert",
				"name": "TiledConfigButton",
				"parentName": "TypeSelectConfigContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.TiledCaption"},
					"domAttributes": {"bindTo": "_getDomAttributes"},
					"click": {"bindTo": "gridTypeClick"},
					"tag": Terrasoft.GridType.TILED
				}
			},
			{
				"operation": "insert",
				"name": "ListedConfigButton",
				"parentName": "TypeSelectConfigContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ListedCaption"},
					"domAttributes": {"bindTo": "_getDomAttributes"},
					"click": {"bindTo": "gridTypeClick"},
					"tag": Terrasoft.GridType.LISTED
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsDesignContainer",
				"parentName": "RootDesignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["columns-design-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsDesignControl",
				"parentName": "ColumnsDesignContainer",
				"propertyName": "items",
				"values": {
					"id": "columnsSettings",
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.GridSettingsDesignerContainer",
					"controlConfig": {
						"gridType": {"bindTo": "GridType"},
						"maxColumns": {"bindTo": "MaxListedColumns"},
						"maxColumnsTiled": {"bindTo": "MaxTiledColumns"},
						"items": {"bindTo": "GridData"}
					},
					"scrollValueChanged": {"bindTo": "onColumnSettingsScrollChange"},
					"editItemClicked": {"bindTo": "onEditItemClicked"},
					"itemDblClick": {"bindTo": "onEditItemClicked"},
					"leftAddButtonClicked": {"bindTo": "onAfterLeftAddButtonClicked"},
					"rightAddButtonClicked": {"bindTo": "onAfterRightAddButtonClicked"}
				}
			},
			{
				"operation": "insert",
				"name": "AddButtonWrap",
				"parentName": "RootDesignContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["add-btn-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "AddButton",
				"parentName": "AddButtonWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {
						"textClass": ["columns-design-container-add-button", "unchosen-column"]
					},
					"click": {"bindTo": "addButtonClick"},
					"imageConfig": {"bindTo": "Resources.Images.AddColumnImg"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
				}
			},
			{
				"operation": "insert",
				"name": "DataContainer",
				"parentName": "RootContentWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["preview-data-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PreviewOvarlay",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["preview-overlay"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PreviewCaption",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "getPreviewCaption"},
					"classes": {
						"labelClass": ["preview-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CustomGridCaptionWrap",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["default-widget-header"],
					"domAttributes": {
						"bindTo": "getCustomGridCaptionAttributes"
					},
					"visible": {
						"bindTo": "CustomGridCaption",
						"bindConfig": {
							"converter": function(value) {
								return !Ext.isEmpty(value);
							}
						}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CustomGridCaption",
				"parentName": "CustomGridCaptionWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "CustomGridCaption"},
					"classes": {
						"labelClass": ["default-widget-header-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "DataGridWrapper",
				"parentName": "DataContainer",
				"propertyName": "items",
				"values": {
					"wrapClass": ["data-grid-wrapper"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DataGrid",
				"parentName": "DataGridWrapper",
				"propertyName": "items",
				"values": {
					"safeBind": true,
					"itemType": Terrasoft.ViewItemType.GRID,
					"type": Terrasoft.GridType.LISTED,
					"className": "Terrasoft.BaseViewGrid",
					"listedGridHtmlGeneratorClassName": "Terrasoft.InnerListedGridHtmlGenerator",
					"listedZebra": true,
					"collection": {"bindTo": "PreviewGridData"},
					"isEmpty": {"bindTo": "IsGridEmpty"},
					"isLoading": {"bindTo": "IsGridLoading"},
					"afterrender": {
						"bindTo": "onGridAfterrender"
					},
					"horizontalScrollValue": {"bindTo": "ColumnSettingsHorizontalScrollValue"}
				}
			}
		]
	};
});

define("GridSettingsPage", ["SSPGridMixin"], function() {
	return {

		mixins: {
			/**
			 * Provides methods for grid handling in ssp sections.
			 */
			"SSPGridMixin": "Terrasoft.SSPGridMixin"
		},

		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.GridSettingsPage#initGridSettingsParams
			 * @overridden
			 */
			initGridSettingsParams: function() {
				this.callParent(arguments);
				if (this.Terrasoft.isCurrentUserSsp()) {
					let gridSettingsInfo = this.sandbox.publish("GetGridSettingsInfo", null, [this.sandbox.id]);
					if (!this.Ext.isEmpty(gridSettingsInfo) && this.getIsFeatureEnabled("PortalColumnConfig")) {
						this.applyPortalGridSettingsInfo(gridSettingsInfo);
						this.useBackwards = gridSettingsInfo.useBackwards;
						this.firstColumnsOnly = gridSettingsInfo.firstColumnsOnly;
					}
				}
			}

			// endregion

		},
		diff: []
	};
});


