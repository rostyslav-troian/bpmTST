Terrasoft.configuration.Structures["SectionMainSettings"] = {innerHierarchyStack: ["SectionMainSettings"], structureParent: "BaseSectionMainSettings"};
define('SectionMainSettingsStructure', ['SectionMainSettingsResources'], function(resources) {return {schemaUId:'a358f969-e870-43fd-a870-d6ed5572fc71',schemaCaption: "Section - Main settings", parentSchemaName: "BaseSectionMainSettings", schemaName:'SectionMainSettings',parentSchemaUId:'14f4b7e5-7687-41e9-b43c-e323c8d6d945',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SectionMainSettings", [
	"SectionMainSettingsResources"
], function() {
	return {
		messages: {
			/**
			 * Subscribing on message who call when MiniPage module settings is initialized.
			 */
			"MiniPageModuleSettingsInitialized": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * Publishing message for saving MiniPage settings.
			 */
			"SaveSectionMiniPageSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Initialized.
			 */
			"Initialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				onChange: "onCaptionChange",
				dependencies: [
					{
						columns: ["PropertyInitialized", "MultiPageInitialized", "SectionPageSettingsInitialized",
							"MiniPageModuleSettingsInitialized", "VisaSettingsInitialized"],
						methodName: "onInitialized"
					}
				]
			},
			/**
			 * Indicates if MiniPageModuleSettings initialized.
			 */
			"MiniPageModuleSettingsInitialized": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		modules: {
			"MultiPageModule": {
				config: {
					schemaName: Terrasoft.Features.getIsEnabled("SectionPageWizard")
						? "SectionPageSettings"
						: "SysModuleEntitySettings",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			},
			"MiniPageSettingsModule": {
				config: {
					schemaName: "SectionMiniPageSettings",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_subscribeMiniPageSettingsMessages: function() {
				const tag = this.getMiniPageSettingsModuleId();
				this.sandbox.subscribe("GetSysModuleSettings", this.onGetSysModuleSettings, this, [tag]);
				this.sandbox.subscribe("MiniPageModuleSettingsInitialized", this.onMiniPageModuleSettingsInitialized, this, [tag]);
				this.sandbox.subscribe("GetEntitySchemaInstance", this._onGetEntitySchemaInstance, this, [tag]);
				this.sandbox.subscribe("PageSettingsChanged", this.onPageSettingsChanged, this, [tag]);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionMainSettings#getSubModulesIsInitedColumns
			 * @override
			 */
			getSubModulesIsInitedColumns: function() {
				var columns = this.callParent(arguments);
				columns.push("MiniPageModuleSettingsInitialized");
				return columns;
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionMainSettings#subscribeMessages
			 * @override
			 */
			subscribeMessages: function() {
				this._subscribeMiniPageSettingsMessages();
				this.callParent(arguments);
			},

			/**
			 * Handler for message MiniPageModuleSettingsInitialized.
			 * @protected
			 */
			onMiniPageModuleSettingsInitialized: function() {
				this.set("MiniPageModuleSettingsInitialized", true);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionMainSettings#saveAditionalInfo
			 * @override
			 */
			saveAditionalInfo: function(callback, scope) {
				this.callParent([function() {
					Terrasoft.chain(
						function(next) {
							var tag = this.getMiniPageSettingsModuleId();
							this.sandbox.publish("SaveSectionMiniPageSettings", next, [tag]);
						},
						function() {
							Ext.callback(callback, scope);
						},
						this
					);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionMainSettings#publishChangeModuleSettingsMessage
			 * @override
			 */
			publishChangeModuleSettingsMessage: function(message) {
				this.callParent(arguments);
				this.sandbox.publish("ChangeModuleSettings", message, [this.getMiniPageSettingsModuleId()]);
			},

			/**
			 * Returns MiniPageSettingsModule id.
			 * @protected
			 * @return {String}
			 */
			getMiniPageSettingsModuleId: function() {
				return Ext.String.format("{0}_module_MiniPageSettingsModule", this.sandbox.id);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionMainSettings#afterPageSettingsChanged
			 * @override
			 */
			afterPageSettingsChanged: function(moduleEntity) {
				const settings = {
					sysModuleEntityUId: moduleEntity.id,
					packageUId: this.get("packageUId"),
					sectionManagerItemId: this.get(this.sectionManagerItemColumnName).getId()
				};
				this.sandbox.publish("ChangeModuleSettings", settings, [this.getMiniPageSettingsModuleId()]);
			},
			
			//endregion

			//region Methods: Public
			//endregion

		},
		diff: [
			{
				"operation": "insert",
				"parentName": "MainSettingsWrapper",
				"propertyName": "items",
				"name": "SectionMiniPageSettingsModuleContainer",
				"index": 2,
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["mini-page-settings-module-container"]},
					"items": [
						{
							"name": "MiniPageSettingsModule",
							"itemType": Terrasoft.ViewItemType.MODULE
						}
					]
				}
			}
		]
	};
});


