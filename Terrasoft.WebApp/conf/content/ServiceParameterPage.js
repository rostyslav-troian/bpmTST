Terrasoft.configuration.Structures["ServiceParameterPage"] = {innerHierarchyStack: ["ServiceParameterPage"]};
define('ServiceParameterPageStructure', ['ServiceParameterPageResources'], function(resources) {return {schemaUId:'3c5bc346-0b9a-41ba-a554-a2b8f3166538',schemaCaption: "ServiceParameterPage", parentSchemaName: "", schemaName:'ServiceParameterPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceParameterPage", [
	"ServiceEnums",
	"ServiceDesignerUtilities",
	"css!ServiceDesignerStyles"
], function() {
	return {
		mixins: {
			ObservableItem: "Terrasoft.ObservableItem"
		},
		messages: {
			/**
			 * @message ParameterUIdChange
			 * Receives parameters for update state of ServiceParameterPage from ServiceParameterGrid.
			 * @return {Object} Parameters for get target parameter from ServiceSchemaManager.
			 */
			"ParameterUIdChange": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
			},

			/**
			 * @message GetParameterUId
			 * Handles GetPramaterUId request.
			 */
			"GetParameterUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message IsValid
			 * Handles value validation result.
			 */
			"IsValid": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}

		},
		properties: {
			useItemInitialValues: true,
			useViewModelToItemBinding: true,
			_maskId: null
		},
		modules: {
			ServiceRequestParameterDefValue: {
				moduleId: "ServiceRequestParameterDefValue",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "ServiceParameterValuePage",
					parameters: {
						viewModelConfig: {
							serviceUId: {
								attributeValue: "ServiceSchemaUId"
							},
							methodUId: {
								attributeValue: "MethodUId"
							},
							findParameterMethodName: {
								getValueMethod: "getFindParameterMethodName"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					},
					useHistoryState: false
				}
			}
		},
		attributes: {

			/**
			 * Changed values array.
			 */
			"ChangedValues": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Is parameter new.
			 */
			"IsNew": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Service schema UId
			 */
			"ServiceSchemaUId": {
				"dataValueType": Terrasoft.DataValueType.GUID
			},

			/**
			 * Service parameter.
			 */
			"ServiceParameter": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"onChange": "_onParameterChanged"
			},

			/**
			 * List of parameters.
			 */
			"Parameters": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Method.
			 */
			"Method": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * UId.
			 */
			"UId": {
				"dataValueType": Terrasoft.DataValueType.GUID,
				"isRequired": false
			},

			/**
			 * Path caption.
			 */
			"PathCaption": {
				"dataValueType": Terrasoft.DataValueType.TEXT
			},

			/**
			 * Name.
			 */
			"Name": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true
			},

			/**
			 * Caption.
			 */
			"Caption": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true
			},

			/**
			 * Path.
			 */
			"Path": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true
			},

			/**
			 * Is parameter array.
			 */
			"IsArray": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onIsArrayChange"
			},

			/**
			 * Is parameter required.
			 */
			"IsRequired": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * DefValue.
			 */
			"DefValue": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onDefValueChange"
			},

			/**
			 * Parameter is nested.
			 */
			"HasParent": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Parameter has nested items.
			 */
			"HasNestedParameters": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Data type enabled.
			 */
			"IsDataTypeEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Data type visible.
			 */
			"IsDataTypeVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Name field focused.
			 */
			"IsNameFocused": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Data value type name.
			 */
			"DataValueTypeName": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"onChange": "_onDataTypeChange"
			},

			/**
			 * Parameter type.
			 */
			"ParameterType": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"onChange": "_onParameterTypeChange"
			},

			/**
			 * Data type lookup.
			 */
			"DataTypeLookup": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"onChange": "_onDataTypeLookupChange"
			},

			/**
			 * Parameter type list.
			 */
			"ParameterTypeLookup": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"onChange": "_onParameterTypeLookupChange"
			},

			/**
			 * Is allow edit fields.
			 */
			"CanEditSchema": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false,
				"onChange": "setDataTypeEnabled"
			},

			/**
			 * Cancel button visible.
			 */
			"IsCancelVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			}

		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {

			//region Private

			//region Validators

			/**
			 * Validates Name.
			 * @param {String} parameterName.
			 * @return {Object} Validation object.
			 * @private
			 */
			_nameValidator: function(parameterName) {
				var message = "";
				var reqExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]*$/;
				if (!reqExp.test(parameterName)) {
					message = this.get("Resources.Strings.WrongNameMessage");
				}
				return {invalidMessage: message};
			},

			/**
			 * Validates prefix in Name.
			 * @param {String} schemaName.
			 * @return {Object} Validation object.
			 * @private
			 */
			_prefixValidator: function(schemaName) {
				var message = "";
				var schemaNamePrefix = Terrasoft.ServiceSchemaManager.schemaNamePrefix;
				var prefixReqExp = new RegExp("^" + schemaNamePrefix + ".*$");
				if (!prefixReqExp.test(schemaName)) {
					message = Ext.String.format(this.get("Resources.Strings.WrongPrefixMessage"), schemaNamePrefix);
				}
				return {invalidMessage: message};
			},

			/**
			 * Validates if DataType is valid for ParameterType.
			 * @param {String} [parameterName].
			 * @return {Object} Validation object.
			 * @private
			 */
			_dataTypeValidator: function(parameterName) {
				var message = "";
				if (!this.$IsArray && parameterName.value === Terrasoft.services.enums.DataValueTypeName.Object) {
					message = this.get("Resources.Strings.WarningMustSetIsObjectText");
				}
				return {invalidMessage: message};
			},

			//endregion

			/**
			 * @private
			 */
			_onParameterChanged: function() {
				var config = {
					serviceUId: this.$ServiceSchemaUId,
					methodUId: this.$Method.getPropertyValue("uId"),
					parameterUId: this.$ServiceParameter.getPropertyValue("uId"),
					findParameterMethodName: this.getFindParameterMethodName()
				};
				this.sandbox.publish("ParameterUIdChange", config, [this.getParameterValuePageTag()]);
			},

			/**
			 * Returns lookup text according to value.
			 * @param {String} [dataValueTypeName] Value type name.
			 * @return {String} Data value type caption.
			 * @private
			 */
			_getDataTypeLookupDisplayValue: function(dataValueTypeName) {
				return Terrasoft.services.enums.DataValueTypeCaption[dataValueTypeName];
			},

			/**
			 * Returns lookup text according to value.
			 * @param {String} [parameterValueTypeName].
			 * @return {String} Service parameter type caption.
			 * @private
			 */
			_getParameterTypeLookupDisplayValue: function(parameterValueTypeName) {
				return Terrasoft.services.enums.ServiceParameterTypeCaption[parameterValueTypeName];
			},

			/**
			 * Gets if lookup value the same as new value.
			 * @param {Object} [lookup].
			 * @param {Object} [value].
			 * @return {Boolean} has same value.
			 * @private
			 */
			_isLookupChanged: function(lookup, value) {
				return !lookup || lookup.value !== value;
			},

			/**
			 * Sets DataType lookup value on attribute change.
			 * @param {Object} [model].
			 * @param {String} [value].
			 * @private
			 */
			_onDataTypeChange: function(model, value) {
				if (this._isLookupChanged(this.$DataTypeLookup, value)) {
					this.$DataTypeLookup = value && {
						value: value,
						displayValue: this._getDataTypeLookupDisplayValue(value)
					};
				}
				this.$IsArray =
						this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Object || this.$IsArray;
				if (this.$DataValueTypeName === Terrasoft.services.enums.DataValueTypeName.Object) {
					this.$IsRequired = false;
				}
			},

			/**
			 * Sets ParameterType lookup value on attribute change.
			 * @private
			 */
			_onParameterTypeChange: function(model, value) {
				if (value) {
					if (this._isLookupChanged(this.$ParameterTypeLookup, value)) {
						this.$ParameterTypeLookup = {
							value: value,
							displayValue: this._getParameterTypeLookupDisplayValue(value)
						};
					}
					if (value !== Terrasoft.services.enums.ServiceParameterType.BODY) {
						this.$IsArray = false;
						this.setDefaultDataType(model);
					}
					this._setIsRequired();
					this._setPathCaption();
					this.setDataTypeEnabled();
					this.setDataTypeVisible();
				}
			},

			/**
			 * @private
			 */
			_setIsRequired: function() {
				if (!this._hasDefaultValue() && this._isRequiredParameterType(this.$ParameterType)) {
					this.$IsRequired = true;
				}
				if (this._hasDefaultValue()) {
					this.$IsRequired = false;
				}
			},

			/**
			 * @private
			 */
			_hasDefaultValue: function() {
				return this.$DefValue && this.$DefValue.value;
			},

			/**
			 * @private
			 */
			_isRequiredParameterType: function(parameterType) {
				return parameterType === Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT;
			},

			/**
			 * @private
			 */
			_onDefValueChange: function() {
				this._setIsRequired();
			},

			/**
			 * Sets Path label caption according to Parameter Type.
			 * @private
			 */
			_setPathCaption: function() {
				var localizableStringPath = "Resources.Strings.Code" +
					_.invert(Terrasoft.services.enums.ServiceParameterType)[this.$ParameterType] + "Caption";
				var localizableStringValue = this.get(localizableStringPath);
				if (localizableStringValue) {
					this.$PathCaption = localizableStringValue;
				}
			},

			/**
			 * Checks if parameter has nested parameters.
			 * @return {Boolean} Parameter has nested.
			 * @private
			 */
			_hasNestedParameters: function() {
				return this.$ServiceParameter && this.$ServiceParameter.itemProperties &&
					!this.$ServiceParameter.itemProperties.isEmpty();
			},

			/**
			 * Validates DataTypeLookup on IsArray change.
			 * @private
			 */
			_onIsArrayChange: function() {
				this.validateColumn("DataTypeLookup");
			},

			/**
			 * Updates DataType on DataTypeLookup change.
			 * @private
			 */
			_onDataTypeLookupChange: function(model, lookupValue) {
				if (lookupValue) {
					this.$DataValueTypeName = lookupValue && lookupValue.value;
				} else {
					this.$DataValueTypeName = null;
				}
			},

			/**
			 * Updates DataType on DataTypeLookup change.
			 * @private
			 */
			_onParameterTypeLookupChange: function(model, lookupValue) {
				this.$ParameterType = lookupValue && lookupValue.value;
			},

			/**
			 * @private
			 */
			_getPathPlaceholder: function() {
				var result = "";
				if (this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY) {
					result = this.get("Resources.Strings.PathHintForBodyType");
					if (this.get("HasParent")) {
						result = result.replace("$.", "");
					}
				}
				return result;
			},

			/**
			 * Provides recursive find of parameter by parameter uId.
			 * @param {Guid} [uId] UId parameter to find.
			 * @param {Terrasoft.ObjectCollection}  [parameterCollection] Collection in which find element.
			 * @return {Terrasoft.ServiceParameter} Nested parameter.
			 * @private
			 */
			_findInNestedParameters: function(parameterCollection, uId) {
				var serviceParameter = parameterCollection.findByPath("uId", uId);
				if (serviceParameter) {
					return serviceParameter;
				}
				parameterCollection.each(function(item) {
					var serviceParameterInner = this._findInNestedParameters(item.itemProperties, uId);
					if (serviceParameterInner) {
						serviceParameter = serviceParameterInner;
					}
				}, this);
				return serviceParameter;
			},

			/**
			 * Provides recursive find of parameter by parameter uId.
			 * @param {String} [name] target Name parameter to find.
			 * @param {Object} [except] main parameter object.
			 * @param {Terrasoft.ObjectCollection}  [parameterCollection] Collection in which find element.
			 * @return {Boolean} Has duplicate name parameter.
			 * @private
			 */
			_findInNestedParametersByName: function(parameterCollection, name, except) {
				except = except || null;
				var serviceParameter = this._findByPathExcept(parameterCollection, "name", name, except);
				var parameterFound = false;
				if (serviceParameter) {
					return true;
				}
				parameterCollection.each(function(item) {
					var serviceParameterInner = this._findInNestedParametersByName(item.itemProperties, name, except);
					if (serviceParameterInner) {
						parameterFound = true;
					}
				}, this);
				return parameterFound;
			},

			/**
			 * Returns an item by nested property value, except it is not exception object.
			 * @param {Collection} collection
			 * @param {String} path Item properties name path delimited with dot.
			 * @param {Object} value Value.
			 * @param {Object} except Exception value.
			 * @return {Object} Item.
			 * @private
			 */
			_findByPathExcept: function(collection, path, value, except) {
				return collection.filterByFn(function(item) {
					var itemValue = Terrasoft.findValueByPath(item, path);
					return _.isEqual(itemValue, value) && item.uId !== except.uId;
				}, this).first();
			},

			/**
			 * @private
			 */
			_beforeParameterUIdChange: function() {
				this.unsubscribeAllItems();
				this.un("change", this._onModelChange, this);
				this.$IsNew = false;
			},

			/**
			 * @private
			 */
			_showMask: function() {
				this._hideMask();
				Terrasoft.ClientPageSessionCache.setItem("ServiceParameterPageMaskId", Terrasoft.Mask.show({
					showSpinnerEl: false,
					timeout: 0,
					selector: "#MethodPageContainer"
				}));
				Terrasoft.updateStyleSheet(".parameter-edit-container", "border", "1px solid rgba(0, 174, 239, 1)");
			},

			/**
			 * @private
			 */
			_hideMask: function() {
				Terrasoft.Mask.hide(Terrasoft.ClientPageSessionCache.getItem("ServiceParameterPageMaskId"));
				Terrasoft.ClientPageSessionCache.removeItem("ServiceParameterPageMaskId");
				Terrasoft.updateStyleSheet(".parameter-edit-container", "border", "1px solid rgba(0, 174, 239, 0)");
			},

			/**
			 * @private
			 */
			_onValidate: function(isValid) {
				Terrasoft.refreshStyleSheetCache();
				if (isValid && !this.$IsNew) {
					this._hideMask();
				} else {
					this._showMask();
				}
			},

			/**
			 * @private
			 */
			_isChangeEvent: function(event) {
				return event && (event.changeEvent === "change" || event.changeEvent === "checkedchanged");
			},

			/**
			 * @private
			 */
			_isTrackedEvent: function(event, changed) {
				var result = this._isChangeEvent(event);
				if (!result) {
					var attributesToTrack = ["ParameterTypeLookup", "Name", "Caption", "Path", "IsArray",
						"IsRequired", "DataTypeLookup", "IsNew", "DefValue"];
					Terrasoft.each(changed, function(value, attribute) {
						if (Terrasoft.contains(attributesToTrack, attribute) && Ext.isDefined(changed[attribute])) {
							result = true;
							return false;
						}
					}, this);
				}
				return result;
			},

			/**
			 * @private
			 */
			_onModelChange: function(model, event, changed) {
				changed = changed || {};
				if (this._isTrackedEvent(event, changed)) {
					if (changed.ChangedValues) {
						return;
					}
					this._addChangedValues(changed);
					if (changed.IsNew) {
						this._showMask();
						return;
					}
				}
				if (this.$CanEditSchema && !this.$IsNew) {
					var isValid = this.validate();
					this._onValidate(isValid);
				}
			},

			/**
			 * @private
			 */
			_initParameter: function(config) {
				this.$ServiceParameter = this._findInNestedParameters(this.$Parameters, config.ParameterUId);
				if (this.$ServiceParameter) {
					this.$ServiceParameter.itemProperties.on("changed", this.onParameterItemPropertiesChanged, this);
					this.setDataTypeEnabled();
					this.subscribeOnItemChanged(this.$ServiceParameter);
					this.on("change", this._onModelChange, this);
					this.$IsNew = Boolean(this.$ServiceParameter.isNew);
					if (!this.$IsNew) {
						this.$ServiceParameter.saveState();
					}
					this.$HasNestedParameters = this._hasNestedParameters();
				}
			},

			/**
			 * @private
			 */
			_addChangedValues: function(changedValue) {
				Array.prototype.push.apply(this.$ChangedValues, _.keys(changedValue));
				this.trigger("change:ChangedValues", this.$ChangedValues);
			},

			/**
			 * @private
			 */
			_initChangedValues: function() {
				this.$ChangedValues = [];
			},

			/**
			 * @return {Terrasoft.controls.ButtonEnums.style}
			 * @private
			 */
			_getCancelButtonStyle: function() {
				return this.$IsNew
					? Terrasoft.controls.ButtonEnums.style.DEFAULT
					: Terrasoft.controls.ButtonEnums.style.BLUE;
			},

			/**
			 * @param parameters Parameter collection.
			 * @param serviceParameter Service parameter to find in collection.
			 * @return {Object} parent parameter
			 * @private
			 */
			_findParentParameter: function(parameters, serviceParameter) {
				let parent = null;
				parameters.each(function(parameter) {
					if (parameter.itemProperties.isEmpty()) {
						return;
					}
					const result = parameter.itemProperties.firstOrDefault(function(item) {
						return item.uId === serviceParameter.uId;
					});
					if (!parent) {
						parent = result
								? parameter
								: this._findParentParameter(parameter.itemProperties, serviceParameter);
					}
				}, this);
				return parent;
			},

			/**
			 * @private
			 */
			_onGetParameterUId: function() {
				return this.$UId;
			},

			//endregion

			//region Protected

			/**
			 * Sets default data type for parameter depending on parameter type.
			 * @protected
			 */
			setDefaultDataType: function(model) {
				this._onDataTypeChange(model, Terrasoft.services.enums.DataValueTypeName.Text);
			},

			/**
			 * @return {boolean}
			 * @protected
			 */
			isChanged: function() {
				return !Ext.isEmpty(this.$ChangedValues);
			},

			/**
			 * @return {boolean}
			 * @protected
			 */
			isCancelVisible: function() {
				return this.isChanged() && this.$CanEditSchema;
			},

			/**
			 * Checks if IsArray can be changed.
			 * @return {Boolean} IsArray enabled.
			 * @protected
			 */
			canEditIsArray: function() {
				return this.$DataValueTypeName !== Terrasoft.services.enums.DataValueTypeName.Object &&
					this.get("CanEditSchema");
			},

			/**
			 * Gets if IsArray should be visible, depending on parameter type.
			 * @return {Boolean} IsArray visible.
			 * @protected
			 */
			isIsArrayVisible: function() {
				return this.get("ParameterType") === Terrasoft.services.enums.ServiceParameterType.BODY;
			},

			/**
			 * Checks if ParameterType can be changed.
			 * @return {Boolean} Can parameter be changed.
			 * @protected
			 */
			canChangeParameterType: function() {
				if (!this.$CanEditSchema) {
					return false;
				}
				if (this.$HasParent) {
					this.$ParameterType = Terrasoft.services.enums.ServiceParameterType.BODY;
					return false;
				}
				return !this.$HasNestedParameters;
			},

			/**
			 * Parameter type visible.
			 * @return {Boolean} Parameter visible.
			 * @protected
			 */
			isParameterTypeVisible: function() {
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("DataTypeLookup", this._dataTypeValidator);
				this.addColumnValidator("ParameterTypeLookup", this.parameterTypeValidator);
				this.addColumnValidator("Name", this._nameValidator);
				this.addColumnValidator("Name", this._prefixValidator);
				this.addColumnValidator("Name", this.duplicateNameValidator);
			},

			/**
			 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
			 * @override
			 */
			getAttributeMap: function() {
				return {
					uId: "UId",
					name: "Name",
					caption: "Caption",
					dataValueTypeName: "DataValueTypeName",
					type: "ParameterType",
					path: "Path",
					isArray: "IsArray",
					defValue: "DefValue",
					isRequired: "IsRequired"
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback parameter.
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						Terrasoft.chain(
							function(next) {
								Terrasoft.ServiceSchemaManager.initialize(next, this);
							},
							function() {
								this.sandbox.publish("ParameterUIdChange", {}, [this.getParameterGridTag()]);
								Ext.callback(callback, scope);
							},
							this
						);
					}, this
				]);
			},

			/**
			 * Returns parameters collection from method fetched from ServiceSchemaManager.
			 * @param {Terrasoft.ServiceMethod} [method] Method which contains parameters collection.
			 * @return {Terrasoft.ObjectCollection} Method parameters.
			 * @protected
			 */
			getMethodParameters: function(method) {
				return method.request.parameters;
			},

			/**
			 * Sets visibility of DataType element.
			 * @protected
			 */
			setDataTypeVisible: function() {
				this.$IsDataTypeVisible =
					this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY;
			},

			/**
			 * Fills list with ServiceParameterTypeCaption enums value.
			 * @protected
			 */
			prepareParameterTypeList: function(filter, list) {
				var result = {};
				Terrasoft.each(Terrasoft.services.enums.ServiceParameterType, function(key) {
					if ((this.$Method.request.httpMethodType !== Terrasoft.services.enums.HttpMethodType.GET ||
							key !== Terrasoft.services.enums.ServiceParameterType.BODY
						) &&
						Terrasoft.services.enums.ServiceParameterTypeCaption[key]) {
						result[key] = {
							value: key,
							displayValue: Terrasoft.services.enums.ServiceParameterTypeCaption[key]
						};
					}
				}, this);
				list.reloadAll(result);
			},

			/**
			 * Validates parameter type according to method type.
			 * @return {Object} Validation object.
			 * @protected
			 */
			parameterTypeValidator: function() {
				var message = "";
				if (this.$Method && this.$Method.request.httpMethodType === Terrasoft.services.enums.HttpMethodType.GET &&
					this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY) {
					message = this.get("Resources.Strings.WarningNoBodyParameterForGetText");
				}
				return {invalidMessage: message};
			},

			/**
			 * @inheritdoc Terrasoft.BaseModel#set
			 * @overridden
			 */
			set: function(key, value, options) {
				if (!this.$CanEditSchema) {
					options = options || {};
					options.skipValidation = true;
				}
				this.callParent(arguments);
			},

			/**
			 * Validates if there is parameter with same name.
			 * @return {Object} Validation object.
			 * @protected
			 */
			duplicateNameValidator: function() {
				var message = "";
				if (this._findInNestedParametersByName(this.getMethodParameters(this.$Method),
						this.$Name, this.$ServiceParameter)) {
					message = this.get("Resources.Strings.DuplicateNameMessage");
				}
				return {invalidMessage: message};
			},

			/**
			 * Returns parameter edit page tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getParameterEditPageTag: function() {
				return "ParameterEditPage";
			},

			/**
			 * Returns parameter grid tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getParameterGridTag: function() {
				return "ServiceParameterGrid";
			},

			/**
			 * Returns parameter grid tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getFindParameterMethodName: function() {
				return "findRequestParameterByUId";
			},

			/**
			 * Returns parameter value edit page tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getParameterValuePageTag: function() {
				return "ServiceRequestParameterDefValue";
			},

			/**
			 * Gets if default value should be visible.
			 * @return {Boolean}
			 * @protected
			 */
			isDefaultValueVisible: function() {
				return !this.$IsArray;
			},

			/**
			 * Sets IsDataTypeEnabled according to Parameter Type.
			 * @protected
			 */
			setDataTypeEnabled: function() {
				var isTypeBody = this.$ParameterType === Terrasoft.services.enums.ServiceParameterType.BODY;
				var hasNestedParameters = this._hasNestedParameters();
				this.$IsDataTypeEnabled = isTypeBody && !hasNestedParameters && this.$CanEditSchema;
			},

			//endregion

			//region Methods: Public

			/**
			 * Fills list with DataValueTypeCaption enums value.
			 * @public
			 * @param {Object} filter Filters for data preparation.
			 * @param {Terrasoft.Collection} list The data for the drop-down list.
			 */
			prepareDataValueTypeNameList: function(filter, list) {
				var result = {};
				Terrasoft.each(Terrasoft.services.enums.DataValueTypeCaption, function(displayValue, value) {
					result[value] = {value: value, displayValue: displayValue};
				});
				list.reloadAll(result);
			},

			/**
			 * Returns path hint for specified service parameter type.
			 * @public
			 * @return {String} path hint.
			 */
			getPathHint: function() {
				var result;
				switch (this.$ParameterType) {
					case Terrasoft.services.enums.ServiceParameterType.BODY:
						result = this.get("Resources.Strings.PathHintForBodyType");
						break;
					case Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT:
						result = this.get("Resources.Strings.PathHintUriPath");
						break;
					case Terrasoft.services.enums.ServiceParameterType.QUERY_STRING:
						result = this.get("Resources.Strings.PathHintQueryPath");
						break;
					case Terrasoft.services.enums.ServiceParameterType.HTTP_HEADER:
						result = this.get("Resources.Strings.PathHintHeaderPath");
						break;
					case Terrasoft.services.enums.ServiceParameterType.COOKIE:
						result = this.get("Resources.Strings.PathHintCookiePath");
						break;
					default:
						result = "";
						break;
				}
				return result;
			},

			/**
			 * Cancel button handler.
			 */
			onCancelButtonClick: function() {
				if (this.$IsNew) {
					if (this.$HasParent) {
						var parentParameter = this._findParentParameter(this.$Parameters, this.$ServiceParameter);
						if (parentParameter) {
							parentParameter.itemProperties.removeByKey(this.$ServiceParameter.uId);
							this.$Parameters.fireEvent("remove", this.$ServiceParameter, this.$ServiceParameter.uId);
						}
					} else {
						this.$Parameters.removeByKey(this.$ServiceParameter.uId);
					}
				} else {
					this.$ServiceParameter.restoreState();
					this._onParameterChanged();
					this._initChangedValues();
				}
				this._hideMask();
			},

			/**
			 * Confirm new parameter button handler.
			 */
			onSaveNewParameterClick: function() {
				var isValid = this.validate();
				if (isValid) {
					this._hideMask();
					this.$ServiceParameter.isNew = this.$IsNew = false;
					this.$ServiceParameter.saveState();
					this._initChangedValues();
				}
			},

			/**
			 * Updates parameter attributes on event.
			 * @param {Object} [config] Parameter page config.
			 * @param {Function} callback
			 * @param {Object} scope
			 * @public
			 */
			onParameterUIdChange: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						this._beforeParameterUIdChange();
						this.$HasParent = config.HasParent;
						this.$ServiceSchemaUId = config.ServiceSchemaUId;
						Terrasoft.ServiceSchemaManager.getInstanceByUId(config.ServiceSchemaUId, next, this);
					},
					function(next, schema) {
						this.$Method = schema.methods.get(config.MethodUId);
						this.$Method.request.on("changed", this.onMethodRequestTypeChanged, this);
						this.$Parameters = this.getMethodParameters(this.$Method);
						this.$IsNameFocused = !Terrasoft.ResourceMutex.locked("InputFocus");
						this._initChangedValues();
						this._initParameter(config);
						Ext.callback(callback, scope);
					}, this);
			},

			/**
			 * Runs validation ParameterTypeLookup.
			 * @return {Boolean} Is Parameter type lookup is valid.
			 * @public
			 */
			onMethodRequestTypeChanged: function() {
				this.onSaveNewParameterClick();
				return this.validateColumn("ParameterTypeLookup");
			},

			/**
			 * Changes DataType and Parameter type behaviour depending on sub items collection.
			 * @public
			 */
			onParameterItemPropertiesChanged: function() {
				if (!this.$ServiceParameter.itemProperties.isEmpty()) {
					this.$IsDataTypeEnabled = false;
					this.$HasNestedParameters = true;
				}
			},

			/**
			 * Checks if IsRequired can be changed.
			 * @public
			 */
			canEditRequired: function() {
				return this.$CanEditSchema &&
						this.get("ParameterType") !== Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT &&
						this.get("DefValue") && !this.get("DefValue").value;
			},

			/**
			 * Checks if IsRequired visible.
			 * @public
			 */
			isRequiredVisible: function() {
				return this.get("DataValueTypeName") !== Terrasoft.services.enums.DataValueTypeName.Object;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#constructor.
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initChangedValues();
				this.sandbox.subscribe("GetParameterUId", this._onGetParameterUId, this,
					[this.getParameterValuePageTag()]);
				this.sandbox.subscribe("IsValid", this._onValidate, this,
					[this.getParameterValuePageTag()]);
				this.sandbox.subscribe("ParameterUIdChange", this.onParameterUIdChange, this,
					[this.getParameterEditPageTag()]);
			},

			/**
			 * @inheritDoc Terrasoft.core.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				if (this.$ServiceParameter) {
					this.$IsNew = false;
				}
				this._hideMask();
				this.callParent(arguments);
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ParameterEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["parameter-edit-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ParameterActionButtonsContainer",
				"parentName": "ParameterEdit",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["parameter-actions-container"],
					"items": []
				},
				"index": 1
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ParameterActionButtonsContainer",
				"name": "DiscardChangesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"click": {"bindTo": "onCancelButtonClick"},
					"visible": {"bindTo": "isCancelVisible"},
					"style": {"bindTo": "_getCancelButtonStyle"},
					"styles": {
						"textStyle": {
							"margin-left": "10px",
							"margin-right": "10px"
						}
					}
				}
			},
			{
				"operation": "insert",
				"propertyName": "items",
				"parentName": "ParameterActionButtonsContainer",
				"name": "SaveNewParameter",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveNewParameterButtonCaption"},
					"click": {"bindTo": "onSaveNewParameterClick"},
					"visible": {"bindTo": "IsNew"},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE
				}
			},
			{
				"operation": "insert",
				"name": "ParameterEditContainer",
				"parentName": "ParameterEdit",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "Caption",
				"index": 0,
				"values": {
					"layout": {"column": 0, "row": 0, "colSpan": 8},
					"bindTo": "Caption",
					"caption": {"bindTo": "Resources.Strings.ParameterCaption"},
					"controlConfig": {
						"focused": {
							"bindTo": "IsNameFocused"
						},
						"markerValue": "ParameterCaptionMarker"
					},
					"enabled": {
						"bindTo": "CanEditSchema"
					},
					"classes": {"wrapClassName": ["grid-layout-row"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "ParameterTypeLookup",
				"index": 1,
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 8},
					"caption": {"bindTo": "Resources.Strings.ParameterType"},
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "prepareParameterTypeList"},
						"enabled": {
							"bindTo": "canChangeParameterType"
						},
						"markerValue": "ParameterTypeLookupMarker"
					},
					"visible": {
						"bindTo": "isParameterTypeVisible"
					},
					"classes": {"wrapClassName": ["grid-layout-row"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"index": 2,
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 8},
					"bindTo": "Path",
					"caption": "$PathCaption",
					"controlConfig": {
						"markerValue": "ParameterCodeMarker",
						"placeholder": "$_getPathPlaceholder",
						"classes": "placeholderOpacity",
						"enabled": "$CanEditSchema"
					},
					"classes": {
						"wrapClassName": ["grid-layout-row placeholderOpacity"]
					},
					"tip": {"content": "$getPathHint"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "Name",
				"index": 3,
				"values": {
					"layout": {"column": 0, "row": 3, "colSpan": 8},
					"bindTo": "Name",
					"caption": "$Resources.Strings.ParameterName",
					"controlConfig": {
						"markerValue": "ParameterNameMarker"
					},
					"enabled": "$CanEditSchema",
					"classes": {"wrapClassName": ["grid-layout-row"]},
					"tip": {"content": "$Resources.Strings.CodeHint"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "DataTypeLookup",
				"index": 4,
				"values": {
					"layout": {"column": 0, "row": 4, "colSpan": 8},
					"caption": {"bindTo": "Resources.Strings.ParameterDataType"},
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "prepareDataValueTypeNameList"},
						"enabled": "$IsDataTypeEnabled",
						"markerValue": "ParameterDataTypeLookupMarker"
					},
					"visible": "$IsDataTypeVisible",
					"classes": {"wrapClassName": ["grid-layout-row"]},
					"tip": {"content": "$Resources.Strings.DataValueTypeHint"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "IsArray",
				"index": 5,
				"values": {
					"layout": {"column": 0, "row": 5, "colSpan": 8},
					"bindTo": "IsArray",
					"caption": "$Resources.Strings.ParameterIsArray",
					"controlConfig": {"markerValue": "ParameterIsArrayMarker"},
					"enabled": "$canEditIsArray",
					"visible": "$isIsArrayVisible",
					"classes": {"wrapClassName": ["grid-layout-row"]},
					"tip": {"content": "$Resources.Strings.IsArrayHint"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ParameterEditContainer",
				"propertyName": "items",
				"name": "IsRequired",
				"index": 6,
				"values": {
					"bindTo": "IsRequired",
					"caption": "$Resources.Strings.ParameterIsRequired",
					"controlConfig": {"markerValue": "ParameterIsRequiredMarker"},
					"classes": {"wrapClassName": ["grid-layout-row"]},
					"visible": { "bindTo": "isRequiredVisible" },
					"enabled": { "bindTo": "canEditRequired" },
					"tip": {"content": "$Resources.Strings.IsRequiredHint"}
				}
			},
			{
				"operation": "insert",
				"index": 7,
				"parentName": "ParameterEditContainer",
				"name": "ServiceRequestParameterDefValue",
				"propertyName": "items",
				"values": {
					"classes": {"wrapClassName": ["control-width-15", "control-left", "grid-layout-row",
						"module-container"]},
					"itemType": Terrasoft.ViewItemType.MODULE,
					"visible": "$isDefaultValueVisible"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


