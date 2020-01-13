Terrasoft.configuration.Structures["AccountAddressPageV2"] = {innerHierarchyStack: ["AccountAddressPageV2"], structureParent: "BaseAddressPageV2"};
define('AccountAddressPageV2Structure', ['AccountAddressPageV2Resources'], function(resources) {return {schemaUId:'6de2ef5e-08e8-4a27-ad05-b4f56be971ff',schemaCaption: "Account address page", parentSchemaName: "BaseAddressPageV2", schemaName:'AccountAddressPageV2',parentSchemaUId:'81234854-097b-4248-bf1c-826717e7467d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AccountAddressPageV2", ["BusinessRuleModule", "OsmMapsModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "AccountAddress",
		attributes: {

			/**
			 * Address.
			 */
			"Address": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				dependencies: [
					{
						columns: ["Address"],
						methodName: "updateMap"
					}
				]
			},

			/**
			 * Country.
			 */
			"Country": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				dependencies: [
					{
						columns: ["Country"],
						methodName: "updateMap"
					}
				]
			},

			/**
			 * City.
			 */
			"City": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				dependencies: [
					{
						columns: ["City"],
						methodName: "updateMap"
					}
				]
			},

			/**
			 * Zip.
			 */
			"Zip": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				dependencies: [
					{
						columns: ["Zip"],
						methodName: "updateMap"
					}
				]
			}
		},
		messages: {

			/**
			 * @message GetMapsConfig.
			 * Gets maps module configuration.
			 */
			"GetMapsConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SetMapsConfig.
			 * Sets maps module configuration.
			 */
			"SetMapsConfig": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetCoordinates.
			 * Gets marker's coordinates.
			 */
			"GetCoordinates": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Gets maps module sandbox identifier.
			 * @private
			 * @return {String} Maps module sandbox identifier.
			 */
			getMapsModuleSandboxId: function() {
				var mapsModuleSandboxId = this.get("mapsModuleSandboxId");
				if (!mapsModuleSandboxId) {
					mapsModuleSandboxId = Ext.String.format("{0}_MapsModule{1}", this.sandbox.id,
						Terrasoft.generateGUID());
					this.set("mapsModuleSandboxId", mapsModuleSandboxId);
				}
				return mapsModuleSandboxId;
			},

			/**
			 * Updates map.
			 * @private
			 */
			updateMap: function() {
				this.set("GPSN", "");
				this.set("GPSE", "");
				this.changeLocation();
			},

			/**
			 * Finds country. May use region or city information.
			 * @private
			 * @return {Object} Country.
			 */
			findCountry: function() {
				var country = this.get("Country");
				if (country) {
					return country;
				}
				var region = this.get("Region");
				if (region && region.Country) {
					return region.Country;
				}
				var city = this.get("City");
				if (city && city.Country) {
					return city.Country;
				}
				return null;
			},

			/**
			 * Gets map container.
			 * @private
			 * @return {Object} Map container.
			 */
			getMapContainer: function() {
				return this.Ext.get("Map");
			},

			/**
			 * Gets map configuration for OSM module.
			 * @protected
			 * @return {Object} Map configuration for OSM module.
			 */
			getMapsConfig: function() {
				var mapsModuleSandboxId = this.getMapsModuleSandboxId();
				var country = this.findCountry();
				var city = this.get("City");
				var mapsConfig = {
					mapsData: [],
					renderTo: this.getMapContainer(),
					scope: this,
					mapsModuleSandboxId: mapsModuleSandboxId
				};
				var markerObject = {};
				if (country || city) {
					var region = this.get("Region");
					var street = this.get("Address");
					var gpsN = this.get("GPSN");
					var gpsE = this.get("GPSE");
					var zip = this.get("Zip");
					var countryValue = country && country.displayValue;
					var cityValue = city && city.displayValue;
					var regionValue = region && region.displayValue;
					markerObject.address = [street, cityValue, regionValue, countryValue, zip];
					markerObject.useDragMarker = true;
					if (gpsN && gpsE) {
						markerObject.address = gpsN + ", " + gpsE;
						markerObject.gpsN = gpsN;
						markerObject.gpsE = gpsE;
					}
				} else {
					markerObject.address = "0.0, 0.0";
					markerObject.gpsN = "0.0";
					markerObject.gpsE = "0.0";
					mapsConfig.mapsData.useCurrentUserLocation = true;
				}
				mapsConfig.mapsData.push(markerObject);
				return mapsConfig;
			},

			/**
			 * Changes location on the map.
			 * @private
			 */
			changeLocation: function() {
				var mapsConfig = this.getMapsConfig();
				this.sandbox.publish("SetMapsConfig", mapsConfig,
					[this.getMapsModuleSandboxId()]);
			},

			/**
			 * Loads maps module.
			 * @private
			 */
			loadMapsModule: function() {
				this.sandbox.loadModule("OsmMapsModule", {
					id: this.getMapsModuleSandboxId()
				});
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 * @protected
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.changeLocation();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				var mapsModuleSandboxId = this.getMapsModuleSandboxId();
				this.sandbox.subscribe("GetMapsConfig", function() {
					return this.getMapsConfig();
				}, this, [mapsModuleSandboxId]);
				this.sandbox.subscribe("GetCoordinates", function(coordinates) {
					var gpsN = coordinates.lat;
					var gpsE = coordinates.lng;
					this.saveAddressCoordinates(gpsN, gpsE);
				}, this, [mapsModuleSandboxId]);
			},

			//endregion

			//region Methods: Public

			/**
			 * Saves new coordinates.
			 * @param {Number} gpsN GPSN coordinate.
			 * @param {Number} gpsE GPSE coordinate.
			 */
			saveAddressCoordinates: function(gpsN, gpsE) {
				if (gpsN && gpsE) {
					this.set("GPSN", gpsN.toString());
					this.set("GPSE", gpsE.toString());
				}
			}

			//endregion

		},
		details: /**SCHEMA_DETAILS*/{
		}/**SCHEMA_DETAILS*/,
		rules: {
			"AddressType": {
				"FiltrationAddressTypeByOwner": {
					ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
					autocomplete: true,
					baseAttributePatch: "ForAccount",
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					type: BusinessRuleModule.enums.ValueType.CONSTANT,
					value: true
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "AddressMapContainer",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"values": {
					"id": "AddressMapContainer",
					"selectors": {"wrapEl": "#AddressMapContainer"},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["addressmap"]
				}
			},
			{
				"operation": "insert",
				"parentName": "AddressMapContainer",
				"propertyName": "items",
				"name": "Map",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.MODULE,
					"moduleName": "MapsModule",
					"afterrender": {bindTo: "loadMapsModule"},
					"classes": {"wrapClassName": "osm-maps-user-class"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


