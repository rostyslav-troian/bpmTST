/**
 */
Ext.define("Terrasoft.core.mixins.Droppable", {
	alternateClassName: "Terrasoft.Droppable",

	//region Properties: Public

	/**
	 * Elements entering drop zone events object handlers.
	 * Example:
	 * {
	 *	onDragOut: "onZoneDragOut"
	 * }
	 * Full list of events: http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.dd.DropTarget
	 * @protected
	 * @type {Number}
	 */
	dropZoneHandlers: null,

	/**
	 * Drag and drop group name.
	 * @protected
	 * @type {Object}
	 */
	groupName: "draggable-group",

	/**
	 * Drop zone padding.
	 * @protected
	 * @type {Number}
	 */
	dropZonePadding: -5,

	//endregion

	//region Methods: Protected

	/**
	 * Applies the additional options to the element.
	 * @protected
	 * @param {Ext.DropTarget} dropZone drop zone
	 */
	applyDropZoneAdditionalParameters: function(dropZone) {
		var dropZonePadding = this.dropZonePadding;
		dropZone.setPadding(dropZonePadding, dropZonePadding, dropZonePadding, dropZonePadding);
		dropZone.droppableInstance = this;
	},

	/**
	 * Initializes drop zones.
	 * @protected
	 */
	initDropZones: function() {
		Ext.dd.DragDropManager.mode = 1;
		var dropZones = this.getDropZones();
		Terrasoft.each(dropZones, function(dropZoneEl) {
			var dropZone = dropZoneEl.initDDTarget(this.getGroupName(), this.getDropZoneInitDefaultConfig(),
				Ext.apply({}, this.dropZoneHandlers));
			this.applyDropZoneAdditionalParameters(dropZone);
		}, this);
	},

	/**
	 * Returns array of elements to initialize as a drop zone.
	 * @protected
	 * @return {Ext.Element[]} Array of elements to initialize as a drop zone.
	 */
	getDropZones: function() {
		return [this.getWrapEl()];
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		return {
			groupName: {
				changeMethod: "setGroupName"
			}
		};
	},

	/**
	 * Sets drag and drop group name.
	 * @protected
	 * @param {Object} newValue New drag and drop group name.
	 */
	setGroupName: function(newValue) {
		this.groupName = newValue;
	},

	/**
	 * Reurns drag and drop group name.
	 * @protected
	 * @return {Object} Drag and drop group name.
	 */
	getGroupName: function() {
		return this.groupName;
	},

	/**
	 * Return drop zone initialize additional parameters.
	 * @protected
	 * @return {Object} Drop zone initialize additional parameters.
	 */
	getDropZoneInitDefaultConfig: function() {
		return {};
	},

	/**
	 * Clearn identifiers of drag and drop manager.
	 * @protected
	 */
	clearDropZones: function() {
		var ddIds = Ext.dd.DragDropManager.ids;
		var groupName = this.getGroupName();
		var groupElements = ddIds[groupName];
		if (groupElements) {
			if (this.id === groupName) {
				delete ddIds[groupName];
			} else {
				var groupElementIds = Object.keys(Ext.dd.DragDropManager.ids[groupName]);
				var componentDropZoneIds = Ext.Array.filter(groupElementIds, function(item) {
					return Boolean(item.match(this.id));
				}, this);
				Terrasoft.each(componentDropZoneIds, function(dropZoneId) {
					delete ddIds[groupName][dropZoneId];
				}, this);
			}
			Ext.dd.DragDropManager.refreshCache(groupName);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		if (this.isVisible()) {
			this.clearDropZones();
			this.initDropZones();
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		if (this.isVisible()) {
			this.clearDropZones();
			this.initDropZones();
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (this.rendered) {
			this.clearDropZones();
		}
	}

	//endregion

});
