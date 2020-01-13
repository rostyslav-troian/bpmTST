Terrasoft.configuration.Structures["MobileCallerIdDataLoader"] = {innerHierarchyStack: ["MobileCallerIdDataLoader"]};
/**
 * @class Terrasoft.configuration.CallerIdDataLoader
 */
Ext.define("Terrasoft.configuration.CallerIdDataLoader", {
	extend: "Terrasoft.nativeApi.BaseCallerIdDataLoader",
	alternateClassName: "Terrasoft.CallerIdDataLoader",

	inheritableStatics: {

		/**
		 * Limit of allowed for loading records to 'Caller Id' database.
		 * @protected
		 */
		MaxRecordCount: 10000

	},

	/**
	 * @private
	 */
	models: ["ContactCommunication", "CommunicationType", "Country", "ContactType", "DialingCode", "Employee"],

	/**
	 * @private
	 */
	records: null,

	/**
	 * @private
	 */
	currentPage: null,

	/**
	 * @private
	 */
	loadingConfig: null,

	/**
	 * @private
	 */
	phoneData: null,

	/**
	 * @private
	 */
	dialingInfos: null,

	/**
	 * Fills dialing infos by records.
	 * @private
	 */
	fillDialingInfosByRecords: function(dialingCodeRecords) {
		for (var i = 0, ln = dialingCodeRecords.length; i < ln; i++) {
			var dialingCodeRecord = dialingCodeRecords[i];
			var countryId = dialingCodeRecord.get("Country.Id");
			if (!Ext.isEmpty(countryId)) {
				this.dialingInfos[countryId] = {
					code: dialingCodeRecord.get("Code"),
					trunkPrefix: dialingCodeRecord.get("TrunkPrefix")
				};
			}
		}
	},

	/**
	 * Initialization of dialing infos.
	 * @private
	 */
	initializeDialingInfos: function(config) {
		if (!this.dialingInfos) {
			this.dialingInfos = {};
		}
		Terrasoft.DataUtils.loadRecords({
			modelName: "DialingCode",
			columns: ["Country.Id", "Code", "TrunkPrefix"],
			success: function(dialingCodeRecords) {
				this.fillDialingInfosByRecords(dialingCodeRecords);
				Ext.callback(config.callback, config.scope);
			},
			failure: this.failureHandler,
			scope: this
		});
	},

	/**
	 * Returns query config for contact communications.
	 * @private
	 */
	getContactCommunicationQueryConfig: function(byEmployees) {
		var contactColumnPrefix = byEmployees ? "Contact.=[Employee:Contact]" : "Contact";
		return Ext.create("Terrasoft.QueryConfig", {
			modelName: "ContactCommunication",
			columns: ["Number", contactColumnPrefix + ".Name", "Contact.Account.Name",
				"Contact.Country.Id", "Contact.Account.Country.Id"],
			orderByColumns: [
				{
					column: contactColumnPrefix + ".ModifiedOn",
					orderType: Terrasoft.OrderTypes.DESC
				}
			]
		});
	},

	/**
	 * Converts records to 'CallerId' data.
	 * @private
	 */
	convertRecordsToData: function(config) {
		if (config.records) {
			this.records = Ext.Array.union(this.records, config.records);
		}
		var data = this.getPhonesData(this.records);
		Ext.callback(config.success, config.scope, [data]);
	},

	/**
	 * Loads phones of non-employees.
	 * @private
	 */
	loadOtherPhones: function(config, success) {
		this.loadPhoneRecords({
			byEmployees: false,
			success: function(otherPhones) {
				config.records = otherPhones;
				var maxRecordCount = this.self.MaxRecordCount;
				var hasOtherPhones = (otherPhones.length === maxRecordCount);
				config.success = function(data) {
					var phonesCount = data ? Ext.Object.getKeys(data).length : 0;
					if (hasOtherPhones && phonesCount < maxRecordCount) {
						this.currentPage++;
						this.loadOtherPhones(config, success);
					} else {
						Terrasoft.Object.splice(data, maxRecordCount);
						data = this.normalizeData(data);
						Ext.callback(success, config.scope, [data]);
					}
				}.bind(this);
				this.convertRecordsToData(config);
			},
			failure: this.failureHandler,
			scope: this
		});
	},

	/**
	 * Returns filter by communication types.
	 * @private
	 */
	getCommunicationTypesFilter: function() {
		return Ext.create("Terrasoft.Filter", {
			property: "CommunicationType",
			funcType: Terrasoft.FilterFunctions.In,
			funcArgs: [Terrasoft.GUID.MobilePhone, Terrasoft.GUID.HomePhone, Terrasoft.GUID.WorkPhone,
				Terrasoft.GUID.OtherPhone]
		});
	},

	/**
	 * Returns filter by employee contact type.
	 * @private
	 */
	getEmployeeContactTypeFilter: function() {
		return Ext.create("Terrasoft.Filter", {
			property: "Contact.Type",
			value: Terrasoft.ContactTypes.Employee
		});
	},

	/**
	 * Default failure handler.
	 * @private
	 */
	failureHandler: function(exception) {
		var config = this.loadingConfig;
		Terrasoft.Logger.logException(Terrasoft.LogSeverityLevel.Error, exception);
		Ext.callback(config.failure, config.scope, [exception]);
	},

	/**
	 * Loads phone records.
	 * @private
	 */
	loadPhoneRecords: function(config) {
		var modelName = "ContactCommunication";
		var store = Ext.create("Terrasoft.store.BaseStore", {
			model: modelName
		});
		var queryConfig = this.getContactCommunicationQueryConfig(config.byEmployees);
		var groupFilters = Ext.create("Terrasoft.Filter", {
			type: Terrasoft.FilterTypes.Group
		});
		var communicationTypesFilters = this.getCommunicationTypesFilter();
		groupFilters.addFilter(communicationTypesFilters);
		var useEmployeeContactType = !config.byEmployees;
		if (useEmployeeContactType) {
			var employeeContactTypeFilter = this.getEmployeeContactTypeFilter();
			groupFilters.addFilter(employeeContactTypeFilter);
		}
		store.setPageSize(this.self.MaxRecordCount);
		store.loadPage(this.currentPage, {
			isCancelable: false,
			queryConfig: queryConfig,
			filters: groupFilters,
			callback: function(records, operation, successful) {
				if (successful === true) {
					Ext.callback(config.success, config.scope, [records]);
				} else {
					var exception = operation.getError();
					Ext.callback(config.failure, config.scope, [exception]);
				}
			},
			scope: this
		});
	},

	/**
	 * Returns data with phones and information about contact.
	 * @private
	 */
	getPhonesData: function(records) {
		var data = {};
		for (var i = 0, ln = records.length; i < ln; i++) {
			var record = records[i];
			var number = record.get("Number");
			if (number) {
				var contactName = record.get("Contact.Name");
				var accountName = record.get("Contact.Account.Name");
				var countryId = record.get("Contact.Country.Id");
				if (Ext.isEmpty(countryId) || Terrasoft.util.isEmptyGuid(countryId)) {
					countryId = record.get("Contact.Account.Country.Id");
				}
				var numbers = number.match(/\d+/g);
				if (numbers && numbers.length > 0) {
					var key = numbers.join("");
					key = this.formatPhoneNumber({
						phoneNumber: key,
						countryId: countryId
					});
					if (this.isPhoneNumberValid(key)) {
						data[key] = this.formatContactInfo({
							contactName: contactName,
							accountName: accountName
						});
					}
				}
			}
		}
		return data;
	},

	/**
	 * Formats local phone number.
	 * @protected
	 * @virtual
	 */
	formatLocalPhoneNumber: function(config) {
		var phoneNumber = config.phoneNumber;
		var countryId = config.countryId;
		var dialingInfo = this.dialingInfos[countryId];
		var trunkPrefix = dialingInfo && dialingInfo.trunkPrefix;
		if (!Ext.isEmpty(trunkPrefix) && Terrasoft.String.startsWith(phoneNumber, trunkPrefix)) {
			var dialingCode = dialingInfo.code;
			if (!Ext.isEmpty(dialingCode)) {
				phoneNumber =
					phoneNumber.replace(phoneNumber.substring(0, trunkPrefix.length), dialingCode);
			}
		}
		return phoneNumber;
	},

	/**
	 * Formats phone number.
	 * @protected
	 * @virtual
	 */
	formatPhoneNumber: function(config) {
		return this.formatLocalPhoneNumber(config);
	},

	/**
	 * Formats information about contact.
	 * @protected
	 * @virtual
	 */
	formatContactInfo: function(config) {
		var accountName = config.accountName;
		return config.contactName + (Ext.isEmpty(accountName) ? "" : " • " + accountName);
	},

	/**
	 * Initialization.
	 * @protected
	 * @virtual
	 */
	initialize: function(config) {
		this.records = [];
		Terrasoft.StructureLoader.loadModels({
			modelNames: this.getLoadedModels(),
			success: function() {
				this.initializeDialingInfos(config);
			},
			scope: this
		});
	},

	/**
	 * Loads needed models.
	 * @protected
	 * @virtual
	 */
	getLoadedModels: function() {
		return this.models;
	},

	/**
	 * Loads phone data in 'CallerId' format ("phone": "contact info").
	 * @protected
	 * @virtual
	 */
	loadPhones: function(config, success) {
		this.loadPhoneRecords({
			byEmployees: true,
			success: function(employeesPhones) {
				this.records = employeesPhones;
				this.loadOtherPhones(config, success);
			},
			failure: this.failureHandler,
			scope: this
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	load: function(config) {
		this.loadingConfig = config;
		this.currentPage = 1;
		var originalSuccess = config.success;
		this.initialize({
			callback: function() {
				this.loadPhones(config, function(phoneData) {
					Ext.callback(originalSuccess, config.scope, [phoneData]);
				});
			},
			scope: this
		});
	}

});

Terrasoft.CallerId.setDataLoader("Terrasoft.CallerIdDataLoader");


