Terrasoft.configuration.Structures["ForecastHierarchyItemViewModel"] = {innerHierarchyStack: ["ForecastHierarchyItemViewModel"]};
define("ForecastHierarchyItemViewModel", ["StructureExplorerUtilities", "ForecastHierarchyItemViewModelResources"],
	function(StructureExplorerUtilities, resources) {

		/**
		 * @class Terrasoft.configuration.ForecastHierarchyItemViewModel
		 * Forecast hierarchy item view model.
		 */
		Ext.define("Terrasoft.configuration.ForecastHierarchyItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.ForecastHierarchyItemViewModel",

			sandbox: null,

			entitySchemaName: null,

			resources: resources,

			StructureExplorerUtilities: StructureExplorerUtilities,

			attributes: {

				/**
				 * Column path.
				 * @type {String}
				 */
				"ColumnPath": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": ""
				},

				/**
				 * Column caption.
				 * @type {String}
				 */
				"ColumnCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"value": ""
				}
			},

			messages: {
				/**
				 * @message GetHierarchyCollection
				 * Gets hierarchy collection.
				 */
				"GetHierarchyCollection": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},

				/**
				 * @message DeleteHierarchyItem
				 * Delete hierarchy item.
				 */
				"DeleteHierarchyItem": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.on("change:Level", this._initLevelCaption, this);
				this._initLevelCaption();
				this.sandbox.registerMessages(this.messages);
			},

			/**
			 * @private
			 */
			_initLevelCaption: function() {
				const tpl = this.resources.localizableStrings.HierarchyLevelCaptionTpl;
				const level = this.get("Level") || 1;
				const caption = Ext.String.format(tpl, level);
				this.set("HierarchyLevelCaption", caption);
			},

			/**
			 * Opens StructureExplorer modal box.
			 */
			openStructureExplorer: function() {
				const config = this.getStructureExplorerConfig();
				this.StructureExplorerUtilities.Open(this.sandbox, config, this.structureExplorerHandler, this, this);
			},

			/**
			 * StructureExplorer selection handler.
			 * @virtual
			 * @param {Object} args Structure explorer selection result.
			 */
			structureExplorerHandler: function(args) {
				const columnCaption = args.leftExpressionCaption;
				const columnPath = args.leftExpressionColumnPath;
				this.set("ColumnPath", columnPath);
				this.set("ColumnCaption", columnCaption);
			},

			/**
			 * Forms StructureExplorer module config.
			 * @protected
			 * @virtual
			 * @return {Object} StructureExplorer module config
			 */
			getStructureExplorerConfig: function() {
				return {
					schemaName: this.entitySchemaName,
					columnPath: this.get("ColumnPath"),
					useBackwards: false,
					useCount: false,
					lookupsColumnsOnly: true,
					firstColumnsOnly: false,
					columnsFiltrationMethod: this.filterColumns.bind(this)
				};
			},

			/**
			 * Filters structure explorer columns list.
			 * @param {Object} column Column to check.
			 * @returns {Boolean} Is column valid.
			 */
			filterColumns: function(column) {
				if (column.dataValueType !== Terrasoft.DataValueType.LOOKUP) {
					return false;
				}
				const path = column.name;
				if (path === this.get("ColumnPath")) {
					return true;
				}
				let valid = true;
				const data = this.sandbox.publish("GetHierarchyCollection");
				if (data) {
					data.each(function(item) {
						valid = valid && item.get("ColumnPath") !== path;
					});
				}
				return valid;
			},

			/**
			 * Delete current item from hierarchy.
			 */
			deleteHierarchyItem: function() {
				this.sandbox.publish("DeleteHierarchyItem", this.get("Id"));
			},

			/**
			 * Returns marker value for item.
			 * @return {String} Marker value.
			 */
			getMarkerValue: function() {
				return "HierarchyItem_" + this.get("Level");
			},

			/**
			 * Returns marker value for delete button.
			 * @return {String} Marker value.
			 */
			getDeleteButtonMarkerValue: function() {
				return this.getMarkerValue() + "_DeleteButton";
			}
		});

		return Terrasoft.ForecastHierarchyItemViewModel;
	});


