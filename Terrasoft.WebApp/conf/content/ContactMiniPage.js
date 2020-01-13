Terrasoft.configuration.Structures["ContactMiniPage"] = {innerHierarchyStack: ["ContactMiniPage"], structureParent: "BaseMiniPage"};
define('ContactMiniPageStructure', ['ContactMiniPageResources'], function(resources) {return {schemaUId:'2741dd1e-7c35-432c-915a-9aa228eb057b',schemaCaption: "ContactMiniPage", parentSchemaName: "BaseMiniPage", schemaName:'ContactMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContactMiniPage", ["ContactMiniPageResources", "MiniPageResourceUtilities", "EmailHelper", "TimezoneGenerator",
	"TimezoneMixin", "css!ContactMiniPageCSS"
], function(resources, miniPageResources, EmailHelper) {
	return {
		entitySchemaName: "Contact",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			/**
			 * @inheritdoc BaseMiniPage#MiniPageModes
			 * @override
			 */
			"MiniPageModes": {
				"value": [Terrasoft.ConfigurationEnums.CardOperation.VIEW,
					Terrasoft.ConfigurationEnums.CardOperation.ADD]
			},

			/**
			 * Job value in view mode.
			 * @type {String}
			 */
			"JobViewValue": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},

			/**
			 * Object with current contact information.
			 * @type {Object}
			 */
			"CurrentContact": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"referenceSchemaName": "Contact"
			}
		},
		mixins: {
			/**
			 * @class Terrasoft.configuration.mixins.TimezoneMixin
			 * Time Zone mixin.
			 */
			TimezoneMixin: "Terrasoft.TimezoneMixin"
		},
		methods: {
			/**
			 * @inheritdoc BaseMiniPage#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.initEmailExtendedMenuButtonCollections(["CurrentContact", "Owner"], this.close);
				this.initCallExtendedMenuButtonCollections(["CurrentContact", "Owner"], this.close);
				this.initLinkedEntitiesMenuButtonCollections(["CurrentContact"], this.close);
				this.mixins.TimezoneMixin.init.call(this);
				this.addColumnValidator("Email", EmailHelper.getEmailValidator);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMiniPage#onEntityInitialized
			 * @override
			 */
			onEntityInitialized: function() {
				this.set("CurrentContact", {
					value: this.get("Id"),
					displayValue: this.get("Name")
				});
				this.setJobTitle();
				this.fillEmailExtendedMenuButtonCollections(["CurrentContact", "Owner"]);
				this.fillCallExtendedMenuButtonCollections(["CurrentContact", "Owner"]);
				this.fillLinkedEntitiesMenuButtonCollections(["CurrentContact"]);
				this.callParent(arguments);
			},

			/**
			 * Generates job title for current contact.
			 * @private
			 */
			setJobTitle: function() {
				var jobTitleParts = [this.get("Job"), this.get("Department"), this.get("Account")];
				var jobTitle = "";
				jobTitleParts.forEach(function(titlePart, index) {
					if (titlePart && titlePart.displayValue) {
						if (jobTitle) {
							jobTitle += " / ";
						}
						if (index !== jobTitleParts.length - 1) {
							jobTitle += titlePart.displayValue;
						}
					}
				});
				if (jobTitle) {
					this.set("JobViewValue", jobTitle);
				}
			},

			/**
			 * Return contact photo image url.
			 * @return {String} Photo image url.
			 */
			getContactImage: function() {
				var primaryImageColumnValue = this.get(this.primaryImageColumnName);
				if (primaryImageColumnValue) {
					return this.getSchemaImageUrl(primaryImageColumnValue);
				}
				return this.getContactDefaultImage();
			},

			/**
			 * Return contact default photo image url.
			 * @protected
			 * @return {String} Photo image url.
			 */
			getContactDefaultImage: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultPhoto"));
			},

			/**
			 * Determines if owner exists.
			 * @return {boolean} True if owner exists and has display value, otherwise false.
			 */
			isOwnerExist: function() {
				var owner = this.get("Owner");
				var isOwnerExist = !Terrasoft.isEmpty(owner && owner.displayValue);
				var isViewMode = this.isViewMode();
				return isOwnerExist && isViewMode;
			}
		},
		diff: /**SCHEMA_DIFF*/[

			//region Fields: Edit/Add mode

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
				"name": "CloseMiniPageButton",
				"values": {
					"visible": {"bindTo": "isNotViewMode"}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Name",
				"values": {
					"isMiniPageModelItem": true,
					"visible": {"bindTo": "isNotViewMode"},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"controlConfig": {
						"focused": true
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Type",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"isMiniPageModelItem": true,
					"visible": {"bindTo": "isNotViewMode"},
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Account",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"isMiniPageModelItem": true,
					"visible": {"bindTo": "isNotViewMode"},
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "JobTitle",
				"values": {
					"isMiniPageModelItem": true,
					"visible": {"bindTo": "isNotViewMode"},
					"layout": {
						"column": 0,
						"row": 4,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Department",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"visible": {"bindTo": "isNotViewMode"},
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 5,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "MobilePhone",
				"values": {
					"className": "Terrasoft.PhoneEdit",
					"visible": {"bindTo": "isNotViewMode"},
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 6,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Email",
				"values": {
					"visible": {"bindTo": "isNotViewMode"},
					"isMiniPageModelItem": true,
					"layout": {
						"column": 0,
						"row": 7,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"name": "OwnerEdit",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"bindTo": "Owner",
					"visible": {"bindTo": "getAdditionalColumnVisibility"},
					"layout": {
						"column": 0,
						"row": 8,
						"colSpan": 24
					},
					"tag": "Owner",
					"isMiniPageModelItem": true
				}
			},

			//endregion

			//region Fields: View mode

			{
				"operation": "insert",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"name": "PhotoContainer",
				"values": {
					"visible": {"bindTo": "isViewMode"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["contact-photo-container"],
					"items": []
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NameInHeader",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"bindTo": "Name",
					"visible": {"bindTo": "isViewMode"},
					"labelConfig": {
						"visible": false
					},
					"isMiniPageModelItem": true
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ContactButtonsContainer",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"visible": {"bindTo": "isViewMode"},
					"wrapClass": ["header-buttons"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [
						{
							"name": "CurrentContactCallButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
							"extendedMenu": {
								"Name": "Call",
								"PropertyName": "CurrentContact",
								"Click": {"bindTo": "prepareCallButtonMenu"}
							}
						},
						{
							"name": "CurrentContactEmailButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
							"extendedMenu": {
								"Name": "Email",
								"PropertyName": "CurrentContact",
								"Click": {"bindTo": "prepareEmailButtonMenu"}
							}
						},
						{
							"name": "CurrentContactLinkedEntityButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": miniPageResources.resources.localizableImages.AddButtonImage,
							"extendedMenu": {
								"Name": "LinkedEntities",
								"PropertyName": "CurrentContact",
								"Click": {"bindTo": "prepareLinkedEntitiesButtonMenu"}
							}
						}
					]
				},
				"index": 2
			},
			{
				"operation": "insert",
				"parentName": "PhotoContainer",
				"propertyName": "items",
				"name": "MiniPhoto",
				"values": {
					"getSrcMethod": "getContactImage",
					"readonly": true,
					"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto),
					"generator": "MiniPageViewGenerator.generateRoundImageControl"
				}
			},
			{
				"operation": "insert",
				"name": "JobInfoContainer",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"id": "JobInfoContainer",
					"visible": {"bindTo": "isViewMode"},
					"selectors": {"wrapEl": "#JobInfoContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["jobinfo-mini-wrap"],
					"items": [],
					"layout": {
						"column": 0,
						"row": 10,
						"colSpan": 24
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "JobInfoContainer",
				"propertyName": "items",
				"name": "JobInViewMode",
				"values": {
					"labelConfig": {
						"visible": false
					},
					"bindTo": "JobViewValue",
					"isMiniPageModelItem": true
				}
			},
			{
				"operation": "insert",
				"parentName": "JobInfoContainer",
				"propertyName": "items",
				"name": "AccountInViewMode",
				"values": {
					"labelConfig": {
						"visible": false
					},
					"bindTo": "Account",
					"isMiniPageModelItem": true
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "Owner",
				"values": {
					"visible": {"bindTo": "isOwnerExist"},
					"layout": {
						"column": 0,
						"row": 11,
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
					"visible": {"bindTo": "isOwnerExist"},
					"wrapClass": ["buttons-container"],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"layout": {
						"column": 18,
						"row": 11,
						"colSpan": 6
					},
					"items": [
						{
							"name": "OwnerCallButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
							"extendedMenu": {
								"Name": "Call",
								"PropertyName": "Owner",
								"Click": {"bindTo": "prepareCallButtonMenu"}
							}
						},
						{
							"name": "OwnerEmailButton",
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
							"extendedMenu": {
								"Name": "Email",
								"PropertyName": "Owner",
								"Click": {"bindTo": "prepareEmailButtonMenu"}
							}
						}
					]

				}
			},
			{
				"operation": "merge",
				"name": "MiniPage",
				"values": {
					"classes": {
						"wrapClassName": ["contact-mini-page-container"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "RequiredColumnsContainer",
				"values": {
					"classes": {
						"wrapClassName": ["required-columns-container", "grid-layout",
							"contact-mini-page-container"]
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "TimezoneMiniContactPage",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"generator": "TimezoneGenerator.generateTimeZone",
					"wrapClass": ["timezone-container"],
					"layout": {
						"column": 0,
						"row": 9,
						"colSpan": 24
					},
					"visible": {"bindTo": "isViewMode"},
					"timeZoneCaption": {"bindTo": "TimeZoneCaption"},
					"timeZoneCity": {"bindTo": "TimeZoneCity"}
				},
				"index": 1
			}

			//endregion

		]/**SCHEMA_DIFF*/
	};
});


