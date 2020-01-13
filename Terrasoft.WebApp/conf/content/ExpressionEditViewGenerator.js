Terrasoft.configuration.Structures["ExpressionEditViewGenerator"] = {innerHierarchyStack: ["ExpressionEditViewGenerator"]};
define("ExpressionEditViewGenerator", ["ViewGeneratorV2", "ExpressionEnums"], function() {
	Ext.define("Terrasoft.configuration.ExpressionEditViewGenerator", {
		extend: "Terrasoft.ViewGenerator",
		alternateClassName: "Terrasoft.ExpressionEditViewGenerator",

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ViewGenerator#getConfigWithoutServiceProperties
		 * @override
		 */
		getConfigWithoutServiceProperties: function(config, serviceProperties) {
			serviceProperties.push("expressionType");
			return this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.ViewGenerator#generateLookupEdit
		 * @override
		 */
		generateLookupEdit: function() {
			var lookupEditConfig = this.callParent(arguments);
			delete lookupEditConfig.loadVocabulary;
			delete lookupEditConfig.change;
			delete lookupEditConfig.href;
			delete lookupEditConfig.linkclick;
			delete lookupEditConfig.linkmouseover;
			return lookupEditConfig;
		},

		// endregion

		// region Methods: Public

		/**
		 * Generates edit item config.
		 * @param {Object} config Input config.
		 * @return {Object} Edit control config.
		 */
		generateEditItem: function(config) {
			const expressionType = config.expressionType;
			let editItem;
			switch (expressionType) {
				case Terrasoft.ExpressionEnums.ExpressionType.ATTRIBUTE:
					config.contentType = Terrasoft.ContentType.ENUM;
					editItem = this.generateLookupEdit(config);
					break;
				case Terrasoft.ExpressionEnums.ExpressionType.SYSVALUE:
					config.contentType = Terrasoft.ContentType.ENUM;
					editItem = this.generateLookupEdit(config);
					break;
				case Terrasoft.ExpressionEnums.ExpressionType.COLUMN:
					editItem = this.generateLookupEdit(config);
					break;
				case Terrasoft.ExpressionEnums.ExpressionType.PARAMETER:
					editItem = config.contentType === Terrasoft.ContentType.LOOKUP
						? this.generateLookupEdit(config)
						: this.generateEnumEdit(config);
					break;
				case Terrasoft.ExpressionEnums.ExpressionType.CONSTANT:
					editItem = Terrasoft.isGUIDDataValueType(config.dataValueType)
						? this.generateTextEdit(config)
						: this.generateEditControl(config);
					break;
				default:
					editItem = this.generateEditControl(config);
			}
			return editItem;
		}

		// endregion

	});
});


