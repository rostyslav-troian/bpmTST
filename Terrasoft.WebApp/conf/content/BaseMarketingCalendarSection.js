Terrasoft.configuration.Structures["BaseMarketingCalendarSection"] = {innerHierarchyStack: ["BaseMarketingCalendarSection"], structureParent: "BaseSectionV2"};
define('BaseMarketingCalendarSectionStructure', ['BaseMarketingCalendarSectionResources'], function(resources) {return {schemaUId:'739873f7-d055-4a3e-8962-c7d2d7f6394a',schemaCaption: "BaseMarketingCalendarSection", parentSchemaName: "BaseSectionV2", schemaName:'BaseMarketingCalendarSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMarketingCalendarSection", ["terrasoft", "css!BaseMarketingCalendarSectionCSS"],
	function(Terrasoft) {
		return {
			messages: {

				/**
				 * Fires when year in calendar changed.
				 */
				"CalendarYearChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * Selected calendar year.
				 */
				"CalendarYear": {
					dataValueType: Terrasoft.DataValueType.ENUM,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * List of all available years in calendar.
				 */
				"CalendarYearList": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				_getCurrentYear: function() {
					return new Date().getFullYear();
				},

				_getCalendarYearsList: function() {
					var list = this.$CalendarYearList;
					if (Terrasoft.isEmpty(list)) {
						list = this.Ext.create("Terrasoft.Collection");
						this.$CalendarYearList = list;
					}
					return list;
				},

				_getCalendarYearsCollection: function(minYearEntityCollection) {
					var resultList = this.Ext.create("Terrasoft.Collection");
					var currentYear = this._getCurrentYear();
					var minStartYear = currentYear;
					var maxStartYear = currentYear;
					if (minYearEntityCollection && minYearEntityCollection.collection.length > 0) {
						if (!Terrasoft.isEmpty(minYearEntityCollection.collection.items[0].$MinStartDate)) {
							minStartYear = minYearEntityCollection.collection.items[0].$MinStartDate.getFullYear();
						}
						if (!Terrasoft.isEmpty(minYearEntityCollection.collection.items[0].$MaxStartDate)) {
							var maxStartYearFromDB = minYearEntityCollection.collection.items[0]
								.$MaxStartDate.getFullYear();
							maxStartYear = maxStartYearFromDB < maxStartYear ? maxStartYear : maxStartYearFromDB;
						}
					}
					for (var year = minStartYear; year <= maxStartYear; year++) {
						resultList.add({
							displayValue: year,
							value: year
						});
					}
					return resultList;
				},

				/**
				 * Generates {Terrasoft.EntitySchemaQuery}
				 * @protected
				 * @virtual
				 * @param String minStartDateColumnAlias Alias for column which contains minimal StartDate.
				 */
				getStartDateRecordsRangeEsq: Terrasoft.emptyFn,

				/**
				 * Handles change of selected year in calendar.
				 * @protected
				 * @param {Object} newValue Selected year value.
				 */
				calendarYearChanged: Terrasoft.emptyFn,

				/**
				 * Loads values to calendar yeras list.
				 * @protected
				 */
				loadCalendarYearList: function() {
					var list = this._getCalendarYearsList();
					list.clear();
					var resultList = this.Ext.create("Terrasoft.Collection");
					var selectCalendarYearsRange = this.getStartDateRecordsRangeEsq("MinStartDate", "MaxStartDate");
					selectCalendarYearsRange.getEntityCollection(function(result) {
						resultList.loadAll(this._getCalendarYearsCollection(result.collection));
						list.loadAll(resultList);
					}, this);
				},

				/**
				 * @override Terrasoft.BaseSectionV2#init
				 */
				init: function () {
					this.callParent(arguments);
					this.loadCalendarYearList();
					this.$CalendarYear = {
						displayValue: this._getCurrentYear(),
						value: this._getCurrentYear()
					};
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "insert",
					"parentName": "LeftGridUtilsContainer",
					"propertyName": "items",
					"name": "CalendarYear",
					"values": {
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"caption": {bindTo: "Resources.Strings.YearControlLabel"},
						"wrapClass": ["select-year-container"],
						"controlConfig": {
							"className": "Terrasoft.ComboBoxEdit",
							"list": {
								"bindTo": "CalendarYearList"
							},
							"prepareList": {
								"bindTo": "loadCalendarYearList"
							},
							"value": {
								"bindTo": "CalendarYear"
							},
							"change": {
								"bindTo": "calendarYearChanged"
							}
						}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


