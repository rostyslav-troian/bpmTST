Ext.define("Terrasoft.Designers.EmbeddedProcessSchemaDesignerViewModel", {
	extend: "Terrasoft.Designers.ProcessSchemaDesignerViewModel",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaDesignerViewModel",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesignerViewModel#schemaManager
	 * @override
	 */
	schemaManager: Terrasoft.EmbeddedProcessSchemaManager,

	/**
	 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesignerViewModel#urlHashPrefix
	 * @override
	 */
	urlHashPrefix: "entityProcess",

	// endregion

	//region Properties: Public

	/**
	 * Flag specifying that the this schema has a parent process schema.
	 * @type {Boolean}
	 */
	hasParentProcess: false,

	// endregion

	// region Methods: Private

	/**
	 * Opens parent process schema in new designer window.
	 * @private
	 */
	onOpenParentProcessClick: function() {
		if (this.get("hasParentProcess")) {
			const schema = this.get("Schema");
			const url = Terrasoft.workspaceBaseUrl + "/Nui/ViewModule.aspx?vm=SchemaDesigner#entityProcess/" +
				schema.parentOwnerSchemaUId;
			window.open(url);
		}
	},

	/**
	 * @private
	 */
	_containsCaseInsensitive: function(collection, searchKey, isEmbedded) {
		const searchKeyInLowerCase = searchKey.toLowerCase();
		return collection.getKeys().some(function(key) {
			if (isEmbedded) {
				return key.toLowerCase().indexOf(searchKeyInLowerCase) > -1;
			} else {
				return key.toLowerCase() === searchKey.toLowerCase();
			}
		});
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesignerViewModel#onSchemaLoaded
	 * @override
	 * @param {Terrasoft.ProcessSchema} schema Process schema.
	 */
	onSchemaLoaded: function(schema) {
		this.callParent([schema]);
		this.set("hasParentProcess", !!(schema && schema.parentOwnerSchemaUId));
	},

	/**
	 * @inheritdoc Terrasoft.ProcessSchemaDesignerViewModel#onOpenSourceCodeClick
	 * @override
	 */
	onOpenSourceCodeClick: function() {
		var message = Terrasoft.Resources.ProcessSchemaDesigner.Messages.SaveSourceCodeConfirmationMessage;
		this.showSaveConfirmationDialog(message, function() {
			var schema = this.get("Schema");
			Terrasoft.BaseSchemaDesignerUtilities.openEntitySourceCode(schema);
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onOpenMetaDataClick
	 * @override
	 */
	onOpenMetaDataClick: Ext.emptyFn,

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onExportSchemaClick
	 * @override
	 */
	onExportSchemaClick: Ext.emptyFn,

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#onGenerateItemNameAndCaption
	 * @override
	 */
	onGenerateItemNameAndCaption: function(item) {
		const schema = this.get("Schema");
		const items = this.get("Items");
		let index = 1;
		const defName = item.name;
		let key = defName + index;
		const inheritedElements = this.get("Schema").inheritedElements;
		const isEmbedded = schema.isEmbedded;
		while (this._containsCaseInsensitive(items, key, isEmbedded) ||
		this._containsCaseInsensitive(inheritedElements, key, isEmbedded)) {
			index++;
			key = defName + index;
		}
		item.name = key;
		if (isEmbedded) {
			item.name += "_" + Terrasoft.formatGUID(item.uId, "N");
		}
		const cultureValues = item.caption.cultureValues;
		Terrasoft.each(cultureValues, function(value, culture) {
			if (value) {
				cultureValues[culture] = value + " " + index;
			}
		});
		return false;
	},

	/**
	 * @inheritdoc Terrasoft.BaseProcessSchemaDesignerViewModel#showProcessConfirmationDialog
	 * @override
	 */
	showProcessConfirmationDialog: function(title, message, handler, buttons) {
		this.callParent([title, null, handler, buttons]);
	}

	// endregion

});
