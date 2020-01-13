Terrasoft.configuration.Structures["SspSysAdminUnitSection"] = {innerHierarchyStack: ["SspSysAdminUnitSection"], structureParent: "SysAdminUnitSectionV2"};
define('SspSysAdminUnitSectionStructure', ['SspSysAdminUnitSectionResources'], function(resources) {return {schemaUId:'31fceb4d-5207-4df0-8384-faa367817ec4',schemaCaption: "SspSysAdminUnitSection", parentSchemaName: "SysAdminUnitSectionV2", schemaName:'SspSysAdminUnitSection',parentSchemaUId:'03bd5572-3acc-4077-a4a8-b2bc8a1af353',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SspSysAdminUnitSection", ["ConfigurationEnums", "ConfigurationConstants", "css!SspAdminUnitSectionCSS"],
	function(ConfigurationEnums, ConfigurationConstants) {
		return {
			entitySchemaName: "SysAdminUnit",
			attributes: {
				"SecurityOperationName": {
					"dataValueType": this.Terrasoft.DataValueType.STRING,
					"value": "CanAdministratePortalUsers"
				}
			},
			diff: [
				{
					"operation": "merge",
					"name": "SectionContainer",
					"values": {
						"wrapClass": ["section", "left-el", "ssp-section"]
					}
				},
				{
					"operation": "merge",
					"name": "CardContainer",
					"values": {
						"wrapClass": ["card", "right-el", "ssp-card"]
					}
				},
				{
					"operation": "merge",
					"name": "ActionButtonsContainer",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "merge",
					"name": "CombinedModeActionButtonsSectionContainer",
					"values": {
						"visible": false
					}
				}
			],
			methods: {
				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getFilters
				 * @overridden
				 */
				getFilters: function() {
					var filters = this.callParent(arguments);
					filters.add("SspConnectionType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ConnectionType", 1));
					return filters;
				},

				/**
				 * @inheritDoc Terrasoft.SysAdminUnitSectionV2#moveToUsersSection
				 * @overridden
				 */
				moveToUsersSection: function() {
					this.sandbox.publish("PushHistoryState", {
						hash: this.Terrasoft.combinePath("SectionModuleV2", "SSPUsersSection"),
						stateObj: {
							module: "SectionModuleV2",
							schemas: ["SSPUsersSection"],
							UsersActiveRow: this.get("UsersActiveRow"),
							FuncRolesActiveRow: this.getActiveFuncRoleId(),
							OrgRolesActiveRow: this.getActiveOrgRoleId()
						}
					});
				},

				/**
				 * @inheritDoc BaseSectionV2#loadView
				 * @overridden
				 */
				loadView: function(dataViewName) {
					this.set("ActiveViewName", dataViewName);
					this.saveActiveViewNameToProfile(dataViewName);
					if (this.Ext.get("SspSysAdminUnitSectionContainer")) {
						this.openCard(this.getEditPageName(), ConfigurationEnums.CardStateV2.EDIT,
							this.getLastGroupId());
					}
					this.getActiveViewGridSettingsProfile(function() {
						this["load" + dataViewName](this.getNeedLoadData());
					}, this);
				},


				/**
				 * @inheritDoc Terrasoft.SysAdminUnitSectionV2#getLastGroupId
				 * @overridden
				 */
				getLastGroupId: function() {
					var result = this.isOrganizationalRolesDataView()
						? this.getActiveOrgRoleId()
						: this.getActiveFuncRoleId();
					return result || ConfigurationConstants.SysAdminUnit.Id.PortalUsers;
				},

				/**
				 * @inheritDoc Terrasoft.SysAdminUnitSectionV2#filtrateAdditionButtons
				 * @overridden
				 */
				filtrateAdditionButtons: function(primaryColumnValue) {
					var isOrgRoleView = this.isOrganizationalRolesDataView();
					if (this.Ext.isEmpty(primaryColumnValue)) {
						return;
					}
					if (this.getGridData().contains(primaryColumnValue)) {
						this.prepareAdditionButtons(isOrgRoleView);
						var row = this.getGridData().get(primaryColumnValue);
						var type = !isOrgRoleView
							? ConfigurationConstants.SysAdminUnit.Type.FuncRole
							: row.get("SysAdminUnitTypeValue");
						switch (type) {
							case ConfigurationConstants.SysAdminUnit.Type.Organisation:
								this.set("IsOrganisationShowed", true);
								this.set("IsDepartmentShowed", true);
								this.set("IsCommandShowed", true);
								break;
							case ConfigurationConstants.SysAdminUnit.Type.Department:
								this.set("IsDepartmentShowed", true);
								this.set("IsCommandShowed", true);
								break;
							case ConfigurationConstants.SysAdminUnit.Type.FuncRole:
								this.set("IsFuncRoleEnabled", true);
								break;
						}
					}
				},

				/**
				 * @inheritDoc Terrasoft.SysAdminUnitSectionV2#getFuncRolesPageName
				 * @override
				 */
				getFuncRolesPageName: function() {
					return "SspSysAdminUnitFuncRolePage";
				},

				/**
				 * @inheritDoc Terrasoft.SysAdminUnitSectionV2#getSysAdminUnitPageName
				 * @override
				 */
				getSysAdminUnitPageName: function() {
					return "SspSysAdminUnitPage";
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#loadSummaryModule
				 * @override
				 */
				loadSummaryModule: this.Terrasoft.emptyFn
			}
		};
	});


