Terrasoft.configuration.Structures["DynamicContentAttributeLookupItem"] = {innerHierarchyStack: ["DynamicContentAttributeLookupItem"]};
define('DynamicContentAttributeLookupItemStructure', ['DynamicContentAttributeLookupItemResources'], function(resources) {return {schemaUId:'23ef6d77-f577-4b75-a0ca-d68667bd2a23',schemaCaption: "DynamicContentAttributeLookupItem", parentSchemaName: "", schemaName:'DynamicContentAttributeLookupItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * View model for DCAttribute lookup item.
 */
define("DynamicContentAttributeLookupItem", ["DynamicContentAttributeLookupItemResources"],
	function() {
		/**
		 * @class Terrasoft.configuration.DynamicContentAttributeLookupItem
		 */
		Ext.define("Terrasoft.configuration.DynamicContentAttributeLookupItem", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.DynamicContentAttributeLookupItem",

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
				 * Index of binded DCAttribute model.
				 * @type {Number}
				 */
				"Index": {
					dataValueType: Terrasoft.DataValueType.INTEGER,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * State of current attribute lookup item.
				 * @type {Boolean}
				 */
				"Selected": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},

			/**
			 * Parent observable container list.
			 * @type {Terrasoft.ObservableContainerList}
			 */
			containerList: null,

			// #region Methods: Public

			/**
			 * Sets parent container list.
			 * @public
			 * @param {Terrasoft.EditableContainerList} containerList Parent container list.
			 */
			setContainerList: function(containerList) {
				this.containerList = containerList;
			},

			/**
			 * Sets property values by source DCAttribute item object.
			 * @public
			 * @param {Object} item DCAttribute object.
			 */
			init: function(item) {
				this.set("Caption", item.Caption);
				this.set("Index", item.Index);
				this.set("Selected", false);
			},

			/**
			 * Sets current selected state for item.
			 * @public
			 * @param {Boolean} selected Selected state.
			 */
			setSelected: function(selected) {
				this.$Selected = selected;
			},

			/**
			 * Returns class names of wrap container.
			 * @protected
			 * @returns {Array} Class names of wrap container.
			 */
			getWrapClassNames: function() {
				var classes = ["attribute-lookup-item-container"];
				if (this.$Selected) {
					classes.push("selected");
				}
				return classes;
			},

			/**
			 * Returns config of current item view.
			 * @public
			 * @returns {Object} View config.
			 */
			getViewConfig: function() {
				var id = Terrasoft.Component.generateId();
				return {
					className: "Terrasoft.Container",
					classes: {
						wrapClassName: this.getWrapClassNames()
					},
					items: [
						{
							inputId: id,
							className: "Terrasoft.Label",
							caption: "$Caption"
						}
					]
				};
			}

			// #endregion

		});
		return Terrasoft.configuration.DynamicContentAttributeLookupItem;
	}
);


