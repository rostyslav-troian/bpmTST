Terrasoft.configuration.Structures["MonthlyCronExpressionPage"] = {innerHierarchyStack: ["MonthlyCronExpressionPage"], structureParent: "CompositeCronExpressionPage"};
define('MonthlyCronExpressionPageStructure', ['MonthlyCronExpressionPageResources'], function(resources) {return {schemaUId:'720e4f30-51c2-439e-a91e-c75af04289fd',schemaCaption: "MonthlyCronExpressionPage", parentSchemaName: "CompositeCronExpressionPage", schemaName:'MonthlyCronExpressionPage',parentSchemaUId:'f4535032-6a8c-422d-be8c-e3b37d542195',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MonthlyCronExpressionPage", ["MonthlyCronExpressionPageResources",
	"css!ProcessTimerStartEventPropertiesPageCSS"], function(resources) {
	return {
		attributes: {

			/**
			 * Month group selected type attribute.
			 * @private
			 * @type {Terrasoft.CronDayPeriodTypes}
			 */
			"MonthSectionSelectType": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.ENUM,
				"value": Terrasoft.CronDayPeriodTypes.Day,
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Day position lookup attribute in week day controls.
			 * @private
			 * @type {Object}
			 */
			"MonthSectionWeekDayPositionList": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"value": {
					"value": 1,
					"displayValue": resources.localizableStrings.WeekDayFirstCaption
				},
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Day of week lookup attribute in week day controls.
			 * @private
			 * @type {Object}
			 */
			"MonthSectionWeekDayList": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"value": {
					"value": 2,
					"displayValue": Terrasoft.Resources.CultureSettings.shortDayNames[1]
				},
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Type of the day lookup attribute in work day controls.
			 * @private
			 * @type {Object}
			 */
			"MonthSectionWorkDayTypeList": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"value": {
					"value": 1,
					"displayValue": resources.localizableStrings.DayTypeWorkDayCaption
				},
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Day position lookup attribute in work day controls.
			 * @private
			 * @type {Object}
			 */
			"MonthSectionWorkDayPositionList": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"value": {
					"value": 1,
					"displayValue": resources.localizableStrings.WeekDayFirstCaption
				},
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Calendar day value in month section.
			 * @private
			 * @type {Number}
			 */
			"MonthSectionMonthDayEdit": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"value": 1,
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Month section month start number.
			 * @private
			 * @type {Number}
			 */
			"MonthSectionTriggerEveryMonthPeriod": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"value": 1,
				"onChange" : "onCronExpressionPartChange"
			},

			/**
			 * Time of process run in days.
			 * @private
			 * @type {Time}
			 */
			"TriggerTime": {
				"dataValueType": this.Terrasoft.DataValueType.TIME,
				"value": new Date(0, 0, 0, 0, 0),
				"onChange" : "onCronExpressionPartChange"
			}
		},
		methods: {

			/**
			 * Initialize week day controls for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWeekDayMonthPeriod: function(cron) {
				var period = cron.getRepetitionPeriod(Terrasoft.cron.Parameters.Month) || 1;
				this.set("MonthSectionSelectType", Terrasoft.CronDayPeriodTypes.WeekDay);
				this._initWeekDayValueInMonthPeriod(cron);
				this._initWeekDayPositionInMonthPeriod(cron);
				this.set("MonthSectionTriggerEveryMonthPeriod", period);
			},

			/**
			 * Initialize day of week for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWeekDayValueInMonthPeriod: function(cron) {
				var weekDay;
				if (cron.hasLastWeekDay()) {
					weekDay = cron.getLastWeekDay();
				} else {
					var dayOfWeekOrdinal = cron.getDayOfWeekOrdinalInfo();
					weekDay = parseInt(dayOfWeekOrdinal.dayOfWeek, 10);
				}
				var weekDayItem = {
					value: weekDay,
					displayValue: this.getWeekDayButtonCaption(weekDay)
				};
				this.set("MonthSectionWeekDayList", weekDayItem);
			},

			/**
			 * Initialize week day position for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWeekDayPositionInMonthPeriod: function(cron) {
				var position;
				if (cron.hasLastWeekDay()) {
					position = Terrasoft.CronWeekDayPosition.Last;
				} else {
					var dayOfWeekOrdinal = cron.getDayOfWeekOrdinalInfo();
					position = parseInt(dayOfWeekOrdinal.order, 10);
				}
				var key = Ext.Object.getKey(Terrasoft.CronWeekDayPosition, position);
				var positionItem = {
					value: position,
					displayValue: this._getDayPositionCaption(key)
				};
				this.set("MonthSectionWeekDayPositionList", positionItem);
			},

			/**
			 * Initialize day controls for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initDayMonthPeriod: function(cron) {
				var period = cron.getRepetitionPeriod(Terrasoft.cron.Parameters.Month) || 1;
				var dayOfMonth = cron.getParameter(Terrasoft.cron.Parameters.DayOfMonth);
				this.set("MonthSectionSelectType", Terrasoft.CronDayPeriodTypes.Day);
				this.set("MonthSectionTriggerEveryMonthPeriod", period);
				this.set("MonthSectionMonthDayEdit", dayOfMonth);
			},

			/**
			 * Initialize work day controls for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWorkDayMonthPeriod: function(cron) {
				var period = cron.getRepetitionPeriod(Terrasoft.cron.Parameters.Month) || 1;
				this.set("MonthSectionSelectType", Terrasoft.CronDayPeriodTypes.WorkDay);
				this.set("MonthSectionTriggerEveryMonthPeriod", period);
				this._initWorkDayPositionInMonthPeriod(cron);
				this._initWorkDayTypeInMonthPeriod(cron);
			},

			/**
			 * Initialize work day type for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWorkDayTypeInMonthPeriod: function(cron) {
				var dayType = cron.hasWorkDays() ? Terrasoft.CronDayTypes.WorkDay : Terrasoft.CronDayTypes.Day;
				var dayTypeKey = Ext.Object.getKey(Terrasoft.CronDayTypes, dayType);
				var typeItem = {
					value: dayType,
					displayValue: this._getDayTypeCation(dayTypeKey)
				};
				this.set("MonthSectionWorkDayTypeList", typeItem);
			},

			/**
			 * Initialize work day position for month expression type.
			 * @private
			 * @param {Terrasoft.CronExpression} cron Cron expression object.
			 */
			_initWorkDayPositionInMonthPeriod: function(cron) {
				var dayPosition = cron.hasLastDayOfMonth()
					? Terrasoft.CronWorkDayPosition.Last
					: Terrasoft.CronWorkDayPosition.First;
				var dayPositionKey = Ext.Object.getKey(Terrasoft.CronWorkDayPosition, dayPosition);
				var positionItem = {
					value: dayPosition,
					displayValue: this._getDayPositionCaption(dayPositionKey)
				};
				this.set("MonthSectionWorkDayPositionList", positionItem);
			},

			/**
			 * Returns week days positions.
			 * @private
			 * @return {Object}
			 */
			_getWeekDayPosition: function() {
				var result = {};
				Terrasoft.each(Terrasoft.CronWeekDayPosition, function(value, name) {
					result[value] = {
						value: value,
						displayValue: this._getDayPositionCaption(name)
					};
				}, this);
				return result;
			},

			/**
			 * Returns day position caption.
			 * @private
			 * @param {String} name CronWorkDayNumeration or CronWeekDayNumeration enum element name.
			 * @return {String}
			 */
			_getDayPositionCaption: function(name) {
				var resourceName = Ext.String.format("Resources.Strings.WeekDay{0}Caption", name);
				return this.get(resourceName);
			},

			/**
			 * Returns work day positions.
			 * @private
			 * @return {Object}
			 */
			_getWorkDayPositions: function() {
				var result = {};
				Terrasoft.each(Terrasoft.CronWorkDayPosition, function(value, name) {
					result[value] = {
						value: value,
						displayValue: this._getDayPositionCaption(name)
					};
				}, this);
				return result;
			},

			/**
			 * Returns day types.
			 * @private
			 * @return {Object}
			 */
			_getDayTypes: function() {
				var result = {};
				Terrasoft.each(Terrasoft.CronDayTypes, function(value, name) {
					result[value] = {
						value: value,
						displayValue: this._getDayTypeCation(name)
					};
				}, this);
				return result;
			},

			/**
			 * Returns day type caption.
			 * @private
			 * @param {String} name CronDayTypes enum element name.
			 * @return {String}
			 */
			_getDayTypeCation: function(name) {
				var resourceName = Ext.String.format("Resources.Strings.DayType{0}Caption", name);
				return this.get(resourceName);
			},

			/**
			 * Set day of week.
			 * @private
			 * @param {Terrasoft.CronExpression} cron cron expression object.
			 */
			_setDayOfWeek: function(cron) {
				var position = this.get("MonthSectionWeekDayPositionList");
				var dayOfWeek = this.get("MonthSectionWeekDayList");
				var dayPosition = position.value;
				var dayOfWeekValue = dayOfWeek.value;
				if (dayPosition === Terrasoft.CronWeekDayPosition.Last) {
					cron.setLastWeekDay(dayOfWeekValue);
				} else {
					cron.setWeekDayOrdinalInfo(dayOfWeekValue, dayPosition);
				}
			},

			/**
			 * Set day of month.
			 * @private
			 * @param {Terrasoft.CronExpression} cron cron expression object.
			 */
			_setWorkDayOfMonth: function(cron) {
				var dayType = this.get("MonthSectionWorkDayTypeList");
				var position = this.get("MonthSectionWorkDayPositionList");
				var dayPosition = position.value;
				if (dayType.value === Terrasoft.CronDayTypes.WorkDay) {
					if (dayPosition === Terrasoft.CronWorkDayPosition.Last) {
						cron.setLastWorkDayInMonth();
					} else {
						cron.setWorkDayPositionInMonth(dayPosition);
					}
				} else if (dayPosition === Terrasoft.CronWorkDayPosition.Last) {
					cron.setLastDayOfMonth();
				} else {
					cron.setDayOfMonth(dayPosition);
				}
			},

			/**
			 * Month validator.
			 * @private
			 * @param {String} value Month value.
			 * @return {Object} Validation info.
			 */
			_monthNumberValidator: function(value) {
				var maxMonth = 12;
				var minMonth = 1;
				var month = parseInt(value, 10);
				var result = Terrasoft.validateNumberRange(minMonth, maxMonth, month);
				return result;
			},

			/**
			 * Prepares work day type(Work day / Day off) list.
			 * @param {Object} filter Filter object.
			 * @param {Terrasoft.Collection} list Expression type list.
			 */
			getDayTypeList: function(filter, list) {
				if (!Ext.isEmpty(list)) {
					list.reloadAll(this._getDayTypes());
				}
			},

			/**
			 * Prepares work day position list.
			 * @param {Object} filter Filter object.
			 * @param {Terrasoft.Collection} list Expression type list.
			 */
			getWorkDayPositionList: function(filter, list) {
				if (!Ext.isEmpty(list)) {
					list.reloadAll(this._getWorkDayPositions());
				}
			},

			/**
			 * Returns if work day radio button selected.
			 * @return {Boolean}
			 */
			getTypeIsWorkDay: function() {
				return this.get("MonthSectionSelectType") === Terrasoft.CronDayPeriodTypes.WorkDay;
			},

			/**
			 * Prepares week day position list.
			 * @param {Object} filter Filter object.
			 * @param {Terrasoft.Collection} list Expression type list.
			 */
			getWeekDayPositionList: function(filter, list) {
				if (!Ext.isEmpty(list)) {
					list.reloadAll(this._getWeekDayPosition());
				}
			},

			/**
			 * Returns if week day radio button selected.
			 * @return {Boolean}
			 */
			getTypeIsWeekDay: function() {
				return this.get("MonthSectionSelectType") === Terrasoft.CronDayPeriodTypes.WeekDay;
			},

			/**
			 * Returns if day radio button selected.
			 * @return {Boolean}
			 */
			getTypeIsDay: function() {
				return this.get("MonthSectionSelectType") === Terrasoft.CronDayPeriodTypes.Day;
			},

			/**
			 * Initializes minute hour section.
			 * @private
			 */
			onExpressionInit: function(cron) {
				if (cron) {
					this.set("TriggerTime", this.getValidDateTime(cron.getStartTime()));
					if (!cron.getIsParameterDefault(Terrasoft.cron.Parameters.DayOfWeek)) {
						this._initWeekDayMonthPeriod(cron);
					} else if (cron.hasOnlyCalendarValues()) {
						this._initDayMonthPeriod(cron);
					} else {
						this._initWorkDayMonthPeriod(cron);
					}
				}
			},

			/**
			 * Saves minute hour section.
			 * @protected
			 */
			getCompositeCronExpressionValue: function() {
				var cron = Terrasoft.CronExpression.create();
				var type = this.get("MonthSectionSelectType");
				var period = this.get("MonthSectionTriggerEveryMonthPeriod");
				cron.setRepetitionPeriod(Terrasoft.cron.Parameters.Month, period);
				cron.setStartTime(this.getValidDateTime(this.get("TriggerTime")));
				switch (type) {
					case Terrasoft.CronDayPeriodTypes.Day:
						var dayOfMonth = this.get("MonthSectionMonthDayEdit");
						cron.setDayOfMonth(dayOfMonth);
						break;
					case Terrasoft.CronDayPeriodTypes.WeekDay:
						this._setDayOfWeek(cron);
						break;
					case Terrasoft.CronDayPeriodTypes.WorkDay:
						this._setWorkDayOfMonth(cron);
						break;
					default:
						throw new Terrasoft.NotImplementedException();
				}
				return cron;
			},

			/**
			 * @inheritdoc ProcessBaseEventPropertiesPage#setValidationConfig
			 * @overriden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("MonthSectionMonthDayEdit", this.dayOfMonthValidator);
				this.addColumnValidator("MonthSectionTriggerEveryMonthPeriod", this._monthNumberValidator);
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "MonthlyStartContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthlyStartModule",
				"parentName": "MonthlyStartContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionTriggerEveryMonthLabel",
				"parentName": "MonthlyStartModule",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionTriggerEveryMonthLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionTriggerEveryMonthPeriod",
				"parentName": "MonthlyStartModule",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22
					},
					"labelConfig": {"visible": false},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"controlConfig": {
						"className": "Terrasoft.TextEdit",
						"value": {"bindTo": "MonthSectionTriggerEveryMonthPeriod"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionTriggerEveryMonthPeriodLabel",
				"parentName": "MonthlyStartModule",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 23,
						"row": 1,
						"colSpan": 4
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionTriggerEveryMonthPeriodLabel"},
					"classes": {"labelClass": ["padding-top-4", "black-text"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayTypeSelectionsGroup",
				"parentName": "MonthlyStartContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["month-section-day-selection-group"]
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayTypeSelectionsContainer",
				"parentName": "MonthSectionDayTypeSelectionsGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionRunEveryLabel",
				"parentName": "MonthSectionDayTypeSelectionsContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 16
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionDaysCaption"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfMonthGroup",
				"parentName": "MonthSectionDayTypeSelectionsContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["month-section-day-selection-container"]
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfMonthContainer",
				"parentName": "MonthSectionDayOfMonthGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfMonthButton",
				"parentName": "MonthSectionDayOfMonthContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 2
					},
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "MonthSectionSelectType"},
					"tag": 0
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfMonthButtonLabel",
				"parentName": "MonthSectionDayOfMonthContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 20
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionDayOfMonthButtonLabel"},
					"classes": {"labelClass": ["black-text"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfMonthInnerContainer",
				"parentName": "MonthSectionDayOfMonthGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": {"bindTo": "getTypeIsDay"}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionMonthDayEdit",
				"parentName": "MonthSectionDayOfMonthInnerContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 23
					},
					"labelConfig": {"visible": false},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"controlConfig": {
						"className": "Terrasoft.TextEdit",
						"value": {"bindTo": "MonthSectionMonthDayEdit"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfWeekGroup",
				"parentName": "MonthSectionDayTypeSelectionsContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["month-section-day-selection-container"]
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfWeekContainer",
				"parentName": "MonthSectionDayOfWeekGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfWeekButton",
				"parentName": "MonthSectionDayOfWeekContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 2
					},
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "MonthSectionSelectType"},
					"tag": 1
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfWeekButtonLabel",
				"parentName": "MonthSectionDayOfWeekContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 20
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionDayOfWeekButtonLabel"},
					"classes": {"labelClass": ["black-text"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionDayOfWeekInnerContainer",
				"parentName": "MonthSectionDayOfWeekGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": {"bindTo": "getTypeIsWeekDay"}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWeekDayPositionList",
				"parentName": "MonthSectionDayOfWeekInnerContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 10
					},
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {"visible": false},
					"controlConfig": {"prepareList": {"bindTo": "getWeekDayPositionList"}}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWeekDayList",
				"parentName": "MonthSectionDayOfWeekInnerContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 14,
						"row": 0,
						"colSpan": 10
					},
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {"visible": false},
					"controlConfig": {"prepareList": {"bindTo": "getWeekDayNamesList"}}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayGroup",
				"parentName": "MonthSectionDayTypeSelectionsContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["month-section-day-selection-container"]
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayContainer",
				"parentName": "MonthSectionWorkDayGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayButton",
				"parentName": "MonthSectionWorkDayContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 2
					},
					"className": "Terrasoft.RadioButton",
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"labelConfig": {"visible": false},
					"checked": {"bindTo": "MonthSectionSelectType"},
					"tag": 2
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayButtonLabel",
				"parentName": "MonthSectionWorkDayContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 3,
						"row": 0,
						"colSpan": 23
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.MonthSectionWorkDayButtonLabel"},
					"classes": {"labelClass": ["black-text"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayInnerContainer",
				"parentName": "MonthSectionWorkDayGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"visible": {"bindTo": "getTypeIsWorkDay"}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayPositionList",
				"parentName": "MonthSectionWorkDayInnerContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 4,
						"row": 0,
						"colSpan": 11
					},
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {"visible": false},
					"controlConfig": {"prepareList": {"bindTo": "getWorkDayPositionList"}}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionWorkDayTypeList",
				"parentName": "MonthSectionWorkDayInnerContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 15,
						"row": 0,
						"colSpan": 15
					},
					"contentType": this.Terrasoft.ContentType.ENUM,
					"labelConfig": {"visible": false},
					"controlConfig": {"prepareList": {"bindTo": "getDayTypeList"}}
				}
			},
			{
				"operation": "insert",
				"name": "MonthSectionTriggerTimerLabel",
				"parentName": "MonthlyStartContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 22
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.WeekSectionRunEveryLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "MonthPeriodTriggerTime",
				"parentName": "MonthlyStartContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 28
					},
					"labelConfig": {"visible": false},
					"bindTo": "TriggerTime",
					"name": "Time",
					"wrapClass": ["date-time-container-modal-page"]
				}
			}
		]
	};
});

