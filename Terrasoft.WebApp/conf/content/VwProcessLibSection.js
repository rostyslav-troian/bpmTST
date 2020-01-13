Terrasoft.configuration.Structures["VwProcessLibSection"] = {innerHierarchyStack: ["VwProcessLibSection"], structureParent: "BaseProcessLibSection"};
define('VwProcessLibSectionStructure', ['VwProcessLibSectionResources'], function(resources) {return {schemaUId:'42f6fabe-fd25-4b89-a738-70a7ef2abe9f',schemaCaption: "\"Process library\" section page schema", parentSchemaName: "BaseProcessLibSection", schemaName:'VwProcessLibSection',parentSchemaUId:'994e7d92-df2f-48ef-a38f-c66cac5c44c9',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Process library section.
 * Parent: BaseProcessLibSection
 */
define("VwProcessLibSection", ["ProcessLibraryConstants", "ConfigurationEnums",
	"VwProcessLibSectionResources", "VwProcessLibSectionGridRowViewModel", "ProcessLibraryFolderManagerViewModel",
	"FolderManagerViewConfigGenerator", "ProcessModuleUtilities"
], function(ProcessLibraryConstants, ConfigurationEnums) {
	return {
		entitySchemaName: "VwProcessLib",
		properties: {
			/**
			 * Defines folder manager view model class name.
			 */
			folderManagerViewModelClassName: "Terrasoft.ProcessLibraryFolderManagerViewModel",
			/**
			 * Defines folder manager view config generator module name.
			 */
			folderManagerViewConfigGenerator: "FolderManagerViewConfigGenerator",
			/**
			 * Defines folder manager view model config generator module name.
			 */
			folderManagerViewModelConfigGenerator: "FolderManagerViewModelConfigGenerator",
			/**
			 * Defines folder manager module name.
			 */
			folderManagerModuleName: "FolderManagerModule"
		},
		messages: {
			/**
			 * @message ResetStartProcessMenuItems
			 * The message that needs to be updated items "Start process" menu button.
			 */
			"ResetStartProcessMenuItems": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message LoadedItemsStartProcessMenu
			 * Subscribed on loading event of the menu items.
			 */
			"LoadedItemsStartProcessMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message ActiveProcessSchemaVersionChanged
			 * Subscribed on modification event of the active version schema.
			 * @param {Object} Change data object.
			 */
			"ActiveProcessSchemaVersionChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#ContextHelpId
			 * @override
			 */
			"ContextHelpId": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"value": 7000
			},
			/**
			 * The name of the operation to which user has access.
			 */
			"SecurityOperationName": {
				dataValueType: Terrasoft.DataValueType.STRING,
				value: "CanManageProcessDesign"
			},
			/**
			 * Tag for events on the process.
			 */
			"ProcessActionTag": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: ""
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * @private
			 */
			reloadRecord: function(config, callback, scope) {
				var esq = this.getGridDataESQ();
				this.initQueryColumns(esq);
				esq.getEntity(config.newRecordId, function(response) {
					if (!response.success || !response.entity) {
						return;
					}
					var entity = response.entity;
					this.prepareResponseCollectionItem(entity);
					var gridData = this.getGridData();
					var currentItem = gridData.get(config.recordId);
					gridData.replace(currentItem, entity, config.newRecordId);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * @private
			 */
			findGridRow: function(id) {
				var gridData = this.getGridData();
				return gridData.find(id);
			},

			/**
			 * @private
			 */
			addCurrentWorkspaceFilter: function(filters) {
				filters.addIfNotExists("CurrentWorkspaceFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysWorkspace", Terrasoft.SysValue.CURRENT_WORKSPACE.value));
			},

			/**
			 * @private
			 */
			addIsActiveVersionFilter: function(filters) {
				filters.addIfNotExists("ActiveVersionFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IsActiveVersion", true));
			},

			/**
			 * @private
			 */
			getVersionSchemaRows: function(sysSchemaRow) {
				var parentId = sysSchemaRow.get("Parent").value || sysSchemaRow.get("SysSchemaId");
				var gridData = this.getGridData();
				var result = gridData.filterByFn(function(row) {
					var schemaParentId = row.get("Parent").value;
					var schemaId = row.get("SysSchemaId");
					return schemaParentId === parentId || schemaId === parentId;
				}, this);
				return result;
			},

			/**
			 * @private
			 */
			executeProcess: function() {
				var config = {
					confirmMessage: this.get("Resources.Strings.RunMiltiplyProcessesMessage"),
					confirmButton: this.get("Resources.Strings.RunMiltiplyProcessesButtonCaption"),
					resultMessage: this.get("Resources.Strings.RunMiltiplyProcessesMessageResult")
				};
				this.handleSelectedItems(config, function(row, nextCallback, scope) {
					var enabled = row.get("Enabled");
					if (enabled) {
						var schemaUId = row.get("SysSchemaUId");
						Terrasoft.ProcessModuleUtilities.executeProcess({sysProcessId: schemaUId});
						nextCallback.call(scope, 1);
					} else {
						nextCallback.call(scope, 0);
					}
				}, this);
			},

			/**
			 * @private
			 */
			publish: function() {
				if (Terrasoft.ProcessModuleUtilities.getIsDemoMode(this)) {
					return;
				}
				Terrasoft.ProcessModuleUtilities.publish();
			},

			/**
			 * @private
			 */
			openProcessProperties: function(id) {
				var gridRow = this.findGridRow(id);
				gridRow.loadEntity(id, function() {
					var typeColumnValue = this.getTypeColumnValue(gridRow);
					var currentSchemaName = this.getEditPageSchemaName(typeColumnValue);
					var operation = ConfigurationEnums.CardStateV2.EDIT;
					this.openCard(currentSchemaName, operation, id, true);
				}, this);
			},

			/**
			 * @private
			 */
			sendGoogleOpenProcessTag: function() {
				this.set("ProcessActionTag", "OpenProcess");
				this.sendGoogleTagManagerData();
			},

			/**
			 * @private
			 */
			showConfirmationIfHasForeignLock: function(schemaUId, successCallback, scope) {
				Terrasoft.ProcessModuleUtilities.GetHasNoForeignLock(schemaUId, function(success, response) {
					response = Ext.decode(Ext.decode(response.responseText));
					var forbiddenLevel = Terrasoft.ModificationForbidLevel;
					if (response.success || response.modificationForbidLevel === forbiddenLevel.PACKAGE) {
						successCallback.call(scope);
						return;
					}
					this.showConfirmationDialog(response.message, function(code) {
						if (code === Terrasoft.MessageBoxButtons.YES.returnCode) {
							successCallback.call(scope);
						}
					}, [Terrasoft.MessageBoxButtons.YES, Terrasoft.MessageBoxButtons.NO]);
				}, this);
			},

			/**
			 * @private
			 */
			openProcessLogButtonClick: function() {
				this.sandbox.publish("PushHistoryState", {hash: "SectionModuleV2/SysProcessLogSectionV2"});
			},

			/**
			 * @private
			 */
			copyProcess: function(id) {
				var row = this.findGridRow(id);
				var rowValues = row.values;
				var config = {
					sourceUId: rowValues.Id,
					sourceName: rowValues.Name,
					sourceCaption: rowValues.Caption
				};
				Terrasoft.chain(
					function(next) {
						Terrasoft.ProcessModuleUtilities.getCopyProcessConfig(config, next, this);
					},
					function(next, copyProcessConfig) {
						Terrasoft.ProcessModuleUtilities.copyProcess(copyProcessConfig, next, this);
					},
					function(next, schemaUId) {
						Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner(schemaUId);
					}, this
				);
			},

			/**
			 * @private
			 */
			_showDeleteConfirmationMessage: function(runningCount, schemaCaption, callback, scope) {
				let message;
				if (runningCount > 0) {
					message = this.get("Resources.Strings.DeleteRunningProcessConfirmationMessage");
					message = Ext.String.format(message, runningCount);
				} else {
					message = this.get("Resources.Strings.DeleteProcessConfirmationMessage");
				}
				var buttons = ["yes", "no"];
				if (this.getSelectedItems().length > 1) {
					if (schemaCaption) {
						message = this.get("Resources.Strings.ProcessCaption") + ": " + schemaCaption + "\n\n" + message;
					}
					var yesAllButtonCaption = this.get("Resources.Strings.YesForAllButton");
					const yesAllButton = Terrasoft.getButtonConfig("yesAll", yesAllButtonCaption);
					buttons.splice(1, 0, yesAllButton);
				}
				Terrasoft.showConfirmation(message, function(code) {
					this.showDeleteConfirm = code !== "yesAll";
					callback.call(scope, code === "yes" || code === "yesAll");
				}, buttons, this, {defaultButton: 2});
			},

			/**
			 * @private
			 */
			deleteProcess: function() {
				var config = {
					resultMessage: this.get("Resources.Strings.DeleteMiltiplyProcessesMessageResult")
				};
				this.showDeleteConfirm = true;
				this.handleSelectedItems(config, function(row, nextCallback, scope) {
					const schemaUId = row.get("SysSchemaUId");
					const schemaId = row.get("SysSchemaId");
					const schemaCaption = row.get("Caption");
					let runningCount = 0;
					Terrasoft.chain(
						function(next) {
							Terrasoft.ProcessModuleUtilities.getRunningProcessCountBySysSchemaId(schemaId, next);
						},
						function(next, success, count) {
							runningCount = count;
							if (this.showDeleteConfirm) {
								this._showDeleteConfirmationMessage(count, schemaCaption, next, this);
							} else {
								next(true);
							}
						},
						function(next, confirmResult) {
							if (confirmResult) {
								if (runningCount) {
									Terrasoft.ProcessModuleUtilities.cancelExecution(schemaId, next, this);
								} else {
									next();
								}
							} else {
								nextCallback.call(scope, 0);
							}
						},
						function(next) {
							Terrasoft.ProcessModuleUtilities.deleteProcess(schemaUId, next, this);
						},
						function(next, success, response) {
							if (success) {
								nextCallback.call(scope, 1);
							} else {
								Terrasoft.showInformation(response.errorInfo, function() {
									nextCallback.call(scope, 0);
								}, scope);
							}
						}, this
					);
				}, this, function() {
					this.reloadGridData();
				});
			},

			/**
			 * @private
			 */
			_showActionConfirmMessage: function(config, count, callback, scope) {
				const confirmMessage = config.confirmMessage;
				const confirmButton = config.confirmButton;
				const maxCountConfirm = config.maxCountConfirm || 5;
				if (confirmMessage && confirmButton && count > maxCountConfirm) {
					const message = Ext.String.format(confirmMessage, count);
					const yesButton = Terrasoft.getButtonConfig("yes", confirmButton);
					Terrasoft.showConfirmation(message, function(returnCode) {
						if (returnCode === "yes") {
							callback.call(scope);
						}
					}, [yesButton, "cancel"], this, {defaultButton: 1});
				} else {
					callback.call(scope);
				}
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.set("IsSubscribed", false);
					this.set("UseTagModule", false);
					this.set("UseStaticFolders", true);
					this.set("TagButtonVisible", false);
					Ext.callback(callback, scope || this);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("LoadedItemsStartProcessMenu", function() {
					Terrasoft.MaskHelper.hideBodyMask();
				});
				this.sandbox.subscribe("ActiveProcessSchemaVersionChanged", this.onActiveProcessSchemaVersionChanged, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseProcessLibSection#getFilters
			 * @override
			 */
			getFilters: function() {
				var filters = this.callParent(arguments);
				this.addCurrentWorkspaceFilter(filters);
				this.addIsActiveVersionFilter(filters);
				return filters;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#addSectionDesignerViewOptions
			 * @override
			 */
			addSectionDesignerViewOptions: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#getGridDataColumns
			 * @override
			 */
			getGridDataColumns: function() {
				return Ext.apply(this.callParent(arguments), {
					"TagProperty": {path: "TagProperty"},
					"SysSchemaId": {path: "SysSchemaId"},
					"Enabled": {path: "Enabled"},
					"Name": {path: "Name"},
					"Parent": {path: "Parent"}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getGridRowViewModelClassName
			 * @override
			 */
			getGridRowViewModelClassName: function() {
				return "Terrasoft.VwProcessLibSectionGridRowViewModel";
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#openCard
			 * @override
			 */
			openCard: function(schemaName, operation, schemaUId, callParentFunction) {
				if ((operation !== ConfigurationEnums.CardStateV2.EDIT) || callParentFunction) {
					this.callParent(arguments);
					return;
				}
				var activeRow = this.findGridRow(schemaUId);
				if (!activeRow) {
					this.callParent(arguments);
					return;
				}
				var isNotSeparateMode = !this.get("IsCardVisible");
				var typeColumnValue = this.getTypeColumnValue(activeRow);
				if (isNotSeparateMode &&
					typeColumnValue === ProcessLibraryConstants.VwProcessLib.Type.BusinessProcess) {
					this.showConfirmationIfHasForeignLock(schemaUId, function() {
						Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner(schemaUId);
						this.sendGoogleOpenProcessTag();
					}, this);
					return;
				}
				activeRow.loadEntity(schemaUId, function() {
					var currentSchemaName = this.getEditPageSchemaName(typeColumnValue);
					this.openCard(currentSchemaName, operation, schemaUId, true);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#onActiveRowAction
			 * @override
			 */
			onActiveRowAction: function(buttonTag, id) {
				switch (buttonTag) {
					case "executeProcess":
						Terrasoft.ProcessModuleUtilities.executeProcess({"sysProcessId": id});
						break;
					case "openProcessProperties":
						this.openProcessProperties(id);
						break;
					case "showProcessInOldSchemaDesigner":
						this.showProcessInOldSchemaDesigner(id);
						break;
					case "copyProcess":
						this.copyProcess(id);
						break;
					case "deleteProcess":
						this.deleteProcess();
						break;
					case "enableProcess":
						this.onEnableProcessClick();
						break;
					case "disableProcess":
						this.onDisableProcessClick();
						break;
					default:
						this.callParent(arguments);
						break;
				}
			},

			/**
			 * @inheritdoc BaseSectionV2#onCardModuleResponse
			 * @override
			 */
			onCardModuleResponse: function(response) {
				this.set("IsCardInChain", response.isInChain);
				this.loadGridDataRecord(response.primaryColumnValue);
				return true;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onActiveRowChange
			 * @override
			 */
			onActiveRowChange: function() {
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
			 * @override
			 */
			getDefaultDataViews: function() {
				var caption = this.getDefaultGridDataViewCaption();
				var icon = this.getDefaultGridDataViewIcon();
				return {
					"GridDataView": {
						name: "GridDataView",
						active: true,
						caption: caption,
						icon: icon
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#addRecord
			 * @override
			 */
			addRecord: function() {
				Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner();
				this.sendGoogleOpenProcessTag();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
			 * @override
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				var processActionTag = this.get("ProcessActionTag");
				if (!Ext.isEmpty(processActionTag)) {
					Ext.apply(data, {action: processActionTag});
				}
				return data;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
			 * @override
			 */
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.each(function(item) {
					var deleteButtonCaption = "Resources.Strings.DeleteRecordButtonCaption";
					if (item.values.Caption && item.values.Caption.bindTo === deleteButtonCaption) {
						item.values.Visible = false;
						return false;
					}
				}, this);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {bindTo: "Resources.Strings.RunProcessButtonCaption"},
					Tag: "executeProcess",
					Visible: {bindTo: "ExecuteProcessVisible"},
					Click: {bindTo: "executeProcess"},
					IsEnabledForSelectedAll: true
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {bindTo: "Resources.Strings.ProcessPropertiesDisableProcess"},
					Visible: {bindTo: "DisableProcessVisible"},
					Click: {bindTo: "onDisableProcessClick"},
					IsEnabledForSelectedAll: true
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					Caption: {bindTo: "Resources.Strings.ProcessPropertiesEnableProcess"},
					Visible: {bindTo: "EnableProcessVisible"},
					Click: {bindTo: "onEnableProcessClick"},
					IsEnabledForSelectedAll: true
				}));
				if (Terrasoft.isDebug) {
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator"
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {bindTo: "Resources.Strings.DeleteProcessButtonCaption"},
						Visible: {bindTo: "ExecuteProcessVisible"},
						Click: {bindTo: "deleteProcess"},
						IsEnabledForSelectedAll: true
					}));
				}
				return actionMenuItems;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#prepareActionsButtonMenuItems
			 * @override
			 */
			prepareActionsButtonMenuItems: function() {
				var rows = this.getSelectedItems();
				var id = rows && rows.length === 1 && rows[0];
				var activeRow = id ? this.getGridDataRow(id) : null;
				if (activeRow) {
					var enabled = activeRow.get("Enabled");
					this.set("ExecuteProcessVisible", enabled);
					this.set("DisableProcessVisible", enabled);
					this.set("EnableProcessVisible", !enabled);
				} else {
					var visibleAll = rows && rows.length > 1;
					this.set("ExecuteProcessVisible", visibleAll);
					this.set("DisableProcessVisible", visibleAll);
					this.set("EnableProcessVisible", visibleAll);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#editRecord
			 * @override
			 */
			editRecord: function(schemaUId, isLinkClicked) {
				if (isLinkClicked) {
					this.set("ActiveRow", schemaUId);
					var event = window.event;
					var isShow5xDesignerHotkeyPressed = event && event.shiftKey;
					this.showConfirmationIfHasForeignLock(schemaUId, function() {
						if (isShow5xDesignerHotkeyPressed) {
							Terrasoft.ProcessModuleUtilities.show5xProcessSchemaDesigner(schemaUId);
						} else {
							Terrasoft.ProcessModuleUtilities.showProcessSchemaDesigner(schemaUId);
							this.sendGoogleOpenProcessTag();
						}
					}, this);
				} else {
					this.callParent(arguments);
				}
			},

			/**
			 * Handles modification event of the setting active process version.
			 * @protected
			 * @param {Object} versionChangeInfo Change data object.
			 */
			onActiveProcessSchemaVersionChanged: function(versionChangeInfo) {
				var newVersionId = versionChangeInfo.activeVersionId;
				var historyStateInfo = this.getHistoryStateInfo();
				var currentVersionId = historyStateInfo.primaryColumnValue;
				if (currentVersionId === newVersionId) {
					return;
				}
				var historyStateConfig = this.getCardHistoryStateConfig({
					schemaName: historyStateInfo.schemas[1],
					operation: historyStateInfo.operation,
					primaryColumnValue: newVersionId
				});
				historyStateConfig.silent = true;
				this.sandbox.publish("ReplaceHistoryState", historyStateConfig);
				this.reloadRecord({
					recordId: versionChangeInfo.previousVersionId,
					newRecordId: newVersionId
				});
			},

			/**
			 * Opens process in the old design processes.
			 * @protected
			 * @param {String} id The unique identifier of a record.
			 */
			showProcessInOldSchemaDesigner: function(id) {
				var isNewSchema = Terrasoft.isEmpty(id);
				if (isNewSchema) {
					Terrasoft.ProcessModuleUtilities.show5xProcessSchemaDesigner(id);
				} else {
					this.showConfirmationIfHasForeignLock(id, function() {
						Terrasoft.ProcessModuleUtilities.show5xProcessSchemaDesigner(id);
					}, this);
				}
			},

			/**
			 * Returns EntitySchemaQuery for select current selected items.
			 * @protected
			 * @return {Terrasoft.data.queries.EntitySchemaQuery}
			 */
			getSelectedItemsQuery: function() {
				var esq = new Terrasoft.EntitySchemaQuery(this.entitySchemaName);
				esq.addColumn("Id", "SysSchemaUId");
				esq.addColumn("SysSchemaId");
				esq.addColumn("Enabled");
				esq.addColumn("Caption");
				esq.addColumn("Parent");
				let records, filter;
				if (this.get("SelectAllMode")) {
					this.initQueryFilters(esq);
					records = this.getUnselectedItems();
					if (records.length) {
						filter = Terrasoft.createColumnInFilterWithParameters("Id", records);
						filter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
						esq.filters.add("recordFilter", filter);
					}
				} else {
					records = this.getSelectedItems();
					filter = Terrasoft.createColumnInFilterWithParameters("Id", records);
					esq.filters.add("recordFilter", filter);
				}
				return esq;
			},

			/**
			 * Execute iterator function for all selected items.
			 * Shows user confirmation when count more than 1 and config defined.
			 * @protected
			 * @param {Object} [config] Confirmation window config.
			 * @param {String} [config.confirmMessage] Confirm message.
			 * @param {String} [config.confirmButton] Confirm button caption.
			 * @param {String} [config.resultMessage] Result message.
			 * @param {Number} [config.maxCountConfirm] Max count to need user confirm. Default: 5.
			 * @param {Function} iterator Iteration function.
			 * @param {Object} iterator.item Process unique identifier.
			 * @param {Function} iterator.nextCallback Then callback of iteration function.
			 * @param {Function} iterator.scope The scope of iterator.next function and callback function.
			 * @param {Object} scope The scope of fn function.
			 * @param {Function} [callback] The callback of function.
			 */
			handleSelectedItems: function(config, iterator, scope, callback) {
				let selectedItems, count, maskId;
				let processedCount = 0;
				let iterationCount = 0;
				const uniqueMaskId = "handleSelectedItems";
				var esq = this.getSelectedItemsQuery();
				Terrasoft.chain(
					function(next) {
						esq.execute(next, this);
					},
					function(next, response) {
						selectedItems = response.collection.getItems();
						count = selectedItems && selectedItems.length;
						if (count) {
							this._showActionConfirmMessage(config, count, next, this);
						}
					},
					function(next) {
						maskId = Terrasoft.MaskHelper.showBodyMask({uniqueMaskId: uniqueMaskId, timeout: 0});
						Terrasoft.eachAsync(selectedItems, function(item, nextItem) {
							iterator.call(scope, item, function(result) {
								processedCount += result;
								iterationCount++;
								var caption = "Processed: " + iterationCount + "/" + count;
								Terrasoft.MaskHelper.updateBodyMaskCaption(maskId, caption);
								nextItem();
							}, this);
						}, next, this);
					},
					function() {
						Terrasoft.MaskHelper.hideBodyMask({uniqueMaskId: uniqueMaskId, maskId: maskId});
						if (count > 1) {
							const template = config.resultMessage || this.get("Resources.Strings.ProcessesItemsMessage");
							const message = Ext.String.format(template, processedCount);
							Terrasoft.showInformation(message);
						}
						if (processedCount) {
							Ext.callback(callback, scope);
						}
					}, this
				);
			},

			// endregion

			// region Methods: Public

			/**
			 * Deactivates selected processes.
			 */
			onDisableProcessClick: function() {
				var config = {
					confirmMessage: this.get("Resources.Strings.DeactivateMiltiplyProcessesMessage"),
					confirmButton: this.get("Resources.Strings.DeactivateMiltiplyProcessesButtonCaption"),
					resultMessage: this.get("Resources.Strings.DeactivateMiltiplyProcessesMessageResult")
				};
				this.handleSelectedItems(config, function(row, nextCallback, scope) {
					const enabled = row.get("Enabled");
					if (enabled) {
						const sysSchemaId = row.get("SysSchemaId");
						Terrasoft.ProcessModuleUtilities.disableProcess(sysSchemaId, this, function() {
							this.onProcessEnabledChanged(row, "DisableProcess");
							nextCallback.call(scope, 1);
						});
					} else {
						nextCallback.call(scope, 0);
					}
				}, this);
			},

			/**
			 * Activates selected processes.
			 */
			onEnableProcessClick: function() {
				var config = {
					resultMessage: this.get("Resources.Strings.ActivateMiltiplyProcessesMessageResult")
				};
				this.handleSelectedItems(config, function(row, nextCallback, scope) {
					var enabled = row.get("Enabled");
					if (enabled) {
						nextCallback.call(scope, 0);
					} else {
						var sysSchemaId = row.get("SysSchemaId");
						Terrasoft.ProcessModuleUtilities.enableProcess(sysSchemaId, this, function() {
							this.onProcessEnabledChanged(row, "EnableProcess");
							nextCallback.call(scope, 1);
						});
					}
				}, this);
			},

			/**
			 * Event after the change process state.
			 */
			onProcessEnabledChanged: function(activeRow, processActionTag) {
				activeRow = activeRow || this.getActiveRow();
				var versionRows = this.getVersionSchemaRows(activeRow);
				Terrasoft.each(versionRows, function(version) {
					version.loadEntity(version.get("Id"));
				}, this);
				if (processActionTag) {
					this.set("ProcessActionTag", processActionTag);
					this.sendGoogleTagManagerData();
				}
			}

			// endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "GridDataView",
				"values": {
					"classes": {
						"wrapClassName": ["process-lib-section-grid-data-view"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "DeleteRecordMenuItem",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "DataGridActiveRowDeleteAction",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "merge",
				"name": "DataGridActiveRowCopyAction",
				"values": {
					"visible": false
				}
			},
			{
				"operation": "remove",
				"name": "DataGridActiveRowDeleteAction"
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowOpenProcessProperties",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"caption": {"bindTo": "Resources.Strings.ProcessPropertiesButtonCaption"},
					"tag": "openProcessProperties"
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowCopyProcess",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"caption": {"bindTo": "Resources.Strings.CopyProcessButtonCaption"},
					"tag": "copyProcess"
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowDeleteProcess",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"caption": {"bindTo": "Resources.Strings.DeleteProcessButtonCaption"},
					"tag": "deleteProcess",
					"visible": Terrasoft.isDebug
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowDisableProcess",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"tag": "disableProcess",
					"caption": {"bindTo": "Resources.Strings.DisableProcessButtonCaption"},
					"visible": {"bindTo": "Enabled"}
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowEnableProcess",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"tag": "enableProcess",
					"caption": {"bindTo": "Resources.Strings.EnableProcessButtonCaption"},
					"visible": {
						"bindTo": "Enabled",
						"bindConfig": {"converter": "invertBooleanValue"}
					}
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowRunProcess",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"visible": {"bindTo": "getIsVisibleRunProcessButton"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.RunProcessButtonCaption"},
					"tag": "executeProcess"
				}
			},
			{
				"operation": "insert",
				"name": "CombinedModeOpenProcessDesignerButton",
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.OpenInDesignerButtonCaption"},
					"click": {"bindTo": "onCardAction"},
					"classes": {"textClass": ["actions-button-margin-right"]},
					"tag": "onOpenProcessDesignerButtonClick"
				}
			},
			{
				"operation": "insert",
				"name": "SeparateModeOpenProcessLogButton",
				"parentName": "SeparateModeActionButtonsLeftContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.OpenProcessLogButtonCaption"},
					"click": {"bindTo": "openProcessLogButtonClick"},
					"classes": {"textClass": ["actions-button-margin-right"]}
				}
			},
			{
				"operation": "merge",
				"name": "CombinedModeViewOptionsButton",
				"values": {
					"visible": {"bindTo": "IsSectionVisible"}
				}
			},
			{
				"operation": "merge",
				"name": "SeparateModeAddRecordButton",
				"values": {
					"visible": true
				}
			},
			{
				"operation": "merge",
				"name": "SeparateModeActionsButton",
				"values": {
					"style": Terrasoft.controls.ButtonEnums.style.DEFAULT
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


