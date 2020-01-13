Terrasoft.configuration.Structures["SearchAccountAndContactPage"] = {innerHierarchyStack: ["SearchAccountAndContactPage"], structureParent: "BaseModulePageV2"};
define('SearchAccountAndContactPageStructure', ['SearchAccountAndContactPageResources'], function(resources) {return {schemaUId:'4f01d1ce-b5c7-4d19-b354-b5bef74d6e95',schemaCaption: "Search page - Contacts and Accoutns", parentSchemaName: "BaseModulePageV2", schemaName:'SearchAccountAndContactPage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SearchAccountAndContactPage", ["terrasoft", "CustomProcessPageV2Utilities"],
		function() {
			return {
				entitySchemaName: "Case",
				mixins: {
					CustomProcessPageV2Utilities: "Terrasoft.CustomProcessPageV2Utilities"
				},
				details: /**SCHEMA_DETAILS*/{
					"Contact": {
						"schemaName": "ContactSearchDetail",
						"entitySchemaName": "Contact",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "Contact"
						}
					},
					"Account": {
						"schemaName": "AccountSearchDetail",
						"entitySchemaName": "Account",
						"filter": {
							"masterColumn": "Id",
							"detailColumn": "Account"
						}
					}
				}/**SCHEMA_DETAILS*/,
				messages: {
					/**
					 * @message IsCaseIncluded
					 * ########## # ###### #########.
					 * @param {boolean} ####### ######### ### ############.
					 */
					"IsCaseIncluded": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					/**
					 * @message GetSelectButtonCaption
					 * ######## ####### ###### ######.
					 * @param {String} ####### ###### ######.
					 */
					"GetSelectButtonCaption": {
						mode: this.Terrasoft.MessageMode.BROADCAST,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
					"ContactName": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"PhoneNumber": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"Email": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"AccountName": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"CaseNumber": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"IsCaseIncluded": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"CreateContactButtonCaption": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					},
					"SearchDetailSelectButtonCaption": {
						dataValueType: this.Terrasoft.DataValueType.TEXT,
						type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
					}
				},
				diff: [
					{
						"operation": "remove",
						"name": "ESNTab"
					},
					{
						"operation": "insert",
						"name": "SearchOption",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 1,
								"row": 0,
								"colSpan": 10,
								"rowSpan": 1
							},
							"labelClass": ["new-record-header-caption-label"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "Resources.Strings.SearchOptionCaption"
							}
						}
					},
					{
						"operation": "insert",
						"name": "SearchResult",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 11,
								"row": 0,
								"colSpan": 10,
								"rowSpan": 1
							},
							"labelClass": ["new-record-header-caption-label"],
							"itemType": this.Terrasoft.ViewItemType.LABEL,
							"caption": {
								"bindTo": "Resources.Strings.SearchResultCaption"
							}
						}
					},
					{
						"operation": "insert",
						"name": "ContactName",
						"values": {
							"layout": {
								"column": 0,
								"row": 2,
								"colSpan": 10,
								"rowSpan": 1
							},
							"bindTo": "ContactName",
							"caption": {
								"bindTo": "Resources.Strings.ContactNameCaption"
							},
							"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
							"labelConfig": {
								"visible": true
							},
							"controlConfig" : {
								"keyup": {
									bindTo: "searchKeyPress"
								}
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "PhoneNumber",
						"values": {
							"layout": {
								"column": 0,
								"row": 3,
								"colSpan": 10,
								"rowSpan": 1
							},
							"bindTo": "PhoneNumber",
							"caption": {
								"bindTo": "Resources.Strings.PhoneNumberCaption"
							},
							"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
							"labelConfig": {
								"visible": true
							},
							"controlConfig" : {
								"keyup": {
									bindTo: "searchKeyPress"
								}
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 2
					},
					{
						"operation": "insert",
						"name": "AccountName",
						"values": {
							"layout": {
								"column": 0,
								"row": 4,
								"colSpan": 10,
								"rowSpan": 1
							},
							"bindTo": "AccountName",
							"caption": {
								"bindTo": "Resources.Strings.AccountNameCaption"
							},
							"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
							"labelConfig": {
								"visible": true
							},
							"controlConfig" : {
								"keyup": {
									bindTo: "searchKeyPress"
								}
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 3
					},
					{
						"operation": "insert",
						"name": "Email",
						"values": {
							"layout": {
								"column": 0,
								"row": 5,
								"colSpan": 10,
								"rowSpan": 1
							},
							"bindTo": "Email",
							"caption": {
								"bindTo": "Resources.Strings.EmailCaption"
							},
							"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
							"labelConfig": {
								"visible": true
							},
							"controlConfig" : {
								"keyup": {
									bindTo: "searchKeyPress"
								}
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 4
					},
					{
						"operation": "insert",
						"name": "CaseNumber",
						"values": {
							"layout": {
								"column": 0,
								"row": 6,
								"colSpan": 10,
								"rowSpan": 1
							},
							"bindTo": "CaseNumber",
							"caption": {
								"bindTo": "Resources.Strings.CaseNumberCaption"
							},
							"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
							"labelConfig": {
								"visible": true
							},
							"controlConfig" : {
								"keyup": {
									bindTo: "searchKeyPress"
								}
							},
							"visible": {
								"bindTo": "IsCaseIncluded"
							}
						},
						"parentName": "Header",
						"propertyName": "items",
						"index": 5
					},
					{
						"operation": "insert",
						"name": "SearchResultContainer",
						"parentName": "Header",
						"propertyName": "items",
						"values": {
							"layout": {
								"column": 11,
								"row": 2,
								"colSpan": 12,
								"rowSpan": 12
							},
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					//TODO: ###### ########## ######## # ####### ############# ##########
					{
						"operation": "merge",
						"name": "Tabs",
						"values": {
							"visible": false
						}
					},
					{
						"operation": "insert",
						"name": "ContactTab",
						"values": {
							"caption": {
								"bindTo": "Resources.Strings.ContactTabCaption"
							},
							"items": []
						},
						"parentName": "Tabs",
						"propertyName": "tabs",
						"index": 1
					},
					{
						"operation": "insert",
						"name": "Contact",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL
						},
						"parentName": "SearchResultContainer",
						"propertyName": "items",
						"index": 0
					},

					{
						"operation": "insert",
						"name": "Account",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.DETAIL
						},
						"parentName": "SearchResultContainer",
						"propertyName": "items",
						"index": 1
					},
					{
						"operation": "remove",
						"name": "SaveButton"
					},
					{
						"operation": "remove",
						"name": "DiscardChangesButton"
					},
					{
						"operation": "remove",
						"name": "CloseButton"
					},
					{
						"operation": "remove",
						"name": "ViewOptionsButton"
					},
					{
						"operation": "remove",
						"name": "actions"
					},
					{
						"operation": "remove",
						"name": "DelayExecutionButton"
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "SearchButton",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.SearchButtonCaption"},
							"classes": {"textClass": ["actions-button-margin-right"]},
							"click": {"bindTo": "onSearchClick"},
							"style": this.Terrasoft.controls.ButtonEnums.style.GREEN
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "ClearButton",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.ClearButtonCaption"},
							"classes": {"textClass": ["actions-button-margin-right"]},
							"click": {"bindTo": "onClearClick"}
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "CreateContactButton",
						"values": {
							layout: {column: 10, row: 0, colSpan: 2},
							"itemType": this.Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "getCreateContactButtonCaption"},
							"classes": {"textClass": ["actions-button-margin-right"]},
							"click": {"bindTo": "onCreateContactButton"},
							"style": this.Terrasoft.controls.ButtonEnums.style.BLUE
						}
					}
				],
				methods: {
					/**
					* @inheritDoc Terrasoft.BasePageV2#init
					* @protected
					*/
					init: function() {
						this.callParent(arguments);
						this.set("UseTagModule", false);
					},

					/**
					 * ######### ######## "#####".
					 * @private
					 */
					onSearchClick: function() {
						this.sandbox.publish("UpdateDetail", this.getContactSearchConfig(),
								[this.sandbox.id + "_detail_ContactContact"]);
						this.sandbox.publish("UpdateDetail", this.getAccountSearchConfig(),
								[this.sandbox.id + "_detail_AccountAccount"]);
						this.sandbox.publish("IsCaseIncluded", this.get("IsCaseIncluded"));
						this.sandbox.publish("GetSelectButtonCaption", this.get("SearchDetailSelectButtonCaption"));
					},
					/**
					 * ######### ####### ###### #####.
					 * @private
					 */
					searchKeyPress: function(e) {
						var key = e.getKey();
						if (key === e.ENTER) {
							this.onSearchClick();
						}
					},
					/**
					 * ########## ############ ### ########## ###### ########.
					 * @private
					 */
					getContactSearchConfig: function() {
						return {
							"Name": this.get("ContactName"),
							"Phone": this.get("PhoneNumber"),
							"Email": this.get("Email"),
							"Account": this.get("AccountName"),
							"Case": this.get("CaseNumber")
						};
					},
					/**
					 * ########## ############ ### ########## ###### ###########.
					 * @private
					 */
					getAccountSearchConfig: function() {
						return {
							"Name": this.get("AccountName"),
							"Case": this.get("CaseNumber"),
							"Phone": this.get("PhoneNumber")
						};
					},
					/**
					 * ######### ######## "########".
					 * @private
					 */
					onClearClick: function() {
						this.set("ContactName", "");
						this.set("PhoneNumber", "");
						this.set("Email", "");
						this.set("AccountName", "");
						this.set("CaseNumber", "");
					},
					/**
					 * ######### ############ #### ### # #### ### ## ######, ## ########### ######## ## #########
					 * ######## ######### ###### ######## # ######### ######### #######
					 * @private
					 */
					onCreateContactButton: function() {
						this.set("ResultCode", "ContactNew");
						this.set("ContactName", this.get("ContactName"));
						this.set("PhoneNumber", this.get("PhoneNumber"));
						this.set("Email", this.get("Email"));
						this.set("AccountName", this.get("AccountName"));
						this.acceptProcessElement();
					},
					/**
					 * ######## ###### ## ###### ########### # ######### ######### #######
					 * @private
					 * @param {Object} config ######### ######## Id.
					 */
					nextProcessElementAccount: function(config) {
						if (config) {
							this.set("ResultCode", "AccountSelected");
							this.set("AccountId", config);
							this.acceptProcessElement();
						}
					},
					/**
					 * Obtain data from "Contacts" detail and execute next process.
					 * @private
					 * @param {Object} config Attributes config.
					 */
					nextProcessElementContact: function(config) {
						if (config) {
							this.set("ResultCode", "ContactSelected");
							this.set("ContactId", config);
							this.acceptProcessElement();
						}
					},

					/**
					 * Return caption for creating contact button.
					 * @protected
					 * @virtual
					 * @return {String} Caption for creating contact button.
					 */
					getCreateContactButtonCaption: function() {
						if (this.get("CreateContactButtonCaption")) {
							return this.get("CreateContactButtonCaption");
						} else {
							return this.get("Resources.Strings.CreateContactButtonCaption");
						}
					},
					/**
					 * Subscribe on messages required for working with details.
					 * @protected
					 * @overridden
					 */
					subscribeSandboxEvents: function() {
						this.callParent(arguments);
						this.sandbox.subscribe("DetailChanged",
								function(config) {
									this.nextProcessElementAccount(config);
								},
								this, [this.sandbox.id + "_detail_AccountAccount"]);
						this.sandbox.subscribe("DetailChanged",
								function(config) {
									this.nextProcessElementContact(config);
								},
								this, [this.sandbox.id + "_detail_ContactContact"]);
					},
					/**
					 * Return page header.
					 * @protected
					 * @virtual
					 */
					getHeader: function() {
						return this.get("Resources.Strings.PageCaption");
					},

					/**
					 * @inheritdoc Terrasoft.BasePageV2#initContainersVisibility
					 * @overridden
					 */
					initContainersVisibility: function() {
						this.callParent(arguments);
						this.set("IsActionDashboardContainerVisible", false);
					}
				}
			};
		});


