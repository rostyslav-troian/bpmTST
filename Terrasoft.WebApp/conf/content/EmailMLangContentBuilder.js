Terrasoft.configuration.Structures["EmailMLangContentBuilder"] = {innerHierarchyStack: ["EmailMLangContentBuilder"], structureParent: "EmailContentBuilder"};
define('EmailMLangContentBuilderStructure', ['EmailMLangContentBuilderResources'], function(resources) {return {schemaUId:'923c2a8a-024f-4ea5-988d-929e335fdaea',schemaCaption: "EmailMLangContentBuilder", parentSchemaName: "EmailContentBuilder", schemaName:'EmailMLangContentBuilder',parentSchemaUId:'ab75212f-7de6-4f93-a268-429bfab61422',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmailMLangContentBuilder", ["EmailTemplateMLangContentBuilderEnumsModule", "ContentBuilderHelper",
		"css!ContentBuilderCSS"],
	function(EMLangContentBuilderEnumsModule) {
		return {
			attributes: {
                /**
                 * Parent entity identifier.
                 */
				"ParentEntityId": {
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.EmailContentBuilder#getContentBuilderEnumsConfig
				 * @overriden
				 */
				getContentBuilderEnumsConfig: function(contentBuilderMode) {
					return EMLangContentBuilderEnumsModule.getContentBuilderConfig(contentBuilderMode);
				},

				/**
				 * @inheritdoc Terrasoft.EmailContentBuilder#initParameters
				 * @overriden
				 */
				initParameters: function() {
					this.callParent(arguments);
					var config = this.get("ContentBuilderConfig");
					var parameters = this.getParameters();
					config.TemplateBodyColumnName = parameters[4];
				},

				/**
				 * @inheritdoc Terrasoft.EmailContentBuilder#getContentSheetESQ
				 * @overriden
				 */
				getContentSheetESQ: function() {
					var esq = this.callParent(arguments);
					var contentBuilderConfig = this.get("ContentBuilderConfig");
					if (!this.Ext.isEmpty(contentBuilderConfig.ParentEntityColumnName)) {
						esq.addColumn(contentBuilderConfig.ParentEntityColumnName);
					}
					return esq;
				},

				/**
				 * @inheritdoc Terrasoft.EmailContentBuilder#setContentSheetConfig
				 * @overriden
				 */
				setContentSheetConfig: function(entity) {
					var contentBuilderConfig = this.get("ContentBuilderConfig");
					this.set("ParentEntityId", entity.get(contentBuilderConfig.ParentEntityColumnName).value);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.EmailContentBuilder#getParametersForEmailTemplateFile
				 * @overriden
				 */
				getParametersForEmailTemplateFile: function() {
					var parameters = this.callParent(arguments);
					var parentEntityId = this.get("ParentEntityId");
					if (parentEntityId) {
						parameters.EmailTemplate.value = parentEntityId;
					}
					return parameters;
				}
			}
		};
	});


