Terrasoft.configuration.Structures["ServiceMetaItemViewModelMixin"] = {innerHierarchyStack: ["ServiceMetaItemViewModelMixin"]};
define("ServiceMetaItemViewModelMixin", ["ServiceMetaItemViewModelMixinResources"],
function(resources) {

	Ext.define("Terrasoft.ServiceMetaItemViewModelMixin", {

		//region Methods: Private

		/**
		 * @private
		 */
		_prefixValidator: function(schemaName) {
			var message = "";
			var schemaNamePrefix = Terrasoft.ServiceSchemaManager.schemaNamePrefix;
			var prefixReqExp = new RegExp("^" + schemaNamePrefix + ".*$");
			if (!prefixReqExp.test(schemaName)) {
				message = Ext.String.format(resources.localizableStrings.WrongPrefixMessage, schemaNamePrefix);
			}
			return {invalidMessage: message};
		},

		//endregion

		//region Methods: Protected

		/**
		 * @protected
		 */
		duplicateNameValidator: function(schemaName) {
			var message = "";
			Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceUId, function(item) {
				var method = item.methods.findByFn(function(i) { return i.name === schemaName; }, this);
				if (method && method.uId !== this.$Method.uId) {
					message = resources.localizableStrings.DuplicateNameMessage;
				}
			}, this);
			return {invalidMessage: message};
		},

		/**
		 * Adds name validation config
		 * @protected
		 */
		setNameValidationConfig: function() {
			this.addColumnValidator("Name", Terrasoft.MetaItem.nameValidator);
			this.addColumnValidator("Name", this.duplicateNameValidator);
			this.addColumnValidator("Name", this._prefixValidator);
		}

		//endregion

	});

	return Terrasoft.ServiceMetaItemMixin;

});


