Terrasoft.configuration.Structures["BaseClickHeatmapRowViewModel"] = {innerHierarchyStack: ["BaseClickHeatmapRowViewModel"]};
define("BaseClickHeatmapRowViewModel", ["BaseClickHeatmapRowViewModelResources"], function(resources) {
	/**
	 * @class Terrasoft.configuration.BaseClickHeatmapRowViewModel
	 */
	Ext.define("Terrasoft.configuration.BaseClickHeatmapRowViewModel", {
		extend: "Terrasoft.BaseModel",
		alternateClassName: "Terrasoft.BaseClickHeatmapRowViewModel",

		// region Fields: Protected

		/**
		 * Replica recipient info text template.
		 * @protected
		 * @type {String}
		 */
		replicaRecipientInfoTextTemplate: resources.localizableStrings.replicaRecipientInfoTextTemplate,

		// endregion

		// region Methods: Public

		/**
		 * Returns replica recipient info text.
		 * @return {String}
		 */
		getReplicaRecipientInfoText: function() {
			return Ext.String.format(this.replicaRecipientInfoTextTemplate, this.get("RecipientCount"),
				this.get("ReplicaPercent"));
		}

		// endregion
	});
	return Terrasoft.BaseClickHeatmapRowViewModel;
});


