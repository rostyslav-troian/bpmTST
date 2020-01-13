/**
 * Base module class. Represents code template for client module integration into web page.
 */
Ext.define("Terrasoft.core.BaseModule", {
	alternateClassName: "Terrasoft.BaseModule",
	extend: "Terrasoft.BaseObject",

	/**
	 * View model of a module.
	 * @private
	 * @property {Terrasoft.BaseViewModel}
	 */
	viewModel: null,

	/**
	 * Class name of view model.
	 * @property {String}
	 */
	viewModelClassName: "",

	/**
	 * Class name of view generator.
	 * @property {String}
	 */
	viewGeneratorClassName: "",

	/**
	 * Initializes common module.
	 */
	init: function() {
		this.setMaskState();
		this.viewGenerator = Ext.create(this.viewGeneratorClassName);
		this.viewModel = Ext.create(this.viewModelClassName);
	},

	/**
	 * Sets mask state to none for body.
	 * @private
	 */
	setMaskState: function() {
		var body = Ext.getBody();
		body.set({
			"maskState": "none"
		});
	},

	/**
	 * Renders module to specified element.
	 * @param {Ext.dom.Element} renderTo Parent element to which render module.
	 */
	render: function(renderTo) {
		var view = this.viewGenerator.generateView();
		view.bind(this.viewModel);
		view.render(renderTo);
	},

	/**
	 * Cleans up all captured resources.
	 */
	destroy: function() {
		if (!this.viewGenerator.destroyed) {
			this.viewGenerator.destroy();
		}
		if (!this.viewModel.destroyed) {
			this.viewModel.destroy();
		}
		this.viewGenerator = null;
		this.viewModel = null;
	}
});
