Terrasoft.configuration.Structures["UserTaskPropertiesPage"] = {innerHierarchyStack: ["UserTaskPropertiesPage"], structureParent: "SubProcessPropertiesPage"};
define('UserTaskPropertiesPageStructure', ['UserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'1191e2ac-2291-4ed3-bc9e-93ca87119f6c',schemaCaption: "User task element properties edit page", parentSchemaName: "SubProcessPropertiesPage", schemaName:'UserTaskPropertiesPage',parentSchemaUId:'9815bf5c-4a99-43a4-a5ca-60a6a2fb98ee',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: SubProcessPropertiesPage
 */
define("UserTaskPropertiesPage", ["terrasoft", "UserTaskPropertiesPageResources", "ProcessModuleUtilities"],
		function(Terrasoft, resources, Utilities) {
	return {
		properties: {
			/**
			 * @inheritdoc RootUserTaskPropertiesPage.properties#schemaManagerName
			 * @override
			 */
			schemaManagerName: "ProcessUserTaskSchemaManager"
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc SubProcessPropertiesPage#initSchema
			 * @override
			 */
			initSchema: function(element, callback, scope) {
				this.on("change:Schema", this.onBeforeSchemaChanged, this);
				var schemaUId = element.schemaUId;
				if (Terrasoft.isEmpty(schemaUId)) {
					callback.call(scope);
					return;
				}
				this.getSchemaByUId(schemaUId, function(schema) {
					this.set("Schema", schema, {silent: true});
					callback.call(scope);
				}, this);
			},

			/**
			 * @inheritdoc SubProcessPropertiesPage#getSchemaListFilter
			 * @override
			 */
			getSchemaListFilter: function(callback) {
				this.callParent([function(filter) {
					var esq = new Terrasoft.EntitySchemaQuery("SysProcessUserTask");
					esq.addColumn("SysUserTaskSchemaUId");
					esq.getEntityCollection(function(result) {
						var collection = result.collection;
						if (collection && collection.getCount() > 0) {
							var excludedSchemas = filter.ExcludedSchemas;
							collection.each(function(row) {
								excludedSchemas.push(row.get("SysUserTaskSchemaUId"));
							}, this);
							callback(filter);
						}
					}, this);
				}]);
			},

			/**
			 * @inheritdoc SubProcessPropertiesPage#getSchemaList
			 * @override
			 */
			getSchemaList: function(callback, scope) {
				scope = scope || this;
				this.getSchemaListFilter(function(filter) {
					Utilities.getSchemasByFilter(filter, callback, scope);
				});
			},

			/**
			 * @inheritdoc SubProcessPropertiesPage#onOpenSchemaDesignerButtonClick
			 * @override
			 */
			onOpenSchemaDesignerButtonClick: function() {
				var schemaUId = this.get("Schema").value;
				Utilities.show5xExistingUserTaskSchemaDesigner(schemaUId);
			},

			/**
			 * @inheritdoc SubProcessPropertiesPage#synchronizeParameters
			 * @override
			 */
			synchronizeParameters: function(processElement, userTaskSchema) {
				this.callParent(arguments);
				this.initIsAfterActivitySaveScriptEditVisible(userTaskSchema, Terrasoft.emptyFn, this);
			},

			/**
			 * @inheritdoc SubProcessPropertiesPage#getSchemaInstance
			 * @override
			 */
			getSubProcessSchemaInstance: function(schemaUId, callback, scope) {
				if (Terrasoft.isEmpty(schemaUId)) {
					Ext.callback(callback, scope);
				} else {
					Terrasoft.ProcessUserTaskSchemaManager.forceGetInstanceByUId(schemaUId, callback, scope);
				}
			}

			//endregion
		},
		diff: /**SCHEMA_DIFF*/[
			{
			"operation": "merge",
			"name": "OpenSchemaDesignerButton",
			"values": {
					"hint": {"bindTo": "Resources.Strings.OpenSchemaButtonHintCaption"},
					"imageConfig": {"bindTo": "Resources.Images.OpenButtonImage"},
					"enabled": {"bindTo": "Schema"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


