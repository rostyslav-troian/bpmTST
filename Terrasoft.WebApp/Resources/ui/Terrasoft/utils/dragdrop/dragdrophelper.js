Ext.ns("Terrasoft.utils.dragdrop");
/**
 * Class for working with Drag&Drop.
 */
Ext.define("Terrasoft.utils.dragdrop.Helper", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.DragDropHelper",

	/**
	 * Array of D&D elements
	 * @type {Ext.dom.Element []}
	 */
	elements: null,

	/**
	 * An array of drag areas for D&D elements
	 * @type {Ext.dom.Element[]}
	 */
	targets: null,

	/**
	 * Base group name
	 * @type {String}
	 */
	baseGroupName: "basegroup",

	/**
	 * An object that contains methods for expanding the D&D element
	 * @type {Object}
	 */
	ddItemOverride: {

		b4StartDrag: function() {
			var el = this.el = Ext.get(this.getEl());
			el.setWidth(el.getWidth());
			el.setHeight(el.getHeight());
			el.setStyle("position", "absolute");
			el.setStyle("z-index", "11");
			this.originalXY = el.getXY();
		},

		onDrag: function(event) {
			var coords = [event.getX() - this.deltaX, event.getY() - this.deltaY];
			this.el.setXY(coords);
		},

		onInvalidDrop: function() {
			this.invalidDrop = true;
		},

		endDrag: function() {
			var el = this.el;
			if (this.invalidDrop === true) {
				el.moveTo(this.originalXY[0], this.originalXY[1]);
				delete this.invalidDrop;
				return;
			}
			delete this.el;
		},

		onDragDrop: function(event, target) {
			var ddTarget = Ext.get(target);
			var self = this.config.self;
			self.fireEvent("dragdrop", ddTarget, this.el);
		}

	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @protected
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.clear();
		this.initElements();
		this.initTargets();
		this.addEvents(
			/**
			 * @event dragdrop
			 * Starts when the {link #elements element} is dragged to the available {link #targets area}
			 */
			"dragdrop"
		);
	},

	/**
	 * Initialization of the D&D Elements
	 * @private
	 */
	initElements: function() {
		Ext.dd.DragDropManager.notifyOccluded = true;
		var elements = this.elements;
		for (var i = 0, ln = elements.length; i < ln; i++) {
			var element = elements[i];
			element.initDD(this.baseGroupName, {isTarget: false, self: this}, this.ddItemOverride);
		}
	},

	/**
	 * Initializing Drag and Drop Areas for D&D Elements
	 * @private
	 */
	initTargets: function() {
		var targets = this.targets;
		for (var i = 0, ln = targets.length; i < ln; i++) {
			var target = targets[i];
			target.initDDTarget(this.baseGroupName, {self: this});
		}
	},

	/**
	 * Clearing D&D elements
	 */
	clear: function() {
		Ext.dd.DragDropManager.ids[this.baseGroupName] = {};
	}

});