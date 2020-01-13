Terrasoft.configuration.Structures["PortalCaseSectionActionsDashboard"] = {innerHierarchyStack: ["PortalCaseSectionActionsDashboard"], structureParent: "CaseSectionActionsDashboard"};
define('PortalCaseSectionActionsDashboardStructure', ['PortalCaseSectionActionsDashboardResources'], function(resources) {return {schemaUId:'cca26c8a-43b4-4fb4-85b7-2a6768aaa38f',schemaCaption: "PortalCaseSectionActionsDashboard", parentSchemaName: "CaseSectionActionsDashboard", schemaName:'PortalCaseSectionActionsDashboard',parentSchemaUId:'444afcc6-b5d3-4116-b09b-8cace50730ff',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalCaseSectionActionsDashboard", ["CaseSectionActionsDashboard",
        "PortalCaseSectionActionsDashboardResources", "DcmSectionActionsDashboardMixin"],
    function() {
        return {
            attributes: {},
            messages: {},
            mixins: {
                DcmSectionActionsDashboardMixin: "Terrasoft.DcmSectionActionsDashboardMixin"
            },
            methods: {
                /**
                 * @inheritDoc Terrasoft.DcmSectionActionsDashboardMixin#setDcmAvailableStages
                 * @overridden
                 */
                setDcmAvailableStages: this.Terrasoft.emptyFn
            },
            diff: /**SCHEMA_DIFF*/[
                {
                    "operation": "remove",
                    "name": "CallMessageTab"
                },
                {
                    "operation": "remove",
                    "name": "EmailMessageTab"
                },
                {
                    "operation": "remove",
                    "name": "SocialMessageTab"
                },
                {
                    "operation": "remove",
                    "name": "TaskMessageTab"
                }
            ]/**SCHEMA_DIFF*/
        };
    }
);


