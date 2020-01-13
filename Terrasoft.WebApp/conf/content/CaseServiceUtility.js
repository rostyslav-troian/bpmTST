Terrasoft.configuration.Structures["CaseServiceUtility"] = {innerHierarchyStack: ["CaseServiceUtility"]};
define("CaseServiceUtility", ["ServiceDeskConstants"],
		function(ServiceDeskConstants) {
			/* jshint ignore:start */
			/* jscs:disable */
			(function() {
				//TODO: Remove when IE 11 will be not supported. Array.find polyfill.
				if (!Array.prototype.find) {
					Array.prototype.find = function(predicate) {
						if (this == null) {
							throw new TypeError("Array.prototype.find called on null or undefined");
						}
						if (typeof predicate !== "function") {
							throw new TypeError("predicate must be a function");
						}
						var list = Object(this);
						var length = list.length >>> 0;
						var thisArg = arguments[1];
						var value;

						for (var i = 0; i < length; i++) {
							value = list[i];
							if (predicate.call(thisArg, value, i, list)) {
								return value;
							}
						}
						return undefined;
					};
				}
			})();
			/* jscs:enable */
			/* jshint ignore:end */
			/**
			 * @class This.terrasoftconfiguration.mixins.CaseServiceUtility
			 * Mixin, that implements work with service item on page.
			 */
			this.Ext.define("Terrasoft.configuration.mixins.CaseServiceUtility", {
				alternateClassName: "Terrasoft.CaseServiceUtility",
				/**
				 * Sets case category by service item.
				 * @protected
				 * @virtual
				 */
				setTypeByServiceItem: function() {
					var serviceItem = this.get("ServiceItem");
					if (!serviceItem) {
						return;
					}
					var query = this.getServiceItemQuery();
					query.getEntity(serviceItem.value, this.onGetServiceItemEntity, this);
				},

				/**
				 * Forms query that select case category of the service item.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Query that select case category of the service item.
				 */
				getServiceItemQuery: function() {
					var query = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ServiceItem"
					});
					query.addColumn("CaseCategory");
					return query;
				},

				/**
				 * On get service item record handler.
				 * Sets case category by case category of service item.
				 * @param {Object} result
				 */
				onGetServiceItemEntity: function(result) {
					if (result.success && result.entity) {
						var category = this.get("Category");
						var serviceItemCaseCategory = result.entity.get("CaseCategory");
						if (!category || category.value !== serviceItemCaseCategory.value) {
							this.set("CategoryOfService", serviceItemCaseCategory);
							this.set("Category", serviceItemCaseCategory);
						}
					}
				},

				/**
				 * Category field change handler.
				 * @protected
				 */
				onCategoryChanged: function() {
					if (this.isNewMode() && this.changedValues.Category &&
						(this.get("Category") != this.get("CategoryOfService"))) {
						this.set("ServiceItem", null);
						this.set("CategoryOfService", null);
					}
				},

				/**
				 * Recalculates scheduled dates by service item.
				 * @protected
				 */
				recalculateServiceTerms: function() {
					var config = this.getIsFeatureEnabled("ServiceTerms")
							? this.getCaseTermCalculatorServiceConfig()
							: this.getCallTermCalculationServiceConfig();
					if (config) {
						if (this.getIsFeatureEnabled("ServiceTerms")){
							this.callService(config, this.onRecalculateCaseTerms, this);
						} else {
							this.callService(config, this.onRecalculateServiceTerms, this);
						}
					} else if (this.get("ResponseDate")) {
						this.set("ResponseDate", null);
						this.set("SolutionDate", null);
					}
				},

				/**
				 * Sets response date and solution date.
				 * @param {Object} response Response of calculation by strategies.
				 * @protected
				 */
				onRecalculateCaseTerms: function(response) {
					this.hideBodyMask();
					if (!response || !response.CalculateTermsResult) {
						this.set("ResponseDate", null);
						this.set("SolutionDate", null);
						return;
					}
					var result = this.Terrasoft.decode(response.CalculateTermsResult);
					var reactionTime = result.ReactionTime ? this.Terrasoft.parseDate(result.ReactionTime) : null;
					var solutionTime = result.SolutionTime ? this.Terrasoft.parseDate(result.SolutionTime) : null;
					this.setCalculatedResponseDate(reactionTime);
					this.setCalculatedSolutionDate(solutionTime);
					this.onCaseTermsRecalculated();
				},

				/**
				 * Check and set response date and time.
				 * @protected
				 * @param {Date} responseTime Response time.
				 */
				setCalculatedResponseDate: function(responseTime) {
					var respondedOnDate = this.get("RespondedOn");
					var responseDate = this.get("ResponseDate");
					if(this.Ext.isEmpty(respondedOnDate) || this.Ext.isEmpty(responseDate)) {
						this.set("ResponseDate", responseTime);
					}
				},

				/**
				 * Check and set solution date and time.
				 * @protected
				 * @param {Date} solutionTime Solution time.
				 */
				setCalculatedSolutionDate: function(solutionTime) {
					this.set("SolutionDate", solutionTime);
				},

				/**
				 * Sets response date and solution date.
				 * @param {Object} response Response of calculation by service item.
				 * @protected
				 */
				onRecalculateServiceTerms: function(response) {
					this.hideBodyMask();
					if (!response || !(response.TermResponse || response.GetServiceTermResult)) {
						this.set("ResponseDate", null);
						this.set("SolutionDate", null);
						return;
					}
					var result = response.TermResponse || response.GetServiceTermResult;
					var respondedOnDate = this.get("RespondedOn");
					var responseDate = this.get("ResponseDate");
					if(this.Ext.isEmpty(respondedOnDate) || this.Ext.isEmpty(responseDate)) {
						this.set("ResponseDate", new Date(parseInt(result.ReactionTime.substr(6), 10)));
					}
					this.set("SolutionDate", new Date(parseInt(result.SolutionTime.substr(6), 10)));
				},

				/**
				 * Returns service startup config for calculation term by service item.
				 * @protected
				 * @return {Object} Service startup config.
				 */
				getCallTermCalculationServiceConfig: function() {
					var serviceItem = this.get("ServiceItem");
					var registrationTime = this.get("RegisteredOn");
					if (!serviceItem || !registrationTime) {
						return null;
					}
					var encodedDate = this.encodeDateToJsonFormat(registrationTime);
					if (!encodedDate) {
						return null;
					}
					var serviceName = this.getCalculationServiceName();
					return {
						serviceName: serviceName,
						methodName: "GetServiceTerm",
						data: {
							request: {
								ServiceItemId: serviceItem.value,
								PriorityId: this.Terrasoft.GUID_EMPTY,
								RegistrationTime: encodedDate
							}
						}
					};
				},

				/**
				 * Returns service term calculator service config.
				 * @protected
				 * @return {Object} Service term calculator service config.
				 */
				getCaseTermCalculatorServiceConfig: function() {
					var conditions = this.prepareCaseTermCalculatorConditions();
					var registrationTime = this.get("RegisteredOn");
					if (this.Ext.isEmpty(conditions) || !registrationTime) {
						return null;
					}
					var encodedDate = this.encodeDateToJsonFormat(registrationTime);
					return {
						serviceName: "CaseTermCalculationService",
						methodName: "CalculateTerms",
						data: {
							arguments: conditions,
							registrationDate: encodedDate
						}
					};
				},

				/**
				 * Prepares case term calculator conditions.
				 * @protected
				 * @return {Array} Service term calculator conditions.
				 */
				prepareCaseTermCalculatorConditions: function() {
					var conditions = [];
					this.addToConditions(conditions, "ServiceItem");
					this.addToConditions(conditions, "ServicePact");
					this.addToConditions(conditions, "Priority");
					this.addToConditions(conditions, "Id");
					this.addToConditions(conditions, "SolutionOverdue");
					return conditions;
				},

				/**
				 * Add parameters to conditions array.
				 * @protected
				 */
				addToConditions: function(conditions, parameterName) {
					var parameter = this.get(parameterName);
					if (parameter && parameter.value) {
						conditions.push(this.prepareConditionItem(parameterName + "Id", parameter.value));
					}
					if (parameter && parameterName === "Id") {
						conditions.push(this.prepareConditionItem("CaseId", parameter));
					}
					if (parameterName === "SolutionOverdue") {
						if (!parameter) {
							parameter = false;
						}
						conditions.push(this.prepareConditionItem("SolutionOverdue", parameter));
					}
				},

				/**
				 * Prepares service term calcultor condition item.
				 * @protected
				 * @param {String} key Condition item key.
				 * @param {Object} value Condition item value.
				 * @return {Object} Service term calcultor condition item..
				 */
				prepareConditionItem: function(key, value) {
					return {
						Key: key,
						Value: value
					};
				},

				/**
				 * Encodes date to JSON format.
				 * @protected
				 * @return {Object} Date in JSON format .
				 */
				encodeDateToJsonFormat: function(dateTime) {
					var encodedDate = null;
					try {
						encodedDate = JSON.parse(this.Terrasoft.encodeDate(dateTime));
					} catch (exception) {
						this.error(exception);
					}
					return encodedDate;
				},

				/**
				 * On service item field change event handler.
				 * Recalculates service item terms.
				 * @protected
				 * @virtual
				 */
				onServiceItemChanged: function() {
					var originalServiceItem = this.get("OriginalServiceItem");
					var serviceItem = this.get("ServiceItem");
					if (originalServiceItem !== serviceItem) {
						this.recalculateServiceTerms();
						this.setTypeByServiceItem();
					}
				},

				/**
				 * Calculates solution date after pause state.
				 * @protected
				 * @param {Boolean} isResolution Is solution date flag.
				 */
				calculateDateAfterPause: function(isResolution) {
					if (!isResolution) {
						return;
					}
					var caseId = this.get("Id");
					var remainsTicks = this.get("SolutionRemains");
					var serviceName = this.getCalculationServiceName();
					var config = {
						serviceName: serviceName,
						methodName: "GetDateAfterPause",
						data: {
							request: {
								RemainsTicks: remainsTicks,
								IsResolution: true,
								CaseId: caseId
							}
						}
					};
					this.callService(config, this.onDateAfterPauseCalculated, this);
				},

				/**
				 * On calculate solution date after pause.
				 * Sets solution date and resets solution remains setter.
				 * @param {Object} response Response  of calculation.
				 * @protected
				 */
				onDateAfterPauseCalculated: function(response) {
					if (!response || !response.GetDateAfterPauseResult) {
						return;
					}
					this.set("SolutionDate", new Date(parseInt(response.GetDateAfterPauseResult.substr(6), 10)));
					this.set("SolutionRemainsSetter", null);
				},

				/**
				 * Calculates remains.
				 * @protected
				 * @param {Boolean} isResolution Is solution date flag.
				 */
				calculateRemains: function(isResolution) {
					if (!isResolution) {
						return;
					}
					var caseId = this.get("Id");
					var sourceDateTime = this.get("SolutionDateGetter");
					var encodedDate = this.encodeDateToJsonFormat(sourceDateTime);
					if (!encodedDate) {
						return null;
					}
					var serviceName = this.getCalculationServiceName();
					var config = {
						serviceName: serviceName,
						methodName: "GetRemainsTicks",
						data: {
							request: {
								SourceDateTime: encodedDate,
								IsResolution: isResolution,
								CaseId: caseId
							}
						}
					};
					this.callService(config, this.onRemainsCalculated, this);
				},

				/**
				 * Sets solution remains setter column value.
				 * @param {Object} response Service response of calculation.
				 * @protected
				 */
				onRemainsCalculated: function(response) {
					if (!response || !response.GetRemainsTicksResult) {
						return;
					}
					this.set("SolutionRemainsSetter", response.GetRemainsTicksResult);
				},

				/**
				 * Returns calculation service name.
				 * @protected
				 * @return {Terrasoft.BaseFilter} Service name.
				 */
				getCalculationServiceName: function() {
					return "TermCalculationCSService";
				},

				/**
				 * Returns filter for service item" with active status.
				 * @protected
				 * @return {Terrasoft.BaseFilter} Service item column filter.
				 */
				getServiceItemFilter: function() {
					var serviceItemFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Status.Active", true);
					return serviceItemFilter;
				},

				/**
				 * On status change handler.
				 * Recalculates terms by service item.
				 */
				onStatusChanged: function() {
					this.callParent(arguments);
					if (this.isNeedToRecalculateTerms()) {
						this.recalculateServiceTerms();
					}
				},

				/**
				 * On priority change handler.
				 * Recalculates terms by priority.
				 */
				onPriorityChanged: function() {
					if (this.getIsFeatureEnabled("ServiceTerms")) {
						this.recalculateServiceTerms();
					}
				},

				/**
				 * Checks need to recalculate terms.
				 * @protected
				 * @return {Boolean} Need to recalculate terms.
				 */
				isNeedToRecalculateTerms: function() {
					var status = this.get("Status");
					var originalStatus = this.get("OriginalStatus");
					if (!status || !originalStatus) {
						return false;
					}
					var isActiveStatus = !status.IsFinal && !status.IsPaused && !status.IsResolved;
					var isActiveOriginalStatus = !originalStatus.IsFinal && !originalStatus.IsPaused &&
							!originalStatus.IsResolved;
					return isActiveOriginalStatus && !isActiveStatus;
				},

				/**
				 * Checks property value and sets it to absolute value if its negative.
				 * @param propertyName - name of property to be checked
				 * @protected
				 */
				setAbsoluteValue: function(propertyName) {
					var propertyValue = this.get(propertyName);
					if (this.Ext.isNumber(propertyValue) && propertyValue < 0) {
						this.set(propertyName, Math.abs(propertyValue));
					}
				},

				/**
				 * Handles changes of RegisteredOn column.
				 * @virtual
				 * @protected
				 */
				onRegisteredOnChanged: function() {
					if (this.getIsFeatureEnabled("ServiceTerms") && this.isNew) {
						var strategyId = this.get("StrategyId");
						if (!strategyId) {
							return;
						}
						var strategies = ServiceDeskConstants.NeedToCalculateByPriorityStrategies;
						var strategiesIds = this.Terrasoft.getPropertyValuesArray(
								this.Terrasoft.keys(strategies), strategies);
						if (this.Terrasoft.contains(strategiesIds, strategyId)) {
							this.recalculateServiceTerms();
						}
					}
				},

				/**
				 * Gets default case term strategy.
				 * @protected
				 * @virtual
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope.
				 */
				getDefaultCaseTermStrategy: function(callback, scope) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "DeadlineCalcSchemas"
					});
					esq.addColumn("Id");
					esq.addColumn("Default");
					esq.addColumn("AlternativeRule");
					esq.getEntityCollection(function(response) {
						this.handleStrategies(response);
						if (this.Ext.isFunction(callback)) {
							callback.call(scope || this);
						}
					}, this);
				},

				/**
				 * Handles strategies by creating a sequence and defining current default strategy.
				 * @private
				 * @param {Object} response ESQ response.
				 */
				handleStrategies: function(response) {
					if (response.success && !response.collection.isEmpty()) {
						var items = response.collection.getItems();
						var defaultStrategy = this.findDefaultStrategy(items);
						var strategyId = defaultStrategy.get("Id");
						this.set("StrategyId", strategyId);
						var sequence = this.buildStrategySequence(defaultStrategy, items);
						this.set("StrategySequence", sequence);
					}
				},

				/**
				 * Finds default strategy from the given strategy collection.
				 * @private
				 * @param {Terrasoft.Collection} collection Strategy collection.
				 * @returns {Terrasoft.Entity} Default strategy, if found.
				 */
				findDefaultStrategy: function(collection) {
					return collection.find(function(item) {
						return item.get("Default");
					});
				},

				/**
				 * Checks if strategy with specified identifier is in sequence.
				 * @private
				 * @param {GUID} strategyId Strategy identifier.
				 * @returns {Boolean} Result of checking.
				 */
				getIsStrategyInSequence: function(strategyId) {
					var sequence = this.get("StrategySequence");
					var isStrategyInSequence = sequence && sequence.any(function(strategy) {
						return strategy.get("Id") === strategyId;
					});
					return isStrategyInSequence;
				},

				/**
				 * Builds strategy sequence from strategy collection starting with specified default strategy.
				 * @private
				 * @param {Terrasoft.Entity} defaultStrategy Default strategy.
				 * @param {Terrasoft.Collection} collection Strategy collection.
				 * @returns {Terrasoft.Collection} Strategy sequence.
				 */
				buildStrategySequence: function(defaultStrategy, collection) {
					var sequence = this.Ext.create("Terrasoft.Collection");
					var current = defaultStrategy;
					var alternativeRuleSelector = function(strategy) {
						var rule = current.get("AlternativeRule");
						return rule && strategy.get("Id") === rule.value;
					};
					while (!this.Ext.isEmpty(current) && !sequence.collection.contains(current)) {
						sequence.add(current);
						current = collection.find(alternativeRuleSelector, this);
					}
					return sequence;
				}
			});
		});


