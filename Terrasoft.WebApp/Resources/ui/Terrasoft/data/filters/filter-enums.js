Ext.ns("Terrasoft.filter.enums");

/** @enum
 *  Filter macro type */
Terrasoft.filter.enums.FilterMacrosType = {
	/** Previous hour */
	HOUR_PREVIOUS: 0,
	/** Current hour */
	HOUR_CURRENT: 1,
	/** Next hour */
	HOUR_NEXT: 2,
	/** <?> Exact time */
	HOUR_EXACT: 3,
	/** <?> previous hours */
	HOUR_PREVIOUS_N: 4,
	/** <?> next hours */
	HOUR_NEXT_N: 5,
	/** Yesterday */
	DAY_YESTERDAY: 6,
	/** Today */
	DAY_TODAY: 7,
	/** Tomorrow */
	DAY_TOMORROW: 8,
	/** <?> day of the month */
	DAY_OF_MONTH: 9,
	/** <?> day of the week */
	DAY_OF_WEEK: 10,
	/** <?> previous days */
	DAY_PREVIOUS_N: 11,
	/** <?> next days */
	DAY_NEXT_N: 12,
	/** Previous week */
	WEEK_PREVIOUS: 13,
	/** This week */
	WEEK_CURRENT: 14,
	/** Next week */
	WEEK_NEXT: 15,
	/** Previous month */
	MONTH_PREVIOUS: 16,
	/** Current month */
	MONTH_CURRENT: 17,
	/** Next month */
	MONTH_NEXT: 18,
	/** Month of the year */
	MONTH_EXACT: 19,
	/** Previous quarter */
	QUARTER_PREVIOUS: 20,
	/** Current quarter */
	QUARTER_CURRENT: 21,
	/** Next quarter */
	QUARTER_NEXT: 22,
	/** Previous half of the year */
	HALF_YEAR_PREVIOUS: 23,
	/** Current half-year */
	HALF_YEAR_CURRENT: 24,
	/** Next half-year */
	HALF_YEAR_NEXT: 25,
	/** Last year */
	YEAR_PREVIOUS: 26,
	/** This year */
	YEAR_CURRENT: 27,
	/** Next year */
	YEAR_NEXT: 28,
	/** <?> year */
	YEAR_EXACT: 29,
	/** Current contact */
	CONTACT_CURRENT: 30,
	/** Current user */
	USER_CURRENT: 31,
	/** Anniversary today. */
	DAY_OF_YEAR_TODAY: 32,
	/** Anniversary on the date computed as today plus days offset. */
	DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET: 33,
	/** Anniversary on the next several days. */
	NEXT_N_DAYS_OF_YEAR: 34,
	/** Anniversary on the previous several days. */
	PREVIOUS_N_DAYS_OF_YEAR: 35
};

/**
 * Abbreviation for {@link Terrasoft.filter.enums.FilterMacrosType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.filter.enums.FilterMacrosType
 */
Terrasoft.FilterMacrosType = Terrasoft.filter.enums.FilterMacrosType;

/**
 * List of filter macro types that accept parameters
 * @type {Terrasoft.FilterMacrosType[]}
 */
Terrasoft.filter.enums.ParameterizedFilterMacrosTypes = [
	Terrasoft.FilterMacrosType.HOUR_PREVIOUS_N,
	Terrasoft.FilterMacrosType.HOUR_NEXT_N,
	Terrasoft.FilterMacrosType.DAY_PREVIOUS_N,
	Terrasoft.FilterMacrosType.DAY_NEXT_N,
	Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET,
	Terrasoft.FilterMacrosType.NEXT_N_DAYS_OF_YEAR,
	Terrasoft.FilterMacrosType.PREVIOUS_N_DAYS_OF_YEAR
];

/**
 * Abbreviation for {@link Terrasoft.filter.enums.ParameterizedFilterMacrosTypes}
 * @member Terrasoft
 * @inheritdoc Terrasoft.filter.enums.ParameterizedFilterMacrosTypes
 */
Terrasoft.ParameterizedFilterMacrosTypes = Terrasoft.filter.enums.ParameterizedFilterMacrosTypes;

/**
 * Macro Type Settings Object
 * @type {Object}
 */
Terrasoft.filter.enums.MacrosTypeConfig = {};

/**
 * Abbreviation for {@link Terrasoft.filter.enums.MacrosTypeConfig}
 * @member Terrasoft
 * @inheritdoc Terrasoft.filter.enums.MacrosTypeConfig
 */
Terrasoft.MacrosTypeConfig = Terrasoft.filter.enums.MacrosTypeConfig;

Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY] = {
	caption: Terrasoft.Resources.FilterMacros.DayOfYearToday,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDayOfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.DAY_OF_YEAR_TODAY,
	datePartType: Terrasoft.DatePartType.DAY
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET] = {
	caption: Terrasoft.Resources.FilterMacros.DayOfYearTodayPlusDaysOffset,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDayOfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET,
	datePartType: Terrasoft.DatePartType.DAY,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		minValue: -365,
		maxValue: 365
	},
	comparisonType: {
		isEnabled: false,
		defaultValue: Terrasoft.ComparisonType.EQUAL
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.NEXT_N_DAYS_OF_YEAR] = {
	caption: Terrasoft.Resources.FilterMacros.NextNDaysOfYear,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDayOfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_N_DAYS_OF_YEAR,
	datePartType: Terrasoft.DatePartType.DAY,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		minValue: 0,
		maxValue: 365
	},
	comparisonType: {
		isEnabled: false,
		defaultValue: Terrasoft.ComparisonType.EQUAL
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.PREVIOUS_N_DAYS_OF_YEAR] = {
	caption: Terrasoft.Resources.FilterMacros.PreviousNDaysOfYear,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDayOfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_N_DAYS_OF_YEAR,
	datePartType: Terrasoft.DatePartType.DAY,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		minValue: 0,
		maxValue: 365
	},
	comparisonType: {
		isEnabled: false,
		defaultValue: Terrasoft.ComparisonType.EQUAL
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.HourPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_HOUR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.HourCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_HOUR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.HourNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_HOUR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_EXACT] = {
	caption: Terrasoft.Resources.FilterMacros.HourExact,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.DATE_PART,
	queryMacrosType: Terrasoft.QueryMacrosType.NONE,
	datePartType: Terrasoft.DatePartType.HOUR_MINUTE,
	value: {
		dataValueType: Terrasoft.DataValueType.TIME
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_PREVIOUS_N] = {
	caption: Terrasoft.Resources.FilterMacros.HourPreviousN,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_N_HOURS,
	datePartType: Terrasoft.DatePartType.NONE,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HOUR_NEXT_N] = {
	caption: Terrasoft.Resources.FilterMacros.HourNextN,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHour,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_N_HOURS,
	datePartType: Terrasoft.DatePartType.NONE,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_YESTERDAY] = {
	caption: Terrasoft.Resources.FilterMacros.DayYesterday,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.YESTERDAY,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_TODAY] = {
	caption: Terrasoft.Resources.FilterMacros.DayToday,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.TODAY,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_TOMORROW] = {
	caption: Terrasoft.Resources.FilterMacros.DayTomorrow,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.TOMORROW,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_OF_MONTH] = {
	caption: Terrasoft.Resources.FilterMacros.DayOfMonth,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.DATE_PART,
	queryMacrosType: Terrasoft.QueryMacrosType.NONE,
	datePartType: Terrasoft.DatePartType.DAY,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		minValue: 1,
		maxValue: 31
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_OF_WEEK] = {
	caption: Terrasoft.Resources.FilterMacros.DayOfWeek,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.DATE_PART,
	queryMacrosType: Terrasoft.QueryMacrosType.NONE,
	datePartType: Terrasoft.DatePartType.WEEK_DAY,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		displayValueRange: Terrasoft.Resources.CultureSettings.shortDayNames
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_PREVIOUS_N] = {
	caption: Terrasoft.Resources.FilterMacros.DayPreviousN,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_N_DAYS,
	datePartType: Terrasoft.DatePartType.NONE,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.DAY_NEXT_N] = {
	caption: Terrasoft.Resources.FilterMacros.DayNextN,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupDay,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_N_DAYS,
	datePartType: Terrasoft.DatePartType.NONE,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.WEEK_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.WeekPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupWeek,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_WEEK,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.WEEK_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.WeekCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupWeek,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_WEEK,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.WEEK_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.WeekNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupWeek,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_WEEK,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.MONTH_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.MonthPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupMonth,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_MONTH,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.MONTH_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.MonthCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupMonth,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_MONTH,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.MONTH_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.MonthNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupMonth,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_MONTH,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.MONTH_EXACT] = {
	caption: Terrasoft.Resources.FilterMacros.MonthExact,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupMonth,
	functionType: Terrasoft.FunctionType.DATE_PART,
	queryMacrosType: Terrasoft.QueryMacrosType.NONE,
	datePartType: Terrasoft.DatePartType.MONTH,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER,
		displayValueRange: Terrasoft.Resources.CultureSettings.monthNames
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.QUARTER_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.QuarterPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupQuarter,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_QUARTER,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.QUARTER_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.QuarterCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupQuarter,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_QUARTER,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.QUARTER_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.QuarterNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupQuarter,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_QUARTER,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HALF_YEAR_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.HalfYearPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHalfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_HALF_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HALF_YEAR_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.HalfYearCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHalfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_HALF_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.HALF_YEAR_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.HalfYearNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupHalfYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_HALF_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.YEAR_PREVIOUS] = {
	caption: Terrasoft.Resources.FilterMacros.YearPrevious,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.PREVIOUS_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.YEAR_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.YearCurrent,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.YEAR_NEXT] = {
	caption: Terrasoft.Resources.FilterMacros.YearNext,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupYear,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.NEXT_YEAR,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.YEAR_EXACT] = {
	caption: Terrasoft.Resources.FilterMacros.YearExact,
	groupCaption: Terrasoft.Resources.FilterMacros.MacrosTypeGroupYear,
	functionType: Terrasoft.FunctionType.DATE_PART,
	queryMacrosType: Terrasoft.QueryMacrosType.NONE,
	datePartType: Terrasoft.DatePartType.YEAR,
	value: {
		dataValueType: Terrasoft.DataValueType.INTEGER
	}
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.CONTACT_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.ContactCurrent,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_USER_CONTACT,
	datePartType: Terrasoft.DatePartType.NONE
};
Terrasoft.MacrosTypeConfig[Terrasoft.FilterMacrosType.USER_CURRENT] = {
	caption: Terrasoft.Resources.FilterMacros.UserCurrent,
	functionType: Terrasoft.FunctionType.MACROS,
	queryMacrosType: Terrasoft.QueryMacrosType.CURRENT_USER,
	datePartType: Terrasoft.DatePartType.NONE
};

/**
 * The object of mapping the filter macro types to the date part types
 * @type {Object}
 */
Terrasoft.filter.enums.DatePartTypeFilterMacrosType = {};

/**
 * Abbreviation for {@link Terrasoft.filter.enums.DatePartTypeFilterMacrosType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.filter.enums.DatePartTypeFilterMacrosType
 */
Terrasoft.DatePartTypeFilterMacrosType = Terrasoft.filter.enums.DatePartTypeFilterMacrosType;

Terrasoft.DatePartTypeFilterMacrosType[Terrasoft.DatePartType.DAY] = Terrasoft.FilterMacrosType.DAY_OF_MONTH;
Terrasoft.DatePartTypeFilterMacrosType[Terrasoft.DatePartType.MONTH] = Terrasoft.FilterMacrosType.MONTH_EXACT;
Terrasoft.DatePartTypeFilterMacrosType[Terrasoft.DatePartType.YEAR] = Terrasoft.FilterMacrosType.YEAR_EXACT;
Terrasoft.DatePartTypeFilterMacrosType[Terrasoft.DatePartType.WEEK_DAY] = Terrasoft.FilterMacrosType.DAY_OF_WEEK;
Terrasoft.DatePartTypeFilterMacrosType[Terrasoft.DatePartType.HOUR_MINUTE] = Terrasoft.FilterMacrosType.HOUR_EXACT;

/**
 * The object of mapping the filter macro types to the query macro types to the object schema
 * @type {Object}
 */
Terrasoft.filter.enums.QueryMacrosTypeFilterMacrosType = {};

/**
 * Abbreviation for {@link Terrasoft.filter.enums.QueryMacrosTypeFilterMacrosType}
 * @member Terrasoft
 * @inheritdoc Terrasoft.filter.enums.QueryMacrosTypeFilterMacrosType
 */
Terrasoft.QueryMacrosTypeFilterMacrosType = Terrasoft.filter.enums.QueryMacrosTypeFilterMacrosType;

Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.DAY_OF_YEAR_TODAY] =
		Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET] =
		Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_N_DAYS_OF_YEAR] =
		Terrasoft.FilterMacrosType.NEXT_N_DAYS_OF_YEAR;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_N_DAYS_OF_YEAR] =
		Terrasoft.FilterMacrosType.PREVIOUS_N_DAYS_OF_YEAR;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_HOUR] =
		Terrasoft.FilterMacrosType.HOUR_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_HOUR] =
		Terrasoft.FilterMacrosType.HOUR_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_HOUR] =
		Terrasoft.FilterMacrosType.HOUR_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_N_HOURS] =
		Terrasoft.FilterMacrosType.HOUR_PREVIOUS_N;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_N_HOURS] =
		Terrasoft.FilterMacrosType.HOUR_NEXT_N;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.YESTERDAY] =
		Terrasoft.FilterMacrosType.DAY_YESTERDAY;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.TODAY] =
		Terrasoft.FilterMacrosType.DAY_TODAY;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.TOMORROW] =
		Terrasoft.FilterMacrosType.DAY_TOMORROW;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_N_DAYS] =
		Terrasoft.FilterMacrosType.DAY_PREVIOUS_N;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_N_DAYS] =
		Terrasoft.FilterMacrosType.DAY_NEXT_N;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_WEEK] =
		Terrasoft.FilterMacrosType.WEEK_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_WEEK] =
		Terrasoft.FilterMacrosType.WEEK_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_WEEK] =
		Terrasoft.FilterMacrosType.WEEK_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_MONTH] =
		Terrasoft.FilterMacrosType.MONTH_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_MONTH] =
		Terrasoft.FilterMacrosType.MONTH_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_MONTH] =
		Terrasoft.FilterMacrosType.MONTH_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_QUARTER] =
		Terrasoft.FilterMacrosType.QUARTER_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_QUARTER] =
		Terrasoft.FilterMacrosType.QUARTER_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_QUARTER] =
		Terrasoft.FilterMacrosType.QUARTER_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_HALF_YEAR] =
		Terrasoft.FilterMacrosType.HALF_YEAR_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_HALF_YEAR] =
		Terrasoft.FilterMacrosType.HALF_YEAR_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_HALF_YEAR] =
		Terrasoft.FilterMacrosType.HALF_YEAR_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.PREVIOUS_YEAR] =
		Terrasoft.FilterMacrosType.YEAR_PREVIOUS;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_YEAR] =
		Terrasoft.FilterMacrosType.YEAR_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.NEXT_YEAR] =
		Terrasoft.FilterMacrosType.YEAR_NEXT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_USER] =
		Terrasoft.FilterMacrosType.USER_CURRENT;
Terrasoft.QueryMacrosTypeFilterMacrosType[Terrasoft.QueryMacrosType.CURRENT_USER_CONTACT] =
		Terrasoft.FilterMacrosType.CONTACT_CURRENT;