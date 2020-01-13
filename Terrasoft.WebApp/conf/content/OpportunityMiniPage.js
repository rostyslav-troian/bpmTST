Terrasoft.configuration.Structures["OpportunityMiniPage"] = {innerHierarchyStack: ["OpportunityMiniPageOpportunity", "OpportunityMiniPage"], structureParent: "BaseMiniPage"};
define('OpportunityMiniPageOpportunityStructure', ['OpportunityMiniPageOpportunityResources'], function(resources) {return {schemaUId:'2506aff4-2c84-42bc-984c-9d692afde7e9',schemaCaption: "OpportunityMiniPage", parentSchemaName: "BaseMiniPage", schemaName:'OpportunityMiniPageOpportunity',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityMiniPageStructure', ['OpportunityMiniPageResources'], function(resources) {return {schemaUId:'cd3895c1-8549-4db9-8c25-e116830a153b',schemaCaption: "OpportunityMiniPage", parentSchemaName: "OpportunityMiniPageOpportunity", schemaName:'OpportunityMiniPage',parentSchemaUId:'2506aff4-2c84-42bc-984c-9d692afde7e9',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityMiniPageOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityMiniPageOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityMiniPageOpportunity", ["MiniPageResourceUtilities", "OpportunityMiniPageResources",
		"MiniPageDatePeriodGenerator", "css!OpportunityMiniPageCSS"],
	function(miniPageResources, resources) {
		return {
			entitySchemaName: "Opportunity",
			attributes: {
				/**
				 * @inheritdoc BaseMiniPage#MiniPageModes
				 * @overridden
				 */
				"MiniPageModes": {
					"value": [Terrasoft.ConfigurationEnums.CardOperation.VIEW,
						Terrasoft.ConfigurationEnums.CardOperation.ADD
					]
				},

				/**
				 * Last activity in opportunity.
				 * @type {Object}
				 */
				"LastActivity": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"referenceSchemaName": "Activity"
				},

				/**
				 * Last activity result caption in opportunity.
				 * @type {String}
				 */
				"LastActivityCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": ""
				},

				/**
				 * Client multi lookup field.
				 * @type {Object}
				 */
				"Client": {
					"caption": {"bindTo": "Resources.Strings.Client"},
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"multiLookupColumns": ["Contact", "Account"],
					"isRequired": true
				},

				/**
				 * Current opportunity
				 * @type {Object}
				 */
				"CurrentOpportunity": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"referenceSchemaName": "Opportunity"
				},

				/**
				 * Primary contact
				 * @type {Object}
				 */
				"PrimaryContact": {
					"dataValueType": Terrasoft.DataValueType.LOOKUP,
					"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"referenceSchemaName": "Contact"
				}
			},
			methods: {
				/**
				 * @inheritDoc BaseMiniPage#init
				 * @overridden
				 */
				init: function() {
					this.callParent(arguments);
					this.initEmailExtendedMenuButtonCollections(["Owner", "Account", "Contact", "PrimaryContact"],
							this.close);
					this.initCallExtendedMenuButtonCollections(["Owner", "Account", "Contact", "PrimaryContact"],
							this.close);
					this.initLinkedEntitiesMenuButtonCollections(["CurrentOpportunity"], this.close);
				},

				/**
				 * @inheritDoc BaseMiniPage#onEntityInitialized
				 * @overridden
				 */
				onEntityInitialized: function() {
					this.set("CurrentOpportunity", {
						value: this.get("Id"),
						displayValue: this.get("Title")
					});
					this.getLastActivity();
					this.getPrimaryContact();
					this.fillEmailExtendedMenuButtonCollections(["Owner", "Account", "Contact"]);
					this.fillCallExtendedMenuButtonCollections(["Owner", "Account", "Contact"]);
					this.fillLinkedEntitiesMenuButtonCollections(["CurrentOpportunity"]);
					this.callParent(arguments);
				},

				/**
				 * Gets opportunity primary contact.
				 * @protected
				 */
				getPrimaryContact: function() {
					var esq = this.getPrimaryContactSelect();
					esq.getEntityCollection(function(response) {
						if (response && response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var firstItem = collection.getByIndex(0);
								this.setPrimaryContact(firstItem);
							}
						}
					}, this);
				},

				/**
				 * Gets opportunity primary contact select.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Primary contact select query.
				 */
				getPrimaryContactSelect: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OpportunityContact"
					});
					esq.addColumn("Contact");
					esq.addColumn("Contact.Name", "ContactName");
					esq.filters.add("OpportunityFilter", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Opportunity", this.get("Id")));
					esq.filters.add("IsMainContactFilter", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "IsMainContact", 1));
					esq.rowCount = 1;
					return esq;
				},

				/**
				 * Sets primary contact and fill extended menu buttons.
				 * @protected
				 * @param {Object} contact Activity object from response.
				 */
				setPrimaryContact: function(contact) {
					this.set("PrimaryContact", {
						value: contact.get("Contact").value,
						displayValue: contact.get("ContactName")
					});
					this.fillEmailExtendedMenuButtonCollections(["PrimaryContact"]);
					this.fillCallExtendedMenuButtonCollections(["PrimaryContact"]);
				},

				/**
				 * Generates short date.
				 * @protected
				 * @param {DateTime} dateTime Date for convert.
				 * @return {Date} Short date in current culture.
				 */
				getShortDate: function(dateTime) {
					var date = Ext.emptyString;
					if (!Ext.isEmpty(dateTime)) {
						var timeFormat = Terrasoft.Resources.CultureSettings.timeFormat;
						var cultureName = Terrasoft.Resources.CultureSettings.currentCultureName;
						var dueDate = Terrasoft.toLocaleDate(dateTime, cultureName);
						var dueTime = Ext.Date.format(dateTime, timeFormat);
						date = Ext.String.format("{0} {1}", dueDate, dueTime);
					}
					return date;
				},

				/**
				 * Gets last activity from opportunity.
				 * @protected
				 */
				getLastActivity: function() {
					var esq = this.getLastActivitySelect();
					esq.getEntityCollection(function(response) {
						if (response && response.success) {
							var collection = response.collection;
							if (collection.getCount() > 0) {
								var firstItem = collection.getByIndex(0);
								this.setLastActivityAttributes(firstItem);
							}
						}
					}, this);
				},

				/**
				 * Sets last activity attributes.
				 * @protected
				 * @param {Object} activity Activity object from response.
				 */
				setLastActivityAttributes: function(activity) {
					var date = this.getShortDate(activity.get("DueDate"));
					this.set("LastActivityCaption", Ext.String.format(
							this.get("Resources.Strings.LastActivityCaption"), date));
					this.set("LastActivity", {
						value: activity.get("Id"),
						displayValue: Ext.String.format("{0} / {1}", activity.get("CategoryName"),
								activity.get("StatusName"))
					});
				},

				/**
				 * Gets last activity select.
				 * @protected
				 * @return {Terrasoft.EntitySchemaQuery} Last activity select query.
				 */
				getLastActivitySelect: function() {
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Activity"
					});
					esq.rowCount = 1;
					esq.addColumn("Status.Name", "StatusName");
					esq.addColumn("ActivityCategory.Name", "CategoryName");
					var dueDate = esq.addColumn("DueDate");
					dueDate.orderPosition = 0;
					dueDate.orderDirection = Terrasoft.OrderDirection.DESC;
					this.setLastActivityRequestFilters(esq);
					return esq;
				},

				/**
				 * Sets last activity filters.
				 * @protected
				 * @param {Terrasoft.EntitySchemaQuery} esq Activity select query.
				 * @return {Terrasoft.EntitySchemaQuery} Activity select query with filter.
				 */
				setLastActivityRequestFilters: function(esq) {
					var id = this.get("Id");
					if (!Ext.isEmpty(id)) {
						esq.filters.add("opportunityFilter", Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "Opportunity", id));
					}
					return esq;
				},

				/**
				 * Returns opportunity mood image url.
				 * @protected
				 * @return {String} Photo image url.
				 */
				getOpportunityMoodImage: function() {
					return (this.get("IsEntityInitialized") && this.isViewMode())
						? this.getLookupImageUrl("Mood")
						: this.getOpportunityMoodDefaultImage();
				},

				/**
				 * Returns opportunity default mood image url.
				 * @private
				 * @return {String} Photo image url.
				 */
				getOpportunityMoodDefaultImage: function() {
					return Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.DefaultOpportunityMood"));
				},

				/**
				 * Sets column visible if value is not empty and mini page is in view mode.
				 * @param {Object} value Column value.
				 * @private
				 * @return {Boolean} Column visibility.
				 */
				isNotEmptyColumnVisibleInViewMode: function(value) {
					return !Ext.isEmpty(value) && this.isViewMode();
				},

				/**
				 * Sets column visible if value is empty and mini page is in view mode.
				 * @param {Object} value Column value.
				 * @private
				 * @return {Boolean} Column visibility.
				 */
				isEmptyColumnVisibleInViewMode: function(value) {
					return Ext.isEmpty(value) && this.isViewMode();
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
							"wrapClassName": ["opportunity-mini-page-container"]
						}
					}
				},
				{
					"operation": "merge",
					"name": "RequiredColumnsContainer",
					"values": {
						"classes": {
							"wrapClassName": ["required-columns-container", "grid-layout",
								"opportunity-mini-page-container"]
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
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"name": "OpportunityMoodContainer",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["opportunity-photo-container"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"parentName": "OpportunityMoodContainer",
					"propertyName": "items",
					"name": "MiniPhoto",
					"values": {
						"getSrcMethod": "getOpportunityMoodImage",
						"visible": {"bindTo": "isViewMode"},
						"readonly": true,
						"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(
							resources.localizableImages.DefaultOpportunityMood
						),
						"generator": "MiniPageViewGenerator.generateRoundImageControl"
					}
				},
				{
					"operation": "insert",
					"name": "ViewTitle",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"labelConfig": {
							"visible": false
						},
						"bindTo": "Title",
						"isMiniPageModelItem": true
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "OpportunityButtonsContainer",
					"parentName": "HeaderContainer",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"wrapClass": ["opportunity-header-buttons"],
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"name": "CurrentOpportunityLinkedEntityButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.AddButtonImage,
								"extendedMenu": {
									"Name": "LinkedEntities",
									"PropertyName": "CurrentOpportunity",
									"Click": {"bindTo": "prepareLinkedEntitiesButtonMenu"}
								}
							}
						]
					},
					"index": 3
				},
				{
					"operation": "insert",
					"parentName": "MiniPage",
					"propertyName": "items",
					"name": "Client",
					"values": {
						"visible": {"bindTo": "isNotViewMode"},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ClientTip"}
						},
						"controlWrapConfig": {
							"classes": {"wrapClassName": ["client-edit-field"]}
						},
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"controlConfig": {
							"enableLeftIcon": true,
							"focused": true,
							"leftIconConfig": {"bindTo": "getMultiLookupIconConfig"}
						},
						"layout": {"column": 0, "row": 1, "colSpan": 24},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "Title",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isNotViewMode"},
						"layout": {"column": 0, "row": 2, "colSpan": 24}
					}
				},
				{
					"operation": "insert",
					"name": "Stage",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"labelConfig": {
							"visible": {"bindTo": "isNotViewMode"}
						},
						"dataValueType": Terrasoft.DataValueType.ENUM,
						"layout": {"column": 0, "row": 3, "colSpan": 24},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "Budget",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"wrapClass": ["number-control-wrap"],
						"dataValueType": Terrasoft.DataValueType.MONEY,
						"layout": {"column": 0, "row": 4, "colSpan": 24},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "Account",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "Account",
							"bindConfig": {
								converter: "isNotEmptyColumnVisibleInViewMode"
							}
						},
						"layout": {"column": 0, "row": 5, "colSpan": 18},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.Client"}
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "AccountContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "Account",
							"bindConfig": {
								converter: "isNotEmptyColumnVisibleInViewMode"
							}
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 18, "row": 5, "colSpan": 6},
						"items": [
							{
								"name": "AccountClientCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "Account",
									"Click": {"bindTo": "prepareCallButtonMenu"}
								}
							},
							{
								"name": "AccountClientEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "Account",
									"Click": {"bindTo": "prepareEmailButtonMenu"}
								}
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "Contact",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "Account",
							"bindConfig": {
								converter: "isEmptyColumnVisibleInViewMode"
							}
						},
						"layout": {"column": 0, "row": 6, "colSpan": 18},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.Client"}
						},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "ContactContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "Account",
							"bindConfig": {
								converter: "isEmptyColumnVisibleInViewMode"
							}
						},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 18, "row": 6, "colSpan": 6},
						"items": [
							{
								"name": "ContactClientCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "Contact",
									"Click": {"bindTo": "prepareCallButtonMenu"}
								}
							},
							{
								"name": "ContactClientEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "Contact",
									"Click": {"bindTo": "prepareEmailButtonMenu"}
								}
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "Owner",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"layout": {"column": 0, "row": 7, "colSpan": 18},
						"isMiniPageModelItem": true
					}
				},
				{
					"operation": "insert",
					"name": "OwnerButtonContainer",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 18, "row": 7, "colSpan": 6},
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
					"operation": "insert",
					"name": "PrimaryContact",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {"bindTo": "isViewMode"},
						"layout": {"column": 0, "row": 8, "colSpan": 18},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.PrimaryContact"}
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
						"visible": {"bindTo": "isViewMode"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 18, "row": 8, "colSpan": 6},
						"items": [
							{
								"name": "PrimaryContactCallButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.CallButtonImage,
								"extendedMenu": {
									"Name": "Call",
									"PropertyName": "PrimaryContact",
									"Click": {"bindTo": "prepareCallButtonMenu"}
								}
							},
							{
								"name": "PrimaryContactEmailButton",
								"itemType": Terrasoft.ViewItemType.BUTTON,
								"imageConfig": miniPageResources.resources.localizableImages.EmailButtonImage,
								"extendedMenu": {
									"Name": "Email",
									"PropertyName": "PrimaryContact",
									"Click": {"bindTo": "prepareEmailButtonMenu"}
								}
							}
						]
					}
				},
				{
					"operation": "insert",
					"name": "LastActivity",
					"parentName": "MiniPage",
					"propertyName": "items",
					"values": {
						"visible": {
							"bindTo": "LastActivity",
							"bindConfig": {
								converter: "isNotEmptyColumnVisibleInViewMode"
							}
						},
						"bindTo": "LastActivity",
						"layout": {"column": 0, "row": 9, "colSpan": 24},
						"labelConfig": {
							"caption": {"bindTo": "LastActivityCaption"}
						},
						"isMiniPageModelItem": true
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define("OpportunityMiniPage", ["LeadConfigurationConst", "CreateLeadForEntityUtilities"],
		function(LeadConfigurationConst) {
	return {
		entitySchemaName: "Opportunity",
		mixins: {
			/**
			 * @class CreateLeadForEntityUtilities
			 * Create lead for entity utilites mixin.
			 */
			CreateLeadForEntityUtilities: "Terrasoft.CreateLeadForEntityUtilities"
		},
		attributes: {
			"LeadType": {"isRequired": true}
		},
		methods: {
			/**
			 * @inheritDoc OpportunityMiniPage#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.mixins.CreateLeadForEntityUtilities.init.call(this);
			},

			/**
			 * Returns True if mini page is in add mode.
			 * @return {Boolean} Is minipage in add mode result.
			 */
			isNewMode: function() {
				return this.isAddMode();
			},

			/**
			 * @inheritDoc Terrasoft.CreateLeadForEntityUtilities#addQueryColumns
			 * @overridden
			 */
			addQueryColumns: function(insertQuery) {
				this.addLookupQueryColumn(insertQuery, {
					columnName: "Account",
					entityColumnName: "QualifiedAccount"
				});
				this.addLookupQueryColumn(insertQuery, {
					columnName: "Contact",
					entityColumnName: "QualifiedContact"
				});
				this.addLookupQueryColumn(insertQuery, {
					columnName: "LeadType",
					entityColumnName: "LeadType"
				});
				insertQuery.setParameterValue("QualifyStatus",
						LeadConfigurationConst.LeadConst.QualifyStatus.WaitingForSale,
						this.Terrasoft.DataValueType.GUID);
			},

			/**
			 * Adds lookup column to insert query.
			 * @param {Terrasoft.InsertQuery} insertQuery Insert query.
			 * @param {Object} config Column config.
			 * @param {String} config.columnName Column name.
			 * @param {String} config.entityColumnName Entity column name.
			 */
			addLookupQueryColumn: function(insertQuery, config) {
				var columnValue = this.get(config.columnName);
				if (columnValue && columnValue.value && config.entityColumnName) {
					insertQuery.setParameterValue(config.entityColumnName,
							columnValue.value, this.Terrasoft.DataValueType.GUID);
				}
			},

			/**
			 * @inheritDoc Terrasoft.BaseMiniPage#saveEntityInChain
			 * @overridden
			 */
			saveEntityInChain: function(callback, scope) {
				var createLeadCallback = this.createLeadAfterSave.bind(scope || this, callback);
				this.callParent([createLeadCallback]);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "LeadType",
				"parentName": "MiniPage",
				"propertyName": "items",
				"values": {
					"labelConfig": {
						"visible": {"bindTo": "isNotViewMode"}
					},
					"dataValueType": this.Terrasoft.DataValueType.ENUM,
					"layout": {"column": 0, "row": 3, "colSpan": 24},
					"isMiniPageModelItem": true
				}
			},
			{
				"operation": "merge",
				"name": "Stage",
				"values": {
					"layout": {"column": 0, "row": 4, "colSpan": 24}
				}
			},
			{
				"operation": "merge",
				"name": "Budget",
				"values": {
					"layout": {"column": 0, "row": 5, "colSpan": 24}
				}
			},
			{
				"operation": "merge",
				"name": "Account",
				"values": {
					"layout": {"column": 0, "row": 6, "colSpan": 18}
				}
			},
			{
				"operation": "merge",
				"name": "AccountContainer",
				"values": {
					"layout": {"column": 18, "row": 6, "colSpan": 6}
				}
			},
			{
				"operation": "merge",
				"name": "Contact",
				"values": {
					"layout": {"column": 0, "row": 7, "colSpan": 18}
				}
			},
			{
				"operation": "merge",
				"name": "ContactContainer",
				"values": {
					"layout": {"column": 18, "row": 7, "colSpan": 6}
				}
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layout": {"column": 0, "row": 8, "colSpan": 18}
				}
			},
			{
				"operation": "merge",
				"name": "OwnerButtonContainer",
				"values": {
					"layout": {"column": 18, "row": 8, "colSpan": 6}
				}
			},
			{
				"operation": "merge",
				"name": "PrimaryContact",
				"values": {
					"layout": {"column": 0, "row": 9, "colSpan": 18}
				}
			},
			{
				"operation": "merge",
				"name": "PrimaryContactButtonContainer",
				"values": {
					"layout": {"column": 18, "row": 9, "colSpan": 6}
				}
			},
			{
				"operation": "merge",
				"name": "LastActivity",
				"values": {
					"layout": {"column": 0, "row": 10, "colSpan": 24}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


