Terrasoft.configuration.Structures["UntranslatedFilterViewModel"] = {innerHierarchyStack: ["UntranslatedFilterViewModel"]};
define("UntranslatedFilterViewModel", ["ext-base", "terrasoft", "PredefinedFilterViewModel"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.model.UntranslatedFilter", {
		extend: "Terrasoft.PredefinedFilter",
		alternateClassName: "Terrasoft.UntranslatedFilter",

		//region Fields: Private

		/**
		 * Primary column path.
		 * @type {String}
		 */
		primaryColumnPath: "",

		//endregion

		// region Constructors: Public

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			if (!this.primaryColumnPath) {
				throw new Terrasoft.NullOrEmptyException();
			}
		},

		//endregion

		//region Methods: Private

		/**
		 * Creates primary culture compare filter.
		 * @private
		 * @param {String} columnPath Column path.
		 * @return {Terrasoft.CompareFilter}
		 */
		createPrimaryCultureCompareFilter: function(columnPath) {
			var leftExpression = this.Ext.create("Terrasoft.ColumnExpression", {
				columnPath: this.primaryColumnPath
			});
			var rightExpression = this.Ext.create("Terrasoft.ColumnExpression", {
				columnPath: columnPath
			});
			return this.Terrasoft.createCompareFilter(Terrasoft.ComparisonType.EQUAL, leftExpression, rightExpression);
		},

		//endregion

		//region Methods: Protected

		/**
		 * Adds filter.
		 * @protected
		 * @param {String} columnPath Column path.
		 */
		addFilter: function(columnPath) {
			var rootFilterGroup = this.getFilters();
			rootFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			var subFilterGroup = this.Terrasoft.createFilterGroup();
			subFilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			rootFilterGroup.add(columnPath, subFilterGroup);
			var predefinedFilter = this.createFilter(columnPath);
			subFilterGroup.addItem(predefinedFilter);
			if (columnPath === this.primaryColumnPath) {
				this.Terrasoft.each(this.columns, function(column) {
					if (column.columnPath === this.primaryColumnPath) {
						return;
					}
					subFilterGroup.addItem(this.createPrimaryCultureCompareFilter(column.columnPath));
				}, this);
			} else {
				subFilterGroup.addItem(this.createPrimaryCultureCompareFilter(columnPath));
			}
		}

		//endregion
	});
});



