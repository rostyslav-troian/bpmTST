Terrasoft.configuration.Structures["WebServiceUserTaskPropertiesPage"] = {innerHierarchyStack: ["WebServiceUserTaskPropertiesPage"], structureParent: "RootUserTaskPropertiesPage"};
define('WebServiceUserTaskPropertiesPageStructure', ['WebServiceUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'95d286f5-db18-4ff3-8a4d-34bfead1a862',schemaCaption: "WebServiceUserTask properties page", parentSchemaName: "RootUserTaskPropertiesPage", schemaName:'WebServiceUserTaskPropertiesPage',parentSchemaUId:'9ba919f3-0101-4b63-93c5-1a453985b538',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: RootUserTaskPropertiesPage
 */
define("WebServiceUserTaskPropertiesPage", [
	"ProcessSchemaUserTaskUtilities",
	"ProcessSchemaParameterViewConfig",
	"HierarchicalContainerList"
], function(processSchemaUserTaskUtilities) {
	return {
		attributes: {
			"ServiceSchema": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysSchema",
				isRequired: true,
				onChange: "onBeforeSchemaChanged"
			},
			"IsEmptyServiceSchemaList": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"ServiceMethod": {
				dataValueType: this.Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				onChange: "onBeforeMethodChanged"
			},
			"IsEmptyServiceMethodList": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"ServiceSchemaInstance": {
				dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"HasRequestParameters": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"RequestTimeout": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"RequestTimeoutPlaceholder": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"HasCompileModeLimitations": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		properties: {
			/**
			 * @private
			 */
			"_packageHierarchy": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage.properties#schemaManagerName
			 * @override
			 */
			schemaManagerName: "ServiceSchemaManager",

			/**
			 * @inheritdoc RootUserTaskPropertiesPage.properties#useNotification
			 * @override
			 */
			useNotification: true
		},
		methods: {

			//region Private

			/**
			 * @private
			 */
			_initServiceMethod: function(element) {
				if (!element.methodName) {
					return;
				}
				this.$ServiceMethod = this._getMethodByName(element.methodName);
			},

			/**
			 * @private
			 */
			_setServiceLookupValue: function(serviceSchema) {
				const lookupValue = this._getServiceSchemaLookupValue(serviceSchema);
				this.setSchema(lookupValue);
			},

			/**
			 * @private
			 */
			_getMethodByName: function(name) {
				var serviceSchema = this.$ServiceSchemaInstance;
				var schemaMethod = serviceSchema && serviceSchema.findMethodByName(name);
				return schemaMethod && this._createMethodListItem(schemaMethod);
			},

			/**
			 * @private
			 */
			_createMethodListItem: function(method) {
				return {
					value: method.name,
					displayValue: method.caption || method.name
				};
			},

			/**
			 * @private
			 */
			_getSchemaItemsQuery: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwWebServiceV2"
				});
				esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
				esq.addColumn("UId", "value");
				var filterGroup = Ext.create("Terrasoft.FilterGroup");
				var packageFilter = Terrasoft.createColumnInFilterWithParameters("PackageUId",
					this._packageHierarchy);
				filterGroup.add("PackageUId", packageFilter);
				esq.filters.addItem(filterGroup);
				return esq;
			},

			/**
			 * @private
			 */
			_getIsServiceSchemaDefined: function() {
				return Boolean(this.$ServiceSchemaInstance);
			},

			/**
			 * @private
			 */
			_showParametersLoadMask: function() {
				var config = {
					selector: ".sub-process-parameters-container:not(:first-child)",
					timeout: 0
				};
				return Terrasoft.Mask.show(config);
			},

			/**
			 * @private
			 */
			_showServiceSchemaPlaceholder: function() {
				var placeholder = this.$IsEmptyServiceSchemaList
					? this.get("Resources.Strings.ServiceSchemasEmptyListPlaceholder")
					: Terrasoft.emptyString;
				return placeholder;
			},

			/**
			 * @private
			 */
			_showServiceMethodPlaceholder: function() {
				var placeholder = this.$IsEmptyServiceMethodList
					? this.get("Resources.Strings.ServiceMethodsEmptyListPlaceholder")
					: Terrasoft.emptyString;
				return placeholder;
			},

			/**
			 * @private
			 */
			_getServiceSchemaLookupValue: function(schema) {
				return {
					value: schema.uId,
					displayValue: schema.caption || schema.name
				};
			},

			/**
			 * @private
			 */
			_loadServiceSchemaLookupValue: function(schemaUId, callback, scope) {
				this.getServiceSchemaInstance(schemaUId, function(schema) {
					callback.call(scope, this._getServiceSchemaLookupValue(schema));
				}, this);
			},

			/**
			 * @private
			 */
			_getMethodList: function(callback, scope) {
				var result = {};
				if (this.$ServiceSchema) {
					var schemaInstance = this.$ServiceSchemaInstance || {};
					Terrasoft.each(schemaInstance.methods, function(method) {
						result[method.name] = this._createMethodListItem(method);
					}, this);
				}
				Ext.callback(callback, scope, [result]);
			},

			/**
			 * @private
			 */
			_onPrepareMethodList: function(filter, list) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				this._getMethodList(function(schemas) {
					list.loadAll(schemas);
					this.$IsEmptyServiceMethodList = list.collection.length === 0;
				}, this);
			},

			/**
			 * @private
			 */
			_getChangeButtonConfig: function(buttonCaption) {
				return {
					className: "Terrasoft.Button",
					returnCode: "change",
					caption: buttonCaption,
					markerValue: buttonCaption
				};
			},

			/**
			 * @private
			 */
			_confirmMethodChange: function(oldMethod) {
				var buttonCaption = this.get("Resources.Strings.ChangeButtonCaption");
				var changeButton = this._getChangeButtonConfig(buttonCaption);
				var message = this.get("Resources.Strings.ChangeServiceMethodWarningMessage");
				this.showConfirmationDialog(message, function(returnCode) {
					if (returnCode === changeButton.returnCode) {
						this._onAfterMethodChanged();
					} else {
						this.$ServiceMethod = oldMethod;
					}
				}, [changeButton, Terrasoft.MessageBoxButtons.CANCEL.returnCode], {defaultButton: 0});
			},

			/**
			 * @private
			 */
			_setElementCaptionBySchema: function(element, schema) {
				var caption = element.defaultCaption;
				if (schema && !Terrasoft.isEmptyGUID(element.schemaUId)) {
					caption = schema.displayValue;
				}
				var filterFn = function(item, name) {
					return item.caption
						? (item.caption.getValue() === name && item.uId !== element.uId)
						: false;
				};
				var parentSchema = element.parentSchema;
				var flowElements = parentSchema.flowElements;
				var prefix = caption + " ";
				caption = processSchemaUserTaskUtilities.generateItemUniqueName(prefix, flowElements, filterFn);
				this.set("caption", caption);
				element.setLocalizableStringPropertyValue("caption", caption);
			},

			/**
			 * @private
			 */
			_onAfterMethodChanged: function() {
				var element = this.$ProcessElement;
				var methodName = this.$ServiceMethod && this.$ServiceMethod.value;
				element.setPropertyValue("MethodName", methodName);
				element.clearParamters();
				this.initSchemaParameters(element, this.$ServiceSchemaInstance);
				this._initRequestTimeout(element);
			},

			/**
			 * @private
			 */
			_revertSchemaAttribute: function() {
				if (!this.$ServiceSchema) {
					var element = this.$ProcessElement;
					var schemaUId = element.serviceSchemaUId;
					if (schemaUId && !Terrasoft.isEmptyGUID(schemaUId)) {
						this.$ServiceSchema = {
							value: schemaUId,
							displayValue: ""
						};
						this._loadServiceSchemaLookupValue(schemaUId, function(schema) {
							this.$ServiceSchema = schema;
						}, this);
					}
				}
			},

			/**
			 * @private
			 */
			_showServiceSchemaSettingsPage: function(schemaId) {
				var designerLocation = "ViewModule.aspx#CardModuleV2/WebServiceV2Page/" + schemaId;
				window.open(designerLocation);
			},

			/**
			 * @private
			 */
			_onOpenSchemaDesignerButtonClick: function() {
				var schema = this.$ServiceSchema;
				var schemaUId = schema && schema.value;
				this.$IsAddSchemaButtonClicked = Ext.isEmpty(schemaUId);
				if (schemaUId) {
					Terrasoft.ServiceSchemaManager.getItemByUId(schemaUId, function(item) {
						this._showServiceSchemaSettingsPage(item.id);
					}, this);
				} else {
					this._showServiceSchemaSettingsPage(Terrasoft.generateGUID());
				}
			},

			/**
			 * Synchronize element parameters with schema.
			 * @private
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element Process element.
			 * @param {Terrasoft.UserTaskSchema|null} schema New schema.
			 */
			_synchronizeParameters: function(element, schema) {
				if (schema === null) {
					element.clearParamters();
				} else {
					element.synchronizeParameters(schema);
				}
				this._checkHasRequestParameters(element);
			},

			/**
			 * @private
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element Process element.
			 */
			_checkHasRequestParameters: function(element) {
				var requestParameter = element.parameters.findByFn(function(parameter) {
					return parameter.direction === Terrasoft.ProcessSchemaParameterDirection.IN;
				}, this);
				this.$HasRequestParameters = Boolean(requestParameter);
			},

			/**
			 * @private
			 */
			_getRetryRequestTimeout: function() {
				var service = this.$ServiceSchemaInstance;
				var methodName = this.$ServiceMethod && this.$ServiceMethod.value;
				var method = methodName ? service.methods.findByPath("name", methodName) : null;
				var retryRequestTimeout = service && method ? method.getRetryRequestTimeout(service.retryCount) : 0;
				return retryRequestTimeout;
			},

			/**
			 * @private
			 */
			_initRequestTimeout: function(element) {
				var retryRequestTimeout = this._getRetryRequestTimeout();
				var placeholder = this.get("Resources.Strings.RequestTimeoutPlaceholder");
				this.$RequestTimeout = element.timeout > 0 ? this._toSeconds(element.timeout) : null;
				this.$RequestTimeoutPlaceholder = Ext.String.format(placeholder,
					this._toSeconds(retryRequestTimeout));
			},

			/**
			 * @private
			 */
			_toMilliseconds: function(seconds) {
				return seconds * 1000;
			},

			/**
			 * @private
			 */
			_toSeconds: function(milliseconds) {
				return Math.ceil(milliseconds / 1000);
			},

			/**
			 * @private
			 */
			_initSchemaProperties: function(element) {
				if (this.$ServiceSchemaInstance) {
					const lookupValue = this._getServiceSchemaLookupValue(this.$ServiceSchemaInstance);
					this.setSchema(lookupValue, { silent: true });
					element.setPropertyValue("ServiceSchemaUId", this.$ServiceSchemaInstance.uId);
					this._initServiceMethod(element);
					var links = element.parentSchema.findLinksToElements([element.name]);
					this.synchronizeActualSchemaParameters(element, this.$ServiceSchemaInstance);
					this.invalidateDependentElements(links);
				}
			},

			//endregion

			//region Protected

			/**
			 * @inheritdoc ProcessFlowElementPropertiesPage#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("RequestTimeout", this.positiveNumberValidator);
			},

			/**
			 * Returns list of service schemas.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getSchemaList: function(callback, scope) {
				scope = scope || this;
				var esq = this._getSchemaItemsQuery();
				esq.getEntityCollection(function(response) {
					var objects = {};
					var viewModelCollection = response.collection;
					var params = {
						collection: viewModelCollection,
						objects: objects
					};
					this.onLookupDataLoaded(params);
					Ext.callback(callback, scope, [objects]);
				}, scope);
			},

			/**
			 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
			 * @override
			 */
			onElementDataLoad: function(element, callback, scope) {
				var parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						parentMethod.call(this, element, next, this);
					},
					function(next) {
						this.getServiceSchemaInstance(element.serviceSchemaUId, next, this);
					},
					function(next, serviceSchema) {
						this.$ServiceSchemaInstance = serviceSchema;
						this._initSchemaProperties(element);
						this._initRequestTimeout(element);
						this.initBaseParameters(element);
						this.initHasCompileModeLimitations();
						callback.call(scope);
					}, this
				);
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema.
			 * @override
			 */
			getSchema: function() {
				return this.$ServiceSchema;
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema.
			 * @override
			 */
			setSchema: function(schema, options) {
				return this.set("ServiceSchema", schema, options);
			},

			/**
			 * Synchronizes element parameters with actual version service schema.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.ProcessWebServiceSchema} element Service element.
			 * @param {Object} actualSchema Actual version schema value.
			 */
			synchronizeActualSchemaParameters: function(element, actualSchema) {
				element.synchronizeParameters(actualSchema);
				this._checkHasRequestParameters(element);
				this.initBaseParameters(element, true);
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#onBeforeSchemaChanged.
			 * @override
			 */
			onBeforeSchemaChanged: function(model, newSchema) {
				var oldSchemaUId = this.$ProcessElement.serviceSchemaUId;
				var newSchemaUId = newSchema ? newSchema.value : Terrasoft.GUID_EMPTY;
				if (oldSchemaUId === newSchemaUId) {
					return;
				}
				if (Terrasoft.isEmptyGUID(oldSchemaUId) || Ext.isEmpty(this.$ServiceMethod)) {
					this.onAfterSchemaChanged();
					return;
				}
				this._loadServiceSchemaLookupValue(oldSchemaUId, function(oldSchema) {
					this.canChangeSchema(function(canChange) {
						if (canChange) {
							this.confirmSchemaChange(oldSchema);
						} else {
							this.$ServiceSchema = oldSchema;
						}
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#onBeforeSchemaChanged.
			 * @override
			 */
			onBeforeMethodChanged: function(model, newMethod) {
				var oldMethodName = this.$ProcessElement.methodName;
				var newMethodName = newMethod ? newMethod.value : "";
				if (oldMethodName === newMethodName) {
					return;
				}
				if (Ext.isEmpty(oldMethodName) || this.$IsEmptyParameters) {
					this._onAfterMethodChanged();
					return;
				}
				var oldMethod = this._getMethodByName(oldMethodName);
				this._confirmMethodChange(oldMethod);
			},

			/**
			 * @inheritdoc Terrasoft.RootUserTaskPropertiesPage#synchronizeSchemaParameters
			 * @override
			 */
			synchronizeSchemaParameters: function(callback, scope) {
				var maskId = this._showParametersLoadMask();
				Terrasoft.chain(
					function(next) {
						this.getServiceSchemaInstance(this.$ServiceSchema.value, next, this);
					},
					function(next, serviceSchema) {
						this.$ServiceSchemaInstance = serviceSchema;
						var element = this.$ProcessElement;
						this._setServiceLookupValue(serviceSchema);
						this._initServiceMethod(element);
						this.synchronizeActualSchemaParameters(element, serviceSchema);
						this._initRequestTimeout(element);
						this.initElementProperty(element, next, this);
						Terrasoft.Mask.hide(maskId);
						Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * @private
			 */
			_initDefaultServiceMethod: function(service) {
				if (service.methods && service.methods.getCount() === 1) {
					var serviceMethod = service.methods.first();
					this.$ServiceMethod = this._getMethodByName(serviceMethod.name);
				}
			},

			/**
			 * @inheritdoc Terrasoft.RootUserTaskPropertiesPage#onAfterSchemaCnahged
			 * @override
			 */
			onAfterSchemaChanged: function() {
				var element = this.$ProcessElement;
				var schemaUId = this.$ServiceSchema ? this.$ServiceSchema.value : Terrasoft.GUID_EMPTY;
				element.setPropertyValue("ServiceSchemaUId", schemaUId);
				element.setPropertyValue("MethodName", null);
				element.setPropertyValue("timeout", 0);
				if (this.$ServiceMethod) {
					this.$ServiceMethod = null;
				}
				this.set("ServiceMethodFocused", true);
				if (Terrasoft.isEmptyGUID(schemaUId)) {
					this.initSchemaParameters(element, null);
				} else {
					Terrasoft.chain(
						function(next) {
							this.getServiceSchemaInstance(schemaUId, next, this);
						},
						function(next, service) {
							this.$ServiceSchemaInstance = service;
							this._initDefaultServiceMethod(service);
							this.initSchemaParameters(element, service);
							this.initElementProperty(element, next, this);
						},
						this
					);
				}
				this._setElementCaptionBySchema(element, this.$ServiceSchema);
			},

			/**
			 * Get schema instance by uid.
			 * @protected
			 * @virtual
			 * @param {String} schemaUId Schema identifier.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope of callback function.
			 */
			getServiceSchemaInstance: function(schemaUId, callback, scope) {
				Terrasoft.ServiceSchemaManager.findInstanceByUId(schemaUId, callback, scope);
			},

			/**
			 * Returns Open/Add process designer button image config.
			 * @protected
			 * @param {Object} serviceSchema Process schema.
			 * @return {Object}
			 */
			getOpenServiceSchemaDesignerButtonImageConfig: function(serviceSchema) {
				if (serviceSchema) {
					return this.get("Resources.Images.OpenButtonImage");
				} else {
					return this.get("Resources.Images.AddButtonImage32");
				}
			},

			/**
			 * Returns flag indicating that the parameters label is visible.
			 * @return {Boolean}
			 */
			getIsParametersLabelVisible: function() {
				return Boolean(this.$ServiceSchema) && Boolean(this.$ServiceMethod);
			},

			/**
			 * Returns flag indicating that the empty message is visible.
			 * @return {Boolean}
			 */
			getIsEmptyMessageVisible: function() {
				return this.getIsParametersLabelVisible() && !this.$HasRequestParameters;
			},

			/**
			 * Returns Open/Add process designer button hint.
			 * @protected
			 * @param {Object} serviceSchema Process schema.
			 * @return {Object}
			 */
			getOpenServiceSchemaDesignerButtonHint: function(serviceSchema) {
				if (serviceSchema) {
					return this.get("Resources.Strings.OpenSchemaButtonHintCaption");
				} else {
					return this.get("Resources.Strings.AddSchemaButtonHintCaption");
				}
			},

			/**
			 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveValues
			 * @protected
			 * @override
			 */
			saveValues: function() {
				var milliseconds = this._toMilliseconds(this.$RequestTimeout);
				this.$ProcessElement.setPropertyValue("timeout", milliseconds);
				this.callParent(arguments);
				this._revertSchemaAttribute();
			},

			/**
			 * @inheritdoc RootUserTaskPropertiesPage#getSchema.
			 * @override
			 * @param {Terrasoft.BaseViewModelCollection} sortableCollection Parameters collection.
			 */
			sortParameterViewModelCollectionByCaption: function(sortableCollection) {
				this.callParent(arguments);
				sortableCollection.sortByFn(function(item1, item2) {
					return Number(item2.$IsRequired) - Number(item1.$IsRequired);
				});
			},

			/**
			 * Handles prepare list event.
			 * @param {Filter} filter lookup filter.
			 * @param {Terrasoft.Collection} list of service schemas.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The scope for the callback.
			 */
			onPrepareSchemaList: function(filter, list, callback, scope) {
				if (Terrasoft.isEmptyObject(list)) {
					return;
				}
				list.clear();
				this.getSchemaList(function(schemas) {
					list.loadAll(schemas);
					this.$IsEmptyServiceSchemaList = list.collection.length === 0;
					Ext.callback(callback, scope);
				}, this);
			},

			//endregion

			//region Methods: Protected

			/**
			 * Initialize schema parameters.
			 * @param {Terrasoft.manager.ProcessSchemaUserTask} element Process element.
			 * @param {Terrasoft.UserTaskSchema|null} schema New schema.
			 */
			initSchemaParameters: function(element, schema) {
				this._synchronizeParameters(element, schema);
				this.initBaseParameters(element, true);
				this.initHasCompileModeLimitations();
			},

			/**
			 * Initialize compilation mode attribute.
			 */
			initHasCompileModeLimitations: function() {
				if (this.isProcessSchemaCompiled()) {
					this.$HasCompileModeLimitations = !this.$Parameters.filterByFn(function(item) {
						return item.$Direction === Terrasoft.ProcessSchemaParameterDirection.IN &&
							Terrasoft.isEnumerableDataValueType(item.$DataValueType);
					}).isEmpty();
				} else {
					this.$HasCompileModeLimitations = false;
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					var executeConfig = {
						packageUId: this.$ProcessElement.parentSchema.packageUId,
						useCache: false
					};
					Terrasoft.SchemaDesignerUtilities.buildPackageHierarchy(executeConfig, function(hierarchy) {
						this._packageHierarchy = hierarchy;
						Ext.callback(callback, scope);
					}, this);
				}, this]);
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "WebServiceContainer",
				"propertyName": "items",
				"parentName": "EditorsContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "OpenSchemaDesignerButton",
				"parentName": "WebServiceContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"hint": {
						"bindTo": "ServiceSchema",
						"bindConfig": {
							"converter": "getOpenServiceSchemaDesignerButtonHint"
						}
					},
					"imageConfig": {
						"bindTo": "ServiceSchema",
						"bindConfig": {
							"converter": "getOpenServiceSchemaDesignerButtonImageConfig"
						}
					},
					"classes": {
						"wrapperClass": ["open-schema-designer-tool-button"]
					},
					"click": {"bindTo": "_onOpenSchemaDesignerButtonClick"},
					"layout": {
						"column": 22,
						"row": 1,
						"colSpan": 2
					}
				}
			},
			{
				"operation": "insert",
				"name": "ServiceSchemaLabel",
				"parentName": "WebServiceContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.ServiceSchemaEnumCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ServiceSchema",
				"parentName": "WebServiceContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22
					},
					"labelConfig": {"visible": false},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {
							"bindTo": "onPrepareSchemaList"
						},
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN,
						"placeholder": {
							"bindTo": "_showServiceSchemaPlaceholder"
						}
					},
					"wrapClass": ["top-caption-control", "placeholderOpacity"]
				}
			},
			{
				"operation": "insert",
				"parentName": "EditorsContainer",
				"name": "WebServiceMethodContainer",
				"propertyName": "items",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"visible": {"bindTo": "_getIsServiceSchemaDefined"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ServiceMethodLabel",
				"parentName": "WebServiceMethodContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.ServiceMethodEnumCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ServiceMethod",
				"parentName": "WebServiceMethodContainer",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.ServiceMethodEnumCaption"},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 22
					},
					"labelConfig": {"visible": false},
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {"bindTo": "_onPrepareMethodList"},
						"filterComparisonType": Terrasoft.StringFilterType.CONTAIN,
						"placeholder": {"bindTo": "_showServiceMethodPlaceholder"
						}
					},
					"wrapClass": ["top-caption-control", "placeholderOpacity"],
					"focused": {"bindTo": "ServiceMethodFocused"}
				}
			},
			{
				"operation": "insert",
				"name": "RequestTimeoutLabelWrapper",
				"parentName": "WebServiceMethodContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"visible": {
						"bindTo": "ServiceMethod",
						"bindConfig": {"converter": "toBoolean"}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RequestTimeoutLabel",
				"parentName": "RequestTimeoutLabelWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.RequestTimeout"},
					"classes": {
						"labelClass": [
							"t-title-label-proc",
							"t-title-label-info-button-proc"
						]
					}
				}
			},
			{
				"operation": "insert",
				"name": "RequestTimeoutInformation",
				"parentName": "RequestTimeoutLabelWrapper",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {"bindTo": "Resources.Strings.RequestTimeoutInformation"},
					"controlConfig": {"classes": {"wrapperClass": "request-timeout-information-button"}}
				}
			},
			{
				"operation": "insert",
				"name": "RequestTimeout",
				"parentName": "WebServiceMethodContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 22
					},
					"visible": {
						"bindTo": "ServiceMethod",
						"bindConfig": {"converter": "toBoolean"}
					},
					"placeholder": "$RequestTimeoutPlaceholder",
					"labelConfig": {"visible": false},
					"wrapClass": ["top-caption-control", "placeholderOpacity"]
				}
			},
			{
				"operation": "insert",
				"parentName": "EditorsContainer",
				"name": "WebServiceMethodParametersContainer",
				"propertyName": "items",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "WebServiceMethodParametersContainer",
				"name": "WebServiceMethodParametersLabelContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"classes": {
						"wrapClassName": ["not-compile", "label-container"]
					},
					"visible": {
						"bindTo": "getIsParametersLabelVisible"
					}
				}
			},
			{
				"operation": "insert",
				"name": "WebServiceMethodParametersLabel",
				"parentName": "WebServiceMethodParametersLabelContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.WebServiceRequestParametersCaption"
					},
					"classes": {
						"labelClass": ["t-title-label-proc"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "WebServiceMethodParametersLabelContainer",
				"propertyName": "items",
				"name": "WebServiceMethodParametersLabelInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": Terrasoft.Resources.ProcessSchemaDesigner.Messages.CollectionInCompileProcessInfoText,
					"controlConfig": {
						"visible": "$HasCompileModeLimitations"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "WebServiceMethodParametersContainer",
				"propertyName": "items",
				"name": "EmptyParametersMessage",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Resources.Strings.WebServiceMethodEmptyParametersMessage"
					},
					"visible": {
						"bindTo": "getIsEmptyMessageVisible"
					},
					"classes": {
						"labelClass": ["empty-parameters"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "WebServiceMethodParametersContainer",
				"propertyName": "items",
				"name": "WebServiceMethodParameterList",
				"values": {
					"generator": "ConfigurationItemGenerator.generateHierarchicalContainerList",
					"idProperty": "Id",
					"onItemClick": {
						"bindTo": "onItemClick"
					},
					"nestedItemsAttributeName": "ItemProperties",
					"nestedItemsContainerId": "nested-parameters",
					"collection": "Parameters",
					"defaultItemConfig": Ext.apply(Terrasoft.ProcessSchemaParameterViewConfig.generate("sub-process-"),
						{ "visible": "$isInputParameterAvailable" }),
					"classes": {
						"wrapClassName": ["sub-process-parameters-container"]
					},
					"rowCssSelector": ".paramContainer"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


