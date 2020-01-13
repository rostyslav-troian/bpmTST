Terrasoft.configuration.Structures["EditableContainerListMixin"] = {innerHierarchyStack: ["EditableContainerListMixin"]};
define('EditableContainerListMixinStructure', ['EditableContainerListMixinResources'], function(resources) {return {schemaUId:'d283422d-589e-45ca-87a0-09b6e9be46bb',schemaCaption: "EditableContainerListMixin", parentSchemaName: "", schemaName:'EditableContainerListMixin',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EditableContainerListMixin", ["ext-base", "terrasoft", "EditableContainerListItemViewModel",
	"EditableContainerList"],
	function(Ext, Terrasoft) {
		Ext.define("Terrasoft.configuration.EditableContainerListMixin", {
			alternateClassName: "Terrasoft.EditableContainerListMixin",

			/**
			 * Returns container list items. Calls every time when container list need to update it`s items.
			 * @protected
			 * @abstract
			 * @param {String} moduleId Container list module id.
			 * @returns {Terrasoft.Collection} EditableContainerListItemViewModel items collection.
			 */
			getEditableContainerListItems: Ext.emptyFn,

			/**
			 * Sends update container list items when container list items are changed.
			 * @protected
			 * @abstract
			 * @param {Object} config On change config.
			 * @param {String} config.moduleId Container list module id.
			 * @param {Terrasoft.Collection} config.items Container list items.
			 */
			onContainerListItemsChange: Ext.emptyFn,

			/**
			 * Sends update container list items when container list items are changed.
			 * @protected
			 * @abstract
			 * @returns {Object} Module config.
			 * @returns {Terrasoft.Collection} items Container list items.
			 * @returns {Function} customGetViewConfig Custom function for item view config generator.
			 */
			getInitEditableContainerListItems: Ext.emptyFn,

			/**
			 * Register container list messages.
			 * @protected
			 */
			initContainerListMixin: function() {
				this.sandbox.registerMessages({
					/**
					 * @message InitEditableContainerListItems
					 * On module init, gets items collection.
					 * @param {String} Publisher module id.
					 */
					"InitEditableContainerListItems": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message SetEditableContainerListItems
					 * On module init, gets items collection.
					 * @param {Terrasoft.Collection} Collection of container list items.
					 */
					"SetEditableContainerListItems": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},

					/**
					 * @message OnSelectedItemsChange
					 * Sends new container list items collection, when it changes.
					 * @param {Terrasoft.Collection} Collection of container list items.
					 */
					"OnSelectedItemsChange": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
					},

					/**
					 * @message OnRightIconClick
					 * On container list item clear icon click.
					 */
					"OnActionClick": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					}
				});
			},

			/**
			 * Subscribes for all container list event at once.
			 * @protected
			 * @param {String} moduleId Container list module id on which subscription will be made.
			 */
			subscribeForContainerListEvents: function(moduleId) {
				this.sandbox.subscribe("InitEditableContainerListItems", this.getInitEditableContainerListItems, this,
					[moduleId]);
				this.sandbox.subscribe("OnSelectedItemsChange", this.onContainerListItemsChange, this, [moduleId]);
			},

			/**
			 * Updates container list items using getEditableContainerListItems override.
			 * @protected
			 * @param {String} moduleId Container list module id on which subscription will be made.
			 */
			updateEditableContainerListItems: function(moduleId) {
				var items =  this.getEditableContainerListItems(moduleId);
				this.sandbox.publish("SetEditableContainerListItems", items, [moduleId]);
			},

			/**
			 * Creates container list item with given parameters.
			 * @param {Terrasoft.DataValueType.GUID} id Item id.
			 * @param {String} caption Item caption.
			 * @param {Boolean} selected Indicated is item selected.
			 * @param {Object} persistentObject Custom user object inside container list item. Store any extra needed
			 * info for item here.
			 * @param {String} moduleId Container list module id owner of the item.
			 * @returns {Terrasoft.EditableContainerListItemViewModel} Container list item.
			 */
			createContainerListItem: function(id, caption, selected, persistentObject, moduleId) {
				var item = Ext.create("Terrasoft.EditableContainerListItemViewModel");
				item.setAttributes(id, caption, selected, persistentObject, moduleId);
				return item;
			}
		});
		return Terrasoft.configuration.EditableContainerListMixin;
	}
);


