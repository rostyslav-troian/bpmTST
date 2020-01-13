Terrasoft.configuration.Structures["ServiceAuthInfoSettingsPage"] = {innerHierarchyStack: ["ServiceAuthInfoSettingsPage"]};
define('ServiceAuthInfoSettingsPageStructure', ['ServiceAuthInfoSettingsPageResources'], function(resources) {return {schemaUId:'7cb3b670-83d8-4d18-98ba-685c21c31f58',schemaCaption: "ServiceAuthInfoSettingsPage", parentSchemaName: "", schemaName:'ServiceAuthInfoSettingsPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceAuthInfoSettingsPage", ["ServiceAuthInfoSettingsPageResources", "ServiceEnums",
	"ServiceDesignerUtilities"], function() {
	return {
		modules: {
			BasicServiceAuthInfoValuesPageModule: {
				moduleId: "BasicServiceAuthInfoValuesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "BasicServiceAuthInfoValuesPage",
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							ServiceSchemaUId: {
								attributeValue: "ServiceSchemaUId"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					}
				}
			},
			OAuth20ServiceAuthInfoValuesPageModule: {
				moduleId: "OAuth20ServiceAuthInfoValuesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "OAuth20ServiceAuthInfoValuesPage",
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							ServiceSchemaUid: {
								attributeValue: "ServiceSchemaUId"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					}
				}
			}
		},
		attributes: {

			/**
			 *Service authentication type.
			 */
			AuthTypeLookup: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onAuthTypeLookupChange",
				isRequired: true
			},

			/**
			 * Authentication info.
			 */
			AuthInfo: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Service schema.
			 */
			ServiceSchema: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * UId of service schema.
			 */
			ServiceSchemaUId: {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Authentication type.
			 */
			AuthType: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Is allow edit schema.
			 */
			CanEditSchema: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},
		methods: {

			// region Methods: Public

			/**
			 * @private
			 */
			_initAuth: function() {
				this.$AuthInfo = this.$ServiceSchema.authInfo;
				var authType = this.$AuthInfo.authType;
				this.$AuthType = authType;
				this.$AuthTypeLookup = {
					value: authType,
					displayValue: Terrasoft.services.enums.AuthTypeCaption[authType]
				};
			},

			/**
			 * @private
			 */
			_prepareAuthTypeList: function(filter, list) {
				var result = {};
				Terrasoft.each(Terrasoft.services.enums.AuthType, function(value) {
					if (value === Terrasoft.services.enums.AuthType.Digest && !(Terrasoft.isDebug ||
						this.getIsFeatureEnabled("WebServiceDigestAuth"))) {
						return;
					}
					if (value === Terrasoft.services.enums.AuthType.OAuth20 && !(Terrasoft.isDebug ||
						this.getIsFeatureEnabled("WebServiceOAuth20Auth"))) {
						return;
					}
					result[value] = {
						value: value,
						displayValue: Terrasoft.services.enums.AuthTypeCaption[value]
					};
				}, this);
				list.reloadAll(result);
			},

			/**
			 * @private
			 */
			_onAuthTypeLookupChange: function(model, authType) {
				var defaultType = {
					value: Terrasoft.services.enums.AuthType.None
				};
				authType = authType && authType.value ? authType : defaultType;
				if (this.$AuthInfo.authType !== authType.value) {
					this.$AuthInfo.values.clear();
					this.$ServiceSchema.methods.each(function(method) {
						method.setPropertyValue("useAuthInfo",
								authType.value !== Terrasoft.services.enums.AuthType.None);
					});
				}
				this.$AuthType = authType.value;
				this.$AuthInfo.setPropertyValue("authType", authType.value);
			},

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					Terrasoft.ServiceSchemaManager.initialize(function() {
						Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceSchemaUId, function(instance) {
							this.$ServiceSchema = instance;
							this._initAuth();
							this.$ServiceSchema.on("changed", this._initAuth, this);
							Terrasoft.ServiceDesignerUtilities.canEditSchema(instance, function(canEditSchema) {
								this.$CanEditSchema = canEditSchema;
							}, this);
							Ext.callback(callback, scope);
						}, this);
					}, this);
				}, this]);
			},

			/**
			 * Is basic or digest auth visible.
			 * @return {boolean}
			 */
			isBasicOrDigestAuthVisible: function(authType) {
				return authType === Terrasoft.services.enums.AuthType.Basic ||
					authType === Terrasoft.services.enums.AuthType.Digest;
			},

			/**
			 * Indicates if current AuthType is OAuth20.
			 * @return {boolean}
			 */
			isOAuth20Type: function(authType) {
				return authType === Terrasoft.services.enums.AuthType.OAuth20;
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				if (this.$ServiceSchema) {
					this.$ServiceSchema.un("changed", this._initAuth, this);
				}
			}

			// endregion

		},
		diff: [
			{
				operation: "insert",
				name: "AuthInfoSetupContainer",
				values: {
					itemType: Terrasoft.ViewItemType.CONTAINER,
					items: []
				}
			},
			{
				operation: "insert",
				name: "AuthTypeLookup",
				parentName: "AuthInfoSetupContainer",
				propertyName: "items",
				index: 0,
				values: {
					caption: "$Resources.Strings.AuthCaption",
					dataValueType: Terrasoft.DataValueType.ENUM,
					controlConfig: {
						className: "Terrasoft.ComboBoxEdit",
						prepareList: "$_prepareAuthTypeList",
						enabled: "$CanEditSchema"
					},
					"wrapClass": ["service-parameter-value-source"]
				}
			},
			{
				operation: "insert",
				name: "BasicServiceAuthInfoValuesPageModule",
				parentName: "AuthInfoSetupContainer",
				propertyName: "items",
				index: 1,
				values: {
					itemType: Terrasoft.ViewItemType.MODULE,
					visible: {
						bindTo: "AuthType",
						bindConfig: {
							converter: "isBasicOrDigestAuthVisible"
						}
					}
				}
			},
			{
				operation: "insert",
				name: "OAuth20ServiceAuthInfoValuesPageModule",
				parentName: "AuthInfoSetupContainer",
				propertyName: "items",
				index: 1,
				values: {
					itemType: Terrasoft.ViewItemType.MODULE,
					visible: {
						bindTo: "AuthType",
						bindConfig: {
							converter: "isOAuth20Type"
						}
					}
				}
			}
		]
	};
});


