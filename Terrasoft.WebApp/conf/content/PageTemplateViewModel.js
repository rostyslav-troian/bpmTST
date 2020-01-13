Terrasoft.configuration.Structures["PageTemplateViewModel"] = {innerHierarchyStack: ["PageTemplateViewModel"]};
define("PageTemplateViewModel", ["PageTemplateViewModelResources"], function(resources) {
	Ext.define("Terrasoft.PageTemplateViewModel", {
		extend: "Terrasoft.BaseViewModel",

		columns: {
			IsSelected: {
				value: false
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#primaryImageColumnName
		 * @override
		 */
		primaryImageColumnName: "PreviewImage",

		/**
		 * @private
		 */
		_getDefaultPreviewImage: function() {
			return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefaultTemplate);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"pageTemplateSelect"
			);
		},

		/**
		 * Returns template item image config.
		 * @return {Object}
		 */
		getTemplateItemImageConfig: function() {
			var url = this.getSchemaImageUrl() || this._getDefaultPreviewImage();
			return {
				source: Terrasoft.ImageSources.URL,
				url: url
			};
		},

		/**
		 * Handler of page template container click.
		 */
		onPageTemplateClick: function() {
			this.fireEvent("pageTemplateSelect", this);
		}

	});

	return Terrasoft.PageTemplateViewModel;
});


