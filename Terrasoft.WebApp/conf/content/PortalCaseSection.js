Terrasoft.configuration.Structures["PortalCaseSection"] = {innerHierarchyStack: ["PortalCaseSection"], structureParent: "BaseSectionV2"};
define('PortalCaseSectionStructure', ['PortalCaseSectionResources'], function(resources) {return {schemaUId:'77fa8de4-b861-4c49-87b0-dda2241f0ea4',schemaCaption: "Page schema - \"Cases\" section on Portal", parentSchemaName: "BaseSectionV2", schemaName:'PortalCaseSection',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("PortalCaseSection", [],
	function () {
		return {
			entitySchemaName: "Case",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "DataGridActiveRowDeleteAction"
				},
				{
					"operation": "remove",
					"name": "RightContainer"
				},
				{
					"operation": "remove",
					"name": "CombinedModeActionButtonsCardRightContainer"
				},
				{
					"operation": "insert",
					"name": "ComplainButton",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.Complain"},
						"caption": {
							"bindTo": "Resources.Strings.ComplainButtonCaption"
						},
						"classes": {
							"wrapperClass": ["complain-button"]
						},
						"click": {"bindTo": "onComplainButtonClick"},
						"visible": {
							"bindTo": "getIsComplainButtonVisible"
						}
					},
					"index": 10
				}
			]/**SCHEMA_DIFF*/,
			messages: {
				/**
				 * @message OnComplainButtonClick
				 * Event Complain button clicked.
				 */
				"OnComplainButtonClick": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ChangeComplainButtonVisibility
				 * Message for hide complain button.
				 */
				"ChangeComplainButtonVisibility": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				/**
				 * Determines if folder filter is available.
				 */
				"UseFolderFilter": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				/**
				 * EnableComplainFunction SysSettings value.
				 */
				"EnableComplainFunction": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * EnableCancelAction menu item enabled value.
				 */
				"EnableCancelAction": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * EnableReopenAction menu item enabled value.
				 */
				"EnableReopenAction": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function () {
					this.callParent(arguments);
					this.sandbox.subscribe("ChangeComplainButtonVisibility",
						this.setEnableComplainFunctionAttribute, this, [this.sandbox.id + "_CardModuleV2"]);
				},

				/**
				 * Sets EnableComplainFunction attribute
				 * @param {Boolean} complainFunctionAvailability Availability of complain button
				 * @private
				 */
				setEnableComplainFunctionAttribute: function (complainFunctionAvailability) {
					this.set("EnableComplainFunction", complainFunctionAvailability);
				},

				/**
				 * Sets context help identifier.
				 * @overridden
				 * @protected
				 */
				initContextHelp: function () {
					this.enableContextHelp = false;
				},

				/**
				 * @overridden Terrasoft.BaseSectionV2#isVisibleDeleteAction
				 * @return {Boolean} Visible of delete action
				 */
				isVisibleDeleteAction: function() {
					return false;
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#getDefaultDataViews
				 * @overridden
				 * @protected
				 * @return {Object}
				 */
				getDefaultDataViews: function () {
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
				 * @inheritdoc Terrasoft.BaseSectionV2#initFixedFiltersConfig
				 * @overridden
				 */
				initFixedFiltersConfig: this.Terrasoft.emptyFn,

				/**
				 * Read required SysSettings values.
				 * @protected
				 */
				initSysSettings: function () {
					Terrasoft.SysSettings.querySysSettingsItem("EnableComplainFunction", function (value) {
						this.set("EnableComplainFunction", value);
					}, this);
				},

				/**
				 * Gets visibility of Complain button.
				 * @returns {Boolean}
				 */
				getIsComplainButtonVisible: function () {
					return this.get("EnableComplainFunction");
				},

				/**
				 * Complain button click handler.
				 */
				onComplainButtonClick: function () {
					this.sandbox.publish("OnComplainButtonClick", {},
						[this.sandbox.id + "_CardModuleV2"]);
				},

				/**
				 * Call service for canceling case.
				 * @protected
				 */
				cancelCase: function () {
					this.onCardAction("cancelCase");
				},

				/**
				 * Call service for closing case.
				 * @protected
				 */
				closeCase: function () {
					this.onCardAction("closeCase");
				},

				/**
				 * Call service for closing case.
				 * @protected
				 */
				reopenCase: function () {
					this.onCardAction("reopenCase");
				},

				/**
				 * @inheritdoc Terrasoft.BaseSectionV2#init
				 * @overridden
				 */
				init: function () {
					this.initSysSettings();
					this.set("UseFolderFilter", this.Terrasoft.Features.getIsEnabled("PortalColumnConfig"));
					this.callParent(arguments);
				}
			}

		};
	});


