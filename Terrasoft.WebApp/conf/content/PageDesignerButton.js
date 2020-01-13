Terrasoft.configuration.Structures["PageDesignerButton"] = {innerHierarchyStack: ["PageDesignerButton"]};
define("PageDesignerButton", ["DesignTimeReorderableItem"], function() {

	Ext.define("Terrasoft.PageDesignerButton", {
		extend: "Terrasoft.DesignTimeReorderableItem",

		//region Properties: Private

		/**
		 * Indicates that the item is selected
		 * @private
		 * @type {Boolean}
		 */
		selected: false,

		/**
		 * Selected button style class.
		 * @protected
		 * @type {String}
		 */
		selectedClass: "button-selected",

		//endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"onselect",
				"ondblclick",
				"selectedChanged"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var wrapEl = this.wrapEl;
			wrapEl.on("click", this.onClick, this);
			wrapEl.on("mousedown", this.onMouseDown, this);
			wrapEl.on("dblclick", this.onDblClick, this);
		},

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @override
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var config = {
				selected: {
					changeEvent: "selectedChanged",
					changeMethod: "setSelected"
				}
			};
			return Ext.apply(config, bindConfig);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @overridden
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.setWrapClasses();
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.setWrapClasses();
		},

		/**
		 * Set selected style.
		 * @protected
		 */
		setWrapClasses: function() {
			var selectedClass = this.selectedClass;
			var wrapEl = this.getWrapEl();
			if (wrapEl && this.rendered) {
				if (this.selected) {
					wrapEl.addCls(selectedClass);
				} else {
					wrapEl.removeCls(selectedClass);
				}
			}
		},

		/**
		 * Sets the indicator that the block is selected.
		 * @param {Boolean} selected The indicator that the block is selected.
		 */
		setSelected: function(selected) {
			if (this.selected === selected) {
				return;
			}
			this.selected = selected;
			this.setWrapClasses();
		},

		/**
		 * DragOver event handler.
		 * @protected
		 */
		onDragEnter: function(event, crossedBlocks) {
			var nonDroppableBlocks = crossedBlocks.filter(function(block) {
				return !block.droppableInstance;
			}, this);
			if (nonDroppableBlocks.length > 0) {
				var zeroElement = _.find(nonDroppableBlocks, function(block) {
					return block.id.indexOf("zero-element") > -1;
				}, this);
				var blockId = zeroElement && zeroElement.id || nonDroppableBlocks[0].id;
				this.fireEvent("ondragenter", blockId);
			}
		},

		/**
		 * DragDrop event handler.
		 * @protected
		 */
		onDragDrop: function() {
			this.reRender();
			this.fireEvent("ondragdrop");
			this.fireEvent("onselect");
		},

		/**
		 * The mouse down event handler for the button.
		 * @protected
		 * @param {Ext.EventObject} event Event object.
		 */
		onMouseDown: function(event) {
			event.stopEvent();
			this.fireEvent("onselect");
		},

		/**
		 * The click event handler for the button.
		 * @protected
		 * @param {Ext.EventObject} event Event object.
		 */
		onClick: function(event) {
			event.stopEvent();
		},

		/**
		 * The double click event handler for the button.
		 * @protected
		 * @param {Ext.EventObject} event Event object.
		 */
		onDblClick: function(event) {
			event.stopEvent();
			this.fireEvent("ondblclick");
		}

		// endregion

	});
});


