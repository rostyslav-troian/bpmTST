/**
 */
Ext.define("Terrasoft.configuration.BaseProcessSchemaItem", {
	extend: "Terrasoft.manager.BaseSchema",
	alternateClassName: "Terrasoft.BaseProcessSchemaItem",

	//region Properties: Public

	/**
	 * Process element server class name.
	 * @type {String}
	 */
	typeName: null,

	/**
	 * Parent schema
	 * @type {Terrasoft.manager.BaseProcessSchema}
	 */
	parentSchema: null,

	/**
	 * Element properties validation results.
	 * @type {Object[]}
	 */
	validationResults: null,

	/**
	 * Flag that indicates whether element is valid.
	 * @type {Boolean}
	 */
	isValid: true,

	/**
	 * Flag that indicates whether element property page executes validation.
	 * @type {Boolean}
	 */
	isValidateExecuted: true,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#constructor
	 * @override
	 */
	constructor: function() {
		this.validationResults = [];
		this.callParent(arguments);
	},

	//endregion

	//region Methods: Private

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var properties = this.callParent(arguments);
		return Ext.Array.push(properties, ["typeName", "isValid"]);
	},

	//endregion

	//region Methods: Protected

	/**
	 * Check that parentSchema is not null.
	 * @throws Terrasoft.NullOrEmptyException if parent schema is null.
	 * @protected
	 */
	checkParentSchema: function() {
		if (!this.parentSchema) {
			throw new Terrasoft.NullOrEmptyException();
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * Internal validation of process schema element.
	 * @return {Object[]} Validation results.
	 */
	internalValidate: function() {
		return [];
	}

	//endregion

});
