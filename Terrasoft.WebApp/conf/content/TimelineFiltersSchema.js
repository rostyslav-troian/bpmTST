Terrasoft.configuration.Structures["TimelineFiltersSchema"] = {innerHierarchyStack: ["TimelineFiltersSchema"]};
define('TimelineFiltersSchemaStructure', ['TimelineFiltersSchemaResources'], function(resources) {return {schemaUId:'37f7f512-25dc-479a-b308-39e680b2e252',schemaCaption: "The schema of the timeline filters", parentSchemaName: "", schemaName:'TimelineFiltersSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("TimelineFiltersSchema", ["TimelineFiltersSchemaResources", "StorageUtilities", "BaseFiltersGenerateModule",
		"TimelineFilterMenu", "TimelineFilterMenuItem", "QuickFilterModuleV2", "QuickFilterViewModelV2", "css!TimelineCSS"
	],
	function(resources, StorageUtilities, BaseFiltersGenerateModule) {
		return {
			messages: {
				/**
				 * @message GetFixedFilterConfig
				 * Returns config for create period filter.
				 */
				"GetFixedFilterConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetModuleSchema
				 * Returns information about entity which works with filter.
				 */
				"GetModuleSchema": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message UpdateFilter
				 * Message handler filter events.
				 */
				"UpdateFilter": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message LookupInfo
				 * For the work of LookupUtilities.
				 */
				"LookupInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetFixedFilter
				 * Requests a filter from Quick filter module.
				 */
				"GetFixedFilter": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message TimelineFiltersChanged
				 * Sends a filters to Timeline schema.
				 */
				"TimelineFiltersChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetTimelineConfig
				 */
				"GetTimelineConfig": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetTimelineFiltersIsEmpty
				 */
				"GetTimelineFiltersIsEmpty": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SaveTimelineFilters
				 */
				"SaveTimelineFilters": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetSectionFiltersInfo
				 * For the work of filter by owner.
				 */
				"GetSectionFiltersInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			attributes: {
				/**
				 * Current filter.
				 */
				"TimelineFilters": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {}
				},

				/**
				 * Current search filter.
				 */
				"SearchText": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				// region Methods: Private

				/**
				 * Returns identifier of the QuickFilterModuleV2.
				 * @return {String} Identifier.
				 */
				_getQuickFilterModuleId: function() {
					return this.getModuleId("QuickFilterModuleV2");
				},

				/**
				 * Gets period filter from the fixed filter.
				 * @param {String} filterName Name of filter.
				 * @return {Object|null} Requested filter.
				 */
				_getFilterFromFixedFilter: function(filterName) {
					var quickFilterModuleId = this._getQuickFilterModuleId();
					var filters = this.sandbox.publish("GetFixedFilter", {
						filterName: filterName
					}, [quickFilterModuleId]);
					return Terrasoft.isEmptyObject(filters) ? null : filters;
				},

				// endregion

				// region Methods: Protected

				/**
				 * Handles apply menu button click event.
				 * @protected
				 */
				setEntityFiltersCount: function() {
					var selectedEntityFilters = this.get("SelectedEntityFilters");
					var count = this.Ext.isArray(selectedEntityFilters) ? selectedEntityFilters.length : "";
					this.set("EntityFilterCount", count);
				},

				/**
				 * Handles apply menu button click event.
				 * @protected
				 */
				onApplySelectedEntityFilters: function() {
					this.$TimelineFilters.entityFilters = this.get("SelectedEntityFilters");
					this.setEntityFiltersCount();
					this.sandbox.publish("TimelineFiltersChanged", this.$TimelineFilters, [this.sandbox.id]);
					this.saveFilter();
				},

				/**
				 * Returns menu item captiong.
				 * @protected
				 * @param {Object} entityConfig Entity Configuration.
				 * @return {String} Menu item caption.
				 */
				getMenuItemCaption: function(entityConfig) {
					if (!this.Ext.isEmpty(entityConfig.caption)) {
						return entityConfig.caption;
					}
					var entity = this.Terrasoft.configuration.EntityStructure[entityConfig.entitySchemaName];
					if (!entity || (entity && this.Ext.isArray(entity.pages) &&
							entity.pages.length === 0)) {
						return "";
					}
					var entityPageConfig;
					if (!entityConfig.typeColumnName || !entityConfig.typeColumnValue) {
						entityPageConfig = entity.pages[0];
					} else {
						entityPageConfig = this.Ext.Array.findBy(entity.pages, function(item) {
							return item.typeColumnName === entityConfig.typeColumnName &&
								item.UId === entityConfig.typeColumnValue;
						}, this);
					}
					return entityPageConfig && entityPageConfig.captionLcz;
				},

				/**
				 * Returns menu item by entity config.
				 * @protected
				 * @param {Object} entityConfig Entity Configuration.
				 * @return {Terrasoft.BaseViewModel} Menu item view model.
				 */
				getEntityFilterMenuItem: function(entityConfig) {
					var caption = this.getMenuItemCaption(entityConfig);
					var menuItem = null;
					if (!this.Ext.isEmpty(caption)) {
						menuItem = this.Ext.create("Terrasoft.BaseModel", {
							"values": {
								"Id": entityConfig.entityConfigKey,
								"Caption": caption,
								"Type": "Terrasoft.TimelineFilterMenuItem",
								"ImageUrl": entityConfig.iconUrl,
								"Checked": true
							}
						});
					}
					return menuItem;
				},

				/**
				 * Initializes entity filter menu button.
				 * @protected
				 */
				initEntityFilterMenu: function() {
					var timelineConfig = this.sandbox.publish("GetTimelineConfig", null, [this.sandbox.id]);
					this.$TimelineConfig = timelineConfig;
					var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.Terrasoft.each(timelineConfig.entities, function(entity) {
						var menuItem = this.getEntityFilterMenuItem(entity);
						if (!this.Ext.isEmpty(menuItem)) {
							menuItems.addItem(menuItem);
						}
					}, this);
					menuItems.sortByFn(function(item1, item2) {
						return item1.$Caption.localeCompare(item2.$Caption);
					});
					this.set("EntityFilterButtonMenuItems", menuItems);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @override
				 */
				onRender: function() {
					this.callParent(arguments);
					this.setEntityFiltersCount();
					this.initUserFilters();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeSandboxEvents();
					this.initEntityFilterMenu();
				},

				/**
				 * Subscribes on sandbox events.
				 * @protected
				 */
				subscribeSandboxEvents: function() {
					var sandbox = this.sandbox;
					var quickFilterModuleId = this._getQuickFilterModuleId();
					sandbox.subscribe("GetFixedFilterConfig", this.getFixedFiltersConfig, this, [quickFilterModuleId]);

					sandbox.subscribe("GetModuleSchema", function() {
						return this.getEntityForFixedFilter();
					}, this, [quickFilterModuleId]);

					sandbox.subscribe("UpdateFilter", this.onFilterUpdate, this, [quickFilterModuleId]);

					sandbox.subscribe("LookupInfo", function() {
						return this.getOwnerLookupInfo();
					}, this, [quickFilterModuleId + "_LookupPage"]);

					sandbox.subscribe("GetTimelineFiltersIsEmpty", this.onGetTimelineFiltersAreEmpty, this, [sandbox.id]);

					sandbox.subscribe("SaveTimelineFilters", this.saveFilter, this, [sandbox.id]);

					this.sandbox.subscribe("GetSectionFiltersInfo", function() {
						return this.getSectionFiltersInfo();
					}, this, [quickFilterModuleId]);
				},

				/**
				 * Gets filter info for filter by owner.
				 * @protected
				 * @return {Object} Filter info.
				 */
				getSectionFiltersInfo: function() {
					var filtersInfo = Ext.create("Terrasoft.Collection");
					filtersInfo.add("FixedFilters", {
						"Owner": this.$TimelineFilters.ownerFilter
					});
					return filtersInfo;
				},

				/**
				 * Gets lookup info for select owner.
				 * @protected
				 * @return {Object} Lookup info.
				 */
				getOwnerLookupInfo: function() {
					return {
						entitySchemaName: "Contact",
						filters: BaseFiltersGenerateModule.OwnerFilter()
					};
				},

				/**
				 * Inits user filters setting.
				 * @protected
				 */
				initUserFilters: function() {
					var profileKey = this.getProfileKey();
					var sessionFilters = StorageUtilities.getItem("TimelineFilters", profileKey);
					if (this.isEmpty(sessionFilters)) {
						var profileFilters = this.getProfileFilters();
						this.$TimelineFilters = profileFilters;
					} else {
						this.$TimelineFilters = sessionFilters;
					}
					if (this.$TimelineFilters.entityFilters) {
						this.set("SelectedEntityFilters", this.$TimelineFilters.entityFilters);
						this.setEntityFiltersCount();
					}
					delete this.$TimelineFilters.searchKey;
				},

				/**
				 * Gets profile filters.
				 * @protected
				 * @return {Object} Profile filters.
				 */
				getProfileFilters: function() {
					var profile = this.getProfile();
					var profileFilters = profile.timelineFilters || {};
					if (profile && profile.timelineFilters && profile.timelineFilters.periodFilter) {
						var periodFilter = profile.timelineFilters.periodFilter;
						periodFilter.startDate = periodFilter.startDate ? new Date(periodFilter.startDate) : null;
						periodFilter.dueDate = periodFilter.dueDate ? new Date(periodFilter.dueDate) : null;
						profileFilters = profile.timelineFilters;
					}
					return profileFilters;
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#getProfileKey
				 * @override
				 */
				getProfileKey: function() {
					return this.$CardSchemaName + "TimelineFilters";
				},

				/**
				 * Returns entity for create fixed filter.
				 * @protected
				 * @return {Terrasoft.BaseEntitySchema} Entity.
				 */
				getEntityForFixedFilter: function() {
					return this.Ext.create("Terrasoft.BaseEntitySchema", {
						columns: {
							"StartDate": {},
							"DueDate": {},
							"Owner": {}
						}
					});
				},

				/**
				 * Sends a filter to Timeline schema.
				 * @protected
				 * @param {Object} filters Filters.
				 */
				onFilterUpdate: function(filters) {
					var periodFilter = this._getFilterFromFixedFilter("PeriodFilter");
					var ownerFilter = this._getFilterFromFixedFilter("Owner");
					periodFilter = !periodFilter.startDate && !periodFilter.dueDate ? null : periodFilter;
					this.$TimelineFilters.periodFilter = periodFilter;
					this.$TimelineFilters.ownerFilter = ownerFilter;
					this.sandbox.publish("TimelineFiltersChanged", this.$TimelineFilters, [this.sandbox.id]);
					if (!filters || filters.key) {
						this.saveFilter();
					}
				},

				/**
				 * Sets search filter and to Timeline schema.
				 * @protected
				 */
				setSearchFilter: function() {
					this.$TimelineFilters.searchKey = this.$SearchText;
					this.sandbox.publish("TimelineFiltersChanged", this.$TimelineFilters, [this.sandbox.id]);
				},

				/**
				 * Saves a filter to local storage and profile.
				 * @protected
				 * @param {Object} timelineFilters Timeline filters.
				 */
				saveFilter: function(timelineFilters) {
					var profileKey = this.getProfileKey();
					timelineFilters = timelineFilters || this.$TimelineFilters;
					timelineFilters = this.Terrasoft.deepClone(timelineFilters);
					delete timelineFilters.searchKey;
					Terrasoft.saveUserProfile(profileKey, {
						timelineFilters: timelineFilters
					}, false);
					StorageUtilities.setItem(timelineFilters, "TimelineFilters", profileKey);
				},

				/**
				 * Returns default config of fixed filter.
				 * @protected
				 * @return {Object} Filter config.
				 */
				getFixedFiltersConfig: function() {
					var periodFilter = this.$TimelineFilters.periodFilter || {};
					var ownerFilter = this.$TimelineFilters.ownerFilter || {};
					return {
						entitySchema: this.entitySchema,
						filters: [{
							name: "PeriodFilter",
							dataValueType: this.Terrasoft.DataValueType.DATE,
							startDate: {
								columnName: "StartDate",
								defValue: periodFilter.startDate || null
							},
							dueDate: {
								columnName: "DueDate",
								defValue: periodFilter.dueDate || null
							},
							dayButtonVisible: false,
							weekButtonVisible: false
						}, {
							name: "Owner",
							caption: resources.localizableStrings.OwnerFilterCaption,
							columnName: "Owner",
							defValue: ownerFilter.value || null,
							dataValueType: Terrasoft.DataValueType.LOOKUP
						}]
					};
				},

				/**
				 * Returns timeline configuration.
				 * @protected
				 * @return {Object} Timeline configuration.
				 */
				getTimelineConfig: function() {
					var timelineConfig = this.$TimelineConfig || {};
					var timelineEntities = timelineConfig.entities || {};
					var timelineFilters = this.$TimelineFilters || {};
					return {
						timelineEntities: timelineEntities,
						timelineFilters: timelineFilters
					};
				},

				/**
				 * Checks that the timeline filters are empty.
				 * @protected
				 * @return {Boolean} True if filters are empty, otherwise false.
				 */
				onGetTimelineFiltersAreEmpty: function() {
					var config = this.getTimelineConfig();
					var timelineEntities = config.timelineEntities;
					var periodFilter = config.timelineFilters.periodFilter;
					var ownerFilter = config.timelineFilters.ownerFilter;
					var entityFilters = config.timelineFilters.entityFilters;
					var searchKey = config.timelineFilters.searchKey;
					var isFixedFiltersEmpty = this.isEmpty(periodFilter) && this.isEmpty(ownerFilter);
					var isTimelineFiltersObjectEmpty = this.isEmpty(config.timelineFilters);
					var isTimelineFiltersEmpty = (this.isEmpty(searchKey) && isFixedFiltersEmpty &&
						!this.Ext.isArray(entityFilters) && this.isEmpty(entityFilters));
					var isEntityFiltersEmpty = (this.isEmpty(searchKey) && isFixedFiltersEmpty &&
						!this.isEmpty(entityFilters) && entityFilters.length === timelineEntities.length);
					return (isTimelineFiltersObjectEmpty || isTimelineFiltersEmpty || isEntityFiltersEmpty);
				},

				/**
				 * Returns "true" when value isn't empty.
				 * @protected
				 * @param {Boolean} value Binded value.
				 * @return {Boolean} Not empty value sign.
				 */
				isNotEmptyValue: function(value) {
					return !this.Ext.isEmpty(value);
				}

				// endregion

			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"name": "TimelineFiltersContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-filters-container"]
					},
					"items": []
				},
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "SearchText",
				"parentName": "TimelineFiltersContainer",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.SHORT_TEXT,
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"classes": {
						"wrapClassName": ["timeline-search-control"]
					},
					"controlConfig": {
						"hasClearIcon": true,
						"enableRightIcon": true,
						"rightIconClick": {
							"bindTo": "setSearchFilter"
						},
						"rightIconConfig": {
							"source": Terrasoft.ImageSources.URL,
							"url": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.LookUpIcon)
						},
						"placeholder": {
							"bindTo": "Resources.Strings.SearchPlaceHolder"
						}
					},
					"cleariconclick": {
						"bindTo": "setSearchFilter"
					},
					"enterkeypressed": {
						"bindTo": "setSearchFilter"
					},
					"labelConfig": {
						"visible": false
					},
					"value": {
						"bindTo": "SearchText"
					}
				}
			}, {
				"operation": "insert",
				"name": "TimelineEntityFilterContainer",
				"parentName": "TimelineFiltersContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-entity-filter-container"]
					},
					"items": []
				},
				"propertyName": "items"
			}, {
				"operation": "insert",
				"name": "EntityFilterCountLabel",
				"parentName": "TimelineEntityFilterContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"classes": {
						"labelClass": ["timeline-entity-filter-count-label"]
					},
					"caption": {
						"bindTo": "EntityFilterCount"
					},
					"visible": {
						"bindTo": "EntityFilterCount",
						"bindConfig": {
							"converter": "isNotEmptyValue"
						}
					}
				}
			}, {
				"operation": "insert",
				"name": "EntityFilterButton",
				"parentName": "TimelineEntityFilterContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"menuClass": "Terrasoft.TimelineFilterMenu",
					"imageConfig": {
						"bindTo": "Resources.Images.FilterImage"
					},
					"classes": {
						"imageClass": ["timeline-entity-filter-image"]
					},
					"menu": {
						"selectedItems": {
							"bindTo": "SelectedEntityFilters"
						},
						"applyButtonConfig": {
							"caption": {
								"bindTo": "Resources.Strings.ApplyEntityFilterButtonCaption"
							},
							"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
							"click": {
								"bindTo": "onApplySelectedEntityFilters"
							}
						},
						"items": {
							"bindTo": "EntityFilterButtonMenuItems"
						}
					}
				}
			}, {
				"operation": "insert",
				"name": "TimelineFixedFiltersModule",
				"parentName": "TimelineFiltersContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["timeline-fixed-filter-module"]
					},
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "QuickFilterModuleV2",
					"instanceConfig": {
						"moduleConfig": {
							"FixedFilters": {
								"viewConfigModuleName": "FixedFilterViewV2",
								"viewModelConfigModuleName": "FixedFilterViewModelV2",
								"configPropertyName": "fixedFilterConfig"
							}
						}
					}
				}
			}] /**SCHEMA_DIFF*/
		};
	}
);


