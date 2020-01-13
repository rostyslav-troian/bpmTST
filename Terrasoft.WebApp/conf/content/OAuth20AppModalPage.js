Terrasoft.configuration.Structures["OAuth20AppModalPage"] = {innerHierarchyStack: ["OAuth20AppModalPage"], structureParent: "OAuth20AppPage"};
define('OAuth20AppModalPageStructure', ['OAuth20AppModalPageResources'], function(resources) {return {schemaUId:'5734b216-ddfe-426c-8278-c018388947a8',schemaCaption: "OAuth20AppModalPage", parentSchemaName: "OAuth20AppPage", schemaName:'OAuth20AppModalPage',parentSchemaUId:'6d268e74-605a-4222-a503-15e27acb5fd2',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuth20AppModalPage", function() {
	return {
		messages: {
			/**
			 * @message CloseOAuth20AppPage
			 * Close application page.
			 */
			"CloseOAuth20AppPage": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_close: function() {
				const isEdit = this.$Operation === Terrasoft.ConfigurationEnums.CardOperation.EDIT;
				this.sandbox.publish("CloseOAuth20AppPage", isEdit ? this.$Id : null);
				Terrasoft.utils.dom.setAttributeToBody("hide-scroll", false);
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getPageHeaderCaption
			 * @overridden
			 */
			getPageHeaderCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#updatePageHeaderCaption
			 * @overridden
			 */
			updatePageHeaderCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#clearPageHeaderCaption
			 * @overridden
			 */
			clearPageHeaderCaption: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initHeader
			 * @overridden
			 */
			initHeader: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#resetBodyAttributes
			 * @overridden
			 */
			resetBodyAttributes: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#initRunProcessButtonMenu
			 * @overridden
			 */
			initRunProcessButtonMenu: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseEntityPage#getDefaultValues
			 * @override
			 */
			getDefaultValues: function() {
				return [];
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @override
			 */
			onSaved: function(response, config) {
				this.callParent(arguments);
				if (!(config && config.isSilent)) {
					this._close();
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @override
			 */
			onDiscardChangesClick: function() {
				this._close();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @override
			 */
			onCloseClick: function() {
				this._close();
			},

			/**
			 * @inheritDoc Terrasoft.BaseViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.set("DefaultTabName", "OAuthSettingsTab");
				Terrasoft.utils.dom.setAttributeToBody("hide-scroll", true);
				this.$IsActionDashboardContainerVisible = false;
				this.callParent(arguments);
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "OAuthAppPageWrapper",
				"values": {
					"id": "OAuthAppPageWrapper",
					"selectors": {"wrapEl": "#OAuthAppPageWrapper"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["card-content-container", "oauth20-header-container"],
					"items": []
				},
				index: 0
			},
			{
				"operation": "insert",
				"name": "OAuthAppPageContentContainer",
				"parentName": "OAuthAppPageWrapper",
				"propertyName": "items",
				"values": {
					"id": "OAuthPageContentContainer",
					"selectors": {"wrapEl": "#OAuthPageContentContainer"},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["web-service-method-page-center-main-container", "center-main-container"],
					"items": [],
					"markerValue": "CenterMainContainer"
				}
			},
			{
				"operation": "insert",
				"name": "ActionContainer",
				"parentName": "OAuthAppPageContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["web-service-method-action-container"],
					"items": []
				},
				index: 0
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "OKButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"visible": {"bindTo": "ShowSaveButton"},
					"click": {"bindTo": "save"},
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"tag": "ok",
					"markerValue": "ok"
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "DiscardChangesButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.CancelButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "onDiscardChangesClick"},
					"visible": {"bindTo": "ShowDiscardButton"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "CloseButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "onCloseClick"},
					"visible": {"bindTo": "ShowCloseButton"}
				}
			},
			{
				"operation": "insert",
				"parentName": "ActionContainer",
				"propertyName": "items",
				"name": "CloseIcon",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.CloseIcon"},
					"classes": {"wrapperClass": ["web-service-method-page-close-btn"]},
					"click": {"bindTo": "onDiscardChangesClick"}
				}
			},
			{
				"operation": "merge",
				"name": "CardContentWrapper",
				"values": {
					"id": "CardContentWrapperModalPage",
					"selectors": {"wrapEl": "#CardContentWrapperModalPage"},
					"wrapClass": ["card-content-container", "oauth20app-card-content-wrapper"]
				}
			},
			{
				"operation": "merge",
				"name": "CardContentContainer",
				"values": {
					"selectors": {"wrapEl": "#CardContentContainerModalPage"},
					"id": "CardContentContainerModalPage"
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


