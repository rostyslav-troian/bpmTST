Terrasoft.configuration.Structures["EmailEntityConnectionsDetailV2"] = {innerHierarchyStack: ["EmailEntityConnectionsDetailV2"], structureParent: "EntityConnectionsDetailV2"};
define('EmailEntityConnectionsDetailV2Structure', ['EmailEntityConnectionsDetailV2Resources'], function(resources) {return {schemaUId:'816732d8-0d15-4adb-b697-5a0287f3c083',schemaCaption: "Detail - Object connections in Email page", parentSchemaName: "EntityConnectionsDetailV2", schemaName:'EmailEntityConnectionsDetailV2',parentSchemaUId:'83e92bfd-9773-4516-a159-744723282dc4',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("EmailEntityConnectionsDetailV2", ["Activity"],
	function(ActivitySchema) {
		return {
			methods: {

				/**
				 * Processes entity connections response.
				 * @protected
				 * @param  {Object} collection Entity connections collection.
				 * @return {Terrasoft.BaseViewModelCollection} Processed entity connections collection.
				 */
				processEntityConnectionsResponse: function (collection) {
					var activityConnectionColumn = ActivitySchema.getColumnByName("ActivityConnection");
					var viewModel = this.Ext.create("Terrasoft.EntityConnectionViewModel", {
						Ext: this.Ext,
						Terrasoft: this.Terrasoft,
						sandbox: this.sandbox,
						values: {
							"ReferenceSchema": ActivitySchema,
							"ColumnName": activityConnectionColumn.name,
							"Caption": activityConnectionColumn.caption,
							"ColumnUId": activityConnectionColumn.uId,
							"Position" : 0,
							"MarkerValue": activityConnectionColumn.name + " " + activityConnectionColumn.caption
						}
					});
					collection.add(viewModel.get("ColumnUId"), viewModel);
					this.callParent(arguments);
				}
			}
		};
});


