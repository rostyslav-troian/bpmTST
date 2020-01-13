Terrasoft.configuration.Structures["PageTemplatePage"] = {innerHierarchyStack: ["PageTemplatePage"], structureParent: "BasePageV2"};
define('PageTemplatePageStructure', ['PageTemplatePageResources'], function(resources) {return {schemaUId:'bd46f78a-6903-4147-9596-b3d1037616e3',schemaCaption: "PageTemplatePage", parentSchemaName: "BasePageV2", schemaName:'PageTemplatePage',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BasePageV2
 */
define("PageTemplatePage", ["PageTemplatePageResources", "css!PageTemplatePageCSS"], function(resources) {
	return {
		entitySchemaName: "PageTemplate",
		attributes: {
			"PageSchema": {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				referenceSchemaName: "SysSchema",
				isRequired: true,
				lookupListConfig: {
					columns: ["UId"]
				}
			}
		},
		properties: {
			basePageTemplateUId: "21620f25-166f-42f1-8b4d-224a959040a3"
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_findPageTemplates: function() {
				var manager = Terrasoft.ClientUnitSchemaManager;
				var result = [this.basePageTemplateUId];
				manager.getItems().each(function(item) {
					if (manager.isInheritedFrom(item.uId, this.basePageTemplateUId)) {
						result.push(item.uId);
					}
				}, this);
				return result;
			},

			/**
			 * @private
			 */
			_initPageSchema: function() {
				var item = Terrasoft.ClientUnitSchemaManager.findItem(this.$PageSchemaUId);
				if (item) {
					this.$PageSchema = {
						Id: item.id,
						UId: item.uId,
						displayValue: item.caption,
						value: item.id
					};
				}
			},

			/**
			 * @private
			 */
			_getDefaultPreviewImage: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultTemplate);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function(callback, scope) {
				var parentMethod = this.getParentMethod();
				Terrasoft.chain(
					function(next) {
						Terrasoft.ClientUnitSchemaManager.initialize(next);
					},
					function() {
						parentMethod.call(this, callback, scope);
					},
					this
				);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				this._initPageSchema();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#save
			 * @override
			 */
			save: function() {
				this.$PageSchemaUId = this.$PageSchema && this.$PageSchema.UId;
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getLookupQueryFilters
			 * @override
			 */
			getLookupQueryFilters: function() {
				var filters = this.callParent(arguments);
				var templates = this._findPageTemplates();
				var groupAnd = Terrasoft.createFilterGroup();
				groupAnd.addItem(Terrasoft.createColumnInFilterWithParameters("UId", templates, Terrasoft.DataValueType.GUID));
				groupAnd.addItem(Terrasoft.createNotExistsFilter("[PageTemplate:PageSchemaUId:UId].Id"));
				var groupOr = new Terrasoft.FilterGroup({
					logicalOperation: Terrasoft.LogicalOperatorType.OR
				});
				groupOr.addItem(groupAnd);
				if (this.$PageSchemaUId) {
					groupOr.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "UId",
						this.$PageSchemaUId, Terrasoft.DataValueType.GUID));
				}
				filters.addItem(groupOr);
				return filters;
			},

			/**
			 * @inheritdoc BasePageV2#initActionButtonMenu
			 * @override
			 */
			initActionButtonMenu: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc BasePageV2#getPageHeaderCaption
			 * @override
			 */
			getPageHeaderCaption: function() {
				return this.$PageSchema && this.$PageSchema.displayValue;
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns preview image of the template.
			 * @return {String}.
			 */
			getPreviewImage: function() {
				return this.getSchemaImageUrl() || this._getDefaultPreviewImage();
			},

			/**
			 * Preview image change handler.
			 * @param {File} file Image file.
			 */
			onPreviewImageChange: function(file) {
				if (file) {
					Terrasoft.ImageApi.upload({
						file: file,
						onComplete: this.onPreviewImageUploaded,
						scope: this
					});
				} else {
					this.set(this.primaryImageColumnName, null);
				}
			},

			/**
			 * Preview image uploaded handler.
			 * @param {String} imageId Image ID.
			 */
			onPreviewImageUploaded: function(imageId) {
				var imageData = {
					value: imageId,
					displayValue: "PreviewImage"
				};
				this.set(this.primaryImageColumnName, imageData);
			}

			//endregion
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "EditContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["edit-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "EditContainer",
				"name": "PageSchema",
				"propertyName": "items",
				"values": {
					"caption": {"bindTo": "Resources.Strings.PageSchemaCaption"},
					"isRequired": true
				}
			},
			{
				"operation": "insert",
				"parentName": "EditContainer",
				"name": "Position",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"parentName": "EditContainer",
				"propertyName": "items",
				"name": "PageIconContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["control-width-15 page-icon-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "PageIconContainer",
				"propertyName": "items",
				"name": "PageIconLabelContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["label-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "PageIconLabelContainer",
				"name": "PageIconLabel",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.PageIconLabel"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "PageIconContainer",
				"propertyName": "items",
				"name": "PreviewImage",
				"values": {
					"getSrcMethod": "getPreviewImage",
					"onPhotoChange": "onPreviewImageChange",
					"readonly": false,
					"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultTemplate),
					"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


