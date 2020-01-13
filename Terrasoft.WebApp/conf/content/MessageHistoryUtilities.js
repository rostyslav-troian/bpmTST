Terrasoft.configuration.Structures["MessageHistoryUtilities"] = {innerHierarchyStack: ["MessageHistoryUtilities"]};
define("MessageHistoryUtilities", ["SchemaBuilderV2"],
	function() {
		/**
		 * @class Terrasoft.configuration.MessageHistoryUtilities
		 * Utilities for message history.
		 */
		Ext.define("Terrasoft.configuration.mixins.MessageHistoryUtilities", {
			alternateClassName: "Terrasoft.MessageHistoryUtilities",

			/**
			 * Notifiers.
			 * @type {Object}
			 */
			Notifiers: {},

			/**
			 * {Terrasoft.SchemaBuilder} instance to generate the presentation and view model of pages.
			 * @private
			 * @type {Terrasoft.SchemaBuilder}
			 */
			schemaBuilder: null,

			/**
			 * Initialize base history columns.
			 * @protected
			 */
			init: function() {
				this.set("MessageHistoryColumnNames", ["Id", "MessageNotifier", "MessageNotifier.Description",
					"Message", "CreatedBy", "CreatedOn", "RecordId"]);
			},

			/**
			 * Initialize notifiers.
			 * @param {String} sectionId Section id.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context of the callback function.
			 * @protected
			 */
			initNotifiers: function(sectionId, callback, scope) {
				var chainArguments = [];
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MessageNotifier"
				});
				select.addColumn("Id");
				select.addColumn("ClassName");
				if (this.$IsMessageHistoryV2Enabled && this.getIsFeatureEnabled("MessageHistoryV2")) {
					select.addColumn("HistoryV2ClassName");
					select.filters.addItem(select.createColumnIsNotNullFilter("HistoryV2ClassName"));
				} else {
					select.filters.addItem(select.createColumnIsNotNullFilter("ClassName"));
				}
				if (this.getIsFeatureEnabled("UseAliasNotifier")) {
					select.addColumn("AliasNotifier");
				}
				if (sectionId) {
					select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"[MessageNotifierBySection:MessageNotifier].Section", sectionId));
				}
				select.getEntityCollection(function(result) {
					if (result.success) {
						this.schemaBuilder = this.schemaBuilder || this.Ext.create("Terrasoft.SchemaBuilder");
						result.collection.each(function(item) {
							var schemaName = this._getHistorySchemaName(item);
							var builderConfig = {
								schemaName: schemaName,
								entitySchemaName: null,
								profileKey: schemaName
							};
							chainArguments.push(function(next) {
								this.schemaBuilder.build(builderConfig, function(viewModelClass, viewConfig) {
									this.Notifiers[item.get("Id")] = {
										viewModelClass: viewModelClass,
										viewConfig: viewConfig
									};
									if (this.getIsFeatureEnabled("UseAliasNotifier")) {
										this.Notifiers[item.get("Id")].aliasNotifier = item.get("AliasNotifier");
									}
									next();
								}, this);
							});
						}, this);
						chainArguments.push(function(next) {
							(scope || this).set("AreNotifiersInitialized", true);
							next();
						});
						chainArguments.push(function() {
							callback.call(scope || this);
						});
						chainArguments.push(this);
						this.Terrasoft.chain.apply(this, chainArguments);
					}
				}, this);
			},

			/**
			 * Returns class name of history schema.
			 * @param {Object} messageNotifierItem Item of message notifier.
			 * @private
			 * @return {String} Class name of history schema.
			 */
			_getHistorySchemaName: function(messageNotifierItem) {
				var isHistoryV2ClassName = this.$IsMessageHistoryV2Enabled &&
					!this.Ext.isEmpty(messageNotifierItem.get("HistoryV2ClassName")) &&
					this.getIsFeatureEnabled("MessageHistoryV2");
				if (isHistoryV2ClassName) {
					return messageNotifierItem.get("HistoryV2ClassName");
				}
				return messageNotifierItem.get("ClassName");
			},

			/**
			 * Create history message view model.
			 * @param {Object} config The configuration by query results.
			 * @private
			 */
			createHistoryMessageViewModel: function(config) {
				var viewModelConfig = {
					rowConfig: config.rowConfig,
					values: config.rawData,
					Ext: this.Ext,
					Terrasoft: this.Terrasoft,
					sandbox: this.sandbox
				};
				var notifier = this.Notifiers[config.rawData.MessageNotifier.value];
				if (this.getIsFeatureEnabled("UseAliasNotifier") && !notifier) {
					notifier = this.findNotifierByAliasNotifier(config);
				}
				var viewModel = this.Ext.create(notifier.viewModelClass, viewModelConfig);
				viewModel.set("viewConfig", notifier.viewConfig);
				config.viewModel = viewModel;
			},

			/**
			 * Find notifier by alias notifier, which is stored in AliasNotifier column.
			 * @protected
			 * @param {Object} config The configuration by query results.
			 * @return {Object} Message notifier.
			 */
			findNotifierByAliasNotifier: function(config) {
				var notifierByAliasNotifier;
				Ext.Object.each(this.Notifiers, function(key, value) {
					if (value.aliasNotifier.value && value.aliasNotifier.value ===
						config.rawData.MessageNotifier.value) {
						notifierByAliasNotifier = value;
						return false;
					}
				}, this);
				return notifierByAliasNotifier;
			},

			/**
			 * Add aditional filter to esq by alias notifier.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq EntitySchemaQuery object for CaseMesageHistory entity.
			 * @param {Guid} sectionId Section identifier, which is related with message history.
			 */
			addAdditionalFilterByAliasNotifier: function(esq, sectionId) {
				var filterGroup = esq.createFilterGroup();
				filterGroup.name = "PortalNotifierFilter";
				filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				filterGroup.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[MessageNotifierBySection:MessageNotifier:MessageNotifier].Section", sectionId));
				filterGroup.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[MessageNotifier:AliasNotifier:MessageNotifier]" +
					".[MessageNotifierBySection:MessageNotifier:Id].Section", sectionId));
				esq.filters.addItem(filterGroup);
			},

			/**
			 * Load history messages.
			 * @private
			 * @param {Object} config Configuration for loading messages.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context of the callback function.
			 */
			loadHistoryMessages: function(config, callback, scope) {
				var esq = this.getHistoryMessageEsq(config);
				var messageId = config.messageId;
				if (Terrasoft.Features.getIsEnabled("UseMessageHistoryPagination") && !messageId) {
					esq.isPageable = true;
					esq.rowsOffset = this.$MessagesOffsetCount;
					this.$MessagesOffsetCount += this.$NextMessageCount;
				}
				var filters = esq.filters;
				var sortColumnName = config.sortColumnName;
				if (messageId) {
					if (Terrasoft.Features.getIsEnabled("CanUpdateHistoryMessage")) {
						filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"RecordId", messageId));
					} else {
						filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Id", messageId));
					}
				} else if (!messageId && !Terrasoft.Features.getIsEnabled("UseMessageHistoryPagination")) {
					var sortDirection = config.sortDirection || this.Terrasoft.OrderDirection.DESC;
					var sortColumnLastValue = this.get("SortColumnLastValue");
					if (sortColumnLastValue) {
						filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							sortDirection === this.Terrasoft.OrderDirection.DESC
								? this.Terrasoft.ComparisonType.LESS
								: this.Terrasoft.ComparisonType.GREATER,
							sortColumnName, sortColumnLastValue));
					}
				}
				var esqConfig = config.esqConfig;
				if (esqConfig) {
					this.addFiltersFromConfig(esqConfig, filters, esq);
				}
				esq.getEntityCollection(function(result) {
					if (result.success) {
						var config = {
							"collection": result.collection,
							"messageId": messageId,
							"sortColumnName": sortColumnName
						};
						this.proccedResponseResult(config, callback, scope);
					}
				}, scope || this);
			},

			/**
			 * Adds additional filters from esq configuration object, that is stored in
			 * configuration object for loading messages.
			 * @protected
			 * @param {Object} esqConfig Configuration object.
			 * @param {Object} filters Filter object for esq object.
			 * @param {Terrasoft.EntitySchemaQuery} esq EntitySchemaQuery object for CaseMesageHistory entity.
			 */
			addFiltersFromConfig: function(esqConfig, filters, esq) {
				var esqFilter = esqConfig.filter;
				var sectionId = esqConfig.sectionId;
				if (esqFilter) {
					filters.add(esqFilter);
				}
				if (sectionId) {
					if (this.getIsFeatureEnabled("UseAliasNotifier")) {
						this.addAdditionalFilterByAliasNotifier(esq, sectionId);
					} else {
						filters.addItem(esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"[MessageNotifierBySection:MessageNotifier:MessageNotifier].Section", sectionId));
					}
				}
			},

			/**
			 * Procceds successful request result.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The context of the callback function.
			 */
			proccedResponseResult: function(config, callback, scope) {
				var collection = config.collection;
				if (collection.getCount() > 0) {
					if (!config.messageId && !this.getIsFeatureEnabled("UseMessageHistoryPagination")) {
						var lastItemIndex = collection.getCount() - 1;
						var lastItem = collection.getByIndex(lastItemIndex);
						this.set("SortColumnLastValue", lastItem.get(config.sortColumnName));
					}
					this.initializeGroupCaptions(config);
					collection.each(function(item) {
						item.$HistorySchemaName = this.$historySchemaName;
						item.init();
					}, this);
					if (config.messageId) {
						callback.call(scope, collection.getByIndex(0));
					} else {
						callback.call(scope, collection);
					}
				}
			},

			/**
			 * Initializes group captions.
			 * @protected
			 * @param {Object} config Configuration object.
			 */
			initializeGroupCaptions: function(config) {
				var collection = config.collection;
				var firstItem = collection.first();
				var sortColumn = config.sortColumnName;
				if (!this.isEmpty(firstItem)) {
					if (this.$MessagesOffsetCount <= this.$InitMessageCount) {
						firstItem.set("GroupCaption", this.getGroupCaption(firstItem.get(sortColumn)));
					} else {
						var lastDate = this.$LastDate;
						var currentItemDate = firstItem.get(sortColumn);
						if (this.isMonthOrYearAreDifferent(lastDate, currentItemDate)) {
							firstItem.set("GroupCaption", this.getGroupCaption(firstItem.get(currentItemDate)));
						}
					}
					var previousItem = firstItem;
					collection.each(function (currentItem, index, length) {
						if (index !== 0 && length > index) {
							var previousDate = previousItem.get(sortColumn);
							var currentDate = currentItem.get(sortColumn);
							if (this.isMonthOrYearAreDifferent(previousDate, currentDate)) {
								currentItem.set("GroupCaption", this.getGroupCaption(currentDate));
								this.set("LastDate", currentDate);
							}
							previousItem = currentItem;
						}
					}, this);
				}
			},

			/**
			 * Check if dates are different.
			 * @protected
			 * @param {Object} firstDate First date object.
			 * @param {Object} secondDate Second date object.
			 * @return {Boolean} True if dates are different, otherwise false.
			 */
			isMonthOrYearAreDifferent: function(firstDate, secondDate) {
				var previousDateMonth = this.Ext.isDate(firstDate) ? firstDate.getMonth() : -1;
				var currentDateMonth = this.Ext.isDate(secondDate) ? secondDate.getMonth() : -1;
				var previousDateYear = this.Ext.isDate(firstDate) ? firstDate.getFullYear() : -1;
				var currentDateYear = this.Ext.isDate(secondDate) ? secondDate.getFullYear() : -1;
				return previousDateMonth !== currentDateMonth || previousDateYear !== currentDateYear;
			},
			/**
			 * Get group caption for history item.
			 * @protected
			 * @param {Object} date Date which must be formatted.
			 */
			getGroupCaption: function(date) {
				var groupCaption = "";
				if (this.Ext.isDate(date)) {
					var cultureSettings = this.Terrasoft.Resources.CultureSettings;
					var monthNames = cultureSettings.monthNames;
					groupCaption = this.Ext.String.format("{0} {1}", monthNames[date.getMonth()],
						date.getFullYear());
				}
				return groupCaption;
			},

			/**
			 * Modifies message history query using notifier parameters.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Message history query.
			 */
			addEsqParametersFromNotifiers: function(esq) {
				for (var notifier in this.Notifiers) {
					if (this.Notifiers.hasOwnProperty(notifier)) {
						var viewModelConfig = {
							Ext: this.Ext,
							Terrasoft: this.Terrasoft,
							sandbox: this.sandbox
						};
						var viewModel = this.Ext.create(this.Notifiers[notifier].viewModelClass, viewModelConfig);
						if (viewModel.historyMessageEsqApply !== this.Terrasoft.emptyFn) {
							viewModel.historyMessageEsqApply(esq);
						}
						if (viewModel.addAdditionalFilters !== this.Terrasoft.emptyFn) {
							viewModel.addAdditionalFilters(esq, {
								needToShowSystemMessages: this.get("NeedShowSystemMessages")
							});
						}
					}
				}
			},

			/**
			 * Modifies message history query using ClassName or HistoryV2ClassName filter.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} esq Message history query.
			 */
			addClasNameExistFilter: function(esq) {
				var columnName = this.$IsMessageHistoryV2Enabled && this.getIsFeatureEnabled("MessageHistoryV2")
					? "HistoryV2ClassName" : "ClassName";
				esq.filters.addItem(esq.createColumnIsNotNullFilter("MessageNotifier." + columnName));
			},

			/**
			 * Returns message history query.
			 * @protected
			 * @virtual
			 * @param {Object} config Query configuration.
			 * @return {Terrasoft.EntitySchemaQuery} Message history query.
			 */
			getHistoryMessageEsq: function(config) {
				var rowCount = config.esqConfig ? {rowCount: config.esqConfig.rowCount} : null;
				var options = this.Ext.apply({
					rootSchemaName: config.esqConfig.entitySchemaName
				}, rowCount);
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", options);
				esq.on("createviewmodel", this.createHistoryMessageViewModel, this);
				var sortColumnName = config.sortColumnName;
				var messageHistoryColumnNames = this.get("MessageHistoryColumnNames");
				var columnNames = this.Terrasoft.deepClone(messageHistoryColumnNames);
				if (!this.Ext.isEmpty(sortColumnName) && columnNames.indexOf(sortColumnName) === -1) {
					columnNames.push(sortColumnName);
				}
				var sortDirection = config.sortDirection || this.Terrasoft.OrderDirection.DESC;
				this.Terrasoft.each(columnNames, function(columnName) {
					var column = esq.addColumn(columnName);
					if (columnName === sortColumnName) {
						column.orderPosition = 1;
						column.orderDirection = sortDirection;
					}
				});
				this.addEsqParametersFromNotifiers(esq);
				this.addClasNameExistFilter(esq);
				return esq;
			}
		});
	}
);


