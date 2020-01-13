Terrasoft.configuration.Structures["ExternalAccessSection"] = {innerHierarchyStack: ["ExternalAccessSection"], structureParent: "BaseSectionV2"};
define('ExternalAccessSectionStructure', ['ExternalAccessSectionResources'], function(resources) {return {schemaUId:'cfe0c8b4-d093-4cfc-8938-9a660fcae4ec',schemaCaption: "Section schema: \"External access\"", parentSchemaName: "BaseSectionV2", schemaName:'ExternalAccessSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ExternalAccessSection", [
	"ExternalAccessUtilities"
], function() {
	return {
		entitySchemaName: "ExternalAccess",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGridActiveRowCopyAction",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "DataGridActiveRowDeleteAction",
				"values": {
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/,
		mixins: {
			ExternalAccessUtilities: "Terrasoft.ExternalAccessUtilities"
		},
		methods: {

			/**
			 * Reloads rows for deactivated records.
			 * @param {Object} responseObject Response of service that deactivates external accesses.
			 * @param {String[]} accessIds Accesses to deactivate.
			 * @private
			 */
			_processDeactivationResponse: function(responseObject, accessIds) {
				if (!Terrasoft.isEmptyObject(responseObject)) {
					const rows = this.getGridData();
					Terrasoft.each(accessIds, function(accessId) {
						const row = rows.find(accessId);
						if (row) {
							row.loadEntity(accessId);
						}
					});
				}
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#getGridDataColumns
			 * @override
			 */
			getGridDataColumns: function() {
				const defColumnsConfig = this.callParent(arguments);
				defColumnsConfig.IsActive = {
					path: "IsActive"
				};
				return defColumnsConfig;
			},

			/**
			 * @override
			 * @inheritdoc
			 */
			getSectionActions: function() {
				const actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: Terrasoft.emptyString
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "getDeactivationActionCaption"},
					"Click": {"bindTo": "deactivateExternalAccessRecord"},
					"Enabled": {"bindTo": "getIsDeactivationActionEnabled"},
					"IsEnabledForSelectedAll": true
				}));
				return actionMenuItems;
			},

			/**
			 * @override
			 * @inheritdoc
			 */
			isVisibleDeleteAction: function() {
				return false;
			},

			/**
			 * Returns whether deactivation action should be active
			 * @return {Boolean} Whether deactivation action should be active.
			 */
			getIsDeactivationActionEnabled: function() {
				if (this.$MultiSelect) {
					return true;
				}
				const selectedAccess = this.getActiveRow();
				return selectedAccess && selectedAccess.$IsActive;
			},

			/**
			 * Deactivates selected access record.
			 */
			deactivateExternalAccessRecord: function() {
				const accessIds = this.getSelectedItems();
				if (accessIds) {
					this.deactivateAccesses(accessIds, function(responseObject) {
						this._processDeactivationResponse(responseObject, accessIds);
					}, this);
				}
			}

		}
	};
});


