Terrasoft.configuration.Structures["EmailConditionalTransitionPropertiesPage"] = {innerHierarchyStack: ["EmailConditionalTransitionPropertiesPage"], structureParent: "CampaignConditionalSequenceFlowPropertiesPage"};
define('EmailConditionalTransitionPropertiesPageStructure', ['EmailConditionalTransitionPropertiesPageResources'], function(resources) {return {schemaUId:'41d75182-edef-4b82-91dd-80d5d9efa340',schemaCaption: "EmailConditionalTransitionPropertiesPage", parentSchemaName: "CampaignConditionalSequenceFlowPropertiesPage", schemaName:'EmailConditionalTransitionPropertiesPage',parentSchemaUId:'c1d6650d-5a31-454c-9949-f6f3ab801b57',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * EmailConditionalTransitionPropertiesPage edit page schema.
 * Parent: CampaignConditionalSequenceFlowPropertiesPage.
 * Parent: BaseProcessSchemaElementPropertiesPage.
 */
define("EmailConditionalTransitionPropertiesPage", ["BusinessRuleModule", "ModalBox",
	"CampaignEnums"], function(BusinessRuleModule, ModalBox, CampaignEnums) {
		return {
			messages: {

				/**
				 * @message HyperlinkSelected
				 * Reacts on hyperlinks selected action.
				 */
				"HyperlinkSelected": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				},

				/**
				 * @message HyperlinkSelectCancel
				 * Reacts on hyperlinks cancelled selection action.
				 */
				"HyperlinkSelectCancel": {
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
					mode: Terrasoft.MessageMode.PTP
				}
			},
			attributes: {

				/**
				 * Values of lookup for ReactionMode
				 */
				"ReactionModeEnum": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {
						Default: {
							value: "0",
							captionName: "Resources.Strings.ReactionModeDefault"
						},
						WithCondition: {
							value: "1",
							captionName: "Resources.Strings.ReactionModeWithCondition"
						}
					}
				},

				/**
				 * Lookup for ReactionMode
				 */
				"ReactionMode": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isRequired": true
				},

				/**
				 * Condition when email is delivered
				 */
				"IsEmailDelivered": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition when email is opened
				 */
				"IsEmailOpened": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition when link is clicked
				 */
				"IsUrlClicked": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition when email is putted to spam folder
				 */
				"IsEmailPuttedToSpam": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition when user unsubscribed
				 */
				"IsRecipientUnsubscribed": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition when email is undelivered
				 */
				"IsEmailUndelivered": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Collection of bulk email hyperlinks for lookup
				 */
				"HyperlinkCollection": {
					dataValueType: this.Terrasoft.DataValueType.COLLECTION,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: this.Ext.create("Terrasoft.BaseViewModelCollection")
				},

				/**
				 * Columns config of hyperlink data row
				 */
				"HyperlinkRowConfig": {
					dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: {}
				},

				/**
				 * Array of selected BulkEmail hyperlinks
				 */
				"TransitionUrls": {
					"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"isLookup": true,
					"referenceSchemaName": "BulkEmailHyperlink",
					"value": []
				},

				/**
				 * Lookup for selected BulkEmail hyperlink
				 */
				"HyperlinkIds": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": []
				},

				/**
				 * Array of track identifiers of selected BulkEmail hyperlinks
				 */
				"HyperlinkTrackIds": {
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": []
				},

				/**
				 * Text to show when hyperlink lookup items are selected
				 */
				"HyperlinkLookupCaption": {
					"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Condition is hyperlink existed and may be selected
				 */
				"IsUrlClickedEnabled": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			rules: {

				/**
				 * Rule for ReactionConditionDecision
				 */
				"ReactionConditionDecision": {
					"BindReactionConditionDecisionRequiredToReactionMode": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [{
							"leftExpression": {
								"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
								"attribute": "ReactionMode"
							},
							"comparisonType": this.Terrasoft.ComparisonType.EQUAL,
							"rightExpression": {
								"type": BusinessRuleModule.enums.ValueType.CONSTANT,
								"value": "1"
							}
						}]
					}
				}
			},
			methods: {

				/**
				 * Subscribes on sandbox messages.
				 * @private
				 */
				_subscribeOnMessages: function() {
					var hyperlinkLookupModuleId = this._getHyperlinkLookupModuleId();
					this.sandbox.subscribe("HyperlinkSelected", this.onHyperlinkSelected,
						this, [hyperlinkLookupModuleId]);
					this.sandbox.subscribe("HyperlinkSelectCancel", this.closeModalBox,
						this, [hyperlinkLookupModuleId]);
				},

				/**
				 * Returns no hyperlinks hint visibility
				 * @private
				 * @returns {Boolean} True if no hyperlinks to select or  no linked email as source
				 */
				_canShowEmailClickedHint: function() {
					if (!this.getIsReactionModeWithConditions()) {
						return false;
					}
					var isUrlClickedEnabled = this.get("IsUrlClickedEnabled");
					return !isUrlClickedEnabled;
				},

				/**
				 * Returns sandbox id for hyperlink lookup module.
				 * @private
				 * @returns {String} Hyperlink lookup module sandbox id.
				 */
				_getHyperlinkLookupModuleId: function() {
					return this.sandbox.id + "_" + this.id + "_BulkEmailHyperlinkLookupModule";
				},

				/**
				 * Returns true when each hyperlink has a BPM track identifier.
				 * @private
				 * @param {Terrasoft.Collection} hyperlinks Collection of hyperlinks.
				 * @returns {Boolean} true when hyperlinks have a BPM track identifiers.
				 */
				_isContainsBpmTrackId: function(hyperlinks) {
					return Boolean(hyperlinks.findByFn(function(link) {
						return link.$BpmTrackId > 0;
					}));
				},

				/**
				 * Returns collection of grouped by track id hyperlinks.
				 * @private
				 * @param {Terrasoft.Collection} hyperlinks Collection of hyperlinks.
				 * @returns {Terrasoft.Collection} Collection of grouped by track id hyperlinks.
				 */
				_groupLinksByTrackId: function(hyperlinks) {
					var links = this.Ext.create("Terrasoft.BaseViewModelCollection");
					Terrasoft.each(hyperlinks, function(hyperlink) {
						if (links.getKeys().indexOf(hyperlink.$BpmTrackId) === -1) {
							links.add(hyperlink.$BpmTrackId, hyperlink);
						}
					}, this);
					return links;
				},

				/**
				 * Initializes array of selected BulkEmail hyperlinks.
				 * @private
				 * @param {Terrasoft.Collection} hyperlinks Collection of hyperlinks.
				 * @param {Boolean} isContainsBpmTrackId Sign for hyperlinks with BPM track id.
				 */
				_initSelectedHyperlinks: function(hyperlinks, isContainsBpmTrackId) {
					this.$TransitionUrls = []
					var selectedIds = isContainsBpmTrackId ? this.$HyperlinkTrackIds : this.$HyperlinkIds;
					Terrasoft.each(hyperlinks, function(link) {
						var key = isContainsBpmTrackId ? link.$BpmTrackId : link.$Id;
						if (selectedIds.indexOf(key) !== -1) {
							this.$TransitionUrls.push(link);
						}
					}, this);
				},

				/**
				 * Returns values of hyperlinks for lookup.
				 * @private
				 * @returns {Array[Object]} Hyperlinks values for lookup.
				 */
				_getHyperlinksValues: function() {
					var hyperlinks = [];
					Terrasoft.each(this.$HyperlinkCollection, function(hyperlink) {
						hyperlinks.push(hyperlink.values);
					}, this);
					return hyperlinks;
				},

				/**
				 * Returns configuration of hyperlink row for lookup.
				 * @private
				 * @returns {Object} Configuration of hyperlink row for lookup.
				 */
				_getHyperlinkRowConfig: function() {
					var hyperlink = this.$HyperlinkCollection.first();
					return hyperlink && hyperlink.rowConfig;
				},

				/**
				 * Returns string representation of selected email responses
				 * @protected
				 * @param { Boolean } isResponseActive visibility of responses' checkboxes
				 * @return {string} json of selected email response ids
				 */
				getSelectedHyperlinks: function(keyName) {
					return Terrasoft.reduce(this.$TransitionUrls, function(memo, hyperlink) {
						memo.push(hyperlink.get(keyName));
						return memo;
					}, []);
				},

				/**
				 * @inheritdoc Terrasoft.BaseViewModel#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this._subscribeOnMessages();
				},

				/**
				 * @inheritdoc BaseProcessSchemaElementPropertiesPage#initParameters
				 * @override
				 */
				initParameters: function(element) {
					this.callParent(arguments);
					var isResponseBasedStart = element.isResponseBasedStart;
					this.initReactionMode(isResponseBasedStart);
					this.initEmailResponses(element.emailResponseId);
					this.initSelectedHyperlinks(element.hyperlinkId, element.hyperlinkTrackId);
					this.loadHyperlinks(this.onLoadHyperlinks, this);
				},

				/**
				 * Sets Bulk Email hyperlinks in view model.
				 * @private
				 * @param {Object} response Entity schema query response.
				 */
				onLoadHyperlinks: function(response) {
					var hyperlinks = response.collection;
					this.$IsUrlClickedEnabled = hyperlinks.getCount() > 0;
					this.$IsUrlClicked = this.$IsUrlClicked && this.$IsUrlClickedEnabled;
					if (this.$IsUrlClickedEnabled) {
						var isContainsBpmTrackId = this._isContainsBpmTrackId(hyperlinks);
						if (isContainsBpmTrackId) {
							hyperlinks = this._groupLinksByTrackId(hyperlinks);
						}
						this._initSelectedHyperlinks(hyperlinks, isContainsBpmTrackId);
						this.$HyperlinkCollection.clear();
						this.$HyperlinkCollection.loadAll(hyperlinks);
						this.$HyperlinkRowConfig = this._getHyperlinkRowConfig();
					}
					this.$HyperlinkLookupCaption = {
						displayValue: this.getBulkEmailHyperlinksValue(this.$TransitionUrls)
					};
				},

				/**
				 * Loads hyperlinks from Bulk Email.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				loadHyperlinks: function(callback, scope) {
					var sourceElement = this.getSourceElement();
					var bulkEmailId = sourceElement && sourceElement.marketingEmailId;
					if (!bulkEmailId) {
						this.$IsUrlClickedEnabled = this.$IsUrlClicked = false;
						return;
					}
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "BulkEmailHyperlink"
					});
					esq.addColumn("BpmTrackId");
					esq.addColumn("Caption");
					esq.addColumn("Url");
					esq.filters.addItem(Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "BulkEmail", bulkEmailId)
					);
					esq.getEntityCollection(callback, scope);
				},

				/**
				 * Handles "cleariconclick" event of the TransitionUrlsLookup.
				 * Clears "TransitionUrls" and "HyperlinkIds" collection.
				 * @protected
				 */
				onHyperlinksClearButtonClicked: function() {
					this.$TransitionUrls = [];
					this.$HyperlinkIds = [];
					this.$HyperlinkTrackIds = [];
				},

				/**
				 * Config to map const ids of email responses to attributes
				 * @private
				 * @return {object} object for mapping ids to attributes
				 */
				getResponseConfig: function() {
					return {
						"IsEmailDelivered": [CampaignEnums.BulkEmailResponses.DELIVERED],
						"IsEmailOpened": [CampaignEnums.BulkEmailResponses.OPEN],
						"IsUrlClicked": [CampaignEnums.BulkEmailResponses.CLICKS],
						"IsEmailPuttedToSpam": [CampaignEnums.BulkEmailResponses.SPAM_COMPLAINED],
						"IsRecipientUnsubscribed": [CampaignEnums.BulkEmailResponses.UNSUBSCRIBED],
						"IsEmailUndelivered": [CampaignEnums.BulkEmailResponses.HARD_BOUNCE]
					};
				},

				/**
				 * @inheritdoc CampaignConditionalSequenceFlowPropertiesPage#subscribeEvents
				 * @overridden
				 */
				subscribeEvents: function() {
					this.callParent(arguments);
					this.on("change:ReactionMode", this.onReactionModeLookupChanged, this);
				},

				/**
				 * Handles change of the "ReactionMode" property.
				 * @private
				 * @return { void }
				 */
				onReactionModeLookupChanged: function() {
					var reactionModeEnum = this.get("ReactionModeEnum");
					var reactionMode = this.get("ReactionMode");
					var decisionModeEnabled = (reactionMode && reactionMode.value === reactionModeEnum.WithCondition.value);
					if (!decisionModeEnabled) {
						this.set("ReactionConditionDecision", null);
					}
				},

				/**
				 * Returns list of the selected hyperlinks.
				 * @protected
				 */
				getBulkEmailHyperlinksList: function() {
					var hyperlinks = this.$TransitionUrls;
					var captionLength = 60;
					var hint = "";
					var linkTmp = "<a href=\"{0}\" target=\"_blank\">{1}</a>\r\n";
					if (hyperlinks) {
						hint = Terrasoft.reduce(hyperlinks, function(memo, hyperlink) {
							var caption = this.cutString(hyperlink.$Caption, captionLength);
							return memo + Ext.String.format(linkTmp, hyperlink.$Url, caption);
						}, "", this);
					}
					return hint;
				},

				/**
				 * Returns string with concat hyperlinks captions.
				 * @private
				 * @param {Array} items Hyperlinks.
				 * @return {String}
				 */
				getBulkEmailHyperlinksValue: function(items) {
					return Terrasoft.reduce(items, function(memo, hyperlink) {
						return memo + hyperlink.$Caption + "; ";
					}, "");
				},

				/**
				 * Cut text for certain length.
				 * @param {String} strValue Target text.
				 * @param {Number} strLength Length limit.
				 * @private
				 * @return { string } cutted string
				 */
				cutString: function(strValue, strLength) {
					var ellipsis = Ext.String.ellipsis(strValue.substring(strLength), 0);
					return strValue.substring(0, strLength) + ellipsis;
				},

				/**
				 * Initializes value of the "IsEmeilDelivered" property.
				 * @private
				 * @param {Boolean} value Initial value.
				 */
				initIsEmailDelivered: function(value) {
					if (value === undefined) {
						var isEmailDelivered = this.get("IsEmailDelivered");
						value = isEmailDelivered;
					}
					this.set("IsEmailDelivered", value);
				},

				/**
				 * Initializes value of the "IsEmailOpened" property.
				 * @private
				 * @param {Boolean} value Initial value.
				 */
				initIsEmailOpened: function(value) {
					if (value === undefined) {
						var isEmailOpened = this.get("IsEmailOpened");
						value = isEmailOpened;
					}
					this.set("IsEmailOpened", value);
				},

				/**
				 * Initializes value of the "IsUrlClicked" property.
				 * @private
				 * @param {Boolean} value Initial value.
				 */
				initIsUrlClicked: function(value) {
					if (value === undefined) {
						var isUrlClicked = this.get("IsUrlClicked");
						value = isUrlClicked;
					}
					this.set("IsUrlClicked", value);
				},


				/**
				 * Initializes value of the "IsEmailPuttedToSpam" property.
				 * @private
				 * @param {Boolean} value Initial value.
				 */
				initIsEmailPuttedToSpam: function(value) {
					if (value === undefined) {
						var isEmailPuttedToSpam = this.get("IsEmailPuttedToSpam");
						value = isEmailPuttedToSpam;
					}
					this.set("IsEmailPuttedToSpam", value);
				},


				/**
				 * Initializes value of the "IsRecipientUnsubscribed" property.
				 * @private
				 * @param {Boolean} value Initial value.
				 */
				initIsRecipientUnsubscribed: function(value) {
					if (value === undefined) {
						var isRecipientUnsubscribed = this.get("IsRecipientUnsubscribed");
						value = isRecipientUnsubscribed;
					}
					this.set("IsRecipientUnsubscribed", value);
				},


				/**
				* Initializes value of the "IsEmailUndelivered" property.
				* @private
				* @param {Boolean} value Initial value.
				*/
				initIsEmailUndelivered: function(value) {
					if (value === undefined) {
						var isEmailUndelivered = this.get("IsEmailUndelivered");
						value = isEmailUndelivered;
					}
					this.set("IsEmailUndelivered", value);
				},

				/**
				 * For selected emailResponseId set attributes
				 * @param  {string} responseIdsJson json string for emailResponseId
				 * @private
				 */
				initEmailResponses: function(responseIdsJson) {
					if (!responseIdsJson) {
						return;
					}
					var responseIds = JSON.parse(responseIdsJson);
					var config = this.getResponseConfig();
					var self = this;
					Terrasoft.each(config, function(propValue, propName) {
						propValue.forEach(function(el) {
							if (responseIds.indexOf(el) > -1) {
								self.set(propName, true);
							}
						});
					});
				},

				/**
				 * Sets selected hyperlinks
				 * @private
				 * @param  {String} hyperlinkIdsJson json string for selected hyperlinks
				 * @param  {String} hyperlinkTrackIdJson json string for track ids of selected hyperlinks
				 */
				initSelectedHyperlinks: function(hyperlinkIdJson, hyperlinkTrackIdJson) {
					if (!hyperlinkIdJson && !hyperlinkTrackIdJson) {
						return;
					}
					var hyperlinkTrackIds = this.getIds(hyperlinkTrackIdJson);
					if (hyperlinkTrackIds && hyperlinkTrackIds.length > 0) {
						this.$HyperlinkTrackIds = hyperlinkTrackIds;
						return;
					}
					var hyperlinkIds = this.getIds(hyperlinkIdJson);
					if (hyperlinkIds && hyperlinkIds.length > 0) {
						this.$HyperlinkIds = hyperlinkIds;
					}
				},

				/**
				 * Initializes value of the "ReactionMode" property.
				 * @private
				 * @param {String} value Initial value.
				 */
				initReactionMode: function(value) {
					var isDefault = !value;
					this.setLookupValue(isDefault, "ReactionMode",
						"WithCondition", this);
				},

				/**
				 * Returns Array of selected item ids
				 * @private
				 * @param  {string} idsJson json string of selected items
				 * @return {Array[string]} array of selected ids
				 */
				getIds: function(idsJson) {
					if (idsJson) {
						try {
							var ids = JSON.parse(idsJson);
							if (this.Ext.isArray(ids)) {
								return ids;
							}
						} catch (error) {
							return [];
						}
					}
					return [];
				},

				/**
				 * Loads values into user reaction mode combobox.
				 * @protected
				 * @param {Object} filter ComboboxEdit value.
				 * @param {Terrasoft.Collection} list List of comboboxEdit values.
				 */
				onPrepareReactionModeList: function(filter, list) {
					this.prepareList("ReactionModeEnum", list, this);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#saveValues
				 * @override
				 */
				saveValues: function() {
					this.callParent(arguments);
					var element = this.get("ProcessElement");
					var isResponseBasedStart = this.getIsReactionModeWithConditions();
					element.isResponseBasedStart = isResponseBasedStart;
					if (isResponseBasedStart && this.$IsUrlClicked) {
						var isContainsBpmTrackId = this._isContainsBpmTrackId(this.$HyperlinkCollection);
						element.hyperlinkTrackId = isContainsBpmTrackId
							? JSON.stringify(this.getSelectedHyperlinks("BpmTrackId"))
							: JSON.stringify([]);
						element.hyperlinkId = isContainsBpmTrackId
							? JSON.stringify([])
							: JSON.stringify(this.getSelectedHyperlinks("Id"));
					} else {
						element.hyperlinkId = element.hyperlinkTrackId = JSON.stringify([]);
						this.$HyperlinkIds = this.$HyperlinkTrackIds = this.$TransitionUrls = [];
						this.$HyperlinkLookupCaption = { displayValue: "" };
					}
					element.emailResponseId = this.getEmailResponseId(isResponseBasedStart);
				},

				/**
				 * Returns string representation of selected email responses
				 * @param { Boolean } isResponseActive visibility of responses' checkboxes
				 * @private
				 * @return {string} json of selected email response ids
				 */
				getEmailResponseId: function(isResponseActive) {
					var self = this;
					var responseIds = [];
					if (isResponseActive) {
						var config = this.getResponseConfig();
						Terrasoft.each(config, function(propValue, propName) {
							var attrValue = self.get(propName);
							if (attrValue) {
								propValue.forEach(function(el) {
									if (el) {
										responseIds.push(el);
									}
								});
							}
						});
					}
					return JSON.stringify(responseIds);
				},

				/**
				 * @inheritdoc BaseCampaignSchemaElementPage#getContextHelpCode
				 * @overridden
				 */
				getContextHelpCode: function() {
					return "CampaignConditionalSequenceFlow";
				},

				/**
				 * Determines whether the value of the "ReactionMode" is not default value.
				 * @private
				 * @param {String} reactionMode Value of the ReactionMode lookup.
				 * @return {Boolean}
				 */
				getIsReactionModeWithConditions: function() {
					return this.isLookupValueEqual("ReactionMode", "1", this);
				},

				/**
				 * Returns left element for this sequence flow
				 * @protected
				 * @return {Terrasoft.CampaignSchemaElement} sourse element for transition
				 */
				getSourceElement: function() {
					var flowElement = this.get("ProcessElement");
					if (flowElement) {
						return flowElement.findSourceElement();
					}
					return null;
				},

				/**
				 * Determines whether the IsUrlTransaction checkbox checked.
				 * @private
				 * @return {Boolean} is urlclicked checked
				 */
				getIsUrlClickedChecked: function() {
					var urlTransition = this.get("IsUrlClicked");
					if (urlTransition) {
						var element = this.getSourceElement();
						if (element && element.marketingEmailId) {
							var isUrlClickedEnabled = this.get("IsUrlClickedEnabled");
							return this.getIsReactionModeWithConditions() && isUrlClickedEnabled;
						}
					}
					return false;
				},

				/**
				 * Gets hyperlink lookup config
				 * @protected
				 * @deprecated
				 * @return {object} lookup config object
				 */
				getHyperlinkLookupConfig: function() {
					var selectedValues = this.getSelectedIds();
					var config = this.getLookupConfig();
					config.selectedValues = selectedValues;
					config.multiSelect = true;
					config.entitySchemaName = "BulkEmailHyperlink";
					var filters = this.getCustomLookupFilters();
					if (filters) {
						config.filters = filters;
					}
					return config;
				},

				/**
				 * Inits custom lookup filters
				 * @protected
				 * @deprecated
				 * @return {object} custom lookup filters
				 */
				getCustomLookupFilters: function() {
					var filters = Terrasoft.createFilterGroup();
					var element = this.getSourceElement();
					if (element && element.marketingEmailId) {
						filters.addItem(Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "BulkEmail", element.marketingEmailId)
						);
					}
					return filters;
				},

				/**
				 * Returns Ids of selected hyperlinks.
				 * @private
				 * @deprecated
				 * @return {Array} selected hyperlink ids array
				 */
				getSelectedIds: function() {
					return Terrasoft.reduce(this.get("TransitionUrls"), function(memo, hyperlink) {
						memo.push(hyperlink.Id);
						return memo;
					}, []);
				},

				/**
				 * Loads hyperlinks lookup
				 * @protected
				 */
				loadBulkEmailHyperlinkSchemaLookup: function() {
					var moduleId = this._getHyperlinkLookupModuleId();
					var sourceElement = this.getSourceElement();
					var bulkEmailId = sourceElement && sourceElement.marketingEmailId;
					var selectedLinks = this.getSelectedHyperlinks("Id");
					var modalBoxContainer = ModalBox.show({
						heightPixels: 600,
						widthPixels: 820,
						boxClasses: ["hl-modal-box"]
					}, function() {
						this.sandbox.unloadModule(moduleId, modalBoxContainer.id);
					}, this);
					this.sandbox.loadModule("BulkEmailHyperlinkLookupModule", {
						renderTo: modalBoxContainer.id,
						id: moduleId ,
						keepAlive: false,
						parameters: {
							viewModelConfig: {
								BulkEmailId: bulkEmailId,
								Hyperlinks: this._getHyperlinksValues(),
								RowConfig: this.$HyperlinkRowConfig,
								SelectedItems: selectedLinks || []
							}
						}
					});
				},

				/**
				 * Handles select of hyperlinks event.
				 * @protected
				 * @param {Terrasoft.Collection} hyperlinks Collection of selected hyperlinks.
				 */
				onHyperlinkSelected: function(hyperlinks) {
					ModalBox.close();
					var links = hyperlinks.getItems();
					this.$TransitionUrls = links;
					this.$HyperlinkLookupCaption = {
						displayValue: this.getBulkEmailHyperlinksValue(links)
					};
				},

				/**
				 * Handles cancel select hyperlink event.
				 * Closes modal box.
				 * @public
				 */
				closeModalBox: function() {
					ModalBox.close();
				},

				/**
				 * Creates caption with element name
				 * @protected
				 * @return {string} custom caption with element name
				 */
				getQuestionCaption: function() {
					var caption = this.get("Resources.Strings.ReactionModeCaption");
					caption = this.Ext.String.format(caption, this.getSourceElement().getCaption());
					return caption;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "ReactionContainer",
					"propertyName": "items",
					"parentName": "ContentContainer",
					"className": "Terrasoft.GridLayoutEdit",
					"values": {
						"layout": {"column": 0, "row": 2, "colSpan": 24},
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ReactionModeLabel",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "getQuestionCaption"
						},
						"classes": {
							"labelClass": ["t-title-label-proc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ReactionMode",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.ENUM,
						"controlConfig": {
							"prepareList": {
								"bindTo": "onPrepareReactionModeList"
							}
						},
						"isRequired": true,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"wrapClass": ["no-caption-control"]
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsEmailDelivered",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsEmailDelivered"
						},
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 22
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsEmailOpened",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsEmailOpened"
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 22
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsUrlClicked",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsUrlClicked"
						},
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 22
						},
						"enabled": {
							"bindTo": "IsUrlClickedEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "NoHyperlinkInformationButton",
					"values": {
						"layout": {"column": 22, "row": 4, "colSpan": 1},
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {"bindTo": "Resources.Strings.NoHyperlinkHintMessage"},
						"controlConfig": {
							"classes": {
								"wrapperClass": "t-checkbox-information-button"
							},
							"visible": {
								"bindTo": "_canShowEmailClickedHint"
							}
						}
					}
				},
				{
					"operation": "insert",
					"name": "UrlLabel",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 2,
							"row": 5,
							"colSpan": 14
						},
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.TransitionUrlCaption"
						},
						"classes": {
							"labelClass": ["label-control"]
						},
						"visible": {
							"bindTo": "getIsUrlClickedChecked"
						}
					}
				},
				{
					"operation": "insert",
					"name": "TransitionUrls",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "TransitionUrls",
						"visible": "$getIsUrlClickedChecked",
						"labelConfig": {
							"visible": false
						},
						"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
						"wrapClass": ["no-caption-control"],
						"layout": {
							"column": 16,
							"row": 5,
							"colSpan": 12
						},
						"controlConfig": {
							"loadVocabulary": "$loadBulkEmailHyperlinkSchemaLookup"
						},
						"cleariconclick": "$onHyperlinksClearButtonClicked",
						"value": "$HyperlinkLookupCaption",
						"hint": "$getBulkEmailHyperlinksList"
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsEmailPuttedToSpam",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsEmailPuttedToSpam"
						},
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 22
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsRecipientUnsubscribed",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsRecipientUnsubscribed"
						},
						"layout": {
							"column": 0,
							"row": 7,
							"colSpan": 22
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ReactionContainer",
					"propertyName": "items",
					"name": "IsEmailUndelivered",
					"values": {
						"wrapClass": ["t-checkbox-control"],
						"visible": {
							"bindTo": "ReactionMode",
							"bindConfig": {
								converter: "getIsReactionModeWithConditions"
							}
						},
						"caption": {
							"bindTo": "Resources.Strings.IsEmailUndelivered"
						},
						"layout": {
							"column": 0,
							"row": 8,
							"colSpan": 22
						}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


