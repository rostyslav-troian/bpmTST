Terrasoft.configuration.Structures["ContractTimelineItemViewModel"] = {innerHierarchyStack: ["ContractTimelineItemViewModel"]};
define("ContractTimelineItemViewModel", ["BaseTimelineItemViewModel", "ContractTimelineItemViewModelResources"],
	function() {
		/**
		 * @class Terrasoft.configuration.ContractTimelineItemViewModel
		 * Contract timeline item view model class.
		 */
		Ext.define("Terrasoft.configuration.ContractTimelineItemViewModel", {
			alternateClassName: "Terrasoft.ContractTimelineItemViewModel",
			extend: "Terrasoft.BaseTimelineItemViewModel",

			// region Methods: Protected

			/**
			 * Returns client caption.
			 * @protected
			 * @return {String} Client caption.
			 */
			getClientCaption: function() {
				return this.$AccountName || this.$ContactName;
			},

			/**
			 * Initialize tile caption.
			 * @protected
			 */
			initTileCaption: function() {
				var clientName = this.getClientCaption();
				if (!Ext.isEmpty(clientName)) {
					var template = this.get("Resources.Strings.CaptionTemplate");
					this.$Caption = Ext.String.format(template, this.$Caption, clientName);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseTimelineItemViewModel#initDefaultValues
			 * @override
			 */
			initDefaultValues: function() {
				this.callParent(arguments);
				this.initTileCaption();
			}

			// endregion

		});
	});


