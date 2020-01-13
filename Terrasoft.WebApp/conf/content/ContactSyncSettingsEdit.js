Terrasoft.configuration.Structures["ContactSyncSettingsEdit"] = {innerHierarchyStack: ["ContactSyncSettingsEdit"], structureParent: "BaseSyncSettingsEdit"};
define('ContactSyncSettingsEditStructure', ['ContactSyncSettingsEditResources'], function(resources) {return {schemaUId:'15019a32-f1c3-49b0-94cb-e6ca69deb693',schemaCaption: "ContactSyncSettingsEdit", parentSchemaName: "BaseSyncSettingsEdit", schemaName:'ContactSyncSettingsEdit',parentSchemaUId:'0513fbe7-77bb-4531-8d76-e550d21317d3',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactSyncSettingsEdit", ["ContactSyncSettingsEditResources", "SyncSettingsEditMixin", "ExchangeNUIConstants"],
		function(resources, SyncSettingsEditMixin, ExchangeNUIConstants) {
			return {
				mixins: {
					/**
					 * Base logic synchronization mixin.
					 */
					"SyncSettingsEditMixin": "Terrasoft.SyncSettingsEditMixin"
				},
				messages: {
					/**
					 * @message ShowSyncSettingsSetTip
					 * Notify to show tip about completed set sync settings.
					 */
					"ShowSyncSettingsSetTip": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.SyncSettingsEditMixin#getEntitySchemaName
					 * @overridden
					 */
					getEntitySchemaName: function() {
						return "ContactSyncSettings";
					},

					/**
					 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#onServerListItemClick
					 * @overridden
					 */
					onServerListItemClick: function(itemId) {
						if (itemId === ExchangeNUIConstants.MailServer.Gmail) {
							this.startGoogleAuth();
							this.onCancel();
							return;
						}
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#setFiltersToServerListEsq
					 * @overridden
					 */
					setFiltersToServerListEsq: function(esq) {
						this.addFiltersToServerListEsq(esq);
					},

					/**
					 * @inheritDoc Terrasoft.BaseSyncSettingsEdit#onSaved
					 * @overridden
					 */
					onSaved: function() {
						this.publishSyncSettingsIsSet();
						this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#getMailboxInsert
					 * @overridden
					 */
					getMailboxInsert: function() {
						var insert = this.callParent(arguments);
						insert.setParameterValue("ExchangeAutoSynchronization", 1,
								Terrasoft.DataValueType.BOOLEAN);
						return insert;
					},

					/**
					 * @inheritdoc BaseSyncSettingsEdit#getContactSyncSettingsInsert
					 * @overridden
					 */
					getContactSyncSettingsInsert: function() {
						return this.getEntitySyncSettingInsert();
					},

					/**
					 * @inheritdoc SyncSettingsEditMixin#setParametersToInsertEntitySyncSetting
					 * @overridden
					 */
					setParametersToInsertEntitySyncSetting: function(insert) {
						insert.setParameterValue("ImportContacts", 1,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ImportContactsAll", 1,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ImportContactsFromFolders", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContacts", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsAll", 1,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsSelected", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsEmployers", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsCustomers", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsOwner", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("ExportContactsFromGroups", 0,
								Terrasoft.DataValueType.BOOLEAN);
						insert.setParameterValue("MailboxSyncSettings", this.get("MailboxSyncSettingsId"),
								Terrasoft.DataValueType.GUID);
						insert.setParameterValue("ImportContactsFolders", "",
								Terrasoft.DataValueType.TEXT);
						insert.setParameterValue("ExportContactsGroups", "",
								Terrasoft.DataValueType.TEXT);
					},

					/**
					 * @inheritdoc Terrasoft.BaseSyncSettingsEdit#addNewMailServerToList
					 * @overridden
					 */
					addNewMailServerToList: function(response) {
						var newEntity = response.entity;
						var addedServerTypeId = newEntity.get("Type").value;
						if (addedServerTypeId === ExchangeNUIConstants.MailServer.Type.Exchange) {
							var collection = this.get("ServerListCollection");
							var newEntityId = newEntity.get("Id");
							collection.add(newEntityId, newEntity);
						}
					}
				}
			};
		});


