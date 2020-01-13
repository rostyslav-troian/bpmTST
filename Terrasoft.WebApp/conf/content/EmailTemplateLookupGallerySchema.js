Terrasoft.configuration.Structures["EmailTemplateLookupGallerySchema"] = {innerHierarchyStack: ["EmailTemplateLookupGallerySchema"]};
define('EmailTemplateLookupGallerySchemaStructure', ['EmailTemplateLookupGallerySchemaResources'], function(resources) {return {schemaUId:'167c6290-8e09-496e-859a-2fe3c65d1782',schemaCaption: "EmailTemplateLookupGallerySchema", parentSchemaName: "", schemaName:'EmailTemplateLookupGallerySchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
var dependencies = ["ModalBox", "EmailTemplateLookupGallerySchemaResources",
	"css!EmailTemplateLookupGallerySchemaCSS"];
if (!this.Ext.isIEOrEdge){
	dependencies.push("EmailTemplateLookupGalleryElement");
}
define("EmailTemplateLookupGallerySchema", dependencies,
	function(ModalBox, resources) {
		return {
			attributes: {
					/**
					 * Contains value that use for template filtration by 'ConfgType' field.
					 */
					"TemplateConfigType": {
						dataValueType: this.Terrasoft.DataValueType.INTEGER,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/**
					 * Is should show blank slate.
					 */
					"IsBlankSlateVisible": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": false
					}
			},
			messages: {
					/**
					 * @message BulkEmailContentBuilderAction
					 * Emit bulk email content builder actions.
					 */
					"BulkEmailContentBuilderAction": {
						"mode": this.Terrasoft.MessageMode.PTP,
						"direction": this.Terrasoft.MessageDirectionType.PUBLISH
					}
			},
			methods: {
				/**
				 * @private
				 */
				_performTemplateLoading: function(templateId) {
					var messageConfig = {
						actionType: this.Terrasoft.BulkEmailContentBuilderActions.LoadTemplateFromLookup,
						config: {
							emailTemplateId: templateId
						}
					};
					this.sandbox.publish("BulkEmailContentBuilderAction", messageConfig);
				},

				/**
				* @private
				*/
				_addResources: function(element) {
					element.resources = resources;
				},

				/**
				* @private
				*/
				_addEventListeners: function(element) {
					element.addEventListener("Selected", this._onSelected.bind(this));
					element.addEventListener("Canceled", this._onCanceled.bind(this));
				},

				/**
				* @private
				*/
				_addDefaultSetting: function(element) {
					element.templateType = this.$TemplateConfigType;
				},


				/**
				 * @private
				 */
				_closeGallery: function() {
					ModalBox.close();
				},

				/**
				* @private
				*/
				_onSelected: function(value) {
					const templateId = value.detail.recordIds[0]
					this._performTemplateLoading(templateId);
					this._closeGallery();
				},

				/**
				* @private
				*/
				_onCanceled: function(value) {
					this._closeGallery();
				},

				/**
				 * @private
				 */
				_addAngularElementSelector: function() {
					const element = document.createElement("ts-email-template-lookup-gallery");
					this._addEventListeners(element)
					this._addResources(element);
					this._addDefaultSetting(element);
					document.querySelector("#GalleryContainer").appendChild(element);
				},

				/**
				 * Returns blank slate icon url.
				 * @protected
				 * @virtual
				 * @return {String} Blank slate icon url.
				 */
				getBlankSlateIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.BlankSlateIcon"));
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					this.$IsBlankSlateVisible = this.Ext.isIEOrEdge;
					if (!this.$IsBlankSlateVisible){
						this._addAngularElementSelector();
					}
				}
			},
			diff: [
				{
					"name": "GalleryContainer",
					"operation": "insert",
					"values": {
						"id": "GalleryContainer",
						"items": [],
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"styles": {
								"height": "100%",
								"width": "100%"
						},
						"visible": {
							"bindTo": "IsBlankSlateVisible",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateContainer",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"wrapClassName": ["blank-slate-wrap"]
						},
						"styles": {
							"height": "100%",
							"width": "100%"
						},
						"visible": "$IsBlankSlateVisible",
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateContainerHeader",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["blank-slate-wrap-header"]
						},
						"visible": "$IsBlankSlateVisible",
						"items": [],
						"styles": {
							"height": "100%",
							"width": "100%"
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 0
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "BlankSlateContainerHeader",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"imageConfig": "$Resources.Images.CloseIcon",
						"click": "$_closeGallery",
						"classes": {
							"wrapperClass": ["close-btn-user-class"]
						},
						"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateIcon",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getBlankSlateIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["blank-slate-icon"]
						},
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24,
							"rowSpan": 5
						}
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateDescription",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.BlankSlateDescription",
						"labelClass": ["blank-slate-description"],
						"layout": {
							"column": 3,
							"row": 6,
							"colSpan": 20,
							"rowSpan": 6
						}
					}
				}
			]
		};
});


