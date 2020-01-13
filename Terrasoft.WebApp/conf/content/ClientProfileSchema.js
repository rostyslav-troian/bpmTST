Terrasoft.configuration.Structures["ClientProfileSchema"] = {innerHierarchyStack: ["ClientProfileSchema"], structureParent: "BaseMultipleProfileSchema"};
define('ClientProfileSchemaStructure', ['ClientProfileSchemaResources'], function(resources) {return {schemaUId:'a3f04ac9-2e6c-473a-b037-d2ef016001e8',schemaCaption: "Client profile", parentSchemaName: "BaseMultipleProfileSchema", schemaName:'ClientProfileSchema',parentSchemaUId:'9609ce0b-4904-45af-95b7-ce2be50af945',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ClientProfileSchema", ["ProfileSchemaMixin"],
		function() {
			return {
				mixins: {
					ProfileSchemaMixin: "Terrasoft.ProfileSchemaMixin"
				},
				attributes: {
					/**
					 * Visibility tag contact profile.
					 * @type {Boolean}
					 */
					"IsVisibleContactProfile": {
						dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
						value: true
					}
				},
				methods: {
					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#getProfileModuleContainerDataMarker
					 * @overridden
					 */
					getProfileModuleContainerDataMarker: function() {
						return "client-profile-module-container";
					},

					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#getBlankSlateHeaderCaption
					 * @overridden
					 */
					getBlankSlateHeaderCaption: function() {
						return this.get("Resources.Strings.Client");
					},

					/**
					 * Returns warning icon url.
					 * @return {String} Warning icon url.
					 */
					getWarningIcon: function() {
						return this.getImageUrlByResourceKey("Resources.Images.WarningIcon");
					},

					/**
					 * Returns visibility tag for warning.
					 * @return {Boolean} Visibility tag.
					 */
					getIsVisibleWarning: function() {
						var masterColumnNames = this.get("MasterColumnNames");
						if (!masterColumnNames) {
							return false;
						}
						var masterColumnValues = masterColumnNames.filter(function(columnName) {
							var value = this.get(columnName);
							return !this.Ext.isEmpty(value);
						}, this);
						return masterColumnValues.length > 1;
					},

					/**
					 * @inheritdoc Terrasoft.BaseMultipleProfileSchema#onProfileColumnChanged
					 * @overridden
					 */
					onProfileColumnChanged: function() {
						this.set("IsVisibleContactProfile", !this.getIsVisibleWarning());
						return this.callParent(arguments);
					},

					/**
					 * @inheritdoc Terrasoft.BaseMultipleProfileSchema#onColumnChanged
					 * @overridden
					 */
					onColumnChanged: function() {
						this.callParent(arguments);
						this.set("IsVisibleContactProfile", !this.getIsVisibleWarning());
					},

					/**
					 * @inheritdoc Terrasoft.BaseProfileSchema#getClearButtonHint
					 * @overridden
					 */
					getClearButtonHint: function() {
						var clearActionCaption = this.get("Resources.Strings.ClearButtonCaption");
						var masterColumnCaption = this.get("Resources.Strings.Client");
						return this.Ext.String.format("{0} {1}", clearActionCaption, masterColumnCaption);
					}

				},
				modules: /**SCHEMA_MODULES*/{
					"AccountClientProfile": {
						"config": {
							"schemaName": "ClientAccountProfileSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									masterColumnName: "Account"
								}
							}
						}
					},
					"ContactClientProfile": {
						"config": {
							"schemaName": "ClientContactProfileSchema",
							"isSchemaConfigInitialized": true,
							"useHistoryState": false,
							"parameters": {
								"viewModelConfig": {
									masterColumnName: "Contact"
								}
							}
						}
					}
				}/**SCHEMA_MODULES*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "ProfileIcon"
					},
					{
						"operation": "remove",
						"name": "ProfileHeaderContainer"
					},
					{
						"operation": "merge",
						"name": "ProfileModuleContainer",
						"values": {
							"wrapClass": ["profile-module-container", "client-profile"]
						}
					},
					{
						"operation": "insert",
						"name": "ClientProfilesContainer",
						"parentName": "ProfileContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"layout": {
								"column": 0,
								"row": 0,
								"colSpan": 24,
								"rowSpan": 24
							}
						}
					},
					{
						"operation": "insert",
						"name": "WarningIcon",
						"parentName": "ClientProfilesContainer",
						"propertyName": "items",
						index: 0,
						"values": {
							"getSrcMethod": "getWarningIcon",
							"readonly": true,
							"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
							"visible": {"bindTo": "getIsVisibleWarning"},
							"classes": {
								"wrapClass": ["warning-icon"]
							},
							"hint": {"bindTo": "Resources.Strings.WarningMessage"}
						}
					},
					{
						"operation": "insert",
						"parentName": "ClientProfilesContainer",
						"propertyName": "items",
						"name": "AccountClientProfile",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.MODULE
						}
					},
					{
						"operation": "insert",
						"parentName": "ClientProfilesContainer",
						"propertyName": "items",
						"name": "ContactClientProfile",
						"values": {
							"itemType": this.Terrasoft.ViewItemType.MODULE,
							"visible": {"bindTo": "IsVisibleContactProfile"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		}
);


