Terrasoft.configuration.Structures["PortalSchemaAccessListDetail"] = {innerHierarchyStack: ["PortalSchemaAccessListDetail"], structureParent: "BaseGridDetailV2"};
define('PortalSchemaAccessListDetailStructure', ['PortalSchemaAccessListDetailResources'], function(resources) {return {schemaUId:'1bb8e1c3-4732-46a0-9143-3fca712ccc14',schemaCaption: "PortalSchemaAccessListDetail", parentSchemaName: "BaseGridDetailV2", schemaName:'PortalSchemaAccessListDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalSchemaAccessListDetail", ["ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilities"], function() {
	return {
		entitySchemaName: "PortalColumnAccessList",
		attributes: {
			"IsEditable": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"AccessEntitySchemaName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		messages: {
			/**
			 * @message GetColumnsValues
			 * Returns requested column values.
			 */
			"GetColumnsValues": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: {},
		diff: [],
		mixins: {
			ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSettingsMenuItem
			 * @overridden
			 */
			getGridSettingsMenuItem: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
			 * @overridden
			 */
			getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetail#hideQuickFilterButton
			 * @overridden
			 */
			getHideQuickFilterButton: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetail#getQuickFilterButton
			 * @overridden
			 */
			getShowQuickFilterButton: Terrasoft.emptyFn,
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
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getGridSortMenuItem
			 * @overridden
			 */
			getGridSortMenuItem: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#sortColumn
			 * @overridden
			 */
			sortColumn: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
			 * @overridden
			 */
			getAddRecordButtonVisible: function() {
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
			 * @overridden
			 */
			addDetailWizardMenuItems: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc BaseGridDetailV2#addRecord
			 * @overridden
			 */
			addRecord: function() {
				var entitySchemaName = this.get("AccessEntitySchemaName");
				this.Terrasoft.StructureExplorerUtilities.open({
					scope: this,
					handlerMethod: this.addCallback,
					moduleConfig: {
						schemaName: entitySchemaName,
						useBackwards: false,
						firstColumnsOnly: true
					}
				});
			},

			/**
			 * On add item callback.
			 * @param {Object} result
			 * @protected
			 */
			addCallback: function(result) {
				if (this.isColumnAdded(result.metaPath[0])) {
					this.showInformationDialog(this.get("Resources.Strings.DuplicateColumnMessage"));
					return;
				}
				const insertQuery = this.getPortalColumnsInsertQuery(result);
				insertQuery.execute(function() {
					this.reloadGridData();
				}, this);
			},

			/**
			 * Creates a query to insert column that can be used on portal.
			 * @param {Object} columnInfo Information about column.
			 * @returns {Terrasoft.InsertQuery} Portal column insert query.
			 */
			getPortalColumnsInsertQuery: function(columnInfo) {
				const masterRecordId = this.get("MasterRecordId");
				const insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "PortalColumnAccessList"
				});
				insertQuery.setParameterValue("PortalSchemaList", masterRecordId,
					this.Terrasoft.DataValueType.GUID);
				insertQuery.setParameterValue("ColumnUId", columnInfo.metaPath[0],
					this.Terrasoft.DataValueType.GUID);
				insertQuery.setParameterValue("ColumnName", this._getPortalColumnName(columnInfo),
					this.Terrasoft.DataValueType.TEXT);
				return insertQuery;
			},

			_getPortalColumnName: function(columnInfo) {
				return columnInfo.isLookup ? columnInfo.path[0] + "Id" : columnInfo.path[0];
			},

			/**
			 * Check if column already added.
			 * @param columnUId Column uid.
			 * @returns {boolean} Is column added.
			 */
			isColumnAdded: function(columnUId){
				var gridData = this.getGridData();
				var collection = gridData.getItems();
				for (var i = 0; i < gridData.getCount(); i++) {
					if (collection[i].values.ColumnUId === columnUId) {
						return true;
					}
				}
				return false;
			},

			/**
			 * Returns page column value.
			 * @private
			 * @param {String} columnName Page column name.
			 */
			getValueByName: function(columnName) {
				var names = this.sandbox.publish("GetColumnsValues", [columnName],
						[this.sandbox.id]);
				return names[columnName];
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#init
			 * @overridden
			 **/
			init: function() {
				this.callParent(arguments);
				var entitySchemaNameColumn = "AccessEntitySchemaName";
				var entitySchemaName = this.getValueByName(entitySchemaNameColumn);
				this.set("AccessEntitySchemaName", entitySchemaName);
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#prepareResponseCollectionItem:
			 * @overridden
			 */
			prepareResponseCollectionItem: function(item) {
				this.callParent(arguments);
				var entitySchemaName = this.get("AccessEntitySchemaName");
				var columns = this.Terrasoft[entitySchemaName].columns;
				this.Terrasoft.each(columns, function(column) {
					if (column.uId === item.get("ColumnUId")) {
						item.set("ColumnUId", column.caption);
					}
				}, this);
			}
		}
	};
});


