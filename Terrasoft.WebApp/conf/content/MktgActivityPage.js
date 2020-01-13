Terrasoft.configuration.Structures["MktgActivityPage"] = {innerHierarchyStack: ["MktgActivityPage"], structureParent: "BaseModulePageV2"};
define('MktgActivityPageStructure', ['MktgActivityPageResources'], function(resources) {return {schemaUId:'a24f8c1e-1b98-4608-87a0-1f1e380b0bdd',schemaCaption: "MktgActivityPage", parentSchemaName: "BaseModulePageV2", schemaName:'MktgActivityPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MktgActivityPage", ["terrasoft", "MoneyModule", "MultiCurrencyEdit", "MultiCurrencyEditUtilities"],
		function(Terrasoft, MoneyModule) {
			return {
				entitySchemaName: "MktgActivity",
				mixins: {
					MultiCurrencyEditUtilities: "Terrasoft.MultiCurrencyEditUtilities"
				},
				messages: {
					"SelectedSideBarItemChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					/**
					 * Currency
					 */
					"Currency": {
						lookupListConfig: {
							columns: ["Division"]
						}
					},
					/**
					 * Currency rate
					 */
					"CurrencyRate": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						dependencies: [
							{
								columns: ["Currency"],
								methodName: "setCurrencyRate"
							}
						]
					},
					/**
					 * Currency rate list.
					 */
					"CurrencyRateList": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION,
						value: this.Ext.create("Terrasoft.Collection")
					},
					/**
					 * Currency button menu list.
					 */
					"CurrencyButtonMenuList": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION,
						value: this.Ext.create("Terrasoft.BaseViewModelCollection")
					},
					/**
					 * Planned budget
					 */
					"PlannedBudget": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						dependencies: [
							{
								columns: ["CurrencyRate"],
								methodName: "recalculatePlannedBudget"
							}
						]
					},
					/**
					 * Planned budget, base currency
					 */
					"PrimaryPlannedBudget": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						dependencies: [
							{
								columns: ["PlannedBudget"],
								methodName: "recalculatePrimaryPlannedBudget"
							}
						]
					},
					/**
					 * Spent budget
					 */
					"SpentBudget": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						dependencies: [
							{
								columns: ["CurrencyRate"],
								methodName: "recalculateSpentBudget"
							}
						]
					},
					/**
					 * Spent budget, base currency
					 */
					"PrimarySpentBudget": {
						dataValueType: Terrasoft.DataValueType.FLOAT,
						dependencies: [
							{
								columns: ["SpentBudget"],
								methodName: "recalculatePrimarySpentBudget"
							}
						]
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
					 * @overridden
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.mixins.MultiCurrencyEditUtilities.init.call(this);
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#getHeader
					 * @overridden
					 */
					getHeader: function() {
						return this.entitySchema.caption;
					},

					/**
					 * Sets currency rate value
					 * @protected
					 */
					setCurrencyRate: function() {
						var currentDateTime = this.getSysDefaultValue(Terrasoft.SystemValueType.CURRENT_DATE_TIME);
						MoneyModule.LoadCurrencyRate.call(this, "Currency", "CurrencyRate", currentDateTime);
					},

					/**
					 * Calculates planned budget
					 * @protected
					 */
					recalculatePlannedBudget: function() {
						MoneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "PlannedBudget", "PrimaryPlannedBudget",
								this.getCurrencyDivision());
					},

					/**
					 * Calculates planned budget in the base currency
					 * @protected
					 */
					recalculatePrimaryPlannedBudget: function() {
						MoneyModule.RecalcBaseValue.call(this, "CurrencyRate", "PlannedBudget", "PrimaryPlannedBudget",
								this.getCurrencyDivision());
					},

					/**
					 * Calculates spent budget
					 * @protected
					 */
					recalculateSpentBudget: function() {
						MoneyModule.RecalcCurrencyValue.call(this, "CurrencyRate", "SpentBudget", "PrimarySpentBudget",
								this.getCurrencyDivision());
					},

					/**
					 * Calculates spent budget in the base currency
					 * @protected
					 */
					recalculatePrimarySpentBudget: function() {
						MoneyModule.RecalcBaseValue.call(this, "CurrencyRate", "SpentBudget", "PrimarySpentBudget",
								this.getCurrencyDivision());
					},

					/**
					 * Returns currency division
					 * @protected
					 */
					getCurrencyDivision: function() {
						var currency = this.get("Currency");
						return currency && currency.Division;
					},

					changeSelectedSideBarMenu: function() {
						var moduleStructure = this.getModuleStructure("CampaignPlanner");
						if (moduleStructure) {
							var hash = moduleStructure.sectionModule + "/";
							if (moduleStructure.sectionSchema) {
								hash += moduleStructure.sectionSchema + "/";
							}
							this.sandbox.publish("SelectedSideBarItemChanged", hash, ["sectionMenuModule"]);
						} else {
							this.callParent(arguments);
						}
					}

				},
				details: /**SCHEMA_DETAILS*/{
					Files: {
						schemaName: "FileDetailV2",
						entitySchemaName: "MktgActivityFile",
						filter: {
							masterColumn: "Id",
							detailColumn: "MktgActivity"
						}
					}
				}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "Name",
						"values": {
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 1
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "Channel",
						"values": {
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "Status",
						"values": {
							"layout": {
								"column": 12,
								"row": 1,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 2
					},
					{
						"operation": "insert",
						"name": "Owner",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 3
					},
					{
						"operation": "insert",
						"name": "CampaignPlanner",
						"values": {
							"layout": {
								"column": 12,
								"row": 2,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 4
					},
					{
						"operation": "insert",
						"name": "GeneralInfoTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.GeneralInfoTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "group",
						"values": {
							"itemType": 15,
							"caption": {
								"bindTo": "Resources.Strings.groupCaption"
							},
							"items": [],
							"controlConfig": {
								"collapsed": false
							}
						},
						"parentName": "GeneralInfoTab",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "GeneralInfoGridLayout",
						"values": {
							"itemType": 0,
							"items": []
						},
						"parentName": "group",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoGridLayout",
						"propertyName": "items",
						"name": "PlannedBudget",
						"values": {
							"bindTo": "PlannedBudget",
							"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 1},
							"primaryAmount": "PrimaryPlannedBudget",
							"currency": "Currency",
							"rate": "CurrencyRate",
							"primaryAmountEnabled": false,
							"generator": "MultiCurrencyEditViewGenerator.generate"
						},
						"index": 0
					},
					{
						"operation": "insert",
						"parentName": "GeneralInfoGridLayout",
						"propertyName": "items",
						"name": "SpentBudget",
						"values": {
							"bindTo": "SpentBudget",
							"layout": {"column": 0, "row": 1, "colSpan": 12, "rowSpan": 1},
							"primaryAmount": "PrimarySpentBudget",
							"currency": "Currency",
							"rate": "CurrencyRate",
							"primaryAmountEnabled": false,
							"generator": "MultiCurrencyEditViewGenerator.generate"
						},
						"index": 1
					},
					{
						"operation": "insert",
						"name": "StartDate",
						"values": {
							"layout": {
								"column": 12,
								"row": 0,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "GeneralInfoGridLayout",
						"propertyName": "items",
						"index": 2
					},
					{
						"operation": "insert",
						"name": "DueDate",
						"values": {
							"layout": {
								"column": 12,
								"row": 1,
								"colSpan": 12,
								"rowSpan": 1
							}
						},
						"parentName": "GeneralInfoGridLayout",
						"propertyName": "items",
						"index": 3
					},
					{
						"operation": "insert",
						"name": "NotesAndFilesTab",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 3,
						"values": {
							"caption": {"bindTo": "Resources.Strings.NotesAndFilesTabCaption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"name": "Files",
						"values": {
							"itemType": Terrasoft.ViewItemType.DETAIL
						}
					},
					{
						"operation": "insert",
						"name": "NotesControlGroup",
						"parentName": "NotesAndFilesTab",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"items": [],
							"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"}
						}
					},
					{
						"operation": "insert",
						"parentName": "NotesControlGroup",
						"propertyName": "items",
						"name": "Notes",
						"values": {
							"contentType": Terrasoft.ContentType.RICH_TEXT,
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"labelConfig": {
								"visible": false
							},
							"controlConfig": {
								"imageLoaded": {
									"bindTo": "insertImagesToNotes"
								},
								"images": {
									"bindTo": "NotesImagesCollection"
								}
							}
						}
					}
				]/**SCHEMA_DIFF*/,
				rules: {},
				userCode: {}
			};
		});


