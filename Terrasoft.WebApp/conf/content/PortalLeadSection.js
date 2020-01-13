Terrasoft.configuration.Structures["PortalLeadSection"] = {innerHierarchyStack: ["PortalLeadSection"], structureParent: "BaseSectionV2"};
define('PortalLeadSectionStructure', ['PortalLeadSectionResources'], function(resources) {return {schemaUId:'cc46b030-dff1-4289-b0b2-530da527e5d3',schemaCaption: "Section base schema", parentSchemaName: "BaseSectionV2", schemaName:'PortalLeadSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalLeadSection", ["terrasoft", "ControlGridModule", "BaseProgressBarModule",
		"css!BaseProgressBarModule", "css!LeadQualificationModuleStyles"],
	function() {
		return {
			entitySchemaName: "Lead",
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#prepareResponseCollectionItem
				 * @overridden
				 */
				prepareResponseCollectionItem: function(item) {
					item.getQualifyStatusValue = function(qualifyStatus) {
						if (!qualifyStatus) {
							return null;
						} else {
							return {
								value: this.get("QualifyStatus.StageNumber"),
								displayValue: qualifyStatus.displayValue
							};
						}
					};
					return this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
				 * @overridden
				 */
				getGridDataColumns: function() {
					var gridDataColumns = this.callParent(arguments);
					gridDataColumns["QualifyStatus.StageNumber"] = {path: "QualifyStatus.StageNumber"};
					return gridDataColumns;
				},

				/**
				 * Passes indicator config by reference.
				 * @param {Object} control Configuration object.
				 * @overridden
				 */
				applyControlConfig: function(control) {
					control.config = {
						className: "Terrasoft.BaseProgressBar",
						value: {
							"bindTo": "QualifyStatus",
							"bindConfig": {"converter": "getQualifyStatusValue"}
						},
						width: "158px"
					};
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @override
				 */
				getDefaultDataViews: function() {
					const dataViews = this.callParent(arguments);
					delete dataViews.AnalyticsDataView;
					return dataViews;
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"className": "Terrasoft.ControlGrid",
						"controlColumnName": "QualifyStatus",
						"applyControlConfig": {"bindTo": "applyControlConfig"}
					}
				},
				{
					"operation": "remove",
					"name": "QualificationProcessButton"
				}
			],/**SCHEMA_DIFF*/
		};
	});


