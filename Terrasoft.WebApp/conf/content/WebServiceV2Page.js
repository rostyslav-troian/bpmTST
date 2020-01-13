Terrasoft.configuration.Structures["WebServiceV2Page"] = {innerHierarchyStack: ["WebServiceV2Page"], structureParent: "BasePageV2"};
define('WebServiceV2PageStructure', ['WebServiceV2PageResources'], function(resources) {return {schemaUId:'09595d4e-0f82-46ba-ad0d-36c7f9f13f02',schemaCaption: "Card schema: \"Web Services\"", parentSchemaName: "BasePageV2", schemaName:'WebServiceV2Page',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WebServiceV2Page", ["WebServiceV2PageResources", "ServiceMetaItemViewModelMixin", "ServiceDesignerUtilities",
		"UriJsonConverter", "JsonServiceMetaDataConverter"],
	function(resources) {
		return {
			entitySchemaName: "VwWebServiceV2",
			mixins: {
				observableItem: "Terrasoft.ObservableItem",
				serviceMetaItemViewModelMixin: "Terrasoft.ServiceMetaItemViewModelMixin"
			},
			properties: {
				useItemInitialValues: true,
				useViewModelToItemBinding: true
			},
			attributes: {

				/**
				 * Name.
				 */
				Name: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * Caption.
				 */
				Caption: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * WebService Description.
				 */
				Description: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * WebService URL.
				 */
				BaseUri: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * WebService type.
				 */
				Type: {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "REST"
				},

				/**
				 * Request retry counter.
				 */
				RetryCount: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Package identifier.
				 */
				PackageUId: {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Current Package Identifier.
				 */
				CurrentPackageUId: {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Custom Package Identifier.
				 */
				CustomPackageUId: {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Package lookup.
				 */
				PackageLookup: {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * Available Packages.
				 */
				AvailablePackages: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Instance of service schema.
				 */
				Schema: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					onChange: "_onSchemaChange"
				},

				/**
				 * Instance of service schema manager item.
				 */
				ManagerItem: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Is allow edit fields.
				 */
				CanEditSchema: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * The name of the operation which the user must have access to open the page.
				 */
				SecurityOperationName: {
					dataValueType: Terrasoft.DataValueType.STRING,
					value: "CanManageSolution"
				}
			},
			details: /**SCHEMA_DETAILS*/{
				MethodDetail: {
					schemaName: "WebServiceMethodDetail",
					filter: {
						masterColumn: "Id"
					}
				}
			}/**SCHEMA_DETAILS*/,
			modules: {
				ServiceAuthInfoSettings: {
					moduleId: "ServiceAuthInfoSettingsPageModule",
					moduleName: "ConfigurationModuleV2",
					config: {
						isSchemaConfigInitialized: false,
						schemaName: "ServiceAuthInfoSettingsPage",
						parameters: {
							viewModelConfig: {
								ServiceSchemaUId: {
									attributeValue: "Id"
								}
							}
						},
						useHistoryState: false
					}
				}
			},
			methods: {

				//region Private

				/**
				 * @private
				 */
				_applyWizardSettings: function(wizardUri) {
					var methodConfig = this._parseUri(wizardUri);
					var method = this._createNewMethod(this.$Schema, methodConfig);
					this._applyUri(methodConfig.request.uri);
					if (!Ext.isEmpty(method.request.uri) && method.request.uri !== "/") {
						this.$Schema.methods.add(method);
					}
				},

				/**
				 * @private
				 */
				_applyUri: function(uri) {
					var domain = Terrasoft.getUrlDomain(uri);
					if (domain) {
						this.$Schema.setPropertyValue("baseUri", domain);
						this.$Schema.setLocalizableStringPropertyValue("caption", domain);
					}
				},

				/**
				 * @private
				 */
				_isManagerItemNew: function() {
					var enable = (this.$ManagerItem && this.$ManagerItem.getStatus()) ===
						Terrasoft.ModificationStatus.NEW;
					return enable;
				},

				/**
				 * @private
				 */
				_isManagerItemModified: function() {
					return this.$ManagerItem && this.$ManagerItem.isModified();
				},

				/**
				 * @private
				 */
				_onSchemaChange: function() {
					this.subscribeOnItemChanged(this.$Schema);
					this.$Schema.on("changed", this.updateSaveButton, this);
				},

				/**
				 * @private
				 */
				_getWizardUri: function() {
					var uri = this.initialConfig && this.initialConfig.values && this.initialConfig.values.wizardUri;
					return uri;
				},

				/**
				 * @private
				 */
				_createNewSchema: function(callback, scope) {
					Terrasoft.ServiceSchemaManager.createSchemaInstance({
						uId: this.$Id,
						realUId: this.$Id,
						baseUri: ""
					}, function(schema, managerItem) {
						this.$Schema = schema;
						const wizardUri = this._getWizardUri();
						if (!Ext.isEmpty(wizardUri)) {
							this._applyWizardSettings(wizardUri);
						}
						this.$ManagerItem = managerItem;
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @private
				 */
				_createNewMethod: function(schema, methodConfig) {
					const methodName = "Method1";
					var method = new Terrasoft.ServiceMethod({
						uId: Terrasoft.generateGUID(),
						_serviceSchema: schema
					});
					method.name = Terrasoft.ServiceSchemaManager.schemaNamePrefix + methodName;
					method.merge({
						method: methodConfig
					});
					var uri = method.request.uri;
					var domain = Terrasoft.getUrlDomain(uri);
					var methodPart = uri.replace(domain, "");
					method.request.setPropertyValue("uri", methodPart);
					method.setLocalizableStringPropertyValue("caption", methodPart);
					return method;
				},

				/**
				 * @private
				 */
				_setCanEditSchema: function(callback, scope) {
					Terrasoft.ServiceDesignerUtilities.canEditSchema(this.$Schema, function(result) {
						this.$CanEditSchema = result;
						if (!this.$CanEditSchema) {
							this.unsubscribeAllItems();
							this.showInformationDialog(this.get("Resources.Strings.DenyAccess"));
						}
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * @private
				 */
				_onManagerItemStatusChanged: function() {
					var showButtons = this._isManagerItemModified() || this._isManagerItemNew();
					this.$ShowSaveButton = showButtons;
					this.$ShowDiscardButton = showButtons;
					this.updateButtonsVisibility();
					this.trigger("change:ManagerItem", this.$ManagerItem);
				},

				/**
				 * @private
				 */
				_initServiceSchema: function(callback, scope) {
					var schemaUId = this.$Id;
					var item = Terrasoft.ServiceSchemaManager.getItems()
						.findByPath("uId", schemaUId);
					if (item) {
						this.$ManagerItem = item;
						item.getInstance(function(instance) {
							this.$Schema = instance;
							this.$Schema.saveState();
							Ext.callback(callback, scope);
						}, this);
					} else {
						this._createNewSchema(callback, scope);
					}
				},

				/**
				 * @private
				 */
				_initAvailablePackages: function(callback, scope) {
					var schemaPackage = this.$Schema.getPropertyValue("packageUId");
					Terrasoft.chain(
						Terrasoft.PackageManager.getCustomPackageUId,
						function(next, customPackageUId) {
							this.$CustomPackageUId = customPackageUId;
							Terrasoft.PackageManager.getCurrentPackageUId(function(currentPackageUId) {
								this.$CurrentPackageUId = currentPackageUId;
								var packageUIds = [customPackageUId, currentPackageUId];
								if (schemaPackage) {
									packageUIds.push(schemaPackage);
								}
								Terrasoft.PackageManager.getPackageInfo(packageUIds, next, this);
							}, this);
						},
						function(next, packageInfo) {
							Terrasoft.SchemaDesignerUtilities.getAvailablePackages(function(resposne) {
								this.$AvailablePackages = resposne;
								if (!this._isManagerItemNew() && schemaPackage) {
									this.$AvailablePackages[schemaPackage] = packageInfo[schemaPackage];
								}
								Ext.callback(callback, scope);
							}, this);
						},
						this
					);
				},

				/**
				 * @private
				 */
				_parseUri: function(uri) {
					var uriConverter = new Terrasoft.UriJsonConverter();
					var json = uriConverter.convert(uri);
					var metadataConverter = new Terrasoft.JsonServiceMetaDataConverter({
						codePrefix: Terrasoft.ServiceSchemaManager.schemaNamePrefix
					});
					return metadataConverter.convert(json);
				},

				/**
				 * @private
				 */
				_preparePackageList: function(filter, list) {
					var result = {};
					Terrasoft.each(this.$AvailablePackages, function(name, uId) {
						result[uId] = {
							value: uId,
							displayValue: name
						};
					}, this);
					list.reloadAll(result);
				},

				/**
				 * @private
				 */
				_initPackageLookup: function() {
					var packageUId;
					if (this._isManagerItemNew() && this.$CurrentPackageUId &&
						this.$AvailablePackages[this.$CurrentPackageUId]) {
						packageUId = this.$CurrentPackageUId;
					} else if (this._isManagerItemNew() && this.$CustomPackageUId &&
						this.$AvailablePackages[this.$CustomPackageUId]) {
						packageUId = this.$CustomPackageUId;
					} else if (this.$Schema && !this._isManagerItemNew()) {
						packageUId = this.$Schema.getPropertyValue("packageUId");
					} else {
						packageUId = _.keys(this.$AvailablePackages)[0];
					}
					if (packageUId) {
						this.$PackageLookup = {
							value: packageUId,
							displayValue: this.$AvailablePackages[packageUId]
						};
					} else {
						this.$PackageLookup = null;
					}
				},

				/**
				 * @private
				 */
				_isOAuth20AuthType: function() {
					const authInfo = this.$Schema.authInfo;
					const application = authInfo.values.find("applicationId");
					return authInfo.authType === Terrasoft.services.enums.AuthType.OAuth20 &&
							application && application.value;
				},

				/**
				 * @private
				 */
				_onPackageLookupChanged: function() {
					this.$PackageUId = this.$PackageLookup && this.$PackageLookup.value;
				},

				/**
				 * @private
				 */
				_validateAvailablePackages: function() {
					var result = true;
					if (this._isManagerItemNew() && Ext.Object.isEmpty(this.$AvailablePackages)) {
						var config = {
							buttons: [{
								className: "Terrasoft.Button",
								returnCode: "OpenAdvancedSettings",
								style: "blue",
								caption: this.get("Resources.Strings.OpenAdvancedSettings")
							}, "cancel"]
						};
						this.showInformationDialog(this.get("Resources.Strings.NoAvailablePackages"), function(code) {
							if (code === "OpenAdvancedSettings") {
								var url = Terrasoft.workspaceBaseUrl +
									"/ViewPage.aspx?Id=5e5f9a9e-aa7d-407d-9e1e-1c24c3f9b59a";
								window.open(url, "_blank");
							}
						}, config);
						result = false;
					}
					return result;
				},

				/**
				 * @private
				 */
				_getSchemaIdByUId: function(schemaUId, callback, scope) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysSchema"
					});
					select.addColumn("Id");
					select.filters.add("UId", select.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"UId", schemaUId));
					select.getEntityCollection(function(response) {
						var schemaId;
						if (response.success && !response.collection.isEmpty()) {
							schemaId = response.collection.first().$Id;
						}
						Ext.callback(callback, scope, [schemaId]);
					}, this);
				},

				/**
				 * @private
				 */
				_getOAuthApplicationDataBindingColumns: function() {
					return [
						"Name",
						"ClientClassName",
						"RevokeTokenUrl",
						"UseSharedUser",
						"TokenUrl",
						"AppClassName",
						"AuthorizeUrl",
						"Image",
						"CredentialsLocationInRequest"
					];
				},

				/**
				 * @private
				 */
				_updateBaseUriUserProperty: function(uri, callback, scope) {
					this._getSchemaIdByUId(this.$Id, function(schemaId) {
						var config = {
							schemaId: schemaId,
							propertyName: "BaseUri",
							propertyValue: uri,
							managerName: "ServiceSchemaManager"
						};
						Terrasoft.SysUserPropertyHelper.setProperty(config, function(response) {
							if (response.success) {
								this.$BaseUri = uri;
							}
							Ext.callback(callback, scope);
						}, this);
					}, this);
				},

				/**
				 * @private
				 */
				_updateSysSettingsPackageData: function(codes, callback, scope) {
					if (!Ext.isEmpty(codes)) {
						const esq = new Terrasoft.EntitySchemaQuery("VwSysSetting");
						esq.filters.addItem(esq.createColumnInFilterWithParameters("Code", codes));
						const packageSchemaDataName = "WebService_SysSettings_" + this.$Schema.name;
						esq.getEntityCollection(function(response) {
							if (response.success) {
								Terrasoft.SchemaDesignerUtilities.updatePackageSchemaData({
									recordList: response.collection.getKeys(),
									entitySchemaName: "SysSettings",
									packageUId: this.$Schema.packageUId,
									packageSchemaDataName: packageSchemaDataName
								}, callback, scope);
							} else {
								Ext.callback(callback, scope);
							}
						}, this);
					} else {
						Ext.callback(callback, scope);
					}
				},

				/**
				 * @private
				 */
				_updateOAuthAuthenticationPackageData: function(callback, scope) {
					Terrasoft.chain(
						this._updateOAuthApplicationPackageData,
						this._updateOAuthScopesPackageData,
						this._updateOAuthIconPackageData,
						function() {
							Ext.callback(callback, scope);
						}, this);
				},

				/**
				 * @private
				 */
				_updateOAuthApplicationPackageData: function(callback, scope) {
					const packageSchemaDataName = "WebService_OAuthApplications_" + this.$Schema.name;
					Terrasoft.SchemaDesignerUtilities.updatePackageSchemaData({
						recordList: [this._getApplicationId()],
						entitySchemaName: "OAuthApplications",
						packageUId: this.$Schema.packageUId,
						packageSchemaDataName: packageSchemaDataName,
						columns: this._getOAuthApplicationDataBindingColumns()
					}, callback, scope || this);
				},

				/**
				 * @private
				 */
				_updateOAuthScopesPackageData: function(callback, scope) {
					const esq = new Terrasoft.EntitySchemaQuery("OAuthAppScope");
					esq.filters.addItem(esq.createColumnInFilterWithParameters("OAuth20App",
							[this._getApplicationId()]));
					const packageSchemaDataName = "WebService_OAuthAppScope_" + this.$Schema.name;
					esq.getEntityCollection(function(response) {
						if (response.success && !response.collection.isEmpty()) {
							Terrasoft.SchemaDesignerUtilities.updatePackageSchemaData({
								recordList: response.collection.getKeys(),
								entitySchemaName: "OAuthAppScope",
								packageUId: this.$Schema.packageUId,
								packageSchemaDataName: packageSchemaDataName
							}, callback, scope || this);
						} else {
							Ext.callback(callback, scope || this);
						}
					}, this);
				},

				/**
				 * @private
				 */
				_updateOAuthIconPackageData: function(callback, scope) {
					const esq = new Terrasoft.EntitySchemaQuery("OAuthApplications");
					esq.addColumn("ImageId");
					const packageSchemaDataName = "WebService_OAuthIcon_SysImage_" + this.$Schema.name;
					esq.getEntity(this._getApplicationId(), function(response) {
						if (response.success && !Ext.isEmpty(response.entity.$Image)) {
							Terrasoft.SchemaDesignerUtilities.updatePackageSchemaData({
								recordList: [response.entity.$Image.value],
								entitySchemaName: "SysImage",
								packageUId: this.$Schema.packageUId,
								packageSchemaDataName: packageSchemaDataName
							}, callback, scope || this);
						} else {
							Ext.callback(callback, scope || this);
						}
					}, this);
				},

				/**
				 * @private
				 */
				_updateServicePackageData: function(callback, scope) {
					Terrasoft.chain(
						function(next) {
							const codes = this.$Schema.getServiceSysSettingsCollection();
							this._updateSysSettingsPackageData(codes, next, scope);
						},
						function() {
							if (this._isOAuth20AuthType()) {
								this._updateOAuthAuthenticationPackageData(callback, scope);
							} else {
								Ext.callback(callback, scope);
							}
						}, this);
				},

				/**
				 * @private
				 */
				_getApplicationId: function() {
					const authInfo = this.$Schema.authInfo;
					const application = authInfo.values.find("applicationId");
					return application.value;
				},

				//endregion

				//region Protected

				/**
				 * @protected
				 */
				updateSaveButton: function() {
					if (!this.destroyed) {
						this.$ShowSaveButton = this._isManagerItemModified() && this.$CanEditSchema;
						this.updateButtonsVisibility(this.$ShowSaveButton);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onItemFocused.
				 * @override
				 */
				onItemFocused: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getColumnCaptionByName.
				 * @override
				 */
				getColumnCaptionByName: function(name) {
					return name === "BaseUri"
						? this.get("Resources.Strings.BaseUriCaption")
						: this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.ServiceMetaItemViewModelMixin#duplicateNameValidator.
				 * @override
				 */
				duplicateNameValidator: function(schemaName) {
					var message = "";
					var items = Terrasoft.ServiceSchemaManager.getItems();
					var duplicateItem = items.findByPath("name", schemaName);
					if (duplicateItem &&
						duplicateItem.uId &&
						duplicateItem.uId !== this.$Schema.uId) {
						message = this.get("Resources.Strings.DuplicateNameMessage");
					}
					return {invalidMessage: message};
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.setNameValidationConfig();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				initEntity: function(callback, scope) {
					this.callParent([function() {
						this.$Id = this.$PrimaryColumnValue || this.$Id || Terrasoft.generateGUID();
						Terrasoft.ServiceSchemaManager.initialize(function() {
							this._initServiceSchema(function() {
								this.$ManagerItem.on("statusChanged", this._onManagerItemStatusChanged, this);
								this._initAvailablePackages(function() {
									this._initPackageLookup();
									if (this._validateAvailablePackages()) {
										this._setCanEditSchema(callback, scope);
									} else {
										Ext.callback(callback, scope);
									}
								}, this);
							}, this);
						}, this);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#copyEntity
				 * @override
				 */
				copyEntity: function(sourceServiceUId, callback, scope) {
					Terrasoft.ServiceSchemaManager.getInstanceByUId(sourceServiceUId, function(sourceService) {
						var item = Terrasoft.ServiceSchemaManager.copySchema(sourceService);
						this.$Id = this.$PrimaryColumnValue = item.uId;
						Ext.callback(callback, scope, [this]);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
				 * @override
				 */
				getAttributeMap: function() {
					return {
						caption: "Caption",
						name: "Name",
						description: "Description",
						baseUri: "BaseUri",
						retryCount: "RetryCount",
						packageUId: "PackageUId"
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @override
				 */
				onDestroy: function() {
					this.unsubscribeAllItems();
					if (this.$Schema) {
						this.$Schema.un("changed", this.updateSaveButton, this);
						this.$ManagerItem.un("statusChanged", this._onManagerItemStatusChanged, this);
						this.$Schema.restoreState();
					}
					Terrasoft.ServiceDesignerUtilities.clearSysSettings();
					this.callParent(arguments);
				},

				//endregion

				//region Public

				/**
				 * @inheritdoc Terrasoft.BaseEntityPage#save
				 * @override
				 */
				save: function(callback, scope) {
					this.asyncValidate(function(validationResponse) {
						if (this.validateResponse(validationResponse)) {
							this.showBodyMask();
							this.$ManagerItem.setStatus(Terrasoft.ModificationStatus.MODIFIED);
							this.$ManagerItem.save({}, function(response) {
								this.hideBodyMask();
								if (!response.success) {
									this.showInformationDialog(response.errorInfo.toString());
								}
								if (!this.destroyed) {
									this.updateButtonsVisibility(false, {force: true});
								}
								this.changedValues = {};
								this.$Schema.saveState();
								this.sendSaveCardModuleResponse(response.success);
								this._updateServicePackageData(callback, scope);
							}, this);
						} else {
							Ext.callback(callback, scope);
						}
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					var parentMethod = this.getParentMethod();
					Terrasoft.ServiceSchemaManager.reInitialize(function() {
						parentMethod.apply(this, [function() {
							this.on("change:PackageLookup", this._onPackageLookupChanged, this);
							Terrasoft.ServiceDesignerUtilities.initSysSettings(function() {
								Ext.callback(callback, scope);
							}, Terrasoft.ServiceDesignerUtilities);
						}, this]);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
				 * @override
				 */
				onDiscardChangesClick: function() {
					if (!this._isManagerItemNew()) {
						this.$Schema.restoreState();
						this.$ShowDiscardButton = false;
						this.$ManagerItem.setStatus(Terrasoft.ModificationStatus.NOT_MODIFIED);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.ContextHelpMixin#getContextHelpConfig.
				 * @override
				 */
				getContextHelpConfig: function() {
					return {
						contextHelpId: "1862",
						contextHelpCode: "WebServiceV2Section"
					};
				},

				/**
				 * @inheritdoc BasePageV2#isChanged
				 * @overridden
				 */
				isChanged: function() {
					return this.$ManagerItem.getStatus() !== Terrasoft.ModificationStatus.NOT_MODIFIED &&
						this.$CanEditSchema;
				},

				/**
				 * Updates base uri property.
				 */
				changeURI: function(callback, scope) {
					//TODO: initial bindind calls function
					if (Ext.isString(callback)) {
						return;
					}
					Terrasoft.showInputBox(null, function(buttonCode, values) {
						if (buttonCode === "ok") {
							var uri = values.uri.value;
							this._updateBaseUriUserProperty(uri, callback, scope);
						} else {
							Ext.callback(callback, scope);
						}
					}, ["ok", "cancel"], this, {
						uri: {
							dataValueType: Terrasoft.DataValueType.TEXT,
							caption: this.get("Resources.Strings.BaseUriCaption"),
							value: this.$BaseUri,
							isRequired: true,
							customConfig: {focused: true}
						}
					});
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "CardContentContainer",
					"values": {
						"wrapClass": ["web-service-card-content-container", "center-main-container"]
					}
				},
				{
					"operation": "insert",
					"name": "Caption",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"bindTo": "Caption",
						"caption": {"bindTo": "Resources.Strings.CaptionCaption"},
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
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"bindTo": "Name",
						"caption": "$Resources.Strings.NameCaption",
						"enabled": "$CanEditSchema",
						"tip": {"content": "$Resources.Strings.CodeHint"}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Description",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 2},
						"bindTo": "Description",
						"caption": "$Resources.Strings.DescriptionCaption",
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"enabled": "$CanEditSchema"
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "BaseUri",
					"values": {
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"bindTo": "BaseUri",
						"caption": {"bindTo": "Resources.Strings.BaseUriCaption"},
						"tip": {"content": "$Resources.Strings.UriHint"},
						"rightIconClick": "$changeURI",
						"controlConfig": {
							"enableRightIcon": {
								"bindTo": "CanEditSchema",
								"bindConfig": {"converter": "invertBooleanValue"}
							},
							"rightIconConfig": resources.localizableImages.EditIcon,
							"readonly": {
								"bindTo": "CanEditSchema",
								"bindConfig": {"converter": "invertBooleanValue"}
							},
							"markerValue": "BaseUri"
						}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Type",
					"values": {
						"layout": {"column": 12, "row": 2, "colSpan": 12},
						"bindTo": "Type",
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"caption": {"bindTo": "Resources.Strings.TypeCaption"},
						"enabled": false
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "RetryCount",
					"values": {
						"layout": {"column": 12, "row": 1, "colSpan": 12},
						"bindTo": "RetryCount",
						"caption": {"bindTo": "Resources.Strings.RetryCountCaption"},
						"enabled": "$CanEditSchema",
						"tip": {"content": "$Resources.Strings.RetiresHint"}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "PackageLookup",
					"values": {
						"layout": {"column": 12, "row": 3, "colSpan": 12},
						"caption": "$Resources.Strings.PackageNameCaption",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"prepareList": "$_preparePackageList",
							"enabled": {
								"bindTo": "ManagerItem",
								"bindConfig": {"converter": "_isManagerItemNew"}
							}
						},
						"tip": {"content": "$Resources.Strings.PackageHint"}
					}
				},
				{
					"operation": "insert",
					"name": "Methods",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0,
					"values": {
						"caption": "$Resources.Strings.MethodsTabCaption",
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Methods",
					"propertyName": "items",
					"name": "MethodDetail",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "AuthTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AuthCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AuthTab",
					"name": "ServiceAuthInfoSettings",
					"propertyName": "items",
					"values": {
						"classes": {
							"wrapClassName": ["control-width-15", "control-left", "grid-layout-row",
								"module-container", "auth-info-setup-container"]
						},
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


