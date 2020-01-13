Terrasoft.configuration.Structures["CompositeCronExpressionPage"] = {innerHierarchyStack: ["CompositeCronExpressionPage"], structureParent: "BaseCronExpressionPage"};
define('CompositeCronExpressionPageStructure', ['CompositeCronExpressionPageResources'], function(resources) {return {schemaUId:'f4535032-6a8c-422d-be8c-e3b37d542195',schemaCaption: "BaseCronExpressionPage", parentSchemaName: "BaseCronExpressionPage", schemaName:'CompositeCronExpressionPage',parentSchemaUId:'d92c3633-2f91-4efc-acf9-25cddb6a10cf',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CompositeCronExpressionPage", ["CompositeCronExpressionPageResources", "CronExpressionPageMixin",
	"css!ProcessTimerStartEventPropertiesPageCSS"], function() {
	return {
		mixins: {
			CronExpressionPageMixin : "Terrasoft.CronExpressionPageMixin"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseCronExpressionPage#getDefCronExpressionValue
			 * @protected
			 */
			getDefCronExpressionValue: function () {
				var cron = this.getCompositeCronExpressionValue();
				return cron.toString();
			},

			/**
			 *@protected
			 */
			getCompositeCronExpressionValue: function() {
				return Terrasoft.CronExpression.create();
			},

			/**
			 * @protected
			 */
			onCronExpressionPartChange: function() {
				var cron = this.getCompositeCronExpressionValue();
				this.set("CronExpression", cron.toString());
			}
		}
	};
});


