Terrasoft.configuration.Structures["ActivityTimelineItemViewModel"] = {innerHierarchyStack: ["ActivityTimelineItemViewModel"]};
define("ActivityTimelineItemViewModel", ["ProcessModuleUtilities", "ActivityTimelineItemViewModelResources",
	"BaseTimelineItemViewModel"],
		function(ProcessModuleUtilities) {
			/**
			 * @class Terrasoft.configuration.ActivityTimelineItemViewModel
			 * Activity timeline item view model class.
			 */
			Ext.define("Terrasoft.configuration.ActivityTimelineItemViewModel", {
				alternateClassName: "Terrasoft.ActivityTimelineItemViewModel",
				extend: "Terrasoft.BaseTimelineItemViewModel",

				// region Methods: Protected

				/**
				 * Checks if detailed result label is visible.
				 * @protected
				 * @return {Boolean} Detailed result is visible - true, detailed result is not visible - false.
				 */
				isDetailedResultLabelVisible: function() {
					return !Ext.isEmpty(this.get("Message"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#openEntityCard
				 * @override
				 */
				openEntityCard: function(entitySchemaName, primaryColumnValue) {
					if (!Ext.isEmpty(this.$ProcessElementId)) {
						var config = {
							recordId: primaryColumnValue,
							procElUId: this.$ProcessElementId
						};
						ProcessModuleUtilities.tryShowProcessCard.call(this, config);
						return;
					}
					this.callParent(arguments);
				}

				// endregion

			});
		}
);


