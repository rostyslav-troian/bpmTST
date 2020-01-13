Terrasoft.configuration.Structures["SysModuleEditManagerItem"] = {innerHierarchyStack: ["SysModuleEditManagerItem"]};
define("SysModuleEditManagerItem", ["SysModuleEditManagerItemResources"], function() {

	/**
	 * ##### ######## ######### ######## ##### #######.
	 */
	Ext.define("Terrasoft.manager.SysModuleEditManagerItem", {
		extend: "Terrasoft.manager.ObjectManagerItem",
		alternateClassName: "Terrasoft.SysModuleEditManagerItem",

		// region Properties: Private

		/**
		 * ############# entity ##### #######.
		 * @private
		 * @type {Object}
		 */
		sysModuleEntity: null,

		/**
		 * ############# ##### ########.
		 * @private
		 * @type {String}
		 */
		cardSchemaUId: null,

		/**
		 * ######## ####### #### ########.
		 * @private
		 * @type {String}
		 */
		typeColumnValue: null,

		/**
		 * ####### ############# ####### #######.
		 * @private
		 * @type {Boolean}
		 */
		useModuleDetails: null,

		/**
		 * ####### ########.
		 * @private
		 * @type {Number}
		 */
		position: null,

		/**
		 * ############# #######.
		 * @private
		 * @type {String}
		 */
		helpContextId: null,

		/**
		 * ######### ########.
		 * @private
		 * @type {String}
		 */
		actionKindCaption: null,

		/**
		 * ######## ########.
		 * @private
		 * @type {String}
		 */
		actionKindName: null,

		/**
		 * ######### ########.
		 * @private
		 * @type {String}
		 */
		pageCaption: null,

		/**
		 * Mini page schema uid.
		 */
		miniPageSchemaUId: null,

		/**
		 * Mini page schema modes. Values of enum Terrasoft.ConfigurationEnums.CardOperation joins by ";".
		 */
		miniPageModes: null,

		// endregion

		// region Methods: Public

		/**
		 * ##### ########## ######## ############## entity ##### #######.
		 * @return {String} ########## ######## ############## entity ##### #######.
		 */
		getSysModuleEntityId: function() {
			var sysModuleEntity = this.getPropertyValue("sysModuleEntity");
			return sysModuleEntity && sysModuleEntity.value;
		},

		/**
		 * ##### ############# ######## ############## entity ##### #######.
		 * @param {String} value ############## entity ##### #######.
		 */
		setSysModuleEntityId: function(value) {
			this.setPropertyValue("sysModuleEntity", {
				value: value,
				displayValue: ""
			});
		},

		/**
		 * ##### ########## ######## ############## ##### ########.
		 * @return {String} ########## ######## ############## ##### ########.
		 */
		getCardSchemaUId: function() {
			return this.getPropertyValue("cardSchemaUId");
		},

		/**
		 * ##### ############# ######## ############## ##### ########.
		 * @param {String} value ############## ##### ########.
		 */
		setCardSchemaUId: function(value) {
			this.setPropertyValue("cardSchemaUId", value);
		},

		/**
		 * ##### ########## ######## ####### #### ########.
		 * @return {String} ########## ######## ####### #### ########.
		 */
		getTypeColumnValue: function() {
			return this.getPropertyValue("typeColumnValue");
		},

		/**
		 * ##### ############# ######## ####### #### ########.
		 * @param {String} value ######## ####### #### ########.
		 */
		setTypeColumnValue: function(value) {
			this.setPropertyValue("typeColumnValue", value);
		},

		/**
		 * ##### ########## ####### ############# ####### #######.
		 * @return {String} ########## ####### ############# ####### #######.
		 */
		getUseModuleDetails: function() {
			return this.getPropertyValue("useModuleDetails");
		},

		/**
		 * ##### ############# ####### ############# ####### #######.
		 * @param {String} value ####### ############# ####### #######.
		 */
		setUseModuleDetails: function(value) {
			this.setPropertyValue("useModuleDetails", value);
		},

		/**
		 * ##### ########## ####### ########.
		 * @return {String} ########## ####### ########.
		 */
		getPosition: function() {
			return this.getPropertyValue("position");
		},

		/**
		 * ##### ############# ####### ########.
		 * @param {String} value ####### ########.
		 */
		setPosition: function(value) {
			this.setPropertyValue("position", value);
		},

		/**
		 * ##### ########## ############# #######.
		 * @return {String} ########## ############# #######.
		 */
		getНelpContextId: function() {
			return this.getPropertyValue("helpContextId");
		},

		/**
		 * ##### ############# ############# #######.
		 * @param {String} value ############# #######.
		 */
		setHelpContextId: function(value) {
			this.setPropertyValue("helpContextId", value);
		},

		/**
		 * ##### ########## ######### ########.
		 * @return {String} ########## ######### ########.
		 */
		getActionKindCaption: function() {
			return this.getPropertyValue("actionKindCaption");
		},

		/**
		 * ##### ############# ######### ########.
		 * @param {String} value ######### ########.
		 */
		setActionKindCaption: function(value) {
			this.setPropertyValue("actionKindCaption", value);
		},

		/**
		 * ##### ########## ######## ########.
		 * @return {String} ########## ######## ########.
		 */
		getActionKindName: function() {
			return this.getPropertyValue("actionKindName");
		},

		/**
		 * ##### ############# ######## ########.
		 * @param {String} value ######## ########.
		 */
		setActionKindName: function(value) {
			this.setPropertyValue("actionKindName", value);
		},

		/**
		 * ##### ########## ######### ########.
		 * @return {String} ########## ######### ########.
		 */
		getPageCaption: function() {
			return this.getPropertyValue("pageCaption");
		},

		/**
		 * ##### ############# ######### ########.
		 * @param {String} value ######### ########.
		 */
		setPageCaption: function(value) {
			this.setPropertyValue("pageCaption", value);
		},

		/**
		 * Returns mini page schema uid.
		 * @return {String}
		 */
		getMiniPageSchemaUId: function() {
			return this.getPropertyValue("miniPageSchemaUId");
		},

		/**
		 * Set mini page schema uid.
		 * @param {String}
		 */
		setMiniPageSchemaUId: function(value) {
			this.setPropertyValue("miniPageSchemaUId", value);
		},

		/**
		 * Returns mini page modes.
		 * @return {String}
		 */
		getMiniPageModes: function() {
			return this.getPropertyValue("miniPageModes");
		},

		/**
		 * Set mini page modes.
		 * @param {String}
		 */
		setMiniPageModes: function(value) {
			this.setPropertyValue("miniPageModes", value);
		}

		// endregion

	});

	return Terrasoft.SysModuleEditManagerItem;

});


