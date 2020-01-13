/**
 * Class of the designer of schemes of processes.
 */
Ext.define("Terrasoft.Designers.ProcessSchemaDesignerLog", {
	extend: "Terrasoft.BaseSchemaDesigner",
	alternateClassName: "Terrasoft.ProcessSchemaDesignerLog",

	/**
  * The ID of the process log entry.
  */
	sysProcessLogId: null,

	/**
  * Renders the designer.
  * @private
  */
	renderDesignContainer: function() {
		var designContainer = this.designContainer = this.createDesignContainer();
		var designerViewModel = this.designerViewModel = this.createDesignerViewModel();
		designContainer.render(this.renderTo);
		designContainer.bind(designerViewModel);
		designerViewModel.on("initialized", function() {
			Terrasoft.Mask.hide(this.bodyMaskId);
			this.fireEvent("loadcomplete", this);
		}, this);
		designerViewModel.on("change:SchemaCaption", this.setTitle, this);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesigner#createDesignerViewModel
	 * @override
	 */
	createDesignerViewModel: function() {
		return Ext.create("Terrasoft.ProcessSchemaDesignerLogViewModel", {
			sandbox: this.sandbox,
			id: this.id,
			values: {
				SysProcessLogId: this.sysProcessLogId
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchemaDesigner#render
	 */
	render: function(config) {
		this.bodyMaskId = Terrasoft.Mask.show({
			timeout: 0
		});
		this.renderTo = config.renderTo;
		this.renderDesignContainer();
		Terrasoft.ProcessFlowElementSchemaManager.initialize(function() {
			this.designerViewModel.init();
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesigner#createDesignContainer
	 * @override
	 */
	createDesignContainer: function() {
		var designMainContainer = this.callParent(arguments);
		var diagram = this.diagram = Ext.create("Terrasoft.ProcessSchemaDiagram", {
			id: this.id,
			classes: {
				wrapClassName: ["ej-diagram", "ts-box-sizing"]
			},
			items: {
				bindTo: "Items"
			},
			readOnly: true
		});
		var diagramContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-diagram-ct",
			classes: {
				wrapClassName: ["diagram", "ts-box-sizing"]
			},
			items: [diagram]
		});
		var contentContainer = Ext.create("Terrasoft.Container", {
			id: this.id + "-content",
			classes: {
				wrapClassName: ["content", "ts-box-sizing"]
			},
			items: [diagramContainer]
		});
		designMainContainer.add(contentContainer);
		return designMainContainer;
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (this.designerViewModel) {
			this.designerViewModel.destroy();
		}
		this.callParent(arguments);
	}

});
