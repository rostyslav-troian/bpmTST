Terrasoft.configuration.Structures["BaseGridRowViewModel"] = {innerHierarchyStack: ["BaseGridRowViewModel"]};
define("BaseGridRowViewModel", ["EmailHelper", "terrasoft", "MiniPageUtilities"], function(EmailHelper, Terrasoft) {

	/**
	 * @class Terrasoft.configuration.BaseGridRowViewModel
	 */
	Ext.define("Terrasoft.configuration.BaseGridRowViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.BaseGridRowViewModel",

		"mixins": {
			/**
			 * @class MiniPageUtilities
			 */
			"MiniPageUtilitiesMixin": "Terrasoft.MiniPageUtilities"
		},

		/**
		 * ######### ####### ###### ########## ##### #####
		 * @overridden
		 */
		getEntitySchemaQuery: function() {
			var entitySchemaQuery = this.callParent(arguments);
			this.addProcessEntryPointColumn(entitySchemaQuery);
			return entitySchemaQuery;
		},

		/**
		 *
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResources();
		},

		/**
		 * ############## ######.
		 * @param {Array} strings #######
		 * @protected
		 */
		initResources: function(strings) {
			strings = strings || {};
			Terrasoft.each(strings, function(value, key) {
				this.set("Resources.Strings." + key, value);
			}, this);
		},

		/**
		 * ######### #########, ####### ######### ########## ######## ##### ##### ## ########
		 * @param esq
		 */
		addProcessEntryPointColumn: function(esq) {
			var itemConfig = {
				columnPath: "[EntryPoint:EntityId].Id",
				parentCollection: this,
				aggregationType: Terrasoft.AggregationType.COUNT
			};
			var column = Ext.create("Terrasoft.SubQueryExpression", itemConfig);
			var filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "IsActive", true);
			column.subFilters.addItem(filter);
			var esqColumn = esq.addColumn("EntryPointsCount");
			esqColumn.expression = column;
		},

		/**
		 * Return entity column link config for grid by value.
		 * @param {Terrasoft.EntitySchemaColumn} column Entity column.
		 */
		getLinkColumnConfig: function(column) {
			var value = this.get(column.columnPath);
			var config = {
				title: value,
				caption: value,
				target: "_blank"
			};
			if (EmailHelper.isEmailAddress(value)) {
				config.target = "_self";
				config.url = EmailHelper.getEmailUrl(value);
				return config;
			}
			var valueUrls = Terrasoft.getUrls(value);
			var hasCustomUrls = valueUrls.length > 0;
			if (Terrasoft.isUrl(value) || hasCustomUrls) {
				config.url = value;
				config.customUrlsExists = hasCustomUrls;
				config.customUrls = valueUrls;
				return config;
			}
			return null;
		},

		/**
		 * Returns row cell hint config by column.
		 * @returns {Object} Row cell hint config by column.
		 */
		getRowCellsHintConfig: function() {
			var hintConfig = {};
			Terrasoft.each(this.columns, function(column, columnName) {
				var type = this.getColumnDataType(columnName);
				if (!this._isNeedColumnHint(column, columnName, type)) {
					return;
				}
				var columnHintValue = this.get(columnName);
				if (!Ext.isEmpty(columnHintValue)) {
					var precision = Ext.isEmpty(column) ? null : column.precision;
					hintConfig[columnName] = Terrasoft.getTypedStringValue(columnHintValue, type,
						{decimalPrecision: precision});
				}
			}, this);
			return hintConfig;
		},

		/**
		 * Returns need hint value tag.
		 * @private
		 * @param {Object} column Column configuration.
		 * @param {String} columnName Column name.
		 * @param {Terrasoft.DataValueType} type Data value type.
		 * @returns {boolean}
		 */
		_isNeedColumnHint: function(column, columnName, type) {
			if (type === Terrasoft.DataValueType.IMAGELOOKUP || type === Terrasoft.DataValueType.IMAGE) {
				return false;
			}
			var isPrimaryColumn = Boolean(columnName === this.primaryDisplayColumnName && this.entitySchema);
			var isLookupColumn = column && column.isLookup;
			var checkMiniPage = isPrimaryColumn || isLookupColumn;
			if (checkMiniPage) {
				var miniPageEntityName = isPrimaryColumn ? this.entitySchema.name : column.referenceSchemaName;
				return !this.hasMiniPage(miniPageEntityName);
			}
			return true;
		}
	});

	return Terrasoft.BaseGridRowViewModel;
});


