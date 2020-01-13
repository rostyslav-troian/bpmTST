Terrasoft.configuration.Structures["EntityColumnLookupMixin"] = {innerHierarchyStack: ["EntityColumnLookupMixin"]};
define("EntityColumnLookupMixin", ["ModalBox", "EntityColumnLookupMixinResources"], function(ModalBox, resources) {
	/**
	 * Mixin for the entity column lookup page.
	 */
	Ext.define("Terrasoft.configuration.mixins.EntityColumnLookupMixin", {
		alternateClassName: "Terrasoft.EntityColumnLookupMixin",

		/**
		 * Shows lookup page.
		 * @private
		 */
		_showColumnLookupPage: function(pageId) {
			const innerBoxContainer = ModalBox.show(this.getModalBoxConfig());
			this.sandbox.loadModule("EntityColumnsModule", {
				renderTo: innerBoxContainer.id,
				id: pageId
			});
		},

		/**
		 * Returns modal box settings.
		 * @protected
		 * @return {Object} Modal box settings.
		 */
		getModalBoxConfig: function() {
			return {
				widthPixels: 820,
				heightPixels: 600,
				boxClasses: ["column-lookup-modal-box"]
			};
		},

		/**
		 * Shows lookup page for select columns to save in parameter RecordColumnValues.
		 * @protected
		 * @param {Terrasoft.Collection} entityColumns Current entity column list.
		 * @param {Object} [config] Initial config.
		 */
		showEntitySchemaColumnSelectPage: function(entityColumns, config) {
			const schemaName = "EntityColumnLookupPage";
			const pageId = this.sandbox.id + schemaName;
			config = config || {isMultiSelect: true};
			let captionModalBox = this.getModalBoxCaption(config.isMultiSelect);
			entityColumns.sort("caption", Terrasoft.OrderDirection.ASC);
			const rootSchema = config.rootSchema;
			if (rootSchema) {
				captionModalBox += ": " + rootSchema.displayValue;
			}
			const lookupInfo = {
				schemaName: schemaName,
				modalBoxCaption: captionModalBox,
				values: {
					"FilteredCollection": entityColumns,
					"IsMultiSelect": config.isMultiSelect
				}
			};
			this.sandbox.subscribe("GetColumnsLookupInfo", function() {
				return lookupInfo;
			}, this, [pageId]);
			this._showColumnLookupPage(pageId);
		},

		/**
		 * Returns ModalBox captions for the specified selection mode.
		 * @param {Boolean} isMultiSelect Multiple selection flag.
		 * @protected
		 */
		getModalBoxCaption: function(isMultiSelect) {
			const localizableStrings = resources.localizableStrings;
			if (isMultiSelect) {
				return localizableStrings.MultiSelectLookupPageCaption;
			} else {
				return localizableStrings.SingleSelectLookupPageCaption;
			}
		},

		/**
		 * Closes lookup page for select columns.
		 * @protected
		 */
		closeSchemaColumnSelectPage: function() {
			ModalBox.close();
		}
	});
	return Terrasoft.EntityColumnLookupMixin;
});


