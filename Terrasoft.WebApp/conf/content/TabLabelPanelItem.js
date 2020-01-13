Terrasoft.configuration.Structures["TabLabelPanelItem"] = {innerHierarchyStack: ["TabLabelPanelItem"]};
define("TabLabelPanelItem", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {

		/**
		 * @class Terrasoft.TabLabelPanelItem
		 * Tab container item class.
		 */
		Ext.define("Terrasoft.TabLabelPanelItem", {
			extend: "Terrasoft.Label",
			mixins: {
				draggable: "Terrasoft.Draggable"
			},

			/**
			 * @inheritDoc Terrasoft.Draggable#grabbedClassName
			 * @protected
			 */
			grabbedClassName: "tab-label-panel-draggable-item-grabbed",

			/**
			 * @inheritDoc Terrasoft.Draggable#dragActionsCode
			 * @protected
			 */
			dragActionsCode: 1,

			/**
			 * @inheritDoc Terrasoft.Draggable#dragCopy
			 * @protected
			 */
			dragCopy: false,

			/**
			 * @inheritDoc Terrasoft.Label#tpl
			 * @protected
			 */
			tpl: [
				"<label {inputId} id = {id} class = \"{labelClass}\" style = \"{labelStyle}\" title=\"{hint}\">{caption}",
				"<tpl if=\"markerValue\">",
				" data-item-marker=\"{markerValue}\"",
				"</tpl>",
				"</label>"
			],

			/**
			 * Name of marker value.
			 * @type {String}
			 */
			markerValue: null,

			/**
			 * @inheritDoc Terrasoft.Component#constructor
			 * @protected
			 */
			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
						"ondragenter",
						"ondragout",
						"ondragdrop"
				);
			},

			/**
			 * Returns property of caption according markerValut property.
			 * @private
			 * @param {Terrasoft.BaseViewModel} label Model of data.
			 * @return {String} Marker value.
			 */
			getLabelMarkerValue: function(label) {
				return label.caption;
			},

			/**
			 * @inheritDoc Terrasoft.Label#getTplData
			 * @protected
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				this.markerValue = this.getLabelMarkerValue(tplData);
				return tplData;
			},

			/**
			 * @inheritDoc Terrasoft.Component#onAfterRender
			 * @protected
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.draggable.onAfterRender.apply(this, arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Component#onAfterReRender
			 * @protected
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.draggable.onAfterReRender.apply(this, arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Component#onDestroy
			 * @protected
			 */
			onDestroy: function() {
				this.mixins.draggable.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.Draggable#getDraggableConfig
			 * @protected
			 */
			getDraggableConfig: function() {
				var draggableConfig = {};
				draggableConfig[Terrasoft.DragAction.MOVE] = {
					handlers: {
						onDragOver: "onDragEnter",
						onDragOut: "onDragOut",
						onDragDrop: "onDragDrop",
						onInvalidDrop: "onInvalidDrop"
					}
				};
				return draggableConfig;
			},

			/**
			 * onInvalidDrop event handler
			 * @protected
			 */
			onInvalidDrop: function() {
				this.reRender();
			},

			/**
			 * DragOver event handler
			 * @protected
			 */
			onDragEnter: function(event, crossedBlocks) {
				Terrasoft.each(crossedBlocks, function(crossedBlock) {
					if (!crossedBlock.droppableInstance) {
						this.fireEvent("ondragenter", crossedBlock.id);
						return false;
					}
				}, this);
			},

			/**
			 * DragOut event handler
			 * @protected
			 */
			onDragOut: function() {
				this.fireEvent("ondragout");
			},

			/**
			 * DragDrop event handler
			 * @protected
			 */
			onDragDrop: function() {
				this.reRender();
				this.fireEvent("ondragdrop");
			},

			/**
			 * @inheritDoc Terrasoft.Draggable#getDraggableElementDefaultConfig
			 * @protected
			 */
			getDraggableElementDefaultConfig: function() {
				return {
					isTarget: true,
					instance: this,
					tag: this.tag
				};
			}
		});
	});


