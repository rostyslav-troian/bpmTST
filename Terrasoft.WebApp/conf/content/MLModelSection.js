Terrasoft.configuration.Structures["MLModelSection"] = {innerHierarchyStack: ["MLModelSection"], structureParent: "BaseSectionV2"};
define('MLModelSectionStructure', ['MLModelSectionResources'], function(resources) {return {schemaUId:'5d3640fc-761c-45e6-9d10-2fdbae4c19f5',schemaCaption: "MLModelSection", parentSchemaName: "BaseSectionV2", schemaName:'MLModelSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("MLModelSection", ["ControlGridModule", "GridUtilitiesV2", "MLModelStateProgressBarUtils",
		"css!MLModelStateProgressBarUtils"],
	function() {
		return {
			entitySchemaName: "MLModel",
			messages: {
				/**
				 * @message TrainButtonConfigUpdated
				 * Subscribes on information about current Train button's configuration.
				 */
				"TrainButtonConfigUpdated": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * Train button's caption.
				 */
				"TrainButtonCaption": {
					"dataValueType": Terrasoft.DataValueType.TEXT
				},
				/**
				 * Indicates that train button is enabled.
				 */
				"IsTrainButtonEnabled": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getSectionActions
				 * @override
				 */
				getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {
							"bindTo": "Resources.Strings.ExecuteJobActionCaption"
						},
						"Click": {
							bindTo: "executeMLTrainerJob"
						}
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						"Caption": {
							"bindTo": "Resources.Strings.OpenMLProblemTypeLookup"
						},
						"Click": {
							bindTo: "openMLProblemTypeLookup"
						}
					}));
					return actionMenuItems;
				},

				/**
				 * Executes machine learning training job.
				 */
				executeMLTrainerJob: function() {
					this.callService({
						serviceName: "MLTrainerService",
						methodName: "ExecuteModelTrainerJob"
					}, function() {
						this.showInformationDialog(this.get("Resources.Strings.ExecuteJobActionMessage"));
					});
				},

				/**
				 * Opens MLProblemType lookup.
				 */
				openMLProblemTypeLookup: function() {
					this.showBodyMask();
					this.set("IgnoreFilterUpdate", true);
					this.saveCardScroll();
					this.scrollCardTop();
					var newHash = this.Terrasoft.combinePath("LookupSectionModule", "BaseLookupConfigurationSection");
					this.sandbox.publish("PushHistoryState", {
						hash: newHash,
						silent: true,
						stateObj: {
							caption: this.get("Resources.Strings.MLProblemTypeLookupCaption"),
							entitySchemaName: "MLProblemType"
						}
					});
					this.sandbox.loadModule("LookupSectionModule", {
						renderTo: this.renderTo,
						id: this.sandbox.id + "_BaseLookupConfigurationSection",
						keepAlive: true
					});
				},

				/**
				 * @inheritdoc BaseSectionV2#subscribeSandboxEvents
				 * @protected
				 * @override
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("TrainButtonConfigUpdated",
						function(config) {
							this.$TrainButtonCaption = config.caption;
							this.$IsTrainButtonEnabled = config.enabled;
						}, this, this.getCardModuleSandboxIdentifiers());
					this.callParent(arguments);
				},

				/**
				 * Passes indicator config by reference.
				 * @param {Object} control Configuration object.
				 * @override
				 */
				applyControlConfig: function(control) {
					control.config = {
						className: "Terrasoft.BaseProgressBar",
						value: {
							"bindTo": "State",
							"bindConfig": {"converter": "getStateValue"}
						},
						width: "158px"
					};
				},

				/**
				 * @inheritdoc Terrasoft.GridUtilitiesV2#addColumnLink
				 * @override
				 */
				addColumnLink: function(item) {
					item.getStateValue = function(state) {
						return Terrasoft.MLModelStateProgressBarUtils.getStateProgressBarValue(state);
					};
					return this.callParent(arguments);
				}
			},
			diff: /**SCHEMA_DIFF*/ [
				{
					"name": "TrainButton",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"operation": "insert",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.core.enums.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.GREEN,
						"caption": {"bindTo": "TrainButtonCaption"},
						"enabled": {"bindTo": "IsTrainButtonEnabled"},
						"click": {"bindTo": "onCardAction"},
						"tag": "queryModelTraining",
						"markerValue": "TrainButton"
					}
				}, {
					"name": "DataGrid",
					"operation": "merge",
					"values": {
						"className": "Terrasoft.ControlGrid",
						"controlColumnName": "State",
						"applyControlConfig": {"bindTo": "applyControlConfig"}
					}
				}
			] /**SCHEMA_DIFF*/
		};
	});


