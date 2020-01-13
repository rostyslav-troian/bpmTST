Terrasoft.configuration.Structures["DynamicContentAttributesPropertiesPage"] = {innerHierarchyStack: ["DynamicContentAttributesPropertiesPage"]};
define('DynamicContentAttributesPropertiesPageStructure', ['DynamicContentAttributesPropertiesPageResources'], function(resources) {return {schemaUId:'95bb6373-c9e6-4626-8b81-876b4088978f',schemaCaption: "Dynamic content rules properties page", parentSchemaName: "", schemaName:'DynamicContentAttributesPropertiesPage',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DynamicContentAttributesPropertiesPage", ["DynamicContentAttributesPropertiesPageResources",
		"AttributeContainerListItemViewModel", "ObservableContainerList"],
	function() {
		return {
			modules: {

				/**
				 * Defines module for edit attribute settings.
				 */
				DynamicContentAttributeSettingsModule: {
					moduleId: "DynamicContentAttributeSettingsModule",
					moduleName: "ConfigurationModuleV2",
					config: {
						schemaName: "DynamicContentAttributeSettingsPage",
						isSchemaConfigInitialized: true,
						useHistoryState: false
					}
				}
			},
			messages: {

				/**
				 * Publishes when need add one more attribute to collection.
				 */
				"DCAttributeAdd": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Publishes when selected attribute properties changed.
				 */
				"DCAttributeUpdated": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * Request for delete attribute.
				 */
				"DCAttributeDelete": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},

				/**
				 * Listens when attribute deletes from main attribute collection.
				 */
				"DCAttributeDeleted": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * Gets all attribute items for initialize collection.
				 */
				"GetDCAttributes": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * Sets selected attribute in collection to DynamicContentAttributeSettingsPage for edit.
				 */
				"SetSelectedAttribute": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			attributes: {

				/**
				 * Local collection of attributes. Needs to bind to observable collection.
				 */
				"DCAttributesCollection": {
					"dataValueType": Terrasoft.core.enums.DataValueType.COLLECTION,
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Maximum allowed number of rules.
				 */
				"RulesLimit": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					"value": 7
				},

				/**
				 * Sign for rules count. True when rules count reaches the limit.
				 */
				"IsRulesLimitReached": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			methods: {

				// #region Methods: Private

				_subscribeOnMessages: function() {
					this.sandbox.subscribe("DCAttributeUpdated", this.onAttributeUpdated, this);
					this.sandbox.subscribe("DCAttributeDeleted", this.onAttributeDeleted, this);
				},

				_findAttributeById: function(id) {
					return this.$DCAttributesCollection.findByFn(function(item) {
						return item.$Item.Id === id;
					}, this);
				},

				_attributeToListItemViewModel: function(item) {
					var id = Terrasoft.generateGUID();
					var viewModelItem = this.Ext.create("Terrasoft.AttributeContainerListItemViewModel", {
						values: {
							Caption: item.Caption,
							Id: id,
							Index: item.Index
						}
					});
					viewModelItem.sandbox = this.sandbox;
					viewModelItem.initModel(id, item.Caption, false, item);
					return viewModelItem;
				},

				_setAttributesCollection: function(items) {
					var viewModelCollection = Ext.create("Terrasoft.BaseViewModelCollection");
					Terrasoft.each(items, function(item) {
						var viewModelItem = this._attributeToListItemViewModel(item);
						viewModelCollection.add(item.Index, viewModelItem);
					}, this);
					this.$DCAttributesCollection.clear();
					this.$DCAttributesCollection.loadAll(viewModelCollection);
				},

				_isRulesLimitReached: function(rulesCount) {
					return rulesCount >= this.$RulesLimit;
				},

				// #endregion

				// #region Methods: Protected

				/**
				 * @inheritDoc BaseSchemaViewModel#init
				 * @protected
				 */
				init: function() {
					this.callParent(arguments);
					if (Terrasoft.isEmpty(this.$DCAttributesCollection)) {
						this.$DCAttributesCollection = Ext.create("Terrasoft.BaseViewModelCollection");
						var attributes = this.sandbox.publish("GetDCAttributes");
						this._setAttributesCollection(attributes);
					}
					this.$IsRulesLimitReached = this._isRulesLimitReached(this.$DCAttributesCollection.getCount());
					this._subscribeOnMessages();
				},

				/**
				 * Handles changes of attribute properties.
				 * @protected
				 * @param attribute Instance of attribute model which was changed.
				 */
				onAttributeUpdated: function(attribute) {
					var changedItem = this._findAttributeById(attribute.Id);
					changedItem.$Caption = attribute.Caption;
				},

				/**
				 * Handles DCAttributeDeleted message.
				 * @protected
				 * @param attribute Instence of deleted attribute.
				 */
				onAttributeDeleted: function(attribute) {
					var itemForDeleted = this._findAttributeById(attribute.Id);
					this.$DCAttributesCollection.remove(itemForDeleted);
					this.$IsRulesLimitReached = this._isRulesLimitReached(this.$DCAttributesCollection.getCount());
				},

				/**
				 * Handles add button click for attribute.
				 * @protected
				 */
				onAddAttributeClick: function() {
					var newItem = this.sandbox.publish("DCAttributeAdd");
					var vm = this._attributeToListItemViewModel(newItem);
					Terrasoft.each(this.$DCAttributesCollection, function(attr) {
						attr.$Selected = false;
					}, this);
					this.$DCAttributesCollection.add(vm);
					this.$IsRulesLimitReached = this._isRulesLimitReached(this.$DCAttributesCollection.getCount());
				},

				/**
				 * Handles changin of selected item in ObservableContainerList.
				 * @protected
				 * @param item Selected attribute item.
				 */
				onSelectedItemChanged: function (item) {
					var itemForSend = item === undefined ? undefined : item.$Item;
					this.sandbox.publish("SetSelectedAttribute", itemForSend,
						[this.modules.DynamicContentAttributeSettingsModule.moduleId]);
				}

				// #endregion

			},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "AttributesPropertiesPageContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["dc-properties-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributesContainer",
					"parentName": "AttributesPropertiesPageContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["attributes-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributesLabel",
					"parentName": "AttributesContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.LABEL,
						"caption": "$Resources.Strings.AttributesCollectionLabel",
						"classes": {
							"labelClass": ["t-title-label-dc"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "AttributesContainerList",
					"parentName": "AttributesContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"className": "Terrasoft.ObservableContainerList",
						"collection": "$DCAttributesCollection",
						"classes": {"wrapClassName": ["attributes-container-list"]},
						"idProperty": "Id",
						"rowCssSelector": ".attribute-item-container-wrap.selectable",
						"onSelectedItemChanged" : {"bindTo":"onSelectedItemChanged"},
						"defaultItemConfig": {
							"className": "Terrasoft.Container",
							"classes": {
								"wrapClassName": ["attribute-item-container"]
							},
							"items": [{
								"className": "Terrasoft.Label",
								"caption": "$Caption"
							}]
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddAttributeGroup",
					"parentName": "AttributesPropertiesPageContainer",
					"propertyName": "items",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AddAttributesButton",
					"parentName": "AddAttributeGroup",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 20
						},
						"imageConfig": "$Resources.Images.AddButtonIcon",
						"caption": "$Resources.Strings.AddSegmentButtonCaption",
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"click": "$onAddAttributeClick",
						"enabled": {
							bindTo: "IsRulesLimitReached",
							bindConfig: { converter: "invertBooleanValue" }
						},
						"classes": {
							"wrapperClass": ["add-button-control"]
						}
					}
				},
				{
					"operation": "insert",
					"name": "AddAttributesHint",
					"parentName": "AddAttributeGroup",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 20,
							"row": 0,
							"colSpan": 2
						},
						"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": "$Resources.Strings.MaximumRrulesCountHint",
						"controlConfig": {
							"classes": {
								"wrapperClass": "t-checkbox-information-button"
							},
							"imageConfig": "$Resources.Images.RuleInfoButtonImage",
							"visible": "$IsRulesLimitReached"
						},
						"style": Terrasoft.TipStyle.YELLOW,
						"behaviour": {
							"displayEvent": Terrasoft.controls.TipEnums.displayEvent.HOVER
								| Terrasoft.controls.TipEnums.displayEvent.CLICK
						},
						"tools": []
					}
				},
				{
					"operation": "insert",
					"name": "AttributeSettingsContainerLayout",
					"propertyName": "items",
					"parentName": "AttributesPropertiesPageContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["attribute-settings-container"]
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DynamicContentAttributeSettingsModule",
					"parentName": "AttributeSettingsContainerLayout",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE
					}
				}
			]
		};
	});


