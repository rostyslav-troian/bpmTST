Terrasoft.configuration.Structures["DayInCalendarMiniPage"] = {innerHierarchyStack: ["DayInCalendarMiniPage"], structureParent: "BaseMiniPage"};
define('DayInCalendarMiniPageStructure', ['DayInCalendarMiniPageResources'], function(resources) {return {schemaUId:'fbe0b266-7efa-4389-a312-acabbfa76cb3',schemaCaption: "Schema of day in calendar mini page", parentSchemaName: "BaseMiniPage", schemaName:'DayInCalendarMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DayInCalendarMiniPage", ["DayInCalendarMiniPageResources", "ViewUtilities", "css!DayInCalendarMiniPageCSS"],
		function(resources, ViewUtilities) {
			return {
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				messages: {
					"OnCardClosingResetFlag": {
						mode: Terrasoft.MessageMode.BROADCAST,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				mixins: {},
				attributes: {
					"IntervalsCollection": {
						"dataValueType": Terrasoft.DataValueType.COLLECTION
					},
					"IsInvalidInterval": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: false
					},
					"InvalidValidationMessage": {
						dataValueType: this.Terrasoft.DataValueType.TEXT
					},
					/**
					 * @inheritdoc BaseMiniPage#MiniPageMods
					 * @overridden
					 */
					"MiniPageModes": {
						"value": [this.Terrasoft.ConfigurationEnums.CardOperation.EDIT]
					},
					/**
					 * Current day of week name.
					 */
					"CurrentDayOfWeek": {
						"value": ""
					},
					"Id": {
						"columnPath": "Id",
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN
					},
					"DayType": {
						"columnPath": "DayType",
						"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN
					}
				},
				methods: {
					/**
					 * @inheritdoc BaseMiniPage#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.initDayOfWeek();
						this.initColumnValues();
						this.initIntervals();
						this.isNew = false;
					},
					/**
					 * @inheritdoc BaseMiniPage#isNotViewMode
					 * @overridden
					 */
					isNotViewMode: function() {
						return false;
					},
					/**
					 * Sets day of week name from DefaultValues.
					 */
					initDayOfWeek: function() {
						var currentDayOfWeek = this.getDefaultValues()[0];
						this.set("CurrentDayOfWeek", currentDayOfWeek);
					},
					initColumnValues: function() {
						var currentDayOfWeek = this.getDefaultValues()[2];
						this.set("DayType", currentDayOfWeek);
						this.set("Id", this.get("PrimaryColumnValue"));
					},
					/**
					 * Initializes intervals.
					 * @protected
					 */
					initIntervals: function() {
						var collection = this.getCollection("IntervalsCollection");
						var values = this.getDefaultValues();
						var intervals = values && values[1] && values[1].intervals;
						if (Ext.isEmpty(values) || !intervals || intervals.length === 0) {
							this.addNewInterval();
							return;
						}
						for (var i = 0; i < intervals.length; i++) {
							var containerItem = this.createIntervalViewModel(true, intervals[i].from, intervals[i].to);
							containerItem.set("Id", intervals[i].id);
							collection.add(containerItem.get("Id"), containerItem);
						}
					},

					/**
					 * @inheritdoc BaseMiniPage#getMiniPageCaption
					 * @overridden
					 */
					getMiniPageCaption: function() {
						var workingHoursCaption = resources.localizableStrings.WorkingHoursCaption;
						workingHoursCaption = this.Ext.String.format(workingHoursCaption, this.get("CurrentDayOfWeek"));
						return workingHoursCaption;
					},

					/**
					 * Creates interval view model.
					 * @protected
					 * @return Interval view model.
					 */
					createIntervalViewModel: function(visible, from, to) {
						var viewModel = Ext.create("Terrasoft.BaseViewModel", {
							values: {
								Id: this.Terrasoft.utils.guid.generateGUID(),
								FromValue: from ? from : null,
								ToValue: to ? to : null,
								Visible: visible,
								ToAdd: false,
								ToUpdate: false,
								ToDelete: false
							}
						});
						viewModel.set("IntervalsCollection", this.getCollection("IntervalsCollection"));
						viewModel.onRemoveIntervalButtonClick = this.onRemoveIntervalButtonClick;
						viewModel.getVisibleIntervalCount = this.getVisibleIntervalCount;
						viewModel.onDateChanged = this.onDateChanged;
						viewModel.getCollection = this.getCollection;
						viewModel.sandbox = this.sandbox;
						viewModel.Terrasoft = this.Terrasoft;
						viewModel.on("change:FromValue", this.onDateChanged, this);
						viewModel.on("change:ToValue", this.onDateChanged, this);
						return viewModel;
					},

					/**
					 * On date changed handler.
					 * Sets interval to update attribute.
					 * @param {Object} result
					 */
					onDateChanged: function(scope) {
						var toAdd = scope.get("ToAdd");
						if (toAdd) {
							return;
						}
						scope.set("ToUpdate", true);
					},

					/**
					 * Adds new working time interval.
					 * @protected
					 */
					addNewInterval: function() {
						var intervalsCollection = this.getCollection("IntervalsCollection");
						var containerItem = this.createIntervalViewModel(true);
						var id = containerItem.get("Id");
						containerItem.set("ToAdd", true);
						intervalsCollection.add(id, containerItem);
					},

					/**
					 * On add interval button click handler.
					 * Adds new working time interval.
					 */
					onAddIntervalButtonClick: function() {
						this.addNewInterval();
					},

					/**
					 * Gets or creates collection by name.
					 * @param {String} collectionName Collection name.
					 * @protected
					 * @return {Terrasoft.BaseViewModelCollection} Collection.
					 */
					getCollection: function(collectionName) {
						var collection = this.get(collectionName);
						if (!collection) {
							collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
							this.set(collectionName, collection);
						}
						return collection;
					},

					/**
					 * On on remove interval button click handler.
					 * Sets interval to delete attribute.
					 * @param {Object} result
					 */
					onRemoveIntervalButtonClick: function() {
						var intervalsCollection = this.getCollection("IntervalsCollection");
						var id = this.get("Id");
						var interval = intervalsCollection.get(id);
						if (this.getVisibleIntervalCount() === 1) {
							interval.set("FromValue", null);
							interval.set("ToValue", null);
							interval.set("ToUpdate", true);
							return;
						}
						interval.set("Visible", false);
						interval.set("ToDelete", true);
					},

					/**
					 * Gets visible working interval count.
					 * @protected
					 * @return {Int} Visible working interval count..
					 */
					getVisibleIntervalCount: function() {
						var intervalsCollection = this.getCollection("IntervalsCollection");
						var count = 0;
						this.Terrasoft.each(intervalsCollection.getItems(), function(item) {
							var visible = item.get("Visible");
							if (visible) {
								count++;
							}
						});
						return count;
					},

					/**
					 * Sets interval item config.
					 * @protected
					 * @param {Object} itemConfig Item config.
					 * @param {Object} item Interval.
					 */
					getIntervalItemConfig: function(itemConfig, item) {
						var config = ViewUtilities.getContainerConfig(
								"interval-item-container", ["interval-item-container"]);
						config.visible = {"bindTo": "Visible"};
						itemConfig.config = config;

						var intervalItemFromConfig = ViewUtilities.getContainerConfig(
								"from-interval-item-container", ["control-width-15", "control-left"]);
						var fromCaption = this.get("Resources.Strings.FromCaption");
						var fromLabelContainerConfig = this.getTimeEditLabelConfig("From", fromCaption);
						var fromTimeContainerConfig = this.getTimeEditControlConfig("From", item.get("Id"));
						intervalItemFromConfig.items.push(fromLabelContainerConfig, fromTimeContainerConfig);

						var intervalItemToConfig = ViewUtilities.getContainerConfig(
								"to-interval-item-container", ["control-width-15", "control-left"]);
						var toCaption = this.get("Resources.Strings.ToCaption");
						var toLabelContainerConfig = this.getTimeEditLabelConfig("To", toCaption);
						var toTimeContainerConfig = this.getTimeEditControlConfig("To", item.get("Id"));
						intervalItemToConfig.items.push(toLabelContainerConfig, toTimeContainerConfig);

						var removeButtonContainerConfig = ViewUtilities.getContainerConfig(
								"button-container", ["control-wrap"]);
						var removeButtonConfig = {
							"className": "Terrasoft.Button",
							"id": item.get("Id"),
							"caption": "x",
							"click": {"bindTo": "onRemoveIntervalButtonClick"},
							"imageConfig": {
								"bindTo": "Resources.Images.IgnoreButtonImage"
							},
							"classes": {"wrapClass": ["remove-interval-button"]}
						};
						removeButtonContainerConfig.items.push(removeButtonConfig);
						config.items.push(intervalItemFromConfig, intervalItemToConfig, removeButtonContainerConfig);
					},

					/**
					 * Gets time edit label config.
					 * @protected
					 * @param {String} name Label name.
					 * @return {Object} Label config.
					 */
					getTimeEditLabelConfig: function(name, caption) {
						var labelContainerConfig = ViewUtilities.getContainerConfig(
								name + "-label-container", ["label-wrap", "interval-label"]);
						var labelConfig = {
							"className": "Terrasoft.Label",
							"caption": caption,
							"classes": {"wrapClass": ["t-label"]}
						};
						labelContainerConfig.items.push(labelConfig);
						return labelContainerConfig;
					},

					/**
					 * Gets time edit label config.
					 * @protected
					 * @param {String} name Label name.
					 * @return {Object} Label config.
					 */
					getTimeEditLabelcaption: function(name) {
						var labelContainerConfig = ViewUtilities.getContainerConfig(
								name + "-label-container", ["label-wrap", "interval-label"]);
						var labelConfig = {
							"className": "Terrasoft.Label",
							"caption": {"bindTo": "onRemoveIntervalButtonClick"},
							"classes": {"wrapClass": ["t-label"]}
						};
						labelContainerConfig.items.push(labelConfig);
						return labelContainerConfig;
					},

					/**
					 * Gets time edit control config.
					 * @protected
					 * @param {String} name Control name.
					 * @param {String} id Control identifier.
					 * @return {Object} Label config.
					 */
					getTimeEditControlConfig: function(name, id) {
						var controlContainerConfig = ViewUtilities.getContainerConfig(
								name + "timer-container", ["control-wrap", "interval-control"]);
						var controlConfig = {
							"className": "Terrasoft.TimeEdit",
							"id": id + name + "control",
							"classes": {"wrapClass": ["date-edit"]},
							"value": {"bindTo": name + "Value"},
							"markerValue": name
						};
						controlContainerConfig.items.push(controlConfig);
						return controlContainerConfig;
					},

					/**
					 * @inheritdoc BaseMiniPage#save
					 * @overridden
					 */
					saveEntityInChain: function(callback, scope) {
						this.callParent([function() {
							this.saveInterval.call(scope || this, callback, scope);
						}, this]);
					},

					saveInterval: function(callback, scope) {
						var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
						var collection = this.getCollection("IntervalsCollection");
						this.addUpdateIntervalQueries(collection, batchQuery);
						batchQuery.execute(
								function() {
									callback.call(scope || this);
								},
								this
						);
					},

					/**
					 * Adds changed intervals query.
					 * @protected
					 * @param {Array} intervals Intervals.
					 * @param {Terrasoft.BatchQuery} batchQuery Query.
					 */
					addUpdateIntervalQueries: function(intervals, batchQuery) {
						intervals.each(function(item) {
							var query = this.getIntervalQuery(item);
							if (!query) {
								return;
							}
							batchQuery.add(query);
						}, this);
					},

					/**
					 * Returns interval query.
					 * @protected
					 * @param {Object} interval Interval.
					 * @return {Terrasoft.Query} Query.
					 */
					getIntervalQuery: function(interval) {
						var toDelete = interval.get("ToDelete");
						var toAdd = interval.get("ToAdd");
						var neddAddOrDelete = (toDelete && toAdd);
						if(!neddAddOrDelete){
							return this.intervalQueryAction(interval, toDelete, toAdd);
						}
					},

					/**
					 * Returns interval query for getIntervalQuery.
					 * @protected
					 * @param {Object} interval Interval.
					 * @param {Boolean} toDelete action.
					 * @param {Boolean} toAdd action.
					 * @return {Terrasoft.Query} Query.
					 */
					intervalQueryAction: function(interval, toDelete, toAdd) {
						var fromValue = interval.get("FromValue");
						var toValue = interval.get("ToValue");
						if ((toDelete || (!fromValue && !toValue)) && !toAdd) {
							return this.deleteIntervalQuery(interval);
						}
						if (toAdd) {
							return this.insertIntervalQuery(interval);
						}
						var toUpdate = interval.get("ToUpdate");
						if (toUpdate) {
							return this.updateIntervalQuery(interval);
						}
						return null;
					},

					/**
					 * Returns interval insert query.
					 * @protected
					 * @param {Object} item Interval.
					 * @return {Terrasoft.Query} Insert query.
					 */
					insertIntervalQuery: function(item) {
						var insert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "WorkingTimeInterval"
						});
						insert.setParameterValue("Id", item.get("Id"), this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue(this.entitySchemaName, this.get("PrimaryColumnValue"),
								this.Terrasoft.DataValueType.GUID);
						insert.setParameterValue("To", item.get("ToValue"), this.Terrasoft.DataValueType.DATE_TIME);
						insert.setParameterValue("From", item.get("FromValue"), this.Terrasoft.DataValueType.DATE_TIME);
						return insert;
					},

					/**
					 * Returns interval update query.
					 * @protected
					 * @param {Object} interval Interval.
					 * @return {Terrasoft.UpdateQuery} Update query.
					 */
					updateIntervalQuery: function(item) {
						var update = Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "WorkingTimeInterval"
						});
						update.setParameterValue("To", item.get("ToValue"), this.Terrasoft.DataValueType.DATE_TIME);
						update.setParameterValue("From", item.get("FromValue"), this.Terrasoft.DataValueType.DATE_TIME);
						update.enablePrimaryColumnFilter(item.get("Id"));
						return update;
					},

					/**
					 * Returns interval delete query.
					 * @protected
					 * @param {Object} interval Interval.
					 * @return {Terrasoft.DeleteQuery} Delete query.
					 */
					deleteIntervalQuery: function(item) {
						var deleteQuery = this.Ext.create("Terrasoft.DeleteQuery", {
							rootSchemaName: "WorkingTimeInterval"
						});
						deleteQuery.enablePrimaryColumnFilter(item.get("Id"));
						deleteQuery.execute();
						return deleteQuery;
					},

					/**
					 * @inheritdoc BaseMiniPage#loadMiniPageEntity
					 * @overridden
					 */
					loadMiniPageEntity: function(callback, scope) {
						if (this.Ext.isFunction(callback)) {
							callback.call(scope || this);
						}
					},

					/**
					 * @inheritdoc BaseMiniPage#validate
					 * @overridden
					 */
					validate: function() {
						var collection = this.getCollection("IntervalsCollection");
						var items = collection.getItems();
						for(var i = 0; i < items.length; i++) {
							var needValidate = (!items[i].get("Visible") || items[i].get("ToDelete"));
							if (!needValidate) {
								var IsInvalidInterval = !this.validateEmptyInterval(items[i]) ||
										!this.validateStartFinishInterval(items[i]) ||
										!this.validateIntervalsIntersection(items[i], items);
								if(IsInvalidInterval){
									this.set("IsInvalidInterval", true);
									return false;
								}
							}
						}
						return true;
					},

					/**
					 * Check if Start and Finish points of interval are equals
					 * @protected
					 * @param {Object} item Current interval
					 * @returns {boolean}
					 */
					validateStartFinishInterval: function(item) {
						var from = item.get("FromValue");
						var to = item.get("ToValue");
						if (to <= from) {
							var errorMessage = this.getErrorMessage(
									this.get("Resources.Strings.StartFinishErrorMessage"), [from, to]);
							this.set("InvalidValidationMessage", errorMessage);
							return false;
						}
						return true;
					},

					/**
					 * Check empty interval
					 * @protected
					 * @param {Object} item Current interval
					 * @returns {boolean}
					 */
					validateEmptyInterval: function(item) {
						var from = item.get("FromValue");
						var to = item.get("ToValue");
						if (!from || !to) {
							var errorMessage = this.getErrorMessage(
									this.get("Resources.Strings.EmptyIntervalErrorMessage"), [from, to]);
							this.set("InvalidValidationMessage", errorMessage);
							return false;
						}
						return true;
					},

					/**
					 * Checks interval intersection.
					 * @protected
					 * @param {Object} item Current interval.
					 * @param {Array} intervals All intervals.
					 * @return {Boolean} overlap Is overlap between two intervals.
					 */
					validateIntervalsIntersection: function(item, intervals) {
						var overlap = false;
						var from = item.get("FromValue");
						var to = item.get("ToValue");
						var id = item.get("Id");
						for (var i = 0; i < intervals.length; i++) {
							var isVisible = !(intervals[i].get("Id") === id || !intervals[i].get("Visible") ||
								intervals[i].get("ToDelete"));
							var itemFrom = intervals[i].get("FromValue");
							var itemTo = intervals[i].get("ToValue");
							var isInterval = itemTo || itemFrom;
							if (isVisible && isInterval) {
								overlap = this.isOverlapInterval(from, to, itemFrom, itemTo);
								if(overlap) {
									return this.setIntersectIntervalErrorMessage(from, to, itemFrom, itemTo);
								}
							}
						}
						return !overlap;
					},

					/**
					 * Check interval on overlap.
					 * @private
					 * @param {String} from current from data.
					 * @param {String} to current to data.
					 * @param {String} itemFrom from data.
					 * @param {String} itemTo to data.
					 * @returns {Boolean}
					 */
					isOverlapInterval: function(from, to, itemFrom, itemTo) {
						return !(itemFrom < from && itemTo <= from || from < itemFrom && to <= itemFrom);
					},

					/**
					 * Create error message on overlap.
					 * @private
					 * @param {String} from current from data.
					 * @param {String} to current to data.
					 * @param {String} itemFrom from data.
					 * @param {String} itemTo to data.
					 * @returns {Boolean}
					 */
					setIntersectIntervalErrorMessage: function(from, to, itemFrom, itemTo) {
						var errorMessage = this.getErrorMessage(
							this.get("Resources.Strings.IntersectIntervalErrorMessage"), [from, to, itemFrom, itemTo]);
						this.set("InvalidValidationMessage", errorMessage);
						return false;
					},

					/**
					 * Build error message
					 * @param {String} template Message template
					 * @param {Array} values Interval points
					 * @returns {String}
					 */
					getErrorMessage: function(template, values)
					{
						var formatedValues = [];
						var timeFormat = Terrasoft.Resources.CultureSettings.timeFormat;
						Terrasoft.each(values, function(value) {
							if(Ext.isDate(value)) {
								formatedValues.push( Ext.Date.format(value, timeFormat));
							}
						});
						return this.Ext.String.format(template, formatedValues[0], formatedValues[1],
								formatedValues[2], formatedValues[3]);
					},

					/**
					 * @inheritdoc BaseMiniPage#close
					 * @overridden
					 */
					close: function() {
						this.sandbox.publish("OnCardClosingResetFlag");
						this.callParent(arguments);
					},

					/**
					 * Closing handler card by clicking on the cancel button
					 * @private
					 */
					onCancelCloseCard: function() {
						this.updateDetail();
						this.close(arguments);
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "MiniPage",
						"values": {
							"classes": {
								"wrapClassName": ["day-in-calender-mini-page-container"]
							}
						}
					},
					{
						"operation": "merge",
						"name": "OpenCurrentEntityPage",
						"values": {
							"visible": false
						}
					},
					{
						"operation": "insert",
						"name": "MiniPageCaption",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {"bindTo": "getMiniPageCaption"},
							"markerValue": "MiniPageCaption"
						},
						"parentName": "HeaderContainer",
						"propertyName": "items",
						"index": 0
					},
					{
						"operation": "insert",
						"name": "AddIntervalButton",
						"parentName": "HeaderContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"classes": {
								"wrapClass": ["remove-interval-container"],
								"textClass": ["remove-interval-text"]
							},
							"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
							"click": {"bindTo": "onAddIntervalButtonClick"}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"name": "NotificationContainer",
						"parentName": "MiniPage",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"visible": {"bindTo": "IsInvalidInterval"},
							"wrapClass": ["notification-container"],
							"layout": {
								"column": 0,
								"row": 1,
								"colSpan": 24,
								"rowSpan": 1
							},
							"items": []
						},
						index: 0
					},
					{
						"operation": "insert",
						"name": "Notification",
						"parentName": "NotificationContainer",
						"propertyName": "items",
						"values": {
							"labelClass": ["ts-messagebox-caption"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "InvalidValidationMessage"
							}
						},
						"index": 1
					},
					{
						"operation": "insert",
						"name": "IntervalsContainer",
						"parentName": "MiniPage",
						"propertyName": "items",
						"values": {
							"generator": "ConfigurationItemGenerator.generateContainerList",
							"classes": {
								"wrapClassName": ["day-intervals-collection-container"]
							},
							"idProperty": "Id",
							"collection": "IntervalsCollection",
							"onGetItemConfig": "getIntervalItemConfig",
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 24,
								"rowSpan": 1
							}
						},
						index: 1
					},
					{
						"operation": "merge",
						"name": "EditButtonsContainer",
						"values": {
							"visible": true
						}
					},
					{
						"operation": "merge",
						"name": "SaveEditButton",
						"values": {
							"visible": true
						}
					},
					{
						"operation": "insert",
						"name": "CancelEditButton",
						"parentName": "EditButtonsContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.CancelEditButtonCaption"},
							"classes": {
								"textClass": ["base-minipage-cancel-button"],
								"wrapperClass": ["base-minipage-cancel-button-wrapper"],
								"imageClass": ["base-minipage-action-button-image"]
							},
							"click": {"bindTo": "onCancelCloseCard"},
							"visible": true
						}
					},
					{
						"operation": "merge",
						"name": "AlignableMiniPageContainer",
						"values": {
							"showOverlay": true
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


