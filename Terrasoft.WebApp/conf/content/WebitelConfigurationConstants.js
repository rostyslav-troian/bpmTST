Terrasoft.configuration.Structures["WebitelConfigurationConstants"] = {innerHierarchyStack: ["WebitelConfigurationConstants"]};
define("WebitelConfigurationConstants", [], function() {

	/**
	 * ########## ##### ############# Webitel.
	 * @type {Object}
	 */
	var wSysAccountRole = {
		/** #############. */
		Administrator: "85f6f2c0-16c5-40f4-bb75-becad578d495",
		/** ############. */
		User: "7640dfbd-0cf2-4040-998e-4641042eff46"
	};

	/**
	 * ###### ##### ###### Webitel.
	 * @type {Object}
	 */
	var webitelErrorCode = {
		/** ### ######## ############ Webitel: "############ Webitel # ######### ####### ### ##########". */
		UserAlreadyExists: "-ERR: Number exists"
	};

	return {
		WSysAccountRole: wSysAccountRole,
		WebitelErrorCode: webitelErrorCode
	};
});


