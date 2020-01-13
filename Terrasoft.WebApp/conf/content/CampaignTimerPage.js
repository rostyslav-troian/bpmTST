Terrasoft.configuration.Structures["CampaignTimerPage"] = {innerHierarchyStack: ["CampaignTimerPage"], structureParent: "BaseCampaignSchemaElementPage"};
define('CampaignTimerPageStructure', ['CampaignTimerPageResources'], function(resources) {return {schemaUId:'87301e53-0084-4d80-a6c6-13794e7c5d77',schemaCaption: "CampaignTimerPage", parentSchemaName: "BaseCampaignSchemaElementPage", schemaName:'CampaignTimerPage',parentSchemaUId:'13b73e23-fb4d-41fb-850b-0f4ae4c3e9f1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * Schema of Campaign timer element page
 */
define("CampaignTimerPage", ["CampaignTimerPageResources", "SysAdminUnit",
		"CronExpressionPageMixin", "css!CampaignTimerPageCSS"],
	function(resources, SysAdminUnit) {
		return {
			attributes: {

				/**
				 * Expression type.
				 * @private
				 * @type {Object}
				 */
				"ExpressionType": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"onChange": "clearCronExpressionValue"
				},

				/**
				 * Expression type values.
				 * @private
				 * @type {Object}
				 */
				"ExpressionTypeEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Cron expression object.
				 * @private
				 * @type {Object}
				 */
				"CronExpression": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Start date time.
				 * @private
				 * @type {String}
				 */
				"StartDateTime": {
					"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
					"value": new Date()
				},

				/**
				 * End date time.
				 * @private
				 * @type {String}
				 */
				"EndDateTime": {
					"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
					"value": null
				},

				/**
				 * Single start date time.
				 * @private
				 * @type {String}
				 */
				"SingleRunStartDateTime": {
					"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
					"value": null
				},

				/**
				 * Time of run.
				 * @private
				 * @type {Time}
				 */
				"ExactTime": {
					"dataValueType": this.Terrasoft.DataValueType.TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Period start time.
				 * @private
				 * @type {Time}
				 */
				"PeriodStartTime": {
					"dataValueType": this.Terrasoft.DataValueType.TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Period end time.
				 * @private
				 * @type {Time}
				 */
				"PeriodEndTime": {
					"dataValueType": this.Terrasoft.DataValueType.TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Run time modes.
				 * @private
				 * @type {Object}
				 */
				"RunTimeModeEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						periodMode: 0,
						exactTimeMode: 1
					}
				},

				/**
				 * Run time selected type attribute.
				 * @private
				 * @type {Number}
				 */
				"RunTimeMode": {
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"value": 0
				},

				/**
				 * Returns is start date time active.
				 * @private
				 * @type {Boolean}
				 */
				"IsStartDateTimeActive": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"caption": resources.localizableStrings.OptionalStartTimeLabel
				},

				/**
				 * Returns is end date time active.
				 * @private
				 * @type {Boolean}
				 */
				"IsEndDateTimeActive": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"caption": resources.localizableStrings.OptionalEndTimeLabel,
					"onChange": "clearEndDateTimeValue"
				},

				/**
				 * Returns is custom time zone active.
				 * @private
				 * @type {Boolean}
				 */
				"UseCustomTimeZone": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"caption": resources.localizableStrings.OptionalTimeZoneLabel,
					"onChange": "onUseTimeZoneChange"
				},

				/**
				 * Time zones collection.
				 * @private
				 * @type {Object}
				 */
				"TimeZoneEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Selected time zone item.
				 * @private
				 * @type {Object}
				 */
				"TimeZone": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP
				},

				/**
				 * Time zone code.
				 * @private
				 * @type {String}
				 */
				"TimeZoneCode": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": null
				}
			},
			messages: {
				"GetCronExpression": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				cronExpressionPageMixin : "Terrasoft.CronExpressionPageMixin",
				campaignElementMixin: "Terrasoft.CampaignElementMixin"
			},
			methods: {

				// region Methods: Private

				/**
				 * Returns sandboxId for message publication
				 * @private
				 * @return {String} next following sandboxId.
				 */
				_getSectionId: function() {
					return this.sandbox.id + "_module_BaseSchemaModuleV2";
				},

				/**
				 * Returns if given section is active.
				 * @private
				 * @param section Value to check.
				 * @return {Boolean}
				 */
				_isSectionActive: function(section) {
					var currentType = this.$ExpressionType;
					return this._isExpressionTypeValid() && currentType.value === section;
				},

				/**
				 * Returns expression type lookup from timer expression types enum.
				 * @private
				 * @return {Object} Expression type list.
				 */
				_getExpressionTypes: function() {
					var result = {};
					Terrasoft.each(Terrasoft.TimerExpressionTypes, function(value, name) {
						if (value !== Terrasoft.TimerExpressionTypes.Empty &&
								value !== Terrasoft.TimerExpressionTypes.MinuteHour &&
								value !== Terrasoft.TimerExpressionTypes.Year) {
							result[value] = {
								value: value,
								displayValue: this._getExpressionTypeCaption(name)
							};
						}
					}, this);
					return result;
				},

				/**
				 * Expression type caption.
				 * @private
				 * @param {String} typeName Expression type enum element name.
				 * @return {String} Expression type element caption.
				 */
				_getExpressionTypeCaption: function(typeName) {
					var resourceName = Ext.String.format("Resources.Strings.ExpressionType{0}Caption", typeName);
					return this.get(resourceName);
				},

				/**
				* Returns is ExpressionType attribute valid
				* @private
				* @return {Boolean}
				* */
				_isExpressionTypeValid: function() {
					var expressionType = this.$ExpressionType;
					var typeNotEmpty = expressionType && !Ext.Object.isEmpty(expressionType);
					return typeNotEmpty && expressionType.value !== Terrasoft.TimerExpressionTypes.Empty &&
						expressionType.value !== Terrasoft.TimerExpressionTypes.MinuteHour &&
						expressionType.value !== Terrasoft.TimerExpressionTypes.Year;
				},

				/**
				 * Initializes expression type.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_initExpressionType: function(element) {
					var types = this._getExpressionTypes();
					this.$ExpressionTypeEnum = types;
					var value = element.expressionType;
					var newValue = types[value] || {};
					this.$ExpressionType = newValue;
				},

				/**
				 * Saves expression type.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_saveExpressionType: function(element) {
					var typeValue = this.$ExpressionType && this.$ExpressionType.value;
					element.expressionType = typeValue;
				},

				/**
				 * Initializes single run section.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_initSingleRunSection: function(element) {
					if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun)) {
						var startDateTime = element.startDateTime;
						this.$SingleRunStartDateTime = startDateTime ?
							new Date(startDateTime.replace(/\-/g, "/")) : new Date();
					}
				},

				/**
				 * Initializes cron expression.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_initCronExpression: function(element) {
					var value = element.cronExpression;
					if (!Terrasoft.CronExpression.validate(value).isValid) {
						value = null;
					}
					this.$CronExpression = value;
				},

				/**
				 * Saves cron expression.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_saveCronExpression: function(element) {
					if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun) ||
							this._isSectionActive(Terrasoft.TimerExpressionTypes.Day)) {
						element.cronExpression = "";
					} else {
						var cronExpression = this.sandbox.publish("GetCronExpression", null,
							[this._getSectionId()]);
						this.$CronExpression = cronExpression;
						var cron = Terrasoft.CronExpression.from(cronExpression);
						cron.setParameter(Terrasoft.cron.Parameters.Seconds, "0");
						cron.setParameter(Terrasoft.cron.Parameters.Minutes, "*");
						cron.setParameter(Terrasoft.cron.Parameters.Hours, "*");
						if (cron.isValid()) {
							var normalizedCron = cron.normalize();
							element.cronExpression = normalizedCron.toString();
						}
					}
				},

				/**
				 * Initializes start end date time.
				 * @param {Object} element Campaign element.
				 */
				_initStartEndDateTimes: function(element) {
					var startDateTime = element.startDateTime;
					var endDateTime = element.endDateTime;
					this.$IsStartDateTimeActive = element.useStartDateTime;
					this.$IsEndDateTimeActive = element.useEndDateTime;
					this.$StartDateTime = element.useStartDateTime && startDateTime ?
						new Date(startDateTime.replace(/\-/g, "/")) : new Date();
					this.$EndDateTime = element.useEndDateTime && endDateTime ?
						new Date(endDateTime.replace(/\-/g, "/")) : new Date();
				},

				/**
				 * Saves start end date time.
				 * @param {Object} element Campaign element.
				 */
				_saveStartEndDateTimes: function(element) {
					if (this.getIsStartEndTimeGroupActive()) {
						element.useStartDateTime = this.$IsStartDateTimeActive;
						element.useEndDateTime = this.$IsEndDateTimeActive;
						element.startDateTime = element.useStartDateTime && this.$StartDateTime ?
							this.convertDateToString(this.$StartDateTime) : null;
						element.endDateTime = element.useEndDateTime && this.$EndDateTime ?
							this.convertDateToString(this.$EndDateTime) : null;
					} else {
						element.useStartDateTime = false;
						element.startDateTime = null;
						element.useEndDateTime = false;
						element.endDateTime = null;
					}
					if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun) &&
							this.$SingleRunStartDateTime) {
						element.startDateTime = this.convertDateToString(this.$SingleRunStartDateTime);
					}
				},

				/**
				 * Custom cron expression validator.
				 * @private
				 * @param {String} value Cron expression.
				 * @return {Object} Validation info.
				 */
				_cronExpressionValidator: function(value) {
					var message;
					var sections = [
						Terrasoft.TimerExpressionTypes.Week,
						Terrasoft.TimerExpressionTypes.Month,
						Terrasoft.TimerExpressionTypes.CustomCronExpression
					];
					if (sections.some(this._isSectionActive, this)) {
						var cron = Terrasoft.CronExpression.from(value);
						var info = cron.validate();
						message = info.error;
					}
					return {invalidMessage: message};
				},

				/**
				 * Period start time validator.
				 * @private
				 * @param {String} value Start date time.
				 * @return {Object} Validation info.
				 */
				_periodStartTimeValidator: function(value) {
					var message;
					if (this.getIsStartEndTimeGroupActive() && this._getRunTimeIsPeriod() && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Period end time validator.
				 * @private
				 * @param {String} value Start date time.
				 * @return {Object} Validation info.
				 */
				_periodEndTimeValidator: function(value) {
					var message;
					if (this.getIsStartEndTimeGroupActive() && this._getRunTimeIsPeriod() && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Exact time validator.
				 * @private
				 * @param {String} value Start date time.
				 * @return {Object} Validation info.
				 */
				_exactTimeValidator: function(value) {
					var message;
					if (this.getIsStartEndTimeGroupActive() && this._getRunTimeIsExact() && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Time zone validator.
				 * @private
				 * @param {String} value Time zone.
				 * @return {Object} Validation info.
				 */
				_timeZoneValidator: function(value) {
					var message;
					if (this.$UseCustomTimeZone && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Start date time validator.
				 * @private
				 * @param {String} value Start date time.
				 * @return {Object} Validation info.
				 */
				_startDateTimeValidator: function(value) {
					var message;
					if (this.getIsStartEndTimeGroupActive() && this.$IsStartDateTimeActive && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Timer type validator.
				 * @private
				 * @return {Object} Validation info.
				 */
				_timerTypeValidator: function() {
					var message;
					if (!this._isExpressionTypeValid()) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return {invalidMessage: message};
				},

				/**
				 * Timer period validator.
				 * @private
				 * @param {String} value End date time.
				 * @return {Object} Validation info.
				 */
				_endDateTimeValidator: function(value) {
					var message;
					if (this.getIsStartEndTimeGroupActive() && this.$IsEndDateTimeActive) {
						var startDateTime = this.$IsStartDateTimeActive ? this.$StartDateTime : null;
						if (!Ext.isEmpty(startDateTime) && !Ext.isEmpty(value)) {
							var clearStart = Terrasoft.clearSeconds(startDateTime);
							var clearEnd = Terrasoft.clearSeconds(value);
							if (clearStart >= clearEnd) {
								message = this.get("Resources.Strings.InvalidTimerPeriodMessage");
							}
						}
						if (Ext.isEmpty(value)) {
							message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
						}
					}
					return {invalidMessage: message};
				},

				/**
				 * Start date time validator.
				 * @private
				 * @param {String} value Start date time.
				 * @return {Object} Validation info.
				 */
				_singleRunStartDateTimeValidator: function(value) {
					var message;
					if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun) && Ext.isEmpty(value)) {
						message = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					}
					return { invalidMessage: message };
				},

				/**
				 * Initializes execution time attributes.
				 * @param {Object} element Campaign element.
				 */
				_initTimeSettings: function(element) {
					this.$RunTimeMode = +element.useExactTime;
					var exactTime = element.exactTime;
					exactTime = exactTime ? new Date(exactTime.replace(/\-/g, "/")) : new Date();
					this.$ExactTime = exactTime;
					var startTime = element.periodStartTime;
					startTime = startTime ? new Date(startTime.replace(/\-/g, "/")) : new Date();
					this.$PeriodStartTime = startTime;
					var endTime = element.periodEndTime;
					if (endTime) {
						endTime = new Date(endTime.replace(/\-/g, "/"));
					} else {
						endTime = new Date();
						endTime.setHours(endTime.getHours() + 1);
					}
					this.$PeriodEndTime = endTime;
				},

				/**
				 * Saves time setting.
				 * @private
				 */
				_saveTimeSetting: function(element) {
					if (this.getIsStartEndTimeGroupActive()) {
						var useExactTime = !!this.$RunTimeMode;
						element.useExactTime = useExactTime;
						if (useExactTime) {
							var exactTime = this.$ExactTime ? this.convertDateToString(this.$ExactTime) : "";
							element.exactTime = exactTime;
							element.periodStartTime = null;
							element.periodEndTime = null;
						} else {
							var startTime = this.$PeriodStartTime ?
								this.convertDateToString(this.$PeriodStartTime) : "";
							var endTime = this.$PeriodEndTime ? this.convertDateToString(this.$PeriodEndTime) : "";
							element.periodStartTime = startTime;
							element.periodEndTime = endTime;
							element.exactTime = null;
						}
					}
				},

				/**
				 * Initializes default time zone.
				 * @private
				 * @param {Object} element Campaign element.
				 */
				_initTimeZone: function(element) {
					this.$UseCustomTimeZone = element.useCustomTimeZone;
					this.$TimeZoneCode = element.timeZoneOffset || element.parentSchema.timeZoneCode || "UTC";
					this.$TimeZone = {
						value: this.$TimeZoneCode,
						displayValue: this.$TimeZoneCode,
						code: this.$TimeZoneCode
					};
					if (element.useCustomTimeZone) {
						this._initTimeZoneList();
					}
				},

				/**
				 * Initializes list of the time zones.
				 * @private
				 */
				_initTimeZoneList: function() {
					this.loadTimeZones(function(collection) {
						var columnList = {};
						collection.each(function(item) {
							var listItem = {
								value: item.get("Id"),
								displayValue: item.get("Name"),
								code: item.get("Code")
							};
							columnList[item.get("Id")] = listItem;
							if (listItem.code === this.$TimeZoneCode) {
								this.$TimeZone = listItem;
							}
						}, this);
						this.$TimeZoneEnum = columnList;
					}, this);
				},

				/**
				 * Saves time zone offset.
				 * @param {Object} element Campaign element.
				 */
				_saveTimeZoneOffset: function(element) {
					element.useCustomTimeZone = this.$UseCustomTimeZone;
					element.timeZoneOffset = element.useCustomTimeZone && this.$TimeZone ? this.$TimeZone.code : null;
				},

				/**
				 * Event handler for prepare expression types list.
				 * @private
				 * @param {Object} filter Filter object.
				 * @param {Terrasoft.Collection} list Expression type list.
				 */
				_onPrepareExpressionTypesList: function(filter, list) {
					if (!Ext.isEmpty(list)) {
						list.reloadAll(this.$ExpressionTypeEnum);
					}
				},

				/**
				 * Event handler for prepare list of time zones.
				 * @private
				 * @param {Object} filter Filter object.
				 * @param {Terrasoft.Collection} list Time zone list.
				 */
				_onPrepareTimeZoneList: function(filter, list) {
					if (!Ext.isEmpty(list)) {
						list.reloadAll(this.$TimeZoneEnum);
					}
				},

				/**
				 * Returns true if exaxt time radio button selected.
				 * @private
				 * @return {Boolean}
				 */
				_getRunTimeIsExact: function() {
					return this.$RunTimeMode === this.$RunTimeModeEnum.exactTimeMode;
				},

				/**
				 * Returns true if period radio button selected.
				 * @private
				 * @return {Boolean}
				 */
				_getRunTimeIsPeriod: function() {
					return this.$RunTimeMode === this.$RunTimeModeEnum.periodMode;
				},

				/**
				 * Returns CronExpression.
				 * @private
				 * @return {String}
				 */
				_getStringCronExpression: function() {
					var cronExpression = this.$CronExpression;
					return cronExpression && cronExpression.toString();
				},

				// endregion

				// region Methods: Public

				/**
				 * @inheritdoc CampaignBaseAudiencePropertiesPage#getContextHelpCode
				 * @override
				 */
				getContextHelpCode: function() {
					return "CampaignTimerElement";
				},

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#onElementDataLoad
				 * @overriden
				 */
				onElementDataLoad: function(element, callback, scope) {
					this.callParent([element, function() {
						this._initExpressionType(element);
						this._initTimeSettings(element);
						this._initStartEndDateTimes(element);
						this._initCronExpression(element);
						this._initSingleRunSection(element);
						this._initTimeZone(element);
						callback.call(scope);
					}, this]);
				},

				/**
				 * @inheritdoc ProcessFlowElementPropertiesPage#saveValues
				 * @overriden
				 */
				saveValues: function() {
					var element = this.$ProcessElement;
					this._saveExpressionType(element);
					this._saveCronExpression(element);
					this._saveStartEndDateTimes(element);
					this._saveTimeSetting(element);
					this._saveTimeZoneOffset(element);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc ProcessBaseEventPropertiesPage#setValidationConfig
				 * @overriden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("ExpressionType", this._timerTypeValidator);
					this.addColumnValidator("SingleRunStartDateTime", this._singleRunStartDateTimeValidator);
					this.addColumnValidator("PeriodStartTime", this._periodStartTimeValidator);
					this.addColumnValidator("PeriodEndTime", this._periodEndTimeValidator);
					this.addColumnValidator("ExactTime", this._exactTimeValidator);
					this.addColumnValidator("StartDateTime", this._startDateTimeValidator);
					this.addColumnValidator("EndDateTime", this._endDateTimeValidator);
					this.addColumnValidator("TimeZone", this._timeZoneValidator);
					this.addColumnValidator("CronExpression", this._cronExpressionValidator);
				},

				/**
				 * Event handler for use custom time zone checkbox.
				 */
				onUseTimeZoneChange: function(model, value) {
					if (value && Ext.isEmpty(this.$TimeZoneEnum)) {
						this._initTimeZoneList();
					}
				},

				/**
				 * Clears EndDateTime attribute value.
				 */
				clearEndDateTimeValue: function(model, value) {
					if (!value) {
						this.$EndDateTime = null;
					}
				},

				/**
				 * Sets default value for cron expression attributes.
				 */
				clearCronExpressionValue: function(model, expressionType) {
					var skipValidation = {skipValidation: true};
					var customCronExpressionType = Terrasoft.TimerExpressionTypes.CustomCronExpression;
					var expressionTypePrev = this.getPrevious("ExpressionType");
					if (this._isExpressionTypeValid() && expressionTypePrev && expressionTypePrev !== expressionType &&
							expressionType.value !== customCronExpressionType) {
						var element = this.$ProcessElement;
						element.cronExpression = "";
						this.set("CronExpression", "", skipValidation);
					}
				},

				/**
				 * Returns if custom cron expression section is visible.
				 * @return {Boolean} Section visibility.
				 */
				getIsCustomCronExpressionSectionVisible: function() {
					return this._isSectionActive(Terrasoft.TimerExpressionTypes.CustomCronExpression);
				},

				/**
				 * Returns if custom cron expression section is visible.
				 * @return {Boolean} Section visibility.
				 */
				getIsSingleRunSectionVisible: function() {
					return this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun);
				},

				/**
				 * Returns if week section is visible.
				 * @return {Boolean} Section visibility.
				 */
				getIsWeekSectionVisible: function() {
					return this._isSectionActive(Terrasoft.TimerExpressionTypes.Week);
				},

				/**
				 * Returns if month section is visible.
				 * @return {Boolean} Section visibility.
				 */
				getIsMonthSectionVisible: function() {
					return this._isSectionActive(Terrasoft.TimerExpressionTypes.Month);
				},

				/**
				 * Returns if time zone settings are visible.
				 * @return {Boolean} Is additional settings visible.
				 */
				getIsTimeZoneSettingsVisible: function() {
					return this._isExpressionTypeValid();
				},

				/**
				 * Returns when start end time group is visible.
				 * @return {Boolean} Group visibility.
				 */
				getIsStartEndTimeGroupActive: function() {
					var sections = [
						Terrasoft.TimerExpressionTypes.CustomCronExpression,
						Terrasoft.TimerExpressionTypes.Day,
						Terrasoft.TimerExpressionTypes.Week,
						Terrasoft.TimerExpressionTypes.Month
					];
					return sections.some(this._isSectionActive, this);
				}

				// endregion

			},
			diff: [
				//region Block: BaseHeader

				{
					"operation": "insert",
					"name": "MainControlContainer",
					"parentName": "EditorsContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "MainControlContainer",
					"propertyName": "items",
					"name": "MainControlGroup",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ExpressionTypeLabel",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 22
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.ExpressionTypeCaption",
						"classes": {"labelClass": ["timer-properties-page-label"]}
					}
				},
				{
					"operation": "insert",
					"name": "ExpressionType",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 26
						},
						"contentType": this.Terrasoft.ContentType.ENUM,
						"labelConfig": {"visible": false},
						"controlConfig": {
							"prepareList": "$_onPrepareExpressionTypesList"
						}
					}
				},
				{
					"operation": "insert",
					"name": "SectionContainer",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},

				//endregion

				//region Section: SingleRun

				{
					"operation": "insert",
					"name": "SingleRunGroup",
					"parentName": "SectionContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": [],
						"visible": "$getIsSingleRunSectionVisible"
					}
				},
				{
					"operation": "insert",
					"name": "SingleRunContainer",
					"parentName": "SingleRunGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SingleRunStartDateTimeLabel",
					"parentName": "SingleRunContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.SingleRunStartDateTimeLabel",
						"classes": {"labelClass": ["timer-properties-page-label"]}
					}
				},
				{
					"operation": "insert",
					"name": "StartDateTimeContainer",
					"parentName": "SingleRunContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"tag": "DateTime",
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 26
						},
						"markerValue": "StartDateTimeContainer",
						"classes": {"wrapClassName": ["single-run-date-container"]}
					}
				},
				{
					"operation": "insert",
					"name": "SingleRunStartTimeGroup",
					"parentName": "StartDateTimeContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SingleRunStartDateTime",
					"parentName": "SingleRunStartTimeGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 21
						},
						"labelConfig": {"visible": false},
						"wrapClass": [],
						"markerValue": "SingleRunStartDateTime"
					}
				},

				//endregion

				//region Section: CustomCronExpressionSection

				{
					"operation": "insert",
					"name": "CustomCronExpressionContainer",
					"parentName": "SectionContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": "$getIsCustomCronExpressionSectionVisible"
					}
				},
				{
					"operation": "insert",
					"name": "CustomCronExpressionModule",
					"propertyName": "items",
					"parentName": "CustomCronExpressionContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"instanceConfig": {
							"isSchemaConfigInitialized": true,
							"schemaName": "CustomCronExpressionModule",
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"CronExpression": {
										"getValueMethod": "_getStringCronExpression"
									}
								}
							}
						},
						"moduleName": "BaseSchemaModuleV2"
					}
				},

				//endregion

				//region Section: WeekSection

				{
					"operation": "insert",
					"name": "WeeklyStartContainer",
					"parentName": "SectionContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": [],
						"visible": "$getIsWeekSectionVisible"
					}
				},
				{
					"operation": "insert",
					"name": "WeeklyStartModule",
					"parentName": "WeeklyStartContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "BaseSchemaModuleV2",
						"instanceConfig": {
							"isSchemaConfigInitialized": true,
							"schemaName": "WeekCronExpressionModule",
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"CronExpression": {
										"getValueMethod": "_getStringCronExpression"
									}
								}
							}
						}
					}
				},

				//endregion

				//region Section: MonthSection

				{
					"operation": "insert",
					"name": "MonthlyStartContainer",
					"parentName": "SectionContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": "$getIsMonthSectionVisible"
					}
				},
				{
					"operation": "insert",
					"name": "MonthlyStartModule",
					"parentName": "MonthlyStartContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.MODULE,
						"moduleName": "BaseSchemaModuleV2",
						"instanceConfig": {
							"isSchemaConfigInitialized": true,
							"schemaName": "MonthCronExpressionModule",
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									"CronExpression": {
										"getValueMethod": "_getStringCronExpression"
									}
								}
							}
						}
					}
				},

				//endregion

				//region Block: BaseFooter
				{
					"operation": "insert",
					"name": "TimeSettingsContainer",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"visible": "$getIsStartEndTimeGroupActive",
						"items": [],
						"wrapClass": ["time-section-container"]
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsLabel",
					"parentName": "TimeSettingsContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.ExecutionTimeLabel",
						"classes": {"labelClass": ["timer-properties-page-label"]}
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsPeriodGroup",
					"parentName": "TimeSettingsContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["time-settings-selection-group"]
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsPeriodContainer",
					"parentName": "TimeSettingsPeriodGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsPeriodButton",
					"parentName": "TimeSettingsPeriodContainer",
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
						"checked": "$RunTimeMode",
						"tag": 0
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsPeriodButtonLabel",
					"parentName": "TimeSettingsPeriodContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 20
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.TimePeriodOptionCaption",
						"classes": {"labelClass": ["black-text"]}
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsPeriodInnerContainer",
					"parentName": "TimeSettingsPeriodGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": "$_getRunTimeIsPeriod"
					}
				},
				{
					"operation": "insert",
					"name": "PeriodStartTime",
					"parentName": "TimeSettingsPeriodInnerContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 11
						},
						"labelConfig": {
							"caption": "$Resources.Strings.TimePeriodStartCaption"
						},
						"bindTo": "PeriodStartTime",
						"name": "PeriodStartTime",
						"wrapClass": ["time-settings-container"]
					}
				},
				{
					"operation": "insert",
					"name": "PeriodEndTime",
					"parentName": "TimeSettingsPeriodInnerContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 14,
							"row": 0,
							"colSpan": 11
						},
						"labelConfig": {
							"caption": "$Resources.Strings.TimePeriodEndCaption"
						},
						"bindTo": "PeriodEndTime",
						"name": "PeriodEndTime",
						"wrapClass": ["time-settings-container"]
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsExactTimeGroup",
					"parentName": "TimeSettingsContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["time-settings-selection-group"]
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsExactTimeContainer",
					"parentName": "TimeSettingsExactTimeGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsExactTimeButton",
					"parentName": "TimeSettingsExactTimeContainer",
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
						"checked": "$RunTimeMode",
						"tag": 1
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsExactTimeButtonLabel",
					"parentName": "TimeSettingsExactTimeContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 20
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.ExactTimeOptionCaption",
						"classes": {"labelClass": ["black-text"]}
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsExactTimeInnerContainer",
					"parentName": "TimeSettingsExactTimeGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": "$_getRunTimeIsExact"
					}
				},
				{
					"operation": "insert",
					"name": "ExactTimeControl",
					"parentName": "TimeSettingsExactTimeInnerContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 9
						},
						"labelConfig": {"visible": false},
						"bindTo": "ExactTime",
						"name": "ExactTime",
						"wrapClass": ["time-settings-container"]
					}
				},
				{
					"operation": "insert",
					"name": "AdditionalSettingsValidityContainer",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"visible": "$getIsStartEndTimeGroupActive",
						"items": [],
						"wrapClass": ["additional-section-container"]
					}
				},
				{
					"operation": "insert",
					"name": "AdditionalSettingsValidityLabel",
					"parentName": "AdditionalSettingsValidityContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.TimerPeriodCaption",
						"classes": {"labelClass": ["timer-properties-page-label"]}
					}
				},
				{
					"operation": "insert",
					"name": "OptionalTimeGroup",
					"parentName": "AdditionalSettingsValidityContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OptionalTimeContainer",
					"parentName": "OptionalTimeGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "OptionalStartDateTimeGroup",
					"parentName": "OptionalTimeContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "IsStartDateTimeActive",
					"parentName": "OptionalStartDateTimeGroup",
					"propertyName": "items",
					"values": {
						"wrapClass": ["t-checkbox-control"]
					}
				},
				{
					"operation": "insert",
					"name": "OptionalStartDateTimeContainer",
					"parentName": "OptionalStartDateTimeGroup",
					"propertyName": "items",
					"values": {
						"visible": "$IsStartDateTimeActive",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"tag": "DateTime",
						"markerValue": "StartDateTimeContainer",
						"classes": {"wrapClassName": ["start-timer-properties-optional-date-time"]}
					}
				},
				{
					"operation": "insert",
					"name": "StartDateTimeGroup",
					"parentName": "OptionalStartDateTimeContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "StartDateTime",
					"parentName": "StartDateTimeGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 21
						},
						"labelConfig": {"visible": false},
						"wrapClass": ["input-wrap"],
						"markerValue": "StartDateTime"
					}
				},
				{
					"operation": "insert",
					"name": "OptionalEndDateTimeGroup",
					"parentName": "OptionalTimeContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 26
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "IsEndDateTimeActive",
					"parentName": "OptionalEndDateTimeGroup",
					"propertyName": "items",
					"values": {
						"wrapClass": ["t-checkbox-control"]
					}
				},
				{
					"operation": "insert",
					"name": "OptionalEndDateTimeContainer",
					"parentName": "OptionalEndDateTimeGroup",
					"propertyName": "items",
					"values": {
						"visible": "$IsEndDateTimeActive",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"tag": "DateTime",
						"classes": {"wrapClassName": ["start-timer-properties-optional-date-time"]},
						"markerValue": "EndDateTimeContainer"
					}
				},
				{
					"operation": "insert",
					"name": "EndDateTimeGroup",
					"parentName": "OptionalEndDateTimeContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EndDateTime",
					"parentName": "EndDateTimeGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 0,
							"colSpan": 21
						},
						"labelConfig": {"visible": false},
						"wrapClass": ["input-wrap"],
						"markerValue": "EndDateTime"
					}
				},

				//endregion

				//region Block: TimeZone

				{
					"operation": "insert",
					"name": "TimeZoneContainer",
					"parentName": "MainControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 26
						},
						"visible": "$getIsTimeZoneSettingsVisible"
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneCaption",
					"parentName": "TimeZoneContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": SysAdminUnit.columns.TimeZoneId.caption,
						"classes": {
							"labelClass": ["timer-properties-page-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneSelectContainer",
					"parentName": "TimeZoneContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneSelectGroup",
					"parentName": "TimeZoneSelectContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "UseCustomTimeZone",
					"parentName": "TimeZoneSelectGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 22
						},
						"wrapClass": ["t-checkbox-control"]
					}
				},
				{
					"operation": "insert",
					"name": "CustomTimeZoneHint",
					"parentName": "TimeZoneSelectGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 22,
							"row": 0,
							"colSpan": 2
						},
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.UseCustomTimeZoneHint",
						"controlConfig": {
							"classes": {
								"wrapperClass": "t-checkbox-information-button"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "TimeZoneListContainer",
					"parentName": "TimeZoneSelectGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 3,
							"row": 1,
							"colSpan": 21
						},
						"visible": "$UseCustomTimeZone",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": "TimeZoneContainer",
						"classes": {"wrapClassName": ["start-timer-properties-optional-date-time"]}
					}
				},
				{
					"operation": "insert",
					"name": "TimeZone",
					"parentName": "TimeZoneListContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.ENUM,
						"bindTo": "TimeZone",
						"labelConfig": {"visible": false},
						"controlConfig": {
							"prepareList": "$_onPrepareTimeZoneList"
						},
						"markerValue": "TimeZoneValue"
					}
				},
				{
					"operation": "remove",
					"name": "useBackgroundMode"
				}

				//endregion
			]
		};
	}
);


