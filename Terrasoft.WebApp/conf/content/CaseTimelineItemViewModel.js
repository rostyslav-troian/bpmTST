Terrasoft.configuration.Structures["CaseTimelineItemViewModel"] = {innerHierarchyStack: ["CaseTimelineItemViewModel"]};
define("CaseTimelineItemViewModel", ["BaseTimelineItemViewModel", "CaseTimelineItemViewModelResources"],
	function() {
		/**
		 * @class Terrasoft.configuration.CaseTimelineItemViewModel
		 * Case timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.CaseTimelineItemViewModel", {
			alternateClassName: "Terrasoft.CaseTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Public

			/**
			 * Generates URL for case priority.
			 * @return {String|null} Priority icon URL address if priority column and primary image is defined,
			 * otherwise null.
			 */
			getPriorityIconUrl: function() {
				var priority = this.get("Priority");
				if (priority && priority.primaryImageValue) {
					var imageConfig = {
						source: Terrasoft.ImageSources.SYS_IMAGE,
						params: {
							primaryColumnValue: priority.primaryImageValue
						}
					};
					return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
				}
				return null;
			},

			/**
			 * Checks that priority icon is visible.
			 * @param {Object} priority Priority column value.
			 * @return {Boolean} Result priority icon is visible - true, result priority icon is not visible - false.
			 */
			isPriorityIconVisible: function(priority) {
				return !Ext.isEmpty(priority) && !Ext.isEmpty(priority.primaryImageValue);
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.$Caption = Ext.String.format("{0}: {1}", this.$Caption, this.$Subject);
			}

			// endregion

		});
	});


