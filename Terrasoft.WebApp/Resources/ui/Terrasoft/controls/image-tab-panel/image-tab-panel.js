/**
 *  Class for working with icons with icons.
 */
Ext.define("Terrasoft.controls.ImageTabPanel", {
	alternateClassName: "Terrasoft.ImageTabPanel",
	extend: "Terrasoft.TabPanel",

	/**
  * The background of the tab bar.
  * @type {Object}
  */
	backgroundImage: null,

	/**
	 * {@link Ext.XTemplate Template} Template for the tab generation.
	 * @protected
	 * @type {String[]}
	 */
	tabTpl: [
		"<li data-item-index=\"{index}\" class=\"ts-box-sizing {wrapClass}\" style=\"{customItemStyle}\"",
		"<tpl if=\"markerValue\">",
		" data-item-marker=\"{markerValue}\"",
		"</tpl>",
		"><span data-item-index=\"{index}\">{caption}</span></li>"
	],

	/**
  * The name of the column responsible for the mandatory filling of the tab.
  * @type {String}
  */
	defaultIsRequiredColumnName: "IsRequired",

	/**
  * The name of the column responsible for the icon for the active tab.
  * @type {String}
  */
	defaultActiveTabImageColumnName: "ActiveTabImage",

	/**
  * The name of the column responsible for the default icon for tab.
  * @type {String}
  */
	defaultDefaultTabImageColumnName: "DefaultTabImage",

	/**
  * The class of mandatory filling of the tab.
  * @type {String}
  */
	requiredClass: "ts-imagetabpanel-required",

	/**
  * A class of the tab bar with images.
  * @type {String}
  */
	imageTabPanelWrapClass: "ts-imagetabpanel",

	/**
	 * @inheritdoc Terrasoft.TabPanel#imageTabClass
	 * @override
	 */
	imageTabClass: "",

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.wrapClass = tplData.wrapClass + " " + this.imageTabPanelWrapClass;
		if (this.backgroundImage) {
			tplData.ulCustomClass = "ts-imagetabpanel-backgroundImage";
			tplData.ulCustomStyle = "background-image: url(" +
				Terrasoft.ImageUrlBuilder.getUrl(this.backgroundImage) + ");";
		}
		return tplData;
	},

	/**
  * Creates a configuration for the construction of html markup tab.
  * @override
  * @param {Terrasoft.BaseViewModel} tab The data model to which the table is attached.
  * @return {Object} An object containing parameters for building a template.
  */
	getTabTplConfig: function(tab) {
		var tabTplConfig = this.callParent(arguments);
		var image = Terrasoft.encodeHtml(this.getImage(tab));
		tabTplConfig.customItemStyle = "background-image: url(" + image + ");";
		if (this.getIsRequired(tab)) {
			tabTplConfig.wrapClass = tabTplConfig.wrapClass + " " + this.requiredClass;
		}
		return tabTplConfig;
	},

	/**
	 * @inheritdoc Terrasoft.TabPanel#toggleCssClasses
	 * @override
	 */
	toggleCssClasses: function(tabDomEl, tab, isActive) {
		this.callParent(arguments);
		var tabEl = Ext.fly(tabDomEl);
		var imageStyle = Terrasoft.getFormattedString("url({0})", this.getTabImage(tab, isActive));
		tabEl.setStyle("background-image", imageStyle);
	},

	/**
  * Returns the url to the tab image.
  * @protected
  * @param {Terrasoft.BaseViewModel} tab The data model to which the tab is attached.
  * @return {String} url of the image of the tab.
  */
	getImage: function(tab) {
		var tabName = this.getTabName(tab);
		return this.getTabImage(tab, (tabName === this.activeTabName));
	},

	/**
  * Gets the value of the flag  of the required tab filling.
  * @private
  * @param {Terrasoft.BaseViewModel} tab The data model to which the table is attached.
  * @return {Boolean} The flag if the tab is required to fill.
  */
	getIsRequired: function(tab) {
		var isRequiredColumnName = tab.isRequiredColumnName || this.defaultIsRequiredColumnName;
		return tab.get(isRequiredColumnName);
	},

	/**
  * Returns the url of the image for the tab.
  * @private
  * @param {Terrasoft.BaseViewModel} tab The data model to which the table is bound.
  * @param {Boolean} isActive A flag of tab activity.
  * @return {String} Url image of the tab.
  */
	getTabImage: function(tab, isActive) {
		var imageColumnName = this.getTabImageColumnName(tab, isActive);
		return tab.get(imageColumnName);
	},

	/**
  * Returns the name of the property for the image of the tab.
  * @private
  * @param {Terrasoft.BaseViewModel} tab The data model to which the table is attached.
  * @param {Boolean} isActive Indicates the activity of the tab.
  * @returns {String} The name of the viewModel property for the image.
  */
	getTabImageColumnName: function(tab, isActive) {
		var activeTabImageColumnName = tab.activeTabImageColumnName || this.defaultActiveTabImageColumnName;
		var defaultTabImageColumnName = tab.defaultTabImageColumnName || this.defaultDefaultTabImageColumnName;
		return isActive ? activeTabImageColumnName : defaultTabImageColumnName;
	},

	/**
  * Sets the class required filling of the tab.
  * @protected
  * @param {Terrasoft.BaseViewModel} tab The data model to which the tab is bound.
  */
	toggleRequiredCss: function(tab) {
		var isRequired = this.getIsRequired(tab);
		var tabIndex = this.tabs.indexOf(tab);
		var tabDomElement = this.getTabDomElementByIndex(tabIndex);
		var requiredClass = this.requiredClass;
		var tabEl = Ext.fly(tabDomElement);
		if (isRequired) {
			if (!tabEl.hasCls(requiredClass)) {
				tabEl.toggleCls(requiredClass);
			}
		} else {
			if (tabEl.hasCls(requiredClass)) {
				tabEl.toggleCls(requiredClass);
			}
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var tabPanelBindConfig = {
			backgroundImage: {
				changeMethod: "onBackgroundImageChange"
			}
		};
		Ext.apply(bindConfig, tabPanelBindConfig);
		return bindConfig;
	},

	/**
  * The event handler for changing the background of the tab bar.
  * @param {Object} image background image.
  * @override
  */
	onBackgroundImageChange: function(image) {
		this.backgroundImage = image;
		this.reRenderPanel();
	}
});
