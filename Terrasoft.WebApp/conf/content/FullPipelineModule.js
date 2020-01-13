Terrasoft.configuration.Structures["FullPipelineModule"] = {innerHierarchyStack: ["FullPipelineModule"]};
define("FullPipelineModule", ["ext-base", "LabelDateEdit", "FullPipelineViewConfig",
	"DashboardFunnelEnums", "ChartModule", "ChartSchemaModule"], function(Ext) {

	Ext.define("Terrasoft.configuration.FullPipelineModule", {
		extend: "Terrasoft.ChartSchemaModule",
		alternateClassName: "Terrasoft.FullPipelineModule",

		/**
		 * @inheritDoc Terrasoft.ChartSchemaModule#schemaName
		 * @overridden
		 */
		schemaName: "FullPipelineChartSchema",

		/**
		 * Returns model messages. If messages property is null, returns empty object.
		 * @virtual
		 * @protected
		 * @return {Object} Messages columns.
		 */
		getModuleMessages: function() {
			var baseMessages = this.callParent(arguments);
			return this.Ext.apply(baseMessages, {
				/**
				 * @message GetSectionFilterModuleId
				 * For subscription on UpdateFilter
				 */
				"GetSectionFilterModuleId": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message RefreshFullPipelineWidget
				 * Refresh widget on designer demand.
				 */
				"RefreshFullPipelineWidget": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			});
		}
	});

	return Terrasoft.FullPipelineModule;
});


