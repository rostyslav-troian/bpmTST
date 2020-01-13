/**
 * The class implements the display of data on a modular CSS grid.
 */
Ext.define("Terrasoft.controls.AudioGrid", {
	extend: "Terrasoft.Grid",
	alternateClassName: "Terrasoft.AudioGrid",

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Grid#init
	 * @protected
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * Click audio control in grid raw.
			 */
			"audioClick"
		);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.Grid#onGridClick
	 */
	onGridClick: function(event, target) {
		if (!this.enabled) {
			event.stopEvent();
			return;
		}
		var targetEl = Ext.get(target);
		var root = this.getWrapEl().dom;
		var rowId = this.getRowId(target);
		var audio = targetEl.findParent("audio", root, true);
		if (audio && rowId) {
			this.fireEvent("audioClick", rowId);
			return;
		}
		this.callParent(arguments);
	}

	//endregion

});
