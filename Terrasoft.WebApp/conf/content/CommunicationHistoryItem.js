Terrasoft.configuration.Structures["CommunicationHistoryItem"] = {innerHierarchyStack: ["CommunicationHistoryItem"]};
define('CommunicationHistoryItemStructure', ['CommunicationHistoryItemResources'], function(resources) {return {schemaUId:'469b02ea-8a75-4c1b-9302-a9d3cb2a7020',schemaCaption: "Communication panel history schema", parentSchemaName: "", schemaName:'CommunicationHistoryItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("CommunicationHistoryItem", ["terrasoft", "CtiConstants", "NetworkUtilities", "ConfigurationEnums",
			"ConfigurationConstants", "NetworkUtilities", "CtiBaseHelper", "LookupQuickAddMixin",
			"EntityConnectionLinksPanelItemUtilities"],
		function(Terrasoft, CtiConstants, NetworkUtilities, ConfigurationEnums, ConfigurationConstants,
				 NetworkUtilities) {
			return {
				messages: {

					/**
					 * Message to get current history state.
					 */
					"GetHistoryState": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * Message to get card module response after saving.
					 */
					"CardModuleResponse": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},

				mixins: {
					/**
					 * @class LookupQuickAddMixin Lookup quick add new record mixin.
					 */
					LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin",

					/**
					 * @class EntityConnectionLinksPanelItemUtilities Entity connection panel item mixin.
					 */
					EntityConnectionLinksPanelItemUtilities: "Terrasoft.EntityConnectionLinksPanelItemUtilities"
				},

				attributes: {

					/**
					 * Calls history panel element identifier.
					 */
					"Id": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Call identifier in the database.
					 */
					"DatabaseUId": {
						"dataValueType": Terrasoft.DataValueType.GUID,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers identifier.
					 */
					"SubscriberId": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers type.
					 */
					"Type": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers name.
					 */
					"Name": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers photo identifier.
					 */
					"Photo": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers department.
					 */
					"Department": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers position.
					 */
					"Job": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Contractors type.
					 */
					"AccountType": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Contractors city.
					 */
					"City": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Customers number.
					 */
					"Number": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Call type.
					 */
					"CallType": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": ""
					},

					/**
					 * Is call connections container visible.
					 */
					"IsCallConnectionsVisible": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": false
					},

					/**
					 * Array of relation column names.
					 * @private
					 * @type {String[]}
					 */
					"EntityConnectionColumnList": {
						"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
					},

					/**
					 * Sign, that lookup is visible.
					 * @private
					 * @type {Boolean}
					 */
					"IsLookupVisible": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": false
					},

					/**
					 * Name of the current relation column.
					 * @private
					 * @type {String}
					 */
					"CurrentColumnName": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": ""
					},

					/**
					 * Value of the current relation column.
					 * @private
					 * @type {Object}
					 */
					"CurrentColumnValue": {
						dataValueType: Terrasoft.DataValueType.VIRTUAL_COLUMN,
						isLookup: true
					},

					/**
					 * Collection of the possible relations.
					 * @private
					 * @type {Terrasoft.Collection}
					 */
					"CurrentRelationItemsList": {
						"dataValueType": Terrasoft.DataValueType.COLLECTION,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"isCollection": true
					},

					/**
					 * Count of the displayed values for relation lookup.
					 * @private
					 * @type {Number}
					 */
					"CurrentRelationRowCount": {
						"dataValueType": this.Terrasoft.DataValueType.INTEGER,
						"value": 5
					},

					/**
					 * Sign, that new relation lookup is visible.
					 * @private
					 * @type {Boolean}
					 */
					"IsAddNewRelationVisible": {
						"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
						"value": true
					},

					/**
					 * Sign that indicates is connection to the telephony server established.
					 * @private
					 * @type {Boolean}
					 */
					"IsTelephonyAvailable": {
						"dataValueType": Terrasoft.DataValueType.BOOLEAN,
						"value": true
					}
				},
				methods: {

					//region Constructors

					/**
					 * @inheritdoc Terrasoft.BaseViewModel#constructor
					 */
					constructor: function() {
						this.callParent(arguments);
						this.subscribeOnConnectedRecordAttributesChanges();
						this.initDefaultColumnName();
						this.set("CurrentRelationItemsList", this.Ext.create("Terrasoft.Collection"));
						Terrasoft.CtiModel.on("connected", function() {
							this.set("IsTelephonyAvailable", true);
						}, this);
						Terrasoft.CtiModel.on("disconnected", function() {
							this.set("IsTelephonyAvailable", false);
						}, this);
					},

					//endregion

					//region Methods: Private

					/**
					 * Returns customer photo configuration or contractor icon configuration.
					 * @private
					 * @returns {Object} Image configuration.
					 */
					getPhoto: function() {
						var subscriberType = this.get("Type");
						var photoId = this.get("Photo");
						if (!this.get("SubscriberId")) {
							return this.get("Resources.Images.ContactAnonymousPhoto");
						}
						if (subscriberType === CtiConstants.SubscriberTypes.Account) {
							return this.get("Resources.Images.AccountIdentifiedPhoto");
						}
						if (Ext.isEmpty(photoId) || Terrasoft.isEmptyGUID(photoId)) {
							return this.get("Resources.Images.ContactEmptyPhotoWhite");
						}
						var photoConfig = {
							source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
							params: {
								schemaName: "SysImage",
								columnName: "Data",
								primaryColumnValue: photoId
							}
						};
						return {
							source: Terrasoft.ImageSources.URL,
							url: Terrasoft.ImageUrlBuilder.getUrl(photoConfig)
						};
					},

					/**
					 * Returns configuration of call type image.
					 * @private
					 * @returns {Object} Call type image configuration.
					 */
					getCallTypeIcon: function() {
						var callType = this.get("CallType");
						var callTypeIcon;
						switch (callType) {
							case CtiConstants.CallType.INCOMING:
								callTypeIcon = this.get("Resources.Images.IncomingCallIcon");
								break;
							case CtiConstants.CallType.OUTGOING:
								callTypeIcon = this.get("Resources.Images.OutgoingCallIcon");
								break;
							case CtiConstants.CallType.MISSED:
								callTypeIcon = this.get("Resources.Images.MissedIconCall");
								break;
							default:
								break;
						}
						return callTypeIcon;
					},

					/**
					 * Gets visibility of the data of the identification number.
					 * @private
					 * @returns {Boolean} Visibility of the data.
					 */
					getIsNumberButtonVisible: function() {
						var subscriberType = this.get("Type");
						return !Ext.isEmpty(subscriberType);
					},

					/**
					 * Returns sign if number link is active.
					 * @private
					 * @returns {Boolean}
					 */
					getIsNameLinkAvailable: function() {
						var schemaName = this.getTypeSchemaName();
						var isTelephonyAvailable = this.get("IsTelephonyAvailable");
						return !Ext.isEmpty(schemaName) || isTelephonyAvailable;
					},

					/**
					 * Returns schema name by type.
					 * @private
					 * @return {String} Schema name.
					 */
					getTypeSchemaName: function() {
						var subscriberType = this.get("Type");
						var ctiModel = Terrasoft.CtiModel;
						return (!this.Ext.isEmpty(subscriberType))
							? ctiModel.getEntitySchemaNameBySubscriberType(subscriberType)
							: null;
					},

					/**
					 * Handles click on subscribers number.
					 * @private
					 */
					onNumberClick: function() {
						var ctiModel = Terrasoft.CtiModel;
						var subscriberType = this.get("Type");
						var entitySchemaName = ctiModel.getEntitySchemaNameBySubscriberType(subscriberType);
						var number = this.get("Number");
						if (!Ext.isEmpty(subscriberType)) {
							var subscriberInfo = {
								number: number,
								customerId: this.get("SubscriberId"),
								entitySchemaName: entitySchemaName
							};
							ctiModel.set("AdvisedIdentifiedSubscriberInfo", subscriberInfo);
						}
						ctiModel.callByNumber(number);
					},

					/**
					 * Update call with new column value.
					 * @private
					 * @param {Object} value New value.
					 * @param {String} columnName Column name.
					 */
					updateCall: function(value, columnName) {
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "Call"
						});
						var databaseId = this.get("DatabaseUId");
						if (!databaseId) {
							return;
						}
						var filters = update.filters;
						var idFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"Id", databaseId);
						filters.add("IdFilter", idFilter);
						if (Ext.isObject(value)) {
							value = value.value;
						}
						update.setParameterValue(columnName, value || null, Terrasoft.DataValueType.GUID);
						update.execute(this.updateCallCallback.bind(this, null, null));
					},

					/**
					 * Processes column value change event.
					 * @private
					 * @param {Object} value New value.
					 * @param {Object} columnName Column name.
					 */
					processColumnValueChange: function(value, columnName) {
						var currentColumnName = this.get("CurrentColumnName");
						if (this.Ext.isEmpty(columnName) && !this.get("IsAddNewRelationVisible")) {
							return;
						}
						if (!this.Ext.isEmpty(columnName)) {
							currentColumnName = columnName;
						}
						if (this.Ext.isEmpty(currentColumnName)) {
							return;
						}
						var prevValue = this.get(currentColumnName);
						if (prevValue === value) {
							return;
						}
						if (value != null && value.value === Terrasoft.GUID_EMPTY) {
							value.isNewValue = true;
							this.mixins.LookupQuickAddMixin.onLookupChange.call(this, value, currentColumnName);
						} else {
							this.set(currentColumnName, value);
							this.initDefaultColumnName();
						}
					},

					/**
					 * Vocabulary select value callback function.
					 * @private
					 * @param {Object} args Callback parameters.
					 */
					onLookupResult: function(args) {
						var columnName = args.columnName;
						var selectedRows = args.selectedRows;
						if (!selectedRows.isEmpty()) {
							this.processColumnValueChange(selectedRows.getByIndex(0), columnName);
						}
					},

					/**
					 * Handles column value change event.
					 * @private
					 * @param {String} value New value.
					 * @param {String} columnName Column name.
					 */
					onColumnValueChange: function(value, columnName) {
						this.processColumnValueChange(value, columnName);
					},

					/**
					 * Opens select vocabulary value page.
					 * @private
					 * @param {Object} args Parameters.
					 * @param {Object} columnName Column name.
					 */
					loadVocabulary: function(args, columnName) {
						var currentColumnName = columnName || this.get("CurrentColumnName");
						var config = {
							entitySchemaName: currentColumnName,
							columnName: currentColumnName,
							columnValue: this.get(currentColumnName),
							searchValue: args.searchValue
						};
						Terrasoft.LookupUtilities.Open({
							"lookupConfig": config,
							"sandbox": this.sandbox
						}, this.onLookupResult.bind(this), this);
					},

					/**
					 * Clears default column.
					 * @private
					 * @param {String} columnName Column name.
					 */
					clearColumn: function(columnName) {
						this.initDefaultColumnName();
						this.set(columnName, null);
					},

					//endregion

					//region Methods: Protected

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#onLinkClick
					 * @overridden
					 */
					onLinkClick: function(url, columnName) {
						var column = this.getColumnByName(columnName);
						if (!column) {
							return true;
						}
						var columnValue = this.get(columnName);
						var entitySchemaName = column.referenceSchemaName;
						var hash = NetworkUtilities.getEntityUrl(entitySchemaName, columnValue.value);
						this.sandbox.publish("PushHistoryState", {hash: hash});
						return false;
					},

					/**
					 * Determines whether additional subscriber data is visible.
					 * @protected
					 * @return {Boolean} If visible - true, otherwise - false.
					 */
					getIsSubscriberDataVisible: function() {
						var subscriberType = this.get("Type");
						var isVisible;
						switch (subscriberType) {
							case CtiConstants.SubscriberTypes.Contact:
								isVisible = !Ext.isEmpty(this.get("Account")) || !Ext.isEmpty(this.get("Job"));
								break;
							case CtiConstants.SubscriberTypes.Employee:
								isVisible = !Ext.isEmpty(this.get("Department")) || !Ext.isEmpty(this.get("Job"));
								break;
							case CtiConstants.SubscriberTypes.Account:
								isVisible = !Ext.isEmpty(this.get("AccountType")) || !Ext.isEmpty(this.get("City"));
								break;
							default:
								isVisible = false;
								break;
						}
						return isVisible;
					},

					/**
					 * Returns caption for additional subscriber data according to its type.
					 * @protected
					 * @return {String} Additional subscriber data.
					 */
					getSubscriberData: function() {
						var subscriberData = [];
						var subscriberType = this.get("Type");
						var account = this.get("Account");
						var job = this.get("Job");
						var department = this.get("Department");
						var accountType = this.get("AccountType");
						var city = this.get("City");
						switch (subscriberType) {
							case CtiConstants.SubscriberTypes.Contact:
								if (account) {
									subscriberData.push(account.displayValue);
								}
								if (job) {
									subscriberData.push(job);
								}
								break;
							case CtiConstants.SubscriberTypes.Employee:
								if (department) {
									subscriberData.push(department);
								}
								if (job) {
									subscriberData.push(job);
								}
								break;
							case CtiConstants.SubscriberTypes.Account:
								if (accountType) {
									subscriberData.push(accountType);
								}
								if (city) {
									subscriberData.push(city);
								}
								break;
							default:
								break;
						}
						return subscriberData.join(", ");
					},

					/**
					 * Opens new record card. Subscribes on card saved message.
					 * @protected
					 * @param {String} entitySchemaName Entity schema name.
					 * @param {String} pageSchemaName Page schema name.
					 * @param {Object[]} [valuePairs] Array of configuration objects with records default values where
					 * each object's key represents column's name, value - column's default value.
					 */
					openNewRecordCard: function(entitySchemaName, pageSchemaName, valuePairs) {
						var moduleId = this.Terrasoft.generateGUID();
						this.sandbox.subscribe("CardModuleResponse", function(savedRecordConfig) {
							this.sandbox.unsubscribePtp("CardModuleResponse", [moduleId]);
							this.onNewConnectedItemCreated(entitySchemaName, savedRecordConfig);
						}, this, [moduleId]);
						var historyState = this.sandbox.publish("GetHistoryState");
						this.sandbox.publish("PushHistoryState", {
							hash: historyState.hash.historyState,
							stateObj: {
								isSeparateMode: true,
								schemaName: pageSchemaName,
								entitySchemaName: entitySchemaName,
								operation: ConfigurationEnums.CardStateV2.ADD,
								valuePairs: valuePairs,
								isInChain: true
							}
						});
						this.sandbox.loadModule("CardModuleV2", {
							renderTo: "centerPanel",
							keepAlive: true,
							id: moduleId
						});
					},

					/**
					 * Fetches connected record from database.
					 * @protected
					 * @param {String} schemaName Entity schema name.
					 * @param {String} recordId Connected record database identifier.
					 * @param {Function} callback The callback function.
					 * @param {Terrasoft.BaseViewModel} callback.connectedRecordData View model of the connected record.
					 */
					getConnectedRecordData: function(schemaName, recordId, callback) {
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: schemaName});
						esq.addColumn("Id");
						esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, 'displayValue');
						this.prepareEntitySchemaQueryOfConnectedRecord(esq, schemaName);
						esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Id", recordId));
						esq.execute(function(response) {
							callback(response.collection.getByIndex(0));
						}.bind(this));
					},

					/**
					 * Prepares entity schema query of the connected record according to its schema name.
					 * @protected
					 * @param {Terrasoft.EntitySchemaQuery} esq Connected record entity schema query.
					 * @param {String} schemaName Entity schema name.
					 */
					prepareEntitySchemaQueryOfConnectedRecord: function(esq, schemaName) {
						switch (schemaName) {
							case "Contact":
								esq.addColumn("Account");
								esq.addColumn("Department");
								esq.addColumn("Job");
								esq.addColumn("Type");
								esq.addColumn("Photo");
								break;
							case "Account":
								esq.addColumn("Type");
								esq.addColumn("City");
								break;
							default:
								break;
						}
					},

					/**
					 * Queries communication detail config for subscriber schema.
					 * @protected
					 * @param {String} schemaName Subscriber schema name.
					 * @param {Function} callback Callback function.
					 * @param {Object} callback.config Communication detail config.
					 * @param {String} callback.config.communicationDetailSchemaName Communication detail schema name.
					 * @param {String} callback.config.parentItemName Name of communication detail parent column.
					 * @param {String} callback.config.defaultCommunicationType Default communication type value.
					 */
					getSubscriberCommunicationInfo: function(schemaName, callback) {
						Terrasoft.CtiBaseHelper.queryCtiSettings(function(ctiSettings) {
							var config;
							switch (schemaName) {
								case "Contact":
									config = {
										communicationDetailSchemaName: "ContactCommunication",
										parentItemName: "Contact",
										defaultCommunicationType: ctiSettings.defaultContactCommunicationType.value
									};
									break;
								case "Account":
									config = {
										communicationDetailSchemaName: "AccountCommunication",
										parentItemName: "Account",
										defaultCommunicationType: ctiSettings.defaultAccountCommunicationType.value
									};
									break;
								default:
									break;
							}
							callback(config);
						});
					},

					/**
					 * Actualizes subscriber communications.
					 * @protected
					 * @param {String} schemaName Entity schema name of connected record.
					 * @param {String} subscriberId Subscriber's identifier.
					 * @param {Object} [communicationDetailConfig] Communication detail config.
					 * See callback config in {@link getSubscriberCommunicationInfo}.
					 * @param {Function} [callback] Callback function.
					 */
					actualizeSubscriberData: function(schemaName, subscriberId, communicationDetailConfig, callback) {
						if (!communicationDetailConfig) {
							if (callback) {
								callback();
							}
							return;
						}
						Terrasoft.CtiBaseHelper.queryCtiSettings(function(ctiSettings) {
							var number = this.get("Number");
							if (!number || number.length <= ctiSettings.internalNumberLength) {
								if (callback) {
									callback();
								}
								return;
							}
							this.updateSubscriberCommunicationNumber(
								communicationDetailConfig.communicationDetailSchemaName, number,
								communicationDetailConfig.parentItemName, subscriberId,
								communicationDetailConfig.defaultCommunicationType, callback);
						}.bind(this));
					},

					/**
					 * Creates new communication for the subscriber.
					 * @protected
					 * @param {String} communicationsSchemaName Schema name of communication detail entity.
					 * @param {String} number New communication value.
					 * @param {String} parentItemName Name of communications detail parent column.
					 * @param {String} subscriberId Subscriber's identifier.
					 * @param {String} communicationTypeId Type of the communication.
					 * @param {Function} [callback] Callback will be called, when update is finished.
					 * @param {Function} callback.isSuccess True if communication was updated in db, else - false.
					 * @param {Function} [callback.response] If error occurred, contains response of the failed
					 * request.
					 */
					updateSubscriberCommunicationNumber: function(communicationsSchemaName, number, parentItemName,
							subscriberId, communicationTypeId, callback) {
						callback = callback || Ext.emptyFn;
						if (!number) {
							callback(false);
							return;
						}
						var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
							rootSchemaName: communicationsSchemaName,
							rowCount: 1
						});
						esq.addColumn("Id");
						esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "CommunicationType", communicationTypeId,
							Terrasoft.DataValueType.GUID));
						esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, parentItemName, subscriberId,
							Terrasoft.DataValueType.GUID));
						esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Number", number, Terrasoft.DataValueType.TEXT));
						esq.execute(function(response) {
							if (!(response && response.success && response.collection)) {
								callback(false, response);
								return;
							}
							if (!response.collection.isEmpty()) {
								callback(true);
								return;
							}
							var insert = this.Ext.create("Terrasoft.InsertQuery", {
								rootSchemaName: communicationsSchemaName
							});
							insert.setParameterValue("CommunicationType", communicationTypeId,
								Terrasoft.DataValueType.GUID);
							insert.setParameterValue(parentItemName, subscriberId, Terrasoft.DataValueType.GUID);
							insert.setParameterValue("Number", number, Terrasoft.DataValueType.TEXT);
							insert.execute(function() {
								if (!(response && response.success)) {
									callback(false, response);
									return;
								}
								callback(true);
							});
						}, this);
					},

					/**
					 * Update call record callback function.
					 * @protected
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {Terrasoft.BaseViewModel} record View model of the connected record.
					 */
					updateCallCallback: function(schemaName, record, response) {
						if (!(response && response.success)) {
							return;
						}
						this.set("CurrentColumnValue", null);
						if (!Ext.isEmpty(schemaName) && !Ext.isEmpty(schemaName)) {
							this.updatePanelByConnectedRecord(schemaName, record);
						}
					},

					/**
					 * Updates call to connect it with the connected record.
					 * @protected
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {Terrasoft.BaseViewModel} connectedRecordData View model of the connected record.
					 */
					updateCallWithConnectedRecordData: function(schemaName, connectedRecordData) {
						var callDatabaseUId = this.get("DatabaseUId");
						if (Ext.isEmpty(callDatabaseUId)) {
							return;
						}
						var updateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "Call"
						});
						updateQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Id", callDatabaseUId));
						this.setUpdateCallQueryParameters(updateQuery, schemaName, connectedRecordData);
						updateQuery.execute(this.updateCallCallback.bind(this, schemaName, connectedRecordData));
					},

					/**
					 * Sets parameters for update query according to the schema name of the connected record.
					 * @protected
					 * @param {Terrasoft.UpdateQuery} updateQuery "Call" schema update query.
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {Terrasoft.BaseViewModel} connectedRecordData View model of the connected record.
					 */
					setUpdateCallQueryParameters: function(updateQuery, schemaName, connectedRecordData) {
						var recordId = connectedRecordData.get("Id");
						switch (schemaName) {
							case "Contact":
								updateQuery.setParameterValue("Contact", recordId, Terrasoft.DataValueType.GUID);
								updateQuery.setParameterValue("Account", connectedRecordData.get("Account").value,
									Terrasoft.DataValueType.GUID);
								break;
							case "Account":
								updateQuery.setParameterValue("Account", recordId, Terrasoft.DataValueType.GUID);
								break;
							default:
								break;
						}
					},

					/**
					 * Clears link between call and connected record.
					 * @protected
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {String} attributeName Panel model attribute name of connected record data.
					 */
					clearConnectedRecordLink: function(schemaName, attributeName) {
						this.updateCall(null, attributeName);
						switch (schemaName) {
							case "Contact":
								var account = this.get("Account");
								if (account && account.value) {
									var newSchemaName = "Account";
									this.getConnectedRecordData(newSchemaName, account.value,
										function(connectedRecordData) {
											this.updateCallWithConnectedRecordData(newSchemaName, connectedRecordData);
										}.bind(this)
									);
								} else {
									this.clearIdentificationAttributes();
								}
								break;
							case "Account":
								if (!this.get("Contact")) {
									this.clearIdentificationAttributes();
								}
								break;
							default:
								break;
						}
					},

					/**
					 * Clears subscriber identification attributes.
					 * @protected
					 */
					clearIdentificationAttributes: function() {
						this.set({
							"Name": "",
							"SubscriberId": "",
							"Job": "",
							"Department": "",
							"AccountType": "",
							"City": "",
							"Photo": "",
							"Type": null
						});
					},

					/**
					 * Updates history panel attributes according to the connected record.
					 * @protected
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {Terrasoft.BaseViewModel} record View model of the connected record.
					 */
					updatePanelByConnectedRecord: function(schemaName, record) {
						switch (schemaName) {
							case "Contact":
								this.updatePanelByConnectedContact(record);
								break;
							case "Account":
								this.updatePanelByConnectedAccount(record);
								break;
							default:
								this.updatePanelByConnectedEntity(schemaName, record);
								break;
						}
					},

					/**
					 * Updates history panel attributes according to the connected contact record.
					 * @protected
					 * @param {Terrasoft.BaseViewModel} record View model of the connected contact record.
					 */
					updatePanelByConnectedContact: function(record) {
						var contact = {
							value: record.get("Id"),
							displayValue: record.get("Name") || record.$displayValue
						};
						this.set("Contact", contact);
						this.set("Account", Ext.apply(record.get("Account"), {doNotUpdateCall: true}));
						this.initDefaultColumnName();
						this.set({
							"Name": contact.displayValue,
							"SubscriberId": contact.value,
							"Job": record.get("Job").displayValue,
							"Photo": record.get("Photo").value
						});
						var contactType = record.get("Type").value;
						var isEmployee = (contactType === ConfigurationConstants.ContactType.Employee);
						if (isEmployee) {
							this.set({
								"Department": record.get("Department").displayValue,
								"Type": CtiConstants.SubscriberTypes.Employee
							});
						} else {
							this.set({
								"Type": CtiConstants.SubscriberTypes.Contact
							});
						}
					},

					/**
					 * Updates history panel attributes according to the connected account record.
					 * @protected
					 * @param {Terrasoft.BaseViewModel} record View model of the connected account record.
					 */
					updatePanelByConnectedAccount: function(record) {
						var account = {
							value: record.get("Id"),
							displayValue: record.get("Name") || record.$displayValue
						};
						this.set("Account", account);
						this.initDefaultColumnName();
						this.set({
							"AccountType": record.get("Type").displayValue,
							"City": record.get("City").displayValue
						});
						if (!this.get("Contact")) {
							this.set({
								"Name": account.displayValue,
								"SubscriberId": account.value,
								"Type": CtiConstants.SubscriberTypes.Account
							});
						}
					},

					/**
					 * Updates history panel attributes according to the connected record.
					 * @protected
					 * @param {Terrasoft.BaseViewModel} columnName Call column name.
					 * @param {Terrasoft.BaseViewModel} record View model of the connected account record.
					 */
					updatePanelByConnectedEntity: function(columnName, record) {
						var entity = {
							value: record.$Id,
							displayValue: record.$displayValue
						};
						this.set(columnName, entity);
					},

					/**
					 * Indicates that the call is saved in the database.
					 * @protected
					 * return {Boolean}
					 */
					getIsCallSaved: function() {
						return Boolean(this.get("DatabaseUId"));
					},

					/**
					 * Subscribes on "change" events of the attributes that store connected records data.
					 * @protected
					 */
					subscribeOnConnectedRecordAttributesChanges: function() {
						var callRelationColumns = this.get("EntityConnectionColumnList");
						if (!Ext.isEmpty(callRelationColumns)) {
							this.Terrasoft.each(callRelationColumns, function(columnName) {
								var eventName = "change:" + columnName;
								if (["Contact", "Account"].indexOf(columnName) > -1) {
									this.on(eventName, function(model, value) {
										this.onConnectedRecordAttributeChanged(columnName, columnName, model, value);
									}.bind(this));
								} else {
									this.on(eventName, function(model, value) {
										this.updateCall(value, columnName);
										this.onConnectedRecordAttributeChanged(columnName, columnName, model,
											value);
									}.bind(this));
								}
							}, this);
						}
					},

					/**
					 * Connects contact or account with call and creates if necessary communication.
					 * @protected
					 * @param {String} schemaName Entity schema name.
					 * @param {Object} connectedRecordConfig Connected record configuration object.
					 */
					connectItem: function(schemaName, connectedRecordConfig) {
						if (!connectedRecordConfig.success) {
							return;
						}
						this.getConnectedRecordData(schemaName, connectedRecordConfig.uId,
							function(connectedRecordData) {
								this.getSubscriberCommunicationInfo(schemaName, function(communicationDetailConfig) {
									this.actualizeSubscriberData(schemaName, connectedRecordData.get("Id"),
										communicationDetailConfig);
									this.updateCallWithConnectedRecordData(schemaName, connectedRecordData);
								}.bind(this));
							}.bind(this)
						);
					},

					/**
					 * Returns call connections menu item caption.
					 * @protected
					 * @return {String} Call connections menu item caption.
					 */
					getCallConnectionsMenuItemCaption: function() {
						var showAllConnectionsMenuItemCaption = this.get("IsCallConnectionsVisible")
							? this.get("Resources.Strings.HideConnectionsMenuItemCaption")
							: this.get("Resources.Strings.ShowAllConnectionsMenuItemCaption");
						return showAllConnectionsMenuItemCaption;
					},

					/**
					 * Handler for prepare list event for lookup.
					 * @protected
					 * @param {String} filterValue Filter value.
					 */
					onPrepareRelationLookupList: function(filterValue) {
						var currentColumnName = this.get("CurrentColumnName");
						this.loadLookupData(filterValue, this.get("CurrentRelationItemsList"), currentColumnName);
					},

					/**
					 * Handles "change" event of the attribute which stores connected record data.
					 * @protected
					 * @param {String} schemaName Entity schema name of the connected record.
					 * @param {String} attributeName Panel model attribute name of connected record data.
					 * @param {Backbone.Model} model Changed attribute model.
					 * @param {Object} record New attribute value.
					 */
					onConnectedRecordAttributeChanged: function(schemaName, attributeName, model, record) {
						var previousRecord = model.previous(attributeName);
						if (!previousRecord && !record) {
							return;
						}
						if (previousRecord && record && previousRecord.value === record.value) {
							return;
						}
						if (record && record.doNotUpdateCall) {
							return;
						}
						if (record && record.value) {
							this.getConnectedRecordData(schemaName, record.value,
								function(connectedRecordData) {
									this.updateCallWithConnectedRecordData(schemaName, connectedRecordData);
								}.bind(this)
							);
						} else {
							this.clearConnectedRecordLink(schemaName, attributeName);
						}
					},

					/**
					 * Handles card module response after saving. New record card has been opened by
					 * "Create new record" action. This method will be called after its successful saving for further
					 * connection of current call with the new record.
					 * @protected
					 * @param {String} schemaName Entity schema name.
					 * @param {Object} savedRecordConfig Saved record configuration object.
					 */
					onNewConnectedItemCreated: function(schemaName, savedRecordConfig) {
						this.connectItem(schemaName, savedRecordConfig);
					},

					/**
					 * Opens current call edit page.
					 * @protected
					 */
					openCallPage: function() {
						var historyState = this.sandbox.publish("GetHistoryState");
						var config = {
							sandbox: this.sandbox,
							entitySchemaName: "Call",
							primaryColumnValue: this.get("DatabaseUId"),
							operation: ConfigurationEnums.CardStateV2.EDIT,
							historyState: historyState,
							moduleId: this.Terrasoft.generateGUID()
						};
						NetworkUtilities.openCardInChain(config);
					},

					/**
					 * Handles "Create new contact" menu item click.
					 * @protected
					 */
					onCreateNewContactMenuItemClick: function() {
						this.openNewRecordCard("Contact", "ContactPageV2");
					},

					/**
					 * Handles "Create new account" menu item click.
					 * @protected
					 */
					onCreateNewAccountMenuItemClick: function() {
						this.openNewRecordCard("Account", "AccountPageV2");
					},

					/**
					 * Handles "Add to existing contact" menu item click.
					 * @protected
					 */
					onLinkContactClick: function() {
						var number = this.get("Number");
						var multiLookupColumns = ["Contact", "Account"];
						var multiLookupConfig = multiLookupColumns.map(function(column) {
							return {
								entitySchemaName: column,
								columnName: column,
								captionLookup: Ext.String.format(
									this.get("Resources.Strings.SelectContactLookupCaption"), number)
							};
						}, this);
						var config = {
							lookupModuleId: this.Terrasoft.generateGUID(),
							lookupPageName: "MultiLookupModule",
							multiLookupConfig: multiLookupConfig
						};
						this.openLookup(config, this.onExistingContactSelected, this);
					},

					/**
					 * Handles multilookup module response after selecting existing contact.
					 * @param {Object} args Arguments that contain information about schema name and selected record.
					 * @protected
					 */
					onExistingContactSelected: function(args) {
						if (!args || !args.columnName || !args.selectedRows || args.selectedRows.isEmpty()) {
							return;
						}
						var connectedRecordConfig = {
							uId: args.selectedRows.getByIndex(0).value,
							success: true
						};
						this.connectItem(args.columnName, connectedRecordConfig);
					},

					/**
					 * Handles "Show all connections" menu item click.
					 * @protected
					 */
					onShowAllConnectionsClick: function() {
						var isCallConnectionsVisible = this.get("IsCallConnectionsVisible");
						this.set("IsCallConnectionsVisible", !isCallConnectionsVisible);
					},

					/**
					 * @inheritdoc Terrasoft.BaseViewModel#onLookupDataLoaded
					 * @overridden
					 */
					onLookupDataLoaded: function(config) {
						this.callParent(arguments);
						config.isLookupEdit = true;
						this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
					},

					/**
					 * @inheritdoc Terrasoft.MiniPageUtilities#linkMouseOver
					 * @overridden
					 */
					linkMouseOver: function(options) {
						var targetId = options.targetId;
						var componentLinkSuffix = "-link-el";
						var componentId = targetId ? targetId.replace(componentLinkSuffix, "") : "";
						var component = Ext.getCmp(componentId);
						if (options && options.targetId) {
							var entitySchemaName = this.getTypeSchemaName();
							var config = {
								columnName: component.tag || entitySchemaName,
								targetId: options.targetId,
								entitySchemaName: component.tag || entitySchemaName,
							};
							config.recordId = this.get(config.columnName) ? this.get(config.columnName).value : "";
							this.openMiniPage(config);
						}
					},

					//endregion

					//region Methods: Public

					/**
					 * Gets panel's primary display value according to it's type. In case when call isn't identified
					 * function will return call number. Otherwise - identified subscriber's primary display value.
					 * @return {String} Panel's primary display value.
					 */
					getPrimaryDisplayValue: function() {
						var subscriberType = this.get("Type");
						return subscriberType ? this.get("Name") : this.get("Number");
					},

					/**
					 * Processes click on subscribers name. If subscriber was identified - opens editing card,
					 * otherwise - makes call to number.
					 * @public
					 */
					onNameClick: function() {
						if (!this.getIsNameLinkAvailable()) {
							return;
						}
						var schemaName = this.getTypeSchemaName();
						var typeColumnValue = this.get("TypeColumnValue");
						var subscriberId = this.get("SubscriberId");
						if (!this.Ext.isEmpty(schemaName)) {
							var hash = this.Ext.isEmpty(typeColumnValue)
									? NetworkUtilities.getEntityUrl(schemaName, subscriberId)
									: NetworkUtilities.getEntityUrl(schemaName, subscriberId, typeColumnValue);
							this.sandbox.publish("PushHistoryState", {hash: hash});
						} else {
							this.onNumberClick();
						}
					}

					//endregion

				},
				diff: [
					{
						"operation": "insert",
						"name": "CommunicationHistoryItemContainer",
						"values": {
							"id": "CommunicationHistoryItemContainer",
							"selectors": {
								"wrapEl": "#CommunicationHistoryItemContainer"
							},
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"markerValue": {"bindTo": "getPrimaryDisplayValue"},
							"wrapClass": ["communication-history-item-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Photo",
						"parentName": "CommunicationHistoryItemContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "getPhoto"},
							"classes": {"wrapperClass": ["photo"]},
							"markerValue": "Photo",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
						}
					},
					{
						"operation": "insert",
						"name": "CommunicationHistoryDataContainer",
						"parentName": "CommunicationHistoryItemContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"markerValue": "CommunicationHistoryDataContainer",
							"wrapClass": ["data-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CommunicationHistoryNameContainer",
						"parentName": "CommunicationHistoryDataContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"markerValue": "CommunicationHistoryDataContainer",
							"wrapClass": ["communication-history-name-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Name",
						"parentName": "CommunicationHistoryNameContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.HYPERLINK,
							"classes": {"hyperlinkClass": ["communication-history-name"]},
							"markerValue": {"bindTo": "getPrimaryDisplayValue"},
							"caption": {"bindTo": "getPrimaryDisplayValue"},
							"click": {"bindTo": "onNameClick"},
							"linkMouseOver": {bindTo: "linkMouseOver"}
						}
					},
					{
						"operation": "insert",
						"name": "CreateLinkButton",
						"parentName": "CommunicationHistoryDataContainer",
						"propertyName": "items",
						"values": {
							"id": "CreateLinkButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.CreateLinkButtonIcon"},
							"classes": {"wrapperClass": "create-link-button"},
							"markerValue": "CreateLinkButton",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"menu": {
								"items": [
									{
										"id": "OpenCallPage",
										"caption": {"bindTo": "Resources.Strings.OpenCallPageCaption"},
										"click": {"bindTo": "openCallPage"}
									},
									{
										"id": "CreateNewContact",
										"caption": {"bindTo": "Resources.Strings.CreateNewContactMenuItemCaption"},
										"tag": "Contact",
										"click": {"bindTo": "onCreateNewContactMenuItemClick"}
									},
									{
										"id": "CreateNewAccount",
										"caption": {"bindTo": "Resources.Strings.CreateNewAccountMenuItemCaption"},
										"tag": "Account",
										"click": {"bindTo": "onCreateNewAccountMenuItemClick"}
									},
									{
										"id": "AddToExistingContact",
										"caption": {"bindTo": "Resources.Strings.AddToExistingContactMenuItemCaption"},
										"click": {"bindTo": "onLinkContactClick"}
									},
									{
										"id": "ShowAllConnections",
										"caption": {"bindTo": "getCallConnectionsMenuItemCaption"},
										"click": {"bindTo": "onShowAllConnectionsClick"}
									}
								]
							}
						}
					},
					{
						"operation": "insert",
						"name": "CallButton",
						"parentName": "CommunicationHistoryDataContainer",
						"propertyName": "items",
						"values": {
							"enabled": {"bindTo": "IsTelephonyAvailable"},
							"id": "CallButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "Resources.Images.MakeCallButtonIcon"},
							"classes": {"wrapperClass": "call-button"},
							"markerValue": "CallButton",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"click": {"bindTo": "onNumberClick"}
						}
					},
					{
						"operation": "insert",
						"name": "SubscriberData",
						"parentName": "CommunicationHistoryDataContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"classes": {"labelClass": ["data"]},
							"markerValue": {"bindTo": "getSubscriberData"},
							"caption": {"bindTo": "getSubscriberData"},
							"visible": {"bindTo": "getIsSubscriberDataVisible"},
							"hint": {"bindTo": "getSubscriberData"}
						}
					},
					{
						"operation": "insert",
						"name": "NumberContainer",
						"parentName": "CommunicationHistoryItemContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"markerValue": "NumberContainer",
							"wrapClass": ["number-container"],
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "CallType",
						"parentName": "NumberContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": {"bindTo": "getCallTypeIcon"},
							"classes": {"wrapperClass": ["call-type"]},
							"markerValue": "CallType",
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
						}
					},
					{
						"operation": "insert",
						"name": "CallDate",
						"parentName": "NumberContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"classes": {"labelClass": ["call-date"]},
							"markerValue": {"bindTo": "CallDate"},
							"caption": {"bindTo": "CallDate"}
						}
					},
					{
						"operation": "insert",
						"name": "Number",
						"parentName": "NumberContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.LABEL,
							"classes": {"labelClass": ["call-number"]},
							"markerValue": {"bindTo": "Number"},
							"caption": {"bindTo": "Number"},
							"hint": {"bindTo": "Number"},
							"click": {"bindTo": "onNumberClick"},
							"visible": {"bindTo": "getIsNumberButtonVisible"}
						}
					},
					{
						"operation": "insert",
						"name": "CallConnectionsContainer",
						"parentName": "CommunicationHistoryItemContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"markerValue": "CallConnections",
							"visible": {"bindTo": "IsCallConnectionsVisible"},
							"items": []
						}
					}
				]
			};
		}
);


