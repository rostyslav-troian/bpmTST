Terrasoft.configuration.Structures["CaseInKnowledgeBaseDetail"] = {innerHierarchyStack: ["CaseInKnowledgeBaseDetail"], structureParent: "BaseManyToManyGridDetail"};
define('CaseInKnowledgeBaseDetailStructure', ['CaseInKnowledgeBaseDetailResources'], function(resources) {return {schemaUId:'645361a6-6538-48c7-b354-9c921d69a375',schemaCaption: "Section - Cases detail in knowledge base", parentSchemaName: "BaseManyToManyGridDetail", schemaName:'CaseInKnowledgeBaseDetail',parentSchemaUId:'2ff3b2fa-5b9d-4e9a-8831-ce498329d553',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CaseInKnowledgeBaseDetail", [],
	function() {
		return {
			entitySchemaName: "KnowledgeBaseInCase",
			methods: {
				initConfig: function() {
					this.callParent(arguments);
					var config = this.getConfig();
					config.lookupEntitySchema = config.lookupConfig.entitySchemaName = "Case";
					config.sectionEntitySchema = "KnowledgeBase";
					config.lookupConfig.hideActions = true;
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
					return "Case";
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


