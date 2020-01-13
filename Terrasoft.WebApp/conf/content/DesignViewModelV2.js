Terrasoft.configuration.Structures["DesignViewModelV2"] = {innerHierarchyStack: ["DesignViewModelV2"]};
define("DesignViewModelV2", ["ext-base", "terrasoft", "DesignViewModelV2Resources", "PageDesignerUtilities",
		"SectionDesignDataModule", "SectionDesignerEnums", "SectionDesignerUtils"],
	function(Ext, Terrasoft, resources, pageDesignerUtilities, designData, sectionDesignerEnums, sectionDesignerUtils) {
		var globalNamespace = "Terrasoft";
		var modelNamespace = "Terrasoft.model";
		var resourceColumnRegex = /^Resources\./;
		var localizableStrings = resources.localizableStrings;

		function defineDesignViewModel(name, viewModelClass) {
			var columnsConfig = {
				schema: {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					name: "schema"
				},
				TabsCollection: {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				selectedItem: {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					name: "selectedItem"
				},
				ActiveTabName: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				header: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			};
			var detailsConfig = {};
			Terrasoft.each(viewModelClass.prototype.details, function(detail, detailName) {
				detailsConfig[detailName] = Terrasoft.deepClone(detail);
			}, this);
			Terrasoft.each(viewModelClass.prototype.columns, function(column, columnName) {
				if (resourceColumnRegex.test(columnName)) {
					columnsConfig[columnName] = Terrasoft.deepClone(column);
				}
			}, this);
			var fullClassName = modelNamespace + "." + name;
			var alternateClassName = globalNamespace + "." + name;
			var config = {
				alternateClassName: alternateClassName,
				extend: "Terrasoft.BaseViewModel",
				columns: columnsConfig,
				details: detailsConfig,

				/**
				 *  ####### # ########## ####.
				 * @private
				 * @param {Number} step ###.
				 */
				goToStep: function(step) {
					var sandbox = this.get("sandbox");
					sandbox.publish("GoToStep", {
						stepCompleteResult: step
					});
				},

				/**
				 * ########## ####### ####### ## ###### ##########.
				 * @private
				 */
				onSaveButtonClick: function() {
					var schema = this.get("schema");
					pageDesignerUtilities.getRequireFieldNotInSchem(schema);
					this.goToStep(sectionDesignerEnums.StepType.FINISH);
				},

				/**
				 * New column button handler. Displays new column settings popup.
				 * @param {String} tag Parameters string.
				 * @private
				 */
				addNewColumn: function(tag) {
					var args = tag.split(":");
					var type = args[0];
					type = parseInt(type, 10);
					var parentName = args[1];
					var col = args[2];
					var row = args[3];
					var schema = this.get("schema");
					var callback = function(config) {
						designData.createColumn(schema.entitySchemaName, config.column);
						this.addSchemaItem({
							parentName: parentName,
							column: col,
							row: row,
							name: config.column.name,
							caption: config.caption,
							textSize: config.textSize,
							format: config.format,
							contentType: config.contentType,
							labelConfig: config.labelConfig,
							readOnly: config.readOnly
						});
					};

					var column = pageDesignerUtilities.generateEntityColumnByDataValueType(type);
					var config = {
						isNew: true,
						scope: this,
						callback: callback,
						dataValueType: type,
						entitySchema: schema.entitySchema,
						column: column,
						textSize: 0,
						schema: schema
					};
					pageDesignerUtilities.showNewColumnWindow(config);
				},

				/**
				 * Existing column button handler. Displays column settings popup.
				 * @param {String} tag Parameters string.
				 * @private
				 */
				addExistingColumn: function(tag) {
					var schema = this.get("schema");
					var args = tag.split(":");
					var parentName = args[0];
					var col = args[1];
					var row = args[2];
					var callback = function(columnConfig) {
						var column = schema.entitySchema.columns[columnConfig.value];
						var captionResourceName = "Resources.Strings." + column.name + "Caption";
						this.set(captionResourceName, column.caption, {"columnName": captionResourceName});
						this.addSchemaItem({
							parentName: parentName,
							column: col,
							row: row,
							name: column.name,
							caption: {
								bindTo: captionResourceName
							}
						});
					};
					pageDesignerUtilities.showExistingColumnWindow(schema, callback, this);
				},

				/**
				 * Checks is current element column.
				 * @private
				 * @return {Boolean} Is current element column.
				 */
				getIsCurrentItemColumn: function() {
					var schema = this.get("schema");
					var schemaItem = this.getEditedItem(schema);
					if (!schemaItem) {
						return false;
					}
					var item = schemaItem.item;
					var columnName = item.bindTo || item.name;
					var column = schema.entitySchema.columns[columnName];
					return column ? true : false;
				},

				/**
				 * ########## ####### ####### ## ###### ############## #######. ######## ######### #### #######.
				 * @private
				 */
				editColumn: function() {
					var schema = this.get("schema");
					var schemaClone = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(schemaClone);
					var item = schemaItem.item;
					var callback = function(config) {
						designData.modifyColumn(schema.entitySchemaName, config.column.uId, config.column);
						item.caption = config.caption;
						item.hideCaption = config.hideCaption;
						item.textSize = config.textSize;
						item.format = config.format;
						item.contentType = config.contentType;
						item.labelConfig = config.labelConfig;
						item.enabled = Ext.isEmpty(config.readOnly) ? true : !config.readOnly;
						this.set("schema", schemaClone);
					};
					var columnName = item.bindTo || item.name;
					var column = schema.entitySchema.columns[columnName] || null;
					var readOnly = Ext.isEmpty(item.enabled) ? false :
						!item.enabled;

					var config = {
						isNew: false,
						scope: this,
						callback: callback,
						dataValueType: column.dataValueType,
						entitySchema: schema.entitySchema,
						column: column,
						hideCaption: item.hideCaption,
						textSize: item.textSize,
						format: item.format,
						contentType: item.contentType,
						readOnly: readOnly,
						labelConfig: item.labelConfig || {},
						schema: schema,
						itemName: item.name
					};
					pageDesignerUtilities.showNewColumnWindow(config);
				},

				/**
				 * Adds schema item. Modifies designer schema.
				 * @private
				 * @param {Object} config Element parameters object.
				 */
				addSchemaItem: function(config) {
					var schema = this.get("schema");
					var schemaClone = Terrasoft.deepClone(schema);
					var parent = this.getSchemaItemInfoByName(config.parentName, schemaClone.viewConfig);
					var col = parseInt(config.column, 10);
					var row = parseInt(config.row, 10);
					var calculatedColSpan = this.calculateColumnWidth(parent.item, col, row);
					var layout = {
						column: col,
						row: row,
						colSpan: calculatedColSpan,
						rowSpan: 1
					};
					var itemName = this.generateUniqName(config.name);
					var enabled = Ext.isEmpty(config.readOnly) ? true :
						!config.readOnly;
					var item = {
						layout: layout,
						name: itemName,
						bindTo: config.name,
						caption: config.caption,
						textSize: config.textSize,
						format: config.format,
						contentType: config.contentType,
						labelConfig: config.labelConfig,
						enabled: enabled
					};
					parent.item.items.push(item);
					this.set("schema", schemaClone);
				},

				/**
				 * ########## ####### ####### ## ###### ########## ######. ######## ######### #### ######.
				 * @private
				 */
				addDetail: function() {
					pageDesignerUtilities.showEditDetailWindow(this, this.showDetailWindowCallback);
				},

				/**
				 * Detail settings popup callback. Modifies designer schema.
				 * @private
				 * @param {Object} detailConf Detail parameters object.
				 * @param {String} detailConf.entitySchema Entity schema name.
				 * @param {String} detailConf.name Detail schema name.
				 * @param {String} detailConf.detailKey Detail name.
				 * @param {Object} detailConf.filter Detail connection parameters.
				 */
				showDetailWindowCallback: function(detailConf) {
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var details = schemaClone.details;
					var detailName = detailConf.name;
					var detailEntitySchemaName = detailConf.entitySchema;
					var detailKey = (detailConf.detailKey)
						? detailConf.detailKey
						: this.generateUniqName(detailEntitySchemaName);
					var detailColumn = detailConf.filter.detailColumn;
					var masterColumn = detailConf.filter.masterColumn;
					var activeTabName = this.model.attributes.ActiveTabName;
					var viewConfig = schemaClone.viewConfig[0];
					details[detailKey] = {
						schemaName: detailName,
						entitySchemaName: detailEntitySchemaName,
						filter: {
							detailColumn: detailColumn,
							masterColumn: masterColumn
						}
					};
					this.details[detailKey] = details[detailKey];
					var activeTabContainer = this.getSchemaItemInfoByName(activeTabName, viewConfig);
					var detail = this.getSchemaItemInfoByName(detailKey, activeTabContainer.item);
					if (!detail) {
						var detailItemConfig = {
							itemType: Terrasoft.ViewItemType.DETAIL,
							name: detailKey
						};
						var activeTab = this.getSchemaItemInfoByName(activeTabName, viewConfig);
						activeTab.item.items.push(detailItemConfig);
					}
					var caption = localizableStrings.Detail + detailConf.caption;
					this.createDetailCaptionColumn(detailKey, caption);
					this.set("schema", schemaClone);
					designData.setDetailGridSettings(detailKey, detailConf.gridSettings);
				},

				/**
				 * Generates unique name for schema element instance.
				 * @private
				 * @param {String} currentName Schema element name.
				 * @return {String} Unique name for schema element instance.
				 */
				generateUniqName: function(currentName) {
					var lastGuidPartRegex = new RegExp("[0-9a-zA-z]{12}");
					var newGuid = Terrasoft.generateGUID();
					var suffix = newGuid.match(lastGuidPartRegex)[0];
					return currentName + suffix;
				},

				/**
				 * Calculates column width.
				 * @private
				 * @param {Object} item Item parametrs object.
				 * @param {Number} col Column number.
				 * @param {Number} row Row number.
				 * @return {Number} Column width.
				 */
				calculateColumnWidth: function(item, col, row) {
					var matrix = pageDesignerUtilities.getFillingGridMatrix(item);
					var count = 0;
					for (var i = col; i < col + 12; i++) {
						if (!matrix[row]) {
							count = 12;
							return count;
						}
						if (!matrix[row][i] && i < 24) {
							count++;
						}
					}
					return count;
				},

				/**
				 * ########## ####### ####### ## ###### ########## ######. ######## ######### #### ######.
				 * @private
				 */
				addGroup: function() {
					var groupName = this.generateUniqName("group");
					var groupConfig = {
						name: groupName,
						caption: null
					};
					pageDesignerUtilities.showEditGroupWindow(this, this.showGroupWindowCallback, groupConfig);
				},

				/**
				 * Fileds group settings popup callback. Modifies designer schema.
				 * @private
				 * @param {Object} groupConfig Fileds group parameters object.
				 * @param {String} groupConfig.caption Fileds group caption.
				 * @param {String} groupConfig.name Fileds group name.
				 */
				showGroupWindowCallback: function(groupConfig) {
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var viewConfig = schemaClone.viewConfig[0];
					var activeTabName = this.model.attributes.ActiveTabName;
					var groupCaption = groupConfig.caption;
					var groupName = groupConfig.name;
					var captionResourceName = "Resources.Strings." + groupName + "Caption";
					this.set(captionResourceName, groupCaption, {"columnName": captionResourceName});
					var groupItemConfig = {
						itemType: Terrasoft.ViewItemType.CONTROL_GROUP,
						caption: {
							bindTo: captionResourceName
						},
						items: [{
							itemType: Terrasoft.ViewItemType.GRID_LAYOUT,
							name: groupName + "_gridLayout",
							items: []
						}],
						name: groupName,
						controlConfig: {
							collapsed: false
						}
					};
					var group = this.getSchemaItemInfoByName(groupName, viewConfig);
					if (!group) {
						var activeTab = this.getSchemaItemInfoByName(activeTabName, viewConfig);
						activeTab.item.items.push(groupItemConfig);
						this.createCollapsedColumn(groupName);
					} else {
						group.item.caption = groupItemConfig.caption;
					}
					this.set("schema", schemaClone);
				},

				/**
				 * ############ ####### ######### ####### Tabs.
				 * @private
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} activeTab ######### #######.
				 * @param {String} tabsName Name of Tabs item.
				 */
				activeTabChange: function(activeTab) {
					var activeTabName = activeTab.get("Name");
					var tabsCollection = this.get("TabsCollection");
					tabsCollection.eachKey(function(tabName, tab) {
						var tabContainerVisibleBinding = tab.get("Name");
						this.set(tabContainerVisibleBinding, (tabName === activeTabName));
					}, this);
					pageDesignerUtilities.initializeGridLayoutDragAndDrop(Ext.bind(this.changeItemPosition, this));
				},

				/**
				 * Returns selected element.
				 * @private
				 * @param {Object} schema Designer schema.
				 * @return {Object} editedItemInfo Selected element.
				 */
				getEditedItem: function(schema) {
					var selectedItem = this.get("selectedItem");
					var editedItemInfo = this.getSchemaItemInfoByName(selectedItem, schema.viewConfig);
					return editedItemInfo;
				},

				/**
				 * ####### ######### #######. ######## ##### #########.
				 * @private
				 */
				removeItem: function() {
					var schema = this.get("schema");
					var clonedSchema = Terrasoft.deepClone(schema);
					var item = this.getEditedItem(clonedSchema);
					var itemsContainer = item.parent.items || item.parent;
					var index = itemsContainer.indexOf(item.item);
					itemsContainer.splice(index, 1);
					this.set("schema", clonedSchema);
				},

				/**
				 * ########### ###### ####### ## #######. ######## ##### #########.
				 * @private
				 */
				incrementWidth: function() {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(newSchema);
					var item = schemaItem.item;
					var row = item.layout.row;
					var colSpan = item.layout.colSpan;
					if (!colSpan) {
						colSpan = 12;
					}
					var matrix = pageDesignerUtilities.getFillingGridMatrix(schemaItem.parent);
					var lengthCol = item.layout.column + colSpan;
					var lengthRow = row + item.layout.rowSpan;
					if (lengthCol === 24) {
						return;
					}
					for (var i = row; i < lengthRow; i++) {
						if (matrix[i][lengthCol] === true) {
							return;
						}
					}
					item.layout.colSpan = colSpan + 1;
					this.set("schema", newSchema);
				},

				/**
				 * ######### ###### ####### ## #######. ######## ##### #########.
				 * @private
				 */
				decrementWidth: function() {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(newSchema);
					var item = schemaItem.item;
					var colSpan = item.layout.colSpan;
					var length = colSpan - 1;
					if (length < 1) {
						return;
					}
					item.layout.colSpan = colSpan - 1;
					this.set("schema", newSchema);
				},

				/**
				 * ########### ####### ## ######### ######. ######## ##### #########.
				 * @private
				 */
				stretch: function() {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(newSchema);
					var matrix = pageDesignerUtilities.getFillingGridMatrix(schemaItem.parent);
					var item = schemaItem.item;
					var row = item.layout.row;
					var column = item.layout.column;
					var colSpan = item.layout.colSpan;
					var calculatedColumn = column;
					for (var i = column; i > 0; i--) {
						if (matrix[row][i - 1] === true) {
							break;
						}
						calculatedColumn--;
						colSpan++;
					}
					for (var k = calculatedColumn + colSpan; k < matrix[row].length; k++) {
						if (matrix[row][k] === true) {
							break;
						}
						colSpan++;
					}
					item.layout.colSpan = colSpan;
					item.layout.column = calculatedColumn;
					this.set("schema", newSchema);
				},

				/**
				 * ########### ###### ####### ## #######. ######## ##### #########.
				 * @private
				 */
				incrementHeight: function() {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(newSchema);
					var matrix = pageDesignerUtilities.getFillingGridMatrix(schemaItem.parent);
					var item = schemaItem.item;
					var row = item.layout.row;
					var bottomDivision = row + item.layout.rowSpan;
					if (matrix[bottomDivision]) {
						var divisionFilling = matrix[bottomDivision].splice(item.layout.column, item.layout.colSpan);
						if (divisionFilling.some(function(element) {
								return element;
							})) {
							return;
						}
					}
					item.layout.rowSpan++;
					this.set("schema", newSchema);
				},

				/**
				 * ######### ###### ####### ## #######. ######## ##### #########.
				 * @private
				 */
				decrementHeight: function() {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var schemaItem = this.getEditedItem(newSchema);
					var item = schemaItem.item;
					if (item.layout.rowSpan > 1) {
						item.layout.rowSpan--;
						this.set("schema", newSchema);
					}
				},

				/**
				 * Changes element position. Modifies designer schema.
				 * @private
				 * @param {String} parentName Parent item name.
				 * @param {String} itemName Item name.
				 * @param {Number} row Row number.
				 * @param {Number} column Column number.
				 */
				changeItemPosition: function(parentName, itemName, row, column) {
					var schema = this.get("schema");
					var newSchema = Terrasoft.deepClone(schema);
					var editedItemInfo = this.getSchemaItemInfoByName(itemName, newSchema.viewConfig);
					var item = editedItemInfo.item;
					var items = editedItemInfo.parent.items || editedItemInfo.parent;
					var itemIndex = items.indexOf(item);
					items.splice(itemIndex, 1);
					var parentItemInfo = this.getSchemaItemInfoByName(parentName, newSchema.viewConfig);
					var parentItem = parentItemInfo ? parentItemInfo.item : newSchema.viewConfig;
					var matrix = pageDesignerUtilities.getFillingGridMatrix(parentItem);
					var colSpan = item.layout.colSpan || 12;
					var rowSpan = item.layout.rowSpan || 1;
					var maxColumn = column + colSpan;
					var maxRow = row + rowSpan;
					if (maxColumn > 24) {
						maxColumn = 24;
					}
					var abort = false;
					for (var i = row; i < maxRow; i++) {
						var matrixRow = matrix[i];
						if (!matrixRow) {
							continue;
						}
						for (var j = column; j < maxColumn; j++) {
							if (matrixRow[j] === true) {
								if (j === column) {
									maxRow = i;
									abort = true;
								} else {
									maxColumn = j;
								}
								break;
							}
						}
						if (abort) {
							break;
						}
					}
					item.layout.colSpan = maxColumn - column;
					item.layout.rowSpan = maxRow - row;
					item.layout.row = row;
					item.layout.column = column;
					items.push(item);
					this.set("schema", newSchema);
				},

				/**
				 * ####### ####### # ########### #######.
				 * @private
				 */
				createModuleCaptionColumns: function() {
					var schema = this.get("schema");
					var viewConfig = schema.viewConfig;
					Terrasoft.iterateChildItems(viewConfig, function(iterationConfig) {
						var item = iterationConfig.item;
						if (item.itemType === Terrasoft.ViewItemType.MODULE) {
							this.getModuleCaption(item, function(caption) {
								this.createModuleCaptionColumn(item.name, caption);
							}, this);
						}
					}, this);
				},

				/**
				 * Creates column with module caption.
				 * @private
				 * @param {String} itemName Item name.
				 * @param {String} moduleCaption Module caption.
				 */
				createModuleCaptionColumn: function(itemName, moduleCaption) {
					var columnName = itemName + "_page_designer_module_caption";
					this.columns[columnName] = {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: columnName
					};
					var caption = localizableStrings.Module + " " + moduleCaption;
					this.set(columnName, caption);
				},

				/**
				 * Returns module caption.
				 * @private
				 * @param {Object} item Design item.
				 * @param {Function} callback Callback function.
				 */
				getModuleCaption: function(item, callback, scope) {
					sectionDesignerUtils.postServiceRequest({
						methodName: "GetModuleInfoByModuleName",
						parameters: {
							moduleName: item.moduleName
						},
						scope: scope || this,
						callback: function(request, success, response) {
							if (success) {
								var responseObject = Terrasoft.decode(response.responseText);
								var result = responseObject.GetModuleInfoByModuleNameResult;
								var caption = result.ModuleCaption;
								callback.call(this, caption);
							}
						}
					});
				},

				/**
				 * ####### ####### # ########### #######.
				 * @private
				 */
				createDetailsCaptionColumns: function() {
					var schema = this.get("schema");
					var viewConfig = schema.viewConfig;
					pageDesignerUtilities.getDetailsInfo(function(detailsInfo) {
						Terrasoft.iterateChildItems(viewConfig, function(iterationConfig) {
							var item = iterationConfig.item;
							var itemName = item.name;
							if (item.itemType === Terrasoft.ViewItemType.DETAIL) {
								var registeredDetailName = item.bindTo || itemName;
								var registeredDetailInfo = this.details[registeredDetailName];
								var registeredDetailSchemaName = registeredDetailInfo.schemaName;
								var registeredDetailEntitySchemaName = registeredDetailInfo.entitySchemaName;
								var detailItem = Ext.Array.findBy(detailsInfo, function(arrayItem) {
									var result = arrayItem.schemaName === registeredDetailSchemaName;
									if (result && registeredDetailEntitySchemaName) {
										result = result && arrayItem.entitySchemaName === registeredDetailEntitySchemaName;
									}
									return result;
								}, this);
								var detailCaption = (detailItem && detailItem.Caption);
								var caption = detailCaption
									? localizableStrings.Detail + detailCaption
									: localizableStrings.UnregisteredDetail + itemName;
								this.createDetailCaptionColumn(itemName, caption);
							}
						}, this);
					}, this);
				},

				/**
				 * Generates column with detail caption.
				 * @private
				 * @param {String} itemName Item name.
				 * @param {String} caption Detail caption.
				 */
				createDetailCaptionColumn: function(itemName, caption) {
					var columnName = itemName + "_page_designer_detail_caption";
					if (!this.columns[columnName]) {
						this.columns[columnName] = {
							type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							name: columnName
						};
					}
					this.set(columnName, caption);
				},

				/**
				 * ####### ####### ######### ########### ######.
				 * @private
				 */
				createControlGroupCollapsedColumns: function() {
					var schema = this.get("schema");
					var viewConfig = schema.viewConfig;
					Terrasoft.iterateChildItems(viewConfig, function(iterationConfig) {
						var item = iterationConfig.item;
						if (item.itemType === Terrasoft.ViewItemType.CONTROL_GROUP) {
							this.createCollapsedColumn(item.name);
						}
					}, this);
				},

				/**
				 * Generates collapsed elements group column.
				 * @param {String} itemName Item name.
				 * @private
				 */
				createCollapsedColumn: function(itemName) {
					var columnName = itemName + "_page_designer_collapsed";
					this.columns[columnName] = {
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						name: columnName
					};
					this.set(columnName, false);
				},

				/**
				 * ########## ####### ####### ## ###### ######### ######. ######## ######### #### ######.
				 * @private
				 */
				configureDetail: function() {
					var tag = arguments[3];
					var schema = this.get("schema");
					var details = schema.details;
					var detail = details[tag];
					if (!detail) {
						Terrasoft.showInformation(localizableStrings.CanNotEditParentSchemaDetails, null, null,
							{buttons: ["ok"]});
						return;
					}
					if (!detail.filter) {
						detail.filter = {
							detailColumn: null,
							masterColumn: null
						};
					}
					var detailConfig = {
						detailSchemaName: detail.schemaName,
						entitySchemaName: detail.entitySchemaName,
						detailKey: tag,
						detailColumn: detail.filter.detailColumn,
						masterColumn: detail.filter.masterColumn
					};
					pageDesignerUtilities.showEditDetailWindow(this, this.showDetailWindowCallback, detailConfig);
				},

				/**
				 * ########## ####### ####### ## ###### ######## ######. ######## ##### #########.
				 * @private
				 */
				removeDetail: function() {
					var tag = arguments[3];
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var viewConfig = schemaClone.viewConfig[0];
					var item = this.getSchemaItemInfoByName(tag, viewConfig);
					if (item && item.item && (item.item.itemType === Terrasoft.ViewItemType.DETAIL)) {
						var parent = item.parent;
						delete schemaClone.details[tag];
						Terrasoft.each(parent.items, function(it, key) {
							if (it.name === tag) {
								parent.items.splice(key, 1);
								return false;
							}
						});
						this.set("schema", schemaClone);
						designData.deleteDetailGridSettings(tag);
					}
				},

				/**
				 * ########## ####### ####### ## ###### ######### ######. ######## ######### #### ######.
				 * @private
				 */
				configureGroup: function() {
					var tag = arguments[3];
					if (!tag) {
						return;
					}
					var caption = null;
					if (this.getSchemaItemInfoByName(tag)) {
						var schemaItem = this.getSchemaItemInfoByName(tag);
						caption = schemaItem.item.caption;
						if (caption && caption.bindTo) {
							caption = this.get(caption.bindTo);
						}
					}
					var groupConfig = {
						name: tag,
						caption: caption
					};
					pageDesignerUtilities.showEditGroupWindow(this, this.showGroupWindowCallback, groupConfig);
				},

				/**
				 * ########## ####### ####### ## ###### ######## ######. ######## ##### #########.
				 * @private
				 */
				removeGroup: function() {
					var tag = arguments[3];
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var viewConfig = schemaClone.viewConfig[0];
					var item = this.getSchemaItemInfoByName(tag, viewConfig);
					if (item && item.item && item.item.itemType === 15) {
						var parent = item.parent;
						Terrasoft.each(parent.items, function(it, key) {
							if (it.name === tag) {
								parent.items.splice(key, 1);
								return false;
							}
						});
						this.set("schema", schemaClone);
					}
				},

				/**
				 * ########## ####### ####### ## ###### ######### ####### ######### ## ########. ######## #########
				 * #### ########.
				 * @private
				 */
				sortCurrentTab: function() {
					var activeTabName = this.get("ActiveTabName");
					var schemaItem = this.getSchemaItemInfoByName(activeTabName);
					var items = schemaItem.item.items;
					var tabCaptionResource = schemaItem.item.caption.bindTo;
					var tabCaption = this.get(tabCaptionResource);
					var itemsConfig = [];
					Terrasoft.each(items, function(item, key) {
						var index = parseInt(key, 10);
						var itemName = item.name;
						var caption;
						if (item.itemType === Terrasoft.ViewItemType.DETAIL) {
							var detailSchemaName = this.details[itemName].schemaName;
							var cachedDetails = Terrasoft.DomainCache.getItem("SectionDesigner_DetailsInfo");
							Terrasoft.each(cachedDetails, function(detail) {
								if (detail.schemaName === detailSchemaName) {
									caption = detail.Caption;
								}
							});
						} else {
							caption = item.caption;
						}
						if (caption && caption.bindTo) {
							var resource = caption.bindTo;
							caption = this.get(resource);
						}
						var it = {
							name: itemName,
							caption: caption,
							position: index
						};
						itemsConfig.push(it);
					}, this);
					var addConfig = {
						tabCaption: tabCaption
					};
					pageDesignerUtilities.showEditTabItemsWindow(this, itemsConfig, addConfig,
						this.showTabItemsWindowCallback);
				},

				/**
				 * Tab pannel settings popup window callback function. Modifies designer schema.
				 * @private
				 * @param {Array} tabItems Tab elements array.
				 */
				showTabItemsWindowCallback: function(tabItems) {
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var viewConfig = schemaClone.viewConfig[0];
					var newItems = [];
					Terrasoft.each(tabItems, function(tab, key) {
						var pos = parseInt(key, 10);
						var itemInSchema = this.getSchemaItemInfoByName(tab.name, viewConfig);
						newItems[pos] = itemInSchema.item;
					}, this);
					var activeTabName = this.get("ActiveTabName");
					var schemaItem = this.getSchemaItemInfoByName(activeTabName, viewConfig);
					schemaItem.item.items = newItems;
					this.cleanRegisteredDetails(schemaClone);
					this.set("schema", schemaClone);
				},

				/**
				 * ########## ####### ####### ## ###### ######### ########. ######## #########
				 * #### ########.
				 * @private
				 */
				customizeTabs: function() {
					var tabItems = this.get("TabsCollection").getItems();
					var currentObjectName = this.get("schema").schemaName;
					var tabsConf = [];
					Terrasoft.each(tabItems, function(item, key) {
						var index = parseInt(key, 10);
						var tab = {
							name: item.values.Name,
							caption: item.values.Caption,
							position: index
						};
						tabsConf.push(tab);
					}, this);
					var addConfig = {
						currentObjectName: currentObjectName
					};
					pageDesignerUtilities.showEditTabsWindow(this, tabsConf, addConfig,
						this.showTabsWindowCallback);
				},

				/**
				 * Tabs panel settings popup callback function. Modifies designer schema.
				 * @private
				 * @param {Array} tabs Tabs array.
				 */
				showTabsWindowCallback: function(tabs) {
					var schemaClone = Terrasoft.deepClone(this.get("schema"));
					var viewConfig = schemaClone.viewConfig[0];
					var newTabs = [];
					Terrasoft.each(tabs, function(tab, key) {
						var pos = parseInt(key, 10);
						var tabInSchema = this.getSchemaItemInfoByName(tab.name, viewConfig);
						if (!tabInSchema) {
							tabInSchema = {};
							tabInSchema.item = {
								items: [],
								name: tab.name
							};
						}
						var captionResourceName = "Resources.Strings." + tab.name + "Caption";
						this.set(captionResourceName, tab.caption, {"columnName": captionResourceName});
						tabInSchema.item.caption = {
							bindTo: captionResourceName
						};
						newTabs[pos] = tabInSchema.item;
					}, this);
					this.getSchemaItemInfoByName("Tabs", viewConfig).item.tabs = newTabs;
					this.cleanRegisteredDetails(schemaClone);
					this.set("schema", schemaClone);
					this.initTabs();
				},

				/**
				 * Acualises details array. Modifies schema copy.
				 * @private
				 * @param {Object} schemaClone Schema copy.
				 */
				cleanRegisteredDetails: function(schemaClone) {
					var viewConfig = schemaClone.viewConfig[0];
					var details = schemaClone.details;
					Terrasoft.each(details, function(det, key) {
						var schemaItem = this.getSchemaItemInfoByName(key, viewConfig);
						if (!schemaItem) {
							delete details[key];
						}
					}, this);
				},

				/**
				 * Element click event handler.
				 * @param {String} tag Element type.
				 * @private
				 */
				selectItem: function(tag) {
					this.set("selectedItem", tag);
				},

				/**
				 * ########## ####### ######## ####### ## #######.
				 * @private
				 */
				editItem: function() {
					this.editItem();
				},

				/**
				 * ####### ############# ######.
				 * @private
				 */
				init: function(initValues) {
					Terrasoft.each(initValues, function(value, itemName) {
						this.set(itemName, value);
					}, this);
					var sandbox = this.get("sandbox");
					sandbox.subscribe("IsStepReady", this.onGoToStep, this);
					this.createModuleCaptionColumns();
					this.createControlGroupCollapsedColumns();
					this.createDetailsCaptionColumns();
					this.initTabs();
				},

				/**
				 * Change step event handler.
				 * @param {Function} callback Callback function.
				 * @private
				 */
				onGoToStep: function(callback) {
					var mainModuleName = designData.getMainModuleName();
					var moduleStructure = designData.getModuleStructure(mainModuleName);
					var schema = this.get("schema");
					var collection = pageDesignerUtilities.getRequireFieldNotInSchema(schema,
						moduleStructure.typeColumnId);
					var items = collection.collection.items;
					if (items.length > 0) {
						var message = localizableStrings.RequireFieldsIsNotAdd;
						Terrasoft.each(items, function(item) {
							message += "\r\n" + item;
						});
						this.showInformationDialog(message, function() {
							callback(true);
						});
						return false;
					}
				},

				/**
				 * Initializes tabs.
				 * @private
				 */
				initTabs: function() {
					var tabsCaptions = pageDesignerUtilities.getAllowedSchemaTabNames();
					Terrasoft.each(tabsCaptions, function(item) {
						this.initTab(item);
					}, this);
				},

				/**
				 * Initializes tab.
				 * @private
				 */
				initTab: function(tabsName) {
					var schema = this.get("schema");
					var tabs = this.getSchemaItemInfoByName(tabsName, schema);
					if (!tabs){
						return;
					}
					var tabsValues = [];
					var tabsConfig = {};
					var viewModelColumns = this.columns;
					Terrasoft.each(tabs.item.tabs, function(item) {
						var itemName = item.name;
						viewModelColumns[itemName] = {
							dataValueType: Terrasoft.DataValueType.BOOLEAN,
							type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
							value: false
						};
						var caption = this.getTabCaption(item);
						tabsValues.push({
							Caption: caption,
							Name: itemName
						});
						var itemCaption = item.caption;
						if (itemCaption && itemCaption.bindTo) {
							tabsConfig[itemCaption.bindTo] = itemName;
						}
					}, this);
					viewModelColumns.TabsConfig = {
						dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: tabsConfig
					};
					this.set(tabsName + "Config", tabsConfig);
					var tabsCollection = new Terrasoft.BaseViewModelCollection({
						entitySchema: new Terrasoft.BaseEntitySchema({
							columns: {},
							primaryColumnName: "Name"
						})
					});
					tabsCollection.loadFromColumnValues(tabsValues);
					viewModelColumns.TabsCollection = {
						dataValueType: Terrasoft.DataValueType.COLLECTION,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						value: tabsCollection
					};
					var prevTabsCollection = this.get(tabsName + "Collection");
					if (prevTabsCollection) {
						prevTabsCollection.clear();
						prevTabsCollection.loadAll(tabsCollection);
					} else {
						this.set(tabsName + "Collection", tabsCollection);
					}
					if (tabsValues.length > 0) {
						var activeTabName = tabsValues[0].Name;
						var tabName  = tabsName.substring(0, tabsName.length - 1);
						this.set("Active" + tabName + "Name", activeTabName);
						var activeTab = tabsCollection.getByIndex(0);
						this.activeTabChange(activeTab);
					}
				},

				/**
				 * Returns tab caption.
				 * @private
				 * @param {Object} config Element parameters object.
				 * @return {String} caption Tab caption.
				 */
				getTabCaption: function(config) {
					var caption = config.caption;
					if (caption) {
						var resourceColumnValue = this.get(caption.bindTo);
						if (resourceColumnValue) {
							caption = resourceColumnValue;
						}
					}
					return caption;
				},

				/**
				 * Returns tab container visibility.
				 * @return {Boolean} Tab container visibility.
				 */
				getTabsContainerVisible: function() {
					return true;
				},

				/**
				 * #### ####### ## ##### # ######### ########### #######.
				 * @private
				 * @param {String} name ### ########.
				 * @param {Object} parent ###### ## ######## #### #####.
				 * @return {Object} ######, ########## ########## # ######### ########.
				 */
				getSchemaItemInfoByName: function(name, parent) {
					var result = null;
					if (!parent) {
						var schema = this.get("schema");
						parent = {items: schema.viewConfig};
					}
					Terrasoft.iterateChildItems(parent, function(iterationConfig) {
						var item = iterationConfig.item;
						if (item.name === name) {
							result = {
								item: item,
								parent: iterationConfig.parent,
								propertyName: iterationConfig.propertyName
							};
						}
						return Ext.isEmpty(result);
					}, this);
					return result;
				},

				/**
				 * ########## ####### ######### #############.
				 * @private
				 */
				onViewRendered: function() {
					pageDesignerUtilities.initializeGridLayoutDragAndDrop(Ext.bind(this.changeItemPosition, this));
					var sandbox = this.get("sandbox");
					sandbox.publish("ModuleLoaded");
				}

			};
			return Ext.define(fullClassName, config);
		}

		return {
			create: function(name, viewModelClass) {
				var defineDesignViewClass = defineDesignViewModel(name, viewModelClass);
				return Ext.create(defineDesignViewClass);
			},
			define: function(name, viewModelClass) {
				return defineDesignViewModel(name, viewModelClass);
			}
		};
	});


