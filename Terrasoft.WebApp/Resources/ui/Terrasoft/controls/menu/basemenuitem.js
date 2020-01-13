/**
 * Base class of menu items
 */
Ext.define("Terrasoft.controls.BaseMenuItem", {
	extend: "Terrasoft.Component",
	alternateClassName: "Terrasoft.BaseMenuItem",

	/**
	 * Load control monitor
	 * @private
	 * @type {Terrasoft.BaseSpinner}
	 */
	progressSpinner: null,

	/**
	 * Parent menu.
	 * @protected
	 * @type {Terrasoft.Menu}
	 */
	parentMenu: null,

	/**
	 * Whether the type of menu item is interactive - whether to receive a graphic focus of the click
	 * @protected
	 * @type {Boolean}
	 */
	isInteractive: true,

	/**
	 * The name of the CSS class that is applied to the outer element when selected in the menu.
	 * @protected
	 * @type {String}
	 */
	selectedClass: "menu-item-selected",

	/**
	 * The name of the CSS class that is applied to the inactive outer element.
	 * @protected
	 * @type {String}
	 */
	disabledClass: "menu-item-disabled",

	/**
	 * The name of the base CSS class for the image.
	 * @protected
	 * @type {String}
	 */
	baseMenuItemImageClass: "menu-item-image",

	/**
	 * The name of the base CSS class for the arrow.
	 * @protected
	 * @type {String}
	 */
	baseMenuItemArrowClass: "menu-item-arrow",

	/**
	 * The name of the base CSS class for the token.
	 * @protected
	 * @type {String}
	 */
	baseMenuItemMarkerClass: "menu-marker",

	/**
	 * The name of the base CSS class of the menu item item.
	 * @protected
	 * @type {String}
	 */
	baseMenuItemClass: "menu-item",

	/**
	 * Layout markup template of the control.
	 * @type {Array}
	 */
	/*jshint white:false */
	/*jshint quotmark: false*/
	tpl: [
		"<li id=\"{id}\" class=\"{itemClass}\" style=\"{itemStyle}\"" +
		"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>" +
		">",
		"<tpl if=\"hasImage\">",
		"<span id=\"{imageId}\" class=\"{imageClass}\" style=\"{imageStyle}\"></span>",
		"</tpl>",
		"{caption}",
		"<tpl if=\"showProgress\">",
		"{%this.renderLoadingProgress(out, values)%}",
		"</tpl>",
		"<tpl if=\"showArrow && !showProgress\">",
		"	<span id=\"{arrowId}\" class=\"{arrowClass}\" style=\"{arrowStyle}\">",
		"<span class=\"{markerClass}\"></span>",
		"</span>",
		"</tpl>",
		"</li>"
	],
	/*jshint white:true */
	/*jshint quotmark: true*/

	/**
	 * Menu item title.
	 * @type {String}
	 */
	caption: "",

	/**
	 * Configuration for image generation.
	 * @type {Object}
	 */
	imageConfig: null,

	/**
	 * Generate the markup of the progress of loading the menu into the template
	 * @private
	 * @param {Array} buffer markup buffer
	 * @param {Object} renderData data object for rendering
	 */
	renderLoadingProgress: function(buffer, renderData) {
		var self = renderData.self;
		var progressSpinner = self.getProgressSpinner();
		var progressSpinnerHtml = progressSpinner.generateHtml();
		Ext.DomHelper.generateMarkup(progressSpinnerHtml, buffer);
	},

	/**
	 * Get control displaying the download
	 * @private
	 * @return {Terrasoft.BaseSpinner}
	 */
	getProgressSpinner: function() {
		if (Ext.isEmpty(this.progressSpinner)) {
			this.progressSpinner = Terrasoft.getSpinner("menu-item-progress");
		}
		return this.progressSpinner;
	},

	/**
	 * The mouse hover handler.
	 * This method is signed only in the root menu.
	 * @private
	 */
	onMouseOver: function() {
		if (!this.enabled) {
			return;
		}
		this.applyMenuSelection();
		if (this.isInteractive) {
			var parentMenu = this.parentMenu;
			parentMenu.setSelectedItem(this);
		}
	},

	/**
	 * Mouse escape handle.
	 * This method is signed only in the root menu.
	 * @private
	 */
	onMouseOut: function() {
		var menu = this.menu;
		if (menu != null) {
			if (menu.allowRerender()) {
				return;
			} else {
				this.applyMenuDeselection();
			}
		} else if (this.isInteractive) {
			this.applyMenuDeselection();
		}
	},

	/**
	 * Initializing the component.
	 * @protected
	 * @override
	 */
	init: function() {
		this.callParent();
		this.addEvents(
			/**
			 * @event
			 * Click event on the menu item
			 * @param {Terrasoft.BaseMenuItem} this
			 */
			"click"
		);
		this.on("click", this.onItemClick, this);
	},

	/**
	 * Update selectors.
	 * @protected
	 * @param  {Object} tplData data for creating the markup.
	 */
	updateSelectors: function(tplData) {
		var selectors = this.selectors;
		if (!selectors) {
			selectors = this.selectors = {};
		}
		if (tplData.hasImage) {
			selectors.imageEl = "#" + this.id + "-menu-item-image";
		} else {
			delete selectors.imageEl;
		}
		if (tplData.showArrow && !tplData.showProgress) {
			selectors.arrowEl = "#" + this.id + "-menu-item-arrow";
		} else {
			delete selectors.arrowEl;
		}
		selectors.wrapEl = "#" + this.id;
		selectors.el = selectors.wrapEl;
		return selectors;
	},

	/**
	 * Calculate styles and classes for the template.
	 * @protected
	 * @param  {Object} tplData data object for the template that will be used to build the markup.
	 */
	prepareTplDataStylesAndClasses: function(tplData) {
		tplData.itemClass = [this.baseMenuItemClass];
		tplData.itemStyle = [];
		tplData.imageClass = [this.baseMenuItemImageClass];
		tplData.imageStyle = [];
		tplData.arrowClass = [this.baseMenuItemArrowClass];
		tplData.arrowStyle = [];
		tplData.markerClass = this.baseMenuItemMarkerClass;
		var disabledClass = this.disabledClass;
		if (!this.enabled && disabledClass) {
			tplData.itemClass.push(disabledClass);
		}
		var imageConfig = this.imageConfig;
		if (imageConfig) {
			var image = Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
			tplData.imageStyle.push("background-image: url(" + image + ");");
		}
	},

	/**
	 * Calculate the data for the template and update the selectors
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.renderLoadingProgress = this.renderLoadingProgress;
		tplData.imageId = this.id + "-menu-item-image";
		tplData.arrowId = this.id + "-menu-item-arrow";
		tplData.showProgress = false;
		tplData.showArrow = false;
		tplData.caption = Terrasoft.encodeHtml(this.caption);
		tplData.direction = Terrasoft.getTextDirection(tplData.caption);
		var imageConfig = this.imageConfig;
		tplData.hasImage = !!imageConfig;
		this.prepareTplDataStylesAndClasses(tplData);

		//Temparoray workaround
		tplData.itemClass = tplData.itemClass.join(" ");
		tplData.itemStyle = tplData.itemStyle.join(" ");
		tplData.imageClass = tplData.imageClass.join(" ");
		tplData.imageStyle = tplData.imageStyle.join(" ");
		tplData.arrowClass = tplData.arrowClass.join(" ");
		tplData.arrowStyle = tplData.arrowStyle.join(" ");

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
			click: {
				fn: this.onClick,
				scope: this
			},
			mouseover: {
				fn: this.onMouseOver,
				scope: this
			},
			mouseout: {
				fn: this.onMouseOut,
				scope: this
			}
		});
	},

	/**
	 * Keypress handler.
	 * It is needed on all types of menus, because it must return back focus to the focus element of the menu
	 * so tha i can receive input from the keyboard.
	 * @protected
	 * @param {Ext.EventObjectImpl} event event object
	 */
	onClick: function(event) {
		if (!this.enabled) {
			return;
		}
		event.stopPropagation();
		var canExecute = this.canExecute({
			method: this.onClick,
			args: arguments
		});
		if (canExecute === false) {
			return;
		}
		this.fireEvent("click", this);
	},

	/**
	 * The event handler for the control click.
	 * @protected
	 */
	onItemClick: function() {
		var parentMenu = this.parentMenu;
		parentMenu.focusMenuTree();
		var itemMenu = this.menu;
		if (!itemMenu) {
			var rootMenu = parentMenu.getRootMenu();
			rootMenu.hide();
		}
		if (this.isInteractive) {
			this.process();
		}
	},

	/**
	 * Start the action logic of the menu item, and make it selected in the menu if the item has a parent menu.
	 */
	process: function() {
		this.applyMenuSelection();
		var parentMenu = this.parentMenu;
		parentMenu.setSelectedItem(this);
	},

	/**
	 * Show graphical selection in the menu.
	 */
	applyMenuSelection: function() {
		var selectedClass = this.selectedClass;
		if (selectedClass) {
			var wrapEl = this.getWrapEl();
			wrapEl.addCls(selectedClass);
		}
	},

	/**
	 * Display graphically the deselection in the menu
	 */
	applyMenuDeselection: function() {
		var wrapEl = this.getWrapEl();
		wrapEl.removeCls(this.selectedClass);
	},

	/**
	 * Get the index of the item in the menu or null if the item does not have a parent menu
	 */
	getIndex: function() {
		var parentMenu = this.parentMenu;
		if (parentMenu) {
			return parentMenu.items.indexOf(this);
		}
		return null;
	},

	/**
	 * Delete the menu and release all resources.
	 * @override
	 */
	onDestroy: function() {
		var progressSpinner = this.progressSpinner;
		if (progressSpinner) {
			progressSpinner.destroy();
		}
		delete this.parentMenu;
		this.callParent(arguments);
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var labelBindConfig = {
			caption: {
				changeMethod: "setCaption"
			}
		};
		Ext.apply(labelBindConfig, bindConfig);
		return labelBindConfig;
	},

	/**
	 * Sets the text label in the element.
	 * @param {String} caption Text caption
	 */
	setCaption: function(caption) {
		if (this.caption === caption) {
			return;
		}
		this.caption = caption;
		if (this.rendered) {
			this.reRender();
		}
	},

	/**
	 * Sets the rendering value of the menu item to false.
	 */
	onHideMenu: function() {
		this.rendered = false;
	},

	/**
	 * Sets the event handler for the menu items for the parent menu.
	 */
	added: function() {
		this.parentMenu.on("hide", this.onHideMenu, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.progressSpinner)) {
			return;
		}
		this.progressSpinner.show();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		if (Ext.isEmpty(this.progressSpinner)) {
			return;
		}
		this.progressSpinner.show();
	}

});
