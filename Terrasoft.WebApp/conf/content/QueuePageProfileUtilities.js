Terrasoft.configuration.Structures["QueuePageProfileUtilities"] = {innerHierarchyStack: ["QueuePageProfileUtilities"]};
define("QueuePageProfileUtilities", ["QueueItem"], function(QueueItem) {

		/**
		 * @class Terrasoft.configuration.mixins.QueuePageProfileUtilities
		 * ###### ### ###### # ######## ## ######## #######.
		 * @type {Terrasoft.BaseObject}
		 */
		Ext.define("Terrasoft.configuration.mixins.QueuePageProfileUtilities", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.QueuePageProfileUtilities",

			//region Properties: Private

			/**
			 * ############ ####### ####### # ###### ########### "########".
			 * @private
			 * @type {Object[]}
			 */
			pageModeColumnsConfig: [
				{
					columnName: "CreatedOn",
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					span: 5
				},
				{
					columnName: "Queue",
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					span: 8,
					referenceSchemaName: "Queue"
				}
			],

			/**
			 * ############ ####### ####### # ###### ########### "######".
			 * @private
			 * @type {Object[]}
			 */
			detailModeColumnsConfig: [
				{
					columnName: "Status",
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					span: 4,
					referenceSchemaName: "QueueItemStatus"
				},
				{
					columnName: "Operator",
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					span: 7,
					referenceSchemaName: "Contact"
				},
				{
					columnName: "NextProcessingDate",
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					span: 3
				},
				{
					columnName: "PostponesCount",
					dataValueType: Terrasoft.DataValueType.INTEGER,
					span: 3
				}
			],

			/**
			 * ############ ##### ####### #######.
			 * @private
			 * @type {Number}
			 */
			maxColumnsCount: 24,

			//endregion

			//region Methods: Private

			/**
			 * ########## ######### ######### ### ########### ####### ####### #######.
			 * @private
			 * @param {Terrasoft.EntitySchema} entitySchema ##### ####### #######.
			 * @returns {Object}
			 */
			getSchemaPrimaryDisplayColumnConfig: function(entitySchema) {
				var entitySchemaName = entitySchema.name;
				var schemaPrimaryDisplayColumn = entitySchema.primaryDisplayColumn;
				if (!schemaPrimaryDisplayColumn) {
					return null;
				}
				var primaryDisplayColumnName = schemaPrimaryDisplayColumn.name;
				var captionObj = schemaPrimaryDisplayColumn.caption;
				var primaryDisplayColumnCaption = captionObj.getValue();
				var primaryDisplayColumnPath = Ext.String.format("[{0}:Id:EntityRecordId].{1}", entitySchemaName,
						primaryDisplayColumnName);
				return {
					caption: primaryDisplayColumnCaption,
					columnPath: primaryDisplayColumnPath,
					schemaName: entitySchemaName
				};
			},

			/**
			 * ########## ######### #######, ####### ##### ######## # #######.
			 * @private
			 * @param {Terrasoft.EntitySchema} schemaInstance ######### #####.
			 * @returns {Object} ######### #######.
			 */
			getColumnItemsConfig: function(schemaInstance) {
				var schemaPrimaryDisplayColumnConfig = this.getSchemaPrimaryDisplayColumnConfig(schemaInstance);
				var pageColumnItems = this.getProfileColumns({
					columnsConfig: this.pageModeColumnsConfig,
					primaryDisplayColumnConfig: schemaPrimaryDisplayColumnConfig
				});
				var detailColumnItems = this.getProfileColumns({
					columnsConfig: this.detailModeColumnsConfig,
					primaryDisplayColumnConfig: schemaPrimaryDisplayColumnConfig
				});
				return {
					pageColumnItems: pageColumnItems,
					detailColumnItems: detailColumnItems
				};
			},

			/**
			 * ########## ###### ########## ####### ### ########## # #######.
			 * @private
			 * @param {Object} config ######### ########### #######.
			 * @returns {Object[]}
			 */
			getProfileColumns: function(config) {
				var columnsConfig = config.columnsConfig;
				var primaryDisplayColumnConfig = config.primaryDisplayColumnConfig;
				var primaryDisplayColumnSpan = this.maxColumnsCount;
				var profileColumns = columnsConfig.map(function(columnConfig) {
					var profileColumn = this.getQueueItemSchemaColumn({
						columnName: columnConfig.columnName,
						dataValueType: columnConfig.dataValueType,
						referenceSchemaName: columnConfig.referenceSchemaName,
						span: columnConfig.span
					});
					primaryDisplayColumnSpan -= columnConfig.span;
					return profileColumn;
				}.bind(this));
				if (primaryDisplayColumnConfig && (primaryDisplayColumnSpan > 0)) {
					this.addProfilePrimaryDisplayColumn(profileColumns, primaryDisplayColumnConfig,
						primaryDisplayColumnSpan);
				}
				this.adjustProfileColumnsPosition(profileColumns);
				return profileColumns;
			},

			/**
			 * ######### ######### ### ########### ####### ####### #######.
			 * @private
			 * @param {Object[]} profileColumns ###### ####### ### ########## # #######.
			 * @param {Object} primaryDisplayColumnConfig ######### ######### ### ########### ####### #######.
			 * @param {String} primaryDisplayColumnConfig.columnPath #### # ####### # #### ######.
			 * @param {String} primaryDisplayColumnConfig.caption ######### #######.
			 * @param {String} primaryDisplayColumnConfig.schemaName ### ##### ####### #######.
			 * @param {Number} span ###### #######.
			 */
			addProfilePrimaryDisplayColumn: function(profileColumns, primaryDisplayColumnConfig, span) {
				var primaryDisplayColumnPath = primaryDisplayColumnConfig.columnPath;
				var primaryDisplayProfileColumn = {
					"bindTo": primaryDisplayColumnPath,
					"caption": primaryDisplayColumnConfig.caption,
					"captionConfig": {"visible": true},
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"metaPath": primaryDisplayColumnPath,
					"path": primaryDisplayColumnPath,
					"span": span,
					"referenceSchemaName": primaryDisplayColumnConfig.schemaName
				};
				profileColumns.unshift(primaryDisplayProfileColumn);
			},

			/**
			 * ########### ####### ####### ####### ### ########## # #######.
			 * @private
			 * @param {Object[]} profileColumns ###### ####### ### ########## # #######.
			 */
			adjustProfileColumnsPosition: function(profileColumns) {
				var currentPosition = 0;
				for (var i = 0, columnsCount = profileColumns.length; i < columnsCount; i++) {
					var column = profileColumns[i];
					var colSpan = column.span;
					delete column.span;
					column.position = {
						"column": currentPosition,
						"colSpan": colSpan,
						"row": 1
					};
					currentPosition += colSpan;
				}
			},

			/**
			 * ####### ####### ####### "####### ####### ####### ####".
			 * @private
			 * @param {Object} config ######### #######.
			 * @param {String} config.columnName ######## #######.
			 * @param {Terrasoft.DataValueType} config.dataValueType ### ######.
			 * @param {Object} config.position ############ ####### #######.
			 * @param {String} config.referenceSchemaName (optional) ######## #####, ## ####### ######### #######.
			 * @returns {Object} ####### ####### "####### ####### ####### ####".
			 */
			getQueueItemSchemaColumn: function(config) {
				var schemaColumn = QueueItem.columns[config.columnName];
				return {
					"bindTo": config.columnName,
					"caption": schemaColumn.caption,
					"captionConfig": {"visible": true},
					"dataValueType": config.dataValueType,
					"metaPath": config.columnName,
					"path": config.columnName,
					"span": config.span,
					"referenceSchemaName": config.referenceSchemaName
				};
			},

			//endregion

			//region Methods: Public

			/**
			 * ########## #### ####### # ###### ########### "########".
			 * @public
			 * @param {String} entitySchemaName ######## ##### ########## #######.
			 * @returns {String} #### #######.
			 */
			getPageProfileKey: function(entitySchemaName) {
				return entitySchemaName + "QueuePage";
			},

			/**
			 * ########## #### ####### # ###### ########### "######".
			 * @public
			 * @param {String} entitySchemaName ######## ##### ########## #######.
			 * @returns {String} #### #######.
			 */
			getDetailProfileKey: function(entitySchemaName) {
				return entitySchemaName + "QueueDetail_" + this.get("Id");
			},

			/**
			 * ########## ############ ######### #######.
			 * @param {String} profileKey #### #######.
			 * @param {Object[]} columnItems ###### #######.
			 * @returns ############ ######### #######.
			 */
			getProfileConfig: function(profileKey, columnItems) {
				return {
					"tiledColumnsConfig": "{}",
					"listedColumnsConfig": "{}",
					"DataGrid": {
						"key": profileKey,
						"isTiled": true,
						"type": "tiled",
						"tiledConfig": Ext.encode({
							"grid": {
								"rows": 1,
								"columns": this.maxColumnsCount
							},
							"items": columnItems
						}),
						"listedConfig": Ext.encode({"items": columnItems})
					},
					"key": profileKey
				};
			},

			/**
			 * ######### ####### ####### ####### ## #########.
			 * @public
			 * @param {String} schemaUId ############# #####.
			 * @param {Function} callback ####### ######### ######, ####### ########## ##### #### ### ######### ######
			 * ## ########## # ####### ## #########.
			 */
			saveDefaultGridProfile: function(schemaUId, callback) {
				Terrasoft.EntitySchemaManager.getItemByUId(schemaUId, function(schema) {
					schema.getInstance(function(schemaInstance) {
						var entitySchemaName = schemaInstance.name;
						var pageProfileKey = this.getPageProfileKey(entitySchemaName);
						var detailProfileKey = this.getDetailProfileKey(entitySchemaName);
						var columnItemsConfig = this.getColumnItemsConfig(schemaInstance);
						var pageProfileConfig =
							this.getProfileConfig(pageProfileKey, columnItemsConfig.pageColumnItems);
						var detailProfileConfig =
							this.getProfileConfig(detailProfileKey, columnItemsConfig.detailColumnItems);
						Terrasoft.utils.saveUserProfile(pageProfileKey, pageProfileConfig, true, function() {
							Terrasoft.utils.saveUserProfile(detailProfileKey, detailProfileConfig, true, function() {
								if (callback) {
									callback();
								}
							});
						}.bind(this));
					}.bind(this));
				}.bind(this));
			}

			//endregion

		});
	});


