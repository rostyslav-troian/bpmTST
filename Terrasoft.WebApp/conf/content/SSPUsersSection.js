Terrasoft.configuration.Structures["SSPUsersSection"] = {innerHierarchyStack: ["SSPUsersSection"], structureParent: "UsersSectionV2"};
define('SSPUsersSectionStructure', ['SSPUsersSectionResources'], function(resources) {return {schemaUId:'46bbcb8b-a3f4-44a8-8fd3-c74b4c17da1c',schemaCaption: "Portal users section", parentSchemaName: "UsersSectionV2", schemaName:'SSPUsersSection',parentSchemaUId:'2db64a17-3f13-4925-8764-c82689da5d79',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SSPUsersSection", ["ConfigurationEnums", "ConfigurationConstants"],
	function(ConfigurationEnums, ConfigurationConstants) {
		return {
			entitySchemaName: "SysAdminUnit",
			attributes: {
				"SecurityOperationName": {
					dataValueType: Terrasoft.DataValueType.STRING,
					value: "CanAdministratePortalUsers"
				}
			},
			diff: [
				{
					"operation": "remove",
					"name": "SeparateModeAddPortalUser",
					"parentName": "SeparateModeAddRecordButton",
					"propertyName": "menu"
				},
				{
					"operation": "remove",
					"name": "SeparateModeAddOurCompanyUser",
					"parentName": "SeparateModeAddRecordButton",
					"propertyName": "menu"
				},
				{
					"operation": "merge",
					"parentName": "CombinedModeActionButtonsSectionContainer",
					"propertyName": "items",
					"name": "SeparateModeAddRecordButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "Resources.Strings.AddRecordButtonCaption"},
						"classes": {
							"textClass": ["actions-button-margin-right"],
							"wrapperClass": ["actions-button-margin-right"]
						},
						"controlConfig": {},
						"click": {"bindTo": "onAddPortalUser"}
					}
				}
			],
			methods: {
				/**
				 * @inheritdoc Terrasoft.GridUtilities#initQueryFilters
				 * @overridden
				 */
				initQueryFilters: function(esq) {
					this.callParent(arguments);
					esq.filters.removeByKey("ConnectionType");
					esq.filters.add("ConnectionType",
						Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "ConnectionType", 1));
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#changeDataView
				 * @overridden
				 */
				changeDataView: function(view) {
					if (view.tag !== "GridDataView") {
						this.moveToRolesSection(view.tag);
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritDoc Terrasoft.UsersSectionV2#moveToRolesSection
				 * @overridden
				 */
				moveToRolesSection: function(viewName) {
					var pageName = this.getPageNameForRoles(viewName);
					var primaryColumnValue = this.getPrimaryColumnValueForRoles(viewName);
					this.sandbox.publish("PushHistoryState", {
						hash: this.Terrasoft.combinePath("SectionModuleV2", "SspSysAdminUnitSection",
							pageName, "edit", primaryColumnValue),
						stateObj: {
							module: "SectionModuleV2",
							operation: "edit",
							primaryColumnValue: primaryColumnValue,
							schemas: [
								"SspSysAdminUnitSection",
								pageName
							],
							workAreaMode: ConfigurationEnums.WorkAreaMode.COMBINED,
							moduleId: this.sandbox.id,
							UsersActiveRow: this.get("ActiveRow"),
							FuncRolesActiveRow: this.get("FuncRolesActiveRow"),
							OrgRolesActiveRow: this.get("OrganizationalRolesActiveRow")
						}
					});
				},

				/**
				 * @inheritDoc Terrasoft.UsersSectionV2#getPrimaryColumnValueForRoles
				 * @overridden
				 */
				getPrimaryColumnValueForRoles: function(viewName) {
					var id;
					if (viewName === "OrganizationalRolesDataView") {
						id = this.get("OrganizationalRolesActiveRow");
					} else {
						id = this.get("FuncRolesActiveRow");
					}
					return id || ConfigurationConstants.SysAdminUnit.Id.PortalUsers;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @overridden
				 */
				getDefaultDataViews: function() {
					var baseDataViews = {
						GridDataView: {
							index: 0,
							name: "GridDataView",
							caption: this.get("Resources.Strings.UsersHeader"),
							icon: this.get("Resources.Images.UsersDataViewIcon"),
							hint: this.get("Resources.Strings.UsersDataViewHint")
						},
						OrganizationalRolesDataView: {
							index: 1,
							name: "OrganizationalRolesDataView",
							caption: this.get("Resources.Strings.OrganizationalRolesHeader"),
							icon: this.get("Resources.Images.OrgRolesIcon"),
							hint: this.get("Resources.Strings.OrganizationalStructureDataViewHint")
						},
						FuncRolesDataView: {
							index: 2,
							name: "FuncRolesDataView",
							caption: this.get("Resources.Strings.FunctionalRolesHeader"),
							icon: this.get("Resources.Images.FuncRolesIcon"),
							hint: this.get("Resources.Strings.FunctionalRolesDataViewHint")
						}
					};
					return baseDataViews;
				},

				getPageNameForRoles: function(viewName) {
					return viewName === "OrganizationalRolesDataView"
						? "SspSysAdminUnitPage"
						: "SspSysAdminUnitFuncRolePage";
				}

			}
		};
	}
);


