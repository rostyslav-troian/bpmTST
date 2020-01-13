Terrasoft.configuration.Structures["MobileBaseDashboardItem"] = {innerHierarchyStack: ["MobileBaseDashboardItem"]};
/**
 * @class Terrasoft.configuration.BaseDashboardItem
 * Base dashboard item.
 */
Ext.define("Terrasoft.configuration.controls.BaseDashboardItem", {
	extend: "Ext.Component",

	config: {

		/**
		 * @cfg {String} title Title.
		 */
		title: null,

		/**
		 * @cfg {String} style Widget style.
		 */
		style: null,

		/**
		 * @inheritdoc
		 */
		baseCls: "cf-dashboard-item",

		/**
		 * @cfg {String} cssPrefix Prefix of css class.
		 */
		cssSuffix: "",

		/**
		 * @cfg {Boolean} isActive Flag indicating if component is selected.
		 */
		isActive: null,

		/**
		 * @cfg {Config} rawConfig Configuration of dashboard item.
		 */
		rawConfig: null,

		/**
		 * @cfg {Boolean} fullscreenButton If true, fullscreen button will be displayed.
		 */
		fullscreenButton: false,

		/**
		 * @cfg {String} configGeneratorClassName Config generator class name.
		 */
		configGeneratorClassName: "Terrasoft.BaseDashboardItemConfigGenerator"

	},

	/**
	 * @inheritdoc
	 */
	template: [
		{
			cls: "cf-dashboard-item-title",
			reference: "titleElement"
		},
		{
			cls: "cf-dashboard-item-inner",
			reference: "innerHtmlElement"
		}
	],

	/**
	 * @private
	 */
	titleElement: null,

	/**
	 * @private
	 */
	innerElement: null,

	/**
	 * @private
	 */
	configGenerator: null,

	/**
	 * Creates instance of config generator.
	 * @protected
	 * @virtual
	 * @param {Object} config Configuration of class.
	 * @return {Terrasoft.BaseDashboardItemConfigGenerator} Instance of config generator.
	 */
	createConfigGenerator: function(config) {
		return Ext.create(this.getConfigGeneratorClassName(), config || {});
	},

	/**
	 * Gets instance of config generator.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.BaseDashboardItemConfigGenerator} Instance of config generator.
	 */
	getConfigGenerator: function() {
		if (!this.configGenerator) {
			this.configGenerator = this.createConfigGenerator();
		}
		return this.configGenerator;
	},

	/**
	 * @inheritdoc
	 */
	initialize: function() {
		this.callParent(arguments);
		this.element.on("tap", this.onTap, this);
		if (this.getFullscreenButton()) {
			this.initializeFullscreenButton();
		}
	},

	/**
	 * Initializes fullscreen button.
	 * @protected
	 * @virtual
	 */
	initializeFullscreenButton: function() {
		var fullscreenButton = Ext.create("Ext.Button", {
			cls: "cf-dashboard-fullscreen-button",
			iconCls: true
		});
		this.element.appendChild(fullscreenButton.element);
		fullscreenButton.on("tap", this.onFullscreenButtonTap, this);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateCssSuffix: function(suffix) {
		if (!Ext.isEmpty(suffix)) {
			this.addCls(this.getBaseCls(), null, "-" + suffix);
		}
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateIsActive: function(value) {
		var baseCls = this.getBaseCls();
		if (value) {
			this.addCls(baseCls, null, "-active");
		} else {
			this.removeCls(baseCls, null, "-active");
		}
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateTitle: function(title) {
		title = title || "";
		this.titleElement.setHtml(title);
	},

	/**
	 * @protected
	 * @virtual
	 * @cfg-updater
	 */
	updateStyle: function(newStyle, oldStyle) {
		var className;
		if (newStyle) {
			className = Terrasoft.DashboardUtils.getClassNameByStyle(newStyle);
			this.addCls(className);
		}
		if (oldStyle) {
			className = Terrasoft.DashboardUtils.getClassNameByStyle(oldStyle);
			this.removeCls(className);
		}
	},

	/**
	 * Called when element hes been tapped.
	 * @protected
	 * @virtual
	 * @param {Ext.event.Event} e Event.
	 */
	onTap: function(e) {
		this.fireEvent("tap", this, e);
	},

	/**
	 * Handles tap on fullscreen button.
	 * @protected
	 * @virtual
	 */
	onFullscreenButtonTap: function() {
		this.fireEvent("fullscreenbuttontap", this, this.config.rawConfig.name);
	},

	/**
	 * Parses value by type.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 */
	parseValue: function(value, type) {
		var configGenerator = this.getConfigGenerator();
		return configGenerator.parseValue(value, type);
	},

	/**
	 * Converts value to string depends on data value type.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 * @return {String} String value.
	 */
	convertValue: function(value, type) {
		var configGenerator = this.getConfigGenerator();
		return configGenerator.convertValue(value, type);
	},

	/**
	 * Returns sortable value.
	 * @protected
	 * @virtual
	 * @param {*} value Value.
	 * @param {Terrasoft.DataValueType} type Data value type.
	 * @return {*} Sortable value.
	 */
	getSortableValue: function(value, type) {
		var configGenerator = this.getConfigGenerator();
		return configGenerator.getSortableValue(value, type);
	},

	/**
	 * @inheritdoc
	 */
	destroy: function() {
		Ext.destroy(this.configGenerator);
		this.callParent(arguments);
	}

});


