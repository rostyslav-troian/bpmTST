Terrasoft.configuration.Structures["SectionTabsSchema"] = {innerHierarchyStack: ["SectionTabsSchema"], structureParent: "BaseEntityPage"};
define('SectionTabsSchemaStructure', ['SectionTabsSchemaResources'], function(resources) {return {schemaUId:'19152423-e435-4932-b4ae-50d25af9d000',schemaCaption: "SectionTabsSchema", parentSchemaName: "BaseEntityPage", schemaName:'SectionTabsSchema',parentSchemaUId:'81c2ebad-7f20-4e71-b0c6-941b1422ba62',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionTabsSchema", [],
		function() {
			return {
				messages: {
					"PushHistoryState": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					"OpenCard": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					"GetRenderContainer": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					/**
					 * Active tab name.
					 */
					"ActiveTabName": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: ""
					},
					/**
					 * Tabs collection.
					 */
					"TabsCollection": {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				properties: {

					/**
					 * Module parameters.
					 * @type {Array}
					 */
					parameters: [],

					/**
					 * Modules container instance.
					 * @type {Object}
					 */
					modulesContainer: {}
				},
				methods: {

					/**
					 * @inheritDoc Terrasoft.BaseEntityPage#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.parameters = scope.parameters || [];
						this.initModuleContainer(scope);
						this.initContainers();
						this.callParent(arguments);
						this.initTabs(scope);
					},

					/**
					 * Inites modulesContainer instance.
					 * @param {Terrasoft.SectionTabsSchema} scope Schema instance.
					 */
					initModuleContainer: function(scope) {
						var config = this.Terrasoft.findItem(scope.viewConfig, {tag: "ModulesContainer"});
						this.modulesContainer = config && config.item;
						if (!this.modulesContainer) {
							throw new Terrasoft.ItemNotFoundException();
						}
					},

					/**
					 * Returns view generator instance.
					 * @protected
					 * @return {Terrasoft.ViewGenerator} View generator instance.
					 */
					getViewGenerator: function() {
						return this.viewGenerator || (this.viewGenerator = this.Ext.create("Terrasoft.ViewGenerator"));
					},

					/**
					 * Initialize module's containers.
					 * @protected
					 */
					initContainers: function() {
						this.modulesContainer.items = [];
						var viewGenerator = this.getViewGenerator();
						this.Terrasoft.each(this.parameters, function(config) {
							config = this.applyConfigs(config);
							var moduleConfig = this.getModuleContainerConfig(config);
							var initConfig = this.getInitConfig();
							var container = viewGenerator.generatePartial(moduleConfig, initConfig)[0];
							this.modulesContainer.items.push(container);
						}, this);
					},

					/**
					 * Applies additional attributes to config.
					 * @protected
					 * @param {Object} config Parameters config.
					 * @return {Object} Edited config.
					 */
					applyConfigs: function(config) {
						var entitySchemaName = config.entitySchemaName;
						return this.Ext.apply(config, {
							tabName: entitySchemaName,
							containerName: config.moduleName + entitySchemaName,
							visibleAttribute: this.getVisibleAttributeName(entitySchemaName)
						});
					},

					/**
					 * Returns visibility attribute name.
					 * @param {String} name Attribute name.
					 * @return {String} Visibility attribute name.
					 */
					getVisibleAttributeName: function(name) {
						return this.Ext.String.format("{0}Visible", name);
					},

					/**
					 * Returns module's container config.
					 * @protected
					 * @param {Object} config Parameters config.
					 * @return {Object} Module's container config.
					 */
					getModuleContainerConfig: function(config) {
						var moduleContainerConfig = {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"name": config.containerName,
							"tag": config.containerName,
							"visible": {"bindTo": config.visibleAttribute},
							"classes": {
								"wrapClassName": config.wrapClassName || []
							}
						};
						return moduleContainerConfig;
					},

					/**
					 * Returns current generator initialization config, applies custom config to the default values.
					 * @protected
					 * @param {Object} config Custom config.
					 * @return {Object} Custom config with default values.
					 */
					getInitConfig: function(config) {
						return this.Ext.apply({
							schema: {},
							schemaType: this.Terrasoft.SchemaType.MODULE,
							viewModelClass: this.Ext.ClassManager.get("Terrasoft.BaseViewModel")
						}, config);
					},

					/**
					 * Initialize schema tabs.
					 * @protected
					 */
					initTabs: function() {
						var tabsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
						this.Terrasoft.each(this.parameters, function(config) {
							var newTab = this.createTab(config);
							tabsCollection.addItem(newTab);
						}, this);
						this.set("TabsCollection", tabsCollection);
						if (tabsCollection.getCount() > 0) {
							var firstTab = tabsCollection.getByIndex(0);
							var tabName = firstTab.get("Name");
							this.set("ActiveTabName", tabName);
							this.set(this.getVisibleAttributeName(tabName), true);
						}
					},

					/**
					 * Creates tab instance.
					 * @param {String} caption Tab caption.
					 * @return {Terrasoft.BaseViewModel} Tab instance.
					 */
					createTab: function(config) {
						return this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Caption: config.tabCaption,
								Name: config.tabName
							}
						});
					},

					/**
					 * Performs modules loading.
					 * @overridden
					 */
					onRender: function() {
						this.callParent(arguments);
						this.loadActiveTabModules(this.get("ActiveTabName"));
					},

					/**
					 * Loads modules of tab.
					 * @protected
					 * @param {String} tabName Tab name.
					 */
					loadActiveTabModules: function(tabName) {
						var containerConfig = this.Terrasoft.findItem(this.parameters,
										{tabName: tabName}) || {};
						this.loadModule(containerConfig.item);
					},

					/**
					 * Loads module.
					 * @protected
					 * @param {Object} config Module config.
					 */
					loadModule: function(config) {
						if (this.Ext.isEmpty(config)) {
							return;
						}
						var containerItem = this.Terrasoft.findItem(this.modulesContainer.items,
										{tag: config.containerName}) || {};
						var container = containerItem.item;
						if (this.Ext.isEmpty(container)) {
							return;
						}
						var id = this.sandbox.id + "_" + config.schemaName;
						this.sandbox.loadModule(config.moduleName, {
							renderTo: container.id,
							id: id,
							"instanceConfig": {
								"useHistoryState": false,
								"schemaName": config.schemaName,
								"isSchemaConfigInitialized": true,
								"entitySchemaName": config.entitySchemaName
							}
						});
						this.sandbox.subscribe("OpenCard", function(config) {
							config.renderTo = this.getRenderContainer();
							return this.openCardInChain(config);
						}, this, [id]);
					},

					/**
					 * Returns container name to render.
					 * @return {String} Container name.
					 */
					getRenderContainer: function() {
						var container = this.sandbox.publish("GetRenderContainer", null, [this.sandbox.id]);
						return container || this.renderTo;
					},

					/**
					 * Handles active tab change event.
					 * @protected
					 * @virtual
					 * @param {Terrasoft.BaseViewModel} activeTab Active tab.
					 */
					activeTabChange: function(activeTab) {
						var activeTabName = activeTab.get("Name");
						var tabsCollection = this.get("TabsCollection");
						tabsCollection.eachKey(function(tabName, tab) {
							var tabContainerVisibleBinding = this.getVisibleAttributeName(tab.get("Name"));
							this.set(tabContainerVisibleBinding, false);
						}, this);
						var visibleAttributeName = this.getVisibleAttributeName(activeTabName);
						this.set(visibleAttributeName, true);
						this.loadActiveTabModules(activeTabName);
					},

					/**
					 * Handles "after render" event.
					 */
					handleAfterRender: function() {
						this.Ext.get("mainHeaderContainer").addCls("shift-main-header");
						this.Ext.get("PlanningCardContainer").addCls("planning-with-section-tabs-schema");
					},

					/**
					 * Handles "destroy" event.
					 */
					destroyMainContainer: function() {
						this.Ext.get("mainHeaderContainer").removeCls("shift-main-header");
						this.Ext.get("PlanningCardContainer").removeCls("planning-with-section-tabs-schema");
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "MainContainer",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["section-tabs-schema-container"]},
							"afterrender": {"bindTo": "handleAfterRender"},
							"destroy": {"bindTo": "destroyMainContainer"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "TabsContainer",
						"parentName": "MainContainer",
						"propertyName": "items",
						"values": {
							"className": "Terrasoft.LazyContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Tabs",
						"parentName": "TabsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.TAB_PANEL,
							"activeTabChange": {"bindTo": "activeTabChange"},
							"activeTabName": {"bindTo": "ActiveTabName"},
							"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
							"collection": {"bindTo": "TabsCollection"},
							"tabs": []
						}
					},
					{
						"operation": "insert",
						"name": "ModulesContainer",
						"parentName": "MainContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"tag": "ModulesContainer",
							"classes": {
								"wrapClassName": ["module-container"]
							},
							"items": []
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


