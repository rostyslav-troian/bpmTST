Terrasoft.configuration.Structures["AccountSectionV2"] = {innerHierarchyStack: ["AccountSectionV2NUI", "AccountSectionV2SocialNetworkIntegration", "AccountSectionV2ProductCatalogue", "AccountSectionV2OSM", "AccountSectionV2"], structureParent: "BaseSectionV2"};
define('AccountSectionV2NUIStructure', ['AccountSectionV2NUIResources'], function(resources) {return {schemaUId:'65bb2306-7314-4605-a863-04a410798497',schemaCaption: "Accounts section", parentSchemaName: "BaseSectionV2", schemaName:'AccountSectionV2NUI',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountSectionV2SocialNetworkIntegrationStructure', ['AccountSectionV2SocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'b052ac38-6acf-45cb-bf5f-e5fffa8226ea',schemaCaption: "Accounts section", parentSchemaName: "AccountSectionV2NUI", schemaName:'AccountSectionV2SocialNetworkIntegration',parentSchemaUId:'65bb2306-7314-4605-a863-04a410798497',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountSectionV2NUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountSectionV2ProductCatalogueStructure', ['AccountSectionV2ProductCatalogueResources'], function(resources) {return {schemaUId:'64e1bf9c-f31e-4598-b289-2febbf4c3015',schemaCaption: "Accounts section", parentSchemaName: "AccountSectionV2SocialNetworkIntegration", schemaName:'AccountSectionV2ProductCatalogue',parentSchemaUId:'b052ac38-6acf-45cb-bf5f-e5fffa8226ea',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountSectionV2SocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountSectionV2OSMStructure', ['AccountSectionV2OSMResources'], function(resources) {return {schemaUId:'2d9d4461-1ff0-4aef-ab0b-8e244332ae82',schemaCaption: "Accounts section", parentSchemaName: "AccountSectionV2ProductCatalogue", schemaName:'AccountSectionV2OSM',parentSchemaUId:'64e1bf9c-f31e-4598-b289-2febbf4c3015',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountSectionV2ProductCatalogue",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountSectionV2Structure', ['AccountSectionV2Resources'], function(resources) {return {schemaUId:'7be250e8-69be-4ee2-8a3a-48bb4b09c12a',schemaCaption: "Accounts section", parentSchemaName: "AccountSectionV2OSM", schemaName:'AccountSectionV2',parentSchemaUId:'2d9d4461-1ff0-4aef-ab0b-8e244332ae82',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountSectionV2OSM",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountSectionV2NUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountSectionV2NUI", ["RightUtilities", "ConfigurationConstants"],
	function(RightUtilities, ConfigurationConstants) {
	return {
		entitySchemaName: "Account",
		attributes: {
			"canUseGoogleOrSocialFeaturesByBuildType": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		contextHelpId: "1001",
		messages: {
			/**
			 * @message GetMapsConfig
			 * ########## #########, ########### ### ###### ###### ####### ## #####
			 * @param {Object} #########, ############ ### ###### ###### ####### ## #####
			 */
			"GetMapsConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message SetInitialisationData
			 * ############# ########### ######### ###### # ########## #####
			 */
			"SetInitialisationData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {
			/**
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				var sysSettings = ["BuildType"];
				Terrasoft.SysSettings.querySysSettings(sysSettings, function() {
					var buildType = Terrasoft.SysSettings.cachedSettings.BuildType &&
						Terrasoft.SysSettings.cachedSettings.BuildType.value;
					this.set("canUseGoogleOrSocialFeaturesByBuildType", buildType !==
						ConfigurationConstants.BuildType.Public);
				}, this);
			},

			/**
			 * @overridden
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1001);
				this.callParent(arguments);
			},

			/**
			 * ######## #######, ####### ###### ########## ########
			 * @protected
			 * @overridden
			 * @return {Object} ########## #######, ####### ###### ########## ########
			 */
			getGridDataColumns: function() {
				var gridDataColumns = this.callParent(arguments);
				if (!gridDataColumns.Name) {
					gridDataColumns.Name = {
						path: "Name"
					};
				}
				if (!gridDataColumns.PrimaryContact) {
					gridDataColumns.PrimaryContact = {
						path: "PrimaryContact"
					};
				}
				return gridDataColumns;
			},

			/**
			 * ######## "######## ## #####"
			 */
			openShowOnMap: function() {
				var items = this.getSelectedItems();
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Account"
				});
				select.addColumn("Id");
				select.addColumn("Name");
				select.addColumn("Address");
				select.addColumn("City");
				select.addColumn("Region");
				select.addColumn("Country");
				select.addColumn("GPSN");
				select.addColumn("GPSE");
				select.filters.add("AcountIdFilter", this.Terrasoft.createColumnInFilterWithParameters("Id", items));
				select.getEntityCollection(function(result) {
					if (result.success) {
						var mapsConfig = {
							mapsData: []
						};
						result.collection.each(function(item) {
							var address = [];
							if (item.get("Country") && item.get("Country").displayValue) {
								address.push(item.get("Country").displayValue);
							}
							if (item.get("Region") && item.get("Region").displayValue) {
								address.push(item.get("Region").displayValue);
							}
							if (item.get("City") && item.get("City").displayValue) {
								address.push(item.get("City").displayValue);
							}
							address.push(item.get("Address"));
							var dataItem = {
								caption: item.get("Name"),
								content: "<h2>" + item.get("Name") + "</h2><div>" + address.join(", ") + "</div>",
								address: item.get("Address") ? address.join(", ") : null,
								gpsN: item.get("GPSN"),
								gpsE: item.get("GPSE"),
								updateCoordinatesConfig: {
									schemaName: "Account",
									id: item.get("Id")
								}
							};
							mapsConfig.mapsData.push(dataItem);
						});
						var mapsModuleSandboxId = this.sandbox.id + "_MapsModule" + this.Terrasoft.generateGUID();
						this.sandbox.subscribe("GetMapsConfig", function() {
							return mapsConfig;
						}, [mapsModuleSandboxId]);
						this.sandbox.loadModule("MapsModule", {
							id: mapsModuleSandboxId,
							keepAlive: true
						});
					}
				}, this);
			},

			/**
			 * @obsolete
			 */
			findContactsInSocialNetworks: function() {
				var activeRowId = this.get("ActiveRow");
				var selectedRowId = this.get("SelectedRows");
				if (!activeRowId) {
					if (selectedRowId.length > 0) {
						activeRowId = selectedRowId[0];
					}
				}
				if (activeRowId) {
					var gridData = this.get("GridData");
					var activeRow = gridData.get(activeRowId);
					var recordName = activeRow.get(this.primaryDisplayColumnName);
					var config = {
						entitySchemaName: "Account",
						mode: "search",
						recordId: activeRowId,
						recordName: recordName
					};
					var historyState = this.sandbox.publish("GetHistoryState");
					this.sandbox.publish("PushHistoryState", {
						hash: historyState.hash.historyState,
						silent: true
					}, this);
					this.sandbox.loadModule("FindContactsInSocialNetworksModule", {
						renderTo: "centerPanel",
						id: this.sandbox.id + "_FindContactsInSocialNetworksModule",
						keepAlive: true
					});
					this.sandbox.subscribe("ResultSelectedRows", function(args) {
						this.set("Number", args.name);
						this.set("SocialMediaId", args.id);
					}, this, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
					this.sandbox.subscribe("SetInitialisationData", function() {
						return config;
					}, [this.sandbox.id + "_FindContactsInSocialNetworksModule"]);
				}
			},

			/**
			 * ########## ######### ######## ####### # ###### ########### #######
			 * @protected
			 * @overridden
			 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ####### # ######
			 * ########### #######
			 */
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {"bindTo": "openShowOnMap"},
					"Caption": {"bindTo": "Resources.Strings.ShowOnMapActionCaption"},
					"Enabled": {"bindTo": "isAnySelected"}
				}));
				return actionMenuItems;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGridContainer",
				"values": {
					"controlConfig": {
						"classes": ["account-grid"]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define('AccountSectionV2SocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountSectionV2SocialNetworkIntegration", [],
		function() {
			return {
				entitySchemaName: "Account",
				methods: {},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		});

define('AccountSectionV2ProductCatalogueResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountSectionV2ProductCatalogue", ["LookupUtilities", "RightUtilities"],
	function(LookupUtilities, RightUtilities) {
		return {
			entitySchemaName: "Account",
			methods: {
				/**
				 * ######### ######## ####### "#####-####" ###### ###########
				 * @protected
				 * @param args
				 */
				setPriceList: function(args) {
					var records = this.getSelectedItems();
					var selectedCount = records.length;
					var collection = args.selectedRows;
					if (records && records.length && collection.getCount() > 0) {
						var priceList = collection.getByIndex(0);
						RightUtilities.checkCanEditRecords({
							schemaName: "Account",
							primaryColumnValues: records
						}, function(result) {
							var items = result;
							var batch = this.Ext.create("Terrasoft.BatchQuery");
							var grid = this.getGridData();
							Terrasoft.each(items, function(item) {
								if (item.Value) {
									var row = grid.find(item.Key);
									if (row) {
										var rowValue = {
											value: priceList.value,
											displayValue: priceList.displayValue
										};
										row.set("PriceList", rowValue);
									}
									var update = this.Ext.create("Terrasoft.UpdateQuery", {
										rootSchemaName: "Account"
									});
									update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL, "Id", item.Key));
									update.setParameterValue("PriceList", priceList.Id,
										this.Terrasoft.DataValueType.GUID);
									batch.add(update, function() {}, this);
								}
							}, this);
							if (batch.queries.length) {
								batch.execute(function() {
									this.Terrasoft.showInformation(
										this.Ext.String.format(
											this.get("Resources.Strings.AccountsChangedMessage"),
											items.length, selectedCount));
								}, this);
							}
						}, this);
					}
				},

				/**
				 * ######### ######## ###### ## ########### "#####-#####"
				 * @protected
				 */
				openPriceListLookup: function() {
					var config = {
						entitySchemaName: "Pricelist",
						enableMultiSelect: false,
						hideActions: true
					};
					LookupUtilities.Open(this.sandbox, config, this.setPriceList, this, null, false, false);
				}
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);

define('AccountSectionV2OSMResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountSectionV2OSM", ["MapsUtilities", "MapsHelper"],
	function(MapsUtilities, MapsHelper) {
		return {
			entitySchemaName: "Account",
			methods: {
				/**
				 * ######## "######## ## #####".
				 */
				openShowOnMap: function() {
					var config = {
						columnNameLongitude: "GPSE",
						columnNameLatitude: "GPSN"
					};
					MapsHelper.openShowOnMap.call(this, this.entitySchemaName, function(mapsConfig) {
						MapsUtilities.open({
							scope: this,
							mapsConfig: mapsConfig
						});
					}, null, config);
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});

define("AccountSectionV2", [], function() {
		return {
			methods: {
				/**
				 * @inheritdoc BaseDataView#setCanSearchDuplicatesAttributes
				 * @override
				 */
				setCanSearchDuplicatesAttributes: function(canSearchDuplicatesOperation) {
					this.callParent(arguments);
					this.set("DeduplicationEnabled", this.getIsDeduplicationEnable());
					const isEnabled = canSearchDuplicatesOperation && this.$DeduplicationEnabled;
					this.set("canSearchDuplicates", this.$canSearchDuplicates || isEnabled);
				}
			}
		};
	}
);


