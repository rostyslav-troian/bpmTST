Terrasoft.configuration.Structures["KnowledgeBaseInCaseDetail"] = {innerHierarchyStack: ["KnowledgeBaseInCaseDetail"], structureParent: "BaseManyToManyGridDetail"};
define('KnowledgeBaseInCaseDetailStructure', ['KnowledgeBaseInCaseDetailResources'], function(resources) {return {schemaUId:'df3591c3-31a8-47c8-a131-e97722f11642',schemaCaption: "Detail schema - Knowledge base articles in cases", parentSchemaName: "BaseManyToManyGridDetail", schemaName:'KnowledgeBaseInCaseDetail',parentSchemaUId:'2ff3b2fa-5b9d-4e9a-8831-ce498329d553',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("KnowledgeBaseInCaseDetail", [],
	function() {
		return {
			entitySchemaName: "KnowledgeBaseInCase",
			methods: {
				initConfig: function() {
					this.callParent(arguments);
					var config = this.getConfig();
					config.lookupEntitySchema = config.lookupConfig.entitySchemaName = "KnowledgeBase";
					config.sectionEntitySchema = "Case";
				},
				/**
				 * ######### #############.
				 */
				init: function() {
					this.callParent(arguments);
					this.initConfig();
				},
				/**
				* ########## ### ####### ### ########## ## #########.
				* @overridden
				* @return {String} ### #######.
				*/
				getFilterDefaultColumnName: function() {
					return "KnowledgeBase";
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: Terrasoft.emptyFn
			}
		};
	});


