Terrasoft.configuration.Structures["SetRightsInfoSchema"] = {innerHierarchyStack: ["SetRightsInfoSchema"]};
define('SetRightsInfoSchemaStructure', ['SetRightsInfoSchemaResources'], function(resources) {return {schemaUId:'1a1e4342-7f93-415d-a442-a1de53a32c3d',schemaCaption: "SetRightsInfoSchema", parentSchemaName: "", schemaName:'SetRightsInfoSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("SetRightsInfoSchema", ["SetRightsInfoSchemaResources", "SectionServiceMixin", "MultilineLabel"],
	function() {
		return {
			attributes: {
				/**
				 * Entities with rights errors collection.
				 * @type {Terrasoft.Collection}
				 */
				"EntitiesList": {
					"dataValueType": Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Parent detail sandbox identifier.
				 * @type {String}
				 */
				"DetailId": {
					"dataValueType": Terrasoft.DataValueType.TEXT
				}
			},
			messages: {
				/**
				 * @message UpdateDetail
				 * Updates detail content.
				 */
				"UpdateDetail": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message HideRightsErrorTip
				 * Hides rights errors tip.
				 */
				"HideRightsErrorTip": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				/**
				 * @class SectionServiceMixin
				 * Section service mixin.
				 */
				SectionServiceMixin: Terrasoft.SectionServiceMixin
			},
			methods: {

				//region Methods: Protected

				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					this.callParent([function() {
						this.initEntitiesList(callback, scope);
					}, this]);
				},

				/**
				 * Initializes entities with rights errors list.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				initEntitiesList: function(callback, scope) {
					var sysModule = this.$SysModule;
					if (Ext.isEmpty(sysModule)) {
						return Ext.callback(callback, scope || this);
					}
					this.getEntitiesWithRightsErrors(sysModule.value, function(errors) {
						this.$EntitiesList = errors || [];
						Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Returns string value of entities with rights errors list.
				 * @protected
				 * @return {String} String value of entities with rights errors list.
				 */
				getEntitiesNamesString: function() {
					var result = "";
					var collection = this.$EntitiesList;
					if (Ext.isEmpty(collection)) {
						return result;
					}
					collection.forEach(function(item) {
						result += "- " + item + "<br/>";
					}, this);
					return result;
				},

				/**
				 * Calls fix rights errors for current section.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				fixRightForSection: function(callback, scope) {
					var sysModule = this.$SysModule;
					if (Ext.isEmpty(sysModule)) {
						return;
					}
					this.hideTip();
					const changeRightsConfirmationDialogMessage =
						this.get("Resources.Strings.ChangeRightsConfirmationDialogMessage");
					this.showConfirmationDialog(changeRightsConfirmationDialogMessage, function(returnCode) {
						if (returnCode === Terrasoft.MessageBoxButtons.YES.returnCode) {
							this.updateObjectPermissions(callback, scope);
						}
					}, ["yes", "no"]);
				},

				/**
				 * Updates object permissions.
				 * @protected
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback function scope.
				 */
				updateObjectPermissions: function(callback, scope) {
					const sysModule = this.$SysModule;
					const config = {
						data: {
							"sectionId": sysModule.value
						},
						serviceName: "SectionService",
						methodName: "SetSectionSchemasAdministratedByRecords"
					};
					this.showBodyMask();
					this.callService(config, function(response) {
						this.hideBodyMask();
						this.updateDetail();
						const isErrorOccurred = response.IsErrorOccurred;
						const message = isErrorOccurred
							? this.get("Resources.Strings.ChangeRightsErrorMessage")
							: this.get("Resources.Strings.ChangeRightsSuccessfulMessage");
						this.showConfirmationDialog(message);
						Ext.callback(callback, scope || this);
					}, this);
				},

				/**
				 * Hides rights errors tip.
				 * @protected
				 */
				hideTip: function() {
					var sysModule = this.$SysModule || {};
					this.sandbox.publish("HideRightsErrorTip", null, [sysModule.value]);
				},

				/**
				 * Updates parent detail content.
				 * @protected
				 */
				updateDetail: function() {
					var detailId = this.$DetailId;
					this.sandbox.publish("UpdateDetail", {
						reloadAll: true
					}, [detailId]);
				}, 

				/**
				 * Returns fix rights errors button marker value.
				 * @protected
				 * @return {String} Fix rights errors button marker value.
				 */
				getActionButtonClick: function() {
					var sysModule = this.$SysModule || {};
					return Ext.String.format("Action {0}", sysModule.displayValue);
				}

				//endregion
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "Header",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "Resources.Strings.Header"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "EntitiesList",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"className": "Terrasoft.MultilineLabel",
						"caption": {bindTo: "getEntitiesNamesString"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "ActionDescription",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "Resources.Strings.ActionDescription"},
						"classes": {
							"labelClass": ["rights-error-action"]
						}

					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "Action",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"click": {"bindTo": "fixRightForSection"},
						"caption": {bindTo: "Resources.Strings.ActionCaption"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"markerValue": {"bindTo": "getActionButtonClick"},
						"classes": {
							"textClass": [
								"change-rights-button"
							]
						}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"name": "Footer",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "Resources.Strings.Footer"},
						"classes": {
							"labelClass": ["rights-error-footer"]
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
});


