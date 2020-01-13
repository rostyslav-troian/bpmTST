Terrasoft.configuration.Structures["QuickSearchModule"] = {innerHierarchyStack: ["QuickSearchModule"]};
// D9 Team
define("QuickSearchModule", ["QuickSearchModuleResources", "BaseModule"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.QuickSearchModule
		 * ##### QuickSearchModule ############ ### ####### ########## # #### ####### #########
		 */
		Ext.define("Terrasoft.configuration.QuickSearchModule", {
			alternateClassName: "Terrasoft.QuickSearchModule",
			extend: "Terrasoft.BaseModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ######### ### ###### ######## ######
			 * @private
			 * @type {Object}
			 */
			config: null,

			/**
			 * ######## ######### ### #########
			 * @private
			 * @type {Object}
			 */
			container: null,

			/**
			 * ######## ###### ######### ######
			 * @protected
			 * @type {Object}
			 */
			messages: {

				/**
				 * @message UpdateQuickSearchFilter
				 * ######## # ######### #######
				 * @param {Object} ########## # ##### #######
				 */
				"UpdateQuickSearchFilter": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message UpdateQuickSearchFilterString
				 * ########## ###### ###### ## ###
				 * @param {String} ##### ###### ######
				 * @param {Bool} ######### ##### ###### ######
				 */
				"UpdateQuickSearchFilterString": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message QuickSearchFilterInfo
				 * ######### ############ ######
				 * @return {Object} ############ ### ############# ######
				 */
				"QuickSearchFilterInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * ###### ############# ######### #####.
			 * @private
			 * @type {Object}
			 */
			viewModel: null,

			/**
			 * ########### ######### ######.
			 * @private
			 */
			registerMessages: function() {
				if (this.messages) {
					this.sandbox.registerMessages(this.messages);
				}
			},

			/**
			 * ########## ############ ############# ######
			 * @returns {Object} ########## ############ ### ############# #############.
			 */
			getView: function()
			{
				return {
					className: "Terrasoft.Container",
					id: "quickSearchModule-container",
					selectors: {wrapEl: "#quickSearchModule-container"},
					classes: {
						wrapClassName: ["quickSearchModule-container"]
					},
					items: [
						{
							className: "Terrasoft.Container",
							id: "quickSearchModuleSearchTextEdit-container",
							selectors: {wrapEl: "#quickSearchModuleSearchTextEdit-container"},
							classes: {
								wrapClassName: ["quickSearchModuleSearchTextEdit-container"]
							},
							items: [
								{
									className: "Terrasoft.TextEdit",
									id: "QuickSearchTextEdit",
									selectors: {wrapEl: "#QuickSearchTextEdit"},
									value: {bindTo: "SearchString"},
									placeholder: {bindTo: "SearchStringPlaceHolder"},
									enterkeypressed: {bindTo: "onApplyQuickSearchFilterButtonClick"},
									hasClearIcon: false,
									hint: resources.localizableStrings.SearchLineHint,
									markerValue: "QuickSearchTextEdit"
								}
							]
						},
						{
							className: "Terrasoft.Container",
							id: "quickSearchModuleButtons-container",
							selectors: {wrapEl: "#quickSearchModuleButtons-container"},
							classes: {
								wrapClassName: ["quickSearchModuleButtons-container"]
							},
							items: [
								{
									className: "Terrasoft.Container",
									id: "quickSearchModuleApplyFilterButton-container",
									selectors: {wrapEl: "#quickSearchModuleApplyFilterButton-container"},
									classes: {
										wrapClassName: ["quickSearchModuleApplyFilterButton-container"]
									},
									items: [
										{
											className: "Terrasoft.Button",
											imageConfig: resources.localizableImages.ApplyButtonImage,
											id: "ApplyQuickSearchFilterButton",
											selectors: {wrapEl: "#ApplyQuickSearchFilterButton"},
											tag: "ApplyQuickSearchFilterButton",
											hint: resources.localizableStrings.ApplyFilterButtonHint,
											style: Terrasoft.controls.ButtonEnums.style.BLUE,
											visible: true,
											markerValue: "ApplyQuickFilterButton",
											click: {bindTo: "onApplyQuickSearchFilterButtonClick"}
										}
									]
								},
								{
									className: "Terrasoft.Container",
									id: "quickSearchModuleClearFilterButton-container",
									selectors: {wrapEl: "#quickSearchModuleClearFilterButton-container"},
									classes: {
										wrapClassName: ["quickSearchModuleClearFilterButton-container"]
									},
									items: [
										{
											className: "Terrasoft.Button",
											imageConfig: resources.localizableImages.CancelButtonImage,
											id: "ClearQuickSearchFilterButton",
											selectors: {wrapEl: "#ClearQuickSearchFilterButton"},
											tag: "ClearQuickSearchFilterButton",
											hint: resources.localizableStrings.ResetFilterButtonHint,
											style: Terrasoft.controls.ButtonEnums.style.GREY,
											visible: true,
											markerValue: "CancelQuickFilterButton",
											click: {bindTo: "onClearQuickSearchFilterButtonClick"}
										}
									]
								}
							]
						}
					]
				};
			},

			/**
			 * ########## ############ ###### ############# ######.
			 * @returns {Object} ########## ############ ### ############# ###### #############.
			 */
			getViewModel: function(sandbox, Terrasoft, Ext, config)
			{
				return {
					values: {

						/**
						 * ######## ###### ######
						 * @type {String}
						 */
						SearchString: "",

						/**
						 * ######, ####### ############ ### ###### ###### ######
						 * @type {String}
						 */
						SearchStringPlaceHolder: "",

						/**
						 * #######, ## ###### ####### ########### ######
						 * @type {Array}
						 */
						FilterColumns: null,

						/**
						 * ######### #############
						 * @private
						 * @type {Array}
						 */
						config: config || null
					},
					methods: {

						/**
						 * ############# ###### #############.
						 * @param {Object} config ######### ############ ###### #############.
						 */
						init: function(config) {
							var filterColumns = config.FilterColumns || [
								{
									Column: "Name",
									ComparisonType: Terrasoft.ComparisonType.START_WITH
								}
							];
							this.set("FilterColumns", filterColumns);
							this.set("SearchStringPlaceHolder", config.SearchStringPlaceHolder ||
								resources.localizableStrings.SearchStringPlaceHolder);
							this.set("SearchString", config.InitSearchString || "");
							if (!Ext.isEmpty(config.InitSearchString)) {
								this.createAndPublishFilterGroup();
							}

							this.subscribeForUpdateQuickSearchFilterString();
						},

						/**
						 * ############## ######## ## ####### UpdateQuickSearchFilterString
						 */
						subscribeForUpdateQuickSearchFilterString: function() {
							sandbox.subscribe("UpdateQuickSearchFilterString", function(args) {
								args = args || {};
								this.set("SearchString", args.newSearchStringValue || "");
								if (args.autoApply) {
									this.createAndPublishFilterGroup();
								}
							}, this);
						},

						/**
						 * ########## ####### ## ###### ####### ###### ##########
						 * @protected
						 */
						onClearQuickSearchFilterButtonClick: function() {
							this.clearAndApplyFilter();
						},

						/**
						 * ########## ####### ## ###### ########## ##########
						 * @protected
						 */
						onApplyQuickSearchFilterButtonClick: function() {
							this.createAndPublishFilterGroup();
						},

						/**
						 * ####### ###### ## ###### ######### ######## # ###### ######
						 * @returns {Terrasoft.data.filters.FilterGroup}
						 * @protected
						 * @virtual
						 */
						createFilterGroup: function() {
							var searchString = this.get("SearchString");
							var filterColumns = this.get("FilterColumns");
							var filterGroup = Terrasoft.createFilterGroup();
							if (Ext.isEmpty(searchString) ||
								!filterColumns ||
								filterColumns.length === 0) {
								return filterGroup;
							}
							Terrasoft.each(filterColumns, function(column) {
								filterGroup.addItem(
									Terrasoft.createColumnFilterWithParameter(
										column.ComparisonType, column.Column, searchString)
								);
							}, this);
							filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
							return filterGroup;
						},

						/**
						 * ######## # ######### ####### UpdateQuickSearchFilter # ##### ########
						 * @protected
						 * @virtual
						 */
						createAndPublishFilterGroup: function() {
							var filterGroup = this.createFilterGroup();
							var filterItem = {
								key: "QuickSearchFilterItem",
								filters: filterGroup,
								filtersValue: this.get("SearchString")
							};
							sandbox.publish("UpdateQuickSearchFilter", filterItem);
						},

						/**
						 * ####### ###### ###### # ########## ####### #######
						 * @protected
						 */
						clearAndApplyFilter: function() {
							this.set("SearchString", "");
							this.createAndPublishFilterGroup();
						}
					}
				};
			},

			/**
			 * ############# ######. ############ ######### # ######## ######### ############.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ########## callback.
			 * @protected
			 * @virtual
			 */
			init: function() {
				this.registerMessages();
				this.config = this.sandbox.publish("QuickSearchFilterInfo") || {};
			},

			/**
			 * ######### ######### ############# # ####### #########.
			 * @param {String} renderTo ####### ######### ### #########.
			 */
			render: function(renderTo) {
				this.container = renderTo;
				this.initializeModule();
			},

			/**
			 * ######### ############# ######### ###### - ############# # ###### #############
			 * @protected
			 * @virtual
			 */
			initializeModule: function() {
				var viewConfig = this.getView();
				var view = Ext.create(viewConfig.className || "Terrasoft.Container", viewConfig);
				if (!this.viewModel) {
					var viewModelConfig = this.getViewModel(this.sandbox, this.Terrasoft, this.Ext, this.config);
					this.viewModel = this.Ext.create("Terrasoft.BaseViewModel", viewModelConfig);
					this.viewModel.init(this.config);
				}
				view.bind(this.viewModel);
				view.render(this.container);
			}
		});

		return Terrasoft.QuickSearchModule;
	});


