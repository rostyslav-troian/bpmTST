Terrasoft.configuration.Structures["ConfigurationBuildWatcher"] = {innerHierarchyStack: ["ConfigurationBuildWatcher"]};
define('ConfigurationBuildWatcherStructure', ['ConfigurationBuildWatcherResources'], function(resources) {return {schemaUId:'cc925ac6-d26a-45a5-a912-096d1a8ec5a5',schemaCaption: "ConfigurationBuildWatcher", parentSchemaName: "", schemaName:'ConfigurationBuildWatcher',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ConfigurationBuildWatcher", [], function() {
	/**
	 * Global search configuration build watcher.
	 */
	Ext.define("Terrasoft.ConfigurationBuildWatcher", {
		extend: "Terrasoft.BaseModule",
		Ext: null,
		sandbox: null,
		Terrasoft: null,

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseViewModule#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE,
				this.onConfigurationBuildMessageReceived, this);
		},

		/**
		 * Handles the message of configuration build process.
		 * @param {Terrasoft.ServerChannel} channel Channel messaging server.
		 * @param {Object} message Channel message.
		 */
		onConfigurationBuildMessageReceived: function(channel, message) {
			if (message.Header && message.Header.Sender === "ConfigurationBuildCompleted") {
				Terrasoft.ConfigurationServiceProvider.callService({
					serviceName: "IndexingConfigService",
					methodName: "SendIndexationConfigs"
				}, Terrasoft.emptyFn, this);
			}
		}

		//endregion

	});

	return Terrasoft.ConfigurationBuildWatcher;
});


