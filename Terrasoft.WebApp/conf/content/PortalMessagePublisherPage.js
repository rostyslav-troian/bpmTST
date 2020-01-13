Terrasoft.configuration.Structures["PortalMessagePublisherPage"] = {innerHierarchyStack: ["PortalMessagePublisherPage"], structureParent: "BaseMessagePublisherPage"};
define('PortalMessagePublisherPageStructure', ['PortalMessagePublisherPageResources'], function(resources) {return {schemaUId:'a1d7ab6e-673e-4b26-ae69-51c30e02732b',schemaCaption: "Portal message publisher page", parentSchemaName: "BaseMessagePublisherPage", schemaName:'PortalMessagePublisherPage',parentSchemaUId:'6b7d0022-f128-4c6e-8372-ce9d8819fbfa',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalMessagePublisherPage", ["PortalMessagePublisherPageResources", "ExtendedHtmlEditModuleUtilities",
	"ExtendedHtmlEditModule", "MessagePublisherAttachmentUtilities", "SchemaBuilderV2"],
		function(resources) {
			return {
				entitySchemaName: "PortalMessage",
				mixins: {
					ExtendedHtmlEditModuleUtilities: "Terrasoft.ExtendedHtmlEditModuleUtilities",
					MessagePublisherAttachmentUtilities: "Terrasoft.MessagePublisherAttachmentUtilities"
				},
				attributes: {
					/**
					 * Entities list.
					 */
					entitiesList: {
						"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
						"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"PortalEditControlHintText": {
						dataValueType: this.Terrasoft.DataValueType.TEXT
					},
					"Message": {
						"dataValueType": this.Terrasoft.DataValueType.TEXT,
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
						"value": ""
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.set("entitiesList", this.Ext.create("Terrasoft.Collection"));
						this.initDefaultValues();
						this.initAttachmentsViewData();
						this.initCollection();
						this.mixins.MessagePublisherAttachmentUtilities.init.call(this);
					},

					/**
					 * @inheritdoc Terrasoft.MessagePublisherAttachmentUtilities#getAttachments
					 * @overridden
					 */
					getAttachments: function(callback, scope) {
						if (this.Terrasoft.Features.getIsEnabled("SecurePortalMessageFileInHistory")) {
							const config = this._getServiceConfig();
							this.callService(config, function(response) {
								if (response && response.GetPortalMessageFilesResult) {
									this._loadResponseToList(response.GetPortalMessageFilesResult.PortalMessageFiles);
									Ext.callback(callback, scope);
								}
							}, this);
						} else {
							this.mixins.MessagePublisherAttachmentUtilities.getAttachments.call(this, callback);
						}
					},

					/**
					 * @private
					 */
					_loadResponseToList: function(files) {
						const viewModels = Ext.create("Terrasoft.Collection");
						Terrasoft.each(files, function (file) {
							file.filesList = this.get("FilesList");
							const viewModelConfig = {
								values: file,
								Ext: this.Ext,
								Terrasoft: this.Terrasoft,
								sandbox: this.sandbox
							};
							const viewModel = this.Ext.create(this.get("AttachmentViewModelClass"),
								viewModelConfig);
							viewModels.addIfNotExists(file.Id, viewModel);
						}, this);
						this.get("FilesList").reloadAll(viewModels);
					},

					/**
					 * @private
					 */
					_getServiceConfig: function () {
						return {
							"serviceName": "PortalMessageFileService",
							"methodName": "GetPortalMessageFiles",
							"data": {
								"portalMessageId": this.get("PrimaryColumnValue"),
								"readingOptions": {
									"rowCount": 50,
									"lastValue": Terrasoft.GUID_EMPTY
								}
							}
						};
					},


					/**
					 * Initializes attachments view data (viewModelClass and viewConfig).
					 * @private
					 */
					initAttachmentsViewData: function() {
						var schemaName = "PortalPublisherAttachmentPage";
						var builderConfig = {
							schemaName: schemaName,
							entitySchemaName: null,
							profileKey: schemaName
						};
						var schemaBuilder = this.Ext.create("Terrasoft.SchemaBuilder");
						schemaBuilder.build(builderConfig, function(viewModelClass, viewConfig) {
							this.set("AttachmentViewModelClass", viewModelClass);
							this.set("AttachmentViewConfig", viewConfig);
						}, this);
					},

					/**
					 * Initializes collection.
					 * @private
					 */
					initCollection: function() {
						var collectionName = "FilesList";
						var collection = this.get(collectionName);
						if (!collection) {
							collection = this.Ext.create("Terrasoft.Collection");
							this.set(collectionName, collection);
						} else {
							collection.clear();
						}
					},

					/**
					 * Initializes default values.
					 * @protected
					 */
					initDefaultValues: function() {
						this.set("isToolbarVisible", false);
						var isSspUser = this.Terrasoft.CurrentUser.userType === this.Terrasoft.UserType.SSP;
						this.set(
							"PortalEditControlHintText", isSspUser
								? resources.localizableStrings.WritePortalPostHintOnPortal
								: resources.localizableStrings.WritePortalPostHint
						);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getServiceConfig
					 * @overridden
					 */
					getServiceConfig: function() {
						return {
							className: "Terrasoft.Configuration.PortalMessagePublisher"
						};
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#publishMessage
					 * @overridden
					 */
					publishMessage: function() {
						var complainMessage = arguments[0] && arguments[0].Message;
						var message = this.get("Message") || complainMessage;
						if (this.Ext.isEmpty(message)) {
							this.showInformationDialog(this.get("Resources.Strings.EmptyMessageError"));
							return;
						}
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#onPublished
					 * @overridden
					 */
					onPublished: function() {
						this.callParent(arguments);
						this.set("Message", "");
						var listItems = this.get("FilesList");
						listItems.clear();
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishMaskCaption
					 * @overridden
					 */
					getPublishMaskCaption: function() {
						return this.get("Resources.Strings.PortalMaskCaption");
					},

					/**
					 * @inheritdoc Terrasoft.BaseMessagePublisherPage#getPublishData
					 * @overridden
					 */
					getPublishData: function() {
						var publishData = this.callParent(arguments);
						var message = this.get("Message");
						publishData.push({"Key": "Message", "Value": message});
						return publishData;
					},

					/**
					 * Inserts entity.
					 * @private
					 */
					insertEntity: function() {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: this.entitySchemaName
						});
						insert.setParameterValue("Id", this.get("PrimaryColumnValue"),
							this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("EntitySchemaUId", Terrasoft.GUID_EMPTY,
							this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("EntityId", Terrasoft.GUID_EMPTY,
							this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("Message", this.get("Resources.Strings.DraftBodyMessage"),
							this.Terrasoft.DataValueType.TEXT);
						insert.setParameterValue("IsNotPublished", true, this.Terrasoft.DataValueType.BOOLEAN);
						insert.execute(function(response) {
							if (response && response.success) {
								this.set("IsInserted", response.success);
								this.uploadFile();
							}
						}, this);
					},

					/**
					 * Returns attachment view config.
					 * @protected
					 * @virtual
					 * @param {Object} itemConfig Attachment config.
					 */
					getItemViewConfig: function(itemConfig) {
						var fullViewConfig = this.get("AttachmentViewConfig");
						if (fullViewConfig.length > 0) {
							var attachmentWrapContainerIndex = 0;
							for (var i = 0; i < fullViewConfig.length; i++) {
								if (fullViewConfig[i].id === "AttachmentWrapContainer") {
									attachmentWrapContainerIndex = i;
									break;
								}
							}
							itemConfig.config = fullViewConfig[attachmentWrapContainerIndex];
						}
					},

					/**
					 * @inheritDoc Terrasoft.BaseMessagePublisherPage#onNewCardSaved
					 * @overridden
					 */
					onNewCardSaved: function() {
						if (!this.get("Message")) {
							return;
						}
						this.publishMessage();
					},

					/**
					 * @inheritDoc Terrasoft.BaseMessagePublisherPage#isNeedToBePublished
					 * @overridden
					 */
					isNeedToBePublished: function() {
						return Boolean(this.get("Message"));
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "PortalMessageBody",
						"values": {
							"bindTo": "Message",
							"contentType": this.Terrasoft.ContentType.RICH_TEXT,
							"generator": "InlineTextEditViewGenerator.generate",
							"labelConfig": {
								"visible": true
							},
							"markerValue": "PortalMessageBody",
							"placeholder": {
								"bindTo": "PortalEditControlHintText"
							},
							"controlConfig": {
								"inlineTextControlConfig": {
									"ckeditorDefaultConfig": {
										"allowedContent": true,
										"removeButtons": "bpmonlinemacros"
									}
								}
							}
						},
						"parentName": "BodyContainer",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "AttachFileButton",
						"propertyName": "items",
						"parentName": "PublisherBottomContainer",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
							"iconAlign": this.Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
							"imageConfig": {
								"bindTo": "getAttachFileButtonImageConfig"
							},
							"tag": "attachFileButton",
							"fileUpload": true,
							"filesSelected": {"bindTo": "onAttachFileSelected"},
							"click": {
								"bindTo": "onAttachFileButtonClick"
							},
							"enabled": {
								"bindTo": "IsPublishButtonEnabled"
							},
							"classes": {
								"imageClass": ["attachFileButtonImage"]
							},
							"markerValue": "AttachFileButton"
						}
					},
					{
						"operation": "insert",
						"name": "FilesList",
						"parentName": "ModulePageContainer",
						"propertyName": "items",
						"values": {
							"generateId": false,
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"idProperty": "Id",
							"collection": "FilesList",
							"onGetItemConfig": "getItemViewConfig",
							"isAsync": true
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


