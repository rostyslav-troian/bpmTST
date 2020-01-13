/**
 */
Ext.define("Terrasoft.manager.ProcessActivitySchema", {
	extend: "Terrasoft.manager.ProcessFlowElementSchema",
	alternateClassName: "Terrasoft.ProcessActivitySchema",

	mixins: {
		parametrizedProcessSchemaElement: "Terrasoft.ParametrizedProcessSchemaElement"
	},

	//region Properties: Protected

	/**
	 * Service contract name.
	 * @protected
	 * @type {String}
	 */
	contractName: "ContractProcessUserTaskSchema",

	/**
	 * Flag that indicates is element used for compensation.
	 * @protected
	 * @type {Boolean}
	 */
	isForCompensation: false,

	/**
	 * Flag that indicates is element user task.
	 * @protected
	 * @type {Boolean}
	 */
	isUserTask: true,

	/**
	 * Schema query filter.
	 * @protected
	 * @type {object}
	 */
	schemaFilter: null,

	/**
	 * Schema manager name.
	 * @protected
	 * @type {String}
	 */
	schemaManagerName: null,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetX
	 * @override
	 */
	silverlightOffsetX: 0,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#silverlightOffsetY
	 * @override
	 */
	silverlightOffsetY: 0,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#width
	 * @override
	 */
	width: 69,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#height
	 * @protected
	 * @override
	 */
	height: 55,

	/**
	 * Entity schema identifier.
	 * @protected
	 * @type {String}
	 */
	entitySchemaUId: null,

	//endregion

	//region Constructors: Public

	constructor: function() {
		this.callParent(arguments);
		this.mixins.parametrizedProcessSchemaElement.constructor.call(this);
		this.schemaFilter = {
			ManagerName: this.schemaManagerName,
			UseExtendParent: false
		};
	},

	//endregion

	//region Methods: Protected

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
		return Ext.Array.push(baseSerializableProperties, ["isUserTask", "isForCompensation", "entitySchemaUId"]);
	},

	//endregion

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.loadParametersLocalizableValues(localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#loadLocalizableValuesByUIds
	 * @override
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		this.callParent(arguments);
		this.loadParametersLocalizableValuesByUIds(localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#getParametersLocalizableValues
	 * @override
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		this.getParametersLocalizableValues(localizableValues);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaElement#internalValidate
	 * Validate parameters.
	 * @override
	 */
	internalValidate: function() {
		var result = this.callParent(arguments);
		var parametersValidationResult = this.validateParameters.apply(this, arguments);
		Ext.Array.push(result, parametersValidationResult);
		return result;
	}

});
