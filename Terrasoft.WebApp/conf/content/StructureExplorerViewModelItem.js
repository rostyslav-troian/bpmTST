Terrasoft.configuration.Structures["StructureExplorerViewModelItem"] = {innerHierarchyStack: ["StructureExplorerViewModelItem"]};
define('StructureExplorerViewModelItemStructure', ['StructureExplorerViewModelItemResources'], function(resources) {return {schemaUId:'a3edceed-90f7-4338-9b99-abc51063c9b9',schemaCaption: "StructureExplorerViewModelItem", parentSchemaName: "", schemaName:'StructureExplorerViewModelItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("StructureExplorerViewModelItem", [], function() {
	/**
	 * @class Terrasoft.StructureExplorerViewModelItem
	 */
	Ext.define("Terrasoft.StructureExplorerViewModelItem", {
		extend: "Terrasoft.BaseViewModel",

		sandbox: null,

		columns: {
			EntitySchemaColumn: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				value: null
			},
			EntitySchemaColumnList: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			ExpandVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			RemoveVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			ComboBoxListEnabled: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			entitySchema: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			ExpandEnable: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			CloseVisible: {
				columnType: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.columns.EntitySchemaColumnList.value = new Terrasoft.Collection();
			this.callParent(arguments);
			this.addEvents(
				"expandItem",
				"entityColumnItemChange",
				"removeItem",
				"closeItem"
			);
		},

		getItems: function(filter, list) {
			list.sortByFn(function(a, b) { return a.displayValue.localeCompare(b.displayValue); });
			list.loadAll({});
		},

		ComboBoxListChange: function(comboBoxValue) {
			this.set("ExpandEnable", true);
			this.set("EntitySchemaColumn", Terrasoft.deepClone(comboBoxValue));
			this.fireEvent("entityColumnItemChange", this, comboBoxValue);
		},

		remove: function() {
			this.fireEvent("removeItem", this);
		},

		close: function() {
			this.fireEvent("closeItem", this);
		},

		expand: function() {
			this.set("ExpandVisible", false);
			this.set("RemoveVisible", true);
			this.set("ComboBoxListEnabled", false);
			this.fireEvent("expandItem", this);
		},

		/**
		 * Returns marker.
		 * @return {String}
		 */
		getMarkerValue: function() {
			return "EntitySchema Level" + this.parentCollection.getCount();
		}
	});

	return Terrasoft.StructureExplorerViewModelItem;
});


