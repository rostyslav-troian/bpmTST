Terrasoft.configuration.Structures["BaseMacroListItemViewModel"] = {innerHierarchyStack: ["BaseMacroListItemViewModel"]};
define('BaseMacroListItemViewModelStructure', ['BaseMacroListItemViewModelResources'], function(resources) {return {schemaUId:'b19f8fd7-3e22-45a8-b747-29051c7a9703',schemaCaption: "BaseMacroListItemViewModel", parentSchemaName: "", schemaName:'BaseMacroListItemViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseMacroListItemViewModel", ["BaseParameterListItemViewModelResources"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.BaseMacroListItemViewModel
		 */
		Ext.define("Terrasoft.configuration.BaseMacroListItemViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.BaseMacroListItemViewModel",
			attributes: {
				/**
				 * Macro value.
				 * @type {Object}
				 */
				"Value": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Macro value type.
				 * @type {String}
				 */
				"DataValueType": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},

				/**
				 * Macro name.
				 * @type {String}
				 */
				"Name": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				}
			},
			/**
			 * Prefix for control marker value.
			 * @type {String}
			 */
			markerValuePrefix: "macro-value",
			/**
			 * Postfix for container marker value.
			 * @type {String}
			 */
			markerValuePostfix: "macro-container",
			
			/**
			 * Returns container marker value.
			 * @protected
			 * @returns {String} Marker value.
			 */
			getContainerMarkerValue: function() {
				return this.$Name + "-" + this.markerValuePostfix;
			},

			/**
			 * Returns control marker value.
			 * @protected
			 * @returns {String} Marker value.
			 */
			getControlMarkerValue: function() {
				return this.markerValuePrefix + "-" + this.$Name;
			},

			/**
			 * Returns value of macro.
			 * @public
			 * @returns {String} View config.
			 */
			getMacroValue: function() {
				return this.$Value;
			},

			/**
			 * Returns config of macro input view.
			 * @protected
			 * @returns {Array[Object]} Macro input view config.
			 */
			getMacroInputConfig: function() {
				return [
					{
						className: "Terrasoft.Label",
						caption: "$Name"
					},
					{
						className: "Terrasoft.TextEdit",
						value: "$Value",
						markerValue: this.getControlMarkerValue()
					}
				];
			},

			/**
			 * Returns config of current item view.
			 * @public
			 * @returns {Object} View config.
			 */
			getViewConfig: function() {
				return {
					id: "macro",
					className: "Terrasoft.Container",
					markerValue: this.getContainerMarkerValue(),
					classes: {
						wrapClassName: ["macro-item-container"]
					},
					items: [
						{
							className: "Terrasoft.Container",
							classes: {
								wrapClassName: ["macro-input-container"]
							},
							items: this.getMacroInputConfig()
						}
					]
				};
			}
		});
		return Terrasoft.BaseParameterListItemViewModel;
	}
);


