Terrasoft.configuration.Structures["ChangeAdminRightsUserTaskMiniEditPage"] = {innerHierarchyStack: ["ChangeAdminRightsUserTaskMiniEditPage"], structureParent: "BaseProcessMiniEditPage"};
define('ChangeAdminRightsUserTaskMiniEditPageStructure', ['ChangeAdminRightsUserTaskMiniEditPageResources'], function(resources) {return {schemaUId:'e8db4689-35aa-41da-a5a7-04b2b47ba152',schemaCaption: "ChangeAdminRightsUserTaskMiniEditPage", parentSchemaName: "BaseProcessMiniEditPage", schemaName:'ChangeAdminRightsUserTaskMiniEditPage',parentSchemaUId:'da1f5a7f-0c58-4745-981b-f3772a5f00bc',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Parent: BaseProcessMiniEditPage
 */
define("ChangeAdminRightsUserTaskMiniEditPage", ["Contact", "SysAdminUnit", "ProcessUserTaskConstants",
		"ChangeAdminRightsUserTaskMiniEditPageResources", "FilterModuleMixin", "MappingEditMixin"
	],
	function(Contact, SysAdminUnit, ProcessUserTaskConstants, resources) {
		return {
			mixins: {
				mappingEdit: "Terrasoft.MappingEditMixin",
				filterModuleMixin: "Terrasoft.FilterModuleMixin"
			},
			messages: {

				/**
				 * @message GetParametersInfo
				 * Pass parameter values.
				 */
				"GetParametersInfo": {
					"mode": this.Terrasoft.MessageMode.PTP,
					"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetParametersInfo
				 * Specifies parameter values.
				 */
				"SetParametersInfo": {
					"mode": this.Terrasoft.MessageMode.PTP,
					"direction": this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {

				/**
				 * Role.
				 * @type {Terrasoft.dataValueType.MAPPING}
				 */
				"Role": {
					"dataValueType": this.Terrasoft.DataValueType.MAPPING,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": resources.localizableStrings.RoleCaption,
					"onChange": "onMappingValueChanged"
				},

				/**
				 * Employee.
				 * @type {Terrasoft.dataValueType.MAPPING}
				 */
				"Employee": {
					"dataValueType": this.Terrasoft.DataValueType.MAPPING,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": resources.localizableStrings.EmployeeCaption,
					"onChange": "onMappingValueChanged"
				},

				/**
				 * FilterEditData.
				 * @type {Terrasoft.dataValueType.CUSTOM_OBJECT}
				 */
				"FilterEditData": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"caption": resources.localizableStrings.FilterEditDataCaption
				},

				/**
				 * Grantee.
				 * @type {Terrasoft.dataValueType.OBJECT}
				 */
				"Grantee": {
					"dataValueType": this.Terrasoft.DataValueType.OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Value.
				 * @type {Terrasoft.dataValueType.MAPPING}
				 */
				"Value": {
					"dataValueType": this.Terrasoft.DataValueType.MAPPING,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				//region Methods: Public

				/**
				 * @inheritdoc MappingEditMixin#getInvokerUId
				 * @overridden
				 */
				getInvokerUId: function() {
					return this.get("uId");
				},

				//endregion

				//region Methods: Protected

				/**
				 * Initializes page value depending on the type of Grantee.
				 * @protected
				 */
				initValue: function() {
					var value = this.get("Value");
					var grantee = this.get("Grantee");
					var consts = ProcessUserTaskConstants.ChangeAdminRightsUserTaskGrantee;
					switch (grantee) {
						case consts.ROLE:
							value = value || {};
							value.referenceSchemaUId = SysAdminUnit.uId;
							this.set("Role", value, {silent: true});
							this.set("DataValueType", Terrasoft.DataValueType.GUID);
							break;
						case consts.EMPLOYEE:
							value = value || {};
							value.referenceSchemaUId = Contact.uId;
							this.set("Employee", value, {silent: true});
							this.set("DataValueType", Terrasoft.DataValueType.GUID);
							break;
						case consts.DATA_SOURCE_FILTER:
							this.set("ReferenceSchemaUId", Contact.uId);
							this.set("FilterEditData", value, {silent: true});
							break;
					}
				},

				/**
				 * Saves page value depending on the type of Grantee.
				 * @protected
				 */
				saveValue: function() {
					var grantee = this.get("Grantee");
					var consts = ProcessUserTaskConstants.ChangeAdminRightsUserTaskGrantee;
					switch (grantee) {
						case consts.ROLE:
							this.set("Value", this.get("Role"));
							break;
						case consts.EMPLOYEE:
							this.set("Value", this.get("Employee"));
							break;
						case consts.DATA_SOURCE_FILTER:
							this.set("Value", this.get("FilterEditData"));
							break;
					}
				},

				/**
				 * @inheritdoc Terrasoft.MenuItemsMappingMixin#getParameterReferenceSchemaUId
				 * @override
				 */
				getParameterReferenceSchemaUId: function() {
					var grantee = ProcessUserTaskConstants.ChangeAdminRightsUserTaskGrantee;
					return this.get("Grantee") === grantee.ROLE ? SysAdminUnit.uId : Contact.uId;
				},

				/**
				 * Sets fields visibility by page grantee type.
				 * @protected
				 */
				preparePageControls: function() {
					var grantee = this.get("Grantee");
					var consts = ProcessUserTaskConstants.ChangeAdminRightsUserTaskGrantee;
					switch (grantee) {
						case consts.ROLE:
							this.set("IsRoleVisible", true);
							this.set("IsRoleRequired", true);
							break;
						case consts.EMPLOYEE:
							this.set("IsEmployeeVisible", true);
							this.set("IsEmployeeRequired", true);
							break;
						case consts.DATA_SOURCE_FILTER:
							this.set("IsFilterEditDataVisible", true);
							break;
					}
				},

				/**
				 * Validates filter.
				 * @protected
				 * @return {Boolean}
				 */
				validateFilter: function() {
					var grantee = this.get("Grantee");
					var filterConstant = ProcessUserTaskConstants.ChangeAdminRightsUserTaskGrantee.DATA_SOURCE_FILTER;
					if (grantee !== filterConstant) {
						return true;
					}
					var filters = this.get("FilterEditData");
					var isEmpty = this.Ext.isEmpty(filters) || filters.isEmpty();
					return !isEmpty;
				},

				/**
				 * @inheritdoc Terrasoft.BaseProcessMiniEditPage#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initValue();
						this.preparePageControls();
						Terrasoft.chain(
							function(next) {
								this.initFilterModuleMixin({}, next, this);
							},
							this.initMappingEntitySchema,
							function() {
								this.initDesignerType();
								callback.call(scope);
							}, this);
					}, this]);
				},

				/**
				 * @inheritdoc BaseProcessMiniEditPage#onSaveClick
				 * @overridden
				 */
				onSaveClick: function() {
					if (this.validateFilter()) {
						this.saveDataSourceFilters({});
						this.saveValue();
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc BaseProcessMiniEditPage#onDiscardChangesClick
				 * @overridden
				 */
				onDiscardChangesClick: function() {
					this.destroyFilterModuleMixin();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.BaseObject#onDestroy
				 * @overridden
				 */
				onDestroy: function() {
					this.destroyFilterModuleMixin();
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#getFilterContainerId
				 * @overridden
				 */
				getFilterContainerId: function() {
					return "ChangeRightsExtendedFiltersContainer";
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#initFilterModuleMixin
				 * @overridden
				 */
				initFilterModuleMixin: function(filterConfig, callback, scope) {
					this.registerFilterModuleMessages();
					var element = this.get("ProcessElement");
					this.initFilterEditData(element, {}, callback, scope);
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#getDataSourceFiltersValue
				 * @overridden
				 */
				getDataSourceFiltersValue: function() {
					return this.get("FilterEditData");
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#setDataSourceFiltersValue
				 * @overridden
				 */
				setDataSourceFiltersValue: function(element, parameterName, value) {
					this.set("FilterEditData", value);
				},

				/**
				 * @inheritdoc Terrasoft.FilterModuleMixin#onFiltersChanged
				 * @overridden
				 */
				onFiltersChanged: function(args) {
					var showSaveButton = !this.Ext.isEmpty(this.emptyFilterEditData) &&
						this.emptyFilterEditData !== args.serializedFilter;
					this.set("ShowSaveButton", showSaveButton);
					this.mixins.filterModuleMixin.onFiltersChanged.call(this, args);
				}

				//endregion

			},
			diff: /**SCHEMA_DIFF*/ [{
				"operation": "insert",
				"parentName": "Controls",
				"propertyName": "items",
				"name": "Role",
				"values": {
					"value": {
						"bindTo": "Role"
					},
					"visible": {
						"bindTo": "IsRoleVisible"
					},
					"isRequired": {
						"bindTo": "IsRoleRequired"
					},
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			}, {
				"operation": "insert",
				"parentName": "Controls",
				"propertyName": "items",
				"name": "Employee",
				"values": {
					"value": {
						"bindTo": "Employee"
					},
					"visible": {
						"bindTo": "IsEmployeeVisible"
					},
					"isRequired": {
						"bindTo": "IsEmployeeRequired"
					},
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"wrapClass": ["top-caption-control"]
				}
			}, {
				"operation": "insert",
				"name": "ChangeRightsExtendedFiltersContainer",
				"parentName": "Controls",
				"propertyName": "items",
				"values": {
					"layout": {
						"column": 0,
						"row": 2,
						"colSpan": 24
					},
					"visible": {
						"bindTo": "IsFilterEditDataVisible"
					},
					"id": "ChangeRightsExtendedFiltersContainer",
					"selectors": {
						"wrapEl": "#ChangeRightsExtendedFiltersContainer"
					},
					"beforererender": {
						"bindTo": "unloadFilterUnitModule"
					},
					"afterrender": {
						"bindTo": "updateFilterModule"
					},
					"afterrerender": {
						"bindTo": "updateFilterModule"
					},
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"markerValue": "ChangeRightsExtendedFiltersContainer",
					"wrapClass": ["extended-filters-container"]
				}
			}] /**SCHEMA_DIFF*/
		};
	});


