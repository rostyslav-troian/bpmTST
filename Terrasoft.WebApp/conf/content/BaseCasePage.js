Terrasoft.configuration.Structures["BaseCasePage"] = {innerHierarchyStack: ["BaseCasePage"], structureParent: "BaseModulePageV2"};
define('BaseCasePageStructure', ['BaseCasePageResources'], function(resources) {return {schemaUId:'52a681dd-7d75-47b3-8c63-73e83877bd1f',schemaCaption: "Base edit schema - Cases page", parentSchemaName: "BaseModulePageV2", schemaName:'BaseCasePage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseCasePage", ["BaseFiltersGenerateModule", "ServiceDeskConstants", "BusinessRuleModule",
		"ConfigurationEnums"],
	function(BaseFiltersGenerateModule, ServiceDeskConstants, BusinessRuleModule, Enums) {
		return {
			entitySchemaName: "BaseCase",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "RegisteredOn",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 9,
							"rowSpan": 1
						},
						"bindTo": "RegisteredOn",
						"caption": {
							"bindTo": "Resources.Strings.RegisteredOnCaption"
						},
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "CurrentStatusGroup_gridLayout",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Number",
					"values": {
						"layout": {
							"column": 16,
							"row": 0,
							"colSpan": 8,
							"rowSpan": 1
						},
						"bindTo": "Number",
						"caption": {
							"bindTo": "Resources.Strings.NumberCaption"
						},
						"contentType": Terrasoft.ContentType.SHORT_TEXT,
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Symptoms",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Symptoms",
						"caption": {
							"bindTo": "Resources.Strings.SymptomsCaption"
						},
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "Subject",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 16,
							"rowSpan": 1
						},
						"bindTo": "Subject",
						"caption": {
							"bindTo": "Resources.Strings.SubjectCaption"
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "Priority",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Priority",
						"caption": {
							"bindTo": "Resources.Strings.PriorityCaption"
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "Account",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Account",
						"caption": {
							"bindTo": "Resources.Strings.AccountCaption"
						}
					},
					"parentName": "CurrentStatusGroup_gridLayout",
					"propertyName": "items",
					"index": 5
				},
				{
					"operation": "insert",
					"name": "Origin",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Origin",
						"caption": {
							"bindTo": "Resources.Strings.OriginCaption"
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "CurrentStatusGroup_gridLayout",
					"propertyName": "items",
					"index": 6
				},
				{
					"operation": "insert",
					"name": "Contact",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Contact",
						"caption": {
							"bindTo": "Resources.Strings.ContactCaption"
						}
					},
					"parentName": "CurrentStatusGroup_gridLayout",
					"propertyName": "items",
					"index": 7
				},
				{
					"operation": "insert",
					"name": "Category",
					"values": {
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Category",
						"contentType": this.Terrasoft.ContentType.ENUM
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 6
				},
				{
					"operation": "insert",
					"name": "GeneralInfoTab",
					"values": {
						"caption": {
							"bindTo": "Resources.Strings.GeneralInfoTabCaption"
						},
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "CurrentStatusGroup_gridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Status",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "Status",
						"caption": {
							"bindTo": "Resources.Strings.StatusCaption"
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Relations_gridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "RelationsTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "SolutionDate",
					"values": {
						"layout": {
							"column": 12,
							"row": 2,
							"colSpan": 9,
							"rowSpan": 1
						},
						"bindTo": "SolutionDate",
						"caption": {
							"bindTo": "Resources.Strings.SolutionDateCaption"
						},
						"labelConfig": {
							"visible": true
						}
					},
					"parentName": "CurrentStatusGroup_gridLayout",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "SolutionProvidedOn",
					"values": {
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "SolutionProvidedOn",
						"caption": {
							"bindTo": "Resources.Strings.SolutionProvidedOnCaption"
						},
						"enabled": false
					},
					"parentName": "Relations_gridLayout",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "SolutionTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.SolutionTabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "SolutionMainGroup",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {
							"bindTo": "Resources.Strings.SolutionMainGroupCaption"
						},
						"items": [],
						"controlConfig": {
							"collapsed": false
						}
					},
					"parentName": "SolutionTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "SolutionMainGroup_gridLayout",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"parentName": "SolutionMainGroup",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ClosureCode",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "ClosureCode",
						"caption": {
							"bindTo": "Resources.Strings.ClosureCodeCaption"
						},
						"contentType": Terrasoft.ContentType.ENUM,
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "Relations_gridLayout",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "ClosureDate",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 12,
							"rowSpan": 1
						},
						"bindTo": "ClosureDate",
						"caption": {
							"bindTo": "Resources.Strings.ClosureDateCaption"
						},
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "Relations_gridLayout",
					"propertyName": "items",
					"index": 4
				},
				{
					"operation": "insert",
					"name": "NotesFilesTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesFilesTabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 3
				},
				{
					"operation": "insert",
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					},
					"parentName": "NotesFilesTab",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.NotesGroupCaption"
						}
					},
					"parentName": "NotesFilesTab",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Notes",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"imageLoaded": {
								"bindTo": "insertImagesToNotes"
							},
							"images": {
								"bindTo": "NotesImagesCollection"
							}
						}
					},
					"parentName": "NotesControlGroup",
					"propertyName": "items",
					"index": 0
				},
				{
					"operation": "insert",
					"name": "RelationsTab",
					"values": {
						"items": [],
						"caption": {
							"bindTo": "Resources.Strings.RelationsTabCaption"
						}
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 2
				}

			]/**SCHEMA_DIFF*/,
			attributes: {
				"Status": {
					lookupListConfig: {
						columns: ["IsFinal", "IsResolved", "IsPaused"],
						filter: function() {
							var status = this.get("OriginalStatus");
							var filterGroup = new this.Terrasoft.createFilterGroup();
							if (!status || status.IsFinal) {
								filterGroup.add("emptyFilter", this.Terrasoft.createColumnIsNullFilter("Id"));
								return filterGroup;
							}
							filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
							filterGroup.add("StatusFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[CaseNextStatus:NextStatus].Status", this.get("OriginalStatus").value));
							filterGroup.add("StatusFilterCurrent", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"Id", this.get("OriginalStatus").value));
							return filterGroup;

						}
					}
				},
				"SatisfactionLevel": {
					lookupListConfig: {
						columns: ["Point"],
						orders: [
							{
								columnPath: "Point",
								direction: Terrasoft.OrderDirection.DESC
							}
						]
					}
				},
				"RespondedOn": {
					dependencies: [
						{
							columns: ["Status"],
							methodName: "onStatusChanged"
						}
					]

				}
			},
			methods: {
				/**
				 * ####### ######### ############# ########.
				 * ############# ################ ##### ### ##### # ########## #########.
				 * @overridden
				 */
				onEntityInitialized: function() {
					if (this.isAddMode() || this.isCopyMode()) {
						this.setCaseNumber();
					}
					this.Terrasoft.SysSettings.querySysSettingsItem(this.statusDefSysSettingsName, function(value) {
						this.set("StatusDefSysSettingsValue", value);
					}, this);
					this.updateOriginals();
					var contact = this.get("Contact");
					if (contact && !this.get("Account")) {
						var account = contact.Account;
						if (account) {
							this.set("Account", account);
						}
					}
					this.set("PreviousStatus", this.get("Status"));
					this.callParent(arguments);
				},

				/**
				 * ############# ##### #########
				 */
				setCaseNumber: function() {
					this.getIncrementCode(function(response) {
						this.set("Number", response);
					});
				},

				/**
				 * ######### ######## ######## ###### #############.
				 * #### ############ ############ ########, ####### ######### # ############# ########## #######.
				 * ######### ############ ##### "#######" ### "##########".
				 * @protected
				 * @overridden
				 * @param {Function} callback callback-#######
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######
				 */
				asyncValidate: function(callback, scope) {
					this.callParent([function(response) {
						var chainCheckResponse = function(next) {
							if (!this.response.success) {
								this.callback.call(this.scope, this.response);
							} else {
								next();
							}
						};
						var chainValidateAccountOrContact = function(next) {
							var self = this;
							this.scope.validateAccountOrContactFilling(function(response) {
								self.response = response;
								next();
							}, this.scope);
						};
						var chainInvokeCallback = function() {
							this.callback.call(this.scope, this.response);
						};
						var chainScope = {
							scope: scope || this,
							response: response,
							callback: callback
						};
						this.Terrasoft.chain(chainCheckResponse, chainValidateAccountOrContact, chainInvokeCallback, chainScope);
					}, this]);
				},

				/**
				 * ######### ############ ##### "#######" ### "##########"
				 * @param {Function} callback
				 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######
				 */
				validateAccountOrContactFilling: function(callback, scope) {
					var account = this.get("Account");
					var contact = this.get("Contact");
					var result = {
						success: true
					};
					if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
						result.message = this.get("Resources.Strings.RequiredContactOrAccountMessage");
						result.success = false;
					}
					callback.call(scope || this, result);
				},

				/**
				 * ##########, ####### ######### ######## ## ######### ###########.
				 * ### ######## ######### # ######### ########## ########### #### "########### ##########"
				 * @param {Object} status ######### #########
				 */
				handleResolvedStatus: function(status) {
					if (status.IsResolved && !this.get("SolutionProvidedOn")) {
						this.set("SolutionProvidedOn", new Date());
					}
				},

				/**
				 * ####### #### "########### ########", #### ######### #### ######## # ############ # ## ########
				 * @param {Object} status ######### #########
				 */
				clearSolutionProvidedOn: function(status) {
					var previousStatus = this.get("PreviousStatus");
					if (!status.IsFinal && previousStatus.IsResolved && this.get("SolutionProvidedOn")) {
						this.set("SolutionProvidedOn", 0);
					}
				},

				/**
				 * ##########, ####### ######### ######## ## ######### ########.
				 * #### ### ########, ############# ######## # #### "#### ########" # "### ########".
				 * @param {Object} status ######### #########
				 */
				handleFinalStatus: function(status) {
					if (status.IsFinal && !this.get("ClosureDate")) {
						this.set("ClosureDate", new Date());
						if (this.get("OriginalSolutionProvidedOn")) {
							this.set("SolutionProvidedOn", this.get("OriginalSolutionProvidedOn"));
						}
						if (!this.get("ClosureCode")) {
							this.Terrasoft.SysSettings.querySysSettingsItem("CaseClosureCodeDef", function(value) {
								this.set("ClosureCode", value);
							}, this);
						}
					} else {
						this.set("ClosureDate", null);
						this.set("ClosureCode", null);
					}
				},

				/**
				 * ########## ####### ######### ######## ## ######### ######.
				 * ### ######## ######### # ######### ##### #########
				 * @param {Object} status ######### #########
				 */
				handlePausedStatus: function(status) {
					if (status.IsPaused) {
						this.set("SolutionDateGetter", this.get("SolutionDate"));
						this.set("SolutionDate", null);
						if (this.get("IsOriginalStatusPaused") === false && this.get("SolutionDateGetter")) {
							this.calculateRemains(true);
						}
					} else {
						if (this.get("IsOriginalStatusPaused")) {
							this.calculateDateAfterPause(true);
						}
					}
				},

				/**
				 * ########## ####### ######### #### "######".
				 * ### ######## ######### ## ########## ######### # ##### ###### #### "########### #######"
				 * ########### ####### ##### # ########
				 * @protected
				 */
				onStatusChanged: function() {
					var status = this.get("Status");
					if (!status) {
						return;
					}
					if (this.isStatusDef() === false && !this.get("RespondedOn")) {
						this.set("RespondedOn", new Date());
					} else {
						if (this.isStatusDef()) {
							this.set("RespondedOn", null);
						}
					}
					var originalStatus = this.get("OriginalStatus");
					if (!originalStatus) {
						return;
					}
					if (this.isNew || originalStatus !== status) {
						this.handleFinalStatus(status);
						this.handleResolvedStatus(status);
					}

					this.clearSolutionProvidedOn(status);
					this.set("PreviousStatus", status);
				},

				/**
				 * ######### ############# #### "########### #######" # #### ## ### ######## ## ##### ####### ########
				 * @protected
				 * @returns {Boolean}
				 */
				needUpdateRespondedOn: function() {
					return this.get("RespondedOn") && this.changedValues && this.changedValues.RespondedOn;
				},

				/**
				 * ######### ############# #### "########### ##########" # #### ## ### ######## ## ##### ####### ########
				 * @protected
				 * @returns {Boolean}
				 */
				needUpdateSolutionProvidedOn: function() {
					return this.get("SolutionProvidedOn") && this.changedValues && this.changedValues.SolutionProvidedOn;
				},

				/**
				 * ######### ##### ## ######## #### "#########" ######## ##
				 * ######### ######### "######### <### #########> ## #########"
				 * @protected
				 * @returns {Boolean}
				 */
				isStatusDef: function() {
					var status = this.get("Status");
					var statusDefSysSettingsValue = this.get("StatusDefSysSettingsValue");
					if (!status || !statusDefSysSettingsValue) {
						return;
					}
					return statusDefSysSettingsValue.value === status.value;
				},

				/**
				 * ######### ####### ##### ## #########, ########## ######## ######### ##########, ######## ########
				 * # ###### #############, ######## ############ ######## #### "########### #######" ##### ###########
				 * @protected
				 * @virtual
				 */
				save: function() {
					if (this.needUpdateRespondedOn()) {
						this.set("RespondedOn", new Date());
					}
					if (this.needUpdateSolutionProvidedOn()) {
						this.set("SolutionProvidedOn", new Date());
					}
					var solutionRemainsSetter = this.get("SolutionRemainsSetter");
					if (solutionRemainsSetter) {
						this.set("SolutionRemains", solutionRemainsSetter);
					} else {
						this.set("SolutionRemains", 0);
					}
					this.updateOriginals();
					this.callParent(arguments);
				},

				/**
				 * ########## ######### EntitySchemaQuery ### ######### ###### lookup #######
				 * @overridden
				 * @private
				 * @param {String} filterValue ###### ### primaryDisplayColumn
				 * @param {String} columnName ### ####### ViewModel
				 * @param {Boolean} isLookup ####### ########### ####
				 * @return {Terrasoft.EntitySchemaQuery}
				 */
				getLookupQuery: function(filterValue, columnName, isLookup) {
					var prepareListColumnName = this.get("PrepareListColumnName");
					var prepareListFilters = this.get(prepareListColumnName + "Filters");
					var entitySchemaQuery = this.callParent([filterValue, columnName, isLookup]);
					if (columnName === prepareListColumnName && prepareListFilters) {
						entitySchemaQuery.filters.add(prepareListColumnName + "Filter", prepareListFilters);
					}
					return entitySchemaQuery;
				},

				/**
				 * ######### ########## # ######### ###### #######
				 * @param {Boolean} isNull ####### ####### ######### ######
				 */
				updateOriginals: function(isNull) {
					var status = isNull ? null : this.get("Status");
					this.set("OriginalStatus", status);
					if (status) {
						this.set("IsOriginalStatusPaused", status.IsPaused);
					}
					this.set("OriginalSolutionProvidedOn", isNull ? null : this.get("SolutionProvidedOn"));
				},

				/**
				 * ####### ########## # ######### ###### ####### ### ######### ######## ###### # #######.
				 * @overridden
				 * @param {Object} config ###### ##########.
				 */
				onGridRowChanged: function() {
					var result = this.callParent(arguments);
					this.updateOriginals(true);
					return result;
				},

				/**
				 * ############# ############# ########### #######.
				 * @protected
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1063);
					this.callParent(arguments);
				}
			},
			rules: {
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				},
				"ClosureCode": {
					"EnableClosureCodeOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "Status",
									attributePath: "IsFinal"
								},
								comparisonType: this.Terrasoft.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: true
								}
							},
							{
								leftExpression: {
									type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									attribute: "Status",
									attributePath: "IsResolved"
								},
								comparisonType: this.Terrasoft.ComparisonType.EQUAL,
								rightExpression: {
									type: BusinessRuleModule.enums.ValueType.CONSTANT,
									value: true
								}
							}
						]
					},
					"RequireClosureCodeOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.REQUIRED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Status",
								attributePath: "IsFinal"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				},
				"ClosureDate": {
					"EnableClosureDateOnFinalState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Status",
								attributePath: "IsFinal"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				},
				"Category": {
					"EnableTypeOnAdd": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Operation"
							},
							comparisonType: this.Terrasoft.ComparisonType.EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: Enums.CardStateV2.ADD
							}
						}]
					}
				},
				"SolutionDate": {
					"DisableSolutionDateOnPausedState": {
						ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						property: BusinessRuleModule.enums.Property.ENABLED,
						conditions: [{
							leftExpression: {
								type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								attribute: "Status",
								attributePath: "IsPaused"
							},
							comparisonType: this.Terrasoft.ComparisonType.NOT_EQUAL,
							rightExpression: {
								type: BusinessRuleModule.enums.ValueType.CONSTANT,
								value: true
							}
						}]
					}
				}
			},
			userCode: {}
		};
	});


