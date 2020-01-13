Terrasoft.configuration.Structures["EmployeePage"] = {innerHierarchyStack: ["EmployeePage"], structureParent: "BaseModulePageV2"};
define('EmployeePageStructure', ['EmployeePageResources'], function(resources) {return {schemaUId:'63fe9a30-63b5-41bb-9d58-bea9f1c7adc1',schemaCaption: "EmployeePage", parentSchemaName: "BaseModulePageV2", schemaName:'EmployeePage',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmployeePage", ["EmployeePageResources", "ConfigurationConstants", "ViewModelColumnValidator",
	"EmployeePageMixin"], function(resources, ConfigurationConstants) {
		return {
			entitySchemaName: "Employee",
			mixins: {
				/**
				 * @class EmployeePageMixin
				 * Employee page mixin.
				 */
				EmployeePageMixin: "Terrasoft.EmployeePageMixin"
			},
			attributes: {
				/**
				 * Employee full job title.
				 */
				"FullJobTitle": {
					"dependencies": [
						{
							"columns": ["Job"],
							"methodName": "jobChanged"
						}
					]
				},
				/**
				 * Employee name.
				 */
				"Name": {
					"dependencies": [
						{
							"columns": ["Contact"],
							"methodName": "onContactChanged"
						}
					]
				},
				/**
				 * Employee contact.
				 */
				"Contact": {
					"lookupListConfig": {
						"columns": ["[Employee:Contact].Id", "Photo", "Phone", "Email", "BirthDate", "Gender.Name"],
						"filter": function() {
							return Terrasoft.createColumnIsNullFilter("[Employee:Contact].Id");
						}
					}
				},
				/**
				 * Employee account.
				 */
				"Account": {
					"lookupListConfig": {
						"filter": function() {
							return Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"Type", ConfigurationConstants.AccountType.OurCompany);
						}
					}
				},
				/**
				 * Contact phone.
				 */
				"Phone": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "Contact.Phone",
					"caption": {bindTo: "Resources.Strings.PhoneCaption"}
				},
				/**
				 * Contact email.
				 */
				"Email": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "Contact.Email",
					"caption": {bindTo: "Resources.Strings.EmailCaption"}
				},
				/**
				 * Contact Id.
				 */
				"ContactId": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "Contact.Id"
				},
				/**
				 * Contact birth date.
				 */
				"BirthDate": {
					"dataValueType": this.Terrasoft.DataValueType.DATE,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "Contact.BirthDate",
					"caption": {bindTo: "Resources.Strings.BirthDateCaption"}
				},
				/**
				 * Contact gender.
				 */
				"Gender": {
					"dataValueType": this.Terrasoft.DataValueType.TEXT,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "Contact.Gender.Name",
					"caption": {bindTo: "Resources.Strings.GenderCaption"}
				},
				/**
				 * Organization structure unit.
				 */
				"OrgStructureUnit": {
					"lookupConfig": {
						"hierarchical": true
					},
					"lookupListConfig": {
						"columns": ["FullName", "Head", "Parent.Head"]
					}
				},
				/**
				 * Employee contact photo.
				 */
				"ContactPhoto": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					columnPath: "Contact.Photo"
				},
				/**
				 * Employee contact sysAdminUnit.
				 */
				"SysAdminUnit": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "[VwSysAdminUnit:Contact:Contact].SysAdminUnit",
					"isLookup": true,
					"caption": {bindTo: "Resources.Strings.UserNameCaption"},
					"referenceSchemaName": "SysAdminUnit",
					"cardSchemaName": "UserPageV2"
				},
				/**
				 * User is active.
				 */
				"UserIsActive": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					"columnPath": "[SysAdminUnit:Contact:Contact].Active",
					"caption": {bindTo: "Resources.Strings.UserIsActiveCaption"}
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BasePageV2#init
				 * @overridden
				 */
				init: function() {
					this.primaryImageColumnName = "ContactPhoto";
					this.on("change:OrgStructureUnit", this.onChangedOrgStructureUnit, this);
					this.callParent(arguments);
				},

				/**
				 * Updates name and photo fields on contact change.
				 * @private
				 */
				onContactChanged: function() {
					this.contactChanged();
					this.updateDetails();
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function() {
					this.callParent(arguments);
					this.updateDetail({detail: "EmployeeCareer"});
				},

				/**
				 * @inheritdoc Terrasoft.configuration.BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("CareerDueDate", this.validateCareerDueDate);
					this.addColumnValidator("ProbationDueDate", this.validateProbationDueDate);
				},

				/**
				 * Creates validator.
				 * @protected
				 * @return {Object}
				 */
				createValidator: function() {
					return this.Ext.create("Terrasoft.ViewModelColumnValidator");
				},

				/**
				 * Validates career due date.
				 * @protected
				 * @return {Object} Validation information.
				 */
				validateCareerDueDate: function() {
					var validator = this.createValidator();
					return validator.validateDates(this, "CareerDueDate", "CareerStartDate",
							this.get("Resources.Strings.DateIsLessThanDateMessageTemplate"));
				},

				/**
				 * Validates probation due date.
				 * @protected
				 * @return {Object} Validation information.
				 */
				validateProbationDueDate: function() {
					var validator = this.createValidator();
					return validator.validateDates(this, "ProbationDueDate", "CareerStartDate",
							this.get("Resources.Strings.DateIsLessThanDateMessageTemplate"));
				},

				/**
				 * Updates entity fields without details reloading.
				 * @protected
				 */
				updateEntity: function() {
					this.loadEntity(this.get(this.primaryColumnName), function() {
						this.onChangedOrgStructureUnit(this, this.get("OrgStructureUnit"));
					}, this);
				},
				/**
				 * Create filters function for SysOrgRoleInUser and SysFuncRoleInUser detail.
				 * @protected
				 * @return {Terrasoft.FilterGroup} Role detail filter group.
				 */
				getRoleDetailFilter: function() {
					var filterGroup = this.Terrasoft.createFilterGroup();
					filterGroup.add("SysAdminUserNotNull", this.Terrasoft.createColumnIsNotNullFilter("SysUser"));
					filterGroup.add("ContactFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"SysUser.Contact", this.get("ContactId")));
					return filterGroup;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "HeaderContainer"
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "PhotoContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["image-edit-container"],
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "PhotoContainer",
					"propertyName": "items",
					"name": "Photo",
					"values": {
						"getSrcMethod": "getSchemaImageUrl",
						"readonly": true,
						"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultPhoto),
						"generator": "ImageCustomGeneratorV2.generateCustomImageControl"
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Contact",
					"values": {
						"enabled": {"bindTo": "isNewMode"},
						"contentType": this.Terrasoft.ContentType.LOOKUP,
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.ContactTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Job",
					"values": {
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "FullJobTitle",
					"values": {
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "OrgStructureUnit",
					"values": {
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Account",
					"values": {
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Phone",
					"values": {
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.PhoneTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Email",
					"values": {
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.EmailTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "BirthDate",
					"values": {
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 9,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.BirthDateTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Gender",
					"values": {
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 10,
							"colSpan": 24
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.GenderTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"layout": {
							"column": 0,
							"row": 11,
							"colSpan": 24
						}
					}
				},
				{
					"operation": "insert",
					"name": "BaseInfoTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.BaseInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "BaseInfoTab",
					"propertyName": "items",
					"name": "ContactCommunication",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "BaseInfoTab",
					"propertyName": "items",
					"name": "ContactAddress",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "BaseInfoTab",
					"propertyName": "items",
					"name": "ContactAnniversary",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "CareerTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.CareerTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CareerGeneralInfoControlGroup",
					"parentName": "CareerTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "CareerGeneralInfo",
					"parentName": "CareerGeneralInfoControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerGeneralInfo",
					"propertyName": "items",
					"name": "CareerStartDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 10
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerGeneralInfo",
					"propertyName": "items",
					"name": "CareerDueDate",
					"values": {
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 10
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerGeneralInfo",
					"propertyName": "items",
					"name": "ProbationDueDate",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 10
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerGeneralInfo",
					"propertyName": "items",
					"name": "ReasonForDismissal",
					"values": {
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 10
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerTab",
					"propertyName": "items",
					"name": "EmployeeCareer",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "CareerTab",
					"propertyName": "items",
					"name": "ContactCareer",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "AdminTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.AdministrationTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SysAdminUnitInfoControlGroup",
					"parentName": "AdminTab",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.SysAdminUnitGeneralInfoGroupCaption"}
					}
				},
				{
					"operation": "insert",
					"name": "SysAdminUnitGeneralInfo",
					"parentName": "SysAdminUnitInfoControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SysAdminUnitGeneralInfo",
					"propertyName": "items",
					"name": "SysAdminUnit",
					"values": {
						"enabled": false,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 10
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.SysAdminUnitTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "SysAdminUnitGeneralInfo",
					"propertyName": "items",
					"name": "UserIsActive",
					"values": {
						"enabled": false,
						"layout": {
							"column": 12,
							"row": 0,
							"colSpan": 10
						},
						"tip": {
							"content": {"bindTo": "Resources.Strings.UserIsActiveTipMessage"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "AdminTab",
					"propertyName": "items",
					"name": "SysOrgRoleInUser",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "AdminTab",
					"propertyName": "items",
					"name": "SysFuncRoleInUser",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "NotesAndFilesTab",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"values": {
						"caption": {"bindTo": "Resources.Strings.NotesAndFilesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "NotesAndFilesTab",
					"propertyName": "items",
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "NotesControlGroup",
					"parentName": "NotesAndFilesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"}
					}
				},
				{
					"operation": "insert",
					"parentName": "NotesControlGroup",
					"propertyName": "items",
					"name": "Notes",
					"values": {
						"contentType": Terrasoft.ContentType.RICH_TEXT,
						"layout": {"column": 0, "row": 0, "colSpan": 24},
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
					}
				},
				{
					"operation": "insert",
					"name": "EmployeeProfile",
					"parentName": "LeftModulesContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.MODULE
					}
				},
				{
					"operation": "insert",
					"name": "ActionsDashboardModule",
					"parentName": "ActionDashboardContainer",
					"propertyName": "items",
					"values": {
						"classes": {wrapClassName: ["actions-dashboard-module"]},
						"itemType": this.Terrasoft.ViewItemType.MODULE
					}
				}

			]/**SCHEMA_DIFF*/,
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "EmployeeFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "Employee"
					}
				},
				EmployeeCareer: {
					schemaName: "EmployeeCareerDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Employee"
					},
					subscriber: {methodName: "updateEntity"}
				},
				ContactCommunication: {
					schemaName: "ContactCommunicationDetail",
					filter: {
						masterColumn: "Contact",
						detailColumn: "Contact"
					}
				},
				ContactAddress: {
					schemaName: "ContactAddressDetailV2",
					filter: {
						masterColumn: "Contact",
						detailColumn: "Contact"
					}
				},
				ContactAnniversary: {
					schemaName: "ContactAnniversaryDetailV2",
					filter: {
						masterColumn: "Contact",
						detailColumn: "Contact"
					}
				},
				ContactCareer: {
					schemaName: "ContactCareerDetailV2",
					filter: {
						masterColumn: "Contact",
						detailColumn: "Contact"
					}
				},
				SysOrgRoleInUser: {
					schemaName: "SysOrgRoleInUserDetailV2",
					filter: {
						masterColumn: "SysAdminUnit",
						detailColumn: "SysUser"
					},
					filterMethod: "getRoleDetailFilter"
				},
				SysFuncRoleInUser: {
					schemaName: "SysFuncRoleInUserDetailV2",
					filter: {
						masterColumn: "SysAdminUnit",
						detailColumn: "SysUser"
					},
					filterMethod: "getRoleDetailFilter"
				}
			}, /**SCHEMA_DETAILS*/
			modules: /**SCHEMA_MODULES*/{
				"EmployeeProfile": {
					"config": {
						"schemaName": "EmployeeProfileSchema",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								masterColumnName: "Manager"
							}
						}
					}
				},
				"ActionsDashboardModule": {
					"config": {
						"isSchemaConfigInitialized": true,
						"schemaName": "SectionActionsDashboard",
						"useHistoryState": false,
						"parameters": {
							"viewModelConfig": {
								"entitySchemaName": "Employee",
								"dashboardConfig": {
									"Activity": {
										"masterColumnName": "ContactId",
										"referenceColumnName": "Contact",
										"referenceColumnSchemaName": "Contact"
									}
								}
							}
						}
					}
				}
			}/**SCHEMA_MODULES*/
		};
});


