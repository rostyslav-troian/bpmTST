Terrasoft.configuration.Structures["BaseProcessSettings"] = {innerHierarchyStack: ["BaseProcessSettings"], structureParent: "BasePageV2"};
define('BaseProcessSettingsStructure', ['BaseProcessSettingsResources'], function(resources) {return {schemaUId:'e2b9f294-c7da-4fb5-a3de-bb53179e38e9',schemaCaption: "BaseProcessSettings", parentSchemaName: "BasePageV2", schemaName:'BaseProcessSettings',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BasePageV2
 */
define("BaseProcessSettings", ["BaseWizardStepSchemaMixin",	"css!BaseProcessSettingsCSS"], function() {
	return {
		entitySchemaName: "ProcessInModules",
		mixins: {
			BaseWizardStepSchemaMixin: "Terrasoft.BaseWizardStepSchemaMixin"
		},
		messages: {
			"getCardInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * PackageUId.
			 */
			"PackageUId": {
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.mixins.BaseWizardStepSchemaMixin.init.call(this, function() {
						this.hideBodyMask();
						Ext.callback(callback, scope);
					}, this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onGetModuleConfigResult
			 * @override
			 */
			onGetModuleConfigResult: function(config, next, scope) {
				this.set("PackageUId", config.packageUId);
				Ext.callback(next, scope);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onValidate
			 * @override
			 */
			onValidate: function() {
				this.publishValidationResult(true);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWizardStepSchemaMixin#onSave
			 * @override
			 */
			onSave: function() {
				this.publishSavingResult();
			}

			// endregion

		},
		diff: [
			{
				"operation": "remove",
				"name": "CardContentWrapper"
			},
			{
				"operation": "insert",
				"name": "BusinessProcessSettings",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["process-settings-container"]
					},
					"items": []
				}
			}
		]
	};
});


