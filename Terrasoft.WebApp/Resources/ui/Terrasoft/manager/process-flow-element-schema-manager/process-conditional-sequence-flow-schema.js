/**
 */
Ext.define("Terrasoft.manager.ProcessConditionalSequenceFlowSchema", {
	extend: "Terrasoft.manager.ProcessSequenceFlowSchema",
	alternateClassName: "Terrasoft.ProcessConditionalSequenceFlowSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "dac675d4-ea84-4e44-9056-38bf918618e9",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaConditionalFlow",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.ConditionalFlowCaption,

	/**
	 * Diamond width.
	 * @protected
	 * @type {Number}
	 */
	diamondWidth: 14,

	/**
	 * Diamond height.
	 * @protected
	 * @type {Number}
	 */
	diamondHeight: 8,

	/**
	 * Diamond fill color.
	 * @protected
	 * @type {String}
	 */
	diamondFillColor: "#ffffff",

	/**
	 * Conditions designed for conditional sequence flow element. Key - process activity element uid,
	 * value - object of key-value pairs conditions.
	 * @protected
	 * @type {Object}
	 */
	processActivitiesSelectedResults: null,

	/**
	 * @protected
	 * @type {Object}
	 */
	matchBranchingDecisions: null,

	/**
	 * @inheritdoc Terrasoft.ProcessSequenceFlowSchema#connectionUserHandleName
	 * @override
	 */
	connectionUserHandleName: "ConditionalSequenceFlow",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "ConditionalSequenceFlowPropertiesPage",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "conditionalSequenceFlow_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "conditionalSequenceFlow_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "conditionalSequenceFlow_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	emptyDiagramCaption: false,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessSequenceFlowSchema#flowType
	 * @override
	 * @protected
	 */
	flowType: Terrasoft.ProcessSchemaEditSequenceFlowType.CONDITIONAL,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint:  Terrasoft.Resources.ProcessSchemaDesigner.Elements.ConditionalFlowHint,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.processActivitiesSelectedResults =
			this.decodeProcessActivitiesSelectedResults(this.processActivitiesSelectedResults);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchema#initEvents
	 * @protected
	 * @override
	 */
	initEvents: function() {
		this.on("onSourceChanged", this.onSourceChanged, this);
	},

	//endregion

	//region Methods: Private

	/**
	 * Decode process activities selected results.
	 * @param {String} stringValue Encoded string value.
	 * @return {Object} Object, where key - is previous process activity element uid, value - is object of key-value
	 * pairs. Key - is selected result uid and value - is selected result caption.
	 */
	decodeProcessActivitiesSelectedResults: function(stringValue) {
		var results = {};
		if (Ext.isEmpty(stringValue)) {
			return results;
		}
		var rawValue = Terrasoft.decode(stringValue);
		if (rawValue.hasOwnProperty("$type")) {
			Terrasoft.each(rawValue, function(propertyValue, propertyName) {
				if (propertyName === "$type") {
					return;
				}
				results[propertyName] = propertyValue.$values;
			});
		} else {
			Terrasoft.each(rawValue, function(propertyValue, propertyName) {
				results[propertyName] = propertyValue;
			});
		}
		return results;
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getDiagramConfig
	 * @override
	 */
	getFlowConfig: function() {
		var flowConfig = this.callParent(arguments);
		flowConfig.sourceDecorator = {
			"shape": ej.Diagram.DecoratorShapes.Diamond,
			"width": this.diamondWidth,
			"height": this.diamondHeight,
			"borderColor": this.connectorLineColor,
			"fillColor": this.diamondFillColor
		};
		return flowConfig;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.processActivitiesSelectedResults = JSON.stringify(this.processActivitiesSelectedResults);
	},

	/**
	 * The event handler changed source.
	 * @protected
	 */
	onSourceChanged: function() {
		this.isValidateExecuted = false;
		this.isValid = false;
		this.validationResults = [];
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.un("onSourceChanged", this.onSourceChanged, this);
		this.callParent(arguments);
	}

	//endregion

});
