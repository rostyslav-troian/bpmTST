Terrasoft.configuration.Structures["ContentElementManager"] = {innerHierarchyStack: ["ContentElementManager"]};
define("ContentElementManager", ["ContentElementManagerResources"], function(resources) {

	/**
	 * Class for ContentElementManager.
	 */
	Ext.define("Terrasoft.configuration.ContentElementManager", {
		extend: "Terrasoft.core.BaseObject",
		alternateClassName: "Terrasoft.ContentElementManager",

		// region Methods: Public

		/**
		 * Returns items collection for grid content builder config state.
		 * @return {Terrasoft.core.collections.Collection}
		 */
		getGridItems: function() {
			const localizableStrings = resources.localizableStrings;
			const localizableImages = resources.localizableImages;
			const items = [
				{
					Type: "html",
					DesignTimeConfig: {
						Caption: localizableStrings.HtmlCaption,
						Icon: localizableImages.HtmlIcon,
						Size: {
							ColSpan: 12,
							RowSpan: 1
						}
					},
					Settings: {
						isStylesVisible: true,
						panelIcon: localizableImages.HtmlPanelIcon
					},
					DefaultConfig: {
						Content: localizableStrings.DefaultHtml
					}
				},
				{
					Type: "image",
					DesignTimeConfig: {
						Caption: localizableStrings.ImageCaption,
						Icon: localizableImages.ImageIcon,
						Size: {
							ColSpan: 12,
							RowSpan: 1
						}
					},
					Settings: {
						schemaName: "ContentImagePropertiesPage",
						isStylesVisible: true,
						panelIcon: localizableImages.ImagePanelIcon,
						notImplemented: !Terrasoft.Features.getIsEnabled("ContentBuilderPropertiesPanel")
					},
					DefaultConfig: {
						ImageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: localizableStrings.DefaultImageBase64
						}
					}
				},
				{
					Type: "button",
					NotImplemented: Terrasoft.Features.getIsEnabled("DisableContentButtonPropertiesPage"),
					DesignTimeConfig: {
						Caption: localizableStrings.ButtonCaption,
						Icon: localizableImages.ButtonIcon,
						Size: {
							ColSpan: 6,
							RowSpan: 1
						}
					},
					Settings: {
						schemaName: "ContentButtonPropertiesPage",
						wrapClass: "button-panel content-panel-wrapper",
						isStylesVisible: true,
						useBackgroundImage: false,
						panelIcon: localizableImages.ButtonPanelIcon
					},
					DefaultConfig: {
						HtmlText:
							"<span style=\"color:#ffffff;\">" +
							"<span style=\"font-family:Verdana; font-size: 16pt;\">" +
							"Call to action" +
							"</span>" +
							"</span>",
						PlainText: "Call to action",
						Align: "center",
						Styles: {
							"background-color": "#5fb541",
							"padding-left": "10px",
							"padding-right": "10px",
							"padding-top": "5px",
							"padding-bottom": "7px",
							"width": "auto",
							"height": "auto",
							"border-radius": "0px"
						},
						Padding: {
							"padding-left": "0px",
							"padding-right": "0px",
							"padding-top": "0px",
							"padding-bottom": "0px"
						}
					}
				},
				{
					Type: "text",
					DesignTimeConfig: {
						Caption: localizableStrings.TextCaption,
						Icon: localizableImages.TextIcon,
						Size: {
							ColSpan: 12,
							RowSpan: 1
						}
					},
					Settings: {
						schemaName: "ContentTextPropertiesPage",
						isStylesVisible: true,
						panelIcon: localizableImages.TextPanelIcon,
						notImplemented: !Terrasoft.Features.getIsEnabled("ContentBuilderPropertiesPanel")
					},
					DefaultConfig: {
						Content: localizableStrings.DefaultText
					}
				},
				{
					Type: "separator",
					DesignTimeConfig: {
						Caption: localizableStrings.SeparatorCaption,
						Icon: localizableImages.SeparatorIcon,
						Size: {
							ColSpan: 24,
							RowSpan: 1
						}
					},
					DefaultConfig: {
						Color: "#BBBBBB",
						Thickness: "2px",
						Style: "Solid",
						Styles: {
							"padding-top": "10px",
							"padding-bottom": "10px"
						}
					},
					Settings: {
						schemaName: "ContentSeparatorPropertiesPage",
						isStylesVisible: true,
						panelIcon: localizableImages.SeparatorPanelIcon
					}
				}
			];
			const collection = new Terrasoft.Collection();
			items.forEach(function(item) {
				if (!item.NotImplemented) {
					collection.add(item.Type, item);
				}
			}, this);
			return collection;
		},

		/**
		 * Returns items collection for current content builder config state.
		 * @return {Terrasoft.core.collections.Collection}
		 */
		getItems: function() {
			return this.getGridItems();
		},

		/**
		 * Return content item by type.
		 * @param {String} itemType Item type.
		 * @return {Object} Content item config.
		 */
		findByType: function(itemType) {
			return this.getItems().find(itemType);
		},

		/**
		 * Returns default block config.
		 * @return {Object}
		 */
		getDefaultBlockConfig: function() {
			const items = this.getItems();
			const htmlItem = items.get("html");
			const config = htmlItem.DesignTimeConfig;
			return {
				ItemType: "block",
				Items: [{
					ItemType: "html",
					Column: 0,
					Row: 0,
					ColSpan: config.Size.ColSpan,
					RowSpan: config.Size.RowSpan,
					Content: htmlItem.DefaultConfig.Content
				}]
			};
		}

		// endregion

	});
});



