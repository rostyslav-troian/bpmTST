Terrasoft.configuration.Structures["VwMandrillRecipientDetailV2"] = {innerHierarchyStack: ["VwMandrillRecipientDetailV2"], structureParent: "BaseGridDetailV2"};
define('VwMandrillRecipientDetailV2Structure', ['VwMandrillRecipientDetailV2Resources'], function(resources) {return {schemaUId:'1a5992b6-c1ba-4ee8-b352-ff8c0f3fd56d',schemaCaption: "Detail schema: \"VwMandrillRecipientDetailV2\"", parentSchemaName: "BaseGridDetailV2", schemaName:'VwMandrillRecipientDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("VwMandrillRecipientDetailV2", ["VwMandrillRecipientDetailV2Resources", "ConfigurationConstants",
		"MarketingEnums", "ConfigurationEnums", "SegmentsStatusUtils", "css!InfoButtonStyles",
		"css!VwMandrillRecipientDetailV2CSS"],
		function(resources, ConfigurationConstants, MarketingEnums, enums, SegmentsStatusUtils) {
			return {
				entitySchemaName: "VwMandrillRecipient",
				attributes: {
					/** ####, ########### ##### ## #### ######## #########. */
					"IsAudienceEditable": {dataValueType: Terrasoft.DataValueType.BOOLEAN}
				},
				messages: {
					/**
					 * @message GetIsAudienceEditable
					 * ######## ######### ######## ## ############# #########.
					 * @return (Boolean) ########## true, #### ######## #############, ##### false.
					 */
					"GetIsAudienceEditable": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message VwMandrillRecipientDetailChanged
					 * ######## ######## # ######## ### ######## ####### ## ######.
					 */
					"VwMandrillRecipientDetailChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetEmailCategory
					 * ########## ######### Email.
					 */
					"GetEmailCategory": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetEmailStatus
					 * ########## ###### Email.
					 */
					"GetEmailStatus": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message GetEmailCreatedOn
					 * ########## #### ######## Email.
					 */
					"GetEmailCreatedOn": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {
					/**
					 * ########## ######### ###### ############## #########.
					 */
					getToolsButtonVisible: function() {
						var isAudienceEditable = this.get("IsAudienceEditable");
						return (this.getToolsVisible() && isAudienceEditable);
					},

					/**
					 * ########## ######### ###### ########## ######.
					 * @overridden
					 */
					getAddRecordButtonVisible: function() {
						return false;
					},

					/**
					 * ########## ####### ###### ########.
					 * @private
					 */
					tryEditRecord: function() {
						this.validateCard(function() {
							this.editRecord();
						});
					},

					/**
					 * ########## ####### ###### #######.
					 * @private
					 */
					tryDeleteRecords: function() {
						this.validateCard(function() {
							this.deleteRecords();
						});
					},

					/**
					 * ######### ######## ### ############# ########.
					 * @overridden
					 * @param {String} returnCode ### ###### ## ######.
					 * @param {Array} items ###### #########, ####### ##### #######.
					 */
					onDeleteAccept: function(returnCode, items) {
						this.set("ItemsToDeleteCount", null);
						if (returnCode && returnCode !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							return;
						}
						if (this.get("MultiSelect")) {
							var gridData = this.get("Collection");
							items = items || this.getSelectedItems();
							var filteredItems = items.filter(function(recordId) {
								var record = gridData.get(recordId);
								return this.getRecordIsEditable(record);
							}, this);
							var itemsToDeleteCount = items.length;
							var filteredItemsCount = filteredItems.length;
							var collectionChanged = (itemsToDeleteCount !== filteredItems.length);
							if (collectionChanged) {
								this.set("ItemsToDeleteCount", itemsToDeleteCount);
							}
							if (filteredItemsCount <= 0) {
								this.onDeleted({
									Success: true,
									DeletedItems: []
								});
								return;
							}
						}
						this.callParent(arguments);
					},

					/**
					 * ########, ####### ##### ######### ##### ########.
					 * @overridden
					 */
					onDeleted: function(result) {
						if (result.Success) {
							var itemsToDeleteCount = this.get("ItemsToDeleteCount");
							if (itemsToDeleteCount) {
								this.showInformationDialog(this.Ext.String.format(
										this.get("Resources.Strings.WarningDeleteRecipient"),
										result.DeletedItems.length, itemsToDeleteCount));
							}
						}
						this.callParent(arguments);
						this.sendDetailItemsChanged(true);
					},

					/**
					 * ########## ########### ############## ######.
					 * @private
					 * @return {Boolean}
					 */
					getRecordIsEditable: function() {
						var isMultiSelect = this.get("MultiSelect");
						var selectedItems = this.getSelectedItems();
						var selectedItemsLength = selectedItems.length;
						if (!isMultiSelect || (isMultiSelect && selectedItemsLength === 1)) {
							return true;
						} else if (isMultiSelect && (selectedItemsLength > 1)) {
							return true;
						} else {
							return false;
						}
					},

					/**
					 * ########## ########### ###### ############## ######.
					 * @overridden
					 */
					getEditRecordButtonEnabled: function() {
						var result = this.callParent(arguments);
						if (result) {
							result = this.getRecordIsEditable();
						}
						return result;
					},

					/**
					 * ########## ########### ###### ######## ######.
					 * @private
					 * @return {Boolean}
					 */
					getDeleteRecordButtonEnabled: function() {
						if (!this.isAnySelected()) {
							return false;
						}
						return this.getRecordIsEditable();
					},

					/**
					 * Sets TooltipVisible property.
					 */
					setTooltipVisible: function() {
						var value;
						var recordId = this.get("MasterRecordId");
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "BulkEmail"
						});
						esq.addColumn("Status");
						esq.getEntity(recordId, function(result) {
							var entity = result.entity;
							if (!entity) {
								return;
							}
							var bulkEmailStatus = entity.get("Status").value;
							value = (bulkEmailStatus !== MarketingEnums.BulkEmailStatus.PLANNED &&
								bulkEmailStatus !== MarketingEnums.BulkEmailStatus.START_SCHEDULED &&
								bulkEmailStatus !== MarketingEnums.BulkEmailStatus.STARTING &&
								bulkEmailStatus !== MarketingEnums.BulkEmailStatus.ERROR_SENDING
							);
							this.set("TooltipVisible", value);
						}, this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#init
					 * @overriden
					 */
					onRender: function() {
						this.setTooltipVisible();
						this.callParent();
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							this.initAddMenuItems();
							this.updateIsAudienceEditable();
							this.initSysSettingsValues(callback, scope);
						}, this]);
					},

					/**
					 * ######### #### "##########".
					 * @protected
					 */
					initAddMenuItems: function() {
						var addMenuItems = Ext.create("Terrasoft.BaseViewModelCollection");
						addMenuItems.add("addContactItem", this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Caption": {"bindTo": "Resources.Strings.AddContactCaption"},
								"Click": {"bindTo": "addRecipient"},
								"Tag": "addContact"
							}
						}));
						addMenuItems.add("addContactFolderItem", this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Caption": {"bindTo": "Resources.Strings.AddContactFolderCaption"},
								"Click": {"bindTo": "addRecipient"},
								"Tag": "addContactFolder"
							}
						}));
						this.set("addMenuItems", addMenuItems);
					},

					/**
					 *  ##### ########## ####### #########.
					 *  @protected
					 *  @param {String} methodName ### ###### ########## ##########.
					 */
					addRecipient: function(methodName) {
						this.set("AddMethod", methodName);
						this.validateCard(function() {
							var addRecordMethod = this[methodName];
							addRecordMethod.call(this);
						});
					},

					/**
					 * ######### ######## ######.
					 * @overridden
					 */
					onCardSaved: function() {
						this.addRecipient(this.get("AddMethod"));
					},

					/**
					 * ######### ######### ############ ######.
					 * @protected
					 * @param {Function} callback ####### ######### ######.
					 */
					validateCard: function(callback) {
						var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
						var isNew = (cardState.state === enums.CardStateV2.ADD ||
						cardState.state === enums.CardStateV2.COPY);
						if (isNew) {
							this.set("CardState", enums.CardStateV2.ADD);
							var args = {
								isSilent: true,
								messageTags: [this.sandbox.id]
							};
							this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
							return;
						}
						var recordId = this.get("MasterRecordId");
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "BulkEmail"
						});
						esq.addColumn("Status");
						esq.getEntity(recordId, function(result) {
							var entity = result.entity;
							if (!entity) {
								return;
							}
							var bulkEmailStatus = entity.get("Status").value;
							if (bulkEmailStatus !== MarketingEnums.BulkEmailStatus.PLANNED &&
									bulkEmailStatus !== MarketingEnums.BulkEmailStatus.START_SCHEDULED) {
								this.showInformationDialog(this.get("Resources.Strings.WarningChangeRecipientList"));
								return;
							}
							this.validateUsageInSplitTest(callback);
						}, this);
					},

					/**
					 * ######### ######### ######## ## ############# # #####-#####, # ###### #### ######## ##
					 * ############ # #####-##### ####### ######### ###### ##### #########.
					 * @param {Function} callback ####### ######### ######.
					 */
					validateUsageInSplitTest: function(callback) {
						var recordId = this.get("MasterRecordId");
						var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "BulkEmail"
						});
						esq.addColumn("SplitTest");
						esq.getEntity(recordId, function(result) {
							var entity = result.entity;
							if (!entity) {
								return;
							}
							var splitTest = entity.get("SplitTest");
							if (splitTest && !Terrasoft.isEmptyGUID(splitTest.value)) {
								this.showInformationDialog(this.get("Resources.Strings.UsageInSplitTestMessage"));
							} else {
								callback.call(this);
							}
						}, this);
					},

					/**
					 *  ##### ######## "######## #######".
					 *  @protected
					 */
					addContact: function() {
						var recordId = this.get("MasterRecordId");
						this.set("DefaultValues", [
							{
								name: "BulkEmail",
								value: recordId
							},
							{
								name: "TargetItem",
								value: "Contact"
							}
						]);
						this.addRecord();
					},

					/**
					 *  ##### ######## "######## ###### #########".
					 *  @protected
					 */
					addContactFolder: function() {
						var config = {
							entitySchemaName: "ContactFolder",
							multiSelect: true,
							columns: ["FolderType"]
						};
						var groupType = Terrasoft.createColumnInFilterWithParameters("FolderType",
								[ConfigurationConstants.Folder.Type.General,
									ConfigurationConstants.Folder.Type.Search]);
						groupType.comparisonType = Terrasoft.ComparisonType.EQUAL;
						config.filters = groupType;
						this.openLookup(config, this.addContactFolderCallback, this);
					},

					/**
					 * ######## ##### ###### "######## ###### #########", ########## ##### ###### ## ###########.
					 * @private
					 * @param {Object} config ########## # ########### #########.
					 */
					addContactFolderCallback: function(config) {
						var bulkEmailId = this.get("MasterRecordId");
						var contactFolders = config.selectedRows;
						var foldersCount = contactFolders.getCount();
						if (foldersCount === 0) {
							return;
						}
						var contactWillBeAddedMessage = (foldersCount === 1) ?
								this.get("Resources.Strings.ContactsOfOneWillBeAdded")
								: this.get("Resources.Strings.ContactsWillBeAdded");
						this.showInformationDialog(this.Ext.String.format(contactWillBeAddedMessage, foldersCount));
						var bq = this.Ext.create("Terrasoft.BatchQuery");
						contactFolders.each(function(item) {
							bq.add(this.getContactFolderInsert(bulkEmailId, item.Id));
						}, this);
						bq.execute(function() {
							this.timeoutBeforeUpdate = SegmentsStatusUtils.timeoutBeforeUpdate;
							SegmentsStatusUtils.updateContactList(this, "BulkEmail");
						}, this);
					},

					/**
					 * ####### ###### ## ########## ###### ######### # ######## ########.
					 * @param {String} bulkEmailId ############# ########.
					 * @param {String} contactFolderId ############# ###### #########.
					 * @return {Terrasoft.InsertQuery} ########## ###### ## ##########.
					 */
					getContactFolderInsert: function(bulkEmailId, contactFolderId) {
						var insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "BulkEmailSegment"
						});
						insertQuery.setParameterValue("BulkEmail", bulkEmailId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Segment", contactFolderId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("State", MarketingEnums.SegmentsStatus.REQUIERESUPDATING,
								Terrasoft.DataValueType.GUID);
						return insertQuery;
					},

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#updateDetail
					 * @overriden
					 */
					updateDetail: function(config) {
						config.reloadAll = true;
						this.callParent(arguments);
						this.updateIsAudienceEditable();
					},

					/**
					 * ######### ######## IsAudienceEditable.
					 * @protected
					 */
					updateIsAudienceEditable: function() {
						var isAudienceEditable = this.sandbox.publish("GetIsAudienceEditable", null, [this.sandbox.id]);
						this.set("IsAudienceEditable", isAudienceEditable);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#reloadGridData
					 * @overriden
					 */
					reloadGridData: function() {
						this.callParent(arguments);
						this.sendDetailItemsChanged(false);
					},

					/**
					 * ######## ######### # ######### ########## ####### ## ######.
					 * @protected
					 * @param {Boolean} useGridCount #######, ###########, ### ### ######## ####### ####### ## ######
					 * ##### ############ ###### # ####### ######.
					 */
					sendDetailItemsChanged: function(useGridCount) {
						var config = {};
						if (useGridCount) {
							var collection = this.get("Collection");
							config.value = collection.getCount() === 0;
						}
						this.sandbox.publish("VwMandrillRecipientDetailChanged", config, [this.sandbox.id]);
					},

					/**
					 * @inheritdoc Terrasoft.GridUtilitiesV2#afterLoadGridDataUserFunction
					 * @overriden
					 */
					afterLoadGridDataUserFunction: function() {
						this.callParent(arguments);
						this.sendDetailItemsChanged(true);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
					 * @overridden
					 */
					getEditRecordMenuItem: function() {
						return this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.EditMenuCaption"},
							Click: {"bindTo": "tryEditRecord"},
							Enabled: {"bindTo": "getEditRecordButtonEnabled"},
							Visible: {"bindTo": "getToolsButtonVisible"}
						});
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
					 * @overridden
					 */
					getDeleteRecordMenuItem: function() {
						return this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
							Click: {"bindTo": "tryDeleteRecords"},
							Enabled: {"bindTo": "getDeleteRecordButtonEnabled"},
							Visible: {"bindTo": "getToolsButtonVisible"}
						});
					},

					/**
					 * ########## #######, ####### ###### ########## ########
					 * @return {Object} ########## ###### ########-############ #######
					 */
					getGridDataColumns: function() {
						return {
							"Id": {path: "Id"},
							"Contact": {path: "Contact"},
							"Contact.Name": {path: "Contact.Name"},
							"EmailAddress": {path: "EmailAddress"}
						};
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
					 * @overridden
					 */
					getCopyRecordMenuItem: Terrasoft.emptyFn,

					/**
					 * ######### ######## ######### ########.
					 * @protected
					 */
					initSysSettingsValues: function(callback, scope) {
						Terrasoft.SysSettings.querySysSettings(["MandrillStatisticUpdatePeriodDays"],
							function() {
								callback.call(scope);
							}, this);
					}
				},
				diff: [
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							type: "listed",
							listedConfig: {
								name: "DataGridListedConfig",
								items: [
									{
										name: "ContactListedGridColumn",
										bindTo: "Contact",
										position: {
											column: 1,
											colSpan: 12
										},
										type: Terrasoft.GridCellType.TITLE
									},
									{
										name: "EmailAddressListedGridColumn",
										bindTo: "EmailAddress",
										position: {
											column: 13,
											colSpan: 12
										}
									}
								]
							},
							tiledConfig: {
								name: "DataGridTiledConfig",
								grid: {
									columns: 24,
									rows: 1
								},
								items: [
									{
										name: "ContactTiledGridColumn",
										bindTo: "Contact",
										position: {
											row: 1,
											column: 1,
											colSpan: 12
										},
										type: Terrasoft.GridCellType.TITLE
									},
									{
										name: "EmailAddressTiledGridColumn",
										bindTo: "EmailAddress",
										position: {
											row: 1,
											column: 13,
											colSpan: 12
										}
									}
								]
							}
						}
					},
					{
						"operation": "merge",
						"name": "AddTypedRecordButton",
						"parentName": "Detail",
						"propertyName": "tools",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"controlConfig": {
								"menu": {
									"items": {"bindTo": "addMenuItems"}
								}
							},
							"visible": {"bindTo": "getToolsButtonVisible"}
						}
					},
					{
						"operation": "insert",
						"name": "TooltipInfoButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
							"content": {"bindTo": "Resources.Strings.InfoButtonDetailTriggerEmailMessage"},
							"visible": {"bindTo": "TooltipVisible"},
							"controlConfig": {
								"classes": {
									"wrapperClass": "info-button-recipient-detail",
									"imageClass": "info-button-image"
								}
							},
							"behaviour": {
								"displayEvent": Terrasoft.TipDisplayEvent.CLICK
							}
						},
						"parentName": "Detail",
						"propertyName": "tools",
						"index": 1
					}
				]
			};
		}
);


