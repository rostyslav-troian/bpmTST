Terrasoft.configuration.Structures["SendTestEmailContentSchema"] = {innerHierarchyStack: ["SendTestEmailContentSchema"], structureParent: "BaseModalBoxPage"};
define('SendTestEmailContentSchemaStructure', ['SendTestEmailContentSchemaResources'], function(resources) {return {schemaUId:'aa2c12e3-d1a9-41df-9a7e-679dd99068fb',schemaCaption: "Schema for test email content send", parentSchemaName: "BaseModalBoxPage", schemaName:'SendTestEmailContentSchema',parentSchemaUId:'b1ea6d50-78a5-443f-9d3c-2ba645946897',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SendTestEmailContentSchema", ["EmailHelperModule", "ServiceHelper", "SendTestEmailContentMixin",
	"css!SendTestEmailContentSchemaCSS"],
	function(EmailHelperModule, ServiceHelper) {

		var SendTestEmailConsts = {
			REPLICAUNDERTESTCACHEKEY: "ReplicaUnderTestLastValue"
		};

		return {
			mixins: {
				SendTestEmailContentMixin: "Terrasoft.SendTestEmailContentMixin"
			},
			attributes: {

				/**
				 * Bulk email.
				 */
				"BulkEmail": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * Selected emails.
				 */
				"EmailAddress": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true,
					caption: {
						bindTo: "Resources.Strings.EmailAddressCaption"
					},
					value: ""
				},

				/**
				 * Selected contact.
				 */
				"Contact": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					referenceSchemaName: "Contact",
					isRequired: true,
					isEnum: true
				},

				/**
				 * Send test email mode.
				 */
				"SendTestEmailMode": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "AllReplicas"
				},

				/**
				 * Modal box height.
				 */
				"ModalBoxHeight": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "270px"
				},

				/**
				 * Modal box with settings height.
				 */
				"ModalBoxWithSettingsHeight": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "420px"
				},

				/**
				 * Modal box width.
				 */
				"ModalBoxWidth": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "470px"
				},

				/**
				 * Mailing service name.
				 */
				"MailingServiceName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "MailingService"
				},

				/**
				 * Send test message method name.
				 */
				"SendTestMessageMethodName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "SendDCTestMessage"
				},

				/**
				 * DCReplica lookup enabled.
				 */
				"IsReplicaUnderTestEnabled": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},

				/**
				 * Selected DCReplica.
				 */
				"ReplicaUnderTest": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					referenceSchemaName: "DCReplica",
					lookupListConfig: {
						columns: ["Mask"],
						filters:
							function() {
								return this._getDCReplicaFilters();
							}
					}
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Gets filter for DCReplica.
				 * @private
				 * @return {Terrasoft.FilterGroup} FilterGroup instance for load predictable lookup column data.
				 */
				_getDCReplicaFilters: function() {
					var filterGroup = new Terrasoft.FilterGroup();
					filterGroup.add("RecordId", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "DCTemplate.RecordId", this.$BulkEmail.value)
					);
					return filterGroup;
				},

				/**
				 * Fetch the first default replica from db.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope for callback function.
				 */
				_fetchSingleReplicaFromDb: function(callback, scope) {
					var esq = this.getLookupQuery(null, "ReplicaUnderTest");
					esq.rowCount = 1;
					esq.getEntityCollection(function(response) {
						var collection = response.collection;
						if (response.success && collection && !collection.isEmpty()) {
							var item = collection.getByIndex(0);
							callback.call(scope, item);
						}
					}, this);
				},

				/**
				 * Initialize the selected replica value.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope for callback function.
				 */
				_initialiseReplicaUnderTestValue: function(callback, scope) {
					var cachedValue = this.Terrasoft.ClientPageSessionCache.getItem(SendTestEmailConsts.REPLICAUNDERTESTCACHEKEY);
					if (cachedValue) {
						callback.call(scope, cachedValue);
						return;
					}
					this._fetchSingleReplicaFromDb(function(entity) {
						var lookupValue = {
							value: entity.$value,
							displayValue: entity.$displayValue,
							Mask: entity.$Mask
						};
						callback.call(scope, lookupValue);
					});
				},

				_onSendCurrentReplicasModeChecked: function() {
					this.$IsReplicaUnderTestEnabled = true;
					this._initialiseReplicaUnderTestValue(function(lookupValue) {
						this.$ReplicaUnderTest = lookupValue;
					}, this);					
				},

				_onSendAllReplicasModeChecked: function() {
					this.$IsReplicaUnderTestEnabled = false;
					this.$ReplicaUnderTest = null;
				},

				/**
				 * Handle the change sending mode.
				 * @private
				 * @param {Boolean} value The value of radio button.
				 * @param {String} radioButtonName The name of radio button.
				 */
				_onSendTestEmailModeBlockChanged: function(value, radioButtonName) {
					if (!value) {
						return;
					}
					switch (radioButtonName) {
						case "SelectedReplica":
							this._onSendCurrentReplicasModeChecked();
							break;
						case "AllReplicas":
							this._onSendAllReplicasModeChecked();
							break;
					}
				},

				/**
				 * Cash the last selected value from ReplicaUnderTest lookup. 
				 * @private
				 * @param {Object} value Selected value. 
				 */
				_onReplicaUnderTestChange: function(value) {
					if (value) {
						this.Terrasoft.ClientPageSessionCache.setItem(SendTestEmailConsts.REPLICAUNDERTESTCACHEKEY, value);
					}
				},

				//endregion

				//region Methods: Protected

				/**
				 * Gets result of lookup query filter.
				 * @protected
				 * @param {Object} lookupListConfig Lookup config.
				 * @return {Terrasoft.FilterGroup} FilterGroup instance for load predictable lookup column data.
				 */
				getLookupQueryFilters: function(lookupListConfig) {
					if (Ext.isFunction(lookupListConfig.filters)) {
						return lookupListConfig.filters.call(this);
					}
				},

				/**
				 * Returns EntitySchemaQuery instance for load predictable lookup column data.
				 * @protected
				 * @param {String} filterValue Filter for primaryDisplayColumn.
				 * @param {String} columnName ViewModel column name.
				 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery instance for load predictable lookup column data.
				 */
				getLookupQuery: function(filterValue, columnName) {
					var esq = this.callParent(arguments);
					var lookupColumn = this.columns[columnName];
					var lookupListConfig = lookupColumn.lookupListConfig;
					if (!lookupListConfig) {
						return esq;
					}
					esq.filters = this.getLookupQueryFilters(lookupListConfig);
					return esq;
				},

				/**
				 * Validates email address and returns validation message.
				 * @protected
				 * @param {String} email Current email address value.
				 * @return {Object} Email validation result.
				 */
				checkEmailValidator: function(email) {
					var emailSplitRegexPattern = /[;,\s]\s*/;
					var emails = email.split(emailSplitRegexPattern);
					var result = true;
					var invalidEmail = "";
					var invalidMessage = "";
					var fullInvalidMessage = "";
					this.Terrasoft.each(emails, function(item) {
						result = result && EmailHelperModule.isEmailValid(item);
						if (!result) {
							invalidEmail = item;
						}
						return result;
					}, this);
					if (!result) {
						invalidMessage = this.get("Resources.Strings.IncorrectEmailMessage");
						fullInvalidMessage = this.Ext.String.format(
							this.get("Resources.Strings.FullInvalidEmailAddressMessage"),
							invalidEmail
						);
					}
					return {
						fullInvalidMessage: fullInvalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#getValidationMessage.
				 * @override
				 */
				getValidationMessage: function() {
					var emailValidationInfo = this.checkEmailValidator(this.get("EmailAddress"));
					var fullInvalidMessage = emailValidationInfo && emailValidationInfo.fullInvalidMessage;
					if (!this.Ext.isEmpty(fullInvalidMessage)) {
						return fullInvalidMessage;
					}
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2ViewModel#setValidationConfig.
				 * @override
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("EmailAddress", this.checkEmailValidator);
				},

				/**
				 * Initializes default values.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Scope for callback function.
				 */
				initDefaultValues: function(callback, scope) {
					var moduleInfo = this.get("moduleInfo");
					this.set("BulkEmail", {
						value: moduleInfo.bulkEmailId
					});
					this.set("ReplicaCount", moduleInfo.replicaCount);
					this.set("ReplicaMask", moduleInfo.replicaMask);
					if (!this.Ext.isEmpty(moduleInfo.replicaMask)) {
						this.set("SendTestEmailMode", "AllReplicas");
					}
					this.Terrasoft.SysSettings.querySysSettingsItem("TestSendingBulkEmailContact",
						function(testSendingBulkEmailContact) {
							this.set("Contact", testSendingBulkEmailContact);
							this.Ext.callback(callback, scope);
						}, this);
				},

				/**
				 * @inheritdoc Terrasoft.ModalBoxSchemaModule#init.
				 * @override
				 */
				init: function(callback, scope) {
					Terrasoft.ClientPageSessionCache.removeItem(SendTestEmailConsts.REPLICAUNDERTESTCACHEKEY);
					this.callParent([function() {
						this.initDefaultValues(callback, scope);
					}, this]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseModalBoxPage#getHeader.
				 * @override
				 */
				getHeader: function() {
					return this.get("Resources.Strings.SendTestEmailContentModalBoxHeader");
				},

				/**
				 * Actualizes modal box size.
				 * @protected
				 */
				actualizeModalBoxSize: function() {
					var modalBoxHeight = this.$ModalBoxHeight;
					if (this.isSendTestEmailModeBlockVisible()) {
						modalBoxHeight = this.$ModalBoxWithSettingsHeight;
					}
					this.updateSize(this.$ModalBoxWidth, modalBoxHeight);
				},

				/**
				 * @inheritdoc Terrasoft.ModalBoxSchemaModule#onRender.
				 * @override
				 */
				onRender: function() {
					this.callParent(arguments);
					this.actualizeModalBoxSize();
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
				 * Shows the success of SendTestMessage request.
				 * @protected
				 * @param {Object} response Response object.
				 */
				sendDCTestMessageCallBack: function(response) {
					this.hideModalBoxMask();
					if (!this.Ext.isEmpty(response.message)) {
						this.showInformationDialog(response.message);
					} else if (response.sentReplicasCount !== response.replicasCount) {
						var message = this.Ext.String.format(
							this.get("Resources.Strings.SendDCTestMessageSuccessMessage"),
							response.sentReplicasCount, response.replicasCount);
						this.showInformationDialog(message);
					} else if (!response.success) {
						this.showInformationDialog(this.get("Resources.Strings.SendTestBulkMessageFailMessage"));
					} else {
						this.showInformationDialog(this.get("Resources.Strings.SendTestBulkMessageSuccessMessage"),
							this.close);
					}
				},

				/**
				 * Returns data for SendDCTestMessage request.
				 * @protected
				 * @return {Object} Data for SendDCTestMessage request.
				 */
				getSendDCTestMessageConfig: function() {
					var replicaMasksParam = null;
					if (this.$SendTestEmailMode === "SelectedReplica") {
						replicaMasksParam = [];
						replicaMasksParam.push(this.$ReplicaUnderTest.Mask);
					}
					return {
						data: {
							bulkEmailId: this.get("BulkEmail").value,
							contactId: this.get("Contact").value,
							emailRecipients: this.get("EmailAddress"),
							replicaMasks: replicaMasksParam
						}
					};
				},

				/**
				 * Sends dynamic content test message.
				 * @protected
				 */
				sendDCTestMessage: function() {
					var data = this.getSendDCTestMessageConfig();
					ServiceHelper.callService(this.$MailingServiceName, this.$SendTestMessageMethodName,
						this.sendDCTestMessageCallBack, data, this);
				},

				//endregion

				//region Methods: Public

				/**
				 * Send button click handler.
				 * @public
				 */
				onSendClick: function() {
					this.$LastActionTag = "Send";
					this.sendGoogleTagManagerData();
					this.send();
				},

				/**
				 * Returns SendAllTemplates radio button caption.
				 * @public
				 * @return {String} Radio button caption.
				 */
				getSendAllTemplatesCaption: function() {
					return this.Ext.String.format(this.get("Resources.Strings.SendAllTemplatesCaption"),
						this.get("ReplicaCount"));
				},

				/**
				 * Returns SendTestEmailModeBlock container visibility.
				 * @public
				 * @return {Boolean} SendTestEmailModeBlock container visibility.
				 */
				isSendTestEmailModeBlockVisible: function() {
					return this.$ReplicaCount > 1 && !this.Ext.isEmpty(this.$ReplicaMask);
				},

				/**
				 * Sends test email if validated successfully.
				 * @public
				 */
				send: function() {
					if (!this.validate()) {
						var message = this.getValidationMessage();
						this.showInformationDialog(message, null, null);
						return;
					}
					this.validateBulkEmail(this.sendDCTestMessage, this);
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/ [{
					"operation": "insert",
					"name": "TestBulkEmailContainer",
					"parentName": "CardContentWrapper",
					"propertyName": "items",
					"values": {
						"id": "testBulkEmailContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EmailAddress",
					"parentName": "TestBulkEmailContainer",
					"propertyName": "items",
					"values": {
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"caption": {
							"bindTo": "Resources.Strings.EmailsFieldCaption"
						},
						"classes": {
							"wrapClassName": "vertical-field-label"
						},
						"tip": {
							"content": {
								"bindTo": "Resources.Strings.EmailAddressHint"
							},
							"displayMode": this.Terrasoft.controls.TipEnums.displayMode.WIDE
						},
						"controlConfig": {
							"classes": ["email-memo-edit"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "SendTestEmailModeContainer",
					"parentName": "TestBulkEmailContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {
							"bindTo": "isSendTestEmailModeBlockVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "SendTestEmailModeBlockLabel",
					"parentName": "SendTestEmailModeContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"className": "Terrasoft.Label",
						"caption": {
							"bindTo": "Resources.Strings.SendTestEmailModeBlockCaption"
						},
						"classes": {
							"labelClass": ["template-settings-block-label"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "SendTestEmailModeContainer",
					"name": "SendTestEmailModeBlock",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.RADIO_GROUP,
						"value": {
							"bindTo": "SendTestEmailMode"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SendTestEmailModeBlock",
					"propertyName": "items",
					"name": "SendAllTemplates",
					"values": {
						"caption": {
							"bindTo": "getSendAllTemplatesCaption"
						},
						"value": "AllReplicas",
						"controlConfig": {
							"checkedchanged": {"bindTo": "_onSendTestEmailModeBlockChanged"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "SendTestEmailModeBlock",
					"propertyName": "items",
					"name": "SelectedReplica",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.SendCurrentTemplateCaption"
						},
						"value": "SelectedReplica",
						"controlConfig": {
							"checkedchanged": {"bindTo": "_onSendTestEmailModeBlockChanged"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ReplicaUnderTest",
					"parentName": "TestBulkEmailContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"enabled": "$IsReplicaUnderTestEnabled",
						"classes": {
							"wrapClassName": "vertical-field-without-label"
						},
						"controlConfig": {
							"change": "$_onReplicaUnderTestChange"
						},
						"labelConfig": {
							"visible": false
						},
						"visible": {
							"bindTo": "isSendTestEmailModeBlockVisible"
						}
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "TestBulkEmailContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"caption": {
							"bindTo": "Resources.Strings.SelectedContactFieldCaption"
						},
						"classes": {
							"wrapClassName": "vertical-field-label"
						},
						"tip": {
							"content": {
								"bindTo": "Resources.Strings.ContactHint"
							},
							"displayMode": this.Terrasoft.controls.TipEnums.displayMode.WIDE
						}
					}
				},
				{
					"operation": "insert",
					"name": "ButtonsContainer",
					"parentName": "TestBulkEmailContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							wrapClassName: ["buttons-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SendTestEmail",
					"parentName": "ButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"click": {
							"bindTo": "onSendClick"
						},
						"caption": {
							"bindTo": "Resources.Strings.SendTestEmailButtonCaption"
						},
						"classes": {
							"textClass": ["tap-panel-box"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "ButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"click": {
							"bindTo": "close"
						},
						"caption": {
							"bindTo": "Resources.Strings.CancelButtonCaption"
						},
						"classes": {
							"textClass": ["tap-panel-box"]
						}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


