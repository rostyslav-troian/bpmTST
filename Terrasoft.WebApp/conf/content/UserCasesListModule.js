Terrasoft.configuration.Structures["UserCasesListModule"] = {innerHierarchyStack: ["UserCasesListModule"]};
define("UserCasesListModule", ["terrasoft", "ext-base", "UserCasesListModuleResources", "PortalClientConstants",
		"BaseNestedModule", "GridUtilitiesV2", "ContainerListGenerator", "ContainerList", "DashboardGridModule",
		"css!PortalModulesCSS"],
	function(Terrasoft, Ext, resources, PortalClientConstants) {

		/**
		 * @class Terrasoft.configuration.UserCasesListViewConfig
		 * ##### ############ ############ ############# ###### ###### ######### ## #######.
		 */
		Ext.define("Terrasoft.configuration.UserCasesListViewConfig", {
			extend: "Terrasoft.DashboardGridViewConfig",
			alternateClassName: "Terrasoft.UserCasesListViewConfig",

			/**
			 * ########## ############ ############# ###### ###### ######### ## #######.
			 * @protected
			 * @overridden
			 * @param {Object} config ###### ############.
			 * @return {Object[]} ########## ############ ############# ###### ###### ######### ## #######.
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
									"name": "dashboard-grid-createbutton",
									"classes": {
										"wrapClassName": ["default-widget-createbutton", config.style],
										"textClass": "dashboard-grid-createbutton"
									},
									"itemType": Terrasoft.ViewItemType.BUTTON,
									"caption": {
										"bindTo": "Resources.Strings.CreateButtonCaption"
									},
									"click": {
										"bindTo": "openAddCard"
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
							"getEmptyMessageConfig": {
								"bindTo": "prepareEmptyGridMessageConfig"
							},
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
		 * @class Terrasoft.configuration.UserCasesListViewModel
		 * ##### ###### ############# ###### ###### ######### ## #######.
		 */
		Ext.define("Terrasoft.configuration.UserCasesListViewModel", {
			extend: "Terrasoft.DashboardGridViewModel",
			alternateClassName: "Terrasoft.UserCasesListViewModel",

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
			 * ######### ############ ### ################# ######### # ###### #######.
			 * @protected
			 * @param {Object} config ############ ### ################# ######### # ###### #######.
			 */
			prepareEmptyGridMessageConfig: function(config) {
				var emptyGridMessageProperties = {
					title: this.get("Resources.Strings.EmptyInfoTitle"),
					recommendation: this.get("Resources.Strings.EmptyInfoRecommendation"),
					image: this.get("Resources.Images.EmptyInfoImage")
				};
				var emptyGridMessageViewConfig = this.getEmptyGridMessageViewConfig(emptyGridMessageProperties);
				this.Ext.apply(config, emptyGridMessageViewConfig);
			},

			/**
			 * ########## ############ ############# ######### # ###### #######.
			 * @param {Object} emptyGridMessageProperties ######### ######### # ###### #######.
			 * @return {Object} ############ ############# ######### # ###### #######.
			 */
			getEmptyGridMessageViewConfig: function(emptyGridMessageProperties) {
				var config = {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["empty-container-list-message"]
					},
					items: []
				};
				config.items.push({
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["image-container"]
					},
					items: [
						{
							className: "Terrasoft.ImageEdit",
							readonly: true,
							classes: {
								wrapClass: ["image-control"]
							},
							imageSrc: this.Terrasoft.ImageUrlBuilder.getUrl(emptyGridMessageProperties.image)
						}
					]
				});
				config.items.push({
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["title"]
					},
					items: [
						{
							className: "Terrasoft.Label",
							caption: emptyGridMessageProperties.title
						}
					]
				});

				var recommendation = emptyGridMessageProperties.recommendation;
				if (!this.Ext.isEmpty(recommendation)) {
					var descriptionConfig = {
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["description"]
						},
						items: [
							{
								className: "Terrasoft.Container",
								classes: {
									wrapClassName: ["separator"]
								},
								items: [
									{
										selectors: {
											wrapEl: ".separator"
										},
										className: "Terrasoft.HtmlControl"
									}
								]
							}
						]
					};
					var recommendationHtml = this.getRecommendationHtml(recommendation);
					descriptionConfig.items.push({
						className: "Terrasoft.Container",
						classes: {
							wrapClassName: ["reference"]
						},
						items: [
							{
								selectors: {
									wrapEl: ".reference"
								},
								className: "Terrasoft.HtmlControl",
								html: recommendationHtml
							}
						]
					});
					config.items.push(descriptionConfig);
				}
				return config;
			},

			/**
			 * ######### ######## ########## ######.
			 * @private
			 */
			openAddCard: function() {
				var addCardUrl = this.getAddCardUrl();
				this.sandbox.publish("PushHistoryState", {
					hash: addCardUrl
				});
			},

			/**
			 * ######### ###### ## ######## ########## ######.
			 * @private
			 * @returns {String} ###### ## ######## ########## ######.
			 */
			getAddCardUrl: function() {
				var schemaName = this.get("entitySchemaName");
				var moduleStructure = Terrasoft.configuration.ModuleStructure;
				var module = moduleStructure[schemaName];
				var addCardUrl = module.cardModule + "/" + module.cardSchema + "/add";
				return addCardUrl;
			},

			/**
			 * ######### html ### ##### ############.
			 * @private
			 * @param {String} recommendation ######### ### ############.
			 * @returns {String} Html ### ##### ############.
			 */
			getRecommendationHtml: function(recommendation) {
				var addCardUrl = this.getAddCardUrl();
				var startTagPart = "<a class=\"t-label label-link\" href=\"ViewModule.aspx#" + addCardUrl + "\">";
				var endTagPart = "</a>";
				var recommendationHtml = this.Ext.String.format(recommendation, startTagPart, endTagPart);
				return recommendationHtml;
			}
		});

		/**
		 * @class Terrasoft.configuration.UserCasesListModule
		 * ##### ###### ###### ######### ## #######.
		 */
		Ext.define("Terrasoft.configuration.UserCasesListModule", {
			extend: "Terrasoft.DashboardGridModule",
			alternateClassName: "Terrasoft.UserCasesListModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,

			/**
			 * ### ###### ###### ############# ### ########## ######.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.UserCasesListViewModel",

			/**
			 * ### ##### ########## ############ ############# ########## ######.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.UserCasesListViewConfig",

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
					"entitySchemaName": "Case",
					"filterData": "{\"className\":\"Terrasoft.FilterGroup\",\"items\":{},\"logicalOperation\":0," +
						"\"isEnabled\":true,\"filterType\":6,\"rootSchemaName\":\"Case\",\"key\":\"\"}",
					"style": "widget-green",
					"orderDirection": 2,
					"orderColumn": "RegisteredOn",
					"rowCount": 10,
					"gridConfig": {
						"items": [
							{
								"bindTo": "Number",
								"type": "text",
								"position": {
									"column": 0,
									"colSpan": 6,
									"row": 1
								},
								"aggregationType": "",
								"metaPath": "Number",
								"path": "Number"
							},
							{
								"bindTo": "Subject",
								"type": "title",
								"position": {
									"column": 6,
									"colSpan": 18,
									"row": 1
								},
								"dataValueType": 1,
								"aggregationType": "",
								"metaPath": "Subject",
								"path": "Subject"
							},
							{
								"bindTo": "RegisteredOn",
								"type": "title",
								"position": {
									"column": 50,
									"colSpan": 0,
									"row": 1
								},
								"orderDirection": 2,
								"orderPosition": 1,
								"dataValueType": 7,
								"aggregationType": "",
								"metaPath": "RegisteredOn",
								"path": "RegisteredOn"
							}
						]
					}
				};
			}

		});

		return Terrasoft.UserCasesListModule;
	}
);


