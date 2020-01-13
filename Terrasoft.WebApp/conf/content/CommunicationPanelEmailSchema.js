Terrasoft.configuration.Structures["CommunicationPanelEmailSchema"] = {innerHierarchyStack: ["CommunicationPanelEmailSchemaUIv2", "CommunicationPanelEmailSchema"]};
define('CommunicationPanelEmailSchemaUIv2Structure', ['CommunicationPanelEmailSchemaUIv2Resources'], function(resources) {return {schemaUId:'5d2bb6b4-50c8-49ba-be41-560715e55c30',schemaCaption: "Email management schema for communication panel", parentSchemaName: "", schemaName:'CommunicationPanelEmailSchemaUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelEmailSchemaStructure', ['CommunicationPanelEmailSchemaResources'], function(resources) {return {schemaUId:'93d87194-1e3d-4d67-b62c-cb1f4501425b',schemaCaption: "Email management schema for communication panel", parentSchemaName: "CommunicationPanelEmailSchemaUIv2", schemaName:'CommunicationPanelEmailSchema',parentSchemaUId:'5d2bb6b4-50c8-49ba-be41-560715e55c30',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"CommunicationPanelEmailSchemaUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('CommunicationPanelEmailSchemaUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("CommunicationPanelEmailSchemaUIv2", ["CommunicationPanelEmailSchemaResources", "ContainerListGenerator",
			"ConfigurationConstants", "ConfigurationEnums", "ModalBox", "NetworkUtilities",
			"EmailConstants", "ProcessModuleUtilities", "ExchangeNUIConstants", "BusinessRulesApplierV2",
			"EntityConnectionLinksUtilities", "css!EntityConnectionLinksUtilities", "CheckModuleDestroyMixin",
			"ProcessEntryPointUtilities", "EmptyEmailPanelSchema", "RelatedEmailsMixin"],
		function(resources, ContainerListGenerator, ConfigurationConstants, ConfigurationEnums, ModalBox, NetworkUtilities,
				EmailConstants, ProcessModuleUtilities, ExchangeNUIConstants, BusinessRulesApplier) {
			return {
				entitySchemaName: EmailConstants.entitySchemaName,

				//region Fields: Private

				properties: {
					/**
					 * Mask config.
					 */
					maskConfig: {
						selector: ".right-panel-modules-container",
						timeout: 0
					}
				},
				//endregion
				messages: {
					/**
					 * @message GetHistoryState
					 * Message asks current history state.
					 */
					"GetHistoryState": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message PushHistoryState
					 * Message sets new history state.
					 */
					"PushHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message ReloadTabs
					 * Invoke tabs reload.
					 */
					"ReloadSettings": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message EmailboxSyncSettingsInserted
					 * Notify that new email sync settings has been added.
					 */
					"EmailboxSyncSettingsInserted": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message UpdateNewEmailsCounter
					 * Updates "New email counter" in expand email communication panel.
					 */
					"UpdateNewEmailsCounter": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message UpdateNewNotProcessedIncomingEmailsCounter
					 * Updates "New incoming and not processed email counter" in collapsed email communication panel.
					 */
					"UpdateNewNotProcessedIncomingEmailsCounter": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message ReloadNotProcessedIncomingEmails
					 * Reloads incoming and need processing emails in communication panel.
					 */
					"ReloadNotProcessedIncomingEmails": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message ShowRelatedEmails
					 * Loads related emails to email panel.
					 */
					"ShowRelatedEmails": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
					}
				},
				mixins: {
					/**
					 * Entity connection lookup columns mixin.
					 */
					EntityConnectionLinksUtilities: Terrasoft.EntityConnectionLinksUtilities,
					/**
					 * @class Terrasoft.CheckModuleDestroyMixin Implements publish and show CanBeDestroy message.
					 */
					CheckModuleDestroyMixin: "Terrasoft.CheckModuleDestroyMixin",
					/**
					 * @class Terrasoft.RelatedEmailsMixin Provides methods for related eamils search.
					 */
					RelatedEmailsMixin: "Terrasoft.RelatedEmailsMixin"
				},
				attributes: {
					/**
					 * Mails collection.
					 * @Type {Terrasoft.BaseViewModelCollection}
					 */
					"EmailCollection": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Email message data collection.
					 * @Type {Terrasoft.BaseViewModelCollection}
					 */
					"EmdCollection": {
						dataValueType: this.Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Indicates that ones more data page can be loaded.
					 * @private
					 */
					"CanLoadMoreData": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: true
					},

					/**
					 * Configuration object for generating model's class of the mail message
					 * and mail display config.
					 * @private
					 */
					"SchemaGeneratorConfig": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * View config for mail message.
					 * @private
					 */
					"EmailViewConfig": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Mails quantity per page.
					 */
					"RowCount": {
						dataValueType: this.Terrasoft.DataValueType.INTEGER,
						value: 15
					},

					/**
					 * View model class of mail message.
					 */
					"ViewModelClass": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Array of parameters that can be used for starting mail messages processes.
					 * @Type {Array}
					 */
					"EmailProcessList": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Array of columns of entity connections.
					 * @Type {Array}
					 */
					"EntityConnectionColumnList": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Array of columns of default entity connections.
					 * @Type {Array}
					 */
					"DefaultEntityConnectionColumns": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * The tag to choose mail messages processes.
					 * @Type {String}
					 */
					"EmailProcessTag": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						value: "Email Process"
					},

					/**
					 * Mail message type.
					 */
					"EmailType": {
						"dataValueType": Terrasoft.DataValueType.GUID,
						"value": EmailConstants.emailType.INCOMING
					},

					/**
					 * Flag represents that mail message has been processed.
					 */
					"IsProcessed": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": true
					},

					/**
					 * Email message type button menu items collection.
					 */
					"EmailTypeMenuItems": {
						"dataValueType": Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * Email tab actions menu items collection.
					 */
					"EmailTabActionsMenuCollection": {
						"dataValueType": this.Terrasoft.DataValueType.COLLECTION
					},

					/**
					 * The ID of the selected e-mail message.
					 */
					"SelectedEmailItemId": {
						dataValueType: this.Terrasoft.DataValueType.GUID,
						value: Terrasoft.GUID_EMPTY
					},

					/**
					 * Mark of the end of the boot of email-messages in the panel.
					 */
					"IsDataLoaded": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: true
					},

					/**
					 * Sets go to mailbox settings button visibility.
					 */
					"IsEmailBoxSettingsButtonVisible": {
						dataVlueType: this.Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * Array of existing email account ids.
					 */
					"EmailAccountIds": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Array of existing email accounts.
					 */
					"EmailAccounts": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Selected account email identifier in mailbox filters menu.
					 */
					"SelectedEmailAccountId": {
						dataValueType: Terrasoft.DataValueType.GUID,
						value: null
					},

					/**
					 * Parameter, which indicates the tooltip is visible or hidden.
					 */
					"ShowEmailTabActionsTooltip": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},

					/**
					 * Parameter, which indicates the actions button is visible or hidden.
					 */
					"IsEmailTabActionsVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: true
					},

					/**
					 * Tooltip text for email tab actions button.
					 */
					"TextEmailTabActionsTooltip": {
						dataValueType: Terrasoft.DataValueType.TEXT
					},

					/**
					 * New email messages counter.
					 */
					"NewEmailsCounter": {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						value: 0
					},

					/**
					 * Sign that processing button is enabled or not enabled.
					 */
					"IsProcessingButtonEnabled": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						value: true
					},

					/**
					 * Empty panel message schema builder config.
					 */
					"EmptyMessageGeneratorConfig": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Empty panel message iew config.
					 */
					"EmptyMessageConfig": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Empty panel message view model instance.
					 */
					"BlankSlateModel": {
						dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Current panel display state. State options taken from {@link Terrasoft.configuration.EmailConstants}.
					 */
					"DisplayState": {
						dataValueType: Terrasoft.DataValueType.INTEGER,
						value: 0
					}
				},
				methods: {

					//region Methods: Private

					/**
					 * Initialize EntitySchemaQuery pagable options.
					 * @private
					 * @param {Terrasoft.EntitySchemaQuery} select Emails entity schemq query.
					 * @param {Object} config Select options.
					 */
					initializePageableOptions: function(select, config) {
						var isPageable = config.isPageable;
						select.isPageable = isPageable;
						var rowCount = config.rowCount;
						select.rowCount = isPageable ? rowCount : -1;
						if (!isPageable) {
							return;
						}
						var collection = config.collection;
						var primaryColumnName = config.primaryColumnName;
						var schemaQueryColumns = config.schemaQueryColumns;
						var isClearGridData = config.isClearGridData;
						var conditionalValues = null;
						var loadedRecordsCount = collection.getCount();
						if (Terrasoft.useOffsetFetchPaging) {
							select.rowsOffset = isClearGridData ? 0 : loadedRecordsCount;
						} else {
							var isNextPageLoading = (loadedRecordsCount > 0 && !isClearGridData);
							if (isNextPageLoading) {
								var lastRecord = config.lastRecord || collection.last();
								var columnDataValueType = this.getDataValueType(lastRecord, primaryColumnName);
								conditionalValues = this.Ext.create("Terrasoft.ColumnValues");
								schemaQueryColumns.eachKey(function(columnName, column) {
									var value = lastRecord.get(columnName);
									var dataValueType = this.getDataValueType(lastRecord, columnName);
									if (column.orderDirection !== Terrasoft.OrderDirection.NONE) {
										if (dataValueType === Terrasoft.DataValueType.LOOKUP) {
											value = value ? value.displayValue : null;
											dataValueType = Terrasoft.DataValueType.TEXT;
										}
										conditionalValues.setParameterValue(columnName, value, dataValueType);
									}
								}, this);
								conditionalValues.setParameterValue(primaryColumnName,
										lastRecord.get(primaryColumnName), columnDataValueType);
							}
							select.conditionalValues = conditionalValues;
						}
					},

					/**
					 * Generates columns to load array.
					 * @private
					 * @return {Array} Columns to load array.
					 */
					getEmailSelectColumns: function() {
						const entityConnectionColumns = this.get("EntityConnectionColumnList");
						const entityConnectionTypeColumns =
							this.getEntityConnectionTypeColumnList(entityConnectionColumns);
						let emailSelectColumns = [
							"Id", "Author", "Owner", "Contact", "Sender", "Recepient", "CopyRecepient",
							"BlindCopyRecepient", "Title", "StartDate", "MessageType", "Type", "CreatedOn",
							"SendDate", "ModifiedOn", "Priority", "DueDate", "ActivityCategory",
							"ActivityConnection.Type", "Status", "IsNeedProcess", "EmailSendStatus", "SenderContact",
							"SenderContact.Account"
						];
						const previewColumnName = this.getIsFeatureEnabled("ActivityPreview") ? "Preview" : "Body";
						emailSelectColumns.push(previewColumnName);
						emailSelectColumns = this.Ext.Array.merge(emailSelectColumns, entityConnectionColumns,
							entityConnectionTypeColumns);
						return emailSelectColumns;
					},

					/**
					 * Returns entity connection type column list.
					 * @private
					 * @param {String[]} entityConnectionColumnNames connection column list.
					 * @return {String[]} Entity connection type column list.
					 */
					getEntityConnectionTypeColumnList: function(entityConnectionColumnNames) {
						let entityConnectionTypeColumns = [];
						const entitySchema = this.entitySchema;
						const moduleStructure = Terrasoft.configuration.ModuleStructure;
						this.Terrasoft.each(entityConnectionColumnNames, function(columnName) {
							const entityConnectionColumn = entitySchema.getColumnByName(columnName);
							if (!entityConnectionColumn || !entityConnectionColumn.referenceSchemaName) {
								return true;
							}
							const module = moduleStructure[entityConnectionColumn.referenceSchemaName];
							if (this.Ext.isEmpty(module)) {
								return true;
							}
							const typeColumnName = module.attribute;
							if (this.Ext.isEmpty(typeColumnName)) {
								return true;
							}
							entityConnectionTypeColumns.push(columnName.concat(".", typeColumnName));
						}, this);
						this.set("EntityConnectionTypeColumnList", entityConnectionTypeColumns);
						return entityConnectionTypeColumns;
					},

					/**
					 * Generates email accounts select.
					 * @private
					 * @return {Terrasoft.EntitySchemaQuery} Email accounts select.
					 */
					getMailboxSettingsSelect: function() {
						var settingsEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "MailboxSyncSettings"
						});
						settingsEsq.addColumn("Id");
						settingsEsq.addColumn("IsShared");
						var userEmailColumn = settingsEsq.addColumn("SenderEmailAddress");
						userEmailColumn.orderPosition = 0;
						userEmailColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
						var filters = this.Terrasoft.createFilterGroup();
						var currentUserId = this.Terrasoft.SysValue.CURRENT_USER.value;
						if (this.getIsFeatureEnabled("SharedMailboxes")) {
							filters.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
							var sharedMailBoxFilters = this.Terrasoft.createFilterGroup();
							var columnPath = "[EmailDefRights:Record:Id]." +
									"[SysAdminUnitInRole:SysAdminUnitRoleId:SysAdminUnit].SysAdminUnit";
							sharedMailBoxFilters.add("UserCanSeeSharedEmailsFilter",
									settingsEsq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
											columnPath, currentUserId));
							sharedMailBoxFilters.add("MailboxIsSharedFilter", settingsEsq.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL, "IsShared", true));
							filters.add("filterSharedMailboxes", sharedMailBoxFilters);
						}
						filters.add("filterSysAdminUnit", settingsEsq.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "SysAdminUnit", currentUserId));
						settingsEsq.filters = filters;
						return settingsEsq;
					},

					/**
					 * Subscribes panel model for email model events.
					 * @private
					 * @param {Terrasoft.BaseViewModel} model Email model instance.
					 */
					subscribeModelEvents: function(model) {
						model.on("emailDeleted", this.onDeleteEmail, this);
						model.on("entitySaved", this.onEntitySaved, this);
						model.on("senderSet", this.onEmailSenderSet, this);
					},

					/**
					 * Unsubscribes panel model from email model events.
					 * @private
					 * @param {Terrasoft.BaseViewModel} model Email model instance.
					 */
					unsubscribeModelEvents: function(model) {
						model.un("emailDeleted", this.onDeleteEmail, this);
						model.un("entitySaved", this.onEntitySaved, this);
						model.un("senderSet", this.onEmailSenderSet, this);
					},

					/**
					 * Generates view model class and view config, using client unit schema.
					 * @param {Object} buildConfig Schema builder config.
					 * @param {String} buildConfig.schemaName Client unit schema name.
					 * @param {String} buildConfig.profileKey Client unit schema profile key.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					_internalBuildSchema: function(buildConfig, callback, scope) {
						var schemaBuilderName = this.get("SchemaBuilderName") || "Terrasoft.SchemaBuilder";
						var schemaBuilder = this.Ext.create(schemaBuilderName);
						var generatorConfig = this.Terrasoft.deepClone(buildConfig);
						schemaBuilder.build(generatorConfig, function(viewModelClass, viewConfig) {
							this.Ext.callback(callback, scope, [viewModelClass, viewConfig]);
						}, this);
					},

					/**
					 * Adds incoming email filters.
					 * @private
					 * @param {Terrasoft.FilterGroup} filters Emails query filters.
					 * @param {String} roleColumn Participant role column path.
					 * @param {Array} rolesIds Emails query.
					 */
					_addIncomingFilter: function(filters, roleColumn, rolesIds) {
						this._addOutgoingFilter(filters, roleColumn, rolesIds);
					},

					/**
					 * Adds commons incoming/outgoing email filters.
					 * @private
					 * @param {Terrasoft.FilterGroup} filters Emails query filters.
					 * @param {String} roleColumn Participant role column path.
					 * @param {Array} rolesIds Participant role column path.
					 */
					_addOutgoingFilter: function(filters, roleColumn, rolesIds) {
						var createColumnInFilter = Terrasoft.createColumnInFilterWithParameters;
						var createColumnFilter = Terrasoft.createColumnFilterWithParameter;
						var equal = Terrasoft.ComparisonType.EQUAL;
						var statusSended = ConfigurationConstants.Activity.EmailSendStatus.Sended;
						var mssPathFormat = "MailboxSyncSettings";
						var roleFilter = createColumnInFilter(roleColumn, rolesIds);
						var mssFilter = createColumnInFilter(mssPathFormat, this._getSelectedMailboxesIds());
						filters.add("RoleFilter", roleFilter);
						filters.add("MSSFilter", mssFilter);
						filters.add("SendStatusFilter", createColumnFilter(equal, "Activity.EmailSendStatus", statusSended));
						filters.add("SendDateFilter", this.Terrasoft.createColumnIsNotNullFilter("SendDate"));
					},

					/**
					 * Adds draft email filters.
					 * @private
					 * @param {Terrasoft.FilterGroup} filters Emails query filters.
					 */
					_addDraftFilter: function(filters) {
						filters.add("SendStatusFilter", this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.NOT_EQUAL,
							"Activity.EmailSendStatus",
							ConfigurationConstants.Activity.EmailSendStatus.Sended));
						filters.add("EmptyMailboxSyncSettingsFilter", this.Terrasoft.createColumnIsNullFilter(
							"MailboxSyncSettings"));
					},

					/**
					 * Adds requested email type filters.
					 * @private
					 * @param {Terrasoft.FilterGroup} filters Emails query filters.
					 * @param {Terrasoft.EntitySchemaQuery} esq Emails query.
					 */
					_addFilterByEmailType: function(filters, esq) {
						var roleColumn = "Role";
						var emailType = this.get("EmailType");
						if (!this.getIsFeatureEnabled("SharedMailboxes") || emailType === EmailConstants.emailType.DRAFT) {
							var currentUserContact = Terrasoft.SysValue.CURRENT_USER_CONTACT.value;
							filters.add("currentContactFilter", this.Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Owner", currentUserContact));
						}
						var participantRoles = ConfigurationConstants.Activity.ParticipantRole;
						switch (emailType) {
							case EmailConstants.emailType.INCOMING:
								this._addIncomingFilter(filters, roleColumn, [
									participantRoles.To, participantRoles.CC,
									participantRoles.BCC
								]);
								break;
							case EmailConstants.emailType.OUTGOING:
								this._addOutgoingFilter(filters, roleColumn, [participantRoles.From]);
								break;
							case EmailConstants.emailType.DRAFT:
								this._addDraftFilter(filters);
								break;
							default:
								break;
						}
					},

					/**
					 * Returns selected for display mailboxes array.
					 * @private
					 * @return {Array} Selected for display mailboxes array.
					 */
					_getSelectedMailboxesIds: function() {
						var selectedEmailAccountId = this.$SelectedEmailAccountId;
						if (selectedEmailAccountId) {
							return [selectedEmailAccountId];
						}
						return this.$EmailAccountIds || [];
					},

					/**
					 * REturns is any mailbox selected for display.
					 * @private
					 * @return {Boolean} True, when any mailbox selected for display. Otherwise returns false.
					 */
					_anyMailboxSelected: function() {
						if (!this.getIsFeatureEnabled("SharedMailboxes")) {
							return true;
						}
						return !this.Terrasoft.isEmpty(this._getSelectedMailboxesIds());
					},

					/**
					 * Returns current tab settings object.
					 * @private
					 * @return {Object} Current tab settings object.
					 */
					_getCurrentTabSettings: function() {
						var tabSettings = {};
						var attributesNames = this.getTabSettingsNames();
						this.Terrasoft.each(attributesNames, function(attributeName) {
							tabSettings[attributeName] = this.Terrasoft.deepClone(this.get(attributeName));
						}, this);
						return tabSettings;
					},

					/**
					 * Returns saved tab settings object. Values that are not saved will be taken from current tab.
					 * @private
					 * @return {Object} Saved tab settings object.
					 */
					_getSavedTabSettings: function() {
						var profile = this.getProfile() || {};
						var tabSettings = profile.TabSettings || {};
						var currentTabSettings = this._getCurrentTabSettings();
						tabSettings = this.Ext.apply(currentTabSettings, tabSettings);
						return tabSettings;
					},

					/**
					 * Saves current tab settings to profile.
					 * @private
					 */
					_saveTabSettings: function() {
						if (!this.getIsFeatureEnabled("SharedMailboxes")) {
							return;
						}
						var profile = this.getProfile() || {};
						var profileKey = this.getProfileKey();
						profile.TabSettings = this._getCurrentTabSettings();
						this.Terrasoft.saveUserProfile(profileKey, profile, false);
					},

					/**
					 * Sets actual SelectedEmailAccountId value when  avaliable mailboxes list changed.
					 * @private
					 */
					_fixSelectedEmailAccountId: function() {
						if (this.isNotEmpty(this.$SelectedEmailAccountId) &&
								!this.Ext.Array.contains(this.$EmailAccountIds, this.$SelectedEmailAccountId)) {
							this.$SelectedEmailAccountId = null;
							this._saveTabSettings();
						}
					},
					/**
					 * Returns image config for active mailbox menu item.
					 * @private
					 * @param {String} attributeName Tab filter attribute name.
					 * @param {Object} value Menu item filter attribute value.
					 * @return {Object|null} If value equals tab filter attribute value, returns active icon config.
					 * Returns null otherwise.
					 */
					_getEmailActiveFilterIcon: function(attributeName, value) {
						return value === this.get(attributeName) ? this.get("Resources.Images.ActiveMenuIcon") : null;
					},

					/**
					 * Returns image config for active mailbox menu item.
					 * @private
					 * @param {Guid} mailboxId Mailbox menu item identifier.
					 * @return {Object|null} If mailboxId is current selected mailbox id, returns active icon config.
					 * Returns null otherwise.
					 */
					_getActiveMailboxMenuIcon: function(mailboxId) {
						return this._getEmailActiveFilterIcon("SelectedEmailAccountId", mailboxId);
					},

					/**
					 * Returns image config for active email type menu item.
					 * @private
					 * @param {Guid} emailTypeId Email type menu item identifier.
					 * @return {Object|null} If emailTypeId are current selected email type id, returns active icon config.
					 * Returns null otherwise.
					 */
					_getActiveEmailTypeMenuIcon: function(emailTypeId) {
						return this._getEmailActiveFilterIcon("EmailType", emailTypeId);
					},

					/**
					 * Returns image config for active mailbox menu item.
					 * @private
					 * @param {Guid} isProcessed Mailbox menu item processed state.
					 * @return {Object|null} If isProcessed equals current tab processed filter, returns active icon config.
					 * Returns null otherwise.
					 */
					_getActiveIsProcessedMailboxMenuIcon: function(isProcessed) {
						return this._getEmailActiveFilterIcon("IsProcessed", isProcessed);
					},

					/**
					 * Creates email type menu item view model.
					 * @private
					 * @param {Object} config Menu item config object.
					 * @param {String} config.tag Menu item unique tag.
					 * @param {String} config.caption Menu item caption.
					 * @param {String} [config.onClick] Menu item click event handler name.
					 * @return {Terrasoft.BaseViewModel} Menu item view model.
					 */
					_getTypeEmailMenuItem: function(config) {
						var tag = config.tag;
						var caption = config.caption;
						var values = {
							"Id": "type_" + Terrasoft.generateGUID(),
							"Caption": config.caption,
							"Tag": tag,
							"Click": {"bindTo": config.onClick || "onMailTypeChange"},
							"MarkerValue": caption
						};
						if (this.getIsFeatureEnabled("SharedMailboxes")) {
							var imageMethodName = config.imageMethodName || "_getActiveEmailTypeMenuIcon";
							values.ImageConfig = this[imageMethodName].call(this, tag);
						}
						return this.Ext.create("Terrasoft.BaseViewModel", {
							values: values
						});
					},

					/**
					 * Creates email accounts menu items view models.
					 * @private
					 * @param {Terrasoft.BaseViewModelCollection} emailTypeMenuItems Menu items collection to fill.
					 */
					_addMailboxesMenuItems: function(emailTypeMenuItems) {
						if (this.getIsFeatureEnabled("SharedMailboxes") && this.isNotEmpty(this.$EmailAccounts)) {
							var emailAccountsSeparator = this.getButtonMenuSeparator({
								"Type": "Terrasoft.MenuSeparator"
							});
							emailTypeMenuItems.addItem(emailAccountsSeparator);
							this.Terrasoft.each(this.$EmailAccounts, function(emailAccount) {
								var emailAccountItem = this.Ext.create("Terrasoft.BaseViewModel", {
									values: {
										"Id": "emailAccount_" + this.Terrasoft.generateGUID(),
										"Caption": emailAccount.Caption,
										"Tag": emailAccount.Id,
										"Click": {"bindTo": "onEmailAccountClick"},
										"ImageConfig": this._getActiveMailboxMenuIcon(emailAccount.Id),
										"MarkerValue": emailAccount.Caption
									}
								});
								emailTypeMenuItems.addItem(emailAccountItem);
							}, this);
							var allMailboxesItem = this.Ext.create("Terrasoft.BaseViewModel", {
								values: {
									"Id": "emailAccount_AllMailboxes",
									"Click": {"bindTo": "onEmailAccountClick"},
									"ImageConfig": this._getActiveMailboxMenuIcon(null),
									"Caption": {"bindTo": "Resources.Strings.AllMailboxesCaption"},
									"MarkerValue": this.get("Resources.Strings.AllMailboxesCaption")
								}
							});
							emailTypeMenuItems.addItem(allMailboxesItem);
						}
					},

					/**
					 * Sets panel loading state.
					 * @private
					 * @param {Boolean} isLoading Is emails loading flag value.
					 */
					_setLoadingState: function(isLoading) {
						if (isLoading) {
							this.showBodyMask(this.maskConfig);
						} else {
							this.hideBodyMask(this.maskConfig);
						}
						this.$IsDataLoaded = !isLoading;
						this.initBlankSlateModel();
						this.clearCurrentNewMessagesCounter();
					},

					/**
					 * Loads EmailMessageData page.
					 * @private
					 * @param {Boolean} clearCollection Clear existing data collection flag.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					_loadEmdPage: function(clearCollection, callback, scope) {
						let esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "EmailMessageData"
						});
						esq.addColumn("Activity");
						esq.addColumn("SendDate");
						esq.addColumn("ModifiedOn");
						this.addFilters(esq);
						this.addSorting(esq);
						let rowCount = this.$RowCount;
						let config = {
							collection: this.$EmdCollection,
							primaryColumnName: "Id",
							schemaQueryColumns: esq.columns,
							isPageable: true,
							rowCount: rowCount,
							isClearGridData: clearCollection
						};
						this.initializePageableOptions(esq, config);
						this.$IsDataLoaded = false;
						esq.getEntityCollection(function(result) {
							let ids = [];
							result.collection && result.collection.each(function(emd) {
								let activity = emd && emd.get("Activity");
								if (activity) {
									ids.push(activity.value);
								}
							});
							this.$EmdCollection.loadAll(result.collection);
							this.Ext.callback(callback, scope, [ids]);
						}, this);
					},

					/**
					 * Loads email data for requested identifiers.
					 * @private
					 * @param {Boolean} clearCollection Clear existing data collection flag.
					 * @param {Array} ids Activity identifiers array.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					_loadActivitiesByIds: function(clearCollection, ids, callback, scope) {
						if (this.isEmpty(ids)) {
							this._setLoadingState(false);
							var collection = this.get("EmailCollection");
							if (clearCollection) {
								collection.clear();
							}
							return this.Ext.callback(callback, scope);
						}
						let esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: EmailConstants.entitySchemaName
						});
						this.addEsqColumns(esq);
						let primaryColumnFilter = this.Terrasoft.createColumnInFilterWithParameters("Id", ids);
						let filters = this.Terrasoft.createFilterGroup();
						filters.add("IdsFilter", primaryColumnFilter);
						esq.filters = filters;
						esq.getEntityCollection(function(result) {
							this.onEmailsLoaded(result, clearCollection);
							this.Ext.callback(callback, scope);
						}, this);
					},

					/**
					 * Returns SendDate column value from email.
					 * ModifiedOn column value will be used when SendDate not set.
					 * @private
					 * @param {Terrasoft.BaseViewModel} email Email instance.
					 */
					_safeGetSendDate: function(email) {
						if (!email) {
							return;
						}
						let sendDate = email.get("SendDate");
						return sendDate ? sendDate : email.get("ModifiedOn");
					},

					//endregion

					//region Methods: Protected

					/**
					 * Load emails list.
					 * @protected
					 * @param {Boolean} clearCollection Clear existing emails list flag.
					 */
					loadEmails: function(clearCollection) {
						if (!this._anyMailboxSelected() && this.$EmailType !== EmailConstants.emailType.DRAFT) {
							this._setLoadingState(false);
							return;
						}
						this.Terrasoft.chain(
							function(next) {
								this._loadEmdPage(clearCollection, next, this);
							},
							function(next, ids) {
								this._loadActivitiesByIds(clearCollection, ids);
							},
							this
						);
					},

					/**
					 * Reloads incoming and need processing emails in communication panel.
					 * @protected
					 */
					reloadIncomingNeedProcessEmails: function() {
						this.$EmailType = EmailConstants.emailType.INCOMING;
						this.$IsProcessed = true;
						if (this.getIsFeatureEnabled("SharedMailboxes")) {
							this.$SelectedEmailAccountId = null;
						}
						this.reloadEmails();
					},

					/**
					 * Adds a instance of the query columns.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq The request, which will be added to the column.
					 */
					addEsqColumns: function(esq) {
						var columns = this.getEmailSelectColumns();
						this.Terrasoft.each(columns, function(columnName) {
							esq.addColumn(columnName);
						}, this);
					},

					/**
					 * Adds a filter query instance.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq The request, which filters will be added.
					 */
					addFilters: function(esq) {
						var isProcessed = this.get("IsProcessed");
						var filters = this.Terrasoft.createFilterGroup();
						filters.add("isProcessed", this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "IsNeedProcess", isProcessed));
						this._addFilterByEmailType(filters, esq);
						esq.filters = filters;
					},

					/**
					 * Initializes query sorting parameters.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq Query instance.
					 */
					addSorting: function(esq) {
						var emailType = this.$EmailType
						var sortByColumn = emailType === EmailConstants.emailType.DRAFT
								? esq.columns.get("ModifiedOn")
								: esq.columns.get("SendDate");
						sortByColumn.orderPosition = 0;
						sortByColumn.orderDirection = Terrasoft.OrderDirection.DESC;
					},

					/**
					 * Adds columns to email senders query.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} sendersESQ Email senders query.
					 */
					addEmailSendersQueryColumns: function(sendersESQ) {
						sendersESQ.addColumn("Activity");
						sendersESQ.addColumn("Participant");
						if (this.getIsFeatureEnabled("EmailRelationAddingEnabled")) {
							sendersESQ.addColumn("Participant.Account", "Account");
						}
						sendersESQ.addColumn("CreatedOn");
						var createdOnColumn = sendersESQ.columns.get("CreatedOn");
						createdOnColumn.orderPosition = 2;
						createdOnColumn.orderDirection = Terrasoft.OrderDirection.DESC;
					},

					/**
					 * Clears current tab new messages count.
					 * @protected
					 */
					clearCurrentNewMessagesCounter: function() {
						this.set("NewEmailsCounter", 0);
					},

					/**
					 * Removes edit email account menu items.
					 * @protected
					 * @param {Terrasoft.BaseViewModelCollection} collection Menu items collection.
					 */
					removeEditEmailAccountItems: function(collection) {
						var emailAccountIds = this.$EmailAccountIds;
						this.Terrasoft.each(emailAccountIds, function(emailAccountId) {
							collection.removeByKey(emailAccountId);
						}, this);
						collection.removeByKey("EmailAccountsSeparator");
					},

					/**
					 * Sets initial atributes values.
					 * @protected
					 */
					initParameters: function() {
						this.set("EmailTypeMenuItems", this.Ext.create("Terrasoft.BaseViewModelCollection"));
						this.set("EmailCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
						this.set("EmdCollection", this.Ext.create("Terrasoft.BaseViewModelCollection"));
						this.set("SchemaGeneratorConfig", {
							schemaName: "EmailItemSchema",
							profileKey: "EmailItemSchema"
						});
						this.set("EmptyMessageGeneratorConfig", {
							schemaName: "EmptyEmailPanelSchema",
							profileKey: "EmptyEmailPanelSchema"
						});
						this.Terrasoft.SysSettings.querySysSettings(["BuildType"], function(sysSettings) {
							var buildType = sysSettings.BuildType || {};
							if (buildType.value === ConfigurationConstants.BuildType.Public) {
								this.set("IsEmailTabActionsVisible", false);
							}
						}, this);
						this.$EmailAccountIds = [];
					},

					/**
					 * Loads mailbox settings list.
					 * @protected
					 * @param {Function} callback Callback function.
					 * @param {Function} callback.isMailboxExist Is user has mailboxes flag.
					 * @param {Object} scope Callback function scope.
					 */
					checkMailBoxSyncSettings: function(callback, scope) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "MailboxSyncSettings"
						});
						esq.addColumn("Id");
						esq.addColumn("EnableMailSynhronization");
						esq.addColumn("[ActivitySyncSettings:MailboxSyncSettings:Id].ImportTasks", "ImportTasks");
						esq.addColumn("[ActivitySyncSettings:MailboxSyncSettings:Id].ImportAppointments", "ImportAppointments");
						esq.addColumn("[ActivitySyncSettings:MailboxSyncSettings:Id].ExportActivities", "ExportActivities");
						var filter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
								"SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value);
						esq.filters.addItem(filter);
						esq.getEntityCollection(function(response) {
							if (!response.success) {
								return;
							}
							var collection = response.collection;
							var isMailboxExist = false;
							if (!collection.isEmpty()) {
								collection.each(function(item) {
									isMailboxExist = isMailboxExist || (item.get("EnableMailSynhronization") === true);
								});
							}
							callback.call(scope, isMailboxExist);
						}, this);
					},

					/**
					 * Loads email messages.
					 * @protected
					 * @param {Terrasoft.Collection} collection Email messages collection.
					 */
					downloadMessages: function(collection) {
						var requestsCount = 0;
						collection.each(function(item) {
							var requestUrl;
							var data = {};
							if (item.get("MailServerTypeId") === ExchangeNUIConstants.MailServer.Type.Exchange) {
								data = {
									create: true,
									interval: 0,
									serverId: item.get("MailServerId"),
									senderEmailAddress: item.get("SenderEmailAddress")
								};
								requestUrl = this.Terrasoft.workspaceBaseUrl +
										"/rest/MailboxSettingsService/CreateEmailSyncJob";
							} else {
								requestUrl = this.Terrasoft.workspaceBaseUrl +
										"/ServiceModel/ProcessEngineService.svc/LoadImapEmailsProcess/" +
										"Execute?ResultParameterName=LoadResult" +
										"&MailBoxFolderId=" + item.get("ActivityFolderId");
							}
							this.showBodyMask();
							requestsCount++;
							Terrasoft.AjaxProvider.request({
								url: requestUrl,
								timeout: 180000,
								headers: {
									"Content-Type": "application/json",
									"Accept": "application/json"
								},
								method: "POST",
								scope: this,
								callback: function(request, success, response) {
									this.showSynchronizationResultMessage(request, success, response, --requestsCount);
								},
								jsonData: data
							});
						}, this);
					},

					/**
					 * Creates email types menu items collection.
					 * @protected
					 * @return {Terrasoft.BaseViewModelCollection} Email types menu items collection.
					 */
					getEmailTypeMenuItems: function() {
						var emailTypeMenuItems = this.get("EmailTypeMenuItems");
						emailTypeMenuItems.clear();
						var emailTypes = EmailConstants.emailType;
						var emailTypesItemsConfigs = [
							{
								caption: this.get("Resources.Strings.IncomingEmail"),
								tag: emailTypes.INCOMING
							}, {
								caption: this.get("Resources.Strings.OutgoingEmail"),
								tag: emailTypes.OUTGOING
							}, {
								caption: this.get("Resources.Strings.DraftEmail"),
								tag: emailTypes.DRAFT
							}
						];
						this.Terrasoft.each(emailTypesItemsConfigs, function(config) {
							var emailTypeMenuItem = this._getTypeEmailMenuItem(config);
							emailTypeMenuItems.addItem(emailTypeMenuItem);
						}, this);
						this._addMailboxesMenuItems(emailTypeMenuItems);
						return emailTypeMenuItems;
					},

					/**
					 * Handles click in mailbox filter menu.
					 * @protected
					 * @return {Array} Mailbox filter identifier.
					 */
					onEmailAccountClick: function(emailAccountId) {
						this.$SelectedEmailAccountId = emailAccountId || null;
						this.reloadEmails();
					},

					/**
					 * Creates email processed or not processed menu items collection.
					 * @protected
					 * @return {Terrasoft.BaseViewModelCollection} Email processed or not processed menu items collection.
					 */
					getEmailProcessedMenuItems: function() {
						var configs = [
							{
								caption: this.get("Resources.Strings.EmailBoxIsProcessedCaption"),
								tag: false,
								imageMethodName: "_getActiveIsProcessedMailboxMenuIcon",
								onClick: "onProcessChange"
							}, {
								caption: this.get("Resources.Strings.EmailBoxNotProcessedCaption"),
								tag: true,
								imageMethodName: "_getActiveIsProcessedMailboxMenuIcon",
								onClick: "onProcessChange"
							}
						];
						var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
						this.Terrasoft.each(configs, function(config) {
							var emailTypeMenuItem = this._getTypeEmailMenuItem(config);
							menuItems.addItem(emailTypeMenuItem);
						}, this);
						return menuItems;
					},

					/**
					 * Creates email type menu item.
					 * @obsolete
					 * @param {Object} config Menu item options.
					 * @param {String} config.caption Item caption.
					 * @param {String} config.tag Item tag.
					 * @param {Object} config.onClick Item on click event handler.
					 * @return {Terrasoft.BaseViewModel} Menu item model.
					 */
					getTypeEmailMenuItem: function(config) {
						var caption = config.caption;
						var onClick = config.onClick;
						var tag = config.tag;
						return this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Id": "type_" + Terrasoft.generateGUID(),
								"Caption": caption,
								"Tag": tag,
								"Click": {"bindTo": onClick},
								"MarkerValue": caption
							}
						});
					},

					/**
					 * Creates email message action buttons container config.
					 * @protected
					 * @return {Object} Email message action buttons container config.
					 */
					generateEmailButtonsContainerConfig: function() {
						var buttonItems = [];
						var processEmailButtonConfig = this.generateEmailProcessedButtonConfig();
						buttonItems.push(processEmailButtonConfig);
						var deleteEmailButtonConfig = this.generateDeleteEmailButtonConfig();
						buttonItems.push(deleteEmailButtonConfig);
						var emailButtonContainerConfig = {
							"className": "Terrasoft.Container",
							"classes": {"wrapClassName": ["entity-item-relation-container"]},
							"items": buttonItems
						};
						return emailButtonContainerConfig;
					},

					/**
					 * Creates "process message" button config.
					 * @protected
					 * @return {Object} "Process message" button config.
					 */
					generateEmailProcessedButtonConfig: function() {
						return {
							"className": "Terrasoft.Button",
							"caption": {"bindTo": "Resources.Strings.MarkAsProcessed"},
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"imageConfig": {"bindTo": "Resources.Images.ApplyButtonImage"},
							"enabled": {"bindTo": "IsProcessingButtonEnabled"},
							"visible": {
								"bindTo": "IsNeedProcess",
								"bindConfig": {
									"converter": "getProcessButtonVisible"
								}
							},
							"click": {bindTo: "setIsNeedProcessFalse"},
							"markerValue": "setNeedProcessFalse"
						};
					},

					/**
					 * Creates "delete" button config.
					 * @protected
					 * @return {Object} "Delete" button config.
					 */
					generateDeleteEmailButtonConfig: function() {
						return {
							"className": "Terrasoft.Button",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": {"bindTo": "Resources.Images.DeleteEmailButtonImage"},
							"click": {bindTo: "onDeleteEmail"},
							"markerValue": "deleteEmail"
						};
					},

					/**
					 * Tooltip click event handler.
					 * @protected
					 * @param {Object} linkAttributes Link attributes.
					 */
					onEmailTabActionsTooltipClick: function(linkAttributes) {
						this.set("ShowEmailTabActionsTooltip", false);
						var recordId = linkAttributes["data-context-mailserverid"];
						this.onEditEmailAccount(recordId);
						return false;
					},

					/**
					 * Handler for EmailboxSyncSettingsInserted message.
					 * @protected
					 * @param {Object} value User mail and mailbox settings id of new account.
					 */
					showTooltipForNewEmailbox: function(value) {
						var tooltipText = this.get("Resources.Strings.EmailboxSyncSettingsInsertedTooltipCaption");
						var tooltipTextWithValues =
								this.Ext.String.format(tooltipText, value.userEmail, value.mailboxSyncSettingsId);
						this.set("TextEmailTabActionsTooltip", tooltipTextWithValues);
						this.set("ShowEmailTabActionsTooltip", true);
					},

					/**
					 * Subscribes for sandbox messages.
					 * @protected
					 */
					subscribeSandboxEvents: function() {
						this.sandbox.subscribe("EmailboxSyncSettingsInserted", this.showTooltipForNewEmailbox, this);
						this.sandbox.subscribe("ReloadNotProcessedIncomingEmails", this.reloadIncomingNeedProcessEmails,
								this);
						this.sandbox.subscribe("UpdateNewEmailsCounter", this.incrementNewMessagesCounter, this);
						this.sandbox.subscribe("ShowRelatedEmails", this.onShowRelatedEmails, this);
					},

					/**
					 * Loads related to emailId emails to panel.
					 * @protected
					 * @param {String} emailId Email identifier.
					 */
					onShowRelatedEmails: function(emailId) {
						this._setLoadingState(true);
						this.$DisplayState = EmailConstants.emailPanelDisplayState.RelatedEmails;
						this.getConversationId(emailId, function(conversationId) {
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: EmailConstants.entitySchemaName
							});
							this.addEsqColumns(esq);
							var filters = esq.filters;
							this.setEmailsByConversationFilters(filters, conversationId);
							esq.getEntityCollection(function(result) {
								this.onEmailsLoaded(result, true);
							}, this);
						}, this);
					},

					/**
					 * Increments new message counter.
					 * @protected
					 * @param {Object} messageProperties Message properties.
					 * @param {Boolean} messageProperties.isMessageIncoming Is new message incoming flag.
					 * @param {Boolean} messageProperties.isMessageDraft Is new message draft flag.
					 * @param {Boolean} messageProperties.isNeedProcess Is new message processed flag.
					 */
					incrementNewMessagesCounter: function(messageProperties) {
						var messageType = messageProperties.IsMessageIncoming
								? EmailConstants.emailType.INCOMING
								: EmailConstants.emailType.OUTGOING;
						messageType = messageProperties.IsMessageDraft ? EmailConstants.emailType.DRAFT : messageType;
						if (this.isNewMessageFromCurrentTab(messageProperties.IsNeedProcess, messageType,
								messageProperties.MailboxSyncSettings)) {
							var counter = this.get("NewEmailsCounter");
							this.set("NewEmailsCounter", ++counter);
						}
					},

					/**
					 * Checks if new message is in current tab.
					 * @protected
					 * @param {Boolean} isMessageProcessed Is message processed flag.
					 * @param {Guid} messageType Message type.
					 * @param {Guid} mailboxId Message mailbox unique identifier.
					 * @return {Boolean} True, if new message from current tab, false otherwise.
					 */
					isNewMessageFromCurrentTab: function(isNeedProcess, messageType, mailboxId) {
						var isTabProcessed = this.get("IsProcessed");
						var tabType = this.get("EmailType");
						var isFromActiveMailbox = true;
						if (this.getIsFeatureEnabled("SharedMailboxes")) {
							var mailboxes = this._getSelectedMailboxesIds();
							isFromActiveMailbox = this.Ext.Array.contains(mailboxes, mailboxId);
						}
						return (isFromActiveMailbox && isNeedProcess === isTabProcessed && messageType === tabType);
					},

					/**
					 * Generates message about result of mail synchronization.
					 * @protected
					 * @param {Object} request Ajax POST request for mail synchronization.
					 * @param {Boolean} success Checks if request was successful.
					 * @param {Object} response Response on synchronization, which contains XML with messages.
					 * @param {Number} requestsCount Number of requests to Exchange mail server.
					 */
					showSynchronizationResultMessage: function(request, success, response, requestsCount) {
						var messageArray = [];
						if (success) {
							messageArray = this.getAjaxResponseMessages(response);
						}
						if (requestsCount <= 0) {
							var message = this.get("Resources.Strings.LoadingMessagesComplete");
							if (messageArray.length > 0) {
								message = "";
								this.Terrasoft.each(messageArray, function(element) {
									message = message.concat(this.Ext.String.format("[{0}]: {1} ", element.key,
											element.message));
								}, this);
							}
							this.hideBodyMask();
							this.Terrasoft.utils.showInformation(message);
						}
					},

					/**
					 * Collects ajax response messages by decoding response XML.
					 * @protected
					 * @param {Object} response Response on synchronization, which contains XML with messages.
					 * @return {Array} responseArray Array with collected response messages.
					 */
					getAjaxResponseMessages: function(response) {
						var responseArray = [];
						var responseData;
						if (this.Ext.isEmpty(response.responseXML)) {
							var result = this.Ext.decode(response.responseText);
							responseData = {
								Messages: []
							};
							if (result.CreateDeleteSyncJobResult) {
								responseData.Messages.push(result.CreateDeleteSyncJobResult);
							}
						} else {
							var responseValue = response.responseXML.firstChild.textContent;
							responseData = this.Ext.decode(this.Ext.decode(responseValue));
						}
						if (responseData && responseData.Messages.length > 0) {
							responseArray = responseArray.concat(responseData.Messages);
						}
						return responseArray;
					},

					/**
					 * Initializes empty message viewModel instance.
					 * ViewModel instance stored in BlankSlateModel attribute.
					 * @protected
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					initBlankSlateModel: function(callback, scope) {
						var model = this.get("BlankSlateModel");
						if (this.isNotEmpty(model)) {
							model.set("EmailType", this.get("EmailType"));
							model.init(callback, scope);
						} else {
							this.Ext.callback(callback, scope || this);
						}
					},

					/**
					 * Calls emails list data reload.
					 * @protected
					 * @param {Array} emailIds Emails unique identifiers.
					 */
					reloadEmailsData: function(emailIds) {
						if (this.isEmpty(emailIds)) {
							return;
						}
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: EmailConstants.entitySchemaName
						});
						this.addEsqColumns(esq);
						this.addReloadEmailsDataFilters(esq, emailIds);
						esq.getEntityCollection(this.onEmailsDataLoaded, this);
					},

					/**
					 * Adds email ids filter to query instance.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq Query instance.
					 * @param {Array} emailIds Emails unique identifiers.
					 */
					addReloadEmailsDataFilters: function(esq, emailIds) {
						esq.filters.addItem(esq.createColumnInFilterWithParameters("Id", emailIds));
					},

					/**
					 * Fills existing emails with actual data.
					 * @protected
					 * @param {Object} response Actual email data request response.
					 */
					onEmailsDataLoaded: function(response) {
						if (response.success) {
							var dataCollection = response.collection;
							var collection = this.get("EmailCollection");
							dataCollection.each(function(item) {
								this.initSenderInfo(collection, item);
							}, this);
						}
					},

					/**
					 * Inits email sender information.
					 * @protected
					 * @param {Terrasoft.BaseViewModelCollection} collection Email collection.
					 * @param {Terrasoft.BaseViewModel} item Email item.
					 */
					initSenderInfo: function(collection, item) {
						var model = this.firstByFn(collection, function(viewModel) {
							return viewModel.get("Id") === item.get("Id");
						});
						if (!this.isEmpty(model)) {
							this.onLoadEntity(item, model);
						}
						var email = collection.find(item.get("Id"));
						if (!this.Ext.isEmpty(email)) {
							var senderContact = item.get("SenderContact");
							var senderAccount = item.get("SenderContact.Account");
							if (senderAccount && this.getIsFeatureEnabled("EmailRelationAddingEnabled")) {
								senderContact.Account = {
									value: senderAccount.value,
									displayValue: senderAccount.displayValue
								};
							}
							email.initSenderInfo(senderContact);
						}
					},

					/**
					 * Returns names of the attrubutes, which refers to email tab settings.
					 * @protected
					 * @return {Array} Array of attrubutes names.
					 */
					getTabSettingsNames: function() {
						return ["IsProcessed", "EmailType", "SelectedEmailAccountId"];
					},

					/**
					 * Sets saved tab settings to current panel instance.
					 * @protected
					 * @param {Function} callback Callback function.
					 * @param {[type]} scope Callback function scope.
					 */
					initTabSettings: function(callback, scope) {
						if (!this.getIsFeatureEnabled("SharedMailboxes")) {
							this.Ext.callback(callback, scope || this);
							return;
						}
						var savedSettings = this._getSavedTabSettings();
						var keys = this.Ext.Object.getKeys(savedSettings);
						this.Terrasoft.each(keys, function(key) {
							this.set(key, savedSettings[key]);
						}, this);
						this._fixSelectedEmailAccountId();
						this.Ext.callback(callback, scope || this);
					},

					/**
					 * Function for sorting emails by send date.
					 * @protected
					 * @param {Terrasoft.model.BaseViewModel} itemA Comparable item.
					 * @param {Terrasoft.model.BaseViewModel} itemB Comparable item.
					 * @return {Number} Result.
					 */
					sortItemsBySendDateDesc: function(itemA, itemB) {
						let dateA = this._safeGetSendDate(itemA);
						let dateB = this._safeGetSendDate(itemB);
						dateA = new Date(dateA).getTime();
						dateB = new Date(dateB).getTime();
						if (dateA === dateB) {
							return 0;
						}
						return (dateA > dateB) ? -1 : 1;
					},

					/**
					 * Email item sender contact set event handler.
					 * @protected
					 * @param {Object} config Sender contact parameters.
					 * @param {String} config.ContactId Sender contact identifier.
					 * @param {String} config.Email Sender email.
					 */
					onEmailSenderSet: function(config) {
						let contactId = config.ContactId;
						let contactEmail = config.Email;
						if (this.isEmpty(contactId) || this.isEmpty(contactEmail)) {
							return;
						}
						let collection = this.$EmailCollection;
						let emailsFromCurrentSender = collection.filterByFn(function(item) {
							return (item.$SenderEmail === contactEmail || item.$SenderName === contactEmail) &&
								Ext.isEmpty(item.$SenderContact);
						});
						emailsFromCurrentSender.each(function(item) {
							item.$SenderContact = {
								"value": contactId
							};
							item.onSaveEntity();
						});
					},

					//endregion

					//region Methods: Public

					/**
					 * Sets email item view config on render. Used as ContainerList "onGetItemConfig" event handler.
					 * @param {Object} itemConfig Config object.
					 */
					onGetItemConfig: function(itemConfig) {
						var viewConfig = this.Terrasoft.deepClone(this.get("EmailViewConfig"));
						itemConfig.config = viewConfig;
					},

					/**
					 * Loads next email page.
					 */
					onLoadNext: function() {
						var canLoadMoreData = this.$CanLoadMoreData;
						var displayState = this.$DisplayState;
						if (canLoadMoreData && displayState === EmailConstants.emailPanelDisplayState.Folders) {
							this.loadEmails(false);
						}
					},

					/**
					 * Returns column data value type.
					 * @param {Object} record Email collection item.
					 * @param {String} columnName Email column name.
					 * @return {Object} Column data value type.
					 */
					getDataValueType: function(record, columnName) {
						var recordColumn = record.columns[columnName]
								? record.columns[columnName]
								: record.entitySchema.columns[columnName];
						return recordColumn ? recordColumn.dataValueType : null;
					},

					/**
					 * Calls emails list reload.
					 */
					reloadEmails: function() {
						this.$EmdCollection.clear();
						this._saveTabSettings();
						this._setLoadingState(true);
						this.$DisplayState = EmailConstants.emailPanelDisplayState.Folders;
						if (this.get("EmailType") === EmailConstants.emailType.INCOMING && this.get("IsProcessed")) {
							this.sandbox.publish("UpdateNewNotProcessedIncomingEmailsCounter", 0);
						}
						this.loadEmails(true);
					},

					/**
					 * Fills emails models with received data.
					 * @param {Object} result Date request result.
					 * @param {Boolean} clearCollection Clear collection flag.
					 */
					onEmailsLoaded: function(result, clearCollection) {
						if (result.success) {
							var dataCollection = result.collection;
							this.set("CanLoadMoreData", dataCollection.getCount() > 0);
							var data = this.Ext.create("Terrasoft.BaseViewModelCollection");
							var collection = this.get("EmailCollection");
							dataCollection.each(function(item) {
								var model = this.onLoadEntity(item);
								this.updateEntityConnectionTypeColumnList(item, model);
								var itemId = item.get("Id");
								if (!data.contains(itemId) && (clearCollection || !collection.contains(itemId))) {
									data.add(item.get("Id"), model);
								}
							}, this);
							if (clearCollection) {
								collection.clear();
							}
							data.sortByFn(this.sortItemsBySendDateDesc, this);
							collection.loadAll(data);
							dataCollection.each(function(item) {
								this.initSenderInfo(collection, item);
							}, this);
						}
						this._setLoadingState(false);
					},

					/**
 					* Updates entity connection type values in view model.
					 * @param {BaseViewModel} item EntitySchema response item.
					 * @param {BaseViewModel} model View model item.
					 */
					updateEntityConnectionTypeColumnList: function(item, model) {
						const entityConnectionTypeColumnList = this.get("EntityConnectionTypeColumnList");
						Terrasoft.each(entityConnectionTypeColumnList, function(entityConnectionTypeColumn) {
							if (Ext.isEmpty(item.get(entityConnectionTypeColumn))) {
								return true;
							}
							const entityConnectionTypeColumnParts = entityConnectionTypeColumn.split(".");
							if (entityConnectionTypeColumnParts.length < 2) {
								return true;
							}
							let column = model.get(entityConnectionTypeColumnParts[0]);
							if (Ext.isEmpty(column)) {
								return true;
							}
							column[entityConnectionTypeColumnParts[1]] = item.get(entityConnectionTypeColumn);
						}, this);
					},

					/**
					 * Creates new email viewmodel instance.
					 * @return {Terrasoft.BaseViewModel} Email viewmodel instance.
					 */
					getEmailViemModelInstance: function() {
						var viewModelClass = this.getViewModelClass();
						var processList = this.get("EmailProcessList");
						var relationColumns = this.get("EntityConnectionColumnList");
						var defaultRelationColumns = this.get("DefaultEntityConnectionColumns");
						var viewModel = this.Ext.create(viewModelClass, {
							Ext: this.Ext,
							sandbox: this.sandbox,
							Terrasoft: this.Terrasoft,
							values: {
								"ProcessParametersArray": this.Terrasoft.deepClone(processList),
								"EntityConnectionColumnList": this.Terrasoft.deepClone(relationColumns),
								"DefaultEntityConnectionColumns": this.Terrasoft.deepClone(defaultRelationColumns)
							}
						});
						BusinessRulesApplier.applyDependencies(viewModel);
						return viewModel;
					},

					/**
					 * Creates and fills email viewmodel instance.
					 * @param {Terrasoft.BaseViewModel} entity Email message content.
					 * @param {Terrasoft.BaseViewModel} [viewModel] Email viewmodel instance.
					 * @return {Terrasoft.BaseViewModel} Email viewmodel instance.
					 */
					onLoadEntity: function(entity, viewModel) {
						viewModel = viewModel || this.getEmailViemModelInstance();
						entity.set("IsNeedProcess", this.get("IsProcessed"));
						viewModel.setColumnValues(entity, {preventValidation: true});
						viewModel.$Mailboxes = this.$EmailAccountIds;
						viewModel.init();
						viewModel.id = entity.$Id;
						this.subscribeModelEvents(viewModel);
						return viewModel;
					},

					/**
					 * Returns email message viewmodel class.
					 * @return {Object|*} Email viewmodel class.
					 */
					getViewModelClass: function() {
						var viewModelClass = this.get("ViewModelClass");
						return this.Terrasoft.deepClone(viewModelClass);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @override
					 */
					init: function(callback, scope) {
						this.initParameters();
						this.subscribeSandboxEvents();
						this.callParent([
							function() {
								Terrasoft.chain(
										this.initEmailTabActionsMenuCollection,
										this.initEmailProcessTag,
										this.initBuildType,
										this.loadProcessList,
										this.loadEntityConnectionColumns,
										this.initDefaultEntityConnectionColumns,
										this.buildSchema,
										this.initEmptyMessageConfig,
										this.initTabSettings,
										function() {
											this._setLoadingState(true);
											this.loadEmails(false);
											this.Ext.callback(callback, scope || this);
										}, this);
							}, this
						]);
					},

					/**
					 * Returns new messages button visibility.
					 * @return {Boolean} New messages button visibility.
					 */
					getNewEmailsButtonVisible: function(count) {
						return count > 0;
					},

					/**
					 * Returns new messages button caption.
					 * @return {String} New messages button caption.
					 */
					getNewEmailsButtonCaption: function(count) {
						var template = (count > 1)
								? this.get("Resources.Strings.MoreThanOneNewMessage")
								: this.get("Resources.Strings.OneNewMessage");
						return this.Ext.String.format(template, count);
					},

					/**
					 * Generates edit email account menu items.
					 * @param {Terrasoft.BaseViewModelCollection} settingsList Email accounts collection.
					 * @param {Terrasoft.BaseViewModelCollection} menuItems Menu items collection.
					 */
					addMailboxSettingsSelectResponse: function(settingsList, menuItems) {
						if (settingsList.isEmpty()) {
							return;
						}
						var menuCollectionNotEmpty = this.isNotEmpty(menuItems);
						if (menuCollectionNotEmpty) {
							var editSeparator = this.getButtonMenuSeparator({
								"Id": "EmailAccountsSeparator",
								"Type": "Terrasoft.MenuSeparator",
								"Caption": {"bindTo": "Resources.Strings.EditExistingAccount"}
							});
							menuItems.add("EmailAccountsSeparator", editSeparator);
						}
						var settings = [];
						var settingsIds = [];
						settingsList.each(function(mailboxSettings) {
							var settingsId = mailboxSettings.get("Id");
							var caption = mailboxSettings.get("SenderEmailAddress");
							var isShared = mailboxSettings.get("IsShared");
							if (menuCollectionNotEmpty) {
								var menuItem = this.getButtonMenuItem({
									"Id": settingsId,
									"Caption": caption,
									"Click": {bindTo: "onEditEmailAccount"},
									"canExecute": {bindTo: "canBeDestroyed"},
									"Tag": settingsId,
									"MarkerValue": caption
								});
								menuItems.add(settingsId, menuItem);
							}
							settingsIds.push(settingsId);
							settings.push({
								Id: settingsId,
								Caption: caption,
								IsShared: isShared
							});
						}, this);
						this.$EmailAccountIds = settingsIds;
						this.$EmailAccounts = settings;

					},

					/**
					 * Edit existing email account action handler.
					 */
					onEditEmailAccount: function(tag) {
						var historyState = this.sandbox.publish("GetHistoryState");
						var prevHash = historyState.hash;
						var newState = {
							recordId: tag
						};
						var hash = "BaseSchemaModuleV2/SyncSettings";
						if (prevHash && prevHash.historyState === hash) {
							this.sandbox.publish("ReloadSettings", newState);
						} else {
							this.sandbox.publish("PushHistoryState", {
								hash: hash,
								stateObj: newState
							});
						}
					},

					/**
					 * Add email account action handler.
					 */
					onAddEmailAccount: function() {
						var modalBoxSize = {
							minHeight: "1",
							minWidth: "1",
							maxHeight: "100",
							maxWidth: "100"
						};
						var modalBoxContainer = ModalBox.show(modalBoxSize);
						this.sandbox.loadModule("CredentialsSyncSettingsEdit", {
							renderTo: modalBoxContainer,
							instanceConfig: {
								schemaName: "BaseSyncSettingsEdit",
								isSchemaConfigInitialized: true,
								useHistoryState: false
							}
						});
						return false;
					},

					/**
					 * Generates action button menu items collection.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					initEmailTabActionsMenuCollection: function(callback, scope) {
						var collection = this.get("EmailTabActionsMenuCollection") ||
								this.Ext.create("Terrasoft.BaseViewModelCollection");
						var newEmailAccountCaption = this.get("Resources.Strings.NewEmailAccountCaption");
						var newMailSyncronizationItem = this.getButtonMenuItem({
							"Caption": newEmailAccountCaption,
							"Click": {bindTo: "onAddEmailAccount"},
							"MarkerValue": newEmailAccountCaption
						});
						collection.addItem(newMailSyncronizationItem);
						var synchronizeEmailCaption = this.get("Resources.Strings.SynchronizeEmail");
						var synchronizeEmailItem = this.getButtonMenuItem({
							"Caption": synchronizeEmailCaption,
							"Click": {bindTo: "onSynchronizeEmail"},
							"MarkerValue": synchronizeEmailCaption
						});
						collection.addItem(synchronizeEmailItem);
						var emailBoxSettingsCaption = this.get("Resources.Strings.EmailBoxSettings");
						var emailBoxSettingsItem = this.getButtonMenuItem({
							"Caption": emailBoxSettingsCaption,
							"Click": {bindTo: "navigateToMailboxSyncSettings"},
							"canExecute": {"bindTo": "canBeDestroyed"},
							"MarkerValue": emailBoxSettingsCaption,
							"Visible": {bindTo: "IsEmailBoxSettingsButtonVisible"}
						});
						collection.addItem(emailBoxSettingsItem);
						this.set("EmailTabActionsMenuCollection", collection);
						this.getEditEmailAccountItems(collection, callback, scope);
					},

					/**
					 * Generates edit email account menu items.
					 * @param {Terrasoft.BaseViewModelCollection} collection Menu items collection.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					getEditEmailAccountItems: function(collection, callback, scope) {
						var settingsEsq = this.getMailboxSettingsSelect();
						settingsEsq.getEntityCollection(function(result) {
							if (result.success) {
								this.addMailboxSettingsSelectResponse(result.collection, collection);
							}
							if (!this.Ext.isEmpty(callback)) {
								callback.call(scope || this);
							}
						}, this);
					},

					/**
					 * Sets build type and actions button visibility attributes.
					 * @param {Function} callback Callback function.
					 */
					initBuildType: function(callback) {
						var sysSettings = ["BuildType"];
						Terrasoft.SysSettings.querySysSettings(sysSettings, function(response) {
							var buildType = response.BuildType && response.BuildType.value;
							var visibility = this.isEmpty(buildType) || buildType !== ConfigurationConstants.BuildType.Public;
							this.set("IsEmailBoxSettingsButtonVisible", visibility);
							callback();
						}, this);
					},

					/**
					 * Sets emails process tag attribute.
					 * @param {Function} callback Callback function.
					 */
					initEmailProcessTag: function(callback) {
						this.Terrasoft.SysSettings.querySysSettingsItem("EmailProcessTag", function(value) {
							this.set("EmailProcessTag", value);
							if (callback) {
								callback();
							}
						}, this);
					},

					/**
					 * Generates message view model class and view config, using email message schema.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					buildSchema: function(callback, scope) {
						var generatorConfig = this.get("SchemaGeneratorConfig");
						this._internalBuildSchema(generatorConfig, function(viewModelClass, viewConfig) {
							this.set("ViewModelClass", viewModelClass);
							this.createEntityConnectionPanelConfig(viewConfig);
							var view = {
								"id": "emailContainer",
								"classes": {wrapClassName: ["email-container"]},
								"items": [
									{
										"className": "Terrasoft.Container",
										"markerValue": {"bindTo": "getEmailMarkerValue"},
										"items": viewConfig
									}
								]
							};
							this.set("EmailViewConfig", view);
							callback.call(scope);
						}, this);
					},

					/**
					 * Opens new email page.
					 */
					createEmail: function() {
						var historyState = this.sandbox.publish("GetHistoryState");
						var config = {
							sandbox: this.sandbox,
							entitySchemaName: EmailConstants.entitySchemaName,
							primaryColumnValue: this.Terrasoft.GUID_EMPTY,
							operation: ConfigurationEnums.CardStateV2.ADD,
							historyState: historyState,
							typeId: ConfigurationConstants.Activity.Type.Email
						};
						NetworkUtilities.openCardInChain(config);
					},

					/**
					 * Opens mailbox settings module.
					 */
					navigateToMailboxSyncSettings: function() {
						var sandbox = this.sandbox;
						var tag = "MailboxSynchronizationSettingsModule";
						var currentHistoryState = sandbox.publish("GetHistoryState").hash.historyState;
						if (currentHistoryState !== tag) {
							if (tag !== "MailboxSynchronizationSettingsModule") {
								this.showBodyMask();
							}
							sandbox.publish("PushHistoryState", {hash: tag});
						}
					},

					/**
					 * Synchronizes email messages.
					 * @override
					 */
					onSynchronizeEmail: function() {
						this.checkMailBoxSyncSettings(function(isMailboxExist) {
							if (!isMailboxExist) {
								this.Terrasoft.showInformation(this.get("Resources.Strings.MailboxSettingsEmpty"));
								return;
							}
							var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "MailboxSyncSettings"
							});
							select.addColumn("[ActivityFolder:Name:MailboxName].Id", "ActivityFolderId");
							select.addColumn("SenderEmailAddress", "SenderEmailAddress");
							select.addColumn("MailServer.Id", "MailServerId");
							select.addColumn("MailServer.Type.Id", "MailServerTypeId");
							select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
									"SysAdminUnit", this.Terrasoft.SysValue.CURRENT_USER.value));
							select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
									"EnableMailSynhronization", true));
							select.filters.addItem(select.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
									"[ActivityFolder:Name:MailboxName].FolderType", ConfigurationConstants.Folder.Type.MailBox));
							select.getEntityCollection(function(response) {
								if (response.success) {
									this.downloadMessages(response.collection);
								}
							}, this);
						}, this);
					},

					/**
					 * Loads email process list.
					 * @param {Function} callback Callback function.
					 */
					loadProcessList: function(callback) {
						this.set("EmailProcessList", []);
						var filters = this.getProcessFilters();
						var select;
						if (this.Terrasoft.ProcessEntryPointUtilities.getCanRunProcessFromSection()) {
							select = ProcessModuleUtilities.createRunProcessESQ(filters);
						} else {
							select = ProcessModuleUtilities.createRunProcessSelect(filters);
						}
						select.getEntityCollection(function(result) {
							if (result.success) {
								this.initEmailProcessList(result.collection);
							}
							callback();
						}, this);
					},

					/**
					 * Creates default displayed relation columns list.
					 * @param {Function} callback Callback function.
					 */
					initDefaultEntityConnectionColumns: function(callback) {
						var profile = this.get("Profile");
						var defaultEntityConnectionColumns = profile.defaultEntityConnectionColumns;
						this.set("DefaultEntityConnectionColumns", defaultEntityConnectionColumns);
						if (callback) {
							callback();
						}
					},

					/**
					 * Creates filters for email processes list select.
					 * @return {Array} Email processes list select filters.
					 */
					getProcessFilters: function() {
						var filters = [];
						var emailProcessTag = this.get("EmailProcessTag");
						filters.push(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "TagProperty",
								emailProcessTag));
						return filters;
					},

					/**
					 * Creates and fills process meni items for actions menu.
					 * @param {Terrasoft.Collection} processList Avaliable rocesses list.
					 */
					initEmailProcessList: function(processList) {
						var emailProcessList = this.get("EmailProcessList");
						processList.each(function(process) {
							var proceessId = process.get("Id");
							var processCaption = process.get("Caption");
							emailProcessList.push({
								"Id": proceessId,
								"Caption": processCaption,
								"Click": {"bindTo": "runProcess"},
								"Tag": proceessId,
								"MarkerValue": processCaption
							});
						}, this);
						this.set("EmailProcessList", emailProcessList);
					},

					/**
					 * Email message model saved event handler.
					 * @param {Terrasoft.BaseViewModel} model Email message model instance.
					 */
					onEntitySaved: function(model) {
						var result = true;
						var isProcessed = this.get("IsProcessed");
						var isNeedProcess = model.get("IsNeedProcess");
						result = result && (isNeedProcess === isProcessed);
						if (!result) {
							this.unsubscribeModelEvents(model);
							var collection = this.get("EmailCollection");
							collection.remove(model);
						} else {
							var isNeedReload = model.get("IsNeedReload");
							if (isNeedReload) {
								model.set("IsNeedReload", false);
								this.reloadEmailsData([model.get("Id")]);
							}
						}
					},

					/**
					 * Removes email message from emails collection.
					 * @param {Terrasoft.BaseViewModel} model Email message model instance.
					 */
					onDeleteEmail: function(model) {
						this.unsubscribeModelEvents(model);
						var collection = this.get("EmailCollection");
						collection.remove(model);
					},

					/**
					 * Creates email type button caption.
					 * @return {String} Email type button caption.
					 */
					getMailTypeCaption: function() {
						var emailTypeCaption = this.get("Resources.Strings.IncomingEmail");
						var emailTypeCaptionGuid = this.get("EmailType");
						if (emailTypeCaptionGuid === EmailConstants.emailType.OUTGOING) {
							emailTypeCaption = this.get("Resources.Strings.OutgoingEmail");
						} else if (emailTypeCaptionGuid === EmailConstants.emailType.DRAFT) {
							emailTypeCaption = this.get("Resources.Strings.DraftEmail");
						}
						return emailTypeCaption;
					},

					/**
					 * Creates email processed or not processed button caption.
					 * @return {String} Email processed or not processed button caption.
					 */
					getEmailProcessedCaption: function() {
						var emailBoxIsProcessedCaption = this.get("Resources.Strings.EmailBoxIsProcessedCaption");
						var emailBoxNotProcessedCaption = this.get("Resources.Strings.EmailBoxNotProcessedCaption");
						var isProcessed = this.get("IsProcessed");
						return isProcessed ? emailBoxNotProcessedCaption : emailBoxIsProcessedCaption;
					},

					/**
					 * Reloads email on email type filter change.
					 * @param {Terrasoft.DataValueType.GUID} value Email type filter value.
					 */
					onMailTypeChange: function(value) {
						this.set("EmailType", value);
						this.reloadEmails();
					},

					/**
					 * Reloads email on email processed filter change.
					 * @param {Boolean} [showProcessed] Email processed filter value.
					 */
					onProcessChange: function(showProcessed) {
						showProcessed = showProcessed || false;
						var isProcessed = this.get("IsProcessed");
						if (isProcessed !== showProcessed) {
							this.set("IsProcessed", showProcessed);
							this.reloadEmails();
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
					 * @override
					 */
					getProfileKey: function() {
						return "EmailRelationDefaultButtons";
					},

					/**
					 * @inheritdoc EntityConnectionLinksUtilities#addAdditionalConnectionColumns
					 * @override
					 */
					addAdditionalConnectionColumns: function(entities) {
						var activityConnection = this.entitySchema.getColumnByName("ActivityConnection");
						var viewModel = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Name": activityConnection.name,
								"Caption": activityConnection.caption,
								"ColumnUId": activityConnection.uId
							}
						});
						entities.add(viewModel.ColumnUId, viewModel, viewModel.ColumnUId);
					},

					/**
					 * @inheritdoc EntityConnectionLinksUtilities#generateAdditionalRelationItemsConfig
					 * @override
					 */
					generateAdditionalRelationItemsConfig: function() {
						return this.generateEmailButtonsContainerConfig();
					},

					/**
					 * Actualized list of email accounts.
					 * @return {boolean} Stop event propagation flag.
					 */
					onActionsClick: function() {
						var collection = this.get("EmailTabActionsMenuCollection");
						this.removeEditEmailAccountItems(collection);
						this.getEditEmailAccountItems(collection);
						return false;
					},

					/**
					 * Sets empty grid layout message view config to config parameter.
					 * @param {Object} config Empty message config.
					 */
					getEmptyMessageConfig: function(config) {
						config.className = "Terrasoft.Container";
						var items = config.items = [];
						var preparedConfig = this.Terrasoft.deepClone(this.get("EmptyMessageConfig"));
						items.push(preparedConfig);
					},

					/**
					 * Returns empty grid layout message view model.
					 * @return {Object} config Empty grid layout message view model.
					 */
					getBlankSlateModel: function() {
						return this.get("BlankSlateModel");
					},

					/**
					 * Creates empty panel message view config.
					 * @param {Function} callback [description]
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Callback function scope.
					 */
					initEmptyMessageConfig: function(callback, scope) {
						var emptyMessageGeneratorConfig = this.Terrasoft.deepClone(this.get("EmptyMessageGeneratorConfig"));
						this._internalBuildSchema(emptyMessageGeneratorConfig, function(viewModelClass, viewConfig) {
							this.set("EmptyMessageConfig", viewConfig[0]);
							var model = this.Ext.create(viewModelClass, {
								Ext: this.Ext,
								sandbox: this.sandbox,
								Terrasoft: this.Terrasoft
							});
							this.set("BlankSlateModel", model);
							this.Ext.callback(callback, scope);
						}, this);
					}

					//endregion

				},
				diff: [
					{
						"operation": "insert",
						"name": "Emails",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["emails-main-container"]},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "EmailTabHeader",
						"propertyName": "items",
						"parentName": "Emails",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["emails-header-container"]},
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "EmailTabHeader",
						"propertyName": "items",
						"name": "MailTypeButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {
								"bindTo": "getMailTypeCaption"
							},
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"wrapperClass": ["email-type-button-wrapper", "left-button"],
								"menuClass": ["email-type-button-menu"]
							},
							"menu": {
								"items": {"bindTo": "getEmailTypeMenuItems"}
							},
							"enabled": {"bindTo": "IsDataLoaded"},
							"markerValue": "EmailTypeButton"
						}
					},
					{
						"operation": "insert",
						"parentName": "EmailTabHeader",
						"propertyName": "items",
						"name": "EmailProcessedButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {
								"bindTo": "getEmailProcessedCaption"
							},
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"wrapperClass": ["email-processed-button-wrapper", "left-button"],
								"menuClass": ["email-type-button-menu"]
							},
							"menu": {
								"items": {"bindTo": "getEmailProcessedMenuItems"}
							},
							"enabled": {"bindTo": "IsDataLoaded"},
							"markerValue": "EmailProcessedTypeButton"
						}
					},
					{
						"operation": "insert",
						"name": "AddEmail",
						"propertyName": "items",
						"parentName": "EmailTabHeader",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.AddEmailImage"},
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"markerValue": "AddEmailButton",
							"click": {"bindTo": "createEmail"},
							"classes": {wrapClassName: ["add-email-button-wrap"]}
						}
					},
					{
						"operation": "insert",
						"name": "EmailTabActions",
						"propertyName": "items",
						"parentName": "EmailTabHeader",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.ActionsButtonImage"},
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								wrapperClass: ["email-actions-button-wrapper", "email-tab-actions-button-wrapper"],
								menuClass: ["email-actions-button-menu"]
							},
							"controlConfig": {
								"menu": {
									"items": {"bindTo": "EmailTabActionsMenuCollection"}
								}
							},
							"visible": {"bindTo": "IsEmailTabActionsVisible"},
							"click": {"bindTo": "onActionsClick"},
							"markerValue": "EmailTabActions",
							"tips": []
						}
					},
					{
						"operation": "insert",
						"parentName": "EmailTabActions",
						"propertyName": "tips",
						"name": "EmailTabActionsTooltip",
						"values": {
							"content": {"bindTo": "TextEmailTabActionsTooltip"},
							"visible": {"bindTo": "ShowEmailTabActionsTooltip"},
							"linkClicked": {"bindTo": "onEmailTabActionsTooltipClick"},
							"items": [],
							"behaviour": {
								"displayEvent": Terrasoft.TipDisplayEvent.NONE
							},
							"restrictAlignType": Terrasoft.AlignType.BOTTOM
						}
					},
					{
						"operation": "insert",
						"name": "SyncErrors",
						"propertyName": "items",
						"parentName": "Emails",
						"values": {
							"itemType": Terrasoft.ViewItemType.MODULE,
							"classes": {"wrapClassName": ["sync-settings-errors"]},
							"moduleName": "BaseSchemaModuleV2",
							"instanceConfig": {
								"isSchemaConfigInitialized": true,
								"schemaName": "SyncSettingsErrors",
								"useHistoryState": false
							}
						}
					},
					{
						"operation": "insert",
						"name": "EmailContainerList",
						"propertyName": "items",
						"parentName": "Emails",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"generator": "ContainerListGenerator.generateGrid",
							"collection": {"bindTo": "EmailCollection"},
							"classes": {"wrapClassName": ["emails-container-list"]},
							"onGetItemConfig": {"bindTo": "onGetItemConfig"},
							"idProperty": "Id",
							"observableRowNumber": 1,
							"observableRowVisible": {"bindTo": "onLoadNext"},
							"rowCssSelector": ".email-container.selectable",
							"getEmptyMessageConfig": {"bindTo": "getEmptyMessageConfig"},
							"blankSlateModel": {"bindTo": "getBlankSlateModel"},
							"items": [],
							"itemFadeOutDuration": 20,
							"keepScrollOnItemsChanged": true
						}
					},
					{
						"operation": "insert",
						"name": "NewEmailsButtonContainer",
						"propertyName": "items",
						"parentName": "EmailTabHeader",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["email-reload-panel-button-wrapper"]},
							"visible": {
								"bindTo": "NewEmailsCounter",
								"bindConfig": {"converter": "getNewEmailsButtonVisible"}
							},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "NewEmailsButton",
						"parentName": "NewEmailsButtonContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.More"},
							"caption": {
								"bindTo": "NewEmailsCounter",
								"bindConfig": {"converter": "getNewEmailsButtonCaption"}
							},
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"click": {"bindTo": "reloadEmails"},
							"markerValue": "LoadNewEmails",
							"tips": []
						}
					}
				]
			};
		});

define("CommunicationPanelEmailSchema", ["EmailConstants", "EmailMiningEnums"],
	function(EmailConstants) {
		return {
			entitySchemaName: EmailConstants.entitySchemaName,

			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.CommunicationPanelEmailSchema#addEsqColumns
				 * @overridden
				 */
				addEsqColumns: function(esq) {
					this.callParent(arguments);
					esq.addColumn("EnrchEmailData.Status");
					esq.addColumn("EnrchEmailData");
				},

				/**
				 * Removes viewmodel subscription to server messages.
				 * @protected
				 */
				unsubscribeServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
				},

				/**
				 * Subscribes viewmodel to server messages.
				 * @protected
				 */
				subscribeServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.on(this.Terrasoft.EventName.ON_MESSAGE,
						this.onServerChannelMessage, this);
				},

				/**
				 * Server message handler. Reloads emails after enrich events.
				 * @protected
				 * @param {Object} scope Message scope.
				 * @param {Object} message Server messsage.
				 */
				onServerChannelMessage: function(scope, message) {
					if (message && message.Header && message.Header.Sender !== "EmailMining") {
						return;
					}
					var receivedMessage = this.Ext.decode(message.Body);
					var emailIds = [];
					var consts = this.Terrasoft.EmailMiningEnums;
					switch (message.Header.BodyTypeName) {
						case consts.EnrichMessageBodyType.ENRICHED:
							this.Terrasoft.each(receivedMessage, function(item) {
								if (item.enrichStatus && item.enrichStatus === consts.EmailEnrichStatus.DONE) {
									emailIds.push(item.activityId);
								}
							}, this);
							break;
						case consts.EnrichMessageBodyType.SAVED:
							this.Terrasoft.each(receivedMessage, function(item) {
								emailIds.push(item.activityId);
							}, this);
							break;
						default:
							break;
					}
					this.reloadEmailsData(emailIds);
				},

				//endregion

				//region Methods: Public

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.subscribeServerChannelEvents();
				},

				/**
				 * @inheritdoc Terrasoft.CommunicationPanelEmailSchema#onLoadEntity
				 * @overridden
				 */
				onLoadEntity: function(entity, viewModel) {
					if (viewModel) {
						var actions = viewModel.get("ActionsMenuCollection");
						if (actions) {
							actions.clear();
						}
						viewModel.set("ReloadActions", true);
					}
					return this.callParent(arguments);
				},

				/**
				 * Returns first element of collection, filtered by passed function.
				 * @param {Terrasoft.BaseViewModelCollection} collection Base view model collection instance.
				 * @param {Function} filterFn Filter function.
				 * @return {Terrasoft.BaseViewModel} First element of collection, filtered by passed function.
				 */
				firstByFn: function(collection, filterFn) {
					var filteredItems = collection.filterByFn(filterFn);
					return filteredItems.findByIndex(0);
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

			}
		};
	});


