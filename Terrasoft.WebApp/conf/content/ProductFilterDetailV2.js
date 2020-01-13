Terrasoft.configuration.Structures["ProductFilterDetailV2"] = {innerHierarchyStack: ["ProductFilterDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductFilterDetailV2Structure', ['ProductFilterDetailV2Resources'], function(resources) {return {schemaUId:'c6505c42-9541-4d13-a8dd-0d8ce04e52f3',schemaCaption: "Filters detail in product type", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductFilterDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductFilterDetailV2", ["LocalizableHelper", "ServiceHelper",
	"ProductManagementDistributionConstants", "StructureExplorerUtilities", "SpecificationConstants"],
	function(LocalizableHelper, ServiceHelper, DistributionConsts, StructureExplorerUtilities, SpecificationConstants) {
		return {
			entitySchemaName: "ProductFilter",
			messages: {
				/**
				 * @message StructureExplorerInfo
				 * ########## ### ###### StructureExplorerUtilities
				 */
				"StructureExplorerInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ColumnSelected
				 * ########## ### ###### StructureExplorerUtilities
				 */
				"ColumnSelected": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				/**
				 * ########## ####### ## ###### ########## ####### ## ####### ########
				 * @protected
				 */
				addColumnFilterRecord: function() {
					this.addRecord(DistributionConsts.ProductFilterTypes.ColumnFilter);
				},

				/**
				 * ########## ####### ## ###### ########## ####### ## ##############
				 * @protected
				 */
				addSpecificationFilterRecord: function() {
					this.addRecord(DistributionConsts.ProductFilterTypes.SpecificationFilter);
				},

				/**
				 * ######### ########## ######.
				 * @param {String} filterType ############ #### #######.
				 * @protected
				 * @overridden
				 */
				addRecord: function(filterType) {
					this.set("RequiredFilterType", filterType);
					this.sandbox.publish("SaveRecord", {
						isSilent: true,
						messageTags: [this.sandbox.id]
					}, [this.sandbox.id]);
				},

				/**
				 * ######### Lookup ### ###### ############## ### StructureExplorer ###
				 * ###### ####### ######## # ########### ## RequiredFilterType.
				 * @protected
				 * @virtual
				 */
				onCardSaved: function() {
					var filterType = this.get("RequiredFilterType");
					switch (filterType) {
						case (DistributionConsts.ProductFilterTypes.ColumnFilter):
							this.openProductStructureExplorer();
							break;
						case (DistributionConsts.ProductFilterTypes.SpecificationFilter):
							this.openSpecificationInProductLookup();
							break;
					}
				},

				/**
				 * Opens StructureExplorer window.
				 * @private
				 */
				openProductStructureExplorer: function() {
					var excludeTypes = this.get("excludeProductColumnTypes");
					var config = {
						useBackwards: true,
						summaryColumnsOnly: false,
						excludeDataValueTypes: excludeTypes,
						schemaName: "Product"
					};
					var handler = this.productStructureExplorerHandler;
					StructureExplorerUtilities.Open(this.sandbox,
						config, handler, this.renderTo, this);
				},

				/**
				 * ########## ###### StructureExplorer.
				 * ######### ######### #### ## ############ # ######### ###### ## ######.
				 * @param {Object} args ######## ######### ###### ############.
				 */
				productStructureExplorerHandler: function(args) {
					var productTypeId = this.get("MasterRecordId");
					var columnDataValueType = args.dataValueType;
					var columnCaption = args.leftExpressionCaption;
					var filterName = columnCaption.split(".").reverse()[0];
					var columnPath = args.leftExpressionColumnPath;
					var referenceSchemaName = args.referenceSchemaName;
					var filterType = DistributionConsts.ProductFilterTypes.ColumnFilter;
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ProductFilter"
					});
					select.addAggregationSchemaColumn("Id", this.Terrasoft.AggregationType.COUNT, "IdCOUNT");
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ProductType", productTypeId));
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"ColumnPath", columnPath));
					select.getEntityCollection(function(response) {
						var message = "";
						var success = true;
						if (response.success) {
							if (response.collection.getCount() < 1) {
								message = this.get("Resources.Strings.CantCheckProductColumnFilterError");
							} else {
								var selectResult  =  response.collection.getByIndex(0);
								var filtersCount = selectResult.get("IdCOUNT");
								if (filtersCount > 0) {
									message = this.get("Resources.Strings.ProductColumnFilterExists");
									success = false;
								}
							}
						} else {
							message = this.get("Resources.Strings.CantCheckProductColumnFilterError");
							success = false;
						}
						if (success) {
							var insert = this.Ext.create("Terrasoft.InsertQuery", {
								rootSchemaName: "ProductFilter"
							});
							insert.setParameterValue("ProductType", productTypeId, this.Terrasoft.DataValueType.GUID);
							insert.setParameterValue("Type", filterType, this.Terrasoft.DataValueType.GUID);
							insert.setParameterValue("Name", filterName, this.Terrasoft.DataValueType.TEXT);
							insert.setParameterValue("ColumnCaption", columnCaption, this.Terrasoft.DataValueType.TEXT);
							insert.setParameterValue("ColumnPath", columnPath, this.Terrasoft.DataValueType.TEXT);
							insert.setParameterValue("ReferenceSchemaName", referenceSchemaName, this.Terrasoft.DataValueType.TEXT);
							insert.setParameterValue("ColumnDataValueType", columnDataValueType, this.Terrasoft.DataValueType.INTEGER);
							insert.execute(this.onItemInsert, this);
						} else {
							this.showInformationDialog(message);
						}
					}, this);
				},

				/**
				 * ######## ###### ### ###### ###### #############
				 * @private
				 */
				openSpecificationInProductLookup: function() {
					var productTypeId = this.get("MasterRecordId");
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ProductFilter"
					});
					esq.addColumn("Specification.Id", "SpecificationId");
					esq.filters.add("ExistsFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ProductType", productTypeId));
					esq.filters.add("FilterTypeFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type",
						DistributionConsts.ProductFilterTypes.SpecificationFilter));
					esq.getEntityCollection(function(result) {
						var existsCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								existsCollection.push(item.get("SpecificationId"));
							});
						}
						var filterGroup = this.Terrasoft.createFilterGroup();
						if (existsCollection.length > 0) {
							var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id", existsCollection);
							existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
							filterGroup.add("existsFilter", existsFilter);
						}
						var supportedSpecificationTypes = [
							SpecificationConstants.SpecificationTypes.StringType,
							SpecificationConstants.SpecificationTypes.ListType
						];
						var specTypeFilter = this.Terrasoft.createColumnInFilterWithParameters("Type",
							supportedSpecificationTypes);
						filterGroup.add("supportedSpecificationTypes", specTypeFilter);
						var config = {
							entitySchemaName: "Specification",
							multiSelect: true,
							filters: filterGroup
						};
						this.openLookup(config, this.addCallBack, this);
					}, this);
				},

				/**
				 * callBack ####### openLookup
				 * @private
				 * @param {Object} args - ######### ###### ## ###### #############
				 */
				addCallBack: function(args) {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					this.selectedRows = args.selectedRows.getItems();
					this.selectedItems = [];
					this.selectedRows.forEach(function(item) {
						bq.add(this.getInsertQuery(item));
						this.selectedItems.push(item.value);
					}, this);
					if (bq.queries.length) {
						bq.execute(this.onItemInsert, this);
					}
				},

				/**
				 * ########## ###### ## ########## #######
				 * @param {Object} item ######### # ########### ######
				 * @private
				 **/
				getInsertQuery: function(item) {
					var insert = this.Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ProductFilter"
					});
					var filterType = DistributionConsts.ProductFilterTypes.SpecificationFilter;
					insert.setParameterValue("Specification", item.value, Terrasoft.DataValueType.GUID);
					insert.setParameterValue("ProductType", this.get("MasterRecordId"), Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Type",  filterType, Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Name", item.displayValue, Terrasoft.DataValueType.TEXT);
					return insert;
				},

				/**
				 * ######## ########## ######## # ######
				 * @private
				 * @param {Object} response
				 **/
				onItemInsert: function(response) {
					if (response && response.success) {
						this.get("Collection").clear();
						this.loadGridData();
					}
				},

				/**
				 * ##### ############# ########## ######## ####### position.
				 * @private
				 * @param {String} recordId ############# ######.
				 * @param {Number} position ##### #######.
				 * @param {Function} callback ####### ######### ######.
				 * @param {Object} scope ####### ########## callback.
				 */
				setPosition: function(recordId, position, callback, scope) {
					var data = {
						tableName: "ProductFilter",
						primaryColumnValue: recordId,
						position: position,
						grouppingColumnNames: "ProductTypeId"
					};
					ServiceHelper.callService("RightsService", "SetCustomRecordPosition", callback, data, scope);
				},

				/**
				 * ##### ######### ######## ### ########## ####### # ############ ## buttonTag
				 * @private
				 * @param {String} buttonTag ### ######.
				 */
				onActiveRowAction: function(buttonTag) {
					var recordId = this.get("ActiveRow");
					var gridData = this.get("Collection");
					var activeRow = gridData.get(recordId);
					var position = activeRow.get("Position");
					if (buttonTag === "Up") {
						if (position > 0) {
							position--;
						}
					}
					if (buttonTag === "Down") {
						position++;
					}
					this.setPosition(recordId, position, function() {
						gridData.clear();
						this.loadGridData();
					}, this);
				},

				/**
				 * ######## #######, ####### ###### ########## ########.
				 * @protected
				 * @overridden
				 * @return {Object} ########## #######, ####### ###### ########## ########.
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					if (!gridDataColumns.Position) {
						gridDataColumns.Position = {
							path: "Position",
							orderPosition: 0,
							orderDirection: this.Terrasoft.OrderDirection.ASC
						};
					}
					return gridDataColumns;
				},

				/**
				 * ############## ######### ##### ######## ######.
				 * ######### ############ ####### ### ########## ####### Position #######.
				 * @protected
				 * @overridden
				 * @param {Object} result
				 */
				onDeleted: function(result) {
					this.callParent(arguments);
					if (result.Success) {
						this.reloadGridData();
					}
				},

				/**
				 * ######### ########## #######
				 * ### ####### ## ######### ####### # ######### ######.
				 * # ###### ########## ########### ###### ####### -1, ### ########## ##########.
				 * @protected
				 * @overridden
				 */
				sortColumn: function() {
					this.set("SortColumnIndex", -1);
				},

				/**
				 * ######### ###### ########### ##### ##### ######### excludeProductColumnTypes ######### ### ##########
				 */
				setExcludeProductColumnTypes: function() {
					var dvt = this.Terrasoft.DataValueType;
					var excludeTypes = [
						dvt.BOOLEAN,
						dvt.COLLECTION,
						dvt.COLOR,
						dvt.CUSTOM_OBJECT,
						dvt.DATE,
						dvt.DATE_TIME,
						dvt.ENUM,
						dvt.FLOAT,
						dvt.GUID,
						dvt.IMAGE,
						dvt.IMAGELOOKUP,
						dvt.INTEGER,
						dvt.MONEY,
						dvt.TIME
					];
					this.set("excludeProductColumnTypes", excludeTypes);
				},
				/**
				 * ######### ############# ######.
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.sortColumn();
					this.setExcludeProductColumnTypes();
				},

				/**
				 * @inheritDoc BaseSchemaViewModel#initEditPages
				 * @protected
				 * @overridden
				 */
				initEditPages: function() {
					this.callParent(arguments);
					var editPages = this.get("EditPages");
					editPages.add(this.getColumnFilterButtonConfig());
					editPages.add(this.getSpecificationFilterButtonConfig());
				},

				/**
				 * Returns instance of the "Column Filter" drop-down menu.
				 * @return {Terrasoft.BaseViewModel} Instance of item drop-down menu.
				 */
				getColumnFilterButtonConfig: function() {
					return this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.AddColumnFilterButtonCaption"},
						"Click": {"bindTo": "addColumnFilterRecord"}
					});
				},

				/**
				 * Returns instance of the "Specification Filter" drop-down menu.
				 * @return {Terrasoft.BaseViewModel} Instance of item drop-down menu.
				 */
				getSpecificationFilterButtonConfig: function() {
					return this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.AddSpecificationFilterButtonCaption"},
						"Click": {"bindTo": "addSpecificationFilterRecord"}
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
				 * @overridden
				 */
				getGridSortMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"activeRowActions": [],
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "SpecificationListedGridColumn",
									"bindTo": "Specification",
									"position": {"column": 0, "colSpan": 8}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {"columns": 24, "rows": 3},
							"items": [
								{
									"name": "SpecificationTiledGridColumn",
									"bindTo": "Specification",
									"position": {"column": 0, "colSpan": 8}
								}
							]
						}
					}
				}, {
					"operation": "insert",
					"name": "DataGridActiveRowUpButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
						"imageConfig": LocalizableHelper.localizableImages.Up,
						"tag": "Up"
					}
				}, {
					"operation": "insert",
					"name": "DataGridActiveRowUpButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
						"imageConfig": LocalizableHelper.localizableImages.Down,
						"tag": "Down"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


