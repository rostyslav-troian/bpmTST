Terrasoft.configuration.Structures["LeadDetail"] = {innerHierarchyStack: ["LeadDetail"]};
define('LeadDetailStructure', ['LeadDetailResources'], function(resources) {return {schemaUId:'b8bf36cc-ad23-4221-b763-b34189800c0b',schemaCaption: "LeadDetail", parentSchemaName: "", schemaName:'LeadDetail',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadDetail", ['Lead', "LeadDetailStructure", 'LeadDetailResources'], function(Lead, structure, resources) {
	structure.userCode = function() {
		this.entitySchema = Lead;
		this.name = 'LeadDetailViewModel';
		this.editPageName = 'LeadPage';
		this.utilsConfig = {
			hiddenAdd: true,
			hiddenCopy: true,
			hiddenEdit: true,
			hiddenDelete: true
		};
		this.columnsConfig = [
			[
				{
					cols: 24,
					key: [
						{
							name: {
								bindTo: 'LeadName'
							},
							type: 'title'
						}
					]
				}
			]
		];
		this.loadedColumns = [
			{
				columnPath: 'LeadName'
			}
		];
		this.methods.setEntitySchema = function() {
			this.entitySchema = Lead;
		};
	};
	return structure;
});


