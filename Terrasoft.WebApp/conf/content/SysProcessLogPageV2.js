Terrasoft.configuration.Structures["SysProcessLogPageV2"] = {innerHierarchyStack: ["SysProcessLogPageV2"], structureParent: "BasePageV2"};
define('SysProcessLogPageV2Structure', ['SysProcessLogPageV2Resources'], function(resources) {return {schemaUId:'2581eb87-96e7-4e1f-be58-594d8573be92',schemaCaption: "SysProcessLogPageV2", parentSchemaName: "BasePageV2", schemaName:'SysProcessLogPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BasePageV2
 */
define("SysProcessLogPageV2", [
	"ProcessModule",
	"ConfigurationConstants",
	"ProcessLogActions",
	"ProcessModuleUtilities"
], function(ProcessModule, ConfigurationConstants) {
	return {
		entitySchemaName: "VwSysProcessLog",
		attributes: {
			/**
			 * Operation name, which user should have to access to current screen.
			 */
			SecurityOperationName: {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanManageProcessLogSection"
			}
		},
		messages: {
			"ExecutionCanceled": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * Returns Process status property.
			 */
			"GetProcessStatus": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		details: /**SCHEMA_DETAILS*/{
			ProcessElementLog: {
				schemaName: "SysProcessElementLogDetailV2",
				filter: {
					detailColumn: "SysProcess"
				}
			},
			ProcessEntity: {
				schemaName: "SysProcessEntityDetailV2",
				filter: {
					detailColumn: "SysProcess"
				},
				filterMethod: "entityDetailFilter"
			}
		}/**SCHEMA_DETAILS*/,
		methods: {

			/**
			 * @inheritdoc BasePageV2#initCardActionHandler
			 * @override
			 */
			initCardActionHandler: function() {
				this.callParent(arguments);
				this.on("change:Status", function(model, value) {
					this.sandbox.publish("CardChanged", {
						key: "Status",
						value: value
					}, [this.sandbox.id]);
				}, this);
			},

			/**
			 * @inheritdoc BasePageV2#getActions
			 * @override
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.CancelExecutionButtonCaption"},
					Tag: "cancelExecutionConfirmation",
					Visible: {
						"bindTo": "Status",
						"bindConfig": {
							"converter": function(value) {
								return this.getShowCancelExecutionMenuVisible(value);
							}
						}
					}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.ProcessDiagramButtonCaption"},
					Tag: "processDiagram"
				}));
				return actionMenuItems;
			},

			/**
			 * @private
			 */
			getShowCancelExecutionMenuVisible: function(status) {
				var parent = this.get("Parent");
				if (parent) {
					return false;
				}
				var currentStatus = status && status.value;
				return (currentStatus === ConfigurationConstants.SysProcess.Status.Running ||
					currentStatus === ConfigurationConstants.SysProcess.Status.Error);
			},

			/**
			 * Display Cancel process execution dialog.
			 */
			cancelExecutionConfirmation: function() {
				this.showConfirmationDialog(this.get("Resources.Strings.CancelExecutionConfirmation"),
					this.cancelExecution, ["yes", "no"]);
			},

			/**
			 * @private
			 */
			cancelExecution: function(result) {
				if (result === "yes") {
					var selectedItemId = this.get(this.primaryColumnName);
					var data = {processDataIds: selectedItemId};
					var maskId = Terrasoft.Mask.show();
					ProcessModule.services.cancelExecution(this, data, function() {
						this.loadEntity(selectedItemId, function() {
							this.sandbox.publish("ExecutionCanceled", selectedItemId);
							this.updateDetails();
							this.set("Status", ConfigurationConstants.SysProcess.Status2.Canceled);
							Terrasoft.Mask.hide(maskId);
						}, this);
					});
				}
			},

			/**
			 * Open process run diagram.
			 */
			processDiagram: function() {
				var schemaUId = this.get(this.primaryColumnName);
				Terrasoft.ProcessModuleUtilities.showProcessDiagram(schemaUId);
			},

			/**
			 * @inheritdoc BasePageV2#updateButtonsVisibility
			 * @override
			 */
			updateButtonsVisibility: function() {
				this.set("ShowDiscardButton", false);
				this.set("ShowSaveButton", false);
			},

			/**
			 * Create detail related filters.
			 * @private
			 */
			entityDetailFilter: function() {
				var filterGroup = Terrasoft.createFilterGroup();
				filterGroup.add("ProcessFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysProcess", this.get("Id")));
				filterGroup.add("WorkspaceFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value));
				return filterGroup;
			},

			/**
			 * Get process status.
			 * @private
			 */
			onGetProcessStatus: function() {
				return this.get("Status");
			},

			/**
			 * @inheritdoc BasePageV2#init
			 * @override
			 */
			init: function() {
				this.sandbox.subscribe("GetProcessStatus", this.onGetProcessStatus, this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc BasePageV2#addSectionDesignerViewOptions
			 * @override
			 */
			addSectionDesignerViewOptions: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getSectionCode
			 * @override
			 */
			getSectionCode: function() {
				return "SysProcessLog";
			},

			/**
			 * Shows process schema designer by Id.
			 */
			showProcessDesigner: function() {
				const sysSchema = this.get("SysSchema");
				var id = sysSchema && sysSchema.value;
				Terrasoft.ProcessModuleUtilities.showProcessSchemaDesignerById(id);
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "ShowProcessDesignerButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ProcessDesignerButton"},
					"click": {"bindTo": "showProcessDesigner"}
				}
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"name": "GeneralInfoControlGroup",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
					"items": [],
					"controlConfig": {"collapsed": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoControlGroup",
				"propertyName": "items",
				"name": "GeneralInfoBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"bindTo": "Name",
					"layout": {"column": 0, "row": 0, "colSpan": 24},
					"controlConfig": {"enabled": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "Status",
				"values": {
					"bindTo": "Status",
					"layout": {"column": 0, "row": 1, "colSpan": 12},
					"controlConfig": {"enabled": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "Owner",
				"values": {
					"bindTo": "Owner",
					"layout": {"column": 12, "row": 1, "colSpan": 12},
					"controlConfig": {"enabled": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "StartDate",
				"values": {
					"bindTo": "StartDate",
					"layout": {"column": 0, "row": 2, "colSpan": 12},
					"controlConfig": {"enabled": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "CompleteDate",
				"values": {
					"bindTo": "CompleteDate",
					"layout": {"column": 12, "row": 2, "colSpan": 12},
					"controlConfig": {"enabled": false}
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoBlock",
				"propertyName": "items",
				"name": "HasTrace",
				"values": {
					"bindTo": "HasTraceData",
					"layout": {"column": 0, "row": 3, "colSpan": 12},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"name": "ProcessElementLog",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"name": "ProcessEntity",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


