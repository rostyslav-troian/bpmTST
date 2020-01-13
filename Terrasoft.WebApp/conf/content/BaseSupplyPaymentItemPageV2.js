Terrasoft.configuration.Structures["BaseSupplyPaymentItemPageV2"] = {innerHierarchyStack: ["BaseSupplyPaymentItemPageV2"], structureParent: "BasePageV2"};
define('BaseSupplyPaymentItemPageV2Structure', ['BaseSupplyPaymentItemPageV2Resources'], function(resources) {return {schemaUId:'66bb5893-cb1c-4fc6-aa60-2f0536b33df4',schemaCaption: "Base edit page - Installment plan items", parentSchemaName: "BasePageV2", schemaName:'BaseSupplyPaymentItemPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseSupplyPaymentItemPageV2", ["terrasoft", "OrderConfigurationConstants"],
	function(Terrasoft, OrderConfigurationConstants) {
		return {
			methods: {
				/**
				 * ########## ########## ###### ########### ####### ###### ######## ###### #######
				 * # callback-#######. #### ######### ###### #######, ######### ######### ### #######,
				 * ##### ########## ######.
				 * @param {Function} next ######### ### ####### #######.
				 * @param {Function} method ########### #####.
				 */
				callWithValidation: function(next, method) {
					if (method && this.Ext.isFunction(method)) {
						method.call(this, function(response) {
							if (this.validateResponse(response)) {
								next();
							}
						}, this);
					}
				},

				/**
				 * Type change step handler.
				 * @private
				 */
				onTypeChanged: function() {
					var name = this.get("Name");
					var type = this.get("Type");
					if (this.Ext.isEmpty(name) && !this.Ext.isEmpty(type)) {
						this.set("Name", type.displayValue);
					}
				},

				/**
				 * Returns a sign of need to validate the field "Percentage".
				 * @protected
				 */
				needValidateTotalPercentage: function() {
					return this.needToValidateSupplyPaymentColumn("Percentage");
				},

				/**
				 * Returns a sign of need to validate the field "Amount plan".
				 * @protected
				 */
				needValidateTotalAmountPlan: function() {
					return this.needToValidateSupplyPaymentColumn("AmountPlan");
				},

				/**
				 * Returns a sign of need to validate field.
				 * @protected
				 * @param {String} columnName - Column name.
				 */
				needToValidateSupplyPaymentColumn: function(columnName) {
					if (this.changedValues && this.changedValues.hasOwnProperty(columnName)) {
						var order = this.get("Order");
						var type = this.get("Type");
						return (order && order.value && type &&
							(type.value === OrderConfigurationConstants.SupplyPaymentElement.Type.Payment));
					}
					return false;
				},

				/* ########## ###### ######### ######## #### "####, %" ## ######. ##### ####### ######### ######## ####
				* ####### ###### # ######### ######## ####### #### ### ######## ######. #### ######### ########
				* ###### 100%, ####### ######### ###### ######## ############### ########## # ########## #########
				* #########. ##### ## ####### ########## ######## ############# ####### # ############# ##### "####, %".
				* #### ########## ############ ######## ######, ### ############# ########### ########.
				* @protected
				* @param {Object} config ###### ### ############ ####### #########.
				* ######## ######### #########:
				* @param {GUID} config.orderId
				*   ############# ######## ######.
				* @param {GUID} config.supplyPaymentElementId
				*   ############# ######## #### ####### ######## # #####.
				* @param {Number} config.percentageValue
				*   ##### ######## #### "####, %" ######## ####.
				* @param {Function} config.callback
				*   #######, ####### ##### ####### ##### ######### ###### ## #######.
				*/
				validateTotalPercentage: function(config) {
					config = this._getPercentageValidationConfig(config.callback);
					this.callServerValidationFn(config);
				},

				/**
				 * Delay validation.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				validateDelay: function(callback, scope) {
					var delay = this.get("Delay");
					var result = {
						success: true
					};
					if (delay < 0) {
						result.message = this.get("Resources.Strings.DelayNegative");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
				 * @protected
				 * @overridden
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						this.Terrasoft.chain(
							function(next) {
								this.callWithValidation(next, this._validateAmountPlan);
							},
							function(next) {
								this.callWithValidation(next, this.validatePercentage);
							},
							function(next) {
								this.callWithValidation(next, this.validateDelay);
							},
							function() {
								callback.call(scope, response);
							}, this
						);
					}, this]);
				},

				/**
				 * Percentage validation.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				validatePercentage: function(callback, scope) {
					var percent = this.get("Percentage");
					if ((percent > 100) || (percent < 0)) {
						this.Ext.callback(callback, scope || this, [{
							success: false,
							message: this.get("Resources.Strings.PercentageIncorrect")
						}]);
					} else if (this.needValidateTotalPercentage()) {
						this.validateTotalPercentage({
							orderId: this.get("Order").value,
							supplyPaymentElementId: this.get("Id"),
							percentageValue: percent,
							callback: callback
						});
					} else {
						this.Ext.callback(callback, scope || this, [{
							success: true
						}]);
					}
				},

				/**
				 * Percentage validation.
				 * @private
				 * @param {Function} callback Callback function.
				 */
				_validateAmountPlan: function(callback, scope) {
					if (this.needValidateTotalAmountPlan()) {
						var config = this._getAmountPlanValidationConfig(callback);
						this.callServerValidationFn(config);
					} else {
						this.Ext.callback(callback, scope || this, [{
							success: true
						}]);
					}
				},

				/**
				 * Percentage validation config.
				 * @private
				 * @param {Function} callback Callback function.
				 * @return {Object} config Validation config.
				 */
				_getPercentageValidationConfig: function(callback) {
					var config = this._getBaseSupplyPaymentValidationConfig(callback);
					var addConfig = {
						data: {
							"newPercentageValue": this.get("Percentage")
						},
						methodName: "ValidateSupplyPaymentPercentage",
						columnName: "Percentage"
					};
					config = this.Ext.merge(config, addConfig);
					return config;
				},

				/**
				 * Amount plan validation config.
				 * @private
				 * @param {Function} callback Callback function.
				 * @return {Object} config Validation config.
				 */
				_getAmountPlanValidationConfig: function(callback) {
					var config = this._getBaseSupplyPaymentValidationConfig(callback);
					var addConfig = {
						data: {
							"newAmountPlanValue": this.get("AmountPlan")
						},
						methodName: "ValidateSupplyPaymentAmountPlan",
						columnName: "AmountPlan"
					};
					config = this.Ext.merge(config, addConfig);
					return config;
				},

				/**
				 * Base supply payment column validation config.
				 * @private
				 * @param {Function} callback Callback function.
				 * @return {Object} config Validation config.
				 */
				_getBaseSupplyPaymentValidationConfig: function(callback) {
					var config = {
						data: {
							"orderId": this.get("Order").value,
							"currentElementId": this.get("Id")
						},
						serviceName: "OrderPassportService",
						callback: callback
					};
					return config;
				},

				/**
				 * Calls server-side validation function.
				 * @protected
				 * @param {Object} config.
				 */
				callServerValidationFn: function(config) {
					this.callService({
						serviceName: config.serviceName,
						methodName: config.methodName,
						data: config.data
					}, function(response) {
						var responseResult = response[config.methodName + "Result"] || {};
						if (responseResult.success && this.parentDetailViewModel &&
							this.changedValues && this.changedValues[config.columnName]) {
							this.parentDetailViewModel.set("NeedReloadGridData", true);
						}
						config.callback.call(this, {
							success: responseResult.success,
							message: (responseResult.errorInfo && responseResult.errorInfo.message) || ""
						});
					}, this);
				},
			}
		};
	}
);


