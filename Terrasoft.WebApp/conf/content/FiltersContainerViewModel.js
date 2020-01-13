Terrasoft.configuration.Structures["FiltersContainerViewModel"] = {innerHierarchyStack: ["FiltersContainerViewModel"]};
define("FiltersContainerViewModel", ["StorageUtilities"], function(StorageUtilities) {
	/**
	 * @class Terrasoft.configuration.FiltersContainerViewModel
	 * ##### ###### ############# ########## ########.
	 */
	Ext.define("Terrasoft.configuration.FiltersContainerViewModel", {
		alternateClassName: "Terrasoft.FiltersContainerViewModel",
		extend: "Terrasoft.BaseModel",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * ############ ####### ############# ########.
		 * @type {Object}
		 */
		viewModelConfig: null,

		/**
		 * ### ##########.
		 * @type {Terrasoft.ComparisonType}
		 */
		stringColumnSearchComparisonType: Terrasoft.ComparisonType.START_WITH,

		/**
		 * ##### # ####### ######## #######.
		 * @type {Object}
		 */
		entitySchema: null,

		/**
		 * ######## ##### # ####### ######## #######.
		 * @type {String}
		 */
		entitySchemaName: null,

		/**
		 * ##### ##### # ####### ######## #######.
		 * @type {Object}
		 */
		folderEntitySchema: null,

		/**
		 * ##### ####### ############## ####### # ###### # ####### ######## #######.
		 * @type {Object}
		 */
		inFolderEntitySchema: null,

		/**
		 * ###### ######## ####### ### #############.
		 * @private
		 * @type {String[]}
		 */
		initViewModelsNames: null,

		/**
		 * ########## ######## ##### # ####### ######## #######.
		 * @protected
		 * @virtual
		 * @return {String} ######## ##### # ####### ######## #######.
		 */
		getSchemaName: function() {
			return this.entitySchema.name;
		},

		/**
		 * ####### # ############## #### ## ########## ####### ########, ######### ### #############.
		 * @protected
		 * @virtual
		 * @param {Function} callback #######, ####### ##### ####### ## ##########.
		 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
		 */
		initFilterViewModel: function(callback, scope) {
			var name = this.initViewModelsNames.shift();
			var viewModel = this.createFilterViewModel(name);
			var filtersCollection = this.getFiltersViewModels();
			filtersCollection.add(name, viewModel);
			viewModel.init(callback, scope);
		},

		/**
		 * Initializes the initial values of the model.
		 * @protected
		 * @virtual
		 * @param {Function} callback Callback-function.
		 * @param {Object} scope Context of the callback.
		 */
		init: function(callback, scope) {
			var sandboxId = this.sandbox.id;
			this.set("filtersViewModels", this.Ext.create("Terrasoft.Collection"));
			this.sectionFilters = this.sandbox.publish("GetSectionFiltersInfo", null, [sandboxId]);
			this.initViewModelsNames = Ext.Object.getKeys(this.viewModelConfig);
			var initChain = this.initViewModelsNames.map(function() {
				return this.initFilterViewModel;
			}, this);
			initChain.push(function() {
				callback.call(scope);
			});
			Terrasoft.chain.apply(this, initChain);
		},

		/**
		 * Gets a collection of current filters view models.
		 * @return {Terrasoft.Collection} A collection of view models.
		 */
		getFiltersViewModels: function() {
			return this.get("filtersViewModels");
		},

		/**
		 * ####### ###### ############# #######, ############# ## ## #########.
		 * @protected
		 * @virtual
		 * @param {String} filterName ######## ###### #############.
		 * @return {Terrasoft.BaseFilterViewModel} ###### ############# #######.
		 */
		createFilterViewModel: function(filterName) {
			var filtersConfig = this.viewModelConfig[filterName];
			if (!filtersConfig) {
				return;
			}
			var sectionFilters = this.sectionFilters;
			var mergeConfig = {};
			if (sectionFilters && sectionFilters.contains(filterName)) {
				mergeConfig.Filters = sectionFilters.get(filterName);
			}
			var properties = ["isFoldersContainerExpanded", "isExtendedFiltersContainerExpanded",
				"isExtendedFolderContainerExpanded"];
			Terrasoft.each(properties, function(propertyName) {
				if (sectionFilters && sectionFilters.contains(propertyName)) {
					mergeConfig[propertyName] = sectionFilters.get(propertyName);
				}
			});
			Ext.merge(filtersConfig, {
				values: mergeConfig
			});
			this.Ext.apply(filtersConfig, this.getFilterClassConfig(filtersConfig));
			var className = filtersConfig.className;
			delete filtersConfig.className;
			var viewModel = this.Ext.create(className, filtersConfig);
			viewModel.on("filterChanged", this.filterChanged, this);
			viewModel.on("getFilterValue", this.onGetFilterValue, this);
			viewModel.on("clearFilterValue", this.clearFilterValue, this);
			return viewModel;
		},

		/**
		 * Gets filter class config.
		 * @private
		 * @param {Object} filterConfig Class config.
		 * @param {String} [filterConfig.className] Class name.
		 * @return {Object} Default class config.
		 */
		getFilterClassConfig: function(filterConfig) {
			if (filterConfig.className) {
				return {
					className: filterConfig.className
				};
			}
			return {
				className: "Terrasoft.BaseFilterViewModel",
				Ext: this.Ext,
				Terrasoft: this.Terrasoft,
				sandbox: this.sandbox
			};
		},

		/**
		 * Sends a message about changing the filters.
		 * @private
		 * @param {String} key Type of filter changes.
		 * @param {Boolean} suspendUpdate Key stop sending messages.
		 */
		filterChanged: function(key, suspendUpdate) {
			if (suspendUpdate) {
				return;
			}
			this.saveFilterState();
			var filterItem = {key: key};
			var filtersViewModels = this.getFiltersViewModels();
			if (filtersViewModels.contains(key)) {
				var filterViewModel = filtersViewModels.get(key);
				Ext.apply(filterItem, {
					filters: filterViewModel.getFilters(),
					filtersValue: this.getFilterValue(key)
				});
			} else {
				Ext.apply(filterItem, {
					filters: this.getFilters(),
					filtersValue: []
				});
			}
			var sandbox = this.sandbox;
			var sandboxId = sandbox.id;
			sandbox.publish("UpdateFilter", filterItem, [sandboxId]);
		},

		/**
		 * Saves filter state to storage and viewModel.
		 * @protected
		 * @virtual
		 */
		saveFilterState: function() {
			this.setFilterViewModelValue("FolderFilters");
			this.setFilterViewModelValue("CustomFilters");
			var customFilter = this.getFilterValue("CustomFilters");
			var filterCustomProfileKey = "FilterCustom_" + this.getSchemaName();
			if (customFilter) {
				StorageUtilities.setItem(customFilter, filterCustomProfileKey);
			}
		},

		/**
		 * Sets filter value into viewModel.
		 * @private
		 * @param {String} filterType Filter type.
		 */
		setFilterViewModelValue: function(filterType) {
			var filterValue = this.getFilterValue(filterType);
			if (!Ext.isEmpty(filterValue)) {
				var filterViewModel = this.getFilterViewModel(filterType);
				filterViewModel.set("Filters", filterValue);
			}
		},

		/**
		 * Aggregates all filters from filters viewModels.
		 * @virtual
		 * @return {Terrasoft.FilterGroup} Filters.
		 */
		getFilters: function() {
			var filtersCollection = this.Ext.create("Terrasoft.FilterGroup");
			filtersCollection.logicalOperation = Terrasoft.LogicalOperatorType.AND;
			var filtersViewModels = this.getFiltersViewModels();
			filtersViewModels.eachKey(function(viewModelName, filterViewModel) {
				var fixedFilterCollection = filterViewModel.getFilters();
				if (!fixedFilterCollection.isEmpty()) {
					filtersCollection.add(viewModelName, fixedFilterCollection);
				}
			}, this);
			return filtersCollection;
		},

		/**
		 * Returns the view model of the filter name.
		 * @param {String} filterName Name the filter view model.
		 * @return {Terrasoft.BaseFilterViewModel} View model of the filter.
		 */
		getFilterViewModel: function(filterName) {
			var filtersViewModels = this.getFiltersViewModels();
			return filtersViewModels && filtersViewModels.find(filterName);
		},

		/**
		 * ####### ###### ## ##### # ########## ########### #######.
		 * @virtual
		 * @param {String} filterName ### ###### ############# #######.
		 * @param {Terrasoft.FilterGroup} filter ##### ######## ########.
		 */
		clearFilterValue: function(filterName, filter) {
			var filterViewModel = this.getFilterViewModel(filterName);
			if (filterViewModel) {
				filterViewModel.clear(filter);
			}
		},

		/**
		 * ########## ######## ####### # ########## #### #######.
		 * @virtual
		 * @param {String} filterType ### ###### ############# #######.
		 * @param {String} filterName ######## #######.
		 * @param {Object} outResult ######, #### ##### ####### ########### ######.
		 */
		onGetFilterValue: function(filterType, filterName, outResult) {
			outResult.filters = this.getFilterValue(filterType, filterName);
		},

		/**
		 * ########## ######## ####### # ########## #### #######.
		 * @virtual
		 * @param {String} filterType ### ###### ############# #######.
		 * @param {String} filterName ######## #######.
		 * @return {Terrasoft.BaseFilter} ######## #######.
		 */
		getFilterValue: function(filterType, filterName) {
			var filterViewModel = this.getFilterViewModel(filterType);
			return filterViewModel ? filterViewModel.getFilterValue(filterName) : null;
		},

		/**
		 * @inheritdoc Terrasoft.core.BaseObject#destroy
		 * @overridden
		 */
		destroy: function() {
			var filtersCollection = this.getFiltersViewModels();
			filtersCollection.each(function(filterViewModel) {
				filterViewModel.un("filterChanged", this.filterChanged, this);
				filterViewModel.un("getFilterValue", this.onGetFilterValue, this);
				filterViewModel.un("clearFilterValue", this.clearFilterValue, this);
			}, this);
		}

	});
	return {};
});


