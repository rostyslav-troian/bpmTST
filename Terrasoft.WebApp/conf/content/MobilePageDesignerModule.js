Terrasoft.configuration.Structures["MobilePageDesignerModule"] = {innerHierarchyStack: ["MobilePageDesignerModule"]};
define("MobilePageDesignerModule", ["ext-base", "MobilePageDesignerModuleResources", "PageDesignerUtilities",
	"SectionDesignerEnums", "MobileDesignerEnums", "MobileBaseDesignerModule", "MobileRecordDesignerSettings"],
	function(Ext, resources, PageDesignerUtilities, SectionDesignerEnums) {

		/**
		 * @class Terrasoft.configuration.MobilePageDesignerViewConfig
		 * Class that generates view for page designer module.
		 */
		Ext.define("Terrasoft.configuration.MobilePageDesignerViewConfig", {
			extend: "Terrasoft.MobileBaseDesignerViewConfig",
			alternateClassName: "Terrasoft.MobilePageDesignerViewConfig",

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewConfig#generate
			 * @overridden
			 */
			generate: function() {
				var viewConfig = this.callParent(arguments);
				viewConfig.push({
					name: "AddButton",
					itemType: Terrasoft.ViewItemType.BUTTON,
					caption: { "bindTo": "Resources.Strings.AddButtonCaption" },
					style: Terrasoft.controls.ButtonEnums.style.BLUE,
					menu: [
						{
							caption: { "bindTo": "Resources.Strings.AddColumnSetButtonCaption" },
							click: { "bindTo": "onAddColumnSetButtonClick" }
						},
						{
							caption: { "bindTo": "Resources.Strings.AddEmbeddedDetailButtonCaption" },
							click: { "bindTo": "onAddEmbeddedDetailButtonClick" }
						}
					]
				});
				return viewConfig;
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewConfig#getDesignerItemsView
			 * @overridden
			 */
			getDesignerItemsView: function() {
				var designerSettings = this.designerSettings;
				var columnSets = designerSettings.columnSets;
				var result = [];
				for (var i = 0, ln = columnSets.length; i < ln; i++) {
					var columnSet = columnSets[i];
					var columnSetViewConfig = this.getColumnSetViewConfig(columnSet);
					result.push(columnSetViewConfig);
				}
				return result;
			},

			/**
			 * Returns columns group's view configuration.
			 * @protected
			 * @virtual
			 * @param {Object} config Configuration of columns group.
			 * @returns {Object} Configuration for columns group's view.
			 */
			getColumnSetViewConfig: function(config) {
				var viewConfig = {
					name: config.name,
					itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
					items: this.getGridLayoutEditItemsViewConfig(config),
					useOrderTools: true
				};
				var caption = this.getCaptionByName(config.caption);
				if (config.name === "primaryColumnSet") {
					viewConfig.disableTools = true;
				} else {
					var prefix = config.isDetail
						? resources.localizableStrings.DetailPrefixControlGroupCaption
						: resources.localizableStrings.GroupPrefixControlGroupCaption;
					caption = prefix + " " + caption;
				}
				viewConfig.caption = caption;
				return viewConfig;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobilePageDesignerViewModel
		 * ##### ###### ############# ###### ######### ########.
		 */
		Ext.define("Terrasoft.configuration.MobilePageDesignerViewModel", {
			extend: "Terrasoft.MobileBaseDesignerViewModel",
			alternateClassName: "Terrasoft.MobilePageDesignerViewModel",

			/**
			 * @private
			 */
			isColumnSetExist: function(name) {
				var foundColumnSetItem = this.designerSettings.findColumnSetItemByName(name);
				if (foundColumnSetItem) {
					var message = this.get("Resources.Strings.ColumnSetIsAlreadyExistMessage");
					this.showInformation(message);
					return true;
				}
				return false;
			},

			/**
			 * @private
			 */
			isFileDetailColumnSet: function(name) {
				var foundColumnSetItem = this.designerSettings.findColumnSetItemByName(name);
				if (foundColumnSetItem) {
					return foundColumnSetItem.isDetail &&
						foundColumnSetItem.detailType === Terrasoft.MobileDesignerEnums.EmbeddedDetailType.File;
				}
				return false;
			},

			/**
			 * @private
			 */
			createDefaultColumnItemsForFileSchema: function(entitySchema) {
				var designerSettings = this.designerSettings;
				var column = entitySchema.columns.Data;
				var dataColumnConfig = designerSettings.createColumnItem({
					row: 0,
					caption: column.caption,
					columnName: column.name,
					dataValueType: column.dataValueType
				});
				dataColumnConfig.displayColumn = "Name";
				dataColumnConfig.label = "MobileConstantsFileLabel";
				dataColumnConfig.placeHolder = "MobileConstantsFileLabel";
				column = entitySchema.columns.Type;
				var typeColumnConfig = designerSettings.createColumnItem({
					row: 1,
					caption: column.caption,
					columnName: column.name,
					dataValueType: column.dataValueType
				});
				typeColumnConfig.hidden = true;
				column = entitySchema.columns.Name;
				var nameColumnConfig = designerSettings.createColumnItem({
					row: 2,
					caption: column.caption,
					columnName: column.name,
					dataValueType: column.dataValueType
				});
				nameColumnConfig.label = "MobileConstantsLinkLabel";
				nameColumnConfig.placeHolder = "MobileConstantsLinkLabel";
				nameColumnConfig.viewType = Terrasoft.MobileDesignerEnums.ColumnViewType.Url;
				return [dataColumnConfig, typeColumnConfig, nameColumnConfig];
			},

			/**
			 * @private
			 */
			createDefaultBusinessRulesForFileModel: function(entitySchemaName) {
				return [
					{
						name: entitySchemaName + "FileAndLinksEditPageVisibilityRule",
						ruleType: Terrasoft.MobileDesignerEnums.BusinessRuleTypes.FileAndLinksBusinessRule
					}
				];
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onCollectionChange
			 * @overridden
			 */
			onCollectionChange: function(collection, name) {
				if (this.isFileDetailColumnSet(name)) {
					this.set(this.getVisibleToolsPropertyName(name), false);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onSelectedItemsChange
			 * @overridden
			 */
			onSelectedItemsChange: function(selectedItems, name) {
				if (this.isFileDetailColumnSet(name)) {
					return;
				}
				this.callParent(arguments);
			},

			/**
			 * Called when add column set button has been tapped.
			 * @protected
			 * @virtual
			 */
			onAddColumnSetButtonClick: function() {
				this.showColumnSetInputBox({
					callback: this.addColumnSetInputBoxCallback
				});
			},

			/**
			 * Called when configure column set button has been tapped.
			 * @protected
			 * @virtual
			 * @param {Object} columnSetItem Columns set configuration object.
			 */
			onConfigureColumnSetButtonClick: function(columnSetItem) {
				this.showColumnSetInputBox({
					callback: Ext.bind(this.configureColumnSetInputBoxCallback, this, [columnSetItem], true),
					caption: this.designerSettings.getLocalizableStringByKey(columnSetItem.caption),
					name: columnSetItem.name
				});
			},

			/**
			 * Called when add embedded detail button has been tapped.
			 * @protected
			 * @virtual
			 */
			onAddEmbeddedDetailButtonClick: function() {
				PageDesignerUtilities.showEditDetailWindow(this, this.addEmbeddedDetailWindowCallback, null,
					{isCaptionEditable: true});
			},

			/**
			 * Called when configure embedded detail button has been tapped.
			 * @protected
			 * @virtual
			 * @param {Object} embeddedDetailItem Embedded detail configuration object.
			 */
			onConfigureEmbeddedDetailButtonClick: function(embeddedDetailItem) {
				var detailCaption = this.designerSettings.getLocalizableStringByKey(embeddedDetailItem.caption);
				var editDetailConfig = {
					detailSchemaName: embeddedDetailItem.detailSchemaName,
					entitySchemaName: embeddedDetailItem.entitySchemaName,
					detailColumn: embeddedDetailItem.filter.detailColumn,
					masterColumn: embeddedDetailItem.filter.masterColumn,
					detailCaption: detailCaption
				};
				var me = this;
				PageDesignerUtilities.showEditDetailWindow(this, function(windowDetailConfig) {
					me.editEmbeddedDetailWindowCallback(windowDetailConfig, embeddedDetailItem);
				}, editDetailConfig, {isCaptionEditable: true});
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onAddGridLayoutItemButtonClick
			 * @overridden
			 */
			onAddGridLayoutItemButtonClick: function() {
				var tag = arguments[3];
				var columnSetItem = this.designerSettings.findColumnSetItemByName(tag);
				this.openStructureExplorer({
					entitySchemaName: columnSetItem.entitySchemaName,
					callback: Ext.bind(this.gridLayoutItemAddedCallback, this, [columnSetItem], true)
				});
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onRemoveGridLayoutItemButtonClick
			 * @overridden
			 */
			onRemoveGridLayoutItemButtonClick: function() {
				var tag = arguments[3];
				var columnSetItem = this.designerSettings.findColumnSetItemByName(tag);
				this.removeSelectedItemsFromCollection(columnSetItem.name);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onConfigureControlGroupButtonClick
			 * @overridden
			 */
			onConfigureControlGroupButtonClick: function() {
				var columnSetName = arguments[3];
				var columnSetItem = this.designerSettings.findColumnSetItemByName(columnSetName);
				if (columnSetItem.isDetail) {
					this.onConfigureEmbeddedDetailButtonClick(columnSetItem);
				} else {
					this.onConfigureColumnSetButtonClick(columnSetItem);
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#onRemoveControlGroupButtonClick
			 * @overridden
			 */
			onRemoveControlGroupButtonClick: function() {
				var columnSetName = arguments[3];
				var columnSetItem = this.designerSettings.findColumnSetItemByName(columnSetName);
				this.removeColumnSetItem(columnSetItem);
				this.reRender();
			},

			/**
			 * ############ ######## ########### ###### ####### #####.
			 * @protected
			 * @virtual
			 */
			onMoveUpControlGroupButtonClick: function() {
				var columnSetName = arguments[3];
				this.moveColumnSetItem(columnSetName, -1);
			},

			/**
			 * ############ ######## ########### ###### ####### ####.
			 * @protected
			 * @virtual
			 */
			onMoveDownControlGroupButtonClick: function() {
				var columnSetName = arguments[3];
				this.moveColumnSetItem(columnSetName, 1);
			},

			/**
			 * ########## ###### ####### ## #### #######.
			 * @param {Object} columnSetName ### ###### #######.
			 * @param {Number} offset ######## ########.
			 * @protected
			 * @virtual
			 */
			moveColumnSetItem: function(columnSetName, offset) {
				var designerSettings = this.designerSettings;
				var columnSetItem = designerSettings.findColumnSetItemByName(columnSetName);
				var isMoved = designerSettings.moveColumnSetItem(columnSetItem, offset);
				if (isMoved) {
					this.reRender();
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#init
			 * @protected
			 * @overridden
			 */
			init: function() {
				this.generateItemsCollections();
				this.callParent(arguments);
			},

			/**
			 * ########## ######### #########.
			 * @protected
			 * @virtual
			 */
			generateItemsCollections: function() {
				var columnSets = this.designerSettings.columnSets;
				for (var i = 0, ln = columnSets.length; i < ln; i++) {
					var columnSet = columnSets[i];
					this.generateItemsCollectionBindingData(columnSet.name, columnSet.items);
				}
			},

			/**
			 * ########## ######## # ###### ###### ### ############# ###### #######.
			 * @protected
			 * @virtual
			 * @param {String} name ### #########.
			 * @param {Object[]} items ######## #########.
			 */
			generateItemsCollectionBindingData: function(name, items) {
				if (Ext.isArray(items)) {
					items.sort(function(first, second) {
						if (first.row > second.row) {
							return 1;
						}
						if (first.row < second.row) {
							return -1;
						}
						return 0;
					});
					var i = 0;
					items.map(function(item) {
						item.row = i;
						i++;
					});
				}
				this.generateGridLayoutEditViewBindingData(name, items);
				this.generateControlGroupBindingData(name);
			},

			/**
			 * Processes the result that is given from window of the object structure explorer.
			 * @protected
			 * @virtual
			 * @param {Object} explorerColumnConfig Configuration of the column.
			 * @param {Object} columnSetItem Configuration of the group of the columns.
			 */
			gridLayoutItemAddedCallback: function(explorerColumnConfig, columnSetItem) {
				var columnSetName = columnSetItem.name;
				var columnConfig = this.getColumnConfigFromStructureExplorer(explorerColumnConfig);
				var isColumnExist = this.isColumnConfigExist(columnSetItem, columnConfig);
				if (isColumnExist) {
					var message = this.get("Resources.Strings.ColumnIsAlreadyExistMessage");
					this.showInformation(message);
					return;
				}
				var columnItem = this.designerSettings.createColumnItem(columnConfig);
				this.addColumnItemToGridLayoutCollection(columnSetName, columnItem);
			},

			/**
			 * Checks if column is existed.
			 * @protected
			 * @param {Object} columnSetItem Configuration of the group of the columns.
			 * @param {Object} columnConfig Configuration of the column.
			 * @returns {Boolean} True, if column is existed.
			 */
			isColumnConfigExist: function(currentColumnSet, columnConfig) {
				var isDetail = currentColumnSet.isDetail;
				var columnSetName = currentColumnSet.name;
				var columnSets = this.designerSettings.columnSets;
				for (var i = 0, ln = columnSets.length; i < ln; i++) {
					var columnSet = columnSets[i];
					if ((!isDetail && columnSet.isDetail) || (isDetail && columnSetName !== columnSet.name)) {
						continue;
					}
					var columnCollection = this.getItemsCollectionByName(columnSet.name);
					var columnItems = columnCollection.getItems();
					for (var j = 0, itemsLn = columnItems.length; j < itemsLn; j++) {
						var columnItem = columnItems[j];
						var columnName = columnItem.get("columnName");
						if (columnName === columnConfig.columnName) {
							return true;
						}
					}
					if (isDetail) {
						break;
					}
				}
				return false;
			},

			/**
			 * ############ ########## ########## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 */
			addEmbeddedDetailWindowCallback: function(windowDetailConfig) {
				var newEmbeddedDetailItem = this.createEmbeddedDetailItemFromWindowConfig(windowDetailConfig);
				var entitySchemaName = newEmbeddedDetailItem.entitySchemaName;
				var designerSettings = this.designerSettings;
				var foundEmbeddedDetailItem = designerSettings.findColumnSetItemByPropertyName("entitySchemaName",
					entitySchemaName);
				if (foundEmbeddedDetailItem) {
					var message = this.get("Resources.Strings.EmbeddedDetailIsAlreadyExistMessage");
					this.showInformation(message);
					return;
				}
				designerSettings.getEntitySchemaByName(entitySchemaName, function(entitySchema) {
					Terrasoft.EntitySchemaManager.getItemByUId(entitySchema.uId, function(schemaInstance) {
						var items;
						if (schemaInstance.parentUId === SectionDesignerEnums.BaseSchemeUIds.BASE_FILE) {
							newEmbeddedDetailItem.detailType = Terrasoft.MobileDesignerEnums.EmbeddedDetailType.File;
							newEmbeddedDetailItem.generator = {
								xclass: "Terrasoft.FileAndLinksEmbeddedDetailGenerator"
							};
							newEmbeddedDetailItem.displaySeparator = false;
							newEmbeddedDetailItem.businessRules =
								this.createDefaultBusinessRulesForFileModel(entitySchemaName);
							items = this.createDefaultColumnItemsForFileSchema(entitySchema);
							newEmbeddedDetailItem.maxRows = items.length;
						} else {
							items = designerSettings.createDefaultColumnItemsByEntitySchema(entitySchema);
						}
						this.addColumnSetItem(newEmbeddedDetailItem, items);
						this.reRender();
					}, this);
				}, this);
			},

			/**
			 * ############ ############## ########## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 * @param {Object} embeddedDetailItem ################ ###### ######.
			 */
			editEmbeddedDetailWindowCallback: function(windowDetailConfig, embeddedDetailItem) {
				if (windowDetailConfig.entitySchema !== embeddedDetailItem.entitySchemaName) {
					var message = this.get("Resources.Strings.EmbeddedDetailSchemaNameCanNotBeChanged");
					this.showInformation(message);
					return;
				}
				var newEmbeddedDetailItem = this.createEmbeddedDetailItemFromWindowConfig(windowDetailConfig);
				this.applyColumnSetItem(embeddedDetailItem, newEmbeddedDetailItem);
				this.reRender();
			},

			/**
			 * ############ ########## ## #### ###### #######.
			 * @param {String} name ### ###### #######.
			 * @param {String} caption ######### ###### #######.
			 */
			addColumnSetInputBoxCallback: function(name, caption) {
				var columnSetItem = this.designerSettings.createColumnSetItem({
					name: name,
					caption: caption
				});
				var isColumnSetExist = this.isColumnSetExist(columnSetItem.name);
				if (isColumnSetExist) {
					return;
				}
				this.addColumnSetItem(columnSetItem);
				this.reRender();
			},

			/**
			 * ############ ############## ## #### ###### #######.
			 * @param {String} name ### ###### #######.
			 * @param {String} caption ######### ###### #######.
			 */
			configureColumnSetInputBoxCallback: function(name, caption, columnSetItem) {
				var newColumnSetItem = this.designerSettings.createColumnSetItem({
					name: name,
					caption: caption
				});
				var newName = newColumnSetItem.name;
				if (newName !== columnSetItem.name && this.isColumnSetExist(newName)) {
					return;
				}
				this.applyColumnSetItem(columnSetItem, newColumnSetItem);
				this.reRender();
			},

			/**
			 * ######### ###### #######.
			 * @protected
			 * @virtual
			 * @param columnSetItem ################ ###### ###### #######.
			 */
			addColumnSetItem: function(columnSetItem, items) {
				this.designerSettings.addColumnSetItem(columnSetItem);
				this.generateItemsCollectionBindingData(columnSetItem.name, items);
			},

			/**
			 * ####### ###### #######.
			 * @protected
			 * @virtual
			 * @param columnSetItem ################ ###### ###### #######.
			 */
			removeColumnSetItem: function(columnSetItem) {
				this.designerSettings.removeColumnSetItem(columnSetItem);
			},

			/**
			 * ######### ##### ######## ###### #######.
			 * @protected
			 * @virtual
			 * @param {Object} columnSetItem ################ ###### ###### #######.
			 * @param {Object} newColumnSetItem ################ ###### ##### ###### #######.
			 */
			applyColumnSetItem: function(columnSetItem, newColumnSetItem) {
				if (columnSetItem.name !== newColumnSetItem.name) {
					this.generateItemsCollectionBindingData(newColumnSetItem.name);
					var newCollection = this.getItemsCollectionByName(newColumnSetItem.name);
					var oldCollection = this.getItemsCollectionByName(columnSetItem.name);
					newCollection.loadAll(oldCollection);
				}
				this.designerSettings.applyColumnSetItem(columnSetItem, newColumnSetItem);
			},

			/**
			 * ########## ################ ###### ###### ## ######### ####### ## #### ############## ######.
			 * @protected
			 * @virtual
			 * @param {Object} windowDetailConfig ################ ###### ###### ## #### ############## ######.
			 * @returns {Object} ################ ###### ######.
			 */
			createEmbeddedDetailItemFromWindowConfig: function(windowDetailConfig) {
				return this.designerSettings.createColumnSetItem({
					caption: windowDetailConfig.caption,
					name: windowDetailConfig.name,
					entitySchemaName: windowDetailConfig.entitySchema,
					filter: windowDetailConfig.filter,
					isDetail: true
				});
			},

			/**
			 * ######### #### ######### ###### #######.
			 * @protected
			 * @virtual
			 * @param {Object} #onfig ################ ######.
			 */
			showColumnSetInputBox: function(config) {
				var controlConfig = this.getColumnSetInputBoxControlConfig(config.caption, config.name);
				var caption = this.get("Resources.Strings.ColumnSetInputBoxHeader");
				var callback = Ext.bind(this.showColumnSetInputBoxCallback, this, [config.callback], true);
				Terrasoft.showInputBox(caption, callback, ["ok", "cancel"], this, controlConfig, {defaultButton: 0});
			},

			/**
			 * ############ ##### ## #### ######### ###### #######.
			 * @protected
			 * @virtual
			 * @param {Number} buttonCode ### ######.
			 * @param {Object} controlData ################ ###### ######### ##########.
			 * @param {Function} callback ####### ######### ######.
			 */
			showColumnSetInputBoxCallback: function(buttonCode, controlData, callback) {
				if (buttonCode === "ok") {
					var caption = controlData.caption.value;
					var name = controlData.name.value;
					var nameRegExp = new RegExp("^[a-zA-Z0-9_]+$");
					var informationCaption;
					if (Ext.isEmpty(name) || Ext.isEmpty(caption)) {
						informationCaption = this.get("Resources.Strings.ColumnSetInputBoxRequiredFieldsWarning");
					} else if (!nameRegExp.test(name)) {
						informationCaption = this.get("Resources.Strings.ColumnSetInputBoxInvalidNameMessage");
					}
					if (informationCaption) {
						var informationCallback = function() {
							this.showColumnSetInputBox({
								caption: caption,
								name: name,
								callback: callback
							});
						};
						this.showInformation(informationCaption, informationCallback, this);
						return;
					}
					Ext.callback(callback, this, [name, caption]);
				}
			},

			/**
			 * ########## #########.
			 * @private
			 * @param {String} message ##### #########.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			showInformation: function(message, callback, scope) {
				var msgBoxConfig = {
					style: Terrasoft.MessageBoxStyles.BLUE
				};
				Terrasoft.showInformation(message, callback, scope, msgBoxConfig);
			},

			/**
			 * ########## ############ ######### #### ######### ###### #######.
			 * @protected
			 * @virtual
			 * @param {String} caption ######### ###### #######.
			 * @param {String} name ### ###### #######.
			 */
			getColumnSetInputBoxControlConfig: function(caption, name) {
				var captionConfig = {
					dataValueType: Terrasoft.DataValueType.TEXT,
					caption: this.get("Resources.Strings.ColumnSetInputBoxControlCaption"),
					value: caption || "",
					isRequired: true
				};
				var nameConfig = {
					dataValueType: Terrasoft.DataValueType.TEXT,
					caption: this.get("Resources.Strings.ColumnSetInputBoxControlName"),
					value: name || "",
					isRequired: true
				};
				return {
					caption: captionConfig,
					name: nameConfig
				};
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerViewModel#generateDesignerSettingsConfig
			 * @overridden
			 */
			generateDesignerSettingsConfig: function() {
				var designerSettingsConfig = this.callParent(arguments);
				var columnSets = designerSettingsConfig.columnSets;
				for (var i = 0, ln = columnSets.length; i < ln; i++) {
					var columnSet = columnSets[i];
					var collection = this.getItemsCollectionByName(columnSet.name);
					columnSet.items = this.generateSettingsConfigCollectionItems(collection);
				}
				return designerSettingsConfig;
			}

		});

		/**
		 * @class Terrasoft.configuration.MobilePageDesignerModule
		 * ##### ###### ######### ######## ########## ##########.
		 */
		var designerModule = Ext.define("Terrasoft.configuration.MobilePageDesignerModule", {
			extend: "Terrasoft.MobileBaseDesignerModule",
			alternateClassName: "Terrasoft.MobilePageDesignerModule",

			viewModelClassName: "Terrasoft.MobilePageDesignerViewModel",

			viewModelConfigClassName: "Terrasoft.MobilePageDesignerViewConfig",

			designerSettingsClassName: "Terrasoft.MobileRecordDesignerSettings"

		});
		return designerModule;
	});


