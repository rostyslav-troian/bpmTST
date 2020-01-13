Terrasoft.configuration.Structures["BasePublisherAttachmentPage"] = {innerHierarchyStack: ["BasePublisherAttachmentPage"]};
define('BasePublisherAttachmentPageStructure', ['BasePublisherAttachmentPageResources'], function(resources) {return {schemaUId:'629b4c4a-519f-4dd5-9940-2ec8741ea938',schemaCaption: "BasePublisherAttachmentPage", parentSchemaName: "", schemaName:'BasePublisherAttachmentPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BasePublisherAttachmentPage", ["MessageConstants", "MultilineLabel", "css!MultilineLabel"],
	function(MessageConstants) {
		return {
			entitySchemaName: "File",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {
				init: function() {
					this.set("FilesList", new Terrasoft.Collection());
				},

				/**
				 * Returns attachment link.
				 * @protected
				 * @virtual
				 */
				getAttachmentLink: function() {
					var currentSchema = this.entitySchemaName;
					var schemas = this.Terrasoft.EntitySchemaManager.getItems();
					var fileSchema = schemas.filterByFn(function(item) {
						return item.name === currentSchema;
					}).getByIndex(0);

					return this.Ext.String.format(MessageConstants.UrlTemplate.FileUrlTemplate,
						fileSchema.uId, this.get("Id"), this.get("Name"));
				},

				/**
				 * Returns attachment delete image url.
				 * @protected
				 * @virtual
				 * @return {String} Image url.
				 */
				getAttachmentDeleteImageUrl: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.AttachementDeleteIamge"));
				},

				/**
				 * Delete attachment.
				 * @protected
				 * @virtual
				 */
				deleteAttachment: function() {
					var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
							rootSchemaName: this.entitySchemaName
						});
					var recordId = this.get("Id");
					deleteQuery.filters.add(deleteQuery.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", recordId));
					deleteQuery.execute(function(response) {
						if (response && response.success) {
							var filesListItems = this.values.filesList;
							filesListItems.remove(filesListItems.collection.getByKey(this.get("Id")));
						}
					}, this);
				},

				/**
				 * Returns module ID of publisher.
				 * @private
				 * @return {String} Sandbox identifier for message history.
				 */
				getMessagePublisherSandboxId: this.Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "AttachmentWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "AttachmentWrapContainer",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 1
						},
						"markerValue": "AttachmentWrapContainer",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["attachmentWrap"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttachmentLink",
					"parentName": "AttachmentWrapContainer",
					"propertyName": "items",
					"values": {
						"generator": function() {
							return {
								"markerValue": "AttachmentLink",
								"className": "Terrasoft.MultilineLabel",
								"classes": {
									"multilineLabelClass": ["attachmentLink"]
								},
								"caption": {
									"bindTo": "getAttachmentLink"
								},
								"showLinks": true
							};
						}
					}
				},
				{
					"operation": "insert",
					"name": "AttachmentDeleteImage",
					"parentName": "AttachmentWrapContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getAttachmentDeleteImageUrl",
						"onPhotoChange": this.Terrasoft.emptyFn,
						"readonly": true,
						"classes": {
							"wrapClass": ["attachmentDeleteImage"]
						},
						"markerValue": "AttachmentDeleteImage",
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"onImageClick": {
							"bindTo": "deleteAttachment"
						},
						"visible": true
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


