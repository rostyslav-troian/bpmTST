Terrasoft.configuration.Structures["MobileDetailDesignerModule"] = {innerHierarchyStack: ["MobileDetailDesignerModule"], structureParent: "MobileBaseDesignerModule"};
define("MobileDetailDesignerModule", ["ext-base", "MobileDetailDesignerModuleResources", "PageDesignerUtilities",
		"MobileBaseDesignerModule", "MobileRecordDesignerSettings", "css!MobileDetailDesignerModule"],
	function(Ext, resources, PageDesignerUtilities) {

		/**
		 * @class Terrasoft.configuration.MobileDetailDesignerViewConfig
		 * #####, ############ ############ ############# ### ###### ######### ######.
		 */
		Ext.define("Terrasoft.configuration.MobileDetailDesignerViewConfig", {
			extend: "Terrasoft.MobileBaseDesignerViewConfig",
			alternateClassName: "Terrasoft.MobileDetailDesignerViewConfig",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewConfig#generate
			 * @overridden
			 */
			generate: function() {
				var viewConfig = this.callParent(arguments);
				viewConfig.push({
					name: "AddDetailButton",
					itemType: Terrasoft.ViewItemType.BUTTON,
					caption: { "bindTo": "Resources.Strings.AddDetailButtonCaption" },
					style: Terrasoft.controls.ButtonEnums.style.BLUE,
					click: { "bindTo": "onAddDetailClick" }
				});
				return viewConfig;
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewConfig#getDesignerItemsView
			 * @overridden
			 */
			getDesignerItemsView: function() {
				var designerSettings = this.designerSettings;
				var details = designerSettings.details;
				var detailsLength = details.length;
				if (!detailsLength) {
					return [this.getEmptyDataView()];
				}
				var result = [];
				for (var i = 0; i < detailsLength; i++) {
					var detailView = this.getDetailViewConfig(details[i]);
					result.push(detailView);
				}
				return result;
			},

			/**
			 * ########## ############ ############# ######## ######.
			 * @protected
			 * @virtual
			 * @param {Object} detailConfig ################ ###### ############# ######.
			 * @returns {Object} ############ ############# ######## ######.
			 */
			getDetailViewConfig: function(detailConfig) {
				var caption = this.getCaptionByName(detailConfig.caption);
				var config = {
					caption: caption,
					name: detailConfig.name,
					itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
					wrapClass: ["designer-standart-detail"]
				};
				return config;
			},

			/**
			 * ########## ############ ############# ### ########## ######.
			 * @protected
			 * @virtual
			 * @returns {Object} ############ ############# ### ########## ######.
			 */
			getEmptyDataView: function() {
				return {
					labelConfig: {
						classes: ["information", "recommendation"]
					},
					caption: { "bindTo": "Resources.Strings.AddDetailLabelCaption" },
					itemType: Terrasoft.ViewItemType.LABEL
				};
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileDetailDesignerViewModel
		 * ##### ###### ############# ###### ######### ######.
		 */
		Ext.define("Terrasoft.configuration.MobileDetailDesignerViewModel", {
			extend: "Terrasoft.MobileBaseDesignerViewModel",
			alternateClassName: "Terrasoft.MobileDetailDesignerViewModel",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onConfigureControlGroupButtonClick
			 * @overridden
			 */
			onConfigureControlGroupButtonClick: function() {
				var tag = arguments[3];
				var designerSettings = this.designerSettings;
				var detailItem = designerSettings.findDetailItemByName(tag);
				var detailCaption = designerSettings.getLocalizableStringByKey(detailItem.caption);
				var editDetailConfig = {
					detailSchemaName: detailItem.detailSchemaName,
					entitySchemaName: detailItem.entitySchemaName,
					detailColumn: detailItem.filter.detailColumn,
					masterColumn: detailItem.filter.masterColumn,
					detailCaption: detailCaption
				};
				var me = this;
				PageDesignerUtilities.showEditDetailWindow(this, function(windowDetailConfig) {
					me.editDetailWindowCallback(windowDetailConfig, detailItem);
				}, editDetailConfig, {isCaptionEditable: true});
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onRemoveControlGroupButtonClick
			 * @overridden
			 */
			onRemoveControlGroupButtonClick: function() {
				var tag = arguments[3];
				var designerSettings = this.designerSettings;
				var detailItem = designerSettings.findDetailItemByName(tag);
				designerSettings.removeDetailItem(detailItem);
				this.reRender();
			},

			/**
			 * ############ ####### ###### ########## ######.
			 * @protected
			 * @virtual
			 */
			onAddDetailClick: function() {
				PageDesignerUtilities.showEditDetailWindow(this, this.addDetailWindowCallback, null,
					{isCaptionEditable: true});
			},

			/**
			 * ############ ########## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 */
			addDetailWindowCallback: function(windowDetailConfig) {
				var designerSettings = this.designerSettings;
				var newDetailItem = this.createDetailItemFromWindowConfig(windowDetailConfig);
				var foundDetailItem = designerSettings.findDetailItemBySchemaName(windowDetailConfig.name);
				if (foundDetailItem) {
					designerSettings.applyDetailItem(foundDetailItem, newDetailItem);
				} else {
					designerSettings.addDetailItem(newDetailItem);
				}
				this.reRender();
			},

			/**
			 * ############ ############## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 * @param {Object} detailItem ################ ###### ############# ######.
			 */
			editDetailWindowCallback: function(windowDetailConfig, detailItem) {
				var designerSettings = this.designerSettings;
				var newDetailItem = this.createDetailItemFromWindowConfig(windowDetailConfig);
				designerSettings.applyDetailItem(detailItem, newDetailItem);
				this.reRender();
			},

			/**
			 * ########## ################ ###### ###### ## ######### ####### ## #### ############## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 * @returns {Object} ################ ###### ######.
			 */
			createDetailItemFromWindowConfig: function(windowDetailConfig) {
				var detailItem = this.designerSettings.createDetailItem({
					caption: windowDetailConfig.caption,
					entitySchemaName: windowDetailConfig.entitySchema,
					filter: windowDetailConfig.filter,
					name: windowDetailConfig.name
				});
				return detailItem;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobileDetailDesignerModule
		 * ##### ###### ######### ###### ########## ##########.
		 */
		var designerModule = Ext.define("Terrasoft.configuration.MobileDetailDesignerModule", {
			extend: "Terrasoft.MobileBaseDesignerModule",
			alternateClassName: "Terrasoft.MobileDetailDesignerModule",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#viewModelClassName
			 * @overridden
			 */
			viewModelClassName: "Terrasoft.MobileDetailDesignerViewModel",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#viewModelConfigClassName
			 * @overridden
			 */
			viewModelConfigClassName: "Terrasoft.MobileDetailDesignerViewConfig",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerModule#designerSettingsClassName
			 * @overridden
			 */
			designerSettingsClassName: "Terrasoft.MobileRecordDesignerSettings"

		});
		return designerModule;

	});


