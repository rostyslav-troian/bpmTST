Terrasoft.configuration.Structures["AddressHelper"] = {innerHierarchyStack: ["AddressHelper"]};
define("AddressHelper", ["AddressHelperResources"], function(resources) {
	/**
	 * ########## ############### #####.
	 * @param {Object|String} address #####.
	 * @return {String} ############### #####.
	 */
	var getAddress = function(address) {
		if (this.Ext.isObject(address)) {
			return address.displayValue;
		} else if (!this.Ext.isEmpty(address)) {
			return address;
		}
		return null;
	};

	/**
	 * ########## ######### ######## ## ########## ######.
	 * @param {Array|String} address #####.
	 * @return {boolean} ######### ######## ## ########## ######.
	 */
	var getIsEmptyAddress = function(address) {
		var result = true;
		if (!Ext.isEmpty(address)) {
			if (Ext.isArray(address)) {
				address.forEach(function(item) {
					if (!Ext.isEmpty(item)) {
						result = false;
					}
				}, this);
			} else {
				result = false;
			}
		}
		return result;
	};

	/**
	 * ########## ###### #####.
	 * @return {Array} ###### #####.
	 */
	var getFullAddress = function() {
		var fullAddress = [];
		fullAddress.push(getAddress(this.get("Country")));
		fullAddress.push(getAddress(this.get("Region")));
		fullAddress.push(getAddress(this.get("City")));
		fullAddress.push(getAddress(this.get("Address")));
		return fullAddress;
	};

	/**
	 * ############## #####.
	 * @param {Boolean} ignoreCoordinates ############ ##########.
	 * @return {Object} ###### ######.
	 */
	var getMapsConfig = function(ignoreCoordinates) {
		var fullAddress = this.getFullAddress();
		var latitude = this.get("Latitude");
		var longitude = this.get("Longitude");
		var mapsData = [];
		var mapsConfig = {
			mapsData: mapsData
		};
		if (!Ext.isEmpty(latitude) && !Ext.isEmpty(longitude) && !ignoreCoordinates) {
			mapsData.push({
				content: this.getPopUpConfig(),
				address: latitude + ", " + longitude,
				gpsN: latitude,
				gpsE: longitude,
				useDragMarker: true
			});
		} else if (!getIsEmptyAddress(fullAddress)) {
			mapsData.push({
				content: this.getPopUpConfig(),
				address: fullAddress,
				useDragMarker: true
			});
		} else {
			mapsConfig.useCurrentUserLocation = true;
		}
		return mapsConfig;
	};

	/**
	 * ######## ##### ###### ####.
	 * @param {Object} mapsConfig ###### ######.
	 */
	var sendMapsConfig = function(mapsConfig) {
		var moduleId = this.sandbox.id + "_MapsModule";
		if (!this.Ext.isEmpty(mapsConfig)) {
			this.sandbox.publish("SetMapsConfig", mapsConfig, [moduleId]);
		}
	};

	/**
	 * ########## ######### ######.
	 */
	var onAddressChanged = function() {
		if (!this.get("IsEntityInitialized")) {
			return;
		}
		var mapsConfig = this.getMapsConfig(true);
		sendMapsConfig.call(this, mapsConfig);
	};

	/**
	 * ########## ######### #########.
	 */
	var onCoordinatesChanged = function() {
		if (!this.get("IsEntityInitialized") || this.get("IsCoordinatesChanged")) {
			return;
		}
		var mapsConfig = this.getMapsConfig();
		sendMapsConfig.call(this, mapsConfig);
	};

	/**
	 * ######### ######## ######### ## decimalPrecision ###### ##### #######.
	 * @param {String|Number} coordinate ######## ##########.
	 * @param {Number} decimalPrecision ########## ###### ##### #######.
	 * @return {String} ##########.
	 */
	var roundCoordinates = function(coordinate, decimalPrecision) {
		coordinate = parseFloat(coordinate);
		return coordinate.toFixed(decimalPrecision);
	};

	/**
	 * ############ ########## ## ###### #### # ########.
	 * @param {Object} coordinates ########## #######.
	 */
	var processCoordinatesChange = function(coordinates) {
		this.set("IsCoordinatesChanged", true);
		var latitude = roundCoordinates(coordinates.lat, 7);
		var longitude = roundCoordinates(coordinates.lng, 7);
		if (latitude !== this.get("Latitude")) {
			this.set("Latitude", latitude);
		}
		if (latitude !== this.get("Longitude")) {
			this.set("Longitude", longitude);
		}
		this.set("IsCoordinatesChanged", false);
	};

	/**
	 * ######### ###### ####### ## ############### #########|############.
	 * @param {String} schemaName ### ########.
	 * @param {Function} callback ####### #### #########.
	 * @param {Array} items ###### ###############.
	 * @param {Object} config Configuration object.
	 * @param {String} config.columnNameLongitude Column name with longitude.
	 * @param {String} config.columnNameLatitude Column name with latitude.
	 */
	var openShowOnMap = function(schemaName, callback, items, config) {
		config = config || {};
		items = items || this.getSelectedItems();
		var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
			rootSchemaName: schemaName + "Address"
		});
		select.addColumn(schemaName + ".Name");
		select.addColumn("AddressType");
		select.addColumn("Address");
		select.addColumn("City");
		select.addColumn("Region");
		select.addColumn("Country");
		if(config.columnNameLongitude){
			select.addColumn(config.columnNameLongitude);
		}
		if(config.columnNameLatitude){
			select.addColumn(config.columnNameLatitude);
		}
		select.filters.addItem(this.Terrasoft.createColumnInFilterWithParameters(schemaName, items));
		select.getEntityCollection(function(result) {
			var addresses = result.collection;
			if (result.success && !addresses.isEmpty()) {
				var mapsData = [];
				var mapsConfig = {
					mapsData: mapsData
				};
				addresses.each(function(item) {
					var addressType = item.get("AddressType").displayValue;
					var address = getFullAddress.call(item);
					var content = this.Ext.String.format("<h2>{0}</h2><div>{1}</div>", addressType, address);
					var dataItem = {
						caption: addressType,
						content: content,
						address: address,
						gpsE: item.get(config.columnNameLongitude),
						gpsN: item.get(config.columnNameLatitude)
					};
					mapsData.push(dataItem);
				}, this);
				callback.call(this, mapsConfig);
			} else {
				this.showInformationDialog(resources.localizableStrings.EmptyAddressDetailMessage);
			}
		}, this);
	};

	/**
	 * ############# ##### ########.
	 */
	var currentMaskId;

	/**
	 * ########## ##### ########.
	 * @param {Boolean} showOnMap ########## # ###### #### (#### true ########## ##### # ########## maps-container).
	 */
	var showMask = function(showOnMap) {
		var selector = "maps-container";
		currentMaskId = currentMaskId || (showOnMap && Ext.get(selector)
				? Terrasoft.Mask.show({selector: "#" + selector})
				: Terrasoft.Mask.show());
	};

	/**
	 * ###### ##### ########.
	 */
	var hideMask = function() {
		if (!Ext.isEmpty(currentMaskId)) {
			Terrasoft.Mask.hide(currentMaskId);
			currentMaskId = null;
		}
	};

	return {
		getIsEmptyAddress: getIsEmptyAddress,
		getFullAddress: getFullAddress,
		getMapsConfig: getMapsConfig,
		sendMapsConfig: sendMapsConfig,
		onAddressChanged: onAddressChanged,
		onCoordinatesChanged: onCoordinatesChanged,
		processCoordinatesChange: processCoordinatesChange,
		openShowOnMap: openShowOnMap,
		showMask: showMask,
		hideMask: hideMask
	};
});


