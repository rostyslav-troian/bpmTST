Terrasoft.configuration.Structures["EditableContainerListItemViewModel"] = {innerHierarchyStack: ["EditableContainerListItemViewModel"]};
define('EditableContainerListItemViewModelStructure', ['EditableContainerListItemViewModelResources'], function(resources) {return {schemaUId:'ee4b8a94-7bd9-4d60-907d-043d43f80823',schemaCaption: "EditableContainerListItemViewModel", parentSchemaName: "", schemaName:'EditableContainerListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EditableContainerListItemViewModel", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.Designers.EditableContainerListItemViewModel
		 */
		Ext.define("Terrasoft.configuration.EditableContainerListItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.EditableContainerListItemViewModel",

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
				 * Container list item unique dom id.
				 * @type {String}
				 */
				"DomElementId": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Container list item visibility.
				 * @type {Boolean}
				 */
				"Visible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Data item marker.
				 * @type {String}
				 */
				"MarkerValue": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			/**
			 * Item caption in modal box.
			 * @type {String}
			 */
			caption: "",

			/**
			 * Element id in modal box.
			 * @type {Terrasoft.DataValueType.GUID}
			 */
			id: null,

			/**
			 * Modal box flag for selection.
			 * @type {Boolean}
			 */
			selected: false,

			/**
			 * Custom user object with params.
			 * @type {Object}
			 */
			persistentObject: null,

			/**
			 * Parent editable container list.
			 * @type {Terrasoft.EditableContainerList}
			 */
			containerList: null,

			/**
			 * Hides or shows item both in modal box and container list.
			 * @param {Boolean} selected Visibility flag.
			 */
			setVisibility: function(selected) {
				this.selected = selected;
				this.set("Visible", selected);
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
			 * @param {Object} persistentObject Custom user object inside container list item. Store any extra needed
			 * info for item here.
			 * @param {String} moduleId Container list module id owner of the item.
			 * @param {Terrasoft.EditableContainerList} containerList Container list owner of the item.
			 */
			setAttributes: function(id, caption, selected, persistentObject, moduleId) {
				var dataItemMarker = caption + moduleId + "Item";
				this.id = id;
				this.caption = caption;
				this.persistentObject = persistentObject;
				var domElementId = id + "-" + moduleId;
				this.set("Caption", caption);
				this.set("DomElementId", domElementId);
				this.setVisibility(selected);
				this.set("MarkerValue", dataItemMarker);
			},

			/**
			 * Hides item from container list items and publish OnRightIconClick message.
			 */
			rightIconClick: function() {
				this.setVisibility(false);
				this.containerList.publishOnActionClick("ClearIcon", this);
				this.containerList.publishOnSelectedItemsChange();
			}
		});
		return Terrasoft.configuration.EditableContainerListItemViewModel;
	}
);


