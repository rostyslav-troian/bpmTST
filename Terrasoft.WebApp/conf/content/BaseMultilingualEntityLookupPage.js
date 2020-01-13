Terrasoft.configuration.Structures["BaseMultilingualEntityLookupPage"] = {innerHierarchyStack: ["BaseMultilingualEntityLookupPage"], structureParent: "BasePageV2"};
define('BaseMultilingualEntityLookupPageStructure', ['BaseMultilingualEntityLookupPageResources'], function(resources) {return {schemaUId:'feb92bf3-d534-424c-9deb-f5c350d99115',schemaCaption: "Base multilingual entity lookup page", parentSchemaName: "BasePageV2", schemaName:'BaseMultilingualEntityLookupPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMultilingualEntityLookupPage", [
	"LookupUtilities",
	"BaseMultilingualEntityLookupPageResources",
	"LanguageTabMixin",
	"css!BaseMultilingualEntityLookupPageStyles"
], function(LookupUtilities) {
	return {
		mixins: {
			LanguageTabMixin: "Terrasoft.LanguageTabMixin"
		},
		attributes: {
			/**
			 * EmailMessageMultiLanguageV2 feature state.
			 */
			"MultiLanguageV2FeatureState": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Menu collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			"MenuLanguageCollection": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Available for added languages collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			"AvailableLanguages": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Languages collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			"Languages": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Active language tab name.
			 * @private
			 * @type {String}
			 */
			"ActiveLanguageTabName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * Active language identifier.
			 */
			"ActiveLanguageId": {
				"dataValueType": Terrasoft.DataValueType.GUID,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * System language.
			 */
			"SysLanguage": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * Multilingual entity schema name.
			 */
			"MultilingualEntitySchemaName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * Connection to parent entity column name.
			 */
			"MultilingualConnectionColumnName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": null
			},

			/**
			 * Flag indicates that LanguagesTabPanel was rendered at least once.
			 */
			"LanguagesTabPanelRendered": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		messages: {
			/**
			 * @message UpdateMultilingualColumnsValues
			 * Returns updated column values.
			 */
			"UpdateMultilingualColumnsValues": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message LanguageTabsChanged
			 * Language collection was changed.
			 */
			"LanguageTabsChanged": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Sets EmailMessageMultiLanguageV2 feature state into attribute.
			 * @private
			 */
			_setMultiLanguageV2FeatureState: function() {
				var featureState = this.getIsFeatureEnabled("EmailMessageMultiLanguageV2");
				this.set("MultiLanguageV2FeatureState", featureState);
			},

			/**
			 * Gets EmailMessageMultiLanguageV2 feature state from attribute.
			 * @private
			 */
			_getMultiLanguageV2FeatureState: function() {
				return this.get("MultiLanguageV2FeatureState");
			},

			/**
			 * Returns multilingual module config.
			 * @return {Object} Returns module config.
			 * @private
			 */
			_getBaseMultilingualModuleConfig: function() {
				return {
					renderTo: "MultilingualContentModuleContainer",
					reload: true,
					id: this._getMultilingualContentPreviewModuleId(),
					instanceConfig: {
						parameters: {}
					}
				};
			},

			/**
			 * Gets multilingual content module sandbox id for subscribing.
			 * @return {string} Sandbox id.
			 * @private
			 */
			_getMultilingualContentPreviewModuleId: function() {
				return this.sandbox.id + "_MultilingualContentPreviewModule";
			},

			/**
			 * Initializes Languages collection by empty collection.
			 * @private
			 */
			_initLanguagesCollection: function() {
				this.set("Languages", this.mixins.LanguageTabMixin.getLanguagesCollection());
				this.set("MenuLanguageCollection", this.mixins.LanguageTabMixin.getMenuLanguageCollection());
			},

			/**
			 * Set primary language from Terrasoft global object.
			 * @private
			 */
			_initSysLanguage: function() {
				this.set("SysLanguage", {
					"Id": Terrasoft.SysValue.PRIMARY_LANGUAGE.value,
					"Name": Terrasoft.SysValue.PRIMARY_LANGUAGE.displayValue,
					"Code": Terrasoft.SysValue.PRIMARY_LANGUAGE.code,
					"id": Terrasoft.SysValue.PRIMARY_LANGUAGE.value,
					"name": Terrasoft.SysValue.PRIMARY_LANGUAGE.displayValue,
					"code": Terrasoft.SysValue.PRIMARY_LANGUAGE.code
				});
			},

			/**
			 * Add MultiLanguage content into SysLanguage from ViewModel.
			 * @protected
			 */
			addMultiLanguageContentToSysLanguage: function() {
				var languages = this.get("Languages");
				var syslanguage = this.get("SysLanguage");
				var language = languages.find(syslanguage.Id);
				var multiLanguageContent = language.get("MultiLanguageContent");
				var columns = this.getMultilingualColumnList();
				Terrasoft.each(columns, function(column) {
					var item = multiLanguageContent.find(function(contentItem) {
						return contentItem.name === column.name;
					}, this);
					item.value = this.get(column.name);
				}, this);
			},

			/**
			 * Add configuration values into config.
			 * @param {Object} config Config object.
			 * @protected
			 */
			_addConfigurationItemsIntoConfig: function(config) {
				this.Ext.apply(config, {
					sysLanguage: this.get("SysLanguage"),
					multilingualEntitySchemaName: this.get("MultilingualEntitySchemaName"),
					multilingualConnectionColumnName: this.get("MultilingualConnectionColumnName"),
					recordId: this.get("Id"),
					multilingualColumnList: this.getMultilingualColumnList()
				});
			},

			/**
			 * Add menu items values into config.
			 * @param {Object} config Config object.
			 * @private
			 */
			_addMenuItemsConfigurationIntoConfig: function(config) {
				this.Ext.apply(config, {
					deleteMenuItemConf: {
						"Caption": {"bindTo": "Resources.Strings.DeleteLanguageButtonCaption"},
						"Click": {"bindTo": "onDeleteLanguage"},
						"MarkerValue": "DeleteLanguage",
						"Visible": {
							"bindTo": "ActiveLanguageId",
							"bindConfig": {"converter": "getDeleteLanguageButtonVisibleConverter"}
						}
					},
					addMenuItemConf: {
						"Caption": {"bindTo": "Resources.Strings.AddLanguageButtonCaption"},
						"MarkerValue": "AddLanguage",
						"Click": {"bindTo": "addLanguage"}
					},
					addMenuItemFromQuickMenuConf: {
						"Click": {"bindTo": "addLanguageFromQuickMenu"}
					}
				});
			},

			/**
			 * Add multilingual content.
			 * @param {String} languageId language uniqueidentifier.
			 * @private
			 */
			_loadDataFromCard: function(languageId) {
				var language = this.get("Languages").find(languageId);
				var multiLanguageContent = language.get("MultiLanguageContent");
				Terrasoft.each(multiLanguageContent, function(item) {
					item.value = this.get(item.name);
				}, this);
			},

			/**
			 * Initialize main language multilingual data.
			 * @private
			 */
			_addSysLanguageMultiLanguageData: function() {
				var languageId = this.get("SysLanguage").Id;
				this._loadDataFromCard(languageId);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Initialize languageTab mixin.
			 * @protected
			 */
			initLanguageTabMixin: function() {
				var config = {};
				this._addConfigurationItemsIntoConfig(config);
				this._addMenuItemsConfigurationIntoConfig(config);
				this.mixins.LanguageTabMixin.applyMixinParameters(config);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function() {
				this._setMultiLanguageV2FeatureState();
				this.mixins.LanguageTabMixin.init();
				this._initLanguagesCollection();
				this.callParent(arguments);
				this._initSysLanguage();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#reloadEntity
			 * @override
			 */
			reloadEntity: function() {
				this.reInitLanguagesCollection();
				this.clearActiveLanguage();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @override
			 */
			onDiscardChangesClick: function() {
				this.callParent(arguments);
				if (!this.isCopyMode()) {
					this.updateMenuAndTabs();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.initMultilingualEntitySchemaName();
				this.initLanguageTabMixin();
				this.initLanguages();
				this._addSysLanguageMultiLanguageData();
			},

			/**
			 * Set system Language as active language in tab collection.
			 * @protected
			 */
			setSysLanguageAsActive: function() {
				if (this.get("IsEntityInitialized") && this.get("LanguagesTabPanelRendered")) {
					var sysLanguage = this.get("SysLanguage");
					this.setActiveLanguage(sysLanguage.Id, sysLanguage.Name);
				}
			},

			/**
			 * Clear language collection and add system language as first value.
			 * @protected
			 */
			reInitLanguagesCollection: function() {
				var collection = this.get("Languages");
				collection.clear();
			},

			/**
			 * Clear active language attributes.
			 * @protected
			 */
			clearActiveLanguage: function() {
				this.setActiveLanguage(null, null);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @override
			 */
			onSaved: function() {
				this.handleMultiLanguageEntities();
				this.callParent(arguments);
				this.set("PrimaryColumnValue", this.get("Id"));
			},

			/**
			 * Handles the creation and updating of multilingual records.
			 * @protected
			 */
			handleMultiLanguageEntities: function() {
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				this.mixins.LanguageTabMixin.addMultiLangQueries(batchQuery);
				batchQuery.execute();
			},

			/**
			 * Update exist multilingual entities.
			 * @param {Terrasoft.BatchQuery} batchQuery Query for all operations.
			 * @protected
			 */
			updateExistMultiLanguageEntities: function(batchQuery) {
				var languages = this.get("Languages");
				var languageToUpdate = languages.filter(function(item) {
					return item.get("ExistRecord") && item.get("RecordUpdated");
				});
				Terrasoft.each(languageToUpdate, function(language) {
					if (language.get("Id") !== this.get("SysLanguage").Id) {
						var update = this.getContentsUpdateEsq(language);
						this.addMultiLanguageContentEsq(language, update);
						batchQuery.add(update);
					}
				}, this);
			},

			/**
			 * Creates update query for Multilingual entity.
			 * @param {Terrasoft.BaseViewModel} language Multilingual entity.
			 * @return {Terrasoft.UpdateQuery} Update query.
			 * @protected
			 */
			getContentsUpdateEsq: function(language) {
				var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: this.get("MultilingualEntitySchemaName")
				});
				updateQuery.filters.add("languageIdFilter", updateQuery.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Language", language.get("Id")));
				updateQuery.filters.add("recordIdFilter", updateQuery.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, this.get("MultilingualConnectionColumnName"),
					this.get("Id")));
				return updateQuery;
			},

			/**
			 * Creates new multilingual entities.
			 * @param {Terrasoft.BatchQuery} batchQuery Multilingual entity.
			 * @protected
			 */
			insertNewMultiLanguageEntities: function(batchQuery) {
				var languages = this.get("Languages");
				var languagesToInsert = languages.filter(function(item) {
					return !item.get("ExistRecord");
				});
				Terrasoft.each(languagesToInsert, function(language) {
					var insert = this.getContentsInsertEsq(language);
					this.addMultiLanguageContentEsq(language, insert);
					language.set("ExistRecord", true, {silent: true});
					batchQuery.add(insert);
				}, this);
			},

			/**
			 * Add multilingual columns to query.
			 * @param {Terrasoft.BaseViewModel} language Multilingual entity.
			 * @param {Terrasoft.EntitySchemaQuery} esq Query.
			 * @protected
			 */
			addMultiLanguageContentEsq: function(language, esq) {
				var columns = this.getMultilingualColumnList();
				Terrasoft.each(columns, function(item) {
					esq.setParameterValue(item.name,
						language.get("MultiLanguageContent").find(function(contentItem) {
							return contentItem.name === item.name;
						}, this).value, Terrasoft.DataValueType.TEXT);
				}, this);
			},

			/**
			 * Create update queries to SysLanguage, set IsUsed column true.
			 * @param {Terrasoft.BatchQuery} batchQuery Query for all operations.
			 * @protected
			 */
			updateNotUsedMultilanguages: function(batchQuery) {
				var languages = this.get("Languages");
				var languageToActivate = languages.filter(function(item) {
					return !item.get("IsUsed");
				});
				Terrasoft.each(languageToActivate, function(language) {
					var update = this.getSysLanguageUpdateQuery(language);
					batchQuery.add(update);
				}, this);
			},

			/**
			 * Creates update query for SysLanguage entity.
			 * @param {Terrasoft.BaseViewModel} language Multilingual entity.
			 * @return {Terrasoft.UpdateQuery} Update query.
			 * @protected
			 */
			getSysLanguageUpdateQuery: function(language) {
				var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "SysLanguage"
				});
				updateQuery.filters.add("IdFilter", updateQuery.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Id", language.get("Id")));
				updateQuery.setParameterValue("IsUsed", true, Terrasoft.DataValueType.BOOLEAN);
				return updateQuery;
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SaveRecord", this.save, this, [this.sandbox.id]);
				this.sandbox.subscribe("ValidateCard", this.onValidateCard, this, [this.sandbox.id]);
				this.sandbox.subscribe("GetColumnsValues", this.onGetColumnsValues, this, [this.sandbox.id]);
				this.sandbox.subscribe("GetCardState", this.getCardState, this, [this.sandbox.id]);
				this.sandbox.subscribe("UpdateMultilingualColumnsValues", this.onGetUpdatedMultilingualColumns,
					this, [this.sandbox.id]);
				this.sandbox.subscribe("LanguageTabsChanged", this.updateMenuAndTabs, this,
					[this.sandbox.id]);
			},

			/**
			 * Update multilingual columns using values from content schema.
			 * @param {Object} multilingualData Multilingual values from content schema.
			 * @protected
			 */
			onGetUpdatedMultilingualColumns: function(multilingualData) {
				var languageCollection = this.get("Languages");
				var language = languageCollection.find(multilingualData.languageId);
				var updateColumn = language.get("MultiLanguageContent").find(function(item) {
					return item.name === multilingualData.multilingualColumn.name;
				});
				updateColumn.value = multilingualData.multilingualColumn.value;
				language.set("RecordUpdated", true, {silent: true});
				this.updateCardButtonsVisibility(true);
			},

			/**
			 * Initializes Languages collection from database.
			 * @protected
			 */
			initLanguages: function() {
				switch (true) {
					case this.isCopyMode():
						this.mixins.LanguageTabMixin.recordId = this.initialConfig.values.PrimaryColumnValue;
						this.initLanguagesFromDB();
						break;
					case (this.isAddMode() || !this._getMultiLanguageV2FeatureState()):
						this.mixins.LanguageTabMixin.initLanguageTabPanelMenuItems();
						this.setSysLanguageAsActive();
						break;
					default:
						this.initLanguagesFromDB();
				}
			},

			/**
			 * Initialize languages from template.
			 */
			initLanguagesFromDB: function() {
				this.mixins.LanguageTabMixin
					.loadLanguageCollection({
						callback: this.setLanguagesInitializedAndUpdateCardButtonVisibility,
						scope: this
					});
			},

			/**
			 * Sets IsLanguagesInitialized attribute and update card buttn visibility.
			 * @protected
			 */
			setLanguagesInitializedAndUpdateCardButtonVisibility: function() {
				this.setSysLanguageAsActive();
				this.updateCardButtonsVisibility(this.isCopyMode());
				if (this.isCopyMode()) {
					this.mixins.LanguageTabMixin.recordId = this.get("Id");
					var languages = this.mixins.LanguageTabMixin.getLanguagesCollection();
					languages.collection.each(function(language) {
						language.set("ExistRecord", false);
					});
				}
			},

			/**
			 * Update card buttons visibility after initialization language collection.
			 * @param {boolean} flag Show save and cancel buttons if flag is true, otherwise hide them.
			 * @protected
			 */
			updateCardButtonsVisibility: function(flag) {
				this.updateButtonsVisibility(flag, {
					force: true
				});
			},

			/**
			 * Init multilingual configuration.
			 * @protected
			 */
			initMultilingualEntitySchemaName: function() {
				this.set("MultilingualEntitySchemaName", this.entitySchemaName + "Lang");
				this.set("MultilingualConnectionColumnName", this.entitySchemaName);
			},

			/**
			 * Gets multilingual content module schema.
			 * @protected
			 */
			getModuleSchemaName: function() {
				return "BaseMLangContentEditSchema";
			},

			/**
			 * Gets configuration for loading multilingual module.
			 * @return {Object} Module config.
			 * @protected
			 */
			getMultilingualModuleConfig: function() {
				var config = this._getBaseMultilingualModuleConfig();
				var params = config.instanceConfig.parameters;
				params.moduleSchemaName = this.getModuleSchemaName();
				params.recordId = this.get("Id");
				var activeLanguageId = this.get("ActiveLanguageId");
				var languageCollection = this.get("Languages");
				var languageData = languageCollection.find(activeLanguageId);
				params.multiLanguageContent = languageData.get("MultiLanguageContent");
				params.languageId = activeLanguageId;
				if (this.get("SysLanguage").Id === activeLanguageId) {
					params.sourceEntitySchemaName = this.entitySchemaName;
					params.isDefaultLanguage = true;
					params.ExistRecord = true;
				} else {
					params.sourceEntitySchemaName = this.get("MultilingualEntitySchemaName");
					params.isDefaultLanguage = false;
					params.multilingualConnectionColumnName = this.get("MultilingualConnectionColumnName");
					params.existRecord = languageData.get("ExistRecord");
					params.multilingualRecordId = languageData.get("RecordId");
				}
				if (this.isCopyMode()) {
					params.copyValues = this.getCopyValues();
				}
				params.columnList = this.getMultilingualColumnList();
				return config;
			},

			/**
			 * Returns copy column list with values.
			 * @protected
			 * @return {Array} Array of copied columns and values.
			 */
			getCopyValues: function() {
				var activeLanguageId = this.get("ActiveLanguageId");
				if (this.get("SysLanguage").Id === activeLanguageId) {
					return this.getMultilingualColumnList()
						.map(function(item) {
							return {
								"name": item.name,
								"value": this.get(item.name)
							};
						}, this);
				} else {
					var activeLanguage = this.get("Languages").getItems()
						.filter(function(item) {
							return item.get("Id") === activeLanguageId;
						})[0];
					return activeLanguage.get("MultiLanguageContent");
				}
			},

			/**
			 * Returns multilingual column list.
			 * @protected
			 * @return {Array} Array of columns.
			 */
			getMultilingualColumnList: function() {
				return [];
			},

			/**
			 * Use addLanguageWithoutMultiLangContent instead of this method.
			 * @param {String} id Language identifier.
			 * @param {String} caption Language caption.
			 * @param {String} name Language name.
			 * @param {String} code Language code.
			 * @obsolete
			 * @protected
			 */
			addLanguageToCollection: function(id, caption, name, code) {
				var languages = this.get("Languages");
				var languageViewModel = Ext.create("Terrasoft.BaseViewModel", {
					"values": {
						"Id": id,
						"Caption": caption,
						"Name": name,
						"Code": code
					}
				});
				languages.add(id, languageViewModel);
			},

			/**
			 * Add language to AvailableLanguages collection.
			 * @param {String} id Language identifier.
			 * @param {String} caption Language caption.
			 * @param {String} name Language name.
			 * @param {String} code Language code.
			 * @protected
			 */
			addLanguageToAvailibleLanguagesCollection: function(id, caption, name, code) {
				var languages = this.get("AvailableLanguages");
				var languageViewModel = Ext.create("Terrasoft.BaseViewModel", {
					"values": {
						"Id": id,
						"Caption": caption,
						"Name": name,
						"Code": code
					}
				});
				languages.add(id, languageViewModel);
			},

			/**
			 * Add language data(exist multilanguage record) to language collection.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item Language data.
			 */
			addLanguageItemToCollection: function(item, isCopyMode) {
				var languages = this.get("Languages");
				var id = item.get("LanguageId");
				var multiLanguageContent = this.getMultiLanguageDataForLanguageCollection(item);
				var languageViewModel = Ext.create("Terrasoft.BaseViewModel", {
					"values": {
						"Id": id,
						"Caption": item.get("LanguageName"),
						"Name": item.get("LanguageName"),
						"Code": item.get("LanguageCode"),
						"RecordId": isCopyMode ? Terrasoft.generateGUID() : item.get("Id"),
						"MultiLanguageContent": multiLanguageContent,
						"ExistRecord": !isCopyMode,
						"IsUsed": true
					}
				});
				languages.add(id, languageViewModel);
			},

			/**
			 * Get language data(multilingual columns from exist record).
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item Multilingual data.
			 * @return {Array} Columns and its values.
			 */
			getMultiLanguageDataForLanguageCollection: function(item) {
				return this.getMultilingualColumnList()
					.map(function(columnItem) {
						return {
							"name": columnItem.name,
							"value": item ? item.get(columnItem.name) : ""
						};
					}, this);
			},

			/**
			 * Shows dialog for confirmation when page in new mode.
			 * @param {Function} callback Called if page saved.
			 * @protected
			 */
			showAddConfirmation: function(callback) {
				var confirmationMessage = this.get("Resources.Strings.AddConfirmation");
				if (!this.isNewMode() && !this.isCopyMode()) {
					callback();
					return;
				}
				this.showConfirmationDialog(confirmationMessage,
					function(returnCode) {
						if (returnCode === "yes") {
							var config = {callback: callback, isSilent: true};
							this.save(config);
						}
					}, ["yes", "no"]);
			},

			/**
			 * Shows dialog for confirmation that it is need to copy current multilingual content.
			 * @param {Function} callback Called after showing message.
			 * @protected
			 */
			showCopyCurrentLangConfirmation: function(callback) {
				const message = this.get("Resources.Strings.CopyCurrentLangConfirmation");
				this.showConfirmationDialog(message, callback, ["yes", "no"]);
			},

			/**
			 * Use addLanguageWithoutMultiLangContent instead of this method.
			 * @param {Terrasoft.Collection} languages List of languages.
			 * @param callback The function to be called after saving.
			 * @protected
			 * @obsolete
			 */
			insertMultilingualContents: function(languages, callback) {
				if (languages.selectedRows.getCount() > 0) {
					var languagesToAdd = languages.selectedRows.getItems();
					var insertBatch = this.getContentsInsertBatchEsq(languagesToAdd);
					insertBatch.execute(function() {
						callback(languagesToAdd);
					}, this);
				}
			},

			/**
			 * Use.insertNewMultiLanguageEntities instead of this method
			 * @param {Terrasoft.Collection} languages Languages to be saved.
			 * @protected
			 * @obsolete
			 * @return {Terrasoft.BatchQuery} Returns batch query for inserting multilingual data.
			 */
			getContentsInsertBatchEsq: function(languages) {
				var bq = Ext.create("Terrasoft.BatchQuery");
				Terrasoft.each(languages, function(language) {
					var insert = this.getContentsInsertEsq(language);
					bq.add(insert);
				}, this);
				return bq;
			},

			/**
			 * Returns language lookup config.
			 * @protected
			 * @return {Object} Returns lookup config.
			 */
			getAddLanguageLookupConfig: function() {
				var filters = this.getLanguageLookupFilterConfig();
				this.addIsUsedFilter(filters, 0);
				return {
					entitySchemaName: "SysLanguage",
					multiSelect: true,
					hideActions: true,
					columns: ["Name", "Code"],
					filters: filters
				};
			},

			/**
			 * Shows delete confirmation message.
			 * @param {Object} language Active language.
			 * @param {Function} callback Callback function.
			 * @protected
			 */
			showDeleteConfirmation: function(language, callback) {
				var deleteConfirmationMessage = this.Ext.String.format(
					this.get("Resources.Strings.DeleteConfirmation"),
					language.name);
				this.showConfirmationDialog(deleteConfirmationMessage,
					function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							callback(language);
						}
					}, ["yes", "no"]);
			},

			/**
			 * Creates language lookup filter.
			 * @protected
			 * @return {Terrasoft.FilterGroup} Returns lookup filter.
			 */
			getLanguageLookupFilterConfig: function() {
				var filters = this.Ext.create("Terrasoft.FilterGroup");
				var languages = this.get("Languages");
				var languageIds = [];
				languages.collection.each(function(item) {
					languageIds.push(item.get("Id"));
				});
				var languagesExceptExistingFilter =
					Terrasoft.createColumnInFilterWithParameters("Id", languageIds);
				languagesExceptExistingFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
				filters.add("ExceptExistingFilter", languagesExceptExistingFilter);
				return filters;
			},

			/**
			 * Add filter IsUsedFilter to filters with params state.
			 * @protected
			 * @param {Object} filters object which will be extend.
			 * @param {Boolean} state state of the filter.
			 */
			addIsUsedFilter: function(filters, state) {
				filters.add("IsUsedFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IsUsed", state)
				);
			},

			/**
			 * Add Setup language menu item into MenuLanguageCollection.
			 * @protected
			 */
			addSetupLanguageMenuItem: function() {
				var menuItems = this.get("MenuLanguageCollection");
				menuItems.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": {"bindTo": "Resources.Strings.SetupLanguagesButtonCaption"},
						"Click": {"bindTo": "setupLanguages"},
						"MarkerValue": "SetupLanguages",
						"Enabled": true
					}
				}));
			},

			/**
			 * Add menu items from Available languages.
			 * @protected
			 */
			addMenuItemsFromAvailableLanguages: function() {
				var languages = this.get("AvailableLanguages");
				languages.each(function(item) {
					this.addMenuItem(item.get("Name"), item.get("Id"));
				}, this);
			},

			/**
			 * Adds to menu languages that have IsUsed column value true.
			 * @protected
			 */
			addActiveLanguagesMenuItems: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysLanguage"
				});
				esq.addColumn("Id", "LanguageId");
				esq.addColumn("Name", "LanguageName");
				esq.addColumn("Code", "LanguageCode");
				var filters = this.getLanguageLookupFilterConfig();
				this.addIsUsedFilter(filters, 1);
				esq.filters.add(filters);
				esq.getEntityCollection(this.addAvailableLanguages, this);
			},

			/**
			 * Work with SysLanguage coolection. Add values to AvailableLanguages and menu.
			 * @protected
			 * @param {Object} result Language identifier.
			 */
			addAvailableLanguages: function(result) {
				if (result.success) {
					result.collection.each(
						function(item) {
							var languageName = item.get("LanguageName");
							var languageId = item.get("LanguageId");
							this.addLanguageToAvailibleLanguagesCollection(
								languageId,
								languageName,
								languageName,
								item.get("LanguageCode"));
							this.addMenuItem(languageName, languageId);
						}, this);
					this.addMenuItemSeparator();
					this.addAddLanguageMenuItem();
					this.addMenuItemSeparator();
					this.addSetupLanguageMenuItem();
				}
			},

			/**
			 * Add language to menu with custom tag.
			 * @protected
			 * @param {String} languageName Language name .
			 * @param {String} tag Language identifier which will be used as tag.
			 */
			addMenuItem: function(languageName, tag) {
				var menuItems = this.get("MenuLanguageCollection");
				menuItems.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": languageName,
						"MarkerValue": languageName,
						"Click": {"bindTo": "addLanguageFromQuickMenu"},
						"Tag": tag,
						"Enabled": true
					}
				}));
			},

			/**
			 * Add MultiLanguage entity to card.
			 * @protected
			 * @param {String} tag point on which user click.
			 */
			addLanguageFromQuickMenu: function(tag) {
				this.showCopyCurrentLangConfirmation(function(resultCode) {
					var copyLanguageId = resultCode === Terrasoft.MessageBoxButtons.YES.returnCode
						? this.get("ActiveLanguageId") : false;
					this.mixins.LanguageTabMixin.addLanguageFromQuickMenu(tag, copyLanguageId);
				});
			},

			/**
			 * Add delete menu item into MenuLanguageCollection.
			 * @protected
			 */
			addDeleteMenuItem: function() {
				var menuItems = this.get("MenuLanguageCollection");
				menuItems.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": {"bindTo": "Resources.Strings.DeleteLanguageButtonCaption"},
						"Click": {"bindTo": "onDeleteLanguage"},
						"MarkerValue": "DeleteLanguage",
						"Enabled": true,
						"Visible": {
							"bindTo": "ActiveLanguageId",
							"bindConfig": {"converter": "getDeleteLanguageButtonVisibleConverter"}
						}
					}
				}));
			},

			/**
			 * Add menu separator into MenuLanguageCollection.
			 * @protected
			 */
			addMenuItemSeparator: function() {
				var menuItems = this.get("MenuLanguageCollection");
				menuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
			},

			/**
			 * Add Menu items which always exist.
			 * @protected
			 */
			addAddLanguageMenuItem: function() {
				var menuItems = this.get("MenuLanguageCollection");
				menuItems.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": {"bindTo": "Resources.Strings.AddLanguageButtonCaption"},
						"MarkerValue": "AddLanguage",
						"Click": {"bindTo": "addLanguage"},
						"Enabled": true
					}
				}));
			},

			/**
			 * Get insert query for multilingual record.
			 * @param {Terrasoft.BaseViewModel} language which will be added for current record.
			 * @return {Terrasoft.InsertQuery} Insert Query for record.
			 * @protected
			 */
			getContentsInsertEsq: function(language) {
				var insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: this.get("MultilingualEntitySchemaName")
				});
				insert.setParameterValue("Language", language.get("Id"), Terrasoft.DataValueType.GUID);
				insert.setParameterValue(this.get("MultilingualConnectionColumnName"),
					this.get("Id"), Terrasoft.DataValueType.GUID);
				insert.setParameterValue("Id",
					language.get("RecordId"), Terrasoft.DataValueType.GUID);
				return insert;
			},

			/**
			 * Get language params from AvailableLanguages collection.
			 * @param {String} languageId language identifier.
			 * @return {Object} language params
			 * @protected
			 */
			getLanguageData: function(languageId) {
				var languageCollection = this.get("AvailableLanguages");
				var language = languageCollection.find(languageId);
				return language.values;
			},

			//endregion

			//region Methods: Public

			/**
			 * Sets active language and activate corresponding tab.
			 * @param {String} id language guid.
			 * @param {String} name Language name.
			 */
			setActiveLanguage: function(id, name) {
				this.set("ActiveLanguageTabName", name);
				this.set("ActiveLanguageId", id);
			},

			/**
			 * Changing active tab handler.
			 * @param {Object} scope Context.
			 * @param {Number} tabNumber Selected tab order number.
			 * @param {Object} tabsCollection Entire tabs collection.
			 */
			onLanguageTabChange: function(scope, tabNumber, tabsCollection) {
				if (this.get("IsEntityInitialized")) {
					var activeLanguageId = tabsCollection.getByIndex(tabNumber).get("Id");
					this.set("ActiveLanguageId", activeLanguageId);
					this.sandbox.loadModule("MLangContentContainerModule",
						this.getMultilingualModuleConfig()
					);
				}
			},

			/**
			 * Adds a language from the lookup to the language collection.
			 */
			addLanguage: function() {
				Terrasoft.chain(
					this.showAddConfirmation,
					this.showAddLanguagesLookup,
					function(next, languages) {
						var selectedLanguages = languages.selectedRows.getItems();
						this.showCopyCurrentLangConfirmation(function(resultCode) {
							var copyLanguageId = resultCode === Terrasoft.MessageBoxButtons.YES.returnCode
								? this.get("ActiveLanguageId") : false;
							Terrasoft.each(selectedLanguages, function(language) {
								this.mixins.LanguageTabMixin.addLanguageWithoutMultilangContentWithDefaultSettings(language, copyLanguageId);
							}, this);
						});
						next();
					},
					this
				);
			},

			/**
			 * Rerender tabs and menu collections.
			 */
			updateMenuAndTabs: function() {
				this.reloadEntity(this.addMultiLanguageContentToSysLanguage, this);
				this.setSysLanguageAsActive();
			},

			/**
			 * Proceed to languages lookup section.
			 */
			setupLanguages: function() {
				location.href = this.get("Resources.Strings.CustomerLanguagesLookupSectionUrl");
			},

			/**
			 * Shows lookup for adding new languages.
			 * @param {Function} callback Callback function.
			 */
			showAddLanguagesLookup: function(callback) {
				var lookupConfig = this.mixins.LanguageTabMixin.getAddLanguageLookupConfig();
				LookupUtilities.Open(this.sandbox, lookupConfig, callback, this, null, false, false);
			},

			/**
			 * Delete button action handler.
			 */
			onDeleteLanguage: function() {
				var currentLanguage = {
					id: this.get("ActiveLanguageId"),
					name: this.get("ActiveLanguageTabName")
				};
				Terrasoft.chain(
					function(next) {
						this.showDeleteConfirmation(currentLanguage, next);
					},
					function(next, language) {
						this.mixins.LanguageTabMixin
							.deleteLanguage(language, this.setSysLanguageAsActive, this);
						next();
					},
					this
				);
			},

			/**
			 * Gets if delete button visible.
			 * @param {Guid} value Active language identifier.
			 * @return {boolean} Is delete button visible.
			 */
			getDeleteLanguageButtonVisibleConverter: function(value) {
				var sysLanguage = this.get("SysLanguage");
				return !(sysLanguage && sysLanguage.Id === value);
			},

			/**
			 * LanguagesTabPanel Rerendered handler.
			 */
			onLanguagesTabPanelRerendered: function() {
				this.set("LanguagesTabPanelRendered", true);
				this.setSysLanguageAsActive();
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "TabsContainer",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.LazyContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": true
				}
			},
			{
				"operation": "remove",
				"name": "Tabs"
			},
			{
				"operation": "insert",
				"name": "languagesTabPanel",
				"propertyName": "items",
				"values": {
					"id": "languagesTabPanel",
					"itemType": Terrasoft.ViewItemType.TAB_PANEL,
					"selectors": {
						"wrapEl": "#languagesTabPanel"
					},
					"classes": {
						"wrapClassName": ["languagesTabPanel"]
					},
					"collection": {"bindTo": "Languages"},
					"activeTabName": {"bindTo": "ActiveLanguageTabName"},
					"activeTabChange": {"bindTo": "onLanguageTabChange"},
					"defaultMarkerValueColumnName": "Name",
					"tabs": [],
					"afterrerender": {
						"bindTo": "onLanguagesTabPanelRerendered"
					},
					"controlConfig": {
						"items": [{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "Resources.Images.SettingsButtonImage"},
							"markerValue": "SettingsButton",
							"hint": {"bindTo": "Resources.Strings.SettingsButtonHint"},
							"menu": {
								"items": {"bindTo": "MenuLanguageCollection"}
							},
							"visible": {"bindTo": "_getMultiLanguageV2FeatureState"}
						}]
					},
					"isScrollVisible": {"bindTo": "_getMultiLanguageV2FeatureState"}
				},
				"parentName": "TabsContainer"
			},
			{
				"operation": "insert",
				"name": "MultilingualContentModuleContainer",
				"propertyName": "items",
				"values": {
					"id": "MultilingualContentModuleContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": true,
					"items": []
				},
				"parentName": "TabsContainer"
			}
		]/**SCHEMA_DIFF*/
	};
});


