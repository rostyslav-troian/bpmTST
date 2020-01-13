Terrasoft.configuration.Structures["ContentMjmlImagePropertiesPage"] = {innerHierarchyStack: ["ContentMjmlImagePropertiesPage"], structureParent: "ContentImagePropertiesPage"};
define('ContentMjmlImagePropertiesPageStructure', ['ContentMjmlImagePropertiesPageResources'], function(resources) {return {schemaUId:'e7cba58d-3818-4bab-97a7-19496c7f16e7',schemaCaption: "ContentMjmlImagePropertiesPage", parentSchemaName: "ContentImagePropertiesPage", schemaName:'ContentMjmlImagePropertiesPage',parentSchemaUId:'01bd8f21-917d-4b9e-815c-3b521a15d40e',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentMjmlImagePropertiesPage", ["css!ContentMjmlImagePropertiesPageCSS"], function() {
	return {
		diff: [
			{
				"operation": "remove",
				"name": "ImageGroup"
			},
			{
				"operation": "insert",
				"name": "ImageSettingsGroup",
				"parentName": "ContentImagePropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.ImageSettingsGroupCaption"
				},
				"index": 0
			},
			{
				"operation": "insert",
				"parentName": "ImageSettingsGroup",
				"name": "ImageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["image-properties-wrapper"],
					"visible": {
						"bindTo": "Config",
						"bindConfig": {
							"converter": "toBoolean"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "DesktopImage",
				"parentName": "ImageContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "DesktopImage",
				"name": "ImageUploadGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "UploadImage",
				"parentName": "ImageUploadGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["icon-16x16 image-icon"]
				}
			},
			{
				"operation": "insert",
				"name": "Image",
				"parentName": "ImageUploadGroup",
				"propertyName": "items",
				"values": {
					"value": "$DisplayValue",
					"caption": "image",
					"markerValue": "Image",
					"wrapClass": ["url-placeholder", "control-editor-wrapper", "hide-label"],
					"controlConfig": {
						"placeholder": "$Resources.Strings.ImageUrlPlaceholder",
						"hasClearIcon": true,
						"cleariconclick": "$removeImageAttributes"
					},
					"classes": {
						"wrapClassName": ["show-placeholder"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageUploadGroup",
				"name": "UploadImageButton",
				"propertyName": "items",
				"values": {
					"generateId": false,
					"imageConfig": "$Resources.Images.UploadBackgroundImage",
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"fileTypeFilter": ["image/*"],
					"fileUpload": true,
					"filesSelected": "$onImageSelected",
					"fileUploadMultiSelect": false,
					"markerValue": "UploadImageButton",
					"classes": {"wrapperClass": ["upload-image-icon-wrapper"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageContainer",
				"name": "ImageLinkGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageLinkGroup",
				"propertyName": "items",
				"name": "Link",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Link",
					"markerValue": "Link",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.ImageHrefLabel"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageContainer",
				"name": "ImageTitleContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageTitleContainer",
				"propertyName": "items",
				"name": "ImageTitle",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$ImageTitle",
					"markerValue": "ImageTitle",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.ImageTitleText"
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageContainer",
				"name": "ImageAltGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageAltGroup",
				"propertyName": "items",
				"name": "Alt",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Alt",
					"markerValue": "Alt",
					"wrapClass": ["style-input"],
					"labelConfig": {
						"caption": "$Resources.Strings.ImageAltText"
					}
				}
			},
			{
				"operation": "insert",
				"name": "ImageSizeGroup",
				"parentName": "ContentImagePropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"caption": "$Resources.Strings.SizeGroupCaption"
				},
				"index": 1
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeGroup",
				"name": "ImageSizeContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["control-editor-wrapper"]
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeContainer",
				"propertyName": "items",
				"name": "Width",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Width",
					"markerValue": "Width",
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.ImageWidth"
					},
					"classes": {"wrapClassName": ["show-placeholder"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "ImageSizeContainer",
				"propertyName": "items",
				"name": "Height",
				"values": {
					"itemType": Terrasoft.ViewItemType.TEXT,
					"value": "$Height",
					"markerValue": "Height",
					"wrapClass": ["style-input"],
					"controlConfig": {"placeholder": "$Resources.Strings.PlaceholderAutoText"},
					"labelConfig": {
						"caption": "$Resources.Strings.ImageHeight"
					},
					"classes": {"wrapClassName": ["show-placeholder"]}
				}
			}
		]
	};
});


