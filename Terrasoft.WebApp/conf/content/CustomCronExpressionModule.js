Terrasoft.configuration.Structures["CustomCronExpressionModule"] = {innerHierarchyStack: ["CustomCronExpressionModule"], structureParent: "CustomCronExpressionPage"};
define('CustomCronExpressionModuleStructure', ['CustomCronExpressionModuleResources'], function(resources) {return {schemaUId:'3dccd2c4-d0c8-4f7a-9f86-e06af92d6ae9',schemaCaption: "CustomCronExpressionModule", parentSchemaName: "CustomCronExpressionPage", schemaName:'CustomCronExpressionModule',parentSchemaUId:'72d0f4bb-6cd8-4a5f-a41a-05a71178b7c8',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CustomCronExpressionModule", ["CustomCronExpressionModuleResources", "CustomCronExpressionDescriptor"],
		function() {
	return {
		attributes: {
		},
		methods: {

			/**
			 * @inheritdoc CustomCronExpressionPage#getCustomCronExpressionInfoText
			 * @override
			 */
			getCustomCronExpressionInfoText: function() {
				var pattern = this.get("Resources.Strings.CronExpressionInfoTextPattern");
				var hint = this.get("Resources.Strings.CronExpressionInfoButtonHint");
				var readMore = this.get("Resources.Strings.ReadMoreCaption");
				var caption = this.get("Resources.Strings.CronExpressionInfoButtonCaption");
				return Ext.String.format(pattern, hint, readMore, caption);
			},

			/**
			 * @inheritdoc CustomCronExpressionPage#getCronValidationInfo
			 * @override
			 */
			getCronValidationInfo: function(cronString) {
				var cron = Terrasoft.CronExpression.from(cronString);
				var info = cron.validate();
				if (info.isValid) {
					var hoursParameter = cron.getParameter(Terrasoft.cron.Parameters.Hours);
					var minutesParameter = cron.getParameter(Terrasoft.cron.Parameters.Minutes);
					var secondsParameter = cron.getParameter(Terrasoft.cron.Parameters.Seconds);
					var allowedHoursCharacter = "*";
					var allowedMinutesCharacter = "*";
					var allowedSecondsCharacter = "0";
					if (hoursParameter !== allowedHoursCharacter || minutesParameter !== allowedMinutesCharacter ||
							secondsParameter !== allowedSecondsCharacter) {
						info.error = this.get("Resources.Strings.InvalidCronPartsException");
					}
				}
				return info;
			},

			/**
			 * @inheritdoc CustomCronExpressionPage#getCronExpressionDescription
			 * @override
			 */
			getCronExpressionDescription: function() {
				var defaultCron = "0 * * ? * * *";
				var cronExpression = this.$CronExpression && this.$CronExpression.trim().replace(/  +/g, " ");
				if (cronExpression === defaultCron) {
					return this.get("Resources.Strings.DefaultCronDescription");
				}
				var cronString = this.get("CronExpression");
				var cron = Terrasoft.CronExpression.from(cronString);
				var cronDescription = Terrasoft.CustomCronExpressionDescriptor.describe(cron);
				if (cronDescription === "") {
					return this.get("Resources.Strings.DefaultCronDescription");
				}
				var delimiterPosition = cronDescription && cronDescription.indexOf(",");
				if (delimiterPosition === 0) {
					cronDescription = cronDescription.slice(delimiterPosition + 2);
					cronDescription = cronDescription.charAt(0).toUpperCase() + cronDescription.slice(1);
				}
				return cronDescription;
			}
		},
		diff: []
	};
});


