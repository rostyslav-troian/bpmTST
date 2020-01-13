Terrasoft.configuration.Structures["ContentBuilderElement"] = {innerHierarchyStack: ["ContentBuilderElement"]};
define("ContentBuilderElement", ["css!ContentBuilderElement", "ContentBuilderElementViewModel"], function() {

	/**
	 * @class Terrasoft.controls.ContentBuilderElement
	 */
	Ext.define("Terrasoft.controls.ContentBuilderElement", {
		extend: "Terrasoft.Component",
		alternateClassName: "Terrasoft.ContentBuilderElement",
		mixins: {
			draggable: "Terrasoft.DraggableContentElement"
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#dragCopy
		 * @overridden
		 */
		dragCopy: true,

		/**
		 * @inheritdoc Terrasoft.core.mixins.Draggable#showDropZoneHint
		 * @override
		 */
		showDropZoneHint: false,

		/**
		 * Reference to the target container.
		 * @protected
		 * @type {Terrasoft.ReorderableContainer}
		 */
		container: null,

		/**
		 * Caption of the element.
		 * @public
		 * @type {String}
		 */
		caption: null,

		/**
		 * Image config.
		 * @public
		 * @type {Object}
		 */
		imageConfig: null,

		/**
		 * Element parameters.
		 * @protected
		 * @type {Object}
		 */
		tplConfig: {
			classes: {
				wrapClasses: ["content-builder-element-wrap"],
				imageWrapClasses: ["content-builder-element-image-wrap-class"],
				imageClasses: ["content-builder-element-image-class"],
				captionWrapClasses: ["content-builder-element-caption-wrap-class"]
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#tpl
		 * @overridden
		 */
		tpl: [
			/* jscs:disable */
			/* jshint quotmark: false */
			'<div id="{id}-content-builder-element-wrap" class="{wrapClasses}">',
				'<div class="{imageWrapClasses}">',
					'<img class="{imageClasses}" src="{imageUrl}"/>',
				'</div>',
				'<tpl if="!!caption">',
					'<div class="{captionWrapClasses}">',
						'{caption}',
					'</div>',
				'</tpl>',
			'</div>'
			/* jshint quotmark: double */
			/* jscs:enable */
		],

		/**
		 * Applies properties to the control's template config.
		 * @private
		 * @param {Object} tplData Template data oject.
		 * @param {String} configNodeName Config node name of the template data object.
		 */
		_applyTplConfigProperties: function(tplData, configNodeName) {
			Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
				tplData[propertyName] = propertyValue;
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.mixins.draggable.addDraggableEvents.apply(this, arguments);
		},

		/**
		 * Applies classes to the control's template config.
		 * @protected
		 * @param {Object} tplData Template data oject.
		 */
		applyTplClasses: function(tplData) {
			this._applyTplConfigProperties(tplData, "classes");
		},

		/**
		 * @inheritdoc Terrasoft.component#getTplData
		 * @overridden
		 */
		getTplData: function() {
			this.selectors = {
				wrapEl: Ext.String.format("#{0}-content-builder-element-wrap", this.id)
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
		 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
		 * @overridden
		 */
		getDraggableConfig: function() {
			var draggableConfig = {};
			draggableConfig[Terrasoft.DragAction.MOVE] = {
				handlers: {
					b4StartDrag: "b4StartDrag",
					onDragEnter: "onDragEnter",
					onDragOver: "onDragOver",
					onDragOut: "onDragOut",
					onDragDrop: "onDragDrop",
					onInvalidDrop: "onInvalidDrop"
				}
			};
			return draggableConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#b4StartDrag
		 * @overridden
		 */
		b4StartDrag: function() {
			this.mixins.draggable.superclass.b4StartDrag.apply(this, arguments);
		},

		/**
		 * Handles drag enter the drop zone.
		 * @protected
		 */
		onDragEnter: function(event, crossedBlocks) {
			this.mixins.draggable.onDragEnter.apply(this, arguments);
		},

		/**
		 * Handles drag over drop zone.
		 * @protected
		 * @param {Object} event Event object.
		 * @param {Array} crossedBlocks Array of crossed blocks.
		 */
		onDragOver: function(event, crossedBlocks) {
			this.mixins.draggable.onDragOver.apply(this, arguments);
		},

		/**
		 * DragOut event handler.
		 * @protected
		 */
		onDragOut: function() {
			this.mixins.draggable.onDragOut.apply(this, arguments);
		},

		/**
		 * Handles successful drop.
		 * @override
		 * @param {Object} event Event object.
		 * @param {Array} crossedBlocks Array of crossed blocks.
		 */
		onDragDrop: function(event, crossedBlocks) {
			this.mixins.draggable.onDragDrop.apply(this, arguments);
		},

		/**
		 * Handles invalid drop.
		 * @protected
		 */
		onInvalidDrop: function() {
			this.mixins.draggable.onInvalidDrop.apply(this, arguments);
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
				imageConfig: {
					changeMethod: "setImageConfig"
				},
				groupName: {
					changeMethod: "setGroupName"
				}
			};
			Ext.apply(itemBindConfig, bindConfig);
			return itemBindConfig;
		},

		/**
		 * Setter for this.caption property.
		 * @protected
		 * @param {String} value New value.
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
		 * Setter for this.imageConfig property.
		 * @protected
		 * @param {Object} value New value.
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

	return Terrasoft.ContentBuilderElement;
});


