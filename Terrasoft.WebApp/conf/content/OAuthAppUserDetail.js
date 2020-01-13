Terrasoft.configuration.Structures["OAuthAppUserDetail"] = {innerHierarchyStack: ["OAuthAppUserDetail"], structureParent: "BaseGridDetailV2"};
define('OAuthAppUserDetailStructure', ['OAuthAppUserDetailResources'], function(resources) {return {schemaUId:'c2f6e040-633b-43f7-811f-263ffb2054b2',schemaCaption: "Detail scheme: \"Users\"", parentSchemaName: "BaseGridDetailV2", schemaName:'OAuthAppUserDetail',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("OAuthAppUserDetail", [
	"ServiceOAuthAuthenticatorEndpointHelper", "OAuthAppUserDetailResources", "AcademyUtilities", "OAuth20Utilities"
], function() {
	return {
		entitySchemaName: "VwOAuthAppUser",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		properties: {
			_academyUrl: null
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "AddRecordButton"
			},
			{
				"operation": "insert",
				"name": "TooltipInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "$Resources.Strings.LoginActionCaption",
					"click": "$onLoginOAuthApp"
				},
				"parentName": "Detail",
				"propertyName": "tools",
				"index": 1
			}
		]/**SCHEMA_DIFF*/,
		messages: {
			"SaveRecord": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		methods: {

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#addGridDataColumns
			 * @overridden
			 */
			addGridDataColumns: function(esq) {
				this.callParent(arguments);
				esq.addColumn("SysUser");
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#initToolsButtonMenu
			 * @overridden
			 */
			initToolsButtonMenu: function() {
				this.callParent(arguments);
				var toolsButtonMenu = this.get("ToolsButtonMenu");
				toolsButtonMenu.clear();
				toolsButtonMenu.addItem(this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
					Click: "$onRemoveOAuthAppUser",
					Enabled: "$isAnySelected"
				}));
			},

			// endregion

			// region Methods: Public

			/**
			 * Removes OAuth app user.
			 * @public
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			onRemoveOAuthAppUser: function(callback, scope) {
				const activeRow = this.getActiveRow();
				Terrasoft.ServiceOAuthAuthenticatorEndpointHelper.removeOAuthUser(
						activeRow.$SysUser.value,
						this.$MasterRecordId,
						function(success) {
							if (!success) {
								this.showInformationDialog(this.get("Resources.Strings.LoginCallbackFailed"));
							}
							this.reloadGridData();
							Ext.callback(callback, scope);
						}, this);
			},

			/**
			 * Makes request to OAuth login service and opens token retreive url.
			 * @public
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			onLoginOAuthApp: function(callback, scope) {
				Terrasoft.OAuth20Utilities.canLoginOAuthUser(
						Terrasoft.SysValue.CURRENT_USER.value,
						this.$MasterRecordId,
						function(canLogin) {
							if (canLogin) {
								this.sandbox.publish("SaveRecord", {
									isSilent: true,
									callback: function() {
										Terrasoft.ServiceOAuthAuthenticatorEndpointHelper.getAuthorizationGrantUrl(
												this.$MasterRecordId,
												function(success, url) {
													if (success) {
														if (url) {
															window.open(url);
														}
													} else {
														this.showInformationDialog(
															this.get("Resources.Strings.LoginCallbackFailed"));
													}
													Ext.callback(callback, scope);
												}, this);
									},
									callBaseSilentSavedActions: true,
									scope: this
								}, [this.sandbox.id]);
							} else {
								this.showInformationDialog(this.get("Resources.Strings.UserAlreadyAuthorized"));
								Ext.callback(callback, scope);
							}
						}, this);
			}

			// endregion

		}
	};
});


