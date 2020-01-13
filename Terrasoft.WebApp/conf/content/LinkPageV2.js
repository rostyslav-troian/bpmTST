Terrasoft.configuration.Structures["LinkPageV2"] = {innerHierarchyStack: ["LinkPageV2"], structureParent: "BasePageV2"};
define('LinkPageV2Structure', ['LinkPageV2Resources'], function(resources) {return {schemaUId:'75a62bde-4619-4b23-ab2b-575b8fbf7ec7',schemaCaption: "LinkPageV2", parentSchemaName: "BasePageV2", schemaName:'LinkPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LinkPageV2", ["terrasoft", "BusinessRuleModule", "ext-base", "sandbox", "ConfigurationConstants"],
function(Terrasoft, BusinessRuleModule, Ext, sandbox, ConfigurationConstants) {
	return {
		properties: {
			/**
			 * @private
			 */
			_isDenyEditAttachedFileDescriptionEnabled: true
		},

		methods: {

			/**
			 * @inheritdoc
			 * @overridden
			 */
			initHeaderCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc
			 * @overridden
			 */
			getHeader: function() {
				return this.entitySchema.caption;
			},

			/**
			 * @inheritdoc
			 * @overridden
			 */
			init: function() {
				var entitySchemaName = this.entitySchema.name;
				this.set("entitySchemaName", entitySchemaName);
				this.callParent(arguments);
				this.set("Type", {
					displayValue: "Type",
					value: ConfigurationConstants.FileType.Link
				});
				this._isDenyEditAttachedFileDescriptionEnabled =
					this.Terrasoft.Features.getIsEnabled("DenyEditAttachedFileDescription");
			},
			/**
			 * @override
			 * @returns {Terrasoft.EntitySchemaQuery}
			 */
			getEntitySchemaQuery: function() {
				let esq = this.callParent(arguments);
				if (!this._isDenyEditAttachedFileDescriptionEnabled) {
					esq.columns.removeByKey("Data");
				}
				return esq;
			}
		},

		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "LinkPageGeneralTabContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LinkPageGeneralTabContainer",
				"propertyName": "items",
				"name": "LinkPageGeneralBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LinkPageGeneralBlock",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"bindTo": "Name",
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "LinkPageGeneralBlock",
				"propertyName": "items",
				"name": "Notes",
				"values": {
					"bindTo": "Notes",
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12
					}
				}
			},
			{
				"operation": "remove",
				"name": "actions"
			},
			{
				"operation": "remove",
				"name": "ViewOptionsButton"
			}
		]/**SCHEMA_DIFF*/
	};
});


