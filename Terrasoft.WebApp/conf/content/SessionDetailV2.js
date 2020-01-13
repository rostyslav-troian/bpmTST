Terrasoft.configuration.Structures["SessionDetailV2"] = {innerHierarchyStack: ["SessionDetailV2"], structureParent: "BaseGridDetailV2"};
define('SessionDetailV2Structure', ['SessionDetailV2Resources'], function(resources) {return {schemaUId:'59dec7f9-8ad8-49c2-b19f-0eac56e0bcf6',schemaCaption: "Sessions detail schema", parentSchemaName: "BaseGridDetailV2", schemaName:'SessionDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SessionDetailV2", ["terrasoft", "SessionDetailV2Resources"],
	function(Terrasoft, resources) {
		return {
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "AddRecordButton"
				},
				{
					"operation": "remove",
					"name": "ActionsButton"
				},
				{
					"operation": "merge",
					"name": "DataGrid",
					"parentName": "Detail",
					"propertyName": "items",
					"values": {
						"selectRow": {"bindTo": "rowSelected"},
						"activeRowAction": {"bindTo": "onActiveRowAction"},
						"activeRowActions": []
					}
				},
				{
					"operation": "insert",
					"name": "EndTheSessionActionButton",
					"parentName": "DataGrid",
					"propertyName": "activeRowActions",
					"values": {
						"className": "Terrasoft.Button",
						"style": Terrasoft.controls.ButtonEnums.style.GREY,
						"caption": resources.localizableStrings.EndTheSessionButtonCaption,
						"tag": "endSession",
						"markerValue": "EndSessionButtonMarker",
						"visible": {
							"bindTo": "SessionEndDate",
							"bindConfig": {
								"converter": function(value) {
									return !value;
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "EndTheSessionButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"index": 0,
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.EndTheSessionButtonCaption"},
						"click": {"bindTo": "endTheSession"},
						"enabled": {"bindTo": "EndTheSessionButtonEnabled"}
					}
				}
			]/**SCHEMA_DIFF*/,
			entitySchemaName: "SysUserSession",
			methods: {

				/**
				 * ########## ####### ## ###### ########## ######.
				 * @protected
				 * @param {String} buttonTag ### ######.
				 * @param {Guid} primaryColumnValue ############# ########## ######.
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					switch (buttonTag) {
						case "endSession":
							this.endTheSession(primaryColumnValue);
							break;
					}
				},

				/**
				 * ############ ####### ###### ###### #######.
				 * @protected
				 */
				rowSelected: function(primaryColumnValue) {
					this.setEndTheSessionButtonEnable(primaryColumnValue);
				},

				/**
				 * @inheritdoc GridUtilitiesV2#onGridDataLoaded
				 * @overridden
				 */
				onGridDataLoaded: function() {
					this.callParent(arguments);
					this.setEndTheSessionButtonEnable(this.get("ActiveRow"));
				},

				/**
				 * ######## ######## ########### ###### "######### #####".
				 * @protected
				 * @return {boolean} ######### ######.
				 */
				setEndTheSessionButtonEnable: function(primaryColumnValue) {
					var visible = false;
					var activeRow;
					if (primaryColumnValue) {
						var gridData = this.getGridData();
						activeRow = gridData.find(primaryColumnValue) ? gridData.get(primaryColumnValue) : null;
					}
					if (!this.Ext.isEmpty(activeRow)) {
						visible = this.Ext.isEmpty(activeRow.get("SessionEndDate"));
					}
					this.set("EndTheSessionButtonEnabled", visible);
				},

				/**
				 * @inheritdoc BaseDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				getSwitchGridModeMenuItem: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc BaseDetailV2#getSwitchGridModeMenuItem
				 * @overridden
				 */
				addRecordOperationsMenuItems: this.Terrasoft.emptyFn,

				/**
				 * @inheritdoc Terrasoft.BaseGridDetailV2#addDetailWizardMenuItems
				 * @overridden
				 */
				addDetailWizardMenuItems: this.Terrasoft.emptyFn,

				/**
				 * ############ ##### ####### ##### ######## ######### #####.
				 * @param {Object} response ######, ########## ##### #######.
				 * @protected
				 */
				endTheSessionCallBack: function(response) {
					if (response) {
						if (!this.Ext.isEmpty(response.TerminateSessionResult) &&
							response.TerminateSessionResult >= 0) {
							this.reloadGridData();
						} else {
							this.showInformationDialog(
								this.get("Resources.Strings.TerminateSessionErrorMessage"));
						}
					}
				},

				/**
				 * ######### ######## "######### #####".
				 * @protected
				 */
				endTheSession: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.TerminateSessionMessage"),
						function(returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
								return;
							}
							var dataSend = {
								recordId: this.get("ActiveRow")
							};
							var config = {
								serviceName: "AdministrationService",
								methodName: "TerminateSession",
								data: dataSend
							};
							this.callService(config, this.endTheSessionCallBack);
						},
						[this.Terrasoft.MessageBoxButtons.YES.returnCode, this.Terrasoft.MessageBoxButtons.NO.returnCode],
						null);
				},

                /**
                 * @overridden
                 * @return {String} ### #######.
                 */
                getFilterDefaultColumnName: function() {
                    return "SessionStartDate";
                }
			}
		};
	});


