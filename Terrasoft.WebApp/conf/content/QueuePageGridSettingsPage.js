Terrasoft.configuration.Structures["QueuePageGridSettingsPage"] = {innerHierarchyStack: ["QueuePageGridSettingsPage"], structureParent: "GridSettingsPage"};
define('QueuePageGridSettingsPageStructure', ['QueuePageGridSettingsPageResources'], function(resources) {return {schemaUId:'7480a78f-5925-4437-9a03-9687be55d576',schemaCaption: "QueuePageGridSettingsPage", parentSchemaName: "GridSettingsPage", schemaName:'QueuePageGridSettingsPage',parentSchemaUId:'3627e186-b93e-4970-901b-a740c3e07b4a',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("QueuePageGridSettingsPage", [], function() {
	return {
		attributes: {
			/**
			 * Related entity column path reverse relation join string.
		 	* @type {String}
		 	*/
			"RelatedEntityColumnPathPrefix": {dataValueType: Terrasoft.DataValueType.STRING}
		},
		methods: {

			//region Methods: protected

			/**
			 * @inheritdoc Terrasoft.GridSettingsPage#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.$RelatedEntityColumnPathPrefix = Ext.String.format("[{0}:Id:EntityRecordId]", this.entityColumns.EntityRecordId.referenceSchemaName);
					this.Ext.callback(callback, scope || this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.transformColumn#init
			 * @override
			 */
			transformColumn: function(config) {
				var column = config.column;
				if(config.doNotSaveProfile && Ext.String.startsWith(column.metaPath, "EntityRecord")) {
					column.metaPath = this.$RelatedEntityColumnPathPrefix + column.metaPath.replace("EntityRecord", "");
					column.bindTo = column.metaPath;
				}
				return column;
			}

			//endregion
		},
		diff: []
	};
});
 

