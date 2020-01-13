Terrasoft.configuration.Structures["ProjectGridRowViewModel"] = {innerHierarchyStack: ["ProjectGridRowViewModel"]};
define("ProjectGridRowViewModel", ["ProjectGridRowViewModelResources", "BaseSectionGridRowViewModel"],
	function(resources) {

	/**
	 * @class Terrasoft.configuration.ProjectGridRowViewModel
	 */
	Ext.define("Terrasoft.configuration.ProjectGridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.ProjectGridRowViewModel",

		/**
		 * ############## ####### #######
		 * @protected
		 * @overridden
		 */
		initResources: function() {
			this.callParent(arguments);
			Terrasoft.each(resources.localizableStrings, function(item, key) {
				this.set("Resources.Strings." + key, item);
			}, this);
		}
	});

	return Terrasoft.BaseGridRowViewModel;
});


