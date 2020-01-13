Terrasoft.configuration.Structures["ProductCatalogueFolderManager"] = {innerHierarchyStack: ["ProductCatalogueFolderManager"]};
define('ProductCatalogueFolderManagerStructure', ['ProductCatalogueFolderManagerResources'], function(resources) {return {schemaUId:'5fe8fc8d-34a7-4683-b651-61212cbc8bfb',schemaCaption: "FolderManager module for product catalogue", parentSchemaName: "", schemaName:'ProductCatalogueFolderManager',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ProductCatalogueFolderManager", ["BaseFolderManager", "ProductCatalogueFolderManagerViewModelConfigGenerator",
	"ProductCatalogueFolderManagerViewModel", "css!ProductCatalogueFolderManager"
], function() {
	return Ext.define("Terrasoft.configuration.ProductCatalogueFolderManager", {
		alternateClassName: "Terrasoft.ProductCatalogueFolderManager",
		extend: "Terrasoft.BaseFolderManager",

		messages: {
			/**
			 * @message FolderInfo
			 * Requests configuration for group module initialization.
			 */
			"FolderInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message AddFolderActionFired
			 * Triggers, when new folder group added.
			 */

			"AddFolderActionFired": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateFavoritesMenu
			 * Triggers on "Favorites" menu update.
			 */
			"UpdateFavoritesMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ResultSelectedFolders
			 * Requests selected folder groups.
			 */
			"ResultSelectedFolders": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message BackHistoryState
			 * Back history state message.
			 */
			"BackHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message PushHistoryState
			 * Push history state message.
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CustomFilterExtendedMode
			 * Triggers, when user filtration type has been changed.
			 */
			"CustomFilterExtendedMode": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateCustomFilterMenu
			 * Triggers, when user filtration menu has been updated.
			 */
			"UpdateCustomFilterMenu": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message GetRecordInfo
			 * Get record info message.
			 */
			"GetRecordInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetHistoryState
			 * Get current history state message.
			 */
			"GetHistoryState": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message HideFolderTree
			 * Triggers when folder tree has been hidden.
			 */
			"HideFolderTree": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ResultFolderFilter
			 * Requests result folder filter collection.
			 */
			"ResultFolderFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message UpdateFilter
			 * Applies folder group filters.
			 */
			"UpdateFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message LookupInfo
			 * Allows to work with lookup module.
			 */
			"LookupInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ResultSelectedRows
			 * Gets selected groups.
			 */
			"ResultSelectedRows": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateCatalogueFilter
			 * Applies catalogue filters.
			 */
			"UpdateCatalogueFilter": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message CloseExtendCatalogueFilter
			 * Triggers on extended filtration module closure.
			 */
			"CloseExtendCatalogueFilter": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetExtendCatalogueFilterInfo
			 * Gets config for extended filtration module.
			 */
			"GetExtendCatalogueFilterInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message UpdateExtendCatalogueFilter
			 * Applies extended filtration module filters.
			 */
			"UpdateExtendCatalogueFilter": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message GetSectionFilterModuleId
			 * UpdateFilter subscription.
			 */
			"GetSectionFilterModuleId": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},

		init: function() {
			this.sandbox.registerMessages(this.messages);
			this.callParent(arguments);
		}
	});
});


