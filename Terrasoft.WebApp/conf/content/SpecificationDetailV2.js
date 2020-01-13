Terrasoft.configuration.Structures["SpecificationDetailV2"] = {innerHierarchyStack: ["SpecificationDetailV2"], structureParent: "BaseGridDetailV2"};
define('SpecificationDetailV2Structure', ['SpecificationDetailV2Resources'], function(resources) {return {schemaUId:'a11d688b-21ce-4e22-8d01-281545aa00c9',schemaCaption: "Base detail - Features", parentSchemaName: "BaseGridDetailV2", schemaName:'SpecificationDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// D9 Team
define("SpecificationDetailV2", [],
	function() {
		return {
			entitySchemaName: "SpecificationInObject",
			messages: {
				/**
				 * @message GetBackHistoryState
				 * ########## ####, #### ########## ##### ####### ## ###### #######
				 * # #### ######### ############.
				 */
				"GetBackHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {
				/**
				 * ######### # ###### #############.
				 */
				navigateToSpecificationSection: function() {
					this.sandbox.publish("PushHistoryState", {
						hash: "SectionModuleV2/SpecificationSectionV2"
					});
				},

				/**
				 * ############## ######## ## ####### sandbox
				 * @protected
				 * @overriden
				 */
				subscribeSandboxEvents: function() {
					this.callParent();
					this.subscribeForGetBackHistoryState();
				},

				/**
				 * ############## ######## ## ####### GetBackHistoryState #######
				 * @protected
				 * @virtual
				 */
				subscribeForGetBackHistoryState: function() {
					var initialHistoryState = this.sandbox.publish("GetHistoryState").hash.historyState;
					this.set("InitialHistoryState", initialHistoryState);
					this.sandbox.subscribe("GetBackHistoryState", function() {
						return this.get("InitialHistoryState");
					}, this, ["SpecificationSectionV2"]);
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
				 * @overridden
				 */
				addRecordOperationsMenuItems: function(toolsButtonMenu) {
					var editRecordMenuItem = this.getEditRecordMenuItem();
					if (editRecordMenuItem) {
						toolsButtonMenu.addItem(editRecordMenuItem);
					}
					var deleteRecordMenuItem = this.getDeleteRecordMenuItem();
					if (deleteRecordMenuItem) {
						toolsButtonMenu.addItem(deleteRecordMenuItem);
					}
					toolsButtonMenu.addItem(this.getButtonMenuSeparator());
					toolsButtonMenu.addItem(this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.OpenSpecificationSectionButtonCaption"},
						Click: {"bindTo": "navigateToSpecificationSection"}
					}));
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
									"name": "SpecificationListedGridColumn",
									"bindTo": "Specification",
									"position": {
										"column": 0,
										"colSpan": 12
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "StringValueListedGridColumn",
									"bindTo": "StringValue",
									"position": {
										"column": 12,
										"colSpan": 12
									}
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 1
							},
							"items": [
								{
									"name": "SpecificationTiledGridColumn",
									"bindTo": "Specification",
									"position": {"row": 0, "column": 0, "colSpan": 12},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "StringValueTiledGridColumn",
									"bindTo": "StringValue",
									"position": {"row": 0, "column": 12, "colSpan": 12}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


