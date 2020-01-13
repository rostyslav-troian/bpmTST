Terrasoft.configuration.Structures["SysOperationAuditSectionV2"] = {innerHierarchyStack: ["SysOperationAuditSectionV2"], structureParent: "BaseSectionV2"};
define('SysOperationAuditSectionV2Structure', ['SysOperationAuditSectionV2Resources'], function(resources) {return {schemaUId:'ad1d0944-3a96-4694-b653-9ff5844f9f0a',schemaCaption: "SysOperationAuditSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'SysOperationAuditSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysOperationAuditSectionV2", ["BaseFiltersGenerateModule", "SysOperationAudit", "SysOperationAuditArch",
	"RightUtilities"],
function(BaseFiltersGenerateModule, SysOperationAudit, SysOperationAuditArch, RightUtilities) {
	return {
		entitySchemaName: "SysOperationAudit",
		attributes: {
			/**
			 * Can manage audit log system operation name.
			 */
			"SecurityOperationName": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanViewSysOperationAudit"
			}
		},
		methods: {
			/**
			 * @inheritdoc Configuration.BasePageV2#initContextHelp
			 * @override
			 */
			initContextHelp: function() {
				this.set("ContextHelpId", 1260);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc BaseSectionV2#isMultiSelectVisible
			 * @override
			 */
			isMultiSelectVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc BaseSectionV2#getExportToFileActionVisibility
			 * @override
			 */
			getExportToFileActionVisibility: function() {
				return false;
			},

			/**
			 * @override
			 * @inheritDoc BaseSectionV2#initFixedFiltersConfig
			 */
			initFixedFiltersConfig: function() {
				var fixedFilterConfig = {
					entitySchema: SysOperationAudit,
					filters: [
						{
							name: "PeriodFilter",
							caption: this.get("Resources.Strings.PeriodFilterCaption"),
							dataValueType: this.Terrasoft.DataValueType.DATE,
							columnName: "Date",
							startDate: {},
							dueDate: {}
						},
						{
							name: "Owner",
							caption: this.get("Resources.Strings.OwnerFilterCaption"),
							dataValueType: Terrasoft.DataValueType.LOOKUP,
							filter: BaseFiltersGenerateModule.OwnerFilter,
							columnName: "Owner"
						}
					]
				};
				this.set("FixedFilterConfig", fixedFilterConfig);
			},

			/**
			 * @override
			 * @inheritDoc BaseSectionV2#getDefaultGridDataViewCaption
			 */
			getDefaultGridDataViewCaption: function() {
				return this.get("Resources.Strings.AuditSectionViewCaption");
			},

			/**
			 * Returns archive audit log caption.
			 * @protected
			 * @return {string} Archive audit log caption.
			 */
			getSysOperationAuditArchViewCaption: function() {
				return this.get("Resources.Strings.ArchiveSectionViewCaption");
			},

			/**
			 * Returns archive audit log icon.
			 * @protected
			 * @return {object} Archive audit log icon.
			 */
			getSysOperationAuditArchViewIcon: function() {
				return this.get("Resources.Images.SysOperationAuditArchViewIcon");
			},

			/**
			 * @inheritDoc BaseSectionV2#getDefaultDataViews
			 * @overridden
			 */
			getDefaultDataViews: function() {
				var gridDataView = {
					index: 0,
					active: true,
					name: "GridDataView",
					caption: this.getDefaultGridDataViewCaption(),
					icon: this.getDefaultGridDataViewIcon(),
					hint: this.getDefaultGridDataViewCaption()
				};
				var sysOperationAuditArchView = {
					index: 1,
					name: "SysOperationAuditArchView",
					caption: this.getSysOperationAuditArchViewCaption(),
					icon: this.getSysOperationAuditArchViewIcon(),
					hint: this.getSysOperationAuditArchViewCaption()
				};
				return {
					"GridDataView": gridDataView,
					"SysOperationAuditArchView": sysOperationAuditArchView
				};
			},

			/**
			 * @inheritDoc Terrasoft.BaseSectionV2#getSectionActions
			 * @override
			 */
			getSectionActions: function() {
				var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {bindTo: "Resources.Strings.ArchivingAuditActionCaption"},
					Click: {bindTo: "processMoveAuditToArchive"},
					Visible: true,
					Enabled: {bindTo: "canManageSysAuditOperationsSection"}
				}));
				return actionMenuItems;
			},

			/**
			 * Process operation Move audit to archive.
			 * @protected
			 */
			processMoveAuditToArchive: function() {
				this.showConfirmationDialog(this.get("Resources.Strings.MovingToArchiveActionConfirmMessage"),
						this.doMoveAuditToArchive, ["yes", "no"]);
			},

			/**
			 * Load module Audit to Archive.
			 * @protected
			 * @param {Boolean}Yes or No in confirmation dialog.
			 */
			doMoveAuditToArchive: function(result) {
				if (result === Terrasoft.MessageBoxButtons.YES.returnCode) {
					this.sandbox.publish("PushHistoryState", {
						hash: "SysOperationAuditMovingToArchiveModule/"
					});
				} else {
					return;
				}
			},

			/**
			 * @override
			 * @inheritDoc BaseViewModule#init
			 */
			init: function() {
				this.initCanManageSysOperationAudit();
				this.callParent(arguments);
			},

			/**
			 * Initialize Can manage audit log system operation.
			 * @protected
			 */
			initCanManageSysOperationAudit: function() {
				RightUtilities.checkCanExecuteOperation({
					operation: "CanManageSysOperationAudit"
				}, function(result) {
					this.set("canManageSysAuditOperationsSection", result);
				}, this);
			},

			/**
			 * @inheritDoc BaseDataView#initActionsButtonHeaderMenuItemCaption
			 * @override
			 */
			initActionsButtonHeaderMenuItemCaption: function() {
			},

			/**
			 * Move to archive section.
			 * protected
			 */
			moveToArchiveSection: function() {
				this.sandbox.publish("PushHistoryState", {
					hash: this.Terrasoft.combinePath("SectionModuleV2", "SysOperationAuditArchiveSectionV2"),
					stateObj: {
						module: "SectionModuleV2",
						schemas: ["SysOperationAuditArchiveSectionV2"]
					}
				});
			},

			/**
			 * @inheritdoc BaseSection#changeDataView
			 * @override
			 */
			changeDataView: function(viewConfig) {
				if (viewConfig.tag === "GridDataView") {
					this.callParent(arguments);
				} else {
					this.moveToArchiveSection();
				}
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "CombinedModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "DeleteRecordMenuItem"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowOpenAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowCopyAction"
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			}
		]/**SCHEMA_DIFF*/
	};
});


