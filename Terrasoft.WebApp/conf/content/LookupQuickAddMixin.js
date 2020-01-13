Terrasoft.configuration.Structures["LookupQuickAddMixin"] = {innerHierarchyStack: ["LookupQuickAddMixin"]};
define("LookupQuickAddMixin", ["LookupQuickAddMixinResources", "RightUtilities", "LookupUtilities", "MaskHelper",
	"NetworkUtilities", "ConfigurationEnumsV2", "PageUtilities", "SystemOperationsPermissionsMixin"
], function(resources, RightUtilities, LookupUtilities, MaskHelper, NetworkUtilities) {

	/**
	 * Mixin, implements functionality of the quick add new records from lookup fields.
	 */
	Ext.define("Terrasoft.configuration.mixins.LookupQuickAddMixin", {
		alternateClassName: "Terrasoft.LookupQuickAddMixin",
		mixins: {
			SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
		},

		/**
		 * Template for customHtml item in a drop down list.
		 * @type {String}
		 */
		listItemCustomHtmlTpl: "<div data-value=\"{0}\" class=\"listview-new-item\">{1}</div>",

		_networkUtils: NetworkUtilities,

		/**
		 * Default messages for mixin. Contains CardModuleResponse for handling new record save response.
		 * @private
		 * @type {Object}
		 */
		_defaultMessages: {
			"CardModuleResponse": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
			},
			"GetLookupRelatedColumns": {
				"mode": this.Terrasoft.MessageMode.PTP,
				"direction": this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
			},
			"GetHistoryState": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			"PushHistoryState": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		/**
		 * Gets force creates record of schema names list.
		 * @protected
		 * @return {String[]} Allow create schema names list.
		 */
		getAllowQuickAddSchemas: function() {
			return ["City"];
		},

		/**
		 * ######### ######## ######## ####### ## ##### ######### ## ####### ############ #######,
		 * ### ### ### ##### ########## ## #######. ####., ### ####### Contact - ########## ### ######## ##
		 * ####### ### ########.
		 * @protected
		 * @return {Array} ######### ######## ########.
		 */
		getExcludedSchemaNamesForRequiredColumnsCheck: function() {
			return ["Contact"];
		},

		/**
		 * ######### ######## ######## ### ####### ##### ######### ######
		 * ### ######## ######## #### #### ## #### ######## #######.
		 * @protected
		 * @return {Array} ######### ######## ########.
		 */
		getForceAddSchemaNames: function() {
			return [];
		},

		/**
		 * ###### ######## ######## ### ####### ## ##### ########### #### "####### ..."
		 * @protected
		 * @return {Array} ######### ######## ########.
		 */
		getPreventQuickAddSchemaNames: function() {
			return ["SysAdminUnit", "VwSysSchemaInfo", "VwQueueSysProcess"];
		},

		/**
		 * ######### # ########## ###### ### lookup ####### "####### %#########_########%", ## ######
		 * #### ## #### ## ####### ####### ######.
		 * @overridden
		 * @param {Object} config:
		 * @param {String} filterValue ###### ### primaryDisplayColumn.
		 * @param {Terrasoft.Collection} list #########, # ####### ##### ######### ######.
		 * @param {String} columnName ### ####### ViewModel.
		 * @param {Boolean} isLookupEdit lookup ### combobox.
		 */
		onLookupDataLoaded: function(config) {
			var isComplicatedFiltersExists = false;
			var filters = this.getLookupQueryFilters(config.columnName);
			isComplicatedFiltersExists = this.checkIsComplicatedFiltersExists(filters);
			var cacheObject = {
				filters: filters,
				isComplicatedFiltersExists: isComplicatedFiltersExists
			};
			this.setValueToLookupInfoCache(config.columnName, "lookupFiltersInfo", cacheObject);
			var refSchemaName = this.getLookupEntitySchemaName({}, config.columnName);
			var preventSchemaNames = this.getPreventQuickAddSchemaNames();
			if (config.isLookupEdit && !Ext.isEmpty(config.filterValue) &&
				!isComplicatedFiltersExists && preventSchemaNames.indexOf(refSchemaName) === -1) {
				this.setValueToLookupInfoCache(config.columnName, "filterValue", config.filterValue);
				config.objects[Terrasoft.GUID_EMPTY] = this.getNewListItemConfig(config.filterValue);
			}
		},

		/**
		 * Registrate sandbox message CardModuleResponse with bidirectional direction. Uses for open card.
		 * @private
		 */
		_registerMessages: function() {
			this.sandbox.registerMessages(this._defaultMessages);
		},

		/**
		 * Initializes mixin.
		 * Must be called in the plug-in schema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Execution context.
		 */
		init: function(callback, scope) {
			RightUtilities.checkCanExecuteOperation({
				operation: "CanManageLookups"
			}, function(result) {
				this.canManageLookups = result;
				this._registerMessages();
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * ######### ######## ## ###### #######, ## #### ## ########## ######## ###### ####### #########
		 * ###### ########## ###### #### ######### ####### #######.
		 * ####### ###### ## ##### #### ## ######## ###### # ## ##### ######### ######### FilterGroup # ##########
		 * ########## ######## ## "#", ##### ### ####### ###### #### # ##### ######### "#####".
		 * @protected
		 * @param {Terrasoft.Collection} filters #######.
		 * @return {Boolean} #### ## ####### #######.
		 */
		checkIsComplicatedFiltersExists: function(filters) {
			var isComplicatedFiltersExists = false;
			var groupsCount = 0;
			if (!filters || filters.isEmpty()) {
				return isComplicatedFiltersExists;
			}
			filters.each(function(filter) {
				if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
					if (filter.logicalOperation !== Terrasoft.LogicalOperatorType.AND) {
						groupsCount++;
					}
					isComplicatedFiltersExists = isComplicatedFiltersExists ||
						this.checkIsComplicatedFiltersExists(filter);
				} else if (filter.comparisonType !== Terrasoft.ComparisonType.EQUAL) {
					isComplicatedFiltersExists = true;
				} else if (filter.comparisonType === Terrasoft.ComparisonType.EQUAL) {
					var columnPath = filter.leftExpression.columnPath || filter.rightExpression.columnPath;
					isComplicatedFiltersExists = isComplicatedFiltersExists || columnPath.indexOf(".") !== -1;
				}
			}, this);
			return (isComplicatedFiltersExists || groupsCount > 1);
		},

		/**
		 * Forms config object for new item in a list view, based on the typed text.
		 * @protected
		 * @param {String} value ######## ######## # ####.
		 */
		getNewListItemConfig: function(value) {
			var newValText = Ext.String.format(resources.localizableStrings.TipMessageTemplate, value);
			return {
				value: Terrasoft.GUID_EMPTY,
				displayValue: newValText,
				markerValue: Ext.String.format("{0} new", value),
				inputedValue: value,
				customHtml: this.Ext.String.format(this.listItemCustomHtmlTpl, Terrasoft.GUID_EMPTY, newValText)
			};
		},

		/**
		 * ########## ######## # lookupAdditionalInfoCache. lookupAdditionalInfoCache ######## ##############
		 * ########## ## ###### ####### ## ########## ####### # ######## ######## ######## # #######.
		 * @private
		 * @param {String} key ######## ####### ### ####.
		 * @param {String} propertyName ######## ########.
		 * @param {Object} propertyValue ######## ########.
		 */
		setValueToLookupInfoCache: function(key, propertyName, propertyValue) {
			if (!this.lookupAdditionalInfoCache) {
				this.lookupAdditionalInfoCache = {};
			}
			if (!this.lookupAdditionalInfoCache[key]) {
				this.lookupAdditionalInfoCache[key] = {};
			}
			this.lookupAdditionalInfoCache[key][propertyName] = propertyValue;
		},

		/**
		 * ######## ######## ## lookupAdditionalInfoCache.
		 * @private
		 * @param {String} key ######## ####### ### ####.
		 * @param {String} propertyName ### ####### ViewModel.
		 * @return {Object} ###### ## ##########:
		 * - success {Boolean} - ####### ## ######## ########.
		 * - value {Object} - ######## ########.
		 */
		tryGetValueFromLookupInfoCache: function(key, propertyName) {
			var resObj = {
				success: false,
				value: null
			};
			if (this.lookupAdditionalInfoCache && this.lookupAdditionalInfoCache[key]) {
				resObj.success = true;
				resObj.value = this.lookupAdditionalInfoCache[key][propertyName];
			}
			return resObj;
		},

		/**
		 * If has access rights creates entity record.
		 * @protected
		 * @param {String} searchValue Search text input.
		 * @param {String} columnName Column name.
		 */
		tryCreateEntityOrOpenCard: function(searchValue, columnName) {
			MaskHelper.ShowBodyMask();
			var refSchemaName = this.getLookupEntitySchemaName({}, columnName);
			var canAdd = this.tryGetValueFromLookupInfoCache(refSchemaName + "Schema", "canAdd");
			var lookupFiltersInfoCache = this.tryGetValueFromLookupInfoCache(columnName, "lookupFiltersInfo");
			var entityStructure = Terrasoft.configuration.EntityStructure[refSchemaName];
			var currentEntitySchema = this.tryGetValueFromLookupInfoCache(refSchemaName +
				"Schema", "entitySchema");
			var entitySchema = currentEntitySchema.success ? currentEntitySchema.value : {};
			if (!canAdd.success) {
				var checkCanAddCallback = function() {
					this.tryCreateEntityOrOpenCard(searchValue, columnName);
				};
				this.checkCanAddToLookupSchema(refSchemaName, checkCanAddCallback);
			} else if (this._getCanCreateEntityOrOpenCard(canAdd.value, refSchemaName)) {
				var lookupFiltersInfo = lookupFiltersInfoCache.value;
				var valuePairsFromFilters = this.extractValuePairsFromFilters(entitySchema, columnName,
					lookupFiltersInfo.filters);
				var isImplicitColumnsExists = this.isRequiredColumnsToFillExists(entitySchema, valuePairsFromFilters);
				var isLookupQueryFiltersNotEmpty = lookupFiltersInfo.isComplicatedFiltersExists;
				var forceAddSchemaNames = this.getForceAddSchemaNames();
				var isNotForceAddSchemaName = forceAddSchemaNames.indexOf(entitySchema.name) === -1;
				var createEntityConfig = {
					entitySchema: entitySchema,
					columnName: columnName,
					displayColumnValue: searchValue,
					valuePairsFromFilters: valuePairsFromFilters
				};
				var notUseSilentCreation = !Terrasoft.Features.getIsEnabled("UseSilentCreation")
					? false
					: isImplicitColumnsExists || (isLookupQueryFiltersNotEmpty && isNotForceAddSchemaName);
				if (notUseSilentCreation || !this.isSilentCreation()) {
					MaskHelper.HideBodyMask();
					this.validateColumn(columnName);
					if (entityStructure) {
						this.openPageForNewEntity(createEntityConfig);
					} else {
						this.set(columnName, null);
						this.showInformationDialog(this.getCantOpenPageMessage());
					}
				} else {
					this.createEntitySilently(createEntityConfig);
				}
			} else if (!this.canManageLookups) {
				this.set(columnName, null);
				this.showPermissionsErrorMessage("CanManageLookups");
			} else if (canAdd.success && !this.Ext.isEmpty(canAdd.value)) {
				MaskHelper.HideBodyMask();
				var message = Ext.String.format(canAdd.value, entitySchema.caption);
				this.set(columnName, null);
				this.showInformationDialog(message);
			}
		},

		/**
		 * Get can create entity or open card.
		 * @private
		 * @param {Object} canAdd:
		 * @param {Boolean} isSysModule Is system module.
		 * @param {String} canAdd Error messsage if not rights.
		 * @param {String} refSchemaName Reference schema name of need created record.
		 * @return {Boolean} True if has rights.
		 */
		_getCanCreateEntityOrOpenCard: function(canAdd, refSchemaName) {
			const allowSchemas = this.getAllowQuickAddSchemas();
			if (Ext.Array.contains(allowSchemas, refSchemaName)) {
				return true;
			}
			const isSysModuleOrNotCanAdd = !Ext.isEmpty(canAdd) && (canAdd.isSysModule || !Ext.isEmpty(canAdd.canAdd));
			return this.canManageLookups || isSysModuleOrNotCanAdd;
		},

		/**
		 * Is lookup silent creation.
		 * @protected
		 * @return {Boolean}
		 */
		isSilentCreation: function() {
			return Terrasoft.Features.getIsEnabled("UseSilentCreation");
		},

		/**
		 * Returns message for CantOpenPage event
		 * @protected
		 * @return {String} Message.
		 */
		getCantOpenPageMessage: function() {
			return resources.localizableStrings.CantOpenPage;
		},

		/**
		 * ######## ######## ### ########## ####### ## ######### ########## ########.
		 * @protected
		 * @param  {Object} entitySchema ###### ########### ####.
		 * @param  {String} columnName ######## ####### ###########.
		 * @param  {Terrasoft.Collection} lookupFilters ####### ########## ## #######.
		 * @param {Terrasoft.Collection} valuePairs ######### ######## ## ########## ### #######.
		 * @return {Terrasoft.Collection} ######### ######## ## ########## ### #######.
		 */
		extractValuePairsFromFilters: function(entitySchema, columnName, lookupFilters, valuePairs) {
			if (!valuePairs) {
				valuePairs = new Terrasoft.Collection();
			}
			lookupFilters.each(function(filter) {
				if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
					this.extractValuePairsFromFilters(entitySchema, columnName, filter, valuePairs);
				} else if (filter.comparisonType === Terrasoft.ComparisonType.EQUAL) {
					var columnPath = filter.leftExpression.columnPath || filter.rightExpression.columnPath;
					var leftParameterValue, rightParameterValue;
					if (filter.leftExpression.parameter) {
						leftParameterValue = filter.leftExpression.parameter.getValue();
					}
					if (filter.rightExpression.parameter) {
						rightParameterValue = filter.rightExpression.parameter.getValue();
					}
					var columnValue = rightParameterValue || leftParameterValue;
					if (entitySchema.columns[columnPath] && !valuePairs.contains(columnPath)) {
						valuePairs.add(columnPath, {columnPath: columnPath, columnValue: columnValue});
					}
				}
			}, this);
			return valuePairs;
		},

		/**
		 * ####### ###### # #######, ######## ####### ### ###########, ### ######## ########.
		 * @protected
		 * @param {Object} config ###### # ###########
		 * @param {String} config.entitySchema ###### ########### ####.
		 * @param {String} config.columnName ######## ####### # ####### ##### ########## ########### ########.
		 * @param {String} config.displayColumnValue ######## ####### ### ########### ##### ######.
		 * @param {String} config.valuePairsFromFilters ######## ## ######### ######## ####.
		 */
		createEntitySilently: function(config) {
			var primaryColumnValue = Terrasoft.generateGUID();
			config.primaryColumnValue = primaryColumnValue;
			var insert = this.getInsertQueryForLookupEntity(config);
			insert.execute(function(result) {
				MaskHelper.HideBodyMask();
				if (result.success) {
					var resultCollection = new Terrasoft.Collection();
					var resObj = {
						value: primaryColumnValue,
						displayValue: config.displayColumnValue
					};
					resultCollection.add(resObj);
					this.onLookupResult({columnName: config.columnName, selectedRows: resultCollection});
				} else if (result.errorInfo) {
					this.set(config.columnName, null);
					this.showInformationDialog(result.errorInfo.message);
				}
			}, this);
		},

		/**
		 * ######### ############# ## ###### ###########:
		 * - #### ##### ## ########## ######.
		 * - ## ###### ############### ######.
		 * - ########## ############### # ####### "###########" (#.#. ## #########).
		 * @private
		 * @param {String} schemaName ######## #######.
		 * @param {Function} callback ####### ######### ######.
		 */
		checkCanAddToLookupSchema: function(schemaName, callback) {
			Terrasoft.chain(
				function(next) {
					this.getLookupEntitySchemaByName(schemaName, next);
				},
				function(next, entitySchema) {
					this.setValueToLookupInfoCache(schemaName + "Schema", "entitySchema", entitySchema);
					next();
				},
				function(next) {
					this.checkRightsForObject(schemaName, next);
				},
				function(next, result) {
					this.checkRightsCallback(schemaName, result, callback, next);
				},
				function(next) {
					this.checkIsSysModule(schemaName, next);
				},
				function(next, isSysModule) {
					if (isSysModule) {
						this.setValueToLookupInfoCache(schemaName + "Schema", "canAdd", {
							"isSysModule": isSysModule,
							"canAdd": ""
						});
						next();
					} else {
						this.checkIsRegisteredLookup(schemaName, next);
					}
				},
				function() {
					callback.call(this);
				}, this);
		},

		/**
		 * ######### ######## ## ########## ################## ### ###.
		 * @protected
		 * @param {String} schemaName ######## #######.
		 * @param {Function} callback ####### ######### ######.
		 */
		checkIsRegisteredLookup: function(schemaName, callback, scope) {
			var currentEntitySchema = this.tryGetValueFromLookupInfoCache(schemaName +
				"Schema", "entitySchema");
			var entitySchema = currentEntitySchema.success ? currentEntitySchema.value : {};
			var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "Lookup"
			});
			select.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "IdCOUNT");
			select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"SysEntitySchemaUId", entitySchema.uId));
			select.getEntityCollection(function(response) {
				var messageTpl = "";
				if (response.success) {
					var selectResult = response.collection.getByIndex(0);
					var lookupCount = selectResult.get("IdCOUNT");
					if (lookupCount === 0) {
						messageTpl = resources.localizableStrings.NotSysModuleNeitherLookup;
					}
				} else if (response.errorInfo) {
					messageTpl = response.errorInfo.message;
				}
				this.setValueToLookupInfoCache(schemaName + "Schema", "canAdd", {"canAdd": messageTpl});
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * ######### #### ## # ####### ################## ######.
		 * @protected
		 * @param {String} schemaName ######## #######.
		 * @param {Function} callback ####### ######### ######.
		 */
		checkIsSysModule: function(schemaName, callback, scope) {
			var isSysModule = !this.Ext.isEmpty(Terrasoft.configuration.ModuleStructure[schemaName]);
			Ext.callback(callback, scope, [isSysModule]);
		},

		/**
		 * ####### ######### ###### ### ######## ####.
		 * @protected
		 * @param {String} schemaName ######## #######.
		 * @param {Object} result ######### ######## #### ## ######.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Function} next ####### ######### ###### ## #######.
		 */
		checkRightsCallback: function(schemaName, result, callback, next) {
			var hasRightToAdd = Ext.isEmpty(result);
			if (!hasRightToAdd) {
				var messageTpl = resources.localizableStrings.NoRightsToAdd;
				this.setValueToLookupInfoCache(schemaName + "Schema", "canAdd", messageTpl);
				callback.call(this);
			} else {
				next();
			}
		},

		/**
		 * ######### #### ## ##### ## ########## ##### ###### # ######.
		 * @protected
		 * @param {String} schemaName ######## #######.
		 * @param {Function} callback ####### ######### ######.
		 */
		checkRightsForObject: function(schemaName, callback) {
			const rightReqConfig = {
				schemaName: schemaName,
				primaryColumnValue: Terrasoft.GUID_EMPTY,
				isNew: true
			};
			RightUtilities.checkCanEdit(rightReqConfig, callback, this);
		},

		/**
		 * ####### ######### ######## # ####. #### ####### ######## ####### - ######## ####### ###### ###
		 * ######### ########.
		 * @public
		 * @param {Object} newValue ##### ########.
		 * @param {String} columnName ### ####.
		 */
		onLookupChange: function(newValue, columnName) {
			var filterValue = this.tryGetValueFromLookupInfoCache(columnName, "filterValue");
			if (newValue && !this.Ext.isEmpty(filterValue.value) && newValue.isNewValue) {
				this.setValueToLookupInfoCache(columnName, "filterValue", null);
				this.tryCreateEntityOrOpenCard(filterValue.value, columnName);
			} else if (newValue && newValue.value === Terrasoft.GUID_EMPTY && !this.get(columnName) &&
				filterValue.success && !Ext.isEmpty(filterValue.value)) {
				newValue.isNewValue = true;
				newValue.displayValue = filterValue.value;
				this.set(columnName, newValue);
			}
		},

		/**
		 * ####### # ########## InsertQuery ### ######## ########### #######.
		 * @protected
		 * @param {Object} config ###### # ###########.
		 * @param {Object} config.entitySchema ###### ########### ####.
		 * @param {Guid} config.primaryColumnValue ######## ######## #######.
		 * @param {String} config.displayColumnValue ######## ####### ### ###########.
		 * @param {Terrasoft.Collection} config.valuePairsFromFilters ######## ### ####### ## ######### ########.
		 * @return {Terrasoft.InsertQuery} ###### ## ########## ######## ########### #######.
		 */
		getInsertQueryForLookupEntity: function(config) {
			var entitySchema = config.entitySchema;
			var insertQuery = Ext.create("Terrasoft.InsertQuery", {
				rootSchemaName: entitySchema.name
			});
			if (config.valuePairsFromFilters) {
				config.valuePairsFromFilters.each(function(valuePair) {
					var dataType = entitySchema.columns[valuePair.columnPath].dataValueType;
					insertQuery.setParameterValue(valuePair.columnPath, valuePair.columnValue, dataType);
				});
			}
			insertQuery.setParameterValue(entitySchema.primaryColumnName, config.primaryColumnValue,
				this.Terrasoft.DataValueType.GUID);
			insertQuery.setParameterValue(entitySchema.primaryDisplayColumnName, config.displayColumnValue,
				this.Terrasoft.DataValueType.TEXT);
			return insertQuery;
		},

		/**
		 * ########## #### ## #######, ####### ############ ###### ######### ##### ####### ######.
		 * @private
		 * @param {Object} entitySchema ###### ########### ####.
		 * @param {Terrasoft.Collection} valuePairsFromFilters ######## ####### ##### ######### ## ######### ########.
		 * @return {Boolean} #### ## ####### ####### ########## ######### ### ######## #######.
		 */
		isRequiredColumnsToFillExists: function(entitySchema, valuePairsFromFilters) {
			var implicitColumnsExists = false;
			var excludeSchemas = this.getExcludedSchemaNamesForRequiredColumnsCheck();
			if (excludeSchemas.indexOf(entitySchema.name) !== -1) {
				return implicitColumnsExists;
			}
			for (var columnName in entitySchema.columns) {
				var column = entitySchema.columns[columnName];
				if (column.name === entitySchema.primaryDisplayColumnName) {
					continue;
				}
				if (column.isRequired && Ext.isEmpty(column.defaultValue) &&
					!valuePairsFromFilters.contains(columnName)) {
					implicitColumnsExists = true;
					break;
				}
			}
			return implicitColumnsExists;
		},

		/**
		 * Forms sandbox id for loading module.
		 * @private
		 * @param {Object} newEntityConfig Config object for creating new record of the lookup.
		 * @return {String} Sandbox id.
		 */
		_getOpenCardSandboxId: function(newEntityConfig) {
			var columnSchemaName = this.getLookupEntitySchemaName(newEntityConfig, newEntityConfig.columnName);
			var cardSchemaName = this.getCardSchemaName(columnSchemaName, newEntityConfig.columnName);
			return Ext.String.format("{0}_{1}", this.sandbox.id, cardSchemaName);
		},

		/**
		 * Returns an array with the default column values for the new record page.
		 * @private
		 * @param {Object} newEntityInfo Config object for creating new record of the lookup.
		 * @return {Array} Array with default values.
		 */
		_getNewEntityDefValues: function(newEntityInfo) {
			var defValues = [{
				name: newEntityInfo.entitySchema && newEntityInfo.entitySchema.primaryDisplayColumnName,
				value: newEntityInfo.displayColumnValue
			}];
			if (newEntityInfo && newEntityInfo.valuePairsFromFilters) {
				newEntityInfo.valuePairsFromFilters.each(function(valuePair) {
					defValues.push({
						name: valuePair.columnPath,
						value: valuePair.columnValue
					});
				});
			}
			return defValues;
		},

		/**
		 * Forms and returns configuration params for opening page.
		 * @private
		 * @param {Object} newEntityInfo Config object for creating new record of the lookup.
		 * @return {Object} Config object for open card.
		 */
		_getNewEntityPageConfig: function(newEntityInfo) {
			var defValues = this._getNewEntityDefValues(newEntityInfo);
			var openModuleId = this._getOpenCardSandboxId(newEntityInfo);
			var historyState = this.sandbox.publish("GetHistoryState");
			var cardConfig = {
				sandbox: this.sandbox,
				entitySchemaName: newEntityInfo.entitySchema.name,
				operation: Terrasoft.ConfigurationEnums.CardOperation.ADD,
				historyState: historyState,
				valuePairs: defValues,
				typeId: Terrasoft.GUID_EMPTY,
				moduleId: openModuleId
			};
			return cardConfig;
		},

		/**
		 * Return a new collection with the given object (obtained in CardModuleResponse) as it's single element.
		 * @private
		 * @param {Object} createdObj Created entity info.
		 * @return {Terrasoft.Collection} Collection with created entity info. Used for onLookupResult args.
		 */
		_getResponseRowsConfig: function(createdObj) {
			var rows = Ext.create("Terrasoft.Collection");
			const value = {
				Id: createdObj.primaryColumnValue,
				Name: createdObj.primaryDisplayColumnValue,
				displayValue: createdObj.primaryDisplayColumnValue,
				value: createdObj.primaryColumnValue
			};
			Ext.apply(value, createdObj.relatedColumns);
			rows.add(createdObj.primaryColumnValue, value);
			return rows;
		},

		/**
		 * Appends related columns values to moduleConfig.
		 * @param {Object} moduleConfig
		 * @param {Object} moduleConfig.relatedColumns
		 */
		appendRelatedLookupColumnsResponse: function(moduleConfig) {
			moduleConfig = moduleConfig || {};
			moduleConfig.relatedColumns = moduleConfig.relatedColumns || {};
			const relatedColumns = this.sandbox.publish("GetLookupRelatedColumns", null, [this.sandbox.id]);
			Terrasoft.each(relatedColumns, function(columnName) {
				moduleConfig.relatedColumns[columnName] = this.get(columnName)
			}, this);
		},

		/**
		 * Subscribes for CardModuleResponse message when opens card. It is needed for processing save response.
		 * @private
		 * @param {String} columnName Name of the column for opening page.
		 * @param {Object} config Configuration parameters for open page.
		 */
		_subscribeNewEntityCardModuleResponse: function(columnName, config) {
			this.sandbox.subscribe("CardModuleResponse", function(createdObj) {
				const rows = this._getResponseRowsConfig(createdObj);
				this.onLookupResult({
					columnName: columnName,
					selectedRows: rows
				});
			}, this, [config.moduleId]);
			this.sandbox.subscribe("GetLookupRelatedColumns", function() {
				return this.getLookupRelatedColumns(columnName);
			}, this, [config.moduleId]);
		},

		/**
		 * Gets lookup related columns.
		 * @protected
		 * @param {String} columnName Column name.
		 * @return {String[]} related columns.
		 */
		getLookupRelatedColumns: function(columnName) {
			const config = this.getLookupListConfig(columnName) || {};
			return config.columns;
		},

		/**
		 * Checks that entity has mini page add mode allowed.
		 * @private
		 * @param {String} entitySchemaName Name of the entity.
		 * @return {Boolean} True, if feature UseSilentCreation is turned off, and entity has add mini page.
		 */
		_needOpenMiniPage: function(entitySchemaName) {
			var entityStructure = this.getEntityStructure(entitySchemaName);
			if (!entityStructure) {
				return false;
			}
			var notUseSilentCreation = !Terrasoft.Features.getIsEnabled("UseSilentCreation");
			var editPages = entityStructure.pages;
			var page = Terrasoft.first(editPages);
			var hasAddMiniPage = page && page.hasAddMiniPage;
			return notUseSilentCreation && Boolean(hasAddMiniPage);
		},

		/**
		 * Open page or mini page for new entity record.
		 * @protected
		 * @param {Object} newEntityConfig Entity config.
		 * @param {Object} newEntityConfig.entitySchema Entity schema.
		 * @param {String} newEntityConfig.entitySchemaName Entity schema name.
		 * @param {String} newEntityConfig.columnName Column name.
		 * @param {String} newEntityConfig.displayColumnValue Display column value.
		 * @param {String} newEntityConfig.valuePairsFromFilters Default values that were sent from filters.
		 */
		openPageForNewEntity: function(newEntityConfig) {
			var cardConfig = this._getNewEntityPageConfig(newEntityConfig);
			this._subscribeNewEntityCardModuleResponse(newEntityConfig.columnName, cardConfig);
			if (this._needOpenMiniPage(cardConfig.entitySchemaName)) {
				this.openAddMiniPage.call(this, cardConfig);
			} else {
				this._networkUtils.openCardInChain(cardConfig);
			}
			this.set(newEntityConfig.columnName, null);
		},

		/**
		 * Returns information about the settings of the communication reference column.
		 * @protected
		 * @virtual
		 * @param {String} columnName The name of the communication column.
		 * @return {Object|null} Information about the settings of the communication reference column.
		 */
		getLookupListConfig: function(columnName) {
			var schemaColumn = this.getColumnByName(columnName);
			if (!schemaColumn) {
				return null;
			}
			var lookupListConfig = schemaColumn.lookupListConfig;
			if (!lookupListConfig) {
				return null;
			}
			var excludedProperty = ["filters", "filter"];
			var config = {};
			this.Terrasoft.each(lookupListConfig, function(property, propertyName) {
				if (excludedProperty.indexOf(propertyName) === -1) {
					config[propertyName] = property;
				}
			});
			return config;
		},

		/**
		 * Returns lookup page config.
		 * @protected
		 * @virtual
		 * @param {Object} args Parameters.
		 * @param {String} columnName Column name.
		 * @return {Object} Configuration for lookup page.
		 */
		getLookupPageConfig: function(args, columnName) {
			var config = {
				entitySchemaName: this.getLookupEntitySchemaName(args, columnName),
				multiSelect: false,
				columnName: columnName,
				columnValue: this.get(columnName),
				searchValue: args.searchValue,
				useRecordDeactivation: true,
				filters: this.getLookupQueryFilters(columnName)
			};
			this.Ext.apply(config, this.getLookupListConfig(columnName));
			var column = this.getColumnByName(columnName);
			var lookupConfig = (column && column.lookupConfig) || {};
			this.Ext.apply(config, lookupConfig);
			return config;
		},

		/**
		 * Returns entity schema name of the lookup column.
		 * @protected
		 * @virtual
		 * @param {Object} args Parameters.
		 * @param {String} columnName Name of the column.
		 * @return {String} Name of the entity.
		 */
		getLookupEntitySchemaName: function(args, columnName) {
			if (args.schemaName) {
				return args.schemaName;
			}
			var entityColumn = this.findEntityColumn(columnName) || this.getColumnByName(columnName);
			return entityColumn && entityColumn.referenceSchemaName;
		},

		/**
		 * Forms filters that are superimposed on the lookup fields.
		 * @protected
		 * @virtual
		 * @param {String} columnName Name of the column.
		 * @return {Terrasoft.FilterGroup} Returns a group of filters.
		 */
		getLookupQueryFilters: function(columnName) {
			var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
			var column = this.getColumnByName(columnName);
			var lookupListConfig = column.lookupListConfig;
			if (!lookupListConfig) {
				return filterGroup;
			}
			var filterArray = lookupListConfig.filters;
			this.Terrasoft.each(filterArray, function(item) {
				var method = Ext.isObject(item) ? item.method : item;
				var methodArgument = Ext.isObject(item) ? item.argument : null;
				var filter = (Ext.isFunction(method))
					? method.call(this, methodArgument)
					: null;
				if (Ext.isEmpty(filter)) {
					var errorMessageTemplate = resources.localizableStrings.ColumnFilterInvalidFormatException;
					throw new this.Terrasoft.InvalidFormatException({
						message: Ext.String.format(errorMessageTemplate, columnName)
					});
				}
				filterGroup.addItem(filter);
			}, this);
			var filterMethod = lookupListConfig.filter;
			var filterItem = filterMethod && filterMethod.call(this);
			if (filterItem) {
				filterGroup.addItem(filterItem);
			}
			return filterGroup;
		},

		/**
		 * Returns schema class of the entity by entity name.
		 * @protected
		 * @param {String} entitySchemaName Name of the entity.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution scope.
		 */
		getLookupEntitySchemaByName: function(entitySchemaName, callback, scope) {
			scope = scope || this;
			scope.sandbox.requireModuleDescriptors(["force!" + entitySchemaName], function() {
				Terrasoft.require([entitySchemaName], callback, scope);
			}, scope);
		}

	});

	return Terrasoft.LookupQuickAddMixin;
});


