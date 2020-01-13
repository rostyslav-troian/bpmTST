Terrasoft.configuration.Structures["ExternalAccessMiniPage"] = {innerHierarchyStack: ["ExternalAccessMiniPage"], structureParent: "BaseMiniPage"};
define('ExternalAccessMiniPageStructure', ['ExternalAccessMiniPageResources'], function(resources) {return {schemaUId:'f084b8b4-9116-4dcd-9ca8-981e32a69680',schemaCaption: "ExternalAccessMiniPage", parentSchemaName: "BaseMiniPage", schemaName:'ExternalAccessMiniPage',parentSchemaUId:'8e06a577-08e4-424e-bd89-798a34e1b928',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ExternalAccessMiniPage", ["ExternalAccessMiniPageResources", "BaseFiltersGenerateModule",
	"css!ExternalAccessMiniPageCSS"],
		function(resources, BaseFiltersGenerateModule) {
	return {
		entitySchemaName: "ExternalAccess",
		attributes: {
			/**
			 * Contains access info label caption with academy url.
			 * @type {String}
			 */
			"AccessInfoCaption": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: resources.localizableStrings.InfoLabelCaption
			},

			/**
			 * Grantor column.
			 * @type {Object}
			 */
			"Grantor": {
				"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				"lookupListConfig": {
					"filter": BaseFiltersGenerateModule.OwnerFilter
				}
			},

			/**
			 * Indicates that user can provide external access on behalf of another user.
			 * @type {Boolean}
			 */
			"CanDelegateExternalAccess": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		properties: {
			/**
			 * @private
			 */
			_contextHelpId: 2016
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			/**
			 * @private
			 */
			_checkRequiredSettings: function() {
				Terrasoft.SysSettings.querySysSettings(["IdentityServerUrl", "IdentityServerClientId",
						"DefaultExternalAccessClientId"], function(sysSettings) {
					const emptySettings = Terrasoft.filterObjectList(sysSettings, function(value, key) {
						return Terrasoft.isEmpty(value);
					}, this);
					const emptySettingsCodes = Terrasoft.keys(emptySettings);
					if (emptySettingsCodes.length > 0) {
						const template = resources.localizableStrings.EmptySettingsMessage;
						const message = Ext.String.format(template, emptySettingsCodes.join(", "));
						Terrasoft.utils.showMessage({
							caption: message,
							handler: function() {
								this.close();
							},
							buttons: [Terrasoft.MessageBoxButtons.OK.returnCode],
							defaultButton: 0,
							scope: this
						});
					}
				}, this);
			},
			/**
			 * @private
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			_setupAcademyUrl: function(callback, scope) {
				Terrasoft.AcademyUtilities.getUrl({
					contextHelpId: this._contextHelpId,
					scope: this,
					callback: function(url) {
						const template = resources.localizableStrings.InfoLabelCaption;
						this.$AccessInfoCaption = Ext.String.format(template, url);
						Ext.callback(callback, scope);
					}
				});
			},
			/**
			 * @inheritdoc Terrasoft.BaseMiniPage#init
			 * @override
			 */
			init: function(callback, scope) {
				this.callParent([
					function() {
						this.checkCanExecuteOperation("CanDelegateExternalAccess", function() {
							this._setupAcademyUrl(callback, scope);
						}, this);
					}
				]);
				if (this.$Mode === this.Terrasoft.ConfigurationEnums.CardOperation.ADD) {
					this._checkRequiredSettings();
					const currentDate = Terrasoft.clearTime(new Date());
					this.$DueDate = Terrasoft.addDays(currentDate, 3);
				}
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "MiniPage",
				"values": {
					"classes": {
						"wrapClassName": ["external-access-mini-page-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderColumnContainer",
				"values": {
					"itemType": 6,
					"caption": {
						"bindTo": "getPrimaryDisplayColumnValue"
					},
					"labelClass": [
						"label-in-header-container"
					],
					"visible": {
						"bindTo": "isNotAddMode"
					}
				},
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "AccessInfoContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "MiniPage"
					},
					"wrapClass": ["info-label", "t-label"]
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "AccessInfo",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.HtmlControl",
					"htmlContent": {"bindTo": "AccessInfoCaption"}
				},
				"parentName": "AccessInfoContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "AccessReason",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "AccessReason"
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "DueDate",
				"values": {
					"layout": {
						"column": 0,
						"row": 3,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"caption": {"bindTo": "Resources.Strings.DueDateCaption"},
					"tip": {
						"content": {"bindTo": "Resources.Strings.DueDateTip"}
					}
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "Grantor",
				"values": {
					"layout": {
						"column": 12,
						"row": 3,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"enabled": {
						"bindTo": "CanDelegateExternalAccess"
					}
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "IsDataIsolationEnabled",
				"values": {
					"layout": {
						"column": 0,
						"row": 4,
						"layoutName": "MiniPage"
					},
					"classes": {
						"wrapClassName": ["single-row-boolean-wrap"]
					},
					"isMiniPageModelItem": true,
					"tip": {
						"content": {"bindTo": "Resources.Strings.IsDataIsolationEnabledTip"}
					}
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "IsSystemOperationsRestricted",
				"values": {
					"layout": {
						"column": 12,
						"row": 4,
						"layoutName": "MiniPage"
					},
					"classes": {
						"wrapClassName": ["single-row-boolean-wrap"]
					},
					"isMiniPageModelItem": true,
					"tip": {
						"content": {"bindTo": "Resources.Strings.IsSystemOperationsRestrictedTip"}
					}
				},
				"parentName": "MiniPage",
				"propertyName": "items"
			}
		]/**SCHEMA_DIFF*/
	};
});


