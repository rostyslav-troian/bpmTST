Terrasoft.configuration.Structures["EntityConnectionViewModel"] = {innerHierarchyStack: ["EntityConnectionViewModel"]};
define("EntityConnectionViewModel", [
	"LookupUtilities",
	"NetworkUtilities",
	"TooltipUtilities",
	"EntityConnectionViewModelResources",
	"BaseSchemaViewModel",
	"EmailLinksMixin"
], function(LookupUtilities, NetworkUtilities) {
	var EntityConnectionViewModelConstructor = Ext.define("Terrasoft.configuration.EntityConnectionViewModel", {
		alternateClassName: "Terrasoft.EntityConnectionViewModel",
		extend: "Terrasoft.BaseSchemaViewModel",
		Ext: null,
		Terrasoft: null,
		sandbox: null,
		columns: {
			Value: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true
			},
			ReferenceSchema: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			Caption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			ColumnName: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			ItemViewConfig: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			ValuesList: {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			DataValueType: {
				dataValueType: Terrasoft.DataValueType.INTEGER
			}
		},

		mixins: {
			TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities",
			emailLinksMixin: "Terrasoft.EmailLinksMixin"
		},
		/**
		 * Subscribes for "Value" field change.
		 * inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.on("change:Value", this.onValueChanged, this);
		},

		/**
		 * Handles "Value" field change. Method synchronises value with card page.
		 * @private
		 * @param {Object} model Model with changed field.
		 * @param {Object} value New field value
		 */
		onValueChanged: function(model, value) {
			var sandbox = this.sandbox;
			var columnName = this.get("ColumnName");
			sandbox.publish("UpdateCardProperty", {
				key: columnName,
				value: value
			}, [sandbox.id]);
		},

		/**
		 * Returns settings of the lookup selection page.
		 * @protected
		 * @param {Object} args Parameters.
		 * @return {Object} Settings of the lookup selection page.
		 */
		getLookupPageConfig: function(args) {
			var referenceSchema = this.get("ReferenceSchema");
			var columnName = this.get("ColumnName");
			var columnValue = this.get("Value");
			var config = {
				entitySchemaName: referenceSchema.name,
				multiSelect: false,
				columnName: columnName,
				columnValue: columnValue,
				searchValue: args.searchValue,
				filters: this.getLookupQueryFilters(columnName)
			};
			var lookupListConfig = this.getLookupListConfig(columnName);
			this.Ext.apply(config, lookupListConfig);
			var defValues = this.getLookupValuePairs(columnName);
			if (defValues) {
				var valuePairs = config.valuePairs || [];
				config.valuePairs = this.Ext.Array.merge(valuePairs, defValues);
			}
			return config;
		},

		/**
		 * Handles value select event in lookup page. Sets values to ViewModel.
		 * @param {Object} lookupPageResult Result of select in lookup window.
		 */
		onLookupResult: function(lookupPageResult) {
			var selectedRows = lookupPageResult.selectedRows;
			if (selectedRows.getCount() > 0) {
				var selectedValue = selectedRows.getByIndex(0);
				this.set("Value", selectedValue);
			}
		},

		/**
		 * Gets link for card of the object.
		 * @return {Object} Link for card of the object.
		 */
		getHref: function() {
			var columnValue = this.get("Value");
			var referenceSchema = this.get("ReferenceSchema");
			if (!referenceSchema) {
				return {};
			}
			var entitySchemaConfig = this.Terrasoft.configuration.ModuleStructure[referenceSchema.name];
			if (columnValue && entitySchemaConfig) {
				var typeAttr = NetworkUtilities.getTypeColumn(referenceSchema.name);
				var typeUId;
				if (typeAttr && columnValue[typeAttr.path]) {
					typeUId = columnValue[typeAttr.path].value;
				}
				var url = NetworkUtilities.getEntityUrl(referenceSchema.name, columnValue.value, typeUId);
				return {
					url: "ViewModule.aspx#" + url,
					caption: columnValue.displayValue
				};
			}
			return {};
		},

		/**
		 * Handles a click on a link in the control element.
		 * @return {Boolean} The sign, is the link click handler needs to be cancelled.
		 */
		onLinkClick: function() {
			var columnValue = this.get("Value");
			if (!columnValue) {
				return true;
			}
			var referenceSchema = this.get("ReferenceSchema");
			var typeAttr = NetworkUtilities.getTypeColumn(referenceSchema.name);
			var typeId = null;
			if (typeAttr && columnValue[typeAttr.path]) {
				typeId = columnValue[typeAttr.path].value;
			}
			var historyState = this.sandbox.publish("GetHistoryState");
			var config = {
				sandbox: this.sandbox,
				entitySchemaName: referenceSchema.name,
				primaryColumnValue: columnValue.value,
				historyState: historyState,
				typeId: typeId
			};
			NetworkUtilities.openCardInChain(config);
			return false;
		},

		/**
		 * inheritdoc Terrasoft.BaseViewModel#getLookupQuery
		 * ### ######### ##### #####-###########, ###### ######## #######, ############ ###############
		 * ######## ####### ###### #############.
		 * @overridden
		 */
		getLookupQuery: function(filterValue, columnName) {
			var column = this.getColumnByName(columnName);
			if (!column) {
				throw new this.Terrasoft.ItemNotFoundException();
			}
			var isLookup = (this.Terrasoft.isLookupDataValueType(column.dataValueType) || column.isLookup);
			if (!isLookup) {
				throw new this.Terrasoft.UnsupportedTypeException({
					message: this.Terrasoft.Resources.BaseViewModel.columnUnsupportedTypeException
				});
			}
			var referenceSchema = this.get("ReferenceSchema");
			var referenceSchemaName = referenceSchema.name;
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: referenceSchemaName,
				rowCount: isLookup ? this.Terrasoft.SysSettings.lookupRowCount : -1,
				isPageable: true
			});
			esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "value");
			var primaryDisplayColumn =
					esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
			primaryDisplayColumn.orderPosition = 1;
			primaryDisplayColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
			var lookupListConfig = this.getLookupListConfig(this.get("ColumnName"));
			if (lookupListConfig) {
				this.Terrasoft.each(lookupListConfig.columns, function(column) {
					if (!esq.columns.contains(column)) {
						esq.addColumn(column);
					}
				}, this);
			}
			var lookupComparisonType = this.getLookupComparisonType();
			var lookupFilter = esq.createPrimaryDisplayColumnFilterWithParameter(
				lookupComparisonType, filterValue, this.Terrasoft.DataValueType.TEXT);
			esq.filters.add("LookupFilter", lookupFilter);
			lookupFilter.isEnabled = Boolean(filterValue);
			var lookupQueryFilters = this.getLookupQueryFilters(this.get("ColumnName"));
			if (lookupQueryFilters) {
				esq.filters.addItem(lookupQueryFilters);
			}
			var pagingParams = this.pagingParams;
			if (pagingParams) {
				this.addPagingParameters(esq, pagingParams);
				pagingParams = null;
			}
			return esq;
		},

		/**
		 * Returns lookup column filters.
		 * @param {String} columnName Column name.
		 * @return {Terrasoft.FilterGroup} Lookup column filters.
		 */
		getLookupQueryFilters: function(columnName) {
			columnName = this.get("ColumnName");
			return this.sandbox.publish("GetLookupQueryFilters", columnName, [this.sandbox.id]);
		},

		/**
		 * Returns information about lookup column settings.
		 * @private
		 * @param {String} columnName Column name.
		 * @return {Object|null} Information about lookup column settings.
		 */
		getLookupListConfig: function(columnName) {
			return this.sandbox.publish("GetLookupListConfig", columnName, [this.sandbox.id]);
		},

		/**
		 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupRelatedColumns
		 * @override
		 */
		getLookupRelatedColumns: function() {
			return this.mixins.LookupQuickAddMixin.getLookupRelatedColumns.call(this, this.get("ColumnName"));
		},

		/**
		 * ########## ########## # ######### ## #########, ############ # ##### ###### ########## #######.
		 * @private
		 * @param {String} columnName ######## #######.
		 * @return {Object|null} ########## # ######### ## ######### ########## #######.
		 */
		getLookupValuePairs: function(columnName) {
			return this.sandbox.publish("GetLookupValuePairs", columnName, [this.sandbox.id]);
		},

		/**
		 * ######### # ########## ###### ### lookup ####### "####### %#########_########%"
		 * @overriden
		 * @param {Object} config
		 * @param {Terrasoft.Collection} config.collection ######### ######## ### ######### ###########.
		 * @param {String} config.filterValue ###### ### primaryDisplayColumn.
		 * @param {Object} config.objects ####### ####### ##### ######## # list.
		 * @param {String} config.columnName ### ####### ViewModel.
		 * @param {Boolean} config.isLookupEdit lookup ### combobox.
		 */
		onLookupDataLoaded: function(config) {
			this.callParent(arguments);
			this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
		},

		/**
		 * ####### ######### ######## # ####. #### ####### ######## ####### - ######## ####### ###### ###
		 * ######### ########.
		 * @param {Object} newValue ##### ########.
		 */
		onLookupChange: function(newValue) {
			this.mixins.LookupQuickAddMixin.onLookupChange.call(this, newValue, "Value");
		},

		/**
		 * ########## ######## ##### ####### ########### ####.
		 * @protected
		 * @return {String} ######## ##### ########### ####.
		 */
		getLookupEntitySchemaName: function() {
			return this.get("ReferenceSchema").name;
		},

		/**
		 * Opens selection page of the lookup or tries to add a record.
		 * @protected
		 * @param {Object} args Parameters.
		 */
		loadVocabulary: function(args) {
			var config = this.getLookupPageConfig(args);
			LookupUtilities.Open(this.sandbox, config, this.onLookupResult, this, null, false, false);
		}

	});
	return EntityConnectionViewModelConstructor;
});


