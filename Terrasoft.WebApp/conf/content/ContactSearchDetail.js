Terrasoft.configuration.Structures["ContactSearchDetail"] = {innerHierarchyStack: ["ContactSearchDetail"], structureParent: "BaseGridDetailV2"};
define('ContactSearchDetailStructure', ['ContactSearchDetailResources'], function(resources) {return {schemaUId:'15a36ca0-0c4a-498a-9c1f-784766aa7e57',schemaCaption: "Search detail schema - \"Contacts\"", parentSchemaName: "BaseGridDetailV2", schemaName:'ContactSearchDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactSearchDetail", ["ContactSearchDetailGridRowViewModel"],
		function() {
			return {
				/**
				 * ### ##### #######
				 * @type {String}
				 */
				entitySchemaName: "Contact",
				messages: {
					/**
					 * @message IsCaseIncluded
					 * ########## # ###### #########.
					 * @param {boolean} ####### ######### ### ############.
					 */
					"IsCaseIncluded": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},
					/**
					 * @message GetSelectButtonCaption
					 * ######## ####### ###### ######.
					 * @param {String} ####### ###### ######.
					 */
					"GetSelectButtonCaption": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				attributes: {
					"IsCaseIncluded": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"SelectButtonCaption": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				methods: {
					/**
					 * ######### ####### ### ###### # #### ########## ######### #### ######
					 * @protected
					 * @virtual
					 * @param {Object} config ############ ######, ### #### ######## #######.
					 * @param {Boolean} isReloadAll #### ########## ######.
					 */
					refreshRecords: function(config, isReloadAll) {
						var filters = this.Ext.create("Terrasoft.FilterGroup");
						var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
						var isArguments = false;
						if (config) {
							for (var item in config) {
								if (!this.Ext.isEmpty(config[item])) {
									isArguments = true;
									switch (item) {
										case "Case":
											filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
													this.Terrasoft.ComparisonType.CONTAIN,
													"[Case:Contact:Id].Number", config[item]));
											break;
										case "Account":
											filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
													this.Terrasoft.ComparisonType.CONTAIN,
													"[Account:Id:AccountId].Name", config[item]));
											break;
										case "Phone":
											filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
												this.Terrasoft.ComparisonType.CONTAIN,
												"[ContactCommunication:Contact:Id].Number", config[item]));
											break;
										default:
											filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
													this.Terrasoft.ComparisonType.CONTAIN,
													item, config[item]));
									}
								}
							}
						}
						if (!isArguments) {
							filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
									this.Terrasoft.ComparisonType.EQUAL,
									"Id", this.Terrasoft.GUID_EMPTY));
						}
						filters.addItem(filterGroup);
						this.set("detailFilter", filters);
						if (isReloadAll) {
							this.updateDetail({reloadAll: true});
						}
					},
					/**
					 * @inheritDoc Terrasoft.BaseModuleSectionV2#init
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.refreshRecords(null, false);
					},
					/**
					 * ############# ## #########, ########### ### ###### ######
					 * @protected
					 * @overridden
					 */
					subscribeSandboxEvents: function() {
						this.sandbox.subscribe("UpdateDetail",
								function(config) {
									this.refreshRecords(config, true);
								},
								this, [this.sandbox.id]);
						this.sandbox.subscribe("IsCaseIncluded",
								function(config) {
									this.set("IsCaseIncluded", config);
								},
								this);
						this.sandbox.subscribe("GetSelectButtonCaption",
								function(config) {
									this.set("SelectButtonCaption", config);
								},
								this);
					},
					/**
					 * ######## ######### ########
					 * overridden
					 * @returns {Object}
					 */
					getFilters: function() {
						return this.get("detailFilter");
					},
					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
					 * @overridden
					 */
					addRecordOperationsMenuItems : this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
					 * @overridden
					 */
					addDetailWizardMenuItems: this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
					 * @overridden
					 */
					getSwitchGridModeMenuItem : this.Terrasoft.emptyFn,
					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#getIsLinkColumn
					 * @overridden
					 */
					getIsLinkColumn: function() {
						return false;
					},
					/**
					 * ############ ####### "########" ######## ######.
					 * @overridden
					 */
					onActiveRowAction: function() {
						this.sandbox.publish("DetailChanged", this.get("ActiveRow"), [this.sandbox.id]);
					},
					/**
					 * ######## ######## ###### ###### ############# ############# ####### ## ########### #######
					 * @protected
					 * @return {String} ########## ########
					 */
					getGridRowViewModelClassName: function() {
						return "Terrasoft.ContactSearchDetailGridRowViewModel";
					},
					/**
					 * ############## ######## ###### ############# ####### #####.
					 * ######### ########## #######
					 * #### ###### ####### ############ - #######
					 * #### ##### ######### - ####### #########
					 * @protected
					 * @overridden
					 */
					getGridRowViewModelConfig: function() {
						var gridRowViewModelConfig = this.callParent(arguments);
						gridRowViewModelConfig.values.CaseVisibility = this.get("IsCaseIncluded");
						gridRowViewModelConfig.values.SelectButtonCaption = this.get("SelectButtonCaption");
						return gridRowViewModelConfig;
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "AddRecordButton"
					},
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"activeRowAction": {bindTo: "onActiveRowAction"},
							"activeRowActions": [
								{
									"className": "Terrasoft.Button",
									"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
									"caption": {"bindTo": "SelectButtonCaption"}
								}
							]
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


