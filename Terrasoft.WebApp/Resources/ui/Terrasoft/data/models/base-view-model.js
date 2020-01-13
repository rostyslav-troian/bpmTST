Ext.ns("Terrasoft.model");

/**
 * Base class of the model. An instance of a model is one entity and methods for working with this entity.
 * @abstract
 */
Ext.define("Terrasoft.model.BaseViewModel", {
	extend: "Terrasoft.model.BaseModel",
	alternateClassName: "Terrasoft.BaseViewModel",

	mixins: {
		entityBaseViewModelMixin: "Terrasoft.EntityBaseViewModelMixin",
		viewModelResourcesMixin: "Terrasoft.ViewModelResourcesMixin"
	},

	/**
	 * Collection of data model
	 * @type {Terrasoft.DataModelCollection}
	 */
	dataModelCollection: null,

	/**
	 * The configuration of the columns that is moved to the configuration object upon initialization
	 * @private
	 * @type {Object}
	 */
	rowConfig: null,

	/**
	 * Model name.
	 * @type {String}
	 */
	name: "",

	/**
	 * The name of the standard model method for retrieving the column values of the directory
	 * @private
	 * @type {String}
	 */
	defLoadLookupDataMethod: "loadLookupData",

	/**
	 * Name of the extended method "loadLookupData" that can handle configs.
	 * @private
	 * @type {String}
	 */
	loadLookupDataMethod: "loadLookupDataWithParams",

	/**
	 * Current load lookup data requests instance id.
	 * @type {Object}
	 */
	lookupDataRequestInstanceId: null,

	/**
	 * The name of the standard model method for obtaining the main image
	 * @type {String}
	 */
	defGetLookupImageUrlMethod: "getLookupImageUrl",

	/**
	 * The name of the standard model method for obtaining the main image
	 * @type {String}
	 */
	defHasNestingColumnName: "HasNesting",

	/**
	 * Indicates a new record that has not yet been stored on the server
	 * @type {Boolean}
	 */
	isNew: true,

	/**
	 * Indicates that the record was deleted on the server
	 * @type {Boolean}
	 */
	isDeleted: false,

	/**
	 * Indicates that the model supports validation
	 * @override
	 * @type {Boolean}
	 */
	canValidate: true,

	/**
	 * A set of functions for validating the values of individual attributes of the model, as well as the whole model
	 * @type {Object}
	 */
	validationConfig: null,

	/**
	 * Sign that list had been fully loaded.
	 * @private
	 * @type {Boolean}
	 */
	isListFullyLoaded: false,

	/**
	 * An object containing a composite object with the results of validating each field
	 * @type {Object}
	 */
	validationInfo: null,

	/**
	 * Object that contains paging parameters.
	 * @private
	 * @type {Object}
	 */
	pagingParams: null,

	/**
	 * Array of system columns columnPaths.
	 * @protected
	 * @type {String[]}
	 */
	ignoredSystemColumns: ["CreatedOn", "ModifiedOn"],

	/**
	 * @private
	 */
	_isAllowZeroValueSatisfied: function(value, column) {
		return (column && column.allowZeroValue && value === 0);
	},

	/**
	 * @private
	 */
	_isDefaultConditionSatisfied: function(value, column) {
		return value || Terrasoft.isEmptyObject(column) || Ext.isBoolean(value) ||
			(column.isRequired || column.isRequiredOnPage) === false;
	},

	/**
	 * Creates model instance.
	 * @param {Object} config Configuration object.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.validationInfo = new Backbone.Model();
		if (config) {
			this.validationConfig = config.validationConfig;
		}
		this.validationConfig = this.validationConfig || {};
		this.lookupDataRequestInstanceId = {};
		this.initEntitySchemaProperties();
		this.initDataModelsStatus();
		this.subscribeOnChangePrimaryColumn();
	},

	/**
	 * Add validator for specified column.
	 * @protected
	 * @param {String} columnName Column name for validation.
	 * @param {Function} validatorFn validation function.
	 */
	addColumnValidator: function(columnName, validatorFn) {
		var config = this.validationConfig[columnName] = this.validationConfig[columnName] || [];
		config.push(validatorFn);
	},

	/**
	 * Sets the value of the model column.
	 * @private
	 * @param {String} columnName The name of the column.
	 * @param {Object} columnValue Value.
	 * @param {Object} options Options.
	 */
	setColumnValue: function(columnName, columnValue, options) {
		this.set(columnName, columnValue, options);
	},

	/**
	 * Sets the column values from the copied entity
	 * @private
	 * @param {Terrasoft.BaseViewModel} entity Entity instance
	 */
	setCopyColumnValues: function(entity) {
		var entitySchema = entity.entitySchema;
		Terrasoft.each(this.columns, function(column, columnName) {
			var entityColumn = entitySchema.columns[columnName];
			var columnValue = entity.get(columnName);
			if (entityColumn && entityColumn.isValueCloneable && columnValue !== "") {
				this.set(columnName, columnValue);
			}
		}, this);
	},

	/**
	 * Gets the values of the environment variable according to Terrasoft.System ValueType
	 * @param {Terrasoft.SystemValueType} sysValueType Variable type
	 * @return {Object} The value of the corresponding environment variable
	 * throws {Terrasoft.ItemNotFoundException}
	 * Generated if sysValue is an unknown value
	 */
	getSysDefaultValue: function(sysValueType) {
		var result;
		switch (sysValueType) {
			case Terrasoft.SystemValueType.CURRENT_TIME:
				var currentDate = new Date();
				result = new Date(null);
				result.setHours(currentDate.getHours());
				result.setMinutes(currentDate.getMinutes());
				result.setSeconds(currentDate.getSeconds());
				result.setMilliseconds(currentDate.getMilliseconds());
				break;
			case Terrasoft.SystemValueType.CURRENT_DATE:
				result = Terrasoft.clearTime(new Date());
				break;
			case Terrasoft.SystemValueType.CURRENT_DATE_TIME:
				result = new Date();
				break;
			case Terrasoft.SystemValueType.CURRENT_USER:
				result = Terrasoft.SysValue.CURRENT_USER;
				break;
			case Terrasoft.SystemValueType.CURRENT_USER_CONTACT:
				result = Terrasoft.SysValue.CURRENT_USER_CONTACT;
				break;
			case Terrasoft.SystemValueType.CURRENT_USER_ACCOUNT:
				result = Terrasoft.SysValue.CURRENT_USER_ACCOUNT;
				break;
			case Terrasoft.SystemValueType.CURRENT_WORKSPACE:
				result = Terrasoft.SysValue.CURRENT_WORKSPACE;
				break;
			case Terrasoft.SystemValueType.GENERATE_UID:
			case Terrasoft.SystemValueType.GENERATE_SEQUENTIAL_UID:
				result = Terrasoft.generateGUID();
				break;
			case Terrasoft.SystemValueType.CURRENT_MAINTAINER:
				result = Terrasoft.SysValue.CURRENT_MAINTAINER;
				break;
			default:
				throw new Terrasoft.ItemNotFoundException();
		}
		return result;
	},

	/**
	 * Validation by type of model attribute
	 * @protected
	 * @param {Object} value Column Value
	 * @param {String} column Model column name
	 * @return {Object} Object containing the text of the error during the valuation
	 */
	typeValidator: function(value, column) {
		var invalidMessage = "";
		var result = {
			invalidMessage: invalidMessage
		};
		var dataValueType = this.getColumnDataValueType(column);
		var checkResult = true;
		var isDate = ((dataValueType === Terrasoft.DataValueType.DATE_TIME) ||
				(dataValueType === Terrasoft.DataValueType.DATE) ||
				(dataValueType === Terrasoft.DataValueType.TIME));
		var isEmpty = Ext.isEmpty(value);
		var isEmptyString = (value === "");
		if (isDate) {
			if (isEmpty && !isEmptyString) {
				return result;
			}
		} else if (isEmpty) {
			return result;
		}
		switch (dataValueType) {
			case Terrasoft.DataValueType.INTEGER:
			case Terrasoft.DataValueType.FLOAT:
			case Terrasoft.DataValueType.MONEY:
				checkResult = Ext.isNumeric(value);
				break;
			case Terrasoft.DataValueType.DATE_TIME:
			case Terrasoft.DataValueType.DATE:
			case Terrasoft.DataValueType.TIME:
				checkResult = Ext.isDate(value);
				break;
			case Terrasoft.DataValueType.BOOLEAN:
				checkResult = Ext.isBoolean(value);
				break;
			case Terrasoft.DataValueType.TEXT:
				checkResult = Ext.isString(value);
				break;
			case Terrasoft.DataValueType.GUID:
				if (Ext.isObject(value)) {
					checkResult = Terrasoft.isGUID(value.value);
				} else {
					checkResult = Terrasoft.isGUID(value);
				}
				break;
			default:
				break;
		}
		if (!checkResult) {
			result.invalidMessage = Terrasoft.Resources.BaseViewModel.columnIncorrectTypeValidationMessage;
		}
		return result;
	},

	/**
	 * Validation by the range of values of the attribute of the model
	 * @protected
	 * @param {Mixed} value Column Value
	 * @param {Object} column Model column
	 * @return {Object} Object containing the text of the error during the valuation
	 */
	rangeValidator: function(value, column) {
		var result = {
			invalidMessage: ""
		};
		if (Ext.isEmpty(value)) {
			return result;
		}
		var dataValueType = this.getColumnDataValueType(column);
		switch (dataValueType) {
			case Terrasoft.DataValueType.INTEGER:
				result = Terrasoft.validateNumberRange(Terrasoft.DataValueTypeRange.INTEGER.minValue,
						Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
				break;
			case Terrasoft.DataValueType.FLOAT:
			case Terrasoft.DataValueType.MONEY:
				result = Terrasoft.validateNumberRange(Terrasoft.data.constants.FloatRange.MIN_VALUE,
						Terrasoft.data.constants.FloatRange.MAX_VALUE, value);
				break;
			case Terrasoft.DataValueType.TEXT:
				var columnPath = column.columnPath;
				var entitySchema = this.entitySchema;
				if (entitySchema && entitySchema.isColumnExist(columnPath)) {
					var entityColumn = entitySchema.getColumnByName(columnPath);
					var size = entityColumn.size;
					var valueSize = value.length;
					if (valueSize > size) {
						var message = Terrasoft.Resources.BaseViewModel.columnIncorrectTextRangeValidationMessage;
						message += " (" + valueSize + "/" + size + ")";
						result.invalidMessage = message;
					}
				}
				break;
			default:
				break;
		}
		return result;
	},

	/**
	 * Validation of the obligation to fill the attribute of the model.
	 * @protected
	 * @param {Object} value Column Value.
	 * @param {Object} column Column of the model.
	 * @return {Object} Object containing the text of the error during the valuation.
	 */
	requiredValidator: function(value, column) {
		let invalidMessage = "";
		const result = {
			invalidMessage: invalidMessage
		};
		if (Ext.isString(value)) {
			value = Ext.String.trim(value);
		}
		if (this._isAllowZeroValueSatisfied(value, column)) {
			return result;
		}
		if (this._isDefaultConditionSatisfied(value, column)) {
			return result;
		}
		if (column.isRequired || column.isRequiredOnPage) {
			invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
		} else {
			const columnPath = column.columnPath;
			const entitySchema = this.entitySchema;
			if (entitySchema && entitySchema.isColumnExist(columnPath)) {
				const entityColumn = entitySchema.getColumnByName(columnPath);
				if (entityColumn.isRequired) {
					invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
				}
			}
		}
		result.invalidMessage = invalidMessage;
		return result;
	},

	/**
	 * Validates positive numbers.
	 * @param {Number} value
	 * @return {Object} Validation info.
	 */
	positiveNumberValidator: function(value) {
		return Terrasoft.validateNumberRange(0, Terrasoft.DataValueTypeRange.INTEGER.maxValue, value);
	},

	/**
	 * Returns array of validators.
	 * @protected
	 * @return {Array} Array of validators.
	 */
	getDefaultValidators: function() {
		return [this.typeValidator, this.rangeValidator, this.requiredValidator];
	},

	/**
	 * Validating values for model attributes, modifying the validation Info collection
	 * @protected
	 * @virtual
	 * @param {String} columnName The name of the model column or the mask for running common validators
	 * @param {Object} [options] Options object.
	 * @return {Boolean} Returns true if all validators succeed.
	 */
	validateColumn: function(columnName, options) {
		options = options || {};
		if (!this.validationConfig) {
			return true;
		}
		let info = {
			invalidMessage: "",
			isValid: true
		};
		if (!options.skipValidation) {
			if (Terrasoft.Features.getIsEnabled("ValidateRequiredFields")) {
				this.fireEvent("validate:" + columnName, this);
			}
			const defaultValidators = this.getDefaultValidators();
			let validators = Terrasoft.deepClone(this.validationConfig[columnName]) || [];
			validators = defaultValidators.concat(validators);
			const value = this.get(columnName);
			const column = this.columns[columnName];
			Terrasoft.each(validators, function(validator) {
				info = validator.call(this, value, column);
				info.isValid = Ext.isEmpty(info.invalidMessage);
				return info.isValid;
			}, this);
			if (column && Ext.isDefined(column.validateOrder)) {
				info.validateOrder = column.validateOrder;
			}
		}
		if (columnName !== "*") {
			this.validationInfo.set(columnName, info);
		}
		return info.isValid;
	},

	/**
	 * Returns model column data type.
	 * @private
	 * @param {Object} column Model column.
	 * @return {Terrasoft.DataValueType|null} Column data type.
	 */
	getColumnDataValueType: function(column) {
		if (!column) {
			return null;
		}
		if (column.type !== Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
			return column.dataValueType;
		}
		var columnPath = column.columnPath;
		var entitySchema = this.entitySchema;
		if (entitySchema && entitySchema.isColumnExist(columnPath)) {
			var entityColumn = entitySchema.getColumnByName(columnPath);
			return entityColumn.dataValueType;
		}
		return null;
	},

	/**
	 * Returns object with all model columns of type {@link Terrasoft.ViewModelColumnType#ENTITY_COLUMN}.
	 * @return {Object} Entity model columns.
	 */
	getEntityColumns: function() {
		return Terrasoft.pick(this.columns, function(value, key) {
			var column = this.getColumnByName(key);
			var columnType = column && column.type;
			return columnType === Terrasoft.ViewModelColumnType.ENTITY_COLUMN;
		}, this);
	},

	/**
	 * Returns true if the model has changed columns and it requires a save operation.
	 * @return {Boolean} Flag that determines whether model changed.
	 */
	isChanged: function() {
		return this.isEntityChanged();
	},

	/**
	 * Returns true if the model has changed entity columns and it requires a save operation.
	 * @return {Boolean} Flag that determines whether model changed.
	 */
	isEntityChanged: function() {
		const result = this.getChangedEntityColumns();
		return result.length > 0;
	},

	/**
	 * Returns changed entity column keys.
	 * @return {Array}
	 */
	getChangedEntityColumns: function() {
		const entityColumns = this.getEntityColumns();
		const entityColumnsKeys = Terrasoft.keys(entityColumns);
		const changedKeys = Terrasoft.keys(this.changedValues);
		return _.intersection(entityColumnsKeys, changedKeys);
	},

	/**
	 * Sets model column value.
	 * @override
	 * @param {String} key Column name.
	 * @param {String/Number/Date/Boolean/Object} value Column value.
	 * @param {Object} [options] Options.
	 */
	set: function(key, value, options) {
		this.callParent(arguments);
		if (options && (options.silent || options.preventValidation)) {
			return;
		}
		this.validateColumn(key, options);
	},

	/**
	 * Calls all model validators one by one. Stops on the first error found
	 * @return {Boolean} Returns true on success of all validators
	 */
	validate: function() {
		var result = true;
		if (this.validationConfig) {
			var sortedByValidationOrder = Terrasoft.sortObj(this.columns, "validateOrder");
			Terrasoft.each(sortedByValidationOrder, function(column, columnName) {
				result = result && this.validateColumn(columnName);
			}, this);
			result = result && this.validateColumn("*");
		}
		return result;
	},

	/**
	 * Write an element in the validationInfo
	 * @protected
	 * @param {String} columnName Model Column Name
	 * @param {Boolean} isValid Model Column Name
	 * @param {String} validationMsg Model Column Name
	 */
	setValidationInfo: function(columnName, isValid, validationMsg) {
		var info = {
			isValid: isValid,
			invalidMessage: validationMsg
		};
		this.validationInfo.set(columnName, info);
	},

	/**
	 * Initializes the configuration of the columns and loads data from the object, where each property represents
	 * column with value
	 * @override
	 * @param {Object} values Object of Values
	 * @param {Object} rowConfig Column Configuration
	 */
	loadFromColumnValues: function(values, rowConfig) {
		if (rowConfig) {
			Terrasoft.each(rowConfig, function(column, columnName) {
				if (this.columns[columnName]) {
					Ext.apply(this.columns[columnName], column);
				} else {
					this.columns[columnName] = column;
				}
			}, this);
		}
		if (values) {
			Terrasoft.each(values, function(column, columnName) {
				this.setColumnValue(columnName, column, {silent: true});
			}, this);
		}
	},

	/**
	 * @inheritdoc BaseModel#initModelColumns
	 * @override
	 */
	initModelColumns: function() {
		this.callParent(arguments);
		this._setColumnsDataModelName();
		this._setResourceColumns();
	},

	/**
	 * Get the data type of the model column by name
	 * If the column is missing in the model, the column will be searched according to the scheme
	 * @param {String} columnName Column Name
	 * @return {Terrasoft.DataValueType|null} Column type
	 */
	getColumnDataType: function(columnName) {
		var column = this.getColumnByName(columnName);
		if (column && !Ext.isEmpty(column.dataValueType)) {
			return column.dataValueType;
		}
		var columnPath = column ? column.columnPath : columnName;
		var entitySchema = this.entitySchema;
		if (entitySchema && entitySchema.isColumnExist(columnPath)) {
			var entityColumn = entitySchema.getColumnByName(columnPath);
			return entityColumn.dataValueType;
		}
		var modelColumn = this.getColumnByName(columnPath);
		if (modelColumn && !Ext.isEmpty(modelColumn.dataValueType)) {
			return modelColumn.dataValueType;
		}
		return null;
	},

	/**
	 * Returns lookup comparison type.
	 * @protected
	 * @return {Terrasoft.ComparisonType} Lookup comparison type.
	 */
	getLookupComparisonType: function() {
		return this.getStringColumnComparisonType();
	},

	/**
	 * Returns string column comparison type.
	 * @protected
	 * @return {Terrasoft.ComparisonType} String column comparison type.
	 */
	getStringColumnComparisonType: function() {
		return (Terrasoft.SysSettings.getCachedSysSetting("StringColumnSearchComparisonType") === 1)
				? Terrasoft.ComparisonType.CONTAIN
				: Terrasoft.ComparisonType.START_WITH;
	},

	/**
	 * Returns correct index of the last item of previous group of list elements.
	 * @private
	 * @param {Terrasoft.Collection} list Expandable list elements collection.
	 */
	getLastRecord: function(list) {
		var length = this._getListLength(list);
		return list.getByIndex(length - 1);
	},

	/**
	 * Returns correct length of previous group of list elements.
	 * @private
	 * @param {Terrasoft.Collection} list Expandable list elements collection.
	 */
	_getListLength: function(list) {
		var count = list.getCount();
		var lastElement = list.last();
		var indexOfLastRecord = Terrasoft.isEmptyGUID(lastElement.value) ? 1 : 0;
		return count - indexOfLastRecord;
	},

	/**
	 * Loads objects into the collection.
	 * @protected
	 * @param {Object} config Configuration object.
	 * @param {Terrasoft.Collection} config.collection The found values for filling the directory.
	 * @param {String} config.filterValue The filter for primaryDisplayColumn.
	 * @param {Object} config.objects The dictionary that will be loaded into the list.
	 * @param {String} config.columnName The name of the ViewModel column.
	 * @param {Boolean} config.isLookupEdit lookup or combobox.
	 */
	onLookupDataLoaded: function(config) {
		config.collection.each(function(item) {
			var key = item.get("value");
			config.objects[key] = item.model.attributes;
		}, this);
	},

	/**
	 * Gets the url for the picture lookup column
	 * @throws {Terrasoft.UnsupportedTypeException}
	 * It is generated in the event that lookupColumnName points not to the lookup column
	 * @param {String} lookupColumnName Column Name
	 * @return {String|null} url of the requested image
	 */
	getLookupImageUrl: function(lookupColumnName) {
		var lookupColumn = this.findEntityColumn(lookupColumnName) || this.getColumnByName(lookupColumnName);
		if (!lookupColumn || !lookupColumn.isLookup) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var lookupColumnValue = this.get(lookupColumnName);
		var primaryImageColumnValue = lookupColumnValue.primaryImageValue;
		if (!primaryImageColumnValue) {
			return null;
		}
		var imageConfig = {
			source: Terrasoft.ImageSources.SYS_IMAGE,
			params: {
				primaryColumnValue: primaryImageColumnValue
			}
		};
		return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
	},

	/**
	 * Displays the confirmation window.
	 * @param  {String} caption Information in the window.
	 * @param  {Function} handler The method is called when the button or ESC key is pressed.
	 * @param  {Object[]} buttons An array of buttons for the control.
	 * For example:
	 * buttons: ['yes', 'no', {
	 *  className: 'Terrasoft.Button',
	 *  returnCode: 'customButton',
	 *  style: 'green',
	 *  caption: 'myButton'
	 * }]
	 * @param {Object} cfg see {@link Terrasoft.utils.showMessage cfg}
	 */
	showConfirmationDialog: function(caption, handler, buttons, cfg) {
		Terrasoft.utils.showConfirmation(caption, handler, buttons, this, cfg);
	},

	/**
	 * Displays an information window.
	 * @param  {String} caption Information in the window.
	 * @param  {Function} [handler] The method is called when you press the button or the ESC key.
	 * @param  {Object} [cfg] see {@link Terrasoft.utils.showMessage cfg}
	 */
	showInformationDialog: function(caption, handler, cfg) {
		Terrasoft.utils.showInformation(caption, handler, this, cfg);
	},

	/**
	 * Returns the value of the attribute property of the model. The value of the property can be specified directly, or
	 * is associated with the value of another attribute or the model method.
	 * @param {Object} attribute Model Attribute.
	 * @param {String} property The name of the attribute property.
	 * @return {*} The value of the property.
	 */
	getAttributePropertyValue: function(attribute, property) {
		if (!attribute) {
			return null;
		}
		var attributeProperty = attribute[property];
		if (Ext.isObject(attributeProperty) && attributeProperty.bindTo) {
			var bindTo = attributeProperty.bindTo;
			var converterName = attributeProperty.bindConfig && attributeProperty.bindConfig.converter;
			var boundValue = this.get(bindTo) || this[bindTo];
			if (!Ext.isFunction(boundValue) && !converterName) {
				return boundValue;
			}
			var modelMethod = converterName ? this[converterName] : boundValue;
			var argument = converterName ? boundValue : undefined;
			return Ext.isFunction(modelMethod) ? modelMethod.call(this, argument) : null;
		} else {
			return attributeProperty;
		}
	},

	/**
	 * Returns column caption by column name.
	 * @return {String} column cation.
	 */
	getColumnCaptionByName: function(name) {
		var column = this.getColumnByName(name);
		return this.getAttributePropertyValue(column, "caption") || column.name || name;
	},

	/**
	 * Viewing data validation and returns on the basis of its message to the user.
	 * @return {String} User message.
	 */
	getValidationMessage: function() {
		var invalidColumnName = null;
		var messageTemplate = Terrasoft.Resources.BaseViewModel.fieldValidationError;
		var invalidMessage = "";
		var sortedByValidationOrder = Terrasoft.sortObj(this.validationInfo.attributes, "validateOrder");
		Terrasoft.each(sortedByValidationOrder, function(attribute, attributeName) {
			if (attribute && !attribute.isValid && !attribute.isCustomMessage) {
				invalidColumnName = attributeName;
				invalidMessage = attribute.invalidMessage;
				return false;
			}
		}, this);
		var validationMessage = null;
		if (invalidColumnName) {
			var columnCaption = this.getColumnCaptionByName(invalidColumnName);
			validationMessage = Ext.String.format(messageTemplate, columnCaption, invalidMessage);
		}
		return validationMessage;
	},

	/**
	 * Loads data into the models
	 * @param {Object} config Configuration object.
	 * @param {Function} callback The function to be called.
	 * @param {Object} scope The context in which the callback function is called
	 */
	loadDataModels: function(config, callback, scope) {
		this._loadDataModelEntities(config, callback, scope);
	},

	/**
	 * Saves the data model entities on the server.
	 * @param {Function} callback The function to be called.
	 * @param {Object} scope The context in which the callback function is called
	 */
	saveDataModels: function(callback, scope) {
		this._saveDataModelEntities(callback, scope);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @overridden
	 */
	onDestroy: function() {
		this.unsubscribeOnChangePrimaryColumn();
		this.callParent(arguments);
	}
});

Object.defineProperty(Terrasoft.BaseViewModel.prototype, "entitySchema", {
	get: function() {
		return this.getEntityViewModelEntitySchema();
	},
	set: function(entitySchema) {
		this.setEntityViewModelEntitySchema(entitySchema);
	},
	enumerable: true
});

Object.defineProperty(Terrasoft.BaseViewModel.prototype, "deleteQuery", {
	get: function() {
		var model = this._findPrimaryDataModel();
		return model && model._deleteQuery || null;
	},
	set: function(deleteQuery) {
		var model = this._findPrimaryDataModel();
		if (model) {
			model._deleteQuery = deleteQuery;
		}
	},
	enumerable: true
});

Object.defineProperty(Terrasoft.BaseViewModel.prototype, "insertQuery", {
	get: function() {
		var model = this._findPrimaryDataModel();
		return model && model._insertQuery || null;
	},
	set: function(insertQuery) {
		var model = this._findPrimaryDataModel();
		if (model) {
			model._insertQuery = insertQuery;
		}
	},
	enumerable: true
});

Object.defineProperty(Terrasoft.BaseViewModel.prototype, "updateQuery", {
	get: function() {
		var model = this._findPrimaryDataModel();
		return model && model._updateQuery || null;
	},
	set: function(updateQuery) {
		var model = this._findPrimaryDataModel();
		if (model) {
			model._updateQuery = updateQuery;
		}
	},
	enumerable: true
});
