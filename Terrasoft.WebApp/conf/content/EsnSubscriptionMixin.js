Terrasoft.configuration.Structures["EsnSubscriptionMixin"] = {innerHierarchyStack: ["EsnSubscriptionMixin"]};
Ext.define("Terrasoft.configuration.mixins.EsnSubscriptionMixin", {
	alternateClassName: "Terrasoft.EsnSubscriptionMixin",

	/**
	 * @public
	 * Get the change subscription action caption.
	 * @returns {String} Returns caption value.
	 */
	getChangeUserSubscriptionCaption: function() {
		return this.get("IsSubscribed")
			? this.get("Resources.Strings.UnsubscribeCaption")
			: this.get("Resources.Strings.SubscribeCaption");
	},

	/**
	 * @public
	 * Get is change subscription action enabled.
	 * @returns {Boolean} Returns false when IsSubscribed has not retrieved from server yet.
	 */
	getChangeUserSubscriptionIsEnabled: function() {
		return this.get("IsSubscribed") != null && this.canEntityBeOperated();
	}
});


