Terrasoft.configuration.Structures["SecurityUtilities"] = {innerHierarchyStack: ["SecurityUtilities"]};
define("SecurityUtilities", ["ext-base", "terrasoft", "SecurityUtilitiesResources", "RightUtilities"],
		function(Ext, Terrasoft, resources, RightUtilities) {
			var definedClass = Ext.ClassManager.get("Terrasoft.SecurityUtilities");
			if (definedClass) {
				return Ext.create(definedClass);
			}

			Ext.define("Terrasoft.configuration.mixins.SecurityUtilitiesMixin", {
				alternateClassName: "Terrasoft.SecurityUtilitiesMixin",

				/**
				 * ##### ######### ##### ########
				 * @protected
				 * @virtual
				 */
				hideBodyMask: this.Terrasoft.emptyFn,

				/**
				 * #########, ################ ## ####### ##### ## #########.
				 * @protected
				 * @virtual
				 * @return {Boolean} True - #### ################, false # ######## ######.
				 */
				isSchemaAdministratedByOperations: function() {
					var entitySchema = this.entitySchema;
					/* jscs:disable */
					return entitySchema && !!entitySchema.administratedByOperations;
					/* jscs:enable */
				},

				/**
				 * ########## ######## ########, ###### ## ####### ###### #### # ############ ### ############# ####### ###
				 * ########.
				 * @protected
				 * @virtual
				 * @return {String|null} ######## ########.
				 */
				getSecurityOperationName: function() {
					return this.get("SecurityOperationName");
				},

				/**
				 * ######### ########### ##### ####### ### ###### ####### #############.
				 * @protected
				 * @virtual
				 * @param {Function} callback #######, ####### ##### ####### ## ##########.
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
				 */
				checkSchemaRigthsAvailability: function(callback, scope) {
					var entitySchemaName = this.entitySchemaName;
					RightUtilities.getSchemaOperationRightLevel(entitySchemaName, function(rightLevel) {
						this.set("SchemaOperationRight", rightLevel);
						callback.call(scope, this.isSchemaCanReadRightConverter(rightLevel));
					}, this);
				},

				/**
				 * ######### ######### #### ## ########### ########.
				 * @protected
				 * @virtual
				 * @param {Function} callback #######, ####### ##### ####### ## ##########.
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
				 */
				checkSchemaOperationAvailability: function(callback, scope) {
					var operationName = this.getSecurityOperationName();
					if (!operationName) {
						callback.call(scope, true);
						return;
					}
					this.checkCanExecuteOperation(operationName, callback, scope);
				},

				/**
				 * ######### ########### ########## ################ ########.
				 * @protected
				 * @virtual
				 * @param {String} operationName ### ################ ########.
				 * @param {Function} callback #######, ####### ##### ####### ## ##########.
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
				 */
				checkCanExecuteOperation: function(operationName, callback, scope) {
					RightUtilities.checkCanExecuteOperation({
						operation: operationName
					}, function(result) {
						this.setCanExecuteOperationResult(operationName, result);
						callback.call(scope, result);
					}, this);
				},

				/**
				 * ############# ######### ######## ########### ########## ################ ########.
				 * @protected
				 * @virtual
				 * @param {String} operationName ### ################ ########.
				 * @param {Boolean} result ######### ######## ########### ########## ################ ########.
				 */
				setCanExecuteOperationResult: function(operationName, result) {
					this.set(operationName, result);
				},

				/**
				 * Processes result of validation rights.
				 * Sets IsNotAvailable attribute value or notifies the user if no rights.
				 * @protected
				 * @virtual
				 * @param {Function} callback Callback function
				 * @param {Boolean} result Checks result.
				 */
				processCheckAvailabilityResult: function(callback, result, skipRightsToView) {
					if (result) {
						callback.call(this);
					} else {
						if (!skipRightsToView) {
							this.checkCanExecuteOperation("CanViewConfiguration", function(canViewResult) {
								this.processCheckAvailabilityResult(callback, canViewResult, true);
							}, this);
							return;
						}
						this.hideBodyMask();
						var message = resources.localizableStrings.RightAvailabilityFailMessage;
						Terrasoft.showInformation(message);
						var isNotAvailable = this.get("IsNotAvailable");
						if (isNotAvailable === false) {
							this.set("IsNotAvailable", true);
							callback.call(this);
						}
					}
				},

				/**
				 * ########## ######## ## ########### ####### ### ######## ############.
				 * #### ###### ## ######## - ######## ## #### # ## ######## ####### ######### ######.
				 * @protected
				 * @virtual
				 * @param {Function} callback #######, ####### ##### ####### ## ##########.
				 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
				 */
				checkAvailability: function(callback, scope) {
					var checkChain = [];
					checkChain.push(
						this.checkSchemaOperationAvailability,
						this.processCheckAvailabilityResult
					);
					if (this.isSchemaAdministratedByOperations()) {
						checkChain.push(
							this.checkSchemaRigthsAvailability,
							this.processCheckAvailabilityResult
						);
					}
					checkChain.push(
						function() {
							callback.call(scope || this);
						},
						this
					);
					Terrasoft.chain.apply(this, checkChain);
				},

				/**
				 * Checks right for columns.
				 * @protected
				 * @virtual
				 * @param {Object} config Configuration object.
				 * @param {String} config.columnNames Names of column to checks right. If is not set then adds all
				 * view model columns.
				 * @param {Function} config.callback The callback function.
				 * @param {Function} [config.validator] The validator function.
				 * @param {Object} config.scope Environment object callback function.
				 */
				checkColumnsEditRight: function(config) {
					var columnNames = config.columnNames || [];
					if (Ext.isEmpty(columnNames)) {
						Terrasoft.each(this.columns, function(column, columnName) {
							if (column.type === Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
								columnNames.push(columnName);
							}
						}, this);
					}
					var rightConfig = {
						schemaName: this.entitySchemaName,
						columnNames: columnNames
					};
					RightUtilities.getCanEditColumns(rightConfig,
							this.handleResponseCanEditColumns.bind(this, config), this);
				},

				/**
				 * Handles response of check column right.
				 * @private
				 * @param {Object} config Configuration object.
				 * @param {String} config.columnNames Names of column to checks right.
				 * @param {Function} [config.validator] The validator function.
				 * @param {Function} config.callback The callback function.
				 * @param {Object} config.scope Environment object callback function.
				 * @param {Object} response Response from server.
				 */
				handleResponseCanEditColumns: function(config, response) {
					var scope = config.scope || this;
					var validator = config.validator;
					var callback = config.callback;
					var columnNames = config.columnNames;
					if (response) {
						var columnRights = {};
						this.Terrasoft.each(response, function(column) {
							columnRights[column.Key] = column.Value;
						}, this);
						if (Ext.isFunction(validator)) {
							var validatorConfig = {
								columnNames: columnNames,
								columnRights: columnRights,
								callback: callback,
								scope: scope
							};
							validator.call(scope, validatorConfig);
						} else {
							callback.call(scope, columnRights);
						}
					}
				}
			});
		});


