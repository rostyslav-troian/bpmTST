Terrasoft.configuration.Structures["LeadSectionActionsDashboard"] = {innerHierarchyStack: ["LeadSectionActionsDashboard"], structureParent: "SectionActionsDashboard"};
define('LeadSectionActionsDashboardStructure', ['LeadSectionActionsDashboardResources'], function(resources) {return {schemaUId:'9f460c87-c98d-4993-a55a-4d6ad75091a0',schemaCaption: "LeadSectionActionsDashboard", parentSchemaName: "SectionActionsDashboard", schemaName:'LeadSectionActionsDashboard',parentSchemaUId:'d2bb0841-0efc-4750-92b4-9dca1072e886',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("LeadSectionActionsDashboard", ["LeadConfigurationConst", "SectionActionsDashboard"],
	function(LeadConfigurationConst) {
		return {
			attributes: {},
			messages: {
				/**
				 * @message LaunchLeadManagement
				 * Launches LeadManagement process.
				 */
				"LaunchLeadManagement": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {
				/**
				 * Checks whether progress bar is disabled or not.
				 * @private
				 * @returns {boolean} Returns true if progressbar is disabled.
				 */
				checkStageControlDisabled: function() {
					var isStageControlDisabled = false;
					var sandbox = this.sandbox;
					var result = sandbox.publish("GetColumnsValues", ["IsProcessNotAttachedToEntity", "QualifyStatus"],
						[sandbox.id]);
					var isOldIsProcess =  result.IsProcessNotAttachedToEntity;
					var qualifyStatus = result.QualifyStatus;
					var qualifyStatusId = qualifyStatus && qualifyStatus.value;
					var qualifyStatusConstant = LeadConfigurationConst.LeadConst.QualifyStatus;
					if (isOldIsProcess && qualifyStatusId !== qualifyStatusConstant.Qualification) {
						isStageControlDisabled = true;
					}
					return isStageControlDisabled;
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#setAvailableActions
				 * @overridden
				 */
				setAvailableActions: function() {
					if (this.checkStageControlDisabled()) {
						return;
					} else {
						this.callParent(arguments);
					}
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#getSaveMasterEntityConfig
				 * @overridden
				 */
				getSaveMasterEntityConfig: function() {
					var config = this.callParent(arguments);
					config.isSilent = true;
					config.lockBodyMask = true;
					return config;
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#onMasterEntitySaved
				 * @overridden
				 */
				onMasterEntitySaved: function(callback, scope) {
					if (!this.get("IsInActionChangedMode")) {
						this.Ext.callback(callback, scope || this);
						return;
					}
					this.Ext.callback(callback, scope || this);
					var sandbox = this.sandbox;
					var operation = this.getMasterEntityParameterValue("Operation");
					var config = null;
					if (operation !== Terrasoft.ConfigurationEnums.CardOperation.EDIT) {
						config = {callbackMethodName: "onCloseCardButtonClick"};
					} else {
						config = {continueExecuting: false};
					}
					sandbox.publish("LaunchLeadManagement", config, [sandbox.id]);
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#saveMasterEntity
				 * @overridden
				 */
				saveMasterEntity: function() {
					this.set("StartLeadManagementProcess", false);
					this.callParent(arguments);
				},

				/**
				 * @inheritdoc Terrasoft.SectionActionsDashboard#getDefaultValues
				 * @overridden
				 */
				getDefaultValues: function() {
					var defaultValues = this.callParent(arguments);
					var qualifiedContact = this.getMasterEntityParameterValue("QualifiedContact");
					if (qualifiedContact) {
						defaultValues.push({
							name: "Contact",
							value: qualifiedContact.value
						});
					}
					var qualifiedAccount = this.getMasterEntityParameterValue("QualifiedAccount");
					if (qualifiedAccount) {
						defaultValues.push({
							name: "Account",
							value: qualifiedAccount.value
						});
					}
					return defaultValues;
				},

				/**
				 * @inheritdoc Terrasoft.ActionsDashboard#onGetRecordInfoForPublisher
				 * @overridden
				 */
				onGetRecordInfoForPublisher: function() {
					var info = this.callParent(arguments);
					var recepientTemplate = "{0} <{1}>; ";
					var contact = this.getMasterEntityParameterValue("QualifiedContact");
					info.additionalInfo.contact = contact;
					var name = contact && contact.displayValue;
					var email = this.getMasterEntityParameterValue("Email");
					if (name && email) {
						info.additionalInfo.recepient = this.Ext.String.format(recepientTemplate, name, email);
					} else {
						info.additionalInfo.recepient = this.Terrasoft.emptyString;
					}
					return info;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);


