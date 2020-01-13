Ext.ns("Terrasoft.Core.Process");

Ext.define("Terrasoft.manager.ProcessSchemaParameter", {
	extend: "Terrasoft.manager.ProcessBaseElementSchema",
	alternateClassName: "Terrasoft.ProcessSchemaParameter",

	//region Properties: Private

	/**
	 * Server-class element name of the process.
	 * @private
	 * @type {String}
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaParameter",

	/**
	 * Technical property for compatibility with old designer.
	 * @private
	 * @type {String}
	 */
	sourcePath: null,

	/**
	 * Technical property for compatibility with old designer.
	 * @private
	 * @type {String}
	 */
	sourceMetaPath: null,

	/**
	 * Technical property for compatibility with old designer.
	 * @private
	 * @type {String}
	 */
	targetMetaPath: null,

	/**
	 * Technical property for compatibility with old designer.
	 * @private
	 * @type {String}
	 */
	targetPath: null,

	/**
	 * Technical property for compatibility with old designer.
	 * @private
	 * @type {String}
	 */
	group: null,

	/**
	 * Ignores mapping value validation if true.
	 * @private
	 * @type {Boolean}
	 */
	skipValidation: false,

	/**
	 * Ignores parameter in remove validation.
	 * @private
	 * @type {Boolean}
	 */
	forceRemove: false,

	/**
	 * Parent.
	 * @private
	 * @type {Terrasoft.ProcessSchemaParameter}
	 */
	_parent: null,

	//endregion

	//region Properties: Protected

	/**
	 * Parameter name.
	 * @protected
	 * @type {String}
	 */
	name: "ProcessSchemaParameter",

	/**
	 * Parameter data type.
	 * @protected
	 * @type {Terrasoft.DataValueType|String}
	 */
	dataValueType: Terrasoft.data.constants.GUID_EMPTY,

	/**
	 * Parameter direction.
	 * @protected
	 * @type {Terrasoft.process.enums.ProcessSchemaParameterDirection}
	 */
	direction: Terrasoft.process.enums.ProcessSchemaParameterDirection.VARIABLE,

	/**
	 * Flag copy the value.
	 * @protected
	 * @type {Boolean}
	 */
	isCopyValue: false,

	/**
	 * Flag contains owner Id.
	 * @protected
	 * @type {Boolean}
	 */
	isPerformer: false,

	/**
	 * Flag, is parameter required.
	 * @protected
	 * @type {Boolean}
	 */
	isRequired: false,

	/**
	 * Flag, is parameter resulting.
	 * @protected
	 * @type {Boolean}
	 */
	isResult: false,

	/**
	 * Flag indicating whether the parameter supports lazy loading.
	 * @protected
	 * @type {Boolean}
	 */
	isLazy: false,

	/**
	 * Flag indicating whether the parameter support lazy value and loaded.
	 * @protected
	 * @type {Boolean}
	 */
	isLoaded: false,

	/**
	 * Flag, is value serializable.
	 * @protected
	 * @type {Boolean}
	 */
	isValueSerializable: true,

	/**
	 * Schema identifier, in which the element was modified.
	 * @protected
	 * @type {String}
	 */
	modifiedInSchemaUId: null,

	/**
	 * Lookup entity schema name.
	 * @protected
	 * @type {String}
	 */
	referenceSchemaName: "",

	/**
	 * Lookup entity schema identifier.
	 * @protected
	 * @type {String}
	 */
	referenceSchemaUId: null,

	/**
	 * Parameter value.
	 * @protected
	 * @type {Object}
	 */
	sourceValue: null,

	/**
	 * Process element.
	 * @type {Terrasoft.ProcessFlowElementSchema}
	 */
	processFlowElementSchema: null,

	/**
	 * Tag.
	 * @protected
	 * @type {String}
	 */
	tag: null,

	/**
	 * Item properties.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	itemProperties: null,

	/**
	 * Source parameter identifier.
	 * @protected
	 * @type {String}
	 */
	sourceParameterUId: null,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.uId = this.uId || Terrasoft.generateGUID();
		this.sourceValue = this.sourceValue || {};
		this._initItemProperties(config && config.itemProperties);
		this._initClientDataValueType();
		this.addEvents("changed");
		delete this.description;
		delete this.extendParent;
		delete this.packageUId;
	},

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_onItemPropertiesAdd: function(parameter) {
		parameter._parent = this;
	},

	/**
	 * @private
	 */
	_initItemProperties: function(items) {
		this.itemProperties = new Terrasoft.Collection();
		this.itemProperties.on("add", this._onItemPropertiesAdd, this);
		Terrasoft.each(items, function(parameterConfig) {
			var parameter = Terrasoft.isInstanceOfClass(parameterConfig, "Terrasoft.ProcessSchemaParameter")
				? parameterConfig
				: Ext.create("Terrasoft.ProcessSchemaParameter", parameterConfig);
			this.itemProperties.add(parameterConfig.uId, parameter);
		}, this);
	},

	/**
	 * @private
	 */
	_requiredValidator: function() {
		if (this.processFlowElementSchema instanceof Terrasoft.ProcessWebServiceSchema &&
				this.isRequired && !this.sourceValue.value && !Ext.isBoolean(this.sourceValue.value)) {
			return {
				validationType: Terrasoft.ValidationType.ERROR,
				message: Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage
			};
		}
	},

	/**
	 * @private
	 */
	_mappingValidator: function() {
		var mapping = this.getMappingValue();
		if (!mapping.isValid) {
			return {
				validationType: Terrasoft.ValidationType.ERROR,
				message: "Invalid \"" + this.getDisplayValue() + "\" parameter value."
			};
		}
	},

	/**
	 * @private
	 */
	_getInvalidMessage: function() {
		return "Invalid \"" + this.getDisplayValue() + "\" parameter value.";
	},

	/**
	 * @private
	 */
	_constValidator: function() {
		var mapping = this.getMappingValue();
		if (mapping.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue &&
			!Terrasoft.isJsonObject(mapping.value, false)) {
			var templates = this.getMetaPathValidationRegexps();
			templates.forEach(function(template) {
				if (template.exec(mapping.value)) {
					return {
						validationType: Terrasoft.ValidationType.ERROR,
						message: this._getInvalidMessage()
					};
				}
			}, this);
		}
	},

	/**
	 * @private
	 */
	_initClientDataValueType: function() {
		var dataValueType = this.dataValueType;
		if (Terrasoft.isGUID(dataValueType) && !Terrasoft.isEmptyGUID(dataValueType)) {
			this.dataValueType = Terrasoft.convertToClientDataValueType(dataValueType);
		}
	},

	/**
	 * @private
	 */
	_cloneItemProperties: function() {
		var clonedItemProperties = new Terrasoft.Collection();
		this.itemProperties.each(function(nestedParameter) {
			clonedItemProperties.add(nestedParameter.clone());
		});
		return clonedItemProperties;
	},

	/**
	 * Returns the instance of the class Terrasoft.LocalizableString with the specified value.
	 * @param {Terrasoft.LocalizableString|string} value The value for which you want to return a localized string.
	 * @private
	 * @return {Terrasoft.LocalizableString}
	 */
	getLocalizableString: function(value) {
		var result = value;
		if (!(value instanceof Terrasoft.LocalizableString)) {
			result = Ext.create("Terrasoft.LocalizableString");
			result.setValue(value);
		}
		return result;
	},

	/**
	 * Indicates that the parameter value is of complex localizable type.
	 * @protected
	 * @return {Boolean}
	 */
	getIsComplexLocalizableValueType: function() {
		var dataValueType = this.dataValueType;
		return (dataValueType === Terrasoft.DataValueType.LOCALIZABLE_PARAMETER_VALUES_LIST) ||
			(dataValueType === Terrasoft.DataValueType.ENTITY_COLUMN_MAPPING_COLLECTION);
	},

	/**
	 * Returns current localizable collection values.
	 * @protected
	 * @return {Object[]}
	 */
	getLocalizableParameterValues: function() {
		var metaDataCollectionValue = this.getValue();
		metaDataCollectionValue = Terrasoft.utils.common.json.decode(metaDataCollectionValue);
		return metaDataCollectionValue.$values;
	},

	/**
	 * Restores the complex localizable value.
	 * @private
	 * @param {Object} localizableValues Localized resources.
	 */
	restoreComplexLocalizableValue: function(localizableValues) {
		if (!this.sourceValue.hasOwnProperty("value") || !localizableValues.Value) {
			return;
		}
		var localizableParameterValues = this.getLocalizableParameterValues();
		localizableParameterValues.forEach(function(item) {
			var localizableResourceData = localizableValues.Value[item.ItemUId];
			for (var propertyName in item) {
				if (item.hasOwnProperty(propertyName) || (propertyName === "ItemUId")) {
					var itemProperty = item[propertyName];
					if (itemProperty.isLczValue) {
						if (localizableResourceData) {
							var lczValue = Ext.create("Terrasoft.LocalizableString", {
								cultureValues: localizableResourceData[propertyName]
							});
							itemProperty.value = lczValue.getValue();
						} else {
							var message = Ext.String.format(Terrasoft.Resources.ProcessSchemaDesigner.Exceptions
								.LocalizableCollectionPropertyNotFoundMessage, propertyName);
							this.error(message);
						}
					}
				}
			}
		}, this);
		this.setLocalizableParameterValues(localizableParameterValues);
	},

	/**
	 * Indicates that source values are equal.
	 * @private
	 * @param {Object} sourceValue1 The first source value.
	 * @param {Object} sourceValue2 The second source value.
	 * @return {Boolean}
	 */
	getIsSourceValueEquals: function(sourceValue1, sourceValue2) {
		var value1 = sourceValue1.value || "";
		var value2 = this.convertDataValueByType(sourceValue2) || "";
		var displayValue1 = sourceValue1.displayValue || "";
		var displayValue2 = sourceValue2.displayValue || "";
		var source1 = sourceValue1.source || null;
		var source2 = sourceValue2.source || null;
		var referenceSchemaUId1 = sourceValue1.referenceSchemaUId || this.referenceSchemaUId;
		var referenceSchemaUId2 = sourceValue2.referenceSchemaUId || this.referenceSchemaUId;
		value1 = this._getStringValue(value1);
		value2 = this._getStringValue(value2);
		displayValue1 = this._getStringValue(displayValue1);
		displayValue2 = this._getStringValue(displayValue2);
		return value1 === value2 &&
			displayValue1 === displayValue2 &&
			source1 === source2 &&
			referenceSchemaUId1 === referenceSchemaUId2;
	},

	/**
	 * Clears parameter source value.
	 */
	clearSourceValue: function() {
		var sourceValue = this.sourceValue;
		if (sourceValue) {
			sourceValue.value = this.getIsValueLocalizable() ? "" : null;
			sourceValue.displayValue = Ext.create("Terrasoft.LocalizableString");
			sourceValue.source = Terrasoft.ProcessSchemaParameterValueSource.None;
		}
		this.itemProperties.each(function(nestedParameter) {
			nestedParameter.clearSourceValue();
		}, this);
	},

	/**
	 * Returns server data value type identifier by specified client data value type.
	 * @private
	 * @param {Terrasoft.DataValueType|String} dataValueType Data value type.
	 * @return {String}
	 */
	convertToServerDataValueType: function(dataValueType) {
		var isServerDataValueType = Terrasoft.isGUID(dataValueType);
		return isServerDataValueType ? dataValueType : Terrasoft.convertToServerDataValueType(dataValueType);
	},

	/**
	 * Gets a value indicating where parameter value can be localized.
	 * @private
	 * @return {Boolean} True, if value is localizable, otherwise - false.
	 */
	getIsValueLocalizable: function() {
		var sourceValue = this.sourceValue;
		var sources = Terrasoft.process.enums.ProcessSchemaParameterValueSource;
		if (sourceValue && (sourceValue.source === sources.Script || sourceValue.source === sources.Mapping)) {
			return false;
		}
		var dataValueType = this.dataValueType;
		return Terrasoft.isTextDataValueType(dataValueType);
	},

	/**
	 * Returns pattern to check mapping on parameter for value.
	 * @private
	 * @return {RegExp}
	 */
	getParameterMappingRegexp: function() {
		var schemaOwnerSearchString = "\\[IsOwnerSchema:(true|false)\\]";
		var isSchemaSearchString = "\\[IsSchema:(true|false)\\]";
		var elementSearchString = "(?:\\[Element:\\{.*?\\}\\])*";
		var parameterSearchString = "(\\[Parameter:\\{.*?\\}\\])";
		var regexpTemplate = "(\\[#{0}\\.{1}\\.{2}\\.*{3}#\\])";
		var searchString = Terrasoft.getFormattedString(regexpTemplate, schemaOwnerSearchString, isSchemaSearchString,
			elementSearchString, parameterSearchString);
		return new RegExp(searchString, "g");
	},

	/**
	 * Returns pattern to check lookup mapping for value.
	 * @private
	 * @return {RegExp}
	 */
	getLookupMappingRegexp: function() {
		return /(\[#Lookup\.)/g;
	},

	/**
	 * Returns pattern to check SysSettings mapping for value.
	 * @private
	 * @return {RegExp}
	 */
	getSysSettingMappingRegexp: function() {
		return /(\[#SysSettings\.)/g;
	},

	/**
	 * Returns pattern to check SysVariable mapping for value.
	 * @private
	 * @return {RegExp}
	 */
	getSysVariableMappingRegexp: function() {
		return /(\[#SysVariable\.)/g;
	},

	/**
	 * Returns pattern to check Date, Time and DateTime value mapping parameter value.
	 * @private
	 * @return {RegExp}
	 */
	getDateTimeMappingRegexp: function() {
		return /(\[#(DateValue|TimeValue|DateTimeValue)\.)/g;
	},

	/**
	 * Returns patterns to check mapping for parameter value.
	 * @private
	 * @return {Object[]}
	 */
	getMetaPathValidationRegexps: function() {
		return [
			this.getParameterMappingRegexp(),
			this.getLookupMappingRegexp(),
			this.getSysSettingMappingRegexp(),
			this.getSysVariableMappingRegexp(),
			this.getDateTimeMappingRegexp()
		];
	},

	/**
	 * @private
	 */
	_getStringValue: function(value) {
		return value instanceof Terrasoft.LocalizableString
			? value.getValue() || ""
			: value;
	},

	/**
	 * @private
	 */
	_processSetterOptions: function(options) {
		if (options && options.clearParentValue) {
			this.tryClearParentValue();
		}
	},

	/**
	 * @private
	 */
	_getEmptyValue: function() {
		return {
			value: null,
			displayValue: null,
			source: Terrasoft.ProcessSchemaParameterValueSource.None
		};
	},

	/**
	 * @private
	 */
	_findMappingParameter: function(parameterInfo) {
		var processSchema = this.getParentSchema();
		var mappingParameter = Terrasoft.FormulaParserUtils.findMappingParameter(parameterInfo, processSchema);
		return mappingParameter;
	},

	/**
	 * @private
	 */
	_clearReferenceSchemaName: function() {
		if (this.referenceSchemaUId) {
			delete this.referenceSchemaName;
		}
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		var dataValueType = this.dataValueType;
		if (Terrasoft.isEmptyGUID(dataValueType)) {
			return;
		}
		dataValueType = this.convertToServerDataValueType(dataValueType);
		serializableObject.dataValueType = this.getSerializableProperty(dataValueType);
		if (this.itemProperties && !this.itemProperties.isEmpty()) {
			serializableObject.itemProperties = [];
			this.itemProperties.each(function(parameter) {
				var parameterMetaData = {};
				parameter.getSerializableObject(parameterMetaData);
				serializableObject.itemProperties.push(parameterMetaData);
			}, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		var removeProperties = ["caption", "description", "extendParent", "packageUId", "skipValidation",
			"forceRemove"];
		removeProperties.forEach(function(propertyName) {
			Ext.Array.remove(baseSerializableProperties, propertyName);
		});
		return Ext.Array.push(baseSerializableProperties, ["sourceValue", "sourceMetaPath", "sourcePath",
			"targetMetaPath", "targetPath", "isRequired", "referenceSchemaUId", "referenceSchemaName",
			"isValueSerializable", "direction", "isResult", "isPerformer", "isCopyValue", "isLazy", "tag",
			"sourceParameterUId"]);
	},

	/**
	 * Returns parameter parent schema.
	 * @protected
	 * @return {Terrasoft.manager.BaseSchema}
	 */
	getParentSchema: function() {
		var parentSchema = this.processFlowElementSchema &&
				(this.processFlowElementSchema.parentSchema || this.processFlowElementSchema);
		if (parentSchema) {
			return parentSchema;
		} else {
			var rootParent = this._parent;
			while (Terrasoft.instanceOfClass(rootParent, "Terrasoft.ProcessSchemaParameter") && rootParent.getParent()) {
				rootParent = rootParent.getParent();
			}
			return rootParent.processFlowElementSchema.parentSchema || rootParent.processFlowElementSchema;
		}
	},

	/**
	 * Clear parent parameter value.
	 * @protected
	 */
	tryClearParentValue: function() {
		var result = this._parent && this._parent.hasValue() && !this._parent.hasCollectionInNestedParameterValues();
		if (result) {
			this._parent.setMappingValue(this._getEmptyValue(), { clearParentValue: true });
		}
		return result;
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns current culture value caption including parent caption.
	 * @public
	 * @return {String}
	 */
	getFullCaption: function() {
		var captionValue = this.caption.getValue() || this.name;
		return this._parent
			? this._parent.getFullCaption() + ":" + captionValue
			: captionValue;
	},

	/**
	 * Returns parent if parameter has parent.
	 * @return {Terrasoft.ProcessSchemaParameter|null}
	 */
	getParent: function() {
		return this._parent;
	},

	/**
	 * Returns has parent indicator.
	 * @return {Boolean}
	 */
	hasParent: function() {
		return !Ext.isEmpty(this._parent);
	},

	/**
	 * Returns parents uIds.
	 * @return {Array}
	 */
	getHierarchicalParentsUIds: function() {
		var uIds = [];
		var parent = this._parent;
		if (parent) {
			uIds.push(parent.uId);
			uIds = _.union(uIds, parent.getHierarchicalParentsUIds());
		}
		return uIds;
	},

	/**
	 * Returns flag that indicates if parameter has value.
	 * @return {Boolean}
	 */
	hasValue: function() {
		var value = this.getMappingValue();
		return value.source !== Terrasoft.ProcessSchemaParameterValueSource.None;
	},

	/**
	 * Returns the value of the parameter.
	 * @return {String}
	 */
	getValue: function() {
		var sourceValue = this.sourceValue;
		var value = sourceValue.value;
		// TODO: #CRM-21702
		if (value instanceof Terrasoft.LocalizableString) {
			value = value.getValue();
		}
		if (value && this.getIsConstBooleanParameter(sourceValue)) {
			value = value.toLowerCase() === "true";
		}
		if (!value && this.getIsConstNumberParameter(sourceValue)) {
			value = "0";
		}
		return value;
	},

	/**
	 * Returns a display value.
	 * @return {String}
	 */
	getParameterDisplayValue: function() {
		var displayValue = this.sourceValue.displayValue;
		if (displayValue) {
			return displayValue.getValue();
		} else {
			return null;
		}
	},

	/**
	 * Returns mapping value.
	 * @return {Object}
	 * @return {String} return.value Parameter value.
	 * @return {String} return.displayValue Parameter display value.
	 * @return {String} return.referenceSchemaUId Lookup schema identifier.
	 * @return {Terrasoft.DataValueType} return.dataValueType Parameter data value type.
	 * @return {Boolean} return.isValid Parameter validation flag.
	 */
	getMappingValue: function() {
		var value = this.getValue();
		var displayValue = this.getParameterDisplayValue();
		var source = this.getValueSource();
		return {
			value: value || null,
			displayValue: displayValue || value || null,
			source: source,
			referenceSchemaUId: this.referenceSchemaUId,
			dataValueType: this.dataValueType,
			isValid: this.isValid
		};
	},

	/**
	 * Returns value source.
	 * @return {Terrasoft.process.enums.ProcessSchemaParameterValueSource}
	 */
	getValueSource: function() {
		return this.sourceValue.source || Terrasoft.ProcessSchemaParameterValueSource.None;
	},

	/**
	 * Sets mapping value.
	 * @param {Object} value Mapping.
	 * @param {String} value.value Mapping value.
	 * @param {String} value.displayValue Display value.
	 * @param {String} value.referenceSchemaUId Entity schema identifier.
	 * @param {Terrasoft.ProcessSchemaParameterValueSource} value.source Mapping type.
	 * @param {Object} options Setter options.
	 * @param {Boolean} options.clearParentValue Indicates if parent value should be cleared.
	 */
	setMappingValue: function(value, options) {
		var sourceValue = this.sourceValue;
		if (this.getIsSourceValueEquals(sourceValue, value)) {
			return;
		}
		sourceValue.value = this.convertDataValueByType(value);
		sourceValue.source = value.source;
		if (!sourceValue.displayValue) {
			sourceValue.displayValue = Ext.create("Terrasoft.LocalizableString");
		}
		var displayValue = value.displayValue && value.displayValue.toString();
		sourceValue.displayValue.setValue(displayValue);
		sourceValue.referenceSchemaUId = value.referenceSchemaUId;
		this.referenceSchemaUId = value.referenceSchemaUId;
		this._clearReferenceSchemaName();
		this.updateSchemaMapping();
		this.fireEvent("changed", {}, this);
		this._processSetterOptions(options);
	},

	/**
	 * Sets the constant value of the parameter.
	 * @param {Object} value Configuration object.
	 */
	setValue: function(value) {
		var sourceValue = this.sourceValue;
		if (this.getIsSourceValueEquals(sourceValue, value)) {
			return;
		}
		Ext.apply(sourceValue, value);
		if (sourceValue.value) {
			sourceValue.value = this.convertDataValueByType(sourceValue);
		}
		this.updateSchemaMapping();
		this.fireEvent("changed", {}, this);
	},

	/**
	 * Updates mapping with parent schema.
	 */
	updateSchemaMapping: function() {
		var parentSchema = this.getParentSchema();
		parentSchema.changeMapping(this);
		this.sourceValue.modifiedInSchemaUId = parentSchema.uId;
		this.setPropertyValue("isValid", true);
	},

	/**
	 * Sets current localizable collection values.
	 * @param {Object[]} localizableParameterValues Localizable collection values.
	 */
	setLocalizableParameterValues: function(localizableParameterValues) {
		localizableParameterValues = localizableParameterValues || [];
		var localizableParameterValuesList = Terrasoft.utils.common.json.encode({
			"$type": "Terrasoft.Core.Process.LocalizableParameterValuesList, Terrasoft.Core",
			"$values": localizableParameterValues
		});
		var ValueSource = Terrasoft.process.enums.ProcessSchemaParameterValueSource;
		this.setValue({
			value: localizableParameterValuesList,
			source: (localizableParameterValues.length > 0) ? ValueSource.ConstValue : ValueSource.None
		});
	},

	/**
	 * Returns a copy of the parameter.
	 * @return {Terrasoft.ProcessSchemaParameter}
	 */
	clone: function() {
		return new this.self({
			name: this.name,
			caption: this.caption.clone(),
			dataValueType: this.dataValueType,
			createdInSchemaUId: this.createdInSchemaUId,
			modifiedInSchemaUId: this.modifiedInSchemaUId,
			createdInPackageId: this.createdInPackageId,
			managerItemUId: this.managerItemUId,
			createdInOwnerSchemaUId: this.createdInOwnerSchemaUId,
			ownerSchemaManagerName: this.ownerSchemaManagerName,
			sourceValue: this.cloneSourceValue(),
			sourceMetaPath: this.sourceMetaPath,
			sourcePath: this.sourcePath,
			targetMetaPath: this.targetMetaPath,
			targetPath: this.targetPath,
			isRequired: this.isRequired,
			referenceSchemaUId: this.referenceSchemaUId,
			referenceSchemaName: this.referenceSchemaName,
			isValueSerializable: this.isValueSerializable,
			direction: this.direction,
			isResult: this.isResult,
			isPerformer: this.isPerformer,
			isCopyValue: this.isCopyValue,
			containerUId: this.containerUId,
			dragGroupName: this.dragGroupName,
			processFlowElementSchema: this.processFlowElementSchema,
			skipValidation: this.skipValidation,
			forceRemove: this.forceRemove,
			isLazy: this.isLazy,
			isValid: this.isValid,
			tag: this.tag,
			itemProperties: this._cloneItemProperties(),
			sourceParameterUId: this.sourceParameterUId
		});
	},

	/**
	 * Returns a copy of the parameter value.
	 * @return {Object}
	 */
	cloneSourceValue: function() {
		var sourceValue = this.sourceValue;
		var clonedSourceValue = Terrasoft.deepClone(sourceValue);
		if (sourceValue.displayValue) {
			clonedSourceValue.displayValue = sourceValue.displayValue.clone();
		}
		if (sourceValue.value instanceof Terrasoft.LocalizableString) {
			clonedSourceValue.value = sourceValue.value.clone();
		}
		return clonedSourceValue;
	},

	/**
	 * Converts data value by type.
	 * @private
	 * @param {Object} sourceValue Source value.
	 * @return {Object}
	 */
	convertDataValueByType: function(sourceValue) {
		var value = sourceValue.value;
		if (this.getIsConstBooleanParameter(sourceValue)) {
			return value ? value.toString() : "false";
		} else if (this.getIsConstNumberParameter(sourceValue)) {
			return value || "0";
		}
		return value;
	},

	/**
	 * Returns flag that indicates parameter has constant source and type boolean.
	 * @private
	 * @return {Boolean}.
	 */
	getIsConstBooleanParameter: function(sourceValue) {
		return this.dataValueType === Terrasoft.DataValueType.BOOLEAN &&
			(sourceValue.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue || !sourceValue.source);
	},

	/**
	 * Returns flag that indicates parameter has constant source and number type.
	 * @private
	 * @return {Boolean}.
	 */
	getIsConstNumberParameter: function(sourceValue) {
		var dataValueType = this.dataValueType;
		return Terrasoft.isNumberDataValueType(dataValueType) &&
			(sourceValue.source === Terrasoft.ProcessSchemaParameterValueSource.ConstValue);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#setName
	 * @override
	 */
	setName: function(name) {
		this.setPropertyValue("name", name);
	},

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#getName
	 * @override
	 */
	getName: function() {
		return this.name;
	},

	/**
	 * Returns flag that indicates is parameter created in current process schema.
	 * @return {Boolean}
	 */
	getIsDynamic: function() {
		var parentSchema = this.getParentSchema();
		if (parentSchema.isUserTask) {
			return false;
		}
		return this.createdInSchemaUId === parentSchema.uId;
	},

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#loadLocalizableValues
	 * @override
	 */
	loadLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		if (!localizableValues) {
			return;
		}
		if (this.getIsComplexLocalizableValueType()) {
			this.restoreComplexLocalizableValue(localizableValues);
		}
		var sourceValue = this.sourceValue;
		if (sourceValue) {
			sourceValue.displayValue = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: localizableValues.DisplayValue
			});
			if (this.getIsValueLocalizable()) {
				sourceValue.value = Ext.create("Terrasoft.LocalizableString", {
					cultureValues: localizableValues.Value
				});
			}
		}
		this.itemProperties.each(function(nestedParameter) {
			nestedParameter.loadLocalizableValues(localizableValues[nestedParameter.name]);
		});
	},

	/**
	 * Loads a localized resource settings by UIds.
	 * @param {Object} localizableValues Localized resources.
	 * @private
	 */
	loadLocalizableValuesByUIds: function(localizableValues) {
		if (!localizableValues) {
			return;
		}
		var uid = this.uId;
		this.caption = Ext.create("Terrasoft.LocalizableString", {
			cultureValues: localizableValues[uid + ".caption"]
		});
		var sourceValue = this.sourceValue;
		if (sourceValue) {
			sourceValue.displayValue = Ext.create("Terrasoft.LocalizableString", {
				cultureValues: localizableValues[uid + ".displayValue"]
			});
			if (this.getIsValueLocalizable()) {
				sourceValue.value = Ext.create("Terrasoft.LocalizableString", {
					cultureValues: localizableValues[uid + ".value"]
				});
			}
		}
	},

	/**
	 * Returns an object with parameter localized resources.
	 * @param {Object} localizableValues The object where localized resources are recorded.
	 */
	getLocalizableValues: function(localizableValues) {
		this.callParent(arguments);
		var uid = this.uId;
		var sourceValue = this.sourceValue;
		if (sourceValue) {
			var displayValue = this.isLazy ? {} : this.getLocalizableString(sourceValue.displayValue);
			localizableValues[uid + ".displayValue"] = this.getSerializableProperty(displayValue);
			if (this.getIsValueLocalizable()) {
				var value = this.getLocalizableString(sourceValue.value);
				localizableValues[uid + ".value"] = this.getSerializableProperty(value);
			}
		}
	},

	/**
	 * Returns has nested parameter value indicator.
	 * @public
	 * @param {Array} excludeUIds UIds exclude items.
	 * @return {Boolean}.
	 */
	hasCollectionInNestedParameterValues: function(excludeUIds) {
		excludeUIds = excludeUIds || [];
		var hasNestedParameterValue = false;
		if (this.hasNestedParameters()) {
			this.itemProperties.each(function (item) {
				if (!Ext.Array.contains(excludeUIds, item.uId)) {
					hasNestedParameterValue = hasNestedParameterValue || item.hasCollectionValue();
				}
			});
		}
		return hasNestedParameterValue;
	},

	/**
	 * Returns has collection value indicator.
	 * @public
	 * @return {Boolean}.
	 */
	hasCollectionValue: function() {
		var result = false;
		if (this.hasValue()) {
			const parameterInfo = Terrasoft.FormulaParserUtils.getParameterMappingInfo(this.sourceValue.value);
			const parameter = this._findMappingParameter(parameterInfo);
			result = parameter ? parameter.hasParent() : false;
		}
		return result;
	},

	/**
	 * Validates parameter value.
	 * @return {Object[]} Parameter validation results.
	 */
	validate: function() {
		var result;
		if (!this.skipValidation) {
			var validators = [this._requiredValidator, this._mappingValidator, this._constValidator];
			_.find(validators, function(validator) {
				result = validator.call(this);
				return result;
			}, this);
		}
		return result ? [result] : [];
	},

	/**
	 * Returns true - when parameter has one or more nestedProperties, false - otherwise.
	 * @return {Boolean}.
	 */
	hasNestedParameters: function() {
		return this.itemProperties && !this.itemProperties.isEmpty();
	},

	/**
	 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
	 * @overridden
	 */
	onDestroy: function() {
		this.itemProperties.un("add", this._parametersAddHandler, this);
		this.callParent(arguments);
	}

	//endregion

});

/**
 * Flag that indicates that the parameter is inherited.
 * @return {Boolean}
 */
Object.defineProperty(Terrasoft.ProcessSchemaParameter.prototype, "isInherited", {
	get: function() {
		var parentSchema = this.getParentSchema();
		return parentSchema && parentSchema.uId !== this.createdInSchemaUId;
	},
	enumerable: true
});

Terrasoft.Core.Process.ProcessSchemaParameter = Terrasoft.ProcessSchemaParameter;
