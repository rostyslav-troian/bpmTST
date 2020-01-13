Terrasoft.configuration.Structures["ProcessLookupPageMixin"] = {innerHierarchyStack: ["ProcessLookupPageMixin"]};
define("ProcessLookupPageMixin", ["ModalBox", "ProcessLookupPageMixinResources"], function(ModalBox, resources) {
	/**
	 * Mixin for the lookup page.
	 */
	Ext.define("Terrasoft.configuration.mixins.ProcessLookupPageMixin", {
		alternateClassName: "Terrasoft.ProcessLookupPageMixin",

		/**
		 * Returns modal box settings.
		 * @protected
		 * @return {Object} Modal box settings.
		 */
		getModalBoxConfig: function() {
			return {
				widthPixels: 820,
				heightPixels: 600,
				boxClasses: ["process-lookup-modal-box"]
			};
		},

		/**
		 * Returns ModalBox captions for the specified selection mode.
		 * @param {Boolean} isMultiSelect Multiple selection flag.
		 * @protected
		 */
		getModalBoxCaption: function(isMultiSelect) {
			var localizableStrings = resources.localizableStrings;
			if (isMultiSelect) {
				return localizableStrings.MultiSelectLookupPageCaption;
			} else {
				return localizableStrings.SingleSelectLookupPageCaption;
			}
		},

		/**
		 * Shows lookup page for select columns to save in parameter RecordColumnValues.
		 * @protected
		 * @param {Terrasoft.Collection} entityColumns Current entity column list.
		 * @param {Object} [config] Initial config.
		 */
		showEntitySchemaColumnSelectPage: function(entityColumns, config) {
			var schemaName = "ProcessLookupPage";
			var pageId = this.sandbox.id + schemaName;
			config = config || {isMultiSelect: true};
			var captionModalBox = this.getModalBoxCaption(config.isMultiSelect);
			var parametersInfo = {
				schemaName: schemaName,
				modalBoxCaption: captionModalBox,
			        parameters: {
					FilteredCollection: entityColumns,
					IsMultiSelect: config.isMultiSelect
				}
			};
			this.sandbox.subscribe("GetParametersInfo", function() {
				return parametersInfo;
			}, this, [pageId]);
			this.showProcessLookupPage(pageId);
		},

		/**
		 * Shows process lookup page.
		 * @param pageId
		 */
		showProcessLookupPage: function(pageId) {
			var innerBoxContainer = ModalBox.show(this.getModalBoxConfig());
			this.sandbox.loadModule("ProcessLookupModule", {
				renderTo: innerBoxContainer.id,
				id: pageId
			});
		},

		/**
		 * Closes lookup page for select columns.
		 * @protected
		 */
		closeSchemaColumnSelectPage: function() {
			ModalBox.close();
		}
	});
	return Terrasoft.ProcessLookupPageMixin;
});


