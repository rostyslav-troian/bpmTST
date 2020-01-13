Terrasoft.configuration.Structures["BulkEmailEventLogSectionV2"] = {innerHierarchyStack: ["BulkEmailEventLogSectionV2"], structureParent: "BaseSectionV2"};
define('BulkEmailEventLogSectionV2Structure', ['BulkEmailEventLogSectionV2Resources'], function(resources) {return {schemaUId:'4e92e875-6105-4bbc-b787-aa10dfd93539',schemaCaption: "Mailing log", parentSchemaName: "BaseSectionV2", schemaName:'BulkEmailEventLogSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailEventLogSectionV2", function() {
    return {
        entitySchemaName: "BulkEmailEventLog",
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "remove",
                "name": "SeparateModeAddRecordButton"
            },
            {
                "operation": "remove",
                "name": "DataGridActiveRowOpenAction"
            },
            {
                "operation": "remove",
                "name": "DataGridActiveRowCopyAction"
            },
            {
                "operation": "remove",
                "name": "DataGridActiveRowDeleteAction"
            }
        ]/**SCHEMA_DIFF*/,
        messages: {},
        methods: {
            /**
             * @inheritdoc Terrasoft.BaseSectionV2#isVisibleDeleteAction
             * @overridden
             */
            isVisibleDeleteAction: function() {
                return false;
            },

            /**
             * @inheritdoc Terrasoft.BaseSectionV2#isVisibleDeleteAction
             * @overridden
             */
            getModuleCaption: function() {
                return this.get("Resources.Strings.Caption");
            }
        }
    };
});


