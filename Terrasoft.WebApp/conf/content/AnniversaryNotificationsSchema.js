Terrasoft.configuration.Structures["AnniversaryNotificationsSchema"] = {innerHierarchyStack: ["AnniversaryNotificationsSchema"], structureParent: "BaseNotificationsSchema"};
define('AnniversaryNotificationsSchemaStructure', ['AnniversaryNotificationsSchemaResources'], function(resources) {return {schemaUId:'366c101a-a9ec-4079-a81a-25f2deeca124',schemaCaption: "Schema of anniversary notifications", parentSchemaName: "BaseNotificationsSchema", schemaName:'AnniversaryNotificationsSchema',parentSchemaUId:'362d1b69-b8e7-442d-8d48-f701591b493a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AnniversaryNotificationsSchema", ["AnniversaryNotificationsSchemaResources", "ConfigurationConstants",
		"ViewUtilities", "ConfigurationEnums", "NetworkUtilities", "MiniPageUtilities"],
	function(resources, ConfigurationConstants, ViewUtilities, ConfigurationEnums) {
		return {
			entitySchemaName: "Reminding",
			mixins: {
				/**
				 * @class MiniPageUtilities Mixin, used for Mini Pages
				 */
				MiniPageUtilitiesMixin: "Terrasoft.MiniPageUtilities"
			},
			attributes: {
				/*
				 * Days to subtract from current date, to build records filter.
				 */
				daysToSubtract: {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					value: 3
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationType
				 * @overridden
				 */
				getNotificationType: function() {
					return ConfigurationConstants.Reminding.Anniversary;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationGroup
				 * @overridden
				 */
				getNotificationGroup: function() {
					return ConfigurationConstants.NotificationGroup.Anniversary;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#addColumns
				 * @overridden
				 */
				addColumns: function(select) {
					this.callParent(arguments);
					select.addColumn("[Contact:Id:SubjectId].Id", "ContactId");
					select.addColumn("[Contact:Id:SubjectId].Name", "ContactName");
					select.addColumn("[Contact:Id:SubjectId].Account.Id", "AccountOfContactId");
					select.addColumn("[Contact:Id:SubjectId].Account.Name", "AccountOfContactName");
					select.addColumn("[Account:Id:SubjectId].Id", "AccountId");
					select.addColumn("[Account:Id:SubjectId].Name", "AccountName");
					select.addColumn("TypeCaption");
					if (this.getIsFeatureEnabled("NotificationV2")) {
						const anniversaryDateColumn = select.addColumn("AnniversaryDate");
						anniversaryDateColumn.orderPosition = 0;
						anniversaryDateColumn.orderDirection = Terrasoft.OrderDirection.ASC;
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#addFilters
				 * @overridden
				 */
				addFilters: function(select) {
					this.callParent(arguments);
					var filterGroup = this.Terrasoft.createFilterGroup();
					filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					filterGroup.add("Contact", this.Terrasoft.createColumnIsNotNullFilter("[Contact:Id:SubjectId].Id"));
					filterGroup.add("Account", this.Terrasoft.createColumnIsNotNullFilter("[Account:Id:SubjectId].Id"));
					select.filters.add("IsWithSubjectId", filterGroup);
					if (this.getIsFeatureEnabled("NotificationV2")) {
						var selectionStartDate = this.Terrasoft.addDays(new Date(), -this.$daysToSubtract);
						select.filters.add("AnniversaryDate", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.GREATER_OR_EQUAL, "AnniversaryDate", selectionStartDate));
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#applySelect
				 * @overridden
				 */
				applySelect: function(select) {
					var mergerSelect = this.getNotificationMergerSelect();
					select.columns.removeByKey("Source");
					this.callParent([select, mergerSelect]);
				},

				/**
				 * Returns query of notifications to the merger.
				 * @return {Terrasoft.EntitySchemaQuery} Query of notifications to the merger.
				 */
				getNotificationMergerSelect: function() {
					var mergeSelect = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this.entitySchemaName
					});
					mergeSelect.addColumn("SubjectId", "Id");
					mergeSelect.addAggregationSchemaColumn("RemindTime",
							this.Terrasoft.AggregationType.MAX, "RemindTime");
					return mergeSelect;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationSubjectCaption
				 * @overridden
				 */
				getNotificationSubjectCaption: function() {
					var typeCaption = this.get("TypeCaption");
					var dateOfBirthday = this.getIsFeatureEnabled("NotificationV2")
						? typeCaption
						: this.callParent(arguments);
					var template = this.getSubjectCaptionTemplate();
					var years = this.getYearsDiff(new Date(), dateOfBirthday);
					var formattedDate = this.getFormattedDate(dateOfBirthday);
					var yearsStr = years
						? this.Ext.String.format(this.get("Resources.Strings.YearsTemplate"), years)
						: "";
					return this.Ext.String.format(template, formattedDate, yearsStr);
				},

				/**
				 * Returns template for item subject.
				 * @return {String} Template.
				 */
				getSubjectCaptionTemplate: function() {
					return this.getIsContactFilled()
						? resources.localizableStrings.ContactCaption
						: resources.localizableStrings.AccountCaption;
				},

				/**
				 * Returns years diff between two dates.
				 * @param {Object|String} firstDate The date from which is subtract.
				 * @param {Object|String} secondDate The date that is deducted.
				 * @return {Number} Number of years.
				 */
				getYearsDiff: function(firstDate, secondDate) {
					return (new Date(firstDate)).getFullYear() - (new Date(secondDate)).getFullYear();
				},

				/**
				 * Returns the formatted date.
				 * @param {Object|String} date The unformatted date.
				 * @return {String} The formatted date.
				 */
				getFormattedDate: function(date) {
					date = date && this.Terrasoft.parseDate(date);
					return this.Terrasoft.getTypedStringValue(date, this.Terrasoft.DataValueType.DATE);
				},

				/**
				 * Gets the contact identifier of the notifications.
				 * @private
				 * @return {String} Contact identifier of the notifications.
				 */
				getContactId: function() {
					return this.get("ContactId");
				},

				/**
				 * Gets the account identifier of the notifications.
				 * @private
				 * @return {String} Account identifier of the notifications.
				 */
				getAccountId: function() {
					var id = this.get("AccountId") || this.get("AccountOfContactId");
					return id;
				},

				/**
				 * Gets the account name of the notifications.
				 * @private
				 * @return {String} Account name of the notifications.
				 */
				getAccountName: function() {
					var name = this.get("AccountName") || this.get("AccountOfContactName");
					return name;
				},

				/**
				 * Open contact card.
				 */
				openContactCard: function() {
					this.openNotificationEntityCard("Contact", this.getContactId());
				},

				/**
				 * Open account card.
				 */
				openAccountCard: function() {
					this.openNotificationEntityCard("Account", this.getAccountId());
				},

				/**
				 * Returns flag of filled contact.
				 * @private
				 * @return {Boolean} True if contact filled.
				 */
				getIsContactFilled: function() {
					return !this.Ext.isEmpty(this.get("ContactId"));
				},

				/**
				 * Returns flag of filled contact and account.
				 * @private
				 * @return {Boolean} True if contact and account filled.
				 */
				getIsAccountAndContactFilled: function() {
					return this.getIsContactFilled() && this.getIsAccountFilled();
				},

				/**
				 * Returns flag of filled account.
				 * @private
				 * @return {Boolean} True if account filled.
				 */
				getIsAccountFilled: function() {
					return !this.Ext.isEmpty(this.getAccountId());
				},

				/**
				 * Creates activity.
				 * @private
				 */
				createActivity: function() {
					var schemaName = "Activity";
					var moduleStructure = this.Terrasoft.ModuleUtils.getModuleStructureByName(schemaName);
					var defaultValues = this.getDefaultValuesForNewActivity();
					var historyState = this.sandbox.publish("GetHistoryState");
					var config = {
						sandbox: this.sandbox,
						schemaName: moduleStructure.cardSchema,
						entitySchemaName: moduleStructure.entitySchemaName,
						primaryColumnValue: this.Terrasoft.GUID_EMPTY,
						operation: ConfigurationEnums.CardStateV2.ADD,
						historyState: historyState,
						typeId: ConfigurationConstants.Activity.Type.Task,
						defaultValues: defaultValues,
						renderTo: "centerPanel"
					};
					this.openCardInChain(config);
				},

				/**
				 * Returns list of default values for new activity.
				 * @virtual
				 * @protected
				 * @return {Array} List of default values.
				 */
				getDefaultValuesForNewActivity: function() {
					var account = this.getAccountId();
					var contact = this.getContactId();
					var title = this.activityTitle || "";
					var defaultValues = [{
						name: ["Title"],
						value: [title]
					}];
					if (!this.Ext.isEmpty(account)) {
						defaultValues.push({
							name: "Account",
							value: account
						});
					}
					if (!this.Ext.isEmpty(contact)) {
						defaultValues.push({
							name: "Contact",
							value: contact
						});
					}
					return defaultValues;
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "NotificationItemContainer",
					"parentName": "Notification",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["anniversary-notification-item-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemTopContainer",
					"parentName": "NotificationItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["anniversary-notification-item-top-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationContactLink",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "ContactName"},
						"click": {"bindTo": "openContactCard"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "SubjectId",
							"referenceSchemaName": "Contact"
						},
						"classes": {"hyperlinkClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationSubjectDelimiter",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SubjectDelimiter"},
						"visible": {"bindTo": "getIsAccountAndContactFilled"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationAccountLink",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "getAccountName"},
						"click": {"bindTo": "openAccountCard"},
						"visible": {"bindTo": "getIsAccountFilled"},
						"linkMouseOver": {"bindTo": "linkMouseOver"},
						"tag": {
							"columnName": "SubjectId",
							"referenceSchemaName": "Account"
						},
						"classes": {"hyperlinkClass": ["subject-text-labelClass", "label-link", "label-url"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemBottomContainer",
					"parentName": "NotificationItemContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["anniversary-notification-item-bottom-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationSubject",
					"parentName": "NotificationItemBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationSubjectCaption"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationCreateActivity",
					"parentName": "NotificationItemBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": [{
								"caption": {"bindTo": "Resources.Strings.CreateActivity"},
								"click": {"bindTo": "createActivity"}
							}]
						},
						"classes": {"wrapperClass": ["notificationActionButtonWrap-class"]}
					}
				}
			]
		};
	});


