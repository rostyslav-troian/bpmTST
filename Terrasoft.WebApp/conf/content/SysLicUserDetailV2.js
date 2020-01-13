Terrasoft.configuration.Structures["SysLicUserDetailV2"] = {innerHierarchyStack: ["SysLicUserDetailV2"], structureParent: "BaseGridDetailV2"};
define('SysLicUserDetailV2Structure', ['SysLicUserDetailV2Resources'], function(resources) {return {schemaUId:'a8e29c67-6a87-478a-b162-0fd007a62834',schemaCaption: "Detail schema - User licenses", parentSchemaName: "BaseGridDetailV2", schemaName:'SysLicUserDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysLicUserDetailV2", ["ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities"],
	function() {
		return {
			entitySchemaName: "SysLicUser",
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities"
			},
			diff: [
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
						"listedZebra": true,
						"initActiveRowKeyMap": {"bindTo": "initActiveRowKeyMap"},
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"multiSelect": false,
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "SysLicPackageListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.SysLicPackageCaption"},
									"bindTo": "SysLicPackage.Name",
									"type": "text",
									"position": {
										"column": 0,
										"colSpan": 12
									}
								},
								{
									"name": "ActiveListedGridColumn",
									"caption": {"bindTo": "Resources.Strings.ActiveCaption"},
									"bindTo": "Active",
									"type": "text",
									"position": {
										"column": 13,
										"colSpan": 3
									}
								}
							]
						}
					}
				}
			],
			attributes: {
				IsEditable: {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			methods: {
				getGridDataColumns: function() {
					var config = this.callParent(arguments);
					config["SysLicPackage.Name"] = { path: "SysLicPackage.Name" };
					return config;
				}
			}
		};
	});


