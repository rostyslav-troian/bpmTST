Terrasoft.configuration.Structures["ContactExternalRatePageV2"] = {innerHierarchyStack: ["ContactExternalRatePageV2"], structureParent: "BasePageV2"};
define('ContactExternalRatePageV2Structure', ['ContactExternalRatePageV2Resources'], function(resources) {return {schemaUId:'e99257a0-f06a-4526-bed3-1435917fa95c',schemaCaption: "ContactExternalRatePageV2", parentSchemaName: "BasePageV2", schemaName:'ContactExternalRatePageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactExternalRatePageV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox", "StorageUtilities"],
		function(Terrasoft, BusinessRuleModule, Ext, sandbox, StorageUtilities) {
			return {
				entitySchemaName: "ContactExternalRate",
				attributes: {
					"StartDate": {
						"dependencies": [
							{
								"columns": ["DueDate"],
								"methodName": "onDueDateChanged"
							}
						]
					},
					"DueDate": {
						"dependencies": [
							{
								"columns": ["StartDate"],
								"methodName": "onStartDateChanged"
							}
						]
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				methods: {
					setValidationConfig: function() {
						this.callParent(arguments);
						this.addColumnValidator("Rate", function(value) {
							var invalidMessage = "";
							if (value < 0) {
								invalidMessage = this.get("Resources.Strings.WarningRateLessZero");
							}
							return {
								fullInvalidMessage: invalidMessage,
								invalidMessage: invalidMessage
							};
						});
					},
					onStartDateChanged: function() {
						var startDate = this.get("StartDate");
						if (!startDate) {
							return;
						}
						var dueDate = this.get("DueDate");
						if (dueDate && dueDate < startDate) {
							this.showInformationDialog(this.get("Resources.Strings.dueDateLessStartDate"), function() {
							}, {
								style: Terrasoft.MessageBoxStyles.BLUE
							});
							this.set("DueDate", startDate);
						}
					},
					onDueDateChanged: function() {
						var dueDate = this.get("DueDate");
						if (!dueDate) {
							return;
						}
						var startDate = this.get("StartDate");
						if (startDate && dueDate < startDate) {
							this.set("StartDate", dueDate);
							this.showInformationDialog(this.get("Resources.Strings.dueDateLessStartDate"), function() {
							}, {
								style: Terrasoft.MessageBoxStyles.BLUE
							});

						}
					},
					checkOnSave: function(datesChecked) {
						var startDate = this.get("StartDate");
						if (startDate) {
							startDate = new Date(startDate).setHours(0, 0, 0, 0);
						}
						var dueDate = this.get("DueDate");
						if (dueDate) {
							dueDate = new Date(dueDate).setHours(0, 0, 0, 0);
						}
						if (datesChecked === true || !dueDate) {
							this.ckecked = true;
							this.save();
						}
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ContactExternalRate"});
						select.addColumn("StartDate");
						select.addColumn("DueDate");
						select.filters.add("others", Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Contact", this.get("Contact").value));
						select.filters.add("current", Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL,
								"Id", this.get("Id")));
						select.getEntityCollection(function(response) {
							if (!response.success) {
								return;
							}
							var datesChecked = true;
							response.collection.getItems().forEach(function(item) {
								var itemStartDate = item.get("StartDate");
								var itemDueDate = item.get("DueDate");
								var startDateCondition = startDate >= itemStartDate && startDate <= itemDueDate;
								var dueDateCondition = dueDate >= itemStartDate && dueDate <= itemDueDate;
								var durationCondition = startDate <= itemStartDate && dueDate >= itemDueDate;
								datesChecked = datesChecked && !(startDateCondition || dueDateCondition || durationCondition);
							});
							if (datesChecked) {
								this.ckecked = true;
								this.save();
							} else {
								this.showInformationDialog(this.get("Resources.Strings.PeriodExists"), function() {
								}, {
									style: Terrasoft.MessageBoxStyles.BLUE
								});
							}
						}, this);
						this.ckecked = false;
					},
					save: function() {
						if (this.ckecked) {
							this.callParent(arguments);
							this.ckecked = false;
						} else { this.checkOnSave(); }
					},
					init: function() {
						this.callParent(arguments);
						var rateCaption = this.get("RateCaption");
						if (!rateCaption) {
							Terrasoft.SysSettings.querySysSettingsItem("PrimaryCurrency", function(sysSettingsId) {
								var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Currency"});
								var primaryColumnFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
										"Id", sysSettingsId.value);
								esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
								esq.addColumn("Symbol");
								esq.filters.add("primaryColumnValue", primaryColumnFilter);
								StorageUtilities.GetESQResultByKey({
									scope: this,
									key: "BaseCurrencyName",
									callback: function(response) {
										var currencyName;
										var currencySymbol;
										if (response.success) {
											var responseCollection = response.collection;
											if (responseCollection) {
												var currency = responseCollection.getItems()[0];
												if (currency) {
													currencyName = currency.get("Name");
													currencySymbol = currency.get("Symbol");
												}
											}
										}
										var rateCaptionTemplate = this.get("Resources.Strings.Rate");
										var baseCurrencyName = currencySymbol || this.get("Resources.Strings.BaseCurrency");
										rateCaption = Ext.String.format(rateCaptionTemplate, baseCurrencyName);
										this.set("RateCaption", rateCaption);
									},
									esq: esq
								});
							}, this);
						}
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "ContactExternalRatePageGeneralTabContainer",
						"values": {
							"itemType": 7,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "ContactExternalRatePageGeneralTabContainer",
						"propertyName": "items",
						"name": "ContactExternalRatePageGeneralBlock",
						"values": {
							"itemType": 0,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Contact",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 12
							},
							"enabled": false
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "StartDate",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "DueDate",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 12
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "Header",
						"propertyName": "items",
						"name": "Rate",
						"values": {
							"layout": {
								"column": 0,
								"row": 3,
								"colSpan": 12
							},
							"caption": { "bindTo": "RateCaption"}
						}
					},
					{
						"operation": "remove",
						"name": "actions"
					}
				]/**SCHEMA_DIFF*/,
				rules: {},
				userCode: {}
			};
		});


