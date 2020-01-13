Terrasoft.configuration.Structures["ScheduledDuplicatesSearchSettingsPage"] = {innerHierarchyStack: ["ScheduledDuplicatesSearchSettingsPage"]};
define('ScheduledDuplicatesSearchSettingsPageStructure', ['ScheduledDuplicatesSearchSettingsPageResources'], function(resources) {return {schemaUId:'79ce1c42-a453-4950-aec5-730f451f1094',schemaCaption: "ScheduledDuplicatesSearchSettingsPage", parentSchemaName: "", schemaName:'ScheduledDuplicatesSearchSettingsPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ScheduledDuplicatesSearchSettingsPage", [
		"ScheduledDuplicatesSearchSettingsPageResources",
		"SearchDuplicatesSettingsPageViewResources",
		"GridUtilitiesV2", "css!ScheduledDuplicatesSearchSettingsPageCSS"
	],
	function(resources, settingsPageResources) {
		return {
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsWrap",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["search-settings-wrap"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsButtons",
					"parentName": "ScheduledDuplicatesSearchSettingsWrap",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsSaveButton",
					"parentName": "ScheduledDuplicatesSearchSettingsButtons",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"click": { "bindTo": "saveScheduledDuplicatesSearchSettings" },
						"caption": resources.localizableStrings.ApplySettingsButtonCaption
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsCancelButton",
					"parentName": "ScheduledDuplicatesSearchSettingsButtons",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": { "bindTo": "cancelScheduledDuplicatesSearchSettings" },
						"caption": resources.localizableStrings.CancelSettingsButtonCaption
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsGridWrap",
					"parentName": "ScheduledDuplicatesSearchSettingsWrap",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["search-settings-grid-wrap"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsGrid",
					"parentName": "ScheduledDuplicatesSearchSettingsGridWrap",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsGridData",
					"parentName": "ScheduledDuplicatesSearchSettingsGrid",
					"propertyName": "items",
					"values": {
						"type": "listed",
						"itemType": Terrasoft.ViewItemType.GRID,
						"primaryColumnName": "Id",
						"primaryDisplayColumnName": "SchemaToSearchName",
						"selectRow": { "bindTo": "onScheduledDuplicatesSearchSettingsSelected" },
						"activeRow": { "bindTo": "ScheduledSearchSettingsGridActiveRowId" },
						"collection": { "bindTo": "ScheduledSearchSettingsGrid" },
						"columnsConfig": [
							{
								cols: 8,
								key: [{ name: { bindTo: "SchemaToSearchName" } }]
							},
							{
								cols: 8,
								key: [{ name: { bindTo: "SearchTime" } }]
							},
							{
								cols: 8,
								key: [{ name: { bindTo: "DaysNames" } }]
							}
						],
						"captionsConfig": [
							{
								"cols": 8,
								"name": resources.localizableStrings.SearchSchemaNameGridTitle
							},
							{
								"cols": 8,
								"name": resources.localizableStrings.SearchTimeGridTitle
							},
							{
								"cols": 8,
								"name": resources.localizableStrings.SearchDaysGridTitle
							}
						],
						"canChangeMultiSelectWithGridClick": false
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchSettingsPanel",
					"parentName": "ScheduledDuplicatesSearchSettingsGridWrap",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {
							"bindTo": "ScheduledSearchSettingsGridActiveRowId",
							"bindConfig": {
								"converter": function (value) {
									return !Ext.isEmpty(value);
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchTimeCaption",
					"parentName": "ScheduledDuplicatesSearchSettingsPanel",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["search-settings-time-caption"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TimeSettingsLabel",
					"parentName": "ScheduledDuplicatesSearchTimeCaption",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "ScheduledSearchSettingsCaption"
						}
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchTime",
					"parentName": "ScheduledDuplicatesSearchSettingsPanel",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["search-settings-time"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SearchTimeEdit",
					"parentName": "ScheduledDuplicatesSearchTime",
					"propertyName": "items",
					"values": {
						"bindTo": "SearchTime"
					}
				},
				{
					"operation": "insert",
					"name": "DaysOfWeekLabel",
					"parentName": "ScheduledDuplicatesSearchTime",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": settingsPageResources.localizableStrings.WeekCaption
					}
				},
				{
					"operation": "insert",
					"name": "ScheduledDuplicatesSearchDays",
					"parentName": "ScheduledDuplicatesSearchSettingsPanel",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["search-settings-days"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "IsMondayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsMonday"
					}
				},
				{
					"operation": "insert",
					"name": "IsTuesdayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsTuesday"
					}
				},
				{
					"operation": "insert",
					"name": "IsWednesdayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsWednesday"
					}
				},
				{
					"operation": "insert",
					"name": "IsThursdayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsThursday"
					}
				},
				{
					"operation": "insert",
					"name": "IsFridayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsFriday"
					}
				},
				{
					"operation": "insert",
					"name": "IsSaturdayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsSaturday"
					}
				},
				{
					"operation": "insert",
					"name": "IsSundayCheckBoxEdit",
					"parentName": "ScheduledDuplicatesSearchDays",
					"propertyName": "items",
					"values": {
						"bindTo": "IsSunday"
					}
				}
			]/**SCHEMA_DIFF*/,
			mixins: {
				/**
				 * @class GridUtilities implements basic methods for working with grid.
				 */
				GridUtilities: "Terrasoft.GridUtilities"
			},
			messages: {

				/**
				 * @message BackHistoryState
				 * Changes current history state to the previous state.
				 */
				"BackHistoryState": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
 			attributes: {
				"IsMonday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsMonday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.MondayCaption
				},
				"IsTuesday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsTuesday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.TuesdayCaption
				},
				"IsWednesday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsWednesday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.WednesdayCaption
				},
				"IsThursday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsThursday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.ThursdayCaption
				},
				"IsFriday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsFriday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.FridayCaption
				},
				"IsSaturday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsSaturday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.SaturdayCaption
				},
				"IsSunday": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false,
					"dependencies": [{
						columns: ["IsSunday"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.SundayCaption
				},
				"SearchTime": {
					"dataValueType": Terrasoft.DataValueType.TIME,
					"dependencies": [{
						columns: ["SearchTime"],
						methodName: "onScheduledDuplicatesSearchSettingsChanged"
					}],
					"caption": settingsPageResources.localizableStrings.DateFromCaption
				},
				"ScheduledSearchSettingsGrid": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},
				"ScheduledSearchSettingsGridActiveRowId": {
					"dataValueType": Terrasoft.DataValueType.GUID
				},
				"ScheduledSearchSettingsCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT
				},
				"ScheduledSearchSettingsPanelFrozen": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},
				"ScheduledSearchSettingsEsqParameters": {
					"dataValueType": Terrasoft.DataValueType.OBJECT,
					"value": {
						rootSchemaName: "DuplicatesSearchParameter"
					}
				}
			},
			methods: {
				_createUpdateEsq: function(scheduledSearchSettingsGridItem) {
					const filter = Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", scheduledSearchSettingsGridItem.$Id);
					const updateQuery = Ext.create("Terrasoft.UpdateQuery", this.$ScheduledSearchSettingsEsqParameters);
					updateQuery.filters.addItem(filter);
					updateQuery.setParameterValue("Days",
						scheduledSearchSettingsGridItem.$Days, Terrasoft.DataValueType.INTEGER);
					updateQuery.setParameterValue("SearchTime",
						scheduledSearchSettingsGridItem.$SearchTime, Terrasoft.DataValueType.TIME);
					return updateQuery;
				},
				_getShortDaysNames: function(){
					const shortDayNames = Ext.Array.clone(Terrasoft.Resources.CultureSettings.shortDayNames);
					shortDayNames.push(shortDayNames.shift());
					return shortDayNames;
				},
				_convertToArrayDays: function(searchDaysBinary) {
					const daysOfWeek = Ext.Object.getValues(Terrasoft.DayOfWeek);
					const searchDays = daysOfWeek.map(function(dayOfWeek){
						return (searchDaysBinary & dayOfWeek) === dayOfWeek;
					});
					return searchDays;
				},
				_convertToBinaryDays: function(searchDaysArray) {
					let searchDaysBin = 0;
					for (let i = 0; i < searchDaysArray.length; i++) {
						searchDaysBin = searchDaysBin | searchDaysArray[i] << i + 1;
					}
					return searchDaysBin;
				},
				_convertToShortDaysNames: function(searchDaysArray) {
					const allShortDayNames = this._getShortDaysNames();
					let shortDayNames = searchDaysArray.map(function(isDaySelected, index) {
						return isDaySelected ? allShortDayNames[index] : null;
					});
					shortDayNames = Ext.Array.clean(shortDayNames);
					return shortDayNames.join();
				},
				init: function() {
					this.$ScheduledSearchSettingsGrid = Ext.create("Terrasoft.BaseViewModelCollection");
					this.callParent(arguments);
					this.initScheduledDuplicatesSearchSettingsGrid();
				},
				onRender: function() {
					this.callParent(arguments);
					this.initHeaderCaption();
				},
				initHeaderCaption: function() {
					this.sandbox.publish("InitDataViews", {
						caption: this.get("Resources.Strings.PageCaption"),
						dataViews: false,
						hidePageCaption: true
					});
				},
				createViewModel: function(config) {
					const daysOfWeek = this._convertToArrayDays(config.rawData.Days);
					const originSchemaToSearchName = config.rawData.SchemaToSearchName;
					const schemaModuleStructure = this.getModuleStructure(config.rawData.SchemaToSearchName);
					const localizedSchemaToSearchName = (schemaModuleStructure)
						? schemaModuleStructure.moduleCaption
						: originSchemaToSearchName;
					config.rawData.DaysNames = this._convertToShortDaysNames(daysOfWeek);
					config.rawData.SchemaToSearchName = localizedSchemaToSearchName;
					config.rowConfig.DaysNames = { dataValueType: Terrasoft.DataValueType.TEXT };
					return this.mixins.GridUtilities.createViewModel.apply(this, arguments);
				},
				saveScheduledDuplicatesSearchSettings: function() {
					const batchQuery = Ext.create("Terrasoft.BatchQuery");
					const scheduledSearchSettings = this.$ScheduledSearchSettingsGrid.getItems();
					for (let i = 0; i < scheduledSearchSettings.length; i++) {
						const scheduledSearchSettingsGridItem = scheduledSearchSettings[i];
						if(scheduledSearchSettingsGridItem.getIsChanged()) {
							batchQuery.add(
								this._createUpdateEsq(scheduledSearchSettingsGridItem)
							);
						}
					}
					if (batchQuery.queries.length > 0) {
						batchQuery.execute(this.cancelScheduledDuplicatesSearchSettings, this);
					} else {
						this.cancelScheduledDuplicatesSearchSettings();
					}
				},
				cancelScheduledDuplicatesSearchSettings: function() {
					this.sandbox.publish("BackHistoryState");
				},
				initScheduledDuplicatesSearchSettingsGrid: function(){
					const esq = Ext.create("Terrasoft.EntitySchemaQuery", this.$ScheduledSearchSettingsEsqParameters);
					esq.addColumn("Id");
					esq.addColumn("Days");
					esq.addColumn("SearchTime");
					esq.addColumn("SchemaToSearchName");
					this.initQueryEvents(esq);
					esq.getEntityCollection(function(response) {
						this.destroyQueryEvents(esq);
						if (!response.success || !response.collection) {
							return;
						}
						this.$ScheduledSearchSettingsGrid.loadAll(response.collection);
						if (!this.$ScheduledSearchSettingsGrid.isEmpty()) {
							this.$ScheduledSearchSettingsGridActiveRowId =
								this.$ScheduledSearchSettingsGrid.getKeys()[0];
						}
					}, this);
				},
				onScheduledDuplicatesSearchSettingsChanged: function() {
					const activeRowId = this.$ScheduledSearchSettingsGridActiveRowId;
					if (this.$ScheduledSearchSettingsPanelFrozen ||	!activeRowId) {
						return;
					}
					const scheduledSearchSettings = this.$ScheduledSearchSettingsGrid.get(activeRowId);
					const searchDaysArray = [
						this.$IsMonday, this.$IsTuesday, this.$IsWednesday,
						this.$IsThursday, this.$IsFriday, this.$IsSaturday, this.$IsSunday
					];
					scheduledSearchSettings.$Days = this._convertToBinaryDays(searchDaysArray);
					scheduledSearchSettings.$DaysNames = this._convertToShortDaysNames(searchDaysArray);
					scheduledSearchSettings.$SearchTime = this.$SearchTime;
				},
				onScheduledDuplicatesSearchSettingsSelected: function(rowId) {
					this.$ScheduledSearchSettingsPanelFrozen = true;
					const scheduledSearchSettings = this.$ScheduledSearchSettingsGrid.get(rowId);
					const searchDaysArray = this._convertToArrayDays(scheduledSearchSettings.$Days);
					this.$IsMonday = searchDaysArray[0];
					this.$IsTuesday = searchDaysArray[1];
					this.$IsWednesday = searchDaysArray[2];
					this.$IsThursday = searchDaysArray[3];
					this.$IsFriday = searchDaysArray[4];
					this.$IsSaturday = searchDaysArray[5];
					this.$IsSunday = searchDaysArray[6];
					this.$SearchTime = scheduledSearchSettings.$SearchTime;
					this.$ScheduledSearchSettingsPanelFrozen = false;
					this.$ScheduledSearchSettingsCaption = Ext.String.format(
						resources.localizableStrings.PeriodOfSearchCaptionTemplate,
						scheduledSearchSettings.$SchemaToSearchName);
				}
			}
		};
	}
);


