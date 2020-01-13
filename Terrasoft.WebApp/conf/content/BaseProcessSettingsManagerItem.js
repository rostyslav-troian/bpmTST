Terrasoft.configuration.Structures["BaseProcessSettingsManagerItem"] = {innerHierarchyStack: ["BaseProcessSettingsManagerItem"]};
define('BaseProcessSettingsManagerItemStructure', ['BaseProcessSettingsManagerItemResources'], function(resources) {return {schemaUId:'be473753-d447-41c1-8b61-abaed28522c7',schemaCaption: "BaseProcessSettingsManagerItem", parentSchemaName: "", schemaName:'BaseProcessSettingsManagerItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseProcessSettingsManagerItem", [], function() {
	Ext.define("Terrasoft.BaseProcessSettingsManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.BaseProcessSettingsManagerItem",

		/**
		 * Position.
		 * @private
		 * @type {Number}
		 */
		position: null,

		/**
		 * Workplace.
		 * @private
		 * @type {Object}
		 */
		processUId: null,

		/**
		 * Process parameter.
		 * @private
		 * @type {Object}
		 */
		parameterUId: null,

		/**
		 * Process caption.
		 * @private
		 * @type {String}
		 */
		processCaption: null,

		/**
		 * Returns process runner id.
		 * @abstract
		 */
		getProcessRunnerId: Terrasoft.abstractFn,

		/**
		 * Sets process runner id.
		 * @abstract
		 */
		setProcessRunnerId: Terrasoft.abstractFn,

		/**
		 * @inheritdoc Terrasoft.manager.ObjectManagerItem#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			var viewModel = this.dataManagerItem.viewModel;
			viewModel.validationConfig = null;
		},

		/**
		 * Returns process caption.
		 * @returns {String} Process caption.
		 */
		getProcessCaption: function() {
			return this.getPropertyValue("processCaption");
		},

		/**
		 * Sets process caption.
		 * @param value {String} Process caption.
		 */
		setProcessCaption: function(value) {
			this.setPropertyValue("processCaption", value);
		},

		/**
		 * Returns position.
		 * @return {Number} Position.
		 */
		getPosition: function() {
			return this.getPropertyValue("position");
		},

		/**
		 * Sets position.
		 * @param {Number} value New position.
		 */
		setPosition: function(value) {
			this.setPropertyValue("position", value);
		},

		/**
		 * Returns process uId.
		 * @return {String} Process uId.
		 */
		getProcessUId: function() {
			return this.getPropertyValue("processUId");
		},

		/**
		 * Sets process uId.
		 * @param {String} value Process uId.
		 */
		setProcessUId: function(value) {
			this.setPropertyValue("processUId", value);
		},

		/**
		 * Returns process parameter uId.
		 * @return {String} Process parameter uId.
		 */
		getParameterUId: function() {
			return this.getPropertyValue("parameterUId");
		},

		/**
		 * Sets process parameter uId
		 * @param {String} value Process parameter uId.
		 */
		setParameterUId: function(value) {
			this.setPropertyValue("parameterUId", value);
		}
	});
	return Terrasoft.BaseProcessSettingsManagerItem;
});


