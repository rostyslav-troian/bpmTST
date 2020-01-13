Terrasoft.configuration.Structures["EventTargetDetailV2"] = {innerHierarchyStack: ["EventTargetDetailV2"], structureParent: "BaseGridDetailV2"};
define('EventTargetDetailV2Structure', ['EventTargetDetailV2Resources'], function(resources) {return {schemaUId:'5829b2e1-867c-409d-9553-a3346e1e058e',schemaCaption: "Event target audience - Detail", parentSchemaName: "BaseGridDetailV2", schemaName:'EventTargetDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EventTargetDetailV2", ["ConfigurationConstants", "terrasoft", "MarketingEnums",
		"ConfigurationEnums", "SegmentsStatusUtils"],
		function(ConfigurationConstants, Terrasoft, MarketingEnums, enums, SegmentsStatusUtils) {
			return {
				entitySchemaName: "EventTarget",
				methods: {

					/**
					 * ############## ######.
					 * @overridden
					 */
					init: function() {
						this.callParent(arguments);
						this.initAddMenuItems();
					},

					/**
					 * ########## ######### ###### ########## ######.
					 * @overridden
					 */
					getAddRecordButtonVisible: function() {
						return false;
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

					addRecipient: function(methodName) {
						this.set("AddMethod", methodName);
						var addRecordMethod = this[methodName];
						addRecordMethod.call(this);
					},

					/**
					 * ######### ######## ######.
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
							return;
						}
						callback.call(this);
					},

					/**
					 *  ##### ######## "######## #######".
					 *  @protected
					 */
					addContact: function() {
						var recordId = this.get("MasterRecordId");
						this.set("DefaultValues", [
							{
								name: "Event",
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
						var eventId = this.get("MasterRecordId");
						var contactFolders = config.selectedRows;
						var foldersCount = contactFolders.getCount();
						var contactWillBeAddedMessage = (foldersCount === 1) ?
							this.get("Resources.Strings.ContactsOfOneWillBeAdded") :
							this.get("Resources.Strings.ContactsWillBeAdded");
						this.showInformationDialog(this.Ext.String.format(contactWillBeAddedMessage, foldersCount));
						var bq = this.Ext.create("Terrasoft.BatchQuery");
						contactFolders.each(function(item) {
							bq.add(this.getContactFolderInsert(eventId, item.Id));
						}, this);
						bq.execute(function() {
							this.timeoutBeforeUpdate = SegmentsStatusUtils.timeoutBeforeUpdate;
							SegmentsStatusUtils.updateContactList(this, "Event");
						}, this);
					},

					/**
					 * ####### ###### ## ########## ###### ######### # ###########
					 * @param {String} eventId ############# ###########
					 * @param {String} contactFolderId ############# ###### #########
					 * @return {Terrasoft.InsertQuery} ########## ###### ## ##########
					 */
					getContactFolderInsert: function(eventId, contactFolderId) {
						var insertQuery = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "EventSegment"
						});
						insertQuery.setParameterValue("Event", eventId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Segment", contactFolderId, Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("State", MarketingEnums.SegmentsStatus.REQUIERESUPDATING,
							Terrasoft.DataValueType.GUID);
						return insertQuery;
					},

					/**
					 * @inheritdoc Terrasoft.BaseGridDetailV2#getCopyRecordMenuItem
					 * @overridden
					 */
					getCopyRecordMenuItem: Terrasoft.emptyFn
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"rowDataItemMarkerColumnName": "Contact",
							"type": "listed",
							"listedConfig": {
								"name": "DataGridListedConfig",
								"items": [
									{
										"name": "ContactListedGridColumn",
										"bindTo": "Contact",
										"position": {
											"column": 1,
											"colSpan": 10
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "EventResponseListedGridColumn",
										"bindTo": "EventResponse",
										"position": {
											"column": 11,
											"colSpan": 6
										}
									},
									{
										"name": "NoteListedGridColumn",
										"bindTo": "Note",
										"position": {
											"column": 17,
											"colSpan": 8
										}
									}
								]
							},
							"tiledConfig": {
								"name": "DataGridTiledConfig",
								"grid": {
									"columns": 24,
									"rows": 3
								},
								"items": [
									{
										"name": "ContactTiledGridColumn",
										"bindTo": "Contact",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 16
										},
										"type": Terrasoft.GridCellType.TITLE
									},
									{
										"name": "EventResponseTiledGridColumn",
										"bindTo": "EventResponse",
										"position": {
											"row": 1,
											"column": 17,
											"colSpan": 8
										}
									},
									{
										"name": "NoteTiledGridColumn",
										"bindTo": "Note",
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 24
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
							"visible": {"bindTo": "getToolsVisible"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


