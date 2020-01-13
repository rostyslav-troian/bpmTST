Terrasoft.configuration.Structures["SupervisorSingleWindowSectionV2"] = {innerHierarchyStack: ["SupervisorSingleWindowSectionV2"], structureParent: "BaseSectionV2"};
define('SupervisorSingleWindowSectionV2Structure', ['SupervisorSingleWindowSectionV2Resources'], function(resources) {return {schemaUId:'6ec4507a-a9ab-4e41-a056-056bb0d753f7',schemaCaption: "SupervisorSingleWindowSectionV2", parentSchemaName: "BaseDataView", schemaName:'SupervisorSingleWindowSectionV2',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SupervisorSingleWindowSectionV2", ["ProcessModuleUtilities", "ModuleUtils", "QueueClientNotificationUtilities"],
		function(ProcessModuleUtilities, moduleUtils, QueueClientNotificationUtilities) {
			return {
				entitySchemaName: "Queue",
				queueItemEntitySchemaName: "QueueItem",
				attributes: {
					/**
					 * Queues module name.
					 * @type {String}
					 */
					"QueuesModuleName": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": "QueueItemSection"
					},

					/**
					 * Queues view name.
					 * @type {String}
					 */
					"QueuesDataViewName": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": "QueuesDataView"
					}
				},
				methods: {

					//region Methods: Private

					/**
					 * ######### ########## ######## ########.
					 * @private
					 */
					openQueueObjectLookupPage: function() {
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "VwSysSchemaInfo",
							rowCount: 1
						});
						select.isDistinct = true;
						select.addColumn("UId");
						var filterCollection = Terrasoft.createFilterGroup();
						filterCollection.add("SysWorkspaceFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "SysWorkspace", Terrasoft.SysValue.CURRENT_WORKSPACE.value));
						filterCollection.add("ExtendParentFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "ExtendParent", false));
						filterCollection.add("NameFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Name", "QueueObjectLookupPage"));
						select.filters.add(filterCollection);
						select.getEntityCollection(function(result) {
							if (!result.success) {
								return;
							}
							var collection = result.collection;
							if (collection.getCount() === 0) {
								return;
							}
							var item = collection.getByIndex(0);
							window.open("../ViewPage.aspx?Id=" + item.get("UId") + "&editMode=true");
						}, this);
					},

					/**
					 * ######### ####### ########## ######## ####### ####.
					 * @private
					 */
					updateQueues: function() {
						var maskId = Terrasoft.Mask.show();
						ProcessModuleUtilities.runProcess("QueuesUpdateProcess", null, function() {
							Terrasoft.Mask.hide(maskId);
						}, this);
					},

					//endregion

					//region Methods: Protected

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							QueueClientNotificationUtilities.subscribeForQueuesNotifications();
							callback.call(scope);
						}, this]);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultGridDataViewCaption
					 * @overridden
					 */
					getDefaultGridDataViewCaption: function() {
						return this.get("Resources.Strings.GridDataViewCaption");
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
					 * @overridden
					 */
					getSectionActions: function() {
						var actionMenuItems = this.callParent(arguments);
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Click": {"bindTo": "openQueueObjectLookupPage"},
							"Caption": {"bindTo": "Resources.Strings.OpenQueueObjectLookupPageActionCaption"}
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							"Click": {"bindTo": "updateQueues"},
							"Caption": {"bindTo": "Resources.Strings.UpdateQueuesActionCaption"}
						}));
						return actionMenuItems;
					},

					/**
					 * @inheritdoc BaseSectionV2#getDefaultDataViews
					 * @overridden
					 */
					getDefaultDataViews: function() {
						var gridDataViews = this.callParent();
						var defaultGridDataViewCaption = this.getDefaultGridDataViewCaption();
						var queueDataViewCaption = this.get("Resources.Strings.QueueDataViewCaption");
						gridDataViews.QueuesDataView = {
							"index": 0,
							"name": this.get("QueuesDataViewName"),
							"icon": this.getDefaultGridDataViewIcon(),
							"hint": queueDataViewCaption,
							"markerValue": queueDataViewCaption
						};
						Ext.apply(gridDataViews.GridDataView, {
							"index": 1,
							"active": true,
							"icon": this.get("Resources.Images.QueuesSettingsDataViewIcon"),
							"hint": defaultGridDataViewCaption,
							"markerValue": defaultGridDataViewCaption
						});
						Ext.apply(gridDataViews.AnalyticsDataView, {
							"index": 2
						});
						return gridDataViews;
					},

					/**
					 * @inheritdoc BaseSectionV2#changeDataView
					 * @overridden
					 */
					changeDataView: function(view) {
						if (view.tag !== this.get("GridDataViewName")) {
							this.loadQueuesDataView(view.tag);
						} else {
							this.callParent(arguments);
						}
					},

					/**
					 * @inheritdoc Terrasoft.BaseSectionV2#initContextHelp
					 * @overridden
					 */
					initContextHelp: function() {
						this.set("ContextHelpId", 1073);
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#getModuleStructure
					 * @overridden
					 */
					getModuleStructure: function(moduleName) {
						return moduleUtils.getModuleStructureByName(moduleName || this.queueItemEntitySchemaName);
					},

					/**
					 * Gets queue active view name.
					 * @param {String} viewName View name.
					 * @return {String} Active view name.
					 */
					getQueueViewName: function(viewName) {
						return viewName === this.get("QueuesDataViewName")
								? this.get("GridDataViewName")
								: this.get("AnalyticsDataViewName");
					},

					/**
					 * Loads queues settings view.
					 * @protected
					 * @param {String} viewName View name.
					 */
					loadQueuesDataView: function(viewName) {
						var queuesViewName = this.getQueueViewName(viewName);
						var queuesModuleName = this.get("QueuesModuleName");
						this.sandbox.publish("PushHistoryState", {
							hash: this.Terrasoft.combinePath("SectionModuleV2", queuesModuleName),
							stateObj: {
								module: "SectionModuleV2",
								schemas: [queuesModuleName],
								ActiveViewName: queuesViewName
							}
						});
					}

					//endregion

				},
				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		});


