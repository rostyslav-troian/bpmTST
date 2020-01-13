Terrasoft.configuration.Structures["DcmStageContainer"] = {innerHierarchyStack: ["DcmStageContainer"]};
define("DcmStageContainer", ["ext-base", "terrasoft", "DcmReorderableContainer"], function(Ext, Terrasoft) {
	/**
	 * Class for DcmStageContainer.
	 */
	Ext.define("Terrasoft.controls.DcmStageContainer", {
		extend: "Terrasoft.Designers.DcmReorderableContainer",
		alternateClassName: "Terrasoft.DcmStageContainer",

		//region Properties: Private

		/**
		 * Left scroll position.
		 * @private
		 * @type {Number}
		 */
		scrollLeft: 0,

		/**
		 * Top scroll position.
		 * @private
		 * @type {Number}
		 */
		scrollTop: 0,

		/**
		 * Container's scroll config.
		 * @private
		 * @type {Object}
		 */
		scrollConfig: {
			vthresh: 50,
			hthresh: 150,
			frequency: 300,
			increment: 200,
			animate: false
		},

		/**
		 * @inheritdoc Terrasoft.controls.AbstractContainer#itemsEventMap
		 * @protected
		 * @override
		 */
		itemsEventMap: {
			"dblclick": "onStageDblClick",
			"elementDblClick": "onElementDblClick",
			"elementSelected": "onElementSelected",
			"elementRemoveBtnClick": "onElementRemoveButtonClick",
			"stageSelected": "onStageSelected",
			"elementDragDrop": "elementDragDrop"
		},

		/**
		 * Cached container size.
		 * @private
		 * @type {Object}
		 */
		cachedSize: null,

		/**
		 * Interval to check container size changing for scroll updates.
		 * @private
		 * @type {Number}
		 */
		checkSizeInterval: 100,

		/**
		 * setInterval timer id for check size interval.
		 * @private
		 * @type {Number}
		 */
		checkSizeIntervalId: null,

		/**
		 * Check size task.
		 * @private
		 * @type {Ext.util.TaskRunner.Task}
		 */
		checkSizeTask: null,

		//endregion

		//region Properties: Public

		/**
		 * @inheritdoc Terrasoft.controls.ReorderableContainer#itemClassName
		 */
		itemClassName: "Terrasoft.DraggableContainer",

		/**
		 * @inheritdoc Terrasoft.controls.ReorderableContainer#align
		 */
		align: Terrasoft.enums.ReorderableContainer.Align.HORIZONTAL,

		//endregion

		//region Methods: Private

		/**
		 * Inits scroll manager.
		 * @private
		 */
		initAutoScroll: function() {
			this.wrapEl.ddScrollConfig = this.scrollConfig;
			Ext.dd.ScrollManager.register(this.wrapEl);
		},

		/**
		 * Restores scroll position.
		 * @private
		 */
		restoreScrollPosition: function() {
			this.wrapEl.setScrollLeft(this.scrollLeft);
			this.wrapEl.setScrollTop(this.scrollTop);
		},

		/**
		 * Saves scroll position.
		 * @private
		 */
		saveScrollPosition: function() {
			this.scrollLeft = this.wrapEl.getScrollLeft();
			this.scrollTop = this.wrapEl.getScrollTop();
		},

		/**
		 * Container's scroll handler.
		 * @private
		 */
		onWrapElScroll: function() {
			this.saveScrollPosition();
			Ext.dd.DragDropManager.refreshCache({
				"dcm-stages": true,
				"dcm-stage-items": true
			});
		},

		/**
		 * Check container size change and updates scroll position if size is changed.
		 * @private
		 */
		checkSize: function() {
			var size = this.getSize();
			if (this.getIsSizeChanged(size)) {
				this.updateScroll(size);
			}
		},

		/**
		 * Returns True if container size changed, else False.
		 * @private
		 * @param {Object} size Current container size.
		 * @param {Number} size.width Container width.
		 * @param {Number} size.height Container height.
		 * @return {Boolean}
		 */
		getIsSizeChanged: function(size) {
			var cachedSize = this.cachedSize;
			return cachedSize.width !== size.width || cachedSize.height !== size.height;
		},

		/**
		 * Returns container size. Doesn't check that container rendered. So calling method when container
		 * isn't rendered generates exception.
		 * @private
		 * @return {Object} Container size.
		 * @return {Number} return.width Container width.
		 * @return {Number} return.height Container height.
		 */
		getSize: function() {
			var wrapEl = this.getWrapEl();
			return wrapEl.getSize();
		},

		/**
		 * Updates container scroll position.
		 * @private
		 * @param {Object} size Container size.
		 * @param {Number} size.width Container width.
		 * @param {Number} size.height Container height.
		 */
		updateScroll: function(size) {
			var cachedSize = this.cachedSize;
			var widthDiff = cachedSize.width - size.width;
			this.cachedSize = size;
			if (widthDiff > 0) {
				var wrapEl = this.getWrapEl();
				var scrollLeft = wrapEl.dom.scrollLeft + widthDiff;
				wrapEl.setScrollLeft(scrollLeft);
			}
		},

		/**
		 * Initialize checkSize task.
		 * @private
		 */
		initCheckSizeTask: function() {
			this.cachedSize = this.getSize();
			var checkSizeTask = this.getCheckSizeTask();
			Ext.TaskManager.start(checkSizeTask);
		},

		/**
		 * Returns and create check size task.
		 * @private
		 * @return {Ext.util.TaskRunner.Task}
		 */
		getCheckSizeTask: function() {
			this.checkSizeTask = Ext.TaskManager.newTask({
				run: this.checkSize,
				scope: this,
				interval: this.checkSizeInterval
			});
			return this.checkSizeTask;
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.controls.ReorderableContainer#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"onElementSelected",
				"onElementDblClick",
				"onElementRemoveButtonClick",
				"onStageDblClick",
				"onStageSelected",
				"elementDragDrop"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @override
		 */
		onAfterReRender: function() {
			this.callParent(arguments);
			this.restoreScrollPosition();
			this.initCheckSizeTask();
		},

		/**
		 * @inheritdoc Terrasoft.Component#onAfterRender
		 * @override
		 */
		onAfterRender: function() {
			this.callParent(arguments);
			this.initCheckSizeTask();
		},

		/**
		 * @inheritdoc Terrasoft.Component#initDomEvents
		 * @override
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			this.wrapEl.on("scroll", this.onWrapElScroll, this);
			this.initAutoScroll();
		},

		/**
		 * @inheritdoc Terrasoft.Component#clearDomListeners
		 * @override
		 */
		clearDomListeners: function() {
			this.callParent(arguments);
			this.checkSizeTask.destroy();
			this.checkSizeTask = null;
		},

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			if (this.rendered) {
				this.wrapEl.un("scroll", this.onWrapElScroll, this);
				Ext.dd.ScrollManager.unregister(this.wrapEl);
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.core.mixins.Reorderable#getItemByIndex
		 * @override
		 */
		getItemByIndex: function(index) {
			var visibleItem = this.items.filter("visible", true);
			return visibleItem.getAt(index);
		},

		/**
		 * @inheritdoc Terrasoft.controls.ReorderableContainer#setInvalidDrag
		 * @override
		 */
		setInvalidDrag: function(dragItemId, isValid) {
			var dragItem = Ext.dd.DragDropManager.dragCurrent;
			var dragNode = dragItem.getDragEl();
			if (isValid === false) {
				dragNode.classList.add("invalid-drag");
			} else {
				dragNode.classList.remove("invalid-drag");
			}
		}

		//endregion

	});

	return Terrasoft.Designers.DcmStageContainer;
});


