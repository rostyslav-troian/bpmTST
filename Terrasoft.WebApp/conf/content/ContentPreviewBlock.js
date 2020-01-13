Terrasoft.configuration.Structures["ContentPreviewBlock"] = {innerHierarchyStack: ["ContentPreviewBlock"]};
define("ContentPreviewBlock", ["css!ContentPreviewBlock"], function() {

	/**
	 * @class Terrasoft.controls.ContentPreviewBlock
	 */
	Ext.define("Terrasoft.controls.ContentPreviewBlock", {
		extend: "Terrasoft.Component",
		alternateClassName: "Terrasoft.ContentPreviewBlock",
		mixins: {
			draggable: "Terrasoft.Draggable"
		},

		/**
		 * @inheritdoc Terrasoft.draggable#dragActionsCode
		 * @override
		 */
		dragActionsCode: Terrasoft.DragAction.MOVE,

		/**
		 * ######### ##### #############.
		 * @type {String}
		 */
		caption: null,

		/**
		 * ######## #####.
		 * @type {Array}
		 */
		items: null,

		/**
		 * ############ ######## ########
		 * @public
		 * @type {Object}
		 */
		imageConfig: null,

		/**
		 * @inheritdoc Terrasoft.Draggable#dragCopy
		 * @overridden
		 */
		dragCopy: true,

		/**
		 * ###### ##### # ####### ##### ############# #######.
		 * @protected
		 * @type {String[]}
		 */
		draggableGroupName: null,

		/**
		 * ####### ######### "#########" ######### drop-###.
		 * @protected
		 * @type {Boolean}
		 */
		showDropZoneHint: false,

		/**
		 * ###### ########## ####### ######## # #####.
		 * @protected
		 * @type {Object}
		 */
		tplConfig: {
			classes: {
				wrapClasses: ["content-block-preview-wrap"],
				titleWrapClasses: ["content-block-title-wrap-class"],
				imageWrapClasses: ["content-block-image-wrap-class"],
				imageClasses: ["content-block-image-class"]
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @overridden
		 */
		tpl: [
			/* jscs:disable */
			/* jshint quotmark: false */
			'<div id="{id}-content-block-preview-wrap" class="{wrapClasses}">',
				'<div class="{imageWrapClasses}">',
					'<img class="{imageClasses}" src="{imageUrl}"/>',
				'</div>',
				'<tpl if="!!caption">',
					'<div class="{titleWrapClasses}">',
						'{caption}',
					'</div>',
				'</tpl>',
			'</div>'
			/* jshint quotmark: double */
			/* jscs:enable */
		],

		/**
		 * ####### ######### ######
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"dragOver",
				"dragDrop",
				"invalidDrop"
			);
		},

		/**
		 * ######### ########## ########## ####### ######## ##########.
		 * @protected
		 * @param {Object} tplData ###### ########## ####### ########## ######## ##########.
		 * @param {String} configNodeName ######## ######## ####### ####### ########.
		 */
		applyTplConfigProperties: function(tplData, configNodeName) {
			Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
				tplData[propertyName] = propertyValue;
			}, this);
		},

		/**
		 * ######### ########## ####### ####### ######## ##########.
		 * @protected
		 * @param {Object} tplData ###### ########## ####### ########## ######## ##########.
		 */
		applyTplClasses: function(tplData) {
			this.applyTplConfigProperties(tplData, "classes");
		},

		/**
		 * @inheritdoc Terrasoft.component#getTplData
		 * @overridden
		 */
		getTplData: function() {
			this.selectors = {
				wrapEl: Ext.String.format("#{0}-content-block-preview-wrap", this.id)
			};
			var tplData = this.callParent(arguments);
			this.applyTplClasses(tplData);
			tplData.caption = this.caption;
			if (this.imageConfig) {
				tplData.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
			}
			return tplData;
		},

		/**
		 * ########## ###### ############## ########## ############# ######## drag.
		 * @protected
		 * @return {Object} ###### ############## ########## ############# ######## drag.
		 */
		getDraggableElementDefaultConfig: function() {
			return {
				isTarget: true,
				instance: this,
				tag: this.tag
			};
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
		 * @overridden
		 */
		getDraggableConfig: function() {
			var draggableConfig = {};
			draggableConfig[Terrasoft.DragAction.MOVE] = {
				handlers: {
					onDragOver: "onDragOver",
					onDragDrop: "onDragDrop",
					onInvalidDrop: "onDragDrop"
				}
			};
			return draggableConfig;
		},

		/**
		 * Handles drag over drop zone.
		 * @protected
		 * @param {Object} event Event object.
		 * @param {Array} crossedBlocks Array of crossed blocks.
		 */
		onDragOver: function(event, crossedBlocks) {
			const block = crossedBlocks && crossedBlocks.find(function(item) {
				return item.droppableInstance &&
					(item.isZeroElement || item.droppableInstance.model.$ItemType !== "sheet");
			});
			const blockId = block && (block.droppableInstance.tag || "0");
			blockId && this.fireEvent("dragOver", blockId);
		},

		/**
		 * Handles successful drop.
		 * @protected
		 * @param {Object} event Event object.
		 * @param {Array} crossedBlocks Array of crossed blocks.
		 */
		onDragDrop: function(event, crossedBlocks) {
			this.reRender();
			const block = crossedBlocks && crossedBlocks.find(function(item) {
				return item.droppableInstance;
			});
			if (block) {
				this.fireEvent("dragDrop");
			}
		},

		/**
		 * ############ ####### ########### ############## ########.
		 * @protected.
		 */
		onInvalidDrop: function() {
			this.reRender();
			this.fireEvent("invalidDrop");
		},

		/**
		 * @inheritdoc Terrasoft.component#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var itemBindConfig = {
				caption: {
					changeMethod: "setCaption"
				},
				tag: {
					changeMethod: "setTag"
				},
				imageConfig: {
					changeMethod: "setImageConfig"
				},
				draggableGroupName: {
					changeMethod: "setDraggableGroupName"
				}
			};
			Ext.apply(itemBindConfig, bindConfig);
			return itemBindConfig;
		},

		/**
		 * ######### ######## ######### ########.
		 * @param {Number} value ###### ######.
		 */
		setCaption: function(value) {
			if (this.caption === value) {
				return;
			}
			this.caption = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * ######### ######## ############## ########.
		 * @param {Number} value ###### ######.
		 */
		setTag: function(value) {
			if (this.tag === value) {
				return;
			}
			this.tag = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * ############# ###### ######## ###########.
		 * @param {Object} value ########.
		 */
		setImageConfig: function(value) {
			if (this.imageConfig === value) {
				return;
			}
			this.imageConfig = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * ############# ###### # ####### ##### #############.
		 * @param {String[]} value ######## #####.
		 */
		setDraggableGroupName: function(value) {
			if (this.draggableGroupName === value) {
				return;
			}
			this.draggableGroupName = value;
			if (this.rendered) {
				this.reRender();
			}
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getGroupName
		 * @overridden
		 */
		getGroupName: function() {
			return this.draggableGroupName;
		},

		/**
		 * @inheritdoc Terrasoft.component#onAfterRender
		 * @overridden
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.mixins.draggable.onAfterRender.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.component#onAfterReRender
		 * @overridden
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.mixins.draggable.onAfterReRender.apply(this, arguments);
		},

		/**
		 * @inheritdoc Terrasoft.component#onDestroy
		 * @overridden
		 */
		onDestroy: function() {
			this.mixins.draggable.onDestroy.apply(this, arguments);
			this.callParent(arguments);
		}
	});
	return Terrasoft.ContentPreviewBlock;
});


