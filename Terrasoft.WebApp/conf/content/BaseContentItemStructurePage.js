Terrasoft.configuration.Structures["BaseContentItemStructurePage"] = {innerHierarchyStack: ["BaseContentItemStructurePage"], structureParent: "ContentItemPropertiesPage"};
define('BaseContentItemStructurePageStructure', ['BaseContentItemStructurePageResources'], function(resources) {return {schemaUId:'3a9c94fb-df94-4c89-bdff-d5f4d7a35844',schemaCaption: "BaseContentItemStructurePage", parentSchemaName: "ContentItemPropertiesPage", schemaName:'BaseContentItemStructurePage',parentSchemaUId:'fe424518-8ce5-46a4-a265-ea8ff4ecd12d',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @extends ContentItemPropertiesPage
  */
define("BaseContentItemStructurePage", ["ContentItemPropertiesPage", "css!BaseContentItemStructurePageCSS",
		"BaseContentStructureItemViewModel", "ContentStructureMixin"],
function() {
	return {
		mixins: {
			structure: "Terrasoft.ContentStructureMixin"
		},
		messages: {
			/**
			 * @message ContentItemAction
			 * Acts on item action.
			 */
			"ContentStructureItemAction": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		attributes: {
			/**
			 * Collection of structure list items' view models.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			StructureItems: {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Ext.create("Terrasoft.BaseViewModelCollection")
			},
			/**
			 * Flag to indicate add new structure item availability.
			 * @type {Boolean}
			 */
			CanAddStructureItem: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			/**
			 * Actual content item styles.
			 * @type {String}
			 */
			Styles: {
				dataValueType: Terrasoft.DataValueType.TEXT,
				onChange: "onStylesChanged"
			}
		},
		properties: {
			/**
			 * Structure item view model names dictionary.
			 * @type {Object.<string, string>}
			 * @abstract
			 */
			itemViewModelNames: Terrasoft.abstractFn,
			/**
			 * Unique sandbox identifier.
			 * @type {String}
			 * @virtual
			 */
			sandboxId: null,
			/**
			 * Maximum number of structure items allowed to add. Null = unlimited.
			 * @type {Number}
			 * @virtual
			 */
			maxAllowedStructureItems: null
		},
		methods: {

			/**
			 * Actualizes structure list items in config.
			 * @protected
			 */
			refreshConfigItems: function() {
				this.$Config.Items = this.$StructureItems.mapArray(function(item) {
					return item.$Config;
				});
				this.sandbox.publish("ContentItemConfigChanged", this.$Config, ["ItemPanel"]);
			},

			/**
			 * Publishes message into the sheet to operate with new structure item.
			 * @protected
			 * @returns {Object} Child item object or any other config.
			 */
			publishItemAction: function(action, data) {
				var result = this.sandbox.publish("ContentStructureItemAction", {
					action: action,
					data: data
				}, [this.sandboxId]);
				return result;
			},

			/**
			 * Prepares config of changes with 3 arrays.
			 * @param {Array} itemsToAdd Array of new structure items that have to be added.
			 * @param {Array} itemsToDelete Array of structure items that have to be deleted.
			 * @param {Array} itemsToUpdate Array of actual structure items that been changed.
			 * @returns {{add: *, update: *, delete: *}}
			 */
			getChangesConfig: function(itemsToAdd, itemsToDelete, itemsToUpdate) {
				return {
					add: itemsToAdd,
					delete: itemsToDelete,
					update: itemsToUpdate
				};
			},

			/**
			 * Returns item values config for view model.
			 * @protected
			 * @param {Object} item Structure item config.
			 * @returns {Object} Structure item view model values config.
			 */
			prepareItemValues: function(item) {
				return this.mixins.structure.prepareItemValues.apply(this, arguments);
			},

			/**
			 * Inits structure list collection.
			 * @protected
			 * @param {Boolean} isReverse Is reverse order applied.
			 */
			initStructureItems: function(isReverse) {
				this.mixins.structure.initStructureItems.apply(this, [isReverse]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#init
			 * @override
			 */
			init: function(callback, scope) {
				this.mixins.structure.initEvents.apply(this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @override
			 */
			onDestroy: function() {
				this.mixins.structure.onDestroy.apply(this);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc ContentItemPropertiesPage#onContentItemConfigChanged
			 * @override
			 */
			onContentItemConfigChanged: function(config) {
				this.callParent(arguments);
				if (config) {
					this.$Config = config;
					this.initStructureItems();
					this.$CanAddStructureItem = this.canAddStructureItem();
					config.Styles = config.Styles || {};
					this.$Styles = JSON.stringify(config.Styles, null, "\t");
				}
			},

			/**
			 * Saves content item style.
			 * @protected
			 */
			onStylesChanged: function() {
				var styles = Ext.JSON.decode(this.$Styles, true);
				Ext.apply(this.$Config, { Styles: styles });
			},

			/**
			 * Handler for select structure item action.
			 * @protected
			 * @param {String} itemId Identifier of structure item to select.
			 */
			onStructureItemSelect: function(itemId) {
				this.publishItemAction("select", itemId);
			},

			/**
			 * Defines if structure item can be added.
			 * @protected
			 * @returns {Boolean}
			 */
			canAddStructureItem: function() {
				if (!this.maxAllowedStructureItems) {
					return true;
				}
				return this.$StructureItems.getCount() < this.maxAllowedStructureItems;
			},

			/**
			 * Adds new structure item.
			 * @protected
			 * @param {String} itemType Child structure item type.
			 * @param {Object} options Adding options.
			 * @returns {Object} Returns created structure item view model or undefined when can't create new item.
			 */
			addStructureItem: function(itemType, options) {
				if (!this.canAddStructureItem()) {
					return undefined;
				}
				var newItem = this.getDefaultStructureItemConfig(itemType);
				var newItemViewModel = this.createStructureItemViewModel(newItem);
				if (options && Number.isInteger(options.position)) {
					this.$StructureItems.insert(options.position, newItem.Id, newItemViewModel);
				} else {
					this.$StructureItems.add(newItem.Id, newItemViewModel);
				}
				this.onStructureItemAdded(newItemViewModel);
				return newItemViewModel;
			},

			/**
			 * Publishes message into the sheet.
			 * @protected
			 * @param {Object} item New structure item view model.
			 */
			onStructureItemAdded: function(item) {
				this.refreshConfigItems();
				var changesConfig = this.getChangesConfig([ item.$Config ], null, null);
				this.publishItemAction("structureChanged", changesConfig);
			},

			/**
			 * Removes structure item and publishes a message into the ContentBuilder.
			 * @protected
			 * @param {String} itemId Identifier of structure item to remove.
			 */
			onStructureItemRemove: function(itemId, skipListActualization) {
				if (!skipListActualization) {
					var viewModelToRemove = this.$StructureItems.get(itemId);
					this.$StructureItems.remove(viewModelToRemove);
					this.refreshConfigItems();
				}
				var itemToDelete = {
					Id: itemId
				};
				var changesConfig = this.getChangesConfig(null, [ itemToDelete ], null);
				this.publishItemAction("structureChanged", changesConfig);
			},

			/**
			 * Handler for structure collection items count change action.
			 * @protected
			 */
			onStructureItemCollectionChanged: function() {
				this.$CanAddStructureItem = this.canAddStructureItem();
				var isItemRemovable = this.$StructureItems.getCount() > 1;
				Terrasoft.each(this.$StructureItems, function(structureItem) {
					structureItem.$IsRemovable = isItemRemovable;
				}, this);
				this.refreshStructureItemCaptions();
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "ContentBlockStructureContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["content-block-structure-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "StructureItemsContainer",
				"propertyName": "items",
				"parentName": "ContentBlockStructureContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["section-constructor-container"]
				}
			},
			{
				"operation": "insert",
				"name": "StructureItemsListLabel",
				"parentName": "StructureItemsContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$Resources.Strings.StructureItemConstructorLabelCaption",
					"classes": {
						"labelClass": ["t-title-label-content-block"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "InlineStructureContainer",
				"parentName": "StructureItemsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["structure-inline-container"]
				}
			},
			{
				"operation": "insert",
				"name": "StructureItemListContainer",
				"parentName": "StructureItemsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "StructureItems",
					"onGetItemConfig": "getStructureItemViewConfig",
					"itemPrefix": "sectionItem",
					"classes": {
						"wrapClassName": ["structure-list-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ActionsStructureWrapContainer",
				"parentName": "StructureItemsContainer",
				"propertyName": "items",
				"values": {
					"items": [],
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["structure-inline-container"]
				}
			},
			{
				"operation": "insert",
				"name": "ActionsStructureContainer",
				"parentName": "ActionsStructureWrapContainer",
				"propertyName": "items",
				"values": {
					"items": [],
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"classes": {
						"wrapClassName": ["structure-actions-grid"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "BlockStylesContainer",
				"propertyName": "items",
				"parentName": "ContentBlockStructureContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"wrapClass": ["block-styles-container"]
				}
			}
		]
	};
});


