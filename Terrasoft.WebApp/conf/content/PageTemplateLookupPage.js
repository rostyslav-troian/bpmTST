Terrasoft.configuration.Structures["PageTemplateLookupPage"] = {innerHierarchyStack: ["PageTemplateLookupPage"]};
define('PageTemplateLookupPageStructure', ['PageTemplateLookupPageResources'], function(resources) {return {schemaUId:'f9ea0c63-f107-4968-9d68-48ffb5466ad7',schemaCaption: "PageTemplateLookupPage", parentSchemaName: "", schemaName:'PageTemplateLookupPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PageTemplateLookupPage", [
	"MaskHelper",
	"PageTemplateLookupPageResources",
	"PageTemplateViewModel",
	"PageDesignerModule",
	"PackageUtilities",
	"DashboardManager",
	"DetailManager"
], function(MaskHelper) {
	return {
		mixins: {
			PackageUtilities: "Terrasoft.PackageUtilities"
		},
		messages: {
			"GetModuleConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"GetModuleConfigResult": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"GetPackageUId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ReplaceHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			"PageTemplateCollection": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			"SelectedItem": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			_getPageTemplatesQuery: function() {
				return Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwPageTemplate",
					rowViewModelClassName: "Terrasoft.PageTemplateViewModel"
				});
			},

			/**
			 * @private
			 */
			_addPageTemplatesColumns: function(esq) {
				esq.addColumn("Id");
				esq.addColumn("PageSchemaName", "Name");
				var captionColumn = esq.addColumn("SchemaCaption", "Caption");
				captionColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				captionColumn.orderPosition = 1;
				esq.addColumn("PageSchemaUId");
				esq.addColumn("PreviewImage");
				var positionColumn = esq.addColumn("Position");
				positionColumn.orderDirection = Terrasoft.OrderDirection.ASC;
				positionColumn.orderPosition = 0;
			},

			/**
			 * @private
			 */
			_onLoadPageTemplates: function(collection, callback, scope) {
				collection.clear();
				var esq = this._getPageTemplatesQuery();
				this._addPageTemplatesColumns(esq);
				esq.getEntityCollection(function(response) {
					if (response.success) {
						collection.loadAll(response.collection);
						this._subscribePageTemplateViewModelEvent(collection);
					}
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			_subscribePageTemplateViewModelEvent: function(collection) {
				collection.each(function(viewModel) {
					viewModel.on("pageTemplateSelect", this._onPageTemplateLoad, this);
				}, this);
			},

			/**
			 * @private
			 */
			_subscribeModuleMessages: function() {
				var sandbox = this.sandbox;
				var moduleId = this._getPageDesignerModuleId();
				sandbox.subscribe("GetModuleConfig", this._onGetModuleConfig, this, [moduleId]);
				sandbox.subscribe("GetPackageUId", this._getPackageUId, this, [moduleId]);
			},

			/**
			 * @private
			 */
			_preparePageDesignerConfig: function(callback, scope) {
				const pageSchemaUId = this.$SelectedItem.$PageSchemaUId;
				Terrasoft.chain(
					function(next) {
						Terrasoft.ClientUnitSchemaManager.getInstanceByUId(pageSchemaUId, next, this);
					},
					function(next, clientUnitSchema) {
						callback.call(scope, {
							clientUnitSchema: clientUnitSchema,
							pageUId: pageSchemaUId
						});
					}, this
				);
			},

			/**
			 * @private
			 */
			_publishModuleConfig: function(config) {
				var moduleId = this._getPageDesignerModuleId();
				this.sandbox.publish("GetModuleConfigResult", config, [moduleId]);
			},

			/**
			 * @private
			 */
			_getPageDesignerModuleId: function() {
				return this.sandbox.id + "-page-designer-module";
			},

			/**
			 * @private
			 */
			_setSelectedItem: function(selectedItem) {
				this.$SelectedItem = selectedItem;
				this.$PageTemplateCollection.each(function(item) {
					item.$IsSelected = item.$Id === selectedItem.$Id;
				}, this);
			},

			/**
			 * @private
			 */
			_getPackageUId: function() {
				return this.packageUId;
			},

			/**
			 * @private
			 */
			_onGetModuleConfig: function() {
				this._preparePageDesignerConfig(function(config) {
					this._publishModuleConfig(config);
				}, this);
			},

			/**
			 * @private
			 */
			_onPageTemplateLoad: function(viewModel) {
				if (this.$SelectedItem && this.$SelectedItem.$Id === viewModel.$Id) {
					return;
				}
				this._setSelectedItem(viewModel);
				var containerId = "PageTemplateLookupPagePreviewContainer";
				var maskSelector = "#" + containerId;
				MaskHelper.ShowBodyMask({
					timeout: 0,
					selector: maskSelector,
					clearMasks: true
				});
				this.sandbox.loadModule("PageDesignerModule", {
					id: this._getPageDesignerModuleId(),
					renderTo: containerId,
					instanceConfig: {
						useHistoryState: false,
						isReadOnly: true,
						maskSelector: maskSelector
					}
				});
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.$PageTemplateCollection = new Terrasoft.BaseViewModelCollection();
				this._subscribeModuleMessages();
				var parentMethod = this.getParentMethod();
				Terrasoft.chain(
					parentMethod,
					this.mixins.PackageUtilities.initCurrentPackageUId.bind(this),
					function(next) {
						Terrasoft.DetailManager.initialize(next, this);
					},
					function() {
						this._onLoadPageTemplates(this.$PageTemplateCollection, callback, scope);
					}, this
				);
			},

			// endregion

			// region Methods: Public

			/**
			 * Handler of select button click.
			 */
			onSelect: function() {
				if (this.$SelectedItem) {
					MaskHelper.ShowBodyMask({
						timeout: 0
					});
					this.sandbox.unloadModule(this.sandbox.id);
					this.sandbox.publish("ReplaceHistoryState", {
						hash: "New/" + this.$SelectedItem.$PageSchemaUId
					});
				}
			},

			/**
			 * Handler of close button click.
			 */
			onClose: function() {
				window.close();
			},

			/**
			 * Loads first template page.
			 */
			loadFirstTemplate: function() {
				var firstItem = this.$PageTemplateCollection.first();
				if (firstItem) {
					this._onPageTemplateLoad(firstItem);
				}
			},

			/**
			 * Handler for click of SetupTemplatesButton.
			 */
			onSetupTemplatesButtonClick: function() {
				window.open("ViewModule.aspx#LookupSectionModule/PageTemplateSection");
			},

			/**
			 * Handler for page template item double click.
			 * @param {String} selectedItemId View model item ID.
			 */
			onPageTemplatesDblClick: function(selectedItemId) {
				this.$SelectedItem = this.$PageTemplateCollection.get(selectedItemId);
				this.onSelect();
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/ [
			{
				"operation": "insert",
				"parentName": "PageTemplateLookupPageContainer",
				"propertyName": "items",
				"name": "Header",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["header"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "SelectButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
					"classes": {
						"textClass": ["utils-button"],
						"wrapperClass": ["utils-button"]
					},
					"click": {"bindTo": "onSelect"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "CancelButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"classes": {
						"textClass": ["utils-button"],
						"wrapperClass": ["utils-button"]
					},
					"click": {"bindTo": "onClose"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Header",
				"propertyName": "items",
				"name": "closeIcon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["close-btn"]},
					"click": {"bindTo": "onClose"}
				}
			},
			{
				"operation": "insert",
				"parentName": "PageTemplateLookupPageContainer",
				"propertyName": "items",
				"name": "Content",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["content"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "Content",
				"propertyName": "items",
				"name": "LeftContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["left-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Title",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.Title"},
					"classes": {"labelClass": ["t-title"]}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "PageTemplates",
				"values": {
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"itemPrefix": "Id",
					"collection": "PageTemplateCollection",
					"rowCssSelector": ".page-template-item.selectable",
					"classes": {"wrapClassName": ["page-templates"]},
					"onItemDblClick": {"bindTo": "onPageTemplatesDblClick"},
					"defaultItemConfig": {}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "BottomContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["bottom-container"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BottomContainer",
				"propertyName": "items",
				"name": "SetupTemplatesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SetupTemplatesButtonCaption"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.SetupTemplates"},
					"classes": {"wrapperClass": ["setup-templates-button"]},
					"click": {"bindTo": "onSetupTemplatesButtonClick"},
					"tips": [{
						"style": Terrasoft.TipStyle.BLUE,
						"displayMode": Terrasoft.TipDisplayMode.NARROW,
						"restrictAlignType": Terrasoft.AlignType.TOP,
						"content": {"bindTo": "Resources.Strings.SetupTemplatesButtonHint"},
						"tools": []
					}]
				}
			},
			{
				"operation": "insert",
				"parentName": "PageTemplates",
				"propertyName": "defaultItemConfig",
				"name": "PageTemplateItem",
				"values": {
					"id": "item",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["page-template-item"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "PageTemplateItem",
				"propertyName": "items",
				"name": "itemView",
				"values": {
					"id": "item-view",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "itemView",
				"propertyName": "items",
				"name": "PageButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Caption"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "getTemplateItemImageConfig"},
					"iconAlign": Terrasoft.controls.ButtonEnums.iconAlign.TOP,
					"click": {"bindTo": "onPageTemplateClick"},
					"pressed": {"bindTo": "IsSelected"}
				}
			},
			{
				"operation": "insert",
				"parentName": "Content",
				"propertyName": "items",
				"name": "Preview",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["ts-box-sizing preview"]},
					"items": [],
					"afterrender": {"bindTo": "loadFirstTemplate"}
				}
			}
		] /**SCHEMA_DIFF*/
	};
});


