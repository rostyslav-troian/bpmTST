Terrasoft.configuration.Structures["ChangeDataUserTaskPropertiesPage"] = {innerHierarchyStack: ["ChangeDataUserTaskPropertiesPage"], structureParent: "BaseDataModificationUserTaskPropertiesPage"};
define('ChangeDataUserTaskPropertiesPageStructure', ['ChangeDataUserTaskPropertiesPageResources'], function(resources) {return {schemaUId:'f9c58aa4-3c7c-4266-a967-013164e169f1',schemaCaption: "ChangeDataUserTaskPropertiesPage", parentSchemaName: "BaseDataModificationUserTaskPropertiesPage", schemaName:'ChangeDataUserTaskPropertiesPage',parentSchemaUId:'e8f0a1bf-7dcf-497c-bc81-53f264cc1bdb',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseDataModificationUserTaskPropertiesPage
 */
define("ChangeDataUserTaskPropertiesPage", ["terrasoft", "ChangeDataUserTaskPropertiesPageResources",
	"EntityColumnMappingMixin"],
	function(Terrasoft) {
		return {
			mixins: {
				entityColumnMappingMixin: "Terrasoft.EntityColumnMappingMixin"
			},
			attributes: {},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc ProcessSchemaElementEditable#onElementDataLoad
				 * @overridden
				 */
				onElementDataLoad: function(element, callback, scope) {
					this.callParent([element, function() {
						this.initEntityColumnMappingMixin(element, callback, scope);
					}, this]);
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#saveParameters
				 * @overridden
				 */
				saveParameters: function(element) {
					this.callParent(arguments);
					this.saveEntityColumnMappings(element);
				},

				/**
				 * @inheritdoc EntityColumnMappingMixin#getEntityColumnMappingSchemaUId
				 * @overridden
				 */
				getEntityColumnMappingSchemaUId: function() {
					return this.getEntitySchemaUId();
				},

				/**
				 * @inheritdoc BaseDataModificationUserTaskPropertiesPage#onUpdatedEntitySchema
				 * @overridden
				 */
				onUpdatedEntitySchema: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					this.reInitEntityColumnMapping(element, Ext.emptyFn);
				}

				//endregion

			},
			diff: [

				// region ColumnValues

				{
					"operation": "insert",
					"parentName": "BaseDataModificationLayout",
					"propertyName": "items",
					"name": "ColumnValuesContainer",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {
							"bindTo": "ReferenceSchemaUId",
							"bindConfig": {
								"converter": function(value) {
									return !this.Ext.isEmpty(value);
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"name": "ColumnValuesLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "Resources.Strings.EntityColumnMapping_ColumnValuesLabelCaption"},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"name": "RecordColumnValuesContainer",
					"values": {
						"generator": "ConfigurationItemGenerator.generateContainerList",
						"idProperty": "Id",
						"collection": "EntityColumnMappingsControls",
						"onGetItemConfig": "getEntityColumnMappingsControlViewConfig",
						"classes": {
							"wrapClassName": ["record-column-values-container", "grid-layout"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ColumnValuesContainer",
					"propertyName": "items",
					"name": "AddRecordColumnValuesButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {
							"bindTo": "Resources.Strings.EntityColumnMapping_AddRecordColumnValuesButtonCaption"
						},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"classes": {
							"wrapperClass": ["add-record-column-values-button"]
						},
						"click": {"bindTo": "onAddEntityColumnMappings"}
					}
				}

				// endregion

			]
		};
	}
);


