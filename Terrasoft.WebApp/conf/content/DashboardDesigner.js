Terrasoft.configuration.Structures["DashboardDesigner"] = {innerHierarchyStack: ["DashboardDesigner"]};
define("DashboardDesigner", ["DashboardDesignerResources", "DesignViewModelV2",
	"PageDesignerUtilities", "DashboardDesignViewGeneratorV2", "BaseSchemaModuleV2", "DashboardModule"],
	function(resources, DesignViewModelV2, pageDesignerUtilities) {

		/**
		 * @class Terrasoft.configuration.DashboardViewConfig
		 * ##### ############ ############ ############# ### ###### ######### #####.
		 */
		Ext.define("Terrasoft.configuration.DashboardDesignerViewConfig", {
			extend: "Terrasoft.DashboardViewConfig",
			alternateClassName: "Terrasoft.DashboardDesignerViewConfig",

			/**
			 * ########## ############ ############# ###### ######.
			 * @returns {Object[]} ########## ############ ############# ###### ######.
			 */
			generate: function() {
				var itemsConfig = this.callParent(arguments);
				Terrasoft.each(itemsConfig, function(itemConfig) {
					itemConfig.generator = "DashboardDesignViewGeneratorV2.generatePartial";
				}, this);
				var viewConfig = [{
					"name": "ToolsContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["dashboard-tools-container"],
					"items": [{
						"name": "SaveButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": {"bindTo": "save"}
					}, {
						"name": "CancelButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
						"click": {bindTo: "cancel"}
					}]
				}, {
					"name": "ConfigContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["dashboard-config-container"],
					"items": [{
						"name": "caption",
						"itemType": Terrasoft.ViewItemType.MODEL_ITEM,
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"isRequired": true,
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.CaptionFieldCaption"}
						}
					}]
				}, {
					"name": "dashboardView",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": itemsConfig
				}];
				return viewConfig;
			}
		});

		/**
		 * ######### ##### ######## #########.
		 */
		var dashboardClass = Ext.ClassManager.get("Terrasoft.BaseDashboardViewModel");
		DesignViewModelV2.define("BaseDashboardDesignerViewModel", dashboardClass);

		/**
		 * @class Terrasoft.configuration.DashboardModule
		 * ##### ########### ###### ######### ######.
		 */
		Ext.define("Terrasoft.configuration.DashboardDesignerViewModel", {
			extend: "Terrasoft.BaseDashboardDesignerViewModel",
			alternateClassName: "Terrasoft.DashboardDesignerViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			constructor: function(config) {
				if (!this.columns) {
					this.columns = {};
				}
				var dashboardPropertiesAttributes = Terrasoft.DashboardManager.getPropertiesAttributes();
				this.entitySchema = (config.Ext || Ext).create("Terrasoft.BaseEntitySchema", {
					"columns": dashboardPropertiesAttributes
				});
				Ext.apply(this.columns, dashboardPropertiesAttributes);
				Ext.merge(this.columns, {
					"id": {"isRequired": false},
					"items": {"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT}
				});
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * ############## ###### ########## ######## ## ####### ########.
			 * @protected
			 * @virtual
			 * @param {Object} resourcesObj ###### ########.
			 */
			initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * ############## ######### ########.
			 * @protected
			 * @virtual
			 */
			initHeader: function() {
				var dashboard = this.getDashboard();
				var caption = dashboard.getIsNew()
					? this.get("Resources.Strings.NewItemCaption")
					: Terrasoft.getFormattedString(this.get("Resources.Strings.ExistingItemCaption"),
					dashboard.getCaption());
				this.sandbox.publish("InitDataViews", {caption: caption});
				this.initContextHelp();
			},

			/**
			 * ############## ########### #######.
			 * @protected
			 * @virtual
			 */
			initContextHelp: function() {
				var contextHelpId = 1013;
				this.sandbox.publish("InitContextHelp", contextHelpId);
			},

			/**
			 * ########## ####### ###### "######".
			 * @protected
			 * @virtual
			 */
			cancel: function() {
				this.set("items", this.get("initialItems"));
				var sandbox = this.sandbox;
				sandbox.publish("BackHistoryState");
			},

			/**
			 * ############## ######### ######## ######.
			 * @protected
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			init: function(callback, scope) {
				this.initHeader();
				var dashboard = this.getDashboard();
				this.set("caption", dashboard.getCaption());
				this.set("sectionId", dashboard.getSectionId());
				var items = dashboard.getItems();
				this.set("items", items);
				this.set("initialItems", items);
				this.set("schema", {
					viewConfig: dashboard.getViewConfig()
				});
				this.on("change:schema", this.onSchemaChange, this);
				this.on("change:items", this.onItemsChange, this);
				this.on("change:selectedItem", this.onSelectedItemChanged, this);
				this.initModulesCaptions();
				this.registerWidgetMessages();
				callback.call(scope);
				this.set("isInitialized", true, {silent: true});
			},

			/**
			 * ############## ######### ### ######### #####.
			 * @protected
			 * @virtual
			 */
			initModulesCaptions: function() {
				var items = this.get("items");
				Terrasoft.each(items, function(itemConfig, itemName) {
					var defaultModuleCaption =
						this.get("Resources.Strings.ModulePrefix") +
							(itemConfig.moduleName || itemConfig.parameters.moduleName);
					var moduleCaption = itemConfig.caption ||
						itemConfig.parameters.caption ||
						defaultModuleCaption;
					this.set(itemName + "Caption", moduleCaption);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseDashboardDesignerViewModel#getIsCurrentItemColumn
			 * @overridden
			 * @returns {boolean} ###### ########## false - ### ######## ## ######## ######.
			 */
			getIsCurrentItemColumn: function() {
				return false;
			},

			/**
			 * ########## ########## ############# ### ###### # ####.
			 * @protected
			 * @virtual
			 * @param {String} itemName ### #####.
			 * @param {Object} moduleConfig ############ #####.
			 * @returns {String} ########## ########## ############# ### ###### # #####.
			 */
			getModuleId: function(itemName, moduleConfig) {
				return this.sandbox.id + itemName + moduleConfig.moduleName;
			},

			/**
			 * ############ ########### ###### # ##### #########.
			 * @protected
			 * @virtual
			 */
			registerWidgetMessages: function() {
				var messages = {};
				var ptpSubscribeConfig = {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				};
				Terrasoft.each(Terrasoft.DashboardEnums.WidgetType, function(typeConfig) {
					var config = typeConfig.design;
					messages[config.configurationMessage] = ptpSubscribeConfig;
					messages[config.resultMessage] = ptpSubscribeConfig;
				}, this);
				this.sandbox.registerMessages(messages);
			},

			/**
			 * ########## ######## ###### ######.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.Collection} ########## ######## ###### ######.
			 */
			getDashboards: function() {
				return this.get("Dashboards");
			},

			/**
			 * ######### ###### ############## ######## #####.
			 * @protected
			 * @virtual
			 * @param {String} widgetType ### ############## #######.
			 * @param {String} operation ### ########.
			 */
			loadDesignModule: function(widgetType, operation) {
				var config = this.getWidgetConfig(widgetType);
				var moduleId = this.sandbox.id + "_" + config.moduleName;
				this.set("designOperation", operation);
				this.sandbox.subscribe(config.configurationMessage, this.onDesignerModuleConfigRequest, this, [moduleId]);
				this.sandbox.subscribe(config.resultMessage, this.onDesignModuleResponse, this, [moduleId]);
				var historyState = this.sandbox.publish("GetHistoryState");
				var moduleState = Ext.apply({hash: historyState.hash.historyState}, config.stateConfig);
				this.sandbox.publish("PushHistoryState", moduleState);
				this.sandbox.loadModule(config.moduleName, {
					"renderTo": this.renderTo,
					"id": moduleId,
					"keepAlive": true
				});
			},

			/**
			 * ############ ###### ###### ############## ## ######### ############ ########.
			 * @protected
			 * @virtual
			 * @return {Object|null} ###### ############ ######, #### ###### #############,
			 * ### null - #### ###########.
			 */
			onDesignerModuleConfigRequest: function() {
				var initConfig = {sectionId: this.get("sectionId")};
				if (this.get("designOperation") === Terrasoft.ConfigurationEnums.CardOperation.ADD) {
					return initConfig;
				}
				var dashboard = this.getDashboard();
				var selectedItem = this.get("selectedItem");
				var items = dashboard.getItems();
				var moduleConfig = items[selectedItem];
				Ext.apply(initConfig, moduleConfig.parameters);
				if (this.get("designOperation") === Terrasoft.ConfigurationEnums.CardOperation.COPY) {
					initConfig.caption += " - " + this.get("Resources.Strings.CopySuffix");
				}
				return initConfig;
			},

			/**
			 * ############ ##### ## ###### ##############,
			 * ######### ########## # ######,
			 * ######### ###### # #############.
			 * @protected
			 * @virtual
			 * @param {Object} config ############ ######.
			 */
			onDesignModuleResponse: function(config) {
				var selectedItemName;
				var itemName = (selectedItemName = this.get("selectedItem"));
				var items = this.get("items");
				var itemsClone = Terrasoft.deepClone(items);
				var widgetConfig = {
					"parameters": config
				};
				var designOperation = this.get("designOperation");
				if (designOperation === Terrasoft.ConfigurationEnums.CardOperation.ADD ||
					designOperation === Terrasoft.ConfigurationEnums.CardOperation.COPY) {
					var widgetType = this.get("addWidgetType");
					widgetConfig.widgetType = widgetType;
					itemName = this.generateUniqName(widgetType);
					var newItemConfig = {
						parentName: this.get("addParentName"),
						column: this.get("addCol"),
						row: this.get("addCow"),
						name: itemName,
						itemType: Terrasoft.ViewItemType.MODULE
					};
					if (designOperation === Terrasoft.ConfigurationEnums.CardOperation.COPY) {
						var selectedItemViewConfig = this.getSchemaItemInfoByName(selectedItemName);
						var selectedItemLayout = selectedItemViewConfig.item.layout;
						Ext.apply(newItemConfig, {
							colSpan: selectedItemLayout.colSpan,
							rowSpan: selectedItemLayout.rowSpan
						});
					}
					this.addSchemaItem(newItemConfig);
				}
				var item = itemsClone[itemName] || (itemsClone[itemName] = {});
				Ext.apply(item, widgetConfig);
				this.set("items", itemsClone);
				this.set("selectedItem", itemName);
			},

			/**
			 * ####### ######### ############ ### #### #######.
			 * @protected
			 * @overridden
			 * @param {Object|String} config ############ ########, ########## ### #######, ### ### #######.
			 * @return {Object} ########## ######### ############ ### #### #######.
			 */
			getWidgetConfig: function(config) {
				var widgetTypeName = config.widgetType || config;
				var widgetConfig = Terrasoft.DashboardEnums.WidgetType[widgetTypeName];
				return widgetConfig.design;
			},

			/**
			 * ############ ####### ###### ############## ########.
			 * @protected
			 * @virtual
			 */
			editItem: function() {
				var selectedItem = this.get("selectedItem");
				var dashboard = this.getDashboard();
				var items = dashboard.getItems();
				var moduleConfig = items[selectedItem];
				this.loadDesignModule(moduleConfig.widgetType, Terrasoft.ConfigurationEnums.CardOperation.EDIT);
			},

			/**
			 * ############ ####### ###### ########### ########.
			 * @protected
			 * @virtual
			 */
			copyItem: function() {
				var selectedItem = this.get("selectedItem");
				var dashboard = this.getDashboard();
				var items = dashboard.getItems();
				var selectedItemConfig = items[selectedItem];
				var widgetType = selectedItemConfig.widgetType;
				this.set("addParentName", this.getMainElementId());
				this.set("addCol", 0);
				this.set("addCow",  this.getRowToInsert());
				this.set("addWidgetType", widgetType);
				this.loadDesignModule(widgetType, Terrasoft.ConfigurationEnums.CardOperation.COPY);
			},

			/**
			 * ########## ##### #### ### ####### ############## ########.
			 * @protected
			 * @virtual
			 * @return {Number} ##### ####.
			 */
			getRowToInsert: function() {
				var schema = this.get("schema");
				var viewConfig = schema.viewConfig;
				var row = 0;
				this.Terrasoft.each(viewConfig, function(item) {
					var lastRow = item.layout.row + item.layout.rowSpan;
					if (lastRow - 1 >= row) {
						row = lastRow;
					}
				}, this);
				return row;
			},

			/**
			 * ########## ############# ######## ##########.
			 * @protected
			 * @virtual
			 * @return {String} B############ ######## ##########.
			 */
			getMainElementId: function() {
				return "DashboardItem" + this.getDashboard().getId() + "GridLayout";
			},

			/**
			 * ############ ####### ###### ########## ########.
			 * @param {String} tag ################ ######.
			 * @protected
			 * @virtual
			 */
			addWidget: function(tag) {
				var args = tag.split(":");
				this.set("addParentName", args[0]);
				this.set("addCol", args[1]);
				this.set("addCow", args[2]);
				this.set("addWidgetType", args[3]);
				var widgetType = args[3];
				this.loadDesignModule(widgetType, Terrasoft.ConfigurationEnums.CardOperation.ADD);
			},

			/**
			 * ######### ####### # #####.
			 * @overridden
			 * @param {Object} config ############ ###### ########.
			 */
			addSchemaItem: function(config) {
				var schema = this.get("schema");
				var schemaClone = Terrasoft.deepClone(schema);
				var parent = this.getSchemaItemInfoByName(config.parentName, schemaClone.viewConfig);
				var col = parseInt(config.column, 10);
				var row = parseInt(config.row, 10);
				var parentItems = (parent && parent.item) || schemaClone.viewConfig;
				var calculatedColSpan = this.calculateColumnWidth(parentItems, col, row);
				var layout = {
					column: col,
					row: row,
					colSpan: config.colSpan || calculatedColSpan,
					rowSpan: config.rowSpan || 1
				};
				var item = {
					layout: layout,
					name: config.name,
					itemType: config.itemType
				};
				parentItems.push(item);
				this.set("schema", schemaClone);
			},

			/**
			 * ########## ####### ######### ########## ######## #####. ######## ############# ############# #####.
			 * @protected
			 * @virtual
			 */
			onSelectedItemChanged: function() {
				var selectedItem = this.get("selectedItem");
				this.reRender({
					selectedItemName: selectedItem,
					dashboards: this.getDashboards()
				});
			},

			/**
			 * ########## ####### ######### #####. ############### ############# ##### # ######### ##### # DesignData.
			 * @protected
			 * @virtual
			 */
			onSchemaChange: function() {
				var schema = arguments[1];
				var dashboard = this.getDashboard();
				dashboard.setViewConfig(schema.viewConfig);
				var selectedItem = this.get("selectedItem");
				this.reRender({
					selectedItemName: selectedItem,
					dashboards: this.getDashboards()
				});
			},

			/**
			 * ########## ####### ######### ######### #####.
			 * @protected
			 * @virtual
			 */
			onItemsChange: function() {
				this.initModulesCaptions();
			},

			/**
			 * ########## ####### ####.
			 * @protected
			 * @virtual
			 * @return {Terrasoft.DashboardManagerItem} ########## ####### ####.
			 */
			getDashboard: function() {
				var dashboards = this.getDashboards();
				return dashboards.getByIndex(0);
			},

			/**
			 * ########## ######### ###### ######.
			 * @overridden
			 * @param {Object} obj ###### # ######### #######.
			 * @param {Object} options ###### ############## ##########, # ####### ### ###### ##### ######### ######.
			 */
			onDataChange: function(obj, options) {
				if (this.get("isInitialized")) {
					this.applyChangesToDashboard(obj, options);
				}
				this.callParent(arguments);
			},

			/**
			 * ########## ####### ###### "#########".
			 * @protected
			 * @virtual
			 */
			save: function() {
				if (!this.validate()) {
					return;
				}
				var dashboard = this.getDashboard();
				if (dashboard.getIsNew()) {
					Terrasoft.DashboardManager.addItem(dashboard);
				}
				Terrasoft.DashboardManager.save(this.onSaved, this);
			},

			/**
			 * ########## ########## ##########.
			 * @protected
			 * @virtual
			 */
			onSaved: function(response) {
				if (response.success) {
					var sandbox = this.sandbox;
					var dashboard = this.getDashboard();
					sandbox.publish("SetDesignerResult", {
						dashboardId: dashboard.getId()
					}, [sandbox.id]);
					sandbox.publish("BackHistoryState");
				}
			},

			/**
			 * ######### ######### ## ###### ###### # ###### #####.
			 * @protected
			 * @virtual
			 * @param {Object} obj ###### ######### ###### ######.
			 */
			applyChangesToDashboard: function(obj) {
				var dashboard = this.getDashboard();
				Terrasoft.each(obj.changed, function(changedValue, changedValueName) {
					if (dashboard.propertyColumnNames[changedValueName]) {
						dashboard.setPropertyValue(changedValueName, changedValue);
					}
				}, this);
			},

			/**
			 * ############ ########### ###### #############.
			 * @protected
			 * @virtual
			 */
			destroy: function() {
				var dashboard = this.getDashboard();
				if (dashboard && !dashboard.destroyed) {
					dashboard.discard();
				}
			},

			/**
			 * ########## ############# ############# #####. ########### # ###### ############# # ###### #####.
			 */
			reRender: Ext.emptyFn,

			/**
			 * ######### ########### ######## ##### ############ #############.
			 * @protected
			 * @virtual
			 */
			onRender: function() {
				if (this.get("Restored")) {
					this.initHeader();
					this.set("Restored", false);
				}
				this.onViewRendered();
			},

			/**
			 * ########## ####### ######### #############.
			 * @private
			 */
			onViewRendered: function() {
				pageDesignerUtilities.initializeGridLayoutDragAndDrop(Ext.bind(this.changeItemPosition, this));
			}
		});

		/**
		 * @class Terrasoft.configuration.DashboardModule
		 * ##### ########### ###### ######.
		 */
		var dashboardModule = Ext.define("Terrasoft.configuration.DashboardDesigner", {
			extend: "Terrasoft.BaseSchemaModule",
			alternateClassName: "Terrasoft.DashboardDesigner",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 *
			 */
			mixins: {
				/**
				 * ######, ########### ###### # HistoryState
				 */
				HistoryStateUtilities: "Terrasoft.HistoryStateUtilities"
			},

			/**
			 * ######## ####### ############# #########.
			 * @private
			 * @type {Ext.Element}
			 */
			renderContainer: null,

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ####### ######### ###### Terrasoft.ViewGenerator.
			 * @return {Terrasoft.ViewGenerator} ########## ###### Terrasoft.ViewGenerator.
			 */
			createViewGenerator: function() {
				return this.Ext.create(this.viewGeneratorClass);
			},

			/**
			 * ########## #### ####### ### ###### ######.
			 * @overridden
			 * @protected
			 * @return {String} ######### #### ####### ### ###### ######.
			 */
			getProfileKey: function() {
				return "DashboardId";
			},

			/**
			 * ########## ###### ######## ###### #############.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ######## ###### #############.
			 */
			getViewModelConfig: function() {
				var module = this;
				var viewModelConfig = {
					Ext: this.Ext,
					sandbox: this.sandbox,
					Terrasoft: this.Terrasoft,
					values: {
						Dashboards: this.dashboards
					},
					reRender: function(config) {
						module.reBuildView(config, function() {
							this.reRender();
						}, module);
					}
				};
				return viewModelConfig;
			},

			/**
			 * ####### ############# ##### ##### ######.
			 * @overridden
			 * @protected
			 */
			initSchemaName: function() {
				this.schemaName = "DashboardDesigner";
			},

			/**
			 * ########### ######### ##### # #########.
			 * @protected
			 * @virtual
			 * @param {Object} config ###### ############ ######### ######.
			 * @param {String} config.dashboardId ########## ############# ############ ######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
			 * @return {Terrasoft.Collection} ########## ######### #####.
			 */
			requireDashboards: function(config, callback, scope) {
				Terrasoft.DashboardManager.initialize({}, function() {
					var dashboardCollection = Ext.create("Terrasoft.Collection");
					if (config && config.dashboardId) {
						var dashboard;
						if (config.copyItem) {
							dashboard = Terrasoft.DashboardManager.copyItem(config.dashboardId);
						} else {
							dashboard = Terrasoft.DashboardManager.getItem(config.dashboardId);
						}
						dashboardCollection.add(dashboard.getId(), dashboard);
						callback.call(scope, dashboardCollection);
					} else {
						var sectionInfo = this.getSectionInfo();
						var createItemConfig = {sectionId: sectionInfo.moduleId};
						Terrasoft.DashboardManager.createItem(createItemConfig, function(dashboard) {
							dashboardCollection.add(dashboard.getId(), dashboard);
							callback.call(scope, dashboardCollection);
						}, this);
					}
				}, this);
			},

			/**
			 * ####### ############ ############# ######.
			 * @protected
			 * @virtual
			 * param {Object} config ###### ############.
			 * param {Function} callback ####### ######### ######.
			 * param {Terrasoft.BaseModel} scope ######## ########## ####### ######### ######.
			 * @return {Object[]} ########## ############ ############# ######.
			 */
			buildView: function(config, callback, scope) {
				var viewGenerator = this.createViewGenerator();
				var viewClass = this.Ext.create("Terrasoft.DashboardDesignerViewConfig");
				var schema = {
					viewConfig: viewClass.generate(config.dashboards)
				};
				var viewConfig = Ext.apply({
					schema: schema
				}, config);
				viewGenerator.generate(viewConfig, callback, scope);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#generateSchemaStructure
			 * @overridden
			 */
			generateSchemaStructure: function(callback, scope) {
				this.requireDashboards(this.moduleConfig, function(dashboards) {
					this.dashboards = dashboards;
					this.viewModelClass = Ext.ClassManager.get("Terrasoft.DashboardDesignerViewModel");
					var generatorConfig = Terrasoft.deepClone(this.moduleConfig);
					generatorConfig.viewModelClass = this.viewModelClass;
					generatorConfig.dashboards = this.dashboards;
					this.buildView(generatorConfig, function(view) {
						callback.call(scope, this.viewModelClass, view);
					}, this);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseSchemaModule#render
			 * @overridden
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				this.renderContainer = renderTo;
			},

			/**
			 * ############# ############# ######.
			 * @protected
			 * @virtual
			 * @param {Object} config ################ ######.
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.!
			 */
			reBuildView: function(config, callback, scope) {
				var generatorConfig = Ext.apply(config, this.moduleConfig, {
					viewModelClass: this.viewModelClass,
					dashboards: this.dashboards
				});
				this.buildView(generatorConfig, function(view) {
					this.viewConfig = view;
					callback.call(scope, view);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseNestedModule#init
			 * @overridden
			 */
			init: function() {
				if (!this.viewModel) {
					this.initConfig();
				}
				this.callParent(arguments);
			},

			/**
			 * ############## ###### ############ ######.
			 * @protected
			 * @virtual
			 */
			initConfig: function() {
				this.moduleConfig = this.sandbox.publish("GetDashboardInfo", null, [this.sandbox.id]);
			},

			/**
			 * ########### ############# ###### # ############# #############.
			 * @protected
			 * @virtual
			 */
			reRender: function() {
				if (!this.renderContainer) {
					return;
				}
				var view = this.view;
				if (view) {
					view.destroy();
				}
				var viewModel = this.viewModel;
				var containerName = this.schemaName + this.autoGeneratedContainerSuffix;
				view = this.view = this.Ext.create("Terrasoft.Container", {
					id: containerName,
					selectors: {wrapEl: "#" +  containerName},
					classes: {wrapClassName: ["schema-wrap", "one-el"]},
					items: Terrasoft.deepClone(this.viewConfig)
				});
				view.bind(viewModel);
				view.render(this.renderContainer);
				viewModel.onRender();
			},

			/**
			 * ######## ######### #########.
			 * @overridden
			 */
			destroy: function() {
				this.callParent(arguments);
				this.renderContainer = null;
			}
		});
		return dashboardModule;
	});


