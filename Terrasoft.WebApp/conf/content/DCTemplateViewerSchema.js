Terrasoft.configuration.Structures["DCTemplateViewerSchema"] = {innerHierarchyStack: ["DCTemplateViewerSchema"], structureParent: "BaseDCTemplateViewerSchema"};
define('DCTemplateViewerSchemaStructure', ['DCTemplateViewerSchemaResources'], function(resources) {return {schemaUId:'01bce271-310a-4bf6-b776-de91f9c1cc59',schemaCaption: "Template detail schema", parentSchemaName: "BaseDCTemplateViewerSchema", schemaName:'DCTemplateViewerSchema',parentSchemaUId:'6d2f3d59-cf4f-413b-a479-2b3c42693ef0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DCTemplateViewerSchema", ["BulkEmailHelper", "MultilineLabel", "ModalBoxSchemaModule", "css!MultilineLabel",
	"css!DCTemplateViewerCSS", "css!SendTestEmailContentSchemaCSS"],
	function(BulkEmailHelper) {
		return {
			messages: {

				/**
				 * @message ChooseTemplateFromLookup
				 * Opens lookup window to select template.
				 */
				"ChooseTemplateFromLookup": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message EditTemplate
				 * Opens content builder to edit template.
				 */
				"EditTemplate": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message BulkEmailTemplateSaved
				 * Notify about bulk email template saved.
				 */
				"BulkEmailTemplateSaved": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message GetModuleInfo
				 * Used to provide information for Terrasoft.ModalBoxSchemaModule about modal window.
				 */
				"GetModuleInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SendTestEmail
				 * Opens modal view for sending test message.
				 */
				"SendTestEmail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},

			attributes: {

				/**
				 * Indicates that template can be edit.
				 */
				"IsTemplateEditable": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * Indicates blank slate visibility state.
				 */
				"IsBlankSlateVisible": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Indicates SendTestEmail visibility state.
				 */
				"IsBuilderWizardToolVisible": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * Indicates MarketingContentBuilderWizard feature state.
				 */
				"IsMarketingContentBuilderWizardEnabled": {
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			methods: {

				// region Methods: Private

				_subscribeMessages: function() {
					this.sandbox.subscribe("BulkEmailTemplateSaved", this.onEntityInitialized,
						this, [this.sandbox.id]);
					this.sandbox.subscribe("GetModuleInfo", this.getSendTestEmailContentSchemaCongfig,
						this, [this.getSendTestEmailContentSchemaId()]);
					this.sandbox.subscribe("SendTestEmail", this.openSendTestEmailContentModalBox, this, []);
				},

				/**
				 * Initializes value of properties by card columns value.
				 */
				_getCardColumnValues: function() {
					var columnsValue =
						this.sandbox.publish("GetColumnsValues", ["Status", "TemplateBody", "Category"], [this.sandbox.id]);
					if (!Ext.isEmpty(columnsValue)) {
						this.$IsTemplateEditable = BulkEmailHelper.IsEmailTemplateEditable(columnsValue.Status.value,
							columnsValue.Category.value);
						this.$IsBlankSlateVisible = Ext.isEmpty(columnsValue.TemplateBody) && !this.$HasReplica;
						this.$IsMarketingContentBuilderWizardEnabled = 
							Terrasoft.Features.getIsEnabled("MarketingContentBuilderWizard");
						this.$IsBuilderWizardToolVisible = this.getToolsVisible() && !this.$IsMarketingContentBuilderWizardEnabled;
					}
				},

				// endregion

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#afterReplicasLoaded
				 */
				afterReplicasLoaded: function() {
					this.callParent(arguments);
					this._getCardColumnValues();
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData.
				 * @override
				 */
				getGoogleTagManagerData: function() {
					var data = this.callParent(arguments);
					var actionTag = this.$LastActionTag;
					if (!this.Ext.isEmpty(actionTag)) {
						this.Ext.apply(data, {
							action: actionTag
						});
					}
					return data;
				},

				/**
				 * Opens modal box for send test email content page.
				 * @protected
				 */
				openSendTestEmailContentModalBox: function() {
					this.$LastActionTag = "OpenSendTestEmailContent";
					this.sendGoogleTagManagerData();
					this.sandbox.loadModule("ModalBoxSchemaModule", {
						id: this.getSendTestEmailContentSchemaId(),
						instanceConfig: {
							mainContainerWrapClasses: ["send-test-email-content-schema-body"],
							headerWrapClasses: ["send-test-email-content-schema-header"]
						}
					});
				},

				/**
				 * Returns SendTestEmailContentSchema identifier for ModalBoxSchemaModule.
				 * @protected
				 */
				getSendTestEmailContentSchemaId: function() {
					return this.sandbox.id + "_SendTestEmailContentSchemaId";
				},

				// endregion

				// region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseDCTemplateViewerSchema#init
				 * @override
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this._getCardColumnValues();
						this._subscribeMessages();
						this.Ext.callback(callback, scope);
					}, this]);
				},

				/**
				 * Returns parameters for SendTestEmailContentSchema modal box.
				 * @protected
				 */
				getSendTestEmailContentSchemaCongfig: function() {
					var activeItemId = this.$ActiveItemId;
					var replicaCollection = this.$ReplicaCollection;
					return {
						schemaName: "SendTestEmailContentSchema",
						bulkEmailId: this.getMasterColumnValueByName(this.$MasterColumnName),
						replicaMask: activeItemId ? replicaCollection.get(activeItemId).$Mask : 0,
						replicaCount: replicaCollection.getCount()
					};
				},

				/**
				 * Handles select template from lookup button click event.
				 */
				onChooseTemplateFromLookup: function() {
					this.sandbox.publish("ChooseTemplateFromLookup", null, [this.sandbox.id]);
				},

				/**
				 * Handles edit template button click event.
				 */
				onEditTemplate: function() {
					this.sandbox.publish("EditTemplate", null, [this.sandbox.id]);
				},

				/**
				 * Returns image url for blank slate.
				 * @return {String} Image url.
				 */
				getTemplateBlankSlatesImage: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.TemplateBlankSlateImage"));
				},

				/**
				 * Handles of loading blank slate container.
				 * Assigns a hyperlink to a click handler.
				 */
				blankSlateAfterRender: function() {
					var html = this.Ext.getElementById("TemplateBlankSlateContainer");
					var links = html.getElementsByTagName("a");
					var scope = this;
					this.Terrasoft.each(links, function(link) {
						link.onclick = function(event) {
							var clickHandlerName = event.currentTarget.getAttribute("data-onclick");
							scope[clickHandlerName]();
							return false;
						};
					}, this);
				}

				// endregion

			},
			diff: /**SCHEMA_DIFF*/ [{
					"operation": "insert",
					"name": "SelectTemplateFromLookup",
					"parentName": "BaseDCTemplateViewerControlGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.InsertTemplateFromLookupMenuItemCaption"
						},
						"click": {
							"bindTo": "onChooseTemplateFromLookup"
						},
						"enabled": {
							bindTo: "IsTemplateEditable"
						},
						"visible": {
							"bindTo": "IsBuilderWizardToolVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "EditTemplate",
					"parentName": "BaseDCTemplateViewerControlGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.EditTemplateCaption"
						},
						"click": {
							"bindTo": "onEditTemplate"
						},
						"enabled": {
							bindTo: "IsTemplateEditable"
						},
						"visible": {
							"bindTo": "IsBuilderWizardToolVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "SendTestEmail",
					"parentName": "BaseDCTemplateViewerControlGroup",
					"propertyName": "tools",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.SendTestEmailCaption"
						},
						"click": {
							"bindTo": "openSendTestEmailContentModalBox"
						},
						"enabled": {
							"bindTo": "IsBlankSlateVisible",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
						"visible": {
							"bindTo": "IsBuilderWizardToolVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "OuterContainer",
					"name": "EmptyTemplateContainer",
					"propertyName": "items",
					"values": {
						"markerValue": "EmptyTemplateContainer",
						"id": "EmptyTemplateContainer",
						"selectors": {
							"wrapEl": "#EmptyTemplateContainer"
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["email-empty-template-container"],
						"items": [],
						"visible": {
							"bindTo": "IsBlankSlateVisible"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmptyTemplateContainer",
					"name": "TemplateBlankSlateContainer",
					"propertyName": "items",
					"values": {
						"markerValue": "TemplateBlankSlateContainer",
						"id": "TemplateBlankSlateContainer",
						"selectors": {
							"wrapEl": "#TemplateBlankSlateContainer"
						},
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["email-template-blank-slates-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "TemplateBlankSlateContainer",
					"name": "BlankSlateImageContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["email-template-blank-slates-image-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TemplateBlankSlatesImage",
					"parentName": "BlankSlateImageContainer",
					"propertyName": "items",
					"values": {
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"onPhotoChange": this.Terrasoft.emptyFn,
						"getSrcMethod": "getTemplateBlankSlatesImage",
						"classes": {
							"wrapClass": ["not-selected-image"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "TemplateBlankSlatesLabel",
					"parentName": "TemplateBlankSlateContainer",
					"propertyName": "items",
					"values": {
						"className": "Terrasoft.MultilineLabel",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.TemplateBlankSlateCaption"
						},
						"contentVisible": true,
						"classes": {
							"multilineLabelClass": ["description-label"],
							"wrapClass": ["description-container"]
						},
						"afterrender": {
							"bindTo": "blankSlateAfterRender"
						},
						"afterrerender": {
							"bindTo": "blankSlateAfterRender"
						}
					}
				},
				{
					"operation": "merge",
					"name": "InnerContainer",
					"values": {
						"visible": {
							"bindTo": "IsBlankSlateVisible",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						}
					}
				},
				{
					"operation": "merge",
					"name": "OuterContainer",
					"values": {
						"id": "DCTemplateViewerOuterContainer"
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


