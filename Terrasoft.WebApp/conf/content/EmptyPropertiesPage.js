Terrasoft.configuration.Structures["EmptyPropertiesPage"] = {innerHierarchyStack: ["EmptyPropertiesPage"]};
define('EmptyPropertiesPageStructure', ['EmptyPropertiesPageResources'], function(resources) {return {schemaUId:'7f0713e6-e446-49c7-8e9c-29cb02096596',schemaCaption: "EmptyPropertiesPage", parentSchemaName: "", schemaName:'EmptyPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmptyPropertiesPage", ["ext-base", "terrasoft", "EmptyPropertiesPageResources", "AcademyUtilities",
		"HtmlControlGeneratorV2"],
	function(Ext, Terrasoft, resources, AcademyUtilities) {
		return {
			mixins: {
				editable: "Terrasoft.ProcessSchemaElementEditable"
			},
			messages: {
				"HidePropertyPage": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {
				"AcademyMessage": {
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			},
			methods: {

				//region Methods: Private

				/**
				 * Init AcademyMessage attribute with help URL by DcmSchemaDesigner.
				 * @private
				 */
				initAcademyMessage: function() {
					var config = {
						contextHelpCode: "DcmSchemaDesigner",
						callback: this.onGetAcademyUrlCallback,
						scope: this
					};
					AcademyUtilities.getUrl(config);
				},

				/**
				 * Handler for getUrl callback of AcademyUtilities.
				 * @private
				 * @param {String} url Help academy url.
				 */
				onGetAcademyUrlCallback: function(url) {
					var description = this.get("Resources.Strings.AcademyMessage");
					var startTagPart = "";
					var endTagPart = "";
					if (!Ext.isEmpty(url)) {
						startTagPart = "<a target=\"_blank\" href=\"" + url + "\">";
						endTagPart = "</a>";
					}
					var academyMessage = Ext.String.format(description, startTagPart, endTagPart);
					this.set("AcademyMessage", academyMessage);
				},

				/**
				 * The method of obtaining the image url.
				 * @private
				 * @return {String}
				 */
				getNotSelectImage: function() {
					return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.EmptyImage);
				},

				//endregion

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.initAcademyMessage();
					callback.call(scope);
				},

				/**
				 * The event handler clicking on the close button.
				 * @protected
				 */
				onHidePropertyPage: function() {
					this.sandbox.publish("HidePropertyPage");
				},

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.mixins.editable.onDestroy.call(this);
					this.callParent(arguments);
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "EmptyPropertiesContainer",
					"values": {
						"id": "EmptyPropertiesContainer",
						"selectors": {"wrapEl": "#EmptyPropertiesContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["empty-properties-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmptyPropertiesContainer",
					"propertyName": "items",
					"name": "ToolsContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["tools-container-wrapClass"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ToolsContainer",
					"propertyName": "items",
					"name": "CloseButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							"imageClass": ["button-background-no-repeat"],
							"wrapperClass": ["close-button-wrapClass"]
						},
						"click": {
							"bindTo": "onHidePropertyPage"
						},
						"imageConfig": {
							"bindTo": "Resources.Images.CloseButtonImage"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmptyPropertiesContainer",
					"propertyName": "items",
					"name": "ImageContainer",
					"values": {
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"onPhotoChange": Terrasoft.emptyFn,
						"getSrcMethod": "getNotSelectImage",
						"classes": {
							"wrapClass": ["image-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmptyPropertiesContainer",
					"propertyName": "items",
					"name": "DescriptionLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.EmptyPageCaption"
						},
						"classes": {
							"labelClass": [
								"description-label"
							],
							"wrapClass": [
								"description-wrap"
							]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmptyPropertiesContainer",
					"propertyName": "items",
					"name": "AcademyMessageContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["academy-message-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AcademyMessageContainer",
					"propertyName": "items",
					"name": "AcademyMessageHtmlControl",
					"values": {
						"generator": "HtmlControlGeneratorV2.generateHtmlControl",
						"htmlContent": {
							"bindTo": "AcademyMessage"
						},
						"classes": {
							"wrapClass": ["t-label"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


