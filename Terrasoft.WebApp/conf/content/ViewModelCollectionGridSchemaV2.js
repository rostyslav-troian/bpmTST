Terrasoft.configuration.Structures["ViewModelCollectionGridSchemaV2"] = {innerHierarchyStack: ["ViewModelCollectionGridSchemaV2"]};
define('ViewModelCollectionGridSchemaV2Structure', ['ViewModelCollectionGridSchemaV2Resources'], function(resources) {return {schemaUId:'c24bc36b-4d75-4039-b090-7f3f5f656fc6',schemaCaption: "ViewModelCollection Grid Schema", parentSchemaName: "", schemaName:'ViewModelCollectionGridSchemaV2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ViewModelCollectionGridSchemaV2", ["GridUtilitiesV2", "css!ViewModelCollectionGridSchemaV2CSS"], function() {
	return {

		messages: {},

		mixins: {
			/**
			 * @class GridUtilities implements basic methods for working with grid.
			 */
			GridUtilities: "Terrasoft.GridUtilities"
		},

		attributes: {
			/**
			 * Base view model collection grid data.
			 */
			"GridData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Grid type.
			 */
			"GridType": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "listed"
			},

			/**
			 * Active row primary column value.
			 */
			"ActiveRow": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Is grid is empty.
			 */
			"IsGridEmpty": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: null
			},

			/**
			 * Flag whether the registry loaded
			 */
			"IsGridLoading": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},

		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.showBodyMask();
				this.callParent([function() {
					this.initGridData();
					this.mixins.GridUtilities.init.call(this);
					callback.call(scope);
				}, this]);
			},

			/**
			 * Returns grid data.
			 * @protected
			 * @return {Terrasoft.BaseViewModelCollection} Grid data.
			 */
			getGridData: function() {
				return this.get("GridData");
			},

			/**
			 * Returns grid data item by id.
			 * @param {Guid} id Active row id.
			 * @return {Terrasoft.BaseViewModel} Row view model item.
			 */
			getGridDataItemById: function(id) {
				var gridData = this.get("GridData");
				return gridData.get(id);
			},

			/**
			 * Returns active row.
			 * @protected
			 * @return {Terrasoft.BaseViewModel} Active row.
			 */
			getActiveRow: function() {
				var rowId = this.get("ActiveRow");
				return this.getGridDataItemById(rowId);
			},

			/**
			 * Removes active row from data grid.
			 * @protected
			 */
			removeActiveRow: function() {
				var gridData = this.get("GridData");
				gridData.remove(this.getActiveRow());
			},

			/**
			 * Initializes grid data.
			 * @protected
			 */
			initGridData: function() {
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.set("GridData", collection);
			},

			/**
			 * Handler of active row actions.
			 * @protected
			 * @param {String} buttonTag Button tag.
			 * @param {String|GUID} primaryColumnValue Primary column value.
			 */
			onActiveRowAction: function(buttonTag, primaryColumnValue) {
				switch (buttonTag) {
					case "edit":
						this.editRecord(primaryColumnValue);
						break;
					case "disable":
						this.disableRecord();
						break;
					case "remove":
						this.removeRecord();
						break;
				}
			},

			/**
			 * Edit record handler.
			 * @protected
			 * @virtual
			 */
			editRecord: Terrasoft.emptyFn,

			/**
			 * Remove record handler.
			 * @protected
			 * @virtual
			 */
			removeRecord: Terrasoft.emptyFn,

			/**
			 * Disable record handler.
			 * @protected
			 * @virtual
			 */
			disableRecord: Terrasoft.emptyFn,

			/**
			 * handler of add button click.
			 * @protected
			 * @virtual
			 */
			onAddButtonClick: Terrasoft.emptyFn

			//endregion

		},

		diff: /**SCHEMA_DIFF*/[{
			"operation": "insert",
			"name": "DataGridContainer",
			"propertyName": "items",
			"values": {
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["base-grid-dataview-container-wrapClass"],
				"items": []
			}
		}, {
			"operation": "insert",
			"name": "DataGridToolsContainer",
			"propertyName": "items",
			"parentName": "DataGridContainer",
			"values": {
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"wrapClass": ["base-grid-tools-container-wrapClass"],
				"items": []
			},
			"index": 1
		}, {
			"operation": "insert",
			"name": "DataGridAddNewRecordButton",
			"parentName": "DataGridToolsContainer",
			"propertyName": "items",
			"values": {
				"itemType": Terrasoft.ViewItemType.BUTTON,
				"style": Terrasoft.controls.ButtonEnums.style.BLUE,
				"caption": {"bindTo": "Resources.Strings.AddButtonCaption"},
				"tag": "add",
				"click": {"bindTo": "onAddButtonClick"},
				"markerValue": "AddNewBusinessRule",
				"classes": {
					"wrapperClass": ["add-new-record"]
				}
			}
		}, {
			"operation": "insert",
			"name": "DataGrid",
			"parentName": "DataGridContainer",
			"propertyName": "items",
			"index": 2,
			"values": {
				"itemType": Terrasoft.ViewItemType.GRID,
				"type": {"bindTo": "GridType"},
				"collection": {"bindTo": "GridData"},
				"listedZebra": true,
				"primaryColumnName": "Id",
				"activeRowAction": {"bindTo": "onActiveRowAction"},
				"activeRow": {"bindTo": "ActiveRow"},
				"isEmpty": {"bindTo": "IsGridEmpty"},
				"isLoading": {"bindTo": "IsGridLoading"},
				"columnsConfig": [],
				"captionsConfig": [],
				"activeRowActions": []
			}
		}, {
			"operation": "insert",
			"name": "DataGridActiveRowOpenAction",
			"parentName": "DataGrid",
			"propertyName": "activeRowActions",
			"values": {
				"className": "Terrasoft.Button",
				"style": Terrasoft.controls.ButtonEnums.style.BLUE,
				"caption": {"bindTo": "OpenButtonCaption"},
				"tag": "edit"
			}
		}, {
			"operation": "insert",
			"name": "DataGridActiveRowDisableAction",
			"parentName": "DataGrid",
			"propertyName": "activeRowActions",
			"values": {
				"className": "Terrasoft.Button",
				"style": Terrasoft.controls.ButtonEnums.style.GREY,
				"caption": {"bindTo": "DisableButtonCaption"},
				"tag": "disable"
			}
		}, {
			"operation": "insert",
			"name": "DataGridActiveRowDeleteAction",
			"parentName": "DataGrid",
			"propertyName": "activeRowActions",
			"values": {
				"className": "Terrasoft.Button",
				"style": Terrasoft.controls.ButtonEnums.style.GREY,
				"caption": {"bindTo": "DeleteButtonCaption"},
				"tag": "remove"}
		}]/**SCHEMA_DIFF*/
	};
});


