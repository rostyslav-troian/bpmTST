Terrasoft.configuration.Structures["ProcessValidationHelper"] = {innerHierarchyStack: ["ProcessValidationHelper"]};
define("ProcessValidationHelper", ["terrasoft", "ServiceHelper"],
	function(Terrasoft, ServiceHelper) {

		/**
		 * ######### ############ ########## ######-########.
		 * @param {Object} data ###### ########.
		 * @param {String} data.processUId ############# ######-########.
		 * @param {Object[]} data.checkParameters ###### ########## ### ########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Boolean} callback.isValid ####### ############ ##########.
		 * @param {Object[]} callback.invalidParameters ###### ############ ##########.
		 * @example
		 * var data = {
		 * 		processUId = "{a5f68bdc-2144-42c4-8830-9965e224d704}"
		 * 		checkParameters = [
		 * 			{
		 * 				name: "parameter1",
		 * 				dataValueTypes: ["Text", "ShortText"]
		 * 			},
		 * 			{
		 * 				name: "parameter2",
		 * 				dataValueTyps: ["Guid", "Lookup"]
		 * 			}
		 * 		]
		 * 	}
		 * 	checkProcessParameters(data, function(response) {
		 * 		// If "parameter1" is not valid, then response will be contains next data:
		 * 		// response.isValid == false;
		 * 		// response.invalidParameters == [
		 * 		//	{
		 * 		//		name: "parameter1",
		 * 		//		dataValueTypes: ["Text", "ShortText"]
		 * 		//	}
		 * 		//];
		 * //
		 * 	});
		 */
		function checkProcessParameters(data, callback) {
			var config = {
				serviceName: "ProcessValidationService",
				methodName: "CheckParameters",
				data: data,
				callback: function(response, success) {
						if (!success) {
							console.error(response.responseText);
						}
						callback(response.CheckParametersResult || { isValid: false });
					}
			};
			ServiceHelper.callService(config);
		}

		return {
			checkProcessParameters: checkProcessParameters
		};
	});


