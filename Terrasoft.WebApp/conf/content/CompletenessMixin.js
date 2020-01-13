Terrasoft.configuration.Structures["CompletenessMixin"] = {innerHierarchyStack: ["CompletenessMixin"]};
define("CompletenessMixin", ["ServiceHelper", "ConfigurationCompletenessIndicatorGenerator",
		"CompletenessIndicator", "css!CompletenessCSSV2"
	],
	function(ServiceHelper) {
		/**
		 * @class Terrasoft.configuration.mixins.CompletenessHelpMixin
		 * ######, ########### ###### # ######## ########## #######.
		 */
		Ext.define("Terrasoft.configuration.mixins.CompletenessMixin", {
			alternateClassName: "Terrasoft.CompletenessMixin",

			//region Methods: Protected

			/**
			 * ########## ### ###### ######## ####.
			 * @protected
			 * @return {String} ### ###### ######## ####.
			 */
			getMenuItemClassName: function() {
				return "Terrasoft.CompletenessMenuItem";
			},

			/**
			 * ########## ### ####### #######.
			 * @protected
			 * @return {String} ### ####### #######.
			 */
			getCompletenessServiceName: function() {
				return "CompletenessService";
			},

			/**
			 * ######## ###### ####### ########## #######.
			 * @protected
			 * @param {Object} config ######### #######.
			 * @param {Guid} config.recordId ########## ############# ######.
			 * @param {String} config.schemaName ### ##### ######.
			 * @param {Guid} config.typeValue ######## #### ######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			getCompleteness: function(config, callback, scope) {
				var typeValue = !this.Ext.isEmpty(config.typeValue) ? config.typeValue : undefined;
				typeValue = this.Ext.isObject(typeValue) ? typeValue.value : typeValue;
				var data = {
					recordId: config.recordId,
					schemaName: config.schemaName,
					typeValue: typeValue
				};
				Terrasoft.delay(ServiceHelper.callService, ServiceHelper, 1000, [
					this.getCompletenessServiceName(),
					"GetRecordCompleteness",
					function(response) {
						this.completenessServiceCallback(response, callback, scope);
					},
					data,
					this
				]);
			},

			/**
			 * ########## ######### ############# ##########.
			 * @protected
			 * @param {Object} completenessResult ######### ####### ####### ####### ########## #######.
			 * @return {Object} ######### ############# ##########.
			 */
			getMissingParametersCollection: function(completenessResult) {
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var missingParameters = completenessResult.missingParameters;
				if (this.Ext.isArray(missingParameters)) {
					missingParameters.forEach(function(parameter) {
						var menuItemMarker = this.Ext.String.format("+{0}% {1}", parameter.percentage, parameter.name);
						var item = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: parameter.id,
								Type: this.getMenuItemClassName(),
								Caption: parameter.name,
								MarkerValue: menuItemMarker,
								Percentage: parameter.percentage
							}
						});
						collection.addItem(item);
					}, this);
				}
				return collection;
			},

			/**
			 * ########## ######## ####### ########## #######.
			 * @protected
			 * @param {Object} completenessResult ######### ####### ####### ####### ########## #######.
			 * @return {Object} ######## ####### ########## #######.
			 */
			getCompletenessValue: function(completenessResult) {
				var completeness = completenessResult.completeness;
				return this.Ext.isNumber(completeness) ? completeness : 0;
			},

			/**
			 * ########## #####.
			 * @protected
			 * @param {Object} completenessResult ######### ####### ####### ####### ########## #######.
			 * @return {Object} #####.
			 */
			getScale: function(completenessResult) {
				var scale = completenessResult.scale;
				if (!this.Ext.isEmpty(scale)) {
					scale = this.Ext.decode(scale);
					var completenessSectorsBounds = [];
					var sectorsBounds = scale.sectorsBounds;
					for (var bound in sectorsBounds) {
						if (!sectorsBounds.hasOwnProperty(bound)) {
							continue;
						}
						completenessSectorsBounds.push(sectorsBounds[bound]);
					}
					scale.sectorsBounds = completenessSectorsBounds;
				}
				return scale;
			},

			/**
			 * ############ ######### ####### ####### ####### ########## #######.
			 * @protected
			 * @param {Object} response ##### ## #######.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ###### ####### ######### ######.
			 */
			completenessServiceCallback: function(response, callback, scope) {
				var completenessConfig = {};
				scope = scope || this;
				var result = response.GetRecordCompletenessResult;
				if (result) {
					if (result.success) {
						completenessConfig.missingParametersCollection = this.getMissingParametersCollection(result);
						completenessConfig.completenessValue = this.getCompletenessValue(result);
						completenessConfig.scale = this.getScale(result);
					} else {
						this.log(result.errorInfo.message, this.Terrasoft.LogMessageType.ERROR);
					}
				}
				if (this.Ext.isFunction(callback)) {
					callback.call(scope, completenessConfig);
				}
			}

			//endregion
		});
		return Terrasoft.CompletenessMixin;
	});


