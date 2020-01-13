Terrasoft.configuration.Structures["WebitelModuleHelper"] = {innerHierarchyStack: ["WebitelModuleHelper"]};
define("WebitelModuleHelper", [],
	function() {

		/**
		 * ########## ######## #######.
		 * @returns {String} ######## #######.
		 */
		function getHostName() {
			return location.hostname.replace("www.", "");
		}

		return {
			getHostName: getHostName
		};
	});


