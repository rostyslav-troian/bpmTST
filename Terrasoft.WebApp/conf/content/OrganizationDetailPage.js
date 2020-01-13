Terrasoft.configuration.Structures["OrganizationDetailPage"] = {innerHierarchyStack: ["OrganizationDetailPage"], structureParent: "BasePageV2"};
define('OrganizationDetailPageStructure', ['OrganizationDetailPageResources'], function(resources) {return {schemaUId:'83143e53-900d-4825-ae6f-6171fc9d4740',schemaCaption: "OrganizationDetailPage", parentSchemaName: "BasePageV2", schemaName:'OrganizationDetailPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OrganizationDetailPage", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			entitySchemaName: "VwSspAdminUnit",
			details: /**SCHEMA_DETAILS*/{
				"PortalUserInOrganization": {
					"schemaName": "PortalUserInOrganizationDetail",
					"filter": {
						"masterColumn": "PortalAccount",
						"detailColumn": "PortalAccount"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"bindTo": "Name",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ParentRole",
					"values": {
						"bindTo": "ParentRole",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						},
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareParentRoleList"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PortalAccount",
					"values": {
						"bindTo": "PortalAccount",
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						},
						"enabled": {
							"bindTo": "isNewMode"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "OrganizationLicense",
					"values": {
						"bindTo": "SelectedOrganizationLicense",
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareOrganizationLicense"
							},
							"list": {"bindTo": "OrganizationLicenseList"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "GeneralInformationTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.GeneralInformationTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "PortalUserInOrganization",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL,
						"visible": {"bindTo": "getIsPortalUserInOrganizationVisible"}
					},
					"parentName": "GeneralInformationTab",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/,

			attributes: {
				"PortalAccount": {
					"columnPath": "PortalAccount",
					"isRequired": true,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"lookupListConfig": {
						filter: function () {
							return this.getOrganizationFilter();
						}
					},
					dependencies: [
						{
							columns: ["PortalAccount"],
							methodName: "onOrganizationChanged"
						}
					]
				},

				"ParentRole": {
					"isRequired": true,
					"lookupListConfig": {
						"entitySchemaName": "SysAdminUnit",
						"hideActions": true,
						"filter": function () {
							return this.getParentRoleFilter();
						}
					}
				},

				"Name": {
					"isRequired": true
				},

				"SelectedOrganizationLicense": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": {
						"bindTo": "Resources.Strings.OrganizationLicenseCaption"
					},
					"dependencies": [
						{
							"columns": ["SelectedOrganizationLicense"],
							"methodName": "onOrganizationLicenseChanged"
						}
					]
				},

				"OrganizationLicenseList": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * Returns filter for PortalAccount column.
				 * @returns {Terrasoft.FilterGroup} PortalAccount filter.
				 */
				getOrganizationFilter: function() {
					const filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					filterGroup.add(Terrasoft.createIsNullFilter(
						Ext.create("Terrasoft.ColumnExpression", {
							columnPath: ">[VwSspAdminUnit:PortalAccount:Id].PortalAccount"
						})
					));
					return filterGroup;
				},

				/**
				 * Returns filter for ParentRole column.
				 * @returns {Terrasoft.FilterGroup} ParentRole filter.
				 */
				getParentRoleFilter: function() {
					const filterGroup = this.Ext.create("Terrasoft.FilterGroup");
					filterGroup.add("orgRoleFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnitTypeValue",
						ConfigurationConstants.SysAdminUnit.Type.Organisation));
					filterGroup.add("portalConnectionFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ConnectionType", 1));
					filterGroup.add("notOrganizationFilter",
						this.Terrasoft.createColumnIsNullFilter("PortalAccount"));
					return filterGroup;
				},

				/**
				 * PortalAccount field change action.
				 * @public
				 */
				onOrganizationChanged: function() {
					this.setDefaultOrganizationName();
					this.sandbox.publish("UpdateDetail", {reloadAll: true}, [this.getDetailId("PortalUserInOrganization")]);
				},

				/**
				 * Sets default organization name.
				 * @protected
				 * @virtual
				 */
				setDefaultOrganizationName: function() {
					if (Ext.isEmpty(this.$Name) && !Ext.isEmpty(this.$PortalAccount)) {
						this.$Name = this.$PortalAccount.displayValue;
					}
				},

				getIsPortalUserInOrganizationVisible: function() {
					return !this.isNewMode();
				},

				/**
				 * Loads available licenses to list.
				 */
				onPrepareOrganizationLicense: function() {
					const config = this.getSspLicensesServiceConfig();
					this.callService(config, this.onGetSspLicenseResponse, this);
				},

				/**
				 * Returns service config for getting ssp licenses.
				 * @returns {Object} Service config.
				 */
				getSspLicensesServiceConfig: function() {
					return {
						serviceName: "SspUserManagementService",
						methodName: "GetSspLicNames"
					};
				},

				/**
				 * Returns service config for getting default ssp license name.
				 * @returns {Object} Service config.
				 */
				getDefaultSspLicenseServiceConfig: function() {
					return {
						serviceName: "SspUserManagementService",
						methodName: "GetDefaultSspLicName"
					};
				},

				/**
				 * Processes response after getting ssp licenses.
				 * @param {Object} response Service response.
				 */
				onGetSspLicenseResponse: function(response) {
					const result = response && response.GetSspLicNamesResult;
					if (result && result.success) {
						let list = this.$OrganizationLicenseList;
						let tempLicenseList = {};
						this.Terrasoft.each(result.sspLicNames, function(item) {
							let itemId = this.Terrasoft.generateGUID();
							tempLicenseList[itemId] = {
								value: itemId,
								displayValue: item,
							}
						}, this);
						list.clear();
						list.loadAll(tempLicenseList);
					}
				},

				/**
				 * OrganizationLicense changed action.
				 */
				onOrganizationLicenseChanged: function() {
					this.$LicenseName = this.$SelectedOrganizationLicense
						&& this.$SelectedOrganizationLicense.displayValue;
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#init
				 * @protected
				 */
				init: function() {
					this.callParent(arguments);
					this.set("OrganizationLicenseList", this.Ext.create("Terrasoft.Collection"));
					if (this.isNewMode()) {
						const config = this.getDefaultSspLicenseServiceConfig();
						this.callService(config, function (response) {
							const defaultLic = response && response.GetDefaultSspLicNameResult;
							if (defaultLic) {
								this.setSelectedOrganizationLicense(defaultLic);
								this.$LicenseName = defaultLic;
							}
						}, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
				 * @overriden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					if (!this.isNewMode()) {
						this.setSelectedOrganizationLicense(this.$LicenseName);
					}
				},

				/**
				 * Sets license in lookup default.
				 * @protected
				 */
				setSelectedOrganizationLicense: function(licName) {
					this.$SelectedOrganizationLicense = {
						value: this.Terrasoft.generateGUID(),
						displayValue: licName
					};
				},

				/**
				 * Forms parent role collection.
				 * @protected
				 */
				onPrepareParentRoleList: Terrasoft.emptyFn
			}
		};
	});


