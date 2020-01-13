Terrasoft.configuration.Structures["BaseEnrichmentViewModel"] = {innerHierarchyStack: ["BaseEnrichmentViewModel"]};
define("BaseEnrichmentViewModel", [], function() {
	Ext.define("Terrasoft.configuration.BaseEnrichmentViewModel", {
		alternateClassName: "Terrasoft.BaseEnrichmentViewModel",
		extend: "Terrasoft.BaseViewModel",
		Ext: null,
		Terrasoft: null,
		sandbox: null,

		/**
		 * @inheritdoc Terrasoft.BaseModel#columns
		 * @overridden
		 */
		columns: {
			"IsChecked": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseModel#setInitialValue
		 * @overridden
		 */
		setInitialValue: function() {
			this.callParent(arguments);
			this.set("IsChecked", true);
		},

		/**
		 * On enriched link click.
		 * @protected
		 * @virtual
		 */
		onLinkClick: function() {
			return false;
		},

		/**
		 * Returns is item value is link.
		 * @protected
		 * @virtual
		 * @return {Object} True, if data is linkable.
		 */
		getIsLinkData: function() {
			return false;
		},

		/**
		 * Returns link config.
		 * @protected
		 * @virtual
		 * @return {Object} Enriched data link config.
		 */
		getHref: function() {
			return null;
		},

		/**
		 * Returns marker value.
		 * @protected
		 * @virtual
		 * @return {String} Enriched data marker value.
		 */
		getMarkerValue: function() {
			return this.get("CategoryTag");
		}
	});
});


