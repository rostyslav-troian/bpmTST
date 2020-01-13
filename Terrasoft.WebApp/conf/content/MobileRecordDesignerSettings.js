Terrasoft.configuration.Structures["MobileRecordDesignerSettings"] = {innerHierarchyStack: ["MobileRecordDesignerSettings"], structureParent: "MobileBaseDesignerSettings"};
define("MobileRecordDesignerSettings", ["ext-base", "MobileRecordDesignerSettingsResources", "MobileDesignerUtils",
		"MobileBaseDesignerSettings"],
	function(Ext, resources, MobileDesignerUtils) {

		/**
		 * @class Terrasoft.configuration.MobileBaseDesignerSettings
		 * ##### ######### ######## #########.
		 */
		var module = Ext.define("Terrasoft.configuration.MobileRecordDesignerSettings", {
			alternateClassName: "Terrasoft.MobileRecordDesignerSettings",
			extend: "Terrasoft.MobileBaseDesignerSettings",

			/**
			 * ################ ######.
			 * @type {Object}
			 */
			localizableStrings: null,

			/**
			 * ########### ######.
			 * @type {Object[]}
			 */
			details: null,

			/**
			 * ###### #######.
			 * @type {Object[]}
			 */
			columnSets: null,

			/**
			 * @private
			 */
			getDefaultColumnSets: function() {
				var columnSetCaption = resources.localizableStrings.PrimaryColumnSetCaption;
				var columnSetItem = this.createColumnSetItem({
					name: "primaryColumnSet",
					caption: columnSetCaption
				});
				columnSetItem.items = this.createDefaultColumnItemsByEntitySchema(this.entitySchema);
				return [columnSetItem];
			},

			/**
			 * @private
			 */
			getDefaultDetails: function() {
				var socialMessageLocalizableStringName = "SocialMessageDetailCaption";
				var socialMessageLocalizableStringKey = this.addLocalizableString(socialMessageLocalizableStringName,
					resources.localizableStrings[socialMessageLocalizableStringName]);
				return [
					{
						name: "SocialMessageDetailV2StandardDetail",
						caption: socialMessageLocalizableStringKey,
						entitySchemaName: "SocialMessage",
						showForVisibleModule: true,
						filter: {
							detailColumn: "EntityId",
							masterColumn: "Id"
						}
					}
				];
			},

			/**
			 * @private
			 */
			setColumnSetCaptionsByEntitySchema: function(entitySchema, columnSetConfig, config) {
				var columns = columnSetConfig.items || [];
				MobileDesignerUtils.setColumnsContentByPath({
					modelName: entitySchema.name,
					items: columns,
					callback: config.callback,
					scope: config.scope
				});
			},

			/**
			 * @private
			 */
			setColumnSetCaptionsByColumnSetConfig: function(columnSetConfig, config) {
				this.getEntitySchemaByName(columnSetConfig.entitySchemaName, function(entitySchema) {
					this.setColumnSetCaptionsByEntitySchema(entitySchema, columnSetConfig, config);
				}, this);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#initializeDefaultValues
			 * @protected
			 * @overridden
			 */
			initializeDefaultValues: function() {
				this.callParent(arguments);
				if (!this.localizableStrings) {
					this.localizableStrings = {};
				}
				if (!this.details) {
					this.details = this.getDefaultDetails();
				}
				if (!this.columnSets) {
					this.columnSets = this.getDefaultColumnSets();
				} else {
					this.columnSets.sort(function(a, b) {
						return a.position - b.position;
					});
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#initializeCaptionValues
			 * @protected
			 * @overridden
			 */
			initializeCaptionValues: function(config) {
				var columnSets = this.columnSets;
				if (!columnSets || columnSets.length === 0) {
					Ext.callback(config.callback, config.scope);
					return;
				}
				var originalCallback = config.callback;
				var processedColumnSetsCount = 0;
				var columnSetsCount = columnSets.length;
				var originalScope = config.scope;
				config.scope = this;
				config.callback = function() {
					processedColumnSetsCount++;
					if (processedColumnSetsCount === columnSetsCount) {
						Ext.callback(originalCallback, originalScope);
					}
				};
				for (var i = 0; i < columnSetsCount; i++) {
					var columnSetConfig = columnSets[i];
					var columnSetEntityName = columnSetConfig.entitySchemaName;
					if (columnSetEntityName === this.entitySchemaName) {
						this.setColumnSetCaptionsByEntitySchema(this.entitySchema, columnSetConfig, config);
					} else {
						this.setColumnSetCaptionsByColumnSetConfig(columnSetConfig, config);
					}
				}
			},

			/**
			 * ####### ################ ######.
			 * @param {String} key ### ################ ######.
			 */
			removeLocalizableString: function(key) {
				delete this.localizableStrings[key];
			},

			/**
			 * ######### ################ ###### ## #####.
			 * @param {String} name ###, ## ######## ############ #### ################ ######.
			 * @param {String} value ######## ################ ######.
			 * @returns {String} ### ################ ######.
			 */
			addLocalizableString: function(name, value) {
				var key = this.getLocalizableStringKey(name);
				this.localizableStrings[key] = value;
				return key;
			},

			/**
			 * ######### ################ ###### ## #####.
			 * @param {String} key #### ################ ######.
			 * @param {String} value ######## ################ ######.
			 */
			setLocalizableString: function(key, value) {
				this.localizableStrings[key] = value;
			},

			/**
			 * ########## ################ ###### ## #####.
			 * @param {String} key #### ################ ######.
			 * @returns {String} ################ ######.
			 */
			getLocalizableStringByKey: function(key) {
				return this.localizableStrings[key];
			},

			/**
			 * ########## #### ################ ###### ## #####.
			 * @param {String} name ###, ## ######## ############ #### ################ ######.
			 * @returns {String} #### ################ ######.
			 */
			getLocalizableStringKey: function(name) {
				return name + this.entitySchemaName + "_caption";
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#removeItem
			 * @overridden
			 */
			removeItem: function(name, item) {
				this.removeLocalizableString(item.caption);
				this.callParent(arguments);
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#applyItem
			 * @overridden
			 */
			applyItem: function(name, item, newItem) {
				if (item.name !== newItem.name) {
					this.removeLocalizableString(item.caption);
				}
				this.callParent(arguments);
			},

			/**
			 * ######### ######.
			 * @param {Object} detailItem ################ ###### ######.
			 */
			addDetailItem: function(detailItem) {
				this.addItem("details", detailItem);
			},

			/**
			 * ####### ######.
			 * @param detailItem ################ ###### ######.
			 */
			removeDetailItem: function(detailItem) {
				this.removeItem("details", detailItem);
			},

			/**
			 * ######### ##### ######## ######.
			 * @param {Object} detailItem ################ ###### ######.
			 * @param {Object} newDetailItem ################ ###### ##### ######.
			 */
			applyDetailItem: function(detailItem, newDetailItem) {
				this.applyItem("details", detailItem, newDetailItem);
			},

			/**
			 * ######### ###### #######.
			 * @param columnSetItem ################ ###### ###### #######.
			 */
			addColumnSetItem: function(columnSetItem) {
				this.addItem("columnSets", columnSetItem);
			},

			/**
			 * ####### ###### #######.
			 * @param columnSetItem ################ ###### ###### #######.
			 */
			removeColumnSetItem: function(columnSetItem) {
				this.removeItem("columnSets", columnSetItem);
			},

			/**
			 * ######### ##### ######## ###### #######.
			 * @param {Object} columnSetItem ################ ###### ###### #######.
			 * @param {Object} newColumnSetItem ################ ###### ##### ###### #######.
			 */
			applyColumnSetItem: function(columnSetItem, newColumnSetItem) {
				this.applyItem("columnSets", columnSetItem, newColumnSetItem);
			},

			/**
			 * ########## ###### ####### ## #### #######.
			 * @param {Object} item #######.
			 * @param {Number} offset ######## ########.
			 * @returns {Boolean} true, #### ########## #######.
			 */
			moveColumnSetItem: function(item, offset) {
				var columnSets = this.columnSets;
				if (offset === -1 && columnSets.indexOf(item) === 1) {
					return false;
				}
				return this.moveItem("columnSets", item, offset);
			},

			/**
			 * ####### ###### ## #####.
			 * @param {String} name ### ######.
			 * @returns {Object|null} ######.
			 */
			findDetailItemByName: function(name) {
				return this.findDetailItemByPropertyName("name", name);
			},

			/**
			 * ####### ###### ## ##### #####.
			 * @param {String} name ### ##### ######.
			 * @returns {Object|null} ######.
			 */
			findDetailItemBySchemaName: function(name) {
				return this.findDetailItemByPropertyName("detailSchemaName", name);
			},

			/**
			 * ####### ###### ## ##### ######## # ########.
			 * @param {String} propertyName ### ######## ######.
			 * @param {String} value ######## ######## ######.
			 * @returns {Object|null} ######.
			 */
			findDetailItemByPropertyName: function(propertyName, value) {
				return this.findItemByPropertyName("details", propertyName, value);
			},

			/**
			 * ####### ###### ####### ## #####.
			 * @param {String} value ### ###### #######.
			 * @returns {Object} ###### #######.
			 */
			findColumnSetItemByName: function(value) {
				return this.findColumnSetItemByPropertyName("name", value);
			},

			/**
			 * ####### ###### ####### ## ######## # #####.
			 * @param {String} propertyName ### ######## ###### #######.
			 * @param {String} value ### ###### #######.
			 * @returns {Object} ###### #######.
			 */
			findColumnSetItemByPropertyName: function(propertyName, value) {
				return this.findItemByPropertyName("columnSets", propertyName, value);
			},

			/**
			 * Creates configuration for standard detail element.
			 * @param {Object} config Configuration object.
			 * @returns {Object} Configuration of standard detail element.
			 */
			createDetailItem: function(config) {
				var name = config.name + "StandardDetail";
				var localizableStringKey = this.addLocalizableString(name, config.caption);
				var detailItem = {
					caption: localizableStringKey,
					entitySchemaName: config.entitySchemaName,
					filter: config.filter,
					name: name,
					detailSchemaName: config.name
				};
				return detailItem;
			},

			/**
			 * ####### ############ ######## ###### #######.
			 * @param {Object} config ############ ###### #######.
			 * @returns {Object} ############ ######## ###### #######.
			 */
			createColumnSetItem: function(config) {
				var columnSetItem = {
					items: [],
					rows: 1
				};
				var nameSuffix;
				if (config.isDetail) {
					columnSetItem.isDetail = true;
					columnSetItem.filter = config.filter;
					columnSetItem.detailSchemaName = config.name;
					columnSetItem.entitySchemaName = config.entitySchemaName;
					nameSuffix = "EmbeddedDetail";
				} else {
					columnSetItem.entitySchemaName = this.entitySchemaName;
					nameSuffix = "";
				}
				columnSetItem.name = config.name + nameSuffix;
				columnSetItem.caption = this.addLocalizableString(columnSetItem.name, config.caption);
				return columnSetItem;
			},

			/**
			 * ########## ###### ############ ######### #######.
			 * @param {Object} entitySchema ######### #####.
			 * @returns {Object[]} ###### ############ ######### #######.
			 */
			createDefaultColumnItemsByEntitySchema: function(entitySchema) {
				var primaryDisplayColumn = entitySchema.primaryDisplayColumn;
				var primaryColumn = entitySchema.primaryColumn;
				var columns = [];
				if (primaryDisplayColumn) {
					columns.push(primaryDisplayColumn);
				}
				Terrasoft.each(entitySchema.columns, function(column) {
					if (column.isRequired && column !== primaryDisplayColumn && column !== primaryColumn) {
						columns.push(column);
					}
				});
				var items = [];
				for (var i = 0, ln = columns.length; i < ln; i++) {
					var column = columns[i];
					var columnItem = this.createColumnItem({
						row: i,
						caption: column.caption,
						columnName: column.name,
						dataValueType: column.dataValueType
					});
					items.push(columnItem);
				}
				return items;
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#getSettingsConfig
			 * @overridden
			 */
			getSettingsConfig: function() {
				var settingsConfig = this.callParent(arguments);
				settingsConfig.details = this.details;
				var columnSets = this.columnSets;
				for (var i = 0, ln = columnSets.length; i < ln; i++) {
					columnSets[i].position = i;
				}
				settingsConfig.columnSets = columnSets;
				settingsConfig.localizableStrings = this.localizableStrings;
				return settingsConfig;
			}

		});
		return module;

	});


