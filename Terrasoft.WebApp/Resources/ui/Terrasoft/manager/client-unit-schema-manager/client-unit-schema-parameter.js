/**
 */
Ext.define("Terrasoft.manager.ClientUnitSchemaParameter", {
	extend: "Terrasoft.manager.ProcessSchemaParameter",
	alternateClassName: "Terrasoft.ClientUnitSchemaParameter",

	// region Properties: Private

	/**
	 * Server-class element name of the schema.
	 * @private
	 * @type {String}
	 */
	typeName: "Terrasoft.Core.ClientUnitSchemaParameter",

	/**
	 * Status of parameter.
	 * @private
	 * @type {String}
	 */
	status: Terrasoft.ModificationStatus.NOT_MODIFIED,

	// endregion

	//region Properties: Public

	/**
	 * Design tool item class name.
	 * @type {String}
	 */
	designToolClassName: "Terrasoft.SchemaParameterDesignToolItem",

	//endregion

	// region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaParameter#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		if (Terrasoft.isEmptyObject(this.sourceValue)) {
			this.sourceValue = {
				value: "",
				displayValue: "",
				source: Terrasoft.ProcessSchemaParameterValueSource.None
			};
		}
	},

	// endregion

	// region Methods: Private

	_restoreComplexLocalizableValue: function(localizableValues) {
		if (!this.sourceValue.hasOwnProperty("value")) {
			return;
		}
		var parameterUId = this.uId;
		var values = this.getLocalizableParameterValues();
		Terrasoft.each(values, function(value) {
			var itemUId = value.ItemUId;
			var lczProperties = Terrasoft.filterObject(value, {"isLczValue": true});
			Terrasoft.each(lczProperties, function(lczProperty, propertyName) {
				var resourceName = "Parameters." + parameterUId + ".Value." + itemUId + "." + propertyName;
				var resource = localizableValues[resourceName];
				if (resource) {
					var lczValue = new Terrasoft.LocalizableString({cultureValues: resource});
					lczProperty.value = lczValue.getValue();
				} else {
					var message = Ext.String.format(Terrasoft.Resources.ProcessSchemaDesigner.Exceptions
						.LocalizableCollectionPropertyNotFoundMessage, propertyName);
					this.error(message);
				}
			}, this);
		}, this);
		this.setLocalizableParameterValues(values);
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaParameter#updateSchemaMapping
	 * @override
	 */
	updateSchemaMapping: Terrasoft.emptyFn,

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaParameter#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.caption = this.caption.getValue();
	},

	/**
	 * @inheritdoc Terrasoft.Terrasoft.ProcessSchemaParameter#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		this.caption = new Terrasoft.LocalizableString({
			cultureValues: localizableValues["Parameters." + this.uId + ".Caption"]
		});
		if (this.getIsComplexLocalizableValueType()) {
			this._restoreComplexLocalizableValue(localizableValues);
		}
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaParameter#getParentSchema.
	 * @override
	 */
	getParentSchema: function() {
		return this.parentSchema;
	},

	/**
	 * Return parameter status.
	 * @return {String}
	 */
	getStatus: function() {
		return this.status;
	},

	/**
	 * Converts client unit schema parameter to process parameter.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	convertToProcessParameter: function() {
		var metaData = this.serialize();
		var initialConfig = Terrasoft.decode(metaData);
		delete initialConfig.typeName;
		return new Terrasoft.ProcessSchemaParameter(initialConfig);
	}

	// endregion

});