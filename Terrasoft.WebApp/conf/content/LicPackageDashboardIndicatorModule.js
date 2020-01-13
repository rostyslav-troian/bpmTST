Terrasoft.configuration.Structures["LicPackageDashboardIndicatorModule"] = {innerHierarchyStack: ["LicPackageDashboardIndicatorModule"]};
define("LicPackageDashboardIndicatorModule", ["ServiceHelper", "LicPackageDashboardIndicatorModuleResources",
		"IndicatorModule"],
	function(ServiceHelper) {

		/**
		 * @class Terrasoft.configuration.LicPackageDashboardIndicatorViewConfig
		 * Class represent the view configuration for indicator.
		 */
		Ext.define("Terrasoft.configuration.LicPackageDashboardIndicatorViewConfig", {
			extend: "Terrasoft.IndicatorViewConfig",
			alternateClassName: "Terrasoft.LicPackageDashboardIndicatorViewConfig",

			/**
			 * Generate the configuration view for indicator.
			 * @protected
			 * @overridden
			 * @return {Object[]} Returns the configuration view of the indicator module.
			 */
			generate: function() {
				var result = this.callParent(arguments);
				var id = Terrasoft.Component.generateId();
				var internalContainer = result.items[0].items;
				internalContainer[2] = {
					"name": "indicator-service-value" + id,
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "dateCaption",
						"bindConfig": {converter: "dateValueConvertor"}
					},
					"classes": {"labelClass": ["indicator-caption"]}
				};
				return result;
			}
		});

		/**
		 * Class represent view model for indicator dashboard.
		 */
		Ext.define("Terrasoft.configuration.LicPackageDashboardIndicatorViewModel", {
			extend: "Terrasoft.IndicatorViewModel",
			alternateClassName: "Terrasoft.LicPackageDashboardIndicatorViewModel",
			dateCaption: null,

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
			 * */
			getIndicatorValues: function(callback, scope) {
				var serviceMethod = "GetLastActualizedConditionResult";
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
						if (response && response.GetLastActualizedConditionResultResult) {
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
							var dateValue = responseObject[maxIndex].ConditionDate;
							this.set("dateCaption", dateValue);
						}
						callback.call(scope);
					}, this);
			},

			/**
			 * Convert data value to date/time format.
			 * @protected
			 * @virtual
			 * @param {Number} value Value which should be converted.
			 * @return {String} Returens formated string.
			 */
			dateValueConvertor: function(value) {
				var result = "";
				var formatConfig = this.get("dateLabelFormat") || this.defaultFormat;
				var dateValue = new Date(value);
				if (Ext.isDate(dateValue) && !isNaN(dateValue.getDate())) {
					var datePart = Ext.Date.dateFormat(dateValue, Terrasoft.Resources.CultureSettings.dateFormat);
					var timePart = Ext.Date.dateFormat(dateValue, Terrasoft.Resources.CultureSettings.timeFormat);
					var textDecorator = formatConfig.textDecorator;
					if (textDecorator) {
						result = Ext.String.format(textDecorator, datePart, timePart);
					}
				}
				return result;
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

		Ext.define("Terrasoft.configuration.LicPackageDashboardIndicatorModule", {
			extend: "Terrasoft.IndicatorModule",
			alternateClassName: "Terrasoft.LicPackageDashboardIndicatorModule",

			/**
			 * Class name for view model of dashboard indicator.
			 * @type {String}
			 */
			viewModelClassName: "Terrasoft.LicPackageDashboardIndicatorViewModel",

			/**
			 * Class name for view configuration of dashboard indicator.
			 * @type {String}
			 */
			viewConfigClassName: "Terrasoft.LicPackageDashboardIndicatorViewConfig"

		});
		return Terrasoft.LicPackageDashboardIndicatorModule;
	});


