Terrasoft.configuration.Structures["OpportunityContactDetailV2"] = {innerHierarchyStack: ["OpportunityContactDetailV2Opportunity", "OpportunityContactDetailV2"], structureParent: "BaseGridDetailV2"};
define('OpportunityContactDetailV2OpportunityStructure', ['OpportunityContactDetailV2OpportunityResources'], function(resources) {return {schemaUId:'388fa0b8-4536-4ff0-8253-7208b7e8432f',schemaCaption: "OpportunityContactDetailV2", parentSchemaName: "BaseGridDetailV2", schemaName:'OpportunityContactDetailV2Opportunity',parentSchemaUId:'01eb38ee-668a-42f0-999d-c2534f979089',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityContactDetailV2Structure', ['OpportunityContactDetailV2Resources'], function(resources) {return {schemaUId:'dbf60806-c9e3-47cc-b66b-fbb771de3501',schemaCaption: "OpportunityContactDetailV2", parentSchemaName: "OpportunityContactDetailV2Opportunity", schemaName:'OpportunityContactDetailV2',parentSchemaUId:'388fa0b8-4536-4ff0-8253-7208b7e8432f',extendParent:true,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"OpportunityContactDetailV2Opportunity",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('OpportunityContactDetailV2OpportunityResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("OpportunityContactDetailV2Opportunity", [],
		function() {
			return {
				entitySchemaName: "OpportunityContact",
				messages: {
					"RefreshDecisionMaker": {
						"mode": Terrasoft.MessageMode.PTP,
						"direction": Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				methods: {
					/**
					 * @inheritDoc Terrasoft.BaseDetailV2#updateDetail
					 * @override
					 */
					updateDetail: function() {
						this.callParent(arguments);
						this.sandbox.publish("RefreshDecisionMaker", {}, [this.sandbox.id]);
					},

					/**
					 * @inheritDoc Terrasoft.BaseDetailV2#updateDetail
					 * @override
					 */
					getAddRecordButtonVisible: function() {
						var cardPageName = this.get("CardPageName");
						return (cardPageName === "OpportunityPageV2") && this.getToolsVisible();
					},

					/**
					 * @inheritDoc Terrasoft.BaseDetailV2#updateDetail
					 * @override
					 */
					getGridDataColumns: function() {
						return {
							"Contact.Name": {path:  "Contact.Name"}
						};
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "merge",
						"name": "DataGrid",
						"values": {
							"type": "listed",
							"primaryDisplayColumnName": "Contact.Name",
							"listedConfig": {
								"name": "DataGridListedConfig",
								"items": [
									{
										"name": "TitleListedGridColumn",
										"bindTo": "Opportunity",
										"position": {
											"column": 1,
											"colSpan": 12
										},
										"type": this.Terrasoft.GridCellType.TITLE
									},
									{
										"name": "StageListedGridColumn",
										"bindTo": "Opportunity.Stage",
										"position": {
											"column": 13,
											"colSpan": 6
										}
									},
									{
										"name": "RevenueListedGridColumn",
										"bindTo": "Opportunity.Amount",
										"position": {
											"column": 19,
											"colSpan": 6
										}
									}
								]
							},
							"tiledConfig": {
								"name": "DataGridTiledConfig",
								"grid": {
									"columns": 24,
									"rows": 3
								},
								"items": [
									{
										"name": "TitleTiledGridColumn",
										"bindTo": "Opportunity",
										"position": {
											"row": 1,
											"column": 1,
											"colSpan": 24
										},
										"type": this.Terrasoft.GridCellType.TITLE
									},
									{
										"name": "StageTiledGridColumn",
										"bindTo": "Opportunity.Stage",
										"position": {
											"row": 2,
											"column": 1,
											"colSpan": 8
										}
									},
									{
										"name": "OwnerTiledGridColumn",
										"bindTo": "Opportunity.Owner",
										"position": {
											"row": 2,
											"column": 9,
											"colSpan": 10
										}
									},
									{
										"name": "RevenueTiledGridColumn",
										"bindTo": "Opportunity.Amount",
										"position": {
											"row": 2,
											"column": 19,
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

define("OpportunityContactDetailV2", [],
	function() {
		return {
			entitySchemaName: "OpportunityContact",
			attributes: {
				"CustomColumnLinkHandlers": {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				/**
				 * Indicates that the user has SSP connection.
				 */
				"IsSspUser": {
					"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
					"value": Terrasoft.isCurrentUserSsp()
				},

				/**
				 * Open card method pointer to execute after master card saved.
				 */
				"OpenCardMethod": {
					"dataValueType": this.Terrasoft.DataValueType.OBJECT
				}
			},
			messages: {
				/**
				 * @message ContactSaved
				 * Notification when contact was changed and saved.
				 * @param {String} contactId Identifier of saved contact.
				 */
				"ContactSaved": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			methods: {

				/**
				 * @inheritDoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function() {
					this._initCustomColumnLinkHandlers();
					this.callParent(arguments);
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#subscribeSandboxEvents
				 * @override
				 */
				subscribeSandboxEvents: function() {
					this.sandbox.subscribe("ContactSaved", this.onContactSaved, this, [this.sandbox.id]);
					this.callParent(arguments);
				},

				/**
				 * Opens page with created new contact.
				 * @param {Object} result Result of saving contact.
				 */
				onContactSaved: function(result) {
					if (result.CardMode === Terrasoft.ConfigurationEnums.CardOperation.ADD) {
						this.openContactInOpportunityPage(result.Id);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#getAddRecordButtonVisible
				 * @override
				 */
				getAddRecordButtonVisible: function() {
					return this.$IsSspUser ? false : this.callParent(arguments);
				},

				/**
				 * AddContactButton button Click handler.
				 */
				onAddContactButtonClick: function() {
					this.saveMasterCard(this.openContactLookup, this);
				},

				/**
				 * CreateContactButton button Click handler.
				 */
				onCreateContactButtonClick: function() {
					this.saveMasterCard(this.createContactClick, this);
				},

				/**
				 * Save master card.
				 * @param {Function|null} callback Callback function on success master card saving.
				 * @param {Object|null} scope Scope for callback function.
				 */
				saveMasterCard: function(callback, scope) {
					if (!this.getIsCardValid()) {
						return;
					}
					const isNewCard = this.getIsCardNewRecordState();
					const isCardChanged = this.getIsCardChanged();
					if (isNewCard || isCardChanged) {
						const args = {
							isSilent: true,
							messageTags: [this.sandbox.id]
						};
						this.set("OpenCardMethod", callback);
						this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					} else {
						Ext.callback(callback, scope || this);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#onCardSaved
				 * @override
				 */
				onCardSaved: function() {
					if (!this.get("IsSspUser")) {
						this.callParent(arguments);
						return;
					}
					const callback = this.get("OpenCardMethod");
					Ext.callback(callback, this);
				},

				/**
				 * Open lookup for contact choosing to add new record.
				 */
				openContactLookup: function() {
					const opportunityAccount = this.sandbox.publish("GetColumnsValues", ["Account"], [this.sandbox.id]);
					const lookupConfig = {
						entitySchemaName: "Contact",
						multiSelect: false,
						hideActions: true
					};
					if (opportunityAccount && opportunityAccount.Account && opportunityAccount.Account.value) {
						lookupConfig.filters = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Account", opportunityAccount.Account.value);
					}
					this.openLookup(lookupConfig, this.openContactInOpportunityPageWithSelectedContact, this);
				},

				/**
				 * Opens page with selected contact.
				 * @param {Object} result Lookup result.
				 * @param {Terrasoft.Collection} result.selectedRows Selected rows collection.
				 */
				openContactInOpportunityPageWithSelectedContact: function(result) {
					const item = result.selectedRows.first();
					const contactId = item && item.Id;
					this.openContactInOpportunityPage(contactId);
				},

				/**
				 * Opens page with contact.
				 * @param {Mixed} contactId Contact identifier.
				 * @protected
				 */
				openContactInOpportunityPage: function(contactId) {
					const opportunityContactValues = [];
					if (this.isNotEmpty(contactId)) {
						opportunityContactValues.push({
							"name": "Contact",
							"value": contactId
						});
					}
					opportunityContactValues.push({
						"name": "Opportunity",
						"value": this.$MasterRecordId
					});
					const config = {
						"schemaName": "OpportunityContactPageV2",
						"moduleId": this._getOpportunityContactPageId(),
						"isSeparateMode": false,
						"operation": this.Terrasoft.ConfigurationEnums.CardOperation.ADD,
						"defaultValues": opportunityContactValues
					};
					this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
				},

				/**
				 * @private
				 */
				_initCustomColumnLinkHandlers: function() {
					const linkHandlersCollection = this.Ext.create("Terrasoft.Collection");
					linkHandlersCollection.add("Contact", "onContactLinkClick");
					this.set("CustomColumnLinkHandlers", linkHandlersCollection);
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#addColumnLink
				 * @override
				 */
				addColumnLink: function(item, column) {
					if (!this.Terrasoft.isCurrentUserSsp()) {
						this.callParent(arguments);
						return;
					}
					const columnPath = column.columnPath;
					const handlers = this.get("CustomColumnLinkHandlers");
					const columnHandler = handlers.find(columnPath);
					if (this.isEmpty(columnHandler)) {
						this.callParent(arguments);
					} else {
						item[columnHandler] = function() {
							const value = this.get(columnPath);
							return {
								caption: value,
								target: "_self",
								title: value,
								url: window.location.hash
							};
						};
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseGridDetailV2#linkClicked
				 * @override
				 */
				linkClicked: function(rowId, columnName) {
					if (this.Terrasoft.isCurrentUserSsp() && this._tryCallCustomColumnHandler(rowId, columnName)) {
						return false;
					}
					return this.callParent(arguments);
				},

				/**
				 * @private
				 */
				_tryCallCustomColumnHandler: function(rowId, columnName) {
					const handlers = this.get("CustomColumnLinkHandlers");
					const columnHandler = handlers.find(columnName);
					let result = false;
					if (this.isNotEmpty(columnHandler) && this.Ext.isFunction(this[columnHandler])) {
						this[columnHandler](rowId, columnName);
						result = true;
					}
					return result;
				},

				/**
				 * Handles click on contact row.
				 * @param {Guid} rowId Row identifier.
				 */
				onContactLinkClick: function(rowId) {
					const data = this.getGridData();
					const row = data.get(rowId);
					this.$RecordToReload = row.$Id;
					this.openContactMiniPage(this.Terrasoft.ConfigurationEnums.CardOperation.EDIT, row.$Contact.value);
				},

				/**
				 * Open mini page for creating contact.
				 */
				createContactClick: function() {
					this.openContactMiniPage(this.Terrasoft.ConfigurationEnums.CardOperation.ADD);
				},

				/**
				 * Opens contact mini page.
				 * @param {Terrasoft.ConfigurationEnums.CardOperation} operation Opening operation.
				 * @param {Guid} [recordId] Row identifier.
				 */
				openContactMiniPage: function(operation, recordId) {
					const config = {
						entitySchemaName: "Contact",
						operation: operation
					};
					if (this.isNotEmpty(recordId)) {
						config.recordId = recordId;
					}
					this.openMiniPage(config);
				},

				/**
				 * Add RecordToReload to defaultValues if it is needed.
				 * @param {Array} defaultValues Default values array.
				 */
				addRecordToReloadDefaultValue: function(defaultValues) {
					if (this.isNotEmpty(this.$RecordToReload)) {
						defaultValues.push({
							RecordToReload: this.$RecordToReload
						});
					}
				},

				/**
				 * Add default values from parent page.
				 * @param {Array} defaultValues Default values array.
				 */
				addOpportunityDefaultValues: function(defaultValues) {
					const opportunityValues = this.sandbox.publish("GetColumnsValues", ["Account"], [this.sandbox.id]);
					if (opportunityValues && opportunityValues.Account && opportunityValues.Account.value) {
						defaultValues.push({
							"name": "Account",
							"value": opportunityValues.Account.value
						});
					}
				},

				/**
				 * Creates default values for contact mini page.
				 * @return {Array} Default values for contact page.
				 */
				setupDefaultValues: function() {
					const defaultValues = [];
					this.addRecordToReloadDefaultValue(defaultValues);
					this.addOpportunityDefaultValues(defaultValues);
					return defaultValues;
				},

				/**
				 * @inheritdoc Terrasoft.MiniPageUtilities#openMiniPage
				 * @override
				 */
				openMiniPage: function(config) {
					if (this.Terrasoft.isCurrentUserSsp() &&
							(config.columnName === "Contact" || config.entitySchemaName === "Contact")) {
						config.miniPageSchemaName = "PortalContactMiniPage";
						config.showDelay =
							config.operation === this.Terrasoft.ConfigurationEnums.CardOperation.EDIT ? 0 : 3000;
						config.valuePairs = this.setupDefaultValues();
					}
					this.callParent(arguments);
				},

				/**
				 * @private
				 */
				_getOpportunityContactPageId: function() {
					return this.sandbox.id + "_OpportunityContactPageV2";
				},

				/**
				 * @inheritdoc Terrasoft.BaseDetailV2#getUpdateDetailSandboxTags
				 * @override
				 */
				getUpdateDetailSandboxTags: function() {
					const tags = this.callParent(arguments);
					tags.push(this._getOpportunityContactPageId());
					return tags;
				}
			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "AddRecord",
					"parentName": "Detail",
					"propertyName": "tools",
					"index": 1,
					"values": {
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"menu": [],
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"visible": {
							"bindTo": "IsSspUser"
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddContactButton",
					"parentName": "AddRecord",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.SelectContactCaption"},
						"click": {"bindTo": "onAddContactButtonClick"}
					}
				},
				{
					"operation": "insert",
					"name": "CreateContactButton",
					"parentName": "AddRecord",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "Resources.Strings.NewContactCaption"},
						"click": {"bindTo": "onCreateContactButtonClick"}
					}
				}
			]/**SCHEMA_DIFF*/
		};
	}
);


