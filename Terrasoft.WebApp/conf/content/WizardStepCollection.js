Terrasoft.configuration.Structures["WizardStepCollection"] = {innerHierarchyStack: ["WizardStepCollection"]};
define('WizardStepCollectionStructure', ['WizardStepCollectionResources'], function(resources) {return {schemaUId:'27d7cf7e-9298-4ffb-9eec-2231eed4c0db',schemaCaption: "Wizard step collection view model", parentSchemaName: "", schemaName:'WizardStepCollection',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * @class Terrasoft.configuration.WizardStepCollection
 * ##### ###### ############# ######### ##### #######.
 */
Ext.define("Terrasoft.configuration.WizardStepCollection", {
	extend: "Terrasoft.BaseViewModelCollection",
	alternateClassName: "Terrasoft.WizardStepCollection",

	/**
	 * ### ###### ############# ####.
	 */
	itemViewModelName: "Terrasoft.WizardStep",

	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			"itemClick",
			"itemSelect"
		);
	},

	/**
	 * ########### ####### ######### ######## #########.
	 * @param {Terrasoft.WizardStep} item ####### #########.
	 */
	subscribeItemEvent: function(item) {
		this.callParent(arguments);
		item.on("click", this.onItemClick, this);
		item.on("select", this.onItemSelect, this);
	},

	/**
	 * ########## ####### ######### ######## #########.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.WizardStep} item ####### #########.
	 */
	unsubscribeItemEvent: function(item) {
		this.callParent(arguments);
		item.un("click", this.onItemClick, this);
		item.un("select", this.onItemSelect, this);
	},

	/**
	 * ############ ####### ## ###### ####.
	 * @protected
	 * @virtual
	 * @param {String} clickedItemName ### ####.
	 */
	onItemClick: function(clickedItemName) {
		this.fireEvent("itemClick", clickedItemName);
	},

	/**
	 * ############ ######### ####.
	 * @protected
	 * @virtual
	 * @param {String} selectedItemName ### ########### ####.
	 */
	onItemSelect: function(selectedItemName) {
		this.fireEvent("itemSelect", selectedItemName);
	},

	/**
	 * ####### ########## ########### ####.
	 * @protected
	 * @virtual
	 * @param {Terrasoft.WizardStep} item ####### #########.
	 * @return {Terrasoft.WizardStep} ########## ###.
	 */
	selectedFilterFn: function(item) {
		return item.isSelected();
	},

	/**
	 * ########## ###### ######## ####.
	 * @protected
	 * @virtual
	 * @return {Number} ###### ######## ####.
	 */
	getCurrentItemIndex: function() {
		var currentItem = this.getCurrentItem();
		return this.indexOf(currentItem);
	},

	/**
	 * ########## ####### ###.
	 * @protected
	 * @virtual
	 * @return {Terrasoft.WizardStep} ####### ###.
	 */
	getCurrentItem: function() {
		var currentItem = null;
		this.each(function(item, key) {
			var result = this.selectedFilterFn(item, key);
			if (result) {
				currentItem = item;
			}
			return !result;
		}, this);
		return currentItem;
	},

	/**
	 * ########## ########## ### ## ######### ##### # ########.
	 * @protected
	 * @virtual
	 */
	previous: function() {
		var index = this.getCurrentItemIndex();
		var item = this.findPreviousItem(index);
		if (item) {
			item.click();
		}
	},

	/**
	 * Finds previous item.
	 * @param {int} index Index of collection.
	 * @return {Terrasoft.WizardStep|null}
	 */
	findPreviousItem: function(index) {
		var item = null;
		if (index > 0) {
			index--;
			item = this.getByIndex(index);
			if (!item.canUseStep()) {
				item = this.findPreviousItem(index);
			}
		}
		return item;
	},

	/**
	 * Finds next item.
	 * @param {int} index Index of collection.
	 * @return {Terrasoft.WizardStep|null}
	 */
	findNextItem: function(index) {
		var item = null;
		if (index < (this.getCount() -1)) {
			index++;
			item = this.getByIndex(index);
			if (!item.canUseStep()) {
				item = this.findNextItem(index);
			}
		}
		return item;
	},

	/**
	 * ########## ######### ### ## ######### ##### # ########.
	 * @protected
	 * @virtual
	 */
	next: function() {
		var index = this.getCurrentItemIndex();
		var item = this.findNextItem(index);
		if (item) {
			item.click();
		}
	},

	/**
	 * ####### ###### ############# ####.
	 * @protected
	 * @virtual
	 * @param {Object} columnValues ################ ###### ####.
	 */
	createItem: function(columnValues) {
		var config = columnValues.config;
		var stepViewModelClassName = config && config.viewModelClassName || this.itemViewModelName;
		var item = Ext.create(stepViewModelClassName, {
			values: columnValues,
			rowConfig: this.rowConfig
		});
		item.init();
		return item;
	}
});


