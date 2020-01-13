/**
 * @abstract
 */
Ext.define("Terrasoft.Designers.BaseSchemaDesigner", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseSchemaDesigner",

	/**
  * Identifier of the designer instance.
  * @type {String}
  */
	id: null,

	/**
  * The element in which the designer will be displayed.
  * @private
  * @type {Ext.dom.Element}
  */
	renderTo: null,

	/**
  * Container in which the designer is drawn.
  * @private
  * @type {Terrasoft.Container}
  */
	designContainer: null,

	/**
  * Sandbox in which the designer is executed.
  * @private
  * @type {Object}
  */
	sandbox: null,

	/**
	 * Schema identifier.
	 * @type {String}
	 * @protected
	 */
	schemaUId: null,

	/**
	 * Package identifier.
	 * @type {String}
	 * @protected
	 */
	packageUId: null,

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 */
	constructor: function() {
		this.callParent(arguments);
		this.init();
	},

	/**
  * Initializing the designer.
  * @protected
  */
	init: function() {
		this.addEvents(
			/**
    * Event of completion of the schema loading by the designer.
    */
			"loadcomplete"
		);
		if (!this.id) {
			this.id = "schema-designer";
		}
		this.onSandboxInitialized();
	},

	/**
  * Registers events for working with the property module and subscribes to them.
  * @protected
  */
	onSandboxInitialized: function() {
		var sandbox = this.sandbox;
		sandbox.registerMessages({
			"GetElementData": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"SaveProperties": {
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
				mode: Terrasoft.MessageMode.PTP
			},
			"HidePropertyPage": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ReRenderPropertiesPage": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			},
			"SaveElementProperties": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		});
		sandbox.subscribe("GetElementData", this.onGetElementData, this);
		sandbox.subscribe("SaveProperties", this.onSaveProperties, this);
		sandbox.subscribe("HidePropertyPage", this.onHidePropertyPage, this);
	},

	/**
  * The event handler for obtaining information on the emitter must overlap in successors.
  * The base implementation throws an exception.
  * @throws {Terrasoft.NotImplementedException}
  * @protected
  */
	onGetElementData: function() {
		throw new Terrasoft.NotImplementedException();
	},

	/**
  * The event handler for storing the properties of an element must overlap in successors.
  * The base implementation throws an exception.
  * @protected
  */
	onSaveProperties: function() {
	},

	/**
  * Launches the designer.
  * @param {Object} config Startup configuration.
  * @param {Ext.dom.Element} config.renderTo The element to which the designer should display.
  * @param {Object} config.sandbox Sandbox in which the designer is executed.
  */
	render: function(config) {
		this.renderTo = config.renderTo;
		var designContainer = this.designContainer = this.createDesignContainer();
		designContainer.render(this.renderTo);
	},

	/**
  * Creates a designer container.
  * @protected
  * @return {Terrasoft.Container}
  */
	createDesignContainer: function() {
		return Ext.create("Terrasoft.Container", {
			id: this.id + "-mainCt",
			classes: {
				wrapClassName: ["schema-designer", "ts-box-sizing"]
			},
			items: []
		});
	},

	/**
  * Deregistration from the events of the sandbox.
  * @protected
  */
	unregisterMessages: function() {
		var sandbox = this.sandbox;
		if (sandbox) {
			sandbox.unRegisterMessages();
		}
	},

	/**
	 * @override
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 */
	onDestroy: function() {
		this.unregisterMessages();
		var designContainer = this.designContainer;
		if (designContainer) {
			designContainer.destroy();
		}
		this.callParent(arguments);
	},

	/**
  * The handler for the property page hiding event must overlap in the heirs.
  * The base implementation throws an exception.
  * @throws {Terrasoft.NotImplementedException}
  * @abstract
  * @protected
  */
	onHidePropertyPage: function() {
		throw new Terrasoft.NotImplementedException();
	},

	/**
	 * Sets window title.
	 * @protected
	 */
	setTitle: function(model, processCaption) {
		document.title = processCaption;
	}

});
