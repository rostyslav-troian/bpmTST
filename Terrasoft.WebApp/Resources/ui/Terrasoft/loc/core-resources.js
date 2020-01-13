Ext.ns("Terrasoft");

if (!Terrasoft.Resources) {
	Ext.ns("Terrasoft.Resources");

	Terrasoft.Resources.ExternalLibraries = {};

	Terrasoft.Resources.ExternalLibraries.CKEditor = {
		"BpmonlinesourceTitle": "Редактировать исходный HTML-код",
		"BpmonlineparameterTitle": "Вставить параметр процесса",
		"BpmonlinemacrosTitle": "Вставить макрос",
		"BpmonlineEmailTemplateLink": "Вставить ссылку",
		"BpmonlinemacrosSelectColumn": "Выбрать колонку",
		"BpmonlinemacrosSelectMacros": "Выбрать макрос",
		"BpmonlineemailtemplatelinkAddWebLink": "Вставить web ссылку",
		"BpmonlineEmailTemplateLinkAddObjectLink": "Выбрать ссылку на объект",
		"ColorButtonCaption": "Цвет ссылки",
		"CreateTable": "Вставить таблицу",
		"Insert": "Вставить",
		"Delete": "Удалить"
	};

	Terrasoft.Resources.Exception = {
		UnknownException: "UnknownException",
		NotImplementedException: "NotImplementedException",
		ItemNotFoundException: "ItemNotFoundException",
		NullOrEmptyException: "NullOrEmptyException",
		ArgumentNullOrEmptyException: "ArgumentNullOrEmptyException",
		ArgumentNullOrEmptyExceptionWithArgumentName: "ArgumentNullOrEmptyException; argumentName: {0}",
		UnsupportedTypeException: "UnsupportedTypeException",
		ItemAlreadyExistsException: "ItemAlreadyExistsException",
		InvalidOperationException: "InvalidOperationException",
		InvalidObjectState: "InvalidObjectState",
		InvalidFormatException: "InvalidFormatException",
		InvalidDateFormatException: "Не верный формат даты",
		UnauthorizedException: "Сервер не смог авторизовать запрос",
		QueryExecutionException: "QueryExecutionException",
		ModuleProcessingException: "ModuleProcessingException",
		UnknownExpression: "Нераспознанное выражение:",
		FileExceptionFormat: "Файл: {0}",
		DirectoryExceptionFormat: "Директория: {0}",
		FileSystemExceptionFormat: "Код: {0}",
		FileCreate: "В процессе создания файла произошла ошибка",
		FileOpen: "В процессе открытия файла произошла ошибка",
		FileRead: "В процессе чтения файла произошла ошибка",
		FileWrite: "В процессе записи в файл произошла ошибка",
		FileCopy: "В процессе копирования файла произошла ошибка",
		FileSystemAbort: "Операция была прервана",
		FileSystemNotFound: "Объект не найден",
		FileSystemSecurity: "Операция небезопасна",
		FileSystemNotReadable: "Объект невозможно прочитать",
		FileSystemEncoding: "URL к объекту некорректно сформирован",
		FileSystemNoModificationAllowed: "Изменение объекта запрещено",
		FileSystemInvalidState: "Операция невозможна, так как объект находится в некорректном состоянии",
		FileSystemSyntax: "Формат строки не соответствует ожидаемому",
		FileSystemInvalidModification: "Данная модификация невозможна",
		FileSystemQuotaExceeded: "Недостаточно свободного пространства",
		FileSystemTypeMismatch: "Тип объекта не соответствует запрашиваемому",
		FileSystemPathExists: "Объект по такому пути уже существует",
		DirectoryCreate: "В процессе создания директории произошла ошибка",
		DirectoryOpen: "В процессе открытия директории произошла ошибка",
		DirectoryRemove: "В процессе удаления директории произошла ошибка",
		DirectoryLookup: "При обращении к директории произошла ошибка",
		DirectoryRetrieve: "При получении списка директорий произошла ошибка",
		DirectoryCopy: "В процессе копирования директории произошла ошибка",
		FileSystemEntryNotImplementedExceptionFormat: "Метод не реализован: {0}",
		CronExpressionWrongNumberOfArguments: "Неправильное количество параметров в cron выражении"
	};

	Terrasoft.appTitle = "bpm'online CRM";

	Terrasoft.Resources.LessConstants = {
		"SectionPanelBackgroundColor": "#4d5a75",
		"SectionPanelFontColor": "#ffffff",
		"SectionPanelSelectedBackgroundColor": "#f49d57",
		"SectionPanelSelectedFontColor": "#ffffff"
	};

	Terrasoft.Resources.Exception.DataFieldIsRequiredException = {
		DataField: "DataField",
		IsRequired: "IsRequired"
	};

	Terrasoft.Resources.AjaxProvider = {
		ServerUnavailable: "Сервер приложений недоступен",
		RequestTimeout: "Превышен лимит времени выполнения запроса к серверу приложений",
		RequestErrorTemplate: "При выполнении запроса возникла ошибка {errorText}" +
		"\n\tстатус ответа: {errorStatus} ({errorStatusText})" +
		"\n\turl запроса: {requestUrl}" +
		"\n\tметод: {requestMethod}" +
		"\n\tданные запроса: {requestData}"
	};

	Terrasoft.Resources.LoginPage = {
		AuthFailed: "Ошибка авторизации",
		WrongLoginPassword: "Вы ввели неправильный логин или пароль, либо Ваша учетная запись неактивна",
		WrongNewPassword: "Текущий и новый пароль не должны совпадать",
		WrongConfirmPassword: "Новый пароль не совпадает с подтверждением",
		ChangePasswordAccessDenied: "Доступ запрещен. Обратитесь к системному администратору",
		LoginButtonCaption: "Войти",
		WorkspaceEditCaption: "Рабочее пространство",
		LoginEditCaption: "Логин",
		PasswordEditCaption: "Пароль",
		RememberMeCaption: "Запомнить меня",
		Version: "Версия ",
		Help: "Справка",
		ForgetPassword: "Забыли пароль?",
		Register: "Зарегистрироваться",
		ServerUrl: "Адрес сервера",
		ServerUrlIsEmpty: "Не указан адрес сервера",
		GetWorkspaceListError: "Не удалось получить список конфигураций",
		IsSecureConnectionCaption: "Безопасное соединение",
		NtlmLogin: "Войти под доменным пользователем",
		LoginButtonHint: "Войти (Ctrl+Enter)",
		NtlmLoginLabelHint: "Войти под доменным пользователем (Alt+Enter)"
	};

	Terrasoft.Resources.Core = {
		chainContainerError: "Невозможно создать цепочку для контейнера {0}, цепочка уже используется в " +
		"контейнере {1}",
		chainModuleRenderError: "Модуль {0} невозможно отрендерить в контейнер {1}, т.к. цепочка уже используется в " +
		"контейнере {2}, модуль {0} будет отрендерен в контейнер {2}",
		unsupportedTagsTypeError: "Неподдерживаемый тип! Для указания тегов нужно использовать массив.",
		userCultureIsUndefined: "Культура пользователя не определена.",
		InvalidObjectClass: "Объект должен быть экземпляром класса '{0}'.",
		RenderToElementNotFound: "Элемент {0} не найден",
		ModuleDescriptorNotFound: "Descriptor for module {0} is not found.",
		InstanceCreateErrorModuleContextNotFound: "Context for module {0} is not found, component will not be created."
	};

	Terrasoft.Resources.Json = {
		EncodeExceptionMessage: "Ошибка кодирования значения в JSON-строку",
		DecodeExceptionMessage: "Ошибка декодирования значения из JSON-строки"
	};

	Terrasoft.Resources.JsonApplier = {};

	Terrasoft.Resources.JsonApplier.Exception = {
		RequiredParameterNotFound: "Необходимый параметр '{0}' не найден в объекте",
		NotContainerItemInsertException: "Элемент '{0}' не является контейнером для других элементов",
		ItemWithItemsPropertyMergeException: "Элемент '{0}' не должен содержать параментра '{1}'",
		LoopDependency: "Для операции объекта с именем '{0}' существует циклическая зависимость." +
		" Параметр parentName не должен быть равным name"
	};

	Terrasoft.Resources.JsonApplier.ObsoleteMessages = {
		PropertyInParameterObsolete: "Параметр '{0}' больше не должен содержать '{1}'",
		ParameterNameObsolete: "Вместо параметра '{0}' следует использовать '{1}'"
	};

	Terrasoft.Resources.JsonDiffer = {};

	Terrasoft.Resources.JsonDiffer.Exception = {
		RequiredParameterNotFound: "Необходимый параметр '{0}' не найден в объекте",
		ItemNameAlreadyExists: "Элемент со значением '{0}' параметра 'name' уже существует",
		JsonDiffPatchIsNotDefined: "Модуль jsondiffpatch не найден"
	};

	Terrasoft.Resources.Router = {
		PageTitleNotImplementedMessage: "Параметр pageTitle не поддерживается"
	};

	Terrasoft.Resources.ImageApi = {
		ImageFileNullOrEmptyMessage: "Файл изображения не определен"
	};

	Terrasoft.Resources.chain = {
		StepsArgumentUnsupportedTypeMessage: "Шаги цепочки должны быть массивом функций"
	};

	Terrasoft.Resources.FilterManager = {
		FilterTypeIsNotAllowedException: "Тип фильтра не поддерживается",
		FilterGroupIsNotDefined: "Группа фильтров не определена"
	};

	Terrasoft.Resources.Controls = {
		Yesterday: "Вчера",
		Today: "Сегодня",
		Tommorow: "Завтра",
		InvalidValue: "Недопустимое значение",
		RadioControlShouldHaveGroupName: "Для радио-контрола необходимо указать свойство groupName"
	};

	Terrasoft.Resources.Controls.Button = {
		ButtonHasNoTemplateFor: "Кнопка не имеет шаблона для",
		ButtonCaptionApply: "Применить",
		ButtonCaptionCancel: "Отмена",
		ButtonStyleBlue: "Синий",
		ButtonStyleDefault: "По умолчанию",
		ButtonStyleGray: "Серый",
		ButtonStyleGreen: "Зеленый",
		ButtonStyleRed: "Красный",
		ButtonStyleTransparent: "Прозрачный"
	};

	Terrasoft.Resources.Controls.BaseObject = {
		ClassInstanceAlreadyDestroyed: "Экземпляр класса {0} уже уничтожен."
	};

	Terrasoft.Resources.Controls.Component = {
		ComponentIsNotRendered: "Компонент не отрисован",
		RequiredSelectorsAreNotDefined: "Необходимые селекторы не определены",
		ComponentIsAlreadyRendered: "Компонент {0} уже отрендерен",
		BindingContextWarningMessage: "Для корректной работы bindingContext используйте this.model " +
		"вместо аргумента model для привязок элементов"
	};

	Terrasoft.Resources.Controls.Menu = {
		MenuItemsPropertyShouldBeAnArray: "Свойства элемента меню должны быть массивом",
		IndexOutOfRange: "Индекс вне диапазона",
		MenuHasNoItems: "Элементы меню отсутствуют",
		Loading: "Загрузка",
		MenuPrimaryColumnIsEmpty: "Колонка Id не объявлена в ViewModel элемента меню"
	};

	Terrasoft.Resources.Controls.MessageBox = {
		ButtonCaptionYes: "Да",
		ButtonCaptionNo: "Нет",
		ButtonCaptionCancel: "Отмена",
		ButtonCaptionClose: "Закрыть",
		ButtonCaptionOk: "ОК"
	};

	Terrasoft.Resources.Controls.BaseSpinner = {
		SpinnersWidthPropertyShouldBeAString: "Свойство ширины элемента прогресса должно быть строковым"
	};

	Terrasoft.Resources.Controls.ProgressSpinner = {
		ProgressSpinnersWidthPropertyShouldBeAString: Terrasoft.Resources.Controls.BaseSpinner
				.SpinnersWidthPropertyShouldBeAString
	};

	Terrasoft.Resources.Controls.ScheduleEdit = {
		IsNullTimeScaleParameter: "Свойство временного масштаба не определено",
		IsNullStartDateParameter: "Свойство начала временного интервала не определено",
		IsNullEndDateParameter: "Свойство конца временного интервала не определено",
		IsNullTimeZoneParameter: "Свойство временного пояса не определено",
		DaysCountShouldBeGreaterThenZero: "Дата начала должна быть меньше даты окончания",
		SchedulerItemStatusIsNotValid: "Статус элемента расписания задан не корректно"
	};

	Terrasoft.Resources.Controls.GridLayoutEdit = {
		PropertyIsNotANumber: "Свойство {0} должно быть числом.",
		PropertyIsLessThan: "Свойство {0} должно быть больше {1}."
	};

	Terrasoft.Resources.Controls.HtmlEdit = {
		HyperlinkDialogCaption: "Ссылка",
		HyperlinkAddress: "Адресс ссылки",
		HyperlinkText: "Текст ссылки",
		InvalidFileTypeMessage: "Недопустимый тип файла"
	};

	Terrasoft.Resources.Controls.Bindable = {
		DeprecatedEventMessage: "Deprecated event: \"{0}\""
	};

	Terrasoft.Resources.Controls.Mask = {
		Caption: "Загрузка",
		DuplicateContainerException: "По селектору найдено более одного контейнера"
	};

	Terrasoft.Resources.ContentBlock = {
		ColumnsWidthIntersected: "В разметке {0} между его элементами {1} и {2} есть пересечения размеров",
		PrimaryColumnIsEmpty: "Колонка Id не объявлена в ViewModel элемента",
		SelectBlockButtonTitle: "Select block"
	};

	Terrasoft.Resources.EmailContentValidator = {
		DeprecatedHtmlTags: "В коде шаблона содержатся теги \"{0}\" которые не поддерживаются в HTML5, что может" +
		" привести к некорректному отображению шаблона в некоторых почтовых клиентах." +
		" Пожалуйста, измените шаблон используя стили css"
	};

	Terrasoft.Resources.CommonUtils = {
		TrueStringValue: "Да",
		FalseStringValue: "Нет",
		InterfaceMemberNotImplementedInClass: "Interface member {0}.{1} not implemented in class {2}"
	};

	Terrasoft.Resources.DataProvider = {
		emptyResponseExceptionMessage: "Empty response",
		timeoutResponseExceptionMessage: "Timed out"
	};

	Terrasoft.Resources.BaseEntitySchema = {
		ColumnNotFondException: "Колонка с идентификатором '{0}' не найдена в объекте '{1}'."
	};

	Terrasoft.Resources.BaseViewModel = {
		columnUnsupportedTypeException: "Column parameter should have LOOKUP data type",
		columnIncorrectTypeValidationMessage: "Значение не соответствует типу колонки",
		columnRequiredValidationMessage: "Необходимо указать значение",
		columnIncorrectMaxNumberValidationMessage: "Введенное число превышает максимально допустимое значение",
		columnIncorrectMinNumberValidationMessage: "Введенное число превышает минимально допустимое значение",
		columnIncorrectTextRangeValidationMessage: "Превышена допустимая длина текста",
		fieldValidationError: "Поле \"{0}\": {1}"
	};

	Terrasoft.Resources.BaseViewModelCollection = {
		PrimaryColumnValueNotFound: "Primary column value not found"
	};

	Terrasoft.Resources.BusinessRules = {
		EnabledBusinessRuleActionCaption: "Разблокировать поле для редактирования",
		VisibilityBusinessRuleActionCaption: "Показать поле на странице",
		FiltrationBusinessRuleActionCaption: "Добавить фильтр значений в поле",
		RequiredBusinessRuleActionCaption: "Сделать поле обязательным"
	};

	Terrasoft.Resources.BusinessRules.Expression = {
		Constant: "Константа",
		SysValue: "Системная переменная",
		Attribute: "Атрибут",
		Column: "Колонка",
		Parameter: "Параметр",
		SysSetting: "Системная настройка"
	};

	Terrasoft.Resources.BusinessRules.ExpressionPlaceholder = {
		Parameter: "Введите Код",
		Column: "Введите Код",
		SysValue: "Введите Код",
		SysSetting: "Введите Код",
		Attribute: "Введите Код"
	};

	Terrasoft.Resources.Collection = {
		ItemWithKey: "Item with key",
		ItemWithIndex: "Item with index",
		DoesNotExists: "doesn\"t exist",
		AlreadyExists: "already exists",
		ArrayUnsupportedInputType: "Array unsupported input type"
	};

	Terrasoft.Resources.BaseObject = {
		Property: "Property",
		IsNotDefinedInClass: "isn\"t defined in class"
	};

	Terrasoft.Resources.GroupManager = {
		EmptyGroupName: "Creating group you have to supply group name",
		GroupWithNameNotFound: "Has no group for groupName"
	};

	Terrasoft.Resources.ComparisonType = {
		BETWEEN: "входит в диапазон",
		IS_NULL: "не заполнено",
		IS_NOT_NULL: "заполнено",
		EQUAL: "равно",
		NOT_EQUAL: "не равно",
		LESS: "меньше",
		LESS_OR_EQUAL: "меньше или равно",
		GREATER: "больше",
		GREATER_OR_EQUAL: "больше или равно",
		START_WITH: "начинается на",
		NOT_START_WITH: "не начинается на",
		CONTAIN: "содержит",
		NOT_CONTAIN: "не содержит",
		END_WITH: "заканчивается на",
		NOT_END_WITH: "не заканчивается на",
		EXISTS: "существует",
		NOT_EXISTS: "не существует"
	};

	Terrasoft.Resources.AggregationType = {
		NONE: "операция не выбрана",
		COUNT: "количество",
		SUM: "сумма",
		MIN: "минимум",
		MAX: "максимум",
		AVG: "среднее"
	};

	Terrasoft.Resources.LogicalOperatorType = {
		AND: "И",
		OR: "ИЛИ"
	};

	Terrasoft.Resources.FilterEdit = {
		DataValueTypeException: "Указан неизвестный тип данных для значения правой части фильтра",
		WELCOME_INPUT: "&#60;Введите значение&#62;",
		ADD_FILTER: "Добавить условие",
		CANCEL_MACROS_DEFAULT: "Сравнить со значением",
		CANCEL_MACROS_DATE: "Указать точную дату",
		CANCEL_MACROS_CONTACT: "Выбрать контакт",
		SELECT_PARAMETER: "Сравнить с Параметром",
		SELECT_MAIN_RECORD: "Сравнить с основной записью"
	};

	Terrasoft.Resources.FilterUtils = {
		FilterTypeShouldBeCompare: "Тип фильтра должен быть Фильтр сравнения"
	};

	Terrasoft.Resources.Grid = {
		isEmptyCaption: "Нет данных"
	};

	Terrasoft.Resources.GridLayout = {
		ColumnsWidthIntersected: "В разметке {0} между его элементами {1} и {2} есть пересечения размеров",
		ItemConfigIsEmpty: "У элемента разметки {0} в рядке {1} столбце {2} отсутствует конфигурация элемента управления"
	};

	Terrasoft.Resources.FileUpload = {
		caption: "Загрузить"
	};

	Terrasoft.Resources.CultureSettings = {
		dateFormat: "d.m.Y",
		timeFormat: "G:i",
		thousandSeparator: " ",
		decimalSeparator: ",",
		todayMessage: "Сегодня",
		shortDayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май",
			"Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		startDay: 1,
		numberGroupSizes: 3,
		isRightToLeft: false
	};

	Terrasoft.Resources.DayNames = {
		Sunday: "Sunday",
		Monday: "Monday",
		Tuesday: "Tuesday",
		Wednesday: "Wednesday",
		Thursday: "Thursday",
		Friday: "Friday",
		Saturday: "Saturday"
	};

	Terrasoft.Resources.Telephony = {};

	Terrasoft.Resources.Telephony.Exception = {
		CurrentCallNotExistsException: "Отсутствует текущий звонок. Операция запрещена",
		ConsultCallNotExistsException: "Отсутствует консультационный звонок. Операция запрещена",
		CurrentCallNotExistsOrInWrongStateException: "Текущий звонок отсутствует или находится в неверном состоянии. " +
		"Операция запрещена",
		SocketConnectionChannelIsNotOpened: "Web-socket канал не открыт"
	};

	Terrasoft.Resources.ObsoleteMessages = {
		ArgumentTypeObsoleteMessage: "Тип {0} аргумента {1} устарел. Вместо него используйте {2}",
		ObsoleteMethodMessage: "Метод {0} устарел. Вместо него используйте {1}",
		ObsoletePropertyMessage: "Свойство {0} устарело. Вместо него используйте {1}",
		MethodFormatObsolete: "Формат метода function {0}({1}) устарел. Новый формат function {0}({2})",
		ObsoleteModule: "Модуль {0} устарел. Вместо него используйте {1}"
	};

	Terrasoft.Resources.FilterMacros = {
		HourPrevious: "Предыдущий час",
		HourCurrent: "Текущий час",
		HourNext: "Следующий час",
		HourExact: "Точное время",
		HourPreviousN: "Предыдущих часов",
		HourNextN: "Следующих часов",
		DayYesterday: "Вчера",
		DayToday: "Сегодня",
		DayTomorrow: "Завтра",
		DayOfMonth: "День месяца",
		DayOfWeek: "День недели",
		DayPreviousN: "Предыдущих дней",
		DayNextN: "Следующих дней",
		WeekPrevious: "Предыдущая неделя",
		WeekCurrent: "Текущая неделя",
		WeekNext: "Следущая неделя",
		MonthPrevious: "Предыдущий месяц",
		MonthCurrent: "Текущий месяц",
		MonthNext: "Следующий месяц",
		MonthExact: "Месяц года",
		QuarterPrevious: "Предыдущий квартал",
		QuarterCurrent: "Текущий квартал",
		QuarterNext: "Следующий квартал",
		HalfYearPrevious: "Предыдущее полугодие",
		HalfYearCurrent: "Текущее полугодие",
		HalfYearNext: "Следующее полугодие",
		YearPrevious: "Предыдущий год",
		YearCurrent: "Текущий год",
		YearNext: "Следующий год",
		YearExact: "Год",
		ContactCurrent: "Текущий контакт",
		UserCurrent: "Текущий пользователь",
		MacrosTypeGroupHour: "Час",
		MacrosTypeGroupDay: "День",
		MacrosTypeGroupDayOfYear: "Ежегодно",
		MacrosTypeGroupWeek: "Неделя",
		MacrosTypeGroupMonth: "Месяц",
		MacrosTypeGroupQuarter: "Квартал",
		MacrosTypeGroupHalfYear: "Полугодие",
		MacrosTypeGroupYear: "Год",
		GetQueryMacrosTypeFilterMacrosTypeException: "Для указанного типа макроса запроса к схеме объекта не найден " +
		"тип макроса фильтра",
		GetDatePartTypeFilterMacrosTypeException: "Для указанного типа части даты не найден тип макроса фильтра",
		DayOfYearToday: "Ежегодно, сегодня",
		DayOfYearTodayPlusDaysOffset: "Ежегодно, через дней",
		NextNDaysOfYear: "Ежегодно, следующих дней",
		PreviousNDaysOfYear: "Ежегодно, предыдущих дней"
	};

	Terrasoft.Resources.Managers = {};

	Terrasoft.Resources.Managers.Exceptions = {
		ManagerIsNotInitialized: "Менеджер не инициализирован",
		FilterFunctionIsNotInitialized: "Функция фильтрации не задана",
		UsingInvalidSetMethod: "Свойство типа 'Terrasoft.LocalizableString' должно устанавливатся через" +
		" метод 'setLocalizableStringPropertyValue'",
		SchemaNamePrefixException: "Название элемента должно содержать префикс '{0}'",
		SaveSchemaErrorTemplate: "Не удалось сохранить схему. Название: {0}. Заголовок: {1}. " +
		"Ошибка: {2}. Обратитесь к администратору системы."
	};

	Terrasoft.Resources.Managers.Messages = {
		MarkerCommentsValidationMessage: "Схема не содержит маркерных коментариев: '{0}'"
	};

	Terrasoft.Resources.SchemaDesigner = {
		SaveButtonCaption: "Сохранить",
		CloseButtonCaption: "Отмена",
		SaveButtonHint: "Сохранить процесс (Ctrl+S)",
		AlreadySavedButtonHint: "Все изменения сохранены",
		RunButtonCaption: "Запустить",
		RunButtonHint: "Запустить процесс (Ctrl+Enter)",
		SavingMaskCaption: "Сохранение...",
		ActionsButtonCaption: "Действия",
		ProcessPropertiesButtonHint: "Параметры процесса",
		SchemaSavedMessage: "Процесс успешно сохранен",
		FieldValidationError: "Поле \"{0}\": {1}",
		ProcessCaptionColumnCaption: "Заголовок процесса",
		MustBePublishedMessage: "Перед запуском процесс необходимо опубликовать.",
		RequireCompilationMessage: "Элементы или условия, требующие компиляции: {0}.",
		SchemaSavedErrorsMessage: "При сохранении процесса обнаружены ошибки. " +
			"Процесс не может работать с текущими настройками.",
		ErrorMessages: "Схема содержит ошибки: {0}.",
		PublishButtonCaption: "Опубликовать",
		PublishingMaskCaption: "Публикация...",
		SourceCodeMenuItemCaption: "Исходный код (Ctrl+K)",
		MetaDataMenuItemCaption: "Метаданные (Ctrl+M)",
		LeftPanelHeaderButtonCaption: "Элементы процесса",
		CopyMenuItemCaption: "Копировать диаграмму",
		SchemaCopiedMessage: "Процесс успешно скопирован",
		CopySuffixCaption: " - Копия",
		CopyElementMenuItemCaption: "Копировать элемент (Ctrl+C)",
		PasteElementMenuItemCaption: "Вставить элемент (Ctrl+V)",
		HelpButtonHint: "Перейти к справке (F1)",
		FeedButtonHint: "Лента",
		ProcessLogMenuItemCaption: "Process Log (Ctrl+L)",
		ExportMetaDataItemCaption: "Экспорт метаданных",
		LoadStorageLabel: "У Вас есть несохраненные данные. Загрузить их?",
		LoadStorageButtonCaption: "Загрузить",
		DiscardStorageButtonCaption: "Отменить",
		AllChangesSaved: "Все изменения сохранены",
		SearchShowButtonHint: "Поиск элементов (Ctrl+F)",
		SearchTextEditPlaceholder: "Введите название или код элемента",
		SearchInfoTemplate: "{0} из {1}",
		SearchPreviousButtonHint: "Перейти к предыдущему (Shift+F3)",
		SearchNextButtonHint: "Перейти к следующему (F3)",
		SearchButtonHint: "Поиск элементов (Enter)",
		SearchHideButtonHint: "Спрятать поиск (Esc)",
		EditItemFromForeignPackageMessage: "Элемент \"{0}\" создан сторонним издателем или установлен из файлового " +
		"архива. Сохранение изменений для данного элемента будет невозможно.",
		PackageElementEditWithoutLockMessage: "Вы не сможете зафиксировать изменения этого элемента в хранилище, " +
		"а при следующем обновлении из хранилища можете потерять изменения.",
		ActualizeSchemaMessage: "Установить актуальной",
		ActualizeSchemaResultMessage: "Текущая версия процесса установлена актуальной",
		ActualSchemaSetErrorMessage: "Ошибка при установке текущей версии схемы как активной",
		ExistsRunningProcessQuestion: "По процессу есть запущенные экземпляры. Сохранение изменений в текущем " +
		"процессе может привести к неработоспособности запущенных экземпляров процесса",
		SchemaWasExported: "Процесс был экспортирован. Сохранение изменений в текущем процессе может привети к " +
		"неработоспособности запущенных экземпляров процесса",
		SchemaCreatesInForeighnMaintainerQuestion: "Процесс создан сторонним издателем или установлен из файлового " +
		"архива. Сохранение изменений в текущем процессе невозможно",
		NeedSetActualSchemaVersionConfirmationMessage: "Установить текущую версию процесса \"{0}\" актуальной?",
		CloseUnsavedSchemaConfirmation: "Все изменения будут потеряны. Выйти из дизайнера?",
		SavingProcess: "Сохранение процесса",
		SaveCurrentVersion: "Сохранить текущую версию (Ctrl+Alt+S)",
		OpenParentProcessMenuItemCaption: "Открыть родительский процесс"
	};

	Terrasoft.Resources.DataValueType = {
		GUID: "Уникальный идентификатор",
		TEXT: "Строка",
		SHORT_TEXT: "Строка (50 символов)",
		MEDIUM_TEXT: "Строка (250 символов)",
		LONG_TEXT: "Строка (500 символов)",
		MAXSIZE_TEXT: "Строка неограниченной длины",
		SECURE_TEXT: "Зашифрованная строка",
		INTEGER: "Целое число",
		FLOAT: "Дробное число",
		FLOAT1: "Дробное число (0,1)",
		FLOAT2: "Дробное число (0,01)",
		FLOAT3: "Дробное число (0,001)",
		FLOAT4: "Дробное число (0,0001)",
		FLOAT8: "Дробное число (0,00000001)",
		MONEY: "Деньги",
		DATE_TIME: "Дата/Время",
		DATE: "Дата",
		TIME: "Время",
		LOOKUP: "Справочник",
		BOOLEAN: "Логическое",
		BLOB: "Двоичные данные",
		LOCALIZABLE_STRING: "Локализируемая строка",
		ENTITY: "Объект (Entity)",
		ENTITY_COLLECTION: "Коллекция объектов (EntityCollection)"
	};

	Terrasoft.Resources.SystemValueCaptions = {
		AutoGuid: "New Id",
		SequentialGuid: "New Sequential Id",
		CurrentDateTime: "Current Time and Date",
		CurrentDate: "Current Date",
		CurrentTime: "Current Time",
		CurrentUser: "Current user",
		CurrentUserContact: "Current user contact",
		CurrentUserAccount: "Account of Current User"
	};

	Terrasoft.Resources.ProcessSchemaDesigner = {
		Caption: "Бизнес-процесс",
		TypeCaption: "Процесс"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.ElementsToolbarGroup = {
		UserTask: "Действия пользователя",
		ServiceTask: "Действия системы",
		Gateway: "Логические операторы",
		Subprocess: "Подпроцессы",
		StartEvent: "Начальные события",
		IntermediateEvent: "Промежуточные события",
		EndEvent: "Завершающие события"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.Elements = {
		ProcessTypeCaption: "Процесс",
		StartEventCaption: "Простое",
		StartTimerEventCaption: "Стартовый таймер",
		StartMessageCaption: "Сообщение",
		StartSignalCaption: "Сигнал",
		TerminateEventCaption: "Останов",
		IntermediateCatchMessageCaption: "Обработка сообщения",
		IntermediateCatchSignalCaption: "Обработка сигнала",
		IntermediateCatchTimerCaption: "Обработка таймера",
		IntermediateThrowMessageCaption: "Генерация сообщения",
		IntermediateThrowSignalCaption: "Генерация сигнала",
		ExclusiveGatewayCaption: "Исключающее \"ИЛИ\"",
		ExclusiveEventBasedGatewayCaption: "Исключающее \"ИЛИ\" по событиям",
		InclusiveGatewayCaption: "Включающее \"ИЛИ\"",
		ParallelGatewayCaption: "Логическое \"И\"",
		SubprocessCaption: "Подпроцесс",
		EventSubprocessCaption: "Событийный подпроцесс",
		ScriptTaskCaption: "Задание-сценарий",
		FormulaTaskCaption: "Формула",
		UserTaskCaption: "Действие процесса",
		ConditionalFlowCaption: "Условный поток",
		ParameterCaption: "Параметр",
		DefaultFlowCaption: "Поток по умолчанию",
		FlowCaption: "Поток управления",
		WebServiceCaption: "Вызвать веб-сервис"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.Functions = {
		FunctionRoundUp: "RoundUp({0})",
		FunctionRound: "RoundOff({0})",
		FunctionRoundDown: "RoundDown({0})",
		FunctionMod: "RemainderAfterDivision({0}, )",
		FunctionMin: "Minimum({0})",
		FunctionMax: "Maximum({0})",
		FunctionAbs: "Module({0})",
		FunctionAvg: "Average({0})",
		FunctionDay: "Day({0})",
		FunctionMonth: "Month({0})",
		FunctionTime: "Time({0})",
		FunctionDayOfWeek: "DayOfWeek({0})",
		FunctionDayInRange: "DayIsInRangeOfDate({0}, , , )",
		SysSettingsDisplayPrefix: "System setting",
		SysVariableDisplayPrefix: "System variable",
		LookupValueDisplayPrefix: "Lookup",
		SamplingColumnValueDisplayPrefix: "Column value from selection",
		TimeValueDisplayPrefix: "Time value",
		DateValueDisplayPrefix: "Date value",
		DateTimeValueDisplayPrefix: "Date and time value",
		BooleanDisplayPrefix: "Boolean value",
		BooleanDisplayTrueValue: "True",
		BooleanDisplayFalseValue: "False",
		CaptionPropertyValueDisplayPrefix: "Process name",
		FunctionResultCaption: "Function result",
		MainRecordDisplayPrefix: "Main record"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.PropertyNames = {
		Caption: "Process name"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.Messages = {
		EntityNotFoundMessage: "<entity not found>",
		RecordNotFoundMessage: "<record not found>",
		InvalidFormulaMessage: "Invalid expression: {0}. Error: {1}.",
		SaveConfirmationMessage: "The process was modified. Save now and open up-to-date metadata?",
		SaveSourceCodeConfirmationMessage: "The process was modified. " +
		"You must save the process to view up-to-date source code. Save now?",
		ElementNotFoundMessage: "Element {0} not found",
		ParameterNotFoundMessage: "Parameter {0} not found",
		RunProcessConfirmationMessage: "The process was modified. " +
		"You must save the process to run it up-to-date. Save now?",
		RunProcessInformationMessage: "Click OK to continue the process \"{0}\".",
		SuccessfullyRunProcessInformationMessage: "Successfully started",
		ErrorStartBusinessProcessMessage: "Error starting business process ({0})",
		FormulaParseMacrosErrorMessage: "<ERROR>",
		ProcessSchemaMethodsBodyCaption: "Methods",
		CompiledProcessSchemaMethodsBodyCaption: "Compiled process methods",
		ProcessSchemaElementRequirePropertyValidation: "Open property page for validation.",
		InvalidProcessSchemaMessage: "Process schema is not valid.",
		SaveInvalidProcessButtonCaption: "Save {0}",
		SchemaValidationMessageCaption: "Required fields of some elements are not filled in. " +
		"The {0} cannot start with the current settings",
		SchemaInvalidElementsMessageTemplate: "Please fill out all required fields for the following elements:\n{0}",
		SysSettingValueNotFoundMessage: "Value not found for system setting \"{0}\"",
		SaveMetaDataConfirmationMessage: "The {0} has been modified. You must save the {0} " +
		"to view up-to-date metadata. Save now?",
		LazyLoadMessage: "To delete an element  is necessary to ensure that it is not linked with other elements. " +
		"Not all of the process element properties loaded. Load now?",
		InavalidMappingColumn: "Invalid formula"
	};

	Terrasoft.Resources.ProcessSchemaDesigner.Exceptions = {
		LocalizableCollectionPropertyNotFoundMessage: "Localizable value not found for item {0}.",
		InvalidDateMessage: "Can not parse date value \"{0}\"",
		InvalidTimeMessage: "Can not parse time value \"{0}\"",
		InvalidDateTimeMessage: "Can not parse datetime value \"{0}\"",
		InvalidParameterMessage: "Parameter \"{0}\" not found",
		InvalidSysVariableMessage: "System variable with name {0} not found",
		InvalidParameterOfFlowElementMessage: "Parameter \"{0}\" of process element \"{1}\" not found",
		InvalidFlowElementMessage: "Process element \"{0}\" not found",
		InvalidSchemaUIdMessage: "Parameter schemaUId not set",
		InvalidColumnMessage: "Column \"{0}\" not found",
		InvalidSchemaCollectionMessage: "Schema collection is empty",
		InvalidLookupValueMessage: "Lookup value \"{0}\" not found",
		InvalidEntitySchemaMessage: "Entity schema \"{0}\" not found",
		InvalidSysSettingMessage: "System setting with name \"{0}\" not found",
		InvalidLookupEmptyValueMessage: "Lookup value can not be empty",
		InvalidBooleanValueMessage: "Can not parse boolean value \"{0}\"",
		InvalidMainRecordUsageMessage: "Main record macros is not allowed in Process Designer",
		InvalidMainRecordPathMessage: "Formula value error: Selected column not found",
		InvalidCronSecondsException: "Cron выражение не должно содержать секунды",
		InvalidMainRecordDataType: "Column type \"{0}\" is not valid. Allowed types: \"{1}\""
	};

	Terrasoft.Resources.ProcessSchemaDesigner.Parameters = {
		StartOffSetCaption: "Start in (sec.)",
		RecordIdCaption: "Unique identifier of record",
		NotificationCaption: "Process instance caption",
		Success: "Success",
		StatusCode: "Http status code",
		Response: "Response body",
		Input: "Input",
		Output: "Output",
		DefaultNestedParameterCaption: "Item value"
	};

	Terrasoft.Resources.BaseSchemaManager = {};
	Terrasoft.Resources.BaseSchemaManager.Exceptions = {
		SchemaNotFoundMessage: "Schema by UId='{0}' from PackageUId='{1}' not found."
	};

	Terrasoft.Resources.ProcessDiagram = {};
	Terrasoft.Resources.ProcessDiagram.Messages = {
		ProcessSchemaNotFound: "The process schema for process log with id = '{0}' not found."
	};

	Terrasoft.Resources.ApplicationInstallationPage = {};
	Terrasoft.Resources.ApplicationInstallationPage.Messages = {
		InstallingApplication: "Installing application",
		FileDownloadingFailed: "Downloading file to server finished with errors",
		ContinueWork: "You can close this page and continue with the bpm'online",
		WaitUntilComplete: "Please wait until the operation is complete",
		CreatingBackup: "Creating backup",
		BackupFailed: "Creating backup failed",
		ValidationFailed: "Packages validation failed. Configuration has not changed.",
		ApplicationInstallationFailed: "Application installation failed",
		RestoringFromBackup: "Restoring from backup",
		RestorationFromBackupFailed: "Restoration from backup failed",
		RestoredFromBackupSuccessful: "Backup restored successfully"
	};

	Terrasoft.Resources.Cron = {
		ShortCronException: "Expression only has \"{0}\" parts.  At least 5 part are required.",
		LongCronException: "Expression has too many parts \"{0}\".  Expression must not have more than 7 parts.",
		ValueOutOfRangeException: "Cron parameter {0} \"{1}\" is out of range. Valid diapason from {2} to {3}.",
		InvalidSymbolsException: "Cron parameter {0} \"{1}\" contains invalid symbols.",
		DayOfNotImplementedException: "One of day of week \"{0}\" or day of month \"{1}\" parameter must be \"?\" symbol."
	};
	Terrasoft.Resources.Cron.Parameters = {
		Seconds: "seconds",
		Minutes: "minutes",
		Hours: "hours",
		DaysOfMonth: "days of month",
		Months: "months",
		DaysOfWeek: "days of week",
		Years: "years"
	};
	Terrasoft.Resources.Cron.Descriptor = {
		At: "At",
		AtSpace: "At ",
		AtX0: "at {0}",
		AtX0MinutesPastTheHour: "at {0} minutes past the hour",
		AtX0SecondsPastTheMinute: "at {0} seconds past the minute",
		BetweenX0AndX1: "between {0} and {1}",
		ComaBetweenDayX0AndX1OfTheMonth: ", between day {0} and {1} of the month",
		ComaEveryDay: ", every day",
		ComaEveryHour: ", every hour",
		ComaEveryMinute: ", every minute",
		ComaEveryX0Days: ", every {0} days",
		ComaEveryX0DaysOfTheWeek: ", every {0} days of the week",
		ComaEveryX0Months: ", every {0} months",
		ComaEveryX0Years: ", every {0} years",
		ComaOnDayX0OfTheMonth: ", on day {0} of the month",
		ComaOnlyInX0: ", only in {0}",
		ComaOnlyOnX0: ", only on {0}",
		ComaOnThe: ", on the ",
		ComaOnTheLastDayOfTheMonth: ", on the last day of the month",
		ComaOnTheLastWeekdayOfTheMonth: ", on the last weekday of the month",
		ComaOnTheLastX0OfTheMonth: ", on the last {0} of the month",
		ComaOnTheX0OfTheMonth: ", on the {0} of the month",
		ComaX0ThroughX1: ", {0} through {1}",
		CommaStartingX0: ", starting {0}",
		EveryHour: "every hour",
		EveryMinute: "every minute",
		EveryMinuteBetweenX0AndX1: "Every minute between {0} and {1}",
		EverySecond: "every second",
		EveryX0Hours: "every {0} hours",
		EveryX0Minutes: "every {0} minutes",
		EveryX0Seconds: "every {0} seconds",
		Fifth: "fifth",
		First: "first",
		FirstWeekday: "first weekday",
		Forth: "forth",
		MinutesX0ThroughX1PastTheHour: "minutes {0} through {1} past the hour",
		Second: "second",
		SecondsX0ThroughX1PastTheMinute: "seconds {0} through {1} past the minute",
		SpaceAnd: " and",
		SpaceAndSpace: " and ",
		SpaceX0OfTheMonth: " {0} of the month",
		Third: "third",
		WeekdayNearestDayX0: "weekday nearest day {0}"
	};

	Terrasoft.Resources.EmailContentExporter = {
		ButtonLinkExampleUrl: "http://example.com"
	};

	Terrasoft.Resources.MetaItem = {
		WrongNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. &lt;/br&gt; Symbol: 0-9 cannot be first."
	};
	Terrasoft.Resources.ColorPicker = {
		RecentColorLabel: "Recent"
	}
}
