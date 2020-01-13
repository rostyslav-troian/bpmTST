Terrasoft.configuration.Structures["GeneratedWebFormLeadColumns"] = {innerHierarchyStack: ["GeneratedWebFormLeadColumns"]};
define('GeneratedWebFormLeadColumnsStructure', function() {return {type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){}};});
define("GeneratedWebFormLeadColumns", ['ext-base', 'terrasoft', 'sandbox',
    'Lead', "GeneratedWebFormLeadColumnsStructure", 'GeneratedWebFormLeadColumnsResources'],
    function(Ext, Terrasoft, sandbox, Lead, structure, resources) {
        structure.userCode = function() {
            this.entitySchema = Lead;
            this.name = 'GeneratedWebFormLeadColumnsCardViewModel';
            this.schema.leftPanel = [];
            this.methods.getHeader = function() {
                return resources.localizableStrings.PageHeader;
            };
        };
        return structure;
    });


