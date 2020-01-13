Terrasoft.configuration.Structures["LinkTimelineItemViewModel"] = {innerHierarchyStack: ["LinkTimelineItemViewModel"]};
define("LinkTimelineItemViewModel", ["LinkTimelineItemViewModelResources", "BaseTimelineItemViewModel"],
	function() {
		/**
		 * @class Terrasoft.configuration.LinkTimelineItemViewModel
		 * Link timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.LinkTimelineItemViewModel", {
			alternateClassName: "Terrasoft.LinkTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Public

			/**
			 * Returns link preview visible value.
			 * @return {Boolean}
			 */
			getLinkPreviewVisible: function() {
				return !Ext.isEmpty(this.get("LinkPreviewData"));
			}

			// endregion

		});
	});


