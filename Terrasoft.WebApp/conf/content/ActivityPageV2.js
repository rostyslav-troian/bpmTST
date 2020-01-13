Terrasoft.configuration.Structures["ActivityPageV2"] = {innerHierarchyStack: ["ActivityPageV2UIv2", "ActivityPageV2Invoice", "ActivityPageV2Order", "ActivityPageV2OrderInvoice", "ActivityPageV2Document", "ActivityPageV2CTIBase", "ActivityPageV2Opportunity", "ActivityPageV2Project", "ActivityPageV2OrderInSales", "ActivityPageV2OpportunityInvoice", "ActivityPageV2DocumentInOpportunity", "ActivityPageV2OpportunityManagement", "ActivityPageV2"], structureParent: "BaseModulePageV2"};
define('ActivityPageV2UIv2Structure', ['ActivityPageV2UIv2Resources'], function(resources) {return {schemaUId:'6e5551de-a0fa-48af-8d1b-7dc896060a1e',schemaCaption: "Activity edit page", parentSchemaName: "BaseModulePageV2", schemaName:'ActivityPageV2UIv2',parentSchemaUId:'d62293c0-7f14-44b1-b547-735fb40499cd',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2InvoiceStructure', ['ActivityPageV2InvoiceResources'], function(resources) {return {schemaUId:'ee2fd0e9-6848-488a-a563-a55de394e926',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2UIv2", schemaName:'ActivityPageV2Invoice',parentSchemaUId:'6e5551de-a0fa-48af-8d1b-7dc896060a1e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OrderStructure', ['ActivityPageV2OrderResources'], function(resources) {return {schemaUId:'8e36e172-fabc-4b4c-9d0d-888130780abe',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2Invoice", schemaName:'ActivityPageV2Order',parentSchemaUId:'ee2fd0e9-6848-488a-a563-a55de394e926',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2Invoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OrderInvoiceStructure', ['ActivityPageV2OrderInvoiceResources'], function(resources) {return {schemaUId:'2833cae9-2997-4c35-8621-398c0394a4e0',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2Order", schemaName:'ActivityPageV2OrderInvoice',parentSchemaUId:'8e36e172-fabc-4b4c-9d0d-888130780abe',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2Order",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2DocumentStructure', ['ActivityPageV2DocumentResources'], function(resources) {return {schemaUId:'e9fda38a-7656-44e5-be08-b0a8b29751e8',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2OrderInvoice", schemaName:'ActivityPageV2Document',parentSchemaUId:'2833cae9-2997-4c35-8621-398c0394a4e0',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2OrderInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2CTIBaseStructure', ['ActivityPageV2CTIBaseResources'], function(resources) {return {schemaUId:'b17438cc-d8af-4519-be8e-4f5c7b2d5d6a',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2Document", schemaName:'ActivityPageV2CTIBase',parentSchemaUId:'e9fda38a-7656-44e5-be08-b0a8b29751e8',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2Document",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OpportunityStructure', ['ActivityPageV2OpportunityResources'], function(resources) {return {schemaUId:'4b6ce257-731d-43cd-b397-eb492f0e887e',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2CTIBase", schemaName:'ActivityPageV2Opportunity',parentSchemaUId:'b17438cc-d8af-4519-be8e-4f5c7b2d5d6a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2CTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2ProjectStructure', ['ActivityPageV2ProjectResources'], function(resources) {return {schemaUId:'9497a679-fec5-48f6-a6b0-770a88e4474b',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2Opportunity", schemaName:'ActivityPageV2Project',parentSchemaUId:'4b6ce257-731d-43cd-b397-eb492f0e887e',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OrderInSalesStructure', ['ActivityPageV2OrderInSalesResources'], function(resources) {return {schemaUId:'cab4c803-bfaf-4b06-b036-c1f3cd9e248b',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2Project", schemaName:'ActivityPageV2OrderInSales',parentSchemaUId:'9497a679-fec5-48f6-a6b0-770a88e4474b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2Project",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OpportunityInvoiceStructure', ['ActivityPageV2OpportunityInvoiceResources'], function(resources) {return {schemaUId:'9f4f61cf-4218-4810-96a1-9213620de7c5',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2OrderInSales", schemaName:'ActivityPageV2OpportunityInvoice',parentSchemaUId:'cab4c803-bfaf-4b06-b036-c1f3cd9e248b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2OrderInSales",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2DocumentInOpportunityStructure', ['ActivityPageV2DocumentInOpportunityResources'], function(resources) {return {schemaUId:'0a46b3dc-6457-41e3-b188-613c99a360fe',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2OpportunityInvoice", schemaName:'ActivityPageV2DocumentInOpportunity',parentSchemaUId:'9f4f61cf-4218-4810-96a1-9213620de7c5',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2OpportunityInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2OpportunityManagementStructure', ['ActivityPageV2OpportunityManagementResources'], function(resources) {return {schemaUId:'c4edbaf0-ea19-4a68-856f-484697be8376',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2DocumentInOpportunity", schemaName:'ActivityPageV2OpportunityManagement',parentSchemaUId:'0a46b3dc-6457-41e3-b188-613c99a360fe',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2DocumentInOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2Structure', ['ActivityPageV2Resources'], function(resources) {return {schemaUId:'ff58cb87-4b49-47bc-9ff2-f6e4d49b7780',schemaCaption: "Activity edit page", parentSchemaName: "ActivityPageV2OpportunityManagement", schemaName:'ActivityPageV2',parentSchemaUId:'c4edbaf0-ea19-4a68-856f-484697be8376',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ActivityPageV2OpportunityManagement",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ActivityPageV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2UIv2", ["BaseFiltersGenerateModule", "BusinessRuleModule", "ConfigurationConstants",
		"ConfigurationEnums", "ActivityDatesMixin", "ActivityTimezoneMixin", "css!ActivityTimezoneMixin",
		"TimezoneGenerator"],
	function(BaseFiltersGenerateModule, BusinessRuleModule, ConfigurationConstants, Enums) {
		return {
			entitySchemaName: "Activity",
			mixins: {
				/**
				 * @class ActivityDatesMixin
				 * MiniPage Activity dates mixin.
				 */
				ActivityDatesMixin: Terrasoft.ActivityDatesMixin,

				/**
				 * @class ActivityTimezoneMixin
				 * Activity time zone mixin.
				 */
				ActivityTimezoneMixin: Terrasoft.ActivityTimezoneMixin
			},
			messages: {
				/**
				 * @message GetScheduleItemTitle
				 * ########## ######### ########## # ###### ######## #########
				 */
				"GetScheduleItemTitle": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				"Author": {
					"isRequired": true
				},
				"Status": {
					"isRequired": true,
					lookupListConfig: {
						columns: ["Finish"]
					},
					dependencies: [
						{
							columns: ["Status"],
							methodName: "onStatusChanged"
						}
					]
				},
				/**
				 * Date and time of start activity.
				 */
				"StartDate": {
					dataValueType: this.Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["StartDate"],
							methodName: "clearSeconds"
						},
						{
							columns: ["StartDate"],
							methodName: "onStartDateChanged"
						},
						{
							columns: ["StartDate"],
							methodName: "setOffsetDates"
						},
						{
							columns: ["StartDate"],
							methodName: "setRemindDates"
						}
					]
				},
				/**
				 * Date and time activity completion.
				 */
				"DueDate": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["DueDate"],
							methodName: "clearSeconds"
						},
						{
							columns: ["DueDate"],
							methodName: "onDueDateChanged"
						},
						{
							columns: ["DueDate"],
							methodName: "setOffsetDates"
						}
					]
				},
				
				/**
				 * Remind to author attribute.
				 * @type {Boolean}
				 */
				"RemindToAuthor": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					dependencies: [
						{
							columns: ["RemindToAuthor"],
							methodName: "onRemindToAuthorChanged"
						}
					]
				},
				
				/**
				 * Remind to owner attribute.
				 * @type {Boolean}
				 */
				"RemindToOwner": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					dependencies: [
						{
							columns: ["RemindToOwner"],
							methodName: "onRemindToOwnerChanged"
						}
					]
				},
				"ActivityCategory": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					dependencies: [
						{
							columns: ["ActivityCategory"],
							methodName: "onActivityCategoryChange"
						}
					]
				},
				"Result": {
					lookupListConfig: {
						filters: [
							function() {
								var type = this.get("ActivityCategory");
								var filterGroup = Ext.create("Terrasoft.FilterGroup");
								filterGroup.add("ActivityCategory",
									Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.EQUAL,
										"[ActivityCategoryResultEntry:ActivityResult].ActivityCategory",
										type.value));
								filterGroup.add("BusinessProcessOnly",
									Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.EQUAL,
										"BusinessProcessOnly",
										0));
								return filterGroup;
							}
						]
					}
				},
				"Owner": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {filter: BaseFiltersGenerateModule.OwnerFilter}
				},
				/**
				 * View name "Schedule" section Activities.
				 */
				"SchedulerDataViewName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "SchedulerDataView"
				},
				/**
				 * Owners list.
				 */
				"Participants": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					value: null
				},
				/**
				 * Date and time start activity with offset.
				 */
				"OffsetStartDate": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["OffsetStartDate"],
							methodName: "onStartDateOffsetChanged"
						}
					]
				},
				/**
				 * Date and time activity completion with offset.
				 */
				"OffsetDueDate": {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					dependencies: [
						{
							columns: ["OffsetDueDate"],
							methodName: "onDueDateOffsetChanged"
						}
					]
				},
				/**
				 * Time zone.
				 */
				"TimeZone": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					dependencies: [
						{
							columns: ["TimeZone"],
							methodName: "onTimezoneChanged"
						}
					],
					lookupListConfig: {
						columns: ["Code"]
					}
				},
				/**
				 * Container of time zone visible state.
				 */
				"TimezoneContainerVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * Mask for custom result container visible state.
				 */
				"CustomResultMaskVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
			},
			details: /**SCHEMA_DETAILS*/{
				Files: {
					schemaName: "FileDetailV2",
					entitySchemaName: "ActivityFile",
					filter: {
						masterColumn: "Id",
						detailColumn: "Activity"
					}
				},
				ActivityParticipant: {
					schemaName: "ActivityParticipantDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "Activity"
					}
				},
				EntityConnections: {
					schemaName: "EntityConnectionsDetailV2",
					entitySchemaName: "EntityConnection",
					filter: {
						masterColumn: "Id",
						detailColumn: "SysModuleEntity"
					}
				},
				EmailDetailV2: {
					schemaName: "EmailDetailV2",
					filter: {
						masterColumn: "Id",
						detailColumn: "ActivityConnection"
					},
					filterMethod: "emailDetailFilter"
				}
			}/**SCHEMA_DETAILS*/,
			methods: {

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onGetPageTips
				 * @overridden
				 */
				onGetPageTips: function() {
					return {
						"Contact": this.get("Resources.Strings.ContactTip"),
						"Opportunity": this.get("Resources.Strings.OpportunityTip"),
						"Order": this.get("Resources.Strings.OrderTip"),
						"Invoice": this.get("Resources.Strings.InvoiceTip"),
						"Document": this.get("Resources.Strings.DocumentTip")
					};
				},

				/**
				 * @protected
				 * @inheritdoc BaseSchemaViewModel#setValidationConfig
				 * @overridden
				 */
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("OffsetDueDate", this.validateOffsetDueDate);

				},

				/**
				 * ######## ####### ########### #### ##########.
				 * @overridden
				 * @return {Boolean}
				 */
				getAddButtonMenuVisible: function() {
					return true;
				},

				/**
				 * ############## ########### #######.
				 * @overridden
				 */
				initContextHelp: function() {
					this.set("ContextHelpId", 1010);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc BasePageV2#onEntityInitialized
				 * @override
				 */
				onEntityInitialized: function() {
					if (this.isAddMode()) {
						this.setDefActivityValues();
					} else {
						this.onDueDateChanged();
					}
					this.callParent(arguments);
					const scheduleItemTitle = this.sandbox.publish("GetScheduleItemTitle");
					if (scheduleItemTitle && this.get("IsSeparateMode") && !this.get("IsProcessMode") &&
						this.get("Operation") !== Enums.CardStateV2.ADD &&
						this.get("Operation") !== Enums.CardStateV2.COPY) {
						this.set("Title", scheduleItemTitle);
					}
					this.mixins.ActivityTimezoneMixin.init.call(this);
					if (this.getIsFeatureEnabled("ShowAllContactsAsOwner")) {
						this._applyLookupListConfigToOwnerColumn();
					}
				},

				/**
				 * @private
				 */
				_applyLookupListConfigToOwnerColumn: function() {
					const ownerColumn = this.getColumnByName("Owner");
					ownerColumn.lookupListConfig = {
						filter: BaseFiltersGenerateModule.AllUsersFilter,
						orders: [
							{
								columnPath: "[VwSystemUsers:Contact].ConnectionType",
								direction: Terrasoft.OrderDirection.ASC
							}
						]
					};
				},

				/**
				 * ##### ## ####### #### ########### ######. ############### ## ###### ######### ######.
				 * @return {Boolean} ########## true ### ######## ########## #### ###########.
				 */
				validate: function() {
					var isValid = this.callParent(arguments);
					if (!isValid) {
						return false;
					}
					return this.validateDueDate();
				},

				/**
				 * ####### ######### ######### ##########
				 * ######### #### IsProcessMode # ############ ####.
				 * @return {{fullInvalidMessage: string, invalidMessage: string}} ########## ######### #########.
				 */
				activityResultValidator: function() {
					var invalidMessage = "";
					if (this.get("IsProcessMode") && this.Ext.isEmpty(this.get("Result"))) {
						invalidMessage = this.get("Resources.Strings.ActivityResultInProcessModeRequire");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},

				/**
				 * ######### ######## ####### "##########".
				 * ####### ######### # ######, #### #### ##### "##########" ###### "######".
				 * @private
				 * @return {Boolean} ######### #########
				 */
				validateDueDate: function() {
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					if (this.Ext.isEmpty(startDate) || this.Ext.isEmpty(dueDate)) {
						return false;
					}
					if (startDate > dueDate && !this.get("TimezoneContainerVisible")) {
						this.showInformationDialog(this.get("Resources.Strings.StartDateGreaterDueDate"));
						return false;
					}
					return true;
				},

				/**
				 * ########## ####### ######## ## ######## ##### ######.
				 * @protected
				 * @return {boolean}
				 */
				isCall: function() {
					return this.get("Type").value === ConfigurationConstants.Activity.Type.Call;
				},

				/**
				 * ######### ######## ############## ########## ## ##.
				 * @protected
				 */
				edit: function() {
					var procElId = this.get("ProcessElementId");
					var recordId = this.get("Id");
					if (procElId && !this.Terrasoft.isEmptyGUID(procElId)) {
						this.sandbox.publish("ProcessExecDataChanged", {
							procElUId: procElId,
							recordId: recordId,
							scope: this,
							parentMethodArguments: null,
							parentMethod: function() {
								return false;
							}
						});
						return true;
					}
					return false;
				},

				/**
				 * Clear seconds from model date value.
				 * @protected
				 * @param {Object} argument Dependency attribute argument.
				 * @param {String} columnName Model column name.
				 * @param {Boolean} [silent] Is silent set column value tag.
				 */
				clearSeconds: function(argument, columnName, silent) {
					var date = this.get(columnName);
					if (!this.Ext.isDate(date)) {
						return;
					}
					date = this.Terrasoft.clearSeconds(date);
					this.set(columnName, date, {
						silent: Ext.isBoolean(silent) ? silent : true
					});
				},

				/**
				 * Sets remind dates after change activity start date.
				 * @private
				 */
				setRemindDates: function() {
					var previousStartDate = this.getPrevious("StartDate");
					var startDate = this.get("StartDate");
					var remindToOwner = this.get("RemindToOwner");
					var remindToAuthor = this.get("RemindToAuthor");
					if (this.Ext.isEmpty(previousStartDate) || this.Ext.isEmpty(startDate)) {
						if (remindToOwner) {
							this.set("RemindToOwnerDate", startDate);
						}
						if (remindToAuthor) {
							this.set("RemindToAuthorDate", startDate);
						}
						return;
					}
					var timeDiff = previousStartDate.getTime() - startDate.getTime();
					if (remindToOwner) {
						this.setRemindDate("RemindToOwnerDate", timeDiff);
					}
					if (remindToAuthor) {
						this.setRemindDate("RemindToAuthorDate", timeDiff);
					}
				},

				/**
				 * Sets remind date attribute value.
				 * @private
				 * @param {String} remindDateAttribute Remind date attribute.
				 * @param {Number} timeDiff Time difference.
				 */
				setRemindDate: function(remindDateAttribute, timeDiff) {
					var remindDate = this.get(remindDateAttribute);
					if (remindDate) {
						var newRemindToOwnerDate = new Date(remindDate.getTime() - timeDiff);
						this.set(remindDateAttribute, newRemindToOwnerDate);
					} else {
						this.set(remindDateAttribute, this.get("StartDate"));
					}
				},
				/**
				 * ########## ####### ######### #### #### ######.
				 * @protected
				 */
				onStartDateChanged: function() {
					var startDate = this.Terrasoft.deepClone(this.get("StartDate"));
					if (!this.Ext.isDate(startDate)) {
						return;
					}
					var differStartDueDate = this.get("DifferStartDueDate");
					if (!differStartDueDate) {
						differStartDueDate = this.getDefaultTimeInterval();
					}
					this.set("DueDate", new Date(startDate.getTime() + differStartDueDate));
				},

				/**
				 * ########## ####### ######### #### #### ##########.
				 * @protected
				 */
				onDueDateChanged: function() {
					var startDate = this.Terrasoft.deepClone(this.get("StartDate"));
					var dueDate = this.Terrasoft.deepClone(this.get("DueDate"));
					if (!this.validateDueDate() || !this.Ext.isDate(startDate) || !this.Ext.isDate(dueDate)) {
						return;
					}
					this.setDifferStartDueDate(startDate, dueDate);
				},

				/**
				 * ############# ######## #######.
				 * @param {Date} startDate #### ######.
				 * @param {Date} dueDate #### ##########.
				 */
				setDifferStartDueDate: function(startDate, dueDate) {
					var difference = {};
					if (startDate.getTime() < dueDate.getTime()) {
						difference = dueDate.getTime() - startDate.getTime();
					} else {
						difference = this.getDefaultTimeInterval();
					}
					this.set("DifferStartDueDate", difference);
				},

				/**
				 * ########## ############ ######## ######### ####### # 180000 ##.
				 * @protected
				 */
				getDefaultTimeInterval: function() {
					return this.Terrasoft.TimeScale.THIRTY_MINUTES * this.Terrasoft.DateRate.MILLISECONDS_IN_MINUTE;
				},

				/**
				 * ########## ####### ######### #### ######### ##########
				 * @protected
				 */
				onActivityCategoryChange: function() {
					var activityCategory = this.get("ActivityCategory");
					if (activityCategory &&
						activityCategory.value === ConfigurationConstants.Activity.ActivityCategory.Meeting) {
						this.set("ShowInScheduler", true);
					}
				},

				/**
				 * ############# ######## ### #### ######### ##########
				 * @virtual
				 */
				setActivityCategory: function() {
					var type = this.get("Type");
					var activity = ConfigurationConstants.Activity;
					var activityCategory = activity.ActivityCategory;
					var category = (type.value === activity.Type.Task)
						? activityCategory.DoIt
						: activityCategory.Call;
					this.loadLookupDisplayValue("ActivityCategory", category);
					this.getVisibleCallDirectionByCategory();
				},

				/**
				 * Set default activity values.
				 * @protected
				 */
				setDefActivityValues: function() {
					this.setActivityCategory();
					this.clearSeconds(null, "StartDate", false);
					this.clearSeconds(null, "DueDate", false);
					var startDate = this.get("StartDate");
					var dueDate = this.get("DueDate");
					var millisecondsInMinute = this.Terrasoft.core.enums.DateRate.MILLISECONDS_IN_MINUTE;
					var defaultTimeInterval = this.getDefaultTimeInterval();
					if (!dueDate || this.Ext.Date.getElapsed(startDate, dueDate) < 4 * millisecondsInMinute) {
						var defaultDueDate = this.Ext.Date.add(startDate, this.Ext.Date.MILLI, defaultTimeInterval);
						this.set("DueDate", defaultDueDate);
					} else {
						this.setDifferStartDueDate(startDate, dueDate);
					}
					var currentViewName = this.sandbox.publish("GetActiveViewName");
					this.set("ShowInScheduler", (currentViewName === "SchedulerDataView"));
				},

				/**
				 * ########## ####### ######### #### ######.
				 * @protected
				 */
				onStatusChanged: function() {
					var status = this.get("Status");
					if (status && status.Finish === false) {
						this.set("Result", null);
						this.set("DetailedResult", null);
					}
				},

				/**
				 * Result button click handler.
				 * @param {Object} event DOM event.
				 * @param {Object} dom Button DOM element.
				 * @param {Object} options DOM event options..
				 * @param {Object} tag Button tag value.
				 */
				resultButtonClick: function(event, dom, options, tag) {
					var columnsConfig = {
						"Status": tag.status.value,
						"Result": tag.result.value
					};
					this.$CustomResultMaskVisible = true;
					this.loadLookupColumnValues(columnsConfig, function(columnValues) {
						this.$CustomResultMaskVisible = false;
						this.set("Status", columnValues.Status || tag.status);
						this.set("Result", columnValues.Result || tag.result);
						this.set("ResultSelected", true);
					}, this);
				},

				/**
				 * ########## ####### ####### ## ###### ###### ## ###### #########.
				 */
				resultCancelButtonClick: function() {
					this.set("Status", null);
					this.set("Result", null);
					this.set("DetailedResult", null);
					this.set("ResultSelected", false);
				},

				/**
				 * ########## ######## ######## "#########" ### ############ ##### ##### "#########".
				 * @param {Boolean} allowedResult ###### ######### ########### ### ######.
				 * @return {Boolean} ######## ######## "#########" ### ############ ##### ##### "#########".
				 */
				getIsCustomResultVisible: function(allowedResult) {
					return this.get("IsProcessMode") && !this.Ext.isEmpty(allowedResult);
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#sendSaveCardModuleResponse
				 * @overridden
				 */
				sendSaveCardModuleResponse: function(args) {
					if (!this.callParent([args.success || args])) {
						var config = {
							entitySchemaName: this.entitySchemaName,
							primaryColumnValue: this.get(this.primaryColumnName),
							isInChain: args.isInChain || true
						};
						this.sandbox.publish("ReloadGridAfterAdd", config);
					}
				},

				/**
				 * ####### ############ ##### onSave.
				 * @private
				 */
				callParentOnSave: function() {
					this.set("callParentOnSave", true);
					this.save(this.get("ParentOnSaveArguments"));
				},

				/**
				 * ########## ## ############# ##########
				 * ######### ############# # #########.
				 * @private
				 */
				askAddedParticipants: function() {
					this.showConfirmationDialog(this.get("Resources.Strings.InsertParticipantsMessage"),
						function(returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
								this.set("Participants", null);
							}
							this.callParentOnSave();
						},
						[this.Terrasoft.MessageBoxButtons.YES.returnCode,
							this.Terrasoft.MessageBoxButtons.NO.returnCode],
						null);
				},

				/**
				 * ######### ######.
				 * @overridden
				 */
				save: function() {
					if (this.get("callParentOnSave")) {
						this.callParent(arguments);
					} else {
						if (this.isEditMode() || Ext.isEmpty(this.get("Participants"))) {
							this.callParent(arguments);
						} else {
							this.set("ParentOnSaveArguments", arguments);
							this.askAddedParticipants();
						}
					}
				},

				/**
				 * ########## ###### ## ########## ######## ##########.
				 * @param {Object} args ############# ########## # ######### # ########### ####### {ActivityId, value}
				 * @private
				 */
				getParticipantInsertQuery: function(item) {
					var roleId = ConfigurationConstants.Activity.ParticipantRole.Participant;
					var activityId = this.get("Id");
					var insert = Ext.create("Terrasoft.InsertQuery", {
						rootSchemaName: "ActivityParticipant"
					});
					insert.setParameterValue("Activity", activityId, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Participant", item, this.Terrasoft.DataValueType.GUID);
					insert.setParameterValue("Role", roleId, this.Terrasoft.DataValueType.GUID);
					return insert;
				},

				/*
				 * Execute queries to add activity participants.
				 * @private
				 */
				insertParticipants: function() {
					var participants = this.get("Participants");
					if (participants) {
						var bq = Ext.create("Terrasoft.BatchQuery");
						participants.forEach(function(item) {
							bq.add(this.getParticipantInsertQuery(item.value));
						}, this);
						if (bq.queries.length) {
							bq.execute();
						}
					}
				},

				/*
				 * # ###### ####### Participants ######### ########## ##########,
				 * ######## ############ ##### onSaved # ######### ###### ########## ##########.
				 * @private
				 */
				onSavedActivity: function(response, config) {
					config = (config && config.length === 1) ? config[0] : (config || {});
					config.callParent = true;
					this.insertParticipants();
					this.onSaved(response, config);
					this.updateDetail({detail: "ActivityParticipant"});
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#onSaved
				 * @overridden
				 */
				onSaved: function(response, config) {
					if (config && config.callParent === true) {
						this.callParent(arguments);
					} else if (this.isCopyMode()) {
						var requestConfig = {
							serviceName: "EntityUtilsService",
							methodName: "CopyEntities",
							data: {
								sourceEntityId: this.get("SourceEntityPrimaryColumnValue"),
								recipientEntityId: this.get("Id"),
								columnName: "Activity",
								entitySchemaName: "Activity",
								sourceEntitySchemaNames: ["ActivityParticipant"]
							}
						};
						this.callService(requestConfig, function() {
							this.onSavedActivity(response, config);
						}, this);
					} else {
						this.onSavedActivity(response, config);
					}
				},

				/**
				 * ########## ####### ######### #### ######### # ########### ## #### ##########.
				 * @param {Object} value ### ##########.
				 * @return {boolean} ####### ######### #### ######### # ########### ## #### ##########.
				 */
				getVisibleCategoryByType: function(value) {
					return (value && (value.value === ConfigurationConstants.Activity.Type.Task));
				},

				/**
				 * Gets visibility attribute for field CallDirection depends on activity category.
				 * @param {Object} value Activity type.
				 * @return {boolean} visibility attribute for field CallDirection depends on activity category.
				 */
				getVisibleCallDirectionByCategory: function(value) {
					return (value &&
						((value.value === ConfigurationConstants.Activity.ActivityCategory.CallAsTask) ||
						(value.value === ConfigurationConstants.Activity.ActivityCategory.Call)));
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#addChangeDataViewOptions
				 * @overridden
				 */
				addChangeDataViewOptions: function(viewOptions) {
					this.addSchedulerDataViewOption(viewOptions);
					this.addGridDataViewOption(viewOptions);
					this.callParent(arguments);
				},

				/**
				 * ######### ##### "####### # ##########" # ######### #### ###### "###".
				 * @protected
				 * @param {Object} viewOptions ######### ####### ####.
				 */
				addSchedulerDataViewOption: function(viewOptions) {
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.SchedulerDataViewCaption"},
						"Click": {"bindTo": "changeDataView"},
						"Visible": {"bindTo": "getSchedulerDataViewOptionVisible"},
						"Tag": this.get("SchedulerDataViewName")
					}));
				},

				/**
				 * ######### ##### "####### # ###### #######" # ######### #### ###### "###".
				 * @protected
				 * @param {Object} viewOptions ######### ####### ####.
				 */
				addGridDataViewOption: function(viewOptions) {
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.GridDataViewCaption"},
						"Click": {"bindTo": "changeDataView"},
						"Visible": {"bindTo": "getGridDataViewOptionVisible"},
						"Tag": this.get("GridDataViewName")
					}));
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#addListSettingsOption
				 * @overridden
				 */
				addListSettingsOption: function(viewOptions) {
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenListSettingsCaption"},
						"Click": {"bindTo": "openGridSettings"},
						"Visible": {"bindTo": "getListSettingsOptionVisible"}
					}));
				},

				/**
				 * Create filters function for email detail.
				 * @protected
				 * @return {createFilterGroup}
				 */
				emailDetailFilter: function() {
					var recordId = this.get("Id");
					var filterGroup = new this.Terrasoft.createFilterGroup();
					filterGroup.add("ActivityConnectionNotNull", this.Terrasoft.createColumnIsNotNullFilter("ActivityConnection"));
					filterGroup.add("ActivityConnection", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ActivityConnection", recordId));
					filterGroup.add("ActivityType", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Type", ConfigurationConstants.Activity.Type.Email));
					return filterGroup;
				},

				/**
				 * ########## ######## ## #########, ############ # ##### ###### ########## #######.
				 * @param {string} columnName ### #######.
				 * @overridden
				 * @return {Array} ###### ######## ## #########.
				 */
				getLookupValuePairs: function(columnName) {
					var valuePairs = [];
					var column = this.getColumnByName(columnName);
					if (!this.Ext.isEmpty(column) && !this.Ext.isEmpty(column.referenceSchemaName) &&
						column.referenceSchemaName === "Contact") {
						var account = this.get("Account");
						if (!this.Ext.isEmpty(account)) {
							valuePairs.push({
								name: "Account",
								value: account.value
							});
						}
					}
					return valuePairs;
				},

				/**
				 * @inheritdoc Terrasoft.BasePageV2#subscribeDetailEvents
				 */
				subscribeDetailEvents: function(detailConfig, detailName) {
					this.callParent(arguments);
					var detailId = this.getDetailId(detailName);
					this.sandbox.subscribe("GetLookupValuePairs", this.getLookupValuePairs, this, [detailId]);
				}

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "GeneralInfoTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "ActivityParticipantTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ActivityParticipantTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ActivityParticipantTab",
					"propertyName": "items",
					"name": "ActivityParticipant",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "ActivityFileNotesTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.ActivityFileNotesTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "EmailTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.EmailTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailTab",
					"propertyName": "items",
					"name": "EmailDetailV2",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"name": "TitleInformationContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {"column": 0, "row": 0, "colSpan": 23, "rowSpan": 1},
						"id": "TitleInformationContainer",
						"selectors": {"wrapEl": "#TitleInformationContainer"}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"name": "InformationOnStepButtonContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"layout": {"column": 23, "row": 0, "colSpan": 1, "rowSpan": 1},
						"id": "InformationOnStepButtonContainer",
						"selectors": {"wrapEl": "#InformationOnStepButtonContainer"}
					}
				},
				{
					"operation": "insert",
					"parentName": "TitleInformationContainer",
					"propertyName": "items",
					"name": "Title",
					"values": {
						"bindTo": "Title",
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "StartDate",
					"values": {
						"bindTo": "StartDate",
						"name": "StartDate",
						"generator": "TimezoneGenerator.generateTimezoneButton",
						"layout": {"column": 0, "row": 1, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "DueDate",
					"values": {
						"bindTo": "DueDate",
						"layout": {"column": 0, "row": 2, "colSpan": 12},
						"controlConfig": {
							"timeEdit": {
								"controlConfig": {
									"prepareList": {
										"bindTo": "loadDueDateList"
									}
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Owner",
					"values": {
						"bindTo": "Owner",
						"layout": {"column": 12, "row": 1, "colSpan": 12},
						"tip": {
							"content": {"bindTo": "Resources.Strings.OwnerTip"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Status",
					"values": {
						"bindTo": "Status",
						"layout": {"column": 0, "row": 3, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM

					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Author",
					"values": {
						"bindTo": "Author",
						"layout": {"column": 12, "row": 2, "colSpan": 12},
						"enabled": false
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"name": "ResultControlGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.ResultControlGroupCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlGroup",
					"propertyName": "items",
					"name": "CustomResultControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"visible": {
							"bindTo": "AllowedResult",
							"bindConfig": {
								"converter": "getIsCustomResultVisible"
							}
						},
						"maskVisible": {
							"bindTo": "CustomResultMaskVisible"
						},
						"controlConfig": { "classes": ["custom-activity-result"] }
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlGroup",
					"propertyName": "items",
					"name": "CustomSelectedResultControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": {
							"bindTo": "ResultSelected"
						},
						"controlConfig": {
							"collapseEmptyRow": true
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlGroup",
					"propertyName": "items",
					"name": "CustomActionSelectedResultControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"visible": {
							"bindTo": "ResultSelected"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlGroup",
					"propertyName": "items",
					"name": "ResultControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": [],
						"controlConfig": {
							"collapseEmptyRow": true
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"propertyName": "items",
					"name": "EntityConnections",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ActivityCategory",
					"values": {
						"bindTo": "ActivityCategory",
						"layout": {"column": 12, "row": 4, "colSpan": 12},
						"visible": {
							"bindTo": "Type",
							"bindConfig": {
								"converter": "getVisibleCategoryByType"
							}
						},
						"contentType": Terrasoft.ContentType.ENUM

					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "CallDirection",
					"values": {
						"bindTo": "CallDirection",
						"layout": {"column": 12, "row": 5, "colSpan": 12},
						"visible": {
							"bindTo": "ActivityCategory",
							"bindConfig": {
								"converter": "getVisibleCallDirectionByCategory"
							}
						},
						"contentType": Terrasoft.ContentType.ENUM

					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Priority",
					"values": {
						"bindTo": "Priority",
						"layout": {"column": 12, "row": 3, "colSpan": 12},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "ShowInScheduler",
					"values": {
						"bindTo": "ShowInScheduler",
						"layout": {"column": 0, "row": 4, "colSpan": 12}
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlBlock",
					"propertyName": "items",
					"name": "Result",
					"values": {
						"bindTo": "Result",
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"contentType": Terrasoft.ContentType.ENUM
					}
				},
				{
					"operation": "insert",
					"parentName": "ResultControlBlock",
					"propertyName": "items",
					"name": "DetailedResult",
					"values": {
						"bindTo": "DetailedResult",
						"layout": {"column": 0, "row": 1, "colSpan": 24, "rowSpan": 3},
						"contentType": Terrasoft.ContentType.LONG_TEXT
					}
				},
				{
					"operation": "insert",
					"parentName": "CustomSelectedResultControlBlock",
					"propertyName": "items",
					"name": "CustomDetailedResult",
					"values": {
						"bindTo": "DetailedResult",
						"layout": {"column": 0, "row": 0, "colSpan": 12, "rowSpan": 3},
						"contentType": Terrasoft.ContentType.LONG_TEXT,
						"labelWrapConfig": {
							"classes": {
								"wrapClassName": "justify-top"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CustomActionSelectedResultControlBlock",
					"propertyName": "items",
					"name": "CustomActionSelectedResultControlGroup",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"layout": {"column": 0, "row": 0, "colSpan": 24},
						"items": [],
						"visible": {
							"bindTo": "ResultSelected"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "CustomActionSelectedResultControlGroup",
					"propertyName": "items",
					"name": "ResultSaveButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "save"},
						"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.BLUE
					}
				},
				{
					"operation": "insert",
					"parentName": "CustomActionSelectedResultControlGroup",
					"propertyName": "items",
					"name": "ResultCancelButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "resultCancelButtonClick"},
						"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"}
					}
				},
				{
					"operation": "insert",
					"parentName": "GeneralInfoTab",
					"name": "RemindControlGroup",
					"propertyName": "items",

					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {"bindTo": "Resources.Strings.RemindControlGroupCaption"},
						"controlConfig": {},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlGroup",
					"propertyName": "items",
					"name": "RemindControlBlock",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlBlock",
					"propertyName": "items",
					"name": "RemindToOwner",
					"values": {
						"bindTo": "RemindToOwner",
						"layout": {"column": 0, "row": 0, "colSpan": 12},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindToOwnerCaption"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlBlock",
					"propertyName": "items",
					"name": "RemindToOwnerDate",
					"values": {
						"bindTo": "RemindToOwnerDate",
						"layout": {"column": 12, "row": 0, "colSpan": 12},
						"enabled": {"bindTo": "RemindToOwnerDateEnabled"},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindDateCaption"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlBlock",
					"propertyName": "items",
					"name": "RemindToAuthor",
					"values": {
						"bindTo": "RemindToAuthor",
						"layout": {"column": 0, "row": 1, "colSpan": 12},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindToAuthorCaption"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "RemindControlBlock",
					"propertyName": "items",
					"name": "RemindToAuthorDate",
					"values": {
						"bindTo": "RemindToAuthorDate",
						"layout": {
							"column": 12,
							"row": 1,
							"colSpan": 12
						},
						"enabled": {"bindTo": "RemindToAuthorDateEnabled"},
						"labelConfig": {
							"caption": {"bindTo": "Resources.Strings.RemindDateCaption"}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ActivityFileNotesTab",
					"propertyName": "items",
					"name": "Files",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				},
				{
					"operation": "insert",
					"name": "ActivityNotesControlGroup",
					"parentName": "ActivityFileNotesTab",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"items": [],
						"caption": {"bindTo": "Resources.Strings.NotesGroupCaption"}
					}
				},
				{
					"operation": "insert",
					"parentName": "ActivityNotesControlGroup",
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
				}
			]/**SCHEMA_DIFF*/,
			rules: {
				"ActivityCategory": {
					"BindParameterVisibleActivityCategoryToType": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.VISIBLE,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Type"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": "fbe0acdc-cfc0-df11-b00f-001d60e938c6"
								}
							}
						]
					},
					"FiltrationActivityCategoryByActivityType": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"baseAttributePatch": "ActivityType",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Type"
					}
				},
				"Result": {
					"BindParameterEnabledResultToStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Status",
									"attributePath": "Finish"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							}
						]
					},
					"BindParameterRequiredResultToStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"logical": Terrasoft.LogicalOperatorType.AND,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Status",
									"attributePath": "Finish"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							},
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "IsProcessMode"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							}
						]
					}
				},
				"DetailedResult": {
					"BindParameterEnabledDetailedResultToStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "Status",
									"attributePath": "Finish"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": true
								}
							}
						]
					}
				},
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			}
		};
	});

define('ActivityPageV2InvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2Invoice", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "Activity",
		rules: {
			"Invoice": {
				"FiltrationInvoiceByAccount": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Account",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Account"
				},
				"FiltrationInvoiceByContact": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Contact",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Contact"
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('ActivityPageV2OrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2Order", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "Activity",
		rules: {
			"Order": {
				"FiltrationOrderByContact": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Contact",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Contact"
				},
				"FiltrationOrderByAccount": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Account",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Account"
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('ActivityPageV2OrderInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2OrderInvoice", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "Activity",
		rules: {
			"Invoice": {
				"FiltrationInvoiceByOrder": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Order",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Order"
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('ActivityPageV2DocumentResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2Document", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Activity",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Document": {
					"FiltrationDocumentByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationDocumentByContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Contact",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Contact"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



define('ActivityPageV2CTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2CTIBase", [],
	function() {
		return {
			details: /**SCHEMA_DETAILS*/{
				Calls: {
					schemaName: "CallDetail",
					filter: {
						masterColumn: "Id",
						detailColumn: "Activity"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "CallTab",
					"values": {
						"caption": {"bindTo": "Resources.Strings.CallTabCaption"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "CallTab",
					"propertyName": "items",
					"name": "Calls",
					"values": {
						"itemType": Terrasoft.ViewItemType.DETAIL
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});

define('ActivityPageV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2Opportunity", ["BusinessRuleModule", "ActivityBusinessRulesMixin"],
	function() {
		return {
			entitySchemaName: "Activity",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {
				"Opportunity": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						filter: function() {
							return this.getOpportunityFilters();
						},
						columns: ["Account", "Contact"]
					},
					dependencies: [
						{
							columns: ["Opportunity"],
							methodName: "setContactAndAccountByOpportunity"
						}
					]
				}
			},
			mixins: {
				ActivityBusinessRulesMixin: "Terrasoft.ActivityBusinessRulesMixin"
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});

define('ActivityPageV2ProjectResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2Project", ["LookupUtilities", "ProjectServiceHelper", "css!ProjectServiceHelper"],
		function(LookupUtilities, ProjectServiceHelper) {
			return {
				entitySchemaName: "Activity",
				attributes: {
					/**
					 * Full project name.
					 */
					"FullProjectName": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"dependencies": [
							{
								"columns": ["FullProjectName"],
								"methodName": "onFullProjectNameChange"
							}
						]
					},
					/**
					 * Project.
					 */
					"Project": {
						"lookupListConfig": {
							columns: ["Account", "Contact", "Opportunity", "ProjectEntryType"]
						},
						"dependencies": [
							{
								"columns": ["Project"],
								"methodName": "onProjectChange"
							}
						]
					},
					/**
					 * Collection of the mutual colomns name for activity and project section.
					 */
					"CommonActivityProjectColumnsCollection": {
						"dataValueType": Terrasoft.DataValueType.COLLECTION,
						"value": ["Account", "Contact", "Opportunity"]
					}
				},
				methods: {
					/**
					 * Opens emails recivers page.
					 * @protected
					 */
					openProjectLookup: function() {
						var lookup = this.getLookupConfig("Name");
						lookup.config.actionsButtonVisible = false;
						LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
					},

					/**
					 * Returns configuration object for lookup selection page.
					 * @protected
					 * @param {String} columnName Name of the column.
					 * @return {Object} Configuration object for lookup selection page.
					 */
					getLookupConfig: function(columnName) {
						var scope = this;
						var callback = function(args) {
							scope.onLookupSelected(args);
						};
						var rez = {
							config: {
								entitySchemaName: "Project",
								columnName: columnName,
								hierarchical: true,
								multiSelect: false
							},
							callback: callback
						};
						var projectPathFilters = Ext.create("Terrasoft.FilterGroup");
						Terrasoft.each(this.get("CommonActivityProjectColumnsCollection"), function(columnName) {
							var filter = scope.createProjectFilterByCommonField(columnName);
							if (filter) { projectPathFilters.addItem(filter); }
						});
						rez.config.filters = projectPathFilters;
						return rez;
					},

					/**
					 * Returns filters for the fields.
					 * @protected
					 * @param {String} arg
					 * @return {Object} Filters for the fields.
					 */
					createProjectFilterByCommonField: function(arg) {
						if (arg) {
							var val = this.get(arg);
							if (val) {
								return this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL, arg, val.value);
							} else {
								return null;
							}
						}
					},

					/**
					 * Handler for lookup selection event.
					 * @protected
					 * @param {Object} args
					 */
					onLookupSelected: function(args) {
						var project;
						var selectedRows = args.selectedRows;
						if (!selectedRows.isEmpty()) {
							project = selectedRows.getByIndex(0);
							this.loadLookupDisplayValueAsync("Project", project.value, function() {
								this.formFullProjectName(project);
							});
							return;
						} else {
							project = this.get("Project");
							if (!project) {
								return;
							}
							this.formFullProjectName(project);
						}
					},

					/**
					 *
					 * Handler for the full project change event.
					 * @protected
					 */
					onFullProjectNameChange: function() {
						var fullName = this.get("FullProjectName");
						if (this.Ext.isEmpty(fullName)) {
							this.set("Project", null);
							this.set("OldFullProjectName", "");
							return;
						}
						if (this.get("OldFullProjectName") !==  fullName && this.get("IsEntityInitialized")) {
							this.openProjectLookup();
						}
					},

					/**
					 *
					 * Handler for the entity initialized event.
					 * @protected
					 * @overridden
					 */
					onEntityInitialized: function() {
						if (this.isNew) {
							var project = this.get("Project");
							var fullProjectName = this.get("FullProjectName");
							if (project && this.Ext.isEmpty(fullProjectName)) {
								this.formFullProjectName(project);
							}
						}
						this.set("OldFullProjectName", this.get("FullProjectName"));
						this.callParent(arguments);
					},

					/**
					 * Sets validation config for the full project name.
					 * @protected
					 */
					setValidationConfig: function() {
						this.callParent(arguments);
						this.addColumnValidator("FullProjectName", function(value) {
							var invalidMessage = "";
							if (value !== this.get("OldFullProjectName") && this.get("IsEntityInitialized")) {
								invalidMessage = this.get("Resources.Strings.FullProjectNameChangedWithoutProjectSelectionWarning");
							}
							return {
								fullInvalidMessage: invalidMessage,
								invalidMessage: invalidMessage
							};
						});
					},

					/**
					 * Saved object.
					 * @overridden
					 */
					save: function() {
						var project = this.get("Project");
						var owner = this.get("Owner");
						if (!project || !owner) {
							this.callParent(arguments);
							return;
						}
						var projectId = project.value;
						var ownerId = owner.value;
						var ownerName = owner.displayValue;
						var args = arguments;
						if (!this.get("ownerChecked")) {
							ProjectServiceHelper.CheckOwnerInProjectActivity(projectId, ownerId, function(hasProjectResource) {
								if (!hasProjectResource) {
									var handler = function(result) {
										if (result !== Terrasoft.MessageBoxButtons.YES.returnCode) {
											this.set("ownerChecked", true);
											this.save(args);
											return;
										}
										ProjectServiceHelper.addContactToProjectResourceElement(projectId, owner, function() {
											this.set("ownerChecked", true);
											this.save(args);
										}, this);
									};
									var template = this.get("Resources.Strings.ProjectResourceElementMissing");
									this.showConfirmationDialog(Ext.String.format(template, ownerName), handler, ["yes", "no"]);
								} else {
									this.set("ownerChecked", true);
									this.save(args);
								}
							}, this);
							return;
						}
						this.callParent(args);
						this.set("ownerChecked", false);
					},

					/**
					 * Handler for project filed change event.
					 * @protected
					 */
					onProjectChange: function() {
						var project = this.get("Project");
						if (project) {
							if (project.Account && !this.get("Account")) {
								this.set("Account", project.Account);
							}
							if (project.Contact && !this.get("Contact")) {
								this.set("Contact", project.Contact);
							}
							if (project.Opportunity && !this.get("Opportunity")) {
								this.set("Opportunity", project.Opportunity);
							}
						}
					},

					/**
					 * Creates and sets full project name.
					 * @protected
					 * @param {Object} project
					 */
					formFullProjectName: function(project) {
						var projectId = project.value;
						ProjectServiceHelper.getProjectFullName(projectId, function(projectName) {
							this.set("OldFullProjectName", projectName);
							this.set("FullProjectName", projectName);
						}, this);
					},

					/**
					 * Gets columns name array.
					 * @ovveridden
					 * @return {[String]} Columnns name.
					 */
					getDefQuickAddColumnNames: function() {
						var columns = this.callParent(arguments);
						columns.push("Project");
						return columns;
					},

					/**
					 * Sets link to the project.
					 * @param {String} fullName
					 * @return {Object}
					 */
					setProjectUrl: function(fullName) {
						var href = {};
						var project = this.get("Project");
						if (project && !this.Ext.isEmpty(fullName)) {
							href = this.getLinkUrl("Project");
							href.caption = fullName;
						}
						return href;
					},

					/**
					 * Hadler for full project link click.
					 * @param {String} url
					 * @return {Boolean}
					 */
					onFullProjectNameLinkClick: function(url) {
						return this.onLinkClick(url, "Project");
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "GeneralInfoTab",
						"name": "ConnectionWithProjectControlGroup",
						"propertyName": "items",
						"index": 2,
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": null,
							"items": [],
							"wrapClass": ["connection-with-project-control-group"]
						}
					},
					{
						"operation": "insert",
						"parentName": "ConnectionWithProjectControlGroup",
						"propertyName": "items",
						"name": "FullProjectName",
						"values": {
							"layout": {"column": 0, "row": 0, "colSpan": 24},
							"tip": {
								"content": {"bindTo": "Resources.Strings.FullProjectNameTip"}
							},
							"bindTo": "FullProjectName",
							"hasClearIcon": true,
							"showValueAsLink": true,
							"caption": {"bindTo": "Resources.Strings.FullProjectCaption"},
							"href": {
								"bindTo": "FullProjectName",
								"bindConfig": {"converter": "setProjectUrl"}
							},
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {"bindTo": "openProjectLookup"},
								"linkclick": {bindTo: "onFullProjectNameLinkClick"}
							}
						}
					}
				]/**SCHEMA_DIFF*/,
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/
			};
		});

define('ActivityPageV2OrderInSalesResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2OrderInSales", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "Activity",
		rules: {
			"Order": {
				"FiltrationOrderByOpportunity": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Opportunity",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Opportunity"
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('ActivityPageV2OpportunityInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2OpportunityInvoice", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "Activity",
		rules: {
			"Invoice": {
				"FiltrationInvoiceByOpportunity": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Opportunity",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Opportunity"
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define('ActivityPageV2DocumentInOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2DocumentInOpportunity", ["BusinessRuleModule"],
	function(BusinessRuleModule) {
		return {
			entitySchemaName: "Activity",
			attributes: {},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {},
			rules: {
				"Document": {
					"FiltrationDocumentByOpportunity": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Opportunity",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Opportunity"
					}
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});



define('ActivityPageV2OpportunityManagementResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ActivityPageV2OpportunityManagement", [], function() {
	return {
		entitySchemaName: "Activity",

		messages: {
			/**
			 * @message GetNewValues
			 * ########### ##### ######## #####.
			 */
			"GetScheduleItemStatus": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ReloadGridData
			 * ######## ############# ######### # ####### ###### ### ### #########.
			 */
			"ReloadGridData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		methods: {
			/**
			 * ####### ######### ############# ########.
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				var statusId = this.sandbox.publish("GetScheduleItemStatus", null, [this.sandbox.id]);
				if (statusId) {
					this.loadLookupDisplayValue("Status", statusId);
				}
			},

			/**
			 * ######### ############# ########## ######.
			 * @overridden
			 */
			onSaved: function() {
				this.callParent(arguments);
				this.sandbox.publish("ReloadGridData", null, [this.sandbox.id]);
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});

define("ActivityPageV2", [],
	function() {
		return {
			entitySchemaName: "Activity",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "Lead",
					"values": {
						"layout": { "column": 12, "row": 2, "colSpan": 12 }
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


