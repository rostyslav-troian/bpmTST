Terrasoft.configuration.Structures["CampaignConditionalSequenceFlowPropertiesPage"] = {innerHierarchyStack: ["CampaignConditionalSequenceFlowPropertiesPage"], structureParent: "CampaignSequenceFlowPropertiesPage"};
define('CampaignConditionalSequenceFlowPropertiesPageStructure', ['CampaignConditionalSequenceFlowPropertiesPageResources'], function(resources) {return {schemaUId:'c1d6650d-5a31-454c-9949-f6f3ab801b57',schemaCaption: "CampaignConditionalSequenceFlowPropertiesPage", parentSchemaName: "CampaignSequenceFlowPropertiesPage", schemaName:'CampaignConditionalSequenceFlowPropertiesPage',parentSchemaUId:'24fd81aa-469d-4ec5-98c8-7473a0cdffa9',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * CampaignConditionalSequenceFlowPropertiesPage edit page schema.
 * Parent: CampaignSequenceFlowPropertiesPage.
 */
define("CampaignConditionalSequenceFlowPropertiesPage", ["BusinessRuleModule",
		"CampaignElementMixin", "DropdownLookupMixin", "StructureExplorerUtilities",
		"FilterModuleMixin", "EntitySchemaSelectMixin"],
	function(BusinessRuleModule) {
		return {
			messages: {
				"GetFilterModuleConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"OnFiltersChanged": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			mixins: {
				entitySchemaSelectMixin: "Terrasoft.EntitySchemaSelectMixin",
				campaignElementMixin: "Terrasoft.CampaignElementMixin",
				dropdownLookupMixin: "Terrasoft.DropdownLookupMixin"
			},
			attributes: {
				/**
				 * Values of lookup for sequenceMode.
				 */
				"SequenceModeEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Default: {
							value: "0",
							captionName: "Resources.Strings.SequenceModeDefault"
						},
						TimePeriod: {
							value: "1",
							captionName: "Resources.Strings.SequenceModeTimePeriod"
						}
					}
				},

				/**
				 * Values of lookup for delayUnit.
				 */
				"DelayUnitEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Default: {
							value: "0",
							captionName: "Resources.Strings.DelayDecisionDaysNumber"
						},
						Hours: {
							value: "1",
							captionName: "Resources.Strings.DelayDecisionHoursNumber"
						}
					}
				},

				/**
				 * Values of lookup for filterMode.
				 */
				"FilterModeEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Default: {
							value: "0",
							captionName: "Resources.Strings.FilterModeDefault"
						},
						WithFilter: {
							value: "1",
							captionName: "Resources.Strings.FilterModeWithFilter"
						}
					}
				},

				/**
				 * Lookup for SequenceMode.
				 */
				"SequenceMode": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Lookup for FilterMode.
				 */
				"FilterMode": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Delay unit for ui combobox.
				 */
				"DelayUnit": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * DaysNumber property.
				 */
				"DaysNumber": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"value": 1,
					"defaultValue": 1,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Time when transition will be executed.
				 */
				"ExecutionTime": {
					"dataValueType": this.Terrasoft.DataValueType.TIME,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * IsFilterChanged property which indicates whenever filter has been changed.
				 */
				"IsFilterChanged": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Initial value of filters.
				 */
				"InitialFilter": {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * FilterId schema property.
				 */
				"FilterId": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * HasStartTime property to indicate that StartTime property is specified.
				 */
				"HasStartTime": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			rules: {
				/**
				 * Rule for ExecutionTime.
				 */
				"ExecutionTime": {
					"BindExecutionTimeRequiredToSequenceMode": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "SequenceMode"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "1"
							}
						}]
					}
				}
			},
			methods: {

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#init
				 * @overridden
				 */
				init: function() {
					this.subscribeEvents();
					this.callParent(arguments);
				},

				/**
				 * Subscribes on events.
				 * @protected
				 */
				subscribeEvents: function() {
					this.on("change:SequenceMode", this._onSequenceModeLookupChanged, this);
					this.on("change:FilterMode", this._onFilterModeLookupChanged, this);
					this.on("change:HasStartTime", this._onHasStartTimeChanged, this);
				},

				/**
				 * Handles change of the "SequenceMode" property.
				 * @private
				 */
				_onSequenceModeLookupChanged: function() {
					var sequenceMode = this.$SequenceMode;
					var defaultValue = this.$SequenceModeEnum.Default.value;
					if (!sequenceMode || sequenceMode.value === defaultValue) {
						this.$DaysNumber = 1;
						this.$ExecutionTime = null;
					} else {
						this._setDefaultDaysNumberForTransitionWithDelay();
						this._setDefaultExecutionTimeForTransitionWithDelay();
					}
				},

				/**
				 * Handles change of the "FilterMode" property.
				 * @private
				 */
				_onFilterModeLookupChanged: function() {
					var filterMode = this.get("FilterMode");
					var defaultValue = this.get("FilterModeEnum").Default.value;
					if (filterMode.value === defaultValue) {
						this.sandbox.unloadModule(this._getFilterEditModuleId());
					} else {
						var filterId = this.get("FilterId");
						this._initFilter(filterId);
					}
				},

				/**
				 * Handles change of the "HasStartTime" property.
				 * @private
				 */
				_onHasStartTimeChanged: function() {
					if (this.$HasStartTime && !this.$ExecutionTime) {
						this.$ExecutionTime = new Date();
					}
					this.validateColumn("DaysNumber");
				},

				/**
				 * Sets expected default value for DaysNumber attribute.
				 * @private
				 */
				_setDefaultDaysNumberForTransitionWithDelay: function() {
					if (!this.$DaysNumber) {
						this.$DaysNumber = 0;
					}
				},

				/**
				 * Sets expected default value for DaysNumber attribute.
				 * @private
				 */
				_setDefaultExecutionTimeForTransitionWithDelay: function() {
					if (this.$HasStartTime && !this.$ExecutionTime) {
						this.$ExecutionTime = new Date();
					}
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters.
				 * @overridden
				 */
				initParameters: function(element) {
					this.callParent(arguments);
					this.set("FilterId", element.filterId);
					this.set("IsFilterChanged", element.isFilterChanged);
					this._initDaysNumber(element.delayInDays);
					this.set("HasStartTime", element.hasStartTime);
					this.set("FilterData", element.filter);
					this.set("InitialFilter", element.filter);
					this._initExecutionTime(element.startTime);
					this._setDelayUnitLookupValue(element.delayUnit);
					this._setSequenceModeLookupValue(element.isDelayedStart);
					this._setFilterModeLookupValue(element.hasFilter);
				},

				/**
				 * If filterId is not empty gets filter data from linked contactFolder.
				 * Otherwise generates new unique identifier and sets existing or empty filter.
				 * @private
				 * @param  {Guid} folderId unique identifier of linked ContactFolder.
				 */
				_initFilter: function(folderId) {
					var filters = this.get("FilterData");
					if (folderId && this.Ext.isEmpty(filters)) {
						var config = {
							serviceName: "CampaignService",
							methodName: "GetContactFolderInfo",
							data: {
								folderId: folderId
							}
						};
						this.callService(config, function(response) {
							var folderInfo = response.GetContactFolderInfoResult;
							if (folderInfo) {
								this.set("FilterData", folderInfo.SearchData);
								this.set("InitialFilter", folderInfo.SearchData);
							}
							this.loadFilterModule();
						}, this);
					} else {
						if (!folderId) {
							var filterId = Terrasoft.generateGUID();
							this.set("FilterId", filterId);
						}
						this.loadFilterModule();
					}
				},

				/**
				 * Page render handler.
				 * Starts to init filter module when page is rendered.
				 * @overriden
				 */
				onRender: function() {
					if (this._getIsFiltersContainerVisible()) {
						var filterId = this.get("FilterId");
						this._initFilter(filterId);
					}
				},

				/**
				 * Initializes value of the "ExecutionTime" property.
				 * @private
				 * @param {string} value Initial date string.
				 */
				_initExecutionTime: function(value) {
					var date = new Date();
					if (value) {
						var formatValue = value.replace(/\-/g, "/");
						date = new Date(formatValue);
					}
					this.set("ExecutionTime", date);
				},

				/**
				 * Initializes value of the "DaysNumber" property.
				 * @private
				 * @param {Number} value Initial value.
				 */
				_initDaysNumber: function(value) {
					var daysNumber = 0;
					if (this.Ext.isNumber(value)) {
						daysNumber = value;
					}
					this.set("DaysNumber", daysNumber);
				},

				/**
				 * Initializes value of the "SequenceMode" property.
				 * @private
				 * @param {Boolean} isDelayedStart Is transition has any delay.
				 */
				_setSequenceModeLookupValue: function(isDelayedStart) {
					var isDefaultValue = !isDelayedStart;
					this.setLookupValue(isDefaultValue,
						"SequenceMode", "TimePeriod", this);
				},

				/**
				 * Initialize value of the "DelayUnit" ptoperty
				 * @private
				 * @param {Integer} delayUnit Delay unit value from metadata.
				 */
				_setDelayUnitLookupValue: function(delayUnit) {
					var isDefaultValue = !delayUnit || delayUnit === 0 ? true : false;
					this.setLookupValue(isDefaultValue,
						"DelayUnit", "Hours", this);
				},

				/**
				 * Inits is Filter is visible.
				 * @private
				 * @param  {Boolean} isFilterEnabled user decision to use filter.
				 */
				_setFilterModeLookupValue: function(isFilterEnabled) {
					var isDefaultValue = !isFilterEnabled;
					var options = {
						silent: true
					};
					this.setLookupValue(isDefaultValue,
						"FilterMode", "WithFilter", this, options);
				},

				/**
				 * Loads values into sequence mode combobox.
				 * @protected
				 * @param {Object} sequence ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareSequenceModeList: function(filter, list) {
					this.prepareList("SequenceModeEnum", list, this);
				},

				/**
				 * Loads values into filter mode combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareFilterModeList: function(filter, list) {
					this.prepareList("FilterModeEnum", list, this);
				},

				/**
				 * Loads values into delay unit combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareDelayUnitList: function(filter, list) {
					this.prepareList("DelayUnitEnum", list, this);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#saveValues.
				 * @overridden
				 */
				saveValues: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					var isDelayedStart = this._getIsSequenceMode();
					element.isDelayedStart = isDelayedStart;
					element.hasStartTime = this.$HasStartTime;
					var startTime = this._getCurrentStartTime();
					var delayUnit = this.get("DelayUnit");
					element.startTime = startTime;
					element.delayUnit = Terrasoft.isEmptyObject(delayUnit) ? 0 : parseInt(delayUnit.value , 10);
					element.delayInDays = this.getCurrentDalayInDays(isDelayedStart);
					var hasFilter = this._getIsFiltersContainerVisible();
					element.hasFilter = hasFilter;
					this._saveFiltersInSchema(hasFilter, element);
					element.filterId = this.get("FilterId");
					element.isFilterChanged = this.get("IsFilterChanged");
					this.set("IsFilterChanged", false);
				},

				/**
				 * Returns StartTime parameter based on selected page attributes.
				 * @private
				 * @return {Date} start time.
				 */
				_getCurrentStartTime: function() {
					var hasStartTime = this.$HasStartTime;
					var executionTime = this.$ExecutionTime;
					return hasStartTime && executionTime ? this.convertDateToString(executionTime) : "";
				},

				/**
				 * Returns DelayInDays parameter based on selected page attributes.
				 * If no delay returns 0 otherwise returns value of DaysNumber attribute.
				 * @param {Boolean} isDelayedStart is transition has some delay.
				 * @protected
				 * @return {number} delay in days.
				 */
				getCurrentDalayInDays: function(isDelayedStart) {
					var validationInfo = this.validationInfo.get("DaysNumber") || { isValid: true };
					if (!isDelayedStart || !validationInfo.isValid) {
						return 1;
					}
					var daysNumber = this.get("DaysNumber");
					return this.Ext.isNumber(daysNumber) ? daysNumber : 1;
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#getContextHelpCode.
				 * @overridden
				 */
				getContextHelpCode: function() {
					return "CampaignConditionalSequenceFlow";
				},

				/**
				 * Determines whether the value of the "DelayDecision" is DaysNumber value.
				 * @return {Boolean}.
				 */
				_getIsSequenceMode: function() {
					return this.isLookupValueEqual("SequenceMode", "1", this) &&
							!this.get("IsSynchronous");
				},

				/**
				 * Saves schema filters.
				 * If schema hasn't any filter sets empty string
				 * else sets current FilterData if exists.
				 * @private
				 * @param {Boolean} hasFilter Is current transition has filter.
				 * @param {Terrasoft.ProcessCampaignConditionSequenceFlowSchema} sequenceFlowSchema
				 * Schema of current transition.
				 */
				_saveFiltersInSchema: function(hasFilter, element) {
					if (!hasFilter) {
						element.filter = "";
					} else {
						element.filter = this.get("FilterData") || "";
					}
				},

				/**
				 * Returns visibility of filter container.
				 * @private
				 * @return {Boolean} is filter container visible.
				 */
				_getIsFiltersContainerVisible: function() {
					return this.isLookupValueEqual("FilterMode", "1", this);
				},

				/**
				 * Returns sandbox's FilterEditModule Id.
				 * @private
				 * @return {string} Id of FilterEditModule.
				 */
				_getFilterEditModuleId: function() {
					return this.sandbox.id + "_FilterEditModule";
				},

				/**
				 * Validates DaysNumber by value.
				 * @private
				 * @param {number} value DaysNumber value for validate.
				 * @returns {Boolean} Validation result.
				 * Returns true when DaysNumber is valid, and false in otherwise.
				 */
				_isDaysNumberValid: function(value) {
					if (!this._getIsSequenceMode()) {
						return true;
					}
					if (this.Ext.isEmpty(value)) {
						return false;
					}
					return this.$HasStartTime
						? value >= 0
						: value > 0;
				},

				/**
				 * Creates caption with target element name.
				 * @protected
				 * @return {string} custom caption with element name.
				 */
				getFilterQuestionCaption: function() {
					var caption = this.get("Resources.Strings.FilterModeCaption");
					caption = this.Ext.String.format(caption, this.getTargetElement().getCaption());
					return caption;
				},

				/**
				 * Creates caption with source element name
				 * @protected
				 * @return {string} custom caption with element name
				 */
				getResponseQuestionCaption: function() {
					var caption = this.get("Resources.Strings.ResponseModeCaption");
					var sourceElement = this.getSourceElement();
					caption = this.Ext.String.format(caption, sourceElement && sourceElement.getCaption());
					return caption;
				},

				/**
				 * Returns source element for this sequence flow
				 * @protected
				 * @return {Terrasoft.CampaignSchemaElement} sourse element for transition
				 */
				getSourceElement: function() {
					var flowElement = this.get("ProcessElement");
					if (flowElement) {
						return flowElement.findSourceElement();
					}
					return null;
				},

				/**
				 * Returns target element for this sequence flow.
				 * @protected
				 * @return {Terrasoft.CampaignSchemaElement} target element for transition.
				 */
				getTargetElement: function() {
					var flowElement = this.get("ProcessElement");
					if (flowElement) {
						return flowElement.findTargetElement();
					}
					return null;
				},

				/**
				 * Loads Filter module to display filters.
				 * @protected
				 */
				loadFilterModule: function() {
					var moduleId = this._getFilterEditModuleId();
					var sandbox = this.sandbox;
					sandbox.subscribe("OnFiltersChanged", this.onConditionFiltersChanged, this, [moduleId]);
					sandbox.subscribe("GetFilterModuleConfig",
						this.onGetConditionFilterModuleConfig, this, [moduleId]);
					sandbox.loadModule("FilterEditModule", {renderTo: "ExtendedFiltersContainer", id: moduleId});
				},

				/**
				 * Returns FilterModuleConfig to load filter module.
				 * @protected
				 * @return {object} Filter module config.
				 */
				onGetConditionFilterModuleConfig: function() {
					return {
						rootSchemaName: "Contact",
						rightExpressionMenuAligned: true,
						filters: this.get("FilterData"),
						filterProviderClassName: "Terrasoft.EntitySchemaFilterProvider"
					};
				},

				/**
				 * Listener on filters changed.
				 * Sets value of FilterData attribute.
				 * If filter was not changed compare initial and current filter values to check filter changes.
				 * @param {object} args { filter: object, serializedFilter: string } Filters.
				 * @protected
				 */
				onConditionFiltersChanged: function(args) {
					this.set("FilterData", args.serializedFilter);
					var initialFilter = this.get("InitialFilter");
					if (!this.get("IsFilterChanged")) {
						this.set("IsFilterChanged", args.serializedFilter !== initialFilter);
					}
				},

				/**
				 * Validates DaysNumber value. It must be positive and not empty.
				 * @protected
				 * @param  {Object} value Mapping value.
				 * @return {Object} Validation info object.
				 * Result object must contains properties:
				 *  - isValid - indicates result of validation.
				 *  - invalidMessage - validation message when DaysNumber is not valid.
				 */
				validateDaysNumber: function(value) {
					var validationInfo = {
						isValid: true,
						invalidMessage: ""
					};
					if(!this._isDaysNumberValid(value)) {
						validationInfo.isValid = false;
						validationInfo.invalidMessage = this.get("Resources.Strings.NegativeDaysNumberErrorText");
					}
					return validationInfo;
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("DaysNumber", this.validateDaysNumber);
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "InformationLabel"
				},
				{
					"operation": "insert",
					"name": "SequenceModeLabel",
					"parentName": "SequenceContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.SequenceModeCaption",
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SequenceMode",
					"parentName": "SequenceContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": "$onPrepareSequenceModeList"
						},
						"isRequired": true,
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"name": "DelaySettingsContainer",
					"propertyName": "items",
					"parentName": "SequenceContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"visible": "$_getIsSequenceMode"
					}
				},
				{
					"operation": "insert",
					"name": "DelayDecisionLabel",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.DelayDecisionCaption",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DelayUnit",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"controlConfig": {
							"prepareList": "$onPrepareDelayUnitList"
						},
						"labelConfig": {
							"visible": false
						},
						"isRequired": false
					}
				},
				{
					"operation": "insert",
					"name": "DaysNumberLabel",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.DaysNumberCaption",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DaysNumber",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.INTEGER,
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"isRequired": false
					}
				},
				{
					"operation": "insert",
					"name": "HasExecutionTimeLabel",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.ExecutionTimeCaption",
						"classes": {
							"labelClass": ["label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"name": "HasStartTime",
					"values": {
						"wrapClass": ["t-checkbox-control", "no-wrap"],
						"caption": "$Resources.Strings.HasStartTimeCaption",
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "ExecutionTime",
					"parentName": "DelaySettingsContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["t-combobox-edit", "no-label"],
						"dataValueType": this.Terrasoft.DataValueType.TIME,
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"value": "$ExecutionTime",
						"visible": "$HasStartTime"
					}
				},
				{
					"operation": "insert",
					"name": "FiltersBlockContainer",
					"propertyName": "items",
					"parentName": "ContentContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "FilterModeLabel",
					"parentName": "FiltersBlockContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$getFilterQuestionCaption",
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "FilterMode",
					"parentName": "FiltersBlockContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": "$onPrepareFilterModeList"
						},
						"isRequired": true,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "FiltersBlockContainer",
					"propertyName": "items",
					"name": "FiltersContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "ExtendedFiltersContainer",
					"parentName": "FiltersContainer",
					"propertyName": "items",
					"values": {
						"id": "ExtendedFiltersContainer",
						"selectors": {"wrapEl": "#ExtendedFiltersContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


