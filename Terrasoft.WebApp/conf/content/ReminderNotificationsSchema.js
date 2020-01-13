Terrasoft.configuration.Structures["ReminderNotificationsSchema"] = {innerHierarchyStack: ["ReminderNotificationsSchemaNUI", "ReminderNotificationsSchema"], structureParent: "BaseNotificationsSchema"};
define('ReminderNotificationsSchemaNUIStructure', ['ReminderNotificationsSchemaNUIResources'], function(resources) {return {schemaUId:'70570e1e-c333-49b8-a34f-1642cbd6d4a2',schemaCaption: "Notifications module", parentSchemaName: "BaseNotificationsSchema", schemaName:'ReminderNotificationsSchemaNUI',parentSchemaUId:'362d1b69-b8e7-442d-8d48-f701591b493a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ReminderNotificationsSchemaStructure', ['ReminderNotificationsSchemaResources'], function(resources) {return {schemaUId:'d4e8043a-ed66-4b39-9ce7-37baa2a50b68',schemaCaption: "Notifications module", parentSchemaName: "ReminderNotificationsSchemaNUI", schemaName:'ReminderNotificationsSchema',parentSchemaUId:'70570e1e-c333-49b8-a34f-1642cbd6d4a2',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ReminderNotificationsSchemaNUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ReminderNotificationsSchemaNUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ReminderNotificationsSchemaNUI", ["ReminderNotificationsSchemaResources", "ConfigurationConstants",
		"RemindingsUtilities"],
	function(resources, ConfigurationConstants, RemindingsUtilities) {
		return {
			entitySchemaName: "Reminding",
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationType
				 * @overridden
				 */
				getNotificationType: function() {
					return ConfigurationConstants.Reminding.Reminding;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationGroup
				 * @overridden
				 */
				getNotificationGroup: function() {
					return ConfigurationConstants.NotificationGroup.Reminding;
				},

				/**
				 * Returns a menu button configuration.
				 * @param {String} bindToFunction The function name which is assigned to a menu item.
				 * @private
				 * @return {Terrasoft.BaseViewModelCollection} Menu button configuration.
				 */
				getNotificationActionButtonMenuItems: function(bindToFunction) {
					var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var menuItemsConfig = {
						"5": this.get("Resources.Strings.MenuItem5MinCaption"),
						"10": this.get("Resources.Strings.MenuItem10MinCaption"),
						"30": this.get("Resources.Strings.MenuItem30MinCaption"),
						"60": this.get("Resources.Strings.MenuItem1HourCaption"),
						"120": this.get("Resources.Strings.MenuItem2HourCaption"),
						"1440": this.get("Resources.Strings.MenuItem1DayCaption")
					};
					this.Terrasoft.each(menuItemsConfig, function(caption, time) {
						var buttonMenuItem = this.getButtonMenuItem({
							"Caption": caption,
							"Click": {"bindTo": bindToFunction},
							"Tag": time,
							"MarkerValue": caption
						});
						menuItems.addItem(buttonMenuItem);
					}, this);
					return menuItems;
				},

				/**
				 * Returns item check for activity notification.
				 * @return {Boolean} Is activity notification.
				 */
				getIsActivityNotification: function() {
					return this.get("SchemaName") === "Activity";
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationImage
				 * @overridden
				 */
				getNotificationImage: function() {
					var url = this.callParent(arguments);
					var category = this.get("Category");
					var activityCategories = ConfigurationConstants.Activity.ActivityCategory;
					if (category) {
						var imageResource;
						switch (category.value) {
							case activityCategories.Call:
								imageResource = this.get("Resources.Images.CallActivityImage");
								break;
							case activityCategories.CallAsTask:
								imageResource = this.get("Resources.Images.CallActivityImage");
								break;
							case activityCategories.PaperWork:
								imageResource = this.get("Resources.Images.PaperWorkActivityImage");
								break;
							case activityCategories.Meeting:
								imageResource = this.get("Resources.Images.MeetingActivityImage");
								break;
							default:
								imageResource = this.get("Resources.Images.DefaultActivityImage");
								break;
						}
						url = imageResource ? this.Terrasoft.ImageUrlBuilder.getUrl(imageResource) : url;
					}
					return url;
				},

				/**
				 * Returns activity account if it is.
				 * @private
				 * @return {String} Account name.
				 */
				getNotificationAccount: function() {
					var schemaName = this.get("SchemaName");
					var account = this.get(schemaName + "Account");
					return account ? account.displayValue : "";
				},

				/**
				 * Returns activity contact if it is.
				 * @private
				 * @return {String} Contact name.
				 */
				getNotificationContact: function() {
					var schemaName = this.get("SchemaName");
					var contact = this.get(schemaName + "Contact");
					return contact ? contact.displayValue : "";
				},

				/**
				 * Opens reference entity card.
				 * @private
				 */
				openCard: function() {
					var tag = arguments[arguments.length - 1];
					if (!this.Ext.isEmpty(tag)) {
						var referenceSchemaValue = this.get(tag.columnName);
						if (referenceSchemaValue) {
							this.openNotificationEntityCard(tag.referenceSchemaName, referenceSchemaValue.value);
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#addColumns
				 * @overridden
				 */
				addColumns: function(select) {
					this.callParent(arguments);
					select.addColumn("[Activity:Id:SubjectId].Contact", "ActivityContact");
					select.addColumn("[Activity:Id:SubjectId].Account", "ActivityAccount");
					select.addColumn("[Activity:Id:SubjectId].ActivityCategory", "Category");
					select.addColumn("[Activity:Id:SubjectId].>[ActivityStatus:Id:Status].Finish", "Finish");
					select.addColumn("[Activity:Id:SubjectId].>[ActivityStatus:Id:Status].Name", "StatusName");
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationSubjectCaption
				 * @overridden
				 */
				getNotificationSubjectCaption: function() {
					var caption = this.get("SubjectCaption");
					if (this.getIsFeatureEnabled("NotificationV2")) {
						caption = this.get("Description") || caption;
					}
					if (!this.Ext.isEmpty(caption)) {
						caption = (caption.length > 90) ? caption.substr(0, 90) + "..." : caption;
					}
					return caption;
				},

				/**
				 * Returns entity notification status name.
				 * @return {String} Entity notification status name.
				 */
				getNotificationStatusName: function() {
					return this.$StatusName;
				},

				/**
				 * Returns comma.
				 * @protected
				 * @return {String} Comma.
				 */
				getComma: function() {
					return this.get("Resources.Strings.Comma");
				},

				/**
				 * Returns entity notification status name caption.
				 * @return {String} Entity notification status name caption.
				 */
				getNotificationStatusCaption: function() {
					var caption = this.getNotificationStatusName();
					return this.getIsNotificationAccountOrContactShown() ? caption + this.getComma() : caption;
				},

				/**
				 * @inheritDoc Terrasoft.BaseNotificationsSchema#getNotificationDate
				 * @override
				 */
				getNotificationDate: function() {
					return this.callParent(arguments) + this.getComma();
				},

				/**
				 * Returns check for notification caption visibility.
				 * @return {Boolean} Is notification caption visible.
				 */
				getIsNotificationAccountShown: function() {
					return this._isExistsDisplayColumnValue("Account");
				},

				/**
				 * Signs of exists display column value.
				 * @private
				 */
				_isExistsDisplayColumnValue: function(columnName) {
					var schemaName = this.get("SchemaName");
					var schemaColumnName = this.get(schemaName + columnName);
					return Boolean(schemaColumnName && schemaColumnName.displayValue);
				},

				/**
				 * Signs of exists whether in notification contact or account.
				 * @return {Boolean} True if contact or account is exists, false otherwise.
				 */
				getIsNotificationAccountOrContactShown: function() {
					return this.getIsNotificationAccountShown() || this._isExistsDisplayColumnValue("Contact");
				},

				/**
				 * Signs of exists in notification contact and account.
				 * @return {Boolean} True if contact and account is exists, false otherwise.
				 */
				getIsNotificationAccountAndContactShown: function() {
					return this.getIsNotificationAccountShown() && this._isExistsDisplayColumnValue("Contact");
				},

				/**
				 * Sets new time for reminder.
				 * @param {Terrasoft.UpdateQuery} updateQuery Update query.
				 * @param {Number} minutesOffset Offset in minutes.
				 */
				setNewTimeForReminder: function(updateQuery, minutesOffset) {
					var newTime = this.Ext.Date.add(
							new Date(Date.now()),
							this.Ext.Date.MINUTE,
							parseInt(minutesOffset, 0)
					);
					updateQuery.setParameterValue("RemindTime", newTime, this.Terrasoft.DataValueType.DATE_TIME);
				},

				/**
				 * Handles the event menu "Postpone".
				 * @param {Object} minutesOffset Element menu button which was caused by.
				 * @private
				 */
				postpone: function(minutesOffset) {
					var updateQuery = this.getUpdateQuery();
					this.addIdFilter(updateQuery);
					this.setNewTimeForReminder(updateQuery, minutesOffset);
					this._setIsNeedToSendForReminder(updateQuery, true);
					this.executeOperation(updateQuery, this.removeReminder);
				},

				/**
				 * Handles the event menu "PostponeAll".
				 * @param {Object} minutesOffset Element menu button which was caused by.
				 * @private
				 */
				postponeAll: function(minutesOffset) {
					var notifications = this.get("Notifications");
					if (notifications.isEmpty()) {
						return;
					}
					var question = this.get("Resources.Strings.PostponeAllNotificationsQuestion");
					this.showConfirmationForOperation(question, function() {
						var updateQuery = this.getUpdateQuery();
						this.addByAllFilter(updateQuery);
						this.setNewTimeForReminder(updateQuery, minutesOffset);
						this._setIsNeedToSendForReminder(updateQuery, true);
						this.executeOperation(updateQuery, this.clearNotifications);
					});
				},

				/**
				 * Sets flag of reminder needs to be sent.
				 * @param {Object} updateQuery - update query.
				 * @param {Boolean} isNeedToSend - reminder needs to be sent flag.
				 * @private
				 */
				_setIsNeedToSendForReminder: function(updateQuery, isNeedToSend) {
					updateQuery.setParameterValue("IsNeedToSend", isNeedToSend, this.Terrasoft.DataValueType.BOOLEAN);
				},

				/**
				 * Cancels notification. In this operation a notification record deleted from the database.
				 * @private
				 */
				cancel: function() {
					var deleteQuery = this.getDeleteQuery();
					this.addIdFilter(deleteQuery);
					this.executeOperation(deleteQuery, this.removeReminder);
				},

				/**
				 * Cancels all notifications. This operation deletes all record of the current user from the database.
				 * @private
				 */
				cancelAll: function() {
					var notifications = this.get("Notifications");
					if (notifications.isEmpty()) {
						return;
					}
					var question = this.get("Resources.Strings.CancelAllNotificationsQuestion");
					this.showConfirmationForOperation(question, function() {
						var deleteQuery = this.getDeleteQuery();
						this.addByAllFilter(deleteQuery);
						this.executeOperation(deleteQuery, this.clearNotifications);
					});
				},

				/**
				 * Shows window with confirmation.
				 * @param {String} message Confirmation message.
				 * @param {Function} callback Callback function.
				 * @protected
				 */
				showConfirmationForOperation: function(message, callback) {
					this.showConfirmationDialog(message, function(returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							this.Ext.callback(callback, this);
						}
					}, [this.Terrasoft.MessageBoxButtons.YES.returnCode,
						this.Terrasoft.MessageBoxButtons.NO.returnCode], this.parentViewModel, null);
				},

				/**
				 * Executes a query operation.
				 * @param {Terrasoft.EntitySchemaQuery} query Query of operation.
				 * @param {Function} callback Callback function.
				 * @protected
				 */
				executeOperation: function(query, callback) {
					query.execute(function(response) {
						if (response.success) {
							this.Ext.callback(callback, this);
						} else {
							this.generateException(response.errorInfo);
						}
					}, this);
				},

				/**
				 * Returns delete query.
				 * @return {Terrasoft.DeleteQuery} Delete query.
				 */
				getDeleteQuery: function() {
					var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
						rootSchemaName: "Reminding"
					});
					return deleteQuery;
				},

				/**
				 * Returns update query.
				 * @return {Terrasoft.UpdateQuery} Update query.
				 */
				getUpdateQuery: function() {
					var updateQuery = Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "Reminding"
					});
					return updateQuery;
				},

				/**
				 * Adds filter by identifier.
				 * @param {Terrasoft.EntitySchemaQuery} query Query for filter.
				 * @protected
				 */
				addIdFilter: function(query) {
					var idFilter = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"Id", this.get("Id"));
					query.filters.add("IdFilter", idFilter);
				},

				/**
				 * Adds filter by identifier.
				 * @param {Terrasoft.EntitySchemaQuery} query Query for filter.
				 * @protected
				 */
				addByAllFilter: function(query) {
					var allFilter = RemindingsUtilities.remindingFilters();
					allFilter.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "NotificationType", this.getNotificationType()));
					query.filters.add("AllFilter", allFilter);
				},

				/**
				 * Clears notifications. Informs subscribers about the need recount the number of notifications.
				 * @protected
				 */
				clearNotifications: function() {
					var scope = this.parentViewModel || this;
					var notificationsCollection = scope.get("Notifications");
					notificationsCollection.clear();
					this.removeNotificationCounters();
					if (this.get("NotificationV2Enabled")) {
						this.sandbox.publish("UpdateCounterValues", this.getUpdateCounterConfig());
					} else {
						this.sandbox.publish("UpdateCounters");
					}
				},

				/**
				 * Deletes the record from the registry of notifications. Informs subscribers about the need
				 * recount the number of notifications.
				 * @protected
				 */
				removeReminder: function() {
					var scope = this.parentViewModel || this;
					var notificationId = this.get("Id");
					this.removeNotification.call(scope, notificationId);
				},

				/**
				 * Returns true if activity is not finish, false - otherwise.
				 * @return {Boolean}
				 */
				getActivityIsNotFinish: function() {
					return this.get("Finish") === false;
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "MainActionsButtonContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["main-actions-button-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "MainActionsButtonPostponeAll",
					"parentName": "MainActionsButtonContainer",
					"propertyName": "items",
					"values": {
						"caption": {"bindTo": "Resources.Strings.PostponeAllMenuItemCaption"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": {"bindTo": "getNotificationActionButtonMenuItems"},
							"tag": "postponeAll"
						},
						"classes": {
							"wrapperClass": ["postpone-all-class"],
							"menuClass": ["postpone-all-menuClass"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "MainActionsButtonCancelAll",
					"parentName": "MainActionsButtonContainer",
					"propertyName": "items",
					"values": {
						"caption": {"bindTo": "Resources.Strings.CancelAllMenuItemCaption"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"click": {"bindTo": "cancelAll"},
						"classes": {"textClass": ["cancel-all-class"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationActivityItemContainer",
					"parentName": "Notification",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": [
							"reminder-notification-item-container",
							"reminder-notification-activity-item-container"
						],
						"visible": {"bindTo": "getIsActivityNotification"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemActivityTopContainer",
					"parentName": "NotificationActivityItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["reminder-notification-item-top-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemActivityBottomContainer",
					"parentName": "NotificationActivityItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["reminder-notification-item-bottom-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationActivityImage",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {"bindTo": "getNotificationImage"},
						"classes": {"wrapClass": ["reminder-notification-icon-class"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationDate",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationDate"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationStatus",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationStatusCaption"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationSubjectCaption",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getNotificationAccount"},
						"click": {"bindTo": "openCard"},
						"visible": {"bindTo": "getIsNotificationAccountShown"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "ActivityAccount",
							"referenceSchemaName": "Account"
						},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationComma",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.Comma"},
						"visible": {"bindTo": "getIsNotificationAccountAndContactShown"},
						"classes": {"labelClass": ["account-comma-contact"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationContactCaption",
					"parentName": "NotificationItemActivityTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getNotificationContact"},
						"click": {"bindTo": "openCard"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "ActivityContact",
							"referenceSchemaName": "Contact"
						},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationActivitySubject",
					"parentName": "NotificationItemActivityBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getNotificationSubjectCaption"},
						"click": {"bindTo": "onNotificationSubjectClick"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "SubjectId",
							"referenceSchemaName": "Activity"
						},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "ActionsButtonPostpone",
					"parentName": "NotificationActivityItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"wrapperClass": ["notificationActionButtonWrap-class"]
						},
						"markerValue": "RemindingActionsMenu",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": [{
								"caption": {"bindTo": "Resources.Strings.PostponeMenuItemCaption"},
								"markerValue": {"bindTo": "Resources.Strings.PostponeMenuItemCaption"},
								"menu": {
									"items": {"bindTo": "getNotificationActionButtonMenuItems"},
									"tag": "postpone"
								}
							}, {
								"caption": {"bindTo": "Resources.Strings.CancelMenuItemCaption"},
								"markerValue": {"bindTo": "Resources.Strings.CancelMenuItemCaption"},
								"click": {"bindTo": "cancel"}
							}]
						},
						"visible": {"bindTo": "getActivityIsNotFinish"}
					}
				}
			]
		};
	});

define("ReminderNotificationsSchema", ["ReminderNotificationsSchemaResources"],
	function() {
		return {
			entitySchemaName: "Reminding",
			methods: {

				/**
				 * Returns item check for invoice notification.
				 * @return {Boolean} Is invoice notification.
				 */
				getIsInvoiceNotification: function() {
					return this.get("SchemaName") === "Invoice";
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#addColumns
				 * @overridden
				 */
				addColumns: function(select) {
					this.callParent(arguments);
					select.addColumn("[Invoice:Id:SubjectId].Contact", "InvoiceContact");
					select.addColumn("[Invoice:Id:SubjectId].Account", "InvoiceAccount");
					select.addColumn("[Invoice:Id:SubjectId].>[InvoicePaymentStatus:Id:PaymentStatus].FinalStatus",
						"InvoiceFinalStatus");
					select.addColumn("[Invoice:Id:SubjectId].>[InvoicePaymentStatus:Id:PaymentStatus].Name",
						"InvoiceFinalStatusName");
				},

				/**
				 * Returns true if invoice status is not final, false - otherwise.
				 * @return {Boolean}
				 */
				getInvoiceStatusIsNotFinal: function() {
					return this.get("InvoiceFinalStatus") === false;
				},

				/**
				 * @inheritDoc Terrasoft.ReminderNotificationsSchema#getNotificationStatusName
				 * @override
				 */
				getNotificationStatusName: function() {
					return this.getIsInvoiceNotification() ?
						this.$InvoiceFinalStatusName :
						this.callParent(arguments);
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "NotificationInvoiceItemContainer",
					"parentName": "Notification",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": [
							"reminder-notification-item-container",
							"reminder-notification-invoice-item-container"
						],
						"visible": {"bindTo": "getIsInvoiceNotification"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemInvoiceTopContainer",
					"parentName": "NotificationInvoiceItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["reminder-notification-item-top-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationInvoiceImage",
					"parentName": "NotificationItemInvoiceTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"className": "Terrasoft.ImageView",
						"imageSrc": {"bindTo": "getNotificationImage"},
						"classes": {"wrapClass": ["reminder-notification-icon-class"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemInvoiceBottomContainer",
					"parentName": "NotificationInvoiceItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["reminder-notification-item-bottom-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationInvoiceCaption",
					"parentName": "NotificationItemInvoiceTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.InvoiceCaption"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationInvoiceSubject",
					"parentName": "NotificationItemInvoiceTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationSubjectCaption"},
						"click": {"bindTo": "onNotificationSubjectClick"},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationDate",
					"parentName": "NotificationItemInvoiceTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationDate"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationStatus",
					"parentName": "NotificationItemInvoiceTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationStatusName"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationAccountCaption",
					"parentName": "NotificationItemInvoiceBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getNotificationAccount"},
						"click": {"bindTo": "openCard"},
						"visible": {"bindTo": "getIsNotificationAccountShown"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "InvoiceAccount",
							"referenceSchemaName": "Account"
						},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationContactCaption",
					"parentName": "NotificationItemInvoiceBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getNotificationContact"},
						"click": {"bindTo": "openCard"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "InvoiceContact",
							"referenceSchemaName": "Contact"
						},
						"classes": {"labelClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "ActionsButtonPostpone",
					"parentName": "NotificationInvoiceItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"classes": {
							"wrapperClass": ["notificationActionButtonWrap-class"]
						},
						"markerValue": "RemindingActionsMenu",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": [{
								"caption": {"bindTo": "Resources.Strings.PostponeMenuItemCaption"},
								"markerValue": {"bindTo": "Resources.Strings.PostponeMenuItemCaption"},
								"menu": {
									"items": {"bindTo": "getNotificationActionButtonMenuItems"},
									"tag": "postpone"
								}
							}, {
								"caption": {"bindTo": "Resources.Strings.CancelMenuItemCaption"},
								"markerValue": {"bindTo": "Resources.Strings.CancelMenuItemCaption"},
								"click": {"bindTo": "cancel"}
							}]
						},
						"visible": {"bindTo": "getInvoiceStatusIsNotFinal"}
					}
				}
			]
		};
	});


