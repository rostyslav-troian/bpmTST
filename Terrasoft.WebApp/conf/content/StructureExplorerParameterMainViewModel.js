Terrasoft.configuration.Structures["StructureExplorerParameterMainViewModel"] = {innerHierarchyStack: ["StructureExplorerParameterMainViewModel"]};
define('StructureExplorerParameterMainViewModelStructure', ['StructureExplorerParameterMainViewModelResources'], function(resources) {return {schemaUId:'4fae98d4-b272-4391-894b-a708f6edfe89',schemaCaption: "StructureExplorerParameterMainViewModel", parentSchemaName: "", schemaName:'StructureExplorerParameterMainViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("StructureExplorerParameterMainViewModel", ["StructureExplorerMainViewModel", "ProcessModuleUtilities"
], function() {

	/**
	 * Structure explorer main view model for work with client unit schema parameters.
	 */
	Ext.define("Terrasoft.StructureExplorerParameterMainViewModel", {
		extend: "Terrasoft.StructureExplorerMainViewModel",

		pageSchema: null,

		// region Methods: Private

		/**
		 * @private
		 */
		_getEntitySchemaName: function(schemaUId) {
			var entitySchema = Terrasoft.EntitySchemaManager.findItem(schemaUId);
			return entitySchema && entitySchema.getName();
		},

		/**
		 * @private
		 */
		_getParameters: function() {
			var list = new Terrasoft.Collection();
			var parameters = this.pageSchema.parameters.filterByFn(function(parameter) {
				var isSystemParameter = Terrasoft.ProcessModuleUtilities.isSystemParameter(parameter.name);
				var isLookup = parameter.dataValueType === Terrasoft.DataValueType.LOOKUP;
				return !isSystemParameter && isLookup;
			}, this);
			parameters.each(function(parameter) {
				list.add(parameter.uId, {
					value: parameter.uId,
					name: parameter.name,
					columnName: parameter.name,
					displayValue: parameter.caption.getValue(),
					dataValueType: parameter.dataValueType,
					referenceSchemaName: this._getEntitySchemaName(parameter.referenceSchemaUId)
				});
			}, this);
			list.sort("displayValue", Terrasoft.OrderDirection.ASC);
			return list;
		},

		/**
		 * @private
		 */
		_isEmptyInitialFilters: function() {
			return Ext.isEmpty(this.params.columnPath);
		},

		// endregion

		// region Methods: Protected

		/**
		 * @override
		 */
		initRootItemIdentifier: function() {
			this.rootItemIdentifier = {};
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#setItemChildren
		 * @override
		 */
		setItemChildren: function(identifier, itemViewModel, callback, scope) {
			if (identifier.referenceSchemaName) {
				this.callParent(arguments);
			} else {
				var parameters = this._getParameters();
				var list = itemViewModel.get("EntitySchemaColumnList");
				list.reloadAll(parameters);
				Ext.callback(callback, scope, [parameters]);
			}
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#getItems
		 * @override
		 */
		getItems: function(filter, list) {
			list.sort("displayValue");
			list.fireEvent("dataloaded", list);
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#initRootSchema
		 * @override
		 */
		initRootSchema: function(callback, scope) {
			Terrasoft.chain(
				function(next) {
					const schemaUId = this.params.pageSchemaUId;
					Terrasoft.ClientUnitSchemaManager.getCurrentPackageSchemaByUId(schemaUId, next, this);
				},
				function(next, pageSchema) {
					this.set("caption", pageSchema.caption.toString());
					this.pageSchema = pageSchema;
					var list = this._getParameters();
					this.$EntitySchemaColumnList.reloadAll(list);
					Ext.callback(callback, scope);
				}, this
			);
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#showFilters
		 * @override
		 */
		showFilters: function() {
			this.callParent();
			this.set("RemoveVisible", false);
			if (this._isEmptyInitialFilters()) {
				this.onExpandItem();
			}
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#showFilters
		 * @override
		 */
		onExpandItem: function() {
			this.callParent();
			this.set("RemoveVisible", false);
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#addItem
		 * @override
		 */
		addItem: function(itemViewModel) {
			if (this.viewModelCollection.getCount() === 0) {
				itemViewModel.set("CloseVisible", false);
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#focusLastInput
		 * @override
		 */
		focusLastInput: function() {
			if (this._isEmptyInitialFilters()) {
				var schemaLookup = Ext.getCmp("schemaLookup0").getEl();
				schemaLookup.focus();
				var event = document.createEvent("Events");
				event.initEvent("keydown", true, true);
				event.keyCode = Ext.EventObject.DOWN;
				schemaLookup.dom.dispatchEvent(event);
			} else {
				this.callParent(arguments);
			}
		}

		// endregion

	});

	return Terrasoft.StructureExplorerParameterMainViewModel;
});


