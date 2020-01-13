Terrasoft.configuration.Structures["LeadContactsInFolderDetailV2"] = {innerHierarchyStack: ["LeadContactsInFolderDetailV2"], structureParent: "BaseGridDetailV2"};
define('LeadContactsInFolderDetailV2Structure', ['LeadContactsInFolderDetailV2Resources'], function(resources) {return {schemaUId:'fc1b1e8f-3550-43e8-b55e-b45dd40e0eee',schemaCaption: "Detail - Contact folders", parentSchemaName: "BaseGridDetailV2", schemaName:'LeadContactsInFolderDetailV2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadContactsInFolderDetailV2", ["ext-base", "terrasoft", "sandbox",  "ConfigurationConstants",
		"ConfigurationEnums"],
	function(Ext, Terrasoft, sandbox, ConfigurationConstants, Enums) {
		return {
			entitySchemaName: "ContactInFolder",
			methods: {

				/**
				 * ########## #######, ####### ###### ########## ########.
				 * @protected
				 * @overriden
				 * @return {Object} ########## ###### ########-############ #######.
				 */
				getGridDataColumns: function() {
					return {
						"Id": {path: "Id"},
						"Folder": {path: "Folder"}
					};
				},

				/**
				 * ##### ######## "######## ##### #########".
				 * @private
				 */
				addContactFolder: function() {
					var masterColumnValue = this.get("MasterRecordId");
					var config = {
						entitySchemaName: "ContactFolder",
						multiSelect: true,
						columns: ["FolderType", "Id"]
					};
					var existsFilterGroup = this.Terrasoft.createFilterGroup();
					existsFilterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Contact", masterColumnValue.value));
					var existsFilter = this.Terrasoft.createNotExistsFilter("[ContactInFolder:Folder:Id].Contact",
						existsFilterGroup);
					var filterGroup = this.Terrasoft.createFilterGroup();
					filterGroup.addItem(existsFilter);
					var folderFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "FolderType", ConfigurationConstants.Folder.Type.General);
					filterGroup.addItem(folderFilter);
					config.filters = filterGroup;
					this.openLookup(config, this.addContactCallback, this);
				},

				/**
				 * Callback-#######, ############# ##### ########## ##### #########.
				 * @private
				 * @param {Object} args #########.
				 */
				addContactCallback: function(args) {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					var contactId = this.get("MasterRecordId");
					this.selectedRows = args.selectedRows.getItems();
					this.selectedItems = [];
					this.selectedRows.forEach(function(item) {
						item.ContactId = contactId;
						bq.add(this.getContactInsertQuery(item));
						this.selectedItems.push(item.value);
					}, this);
					if (bq.queries.length > 0) {
						bq.execute(function(response) {
							if (response && response.success) {
								this.reloadGridData();
							}
						}, this);
					}
				},

				/*
				 * ########## ###### ## ########## ######## # ########### ######.
				 * @param args {Object} ############# ######## # ######### # ########### ###### {ContactId, value}				 *
				 * @private
				 * return {Object} ###### ######.
				 */
				getContactInsertQuery:  function(item) {
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ContactInFolder"
					});
					insert.setParameterValue("Contact", item.ContactId, Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Folder", item.value, Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * ########## ######## ########### ######.
				 * @protected
				 * @return {Boolean} ######## ########### ######.
				 */
				getAddRecordButtonVisible: function() {
					return this.getToolsVisible();
				},

				/**
				 * ######### ######### ###### ## ###########.
				 * @protected
				 * @overriden
				 */
				addRecord: function() {
					var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
					var isNew = (cardState.state === Enums.CardStateV2.ADD ||
						cardState.state === Enums.CardStateV2.COPY);
					if (isNew) {
						this.set("CardState", Enums.CardStateV2.ADD);
						var args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					} else {
						this.addContactFolder();
					}
				},

				/**
				 * ######## ##### ########## ######### # ###### ##### ########## ########.
				 * @protected
				 * @overridden
				 */
				onCardSaved: function() {
					this.addContactFolder();
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
				getEditRecordMenuItem: Terrasoft.emptyFn
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "AddRecordButton",
					"parentName": "Detail",
					"propertyName": "tools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "addContactFolder"},
						"visible": {"bindTo": "getAddRecordButtonVisible"},
						"enabled": {"bindTo": "getAddRecordButtonEnabled"}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


