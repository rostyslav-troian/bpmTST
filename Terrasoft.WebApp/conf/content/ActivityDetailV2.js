Terrasoft.configuration.Structures["ActivityDetailV2"] = {innerHierarchyStack: ["ActivityDetailV2"], structureParent: "BaseGridDetailV2"};
define('ActivityDetailV2Structure', ['ActivityDetailV2Resources'], function(resources) {return {schemaUId:'c98e0daa-7ee5-4acd-9711-3988e14afb3b',schemaCaption: "Detail schema - Activities v2", parentSchemaName: "BaseGridDetailV2", schemaName:'ActivityDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ActivityDetailV2", ["terrasoft", "ProcessModuleUtilities", "ConfigurationConstants"],
		function(Terrasoft, ProcessModuleUtilities, ConfigurationConstants) {
			return {
				/**
				 * Entity schema name.
				 * @type {String}
				 */
				entitySchemaName: "Activity",

				messages: {
					/**
					 * @message ProcessExecDataChanged
					 * Defines that process parameters must be send.
					 * @param {Object} processExecData additional data for the opening page.
					 * @param {String} processExecData.procElUId process element uid.
					 * @param {String} processExecData.recordId record id.
					 * @param {Object} processExecData.scope execution scope.
					 * @param {Object|Array} processExecData.parentMethodArguments parent methods arguments.
					 * @param {Function} processExecData.parentMethod parent method.
					 */
					"ProcessExecDataChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
				},
				methods: {

					/**
					 * @inheritdoc Terrasoft.ActivitySectionV2#getFilters
					 * @overridden
					 */
					getFilters: function() {
						var filters = this.callParent(arguments),
							activityTypes = ConfigurationConstants.Activity.Type;
						filters.add("NotEmailFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Type", activityTypes.Email));
						return filters;
					},

					/**
					 * Initializes entities edit pages collection.
					 * Removes pages from collection for call type.
					 * @inheritdoc Terrasoft.BaseSection#initEditPages
					 * @override
					 */
					initEditPages: function() {
						var enabledEditPages = new this.Terrasoft.Collection();
						this.callParent(arguments);
						var editPages = this.get("EditPages");
						var activityTypes = ConfigurationConstants.Activity.Type;
						var exceptActivityTypes = [activityTypes.Email, activityTypes.Call];
						this.Terrasoft.each(editPages.getItems(), function(item) {
							var itemId = item.get("Id");
							if (!Terrasoft.contains(exceptActivityTypes, itemId)) {
								enabledEditPages.add(itemId, item);
							}
						});
						this.set("EnabledEditPages", enabledEditPages);
						this.set("EditPages", enabledEditPages);
					},

					/**
					 * Opens process card if this is BP activity.
					 * @param {Object} config Config.
					 * @param {Object} config.scope Scope for the calling method.
					 * @param {String} config.activeRow The Id of the current entity.
					 * @param {Function} config.parentMethod Parent method.
					 * @param {Object|Array} config.parentMethodArguments Arguments of the parent method.
					 * @param {Object} config.scope Scope for the calling method.
					 * @return {Boolean} True if process card opened.
					 * @private
					 */
					tryOpenProcessCard: function(config) {
						var activeRow = config.activeRow;
						var processCardConfig = this.getProcessCardConfig(activeRow);
						if (this.Ext.isEmpty(processCardConfig)) {
							return false;
						}
						processCardConfig.scope = config.scope;
						processCardConfig.parentMethodArguments = config.parentMethodArguments;
						processCardConfig.parentMethod = config.parentMethod;
						return ProcessModuleUtilities.tryShowProcessCard.call(this, processCardConfig);
					},

					/**
					 * Gets process card config.
					 * @param {String} activeRow The Id of the current entity.
					 * @return {Object} Process card config.
					 * @private
					 */
					getProcessCardConfig: function(activeRow) {
						var config = {};
						if (activeRow) {
							var gridData = this.getGridData();
							var activeRowModel = gridData.get(activeRow);
							config.procElUId = activeRowModel.get("ProcessElementId");
							config.recordId = activeRowModel.get(this.primaryColumnName);
						}
						return config;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#editRecord
					 * @overridden
					 */
					editRecord: function(record) {
						record = record || this.getActiveRow();
						if (!record) {
							return this.callParent(arguments);
						}
						var activeRow = record.get(record.primaryColumnName);
						var config = {
							activeRow: activeRow,
							scope: this,
							parentMethodArguments: arguments,
							parentMethod: this.getParentMethod()
						};
						if (this.tryOpenProcessCard(config)) {
							return false;
						}
						this.callParent(arguments);
					},

					/**
					 * @overridden
					 */
					getGridDataColumns: function() {
						var gridDataColumns = this.callParent(arguments);
						if (!gridDataColumns.ProcessElementId) {
							gridDataColumns.ProcessElementId = {
								path: "ProcessElementId"
							};
						}
						return gridDataColumns;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#linkClicked
					 * @overridden
					 */
					linkClicked: function(href, columnName) {
						if (columnName !== this.primaryDisplayColumnName &&
								columnName !== ("on" + this.primaryDisplayColumnName + "LinkClick")) {
							return this.callParent(arguments);
						}
						var linkParams = href.split("/");
						var recordId = linkParams[linkParams.length - 1];
						var config = {
							activeRow: recordId,
							scope: this,
							parentMethodArguments: arguments,
							parentMethod: this.getParentMethod()
						};
						if (this.tryOpenProcessCard(config)) {
							return false;
						}
						return this.callParent(arguments);
					},

					/**
					 * Returns column name for default filtration.
					 * @overridden
					 * @return {String} Column name.
					 */
					getFilterDefaultColumnName: function() {
						return "Title";
					}
				},

				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"type": "listed",
							"listedConfig": {
								"name": "DataGridListedConfig",
								"items": [
									{
										"name": "TitleListedGridColumn",
										"bindTo": "Title",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"column": 1,
											"colSpan": 12
										}
									},
									{
										"name": "StartDateListedGridColumn",
										"bindTo": "StartDate",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "StatusDateListedGridColumn",
										"bindTo": "Status",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"column": 19,
											"colSpan": 6
										}
									}
								]
							},
							"tiledConfig": {
								"name": "DataGridTiledConfig",
								"grid": {
									"columns": 24,
									"rows": 3
								},
								"items": [
									{
										"name": "TitleTiledGridColumn",
										"bindTo": "Title",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 24
										},
										"captionConfig": {
											"visible": true
										}
									},
									{
										"name": "StartDateTiledGridColumn",
										"bindTo": "StartDate",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 6
										}
									},
									{
										"name": "OwnerTiledGridColumn",
										"bindTo": "Owner",
										"type": Terrasoft.GridCellType.Text,
										"position": {
											"row": 2,
											"column": 7,
											"colSpan": 12
										}
									},
									{
										"name": "StatusDateTiledGridColumn",
										"bindTo": "Status",
										"type": Terrasoft.GridCellType.TEXT,
										"position": {
											"column": 19,
											"colSpan": 6
										}
									}
								]
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


