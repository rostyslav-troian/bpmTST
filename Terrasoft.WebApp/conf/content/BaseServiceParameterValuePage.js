Terrasoft.configuration.Structures["BaseServiceParameterValuePage"] = {innerHierarchyStack: ["BaseServiceParameterValuePage"]};
define('BaseServiceParameterValuePageStructure', ['BaseServiceParameterValuePageResources'], function(resources) {return {schemaUId:'ab52022b-f8c2-4465-8a4d-7e19196d7f51',schemaCaption: "BaseServiceParameterValuePage", parentSchemaName: "", schemaName:'BaseServiceParameterValuePage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseServiceParameterValuePage", ["ServiceEnums", "ServiceDesignerUtilities", "css!ServiceDesignerStyles"],
	function() {
	return {
		properties: {
			useItemInitialValues: true,
			useViewModelToItemBinding: true
		},
		messages: {
			/**
			 * @message ValueValidationResult
			 * @return {Boolean} Publishes result of view model validation.
			 */
			"IsValid": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}

		},
		attributes: {

			/**
			 * Parameter property value.
			 */
			"Value": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "onValueChanged"
			},

			/**
			 * Parameter value source.
			 */
			"Source": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "onSourceChanged"
			},

			/**
			 * Parameter value sources.
			 */
			"Sources": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Parameter data value type name.
			 */
			"DataValueTypeName": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": Terrasoft.services.enums.DataValueTypeName.Text
			},

			/**
			 * Indicates if value can be changed.
			 */
			"CanEditSchema": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": true
			},

			/**
			 * Sys setting value.
			 */
			"SysSettingValue": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "onSysSettingValueChanged"
			},

			/**
			 * Float value.
			 */
			"FloatValue": {
				"dataValueType": Terrasoft.DataValueType.FLOAT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Integer value.
			 */
			"IntegerValue": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Date value.
			 */
			"DateValue": {
				"dataValueType": Terrasoft.DataValueType.DATE,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Time value.
			 */
			"TimeValue": {
				"dataValueType": Terrasoft.DataValueType.TIME,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Date time value.
			 */
			"DateTimeValue": {
				"dataValueType": Terrasoft.DataValueType.DATE_TIME,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Boolean value.
			 */
			"BooleanValue": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Text value.
			 */
			"TextValue": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			},

			/**
			 * Guid value.
			 */
			"GuidValue": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onSpecifiedValueChange"
			}

		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_initValues: function() {
				this.$Source = Terrasoft.services.enums.ServiceParameterValueSource.CONST;
			},

			/**
			 * @private
			 */
			_getImageConfig: function(){
				return {
					source: this.Terrasoft.ImageSources.URL,
					url: Terrasoft.ServiceDesignerUtilities.getImageUrlByDataValueTypeName(this.$DataValueTypeName)
				};
			},

			/**
			 * @private
			 */
			_getSourceDisplayValue: function(value) {
				var serviceParameterValueSource = Terrasoft.services.enums.ServiceParameterValueSource;
				var displayValue = "";
				switch(value) {
					case serviceParameterValueSource.CONST:
						displayValue = this.get("Resources.Strings.SourceConstCaption");
						break;
					case serviceParameterValueSource.SYS_SETTING:
						displayValue = this.get("Resources.Strings.SourceSysSettingShortCaption");
						break;
					default:
						break;
				}
				return displayValue;
			},

			/**
			 * @private
			 */
			_getValueAttributeToDataValueTypeMap: function() {
				var dataValueTypeNames = Terrasoft.services.enums.DataValueTypeName;
				var result = {};
				result[dataValueTypeNames.Text] = "TextValue";
				result[dataValueTypeNames.Integer] = "IntegerValue";
				result[dataValueTypeNames.Float] = "FloatValue";
				result[dataValueTypeNames.Boolean] = "BooleanValue";
				result[dataValueTypeNames.DateTime] = "DateTimeValue";
				result[dataValueTypeNames.Guid] = "GuidValue";
				result[dataValueTypeNames.Date] = "DateValue";
				result[dataValueTypeNames.Time] = "TimeValue";
				return result;
			},

			/**
			 * @private
			 */
			_onSpecifiedValueChange: function() {
				if (!this.isSysSettingSource()) {
					if (this.validate()) {
						Terrasoft.each(this._getValueAttributeToDataValueTypeMap(), function(valueAttribute,
								dataValueType) {
							var specifiedValue = this.get(valueAttribute);
							var isEmpty = Ext.isEmpty(this.$Value) && Ext.isEmpty(specifiedValue);
							if (this.$DataValueTypeName === dataValueType && !isEmpty &&
									this.$Value !== specifiedValue) {
								this.$Value = specifiedValue;
							}
						}, this);
					} else {
						this.$Value = null;
					}
				}
			},

			/**
			 * @private
			 */
			_updateSpecifiedValues: function(value) {
				Terrasoft.each(this._getValueAttributeToDataValueTypeMap(), function(valueAttribute, dataValueType) {
					if (!this.isSysSettingSource() && !Ext.isEmpty(value) &&
							this.$DataValueTypeName === dataValueType) {
						if (!Ext.isDate(value) && this._isDateGroupDataValueTypeName()) {
							this.set(valueAttribute, new Date(value));
						} else if (this._isBooleanDataValueTypeName()) {
							this.set(valueAttribute, this._getBoolean(value));
						} else {
							this.set(valueAttribute, value);
						}
					} else {
						this.set(valueAttribute, undefined);
					}
				}, this);
			},

			/**
			 * @private
			 */
			_getBoolean: function(value) {
				return Ext.isBoolean(value) ? value : value === "true";
			},

			/**
			 * @private
			 */
			_isDateGroupDataValueTypeName: function() {
				return this.isDateDataValueType() || this.isDateTimeDataValueType() || this.isTimeDataValueType();
			},

			/**
			 * @private
			 */
			_isBooleanDataValueTypeName: function() {
				return this.$DataValueTypeName === "Boolean";
			},

			/**
			 * @private
			 */
			_getLookupPageConfig: function() {
				return {
					entitySchemaName: "VwSysSetting",
					multiSelect: false,
					columns: ["Name", "Code"],
					hideActions: true,
					isColumnSettingsHidden: true,
					filters: this._getSysSettingsFilterGroup(),
					lookupPostfix: "_WebService"
				};
			},

			/**
			 * Returns system settings filter group.
			 * @private
			 * @return {Terrasoft.FilterGroup} System setting filter group.
			 */
			_getSysSettingsFilterGroup: function() {
				var filterGroup = Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				filterGroup.add("DataValueTypeFilter", this.getSysSettingsDataValueTypeFilter());
				return filterGroup;
			},

			/**
			 * @private
			 */
			_getDataValueType: function() {
				var dataValueType = null;
				var dataValueTypeName = Terrasoft.services.enums.DataValueTypeName;
				switch(this.$DataValueTypeName) {
					case dataValueTypeName.Text:
						dataValueType = Terrasoft.DataValueType.TEXT;
						break;
					case dataValueTypeName.Integer:
						dataValueType = Terrasoft.DataValueType.INTEGER;
						break;
					case dataValueTypeName.Float:
						dataValueType = Terrasoft.DataValueType.FLOAT;
						break;
					case dataValueTypeName.Boolean:
						dataValueType = Terrasoft.DataValueType.BOOLEAN;
						break;
					case dataValueTypeName.DateTime:
						dataValueType = Terrasoft.DataValueType.DATE_TIME;
						break;
					case dataValueTypeName.Date:
						dataValueType = Terrasoft.DataValueType.DATE;
						break;
					case dataValueTypeName.Time:
						dataValueType = Terrasoft.DataValueType.TIME;
						break;
					case dataValueTypeName.Guid:
						dataValueType = Terrasoft.DataValueType.GUID;
						break;
					default:
						break;
				}
				return dataValueType;
			},

			/**
			 * @private
			 */
			_initSource: function(source) {
				this.$Source = source || Terrasoft.services.enums.ServiceParameterValueSource.CONST;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Returns system settings data value type filter.
			 * @protected
			 * @return {Terrasoft.FilterGroup} System setting data value type filter.
			 */
			getSysSettingsDataValueTypeFilter: function() {
				var valueTypeGroup;
				var dataValueType = this._getDataValueType();
				if (Terrasoft.isDateDataValueType(dataValueType)) {
					valueTypeGroup = ["DateTime", "Date", "Time"];
				} else if (this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Integer) {
					valueTypeGroup = ["Integer"];
				} else if (this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Text) {
					valueTypeGroup = Terrasoft.getSysSettingsValueTypeGroup(dataValueType).concat(["SecureText"]);
				} else {
					valueTypeGroup = Terrasoft.getSysSettingsValueTypeGroup(dataValueType);
				}
				return Terrasoft.createColumnInFilterWithParameters("ValueTypeName", valueTypeGroup);
			},

			/**
			 * @protected
			 */
			updateMetaItemValue: function() {
				throw new Terrasoft.NotImplementedException({
					message: "updateMetaItemValue is not defined"
				});
			},

			/**
			 * @protected
			 */
			getValueCaption: function() {
				return Ext.String.empty;
			},

			/**
			 * Value change event handler.
			 * @protected
			 */
			onValueChanged: function() {
				this.updateMetaItemValue("Value", "value");
			},

			/**
			 * Source change event handler.
			 * @protected
			 */
			onSourceChanged: function() {
				this.updateMetaItemValue("Source", "source");
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseModel#validate
			 * @override
			 */
			validate: function() {
				var isValid = this.callParent(arguments);
				this.sandbox.publish("IsValid", isValid, [this.sandbox.id]);
				return isValid;
			},

			/**
			 * Returns sources menu item collection.
			 * @returns(Terrasoft.BaseViewModelCollection)
			 */
			getSourcesMenuItems: function() {
				var sources = this.Ext.create("Terrasoft.BaseViewModelCollection");
				sources.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": this.get("Resources.Strings.SourceConstCaption"),
						"Click": "$onSourceConstClick",
						"Tag": Terrasoft.services.enums.ServiceParameterValueSource.CONST,
						"ImageConfig": this._getImageConfig()
					}
				}));
				sources.addItem(this.Ext.create("Terrasoft.BaseViewModel", {
					values: {
						"Caption": this.get("Resources.Strings.SourceSysSettingCaption"),
						"Click": "$onSourceSysSettingClick",
						"Tag": Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING,
						"ImageConfig": this.get("Resources.Images.SourceSysSettingImage")
					}
				}));
				return sources;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Float.
			 * @returns {Boolean}
			 */
			isFloatDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Float;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Integer.
			 * @returns {Boolean}
			 */
			isIntegerDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Integer;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Date.
			 * @returns {Boolean}
			 */
			isDateDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Date;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Time.
			 * @returns {Boolean}
			 */
			isTimeDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Time;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.DateTime.
			 * @returns {Boolean}
			 */
			isDateTimeDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.DateTime;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Boolean.
			 * @returns {Boolean}
			 */
			isBooleanDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Boolean;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Text.
			 * @returns {Boolean}
			 */
			isTextDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Text;
			},

			/**
			 * Indicates if current data value type is Terrasoft.services.enums.DataValueTypeName.Text.
			 * @returns {Boolean}
			 */
			isGuidDataValueType: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.CONST &&
					this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Guid;
			},

			/**
			 * Indicates if current source is Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING.
			 * @returns {Boolean}
			 */
			isSysSettingSource: function() {
				return this.$Source === Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initValues();
			},

			/**
			 * Handles source const menu item click.
			 */
			onSourceConstClick: function() {
				if (!Ext.isEmpty(this.$Value)) {
					this.$Value = null;
				}
				this.$SysSettingValue = null;
				this.$Source = Terrasoft.services.enums.ServiceParameterValueSource.CONST;
			},

			/**
			 * Handles source sys setting menu item click.
			 */
			onSourceSysSettingClick: function() {
				if (!Ext.isEmpty(this.$Value)) {
					this.$Value = null;
				}
				this.$Source = Terrasoft.services.enums.ServiceParameterValueSource.SYS_SETTING;
				this.openSysSettingsLookup();
			},

			/**
			 * Opens system settings lookup.
			 */
			openSysSettingsLookup: function() {
				this.openLookup(this._getLookupPageConfig(), this.onSysSettingSelected, this);
			},

			/**
			 * Handles sys setting item selected.
			 */
			onSysSettingSelected: function(sysSettings) {
				if(!sysSettings.selectedRows.isEmpty()) {
					var sysSetting = sysSettings.selectedRows.first();
					this.$SysSettingValue = sysSetting.Name;
					this.$Value = sysSetting.Code;
				}
			},

			/**
			 * Return source display value.
			 * @returns {String}
			 */
			getSourceCaption: function() {
				return this._getSourceDisplayValue(this.$Source);
			},

			/**
			 * Handles system setting value clear icon click.
			 */
			onClearSysSettingClick: function() {
				this.$Value = null;
			},

			/**
			 * Handles system setting value changed.
			 */
			onSysSettingValueChanged: function(model, value) {
				if (value === "") {
					this.onClearSysSettingClick();
				}
			}

			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"name": "InputContainer",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["service-parameter-value-source"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "LabelContainer",
				"parentName": "InputContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["label-wrap", "service-parameter-value-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LabelContainer",
				"name": "ValueCaption",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "getValueCaption"},
					"id": "ValueCaption",
					"markerValue": "ValueCaption"
				}
			},
			{
				"operation": "insert",
				"name": "Source",
				"parentName": "InputContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"classes": {"wrapperClass": ["t-btn-no-text-padding", "t-btn-style-transparent"]},
					"controlConfig": {
						"enabled": "$CanEditSchema"
					},
					"caption": {
						"bindTo": "Source",
						"bindConfig": { "converter": "getSourceCaption" }
					},
					"menu": {
						"items": {"bindTo": "getSourcesMenuItems"},
						"ulClass": "menu-item-image-size-16"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Values",
				"parentName": "InputContainer",
				"propertyName": "items",
				"values": {
					"wrapClass": ["service-parameter-value-values"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "SysSettingValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "SysSettingValue",
					"visible": "$isSysSettingSource",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"rightIconClick": "$openSysSettingsLookup",
					"cleariconclick": "$onClearSysSettingClick",
					"controlConfig": {
						"enableRightIcon": true,
						"rightIconClasses": ["lookup-edit-right-icon"],
						"hasClearIcon": true,
						"markerValue": "SysSettingValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "FloatValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "FloatValue",
					"visible": "$isFloatDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "FloatValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "IntegerValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "IntegerValue",
					"visible": "$isIntegerDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "IntegerValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "DateValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "DateValue",
					"visible": "$isDateDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "DateValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "TimeValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "TimeValue",
					"visible": "$isTimeDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "TimeValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "DateTimeValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "DateTimeValue",
					"visible": "$isDateTimeDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "DateTimeValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "BooleanValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "BooleanValue",
					"visible": "$isBooleanDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "BooleanValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "TextValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "TextValue",
					"visible": "$isTextDataValueType",
					"enabled": "$CanEditSchema",
					"labelConfig": {"visible": false},
					"controlConfig": {
						"markerValue": "TextValue"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Values",
				"propertyName": "items",
				"name": "GuidValue",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"bindTo": "GuidValue",
					"visible": "$isGuidDataValueType",
					"labelConfig": {"visible": false},
					"enabled": "$CanEditSchema",
					"controlConfig": {
						"markerValue": "GuidValue"
					}
				}
			}
		]
	};
});


