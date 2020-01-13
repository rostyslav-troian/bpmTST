Terrasoft.configuration.Structures["WizardHeaderModule"] = {innerHierarchyStack: ["WizardHeaderModule"]};
define("WizardHeaderModule", ["BaseNestedModule", "ViewGeneratorV2", "ContainerList", "ContainerListGenerator",
	"WizardStep", "WizardStepCollection", "WizardHeaderViewModel", "WizardHeaderViewConfig"
], function() {

	/**
	 * Class visual module top panel of the wizard.
	 */
	Ext.define("Terrasoft.configuration.WizardHeaderModule", {
		extend: "Terrasoft.configuration.BaseNestedModule",
		alternateClassName: "Terrasoft.WizardHeaderModule",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		/**
		 * @inheritdoc Terrasoft.BaseModule#showMask
		 * @override
		 */
		showMask: true,

		/**
		 * The root element represent the top panel of the wizard.
		 * @private
		 * @type {Ext.Element}
		 */
		renderContainer: null,

		/**
		 * The configuration object module.
		 * @type {Object}
		 */
		moduleConfig: null,

		/**
		 * The class name of the view model the top panel.
		 * @type {String}
		 */
		viewModelClassName: "Terrasoft.WizardHeaderViewModel",

		/**
		 * The name of the class generator has been view configuration of the top panel.
		 * @type {String}
		 */
		viewConfigClassName: "Terrasoft.WizardHeaderViewConfig",

		/**
		 * The name of the class generator performance.
		 * @type {String}
		 */
		viewGeneratorClass: "Terrasoft.ViewGenerator",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseSchemaModule#render
		 * @override
		 */
		render: function(renderTo) {
			this.callParent(arguments);
			this.renderContainer = renderTo;
		},

		/**
		 * Creates an instance of the class Terrasoft. View Generator.
		 * @return {Terrasoft.ViewGenerator}
		 */
		createViewGenerator: function() {
			return this.Ext.create(this.viewGeneratorClass);
		},

		/**
		 * Creates a configuration view of the top panel.
		 * @protected
		 * @param config {Object} A configuration object.
		 * @param {Function} callback The callback function.
		 * @param {Terrasoft.BaseModel} scope The scope of callback function.
		 * @return {Object[]} Returns a configuration representation of the top panel.
		 */
		buildView: function(config, callback, scope) {
			const viewGenerator = this.createViewGenerator();
			const viewClass = this.Ext.create(this.viewConfigClassName);
			const schema = {
				viewConfig: viewClass.generate()
			};
			const viewConfig = Ext.apply({
				schema: schema
			}, config);
			viewGenerator.generate(viewConfig, callback, scope);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewConfig
		 * @override
		 */
		initViewConfig: function(callback, scope) {
			const generatorConfig = {};
			generatorConfig.viewModelClass = this.viewModelClass;
			this.buildView(generatorConfig, function(view) {
				this.viewConfig = view[0];
				callback.call(scope);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#initViewModelClass
		 * @override
		 */
		initViewModelClass: function(callback, scope) {
			this.viewModelClass = Ext.ClassManager.get(this.viewModelClassName);
			callback.call(scope);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.BaseNestedModule#getViewModelConfig
		 * @override
		 */
		getViewModelConfig: function() {
			const config = this.callParent(arguments);
			config.values = Ext.apply({}, this.moduleConfig);
			return config;
		}
	});

	return Terrasoft.WizardHeaderModule;
});


