Terrasoft.configuration.Structures["ContactSearchDetailGridRowViewModel"] = {innerHierarchyStack: ["ContactSearchDetailGridRowViewModel"]};
define("ContactSearchDetailGridRowViewModel", ["ContactSearchDetailGridRowViewModelResources", "BaseGridRowViewModel"],
		function(resources) {

	Ext.define("Terrasoft.configuration.ContactSearchDetailGridRowViewModel", {
		extend: "Terrasoft.BaseGridRowViewModel",
		alternateClassName: "Terrasoft.ContactSearchDetailGridRowViewModel",

		/**
		 * ############## #######.
		 * @overridden
		 * @inheritdoc Terrasoft.configuration.BaseGridRowViewModel#initResources
		 */
		initResources: function() {
			this.callParent(arguments);
			var strings = resources.localizableStrings;
			if (this.get("CaseVisibility")) {
				this.set("SelectButtonCaption", strings.SelectConsultationButtonCaption);
			} else if (!this.get("SelectButtonCaption")) {
				this.set("SelectButtonCaption", strings.SelectCaseButtonCaption);
			}
		}
	});

	return this.Terrasoft.ContactSearchDetailGridRowViewModel;
});


