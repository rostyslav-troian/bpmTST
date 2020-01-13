Terrasoft.configuration.Structures["LeadAccountProfileSchema"] = {innerHierarchyStack: ["LeadAccountProfileSchema"], structureParent: "AccountProfileSchema"};
define('LeadAccountProfileSchemaStructure', ['LeadAccountProfileSchemaResources'], function(resources) {return {schemaUId:'77a15413-73f7-4240-9381-822564e46a1d',schemaCaption: "Account Profile in Lead", parentSchemaName: "AccountProfileSchema", schemaName:'LeadAccountProfileSchema',parentSchemaUId:'e2ef070e-eb17-4c57-bfef-a826fb3d6d26',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Lead account profile class.
 * @class Terrasoft.LeadAccountProfileSchema
 */
define("LeadAccountProfileSchema", ["LeadAccountProfileSchemaResources", "LeadSimilarEntitiesProfileSchemaUtilities"],
	function(resources) {
		return {
			entitySchemaName: "Account",
			mixins: {
				LeadSimilarEntitiesUtilities: "Terrasoft.LeadSimilarEntitiesProfileSchemaUtilities"
			},
			attributes: {
				/**
				 * Virtual collection of Account entity primary column values.
				 */
				"SimilarCollection": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					"value": []
				},
				/**
				 * Enabled state of the Similar button.
				 */
				"SimilarButtonEnabled": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * The caption of the Similar button.
				 */
				"SimilarButtonCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: resources.localizableStrings.SimilarButtonCaption
				},
				/**
				 * The hint of the Similar button.
				 */
				"SimilarButtonHintText": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: resources.localizableStrings.SimilarButtonNotFoundHintText
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#onCardEntityInitialized
				 * @overridden
				 */
				onCardEntityInitialized: function() {
					this.callParent(arguments);
					this.initSimilarEntityRecordsCollection();
				},

				/**
				 * @inheritdoc Terrasoft.BaseProfileSchema#initEntity
				 * @overridden
				 */
				initEntity: function() {
					this.callParent(arguments);
					this.initSimilarEntityRecordsCollection();
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"name": "SimilarButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"textClass": "blank-slate-button"
						},
						"caption": {"bindTo": "SimilarButtonCaption"},
						"layout": {
							"column": 4,
							"row": 3,
							"colSpan": 20
						},
						"enabled": true,
						"visible": {"bindTo": "SimilarButtonEnabled"},
						"click": {"bindTo": "onSimilarButtonClick"},
						"tips": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SimilarButton",
					"propertyName": "tips",
					"name": "SimilarButtonTip",
					"values": {
						"content": {"bindTo": "SimilarButtonHintText"},
						"style": Terrasoft.TipStyle.GREEN,
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"tools": []
					}
				},
				{
					"operation": "merge",
					"name": "Industry",
					"values": {
						"layout": {
							"column": 4,
							"row": 2,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "merge",
					"name": "AccountCategory",
					"parentName": "ProfileContentContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "AccountCategory",
						"enabled": false,
						"layout": {
							"column": 4,
							"row": 3,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "remove",
					"name": "Type"
				},
				{
					"operation": "remove",
					"name": "Owner"
				},
				{
					"operation": "merge",
					"name": "Web",
					"parentName": "ProfileContentContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "Web",
						"enabled": false,
						"layout": {
							"column": 4,
							"row": 1,
							"colSpan": 20
						}
					}
				},
				{
					"operation": "remove",
					"name": "Phone"
				}
			]
		};
	});


