/**
 * Class represents package market module. Uses for install packages to the bpm'online system.
 * Renders list of packages to install using static content for it.
 */
Ext.define("Terrasoft.core.PackageMarket", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.PackageMarket",
	alias: [
		"Terrassoft.PackageMarket",
		"Terrasoft.core.PackageMarket"
	],

	renderTo: null,
	sandbox: null,
	packageMarketView: null,
	packageMarketViewModel: null,
	packageData: null,

	/**
	 * Creates package market module.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.init();
		this.packageData = this.getPackagesConfig();

	},

	/**
	 * Creates view config
	 */
	getPackagesConfig: function() {
		return {
			"AutoTest": {
				name: "AutoTest",
				url: "\\\\tsbuild-app\\share\\Packages\\AutoTests\\",
				caption: "AutoTest packages"
			}
		};
	},

	/**
	 * Initializes package market module.
	 */
	init: function() {
		if (!this.id) {
			this.id = "package-market";
		}
		this.setMaskState();
	},

	/**
	 * Sets mask state to none for body.
	 * @private
	 */
	setMaskState: function() {
		var body = Ext.getBody();
		body.set({"maskState": "none"});
	},

	/**
	 * Creates package market view model.
	 * @private
	 * @return {Terrasoft.PackageMarketViewModel} Package market view model.
	 */
	createMarketViewModel: function() {
		return Ext.create("Terrasoft.PackageMarketViewModel", {
			packageData: this.packageData
		});
	},

	/**
	 * Renders package market.
	 * @param {Object} config Render config.
	 */
	render: function(config) {
		if (Ext.isEmpty(config.id)) {
			this.id = config.id;
		}
		if (Ext.isString(config.renderTo)) {
			config.renderTo = Ext.get(config.renderTo);
		}
		this.renderTo = config.renderTo;
		var packageMarketView = this.packageMarketView = this.createPackageMarketView();
		var packageMarketViewModel = this.packageMarketViewModel = this.createMarketViewModel();
		packageMarketView.bind(packageMarketViewModel);
		packageMarketView.render(this.renderTo);
	},

	/**
	 * Initializes package market items.
	 * @private
	 * @return {Array} Packages items.
	 */
	getPackageMarketViewConfig: function() {
		var items = [];
		Terrasoft.each(this.packageData, function(item) {
			var packageViewConfig = {
				className: "Terrasoft.Button",
				id: item.name + "-btn",
				caption: item.caption,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				click: {bindTo: "installPackage"},
				tag: item.name
			};
			items.push(packageViewConfig);
		});

		return items;
	},

	/**
	 * Creates package market view.
	 * @protected
	 * @return {Terrasoft.Container} Package market view.
	 */
	createPackageMarketView: function() {
		var config = Ext.create("Terrasoft.core.PackageMarketView");
		var items = config.getView();
		var packageItems = this.getPackageMarketViewConfig();
		var concatedItems = items.concat(packageItems);
		return Ext.create("Terrasoft.Container", {
			id: this.id + "-content-container",
			classes: {
				wrapClassName: ["ts-box-sizing", "content-container-wrap"]
			},
			items: concatedItems
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		var packageMarketViewModel = this.packageMarketViewModel;
		if (packageMarketViewModel) {
			packageMarketViewModel.destroy();
		}
		this.callParent(arguments);
	}
});
