Terrasoft.configuration.Structures["AddressHelperV2"] = {innerHierarchyStack: ["AddressHelperV2"]};
define("AddressHelperV2", ["MapsUtilities"], function(MapsUtilities) {
	/**
	 * @class Terrasoft.configuration.mixins.AddressHelperV2
	 */
	Ext.define("Terrasoft.configuration.mixins.AddressHelperV2", {
		alternateClassName: "Terrasoft.AddressHelperV2",

		/**
		 * Forms attribute name.
		 * @private
		 * @param {String} name Attribute name.
		 * @param {String} [prefix] Attribute prefix.
		 * @return {String} Formatted attribute name.
		 */
		getAttributeName: function(name, prefix) {
			if (this.Ext.isEmpty(prefix)) {
				return name;
			}
			return this.Ext.String.format("{0}{1}", prefix, name);
		},

		/**
		 * Prepares map data.
		 * @private
		 * @return {Object} Map data.
		 */
		prepareMapData: function(scope) {
			var addressType = scope.get("AddressType");
			var addressTypeValue = addressType.displayValue;
			var address = this.getConfigFullAddress(scope);
			var content = this.Ext.String.format("<h2>{0}</h2><div>{1}</div>", addressTypeValue, address);
			return {
				caption: addressTypeValue,
				content: content,
				address: address,
				gpsN: scope.get("GPSN"),
				gpsE: scope.get("GPSE"),
			};
		},
		/**
		 * Opens map.
		 * @private
		 * @param {Object} mapsConfig Map configuration.
		 * @param {Function} [afterRender] Calls after map module render.
		 * @param {Function} [scope] Execution context.
		 */
		openMap: function(mapsConfig, afterRender, scope) {
			MapsUtilities.open({
				scope: scope || this,
				mapsConfig: mapsConfig,
				afterRender: afterRender
			});
		},

		/**
		 * Returns address attribute value.
		 * @private
		 * @param {Object|String} addressAttribute Address attribute.
		 * @return {String} Modified addressAttribute.
		 */
		getAddressAttributeValue: function(addressAttribute) {
			if (this.Ext.isObject(addressAttribute)) {
				return addressAttribute.displayValue;
			} else if (!this.Ext.isEmpty(addressAttribute)) {
				return addressAttribute;
			}
			return null;
		},

		/**
		 * Returns full address.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModel} [scope] Scope.
		 * @param {String} [attributePrefix] Attributes prefix.
		 * @return {Array} Full address.
		 */
		getConfigFullAddress: function(scope, attributePrefix) {
			var fullAddress = [];
			scope = scope || this;
			var prefix = attributePrefix || "";
			var addressElementName = ["Address", "City", "Region", "Country", "Zip"];
			Terrasoft.each(addressElementName, function(item) {
				fullAddress.push(this.getAddressAttributeValue(
					scope.get(this.getAttributeName(item, prefix))));
			}, this);
			return fullAddress;
		},

		/**
		 * Returns full address.
		 * @obsolete
		 * @protected
		 * @virtual
		 * @return {Array} Full address.
		 */
		getFullAddress: function() {
			var scope = arguments[0];
			var attributePrefix = arguments[1];
			return this.getConfigFullAddress(scope, attributePrefix);
		},


		/**
		 * Returns coordinates.
		 * @protected
		 * @virtual
		 * @param {Terrasoft.BaseViewModel} [scope] Scope.
		 * @param {String} [attributePrefix] Attributes prefix.
		 * @return {Array} Coordinates.
		 */
		getCoords: function(scope, attributePrefix) {
			scope = scope || this;
			var prefix = attributePrefix || "";
			var coords = [];
			coords.push(scope.get(this.getAttributeName("GPSN", prefix)));
			coords.push(scope.get(this.getAttributeName("GPSE", prefix)));
			return coords;
		},

		/**
		 * Shows address on map.
		 * @param {Function} [callback] Callback function.
		 * @param {Function} [scope] Execution context.
		 */
		showAddressOnMap: function(callback, scope) {
			scope = scope || this;
			var mapData = this.prepareMapData(scope);
			var mapsConfig = {
				mapsData: [mapData]
			};
			this.openMap(mapsConfig, callback, scope);
		},
		/**
		 * Shows address on map.
		 * @param {Array} [selectedAddresses] Callback function.
		 */
		showOnMapAddressesFromDetail: function(selectedAddresses) {
			var mapsData = [];
			var mapsConfig = {
				mapsData: mapsData
			};
			this.Terrasoft.each(selectedAddresses, function(address) {
				var addressConfig = this.prepareMapData(address);
				var customAddressConfig = this.getAddressConfig(address);
				if (customAddressConfig) {
					this.Ext.apply(addressConfig, customAddressConfig);
				}
				mapsData.push(addressConfig);
			}, this);
			this.openMap.call(this, mapsConfig);
		},

		/**
		 * Get address config.
		 * @protected
		 * @param {Terrasoft.BaseViewModel} address Address view model.
		 * @return {Object} Address config.
		 */
		getAddressConfig: Terrasoft.emptyFn
	});
	return Ext.create("Terrasoft.configuration.mixins.AddressHelperV2");
});


