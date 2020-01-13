Terrasoft.configuration.Structures["MapsHelper"] = {innerHierarchyStack: ["MapsHelper"]};
define("MapsHelper", ["MapsHelperResources", "AddressHelper"], function(resources, AddressHelper) {

	/**
	 * ########## ######### ######## ## ########## ######.
	 * @obsolete
	 * @return {boolean} ######### ######## ## ########## ######.
	 */
	var getIsEmptyAddress = function() {
		window.console.warn(Ext.String.format(
            Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"getIsEmptyAddress", "AddressHelper.getIsEmptyAddress"));
		return AddressHelper.getIsEmptyAddress.apply(this, arguments);
	};

	/**
	 * ########## ###### #####.
	 * @obsolete
	 * @return {Array} ###### #####.
	 */
	var getFullAddress = function() {
		window.console.warn(Ext.String.format(
				Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"getFullAddress", "AddressHelper.getFullAddress"));
		return AddressHelper.getFullAddress.apply(this, arguments);
	};

	/**
	 * ############## #####.
	 * @obsolete
	 * @return {Object} ###### ######.
	 */
	var getMapsConfig = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"getMapsConfig", "AddressHelper.getMapsConfig"));
		return AddressHelper.getMapsConfig.apply(this, arguments);
	};

	/**
	 * ######## ##### ###### ####.
	 * @obsolete
	 */
	var sendMapsConfig = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"sendMapsConfig", "AddressHelper.sendMapsConfig"));
		return AddressHelper.sendMapsConfig.apply(this, arguments);
	};

	/**
	 * ########## ######### ######.
	 * @obsolete
	 */
	var onAddressChanged = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"onAddressChanged", "AddressHelper.onAddressChanged"));
		return AddressHelper.onAddressChanged.apply(this, arguments);
	};

	/**
	 * ########## ######### #########.
	 * @obsolete
	 */
	var onCoordinatesChanged = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"onCoordinatesChanged", "AddressHelper.onCoordinatesChanged"));
		return AddressHelper.onCoordinatesChanged.apply(this, arguments);
	};

	/**
	 * ############ ########## ## ###### #### # ########.
	 * @obsolete
	 */
	var processCoordinatesChange = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"processCoordinatesChange", "AddressHelper.processCoordinatesChange"));
		return AddressHelper.processCoordinatesChange.apply(this, arguments);
	};

	/**
	 * ######### ###### ####### ## ############### #########|############.
	 * @obsolete
	 */
	var openShowOnMap = function() {
		window.console.warn(this.Ext.String.format(
				this.Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
				"openShowOnMap", "AddressHelper.openShowOnMap"));
		return AddressHelper.openShowOnMap.apply(this, arguments);
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


