Terrasoft.configuration.Structures["ProcessDesignerFilterEditFilter"] = {innerHierarchyStack: ["ProcessDesignerFilterEditFilter"]};
define("ProcessDesignerFilterEditFilter", [], function () {
	/**
	 * Class for item of filter edit control for Process designer.
	 */
	Ext.define("Terrasoft.controls.ProcessFilterEditFilter", {
		extend: "Terrasoft.FilterEdit.Filter",
		alternateClassName: "Terrasoft.ProcessDesignerFilterEditFilter",

		/**
		 * @inheritdoc Terrasoft.FilterEdit.Filter#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
		},

		/**
		 * Returns menu item for process parameter right expression menu.
		 * @private
		 * @return {Object} Menu item config.
		 */
		applyMenuItems: function(menuItems) {
			menuItems.unshift({
				caption: this.translate.SELECT_PARAMETER,
				handler: function() {
					var config = {
						filter: this.instance
					};
					this.filterEdit.fireEvent("prepareMappingParametersList", config,
						this.onProcessParameterSelected.bind(this, this.instance));
				}.bind(this)
			});
		},

		/**
		 * Handles callback after process parameter selected for right expression.
		 * @private
		 * @param {Terrasoft.data.filters.BaseFilter} filter Current filter.
		 * @param {Object} sourceValue Process schema parameter source value for filter right expression.
		 * @param {String} sourceValue.value Parameter source value.
		 * @param {String} sourceValue.displayValue Parameter source display value.
		 */
		onProcessParameterSelected: function(filter, sourceValue) {
			if (filter.filterType === Terrasoft.FilterType.IN) {
				sourceValue.Id = sourceValue.id || Terrasoft.generateGUID();
				this.filterManager.setRightExpressionsValues(filter, [sourceValue], Terrasoft.DataValueType.MAPPING);
				return;
			}
			this.filterManager.setRightExpressionValue(filter, sourceValue, null, Terrasoft.DataValueType.MAPPING);
		},

		getIsRightExpressionMenuAllowed: function() {
			return true;
		}
	});
});


