Terrasoft.configuration.Structures["DateTimeParameterListItemViewModel"] = {innerHierarchyStack: ["DateTimeParameterListItemViewModel"]};
define('DateTimeParameterListItemViewModelStructure', ['DateTimeParameterListItemViewModelResources'], function(resources) {return {schemaUId:'19c2f1fc-9ea3-483c-8e5d-03bbeb656cda',schemaCaption: "DateTime parameter list item ViewModel", parentSchemaName: "", schemaName:'DateTimeParameterListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 /**
  * View model for date time parameter item in container list.
  */
define("DateTimeParameterListItemViewModel", ["DateTimeParameterListItemViewModelResources",
		"BaseParameterListItemViewModel"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.DateTimeParameterListItemViewModel
		 */
		Ext.define("Terrasoft.configuration.DateTimeParameterListItemViewModel", {
		extend: "Terrasoft.BaseParameterListItemViewModel",
		alternateClassName: "Terrasoft.DateTimeParameterListItemViewModel",
		columns: {
			/**
			 * Selected date and time.
			 * @protected
			 */
			"DateTimeValue": {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.DATE_TIME
			}
		},
		attributes: {
			/**
			 * @type {Boolean}
			 */
			"HasTime": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * @type {Boolean}
			 */
			"HasDate": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},

		/**
		 * Returns date control marker value.
		 * @protected
		 * @returns {String} Marker value.
		 */
		getDateControlMarkerValue: function() {
			return this.markerValuePrefix + "-date-" + this.$Name;
		},

		/**
		 * Returns time control marker value.
		 * @protected
		 * @returns {String} Marker value.
		 */
		getTimeControlMarkerValue: function() {
			return this.markerValuePrefix + "-time-" + this.$Name;
		},

		/**
		 * @inheritdoc BaseParameterListItemViewModel#initParameter
		 * @override
		 */
		initParameter: function(values, config) {
			this.callParent(arguments);
			values.HasDate = config.dataValueType === Terrasoft.DataValueType.DATE
				|| config.dataValueType === Terrasoft.DataValueType.DATE_TIME;
			values.HasTime = config.dataValueType === Terrasoft.DataValueType.TIME
				|| config.dataValueType === Terrasoft.DataValueType.DATE_TIME;
		},

		/**
		 * @inheritdoc BaseParameterListItemViewModel#initParameterValue
		 * @override
		 */
		initParameterValue: function(value) {
			if (this.$HasMacrosValue) {
				this.callParent(arguments);
			} else {
				this.$DateTimeValue = this.getTypedValue(value);
			}
		},

		/**
		 * Returns typed value of parameter.
		 * @protected
		 * @param {String} value Stringified value of parameter.
		 * @returns {Date} Parameter value.
		 */
		getTypedValue: function(value) {
			return value && new Date(value);
		},

		/**
		 * @inheritdoc BaseParameterListItemViewModel#getParameterValue
		 * @override
		 */
		getParameterValue: function() {
			return this.$HasMacrosValue
				? this.callParent()
				: this.$DateTimeValue && this.convertDateToString(this.$DateTimeValue);
		},

		/**
		 * @inheritdoc Terrasoft.BaseParameterListItemViewModel#getValueMenuItems
		 * @override
		 */
		getValueMenuItems: function() {
			var items = this.callParent();
			items.add("DateTimeMacros", new Terrasoft.BaseViewModel({
				values: {
					Id: "DateTimeMacros",
					Caption: resources.localizableStrings.DateTimeMacro,
					ImageConfig: this.getImage(resources.localizableImages.CalendarIcon),
					MarkerValue: "DateTimeMacros",
					Click: "$loadDateTimeMacrosPage"
				}
			}));
			return items;
		},

		/**
		 * @inheritdoc Terrasoft.BaseParameterListItemViewModel#getParameterInputConfig
		 * @override
		 */
		getParameterInputConfig: function() {
			return [
				{
					className: "Terrasoft.MultilineLabel",
					contentVisible: true,
					showReadMoreButton: false,
					caption: "$Caption"
				},
				{
					className: "Terrasoft.DateEdit",
					value: "$DateTimeValue",
					visible: "$HasDate",
					classes: {
						wrapClass: ["datetime-datecontrol"]
					},
					markerValue: this.getDateControlMarkerValue()
				},
				{
					className: "Terrasoft.TimeEdit",
					value: "$DateTimeValue",
					visible: "$HasTime",
					classes: {
						wrapClass: ["datetime-timecontrol"]
					},
					markerValue: this.getTimeControlMarkerValue()
				}
			];
		}
	});
	return Terrasoft.DateTimeParameterListItemViewModel;
});


