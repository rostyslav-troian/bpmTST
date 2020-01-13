Terrasoft.configuration.Structures["SatisfactionLevelLookupEditPage"] = {innerHierarchyStack: ["SatisfactionLevelLookupEditPage"], structureParent: "BaseLookupPage"};
define('SatisfactionLevelLookupEditPageStructure', ['SatisfactionLevelLookupEditPageResources'], function(resources) {return {schemaUId:'70c873b3-7132-4a39-85b0-a1ce4a2ae8d1',schemaCaption: "SatisfactionLevelLookupEditPage", parentSchemaName: "BaseLookupPage", schemaName:'SatisfactionLevelLookupEditPage',parentSchemaUId:'0a254ad1-c2fb-43ae-ac4d-63932be0835b',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SatisfactionLevelLookupEditPage", ["ext-base", "terrasoft", "SatisfactionLevelLookupEditPageResources",
	"ContentImageUtilitiesV2"],
	function(Ext, Terrasoft, resources) {
		return {
			entitySchemaName: "SatisfactionLevel",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {},
			mixins: {
				/**
				 * @class ContentImageUtilities implements image content control.
				 */
				ContentImageUtilities: "Terrasoft.ContentImageUtilities"
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("Point", this.pointValueValidator);
				},

				/**
				 * Point required validator.
				 * @param {Object} value Column attribute value.
				 * @protected
				 * @return {Object} Point validation.
				 */
				pointValueValidator: function(value) {
					return {
						invalidMessage: (value < 1)
							? this.Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage
							: ""
					};
				}
			},
			rules: {},
			userCode: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "Name"
				},
				{
					"operation": "remove",
					"name": "Description"
				},
				{
					"operation": "insert",
					"name": "Name",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 7,
							"rowSpan": 1
						}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Point",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 7,
							"rowSpan": 1
						},
						"tip": {
							"content": {
								"bindTo": "Resources.Strings.PointTipMessage"
							}
						}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "Status",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 7,
							"rowSpan": 1
						}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "IsActive",
					"values": {
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 7,
							"rowSpan": 1
						}
					},
					"parentName": "Header",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ImageContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["image-edit-container"],
						"layout": {
							"column": 8,
							"row": 0,
							"rowSpan": 3,
							"colSpan": 2
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ImageContainer",
					"propertyName": "items",
					"name": "Image",
					"values": {
						"getSrcMethod": "getImageUrl",
						"onPhotoChange": "onImageChange",
						"readonly": false,
						"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultImage),
						"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


