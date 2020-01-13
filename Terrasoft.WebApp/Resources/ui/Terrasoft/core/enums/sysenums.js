Ext.ns("Terrasoft.core.enums");

/**
 * @enum [Terrasoft.core.enums.QueryKind]
 * Query kind.
 */
Terrasoft.QueryKind = {
	/** Standard query. */
	GENERAL: 0,
	/** Limited query. */
	LIMITED: 1
};

/**
 * @enum [Terrasoft.core.enums.QueryKind]
 * Alias for {@link Terrasoft.QueryKind}.
 */
Terrasoft.core.enums.QueryKind = Terrasoft.QueryKind;

/**
 * @enum [Terrasoft.core.enums.FeatureState]
 * Feature type.
 */
Terrasoft.FeatureState = {
	/** Feature disabled. */
	DISABLED: 0,
	/** Feature enabled. */
	ENABLED: 1,
	/** Feature established. */
	ESTABLISHED: 2
};

/**
 * Alias for {@link Terrasoft.FeatureState}.
 */
Terrasoft.core.enums.FeatureState = Terrasoft.FeatureState;

/**
 * @enum [Terrasoft.core.enums.ComparisonType]
 * The type of comparison operation.
 */
Terrasoft.ComparisonType = {
	/** Checks if the value falls within the range of values. */
	BETWEEN: 0,
	/** Checks whether the value is empty. */
	IS_NULL: 1,
	/** Checks that the value is not empty. */
	IS_NOT_NULL: 2,
	/** Checks for equality of values. */
	EQUAL: 3,
	/** Checks for inequality of values. */
	NOT_EQUAL: 4,
	/** Checks that the value is less. */
	LESS: 5,
	/** Checks that the value is less than or equal to. */
	LESS_OR_EQUAL: 6,
	/** Checks that the value is greater. */
	GREATER: 7,
	/** Verifying that the value is greater than or equal to. */
	GREATER_OR_EQUAL: 8,
	/** Checks if the value starts with the search string. */
	START_WITH: 9,
	/** Checks if the value does not start with the search string. */
	NOT_START_WITH: 10,
	/** Checks if the value includes the search string. */
	CONTAIN: 11,
	/** Checks if the value does not include the search string. */
	NOT_CONTAIN: 12,
	/** Checks if the value ends with the search string. */
	END_WITH: 13,
	/** Checks if the value does not end with the search string. */
	NOT_END_WITH: 14,
	/** Exists according to the given condition. */
	EXISTS: 15,
	/** Does not exist according to the given condition. */
	NOT_EXISTS: 16
};

/**
 * Alias for {@link Terrasoft.ComparisonType}.
 */
Terrasoft.core.enums.ComparisonType = Terrasoft.ComparisonType;

/**
 * @enum [Terrasoft.core.enums.HttpStatusCode]
 * The status codes of the response to the Http request.
 */
Terrasoft.HttpStatusCode = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503
};

/**
 * Alias for {@link Terrasoft.HttpStatusCode}.
 */
Terrasoft.core.enums.HttpStatusCode = Terrasoft.HttpStatusCode;

/**
 * @enum [Terrasoft.core.enums.FilterType]
 * Type of filter.
 */
Terrasoft.FilterType = {
	/** Filter type not set. */
	NONE: 0,
	/**  Comparison filter. */
	COMPARE: 1,
	/** A filter that checks if the test expression is empty or not empty. */
	IS_NULL: 2,
	/** A filter that checks if the expression to be tested falls within the range of expressions. */
	BETWEEN: 3,
	/** A filter that checks if the test expression is equal to one of the expressions. */
	IN: 4,
	/** The filter "Exists according to the set condition". */
	EXISTS: 5,
	/** Filter ser. */
	FILTER_GROUP: 6
};

/**
 * Alias for {@link Terrasoft.FilterType}.
 */
Terrasoft.core.enums.FilterType = Terrasoft.FilterType;

/**
 * @enum [Terrasoft.core.enums.LogicalOperatorType]
 * Logical operation type.
 */
Terrasoft.LogicalOperatorType = {
	/** And. */
	AND: 0,
	/** Or. */
	OR: 1
};

/**
 * Alias for {@link Terrasoft.LogicalOperatorType}.
 */
Terrasoft.core.enums.LogicalOperatorType = Terrasoft.LogicalOperatorType;

/**
 * @enum [Terrasoft.core.enums.DataValueType]
 * Type of data.
 */
Terrasoft.DataValueType = {
	/** Global unique identifier. */
	GUID: 0,
	/** String. */
	TEXT: 1,
	/** Integer. */
	INTEGER: 4,
	/** Real number. */
	FLOAT: 5,
	/** Currency. */
	MONEY: 6,
	/** Date and time. */
	DATE_TIME: 7,
	/** Date. */
	DATE: 8,
	/** Time. */
	TIME: 9,
	/** Lookup. */
	LOOKUP: 10,
	/** Enumeration. */
	ENUM: 11,
	/** Boolean. */
	BOOLEAN: 12,
	/** Binary data object. */
	BLOB: 13,
	/** The object of image binary data. */
	IMAGE: 14,
	/** Custom object. */
	CUSTOM_OBJECT: 15,
	/** Image from a lookup. */
	IMAGELOOKUP: 16,
	/** Collection of items. */
	COLLECTION: 17,
	/** Color. */
	COLOR: 18,
	/** Localized string. */
	LOCALIZABLE_STRING: 19,
	/** Object (Entity). */
	ENTITY: 20,
	/** Collection of objects (EntityCollection). */
	ENTITY_COLLECTION: 21,
	/** List of object column values (EntityColumnMappingCollection). */
	ENTITY_COLUMN_MAPPING_COLLECTION: 22,
	/** Hash string. */
	HASH_TEXT: 23,
	/** Encrypted string. */
	SECURE_TEXT: 24,
	/** File. */
	FILE: 25,
	/** Mapping.
	 *@obsolete
	 */
	MAPPING: 26,
	/** ShortText. */
	SHORT_TEXT: 27,
	/** MediumText. */
	MEDIUM_TEXT: 28,
	/** MaxSizeText. */
	MAXSIZE_TEXT: 29,
	/** LongText. */
	LONG_TEXT: 30,
	/** Float1. */
	FLOAT1: 31,
	/** Float2. */
	FLOAT2: 32,
	/** Float3. */
	FLOAT3: 33,
	/** Float4. */
	FLOAT4: 34,
	/** Localizable parameter values list. */
	LOCALIZABLE_PARAMETER_VALUES_LIST: 35,
	/** Process not localizable text. */
	METADATA_TEXT: 36,
	/** Stage indicator. */
	STAGE_INDICATOR: 37,
	/** Serializable list of values. */
	OBJECT_LIST: 38,
	/** Serializable list of composite values. */
	COMPOSITE_OBJECT_LIST: 39,
	/** Float8. */
	FLOAT8: 40
};

/**
 * Alias for {@link Terrasoft.DataValueType}.
 */
Terrasoft.core.enums.DataValueType = Terrasoft.DataValueType;

/**
 * @enum [Terrasoft.core.enums.ServerDataValueType]
 * Server type of data.
 */
Terrasoft.ServerDataValueType = {
	/** GUID. */
	"23018567-a13c-4320-8687-fd6f9e3699bd": Terrasoft.DataValueType.GUID,
	/** Text. */
	"8b3f29bb-ea14-4ce5-a5c5-293a929b6ba2": Terrasoft.DataValueType.TEXT,
	/** ShortText. */
	"325a73b8-0f47-44a0-8412-7606f78003ac": Terrasoft.DataValueType.SHORT_TEXT,
	/** MediumText. */
	"ddb3a1ee-07e8-4d62-b7a9-d0e618b00fbd": Terrasoft.DataValueType.MEDIUM_TEXT,
	/** MaxSizeText. */
	"c0f04627-4620-4bc0-84e5-9419dc8516b1": Terrasoft.DataValueType.MAXSIZE_TEXT,
	/** LongText. */
	"5ca35f10-a101-4c67-a96a-383da6afacfc": Terrasoft.DataValueType.LONG_TEXT,
	/** Integer. */
	"6b6b74e2-820d-490e-a017-2b73d4ccf2b0": Terrasoft.DataValueType.INTEGER,
	/** Float. */
	"57ee4c31-5ec4-45fa-b95d-3a2868aa89a8": Terrasoft.DataValueType.FLOAT,
	/** Float1. */
	"07ba84ce-0bf7-44b4-9f2c-7b15032eb98c": Terrasoft.DataValueType.FLOAT1,
	/** Float2. */
	"5cc8060d-6d10-4773-89fc-8c12d6f659a6": Terrasoft.DataValueType.FLOAT2,
	/** Float3. */
	"3f62414e-6c25-4182-bcef-a73c9e396f31": Terrasoft.DataValueType.FLOAT3,
	/** Float4. */
	"ff22e049-4d16-46ee-a529-92d8808932dc": Terrasoft.DataValueType.FLOAT4,
	/** Float8. */
	"a4aaf398-3531-4a0d-9d75-a587f5b5b59e": Terrasoft.DataValueType.FLOAT8,
	/** Money. */
	"969093e2-2b4e-463b-883a-3d3b8c61f0cd": Terrasoft.DataValueType.MONEY,
	/** Date/Time. */
	"d21e9ef4-c064-4012-b286-fa1a8171da44": Terrasoft.DataValueType.DATE_TIME,
	/** Date. */
	"603d4960-a1a2-45e9-b232-206a54421b01": Terrasoft.DataValueType.DATE,
	/** Time. */
	"04cc757b-8f06-482c-8a1a-0c0e171d2410": Terrasoft.DataValueType.TIME,
	/** Lookup. */
	"b295071f-7ea9-4e62-8d1a-919bf3732ff2": Terrasoft.DataValueType.LOOKUP,
	/** Boolean. */
	"90b65bf8-0ffc-4141-8779-2420877af907": Terrasoft.DataValueType.BOOLEAN,
	/** Localizable string. */
	"95c6e6c4-2cc8-46be-a1cb-96f942655f86": Terrasoft.DataValueType.LOCALIZABLE_STRING,
	/** Custom object. */
	"84ed6865-9692-4c98-aaed-4d15b96a95c2": Terrasoft.DataValueType.CUSTOM_OBJECT,
	/** Entity. */
	"ebd85d37-0abf-4bbf-bb32-97dc3dffcc8c": Terrasoft.DataValueType.ENTITY,
	/** Entity collection. */
	"51fb23ba-3eb2-11e2-b7d5-b0c76188709b": Terrasoft.DataValueType.ENTITY_COLLECTION,
	/** Entity column mapping collection. */
	"b53eaa2a-4bb7-4a6b-9f4f-58ccab293e31": Terrasoft.DataValueType.ENTITY_COLUMN_MAPPING_COLLECTION,
	/** Localizable parameter values list. */
	"cffc4762-c5c7-44bc-8cc6-cb55aba6e06b": Terrasoft.DataValueType.LOCALIZABLE_PARAMETER_VALUES_LIST,
	/** Color. */
	"dafb71f9-ee9f-4e0b-a4d7-37aa15987155": Terrasoft.DataValueType.COLOR,
	/** Hash text. */
	"ecbcce18-2a17-4ead-829a-9d02fa9578a4": Terrasoft.DataValueType.HASH_TEXT,
	/** Secure text. */
	"3509b9dd-2c90-4540-b82e-8f6ae85d8248": Terrasoft.DataValueType.SECURE_TEXT,
	/** File. */
	"ba40cfc5-f554-4c26-8f57-1bb29cf43c4e": Terrasoft.DataValueType.FILE,
	/** Image. */
	"fa6e6e49-b996-475e-a77e-73904e4c5a88": Terrasoft.DataValueType.IMAGE,
	/** Blob. */
	"b7342b7a-5dde-40de-aa7c-24d2a57b3202": Terrasoft.DataValueType.BLOB,
	/** ImageLookup. */
	"b039feb0-ee7c-4884-8aa6-d6d45d84316f": Terrasoft.DataValueType.IMAGELOOKUP,
	/** MetaDataText. */
	"394e160f-c8e0-46fa-9c0d-75d97e9e9169": Terrasoft.DataValueType.METADATA_TEXT,
	/** ObjectList. */
	"4b51a8b5-1ee9-4437-9d58-f35e083cbcdf": Terrasoft.DataValueType.OBJECT_LIST,
	/** CompositeObjectList. */
	"651ec16f-d140-46db-b9e2-825c985a8ac2": Terrasoft.DataValueType.COMPOSITE_OBJECT_LIST
};

/**
 * Alias for {@link Terrasoft.ServerDataValueType}.
 */
Terrasoft.core.enums.ServerDataValueType = Terrasoft.ServerDataValueType;

/**
 * @enum [Terrasoft.core.enums.ServerDataValueTypeName]
 * Name of server type of data.
 */
Terrasoft.ServerDataValueTypeName = {
	"ShortText": Terrasoft.DataValueType.SHORT_TEXT,
	"MediumText": Terrasoft.DataValueType.MEDIUM_TEXT,
	"LongText": Terrasoft.DataValueType.LONG_TEXT,
	"MaxSizeText": Terrasoft.DataValueType.MAXSIZE_TEXT,
	"Text": Terrasoft.DataValueType.TEXT,
	"HashText": Terrasoft.DataValueType.HASH_TEXT,
	"Integer": Terrasoft.DataValueType.INTEGER,
	"Float": Terrasoft.DataValueType.FLOAT,
	"Float1": Terrasoft.DataValueType.FLOAT1,
	"Float2": Terrasoft.DataValueType.FLOAT2,
	"Float3": Terrasoft.DataValueType.FLOAT3,
	"Float4": Terrasoft.DataValueType.FLOAT4,
	"Float8": Terrasoft.DataValueType.FLOAT8,
	"Money": Terrasoft.DataValueType.MONEY,
	"DateTime": Terrasoft.DataValueType.DATE_TIME,
	"Date": Terrasoft.DataValueType.DATE,
	"Time": Terrasoft.DataValueType.TIME,
	"Boolean": Terrasoft.DataValueType.BOOLEAN,
	"Image": Terrasoft.DataValueType.IMAGE,
	"ImageLookup": Terrasoft.DataValueType.IMAGELOOKUP,
	"File": Terrasoft.DataValueType.FILE,
	"Color": Terrasoft.DataValueType.COLOR,
	"Guid": Terrasoft.DataValueType.GUID,
	"Binary": Terrasoft.DataValueType.BLOB,
	"Lookup": Terrasoft.DataValueType.LOOKUP,
	"MultiLookup": Terrasoft.DataValueType.GUID,
	"ValueList": Terrasoft.DataValueType.INTEGER,
	"Object": Terrasoft.DataValueType.CUSTOM_OBJECT,
	"LocalizableStringDataValueType": Terrasoft.DataValueType.LOCALIZABLE_STRING
};

/**
 * Alias for {@link Terrasoft.ServerDataValueTypeName}.
 */
Terrasoft.core.enums.ServerDataValueTypeName = Terrasoft.ServerDataValueTypeName;

/**
 * @enum [Terrasoft.core.enums.QueryOperationType]
 * Type of data query.
 */
Terrasoft.QueryOperationType = {
	/** Select query. */
	SELECT: 0,
	/** Add query. */
	INSERT: 1,
	/** Edit query. */
	UPDATE: 2,
	/** Delete query. */
	DELETE: 3,
	/** Batch query consisting of several query. */
	BATCH: 4,
	/** Section select query. */
	LISTSELECT: 5,
	/** Detail select query. */
	FILTEREDSELECT: 6,
	/** Lookup select query. */
	LOOKUPSELECT: 7
};

/**
 * Alias for {@link Terrasoft.QueryOperationType}.
 */
Terrasoft.core.enums.QueryOperationType = Terrasoft.QueryOperationType;

/**
 * @enum [Terrasoft.core.enums.ExpressionType]
 *Type of expression.
 */
Terrasoft.ExpressionType = {
	/** Entity column. */
	SCHEMA_COLUMN: 0,
	/** Function. */
	FUNCTION: 1,
	/** Parameter. */
	PARAMETER: 2,
	/** Subquery. */
	SUBQUERY: 3,
	/** Arithmetic operation. */
	ARITHMETIC_OPERATION: 4
};

/**
 * Alias for {@link Terrasoft.ExpressionType}.
 */
Terrasoft.core.enums.ExpressionType = Terrasoft.ExpressionType;

/**
 * @enum [Terrasoft.core.enums.FunctionType]
 *Type of function expression.
 */
Terrasoft.FunctionType = {
	/** The type of the functional expression is not defined. */
	NONE: 0,
	/** Substitution by macro. */
	MACROS: 1,
	/** Aggregating function. */
	AGGREGATION: 2,
	/** Date fragment. */
	DATE_PART: 3,
	/** The size of the value in bytes, used for binary data. */
	LENGTH: 4,
	/** Window query function */
	WINDOW: 5
};

/**
 * Alias for {@link Terrasoft#FunctionType}.
 */
Terrasoft.core.enums.FunctionType = Terrasoft.FunctionType;

/**
 * @enum [Terrasoft.core.enums.QueryMacrosType]
 *Type of the query macro to the object schema.
 */
Terrasoft.QueryMacrosType = {
	/** Macro type not defined. */
	NONE: 0,
	/** Current user. */
	CURRENT_USER: 1,
	/** Current user contact. */
	CURRENT_USER_CONTACT: 2,
	/** Yesterday. */
	YESTERDAY: 3,
	/** Today. */
	TODAY: 4,
	/** Tomorrow. */
	TOMORROW: 5,
	/** Previous week. */
	PREVIOUS_WEEK: 6,
	/** This week. */
	CURRENT_WEEK: 7,
	/** Next week. */
	NEXT_WEEK: 8,
	/** Previous month. */
	PREVIOUS_MONTH: 9,
	/** Current month. */
	CURRENT_MONTH: 10,
	/** Next month. */
	NEXT_MONTH: 11,
	/** Previous quarter. */
	PREVIOUS_QUARTER: 12,
	/** Current quarter. */
	CURRENT_QUARTER: 13,
	/** Next quarter. */
	NEXT_QUARTER: 14,
	/** Previous half of the year. */
	PREVIOUS_HALF_YEAR: 15,
	/** Current half-year. */
	CURRENT_HALF_YEAR: 16,
	/** Next half-year. */
	NEXT_HALF_YEAR: 17,
	/** Last year. */
	PREVIOUS_YEAR: 18,
	/** This year. */
	CURRENT_YEAR: 19,
	/** Previous hour. */
	PREVIOUS_HOUR: 20,
	/** Current hour. */
	CURRENT_HOUR: 21,
	/** Next hour. */
	NEXT_HOUR: 22,
	/** Next year. */
	NEXT_YEAR: 23,
	/** Next N Days. */
	NEXT_N_DAYS: 24,
	/** Previous N days. */
	PREVIOUS_N_DAYS: 25,
	/** Next N hours. */
	NEXT_N_HOURS: 26,
	/** Previous N hours. */
	PREVIOUS_N_HOURS: 27,
	/** Primary column. */
	PRIMARY_COLUMN: 34,
	/** Primary displayed column. */
	PRIMARY_DISPLAY_COLUMN: 35,
	/** Primary image display column. */
	PRIMARY_IMAGE_COLUMN: 36,
	/** Anniversary today. */
	DAY_OF_YEAR_TODAY: 37,
	/** Anniversary on the date computed as today plus days offset. */
	DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET: 38,
	/** Anniversary on the next several days. */
	NEXT_N_DAYS_OF_YEAR: 39,
	/** Anniversary on the previous several days. */
	PREVIOUS_N_DAYS_OF_YEAR: 40
};

/**
 * Alias for {@link Terrasoft#QueryMacrosType}.
 */
Terrasoft.core.enums.QueryMacrosType = Terrasoft.QueryMacrosType;

/**
 * @enum [Terrasoft.core.enums.DatePartType]
 *Date fragment.
 */
Terrasoft.DatePartType = {
	/** Empty value. */
	NONE: 0,
	/** Day. */
	DAY: 1,
	/** Week. */
	WEEK: 2,
	/** Month. */
	MONTH: 3,
	/** Year. */
	YEAR: 4,
	/** Day of the week. */
	WEEK_DAY: 5,
	/** Hour. */
	HOUR: 6,
	/** Minute. */
	HOUR_MINUTE: 7
};

/**
 * Alias for {@link Terrasoft#DatePartType}.
 */
Terrasoft.core.enums.DatePartType = Terrasoft.DatePartType;

/**
 * @enum [Terrasoft.core.enums.DayOfWeek]
 *Date fragment.
 */
Terrasoft.DayOfWeek = {
	/** Monday. */
	MONDAY: 2,
	/** Tuesday. */
	TUESDAY: 4,
	/** Wednesday. */
	WEDNESDAY: 8,
	/** Thursday. */
	THURSDAY: 16,
	/** Friday. */
	FRIDAY: 32,
	/** Saturday. */
	SATURDAY: 64,
	/** Sunday. */
	SUNDAY: 128
};

/**
 * Alias for {@link Terrasoft#DayOfWeek}.
 */
Terrasoft.core.enums.DayOfWeek = Terrasoft.DayOfWeek;

/**
 * @enum [Terrasoft.core.enums.OrderDirection]
 * Sorting direction.
 */
Terrasoft.OrderDirection = {
	/** No sorting. */
	NONE: 0,
	/** Ascending. */
	ASC: 1,
	/** Descending. */
	DESC: 2
};

/**
 * Alias for {@link Terrasoft.OrderDirection}.
 */
Terrasoft.core.enums.OrderDirection = Terrasoft.OrderDirection;

/**
 * @enum [Terrasoft.core.enums.AggregationType]
 * Type of aggregate function.
 */
Terrasoft.AggregationType = {
	/** Aggregation function type not defined. */
	NONE: 0,
	/** Aggregation function type not defined. */
	COUNT: 1,
	/** Sum of values of all elements. */
	SUM: 2,
	/** Average value for all elements. */
	AVG: 3,
	/** The minimum value among all elements. */
	MIN: 4,
	/** The maximum value among all elements. */
	MAX: 5
};

/**
 * Alias for {@link Terrasoft.AggregationType}.
 */
Terrasoft.core.enums.AggregationType = Terrasoft.AggregationType;

/**
 * @enum [Terrasoft.core.enums.AggregationEvalType]
 * The scope of the aggregating function.
 */
Terrasoft.AggregationEvalType = {
	/** The scope of the aggregating function is not defined. */
	NONE: 0,
	/** Applies to all elements. */
	ALL: 1,
	/** Applies to unique values. */
	DISTINCT: 2
};

/**
 * Alias for {@link Terrasoft.AggregationEvalType}.
 */
Terrasoft.core.enums.AggregationEvalType = Terrasoft.AggregationEvalType;

/**
 * @enum [Terrasoft.core.enums.StringFilterType]
 * Type of filter operation.
 */
Terrasoft.StringFilterType = {
	/** The filtered value starts with the searched value. */
	START_WITH: 0,
	/** The filtered value contains the searched value. */
	CONTAIN: 1
};

/**
 * Alias for {@link Terrasoft.StringFilterType}.
 */
Terrasoft.core.enums.StringFilterType = Terrasoft.StringFilterType;

/**
 * @enum [Terrasoft.core.enums.NumeralSystem]
 * Number system.
 */
Terrasoft.NumeralSystem = {
	/** Decimal number system. */
	DECIMAL: 10
};

/**
 * Alias for {@link Terrasoft.NumeralSystem}.
 */
Terrasoft.core.enums.NumeralSystem = Terrasoft.NumeralSystem;

/**
 * @enum [Terrasoft.core.enums.Align]
 * Alignment type.
 */
Terrasoft.Align = {
	/** Right alignment. */
	RIGHT: "right",

	/** Center alignment. */
	CENTER: "center",

	/** Left alignment. */
	LEFT: "left"
};

/**
 * Alias for {@link Terrasoft.Align}.
 */
Terrasoft.core.enums.Align = Terrasoft.Align;

/**
 * @enum [Terrasoft.core.enums.Valign]
 * Vertical alignment type.
 */
Terrasoft.Valign = {
	/** Top alignment. */
	TOP: "top",

	/** Middle alignment. */
	MIDDLE: "middle",

	/** Bottom alignment. */
	BOTTOM: "bottom"
};

/**
 * Alias for {@link Terrasoft.Valign}.
 */
Terrasoft.core.enums.Valign = Terrasoft.Valign;

/**
 * @enum [Terrasoft.core.enums.ImageSources]
 * Image Resources.
 */
Terrasoft.ImageSources = {
	ENTITY_COLUMN: 0,
	IMAGE_LIST_SCHEMA: 1,
	RESOURCE_MANAGER: 2,
	SOURCE_CODE_SCHEMA: 3,
	URL: 4,
	SYS_SETTING: 5,
	SYS_IMAGE: 6,
	PROCESS_USERTASK_SCHEMA: 7
};

/**
 * Alias for {@link Terrasoft.ImageSources}.
 */
Terrasoft.core.enums.ImageSources = Terrasoft.ImageSources;

/**
 * @enum [Terrasoft.core.enums.BindingType]
 * The binding type of a control's property to the model.
 */
Terrasoft.BindingType = {
	/** Simple binding to the model property. */
	PROPERTY: 0,
	/** Binding to a computed function. */
	METHOD: 1,
	/** Binding to a view event. */
	EVENT: 2,
	/** Binding to a collection of items. */
	COLLECTION: 3
};

/**
 * Alias for {@link Terrasoft.BindingType}.
 */
Terrasoft.core.enums.BindingType = Terrasoft.BindingType;

/**
 * @enum [Terrasoft.core.enums.ViewModelColumnType]
 * Model column type.
 */
Terrasoft.ViewModelColumnType = {
	/** Column from the root or related schema. */
	ENTITY_COLUMN: 0,
	/** The computed column. */
	CALCULATED_COLUMN: 1,
	/** Virtual column. */
	VIRTUAL_COLUMN: 2,
	/** Resource column. */
	RESOURCE_COLUMN: 3
};

/**
 * Alias for {@link Terrasoft.ViewModelColumnType}.
 */
Terrasoft.core.enums.ViewModelColumnType = Terrasoft.ViewModelColumnType;

/**
 * @enum [Terrasoft.core.enums.ViewModelSchemaItem]
 * Item type schema element type.
 */
Terrasoft.ViewModelSchemaItem = {
	/** The element of the schema is the representation of the view model column. */
	ATTRIBUTE: 0,
	/** The element of the schema is the view model method. */
	METHOD: 1,
	/** A schema element is a group of other elements. */
	GROUP: 2,
	/** The schema element is a detail. */
	DETAIL: 3,
	/** The schema element is a module. */
	MODULE: 4
};

/**
 * Alias for {@link Terrasoft.ViewModelSchemaItem}.
 */
Terrasoft.core.enums.ViewModelSchemaItem = Terrasoft.ViewModelSchemaItem;

/**
 * @enum [Terrasoft.core.enums.ViewItemType]
 * Schema View Element Type.
 */
Terrasoft.ViewItemType = {
	/** Grid element, which includes the placement of other controls. */
	GRID_LAYOUT: 0,
	/** Tab set. */
	TAB_PANEL: 1,
	/** Detail. */
	DETAIL: 2,
	/** View model element. */
	MODEL_ITEM: 3,
	/** Module. */
	MODULE: 4,
	/** Button. */
	BUTTON: 5,
	/** Label. */
	LABEL: 6,
	/** Container. */
	CONTAINER: 7,
	/** Drop-down list. */
	MENU: 8,
	/** Drop-down list item. */
	MENU_ITEM: 9,
	/** Drop-down list separator. */
	MENU_SEPARATOR: 10,
	/** Section views. */
	SECTION_VIEWS: 11,
	/** Section view. */
	SECTION_VIEW: 12,
	/** List. */
	GRID: 13,
	/** Planner. */
	SCHEDULE_EDIT: 14,
	/** Item group. */
	CONTROL_GROUP: 15,
	/** Radio button group. */
	RADIO_GROUP: 16,
	/** Configured view. */
	DESIGN_VIEW: 17,
	/** Color. */
	COLOR_BUTTON: 18,
	/** Set of tabs with icons. */
	IMAGE_TAB_PANEL: 19,
	/** Hyperlink. */
	HYPERLINK: 20,
	/** Information button with tooltip. */
	INFORMATION_BUTTON: 21,
	/** Tooltip. */
	TIP: 22,
	/** Component. */
	COMPONENT: 23,
	/** Label with tip. */
	TIP_LABEL: 24,
	/** Progress bar.*/
	PROGRESS_BAR: 30,
	/** Grid element, which changes grid element settings. */
	GRID_LAYOUT_EDIT: 31,
	/**IframeControl*/
	IFRAMECONTROL: 32,
	/**External widget*/
	EXTERNAL_WIDGET: 33
};

/**
 * Alias for {@link Terrasoft.ViewItemType}.
 */
Terrasoft.core.enums.ViewItemType = Terrasoft.ViewItemType;

/**
 * @enum [Terrasoft.core.enums.ContentType]
 * Type of schema view model element.
 */
Terrasoft.ContentType = {
	/** Long string. */
	LONG_TEXT: 0,
	/** Short string. */
	SHORT_TEXT: 1,
	/** Date and time. */
	DATE_TIME: 2,
	/** Enumeration. */
	ENUM: 3,
	/** Formatted string. */
	RICH_TEXT: 4,
	/** Lookup. */
	LOOKUP: 5,
	/** Searchable text. */
	SEARCHABLE_TEXT: 6
};

/**
 * Alias for {@link Terrasoft.ContentType}.
 */
Terrasoft.core.enums.ContentType = Terrasoft.ContentType;

/**
 * @enum [Terrasoft.core.enums.TextSize]
 * The size of the title text for the schema element.
 */
Terrasoft.TextSize = {
	/** Standard title display option. */
	STANDARD: 0,
	/** Style "Title". */
	LARGE: 1
};

/**
 * Alias for {@link Terrasoft.TextSize}.
 */
Terrasoft.core.enums.TextSize = Terrasoft.TextSize;

/**
 * @enum [Terrasoft.core.enums.EntitySchemaColumnDefSource]
 * Sources of default column values.
 */
Terrasoft.EntitySchemaColumnDefSource = {
	/** No source. */
	NONE: 0,
	/** Constant. */
	CONST: 1,
	/** Setting. */
	SETTINGS: 2,
	/** System value. */
	SYSTEM_VALUE: 3
};

/**
 * Alias for {@link Terrasoft.EntitySchemaColumnDefSource}.
 */
Terrasoft.core.enums.EntitySchemaColumnDefSource = Terrasoft.EntitySchemaColumnDefSource;

/**
 * @enum [Terrasoft.core.enums.SystemValueType]
 * System Values.
 */
Terrasoft.SystemValueType = {
	/** Current time. */
	CURRENT_TIME: "CurrentTime",
	/** Current date. */
	CURRENT_DATE: "CurrentDate",
	/** Current date and time. */
	CURRENT_DATE_TIME: "CurrentDateTime",
	/** Current user. */
	CURRENT_USER: "CurrentUser",
	/** Current user contact. */
	CURRENT_USER_CONTACT: "CurrentUserContact",
	/** Current user account. */
	CURRENT_USER_ACCOUNT: "CurrentUserAccount",
	/** Current workspace. */
	CURRENT_WORKSPACE: "CurrentWorkspace",
	/** Unique identifier. */
	GENERATE_UID: "AutoGuid",
	/** Serial identifier. */
	GENERATE_SEQUENTIAL_UID: "SequentialGuid",
	/** Current publisher. */
	CURRENT_MAINTAINER: "CurrentMaintainer"
};

/**
 * Alias for {@link Terrasoft.SystemValueType}.
 */
Terrasoft.core.enums.SystemValueType = Terrasoft.SystemValueType;

/**
 * @enum {Number} [Terrasoft.core.enums.SchemaType]
 * Type of schema.
 */
Terrasoft.SchemaType = {
	/**
	 * Module.
	 */
	MODULE: 1,
	/**
	 * Page view model schema.
	 */
	EDIT_VIEW_MODEL_SCHEMA: 2,
	/**
	 * Section view model schema.
	 */
	MODULE_VIEW_MODEL_SCHEMA: 3,
	/**
	 * Detail view model schema.
	 */
	DETAIL_VIEW_MODEL_SCHEMA: 4,
	/**
	 * Detail (with list) view model schema.
	 */
	GRID_DETAIL_VIEW_MODEL_SCHEMA: 5,
	/**
	 * Detail (with fields) view model schema.
	 */
	EDIT_CONTROLS_DETAIL_VIEW_MODEL_SCHEMA: 6,
	/**
	 * Unit-test module schema.
	 */
	UNIT_TEST_MODULE: 7
};

/**
 * Alias for {@link Terrasoft.SchemaType}.
 */
Terrasoft.core.enums.SchemaType = Terrasoft.SchemaType;

/**
 * @enum [Terrasoft.core.enums.NullDate]
 * Zero date.
 * @type {Date}
 */
Terrasoft.core.enums.NullDate = new Date();
Terrasoft.core.enums.NullDate.setFullYear(0, 0, 1);
Terrasoft.core.enums.NullDate.setHours(0, 0, 0);

/**
 * Alias for {@link Terrasoft.NullDate}.
 * @type {Date}
 */
Terrasoft.core.enums.NullDate = Terrasoft.NullDate;

/**
 * @enum [Terrasoft.core.enums.EventName]
 * Event name.
 * @type {String}
 */
Terrasoft.EventName = {
	/** Generating a message. */
	ON_MESSAGE: "message",
	/** Opening message channel. */
	ON_CONNECTION_INITIALIZED: "opened",
	/** Closing message channel. */
	ON_CHANNEL_CLOSED: "closed",
	/** Error. */
	ON_ERROR: "error"
};

/**
 * Alias for {@link Terrasoft.EventName}.
 * @type {String}
 */
Terrasoft.core.enums.EventName = Terrasoft.EventName;

/**
 * @enum [Terrasoft.core.enums.CaptionAlignType]
 * Element header alignment types.
 * @type {String}
 */
Terrasoft.CaptionAlignType = {
	/** Left. */
	LEFT: "left",
	/** Center. */
	MIDDLE: "middle",
	/** Right. */
	RIGHT: "right"
};

/**
 * Alias for {@link Terrasoft.CaptionAlignType}.
 * @type {String}
 */
Terrasoft.core.enums.CaptionAlignType = Terrasoft.CaptionAlignType;

/**
 * @enum [Terrasoft.core.enums.CaptionPositionType]
 * Element Header Location Types.
 * @type {String}
 */
Terrasoft.CaptionPositionType = {
	/** Atop. */
	ABOVE: "above",
	/** Below. */
	BELOW: "below",
	/** To the left. */
	LEFT: "left",
	/** To the right. */
	RIGHT: "right"
};

/**
 * Alias for {@link Terrasoft.CaptionPositionType}.
 * @type {String}
 */
Terrasoft.core.enums.CaptionPositionType = Terrasoft.CaptionPositionType;

/**
 * @enum [Terrasoft.core.enums.GridType]
 * List types.
 * @type {String}
 */
Terrasoft.GridType = {
	/** Tiled. */
	TILED: "tiled",
	/** List. */
	LISTED: "listed"
};

/**
 * Alias for {@link Terrasoft.GridType}.
 * @type {String}
 */
Terrasoft.core.enums.GridType = Terrasoft.GridType;

/**
 * @enum [Terrasoft.core.enums.GridCellType]
 * List cell types.
 * @type {String}
 */
Terrasoft.GridCellType = {
	/** Display as text. */
	TEXT: "text",
	/** Display as title. */
	TITLE: "title",
	/** Display as link. */
	LINK: "link",
	/** Display as image. */
	ICON: "icon"
};

/**
 * Alias for {@link Terrasoft.GridCellType}.
 * @type {String}
 */
Terrasoft.core.enums.GridCellType = Terrasoft.GridCellType;

/**
 * @enum [Terrasoft.core.enums.GridCellViewType]
 * List cell view types.
 * @type {String}
 */
Terrasoft.GridCellViewType = {
	/** Display cell content in one line. */
	ONELINE: "oneline",
	/** Display cell content in multi line. */
	MULTILINE: "multiline"
};

/**
 * Alias for {@link Terrasoft.GridCellViewType}.
 * @type {String}
 */
Terrasoft.core.enums.GridCellViewType = Terrasoft.GridCellViewType;

/**
 * @enum [Terrasoft.core.enums.GridIconType]
 * Types of list icons.
 * @type {String}
 */
Terrasoft.GridIconType = {
	/** Icon 16x16. */
	ICON16: "grid-icon-16x16",
	/** Icon 22x22. */
	ICON22: "grid-icon-22x22",
	/** Icon 3232. */
	ICON32: "grid-icon-32x32",
	ICON16LISTED: "grid-listed-icon-16x16",
	ICON22LISTED: "grid-listed-icon-22x22",
	ICON32LISTED: "grid-listed-icon-32x32"
};

/**
 * Alias for {@link Terrasoft.GridIconType}.
 * @type {String}
 */
Terrasoft.core.enums.GridIconType = Terrasoft.GridIconType;

/**
 * @enum [Terrasoft.core.enums.GridKeyType]
 * Types of list data keys.
 * @type {String}
 */
Terrasoft.GridKeyType = {
	/** Normal text, default value. */
	TEXT: "text",
	/** Uses title style. */
	TITLE: "title",
	/** Data Signature. */
	CAPTION: "caption",
	/* Column caption. */
	LABEL: "label",
	/** Link. */
	LINK: "link",
	/** Icon 16x16. */
	ICON16: "grid-icon-16x16",
	/** Icon 22x22. */
	ICON22: "grid-icon-22x22",
	/** Icon 32x32. */
	ICON32: "grid-icon-32x32",
	ICON16LISTED: "grid-listed-icon-16x16",
	ICON22LISTED: "grid-listed-icon-22x22",
	ICON32LISTED: "grid-listed-icon-32x32"
};

/**
 * Alias for {@link Terrasoft.GridKeyType}.
 * @type {String}
 */
Terrasoft.core.enums.GridKeyType = Terrasoft.GridKeyType;

/**
 * @enum [Terrasoft.core.enums.ImageSize]
 * Image size options.
 * @type {Object}
 */
Terrasoft.ImageSize = {
	/** Own image size. */
	DEFAULT: {
		width: 72,
		height: 72
	},
	/** Icon 16x16. */
	IMAGE16X16: {
		width: 16,
		height: 16
	},
	/** Icon 22x22. */
	IMAGE22X22: {
		width: 22,
		height: 22
	},
	/** Icon 32x32. */
	IMAGE32X32: {
		width: 32,
		height: 32
	}
};

/**
 * Alias for {@link Terrasoft.ImageSize}.
 */
Terrasoft.core.enums.ImageSize = Terrasoft.ImageSize;

/**
 * @enum [Terrasoft.core.enums.DateRate]
 * Time constants.
 * @type {Number}
 */
Terrasoft.DateRate = {
	/** The number of milliseconds in a day. */
	MILLISECONDS_IN_DAY: 86400000,
	/** The number of seconds in an hour. */
	MINUTES_IN_HOUR: 60,
	/** The number of milliseconds in a minute. */
	MILLISECONDS_IN_MINUTE: 60000,
	/** The number of milliseconds in a second. */
	MILLISECONDS_IN_SECOND: 1000
};

/**
 * Alias for {@link Terrasoft.ImageSize}.
 * @type {Object}
 */
Terrasoft.core.enums.DateRate = Terrasoft.DateRate;

/**
 * @enum [Terrasoft.core.enums.LogItemType]
 * Type of message for logger.
 */
Terrasoft.LogItemType = {
	/** Error. */
	ERROR: 0,
	/** Message for debugging the application. */
	DEBUG: 1,
	/** Information message. */
	INFO: 2
};

/**
 * Alias for {@link Terrasoft.LogItemType}.
 */
Terrasoft.core.enums.LogItemType = Terrasoft.LogItemType;

/**
 * @enum [Terrasoft.core.enums.SocketConnectionState]
 * Connection status with ws service, according to http://dev.w3.org/html5/websockets.
 * Extended with the status NOT_INITIALIZED.
 * @type {Number}
 */
Terrasoft.SocketConnectionState = {
	/** Connection is not yet open. */
	CONNECTING: 0,
	/** Connection established. */
	OPEN: 1,
	/** Connection is closing. */
	CLOSING: 2,
	/** Connection established. */
	CLOSED: 3,
	/** Connection has not been initialized. */
	NOT_INITIALIZED: 4
};

/**
 * Alias for {@link Terrasoft.SocketConnectionState}.
 */
Terrasoft.core.enums.SocketConnectionState = Terrasoft.SocketConnectionState;

/**
 * @enum [Terrasoft.core.enums.LoggerType]
 * Type of message logger.
 */
Terrasoft.LoggerType = {
	/** Disable. */
	NONE: -1,
	/** Client. */
	CLIENT: 0,
	/** Server. */
	SERVER: 1,
	/** Client and server. */
	BOTH: 2
};

/**
 * Alias for {@link Terrasoft.LoggerType}.
 */
Terrasoft.core.enums.LoggerType = Terrasoft.LoggerType;

/**
 * @enum [Terrasoft.core.enums.LogMessageType]
 * Type of messages in the console.
 */
Terrasoft.LogMessageType = {
	/** Information. */
	INFORMATION: 0,
	/** Warning. */
	WARNING: 1,
	/** Error. */
	ERROR: 2
};

/**
 * Alias for {@link Terrasoft.LogMessageType}.
 */
Terrasoft.core.enums.LogMessageType = Terrasoft.LogMessageType;

/**
 * @enum [Terrasoft.core.enums.MessageMode]
 * Message mode.
 * @type {String}
 */
Terrasoft.MessageMode = {
	/** Address. */
	PTP: "ptp",
	/** Broadcasting. */
	BROADCAST: "broadcast"
};

/**
 * Alias for {@link Terrasoft.MessageMode}.
 */
Terrasoft.core.enums.MessageMode = Terrasoft.MessageMode;

/**
 * @enum [Terrasoft.core.enums.MessageDirectionType]
 * Message direction.
 * @type {String}
 */
Terrasoft.MessageDirectionType = {
	/** Publishing. */
	PUBLISH: "publish",
	/** Subscription. */
	SUBSCRIBE: "subscribe",
	/** Publishing and subscription. */
	BIDIRECTIONAL: "bidirectional"
};

/**
 * Alias for {@link Terrasoft.MessageDirectionType}.
 */
Terrasoft.core.enums.MessageDirectionType = Terrasoft.MessageDirectionType;

/**
 * @enum [Terrasoft.core.enums.MenuItemType]
 * Class-enumeration of types of menu items.
 */
Terrasoft.MenuItemType = {
	/** An alias of the type of a regular menu item. */
	ITEM: "Terrasoft.MenuItem",
	/** The alias of the menu item type Separator. */
	SEPARATOR: "Terrasoft.MenuSeparator",
	/** The alias of the menu item type Radio. */
	RADIO: "Terrasoft.RadioMenuItem",
	/** The alias of the menu item type Checkbox. */
	CHECK: "Terrasoft.CheckMenuItem",
	/** The alias of the menu item type Color. */
	COLOR: "Terrasoft.ColorMenuItem",
	/** The alias of the menu item type Color. */
	COLOR_PICKER: "Terrasoft.ColorPickerMenuItem"
};

/**
 * Alias for {@link Terrasoft.MenuItemType}.
 */
Terrasoft.core.enums.MenuItemType = Terrasoft.MenuItemType;

/**
 * @enum [Terrasoft.core.enums.MouseButton]
 * Enumeration of mouse buttons.
 */
Terrasoft.MouseButton = {
	/** Left mouse button. */
	LEFT: "Left",
	/** Middle mouse button. */
	MIDDLE: "Middle",
	/** Right mouse button. */
	RIGHT: "Right"
};

/**
 * Alias for {@link Terrasoft.MouseButton}.
 */
Terrasoft.core.enums.MouseButton = Terrasoft.MouseButton;

/**
 * @enum [Terrasoft.core.enums.ESQServerCacheLevels]
 * Level of data placement in the ESQ cache.
 */
Terrasoft.ESQServerCacheLevels = {
	/**
	 * The level of the session. Data placed at this level is available only in the session of the current user.
	 */
	SESSION: 0,
	/**
	 * The global level of the application. Data located at this level will be available to all nodes of the web farm.
	 * The data of different workspaces do not overlap.
	 */
	WORKSPACE: 1,
	/**
	 * The global level of the application. The data hosted at this level will be available to all nodes of the web farm
	 * regardless of workspace. Use this level only in case of emergency and with
	 * clearly understanding of the features of the application in the web farm.
	 */
	APPLICATION: 2
};

/**
 * Alias for {@link Terrasoft.ESQServerCacheLevels}.
 */
Terrasoft.core.enums.ESQServerCacheLevels = Terrasoft.ESQServerCacheLevels;

/**
 * @enum [Terrasoft.core.enums.ModificationStatus]
 * Entity change status.
 */
Terrasoft.ModificationStatus = {
	/** Unchanged. */
	NOT_MODIFIED: 0,
	/** Deleted. */
	REMOVED: 1,
	/** New. */
	NEW: 2,
	/** Modified. */
	UPDATED: 3
};

/**
 * Alias for {@link Terrasoft.ModificationStatus}.
 */
Terrasoft.core.enums.ModificationStatus = Terrasoft.ModificationStatus;

/**
 * @enum [Terrasoft.core.enums.EntityChangeType]
 * Entity change type.
 */
Terrasoft.EntityChangeType = {
	/** None. */
	None: 0,
	/** Inserted. */
	Inserted: 1,
	/** Updated. */
	Updated: 2,
	/** Deleted. */
	Deleted: 4
};

/**
 * Alias for {@link Terrasoft.EntityChangeType}.
 */
Terrasoft.core.enums.EntityChangeType = Terrasoft.EntityChangeType;

/**
 * @enum [Terrasoft.core.enums.EntitySchemaColumnUsageType]
 * Column usage modes.
 */
Terrasoft.EntitySchemaColumnUsageType = {
	/** Regular. */
	General: 0,
	/** Extended. */
	Advanced: 1,
	/** Never. */
	None: 2
};

/**
 * Alias for {@link Terrasoft.EntitySchemaColumnUsageType}.
 */
Terrasoft.core.enums.EntitySchemaColumnUsageType = Terrasoft.EntitySchemaColumnUsageType;

/**
 * @enum [Terrasoft.core.enums.UserType]
 * Type of user.
 */
Terrasoft.UserType = {
	/** Regular user. */
	GENERAL: "General",
	/** Portal user. */
	SSP: "SSP",
	/** Virtual user. */
	VIRTUAL: "Virtual"
};

/**
 * Alias for {@link Terrasoft.ModificationStatus}.
 */
Terrasoft.core.enums.UserType = Terrasoft.UserType;

/**
 * @enum [Terrasoft.core.enums.FlowElementGroup]
 * Group of BPMN elements.
 */
Terrasoft.FlowElementGroup = {
	/** User task. */
	UserTask: "UserTask",
	/** System action. */
	ServiceTask: "ServiceTask",
	/** Start event. */
	StartEvent: "StartEvent",
	/** Intermediate event. */
	IntermediateEvent: "IntermediateEvent",
	/** End event. */
	EndEvent: "EndEvent",
	/** Gateway. */
	Gateway: "Gateway",
	/** Sub-process. */
	Subprocess: "Subprocess"
};

/**
 * Alias for {@link Terrasoft.FlowElementGroup}.
 */
Terrasoft.core.enums.FlowElementGroup = Terrasoft.FlowElementGroup;

Ext.ns("Terrasoft.controls.TipEnums");

/**
 * @enum [Terrasoft.controls.TipEnums.displayMode]
 * Tip mode enumerations.
 */
Terrasoft.TipDisplayMode = {
	/** Tooltip. */
	WIDE: "wide",
	/** Hint. */
	NARROW: "narrow"
};

/**
 * Alias for {@link Terrasoft.TipDisplayMode}.
 */
Terrasoft.controls.TipEnums.displayMode = Terrasoft.TipDisplayMode;

/**
 * @enum [Terrasoft.controls.TipEnums.visibilityChangeEvent]
 * Used by visibilityChange event of {@link Terrasoft.controls.Tip} component.
 */
Terrasoft.controls.TipEnums.visibilityChangeEvent = {
	/** Used in beforeVisibilityChange event fired by tip before hide.*/
	HIDE: "hide",
	/** Used in beforeVisibilityChange event fired by tip before hide, if user clicked on document body.*/
	HIDE_ON_DOCUMENT_MOUSE_DOWN: "hide_on_document_mousedown"
};

/**
 * @enum [Terrasoft.core.enums.SysPackageInstallType]
 * Package install type.
 */
Terrasoft.SysPackageInstallType = {
	/** Source control. */
	SourceControl: 0,
	/** Repository. */
	Repository: 1
};

/**
 * Alias for {@link Terrasoft.SysPackageInstallType}.
 */
Terrasoft.core.enums.SysPackageInstallType = Terrasoft.SysPackageInstallType;

/**
 * @enum [Terrasoft.core.enums.ServerChannelSender]
 * Server channel sender name.
 */
Terrasoft.ServerChannelSender = {
	CONSOLE_COMMAND: "ConsoleCommand",
	BROADCAST_MESSAGE: "BroadcastMsg",
	COMMAND_SERVICE: "CommandService"
};

/**
 * Alias for {@link Terrasoft.ServerChannelSender}.
 */
Terrasoft.core.enums.ServerChannelSender = Terrasoft.ServerChannelSender;

/**
 * @enum [Terrasoft.core.enums.ModificationForbidLevel]
 * Modification forbid level.
 * @type {Number}
 */
Terrasoft.ModificationForbidLevel = {
	/** There is no prohibition of modification. */
	NONE: 0,
	/** There is a package that was created by third party. */
	PACKAGE: 1,
	/** There is a lock by another user. */
	ELEMENT: 2
};

/**
 * Alias for {@link Terrasoft.ModificationForbidLevel}.
 */
Terrasoft.core.enums.ModificationForbidLevel = Terrasoft.ModificationForbidLevel;

/**
 * @enum [Terrasoft.core.enums.ColorEncoding]
 * Color encoding.
 * @type {String}
 */
Terrasoft.ColorEncoding = {
	/** HEX color encoding. */
	HEX: "HEX",
	/** RGB color encoding. */
	RGB: "RGB"
};

/**
 * Alias for {@link Terrasoft.ColorEncoding}.
 */
Terrasoft.core.enums.ColorEncoding = Terrasoft.ColorEncoding;

/**
 * @enum [Terrasoft.core.enums.PredictableState]
 * Predictable column state.
 * @type {Number}
 */
Terrasoft.PredictableState = {
	/** In progress predictable state. */
	INPROGRESS: 0,
	/** Exact predictable state. */
	EXACT: 1,
	/** Not exact predictable state. */
	NOTEXACT: 2,
	/** Insignificance predictable state. */
	INSIGNIFICANCE: 3
};

/**
 * Alias for {@link Terrasoft.PredictableState}.
 */
Terrasoft.core.enums.PredictableState = Terrasoft.PredictableState;

/**
 * @enum [Terrasoft.core.enums.ProcessStatus]
 * Process status.
 * @type {Number}
 */
Terrasoft.ProcessStatus = {
	/** Inactive. */
	INACTIVE: 0,
	/** Running. */
	RUNNING: 1,
	/** Completed. */
	COMPLETED: 2,
	/** Error. */
	ERROR: 3,
	/** Canceled. */
	CANCELED: 4
};

/**
 * Alias for {@link Terrasoft.ProcessStatus}.
 */
Terrasoft.core.enums.ProcessStatus = Terrasoft.ProcessStatus;

/**
 * @enum [Terrasoft.core.enums.ScrollTypeInRtl]
 * Process status.
 * @type {String}
 */
Terrasoft.ScrollTypeInRtl = {
	/** WebKit */
	DEFAULT: "DEFAULT",
	/** Firefox/Opera */
	NEGATIVE: "NEGATIVE",
	/** IE */
	REVERSE: "REVERSE"
};

/**
 * Alias for {@link Terrasoft.ScrollTypeInRtl}.
 */
Terrasoft.core.enums.ScrollTypeInRtl = Terrasoft.ScrollTypeInRtl;

/**
 * @enum [Terrasoft.core.enums.QuerySource]
 * Query source.
 * @type {Number}
 */

Terrasoft.QuerySource = {
	/** Undefined source. */
	UNDEFINED: 0,
	/** From filter. */
	FILTER: 1,
	/** From summaries with filter*/
	FILTER_SUMMARY: 2
};

/**
 * Alias for {@link Terrasoft.QuerySource}.
 */
Terrasoft.core.enums.QuerySource = Terrasoft.QuerySource;

/**
 * @enum [Terrasoft.core.enums.BusinessRuleActionSourceType]
 * Business rule action source type.
 * @type {Number}
 */
Terrasoft.BusinessRuleActionSourceType = {
	/** Column source. */
	COLUMN_SOURCE: 0,
	/** Attribute source. */
	ATTRIBUTE_SOURCE: 1,
	/** Parameter source. */
	PARAMETER_SOURCE: 2
};

/**
 * Alias for {@link Terrasoft.BusinessRuleActionSourceType}.
 */
Terrasoft.core.enums.BusinessRuleActionSourceType = Terrasoft.BusinessRuleActionSourceType;

/**
 * @enum [Terrasoft.core.enums.SysSettingsRightsOperationType]
 * Types of operations for applying rights to system settings.
 * @type {Number}
 */
Terrasoft.SysSettingsRightsOperationType = {
	/** System settings are available to all employees. */
	ALLOW_ALL: 0,
	/** System settings are available only to users with "CanManageSysSettings" admin operation. */
	RESTRICT_ALL: 1,
	/** System settings are available to users with specified admin operation. */
	ALLOW_BY_OPERATION: 2
};

/**
 * Alias for {@link Terrasoft.SysSettingsRightsOperationType}.
 */
Terrasoft.core.enums.SysSettingsRightsOperationType = Terrasoft.SysSettingsRightsOperationType;