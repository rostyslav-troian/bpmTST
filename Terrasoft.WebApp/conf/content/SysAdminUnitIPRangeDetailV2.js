Terrasoft.configuration.Structures["SysAdminUnitIPRangeDetailV2"] = {innerHierarchyStack: ["SysAdminUnitIPRangeDetailV2"], structureParent: "SysAdminUnitChiefIPRangeDetailV2"};
define('SysAdminUnitIPRangeDetailV2Structure', ['SysAdminUnitIPRangeDetailV2Resources'], function(resources) {return {schemaUId:'018dc699-811f-4502-bb62-e04c85858612',schemaCaption: "IP addresses detail schema", parentSchemaName: "SysAdminUnitChiefIPRangeDetailV2", schemaName:'SysAdminUnitIPRangeDetailV2',parentSchemaUId:'cd686749-dbb5-44bf-9863-73270fb3e730',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SysAdminUnitIPRangeDetailV2", ["terrasoft"],
	function(Terrasoft) {
		return {
			mixins: {
				ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
			},
			attributes: {
				IsEditable: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				}
			},
			entitySchemaName: "SysAdminUnitIPRange",
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.SysAdminUnitChiefIPRangeDetailV2#getAddRecordButtonEnabled
				 * @overridden
				 */
				getAddRecordButtonEnabled: function() {
					return true;
				},

				/**
				 * ######### ###### # ###### ######. ####### ####### ######.
				 * @inheritdoc SysAdminUnitChiefIPRangeDetailV2#loadGridData
				 * @overridden
				 */
				loadGridData: function() {
					this.beforeLoadGridData();
					var esq = this.getGridDataESQ();
					this.initQueryColumns(esq);
					this.initQuerySorting(esq);
					this.initQueryFilters(esq);
					this.initQueryOptions(esq);
					this.initQueryEvents(esq);
					esq.getEntityCollection(function(response) {
						this.destroyQueryEvents(esq);
						this.onGridDataLoaded(response);
					}, this);
					this.setOrgRoleId();
				},

				/**
				 * ########## ###### ### ########## #######
				 * @inheritdoc SysAdminUnitChiefIPRangeDetailV2#getFilters
				 * @overridden
				 * @return {Terrasoft.FilterGroup} ###### ######## filters.
				 **/
				getFilters: function() {
					var filters = this.callParent(arguments);
					var orgRoleId = this.get("MasterRecordId");
					if (orgRoleId) {
						var idFilter = Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "SysAdminUnit.Id", orgRoleId);
						filters.addItem(idFilter);
					}
					return filters;
				},

				/**
				 * ############# ######## ############### #### ## ######### ######### ###. ####.
				 * @protected
				 * @return {void} ###### ######## filters.
				 **/
				setOrgRoleId: function() {
					var orgRoleId = this.get("MasterRecordId");
					var orgRoleValue = {
						name: "SysAdminUnit",
						value: orgRoleId
					};
					this.set("DefaultValues", [orgRoleValue]);
				},

				/**
				 * @overridden
				 * @return {String} ### #######.
				 */
				getFilterDefaultColumnName: function() {
					return "BeginIP";
				}
			}
		};
	});


