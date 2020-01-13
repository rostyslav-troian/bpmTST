Terrasoft.configuration.Structures["PortalAccountMiniPage"] = {innerHierarchyStack: ["PortalAccountMiniPage"], structureParent: "BaseMiniPage"};
define('PortalAccountMiniPageStructure', ['PortalAccountMiniPageResources'], function(resources) {return {schemaUId:'4d5652a9-47b8-432e-aa48-2cfa54da9570',schemaCaption: "Account minipage at portal", parentSchemaName: "BaseMiniPage", schemaName:'PortalAccountMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalAccountMiniPage", ["MiniPageResourceUtilities", "AccountMiniPageResources", "css!AccountMiniPageCSS",
	"AccountPageMixin"],
	function(miniPageResources) {
		return {
			entitySchemaName: "Account",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			messages: {
				"AccountSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				/**
				 * @class AccountPageMixin Mixin, implements common business logic for Account.
				 */
				AccountPageMixin: "Terrasoft.AccountPageMixin"
			},
			attributes: {
				/**
				 * @inheritdoc BaseMiniPage#MiniPageModes
				 * @override
				 */
				"MiniPageModes": {
					"value": [Terrasoft.ConfigurationEnums.CardOperation.VIEW,
						Terrasoft.ConfigurationEnums.CardOperation.ADD,
						Terrasoft.ConfigurationEnums.CardOperation.EDIT
					]
				},

				/**
				 * Object with current account information.
				 */
				"CurrentAccount": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					referenceSchemaName: "Account"
				},

				/**
				 * Object with account full address (Address, City, Country, Zip).
				 */
				"FullAddress": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				/**
				 * @inheritDoc DuplicatesSearchUtilitiesV2#getIsEntityDeduplicationEnabled
				 * @override
				 */
				getIsEntityDeduplicationEnabled: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseMiniPage#publishOnSaveEvents
				 * @override
				 */
				publishOnSaveEvents: function(callback, scope) {
					this._publishUpdateProfile();
					this.callParent(arguments);
				},

				/**
				 * @private
				 */
				_publishUpdateProfile: function() {
					this.sandbox.publish("AccountSaved", {
						Id: this.$Id,
						CardMode: this.$Mode
					}, [this.$MiniPageSourceSandboxId]);
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "HeaderColumnContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getPrimaryDisplayColumnValue"
						},
						"labelClass": ["label-in-header-container"],
						"visible": {
							"bindTo": "isEditMode"
						}
					},
					"index": 0
				},
				{
					"operation": "merge",
					"name": "MiniPage",
					"values": {
						"classes": {
							"wrapClassName": ["account-mini-page-container"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "RequiredColumnsContainer",
					"values": {
						"classes": {
							"wrapClassName": ["required-columns-container", "grid-layout",
								"account-mini-page-container"]
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "PhotoContainer",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["account-photo-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "NameInViewMode",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "Name",
						"visible": {
							"bindTo": "isViewMode"
						},
						"labelConfig": {
							"visible": false
						},
						"isMiniPageModelItem": true
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "PhotoContainer",
					"propertyName": "items",
					"name": "MiniPhoto",
					"values": {
						"getSrcMethod": "getAccountImage",
						"readonly": true,
						"defaultImage": {
							"bindTo": "getAccountDefaultImage"
						},
						"generator": "MiniPageViewGenerator.generateRoundImageControl"
					}
				},
				{
					"operation": "insert",
					"name": "HeaderButtonsContainer",
					"parentName": "PhotoContainer",
					"propertyName": "items",
					"values": {
						"wrapClass": ["account-header-buttons"],
						"visible": {
							"bindTo": "isViewMode"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": []
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "CurrentAccountCallButton",
					"parentName": "HeaderButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
						"extendedMenu": {
							"Name": "Call",
							"PropertyName": "CurrentAccount",
							"Click": {
								"bindTo": "prepareCallButtonMenu"
							}
						}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"parentName": "HeaderButtonsContainer",
					"propertyName": "items",
					"name": "CurrentAccountEmailButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
						"extendedMenu": {
							"Name": "Email",
							"PropertyName": "CurrentAccount",
							"Click": {
								"bindTo": "prepareEmailButtonMenu"
							}
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "HeaderButtonsContainer",
					"propertyName": "items",
					"name": "CurrentAccountLinkedEntityButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.AddButtonImage,
						"extendedMenu": {
							"Name": "LinkedEntities",
							"PropertyName": "CurrentAccount",
							"Click": {
								"bindTo": "prepareLinkedEntitiesButtonMenu"
							}
						}
					},
					"index": 2
				},
				{
					"operation": "move",
					"name": "OpenEditMode",
					"parentName": "HeaderButtonsContainer",
					"propertyName": "items"
				},
				{
					"operation": "insert",
					"name": "WebContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "Web",
					"parentName": "WebContainer",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"target": Terrasoft.controls.HyperlinkEnums.target.BLANK,
						"caption": {
							"bindTo": "Web"
						},
						"click": {
							"bindTo": "onExternalLinkClick"
						},
						"tag": "Web"
					}
				},
				{
					"operation": "insert",
					"name": "FullAddress",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"bindTo": "FullAddress",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"bindTo": "Owner",
						"visible": {
							"bindTo": "isViewMode"
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 18
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "OwnerButtonContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"wrapClass": ["buttons-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 18,
							"row": 3,
							"colSpan": 6
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "OwnerButtonContainer",
					"propertyName": "items",
					"name": "OwnerCallButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
						"extendedMenu": {
							"Name": "Call",
							"PropertyName": "Owner",
							"Click": {
								"bindTo": "prepareCallButtonMenu"
							}
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "OwnerButtonContainer",
					"propertyName": "items",
					"name": "OwnerEmailButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
						"extendedMenu": {
							"Name": "Email",
							"PropertyName": "Owner",
							"Click": {
								"bindTo": "prepareEmailButtonMenu"
							}
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "PrimaryContact",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"bindTo": "PrimaryContact",
						"visible": {
							"bindTo": "isViewMode"
						},
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 18
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "PrimaryContactButtonContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isViewMode"
						},
						"wrapClass": ["buttons-container"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 18,
							"row": 4,
							"colSpan": 6
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "PrimaryContactButtonContainer",
					"propertyName": "items",
					"name": "PrimaryContactCallButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
						"extendedMenu": {
							"Name": "Call",
							"PropertyName": "PrimaryContact",
							"Click": {
								"bindTo": "prepareCallButtonMenu"
							}
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "PrimaryContactButtonContainer",
					"propertyName": "items",
					"name": "PrimaryContactEmailButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
						"extendedMenu": {
							"Name": "Email",
							"PropertyName": "PrimaryContact",
							"Click": {
								"bindTo": "prepareEmailButtonMenu"
							}
						}
					},
					"index": 3
				},
				{
					"operation": "merge",
					"name": "CloseMiniPageButton",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						}
					}
				},
				{
					"operation": "merge",
					"name": "SaveEditButton",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						}
					}
				},
				{
					"operation": "merge",
					"name": "CancelEditButton",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "MiniPage",
					"propertyName": "items",
					"name": "MiniPageEditModeContainer",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "NameInAddMode",
					"parentName": "MiniPageEditModeContainer",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						},
						"bindTo": "Name",
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"controlConfig": {
							"focused": true
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "PrimaryContactEdit",
					"parentName": "MiniPageEditModeContainer",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						},
						"bindTo": "PrimaryContact",
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "Phone",
					"parentName": "MiniPageEditModeContainer",
					"propertyName": "items",
					"values": {
						"className": "Terrasoft.PhoneEdit",
						"visible": {
							"bindTo": "isNotViewMode"
						},
						"bindTo": "Phone",
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "WebInEditMode",
					"parentName": "MiniPageEditModeContainer",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "isNotViewMode"
						},
						"bindTo": "Web",
						"isMiniPageModelItem": true,
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "OwnerEdit",
					"parentName": "MiniPageEditModeContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "Owner",
						"visible": {
							"bindTo": "getAdditionalColumnVisibility"
						},
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						},
						"tag": "Owner",
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "remove",
					"name": "OpenCurrentEntityPage",
					"parentName": "HeaderContainer",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/
		};
	});


