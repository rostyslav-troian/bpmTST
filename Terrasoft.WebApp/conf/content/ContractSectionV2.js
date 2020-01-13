Terrasoft.configuration.Structures["ContractSectionV2"] = {innerHierarchyStack: ["ContractSectionV2"], structureParent: "BaseSectionV2"};
define('ContractSectionV2Structure', ['ContractSectionV2Resources'], function(resources) {return {schemaUId:'12c75b69-6f6f-462c-a00c-490fd3f1cd69',schemaCaption: "Page schema - \"Contracts\" section", parentSchemaName: "BaseSectionV2", schemaName:'ContractSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContractSectionV2", ["GridUtilitiesV2", "VisaHelper"],
function(GridUtilitiesV2, VisaHelper) {
	return {
		entitySchemaName: "Contract",
		attributes: {
			/**
			 * ######### ###### #### "######### ## ###########"
			 */
			SendToVisaMenuItemCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: VisaHelper.resources.localizableStrings.SendToVisaCaption
			}
		},
		contextHelpId: "1071",
		diff: /**SCHEMA_DIFF*/[
		]/**SCHEMA_DIFF*/,
		messages: {},
		methods: {
			/**
			 * ######## "######### ## ###########"
			 */
			sendToVisa: VisaHelper.SendToVisaMethod,

			/**
			 * ########## ######### ######## ####### # ###### ########### #######
			 * @protected
			 * @overridden
			 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ####### # ######
			 * ########### #######
			 */
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {bindTo: "SendToVisaMenuItemCaption"},
					"Click": {bindTo: "sendToVisa"},
					"Enabled": {bindTo: "isSingleSelected"}
				}));
				return actionMenuItems;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#initContextHelp
			 * @overridden
			*/
			initContextHelp: function() {
				this.set("ContextHelpId", 1071);
				this.callParent(arguments);
			}
		}
	};
});


