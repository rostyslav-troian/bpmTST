Terrasoft.configuration.Structures["ProductCatalogueUtilities"] = {innerHierarchyStack: ["ProductCatalogueUtilities"]};
 define("ProductCatalogueUtilities", function() {
	 Ext.define("Terrasoft.configuration.ProductCatalogueUtilities", {
		 extend: "Terrasoft.BaseObject",
		 alternateClassName: "Terrasoft.ProductCatalogueUtilities",

		 //region Methods: Private

		 /**
		  * @private
		  */
		 _getEntitySchemaByName: function(entitySchemaName, callback, scope) {
			 let schema = Terrasoft[entitySchemaName];
			 if (schema) {
				 callback.call(scope || this, schema);
			 } else {
				 Terrasoft.require([entitySchemaName], function(schema) {
					 if (schema) {
						 callback.call(scope || this, schema);
					 }
				 });
			 }
		 },

		 //endregion

		 //region Methods: Public

		 /**
		  * Loads display column name for reference entity of catalogue level.
		  * @param {Terrasoft.Collection} catalogueFolderLevels Collection of catalogue levels.
		  * @param {Function} callback Callback function.
		  * @param {Object} scope Scope of invoke.
		  */
		 loadReferenceDisplayColumnNames: function(catalogueFolderLevels, callback, scope) {
			 const chainAction = [];
			 Terrasoft.each(catalogueFolderLevels, function(item) {
				 chainAction.push(function(next) {
					 this._getEntitySchemaByName(item.$ReferenceSchemaName, next, this);
				 });
				 chainAction.push(function(next, schema) {
					 item.set("ReferenceDisplayColumnName", schema.primaryDisplayColumn.name);
					 next();
				 });
			 }, this);
			 chainAction.push(function() {
				 Ext.callback(callback, scope || this);
			 });
			 Terrasoft.chain.apply(this, chainAction);
		 }

		 //endregion

	 });

	 return Ext.create("Terrasoft.ProductCatalogueUtilities");

 });


