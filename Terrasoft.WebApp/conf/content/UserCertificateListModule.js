Terrasoft.configuration.Structures["UserCertificateListModule"] = {innerHierarchyStack: ["UserCertificateListModule"]};
define("UserCertificateListModule", ["terrasoft", "ext-base", "UserCertificateListModuleResources",
		"PortalClientConstants", "BaseNestedModule", "GridUtilitiesV2", "ContainerListGenerator", "ContainerList",
		"DashboardGridModule", "css!PortalModulesCSS"],
	function(Terrasoft, Ext, resources, PortalClientConstants) {

		/**
		 * @class Terrasoft.configuration.UserCertificateListViewConfig
		 * Class generating a representation of the module configuration list of certificate on the portal.
		 */
		Ext.define("Terrasoft.configuration.UserCertificateListViewConfig", {
			extend: "Terrasoft.DashboardGridViewConfig",
			alternateClassName: "Terrasoft.UserCertificateListViewConfig",

			/**
			 * Generates a configuration presentation module of certificate.
			 * @protected
			 * @overridden
			 * @param {Object} config Configuration object.
			 * @return {Object[]} Returns configuration presentation module requests a list certificate on the portal.
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
						"wrapClassName": ["dashboard-grid-container", config.style]
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
										"bindTo": "Resources.Strings.CertificatesListHeaderCaption"
									},
									"labelClass": "default-widget-header-label"
								},
								{
									"name": "dashboard-grid-signupbutton",
									"classes": {
										"wrapClassName": ["default-widget-signupbutton", config.style],
										"textClass": "dashboard-grid-gotobutton"
									},
									"itemType": Terrasoft.ViewItemType.BUTTON,
									"caption": {
										"bindTo": "Resources.Strings.SignUpButtonCaption"
									},
									"click": {
										"bindTo": "openSignUpPage"
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
								"wrapClassName": ["dashboard-grid-list"]
							},
							"generator": "ContainerListGenerator.generatePartial",
							"getEmptyMessageConfig": {
								"bindTo": "prepareEmptyGridMessageConfig"
							},
							"itemType": Terrasoft.ViewItemType.GRID,
							"itemConfig": [
								{
									"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
									"name": "itemGridLayout",
									"items": columnsConfig
								}
							]
						}
					]
				};
			}
		});

		/**
		 * @class Terrasoft.configuration.UserCertificateListViewModule
		 * Class model representation of the module on the portal a list of certificate.
		 */
		Ext.define("Terrasoft.configuration.UserCertificateListViewModule", {
			extend: "Terrasoft.DashboardGridViewModel",
			alternateClassName: "Terrasoft.UserCertificateListViewModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * Initializes model resource values from the resource object.
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
			 * Opens sign up certification page.
			 * @protected
			 */
			openSignUpPage: function() {
				var url = resources.localizableStrings.SignUpPageAddress;
				var win = window.open(url, "_blank");
				win.focus();
			},

			/**
			 * @inheritdoc DashboardGridViewConfig#getFilters
			 * @overridden
			 */
			getFilters: function() {
				var filterGroup = this.callParent(arguments);
				var date = new Date();
				filterGroup.add("IssueDateLess", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.LESS_OR_EQUAL, "IssueDate", date));
				filterGroup.add("ExpireDateGreater", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "ExpireDate", date));
				return filterGroup;
			}
		});

		/**
		 * @class Terrasoft.configuration.UserCertificateListModule
		 * Class module Certificate on the portal List.
		 */
		Ext.define("Terrasoft.configuration.UserCertificateListModule", {
			extend: "Terrasoft.DashboardGridModule",
			alternateClassName: "Terrasoft.UserCertificateListModule",

			Ext: null,
			sandbox: null,
			Terrasoft: null,
			showMask: true,

			/**
			 * Name of the class presentation models for embedded module.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.UserCertificateListViewModule",

			/**
			 * Generator class name embedded module configuration representation.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.UserCertificateListViewConfig",

			/**
			 * Generator Class Name of the view.
			 * @type {String}
			 */
			viewGeneratorClass: "Terrasoft.ViewGenerator",

			/**
			 * Initializes the module configuration.
			 * @protected
			 * @overridden
			 */
			initConfig: function() {
				this.moduleConfig =	{
					"caption": "",
					"sectionId": PortalClientConstants.SysModule.PortalMainPageSectionId,
					"entitySchemaName": "Certificate",
					"filterData": "{\"className\":\"Terrasoft.FilterGroup\",\"items\":{},\"logicalOperation\":0," +
					"\"isEnabled\":true,\"filterType\":6,\"rootSchemaName\":\"Certificate\",\"key\":\"\"}",
					"style": "widget-blue",
					"orderDirection": 2,
					"orderColumn": "ExpireDate",
					"gridConfig": {
						"items": [
							{
								"bindTo": "CertificateNumber",
								"type": "title",
								"position": {
									"column": 0,
									"colSpan": 6,
									"row": 1
								},
								"dataValueType": 10,
								"aggregationType": "",
								"metaPath": "CertificateNumber",
								"path": "CertificateNumber"
							},
							{
								"bindTo": "ExpireDate",
								"type": "title",
								"position": {
									"column": 6,
									"colSpan": 6,
									"row": 1
								},
								"aggregationType": "",
								"metaPath": "ExpireDate",
								"path": "ExpireDate"
							},
							{
								"bindTo": "Comments",
								"type": "title",
								"position": {
									"column": 12,
									"colSpan": 12,
									"row": 1
								},
								"aggregationType": "",
								"metaPath": "Comments",
								"path": "Comments"
							}
						]
					}
				};
			}

		});

		return Terrasoft.UserCertificateListModule;
	}
);


