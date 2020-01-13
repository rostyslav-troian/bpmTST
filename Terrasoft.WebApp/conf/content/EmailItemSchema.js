Terrasoft.configuration.Structures["EmailItemSchema"] = {innerHierarchyStack: ["EmailItemSchemaUIv2", "EmailItemSchemaEmailMining", "EmailItemSchemaInvoice", "EmailItemSchemaOrder", "EmailItemSchemaDocument", "EmailItemSchemaCoreLead", "EmailItemSchemaOpportunity", "EmailItemSchemaOrderInSales", "EmailItemSchemaOpportunityInvoice", "EmailItemSchema"]};
define('EmailItemSchemaUIv2Structure', ['EmailItemSchemaUIv2Resources'], function(resources) {return {schemaUId:'065ad788-5a49-45fe-830e-da317f15489b',schemaCaption: "EmailItemSchema", parentSchemaName: "", schemaName:'EmailItemSchemaUIv2',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaEmailMiningStructure', ['EmailItemSchemaEmailMiningResources'], function(resources) {return {schemaUId:'b538bb37-88da-46c8-a9dd-6eaa8d317aaf',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaUIv2", schemaName:'EmailItemSchemaEmailMining',parentSchemaUId:'065ad788-5a49-45fe-830e-da317f15489b',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaUIv2",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaInvoiceStructure', ['EmailItemSchemaInvoiceResources'], function(resources) {return {schemaUId:'65c6b564-7156-431f-9e69-ad7fca81d267',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaEmailMining", schemaName:'EmailItemSchemaInvoice',parentSchemaUId:'b538bb37-88da-46c8-a9dd-6eaa8d317aaf',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaEmailMining",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaOrderStructure', ['EmailItemSchemaOrderResources'], function(resources) {return {schemaUId:'682d11e5-3d5d-4c9e-affa-9a0715d71f54',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaInvoice", schemaName:'EmailItemSchemaOrder',parentSchemaUId:'65c6b564-7156-431f-9e69-ad7fca81d267',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaDocumentStructure', ['EmailItemSchemaDocumentResources'], function(resources) {return {schemaUId:'4032f0f1-1935-4882-a73c-653c607a854a',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaOrder", schemaName:'EmailItemSchemaDocument',parentSchemaUId:'682d11e5-3d5d-4c9e-affa-9a0715d71f54',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaOrder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaCoreLeadStructure', ['EmailItemSchemaCoreLeadResources'], function(resources) {return {schemaUId:'468f4c8d-3a97-4155-a6dd-145e865ccd4d',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaDocument", schemaName:'EmailItemSchemaCoreLead',parentSchemaUId:'4032f0f1-1935-4882-a73c-653c607a854a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaDocument",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaOpportunityStructure', ['EmailItemSchemaOpportunityResources'], function(resources) {return {schemaUId:'856e20e1-0590-4709-ad8e-6a4b9f3406eb',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaCoreLead", schemaName:'EmailItemSchemaOpportunity',parentSchemaUId:'468f4c8d-3a97-4155-a6dd-145e865ccd4d',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaCoreLead",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaOrderInSalesStructure', ['EmailItemSchemaOrderInSalesResources'], function(resources) {return {schemaUId:'cdd56823-d9b4-4250-a852-84da97430c9a',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaOpportunity", schemaName:'EmailItemSchemaOrderInSales',parentSchemaUId:'856e20e1-0590-4709-ad8e-6a4b9f3406eb',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaOpportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaOpportunityInvoiceStructure', ['EmailItemSchemaOpportunityInvoiceResources'], function(resources) {return {schemaUId:'ce2fa0c0-3c8f-4cd2-880d-f3bc90750797',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaOrderInSales", schemaName:'EmailItemSchemaOpportunityInvoice',parentSchemaUId:'cdd56823-d9b4-4250-a852-84da97430c9a',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaOrderInSales",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaStructure', ['EmailItemSchemaResources'], function(resources) {return {schemaUId:'a2fcc753-2e75-4510-85d1-8bf753ecb8c1',schemaCaption: "EmailItemSchema", parentSchemaName: "EmailItemSchemaOpportunityInvoice", schemaName:'EmailItemSchema',parentSchemaUId:'ce2fa0c0-3c8f-4cd2-880d-f3bc90750797',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"EmailItemSchemaOpportunityInvoice",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('EmailItemSchemaUIv2Resources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaUIv2", ["EmailItemSchemaResources", "NetworkUtilities", "FormatUtils",
		"EmailConstants", "ConfigurationEnums", "ConfigurationConstants", "ProcessModuleUtilities", "RightUtilities",
		"BusinessRuleModule", "EmailUtilitiesV2", "LookupQuickAddMixin", "EntityConnectionLinksPanelItemUtilities",
		"EntityConnectionLinksUtilities", "EmailRelationsMixin"],
	function(resources, NetworkUtilities, FormatUtils, EmailConstants, ConfigurationEnums,
			ConfigurationConstants, ProcessModuleUtilities, RightUtilities, BusinessRuleModule, EmailUtilities) {
		return {
			entitySchemaName: EmailConstants.entitySchemaName,
			mixins: {
				/**
				 * @class LookupQuickAddMixin provides adding new record from lookup.
				 */
				LookupQuickAddMixin: "Terrasoft.LookupQuickAddMixin",

				/**
				 * @class EntityConnectionLinksPanelItemUtilities Entity connection panel item mixin.
				 */
				EntityConnectionLinksPanelItemUtilities: "Terrasoft.EntityConnectionLinksPanelItemUtilities",

				/**
				 * @class Terrasoft.EntityConnectionLinksUtilities
				 * Mixin for obtain entity connection lookup columns.
				 */
				EntityConnectionLinksUtilities: Terrasoft.EntityConnectionLinksUtilities,

				/**
				 * @class Terrasoft.EmailRelationsMixin
				 * Email relations mixin.
				 */
				EmailRelationsMixin: Terrasoft.EmailRelationsMixin
			},
			messages: {

				/**
				 * @message PushHistoryState
				 * Set next history state message.
				 */
				"PushHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetHistoryState
				 * Get current history state message.
				 */
				"GetHistoryState": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message BackHistoryState
				 * Reverts history state message.
				 */
				"BackHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message ReloadCard
				 * Reload page data message.
				 */
				"ReloadCard": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ShowRelatedEmails
				 * Loads related emails to email panel.
				 */
				"ShowRelatedEmails": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.BIDIRECTIONAL
				}
			},
			attributes: {

				/**
				 * Mask element selector.
				 * @type {String}
				 */
				"MaskSelector": {
					datavalueType: Terrasoft.DataValueType.TEXT,
					value: ".right-panel-modules-container"
				},

				/**
				 * Email title.
				 * @type {String}
				 */
				"MailTitleText": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},

				/**
				 * Sender name and address parse regexp.
				 * @type {String}
				 */
				"SenderInfoRegExp": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "(.+) <(.+)>"
				},

				/**
				 * Action button menu items.
				 * @Type {Terrasoft.BaseViewModelCollection}
				 */
				"ActionsMenuCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION
				},

				/**
				 * Avaliable emails process list.
				 * @Type {Array}
				 */
				"ProcessParametersArray": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Email relations columns list.
				 * @Type {Array}
				 */
				"EntityConnectionColumnList": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Default email relations columns list.
				 * @Type {Array}
				 */
				"DefaultEntityConnectionColumns": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * ####### ######### ########### ####.
				 */
				"IsLookupVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * ############ ####### ####### #####.
				 */
				"CurrentColumnName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},

				/**
				 * ######## # ####### ####### #####.
				 */
				"CurrentColumnValue": {
					dataValueType: Terrasoft.DataValueType.VIRTUAL_COLUMN,
					isLookup: true
				},

				/**
				 * ###### ######### ######## ### ############## #### #####.
				 */
				"CurrentRelationItemsList": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isCollection: true
				},

				/**
				 * ########## ############ ######## ### ############## #### #####.
				 */
				"CurrentRelationRowCount": {
					dataValueType: this.Terrasoft.DataValueType.INTEGER,
					value: 5
				},

				/**
				 * #######, ######### ### ########### ######.
				 */
				"SenderContact": {
					dataValueType: Terrasoft.DataValueType.LOOKUP
				},

				/**
				 * #######, #################### ## ########.
				 */
				"IsEntityInitialized": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Flag, is short contact exists.
				 */
				"IsShortContact": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * ####### ########### #### ########## ##### #####.
				 */
				"IsAddNewRelationVisible": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					value: true
				},

				/**
				 * Sender name.
				 */
				"SenderName": {
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				/**
				 * Short sender name.
				 */
				"ShortSenderName": {
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				/**
				 * ##### ###########.
				 */
				"SenderEmail": {
					dataValueType: Terrasoft.DataValueType.TEXT
				},

				/**
				 * ####### ####### ######## ###########.
				 */
				"HasContact": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * Is need reload item in panel.
				 */
				"IsNeedReload": {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN
				},

				/**
				 * Email sender contact.
				 */
				"EmailAuthor": {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					dependencies: [
						{
							columns: ["Author", "SenderContact"],
							methodName: "setEmailAuthor"
						}
					]
				},

				/**
				 * Email entity relation column name.
				 */
				"EntityRelationColumnName": {
					dataValueType: this.Terrasoft.DataValueType.TEXT
				},

				/**
				 * Avaliable mailboxes unique identifiers array.
				 * @Type {Array}
				 */
				"Mailboxes": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT
				}
			},
			methods: {

				/**
				 * Initializes starter values.
				 * @protected
				 * @overridden
				 */
				init: function() {
					this.initParameters();
					this.initActionsMenuCollection();
					this.initSenderInfo();
					this.subscribeSandboxEvents();
					this.isNew = false;
					this.addEvents(
						/**
						 * @event
						 * Email item deleted event.
						 * @param {Object} viewModel Email item view model.
						 */
						"emailDeleted",

						/**
						 * @event
						 * Email item saved event.
						 * @param {Object} viewModel Email item view model.
						 */
						"entitySaved",

						/**
						 * @event
						 * Email item sender contact set event
						 * @param {Object} Email sender contact parameters.
						 */
						"senderSet"
					);
					this.callParent(arguments);
				},

				/**
				 * Subscribes mail model on sandbox messages.
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("BackHistoryState", this.onBackHistoryState, this);
				},

				/**
				 * Clears new email relation field, if realtion card closed using cancel button.
				 */
				onBackHistoryState: function() {
					var isCardOpened = this.get("IsCardOpened");
					if (isCardOpened) {
						this.set("CurrentColumnValue", null);
						this.set("IsCardOpened", false);
					}
				},

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#openPageForNewEntity
				 * @overriden
				 */
				openPageForNewEntity: function(columnName, displayColumnName, displayColumnValue) {
					var isCardOpened = this.get("IsCardOpened");
					var historyState = this.sandbox.publish("GetHistoryState");
					var state = historyState.state || {};
					var moduleId = state.moduleId;
					if (isCardOpened || moduleId.indexOf(columnName) > 0) {
						var defValues = [{
							name: displayColumnName,
							value: displayColumnValue
						}];
						this.sandbox.publish("ReloadCard", defValues);
					} else {
						this.set("IsCardOpened", true);
						this.mixins.LookupQuickAddMixin.openPageForNewEntity.apply(this, arguments);
					}
				},

				/**
				 * Initializes starter parameters.
				 */
				initParameters: function() {
					this.set("MailTitleText", this.getMailTitleText());
					this.set("MailDateText", this.getMailDate());
					this.set("IsProcessingButtonEnabled", true);
					this.initDefaultColumnName();
				},

				/**
				 * ####### ######## ##### ## ##### #######.
				 * @param {String} columnName ############ #######.
				 */
				clearColumn: function(columnName) {
					this.initDefaultColumnName();
					this.set(columnName, null);
					this.onSaveEntity();
				},

				/**
				 * Initializes the collection of the action button menu items.
				 */
				initActionsMenuCollection: function() {
					var actions = this.get("ActionsMenuCollection");
					var collection = this.getActionMenuCollection(actions);
					this.set("ActionsMenuCollection", collection);
				},

				/**
				 * Returns the collection of the action button menu items.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} collection Item menu collection.
				 * @virtual
				 * @return {Terrasoft.BaseViewModelCollection}
				 */
				getActionMenuCollection: function(collection) {
					if (this.isEmpty(collection)) {
						collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					}
					var processParams = this.get("ProcessParametersArray");
					if (this.isNotEmpty(processParams)) {
						var separator = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Id": Terrasoft.generateGUID(),
								"Type": "Terrasoft.MenuSeparator",
								"Caption": this.get("Resources.Strings.RunProcessMenuSeparator"),
								"MarkerValue": "RunProcess"
							}
						});
						collection.addItem(separator);
						this.Terrasoft.each(processParams, function(processParam) {
							var item = this.Ext.create("Terrasoft.BaseViewModel", {
								values: this.Ext.apply(processParam, {"Id": Terrasoft.generateGUID()})
							});
							collection.addItem(item);
						}, this);
					}
					if (this.getIsFeatureEnabled("EmailRelationAddingEnabled")) {
						this.addRelationItemsToActionMenu(collection);
					}
					var deleteSeparator = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							"Id": Terrasoft.generateGUID(),
							"Type": "Terrasoft.MenuSeparator"
						}
					});
					collection.addItem(deleteSeparator);
					var deleteCaption = this.get("Resources.Strings.Delete");
					var deleteItem = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							"Id": Terrasoft.generateGUID(),
							"Caption": deleteCaption,
							"Click": {bindTo: "onDeleteEmail"},
							"MarkerValue": deleteCaption
						}
					});
					collection.addItem(deleteItem);
					this.addRelatedEmailsAction(collection);
					return collection;
				},

				/**
				 * Adds related emails action to actions menu.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} collection Item menu collection.
				 */
				addRelatedEmailsAction: function(collection) {
					if(!this.getIsFeatureEnabled("RelatedEmails")){
						return;
					}
					var relatedEmailsSeparator = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							"Id": Terrasoft.generateGUID(),
							"Type": "Terrasoft.MenuSeparator"
						}
					});
					collection.addItem(relatedEmailsSeparator);
					var relatedEmailsCaption =  this.get("Resources.Strings.ShowRelatedEmails");
					var relatedEmailsItem = this.Ext.create("Terrasoft.BaseViewModel", {
						values: {
							"Id": Terrasoft.generateGUID(),
							"Caption": relatedEmailsCaption,
							"Click": {bindTo: "onShowRelatedEmails"},
							"MarkerValue": relatedEmailsCaption
						}
					});
					collection.addItem(relatedEmailsItem);
				},

				/**
				 * Loads related to current email emails to panel.
				 * @protected
				 */
				onShowRelatedEmails: function() {
					this.sandbox.publish("ShowRelatedEmails", this.$Id);
				},

				/**
				 * Adds menu items to action menu relation.
				 * @protected
				 * @param {Terrasoft.BaseViewModelCollection} collection Action menu item collection.
				 */
				addRelationItemsToActionMenu: function(collection) {
					var relationColumnNames = this.get("EntityConnectionColumnList");
					if (relationColumnNames && relationColumnNames.length > 0) {
						var relationItemSeparator = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Id": Terrasoft.generateGUID(),
								"Type": "Terrasoft.MenuSeparator"
							}
						});
						collection.addItem(relationItemSeparator);
						var addRelationColumnCollection = this.getRelationCollection(relationColumnNames,
							"addEmailRelation");
						var addRelationItem = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Id": Terrasoft.generateGUID(),
								"Caption": this.get("Resources.Strings.AddRelationColumnCollectionCaption"),
								"MarkerValue": "CreateNewRelation",
								"Items": addRelationColumnCollection
							}
						});
						collection.addItem(addRelationItem);
						var linkRelationColumnCollection = this.getRelationCollection(relationColumnNames,
							"linkEmailRelation");
						var linkRelationItem = this.Ext.create("Terrasoft.BaseViewModel", {
							values: {
								"Id": Terrasoft.generateGUID(),
								"Caption": this.get("Resources.Strings.LinkRelationColumnCollectionCaption"),
								"MarkerValue": "LinkRelation",
								"Items": linkRelationColumnCollection
							}
						});
						collection.addItem(linkRelationItem);
					}
				},

				/**
				 * Returns tge second level relation menu.
				 * @protected
				 * @param {String[]} relationColumnNames Email relations columns list.
				 * @return {String} onClickMetodName OnClick relation item handler method name.
				 */
				getRelationCollection: function(relationColumnNames, onClickMetodName) {
					var relationColumnCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.Terrasoft.each(relationColumnNames, function(columnName) {
						var column = this.entitySchema.getColumnByName(columnName);
						var values = this.generateRelationMenuItemConfig(column);
						values = this.Ext.apply(values, {
							"Id": Terrasoft.generateGUID(),
							"Click": {"bindTo": onClickMetodName}
						});
						relationColumnCollection.addItem(
							this.Ext.create("Terrasoft.BaseViewModel", {
								values: values
							})
						);
					}, this);
					return relationColumnCollection;
				},

				/**
				 * Returns relation menu item config.
				 * @protected
				 * @param {Object} column Connection column.
				 * @return {Object} Menu item.
				 */
				generateRelationMenuItemConfig: function(column) {
					var imageConfig = this.getRelationImageConfig(column.name);
					var config = {
						"Caption": column.caption,
						"ImageConfig": imageConfig,
						"Tag": column.name,
						"MarkerValue": "relationMenuItems " + column.caption
					};
					return config;
				},

				/**
				 * Handles "Add relation" menu item click.
				 * @protected
				 * @param {String} columnName Connection column name.
				 */
				addEmailRelation: function(columnName) {
					this.set("EntityRelationColumnName", columnName);
					var moduleStructure = this.Terrasoft.configuration.ModuleStructure;
					var schemaName = this.getSchemaNameByRelationColumnName(columnName);
					var schemaModuleStructure = moduleStructure[schemaName];
					var schemaPages = schemaModuleStructure.pages;
					var cardSchema = schemaModuleStructure.cardSchema;
					var defaultValues = this.getRelationValuePairs(columnName, schemaName);
					if (this.Ext.isArray(schemaPages)) {
						var cardInfo = this.Terrasoft.findWhere(schemaPages, {name: schemaName});
						cardSchema = cardInfo.cardSchema;
						if (schemaModuleStructure.attribute && cardInfo.UId) {
							defaultValues.push({
								name: schemaModuleStructure.attribute,
								value: cardInfo.UId
							});
						}
					}
					var moduleId = "AddEmailRelation_" + cardSchema + this.Terrasoft.generateGUID();
					this.sandbox.subscribe("CardModuleResponse", this.cardModuleResponseHandler, this,
						[moduleId]);
					var openCardConfig = {
						schemaName: cardSchema,
						operation: this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
						moduleId: moduleId,
						defaultValues: defaultValues,
						renderTo: "centerPanel",
						keepAlive: true
					};
					this.openCardInChain(openCardConfig);
				},

				/**
				 * Handles "CardModuleResponse" event response.
				 * @protected
				 * @param {Object} args "CardModuleResponse" event response arguments.
				 * @param {String} args.primaryColumnValue Relation entity identifier.
				 * @param {String} args.primaryDisplayColumnValue Relation entity primary display column value.
				 * @param {String} args.primaryDisplayColumnName Relation entity primary display column name.
				 */
				cardModuleResponseHandler: function(args) {
					var primaryColumnValue = args.primaryColumnValue;
					var primaryDisplayColumnValue = args.primaryDisplayColumnValue;
					var entityRelation = {
						Id: primaryColumnValue,
						value: primaryColumnValue
					};
					if (primaryDisplayColumnValue) {
						entityRelation.displayValue = primaryDisplayColumnValue;
						entityRelation[args.primaryDisplayColumnName] = primaryDisplayColumnValue;
						this.updateEmailRecordByRelation(entityRelation);
					} else {
						this.getSelectedResultsSelectQuery(args, entityRelation);
					}
				},

				/**
				 * Executes connection schema query and updates email relation.
				 * @protected
				 * @param {Object} args "CardModuleResponse" event response arguments.
				 * @param {String} args.primaryDisplayColumnName Relation entity primary display column name.
				 * @param {Object} entityRelation Entity relation.
				 * @param {String} entityRelation.value Relation entity identifier.
				 */
				getSelectedResultsSelectQuery: function(args, entityRelation) {
					var schemaName = this.getSchemaNameByRelationColumnName(this.get("EntityRelationColumnName"));
					var select = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: schemaName
					});
					select.addColumn(args.primaryDisplayColumnName);
					select.filters.addItem(
						this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Id", entityRelation.value));
					select.getEntityCollection(function(response) {
						var collection = response.collection;
						if (collection.getCount() === 1) {
							var item = collection.getByIndex(0);
							var primaryDisplayColumnValue = item.get(args.primaryDisplayColumnName);
							entityRelation.displayValue = primaryDisplayColumnValue;
							entityRelation[args.primaryDisplayColumnName] = primaryDisplayColumnValue;
						}
						this.updateEmailRecordByRelation(entityRelation);
					}, this);
					return select;
				},

				/**
				 * Returns default value array for relation entity.
				 * @protected
				 * @param {String} columnName Connection column name.
				 * @param {String} schemaName Connection schema name.
				 * @return {Object[]} Default value array for relation entity. Array element contains
				 * column name and its value.
				 */
				getRelationValuePairs: function(columnName, schemaName) {
					var contact;
					var valuePairs = [];
					var entitySchema = this.entitySchema;
					if (entitySchema.name === schemaName) {
						valuePairs.push({
							name: entitySchema.primaryDisplayColumnName,
							value: this.get("MailTitleText")
						});
					}
					if (this.get("Contact")) {
						contact = this.get("Contact");
						if (this.get("Account")) {
							contact.Account = {
								value: this.get("Account").value,
								displayValue: this.get("Account").displayValue
							};
						}
					}
					var account = this.get("Account");
					if (!contact && account) {
						valuePairs.push({
							name: "Account",
							value: this.getEntityDefaultValueColumnValue(schemaName, account)
						});
						return valuePairs;
					}
					if (!contact) {
						contact = this.get("SenderContact");
					}
					if (contact && contact.value) {
						valuePairs.push({
							name: this.getSchemaDefaultValueColumnName("Contact", schemaName),
							value:  this.getEntityDefaultValueColumnValue(schemaName, contact)
						});
						var senderAccount = contact.Account;
						if (senderAccount) {
							valuePairs.push({
								name: this.getSchemaDefaultValueColumnName("Account", schemaName),
								value: this.getEntityDefaultValueColumnValue(schemaName, senderAccount)
							});
						}
					}
					if (columnName === "Contact" && this.isAutoBindingContactEmailNeeded()) {
						this.addSenderInfo(valuePairs);
					}
					return valuePairs;
				},

				/**
				 * Returns schema default value column name.
				 * @protected
				 * @param {String} columnName Connection column name.
				 * @param {String} schemaName Connection schema name.
				 * @return {String} Schema default value column name.
				 */
				getSchemaDefaultValueColumnName: function(columnName, schemaName) {
					if (schemaName === "Account" && columnName === "Contact") {
						return "PrimaryContact";
					}
					return columnName;
				},

				/**
				 * Returns entity default value.
				 * @protected
				 * @param {String} schemaName Connection schema name.
				 * @param {Object} entity Entity instance.
				 * @return {String} Entity default value.
				 */
				getEntityDefaultValueColumnValue: function(schemaName, entity) {
					return entity.value;
				},

				/**
				 * Handles "Link relation" menu item click.
				 * @protected
				 * @param {String} columnName Connection column name.
				 */
				linkEmailRelation: function(columnName) {
					var schemaName = this.getSchemaNameByRelationColumnName(columnName);
					var lookupListConfig = this.getLookupListConfig(columnName);
					var args = {
						searchValue: "",
						schemaName: schemaName,
						multiSelect: false,
						columns: lookupListConfig ? lookupListConfig.columns : []
					};
					var config = this.getLookupPageConfig(args, columnName);
					if (schemaName === "Activity") {
						var filter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Type",
							ConfigurationConstants.Activity.Type.Email);
						config.filters.addItem(filter);
					}
					config.hideActions = true;
					this.set("EntityRelationColumnName", columnName);
					this.openLookup(config, this.onExistingRelationSelected, this);
				},

				/**
				 * Returns schema name depends on relation column name.
				 * @protected
				 * @param {String} columnName Connection column name.
				 * @return {String} Relation schema name.
				 */
				getSchemaNameByRelationColumnName: function(columnName) {
					var column = this.entitySchema.getColumnByName(columnName);
					return column.referenceSchemaName;
				},

				/**
				 * Handles lookup module response after selecting existing relation.
				 * @param {Object} args Arguments that contain information about selected record.
				 * @protected
				 */
				onExistingRelationSelected: function(args) {
					if (!args || !args.selectedRows || args.selectedRows.isEmpty()) {
						return;
					}
					var selectedRow = args.selectedRows.getByIndex(0);
					this.updateEmailRecordByRelation(selectedRow);
				},
				

				/**
				 * Updates email record relation column by selected value.
				 * @param {Object} emailRelation Email relation object (value and display value).
				 * @protected
				 */
				updateEmailRecordByRelation: function(emailRelation) {
					var columnName = this.get("EntityRelationColumnName");
					this.set(columnName, emailRelation);
					this.initDefaultColumnName();
					if (columnName === "Contact" && emailRelation && emailRelation.value &&
							this.isAutoBindingContactEmailNeeded()) {
						this.set("IsNeedReload", true);
						this.actualizeSenderRelation(emailRelation.value, this.onSaveEntity, this);
					}
					else {
						this.onSaveEntity();
					}
				},

				/**
				 * ######## ###### ######## ### ####### #####.
				 * @return {String} markerValue ######### ########.
				 * @param {String} columnName ###### # html ######.
				 */
				getEditContainerMarkerValue: function(columnName) {
					var currentColumnName = columnName || this.get("CurrentColumnName");
					if (Ext.isEmpty(currentColumnName)) {
						return;
					}
					var column = this.entitySchema.getColumnByName(currentColumnName);
					var markerValue = "";
					if (!this.Ext.isEmpty(columnName) && !this.isColumnFilled(columnName)) {
						markerValue = "InputEditNotVisible";
					} else {
						markerValue = this.Ext.String.format("{0} {1}", column.name, column.caption);
					}
					return markerValue;
				},

				/**
				 * Handles "Delete" menu item click.
				 */
				onDeleteEmail: function() {
					var recordId = this.get("Id");
					var config = {
						schemaName: this.entitySchema.name,
						primaryColumnValue: recordId
					};
					RightUtilities.checkCanDelete(config, this.onCheckCanDeleteResponse, this);
				},

				/**
				 * ############ ######### ######## ########### ######## ######### #######.
				 * @param {String} rightsErrorMessage ##### #######.
				 */
				onCheckCanDeleteResponse: function(rightsErrorMessage) {
					if (rightsErrorMessage) {
						var message = this.get("Resources.Strings." + rightsErrorMessage);
						message = message || rightsErrorMessage;
						this.showInformationDialog(message);
						return;
					}
					this.showConfirmationDialog(this.get("Resources.Strings.DeleteConfirmationMessage"),
						function(returnCode) {
							this.onDelete(returnCode);
						},
						[this.Terrasoft.MessageBoxButtons.YES.returnCode,
							this.Terrasoft.MessageBoxButtons.NO.returnCode]);
				},

				/**
				 * Processes user response of delete data.
				 * @param {String} returnCode Selected button code.
				 */
				onDelete: function(returnCode) {
					if (returnCode !== this.Terrasoft.MessageBoxButtons.YES.returnCode) {
						return;
					}
					this.showBodyMask({
						selector: this.get("MaskSelector"),
						timeout: 0
					});
					this.callService({
						serviceName: "GridUtilitiesService",
						methodName: "DeleteRecords",
						data: {
							primaryColumnValues: [this.get("Id")],
							rootSchema: this.entitySchema.name
						}
					}, function(responseObject) {
						var result = this.Ext.decode(responseObject.DeleteRecordsResult);
						var success = result.Success;
						this.removeEmailFromPanel();
						this.hideBodyMask({selector: this.get("MaskSelector")});
						if (!success) {
							this.showDeleteExceptionMessage(result);
						}
					}, this);
				},

				/**
				 * ########## ####### ######## ######## ## ###### ######.
				 */
				removeEmailFromPanel: function() {
					this.fireEvent("emailDeleted", this);
				},

				/**
				 * ########## ######### ## ######, ############ ## ##### ########.
				 * @protected
				 * @param {Object} result ##### #######
				 */
				showDeleteExceptionMessage: function(result) {
					var message = "";
					if (result.IsDbOperationException) {
						message = this.get("Resources.Strings.DependencyWarningMessage");
					} else if (result.IsSecurityException) {
						message = this.get("Resources.Strings.RightLevelWarningMessage");
					} else {
						message = result.ExceptionMessage;
					}
					this.showInformationDialog(message);
				},

				/**
				 * Set email author contact.
				 * @protected
				 */
				setEmailAuthor: function() {
					var senderContact = this.get("SenderContact");
					this.set("EmailAuthor", senderContact);
				},

				/**
				 * Sets short sender name.
				 * @protected
				 * @param {String} fullName Full user name.
				 */
				setShortSenderName: function(fullName) {
					var shortSenderName = "";
					if (!this.Ext.isEmpty(fullName)) {
						fullName = fullName.replace("\t", " ");
						var names = fullName.split(" ");
						this.Terrasoft.each(names, function(item) {
							if (item !== " " && item !== "") {
								shortSenderName += item[0];
								if (shortSenderName.length === 2) {
									return false;
								}
							}
						}, this);
					}
					this.set("ShortSenderName", shortSenderName);
				},

				/**
				 * ######### ### ########### ######### #########.
				 * @return {String} ### ########### ######### #########.
				 */
				getSenderName: function() {
					var author = this.get("Author");
					var senderInfoRegExp = this.get("SenderInfoRegExp");
					var senderContact = this.get("SenderContact");
					var sender = this.get("Sender");
					if (!this.Ext.isEmpty(senderContact)) {
						return senderContact.displayValue;
					}
					if (this.Ext.isEmpty(sender)) {
						sender = author ? author.displayValue : "";
						return sender;
					}
					var regExp = new RegExp(senderInfoRegExp);
					var senderInfo = sender.match(regExp);
					var senderName = senderInfo ? senderInfo[1] : "";
					if (senderInfo && senderName) {
						return senderName;
					}
					return "";
				},

				/**
				 * ######### email ##### ########### ######### #########.
				 * @return {String} Email ##### ########### ######### #########.
				 */
				getSenderEmail: function() {
					var sender = this.get("Sender");
					var senderInfoRegExp = this.get("SenderInfoRegExp");
					var regExp = new RegExp(senderInfoRegExp);
					var senderInfo = sender.match(regExp);
					var senderEmail = senderInfo ? senderInfo[2] : "";
					if (senderInfo && senderEmail) {
						return senderEmail;
					}
					return sender;
				},

				/**
				 * Opens contact page if email has sender participant.
				 */
				openContactPage: function() {
					var contact = null;
					var primaryColumn;
					var history = this.sandbox.publish("GetHistoryState");
					if (!this.Ext.isEmpty(history.state)) {
						primaryColumn = history.state.primaryColumnValue;
					}
					contact = this.get("SenderContact");
					if (this.Ext.isEmpty(contact)) {
						return;
					}
					var contactId = contact.value;
					if (primaryColumn !== contactId) {
						RightUtilities.checkCanReadRecords({
							schemaName: "Contact",
							primaryColumnValues: [contactId]
						}, this.onCheckContactReadRightsResponse, this);
					}
					return false;
				},

				/**
				 * ############ ######### ####### #### ## ###### ########.
				 * @param {Array} result ######### ####### ####.
				 */
				onCheckContactReadRightsResponse: function(result) {
					var response = this.Ext.isEmpty(result) ? false : result[0];
					if (response && response.Value) {
						this.onUrlClick("Contact", response.Key);
					} else {
						var message = this.get("Resources.Strings.ReadRightLevelWarningMessage");
						this.showInformationDialog(message);
					}
				},

				/**
				 * ######### #### ######### #########.
				 * @return {String} ##### #### ######### #########.
				 */
				getMailTitleText: function() {
					var title = this.get("Title");
					return title ? title : "";
				},

				/**
				 * ######### ##### ######### #########.
				 * @return {String} ##### ######### #########.
				 */
				getMailBody: function() {
					const numberBodySymbols = EmailConstants.NumberBodySymbols;
					let body = this.getIsFeatureEnabled("ActivityPreview") ? this.get("Preview") : this.get("Body");
					let textMail = "";
					if (!Ext.isEmpty(body)) {
						textMail = this.removeHtmlTags(body);
					}
					if (textMail.length > numberBodySymbols) {
						textMail = textMail.substr(0, numberBodySymbols - 1);
					}
					return textMail;
				},

				/**
				 * Message title click handler.
				 */
				onTitleClick: function() {
					var type = this.get("Type");
					var typeid = type ? type.value : null;
					this.onUrlClick(EmailConstants.entitySchemaName, this.get("Id"), typeid);
				},

				/**
				 * @inheritdoc Terrasoft.baseSchemaViewModel#getLookupEntitySchemaName
				 * @overridden
				 */
				onLinkClick: function(url, columnName) {
					var column = this.getColumnByName(columnName);
					var entitySchemaName = column.referenceSchemaName;
					var moduleStructure = this.getModuleStructure(entitySchemaName);
					var attribute = moduleStructure.attribute;
					var typeColumnValue;
					if (!this.Ext.isEmpty(attribute)) {
						var typeColumn = this.get(columnName + "." + attribute);
						typeColumnValue = !this.Ext.isEmpty(typeColumn) ? typeColumn.value : null;
					}
					var primaryColumn = this.get(columnName);
					var primaryColumnValue = primaryColumn.value;
					this.onUrlClick(entitySchemaName, primaryColumnValue, typeColumnValue);
				},

				/**
				 * Creates unique module id for entity card module.
				 * @protected
				 * @param {Guid} primaryColumnValue Entity primary column value.
				 * @return {String} Unique card module id.
				 */
				generateCardModuleId: function(primaryColumnValue) {
					return this.Ext.String.format("{0}_CardModuleV2_{1}_{2}", this.sandbox.id, primaryColumnValue,
						this.Terrasoft.utils.guid.generateGUID());
				},

				/**
				 * Label url click handler.
				 */
				onUrlClick: function(entitySchemaName, primaryColumnValue, typeColumnValue) {
					var historyState = this.sandbox.publish("GetHistoryState");
					var moduleId = this.generateCardModuleId(primaryColumnValue);
					var config = {
						sandbox: this.sandbox,
						entitySchemaName: entitySchemaName,
						primaryColumnValue: primaryColumnValue,
						operation: ConfigurationEnums.CardStateV2.EDIT,
						historyState: historyState,
						typeId: typeColumnValue,
						moduleId: moduleId
					};
					NetworkUtilities.openCardInChain(config);
				},

				/**
				 * ######## ######## #####.
				 * @private
				 * @param {String} columnName ############ ####### #####.
				 * @return {Object} ######## #####.
				 */
				getColumnValue: function(columnName) {
					var currentLookupValue = this.get(columnName);
					return currentLookupValue;
				},

				/**
				 * ####### html #### ## ######.
				 * @private
				 * @param {String} value ###### # html ######.
				 * @return {String} ###### ### html #####.
				 */
				removeHtmlTags: function(value) {
					return EmailUtilities.removeHtmlTags(value);
				},

				/**
				 * Creates email author profile image url.
				 * @return {String} Email author profile image url.
				 */
				getAuthorImageSrc: function() {
					var defaultAuthorImageSrc =
						this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.ContactDefaultIcon"));
					var contact = this.get("SenderContact");
					if (this.isEmpty(contact)) {
						return defaultAuthorImageSrc;
					}
					if (this.isEmpty(contact) || this.isEmpty(contact.primaryImageValue) ||
						this.Terrasoft.isEmptyGUID(contact.primaryImageValue)) {
						this.set("IsShortContact", true);
						return "";
					}
					this.set("IsShortContact", false);
					return this.getImageSrc(contact.primaryImageValue);
				},

				/**
				 * Checks email author has profile image.
				 * @return {Boolean} True if email author has profile image, false otherwise.
				 */
				isAuthorImageUrlExist: function() {
					var authorImageUrl = this.getAuthorImageSrc();
					if (this.isEmpty(authorImageUrl)) {
						return false;
					}
					return true;
				},

				/**
				 * Creates image url by image unique identifier.
				 * @param {String} imageId Image unique identifier.
				 * @private
				 * @return {String} Image url.
				 */
				getImageSrc: function(imageId) {
					return this.Terrasoft.ImageUrlBuilder.getUrl({
						source: this.Terrasoft.ImageSources.ENTITY_COLUMN,
						params: {
							schemaName: "SysImage",
							columnName: "Data",
							primaryColumnValue: imageId
						}
					});
				},

				/**
				 * Handle response of save entity request.
				 * @private
				 * @param {Object} [response] Response of save entity request.
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				_handleSaveRequestResponse: function(response, callback, scope) {
					if (response && response.success) {
						this.fireEvent("entitySaved", this);
						this.set("CurrentColumnValue", null);
					}
					this.Ext.callback(callback, scope);
				},

				/**
				 * Set IsNeedProcess to false.
				 * @private
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				_onSetIsNeedProcessFalse: function(callback, scope) {
					this.saveEntity(function(response) {
						this._handleSaveRequestResponse(response, callback, scope);
					}, this);
				},

				/**
				 * ######### ######### #### ### ######.
				 * @return {String} ######### #### ### ######.
				 */
				getMailDate: function() {
					var mailDate = this.get("SendDate");
					if (Ext.isEmpty(mailDate)) {
						mailDate = this.get("ModifiedOn");
					}
					var smartDate = null;
					var dateDiff = FormatUtils.dateDiffDays(mailDate, new Date());
					switch (dateDiff) {
						case 0:
							smartDate = Terrasoft.utils.string.getTypedStringValue(mailDate, Terrasoft.DataValueType.TIME);
							break;
						case 1:
							smartDate = this.get("Resources.Strings.Yesterday");
							break;
						default:
							smartDate = Terrasoft.utils.string.getTypedStringValue(mailDate, Terrasoft.DataValueType.DATE);
							break;
					}
					return smartDate;
				},

				/**
				 * Creates process execution parameters object.
				 * @param {Guid} processId Process unique identifier.
				 * @return {Object} Process execution parameters.
				 */
				getProcessExecuteConfig: function(processId) {
					var emailId = this.get("Id");
					var config = {
						sysProcessId: processId,
						parameters: {
							RecordId: emailId
						}
					};
					return config;
				},

				/**
				 * Calls process execute.
				 * @param {Guid} processId Process unique identifier.
				 */
				runProcess: function(processId) {
					var config = this.getProcessExecuteConfig(processId);
					ProcessModuleUtilities.executeProcess(config);
				},

				/**
				 * Returns message container data item marker value.
				 * @return {String} message container data item marker value.
				 */
				getEmailMarkerValue: function() {
					return this.get("MailTitleText");
				},

				/**
				 * Sets and saves IsNeedProcess value for message.
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				setIsNeedProcessFalse: function(callback, scope) {
					this.set("IsProcessingButtonEnabled", false);
					var chain = [];
					chain.push(this.updateIsNeedProcess);
					chain.push(this._onSetIsNeedProcessFalse, function() {
						this.Ext.callback(callback, scope);
					});

					this.set("IsNeedProcess", false);
					this.Terrasoft.chain.apply(this, chain);
				},

				/**
				 * Creates update query for IsNeedProcess column.
				 * @protected
				 * @return {Terrasoft.UpdateQuery} Update query for IsNeedProcess column.
				 */
				getIsNeedProcessUpdate: function() {
					var update = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "EmailMessageData"
					});
					var filters = update.filters;
					var activityId = this.get("Id");
					if (this.Ext.isEmpty(activityId) || this.Terrasoft.utils.guid.isEmptyGUID(activityId)) {
						return null;
					}
					var activityIdFilter = update.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						"Activity", activityId);
					filters.add("activityIdFilter", activityIdFilter);
					var mailboxesFilterGroup = this.Terrasoft.createFilterGroup();
					mailboxesFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
					var mailboxesFilter = this.Terrasoft.createColumnInFilterWithParameters(
						"MailboxSyncSettings", this.$Mailboxes);
					mailboxesFilterGroup.add("avaliableMailboxesFilter", mailboxesFilter);
					var draftFilter = this.Terrasoft.createIsNullFilter(this.Ext.create("Terrasoft.ColumnExpression",
						{columnPath: "MailboxSyncSettings"}));
					mailboxesFilterGroup.add("draftsFilter", draftFilter);	
					filters.add("mailboxesFilter", mailboxesFilterGroup);
					update.setParameterValue("IsNeedProcess", this.get("IsNeedProcess"),
						this.Terrasoft.DataValueType.BOOLEAN);
					return update;
				},

				/**
				 * Updates IsNeedProcess value for current user EmailMessageData instances.
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				updateIsNeedProcess: function(callback, scope) {
					var update = this.getIsNeedProcessUpdate();
					if (this.Ext.isEmpty(update)) {
						this.Ext.callback(callback, scope);
						return;
					}
					update.execute(function() {
						this.Ext.callback(callback, scope);
					}, this);
				},

				/**
				 * Save entity.
				 * @protected
				 * @param {Function} [callback] Callback function.
				 * @param {Object} [scope] Callback function scope.
				 */
				onSaveEntity: function(callback, scope) {
					this.showBodyMask({
						selector: this.get("MaskSelector"),
						timeout: 0
					});
					this.saveEntity(function(response) {
						this.hideBodyMask({selector: this.get("MaskSelector")});
						this._handleSaveRequestResponse(response, callback, scope);
					}, this);
				},

				/**
				 * ######### ######### ###### ##### ### ######### #######.
				 * @param {String} columnName ######## #######.
				 * @return {boolean} ######### ###### ##### ### ######### #######.
				 */
				getEmailRelationButtonVisible: function(columnName) {
					var isVisible = false;
					var DefaultEntityConnectionColumns = this.get("DefaultEntityConnectionColumns");
					if (this.Ext.Array.contains(DefaultEntityConnectionColumns, columnName)) {
						isVisible = true;
					} else {
						isVisible = this.isColumnFilled(columnName);
					}
					return isVisible;
				},

				/**
				 * Opens lookup page.
				 * @protected
				 * @param {Object} args Arguments.
				 * @param {String} columnName Column name.
				 */
				loadVocabulary: function(args, columnName) {
					var currentColumnName = this.get("CurrentColumnName");
					if (!this.Ext.isEmpty(columnName)) {
						currentColumnName = columnName;
					}
					var config = this.getLookupPageConfig(args, currentColumnName);
					if (currentColumnName === "Contact" && this.isAutoBindingContactEmailNeeded()) {
						config.valuePairs = config.valuePairs || [];
						this.addSenderInfo(config.valuePairs);
					}
					this.openLookup(config, this.onLookupSelected, this);
				},

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupPageConfig
				 * @protected
				 * @overridden
				 * @deprecated 7.8 Use mixin's method.
				 */
				getLookupPageConfig: function() {
					return this.mixins.LookupQuickAddMixin.getLookupPageConfig.apply(this, arguments);
				},

				/**
				 * ######### ###### ############## ####### ### ###### ## ###########.
				 * @param {String} entitySchemaName ######## ##### ########### ####.
				 * @return {Array} ###### ############## #######.
				 */
				getAdditionalColumns: function(entitySchemaName) {
					var secondLevelBindingsConfig = this.get("SecondLevelBindingsConfig");
					var entityColumsBinding = secondLevelBindingsConfig[entitySchemaName];
					var result = [];
					Terrasoft.each(entityColumsBinding, function(item) {
						if (result.indexOf(item.childColumn) === -1) {
							result.push(item.childColumn);
						}
					}, this);
					return result;
				},

				/**
				 * @inheritdoc Terrasoft.EntityConnectionLinksPanelItemUtilities#getLookupEntitySchemaName
				 * @overridden
				 */
				getLookupEntitySchemaName: function(args, columnName) {
					var entityColumn = this.entitySchema.getColumnByName(columnName);
					return args.schemaName || entityColumn.referenceSchemaName;
				},

				/**
				 * @inheritdoc Terrasoft.LookupQuickAddMixin#getLookupListConfig
				 * @protected
				 * @overridden
				 * @deprecated 7.8 Use mixin's method.
				 */
				getLookupListConfig: function() {
					return this.mixins.LookupQuickAddMixin.getLookupListConfig.apply(this, arguments);
				},

				/**
				 * Changes the value of the entity columns when the data in the reference field changes.
				 * @param {String} value New connection value.
				 * @param {String} columnName Name of the communication column.
				 */
				onColumnValueChange: function(value, columnName) {
					var currentColumnName = this.get("CurrentColumnName");
					if (!this.Ext.isEmpty(columnName)) {
						currentColumnName = columnName;
					}
					if (this.Ext.isEmpty(currentColumnName)) {
						return;
					}
					var prevValue = this.get(currentColumnName);
					if (prevValue === value) {
						return;
					}
					if (value && value.value === Terrasoft.GUID_EMPTY) {
						value.isNewValue = true;
						this.mixins.LookupQuickAddMixin.onLookupChange.call(this, value, currentColumnName);
					} else {
						this.set(currentColumnName, value);
						this.initDefaultColumnName();
						if (currentColumnName === "Contact" && value && value.value &&
								this.isAutoBindingContactEmailNeeded()) {
							this.set("IsNeedReload", true);
							this.actualizeSenderRelation(value.value, this.onSaveEntity, this);
						}
						else {
							this.onSaveEntity();
						}
					}
				},

				/**
				 * ####### ###### ######## ###########.
				 * @overridden
				 * @param {Object} config ######### ###### ###### ###### ## ###########.
				 * @param {Terrasoft.Collection} config.selectedRows ######### ######### ######.
				 * @param {String} config.columnName ### #######, ### ####### ############# #####.
				 */
				onLookupResult: function(config) {
					var columnName = config.columnName;
					var selectedRows = config.selectedRows;
					if (!selectedRows.isEmpty()) {
						var value = selectedRows.getByIndex(0);
						this.set(columnName, value);
						this.initDefaultColumnName();
						this.onSaveEntity();
					}
					this.set("CurrentColumnValue", null);
				},

				/**
				 * ########## ####### ###### ######## ##### # LookupPage-#. ############# ######## # ###### #############.
				 * @param {Object} lookupPageResult ######### ###### # #### ######.
				 */
				onLookupSelected: function(lookupPageResult) {
					var selectedRows = lookupPageResult.selectedRows;
					if (selectedRows.getCount() > 0) {
						var selectedValue = selectedRows.getByIndex(0);
						this.onColumnValueChange(selectedValue, lookupPageResult.columnName);
					}
				},

				/**
				 * ######### ###### ################# ###### ### ########### ####.
				 * @protected
				 * @param {Object} inputString ######### ###### # ########## ####.
				 */
				onPrepareRelationLookupList: function(inputString) {
					var list = this.Ext.create("Terrasoft.Collection");
					if (Ext.isEmpty(inputString) || (inputString.length < 3)) {
						return;
					}
					list.clear();
					var selectItemSettings = this.getPrepareQuery(inputString);
					selectItemSettings.getEntityCollection(function(result) {
						if (!result.success) {
							return;
						}
						var collection = result.collection;
						var columns = {};
						var currentColumnName = this.get("CurrentColumnName");
						var config = {
							collection: collection,
							filterValue: inputString,
							objects: columns,
							columnName: currentColumnName,
							isLookupEdit: true
						};
						if (collection && !collection.isEmpty()) {
							var column = this.columns[currentColumnName];
							collection.each(function(item) {
								var itemId = item.get("Id");
								var lookupValue = {
									displayValue: item.get("displayValue"),
									value: itemId
								};
								var dependentColumns = this.getDependentColumns(column);
								if (dependentColumns) {
									this.Terrasoft.each(dependentColumns, function(column) {
										lookupValue[column] = item.get(column);
									}, this);
								}
								if (!list.contains(itemId)) {
									columns[itemId] = lookupValue;
								}
							}, this);
						}
						this.mixins.LookupQuickAddMixin.onLookupDataLoaded.call(this, config);
						list.loadAll(columns);
						this.set("CurrentRelationItemsList", list);
					}, this);
				},

				/**
				 * Returns query for lookup column (adds primary and primary display columns and specific filters).
				 * @protected
				 * @param {String} inputString Input string from lookup column.
				 * @return {Terrasoft.EntitySchemaQuery} Query for lookup column.
				 */
				getPrepareQuery: function(inputString) {
					var rowCount = this.get("CurrentRelationRowCount");
					var currentColumnName = this.get("CurrentColumnName");
					var column = this.columns[currentColumnName];
					var referenceSchemaName = column.referenceSchemaName;
					var referenceSchema = column.referenceSchema;
					var currentValue = this.getColumnValue(currentColumnName);
					var currentId = currentValue ? currentValue.value : null;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: referenceSchemaName
					});
					esq.addColumn("Id");
					esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_DISPLAY_COLUMN, "displayValue");
					var dependentColumns = this.getDependentColumns(column);
					if (dependentColumns) {
						this.Terrasoft.each(dependentColumns, function(column) {
							esq.addColumn(column);
						}, this);
					}
					if (currentColumnName === "ActivityConnection") {
						var currentEmailId = this.get("Id");
						esq.filters.addItem(esq.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, referenceSchema.primaryColumnName,
							currentEmailId));
					}
					esq.filters.addItem(esq.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL, referenceSchema.primaryColumnName, currentId));
					var comparsionType = this.getStringColumnComparisonType();
					esq.filters.add("startFilter", Terrasoft.createColumnFilterWithParameter(comparsionType,
						referenceSchema.primaryDisplayColumnName, inputString));
					esq.rowCount = rowCount;
					esq.filters.addItem(this.getLookupQueryFilters(currentColumnName));
					return esq;
				},

				/**
				 * Returns columns related to entity from lookupListConfig
				 * @param column Entity column
				 * @return {Array} Array of column names or null
				 */
				getDependentColumns: function(column) {
					var lookupListConfig = column.lookupListConfig;
					if (lookupListConfig && lookupListConfig.columns && lookupListConfig.columns.length > 0) {
						return lookupListConfig.columns;
					}
					return null;
				},

				/**
				 * Returns is page opened in copy mode.
				 * @private
				 * @return {Boolean} Is page opened in copy mode.
				 */
				isCopyMode: function() {
					return false;
				},

				/**
				 * Fills email sender parameters.
				 * @param {Object} senderContact Sender contact parameters.
				 */
				initSenderInfo: function(senderContact) {
					if (!this.Ext.isEmpty(senderContact)) {
						this.set("SenderContact", senderContact);
					}
					var name = this.getSenderName();
					this.setShortSenderName(name);
					this.setEmailAuthor();
					var email = this.getSenderEmail();
					if (this.Ext.isEmpty(name)) {
						name = email;
						email = "";
					}
					var contact = this.get("SenderContact");
					var hasContact = !this.Ext.isEmpty(contact);
					this.set("SenderName", name);
					this.set("SenderEmail", email);
					this.set("HasContact", hasContact);
				},

				/**
				 * Creates email url.
				 * @return {String} Email url.
				 */
				getEmailHref: function() {
					var url = Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx#";
					var id = this.get("Id");
					var referenceSchemaName = EmailConstants.entitySchemaName;
					var typeUId = ConfigurationConstants.Activity.Type.Email;
					url += NetworkUtilities.getEntityUrl(referenceSchemaName, id, typeUId);
					return url;
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#setColumnValues
				 * @overridden
				 */
				setColumnValues: function(entity) {
					this.callParent(arguments);
					this.set("ActivityConnection.Type", entity.get("ActivityConnection.Type"));
				},

				/**
				 * "Process message" button visibility value converter.
				 * @param {Boolean} value New raw visibility value.
				 * @return {Boolean} "Process message" button visibility.
				 */
				getProcessButtonVisible: function(value) {
					return value || !this.get("IsProcessingButtonEnabled");
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "EmailHeader",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						classes: {wrapClassName: ["messageHeader"]},
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailHeader",
					"propertyName": "items",
					"name": "EmailAuthorImageContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						classes: {wrapClassName: ["emailAuthorImageContainer"]},
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailAuthorImageContainer",
					"propertyName": "items",
					"name": "EmailAuthorImage",
					"values": {
						"getSrcMethod": "getAuthorImageSrc",
						"onPhotoChange": Terrasoft.emptyFn,
						"readonly": true,
						"classes": {"wrapClass": ["author-image-container"]},
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"onImageClick": {bindTo: "openContactPage"},
						"visible": {bindTo: "isAuthorImageUrlExist"}
					}
				},
				{
					"operation": "insert",
					"name": "EmailAuthorContainer",
					"parentName": "EmailHeader",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						classes: {wrapClassName: ["createdBy"]},
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailAuthorContainer",
					"propertyName": "items",
					"name": "EmailAuthor",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {bindTo: "SenderName"},
						"classes": {
							"hyperlinkClass": ["t-label", "label-link", "label-url"]
						},
						"click": {bindTo: "openContactPage"},
						"markerValue": {bindTo: "SenderName"},
						"visible": {bindTo: "HasContact"},
						"linkMouseOver": {bindTo: "linkMouseOver"},
						"tag": {
							"columnName": "EmailAuthor",
							"referenceSchemaName": "Contact"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailAuthorContainer",
					"propertyName": "items",
					"name": "EmailAuthorAddress",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "SenderName"},
						"classes": {
							"labelClass": ["t-label"]
						},
						"markerValue": {bindTo: "SenderName"},
						"visible": {
							bindTo: "HasContact",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "EmailInformation",
					"parentName": "EmailHeader",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						classes: {wrapClassName: ["emailInformation"]},
						items: []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailInformation",
					"propertyName": "items",
					"name": "EmailDate",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": ["message-date-text"]
						},
						"caption": {bindTo: "MailDateText"},
						"markerValue": {bindTo: "MailDateText"}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailInformation",
					"propertyName": "items",
					"name": "AuthorEmailAddress",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {bindTo: "SenderEmail"},
						"classes": {
							"labelClass": ["t-label", "createdByAddress"]
						},
						"markerValue": {bindTo: "SenderEmail"},
						"visible": {
							bindTo: "HasContact",
							bindConfig: {
								converter: function(value) {
									return !value;
								}
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailAuthorImageContainer",
					"propertyName": "items",
					"name": "ShortSenderName",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"caption": {bindTo: "ShortSenderName"},
						"classes": {
							"hyperlinkClass": ["t-label", "label-link", "label-url"]
						},
						"click": {bindTo: "openContactPage"},
						"markerValue": "ShortSenderName",
						"visible": {bindTo: "IsShortContact"},
						"linkMouseOver": {bindTo: "linkMouseOver"},
						"tag": {
							"columnName": "EmailAuthor",
							"referenceSchemaName": "Contact"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailHeader",
					"propertyName": "items",
					"name": "ActionsButton",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.ActionsButtonImage"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"classes": {
							wrapperClass: ["email-actions-button-wrapper"],
							menuClass: ["email-actions-button-menu"]
						},
						"controlConfig": {
							"menu": {
								"items": {"bindTo": "ActionsMenuCollection"}
							}
						},
						"markerValue": "EmailActionsButton"
					}
				},
				{
					"operation": "insert",
					"name": "EmailMessage",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["message-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TitleContainer",
					"parentName": "EmailMessage",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {wrapClassName: ["title-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "TitleContainer",
					"propertyName": "items",
					"name": "EmailTitleText",
					"values": {
						"itemType": Terrasoft.ViewItemType.HYPERLINK,
						"classes": {
							"hyperlinkClass": ["link", "message-title", "label-url", "label-link"]
						},
						"caption": {bindTo: "MailTitleText"},
						"href": {bindTo: "getEmailHref"},
						"click": {bindTo: "onTitleClick"},
						"markerValue": {bindTo: "MailTitleText"}
					}
				},
				{
					"operation": "insert",
					"name": "EmailMessageText",
					"parentName": "EmailMessage",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {"wrapClassName": ["message-text-container"]},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "EmailMessageText",
					"propertyName": "items",
					"name": "EmailText",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"classes": {
							"labelClass": ["message-email-text"]
						},
						"caption": {bindTo: "getMailBody"}
					}
				}
			],
			rules: {
				"ActivityConnection": {
					"FiltrationActivityConnectionByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					},
					"FiltrationActivityConnectiontByContact": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Contact",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Contact"
					},
					"FiltrationWithoutCurrenttActivity": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": false,
						"autoClean": false,
						"baseAttributePatch": "Id",
						"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Id"
					},
					"AutocompleteActivityConnectionType": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Type",
						"comparisonType": Terrasoft.ComparisonType.IS_NOT_NULL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "ActivityConnection.Type"
					},
					"FiltrationActivityConnectionByActivityType": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"baseAttributePatch": "Type",
						"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
						"type": BusinessRuleModule.enums.ValueType.CONSTANT,
						"value": ConfigurationConstants.Activity.Type.Email
					}
				},
				"SenderEnum": {
					"BindParameterEnabledSenderEnumToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"Recepient": {
					"BindParameterEnabledRecepientToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"CopyRecepient": {
					"BindParameterEnabledCopyRecepientToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"BlindCopyRecepient": {
					"BindParameterEnabledBlindCopyRecepientToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"Title": {
					"BindParameterEnabledTitleToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"Body": {
					"BindParameterEnabledBodyToEmailSendStatus": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.ENABLED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "EmailSendStatus"
								},
								"comparisonType": Terrasoft.ComparisonType.NOT_EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": ConfigurationConstants.Activity.EmailSendStatus.Sended
								}
							}
						]
					}
				},
				"Contact": {
					"FiltrationContactByAccount": {
						"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
						"autocomplete": true,
						"autoClean": true,
						"baseAttributePatch": "Account",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
						"attribute": "Account"
					}
				}
			}
		};
	});

define('EmailItemSchemaEmailMiningResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaEmailMining", ["EmailConstants", "EmailEnrichmentMixin", "EmailMiningEnums", "EmailHelper",
		"css!EmailItemSchemaCSS"], function(EmailConstants) {
			return {
				entitySchemaName: EmailConstants.entitySchemaName,

				messages: {

					/**
					 * Update contact enrichment page visibility.
					 */
					"ContactEnrichmentPageVisibilityChanged": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					}
				},

				attributes: {

					/**
					 * Source item for web analytics.
					 * @protected
					 * @type {String}
					 */
					"CallerSource": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"value": "EmailPanel"
					}
				},
				mixins: {

					/**
					 * @class Terrasoft.EmailEnrichmentMixin
					 * Email enrichment mixin.
					 */
					EmailEnrichmentMixin: "Terrasoft.EmailEnrichmentMixin"
				},
				methods: {

					/**
					 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
					 * @overridden
					 */
					init: function(callback, scope) {
						this.callParent([function() {
							if (!this.getCanLoadEnrichActions()) {
								this.Ext.callback(callback, scope);
								return;
							}
							this.getContactsFromServer(function(response) {
								this.addEnrichContactsToActionMenu(response, callback, scope);
							}, this);
						}, this]);
					},

					/**
					 * Adds to action menu contacts for enrichment.
					 * @protected
					 * @param {Object} response Enrichment service response object config.
					 * @param {Object[]} response.CloudStateResponse.data Contacts array for enrichment.
					 * @param {Function} callback Callback function.
					 * @param {Object} scope Execution context.
					 */
					addEnrichContactsToActionMenu: function(response, callback, scope) {
						var result = response && response.CloudStateResponse;
						var data = result.data;
						if (!data || data.length === 0) {
							return this.Ext.callback(callback,scope);
						}
						var enrichmentMenuItems = this.$ActionsMenuCollection;
						var isEnrichMenuFilled = enrichmentMenuItems.any(function(item) {
							try {
								var tag = item.$Tag;
								var itemContact = Ext.decode(tag);
								var enrichmentContact = data[0];
								return itemContact && itemContact.enrchTextDataId === enrichmentContact.EnrchTextDataId;
							} catch (e) {
								return false;
							}
						});
						if (isEnrichMenuFilled) {
							return this.Ext.callback(callback,scope);
						}
						this.set("Response", result);
						this.initEnrichmentCollection();
						this.Ext.callback(callback,scope);
					},

					/**
					 * Creates contact enrichment window additional config.
					 * @protected
					 * @return {Object} Contact enrichment window additional config.
					 */
					getAdditionalWindowConfig: function() {
						var enrchEmailDataId = this.get("EnrchEmailData");
						var config = {
							enrchEmailDataId: (enrchEmailDataId && enrchEmailDataId.value)
						};
						return config;
					},

					/**
					 * Returns true if enrich contact actions can be loaded from server, false otherwise.
					 * @protected
					 * @virtual
					 * @return {Boolean} Can load enrich contact actions from server.
					 */
					getCanLoadEnrichActions: function() {
						var status = this.get("EnrchEmailData.Status");
						var enrchEmailData = this.get("EnrchEmailData");
						var reloadActions = this.get("ReloadActions");
						this.set("ReloadActions", false);
						var statusEnum = this.Terrasoft.EmailMiningEnums.EnrichEmailDataStatus;
						return reloadActions || (enrchEmailData && status !== statusEnum.ENRICHED);
					},

					/**
					 * @inheritdoc Terrasoft.EmailItemSchema#setColumnValues
					 * @overridden
					 */
					setColumnValues: function(entity) {
						this.callParent(arguments);
						this.set("EnrchEmailData", entity.get("EnrchEmailData"));
						this.set("EnrchEmailData.Status", entity.get("EnrchEmailData.Status"));
					},

					/**
					 * Returns actions button icon.
					 * @param {Boolean} isCloudVisible Is cloud icon visible.
					 * @return {Object} actions button icon.
					 */
					getActionsImage: function(isCloudVisible) {
						return isCloudVisible
							? this.get("Resources.Images.ContactEnrichmentIcon")
							: this.get("Resources.Images.ActionsButtonImage");
					},

					/**
					 * Returns message header marker value.
					 * @param {Boolean} isCloudVisible Is cloud icon visible.
					 * @return {String} message header marker value.
					 */
					getHeaderMarker: function(isCloudVisible) {
						return isCloudVisible ? "ShowCloud EmailEnrichmentIcon" : "HideCloud";
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "EmailHeader",
						"values": {
							"markerValue": {
								"bindTo": "isCloudVisible",
								"bindConfig": {
									"converter": "getHeaderMarker"
								}
							}
						}
					},
					{
						"operation": "merge",
						"name": "ActionsButton",
						"values": {
							"imageConfig": {
								"bindTo": "isCloudVisible",
								"bindConfig": {
									"converter": "getActionsImage"
								}
							}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


define('EmailItemSchemaInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaInvoice", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
    return {
        entitySchemaName: EmailConstants.entitySchemaName,
        methods: {},
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        rules: {
            "Invoice": {
                "FiltrationInvoiceByAccount": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Account",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Account"
                },
                "FiltrationInvoiceByContact": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Contact",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Contact"
                }
            }
        }
    };
});

define('EmailItemSchemaOrderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaOrder", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
    return {
        entitySchemaName: EmailConstants.entitySchemaName,
        methods: {},
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        rules: {
            "Order": {
                "FiltrationOrderByContact": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Contact",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Contact"
                },
                "FiltrationOrderByAccount": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Account",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Account"
                }
            }
        }
    };
});

define('EmailItemSchemaDocumentResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaDocument", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
	return {
		entitySchemaName: EmailConstants.entitySchemaName,
		methods: {},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		rules: {
			"Document": {
				"FiltrationDocumentByAccount": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Account",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Account"
				},
				"FiltrationDocumentByContact": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Contact",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Contact"
				}
			}
		}
	};
});

define('EmailItemSchemaCoreLeadResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
 define("EmailItemSchemaCoreLead", [], function() {
	return {
		methods: {

			/**
			 * @inheritdoc Terrasoft.EmailItemSchema#getEntityDefaultValueColumnValue
			 * @overridden
			 */
			getEntityDefaultValueColumnValue: function(schemaName, entity) {
				if (schemaName === "Lead") {
					return entity.displayValue;
				}
				return this.callParent(arguments);
			}
		}
	};
});

define('EmailItemSchemaOpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaOpportunity", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
	return {
		entitySchemaName: EmailConstants.entitySchemaName,
		attributes: {
			"Opportunity": {
				"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
				lookupListConfig: {
					columns: ["Contact", "Account"],
					filters: [
						function() {
							var contact = this.get("Contact");
							var account = this.get("Account");
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							if (!this.Ext.isEmpty(contact) || !this.Ext.isEmpty(account)) {
								var byContactOrAccountFilterGroup = Ext.create("Terrasoft.FilterGroup");
								byContactOrAccountFilterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
								if (!this.Ext.isEmpty(contact)) {
									byContactOrAccountFilterGroup.add("FilterByContact",
										this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
											"Contact", contact.value));
								}
								if (!this.Ext.isEmpty(account)) {
									byContactOrAccountFilterGroup.add("FilterByAccount",
										this.Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
											"Account", account.value));
								}
								filterGroup.add("ByContactOrAccountFilterGroup", byContactOrAccountFilterGroup);
							}
							return filterGroup;
						}
					]
				},
				dependencies: [
					{
						columns: ["Opportunity"],
						methodName: "onOpportunityChanged"
					}
				]
			}
		},
		methods: {
			/**
			 * On opportunity changed event handler
			 */
			onOpportunityChanged: function() {
				var opportunity = this.get("Opportunity");
				if (!opportunity) {
					return;
				}
				var account = this.get("Account");
				var contact = this.get("Contact");
				var newAccount = opportunity && opportunity.Account || null;
				var newContact = opportunity && opportunity.Contact || null;
				if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
					if (newAccount) {
						this.set("Account", newAccount);
					} else if (newContact) {
						this.set("Contact", newContact);
					}
				}
			}
		},
		rules: {}
	};
});

define('EmailItemSchemaOrderInSalesResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaOrderInSales", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
    return {
        entitySchemaName: EmailConstants.entitySchemaName,
        methods: {},
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        rules: {
            "Order": {
                "FiltrationOrderByOpportunity": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Opportunity",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Opportunity"
                }
            }
        }
    };
});

define('EmailItemSchemaOpportunityInvoiceResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("EmailItemSchemaOpportunityInvoice", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
    return {
        entitySchemaName: EmailConstants.entitySchemaName,
        methods: {},
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        rules: {
            "Invoice": {
                "FiltrationInvoiceByOpportunity": {
                    "ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
                    "autocomplete": true,
                    "autoClean": true,
                    "baseAttributePatch": "Opportunity",
                    "comparisonType": Terrasoft.ComparisonType.EQUAL,
                    "type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                    "attribute": "Opportunity"
                }
            }
        }
    };
});

define("EmailItemSchema", ["BusinessRuleModule", "EmailConstants"], function(BusinessRuleModule, EmailConstants) {
	return {
		entitySchemaName: EmailConstants.entitySchemaName,
		methods: {},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		rules: {
			"Document": {
				"FiltrationDocumentByOpportunity": {
					"ruleType": BusinessRuleModule.enums.RuleType.FILTRATION,
					"autocomplete": true,
					"autoClean": true,
					"baseAttributePatch": "Opportunity",
					"comparisonType": Terrasoft.ComparisonType.EQUAL,
					"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
					"attribute": "Opportunity"
				}
			}
		}
	};
});


