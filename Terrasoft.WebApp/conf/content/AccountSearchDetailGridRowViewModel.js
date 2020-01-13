Terrasoft.configuration.Structures["AccountSearchDetailGridRowViewModel"] = {innerHierarchyStack: ["AccountSearchDetailGridRowViewModel"]};
define("AccountSearchDetailGridRowViewModel", ["AccountSearchDetailGridRowViewModelResources", "BaseGridRowViewModel"],
		function(resources) {

			Ext.define("Terrasoft.configuration.AccountSearchDetailGridRowViewModel", {
				extend: "Terrasoft.BaseGridRowViewModel",
				alternateClassName: "Terrasoft.AccountSearchDetailGridRowViewModel",
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

			return this.Terrasoft.AccountSearchDetailGridRowViewModel;
		});


