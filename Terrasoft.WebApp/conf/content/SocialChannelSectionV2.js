Terrasoft.configuration.Structures["SocialChannelSectionV2"] = {innerHierarchyStack: ["SocialChannelSectionV2"], structureParent: "BaseSectionV2"};
define('SocialChannelSectionV2Structure', ['SocialChannelSectionV2Resources'], function(resources) {return {schemaUId:'4e3640b5-de45-4011-b228-d98ad0f871d0',schemaCaption: "SocialChannelSectionV2", parentSchemaName: "BaseSectionV2", schemaName:'SocialChannelSectionV2',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SocialChannelSectionV2", [],
		function() {
			return {
				entitySchemaName: "SocialChannel",
				columns: {},
				messages: {
					"CanSubscribe": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				},
				methods: {
					getAddRecordButtonCaption: function() {
						return this.get("Resources.Strings.AddChannel");
					},

					/**
					 * ############# ######## ## ######### CanSubscribe ## ########
					 */
					initCanSubscribeChangedHandler: function() {
						var me = this;
						this.sandbox.subscribe("CanSubscribe", function(config) {
							me.set(config.key, config.value);
						});
					},

					/**
					 * #############
					 * @overridden
					 */
					init: function() {
						this.initCanSubscribeChangedHandler();
						this.callParent(arguments);
					},

					/**
					 * @overridden
					 */
					initContextHelp: function() {
						this.set("ContextHelpId", 1037);
						this.callParent(arguments);
					},

					/**
					 * ######### ######### #######
					 * @overridden
					 */
					getDefaultGridDataViewCaption: function() {
						return this.get("Resources.Strings.GridDataViewCaption");
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
						"propertyName": "items",
						"name": "SubscribeChannelButton",
						"index": 0,
						"values": {
							itemType: this.Terrasoft.ViewItemType.BUTTON,
							caption: {
								bindTo: "Resources.Strings.SubscribeButtonCaption"
							},
							click: {bindTo: "onCardAction"},
							visible: {bindTo: "ToSubscribe"},
							classes: {textClass: ["actions-button-margin-right"]},
							tag: "onSubscribeChannelClick"
						}
					},
					{
						"operation": "insert",
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
						"propertyName": "items",
						"name": "UnsubscribeChannelButton",
						"index": 0,
						"values": {
							itemType: this.Terrasoft.ViewItemType.BUTTON,
							caption: {
								bindTo: "Resources.Strings.UnsubscribeButtonCaption"
							},
							click: {bindTo: "onCardAction"},
							visible: {bindTo: "ToUnsubscribe"},
							classes: {textClass: ["actions-button-margin-right"]},
							tag: "onUnsubscribeChannelClick"
						}
					}
				]/**SCHEMA_DIFF*/,
				userCode: {}
			};
		});


