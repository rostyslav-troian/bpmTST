Terrasoft.configuration.Structures["WebServiceMethodPage"] = {innerHierarchyStack: ["WebServiceMethodPage"]};
define('WebServiceMethodPageStructure', ['WebServiceMethodPageResources'], function(resources) {return {schemaUId:'09cfe46e-ba2d-4bba-9f0d-d9decef0e4ac',schemaCaption: "Page schema: \"Web Services Method\"", parentSchemaName: "", schemaName:'WebServiceMethodPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WebServiceMethodPage", [
	"WebServiceMethodPageResources", "ServiceParameterGrid", "ServiceMetaItemViewModelMixin", "CurlRequestBuilder",
	"ServiceDesignerUtilities", "JsonRequestBuilder", "JsonResponseBuilder"
], function(resources) {
	return {
		messages: {
			/**
			 * @message CloseMethodPage
			 * Closed method page.
			 */
			"CloseMethodPage": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			observableItem: "Terrasoft.ObservableItem",
			serviceMetaItemViewModelMixin: "Terrasoft.ServiceMetaItemViewModelMixin",
			EntityResponseValidationMixin: "Terrasoft.EntityResponseValidationMixin"
		},
		properties: {
			useItemInitialValues: true,
			useViewModelToItemBinding: true,
			_managerItemStatus: null,
			_managerItem: null
		},
		attributes: {

			/**
			 * Caption.
			 */
			"Caption": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"isRequired": true,
				"validateOrder": 0
			},

			/**
			 * Name.
			 */
			"Name": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"isRequired": true,
				"validateOrder": 1
			},

			/**
			 * Terrasoft.ServiceMethodResponse.
			 */
			"Response": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			},

			/**
			 * Terrasoft.ServiceMethodRequest.
			 */
			"Request": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			},

			/**
			 * Request URI.
			 */
			"Uri": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"onChange": "_onUriAttributeChange",
				"isRequired": true,
				"validateOrder": 3
			},

			/**
			 * Request Content Type.
			 */
			"Content": {
				"dataValueType": Terrasoft.DataValueType.ENUM,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": "JSON"
			},

			/**
			 * Request Http Method Type.
			 */
			"HttpMethod": {
				"dataValueType": Terrasoft.DataValueType.ENUM,
				"onChange": "_onServiceMethodRequestAttributeChange"
			},

			/**
			 * Request Http Method Type.
			 */
			"HttpMethodType": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onMethodTypeChange",
				"isRequired": true,
				"validateOrder": 4
			},

			/**
			 * Request method type list.
			 */
			"HttpMethodTypeList": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Request parameters.
			 */
			"Parameters": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			},

			/**
			 * Request timeout.
			 */
			"RequestTimeout": {
				"dataValueType": Terrasoft.DataValueType.INTEGER,
				"isRequired": true,
				"validateOrder": 5
			},

			/**
			 * Method UId.
			 */
			"MethodUId": {
				"dataValueType": Terrasoft.DataValueType.GUID,
				"value": null
			},

			/**
			 * Service UId.
			 */
			"ServiceUId": {
				"dataValueType": Terrasoft.DataValueType.GUID,
				"value": null
			},

			/**
			 * Method object.
			 */
			"Method": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"onChange": "_onMethodChange"
			},

			/**
			 * Service schema instance.
			 */
			"ServiceSchema": {
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Full Request URI.
			 */
			"FullUri": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Is allow edit fields.
			 */
			"CanEditSchema": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"onChange": "_setShowAccessInfo"
			},

			/**
			 * Is show access info.
			 */
			"ShowAccessInfo": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Use service authentification info.
			 */
			"UseAuthInfo": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Indicates is sse service authentification info can be changed.
			 */
			"CanChangeUseAuthInfo": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Can open Uri request builder.
			 */
			"CanOpenUriRequestBuilder": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},

			/**
			 * Save tab active name.
			 */
			"ActiveTabName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Tabs collection.
			 */
			"TabsCollection": {
				"dataValueType": Terrasoft.DataValueType.COLLECTION,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		modules: {
			"ServiceRequestParameters": {
				"moduleId": "ServiceRequestParameters",
				"moduleName": "ConfigurationModuleV2",
				"reload": false,
				"config": {
					"isSchemaConfigInitialized": false,
					"schemaName": "ServiceParameterGrid",
					"parameters": {
						"viewModelConfig": {
							"ServiceSchemaUId": {
								"attributeValue": "ServiceUId"
							},
							"MethodUId": {
								"getValueMethod": "getMethodUId"
							}
						}
					},
					"useHistoryState": false
				}
			},
			"ServiceResponseParameters": {
				"moduleId": "ServiceResponseParameters",
				"moduleName": "ConfigurationModuleV2",
				"reload": false,
				"config": {
					"isSchemaConfigInitialized": false,
					"schemaName": "ServiceResponseParameterGrid",
					"parameters": {
						"viewModelConfig": {
							"ServiceSchemaUId": {
								"attributeValue": "ServiceUId"
							},
							"MethodUId": {
								"getValueMethod": "getMethodUId"
							}
						}
					},
					"useHistoryState": false
				}
			}
		},
		methods: {

			//region Private

			/**
			 * @private
			 */
			_hasNewUriParameters: function() {
				const parameterNames = this._getNewUriParametersNames();
				return parameterNames.length > 0;
			},

			/**
			 * @private
			 */
			_getUriParametersNames: function() {
				const uriParametersJson = this._getUriParametersJson();
				return {
					uri: _.keys(uriParametersJson.request.uri),
					query: _.keys(uriParametersJson.request.query)
				};
			},

			/**
			 * @private
			 */
			_hasUriParameters: function() {
				const uriParametersNames = this._getUriParametersNames();
				var allUriParametersNames = uriParametersNames.uri.concat(uriParametersNames.query);
				return allUriParametersNames.length > 0;
			},

			/**
			 * @private
			 */
			_getNewUriParametersNames: function() {
				const uriParametersNames = this._getUriParametersNames();
				const serviceParameterTypeEnum = Terrasoft.services.enums.ServiceParameterType;
				const queryParameters = this._findParametersByType(serviceParameterTypeEnum.QUERY_STRING);
				const urlSegments = this._findParametersByType(serviceParameterTypeEnum.URL_SEGMENT);
				const urlSegmentsDifference = _.difference(uriParametersNames.uri,
						_.pluck(urlSegments.getItems(), "path"));
				const queryParametersDifference = _.difference(uriParametersNames.query,
						_.pluck(queryParameters.getItems(), "path"));
				return urlSegmentsDifference.concat(queryParametersDifference);
			},

			/**
			 * @private
			 */
			_getUriParametersJson: function() {
				const uriConverter = new Terrasoft.UriJsonConverter();
				return uriConverter.convert(this.$Uri);
			},

			/**
			 * @private
			 */
			_onMethodChange: function() {
				this.subscribeOnItemChanged(this.$Method);
			},

			/**
			 * @private
			 */
			_onSchemaChanged: function(changes) {
				if (this.needValidateUri(changes)) {
					this.validateColumn("Uri");
				}
				if (changes.uri) {
					this._updateMethodUri(changes.uri);
				}
				this._updateCanOpenUriRequestBuilderAttribute();
				this._updateFullUri();
				this.$CanChangeUseAuthInfo = this._hasServiceAuthentification();
				if (changes.httpMethodType) {
					this.$HttpMethodType = {
						displayValue: this.$Method.request.findHttpMethodTypeName(),
						value: this.$Method.request.httpMethodType
					};
				}
			},

			/**
			 * @private
			 */
			_updateMethodUri: function(uri) {
				uri = uri.trim();
				var domain = Terrasoft.getUrlDomain(uri);
				if (Ext.isEmpty(this.$ServiceSchema.baseUri) && domain) {
					this.$ServiceSchema.setPropertyValue("baseUri", domain);
				}
				if (domain) {
					uri = uri.replace(domain, "");
				}
				Terrasoft.defer(function() {
					this.$Uri = uri;
				}, this);
			},

			/**
			 * @private
			 */
			_initMethodParameters: function() {
				this.$Request = this.$Method.request;
				this.$Response = this.$Method.response;
				this.$RequestTimeout = this.$Method.requestTimeout;
				this.set("HttpMethod", this.$Method.request.httpMethodType, {silent: true});
				this.$HttpMethodType = {
					displayValue: this.$Method.request.findHttpMethodTypeName(),
					value: this.$Method.request.httpMethodType
				};
				this.set("Parameters", this.$Method.request.parameters, {silent: true});
				this.$Parameters.on("add", this._onAddRequestParameter, this);
				if (this.$Method.name) {
					this.$Name = this.$Method.name;
				}
				if (this.$Method.request.uri) {
					this.set("Uri", this.$Method.request.uri, {silent: true});
					this._updateFullUri(this.$Method.request.uri);
				}
				this.$UseAuthInfo = this.$Method.useAuthInfo;
				this.$CanChangeUseAuthInfo = this._hasServiceAuthentification() && this.$CanEditSchema;
				var caption = this.$Method.caption.getValue();
				if (caption) {
					this.$Caption = caption;
				}
			},

			/**
			 * @private
			 */
			_hasServiceAuthentification: function() {
				var authInfo = this.$ServiceSchema.authInfo;
				return (authInfo && authInfo.authType) !== Terrasoft.services.enums.AuthType.None;
			},

			/**
			 * @private
			 */
			_getUniqueValue: function(items, property, prefix) {
				var properties = items.mapArray(function(item) {
					return item[property].toString();
				}, this);
				return Terrasoft.getUniqueValue(properties, prefix);
			},

			/**
			 * @private
			 */
			_getNamePrefix: function() {
				var usrPrefix = Terrasoft.ServiceSchemaManager.schemaNamePrefix;
				return usrPrefix + "Method";
			},

			/**
			 * @private
			 */
			_createNewMethod: function() {
				var method = new Terrasoft.ServiceMethod({_serviceSchema: this.$ServiceSchema});
				var namePrefix = this._getNamePrefix();
				var captionPrefix = this.get("Resources.Strings.MethodCaptionPrefix") + " ";
				var methods = this.$ServiceSchema.methods;
				var caption = this._getUniqueValue(methods, "caption", captionPrefix);
				method.caption = new Terrasoft.LocalizableString(caption);
				method.name = this._getUniqueValue(methods, "name", namePrefix);
				method.uri = "";
				method.uId = Terrasoft.generateGUID();
				method.useAuthInfo =
					this.$ServiceSchema.authInfo.authType !== Terrasoft.services.enums.AuthType.None;
				this.$MethodUId = method.uId;
				this.$Method = method;
				methods.add(method.uId, method);
				this._initMethodParameters();
			},

			/**
			 * @private
			 */
			_getSchemaPropertyByAttributeName: function(attributeName) {
				return Terrasoft.toLowerCamelCase(attributeName);
			},

			/**
			 * @private
			 */
			_onUriAttributeChange: function(model, value) {
				this._updateFullUri(value);
				this._onServiceMethodRequestAttributeChange(model, value);
			},

			/**
			 * Update FullUri attribute to display.
			 * @param uri
			 * @private
			 */
			_updateFullUri: function(uri) {
				var baseUri = this.$ServiceSchema.baseUri;
				this.$FullUri = uri === null ? baseUri : baseUri + this._appendQueryParameters(uri);
			},

			/**
			 * @private
			 */
			_findParametersByType: function(parametersType) {
				return this.$Parameters.filterByPath("type", parametersType);
			},

			/**
			 * @private
			 */
			_appendQueryParameters: function(uri) {
				if (!uri) {
					uri = this.$Uri || "";
				}
				const defaultValue = this.get("Resources.Strings.DefaultParameterValue");
				const queryPart = this._findParametersByType(Terrasoft.services.enums.ServiceParameterType.QUERY_STRING)
						.map(function(parameter) {
							if (!Ext.isEmpty(parameter.defValue.value)) {
								const defValue = Terrasoft.ServiceDesignerUtilities.getFormattedValue(parameter.defValue,
										parameter.dataValueTypeName);
								return parameter.path + "=" + (parameter.defValue.source ===
								Terrasoft.services.enums.ServiceParameterValueSource.CONST
										? defValue
										: "{" + defValue + "}");
							} else {
								return Ext.String.format("{0}={{1}}", parameter.path, defaultValue);
							}
						})
						.getItems()
						.join("&");
				return uri + (queryPart ? "?" + queryPart : queryPart);
			},

			/**
			 * @private
			 */
			_onServiceMethodRequestAttributeChange: function(model, value) {
				if (this.$Request) {
					this._onAttributeChange(this.$Request, model, value);
				}
			},

			/**
			 * @private
			 */
			_onAddRequestParameter: function() {
				this._updateCanOpenUriRequestBuilderAttribute();
				this._updateFullUri();
			},

			/**
			 * @private
			 */
			_onAttributeChange: function(attribute, model, value) {
				var changedAttribute = Terrasoft.first(Object.keys(model.changed));
				var schemaProperty = this._getSchemaPropertyByAttributeName(changedAttribute);
				if (Terrasoft.isInstanceOfClass(attribute[schemaProperty], "Terrasoft.LocalizableString")) {
					attribute[schemaProperty].setValue(value);
				} else {
					attribute.setPropertyValue(schemaProperty, value);
				}
			},

			/**
			 * Returns Web Service type list.
			 * @private
			 * @return {Object} type list.
			 */
			_getListTypes: function(enumType) {
				var result = {};
				Terrasoft.each(enumType, function(key, type) {
					if (type === "UNDEFINED") {
						return;
					}
					result[key] = {value: key, displayValue: type};
				}, this);
				return result;
			},

			/**
			 * Fill HTTP method type list.
			 * @private
			 * @param {String} filter The filter string.
			 * @param {Terrasoft.Collection} list The list.
			 */
			_prepareMethodTypeList: function(filter, list) {
				this._reloadTypeList(Terrasoft.services.enums.HttpMethodType, filter, list);
			},

			/**
			 * Reload type list.
			 * @param enumList
			 * @param filter
			 * @param list
			 * @private
			 */
			_reloadTypeList: function(enumList, filter, list) {
				if (list === null) {
					return;
				}
				list.reloadAll(this._getListTypes(enumList));
			},

			/**
			 * @private
			 */
			_onMethodTypeChange: function(model, valueType) {
				if (valueType) {
					this._requestTypeValidator(valueType.value, function(result) {
						if (result.invalidMessage) {
							var previousValue = this.getPrevious("HttpMethodType");
							Terrasoft.defer(function() {
								this.$HttpMethodType = previousValue;
							}, this);
							this.showInformationDialog(result.invalidMessage);
						} else {
							this.$HttpMethod = valueType && valueType.value;
						}
					}, this);
				}
			},

			/**
			 * @private
			 */
			_copyMethod: function(method) {
				var namePrefix = this._getNamePrefix();
				var methods = this.$ServiceSchema.methods;
				var serializedMethod = method.serialize();
				var metaData = JSON.parse(serializedMethod);
				metaData.uId = Terrasoft.generateGUID();
				metaData.name = this._getUniqueValue(methods, "name", namePrefix);
				metaData.caption = method.caption + " - Copy";
				metaData._serviceSchema = this.$ServiceSchema;
				this.$MethodUId = metaData.uId;
				var copyMethod = new Terrasoft.ServiceMethod(metaData);
				this.$IsChanged = true;
				methods.add(this.getMethodUId(), copyMethod);
				return copyMethod;
			},

			/**
			 * Initialize request method.
			 * @private
			 */
			_initMethod: function(callback, scope) {
				Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceUId, function(instance) {
					this.$ServiceSchema = instance;
					this._managerItem = Terrasoft.ServiceSchemaManager.items.get(this.$ServiceUId);
					this._managerItemStatus = this._managerItem.getStatus();
					Terrasoft.ServiceDesignerUtilities.canEditSchema(instance, function(result) {
						this.$CanEditSchema = result;
						var method = instance.methods.findByFn(function(i) {
							return i.uId === this.$MethodUId;
						}, this);
						if (method) {
							this.$Method = this._isCopyMode() ? this._copyMethod(method) : method;
							this._initMethodParameters();
							this.$Method.saveState();
							this.$ShowDiscardButton = true;
						} else {
							this._createNewMethod();
						}
						this._updateCanOpenUriRequestBuilderAttribute();
						this.$ServiceSchema.on("changed", this._onSchemaChanged, this);
						Ext.callback(callback, scope);
					}, this);
				}, this);
			},

			/**
			 * @private
			 */
			_getParametersByType: function(type) {
				return this.$Method.request.parameters.filterByFn(function(item) {
					return item.type === type;
				}, this);
			},

			/**
			 * @private
			 */
			_uriEmptyBracketValidator: function(uriString) {
				var message = uriString.match(/{}/g) ? this.get("Resources.Strings.WrongUrisEmptyBracketsMessage") : "";
				return {invalidMessage: message};
			},

			/**
			 * @private
			 */
			_uriPairedBracketValidator: function(uriString) {
				var message = "";
				var brackets = uriString.replace(/[^{|}]/g, "");
				var unPairedBrackets = brackets.replace(/{}/g, "");
				if (unPairedBrackets.length) {
					message = this.get("Resources.Strings.WrongUrisBracketsMessage");
				}
				return {invalidMessage: message};
			},

			/**
			 * @private
			 */
			_requestTypeValidator: function(type, callback, scope) {
				var validationResult = {
					invalidMessage: ""
				};
				if (type === Terrasoft.services.enums.HttpMethodType.GET) {
					Terrasoft.chain(
							function(next) {
								Terrasoft.ServiceSchemaManager.findRequestParameterByType({
									serviceUId: this.$ServiceSchema.uId,
									methodUId: this.$Method.uId,
									type: Terrasoft.services.enums.ServiceParameterType.BODY
								}, next, this);
							},
							function(next, parameter) {
								if (parameter) {
									validationResult.invalidMessage = this.get("Resources.Strings.WrongRequestTypeMessage");
								}
								Ext.callback(callback, scope, [validationResult]);
							}, this);
				} else {
					Ext.callback(callback, scope, [validationResult]);
				}
			},

			/**
			 * @private
			 */
			_setShowAccessInfo: function() {
				this.$ShowAccessInfo = !this.$CanEditSchema;
			},

			/**
			 * @private
			 */
			_isCopyMode: function() {
				return this.$Operation === Terrasoft.ConfigurationEnums.CardOperation.COPY;
			},

			/**
			 * @private
			 */
			_isNewMode: function() {
				return this._isAddMode() || this._isCopyMode();
			},

			/**
			 * @private
			 */
			_isAddMode: function() {
				return this.$Operation === Terrasoft.ConfigurationEnums.CardOperation.ADD;
			},

			/**
			 * @private
			 */
			_getDefaultTabName: function() {
				var defaultTabName = null;
				if (this.$TabsCollection && !this.$TabsCollection.isEmpty()) {
					var firstTab = this.$TabsCollection.getByIndex(0);
					defaultTabName = firstTab.get("Name");
				}
				return defaultTabName;
			},

			/**
			 * @private
			 */
			_initTabs: function() {
				var defaultTabName = this._getDefaultTabName();
				if (defaultTabName) {
					this.$ActiveTabName = defaultTabName;
					this.set(defaultTabName, true);
				}
			},

			/**
			 * @private
			 */
			_activeTabChange: function(activeTab) {
				var activeTabName = activeTab.get("Name");
				this.$TabsCollection.eachKey(function(tabName, tab) {
					var tabContainerVisibleBinding = tab.get("Name");
					this.set(tabContainerVisibleBinding, false);
				}, this);
				this.set(activeTabName, true);
			},

			/**
			 * @private
			 */
			_close: function() {
				this.sandbox.publish("CloseMethodPage");
				Terrasoft.utils.dom.setAttributeToBody("hide-scroll", false);
			},

			/**
			 * @private
			 */
			_getActiveTabName: function(schemaName) {
				return Terrasoft.contains(["JsonResponseBuilder", "RawResponseBuilder"], schemaName)
						? "ResponseTab"
						: "RequestTab";
			},

			/**
			 * @private
			 */
			_showQuickSetupWindow: function(schemaName, uri) {
				if (this.$CanEditSchema) {
					var pageId = this.sandbox.id + schemaName;
					this.sandbox.loadModule("ModalBoxSchemaModule", {
						id: pageId,
						instanceConfig: {
							moduleInfo: {
								uri: uri,
								schemaName: schemaName,
								destinationServiceUId: this.$ServiceUId,
								destinationMethodUId: this.$MethodUId
							},
							mainContainerWrapClasses: ["service-quick-setup-wrap"],
							headerWrapClasses: ["service-quick-setup-header-wrap"],
							initialSize: {width: 920, height: "calc(100% - 146px)"}
						}
					});
					this.$ActiveTabName = this._getActiveTabName(schemaName);
				} else {
					this.showInformationDialog(this.get("Resources.Strings.AccessDeny"));
				}
			},

			/**
			 * @private
			 */
			_validateUri: function(callback, scope) {
				if (this._hasNewUriParameters()) {
					var parameterNames = this._getNewUriParametersNames();
					var confirmationMessage;
					var template = this.get("Resources.Strings.WrongUriMessage");
					if (parameterNames.length === 1) {
						confirmationMessage = this.Ext.String.format(template, parameterNames[0]);
					}
					if (parameterNames.length > 1) {
						template = this.get("Resources.Strings.WrongUrisMessage");
						confirmationMessage = this.Ext.String.format(template, parameterNames.join(", "));
					}
					this.showConfirmationDialog(confirmationMessage,
							function(returnCode) {
								if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
									this.openUriRequestBuilder();
								}
								callback.call(scope, false);
							}, ["yes", "no"]);
				} else {
					callback.call(scope, true);
				}
			},

			/**
			 * @private
			 */
			_updateCanOpenUriRequestBuilderAttribute: function() {
				this.$CanOpenUriRequestBuilder = this.$Uri && this._hasNewUriParameters();
			},

			//endregion

			//region Protected

			/**
			 * @return {Terrasoft.controls.ButtonEnums.style}
			 * @protected
			 */
			getCancelButtonStyle: function() {
				return this.$CanEditSchema
						? Terrasoft.controls.ButtonEnums.style.DEFAULT
						: Terrasoft.controls.ButtonEnums.style.BLUE;
			},

			/**
			 * @inheritdoc Terrasoft.ServiceMetaItemViewModelMixin#duplicateNameValidator.
			 * @overridden
			 */
			duplicateNameValidator: function(schemaName) {
				var message = "";
				Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceUId, function(item) {
					var method = item.methods.findByFn(function(i) {
						return i.name === schemaName;
					}, this);
					if (method && method.uId !== this.$Method.uId) {
						message = this.get("Resources.Strings.DuplicateNameMessage");
					}
				}, this);
				return {invalidMessage: message};
			},

			/**
			 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
			 * @override
			 */
			getAttributeMap: function() {
				return {
					caption: "Caption",
					name: "Name",
					response: "Response",
					request: "Request",
					parameters: "Parameters",
					requestTimeout: "RequestTimeout",
					useAuthInfo: "UseAuthInfo"
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				if (this.$Parameters) {
					this.$Parameters.un("add", this._onAddRequestParameter, this);
				}
				this.unsubscribeAllItems();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getPageHeader
			 * @override
			 */
			getPageHeader: function() {
				return (this.$Method && this.$Method.caption.getValue()) || "";
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @override
			 */
			onDiscardChangesClick: function() {
				if (this._isNewMode()) {
					this.$ServiceSchema.methods.removeByKey(this.getMethodUId());
				} else {
					this.$Method.restoreState();
					this._initMethodParameters();
				}
				this._close();
				this._managerItem.setStatus(this._managerItemStatus);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.setNameValidationConfig();
				this.addColumnValidator("RequestTimeout", this.positiveNumberValidator);
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
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				Terrasoft.utils.dom.setAttributeToBody("hide-scroll", true);
				this.callParent([
					function() {
						Terrasoft.chain(
								function(next) {
									Terrasoft.ServiceSchemaManager.initialize(next, this);
								},
								function(next) {
									this._initMethod(next, this);
								},
								function() {
									this._initTabs();
									callback.call(scope || this);
								}, this);
					}, this
				]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#loadEntity
			 * @override
			 */
			loadEntity: function(primaryColumnValue, callback, scope) {
				callback.call(scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#copyEntity
			 * @override
			 */
			copyEntity: function(primaryColumnValue, callback, scope) {
				callback.call(scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getColumnCaptionByName.
			 * @overridden
			 */
			getColumnCaptionByName: function(name) {
				var caption;
				switch (name) {
					case "Name":
						caption = this.get("Resources.Strings.CodeCaption");
						break;
					case "Caption":
						caption = this.get("Resources.Strings.MethodNameCaption");
						break;
					case "Uri":
						caption = this.get("Resources.Strings.UriCaption");
						break;
					case "HttpMethodType":
						caption = this.get("Resources.Strings.HttpMethodTypeCaption");
						break;
					case "RequestTimeout":
						caption = this.get("Resources.Strings.RequestTimeoutCaption");
						break;
					default:
						caption = this.callParent(arguments);
				}
				return caption;
			},

			/**
			 * Return MethodUId.
			 * @return {GUID} methodUId.
			 */
			getMethodUId: function() {
				return this.$MethodUId;
			},

			/**
			 * Ok button click handler.
			 */
			onOkButtonClick: function() {
				var defaultUriValidation = _.toArray(this.validationConfig.Uri);
				this.addColumnValidator("Uri", this._uriEmptyBracketValidator);
				this.addColumnValidator("Uri", this._uriPairedBracketValidator);
				this.asyncValidate(function(response) {
					this.validationConfig.Uri = defaultUriValidation;
					if (this.validateResponse(response)) {
						this._validateUri(function(canSave) {
							if (canSave) {
								this.$Method.saveState();
								this._close();
							}
						}, this);
					}
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#asyncValidate
			 * @overridden
			 */
			asyncValidate: function(callback, scope) {
				var resultObject = {
					success: this.validate()
				};
				if (!resultObject.success) {
					resultObject.message = this.getValidationMessage();
				}
				this.Ext.callback(callback, scope, [resultObject]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#validate
			 * @overridden
			 */
			validate: function() {
				return this.$CanEditSchema ? this.callParent(arguments) : true;
			},

			/**
			 * Checks if need validate uri path.
			 * @param {Object} changes Contains changes of object.
			 * @protected
			 */
			needValidateUri: function(changes) {
				if (changes) {
					var keys = Object.keys(changes);
					var isChangedParameters = keys.filter(function(key) {
						return key.indexOf("parameter") !== -1;
					});
					return isChangedParameters.length && !Ext.isEmpty(this.$Uri);
				} else {
					return false;
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * Quick setup from cURL button handler.
			 */
			openCurlRequestBuilder: function() {
				this._showQuickSetupWindow("CurlRequestBuilder");
			},

			/**
			 * Quick setup request from Raw button handler.
			 */
			openRawRequestBuilder: function() {
				this._showQuickSetupWindow("RawRequestBuilder");
			},

			/**
			 * Quick setup response from Raw button handler.
			 */
			openRawResponseBuilder: function() {
				this._showQuickSetupWindow("RawResponseBuilder");
			},

			/**
			 * Quick setup Request from JSON button handler.
			 */
			openJsonRequestBuilder: function() {
				this._showQuickSetupWindow("JsonRequestBuilder");
			},

			/**
			 * Quick setup Response from JSON button handler.
			 */
			openJsonResponseBuilder: function() {
				this._showQuickSetupWindow("JsonResponseBuilder");
			},

			/**
			 * Open uri request builder handler in quick setup.
			 */
			onQuickSetupUriRequestBuilderClick: function() {
				if (this.$Uri && this._hasUriParameters()) {
					this.openUriRequestBuilder();
				} else {
					this.showInformationDialog(this.get("Resources.Strings.QuickSetupEmptyUriMessage"));
				}
			},

			/**
			 * Open uri request builder handler.
			 */
			openUriRequestBuilder: function() {
				this._showQuickSetupWindow("UriRequestBuilder", this.$Uri);
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ServiceMethodPageWrapper",
				"values": {
					"id": "ServiceMethodPageWrapper",
					"selectors": {"wrapEl": "#ServiceMethodPageWrapper"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["card-content-container", "web-service-method-card-content-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "ServiceMethodPageWrapper",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["web-service-method-header-container"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ServiceMethodPageContentContainer",
				"parentName": "ServiceMethodPageWrapper",
				"propertyName": "items",
				"values": {
					"id": "ServiceMethodPageContentContainer",
					"selectors": {"wrapEl": "#ServiceMethodPageContentContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["web-service-method-page-center-main-container", "center-main-container"],
					"items": [],
					"markerValue": "CenterMainContainer"
				}
			},
			{
				"operation": "insert",
				"name": "ActionContainer",
				"parentName": "ServiceMethodPageContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["web-service-method-action-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "MainContainer",
				"parentName": "ServiceMethodPageContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-container-margin-bottom", "web-service-method-page-main-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-container-margin-bottom", "web-service-method-page-side-padding"],
					"items": [],
					"markerValue": {"bindTo": "HeaderContainerMarkerValue"}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderCaptionContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header-caption-container-margin"],
					"visible": {
						"bindTo": "_isNewMode"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "NewRecordPageCaption",
				"parentName": "HeaderCaptionContainer",
				"propertyName": "items",
				"values": {
					"labelClass": ["new-record-header-caption-label"],
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "NewRecordPageCaption"},
					"visible": {"bindTo": "checkNewRecordPageCaptionSet"}
				}
			},
			{
				"operation": "insert",
				"name": "Header",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": [],
					"collapseEmptyRow": true
				}
			},
			{
				"operation": "insert",
				"name": "TabsContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"className": "Terrasoft.LazyContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["web-service-method-page-side-padding", "web-service-method-page-tabs"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Tabs",
				"parentName": "TabsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TAB_PANEL,
					"activeTabChange": {"bindTo": "_activeTabChange"},
					"activeTabName": {"bindTo": "ActiveTabName"},
					"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
					"collection": {"bindTo": "TabsCollection"},
					"tabs": []
				}
			},
			{
				"operation": "remove",
				"name": "actions"
			},
			{
				"operation": "remove",
				"name": "PrintButton"
			},
			{
				"operation": "insert",
				"name": "Caption",
				"values": {
					"controlConfig": {
						"focused": true
					},
					"layout": {"column": 0, "row": 0, "colSpan": 14},
					"bindTo": "Caption",
					"caption": {"bindTo": "Resources.Strings.MethodNameCaption"},
					"enabled": {
						"bindTo": "CanEditSchema"
					}
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "HttpMethodType",
				"values": {
					"layout": {"column": 15, "row": 0, "colSpan": 9},
					"bindTo": "HttpMethodType",
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"caption": {"bindTo": "Resources.Strings.HttpMethodTypeCaption"},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {"bindTo": "_prepareMethodTypeList"}
					},
					"enabled": {
						"bindTo": "CanEditSchema"
					}
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {"column": 0, "row": 1, "colSpan": 14},
					"bindTo": "Name",
					"caption": {"bindTo": "Resources.Strings.CodeCaption"},
					"enabled": {
						"bindTo": "CanEditSchema"
					},
					"tip": {"content": "$Resources.Strings.CodeHint"}
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "Content",
				"values": {
					"layout": {"column": 15, "row": 1, "colSpan": 9},
					"bindTo": "Content",
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"caption": {"bindTo": "Resources.Strings.ContentTypeCaption"},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "Uri",
				"values": {
					"layout": {"column": 0, "row": 2, "colSpan": 14},
					"bindTo": "Uri",
					"caption": {"bindTo": "Resources.Strings.UriCaption"},
					"enabled": {
						"bindTo": "CanEditSchema"
					},
					"tip": {"content": "$Resources.Strings.AddressHint"},
					"controlConfig": {
						"rightIconClick": "$openUriRequestBuilder",
						"enableRightIcon": "$CanOpenUriRequestBuilder",
						"rightIconConfig": {
							"source": Terrasoft.ImageSources.URL,
							"url": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.WizardIcon)
						},
						"rightIconClasses": ["open-web-service-method-builder-right-icon"]
					}
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "FullUri",
				"values": {
					"contentType": Terrasoft.ContentType.LONG_TEXT,
					"layout": {"column": 0, "row": 3, "colSpan": 14},
					"bindTo": "FullUri",
					"caption": {"bindTo": "Resources.Strings.FullUriCaption"},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "UseAuthInfo",
				"values": {
					"contentType": Terrasoft.ContentType.LONG_TEXT,
					"layout": {"column": 15, "row": 3, "colSpan": 9},
					"bindTo": "UseAuthInfo",
					"caption": {"bindTo": "Resources.Strings.UseAuthInfoCaption"},
					"enabled": "$CanChangeUseAuthInfo"
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "RequestTimeout",
				"values": {
					"layout": {"column": 15, "row": 2, "colSpan": 9},
					"bindTo": "RequestTimeout",
					"caption": {"bindTo": "Resources.Strings.RequestTimeoutCaption"},
					"enabled": {
						"bindTo": "CanEditSchema"
					}
				},
				"parentName": "Header",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "RequestTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.RequestTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "RequestParameters",
				"parentName": "RequestTab",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"controlConfig": {
						"collapsed": false
					},
					"markerValue": "RequestParameters"
				}
			},
			{
				"operation": "insert",
				"parentName": "RequestParameters",
				"name": "ServiceRequestParameters",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"classes": {"wrapClass": ["height-100-percentage"]}
				}
			},
			{
				"operation": "insert",
				"name": "ResponseTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"classes": {"wrapClass": ["height-100-percentage"]},
					"caption": {"bindTo": "Resources.Strings.ResponseTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ResponseParameters",
				"parentName": "ResponseTab",
				"propertyName": "items",
				"index": 0,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"controlConfig": {
						"collapsed": false
					},
					"markerValue": "RequestParameters"
				}
			},
			{
				"operation": "insert",
				"parentName": "ResponseParameters",
				"name": "ServiceResponseParameters",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE,
					"classes": {"wrapClass": ["height-100-percentage"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "OKButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"visible": {"bindTo": "CanEditSchema"},
					"click": {"bindTo": "onOkButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"tag": "ok",
					"markerValue": "ok"
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "DiscardChangesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"style": {"bindTo": "getCancelButtonStyle"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "onDiscardChangesClick"}
				}
			},
			{
				operation: "insert",
				name: "QuickSetupButton",
				parentName: "ActionContainer",
				propertyName: "items",
				values: {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
					caption: {bindTo: "Resources.Strings.QuickSetupButtonCaption"},
					imageConfig: {bindTo: "Resources.Images.WizardIcon"},
					menu: {
						items: [
							{
								caption: "$Resources.Strings.RequestExampleSeparatorCaption",
								className: "Terrasoft.MenuSeparator"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupCurlButtonCaption"},
								click: "$openCurlRequestBuilder",
								markerValue: "CurlRequestBuilder"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupRawRequestButtonCaption"},
								click: "$openRawRequestBuilder",
								markerValue: "RawRequestBuilder"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupJsonRequestButtonCaption"},
								click: "$openJsonRequestBuilder",
								markerValue: "JsonRequestBuilder"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupUriButtonCaption"},
								click: "$onQuickSetupUriRequestBuilderClick",
								markerValue: "UriRequestBuilder"
							},
							{
								caption: "$Resources.Strings.ResponseExampleSeparatorCaption",
								className: "Terrasoft.MenuSeparator"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupRawResponseButtonCaption"},
								click: "$openRawResponseBuilder",
								markerValue: "RawResponseBuilder"
							},
							{
								caption: {bindTo: "Resources.Strings.QuickSetupJsonResponseButtonCaption"},
								click: "$openJsonResponseBuilder",
								markerValue: "JsonResponseBuilder"
							}
						]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "CloseIcon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["web-service-method-page-close-btn"]},
					"click": {"bindTo": "onDiscardChangesClick"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "AccessInfoButton",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {
						"bindTo": "Resources.Strings.AccessDeny"
					},
					"controlConfig": {
						"visible": {
							"bindTo": "ShowAccessInfo"
						}
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});


