Terrasoft.configuration.Structures["ContentBuilderConfigToMjmlConverter"] = {innerHierarchyStack: ["ContentBuilderConfigToMjmlConverter"]};
define("ContentBuilderConfigToMjmlConverter", ["terrasoft", "ContentBuilderConstants"],
	function (Terrasoft) {
		Ext.define("Terrasoft.configuration.ContentBuilderConfigToMjmlConverter", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.ContentBuilderConfigToMjmlConverter",

			borderProps: ["top", "left", "bottom", "right"],

			customItemTypes: {
				smarthtml: {
					value: "smarthtml",
					mjmlValue: Terrasoft.ContentBuilderBodyItemType.mjraw.mjmlValue
				}
			},

			// #region Methods: Private

			/**
			 * Returns MJML body tag name for specific config item type.
			 * @private
			 * @param {String} config Content builder item serialized config.
			 * @returns {String} undefined if type was not found.
			 */
			_getTagName: function(config) {
				var bodyItemType = Terrasoft.ContentBuilderBodyItemType[config.ItemType];
				bodyItemType = bodyItemType || this.customItemTypes[config.ItemType];
				if (bodyItemType) {
					return bodyItemType.mjmlValue;
				} else {
					return undefined;
				}
			},

			/**
			 * Returns MJML head tag name for specific config item type.
			 * @private
			 * @param {String} itemType Item type name.
			 * @returns {String}
			 */
			_getHeadTagName: function(itemType) {
				var headItemType = Terrasoft.ContentBuilderHeadItemType[itemType];
				if (headItemType) {
					return headItemType.mjmlValue;
				} else {
					return undefined;
				}
			},

			/**
			 * Adds additional CSS class to item attributes.
			 * @private
			 * @param {Object} attributes MJML item attributes.
			 * @param {String} cssClass CSS class name.
			 */
			_addCssClass: function(attributes, cssClass) {
				var classes = attributes["css-class"] || "";
				if (classes.length) {
					classes += ", ";
				}
				attributes["css-class"] = classes + cssClass;
			},

			/**
			 * Sets correct specific padding atribute for element.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} styles Object with padding styles.
			 * @param {String} attributeName Mjml attribute name to be applied on.
			 */
			_applyPaddingStyle: function(mjmlConfig, styles, attributeName) {
				var paddingLeft = styles["padding-left"] || 0;
				var paddingRight = styles["padding-right"] || 0;
				var paddingTop = styles["padding-top"] || 0;
				var paddingBottom = styles["padding-bottom"] || 0;
				delete mjmlConfig.attributes["padding-bottom"];
				delete mjmlConfig.attributes["padding-left"];
				delete mjmlConfig.attributes["padding-top"];
				delete mjmlConfig.attributes["padding-right"];
				mjmlConfig.attributes[attributeName] = [paddingTop, paddingRight, paddingBottom, paddingLeft].join(" ");
			},

			/**
			 * Applies height style for button.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_applyHeightStyle: function(mjmlConfig, config) {
				if (Ext.isDefined(config.Styles.height) && config.Styles.height !== "auto") {
					mjmlConfig.attributes.height = config.Styles.height;
				} else {
					delete mjmlConfig.attributes.height;
				}
			},

			/**
			 * Applies width style for button.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_applyWidthStyle: function(mjmlConfig, config) {
				if (Ext.isDefined(config.WrapperStyles.width) && config.WrapperStyles.width !== "auto") {
					mjmlConfig.attributes.width = config.WrapperStyles.width;
				}
			},

			/**
			 * Calculates related inner columns' width percent in group.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Number} groupWidth Width of parent group.
			 */
			_recalculateGroupColumnsWidth: function(config, groupWidth) {
				Terrasoft.each(config.Items, function(column) {
					var relatedWidth = (column.Width / groupWidth) * 100;
					column.Width = Math.floor(relatedWidth * 10000) / 10000;
				}, this);
			},

			/**
			 * Calculates group width as inner columns' width sum.
			 * @private
			 * @param {Object} config Content builder template config.
			 */
			_calculateGroupWidth: function(config) {
				var width = 0;
				Terrasoft.each(config.Items, function(column) {
					width += column.Width;
				}, this);
				return width;
			},

			/**
			 * Applies additional config attributes on mjml item for sheet item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillSheetAdditionalConfigAttributes: function(mjmlConfig, config) {
				var sheetAttrs = {};
				if (config.BackgroundColor) {
					sheetAttrs["background-color"] = config.BackgroundColor;
				}
				if (config.Width) {
					sheetAttrs["width"] = config.Width + "px";
				}
				mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, sheetAttrs);
			},

			/**
			 * Applies additional config attributes on mjml item for mjblock item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillMjBlockAdditionalConfigAttributes: function(mjmlConfig, config) {
				if (!mjmlConfig.attributes["padding"]) {
					mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, {
						"padding": 0
					});
				}
				if (config.Styles.hasOwnProperty("background-image")) {
					delete mjmlConfig.attributes["background-image"];
					var imageUrl = config.Styles["background-image"];
					imageUrl = imageUrl.substring(4, imageUrl.length - 1);
					mjmlConfig.attributes["background-url"] = imageUrl;
				}
				this._addCssClass(mjmlConfig.attributes, "mj-block");
			},

			/**
			 * Applies additional config attributes on mjml item for section item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 */
			_fillSectionAdditionalConfigAttributes: function(mjmlConfig) {
				if (!mjmlConfig.attributes["padding"]) {
					mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, {
						"padding": 0
					});
				}
			},

			/**
			 * Applies additional config attributes on mjml item for section item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillGroupAdditionalConfigAttributes: function(mjmlConfig, config) {
				var width = this._calculateGroupWidth(config);
				mjmlConfig.attributes.width = width + "%";
			},

			/**
			 * Applies additional config attributes on mjml item for column item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillColumnAdditionalConfigAttributes: function(mjmlConfig, config) {
				Ext.apply(mjmlConfig.attributes, config.WrapperStyles);
			},

			/**
			 * Applies additional config attributes on mjml item for hero item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillHeroAdditionalConfigAttributes: function(mjmlConfig, config) {
				mjmlConfig.attributes.mode = "fixed-height";
				Ext.apply(mjmlConfig.attributes, config.WrapperStyles);
				if (!mjmlConfig.attributes.hasOwnProperty("background-color")
						&& !config.WrapperStyles.hasOwnProperty("background-image")) {
					mjmlConfig.attributes["background-color"] = "0";
				}
				if (config.WrapperStyles.hasOwnProperty("background-image")) {
					delete mjmlConfig.attributes["background-image"];
					var imageUrl = config.WrapperStyles["background-image"];
					imageUrl = imageUrl.substring(4, imageUrl.length - 1);
					mjmlConfig.attributes["background-url"] = imageUrl;
					mjmlConfig.attributes["background-height"] = mjmlConfig.attributes.height;
				}
			},

			/**
			 * Applies additional config attributes on mjml item for navbar item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillNavbarAdditionalConfigAttributes: function(mjmlConfig, config) {
				if (config.Styles.hasOwnProperty("text-align")) {
					delete mjmlConfig.attributes["text-align"];
					mjmlConfig.attributes.align = config.Styles["text-align"];
				}
				if (config.IsHamburger) {
					mjmlConfig.attributes.hamburger = "hamburger";
					if (config.IconStyles.hasOwnProperty("color")) {
						mjmlConfig.attributes["ico-color"] = config.IconStyles.color;
					}
					if (config.IconStyles.hasOwnProperty("text-align")) {
						mjmlConfig.attributes["ico-align"] = config.IconStyles["text-align"];
					}
				}
			},

			/**
			 * Applies additional config attributes on mjml item for navbar link.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillNavbarLinkAdditionalConfigAttributes: function(mjmlConfig, config) {
				mjmlConfig.content = config.HtmlText;
				mjmlConfig.attributes.href = config.Url || "#";
				mjmlConfig.attributes["text-transform"] = "none";
			},

			/**
			 * Fills content background color attribute from config item background color.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 */
			_fillMjmlBackgroundColorAttribute: function(mjmlConfig) {
				if (mjmlConfig.attributes["background-color"]) {
					mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, {
						"container-background-color": mjmlConfig.attributes["background-color"]
					});
				}
			},

			/**
			 * Applies additional config attributes on mjml item for text item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillTextAdditionalConfigAttributes: function(mjmlConfig, config) {
				mjmlConfig.attributes.align = mjmlConfig.attributes["text-align"] || Terrasoft.Align.CENTER;
				delete mjmlConfig.attributes["text-align"];
				this._fillMjmlBackgroundColorAttribute(mjmlConfig);
				mjmlConfig.content = config.Content;
			},

			/**
			 * Applies additional config attributes on mjml item for html item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillHtmlAdditionalConfigAttributes: function(mjmlConfig, config) {
				this._fillMjmlBackgroundColorAttribute(mjmlConfig);
				mjmlConfig.content = "<tr><td width=\"100%\" style=\"font-size: 13px;\">" + (config.Content || "") + "</td></tr>";
			},

			/**
			 * Applies additional config attributes on mjml item for button item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillButtonAdditionalConfigAttributes: function(mjmlConfig, config) {
				var buttonAttrs = {};
				if (Ext.isDefined(config.Link)) {
					buttonAttrs.href = config.Link;
				}
				if (Ext.isDefined(config.Align)) {
					buttonAttrs.align = config.Align;
				}
				if (Ext.isDefined(config.Target)) {
					buttonAttrs.target = config.Target;
				}
				if (!Ext.isDefined(config.Styles["background-color"])) {
					buttonAttrs["background-color"] = "transparent";
				}
				mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, buttonAttrs);
				this._applyPaddingStyle(mjmlConfig, config.Styles, "inner-padding");
				this._applyPaddingStyle(mjmlConfig, config.WrapperStyles, "padding");
				this._applyHeightStyle(mjmlConfig, config);
				this._applyWidthStyle(mjmlConfig, config);
				mjmlConfig.content = config.HtmlText;
			},

			_addBorderStyleToString: function(mjmlConfig, borderName) {
				return mjmlConfig.attributes[borderName]
						? ";" + borderName + ":" + mjmlConfig.attributes[borderName]
						: Terrasoft.emptyString;
			},

			_borderStylesToCssStyle: function(mjmlConfig) {
				var allEquals = true;
				var borderStyle = Terrasoft.emptyString;
				var resultBorderString = Terrasoft.emptyString;
				Terrasoft.each(this.borderProps, function(prop) {
					if (!Ext.isDefined(mjmlConfig.attributes["border-" + prop])) {
						allEquals = false;
						return;
					}
					if (mjmlConfig.attributes["border-" + prop].indexOf("None") !== -1) {
						allEquals = false;
					} else {
						allEquals = allEquals
							&& (borderStyle === mjmlConfig.attributes["border-" + prop]
								|| !borderStyle);
						borderStyle = mjmlConfig.attributes["border-" + prop];
						resultBorderString += this._addBorderStyleToString(mjmlConfig, "border-" + prop);
					}
					delete mjmlConfig.attributes["border-" + prop];
				}, this);
				if (allEquals || resultBorderString) {
					mjmlConfig.attributes.border = allEquals ? borderStyle : resultBorderString;
				}
			},

			/**
			 * Applies additional config attributes on mjml item for image item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillImageAdditionalConfigAttributes: function(mjmlConfig, config) {
				var imgAttrs = {
					padding: 0,
					src: config.ImageConfig.url
				};
				if (Ext.isDefined(config.Align)) {
					imgAttrs.align = config.Align;
				}
				if (Ext.isDefined(config.Alt)) {
					imgAttrs.alt = config.Alt;
				}
				if (config.Width) {
					imgAttrs.width = config.Width + "px";
				} else {
					delete mjmlConfig.attributes.width;
				}
				if (config.Height) {
					imgAttrs.height = config.Height + "px";
				} else {
					delete mjmlConfig.attributes.height;
				}
				if (config.Link) {
					imgAttrs.href = config.Link;
				}
				if (config.ImageTitle) {
					imgAttrs.title = config.ImageTitle;
				}
				this._borderStylesToCssStyle(mjmlConfig);
				this._fillMjmlBackgroundColorAttribute(mjmlConfig);
				mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, imgAttrs);
			},

			/**
			 * Applies additional config attributes on mjml item for separatot (divider) item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 */
			_fillSeparatorAdditionalConfigAttributes: function(mjmlConfig, config) {
				var dividerAttrs = {
					"border-width": config.Thickness,
					"border-style": config.Style,
					"border-color": config.Color
				};
				if (config.Width) {
					dividerAttrs.width = config.Width;
				}
				this._fillMjmlBackgroundColorAttribute(mjmlConfig);
				mjmlConfig.attributes = Ext.apply(mjmlConfig.attributes, dividerAttrs);
			},

			/**
			 * Applies additional config attributes on mjml item for spacer item.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 */
			_fillSpacerAdditionalConfigAttributes: function(mjmlConfig) {
				this._fillMjmlBackgroundColorAttribute(mjmlConfig);
			},

			/**
			 * Adds child MLML item to source MJML item children collection.
			 * @private
			 * @param {Object} mjmlConfig MJML parent config.
			 * @param {Object} childMjmlConfig MJML child config.
			 * @returns {Object} Modified mjmlConfig.
			 */
			_addChildToMjmlConfig: function(mjmlConfig, childMjmlConfig) {
				if (childMjmlConfig && childMjmlConfig.tagName !== undefined) {
					mjmlConfig.children.push(childMjmlConfig);
				}
				return mjmlConfig;
			},

			/**
			 * Fills MJML item children collection with converted to MJML config children items.
			 * @private
			 * @param {Object} mjmlConfig MJML template config.
			 * @param {Object} config Content builder template config.
			 * @returns {Object} Modified mjmlConfig.
			 */
			_fillChildren: function(mjmlConfig, config) {
				if (mjmlConfig && mjmlConfig.tagName !== undefined) {
					Terrasoft.each(config.Items, function (itemConfig) {
						var child = this._convertItem(itemConfig);
						mjmlConfig = this._addChildToMjmlConfig(mjmlConfig, child);
					}, this);
				}
				return mjmlConfig;
			},

			/**
			 * Converts content builder config item to MJML config item.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @returns {Object} MJML config.
			 */
			_convertItem: function(config) {
				var mjmlConfig = {
					tagName: this._getTagName(config),
					attributes: {},
					children: []
				};
				this.fillAttributes(mjmlConfig, config);
				this.fillAdditionalAttributes(mjmlConfig, config);
				this._fillChildren(mjmlConfig, config);
				return mjmlConfig;
			},

			/**
			 * Adds breakpoint item to head childer collection.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Object} mjmlConfig MJML head item config.
			 */
			_addBreakpoint: function(config, mjmlConfig) {
				var breakpoint = {
					tagName: this._getHeadTagName("breakpoint"),
					attributes: {
						width: config.BreakpointWidth + "px"
					}
				};
				mjmlConfig.children.push(breakpoint);
			},

			/**
			 * Adds default style item to head childer collection.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Object} mjmlConfig MJML head item config.
			 */
			_addDefaultStyle: function(config, mjmlConfig) {
				var defaultStyle = {
					tagName: this._getHeadTagName("style"),
					content: "\n.mj-block {" +
								"font-family: " + Terrasoft.FontSet.ARIAL + ";" +
								"font-size: 13px;" +
							"}"
				};
				mjmlConfig.children.push(defaultStyle);
			},

			/**
			 * Adds preview for template if preheader is defined for template.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Object} mjmlConfig MJML head item config.
			 */
			_addPreview: function(config, mjmlConfig) {
				if (config.PreHeaderText) {
					var preview = {
						tagName: this._getHeadTagName("preview"),
						content: config.PreHeaderText
					};
					mjmlConfig.children.push(preview);
				}
			},

			/**
			 * Returns MJML head item config.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @returns {Object} MJML head item config.
			 */
			_getHeadConfig: function(config) {
				var mjmlHeadConfig = {
					tagName: this._getHeadTagName("head"),
					attributes: {},
					children: []
				};
				this._addDefaultStyle(config, mjmlHeadConfig);
				this._addBreakpoint(config, mjmlHeadConfig);
				this._addPreview(config, mjmlHeadConfig);
				return mjmlHeadConfig;
			},

			/**
			 * Returns MJML config with head component.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Object} mjmlConfig MJML template config.
			 * @returns {Object} MJML template config.
			 */
			_addHeadConfig: function(config, mjmlConfig) {
				var head = this._getHeadConfig(config);
				return this._addChildToMjmlConfig(mjmlConfig, head);
			},

			/**
			 * Returns MJML config with body component.
			 * @private
			 * @param {Object} config Content builder template config.
			 * @param {Object} mjmlConfig MJML template config.
			 * @returns {Object} MJML template config.
			 */
			_addBodyConfig: function(config, mjmlConfig) {
				var childItem = this._convertItem(config);
				return this._addChildToMjmlConfig(mjmlConfig, childItem);
			},

			// #endregion

			// #region Methods: Protected

			/**
			 * Applies content builder item config styles into mjml item config attributes.
			 * @protected
			 * @param mjmlConfig Mjml item config.
			 * @param config Content builder item config.
			 */
			fillAttributes: function(mjmlConfig, config) {
				Ext.apply(mjmlConfig.attributes, config.Styles);
			},

			/**
			 * Applies additional attributes for mjml item config.
			 * @protected
			 * @virtual
			 * @param mjmlConfig Mjml item config.
			 * @param config Content builder item config.
			 * @returns {Object} Mjml config object with filled additional attributes.
			 */
			fillAdditionalAttributes: function(mjmlConfig, config) {
				switch (config.ItemType) {
					case Terrasoft.ContentBuilderBodyItemType.sheet.value:
						this._fillSheetAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjblock.value:
						this._fillMjBlockAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.section.value:
						this._fillSectionAdditionalConfigAttributes(mjmlConfig);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjgroup.value:
						this._fillGroupAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.column.value:
						this._fillColumnAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjhero.value:
						this._fillHeroAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.navbar.value:
						this._fillNavbarAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.navbarlink.value:
						this._fillNavbarLinkAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case this.customItemTypes.smarthtml.value:
					case Terrasoft.ContentBuilderBodyItemType.mjraw.value:
						this._fillHtmlAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.text.value:
						this._fillTextAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjbutton.value:
						this._fillButtonAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjimage.value:
						this._fillImageAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.mjdivider.value:
						this._fillSeparatorAdditionalConfigAttributes(mjmlConfig, config);
						break;
					case Terrasoft.ContentBuilderBodyItemType.spacer.value:
						this._fillSpacerAdditionalConfigAttributes(mjmlConfig);
						break;
					default:
						return mjmlConfig;
				}
				return mjmlConfig;
			},

			// #endregion

			// #region Methods: Public

			/**
			 * Converts content builder template config to MJML config format.
			 * @public
			 * @param {Object} config Content builder template config.
			 * @returns {Object} MJML template config.
			 */
			convert: function(config) {
				if (!config) {
					return null;
				}
				var clonedConfig = Terrasoft.deepClone(config);
				var mjmlConfig = {
					tagName: "mjml",
					attributes: {},
					children: []
				};
				this._addHeadConfig(clonedConfig, mjmlConfig);
				this._addBodyConfig(clonedConfig, mjmlConfig);
				return mjmlConfig;
			}

			// #endregion

		});
	}
);


