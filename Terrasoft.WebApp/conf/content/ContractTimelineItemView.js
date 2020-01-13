Terrasoft.configuration.Structures["ContractTimelineItemView"] = {innerHierarchyStack: ["ContractTimelineItemView"]};
define("ContractTimelineItemView", ["BaseTimelineItemView"],
	function() {
		/**
		 * @class Terrasoft.configuration.ContractTimelineItemView
		 * Contract timeline item view class.
		 */
		Ext.define("Terrasoft.configuration.ContractTimelineItemView", {
			alternateClassName: "Terrasoft.ContractTimelineItemView",
			extend: "Terrasoft.BaseTimelineItemView",

			// region Methods: Protected

			/**
			 * Returns Contract info view config.
			 * @protected
			 * @return {Object} Contract info view config.
			 */
			getContractInfoContainerViewConfig: function() {
				var dateFieldConfig = {
					"textValueConverter": "getFormattedShortDate"
				};
				return {
					"name": "ContractInfoContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["timeline-tile-info-container"]
					},
					"items": [
						this.getTextWithLabelContainerViewConfig("Resources.Strings.TypeLabel", "Type"),
						this.getTextWithLabelContainerViewConfig("Resources.Strings.EndDateLabel", "EndDate", dateFieldConfig),
						this.getTextWithLabelContainerViewConfig("Resources.Strings.StateLabel", "State")
					]
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemView#getBodyViewConfig
			 * @override
			 */
			getBodyViewConfig: function() {
				var bodyConfig = this.callParent(arguments);
				bodyConfig.items = [this.getContractInfoContainerViewConfig()];
				return bodyConfig;
			}

			// endregion

		});
	});


