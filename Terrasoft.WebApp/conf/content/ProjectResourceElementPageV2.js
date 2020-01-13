Terrasoft.configuration.Structures["ProjectResourceElementPageV2"] = {innerHierarchyStack: ["ProjectResourceElementPageV2"], structureParent: "BasePageV2"};
define('ProjectResourceElementPageV2Structure', ['ProjectResourceElementPageV2Resources'], function(resources) {return {schemaUId:'eedc69e9-4dc4-4631-89fa-648ceeebb0b3',schemaCaption: "ProjectResourceElementPageV2", parentSchemaName: "BasePageV2", schemaName:'ProjectResourceElementPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProjectResourceElementPageV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox", "ConfigurationEnums",
	"StorageUtilities", "ConfigurationConstants"],
	function(Terrasoft, BusinessRuleModule, Ext, sandbox, ConfigurationEnums, StorageUtilities,
		ConfigurationConstants) {
		return {
			entitySchemaName: "ProjectResourceElement",
			attributes: {
				"Name": {
					"dependencies": [
						{
							columns: ["Contact"],
							methodName: "onContactChangeSetDefaultName"
						}
					]
				},
				"InternalRate": {
					"dependencies": [
						{
							columns: ["Contact"],
							methodName: "onContactChangeSetInternalRate"
						}
					]
				},
				"ExternalRate": {
					"dependencies": [
						{
							columns: ["Contact"],
							methodName: "onContactChangeSetExternalRate"
						}
					]
				},
				"Project": {
					lookupListConfig: {
						columns: ["StartDate"]
					}
				},
				"Contact": {
					lookupListConfig: {
						filter: function() {
							return this.createContactFilter();
						}
					}
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {
				/**
				 * Creates contact type default filter
				 */
				createContactFilter: function() {
					return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Type", ConfigurationConstants.ContactType.Employee);
				},

				onContactChangeSetDefaultName: function() {
					if (this.get("Operation") === ConfigurationEnums.CardState.Add && this.get("Name") == null) {
						this.set("Name", this.get("Contact").displayValue);
					}
				},

				onContactChangeSetInternalRate: function() {
					if (this.get("Operation") === ConfigurationEnums.CardState.Add) {
						var contact = this.get("Contact");
						if (contact && this.get("IsChanged")) {
							var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "ContactInternalRate"
							});
							esq.addColumn("Rate");
							var filters = Ext.create("Terrasoft.FilterGroup");
							var contactFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Contact", contact.value);
							filters.addItem(contactFilter);
							var startDateFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.LESS_OR_EQUAL, "StartDate", new Date(this.get("Project").StartDate));
							filters.addItem(startDateFilter);
							var dueDateFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "DueDate", new Date(this.get("Project").StartDate));
							filters.addItem(dueDateFilter);
							esq.filters = filters;
							esq.getEntityCollection(function(response) {
								if (response.success) {
									if (response.collection.getCount() > 0) {
										this.set("InternalRate", (response.collection.collection.items[0].values.Rate));
									}
								}
							}, this);
						} else { this.set("InternalRate", null); }
					}
				},

				onContactChangeSetExternalRate: function() {
					if (this.get("Operation") === ConfigurationEnums.CardState.Add) {
						var contact = this.get("Contact");
						if (contact && this.get("IsChanged")) {
							var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "ContactExternalRate"
							});
							esq.addColumn("Rate");
							var filters = Ext.create("Terrasoft.FilterGroup");
							var contactFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"Contact", contact.value);
							filters.addItem(contactFilter);
							var startDateFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.LESS_OR_EQUAL, "StartDate", new Date(this.get("Project").StartDate));
							filters.addItem(startDateFilter);
							var dueDateFilter = this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "DueDate", new Date(this.get("Project").StartDate));
							filters.addItem(dueDateFilter);
							esq.filters = filters;
							esq.getEntityCollection(function(response) {
								if (response.success) {
									if (response.collection.getCount() > 0) {
										this.set("ExternalRate", (response.collection.collection.items[0].values.Rate));
									}
								}
							}, this);
						} else { this.set("ExternalRate", null); }
					}
				},

				getWorkVisible: function() {
					return this.get("Operation") !== ConfigurationEnums.CardState.Add;
				},

				setRateCaption: function(boundRate) {
					Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", function(sysSettingsId) {
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Currency" });
						var primaryColumnFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Id", sysSettingsId.value);
						esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
						esq.addColumn("Symbol");
						esq.filters.add("primaryColumnValue", primaryColumnFilter);
						StorageUtilities.GetESQResultByKey({
							scope: this,
							key: "BaseCurrencyName",
							callback: function(response) {
								var currencySymbol;
								if (response.success) {
									var responseCollection = response.collection;
									if (responseCollection) {
										var currency = responseCollection.getItems()[0];
										if (currency) {
											currencySymbol = currency.get("Symbol");
										}
									}
								}
								var rateCaptionTemplate = this.get("Resources.Strings." + boundRate);
								var baseCurrencyName = currencySymbol || this.get("Resources.Strings.BaseCurrency");
								var rateCaption = Ext.String.format(rateCaptionTemplate, baseCurrencyName);
								this.set(boundRate, rateCaption);
							},
							esq: esq
						});
					}, this);
				},

				init: function() {
					this.callParent(arguments);
					var rateInternalCaption = this.get("RateInternalCaption");
					var rateExternalCaption = this.get("RateExternalCaption");
					if (!rateInternalCaption) {
						this.setRateCaption("RateInternalCaption");
					}
					if (!rateExternalCaption) {
						this.setRateCaption("RateExternalCaption");
					}
				},

				onLookupResult: function(args) {
					var columnName = args.columnName;
					var selectedRows = args.selectedRows;
					var oldValue = this.get(columnName);
					if (!selectedRows.isEmpty()) {
						if (oldValue && oldValue.value === selectedRows.getByIndex(0).value && columnName === "Contact") {
							this.onContactChangeSetInternalRate();
							this.onContactChangeSetExternalRate();
							return;
						}
					}
					this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "actions"
				},
				{
					"operation": "insert",
					"name": "ProjectResourceElementPageGeneralTabContainer",
					"parentName": "CardContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": 7,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ProjectResourceElementPageGeneralTabContainer",
					"name": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"itemType": 0,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Project",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"row": 0,
							"column": 0,
							"colSpan": 24
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "Name",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"row": 1,
							"column": 0,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"row": 2,
							"column": 0,
							"colSpan": 24
						},
						"bindTo": "Contact"
					}
				},
				{
					"operation": "insert",
					"name": "InternalRate",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"row": 3,
							"column": 0,
							"colSpan": 24
						},
						"caption": { "bindTo": "RateInternalCaption" }
					}
				},
				{
					"operation": "insert",
					"name": "ExternalRate",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"layout": {
							"row": 4,
							"column": 0,
							"colSpan": 24
						},
						"caption": { "bindTo": "RateExternalCaption" }
					}
				},
				{
					"operation": "insert",
					"name": "PlanningWork",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "getWorkVisible"
						},
						"layout": {
							"row": 5,
							"column": 0,
							"colSpan": 24
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "ActualWork",
					"parentName": "ProjectResourceElementPageGeneralBlock",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "getWorkVisible"
						},
						"layout": {
							"row": 6,
							"column": 0,
							"colSpan": 24
						},
						"controlConfig": {
							"enabled": false
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


