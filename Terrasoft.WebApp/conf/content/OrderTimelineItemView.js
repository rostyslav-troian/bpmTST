Terrasoft.configuration.Structures["OrderTimelineItemView"] = {innerHierarchyStack: ["OrderTimelineItemView"]};
define("OrderTimelineItemView", ["BaseTimelineItemView"], function() {
	/**
	 * @class Terrasoft.configuration.OrderTimelineItemView
	 * Order timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.OrderTimelineItemView", {
		extend: "Terrasoft.BaseTimelineItemView",
		alternateClassName: "Terrasoft.OrderTimelineItemView",

		// region Methods: Protected

		/**
		 * Returns order info view config.
		 * @protected
		 * @return {Object} Order info view config.
		 */
		getInfoContainerViewConfig: function() {
			return {
				"name": "OrderInfoContainer",
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
					this.getTextWithLabelContainerViewConfig("Resources.Strings.StatusLabel", "Status", {
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
			bodyConfig.items = [
				this.getInfoContainerViewConfig()
			];
			return bodyConfig;
		}

		// endregion

	});
});


