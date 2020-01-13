/**
 */
Ext.define("Terrasoft.manager.ProcessBaseEventSchema", {
	extend: "Terrasoft.ProcessFlowElementSchema",
	alternateClassName: "Terrasoft.ProcessBaseEventSchema",

	//region Mixins

	mixins: {
		parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
	},

	//endregion

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#nodeType
	 * @override
	 */
	nodeType: Terrasoft.diagram.UserHandlesConstraint.Event,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#width
	 * @override
	 */
	width: 27,//45,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#height
	 * @override
	 */
	height: 27,//45,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetX
	 * @override
	 */
	silverlightOffsetX: 0,//18,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetY
	 * @override
	 */
	silverlightOffsetY: 0,//18,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 * @override
	 */
	emptyDiagramCaption: true,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#captionWidth
	 * @override
	 */
	captionWidth: 80,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#color
	 * @override
	 */
	color: "#F79552",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#editPageSchemaName
	 * @override
	 */
	editPageSchemaName: "ProcessBaseEventPropertiesPage",

	/**
	 * Entity schema identifier.
	 * @protected
	 * @type {String}
	 */
	entitySchemaUId: null,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getShape
	 * @override
	 */
	getShape: function() {
		return {
			"type": ej.Diagram.Shapes.Ellipse
		};
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessFlowElementSchema#getConnectionUserHandles
	 * @override
	 */
	getConnectionUserHandles: function() {
		return ["SequenceFlow"];
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function() {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.getSerializableObject.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["entitySchemaUId"]);
	},

	//endregion

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.loadParametersLocalizableValues.call(this, localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#loadLocalizableValuesByUIds
	 * @override
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.loadParametersLocalizableValuesByUIds.call(this, localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getLocalizableValues
	 * @override
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.getParametersLocalizableValues.call(this, localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaElement#internalValidate
	 * Validate parameters.
	 * @override
	 */
	internalValidate: function() {
		var result = this.callParent(arguments);
		var parametersValidationResult =
			this.mixins.parametrizedProcessSchemaElement.validateParameters.apply(this, arguments);
		Ext.Array.push(result, parametersValidationResult);
		return result;
	}

});
