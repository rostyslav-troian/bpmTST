Terrasoft.configuration.Structures["ProcessDashboardSchema"] = {innerHierarchyStack: ["ProcessDashboardSchema"], structureParent: "BaseNotificationsSchema"};
define('ProcessDashboardSchemaStructure', ['ProcessDashboardSchemaResources'], function(resources) {return {schemaUId:'b3e31efd-a3cf-4f03-90bd-ad8ee156b799',schemaCaption: "ProcessDashboardSchema", parentSchemaName: "BaseNotificationsSchema", schemaName:'ProcessDashboardSchema',parentSchemaUId:'362d1b69-b8e7-442d-8d48-f701591b493a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent BaseNotificationSchema
 */
define("ProcessDashboardSchema",
	[
		"ProcessDashboardSchemaResources",
		"ConfigurationConstants",
		"RemindingsUtilities",
		"FormatUtils",
		"DesktopPopupNotification",
		"DcmElementSchemaManager",
		"EmptyGridMessageConfigBuilder",
		"QuickFilterModuleV2",
		"css!ProcessDashboardModule"
	],
	function(resources, ConfigurationConstants, RemindingsUtilities, FormatUtils, DesktopNotification) {
		return {
			entitySchemaName: "SysProcessElementToDo",
			messages: {
				/**
				 * @message ProcessDashboardCounterChanged
				 * Updates new items count in process dashboard panel.
				 */
				"ProcessDashboardCounterChanged": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message CommunicationPanelItemSelected
				 * Notify about change selected right panel item.
				 */
				"CommunicationPanelItemSelected": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * Flag that indicates when to show future tasks.
				 */
				"FutureTaskFilter": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"caption": resources.localizableStrings.FutureTaskFilter,
					"value": false
				},
				/**
				 * Count of today notifications.
				 */
				"Counter": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"value": 0
				},

				/**
				 * Desktop notification timeout.
				 */
				"DesktopNotificationTimeout": {
					"dataValueType": this.Terrasoft.DataValueType.INTEGER,
					"value": 5000
				},

				/**
				 * The maximum value of the counter to display.
				 * @type {Number}
				 */
				"MaxCounter": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"value": 99
				}
			},
			methods: {

				// region Methods: Private

				/**
				 * Handles when web-socket message received.
				 * @private
				 * @param {Object} scope Current view model.
				 * @param {Object} response Response object.
				 */
				_onServerMessageReceived: function(scope, response) {
					if (response && response.Header.Sender === "ProcessDashboard") {
						var item = Ext.decode(response.Body);
						switch (item.operation) {
							case "update":
								this._onServerUpdateMessageReceived(item.recordId);
								break;
							case "delete":
								this._onServerDeleteMessageReceived(item.recordId);
								break;
							default:
								throw new Terrasoft.UnsupportedTypeException();
						}
					}
				},

				/**
				 * Shows notification and updates counter.
				 * @private
				 * @param {Object} item Notification item.
				 * @param {Boolean} isExistingItem Flag tat indicates existing item.
				 */
				_showNotification: function(item, isExistingItem) {
					var startDate = item.get("StartDate");
					var config = this._getDesktopNotificationConfig(item);
					var counter = this.get("Counter");
					if (startDate < Terrasoft.endOfToday()) {
						counter += 1;
						DesktopNotification.show(config);
					} else {
						if (isExistingItem) {
							counter -= 1;
						}
						if (this.get("FutureTaskFilter")) {
							DesktopNotification.show(config);
						}
					}
					this._updateCounter(counter);
				},

				/**
				 * Handles when "update" web-socket message received.
				 * @private
				 * @param {String} recordId Record identifier.
				 * @param {Function} callback The callback function.
				 * @param {Object} scope The callback execution context.
				 */
				_onServerUpdateMessageReceived: function(recordId, callback, scope) {
					var notifications = this.get("Notifications");
					var isExistingItem = notifications.contains(recordId);
					this.loadNotification(recordId, function(response) {
						var notification = response.collection.first();
						if (notification) {
							this._showNotification(notification, isExistingItem);
						} else {
							this._onServerDeleteMessageReceived(recordId);
						}
						Ext.callback(callback, scope, [response]);
					}, this);
				},

				/**
				 * Handles when "delete" web-socket message received.
				 * @private
				 * @param {String} recordId Record identifier.
				 */
				_onServerDeleteMessageReceived: function(recordId) {
					var notification = this._removeNotification(recordId);
					if (notification) {
						var startDate = notification.get("StartDate");
						if (startDate < Terrasoft.endOfToday()) {
							var counter = this.get("Counter") - 1;
							this._updateCounter(counter);
						}
					}
				},

				/**
				 * Returns unprocessed notifications count select.
				 * @private
				 * @return {Terrasoft.data.queries.EntitySchemaQuery}
				 */
				_getCountersSelect: function() {
					var esq = new Terrasoft.EntitySchemaQuery();
					esq.rootSchemaName = this.entitySchemaName;
					esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "Counter");
					var group = this.Ext.create("Terrasoft.FilterGroup");
					group.add("Contact", this._createContactFilter());
					group.add("StartDate", this._createStartDateFilter());
					esq.filters.add(group);
					return esq;
				},

				/**
				 * Initializes "FutureTaskFilter" attribute from user profile.
				 * @private
				 * @param {Function} [callback] The callback function.
				 * @param {Object} [scope] The callback execution context.
				 */
				_initFutureTaskFilterFromUserProfile: function(callback, scope) {
					var profile = this.getProfile();
					var value = profile.FutureTaskFilter;
					if (Ext.isDefined(value)) {
						this.set("FutureTaskFilter", value);
					}
					this.on("change:FutureTaskFilter", this._onFutureTaskFilterChange, this);
					Ext.callback(callback, scope);
				},

				/**
				 * Handles future task filter changes.
				 * @private
				 */
				_onFutureTaskFilterChange: function() {
					this._saveFutureTaskFilterInUserProfile();
					this._reloadNotifications();
				},

				/**
				 * Shows mask above the notifications container.
				 * @private
				 * @return {String} Mask identifier.
				 */
				_showMask: function() {
					var maskId = this.Terrasoft.Mask.show({
						selector: ".process-notifications-container",
						timeout: 0,
						opacity: 1
					});
					return maskId;
				},

				/**
				 * Reloads notifications and counter.
				 * @private
				 */
				_reloadNotifications: function(callback, scope) {
					var maskId = this._showMask();
					this._loadCounters(function() {
						this.loadNotifications(true, function() {
							this.Terrasoft.Mask.hide(maskId);
							Ext.callback(callback, scope);
						}, this);
					}, this);
				},

				/**
				 * Saves filter in user profile.
				 * @private
				 */
				_saveFutureTaskFilterInUserProfile: function() {
					var profile = this.get("Profile");
					var key = this.getProfileKey();
					profile.FutureTaskFilter = this.get("FutureTaskFilter");
					Terrasoft.utils.saveUserProfile(key, profile, false);
				},

				/**
				 * Returns desktop notification config.
				 * @private
				 * @param {Terrasoft.Entity} notification Notification.
				 */
				_getDesktopNotificationConfig: function(notification) {
					return {
						id: notification.get("Id"),
						title: notification.get("Title"),
						body: notification.get("Subject"),
						icon: this._getIcon(notification),
						onClick: this.onDesktopNotificationClick,
						ignorePageVisibility: true,
						timeout: this.get("DesktopNotificationTimeout"),
						scope: this
					};
				},

				/**
				 * Removes notification by record identifier.
				 * @private
				 * @param {Striong} recordId Notification identifier.
				 * @return {Object} Removed notification.
				 */
				_removeNotification: function(recordId) {
					var notifications = this.get("Notifications");
					return notifications.removeByKey(recordId);
				},

				/**
				 * Returns process user task image config.
				 * @private
				 * @param {String} schemaName User task schema name.
				 * @param {String} imageName Image name.
				 * @return {Object} Image config.
				 */
				_getImageConfig: function(schemaName, imageName) {
					return {
						source: Terrasoft.ImageSources.PROCESS_USERTASK_SCHEMA,
						params: {
							resourceItemName: imageName,
							schemaName: schemaName
						}
					};
				},

				/**
				 * Updates unprocessed notifications counter.
				 * @private
				 * @param {Number} counter Notifications count.
				 */
				_updateCounter: function(counter) {
					counter = Math.max(counter, 0);
					this.set("Counter", counter);
					var maxCounter = this.get("MaxCounter");
					counter = counter > maxCounter
						? maxCounter + "+"
						: counter;
					this.sandbox.publish("ProcessDashboardCounterChanged", counter || "");
				},

				/**
				 * Adds current entity schema columns to select
				 * @param {Terrasoft.EntitySchemaQuery} select
				 * @private
				 */
				_addColumns: function(select) {
					select.addColumn("Id");
					select.addColumn("ContactId");
					select.addColumn("Title");
					select.addColumn("Subject");
					select.addColumn("[SysSchema:UId:ElementSchemaUId].Name", "SchemaName");
					select.addColumn("StartDate");
				},

				/**
				 * Returns image url by specified user task schema name and image name.
				 * @private
				 * @param {String} schemaName User task schema name.
				 * @param {String} imageName Image name.
				 * @return {String}
				 */
				_getImage: function(schemaName, imageName) {
					var imageConfig = schemaName
						? this._getImageConfig(schemaName, imageName)
						: this.get("Resources.Images.Default");
					return this.Terrasoft.ImageUrlBuilder.getUrl(imageConfig);
				},

				/**
				 * Returns desktop notification *.png icon url.
				 * @private
				 * @param {Object} notification Notification.
				 * @return {String}
				 */
				_getIcon: function(notification) {
					var schemaName = notification.get("SchemaName");
					return this._getImage(schemaName, "NotificationImage.png");
				},

				/**
				 * Sets "StartDate" column order.
				 * @private
				 * @param {Terrasoft.EntitySchemaQuery} select Select query.
				 */
				_setOrderByStartDate: function(select) {
					var startDate = select.columns.get("StartDate");
					startDate.orderDirection = this.Terrasoft.OrderDirection.DESC;
				},

				/**
				 * Returns start date less or equal to current end day filter
				 * @private
				 * @return {Terrasoft.data.filters.CompareFilter}
				 */
				_createStartDateFilter: function() {
					return Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.LESS_OR_EQUAL, "StartDate", Terrasoft.endOfToday());
				},

				/**
				 * Returns current contact filter.
				 * @private
				 * @return {Terrasoft.data.filters.CompareFilter}
				 */
				_createContactFilter: function() {
					return Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "ContactId", Terrasoft.SysValue.CURRENT_USER_CONTACT.value);
				},

				/**
				 * Publishes "ProcessExecDataChanged" message.
				 * @private
				 * @param {String} processElementId Process element identifier.
				 */
				_onProcessExecDataChanged: function(processElementId) {
					this.sandbox.publish("ProcessExecDataChanged", {
						procElUId: processElementId
					});
				},

				/**
				 * Handles when web-socket channel opened. Reloads counter and notifications.
				 * @private
				 */
				_onServerChannelInitialized: function() {
					this._reloadNotifications();
				},

				/**
				 * Subscribes on server channels events.
				 * @private
				 */
				_subscribeOnServerChannelEvents: function() {
					this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_CONNECTION_INITIALIZED,
						this._onServerChannelInitialized, this);
					this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE,
						this._onServerMessageReceived, this);
				},

				/**
				 * Loads new notifications
				 * @private
				 * @param {Function} [callback] The callback function.
				 * @param {Object} [scope] The callback execution context.
				 */
				_loadNewNotifications: function(callback, scope) {
					this.loadNotifications(true, callback, scope);
				},

				/**
				 * Loads and display unprocessed today notifications.
				 * @private
				 * @param {Function} [callback] The callback function.
				 * @param {Object} [scope] The callback execution context.
				 */
				_loadCounters: function(callback, scope) {
					var select = this._getCountersSelect();
					select.getEntityCollection(function(response) {
						var collection = response.collection;
						var entity = collection.first();
						if (entity) {
							var counter = entity.get("Counter");
							this._updateCounter(counter);
						}
						Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Handles the panel menu item selection event.
				 * @private
				 * @param {Object} itemConfig Menu item config.
				 */
				_onCommunicationPanelItemSelected: function(itemConfig) {
					if (itemConfig.moduleName === "ProcessDashboardModule") {
						this._reloadNotifications();
					}
				},

				/**
				 * Subscribes on sandbox events.
				 * @private
				 */
				_subscribeOnSandboxEvents: function() {
					this.sandbox.subscribe("CommunicationPanelItemSelected",
						this._onCommunicationPanelItemSelected, this);
				},

				// endregion

				// region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseNotificationSchema#init
				 * @overridden
				 */
				init: function(callback, scope) {
					DesktopNotification.requestPermission();
					this.setDefaultValues(scope);
					Terrasoft.chain(
						this.setEmptyMessageConfig,
						this.initializeProfile,
						this._initFutureTaskFilterFromUserProfile,
						this._loadCounters,
						this._loadNewNotifications,
						function() {
							this._subscribeOnSandboxEvents();
							this._subscribeOnServerChannelEvents();
							callback.call(scope);
						},
						this
					);
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#unSubscribeEvents
				 * @overridden
				 */
				unSubscribeEvents: function() {
					Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this._onServerMessageReceived, this);
					Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_CONNECTION_INITIALIZED,
						this._onServerChannelInitialized, this);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#getProfileKey
				 * @overridden
				 */
				getProfileKey: function() {
					return "ProcessDashboardProfile";
				},

				/**
				 * Returns notification *.svg image url.
				 * @protected
				 * @return {String}
				 */
				getImage: function() {
					var schemaName = this.get("SchemaName");
					return this._getImage(schemaName, "SmallSvgImage.svg");
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#addColumns
				 * @overridden
				 */
				addColumns: function(select) {
					this._addColumns(select);
					this._setOrderByStartDate(select);
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationsSelectFilters
				 * @overridden
				 */
				getNotificationsSelectFilters: function() {
					var filters = Terrasoft.createFilterGroup();
					var showTodayTasks = !this.get("FutureTaskFilter");
					filters.add("Contact", this._createContactFilter());
					if (showTodayTasks) {
						filters.add("StartDate", this._createStartDateFilter());
					}
					return filters;
				},

				/**
				 * Returns notification date and time.
				 * @protected
				 * @return {String} Date and time.
				 */
				getStartDate: function() {
					return FormatUtils.smartFormatDate({
						dateValue: this.get("StartDate"),
						hasTimezoneOffset: true
					});
				},

				/**
				 * Handle process dashboard item click. Shows process element execution page.
				 * @protected
				 */
				onTitleClick: function() {
					var value = this.get("Id");
					this._onProcessExecDataChanged(value);
				},

				/**
				 * Handle desktop notification click. Shows process element execution page.
				 * @protected
				 * @param {Object} event Click event.
				 */
				onDesktopNotificationClick: function(event) {
					window.focus();
					var notification = event.target;
					var value = notification.tag;
					this._onProcessExecDataChanged(value);
				}

				// endregion
			},
			diff: [
				{
					"operation": "insert",
					"name": "FiltersContainer",
					"propertyName": "items",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["process-filters-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "FiltersContainer",
					"propertyName": "items",
					"name": "FilterButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.Filter"},
						"visible": false,
						"classes": {
							"wrapperClass": ["process-filter-button"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "FutureTaskFilter",
					"parentName": "FiltersContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"contentType": this.Terrasoft.ContentType.BOOLEAN
					}
				},
				{
					"operation": "merge",
					"name": "NotificationsContainer",
					"index": 1,
					"values": {
						"observableRowNumber": 2,
						"classes": {
							"wrapClassName": [
								"process-notifications-container",
								"ts-notifications-container",
								"ts-notificationsmodule-container"
							]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ProcessDashboardContainer",
					"parentName": "Notification",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": [
							"process-notification-item-container",
							"reminder-notification-activity-item-container"
						],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ImageContainer",
					"parentName": "ProcessDashboardContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["process-notification-item-image-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "StartDateContainer",
					"parentName": "ProcessDashboardContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["process-notification-item-body-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TitleContainer",
					"parentName": "ProcessDashboardContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["process-notification-item-body-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SubjectContainer",
					"parentName": "ProcessDashboardContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["process-notification-item-body-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ProcessElementImage",
					"parentName": "ImageContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.COMPONENT,
						"className": "Terrasoft.ImageView",
						"imageSrc": {"bindTo": "getImage"},
						"classes": {"wrapClass": ["reminder-notification-icon-class"]}
					}
				},
				{
					"operation": "insert",
					"name": "StartDate",
					"parentName": "StartDateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getStartDate"},
						"classes": {"labelClass": ["subject-text-labelClass, start-date-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "Title",
					"parentName": "TitleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {"bindTo": "Title"},
						"click": {"bindTo": "onTitleClick"},
						"classes": {
							"hyperlinkClass": ["title-text-labelClass"]
						},
						"canExecute": {"bindTo": "canBeDestroyed"}
					}
				},
				{
					"operation": "insert",
					"name": "Subject",
					"parentName": "SubjectContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Subject"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				}
			]
		};
	});


