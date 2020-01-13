Terrasoft.configuration.Structures["CampaignParticipantDetail"] = {innerHierarchyStack: ["CampaignParticipantDetail"], structureParent: "CampaignDetailV2"};
define('CampaignParticipantDetailStructure', ['CampaignParticipantDetailResources'], function(resources) {return {schemaUId:'bfb077b2-8f34-47b4-a1ef-03f9ab5a1baf',schemaCaption: "\"Campaign participants\" detail schema", parentSchemaName: "CampaignDetailV2", schemaName:'CampaignParticipantDetail',parentSchemaUId:'7036dfcb-d430-4bb8-a4bc-db1abf627b51',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignParticipantDetail", [], function() {
			return {
				entitySchemaName: "CampaignParticipant",
				attributes: {},
				messages: {},
				methods: {

					// #region Methods: Private

					_isManualParticipantsManipulationAllowed: function() {
						return Terrasoft.Features.getIsEnabled("ManualCampaignParticipantsManipulation");
					},

					// #endregion

					//#region Methods: Protected

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
					 * @override
					 */
					getCopyRecordMenuItem: Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
					 * @override
					 */
					getEditRecordMenuItem: function () {
						if (this._isManualParticipantsManipulationAllowed()) {
							return this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
					 * @override
					 */
					getDeleteRecordMenuItem: function () {
						if (this._isManualParticipantsManipulationAllowed()) {
							return this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
					 * @overridden
					 */
					addDetailWizardMenuItems: Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
					 * @override
					 */
					getAddRecordButtonVisible: function () {
						if (this._isManualParticipantsManipulationAllowed()) {
							return this.callParent(arguments);
						}
						return false;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#editRecord
					 * @override
					 */
					editRecord: function() {
						if (this._isManualParticipantsManipulationAllowed()) {
							return this.callParent(arguments);
						}
					}

					// #endregion

				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"rowDataItemMarkerColumnName": "Contact"
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


