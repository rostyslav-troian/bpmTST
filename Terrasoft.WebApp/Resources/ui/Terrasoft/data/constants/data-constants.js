Ext.ns("Terrasoft.data.constants");

/**
 * @enum
 * Float variable value range.
 */
Terrasoft.data.constants.FloatRange = {
	/**
	 * Float variable maximum value.
	 * @type {Number}
	 */
	MAX_VALUE: 69999999999999.99,
	/**
	 * Float variable minimum value.
	 * @type {Number}
	 */
	MIN_VALUE: -69999999999999.99
};

/**
 * Current decimal precision of money data value type.
 * @type {Number}
 */
Terrasoft.data.constants.MONEY_PRECISION = 4;

/**
 *  Empty unique identifier.
 * @type {String}
 */
Terrasoft.data.constants.GUID_EMPTY = "00000000-0000-0000-0000-000000000000";

/**
 * Alias for {@link Terrasoft.data.constants.GUID_EMPTY}
 * @member Terrasoft
 * @inheritdoc Terrasoft.data.constants.GUID_EMPTY
 */
Terrasoft.GUID_EMPTY = Terrasoft.data.constants.GUID_EMPTY;

/** Data type config. */
Terrasoft.data.constants.DataValueTypeConfig = {
	SHORT_TEXT: {
		value: Terrasoft.DataValueType.SHORT_TEXT,
		displayValue: Terrasoft.Resources.DataValueType.SHORT_TEXT
	},
	MEDIUM_TEXT: {
		value: Terrasoft.DataValueType.MEDIUM_TEXT,
		displayValue: Terrasoft.Resources.DataValueType.MEDIUM_TEXT
	},
	MAXSIZE_TEXT: {
		value: Terrasoft.DataValueType.MAXSIZE_TEXT,
		displayValue: Terrasoft.Resources.DataValueType.MAXSIZE_TEXT
	},
	LONG_TEXT: {
		value: Terrasoft.DataValueType.LONG_TEXT,
		displayValue: Terrasoft.Resources.DataValueType.LONG_TEXT
	},
	FLOAT1: {
		value: Terrasoft.DataValueType.FLOAT1,
		displayValue: Terrasoft.Resources.DataValueType.FLOAT1
	},
	FLOAT2: {
		value: Terrasoft.DataValueType.FLOAT2,
		displayValue: Terrasoft.Resources.DataValueType.FLOAT2
	},
	FLOAT3: {
		value: Terrasoft.DataValueType.FLOAT3,
		displayValue: Terrasoft.Resources.DataValueType.FLOAT3
	},
	FLOAT4: {
		value: Terrasoft.DataValueType.FLOAT4,
		displayValue: Terrasoft.Resources.DataValueType.FLOAT4
	},
	FLOAT8: {
		value: Terrasoft.DataValueType.FLOAT8,
		displayValue: Terrasoft.Resources.DataValueType.FLOAT8
	},
	INTEGER: {
		value: Terrasoft.DataValueType.INTEGER,
		displayValue: Terrasoft.Resources.DataValueType.INTEGER
	},
	BOOLEAN: {
		value: Terrasoft.DataValueType.BOOLEAN,
		displayValue: Terrasoft.Resources.DataValueType.BOOLEAN
	},
	LOOKUP: {
		value: Terrasoft.DataValueType.LOOKUP,
		displayValue: Terrasoft.Resources.DataValueType.LOOKUP
	},
	DATE_TIME: {
		value: Terrasoft.DataValueType.DATE_TIME,
		displayValue: Terrasoft.Resources.DataValueType.DATE_TIME
	},
	MONEY: {
		value: Terrasoft.DataValueType.MONEY,
		displayValue: Terrasoft.Resources.DataValueType.MONEY
	},
	DATE: {
		value: Terrasoft.DataValueType.DATE,
		displayValue: Terrasoft.Resources.DataValueType.DATE
	},
	TIME: {
		value: Terrasoft.DataValueType.TIME,
		displayValue: Terrasoft.Resources.DataValueType.TIME
	},
	ENTITY: {
		value: Terrasoft.DataValueType.ENTITY,
		displayValue: Terrasoft.Resources.DataValueType.ENTITY
	},
	ENTITY_COLLECTION: {
		value: Terrasoft.DataValueType.ENTITY_COLLECTION,
		displayValue: Terrasoft.Resources.DataValueType.ENTITY_COLLECTION
	},
	LOCALIZABLE_STRING: {
		value: Terrasoft.DataValueType.LOCALIZABLE_STRING,
		displayValue: Terrasoft.Resources.DataValueType.LOCALIZABLE_STRING
	},
	METADATA_TEXT: {
		value: Terrasoft.DataValueType.METADATA_TEXT,
		displayValue: Terrasoft.Resources.DataValueType.METADATA_TEXT
	},
	GUID: {
		value: Terrasoft.DataValueType.GUID,
		displayValue: Terrasoft.Resources.DataValueType.GUID
	},
	OBJECT_LIST: {
		value: Terrasoft.DataValueType.OBJECT_LIST,
		displayValue: Terrasoft.Resources.DataValueType.OBJECT_LIST
	},
	COMPOSITE_OBJECT_LIST: {
		value: Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST,
		displayValue: Terrasoft.Resources.DataValueType.COMPOSITE_OBJECT_LIST
	}
};
