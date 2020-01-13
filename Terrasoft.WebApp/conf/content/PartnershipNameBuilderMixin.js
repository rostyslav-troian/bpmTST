Terrasoft.configuration.Structures["PartnershipNameBuilderMixin"] = {innerHierarchyStack: ["PartnershipNameBuilderMixin"]};
define("PartnershipNameBuilderMixin", ["PartnershipNameBuilderMixinResources"], function(resources) {
	/**
	 * @class Terrasoft.configuration.mixins.PartnershipNameBuilderMixin
	 * Mixin represents methods for building name of partnerships.
	 */
	Ext.define("Terrasoft.configuration.mixins.PartnershipNameBuilderMixin", {
		alternateClassName: "Terrasoft.PartnershipNameBuilderMixin",

		/**
		 * Build partnership name by concating account name and start date.
		 * @public
		 * @param {Object} account Partnership account.
		 * @param {Date} startDate
		 * @returns {String} Partnership name in format {accountName}-{startYear}
		 */
		buildPartnershipName: function(account, startDate) {
			if (this._isValidAccount(account) && this._isValidStartDate(startDate)) {
				const accountName = account.displayValue;
				const partnershipYear = Ext.Date.format(startDate, "Y");
				return Ext.String.format(resources.localizableStrings.NameColumnStringFormat, accountName,
					partnershipYear);
			}
			return Terrasoft.emptyString;
		},

		/**
		 * Indicates that account is valid
		 * @private
		 * @param {Object} account
		 */
		_isValidAccount: function(account) {
			return account && account.displayValue;
		},

		/**
		 * Indicates that startDate is valid
		 * @private
		 * @param {Date} startDate 
		 */
		_isValidStartDate: function(startDate) {
			return startDate && Ext.isDate(startDate);
		}

	});
});


