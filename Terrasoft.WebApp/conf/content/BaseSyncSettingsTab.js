Terrasoft.configuration.Structures["BaseSyncSettingsTab"] = {innerHierarchyStack: ["BaseSyncSettingsTab"]};
define('BaseSyncSettingsTabStructure', ['BaseSyncSettingsTabResources'], function(resources) {return {schemaUId:'b3e983b4-31c2-4f86-b53e-bd7d71ce32b8',schemaCaption: "Base sync settings tab", parentSchemaName: "", schemaName:'BaseSyncSettingsTab',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseSyncSettingsTab", ["ExchangeNUIConstants", "BaseSyncSettingsTabResources", "ConfigurationConstants"],
		function(ExchangeNUIConstants, BaseSyncSettingsTabResources, ConfigurationConstants) {
	return {
		attributes: {
			/**
			 * Flag if sets multiselect.
			 * @type {Boolean}
			 */
			"IsMultiSelect": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Folder grid collection.
			 */
			"FoldersGridData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * List of expand hierarchy levels folder.
			 */
			"ExpandHierarchyFrom": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * List of saved tab values.
			 */
			"TabSavedValuesConfig": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
			},

			/**
			 * Active row Id.
			 */
			"ActiveRow": {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Selected rows collection.
			 */
			"SelectedRows": {
				dataValueType: this.Terrasoft.DataValueType.COLLECTION
			},

			/**
			 * Flag, if folders visible.
			 */
			"IsFoldersVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * The tab name.
			 */
			"TabName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT
			},

			/**
			 * Folders tree ajax request timeout (milliseconds).
			 */
			"LoadFoldersTimeout": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 120000
			},

			/**
			 * Email settings panel loaded flag.
			 */
			"IsReady": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			}
		},
		messages: {
			/**
			 * @message Set flag when tab module was saved.
			 */
			"TabSaved": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message Set flag when tab module was initialized.
			 */
			"TabInitialized": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message GetMailboxSyncSettingValues
			 * Returns column values of setting.
			 */
			"GetMailboxSyncSettingValues": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message SaveSettings
			 * Invoke save in tabs.
			 */
			"SaveSettings": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message ReloadTabs
			 * Invoke tab reload.
			 */
			"ReloadTabs": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message RerenderTab
			 * Invoke tab rerender.
			 */
			"RerenderTab": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message ShowSaveButton
			 * Shows save button.
			 */
			"ShowSaveButton": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Creates {@link Terrasoft.data.queries.BatchQuery} instance.
			 * @private
			 */
			createBatchQuery: function() {
				return this.Ext.create("Terrasoft.BatchQuery");
			},

			//endregion

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.Terrasoft.chain(
						this.initDefaultValues,
						this.initFolders,
						function() {
							this.subscribeSandboxEvents();
							this.addEvents("reRenderTab");
							this.on("change", this.onChange, this);
							if (callback) {
								callback.call(scope || this);
							}
						}, this);
				}, this]);
			},

			/**
			 * Shows save button on focus.
			 * @protected
			 */
			onChange: function() {
				if (this.get("IsReady")) {
					var changedProperties = Object.getOwnPropertyNames(this.model.changed);
					var mailboxSettingsColumns = this.getMailboxSettingsColumns();
					var isEntityColumnChanged = changedProperties.some(function(item) {
						return (!this.Ext.isEmpty(this.entitySchema.columns[item]) ||
							Terrasoft.contains(mailboxSettingsColumns, item));
					}, this);
					if (isEntityColumnChanged) {
						this.onItemFocused();
					}
				}
			},

			/**
			 * Subscribes for sandbox messages.
			 */
			subscribeSandboxEvents: function() {
				this.sandbox.subscribe("SaveSettings", this.onSaveTab, this);
				this.sandbox.subscribe("ReloadTabs", this.onReloadTab, this);
				this.sandbox.subscribe("RerenderTab", this.reRender, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				this.set("IsReady", true);
			},

			/**
			 * Generates config for default values request.
			 * @return {Object} Config for default values request.
			 */
			getDefValuesConfig: function() {
				return {
					columns: ["Id"]
				};
			},

			/**
			 * Initializes default values for settings tab view model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initDefaultValues: function(callback, scope) {
				this.set("IsReady", false);
				var config = this.getDefValuesConfig();
				var values = this.sandbox.publish("GetMailboxSyncSettingValues", config);
				this.setDefaultValues(values);
				var isFoldersVisible = !this.get("LoadAllEmailsFromMailBox");
				this.set("IsFoldersVisible", isFoldersVisible);
				if (callback) {
					callback.call(scope || this);
				}
			},

			/**
			 * Initializes folder grid properties.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initFolders: function(callback, scope) {
				var folderParameters = this.getFolderParameters();
				var chainSteps = [];
				this.Terrasoft.each(folderParameters, function(folderParameter) {
					chainSteps.push(function(next) {
						this.initFolder(folderParameter, next);
					}.bind(this));
				}, this);
				chainSteps.push(function() {
					if (callback) {
						callback.call(scope || this);
					}
				});
				chainSteps.push(this);
				Terrasoft.chain.apply(this, chainSteps);
			},

			/**
			 * Initializes folders collection.
			 * @param {Object} config Folders parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			initFolder: function(config, callback, scope) {
				var collection = this.get(config.foldersCollectionName) || this.Ext.create("Terrasoft.Collection");
				if (!collection.isEmpty()) {
					collection.clear();
				}
				this.set(config.foldersCollectionName, collection);
				this.loadFolders(config, callback, scope || this);
			},

			/**
			 * Gets the folder properties.
			 */
			getFolderParameters: this.Terrasoft.emptyFn,

			/**
			 * Creates and executes mailbox folders request.
			 * @param {Object} config Load emails tree parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			loadFolders: function(config, callback, scope) {
				var serviceConfig = this.getServiceConfig(config.folderClassName);
				this.callService({
					serviceName: serviceConfig.serviceName,
					methodName: "GetMailboxFolders",
					data: serviceConfig.data,
					timeout: this.get("LoadFoldersTimeout")
				},
				function(response) {
					this.onFoldersLoadedCallback(config, response, callback, scope);
				}, this);
			},

			/**
			 * Get config for Exchange or Imap service.
			 * @param {String} folderClassName Folder class name.
			 * @return {Object} Service config.
			 */
			getServiceConfig: function(folderClassName) {
				return {
					data: this.getFoldersSelectConfig(folderClassName),
					serviceName: this.getLoadFoldersServiceName()
				};
			},

			/**
			 * Get service name for load folders.
			 * @protected
			 * @returns {String} Service name for load folders
			 */
			getLoadFoldersServiceName: function () {
				var serviceName = "ImapUtilitiesService";
				if(this.get("ServerTypeId") === ExchangeNUIConstants.MailServer.Type.Exchange) {
					serviceName = this.getIsFeatureEnabled("EmailIntegrationV2")
						? "MailboxSettingsService"
						: "ExchangeSyncService";
				}
				return serviceName;
			},

			/**
			 * Generates Parameters for mail server folders select.
			 * @protected
			 * @param {String} folderClassName Folder class name.
			 * @return {Object} Parameters to select folders from mail server.
			 */
			getFoldersSelectConfig: function(folderClassName) {
				var data;
				var exchangeType = ExchangeNUIConstants.MailServer.Type.Exchange;
				var imapType = ExchangeNUIConstants.MailServer.Type.Imap;
				switch (this.get("ServerTypeId")) {
					case exchangeType:
						data = this.getExchangeFoldersConfig(folderClassName);
						break;
					case imapType:
						data = this.getBaseFoldersConfig();
						data.mailboxId = this.get("Id");
						break;
					default :
						break;
				}
				return data;
			},

			/**
			 * Fills folders grid collection.
			 * @param {Object} config Load emails tree parameters.
			 * @param {Array} folders List of mailbox folders.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			onFoldersLoadedCallback: function(config, folders, callback, scope) {
				var foldersList = {};
				var rootFolder = folders[0];
				if (!rootFolder) {
					this.Ext.callback(callback, scope);
					return;
				}
				this.set("expandHierarchy", [rootFolder.Id]);
				for (var i = 0; i < folders.length; i++) {
					var exchangeFolder = folders[i];
					var rowModel = this.Ext.create("Terrasoft.BaseViewModel", {
						rowConfig: {
							Id: {dataValueType: this.Terrasoft.DataValueType.TEXT},
							Name: {dataValueType: this.Terrasoft.DataValueType.TEXT},
							ParentId: {dataValueType: this.Terrasoft.DataValueType.TEXT},
							Path: {dataValueType: this.Terrasoft.DataValueType.TEXT}
						},
						values: exchangeFolder
					});
					rowModel.onNameLinkClick = this.Terrasoft.emptyFn;
					foldersList[exchangeFolder.Id] = rowModel;
				}
				this.fillGrid(config, folders, callback, scope);
				var collection = this.get(config.foldersCollectionName);
				collection.loadAll(foldersList);
			},

			/**
			 * Fills  selected folders collection.
			 * @param {Object} config Folders config.
			 * @param {Terrasoft.Collection} exchangeFolders Folders collection.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			fillGrid: function(config, exchangeFolders, callback, scope) {
				var selectedRows = [];
				var path = null;
				var compareFunction = function(element) {
					return element.Path === path;
				};
				this.selectFolders(config, function(folders) {
					for (var i = 0; i < exchangeFolders.length; i++) {
						var exchangeFolder = exchangeFolders[i];
						path = exchangeFolder.Path;
						if (folders.length > 0) {
							var filteredArray = folders.filter(compareFunction);
							if (filteredArray.length > 0) {
								selectedRows.push(exchangeFolder.Id);
							}
						} else {
							if (exchangeFolder.Selected) {
								selectedRows.push(exchangeFolder.Id);
							}
						}
					}
					this.set(config.selectedRows, selectedRows);
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Gets selected folders.
			 * @virtual
			 * @param {Object} config Folders parameters.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			selectFolders: function(config, callback, scope) {
				callback.call(scope || this);
			},

			/**
			 * Reloads tab parameters.
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope
			 */
			onReloadTab: function(callback, scope) {
				this.Terrasoft.chain(
					this.initDefaultValues,
					this.initFolders,
					function(next) {
						this.set("IsReady", true);
						next();
					},
					function() {
						this.Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * Sets default values into view model.
			 * @protected
			 * @param {Object} values Default values.
			 */
			setDefaultValues: function(values) {
				this.Terrasoft.each(values, function(value, key) {
					this.set(key, value);
				}, this);
			},

			/**
			 * Save settings message handler.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope
			 */
			onSaveTab: function(callback, scope) {
				this.Terrasoft.chain(
					this.validateSettings,
					this.saveSettings,
					this.onSaved,
					function() {
						this.Ext.callback(callback, scope);
					},
					this
				);
			},

			/**
			 * User settings validation method.
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope
			 */
			validateSettings: function(callback, scope) {
				callback.call(scope || this);
			},

			/**
			 * Save settings method.
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			saveSettings: function(callback, scope) {
				var update = this.getUpdateQuery();
				update.execute(function() {
					var folderParameters = this.getFolderParameters();
					this.Terrasoft.each(folderParameters, function(folderParameter) {
						this.saveFolders(folderParameter);
					}, this);
					callback.call(scope || this);
				}, this);
			},

			/**
			 * Saves selected folders, if not selected download all mail.
			 * @protected
			 * @param {Object} folderParameter Parameters for folder.
			 */
			saveFolders: function(folderParameter) {
				if (this.canSaveFolders(folderParameter)) {
					this.processNewFolders(folderParameter);
				}
			},

			/**
			 * Starts saving new folders.
			 * @param {Object} folderParameter Parameters for folder.
			 */
			processNewFolders: function(folderParameter) {
				this.getMailboxRootParameters(folderParameter, function(rootFoldersInfo) {
					this.saveNewFolders(rootFoldersInfo);
				}, this);
			},

			/**
			 * User method after save settings tab.
			 * @virtual
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			onSaved: function(callback, scope) {
				this.hideBodyMask();
				this.sandbox.publish("TabSaved", this.get("TabSavedValuesConfig"));
				if (callback) {
					callback.call(scope || this);
				}
			},

			/**
			 * Generates base folders request config.
			 * @return {Object} Folders request config.
			 */
			getBaseFoldersConfig: function() {
				return {
					mailServerId: this.get("MailServer")
						? this.get("MailServer").value
						: null,
					mailboxName: this.get("UserName")
				};
			},

			/**
			 * Generates exchange folders request config.
			 * @param {String} exchangeFolderClass Exchange folders class name.
			 * @return {Object} Exchange folders request config.
			 */
			getExchangeFoldersConfig: function(exchangeFolderClass) {
				var config = this.getBaseFoldersConfig();
				return this.Ext.apply(config, {
					senderEmailAddress: this.get("SenderEmailAddress"),
					folderClassName: exchangeFolderClass
				});
			},

			/**
			 * Returns flag is folder selected. Root folder always selected.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} folder Folder item model.
			 * @param {Terrasoft.Collection} selectedRows Folder collection selected rows.
			 * @return {Boolean} Is folder selected.
			 */
			isFolderSelected: function(folder, selectedRows) {
				var itemId = folder.Id;
				var itemParentId = folder.ParentId;
				return (this.Terrasoft.contains(selectedRows, itemId) || this.Ext.isEmpty(itemParentId));
			},

			/**
			 * Updates ParentId property for folders.
			 * @param {Terrasoft.Collection} collection Folders collection.
			 * @param {Guid} prevParentFolderId Previous ParentId property.
			 * @param {Guid} newParentFolderId New ParentId property value.
			 */
			changeParentFolder: function(collection, prevParentFolderId, newParentFolderId) {
				var childOfNotSelectedFolder = this.getChildFolders(collection, prevParentFolderId);
				childOfNotSelectedFolder.each(function(folder) {
					folder.ParentId = newParentFolderId;
				});
			},

			/**
			 * Generates array of selected folders and actualizes parent folders.
			 * @param {Terrasoft.Collection} collection All folder collection.
			 * @param {String} selectedRowsProperty Selected rows property name.
			 * @return {Terrasoft.Collection} Selected folders with actualized ParentId.
			 */
			getSelectedFoldersTree: function(collection, selectedRowsProperty) {
				var foldersCollection = this.Ext.create("Terrasoft.Collection");
				collection.each(function(item) {
					var folder = {
						Id: item.get("Id"),
						ParentId: item.get("ParentId"),
						Path: item.get("Path"),
						Name: item.get("Name")
					};
					foldersCollection.add(folder.Id, folder);
				}, this);
				var result = this.Ext.create("Terrasoft.Collection");
				var selectedRows = this.get(selectedRowsProperty);
				foldersCollection.each(function(item) {
					if (this.isFolderSelected(item, selectedRows)) {
						result.add(item.Id, item);
					} else {
						this.changeParentFolder(foldersCollection, item.Id, item.ParentId);
					}
				}, this);
				return result;
			},

			/**
			 * Get children folders.
			 * @param {Terrasoft.Collection} collection All folders collection.
			 * @param {Guid} parentId Parent folder id.
			 * @return {Terrasoft.Collection} Child folders with folder parentId.
			 */
			getChildFolders: function(collection, parentId) {
				return collection.filterByFn(function(folder) {
					return folder.ParentId === parentId;
				}, this);
			},

			/**
			 * Starts saving new folders.
			 * @protected
			 * @param {Object} rootFoldersInfo Root folder parameters.
			 * @param {String} rootFoldersInfo.mailboxFolderId Mailbox folder id.
			 * @param {Terrasoft.Collection} rootFoldersInfo.oldFolders Collection of old folders.
			 */
			saveNewFolders: function(rootFoldersInfo) {
				var folderCollection = this.get(rootFoldersInfo.folderParameter.foldersCollectionName);
				var selectedFolders = this.getSelectedFoldersTree(folderCollection,
						rootFoldersInfo.folderParameter.selectedRows);
				if (selectedFolders.getCount() === 1) {
					this.deleteOldFolders(rootFoldersInfo.mailboxFolderId, selectedFolders, rootFoldersInfo.oldFolders);
					return;
				}
				var rootSelectedFolder = selectedFolders.getByIndex(0);
				var childFolders = this.getChildFolders(selectedFolders, rootSelectedFolder.Id);
				var config = {
					selectedFolders: selectedFolders,
					oldFolders: rootFoldersInfo.oldFolders,
					mailboxFolderId: rootFoldersInfo.mailboxFolderId,
					rootSelectedFolder: rootSelectedFolder,
					foldersCollectionName: rootFoldersInfo.foldersCollectionName
				};
				if (!childFolders.isEmpty()) {
					this.saveNewFoldersCollection(config, childFolders);
				}
			},

			/**
			 * Saves new folder collection.
			 * @param {Object} config New folders parameters.
			 * @param {String} config.mailboxFolderId Mailbox folder id.
			 * @param {Terrasoft.Collection} config.selectedFolders Collection of selected folders.
			 * @param {Guid} config.rootSelectedFolder Root folder id.
			 * @param {Terrasoft.Collection} config.oldFolders Collection of old folders.
			 * @param {Terrasoft.Collection} childFolders Collection of child elements of folder.
			 */
			saveNewFoldersCollection: function(config, childFolders) {
				var selectedFolders = config.selectedFolders;
				var oldFolders = config.oldFolders;
				var mailboxFolderId = config.mailboxFolderId;
				var mailBoxSyncSettingsId = this.get("Id");
				var insertChildFolders = this.createBatchQuery();
				var nextLevel = this.Ext.create("Terrasoft.Collection");
				childFolders.each(function(item) {
					var itemId = item.Id;
					var folderPath = item.Path;
					if (!this.isArrayContainsFolderPathProperty(oldFolders, folderPath)) {
						insertChildFolders.add(this.getActivityFolderInsert(itemId, item.Name, mailboxFolderId));
						this.setAdditionalFolderInsert(insertChildFolders, mailBoxSyncSettingsId, itemId, folderPath);
					}
					nextLevel.loadAll(this.getChildFolders(selectedFolders, itemId));
				}, this);
				insertChildFolders.execute();
				this.saveOrDeleteFolders(config, nextLevel);
			},

			/**
			 * Set additional insert query for batch query to update folder.
			 * @virtual
			 */
			setAdditionalFolderInsert: this.Terrasoft.emptyFn,

			/**
			 * Save new folders collection if child folders exists, else delete old folders if it needs.
			 * @param {Object} config Folders parameters.
			 * @param {Terrasoft.Collection} childFolders The collection of child folders.
			 */
			saveOrDeleteFolders: function(config, childFolders) {
				var isFolderEmpty = childFolders.isEmpty();
				if (!isFolderEmpty) {
					this.saveNewFoldersCollection(config, childFolders);
				} else {
					this.deleteOldFolders(config.mailboxFolderId, config.selectedFolders, config.oldFolders);
				}
			},

			/**
			 * Generate select query for ActivityFolder.
			 * @return {Terrasoft.EntitySchemaQuery} Select query.
			 */
			getRootActivityFolderSelect: function() {
				var rootActivityFolderSelect = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ActivityFolder",
					rowCount: 1
				});
				rootActivityFolderSelect.addColumn("Id");
				rootActivityFolderSelect.filters.addItem(
					rootActivityFolderSelect.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Name", this.get("MailboxName")));
				return rootActivityFolderSelect;
			},

			/**
			 * Checks if array contains FolderPath property.
			 * @param {Array} array Array.
			 * @param {String} item FolderPath property.
			 * @return {boolean} Flag accessories FolderPath property.
			 */
			isArrayContainsFolderPathProperty: function(array, item) {
				for (var i = 0; i < array.length; i++) {
					if (array[i].FolderPath === item) {
						return true;
					}
				}
				return false;
			},

			/**
			 * Checks if array contains Path property.
			 * @param {Array} array Array.
			 * @param {String} item Path property.
			 * @return {boolean} Flag accessories Path property.
			 */
			isArrayContainsPathProperty: function(array, item) {
				for (var i = 0; i < array.length; i++) {
					if (array[i].Path === item) {
						return true;
					}
				}
				return false;
			},

			/**
			 * Gets parent folder id if it posible.
			 * @param {Object} params Folder parameters.
			 * @param {String} params.mailboxFolderId Mailbox folder id.
			 * @param {Terrasoft.Collection} params.selectedFolders Collection of selected folders.
			 * @param {Guid} params.rootSelectedFolder Root folder id.
			 * @param {Guid} params.newParentId New parent folder id.
			 * @param {String} params.folderPath FolderPath folder property .
			 * @param {Terrasoft.Collection} params.oldFolders Collection of old folders.
			 * @return {Guid} Parent folder id.
			 */
			tryGetParent: function(params) {
				var newParentId = params.newParentId;
				var oldFolders = params.oldFolders;
				var result;
				if (newParentId === params.rootId) {
					result = params.mailboxFolderId;
				} else {
					var parentFolder = params.selectedFolders.find(newParentId);
					if (!this.Ext.isEmpty(parentFolder) && this.isArrayContainsFolderPathProperty(oldFolders,
							parentFolder.Path)) {
						var filteredOldFolders = oldFolders.filter(function(item) {
							return item.FolderPath === parentFolder.Path;
						});
						var oldFolder = filteredOldFolders[0];
						var activityFolder = oldFolder.ActivityFolder;
						result = activityFolder.value;
					} else {
						result = newParentId;
					}
				}
				return result;
			},

			/**
			 * Gets InsertQuery for ActivityFolder.
			 * @param {Guid} activityFolderId Id of folder.
			 * @param {String} name Folder name.
			 * @param {Guid} parentId Id of parent folder.
			 * @return {Terrasoft.InsertQuery} InsertQuery for ActivityFolder.
			 */
			getActivityFolderInsert: function(activityFolderId, name, parentId) {
				var insert = this.Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: "ActivityFolder"
				});
				insert.setParameterValue("Id", activityFolderId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("Parent", parentId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("FolderType", ConfigurationConstants.Folder.Type.SubEmail,
					Terrasoft.DataValueType.GUID);
				insert.setParameterValue("Name", name, this.Terrasoft.DataValueType.TEXT);
				return insert;
			},

			/**
			 * Deletes old folders.
			 * @virtual
			 * @param {Guid} mailboxId Mailbox Id.
			 * @param {Array} newFolders Array of new folers.
			 * @param {Array} oldFolders Array of old folers.
			 */
			deleteOldFolders: function(mailboxId, newFolders, oldFolders) {
				var bq = this.Ext.create("Terrasoft.BatchQuery");
				var oldFolderCount = oldFolders.length;
				for (var i = 0; i < oldFolderCount; i++) {
					var oldFolder = oldFolders[i];
					if (!this.isArrayContainsPathProperty(newFolders.getItems(), oldFolder.FolderPath)) {
						bq.add(this.getFolderForDelete(oldFolder.Id));
					}
				}
				if (oldFolderCount > 0) {
					bq.execute();
				}
			},

			/**
			 * Generate delete query for table.
			 * @virtual
			 * @return {Terrasoft.DeleteQuery} Delete query.
			 */
			getFolderForDelete: function(Id) {
				return this.getFolderForDeleteBySchemaName(Id, "MailboxFoldersCorrespondence");
			},

			/**
			 * Generate delete query for table by schema name.
			 * @virtual
			 */
			getFolderForDeleteBySchemaName: this.Terrasoft.emptyFn,

			/**
			 * Gets root folder parameters.
			 * @param {Object} folderParameter Folder parameter.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback scope.
			 */
			getMailboxRootParameters: function(folderParameter, callback, scope) {
				var rootParametersBQ = this.Ext.create("Terrasoft.BatchQuery");
				rootParametersBQ.add(this.getOldFoldersSelect());
				rootParametersBQ.add(this.getRootActivityFolderSelect());
				rootParametersBQ.execute(function(response) {
					var result = {};
					if (response.success) {
						var queryResults = response.queryResults;
						var oldFolders = queryResults[0].rows;
						var rootActivityFolder = queryResults[1];
						var mailboxFolderId = null;
						if (!this.Ext.isEmpty(rootActivityFolder.rows[0])) {
							mailboxFolderId = rootActivityFolder.rows[0].Id;
						}
						result = {
							mailboxFolderId: mailboxFolderId,
							oldFolders: oldFolders,
							folderParameter: folderParameter
						};
					}
					callback.call(scope || this, result);
				}, this);
			},

			/**
			 * Fire reRenderTab event.
			 * @param {Object} config Config for tab rerender.
			 * @param {Guid} config.moduleId Module id.
			 * @param {Guid} config.containerId Container id.
			 */
			reRender: function(config) {
				if (this.sandbox.id === config.moduleId) {
					var renderToEl = this.getRenderToEl(config.containerId);
					this.fireEvent("reRenderTab", renderToEl);
				}
			},

			/**
			 * Get container element.
			 * @protected
			 * @param {Guid} containerId Container id.
			 * @return {Object} Container element.
			 */
			getRenderToEl: function(containerId) {
				return this.Ext.get(containerId);
			},

			/**
			 * Get reverse value.
			 * @protected
			 * @deprecated Use {@link #Terrasoft.BaseModel.invertBooleanValue}.
			 * @param {Boolean} value Value.
			 * @return {Boolean} Reverse value.
			 */
			inverseValue: function(value) {
				return !value;
			},

			/**
			 * Returns selected groups.
			 * @param {String} folderName Name of group collection.
			 * @param {String} radioButtonName Name of the radio button that controls the display group.
			 * @return {Terrasoft.Collection|Array}
			 */
			getSelectedFolders: function(folderName, radioButtonName) {
				return this.get(radioButtonName) ? this.get(folderName) : [];
			},

			/**
			 * Generates update query for mailbox settings.
			 * @return {Terrasoft.UpdateQuery} Update query for mailbox settings.
			 */
			getUpdateQueryMailbox: function() {
				var update = this.Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "MailboxSyncSettings"
				});
				var filters = update.filters;
				var mailboxSettingsId = this.get("MailboxSyncSettingsId");
				var idFilter = update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
					"Id", mailboxSettingsId);
				filters.add("IdFilter", idFilter);
				update.setParameterValue("ExchangeAutoSynchronization",
					this.get("ExchangeAutoSynchronization"), this.Terrasoft.DataValueType.BOOLEAN);
				return update;
			},

			/**
			 * Prepare to save collection of folder.
			 * @param {Object} folderConfig Config of folder.
			 */
			prepareChosenFoldersList: function(folderConfig) {
				var collection = this.get(folderConfig.foldersCollectionName);
				var checkedCollection = this.getSelectedFoldersTree(collection, folderConfig.selectedRows);
				checkedCollection = checkedCollection.filterByFn(function(folder) {
					return !this.Ext.isEmpty(folder.ParentId);
				}, this);
				var selectedFoldersArray = checkedCollection.getItems();
				var result = selectedFoldersArray.length > 0 ? this.Ext.encode(selectedFoldersArray) : "";
				this.set(folderConfig.nameOfFolders, result);
			},

			/**
			 * Initializes schema entity.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			initEntity: function(callback, scope) {
				var esq = this.getSettingsEsq();
				this.addEsqColumns(esq);
				this.setEsqFilters(esq);
				esq.getEntityCollection(function(result) {
					this.onEntityResponse(result);
					if (callback) {
						callback.call(scope || this);
					}
				}, this);
			},

			/**
			 * Sets result data in view model columns.
			 * @param {Object} response Server data response.
			 */
			onEntityResponse: function(response) {
				if (response.success) {
					var collection = response.collection;
					if (!collection.isEmpty()) {
						var entity = collection.getByIndex(0);
						this.setDefaultValues(entity.values);
					}
				} else {
					throw new this.Terrasoft.UnknownException({
						message: response.errorInfo.message
					});
				}
			},

			/**
			 * Generates entity schema query for sync settings.
			 * @return {Terrasoft.EntitySchemaQuery} Entity schema query.
			 */
			getSettingsEsq: function() {
				var settingsEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName
				});
				return settingsEsq;
			},

			/**
			 * Adds columns to entity schema query.
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			addEsqColumns: function(esq) {
				this.Terrasoft.each(this.columns, function(column, columnName) {
					if (column.type === this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN) {
						if (!esq.columns.contains(columnName)) {
							esq.addColumn(columnName);
						}
					}
				}, this);
			},

			/**
			 * Sets entity schema filters.
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			setEsqFilters: function(esq) {
				var mailboxSyncSettingsId = this.get("MailboxSyncSettingsId");
				var filterMailboxSyncSettings = esq.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "MailboxSyncSettings", mailboxSyncSettingsId);
				esq.filters.add("filterMailboxSyncSettings", filterMailboxSyncSettings);
			},

			/**
			 * Gets dynamic groups.
			 * @param {Object} config Config of folder.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			getDynamicGroups: function(config, callback, scope) {
				function getItem(item) {
					return {
						Id: item.get("Id"),
						Name: item.get("Name"),
						ParentId: item.get("Parent") ? item.get("Parent").value : "",
						Path: item.get("Id")
					};
				}
				var filtersArray = config.folderClass.SchemaFilters;
				var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: config.folderClass.SchemaName
				});
				select.addColumn("Id");
				select.addColumn("Name");
				select.addColumn("Parent");
				if (filtersArray && this.Ext.isArray(filtersArray) && filtersArray.length > 0) {
					filtersArray.forEach(function(element) {
						select.filters.addItem(element);
					});
				}
				select.getEntityCollection(function(response) {
					var collection = response.collection;
					var resultItems = [];
					var rootId = this.Terrasoft.utils.generateGUID();
					resultItems.push({
						Id: rootId,
						Name: this.get("MailboxName"),
						ParentId: "",
						Path: ""
					});
					if (collection.getCount() > 0) {
						collection.each(function(item) {
							var itemToAdd = getItem(item);
							if (!itemToAdd.ParentId) {
								itemToAdd.ParentId = rootId;
							}
							resultItems.push(itemToAdd);
						}, this);
					}
					this.onFoldersLoadedCallback(config, resultItems);
					callback.call(scope || this);
				}, this);
			},

			/**
			 * Gets and initializes mailbox sync settings.
			 */
			initMailboxSyncSettingValues: function() {
				var mailboxSyncSettingValues = this.sandbox.publish("GetMailboxSyncSettingValues", {
					columns: this.getMailboxSettingsColumns()
				});
				if (!this.Ext.isEmpty(mailboxSyncSettingValues)) {
					this.set("MailboxSyncSettingsId", mailboxSyncSettingValues.Id);
					this.set("ExchangeAutoSynchronization", mailboxSyncSettingValues.ExchangeAutoSynchronization);
					this.set("MailboxName", mailboxSyncSettingValues.MailboxName);
					this.set("ServerTypeId", mailboxSyncSettingValues.ServerTypeId);
					this.set("MailServer", mailboxSyncSettingValues.MailServer);
					this.set("UserName", mailboxSyncSettingValues.UserName);
					this.set("SenderEmailAddress", mailboxSyncSettingValues.SenderEmailAddress);
					this.set("ExchangeAutoSyncActivity", mailboxSyncSettingValues.ExchangeAutoSyncActivity);
				}
			},

			/**
			 * Returns list of mailbox sync settings columns for update.
			 * @protected
			 */
			getMailboxSettingsColumns: function() {
				return ["Id", "ExchangeAutoSynchronization", "MailboxName", "ServerTypeId", "MailServer",
						"UserName", "SenderEmailAddress", "ExchangeAutoSyncActivity"];
			},

			/**
			 * Sends "show save button" message to parent page.
			 */
			onItemFocused: function() {
				if (this.get("IsReady")) {
					this.sandbox.publish("ShowSaveButton");
				}
			}
		},
		diff: [{
			"operation": "insert",
			"name": "FoldersGrid",
			"values": {
				"itemType": Terrasoft.ViewItemType.GRID,
				"markerValue": "EmailGrid",
				"hierarchical": true,
				"multiSelect": {"bindTo": "IsMultiSelect"},
				"primaryColumnName": "Id",
				"collection": {"bindTo": "FoldersGridData"},
				"hierarchicalColumnName": "ParentId",
				"expandHierarchyLevels": {"bindTo": "ExpandHierarchyFrom"},
				"activeRow": {bindTo: "ActiveRow"},
				"selectedRows": {bindTo: "SelectedRows"},
				"unSelectRow": {"bindTo": "onItemFocused"},
				"selectRow": {"bindTo": "onItemFocused"},
				"type": "listed",
				"listedConfig": {
					"name": "FoldersGridListedConfig",
					"items": [
						{
							"name": "FolderNameListedGridColumn",
							"bindTo": "Name",
							"position": {"column": 1, "colSpan": 24}
						}
					]
				},
				"tiledConfig": {
					"name": "FoldersGridTiledConfig",
					"grid": {
						"columns": 24,
						"rows": 1
					},
					"items": [
						{
							"name": "FolderNameTiledGridColumn",
							"bindTo": "Name",
							"position": {"row": 1, "column": 1, "colSpan": 24}
						}
					]
				}
			}
		}]
	};
});


