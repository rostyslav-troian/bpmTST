Terrasoft.configuration.Structures["BaseAddressDetailV2"] = {innerHierarchyStack: ["BaseAddressDetailV2UIv2", "BaseAddressDetailV2"], structureParent: "BaseGridDetailV2"};
define('BaseAddressDetailV2UIv2Structure', ['BaseAddressDetailV2UIv2Resources'], function(resources) {return {schemaUId:'b0400a53-ef49-4480-9be2-796edee255d1',schemaCaption: "Base address detail", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseAddressDetailV2UIv2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseAddressDetailV2Structure', ['BaseAddressDetailV2Resources'], function(resources) {return {schemaUId:'f9eacbdf-71ce-404f-ac60-e8a0829d4c20',schemaCaption: "Base address detail", parentSchemaName: "BaseAddressDetailV2UIv2", schemaName:'BaseAddressDetailV2',parentSchemaUId:'b0400a53-ef49-4480-9be2-796edee255d1',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseAddressDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseAddressDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseAddressDetailV2UIv2", [], function() {
	return {
		messages: {
			/**
			 * @message GetMapsConfig
			 * ########## #########, ########### ### ###### ###### ####### ## #####
			 * @param {Object} #########, ############ ### ###### ###### ####### ## #####
			 */
			"GetMapsConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * ######### ##### ######. "########", "########" # #.#.
			 */
			AddressTypes: {dataValueType: this.Terrasoft.DataValueType.COLLECTION}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				if (!this.get("AddressTypes")) {
					this.initAddressTypes(function() {
						this.init(callback, scope);
					}, this);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Returns count primary addresses.
			 * @private
			 * @return {Number} Count primary addresses.
			 */
			_getCountPrimaryAddresses: function() {
				var gridData = this.getGridData();
				var items = gridData && gridData.filterByFn(function(item) {
						return item.get("Primary");
					}, this);
				return items && items.getCount() || 0;
			},

			/**
			 * Appends primary default value.
			 * @private
			 * @param {Object} detailInfo Detail info.
			 */
			_appendPrimaryDefaultValue: function(detailInfo) {
				var countPrimaryAddreses = this._getCountPrimaryAddresses();
				var primaryValue = countPrimaryAddreses === 0;
				var defValues = (detailInfo && detailInfo.defaultValues) || [];
				var existingDefItem = Terrasoft.findItem(defValues, {name: "Primary"});
				if (!existingDefItem) {
					defValues.push({
						name: "Primary",
						value: primaryValue
					});
				} else {
					var defValue = existingDefItem.item;
					defValue.value = primaryValue;
				}
				detailInfo.defaultValues = defValues;
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#init
			 * @overridden
			 */
			getDetailInfo: function() {
				var detailInfo = this.callParent(arguments) || {};
				this._appendPrimaryDefaultValue(detailInfo);
				return detailInfo;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
			 * @overridden
			 */
			getGridDataColumns: function() {
				var config = this.callParent(arguments);
				config.Country = {path: "Country"};
				config.Region = {path: "Region"};
				config.City = {path: "City"};
				config.Address = {path: "Address"};
				config.Zip = {path: "Zip"};
				config.Primary = {path: "Primary"};
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getEditPages
			 * @overridden
			 */
			getEditPages: function() {
				var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var entityStructure = this.getEntityStructure(this.entitySchemaName);
				if (entityStructure) {
					var editPage = entityStructure.pages[0];
					var addressTypes = this.get("AddressTypes");
					addressTypes.each(function(addressType) {
						var id = addressType.get("Id");
						var caption = addressType.get("Name");
						var schemaName = editPage.cardSchema;
						var item = this.getButtonMenuItem({
							Caption: caption,
							Click: {bindTo: "addRecord"},
							Tag: id,
							SchemaName: schemaName
						});
						menuItems.add(id, item);
					}, this);
				}
				return menuItems;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#initTypeColumnName
			 * @overridden
			 */
			initTypeColumnName: function() {
				this.set("TypeColumnName", "AddressType");
			},

			/**
			 * ############## ######### ##### ######.
			 * @protected
			 */
			initAddressTypes: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "AddressType"});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				var nameColumn = esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
				nameColumn.orderPosition = 1;
				nameColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
				var addressTypeColumnFilter = "";
				var detailColumnName = this.get("DetailColumnName");
				if (detailColumnName === "Contact") {
					addressTypeColumnFilter = "ForContact";
				} else if (detailColumnName === "Account") {
					addressTypeColumnFilter = "ForAccount";
				}
				if (addressTypeColumnFilter) {
					esq.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, addressTypeColumnFilter, 1));
				}
				esq.cacheLevel = "ClientPageSessionCache";
				esq.cacheKey = "AddressType_" + addressTypeColumnFilter;
				esq.getEntityCollection(function(result) {
					var addressTypes = result.success
						? result.collection
						: this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.set("AddressTypes", addressTypes);
					callback.call(scope);
				}, this);
			},

			/**
			 * ########## ###### #####.
			 * @return {String} ###### #####.
			 */
			getFullAddress: function() {
				var fullAddress = [];
				var country = this.get("Country");
				if (country) {
					fullAddress.push(country.displayValue);
				}
				var region = this.get("Region");
				if (region) {
					fullAddress.push(region.displayValue);
				}
				var city = this.get("City");
				if (city) {
					fullAddress.push(city.displayValue);
				}
				var address = this.get("Address");
				if (address) {
					fullAddress.push(address);
				}
				return fullAddress.join(", ");
			},

			/**
			 * ######## "######## ## #####".
			 */
			openShowOnMap: function() {
				var addresses = this.getGridData();
				var items = this.getSelectedItems();
				var mapsData = [];
				var mapsConfig = {
					mapsData: mapsData
				};
				this.Terrasoft.each(items, function(itemId) {
					var item = addresses.get(itemId);
					var addressType = item.get("AddressType").displayValue;
					var address = this.getFullAddress.call(item);
					var content = this.Ext.String.format("<h2>{0}</h2><div>{1}</div>", addressType, address);
					var dataItem = {
						caption: item.get("Name"),
						content: content,
						address: address
					};
					mapsData.push(dataItem);
				}, this);
				var mapsModuleSandboxId = this.sandbox.id + "_MapsModule" + this.Terrasoft.generateGUID();
				this.sandbox.subscribe("GetMapsConfig", function() {
					return mapsConfig;
				}, [mapsModuleSandboxId]);
				this.sandbox.loadModule("MapsModule", {
					id: mapsModuleSandboxId,
					keepAlive: true
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
			 * @overridden
			 */
			addRecordOperationsMenuItems: function(toolsButtonMenu) {
				this.callParent(arguments);
				toolsButtonMenu.addItem(this.getButtonMenuSeparator());
				toolsButtonMenu.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.ShowOnMapCaption"},
					Click: {"bindTo": "openShowOnMap"},
					Enabled: {bindTo: "isAnySelected"}
				}));
			},

			/**
			 * ########## ### ####### ### ########## ## #########.
			 * @overridden
			 * @return {String} ### #######.
			 */
			getFilterDefaultColumnName: function() {
				return "AddressType";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					type: "listed",
					primaryDisplayColumnName: "Address",
					listedConfig: {
						"name": "DataGridListedConfig",
						"items": [

							{
								"name": "AddressTypeListedGridColumn",
								"bindTo": "AddressType",
								"position": {"column": 1, "colSpan": 5}
							},
							{
								"name": "AddressListedGridColumn",
								"bindTo": "Address",
								"position": {"column": 6, "colSpan": 7}
							},
							{
								"name": "CityListedGridColumn",
								"bindTo": "City",
								"position": {"column": 13, "colSpan": 3}
							},
							{
								"name": "RegionListedGridColumn",
								"bindTo": "Region",
								"position": {"column": 16, "colSpan": 4}
							},
							{
								"name": "CountryListedGridColumn",
								"bindTo": "Country",
								"position": {"column": 20, "colSpan": 3}
							},
							{
								"name": "ZipListedGridColumn",
								"bindTo": "Zip",
								"position": {"column": 23, "colSpan": 2}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {"columns": 24, "rows": 1},
						"items": []
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("BaseAddressDetailV2", ["AddressHelperV2"], function() {
	return {
		mixins: {
			AddressHelperV2: "Terrasoft.AddressHelperV2"
		},
		methods: {
			/**
			 * Show on map action handler.
			 */
			openShowOnMap: function() {
				var gridData = this.getGridData();
				var selectedRows = this.getSelectedItems();
				var selectedAddresses = [];
				Terrasoft.each(selectedRows, function(rowId) {
					selectedAddresses.push(gridData.get(rowId));
				}, this);
				this.showOnMapAddressesFromDetail(selectedAddresses);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


