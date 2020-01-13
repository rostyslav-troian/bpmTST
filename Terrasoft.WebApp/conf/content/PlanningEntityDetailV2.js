Terrasoft.configuration.Structures["PlanningEntityDetailV2"] = {innerHierarchyStack: ["PlanningEntityDetailV2"], structureParent: "BaseGridDetailV2"};
define('PlanningEntityDetailV2Structure', ['PlanningEntityDetailV2Resources'], function(resources) {return {schemaUId:'4cf69772-1a3f-425b-8cbb-8c36601abe86',schemaCaption: "Detail for activity planning on the basis of the object.", parentSchemaName: "BaseGridDetailV2", schemaName:'PlanningEntityDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PlanningEntityDetailV2", [],
		function() {
			return {
				messages: {
					/**
					 * @message DropResult
					 * Returns drop result.
					 * @return {Object} Drop result.
					 */
					"DropResult": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message UpdatePlaningDetailFilter
					 * Message handler filter events in detail.
					 */
					"UpdatePlaningDetailFilter": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GetSectionFilters
					 * Returns seleted filters.
					 * @return {Object} Filters of section.
					 */
					"GetSectionFilters": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetGridSettingsInfo
					 * Returns informations of grid settings.
					 * @return {Object} informations of grid settings.
					 */
					"GetGridSettingsInfo": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message GridSettingsChanged
					 * Informs about changing grid settings.
					 */
					"GridSettingsChanged": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message PushHistoryState
					 * Notification that the history state has been changed.
					 */
					"PushHistoryState": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetHistoryState
					 * Publishing message for HistoryState request.
					 */
					"GetHistoryState": {
						"mode": this.Terrasoft.MessageMode.PTP,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					},
					"GetDetailInfo": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					/**
					 * Last selected time drop-zone.
					 */
					"LastSelectedTimeDropZone": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Last selected date drop-zone.
					 */
					"LastSelectedDateDropZone": {
						dataValueType: Terrasoft.DataValueType.TEXT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Component of scheduler edit.
					 */
					"SchedulerEditComponent": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Component of scheduler item.
					 */
					"SchedulerItemComponent": {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				properties: {
					/**
					 * Day constant.
					 */
					day: "day",

					/**
					 * Time constant.
					 */
					time: "time",

					/**
					 * Row count constant.
					 */
					rowCount: 15
				},
				methods: {
					/**
					 * @inheritdoc BaseGridDetailV2#init
					 * @overridden
					 */
					init: function() {
						this.set("RowCount", this.rowCount);
						this.set("Filter", this.Ext.create("Terrasoft.FilterGroup"));
						this.callParent(arguments);
						this.initComponents();
						this.subscribeMessages();
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getIsCardValid
					 * @overridden
					 */
					getIsCardValid: function() {
						return true;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
					 * @overridden
					 */
					initDetailOptions: function() {
						this.callParent(arguments);
						this.set("IsDetailCollapsed", false);
					},

					/**
					 * Subscribes messages.
					 * @private
					 */
					subscribeMessages: function() {
						this.sandbox.subscribe("UpdatePlaningDetailFilter", this.onUpdatePlaningDetailFilter, this);
					},

					/**
					 * Handles response from server after updating email template.
					 * @protected
					 * @param {Object} filterItem Filter element.
					 * @param {String} filterItem.key Filter key.
					 * @param {Terrasoft.FilterGroup} filterItem.filters Filter group.
					 * @param {Object} filterItem.filtersValue Filter value.
					 */
					onUpdatePlaningDetailFilter: function(filterItem) {
						this.onFilterUpdate(filterItem.key, filterItem.filters, filterItem.filtersValue);
					},

					/**
					 * Returns profile key.
					 * @override
					 * @return {String} Key.
					 */
					getProfileKey: function() {
						return [this.name, this.entitySchemaName].join("_");
					},

					/**
					 * @inheritdoc GridUtilitiesV2#onFilterUpdate
					 * @override
					 */
					onFilterUpdate: function(filterKey, filterItem, filtersValue) {
						var args = arguments;
						var filters = this.get("DetailFilters");
						if (!this.Ext.isEmpty(filterKey) && this.Ext.isEmpty(filtersValue)) {
							if (filters.find(filterKey)) {
								filters.remove(filters.get(filterKey));
							}
							args = [];
						}
						this.callParent(args);
					},

					/**
					 * @inheritdoc GridUtilitiesV2#getFilters
					 * @overridden
					 */
					getFilters: function() {
						var filters = this.sandbox.publish("GetSectionFilters");
						if (!this.Ext.isEmpty(filters.filtersValue)) {
							this.setFilter(filters.key, filters.filtersValue);
						}
						return this.callParent(arguments);
					},

					/**
					 * Initialize components.
					 * @protected
					 */
					initComponents: function() {
						var itemComponent = this.Ext.create("Terrasoft.ScheduleItem");
						var editComponent = this.Ext.getCmp("ActivitySectionV2Scheduler");
						this.set("SchedulerItemComponent", itemComponent);
						this.set("SchedulerEditComponent", editComponent);
					},

					/**
					 * Returns sign of last selected drop-zone.
					 * @param {String} dropZoneId Identifier of drop-zone.
					 * @return {Boolean} Sign of last selected drop-zone.
					 */
					isLastSelectedDropZone: function(dropZoneId) {
						var lastSelectedTimeDropZone = this.get("LastSelectedTimeDropZone");
						var lastSelectedDateDropZone = this.get("LastSelectedDateDropZone");
						if (this.getIsExistNameInDropZone(dropZoneId, this.day)) {
							return (lastSelectedDateDropZone === dropZoneId && lastSelectedTimeDropZone);
						}
						if (this.getIsExistNameInDropZone(dropZoneId, this.time)) {
							return (lastSelectedTimeDropZone === dropZoneId && lastSelectedDateDropZone);
						}
					},

					/**
					 * Sets selected drop-zone.
					 * @param {String} dropZoneId Identifier of drop-zone.
					 */
					setSelectedDropZone: function(dropZoneId) {
						if (this.getIsExistNameInDropZone(dropZoneId, this.day)) {
							this.set("LastSelectedDateDropZone", dropZoneId);
						}
						if (this.getIsExistNameInDropZone(dropZoneId, this.time)) {
							this.set("LastSelectedTimeDropZone", dropZoneId);
						}
					},

					/**
					 * Returns flag that indicates drop zone.
					 * @param {String} dropZoneId Identifier of drop-zone.
					 * @param {String} name Find name.
					 * @return {Boolean} Sign of drop-zone.
					 */
					getIsExistNameInDropZone: function(dropZoneId, name) {
						return dropZoneId.indexOf(name) > -1;
					},

					/**
					 * Handles when drag-element over drop-zone.
					 * @param {Event} event Mouse event.
					 * @param {String} dropZoneId Identifier of drop-zone.
					 */
					onDragOver: function(event, dropZoneId) {
						if (!this.isLastSelectedDropZone(dropZoneId)) {
							this.setSelectedDropZone(dropZoneId);
							var schedulerEditComponent = this.get("SchedulerEditComponent");
							if (schedulerEditComponent.onMouseDown) {
								schedulerEditComponent.onMouseDown(event);
							}
						}
					},

					/**
					 * Returns drop zone date.
					 * @param {Event} event Mouse event.
					 * @return {Date} Drop zone date.
					 */
					getDropZoneDate: function(event) {
						var x = event.getX();
						var y = event.getY();
						var days = this.Ext.dd.DragDropManager.ids.day;
						var times = this.Ext.dd.DragDropManager.ids.time;
						var schedulerItemComponent = this.get("SchedulerItemComponent");
						var date = schedulerItemComponent.ddItemOverride.pointInsideDays([x, y], days);
						var time = schedulerItemComponent.ddItemOverride.pointInsideTimes([x, y], times);
						return new Date(date.year, date.month, date.day, time.hour, time.minute);
					},

					/**
					 * Handles when drag-element drop on drop-zone.
					 * @param {Event} event Mouse event.
					 * @param {String} dropZoneId Identifier of drop-zone.
					 * @param {Object} item Datas of drag-element.
					 */
					onDragDrop: function(event, dropZoneId, item) {
						if (!this.isLastSelectedDropZone(dropZoneId)) {
							this.setSelectedDropZone(dropZoneId);
							return;
						}
						this.set("LastSelectedTimeDropZone", null);
						this.set("LastSelectedDateDropZone", null);
						var dateObject = this.getDropZoneDate(event);
						this.publishDropResult(item, dateObject);
					},

					/**
					 * Publishes message of drop result.
					 * @param {Object} item Data of drag-element.
					 * @param {Date} dateObject Drop zone date
					 */
					publishDropResult: function(item, dateObject) {
						var config = {
							data: [
								{
									value: item.get("Id"),
									displayValue: item.get("Name")
								}
							],
							entitySchemaName: this.entitySchemaName,
							date: dateObject
						};
						this.sandbox.publish("DropResult", config);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
					 * @overridden
					 */
					getCopyRecordMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
					 * @overridden
					 */
					getEditRecordMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
					 * @overridden
					 */
					getDeleteRecordMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
					 * @overridden
					 */
					getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
					 * @overridden
					 */
					addDetailWizardMenuItems: this.Terrasoft.emptyFn
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"dragActionsCode": 1,
							"dragDropGroupName": ["time-item", "day-item"],
							"showDropZoneHint": true,
							"isTarget": true,
							"dragOver": {"bindTo": "onDragOver"},
							"dragDrop": {"bindTo": "onDragDrop"}
						}
					},
					{
						"operation": "merge",
						"name": "AddRecordButton",
						"values": {"visible": false}
					},
					{
						"operation": "merge",
						"name": "AddTypedRecordButton",
						"values": {"visible": false}
					},
					{
						"operation": "merge",
						"name": "Detail",
						"values": {"caption": ""}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


