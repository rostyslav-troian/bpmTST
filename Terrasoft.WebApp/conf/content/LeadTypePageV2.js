Terrasoft.configuration.Structures["LeadTypePageV2"] = {innerHierarchyStack: ["LeadTypePageV2Lead", "LeadTypePageV2"], structureParent: "BasePageV2"};
define('LeadTypePageV2LeadStructure', ['LeadTypePageV2LeadResources'], function(resources) {return {schemaUId:'203c8659-fbc7-44f4-b0cf-83edb17d3464',schemaCaption: "Edit page - Need type", parentSchemaName: "BasePageV2", schemaName:'LeadTypePageV2Lead',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadTypePageV2Structure', ['LeadTypePageV2Resources'], function(resources) {return {schemaUId:'047c209e-fc29-4787-8a01-ba8871c13963',schemaCaption: "Edit page - Need type", parentSchemaName: "LeadTypePageV2Lead", schemaName:'LeadTypePageV2',parentSchemaUId:'203c8659-fbc7-44f4-b0cf-83edb17d3464',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadTypePageV2Lead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadTypePageV2LeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadTypePageV2Lead", ["LeadTypePageV2Resources"], function(resources) {
	return {
		entitySchemaName: "LeadType",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 2,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1,
						"layoutName": "Header"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "ImageContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["image-edit-container"],
					"layout": {
						"column": 0,
						"row": 0,
						"rowSpan": 2,
						"colSpan": 2
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Description",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 2,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1,
						"layoutName": "Header"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageContainer",
				"propertyName": "items",
				"name": "Image",
				"values": {
					"getSrcMethod": "getSrcMethod",
					"onPhotoChange": "onImageChange",
					"beforeFileSelected": "beforeFileSelected",
					"readonly": false,
					"defaultImage": this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto),
					"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			/**
			 * ########## web-##### ###########.
			 * @private
			 * @return {String} Web-##### ###########.
			 */
			getSrcMethod: function() {
				var primaryImageColumnValue = this.get(this.primaryImageColumnName);
				if (primaryImageColumnValue) {
					return this.getSchemaImageUrl(primaryImageColumnValue);
				}
				return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultPhoto"));
			},

			/**
			 * ############ ######### ###########.
			 * @private
			 * @param {File} image ###########.
			 */
			onImageChange: function(image) {
				if (!image) {
					this.set(this.primaryImageColumnName, null);
					return;
				}
				this.Terrasoft.ImageApi.upload({
					file: image,
					onComplete: this.onImageUploaded,
					onError: this.Terrasoft.emptyFn,
					scope: this
				});
			},

			/**
			 * ######### ##### ########### ##### ### ########## # #### ######.
			 * @private
			 * @param {String} imageId ############# ###########.
			 */
			onImageUploaded: function(imageId) {
				var imageData = {
					value: imageId,
					displayValue: this.primaryImageColumnName
				};
				this.set("Image", imageData);
			}
		},
		rules: {}
	};
});

define("LeadTypePageV2", function() {
		return {
			entitySchemaName: "LeadType",
			details: /**SCHEMA_DETAILS*/{
				ProductInLeadTypeDetail: {
					schemaName: "ProductInLeadTypeDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "LeadType"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ProductInLeadTypeDetail",
					"values": {
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/,
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#getActions
				 * @overridden
				 */
				getActions: function() {
					var parentActions = this.callParent(arguments);
					if (parentActions && !this.getSchemaAdministratedByRecords()) {
						parentActions.clear();
					}
					return parentActions;
				}
			}
		};
	});


