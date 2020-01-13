Terrasoft.configuration.Structures["InvoiceTimelineItemView"] = {innerHierarchyStack: ["InvoiceTimelineItemView"]};
define("InvoiceTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.InvoiceTimelineItemView
	 * Invoice timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.InvoiceTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.InvoiceTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns invoice info container view config.
		 * @protected
		 * @return {Object} Invoice info view config.
		 */
		getInfoContainerViewConfig: function() {
			return {
				"name": "InfoContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-tile-info-container"]
				},
				"items": [
					this.getTextWithLabelContainerViewConfig("getAmountWithCurrencyCaption", "PrimaryAmount", {
						"textValueConverter": "getFormattedFloatNumberValue"
					}),
					this.getTextWithLabelContainerViewConfig("getPaymentAmountWithCurrencyCaption", "PrimaryPaymentAmount", {
						"textValueConverter": "getFormattedFloatNumberValue"
					}),
					this.getTextWithLabelContainerViewConfig("Resources.Strings.PaymentStatusCaption", "PaymentStatusName", {
						"cssWrapClass": "timeline-text-with-label-container-130px"
					})
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
		 * @override
		 */
		getBodyViewConfig: function() {
			var bodyConfig = this.callParent(arguments);
			bodyConfig.items = [this.getInfoContainerViewConfig()];
			return bodyConfig;
		}

		// endregion

	});
});


