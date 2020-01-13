Ext.ns("Terrasoft.process.constants");

var consts = Terrasoft.process.constants;

/**
 * Formula macros separator.
 * @type {String}
 */
consts.MACROS_SEPARATOR = ".";
/**
 * Formula macros left bracket.
 * @type {String}
 */
consts.LEFT_MACROS_BRACKET = "[#";
/**
 * Formula macros right bracket.
 * @type {String}
 */
consts.RIGHT_MACROS_BRACKET = "#]";
/**
 * Boolean macros for true value.
 * @type {String}
 */
consts.BOOLEAN_MACROS_PREFIX = "BooleanValue";
/**
 * Boolean macros for true value.
 * @type {String}
 */
consts.BOOLEAN_MACROS_TRUE_VALUE = "True";
/**
 * Boolean macros for false value.
 * @type {String}
 */
consts.BOOLEAN_MACROS_FALSE_VALUE = "False";
/**
 * Property value macros of the caption.
 * @type {String}
 */
consts.PROPERTY_VALUE_MACROS_CAPTION = "Caption";
/**
 * Macros property value prefix template.
 * @type {String}
 */
consts.PROPERTY_VALUE_TEMPLATE = "[PropertyValue:{0}]";
/**
 * Macros of the caption property value.
 * @type {String}
 */
consts.CAPTION_PROPERTY_VALUE_MACROS =
	Ext.String.format(consts.PROPERTY_VALUE_TEMPLATE, consts.PROPERTY_VALUE_MACROS_CAPTION);
/**
 * System variable formula macros prefix.
 * @type {String}
 */
consts.SYS_VARIABLE_PREFIX = "SysVariable";
/**
 * System settings formula macros prefix.
 * @type {String}
 */
consts.SYS_SETTINGS_PREFIX = "SysSettings";
/**
 * Lookup value formula macros prefix.
 * @type {String}
 */
consts.LOOKUP_VALUE_PREFIX = "Lookup";
/**
 * Sampling column value formula macros prefix.
 * @type {String}
 */
consts.SAMPLING_COLUMN_VALUE_PREFIX = "SamplingColumnValue.";
/**
 * Time value formula macros prefix.
 * @type {String}
 */
consts.TIME_VALUE_PREFIX = "TimeValue";
/**
 * Date value formula macros prefix.
 * @type {String}
 */
consts.DATE_VALUE_PREFIX = "DateValue";
/**
 * Date and time value formula macros prefix.
 * @type {String}
 */
consts.DATE_TIME_VALUE_PREFIX = "DateTimeValue";
/**
 * Column value macros prefix.
 * @type {String}
 */
consts.COLUMN_VALUE_PREFIX = "ColumnValue";
/**
 * Parameter formula macros prefix.
 * @type {String}
 */
consts.PARAMETER_PREFIX = consts.PARAMETER_IS_OWNER_SCHEMA + consts.MACROS_SEPARATOR +
	consts.PARAMETER_IS_SCHEMA;
/**
 * Parameter is owner schema prefix.
 * @type {String}
 */
consts.PARAMETER_IS_OWNER_SCHEMA = "[IsOwnerSchema:false]";
/**
 * Parameter is schema prefix.
 * @type {String}
 */
consts.PARAMETER_IS_SCHEMA = "[IsSchema:false]";
/**
 * Macros element prefix template.
 * @type {String}
 */
consts.PARAMETER_ELEMENT_TEMPLATE = "[Element:{{0}}]";
/**
 * Macros parameter prefix template.
 * @type {String}
 */
consts.PARAMETER_PARAMETER_TEMPLATE = "[Parameter:{{0}}]";
/**
 * Macros column prefix template.
 * @type {String}
 */
consts.PARAMETER_ENTITY_COLUMN_TEMPLATE = "[EntityColumn:{{0}}]";
/**
 * System setting value template.
 * @type {String}
 */
consts.SYS_SETTING_VALUE_TEMPLATE = "{0}<{1}>";
/**
 * Target parameter meta-path template macros.
 * @type {String}
 */
consts.PARAMETER_METAPATH_TEMPLATE = consts.PARAMETER_ELEMENT_TEMPLATE + consts.MACROS_SEPARATOR + "[Parameter:{{1}}]";
/**
 * Target meta-path template macros of the entity schema column.
 * @type {String}
 */
consts.ENTITY_COLUMN_METAPATH_TEMPLATE = ".[EntityColumn:{{2}}]";
/**
 * Parameter element formula macros prefix.
 * @type {String}
 */
consts.ELEMENT_PARAMETER_TEMPLATE = consts.PARAMETER_PREFIX + consts.MACROS_SEPARATOR +
	consts.PARAMETER_METAPATH_TEMPLATE;
/**
 * Macros of the parameter element whith entity schema column meta-path.
 * @type {String}
 */
consts.ENTITY_COLUMN_ELEMENT_PARAMETER_TEMPLATE = consts.PARAMETER_PREFIX + consts.MACROS_SEPARATOR +
	consts.PARAMETER_METAPATH_TEMPLATE + consts.ENTITY_COLUMN_METAPATH_TEMPLATE;
/**
 * Parameter formula macros template.
 * @type {String}
 */
consts.PARAMETER_TEMPLATE = consts.PARAMETER_PREFIX + consts.MACROS_SEPARATOR + consts.PARAMETER_PARAMETER_TEMPLATE;
/**
 * Lookup parameter formula macros template.
 * @type {String}
 */
consts.LOOKUP_PARAMETER_TEMPLATE = consts.LOOKUP_VALUE_PREFIX + consts.MACROS_SEPARATOR + "{0}.{1}";
/**
 * System settings parameter formula macros template.
 * @type {String}
 */
consts.SYS_SETTINGS_PARAMETER_TEMPLATE = consts.SYS_SETTINGS_PREFIX + consts.MACROS_SEPARATOR +
	consts.SYS_SETTING_VALUE_TEMPLATE;
/**
 * System variables parameter formula macros template.
 * @type {String}
 */
consts.SYS_VARIABLE_PARAMETER_TEMPLATE = consts.SYS_VARIABLE_PREFIX + consts.MACROS_SEPARATOR + "{0}";
/**
 * Formula parameter regular expression.
 * @type {RegExp}
 */
consts.PARAMETER_REGEX = /\[\#(.*?)\#\]/g;
/**
 * Process parameter from html regular expression.
 * @type {RegExp}
 */
consts.HTML_PARAMETER_REGEX = /(<img.*?data-type="ProcessParameter".*?\/>)/g;
/**
 * Formula parameter regular expression for regex escape.
 * @type {RegExp}
 */
consts.PARAMETER_ESCAPE_REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;
/**
 * Formula parameter mapping regular expression.
 * @type {RegExp}
 */
consts.PARAMETER_MAPPING_REGEX = /\[([a-zA-Z]+):{?([-\w]+)}?\]/g;
/**
 * Lookup parameter regular expression.
 * @type {RegExp}
 */
consts.PARAMETER_LOOKUP_REGEX = /\[\#(.*?)\.(.*?)\.(.*?)\#\]/g;
/**
 * Regular expression for formula arguments with brackets.
 * @type {RegExp}
 */
consts.FORMULA_ARGUMENTS_REGEX = /\(.+\)/g;
/**
 * Default edit page schema name.
 * @type {String}
 */
consts.DEFAULT_EDIT_PAGE_SCHEMA_NAME = "BaseProcessSchemaElementPropertiesPage";
/**
 * Terrasoft Common namespace.
 * @type {String}
 */
consts.TERRASOFT_COMMON_NAMESPACE = "Terrasoft.Common.";
/**
 * Date value formula format.
 * @type {String}
 */
consts.DATE_VALUE_FORMAT = "d.m.Y";
/**
 * Time value formula format.
 * @type {String}
 */
consts.TIME_VALUE_FORMAT = "H:i";
/**
 * DateTime value formula format.
 * @type {String}
 */
consts.DATE_TIME_VALUE_FORMAT = "d.m.Y H:i";
/**
 * ID of the read data user task schema.
 * @type {String}
 */
consts.READ_DATA_USER_TASK_SCHEMA_UID = "cb455b6f-78ff-4b1e-b241-c2bbc0b37e9f";
/**
 * ID of the subProcess flow element.
 * @type {String}
 */
consts.SUBPROCESS_MANAGER_ITEM_UID = "49eafdbb-a89e-4bdf-a29d-7f17b1670a45";
/**
 * Email recipient parameter template.
 * @type {String}
 */
consts.EMAIL_RECIPIENT_PARAMETER_TEMPLATE = "^{0}\\d+$";
/**
 * Server generic list type.
 * @type {String}
 */
consts.SERVER_GENERIC_LIST_TYPE = "System.Collections.Generic.List`1[[System.Collections.Generic.Dictionary`2" +
	"[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib]], mscorlib";
/**
 * Server generic dictionary.
 * @type {String}
 */
consts.SERVER_GENERIC_DICTIONARY = "System.Collections.Generic.Dictionary`2" +
	"[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib";

var functionsResources = Terrasoft.Resources.ProcessSchemaDesigner.Functions;
/**
 * Functions display values.
 * @type {{value: string, displayValue: string}[]}
 */
consts.FUNCTIONS = [
	{
		value: "Math.Ceiling",
		displayValue: functionsResources.FunctionRoundUp
	},
	{
		value: "Math.Round",
		displayValue: functionsResources.FunctionRound
	},
	{
		value: "Math.Floor",
		displayValue: functionsResources.FunctionRoundDown
	},
	{
		value: "Math.Abs",
		displayValue: functionsResources.FunctionAbs
	},
	{
		value: "FormulaUtilities.Min",
		displayValue: functionsResources.FunctionMin
	},
	{
		value: "FormulaUtilities.Max",
		displayValue: functionsResources.FunctionMax
	},
	{
		value: "FormulaUtilities.Avg",
		displayValue: functionsResources.FunctionAvg
	},
	{
		value: "FormulaUtilities.Mod",
		displayValue: functionsResources.FunctionMod
	},
	{
		value: "DateTimeUtilities.Day",
		displayValue: functionsResources.FunctionDay
	},
	{
		value: "DateTimeUtilities.Month",
		displayValue: functionsResources.FunctionMonth
	},
	{
		value: "DateTimeUtilities.Time",
		displayValue: functionsResources.FunctionTime
	},
	{
		value: "DateTimeUtilities.DayOfWeek",
		displayValue: functionsResources.FunctionDayOfWeek
	},
	{
		value: "DateTimeUtilities.DayInRange",
		displayValue: functionsResources.FunctionDayInRange
	}
];

var systemValueCaptionsResources = Terrasoft.Resources.SystemValueCaptions;
/**
 * System variables display values.
 * @type {{value: string, displayValue: string}[]}
 */
consts.SYS_VARIABLES = [
	{
		value: Terrasoft.SystemValueType.GENERATE_UID,
		displayValue: systemValueCaptionsResources.AutoGuid
	},
	{
		value: Terrasoft.SystemValueType.GENERATE_SEQUENTIAL_UID,
		displayValue: systemValueCaptionsResources.SequentialGuid
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_DATE_TIME,
		displayValue: systemValueCaptionsResources.CurrentDateTime
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_DATE,
		displayValue: systemValueCaptionsResources.CurrentDate
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_TIME,
		displayValue: systemValueCaptionsResources.CurrentTime
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_USER,
		displayValue: systemValueCaptionsResources.CurrentUser
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_USER_CONTACT,
		displayValue: systemValueCaptionsResources.CurrentUserContact
	},
	{
		value: Terrasoft.SystemValueType.CURRENT_USER_ACCOUNT,
		displayValue: systemValueCaptionsResources.CurrentUserAccount
	}
];

/**
 * Result type of the read data user task.
 * @type {String}
 * @deprecated Will be removed soon. Use configuration module (ProcessUserTaskConstants).
 */
consts.READ_DATA_RESULT_TYPE = {
	ENTITY: "0",
	FUNCTION: "1"
};

/**
 * Item change actions.
 * @enum
 */
consts.ITEM_CHANGE_ACTION = {
	ADD: "add",
	DELETE: "delete",
	MODIFY: "modify"
};

/**
 * DateTime dataValueType in CamelCase.
 * @enum
 */
consts.DATE_TIME_VALUE_TYPE_NAME_IN_CAMEL_CASE = {
	DATE_TIME: "DateTime",
	DATE: "Date",
	TIME: "Time"
};

/**
 * Order of designer left toolbar items.
 * @type {String[]}
 */
consts.DESIGNER_LEFT_TOOLBAR_ITEMS_ORDER = [
	"ActivityUserTask",
	"EmailUserTask",
	"UserQuestionUserTask",
	"OpenEditPageUserTask",
	"AutoGeneratedPageUserTask",
	"PreconfiguredPageUserTask",
	"ReadDataUserTask",
	"AddDataUserTask",
	"ChangeDataUserTask",
	"DeleteDataUserTask",
	"FormulaTask",
	"ChangeAdminRightsUserTask",
	"WebService",
	"MLDataPredictionUserTask",
	"SendEmailUserTask",
	"ScriptTask",
	"LinkEntityToProcessUserTask",
	"UserTask",
	"EmailTemplateUserTask"
];

/**
 * Signal event types.
 * @enum
 */
consts.SignalType = {
	SimpleSignal: 0,
	ObjectSignal: 1
};

/**
 * Timer expression types.
 * @enum
 */
consts.TimerExpressionTypes = {
	Empty: -1,
	SingleRun: 0,
	MinuteHour: 1,
	Day: 2,
	Week: 3,
	Month: 4,
	Year: 5,
	CustomCronExpression: 6
};

/**
 * Alias for {@link Terrasoft.process.constants#TimerExpressionTypes}
 * @inheritdoc Terrasoft.process.constants#TimerExpressionTypes
 */
Terrasoft.TimerExpressionTypes = consts.TimerExpressionTypes;

/**
 * Numbering of the day of the week in a month.
 * @enum
 */
consts.CronWeekDayPosition = {
	First: 1,
	Second: 2,
	Third: 3,
	Fourth: 4,
	Last: 5
};

/**
 * Alias for {@link Terrasoft.process.constants#CronWeekDayPosition}
 * @inheritdoc Terrasoft.process.constants#CronWeekDayPosition
 */
Terrasoft.CronWeekDayPosition = consts.CronWeekDayPosition;

/**
 * Numbering of the work in a month.
 * @enum
 */
consts.CronWorkDayPosition = {
	First: 1,
	Last: 5
};

/**
 * Alias for {@link Terrasoft.process.constants#CronWorkDayPosition}
 * @inheritdoc Terrasoft.process.constants#CronWorkDayPosition
 */
Terrasoft.CronWorkDayPosition = consts.CronWorkDayPosition;

/**
 * Day types.
 * @enum
 */
consts.CronDayTypes = {
	Day: 0,
	WorkDay: 1
};

/**
 * Alias for {@link Terrasoft.process.constants#CronDayTypes}
 * @inheritdoc Terrasoft.process.constants#CronDayTypes
 */
Terrasoft.CronDayTypes = consts.CronDayTypes;

/**
 * Day period types.
 * @enum
 */
consts.CronDayPeriodTypes = {
	Day: 0,
	WeekDay: 1,
	WorkDay: 2
};

/**
 * Alias for {@link Terrasoft.process.constants#CronDayPeriodTypes}
 * @inheritdoc Terrasoft.process.constants#CronDayPeriodTypes
 */
Terrasoft.CronDayPeriodTypes = consts.CronDayPeriodTypes;

/**
 * Timer misfire instruction types.
 * @enum
 */
consts.TimerMisfireInstructionTypes = {
	IgnoreMisfires: 0,
	FireNow: 1
};

/**
 * Alias for {@link Terrasoft.process.constants#TimerMisfireInstructionTypes}
 * @inheritdoc Terrasoft.process.constants#TimerMisfireInstructionTypes
 */
Terrasoft.TimerMisfireInstructionTypes = consts.TimerMisfireInstructionTypes;

/**
 * Signal event change types.
 * @enum
 */
consts.SignalExpectChanges = {
	AnyField: 0,
	AnySelectedField: 1
};

/**
 * Type Mapping menu.
 * @enum
 */
consts.TypeMappingMenu = {
	Default: 0,
	EmailRecipientType: 1
};
