Terrasoft.configuration.Structures["DuplicatesPageV2"] = {innerHierarchyStack: ["DuplicatesPageV2"], structureParent: "BasePageV2"};
define('DuplicatesPageV2Structure', ['DuplicatesPageV2Resources'], function(resources) {return {schemaUId:'3bb66e30-50a3-4707-bbeb-5b9b13316887',schemaCaption: "Duplicates", parentSchemaName: "BasePageV2", schemaName:'DuplicatesPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DuplicatesPageV2", [
			"AcademyUtilities", "SchemaBuilderV2", "ViewGeneratorV2", "ServiceHelper", "DefaultProfileHelper",
			"DuplicatesPageV2Resources", "DuplicatesMergeHelper", "GridUtilitiesV2", "MultilineLabel",
			"DuplicatesDetailModuleV2", "ImageCustomGeneratorV2", "css!MultilineLabel", "css!DeduplicationModuleCSS",
			"css!SectionModuleV2", "DeduplicationStorage"
		],
		function(AcademyUtilities, SchemaBuilder, ViewGenerator, ServiceHelper, DefaultProfileHelper) {
			return {
				entitySchemaName: "DuplicatesRule",
				mixins: {
					GridUtilities: "Terrasoft.GridUtilities",
					DuplicatesMergeHelper: "Terrasoft.DuplicatesMergeHelper"
				},
				attributes: {
					/**
					 * Collection of the duplicate items groups.
					 */
					"DuplicatesContainerItems": {
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"dataValueType": Terrasoft.DataValueType.COLLECTION,
						"isCollection": true,
						"value": Ext.create("Terrasoft.BaseViewModelCollection")
					},
					/**
					 * Collection of the duplicate hidden items groups.
					 */
					"DuplicatesContainerHiddenItems": {
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"dataValueType": Terrasoft.DataValueType.COLLECTION,
						"value": Ext.create("Terrasoft.Collection")
					},
					/**
					 * Text of the header lable.
					 */
					"HeaderLabelCaption": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Text of the information container title.
					 */
					"InfoLabelTitleCaption": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Text of the information container description.
					 */
					"InfoLabelDescriptionCaption": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Name of the duplicates schema.
					 */
					"DuplicatesSchemaName": {
						"value": "",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Grid profile.
					 */
					"GridProfile": {
						"value": null,
						"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Sign of an empty duplicates collection.
					 */
					"IsDuplicatesContainerItemsEmpty": {
						"value": false,
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"dependencies": [
							{
								"columns": ["IsSearchInProcess"],
								"methodName": "onIsSearchInProcessChanged"
							}
						]
					},
					/**
					 * Offset of the next duplicates group to be loaded.
					 */
					"NextDuplicatesGroupOffset": {
						"value": 0,
						"dataValueType": Terrasoft.DataValueType.INTEGER,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Last date of the duplicates search.
					 */
					"LastDuplicatesSearchRun": {
						"dataValueType": Terrasoft.DataValueType.DATE_TIME,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/**
					 * Indicates that the search of duplicates is in process.
					 */
					"IsSearchInProcess": {
						"value": false,
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Load duplicates row count per page.
					 * @protected
					 */
					"DuplicatesPageRowCount": {
						"value": 50,
						"dataValueType": Terrasoft.DataValueType.INTEGER
					}
				},
				messages: {
					"GetConfig": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"GetGridData": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"HideDetail": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetGridSettingsInfo
					 * Returns informations of grid settings.
					 * @return {Object} informations of grid settings.
					 */
					"GetGridSettingsInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GridSettingsChanged
					 * Informs about changing grid settings.
					 */
					"GridSettingsChanged": {
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
						mode: Terrasoft.MessageMode.PTP
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BasePageV2#getPageHeaderCaption
					 * @overridden
					 */
					getPageHeaderCaption: function() {
						return this.getHeader();
					},
					/**
					 * Initialize the name of the schema of duplicates.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					initDuplicatesSchemaName: function(callback, scope) {
						var historyState = this.getHistoryStateInfo();
						var schemaName = historyState.operation;
						this.set("DuplicatesSchemaName", schemaName);
						if (callback) {
							callback.call(scope || this);
						}
					},

					/**
					 * Returns the name of the schema of duplicates.
					 * @returns {String} Name of the schema.
					 */
					getDuplicatesSchemaName: function() {
						if (!this.get("DuplicatesSchemaName")) {
							this.initDuplicatesSchemaName();
						}
						return this.get("DuplicatesSchemaName");
					},

					/**
					 * IsSearchInProcess changed handler.
					 */
					onIsSearchInProcessChanged: function() {
						if (this.get("IsSearchInProcess") === true) {
							this.set("IsDuplicatesContainerItemsEmpty", true);
						}
					},

					/**
					 * Loads elastic search deduplication results.
					 * @protected
					 */
					getBulkESDeduplicationResults: function() {
						if (this.get("NextDuplicatesGroupOffset") < 0) {
							return;
						}
						this.showBodyMask();
						var config = {
							"entityName": this.getDuplicatesSchemaName(),
							"columns": this.getDuplicatesColumns(),
							"offset": this.$NextDuplicatesGroupOffset,
							"count": this.$DuplicatesPageRowCount
						};
						Terrasoft.DeduplicationStorage.getDeduplicationResults(config, function(result) {
							if (result.allDownloaded) {
								result.nextOffset = -1;
							}
							this._processDeduplicationResults(result);
						}, this);
					},

					/**
					 * Get deduplication results callback.
					 * @private
					 */
					_processDeduplicationResults: function(result) {
						this.hideBodyMask();
						this.set("NextDuplicatesGroupOffset", result.nextOffset);
						var groups = result.groups || [];
						if (Ext.isEmpty(groups) === false) {
							this.prepareRowConfig(result.rowConfig);
							this.loadDuplicatesDetails(groups, result.rowConfig);
						}
						var duplicatesContainerItems = this.get("DuplicatesContainerItems");
						var isEmpty = duplicatesContainerItems.getCount() === 0;
						this.set("IsDuplicatesContainerItemsEmpty", isEmpty);
					},

					/**
					 * Loads a collection of groups of duplicates.
					 */
					getDeduplicationResults: function() {
						if (this._isBulkESDeduplicationEnabled()) {
							this.getBulkESDeduplicationResults();
							return;
						}
						if (this.get("IsSearchInProcess")) {
							return;
						}
						var allGroupsLoaded = this.get("NextDuplicatesGroupOffset") < 0;
						if (allGroupsLoaded) {
							return;
						}
						var entitySchemaName = this.getDuplicatesSchemaName();
						var columns = this.getDuplicatesColumns();
						var config = {
							"schemaName": entitySchemaName,
							"columns": columns,
							"offset": this.get("NextDuplicatesGroupOffset")
						};
						this.callDeduplicationServiceMethod("GetDeduplicationResults",
								this.getDeduplicationResultsCallback, config);
					},

					/**
					 * Handle response from the GetDeduplicationResults method of DeduplicationService service.
					 * @param {Object} response Service response.
					 */
					getDeduplicationResultsCallback: function(response) {
						response = response || {};
						var responseResult = response.GetDeduplicationResultsResult;
						var parsedResult = JSON.parse(responseResult);
						this._processDeduplicationResults(parsedResult);
					},

					/**
					 * Run procedure search duplicate entity.
					 */
					findEntityDuplicates: function() {
						if (this.$IsDuplicatesContainerItemsEmpty) {
							this.findEntityDuplicatesAsync();
							return false;
						}
						var config = {
							style: Terrasoft.MessageBoxStyles.BLUE
						};
						this.showConfirmationDialog(this.get("Resources.Strings.ConfirmationRunDeduplicationMessage"),
								function(returnCode) {
									if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
										this.findEntityDuplicatesAsync();
									}
								}, ["yes", "no"], config);
						return false;
					},

					/**
					 * Find elastic search duplicates.
					 * @protected
					 */
					findBulkESDeduplicationEntities: function() {
						var config = {
							"entityName": this.getDuplicatesSchemaName()
						};
						this.callDeduplicationServiceMethod("FindDuplicateEntities", function(response) {
							if (response && response.success) {
								return;
							}
							this._showErrorDeduplicationMessage(this.get("Resources.Strings.CommonErrorMessage"));
						}, config);
					},

					/**
					 * @private
					 */
					_showErrorDeduplicationMessage: function(messageText) {
						var messageConfig = {
							caption: messageText,
							buttons: ["ok"],
							defaultButton: 0,
							style: Terrasoft.MessageBoxStyles.BLUE
						};
						Terrasoft.utils.showMessage(messageConfig);
					},

					/**
					 * Call FindEntityDuplicatesAsync method of deduplication service.
					 */
					findEntityDuplicatesAsync: function() {
						this.set("IsSearchInProcess", true);
						this.hideItems();
						if (this._isBulkESDeduplicationEnabled()) {
							this.findBulkESDeduplicationEntities();
							return;
						}
						var entitySchemaName = this.getDuplicatesSchemaName();
						var config = {
							"schemaName": entitySchemaName
						};
						this.callDeduplicationServiceMethod("FindEntityDuplicatesAsync", function(response) {
							if (response) {
								var responseResult = response.FindEntityDuplicatesAsyncResult;
								if (Ext.isEmpty(responseResult) === false) {
									if (responseResult.success === false) {
										this._showErrorDeduplicationMessage(responseResult.message);
									}
								}
							}
						}, config);
					},

					/**
					 * Call method of deduplication service.
					 * @param {String} methodName Name of method.
					 * @param {Function} callback Callback function.
					 * @param {Object} config Additional parameters.
					 */
					callDeduplicationServiceMethod: function(methodName, callback, config) {
						var serviceName = this._isBulkESDeduplicationEnabled()
							? "BulkDeduplicationService"
							: "DeduplicationService";
						ServiceHelper.callService(serviceName, methodName, callback, config, this);
					},

					/**
					 * Loads group of duplicates to the Terrasoft.DuplicatesDetailModule.
					 * @param {String} id Unique module identifier.
					 * @param {Terrasoft.BaseViewModel} rootItem Root item of duplicates group.
					 * @param {Terrasoft.BaseViewModelCollection} rows List of duplicates.
					 */
					loadDuplicatesDetailModule: function(id, rootItem, rows) {
						var primaryDisplayColumnName = rootItem.entitySchema.primaryDisplayColumnName;
						var itemName = rootItem.get(primaryDisplayColumnName);
						var detailId = "DuplicatesDetailModule" + id;
						var containerId = "DuplicatesPageV2DuplicateContainerContainer-" + id + "-listItem";
						var sandbox = this.sandbox;
						sandbox.loadModule("DuplicatesDetailModuleV2", {
							renderTo: containerId,
							id: detailId
						});
						sandbox.subscribe("GetConfig", function() {
							var profile = this.get("GridProfile");
							return {
								caption: itemName,
								groupId: id,
								gridConfig: profile.listedConfig,
								entitySchemaName: this.getDuplicatesSchemaName()
							};
						}, this, [detailId]);
						sandbox.subscribe("GetGridData", function() {
							return rows;
						}, this, [detailId]);
						sandbox.subscribe("HideDetail", function() {
							this.hideItem(id);
						}, this, [detailId]);
					},

					/**
					 * Moves identifier of item to hidden items collection, enable IsDuplicatesContainerItemsEmpty flag
					 * when all items are hidden.
					 * @param {String} key Identifier of item.
					 */
					hideItem: function(key) {
						var items = this.get("DuplicatesContainerItems");
						var hiddenItems = this.get("DuplicatesContainerHiddenItems");
						hiddenItems.add(key);
						var difference = Ext.Array.difference(items.getKeys(), hiddenItems.getItems());
						var differenceLength = difference.length;
						var amountToStartLoading = 6;
						if (differenceLength === amountToStartLoading) {
							this.getDeduplicationResults();
						} else {
							if (differenceLength === 0) {
								this.set("IsDuplicatesContainerItemsEmpty", true);
							}
						}
					},

					/**
					 * Clear collection of content items.
					 */
					hideItems: function() {
						var items = this.get("DuplicatesContainerItems");
						items.clear();
						this.set("IsDuplicatesContainerItemsEmpty", true);
						this.initInfoLabelCaption();
					},

					/**
					 * Loads groups of duplicates on page.
					 * @param {Array} groups List of duplicate groups.
					 * @param {Object} rowConfig Columns configuration.
					 */
					loadDuplicatesDetails: function(groups, rowConfig) {
						var items = Ext.create("Terrasoft.Collection");
						Terrasoft.each(groups, function(group) {
							var groupId = group.groupId.toString();
							var entityCollection = this.groupOfDuplicatesToViewModelCollection(group.rows, rowConfig);
							if (!entityCollection.isEmpty()) {
								var item = this.createGroupOfDublicates(groupId, entityCollection);
								items.add(groupId, item);
							}
						}, this);
						var duplicatesContainerItems = this.get("DuplicatesContainerItems");
						duplicatesContainerItems.loadAll(items);
					},

					/**
					 * Creates group of duplicates.
					 * @param {String} groupId Group identifier.
					 * @param {Terrasoft.BaseViewModelCollection} entityCollection List of duplicates.
					 * @returns {Terrasoft.BaseViewModel} Root item attached to the duplicates group.
					 */
					createGroupOfDublicates: function(groupId, entityCollection) {
						this.prepareResponseCollection(entityCollection);
						var rootItem = entityCollection.getByIndex(0);
						rootItem.set("DuplicatesGroupId", groupId);
						rootItem.addEvents("itemContainerRendered");
						rootItem.onItemContainerRendered = function() {
							this.fireEvent("itemContainerRendered", this);
						}.bind(rootItem);
						rootItem.on("itemContainerRendered", function() {
							this.loadDuplicatesDetailModule(groupId, rootItem, entityCollection);
						}, this);
						return rootItem;
					},

					/**
					 * Converts array of rows to Terrasoft.BaseViewModelCollection.
					 * @param {Array} rows.
					 * @param {Object} rowConfig.
					 * @returns {Terrasoft.BaseViewModelCollection}.
					 */
					groupOfDuplicatesToViewModelCollection: function(rows, rowConfig) {
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: this.getDuplicatesSchemaName(),
							rootSchema: this.entitySchema,
							rowViewModelClassName: "Terrasoft.BaseGridRowViewModel"
						});
						var responseData = {
							success: true,
							rowsAffected: rows.length,
							rows: rows,
							rowConfig: rowConfig
						};
						var entityCollection = null;
						esq.parseResponse(responseData, function(result) {
							entityCollection = result.collection;
						}, this);
						return entityCollection;
					},

					/**
					 * Adds the necessary parameters in the columns configuration.
					 * @param {Object} rowConfig Columns configuration.
					 */
					prepareRowConfig: function(rowConfig) {
						var columns = this.getProfileColumns();
						Terrasoft.each(columns, function(item, key) {
							rowConfig[key].columnPath = item.path;
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getProfileColumns
					 * @overridden
					 */
					getProfileColumns: function() {
						var profileColumns = {};
						var profile = this.get("GridProfile");
						this.convertProfileColumns(profileColumns, profile);
						return profileColumns;
					},

					/**
					 * Returns columns list of duplicates detail.
					 * @returns {Array} Columns list.
					 */
					getDuplicatesColumns: function() {
						var profileColumns = this.getProfileColumns();
						var columns = [];
						Terrasoft.each(profileColumns, function(column, columnName) {
							if (columnName !== this.entitySchema.primaryColumnName) {
								columns.push(columnName);
							}
						}, this);
						var primaryDisplayColumnName = this.entitySchema.primaryDisplayColumnName;
						if (Ext.Array.contains(columns, primaryDisplayColumnName) === false) {
							columns.push(primaryDisplayColumnName);
						}
						return columns;
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#init
					 * @overridden
					 */
					init: function(callback) {
						this.callParent([
							function() {
								var previewItems = this.get("DuplicatesContainerItems");
								previewItems.clear();
								var hiddenItems = this.get("DuplicatesContainerHiddenItems");
								hiddenItems.clear();
								Terrasoft.chain(
										this.initDuplicatesSchemaName,
										this.initDuplicatesSearchInfo,
										this.initializeSchema,
										this.initProfile,
										this.initInfoLabelCaption,
										callback,
										this
								);
							}, this
						]);
					},

					/**
					 * @private
					 */
					_getBulkESDeduplicationInfo: function(callback, scope) {
						var config = {
							"entityName": this.getDuplicatesSchemaName()
						};
						this.callDeduplicationServiceMethod("GetDeduplicationInfo", function(response) {
							var info = response && response.deduplicationInfo || {};
							this.set("LastDuplicatesSearchRun", Boolean(info.isFirstRun));
							this.set("IsSearchInProcess", Boolean(info.isRunning));
							Ext.callback(callback, scope || this);
						}, config);
					},

					/**
					 * @private
					 */
					_isBulkESDeduplicationEnabled: function (){
						return this.getIsFeatureEnabled("BulkESDeduplication");
					},

					/**
					 * Initialize information of the duplicates search process.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					initDuplicatesSearchInfo: function(callback, scope) {
						if (this._isBulkESDeduplicationEnabled()) {
							this._getBulkESDeduplicationInfo(callback, scope);
							return;
						}
						var config = {
							"schemaName": this.getDuplicatesSchemaName()
						};
						this.callDeduplicationServiceMethod("GetSearchInfo", function(response) {
							var searchInfoResult = null;
							var searchInProgress = false;
							if (response && response.GetSearchInfoResult) {
								var responseResult = response.GetSearchInfoResult.response;
								if (!Ext.isEmpty(responseResult)) {
									var searchInfo = this.mixins.DuplicatesMergeHelper.dictionaryToObject(responseResult);
									searchInfoResult = searchInfo.LastExecutionDate;
									searchInProgress = JSON.parse(searchInfo.IsInProgress);
								}
							}
							this.set("LastDuplicatesSearchRun", searchInfoResult);
							this.set("IsSearchInProcess", searchInProgress);
							callback.call(scope || this);
						}, config);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#onRender
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						if (this.get("GridSettingsChanged") === true) {
							this.set("NextDuplicatesGroupOffset", 0);
							this.Terrasoft.chain(
								this.initProfile,
								this.getDeduplicationResults,
								this
							);
							return;
						}
						this.getDeduplicationResults();
					},

					/**
					 * Initialize entity schema.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					initializeSchema: function(callback, scope) {
						var schemaName = this.getDuplicatesSchemaName();
						Terrasoft.require([schemaName], function(response) {
							this.entitySchemaName = response.name;
							this.entitySchema = response;
							callback.call(scope || this);
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getProfileKey
					 * @overridden
					 */
					getProfileKey: function() {
						var schemaName = this.getDuplicatesSchemaName();
						var profileKey = schemaName + "DuplicatesPageV2DuplicatesDetailV2DataGrid";
						return profileKey;
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#getGridData
					 * @overridden
					 */
					getGridData: function() {
						return this.get("DuplicatesContainerItems");
					},

					/**
					 * Initialize columns list of duplicates detail.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					initProfile: function(callback, scope) {
						var profileKey = this.getProfileKey();
						SchemaBuilder.getProfile(profileKey, function(profile) {
							profile = Ext.Object.isEmpty(profile)
								? DefaultProfileHelper.getEntityProfile(profileKey, this.entitySchemaName,
									this.Terrasoft.GridType.LISTED)
								: profile;
							profile = profile.DataGrid || profile;
							var listedConfig = JSON.parse(profile.listedConfig);
							profile.isTiled = false;
							listedConfig.captionsConfig = ViewGenerator.generateGridCaptionsConfig(listedConfig.items);
							listedConfig.columnsConfig = ViewGenerator.generateGridRowConfig(profile, listedConfig.items);
							ViewGenerator.addLinks(listedConfig, false, this.entitySchema);
							profile.listedConfig = JSON.stringify(listedConfig);
							this.set("GridProfile", profile);
							callback.call(scope || this);
						}, this);
					},

					/**
					 * Returns find duplicates button caption.
					 * @returns {String} Find duplicates button caption.
					 */
					getFindDuplicateBtnCaption: function() {
						const moduleCaption = this._getModuleCaption();
						const pattern = this.get("Resources.Strings.FindDuplicatesButtonCaptionPattern");
						return Ext.String.format(pattern, moduleCaption);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getActions
					 * @overridden
					 */
					getActions: function() {
						const actionMenuItems = this.callParent(arguments);
						actionMenuItems.clear();
						actionMenuItems.addItem(this.getButtonMenuItem({
							Caption: {bindTo: "getFindDuplicateBtnCaption"},
							Tag: "findEntityDuplicates"
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							Caption: {bindTo: "Resources.Strings.DuplicatesRulesSetupCaption"},
							Tag: "duplicatesRulesSetup"
						}));
						return actionMenuItems;
					},

					/**
					 * Navigates to section of setting rules of doubles.
					 */
					duplicatesRulesSetup: function() {
						this.sandbox.publish("PushHistoryState", {hash: "SectionModuleV2/DuplicatesRuleSectionV2"});
					},

					/**
					 * @inheritdoc Terrasoft.ProcessEntryPointUtilities#initRunProcessButtonMenu
					 * @overridden
					 */
					initRunProcessButtonMenu: Ext.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getViewOptionsButtonVisible
					 * @overridden
					 */
					getViewOptionsButtonVisible: function() {
						return true;
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#addSectionDesignerViewOptions
					 * @protected
					 * @overridden
					 */
					addSectionDesignerViewOptions: Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getHeader
					 * @overridden
					 */
					getHeader: function() {
						const moduleCaption = this._getModuleCaption();
						const pageHeaderMask = this.get("Resources.Strings.PageHeaderMask");
						return Ext.String.format(pageHeaderMask, moduleCaption);
					},

					/**
					 * @return {String}
					 * @private
					 */
					_getModuleCaption: function() {
						const schemaName = this.getDuplicatesSchemaName();
						const moduleStructure = this.getModuleStructure(schemaName) || {};
						return moduleStructure.moduleCaption;
					},

					/**
					 * Returns localizable string name for header.
					 * @returns {String} Localizable string name.
					 */
					getHeaderLocalizableStringName: function() {
						const schemaName = this.getDuplicatesSchemaName();
						return Ext.String.format("Resources.Strings.{0}HeaderCaption", schemaName);
					},

					/**
					 * Initialize text of InfoLabel.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					initInfoLabelCaption: function(callback, scope) {
						var titleName = this.getInfoTitleLabelLocalizableStringName();
						var descriptionName = this.getInfoDescriptionLabelLocalizableStringName();
						var title = this.get(titleName);
						var description = this.get(descriptionName);
						this.set("InfoLabelTitleCaption", title);
						this.set("InfoLabelDescriptionCaption", description);
						if (callback) {
							callback.call(scope || this);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#getViewOptions
					 * @overridden
					 */
					getViewOptions: function() {
						var viewOptions = this.callParent(arguments);
						viewOptions.addItem(this.getButtonMenuItem({
							"Caption": {"bindTo": "Resources.Strings.OpenListSettingsCaption"},
							"Click": {"bindTo": "openGridSettings"},
							"Visible": true,
							"ImageConfig": this.get("Resources.Images.GridSettingsIcon")
						}));
						return viewOptions;
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridSettingsInfo
					 * @overridden
					 */
					getGridSettingsInfo: function() {
						var gridSettingsInfo = this.mixins.GridUtilities.getGridSettingsInfo.call(this);
						gridSettingsInfo.baseGridType = this.Terrasoft.GridType.LISTED;
						gridSettingsInfo.isSingleTypeMode = true;
						return gridSettingsInfo;
					},

					/**
					 * Returns localizable string name for info description label.
					 * @returns {String} Localizable string name.
					 */
					getInfoDescriptionLabelLocalizableStringName: function() {
						var searchInProcess = this.get("IsSearchInProcess");
						var prefix = "SearchInProcess";
						if (searchInProcess === false) {
							var lastRun = this.get("LastDuplicatesSearchRun");
							var isFirstRun = Ext.isEmpty(lastRun);
							prefix = "FirstRun";
							if (isFirstRun === false) {
								prefix = "Empty";
							}
						}
						return Ext.String.format("Resources.Strings.{0}InfoDescriptionLabelCaption", prefix);
					},

					/**
					 * Returns localizable string name for info title label.
					 * @returns {String} Localizable string name.
					 */
					getInfoTitleLabelLocalizableStringName: function() {
						var searchInProcess = this.get("IsSearchInProcess");
						var prefix = "SearchInProcess";
						var schemaName = "";
						if (searchInProcess === false) {
							var lastRun = this.get("LastDuplicatesSearchRun");
							var isFirstRun = Ext.isEmpty(lastRun);
							prefix = "FirstRun";
							if (isFirstRun === false) {
								schemaName = this.getDuplicatesSchemaName();
								prefix = "Empty";
							}
						}
						return Ext.String.format("Resources.Strings.{0}{1}InfoTitleLabelCaption", schemaName, prefix);
					},

					/**
					 * @inheritDoc Terrasoft.BasePageV2#changeSelectedSideBarMenu
					 * @overriden
					 */
					changeSelectedSideBarMenu: function() {
						var moduleName = this.getDuplicatesSchemaName();
						var moduleConfig = Terrasoft.configuration.ModuleStructure[moduleName];
						if (moduleConfig) {
							var sectionSchema = moduleConfig.sectionSchema;
							var config = moduleConfig.sectionModule + "/";
							if (sectionSchema) {
								config += moduleConfig.sectionSchema + "/";
							}
							this.sandbox.publish("SelectedSideBarItemChanged", config, ["sectionMenuModule"]);
						}
					},

					/**
					 * DuplicatesContainer scroll handler.
					 */
					onLoadNext: function() {
						this.getDeduplicationResults();
					},

					/**
					 * Returns url of info content image.
					 * @returns {String} Image url.
					 */
					getInfoContentImage: function() {
						var lastRun = this.get("LastDuplicatesSearchRun");
						var searchInProcess = this.get("IsSearchInProcess");
						var imageSource;
						if (searchInProcess) {
							imageSource = this.get("Resources.Images.SearchInProcessImage");
						} else if (Ext.isEmpty(lastRun)) {
							imageSource = this.get("Resources.Images.FirstRunImage");
						} else {
							imageSource = this.get("Resources.Images.ItemsIsEmptyImage");
						}
						return Terrasoft.ImageUrlBuilder.getUrl(imageSource);
					},

					/**
					 * Returns data-item-marker value for info content.
					 * @returns {String} data-item-marker value.
					 */
					getInfoContentMarkerValue: function() {
						var lastRun = this.get("LastDuplicatesSearchRun");
						var searchInProcess = this.get("IsSearchInProcess");
						var marker;
						if (searchInProcess) {
							marker = this.get("Resources.Strings.SearchInProcessMarker");
						} else if (Ext.isEmpty(lastRun)) {
							marker = this.get("Resources.Strings.FirstRunMarker");
						} else {
							marker = this.get("Resources.Strings.ItemsIsEmptyMarker");
						}
						return marker;
					},

					/**
					 * @inheritdoc
					 * @override Terrasoft.GridUtilities#getGridSettingsModuleConfig
					 */
					getGridSettingsModuleConfig: function(gridSettingsId) {
						return {
							renderTo: "centerPanel",
							id: gridSettingsId,
							keepAlive: true,
							instanceConfig: {
								schemaName: "GridSettingsPage",
								isSchemaConfigInitialized: true,
								parameters: {
									viewModelConfig: {
										UseBackwards: false
									}
								}
							}
						};
					}
				},

				diff: /**SCHEMA_DIFF*/
						[
							{
								"operation": "merge",
								"name": "CardContentWrapper",
								"values": {
									"wrapClass": ["card-content-container", "duplicates-content-wrap"]
								}
							},
							{
								"operation": "merge",
								"name": "CardContentContainer",
								"values": {
									"wrapClass": ["center-main-container duplicates-card-content-container"]
								}
							},
							{
								"operation": "remove",
								"name": "actions"
							},
							{
								"operation": "insert",
								"parentName": "LeftContainer",
								"propertyName": "items",
								"name": "actions",
								"values": {
									"itemType": Terrasoft.ViewItemType.BUTTON,
									"caption": {"bindTo": "Resources.Strings.ActionButtonCaption"},
									"classes": {
										"textClass": ["actions-button-margin-right"],
										"wrapperClass": ["actions-button-margin-right"]
									},
									"menu": {
										"items": {"bindTo": "ActionsButtonMenuItems"}
									},
									"visible": {"bindTo": "ActionsButtonVisible"}
								}
							},
							{
								"operation": "remove",
								"name": "HeaderContainer"
							},
							{
								"operation": "insert",
								"name": "InfoContentContainer",
								"parentName": "CardContentContainer",
								"propertyName": "items",
								"values": {
									"classes": {
										"wrapClassName": ["empty-grid-message"]
									},
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"markerValue": {"bindTo": "getInfoContentMarkerValue"},
									"visible": {"bindTo": "IsDuplicatesContainerItemsEmpty"},
									"items": []
								}
							},
							{
								"operation": "insert",
								"name": "InfoImageContainer",
								"parentName": "InfoContentContainer",
								"propertyName": "items",
								"values": {
									"classes": {
										"wrapClass": ["image-container"]
									},
									"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
									"onPhotoChange": Terrasoft.emptyFn,
									"getSrcMethod": "getInfoContentImage",
									"visible": {"bindTo": "IsDuplicatesContainerItemsEmpty"},
									"items": []
								}
							},
							{
								"operation": "insert",
								"name": "InfoTitleLabelContainer",
								"parentName": "InfoContentContainer",
								"propertyName": "items",
								"values": {
									"classes": {
										"wrapClassName": ["title"]
									},
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"visible": {"bindTo": "IsDuplicatesContainerItemsEmpty"},
									"items": []
								}
							},
							{
								"operation": "insert",
								"name": "InfoDescriptionLabelContainer",
								"parentName": "InfoContentContainer",
								"propertyName": "items",
								"values": {
									"classes": {
										"wrapClassName": ["description"]
									},
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"visible": {"bindTo": "IsDuplicatesContainerItemsEmpty"},
									"items": []
								}
							},
							{
								"operation": "insert",
								"name": "InfoTitleLabel",
								"parentName": "InfoTitleLabelContainer",
								"propertyName": "items",
								"values": {
									"itemType": Terrasoft.ViewItemType.LABEL,
									"classes": {
										"labelClass": ["t-label"]
									},
									"caption": {"bindTo": "InfoLabelTitleCaption"}
								}
							},
							{
								"operation": "insert",
								"name": "InfoDescriptionLabel",
								"parentName": "InfoDescriptionLabelContainer",
								"propertyName": "items",
								"values": {
									"itemType": Terrasoft.ViewItemType.LABEL,
									"classes": {
										"labelClass": ["t-label"]
									},
									"caption": {"bindTo": "InfoLabelDescriptionCaption"}
								}
							},
							{
								"operation": "insert",
								"name": "InfoDescriptionRunBtn",
								"parentName": "InfoDescriptionLabelContainer",
								"propertyName": "items",
								"values": {
									"itemType": Terrasoft.ViewItemType.HYPERLINK,
									"click": {"bindTo": "findEntityDuplicates"},
									"caption": {"bindTo": "getFindDuplicateBtnCaption"},
									"visible": {
										"bindTo": "IsSearchInProcess",
										"bindConfig": {
											"converter": function(value) {
												var inProcess = value || false;
												return !inProcess;
											}
										}
									}
								}
							},
							{
								"operation": "insert",
								"name": "DuplicatesContainer",
								"parentName": "CardContentContainer",
								"propertyName": "items",
								"values": {
									"idProperty": "DuplicatesGroupId",
									"collection": {"bindTo": "DuplicatesContainerItems"},
									"generator": "ContainerListGenerator.generatePartial",
									"maskVisible": {"bindTo": "IsPreviewItemsLoading"},
									"selectableRowCss": "duplicates-container-item",
									"itemType": Terrasoft.ViewItemType.GRID,
									"classes": {wrapClassName: ["content-preview-block-container content-container-wrapClass"]},
									"itemPrefix": "listItem",
									"observableRowNumber": 1,
									"observableRowVisible": {"bindTo": "onLoadNext"},
									"itemConfig": [
										{
											"name": "DuplicateContainer",
											"itemType": Terrasoft.ViewItemType.CONTAINER,
											"classes": {wrapClassName: ["ts-controlgroup control-group-margin-bottom"]},
											"afterrender": {"bindTo": "onItemContainerRendered"}
										}
									]
								}
							}
						]/**SCHEMA_DIFF*/
			};
		});


