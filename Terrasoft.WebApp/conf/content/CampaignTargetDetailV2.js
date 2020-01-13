Terrasoft.configuration.Structures["CampaignTargetDetailV2"] = {innerHierarchyStack: ["CampaignTargetDetailV2"], structureParent: "CampaignDetailV2"};
define('CampaignTargetDetailV2Structure', ['CampaignTargetDetailV2Resources'], function(resources) {return {schemaUId:'9f6aeb4b-7195-4232-8ef1-aa78f0bc5cd7',schemaCaption: "\"Campaign participants\" detail schema", parentSchemaName: "CampaignDetailV2", schemaName:'CampaignTargetDetailV2',parentSchemaUId:'7036dfcb-d430-4bb8-a4bc-db1abf627b51',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CampaignTargetDetailV2", ["CampaignTargetDetailV2Resources", "ConfigurationConstants", "MarketingEnums",
			"CampaignEnums", "ConfigurationEnums", "SegmentsStatusUtils"],
		function(resources, ConfigurationConstants, MarketingEnums, CampaignEnums, enums, SegmentsStatusUtils) {
			return {
				entitySchemaName: "CampaignTarget",
				attributes: {
					/** ####, ########### ## ########### ######## ######### ########. */
					"CanAppend": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/** ####, ########### ## ########### ####### ######### ########. */
					"CanDelete": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},

					/** ############# #### ######## ########. */
					"CampaignAudience": {
						dataValueType: Terrasoft.DataValueType.GUID,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					/** Determines the visibility state for the ExcludeFromCampaign menu item. */
					"ExcludeFromCampaignVisible": {
						dataValueType: Terrasoft.DataValueType.BOOLEAN,
						type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				messages: {
					/**
					 * @message GetCampaignStatus
					 * ######## ###### ########.
					 */
					"GetCampaignStatus": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetAudienceEditabileStatus
					 * ######## ######## IsAudienceEditabile.
					 */
					"GetAudienceEditabileStatus": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message AudienceEditabileStatusChange
					 * ######## ###### # ######### ######## IsAudienceEditabile.
					 */
					"AudienceEditabileStatusChange": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				methods: {
					/**
					 * @inheritDoc BaseGridDetailV2#addRecordOperationsMenuItems
					 * @overridden
					 */
					addRecordOperationsMenuItems: function(toolsButtonMenu) {
						toolsButtonMenu.addItem(this.getExcludeFromCampaignMenuItem());
						toolsButtonMenu.addItem(this.getButtonMenuSeparator({
							Visible: {"bindTo": "ExcludeFromCampaignVisible"}
						}));
						this.callParent(arguments);
					},

					/**
					 * Returns config for the ExcludeFromCampaign menu item.
					 * @returns {Terrasoft.BaseViewModel}
					 */
					getExcludeFromCampaignMenuItem: function() {
						return this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.ExcludeFromCampaignItemCaption"},
							Click: {"bindTo": "excludeFromCampaign"},
							Enabled: {"bindTo": "isAnySelected"},
							Visible: {"bindTo": "ExcludeFromCampaignVisible"}
						});
					},

					/**
					 * Updates current step for the selected participants to the "Exiting from campaign".
					 */
					excludeFromCampaign: function() {
						var selectedItems = this.getSelectedItems();
						if (selectedItems.length === 0) {
							return;
						}
						this.showBodyMask();
						var dataSend = {
							campaignId: this.get("MasterRecordId"),
							campaignTargetIds: selectedItems
						};
						var config = {
							serviceName: "CampaignService",
							methodName: "ExcludeFromCampaign",
							data: dataSend
						};
						this.callService(config, this.onExcludeFromCampaign, this);
					},

					/**
					 * Callback function of the "ExcludeFromCampaign" method.
					 * @param {Object} result Result of executing the "ExcludeFromCampaign" method.
					 */
					onExcludeFromCampaign: function(result) {
						var rowsAffected = result.ExcludeFromCampaignResult || 0;
						if (rowsAffected) {
							this.reloadGridData();
						}
						this.hideBodyMask();
					},

					/**
					 * ########## ######### ###### ########## ######.
					 * @overridden
					 */
					getAddRecordButtonVisible: function() {
						return false;
					},

					/**
					 * ############## ######.
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.initAddMenuItems();
						this.updateCanAppendAndDelete();
					},

					/**
					 * ######### #### "##########".
					 * @protected
					 */
					initAddMenuItems: function() {
						this.sandbox.subscribe("AudienceEditabileStatusChange",
								this.updateCanAppendAndDelete, this, [this.sandbox.id]);
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
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getDeleteRecordMenuItem
					 * @overridden
					 */
					getDeleteRecordMenuItem: function() {
						return this.getButtonMenuItem({
							Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
							Click: {"bindTo": "deleteRecords"},
							Enabled: {bindTo: "isAnySelected"},
							Visible: {"bindTo": "CanDelete"}
						});
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getSwitchGridModeMenuItem
					 * @overridden
					 */
					getSwitchGridModeMenuItem: function() {
						return this.getButtonMenuItem({
							Caption: {"bindTo": "getSwitchGridModeMenuCaption"},
							Click: {"bindTo": "switchGridMode"},
							Visible: {"bindTo": "CanAppend"}
						});
					},

					/**
					 *  ##### ########## ####### #########.
					 *  @protected
					 *  @param {String} methodName ### ###### ########## ##########.
					 */
					addRecipient: function(methodName) {
						this.set("AddMethod", methodName);
						var addRecordMethod = this[methodName];
						addRecordMethod.call(this);
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#onCardSaved
					 * @overridden
					 */
					onCardSaved: function() {
						var addMethod = this.get("AddMethod");
						if (addMethod === "addContactFolder") {
							this.addContactFolder(true);
						} else {
							this.callParent(arguments);
						}
					},

					/**
					 * ######### ######### ############ ######.
					 * @protected
					 * @param {Function} callback ####### ######### ######
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
						} else {
							callback.call(this);
						}
					},

					/**
					 *  ##### ######## "######## #######".
					 *  @protected
					 */
					addContact: function() {
						var recordId = this.get("MasterRecordId");
						var defaultValues = [
							{
								name: "Campaign",
								value: recordId
							},
							{
								name: "TargetItem",
								value: "Contact"
							}
						];
						var campaignAudienceId = this.get("CampaignAudience");
						if (this.get("CanAppend") && campaignAudienceId) {
							defaultValues.push({
								name: "CurrentStep",
								value: campaignAudienceId
							});
						}
						this.set("DefaultValues", defaultValues);
						this.addRecord();
					},

					/**
					 *  ##### ######## "######## ###### #########".
					 *  @protected
					 *  @param {Boolean} skipValidationCard #######, ########## ## ########### ######### #############
					 *  ###### ##### ########### ########.
					 */
					addContactFolder: function(skipValidationCard) {
						var addContactFolderFn = function() {
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
						};
						if (skipValidationCard === true) {
							addContactFolderFn.call(this);
						} else {
							this.validateCard(function() {
								addContactFolderFn.call(this);
							});
						}
					},

					/**
					 * ######## ##### ###### "######## ###### #########", ########## ##### ###### ## ###########.
					 * @private
					 * @param {Object} config ########## # ########### #########.
					 */
					addContactFolderCallback: function(config) {
						var campaignId = this.get("MasterRecordId");
						var contactFolders = config.selectedRows;
						var foldersCount = contactFolders.getCount();
						var contactWillBeAddedMessage =
							(foldersCount === 1) ? this.get("Resources.Strings.ContactsOfOneWillBeAdded")
									: this.get("Resources.Strings.ContactsWillBeAdded");
						this.showInformationDialog(this.Ext.String.format(contactWillBeAddedMessage, foldersCount));
						var bq = this.Ext.create("Terrasoft.BatchQuery");
						contactFolders.each(function(item) {
							bq.add(this.getContactFolderInsert(campaignId, item.Id));
						}, this);
						bq.execute(function() {
							this.timeoutBeforeUpdate = SegmentsStatusUtils.timeoutBeforeUpdate;
							var result = this.sandbox.publish("GetCampaignStatus", null, [this.sandbox.id]);
							var statusId = result.сampaignStatusId;
							var isSetCampaignFirstStep = (statusId === MarketingEnums.CampaignStatus.STARTED);
							SegmentsStatusUtils.updateContactList(this, "Campaign", isSetCampaignFirstStep);
						}, this);
					},

					/**
					 * ####### ###### ## ########## ###### ######### # ########.
					 * @param {String} campaignId ############# ########.
					 * @param {String} contactFolderId ############# ###### #########.
					 * @return {Terrasoft.InsertQuery} ########## ###### ## ##########.
					 */
					getContactFolderInsert: function(campaignId, contactFolderId) {
						var insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "CampaignSegment"
						});
						insertQuery.setParameterValue("Campaign", campaignId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Segment", contactFolderId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("State", MarketingEnums.SegmentsStatus.REQUIERESUPDATING,
								Terrasoft.DataValueType.GUID);
						return insertQuery;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
					 * @overridden
					 */
					getCopyRecordMenuItem: Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getEditRecordMenuItem
					 * @overridden
					 */
					getEditRecordMenuItem: Terrasoft.emptyFn,

					/**
					 * @inheritdoc Terrasoft.BaseDetailV2#updateDetail
					 * @overriden
					 */
					updateDetail: function() {
						this.callParent(arguments);
						this.updateCanAppendAndDelete();
					},

					/**
					 * ######### ######## ## # ####### # ######## "#########" ########## ####
					 * @protected
					 * @param {Function} callback ####### ######### ######.
					 * @param {Object} scope ########, # ####### ##### ####### ####### callback
					 */
					isAudienceStepRoteWithDay: function(callback, scope) {
						var result = {
							success: true
						};
						var campaignId = this.get("MasterRecordId");
						var select = Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: "CampaignStepRoute"
						});
						select.addColumn("JSON");
						select.addColumn("[CampaignStep:Id:SourceStep].Id", "CampaignAudienceId");
						select.filters.addItem(select.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "[CampaignStep:Id:SourceStep].Type.Id",
								CampaignEnums.StepType.CAMPAIGN_AUDIENCE));
						select.filters.addItem(select.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "[CampaignStep:Id:SourceStep].Campaign.Id",
								campaignId));
						select.getEntityCollection(function(response) {
							var dayTransitionCount = -1;
							if (response.success) {
								var entityCollection = response.collection;
								var entity = entityCollection.getByIndex(0);
								if (entity) {
									var campaignAudienceId = entity.get("CampaignAudienceId");
									if (campaignAudienceId) {
										this.set("CampaignAudience", campaignAudienceId);
										var obj = JSON.parse(entity.get("JSON"));
										if (obj && obj.addInfo) {
											dayTransitionCount = obj.addInfo.DayTransitionCount;
										}
									}
								}
							}
							result.success = (dayTransitionCount >= 0);
							callback.call(scope || this, result);
						}, this);
					},

					/**
					 * ######### ######## CanAppend # CanDelete.
					 * @protected
					 */
					updateCanAppendAndDelete: function() {
						var result = this.sandbox.publish("GetCampaignStatus", null, [this.sandbox.id]);
						var statusId = result.campaignStatusId;
						this.set("ExcludeFromCampaignVisible", statusId === MarketingEnums.CampaignStatus.STARTED);
						switch (statusId) {
							case MarketingEnums.CampaignStatus.PLANNED:
								var status = this.sandbox.publish("GetAudienceEditabileStatus", null, [this.sandbox.id]);
								var isAudienceEditabile = !this.Ext.isEmpty(status) ? status.isAudienceEditabile : false;
								this.set("CanAppend", isAudienceEditabile);
								this.set("CanDelete", isAudienceEditabile);
								break;
							case MarketingEnums.CampaignStatus.STARTED:
								this.isAudienceStepRoteWithDay(function(response) {
									this.set("CanAppend", response.success);
								}, this);
								this.set("CanDelete", false);
								break;
							default:
								this.set("CanAppend", false);
								break;
						}
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"rowDataItemMarkerColumnName": "Contact"
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
								},
								"visible": {"bindTo": "CanAppend"}
							},
							"visible": {"bindTo": "getToolsVisible"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


