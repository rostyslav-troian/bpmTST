Terrasoft.configuration.Structures["ContactEnrichmentSchema"] = {innerHierarchyStack: ["ContactEnrichmentSchema"], structureParent: "BaseEnrichmentSchema"};
define('ContactEnrichmentSchemaStructure', ['ContactEnrichmentSchemaResources'], function(resources) {return {schemaUId:'42dade1e-8ceb-4ab5-a061-6cb3704aed10',schemaCaption: "Contact enrichment schema", parentSchemaName: "BaseEnrichmentSchema", schemaName:'ContactEnrichmentSchema',parentSchemaUId:'61c53d44-313f-4fa8-8af7-452489201eef',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactEnrichmentSchema", ["LookupUtilities", "NetworkUtilities", "RightUtilities", "BaseEnrichmentViewModel",
		"SearchableTextEdit", "css!ContactEnrichmentSchemaCSS", "EmailMiningEnums"],
	function(LookupUtilities, NetworkUtilities, RightUtilities) {
	return {

		messages: {
			/**
			 * Update contact enrichment page visibility.
			 */
			"ContactEnrichmentPageVisibilityChanged": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			},
			/**
			 * @message PushHistoryState
			 * Post changes in the chain of states.
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Account name.
			 * @private
			 * @type {String}
			 */
			"AccountName": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "",
				"contentType": this.Terrasoft.ContentType.SEARCHABLE_TEXT,
				"searchableTextConfig": {
					"listAttribute": "AccountList",
					"prepareListMethod": "prepareAccountExpandableList",
					"listViewItemRenderMethod": "onAccountListViewItemRender",
					"itemSelectedMethod": "onAccountListItemSelected"
				}
			},
			/**
			 * Account data with identifier and name.
			 */
			Account: {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			},
			/**
			 * Mask element selector.
			 * @type {String}
			 */
			"MaskSelector": {
				datavalueType: Terrasoft.DataValueType.TEXT,
				value: "#ContactEnrichmentSchemaEnrichmentContainerContainer"
			},
			/**
			 * Is account checked.
			 * @private
			 * @type {String}
			 */
			"IsAccountChecked": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": true
			},
			/**
			 * Is account edit visible.
			 * @private
			 * @type {String}
			 */
			"IsAccountEditVisible": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": false
			},
			/**
			 * Sign that contact needs to be created.
			 * @private
			 * @type {Boolean}
			 */
			"NeedCreateContact": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"value": true
			},
			/**
			 * Contact identifier.
			 * @private
			 * @type {String}
			 */
			"ContactId": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},
			/**
			 * Enrichment text data identifier.
			 * @private
			 * @type {String}
			 */
			"EnrchTextDataId": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},
			/**
			 * Enrichment email data identifier.
			 * @private
			 * @type {String}
			 */
			"EnrchEmailDataId": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": ""
			},
			/**
			 * Contact name.
			 * @private
			 * @type {String}
			 */
			"ContactName": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "",
				"isRequired": true
			},
			/**
			 * Contact lookup column attribute.
			 * @private
			 * @type {String}
			 */
			ContactLookupColumn: {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"referenceSchemaName": "Contact",
				"isRequired": true,
				"lookupConfig": {
					"actionsButtonVisible": false
				}
			},
			/**
			 * Collection of the enrich type mappings.
			 */
			"EnrchTypeMappingCollection": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Account collection.
			 */
			"AccountList": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Account page link.
			 */
			"AccountLink": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			/**
			 * EnrchTextEntity communication type.
			 */
			"EnrchTextEntityCommunicationType": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "CommunicationEntity"
			},
			/**
			 * EnrchTextEntity account type.
			 */
			"EnrchTextEntityAccountType": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"value": "OrganizationEntity"
			},
			/**
			 * EnrchTextEntity communication type.
			 */
			"DefaultContactCommunicationType": {
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT,
				"value": null
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * Render list item event handler.
			 * @protected
			 * @param {Object} item List element.
			 */
			onAccountListViewItemRender: function(item) {
				var itemDisplayValue = item.displayValue.toString();
				var itemValue = item.value;
				var primaryTemplate =
					"<span class=\"listview-item-primaryInfo account-info\" data-value=\"{0}\">{1}</span>";
				var primaryInfoHtml = Ext.String.format(primaryTemplate, itemValue, itemDisplayValue);
				var tpl = [
					"<div class=\"listview-item account-info\" data-value=\"{0}\">",
					"<div class=\"listview-item-info account-info\" data-value=\"{0}\">{1}</div>",
					"</div>"
				].join("");
				item.customHtml = this.Ext.String.format(tpl, itemValue, primaryInfoHtml);
			},

			/**
			 * Prepares account list.
			 * @param {String} partialName Partial account name for search.
			 * @param {Terrasoft.Collection} list Account list.
			 */
			prepareAccountExpandableList: function(partialName, list) {
				if (!partialName) {
					list.clear();
					return true;
				}
				if (partialName.length < 3) {
					return true;
				}
				var esq = this.getAccountsQuery(partialName);
				esq.getEntityCollection(this.suggestAccountsCallback, this);
			},

			/**
			 * Returns EntitySchemaQuery object for account lookup.
			 * @protected
			 * @param {String} partialName Partial account name for search.
			 */
			getAccountsQuery: function(partialName) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Account"
				});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.filters.add("startFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.START_WITH, "Name", partialName));
				return esq;
			},

			/**
			 * Fills expandable list by autocomplete service response.
			 * @private
			 * @param {Object} response Response for account list request.
			 */
			suggestAccountsCallback: function(response) {
				var list = this.get("AccountList");
				list.clear();
				if (Terrasoft.isEmptyObject(response)) {
					return true;
				}
				var itemList = {};
				response.collection.each(function(account) {
					itemList[account.get("Id")] = {
						value: account.get("Id"),
						markerValue: account.get("Name"),
						displayValue: account.get("Name")
					};
				}, this);
				list.loadAll(itemList);
			},

			/**
			 * Sets account view model attribute from account list item.
			 * @protected
			 * @param {Object} accountListItem Account list element.
			 */
			onAccountListItemSelected: function(accountListItem) {
				if (Ext.isEmpty(accountListItem)) {
					return;
				}
				var id = accountListItem.value;
				var name = accountListItem.displayValue;
				this.setAccountAttributes(id, name);
			},

			/**
			 * Opens account lookup.
			 * @protected
			 */
			openAccountLookup: function() {
				var lookup = this.getLookupConfig();
				lookup.config.actionsButtonVisible = false;
				LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
			},

			/**
			 * Returns lookup window config.
			 * @protected
			 * @return {Object} Lookup window config.
			 */
			getLookupConfig: function() {
				return {
					config: {
						entitySchemaName: "Account",
						columnName: "Name",
						columns: ["ContactId"]
					},
					callback: this.onAccountLookupItemSelected.bind(this)
				};
			},

			/**
			 * Sets account view model attribute from account lookup item.
			 * @protected
			 * @param {Object} accountookupItem Account lookup element.
			 */
			onAccountLookupItemSelected: function(accountookupItem) {
				if (Ext.isEmpty(accountookupItem) || accountookupItem.selectedRows.getCount() === 0) {
					return;
				}
				var accountItem = accountookupItem.selectedRows.getByIndex(0);
				var id = accountItem.value;
				var name = accountItem.displayValue;
				this.set("AccountName", name);
				this.setAccountAttributes(id, name);
			},



			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#openCardInChain
			 * @overridden
			 */
			openCardInChain: function() {
				this.callParent(arguments);
				this.hideModule();
			},

			/**
			 * Sets contact identifier to view model from selected contact.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} model Page view model.
			 * @param {Object} contact Selected contact.
			 */
			onContactLookupColumnChanged: function(model, contact) {
				if (contact) {
					this.set("ContactId", contact.value);
					this.checkContactRights(Terrasoft.emptyFn, this);
				} else {
					this.set("ContactId", "");
				}
			},

			/**
			 * Creates enriched entity save parameters config.
			 * @private
			 * @param {String} entityName Entity name.
			 * @param {Number} order Item saving order.
			 * @param {Object[]} values Item column values.
			 * @param {String[]} keyColumns Item key columns array.
			 * @return {Object} Enriched entity save parameters config.
			 */
			createEnrichSaveItem: function(entityName, order, values, keyColumns) {
				return {
					"entityName": entityName,
					"order": order,
					"keyColumns": keyColumns || [],
					"values": values || []
				};
			},

			/**
			 * Creates contact communication column values array.
			 * @private
			 * @param {Terrasoft.BaseViewModel} item ContactCommunication instance.
			 * @param {String} contactRecordId Contact record unique identifier.
			 * @return {Object[]} Contact communication column values array.
			 */
			createCommunicationItemValues: function(item, contactRecordId) {
				return [{
					"Key": "Number",
					"Value": item.get("Value")
				}, {
					"Key": "Contact",
					"Value": contactRecordId
				}, {
					"Key": "CommunicationType",
					"Value": item.get("Type")
				}];
			},

			/**
			 * Creates EnrchProcessedData item column values array.
			 * @private
			 * @param {Terrasoft.BaseViewModel} item EnrchProcessedData instance.
			 * @param {String} contactRecordId Contact record unique identifier.
			 * @return {Object[]} EnrchProcessedData column values array.
			 */
			createProcessedItemValues: function(item, contactRecordId) {
				return [{
					"Key": "Contact",
					"Value": contactRecordId
				}, {
					"Key": "TextEntityHash",
					"Value": item.Hash
				}, {
					"Key": "IsChecked",
					"Value": this.getIsItemChecked(item)
				}];
			},

			/**
			 * Creates EnrchEmailData item column values array.
			 * @private
			 * @return {Object[]} EnrchEmailData column values array.
			 */
			createEnrichEmailDataValues: function() {
				return [{
					"Key": "Id",
					"Value": this.get("EnrchEmailDataId")
				}, {
					"Key": "Status",
					"Value": this.Terrasoft.EmailMiningEnums.EnrichEmailDataStatus.ENRICHED
				}];
			},

			/**
			 * Returns is processed item checked.
			 * @private
			 * @param {Object} item Processed item properties.
			 * @return {Boolean} Is processed item checked.
			 */
			getIsItemChecked: function(item) {
				switch (item.Type) {
					case this.get("EnrchTextEntityCommunicationType"):
						var hash = item.Hash;
						var collection = this.getCommunicationItems();
						var filteredCollection = collection.filterByFn(function(communication) {
							return communication.get("TextEntityHash") === hash;
						});
						return filteredCollection.getCount() > 0;
					case this.get("EnrchTextEntityAccountType"):
						return this.get("IsAccountChecked");
					default:
						return true;
				}
			},

			/**
			 * Creates EnrchFoundContact item column values array.
			 * @private
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @return {Object[]} EnrchFoundContact column values array.
			 */
			getEnrchFoundContactValues: function(contactRecordId) {
				var textEntityId = this.get("EnrchTextDataId");
				var initialMode = this.get("InitialMode");
				var values = [{
						"Key": "Contact",
						"Value": contactRecordId
					}, {
						"Key": "IsNewRecord",
						"Value": initialMode
					}];
				if (!this.isEmpty(textEntityId)) {
					values.push({
						"Key": "EnrchTextEntity",
						"Value": textEntityId
					});
				}
				return values;
			},

			/**
			 * Creates Contact item column values array.
			 * @private
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @return {Object[]} Contact column values array.
			 */
			getContactColumnValues: function(contactRecordId) {
				var isNewRecord = this.getIsNewContact();
				var contactName = this.getIsNeedCreateContact()
					? this.get("ContactName")
					: this.get("ContactLookupColumn").displayValue;
				var values = [{
					"Key": "Id",
					"Value": contactRecordId
				}, {
					"Key": "Name",
					"Value": contactName
				}, {
					"Key": "IsNewRecord",
					"Value": isNewRecord
				}];
				var isAccountChecked = this.get("IsAccountChecked");
				if (isAccountChecked) {
					var accountName = this.get("AccountName");
					var account = this.get("Account");
					var isAccountExists = (account && account.displayValue === accountName);
					values.push({
						"Key": "Account",
						"Value": isAccountExists ? account.value : accountName
					});
				}
				return values;
			},

			/**
			 * Returns selected contact communication items collection.
			 * @private
			 * @return {Terrasoft.BaseViewModelCollection} Selected contact communication items collection.
			 */
			getCommunicationItems: function() {
				var collection = this.get("EnrichmentDataCollection");
				return collection.filterByFn(function(item) {
					return item.get("IsChecked");
				});
			},

			/**
			 * Returns rejected contact communication items collection.
			 * @private
			 * @return {Terrasoft.BaseViewModelCollection} Processed contact communication items collection.
			 */
			getProcessedItems: function() {
				return this.get("EnrchSaveDataCollection").filterByFn(function(item) {
					return !this.isEmpty(item.Hash);
				}, this);
			},

			/**
			 * Creates save enriched data config.
			 * @private
			 * @return {Object} Save enriched data config.
			 */
			getSaveRequestConfig: function() {
				var contactRecordId = this.getContactId();
				var data = [];
				this.setContactEnrichDataItems(contactRecordId, data);
				this.setContactCommunicationEnrichDataItems(contactRecordId, data);
				this.setFoundContactEnrichDataItems(contactRecordId, data);
				this.setProcessEnrichDataItems(contactRecordId, data);
				this.setEnrichEmailDataItems(data);
				return {
					serviceName: "EnrichContactService",
					methodName: "SaveEnrichedData",
					data: {
						"rawData": data
					}
				};
			},

			/**
			 * Stop hiding contact enrichment container by clicking outside enrichment window.
			 * @private
			 */
			stopHidingEnrichmentContainer: Terrasoft.emptyFn,

			//endregion

			//region Methods: Protected

			/**
			 * Returns contact communication key columns.
			 * @protected
			 * @virtual
			 * @return {String []} Contact communication key columns.
			 */
			getContactCommunicationKeyColumns: function() {
				return ["Number", "Contact", "CommunicationType"];
			},

			/**
			 * Returns EnrchFoundContact key columns.
			 * @protected
			 * @virtual
			 * @return {String []} EnrchFoundContact key columns.
			 */
			getEnrchFoundContactKeyColumns: function() {
				return ["Contact"];
			},

			/**
			 * Returns EnrchProcessedData key columns.
			 * @protected
			 * @virtual
			 * @return {String []} EnrchProcessedData key columns.
			 */
			getProcessedItemsKeyColumns: function() {
				return ["Contact", "TextEntityHash"];
			},

			/**
			 * Adds enriched contact save properties to save parameters.
			 * @protected
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @param {Object[]} data Enriched items save parameters.
			 */
			setContactEnrichDataItems: function(contactRecordId, data) {
				var values = this.getContactColumnValues(contactRecordId);
				var saveItem = this.createEnrichSaveItem("Contact", 0, values);
				data.push(saveItem);
			},

			/**
			 * Checks communication item is valid.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item ContactCommunication instance.
			 * @return {Boolean} Truee if item valid for save, false othervise.
			 */
			checkCommunicationItemValid: function(item) {
				var number = item.get("Value");
				return !this.Ext.isEmpty(number);
			},

			/**
			 * Adds selected contact communications save properties to save parameters.
			 * @protected
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @param {Object[]} data Enriched items save parameters.
			 */
			setContactCommunicationEnrichDataItems: function(contactRecordId, data) {
				var communicationItems = this.getCommunicationItems();
				var keyColumns = this.getContactCommunicationKeyColumns();
				communicationItems.each(function(item) {
					if (this.checkCommunicationItemValid(item)) {
						var itemValues = this.createCommunicationItemValues(item, contactRecordId);
						var saveItem = this.createEnrichSaveItem("ContactCommunication", 1, itemValues, keyColumns);
						data.push(saveItem);
					}
				}, this);
			},

			/**
			 * Adds EnrchFoundContact save properties to save parameters.
			 * @protected
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @param {Object[]} data Enriched items save parameters.
			 */
			setFoundContactEnrichDataItems: function(contactRecordId, data) {
				var values = this.getEnrchFoundContactValues(contactRecordId);
				var keyColumns = this.getEnrchFoundContactKeyColumns();
				var saveItem = this.createEnrichSaveItem("EnrchFoundContact", 2, values, keyColumns);
				data.push(saveItem);
			},

			/**
			 * Adds rejected contact communications save properties to save parameters.
			 * @protected
			 * @param {String} contactRecordId Contact instance unique identifier.
			 * @param {Object[]} data Enriched items save parameters.
			 */
			setProcessEnrichDataItems: function(contactRecordId, data) {
				var processedItems = this.getProcessedItems();
				var keyColumns = this.getProcessedItemsKeyColumns();
				processedItems.each(function(item) {
					var itemValues = this.createProcessedItemValues(item, contactRecordId);
					var saveItem = this.createEnrichSaveItem("EnrchProcessedData", 3, itemValues, keyColumns);
					data.push(saveItem);
				}, this);
			},

			/**
			 * Adds EnrchEmailData save properties to save parameters.
			 * @protected
			 * @param {Object[]} data Enriched items save parameters.
			 */
			setEnrichEmailDataItems: function(data) {
				var itemValues = this.createEnrichEmailDataValues();
				var saveItem = this.createEnrichSaveItem("EnrchEmailData", 4, itemValues);
				data.push(saveItem);
			},

			/**
			 * Returns contact instance unique identifier.
			 * @protected
			 * @return {String} Contact instance unique identifier.
			 */
			getContactId: function() {
				var contactId = this.get("ContactId");
				var isNewContact = this.isEmpty(contactId) || Terrasoft.isEmptyGUID(contactId);
				return isNewContact ? this.Terrasoft.generateGUID() : contactId;
			},

			/**
			 * Returns save button hint text.
			 * @protected
			 * @return {String} Save button hint text.
			 */
			getSaveButtonHint: function() {
				var limitations = this.get("ContactEditLimitations");
				if (!this.Ext.isEmpty(limitations)) {
					return limitations;
				}
				var contactId = this.get("ContactId");
				var isNewContact = this.isEmpty(contactId) || Terrasoft.isEmptyGUID(contactId);
				return isNewContact
					? this.get("Resources.Strings.SaveNewContactHint")
					: this.get("Resources.Strings.UpdateContactHint");
			},

			/**
			 * Gets if contact does not exist in database.
			 * @protected
			 * @return {Terrasoft.InsertQuery} Sign that contact does not exist in database.
			 */
			getIsNewContact: function() {
				var contactId = this.get("ContactId");
				return this.isEmpty(contactId) || this.Terrasoft.isEmptyGUID(contactId);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.set("AccountList", Ext.create("Terrasoft.Collection"));
				this.on("change:ContactLookupColumn", this.onContactLookupColumnChanged, this);
				this.callParent([function() {
					this.Terrasoft.chain(
						this.checkContactRights,
						function(next) {
							this.Terrasoft.SysSettings.querySysSettingsItem("DefaultContactCommunicationType",
									function(value) {
								this.set("DefaultContactCommunicationType", value);
								next();
							}, this);
						},
						this.loadEnrchTypeMapping,
						function() {
							this.setInitialEnrichMode();
							this.setInitialLookupContact();
							this.Ext.callback(callback, scope);
						},
						this
					);
				}, this]);
			},

			/**
			 * Checks user has contact edit rights.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {[type]} scope Callback function scope.
			 */
			checkContactRights: function(callback, scope) {
				RightUtilities.checkCanEdit({
					schemaName: "Contact",
					primaryColumnValue: this.getContactId(),
					isNew: this.getIsNewContact()
				}, function(result) {
					var hasEditRights = this.isEmpty(result);
					this.set("SaveButtonEnabled", hasEditRights);
					this.set("ContactEditLimitations", result);
					this.Ext.callback(callback, scope || this);
				},
				this);
			},

			/**
			 * Event handler for document keydown event.
			 * @protected
			 * @param {Object} event Event object.
			 */
			onKeyDown: function(event) {
				if (event && event.keyCode === Ext.EventObject.ESC) {
					this.hideModule();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#hideModule
			 * @overridden
			 */
			hideModule: function() {
				this.sandbox.publish("ContactEnrichmentPageVisibilityChanged", this.Ext.encode({isVisible: false}));
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getEntitySchemaQuery
			 * @overridden
			 */
			getEntitySchemaQuery: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#executeEnrichmentDataService
			 * @overridden
			 */
			executeEnrichmentDataService: function(callback, scope) {
				var parameters = this.getEnrichmentDataServiceParameters();
				this.callService({
					serviceName: "EnrichContactService",
					methodName: parameters.methodName,
					data: parameters.data
				}, function(response) {
					this.Ext.callback(callback, scope, [response]);
				}, scope);
			},

			/**
			/**
			 * Returns EnrichContactService service parameters.
			 * @protected
			 */
			getEnrichmentDataServiceParameters: function() {
				var parameters = {};
				var data = parameters.data = {};
				if (!this.getIsNewContact()) {
					data.contactId = this.get("ContactId");
					parameters.methodName = "GetTextDataForExistContact";
				} else {
					data.textDataId = this.get("EnrchTextDataId");
					parameters.methodName = "GetTextDataForNewContact";
				}
				return parameters;
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getItemCaption
			 * @overridden
			 */
			getItemCaption: function(item) {
				return item.get("TypeName");
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#selectExistingEnrichedData
			 * @overridden
			 */
			selectExistingEnrichedData: Terrasoft.emptyFn,

			/**
			 * Sets initial enrich mode.
			 * @protected
			 */
			setInitialEnrichMode: function() {
				var initialMode = this.getIsNewContact();
				this.set("InitialMode", initialMode);
				this.set("NeedCreateContact", initialMode);
			},

			/**
			 * Sets initial contact lookup value.
			 * @protected
			 */
			setInitialLookupContact: function() {
				if (!this.getIsNewContact()) {
					var contact = {
						value: this.get("ContactId"),
						displayValue: this.get("ContactName")
					};
					this.set("ContactLookupColumn", contact);
				}
			},

			/**
			 * Returns if contact needs to be created.
			 * @protected
			 * @return {Boolean} Sign that contact needs to be created.
			 */
			getIsNeedCreateContact: function() {
				return this.get("NeedCreateContact");
			},

			/**
			 * Returns if contact needs to be enriched.
			 * @protected
			 * @return {Boolean} Sign that contact needs to be enriched.
			 */
			getIsNeedEnrichContact: function() {
				return !this.get("NeedCreateContact");
			},

			/**
			 * Loads enrch type mappings.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			loadEnrchTypeMapping: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "EnrchTypeMapping",
					clientESQCacheParameters: {
						cacheItemName: "ContactEnrichmentSchema_EnrchTypeMapping"
					}
				});
				esq.addColumn("EnrchType");
				esq.addColumn("CommunicationType");
				esq.getEntityCollection(function(response) {
					if (this.isEmpty(response)) {
						this.Ext.callback(callback, scope || this);
						return;
					}
					var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					var responseCollection = response.collection;
					collection.loadAll(responseCollection);
					this.set("EnrchTypeMappingCollection", collection);
					this.onEnrchTypeMappingLoaded(callback, scope);
				}, this);
			},

			/**
			 * Handles enrch type mappings loaded event.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			onEnrchTypeMappingLoaded: function(callback, scope) {
				this.set("IsRefreshButtonVisible", false);
				this.executeEnrichmentDataService(function(response) {
					this.onLoadEnrichmentData(response);
					this.Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Returns sorted enrichment data collection.
			 * @param {Object[]} data Enrichment data array.
			 * @protected
			 */
			getEnrichmentDataList: function(data) {
				var dataCollection = this.Ext.create("Terrasoft.Collection");
				this.Terrasoft.each(data, function(dataElement) {
					dataCollection.add({
						Type: dataElement.Type,
						JsonData: dataElement.JsonData,
						Hash: dataElement.Hash,
						DuplicationStatus: dataElement.DuplicationStatus
					});
				}, this);
				dataCollection.sortByFn(function(element1, element2) {
					var value1 = Ext.decode(element1.JsonData);
					var value2 = Ext.decode(element2.JsonData);
					if (value1.type === value2.type) {
						return 0;
					}
					return (value1.type < value2.type) ? -1 : 1;
				});
				this.set("EnrchSaveDataCollection", dataCollection);
				return dataCollection;
			},

			/**
			 * Try append account info identified by organization enrich text entity.
			 * @private
			 * @param {Object} communication EnrchTextEntity item.
			 * @param {Object[]} accounts Array of identified accounts.
			 */
			setAccountByOrganizationEntity: function(communication, accounts) {
				var accountData = this.Ext.decode(communication.JsonData);
				var id = accountData.id;
				var foundAccount = Terrasoft.findWhere(accounts, {
					enrchTextEntityId: id
				});
				if (!Ext.isEmpty(foundAccount)) {
					this.setAccountAttributes(foundAccount.id, foundAccount.name);
				} else {
					this.set("AccountName", accountData.value);
				}
			},

			/**
			 * Set default account info.
			 * @private
			 * @param {Object[]} accounts Array of identified accounts.
			 */
			setDefaultAccountAttributes: function(accounts) {
				if (Ext.isEmpty(this.get("AccountName"))) {
					if (!Ext.isEmpty(accounts)) {
						var additionalAccount = Terrasoft.first(accounts);
						this.set("IsAccountEditVisible", true);
						this.setAccountAttributes(additionalAccount.id, additionalAccount.name);
					} else {
						this.set("AccountLink", {});
						this.set("Account", null);
					}
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#onLoadEnrichmentData
			 * @overridden
			 */
			onLoadEnrichmentData: function(response) {
				var result = response.CloudTextDataResponse;
				if (!result) {
					return;
				}
				var data = this.getEnrichmentDataList(result.data);
				var accounts = result.foundAccounts;
				var responseCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				var enrchTypeMappingCollection = this.get("EnrchTypeMappingCollection");
				var enrchTextEntityCommunicationType = this.get("EnrchTextEntityCommunicationType");
				var enrchTextEntityAccountype = this.get("EnrchTextEntityAccountType");
				data.each(function(communication) {
					if (communication.Type !== enrchTextEntityCommunicationType) {
						if (communication.Type === enrchTextEntityAccountype) {
							this.set("IsAccountEditVisible", true);
							this.setAccountByOrganizationEntity(communication, accounts);
						}
						return;
					}
					var enrichmentDataItem = this.getEnrichmentDataItem(communication, enrchTypeMappingCollection);
					if (this.isNotEmpty(enrichmentDataItem)) {
						responseCollection.addItem(enrichmentDataItem);
					}
				}, this);
				this.setDefaultAccountAttributes(accounts);
				response.collection = responseCollection;
				this.callParent([response]);
			},

			/**
			 * Checks if account by name exists.
			 * @protected
			 * @param {String} name Account name.
			 */
			checkIfAccountExists: function(name) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Account",
					rowCount: 1
				});
				esq.addColumn("Id");
				esq.filters.add("startFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Name", name));
				esq.getEntityCollection(function(response) {
					if (response.collection.getCount() === 0) {
						this.set("AccountLink", {});
						this.set("Account", null);
						return;
					}
					var id = response.collection.getByIndex(0).get("Id");
					this.setAccountAttributes(id, name);
				}, this);
			},

			/**
			 * Sets account attributes.
			 * @protected
			 * @param {String} id Account identifier.
			 * @param {String} name Account name.
			 */
			setAccountAttributes: function(id, name) {
				var relativeUrl = NetworkUtilities.getEntityUrl("Account", id);
				var viewModuleUrl = "ViewModule.aspx#";
				var url = this.Terrasoft.combinePath(viewModuleUrl, relativeUrl);
				var account = {
					value: id,
					displayValue: name
				};
				this.set("Account", account);
				var link = {
					url: url,
					caption: name
				};
				this.set("AccountLink", link);
				this.set("AccountName", name);
			},

			/**
			 * Change enrichment mode.
			 * @protected
			 */
			changeEnrichmentMode: function() {
				this.set("NeedCreateContact", this.getIsNeedEnrichContact());
				if (this.getIsNeedCreateContact()) {
					this.set("ContactId", "");
				} else {
					var contact = this.get("ContactLookupColumn");
					this.set("ContactId", contact ? contact.value : "");
					this.validateColumn("ContactLookupColumn");
				}
			},

			/**
			 * Handles AccountEdit blur event.
			 * @private
			 */
			onAccountEditBlur: function() {
				this.set("AccountLink", {});
				var name = this.get("AccountName");
				this.checkIfAccountExists(name);
			},

			/**
			 * Returns enrichment data item.
			 * @private
			 * @param {Object} communication Enrichment data communication.
			 * @param {Terrasoft.BaseViewModelCollection} enrchTypeMappingCollection Enrch type mapping collection.
			 */
			getEnrichmentDataItem: function(communication, enrchTypeMappingCollection) {
				if (communication.DuplicationStatus ===
						this.Terrasoft.EmailMiningEnums.EnrchDuplicateStatus.EXISTS_IN_ENTITY) {
					return null;
				}
				var communicationData = this.Ext.decode(communication.JsonData);
				var value = communicationData.value;
				var enrchType = communicationData.type;
				var communicationTypes = enrchTypeMappingCollection.filterByFn(function(enrchTypeMapping) {
					return enrchTypeMapping.get("EnrchType") === enrchType;
				}, this);
				var communicationType = (communicationTypes.getCount() === 1)
					? communicationTypes.getByIndex(0).get("CommunicationType")
					: this.get("DefaultContactCommunicationType");
				var item = this.Ext.create("Terrasoft.BaseEnrichmentViewModel", {
					values: {
						Value: value,
						Type: communicationType.value,
						TypeName: communicationType.displayValue,
						TextEntityHash: communication.Hash,
						IsChecked: true,
						CategoryTag: communicationType.displayValue
					}
				});
				return item;
			},

			/**
			 * Returns contact enrichment page header caption.
			 * @protected
			 * @param {String} tag Control tag.
			 */
			getContactEnrichmentHeaderCaption: function(tag) {
				var enrichMode =  tag === "ContactEnrichmentHeaderCaption"
					? this.getIsNeedCreateContact()
					: this.getIsNeedEnrichContact();
				return enrichMode
					? this.get("Resources.Strings.AddContactCaption")
					: this.get("Resources.Strings.EnrichContactCaption");
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#getHeaderCaption
			 * @overridden
			 */
			getHeaderCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#loadCommunicationTypes
			 * @overridden
			 */
			loadCommunicationTypes: function(callback, scope) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "CommunicationType",
					clientESQCacheParameters: {
						cacheItemName: "ContactEnrichmentSchema_CommunicationType"
					}
				});
				var filter = this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"UseforContacts", true);
				esq.filters.addItem(filter);
				esq.getEntityCollection(function(response) {
					this.onLoadCommunicationTypes(response);
					this.Ext.callback(callback, scope || this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#saveData
			 * @overridden
			 */
			saveData: function() {
				var needCreateContact = this.getIsNeedCreateContact();
				var isContactEmpty = needCreateContact
					? this.isEmpty(this.get("ContactName"))
					: this.isEmpty(this.get("ContactLookupColumn"));
				if (isContactEmpty) {
					return;
				}
				this.showBodyMask({
					selector: this.get("MaskSelector"),
					timeout: 0
				});
				var lastAction = needCreateContact ? "Save" : "SaveEnrich";
				this.set("LastAction", lastAction);
				var requestConfig = this.getSaveRequestConfig();
				this.callService(requestConfig, function() {
					this.hideBodyMask({selector: this.get("MaskSelector")});
					this.hideModule();
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseEnrichmentSchema#onLastActionChanged
			 * @overridden
			 */
			onLastActionChanged: function() {
				this.sendGoogleTagManagerData(true);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#getGoogleTagManagerData
			 * @overridden
			 */
			getGoogleTagManagerData: function() {
				var data = this.callParent(arguments);
				var action = this.get("LastAction");
				var callerSource = this.get("CallerSource");
				if (!this.Ext.isEmpty(action)) {
					this.Ext.apply(data, {
						moduleName: "DataEnrichment",
						schemaName: "ContactDataEnrichment",
						source: callerSource,
						action: action
					});
				}
				return data;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#sendGoogleTagManagerData
			 * @overridden
			 */
			sendGoogleTagManagerData: function(isTrackingAction) {
				if (isTrackingAction) {
					this.callParent(arguments);
				}
			},

			/**
			 * Returns change enrich mode button visibility.
			 * @return {Boolean} Change enrich mode button visibility.
			 */
			getChangeEnrchModeVisible: function() {
				return this.get("CallerSource") !== "ContactPageV2";
			},

			/**
			 * Returns contact lookup field enabled.
			 * @return {Boolean} Contact lookup field enabled.
			 */
			getSelectContactEnabled: function() {
				return this.getChangeEnrchModeVisible();
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[{
				"operation": "merge",
				"name": "EnrichmentContainerWrapper",
				"values": {
					"wrapClass": ["enrichment-container-wrapper enrichment-contact-container-wrapper"],
					"alignToEl": null,
					"onHideContainer": {"bindTo": "stopHidingEnrichmentContainer"},
					"hideOnDocEvents": false,
					"showOverlay": true,
					"onKeyDown": {"bindTo": "onKeyDown"}
				}
			},
			{
				"operation": "insert",
				"name": "ContactHeaderEnrichmentContainer",
				"parentName": "EnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["contact-header-enrichment-container"],
					"items": [],
					"visible": {"bindTo": "IsDataLoaded"}
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContactChangeEnrichModeContainer",
				"parentName": "ContactHeaderEnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["contact-change-enrich-mode-container"],
					"items": [],
					"visible": {"bindTo": "IsDataLoaded"}
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContactEditContainer",
				"parentName": "ContactHeaderEnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["contact-edit-container"],
					"items": [],
					"visible": {"bindTo": "IsDataLoaded"}
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContactEnrichmentHeaderCaption",
				"parentName": "ContactChangeEnrichModeContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					className: "Terrasoft.Label",
					caption: {bindTo: "getContactEnrichmentHeaderCaption"},
					tag: "ContactEnrichmentHeaderCaption",
					classes: {
						labelClass: ["contact-enrichment-header-caption", "unimportant"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ChangeEnrichModeButton",
				"parentName": "ContactChangeEnrichModeContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"visible": {"bindTo": "getChangeEnrchModeVisible"},
					"tag": "ChangeEnrichModeButton",
					"classes": {
						"textClass": "change-enrichment-mode-button"
					},
					"click": {"bindTo": "changeEnrichmentMode"},
					"caption": {bindTo: "getContactEnrichmentHeaderCaption"}
				}
			},
			{
				"operation": "insert",
				"name": "ContactNameEdit",
				"parentName": "ContactEditContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					className: "Terrasoft.TextEdit",
					value: {bindTo: "ContactName"},
					classes: {
						wrapClass: "contact-name-edit"
					},
					"visible": {"bindTo": "getIsNeedCreateContact"}
				}
			},
			{
				"operation": "insert",
				"name": "ContactLookupColumn",
				"parentName": "ContactEditContainer",
				"propertyName": "items",
				"values": {
					"labelConfig": {"visible": false},
					"value": {"bindTo": "ContactLookupColumn"},
					"classes": {"editInputClass": "contact-lookup-edit"},
					"visible": {"bindTo": "getIsNeedEnrichContact"},
					"enabled": {"bindTo": "getSelectContactEnabled"}
				}
			},
			{
				"operation": "insert",
				"name": "AdditionalDataEnrichmentContainer",
				"parentName": "EnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["additional-data-enrichment-container"],
					"items": [],
					"visible": {"bindTo": "IsDataLoaded"}
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "AdditionalDataEnrichmentHeaderCaption",
				"parentName": "AdditionalDataEnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					className: "Terrasoft.Label",
					caption: {"bindTo": "Resources.Strings.AdditionalDataEnrichmentCaption"},
					classes: {
						labelClass: ["additional-data-enrichment-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AccountDataEnrichmentContainer",
				"parentName": "AdditionalDataEnrichmentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["account-data-enrichment-container"],
					"items": [],
					"visible": {"bindTo": "IsAccountEditVisible"}
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "AccountCheckBoxEdit",
				"parentName": "AccountDataEnrichmentContainer",
				"propertyName": "items",
				"markerValue": {"bindTo": "AccountCheckBoxEdit"},
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					className: "Terrasoft.CheckBoxEdit",
					classes: {
						wrapClass: ["account-checkbox"]
					},
					"checked": {"bindTo": "IsAccountChecked"}
				}
			},
			{
				"operation": "insert",
				"name": "AccountCaption",
				"parentName": "AccountDataEnrichmentContainer",
				"propertyName": "items",
				"markerValue": {"bindTo": "AccountCaption"},
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					className: "Terrasoft.Label",
					caption: {"bindTo": "Resources.Strings.AccountCaption"},
					classes: {
						labelClass: ["account-caption"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "AccountEdit",
				"parentName": "AccountDataEnrichmentContainer",
				"propertyName": "items",
				"markerValue": {"bindTo": "AccountEdit"},
				"values": {
					labelConfig: {visible: false},
					bindTo: "AccountName",
					classes: {
						editInputClass: "account-edit"
					},
					showValueAsLink: true,
					href: {bindTo: "AccountLink"},
					linkclick: {bindTo: "hideModule"},
					blur: {bindTo: "onAccountEditBlur"},
					showExpandableListOnFocus: false,
					"controlConfig": {
						"enableRightIcon": true,
						"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
						"rightIconClick": {
							"bindTo": "openAccountLookup"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "EnrichmentSaveButton",
				"values": {
					"hint": {"bindTo": "getSaveButtonHint"},
					"visible": true,
					"enabled": {"bindTo": "SaveButtonEnabled"}
				}
			}]/**SCHEMA_DIFF*/
	};
});


