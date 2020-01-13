Terrasoft.configuration.Structures["OAuthAppScopeDetail"] = {innerHierarchyStack: ["OAuthAppScopeDetail"], structureParent: "BaseGridDetailV2"};
define('OAuthAppScopeDetailStructure', ['OAuthAppScopeDetailResources'], function(resources) {return {schemaUId:'c6c7dca8-7fc8-4de7-8af3-ade1fa5b0751',schemaCaption: "Detail schema: \"Scopes\"", parentSchemaName: "BaseGridDetailV2", schemaName:'OAuthAppScopeDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuthAppScopeDetail", [
	"InformationButtonResources", "ConfigurationGrid", "ConfigurationGridGenerator",
	"ConfigurationGridUtilities", "css!OAuth20AppStyles"
], function(InformationButtonResources) {
	return {
		entitySchemaName: "OAuthAppScope",
		attributes: {
			"IsEditable": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		mixins: {
			ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {"bindTo": "generateActiveRowControlsConfig"},
					"changeRow": {"bindTo": "changeRow"},
					"unSelectRow": {"bindTo": "unSelectRow"},
					"onGridClick": {"bindTo": "onGridClick"},
					"activeRowActions": [
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "save",
							"markerValue": "save",
							"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "cancel",
							"markerValue": "cancel",
							"imageConfig": {"bindTo": "Resources.Images.CancelIcon"}
						},
						{
							"className": "Terrasoft.Button",
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"tag": "remove",
							"markerValue": "remove",
							"imageConfig": {"bindTo": "Resources.Images.RemoveIcon"}
						}
					],
					"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"multiSelect": false
				}
			},
			{
				"operation": "insert",
				"name": "ScopeInfo",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"behaviour": {"displayEvent": Terrasoft.TipDisplayEvent.HOVER},
					"content": {"bindTo": "Resources.Strings.ScopeInfoTip"},
					"style": Terrasoft.TipStyle.GREEN,
					"controlConfig": {
						"imageConfig": InformationButtonResources.localizableImages.DefaultIcon,
						"classes": {"wrapperClass": ["scope-info-btn"]}
					}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
			 * @overridden
			 */
			getEditRecordMenuItem: Terrasoft.emptyFn,

			// endregion

			// region Methods: Public

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#saveRowChanges
			 * @overridden
			 */
			saveRowChanges: function(row) {
				if (Ext.isObject(row)) {
					row.$Scope = row.$Scope.trim();
				}
				this.mixins.ConfigurationGridUtilities.saveRowChanges.apply(this, arguments);
			}

			// endregion

		}
	};
});


