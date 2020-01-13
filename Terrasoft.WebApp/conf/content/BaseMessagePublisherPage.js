Terrasoft.configuration.Structures["BaseMessagePublisherPage"] = {innerHierarchyStack: ["BaseMessagePublisherPage"]};
define('BaseMessagePublisherPageStructure', ['BaseMessagePublisherPageResources'], function(resources) {return {schemaUId:'6b7d0022-f128-4c6e-8372-ce9d8819fbfa',schemaCaption: "BaseMessagePublisherPage", parentSchemaName: "", schemaName:'BaseMessagePublisherPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMessagePublisherPage", ["ServiceHelper", "MaskHelper", "css!BaseMessagePublisherModule"],
	function(ServiceHelper, MaskHelper) {
		return {
			messages: {
				/**
				 * @message SaveMessage
				 * Inform publishers its need to be saved
				 */
				"SavePublishers": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message CardSaved
				 * Messages, that page is silent saved
				 */
				"CardSaved": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message SaveMasterEntity
				 * Reports of the card it wants to save
				 */
				"SaveMasterEntity": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message GetListenerRecordInfo
				 * Returns current record info.
				 */
				"GetListenerRecordInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message PublishMessageButtonInfo
				 * Gets publish message button info.
				 */
				"PublishMessageButtonInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetPublishMessageButtonInfo
				 * Request publish message button info.
				 */
				"GetPublishMessageButtonInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ActionsDashboardMessagePublished
				 */
				"ActionsDashboardMessagePublished": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message DashboardRealoaded
				 * Notify about the dashboard is reload.
				 */
				"DashboardRealoaded": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message PublishMessage
				 * Publish message.
				 */
				"PublishMessage": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetPublisherPageState
				 * Return publisher page state.
				 */
				"GetPublisherPageState": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ModulePageContainer",
					"propertyName": "items",
					"values": {
						"id": "ModulePageBaseContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["header-container-margin-bottom"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ModulePageContainer",
					"name": "PublishMaskContainer",
					"propertyName": "items",
					"values": {
						"id": "PublishMaskContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["publish-mask-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "PublishMaskContainer",
					"name": "PublishLabelContainer",
					"propertyName": "items",
					"values": {
						"id": "PublishLabelContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["publish-mask-label-container"],
						"items": [{
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "getPublishMaskCaption"},
							"classes": {
								"labelClass": ["publish-mask-label"]
							}
						}]
					}
				},
				{
					"operation": "insert",
					"parentName": "ModulePageContainer",
					"name": "LayoutContainer",
					"propertyName": "items",
					"values": {
						"id": "LayoutContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["layout-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ModulePageContainer",
					"name": "BodyContainer",
					"propertyName": "items",
					"values": {
						"id": "BodyContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["body-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "BodyContainer",
					"name": "DropZoneContainer",
					"propertyName": "items",
					"values": {
						"id": "DropZoneContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["drop-zone-container"]
					}
				},
				{
					"operation": "insert",
					"parentName": "DropZoneContainer",
					"name": "LabelContainer",
					"propertyName": "items",
					"values": {
						"id": "LabelContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["drop-zone-label-container"],
						"items": [{
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "Resources.Strings.DropZoneHoverCaption"},
							"classes": {
								"labelClass": ["drop-zone-label"]
							}
						}]
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "PublisherBottomContainer",
					"values": {
						"id": "PublisherBottomContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["publisherBottomContainer"]
					}
				},
				{
					"operation": "insert",
					"name": "PublishButtonContainer",
					"propertyName": "items",
					"parentName": "PublisherBottomContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"wrapClass": ["publishButton"]
					}
				},
				{
					"operation": "insert",
					"name": "PublishButton",
					"propertyName": "items",
					"parentName": "PublishButtonContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {
							"bindTo": "Resources.Strings.PublishButtonCaption"
						},
						"click": {
							"bindTo": "onPublishButtonClick"
						},
						"markerValue": "Publish",
						"enabled": {
							"bindTo": "IsPublishButtonEnabled"
						},
						"hint": {
							"bindTo": "PublishButtonHint"
						},
						"clickDebounceTimeout": 1000
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				/**
				 * Publish message enabled flag.
				 */
				"IsPublishButtonEnabled": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},
				/**
				 * Publish button hint.
				 */
				"PublishButtonHint": {
					dataValueType: this.Terrasoft.DataValueType.TEXT
				},
				/**
				 * Stores an identifier of current entity.
				 */
				"PrimaryColumnValue": {
					dataValueType: this.Terrasoft.DataValueType.GUID
				},
				/**
				 * Is new entity inserted flag.
				 */
				"IsInserted": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * Returns selected text from inline text edit control
				 */
				"SelectedText": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"value": ""
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeMessages();
					this.checkIsPublishButtonEnabled();
					this.set("PrimaryColumnValue", this.Terrasoft.generateGUID());
					this.set("IsInserted", false);
					this.initDefaultValues();
				},

				/**
				 * Shows mask on publish.
				 * @protected
				 */
				showPublishMask: function() {
					if (Ext.get("PublishMaskContainer")) {
						this.setElementIndex("PublishMaskContainer", true);
					}
				},

				/**
				 * Hides mask on publish.
				 * @protected
				 */
				hidePublishMask: function() {
					if (Ext.get("PublishMaskContainer")) {
						this.setElementIndex("PublishMaskContainer", false);
					}
				},

				/**
				 * Initializes default values for user
				 * @protected
				 */
				initDefaultValues: Terrasoft.emptyFn,

				/**
				 * Returns mask caption.
				 * @return {string} Mask Caption
				 */
				getPublishMaskCaption: Terrasoft.emptyFn,

				/**
				 * Saves master entity.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				saveMasterEntity: function(callback, scope) {
					var data = this.getListenerRecordData();
					var cardState = data.relationSchemaOperation;
					if (cardState === Terrasoft.ConfigurationEnums.CardOperation.ADD ||
						cardState === Terrasoft.ConfigurationEnums.CardOperation.COPY) {
						var config = {
							scope: scope || this,
							isSilent: true,
							messageTags: [this.sandbox.id],
							callback: callback
						};
						this.sandbox.publish("SaveMasterEntity", config, [this.sandbox.id]);
					} else {
						callback.call(scope || this);
					}
				},

				/**
				 * Publish button click event handler.
				 * @private
				 */
				onPublishButtonClick: function() {
					this.saveMasterEntity(this.publishMessage, this);
				},

				/**
				 * Applies additional config to publish service config.
				 * @private
				 * @param {Array} config Source config.
				 * @param {Object} applyConfig Config to apply.
				 */
				applyMessageConfig: function (config, applyConfig) {
					if (applyConfig) {
						for (var field in applyConfig) {
							var isItemFound = false;
							if (applyConfig.hasOwnProperty(field)) {
								for (var i = 0; i < config.length; i++) {
									if (config[i].Key === field) {
										config[i].Value = applyConfig[field];
										isItemFound = true;
										break;
									}
								}
								if (!isItemFound) {
									config.push({
										Key: field,
										Value: applyConfig[field]
									});
								}
							}
						}
					}
				},

				/**
				 * Publishes a message.
				 * @protected
				 * @param {Object} messageConfig Additional config to apply
				 */
				publishMessage: function(messageConfig) {
					var serviceMethodName = this.getIsFeatureEnabled("HandleMessagePublishingExceptions")
							? "PublishMessage" : "Publish";
					var config = this.getServiceConfig();
					var publishData = this.getPublishData();
					this.applyMessageConfig(publishData, messageConfig);
					ServiceHelper.callService({
						serviceName: "MessagePublisherService",
						methodName: serviceMethodName,
						data: {
							className: config.className,
							fieldsData: publishData
						},
						callback: this.onPublished,
						scope: this
					});
				},

				/**
				 * Returns current record info.
				 * @private
				 * @return {Object} Current record info.
				 */
				getListenerRecordData: function() {
					var moduleId = this.sandbox.id;
					var currentModuleName = "_" + this.sandbox.moduleName;
					var indexOfCurrentModule = moduleId.indexOf(currentModuleName, moduleId.lastIndexOf("_"));
					if (indexOfCurrentModule !== -1) {
						moduleId = moduleId.substring(0, indexOfCurrentModule);
					}
					return this.sandbox.publish("GetListenerRecordInfo", null, [moduleId]);
				},

				/**
				 * Actualize destroying ability.
				 * @param {String} cacheKey Identifier of the current cache.
				 * @private
				 */
				_actualizeCanBeDestroyedState: function(cacheKey) {
					var cache = this.Terrasoft.ClientPageSessionCache.getItem(cacheKey);
					if (!cache.childModules) {
						cache.childModules = [];
					}
					cache.childModules.push({
						"id": [this.sandbox.id],
						"canBeDestroyed": !this.isNeedToBePublished(),
						"message": this.get("Resources.Strings.NotPublishedMessage")
					});
				},

				/**
				 * Performs actions required after page render.
				 * @protected
				 * @virtual
				 */
				onRender: function() {
					MaskHelper.HideBodyMask();
					this.initDropzoneEvents();
				},

				/**
				 * Returns published message information.
				 * @protected
				 * @return {Object} Published message information.
				 */
				getMessagePublishedInfo: function() {
					return {
						primaryColumnValue: this.get("PrimaryColumnValue"),
						primaryColumnName: this.entitySchema.primaryColumnName,
						entitySchemaName: this.entitySchemaName
					};
				},

				/**
				 * Method calls after publication of the message. It can be overridden in child classes.
				 * @protected
				 * @virtual
				 */
				onPublished: function(response) {
					var messagePublishedInfo = this.getMessagePublishedInfo();
					this.set("PrimaryColumnValue", this.Terrasoft.generateGUID());
					this.set("IsInserted", false);
					var result = response.PublishMessageResult;
					if (this.getIsFeatureEnabled("HandleMessagePublishingExceptions")) {
						if (result && result.success) {
							this.showPublishMask();
							setTimeout(this.hidePublishMask.bind(this), 2000);
							this.sandbox.publish("ActionsDashboardMessagePublished", messagePublishedInfo);
						} else {
							var message = this.get("Resources.Strings.MessagePublishError");
							var errorMessage = !result && response.timedout === true
								? this.get("Resources.Strings.TimeOutError") : result.errorInfo.message;
							this.showInformationDialog(this.Ext.String.format(message, errorMessage));
						}
					} else {
						this.showPublishMask();
						setTimeout(this.hidePublishMask.bind(this), 2000);
						this.sandbox.publish("ActionsDashboardMessagePublished", messagePublishedInfo);
					}
				},

				/**
				 * Returns configuration for the publication of the message. It must be overridden in child classes.
				 * @protected
				 * @virtual
				 * @return {Object} configuration for the publication of the message.
				 */
				getServiceConfig: this.Terrasoft.emptyFn,

				/**
				 * Returns data for the publication of the message.
				 * @protected
				 * @virtual
				 * @returns {Array} An array of objects "key-value"
				 * corresponding to the pair "column name in the database, the value".
				 */
				getPublishData: function() {
					var publishData = [];
					var config = this.getListenerRecordData();
					var relationSchemaUId = config.relationSchemaUId;
					var relationSchemaRecordId = config.relationSchemaRecordId;
					publishData.push(
						{"Key": "EntitySchemaUId", "Value": relationSchemaUId},
						{"Key": "EntityId", "Value": relationSchemaRecordId},
						{"Key": "Id", "Value": this.get("PrimaryColumnValue")}
					);
					return publishData;
				},

				/**
				 * Subscribes to messages of the module.
				 * @protected
				 */
				subscribeMessages: function() {
					this.sandbox.subscribe("PublishMessageButtonInfo", function(publishMessageInfo) {
						this.setPublishButtonProperties(publishMessageInfo);
					}, this, [this.sandbox.id]);
					this.sandbox.subscribe("SavePublishers", this.onNewCardSaved, this);
					this.sandbox.subscribe("CardSaved", this.onCardSaved, this);
					this.sandbox.subscribe("DashboardRealoaded", this.onDashboardRealoaded, this);
					this.sandbox.subscribe("GetPublisherPageState", this.onGetPublisherPageState, this);
					this.sandbox.subscribe("PublishMessage", function(config) {
						this.publishMessage(config);
					}, this, [this.sandbox.id]);
				},

				/**
				 * Publishes unsaved messages.
				 * @protected
				 * @virtual
				 */
				onNewCardSaved: this.Terrasoft.emptyFn,

				/**
				 * Handles CardSaved event.
				 * @protected
				 * @virtual
				 */
				onCardSaved: function() {
					this.checkIsPublishButtonEnabled();
				},

				/**
				 * Handle Dashboard reload event.
				 * @protected
				 * @virtual
				 */
				onDashboardRealoaded: this.Terrasoft.emptyFn,

				/**
				 * Checks can message be published.
				 * @protected
				 */
				checkIsPublishButtonEnabled: function() {
					var result = this.getListenerRecordData();
					var isEnabled = result && result.additionalInfo && result.additionalInfo.status
						? !result.additionalInfo.status.IsFinal : true;
					var publishMessageInfo = {
						isPublishButtonEnabled: isEnabled,
						publishButtonHint: ""
					};
					this.setPublishButtonProperties(publishMessageInfo);
				},

				/**
				 * Sets publish button properties.
				 * @protected
				 * @param {Object} publishMessageInfo Publish message info.
				 */
				setPublishButtonProperties: function(publishMessageInfo) {
					var canPublishMessage = true;
					var publishButtonHint = "";
					if (publishMessageInfo != null) {
						canPublishMessage = publishMessageInfo.isPublishButtonEnabled;
						publishButtonHint = publishMessageInfo.publishButtonHint;
					}
					this.set("IsPublishButtonEnabled", canPublishMessage);
					this.set("PublishButtonHint", publishButtonHint);
				},

				/**
				 * Returns index depending on flag.
				 * @param {Boolean} over Shows whether the mouse on hover
				 * @protected
				 * @returns {number} index
				 */
				getIndex: function(over) {
					return over ? 100 : -100;
				},

				/**
				 * Sets index of element.
				 * @param container
				 * @param {Boolean} over Shows whether an element is visible or not
				 */
				setElementIndex: function(container, over) {
					var element = Ext.get(container);
					element.setStyle("zIndex", this.getIndex(over));
				},

				/**
				 * Changes z-index of dom element.
				 * @param {Boolean} over Shows whether the mouse on hover
				 * @protected
				 */
				onDropzoneHover: function(over) {
					this.setElementIndex("DropZoneContainer", over);
				},

				/**
				 * Runs when files are dropped.
				 * @param {Collection} files Collection of files
				 * @protected
				 */
				onFileSelected: function(files) {
					this.onAttachFileSelected(files, true);
				},

				/**
				 * Returns the dom element of container
				 * @returns {string}
				 * @protected
				 */
				getDropzone: function() {
					var element = Ext.get("BodyContainer");
					if (!element) {
						return;
					}
					return element.dom;
				},

				/**
				 * Initializes drag and drop container events.
				 * @protected
				 */
				initDropzoneEvents: function() {
					var dropZoneContainer = this.getDropzone();
					if (!dropZoneContainer) {
						return;
					}
					this.Terrasoft.ConfigurationFileApi.initDropzoneEvents.call(this, dropZoneContainer,
							this.onDropzoneHover.bind(this),
							this.onFileSelected.bind(this)
					);
				},

				/**
				 * GetPublisherPageState message handler
				 * @param {String} cacheKey Identifier of the cache.
				 * @protected
				 */
				onGetPublisherPageState: function(cacheKey) {
					this._actualizeCanBeDestroyedState(cacheKey);
				},

				/**
				 * Checking if page contains data that needs to be published.
				 * @returns {boolean}
				 * @protected
				 * @virtual
				 */
				isNeedToBePublished: function() {
					return false;
				}
			}
		};
	});


