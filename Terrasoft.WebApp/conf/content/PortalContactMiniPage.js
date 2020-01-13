Terrasoft.configuration.Structures["PortalContactMiniPage"] = {innerHierarchyStack: ["PortalContactMiniPage"], structureParent: "BaseMiniPage"};
define('PortalContactMiniPageStructure', ['PortalContactMiniPageResources'], function(resources) {return {schemaUId:'d1f54602-dc9c-445e-898b-f196a0192542',schemaCaption: "Contact minipage at portal", parentSchemaName: "BaseMiniPage", schemaName:'PortalContactMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalContactMiniPage", ["PortalContactMiniPageResources", "MiniPageResourceUtilities", "EmailHelper", "TimezoneGenerator",
	"TimezoneMixin", "css!PortalContactMiniPageCSS"
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
					Terrasoft.ConfigurationEnums.CardOperation.ADD, Terrasoft.ConfigurationEnums.CardOperation.EDIT]
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
		messages: {
			"ContactSaved": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
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
			},

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
				this.sandbox.publish("ContactSaved", {
					Id: this.$Id,
					CardMode: this.$Mode
				}, [this.$MiniPageSourceSandboxId]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseMiniPage#updateDetail
			 * @override
			 */
			updateDetail: function(updateConfig) {
				const item = this.$DefaultValues.find(function(item) {
					return this.isNotEmpty(item.RecordToReload);
				}, this);
				const recordToReload = item && item.RecordToReload;
				if (recordToReload) {
					this.sandbox.publish("UpdateDetail", {
						primaryColumnValue: recordToReload
					}, [this.$MiniPageSourceSandboxId]);
				} else {
					this.callParent(arguments);
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
					"items": []
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
				"name": "PhoneInViewMode",
				"values": {
					"labelConfig": {
						"visible": true
					},
					"visible": {"bindTo": "isViewMode"},
					"layout": {
						"column": 0,
						"row": 11,
						"colSpan": 18
					},
					"bindTo": "MobilePhone",
					"isMiniPageModelItem": true
				}
			},
			{
				"operation": "insert",
				"parentName": "MiniPage",
				"propertyName": "items",
				"name": "EmailInViewMode",
				"values": {
					"labelConfig": {
						"visible": true
					},
					"visible": {"bindTo": "isViewMode"},
					"layout": {
						"column": 0,
						"row": 13,
						"colSpan": 18
					},
					"bindTo": "Email",
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
						"row": 15,
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
					"items": []

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


