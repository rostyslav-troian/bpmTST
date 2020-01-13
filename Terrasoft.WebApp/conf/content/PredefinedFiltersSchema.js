Terrasoft.configuration.Structures["PredefinedFiltersSchema"] = {innerHierarchyStack: ["PredefinedFiltersSchema"]};
define('PredefinedFiltersSchemaStructure', ['PredefinedFiltersSchemaResources'], function(resources) {return {schemaUId:'d907bf8a-5bab-441b-878a-d1235a856e00',schemaCaption: "PredefinedFiltersSchema", parentSchemaName: "", schemaName:'PredefinedFiltersSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PredefinedFiltersSchema", ["terrasoft", "PredefinedFiltersSchemaResources", "PredefinedFilterViewModel"],
		function(Terrasoft, resources) {
	return {
		messages: {
			LoadedFiltersFromStorage: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			UpdateFilter: {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			GetPredefinedFilters: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			GetSectionFiltersInfo: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Initializes filters collection.
			 * @private
			 */
			initFiltersCollection: function() {
				var predefinedFilters = this.sandbox.publish("GetPredefinedFilters", null, [this.sandbox.id]);
				var filters = this.Ext.create(Terrasoft.BaseViewModelCollection);
				this.Terrasoft.each(predefinedFilters, function(filterConfig) {
					var filterViewModel = this.getFilterViewModel(filterConfig);
					filters.add(filterConfig.key, filterViewModel);
				}, this);
				this.set("Filters", filters);
			},

			/**
			 * Processes getting filters from storage.
			 * @private
			 */
			onLoadedFiltersFromStorage: function() {
				var filters = this.get("Filters");
				var sectionFilters = this.sandbox.publish("GetSectionFiltersInfo", null, [this.sandbox.id]);
				if (!sectionFilters) {
					return;
				}
				sectionFilters.eachKey(function(key, value) {
					var filter = filters.find(key);
					if (filter) {
						filter.setValue(value);
					}
				}, this);
			},

			/**
			 * Gets filter view model.
			 * @private
			 * @param {Object} filterConfig Filter configuration.
			 * @param {String} filterConfig.className Filter class name.
			 * @return {Terrasoft.PredefinedFilter}
			 */
			getFilterViewModel: function(filterConfig) {
				var className = filterConfig.className || "Terrasoft.PredefinedFilter";
				delete filterConfig.className;
				return this.Ext.create(className, this.Ext.apply({}, filterConfig, {
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox
				}));
			},

			/**
			 * Gets filter items list configuration.
			 * @private
			 * @return {Object}
			 */
			getFilterItemsListConfig: function() {
				var filterItemConfig = this.getFilterItemConfig();
				var listConfig = {
					className: "Terrasoft.ContainerList",
					idProperty: "ColumnPath",
					collection: {bindTo: "FilterItemsList"},
					defaultItemConfig: filterItemConfig,
					classes: {
						wrapClassName: ["filter-items-container-list"]
					}
				};
				return listConfig;
			},

			/**
			 * Gets filter item view configuration.
			 * @private
			 * @return {Object}
			 */
			getFilterItemConfig: function() {
				var labelConfig = {
					className: "Terrasoft.Label",
					caption: {bindTo: "Caption"},
					markerValue: {bindTo: "ColumnPath"}
				};
				var deleteImageConfig = this.getDeleteImageConfig();
				var deleteImageButtonConfig = {
					className: "Terrasoft.Button",
					style: this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					imageConfig: {
						source: this.Terrasoft.ImageSources.URL,
						url: this.Terrasoft.ImageUrlBuilder.getUrl(deleteImageConfig)
					},
					click: {bindTo: "onDeleteButtonClick"},
					classes: {
						wrapperClass: ["delete-button-wrapper"]
					},
					markerValue: "DeleteButton"
				};
				return {
					id: this.Terrasoft.generateGUID(),
					className: "Terrasoft.Container",
					items: [
						labelConfig,
						deleteImageButtonConfig
					],
					classes: {
						wrapClassName: ["filter-item"]
					}
				};
			},

			/**
			 * Returns DeleteImage configuration.
			 * @private
			 * @return {Object}
			 */
			getDeleteImageConfig: function() {
				return resources.localizableImages.DeleteImage;
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.sandbox.subscribe("LoadedFiltersFromStorage", this.onLoadedFiltersFromStorage, this,
							[this.sandbox.id]);
					this.initFiltersCollection();
					callback.call(scope);
				}, this]);
			},

			/**
			 * Gets columns list button configuration.
			 * @param {Object} filter Filter.
			 * @return {Object}
			 */
			getColumnsListButtonConfig: function(filter) {
				var buttonConfig = {
					className: "Terrasoft.Button",
					caption: {
						bindTo: "getColumnsListButtonCaption"
					},
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					menu: {
						items: {
							bindTo: "ColumnsList"
						}
					},
					markerValue: filter ? filter.caption : ""
				};
				var imageConfig = filter && filter.imageConfig;
				if (imageConfig) {
					buttonConfig.imageConfig = imageConfig;
				}
				return buttonConfig;
			},

			/**
			 * Prepares filter view configuration.
			 * @param  {Object} view View.
			 * @param {Object} filter Filter.
			 * @return {Object}
			 */
			prepareFilterViewConfig: function(view, filter) {
				var columnsListButtonConfig = this.getColumnsListButtonConfig(filter);
				var filterItemsListConfig = this.getFilterItemsListConfig();
				view.config = {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["filter-container"]
					},
					items: [
						columnsListButtonConfig,
						filterItemsListConfig
					]
				};
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PredefinedFiltersContainer",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["predefined-filters-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Filters",
				"parentName": "PredefinedFiltersContainer",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "Filters",
					"onGetItemConfig": "prepareFilterViewConfig"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


