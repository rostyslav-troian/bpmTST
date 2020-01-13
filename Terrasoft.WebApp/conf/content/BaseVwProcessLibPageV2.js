Terrasoft.configuration.Structures["BaseVwProcessLibPageV2"] = {innerHierarchyStack: ["BaseVwProcessLibPageV2"], structureParent: "BaseModulePageV2"};
define('BaseVwProcessLibPageV2Structure', ['BaseVwProcessLibPageV2Resources'], function(resources) {return {schemaUId:'90bd89d6-a40d-400a-bcbc-2e51ded3d928',schemaCaption: "Base edit schema - \"Process library\" section page", parentSchemaName: "BaseModulePageV2", schemaName:'BaseVwProcessLibPageV2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseModulePageV2
 */
define("BaseVwProcessLibPageV2", ["BaseVwProcessLibPageV2Resources", "GeneralDetails", "InformationButtonResources",
	"css!BaseVwProcessLibPageV2CSS"
], function(resources, GeneralDetails, InformationButtonResources) {
	return {
		entitySchemaName: "VwProcessLib",
		rules: {},
		userCode: {},
		details: /**SCHEMA_DETAILS*/{
			Files: {
				schemaName: "FileDetailV2",
				entitySchemaName: "VwProcessLibFile",
				filter: {
					masterColumn: "Id",
					detailColumn: "VwProcessLibFileId"
				}
			},
			ProcessInModules: {
				schemaName: "ProcessInModulesDetailV2",
				filter: {
					masterColumn: "VersionParentUId",
					detailColumn: "SysSchemaUId"
				}
			},
			ProcessInDetails: {
				schemaName: "ProcessInDetailsDetailV2",
				filter: {
					masterColumn: "VersionParentUId",
					detailColumn: "SysSchemaUId"
				}
			},
			SubProcessInProcess: {
				captionName: "SubProcessInProcessDetailCaption",
				profileKey: "VwProcessLibPageV2SubProcessInProcessDetail",
				schemaName: "BaseProcessSettingDetailV2",
				entitySchemaName: "VwSubProcessInProcess",
				filter: {
					masterColumn: "VersionParentUId",
					detailColumn: "ParentSubProcess"
				}
			},
			SubProcesses: {
				captionName: "SubProcessDetailCaption",
				profileKey: "VwProcessLibPageV2SubProcessDetail",
				schemaName: "SubProcessDetail",
				entitySchemaName: "VwSubProcessInProcess",
				filter: {
					masterColumn: "UId",
					detailColumn: "HostProcess"
				}
			},
			ProcessTimerScheduleDetail: {
				captionName: "TimerScheduleDetailCaption",
				profileKey: "VwProcessLibPageV2ProcessTimerScheduleDetailV2",
				schemaName: "ProcessTimerScheduleDetail"
			},
			ProcessStartEventDetail: {
				captionName: "ProcessStartEventCaption",
				profileKey: "VwProcessLibPageV2ProcessStartEventDetail",
				schemaName: "ProcessStartEventDetail",
				entitySchemaName: "VwProcessStartEvent",
				filter: {
					masterColumn: "UId",
					detailColumn: "ProcessUId"
				}
			},
			ProcessLog: {
				schemaName: "ProcessLogDetail",
				entitySchemaName: "VwSysProcessLog",
				filterMethod: "processLogDetailFilter"
			}
		}/**SCHEMA_DETAILS*/,
		messages: {
			/**
			 * @message ResetStartProcessMenuItems
			 * The message that you need to update the menu items of the button "Run the process"
			 */
			"ResetStartProcessMenuItems": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"LoadedItemsStartProcessMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * The name of the operation access to which the user should have access to use the page.
			 */
			SecurityOperationName: {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanManageProcessDesign"
			},
			/**
			 * Tag for events on the process.
			 */
			ProcessActionTag: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ""
			},
			/**
			 * Process tracing active.
			 */
			IsTracing: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				onChange: "onIsTracingChanged",
				value: false
			},
			/**
			 * Process tracing info active.
			 */
			IsTracingInfoVisible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						this.set("IsSubscribed", false);
						Ext.callback(callback, scope);
					}, this
				]);
				this.sandbox.subscribe("LoadedItemsStartProcessMenu", function() {
					Terrasoft.ProcessModuleUtilities.hideBodyMask();
				});
				this.Ext.defer(this._warmUpProcessSchema, 0, this);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			initCardActionHandler: function() {
				this.callParent(arguments);
				this.on("change:Enabled", function(model, value) {
					this.sandbox.publish("CardChanged", {
						key: "Enabled",
						value: value
					}, [this.sandbox.id]);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#getEntitySchemaQuery
			 * @override
			 */
			getEntitySchemaQuery: function() {
				var esq = this.callParent(arguments);
				var filterName = "WorkspaceFilter";
				var filters = esq.filters;
				if (filters.contains(filterName)) {
					return esq;
				}
				filters.add(filterName, Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace",
					Terrasoft.SysValue.CURRENT_WORKSPACE.value));
				var enablePrimaryColumnFilter = esq.enablePrimaryColumnFilter;
				esq.enablePrimaryColumnFilter = function() {
					enablePrimaryColumnFilter.apply(esq, arguments);
					var workspaceFilter = esq.filters.get(filterName);
					workspaceFilter.isEnabled = true;
				};
				return esq;
			},

			/**
			 * Returns details visible (toggling).
			 * @return {Boolean}
			 */
			getProcessInDetailsVisible: function() {
				var visible = false;
				if (Terrasoft.ProcessEntryPointUtilities.getCanRunProcessFromSection()) {
					visible = true;
				}
				return visible;
			},

			/**
			 * @inheritdoc BasePageV2#addSectionDesignerViewOptions
			 * @override
			 */
			addSectionDesignerViewOptions: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @override
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": this.get("Resources.Strings.RunProcessActionCaption"),
					"Tag": "executeProcess",
					"Visible": {"bindTo": "Enabled"}
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.ProcessPropertiesDisableProcess"},
					"Visible": {"bindTo": "Enabled"},
					"Tag": "onDisableProcessPageClick"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.ProcessPropertiesEnableProcess"},
					"Visible": {
						"bindTo": "Enabled",
						"bindConfig": {
							"converter": function(value) {
								return value === false;
							}
						}
					},
					"Tag": "onEnableProcessPageClick"
				}));
				return actionMenuItems;
			},

			/**
			 * Deactivates the process.
			 */
			onDisableProcessPageClick: function() {
				var sysSchemaId = this.get("SysSchemaId");
				Terrasoft.ProcessModuleUtilities.disableProcess(sysSchemaId, this, this.onEnabledUpdated);
			},

			/**
			 * Activate process.
			 */
			onEnableProcessPageClick: function() {
				var sysSchemaId = this.get("SysSchemaId");
				Terrasoft.ProcessModuleUtilities.enableProcess(sysSchemaId, this, this.onEnabledUpdated);
			},

			/**
			 * Updates the card after performing an operation to activate / deactivate the process.
			 */
			onEnabledUpdated: function() {
				this.reloadEntity();
				this.sendSaveCardModuleResponse(true);
			},

			/**
			 * Opens the process designer.
			 * @protected
			 */
			onOpenProcessDesignerButtonClick: function() {
				var schemaUId = this.get(this.primaryColumnName);
				Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner(schemaUId);
				this.set("ProcessActionTag", "OpenProcess");
				this.sendGoogleTagManagerData();
			},

			/**
			 * Runs the business process for execution.
			 * @private
			 */
			executeProcess: function() {
				var processId = this.get(this.primaryColumnName);
				Terrasoft.ProcessModuleUtilities.executeProcess({"sysProcessId": processId});
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function(callback, scope) {
				this.callParent(arguments);
				if (this.isAddMode() || this.isCopyMode()) {
					this.set("Enabled", true);
					this.set("UId", this.get(this.primaryColumnName));
				}
				this._initTracingAttribute(callback, scope);
			},

			/**
			 * @private
			 */
			_warmUpProcessSchema: function() {
				Terrasoft.chain(
					function(next) {
						Terrasoft.ProcessFlowElementSchemaManager.initialize(next, this);
					},
					function(next) {
						Terrasoft.ProcessSchemaManager.initialize(next, this);
					},
					function() {
						Terrasoft.ProcessSchemaManager.forceGetInstanceByUId(
							this.get("PrimaryColumnValue"),
							Terrasoft.emptyFn,
							this
						);
					},
					this
				);
			},

			/**
			 * @param callback
			 * @param scope
			 * @private
			 */
			_initTracingAttribute: function(callback, scope) {
				Terrasoft.SysUserPropertyHelper.getProperty({
					schemaId: this.get("VersionParentId"),
					propertyName: "IsTracing",
					managerName: "ProcessSchemaManager"
				}, function(response) {
					if (response.success) {
						this.set("IsTracing", Boolean(JSON.parse(response.value || false)));
					} else {
						var message = this.get("Resources.Strings.TracingInitException");
						Terrasoft.showInformation(message);
					}
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Process the select event of the Publish process menu item.
			 * @private
			 */
			publish: function() {
				if (Terrasoft.ProcessModuleUtilities.getIsDemoMode(this)) {
					return;
				}
				Terrasoft.ProcessModuleUtilities.publish();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#onEntityInitialized
			 * @override
			 */
			getSubscribeButtonVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.Terrasoft.BasePrintFormViewModel#initCardPrintForms
			 * @override
			 */
			initCardPrintForms: function(callback, scope) {
				var printMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.set(this.moduleCardPrintFormsCollectionName, printMenuItems);
				if (callback) {
					callback.call(scope || this);
				}
			},

			/**
			 * @param callback
			 * @param scope
			 * @private
			 */
			_saveIsTracing: function(callback, scope) {
				if (this.isAttributeChanged("IsTracing")) {
					Terrasoft.SysUserPropertyHelper.setProperty({
						schemaId: this.get("VersionParentId"),
						propertyName: "IsTracing",
						propertyValue: this.get("IsTracing"),
						managerName: "ProcessSchemaManager"
					}, function(response) {
						if (!response.success) {
							var message = this.get("Resources.Strings.TracingSaveException");
							Terrasoft.showInformation(message);
						}
						Ext.callback(callback, scope);
					}, this);
				} else {
					Ext.callback(callback, scope);
				}
			},

			/**
			 * @param callback
			 * @param scope
			 * @private
			 */
			_saveRunButtonProcessList: function(callback, scope) {
				this.updateRunButtonProcessList(function(response) {
					this.sendSaveCardModuleResponse(response.success);
					if (response && response.success) {
						this.sandbox.publish("ResetStartProcessMenuItems");
					} else {
						Terrasoft.MaskHelper.HideBodyMask();
					}
					this.updateButtonsVisibility(false, {force: true});
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#save
			 * @override
			 */
			save: function(callback, scope) {
				Terrasoft.MaskHelper.ShowBodyMask();
				Terrasoft.chain(
					this._saveIsTracing,
					this._saveRunButtonProcessList,
					function() {
						Ext.callback(callback, scope);
					}, this
				);
			},

			/**
			 * Updates the information what processes to display in the menu items of the button "Start the process"
			 * @private
			 */
			updateRunButtonProcessList: function(callback, scope) {
				var entitySchemaName = "RunButtonProcessList";
				var deleteQuery = Ext.create("Terrasoft.DeleteQuery", {
					rootSchemaName: entitySchemaName
				});
				deleteQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysSchemaUId", this.get("UId")));
				deleteQuery.execute(function(response) {
					if (this.get("AddToRunButton")) {
						var insert = Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: entitySchemaName
						});
						insert.setParameterValue("Id", Terrasoft.utils.generateGUID(),
							Terrasoft.DataValueType.GUID);
						insert.setParameterValue("SysSchemaUId", this.get("UId"), Terrasoft.DataValueType.GUID);
						insert.execute(callback, this);
						return;
					}
					callback.call(scope, response);
				}, this);
			},

			/**
			 * On tracing changed.
			 * @param {Object} model Model.
			 * @param {Boolean} isTracing New value.
			 */
			onIsTracingChanged: function(model, isTracing) {
				this.set("IsTracingInfoVisible", isTracing);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData.
			 * @override
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				var processActionTag = this.get("ProcessActionTag");
				if (!this.Ext.isEmpty(processActionTag)) {
					this.Ext.apply(data, {
						action: processActionTag
					});
				}
				return data;
			},

			/**
			 * Creates filters for processLog detail.
			 */
			processLogDetailFilter: function() {
				return this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"[VwProcessLib:SysSchemaId:SysSchemaId].VersionParentUId", this.get("VersionParentUId"));
			},

			/**
			 * Returns is tracing info button image config.
			 * @returns {Object} Image config.
			 */
			getTracingInfoButtonImageConfig: function() {
				var imageName = this.get("IsTracing") ? "WarningIcon" : "DefaultIcon";
				return InformationButtonResources.localizableImages[imageName];
			},

			/**
			 * Returns is tracing info button tip style.
			 * @returns {Terrasoft.TipStyle} Info button tip style.
			 */
			getTracingInfoTipStyle: function() {
				return this.get("IsTracing") ? Terrasoft.TipStyle.RED : Terrasoft.TipStyle.GREEN;
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Caption",
				"values": {
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Caption",
					"caption": {
						"bindTo": "Resources.Strings.CaptionCaption"
					},
					"textSize": "Default",
					"contentType": 1,
					"isRequired": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Name",
				"values": {
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "Name",
					"caption": {
						"bindTo": "Resources.Strings.NameCaption"
					},
					"textSize": "Default",
					"contentType": 1,
					"isRequired": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Enabled",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 12
					},
					"bindTo": "Enabled",
					"caption": {
						"bindTo": "Resources.Strings.EnabledCaption"
					},
					"textSize": "Default"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "IsTracingContainer",
				"parentName": "Header",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"column": 12,
						"row": 2,
						"colSpan": 6,
						"rowSpan": 1
					},
					"classes": {
						"wrapClassName": ["tracing-process-property-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "IsTracing",
				"parentName": "IsTracingContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "IsTracing",
					"caption": {"bindTo": "Resources.Strings.IsTracingCaption"},
					"labelConfig": {"markerValue": "IsTracingLabel"},
					"textSize": "Default"
				}
			},
			{
				"operation": "insert",
				"name": "IsTracingInfo",
				"parentName": "IsTracingContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"behaviour": {"displayEvent": Terrasoft.TipDisplayEvent.CLICK},
					"visible": {"bindTo": "IsTracingInfoVisible"},
					"content": {"bindTo": "Resources.Strings.IsTracingInfo"},
					"style": {"bindTo": "getTracingInfoTipStyle"},
					"controlConfig": {
						"imageConfig": {"bindTo": "getTracingInfoButtonImageConfig"},
						"classes": {
							"wrapperClass": ["tracing-info-button"]
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SysPackage",
				"values": {
					"layout": {
						"column": 12,
						"row": 0,
						"colSpan": 12,
						"rowSpan": 1
					},
					"bindTo": "SysPackage",
					"caption": {
						"bindTo": "Resources.Strings.SysPackageCaption"
					},
					"textSize": "Default",
					"contentType": 3,
					"isRequired": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ModulesTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "Resources.Strings.RunningProcessesTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SubProcessesTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.SubProcessTabCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ProcessLogTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ProcessLogTabCaption"
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "ProcessLogTab",
				"propertyName": "items",
				"name": "ProcessLog",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "SubProcessesTab",
				"propertyName": "items",
				"name": "SubProcesses",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "insert",
				"parentName": "ModulesTab",
				"propertyName": "items",
				"name": "ProcessInModules",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "ModulesTab",
				"propertyName": "items",
				"name": "ProcessInDetails",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL,
					"visible": {"bindTo": "getProcessInDetailsVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ModulesTab",
				"propertyName": "items",
				"name": "SubProcessInProcess",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "ModulesTab",
				"propertyName": "items",
				"name": "ProcessTimerScheduleDetail",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "ModulesTab",
				"propertyName": "items",
				"name": "ProcessStartEventDetail",
				"values": {
					"itemType": Terrasoft.ViewItemType.DETAIL
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "OpenProcessDesignerButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.OpenInDesignerButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "onOpenProcessDesignerButtonClick"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

