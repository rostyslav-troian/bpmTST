Terrasoft.configuration.Structures["AttributeInSiteEventDetailV2"] = {innerHierarchyStack: ["AttributeInSiteEventDetailV2"], structureParent: "BaseGridDetailV2"};
define('AttributeInSiteEventDetailV2Structure', ['AttributeInSiteEventDetailV2Resources'], function(resources) {return {schemaUId:'1c49f19c-e798-4b81-bea5-abc0a214c4d7',schemaCaption: "Attribute detail - Website event", parentSchemaName: "BaseGridDetailV2", schemaName:'AttributeInSiteEventDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AttributeInSiteEventDetailV2", [],
	function() {
		return {
			entitySchemaName: "AttributeInSiteEvent",
			messages: {},
			methods: {
				/**
				 * ############## ####### # ###### ######## #########.
				 * @protected
				 */
				navigateToSiteEventAttributeSection: function()
				{
					this.sandbox.publish("PushHistoryState", {
						hash: "SectionModuleV2/SiteEventAttributeSectionV2",
						stateObj: {
							schema: "SiteEventAttribute"
						}
					});
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
				 * @overridden
				 */
				getEditRecordMenuItem: function() {
					return this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.OpenSiteEventAttributeSectionButtonCaption"},
						Click: {"bindTo": "navigateToSiteEventAttributeSection"},
						Enabled: true
					});
				},

				/**
				 * ########## ######### ###### ########## ######.
				 * @overridden
				 * @return {Boolean} ######### ###### ########## ######.
				 */
				getAddRecordButtonVisible: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
				 * @overridden
				 */
				getCopyRecordMenuItem: Terrasoft.emptyFn
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
									"name": "AttributeListedGridColumn",
									"bindTo": "SiteEventAttribute",
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
									"name": "AttributeTiledGridColumn",
									"bindTo": "SiteEventAttribute",
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


