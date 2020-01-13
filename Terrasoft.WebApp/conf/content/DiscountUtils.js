Terrasoft.configuration.Structures["DiscountUtils"] = {innerHierarchyStack: ["DiscountUtils"]};
define("DiscountUtils", ["MoneyUtilsMixin"],
	function() {
		/**
		 * @class Terrasoft.configuration.DiscountUtils
		 * Discount utilities.
		 */
		Ext.define("Terrasoft.configuration.DiscountUtils", {
			alternateClassName: "Terrasoft.DiscountUtils",

			extend: "Terrasoft.BaseObject",

			mixins: {
				MoneyUtilities: "Terrasoft.MoneyUtilsMixin"
			},

			/**
			 * Calculates discount percent.
			 * @param {Number} amount Amount.
			 * @param {Number} discountAmount Discount amount.
			 * @return {Number} Discount percent.
			 */
			calcDiscountPercent: function(amount, discountAmount) {
				if (!Ext.isEmpty(amount) && !Ext.isEmpty(discountAmount) && amount !== 0) {
					return Math.min(this.getPercentage(amount, discountAmount), 100);
				}
				return 0;
			},

			/**
			 * Calculates discount amount.
			 * @param {Number} amount Amount.
			 * @param {Number} discountPercent Discount percent.
			 * @return {Number} Discount amount.
			 */
			calcDiscountAmount: function(amount, discountPercent) {
				if (!Ext.isEmpty(amount) && !Ext.isEmpty(discountPercent)) {
					discountPercent = Math.min(discountPercent, 100);
					return this.getPercentagePart(amount, discountPercent);
				}
				return 0;
			}
		});

		var discountUtils = Ext.create("Terrasoft.configuration.DiscountUtils");
		return discountUtils;
	});


