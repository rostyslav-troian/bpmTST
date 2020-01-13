Terrasoft.configuration.Structures["ProcessLookupMappingModule"] = {innerHierarchyStack: ["ProcessLookupMappingModule"]};
define("ProcessLookupMappingModule", ["ext-base", "LookupPage"], function() {
	/**
	 * @class Terrasoft.configuration.ProcessLookupMappingModule
	 */
	Ext.define("Terrasoft.configuration.ProcessLookupMappingModule", {
		extend: "Terrasoft.LookupPage",
		alternateClassName: "Terrasoft.ProcessLookupMappingModule",

		/**
		 * @inheritdoc Terrasoft.LookupPage#getSchemaAndProfile
		 * @overridden
		 */
		//TODO #CRM-19338
		getSchemaAndProfile: function(lookupPostfix, callback) {
			this.callParent([lookupPostfix, function(entitySchema, fixedProfile) {
				if (!entitySchema.primaryDisplayColumn) {
					entitySchema.primaryDisplayColumn = entitySchema.primaryColumn;
					entitySchema.primaryDisplayColumnName = entitySchema.primaryColumnName;
				}
				callback.call(this, entitySchema, fixedProfile);
			}.bind(this)]);
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.sandbox.registerMessages({
				"ResultActiveRow": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			});
		},

		/**
		 * @inheritdoc Terrasoft.LookupPage#generateViewModel
		 * @overridden
		 */
		generateViewModel: function() {
			var viewModel = this.callParent(arguments);
			viewModel.on("change:activeRow", function(model, activeRowId) {
				if (!activeRowId) {
					return;
				}
				var item = viewModel.get("gridData").get(activeRowId);
				var values = item.values;
				values.value = values[item.primaryColumnName];
				values.displayValue = values[item.primaryDisplayColumnName];
				var result = new Terrasoft.Collection();
				result.collection.add(activeRowId, values);
				this.sandbox.publish("ResultActiveRow", {selectedRows: result}, [this.sandbox.id]);
			}, this);
			viewModel.setSearchEditFocused = Terrasoft.emptyFn;
			return viewModel;
		}
	});
	return Terrasoft.ProcessLookupMappingModule;
});


