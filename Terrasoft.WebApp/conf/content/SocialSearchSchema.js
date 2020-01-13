Terrasoft.configuration.Structures["SocialSearchSchema"] = {innerHierarchyStack: ["SocialSearchSchema"]};
define('SocialSearchSchemaStructure', ['SocialSearchSchemaResources'], function(resources) {return {schemaUId:'0940d81e-1b3c-4ca8-bbb4-46f24319a472',schemaCaption: "Social Search Schema", parentSchemaName: "", schemaName:'SocialSearchSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define([],
	function() {
		return {
			/**
			 * #########, ########### ### ########## ############ ############ #####
			 * @type {Object}
			 */
			messages: {
				/**
				 * ########## ######### ####### ChangeHeaderCaption
				 */
				"NeedHeaderCaption": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 *
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 *
				 */
				"BackHistoryState": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 *
				 */
				"SetInitialisationData": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message ResultSelectedRows
				 * ########## ######### ###### # ###########.
				 */
				"ResultSelectedRows": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message SearchResultBySocialNetworks
				 * ########## ######### ###### ## ########## #####.
				 */
				"SearchResultBySocialNetworks": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},

			/**
			 * ######## ###### ############# #######
			 * @type {Object}
			 */
			attributes: {
				/**
				 * ######### ###### ### ############# ######.
				 */
				"GridData": {dataValueType: Terrasoft.DataValueType.COLLECTION},

				/**
				 * ####### ######### ######## "######### #####".
				 */
				"IsSummarySettingsVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * ############# ######## ###### # #######.
				 */
				"ActiveRow": {
					dataValueType: Terrasoft.DataValueType.STRING,
					value: null
				},

				/**
				 * ###### ############### ######### ####### # #######.
				 */
				"SelectedRows": {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				}
			},

			/**
			 * ######-####### (#######), ########### ################ ####### #####
			 */
			mixins: {},

			methods: {
				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#init
				 * @overridden
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.subscribeSandboxEvents();
						callback.call(scope);
					}, this]);
					this.initSelectedRows();
				},

				/**
				 * ############## ######### ###### # #######.
				 * @protected
				 */
				initSelectedRows: function() {
					this.set("SelectedRows", []);
				},

				/**
				 * ############## ######### ########.
				 * @protected
				 */
				initMainHeaderCaption: function() {
					var caption = this.get("Resources.Strings.HeaderCaption");
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: caption,
						dataViews: new Terrasoft.Collection(),
						moduleName: this.name
					});
				},

				/**
				 * @inheritdoc Terrasoft.BasePage#subscribeSandboxEvents
				 * @overridden
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("NeedHeaderCaption", function() {
						this.initMainHeaderCaption();
					}, this);
				},

				/**
				 * ########## ####### ####### ## ###### ######.
				 */
				onCloseButtonClick: function() {
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * @inheritdoc Terrasoft.BasePage#onRender
				 * @overridden
				 */
				onRender: function() {
					this.initMainHeaderCaption();
				},

				search: Terrasoft.emptyFn,

				clear: Terrasoft.emptyFn,

				/**
				 * ########## ####### ###### #######.
				 */
				onSelectButtonClick: function() {
					var selectedItems = this.getSelectedItems();
					var config = {
						selectedItems: selectedItems
					};
					this.sandbox.publish("SearchResultBySocialNetworks", config);
					this.sandbox.publish("BackHistoryState");
				},

				/**
				 * ########## ######### / ######## ###### # #######.
				 * @protected
				 * @return {Object} ###### #######.
				 */
				getSelectedItems: Terrasoft.emptyFn,

				/**
				 * ########## ########### ###### #######.
				 * @protected
				 * @return {Boolean} ########### ###### #######.
				 */
				getSelectButtonEnabled: Terrasoft.emptyFn
			},

			diff: /**SCHEMA_DIFF*/[
//				SectionWrapContainer
				{
					"operation": "insert",
					"name": "SectionWrapContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["section-wrap"],
						"items": []
					}
				},
//				ActionButtonsContainer
				{
					"operation": "insert",
					"name": "ActionButtonsContainer",
					"parentName": "SectionWrapContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"id": "ActionButtonsContainer",
						"selectors": {"wrapEl": "#ActionButtonsContainer"},
						"wrapClass": ["action-buttons-container-wrapClass", "actions-container"],
						"items": []
					}
				},
//				ActionButtonsLeftContainer
				{
					"operation": "insert",
					"name": "ActionButtonsLeftContainer",
					"parentName": "ActionButtonsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["action-buttons-left-container-wrapClass"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SelectButton",
					"parentName": "ActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.SelectButtonCaption"},
						"click": {"bindTo": "onSelectButtonClick"},
						"enabled": {"bindTo": "getSelectButtonEnabled"},
						"classes": {
							"textClass": ["actions-button-margin-right", "t-btn-style-green"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "CloseButton",
					"parentName": "ActionButtonsLeftContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
						"click": {"bindTo": "onCloseButtonClick"},
						"classes": {
							"textClass": ["actions-button-margin-right"]
						}
					}
				},
//				ContentContainer
				{
					"operation": "insert",
					"name": "ContentContainer",
					"parentName": "SectionWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "ContentContainer",
						"selectors": {"wrapEl": "#ContentContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["content-container-wrapClass", "content-container"],
						"items": []
					}
				},
//				SocialSearchContainer
				{
					"operation": "insert",
					"name": "SocialSearchContainer",
					"parentName": "ContentContainer",
					"propertyName": "items",
					"values": {
						"id": "SocialSearchContainer",
						"selectors": {"wrapEl": "#SocialSearchContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["social-search-wrapClass"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "QueryContainer",
					"parentName": "SocialSearchContainer",
					"propertyName": "items",
					"values": {
						"id": "QueryContainer",
						"selectors": {"wrapEl": "#QueryContainer"},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"wrapClass": ["social-search-query-container"],
						"isHeaderVisible": false,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "QueryInputContainer",
					"parentName": "QueryContainer",
					"propertyName": "items",
					"values": {
						"id": "QueryInputContainer",
						"selectors": {"wrapEl": "#QueryInputContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["social-search-query-input-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Query",
					"parentName": "QueryInputContainer",
					"propertyName": "items",
					"values": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"labelConfig": {
							"caption": "Query",
							"visible": false
						},
						"markerValue": "SocialSearchQuery",
						"classes": {
							"wrapClass": ["social-search-query-input"]
						},
						"controlConfig": {
							"className": "Terrasoft.TextEdit",
							"enterkeypressed": {"bindTo": "search"}
						}
					}
				},
				{
					"operation": "insert",
					"name": "SearchTooltipButton",
					"parentName": "QueryContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {
							"bindTo": "Resources.Strings.SearchTooltip"
						},
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.HOVER
						},
						"controlConfig": {
							"classes": {
								"wrapperClass": "webform-info-button-control-group info-button",
								"imageClass": "webform-info-button-image"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "SearchButton",
					"parentName": "QueryContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"caption": {"bindTo": "Resources.Strings.SearchButtonCaption"},
						"click": {bindTo: "search"},
						"classes": {
							"textClass": ["actions-button-margin-right", "search-button"]
						}
					}
				},
//				SocialSearchResultContainer
				{
					"operation": "insert",
					"name": "SocialSearchResultContainer",
					"parentName": "SocialSearchContainer",
					"propertyName": "items",
					"values": {
						"id": "SocialSearchResultContainer",
						"selectors": {"wrapEl": "#SocialSearchResultContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["social-search-result-container-wrapClass"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "SocialSearchResultControlGroup",
					"parentName": "SocialSearchResultContainer",
					"propertyName": "items",
					"values": {
						"id": "SocialSearchResultControlGroup",
						"selectors": {"wrapEl": "#SocialSearchResultControlGroup"},
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"caption": {bindTo: "Resources.Strings.SearchResultContainerCaption"},
						"wrapClass": ["detail"],
						"items": [],
						"tools": []
					}
				}
			]/**SCHEMA_DIFF*/
		};
	});


