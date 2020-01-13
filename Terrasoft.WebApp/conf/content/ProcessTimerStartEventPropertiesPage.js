Terrasoft.configuration.Structures["ProcessTimerStartEventPropertiesPage"] = {innerHierarchyStack: ["ProcessTimerStartEventPropertiesPage"], structureParent: "ProcessBaseEventPropertiesPage"};
define('ProcessTimerStartEventPropertiesPageStructure', ['ProcessTimerStartEventPropertiesPageResources'], function(resources) {return {schemaUId:'7c7bd510-d031-4f40-934c-fcf8db3e4c49',schemaCaption: "Process base event properties page schema", parentSchemaName: "ProcessBaseEventPropertiesPage", schemaName:'ProcessTimerStartEventPropertiesPage',parentSchemaUId:'88673ae5-a4ec-4f99-9804-da51b9878832',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * ProcessTimerStartEventPropertiesPage edit page schema.
 * Parent: ProcessBaseEventPropertiesPage.
 */
define("ProcessTimerStartEventPropertiesPage", ["ProcessTimerStartEventPropertiesPageResources", "SysAdminUnit",
	"CronExpressionPageMixin", "css!ProcessTimerStartEventPropertiesPageCSS"], function(resources, SysAdminUnit) {
	return {
		attributes: {

			/**
			 * Expression type.
			 * @private
			 * @type {Object}
			 */
			"ExpressionType": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"onChange": "clearDefaultSectionsValues"
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
			 * Flag for process reactivation on misfire.
			 * @private
			 * @type {Boolean}
			 */
			"MisfireInstruction": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"caption": resources.localizableStrings.MisfireInstructionCaption
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
			 * Single start date time.
			 * @private
			 * @type {String}
			 */
			"SingleRunStartDateTime": {
				"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
				"value": null
			},

			/**
			 * Start date time.
			 * @private
			 * @type {String}
			 */
			"EndDateTime": {
				"dataValueType": this.Terrasoft.DataValueType.DATE_TIME,
				"value": null
			},

			/**
			 * Returns is start date time active.
			 */
			"IsStartDateTimeActive": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"caption": resources.localizableStrings.OptionalStartTimeLabel
			},

			/**
			 * Returns is start date time active.
			 */
			"IsEndDateTimeActive": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"caption": resources.localizableStrings.OptionalEndTimeLabel,
				"onChange": "clearEndDateTimeValue"
			},

			/**
			 * Time zones collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			"TimeZoneList": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Selected time zone item.
			 * @private
			 * @type {Object}
			 * */
			"TimeZone": {
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP
			},

			/**
			 * Time zone offset.
			 * @private
			 * @type {String}
			 * */
			"TimeZoneOffset": {
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
			CronExpressionPageMixin : "Terrasoft.CronExpressionPageMixin"
		},
		methods: {

			// region Methods: Private

			/**
			 * returns is ExpressionType attribute valid.
			 * @private
			 * @return {Boolean}
			 * */
			_isExpressionTypeValid: function() {
				var expressionType = this.get("ExpressionType");
				return expressionType && expressionType.value !== Terrasoft.TimerExpressionTypes.Empty;
			},

			/**
			 * Returns expression type lookup from timer expression types enum.
			 * @private
			 * @return {Object} Expression type list.
			 */
			_getExpressionTypes: function() {
				var result = {};
				Terrasoft.each(Terrasoft.TimerExpressionTypes, function(value, name) {
					if (value !== Terrasoft.TimerExpressionTypes.Empty) {
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
			 * Returns full validation info for process designer.
			 * @private
			 * @param {String} cronString Source cron string.
			 * @return {Object} Validation info.
			 */
			_getCronValidationInfo: function(cronString) {
				var info = Terrasoft.CronExpression.validate(cronString);
				if (info.isValid) {
					var cronObject = info.cron;
					var secondsParameter = cronObject.getParameter(Terrasoft.cron.Parameters.Seconds);
					var allowedSecondsCharacter = "0";
					if (secondsParameter !== allowedSecondsCharacter) {
						var exceptions = Terrasoft.Resources.ProcessSchemaDesigner.Exceptions;
						info.error = exceptions.InvalidCronSecondsException;
					}
				}
				return info;
			},

			/**
			 * Returns if given section is active.
			 * @private
			 * @param section
			 * @return {Boolean}
			 */
			_isSectionActive: function(section) {
				var currentType = this.get("ExpressionType");
				return this._isExpressionTypeValid() && currentType.value === section;
			},

			/**
			 * Returns sandboxId for message publication.
			 * @private
			 * @return {String} next following sandboxId.
			 */
			_getSectionId: function() {
				return this.sandbox.id + "_module_BaseSchemaModuleV2";
			},

			/**
			 * Set default values.
			 */
			_setDefaultValues: function(skipValidation) {
				var defaultDateTime = new Date();
				this.set("StartDateTime", defaultDateTime, skipValidation);
				this.set("SingleRunStartDateTime", null, skipValidation);
				this.set("IsStartDateTimeActive", false);
				this.set("IsEndDateTimeActive", false);
			},

			/**
			 * Initializes expression type.
			 * @private
			 * @param {Object} element Process element.
			 */
			_initExpressionType: function(element) {
				var value = element.getPropertyValue("expressionType");
				var types = this._getExpressionTypes();
				var newValue = types[value] || {};
				if (value === Terrasoft.TimerExpressionTypes.Empty) {
					newValue = {value:  Terrasoft.TimerExpressionTypes.Empty};
				}
				this.set("ExpressionType", newValue);
			},

			/**
			 * Initializes misfire instruction type.
			 * @private
			 * @param {Object} element Process element.
			 */
			_initMisfireInstruction: function(element) {
				var misfireInstruction = element.getPropertyValue("misfireInstruction");
				this.set("MisfireInstruction", misfireInstruction === Terrasoft.TimerMisfireInstructionTypes.FireNow);
			},

			/**
			 * Initializes default time zone for current user.
			 * @private
			 * @param {Object} element Process element.
			 */
			_initCurrentUserTimeZone: function(element, callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchema: SysAdminUnit});
				esq.addColumn("TimeZoneId", "TimeZoneCode");
				this.$TimeZoneList = this.Ext.create("Terrasoft.Collection");
				this.$TimeZoneOffset = element.getPropertyValue("timeZoneOffset");
				if (this.$TimeZoneOffset) {
					this.$TimeZone = {
						code: this.$TimeZoneOffset
					};
				}
				esq.getEntity(Terrasoft.SysValue.CURRENT_USER.value, function(result) {
					var entity = result.entity;
					if (entity) {
						this.$DefaultTimeZone = entity.get("TimeZoneCode");
					}
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Initializes time zone offset.
			 * @private
			 */
			_initTimeZoneOffset: function(callback, scope) {
				if (!this.$TimeZoneOffset) {
					this.$TimeZoneOffset = this.$DefaultTimeZone;
				}
				Ext.callback(callback, scope);
			},

			/**
			 * Check if time zone element has code equal to user time zone.
			 * @private
			 * @param timeZoneId {String} time zone id
			 * @return {Boolean} state of compare item code with time zone id.
			 */
			_checkTimeZoneCode: function(item, timeZoneId) {
				return timeZoneId ? item.code === timeZoneId : item.code === "UTC";
			},

			/**
			 * Initializes cron expression.
			 * @private
			 * @param {Object} element Process element.
			 */
			_initCronExpression: function(element) {
				var value = element.getPropertyValue("cronExpression");
				if (!Terrasoft.CronExpression.validate(value)) {
					value = null;
				}
				this.set("CronExpression", value);
			},

			/**
			 * Timer period validator.
			 * @private
			 * @return {Object} Validation info.
			 */
			_timerPeriodValidator: function() {
				var message;
				var startDateTime = this.get("StartDateTime");
				var endDateTime = this.get("EndDateTime");
				if (!Ext.isEmpty(startDateTime) && !Ext.isEmpty(endDateTime)) {
					var clearStart = Terrasoft.clearSeconds(startDateTime);
					var clearEnd = Terrasoft.clearSeconds(endDateTime);
					if (clearStart >= clearEnd) {
						message = this.get("Resources.Strings.InvalidTimerPeriodMessage");
					}
				}
				return {invalidMessage: message};
			},

			/**
			 * Start date time validator.
			 * @private
			 * @param {String} mappingValue Start date time.
			 * @return {Object} Validation info.
			 */
			_startDateTimeValidator: function(mappingValue) {
				var result = {
					invalidMessage: ""
				};
				if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun)) {
					if (Ext.isEmpty(mappingValue)) {
						result.invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
					} else {
						var date = Terrasoft.clearSeconds(new Date());
						var timeZone = this.get("TimeZone");
						if (timeZone) {
							timeZone = timeZone.displayValue;
						}
						var userTimeZoneOffset = 0 - new Date().getTimezoneOffset();
						mappingValue = Terrasoft.convertToTimeZone(mappingValue, timeZone, userTimeZoneOffset);
						if (mappingValue < date) {
							result.invalidMessage = this.get("Resources.Strings.SingleRunValidationMessage");
						}
					}
				}
				return result;
			},

			/**
			 * Time zone validator.
			 * @private
			 * @param {Object} mappingValue Time zone id.
			 * @return {Object} Validation info.
			 */
			_timeZoneValidator: function(mappingValue) {
				var result = {
					invalidMessage: ""
				};
				if (Ext.isEmpty(mappingValue)) {
					result.invalidMessage = Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage;
				}
				return result;
			},

			/**
			 * Initializes single run section.
			 * @private
			 */
			_initSingleRunSection: function() {
				if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun)) {
					this.set("SingleRunStartDateTime", this.get("StartDateTime"));
				}
			},

			/**
			 * Saves single run section.
			 * @private
			 */
			_saveSingleRunSection: function() {
				if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun)) {
					this.set("StartDateTime", this.get("SingleRunStartDateTime"));
				}
			},

			/**
			 * Saves expression type.
			 * @private
			 * @param {Object} element Process element.
			 */
			_saveExpressionType: function(element) {
				var expressionType = this.get("ExpressionType");
				element.setPropertyValue("expressionType", expressionType.value);
			},

			/**
			 * Saves misfire instruction type.
			 * @private
			 * @param {Object} element Process element.
			 */
			_saveMisfireInstruction: function(element) {
				var misfireInstruction = this.get("MisfireInstruction");
				element.setPropertyValue("misfireInstruction", misfireInstruction
					? Terrasoft.TimerMisfireInstructionTypes.FireNow
					: Terrasoft.TimerMisfireInstructionTypes.IgnoreMisfires
				);
			},

			/**
			 * Saves start end date time.
			 * @param {Object} element Process element.
			 */
			_saveStartEndDateTimes: function(element) {
				var startDate = this.get("StartDateTime");
				var endDateTime = this.get("EndDateTime");
				var isStartEndTimeGroupActive = this.getIsStartEndTimeGroupActive();
				var isStartDateTimeInSaveState = this.get("IsStartDateTimeActive") || !isStartEndTimeGroupActive;
				var isEndDateTimeInSaveState = this.get("IsEndDateTimeActive") || !isStartEndTimeGroupActive;
				var doSaveStartDate = isStartDateTimeInSaveState && this.getIsDateTimeValid(startDate);
				var startDateValue = null;
				var endDateValue = null;
				if (doSaveStartDate) {
					startDateValue = Terrasoft.toLocalISOString(startDate);
				}
				var doSaveEndDate = isEndDateTimeInSaveState && this.getIsDateTimeValid(endDateTime);
				if (doSaveEndDate) {
					endDateValue = Terrasoft.toLocalISOString(endDateTime);
				}
				element.setPropertyValue("startDateTime", startDateValue);
				element.setPropertyValue("endDateTime", endDateValue);

			},

			/**
			 * Saves time zone offset.
			 * @param {Object} element Process element.
			 */
			_saveTimeZoneOffset: function(element) {
				var newTimeZoneOffset = this.$TimeZone && this.$TimeZone.code;
				element.setPropertyValue("timeZoneOffset", newTimeZoneOffset);
				this.$TimeZoneOffset = newTimeZoneOffset;
			},

			/**
			 * Saves cron expression.
			 * @private
			 * @param {Object} element Process element.
			 */
			_saveCronExpression: function(element) {
				if (this._isSectionActive(Terrasoft.TimerExpressionTypes.SingleRun)) {
					element.setPropertyValue("cronExpression", null);
				} else {
					var cronExpression = this.sandbox.publish("GetCronExpression", null,
						[this._getSectionId()]);
					var cron = Terrasoft.CronExpression.from(cronExpression);
					if (cron.isValid()) {
						var normalizedCron = cron.normalize();
						element.setPropertyValue("cronExpression", normalizedCron.toString());
					}
				}
			},

			/**
			 * Initializes start end date time.
			 * @param {Object} element Process element.
			 */
			_initStartEndDateTimes: function(element) {
				var startDateTime = element.getPropertyValue("startDateTime");
				startDateTime = Ext.isEmpty(startDateTime) ? startDateTime : new Date(startDateTime);
				var endDateTime = element.getPropertyValue("endDateTime");
				endDateTime = Ext.isEmpty(endDateTime) ? endDateTime : new Date(endDateTime);
				if (this.getIsDateTimeValid(startDateTime)) {
					this.set("StartDateTime", startDateTime);
					this.set("IsStartDateTimeActive", true);
				}
				if (this.getIsDateTimeValid(endDateTime)) {
					this.set("EndDateTime", endDateTime);
					this.set("IsEndDateTimeActive", true);
				}
			},

			// endregion

			// region Methods: Public

			/**
			 * Clears EndDateTime attribute value.
			 */
			clearEndDateTimeValue: function(model, value) {
				if (!value) {
					this.set("EndDateTime", null);
				}
			},

			/**
			 * Sets default values for attributes on section change.
			 */
			clearDefaultSectionsValues: function(model, expressionType) {
				var skipValidation = {skipValidation: true};
				var customCronExpressionType = Terrasoft.TimerExpressionTypes.CustomCronExpression;
				var expressionTypePrev = this.getPrevious("ExpressionType");
				if (this._isExpressionTypeValid() && expressionTypePrev) {
					if (expressionTypePrev !== expressionType &&
						expressionType.value !== customCronExpressionType) {
						var element = this.get("ProcessElement");
						element.setPropertyValue("cronExpression", null);
						this.set("CronExpression", null, skipValidation);
					}
				}
				this._setDefaultValues(skipValidation);
			},

			/**
			 * Event handler for prepare list event of time zone lookup.
			 */
			onPrepareTimeZoneList: function() {
				this._loadTimeZones();
			},

			/**
			 * Load time zone from lookup
			 * @param callback
			 * @param scope
			 * @private
			 */
			_loadTimeZones: function(callback, scope) {
				var esq = this.createTimeZoneQuery();
				esq.getEntityCollection(function(response) {
					if (!response || !response.success) {
						return;
					}
					var list = this.$TimeZoneList;
					var columnList = {};
					var timeZoneOffset = this.$TimeZone && this.$TimeZone.code;
					if (!timeZoneOffset) {
						timeZoneOffset = this.$TimeZoneOffset;
					}
					response.collection.each(function(item) {
						var listItem = this.prepareTimeZoneListItem(item);
						columnList[item.get("Id")] = listItem;
						if (item.code === timeZoneOffset) {
							this.$TimeZone = listItem;
						}
					}, this);
					list.clear();
					list.loadAll(columnList);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Set initial selected element in time zone list
			 * @param callback
			 * @param scope
			 * @private
			 */
			_setInitialTimeZone: function(callback, scope) {
				if (this.$TimeZoneList) {
					const listItem = this.$TimeZoneList.findByFn(function(item) {
						return this._checkTimeZoneCode(item, this.$TimeZoneOffset);
					}, this);
					if (listItem) {
						this.$TimeZone = listItem;
					}
				}
				Ext.callback(callback, scope);
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#onElementDataLoad
			 * @overriden
			 */
			onElementDataLoad: function(element, callback, scope) {
				this.callParent([element, function() {
					this._initExpressionType(element);
					this._initStartEndDateTimes(element);
					this._initCronExpression(element);
					this._initMisfireInstruction(element);
					this._initSingleRunSection();
					Terrasoft.chain(
						function(next) {
							this._initCurrentUserTimeZone(element, next, this);
						},
						this._initTimeZoneOffset,
						this._loadTimeZones,
						this._setInitialTimeZone,
						function() {
							callback.call(scope);
						}, this
					);
				}, this]);
			},

			/**
			 * Creates TimeZone entity schema query.
			 * @protected
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			createTimeZoneQuery: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "TimeZone"});
				this.initTimeZoneQueryColumns(esq);
				return esq;
			},

			/**
			 * Initializes time zone query columns.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			initTimeZoneQueryColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Code");
			},

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#saveValues
			 * @overriden
			 */
			saveValues: function() {
				var element = this.get("ProcessElement");
				this._saveSingleRunSection();
				this._saveMisfireInstruction(element);
				this._saveExpressionType(element);
				this._saveCronExpression(element);
				this._saveStartEndDateTimes(element);
				this._saveTimeZoneOffset(element);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc ProcessBaseEventPropertiesPage#setValidationConfig
			 * @overriden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("SingleRunStartDateTime", this._startDateTimeValidator);
				this.addColumnValidator("EndDateTime", this._timerPeriodValidator);
				this.addColumnValidator("TimeZone", this._timeZoneValidator);
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#isElementValid
			 * @overridden
			 */
			isElementValid: function(validationResult) {
				var result = this.callParent([validationResult]);
				var expressionType = this.get("ExpressionType");
				if (expressionType && expressionType.value === Terrasoft.TimerExpressionTypes.Empty) {
					result = false;
				}
				return result;
			},

			/**
			 * Prepares expression type list.
			 * @param {Object} filter Filter object.
			 * @param {Terrasoft.Collection} list Expression type list.
			 */
			prepareExpressionTypesList: function(filter, list) {
				if (!Ext.isEmpty(list)) {
					list.reloadAll(this._getExpressionTypes());
				}
			},

			/**
			 * Prepares time zone list item.
			 * @protected
			 * @virtual
			 * @param {Object} item Time zone list item.
			 * @return {Object}
			 */
			prepareTimeZoneListItem: function(item) {
				return {
					value: item.get("Id"),
					displayValue: item.get("Name"),
					code: item.get("Code")
				};
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
			 * Returns if custom cron expression section is visible.
			 * @return {Boolean} Section visibility.
			 */
			getIsDaySectionVisible: function() {
				return this._isSectionActive(Terrasoft.TimerExpressionTypes.Day);
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
			 * Returns if additional settings are visible.
			 * @return {Boolean} Is additional settings visible.
			 */
			getIsAdditionalSettingsVisible: function() {
				return this._isExpressionTypeValid();
			},

			/**
			 * Returns if minute hour section is visible.
			 * @return {Boolean} Section visibility.
			 */
			getIsMinuteHourSectionVisible: function() {
				return this._isSectionActive(Terrasoft.TimerExpressionTypes.MinuteHour);
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
					Terrasoft.TimerExpressionTypes.Month,
					Terrasoft.TimerExpressionTypes.Year,
					Terrasoft.TimerExpressionTypes.MinuteHour
				];
				return sections.some(this._isSectionActive, this);
			},

			/**
			 * Returns if year section is visible.
			 * @return {Boolean} Section visibility.
			 */
			getIsYearSectionVisible: function() {
				return this._isSectionActive(Terrasoft.TimerExpressionTypes.Year);
			},

			/**
			 * Returns CronExpression.
			 * @return {String}
			 */
			getStringCronExpression: function() {
				var cronExpression = this.get("CronExpression");
				return cronExpression && cronExpression.toString();
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
					"caption": {"bindTo": "Resources.Strings.ExpressionTypeCaption"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
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
						"prepareList": {
							"bindTo": "prepareExpressionTypesList"
						}
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
						"row": 4,
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
					"visible": {"bindTo": "getIsSingleRunSectionVisible"}
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
					"caption": {"bindTo": "Resources.Strings.SingleRunStartDateTimeLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "StartDateTimeContainer",
				"parentName": "SingleRunContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"tag": "DateTime",
					"markerValue": "StartDateTimeContainer",
					"classes": {"wrapClassName": ["single-run-date-container"]}
				}
			},
			{
				"operation": "insert",
				"name": "SingleRunStartDateTime",
				"parentName": "StartDateTimeContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"wrapClass": [],
					"markerValue": "SingleRunStartDateTime"
				}
			},
			{
				"operation": "insert",
				"name": "SelectDateTimeButton",
				"parentName": "StartDateTimeContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onSelectedButtonClick"},
					"tag": "DateTime",
					"markerValue": "SelectDateTimeButton"
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
					"visible": {"bindTo": "getIsCustomCronExpressionSectionVisible"}
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
						"schemaName": "CustomCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
								}
							}
						}
					},
					"moduleName": "BaseSchemaModuleV2"
				}
			},

			//endregion

			//region Section: MinuteHour

			{
				"operation": "insert",
				"name": "MinuteHourStartContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": [],
					"visible": {"bindTo": "getIsMinuteHourSectionVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "MinuteHourModule",
				"parentName": "MinuteHourStartContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "BaseSchemaModuleV2",
					"instanceConfig": {
						"isSchemaConfigInitialized": true,
						"schemaName": "MinuteHourCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
								}
							}
						}
					}
				}
			},

			//endregion

			//region Section: DaySection

			{
				"operation": "insert",
				"name": "DailyStartContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": [],
					"visible": {"bindTo": "getIsDaySectionVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "DailyStartModule",
				"parentName": "DailyStartContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"moduleName": "BaseSchemaModuleV2",
					"instanceConfig": {
						"isSchemaConfigInitialized": true,
						"schemaName": "DailyCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
								}
							}
						}
					}
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
					"visible": {"bindTo": "getIsWeekSectionVisible"}
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
						"schemaName": "WeeklyCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
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
					"visible": {"bindTo": "getIsMonthSectionVisible"}
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
						"schemaName": "MonthlyCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
								}
							}
						}
					}
				}
			},

			//endregion

			//region Section: YearSection

			{
				"operation": "insert",
				"name": "YearGroup",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": [],
					"visible": {"bindTo": "getIsYearSectionVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "YearContainer",
				"parentName": "YearGroup",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.MODULE,
					"moduleName": "BaseSchemaModuleV2",
					"instanceConfig": {
						"isSchemaConfigInitialized": true,
						"schemaName": "YearCronExpressionPage",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"CronExpression": {
									"getValueMethod": "getStringCronExpression"
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
				"name": "AdditionalSettingsValidityContainer",
				"parentName": "MainControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "getIsAdditionalSettingsVisible"},
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
					"caption": {"bindTo": "Resources.Strings.TimerPeriodCaption"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]},
					"visible": {"bindTo": "getIsStartEndTimeGroupActive"}
				}
			},
			{
				"operation": "insert",
				"name": "AdditionalSettingsLabel",
				"parentName": "MainControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 7,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.AdditionalSettingsLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]},
					"visible": {"bindTo": "getIsAdditionalSettingsVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "AdditionalSettingsContainer",
				"parentName": "MainControlGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 8,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "getIsAdditionalSettingsVisible"},
					"items": [],
					"wrapClass": ["additional-section-container", "margin-bottom-20"]
				}
			},
			{
				"operation": "insert",
				"name": "OptionalTimeGroup",
				"parentName": "AdditionalSettingsValidityContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {"bindTo": "getIsStartEndTimeGroupActive"},
					"wrapClass": ["margin-bottom-20"]
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
					"visible": {
						"bindTo": "IsStartDateTimeActive"
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"tag": "DateTime",
					"markerValue": "StartDateTimeContainer",
					"classes": {"wrapClassName": ["start-timer-properties-optional-date-time"]}
				}
			},
			{
				"operation": "insert",
				"name": "StartDateTime",
				"parentName": "OptionalStartDateTimeContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"wrapClass": ["input-wrap"],
					"markerValue": "StartDateTime"
				}
			},
			{
				"operation": "insert",
				"name": "StartDateTimeButton",
				"parentName": "OptionalStartDateTimeContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onSelectedButtonClick"},
					"tag": "DateTime",
					"markerValue": "StartDateTimeButton"
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
					"visible": {
						"bindTo": "IsEndDateTimeActive"
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"tag": "DateTime",
					"classes": {"wrapClassName": ["start-timer-properties-optional-date-time"]},
					"markerValue": "EndDateTimeContainer"
				}
			},
			{
				"operation": "insert",
				"name": "EndDateTime",
				"parentName": "OptionalEndDateTimeContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"wrapClass": ["input-wrap"],
					"markerValue": "EndDateTime"
				}
			},
			{
				"operation": "insert",
				"name": "EndDateTimeButton",
				"parentName": "OptionalEndDateTimeContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
					"itemType": this.Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "onSelectedButtonClick"},
					"tag": "DateTime",
					"markerValue": "EndDateTimeButton"
				}
			},
			{
				"operation": "insert",
				"name": "MisfireInstruction",
				"parentName": "AdditionalSettingsContainer",
				"propertyName": "items",
				"values": {
					"wrapClass": ["t-checkbox-control"]
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
						"row": 9,
						"colSpan": 26
					},
					"visible": {"bindTo": "getIsAdditionalSettingsVisible"}
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
						"labelClass": ["start-timer-properties-page-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "TimeZone",
				"parentName": "TimeZoneContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "TimeZone",
					"contentType": Terrasoft.ContentType.ENUM,
					"labelConfig": {"visible": false},
					"controlConfig": {
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN,
						"prepareList": {"bindTo": "onPrepareTimeZoneList"},
						"list": {"bindTo": "TimeZoneList"},
						"classes": ["combo-box-edit-wrap"]
					},
					"markerValue": "time-zone-value"
				}
			},
			{
				"operation": "remove",
				"name": "useBackgroundMode"
			}

			//endregion
		]
	};
});


