Terrasoft.configuration.Structures["ProductCatalogueLevelPageV2"] = {innerHierarchyStack: ["ProductCatalogueLevelPageV2"], structureParent: "BasePageV2"};
define('ProductCatalogueLevelPageV2Structure', ['ProductCatalogueLevelPageV2Resources'], function(resources) {return {schemaUId:'fd2a8ea7-61be-4099-bc15-bc1a1aa3e8ea',schemaCaption: "Edit page - Product catalog level", parentSchemaName: "BasePageV2", schemaName:'ProductCatalogueLevelPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
// D9 Team
define("ProductCatalogueLevelPageV2", ["StructureExplorerUtilities", "css!ProductManagementDistributionConstants"],
	function(StructureExplorerUtilities) {
		return {
			entitySchemaName: "ProductCatalogueLevel",
			messages: {
				/**
				 * @message StructureExplorerInfo
				 * ########## ### ###### StructureExplorerUtilities
				 */
				"StructureExplorerInfo": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ColumnSelected
				 * ########## ### ###### StructureExplorerUtilities
				 */
				"ColumnSelected": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				/**
				 * ######## #### StructureExplorer.
				 * @private
				 */
				openStructureExplorer: function() {
					var config = {
						useBackwards: false,
						firstColumnsOnly: true,
						summaryColumnsOnly: false,
						lookupsColumnsOnly: true,
						schemaName: "Product"
					};
					var handler = this.structureExplorerHandler;
					StructureExplorerUtilities.Open(this.sandbox,
						config, handler, this.renderTo, this);
				},

				/**
				 * ########## ###### StructureExplorer.
				 * ######### ######## viewModel ######## ###### # #### StructureExplorer.
				 * @param {Object} args ######## ######### ###### ############.
				 */
				structureExplorerHandler: function(args) {
					var columnCaption = args.leftExpressionCaption;
					var columnPath = args.leftExpressionColumnPath;
					var referenceSchemaName = args.referenceSchemaName;
					var oldColumnPath = this.get("ColumnPath");
					var oldColumnCaption = this.get("ColumnCaption");
					var oldName = this.get("Name");
					this.set("ColumnCaption", columnCaption);
					this.set("ColumnPath", columnPath);
					this.set("ReferenceSchemaName", referenceSchemaName);
					if ((oldName === oldColumnCaption || this.Ext.isEmpty(oldName)) &&
						columnPath !== oldColumnPath)
					{
						this.set("Name", columnCaption);
					}
				},

				/**
				 *  ########## ###### ######### ######## ########, #### ##### ## ################ ## #######.
				 *  ####### ##### ######## # ####### ######
				 * @returns {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########.
				 */
				getActions: function() {
					var parentActions = this.callParent(arguments);
					if (parentActions && !this.getSchemaAdministratedByRecords()) {
						parentActions.clear();
					}
					return parentActions;
				}
			},
			diff: /**SCHEMA_DIFF*/[
// Tabs
				{
					"operation": "merge",
					"name": "Tabs",
					"values": {
						"visible": false
					}
				},
// Header
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {"column": 0, "row": 0, "colSpan": 24}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ColumnCaption",
					"values": {
						"bindTo": "ColumnCaption",
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"classes": {"wrapClass": ["columnCaption-readonly-class"]},
						"controlConfig": {
							"className": "Terrasoft.TextEdit",
							"readonly": true,
							"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
							"rightIconClick": {"bindTo": "openStructureExplorer"}
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


