Terrasoft.configuration.Structures["FullPipelinePropertiesItemModule"] = {innerHierarchyStack: ["FullPipelinePropertiesItemModule"]};
 define("FullPipelinePropertiesItemModule", ["css!FullPipelinePropertiesItemModule"], function() {
	 Ext.define("Terrasoft.configuration.FullPipelinePropertiesItemModule", {
		 extend: "Terrasoft.BaseSchemaModule",
		 alternateClassName: "Terrasoft.FullPipelinePropertiesItemModule",

		 /**
		  * Schema name.
		  */
		 schemaName: "FullPipelineDesignerPropertiesItem",

		 /**
		  * @inheritDoc Terrasoft.BaseSchemaModule#useHistoryState
		  * @override
		  */
		 useHistoryState: false,

		 /**
		  * @inheritDoc Terrasoft.BaseSchemaModule#isSchemaConfigInitialized
		  * @override
		  */
		 isSchemaConfigInitialized: true,

		 /**
		  * @inheritDoc Terrasoft.BaseSchemaModule#getViewContainerId
		  * @override
		  */
		 getViewContainerId: function() {
			 var id = this.callParent(arguments);
			 var entitySchemaName = this._getEntitySchemaName();
			 return entitySchemaName + id;
		 },

		 /**
		  * @inheritDoc Terrasoft.BaseSchemaModule#getElementsPrefix
		  * @override
		  */
		 getElementsPrefix: function() {
			 return this._getEntitySchemaName();
		 },

		 /**
		  * Returns entity schema name.
		  * @return {String} Entity schema name.
		  * @private
		  */
		 _getEntitySchemaName: function() {
			 return this.parameters.viewModelConfig.SchemaName;
		 }

	 });

	 return Terrasoft.FullPipelinePropertiesItemModule;

 });


