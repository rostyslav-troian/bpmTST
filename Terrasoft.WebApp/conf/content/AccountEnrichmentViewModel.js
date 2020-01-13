Terrasoft.configuration.Structures["AccountEnrichmentViewModel"] = {innerHierarchyStack: ["AccountEnrichmentViewModel"], structureParent: "BaseEnrichmentViewModel"};
define("AccountEnrichmentViewModel", ["BaseEnrichmentViewModel"], function() {
	Ext.define("Terrasoft.configuration.AccountEnrichmentViewModel", {
		alternateClassName: "Terrasoft.AccountEnrichmentViewModel",
		extend: "Terrasoft.configuration.BaseEnrichmentViewModel",

		/**
		 * Array of enriched data types without links.
		 * @protected
		 * @type {String[]}
		 */
		notLinkDataTags: ["phone", "email"],

		/**
		 * @inheritdoc Terrasoft.BaseEnrichmentViewModel#onLinkClick.
		 * @protected
		 * @overridden
		 */
		onLinkClick: function(path) {
			window.open(path);
			return false;
		},

		/**
		 * @inheritdoc Terrasoft.BaseEnrichmentViewModel#getIsLinkData.
		 * @protected
		 * @overridden
		 */
		getIsLinkData: function() {
			var notLinkDataTags = this.notLinkDataTags;
			var itemCategory = this.get("CategoryTag");
			return !Ext.Array.contains(notLinkDataTags, itemCategory);
		},

		/**
		 * @inheritdoc Terrasoft.BaseEnrichmentViewModel#getHref.
		 * @protected
		 * @overridden
		 */
		getHref: function() {
			var value = this.get("Value");
			return {
				url: value,
				caption: value
			};
		}
	});
});


