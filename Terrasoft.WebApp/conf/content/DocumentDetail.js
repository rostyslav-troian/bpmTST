﻿Terrasoft.configuration.Structures["DocumentDetail"] = {innerHierarchyStack: ["DocumentDetail"]};
define('DocumentDetailStructure', ['DocumentDetailResources'], function(resources) {return {schemaUId:'40fd208e-f32e-4f66-9218-57a373aa6247',schemaCaption: "DocumentDetail", parentSchemaName: "", schemaName:'DocumentDetail',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DocumentDetail", ['Document', "DocumentDetailStructure", 'DocumentDetailResources'],
function(Document, structure, resources) {
	structure.userCode = function() {
		this.entitySchema = Document;
		this.name = 'DocumentDetailViewModel';
		this.editPageName = 'DocumentPage';
		this.columnsConfig = [
			{
				cols: 12,
				key: [
					{
						name: {
							bindTo: 'Number'
						},
						type: 'title'
					}
				]
			},
			{
				cols: 12,
				key: [
					{
						name: {
							bindTo: 'Type'
						}
					}
				]
			}
		];
		this.loadedColumns = [
			{
				columnPath: 'Number'
			},
			{
				columnPath: 'Type'
			}
		];
		this.methods.setEntitySchema = function() {
			this.entitySchema = Document;
		};
	};
	return structure;
});


