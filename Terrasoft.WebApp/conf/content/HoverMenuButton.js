Terrasoft.configuration.Structures["HoverMenuButton"] = {innerHierarchyStack: ["HoverMenuButton"]};
define("HoverMenuButton", ["ext-base"], function(Ext) {
	/**
	 * @class Terrasoft.controls.HoverMenuButton
	 * HoverMenuButton class.
	 */
	Ext.define("Terrasoft.controls.HoverMenuButton", {
		extend: "Terrasoft.Button",
		alternateClassName: "Terrasoft.HoverMenuButton",

		//region Properties: Protected

		/**
		 * Id of the timer for delay before show.
		 * @protected
		 * @type {String} hideTimerId
		 */
		hideTimerId: null,

		/**
		 * Id of the timer for delay before show.
		 * @protected
		 * @type {String} hideTimerId
		 */
		showTimerId: null,

		//endregion

		//region Properties: Public

		/**
		 * Time interval before displaying menu. Used when menu is showed in delayed mode.
		 * @type {Number}
		 */
		showDelay: 1000,

		/**
		 * Time interval before hide menu. Used when hide menu in delayed mode.
		 * @type {Number}
		 */
		hideDelay: 200,

		/**
		 * Is delayed show enabled flag.
		 * @type {Boolean}
		 */
		delayedShowEnabled: true,

		//endregion

		//region Methods: Private

		/**
		 * Subscribe on menu render events to enable menu be showed and hidden by pointing on and out of menu.
		 * @private
		 */
		onMenuRendered: function() {
			var menuWrapEl = this.menu.getWrapEl();
			menuWrapEl.on("mouseenter", this.onMenuMouseEnter, this);
			menuWrapEl.on("mouseleave", this.onMenuMouseLeave, this);
		},

		/**
		 * Handler for mouse enter event on menu element.
		 * @private
		 */
		onMenuMouseEnter: function() {
			this.clearTimer("hideTimerId");
		},

		/**
		 * Handler for mouse leave event from menu element.
		 * @private
		 */
		onMenuMouseLeave: function() {
			this.hideTimerId = Ext.defer(this.delayedHide, this.hideDelay, this);
		},

		/**
		 * Handler for mouse enter event on button element.
		 * @private
		 */
		onMouseEnter: function() {
			if (!this.delayedShowEnabled || this.clearTimer("hideTimerId")) {
				return;
			}
			var showMenu = this.menu && this.menu.items && this.menu.items.getCount() > 0;
			if (showMenu) {
				this.showTimerId = Ext.defer(this.delayedShow, this.showDelay, this);
			}
		},

		/**
		 * Handler for mouse leave event from button element.
		 * @private
		 */
		onMouseLeave: function() {
			if (!this.delayedShowEnabled || this.clearTimer("showTimerId")) {
				return;
			}
			this.hideTimerId = Ext.defer(this.delayedHide, this.hideDelay, this);
		},

		/**
		 * Called when show delay timeout expired.
		 * @private
		 */
		delayedShow: function() {
			this.clearTimer("showTimerId");
			if (!this.delayedShowEnabled) {
				return;
			}
			this.showMenu();
		},

		/**
		 * Called when hide delay timeout expired.
		 * @private
		 */
		delayedHide: function() {
			this.clearTimer("hideTimerId");
			if (!this.delayedShowEnabled) {
				return;
			}
			if (this.menu) {
				this.menu.hide();
			}
		},

		/**
		 * Clear timer by it's name.
		 * @private
		 * @param {String} timerName Name of the timer.
		 * @return {Boolean} True, if timer was active.
		 */
		clearTimer: function(timerName) {
			var timerId = this[timerName];
			if (timerId) {
				clearTimeout(timerId);
				this[timerName] = null;
			}
			return Boolean(timerId);
		},

		/**
		 * Delayed show flag changed handler.
		 * Sets new value for flag, if it was changed.
		 * @param {Boolean} isEnabled Attribute value.
		 */
		setDelayedShowEnabled: function(isEnabled) {
			if (this.delayedShowEnabled === isEnabled) {
				return;
			}
			this.delayedShowEnabled = isEnabled;
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var hoverButtonBindConfig = {
				delayedShowEnabled: {
					changeMethod: "setDelayedShowEnabled"
				}
			};
			Ext.apply(hoverButtonBindConfig, bindConfig);
			return hoverButtonBindConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Button#getTplData
		 * @overridden
		 */
		getTplData: function() {
			var data = this.callParent(arguments);
			delete data.menu;
			return data;
		},

		/**
		 * Subscribe for mouse events to handle menu show and hide.
		 * @protected
		 * @overridden
		 */
		initDomEvents: function() {
			this.callParent(arguments);
			var wrapEl = this.getWrapEl();
			wrapEl.on("mouseenter", this.onMouseEnter, this);
			wrapEl.on("mouseleave", this.onMouseLeave, this);
		},

		/**
		 * @inheritdoc #initDomEvents
		 * @protected
		 * @overridden
		 */
		initMenu: function() {
			this.callParent(arguments);
			if (this.menu) {
				this.menu.on("afterrender", this.onMenuRendered, this);
				this.menu.on("afterrerender", this.onMenuRendered, this);
			}
		},

		/**
		 * Destroy event to clear up menu show and hide timers
		 * @protected
		 * @overridden
		 */
		onDestroy: function() {
			this.clearTimer("showTimerId");
			this.clearTimer("hideTimerId");
			this.callParent(arguments);
		}

		//endregion

	});
});


