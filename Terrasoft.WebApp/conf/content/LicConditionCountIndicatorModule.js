Terrasoft.configuration.Structures["LicConditionCountIndicatorModule"] = {innerHierarchyStack: ["LicConditionCountIndicatorModule"]};
define("LicConditionCountIndicatorModule", ["ServiceHelper", "LicConditionCountIndicatorModuleResources",
		"IndicatorModule"],
	function(ServiceHelper) {

		/**
		 * Class represent view model for indicator dashboard.
		 */
		Ext.define("Terrasoft.configuration.LicConditionCountIndicatorViewModel", {
			extend: "Terrasoft.IndicatorViewModel",
			alternateClassName: "Terrasoft.LicConditionCountIndicatorViewModel",

			/**
			 * Call service.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution scope.
			 * */
			callService: function(config, callback, scope) {
				ServiceHelper.callService(config.serviceName, config.methodName, callback, config.data, scope);
			},

			/**
			 * Initialize value of indicator.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution scope.
			 */
			getIndicatorValues: function(callback, scope) {
				var serviceMethod = "GetMaxConditionCount";
				var config = {
					serviceName: "CustomLicPackageService",
					methodName: serviceMethod,
					data: {
						packageNames: [
							"marketing creatio active contacts",
							"marketing creatio 1000 active contacts",
							"bpmonline marketing active contacts",
							"bpmonline marketing contacts"
						]
					}
				};
				this.callService(config,
					function(response) {
						if (response && response.GetMaxConditionCountResult) {
							var responseObject = response[serviceMethod + "Result"];
							var index = 0;
							var maxIndex = 0;
							var maxContact = 0;
							Terrasoft.each(responseObject, function(item) {
								if (item.ConditionCount > maxContact) {
									maxContact = item.ConditionCount;
									maxIndex = index;
								}
								index++;
							}, this);
							var countValue = responseObject[maxIndex].ConditionCount;
							this.set("value", countValue);
						}
						callback.call(scope);
					}, this);
			},

			/**
			 * Prepare indicator parameters.
			 * @protected
			 * @overriden
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback execution scope.
			 */
			prepareWidget: function(callback, scope) {
				this.getIndicatorValues(callback, scope);
			}
		});

		Ext.define("Terrasoft.configuration.LicConditionCountIndicatorModule", {
			extend: "Terrasoft.IndicatorModule",
			alternateClassName: "Terrasoft.LicConditionCountIndicatorModule",

			/**
			 * Class name for view model of dashboard indicator.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.LicConditionCountIndicatorViewModel"
		});
		return Terrasoft.LicConditionCountIndicatorModule;
	});


