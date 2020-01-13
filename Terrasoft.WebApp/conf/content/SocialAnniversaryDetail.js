Terrasoft.configuration.Structures["SocialAnniversaryDetail"] = {innerHierarchyStack: ["SocialAnniversaryDetailSocialNetworkIntegration", "SocialAnniversaryDetail"], structureParent: "BaseAnniversaryDetailV2"};
define('SocialAnniversaryDetailSocialNetworkIntegrationStructure', ['SocialAnniversaryDetailSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'a411344d-4e1a-4b57-9e48-f4d242b3ea73',schemaCaption: "Base detail - Population of noteworthy events", parentSchemaName: "BaseAnniversaryDetailV2", schemaName:'SocialAnniversaryDetailSocialNetworkIntegration',parentSchemaUId:'16c044af-7997-4644-a186-c00904d66f11',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAnniversaryDetailStructure', ['SocialAnniversaryDetailResources'], function(resources) {return {schemaUId:'aebb37b2-174c-4107-abad-caf0a653cdde',schemaCaption: "Base detail - Population of noteworthy events", parentSchemaName: "SocialAnniversaryDetailSocialNetworkIntegration", schemaName:'SocialAnniversaryDetail',parentSchemaUId:'a411344d-4e1a-4b57-9e48-f4d242b3ea73',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SocialAnniversaryDetailSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialAnniversaryDetailSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SocialAnniversaryDetailSocialNetworkIntegration", ["ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities",
		"SocialGridDetailUtilities"], function() {
	return {
		messages: {
			/**
			 * ######### # ############# ######### ###### ## ########## #####.
			 */
			"GetSocialNetworkData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * ########## ## ######### ######## ###### ## ########## #####.
			 */
			"SocialNetworkDataLoaded": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message SaveDetail
			 * ########## ########## ######.
			 */
			"SaveDetail": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message DetailValidated
			 * ########## ######### ##########.
			 */
			"DetailSaved": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * @message ValidateDetail
			 * ########## ############# ############### ######## ######.
			 */
			"ValidateDetail": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message DetailValidated
			 * ########## ######### ######### ######.
			 */
			"DetailValidated": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		/**
		 * ######-####### (#######), ########### ################ ####### #####.
		 */
		mixins: {
			/**
			 * @class ConfigurationGridUtilities ########### ####### ###### ############## #######.
			 */
			ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities",

			/**
			 * @class SocialGridDetailUtilities ########### ####### ###### ###### ########## ## ###. ####.
			 * # ############# ########.
			 */
			SocialGridDetailUtilities: "Terrasoft.SocialGridDetailUtilities"
		},
		attributes: {
			/*
			 * ####### ######### ############## #######.
			 */
			IsEditable: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},

			/*
			 * ####### ######### ############## ######.
			 */
			MultiSelect: {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			UseGeneratedProfile: {
				value: false
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#subscribeSandboxEvents
			 * @override
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("SaveDetail", this.save, this, [this.sandbox.id]);
				this.sandbox.subscribe("ValidateDetail", this.validateDetail, this, [this.sandbox.id]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseAnniversaryDetailV2#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initSocialDetail();
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#getToolsVisible
			 * @overridden
			 */
			getToolsVisible: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#getIsRowChanged
			 * @overridden
			 */
			getIsRowChanged: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onGridDataLoaded
			 * @overridden
			 */
			onGridDataLoaded: function() {
				this.callParent(arguments);
				var socialNetworkData = this.sandbox.publish("GetSocialNetworkData");
				if (!socialNetworkData) {
					this.sandbox.subscribe("SocialNetworkDataLoaded", this.onSocialNetworkDataLoaded, this);
				} else {
					this.onSocialNetworkDataLoaded(socialNetworkData);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseDetailV2#initData
			 * @override
			 */
			initData: function(callback, scope) {
				this.callParent([function() {
					Ext.callback(callback, scope || this);
					this.setSelectedRows();
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilities#onAfterRender
			 * @override
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.setSelectedRows();
			},

			/**
			 * Selects all loaded rows when MultiSelect is true and grid rendered.
			 * @protected
			 */
			setSelectedRows: function() {
				if (this.get("MultiSelect") && this.getIsCurrentGridRendered()) {
					var items = this.getGridData();
					this.selectRows(items);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
			 * @overridden
			 */
			initDetailOptions: function() {
				this.callParent(arguments);
				this.set("IsDetailCollapsed", false);
			},

			/**
			 * @inheritdoc Terrasoft.ConfigurationGridUtilities#initActiveRowKeyMap
			 * @overridden
			 */
			initActiveRowKeyMap: Terrasoft.emptyFn

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"className": "Terrasoft.ConfigurationGrid",
					"generator": "ConfigurationGridGenerator.generatePartial",
					"generateControlsConfig": {bindTo: "generateActiveRowControlsConfig"},
					"changeRow": {bindTo: "changeRow"},
					"unSelectRow": {bindTo: "unSelectRow"},
					"onGridClick": {bindTo: "onGridClick"},
					"initActiveRowKeyMap": {bindTo: "initActiveRowKeyMap"},
					"activeRowAction": {bindTo: "onActiveRowAction"},
					"activeRowActions": [],
					"rowDataItemMarkerColumnName": "Date"
				}
			},
			{
				"operation": "insert",
				"name": "DataGridActiveRowSaveAction",
				"parentName": "DataGrid",
				"propertyName": "activeRowActions",
				"values": {
					"className": "Terrasoft.Button",
					"tag": "save",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"markerValue": "save",
					"imageConfig": {"bindTo": "Resources.Images.SaveIcon"}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("SocialAnniversaryDetail", [], function() {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.SocialAnniversaryDetail#createSocialEntityDataRows
			 * @overridden
			 */
			createSocialEntityDataRows: function(config) {
				if (!config) {
					return;
				}
				var socialNetworkData = config.socialNetworkData;
				if (this.Ext.isEmpty(socialNetworkData)) {
					return;
				}
				var collection = this.Ext.create("Terrasoft.Collection");
				this.addFoundedInformation(collection, socialNetworkData);
				config.callback.call(config.scope || this, collection);
			},

			/**
			 * ######### ########## # ############## ######## ## ######## ####### # #########, ####### ##### #########
			 * ######.
			 * @protected
			 * @param {Terrasoft.Collection} collection #########.
			 * @param {Array} entities ########## # ######### ## ######## #######.
			 */
			addFoundedInformation: function(collection, entities) {
				this.Terrasoft.each(entities, function(entity) {
					var founded = entity.founded;
					if (!founded) {
						return;
					}
					var date = new Date(founded);
					if (isNaN(date.getDate())) {
						return;
					}
					collection.add({
						Date: date
					});
				}, this);
			}

		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});


