Terrasoft.configuration.Structures["LanguageTabMixin"] = {innerHierarchyStack: ["LanguageTabMixin"]};
define("LanguageTabMixin", [], function() {
	/**
	 * @class Terrasoft.configuration.mixins.LanguageTabMixin
	 * Language tabs mixin.
	 */
	Ext.define("Terrasoft.configuration.mixins.LanguageTabMixin", {
		alternateClassName: "Terrasoft.LanguageTabMixin",

		/**
		 * Menu collection.
		 */
		menuLanguageCollection: null,

		/**
		 * Languages collection.
		 */
		languages: null,
		/**
		 * Available for added languages collection.
		 * @private
		 * @type {Terrasoft.BaseViewModelCollection}
		 */
		availableLanguages: null,

		/**
		 * System language.
		 */
		sysLanguage: null,

		/**
		 * Multilingual entity schema name.
		 */
		multilingualEntitySchemaName: null,

		/**
		 * Connection to parent entity column name.
		 */
		multilingualConnectionColumnName: null,

		/**
		 * Multilingual entity identifier.
		 */
		recordId: null,

		/**
		 * Multilingual column list.
		 */
		multilingualColumnList: null,

		/**
		 * Conf object for delete menu item.
		 */
		deleteMenuItemConf: null,

		/**
		 * Conf object for add menu item.
		 */
		addMenuItemConf: null,

		/**
		 * Conf object for addFromQuickMenu menu item.
		 */
		addMenuItemFromQuickMenuConf: null,

		// region Methods: Private

		/**
		 * Clear previous menu values.
		 * @private
		 */
		_clearMenuCollection: function() {
			var menuCollection = this.menuLanguageCollection;
			menuCollection.clear();
		},

		/**
		 * Returns query for getting the languages.
		 * @returns {Terrasoft.EntitySchemaQuery} Esq for getting the languages.
		 * @private
		 */
		_getLanguagesListEsq: function() {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: this.multilingualEntitySchemaName
			});
			this._addLanguagesColumns(esq);
			this._addMultiLanguageColumns(esq);
			esq.filters.add("IsUsedFilter", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Language.IsUsed", 1));
			esq.filters.add("IsNotDefaultLanguageFilter", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.NOT_EQUAL, "Language.Id", this.sysLanguage.Id));
			esq.filters.add("ParentIsCurrentEntity", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, this.multilingualConnectionColumnName,
				this.recordId));
			return esq;
		},

		/**
		 * Add language columns into multilingual query.
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @private
		 */
		_addLanguagesColumns: function(esq) {
			esq.addColumn("Language.Id", "LanguageId");
			esq.addColumn("Language.Name", "LanguageName");
			esq.addColumn("Language.Code", "LanguageCode");
		},

		/**
		 * Add multilingual columns into multilingual query.
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @private
		 */
		_addMultiLanguageColumns: function(esq) {
			Terrasoft.each(this.multilingualColumnList, function(column) {
				esq.addColumn(column.name);
			}, this);
		},

		/**
		 * Add primary language from SysLanguage to language collection as first element.
		 * @private
		 */
		_addSysLanguageToCollection: function() {
			var sysLn = this.sysLanguage;
			var languageItem = this.generateLangItem(this.recordId, sysLn);
			languageItem.set("ExistRecord", true);
			languageItem.set("IsUsed", true);
			this.addLanguageWithoutMultiLangContent(languageItem);
		},

		//endregion

		// region Methods: Protected

		/**
		 * Add delete menu item into MenuLanguageCollection.
		 * @protected
		 */
		addDeleteMenuItem: function() {
			var menuItems = this.menuLanguageCollection;
			menuItems.addItem(Ext.create("Terrasoft.BaseViewModel", {
				values: Ext.apply({}, this.deleteMenuItemConf, {
					Id: Terrasoft.generateGUID(),
					Caption: "",
					MarkerValue: this.deleteMenuItemConf.Caption})
			}));
		},

		/**
		 * Inserts multilingual record.
		 * @param {String} languageId for multilingual record.
		 * @param {String} copyRecordId uniqueidentifier of language from which need to copy data.
		 * @protected
		 */
		addMultiLanguageEntity: function(languageId, copyRecordId) {
			var language = this.getLanguageData(languageId);
			var languageItem = this.generateLangItem(Terrasoft.generateGUID(), language);
			languageItem.set("IsUsed", true);
			if (copyRecordId) {
				languageItem.set("MultiLanguageContent",
					this.copyMultiLanguageContentFromLanguage(copyRecordId));
			}
			this.addLanguageWithoutMultiLangContent(languageItem);
			this.availableLanguages.removeByKey(language.Id);
			this.reInitializeLanguageTabPanelMenuItems();
		},

		/**
		 * Get language params from AvailableLanguages collection.
		 * @param {String} languageId language identifier.
		 * @returns {Object} language params
		 * @protected
		 */
		getLanguageData: function(languageId) {
			var languageCollection = this.availableLanguages;
			var language = languageCollection.find(languageId);
			return language.values;
		},

		/**
		 * Add menu separator into MenuLanguageCollection.
		 * @protected
		 */
		addMenuItemSeparator: function() {
			var menuItems = this.menuLanguageCollection;
			menuItems.addItem(Ext.create("Terrasoft.BaseViewModel", {
				values: {
					Id: Terrasoft.generateGUID(),
					Type: "Terrasoft.MenuSeparator",
					Click: null,
					Caption: "",
					MarkerValue: ""
				}
			}
			));
		},

		/**
		 * Update exist multilingual entities.
		 * @param {Terrasoft.BatchQuery} batchQuery Query for all operations.
		 * @protected
		 */
		updateExistMultiLanguageEntities: function(batchQuery) {
			var languages = this.languages;
			var languageToUpdate = languages.filter(function(item) {
				return item.get("ExistRecord") && item.get("RecordUpdated");
			});
			Terrasoft.each(languageToUpdate, function(language) {
				if (language.get("Id") !== this.sysLanguage.Id) {
					var update = this.getContentsUpdateEsq(language);
					this.addMultiLanguageContentEsq(language, update);
					batchQuery.add(update);
				}
			}, this);
		},

		/**
		 * Creates update query for Multilingual entity.
		 * @param {Terrasoft.BaseViewModel} language Multilingual entity.
		 * @returns {Terrasoft.UpdateQuery} Update query.
		 * @protected
		 */
		getContentsUpdateEsq: function(language) {
			var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: this.multilingualEntitySchemaName
			});
			updateQuery.filters.add("languageIdFilter", updateQuery.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Language", language.get("Id")));
			updateQuery.filters.add("recordIdFilter", updateQuery.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, this.multilingualConnectionColumnName,
				this.recordId));
			return updateQuery;
		},

		/**
		 * Creates new multilingual entities.
		 * @param {Terrasoft.BatchQuery} batchQuery Multilingual entity.
		 * @protected
		 */
		insertNewMultiLanguageEntities: function(batchQuery) {
			var languages = this.languages;
			var languagesToInsert = languages.filter(function(item) {
				return !item.get("ExistRecord");
			});
			Terrasoft.each(languagesToInsert, function(language) {
				if (language.get("Id") !== this.sysLanguage.Id) {
					var insert = this.getContentsInsertEsq(language);
					this.addMultiLanguageContentEsq(language, insert);
					language.set("ExistRecord", true, {silent: true});
					batchQuery.add(insert);
				}
			}, this);
		},

		/**
		 * Get insert query for multilingual record.
		 * @param {Terrasoft.BaseViewModel} language which will be added for current record.
		 * @returns {Terrasoft.InsertQuery} Insert Query for record.
		 * @protected
		 */
		getContentsInsertEsq: function(language) {
			var insert = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: this.multilingualEntitySchemaName
			});
			insert.setParameterValue("Language", language.get("Id"), Terrasoft.DataValueType.GUID);
			insert.setParameterValue(this.multilingualConnectionColumnName,
				this.recordId, Terrasoft.DataValueType.GUID);
			insert.setParameterValue("Id",
				language.recordId, Terrasoft.DataValueType.GUID);
			return insert;
		},


		/**
		 * Create update queries to SysLanguage, set IsUsed column true.
		 * @param {Terrasoft.BatchQuery} batchQuery Query for all operations.
		 * @protected
		 */
		updateNotUsedMultilanguages: function(batchQuery) {
			var languages = this.languages;
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
		 * @returns {Terrasoft.UpdateQuery} Update query.
		 * @protected
		 */
		getSysLanguageUpdateQuery: function(language) {
			var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "SysLanguage"
			});
			updateQuery.filters.add("IdFilter", updateQuery.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Id", language.get("Id")));
			updateQuery.setParameterValue("IsUsed", true, Terrasoft.DataValueType.BOOLEAN);
			return updateQuery;
		},

		/**
		 * Add Menu items which always exist.
		 * @protected
		 */
		addAddLanguageMenuItem: function() {
			var menuItems = this.menuLanguageCollection;
			menuItems.addItem(Ext.create("Terrasoft.BaseViewModel", {values:
					Ext.apply({}, this.addMenuItemConf, {
						Id: Terrasoft.generateGUID(),
						Caption: "",
						MarkerValue: this.addMenuItemConf.Caption
				})
			}));
		},

		/**
		 * Adds to menu languages that have IsUsed column value true.
		 * @protected
		 * @virtual
		 */
		addActiveLanguagesMenuItems: function() {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
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
		 * Add filter IsUsedFilter to filters with params state.
		 * @param {Object} filters object which will be extend.
		 * @param {Number} state state of the filter.
		 * @protected
		 */
		addIsUsedFilter: function(filters, state) {
			filters.add("IsUsedFilter", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "IsUsed", state)
			);
		},

		/**
		 * Add language to AvailableLanguages collection.
		 * @param {String} id Language identifier.
		 * @param {String} caption Language caption.
		 * @param {String} name Language name.
		 * @param {String} code Language code.
		 * @protected
		 * @virtual
		 */
		addLanguageToAvailableLanguagesCollection: function(id, caption, name, code) {
			var languages = this.availableLanguages;
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
		 * Add language item to AvailableLanguages collection.
		 * @param {Terrasoft.BaseViewModel} item Language collection item.
		 * @protected
		 * @virtual
		 */
		addLanguageToAvailableCollection: function(item) {
			var languages = this.availableLanguages;
			var languageViewModel = Ext.create("Terrasoft.BaseViewModel", {
				"values": {
					"Id": item.get("Id"),
					"Caption": item.get("Name"),
					"Name": item.get("Name"),
					"Code": item.get("Code")
				}
			});
			languages.add(item.get("Id"), languageViewModel);
		},

		/**
		 * Creates language lookup filter.
		 * @protected
		 * @virtual
		 * @returns {Terrasoft.FilterGroup} Returns lookup filter.
		 */
		getLanguageLookupFilterConfig: function() {
			var filters = Ext.create("Terrasoft.FilterGroup");
			var languages = this.languages;
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
		 * Add language to menu with custom tag.
		 * @param {String} languageName Language name .
		 * @param {String} tag Language identifier which will be used as tag.
		 * @protected
		 */
		addMenuItem: function(languageName, tag) {
			var menuItems = this.menuLanguageCollection;
			menuItems.addItem(Ext.create("Terrasoft.BaseViewModel", {values: Ext.apply({},
					this.addMenuItemFromQuickMenuConf, {
					"Caption": languageName,
					"MarkerValue": languageName,
					"Tag": tag
				})
			}));
		},

		/**
		 * Work with SysLanguage coolection. Add values to AvailableLanguages and menu.
		 * @param {Object} result Language identifier.
		 * @protected
		 */
		addAvailableLanguages: function(result) {
			if (result.success) {
				result.collection.each(
					function(item) {
						var languageName = item.get("LanguageName");
						var languageId = item.get("LanguageId");
						this.addLanguageToAvailableLanguagesCollection(
							languageId,
							languageName,
							languageName,
							item.get("LanguageCode"));
						this.addMenuItem(languageName, languageId);
					}, this);
				this.addMenuItemSeparator();
				this.addAddLanguageMenuItem();
			}
		},

		/**
		 * Add language to language collection with custom parameters.
		 * @param {String} recordId multilingual uniqueidentifier.
		 * @param {Object} language language values.
		 * @protected
		 */
		generateLangItem: function(recordId, language) {
			var multiLanguageContent = this.getMultiLanguageDataForLanguageCollection();
			return Ext.create("Terrasoft.BaseViewModel", {
				"values": {
					"Id": language.Id,
					"Caption": language.Name,
					"Name": language.Name,
					"Code": language.Code,
					"RecordId": recordId,
					"MultiLanguageContent": multiLanguageContent,
					"ExistRecord": false,
					"IsUsed": false,
					"RecordUpdated": false
				}
			});
		},

		/**
		 * Get language data(multilingual columns from exist record).
		 * @param {Terrasoft.BaseViewModel} item Multilingual data.
		 * @returns {Array} Columns and its values.
		 * @protected
		 */
		getMultiLanguageDataForLanguageCollection: function(item) {
			return this.multilingualColumnList.map(function(columnItem) {
					return {
						"name": columnItem.name,
						"value": item ? item.get(columnItem.name) : ""
					};
				}, this);
		},

		/**
		 * Add menu items from Available languages.
		 * @protected
		 */
		addMenuItemsFromAvailableLanguages: function() {
			var languages = this.availableLanguages;
			languages.each(function(item) {
				this.addMenuItem(item.get("Name"), item.get("Id"));
			}, this);
		},

		/**
		 * Initialize menu items collection using Available languages and static items.
		 * @protected
		 */
		reInitializeLanguageTabPanelMenuItems: function() {
			this._clearMenuCollection();
			this.addDeleteMenuItem();
			this.addMenuItemSeparator();
			this.addMenuItemsFromAvailableLanguages();
			this.addMenuItemSeparator();
			this.addAddLanguageMenuItem();
		},


		/**
		 * Add language to language collection with custom parameters.
		 * @param {Terrasoft.BaseViewModel} languageItem language values.
		 * @protected
		 */
		addLanguageWithoutMultiLangContent: function(languageItem) {
			var languages = this.languages;
			languages.add(languageItem.get("Id"), languageItem);
		},

		/**
		 * Make copy of multilingual content of language.
		 * @param {String} languageId uniqueidentifier of language.
		 * @protected
		 * @returns {Terrasoft.BaseViewModel} Returns copied MultiLanguageContent.
		 */
		copyMultiLanguageContentFromLanguage: function(languageId) {
			var languageData = this.languages.find(languageId);
			return Terrasoft.deepClone(languageData.get("MultiLanguageContent"));
		},

		//endregion

		// region Methods: Public

		/**
		 * Initializes the initial values of the mixin.
		 * @public
		 */
		init: function() {
			this.menuLanguageCollection = Ext.create("Terrasoft.BaseViewModelCollection");
			this.languages = Ext.create("Terrasoft.BaseViewModelCollection");
			this.availableLanguages = Ext.create("Terrasoft.BaseViewModelCollection");
		},

		/**
		 * Returns menu collection.
		 * @return {Terrasoft.BaseViewModelCollection} Menu collection.
		 * @public
		 */
		getMenuLanguageCollection: function() {
			return this.menuLanguageCollection;
		},

		/**
		 * Returns language collection.
		 * @return {Terrasoft.BaseViewModelCollection} Languages collection.
		 * @public
		 */
		getLanguagesCollection: function() {
			return this.languages;
		},

		/**
		 * Add multilingual queries to batch.
		 * @param {Terrasoft.BatchQuery} batchQuery Query for all operations.
		 * @public
		 */
		addMultiLangQueries: function(batchQuery) {
			this.updateExistMultiLanguageEntities(batchQuery);
			this.insertNewMultiLanguageEntities(batchQuery);
			this.updateNotUsedMultilanguages(batchQuery);
		},

		/**
		 * Add multilingual columns to query.
		 * @param {Terrasoft.BaseViewModel} language Multilingual entity.
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @public
		 */
		addMultiLanguageContentEsq: function(language, esq) {
			Terrasoft.each(this.multilingualColumnList, function(item) {
				esq.setParameterValue(item.name,
					language.get("MultiLanguageContent").find(function(contentItem) {
						return contentItem.name === item.name;
					}, this).value, Terrasoft.DataValueType.TEXT);
			}, this);
		},

		/**
		 * Deletes active language.
		 * @param {Object} language Active language.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function's scope.
		 * @public
		 * @virtual
		 */
		deleteLanguage: function(language, callback, scope) {
			var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
				rootSchemaName: this.multilingualEntitySchemaName
			});
			var contentIdFilter = Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, this.multilingualConnectionColumnName,
				this.recordId);
			var languageFilter = Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Language", language.id);
			deleteQuery.filters.add("contentIdFilter", contentIdFilter);
			deleteQuery.filters.add("languageFilter", languageFilter);
			deleteQuery.execute(function(response) {
				if (response.success) {
					var languages = this.languages;
					var languageItem = languages.find(language.id);
					languages.removeByKey(language.id);
					if (languageItem.get("IsUsed")) {
						this.addLanguageToAvailableCollection(languageItem);
					}
					if (callback) {
						callback.call(scope || this);
					}
					this.reInitializeLanguageTabPanelMenuItems();
				}
			}, this);
		},

		/**
		 * Load language collection from database.
		 * @param {Object} config Config can contains callback function and scope of callback function.
		 * @public
		 */
		loadLanguageCollection: function(config) {
			var languagesEsq = this._getLanguagesListEsq();
			languagesEsq.getEntityCollection(function(result) {
				if (result.success) {
					result.collection.each(
						function(item) {
							this.addLanguageItemToCollection(item);
						}, this);
					this.initLanguageTabPanelMenuItems();
					if (config && config.callback) {
						config.callback.call(config.scope || this);
					}
				}
			}, this);
		},

		/**
		 * Add language data(exist multilingual record) to language collection.
		 * @param {Terrasoft.BaseViewModel} item Language data.
		 * @public
		 */
		addLanguageItemToCollection: function(item) {
			var languages = this.languages;
			var id = item.get("LanguageId");
			var multiLanguageContent = this.getMultiLanguageDataForLanguageCollection(item);
			var languageViewModel = Ext.create("Terrasoft.BaseViewModel", {
				"values": {
					"Id": id,
					"Caption": item.get("LanguageName"),
					"Name": item.get("LanguageName"),
					"Code": item.get("LanguageCode"),
					"RecordId": item.get("Id"),
					"MultiLanguageContent": multiLanguageContent,
					"ExistRecord": true,
					"IsUsed": true
				}
			});
			languages.add(id, languageViewModel);
		},

		/**
		 * Setup menu items collection.
		 * @public
		 * @virtual
		 */
		initLanguageTabPanelMenuItems: function() {
			this._clearMenuCollection();
			this.availableLanguages.clear();
			this.addDeleteMenuItem();
			this.addMenuItemSeparator();
			this.addActiveLanguagesMenuItems();
		},

		/**
		 * Add new multilingual entity with defult settings.
		 * @param {Object} language Lookup data.
		 * @param {String} copyRecordId uniqueidentifier of language from which need to copy data.
		 * @public
		 */
		addLanguageWithoutMultilangContentWithDefaultSettings: function(language, copyRecordId) {
			var languageItem = this.generateLangItem(Terrasoft.generateGUID(), language);
			if (copyRecordId) {
				languageItem.set("MultiLanguageContent",
					this.copyMultiLanguageContentFromLanguage(copyRecordId));
			}
			this.addLanguageWithoutMultiLangContent(languageItem);
		},

		/**
		 * Returns language lookup config.
		 * @public
		 * @virtual
		 * @returns {Object} Returns lookup config.
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
		 * Add MultiLanguage entity to card.
		 * @param {String} tag point on which user click.
		 * @param {String} languageId uniqueidentifier of language.
		 * @public
		 */
		addLanguageFromQuickMenu: function(tag, languageId) {
			this.addMultiLanguageEntity(tag, languageId);
		},

		/**
		 * Apply mixin properties from config.
		 * @param {Object} config Applying mixins properties.
		 * @public
		 */
		applyMixinParameters: function(config) {
			Ext.apply(this, config);
			this._addSysLanguageToCollection();
		}

		//endregion
	});

	return Terrasoft.LanguageTabMixin;
});


