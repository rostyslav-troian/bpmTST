Terrasoft.configuration.Structures["GlobalSearchFilter"] = {innerHierarchyStack: ["GlobalSearchFilter"]};
define('GlobalSearchFilterStructure', ['GlobalSearchFilterResources'], function(resources) {return {schemaUId:'d0e8144c-59ab-42b8-95e1-81a836342985',schemaCaption: "GlobalSearchFilter", parentSchemaName: "", schemaName:'GlobalSearchFilter',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GlobalSearchFilter", ["GlobalSearchFilterResources", "GlobalSearchStorage"], function() {
	return {
		messages: {
			/**
			 * Search request instance id.
			 * @type {String}
			 */
			"SearchRequestId": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: null
			},
			/**
			 * @message GlobalSearch
			 * Global search.
			 */
			"GlobalSearch": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GlobalSearchSectionsGrouping
			 * Global search section grouping.
			 */
			"GlobalSearchSectionsGrouping": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * Collection of grouped sections search result.
			 */
			"GroupedSections": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION,
				value: null
			},
			/**
			 * Filter module selector.
			 */
			"FilterModuleSelector": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ".global-search-filter-module"
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initCollections();
					this.subscribeSandboxEvents();
					this.sectionsGrouping();
					this.Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Initialize GroupedSections collection.
			 * @private
			 */
			initCollections: function() {
				var collection = Ext.create("Terrasoft.BaseViewModelCollection");
				this.set("GroupedSections", collection);
			},

			/**
			 * Subscribes on messages of the sandbox.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("GlobalSearchSectionsGrouping", this.sectionsGrouping, this);
			},

			/**
			 * Global search section grouping.
			 * @protected
			 */
			sectionsGrouping: function() {
				const searchParams = this.getSearchConfig();
				this.showBodyMask({
					timeout: 0,
					selector: this.get("FilterModuleSelector")
				});
				Terrasoft.AjaxProvider.abortRequestByInstanceId(this.get("SearchRequestId"));
				const searchRequestId = Terrasoft.generateGUID();
				this.set("SearchRequestId", searchRequestId);
				this.callService({
					serviceName: "GlobalSearchService",
					methodName: "GetGroupedSections",
					data: {
						queryString: searchParams.query,
						sectionEntityName: searchParams.sectionEntityName
					},
					instanceId: searchRequestId
				}, function(response) {
					var data = {};
					var sectionsJSON = response && response.sections;
					if (sectionsJSON) {
						data = JSON.parse(sectionsJSON);
					}
					this.onDataLoaded(data);
				}, this);
			},
			
			/**
			 * @inheritdoc BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				Terrasoft.AjaxProvider.abortRequestByInstanceId(this.get("SearchRequestId"));
			},

			/**
			 * Selecting default section.
			 * @private
			 */
			selectDefaultSection: function() {
				var searchParams = this.getSearchConfig();
				this.deselectSections();
				var type = searchParams.type;
				var collection = this.get("GroupedSections");
				var findItemList = collection.filterByFn(function(item) {
					return item.get("type") === type;
				});
				var sectionItemViewModel = findItemList.first();
				if (sectionItemViewModel) {
					this.setActiveSection(sectionItemViewModel, true);
					return;
				}
				this.set("AllResultsDomAttributes", {selected: true});
			},

			/**
			 * Returns search params of the history state.
			 * @private
			 * @return {Object} Search params of the history state.
			 */
			getSearchConfig: function() {
				var historyState = this.sandbox.publish("GetHistoryState");
				var state = historyState.state;
				var searchParams = state && state.SearchParams;
				return searchParams|| Terrasoft.GlobalSearchStorage.getSearchConfig();
			},

			/**
			 * Handler of the group section data loaded.
			 * @private
			 * @param {Array} data Response data.
			 */
			onDataLoaded: function(data) {
				var collection = this.get("GroupedSections");
				collection.clear();
				data.forEach(this.setSectionItemCaption.bind(this));
				data = this.getSortedSectionItems(data);
				data.forEach(function(item) {
					var viewModel = this.getSectionItemViewModel(item);
					collection.add(item.typeAlias, viewModel);
				}, this);
				this.hideBodyMask({ selector: this.get("FilterModuleSelector")});
				this.selectDefaultSection();
			},

			/**
			 * Sets item caption.
			 * @private
			 * @param {Object} item Section item.
			 * @param {String} item.typeAlias Alias of the section type.
			 */
			setSectionItemCaption: function(item) {
				item.caption = this.getSectionCaption(item);
			},

			/**
			 * Sorting section items.
			 * @private
			 * @param {Array} data Array of the section items.
			 * @return {Array} Sorted section items array.
			 */
			getSortedSectionItems: function(data) {
				var collection = this.Ext.create("Ext.util.MixedCollection");
				collection.addAll(data);
				collection.sort("caption");
				return collection.getRange();
			},

			/**
			 * Returns view model of the section item.
			 * @private
			 * @param {Object} item Section item.
			 * @return {Terrasoft.BaseViewModel} view model of the section item.
			 */
			getSectionItemViewModel: function(item) {
				var viewModel = Ext.create("Terrasoft.BaseViewModel", {values: item});
				return viewModel;
			},

			/**
			 * Handler of the section click.
			 * @private
			 * @param {String} selectedKey Key of the selected item.
			 * @return {Boolean} Always false.
			 */
			onSectionGroupLinkClick: function(selectedKey) {
				var collection = this.get("GroupedSections");
				var sectionItemViewModel = collection.get(selectedKey);
				var domAttributes = sectionItemViewModel.get("domAttributes");
				if (domAttributes && domAttributes.selected) {
					return false;
				}
				this.deselectSections();
				this.setActiveSection(sectionItemViewModel, true);
				var type = sectionItemViewModel.get("type");
				this.search(type);
				return false;
			},

			/**
			 * Deselecting all sections and all result button.
			 * @private
			 */
			deselectSections: function() {
				this.set("AllResultsDomAttributes", null);
				var collection = this.get("GroupedSections");
				collection.each(this.setActiveSection, this);
			},

			/**
			 * Sets active section.
			 * @param {Terrasoft.BaseViewModel} viewModel Section view model.
			 * @param {Mixed} Selectivity sign.
			 */
			setActiveSection: function(viewModel, selected) {
				var isSelected = selected === true;
				viewModel.set("domAttributes", {selected: isSelected});
			},

			/**
			 * Returns section icon.
			 * @protected
			 * @param {Object} item Section item.
			 * @return {String} Section icon.
			 */
			getSectionIcon: function(item) {
				var sectionName = item.get("typeAlias");
				var iconName = this.Ext.String.format("Resources.Images.{0}", sectionName);
				var icon = this.get(iconName) || this.getDefaultSectionIcon();
				return this.Terrasoft.ImageUrlBuilder.getUrl(icon);
			},

			/**
			 * Returns default section icon.
			 * @protected
			 */
			getDefaultSectionIcon: function() {
				return this.get("Resources.Images.SectionDefaultIcon");
			},

			/**
			 * Handler of the all result click button.
			 * @protected
			 * @return {Boolean} Always false.
			 */
			onAllResultsClick: function() {
				var allResultsDomAttributes = this.get("AllResultsDomAttributes");
				if (allResultsDomAttributes && allResultsDomAttributes.selected) {
					return false;
				}
				this.deselectSections();
				this.set("AllResultsDomAttributes", {selected: true});
				this.search();
				return false;
			},

			/**
			 * Returns section item caption.
			 * @param {Object} item Item section.
			 * @param {String} item.typeAlias Alias of the item section.
			 * @return {String} Caption of the item section.
			 */
			getSectionCaption: function(item) {
				var typeAlias = item.typeAlias;
				var moduleStructure = this.getModuleStructure(typeAlias);
				var caption = moduleStructure && moduleStructure.moduleCaption;
				return caption || this.getTypeCaption(typeAlias) || typeAlias;
			},

			/**
			 * Returns caption of the section type.
			 * @private
			 * @param {String} typeAlias Alias of the section type.
			 */
			getTypeCaption: function(typeAlias) {
				var key = this.Ext.String.format("Resources.Strings.{0}Caption", typeAlias);
				return this.get(key);
			},

			/**
			 * Searching of the selected type.
			 * @protected
			 * @param {String} [type] Selected type.
			 */
			search: function(type) {
				var searchParams = this.getSearchConfig();
				searchParams.type = type;
				this.replaceSearchHistoryStateParams(searchParams);
				this.sandbox.publish("GlobalSearch", searchParams);
			},

			/**
			 * Replaces history state params.
			 * @private
			 */
			replaceSearchHistoryStateParams: function(searchParams) {
				var state = this.sandbox.publish("GetHistoryState");
				var currentHash = state.hash;
				var currentState = state.state || {};
				var newState = this.Terrasoft.deepClone(currentState);
				newState.SearchParams = searchParams;
				this.sandbox.publish("ReplaceHistoryState", {
					stateObj: newState,
					hash: currentHash.historyState,
					silent: true
				});
			},

			/**
			 * Handler of the configuration row of the container list.
			 * @virtual
			 * @protected
			 * @param {Object} itemConfig Config of the item.
			 * @param {Terrasoft.BaseViewModel} item ViewModel.
			 */
			onGetCollectionItemConfig: function(itemConfig, item) {
				itemConfig.config = {
					"className": "Terrasoft.Container",
					"domAttributes": {"bindTo": "domAttributes"},
					"items": [
						{
							"className": "Terrasoft.ImageView",
							"imageSrc": this.getSectionIcon(item),
							"classes": {"wrapClass": ["section-group-icon"]}
						},
						{
							"className": "Terrasoft.Hyperlink",
							"caption": {"bindTo": "caption"},
							"classes": {
								"hyperlinkClass": ["section-group-link"]
							}
						}
					]
				};
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "SectionsGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["sections-group-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "AllResults",
				"parentName": "SectionsGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.HYPERLINK,
					"classes": {"hyperlinkClass": ["all-results-link"]},
					"markerValue": {"bindTo": "Resources.Strings.AllResults"},
					"caption": {"bindTo": "Resources.Strings.AllResults"},
					"click": {"bindTo": "onAllResultsClick"},
					"domAttributes": {"bindTo": "AllResultsDomAttributes"}
				}
			},
			{
				"operation": "insert",
				"name": "SectionGroupList",
				"parentName": "SectionsGroupContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"collection": {"bindTo": "GroupedSections"},
					"classes": {wrapClassName: ["container-list"]},
					"rowCssSelector": ".section-group-item",
					"onGetItemConfig": {"bindTo": "onGetCollectionItemConfig"},
					"idProperty": "typeAlias",
					"itemPrefix": "GroupedSectionContainerList",
					"defaultItemConfig": {},
					"selectableRowCss": "section-group-item",
					"onItemClick": {bindTo: "onSectionGroupLinkClick"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


