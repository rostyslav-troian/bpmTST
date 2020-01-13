Terrasoft.configuration.Structures["VisaNotificationsSchema"] = {innerHierarchyStack: ["VisaNotificationsSchema"], structureParent: "BaseNotificationsSchema"};
define('VisaNotificationsSchemaStructure', ['VisaNotificationsSchemaResources'], function(resources) {return {schemaUId:'4ab87a94-9a8d-450c-8d3f-7f4b910c8d0d',schemaCaption: "Visa schema of notifications", parentSchemaName: "BaseNotificationsSchema", schemaName:'VisaNotificationsSchema',parentSchemaUId:'362d1b69-b8e7-442d-8d48-f701591b493a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseNotificationsSchema
 */
define("VisaNotificationsSchema", ["VisaNotificationsSchemaResources", "ConfigurationConstants", "VisaHelper"],
	function(resources, ConfigurationConstants, VisaHelper) {
		return {
			attributes: {
				/**
				 * Visa actions button menu items.
				 */
				"VisaActionButtonMenu": {
					"dataValueType": this.Terrasoft.DataValueType.COLLECTION,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": this.Ext.create("Terrasoft.BaseViewModelCollection")
				},

				/**
				 * Pageable row count.
				 */
				"PageableRowCount": {
					"dataValueType": this.Terrasoft.DataValueType.NUMBER,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 15
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this._initVisaActionButtonMenu();
				},

				/**
				 * Initializes and returns visa actions button menu items.
				 * @private
				 * @return {Terrasoft.BaseViewModelCollection}
				 */
				_initVisaActionButtonMenu: function() {
					var menu = this.get("VisaActionButtonMenu");
					var collection = Ext.create("Terrasoft.BaseViewModelCollection");
					collection.add(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.ApproveMenuItemCaption"},
						Click: {"bindTo": "approve"},
						ImageConfig: this.get("Resources.Images.Approve")
					}));
					collection.add(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.RejectMenuItemCaption"},
						Click: {"bindTo": "reject"},
						ImageConfig: this.get("Resources.Images.Reject")
					}));
					collection.add(this.getButtonMenuSeparator());
					collection.add(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.ChangeVizierCaption"},
						Click: {"bindTo": "changeVizier"},
						ImageConfig: this.get("Resources.Images.ChangeVizier")
					}));
					menu.clear();
					menu.loadAll(collection);
					return menu;
				},

				/**
				 * Returns type of notifications.
				 * @protected
				 * @return {Guid} Type of notifications.
				 */
				getNotificationType: function() {
					return ConfigurationConstants.Reminding.Visa;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationGroup
				 * @overridden
				 */
				getNotificationGroup: function() {
					return ConfigurationConstants.NotificationGroup.Visa;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#loadNotifications
				 * @overridden
				 */
				loadNotifications: function(isLoadNew, callback, scope) {
					var config = this.getDataServiceConfig();
					this.callService(config, function(responseObject) {
						this._onLoadCollection(responseObject);
						this.Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Returns configuration object for the data service.
				 * @return {Object} Data service config.
				 * @private
				 */
				getDataServiceConfig: function() {
					var notifications = this.get("Notifications");
					var rowCount = notifications.getCount() + this.get("PageableRowCount");
					return {
						serviceName: "VisaDataService",
						methodName: "GetVisaEntities",
						data: {
							sysAdminUnitId: this.Terrasoft.SysValue.CURRENT_USER.value,
							requestOptions: {
								isPageable: true,
								rowCount: rowCount
							}
						}
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#loadNotification
				 * @overridden
				 */
				loadNotification: function() {
					var config = this.getDataServiceConfig();
					this.callService(config, function(responseObject) {
						var response = this._parseDataServiceResponse(responseObject);
						var items = this.getViewModelCollection(response);
						var notifications = this.get("Notifications");
						this.addItemsToNotificationsCollection(notifications, items);
					}, this);
				},

				/**
				 * Callback for the visa service collection query.
				 * @param {Object} responseObject Service response.
				 * @private
				 */
				_onLoadCollection: function(responseObject) {
					var response = this._parseDataServiceResponse(responseObject);
					var notifications = this.get("Notifications");
					notifications.clear();
					var items = this.getViewModelCollection(response);
					notifications.loadAll(items);
				},

				/**
				 * Removes exists notification items from server.
				 * @private
				 * @deprecated Will be removed after 7.12.2.
				 * @param {Terrasoft.Collection} responseItems Collection of notifications from server.
				 */
				_removeExistingResponseItems: function(responseItems) {
					var notifications = this.get("Notifications");
					responseItems.each(function(item) {
						var key = item.get("Id");
						if (notifications.contains(key)) {
							responseItems.remove(item);
						}
					}, this);
				},

				/**
				 * Parses server data service response object.
				 * @private
				 * @param {Object} responseObject Service response.
				 * @return {Object}
				 */
				_parseDataServiceResponse: function(responseObject) {
					var response = this.Terrasoft.decode(responseObject.GetVisaEntitiesResult);
					var result = this.responseAdapter(response);
					return result;
				},

				/**
				 * Adapts old service response for the collection.
				 * @param {Object} response Service response.
				 * @return {Object} Adapted service response.
				 * @private
				 */
				responseAdapter: function(response) {
					this.Terrasoft.each(response.rows, function(item) {
						item.SubjectCaption = item.Title;
						item.RemindTime = item.CreatedOn;
						item.SubjectId = item.VisaObjectId;
					});
					return response;
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationEntity
				 * @overridden
				 */
				getNotificationEntity: function() {
					return this.get("VisaSchemaCaption");
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationDate
				 * @overridden
				 */
				getNotificationDate: function() {
					const createdOn = this.get("ModifiedOn");
					if (createdOn) {
						return Terrasoft.getTypedStringValue(new Date(createdOn), Terrasoft.DataValueType.DATE_TIME);
					}
					return Terrasoft.emptyString;
				},

				/**
				 * Returns view model for the items collection.
				 * @param {Object} response View model configuration object.
				 * @return {Terrasoft.BaseViewModelCollection} Collection view model.
				 * @private
				 */
				getViewModelCollection: function(response) {
					var rowConfig = response.rowConfig;
					var viewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection", {
						rowConfig: rowConfig
					});
					this.addItemsToCollection(viewModelCollection, response.rows, rowConfig);
					return viewModelCollection;
				},

				/**
				 * Add items to the view model collection.
				 * @param {Terrasoft.BaseViewModelCollection} viewModelCollection View model collection.
				 * @param {Array} items Items for the view model collection.
				 * @param {Object} rowConfig Configuration object for the item.
				 * @private
				 */
				addItemsToCollection: function(viewModelCollection, items, rowConfig) {
					this.Terrasoft.each(items, function(item) {
						var viewModel = this.getItemViewModel({
							rawData: item,
							rowConfig: rowConfig
						});
						var key = viewModel.get(viewModel.primaryColumnName);
						viewModelCollection.addIfNotExists(key, viewModel);
					}, this);
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#setConditionalValueParameters
				 * @overridden
				 */
				setConditionalValueParameters: function(config) {
					var lastRecord = config.lastRecord;
					config.conditionalValues.setParameterValue("ModifiedOn", lastRecord.get("ModifiedOn"),
						this.getDataValueType(lastRecord, "ModifiedOn"));
				},

				/**
				 * Handler for the approve visa.
				 * @private
				 */
				approve: function() {
					this.getVisaEntity(function(result) {
						VisaHelper.approveAction(result, function() {
							this.removeVisaFromCollection();
						}, this);
					});
				},

				/**
				 * Handler for the reject visa.
				 * @private
				 */
				reject: function() {
					this.getVisaEntity(function(result) {
						VisaHelper.rejectAction(result, function() {
							this.removeVisaFromCollection();
						}, this);
					});
				},

				/**
				 * Removes visa from items collection.
				 * @private
				 */
				removeVisaFromCollection: function() {
					this.deleteVisaItem();
					this.publishUpdateCounters();
				},

				/**
				 * Handler for the change vizier.
				 * @private
				 */
				changeVizier: function() {
					var visaEntityName = this.getVisaEntityName();
					VisaHelper.changeVizierAction(this.get("Id"), visaEntityName, this.sandbox, null, function(result) {
						if (result) {
							this.loadNotifications.call(this.parentViewModel);
							this.publishUpdateCounters();
						}
					}, this);
				},

				/**
				 * Returns in callback visa entity.
				 * @param {Function} callback Callback function.
				 * @private
				 */
				getVisaEntity: function(callback) {
					var visaEntityName = this.getVisaEntityName();
					this.getEntitySchemaByName(visaEntityName, function(schema) {
						var id = this.get("Id");
						var select = this.getEntityVisaSelect(schema);
						select.getEntity(id, function(result) {
							if (result.success) {
								callback.call(this, result.entity);
							}
						}, this);
					}.bind(this));
				},

				/**
				 * Returns visa entity name.
				 * @return {String} Visa entity name.
				 * @private
				 */
				getVisaEntityName: function() {
					var schemaName = this.get("SchemaName");
					var moduleStructure = this.Terrasoft.ModuleUtils.getModuleStructureByName(schemaName) || {};
					var visaSchemaName = moduleStructure.visaSchemaName
						? moduleStructure.visaSchemaName
						: schemaName + "Visa";
					return visaSchemaName;
				},

				/**
				 * Returns entity schema query for the visa entity.
				 * @param {String} schema Schema name.
				 * @return {Terrasoft.EntitySchemaQuery} Entity schema query for the visa entity.
				 * @private
				 */
				getEntityVisaSelect: function(schema) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchema: schema
					});
					select.addColumn("Id");
					select.addColumn("Status");
					select.addColumn("Comment");
					select.addColumn("SetDate");
					select.addColumn("SetBy");
					return select;
				},

				/**
				 * Removes visa from items collection.
				 * @private
				 */
				deleteVisaItem: function() {
					var id = this.get("Id");
					this.removeNotification.call(this.parentViewModel, id);
				},

				/**
				 * Selects current notification item.
				 * @protected
				 */
				selectNotificationItemOnActionButtonClick: function() {
					this.parentViewModel.set("ActiveItem", this.get("Id"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseNotificationsSchema#getNotificationImage
				 * @overridden
				 */
				getNotificationImage: function() {
					var config;
					var schemaName = this.get("SchemaName");
					var module = this.Terrasoft.ModuleUtils.getModuleStructureByName(schemaName);
					if (module && module.imageId) {
						config = {
							source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
							params: {
								schemaName: "SysImage",
								columnName: "Data",
								primaryColumnValue: module.imageId
							}
						};
					} else {
						config = this.get("Resources.Images.DefaultImage");
					}
					return this.Terrasoft.ImageUrlBuilder.getUrl(config);
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "NotificationsContainer",
					"values": {
						"observableRowNumber": 2
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemContainer",
					"parentName": "Notification",
					"propertyName": "items",
					"values": {
						"id": "notificationItemContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#notificationItemContainer"
						},
						"wrapClass": ["visa-notification-item-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemTopContainer",
					"parentName": "NotificationItemContainer",
					"propertyName": "items",
					"values": {
						"id": "notificationItemTopContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#notificationItemTopContainer"
						},
						"wrapClass": ["visa-notification-item-top-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationImage",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getNotificationImage",
						"onPhotoChange": Terrasoft.emptyFn,
						"readonly": true,
						"classes": {
							"wrapClass": [
								"visa-notification-icon-class",
								"sectionPanelBackgroundColor"
							]
						},
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
					}
				},
				{
					"operation": "insert",
					"name": "NotificationDate",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationDate"},
						"classes": {"labelClass": ["subject-text-labelClass"]}
					}
				},
				{
					"operation": "insert",
					"name": "VisaActionButton",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {"wrapperClass": ["visaActionButtonWrap-class"]},
						"caption": {"bindTo": "Resources.Strings.VisaActionButton"},
						"prepareMenu": {"bindTo": "selectNotificationItemOnActionButtonClick"},
						"menu": {
							"items": {"bindTo": "VisaActionButtonMenu"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemMiddleContainer",
					"parentName": "NotificationItemTopContainer",
					"propertyName": "items",
					"values": {
						"id": "notificationItemMiddleContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#notificationItemMiddleContainer"
						},
						"wrapClass": ["visa-notification-item-middle-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationEntity",
					"parentName": "NotificationItemMiddleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationEntity"},
						"classes": {"labelClass": ["subject-text-labelClass", "visa-notification-item-middle"]}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationItemBottomContainer",
					"parentName": "NotificationItemContainer",
					"propertyName": "items",
					"values": {
						"id": "notificationItemBottomContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"selectors": {
							"wrapEl": "#notificationItemBottomContainer"
						},
						"wrapClass": ["visa-notification-item-bottom-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "NotificationSubjectCaption",
					"parentName": "NotificationItemMiddleContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getNotificationSubjectCaption"},
						"click": {"bindTo": "onNotificationSubjectClick"},
						"classes": {
							"labelClass": [
								"subject-text-labelClass",
								"label-link",
								"label-url",
								"visa-notification-item-middle"
							]
						},
						"canExecute": {"bindTo": "canBeDestroyed"}
					}
				},
				{
					"operation": "insert",
					"name": "NotificationObjective",
					"parentName": "NotificationItemBottomContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Objective"}
					}
				}
			]
		};
	});


