Terrasoft.configuration.Structures["EmptySection"] = {innerHierarchyStack: ["EmptySection"]};
define('EmptySectionStructure', ['EmptySectionResources'], function(resources) {return {schemaUId:'c8a9003d-a52c-4740-9745-96bad65b3193',schemaCaption: "EmptySection", parentSchemaName: "", schemaName:'EmptySection',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("EmptySection", [], function() {
		return {
			entitySchemaName: "BaseLookup",
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
			methods: {
				/**
				* Initializes the initial values of the model.
				* @protected
				* @override
				*/
				init: function() {
					this.callParent(arguments);
					var message = this.get("Resources.Strings.MessageBoxText");
					this.showMessage(message, this.back);
				},

				/**
				 * Shows message.
				 * @protected
				 * @param {String} message Message.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Execution context.
				 */
				showMessage: function(message, callback, scope) {
					this.showConfirmationDialog(message, function() {
						this.Ext.callback(callback, scope || this);
					}, [Terrasoft.MessageBoxButtons.OK]);
				},

				/**
				 * Returns user back to previous history state.
				 * @protected
				 */
				back: function() {
					this.sandbox.publish("BackHistoryState");
					this.hideBodyMask();
				}
			}
		};
	}
);


