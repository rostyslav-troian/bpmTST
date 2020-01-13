Terrasoft.configuration.Structures["PageDesigner"] = {innerHierarchyStack: ["PageDesigner"]};
define("PageDesigner", ["ext-base", "PageDesignerResources", "SectionDesignDataModule", "DesignViewGeneratorV2",
	"DesignSchemaBuilder", "SectionDesignerUtils", "DesignViewModelV2", "PageDesignerUtilities"],
	function(Ext, resources, designData, designViewGenerator, schemaBuilder, sectionDesignerUtils, designViewModel,
			PageDesignerUtilities) {

		/**
		 * ##### ###### ######### ########
		 */
		var pageDesignerClass = Ext.define("Terrasoft.configuration.PageDesigner", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.PageDesigner",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * ####### ####, ### ###### ############### ##########
			 * @private
			 * @type {Boolean}
			 */
			isAsync: true,

			/**
			 * ###### ############# #########
			 * @private
			 * @type {Terrasoft.BaseViewModel}
			 */
			viewModel: null,

			/**
			 * ######## ####### ############# #########
			 * @private
			 * @type {Ext.Element}
			 */
			renderContainer: null,

			/**
			 * ############ ############# #########. ############ ### ############# ##### ############# # ##########.
			 * ##### ########## #########, ##########.
			 * @private
			 * @type {Terrasoft.Component}
			 */
			schemaView: null,

			/**
			 * ########## ######### ### ########### ####### ########.
			 * @private
			 * @type {RegExp}
			 */
			resourceColumnRegex: /^Resources\.(?:Strings|Images)\.(\S*)/,

			header: "",

			/**
			 * ########## ### ############# #####.
			 * @private
			 * returns {String} ### ############# #####.
			 */
			getSchemaName: function() {
				var stepConfig = this.sandbox.publish("GetStepConfig");
				var schemaName = stepConfig.parameter;
				if (!schemaName) {
					var mainModuleName = designData.getMainModuleName();
					var moduleStructure = designData.getModuleStructure(mainModuleName);
					var modulePage = moduleStructure.pages[0];
					schemaName = modulePage.name;
				}
				return schemaName;
			},

			/**
			 * ########## ######### ### ###### ############## #####
			 * @param {String} schemaName ### #####
			 * @returns {String} ######### ######
			 */
			getHeader: function(schemaName) {
				var mainModuleName = designData.getMainModuleName();
				var moduleStructure = designData.getModuleStructure(mainModuleName);
				var header = "";
				if (sectionDesignerUtils.isEmptyOrEmptyGUID(moduleStructure.typeColumnId)) {
					header = Ext.String.format(resources.localizableStrings.SinglePageHeader, moduleStructure.caption);
				} else {
					var pageCaption = "";
					Terrasoft.each(moduleStructure.pages, function(page) {
						if (page.name === schemaName) {
							pageCaption = page.pageCaption;
							return false;
						}
					});
					header = Ext.String.format(resources.localizableStrings.MultiPageHeader, moduleStructure.caption,
						pageCaption);
				}

				return header;
			},

			/**
			 * ######### ########### ############# #####
			 * @private
			 * @param {Terrasoft.Component} schemaView ############# #####
			 */
			renderSchema: function(schemaView) {
				var view = this.view;
				if (view) {
					view.destroy();
				}
				view = this.view = this.createSchemaDesignView(schemaView);
				view.bind(this.viewModel);
				view.render(this.renderContainer);
			},

			/**
			 * ########## ####### ######### ########## ######## #####. ######## ############# ############# #####.
			 * @private
			 */
			onSelectedItemChanged: function() {
				var viewModel = this.viewModel;
				var schema = viewModel.get("schema");
				var selectedItem = viewModel.get("selectedItem");
				schemaBuilder.reBuild(schema, selectedItem, function(viewModelClass, view) {
					this.renderSchema(view);
				}, this);
				//this.reRender();
			},

			/**
			 * ########## ####### ######### #####. ############### ############# ##### # ######### ##### # DesignData.
			 * @private
			 */
			onSchemaChange: function() {
				this.modifyDesignData();
				var viewModel = this.viewModel;
				var schema = viewModel.get("schema");
				var selectedItem = viewModel.get("selectedItem");
				schemaBuilder.reBuild(schema, selectedItem, function(viewModelClass, view) {
					this.renderSchema(view);
				}, this);
			},

			/**
			 * ########## ######### ###### ############# #########. ############ ###### ######### #######-########.
			 * ####### # ######### ############ ########### ########### ######### {@link #resourceColumnRegex}.
			 * ######### ######## ##### ########### # ###### DesignData. ##### ########### ######### ####### #######.
			 * @private
			 * @param {Object} model ########## ###### ######. ###### BackBone.
			 * @param {Object} options ##### #########. ### ############# ########### ####### change ### ###########
			 * ########## ########## ########, ####### ### ######### ########, # ###### ########### ### ##########
			 * #######.
			 */
			onChange: function(model, options) {
				var changedColumnName = options.columnName;
				var regExpMatches = this.resourceColumnRegex.exec(changedColumnName);
				if (!regExpMatches) {
					return;
				}
				var resourceName = regExpMatches[1];
				var viewModel = this.viewModel;
				var newColumnValue = viewModel.get(changedColumnName);
				var schema = viewModel.get("schema");
				var modifiedResource = {
					localizableStrings: {}
				};
				modifiedResource.localizableStrings[resourceName] = newColumnValue;
				designData.modifyClientUnitResources(schema.schemaName, modifiedResource);
				this.updateTabsCollection(changedColumnName, newColumnValue);
			},

			/**
			 * Update tabs model.
			 * @param {string} changedColumnName Changed column name.
			 * @param {String} newColumnValue New column value.
			 */
			updateTabsCollection: function(changedColumnName, newColumnValue) {
				var tabsConfig = this.viewModel.get("TabsConfig");
				var tabName = tabsConfig[changedColumnName];
				var tabsCollection = new Terrasoft.Collection();
				if (tabName) {
					tabsCollection = this.viewModel.get("TabsCollection");
					var tabViewModel = tabsCollection.get(tabName);
					tabViewModel.set("Caption", newColumnValue);
				}
			},

			/**
			 * ######### ####### ####### ##### # DesignData.
			 * @private
			 */
			modifyDesignData: function() {
				var viewModel = this.viewModel;
				var schema = viewModel.get("schema");
				designData.modifyClientUnitSchema(schema.schemaName, schema);
			},

			/**
			 * ############## # ############ ############# #####.
			 * @private
			 */
			reRender: function() {
				var viewModel = this.viewModel;
				var schema = viewModel.get("schema");
				var selectedItem = viewModel.get("selectedItem");
				var viewModelClass = viewModel.get("viewModelClass");
				var viewConfig = {
					schema: schema,
					viewModelClass: viewModelClass,
					selectedItemName: selectedItem
				};
				designViewGenerator.generate(viewConfig, this.renderSchema, this);
			},

			/**
			 * ####### ############# ######### ###### # ############## #####
			 * @private
			 * @param {Terrasoft.Component} schemaView ############# #####
			 * @returns {Terrasoft.Container} ############# #########
			 */
			createSchemaDesignView: function(schemaView) {
				var items = [
					{
						id: "CardContainer",
						className: "Terrasoft.Container",
						selectors: {
							wrapEl: "#CardContainer"
						},
						afterrender: {
							bindTo: "onViewRendered"
						},
						classes: {
							wrapClassName: ["designer"]
						},
						items: schemaView
					},
					{
						className: "Terrasoft.Button",
						name: "Add",
						caption: resources.localizableStrings.Add,
						style: this.Terrasoft.controls.ButtonEnums.style.BLUE,
						classes: {
							wrapperClass: ["add-detail-button"]
						},
						menu: {
							items: [{
								caption: resources.localizableStrings.AddFieldGroup,
								click: {
									bindTo: "addGroup"
								}
							}, {
								caption: resources.localizableStrings.AddDetail,
								click: {
									bindTo: "addDetail"
								}
							}]
						}
					},
					{
						className: "Terrasoft.Button",
						name: "ChangeOrder",
						caption: resources.localizableStrings.ChangeOrder,
						style: this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
						classes: {
							textClass: ["sort-button"]
						},
						markerValue: "changeOrder",
						click: {bindTo: "sortCurrentTab"}
					}
				];

				var view = this.Ext.create("Terrasoft.Container", {
					id: "DesignerContainer",
					className: "Terrasoft.Container",
					selectors: {
						wrapEl: "#DesignerContainer"
					},
					items: items
				});

				return view;
			},

			/**
			 * ########## ########## ######## ########## #####. ####### # ############## ###### ############# #########.
			 * @private
			 * @param {Terrasoft.BaseViewModel} viewModelClass ##### ###### ############# #####.
			 * @param {Terrasoft.Component} schemaView ############# #####.
			 * @param {Object} schema ##### ######## ##############.
			 */
			onSchemaBuild: function(viewModelClass, schemaView, schema) {
				this.schemaView = schemaView;
				var viewModel = this.viewModel = designViewModel.create("DesignViewModel", viewModelClass, Ext);
				var cloneSchema = this.Terrasoft.deepClone(schema);
				if (Ext.isEmpty(cloneSchema.entitySchemaName)) {
					var viewModelPrototype = viewModelClass.prototype;
					cloneSchema.entitySchemaName = viewModelPrototype.entitySchemaName || "";
					cloneSchema.entitySchema = viewModelPrototype.entitySchema;
				}
				viewModel.init({
					sandbox: this.sandbox,
					schema: cloneSchema,
					header: schema.schemaCaption,
					viewModelClass: viewModelClass
				});
				this.initSchemaCaptionConverters(cloneSchema);
				viewModel.on("change:schema", this.onSchemaChange, this);
				viewModel.on("change:selectedItem", this.onSelectedItemChanged, this);
				viewModel.on("change", this.onChange, this);
			},

			/**
			 * Sets allowed items caption for converter functions to be initialized.
			 * @private
			 * @param {Object} schema Page schema.
			 */
			initSchemaCaptionConverters: function(schema) {
				var viewConfigItems = schema.viewConfig[0].items;
				var header = this.viewModel.getSchemaItemInfoByName("Header", viewConfigItems);
				if (header && header.item) {
					var headerItems = header.item.items;
					this.initItemsCaptionConverters(headerItems);
				}
				var tabsCaptions = PageDesignerUtilities.getAllowedSchemaTabNames();
				this.initSchemaTabsCaptionConverters(tabsCaptions, viewConfigItems);
			},

			/**
			 * Initializes converter functions for tabs caption.
			 * @private
			 * @param {string []} items Tabs caption
			 * @param {Object} viewConfigItems Schema item config
			 */
			initSchemaTabsCaptionConverters: function(items, viewConfigItems) {
				this.Terrasoft.each(items, function(item) {
					var schemaItemInfo = this.viewModel.getSchemaItemInfoByName(item, viewConfigItems);
					if (schemaItemInfo && schemaItemInfo.item) {
						var infoItem = schemaItemInfo.item;
						var schemaItems = infoItem.tabs;
						this.initItemsCaptionConverters(schemaItems);
					}
				}, this);
			},

			/**
			 * ############# ####### ########## ########## ######### #####
			 * @private
			 * @param {Object} items ######## #####.
			 */
			initItemsCaptionConverters: function(items) {
				Terrasoft.iterateChildItems(items, function(iterationConfig) {
					var itemCaptionConfig = iterationConfig.item.caption;
					if (itemCaptionConfig && itemCaptionConfig.bindConfig && itemCaptionConfig.bindConfig.converter) {
						var schema = this.viewModel.get("schema");
						var itemName = iterationConfig.item.name;
						var columnCaption = schema.entitySchema.columns[itemName].caption;
						this.viewModel[itemCaptionConfig.bindConfig.converter] = function(value) {
							value = value || columnCaption;
							return value + " (" + resources.localizableStrings.ConverterMessage + ")";
						};
					}
				}, this);
			},

			/**
			 * ########## ################ ###### ####### ######.
			 * @return{Object} ################ ###### ####### ######.
			 */
			getHeaderConfig: function() {
				return {
					header: this.header
				};
			},

			/**
			 * ######### ######### ### ########## ####### ######.
			 */
			updateHeader: function() {
				this.sandbox.publish("SetPageHeaderInfo", this.getHeaderConfig());
			},

			/**
			 * ####### ############# ###### #########
			 * @param {Function} callback ####### ######### ###### ####. ########## ####### ######## ########## #####
			 * #############.
			 * @param {Object} scope ######## ###### callback-#######.
			 */
			init: function(callback, scope) {
				PageDesignerUtilities.getDetailsInfo(function() {
					var schemaName = this.getSchemaName();
					this.header = this.getHeader(schemaName);
					this.sandbox.subscribe("GetHeaderConfig", this.getHeaderConfig, this);
					this.updateHeader();
					schemaBuilder.build({
						schemaName: schemaName,
						useCache: false,
						profileKey: ""
					}, function(viewModelClass, schemaView, schema) {
						this.onSchemaBuild(viewModelClass, schemaView, schema);
						callback.call(scope);
					}, this);
				}, this);
				PageDesignerUtilities.setDataValueTypesStorage();
			},

			/**
			 * ####### ########## ###### #########.
			 * @param {Ext.Element} renderTo ######## ####### ### ##########
			 */
			render: function(renderTo) {
				this.renderContainer = renderTo;
				this.renderSchema(this.schemaView);
				this.schemaView = null;
			}
		});

		return pageDesignerClass;
	});


