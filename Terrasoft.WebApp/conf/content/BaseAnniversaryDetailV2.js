Terrasoft.configuration.Structures["BaseAnniversaryDetailV2"] = {innerHierarchyStack: ["BaseAnniversaryDetailV2"], structureParent: "BaseGridDetailV2"};
define('BaseAnniversaryDetailV2Structure', ['BaseAnniversaryDetailV2Resources'], function(resources) {return {schemaUId:'16c044af-7997-4644-a186-c00904d66f11',schemaCaption: "Base noteworthy events detail", parentSchemaName: "BaseGridDetailV2", schemaName:'BaseAnniversaryDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseAnniversaryDetailV2", ["terrasoft"], function(Terrasoft) {
	return {
		attributes: {
			Types: {dataValueType: Terrasoft.DataValueType.COLLECTION}
		},
		methods: {

			/*
			 * @inheritdoc Terrasoft.BaseGridDetailV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				if (!this.get("Types")) {
					this.initAnniversaryTypes(function() {
						this.init(callback, scope);
					}, this);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getEditPages
			 * @overridden
			 */
			getEditPages: function() {
				var menuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var entityStructure = this.getEntityStructure(this.entitySchemaName);
				if (entityStructure) {
					var editPage = entityStructure.pages[0];
					var anniversaryTypes = this.get("Types");
					anniversaryTypes.each(function(anniversaryType) {
						var id = anniversaryType.get("Id");
						var caption = anniversaryType.get("Name");
						var schemaName = editPage.cardSchema;
						var item = this.getButtonMenuItem({
							Caption: caption,
							Click: {bindTo: "addRecord"},
							Tag: id,
							SchemaName: schemaName
						});
						menuItems.add(id, item);
					}, this);
				}
				return menuItems;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#initTypeColumnName
			 * @overridden
			 */
			initTypeColumnName: function() {
				this.set("TypeColumnName", "AnniversaryType");
			},

			/*
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
			 * @overridden
			 */
			getGridDataColumns: function() {
				var config = this.callParent(arguments);
				config.Description = {path: "Description"};
				config.Date = {path: "Date"};
				return config;
			},

			/**
			 * ############## ######### ##### ############### #######
			 * @protected
			 */
			initAnniversaryTypes: function(callback, scope) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "AnniversaryType"});
				esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
				var nameColumn = esq.addMacrosColumn(this.Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "Name");
				nameColumn.orderPosition = 1;
				nameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				esq.cacheLevel = "ClientPageSessionCache";
				esq.cacheKey = "AnniversaryType";
				esq.getEntityCollection(function(result) {
					var anniversaryTypes = Ext.create("Terrasoft.BaseViewModelCollection");
					if (result.success) {
						anniversaryTypes = result.collection;
					}
					this.set("Types", anniversaryTypes);
					callback.call(scope);
				}, this);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"type": "listed",
					"listedConfig": {
						"name": "DataGridListedConfig",
						"items": [
							{
								"name": "AnniversaryTypeListedGridColumn",
								"bindTo": "AnniversaryType",
								"position": {"column": 1, "colSpan": 12}
							},
							{
								"name": "DateListedGridColumn",
								"bindTo": "Date",
								"position": {"column": 13, "colSpan": 12}
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {"columns": 24, "rows": 1},
						"items": []
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


