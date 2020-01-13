Terrasoft.configuration.Structures["ContentUserBlockEditPage"] = {innerHierarchyStack: ["ContentUserBlockEditPage"]};
define('ContentUserBlockEditPageStructure', ['ContentUserBlockEditPageResources'], function(resources) {return {schemaUId:'dd832730-1fc6-41a6-a3c4-73f1fe3c96e1',schemaCaption: "ContentUserBlockEditPage", parentSchemaName: "", schemaName:'ContentUserBlockEditPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Page to select DCAttribute item from available atribute variants.
 */
define("ContentUserBlockEditPage", ["ContentUserBlockEditPageResources", "css!ContentUserBlockEditPageCSS",
		"ImageView"],
	function() {
		return {
			properties: {
				/**
				 * Maximum length for block name field.
				 */
				blockNameMaximumLength: 230
			},
			messages: {

				/**
				 * @message BlockSaved
				 * Message indicates need save current mj-block.
				 */
				"BlockSaved": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message SaveBlockCancel
				 * Message for canceling mj-block saving process.
				 */
				"SaveBlockCancel": {
					direction: Terrasoft.MessageDirectionType.PUBLISH,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {

				/**
				 * Block identifier.
				 * @type {Guid}
				 */
				"BlockId": {
					dataValueType: Terrasoft.DataValueType.GUID,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Block name.
				 * @type {String}
				 */
				"BlockName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isRequired: true
				},

				/**
				 * Block preview image url string.
				 * @type {String}
				 */
				"PreviewImage" : {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @private
				 */
				_createPreviewScreenshot: function() {
					this.$PreviewImage = this.get("Resources.Strings.BlockPreviewScreenshotImage");
					var block = Ext.get(this.$BlockId + "-content-mjblock");
					if (block && !Ext.isIE) {
						Terrasoft.convertElementToCanvas(block.id, {
							scale: 0.75,
							allowTaint: true,
							useCORS: true,
							ignoreElements: function (element) {
								return element.classList.contains("content-block-tools-wrap")
									|| element.classList.contains("placeholder-image");
							}
						},
						function(canvas) {
							var image = canvas.toDataURL();
							if (image) {
								this.$PreviewImage = image;
							}
						}, this);
					}
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this._createPreviewScreenshot();
				},

				/**
				 * Handler for listen when  block screenshot made.
				 * @protected
				 */
				onMjBlockScreenshotMade: function(result) {
					if (this.$BlockId !== result.blockId || !result.image ) {
						return;
					}
					var config = {
						source: Terrasoft.ImageSources.URL,
						url: result.image
					};
					this.$PreviewImage = Terrasoft.ImageUrlBuilder.getUrl(config);
				},

				/**
				 * Handler on save button pressed.
				 * Sends message BlockSaved to ContentBuilder.
				 * @protected
				 */
				onSaveButtonClick: function() {
					if (this.$BlockName && this.$BlockName !== Terrasoft.emptyString) {
						this.sandbox.publish("BlockSaved", {
							blockName: this.$BlockName.substring(0, this.blockNameMaximumLength),
							previewImage: this.$PreviewImage
						}, [this.sandbox.id]);
					}
				},

				/**
				 * Handler on cancel button pressed.
				 * Sends message SaveBlockCancel to ContentBuilder.
				 * @protected
				 */
				onCancelButtonClick: function() {
					this.sandbox.publish("SaveBlockCancel", null, [this.sandbox.id]);
				},

				/**
				 * Decides when save button enabled.
				 * @protected
				 * @returns {boolean} Returns true when PreviewImage is loaded and BlockName typed.
				 */
				getIsSaveButtonEnabled: function () {
					return this.$PreviewImage;
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "SaveBlockPageContainer",
					"propertyName": "items",
					"values": {
						"id": "SaveBlockPageContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "EditPageCaption",
					"parentName": "SaveBlockPageContainer",
					"propertyName": "items",
					"index": 1,
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"markerValue": "EditPageCaption",
						"caption": "$Resources.Strings.TitleCaption",
						"classes": {
							"labelClass": ["t-title-label-user-block-edit-page"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "BlockNameInputCaption",
					"parentName": "SaveBlockPageContainer",
					"propertyName": "items",
					"index": 1,
					"values": {
						"id": "BlockNameInputCaption",
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.BlockNameLabel",
						"classes": {
							"labelClass": ["t-label t-label-is-required"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "BlockName",
					"parentName": "SaveBlockPageContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.TEXT,
						"wrapClass": ["style-input"],
						"isRequired": true,
						"focused": true,
						"markerValue": "BlockName",
						"labelConfig": {
							"visible": false
						}
					}
				},
				{
					"operation": "insert",
					"name": "PreviewImageContainer",
					"parentName": "SaveBlockPageContainer",
					"propertyName": "items",
					"values": {
						"id": "PreviewImageContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["user-block-edit-page-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "PreviewImage",
					"parentName": "PreviewImageContainer",
					"propertyName": "items",
					"values": {
						"id": "PreviewImage",
						"itemType": this.Terrasoft.ViewItemType.COMPONENT,
						"wrapClasses": ["user-block-edit-page-preview-image"],
						"selectors": {
							"wrapEl": "#previewImage"
						},
						"className": "Terrasoft.ImageView",
						"imageSrc": "$PreviewImage",
						"tag": "PreviewImage"
					}
				},
				{
					"operation": "insert",
					"name": "EditButtonsContainer",
					"parentName": "SaveBlockPageContainer",
					"propertyName": "items",
					"values": {
						"id": "EditButtonsContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["user-block-edit-page-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CancelButton",
					"parentName": "EditButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "Cancel",
						"click": "$onCancelButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.DEFAULT
					}
				},
				{
					"operation": "insert",
					"name": "SaveButton",
					"parentName": "EditButtonsContainer",
					"propertyName": "items",
					"values": {
						"classes": {"textClass": ["actions-button-margin-right"]},
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": "Save",
						"click": "$onSaveButtonClick",
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"enabled": "$getIsSaveButtonEnabled"
					}
				}
			]
		};
	});


