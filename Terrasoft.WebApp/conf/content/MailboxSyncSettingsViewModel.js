Terrasoft.configuration.Structures["MailboxSyncSettingsViewModel"] = {innerHierarchyStack: ["MailboxSyncSettingsViewModel"]};
define('MailboxSyncSettingsViewModelStructure', ['MailboxSyncSettingsViewModelResources'], function(resources) {return {schemaUId:'3f67b531-655b-4af9-a545-e557c0b7c205',schemaCaption: "MailboxSyncSettingsViewModel", parentSchemaName: "", schemaName:'MailboxSyncSettingsViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MailboxSyncSettingsViewModel", ["MaskHelper", "ModalBox",
	"MailboxSyncSettingsViewModelResources", "RightUtilities", "terrasoft",
	"ConfigurationConstants", "ServiceHelper", "MailboxSyncSettings", "BaseSchemaViewModel"],
	function(MaskHelper, ModalBox, resources, RightUtilities, Terrasoft, ConfigurationConstants, ServiceHelper,
		MailboxSyncSettings) {
		/**
		 * @class Terrasoft.Exchange.MailboxSynchronizationSettingsViewMode
		 * View model class of mailbox synchronization settings.
		 */
		Ext.define("Terrasoft.Exchange.MailboxSyncSettingsViewModel", {

			extend: "Terrasoft.BaseSchemaViewModel",

			alternateClassName: "Terrasoft.MailboxSyncSettingsViewModel",

			/**
			 * Grid data
			 * @protected
			 * @virtual
			 * @type {Object}
			 */
			mailboxGridData: null,

			/**
			 * Active row id
			 * @protected
			 * @virtual
			 * @type {String}
			 */
			activeRowId: null,

			/**
			 * Sandbox.
			 * @protected
			 * @virtual
			 * @type {Object}
			 */
			sandbox: null,

			/**
			 * Initializes mailboxsynchronization settings view model.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback parameter.
			 * @protected
			 */
			init: function(callback, scope) {
				this.callParent(arguments);
				this.subscribeMessages();
				this.getData(callback, scope);
			},

			/**
			 * Loads multidelete result module.
			 * @private
			 */
			_loadMultiDeleteResultModule: function() {
				if (Terrasoft.MultiDeleteResultSchemaViewModel) {
					this.sandbox.loadModule("BaseSchemaModuleV2", {
						id: this.sandbox.id + "_multiDeleteResultModule",
						instanceConfig: {
							generateViewContainerId: false,
							useHistoryState: false,
							schemaName: "MultiDeleteResultSchema",
							isSchemaConfigInitialized: true
						},
						keepAlive: true
					});
				}
			},

			/**
			 * Configs multidelete process.
			 * @private
			 * @param {String} [operationKey] Multidelete operation key
			 */
			_handlerBeforeMultiDelete: function(operationKey) {
				localStorage.setItem(ConfigurationConstants.MultiDelete.MultiDeleteLocalStorageKey,
					operationKey);
				this.sandbox.subscribe("MultiDeleteFinished", this._handleAfterDelete, this);
				this._loadMultiDeleteResultModule();
				this.sandbox.publish("MultiDeleteStart", {operationKey: operationKey});
			},

			/**
			 * Callback for DeleteRecordsAsync method.
			 * @private
			 * @param {Object} [responseObject] Callback parameter.
			 */
			_deleteRecordsAsyncCallback: function(responseObject) {
				if (!responseObject || !responseObject.DeleteRecordsAsyncResult) {
					this.hideBodyMask();
					throw new Terrasoft.UnknownException();
				}
				var result = this.Terrasoft.decode(responseObject.DeleteRecordsAsyncResult);
				var success = result.Success;
				if (!success) {
					this.hideBodyMask();
					this.showDeleteExceptionMessage(result);
				}
			},

			/**
			 * Calls when delete process is finished
			 * @private
			 * @param {Object} [result] Callback parameter.
			 */
			_handleAfterDelete: function(result) {
				if (result.success) {
					this.sandbox.unRegisterMessages(["MultiDeleteFinished"]);
					this._registerMultiDeleteMessages();
					this.removeScheduledSynchronizationJob(function() {
						this.getData();
					}, this);
				}
			},

			/**
			 * Registers multidelete messages
			 * @private
			 */
			_registerMultiDeleteMessages: function() {
				var messages = {
					"MultiDeleteStart": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					},
					"MultiDeleteFinished": {
						"mode": Terrasoft.MessageMode.BROADCAST,
						"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				};
				this.sandbox.registerMessages(messages);
			},

			/**
			 * Returns info about record
			 * @private
			 */
			_getRecordInfo: function() {
				var recordId = this.get("activeRowId");
				var gridData = this.get("mailboxGridData");
				var displayValue = gridData && gridData.get(recordId) && gridData.get(recordId).get("UserName");
				return {
					entitySchemaName: MailboxSyncSettings.name,
					entitySchemaCaption: MailboxSyncSettings.caption,
					primaryColumnValue: recordId,
					primaryDisplayColumnValue: displayValue
				};
			},

			/**
			 * Subscribes to the view model events.
			 * @protected
			 */
			subscribeMessages: function() {
				this.sandbox.subscribe("AddMailBoxEvent", this.getData, this);
				var rightsModuleId = this.sandbox.id + "_Rights";
				this.sandbox.subscribe("GetRecordInfo", this._getRecordInfo, this, [rightsModuleId]);
			},

			/**
			 * Loades list of mailboxes
			 * @protected
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback function scope.
			 */
			getData: function(callback, scope) {
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "MailboxSyncSettings"
				});
				select.addColumn("Id", "Id");
				select.addColumn("UserName", "UserName");
				select.addColumn("MailServer.Type", "Type");
				select.addColumn("SysAdminUnit.Contact.Name", "MailBoxOwner");
				var filterGroup = select.createFilterGroup();
				filterGroup.Name = "FilterGroup";
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				var filterSysAdminUnit = select.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "SysAdminUnit", Terrasoft.SysValue.CURRENT_USER.value);
				filterGroup.add("filterSysAdminUnit", filterSysAdminUnit);
				var isSharedFilter = select.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "IsShared", true);
				filterGroup.add("IsSharedFilter", isSharedFilter);
				select.filters.add(filterGroup);
				select.getEntityCollection(function(result) {
					MaskHelper.HideBodyMask();
					if (result.success) {
						this.loadModel(result, this.getSchemaRecordRights, this);
					}
					Ext.callback(callback, scope || this);
				},this);
			},

			/**
			 * Sets rights in to the collection.
			 * @protected
			 * @param {String[]} [records] Collection of ids.
			 * @param {Object} [scope] GetSchemaRecordRightLevel scope.
			 */
			getSchemaRecordRights: function(records, scope) {
				records.forEach(function(recordId) {
					RightUtilities.getSchemaRecordRightLevel("MailboxSyncSettings", recordId,
						function(rightLevel) {
							var canEdit = this.canEdit(rightLevel);
							var canDelete = this.canDelete(rightLevel);
							var gridData = scope.get("mailboxGridData");
							var record = gridData.get(recordId);
							record.set("isSchemaCanEditRight", canEdit);
							record.set("isSchemaCanDeleteRight", canDelete);
						}, scope);
				});
			},

			/**
			 * Returns rights level on edit operation.
			 * @protected
			 * @param {Number} rightLevel Rights level.
			 * @return {Boolean} Returns is access on edit operation granted.
			 */
			canEdit: function(rightLevel) {
				return RightUtilities.isSchemaRecordCanEditRightConverter(rightLevel);
			},

			/**
			 * Returns rights level on delete operation.
			 * @param {Number} rightLevel Rights level.
			 * @return {Boolean} Returns is access on deleted operation granted.
			 */
			canDelete: function(rightLevel) {
				return RightUtilities.isSchemaRecordCanDeleteRightConverter(rightLevel);
			},

			/**
			 * Loads model.
			 * @protected
			 * @param {Object[]} [result] Collection of mailboxes.
			 * @param {Function} [callback] Callback function.
			 * @param {Object} [scope] Callback function scope.
			 */
			loadModel: function(result, callback, scope) {
				var entities = result.collection;
				var collection = scope.get("mailboxGridData");
				collection.clear();
				var results = {};
				var records = [];
				entities.each(function(entity) {
					var recordId = entity.get("Id");
					records.push(recordId);
					entity.values.isSchemaCanEditRight = false;
					entity.values.isSchemaCanDeleteRight = false;
					results[recordId] = Ext.create("Terrasoft.BaseViewModel", {
						rowConfig: {
							Id: {dataValueType: Terrasoft.DataValueType.GUID},
							UserName: {dataValueType: Terrasoft.DataValueType.TEXT},
							Type: {dataValueType: Terrasoft.DataValueType.LOOKUP},
							MailBoxOwner: {dataValueType: Terrasoft.DataValueType.TEXT}
						},
						values: entity.values
					});
				}, scope);
				collection.loadAll(results);
				callback(records, scope);
			},

			/**
			 * Handles click on active row
			 * @protected
			 * @param {String} [tag]
			 */
			onActiveRowSelect: function(tag) {
				if (tag === "Delete") {
					this.onDeleteButtonClick();
				} else if (tag === "Edit") {
					this.onEditButtonClick();
				} else if (tag === "EditRights") {
					this.onEditRigthsButtonClick();
				}
			},

			/**
			 * Handles create button click.
			 * @protected
			 */
			onAddButtonClick: function() {
				var modalBoxSize = {
					minHeight: "1",
					minWidth: "1",
					maxHeight: "100",
					maxWidth: "100"
				};
				var modalBoxContainer = ModalBox.show(modalBoxSize);
				this.sandbox.loadModule("CredentialsSyncSettingsEdit", {
					renderTo: modalBoxContainer,
					instanceConfig: {
						schemaName: "EmailSyncSettingsEdit",
						isSchemaConfigInitialized: true,
						useHistoryState: false
					}
				});
				ModalBox.setSize(400, 350);
			},

			/**
			 * Handles delete button click.
			 * @protected
			 */
			onDeleteButtonClick: function() {
				var message = resources.localizableStrings.DeleteConfirmationEx;
				this.showConfirmationDialog(message,
					function(returnCode) {
						this.onDelete(returnCode);
					},
					[Terrasoft.MessageBoxButtons.NO.returnCode, Terrasoft.MessageBoxButtons.YES.returnCode],
					null
				);
			},

			/**
			 * Starts multidelete process.
			 * @protected
			 * @param {String} [returnCode] Flag
			 */
			onDelete: function(returnCode) {
				if (returnCode !== Terrasoft.MessageBoxButtons.YES.returnCode) {
					return;
				}
				var operationKey = Terrasoft.generateGUID();
				var params = {
					operationKey: operationKey
				};
				var primaryColumnValues = [this.get("activeRowId")];
				this._handlerBeforeMultiDelete(operationKey);
				var paramsJSON = Ext.JSON.encode(params);
				this.callService({
					serviceName: "GridUtilitiesService",
					methodName: "DeleteRecordsAsync",
					data: {
						primaryColumnValues: primaryColumnValues,
						rootSchema: "MailboxSyncSettings",
						parameters: paramsJSON,
						filtersConfig: null
					}
				}, this._deleteRecordsAsyncCallback, this);
			},

			/**
			 * Edit record grid row action handler. Checks if user has rights to edit selected record and shows
			 * sync settings edit page.
			 * @protected
			 */
			onEditButtonClick: function() {
				var recordId = this.get("activeRowId");
				RightUtilities.checkCanEdit({
					schemaName: "MailboxSyncSettings",
					primaryColumnValue: recordId,
					isNew: false
				}, function(result) {
					if (Ext.isEmpty(result.GetCanEditResult)) {
						this.sandbox.publish("PushHistoryState", {
							hash: "BaseSchemaModuleV2/SyncSettings",
							stateObj: {
								recordId: recordId
							}
						});
					} else {
						this.showInformationDialog(result.GetCanEditResult);
					}
				}, this);
			},

			/**
			 * Handles edit rights button click.
			 * @protected
			 * @virtual
			 */
			onEditRigthsButtonClick: function() {
				var rightsModuleId = this.sandbox.id + "_Rights";
				this.sandbox.loadModule("Rights", {
					renderTo: "centerPanel",
					id: rightsModuleId,
					keepAlive: true
				});
			},

			/**
			 * Removes scheduled synchronization jobs for current users.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 * @protected
			 */
			removeScheduledSynchronizationJob: function(callback, scope) {
				var methodName = "CreateDeleteSyncJob";
				ServiceHelper.callService({
					serviceName: "MailboxSynchronizationSettingsService",
					methodName: methodName,
					data: {create: false},
					callback: function(response) {
						var result = response[methodName + "Result"];
						if (result) {
							this.showInformationDialog(result);
							MaskHelper.HideBodyMask();
							return;
						}
						callback.call(scope);
					},
					scope: this
				});
			}
		});
	});


