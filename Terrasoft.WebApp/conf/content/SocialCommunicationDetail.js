Terrasoft.configuration.Structures["SocialCommunicationDetail"] = {innerHierarchyStack: ["SocialCommunicationDetailSocialNetworkIntegration", "SocialCommunicationDetail"], structureParent: "BaseCommunicationDetail"};
define('SocialCommunicationDetailSocialNetworkIntegrationStructure', ['SocialCommunicationDetailSocialNetworkIntegrationResources'], function(resources) {return {schemaUId:'0be20b07-bf7b-400d-a35e-c449064ca4c3',schemaCaption: "SocialCommunicationDetail", parentSchemaName: "BaseCommunicationDetail", schemaName:'SocialCommunicationDetailSocialNetworkIntegration',parentSchemaUId:'ea5d6815-6645-4962-bde0-440932d31441',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialCommunicationDetailStructure', ['SocialCommunicationDetailResources'], function(resources) {return {schemaUId:'1071ffad-f4c7-4a7b-8dda-b0990731208d',schemaCaption: "SocialCommunicationDetail", parentSchemaName: "SocialCommunicationDetailSocialNetworkIntegration", schemaName:'SocialCommunicationDetail',parentSchemaUId:'0be20b07-bf7b-400d-a35e-c449064ca4c3',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"SocialCommunicationDetailSocialNetworkIntegration",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('SocialCommunicationDetailSocialNetworkIntegrationResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("SocialCommunicationDetailSocialNetworkIntegration", ["ConfigurationConstants", "BaseCommunicationDetail",
		"SocialCommunicationViewModel"], function(ConfigurationConstants) {
	return {
		attributes: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#IsNewItemFocused
			 * @overridden
			 */
			"IsNewItemFocused": {
				value: false
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getCommunicationItemViewConfig
			 * @overridden
			 */
			getCommunicationItemViewConfig: function() {
				var itemViewConfig = this.callParent(arguments);
				var checkBoxEditConfig = this.getCheckBoxEditConfig();
				itemViewConfig.items.splice(0, 0, checkBoxEditConfig);
				return itemViewConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getIconTypeButtonConfig
			 * @overridden
			 */
			getIconTypeButtonConfig: function() {
				var iconTypeButtonConfig = this.callParent(arguments);
				iconTypeButtonConfig.enabled = false;
				return iconTypeButtonConfig;
			},

			/**
			 * Gets checkbox edit configuration.
			 * @protected
			 * @return {Object}
			 */
			getCheckBoxEditConfig: function() {
				return {
					className: "Terrasoft.CheckBoxEdit",
					checkedchanged: {bindTo: "onSelectItem"},
					checked: true,
					markerValue: {
						bindTo: "getCheckBoxEditMarkerValue"
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#save
			 * @overridden
			 */
			save: function() {
				var collection = this.get("Collection");
				var deletedItems = this.get("DeletedItems");
				collection.each(function(item) {
					if (!item.isDeleted) {
						return;
					}
					collection.removeByKey(item.get(item.primaryColumnName));
					deletedItems.addItem(item);
				}, this);
				return this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#initQueryFilters
			 * @overridden
			 */
			initQueryFilters: function(esq) {
				this.callParent(arguments);
				var notSocialNetworkCommunicationFilter = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL,
					"[ComTypebyCommunication:CommunicationType:CommunicationType].Communication",
					ConfigurationConstants.Communication.SocialNetwork);
				esq.filters.addItem(notSocialNetworkCommunicationFilter);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getCommunicationViewModelClassName
			 * @overridden
			 */
			getCommunicationViewModelClassName: function() {
				return "Terrasoft.SocialCommunicationViewModel";
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#addDeleteMenuItem
			 * @overridden
			 */
			addDeleteMenuItem: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseGridDetailV2#initDetailOptions
			 * @overridden
			 */
			initDetailOptions: function() {
				this.callParent(arguments);
				this.set("IsDetailCollapsed", false);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getTypeButtonConfig
			 * @overridden
			 */
			getTypeButtonConfig: function() {
				var typeButtonConfig = this.callParent(arguments);
				typeButtonConfig.style = {
					bindTo: "getTypeButtonStyle"
				};
				return typeButtonConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getItemsToValidate
			 * @overridden
			 */
			getItemsToValidate: function() {
				var collection = this.get("Collection");
				return collection.filter(function(item) {
					return !item.isDeleted;
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#syncDetailWithMasterEntity
			 * @overridden
			 */
			syncDetailWithMasterEntity: Terrasoft.emptyFn

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "AddButton"
			},
			{
				"operation": "remove",
				"name": "SocialNetworksContainer"
			}
		]/**SCHEMA_DIFF*/
	};
});

define("SocialCommunicationDetail", ["ConfigurationConstants", "FacebookSocialCommunicationViewModel"],
		function(ConfigurationConstants) {
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
			}
		},
		methods: {

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#getCommunicationViewModelClassName
			 * @overridden
			 */
			getCommunicationViewModelClassName: function() {
				return "Terrasoft.FacebookSocialCommunicationViewModel";
			},

			/**
			 * @private
			 * @param config
			 */
			addSocialInformation: function(config) {
				var socialInfoSet = config.information;
				if (!socialInfoSet) {
					return;
				}
				if (!this.Ext.isArray(socialInfoSet)) {
					socialInfoSet = [socialInfoSet];
				}
				this.Terrasoft.each(socialInfoSet, function(socialInfo) {
					var splitter = config.splitter;
					var communicationType = config.communicationType;
					var socialNetworkType = config.socialNetworkType;
					if (splitter) {
						this.Terrasoft.each(socialInfo.split(splitter), function(number) {
							this.addSocialCommunicationItem(number, communicationType, socialNetworkType);
						}, this);
					} else {
						this.addSocialCommunicationItem(socialInfo, communicationType, socialNetworkType)
					}
				}, this);
			},

			addSocialCommunicationItem: function(number, communicationType, socialNetworkType) {
				if (!number) {
					return;
				}
				var communication = this.addItem(communicationType);
				communication.set("Number", number);
				communication.set("SocialNetworkType", socialNetworkType);
			},

			/**
			 * @protected
			 * @param {String|Array} webInformation ########## # ############## ######## ## ######## #######.
			 */
			addWebInformation: function(webInformation) {
				this.addSocialInformation({
					information: webInformation,
					communicationType: ConfigurationConstants.CommunicationTypes.Web,
					socialNetworkType: ConfigurationConstants.CommunicationTypes.Facebook,
					splitter: " "
				});
			},

			addEmailInformation: function(emailInformation) {
				this.addSocialInformation({
					information: emailInformation,
					communicationType: ConfigurationConstants.CommunicationTypes.Email,
					socialNetworkType: ConfigurationConstants.CommunicationTypes.Facebook,
					splitter: " "
				});
			},

			addPhoneInformation: function(phoneInformation) {
				this.addSocialInformation({
					information: phoneInformation,
					socialNetworkType: ConfigurationConstants.CommunicationTypes.Facebook,
					splitter: ", "
				});
			},

			/**
			 * ########## ####### ######## ###### ## ########## #####.
			 * @param {Object} facebookEntities ###### ## ########## #####.
			 * @param {String} facebookEntities.website ##### #####.
			 * @param {String} facebookEntities.phone #######.
			 * @param {Array} facebookEntities.emails ###### ########### #######.
			 */
			onSocialNetworkDataLoaded: function(facebookEntities) {
				if (!facebookEntities) {
					return;
				}
				this.Terrasoft.each(facebookEntities, function(facebookEntity) {
					this.addWebInformation(facebookEntity.website);
					this.addPhoneInformation(facebookEntity.phone);
					this.addEmailInformation(facebookEntity.email);
					this.addEmailInformation(facebookEntity.emails);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BaseCommunicationDetail#onContainerListDataLoaded
			 * @overridden
			 */
			onContainerListDataLoaded: function() {
				this.callParent(arguments);
				var communications = this.sandbox.publish("GetSocialNetworkData");
				if (!communications) {
					this.sandbox.subscribe("SocialNetworkDataLoaded", this.onSocialNetworkDataLoaded, this);
				} else {
					this.onSocialNetworkDataLoaded(communications);
				}
			}
		}
	};
});


