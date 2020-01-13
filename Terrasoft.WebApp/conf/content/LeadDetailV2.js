Terrasoft.configuration.Structures["LeadDetailV2"] = {innerHierarchyStack: ["LeadDetailV2Lead", "LeadDetailV2CoreLead", "LeadDetailV2OrderLead", "LeadDetailV2"], structureParent: "BaseGridDetailV2"};
define('LeadDetailV2LeadStructure', ['LeadDetailV2LeadResources'], function(resources) {return {schemaUId:'6bac58be-9437-4efa-8db3-abb86ef6dea3',schemaCaption: "LeadDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'LeadDetailV2Lead',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadDetailV2CoreLeadStructure', ['LeadDetailV2CoreLeadResources'], function(resources) {return {schemaUId:'9622000f-7492-4cf8-8d97-0c82fd3fec16',schemaCaption: "LeadDetailV2", parentSchemaName: "LeadDetailV2Lead", schemaName:'LeadDetailV2CoreLead',parentSchemaUId:'6bac58be-9437-4efa-8db3-abb86ef6dea3',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadDetailV2Lead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadDetailV2OrderLeadStructure', ['LeadDetailV2OrderLeadResources'], function(resources) {return {schemaUId:'29e809f7-3931-4913-93c6-4b8b2d7292e8',schemaCaption: "LeadDetailV2", parentSchemaName: "LeadDetailV2CoreLead", schemaName:'LeadDetailV2OrderLead',parentSchemaUId:'9622000f-7492-4cf8-8d97-0c82fd3fec16',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadDetailV2CoreLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadDetailV2Structure', ['LeadDetailV2Resources'], function(resources) {return {schemaUId:'dc9c1534-415b-4262-b98e-6ad13db5bd42',schemaCaption: "LeadDetailV2", parentSchemaName: "LeadDetailV2OrderLead", schemaName:'LeadDetailV2',parentSchemaUId:'29e809f7-3931-4913-93c6-4b8b2d7292e8',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"LeadDetailV2OrderLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('LeadDetailV2LeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadDetailV2Lead", ["terrasoft"],
		function(Terrasoft) {
			return {
				entitySchemaName: "Lead",
				attributes: {},
				methods: {},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							type: "listed",
							listedConfig: {
								name: "DataGridListedConfig",
								items: [
									{
										name: "LeadNameListedGridColumn",
										bindTo: "LeadName",
										position: {column: 1, colSpan: 18}
									}
								]
							},
							tiledConfig: {
								name: "DataGridTiledConfig",
								grid: {
									columns: 24,
									rows: 2
								},
								items: [
									{
										name: "LeadNameTiledGridColumn",
										bindTo: "LeadName",
										position: {row: 1, column: 1, colSpan: 24},
										type: Terrasoft.GridCellType.TITLE
									}
								]
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);

define('LeadDetailV2CoreLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadDetailV2CoreLead", ["css!LeadDetailModule", "ControlGridModule", "BaseProgressBarModule",
		"css!BaseProgressBarModule"],
	function() {
		return {
			entitySchemaName: "Lead",
			attributes: {
				/**
				 * ####### ########### ########### #######.
				 * @type {Boolean}
				 */
				CanShowDataGrid: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {
				/**
				 * ######### ####### ########### ########### #######.
				 */
				updateCanShowDataGrid: function() {
					var masterRecordId = this.get("MasterRecordId");
					var canShowDataGrid = (masterRecordId && masterRecordId !== null);
					this.set("CanShowDataGrid", canShowDataGrid);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BaseDetailV2#getToolsVisible
				 * @overridden
				 */
				getToolsVisible: function() {
					return (!this.get("IsDetailCollapsed") && this.get("CanShowDataGrid"));
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BaseDetailV2#updateDetail
				 * @overridden
				 */
				updateDetail: function(config) {
					config.reloadAll = true;
					this.callParent(arguments);
					this.updateCanShowDataGrid();
				},

				/**
				 * Sets default values to launch lead management process.
				 */
				addDefaultValues: function() {
					var defValues = this.get("DefaultValues");
					defValues.push({
						name: "StartLeadManagementProcess",
						value: true
					});
					this.set("DefaultValues", defValues);
				},

				/**
				 * @inheritDoc Terrasoft.Configuration.BaseDetailV2#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.updateCanShowDataGrid();
					this.addDefaultValues();
					this.callParent([
						function() {
							callback.call(scope);
						},
						this
					]);
				},

				/**
				 * ##### ######## ## ###### ###### ######## ##########.
				 * @param {Object} control ###### ########## ###### ########.
				 * @overridden
				 */
				applyControlConfig: function(control) {
					control.config = {
						className: "Terrasoft.BaseProgressBar",
						value: {
							"bindTo": "QualifyStatus",
							"bindConfig": {"converter": "getQualifyStatusValue"}
						},
						width: "158px"
					};
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#addColumnLink
				 * @overridden
				 */
				addColumnLink: function(item) {
					item.getQualifyStatusValue = function(qualifyStatus) {
						if (!qualifyStatus) {
							return null;
						} else {
							return {
								value: this.get("QualifyStatus.StageNumber"),
								displayValue: qualifyStatus.displayValue
							};
						}
					};
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					gridDataColumns["QualifyStatus.StageNumber"] =
						gridDataColumns["QualifyStatus.StageNumber"] || {path: "QualifyStatus.StageNumber"};
					return gridDataColumns;
				},

				getIsCanShowDataGrid: function(canShowDataGrid) {
					return !canShowDataGrid;
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "LeadType";
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getOpenCardConfig
				 * @overridden
				 */
				getOpenCardConfig: function() {
					var config = this.Terrasoft.deepClone(this.callParent(arguments));
					var defaultValues = config && config.defaultValues ? config.defaultValues : null;
					if (defaultValues && !this.hasQualifiedEntities(defaultValues)) {
						this.addParentQualifiedEntities(defaultValues);
					}
					return config;
				},

				/**
				 * Returns true if list have QualifiedContact or QualifiedAccount.
				 * @private
				 * @param {Array} list Array of default values.
				 * @return {Boolean} True if list have QualifiedContact or QualifiedAccount.
				 */
				hasQualifiedEntities: function(list) {
					var values = list.filter(function(item) {
						return item.name === "QualifiedContact" || item.name === "QualifiedAccount";
					});
					return values.length !== 0;
				},

				/**
				 * Adds QualifiedContact and QualifiedAccount to default values if they exists.
				 * @private
				 * @param {Array} defaultValues Default values.
				 */
				addParentQualifiedEntities: function(defaultValues) {
					var parentViewModelValues = this.sandbox.publish("GetColumnsValues", ["Contact", "Account"],
							[this.sandbox.id]);
					if (parentViewModelValues) {
						this.Terrasoft.each(parentViewModelValues, function(item, itemName) {
							if (item && item.value) {
								var valueName = "Qualified" + itemName;
								defaultValues.push({
									name: valueName,
									value: item.value
								});
							}
						}, this);
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "DataGrid"
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "Detail",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID,
						"listedZebra": true,
						"collection": {"bindTo": "Collection"},
						"activeRow": {"bindTo": "ActiveRow"},
						"primaryColumnName": "Id",
						"isEmpty": {"bindTo": "IsGridEmpty"},
						"isLoading": {"bindTo": "IsGridLoading"},
						"multiSelect": {"bindTo": "MultiSelect"},
						"selectedRows": {"bindTo": "SelectedRows"},
						"sortColumn": {"bindTo": "sortColumn"},
						"sortColumnDirection": {"bindTo": "GridSortDirection"},
						"sortColumnIndex": {"bindTo": "SortColumnIndex"},
						"linkClick": {"bindTo": "linkClicked"},
						"className": "Terrasoft.ControlGrid",
						"controlColumnName": "QualifyStatus",
						"applyControlConfig": {"bindTo": "applyControlConfig"}
					}
				},
				{
					"operation": "insert",
					"name": "EmptyEntityLabel",
					"parentName": "Detail",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": ["t-label ts-empty-entity-label"]
						},
						"caption": {"bindTo": "Resources.Strings.EmptyEntityLabel"},
						"visible": {
							"bindTo": "CanShowDataGrid",
							"bindConfig": {"converter": "getIsCanShowDataGrid"}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define('LeadDetailV2OrderLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("LeadDetailV2OrderLead", [],
		function() {
			return {
				entitySchemaName: "Lead",
				messages: {},
				methods: {},
				diff: /**SCHEMA_DIFF*/[
				]/**SCHEMA_DIFF*/
			};
		}
);

define("LeadDetailV2", [],
	function() {
			return {
				entitySchemaName: "Lead",
				messages: {},
				methods: {},
				diff: /**SCHEMA_DIFF*/[
				]/**SCHEMA_DIFF*/
			};
		}
	);


