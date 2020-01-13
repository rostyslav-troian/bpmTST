Terrasoft.configuration.Structures["SocialAddressDetail"] = {innerHierarchyStack: ["SocialAddressDetailSocialNetworkIntegration", "SocialAddressDetail"], structureParent: "BaseAddressDetailV2"};
define('SocialAddressDetailSocialNetworkIntegrationStructure', ['SocialAddressDetailSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'04304807-0220-4b23-beac-ccf437ca3777',schemaCaption: "Base detail - Population of addresses", parentSchemaName: "BaseAddressDetailV2", schemaName:'SocialAddressDetailSocialNetworkIntegration',parentSchemaUId:'b0400a53-ef49-4480-9be2-796edee255d1',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAddressDetailStructure', ['SocialAddressDetailResources'], function(resources) {return {schemaUId:'a3175fdc-deae-4c5d-9e7b-94f1aa74f496',schemaCaption: "Base detail - Population of addresses", parentSchemaName: "SocialAddressDetailSocialNetworkIntegration", schemaName:'SocialAddressDetail',parentSchemaUId:'04304807-0220-4b23-beac-ccf437ca3777',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SocialAddressDetailSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAddressDetailSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SocialAddressDetailSocialNetworkIntegration", ["ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities",
		"SocialGridDetailUtilities"], function() {
	return {
		messages: {
			/**
			 * ######### # ############# ######### ###### ## ########## #####.
			 */
			"GetSocialNetworkData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * ########## ## ######### ######## ###### ## ########## #####.
			 */
			"SocialNetworkDataLoaded": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SaveDetail
			 * ########## ########## ######.
			 */
			"SaveDetail": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message DetailValidated
			 * ########## ######### ##########.
			 */
			"DetailSaved": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		/**
		 * ######-####### (#######), ########### ################ ####### #####.
		 */
		mixins: {
			/**
			 * @class ConfigurationGridUtilities ########### ####### ###### ############## #######.
			 */
			ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities",

			/**
			 * @class SocialGridDetailUtilities ########### ####### ###### ###### ########## ## ###. ####.
			 * # ############# ########.
			 */
			SocialGridDetailUtilities: "Terrasoft.SocialGridDetailUtilities"
		},
		attributes: {
			/*
			 * ####### ######### ############## #######.
			 */
			IsEditable: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/*
			 * ####### ######### ############## ######.
			 */
			MultiSelect: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			UseGeneratedProfile: {
				value: false
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SaveDetail", this.save, this, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseAddressDetailV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initSocialDetail();
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#getToolsVisible
			 * @overridden
			 */
			getToolsVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getIsRowChanged
			 * @overridden
			 */
			getIsRowChanged: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onGridDataLoaded
			 * @overridden
			 */
			onGridDataLoaded: function() {
				this.callParent(arguments);
				var socialNetworkData = this.sandbox.publish("GetSocialNetworkData");
				if (!socialNetworkData) {
					this.sandbox.subscribe("SocialNetworkDataLoaded", this.onSocialNetworkDataLoaded, this);
				} else {
					this.onSocialNetworkDataLoaded(socialNetworkData);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#initData
			 * @override
			 */
			initData: function(callback, scope) {
				this.callParent([function() {
					Ext.callback(callback, scope || this);
					this.setSelectedRows();
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onAfterReRender
			 * @override
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.setSelectedRows();
			},

			/**
			 * Selects all loaded rows when MultiSelect is true and grid rendered.
			 * @protected
			 */
			setSelectedRows: function() {
				if (this.get("MultiSelect") && this.getIsCurrentGridRendered()) {
					var items = this.getGridData();
					this.selectRows(items);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
			 * @overridden
			 */
			initDetailOptions: function() {
				this.callParent(arguments);
				this.set("IsDetailCollapsed", false);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#initActiveRowKeyMap
			 * @overridden
			 */
			initActiveRowKeyMap: Terrasoft.emptyFn

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {bindTo: "generateActiveRowControlsConfig"},
					"changeRow": {bindTo: "changeRow"},
					"unSelectRow": {bindTo: "unSelectRow"},
					"onGridClick": {bindTo: "onGridClick"},
					"initActiveRowKeyMap": {bindTo: "initActiveRowKeyMap"},
					"activeRowAction": {bindTo: "onActiveRowAction"},
					"activeRowActions": [],
					"rowDataItemMarkerColumnName": "Address"
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowSaveAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"tag": "save",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"markerValue": "save",
					"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("SocialAddressDetail", ["Country", "Region", "City"], function(Country, Region, City) {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.SocialAnniversaryDetail#createSocialEntityDataRows
			 * @overridden
			 */
			createSocialEntityDataRows: function(config) {
				if (!config) {
					return;
				}
				var socialNetworkData = config.socialNetworkData;
				if (this.Ext.isEmpty(socialNetworkData)) {
					return;
				}
				this.getLocationData({socialNetworkData: socialNetworkData}, function(locationsData) {
					var countries = locationsData.Country;
					var regions = locationsData.Region;
					var cities = locationsData.City;
					var collection = this.Ext.create("Terrasoft.Collection");
					this.Terrasoft.each(socialNetworkData, function(entity) {
						var country = countries[entity.country];
						var region = regions[entity.region];
						var state = regions[entity.state];
						var city = cities[entity.city];
						var dataRow = {
							"Zip": entity.zip
						};
						if (country) {
							dataRow.Country = country;
							delete entity.country;
						}
						if (state) {
							dataRow.Region = state;
							delete entity.state;
						} else if (region) {
							dataRow.Region = region;
							delete entity.region;
						}
						if (city) {
							dataRow.City = city;
							delete entity.city;
						}
						dataRow.Address = this.getFormattedAddress(entity);
						var isAddressValid = this.validateAddress(dataRow);
						if (isAddressValid) {
							collection.add(dataRow);
						}
					}, this);
					config.callback.call(config.scope || this, collection);
				}, this);
			},

			/**
			 * ########## ############ ##### ####### ###### ######.
			 * @private
			 * @param {String} location.street #####
			 * @param {String} location.city #####
			 * @param {String} location.region ######
			 * @param {String} location.state ####
			 * @param {String} location.country ######
			 * @return {String} ############ ##### ####### ###### ######.
			 */
			getFormattedAddress: function(location) {
				var locationInfo = [location.street, location.city, location.region, location.state, location.country];
				return locationInfo.filter(function(item) {
					return item;
				}).join(", ");
			},

			/**
			 * ######### ######## ### #### ######## # ############ #####, ########, ######, #######.
			 * @private
			 * @param {Object} config ############ ######.
			 * @param {Object} config.socialNetworkData ##### ######## ########### ######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ########## ####### ######### ######.
			 */
			getLocationData: function(config, callback, scope) {
				var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
				this.Terrasoft.each(config.socialNetworkData, function(entity) {
					var country = entity.country;
					if (country) {
						var countryQuery = this.getEntityDataQuery(Country, country);
						batchQuery.add(countryQuery);
					}
					var region = entity.region;
					if (region) {
						var regionQuery = this.getEntityDataQuery(Region, region);
						batchQuery.add(regionQuery);
					}
					var state = entity.state;
					if (state) {
						var stateQuery = this.getEntityDataQuery(Region, state);
						batchQuery.add(stateQuery);
					}
					var city = entity.city;
					if (city) {
						var cityQuery = this.getEntityDataQuery(City, city);
						batchQuery.add(cityQuery);
					}
				}, this);
				var result = {
					Country: {},
					Region: {},
					City: {}
				};
				if (batchQuery.queries.length === 0) {
					return callback.call(scope, result);
				}
				batchQuery.execute(function(response) {
					if (!response.success) {
						throw new Terrasoft.UnknownException();
					}
					this.Terrasoft.each(response.queryResults, function(queryResult) {
						var rows = queryResult.rows;
						if (rows.length === 0) {
							return;
						}
						var row = rows.pop();
						var resultObj = result[row.name] = result[row.name] || {};
						resultObj[row.displayValue] = {
							value: row.value,
							displayValue: row.displayValue
						};
					}, this);
					callback.call(scope, result);
				}, this);
			},

			/**
			 * @private
			 * @param {Object} rootSchema ##### ######, # ####### ########### ######.
			 * @param {String} primaryDisplayColumnValue ######## ############ ####### ## ######## ###########
			 * #########.
			 * @return {Object} ###### #######.
			 */
			getEntityDataQuery: function(rootSchema, primaryDisplayColumnValue) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: rootSchema,
					rowCount: 1
				});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
				esq.addParameterColumn(rootSchema.name, this.Terrasoft.DataValueType.TEXT, "name");
				esq.filters.addItem(this.Terrasoft.createPrimaryDisplayColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, primaryDisplayColumnValue));
				return esq;
			},

			/**
			 * ######### ############ ########## ##### ######.
			 * @param {Object} row ######, ########## ######## ######.
			 * @return {Boolean} ######### ########.
			 */
			validateAddress: function(row) {
				var result = true;
				this.Terrasoft.each(row, function(value) {
					result = (result && !this.Ext.isEmpty(value));
					return result;
				}, this);
				return result;
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


