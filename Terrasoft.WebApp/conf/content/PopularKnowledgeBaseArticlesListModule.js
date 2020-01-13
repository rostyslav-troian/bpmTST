Terrasoft.configuration.Structures["PopularKnowledgeBaseArticlesListModule"] = {innerHierarchyStack: ["PopularKnowledgeBaseArticlesListModule"]};
define("PopularKnowledgeBaseArticlesListModule", ["terrasoft", "ext-base",
		"PopularKnowledgeBaseArticlesListModuleResources", "PortalClientConstants", "BaseNestedModule",
		"GridUtilitiesV2", "ContainerListGenerator", "ContainerList", "DashboardGridModule", "css!PortalModulesCSS"],
	function(Terrasoft, Ext, resources, PortalClientConstants) {

		/**
		 * @class Terrasoft.configuration.PopularKnowledgeBaseArticlesListViewConfig
		 * ##### ############ ############ ############# ###### ###### ########## ###### ## #######.
		 */
		Ext.define("Terrasoft.configuration.PopularKnowledgeBaseArticlesListViewConfig", {
			extend: "Terrasoft.DashboardGridViewConfig",
			alternateClassName: "Terrasoft.PopularKnowledgeBaseArticlesListViewConfig",

			/**
			 * ########## ############ ############# ###### ###### ########## ###### ## #######.
			 * @protected
			 * @overridden
			 * @param {Object} config ###### ############.
			 * @return {Object[]} ########## ############ ############# ###### ###### ########## ###### ## #######.
			 */
			generate: function(config) {
				var columnsConfig = this.getColumnsConfig(config) || [];
				var entitySchema = config.entitySchema;
				var primaryColumnName = (entitySchema) ? entitySchema.primaryColumnName : "Id";
				var moduleId = Terrasoft.Component.generateId();
				return {
					"name": "gridContainer" + moduleId,
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						wrapClassName: ["dashboard-grid-container", config.style]
					},
					"items": [
						{
							"name": "gridCaptionContainer" + moduleId,
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {
								"wrapClassName": ["default-widget-header", config.style]
							},
							"items": [
								{
									"name": "dashboard-grid-caption" + moduleId,
									"itemType": Terrasoft.ViewItemType.LABEL,
									"caption": {
										"bindTo": "Resources.Strings.ListHeaderCaption"
									},
									"labelClass": "default-widget-header-label"
								},
								{
									"name": "dashboard-grid-gotobutton",
									"classes": {
										"wrapClassName": ["dashboard-grid-gotobutton", config.style],
										"textClass": "dashboard-grid-gotobutton"
									},
									"itemType": Terrasoft.ViewItemType.BUTTON,
									"caption": {
										"bindTo": "Resources.Strings.GoToKnowledgeBaseCaption"
									},
									"click": {
										"bindTo": "goToSectionModule"
									}
								}
							]
						},
						{
							"name": "DataGrid" + moduleId,
							"idProperty": primaryColumnName,
							"collection": {
								"bindTo": "GridData"
							},
							"classes": {
								wrapClassName: ["portal-dashboard-grid-list"]
							},
							"generator": "ContainerListGenerator.generatePartial",
							"itemType": Terrasoft.ViewItemType.GRID,
							"itemConfig": [
								{
									itemType: Terrasoft.ViewItemType.GRID_LAYOUT,
									name: "itemGridLayout",
									items: columnsConfig
								}
							]
						}
					]
				};
			}
		});

		/**
		 * @class Terrasoft.configuration.PopularKnowledgeBaseArticlesListViewModel
		 * ##### ###### ############# ###### ###### ########## ###### ## #######.
		 */
		Ext.define("Terrasoft.configuration.PopularKnowledgeBaseArticlesListViewModel", {
			extend: "Terrasoft.DashboardGridViewModel",
			alternateClassName: "Terrasoft.PopularKnowledgeBaseArticlesListViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * @inheritdoc Terrasoft.DashboardGridViewModel#initGridData
			 * @protected
			 * @overridden
			 */
			initGridData: function() {
				this.callParent(arguments);
				this.set("rowCount", 6);
			},

			/**
			 * ############## ###### ########## ######## ## ####### ########.
			 * @protected
			 * @overridden
			 */
			initResourcesValues: function() {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resources, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},


			/**
			 * ####### # ######.
			 * @private
			 */
			goToSectionModule: function() {
				var schemaName = this.get("entitySchemaName");
				var moduleStructure = Terrasoft.configuration.ModuleStructure;
				var module = moduleStructure[schemaName];
				var url = module.sectionModule + "/" + module.sectionSchema;
				this.sandbox.publish("PushHistoryState", {
					hash: url
				});
			}
		});

		/**
		 * @class Terrasoft.configuration.PopularKnowledgeBaseArticlesListModule
		 * ##### ###### ###### ########## ###### ## #######.
		 */
		Ext.define("Terrasoft.configuration.PopularKnowledgeBaseArticlesListModule", {
			extend: "Terrasoft.DashboardGridModule",
			alternateClassName: "Terrasoft.PopularKnowledgeBaseArticlesListModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,

			/**
			 * ### ###### ###### ############# ### ########## ######.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.PopularKnowledgeBaseArticlesListViewModel",

			/**
			 * ### ##### ########## ############ ############# ########## ######.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.PopularKnowledgeBaseArticlesListViewConfig",

			/**
			 * ### ##### ########## #############.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * ############## ###### ############ ######.
			 * @protected
			 * @overridden
			 */
			initConfig: function() {
				this.moduleConfig =	{
					"caption": "",
					"sectionId": PortalClientConstants.SysModule.PortalMainPageSectionId,
					"entitySchemaName": "KnowledgeBase",
					"filterData": "{\"className\":\"Terrasoft.FilterGroup\",\"items\":{},\"logicalOperation\":0," +
						"\"isEnabled\":true,\"filterType\":6,\"rootSchemaName\":\"KnowledgeBase\",\"key\":\"\"}",
					"style": "widget-turquoise",
					"orderDirection": 2,
					"orderColumn": "[Like:KnowledgeBase].Id",
					"rowCount": 10,
					"gridConfig": {
						"items": [
							{
								"bindTo": "Name",
								"type": "text",
								"position": {
									"column": 0,
									"colSpan": 24,
									"row": 1
								},
								"aggregationType": "",
								"metaPath": "Name",
								"path": "Name"
							},
							{
								"bindTo": "[Like:KnowledgeBase].Id",
								"type": "text",
								"position": {
									"column": 50,
									"colSpan": 0,
									"row": 1
								},
								"orderDirection": 2,
								"orderPosition": 1,
								"dataValueType": 4,
								"aggregationType": 1,
								"isBackward": true,
								"metaPath": "[Like:KnowledgeBase].Id",
								"path": "[Like:KnowledgeBase].Id",
								"referenceSchemaName": "Like"
							}
						]
					}
				};
			}

		});

		return Terrasoft.PopularKnowledgeBaseArticlesListModule;
	}
);


