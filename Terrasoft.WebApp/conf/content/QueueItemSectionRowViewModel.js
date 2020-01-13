Terrasoft.configuration.Structures["QueueItemSectionRowViewModel"] = {innerHierarchyStack: ["QueueItemSectionRowViewModel"]};
define("QueueItemSectionRowViewModel", ["BaseSectionGridRowViewModel"], function() {

	/**
	 * View class model - Queue items section list string
	 * @class Terrasoft.configuration.QueueItemSectionRowViewModel
	 */
	Ext.define("Terrasoft.configuration.QueueItemSectionRowViewModel", {
		extend: "Terrasoft.configuration.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.QueueItemSectionRowViewModel",

		//region Methods: Protected

		/**
		 * Returns "Take it" button visibility.
		 * @protected
		 */
		getRunProcessButtonVisible: function() {
			return !this.get("Status.IsFinal");
		}

		//endregion

	});
	return Terrasoft.QueueItemSectionRowViewModel;
});


