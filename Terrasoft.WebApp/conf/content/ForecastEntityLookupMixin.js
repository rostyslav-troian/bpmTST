Terrasoft.configuration.Structures["ForecastEntityLookupMixin"] = {innerHierarchyStack: ["ForecastEntityLookupMixin"]};
define("ForecastEntityLookupMixin", ["ForecastEntityLookupMixinResources", "SectionDesignerEnums",
	"css!ForecastEntityLookupMixin", "SectionManager"],
	function(resources, SectionDesignerEnums) {
		/**
		 * @class Terrasoft.configuration.mixins.ForecastEntityLookupMixin
		 * Provides methods for search forecast objects.
		 */
		Ext.define("Terrasoft.configuration.mixins.ForecastEntityLookupMixin", {
			alternateClassName: "Terrasoft.ForecastEntityLookupMixin",

			/**
			 * Initializes mixin.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of function.
			 */
			init: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						Terrasoft.SectionManager.initialize(next);
					},
					function(next) {
						Terrasoft.EntitySchemaManager.initialize(next);
					},
					function() {
						Ext.callback(callback, scope);
					}
				);
			},

			/**
			 * @private
			 */
			_getSectionEntitiesList: function() {
				const lookupList = {};
				this._addSeparatorItem(lookupList, resources.localizableStrings.SectionSeparatorCaption);
				let sections = this._getOnlySections();
				sections = this._filterSystemSections(sections);
				sections.each(function(item) {
					const entitySchema = this.Terrasoft.EntitySchemaManager.findItemByName(item.code);
					if (this.isNotEmpty(entitySchema)) {
						const entitySchemaUId = entitySchema.uId;
						lookupList[entitySchemaUId] = {
							value: entitySchemaUId,
							displayValue: item.caption,
							Name: entitySchema.name
						};
					}
				}, this);
				return lookupList;
			},

			/**
			 * @private
			 */
			_getOnlySections: function() {
				return this.Terrasoft.SectionManager.filterByFn(function(item) {
					const viewModel = item.dataManagerItem.viewModel;
					return this.isNotEmpty(viewModel.$SectionModuleSchemaUId);
				}, this);
			},

			/**
			 * @private
			 */
			_filterSystemSections: function(sections) {
				return sections.filter(function(item) {
					return item.isSystem === false;
				});
			},

			/**
			 * @private
			 */
			_addSeparatorItem: function(lookupList, caption) {
				lookupList[this.Terrasoft.generateGUID()] = this._getSeparator(caption);
			},

			/**
			 * @private
			 */
			_getSeparator: function(name) {
				return {
					value: this.Terrasoft.generateGUID(),
					isSeparatorItem: true,
					customHtml: this._getSeparatorHtml(name)
				};
			},

			/**
			 * @private
			 */
			_getSeparatorHtml: function(name) {
				return "<li class=\"separator-header\"><div>" + name.toUpperCase() + "</div></li>";
			},

			/**
			 * @private
			 */
			_getSortedListByDisplayValue: function(list) {
				const sortedList = this.Ext.create("Terrasoft.Collection", {
					getKey: function(item) {
						return item.value;
					}
				});
				sortedList.reloadAll(list);
				const sortColumn = "displayValue";
				sortedList.sortByFn(function(item1, item2) {
					const item1Caption = item1[sortColumn] || "";
					const item2Caption = item2[sortColumn] || "";
					return item1Caption.localeCompare(item2Caption);
				});
				return sortedList;
			},

			/**
			 * Prepares list for 'ForecastEntity' lookup.
			 * @param {String} filter Filter value.
			 * @param {Terrasoft.Collection} list Lookup list.
			 */
			prepareForecastEntityList: function(filter, list) {
				if (!list) {
					return;
				}
				if (this.Ext.isEmpty(filter)) {
					const loadList = this._getSortedListByDisplayValue(this._getSectionEntitiesList());
					list.reloadAll(loadList);
					return;
				}
				if (this.Ext.isEmpty(this.allEntitiesList)) {
					this.loadNextForecastEntities({ list: list });
					return;
				}
				list.reloadAll(this.allEntitiesList);
			},

			/**
			 * Loads next entities captions.
			 * @param {Object} listParams Parameters of list.
			 */
			loadNextForecastEntities: function(listParams) {
				if (!this.Ext.isEmpty(this.allEntitiesList) && !this.Ext.isEmpty(listParams.filterValue)) {
					return;
				}
				const list = listParams.list;
				const allEntities = {};
				const sectionList = this._getSectionEntitiesList();
				const sortedList = this._getSortedListByDisplayValue(sectionList);
				sortedList.add(this.Terrasoft.generateGUID(),
					this._getSeparator(resources.localizableStrings.OtherObjectsSeparatorCaption));
				const filteredItems = this.Terrasoft.EntitySchemaManager.getItems()
					.filterByFn(this._filterEntityItems.bind(this, sectionList), this);
				filteredItems.each(function(entitySchema) {
					const entitySchemaUId = entitySchema.uId;
					if (entitySchema.getExtendParent() || this.isNotEmpty(sectionList[entitySchemaUId])) {
						return;
					}
					allEntities[entitySchemaUId] = {
						value: entitySchemaUId,
						displayValue: entitySchema.caption,
						Name: entitySchema.name
					};
				}, this);
				sortedList.loadAll(this._getSortedListByDisplayValue(allEntities));
				this.allEntitiesList = sortedList;
				list.reloadAll(sortedList);
			},

			/**
			 * @private
			 */
			_filterEntityItems: function(sectionList, item) {
				const isNotVirtual = !item.getIsVirtual();
				const notInSectionList = this.isEmpty(sectionList[item.uId]);
				const isValidName = this._isValidByName(item.name);
				const isExtendBaseObjects = this._isExtendBaseObjects(item.parentUId);
				const isExtendEntityInForecastCell = this._isExtendEntityInForecastCell(item.parentUId);
				const isValidParent = !(isExtendBaseObjects || isExtendEntityInForecastCell || item.getExtendParent());
				return isNotVirtual && notInSectionList && isValidName && isValidParent;
			},

			/**
			 * @private
			 */
			_isValidByName: function(name) {
				const isNotSystemName = !name.startsWith("Sys");
				const isNotViewName = !name.startsWith("Vw");
				return isNotSystemName && isNotViewName;
			},

			/**
			 * @private
			 */
			_isExtendBaseObjects: function(parentUId) {
				const baseObjectsList = [
					SectionDesignerEnums.BaseSchemeUIds.BASE_ENTITY_IN_TAG,
					SectionDesignerEnums.BaseSchemeUIds.BASE_FILE,
					SectionDesignerEnums.BaseSchemeUIds.BASE_FOLDER,
					SectionDesignerEnums.BaseSchemeUIds.BASE_ITEM_IN_FOLDER,
					SectionDesignerEnums.BaseSchemeUIds.BASE_TAG
				];
				return this.Terrasoft.contains(baseObjectsList, parentUId);
			},

			/**
			 * @private
			 */
			_isExtendEntityInForecastCell: function(parentUId) {
				return parentUId === "3a622ca4-e1ea-4273-8b41-c20129310fd7";
			}

		});

		return Terrasoft.ForecastEntityLookupMixin;

	});


