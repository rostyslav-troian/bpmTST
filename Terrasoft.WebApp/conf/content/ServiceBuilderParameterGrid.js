Terrasoft.configuration.Structures["ServiceBuilderParameterGrid"] = {innerHierarchyStack: ["ServiceBuilderParameterGrid"], structureParent: "BaseServiceParameterGrid"};
define('ServiceBuilderParameterGridStructure', ['ServiceBuilderParameterGridResources'], function(resources) {return {schemaUId:'06466d29-6588-46b3-a3e2-f9a3da722cae',schemaCaption: "ServiceBuilderParameterGrid", parentSchemaName: "BaseServiceParameterGrid", schemaName:'ServiceBuilderParameterGrid',parentSchemaUId:'f490e67e-05d5-4f48-a374-299e1f1e8232',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
 define("ServiceBuilderParameterGrid", ["ServiceBuilderParameterGridResources"], function() {
	return {
		messages: {

			/**
			 * @message GetSelectedParameters
			 * Subscribes on GetSelectedParameters.
			 * @return {Array} Returns selected parameters uids.
			 */
			GetSelectedParameters: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateGridParameters
			 * Publishes on UpdateGridParameters.
			 */
			GetParametersConfig: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}

		},
		attributes: {

			/**
			 * Parameters initial config
			 */
			ParametersConfig: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				value: null,
				onChange: "_onParameterConfigChanged"
			},

			/**
			 * Multiselect flag.
			 */
			MultiSelect: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			}

		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_onParameterConfigChanged: function() {
				this.initParameters(function() {
					this.updateGridViewModel();
					this.$SelectedRows = this.$GridData.getKeys();
					this.$ExpandHierarchyLevels = this.getHierarchicalNodesUIds(this.$GridData);
				}, this);
			},

			/**
			 * @private
			 */
			_onGetSelectedParameters: function () {
				return this.$SelectedRows;
			},

			/**
			 * @private
			 */
			_selectParent: function(id, selectedRows) {
				var selectedRow = this.$GridData.get(id);
				var parentId = selectedRow.$ParentId;
				if (parentId) {
					Ext.Array.include(selectedRows, parentId);
					this._selectParent(parentId, selectedRows);
				}
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#onSelectedRowsChange
			 * @override
			 */
			onSelectedRowsChange: function (previous, current) {
				this.callParent(arguments);
				var info = this.getSelectionInfo(previous, current);
				if (info.selected) {
					Terrasoft.each(info.ids, function(i) {
						this._selectParent(i, current);
					}, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#initParameters
			 * @override
			 */
			initParameters: function(callback, scope) {
				this.callParent([function() {
					this.$Parameters.clear();
					var parsedConfig = JSON.parse(this.$ParametersConfig);
					var parametersConfig = parsedConfig && parsedConfig.items;
					Terrasoft.each(parametersConfig, function(config, uid) {
						this.$Parameters.add(uid, this.Ext.create("Terrasoft.ServiceParameter", config));
					}, this);
					Ext.callback(callback, scope);
				}, this]);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @override
			 */
			constructor: function () {
				this.callParent(arguments);
				this.sandbox.subscribe("GetSelectedParameters", this._onGetSelectedParameters, this, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @override
			 */
			onRender: function () {
				this.callParent(arguments);
				this.$ParametersConfig = this.sandbox.publish("GetParametersConfig", null, [this.sandbox.id]);
			}

			//endregion

		},
		diff: [
			{
				operation: "remove",
				name: "EnableMultiSelect"
			},
			{
				operation: "remove",
				name: "DisableMultiSelect"
			},
			{
				operation: "insert",
				name: "label",
				parentName: "ToolbarContainer",
				propertyName: "items",
				index: 0,
				values: {
					itemType: Terrasoft.ViewItemType.LABEL,
					caption: "$Resources.Strings.ToolbarCaption",
					classes: { "labelClass": ["service-method-builder-caption-16"] }
				}
			}
		]
	};
});


