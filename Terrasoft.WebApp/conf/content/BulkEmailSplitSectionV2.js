Terrasoft.configuration.Structures["BulkEmailSplitSectionV2"] = {innerHierarchyStack: ["BulkEmailSplitSectionV2"], structureParent: "BaseSectionV2"};
define('BulkEmailSplitSectionV2Structure', ['BulkEmailSplitSectionV2Resources'], function(resources) {return {schemaUId:'efb048e8-5846-43bc-9b63-6d95648f77f7',schemaCaption: "Section page schema - \"Email: split tests\"", parentSchemaName: "BaseSectionV2", schemaName:'BulkEmailSplitSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BulkEmailSplitSectionV2", ["BulkEmailSplitSectionV2Resources", "GridUtilitiesV2", "WizardStepsControl",
		"css!WizardStepsControl"],
	function(resources) {
		return {
			entitySchemaName: "BulkEmailSplit",
			contextHelpId: "1001",
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "SeparateModeActionsButton"
				},
				{
					"operation": "remove",
					"name": "CombinedModeActionsButton"
				},
				{
					"operation": "remove",
					"name": "CombinedModeViewOptionsButton"
				},
				{
					"operation": "insert",
					"name": "RunSplitTestButton",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "RunTestButtontCaption"},
						"click": {"bindTo": "onRunTestClick"}
					}
				},
				{
					"operation": "insert",
					"name": "WizardSteps",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.WizardStepsControl",
						"wizardSteps": [
							{
								caption: resources.localizableStrings.TestParametersCaption
							},
							{
								caption: resources.localizableStrings.AudienceTestCaption
							},
							{
								caption: resources.localizableStrings.RunTestCaption
							},
							{
								caption: resources.localizableStrings.TestResultsCaption
							}
						],
						"currentStep": {"bindTo": "CurrentWizardStep"},
						"passedStep": {"bindTo": "PassedWizardStep"},
						"afterStepChange": {"bindTo": "afterStepChange"}
					},
					"parentName": "CombinedModeActionButtonsCardRightContainer",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/,
			messages: {
				/**
				 * @message SetPassedStepInHeader
				 * ############# ########## ### # #######.
				 */
				"SetPassedStepInHeader": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetCurrentStepInHeader
				 * ############# ####### ### # #######.
				 */
				"SetCurrentStepInHeader": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetRunTestButtontVisible
				 * ############# ######### ###### ####### #####.
				 */
				"SetRunTestButtontVisible": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message SetRunTestButtontCaption
				 * ############# ####### ###### ########## ###### {###### #####|########## ####}.
				 */
				"SetRunTestButtontCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message CurrentStepInHeaderChanged
				 * ########## ## ######### ######## #### # #######.
				 */
				"CurrentStepInHeaderChanged": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ReloadCard
				 * ########## # ####### ## ###### ######### ####.
				 */
				"OnRunTestClick": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ReloadRecordInSection
				 * ########## # ####### ## ###### ######### ####.
				 */
				"ReloadRecordInSection": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}

			},
			methods: {

				/**
				 * ######## ##### #### "####### ###### #######".
				 * @inheritdoc BaseSectionV2#addSectionDesignerViewOptions
				 * @overridden
				 */
				addSectionDesignerViewOptions: Terrasoft.emptyFn,

				/**
				 * @inheritDoc Terrasoft.BasePageV2#openCard
				 * @overriden
				 */
				openCard: function() {
					this.set("CurrentWizardStep", -1);
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#getDefaultDataViews
				 * @overriden
				 */
				getDefaultDataViews: function() {
					var gridDataView = {
						name: this.get("GridDataViewName"),
						caption: this.getDefaultGridDataViewCaption(),
						icon: this.getDefaultGridDataViewIcon()
					};
					return {
						"GridDataView": gridDataView
					};
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#subscribeSandboxEvents
				 * @overriden
				 */
				subscribeSandboxEvents: function() {
					this.callParent(arguments);
					this.sandbox.subscribe("SetCurrentStepInHeader", function(clientStepIndex) {
						this.set("CurrentWizardStep", clientStepIndex);
					}, this, [this.getCardModuleSandboxId()]);
					this.sandbox.subscribe("SetPassedStepInHeader", function(value) {
						this.set("PassedWizardStep", value);
					}, this, [this.getCardModuleSandboxId()]);
					this.sandbox.subscribe("SetRunTestButtontCaption", function(value) {
						this.set("RunTestButtontCaption", value);
					}, this, [this.getCardModuleSandboxId()]);
					this.sandbox.subscribe("ReloadRecordInSection", this.reloadRecordInSection,
						this, [this.getCardModuleSandboxId()]);
				},

				/**
				 * @inheritDoc Terrasoft.BasePageV2#changeSelectedSideBarMenu
				 * @overriden
				 */
				changeSelectedSideBarMenu: function() {
					var moduleName = "BulkEmail";
					var moduleConfig = Terrasoft.configuration.ModuleStructure[moduleName];
					if (moduleConfig) {
						var sectionSchema = moduleConfig.sectionSchema;
						var config = moduleConfig.sectionModule + "/";
						if (sectionSchema) {
							config += moduleConfig.sectionSchema + "/";
						}
						this.sandbox.publish("SelectedSideBarItemChanged", config, ["sectionMenuModule"]);
					}
				},

				/**
				 * ######## ######### # ######## #### ######### ######## #### # #######.
				 * @protected
				 * @param {Number} clientStepIndex ##### ######## #### # #######.
				 */
				afterStepChange: function(clientStepIndex) {
					if (clientStepIndex) {
						this.sandbox.publish("CurrentStepInHeaderChanged", clientStepIndex,
							[this.getCardModuleSandboxId()]);
					}
				},

				/**
				 * ######## ######### # ######## ##### ####### ## ###### ######### ####.
				 * @protected
				 */
				onRunTestClick: function() {
					this.sandbox.publish("OnRunTestClick", null,
						[this.getCardModuleSandboxId()]);
				},

				/**
				 * ######### ########## ###### # ####### #######.
				 * @param {string} bulkEmailSplitId ########## ############# ######## #####-#####.
				 * @private                       `
				 */
				reloadRecordInSection: function(bulkEmailSplitId) {
					var gridData = this.get("GridData");
					if (gridData) {
						var record = gridData.get(bulkEmailSplitId);
						if (record) {
							record.loadEntity(bulkEmailSplitId);
						}
					}
				}

			},
			attributes: {
				/**
				 * ####### ### # #######.
				 */
				"CurrentWizardStep": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.INTEGER
				},

				/**
				 * ########## ### #  #######.
				 */
				"PassedWizardStep": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.INTEGER
				},

				/**
				 * ####### ###### ########## ###### {###### #####|########## ####}.
				 */
				"RunTestButtontCaption": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			}
		};
	});


