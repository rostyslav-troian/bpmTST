/**
 * Mixin is used by the controls to display the menu.
 * The mixin can be mixed with any control inherited from {@link #Terrasoft.Component}.
 */
Ext.define("Terrasoft.controls.mixins.MenuMixin", {
	alternateClassName: "Terrasoft.MenuMixin",

	//region Fields: Protected

	/**
  * Control menu.
  * @protected
  * @type {Object}
  */
	menu: null,

	/**
  * Menu class.
  * @protected
  * @type {String}
  */
	menuClass: "Terrasoft.Menu",

	//endregion

	//region Methods: Protected

	/**
	 * Shows the menu.
	 * @protected
	 * @param {Ext.dom.Element} [wrapEl] Wrapper for the dom element that shows the menu.
	 */
	showMenu: function(wrapEl) {
		var menu = this.menu;
		wrapEl = wrapEl || this.getWrapEl();
		var box = wrapEl.getBox();
		box.y -= 3;
		box.bottom += 3;
		box.height += 6;
		menu.show(box, null, wrapEl);
		this.initScrollTrackEvents();
	},

	/**
  * Subscribes to windows scrolling events.
  * @protected
  */
	initScrollTrackEvents: function() {
		var wrapEl = this.getWrapEl();
		this.prevPosition = wrapEl.getRegion();
		this.debounceWindowScroll = this.debounceWindowScroll || Terrasoft.debounce(this.onWindowScroll, 50);
		Ext.EventManager.addListener(window, "scroll", this.debounceWindowScroll, this);
		if (Ext.isIE11 || Ext.isChrome || Ext.isSafari) {
			Ext.EventManager.addListener(window, "mousewheel", this.debounceWindowScroll, this);
		} else if (Ext.isGecko) {
			Ext.EventManager.addListener(window, "DOMMouseScroll", this.debounceWindowScroll, this);
		}
	},

	/**
  * Unsubscribes from the window scrolling events.
  * @protected
  */
	unsubscribeWindowScroll: function() {
		if (this.debounceWindowScroll) {
			Ext.EventManager.removeListener(window, "scroll", this.debounceWindowScroll, this);
			if (Ext.isIE11 || Ext.isChrome || Ext.isSafari) {
				Ext.EventManager.removeListener(window, "mousewheel", this.debounceWindowScroll, this);
			} else if (Ext.isGecko) {
				Ext.EventManager.removeListener(window, "DOMMouseScroll", this.debounceWindowScroll, this);
			}
		}
	},

	/**
  * Checks for changes in the position of the button, and hides the menu if the position has changed.
  * @protected
  */
	onWindowScroll: function() {
		var prevPosition = this.prevPosition;
		var wrapEl = this.getWrapEl();
		var currentPosition = wrapEl.getRegion();
		if (!currentPosition.equals(prevPosition)) {
			var menu = this.menu;
			if (!Ext.isEmpty(menu)) {
				menu.hide();
			}
		}
	},

	/**
	 * Initializes the mixin.
	 * @protected
	 */
	init: function() {
		this.addEvents(

			/**
			 * @event prepareMenu
			 * Event triggered after menu is showed.
			 */
			"prepareMenu",

			/**
			 * @event hideMenu
			 * Event triggered after menu is hid.
			 */
			"hideMenu"
		);
		this.initMenu();
	},

	/**
  * Initializes the menu.
  * @protected
  */
	initMenu: function() {
		var menu = this.menu;
		if (!menu) {
			return;
		}
		var isMenuInitialized = menu instanceof Terrasoft.Menu;
		if (!isMenuInitialized) {
			var config = Ext.apply({
				markerValue: this.markerValue
			}, menu);
			this.menu = Ext.create(this.menuClass, config);
			this.menu.on("add", this.onMenuItemsChange, this);
			this.menu.on("remove", this.onMenuItemsChange, this);
			this.menu.on("prepareMenu", this.onPrepareMenu, this);
			this.menu.on("hide", this.onHideMenu, this);
		}
	},

	/**
  * Handles the event when drop-down menu appears.
  * @protected
  */
	onPrepareMenu: function() {
		this.fireEvent("prepareMenu");
	},

	/**
  * Handles the hiding event of the drop-down menu.
  * @protected
  */
	onHideMenu: function() {
		this.fireEvent("hideMenu");
		this.unsubscribeWindowScroll();
	},

	/**
  * Handles the menu item change event.
  * @protected
  */
	onMenuItemsChange: function() {
		var menuWrapEl = this.menuWrapEl;
		var itemsCount = this.menu.items.getCount();
		if (!this.destroyed && ((menuWrapEl && itemsCount === 0) || (!menuWrapEl && itemsCount === 1))) {
			this.reRender();
		}
	},

	/**
  * Adds a menu.
  * @protected
  * @param {Object} menu Menu parameters or menu item.
  */
	addMenu: function(menu) {
		if (this.menu) {
			return;
		}
		this.menu = menu;
		this.initMenu();
		this.reRender(null);
	},

	/**
  * Deletes the menu.
  * @protected
  * @param {Boolean} preventReRender Do not run re-rendering after deletion.
  */
	removeMenu: function(preventReRender) {
		var menu = this.menu;
		if (menu) {
			this.menu.un("add", this.onMenuItemsChange, this);
			this.menu.un("remove", this.onMenuItemsChange, this);
			this.menu.un("prepareMenu", this.onPrepareMenu, this);
			this.menu.un("hide", this.onHideMenu, this);
			menu.destroy();
			this.menu = null;
			if (!preventReRender) {
				this.reRender(null);
			}
		}
	},

	/**
  * Binds the menu to model elements.
  * @protected
  * @param {Terrasoft.data.modules.BaseViewModel} model Data model.
  */
	bindMenu: function(model) {
		if (this.menu) {
			this.menu.bind(model);
		}
	}

	//endregion
});
