Terrasoft.configuration.Structures["CampaignSchemaPropertiesPage"] = {innerHierarchyStack: ["CampaignSchemaPropertiesPage"], structureParent: "BaseCampaignSchemaElementPage"};
define('CampaignSchemaPropertiesPageStructure', ['CampaignSchemaPropertiesPageResources'], function(resources) {return {schemaUId:'d30c775b-153d-4e0b-ad5f-7debd500a51c',schemaCaption: "CampaignSchemaPropertiesPage", parentSchemaName: "BaseCampaignSchemaElementPage", schemaName:'CampaignSchemaPropertiesPage',parentSchemaUId:'13b73e23-fb4d-41fb-850b-0f4ae4c3e9f1',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page schema for campaign schema properties.
 * Parent: BaseCampaignSchemaElementPage => CampaignSchemaPropertiesPage
 */
define("CampaignSchemaPropertiesPage", ["CampaignSchemaPropertiesPageResources",
		"MarketingEnums", "SysAdminUnit", "DropdownLookupMixin"],
	function(resources, MarketingEnums, SysAdminUnit) {
		return {
			messages: {
				"SchemaPropertiesChanged": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				},
				"SetDefaultValuesApproved": {
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
					"mode": Terrasoft.MessageMode.PTP
				}
			},
			mixins: {
				dropdownLookupMixin: "Terrasoft.DropdownLookupMixin",
				campaignElementMixin: "Terrasoft.CampaignElementMixin"
			},
			attributes: {
				/**
				 * Campaign fire period selected for campaign.
				 */
				"DefaultCampaignFirePeriod": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP
				},

				/**
				 * Campaign fire period value in minutes.
				 */
				"DefaultCampaignFirePeriodValue": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * #ampaign fire period collection.
				 * @private
				 * @type {Terrasoft.Collection}
				 */
				"CampaignFirePeriodList": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Flag to indicate that critical execution lateness is specified or not.
				 */
				"HasCriticalExecutionLateness": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Critical execution lateness interval in minutes.
				 */
				"CriticalExecutionLatenessForUnit": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Values of lookup for LatenessUnit.
				 */
				"LatenessUnitEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Days: {
							value: "0",
							captionName: "Resources.Strings.LatenessDecisionDaysNumber"
						},
						Hours: {
							value: "1",
							captionName: "Resources.Strings.LatenessDecisionHoursNumber"
						}
					}
				},

				/**
				 * Lateness unit for ui combobox.
				 */
				"LatenessUnit": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true,
					"defaultValue": 1
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
				 * */
				"TimeZone": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP
				},

				/**
				 * Code of selected time zone.
				 * @private
				 * @type {String}
				 * */
				"TimeZoneCode": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": null
				}
			},
			methods: {

				// #region Methods: Private

				/**
				 * Initializes selected time zone for campaign.
				 * If no selected time zone initializes default user time zone.
				 * @private
				 * @param {Terrasoft.CampaignSchema} campaignSchema Current campaign schema.
				 */
				_initTimeZone: function(campaignSchema) {
					this.$TimeZoneCode = campaignSchema.timeZoneCode;
					this.$TimeZone = {
						value: this.$TimeZoneCode,
						displayValue: this.$TimeZoneCode,
						code: this.$TimeZoneCode
					};
					this._initTimeZoneList();
				},

				/**
				 * Inits time zone list and sets selected time zone by code.
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
				 * Time zone validator.
				 * @private
				 * @param {Object} timeZoneCode Time zone Lookup object.
				 * @return {Object} Validation info.
				 */
				_timeZoneValidator: function(timeZoneCode) {
					var columnName = "TimeZone";
					if (Ext.isEmpty(timeZoneCode) || !timeZoneCode.value) {
						var message = resources.localizableStrings.DefaultTimeZoneBeforeSavingMessage;
						return this._getWarningValidationResult(columnName, message);
					}
					return this._getValidResult(columnName);
				},

				/**
				 * Default campaign fire period validator.
				 * @private
				 * @param {Object} defaultFirePeriod Time zone Lookup object.
				 * @return {Object} Validation info.
				 */
				_defaultFirePeriodValidator: function(defaultFirePeriod) {
					var columnName = "DefaultCampaignFirePeriod";
					if (Ext.isEmpty(defaultFirePeriod) || !defaultFirePeriod.value) {
						var message = resources.localizableStrings.DefaultFirePeriodBeforeSavingMessage;
						return this._getWarningValidationResult(columnName, message);
					}
					return this._getValidResult(columnName);
				},

				/**
				 * Returns column validation result with warning type.
				 * @private
				 * @param {String} columnName Name of column to validate.
				 * @param {String} message Warning validation message.
				 * @return {Object} Validation info.
				 */
				_getWarningValidationResult: function(columnName, message) {
					return {
						invalidMessage: Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage,
						validationType: Terrasoft.ValidationType.WARNING,
						fullInvalidMessage: message,
						propertyName: Ext.String.format("CampaignSchema_{0}", columnName),
						isCustomMessage: true
					};
				},

				/**
				 * Returns column validation success result.
				 * @private
				 * @param {String} columnName Name of column to validate.
				 * @return {Object} Validation info.
				 */
				_getValidResult: function(columnName) {
					return {
						invalidMessage: "",
						propertyName: Ext.String.format("CampaignSchema_{0}", columnName)
					};
				},

				/**
				 * Saves selected time zone code.
				 * @private
				 * @param {Terrasoft.CampaignSchema} schema Current campaign schema.
				 */
				_saveTimeZoneCode: function(schema) {
					var newTimeZoneCode = this.$TimeZone && this.$TimeZone.code;
					schema.setPropertyValue("timeZoneCode", newTimeZoneCode);
					this.$TimeZoneCode = newTimeZoneCode;
				},

				/**
				 * Sets default time zone when saving empty time zone code.
				 * @private
				 */
				_setDefaultTimeZone: function() {
					if (!this.$TimeZoneCode) {
						this.$TimeZoneCode = "UTC";
						Terrasoft.each(this.$TimeZoneEnum, function(item) {
							if (item.code === this.$TimeZoneCode) {
								this.$TimeZone = item;
								return false;
							}
						}, this);
					}
				},

				/**
				 * Sets default campaign fire period when saving empty fire period value.
				 * @private
				 */
				_setDefaultCampaignFirePeriod: function() {
					if (!this.$DefaultCampaignFirePeriodValue) {
						this.$DefaultCampaignFirePeriodValue =
							MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value;
						Terrasoft.each(this.$CampaignFirePeriodList, function(item) {
							if (item.periodInMinutes === this.$DefaultCampaignFirePeriodValue) {
								this.$DefaultCampaignFirePeriod = item;
								return false;
							}
						}, this);
					}
				},

				/**
				 * Sets default value for campaign lateness page attributes.
				 * @private
				 */
				_setDefaultLateness: function() {
					var criticalLateness = this.$ProcessElement.criticalExecutionLateness
						|| this.$DefaultCampaignFirePeriodValue
						|| MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value;
					this._setLatenessAttributes(criticalLateness);
				},

				/**
				 * Returns ESQ for load campaign fire periods from lookup.
				 * @private
				 * @return {Terrasoft.EntitySchemaQuery} Instance of the entity schema query.
				 */
				_createFirePeriodQuery: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "CampaignFirePeriod"
					});
					esq.addColumn("Id");
					esq.addColumn("Value");
					esq.addColumn("Name");
					esq.serverESQCacheParameters = {
						cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
						cacheGroup: "CampaignDesigner",
						cacheItemName: "CampaignFirePeriodList"
					};
					return esq;
				},

				/**
				 * Loads default campaign fire periods from lookup.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback execution context.
				 */
				_loadFirePeriodList: function(callback, scope) {
					var esq = this._createFirePeriodQuery();
					this.loadEntityCollection(esq, callback, scope);
				},

				/**
				 * Initializes DefaultCampaignFirePeriodValue attribute from campaign schema.
				 * @private
				 * @param {Terrasoft.Designers.CampaignSchema} campaignSchema Campaign schema.
				 */
				_initDefaultCampaignFirePeriod: function(campaignSchema) {
					this.$DefaultCampaignFirePeriodValue = campaignSchema.defaultCampaignFirePeriod;
					this.$DefaultCampaignFirePeriod = {
						value: this.$DefaultCampaignFirePeriodValue,
						displayValue: this.$DefaultCampaignFirePeriodValue,
						periodInMinutes: this.$DefaultCampaignFirePeriodValue
					};
					this._initFirePeriodList();
				},

				/**
				 * Initializes list of campaign fire periods.
				 * @private
				 */
				_initFirePeriodList: function() {
					this._loadFirePeriodList(function(collection) {
						var list = Ext.create("Terrasoft.Collection");
						collection.each(function(item) {
							var listItem = {
								value: item.get("Id"),
								displayValue: item.get("Name"),
								periodInMinutes: item.get("Value")
							};
							list.add(listItem.value, listItem);
							if (listItem.periodInMinutes === this.$DefaultCampaignFirePeriodValue) {
								this.$DefaultCampaignFirePeriod = listItem;
							}
						}, this);
						list.sort("periodInMinutes");
						this.$CampaignFirePeriodList = list;
					}, this);
				},

				/**
				 * Initializes attributes for CriticalExecutionLateness from campaign schema.
				 * @private
				 * @param {Terrasoft.Designers.CampaignSchema} campaignSchema Campaign schema.
				 */
				_initCriticalExecutionLateness: function(campaignSchema) {
					this.$HasCriticalExecutionLateness = campaignSchema.hasCriticalExecutionLateness;
					if (!campaignSchema.hasCriticalExecutionLateness) {
						campaignSchema.criticalExecutionLateness = this.$DefaultCampaignFirePeriodValue
							|| MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value;
					}
					this._setLatenessAttributes(campaignSchema.criticalExecutionLateness);
				},

				/**
				 * Sets values for campaign lateness attributes
				 * based on critical execution lateness property of campaign schema.
				 * @private
				 * @param {Number} criticalExecutionLateness Execution lateness in minutes.
				 */
				_setLatenessAttributes: function(criticalExecutionLateness) {
					var latenessObject =
						this._convertLatenessToUnitValue(criticalExecutionLateness);
					var latenessUnit = this.getLookupValueForInit("LatenessUnitEnum",
						latenessObject.unit.value, this);
					this.$LatenessUnit = latenessUnit;
					this.$CriticalExecutionLatenessForUnit = latenessObject.value;
				},

				/**
				 * Returns converted execution lateness value for selected unit.
				 * @param {Number} latenessInMinutes Campaign execution lateness in minutes.
				 * @private
				 * @return {Object} Lateness converted model.
				 * Result object must contains properties:
				 *  - unit - time unit enum value.
				 *  - value - critical lateness based on selected time unit.
				 */
				_convertLatenessToUnitValue: function(latenessInMinutes) {
					var remainderForDays = latenessInMinutes % (60 * 24);
					if (remainderForDays === 0) {
						return {
							unit: this.$LatenessUnitEnum.Days,
							value: latenessInMinutes / (60 * 24)
						};
					} else {
						var hours = Math.ceil(latenessInMinutes / 60);
						return {
							unit: this.$LatenessUnitEnum.Hours,
							value: hours > 0 ? hours : 1
						};
					}
				},

				/**
				 * Returns campaign execution lateness in minutes based on selected time unit.
				 * @private
				 * @return {Number} Lateness in minutes
				 */
				_getLatenessInMinutes: function() {
					var lateness;
					var defaultValue = this.$DefaultCampaignFirePeriodValue
						|| MarketingEnums.CampaignFirePeriod.ONE_HOUR.Value;
					if (!this.$LatenessUnit) {
						return defaultValue;
					}
					switch (this.$LatenessUnit.value) {
						case this.$LatenessUnitEnum.Days.value:
							lateness = this.$CriticalExecutionLatenessForUnit * 24 * 60;
							break;
						case this.$LatenessUnitEnum.Hours.value:
							lateness = this.$CriticalExecutionLatenessForUnit * 60;
							break;
						default:
							lateness = this.$DefaultCampaignFirePeriodValue;
					}
					return lateness > 0 && this.$HasCriticalExecutionLateness
						? lateness
						: defaultValue;
				},

				/**
				 * Saves to schema values of the default fire period.
				 * @private
				 * @param {Terrasoft.Designers.CampaignSchema} campaignSchema Campaign schema.
				 */
				_saveDefaultCampaignFirePeriod: function(campaignSchema) {
					var newFirePeriodInMinutes =
						this.$DefaultCampaignFirePeriod && this.$DefaultCampaignFirePeriod.periodInMinutes;
					campaignSchema.defaultCampaignFirePeriod = newFirePeriodInMinutes;
					this.$DefaultCampaignFirePeriodValue = newFirePeriodInMinutes;
				},

				/**
				 * Indicates when schema name is required property.
				 * When schema is new, schema name can be empty.
				 * When existing schema is used, schema name property is required.
				 * @private
				 * @return {Boolean}
				 */
				_getIsNameRequired: function() {
					return !this.getIsNewSchema();
				},

				/**
				 * Validates CriticalExecutionLatenessForUnit value. It must be positive and not empty.
				 * @private
				 * @param  {Object} value Mapping value.
				 * @return {Object} Validation info object.
				 * Result object must contains properties:
				 *  - isValid - indicates result of validation.
				 *  - invalidMessage - validation message when CriticalExecutionLatenessForUnit is not valid.
				 */
				_validateCriticalExecutionLatenessForUnit: function(value) {
					var validationInfo = {
						isValid: true,
						invalidMessage: ""
					};
					if (!this._isCriticalLatenessForUnitValid(value)) {
						validationInfo.isValid = false;
						validationInfo.invalidMessage =
							this.get("Resources.Strings.NegativeCriticalExecutionLatenessErrorText");
					}
					return validationInfo;
				},

				/**
				 * Validates DaysNumber by value.
				 * @private
				 * @param {number} value DaysNumber value for validate.
				 * @returns {Boolean} Validation result.
				 * Returns true when DaysNumber is valid, and false in otherwise.
				 */
				_isCriticalLatenessForUnitValid: function(value) {
					if (!this.$HasCriticalExecutionLateness) {
						return true;
					}
					return !this.Ext.isEmpty(value) && value > 0;
				},

				// #endregion

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#getContextHelpCode
				 * @overridden
				 */
				getContextHelpCode: function() {
					return "CampaignDesigner";
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#duplicateNameValidator
				 * @overridden
				 */
				duplicateNameValidator: function() {
					return {invalidMessage: ""};
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#nameValidator
				 * @override
				 */
				nameValidator: function(code) {
					var isNew = this.getIsNewSchema();
					if (isNew && !code) {
						return {invalidMessage: ""};
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseProcessSchemaElementPropertiesPage#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(campaignSchema, callback, scope) {
					this.subscribeOnDiagramOrSchemaChanged();
					this.set("PropertiesPageCaption", campaignSchema.propertiesPageCaption);
					this.callParent([
						campaignSchema, function() {
							this._initDefaultCampaignFirePeriod(campaignSchema);
							this._initCriticalExecutionLateness(campaignSchema);
							this._initTimeZone(campaignSchema);
							callback.call(scope);
						}, this
					]);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#onPageCaptionChanged.
				 * @overridden
				 */
				onElementCaptionChanged: function(model, caption) {
					this.sandbox.publish("PropertiesPageCaptionChanged", caption);
				},

				/**
				 * Applies schema properties' changes on current property page.
				 * @param {Object} changeObject object with changes to apply.
				 * @protected
				 */
				onSchemaPropertiesChanged: function(changeObject) {
					Terrasoft.each(changeObject, function(value, name) {
						this.set(name, value);
					}, this);
				},

				/**
				 * Handler for approve set default values event before saving schema.
				 * @protected
				 */
				onSetDefaultValuesApproved: function() {
					this._setDefaultTimeZone();
					this._setDefaultCampaignFirePeriod();
					this._setDefaultLateness();
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
				 * @overridden
				 */
				saveValues: function() {
					this.callParent(arguments);
					var campaignSchema = this.get("ProcessElement");
					this._saveDefaultCampaignFirePeriod(campaignSchema);
					this._saveTimeZoneCode(campaignSchema);
					campaignSchema.criticalExecutionLateness = this._getLatenessInMinutes();
					campaignSchema.hasCriticalExecutionLateness = this.$HasCriticalExecutionLateness;
				},

				/**
				 * Subscribes on diagram caption change event.
				 * @protected
				 */
				subscribeOnDiagramOrSchemaChanged: function() {
					this.sandbox.subscribe("DiagramPageCaptionChanged", this.changeCaption, this);
					this.sandbox.subscribe("SchemaPropertiesChanged", this.onSchemaPropertiesChanged, this);
					this.sandbox.subscribe("SetDefaultValuesApproved", this.onSetDefaultValuesApproved, this);
				},

				/**
				 * Changes schema properties page caption.
				 * @param schemaCaption New schema caption value.
				 * @protected
				 */
				changeCaption: function(schemaCaption) {
					this.set("caption", schemaCaption);
				},

				/**
				 * Returns if campaign schema is new or not.
				 * @protected
				 * @return {Boolean}
				*/
				getIsNewSchema: function() {
					var managerItem = this.sandbox.publish("GetSchemaManagerItem");
					var isNew = managerItem && managerItem.isNew();
					return Boolean(isNew);
				},

				/**
				 * Loads values into delay unit combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareLatenessUnitList: function(filter, list) {
					this.prepareList("LatenessUnitEnum", list, this);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("CriticalExecutionLatenessForUnit",
						this._validateCriticalExecutionLatenessForUnit);
					this.addColumnValidator("TimeZone", this._timeZoneValidator);
					this.addColumnValidator("DefaultCampaignFirePeriod",
						this._defaultFirePeriodValidator);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#saveValidationResults
				 * @override
				 */
				saveValidationResults: function() {
					var result = this.callParent(arguments);
					var campaignSchema = this.get("ProcessElement");
					var latenessForUnit = this.$CriticalExecutionLatenessForUnit;
					var isSchemaValid = result && this._isCriticalLatenessForUnitValid(latenessForUnit);
					campaignSchema.setPropertyValue("isValid", isSchemaValid);
				},

				/**
				 * Event handler for prepare list event of time zone lookup.
				 * @protected
				 * @param {String} filter Text for filter.
				 * @param {Terrasoft.Collection} list Current collection to bind.
				 */
				onPrepareTimeZoneList: function(filter, list) {
					if (list) {
						list.reloadAll(this.$TimeZoneEnum);
					}
				},

				/**
				 * Event handler for prepare list event of default campaign fire period lookup.
				 * @protected
				 * @param {String} filter Text for filter.
				 * @param {Terrasoft.Collection} list Current collection to bind.
				 */
				onPrepareDefaultFirePeriodList: function(filter, list) {
					var sourceList = this.$CampaignFirePeriodList.clone();
					list.reloadAll(sourceList);
				}
			},

			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"parentName": "TopContainer",
					"propertyName": "items",
					"name": "ElementTypeLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "PropertiesPageCaption"
						},
						"classes": {
							"labelClass": ["t-label"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ContentContainer",
					"propertyName": "items",
					"parentName": "EditorsContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},

				// #region Block: DefaultCampaignFirePeriod
				{
					"operation": "insert",
					"name": "DefaultCampaignFirePeriodLabel",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.DefaultCampaignFireTimeCaption"
						},
						"classes": {
							"labelClass": ["t-label label-small"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DefaultCampaignFirePeriod",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"isRequired": true,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"],
						"visible": true,
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareDefaultFirePeriodList"}
						}
					}
				},
				// endregion

				// #region Block: TimeZone
				{
					"operation": "insert",
					"name": "TimeZoneContainer",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						}
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
							"labelClass": ["t-label label-small"]
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
							"prepareList": {"bindTo": "onPrepareTimeZoneList"},
							"classes": ["combo-box-edit-wrap"]
						},
						"markerValue": "time-zone-value"
					}
				},
				// #endregion

				// #region Block: Lateness
				{
					"operation": "insert",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"name": "HasCriticalExecutionLateness",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.HasCriticalExecutionLateness"
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 22
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"name": "CriticalExecutionLatenessHint",
					"values": {
						"layout": {"column": 22, "row": 3, "colSpan": 1},
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.CriticalExecutionLatenessHint"},
						"controlConfig": {
							"classes": {
								"wrapperClass": "t-checkbox-information-button"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "LatenessUnitCaption",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.LatenessUnitCaption"
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"visible": {
							"bindTo": "HasCriticalExecutionLateness"
						}
					}
				},
				{
					"operation": "insert",
					"name": "LatenessUnit",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						},
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareLatenessUnitList"
							}
						},
						"labelConfig": {
							"visible": false
						},
						"isRequired": false,
						"visible": {
							"bindTo": "HasCriticalExecutionLateness"
						}
					}
				},
				{
					"operation": "insert",
					"name": "LatenessUnitQuantity",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.LatenessUnitQuantity"
						},
						"classes": {
							"labelClass": ["label-small"]
						},
						"visible": {
							"bindTo": "HasCriticalExecutionLateness"
						}
					}
				},
				{
					"operation": "insert",
					"name": "CriticalExecutionLatenessForUnit",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": this.Terrasoft.DataValueType.INTEGER,
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"isRequired": false,
						"visible": {
							"bindTo": "HasCriticalExecutionLateness"
						}
					}
				},
				{
					"operation": "merge",
					"name": "name",
					"values": {
						"isRequired": { "bindTo": "_getIsNameRequired" }
					}
				}
				// #endregion
			]/**SCHEMA_DIFF*/
		};
	}
);


