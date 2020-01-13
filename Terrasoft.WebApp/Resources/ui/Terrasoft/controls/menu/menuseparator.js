/**
 */
Ext.define('Terrasoft.controls.MenuSeparator', {
	extend: 'Terrasoft.BaseMenuItem',
	alternateClassName: 'Terrasoft.MenuSeparator',

	/**
  * Pattern of control markup
  * @protected
  * @type {Array}
  */
	tpl: [
		'<li id="{id}-menu-separator" class="menu-separator <tpl if="isFirst">menu-separator-first</tpl>">',
		'<tpl if="image">',
		'<span id="{id}-menu-separator-image" ',
		'class="<tpl if="isFirst">menu-separator-first-image<tpl else>menu-separator-image</tpl>"',
		'	style="background-image: url({image});"></span>',
		'</tpl>',
		'<tpl if="isFirst">',
		'{caption}',
		'<tpl elseif="caption">',
		'<div id="{id}-menu-separator-header" class="menu-separator-header">{caption}</div>',
		'<tpl else>',
		'<div id="{id}-menu-separator-header" class="menu-separator-header menu-separator-no-caption"></div>',
		'</tpl>',
		'</li>'
	],

	/**
  * Whether the type of menu item is intractable whether it can get a graphic focus, click
  * @protected
  * @type {Boolean}
  */
	isInteractive: false,

	/**
  * The name of the CSS class that exposes itself to the outer element when it is selected in the menu
  * @protected
  * @type {String}
  */
	selectedClass: null,

	/**
  * Calculate the data for the template and update the selectors
  * @protected
  * @override
  * @return {Object} tplData data object for the template that will be used to build the markup
  */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.isFirst = (this.getIndex() === 0);
		var caption = this.caption || "";
		tplData.caption = Terrasoft.encodeHtml(caption.toUpperCase());
		var imageConfig = this.imageConfig;
		if (imageConfig) {
			tplData.image = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
		}
		this.updateSelectors(tplData);
		this.tplData = tplData;
		return tplData;
	},

	/**
  * Update selectors
  * @param  {Object} tplData data for creating the markup
  * @protected
  */
	updateSelectors: function(tplData) {
		var selectors = this.selectors;
		if (!selectors) {
			selectors = this.selectors = {};
		}
		if (tplData.image) {
			selectors.imageEl = "#" + this.id + "-menu-separator-image";
		} else {
			delete selectors.imageEl;
		}
		if (!tplData.isFirst) {
			selectors.headerEl = "#" + this.id + "-menu-separator-header";
		} else {
			delete selectors.headerEl;
		}
		selectors.wrapEl = "#" + this.id + "-menu-separator";
		selectors.el = selectors.headerEl || selectors.wrapEl;
		return selectors;
	}

});