Terrasoft.configuration.Structures["MultiLanguageEmailContentBuilder"] = {innerHierarchyStack: ["MultiLanguageEmailContentBuilder"], structureParent: "EmailWithSubjectContentBuilder"};
define('MultiLanguageEmailContentBuilderStructure', ['MultiLanguageEmailContentBuilderResources'], function(resources) {return {schemaUId:'a2d7170a-6168-49c9-89a9-ba6fa85a1d82',schemaCaption: "MultiLanguageEmailContentBuilder", parentSchemaName: "EmailWithSubjectContentBuilder", schemaName:'MultiLanguageEmailContentBuilder',parentSchemaUId:'aa856850-57c3-4135-99c2-857eb2eb7ca2',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MultiLanguageEmailContentBuilder", ["LookupUtilities", "EmailTemplateMLangContentBuilderEnumsModule",
	"css!ContentBuilderCSS", "LanguageTabMixin"
], function(LookupUtilities, MultiLangContentBuilderEnumsModule) {
	return {
		mixins: {
			/**
			 * @class Terrasoft.configuration.mixins.LanguageTabMixin.
			 */
			LanguageTabMixin: "Terrasoft.LanguageTabMixin"
		},
		properties: {
			/**
			 * Name of email template without language codes in brackets.
			 */
			originalEmailTemplateName: ""
		},
		attributes: {

			/**
			 * Languages collection.
			 * @protected
			 * @type {Terrasoft.Collection}
			 */
			"Languages": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Menu collection.
			 * @protected
			 * @type {Terrasoft.Collection}
			 */
			"MenuLanguageCollection": {
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
				"value": ""
			},

			/**
			 * Active language identifier.
			 */
			"ActiveLanguageId": {
				"dataValueType": Terrasoft.DataValueType.GUID,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": ""
			},

			/**
			 * Is languages collection initialized.
			 */
			"IsLanguagesInitialized": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},

			/**
			 * System language.
			 */
			"SysLanguage": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": {}
			},

			/**
			 * Multilingual entity schema name.
			 */
			"MultilingualEntitySchemaName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": "EmailTemplateLang"
			},

			/**
			 * Connection to parent entity column name.
			 */
			"MultilingualConnectionColumnName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": "EmailTemplate"
			}
		},
		diff: [
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
						"bindTo": "setSysLanguageAsActive"
					},
					"controlConfig": {
						"items": [{
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "Resources.Images.SettingsButtonIconGrey"},
							"classes": {
								"wrapperClass": ["language-setup-image"]
							},
							"markerValue": "SettingsButton",
							"menu": {
								"items": {"bindTo": "MenuLanguageCollection"}
							},
							"visible": true
						}]
					},
					"isScrollVisible": true
				},
				"parentName": "HeaderContainer"
			},
			{
				"operation": "merge",
				"name": "SaveButton",
				"parentName": "ButtonGroupContainer",
				"values": {
					"visible": {"bindTo": "getSaveButtonVisible"}
				}
			}
		],
		methods: {

			// region Methods: Private

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
					"Id": this.Terrasoft.SysValue.PRIMARY_LANGUAGE.value,
					"Name": this.Terrasoft.SysValue.PRIMARY_LANGUAGE.displayValue,
					"Code": this.Terrasoft.SysValue.PRIMARY_LANGUAGE.code
				});
			},

			/**
			 * Initialize main language multilingual data.
			 * @private
			 */
			_addSysLanguageMultiLanguageData: function() {
				var languageId = this.get("SysLanguage").Id;
				this.loadTemplateFromSheet(languageId);
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
					recordId: this.get("RecordId"),
					multilingualColumnList: this.getMultilingualColumnList()
				});
			},

			/**
			 * Add menu items values into config.
			 * @param {Object} config Config object.
			 * @protected
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
			 * Converts a collection languages to a string short code names join by commas.
			 * @private
			 * @param {Terrasoft.core.collections.Collection} languages List of languages.
			 * @return {String} Returns short code names string.
			 */
			_toShortCodeString: function(languages) {
				return languages.getItems()
					.map(function(language) {
						var codeArray = language.get("Code").split("-");
						return codeArray[codeArray.length - 1];
					})
					.join(", ");
			},

			/**
			 * Converts a name column value to template name column value.
			 * @private
			 * @param {string} name Name column value
			 * @return {string} Returns TemplateName column value.
			 */
			_nameToTemplateName: function(name) {
				var index = name.lastIndexOf("(");
				return index > 0
					? (name.substr(0, index)).trim()
					: name;
			},

			//endregion

			// region Methods: Protected

			/**
			 * Update column name by getting and combining data
			 * from TemplateName and Languages columns.
			 * @protected
			 */
			updateName: function() {
				var tplName = this.originalEmailTemplateName;
				var tplNameWithoutLanguages = this._nameToTemplateName(tplName);
				var languageString = this._toShortCodeString(this.get("Languages"));
				var name = (tplNameWithoutLanguages || "") + " (" + languageString + ")";
				this.set("TemplateDisplayValue", name);
			},

			/**
			 * Subscribe on view model attribute events.
			 * @protected
			 */
			subscribeAttributeEvents: function() {
				var languages = this.get("Languages");
				languages.on("changed", this.updateName, this);
			},

			/**
			 * Initializes Languages collection from database.
			 * @protected
			 */
			initLanguages: function() {
				this.mixins.LanguageTabMixin
					.loadLanguageCollection({callback: this.setLanguagesInitializedAndSysLanguageActive, scope: this});
			},

			/**
			 * Sets IsLanguagesInitialized attribute and sysLanguage as active.
			 * @protected
			 */
			setLanguagesInitializedAndSysLanguageActive: function() {
				this.set("IsLanguagesInitialized", true);
				this.setSysLanguageAsActive();
				this.subscribeAttributeEvents();
			},

			/**
			 * Load template from sheet to language collection.
			 * @param {String} languageId language identifier.
			 * @protected
			 */
			loadTemplateFromSheet: function(languageId) {
				var language = this.getLanguageDataFromLanguages(languageId);
				if (language) {
					this.setBodyColumnsValues(language);
					this.setMLangColumnValue(language, "Subject",
						this.Terrasoft.decodeHtmlEntities(this.get("Subject")));
				}
			},

			/**
			 * Set columns connected with Body into multilingual entity.
			 * @param {Terrasoft.model.BaseViewModel} language Multilingual entity.
			 * @protected
			 */
			setBodyColumnsValues: function(language) {
				var config = this.getContentBuilderConfig();
				var emailContentExporter = this.getContentExporter(config);
				var configText = this.Terrasoft.encode(config);
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var templateConfigColumnName = contentBuilderConfig.TemplateConfigColumnName;
				this.setMLangColumnValue(language, templateConfigColumnName, configText);
				var displayHtml = emailContentExporter.exportData(config);
				var templateBodyColumnName = contentBuilderConfig.TemplateBodyColumnName;
				this.setMLangColumnValue(language, templateBodyColumnName, displayHtml);
			},

			/**
			 * Set column value in multilingual entity.
			 * @param {Terrasoft.model.BaseViewModel} language Multilingual entity.
			 * @param {String} columnName Name of multilingual column.
			 * @param {String} value Value of multilingual column.
			 * @protected
			 */
			setMLangColumnValue: function(language, columnName, value) {
				var mLangContent = language.get("MultiLanguageContent");
				var mLangContentPrevious = mLangContent.find(function(contentItem) {
					return contentItem.name === columnName;
				}, this);
				if (mLangContentPrevious.value !== value) {
					mLangContentPrevious.value = value;
					language.set("RecordUpdated", true, {silent: true});
				}
			},

			/**
			 * Get language params from Languages collection.
			 * @param {String} languageId language identifier.
			 * @return {Terrasoft.BaseViewModel} language params
			 * @protected
			 */
			getLanguageDataFromLanguages: function(languageId) {
				return this.get("Languages").find(languageId);
			},

			/**
			 * Load template values into sheet from language collection.
			 * @param {String} languageId Language identifier.
			 * @protected
			 */
			loadTemplateIntoSheet: function(languageId) {
				var language = this.getLanguageDataFromLanguages(languageId);
				var mLangContent = language.get("MultiLanguageContent");
				this.loadBodyConfigIntoSheet(mLangContent);
				var subject = this.getMlangColumnValue(mLangContent, "Subject");
				this.set("Subject", subject);

			},

			/**
			 * Load template body into sheet from language collection.
			 * @param {Terrasoft.Collection} mLangContent Language identifier.
			 * @protected
			 */
			loadBodyConfigIntoSheet: function(mLangContent) {
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var configJson = this.getMlangColumnValue(mLangContent,
					contentBuilderConfig.TemplateConfigColumnName);
				var html = this.getMlangColumnValue(mLangContent, contentBuilderConfig.TemplateBodyColumnName);
				var config = this.prepareConfig(configJson, html);
				this.loadContentSheetConfig(config);
				this.onSelectedContentItemChange();
			},

			/**
			 * Get multilingual column value.
			 * @protected
			 * @param {Terrasoft.core.collections.Collection} mLangContent Multilingual data from entity.
			 * @param {String} columnName Name of multilingual column.
			 * @return {String} column value
			 */
			getMlangColumnValue: function(mLangContent, columnName) {
				return mLangContent.find(function(contentItem) {
					return contentItem.name === columnName;
				}, this).value;
			},

			/**
			 * Set system Language as active language in tab collection.
			 * @protected
			 */
			setSysLanguageAsActive: function() {
				if (this.get("IsLanguagesInitialized")) {
					var sysLanguage = this.get("SysLanguage");
					this.setActiveLanguage(sysLanguage.Id, sysLanguage.Name);
				}
			},

			/**
			 * Update exist main entity.
			 * @protected
			 * @param {Terrasoft.data.queries.BatchQuery} batchQuery Query for all operations.
			 * @param {String} imageId Image unique identifier.
			 */
			addUpdateSysLanguageRecord: function(batchQuery, imageId) {
				var language = this.$Languages.find(this.$SysLanguage.Id);
				var updateQuery = this.getUpdateSysLanguageQuery();
				this.mixins.LanguageTabMixin.addMultiLanguageContentEsq(language, updateQuery);
				updateQuery.setParameterValue("Name", this.$TemplateDisplayValue,
					Terrasoft.DataValueType.TEXT);
				updateQuery.setParameterValue("ConfigType", this.getConfigType(),
					Terrasoft.DataValueType.INTEGER);
				this.addImageIdParameter(imageId, updateQuery);
				batchQuery.add(updateQuery);
			},

			/**
			 * @inheritdoc Terrasoft.EmailContentBuilder#savePreviewImage
			 * @override
			 */
			savePreviewImage: function(domElement, callback, scope) {
				this.set("BodyStyles", {
					"min-height": domElement.getStyle("min-height")
				});
				domElement.setStyle("min-height", "auto");
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.EmailContentBuilder#onPreviewImageCanvasReady
			 * @override
			 */
			onPreviewImageCanvasReady: function() {
				var templateBody = this.getTemplateBodyElement();
				templateBody.applyStyles(this.get("BodyStyles"));
				this.callParent(arguments);
			},

			/**
			 * Shows dialog for confirmation that it is need to copy current multilingual content.
			 * @param {Function} callback Called after showing message.
			 * @protected
			 */
			showCopyCurrentLangConfirmation: function(callback) {
				this.showConfirmationDialog(this.get("Resources.Strings.CopyCurrentLangConfirmation"),
					callback, ["yes", "no"]);
			},

			/**
			 * Creates update query for main entity.
			 * @return {Terrasoft.UpdateQuery} Update query.
			 * @protected
			 */
			getUpdateSysLanguageQuery: function() {
				var contentBuilderConfig = this.get("ContentBuilderConfig");
				var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: contentBuilderConfig.EntitySchemaName
				});
				updateQuery.filters.add("idFilter", updateQuery.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("RecordId")));
				return updateQuery;
			},

			/**
			 * Returns multilingual column list.
			 * @protected
			 * @return {Array} Array of columns.
			 */
			getMultilingualColumnList: function() {
				var config = [];
				config.push({name: "Subject"});
				config.push({name: "Body"});
				config.push({name: "TemplateConfig"});
				return config;
			},

			/**
			 * Initialize languageTab mixin.
			 * @protected
			 */
			initLanguageTabMixin: function() {
				var config = {};
				this.mixins.LanguageTabMixin.init();
				this._addConfigurationItemsIntoConfig(config);
				this._addMenuItemsConfigurationIntoConfig(config);
				this.mixins.LanguageTabMixin.applyMixinParameters(config);
			},

			/**
			 * Delete button action handler.
			 */
			onDeleteLanguage: function() {
				var currentLanguage = {
					id: this.get("ActiveLanguageId"),
					name: this.get("ActiveLanguageTabName")
				};
				this.Terrasoft.chain(
					function(next) {
						this.showDeleteConfirmation(currentLanguage, next);
					},
					function(next, language) {
						this.mixins.LanguageTabMixin
							.deleteLanguage(language, this.setSysLanguageAsActive, this);
						this.reloadContent();
						next();
					}, this
				);
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
			 * Adds a language from the lookup to the language collection.
			 */
			addLanguage: function() {
				this.Terrasoft.chain(
					this.showAddLanguagesLookup,
					function(next, languages) {
						var selectedLanguages = languages.selectedRows.getItems();
						this.showCopyCurrentLangConfirmation(function(resultCode) {
							var activeLanguage = this.get("ActiveLanguageId");
							this.loadTemplateFromSheet(activeLanguage);
							var copyLanguageId = resultCode === Terrasoft.MessageBoxButtons.YES.returnCode
								? activeLanguage : false;
							this.Terrasoft.each(selectedLanguages, function(language) {
								this.mixins.LanguageTabMixin.addLanguageWithoutMultilangContentWithDefaultSettings(
									language, copyLanguageId);
							}, this);
						});
						next();
					}, this
				);
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
			 * Add MultiLanguage entity to card.
			 * @param {String} tag point on which user click.
			 * @protected
			 */
			addLanguageFromQuickMenu: function(tag) {
				var activeLanguage = this.get("ActiveLanguageId");
				this.loadTemplateFromSheet(activeLanguage);
				this.showCopyCurrentLangConfirmation(function(resultCode) {
					var copyLanguageId = resultCode === Terrasoft.MessageBoxButtons.YES.returnCode
						? activeLanguage : false;
					this.mixins.LanguageTabMixin.addLanguageFromQuickMenu(tag, copyLanguageId);
				});
			},

			/**
			 * @inheritdoc Terrasoft.EmailContentBuilder#setContentSheetConfig
			 * @override
			 */
			setContentSheetConfig: function(entity) {
				this.originalEmailTemplateName = this._nameToTemplateName(entity.$Name);
				this.$TemplateDisplayValue = entity.$Name;
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.EmailContentBuilder#getContentBuilderEnumsConfig
			 * @override
			 */
			getContentBuilderEnumsConfig: function(contentBuilderMode) {
				return MultiLangContentBuilderEnumsModule.getContentBuilderConfig(contentBuilderMode);
			},

			/**
			 * @inheritdoc Terrasoft.EmailContentBuilder#getContentSheetESQ
			 * @override
			 */
			getContentSheetESQ: function() {
				var esq = this.callParent(arguments);
				esq.addColumn("Name");
				return esq;
			},

			/**
			 * Returns queries for updating email templates.
			 * @override
			 * @param {Object} config Config of content builder.
			 * @param {String} imageId Preview image id value.
			 * @return {Terrasoft.BatchQuery} BatchQuery for updating config and html of target email
			 * template.
			 */
			getSaveQuery: function(config, imageId) {
				this.callParent([config]);
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				this.loadTemplateFromSheet(this.get("ActiveLanguageId"));
				this.addUpdateSysLanguageRecord(batchQuery, imageId);
				this.mixins.LanguageTabMixin.addMultiLangQueries(batchQuery);
				return batchQuery;
			},

			/**
			 * @inheritdoc Terrasoft.ContentBuilder#getContentSheetConfig
			 * @override
			 */
			getContentSheetConfig: function(callback, scope) {
				this.callParent([function(config) {
					callback.call(scope, config);
					this.initLanguages();
				}, scope]);
			},

			//endregion

			// region Methods: Public

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
			 * @inheritdoc Terrasoft.ContentBuilder#init
			 * @override
			 */
			init: function() {
				this._initSysLanguage();
				this.callParent(arguments);
				this.initLanguageTabMixin();
				this._initLanguagesCollection();
			},

			/**
			 * Changing active tab handler.
			 * @param {Object} scope Context.
			 * @param {Number} tabNumber Selected tab order number.
			 * @param {Object} tabsCollection Entire tabs collection.
			 */
			onLanguageTabChange: function(scope, tabNumber, tabsCollection) {
				var previousLanguageId = this.get("ActiveLanguageId");
				if (previousLanguageId) {
					this.loadTemplateFromSheet(previousLanguageId);
				} else {
					this._addSysLanguageMultiLanguageData();
				}
				var activeLanguageId = tabsCollection.getByIndex(tabNumber).get("Id");
				this.set("ActiveLanguageId", activeLanguageId);
				this.loadTemplateIntoSheet(activeLanguageId);
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
			 * Get Save button visibility.
			 * @return {boolean} true if button is visible.
			 */
			getSaveButtonVisible: function() {
				return this.get("IsLanguagesInitialized") && !this.get("IsSheetContainerLoading") &&
					!this.get("IsPreviewItemsLoading");
			}

			//endregion

		}
	};
});


