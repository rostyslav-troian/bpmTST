Terrasoft.configuration.Structures["GoogleIntegrationSettingsPageV2"] = {innerHierarchyStack: ["GoogleIntegrationSettingsPageV2"], structureParent: "BasePageV2"};
define('GoogleIntegrationSettingsPageV2Structure', ['GoogleIntegrationSettingsPageV2Resources'], function(resources) {return {schemaUId:'3dac2444-603c-4375-8e38-73164b75f0c2',schemaCaption: "GoogleIntegrationSettingsPageV2", parentSchemaName: "BasePageV2", schemaName:'GoogleIntegrationSettingsPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GoogleIntegrationSettingsPageV2", ["ext-base", "terrasoft", "TagConstantsV2", "ConfigurationConstants",
		"GoogleIntegrationUtilitiesV2", "css!FullWidthLabelViewGenerator"],
	function(Ext, Terrasoft, TagConstants) {
		return {
			mixins: {
				GoogleIntegrationUtils: "Terrasoft.GoogleIntegrationUtilities"
			},
			messages: {
				/**
				 * Publish message for header change
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "SaveButton",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "onSaveClick"}
					}
				},
				{
					"operation": "merge",
					"name": "DiscardChangesButton",
					"parentName": "LeftContainer",
					"propertyName": "items",
					"values": {
						"click": {"bindTo": "onCancelClick"}
					}
				},
				{
					"operation": "merge",
					"name": "CardContentContainer",
					"values": {
						"wrapClass": ["google-integration-card-container", "center-main-container"]
					}
				},
				{
					"operation": "remove",
					"name": "HeaderContainer"
				},
				{
					"operation": "remove",
					"name": "actions",
					"parentName": "LeftContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "SynchronizationTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SynchronizationTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SynchronizationTab",
					"name": "SynchronizationTabContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SynchronizationTabContainer",
					"propertyName": "items",
					"index": 0,
					"name": "GoogleCalendar",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GoogleCalendarCaption"},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"controlConfig": {"collapsed": false},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleCalendar",
					"propertyName": "items",
					"name": "GoogleCalendarBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleCalendarBlock",
					"propertyName": "items",
					"name": "IsCalendarAutoSync",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 0},
						"labelConfig": {"visible": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleCalendarBlock",
					"propertyName": "items",
					"name": "CalendarSyncInterval",
					"values": {
						"bindTo": "CalendarSyncInterval",
						"enabled": {"bindTo": "IsCalendarAutoSync"},
						"className": "Terrasoft.ComboBoxEdit",
						"layout": {"column": 1, "row": 0, "colSpan": 23},
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.CalendarSyncIntervalCaption"},
							"classes": {
								"labelClass": ["full-width-label"],
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"wrapClasses": ["settings-wrapper"],
						"listConfig": {
							"list": {
								"bindTo": "CalendarSyncIntervalList"
							},
							"prepareList": {
								"bindTo": "prepareSyncIntervalList"
							},
							"classes": {
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"generator": "FullWidthLabelViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleCalendarBlock",
					"propertyName": "items",
					"name": "CalendarSyncDate",
					"values": {
						"bindTo": "CalendarSyncInterval",
						"enabled": {"bindTo": "IsCalendarAutoSync"},
						"className": "Terrasoft.DateEdit",
						"layout": {"column": 1, "row": 1, "colSpan": 23},
						"dataValueType": Terrasoft.DataValueType.DATE,
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.CalendarSyncDateCaption"},
							"classes": {
								"labelClass": ["full-width-label"],
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"wrapClasses": ["settings-wrapper"],
						"listConfig": {
							"classes": {
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"generator": "FullWidthLabelViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "SynchronizationTabContainer",
					"propertyName": "items",
					"index": 1,
					"name": "GoogleContacts",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GoogleContactsCaption"},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"controlConfig": {"collapsed": false},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleContacts",
					"propertyName": "items",
					"name": "GoogleContactsBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleContactsBlock",
					"propertyName": "items",
					"name": "IsContactAutoSync",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 0},
						"controlConfig": {"enabled": true},
						"labelConfig": {"visible": false}
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleContactsBlock",
					"propertyName": "items",
					"name": "ContactsSyncInterval",
					"values": {
						"bindTo": "ContactsSyncInterval",
						"className": "Terrasoft.ComboBoxEdit",
						"enabled": {"bindTo": "IsCalendarAutoSync"},
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 1, "row": 0, "colSpan": 23},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.ContactsSyncIntervalCaption"},
							"classes": {
								"labelClass": ["full-width-label"],
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"wrapClasses": ["settings-wrapper"],
						"listConfig": {
							"list": {
								"bindTo": "ContactsSyncIntervalList"
							},
							"prepareList": {
								"bindTo": "prepareSyncIntervalList"
							},
							"classes": {
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"generator": "FullWidthLabelViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleContactsBlock",
					"propertyName": "items",
					"name": "ContactsTagValue",
					"values": {
						"bindTo": "ContactsTagValue",
						"className": "Terrasoft.ComboBoxEdit",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 1, "row": 1, "colSpan": 23},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.TagListCaption"},
							"classes": {
								"labelClass": ["full-width-label"],
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"wrapClasses": ["settings-wrapper"],
						"listConfig": {
							"list": {
								"bindTo": "ContactTagList"
							},
							"prepareList": {
								"bindTo": "preparePrivateTagList"
							},
							"classes": {
								"wrapClass": ["initial-width-wrapper"]
							}
						},
						"generator": "FullWidthLabelViewGenerator.generate"
					}
				},
				{
					"operation": "insert",
					"parentName": "GoogleContactsBlock",
					"propertyName": "items",
					"name": "TransferAllLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": ["transfer-all-label t-label"]
						},
						"caption": {"bindTo": "Resources.Strings.TransferAllCaption"},
						"layout": {"column": 1, "row": 2, "colSpan": 23}
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {
				/**
				 * Google account
				 */
				"Login": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					name: "Login",
					isRequired: true
				},
				/**
				 * Interval of google calendar synchronization.
				 */
				"CalendarSyncInterval": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					name: "CalendarSyncInterval"
				},
				/**
				 * Start date of google calendar synchronization.
				 */
				"CalendarSyncDate": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.DATE,
					name: "CalendarSyncDate",
					isRequired: true
				},
				/**
				 * Interval of google contacts synchronization.
				 */
				"ContactsSyncInterval": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					name: "ContactsSyncInterval"
				},
				/**
				 * Transfer contact marked by tag from bpm'online to google.
				 */
				"ContactsTagValue": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					name: "ContactsTagValue",
					schemaName: "ContactTag"
				},
				/**
				 * List of contact private tags.
				 */
				"ContactTagList": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.ENUM,
					name: "ContactTagList",
					isCollection: true
				},
				/**
				* Shows whether activities synchronization is recreated.
				 */
				"IsCalendarAutoSync": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					name: "IsCalendarAutoSync"
				},
				/**
				 * Shows whether calendar synchronization is recreated.
				 */
				"IsContactAutoSync": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					name: "IsContactAutoSync"
				},
				/**
				* Value of bpm online contacts tag synced with google.
				 */
				"TransferMarkedByTag": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					name: "TransferMarkedByTag",
					value: true
				},
				/**
				 * Transfer all contacts from google to bpm.
				 */
				"TransferAll": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					name: "TransferAll",
					value: true
				},
				/**
				 * Private tag type unique identifier.
				 */
				"TagConstants.TagType.Private": {
					dataValueType: Terrasoft.DataValueType.GUID,
					value: TagConstants.TagType.Private
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.ProcessEntryPointUtilities#initRunProcessButtonMenu
				 * @overridden
				 */
				initRunProcessButtonMenu: Ext.emptyFn,

				/**
				 * @inheritdoc Terrasoft.PrintReportUtilities#getCardPrintButtonVisible
				 * @overridden
				 */
				getCardPrintButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getViewOptionsButtonVisible
				 * @overridden
				 */
				getViewOptionsButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#getHeader
				 * @overridden
				 */
				getHeader: function() {
					var login = this.get("Login") || "";
					var pageCaption = this.get("Resources.Strings.PageCaption");
					return Ext.String.format("{0} {1}", pageCaption, login);
				},

				/**
				 * Creates synchronization job.
				 * @protected
				 * @param {Object} data Job settings.
				 */
				createScheduledJob: function(data) {
					var provider = Terrasoft.AjaxProvider;
					var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
					var requestUrl = workspaceBaseUrl + "/rest/SchedulerJobService/CreateSyncJob";
					provider.request({
						url: requestUrl,
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
						},
						method: "POST",
						jsonData: data,
						callback: function() {
							var sandbox = this.sandbox;
							sandbox.publish("BackHistoryState");
						},
						scope: this
					});
				},

				/**
				 * Creates user settings object.
				 * @protected
				 * @return {Object} User synchronization settings.
				 */
				createSysSettingsData: function() {
					var contactSyncIntervalValue,
						calendarSyncIntervalValue,
						tagValue;
					var contactSyncInterval = this.get("ContactsSyncInterval");
					if (contactSyncInterval) {
						contactSyncIntervalValue = contactSyncInterval.value;
					}
					var calendarSyncInterval = this.get("CalendarSyncInterval");
					if (calendarSyncInterval) {
						calendarSyncIntervalValue = calendarSyncInterval.value;
					}
					tagValue = this.get("ContactsTagValue");
					var calendarSyncDate = this.get("CalendarSyncDate");
					var sysSettingsValues = {
						GoogleCalendarLastSynchronization: calendarSyncDate,
						GoogleCalendarLastSynchronizationEnd: calendarSyncDate,
						GoogleContactGroup: tagValue
					};
					if (contactSyncIntervalValue) {
						Ext.apply(sysSettingsValues, {
							GoogleContactSynchInterval: contactSyncIntervalValue
						});
					}
					if (calendarSyncIntervalValue) {
						Ext.apply(sysSettingsValues, {
							GoogleCalendarSynchInterval: calendarSyncIntervalValue
						});
					}
					return {
						sysSettingsValues: sysSettingsValues,
						isPersonal: true
					};
				},

				/**
				 * Creates data object and scheduled job.
				 * @param {String} schemaName Name of google application.
				 * @param {Number} syncInterval Synchronization interval in minutes.
				 */
				prepareScheduledJob: function(schemaName, syncInterval) {
					var jobData = {
						JobName: Ext.String.format("SyncGoogle{0}{1}", schemaName, Terrasoft.SysValue.CURRENT_USER.value),
						SyncJobGroupName: "GoogleIntegration",
						SyncProcessName: Ext.String.format("G{0}SynchronizationModuleProcess", schemaName),
						periodInMinutes: syncInterval,
						recreate: this.get(Ext.String.format("Is{0}AutoSync", schemaName))
					};
					this.createScheduledJob(jobData);
				},

				/**
				 * Checks google contacts sync settings for validity.
				 * @protected
				 * @return {Boolean} Whether contact settings are valid.
				 */
				validateContactSettings: function() {
					var contactTag =  this.get("ContactsTagValue");
					if (!contactTag) {
						this.validationInfo.set("ContactsTagValue", {
							invalidMessage: this.get("Resources.Strings.EmptyValueMessage"),
							isValid: false
						});
						return false;
					}
					return true;
				},

				/**
				 * Process save button click. Save sync settings.
				 * @protected
				 */
				onSaveClick: function() {
					if (this.entitySchemaName === "Contact") {
						if (!this.validateContactSettings()) {
							return;
						}
						this.validateGoogleContactsIntegrationRights();
					}
					var sysSettingsData = this.createSysSettingsData();
					Terrasoft.SysSettings.postSysSettingsValues(sysSettingsData,
						function() {
							var sysSettingsValues = sysSettingsData.sysSettingsValues;
							this.prepareScheduledJob("Contact", sysSettingsValues.GoogleContactSynchInterval);
							this.prepareScheduledJob("Calendar", sysSettingsValues.GoogleCalendarSynchInterval);
						}, this);
				},

				/**
				 * Process cancel button click. Discard sync settings.
				 * @protected
				 */
				onCancelClick: function() {
					var sandbox = this.sandbox;
					sandbox.publish("BackHistoryState");
				},

				/**
				 * Loads values into tag list combobox.
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				preparePrivateTagList: function(filter, list) {
					var contactTagList = this.get("ContactTagListCache");
					list.clear();
					list.loadAll(contactTagList);
				},

				/**
				 * Loads values into  sync interval combobox.
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				prepareSyncIntervalList: function(filter, list) {
					if (list === null) {
						return;
					}
					list.clear();
					list.loadAll(this.getSyncIntervalList());
				},

				/**
				 * Returns collection of sync intervals.
				 * @return {Terrasoft.Collection} List of sync intervals.
				 */
				getSyncIntervalList: function() {
					var list = Ext.create("Terrasoft.Collection");
					var oneMinuteCaption = this.get("Resources.Strings.OneMinuteCaption");
					var multipleMinutesCaption = this.get("Resources.Strings.MultipleMinutesCaption");
					Terrasoft.each(Terrasoft.TimeScale, function(value) {
						if (value ===  Terrasoft.TimeScale.ONE_MINUTE) {
							list.add(value, {
								displayValue: oneMinuteCaption,
								value: value
							});
						} else {
							list.add(value, {
								displayValue: Ext.String.format(multipleMinutesCaption, value),
								value: value
							});
						}
					}, this);
					return list;
				},

				/**
				 * Initializes bpm contact tags.
				 * @protected
				 */
				initPrivateTags: function() {
					var contactTagList = Ext.create("Terrasoft.Collection");
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ContactTag"
					});
					select.addColumn("Id");
					select.addColumn("Name");
					var privateTag = this.get("TagConstants.TagType.Private");
					select.filters.add("privateTagFilter", select.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Type", privateTag));
					select.filters.add("CurrentUserFilter", select.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "CreatedBy", this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value));
					select.getEntityCollection(function(response) {
						response.collection.each(function(item) {
							var key = item.get("Id");
							var displayValue = item.get("Name");
							contactTagList.add(key, {value: key, displayValue: displayValue});
						}, this);
						this.set("ContactTagListCache", contactTagList);
					}, this);
				},

				/**
				 * Sets property with synchronization interval object.
				 * @protected
				 * @param {String} propertyName Property name.
				 * @param {Number} interval Synchronization interval value.
				 */
				setSyncInterval: function(propertyName, interval) {
					var collection = this.getSyncIntervalList();
					if (collection.contains(interval)) {
						this.set(propertyName, collection.get(interval));
					} else {
						this.set(propertyName, collection.get(Terrasoft.TimeScale.SIXTY_MINUTES));
					}
				},

				/**
				 * Gets selected tag value by id.
				 * @protected
				 * @param {String} id Private tag id.
				 */
				setTagSelectedItemById: function(id) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ContactTag"
					});
					select.addColumn("Id");
					select.addColumn("Name");
					select.getEntity(id, function(response) {
						var entity = response.entity;
						if (entity) {
							var value = {value: entity.get("Id"), displayValue: entity.get("Name")};
							this.set("ContactsTagValue", value);
						}
					}, this);
				},

				/**
				 * Sets property to true if specified job exists.
				 * @protected
				 * @param {String} jobName Job name.
				 * @param {String} syncJobGroupName Job group name.
				 * @param {String} propertyName Name of property.
				 */
				setAutoSyncState: function(jobName, syncJobGroupName, propertyName) {
					var provider = Terrasoft.AjaxProvider;
					var data = {
						JobName: jobName,
						SyncJobGroupName: syncJobGroupName
					};
					var workspaceBaseUrl = Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
					var requestUrl = workspaceBaseUrl + "/rest/SchedulerJobService/CheckIfJobExist";
					provider.request({
						url: requestUrl,
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
						},
						method: "POST",
						jsonData: data,
						callback: function(request, success, response) {
							var ifExistResult = false;
							if (success) {
								ifExistResult = Terrasoft.decode(response.responseText);
								this.set(propertyName, ifExistResult.CheckIfJobExistResult);
							}
						},
						scope: this
					});
				},

				/**
				 * Sets login property.
				 * @protected
				 */
				setLoginControl: function() {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SocialAccount"
					});
					select.addColumn("Login");
					select.filters.add("UserIdFilter", select.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "User", Terrasoft.SysValue.CURRENT_USER.value));
					var googleCommunicationType = this.get("ConfigurationConstants.CommunicationType.Google");
					select.filters.add("TypeIdFilter", select.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Type", googleCommunicationType));
					select.getEntityCollection(function(response) {
						if (response.success) {
							var entities = response.collection;
							if (entities.getCount() > 0) {
								var login = entities.getByIndex(0).get("Login");
								this.set("Login", login);
								this.sandbox.publish("ChangeHeaderCaption", {
									caption: this.getHeader()
								});
							}
						}
					}, this);
				},

				/**
				 * Sets CalendarSyncDate with parameter or default value.
				 * @protected
				 * @param {Date} syncDate Date obtained from settings.
				 */
				setCalendarSyncDate: function(syncDate) {
					if (!syncDate) {
						syncDate = new Date();
						syncDate.setDate(syncDate.getDate() - 7);
					}
					this.set("CalendarSyncDate", syncDate);
				},

				/**
				 * Initializes collection with empty value.
				 * @protected
				 * @param {String} collectionName Name of collection.
				 */
				initCollection: function(collectionName) {
					if (!this.get(collectionName)) {
						this.set(collectionName, this.Ext.create("Terrasoft.Collection"));
					}
				},

				/**
				 * Initializes model properties.
				 * @protected
				 */
				initModel: function() {
					this.initCollection("ContactTagList");
					this.initCollection("ContactTagListCache");
					this.initCollection("CalendarSyncIntervalList");
					this.initCollection("ContactsSyncIntervalList");
					this.setLoginControl();
					this.setAutoSyncState("SyncGoogleContact" + Terrasoft.SysValue.CURRENT_USER.value,
						"GoogleIntegration", "IsContactAutoSync");
					this.setAutoSyncState("SyncGoogleCalendar" + Terrasoft.SysValue.CURRENT_USER.value,
						"GoogleIntegration", "IsCalendarAutoSync");
					var sysSettings = [
						"GoogleContactSynchInterval",
						"GoogleContactGroup",
						"GoogleCalendarLastSynchronization",
						"GoogleCalendarSynchInterval"
					];
					Terrasoft.SysSettings.querySysSettings(sysSettings, function(settings) {
						this.setSyncInterval("ContactsSyncInterval", settings.GoogleContactSynchInterval);
						var contactGroup = settings.GoogleContactGroup;
						if (contactGroup) {
							var recordId = (Ext.isObject(contactGroup)) ? contactGroup.value : contactGroup;
							this.setTagSelectedItemById(recordId);
						}
						this.setCalendarSyncDate(settings.GoogleCalendarLastSynchronization);
						this.setSyncInterval("CalendarSyncInterval", settings.GoogleCalendarSynchInterval);
					}, this);
				},

				/**
				 * Initialize model.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initModel();
						this.mixins.GoogleIntegrationUtils.init.call(this);
						this.initPrivateTags();
						callback.call(scope || this);
					}, this]);
				}
			}
		};
	});


