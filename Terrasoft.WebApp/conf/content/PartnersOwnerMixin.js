Terrasoft.configuration.Structures["PartnersOwnerMixin"] = {innerHierarchyStack: ["PartnersOwnerMixin"]};
define("PartnersOwnerMixin", ["ConfigurationConstants"], function(ConfigurationConstants) {
	/**
	 * @class Terrasoft.configuration.mixins.PartnersOwnerMixin
	 * Mixin represents methods for partners owners.
	 */
	Ext.define("Terrasoft.configuration.mixins.PartnersOwnerMixin", {
		alternateClassName: "Terrasoft.PartnersOwnerMixin",

		/**
		 * Returns filter for Owner field.
		 * @param {String} typeColumnName Name of column that contains type of sales value.
		 * @return {Terrasoft.FilterGroup} Owner filter.
		 */
		getOwnerFilter: function(typeColumnName) {
			const userFilter = this.Terrasoft.createColumnIsNotNullFilter("[VwSystemUsers:Contact].Id");
			const filters = this.Terrasoft.createFilterGroup();
			filters.add("isUserFilter", userFilter);
			if (!this._isPartnerSalesChannel(typeColumnName)) {
				const connectionTypeFilter =
					this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[VwSystemUsers:Contact].ConnectionType",
					ConfigurationConstants.SysAdminUnit.ConnectionType.AllEmployees);
				filters.add("connectionTypeFilter", connectionTypeFilter);
			}
			return filters;
		},

		/**
		 * Clear partner if column value is not a partner sale.
		 * @param {string} typeColumnName Name of column that contains type of sales value.
		 */
		clearPartnerIfColumnChange: function(typeColumnName) {
			const column = this.get(typeColumnName);
			if (column && column.value !== ConfigurationConstants.Opportunity.Type.PartnerSale) {
				this.$Partner = null;
			}
		},

		/**
		 * Fills owner by partner contact.
		 */
		autoCompleteOwner: function() {
			const partnerId = this.$Partner && this.$Partner.value;
			if (this.Ext.isEmpty(partnerId) || !this.$IsEntityInitialized) {
				return;
			}
			const ownerAccountId = this.$Owner && this.$Owner.Account && this.$Owner.Account.value;
			if (ownerAccountId === partnerId) {
				return;
			}
			const partnerPrimaryContact = this.$Partner &&
				this.$Partner["[VwSystemUsers:Contact:PrimaryContact].Contact"];
			this.$Owner = this.Ext.isEmpty(partnerPrimaryContact) ? null : partnerPrimaryContact;
		},

		/**
		 * Fill partner by owner account if it is a partner account type.
		 */
		fillPartnerByOwner: function() {
			const ownerAccountId = this.$Owner && this.$Owner.Account;
			const ownerAccountType = this.$Owner["Account.Type"] && this.$Owner["Account.Type"].value;
			if (!this.Ext.isEmpty(ownerAccountType) && !this.Ext.isEmpty(ownerAccountId) &&
				(ownerAccountType.toUpperCase() === ConfigurationConstants.AccountType.Partner.toUpperCase())) {
				this.$Partner = ownerAccountId;
			}
		},

		/**
		 * @private
		 */
		_isPartnerSalesChannel: function(typeColumnName) {
			const salesChannel = this.get(typeColumnName) && this.get(typeColumnName).value;
			return salesChannel === ConfigurationConstants.Opportunity.Type.PartnerSale;
		}

	});
});


