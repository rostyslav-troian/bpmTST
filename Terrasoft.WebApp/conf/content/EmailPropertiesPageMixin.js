Terrasoft.configuration.Structures["EmailPropertiesPageMixin"] = {innerHierarchyStack: ["EmailPropertiesPageMixin"]};
define('EmailPropertiesPageMixinStructure', ['EmailPropertiesPageMixinResources'], function(resources) {return {schemaUId:'1d87236f-387c-4bc9-a4bc-3aa87c6a94df',schemaCaption: "Email properties page mixin", parentSchemaName: "", schemaName:'EmailPropertiesPageMixin',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmailPropertiesPageMixin", ["ext-base", "terrasoft", "ProcessUserTaskConstants",
	"ProcessSchemaUserTaskUtilities", "EmailPropertiesPageMixinResources"],
		function(Ext, Terrasoft, ProcessUserTaskConstants, ProcessSchemaUserTaskUtilities, resources) {
	Ext.define("Terrasoft.configuration.mixins.EmailPropertiesPageMixin", {
		alternateClassName: "Terrasoft.EmailPropertiesPageMixin",

		/**
		 * Sets display importance value.
		 * @protected
		 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
		 */
		initImportance: function(parameter) {
			var importanceConfig = this.getImportanceConfig();
			var defaultValue = ProcessUserTaskConstants.EMAIL_IMPORTANCE.Normal;
			this.initLookupAttribute(parameter, importanceConfig, defaultValue);
		},

		/**
		 * Init lookup attribute.
		 * @private
		 * @param {Terrasoft.ProcessSchemaParameter} parameter Process parameter.
		 * @param {Object} config Lookup config.
		 * @param {String} defaultValue Default value.
		 */
		initLookupAttribute: function(parameter, config, defaultValue) {
			var valueSource = parameter.getValueSource();
			if (valueSource === Terrasoft.ProcessSchemaParameterValueSource.None) {
				return;
			}
			var value = parameter.getValue();
			if (Ext.isEmpty(value)) {
				value = defaultValue;
			}
			var item = Terrasoft.findWhere(config, {value: value});
			var parameterName = parameter.name;
			this.set(parameterName, item);
		},

		/**
		 * Returns importance config.
		 * @protected
		 * @return {Object}
		 */
		getImportanceConfig: function() {
			var emailImportance = ProcessUserTaskConstants.EMAIL_IMPORTANCE;
			var localizableStrings = resources.localizableStrings;
			var config = {};
			config[emailImportance.Low] = {
				value: emailImportance.Low,
				displayValue: localizableStrings.LowMailImportanceCaption
			};
			config[emailImportance.Normal] = {
				value: emailImportance.Normal,
				displayValue: localizableStrings.NormalMailImportanceCaption
			};
			config[emailImportance.Hight] = {
				value: emailImportance.Hight,
				displayValue: localizableStrings.HighMailImportanceCaption
			};
			return config;
		},

		/**
		 * The event handler for preparing of the data drop-down period.
		 * @protected
		 * @param {Object} filter Filters for data preparation.
		 * @param {Terrasoft.Collection} list The data for the drop-down list.
		 */
		onPrepareImportanceList: function(filter, list) {
			if (Terrasoft.isEmptyObject(list)) {
				return;
			}
			list.clear();
			list.loadAll(this.getImportanceConfig());
		}
	});
});


