Ext.ns("Terrasoft.utils.dataValueType");

/**
 * Data value type class.
 * @singleton
 */

/**
 * Converts server data type to client data type.
 * @param {Terrasoft.DataValueType} dataValueType Server data type.
 * @return {Terrasoft.DataValueType} Client data type.
 */
Terrasoft.convertToClientDataValueType = function(dataValueType) {
	var clientDataValueType = Terrasoft.ServerDataValueType[dataValueType];
	if (clientDataValueType == null) {
		throw new Terrasoft.ItemNotFoundException();
	}
	return clientDataValueType;
};

/**
 * Alias for {@link Terrasoft#convertToClientDataValueType}
 * @member Terrasoft.utils.dataValueType
 * @method convertToClientDataValueType
 * @inheritdoc Terrasoft#convertToClientDataValueType
 */
Terrasoft.utils.dataValueType.convertToClientDataValueType = Terrasoft.convertToClientDataValueType;

/**
 * Converts client data type to server data type.
 * @param {Terrasoft.DataValueType} dataValueType Client data type.
 * @return {Terrasoft.ServerDataValueType} Server data type.
 */
Terrasoft.convertToServerDataValueType = function(dataValueType) {
	var result = null;
	Terrasoft.each(Terrasoft.ServerDataValueType, function(clientDataValueType, serverDataValueType) {
		if (dataValueType === clientDataValueType) {
			result = serverDataValueType;
		}
		return (result == null);
	});
	if (!result) {
		throw new Terrasoft.ItemNotFoundException();
	}
	return result;
};

/**
 * Alias for {@link Terrasoft#convertToServerDataValueType}
 * @member Terrasoft.utils.dataValueType
 * @method convertToServerDataValueType
 * @inheritdoc Terrasoft#convertToServerDataValueType
 */
Terrasoft.utils.dataValueType.convertToServerDataValueType = Terrasoft.convertToServerDataValueType;

/**
 * Returns image name by data type.
 * @param {Terrasoft.DataValueType} dataValueType Data type.
 * @return {String} Icon name.
 */
Terrasoft.utils.dataValueType.getImageNameByDataValueType = function(dataValueType) {
	var result;
	switch (dataValueType) {
		case Terrasoft.DataValueType.TEXT:
		case Terrasoft.DataValueType.SHORT_TEXT:
		case Terrasoft.DataValueType.MEDIUM_TEXT:
		case Terrasoft.DataValueType.LONG_TEXT:
		case Terrasoft.DataValueType.MAXSIZE_TEXT:
		case Terrasoft.DataValueType.SECURE_TEXT:
		case Terrasoft.DataValueType.HASH_TEXT:
		case Terrasoft.DataValueType.METADATA_TEXT:
			result = "Text.svg";
			break;
		case Terrasoft.DataValueType.LOCALIZABLE_STRING:
			result = "LocalizableString.svg";
			break;
		case Terrasoft.DataValueType.INTEGER:
			result = "Integer.svg";
			break;
		case Terrasoft.DataValueType.FLOAT:
		case Terrasoft.DataValueType.FLOAT1:
		case Terrasoft.DataValueType.FLOAT2:
		case Terrasoft.DataValueType.FLOAT3:
		case Terrasoft.DataValueType.FLOAT4:
		case Terrasoft.DataValueType.FLOAT8:
		case Terrasoft.DataValueType.MONEY:
			result = "Float.svg";
			break;
		case Terrasoft.DataValueType.DATE_TIME:
		case Terrasoft.DataValueType.DATE:
		case Terrasoft.DataValueType.TIME:
			result = "DateTime.svg";
			break;
		case Terrasoft.DataValueType.BOOLEAN:
			result = "Boolean.svg";
			break;
		case Terrasoft.DataValueType.LOOKUP:
			result = "Lookup.svg";
			break;
		case Terrasoft.DataValueType.GUID:
			result = "Guid.svg";
			break;
		case Terrasoft.DataValueType.COLLECTION:
		case Terrasoft.DataValueType.ENTITY_COLLECTION:
		case Terrasoft.DataValueType.ENTITY_COLUMN_MAPPING_COLLECTION:
		case Terrasoft.DataValueType.LOCALIZABLE_PARAMETER_VALUES_LIST:
		case Terrasoft.DataValueType.ENTITY:
		case Terrasoft.DataValueType.CUSTOM_OBJECT:
		case Terrasoft.DataValueType.COLOR:
		case Terrasoft.DataValueType.IMAGELOOKUP:
		case Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST:
		case Terrasoft.DataValueType.OBJECT_LIST:
			result = "Collection.svg";
			break;
		default:
			result = "NoType.svg";
			break;
	}
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#getImageNameByDataValueType}
 * @member Terrasoft
 * @method getImageNameByDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#getImageNameByDataValueType
 */
Terrasoft.getImageNameByDataValueType = Terrasoft.utils.dataValueType.getImageNameByDataValueType;

/**
 * Checks whether datatype is in datetime types group.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data type.
 * @return {Boolean} Returns true if data type is in datetime types group.
 */
Terrasoft.utils.dataValueType.isDateDataValueType = function(dataValueType) {
	var dateDataValueTypes = Terrasoft.utils.dataValueType.DateDataValueTypes;
	return Terrasoft.contains(dateDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isDateDataValueType}
 * @member Terrasoft
 * @method isDateDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isDateDataValueType
 */
Terrasoft.isDateDataValueType = Terrasoft.utils.dataValueType.isDateDataValueType;

/**
 * Checks whether object is instance of class.
 * @param {Object} instance Object instance.
 * @param {String} className Class name.
 * @return {Boolean} Returns true if object is instance of class.
 */
Terrasoft.isInstanceOfClass = function(instance, className) {
	return instance instanceof Ext.ClassManager.get(className);
};

/**
 * Alias for {@link Terrasoft#isInstanceOfClass}
 * @member Terrasoft.utils.dataValueType
 * @method isInstanceOfClass
 * @inheritdoc Terrasoft#isInstanceOfClass
 */
Terrasoft.utils.dataValueType.isInstanceOfClass = Terrasoft.isInstanceOfClass;

/**
 * Checks whether datatype is in lookup types group.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is in lookup types group.
 */
Terrasoft.utils.dataValueType.isLookupDataValueType = function(dataValueType) {
	var dateDataValueTypes = [Terrasoft.DataValueType.LOOKUP, Terrasoft.DataValueType.ENUM];
	return Terrasoft.contains(dateDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isDateDataValueType}
 * @member Terrasoft
 * @method isDateDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isDateDataValueType
 */
Terrasoft.isLookupDataValueType = Terrasoft.utils.dataValueType.isLookupDataValueType;

/**
 * Checks whether datatype is in numeric types group.
 * @param {Terrasoft.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if data type is in numeric types group.
 */
Terrasoft.isNumberDataValueType = function(dataValueType) {
	var numberDataValueTypes = Terrasoft.utils.dataValueType.NumberDataValueTypes;
	return Terrasoft.contains(numberDataValueTypes, dataValueType);
};

/**
 * Array of Number data types.
 * @protected
 * @type {Terrasoft.DataValueType[]}
 */
Terrasoft.utils.dataValueType.NumberDataValueTypes = [
	Terrasoft.DataValueType.INTEGER,
	Terrasoft.DataValueType.MONEY,
	Terrasoft.DataValueType.FLOAT,
	Terrasoft.DataValueType.FLOAT1,
	Terrasoft.DataValueType.FLOAT2,
	Terrasoft.DataValueType.FLOAT3,
	Terrasoft.DataValueType.FLOAT4,
	Terrasoft.DataValueType.FLOAT8
];

/**
 * Array of date time data types.
 * @protected
 * @type {Terrasoft.DataValueType[]}
 */
Terrasoft.utils.dataValueType.DateDataValueTypes = [
	Terrasoft.DataValueType.DATE,
	Terrasoft.DataValueType.DATE_TIME,
	Terrasoft.DataValueType.TIME
];

/**
 * Lookup mapping data types.
 * @protected
 * @type {Terrasoft.DataValueType[]}
 */
Terrasoft.utils.dataValueType.LookupMappingDataValueTypes = [
	Terrasoft.DataValueType.LOOKUP,
	Terrasoft.DataValueType.GUID,
	Terrasoft.DataValueType.ENUM
];

/**
 * Array of money compatible data types.
 * @protected
 * @type {Terrasoft.DataValueType[]}
 */
Terrasoft.utils.dataValueType.MoneyCompatibleDataValueTypes = [
	Terrasoft.DataValueType.MONEY,
	Terrasoft.DataValueType.FLOAT,
	Terrasoft.DataValueType.FLOAT1,
	Terrasoft.DataValueType.FLOAT2,
	Terrasoft.DataValueType.FLOAT3,
	Terrasoft.DataValueType.FLOAT4,
	Terrasoft.DataValueType.FLOAT8
];

/**
 * Array of Text data types.
 * @protected
 * @type {Terrasoft.DataValueType[]}
 */
Terrasoft.utils.dataValueType.TextDataValueTypes = [
	Terrasoft.DataValueType.TEXT,
	Terrasoft.DataValueType.SHORT_TEXT,
	Terrasoft.DataValueType.MEDIUM_TEXT,
	Terrasoft.DataValueType.MAXSIZE_TEXT,
	Terrasoft.DataValueType.LONG_TEXT,
	Terrasoft.DataValueType.LOCALIZABLE_STRING
];

/**
 * Alias for {@link Terrasoft#isNumberDataValueType}
 * @member Terrasoft.utils.dataValueType
 * @method isNumberDataValueType
 * @inheritdoc Terrasoft#isNumberDataValueType
 */
Terrasoft.utils.dataValueType.isNumberDataValueType = Terrasoft.isNumberDataValueType;

/**
 * Validates class of instance.
 * @throws {Terrasoft.UnsupportedTypeException}
 * Throws exception {@link Terrasoft.ItemNotFoundException} if element with such index is not found.
 * @param {Object} object Class instance.
 * @param {String} className Class name.
 * @return {Boolean} Returns true if object is instance of class.
 */
Terrasoft.utils.dataValueType.validateObjectClass = function(object, className) {
	var isValid = Terrasoft.isInstanceOfClass(object, className);
	if (!isValid) {
		throw new Terrasoft.UnsupportedTypeException({
			message: Ext.String.format(Terrasoft.Resources.Core.InvalidObjectClass, className)
		});
	}
	return isValid;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#validateObjectClass}
 * @member Terrasoft
 * @method validateObjectClass
 * @inheritdoc Terrasoft.utils.dataValueType#validateObjectClass
 */
Terrasoft.validateObjectClass = Terrasoft.utils.dataValueType.validateObjectClass;

/**
 * Checks whether datatype is in text types group.
 * @param {Terrasoft.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is in text types group.
 */
Terrasoft.isTextDataValueType = function(dataValueType) {
	var TextDataValueTypes = Terrasoft.utils.dataValueType.TextDataValueTypes;
	return Terrasoft.contains(TextDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft#isTextDataValueType}
 * @member Terrasoft.utils.dataValueType
 * @method isTextDataValueType
 * @inheritdoc Terrasoft#isTextDataValueType
 */
Terrasoft.utils.dataValueType.isTextDataValueType = Terrasoft.isTextDataValueType;

/**
 * Checks whether datatype is in boolean type.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is boolean.
 */
Terrasoft.utils.dataValueType.isBooleanDataValueType = function(dataValueType) {
	return dataValueType === Terrasoft.DataValueType.BOOLEAN;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isBooleanDataValueType}
 * @member Terrasoft
 * @method isBooleanDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isBooleanDataValueType
 */
Terrasoft.isBooleanDataValueType = Terrasoft.utils.dataValueType.isBooleanDataValueType;

/**
 * Checks whether dataValueType is GUID.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType DataValueType.
 * @return {Boolean} Returns true if dataValueType is GUID.
 */
Terrasoft.utils.dataValueType.isGUIDDataValueType = function(dataValueType) {
	return dataValueType === Terrasoft.DataValueType.GUID;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isGUIDDataValueType}
 * @member Terrasoft
 * @method isGUIDDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isGUIDDataValueType
 */
Terrasoft.isGUIDDataValueType = Terrasoft.utils.dataValueType.isGUIDDataValueType;

/**
 * Checks whether dataValueType is lookup or GUID.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType DataValueType.
 * @return {Boolean} Returns true if dataValueType is GUID or Lookup.
 */
Terrasoft.utils.dataValueType.isLookupValidator = function(dataValueType) {
	return Terrasoft.isGUIDDataValueType(dataValueType) || Terrasoft.isLookupDataValueType(dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isLookupValidator}
 * @member Terrasoft
 * @method isLookupValidator
 * @inheritdoc Terrasoft.utils.dataValueType#isLookupValidator
 */
Terrasoft.isLookupValidator = Terrasoft.utils.dataValueType.isLookupValidator;

/**
 * Checks whether datatype is image .
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is image.
 */
Terrasoft.utils.dataValueType.isImageDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.IMAGE === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isImageDataValueType}
 * @member Terrasoft
 * @method isImageDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isImageDataValueType
 */
Terrasoft.isImageDataValueType = Terrasoft.utils.dataValueType.isImageDataValueType;

/**
 * Checks whether datatype is object .
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is object.
 */
Terrasoft.utils.dataValueType.isEntityDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.ENTITY === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isEntityDataValueType}
 * @member Terrasoft
 * @method isEntityDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isEntityDataValueType
 */
Terrasoft.isEntityDataValueType = Terrasoft.utils.dataValueType.isEntityDataValueType;

/**
 * Checks whether datatype is collection of objects .
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is collection of objects.
 */
Terrasoft.utils.dataValueType.isEntityCollectionDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.ENTITY_COLLECTION === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isEntityCollectionDataValueType}
 * @member Terrasoft
 * @method isEntityCollectionDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isEntityCollectionDataValueType
 */
Terrasoft.isEntityCollectionDataValueType = Terrasoft.utils.dataValueType.isEntityCollectionDataValueType;

/**
 * Checks whether data value type is composite object list of objects.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if data value type is composite object list.
 */
Terrasoft.utils.dataValueType.isCompositeObjectListDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isCompositeObjectListDataValueType}
 * @member Terrasoft
 * @method isCompositeObjectListDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isCompositeObjectListDataValueType
 */
Terrasoft.isCompositeObjectListDataValueType = Terrasoft.utils.dataValueType.isCompositeObjectListDataValueType;

/**
 * Checks whether data value type is object list of objects.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data type.
 * @return {Boolean} Returns true if data value type is object list.
 */
Terrasoft.utils.dataValueType.isObjectListDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.OBJECT_LIST === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isObjectListDataValueType}
 * @member Terrasoft
 * @method isObjectListDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isObjectListDataValueType
 */
Terrasoft.isObjectListDataValueType = Terrasoft.utils.dataValueType.isObjectListDataValueType;

/**
 * Checks whether data value type is collection.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Data type.
 * @return {Boolean} Returns true if data value type is collection.
 */
Terrasoft.utils.dataValueType.isEnumerableDataValueType = function(dataValueType) {
	return Terrasoft.isObjectListDataValueType(dataValueType) ||
		Terrasoft.isCompositeObjectListDataValueType(dataValueType)
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isEnumerableDataValueType}
 * @member Terrasoft
 * @method isEnumerableDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isEnumerableDataValueType
 */
Terrasoft.isEnumerableDataValueType = Terrasoft.utils.dataValueType.isEnumerableDataValueType;

/**
 * Checks whether datatype is Integer  .
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is Integer.
 */
Terrasoft.utils.dataValueType.isIntegerDataValueType = function(dataValueType) {
	return Terrasoft.DataValueType.INTEGER === dataValueType;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isIntegerDataValueType}
 * @member Terrasoft
 * @method isIntegerDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isIntegerDataValueType
 */
Terrasoft.isIntegerDataValueType = Terrasoft.utils.dataValueType.isIntegerDataValueType;

/**
 * Checks whether datatype is valid for mapping on time field.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is valid for mapping on time field.
 */
Terrasoft.utils.dataValueType.isValidForMappingOnTimeDataValueType = function(dataValueType) {
	var dateDataValueTypes = [Terrasoft.DataValueType.DATE_TIME, Terrasoft.DataValueType.TIME];
	return Terrasoft.contains(dateDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isValidForMappingOnTimeDataValueType}
 * @member Terrasoft
 * @method isValidForMappingOnTimeDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isValidForMappingOnTimeDataValueType
 */
Terrasoft.isValidForMappingOnTimeDataValueType = Terrasoft.utils.dataValueType.isValidForMappingOnTimeDataValueType;

/**
 * Checks whether datatype is valid for mapping on Date field.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is valid for mapping on time field.
 */
Terrasoft.utils.dataValueType.isValidForMappingOnDateDataValueType = function(dataValueType) {
	var dateDataValueTypes = [Terrasoft.DataValueType.DATE_TIME, Terrasoft.DataValueType.DATE];
	return Terrasoft.contains(dateDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isValidForMappingOnDateDataValueType}
 * @member Terrasoft
 * @method isValidForMappingOnDateDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isValidForMappingOnDateDataValueType
 */
Terrasoft.isValidForMappingOnDateDataValueType = Terrasoft.utils.dataValueType.isValidForMappingOnDateDataValueType;

/**
 * Checks whether datatype is in money compatible types group.
 * @param {Terrasoft.core.enums.DataValueType} dataValueType Datatype.
 * @return {Boolean} Returns true if datatype is in money compatible types group.
 */
Terrasoft.utils.dataValueType.isMoneyCompatibleDataValueType = function(dataValueType) {
	var moneyCompatibleDataValueTypes = Terrasoft.utils.dataValueType.MoneyCompatibleDataValueTypes;
	return Terrasoft.contains(moneyCompatibleDataValueTypes, dataValueType);
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#isMoneyCompatibleDataValueType}
 * @member Terrasoft
 * @method isMoneyCompatibleDataValueType
 * @inheritdoc Terrasoft.utils.dataValueType#isMoneyCompatibleDataValueType
 */
Terrasoft.isMoneyCompatibleDataValueType = Terrasoft.utils.dataValueType.isMoneyCompatibleDataValueType;

/**
 * Returns function for validation data value type.
 * @protected
 * @param {Number} dataValueType value type.
 * @return {Function|null} dataValueTypeValidator.
 */
Terrasoft.utils.dataValueType.findDataValueTypeValidator = function(dataValueType) {
	if (Terrasoft.DataValueType.TIME === dataValueType) {
		return Terrasoft.isValidForMappingOnTimeDataValueType;
	} else if (Terrasoft.DataValueType.DATE === dataValueType) {
		return Terrasoft.isValidForMappingOnDateDataValueType;
	} else if (Terrasoft.DataValueType.DATE_TIME === dataValueType) {
		return Terrasoft.isDateDataValueType;
	} else if (Terrasoft.isLookupValidator(dataValueType)) {
		return Terrasoft.isLookupValidator;
	} else if (Terrasoft.isIntegerDataValueType(dataValueType)) {
		return Terrasoft.isIntegerDataValueType;
	} else if (Terrasoft.isMoneyCompatibleDataValueType(dataValueType)) {
		return Terrasoft.isMoneyCompatibleDataValueType;
	} else if (Terrasoft.isTextDataValueType(dataValueType)) {
		return Terrasoft.isTextDataValueType;
	} else if (Terrasoft.isBooleanDataValueType(dataValueType)) {
		return Terrasoft.isBooleanDataValueType;
	} else if (Terrasoft.isImageDataValueType(dataValueType)) {
		return Terrasoft.isImageDataValueType;
	} else if (Terrasoft.isEntityDataValueType(dataValueType)) {
		return Terrasoft.isEntityDataValueType;
	} else if (Terrasoft.isEntityCollectionDataValueType(dataValueType)) {
		return Terrasoft.isEntityCollectionDataValueType;
	} else if (Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST === dataValueType) {
		return Terrasoft.isCompositeObjectListDataValueType;
	} else if (Terrasoft.DataValueType.OBJECT_LIST === dataValueType) {
		return Terrasoft.isObjectListDataValueType;
	}
	return null;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#findDataValueTypeValidator}
 * @member Terrasoft
 * @method findDataValueTypeValidator
 * @inheritdoc Terrasoft.utils.dataValueType#findDataValueTypeValidator
 */
Terrasoft.findDataValueTypeValidator = Terrasoft.utils.dataValueType.findDataValueTypeValidator;

/**
 * Converts data value type to sys settings value type group.
 * @param {Terrasoft.DataValueType} dataValueType Data value type.
 */
Terrasoft.utils.dataValueType.getSysSettingsValueTypeGroup = function(dataValueType) {
	var valueTypeGroup;
	if (Terrasoft.isLookupDataValueType(dataValueType) || Terrasoft.isGUIDDataValueType(dataValueType)) {
		valueTypeGroup = ["Lookup"];
	} else if (dataValueType === Terrasoft.DataValueType.DATE) {
		valueTypeGroup = [
			"DateTime",
			"Date"
		];
	} else if (dataValueType === Terrasoft.DataValueType.TIME) {
		valueTypeGroup = [
			"DateTime",
			"Time"
		];
	} else if (Terrasoft.isDateDataValueType(dataValueType)) {
		valueTypeGroup = [
			"DateTime",
			"Date",
			"Time"
		];
	} else if (Terrasoft.isBooleanDataValueType(dataValueType)) {
		valueTypeGroup = ["Boolean"];
	} else if (Terrasoft.isTextDataValueType(dataValueType)) {
		valueTypeGroup = [
			"MaxSizeText",
			"MediumText",
			"ShortText",
			"Text",
			"LongText"
		];
	} else if (Terrasoft.isNumberDataValueType(dataValueType)) {
		valueTypeGroup = [
			"Float",
			"Integer",
			"Money"
		];
	} else {
		valueTypeGroup = [
			"Lookup",
			"Date",
			"Time",
			"DateTime",
			"Float",
			"Boolean",
			"Integer",
			"Money",
			"MaxSizeText",
			"MediumText",
			"ShortText",
			"Text",
			"LongText",
			"Binary",
			"SecureText"
		];
	}
	return valueTypeGroup;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#getSysSettingsValueTypeGroup}
 * @member Terrasoft
 * @method getSysSettingsValueTypeGroup
 * @inheritdoc Terrasoft.utils.dataValueType#getSysSettingsValueTypeGroup
 */
Terrasoft.getSysSettingsValueTypeGroup = Terrasoft.utils.dataValueType.getSysSettingsValueTypeGroup;

/**
 * Returns data value type caption from it`s enum value.
 * @param {Terrasoft.DataValueType} dataValueType Data value type to convert.
 * @return {String} Data value type caption.
 */
Terrasoft.utils.dataValueType.getDataValueTypeCaption = function(dataValueType) {
	var caption = null;
	Terrasoft.each(Terrasoft.DataValueType, function(value, key) {
		if (value === dataValueType) {
			caption = Terrasoft.Resources.DataValueType[key];
			return false;
		}
	}, this);
	return caption;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#getDataValueTypeCaption}
 * @member Terrasoft
 * @method getDataValueTypeCaption
 * @inheritdoc Terrasoft.utils.dataValueType#getDataValueTypeCaption
 */
Terrasoft.getDataValueTypeCaption = Terrasoft.utils.dataValueType.getDataValueTypeCaption;

/**
 * Returns data value name caption from it`s enum value.
 * @param {Terrasoft.DataValueType} dataValueType Data value type to convert.
 * @return {String} Data value type name.
 */
Terrasoft.utils.dataValueType.getDataValueTypeName = function(dataValueType) {
	var name = null;
	Terrasoft.each(Terrasoft.DataValueType, function(value, key) {
		if (value === dataValueType) {
			name = key;
			return false;
		}
	}, this);
	return name;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#getDataValueTypeName}
 * @member Terrasoft
 * @method getDataValueTypeName
 * @inheritdoc Terrasoft.utils.dataValueType#getDataValueTypeName
 */
Terrasoft.getDataValueTypeName = Terrasoft.utils.dataValueType.getDataValueTypeName;

/**
 * Returns data value type group for given data value type.
 * @param {String} dataValueType Data value type.
 * @return {Array} Data value type group.
 */
Terrasoft.utils.dataValueType.toDataValueTypeGroup = function(dataValueType) {
	var resultGroup = [];
	if (Terrasoft.isTextDataValueType(dataValueType)) {
		resultGroup = Terrasoft.utils.dataValueType.TextDataValueTypes;
	} else if (Terrasoft.isNumberDataValueType(dataValueType)) {
		resultGroup = Terrasoft.utils.dataValueType.NumberDataValueTypes;
	} else if (Terrasoft.isDateDataValueType(dataValueType)) {
		resultGroup = Terrasoft.utils.dataValueType.DateDataValueTypes;
	} else if (Terrasoft.isLookupValidator(dataValueType)) {
		resultGroup = Terrasoft.utils.dataValueType.LookupMappingDataValueTypes;
	} else {
		resultGroup.push(dataValueType);
	}
	return resultGroup;
};

/**
 * Alias for {@link Terrasoft.utils.dataValueType#toDataValueTypeGroup}
 * @member Terrasoft
 * @method toDataValueTypeGroup
 * @inheritdoc Terrasoft.utils.dataValueType#toDataValueTypeGroup
 */
Terrasoft.toDataValueTypeGroup = Terrasoft.utils.dataValueType.toDataValueTypeGroup;
