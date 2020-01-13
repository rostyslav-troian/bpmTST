Terrasoft.configuration.Structures["LeadQualificationPageV2"] = {innerHierarchyStack: ["LeadQualificationPageV2"], structureParent: "BasePageV2"};
define('LeadQualificationPageV2Structure', ['LeadQualificationPageV2Resources'], function(resources) {return {schemaUId:'46e83db5-e9ff-42a4-aba8-34d9f3dc0693',schemaCaption: "Lead qualification page", parentSchemaName: "BasePageV2", schemaName:'LeadQualificationPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadQualificationPageV2", ["terrasoft", "LeadQualificationPageV2Resources", "LookupUtilities",
		"ConfigurationConstants",
		"css!LeadQualificationPageV2Styles"],
	function(Terrasoft, resources, LookupUtilities, ConfigurationConstants) {
		return {
			entitySchemaName: "Lead",
			attributes: {
				"AddressType": {
					lookupListConfig: {
						columns: ["ForContact", "ForAccount"]
					}
				},

				/**
				 * #### "############## ### #######".
				 */
				"QualifiedContact": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						columns: ["DoNotUseEmail", "DoNotUseCall", "DoNotUseFax", "DoNotUseSms", "DoNotUseMail"]
					}
				},

				/**
				 * ########### #### "############## ### #######".
				 */
				"QualifiedContactVirtual": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * ########### #### "############## ### ##########".
				 */
				"QualifiedAccountVirtual": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * ###### #####.
				 */
				"FullAddress": {
					name: "FullAddress",
					dataValueType: this.Terrasoft.DataValueType.TEXT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * ####### "####### # ############" ######### ## ##, ### ### ############ ### ##### ############ #
				 * #########
				 */
				"IsAssociateWithContact": {
					name: "IsAssociateWithContact",
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					visible: false
				},

				/**
				 * ####### "####### # #########" ######### ## ##, ### ### ############ ### ##### ############ #
				 * ############.
				 */
				"IsAssociateWithAccount": {
					name: "IsAssociateWithAccount",
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					visible: false
				}
			},
			details: /**SCHEMA_DETAILS*/{
			}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * ########## ##### ## ######
				 * @private
				 * @param tag #######
				 */
				onCheckBoxClick: function(tag) {
					this.set("IsAssociateWith" + tag, !this.get(tag));
				},

				/**
				 * ######### ########## #####
				 * @param arg1 ## ############
				 * @param tag #######
				 */
				loadLookup: function(arg1, tag) {
					var addCallback = function(args) {
						var selectedRows = args.selectedRows;
						if (selectedRows.getCount() > 0) {
							this.set("Qualified" + tag + "Virtual", selectedRows.getByIndex(0));
						}
					};
					var config = { entitySchemaName: tag };
					if (tag === "Account") {
						config.columns = ["PrimaryContact"];
					}
					LookupUtilities.Open(this.sandbox, config, addCallback, this);
				},

				/**
				 * ########## ######### ########
				 * @overridden
				 * @return {String}
				 */
				getHeader: function() {
					return this.get("Resources.Strings.LeadQualificationPageCaption");
				},

				/**
				 * ########## ############ #####
				 * ######## ### callParent, ###### ### ######
				 * @return {Function}
				 */
				getParentMethod: function() {
					var method,
						superMethod = (method = this.getParentMethod.caller) && (method.$previous ||
							((method = method.$owner ? method : method.caller) &&
								method.$owner.superclass[method.$name]));

					return superMethod;
				},

				/**
				 * ####### ######### ############# ########
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.set("ContactCollection", this.Ext.create("Terrasoft.Collection"));
					this.set("ContactActiveRow", null);
					this.set("IsContactGridEmpty", true);
					this.set("IsContactGridLoading", false);
					this.set("ContactButtonsGroup", "var1");
					this.set("AccountCollection", this.Ext.create("Terrasoft.Collection"));
					this.set("AccountActiveRow", null);
					this.set("IsAccountGridEmpty", true);
					this.set("IsAccountGridLoading", false);
					this.set("AccountButtonsGroup", "var1");
					this.set("contactList", this.Ext.create("Terrasoft.Collection"));
					this.set("accountList", this.Ext.create("Terrasoft.Collection"));
					this.set("ContactGridCanShowMore", true);
					this.set("AccountGridCanShowMore", true);
					this.set("IsContactFilled", !!this.get("Contact"));
					this.set("IsAccountFilled", !!this.get("Account"));
					this.set("IsAssociateWithContact", !!this.get("Contact"));
					this.set("IsAssociateWithAccount", !!this.get("Account"));
					this.set("FullAddress", this.getFullAddress());
					this.set("QualifiedContactVirtual", this.get("QualifiedContact"));
					this.set("QualifiedAccountVirtual", this.get("QualifiedAccount"));
					this.loadLeadGrid("Contact");
					this.loadLeadGrid("Account");
				},

				/**
				 * ########## ################# ####### ### ##########.
				 * @param {String} tag ####. ########## ######## Contact # Account.
				 * @return {Terrasoft.BaseViewModel} ########## ################# ####### ### ##########.
				 */
				getQualifiedField: function(tag) {
					return this.get("Qualified" + tag) || this.get("Qualified" + tag + "Virtual");
				},

				/**
				 * ############# ################# ####### ### ##########.
				 * @param {String} tag ####. ########## ######## Contact # Account.
				 * @param {Object} value ################# ####### ### ##########.
				 */
				setQualifiedField: function(tag, value) {
					this.set("Qualified" + tag, value);
				},

				/**
				 * ########## ######## ###### ###########.
				 * @param {String} tag ####. ########## ######## Contact, Account.
				 */
				getRadioValue: function(tag) {
					var isAssociateWith = !!this.get("IsAssociateWith" + tag);
					return isAssociateWith ? this.get(tag + "ButtonsGroup") : "";
				},

				/**
				 * ########## ###### #######, ########### ######## ### ########## ### ####.
				 * @param {String} tag ####. ########## ######## Contact, Account.
				 * @param {Array} result
				 */
				getSaveAction: function(tag, actionResult) {
					var actions = [];
					var radio = this.getRadioValue(tag);
					if (radio !== "") {
						switch (radio) {
							case "var0":
								var activeRow = this.get(tag + "ActiveRow");
								if (!activeRow) {
									this.showInformationDialog(this.get("Resources.Strings.No" + tag + "Warning"));
									return;
								}
								activeRow = this.get(tag + "Collection").get(activeRow);
								this.setQualifiedField(tag, {
									value: activeRow.get("Id"),
									displayValue: activeRow.get("Name")
								});
								break;
							case "var2":
								this.setQualifiedField(tag, this.get("Qualified" + tag + "Virtual"));
								break;
						}
						var action;
						switch (radio) {
							case "var0":
							case "var2":
								if (!this.getQualifiedField(tag)) {
									this.showInformationDialog(this.get("Resources.Strings.No" + tag + "Warning"));
									return;
								}
								action = function(next) {
									var updateQuery = this["create" + tag + "UpdateQuery"];
									updateQuery.call(this).execute(function(result) {
										if (result.success) {
											next();
										}
									}, this);
								};
								break;
							case "var1":
								action = function(next) {
									var insertQuery = this["create" + tag + "InsertQuery"];
									insertQuery.call(this).execute(function(result) {
										if (result.success) {
											this.setQualifiedField(tag, {
												value: result.id,
												displayValue: this.get(tag)
											});
											actionResult[tag + "Created"] = true;
											next();
										}
									}, this);
								};
								break;
							default:
								action = function(next) {
									next();
								};
								break;
						}
						actions.push(action);
						actions.push(function(next) {
							var addressInsertQuery = this.createAddressInsertQuery(tag);
							if (addressInsertQuery) {
								addressInsertQuery.execute(function(result) {
									if (result.success) {
										next();
									}
								}, this);
							} else {
								next();
							}
						});
					}
					return actions;
				},

				/**
				 * ######### ####### ##### ## #########, ########## ######## ######### ##########,
				 * ######## ########.
				 * @overridden
				 */
				save: function() {
					var contactRadio = this.getRadioValue("Contact");
					var accountRadio = this.getRadioValue("Account");
					if (contactRadio === "" && accountRadio === "") {
						this.showInformationDialog(this.get("Resources.Strings.NoAssociateWarning"));
						return;
					}
					var actions = [];
					var actionsResult = {
						ContactCreated: false,
						AccountCreated: false
					};
					var contactActions = this.getSaveAction("Contact", actionsResult);
					if (contactActions) {
						Terrasoft.each(contactActions, function(action) {
							actions.push(action);
						});
					} else {
						return;
					}
					var accountActions = this.getSaveAction("Account", actionsResult);
					if (accountActions) {
						Terrasoft.each(accountActions, function(action) {
							actions.push(action);
						});
					} else {
						return;
					}
					if (contactRadio === "var1" && accountRadio !== "") {
						var updateContactAction = function(next) {
							var contact = this.getQualifiedField("Contact");
							var account = this.getQualifiedField("Account");
							var updateContactQuery = this.Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Contact" });
							updateContactQuery.filters.addItem(Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Id", contact.value));
							updateContactQuery.setParameterValue("Account", account.value, Terrasoft.DataValueType.GUID);
							updateContactQuery.execute(function() {
								next();
							}, this);
						};
						actions.push(updateContactAction);
					}
					var afterQualifyAction = function(next) {
						var messages = [];
						if (actionsResult.ContactCreated) {
							messages.push(this.Ext.String.format(this.get("Resources.Strings.ContactCreatedMessage"),
								this.getQualifiedField("Contact").displayValue));
						}
						if (actionsResult.AccountCreated) {
							messages.push(this.Ext.String.format(this.get("Resources.Strings.AccountCreatedMessage"),
								this.getQualifiedField("Account").displayValue));
						}
						var leadStatus = ConfigurationConstants.Lead.Status;
						var status = actionsResult.ContactCreated || actionsResult.AccountCreated
							? leadStatus.QualifiedAsNew
							: leadStatus.QualifiedAsExisting;
						this.set("Status", {
							value: status,
							displayValue: ""
						});
						if (messages.length > 0) {
							this.showInformationDialog(messages.join("\r\n"));
						}
						var updateQuery = this.createActivitiesUpdateQuery();
						updateQuery.execute(function(result) {
							if (result.success) {
								next();
							}
						}, this);
					};
					actions.push(afterQualifyAction);
					var parentSave = this.getParentMethod();
					actions.push(function(next) {
						parentSave.call(this, {
							isSilent: true,
							callback: next
						});
					});
					actions.push(this.onDiscardChangesClick);
					actions.push(this);
					Terrasoft.chain.apply(this, actions);
				},

				/**
				 * ####### #####
				 * @private
				 */
				onDiscardChangesClick: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * ########## ###### #####
				 * @return {string}
				 */
				getFullAddress: function() {
					var fullAddress = [];
					var address = this.get("Address");
					if (address) {
						fullAddress.push(address);
					}
					var city = this.get("City");
					if (city) {
						fullAddress.push(city.displayValue);
					}
					var country = this.get("Country");
					if (country) {
						fullAddress.push(country.displayValue);
					}
					var zip = this.get("Zip");
					if (zip) {
						fullAddress.push(zip);
					}
					return fullAddress.join(", ");
				},

				/**
				 * ########## ########### ###### "############# ####### # #########"
				 * @private
				 * @return {Boolean}
				 */
				AssociateWithContactFoundedEnabled: function() {
					return (this.get("IsAssociateWithContact") && this.get("ContactButtonsGroup") === "var0" &&
						this.get("ContactCollection").getCount() > 0);
				},

				/**
				 * ########## ########### ###### "############# ####### # ############"
				 * @private
				 * @return {Boolean}
				 */
				AssociateWithContactExistsEnabled: function() {
					return (this.get("IsAssociateWithContact") && this.get("ContactButtonsGroup") === "var2");
				},

				/**
				 * ########## ########### ###### "############# ########### # #########"
				 * @private
				 * @return {Boolean}
				 */
				AssociateWithAccountFoundedEnabled: function() {
					return (this.get("IsAssociateWithAccount") && this.get("AccountButtonsGroup") === "var0" &&
						this.get("AccountCollection").getCount() > 0);
				},

				/**
				 * ########## ########### ###### "############# ########### # ############"
				 * @private
				 * @return {Boolean}
				 */
				AssociateWithAccountExistsEnabled: function() {
					return (this.get("IsAssociateWithAccount") && this.get("AccountButtonsGroup") === "var2");
				},

				/**
				 * ######### ###### ########## ########## ### #############
				 * @private
				 * @param tag ####### #######
				 */
				loadLeadGrid: function(tag) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: tag
					});
					var filters = esq.filters;
					filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					var columns = ["Id"];
					if (tag === "Contact") {
						columns.push("Account");
						columns.push("Email");
						var contact = this.get("Contact");
						if (contact) {
							filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Name", contact));
							var mobilePhone = this.get("MobilePhone");
							if (mobilePhone) {
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"MobilePhone", mobilePhone));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[ContactCommunication:Contact:Id].Number", mobilePhone));
							}
							var email = this.get("Email");
							if (email) {
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Email", email));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[ContactCommunication:Contact:Id].Number", email));
							}
						}
					} else if (tag === "Account") {
						columns.push("Phone");
						columns.push("City");
						columns.push("PrimaryContact");
						var account = this.get("Account");
						if (account) {
							filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Name", account));
							filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"AlternativeName", account));
							var phone = this.get("BusinesPhone");
							if (phone) {
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Phone", phone));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"AdditionalPhone", phone));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[AccountCommunication:Account:Id].Number", phone));
							}
							var fax = this.get("Fax");
							if (fax) {
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Fax", fax));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[AccountCommunication:Account:Id].Number", fax));
							}
							var website = this.get("Website");
							if (website) {
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Web", website));
								filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"[AccountCommunication:Account:Id].Number", website));
							}
						}
					}
					Terrasoft.each(columns, function(column) {
						esq.addColumn(column);
					}, this);
					var sortColumns = ["Name", "CreatedOn", "ModifiedOn"];
					var sortColumnIndex = 1;
					Terrasoft.each(sortColumns, function(sortColumn) {
						var column = esq.addColumn(sortColumn);
						column.orderPosition = sortColumnIndex++;
						column.orderDirection = Terrasoft.OrderDirection.ASC;
					}, this);
					if (filters.getCount() > 0) {
						esq.rowCount = 3;
						var collection = this.get(tag + "Collection");
						if (collection.getCount() > 0) {
							esq.isPageable = true;
							var conditionalValues = esq.conditionalValues = this.Ext.create("Terrasoft.ColumnValues");
							var lastRecord = collection.getByIndex(collection.getCount() - 1);
							Terrasoft.each(sortColumns, function(sortColumn) {
								var dataValueType = sortColumn === "Name"
									? Terrasoft.DataValueType.TEXT
									: Terrasoft.DataValueType.DATE_TIME;
								conditionalValues.setParameterValue(sortColumn, lastRecord.get(sortColumn),
									dataValueType);
							}, this);
							conditionalValues.setParameterValue("Id", lastRecord.get("Id"),
								Terrasoft.DataValueType.GUID);
						}
						esq.getEntityCollection(function(response) {
							var entities = response.collection;
							var selectedAssociateType = "";
							if (this.getQualifiedField(tag)) {
								selectedAssociateType = "var2";
							} else if (entities.getCount() > 0) {
								selectedAssociateType = "var0";
							} else {
								selectedAssociateType = "var1";
							}
							this.set(tag + "ButtonsGroup", selectedAssociateType);
							if (entities.getCount() > 0) {
								this.set("Is" + tag + "GridEmpty", false);
								collection.loadAll(entities);
								if (selectedAssociateType === "var0") {
									this.set(tag + "ActiveRow", entities.getByIndex(0).get("Id"));
								}
							}
							if (entities.getCount() < 3) {
								this.set(tag + "GridCanShowMore", false);
							}
						}, this);
					}
				},

				/**
				 * ########## ##### ## ###### "######## ######" ### ####### #########
				 * @private
				 */
				contactGridShowMore: function() {
					this.loadLeadGrid("Contact");
				},

				/**
				 * ########## ##### ## ###### "######## ######" ### ####### ############
				 * @private
				 */
				accountGridShowMore: function() {
					this.loadLeadGrid("Account");
				},

				/**
				 * ####### ###### ## ########## ########
				 * @private
				 */
				createContactInsertQuery: function() {
					var insert = this.Ext.create("Terrasoft.InsertQuery", { rootSchemaName: "Contact" });
					insert.setParameterValue("Id", Terrasoft.generateGUID(), Terrasoft.DataValueType.GUID);
					var contact = this.get("Contact");
					if (contact) {
						insert.setParameterValue("Name", contact, Terrasoft.DataValueType.TEXT);
					}
					var account = this.getQualifiedField("Account");
					if (account) {
						insert.setParameterValue("Account", account.value, Terrasoft.DataValueType.GUID);
					}
					var salutationType = this.get("Title");
					if (salutationType && salutationType.value) {
						insert.setParameterValue("SalutationType", salutationType.value, Terrasoft.DataValueType.GUID);
					}
					var jobTitle = this.get("FullJobTitle");
					if (jobTitle) {
						insert.setParameterValue("JobTitle", jobTitle, Terrasoft.DataValueType.TEXT);
					}
					var phone = this.get("BusinesPhone");
					if (phone) {
						insert.setParameterValue("Phone", phone, Terrasoft.DataValueType.TEXT);
					}
					var mobilePhone = this.get("MobilePhone");
					if (mobilePhone) {
						insert.setParameterValue("MobilePhone", mobilePhone, Terrasoft.DataValueType.TEXT);
					}
					var email = this.get("Email");
					if (email) {
						insert.setParameterValue("Email", email, Terrasoft.DataValueType.TEXT);
					}
					var doNotUseEmail = this.get("DoNotUseEmail");
					if (!this.Ext.isEmpty(doNotUseEmail)) {
						insert.setParameterValue("DoNotUseEmail", doNotUseEmail, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUsePhone = this.get("DoNotUsePhone");
					if (!this.Ext.isEmpty(doNotUsePhone)) {
						insert.setParameterValue("DoNotUseCall", doNotUsePhone, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseFax = this.get("DoNotUseFax");
					if (!this.Ext.isEmpty(doNotUseFax)) {
						insert.setParameterValue("DoNotUseFax", doNotUseFax, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseSMS = this.get("DoNotUseSMS");
					if (!this.Ext.isEmpty(doNotUseSMS)) {
						insert.setParameterValue("DoNotUseSms", doNotUseSMS, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseMail = this.get("DoNotUseMail");
					if (!this.Ext.isEmpty(doNotUseMail)) {
						insert.setParameterValue("DoNotUseMail", doNotUseMail, Terrasoft.DataValueType.BOOLEAN);
					}
					insert.setParameterValue("Owner", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
						Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * ####### ###### ## ########## ######
				 * @param tag ####### ######
				 * @private
				 */
				createAddressInsertQuery: function(tag) {
					if (!this.get("AddressType")["For" + tag]) {
						return null;
					}
					var insert = this.Ext.create("Terrasoft.InsertQuery", { rootSchemaName: tag + "Address" });
					insert.setParameterValue("Id", Terrasoft.generateGUID(), Terrasoft.DataValueType.GUID);
					var addressType = this.get("AddressType");
					insert.setParameterValue("AddressType", addressType.value, Terrasoft.DataValueType.GUID);
					var country = this.get("Country");
					if (country) {
						insert.setParameterValue("Country", country.value, Terrasoft.DataValueType.GUID);
					}
					var region = this.get("Region");
					if (region) {
						insert.setParameterValue("Region", region.value, Terrasoft.DataValueType.GUID);
					}
					var city = this.get("City");
					if (city) {
						insert.setParameterValue("City", city.value, Terrasoft.DataValueType.GUID);
					}
					var zip = this.get("Zip");
					if (zip) {
						insert.setParameterValue("Zip", zip, Terrasoft.DataValueType.TEXT);
					}
					var address = this.get("Address");
					if (address) {
						insert.setParameterValue("Address", address, Terrasoft.DataValueType.TEXT);
					}
					var parent = this.getQualifiedField(tag);
					insert.setParameterValue(tag, parent.value, Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * ####### ###### ## ########## ###########
				 * @private
				 */
				createAccountInsertQuery: function() {
					var insert = this.Ext.create("Terrasoft.InsertQuery", { rootSchemaName: "Account" });
					insert.setParameterValue("Id", Terrasoft.generateGUID(), Terrasoft.DataValueType.GUID);
					var account = this.get("Account");
					if (account) {
						insert.setParameterValue("Name", account, Terrasoft.DataValueType.TEXT);
					}
					var contact = this.getQualifiedField("Contact");
					if (contact) {
						insert.setParameterValue("PrimaryContact", contact.value, Terrasoft.DataValueType.GUID);
					}
					var industry = this.get("Industry");
					if (industry) {
						insert.setParameterValue("Industry", industry.value, Terrasoft.DataValueType.GUID);
					}
					var annualRevenue = this.get("AnnualRevenue");
					if (annualRevenue) {
						insert.setParameterValue("AnnualRevenue", annualRevenue.value, Terrasoft.DataValueType.GUID);
					}
					var employeesNumber = this.get("EmployeesNumber");
					if (employeesNumber) {
						insert.setParameterValue("EmployeesNumber", employeesNumber.value, Terrasoft.DataValueType.GUID);
					}
					var businesPhone = this.get("BusinesPhone");
					if (businesPhone) {
						insert.setParameterValue("Phone", businesPhone, Terrasoft.DataValueType.TEXT);
					}
					var fax = this.get("Fax");
					if (fax) {
						insert.setParameterValue("Fax", fax, Terrasoft.DataValueType.TEXT);
					}
					var web = this.get("Website");
					if (web) {
						insert.setParameterValue("Web", web, Terrasoft.DataValueType.TEXT);
					}

					insert.setParameterValue("Owner", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
						Terrasoft.DataValueType.GUID);
					return insert;
				},

				/**
				 * ####### ###### ## ########## ########
				 * @private
				 */
				createContactUpdateQuery: function() {
					var contact = this.getQualifiedField("Contact");
					this.setQualifiedField("Contact", {
						value: contact.value,
						displayValue: contact.displayValue
					});
					var update = this.Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Contact" });
					update.filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", contact.value));
					var phone = this.get("BusinesPhone");
					if (phone) {
						update.setParameterValue("Phone", phone, Terrasoft.DataValueType.TEXT);
					}
					var mobilePhone = this.get("MobilePhone");
					if (mobilePhone) {
						update.setParameterValue("MobilePhone", mobilePhone, Terrasoft.DataValueType.TEXT);
					}
					var email = this.get("Email");
					if (email) {
						update.setParameterValue("Email", email, Terrasoft.DataValueType.TEXT);
					}
					var doNotUseEmail = this.get("DoNotUseEmail");
					if (doNotUseEmail || contact.DoNotUseEmail) {
						update.setParameterValue("DoNotUseEmail", doNotUseEmail, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUsePhone = this.get("DoNotUsePhone" || contact.DoNotUsePhone);
					if (doNotUsePhone || contact.DoNotUseCall) {
						update.setParameterValue("DoNotUseCall", doNotUsePhone, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseFax = this.get("DoNotUseFax");
					if (doNotUseFax || contact.DoNotUseFax) {
						update.setParameterValue("DoNotUseFax", doNotUseFax, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseSMS = this.get("DoNotUseSMS");
					if (doNotUseSMS || contact.DoNotUseSms) {
						update.setParameterValue("DoNotUseSms", doNotUseSMS, Terrasoft.DataValueType.BOOLEAN);
					}
					var doNotUseMail = this.get("DoNotUseMail");
					if (doNotUseMail || contact.DoNotUseMail) {
						update.setParameterValue("DoNotUseMail", doNotUseMail, Terrasoft.DataValueType.BOOLEAN);
					}
					return update;
				},

				/**
				 * ####### ###### ## ########## ###########
				 * @private
				 */
				createAccountUpdateQuery: function() {
					var account = this.getQualifiedField("Account");
					this.setQualifiedField("Account", {
						value: account.value,
						displayValue: account.displayValue
					});
					var update = this.Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Account" });
					update.filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "Id", account.value));
					var businesPhone = this.get("BusinesPhone");
					if (businesPhone) {
						update.setParameterValue("Phone", businesPhone, Terrasoft.DataValueType.TEXT);
					}
					var fax = this.get("Fax");
					if (fax) {
						update.setParameterValue("Fax", fax, Terrasoft.DataValueType.TEXT);
					}
					var web = this.get("Website");
					if (web) {
						update.setParameterValue("Web", web, Terrasoft.DataValueType.TEXT);
					}
					return update;
				},

				/**
				 * ####### ###### ## ########## ###########, ####### ####### # #####
				 * @private
				 */
				createActivitiesUpdateQuery: function() {
					var contact = this.getQualifiedField("Contact");
					var account = this.getQualifiedField("Account");

					var update = this.Ext.create("Terrasoft.UpdateQuery", { rootSchemaName: "Activity" });
					update.filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Lead", this.get("Id")));
					if (this.get("IsAssociateWithContact") && contact) {
						update.setParameterValue("Contact", contact.value, Terrasoft.DataValueType.GUID);
					}
					if (this.get("IsAssociateWithAccount") && account) {
						update.setParameterValue("Account", account.value, Terrasoft.DataValueType.GUID);
					}
					return update;
				},

				/**
				 * #########, ######## ## ####### ####### # ######## ############ ### ######.
				 * @return {Boolean} ########## ########.
				 */
				isAssociateWithFoundAccountEnabled: function() {
					return (this.get("IsAssociateWithAccount") && !this.get("IsAccountGridEmpty"));
				},

				/**
				 * #########, ######## ## ####### ####### # ######## ######### ### ######.
				 * @return {Boolean} ########## ########.
				 */
				isAssociateWithFoundContactEnabled: function() {
					return (this.get("IsAssociateWithContact") && !this.get("IsContactGridEmpty"));
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "SaveButton",
					"values": {
						"caption": { "bindTo": "Resources.Strings.QualifyButtonCaption" },
						"visible": true
					}
				},
				{
					"operation": "merge",
					"name": "BackButton",
					"values": {
						"visible": true
					}
				},
				{
					"operation": "remove",
					"name": "actions"
				},
				{
					"operation": "remove",
					"name": "Tabs"
				},
				{
					"operation": "insert",
					"name": "LeadQualificationPageV2Container",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadQualificationPageV2Container",
					"name": "LeadGeneralInfoControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoControlGroup",
					"propertyName": "items",
					"name": "LeadGeneralInfoBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "Contact",
					"values": {
						"caption": { "bindTo": "Resources.Strings.LeadNameCaption" },
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "Account",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "BusinesPhone",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "MobilePhone",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "Email",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "Website",
					"values": {
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "FullJobTitle",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "FullAddress",
					"values": {
						"caption": { "bindTo": "Resources.Strings.AddressCaption" },
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						},
						"controlConfig": {
							"enabled": false
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadGeneralInfoBlock",
					"propertyName": "items",
					"name": "Status",
					"values": {
						"visible": false
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadQualificationPageV2Container",
					"name": "AssociateWithContactBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": { "bindTo": "IsContactFilled" }
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithContactCheckBoxGridLayout",
					"parentName": "AssociateWithContactBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactCheckBoxGridLayout",
					"propertyName": "items",
					"name": "AssociateWithContactCheckBox",
					"values": {
						"bindTo": "IsAssociateWithContact",
						"labelConfig": { "visible": false },
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactCheckBoxGridLayout",
					"propertyName": "items",
					"name": "AssociateWithContactCheckBoxLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": { "bindTo": "Resources.Strings.AssociateWithContactCaption" },
						"layout": {
							"column": 1,
							"row": 0
						},
						"tag": "Contact",
						"click": { "bindTo": "onCheckBoxClick" }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactBlock",
					"propertyName": "items",
					"name": "AssociateWithContactGridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactGridLayout",
					"name": "AssociateWithContactFoundedRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "ContactButtonsGroup" },
						"items": [],
						"layout": {
							"column": 1,
							"row": 0,
							"colSpan": 23
						},
						"enabled": {
							"bindTo": "IsContactGridEmpty",
							"bindConfig": { "converter": "invertBooleanValue" }
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactFoundedRadio",
					"propertyName": "items",
					"name": "AssociateWithContactFoundedLabel",
					"values": {
						"caption": { bindTo: "Resources.Strings.AssignOneOfTheFoundCaption" },
						"controlConfig": {
							"enabled": {"bindTo": "isAssociateWithFoundContactEnabled" }
						},
						"value": "var0"
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithContactFoundedGridContainer",
					"parentName": "AssociateWithContactGridLayout",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {
							"column": 2,
							"row": 1,
							"colSpan": 22
						},
						"items": [],
						"enabled": {
							"bindTo": "IsContactGridEmpty",
							"bindConfig": { "converter": "invertBooleanValue" }
						}
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithContactFoundedGrid",
					"parentName": "AssociateWithContactFoundedGridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID,
						"primaryColumnName": "Id",
						"collection": { "bindTo": "ContactCollection" },
						"activeRow": { "bindTo": "ContactActiveRow" },
						"isEmpty": { "bindTo": "IsContactGridEmpty" },
						"isLoading": { "bindTo": "IsContactGridLoading" },
						"multiSelect": false,
						"enabled": { "bindTo": "AssociateWithContactFoundedEnabled" },
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "NameListedGridColumn",
									"caption": resources.localizableStrings.ContactNameColumnCaption,
									"bindTo": "Name",
									"position": {
										"column": 1,
										"colSpan": 8
									}
								},
								{
									"name": "AccountListedGridColumn",
									"caption": resources.localizableStrings.AccountColumnCaption,
									"bindTo": "Account",
									"position": {
										"column": 9,
										"colSpan": 8
									}
								},
								{
									"name": "EmailListedGridColumn",
									"caption": resources.localizableStrings.EMailColumnCaption,
									"bindTo": "Email",
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
							"items": []
						}
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithContactFoundedGridShowMore",
					"parentName": "AssociateWithContactFoundedGridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": { "bindTo": "Resources.Strings.ShowMoreButtonCaption" },
						"click": { "bindTo": "contactGridShowMore" },
						"controlConfig": {
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": resources.localizableImages.ShowMoreIcon
						},
						"classes": {
							"wrapperClass": ["load-more-button-class"]
						},
						"visible": { "bindTo": "ContactGridCanShowMore" }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactGridLayout",
					"name": "AssociateWithContactNewRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "ContactButtonsGroup" },
						"items": [],
						"layout": {
							"column": 1,
							"row": 2,
							"colSpan": 23
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactNewRadio",
					"propertyName": "items",
					"name": "AssociateWithContactNewLabel",
					"values": {
						"caption": { "bindTo": "Resources.Strings.CreateNewCaption" },
						"controlConfig": {
							"enabled": { "bindTo": "IsAssociateWithContact" }
						},
						"value": "var1"
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactGridLayout",
					"name": "AssociateWithContactExistsRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "ContactButtonsGroup" },
						"items": [],
						"layout": { "column": 1, "row": 3, "colSpan": 5 }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactExistsRadio",
					"propertyName": "items",
					"name": "AssociateWithContactExistsLabel",
					"values": {
						"caption": { "bindTo": "Resources.Strings.AssignExistingCaption" },
						"controlConfig": {
							"enabled": { "bindTo": "IsAssociateWithContact" }
						},
						"value": "var2"
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithContactGridLayout",
					"propertyName": "items",
					"name": "AssociateWithContactExistsQualifiedContact",
					"values": {
						"bindTo": "QualifiedContactVirtual",
						"labelConfig": { "visible": false },
						"controlConfig": {
							"loadVocabulary": { "bindTo": "loadLookup" },
							"list": { "bindTo": "contactList" },
							"tag": "Contact",
							"enabled": { "bindTo": "AssociateWithContactExistsEnabled" }
						},
						"layout": { "column": 7, "row": 3, "colSpan": 8 }
					}
				},
				{
					"operation": "insert",
					"parentName": "LeadQualificationPageV2Container",
					"name": "AssociateWithAccountBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": { "bindTo": "IsAccountFilled" }
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithAccountCheckBoxGridLayout",
					"parentName": "AssociateWithAccountBlock",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountCheckBoxGridLayout",
					"propertyName": "items",
					"name": "AssociateWithAccountCheckBox",
					"values": {
						"bindTo": "IsAssociateWithAccount",
						"labelConfig": { "visible": false },
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 1
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountCheckBoxGridLayout",
					"propertyName": "items",
					"name": "AssociateWithAccountCheckBoxLabel",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": { "bindTo": "Resources.Strings.AssociateWithAccountCaption" },
						"layout": { "column": 1, "row": 0 },
						"tag": "Account",
						"click": { "bindTo": "onCheckBoxClick" }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountBlock",
					"propertyName": "items",
					"name": "AssociateWithAccountGridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountGridLayout",
					"name": "AssociateWithAccountFoundedRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "AccountButtonsGroup" },
						"items": [],
						"layout": { "column": 1, "row": 0, "colSpan": 23 },
						"enabled": {
							"bindTo": "IsAccountGridEmpty",
							"bindConfig": { "converter": "invertBooleanValue" }
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountFoundedRadio",
					"propertyName": "items",
					"name": "AssociateWithAccountFoundedLabel",
					"values": {
						"caption": { "bindTo": "Resources.Strings.AssignOneOfTheFoundCaption" },
						"controlConfig": {
							"enabled": { "bindTo": "isAssociateWithFoundAccountEnabled" }
						},
						"value": "var0"
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithAccountFoundedGridContainer",
					"parentName": "AssociateWithAccountGridLayout",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": { "column": 2, "row": 1, "colSpan": 22},
						"items": [],
						"enabled": {
							"bindTo": "IsAccountGridEmpty",
							"bindConfig": { "converter": "invertBooleanValue" }
						}
					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithAccountFoundedGrid",
					"parentName": "AssociateWithAccountFoundedGridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID,
						"primaryColumnName": "Id",
						"collection": { "bindTo": "AccountCollection" },
						"activeRow": { "bindTo": "AccountActiveRow" },
						"isEmpty": { "bindTo": "IsAccountGridEmpty" },
						"isLoading": { "bindTo": "IsAccountGridLoading" },
						"multiSelect": false,
						"enabled": { "bindTo": "AssociateWithAccountFoundedEnabled" },
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "NameListedGridColumn",
									"caption": resources.localizableStrings.AccountNameColumnCaption,
									"bindTo": "Name",
									"position": { "column": 1, "colSpan": 8 }
								},
								{
									"name": "PhonetListedGridColumn",
									"caption": resources.localizableStrings.PhoneColumnCaption,
									"bindTo": "Phone",
									"position": { "column": 9, "colSpan": 8 }
								},
								{
									"name": "CityListedGridColumn",
									"caption": resources.localizableStrings.CityColumnCaption,
									"bindTo": "City",
									"position": { "column": 17, "colSpan": 8 }
								}
							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": { "columns": 24, "rows": 3 },
							"items": []
						}

					}
				},
				{
					"operation": "insert",
					"name": "AssociateWithAccountFoundedGridShowMore",
					"parentName": "AssociateWithAccountFoundedGridContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": { "bindTo": "Resources.Strings.ShowMoreButtonCaption" },
						"click": { "bindTo": "accountGridShowMore" },
						"controlConfig": {
							"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"imageConfig": resources.localizableImages.ShowMoreIcon
						},
						"classes": {
							"wrapperClass": ["load-more-button-class"]
						},
						"visible": { "bindTo": "AccountGridCanShowMore" }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountGridLayout",
					"name": "AssociateWithAccountNewRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "AccountButtonsGroup" },
						"items": [],
						"layout": { "column": 1, "row": 2, "colSpan": 23 }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountNewRadio",
					"propertyName": "items",
					"name": "AssociateWithAccountNewLabel",
					"values": {
						"caption": { "bindTo": "Resources.Strings.CreateNewCaption" },
						"controlConfig": {
							"enabled": { bindTo: "IsAssociateWithAccount" }
						},
						"value": "var1"
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountGridLayout",
					"name": "AssociateWithAccountExistsRadio",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.RADIO_GROUP,
						"value": { "bindTo": "AccountButtonsGroup" },
						"items": [],
						"layout": { "column": 1, "row": 3, "colSpan": 5 }
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountExistsRadio",
					"propertyName": "items",
					"name": "AssociateWithAccountExistsLabel",
					"values": {
						"caption": { "bindTo": "Resources.Strings.AssignExistingCaption" },
						"controlConfig": {
							"enabled": { "bindTo": "IsAssociateWithAccount" }
						},
						"value": "var2"
					}
				},
				{
					"operation": "insert",
					"parentName": "AssociateWithAccountGridLayout",
					"propertyName": "items",
					"name": "AssociateWithAccountExistsQualifiedAccount",
					"values": {
						"bindTo": "QualifiedAccountVirtual",
						"labelConfig": { "visible": false },
						"controlConfig": {
							"loadVocabulary": { "bindTo": "loadLookup" },
							"enabled": { "bindTo": "AssociateWithAccountExistsEnabled" },
							"list": { "bindTo": "accountList" },
							"tag": "Account"
						},
						"layout": { "column": 7, "row": 3, "colSpan": 8 }
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


