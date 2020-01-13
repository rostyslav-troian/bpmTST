Terrasoft.configuration.Structures["ProductUnitDetailV2"] = {innerHierarchyStack: ["ProductUnitDetailV2"], structureParent: "BaseGridDetailV2"};
define('ProductUnitDetailV2Structure', ['ProductUnitDetailV2Resources'], function(resources) {return {schemaUId:'85e083de-4dad-4575-83f6-f15ee4a37886',schemaCaption: "ProductUnitDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'ProductUnitDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductUnitDetailV2", ["RightUtilities"],
	function(RightUtilities) {
		return {
			entitySchemaName: "ProductUnit",
			attributes: {
				/**
				 * ####### ####### # ######### ####### ######## #####-#####
				 * @type {Terrasoft.DataValueType.BOOLEAN}
				 */
				HasBaseItem: {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {
				/**
				 * ######### ####### ##### ######### #######, ###### # ######### "#######"
				 * @protected
				 * @param {Terrasoft.Collection} items ######### ######### #########
				 */
				checkAndSetHasIsBaseInDeleteItems: function(items) {
					var hasIsBaseItem = false;
					var gridData = this.getGridData();
					if (gridData) {
						this.Terrasoft.each(items, function(itemKey) {
							var item = gridData.get(itemKey);
							hasIsBaseItem = hasIsBaseItem || item.get("IsBase");
						}, this);
					}
					this.set("HasBaseItem", hasIsBaseItem);
				},

				/**
				 * ######### ######
				 * @protected
				 * @param {Object} config
				 * @overriden
				 */
				updateDetail: function(config) {
					config.reloadAll = true;
					this.callParent(arguments);
				},

				/**
				 * ####### ########## ######
				 * @protected
				 * @overriden
				 */
				deleteRecords: function() {
					var items = this.getSelectedItems();
					if (!items || !items.length) {
						return;
					}
					this.checkAndSetHasIsBaseInDeleteItems(items);
					if (items.length === 1) {
						RightUtilities.checkCanDelete({
							schemaName: this.entitySchema.name,
							primaryColumnValue: items[0]
						}, this.deleteCallback, this);
					} else {
						RightUtilities.checkMultiCanDelete({
							schemaName: this.entitySchema.name,
							primaryColumnValues: items
						}, this.deleteCallback, this);
					}
				},

				/**
				 * ####### ######### ###### ######## #######
				 * @param {String} result
				 */
				deleteCallback: function(result) {
					if (result) {
						this.showInformationDialog(this.get("Resources.Strings." + result), function() {
						}, {
							style: this.Terrasoft.MessageBoxStyles.BLUE
						});
					} else {
						if (!this.get("HasBaseItem")) {
							this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
								function(returnCode) {
									if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										this.onDeleteAccept();
									}
								},
								[this.Terrasoft.MessageBoxButtons.YES.returnCode,
									this.Terrasoft.MessageBoxButtons.NO.returnCode],
								null);
						} else {
							this.showInformationDialog(this.get("Resources.Strings.DeleteHasIsBaseItemMessage"),
								function() {}, {style: this.Terrasoft.MessageBoxStyles.BLUE});
						}
					}
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#getFilterDefaultColumnName
				 * @overridden
				 */
				getFilterDefaultColumnName: function() {
					return "Unit";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"primaryDisplayColumnName": "Unit.Name"
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


