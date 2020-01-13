Terrasoft.configuration.Structures["MobileGridDesignerSettings"] = {innerHierarchyStack: ["MobileGridDesignerSettings"], structureParent: "MobileBaseDesignerSettings"};
define("MobileGridDesignerSettings", ["ext-base", "MobileDesignerUtils", "MobileBaseDesignerSettings"],
	function(Ext, MobileDesignerUtils) {

		/**
		 * Terrasoft.configuration.MobileGridDesignerSettings
		 * Mobile designer grid configuration class.
		 */
		var module = Ext.define("Terrasoft.configuration.MobileGridDesignerSettings", {
			alternateClassName: "Terrasoft.MobileGridDesignerSettings",
			extend: "Terrasoft.MobileBaseDesignerSettings",

			/**
			 * Grid columns.
			 * @type {Object[]}
			 */
			items: null,

			/**
			 * Grid subtitle columns.
			 * @type {Object[]}
			 */
			subtitleItems: null,

			/**
			 * Grid group columns.
			 * @type {Object[]}
			 */
			groupItems: null,

			/**
			 * @private
			 */
			getDefaultItems: function() {
				var entitySchema = this.entitySchema;
				var primaryColumn = entitySchema.primaryDisplayColumn;
				if (!primaryColumn) {
					primaryColumn = entitySchema.primaryColumn;
				}
				var columnItem = this.createColumnItem({
					row: 0,
					caption: primaryColumn.caption,
					columnName: primaryColumn.name,
					dataValueType: primaryColumn.dataValueType
				});
				return [columnItem];
			},

			/**
			 * @private
			 */
			mergeSecondaryColumn: function(secondaryColumn) {
				var maxRow = -1;
				var hasColumn = false;
				for (var i = 0, ln = this.subtitleItems.length; i < ln; i++) {
					var columnItem = this.subtitleItems[i];
					if (columnItem.columnName === secondaryColumn.columnName) {
						hasColumn = true;
						break;
					}
					if (columnItem.row > maxRow) {
						maxRow = this.subtitleItems[i].row;
					}
				}
				if (!hasColumn) {
					secondaryColumn.row = maxRow + 1;
					this.subtitleItems.push(secondaryColumn);
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#initializeDefaultValues
			 * @override
			 */
			initializeDefaultValues: function() {
				this.callParent(arguments);
				if (!this.items) {
					this.items = this.getDefaultItems();
				}
				if (!this.subtitleItems) {
					this.subtitleItems = [];
				}
				if (this.items[1]) {
					var secondaryColumn = this.items.pop();
					this.mergeSecondaryColumn(secondaryColumn);
				}
				if (!this.groupItems) {
					this.groupItems = [];
				}
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#initializeCaptionValues
			 * @override
			 */
			initializeCaptionValues: function(config) {
				var items = this.items || [];
				var subtitleItems = this.subtitleItems || [];
				var groupItems = this.groupItems || [];
				var searchItems = [].concat(items, subtitleItems, groupItems);
				MobileDesignerUtils.setColumnsContentByPath({
					modelName: this.entitySchema.name,
					items: searchItems,
					callback: config.callback,
					scope: config.scope
				});
			},

			/**
			 * @inheritDoc Terrasoft.MobileBaseDesignerSettings#getSettingsConfig
			 * @override
			 */
			getSettingsConfig: function() {
				var settingsConfig = this.callParent(arguments);
				settingsConfig.items = this.items;
				settingsConfig.subtitleItems = this.subtitleItems;
				settingsConfig.groupItems = this.groupItems;
				return settingsConfig;
			}

		});
		return module;

	});


