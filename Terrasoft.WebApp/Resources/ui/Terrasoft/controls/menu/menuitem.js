/**
 */
Ext.define("Terrasoft.controls.MenuItem", {
	extend: "Terrasoft.BaseMenuItem",
	alternateClassName: "Terrasoft.MenuItem",

	/**
	 * Sub-menu item
	 * @type {Terrasoft.Menu}
	 */
	menu: null,

	// TODO remove this property after it becomes clear how the submenus are loaded
	showProgress: false,

	/**
	 * Click processing function
	 * @type {Function}
	 */
	handler: null,

	/**
	 * The mouse hover handler.
	 * This method is signed only in the root menu.
	 * @private
	 */
	onMouseOver: function() {
		this.callParent(arguments);
		if (this.menu && this.enabled) {
			this.showMenu();
		}
	},

	/**
	 * Initializing the menu component
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.initSubMenu();
		var menu = this.menu;
		if (menu) {
			menu.on("afterrender", this.onSubMenuAfterRender, this);
		}
	},

	/**
	 * Initializing the submenu
	 * @protected
	 */
	initSubMenu: function() {
		var menu = this.menu;
		if (menu) {
			menu.isRootMenu = false;
			var parentMenu = this.parentMenu;
			if (parentMenu) {
				menu.rootMenu = this.parentMenu.getRootMenu();
			}
			var isMenuInitialized = menu instanceof Terrasoft.Menu;
			if (!isMenuInitialized) {
				this.menu = Ext.create("Terrasoft.Menu", menu);
			}
		}
	},

	/**
	 * Display the loading of the submenu
	 * @protected
	 */
	renderSubMenuLoading: function() {
		var menu = this.menu;
		if (menu && menu.isMenuLoading) {
			this.showProgress = true;
			this.reRender(null);
		}
	},

	/**
	 * Sub menu display handler
	 * @protected
	 */
	onSubMenuAfterRender: function() {
		if (!this.rendered || !this.showProgress) {
			return;
		}
		this.showProgress = false;
		this.reRender(null);
	},

	/**
	 * Calculate the data for the template and update the selectors
	 * @protected
	 * @override
	 * @return {Object} parameter object for the markup to be created
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.showProgress = this.showProgress;
		tplData.showArrow = this.menu && !this.showProgress;
		this.updateSelectors(tplData);
		this.tplData = tplData;
		return tplData;
	},

	/**
	 * Initializing DOM Events
	 * @protected
	 * @override
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.on({
			mouseover: {
				fn: this.onMouseOver,
				scope: this
			}
		});
	},

	/**
	 * Delete the menu and release all resources.
	 * @override
	 */
	onDestroy: function() {
		var menu = this.menu;
		if (menu) {
			menu.un("afterrender", this.onSubMenuAfterRender, this);
			menu.destroy();
		}
		delete this.menu;
		this.callParent(arguments);
	},

	/**
	 * Start the action logic of the menu item, and make it selected in the menu if the item has a parent menu.
	 * @override
	 */
	process: function() {
		this.callParent(arguments);
		if (this.menu && this.enabled) {
			this.showMenu();
			return;
		}
		var handler = this.handler;
		if (handler) {
			handler(this.parentMenu, this);
		}
	},

	/**
	 * Show submenu
	 */
	showMenu: function() {
		var wrapEl = this.wrapEl;
		var wrapBox = wrapEl.getBox();
		wrapBox.x += 1;
		wrapBox.right -= 1;
		wrapBox.width -= 2;
		this.menu.show(wrapBox, true);
		Ext.Function.defer(this.renderSubMenuLoading, 300, this);
	},

	/**
	 * Deselect menu
	 */
	applyMenuDeselection: function() {
		this.callParent(arguments);
		var menu = this.menu;
		if (menu && menu.isMenuLoading) {
			menu.isMenuLoading = false;
			this.showProgress = false;
			this.reRender(null);
		}
	},

	/**
	 * Bind all the elements to the model
	 * @override
	 * @param {Terrasoft.data.modules.BaseViewModel} model Data model
	 */
	bind: function() {
		this.callParent(arguments);
		var menu = this.menu;
		if (menu) {
			menu.bind(this.model);
		}
	}

});