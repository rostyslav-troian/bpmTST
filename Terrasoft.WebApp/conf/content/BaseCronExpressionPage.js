Terrasoft.configuration.Structures["BaseCronExpressionPage"] = {innerHierarchyStack: ["BaseCronExpressionPage"]};
define('BaseCronExpressionPageStructure', ['BaseCronExpressionPageResources'], function(resources) {return {schemaUId:'d92c3633-2f91-4efc-acf9-25cddb6a10cf',schemaCaption: "BaseCronExpressionPage", parentSchemaName: "", schemaName:'BaseCronExpressionPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseCronExpressionPage", ["BaseCronExpressionPageResources",
	"css!ProcessTimerStartEventPropertiesPageCSS"], function() {
	return {
		attributes: {
			/**
			 * Custom cron expression.
			 * @private
			 * @type {String}
			 */
			"CronExpression": {
				"dataValueType": this.Terrasoft.DataValueType.TEXT
			}
		},
		messages: {
			"GetCronExpression": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * @protected
			 */
			getDefCronExpressionValue: function() {
				return null;
			},

			/**
			 * Init section features.
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.sandbox.subscribe("GetCronExpression", function() {
						return this.get("CronExpression");
					}, this, [this.sandbox.id]);
					let cronExpression = this.get("CronExpression");
					let info = Terrasoft.CronExpression.validate(cronExpression);
					let cron;
					if (info.isValid) {
						cron = Terrasoft.CronExpression.from(cronExpression);
					} else {
						cronExpression = this.getDefCronExpressionValue();
						this.$CronExpression = cronExpression;
						cron = Terrasoft.CronExpression.from(cronExpression);
					}
					this.onExpressionInit(cron);
					callback.call(scope);
				}, this]);
			},

			/**
			 * Init view attributes with given cron object
			 * @virtual
			 * @param {Object} cron object.
			 */
			onExpressionInit: Terrasoft.emptyFn

		}
	};
});


