Terrasoft.configuration.Structures["AttributeContainerListItemViewModel"] = {innerHierarchyStack: ["AttributeContainerListItemViewModel"]};
define('AttributeContainerListItemViewModelStructure', ['AttributeContainerListItemViewModelResources'], function(resources) {return {schemaUId:'b59852c0-c45b-4cbb-97c1-6ba357607d5c',schemaCaption: "AttributeContainerListItemViewModel", parentSchemaName: "", schemaName:'AttributeContainerListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("AttributeContainerListItemViewModel", ["AttributeContainerListItemViewModelResources"],
	function(resources) {
		/**
		 * @class Terrasoft.Designers.AttributeContainerListItemViewModel
		 */
		Ext.define("Terrasoft.configuration.AttributeContainerListItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.AttributeContainerListItemViewModel",

			attributes: {
				/**
				 * Container list item caption.
				 * @type {String}
				 */
				"Caption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Attribute item object stored in ContentBuilder.Attributes collection.
				 * @type {Object}
				 * {
				 * 		Caption: {String},
				 * 		Value: {String},
				 * 		Index: {Int},
				 * 		TypeId: {Guid},
				 * 		Id: {Guid}
				 * 	}
				 */
				"Item": {
					dataValueType: Terrasoft.DataValueType.OBJECT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			/**
			 * Element id.
			 * @type {Terrasoft.DataValueType.GUID}
			 */
			id: null,

			/**
			 * Custom user object with params.
			 * @type {Object}
			 */
			source: null,

			/**
			 * Parent editable container list.
			 * @type {Terrasoft.ObservableContainerList}
			 */
			containerList: null,

			/**
			 * Constructor which calls base and initialize resources.
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * Initialize resource values from resource object.
			 * @param resourcesObj View model resources object.
			 */
			initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Sets parent container list.
			 * @param {Terrasoft.EditableContainerList} containerList Parent container list.
			 */
			setContainerList: function(containerList) {
				this.containerList = containerList;
			},

			/**
			 * Sets container list item attributes.
			 * @param {Terrasoft.DataValueType.GUID} id Item id.
			 * @param {String} caption Item caption.
			 * @param {Boolean} selected Indicated is item selected.
			 * @param {Object} source Custom user object inside container list item. Store any extra needed
			 * info for item here.
			 * @param {String} moduleId Container list module id owner of the item.
			 * @param {Terrasoft.EditableContainerList} containerList Container list owner of the item.
			 */
			initModel: function(id, caption, selected, source) {
				this.id = id;
				this.source = source;
				this.set("Caption", caption);
				this.set("Item", source);
				this.set("Items", Ext.create("Terrasoft.Collection"));
				this.set("Selected", selected);
			},

			/**
			 * @inheritDoc Terrasoft.BaseSchemaViewModel#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents(
					/**
					 * @event onObservableItemClick
					 * The click event on the list element
					 */
					"onAttributeItemDelete"
				);
			},

			/**
			 * Handles click event on delete button of item.
			 * Publishes delete message.
			 */
			onAttributeDeleteButtonClick: function() {
				this.sandbox.publish("DCAttributeDelete", this.source);
			},

			/**
			 * Returns view config for item of collection.
			 * @returns {Object} View config.
			 */
			getViewConfig: function() {
				return {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: ["attribute-item-container-wrap"]
					},
					items: [
						{
							className: "Terrasoft.Container",
							classes: { wrapClassName: ["attribute-item-container"] },
							items: [
								{
									className: "Terrasoft.Label",
									caption: "$Caption"
								},
								{
									className: "Terrasoft.Button",
									imageConfig: "$Resources.Images.DeleteIcon",
									markerValue: "DeleteAttributeButton",
									style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									click: {"bindTo": "onAttributeDeleteButtonClick"},
									visible: "$Selected"
								}
							]
						}
					]
				};
			}
		});
		return Terrasoft.configuration.AttributeContainerListItemViewModel;
	}
);


