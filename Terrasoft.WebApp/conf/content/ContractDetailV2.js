Terrasoft.configuration.Structures["ContractDetailV2"] = {innerHierarchyStack: ["ContractDetailV2CoreContracts", "ContractDetailV2"], structureParent: "BaseGridDetailV2"};
define('ContractDetailV2CoreContractsStructure', ['ContractDetailV2CoreContractsResources'], function(resources) {return {schemaUId:'c801e7b9-0278-4452-9710-c0c55e8c55fc',schemaCaption: "Section detail schema - \"Contracts\"", parentSchemaName: "BaseGridDetailV2", schemaName:'ContractDetailV2CoreContracts',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractDetailV2Structure', ['ContractDetailV2Resources'], function(resources) {return {schemaUId:'4f8177f5-e619-4113-92d6-e95d61163182',schemaCaption: "Section detail schema - \"Contracts\"", parentSchemaName: "ContractDetailV2CoreContracts", schemaName:'ContractDetailV2',parentSchemaUId:'c801e7b9-0278-4452-9710-c0c55e8c55fc',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContractDetailV2CoreContracts",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContractDetailV2CoreContractsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContractDetailV2CoreContracts", ["terrasoft", "ConfigurationEnums", "BusinessRuleModule"],
function(Terrasoft, enums) {
	return {
		entitySchemaName: "Contract",
		attributes: {},
		messages: {
			/**
			 * @message CardModuleResponse
			 * ########## ########## # ########## ########.
			 * @param {Object} ############ ########### ########.
			 */
			"CardModuleResponse": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				var cardModuleId = this.sandbox.id.replace("_detail_ContractContract", "") + "_ContractEdit";
				this.sandbox.subscribe("CardModuleResponse", function(config) {
					if (this.destroyed) {
						return;
					}
					this.loadGridDataRecord(config.primaryColumnValue);
				}, this, [cardModuleId]);
			},

			/**
			 * ########## ######### ## ########## ############ ######## ############## # ########## #####
			 * ######## ########### ########## ### ##### # #########
			 * @private
			 */
			linkWithExisting: function() {
				var editPages = this.get("EditPages");
				if (editPages.getCount() === 0) {
					return;
				}
				var editPage = editPages.getByIndex(0);
				var editPageUId = editPage.get("Tag");
				var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
				var isNew = (cardState.state === enums.CardStateV2.ADD ||
				cardState.state === enums.CardStateV2.COPY);
				if (isNew) {
					this.set("CardState", enums.CardStateV2.ADD);
					this.set("EditPageUId", editPageUId);
					var scope = this;
					var args = {
						isSilent: true,
						callback: function() {
							scope.openContractLookupToLink();
						},
						messageTags: [this.sandbox.id]
					};
					this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
				} else {
					this.openContractLookupToLink();
				}
			},
			/**
			 * ######### ########## ########## ### ###### #######,
			 * ####### ########## ####### # ####### #########.
			 * @private
			 */
			getLookupFilters: function() {
				var config = {
					entitySchemaName: "Contract",
					multiSelect: true,
					columns: ["Number", "Account", "Type", "State"]
				};
				var filterGroup = this.Terrasoft.createFilterGroup();
				var defaultValues = this.get("DefaultValues");
				var existsFilterGroup = this.Terrasoft.createFilterGroup();
				existsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Parent", this.get("MasterRecordId")));
				var existsFilter = this.Terrasoft.createNotExistsFilter("Id", existsFilterGroup);
				filterGroup.addItem(existsFilter);
				var filterGroupNull = this.Terrasoft.createFilterGroup();
				filterGroupNull.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
				filterGroupNull.addItem(this.Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.NOT_EQUAL, "Parent", this.get("MasterRecordId")));
				filterGroupNull.addItem(this.Terrasoft.createColumnIsNullFilter("Parent"));
				filterGroup.addItem(filterGroupNull);
				filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL, "Id", this.get("MasterRecordId")));
				if (defaultValues) {
					this.Terrasoft.each(defaultValues, function(defValue) {
						if (defValue.name === "Account" || defValue.name === "OurCompany") {
							filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, defValue.name, defValue.value));
						}
					}, this);
				}
				config.filters = filterGroup;
				return config;
			},
			/**
			 * ######### ########## ########## ### ###### #######,
			 * ####### ########## ####### # ####### #########.
			 * @private
			 */
			openContractLookupToLink: function() {
				var config = this.getLookupFilters();
				this.openLookup(config, this.linkSelectedRecords, this);
			},
			/**
			 * ######### ##### ### ######### ####### # ############ #########.
			 * ########## ####### ########### ####### # # ##### ########## #########,
			 * ####### ######### #### ######### ## ######### # ##########.
			 * @param {Object} args ###### #### {columnName: string, selectedRows: []}.
			 * ######## ###### ######### ####### ## ###########.
			 * @private
			 */
			linkSelectedRecords: function(args) {
				var selectedRows = args.selectedRows.getItems();
				var totalCount = selectedRows.length;
				var addedCount = 0;
				var callsCount = 0;
				this.Terrasoft.each(selectedRows, function(item) {
					callsCount++;
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "Contract"
					});
					update.enablePrimaryColumnFilter(item.value);
					update.setParameterValue("Parent", this.get("MasterRecordId"), this.Terrasoft.DataValueType.GUID);
					update.execute(function(response) {
						if (response && response.success) {
							addedCount++;
						}
						if (callsCount === totalCount) {
							var resultMessage =
								this.Ext.String.format(this.get("Resources.Strings.AddedLinksCountMessage"),
									addedCount, totalCount);
							this.Terrasoft.showInformation(resultMessage);
							this.reloadGridData();
						}
					}, this);
				}, this);
			},
			/**
			 * ####### ##### ############ ######## # ####### #########.
			 * @private
			 */
			deleteLinkWithContracts: function() {
				this.showBodyMask();
				var selectedRows = this.getSelectedItems();
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "Contract"
				});
				update.filters.add("ContractsFilter",
					Terrasoft.createColumnInFilterWithParameters("Id", selectedRows));
				update.setParameterValue("Parent", null, this.Terrasoft.DataValueType.GUID);
				this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
					function(returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							update.execute(function() {
								this.hideBodyMask();
								this.set("ActiveRow", null);
								this.set("SelectedRow", null);
								this.reloadGridData();
							}, this);
						} else {
							this.hideBodyMask();
						}
					},
					[this.Terrasoft.MessageBoxButtons.YES.returnCode,
						this.Terrasoft.MessageBoxButtons.NO.returnCode]);
			},
			/**
			 * ##########/######## ###### ##### # ############ #########
			 * @private
			 * @returns {boolean} ########## ####### ######### ######.
			 */
			getLinkButtonVisible: function() {
				return (this.get("CardPageName") === "ContractPageV2");
			},
			/**
			 ** ######### ######## ############### ######## # ######### ########### ###### ############## ######.
			 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
			 * @overridden
			 */
			addRecordOperationsMenuItems: function(toolsButtonMenu) {
				this.callParent(arguments);
				toolsButtonMenu.addItem(this.getButtonMenuSeparator());
				toolsButtonMenu.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.LinkWithExistingCaption"},
					Click: {"bindTo": "linkWithExisting"},
					Visible: {"bindTo": "getLinkButtonVisible"}
				}));
				toolsButtonMenu.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.DeleteLinkWithContractsCaption"},
					Click: {"bindTo": "deleteLinkWithContracts"},
					Visible: {"bindTo": "getLinkButtonVisible"},
					Enabled: {"bindTo": "getSelectedItems"}
				}));
			},
			/**
			 * ############# ######### ###### "########" # ########### ## ######## ########
			 * @protected
			 *
			 * @return {String}
			 */
			getContractDetailCaption: function() {
				var cardPageName = this.get("CardPageName");
				if (cardPageName === "ContractPageV2") {
					return this.get("Resources.Strings.ContractCaption");
				}
				return this.get("Resources.Strings.Caption");
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
								"name": "NumberListedGridColumn",
								"bindTo": "Number",
								"position": {
									"column": 1,
									"colSpan": 12
								},
								"type": Terrasoft.GridCellType.TITLE
							}
						]
					},
					"tiledConfig": {
						"name": "DataGridTiledConfig",
						"grid": {
							"columns": 24,
							"rows": 3
						},
						"items": [
							{
								"name": "NumberTiledGridColumn",
								"bindTo": "Number",
								"position": {
									"row": 1,
									"column": 1,
									"colSpan": 12
								},
								"type": Terrasoft.GridCellType.TITLE
							}
						]
					}
				}
			},
			{
				"operation": "merge",
				"name": "Detail",
				"values": {
					caption: {bindTo: "getContractDetailCaption"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("ContractDetailV2", [],
function() {
	return {
		entitySchemaName: "Contract",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[],/**SCHEMA_DIFF*/
		methods: {
			/**
			 * ######### ########## ########## ### ###### #######,
			 * ####### ########## ####### # ####### #########.
			 * @override
			 */
			getLookupFilters: function() {
				var config = this.callParent();
				config.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Type.IsSlave", true));
				return config;
			}
		}
	}
});


