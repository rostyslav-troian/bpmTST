Terrasoft.configuration.Structures["AccountContactsDetailV2"] = {innerHierarchyStack: ["AccountContactsDetailV2UIv2", "AccountContactsDetailV2"], structureParent: "BaseGridDetailV2"};
define('AccountContactsDetailV2UIv2Structure', ['AccountContactsDetailV2UIv2Resources'], function(resources) {return {schemaUId:'5b4db5fb-8c63-4429-acaf-815e00b859b8',schemaCaption: "Account contacts detail", parentSchemaName: "BaseGridDetailV2", schemaName:'AccountContactsDetailV2UIv2',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountContactsDetailV2Structure', ['AccountContactsDetailV2Resources'], function(resources) {return {schemaUId:'0ec06a92-0a79-4cc4-ad8c-e1595a4ede2f',schemaCaption: "Account contacts detail", parentSchemaName: "AccountContactsDetailV2UIv2", schemaName:'AccountContactsDetailV2',parentSchemaUId:'5b4db5fb-8c63-4429-acaf-815e00b859b8',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"AccountContactsDetailV2UIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('AccountContactsDetailV2UIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("AccountContactsDetailV2UIv2", ["terrasoft"],
	function(Terrasoft) {
		return {
			entitySchemaName: "Contact",
			methods: {
				/**
				 * ########## ### ####### ### ########## ## #########.
				 * @overridden
				 * @return {String} ### #######.
				 */
				getFilterDefaultColumnName: function() {
					return "Name";
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "DataGrid",
					"values": {
						"type": "listed",
						"listedConfig": {
							"name": "DataGridListedConfig",
							"items": [
								{
									"name": "NameListedGridColumn",
									"bindTo": "Name",
									"position": {
										"column": 0,
										"colSpan": 6
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "JobListedGridColumn",
									"bindTo": "Job",
									"position": {
										"column": 6,
										"colSpan": 6
									}
								},
								{
									"name": "EmailListedGridColumn",
									"bindTo": "Email",
									"position": {
										"column": 12,
										"colSpan": 6
									}
								},
								{
									"name": "MobilePhoneListedGridColumn",
									"bindTo": "MobilePhone",
									"position": {
										"column": 18,
										"colSpan": 6
									}
								}

							]
						},
						"tiledConfig": {
							"name": "DataGridTiledConfig",
							"grid": {
								"columns": 24,
								"rows": 2
							},
							"items": [
								{
									"name": "NameTiledGridColumn",
									"bindTo": "Name",
									"position": {
										"row": 0,
										"column": 0,
										"colSpan": 12
									},
									"type": Terrasoft.GridCellType.TITLE
								},
								{
									"name": "JobTitleTiledGridColumn",
									"bindTo": "JobTitle",
									"position": {
										"row": 0,
										"column": 12,
										"colSpan": 12
									}
								},
								{
									"name": "PhoneTiledGridColumn",
									"bindTo": "Phone",
									"position": {
										"row": 1,
										"column": 0,
										"colSpan": 6
									}
								},
								{
									"name": "MobilePhoneTiledGridColumn",
									"bindTo": "MobilePhone",
									"position": {
										"row": 1,
										"column": 6,
										"colSpan": 6
									}
								},
								{
									"name": "EmailTiledGridColumn",
									"bindTo": "Email",
									"position": {
										"row": 1,
										"column": 12,
										"colSpan": 6
									}
								},
								{
									"name": "HomePhoneTiledGridColumn",
									"bindTo": "HomePhone",
									"position": {
										"row": 1,
										"column": 18,
										"colSpan": 6
									}
								}
							]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);

define("AccountContactsDetailV2", ["MaskHelper", "PortalUserInvitationMixin"],
	function(MaskHelper) {
		return {
			entitySchemaName: "Contact",
			mixins: {
				PortalUserInvitationMixin: "Terrasoft.PortalUserInvitationMixin"
			},
			attributes: {

				"IsOrganizationExists": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			methods: {

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#addRecordOperationsMenuItems
				 * @overridden
				 */
				addRecordOperationsMenuItems: function(toolsButtonMenu) {
					this.callParent(arguments);
					toolsButtonMenu.addItem(this.getButtonMenuSeparator());
					toolsButtonMenu.addItem(this.getAddPortalUserButtonMenuItem());
				},

				/**
				 * Returns an element of combobox list of functional button which is responsible for inviting
				 * contacts on portal.
				 * @protected
				 * @virtual
				 * @return {Terrasoft.BaseViewModel} An element of combobox list of functional button.
				 */
				getAddPortalUserButtonMenuItem: function() {
					return this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.AddPortalUser"},
						Click: {"bindTo": "createUsers"},
						Visible: {"bindTo": "getIsAddPortalUserButtonVisible"},
						Enabled: {"bindTo": "isAnySelected"}
					});
				},

				/**
				 * Gets is add contact on portal button visible.
				 * @returns {boolean} Returns true if PortalUserManagementV2 feature enable.
				 */
				getIsAddPortalUserButtonVisible: function() {
					return this.getIsFeatureEnabled("PortalUserManagementV2");
				},

				/**
				 * @inheritDoc BaseDetailV2#init
				 * @override
				 */
				onRender: function() {
					this.callParent(arguments);
					this.initializeIsOrganizationExists();
				},

				/**
				 * Initializes existence of Organization by Account.
				 * @protected
				 */
				initializeIsOrganizationExists: function() {
					const accountId = this.get("MasterRecordId");
					this.checkOrganization(accountId, function(response) {
						const result = response && response.isPortalAccountExists;
						this.set("IsOrganizationExists", result);
					}, this);
				},

				/**
				 * Creates portal users by contacts and connects them to the organization.
				 */
				createUsers: function () {
					if (this.$IsOrganizationExists) {
						this.createUsersByContactsIds();
					} else {
						this.showOrganizationInformationDialog(this.getAccountInfo());
					}
				},

				/**
				 * Returns account columns values.
				 * @return {Object} Columns values.
				 */
				getAccountInfo: function() {
					return this.sandbox.publish("GetColumnsValues", ["Id", "Name"], [this.sandbox.id]);
				},

				/**
				 * Calls service by invitation contact on portal.
				 */
				createUsersByContactsIds: function() {
					const selectedContactsId = this.getSelectedItems();
					if (this.Ext.isEmpty(selectedContactsId)) {
						return;
					}
					this._showBodyMask();
					this.createUsersByContacts(selectedContactsId, function() {
						this._hideBodyMask();
						this.updatePortalUserInOrganizationDetail();
					}, this);
				},

				/**
				 * Updates PortalUserInOrganization detail after inviting contacts.
				 * @protected
				 */
				updatePortalUserInOrganizationDetail: function () {
					this.sandbox.publish("DetailChanged", null, [this.sandbox.id]);
				},

				/**
				 * Shows a mask on the tag content container.
				 * @private
				 */
				_showBodyMask: function() {
					this._maskId = MaskHelper.showBodyMask();
				},

				/**
				 * Hides a mask on the tag content container.
				 * @private
				 */
				_hideBodyMask: function() {
					MaskHelper.hideBodyMask({ maskId: this._maskId});
				}
			},
			diff: /**SCHEMA_DIFF*/[
			]/**SCHEMA_DIFF*/
		};
	}
);


