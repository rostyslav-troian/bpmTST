Terrasoft.configuration.Structures["RecipientsSearchLookupEdit"] = {innerHierarchyStack: ["RecipientsSearchLookupEdit"]};
define("RecipientsSearchLookupEdit", ["terrasoft", "ext-base", "ContainerList", "SchemaBuilderV2"],
		function(Terrasoft, Ext) {
	/**
	 * Control for working with lookups.
	 */
	Ext.define("Terrasoft.controls.RecipientsSearchLookupEdit", {
		extend: "Terrasoft.controls.LookupEdit",
		alternateClassName: "Terrasoft.RecipientsSearchLookupEdit",
		/**
		 * Lookup minimum search chars count.
		 * @private
		 * @type {Integer}
		 */
		_minSearchCharsCount: -1,

		/**
		 * inheritdoc Terrasoft.Component#init
		 * Overridden minSearchCharsCount value.
		 * @overridden
		 */
		init: function() {
			this.callParent(arguments);
			this.minSearchCharsCount = this._minSearchCharsCount;
		},

		/**
		 * @inheritdoc Terrasoft.controls.mixins.ExpandableList#expandList
		 * Search value definition.
		 * @protected
		 * @overridden
		 */
		expandList: function(searchValue) {
			searchValue = searchValue || this.typedValue || this.getTypedValue() || "";
			this.mixins.expandableList.expandList.call(this, searchValue);
		}
	});
});

