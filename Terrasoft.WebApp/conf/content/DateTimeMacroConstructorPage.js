Terrasoft.configuration.Structures["DateTimeMacroConstructorPage"] = {innerHierarchyStack: ["DateTimeMacroConstructorPage"]};
define('DateTimeMacroConstructorPageStructure', ['DateTimeMacroConstructorPageResources'], function(resources) {return {schemaUId:'d92777d4-1b0b-47b0-916f-3183cdf871e3',schemaCaption: "DateTime Macro Constructor Page", parentSchemaName: "", schemaName:'DateTimeMacroConstructorPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
 * Page to select DateTime macro.
 */
define("DateTimeMacroConstructorPage", ["BusinessRuleModule", "DropdownLookupMixin",
		"css!DateTimeMacroConstructorPageCSS", "css!LookupPageCSS"],
	function(BusinessRuleModule) {
		return {
			mixins: {
				dropdownLookupMixin: "Terrasoft.DropdownLookupMixin"
			},
			messages: {
				/**
				 * @message DateTimeMacroSelected
				 * Reacts on DateTime macro selected action.
				 */
				"DateTimeMacroSelected": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message DateTimeMacroSelectCancel
				 * Reacts on DateTime macro cancelled selection action.
				 */
				"DateTimeMacroSelectCancel": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				/**
				 * Type of data value.
				 */
				"DataValueType": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Current value of macro.
				 */
				"MacroValue": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Lookup for MacroMode.
				 */
				"MacroMode": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Values of lookup for macro Mode.
				 */
				"MacroModeEnum": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": {
						"DateTime": {
							"value": "DateTime",
							"captionName": "Resources.Strings.DateTimeMode"
						},
						"Date": {
							"value": "Date",
							"captionName": "Resources.Strings.DateMode"
						},
						"Time": {
							"value": "Time",
							"captionName": "Resources.Strings.TimeMode"
						}
					}
				},

				/**
				 * Lookup for DateMacro.
				 */
				"DateMacro": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Values of lookup for date macro.
				 */
				"DateMacroEnum": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": {
						"CurrentDate": {
							"value": "CurrentDate",
							"captionName": "Resources.Strings.CurrentDateMacro"
						},
						"DaysBefore": {
							"value": "DaysBefore",
							"captionName": "Resources.Strings.DaysBeforeMacro"
						},
						"DaysAfter": {
							"value": "DaysAfter",
							"captionName": "Resources.Strings.DaysAfterMacro"
						}
					}
				},

				/**
				 * Number of days.
				 */
				"DaysNumber": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 1
				},

				/**
				 * Lookup for TimeMacro.
				 */
				"TimeMacro": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Values of lookup for time macro.
				 */
				"TimeMacroEnum": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": {
						"CurrentTime": {
							"value": "CurrentTime",
							"captionName": "Resources.Strings.CurrentTimeMacro"
						},
						"ExactTime": {
							"value": "ExactTime",
							"captionName": "Resources.Strings.ExactTimeMacro"
						},
						"HoursBefore": {
							"value": "HoursBefore",
							"captionName": "Resources.Strings.HoursBeforeMacro"
						},
						"HoursAfter": {
							"value": "HoursAfter",
							"captionName": "Resources.Strings.HoursAfterMacro"
						}
					}
				},

				/**
				 * Number of days.
				 */
				"HoursNumber": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 1
				},

				/**
				 * Time value for macro.
				 */
				"ExactTime": {
					"dataValueType": this.Terrasoft.DataValueType.TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": new Date("1970-01-01 12:00")
				}
			},
			rules: {
				"ExactTime": {
					"BindExactTimeRequiredToTimeMacro": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "TimeMacro"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "ExactTime"
							}
						}]
					}
				},
				"HoursNumber": {
					"BindHoursNumberRequiredToTimeMacro": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"logical": Terrasoft.LogicalOperatorType.OR,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "TimeMacro"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "HoursAfter"
							}
						},{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "TimeMacro"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "HoursBefore"
							}
						}]
					}
				},
				"DaysNumber": {
					"BindExactTimeRequiredToDateMacro": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"logical": Terrasoft.LogicalOperatorType.OR,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "DateMacro"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "DaysAfter"
							}
						},{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "DateMacro"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "DaysBefore"
							}
						}]
					}
				}
			},
			methods: {

				// #region Methods: Private

				_isMacroModeVisible: function() {
					return this.$DataValueType === Terrasoft.DataValueType.TEXT;
				},

				_isDateMacroVisible: function() {
					return !!this.$MacroMode && this.$MacroMode.value !== this.$MacroModeEnum.Time.value;
				},

				_isDaysNumberVisible: function() {
					return !!this.$DateMacro && (this.$DateMacro.value === this.$DateMacroEnum.DaysBefore.value
						|| this.$DateMacro.value === this.$DateMacroEnum.DaysAfter.value);
				},

				_isTimeMacroVisible: function() {
					return !!this.$MacroMode && this.$MacroMode.value !== this.$MacroModeEnum.Date.value;
				},

				_isHoursNumberVisible: function() {
					return !!this.$TimeMacro && (this.$TimeMacro.value === this.$TimeMacroEnum.HoursBefore.value
						|| this.$TimeMacro.value === this.$TimeMacroEnum.HoursAfter.value);
				},

				_isExactTimeVisible: function() {
					return !!this.$TimeMacro && this.$TimeMacro.value === this.$TimeMacroEnum.ExactTime.value;
				},

				_onMacroModeChanged: function() {
					this.setLookupValue("DateMacro", this.$DateMacroEnum.CurrentDate.value);
					this.setLookupValue("TimeMacro", this.$TimeMacroEnum.CurrentTime.value);
				},

				// #endregion

				// #region Methods: Protected

				/**
				 * Returns Terrasoft.Collection created from the enum definition.
				 * @private
				 * @param {String} enumName.
				 * return {Terrasoft.Collection}.
				 */
				getListFromEnum: function(enumName) {
					var enums = this.get(enumName);
					var collection = Ext.create("Terrasoft.Collection");
					Terrasoft.each(enums, function(item) {
						collection.add(item.value, {
							value: item.value,
							displayValue: this.get(item.captionName)
						});
					}, this);
					return collection;
				},

				/**
				 * Initializes value of Current Lookup.
				 * @param {String} lookupName Name of current lookup.
				 * @param {String} value Value item.
				 * @param {Object} options Specific options.
				 */
				setLookupValue: function(lookupName, value, options) {
					var lookupEnumName = lookupName + "Enum";
					var lookupEnum = this.get(lookupEnumName);
					var lookupValue = lookupEnum[value].value;
					var lookupList = this.getListFromEnum(lookupEnumName);
					var lookupItem = lookupList.get(lookupValue);
					this.set(lookupName, lookupItem, options);
				},

				/**
				 * Loads the Terrasoft.Collection created from enum into the list.
				 * @param {String} enumName Name of the enum.
				 * @param {Terrasoft.Collection} list.
				 */
				prepareList: function(enumName, list) {
					var collection = this.getListFromEnum(enumName);
					list.clear();
					list.loadAll(collection);
				},

				/**
				 * Loads values into macro mode combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareMacroModeList: function(filter, list) {
					this.prepareList("MacroModeEnum", list);
				},

				/**
				 * Loads values into Date macro combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareDateMacroList: function(filter, list) {
					this.prepareList("DateMacroEnum", list);
				},

				/**
				 * Loads values into Time macro combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareTimeMacroList: function(filter, list) {
					var collection = this.getListFromEnum("TimeMacroEnum");
					if (this.$MacroMode.value === "Time") {
						collection = collection.filter(function(item) {
							return item.value !== "ExactTime";
						});
					}
					list.clear();
					list.loadAll(collection);
				},

				/**
				 * Initializes value of MacroMode attribute.
				 * @protected
				 */
				initMacroMode: function() {
					switch(this.$DataValueType) {
						case Terrasoft.DataValueType.DATE:
							this.setLookupValue("MacroMode", this.$MacroModeEnum.Date.value);
							break;
						case Terrasoft.DataValueType.TIME:
							this.setLookupValue("MacroMode", this.$MacroModeEnum.Time.value);
							break;
						case Terrasoft.DataValueType.DATE_TIME:
						default:
							this.setLookupValue("MacroMode", this.$MacroModeEnum.DateTime.value);
							break;
					}
				},

				/**
				 * Initializes value of DateMacro and TimeMacro attributes.
				 * @protected
				 */
				initDateAndTimeMacros: function() {
					var selectedMacroParts = this.$MacroValue && this.$MacroValue.split(".") || [];
					var hasMacroValue = selectedMacroParts.length === 3
						&& selectedMacroParts[0].substring(2) === "Macros";
					var mode = hasMacroValue && selectedMacroParts[1];
					var macro = hasMacroValue && selectedMacroParts[2].slice(0,-2);
					switch(mode) {
						case this.$MacroModeEnum.DateTime.value:
							var macroParts = macro.split("@");
							this.setDateMacroByValue(macroParts[0]);
							this.setTimeMacroByValue(macroParts[1]);
							break;
						case this.$MacroModeEnum.Date.value:
							this.setDateMacroByValue(macro);
							break;
						case this.$MacroModeEnum.Time.value:
							this.setTimeMacroByValue(macro);
							break;
						default:
							this.setLookupValue("DateMacro", this.$DateMacroEnum.CurrentDate.value);
							this.setLookupValue("TimeMacro", this.$TimeMacroEnum.CurrentTime.value);
							break;
					}
				},

				/**
				 * Sets value to DateMacro attribute by current macro value.
				 * @protected
				 * @param {String} value Current date macro value.
				 */
				setDateMacroByValue: function(value) {
					var dateMacroValue;
					Terrasoft.each(this.$DateMacroEnum, function(item) {
						if (value.indexOf(item.value) !== -1) {
							dateMacroValue = item.value;
							return;
						}
					}, this);
					if (dateMacroValue && dateMacroValue === this.$DateMacroEnum.DaysBefore.value
							|| dateMacroValue === this.$DateMacroEnum.DaysAfter.value) {
						var macroRegExp = "(\\d+)("+dateMacroValue+")";
						var macroParts = value.match(macroRegExp) || [];
						var daysNumber = macroParts[1];
						this.$DaysNumber = parseInt(daysNumber, 10) || 1;
					}
					this.setLookupValue("DateMacro", dateMacroValue || this.$DateMacroEnum.CurrentDate.value);
				},

				/**
				 * Sets value to TimeMacro attribute by current macro value.
				 * @protected
				 * @param {String} value Current time macro value.
				 */
				setTimeMacroByValue: function(value) {
					var timeMacroValue;
					Terrasoft.each(this.$TimeMacroEnum, function(item) {
						if (value.indexOf(item.value) !== -1) {
							timeMacroValue = item.value;
							return;
						}
					}, this);
					if (timeMacroValue && timeMacroValue === this.$TimeMacroEnum.HoursBefore.value
							|| timeMacroValue === this.$TimeMacroEnum.HoursAfter.value) {
						var macroRegExp = "(\\d+)("+timeMacroValue+")";
						var macroParts = value.match(macroRegExp) || [];
						var hoursNumber = macroParts[1];
						this.$HoursNumber = parseInt(hoursNumber, 10) || 1;
					}
					var timeRegExp = /^(2[0-3]|[01]\d):([0-5]\d)$/;
					if (!timeMacroValue && timeRegExp.test(value)) {
						timeMacroValue = this.$TimeMacroEnum.ExactTime.value;
						var date = new Date();
						var time = value.match(timeRegExp);
						date.setHours(parseInt(time[1], 10));
						date.setMinutes(parseInt(time[2], 10));
						this.$ExactTime = date;
					}
					this.setLookupValue("TimeMacro", timeMacroValue || this.$TimeMacroEnum.CurrentTime.value);
				},

				/**
				 * Subscribes on events.
				 * @protected
				 */
				subscribeEvents: function() {
					this.on("change:MacroMode", this._onMacroModeChanged, this);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("DaysNumber", this.validateDaysNumber);
					this.addColumnValidator("HoursNumber", this.validateHoursNumber);
				},

				/**
				 * Validates DaysNumber value. It must be positive and not empty.
				 * @protected
				 * @param  {Object} value Mapping value.
				 * @return {Object} Validation info object.
				**/
				validateDaysNumber: function(value) {
					var result = {
						isValid: true,
						invalidMessage: ""
					};
					if(this._isDaysNumberVisible() && value < 1) {
						result.isValid = false;
						result.invalidMessage = this.get("Resources.Strings.NegativeNumberErrorText");
					}
					return result;
				},

				/**
				 * Validates HoursNumber value. It must be positive and not empty.
				 * @protected
				 * @param  {Object} value Mapping value.
				 * @return {Object} Validation info object.
				**/
				validateHoursNumber: function(value) {
					var result = {
						isValid: true,
						invalidMessage: ""
					};
					if(this._isHoursNumberVisible() && value < 1) {
						result.isValid = false;
						result.invalidMessage = this.get("Resources.Strings.NegativeNumberErrorText");
					}
					return result;
				},

				/**
				 * Gets value of date macro.
				 * @protected
				 * @return {String} Date macro value.
				**/
				getDateMacro: function() {
					var dateMacroValue = this.$DateMacro.value;
					if (dateMacroValue === this.$DateMacroEnum.DaysBefore.value
							|| dateMacroValue === this.$DateMacroEnum.DaysAfter.value) {
						return this.$DaysNumber + dateMacroValue;
					} else {
						return dateMacroValue;
					}
				},

				/**
				 * Gets value of time macro.
				 * @protected
				 * @return {String} Time macro value.
				**/
				getTimeMacro: function() {
					var timeMacroValue = this.$TimeMacro.value;
					if (timeMacroValue === this.$TimeMacroEnum.HoursBefore.value
							|| timeMacroValue === this.$TimeMacroEnum.HoursAfter.value) {
						return this.$HoursNumber + timeMacroValue;
					} else if (timeMacroValue === this.$TimeMacroEnum.ExactTime.value) {
						var hours = ("0" + this.$ExactTime.getHours()).slice(-2);
						var minutes = ("0" + this.$ExactTime.getMinutes()).slice(-2);
						return hours + ":" + minutes;
					} else {
						return timeMacroValue;
					}
				},

				// #endregion

				// #region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @override
				 */
				init: function(callback, module) {
					this.callParent(arguments);
					this.subscribeEvents();
					this.initMacroMode();
					this.initDateAndTimeMacros();
				},

				/**
				 * Handler on select button click.
				 * Sends current selected lookup items.
				 * @public
				 */
				onSelectButtonClick: function() {
					if (!this.validate()) {
						return;
					}
					var selectedMacro = "Macros." + this.$MacroMode.value;
					switch (this.$MacroMode.value) {
						case this.$MacroModeEnum.DateTime.value:
							selectedMacro += "." + this.getDateMacro();
							selectedMacro += "@" + this.getTimeMacro();
							break;
						case this.$MacroModeEnum.Date.value:
							selectedMacro += "." + this.getDateMacro();
							break;
						case this.$MacroModeEnum.Time.value:
							selectedMacro += "." + this.getTimeMacro();
							break;
						default:
							break;
					}
					this.sandbox.publish("DateTimeMacroSelected", selectedMacro, [this.sandbox.id]);
				},

				/**
				 * Handler on lookup page close.
				 * Sends message to unload lookup page module.
				 * @public
				 */
				onCloseButtonClick: function() {
					this.sandbox.publish("DateTimeMacroSelectCancel", null, [this.sandbox.id]);
				}

				// #endregion

			},
			diff: [
				{
					"operation": "insert",
					"name": "DateTimeMacroLookupContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["datetime-macro-lookup-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroLookupGrid",
					"parentName": "DateTimeMacroLookupContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroLookupHeaderContainer",
					"parentName": "DateTimeMacroLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"wrapClass": ["datetime-macro-lookup-header"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroHeaderLabel",
					"parentName": "DateTimeMacroLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.LookupCaptionText",
						"classes": {
							"labelClass": ["t-title-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "DateTimeMacroLookupHeaderContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {"wrapperClass": ["close-btn-user-class"]},
						"imageConfig": "$Resources.Images.CloseIcon",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroLookupButtonsContainer",
					"parentName": "DateTimeMacroLookupGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"wrapClass": ["datetime-macro-lookup-buttons-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SelectButton",
					"parentName": "DateTimeMacroLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.SelectButtonCaption",
						"click": "$onSelectButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.GREEN
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "DateTimeMacroLookupButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "$Resources.Strings.CancelButtonCaption",
						"click": "$onCloseButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroContainer",
					"parentName": "DateTimeMacroLookupGrid",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"wrapClass": ["datetime-macro-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeMacroGrid",
					"parentName": "DateTimeMacroContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "MacroModeLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.MacroModeCaption",
						"visible": "$_isMacroModeVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "MacroMode",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": "$onPrepareMacroModeList"
						},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"visible": "$_isMacroModeVisible",
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "DateMacroLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.DateMacroCaption",
						"visible": "$_isDateMacroVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DateMacro",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": "$onPrepareDateMacroList"
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"visible": "$_isDateMacroVisible",
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "DaysNumberLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 2,
							"row": 4,
							"colSpan": 16
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.DaysNumberCaption",
						"visible": "$_isDaysNumberVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DaysNumber",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.INTEGER,
						"layout": {
							"column": 2,
							"row": 5,
							"colSpan": 16
						},
						"labelConfig": {
							"visible": false
						},
						"visible": "$_isDaysNumberVisible"
					}
				},
				{
					"operation": "insert",
					"name": "TimeMacroLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.TimeMacroCaption",
						"visible": "$_isTimeMacroVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "TimeMacro",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": "$onPrepareTimeMacroList"
						},
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"visible": "$_isTimeMacroVisible",
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "HoursNumberLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 2,
							"row": 8,
							"colSpan": 16
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.HoursNumberCaption",
						"visible": "$_isHoursNumberVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "HoursNumber",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.INTEGER,
						"layout": {
							"column": 2,
							"row": 9,
							"colSpan": 16
						},
						"labelConfig": {
							"visible": false
						},
						"visible": "$_isHoursNumberVisible"
					}
				},
				{
					"operation": "insert",
					"name": "ExactTimeLabel",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 2,
							"row": 8,
							"colSpan": 16
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.ExactTimeCaption",
						"visible": "$_isExactTimeVisible",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ExactTime",
					"parentName": "DateTimeMacroGrid",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.TIME,
						"layout": {
							"column": 2,
							"row": 10,
							"colSpan": 16
						},
						"visible": "$_isExactTimeVisible",
						"labelConfig": {
							"visible": false
						}
					}
				}
			]
		};
	});


