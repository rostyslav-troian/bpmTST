Terrasoft.configuration.Structures["OAuth20ServiceAuthInfoValuesPage"] = {innerHierarchyStack: ["OAuth20ServiceAuthInfoValuesPage"], structureParent: "AuthInfoParameterValuePage"};
define('OAuth20ServiceAuthInfoValuesPageStructure', ['OAuth20ServiceAuthInfoValuesPageResources'], function(resources) {return {schemaUId:'ef2ee597-6c97-42c2-8102-f92ad697c3d6',schemaCaption: "OAuth20ServiceAuthInfoValuesPage", parentSchemaName: "AuthInfoParameterValuePage", schemaName:'OAuth20ServiceAuthInfoValuesPage',parentSchemaUId:'14c99d52-3f74-4839-9720-fb520db4ba10',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuth20ServiceAuthInfoValuesPage", ["InformationButtonResources", "OAuth20Utilities",
	"ServiceOAuthAuthenticatorEndpointHelper"], function(informationButtonResources) {
	return {
		attributes: {

			/**
			 * @inheritdoc AuthInfoParameterValuePage#AuthInfoPropertyName
			 * @override
			 */
			AuthInfoPropertyName: {
				value: "applicationId"
			},

			/**
			 * OAuth20 application.
			 */
			Application: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				onChange: "_onApplicationChanged",
				referenceSchemaName: "OAuthApplications"
			},

			/**
			 * OAuth20 application page visible indicator.
			 */
			ShowOAuth20AppPage: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},

			/**
			 * Is allow edit schema.
			 */
			CanEditSchema: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Is OAuth application valid.
			 */
			IsApplicationValid: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},
		properties: {
			_applicationList: null,

			/**
			 * Default image id constant.
			 */
			DEFAULT_IMAGE_ID: "AD408054-6040-4BF5-B0E6-E86C20B6CB02"
		},

		messages: {
			/**
			 * @message CloseOAuth20AppPage
			 * Closed method page.
			 */
			"CloseOAuth20AppPage": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_onApplicationChanged: function() {
				this.$Source = Terrasoft.services.enums.ServiceParameterValueSource.CONST;
				this.$Value = this.$Application && this.$Application.value;
			},

			/**
			 * Returns image url for SysImage by id.
			 * @private
			 */
			_getSysImageUrl: function(sysImageId) {
				const imageConfig = {
					source: Terrasoft.ImageSources.SYS_IMAGE,
					params: {
						primaryColumnValue: sysImageId
					}
				};
				return Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
			},

			/**
			 * @private
			 */
			_initApplication: function() {
				const application = this._applicationList[this.$Value];
				if (application) {
					this.$Application = application;
				} else {
					if (this.$Application && !this.$Value) {
						this.$Application = null;
					}
				}
			},

			/**
			 * @private
			 */
			_subscribeCloseOAuth20AppPageSandboxEvent: function() {
				this.sandbox.subscribe("CloseOAuth20AppPage", this._closeOAuth20AppPage, this);
			},

			/**
			 * @private
			 */
			_clearApplication: function() {
				this.$Application = null;
			},

			/**
			 * @private
			 */
			_closeOAuth20AppPage: function(appId) {
				this._initApplicationList(
						function() {
							this.$Value = appId;
							const application = this._applicationList[this.$Value];
							this._clearApplication();
							this.$Application = application;
						},
						this
				);
				this.$ShowOAuth20AppPage = false;
			},

			/**
			 * @private
			 */
			_handleGetEntityCollection: function(response, callback, scope) {
				if (response && response.success) {
					response.collection.each(function(item) {
						const imageId = item.$Image ? item.$Image.value : this.DEFAULT_IMAGE_ID;
						this._applicationList[item.$Id] = {
							value: item.$Id,
							displayValue: item.$Name,
							Image: {"value": imageId},
							imageUrl: this._getSysImageUrl(imageId)
						};
					}, this);
				}
				Ext.callback(callback, scope);
			},

			/**
			 * @private
			 */
			_initApplicationList: function(callback, scope) {
				this._applicationList = {};
				const select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OAuthApplications"
				});
				select.addColumn("Id");
				select.addColumn("Name");
				select.addColumn("Image");
				Terrasoft.OAuth20Utilities.addCustomApplicationFilters(select.filters);
				select.getEntityCollection(function(response) {
					this._handleGetEntityCollection(response, callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			_getApplicationAction: function() {
				const isExistingApp = this.$Value && !Terrasoft.isEmptyGUID(this.$Value);
				return isExistingApp ? Terrasoft.ConfigurationEnums.CardOperation.EDIT
					: Terrasoft.ConfigurationEnums.CardOperation.ADD;
			},

			/**
			 * @inheritdoc BaseServiceParameterValuePage#onValueChanged
			 * @override
			 */
			onValueChanged: function() {
				this.authInfoValue.setPropertyValue("value", this.$Value);
				if (this.$Value) {
					Terrasoft.ServiceOAuthAuthenticatorEndpointHelper.validateApplication(this.$Value,
						function(result) {
							this.$IsApplicationValid = result;
						}, this);
				} else {
					this.$IsApplicationValid = true;
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this._subscribeCloseOAuth20AppPageSandboxEvent();
				this.callParent([
					function() {
						Terrasoft.chain(
							function(next) {
								this._initApplicationList(next, this);
							},
							function() {
								this._initApplication();
								Ext.callback(callback, scope);
							},
							this
						);
					}, this
				]);
			},

			/**
			 * @inheritdoc AuthParameterValuePage#updateAuth
			 * @override
			 */
			updateAuth: function() {
				this._initApplication();
			},

			//endregion

			//region Methods: Public

			/**
			 * Opens OAuth application in modal window.
			 */
			onApplicationActionButtonClick: function() {
				const appAction = this._getApplicationAction();
				const appId = appAction === Terrasoft.ConfigurationEnums.CardOperation.EDIT
					? this.$Application.value : Terrasoft.generateGUID();
				var viewModelConfig = {
					Id: appId,
					PrimaryColumnValue: appId,
					Operation: appAction
				};
				this.$ShowOAuth20AppPage = true;
				this.sandbox.loadModule("OAuth20AppModule", {
					renderTo: "AppPageContainer",
					instanceConfig: {
						parameters: {
							viewModelConfig: viewModelConfig
						}
					}
				});
			},

			/**
			 * Prepares list of OAuth 2.0 applications.
			 * @param {String} filter List filter.
			 * @param {Terrasoft.Collection} list List of applications.
			 */
			prepareApplicationList: function(filter, list) {
				list.reloadAll(this._applicationList);
			},

			/**
			 * Returns Open/Add OAuth app button image config.
			 * @return {Object}
			 */
			getOpenOAuthButtonImageConfig: function() {
				if (this._getApplicationAction() === Terrasoft.ConfigurationEnums.CardOperation.EDIT) {
					return this.get("Resources.Images.OpenButtonImage");
				} else {
					return this.get("Resources.Images.AddButtonImage32");
				}
			}

			//endregion

		},
		diff: [
			{
				"operation": "remove",
				"name": "InputContainer"
			},
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"id": "CardContentWrapperOAuth20AppPage"
				}
			},
			{
				"operation": "insert",
				"name": "AppContainer",
				"className": "Terrasoft.GridLayoutEdit",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Application",
				"parentName": "AppContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 22
					},
					"caption": "$Resources.Strings.ApplicationCaption",
					"contentType": Terrasoft.ContentType.ENUM,
					"controlConfig": {
						"prepareList": {"bindTo": "prepareApplicationList"},
						"iconsVisible": true,
						"enabled": "$CanEditSchema"
					},
					"classes": {
						"wrapClassName": ["app-select"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AppContainer",
				"name": "AppButtonsGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 22,
						"row": 0,
						"colSpan": 2
					},
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ApplicationActionButton",
				"parentName": "AppButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": "$onApplicationActionButtonClick",
					"imageConfig": {
						"bindTo": "getOpenOAuthButtonImageConfig"
					},
					"classes": {
						"wrapperClass": ["t-no-padding"],
						"imageClass": ["t-action-btn-image"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "AppButtonsGroup",
				"propertyName": "items",
				"name": "InvalidApplication",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": "$Resources.Strings.InvalidApplicationTip",
					"style": Terrasoft.TipStyle.RED,
					"controlConfig": {
						"visible": {
							"bindTo": "IsApplicationValid",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
						"imageConfig": informationButtonResources.localizableImages.WarningIcon
					}
				}
			},
			{
				"operation": "insert",
				"name": "AppPageContainer",
				"values": {
					"id": "AppPageContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["method-page-container"]},
					"items": [],
					"visible": {"bindTo": "ShowOAuth20AppPage"},
					"enabled": "$CanEditSchema"
				}
			}
		]
	};
});


