Terrasoft.configuration.Structures["ProductCatalogueFolderManagerViewConfigGenerator"] = {innerHierarchyStack: ["ProductCatalogueFolderManagerViewConfigGenerator"]};
define('ProductCatalogueFolderManagerViewConfigGeneratorStructure', ['ProductCatalogueFolderManagerViewConfigGeneratorResources'], function(resources) {return {schemaUId:'0653442d-b307-4e0f-8fc1-3f5e7345a261',schemaCaption: "View config generator for  product catalogue FolderManager", parentSchemaName: "", schemaName:'ProductCatalogueFolderManagerViewConfigGenerator',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductCatalogueFolderManagerViewConfigGenerator", [
		"ProductCatalogueFolderManagerViewConfigGeneratorResources", "FolderManagerViewConfigGenerator"],
	function(resources) {
		return Ext.define("Terrasoft.ProductCatalogueFolderManagerViewConfigGenerator", {
			extend: "Terrasoft.FolderManagerViewConfigGenerator",

			/**
			 * @inheritdoc Terrasoft.FolderManagerViewConfigGenerator#getFolderManagerContainerConfig
			 * @override
			 */
			getFolderManagerContainerConfig: function() {
				var extendCatalogueFilterContainerId = "extendCatalogueFilterContainer_" + this.sandbox.id;
				var baseConfig = this.callParent(arguments);
				baseConfig.items.push({
					className: "Terrasoft.Container",
					id: extendCatalogueFilterContainerId,
					selectors: {wrapEl: "#" + extendCatalogueFilterContainerId},
					classes: {wrapClassName: ["extend-catalogue-filter-container"]},
					visible: {bindTo: "IsExtendCatalogueFilterContainerVisible"},
					items: []
				});
				return baseConfig;
			},

			/**
			 * @inheritdoc Terrasoft.FolderManagerViewConfigGenerator#getFolderContainerConfig
			 * @override
			 */
			getFolderContainerConfig: function() {
				var baseConfig = this.callParent(arguments);
				var visibleConfig = {
					visible: {
						bindTo: "IsFoldersContainerVisible"
					}
				};
				Ext.merge(baseConfig, visibleConfig);
				return baseConfig;
			},

			/**
			 * @inheritdoc Terrasoft.FolderManagerViewConfigGenerator#getHeaderConfig
			 * @override
			 */
			getHeaderConfig: function() {
				var baseConfig = this.callParent(arguments);
				var visibleConfig = {
					visible: {
						bindTo: "IsCloseButtonVisible"
					}
				};
				var closeButton = Terrasoft.findItem(baseConfig, {tag: "CloseButton"});
				if (closeButton) {
					Ext.merge(baseConfig.items[closeButton.index], visibleConfig);
				}
				return baseConfig;
			},

			/**
			 * @inheritdoc Terrasoft.FolderManagerViewConfigGenerator#getFolderGridActiveRowActionsConfig
			 * @override
			 */
			getFolderGridActiveRowActionsConfig: function() {
				var baseConfig = this.callParent(arguments);
				var visibleConfig = {
					visible: {
						bindTo: "IsInCatalogue",
						bindConfig: {
							converter: function(isInCatalogue) {
								return !isInCatalogue && !Ext.isEmpty(this.get("Parent"));
							}
						}
					}
				};
				var favorites = Terrasoft.findItem(baseConfig, {tag: "favorite"});
				if (favorites) {
					Ext.merge(baseConfig[favorites.index], visibleConfig);
				}
				var settings = Terrasoft.findItem(baseConfig, {tag: "folderMenuActions"});
				if (settings) {
					Ext.merge(baseConfig[settings.index], visibleConfig);
				}
				baseConfig.push(this.getCatalogueFolderFilterConfig());
				return baseConfig;
			},

			/**
			 * Returns catalogue folder filter config.
			 * @return {Object} Catalogue folder filter config.
			 */
			getCatalogueFolderFilterConfig: function() {
				return {
					className: "Terrasoft.Button",
					classes: {wrapperClass: "folder-catalogue-actions-icon"},
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					tag: "extendFilter",
					imageConfig: resources.localizableImages.SpecificationFilterImageV2,
					visible: {
						bindTo: "IsInCatalogue",
						bindConfig: {
							converter: function(isInCatalogue) {
								return (
									isInCatalogue &&
									!Ext.isEmpty(this.get("Parent")) &&
									this.get("IsOpenFilterButtonVisible")
								);
							}
						}
					}
				};
			}
		});
	});


