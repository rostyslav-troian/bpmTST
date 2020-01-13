Terrasoft.configuration.Structures["LeadMiniPage"] = {innerHierarchyStack: ["LeadMiniPage"], structureParent: "BaseMiniPage"};
define('LeadMiniPageStructure', ['LeadMiniPageResources'], function(resources) {return {schemaUId:'a6bcff3c-0159-4547-b143-0b69cf303bd2',schemaCaption: "LeadMiniPage", parentSchemaName: "BaseMiniPage", schemaName:'LeadMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadMiniPage", ["MiniPageResourceUtilities", "EmailHelper", "BaseProgressBarModule",
	"css!BaseProgressBarModule", "css!LeadMiniPageCSS"],
	function(miniPageResources, EmailHelper) {
		return {
			entitySchemaName: "Lead",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				/**
				 * @inheritdoc BaseMiniPage#MiniPageModes
				 * @overridden
				 */
				"MiniPageModes": {
					"value": [Terrasoft.ConfigurationEnums.CardOperation.VIEW,
						Terrasoft.ConfigurationEnums.CardOperation.ADD]
				},

				/**
				 * Is Qualified lookup columns visible.
				 * @type {Boolean}
				 */
				"IsQualifiedLookupVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Lead Qualify Status, get additional field StageNumber.
				 * @type {Object}
				 */
				"QualifyStatus": {
					"lookupListConfig": {
						"columns": ["StageNumber"]
					}
				},

				/**
				 * Is add from section.
				 * @type {Boolean}
				 */
				"IsFromSection": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": false
				}
			},
			methods: {
				/**
				 * @inheritDoc BaseMiniPage#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initEmailExtendedMenuButtonCollections(["QualifiedContact", "QualifiedAccount", "Lead"],
						this.close);
					this.initCallExtendedMenuButtonCollections(["QualifiedContact", "QualifiedAccount", "Lead"],
						this.close);
					this.addColumnValidator("LeadType", this.getLeadTypeValidator);
					this.addColumnValidator("Email", EmailHelper.getEmailValidator);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.fillEmailExtendedMenuButtonCollections(["QualifiedContact", "QualifiedAccount"]);
					this.fillCallExtendedMenuButtonCollections(["QualifiedContact", "QualifiedAccount"]);
					this.fillLeadCommunicationButtonsCollection();
					this.initFieldsVisibility();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#switchMiniPageMode
				 * @overridden
				 */
				switchMiniPageMode: function() {
					this.callParent(arguments);
					this.initFieldsVisibility();
				},

				/**
				 * Initialization fields visibility.
				 * @protected
				 */
				initFieldsVisibility: function() {
					var contact = this.get("QualifiedContact");
					var account = this.get("QualifiedAccount");
					this.set("IsQualifiedLookupVisible", (Ext.isObject(contact) || Ext.isObject(account))
							|| this.isNotViewMode());
				},

				/**
				 * Fill lead communication buttons.
				 * @protected
				 */
				fillLeadCommunicationButtonsCollection: function() {
					var call = this.get("MobilePhone");
					var email = this.get("Email");
					var relationFields = Ext.create("Terrasoft.Collection");
					relationFields.add("Lead", {
						name: "Lead",
						value: this.get("Id"),
						type: Terrasoft.DataValueType.GUID
					});
					this.fillButtonCollection({
						EntitySchemaName: "Lead",
						CustomerId: this.get("Id"),
						Number: call,
						callRelationFields:	relationFields
					}, "CallLeadExtendedMenu", this.extendedCallMenuItemClick);
					this.fillButtonCollection({
						schemaName: "Lead",
						recordId: this.get("Id"),
						email: email
					}, "EmailLeadExtendedMenu", this.extendedEmailMenuItemClick);
				},

				/**
				 * Fill ExtendedMenu data.
				 * @protected
				 * @param {Object} config Recipient info, which used for call/email button.
				 * @param {String} collectionName Collection with which we work.
				 * @param {Function} onClick Function, which executed on menu item click.
				 */
				fillButtonCollection: function(config, collectionName, onClick) {
					var collection = this.get(collectionName);
					collection.clear();
					if (config && (config.Number || config.email)) {
						this.set(collectionName + "ButtonVisible", true);
						var value = config.Number || config.email;
						collection.addItem(this.getButtonMenuItem({
							"Caption": value,
							"Tag": {
								"itemTag": config,
								"menuName": value,
								"menuItemClick": onClick
							},
							"Click": {"bindTo": "onButtonMenuItemClick"}
						}, this));
					} else {
						this.set(collectionName + "ButtonVisible", false);
					}
				},

				/**
				 * Get text fields (Contact, Account) visibility.
				 * @param {String} columnNames Column names.
				 * @return {Boolean} return boolean value of fields visibility.
				 */
				getContactAccountVisibility: function(columnNames) {
					if (this.get("IsFromSection") || this.get("IsFromQuickAddMenu")) {
						return true;
					}
					return !this.get("IsQualifiedLookupVisible") && this.isViewMode(columnNames);
				},

				/**
				 * Get lookup fields (QualifiedContact, QualifiedAccount) visibility.
				 * @param {String} columnNames Column names.
				 * @return {Boolean} return boolean value of fields visibility.
				 */
				getQualifiedContactAccountVisibility: function(columnNames) {
					if (this.get("IsFromSection") || this.get("IsFromQuickAddMenu")) {
						return false;
					}
					return (this.get("IsQualifiedLookupVisible") && this.isViewMode(columnNames))
							|| this.isNotViewMode();
				},

				/**
				 * Lead type required validator.
				 * @param {Object} value Column attribute value.
				 * @protected
				 * @return {Object} Validation lead type.
				 */
				getLeadTypeValidator: function(value) {
					return {
						invalidMessage: (!value)
							? Terrasoft.Resources.BaseViewModel.columnRequiredValidationMessage
							: ""
					};
				},

				/**
				 * @private
				 */
				parseLeadName: function(value) {
					value = value && value.split("/");
					return value && value[0];
				},

				/**
				 * @private
				 */
				parseQualifyStatus: function(value) {
					if (!value) {
						return null;
					} else {
						return {
							value: value.StageNumber,
							displayValue: value.displayValue
						};
					}
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "HeaderColumnContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {"bindTo": "getPrimaryDisplayColumnValue"},
						"labelClass": ["label-in-header-container"],
						"visible": {"bindTo": "isEditMode"}
					},
					"index": 0
				},
				{
					"operation": "merge",
					"name": "MiniPage",
					"values": {
						"classes": {
							"wrapClassName": ["lead-mini-page-container"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "RequiredColumnsContainer",
					"values": {
						"classes": {
							"wrapClassName": ["required-columns-container", "grid-layout",
								"lead-mini-page-container"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "CloseMiniPageButton",
					"values": {
						"visible": {"bindTo": "isNotViewMode"}
					}
				},
				{
					"operation": "insert",
					"name": "LeadName",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"labelConfig": {"visible": false},
						"visible": {"bindTo": "isViewMode"},
						"caption": {
							"bindTo": "LeadName",
							"bindConfig": {"converter": "parseLeadName"}
						},
						"isMiniPageModelItem": true,
						"enabled": false
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "LeadButtonsContainer",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"wrapClass": ["lead-header-buttons"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"name": "LeadEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "Lead",
									"Click": {"bindTo": "prepareEmailButtonMenu"}
								}
							},
							{
								"name": "LeadCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "Lead",
									"Click": {"bindTo": "prepareCallButtonMenu"}
								}
							}
						]
					},
					"index": 2
				},
				{
					"operation": "insert",
					"name": "LeadTypeStatus",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"labelConfig": {"visible": false},
						"visible": {"bindTo": "isViewMode"},
						"isMiniPageModelItem": true,
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"name": "LeadType",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"isMiniPageModelItem": true,
						"visible": {"bindTo": "isNotViewMode"},
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM,
						"isRequired": true
					}
				},
				{
					"operation": "insert",
					"name": "QualifyStatus",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"labelConfig": {"visible": false},
						"wrapClass": ["lead-progress-bar-module"],
						"visible": {"bindTo": "isViewMode"},
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"enabled": false,
						"controlConfig": {
							"value": {
								"bindTo": "QualifyStatus",
								"bindConfig": {"converter": "parseQualifyStatus"}
							}
						},
						"dataValueType": Terrasoft.DataValueType.STAGE_INDICATOR
					}
				},
				{
					"operation": "insert",
					"name": "Account",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"isMiniPageModelItem": true,
						"visible": {"bindTo": "getContactAccountVisibility"}
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"layout": {"column": 0, "row": 5, "colSpan": 24},
						"isMiniPageModelItem": true,
						"visible": {"bindTo": "getContactAccountVisibility"}
					}
				},
				{
					"operation": "insert",
					"name": "QualifiedContactContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"wrapClass": ["lookup-with-communication-buttons"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "getQualifiedContactAccountVisibility"},
						"layout": {"column": 0, "row": 6, "colSpan": 24},
						"items": [
							{
								"name": "QualifiedContact",
								"isMiniPageModelItem": true,
								"contentType": Terrasoft.ContentType.ENUM
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "QualifiedContactButtonContainer",
					"parentName": "QualifiedContactContainer",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"wrapClass": ["lookup-with-communication-buttons"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"name": "ContactEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "QualifiedContact",
									"Click": {"bindTo": "prepareEmailButtonMenu"},
									"visible": {"bindTo": "isViewMode"}
								}
							},
							{
								"name": "ContactCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "QualifiedContact",
									"Click": {"bindTo": "prepareCallButtonMenu"},
									"visible": {"bindTo": "isViewMode"}
								}
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "QualifiedAccountContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"wrapClass": ["lookup-with-communication-buttons"],
						"layout": {"column": 0, "row": 7, "colSpan": 24},
						"visible": {"bindTo": "getQualifiedContactAccountVisibility"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"name": "QualifiedAccount",
								"isMiniPageModelItem": true,
								"contentType": Terrasoft.ContentType.ENUM
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "QualifiedAccountButtonContainer",
					"parentName": "QualifiedAccountContainer",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"wrapClass": ["lookup-with-communication-buttons"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"name": "AccountEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "QualifiedAccount",
									"Click": {"bindTo": "prepareEmailButtonMenu"}
								}
							},
							{
								"name": "AccountCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,

								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "QualifiedAccount",
									"Click": {"bindTo": "prepareCallButtonMenu"}
								}
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "Email",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"isMiniPageModelItem": true,
						"layout": {"column": 0, "row": 8, "colSpan": 24},
						"visible": {"bindTo": "isNotViewMode"}
					}
				},
				{
					"operation": "insert",
					"name": "MobilePhone",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"className": "Terrasoft.PhoneEdit",
						"isMiniPageModelItem": true,
						"layout": {"column": 0, "row": 9, "colSpan": 24},
						"visible": {"bindTo": "isNotViewMode"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


