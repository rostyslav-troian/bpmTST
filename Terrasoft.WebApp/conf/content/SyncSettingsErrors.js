Terrasoft.configuration.Structures["SyncSettingsErrors"] = {innerHierarchyStack: ["SyncSettingsErrors"]};
define('SyncSettingsErrorsStructure', ['SyncSettingsErrorsResources'], function(resources) {return {schemaUId:'8819dacd-40a4-4336-a58e-ed3a9cb773b7',schemaCaption: "Synchronization settings errors list", parentSchemaName: "", schemaName:'SyncSettingsErrors',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SyncSettingsErrors", ["SyncSettingsErrorsResources", "SyncSettingsErrorItem", "css!SyncSettingsErrorsCSS"],
		function() {
	return {
		attributes: {
			/**
			 * Errors collection.
			 * @Type {Terrasoft.BaseViewModelCollection}
			 */
			"ErrorsCollection": {
				"dataValueType": this.Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Error item schema name.
			 * @type {String}
			 */
			"ErrorItemSchemaName": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT,
				"value": "SyncSettingsErrorItem"
			}
		},
		messages: {
			/**
			 * @message HideErrorTip
			 * Hides synchronization errors tip.
			 */
			"HideErrorTip": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Returns email message viewmodel class.
			 * @private
			 * @return {Object|*} Error item viewmodel class.
			 */
			_getViewModelClass: function() {
				var viewModelClass = this.get("ViewModelClass");
				return this.Terrasoft.deepClone(viewModelClass);
			},

			/**
			 * Returns settings with errors query.
			 * @private
			 * @return {Terrasoft.EntitySchemaQuery} EntitySchemaQuery instance.
			 */
			_getErrorsQuery: function(mailboxId) {
				var settingsEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MailboxSyncSettings"
				});
				this.addQueryColumns(settingsEsq);
				this._addQueryFilters(settingsEsq, mailboxId);
				this.addSyncFilters(settingsEsq, mailboxId);
				return settingsEsq;
			},

			/**
			 * Adds synchronization settings error filters to query.
			 * @private
			 * @param {Terrasoft.EntitySchemaQuery} settingsEsq EntitySchemaQuery instance.
			 */
			_addQueryFilters: function(settingsEsq, mailboxId) {
				var userFilters = settingsEsq.createFilterGroup();
				userFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				userFilters.add("userMailboxFilter", settingsEsq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnit",
						this.Terrasoft.SysValue.CURRENT_USER.value));
				userFilters.add("IsSharedFilter", settingsEsq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "IsShared", true));
				settingsEsq.filters.add("ErrorNotNull", settingsEsq.createColumnIsNotNullFilter("ErrorCode"));
				settingsEsq.filters.add("UserFilters", userFilters);
				if (this.isNotEmpty(mailboxId)) {
					settingsEsq.filters.add("MailboxIdFilter", settingsEsq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", mailboxId));
				}
			},

			/**
			 * Creates new grid layout error item and adds it to grid layout collection.
			 * @private
			 * @param {Terrasoft.BaseViewModel} entity Raw error data.
			 */
			_addGridLayoutItem: function(entity) {
				var mailserver = entity.get("MailServer");
				var mailbox = {
					id: entity.get("Id"),
					senderEmailAddress: entity.get("SenderEmailAddress"),
					mailServerId: mailserver.value,
					mailServerName: mailserver.displayValue,
					automaticallyAddNewEmails: entity.get("AutomaticallyAddNewEmails"),
					userName: entity.get("UserName"),
					useLogin: entity.get("UseLogin"),
					useEmailAddressAsLogin: entity.get("UseEmailAddressAsLogin"),
					useUserNameAsLogin: entity.get("UseUserNameAsLogin"),
					sendEmailsViaThisAccount: entity.get("SendEmailsViaThisAccount"),
					oAuthApplicationName: entity.get("OAuthApplicationName"),
					enableMailSynhronization: entity.get("EnableMailSynhronization")
				};
				var collection = this.get("ErrorsCollection");
				var errorItem = this.createErrorItem(entity.get("Id"), mailbox,
						entity.get("[SyncErrorMessage:Id:ErrorCode].UserMessage"),
						entity.get("ErrorCode"),
						entity.get("Action"));
				var errorItemId = errorItem.get("Id");
				if (!collection.contains(errorItemId)) {
					collection.insert(0, errorItemId, errorItem);
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * Adds specific for synchronization filters.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.EntitySchemaQuery} esq EntitySchemaQuery instance.
			 */
			addSyncFilters: Terrasoft.emptyFn,

			/**
			 * Removes viewmodel subscription to server messages.
			 * @protected
			 */
			unsubscribeServerChannelEvents: function() {
				this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
					this.onNewSyncError, this);
			},

			/**
			 * Subscribes viewmodel to server messages.
			 * @protected
			 */
			subscribeServerChannelEvents: function() {
				this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
					this.onNewSyncError, this);
			},

			/**
			 * Processes server channel message.
			 * @protected
			 * @param {Object} scope Server message scope.
			 * @param {Object} message Server message.
			 */
			onNewSyncError: function(scope, message) {
				if (message && message.Header && message.Header.Sender !== "SynchronizationError") {
					return;
				}
				var receivedMessage = this.Ext.decode(message.Body);
				var mailboxId = receivedMessage.MailboxId;
				this.removeExistingErrors(mailboxId);
				this.loadError(mailboxId);
			},

			/**
			 * Removes error items for mailbox from grid layout collection.
			 * @protected
			 * @param {String} mailboxId Mailbox unique identifier.
			 */
			removeExistingErrors: function(mailboxId) {
				var collection = this.get("ErrorsCollection");
				var existingMessages = collection.filterByFn(function(item) {
					return item.get("Id") === mailboxId;
				});
				existingMessages.each(function(item) {
					collection.remove(item);
				}, this);
			},

			/**
			 * Sends hide empty panel message when grid layout collection empty.
			 * @protected
			 */
			hideEmptyPanel: function() {
				var collection = this.get("ErrorsCollection");
				if (collection.isEmpty()) {
					this.sandbox.publish("HideErrorTip");
				}
			},

			/**
			 * Creates error item class instance.
			 * @protected
			 * @param {String} id Mailbox unique identifier.
			 * @param {Object} mailbox Mailbox configuration object.
			 * @param {String} mailbox.id Mailbox identifier.
			 * @param {String} mailbox.senderEmailAddress Mailbox sender email address.
			 * @param {String} mailbox.mailServerId Mailbox mail server identifier.
			 * @param {String} mailbox.mailServerName Mailbox mail server name.
			 * @param {String} mailbox.userName Mailbox user name.
			 * @param {Boolean} mailbox.useLogin Mailbox use login sign.
			 * @param {Boolean} mailbox.useEmailAddressAsLogin Mailbox use email address as login sign.
			 * @param {Boolean} mailbox.useUserNameAsLogin Mailbox use user name as login sign.
			 * @param {Boolean} mailbox.sendEmailsViaThisAccount Mailbox send emails via this account sign.
			 * @param {String} textTpl Error message template.
			 * @param {String} errorCode Error message code.
			 * @param {String} action Error message action.
			 * @return {Terrasoft.BaseViewModel} Error item class instance.
			 */
			createErrorItem: function(id, mailbox, textTpl, errorCode, action) {
				var errorItemClass = this._getViewModelClass();
				var errorItem = this.Ext.create(errorItemClass, {
					Ext: this.Ext,
					sandbox: this.sandbox,
					Terrasoft: this.Terrasoft,
					values: {
						"Id": id,
						"Mailbox": mailbox,
						"TextTpl": textTpl,
						"ErrorCode": errorCode,
						"Action": action
					}
				});
				errorItem.init();
				return errorItem;
			},

			/**
			 * Initializes grid layout items collection.
			 * @protected
			 */
			initErrorsCollection: function() {
				this.set("ErrorsCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
			},

			/**
			 * Adds synchronization settings columns to query.
			 * @protected
			 * @param {Terrasoft.EntitySchemaQuery} settingsEsq EntitySchemaQuery instance.
			 */
			addQueryColumns: function(settingsEsq) {
				settingsEsq.addColumn("Id");
				settingsEsq.addColumn("SenderEmailAddress");
				settingsEsq.addColumn("ErrorCode");
				settingsEsq.addColumn("AutomaticallyAddNewEmails");
				settingsEsq.addColumn("[SyncErrorMessage:Id:ErrorCode].UserMessage");
				settingsEsq.addColumn("[SyncErrorMessage:Id:ErrorCode].Action", "Action");
				settingsEsq.addColumn("MailServer");
				settingsEsq.addColumn("UserName");
				settingsEsq.addColumn("MailServer.UseLogin", "UseLogin");
				settingsEsq.addColumn("MailServer.UseEmailAddressAsLogin", "UseEmailAddressAsLogin");
				settingsEsq.addColumn("MailServer.UseUserNameAsLogin", "UseUserNameAsLogin");
				settingsEsq.addColumn("MailServer.OAuthApplication.AppClassName", "OAuthApplicationName");
				settingsEsq.addColumn("SendEmailsViaThisAccount");
				settingsEsq.addColumn("EnableMailSynhronization");
			},

			/**
			 * Loads synchronization settings with errors.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			loadErrors: function(callback, scope) {
				var settingsEsq = this._getErrorsQuery();
				settingsEsq.getEntityCollection(function(result) {
					if (result.success) {
						result.collection.each(this._addGridLayoutItem, this);
					}
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Loads synchronization settings with error for specified mailbox.
			 * @protected
			 * @param {String} mailboxId Mailbox identifier.
			 */
			loadError: function(mailboxId) {
				var settingsEsq = this._getErrorsQuery(mailboxId);
				settingsEsq.getEntityCollection(function(result) {
					if (result.success && !result.collection.isEmpty()) {
						this._addGridLayoutItem(result.collection.getByIndex(0));
					}
					this.hideEmptyPanel();
				}, this);
			},

			/**
			 * Returns error items schema builder config.
			 * @protected
			 * @return {Object} Schema builder config.
			 */
			getItemGeneratorConfig: function() {
				var errorItemSchema = this.get("ErrorItemSchemaName");
				return {
					schemaName: errorItemSchema
				};
			},

			/**
			 * Generates error message view model class and view config, using error item schema.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			buildSchema: function(callback, scope) {
				var schemaBuilder = this.Ext.create("Terrasoft.SchemaBuilder");
				var generatorConfig = this.getItemGeneratorConfig();
				schemaBuilder.build(generatorConfig, function(viewModelClass, viewConfig) {
					this.saveViewModelClass(viewModelClass);
					this.saveViewConfig(viewConfig);
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Saves generated error item view model class.
			 * @protected
			 * @param {Object} viewModelClass Error item view model class.
			 */
			saveViewModelClass: function(viewModelClass) {
				this.set("ViewModelClass", viewModelClass);
			},

			/**
			 * Saves generated error item view config.
			 * @protected
			 * @param {Object} viewConfig Error item view config.
			 */
			saveViewConfig: function(viewConfig) {
				var view = {
					"id": "ErrorContainer",
					"items": viewConfig
				};
				this.set("ErrorViewConfig", view);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.initErrorsCollection();
				this.callParent([function() {
					Terrasoft.chain(
						this.buildSchema,
						this.loadErrors,
						function() {
							this.subscribeServerChannelEvents();
							this.Ext.callback(callback, scope);
						}, this);
				}, this]);
			},

			/**
			 * Sets error item view config.
			 * @param {Object} itemConfig Error item config.
			 */
			onGetItemConfig: function(itemConfig) {
				var view = this.get("ErrorViewConfig");
				itemConfig.config = this.Terrasoft.deepClone(view);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
			 * @overridden
			 */
			destroy: function() {
				this.unsubscribeServerChannelEvents();
				this.callParent(arguments);
			}

			//endregion
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ErrorsContainerList",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "ContainerListGenerator.generateGrid",
					"collection": {"bindTo": "ErrorsCollection"},
					"onGetItemConfig": {"bindTo": "onGetItemConfig"},
					"idProperty": "Id",
					"skipId": true,
					"rowCssSelector": ".sync-error.selectable",
					"items": []
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


