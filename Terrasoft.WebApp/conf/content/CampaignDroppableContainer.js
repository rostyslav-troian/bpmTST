Terrasoft.configuration.Structures["CampaignDroppableContainer"] = {innerHierarchyStack: ["CampaignDroppableContainer"]};
define("CampaignDroppableContainer", function() {

	/**
	 * @class Terrasoft.configuration.CampaignDroppableContainer
	 * ##### ######## ########## ########## # ####### ##### #############.
	 */
	var droppableContainer = Ext.define("Terrasoft.controls.CampaignDroppableContainer", {
		alternateClassName: "Terrasoft.CampaignDroppableContainer",
		extend: "Terrasoft.Container",

		mixins: {
			droppable: "Terrasoft.Droppable"
		},

		/**
		 * @inheritdoc Terrasoft.component#onAfterRender
		 * @overridden
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.mixins.droppable.onAfterRender.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.component#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.mixins.droppable.onAfterReRender.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.component#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			this.mixins.droppable.onDestroy.apply(this, arguments);
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.Droppable#getGroupName
		 * @overridden
		 */
		getGroupName: function() {
			return "CampaignDroppableContainer";
		}
	});

	return droppableContainer;
});


