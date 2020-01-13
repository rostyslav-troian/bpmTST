Terrasoft.configuration.Structures["ActivityBusinessRulesMixin"] = {innerHierarchyStack: ["ActivityBusinessRulesMixin"]};
define("ActivityBusinessRulesMixin", ["ext-base"], function(Ext) {
	Ext.define("Terrasoft.configuration.mixins.ActivityBusinessRulesMixin", {
		alternateClassName: "Terrasoft.ActivityBusinessRulesMixin",

		/**
		 * Sets Contact and Account values by corresponds Opportunity fields.
		 * @private
		 */
		setContactAndAccountByOpportunity: function() {
			var opportunity = this.get("Opportunity");
			if (this.Ext.isEmpty(opportunity)) {
				return;
			}
			var account = opportunity.Account;
			if (!this.Ext.isEmpty(account)) {
				this.set("Account", account);
			}
			var contact = opportunity.Contact;
			if (!this.Ext.isEmpty(contact)) {
				this.set("Contact", contact);
			}
		},

		/**
		 * Generates Opportunity attribute filters.
		 * @private
		 * @return {Terrasoft.FilterGroup}
		 */
		getOpportunityFilters: function() {
			var account = this.get("Account");
			var contact = this.get("Contact");
			var filterGroup = this.Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
			if (account && !this.Ext.isEmpty(account.value)) {
				filterGroup.add("AccountFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"Account",
					account.value)
				);
			}
			if (contact && !this.Ext.isEmpty(contact.value)) {
				filterGroup.add("ContactFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"Contact",
					contact.value)
				);
			}
			return filterGroup;
		}
	});
});


