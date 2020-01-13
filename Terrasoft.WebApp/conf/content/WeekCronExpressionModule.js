Terrasoft.configuration.Structures["WeekCronExpressionModule"] = {innerHierarchyStack: ["WeekCronExpressionModule"], structureParent: "CompositeCronExpressionPage"};
define('WeekCronExpressionModuleStructure', ['WeekCronExpressionModuleResources'], function(resources) {return {schemaUId:'7d346530-465f-4a5a-bfc0-aa3e2d7a89bc',schemaCaption: "WeekCronExpressionModule", parentSchemaName: "CompositeCronExpressionPage", schemaName:'WeekCronExpressionModule',parentSchemaUId:'f4535032-6a8c-422d-be8c-e3b37d542195',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WeekCronExpressionModule", ["WeekCronExpressionModuleResources",
	"css!ProcessTimerStartEventPropertiesPageCSS"], function() {
	return {
		attributes: {
			/**
			 * Array of selected week days indexes
			 * @private
			 * @type {Array}
			 */
			"SelectedWeekDays": {
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": [],
				"onChange" : "onCronExpressionPartChange"
			}
		},
		methods: {

			/**
			 * Returns if week day button is pressed or not.
			 * @private
			 * @param {Number} tag Invoker button tag.
			 * @return {Boolean} is button pressed.
			 */
			_getIsDaySelected: function(tag) {
				var selectedButtons = this.$SelectedWeekDays;
				return Ext.Array.contains(selectedButtons, tag);
			},

			/**
			 * Week day button click handler.
			 * @private
			 */
			_onWeekDaySelected: function() {
				var tag = arguments[3];
				var selectedWeekDays = this.$SelectedWeekDays;
				var newSelectedWeekDays = selectedWeekDays.slice();
				if (this._getIsDaySelected(tag)) {
					Ext.Array.remove(newSelectedWeekDays, tag);
				} else {
					newSelectedWeekDays.push(tag);
				}
				this.$SelectedWeekDays = newSelectedWeekDays;
			},

			/**
			 * Initializes week section.
			 */
			onExpressionInit: function(cron) {
				if (cron) {
					this.$SelectedWeekDays = cron.getWeekDays();
				}
			},

			/**
			 * @inheritdoc Terrasoft.CompositeCronExpressionPage#getCompositeCronExpressionValue
			 * @protected
			 */
			getCompositeCronExpressionValue: function() {
				var cron = Terrasoft.CronExpression.create();
				cron.setWeekDays(this.$SelectedWeekDays);
				return cron;
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "WeeklyStartContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": []
				}
			},
			{
				"operation": "insert",
				"name": "WeeklyStartModule",
				"parentName": "WeeklyStartContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WeekSectionRunDaysOfWeekLabel",
				"parentName": "WeeklyStartModule",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.WeekSectionDaysOfWeekLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "WeekDaysButtonsGroupWrapper",
				"parentName": "WeeklyStartModule",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["multiselect-button-group-wrapper"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WeekDaysButtonsGroup",
				"parentName": "WeekDaysButtonsGroupWrapper",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["multiselect-button-group"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonSunday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 1
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonMonday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 2
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonTuesday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 3
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonWednesday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 4
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonThursday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 5
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonFriday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 6
				}
			},
			{
				"operation": "insert",
				"name": "WeekDayButtonSaturday",
				"parentName": "WeekDaysButtonsGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "getWeekDayButtonCaption"},
					"click": {"bindTo": "_onWeekDaySelected"},
					"pressed": {"bindTo": "_getIsDaySelected"},
					"tag": 7
				}
			}
		]
	};
});


