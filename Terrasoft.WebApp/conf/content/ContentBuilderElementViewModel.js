Terrasoft.configuration.Structures["ContentBuilderElementViewModel"] = {innerHierarchyStack: ["ContentBuilderElementViewModel"]};
define("ContentBuilderElementViewModel", ["BaseContentSerializableViewModelMixin"], function() {

	/**
	 * @class Terrasoft.controls.ContentBuilderElementViewModel
	 */
	Ext.define("Terrasoft.controls.ContentBuilderElementViewModel", {
		extend: "Terrasoft.BaseViewModel",
		alternateClassName: "Terrasoft.ContentBuilderElementViewModel",

		mixins: {
			SerializableMixin: "Terrasoft.BaseContentSerializableViewModelMixin"
		},

		columns: {
			"ItemType": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Caption": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			"Icon": {
				value: null
			},
			"GroupName": {
				value: null
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"ondragover",
				"ondragdrop",
				"oninvaliddrop"
			);
		},

		/**
		 * Handles event for element drag enter.
		 * @protected
		 */
		onDragEnter: Terrasoft.emptyFn,

		/**
		 * Generates event for element drag.
		 * @protected
		 * @param {String} blockId The identifier of crossed block.
		 */
		onDragOver: function(blockId) {
			this.fireEvent("ondragover", this, blockId);
		},

		/**
		 * Handles event for element drag out.
		 * @protected
		 */
		onDragOut: Terrasoft.emptyFn,

		/**
		 * Generates event for element drop.
		 * @protected
		 */
		onDragDrop: function() {
			this.fireEvent("ondragdrop", this);
		},

		/**
		 * Generates event of block group invalid drop.
		 * @protected
		 */
		onInvalidDrop: function() {
			this.fireEvent("oninvaliddrop", this);
		}

	});
});


