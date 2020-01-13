Terrasoft.configuration.Structures["CustomCronExpressionPage"] = {innerHierarchyStack: ["CustomCronExpressionPage"], structureParent: "BaseCronExpressionPage"};
define('CustomCronExpressionPageStructure', ['CustomCronExpressionPageResources'], function(resources) {return {schemaUId:'72d0f4bb-6cd8-4a5f-a41a-05a71178b7c8',schemaCaption: "CustomCronExpressionPage", parentSchemaName: "BaseCronExpressionPage", schemaName:'CustomCronExpressionPage',parentSchemaUId:'d92c3633-2f91-4efc-acf9-25cddb6a10cf',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomCronExpressionPage", ["CustomCronExpressionPageResources",
	"css!ProcessTimerStartEventPropertiesPageCSS"], function() {
	return {
		methods: {

			/**
			 * Custom cron expression validator.
			 * @private
			 * @param {String} mappingValue User cron expression.
			 * @return {Object} Validation info.
			 */
			_cronExpressionValidator: function(mappingValue) {
				var info = this.getCronValidationInfo(mappingValue);
				return {
					invalidMessage: info.error
				};
			},

			/**
			 * Returns full validation info for process designer.
			 * @protected
			 * @param {String} cronString Source cron string.
			 * @return {Object} Validation info.
			 */
			getCronValidationInfo: function(cronString) {
				var cron = Terrasoft.CronExpression.from(cronString);
				var validationInfo = cron.validate();
				if (validationInfo.isValid) {
					var secondsParameter = cron.getParameter(Terrasoft.cron.Parameters.Seconds);
					var allowedSecondsCharacter = "0";
					if (secondsParameter !== allowedSecondsCharacter) {
						var exceptions = Terrasoft.Resources.ProcessSchemaDesigner.Exceptions;
						validationInfo.error = exceptions.InvalidCronSecondsException;
					}
				}
				return validationInfo;
			},

			/**
			 * Returns custom cron expression description visibility.
			 * @return {Boolean} Description visibility.
			 */
			isCronExpressionValid: function() {
				var cronString = this.get("CronExpression");
				var validationInfo = Terrasoft.CronExpression.validate(cronString);
				return validationInfo.isValid;
			},

			/**
			 * Returns custom cron expression description.
			 * @return {String} Custom cron expression description.
			 */
			getCronExpressionDescription: function() {
				var cronString = this.get("CronExpression");
				var cron = Terrasoft.CronExpression.from(cronString);
				return Terrasoft.CronExpressionDescriptor.describe(cron);
			},

			/**
			 * Returns cron expression info text.
			 * @return {String} Cron expression info text.
			 */
			getCustomCronExpressionInfoText: function() {
				var pattern = this.get("Resources.Strings.CronExpressionInfoButtonPattern");
				var readMore = this.get("Resources.Strings.ReadMoreCaption");
				var caption = this.get("Resources.Strings.CronExpressionInfoButtonCaption");
				return Ext.String.format(pattern, readMore, caption);
			},

			/**
			 * @inheritdoc ProcessBaseEventPropertiesPage#setValidationConfig
			 * @overriden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("CronExpression", this._cronExpressionValidator);
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "CustomCronExpressionContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "CustomCronExpressionContainer",
				"propertyName": "items",
				"name": "CustomCronExpressionGroup",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "CustomCronExpressionLabel",
				"parentName": "CustomCronExpressionGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 22
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.CustomCronExpressionLabel"},
					"classes": {"labelClass": ["start-timer-properties-page-label"]}
				}
			},
			{
				"operation": "insert",
				"name": "CronExpression",
				"parentName": "CustomCronExpressionGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 23
					},
					"labelConfig": {"visible": false},
					"itemType": this.Terrasoft.ViewItemType.TEXT,
					"controlConfig": {
						"className": "Terrasoft.TextEdit",
						"value": {"bindTo": "CronExpression"},
						"focused": true
					},
					"wrapClass": []
				}
			},
			{
				"operation": "insert",
				"name": "CronExpressionInfoButton",
				"parentName": "CustomCronExpressionGroup",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 23,
						"row": 1,
						"colSpan": 2
					},
					"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {"bindTo": "getCustomCronExpressionInfoText"},
					"behaviour": {"displayEvent": Terrasoft.controls.TipEnums.displayEvent.CLICK}
				}
			},
			{
				"operation": "insert",
				"name": "CustomCronExpressionDescriptorContainer",
				"parentName": "SectionContainer",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 26
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"visible": {"bindTo": "isCronExpressionValid"}
				}
			},
			{
				"operation": "insert",
				"name": "CustomCronExpressionDescriptorLabel",
				"parentName": "CustomCronExpressionDescriptorContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "getCronExpressionDescription"},
					"classes": {"labelClass": ["custom-cron-description-box"]}
				}
			}
		]
	};
});

