Terrasoft.configuration.Structures["SysSettingPage"] = {innerHierarchyStack: ["SysSettingPage"], structureParent: "BasePageV2"};
define('SysSettingPageStructure', ['SysSettingPageResources'], function(resources) {return {schemaUId:'ac5ba463-9cfa-4558-8b62-93e12710c840',schemaCaption: "Card page - System setting", parentSchemaName: "BasePageV2", schemaName:'SysSettingPage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysSettingPage", [
	"BusinessRuleModule",
	"SysSettingPageResources",
	"RightUtilities",
	"FileDownloader",
	"SystemOperationsPermissionsMixin",
	"css!SysSettingPageCSS"
], function(BusinessRuleModule, resources, RightUtilities) {
	return {
		entitySchemaName: "VwSysSetting",
		messages: {
			/**
			 * @message ResultSelectedRows
			 * Returns selected in lookup rows.
			 */
			"ResultSelectedRows": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		mixins: {
			SystemOperationsPermissionsMixin: "Terrasoft.SystemOperationsPermissionsMixin"
		},
		attributes: {
			"IsEditMode": {
				name: "IsEditMode",
				value: false,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"ReferenceSchema": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				caption: resources.localizableStrings.ReferenceSchemaCaption
			},
			"Type": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				caption: resources.localizableStrings.TypeCaption
			},
			"TextValue": {
				name: "TextValue",
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"SecureValue": {
				name: "SecureValue",
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"IntegerValue": {
				name: "IntegerValue",
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"FloatValue": {
				name: "FloatValue",
				dataValueType: Terrasoft.DataValueType.FLOAT,
				precision: 2,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"BooleanValue": {
				name: "BooleanValue",
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"TimeValue": {
				name: "TimeValue",
				dataValueType: Terrasoft.DataValueType.TIME,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"DateValue": {
				name: "DateValue",
				dataValueType: Terrasoft.DataValueType.DATE,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"DateTimeValue": {
				name: "DateTimeValue",
				dataValueType: Terrasoft.DataValueType.DATE_TIME,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"LookupValue": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"BinaryValue": {
				dataValueType: Terrasoft.DataValueType.BLOB,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * The name of the operation which the user must have access to open the page.
			 */
			"SecurityOperationName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: Terrasoft.Features.getIsEnabled("UseCanManageAdministrationForSysSettings")
						? "CanManageAdministration"
						: "CanManageSysSettings"
			},
			"ReadRightsOperation": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"ReadSysAdminOperation": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysAdminOperation",
				lookupListConfig: {
					columns: ["Code"]
				}
			},
			"ReadWriteRightsOperation": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"ReadWriteSysAdminOperation": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysAdminOperation",
				lookupListConfig: {
					columns: ["Code"]
				}
			},
			"ReadRightsOperationBackup": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"ReadSysAdminOperationBackup": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysAdminOperation",
				lookupListConfig: {
					columns: ["Code"]
				}
			},
			"ReadWriteRightsOperationBackup": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"ReadWriteSysAdminOperationBackup": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				isLookup: true,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysAdminOperation",
				lookupListConfig: {
					columns: ["Code"]
				}
			},
			"ReadWriteAccessMessageLink": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		rules: {
			"ReadSysAdminOperation": {
				"ReadSysAdminOperationRequiredIfAllowByOperation": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "ReadRightsOperation"
							},
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION
							}
						}
					]
				}
			},
			"ReadWriteSysAdminOperation": {
				"ReadWriteSysAdminOperationRequiredIfAllowByOperation": {
					"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
					"property": BusinessRuleModule.enums.Property.REQUIRED,
					"conditions": [
						{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "ReadWriteRightsOperation"
							},
							"comparisonType": Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION
							}
						}
					]
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {

			//region Methods: Private

			/**
			 * Checks whether system settings rights where changed.
			 * @private
			 * @return {Boolean} Whether system settings rights where changed.
			 */
			_isSysSettingsRightsChanged: function() {
				const readRightsOperationChanged = this.$ReadRightsOperationBackup !== this.$ReadRightsOperation;
				const readWriteRightsOperationChanged =
					this.$ReadWriteRightsOperationBackup !== this.$ReadWriteRightsOperation;
				const readSysAdminOperationBackupCode =
					this.$ReadSysAdminOperationBackup && this.$ReadSysAdminOperationBackup.Code;
				const readSysAdminOperationCode =
					this.$ReadSysAdminOperation && this.$ReadSysAdminOperation.Code;
				const readSysAdminOperationChanged =
					readSysAdminOperationBackupCode !== readSysAdminOperationCode;
				const readWriteSysAdminOperationBackupCode =
					this.$ReadWriteSysAdminOperationBackup && this.$ReadWriteSysAdminOperationBackup.Code;
				const readWriteSysAdminOperationCode =
					this.$ReadWriteSysAdminOperation && this.$ReadWriteSysAdminOperation.Code;
				const readWriteSysAdminOperationChanged =
					readWriteSysAdminOperationBackupCode !== readWriteSysAdminOperationCode;
				return readRightsOperationChanged || readWriteRightsOperationChanged ||
					readSysAdminOperationChanged || readWriteSysAdminOperationChanged;
			},

			/**
			 * Saves initial values of rights operations.
			 * @private
			 */
			_saveRightsOperationInitialValues: function() {
				this.$ReadRightsOperationBackup = Terrasoft.deepClone(this.$ReadRightsOperation);
				this.$ReadWriteRightsOperationBackup = Terrasoft.deepClone(this.$ReadWriteRightsOperation);
				this.$ReadSysAdminOperationBackup = Terrasoft.deepClone(this.$ReadSysAdminOperation);
				this.$ReadWriteSysAdminOperationBackup = Terrasoft.deepClone(this.$ReadWriteSysAdminOperation);
			},

			/**
			 * Loads initial values of rights operations.
			 * @private
			 */
			_restoreRightsOperationInitialValues: function() {
				this.$ReadRightsOperation = Terrasoft.deepClone(this.$ReadRightsOperationBackup);
				this.$ReadWriteRightsOperation = Terrasoft.deepClone(this.$ReadWriteRightsOperationBackup);
				this.$ReadSysAdminOperation = Terrasoft.deepClone(this.$ReadSysAdminOperationBackup);
				this.$ReadWriteSysAdminOperation = Terrasoft.deepClone(this.$ReadWriteSysAdminOperationBackup);
			},

			/**
			 * Create save request based on passed class name - either update or insert.
			 * @private
			 * @return {Terrasoft.SysSettingSaveRequest} Create request.
			 */
			_getSaveRequest: function() {
				const saveRequestClassName = this.isNew
					? "Terrasoft.InsertSysSettingRequest"
					: "Terrasoft.UpdateSysSettingRequest";
				const saveRequest = Ext.create(saveRequestClassName, {
					id: this.get(this.primaryColumnName)
				});
				Terrasoft.each(saveRequest.propertyColumnName, function(columnName, propertyName) {
					saveRequest[propertyName] = this.get(columnName);
				}, this);
				return saveRequest;
			},

			/**
			 * @private
			 */
			_onReferenceSchemaUIdChange: function() {
				const lookupValueColumn = this.getColumnByName("LookupValue");
				const referenceSchemaUId = this.$ReferenceSchemaUId;
				const item = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
				lookupValueColumn.referenceSchemaName = item ? item.name : null;
			},

			/**
			 * Returns query for getting sys admin operation properties.
			 * @param {String[]} operationNames Names of operations to get properties of.
			 * @return {Terrasoft.EntitySchemaQuery} Query to get sys admin operations.
			 * @private
			 */
			_getSysAdminOperationPropertiesQuery: function(operationNames) {
				const query = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysAdminOperation"
				});
				query.addColumn("Id");
				query.addColumn("Name");
				query.addColumn("Code");
				const codeFilter = Terrasoft.createColumnInFilterWithParameters(
					"Code", operationNames, Terrasoft.DataValueType.TEXT);
				query.filters.addItem(codeFilter);
				return query;
			},

			/**
			 * Save system setting.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			_saveSysSetting: function(callback, scope) {
				const saveRequest = this._getSaveRequest();
				saveRequest.execute(callback, scope);
			},

			/**
			 * Saves system setting rights.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			_saveRights: function(callback, scope) {
				const isRightsChanged = this._isSysSettingsRightsChanged();
				if (!this.isUseSysSettingsRights() || !isRightsChanged) {
					callback.call(scope);
					return;
				}
				let readOperationCode;
				let readWriteOperationCode;
				if (this.$ReadRightsOperation === Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION) {
					readOperationCode = this.$ReadSysAdminOperation && this.$ReadSysAdminOperation.Code;
				} else if (this.$ReadRightsOperation === Terrasoft.SysSettingsRightsOperationType.RESTRICT_ALL) {
					readOperationCode = "CanManageSysSettings";
				} else {
					readOperationCode = null;
				}
				if (this.$ReadWriteRightsOperation === Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION) {
					readWriteOperationCode = this.$ReadWriteSysAdminOperation && this.$ReadWriteSysAdminOperation.Code;
				} else if (this.$ReadWriteRightsOperation === Terrasoft.SysSettingsRightsOperationType.RESTRICT_ALL) {
					readWriteOperationCode = "CanManageSysSettings";
				} else {
					readWriteOperationCode = null;
				}
				Terrasoft.SysSettings.setSysSettingsRightsAsync({
					sysSettingsCode: this.$Code,
					readOperationCode: readOperationCode,
					readWriteOperationCode: readWriteOperationCode
				}).then(function() {
					callback.call(scope);
				});
			},

			/**
			 * Sets value of sys admin operation for use in system settings rights.
			 * @param {String} operationRightsAttributeName Name of the rights operation.
			 * @param {String} operationAttributeName Name of the sys admin operation.
			 * @param {Object} operationValue Value of the operation to set.
			 * @private
			 */
			_setRightsSysAdminOperation: function(operationRightsAttributeName, operationAttributeName, operationValue) {
				if (operationValue) {
					if (operationValue.$Code === "CanManageSysSettings") {
						this.set(operationRightsAttributeName, Terrasoft.SysSettingsRightsOperationType.RESTRICT_ALL);
						this.set(operationAttributeName, null);
					} else {
						this.set(operationRightsAttributeName,
							Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION);
						this.set(operationAttributeName, {
							value: operationValue.$Id,
							displayValue: operationValue.$Name,
							Code: operationValue.$Code
						});
					}
				} else {
					this.set(operationRightsAttributeName, Terrasoft.SysSettingsRightsOperationType.ALLOW_ALL);
					this.set(operationAttributeName, null);
				}
			},

			/**
			 * Fills system setting rights values on page load.
			 * @param {String} readOperationCode Read operation code.
			 * @param {String} readWriteOperationCode ReadWrite operation code.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			_setSysAdminOperations: function(readOperationCode, readWriteOperationCode, callback, scope) {
				const operationNames = [];
				if (readOperationCode) {
					operationNames.push(readOperationCode);
				}
				if (readWriteOperationCode) {
					operationNames.push(readWriteOperationCode);
				}
				const operationsQuery = this._getSysAdminOperationPropertiesQuery(operationNames);
				operationsQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						const responseCollection = response.collection.getItems();
						const readOperation = responseCollection.find(function(item) {
							return item.$Code === readOperationCode;
						});
						const readWriteOperation = responseCollection.find(function(item) {
							return item.$Code === readWriteOperationCode;
						});
						this._setRightsSysAdminOperation(
							"ReadRightsOperation", "ReadSysAdminOperation", readOperation);
						this._setRightsSysAdminOperation(
							"ReadWriteRightsOperation", "ReadWriteSysAdminOperation", readWriteOperation);
					}
					callback.call(scope);
				}, this);
			},

			/**
			 * Set default empty system settings rights operations.
			 * @private
			 */
			_setDefaultSysAdminOperations: function() {
				this._setRightsSysAdminOperation(
					"ReadRightsOperation", "ReadSysAdminOperation", null);
				this._setRightsSysAdminOperation(
					"ReadWriteRightsOperation", "ReadWriteSysAdminOperation", null);
			},

			/**
			 * Fills system setting rights values on page load.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 * @private
			 */
			_loadSysAdminOperations: function(callback, scope) {
				const code = this.$Code;
				if (!code || !this.isUseSysSettingsRights()) {
					this._setDefaultSysAdminOperations();
					Ext.callback(callback, scope);
				} else {
					Terrasoft.SysSettings.getSysSettingsRightsAsync({sysSettingsCode: this.$Code})
						.then(function(rightsCodes) {
							const readOperationCode = rightsCodes.readOperationCode;
							const readWriteOperationCode = rightsCodes.readWriteOperationCode;
							if (!readOperationCode && !readWriteOperationCode) {
								this._setDefaultSysAdminOperations();
								callback.call(scope);
							} else {
								this._setSysAdminOperations(readOperationCode, readWriteOperationCode, callback, scope);
							}
						}.bind(this));
				}
			},

			/**
			 * Initializes ReadWriteAccessMessageLink.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} [scope] Callback scope.
			 */
			_initReadWriteAccessMessageLink: function(callback, scope) {
				const propsQuery = this._getSysAdminOperationPropertiesQuery(["CanManageSysSettings"]);
				propsQuery.clientESQCacheParameters = {cacheItemName: "CanManageSysSettingsOperation_Id"};
				propsQuery.getEntityCollection(function(response) {
					if (response && response.success) {
						const entity = response.collection.first();
						const operationId = entity.$Id;
						this.$ReadWriteAccessMessageLink = "#CardModuleV2/SysAdminOperationPageV2/edit/" + operationId;
						Ext.callback(callback, scope);
					}
				}, this);
			},

			/**
			 * Returns system setting secure value. If useSecureSettingsOnClient appSetting is enabled,
			 * returns real value, else return '123456789'.
			 * @param {String} rawValue Raw system setting value.
			 * @return {String}
			 */
			_getSecureValue: function(rawValue) {
				if (Terrasoft.useSecureSettingsOnClient !== true) {
					return "123456789";
				}
				return rawValue;
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				if (this.$Initialized) {
					this.callParent([
						function() {
							this.subscribeOnColumnChange("ReferenceSchema", this.onReferenceSchemaChange, this);
							this.subscribeOnColumnChange(
								"ReferenceSchemaUId", this._onReferenceSchemaUIdChange, this);
							this.subscribeOnColumnChange("Type", this.onTypeChange, this);
							this.$IsEditMode = this.isEditMode();
							this._initReadWriteAccessMessageLink(callback, scope);
						}, this
					]);
				} else {
					Terrasoft.EntitySchemaManager.initialize(function() {
						this.$Initialized = true;
						this.init(callback, scope);
					}, this);
				}
			},

			/**
			 * @inheritdoc BasePageV2#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				const primaryColumnValue = this.get(this.primaryColumnName);
				if (this.Ext.isEmpty(primaryColumnValue) || this.isNew) {
					this.set(this.primaryColumnName, this.Terrasoft.generateGUID());
				}
				this.callParent(arguments);
				const typeDefaultConfig = this.Terrasoft.SysSettings.getTypes();
				this.$Type = typeDefaultConfig[this.$ValueTypeName];
				if (this.isLookup()) {
					const referenceSchemaList = this.getReferenceSchemaList();
					this.$ReferenceSchema = referenceSchemaList[this.$ReferenceSchemaUId];
				}
				this.loadValue(function() {
					const valueAttributeNames = this.getValueAttributeNames();
					valueAttributeNames.forEach(function(valueAttributeName) {
						this.subscribeOnColumnChange(valueAttributeName, this.onAttributeChanged, this);
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc BasePageV2#initEntity
			 * @override
			 */
			initEntity: function(callback, scope) {
				this.callParent([
					function() {
						this._loadSysAdminOperations(function() {
							this._saveRightsOperationInitialValues();
							this.subscribeOnColumnChange("ReadRightsOperation", this.onAttributeChanged, this);
							this.subscribeOnColumnChange("ReadWriteRightsOperation", this.onAttributeChanged, this);
							Ext.callback(callback, scope);
						}, this);
					}, this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#asyncValidate
			 * @override
			 */
			asyncValidate: function(callback, scope) {
				this.callParent([
					function(result) {
						if (!result.success) {
							callback.call(scope, result);
							return;
						}
						this.validatePermissions(this.validateCodeDuplicate, callback, scope);
					}, this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getSectionCode
			 * @override
			 */
			getSectionCode: function() {
				return "SysSettings";
			},

			/**
			 * @inheritdoc BaseViewModel#loadLookupData
			 * @override
			 */
			loadLookupData: function(filter, list, columnName) {
				const column = this.getColumnByName(columnName);
				if (column.referenceSchemaName) {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritdoc Terrasoft.LookupQuickAddMixin#getPreventQuickAddSchemaNames
			 * @override
			 */
			getPreventQuickAddSchemaNames: function() {
				const baseSchemaNames = this.callParent(arguments);
				return baseSchemaNames.concat("SysAdminOperation");
			},

			/**
			 * Attribute value change handler.
			 * @protected
			 */
			onAttributeChanged: function() {
				this.$IsChanged = true;
			},

			/**
			 * Download method for system setting value.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			loadValue: function(callback, scope) {
				const code = this.$Code;
				if (!Ext.isEmpty(code)) {
					if (this.isNeedToUseSequence(code)) {
						this.loadValueFromSequence(code, callback, scope);
					} else {
						this.loadValueFromSysSettings(code, callback, scope);
					}
				}
			},

			/**
			 * Load value from SysSettings service.
			 * @protected
			 * @param {String} code SysSetting code.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			loadValueFromSysSettings: function(code, callback, scope) {
				Terrasoft.SysSettings.querySysSetting(code, function(sysSettingObject) {
					const value = sysSettingObject[code];
					this.initTypeValue(value);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Check if it is need to call sequence service.
			 * @protected
			 * @param {String} code SysSetting code.
			 */
			isNeedToUseSequence: function(code) {
				return code.indexOf("LastNumber") !== -1 && this.getIsFeatureEnabled("UseDBSequence");
			},

			/**
			 * Load value from sequence service.
			 * @protected
			 * @param {String} code SysSetting code.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			loadValueFromSequence: function(code, callback, scope) {
				const config = {
					serviceName: "SequenceSettingsService",
					methodName: "GetSequenceValue",
					scope: this,
					data: {
						sysSettingName: code
					}
				};
				this.callService(config, function(response) {
					if (response && response.GetSequenceValueResult) {
						this.initTypeValue(response.GetSequenceValueResult);
					} else {
						this.loadValueFromSysSettings(code, callback, scope);
					}
					if (this.Ext.isFunction(callback)) {
						callback.call(scope);
					}
				}, this);
			},

			/**
			 * Returns attribute value names of system settings.
			 * @protected
			 * @return {Array} Array of attributes value names.
			 */
			getValueAttributeNames: function() {
				return [
					"BooleanValue", "DateTimeValue", "IntegerValue", "FloatValue", "TextValue", "SecureValue",
					"LookupValue", "BinaryValue", "DateValue", "TimeValue"
				];
			},

			/**
			 * Clears values of attribute values.
			 * @protected
			 */
			clearValues: function() {
				const valueAttributeNames = this.getValueAttributeNames();
				Terrasoft.each(valueAttributeNames, function(valueAttributeName) {
					this.set(valueAttributeName, null);
				}, this);
			},

			/**
			 * Updates the visibility of attribute values.
			 * @protected
			 * @param {String} valueTypeName The name of the data type of system setting.
			 */
			updateValueVisibility: function(valueTypeName) {
				const typeValueAttributeName = this.getTypeValueAttributeName(valueTypeName);
				const typeValueVisibleAttributeName = typeValueAttributeName + "Visible";
				const valueAttributeNames = this.getValueAttributeNames();
				Terrasoft.each(valueAttributeNames, function(valueAttributeName) {
					const valueVisibleAttributeName = valueAttributeName + "Visible";
					this.set(valueVisibleAttributeName,
							valueVisibleAttributeName === typeValueVisibleAttributeName);
				}, this);
			},

			/**
			 * Gets type value attribute name.
			 * @protected
			 * @param {String} valueTypeName Value type name.
			 * @return {String} Attribute name.
			 */
			getTypeValueAttributeName: function(valueTypeName) {
				const mapping = {
					"Boolean": "BooleanValue",
					"Date": "DateValue",
					"Time": "TimeValue",
					"DateTime": "DateTimeValue",
					"Integer": "IntegerValue",
					"Money": "FloatValue",
					"Float": "FloatValue",
					"Text": "TextValue",
					"ShortText": "TextValue",
					"MediumText": "TextValue",
					"LongText": "TextValue",
					"MaxSizeText": "TextValue",
					"SecureText": "SecureValue",
					"Lookup": "LookupValue",
					"Binary": "BinaryValue"
				};
				const result = mapping[valueTypeName];
				if (!result) {
					throw new this.Terrasoft.UnsupportedTypeException();
				}
				return result;
			},

			/**
			 * Initializes system settings type.
			 * @protected
			 * @param {Object} value New value.
			 */
			initTypeValue: function(value) {
				this.clearValues();
				let sysSettingValue = value;
				const typeValueAttributeName = this.getTypeValueAttributeName(this.$ValueTypeName);
				if (this.isSecureTextSysSettingType()) {
					sysSettingValue = this._getSecureValue(sysSettingValue);
				}
				this.set(typeValueAttributeName, sysSettingValue);
			},

			/**
			 * Saves the value of the system settings.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Scope of callback function.
			 */
			saveValue: function(callback, scope) {
				const typeValueAttributeName = this.getTypeValueAttributeName(this.$ValueTypeName);
				let value = this.get(typeValueAttributeName);
				const code = this.$Code;
				if (this.isNeedToUseSequence(code)) {
					value = value > 0 ? value : 1;
					this.saveValueToSequence(code, value);
				}
				const config = {
					sysSettingsValues: {},
					isPersonal: this.$IsPersonal
				};
				config.sysSettingsValues[code] = value;
				Terrasoft.SysSettings.postSysSettingsValues(config, callback, scope);
			},

			/**
			 * Saves the value of the system settings to sequence.
			 * @protected
			 * @param {String} code SysSettings code.
			 * @param {Object} value SysSettings value.
			 */
			saveValueToSequence: function(code, value) {
				const config = {
					serviceName: "SequenceSettingsService",
					methodName: "SetSequenceValue",
					data: {
						sysSettingName: code,
						startValue: value
					}
				};
				this.callService(config, this.Terrasoft.emptyFn, this);
			},

			/**
			 * Handles the event schema changes.
			 * @protected
			 */
			onReferenceSchemaChange: function() {
				const referenceSchema = this.$ReferenceSchema;
				const oldReferenceSchemaUId = this.$ReferenceSchemaUId;
				const newReferenceSchemaUId = referenceSchema && referenceSchema.value;
				if (oldReferenceSchemaUId !== newReferenceSchemaUId &&
						(!this.Ext.isEmpty(oldReferenceSchemaUId) || !this.Ext.isEmpty(newReferenceSchemaUId))) {
					this.$ReferenceSchemaUId = newReferenceSchemaUId;
					this.$LookupValue = null;
				}
			},

			/**
			 * Handles type change event.
			 * @protected
			 */
			onTypeChange: function() {
				const type = this.$Type;
				if (!this.isLookup()) {
					this.$ReferenceSchema = null;
				}
				const valueTypeName = type && type.value;
				this.$ValueTypeName = valueTypeName;
				this.clearValues();
				this.updateValueVisibility(valueTypeName);
			},

			/**
			 * Fills system settings type collection.
			 * @protected
			 * @param {String} filter Filter string.
			 * @param {Terrasoft.core.collections.Collection} list List to be fulfilled.
			 */
			prepareTypeList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.Terrasoft.SysSettings.getTypes());
			},

			/**
			 * Fills list of schemas.
			 * @protected
			 * @virtual
			 * @param {String} filter Filter string.
			 * @param {Terrasoft.core.collections.Collection} list List to fulfill.
			 */
			prepareReferenceSchemaList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getReferenceSchemaList());
			},

			/**
			 * Returns the list of schemas.
			 * @protected
			 * @virtual
			 * @return {Object} List of schemas.
			 */
			getReferenceSchemaList: function() {
				const schemaItems = Terrasoft.EntitySchemaManager.getItems();
				schemaItems.sort("caption", Terrasoft.OrderDirection.ASC);
				const resultConfig = {};
				schemaItems.each(function(schemaItem) {
					if (schemaItem.getExtendParent()) {
						return;
					}
					const schemaUId = schemaItem.getUId();
					resultConfig[schemaUId] = {
						value: schemaUId,
						displayValue: schemaItem.getCaption()
					};
				}, this);
				return resultConfig;
			},

			/**
			 * Handler of file selected event.
			 * @protected
			 * @param {Object} files Files that are generated by FileAPI.
			 */
			onFileSelect: function(files) {
				if (Ext.isEmpty(files)) {
					return;
				}
				const self = this;
				const file = files[0];
				FileAPI.readAsBinaryString(file, function(e) {
					const eventType = e.type;
					if (eventType === "load") {
						const binaryString = e.result;
						self.$BinaryValue = btoa(binaryString);
					} else if (eventType === "error") {
						throw new Terrasoft.UnknownException({
							message: e.error
						});
					}
				});
			},

			/**
			 * Handler of clear binary value button click.
			 * @protected
			 */
			onClearBinaryValueClick: function() {
				this.$BinaryValue = null;
			},

			/**
			 * Handler of clear binary value button click.
			 * @protected
			 */
			onSaveToFileClick: function() {
				const link = Terrasoft.FileDownloader.getFileLink(this.entitySchema.uId, this.$Id);
				window.open(link, "_self");
			},

			/**
			 * @protected
			 */
			isSaveToFileButtonVisible: function() {
				return false;
			},

			/**
			 * Indicates if the binary value not empty.
			 * @protected
			 * @return {Boolean}
			 */
			isNotEmptyBinaryValue: function() {
				return !Ext.isEmpty(this.$BinaryValue);
			},

			/**
			 * Indicates if the binary value empty.
			 * @protected
			 * @return {Boolean}
			 */
			isEmptyBinaryValue: function() {
				return Ext.isEmpty(this.$BinaryValue);
			},

			/**
			 * Validates column Code for duplication.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.BaseSchemaViewModel} scope Callback function scope.
			 */
			validateCodeDuplicate: function(callback, scope) {
				if (!this.changedValues || this.Ext.isEmpty(this.changedValues.Code)) {
					callback.call(scope, {success: true});
				} else {
					const code = this.$Code;
					const id = this.$Id;
					const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					select.addColumn("Code");
					const idFilter = select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.NOT_EQUAL,
							"Id", id);
					select.filters.addItem(idFilter);
					const codeFilter = select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Code", code);
					select.filters.addItem(codeFilter);
					select.execute(function(response) {
						if (response.success) {
							const responseCollection = response.collection;
							let result = {success: true};
							if (responseCollection.getCount() > 0) {
								result = {
									message: this.get("Resources.Strings.DuplicateCodeMessage"),
									success: false
								};
							}
							callback.call(scope, result);
						}
					}, this);
				}
			},

			/**
			 * Validates user rights to create/modify sys settings.
			 * @protected
			 * @param {Function} nextValidator function for successful validation.
			 * @param {Function} finiteCallback Finite callback function.
			 * @param {Terrasoft.BaseSchemaViewModel} scope Finite callback function scope.
			 */
			validatePermissions: function(nextValidator, finiteCallback, scope) {
				const operationCode = "CanManageSysSettings";
				RightUtilities.checkCanExecuteOperation({operation: operationCode}, function(result) {
					if (result) {
						nextValidator.call(this, finiteCallback, scope);
					} else {
						this.showPermissionsErrorMessage(operationCode);
						finiteCallback.call(scope, {success: result});
					}
				}, this);
			},

			/**
			 * Converter to determine whether SysAdminOperation lookup is visible.
			 * @param {Terrasoft.SysSettingsRightsOperationType} value System setting rights operation type.
			 * @return {Boolean} Visibility of the lookup.
			 */
			isAllowByOperation: function(value) {
				return value === Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION;
			},

			//endregion

			//region Methods: Public

			/**
			 * Checks whether system settings rights feature is enabled.
			 * @return {Boolean} Whether show system settings rights administration controls and get/set rights on init.
			 */
			isUseSysSettingsRights: function() {
				return Terrasoft.Features.getIsEnabled("UseSysSettingsRights");
			},

			/**
			 * Checks whether system settings read rights is enabled.
			 * Checks system settings rights feature is enabled and useSecureSettingsOnClient appSetting for SecureText
			 * system setting type.
			 * @return {Boolean} Whether show system settings read rights administration controls.
			 */
			isEnableReadSysSettingsRights: function() {
				let enableReadSysSettingsRights = this.isUseSysSettingsRights();
				if (this.isSecureTextSysSettingType()) {
					enableReadSysSettingsRights = enableReadSysSettingsRights &&
						Terrasoft.useSecureSettingsOnClient === true;
				}
				return enableReadSysSettingsRights;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				const valueAttributeNames = this.getValueAttributeNames();
				valueAttributeNames.forEach(function(valueAttributeName) {
					this.unsubscribeOnColumnChange(valueAttributeName, this.onAttributeChanged);
				}, this);
				this.unsubscribeOnColumnChange("ReadRightsOperation", this.onAttributeChanged, this);
				this.unsubscribeOnColumnChange("ReadWriteRightsOperation", this.onAttributeChanged, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#saveEntity
			 * @override
			 */
			saveEntity: function(callback, scope) {
				if (!this.validate()) {
					return;
				}
				Terrasoft.chain(
					function(next) {
						this._saveSysSetting(next, this);
					},
					function(next) {
						this._saveRights(next, this);
					},
					function() {
						this.saveValue(callback, scope);
					},
					this
				);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @override
			 */
			onDiscardChangesClick: function(callback, scope) {
				this._restoreRightsOperationInitialValues();
				this.callParent(arguments);
			},

			/**
			 * Checks if the system settings type is lookup.
			 * @return {boolean} Check result.
			 */
			isLookup: function() {
				const type = this.$Type;
				return type && type.value === "Lookup";
			},

			/**
			 * Checks if the system settings type is secure text.
			 * @return {boolean} Check result.
			 */
			isSecureTextSysSettingType: function() {
				const type = this.$Type;
				return type && type.value === "SecureText";
			},

			/**
			 * Gets caption value for ReadRightsGroupInfoButtonCaption.
			 * @return {String} ReadRightsGroupInfoButtonCaption value.
			 */
			getReadRightsGroupInfoButtonCaption: function() {
				return Ext.String.format(this.get("Resources.Strings.ReadRightsGroupInfoButtonCaption"),
					this.$ReadWriteAccessMessageLink);
			},

			/**
			 * Gets caption value for ReadWriteRightsGroupInfoButtonCaption.
			 * @return {String} ReadWriteRightsGroupInfoButtonCaption value.
			 */
			getReadWriteRightsGroupInfoButtonCaption: function() {
				return Ext.String.format(this.get("Resources.Strings.ReadWriteRightsGroupInfoButtonCaption"),
					this.$ReadWriteAccessMessageLink);
			},

			/**
			 * Gets caption value for SysSettingTypeInfoButtonTipMessage.
			 * @return {String} SysSettingTypeInfoButtonTipMessage value.
			 */
			getSysSettingTypeInfoButtonCaption: function() {
				return this.get("Resources.Strings.SysSettingTypeInfoButtonTipMessage");
			},

			/**
			 * Returns system setting type information button visibility.
			 * @return {Boolean} True - if system setting type is SecureText, false - in other case.
			 */
			getSysSettingTypeInfoButtonVisible: function() {
				return this.isSecureTextSysSettingType();
			},

			//endregion

			//region Methods: Deprecated

			/**
			 * Use validateCodeDuplicate instead.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 * @deprecated
			 */
			validateCodeDublicate: function(callback, scope) {
				this.validateCodeDuplicate(callback, scope);
			}

			//endregion
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "actions",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"wrapClass": ["sys-settings-edit-page"]
				}
			},
			{
				"operation": "insert",
				"name": "Attributes",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					},
					"wrapClass": ["sys-settings-attributes-container"]
				}
			},
			{
				"operation": "insert",
				"name": "AttributesPanels",
				"parentName": "Attributes",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["sys-settings-attributes-panels"]
				}
			},
			{
				"operation": "insert",
				"name": "AttributesLeftPanel",
				"parentName": "AttributesPanels",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"classes": {
						"wrapClassName": ["sys-settings-attributes-panel", "sys-settings-attributes-left-panel"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AttributesLeftPanel",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"wrapClass": ["sys-settings-attribute", "left-panel-item"]
				}
			},
			{
				"operation": "insert",
				"name": "SysSettingTypeContainer",
				"parentName": "AttributesLeftPanel",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["left-panel-item", "sys-setting-type-container"]
				}
			},
			{
				"operation": "insert",
				"name": "Type",
				"parentName": "SysSettingTypeContainer",
				"propertyName": "items",
				"values": {
					"contentType": Terrasoft.ContentType.ENUM,
					"wrapClass": ["sys-settings-attribute", "sys-setting-type"],
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.TypeCaption"
						}
					},
					"controlConfig": {
						"enabled": {
							"bindTo": "IsEditMode",
							"bindConfig": {"converter": "invertBooleanValue"}
						},
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {
							"bindTo": "prepareTypeList"
						},
						"list": {
							"bindTo": "TypeList"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SysSettingTypeInfoButtonContainer",
				"parentName": "SysSettingTypeContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"classes": {
						"wrapClassName": ["sys-setting-type-info-button-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "SysSettingTypeInfoButton",
				"parentName": "SysSettingTypeInfoButtonContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"controlConfig": {
						"classes": {
							"wrapperClass": ["sys-setting-type-info-button"]
						},
						"visible": {
							"bindTo": "getSysSettingTypeInfoButtonVisible"
						}
					},
					"content": {
						"bindTo": "getSysSettingTypeInfoButtonCaption"
					},
					"items": [],
					"behaviour": {
						"displayEvent": Terrasoft.TipDisplayEvent.HOVER
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AttributesLeftPanel",
				"propertyName": "items",
				"name": "ReferenceSchema",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ReferenceSchemaCaption"
					},
					"wrapClass": ["sys-settings-attribute", "left-panel-item"],
					"visible": {
						"bindTo": "Type",
						"bindConfig": {
							"converter": "isLookup"
						}
					},
					"isRequired": {
						"bindTo": "Type",
						"bindConfig": {
							"converter": "isLookup"
						}
					},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "prepareReferenceSchemaList"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "ValueContainer",
				"parentName": "AttributesLeftPanel",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-panel-item"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "TextValue",
				"values": {
					"bindTo": "TextValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						"bindTo": "TextValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "SecureValue",
				"values": {
					"bindTo": "SecureValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						"bindTo": "SecureValueVisible"
					},
					"controlConfig": {
						protect: true
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "IntegerValue",
				"values": {
					"bindTo": "IntegerValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "IntegerValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "FloatValue",
				"values": {
					"bindTo": "FloatValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "FloatValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "BooleanValue",
				"values": {
					"bindTo": "BooleanValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "BooleanValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "DateTimeValue",
				"values": {
					"bindTo": "DateTimeValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "DateTimeValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "DateValue",
				"values": {
					"bindTo": "DateValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "DateValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "TimeValue",
				"values": {
					"bindTo": "TimeValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "TimeValueVisible"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"name": "LookupValue",
				"values": {
					"bindTo": "LookupValue",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.DefaultValueCaption"
						}
					},
					"visible": {
						bindTo: "LookupValueVisible"
					},
					"dataValueType": Terrasoft.DataValueType.ENUM
				}
			},
			{
				"operation": "insert",
				"name": "BinaryValueContainer",
				"parentName": "ValueContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {
						bindTo: "BinaryValueVisible"
					},
					"styles": {
						"float": "right"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "BinaryValueContainer",
				"name": "FileSelect",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREY,
					"caption": {
						"bindTo": "Resources.Strings.FileSelectCaption"
					},
					"visible": {
						"bindTo": "BinaryValue",
						"bindConfig": {
							"converter": "isEmptyBinaryValue"
						}
					},
					"controlConfig": {
						"fileUpload": true,
						"fileUploadMultiSelect": false,
						"filesSelected": {
							"bindTo": "onFileSelect"
						}
					}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "BinaryValueContainer",
				"name": "SaveToFile",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveToFileCaption"},
					"click": {"bindTo": "onSaveToFileClick"},
					"visible": {
						"bindTo": "BinaryValue",
						"bindConfig": {"converter": "isSaveToFileButtonVisible"}
					},
					"style": Terrasoft.controls.ButtonEnums.style.GREY
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "BinaryValueContainer",
				"name": "ClearBinaryValue",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ClearBinaryValueCaption"},
					"click": {"bindTo": "onClearBinaryValueClick"},
					"visible": {
						"bindTo": "BinaryValue",
						"bindConfig": {"converter": "isNotEmptyBinaryValue"}
					},
					"style": Terrasoft.controls.ButtonEnums.style.GREY
				}
			},
			{
				"operation": "insert",
				"name": "AttributesRightPanel",
				"parentName": "AttributesPanels",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["sys-settings-attributes-panel", "sys-settings-attributes-right-panel"]
				}
			},
			{
				"operation": "insert",
				"parentName": "AttributesRightPanel",
				"propertyName": "items",
				"name": "Code",
				"values": {
					"tip": {
						"content": {"bindTo": "Resources.Strings.CodeInfoTip"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsCacheableContainer",
				"parentName": "AttributesRightPanel",
				"propertyName": "items",
				"values": {
					"styles": {
						"display": "inline-flex",
						"width": "100%"
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IsCacheableContainer",
				"propertyName": "items",
				"name": "IsCacheable",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.IsCacheableCaption"
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.IsCacheableInfoTip"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsPersonalContainer",
				"parentName": "AttributesRightPanel",
				"propertyName": "items",
				"values": {
					"styles": {
						"display": "inline-flex",
						"width": "100%"
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IsPersonalContainer",
				"propertyName": "items",
				"name": "IsPersonal",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.IsPersonalCaption"
					},
					"tip": {
						"content": {"bindTo": "Resources.Strings.IsPersonalInfoTip"}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Attributes",
				"propertyName": "items",
				"name": "Description",
				"values": {
					"contentType": Terrasoft.ContentType.LONG_TEXT,
					"wrapClass": ["sys-settings-description"]
				}
			},
			{
				"operation": "insert",
				"name": "RightsContainer",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24,
						"rowSpan": 1
					},
					"wrapClass": ["sys-settings-rights-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Rights",
				"parentName": "RightsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ReadRightsContainer",
				"parentName": "Rights",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					},
					"items": [],
					"visible": {
						"bindTo": "isEnableReadSysSettingsRights"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsContainer",
				"name": "ReadRightsGroup",
				"propertyName": "items",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ReadRightsGroupCaption"
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"tools": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsGroup",
				"propertyName": "items",
				"name": "ReadRightsRadioGroup",
				"values": {
					"value": {"bindTo": "ReadRightsOperation"},
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"items": []
				},
				"index": 0
			},
			{
				"name": "ReadRightsGroupInfoButton",
				"parentName": "ReadRightsGroup",
				"operation": "insert",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {
						"bindTo": "getReadRightsGroupInfoButtonCaption"
					},
					"items": [],
					"behaviour": {
						"displayEvent": Terrasoft.TipDisplayEvent.HOVER
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadRightsAllowAll",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.AllowAllButtonCaption"
					},
					"markerValue": "read-rights-allow-all",
					"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_ALL
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadRightsRestrictAll",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.RestrictAllButtonCaption"
					},
					"markerValue": "read-rights-restrict-all",
					"value": Terrasoft.SysSettingsRightsOperationType.RESTRICT_ALL
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadRightsAllowByOperation",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.AllowByOperationButtonCaption"
					},
					"markerValue": "read-rights-allow-by-operation",
					"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION
				},
				"index": 2
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsGroup",
				"name": "ReadRightsGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"collapseEmptyRow": true,
					"items": []
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ReadRightsGridLayout",
				"propertyName": "items",
				"name": "ReadSysAdminOperation",
				"values": {
					"bindTo": "ReadSysAdminOperation",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 8,
						"rowSpan": 1
					},
					"labelConfig": {
						"visible": false
					},
					"markerValue": "read-sys-admin-operation",
					"wrapClass": ["sys-settings-rights-admin-operation"],
					"controlConfig": {
						"placeholder": {
							"bindTo": "Resources.Strings.SysAdminOperationLookupPlaceholder"
						},
						"classes": ["placeholderOpacity"],
						"focusClass": "sys-settings-rights-admin-operation-focus"
					},
					"visible": {
						bindTo: "ReadRightsOperation",
						bindConfig: {
							converter: "isAllowByOperation"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "ReadWriteRightsContainer",
				"parentName": "Rights",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24,
						"rowSpan": 1
					},
					"items": [],
					"visible": {
						"bindTo": "isUseSysSettingsRights"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsContainer",
				"name": "ReadWriteRightsGroup",
				"propertyName": "items",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.WriteRightsGroupCaption"
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"tools": []
				}
			},
			{
				"name": "ReadWriteRightsGroupInfoButton",
				"parentName": "ReadWriteRightsGroup",
				"operation": "insert",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {
						"bindTo": "getReadWriteRightsGroupInfoButtonCaption"
					},
					"items": [],
					"behaviour": {
						"displayEvent": Terrasoft.TipDisplayEvent.HOVER
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsGroup",
				"propertyName": "items",
				"name": "ReadWriteRightsRadioGroup",
				"values": {
					"value": {"bindTo": "ReadWriteRightsOperation"},
					"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadWriteRightsAllowAll",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.AllowAllButtonCaption"
					},
					"markerValue": "write-rights-allow-all",
					"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_ALL
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadWriteRightsRestrictAll",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.RestrictAllButtonCaption"
					},
					"markerValue": "write-rights-restrict-all",
					"value": Terrasoft.SysSettingsRightsOperationType.RESTRICT_ALL
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsRadioGroup",
				"propertyName": "items",
				"name": "ReadWriteRightsAllowByOperation",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.AllowByOperationButtonCaption"
					},
					"markerValue": "write-rights-allow-by-operation",
					"value": Terrasoft.SysSettingsRightsOperationType.ALLOW_BY_OPERATION
				},
				"index": 2
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsGroup",
				"name": "ReadWriteRightsGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"collapseEmptyRow": true,
					"items": []
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ReadWriteRightsGridLayout",
				"propertyName": "items",
				"name": "ReadWriteSysAdminOperation",
				"values": {
					"bindTo": "ReadWriteSysAdminOperation",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 8,
						"rowSpan": 1
					},
					"labelConfig": {
						"visible": false
					},
					"markerValue": "read-write-sys-admin-operation",
					"wrapClass": ["sys-settings-rights-admin-operation"],
					"controlConfig": {
						"placeholder": {
							"bindTo": "Resources.Strings.SysAdminOperationLookupPlaceholder"
						},
						"classes": ["placeholderOpacity"],
						"focusClass": "sys-settings-rights-admin-operation-focus"
					},
					"visible": {
						bindTo: "ReadWriteRightsOperation",
						bindConfig: {
							converter: "isAllowByOperation"
						}
					}
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IsSSPAvailableContainer",
				"parentName": "Rights",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24,
						"rowSpan": 1
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IsSSPAvailableContainer",
				"name": "IsSSPAvailableGroup",
				"propertyName": "items",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.IsSSPAvailableGroupCaption"
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "IsSSPAvailableGroup",
				"name": "IsSSPAvailableGridLayout",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"collapseEmptyRow": true,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IsSSPAvailable",
				"parentName": "IsSSPAvailableGridLayout",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24,
						"rowSpan": 1
					},
					"wrapClass": ["sys-settings-rights-ssp-available-checkbox"],
					"caption": {
						"bindTo": "Resources.Strings.IsSSPAvailableCaption"
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


