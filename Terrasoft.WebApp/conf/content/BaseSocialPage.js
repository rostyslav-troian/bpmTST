Terrasoft.configuration.Structures["BaseSocialPage"] = {innerHierarchyStack: ["BaseSocialPageSocialNetworkIntegration", "BaseSocialPage"], structureParent: "BasePageV2"};
define('BaseSocialPageSocialNetworkIntegrationStructure', ['BaseSocialPageSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'0adaeb38-7bc0-45fa-b4dd-2c675479bc12',schemaCaption: "Base schema - Population page", parentSchemaName: "BasePageV2", schemaName:'BaseSocialPageSocialNetworkIntegration',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSocialPageStructure', ['BaseSocialPageResources'], function(resources) {return {schemaUId:'a13d63e5-1590-4c75-b863-8b86b9d60020',schemaCaption: "Base schema - Population page", parentSchemaName: "BaseSocialPageSocialNetworkIntegration", schemaName:'BaseSocialPage',parentSchemaUId:'0adaeb38-7bc0-45fa-b4dd-2c675479bc12',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSocialPageSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSocialPageSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSocialPageSocialNetworkIntegration", ["css!SocialSearch"], function() {
	return {
		messages: {

			/**
			 * ######### # ############# ######### ###### ## ########## #####.
			 */
			"GetSocialNetworkData": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * ########## ## ######### ######## ###### ## ########## #####.
			 */
			"SocialNetworkDataLoaded": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#subscribeSandboxEvents
			 * @overridden
			 */
			subscribeSandboxEvents: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("GetSocialNetworkData", this.getSocialNetworkData, this);
			},

			/**
			 * ########## ####### ######## ###### ## ########## #####.
			 * @protected
			 * @return {Object} ######## ##### ## ########## #####.
			 */
			getSocialNetworkData: function() {
				return this.get("SocialCommunications");
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent([function() {
					this.initSocialPage();
					callback.call(scope);
				}, this]);
			},

			/**
			 * ############## ######### ######### ######## ########## ###### ## ###. #####.
			 * @private
			 */
			initSocialPage: function() {
				this.set("ContactImages", Ext.create("Terrasoft.Collection"));
				this.set("IsChanged", true);
				this.set("CaptionName", this.entitySchema.caption);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @overridden
			 */
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.loadSocialProfileInfo();
			},

			/**
			 * ######### ########## ## ########## #####.
			 * @protected
			 * @virtual
			 */
			loadSocialProfileInfo: this.Terrasoft.emptyFn,

			/**
			 * ############ ###### ######## ########## ## ########## #####.
			 * @protected
			 * @virtual
			 */
			socialProfileInfoLoaded: this.Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getHeader
			 * @overridden
			 */
			getHeader: function() {
				return this.get("Resources.Strings.HeaderCaption");
			},

			/**
			 * ############# ######## ########### ###### #########, ###### # #######.
			 * @private
			 */
			updateButtonsVisibility: function() {
				this.set("ShowCloseButton", false);
				this.set("ShowSaveButton", true);
				this.set("ShowDiscardButton", true);
				this.set("ActionsButtonVisible", false);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onDiscardChangesClick
			 * @overridden
			 */
			onDiscardChangesClick: function() {
				this.onCloseClick();
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onSaved
			 * @overridden
			 */
			onSaved: function() {
				this.callParent(arguments);
				this.onCloseClick();
			}

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "RightContainer"
			},
			{
				"operation": "remove",
				"name": "TabsContainer"
			},
			{
				"operation": "insert",
				"parentName": "CardContentContainer",
				"propertyName": "items",
				"name": "HeaderMessage",
				"values": {
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Resources.Strings.SelectValuesFieldsOrFillFieldsByHand"},
					"labelConfig": {
						"classes": ["header-container-margin-bottom", "width-auto"]
					}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});

define("BaseSocialPage", ["ConfigurationConstants", "CommunicationUtils", "FacebookClientUtilities"],
		function(ConfigurationConstants, CommunicationUtils) {
	return {
		mixins: {
			/**
			 * @class FacebookClientUtilities ######### ####### ###### ###### # ###. ##### facebook.
			 */
			FacebookClientUtilities: "Terrasoft.FacebookClientUtilities"
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseSocialPage#loadSocialProfileInfo
			 * @overridden
			 */
			loadSocialProfileInfo: function() {
				this.getFacebookConnector(function(connector) {
					this.getFacebookProfiles(function(facebookIds) {
						var nodesConfig = this.getFacebookProfileInfoConfig(facebookIds);
						connector.getNodesData(nodesConfig, this.socialProfileInfoLoaded, this);
					}, this);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSocialPage#socialProfileInfoLoaded
			 * @overridden
			 */
			socialProfileInfoLoaded: function(response) {
				this.callParent(arguments);
				if (response.success) {
					var entities = response.entities;
					this.set("SocialCommunications", entities);
					this.sandbox.publish("SocialNetworkDataLoaded", entities);
					this.updateNotes(entities);
				}
			},

			/**
			 * ######## ###### Facebook-###############, ########### # ############## #######.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			getFacebookProfiles: function(callback, scope) {
				var esq = this.getFacebookProfilesESQ();
				esq.addColumn("SocialMediaId");
				esq.addColumn("Number");
				var entityFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, this.entitySchema.name, this.get(this.primaryColumnName));
				esq.filters.addItem(entityFilter);
				var typeFilter = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"CommunicationType",
						ConfigurationConstants.CommunicationTypes.Facebook);
				esq.filters.addItem(typeFilter);
				esq.getEntityCollection(function(response) {
					if (!response.success) {
						var errorInfo = response.errorInfo;
						throw new Terrasoft.UnknownException({
							message: errorInfo.message
						});
					}
					var collection = response.collection;
					var socialMediaIds = [];
					collection.each(function(item) {
						var socialMediaId = item.get("SocialMediaId");
						var link = item.get("Number");
						if (socialMediaId) {
							socialMediaIds.push(socialMediaId);
						} else if (CommunicationUtils.isFacebookProfileLink(link)) {
							socialMediaIds.push(CommunicationUtils.formatFacebookProfileLink(link));
						}
					}, this);
					callback.call(scope, socialMediaIds);
				}, this);
			},

			/**
			 * ########## ############ ### ######### ###### # #######.
			 * @protected
			 * @param {Array} facebookIds ###### Facebook-############### ### ############ ############ ########.
			 * @return {Object} ############ ### ######### ###### # #######.
			 */
			getFacebookProfileInfoConfig: function(facebookIds) {
				if (!facebookIds || facebookIds.length === 0) {
					throw new Terrasoft.ArgumentNullOrEmptyException({
						argumentName: "FacebookId"
					});
				}
				return {
					nodes: facebookIds,
					fields: [
						{
							name: "about"
						},
						{
							name: "emails"
						},
						{
							name: "email"
						},
						{
							name: "phone"
						},
						{
							name: "website"
						},
						{
							name: "location",
							options: [
								{
									name: "country"
								},
								{
									name: "state"
								},
								{
									name: "region"
								},
								{
									name: "city"
								},
								{
									name: "street"
								},
								{
									name: "zip"
								},
								{
									name: "located_in"
								},
								{
									name: "latitude"
								},
								{
									name: "longitude"
								},
								{
									name: "name"
								}
							]
						},
						{
							name: "birthday"
						},
						{
							name: "founded"
						},
						{
							name: "picture",
							options: [
								{
									name: "type",
									value: "large"
								},
								{
									name: "width",
									value: "100"
								},
								{
									name: "height",
									value: "100"
								}
							]
						}
					]
				};
			},

			/**
			 * ######### ##########.
			 * @protected
			 * @param {Array} facebookEntities ########## ## ####### ####### Facebook.
			 */
			updateNotes: function(facebookEntities) {
				var facebookNotesTemplate = this.get("Resources.Strings.FacebookNotesTemplate");
				var currentNotes = this.get("Notes") || "";
				this.Terrasoft.each(facebookEntities, function(facebookEntity) {
					var about = facebookEntity.about;
					if (!about) {
						return;
					}
					currentNotes = this.Ext.String.format(facebookNotesTemplate, about) + currentNotes;
				}, this);
				this.set("Notes", currentNotes);
			},

			getFacebookProfilesESQ: Terrasoft.abstractFn
		}
	};
});


