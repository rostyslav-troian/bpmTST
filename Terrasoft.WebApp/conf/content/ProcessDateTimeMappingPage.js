Terrasoft.configuration.Structures["ProcessDateTimeMappingPage"] = {innerHierarchyStack: ["ProcessDateTimeMappingPage"]};
define('ProcessDateTimeMappingPageStructure', ['ProcessDateTimeMappingPageResources'], function(resources) {return {schemaUId:'638d37ea-1a9f-435c-a425-2e233c79ee88',schemaCaption: "ProcessDateTimeMappingPage", parentSchemaName: "", schemaName:'ProcessDateTimeMappingPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProcessDateTimeMappingPage", ["terrasoft"],
	function(Terrasoft) {
		return {
			attributes: {
				"ActiveRowName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Date"
				},
				"Date": {
					dataValueType: this.Terrasoft.DataValueType.DATE
				},
				"Time": {
					dataValueType: this.Terrasoft.DataValueType.TIME
				},
				"DateTime": {
					dataValueType: this.Terrasoft.DataValueType.DATE_TIME
				}
			},
			messages: {
				/**
				 * @message ResultSelectedRows
				 * Returns selected rows.
				 */
				"ResultSelectedRows": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {
				/**
				 * Handler on label click.
				 * @private
				 * @param {String} tag Active row name.
				 */
				onLabelClick: function(tag) {
					this.set("ActiveRowName", tag);
				},
				/**
				 * Gets marker value for rows container.
				 * @private
				 * @param {String} rowName Row name.
				 * @return {String}
				 */
				getRowContainerMarkerValue: function(rowName) {
					return rowName === this.get("ActiveRowName") ? "selected-date-container" : "date-container";
				},
				/**
				 * Publish selected value.
				 * @private
				 */
				onSelectedButtonClick: function() {
					var tag = arguments[3];
					var config = this.getParameterValues(tag);
					if (!config) {
						return;
					}
					var result = new Terrasoft.Collection();
					result.add(tag, config);
					this.sandbox.publish("ResultSelectedRows", {
						selectedRows: result
					}, [this.sandbox.id]);
				},
				/**
				 * Returns parameter value.
				 * @private
				 * @param {String} dateTimeKind Date time kind.
				 * [@return] {{value: (String), displayValue: (String)}}
				 */
				getParameterValues: function(dateTimeKind) {
					var value = this.get(dateTimeKind);
					if (!value) {
						return null;
					}
					var dateValueType = this.columns[dateTimeKind].dataValueType;
					var config =  Terrasoft.FormulaParserUtils.getDateTimeValueFormatConfig(dateValueType);
					var dateValue = Ext.Date.format(value, config.valueFormat);
					var dateDisplayValue = Ext.Date.format(value, config.displayFormat);
					return {
						value: Ext.String.format("{0}{1}", config.valuePrefix, dateValue),
						displayValue: Ext.String.format("{0}{1}", config.displayPrefix, dateDisplayValue)
					};
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ProcessDateTimeMappingContainer",
					"propertyName": "items",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DateContainer",
					"parentName": "ProcessDateTimeMappingContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": {
							"bindTo": "getRowContainerMarkerValue"
						},
						"tag": "Date",
						"classes": {
							"wrapClassName": ["date-container"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DateLabel",
					"parentName": "DateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SelectDateCaption"},
						"click": {"bindTo": "onLabelClick"},
						"tag": "Date"
					}
				},
				{
					"operation": "insert",
					"parentName": "DateContainer",
					"propertyName": "items",
					"name": "Date",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["input-wrap"]
					}
				},
				{
					"operation": "insert",
					"name": "SelectDateButton",
					"parentName": "DateContainer",
					"propertyName": "items",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "onSelectedButtonClick"},
						"tag": "Date"
					}
				},
				{
					"operation": "insert",
					"name": "TimeContainer",
					"parentName": "ProcessDateTimeMappingContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": {
							"bindTo": "getRowContainerMarkerValue"
						},
						"tag": "Time",
						"classes": {
							"wrapClassName": ["date-container"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "TimeLabel",
					"parentName": "TimeContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SelectTimeCaption"},
						"click": {"bindTo": "onLabelClick"},
						"tag": "Time"
					}
				},
				{
					"operation": "insert",
					"parentName": "TimeContainer",
					"propertyName": "items",
					"name": "Time",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["input-wrap"]
					}
				},
				{
					"operation": "insert",
					"name": "SelectTimeButton",
					"parentName": "TimeContainer",
					"propertyName": "items",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "onSelectedButtonClick"},
						"tag": "Time"
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeContainer",
					"parentName": "ProcessDateTimeMappingContainer",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"markerValue": {
							"bindTo": "getRowContainerMarkerValue"
						},
						"tag": "DateTime",
						"classes": {
							"wrapClassName": ["date-container"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "DateTimeLabel",
					"parentName": "DateTimeContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.SelectDateTimeCaption"},
						"click": {"bindTo": "onLabelClick"},
						"tag": "DateTime"
					}
				},
				{
					"operation": "insert",
					"parentName": "DateTimeContainer",
					"propertyName": "items",
					"name": "DateTime",
					"values": {
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["input-wrap"]
					}
				},
				{
					"operation": "insert",
					"name": "SelectDateTimeButton",
					"parentName": "DateTimeContainer",
					"propertyName": "items",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "onSelectedButtonClick"},
						"tag": "DateTime"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


